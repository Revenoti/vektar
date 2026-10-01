import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'
import { createAppServer } from '../server/index.js'
import { callConfig } from '../server/calls.js'
import { clientIp, normalizeIp, parseTrustedProxyIps } from '../server/client-ip.js'

const ORIGIN = 'https://vektar.test'
const consent = { consent: true, consentVersion: '2026-10-01' }
const callback = { ...consent, firstName: 'Ada', lastName: 'Lovelace', phone: '+13215550123' }
const providerSession = () => ({ call_id: 'mock-call', access_token: 'mock-session-token', transport: 'gateway', ice_servers: [], expires_at: Date.now() + 60000 })

async function fixture(t, overrides = {}, fetchImpl = async () => Response.json({ call_id: 'mock-call', call_status: 'registered' })) {
  const dir = await mkdtemp(join(tmpdir(), 'vektar-calls-'))
  const config = { ...callConfig({ RETELL_API_KEY: 'test-only-secret', RETELL_AGENT_ID: 'test-agent', RETELL_FROM_NUMBER: '+13215550000', ENABLE_WEB_CALLS: 'true', ENABLE_CALLBACKS: 'true', ALLOWED_ORIGINS: ORIGIN, CALLBACK_ALLOWED_PREFIXES: '+1', CALL_STATE_PATH: join(dir, 'state.json') }), ...overrides }
  const start = async () => {
    const server = createAppServer({ config, fetchImpl, staticRoot: dir })
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
    return server
  }
  let server = await start()
  t.after(async () => { await new Promise(resolve => server.close(resolve)); await rm(dir, { force: true, recursive: true }) })
  const request = async (path = '/api/callback', body = callback, headers = {}, method = 'POST') => {
    const response = await fetch(`http://127.0.0.1:${server.address().port}${path}`, { method, headers: { Origin: ORIGIN, 'Content-Type': 'application/json', 'Idempotency-Key': randomUUID(), ...headers }, ...(method === 'GET' ? {} : { body: typeof body === 'string' ? body : JSON.stringify(body) }) })
    const text = await response.text()
    let data
    try { data = JSON.parse(text) } catch { data = text }
    return { status: response.status, headers: response.headers, data }
  }
  return { config, dir, request, restart: async () => { await new Promise(resolve => server.close(resolve)); server = await start() } }
}

test('unconfigured service fails closed and never contacts provider', async t => {
  let called = false
  const f = await fixture(t, { apiKey: '' }, async () => { called = true; throw new Error('must not call') })
  assert.deepEqual((await f.request('/api/voice/config', undefined, {}, 'GET')).data, { web: false, callback: false, consentVersion: '2026-10-01' })
  assert.equal((await f.request()).status, 503)
  assert.equal(called, false)
})

test('explicit opt-in flags, outbound number and region restrictions are required', async t => {
  for (const overrides of [{ webEnabled: false, callbackEnabled: false }, { fromNumber: '' }, { allowedPrefixes: [] }]) {
    const f = await fixture(t, overrides)
    assert.equal((await f.request()).status, 503)
  }
})

test('callback sends only fixed server-controlled agent and from-number', async t => {
  let sent
  const f = await fixture(t, {}, async (url, options) => { sent = { url, ...options, body: JSON.parse(options.body) }; return Response.json({ call_id: 'private-provider-call-id', call_status: 'registered' }) })
  const response = await f.request()
  assert.equal(response.status, 202)
  assert.equal(response.data.status, 'accepted')
  assert.match(response.data.message, /not guaranteed/)
  assert.equal(sent.url, 'https://api.retellai.com/v2/create-phone-call')
  assert.equal(sent.headers.Authorization, 'Bearer test-only-secret')
  assert.equal(sent.body.override_agent_id, 'test-agent')
  assert.equal(sent.body.from_number, '+13215550000')
  assert.equal(sent.body.to_number, callback.phone)
  assert.equal(sent.body.metadata.consent_version, '2026-10-01')
  assert.equal(JSON.stringify(response.data).includes('private-provider-call-id'), false)
  assert.equal(response.headers.get('cache-control'), 'no-store')
  const disk = await readFile(f.config.statePath, 'utf8')
  for (const secret of ['test-only-secret', callback.phone, callback.firstName, callback.lastName, 'private-provider-call-id']) assert.equal(disk.includes(secret), false)
})

