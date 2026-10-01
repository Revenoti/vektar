import test from 'node:test'
import assert from 'node:assert/strict'
import { EventEmitter } from 'node:events'
import { createBrowserConversation } from '../src/api/calls.js'

const tick = () => new Promise(resolve => setTimeout(resolve, 0))
const deferred = () => { let resolve; const promise = new Promise(r => { resolve = r }); return { promise, resolve } }
function setup(overrides = {}) {
  const statuses = [], errors = []
  let stoppedTracks = 0, createdSessions = 0, started = 0, stopped = 0
  let client
  class FakeClient extends EventEmitter {
    constructor() { super(); client = this }
    async startCall() { started++; this.emit('call_started') }
    stopCall() { stopped++ }
    mute() { this.muted = true }
    unmute() { this.muted = false }
    async startAudioPlayback() { this.resumed = true }
  }
  const media = { getTracks: () => [{ stop: () => { stoppedTracks++ } }] }
  const options = { onStatus: status => statuses.push(status), onError: error => errors.push(error), mediaDevices: { getUserMedia: async () => media }, loadClient: async () => ({ RetellWebClient: FakeClient }), createSession: async () => { createdSessions++; return { accessToken: 'test', callId: 'mock', transport: 'gateway', iceServers: [] } }, ...overrides }
  const conversation = createBrowserConversation(options)
  return { conversation, statuses, errors, media, client: () => client, counts: () => ({ stoppedTracks, createdSessions, started, stopped }) }
}

test('browser call only connects after microphone access and SDK event', async () => {
  const f = setup()
  assert.deepEqual(f.counts(), { stoppedTracks: 0, createdSessions: 0, started: 0, stopped: 0 })
  await f.conversation.start()
  assert.deepEqual(f.statuses, ['permission', 'connecting', 'connected'])
  assert.equal(f.counts().stoppedTracks, 1)
  assert.equal(f.conversation.mute(true), true)
  assert.equal(f.client().muted, true)
  assert.equal(f.conversation.mute(false), true)
  assert.equal(f.client().muted, false)
  await f.conversation.resumeAudio()
  assert.equal(f.client().resumed, true)
  f.conversation.stop()
  assert.equal(f.statuses.at(-1), 'ended')
  assert.equal(f.counts().stopped, 1)
  assert.equal(f.conversation.mute(true), false)
})

test('repeated Start while active does not open another session', async () => {
  const f = setup()
  await Promise.all([f.conversation.start(), f.conversation.start()])
  await f.conversation.start()
  assert.equal(f.counts().createdSessions, 1)
  f.conversation.dispose()
})

test('microphone denial creates no server session and allows explicit retry', async () => {
  const f = setup({ mediaDevices: { getUserMedia: async () => { const error = new Error(); error.name = 'NotAllowedError'; throw error } } })
  await f.conversation.start()
  assert.equal(f.statuses.at(-1), 'error')
  assert.match(f.errors[0], /permission was not granted/)
  assert.equal(f.counts().createdSessions, 0)
})

test('Cancel while permission prompt is open stops late tracks and makes no session', async () => {
  const permission = deferred()
  const f = setup({ mediaDevices: { getUserMedia: () => permission.promise } })
  const pending = f.conversation.start()
  f.conversation.stop()
  permission.resolve(f.media)
  await pending
  assert.equal(f.counts().stoppedTracks, 1)
  assert.equal(f.counts().createdSessions, 0)
  assert.equal(f.statuses.at(-1), 'ended')
})

test('Cancel while session request is pending prevents a late SDK connection', async () => {
  const session = deferred()
  const f = setup({ createSession: () => session.promise })
  const pending = f.conversation.start()
  await tick()
  f.conversation.stop()
  session.resolve({ accessToken: 'late' })
  await pending
  assert.equal(f.counts().started, 0)
  assert.equal(f.statuses.at(-1), 'ended')
})

test('interruption stops the SDK and never automatically redials', async () => {
  const f = setup()
  await f.conversation.start()
  f.client().emit('error', 'private provider details')
  assert.equal(f.statuses.at(-1), 'error')
  assert.equal(f.counts().stopped, 1)
  assert.equal(f.errors[0].includes('private provider details'), false)
  await tick()
  assert.equal(f.counts().createdSessions, 1)
  await f.conversation.start()
  assert.equal(f.counts().createdSessions, 2)
  f.conversation.dispose()
})

test('unmount releases active client without publishing stale updates', async () => {
  const f = setup()
  await f.conversation.start()
  const old = f.client()
  f.conversation.dispose()
  old.emit('call_ended')
  assert.deepEqual(f.statuses, ['permission', 'connecting', 'connected'])
  assert.equal(f.counts().stopped, 1)
})

test('a stalled SDK connection times out and is stopped', async () => {
  let stopped = 0
  class Stalled extends EventEmitter { async startCall() {} stopCall() { stopped++ } }
  const f = setup({ connectionTimeoutMs: 10, loadClient: async () => ({ RetellWebClient: Stalled }) })
  await f.conversation.start()
  await new Promise(resolve => setTimeout(resolve, 25))
  assert.equal(f.statuses.at(-1), 'error')
  assert.equal(stopped, 1)
  assert.match(f.errors[0], /did not connect/)
})
