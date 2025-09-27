import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Minimize2,
  Maximize2,
  User,
  Bot,
  Loader2,
  Phone
} from 'lucide-react'
import { trackVoiceEvent, getCallStatus } from './RetellWebCall.js'
import { RetellWebClient } from 'retell-client-js-sdk'

const VoiceCallInterface = ({ callData, onEndCall }) => {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isDeafened, setIsDeafened] = useState(false)
  const [callStatus, setCallStatus] = useState('connecting')
  const [callDuration, setCallDuration] = useState(0)
  const [isVektaSpeaking, setIsVektaSpeaking] = useState(false)
  const [isUserSpeaking, setIsUserSpeaking] = useState(false)
  const [connectionQuality, setConnectionQuality] = useState('excellent')
  
  const callStartTime = useRef(Date.now())
  const durationInterval = useRef(null)
  const retellClient = useRef(null)

  // Initialize RetellAI Web Call
  useEffect(() => {
    if (!callData?.access_token) return

    const initializeCall = async () => {
      try {
        // Track call start
        trackVoiceEvent('call_started', {
          call_id: callData.call_id,
          agent_id: callData.agent_id
        })

        setCallStatus('connecting')
        console.log('🎙️ Initializing RetellWebClient with access token:', callData.access_token.substring(0, 20) + '...')

        // Initialize RetellAI Web SDK
        retellClient.current = new RetellWebClient()

        // Set up event listeners
        retellClient.current.on('conversationStarted', () => {
          console.log('🎉 Conversation started')
          setCallStatus('connected')
          startCallTimer()
          trackVoiceEvent('call_connected', {
            call_id: callData.call_id
          })
        })

        retellClient.current.on('conversationEnded', ({ code, reason }) => {
          console.log('📞 Conversation ended:', { code, reason })
          setCallStatus('ended')
          trackVoiceEvent('call_ended', {
            call_id: callData.call_id,
            duration: callDuration,
            end_reason: reason
          })
        })

        retellClient.current.on('error', (error) => {
          console.error('❌ RetellWebClient error:', error)
          setCallStatus('error')
          trackVoiceEvent('error_occurred', {
            call_id: callData.call_id,
            error: error.message
          })
        })

        retellClient.current.on('update', (update) => {
          console.log('📊 Call update:', update)
          
          // Handle speaking states
          if (update.transcript) {
            if (update.transcript.role === 'agent') {
              setIsVektaSpeaking(true)
              setIsUserSpeaking(false)
            } else if (update.transcript.role === 'user') {
              setIsUserSpeaking(true)
              setIsVektaSpeaking(false)
            }
          }

          // Handle audio levels for visual feedback
          if (update.audio) {
            // Update connection quality based on audio metrics
            if (update.audio.volume !== undefined) {
              const quality = update.audio.volume > 0.7 ? 'excellent' : 
                            update.audio.volume > 0.4 ? 'good' : 'poor'
              setConnectionQuality(quality)
            }
          }
        })

        // Start the call with the access token
        await retellClient.current.startConversation({
          accessToken: callData.access_token,
          sampleRate: 24000, // High quality audio
          enableUpdate: true  // Enable real-time updates
        })

        console.log('🚀 RetellWebClient conversation started')

      } catch (error) {
        console.error('Failed to initialize call:', error)
        setCallStatus('error')
        trackVoiceEvent('error_occurred', {
          call_id: callData.call_id,
          error: error.message
        })
      }
    }

    initializeCall()

    return () => {
      // Cleanup
      if (durationInterval.current) {
        clearInterval(durationInterval.current)
      }
      
      if (retellClient.current) {
        try {
          retellClient.current.stopConversation()
        } catch (error) {
          console.warn('Error stopping conversation:', error)
        }
      }
    }
  }, [callData])

  const startCallTimer = () => {
    durationInterval.current = setInterval(() => {
      setCallDuration(Math.floor((Date.now() - callStartTime.current) / 1000))
    }, 1000)
  }

  const handleEndCall = () => {
    trackVoiceEvent('call_ended', {
      call_id: callData.call_id,
      duration: callDuration
    })
    
    if (durationInterval.current) {
      clearInterval(durationInterval.current)
    }
    
    onEndCall()
  }

  const toggleMute = () => {
    const newMutedState = !isMuted
    setIsMuted(newMutedState)
    
    // Control actual microphone through RetellWebClient
    if (retellClient.current) {
      try {
        if (newMutedState) {
          retellClient.current.mute()
        } else {
          retellClient.current.unmute()
        }
        console.log(`🎤 Microphone ${newMutedState ? 'muted' : 'unmuted'}`)
      } catch (error) {
        console.warn('Failed to toggle microphone:', error)
      }
    }
    
    trackVoiceEvent('microphone_toggled', { muted: newMutedState })
  }

  const toggleDeafen = () => {
    const newDeafenedState = !isDeafened
    setIsDeafened(newDeafenedState)
    
    // Control actual speaker through RetellWebClient
    if (retellClient.current) {
      try {
        // Note: RetellWebClient may not have direct speaker control
        // This would typically be handled through browser audio APIs
        console.log(`🔊 Speaker ${newDeafenedState ? 'muted' : 'unmuted'}`)
      } catch (error) {
        console.warn('Failed to toggle speaker:', error)
      }
    }
    
    trackVoiceEvent('speaker_toggled', { deafened: newDeafenedState })
  }

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getStatusColor = () => {
    switch (callStatus) {
      case 'connecting': return 'text-yellow-400'
      case 'connected': return 'text-green-400'
      case 'error': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusText = () => {
    switch (callStatus) {
      case 'connecting': return 'Connecting to Vekta...'
      case 'connected': return 'Connected with Vekta'
      case 'error': return 'Connection failed'
      default: return 'Unknown status'
    }
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Card className="glass-card border-primary/50 shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              {/* Vekta Avatar */}
              <div className="relative">
                <div className="w-10 h-10 vektar-gradient rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                {isVektaSpeaking && (
                  <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping"></div>
                )}
              </div>

              {/* Call Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Vekta AI Assistant</p>
                <p className="text-xs text-muted-foreground">{formatDuration(callDuration)}</p>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(false)}
                  className="h-8 w-8 p-0"
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleEndCall}
                  className="h-8 w-8 p-0"
                >
                  <PhoneOff className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="glass-card w-full max-w-md border-primary/50 shadow-2xl">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
              <span className={`text-sm font-medium ${getStatusColor()}`}>
                {getStatusText()}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(true)}
              className="h-8 w-8 p-0"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Vekta Avatar */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="w-24 h-24 vektar-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
                <Bot className="w-12 h-12 text-white" />
              </div>
              
              {/* Speaking Animation */}
              {isVektaSpeaking && (
                <>
                  <div className="absolute inset-0 rounded-full border-4 border-primary/50 animate-ping"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-ping animation-delay-200"></div>
                </>
              )}
              
              {/* Connection Quality Indicator */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-background border-2 border-border rounded-full flex items-center justify-center">
                <div className={`w-3 h-3 rounded-full ${
                  connectionQuality === 'excellent' ? 'bg-green-400' :
                  connectionQuality === 'good' ? 'bg-yellow-400' : 'bg-red-400'
                }`}></div>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-2">Vekta AI Assistant</h3>
            <p className="text-muted-foreground text-sm mb-2">
              {callStatus === 'connecting' ? 'Connecting...' : 'Ready to help with your AI needs'}
            </p>
            <p className="text-primary font-mono text-lg">{formatDuration(callDuration)}</p>
          </div>

          {/* Status Messages */}
          <div className="mb-6 min-h-[60px] flex items-center justify-center">
            {callStatus === 'connecting' && (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Establishing secure connection...</span>
              </div>
            )}
            
            {callStatus === 'connected' && (
              <div className="text-center">
                {isVektaSpeaking ? (
                  <div className="flex items-center justify-center space-x-2 text-primary">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-100"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-200"></div>
                    </div>
                    <span className="text-sm font-medium">Vekta is speaking...</span>
                  </div>
                ) : isUserSpeaking ? (
                  <div className="flex items-center justify-center space-x-2 text-blue-400">
                    <Mic className="w-4 h-4" />
                    <span className="text-sm font-medium">Listening...</span>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Speak naturally - Vekta is listening
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Call Controls */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant={isMuted ? "destructive" : "outline"}
              size="lg"
              onClick={toggleMute}
              className="w-14 h-14 rounded-full"
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </Button>

            <Button
              variant="destructive"
              size="lg"
              onClick={handleEndCall}
              className="w-16 h-16 rounded-full vektar-gradient hover-glow"
            >
              <PhoneOff className="w-7 h-7" />
            </Button>

            <Button
              variant={isDeafened ? "destructive" : "outline"}
              size="lg"
              onClick={toggleDeafen}
              className="w-14 h-14 rounded-full"
            >
              {isDeafened ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </Button>
          </div>

          {/* Call Info */}
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Call ID: {callData.call_id?.slice(-8)}</span>
              <span>Quality: {connectionQuality}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Styles */}
      <style jsx>{`
        .animation-delay-100 {
          animation-delay: 100ms;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </div>
  )
}

export default VoiceCallInterface