test('missing, foreign and forged cross-site origins are rejected', async t => {
  const f = await fixture(t)
  for (const headers of [{ Origin: '' }, { Origin: 'https://attacker.test' }, { Origin: `${ORIGIN}.attacker.test` }, { 'Sec-Fetch-Site': 'cross-site' }]) assert.equal((await f.request('/api/callback', callback, headers)).status, 403)
})

test('requires JSON, consent, supported consent version and request reference', async t => {
  const f = await fixture(t, { ipLimit: 20 })
  assert.equal((await f.request('/api/callback', callback, { 'Content-Type': 'text/plain' })).status, 415)
  assert.equal((await f.request('/api/callback', '{bad')).status, 400)
  assert.equal((await f.request('/api/callback', { ...callback, consent: false })).data.code, 'CONSENT_REQUIRED')
  assert.equal((await f.request('/api/callback', { ...callback, consent: 'true' })).data.code, 'CONSENT_REQUIRED')
  assert.equal((await f.request('/api/callback', { ...callback, consentVersion: 'old' })).data.code, 'CONSENT_REQUIRED')
  assert.equal((await f.request('/api/callback', callback, { 'Idempotency-Key': '' })).data.code, 'IDEMPOTENCY_REQUIRED')
})

test('oversized JSON is rejected before provider contact', async t => {
  let calls = 0
  const f = await fixture(t, {}, async () => { calls++; return Response.json({}) })
  assert.equal((await f.request('/api/callback', { ...callback, firstName: 'A'.repeat(5000) })).status, 413)
  assert.equal(calls, 0)
})

test('validates names, international phone format, destination region, honeypot and unknown fields', async t => {
  const f = await fixture(t, { ipLimit: 20 })
  for (const data of [{ firstName: '' }, { lastName: '<script>' }, { phone: '3215550123' }, { phone: '+1abc' }, { phone: '+442071234567' }, { website: 'spam' }, { agent_id: 'other-agent' }, { from_number: '+13215550999' }]) assert.equal((await f.request('/api/callback', { ...callback, ...data })).status, 400)
  assert.equal((await f.request('/api/callback', { ...callback, phone: '+1 (321) 555-0123' })).status, 202)
})

test('duplicate callback retries are idempotent, including after restart', async t => {
  let calls = 0
  const f = await fixture(t, { ipLimit: 20 }, async () => { calls++; return Response.json({ call_id: 'mock', call_status: 'registered' }) })
  const key = { 'Idempotency-Key': randomUUID() }
  assert.equal((await f.request('/api/callback', callback, key)).status, 202)
  assert.equal((await f.request('/api/callback', callback, key)).status, 202)
  await f.restart()
  assert.equal((await f.request('/api/callback', callback, key)).status, 202)
  assert.equal(calls, 1)
  assert.equal((await f.request('/api/callback', { ...callback, firstName: 'Grace' }, key)).status, 409)
  assert.equal(calls, 1)
})

test('concurrent same-key requests place one call', async t => {
  let calls = 0
  const f = await fixture(t, {}, async () => { calls++; await new Promise(resolve => setTimeout(resolve, 30)); return Response.json({ call_id: 'mock', call_status: 'registered' }) })
  const key = { 'Idempotency-Key': randomUUID() }
  const responses = await Promise.all([f.request('/api/callback', callback, key), f.request('/api/callback', callback, key)])
  assert.deepEqual(responses.map(x => x.status), [202, 202])
  assert.equal(calls, 1)
})

test('phone cooldown blocks repeats with different request references', async t => {
  const f = await fixture(t)
  assert.equal((await f.request()).status, 202)
  assert.equal((await f.request()).data.code, 'CALLBACK_ALREADY_REQUESTED')
  await f.restart()
  assert.equal((await f.request()).data.code, 'CALLBACK_ALREADY_REQUESTED')
})

