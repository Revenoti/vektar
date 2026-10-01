import { createHmac, randomBytes } from 'node:crypto'
import { mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { clientIp, parseTrustedProxyIps } from './client-ip.js'

const DAY = 86400000
const CONSENT_VERSION = '2026-10-01'
const UNKNOWN = 'We could not confirm the calling provider’s response. A call may still arrive. Please do not submit another request.'
const PHONE = /^\+[1-9]\d{7,14}$/
const NAME = /^[\p{L}\p{M} .’'-]{1,60}$/u

export function callConfig(env = process.env) {
  const number = (name, fallback, max) => Math.min(max, Math.max(1, Number.parseInt(env[name], 10) || fallback))
  const origins = (env.ALLOWED_ORIGINS || '').split(',').map(x => x.trim()).filter(x => {
    try { const url = new URL(x); return url.origin === x && (url.protocol === 'https:' || (url.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname))) } catch { return false }
  })
  return {
    apiKey: env.RETELL_API_KEY || '', agentId: env.RETELL_AGENT_ID || '', fromNumber: env.RETELL_FROM_NUMBER || '', origins,
    trustedProxyIps: parseTrustedProxyIps(env.CALL_TRUSTED_PROXY_IPS),
    webEnabled: env.ENABLE_WEB_CALLS === 'true', callbackEnabled: env.ENABLE_CALLBACKS === 'true',
    allowedPrefixes: (env.CALLBACK_ALLOWED_PREFIXES || '').split(',').map(x => x.trim()).filter(x => /^\+[1-9]\d{0,5}$/.test(x)),
    statePath: env.CALL_STATE_PATH || '.data/call-state.json', timeoutMs: number('CALL_PROVIDER_TIMEOUT_MS', 10000, 20000),
    globalDailyLimit: number('CALL_DAILY_LIMIT', 30, 1000), ipLimit: number('CALL_IP_LIMIT', 4, 20), ipWindowMs: 900000, phoneCooldownMs: DAY,
  }
}

class RequestError extends Error {
  constructor(status, code, message) { super(message); this.status = status; this.code = code }
}
const result = (status, code, message, extra = {}) => ({ status, body: { code, message, ...extra } })

function durableState(path) {
  let state
  try {
    state = JSON.parse(readFileSync(path, 'utf8'))
    if (state.version !== 1 || typeof state.salt !== 'string' || state.salt.length !== 64 || !Array.isArray(state.attempts)) throw new Error('Invalid call state')
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
    state = { version: 1, salt: randomBytes(32).toString('hex'), attempts: [] }
  }
  const save = () => {
    mkdirSync(dirname(path), { recursive: true, mode: 0o700 })
    writeFileSync(`${path}.tmp`, JSON.stringify(state), { mode: 0o600 })
    renameSync(`${path}.tmp`, path)
  }
  save()
  return { state, save }
}

async function readBody(req) {
  if (!/^application\/json(?:\s*;|$)/i.test(req.headers['content-type'] || '')) throw new RequestError(415, 'JSON_REQUIRED', 'Please send a JSON request.')
  let size = 0
  const chunks = []
  for await (const chunk of req) {
    size += chunk.length
    if (size > 4096) throw new RequestError(413, 'REQUEST_TOO_LARGE', 'This request is too large.')
    chunks.push(chunk)
  }
  let body
  try { body = JSON.parse(Buffer.concat(chunks).toString('utf8')) } catch { throw new RequestError(400, 'INVALID_JSON', 'Please check the request and try again.') }
  if (!body || Array.isArray(body) || typeof body !== 'object') throw new RequestError(400, 'INVALID_REQUEST', 'Please check the request and try again.')
  return body
}

function validate(body, kind) {
  const allowed = kind === 'callback' ? ['firstName', 'lastName', 'phone', 'consent', 'consentVersion', 'website'] : ['consent', 'consentVersion', 'website']
  if (Object.keys(body).some(key => !allowed.includes(key))) throw new RequestError(400, 'INVALID_REQUEST', 'Unexpected request fields.')
  if (body.website) throw new RequestError(400, 'INVALID_REQUEST', 'Unable to accept this request.')
  if (body.consent !== true || body.consentVersion !== CONSENT_VERSION) throw new RequestError(400, 'CONSENT_REQUIRED', 'Please read and accept the call consent before continuing.')
  if (kind === 'web') return { consent: true, consentVersion: CONSENT_VERSION }
  const firstName = typeof body.firstName === 'string' ? body.firstName.trim() : ''
  const lastName = typeof body.lastName === 'string' ? body.lastName.trim() : ''
  const phone = typeof body.phone === 'string' && body.phone.length < 40 ? body.phone.replace(/[\s()-]/g, '') : ''
  if (!NAME.test(firstName) || !NAME.test(lastName)) throw new RequestError(400, 'INVALID_NAME', 'Enter your first and last name, up to 60 characters each.')
  if (!PHONE.test(phone)) throw new RequestError(400, 'INVALID_PHONE', 'Enter your phone number with its country code, for example +1 321 555 0123.')
  return { firstName, lastName, phone, consent: true, consentVersion: CONSENT_VERSION }
}

// One process, one persistent private volume. Use a shared transactional store
// before horizontal scaling; multiple replicas must never share this JSON file.
export function createCallService({ config = callConfig(), fetchImpl = globalThis.fetch, now = Date.now } = {}) {
  let storage
  let storageReady = true
  try { storage = durableState(config.statePath) } catch { storageReady = false }
  const ipAttempts = new Map()
  const inFlight = new Map()
  const webResults = new Map()
  const hash = value => createHmac('sha256', storage.state.salt).update(value).digest('hex')
  const persist = () => { try { storage.save() } catch { storageReady = false; throw new RequestError(503, 'SERVICE_UNAVAILABLE', 'Calling is temporarily unavailable. No new request was sent.') } }
  const available = () => {
    const common = Boolean(storageReady && config.apiKey && config.agentId && config.origins.length)
    return { web: common && config.webEnabled, callback: Boolean(common && config.callbackEnabled && PHONE.test(config.fromNumber) && config.allowedPrefixes.length), consentVersion: CONSENT_VERSION }
  }

  async function upstream(kind, data, requestHash) {
    const metadata = { source: 'vektar_website', consent_version: CONSENT_VERSION, consent_at: new Date(now()).toISOString(), request_reference: requestHash }
    const body = kind === 'web'
      ? { agent_id: config.agentId, agent_version: 'latest_published', metadata }
      : { from_number: config.fromNumber, to_number: data.phone, override_agent_id: config.agentId, override_agent_version: 'latest_published', metadata: { ...metadata, first_name: data.firstName, last_name: data.lastName } }
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), config.timeoutMs)
    try {
      const response = await fetchImpl(`https://api.retellai.com/${kind === 'web' ? 'v3/create-web-call' : 'v2/create-phone-call'}`, {
        method: 'POST', redirect: 'error', signal: controller.signal,
        headers: { Authorization: `Bearer ${config.apiKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      })
      if (!response.ok) {
        // Do not reflect provider error bodies, credentials or customer details.
        if (response.status >= 500) return result(502, 'OUTCOME_UNKNOWN', kind === 'callback' ? UNKNOWN : 'We could not create a browser call. Please try again later.')
        return result(response.status === 429 ? 429 : 503, 'PROVIDER_UNAVAILABLE', 'Calling is temporarily unavailable. Please try again later.')
      }
      const responseData = await response.json()
      if (typeof responseData.call_id !== 'string' || !responseData.call_id) return result(502, 'OUTCOME_UNKNOWN', kind === 'callback' ? UNKNOWN : 'The provider did not return a valid call session.')
      if (kind === 'callback') {
        if (!['registered', 'ongoing'].includes(responseData.call_status)) return result(502, 'OUTCOME_UNKNOWN', UNKNOWN)
        return result(202, 'CALL_ACCEPTED', 'The calling provider accepted your request. Your phone may ring shortly; a connection is not guaranteed.', { status: 'accepted' })
      }
      if (typeof responseData.access_token !== 'string' || !responseData.access_token || responseData.transport !== 'gateway' || !Array.isArray(responseData.ice_servers) || !Number.isFinite(responseData.expires_at) || responseData.expires_at <= now()) return result(502, 'INVALID_SESSION', 'The provider did not return a usable call session. Please try again later.')
      return { status: 201, body: { accessToken: responseData.access_token, callId: responseData.call_id, transport: responseData.transport, iceServers: responseData.ice_servers, expiresAt: responseData.expires_at } }
    } catch {
      return result(502, 'OUTCOME_UNKNOWN', kind === 'callback' ? UNKNOWN : 'The connection timed out or was interrupted. Please try again later.')
    } finally { clearTimeout(timeout) }
  }

  return {
    available,
    async handle(req, res, path) {
      const send = ({ status, body }, extraHeaders = {}) => {
        res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...extraHeaders })
        res.end(JSON.stringify(body))
      }
      if (path === '/api/voice/config' && req.method === 'GET') { send({ status: 200, body: available() }); return }
      if (!['/api/voice/session', '/api/callback'].includes(path)) { send(result(404, 'NOT_FOUND', 'This API endpoint does not exist.')); return }
      if (req.method !== 'POST') { send(result(405, 'METHOD_NOT_ALLOWED', 'Use POST for call requests.'), { Allow: 'POST' }); return }
      if (!req.headers.origin || !config.origins.includes(req.headers.origin) || req.headers['sec-fetch-site'] === 'cross-site') { send(result(403, 'ORIGIN_REJECTED', 'This request must come from the Vektar website.')); return }
      try {
        const kind = path === '/api/callback' ? 'callback' : 'web'
        if (!available()[kind]) { send(result(503, 'SERVICE_UNAVAILABLE', 'Calling is currently unavailable. No request has been sent.')); return }
        // Only an explicitly allowlisted socket peer can provide a forwarded
        // chain; parsing stops at the first untrusted hop, never its left edge.
        const ipKey = hash(clientIp(req, config.trustedProxyIps))
        for (const [key, values] of ipAttempts) if (!values.some(t => t > now() - config.ipWindowMs)) ipAttempts.delete(key)
        if (ipAttempts.size >= 10000 && !ipAttempts.has(ipKey)) { send(result(429, 'RATE_LIMITED', 'Calling is busy. Please try later.')); return }
        const attempts = (ipAttempts.get(ipKey) || []).filter(t => t > now() - config.ipWindowMs)
        if (attempts.length >= config.ipLimit * 4) { send(result(429, 'RATE_LIMITED', 'Too many requests. Please try again later.'), { 'Retry-After': '900' }); return }
        ipAttempts.set(ipKey, [...attempts, now()])
        const key = req.headers['idempotency-key']
        if (typeof key !== 'string' || !/^[a-zA-Z0-9_-]{16,100}$/.test(key)) throw new RequestError(400, 'IDEMPOTENCY_REQUIRED', 'A valid request reference is required.')
        const data = validate(await readBody(req), kind)
        if (kind === 'callback' && !config.allowedPrefixes.some(prefix => data.phone.startsWith(prefix))) throw new RequestError(400, 'UNSUPPORTED_REGION', 'Callback is not available for this country code. Try a browser call instead.')
        storage.state.attempts = storage.state.attempts.filter(item => item.at > now() - DAY)
        for (const [key, value] of webResults) if (value.expiresAt <= now()) webResults.delete(key)
        const requestHash = hash(`${kind}:${key}`)
        const fingerprint = hash(JSON.stringify(data))
        const existing = storage.state.attempts.find(item => item.key === requestHash)
        if (existing) {
          if (existing.fingerprint !== fingerprint) { send(result(409, 'IDEMPOTENCY_CONFLICT', 'This request reference was already used for different details.')); return }
          if (inFlight.has(requestHash)) { send(await inFlight.get(requestHash)); return }
          if (kind === 'web') { send(webResults.get(requestHash)?.result || result(409, 'SESSION_EXPIRED', 'This session is no longer available. Start a new browser call.')); return }
          send(existing.result || result(502, 'OUTCOME_UNKNOWN', UNKNOWN)); return
        }
        if (attempts.length >= config.ipLimit) { send(result(429, 'RATE_LIMITED', 'Too many call attempts. Please try again later.'), { 'Retry-After': '900' }); return }
        if (storage.state.attempts.length >= config.globalDailyLimit) { send(result(429, 'DAILY_LIMIT', 'Calling has reached its daily limit. Please try again tomorrow.'), { 'Retry-After': '86400' }); return }
        const phoneHash = kind === 'callback' ? hash(data.phone) : null
        if (phoneHash && storage.state.attempts.some(item => item.phone === phoneHash && item.at > now() - config.phoneCooldownMs)) { send(result(429, 'CALLBACK_ALREADY_REQUESTED', 'A callback to this number was already attempted today. Please wait before requesting another.', { status: 'already_requested' }), { 'Retry-After': '86400' }); return }
        const record = { key: requestHash, fingerprint, phone: phoneHash, at: now(), kind }
        storage.state.attempts.push(record)
        // Reserve durably before contacting provider; a crash cannot silently
        // cause a duplicate outbound call on the same idempotent retry.
        persist()
        const pending = upstream(kind, data, requestHash)
        inFlight.set(requestHash, pending)
        let outcome
        try {
          outcome = await pending
          if (kind === 'callback') { record.result = outcome; try { persist() } catch { outcome = result(502, 'OUTCOME_UNKNOWN', UNKNOWN) } }
          else webResults.set(requestHash, { result: outcome, expiresAt: Math.min(outcome.body.expiresAt || now() + 60000, now() + 60000) })
        } finally { inFlight.delete(requestHash) }
        send(outcome)
      } catch (error) {
        send(error instanceof RequestError ? result(error.status, error.code, error.message) : result(500, 'INTERNAL_ERROR', 'Unable to process this request. Please try again later.'))
      }
    },
  }
}
