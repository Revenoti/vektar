export const CONSENT_VERSION = '2026-10-01'

export class CallRequestError extends Error {
  constructor(message, code) { super(message); this.name = 'CallRequestError'; this.code = code }
}

export function newRequestKey() { return crypto.randomUUID() }

async function request(path, options = {}) {
  let response
  try { response = await fetch(path, { credentials: 'same-origin', cache: 'no-store', ...options }) }
  catch (error) {
    if (error.name === 'AbortError') throw error
    throw new CallRequestError('The connection was interrupted. We could not confirm this request.', 'NETWORK_ERROR')
  }
  let data
  try { data = await response.json() } catch { throw new CallRequestError('Calling is unavailable right now. We could not confirm this request.', 'INVALID_RESPONSE') }
  if (!response.ok) throw new CallRequestError(data.message || 'Calling is temporarily unavailable.', data.code || 'REQUEST_FAILED')
  return data
}

export async function getCallAvailability(signal) {
  const data = await request('/api/voice/config', { signal })
  if (typeof data.web !== 'boolean' || typeof data.callback !== 'boolean' || data.consentVersion !== CONSENT_VERSION) throw new CallRequestError('Calling is unavailable right now.', 'INVALID_RESPONSE')
  return data
}

export async function requestCallback(details, key, signal) {
  const data = await request('/api/callback', {
    method: 'POST', signal,
    headers: { 'Content-Type': 'application/json', 'Idempotency-Key': key },
    body: JSON.stringify({ ...details, consentVersion: CONSENT_VERSION }),
  })
  if (data.status !== 'accepted') throw new CallRequestError('We could not confirm the callback. A call may still arrive; please do not resubmit.', 'OUTCOME_UNKNOWN')
  return data
}

export async function requestVoiceSession(key, signal) {
  const data = await request('/api/voice/session', {
    method: 'POST', signal,
    headers: { 'Content-Type': 'application/json', 'Idempotency-Key': key },
    body: JSON.stringify({ consent: true, consentVersion: CONSENT_VERSION }),
  })
  if (typeof data.accessToken !== 'string' || !data.accessToken || typeof data.callId !== 'string' || !data.callId || data.transport !== 'gateway' || !Array.isArray(data.iceServers) || !Number.isFinite(data.expiresAt) || data.expiresAt <= Date.now()) throw new CallRequestError('The voice session could not be created. Please try again later.', 'INVALID_SESSION')
  return data
}

// Injectable media / SDK boundaries allow lifecycle tests without live calls.
export function createBrowserConversation({ onStatus, onError, mediaDevices = globalThis.navigator?.mediaDevices, loadClient = () => import('retell-client-js-sdk'), createSession = requestVoiceSession, connectionTimeoutMs = 20000 }) {
  let generation = 0
  let client = null
  let controller = null
  let timer = null
  let phase = 'idle'
  const publish = status => { phase = status; onStatus(status) }
  const cleanup = () => {
    clearTimeout(timer)
    timer = null
    controller?.abort()
    controller = null
    const current = client
    client = null
    current?.removeAllListeners()
    current?.stopCall()
  }
  const fail = message => { generation++; cleanup(); publish('error'); onError(message) }
  return {
    async start() {
      if (['permission', 'connecting', 'connected'].includes(phase)) return
      cleanup()
      const attempt = ++generation
      publish('permission')
      try {
        if (!mediaDevices?.getUserMedia) throw new CallRequestError('Browser calling needs HTTPS and a supported microphone. Try a callback instead.', 'UNSUPPORTED_BROWSER')
        // Prompt only after the consented Start click; stop every preflight track,
        // including when Cancel happened while the permission prompt was open.
        const media = await mediaDevices.getUserMedia({ audio: true })
        media.getTracks().forEach(track => track.stop())
        if (attempt !== generation) return
        publish('connecting')
        controller = new AbortController()
        timer = setTimeout(() => { if (attempt === generation) fail('The call did not connect. Your microphone is off. You can start a new call when ready.') }, connectionTimeoutMs)
        const [{ RetellWebClient }, session] = await Promise.all([loadClient(), createSession(newRequestKey(), controller.signal)])
        if (attempt !== generation) return
        const current = new RetellWebClient({ defaultTransport: 'gateway' })
        client = current
        current.on('call_started', () => { if (attempt === generation) { clearTimeout(timer); publish('connected') } })
        current.on('call_ended', () => { if (attempt === generation) { generation++; cleanup(); publish('ended') } })
        current.on('error', () => { if (attempt === generation) fail('The call was interrupted. Your microphone is off. Start a new call to reconnect.') })
        await current.startCall({ accessToken: session.accessToken, callId: session.callId, transport: session.transport, iceServers: session.iceServers })
        if (attempt !== generation) current.stopCall()
      } catch (error) {
        if (attempt !== generation) return
        if (['NotAllowedError', 'PermissionDeniedError'].includes(error.name)) fail('Microphone permission was not granted. Enable it in your browser and try again, or choose a callback.')
        else if (error.name === 'NotFoundError') fail('No microphone was found. Connect one and try again, or choose a callback.')
        else fail(error instanceof CallRequestError ? error.message : 'The call could not connect. Your microphone is off. Please try again later.')
      }
    },
    stop() { generation++; cleanup(); publish('ended') },
    dispose() { generation++; cleanup(); phase = 'ended' },
    mute(muted) { if (phase !== 'connected' || !client) return false; if (muted) client.mute(); else client.unmute(); return true },
    async resumeAudio() { if (phase === 'connected') await client?.startAudioPlayback() },
  }
}