test('timeout stays uncertain and cannot replay a paid callback', async t => {
  let calls = 0
  const f = await fixture(t, { timeoutMs: 10, ipLimit: 20 }, async (_url, { signal }) => { calls++; return new Promise((_, reject) => signal.addEventListener('abort', () => reject(new Error('timeout')), { once: true })) })
  const key = { 'Idempotency-Key': randomUUID() }
  const response = await f.request('/api/callback', callback, key)
  assert.equal(response.status, 502)
  assert.equal(response.data.code, 'OUTCOME_UNKNOWN')
  assert.match(response.data.message, /may still arrive/)
  await f.restart()
  assert.equal((await f.request('/api/callback', callback, key)).data.code, 'OUTCOME_UNKNOWN')
  assert.equal(calls, 1)
})

test('provider errors, malformed success and terminal call status never claim acceptance', async t => {
  for (const response of [Response.json({ message: 'test-only-secret' }, { status: 401 }), Response.json({ message: 'test-only-secret' }, { status: 500 }), Response.json({}), Response.json({ call_id: 'x', call_status: 'error' }), new Response('not json')]) {
    const f = await fixture(t, {}, async () => response)
    const result = await f.request()
    assert.ok(result.status >= 500)
    assert.notEqual(result.data.status, 'accepted')
    assert.equal(JSON.stringify(result.data).includes('test-only-secret'), false)
  }
})

test('per-IP limit ignores spoofed forwarding headers', async t => {
  const f = await fixture(t, { ipLimit: 1 }, async () => Response.json(providerSession()))
  assert.equal((await f.request('/api/voice/session', consent)).status, 201)
  const response = await f.request('/api/voice/session', consent, { 'X-Forwarded-For': '1.2.3.4' })
  assert.equal(response.status, 429)
  assert.equal(response.headers.get('retry-after'), '900')
})

test('trusted ingress gives distinct visitors independent per-IP quotas', async t => {
  const f = await fixture(t, { ipLimit: 1, trustedProxyIps: ['127.0.0.1'] }, async () => Response.json(providerSession()))
  assert.equal((await f.request('/api/voice/session', consent, { 'X-Forwarded-For': '198.51.100.10' })).status, 201)
  assert.equal((await f.request('/api/voice/session', consent, { 'X-Forwarded-For': '198.51.100.11' })).status, 201)
  assert.equal((await f.request('/api/voice/session', consent, { 'X-Forwarded-For': '198.51.100.10' })).status, 429)
})

test('forged left-side addresses cannot bypass the real visitor quota', async t => {
  const f = await fixture(t, { ipLimit: 1, trustedProxyIps: ['127.0.0.1', '192.0.2.20'] }, async () => Response.json(providerSession()))
  assert.equal((await f.request('/api/voice/session', consent, { 'X-Forwarded-For': '203.0.113.99, 198.51.100.10, 192.0.2.20' })).status, 201)
  assert.equal((await f.request('/api/voice/session', consent, { 'X-Forwarded-For': '203.0.113.88, 198.51.100.10, 192.0.2.20' })).status, 429)
})

test('invalid or oversized forwarded chains fall back to the peer quota', async t => {
  const f = await fixture(t, { ipLimit: 1, trustedProxyIps: ['127.0.0.1'] }, async () => Response.json(providerSession()))
  assert.equal((await f.request('/api/voice/session', consent, { 'X-Forwarded-For': 'not-an-ip' })).status, 201)
  for (const header of ['198.51.100.10, malformed', '198.51.100.10,', Array(17).fill('198.51.100.10').join(','), 'x'.repeat(2049)]) {
    assert.equal((await f.request('/api/voice/session', consent, { 'X-Forwarded-For': header })).status, 429)
  }
})

