import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Headphones, LoaderCircle, Mic, MicOff, Phone, PhoneOff, RotateCcw, ShieldCheck, Volume2 } from 'lucide-react'
import { createBrowserConversation, getCallAvailability, newRequestKey, requestCallback } from '../api/calls'
import './CallExperience.css'

const BUSY = ['permission', 'connecting', 'connected']
const LABELS = { idle: 'Ready when you are', permission: 'Waiting for microphone permission', connecting: 'Connecting your call', connected: 'Connected to Vektar AI', ended: 'Call ended · microphone off', error: 'Call disconnected · microphone off' }

export default function CallExperience() {
  const [mode, setMode] = useState('web')
  const [availability, setAvailability] = useState(null)
  const [checking, setChecking] = useState(true)
  const [refresh, setRefresh] = useState(0)
  const [phase, setPhase] = useState('idle')
  const [voiceConsent, setVoiceConsent] = useState(false)
  const [muted, setMuted] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [voiceError, setVoiceError] = useState('')
  const [callbackStatus, setCallbackStatus] = useState('idle')
  const [callbackMessage, setCallbackMessage] = useState('')
  const [callbackUncertain, setCallbackUncertain] = useState(false)
  const [details, setDetails] = useState({ firstName: '', lastName: '', phone: '', consent: false, website: '' })
  const conversation = useRef(null)
  const callbackRequest = useRef(null)
  const callbackKey = useRef(null)
  const callbackBusy = useRef(false)

  useEffect(() => {
    const controller = new AbortController()
    let mounted = true
    const timeout = setTimeout(() => controller.abort(), 8000)
    getCallAvailability(controller.signal).then(data => { if (mounted) setAvailability(data) }).catch(() => { if (mounted) setAvailability({ web: false, callback: false }) }).finally(() => { clearTimeout(timeout); if (mounted) setChecking(false) })
    return () => { mounted = false; clearTimeout(timeout); controller.abort() }
  }, [refresh])

  useEffect(() => {
    conversation.current = createBrowserConversation({ onStatus: setPhase, onError: setVoiceError })
    return () => { conversation.current?.dispose(); callbackRequest.current?.abort() }
  }, [])

  useEffect(() => {
    if (phase !== 'connected') return
    const start = Date.now()
    const timer = setInterval(() => setSeconds(Math.floor((Date.now() - start) / 1000)), 1000)
    return () => clearInterval(timer)
  }, [phase])

  const busy = BUSY.includes(phase)
  const callbackSending = callbackStatus === 'sending'
  const changeMode = next => { if (!busy && !callbackSending) setMode(next) }
  const start = () => { setVoiceError(''); setMuted(false); setSeconds(0); conversation.current?.start() }
  const changeDetail = event => {
    const { name, value, checked, type } = event.target
    setDetails(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (!callbackUncertain) { callbackKey.current = null; setCallbackStatus('idle'); setCallbackMessage('') }
  }
  const submitCallback = async event => {
    event.preventDefault()
    if (callbackBusy.current || callbackUncertain || callbackStatus === 'accepted' || !details.consent || !availability?.callback) return
    callbackBusy.current = true
    setCallbackStatus('sending')
    setCallbackMessage('')
    callbackKey.current ||= newRequestKey()
    const controller = new AbortController()
    callbackRequest.current = controller
    const timeout = setTimeout(() => controller.abort(), 16000)
    try {
      const data = await requestCallback(details, callbackKey.current, controller.signal)
      setCallbackStatus('accepted')
      setCallbackMessage(data.message)
    } catch (error) {
      const uncertain = ['OUTCOME_UNKNOWN', 'NETWORK_ERROR', 'INVALID_RESPONSE'].includes(error.code) || error.name === 'AbortError'
      setCallbackUncertain(uncertain)
      setCallbackStatus('error')
      setCallbackMessage(uncertain ? 'We could not confirm the response. A call may still arrive. Please do not submit another request.' : error.message)
    } finally { clearTimeout(timeout); callbackBusy.current = false; callbackRequest.current = null }
  }

  return (
    <section className="call-experience surface" aria-label="Talk to Vektar AI">
      <div className="call-experience-topline"><span className="eyebrow">Choose your conversation</span><ShieldCheck size={17} aria-hidden="true" /></div>
      <div className="call-mode-switch" aria-label="Choose how to call">
        <button type="button" aria-pressed={mode === 'web'} onClick={() => changeMode('web')} disabled={busy || callbackSending}><Headphones size={18} aria-hidden="true" /> In your browser</button>
        <button type="button" aria-pressed={mode === 'callback'} onClick={() => changeMode('callback')} disabled={busy || callbackSending}><Phone size={17} aria-hidden="true" /> Call my phone</button>
      </div>

      {mode === 'web' ? (
        <div className="call-panel">
          <div className={`call-orbit ${phase === 'connected' ? 'is-connected' : ''}`} aria-hidden="true"><span /><span /><div><Mic size={32} strokeWidth={1.5} /></div></div>
          <div className="call-intro"><h2>Meet your next advantage.</h2><p>Talk through one workflow with Vektar’s AI agent. Explore what an agent could do, where people stay involved, and what comes next.</p></div>
          <div className="call-status" role="status" aria-live="polite"><span className={`call-status-dot ${phase === 'connected' ? 'is-live' : ''}`} />{busy || ['ended', 'error'].includes(phase) ? LABELS[phase] : checking ? 'Checking calling availability' : availability?.web ? LABELS.idle : 'Browser calling is currently unavailable'}{phase === 'connected' && <span className="call-time">{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}</span>}</div>
          {voiceError && <p className="call-notice is-error" role="alert">{voiceError}</p>}
          {!busy ? <>
            <label className="call-consent"><input type="checkbox" checked={voiceConsent} onChange={event => setVoiceConsent(event.target.checked)} /><span>I agree to speak with an AI agent and allow Retell to process my call audio. I’ll be asked for microphone access.</span></label>
            <button type="button" className="button button-primary call-main-action" disabled={!voiceConsent || !availability?.web || checking} onClick={start}><Mic size={18} aria-hidden="true" />{['ended', 'error'].includes(phase) ? 'Start a new call' : 'Start voice conversation'}<ArrowUpRight size={18} aria-hidden="true" /></button>
          </> : <div className="call-controls">
            {phase === 'connected' && <><button className="button button-secondary" type="button" onClick={() => { try { if (conversation.current?.mute(!muted)) setMuted(!muted) } catch { setVoiceError('Microphone control failed. End the call to turn the microphone off.') } }} aria-pressed={muted}>{muted ? <MicOff size={17} aria-hidden="true" /> : <Mic size={17} aria-hidden="true" />}{muted ? 'Unmute' : 'Mute'}</button><button className="button button-secondary call-audio" type="button" onClick={() => conversation.current?.resumeAudio().catch(() => setVoiceError('Audio playback is blocked. Check your browser’s sound permissions.'))}><Volume2 size={17} aria-hidden="true" />Enable audio</button></>}
            <button className="button call-end" type="button" onClick={() => conversation.current?.stop()}><PhoneOff size={17} aria-hidden="true" />{phase === 'connected' ? 'End call' : 'Cancel connection'}</button>
          </div>}
          {!checking && !availability?.web && !busy && <p className="call-note">No call has been started. {availability?.callback ? <button className="call-text-button" onClick={() => changeMode('callback')}>Try a phone callback</button> : 'Please check again later.'}</p>}
        </div>
      ) : (
        <div className="call-panel callback-panel">
          <div className="call-intro"><h2>Let the conversation come to you.</h2><p>Request a one-time call from Vektar’s AI agent. Bring one workflow you’d like to improve, and explore what’s possible.</p></div>
          {callbackStatus === 'accepted' ? <div className="callback-confirmation" role="status"><span className="callback-check"><Check size={24} aria-hidden="true" /></span><h3>Callback request accepted</h3><p>{callbackMessage}</p><p className="call-note">You can hang up at any time. This does not sign you up for future calls.</p></div> : <form onSubmit={submitCallback} className="callback-form">
            <fieldset disabled={callbackSending || callbackUncertain}><legend className="sr-only">Callback details</legend>
              <div className="callback-name-row"><label htmlFor="callback-first">First name<input className="field" id="callback-first" name="firstName" autoComplete="given-name" maxLength={60} required value={details.firstName} onChange={changeDetail} /></label><label htmlFor="callback-last">Last name<input className="field" id="callback-last" name="lastName" autoComplete="family-name" maxLength={60} required value={details.lastName} onChange={changeDetail} /></label></div>
              <label htmlFor="callback-phone">Phone number<input className="field" id="callback-phone" type="tel" name="phone" autoComplete="tel" inputMode="tel" maxLength={39} placeholder="+1 321 555 0123" aria-describedby="callback-phone-hint" required value={details.phone} onChange={changeDetail} /></label><p id="callback-phone-hint" className="call-note">Include your country code. Use a number you own or are authorized to use.</p>
              <label className="call-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" value={details.website} onChange={changeDetail} /></label>
              <label className="call-consent"><input type="checkbox" name="consent" required checked={details.consent} onChange={changeDetail} /><span>I request one automated AI call from Vektar at this number and agree to Retell processing my name, number and call audio. This consent is not required to buy anything. Carrier charges may apply.</span></label>
              <button className="button button-primary call-main-action" type="submit" disabled={checking || !availability?.callback || !details.consent || callbackSending || callbackUncertain}>{callbackSending ? <LoaderCircle className="call-spinner" size={18} aria-hidden="true" /> : <Phone size={18} aria-hidden="true" />}{callbackSending ? 'Sending your call request' : 'Call me with Vektar AI'}<ArrowUpRight size={18} aria-hidden="true" /></button>
            </fieldset>
            {callbackMessage && <p className="call-notice is-error" role="alert">{callbackMessage}</p>}
            {!checking && !availability?.callback && <p className="call-notice" role="status">Phone callbacks are currently unavailable. No request has been sent.{availability?.web && <> <button type="button" className="call-text-button" onClick={() => changeMode('web')}>Try a browser call</button></>}</p>}
            <p className="call-note">Once sent, the request cannot be canceled from this page. You can decline the call or hang up at any time.</p>
          </form>}
        </div>
      )}
      <div className="call-privacy-note"><ShieldCheck size={16} aria-hidden="true" /><p>You’ll be speaking with AI. Retell processes call audio; recordings or transcripts may be stored according to Vektar’s agent settings. Avoid sharing sensitive information. <a href="https://www.retellai.com/legal/privacy-policy" target="_blank" rel="noreferrer">Retell privacy policy</a></p></div>
      {!busy && !callbackSending && !checking && (!availability?.web || !availability?.callback) && <button className="call-text-button call-recheck" type="button" onClick={() => { setChecking(true); setRefresh(value => value + 1) }}><RotateCcw size={14} aria-hidden="true" />Check availability again</button>}
    </section>
  )
}