test('IP trust uses validated exact canonical addresses and bounded right-to-left traversal', () => {
  const req = (peer, header) => ({ socket: { remoteAddress: peer }, headers: { 'x-forwarded-for': header } })
  assert.deepEqual(callConfig({}).trustedProxyIps, [])
  assert.deepEqual(parseTrustedProxyIps(' 192.0.2.20,2001:0db8:0:0::1 '), ['192.0.2.20', '2001:db8::1'])
  for (const value of ['192.0.2.20,bad', '192.0.2.0/24', '*', 'localhost', '192.0.2.20:80', 'fe80::1%eth0', '192.0.2.20,']) assert.deepEqual(parseTrustedProxyIps(value), [])
  assert.equal(normalizeIp('::ffff:192.0.2.20'), '192.0.2.20')
  assert.equal(clientIp(req('192.0.2.21', '198.51.100.10'), ['192.0.2.20']), '192.0.2.21')
  assert.equal(clientIp(req('192.0.2.20', '203.0.113.99,198.51.100.10,2001:db8::1'), ['192.0.2.20', '2001:db8::1']), '198.51.100.10')
  assert.equal(clientIp(req('::ffff:192.0.2.20', '2001:0db8::1234'), ['192.0.2.20']), '2001:db8::1234')
  for (const header of ['', undefined, ['198.51.100.10'], '198.51.100.10:80', '[2001:db8::1]', 'unknown,198.51.100.10']) assert.equal(clientIp(req('192.0.2.20', header), ['192.0.2.20']), '192.0.2.20')
})

test('global cap survives restart', async t => {
  const f = await fixture(t, { globalDailyLimit: 1 }, async () => Response.json(providerSession()))
  assert.equal((await f.request('/api/voice/session', consent)).status, 201)
  await f.restart()
  assert.equal((await f.request('/api/voice/session', consent)).data.code, 'DAILY_LIMIT')
})

test('web session returns only an ephemeral gateway connection payload', async t => {
  let body
  let url
  let calls = 0
  const f = await fixture(t, {}, async (u, options) => { url = u; body = JSON.parse(options.body); calls++; return Response.json({ ...providerSession(), secret: 'do-not-forward' }) })
  const key = { 'Idempotency-Key': randomUUID() }
  const response = await f.request('/api/voice/session', consent, key)
  assert.equal(response.status, 201)
  assert.equal(url, 'https://api.retellai.com/v3/create-web-call')
  assert.equal(body.agent_id, 'test-agent')
  assert.equal(response.data.accessToken, 'mock-session-token')
  assert.deepEqual(Object.keys(response.data).sort(), ['accessToken', 'callId', 'expiresAt', 'iceServers', 'transport'])
  assert.equal((await f.request('/api/voice/session', consent, key)).status, 201)
  assert.equal(calls, 1)
  assert.equal((await readFile(f.config.statePath, 'utf8')).includes('mock-session-token'), false)
  await f.restart()
  assert.equal((await f.request('/api/voice/session', consent, key)).data.code, 'SESSION_EXPIRED')
})

test('expired or wrong-transport session is rejected', async t => {
  for (const data of [{ ...providerSession(), expires_at: 1 }, { ...providerSession(), transport: 'livekit' }, { ...providerSession(), access_token: '' }]) {
    const f = await fixture(t, {}, async () => Response.json(data))
    assert.equal((await f.request('/api/voice/session', consent)).data.code, 'INVALID_SESSION')
  }
})

test('unknown API routes never fall back to successful HTML; static files cannot expose secrets', async t => {
  const f = await fixture(t)
  await writeFile(join(f.dir, 'index.html'), '<h1>Website</h1>')
  await writeFile(join(f.dir, 'routes.json'), JSON.stringify(['/', '/call']))
  assert.equal((await f.request('/api/contact')).status, 404)
  assert.equal((await f.request('/api/callback', undefined, {}, 'GET')).status, 405)
  assert.equal((await f.request('/.env', undefined, {}, 'GET')).status, 404)
  assert.equal((await f.request('/%2eenv', undefined, {}, 'GET')).status, 404)
  assert.equal((await f.request('/call', undefined, {}, 'GET')).status, 200)
  assert.equal((await f.request('/does-not-exist', undefined, {}, 'GET')).status, 404)
})

test('corrupted durable state disables calls instead of discarding idempotency history', async t => {
  const f = await fixture(t)
  await writeFile(f.config.statePath, 'invalid state')
  await f.restart()
  assert.equal((await f.request()).status, 503)
})
