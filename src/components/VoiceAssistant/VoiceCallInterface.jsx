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
  Phone,
  AlertCircle,
  RefreshCw,
  Wifi,
  WifiOff
} from 'lucide-react'
import { 
  trackVoiceEvent, 
  startVoiceConversation, 
  stopVoiceConversation, 
  getCurrentClient,
  validateConfig 
} from './RetellWebCall.js'

const VoiceCallInterface = ({ callData, onEndCall }) => {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isDeafened, setIsDeafened] = useState(false)
  const [callStatus, setCallStatus] = useState('connecting')
  const [callDuration, setCallDuration] = useState(0)
  const [isVektaSpeaking, setIsVektaSpeaking] = useState(false)
  const [isUserSpeaking, setIsUserSpeaking] = useState(false)
  const [connectionQuality, setConnectionQuality] = useState('excellent')
  const [error, setError] = useState(null)
  const [isRetrying, setIsRetrying] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  
  const callStartTime = useRef(Date.now())
  const durationInterval = useRef(null)
  const retellClient = useRef(null)
  const maxRetries = 3

  // Initialize RetellAI Voice Conversation with Enhanced Error Handling
  useEffect(() => {
    if (!callData?.access_token) {
      setError('Invalid call data: missing access token')
      setCallStatus('error')
      return
    }

    const initializeCall = async () => {
      try {
        setCallStatus('connecting')
        setError(null)
        
        console.log('🎙️ Initializing voice conversation...')

        // Validate configuration before starting
        const config = validateConfig()
        if (!config.isValid) {
          throw new Error(`Configuration error: ${config.errors.join(', ')}`)
        }

        // Track call initialization
        trackVoiceEvent('call_initialization_started', {
          call_id: callData.call_id,
          agent_id: callData.agent_id,
          retry_count: retryCount
        })

        // Set up event handlers for the voice conversation
        const eventHandlers = {
          onConversationStarted: () => {
            console.log('🎉 Voice conversation started successfully')
            setCallStatus('connected')
            setError(null)
            setRetryCount(0)
            startCallTimer()
            trackVoiceEvent('call_connected', {
              call_id: callData.call_id,
              retry_count: retryCount
            })
          },

          onConversationEnded: ({ code, reason }) => {
            console.log('📞 Voice conversation ended:', { code, reason })
            setCallStatus('ended')
            trackVoiceEvent('call_ended', {
              call_id: callData.call_id,
              duration: callDuration,
              end_code: code,
              end_reason: reason
            })
          },

          onError: (error) => {
            console.error('❌ Voice conversation error:', error)
            setCallStatus('error')
            setError(error.message)
            trackVoiceEvent('conversation_error', {
              call_id: callData.call_id,
              error: error.message,
              retry_count: retryCount
            })
          },

          onUpdate: (update) => {
            console.log('📊 Conversation update:', update)
            
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

            // Handle audio quality indicators
            if (update.audio) {
              if (update.audio.volume !== undefined) {
                const quality = update.audio.volume > 0.7 ? 'excellent' : 
                              update.audio.volume > 0.4 ? 'good' : 'poor'
                setConnectionQuality(quality)
              }
            }

            // Reset speaking states after a delay
            setTimeout(() => {
              setIsVektaSpeaking(false)
              setIsUserSpeaking(false)
            }, 2000)
          }
        }

        // Start the voice conversation
        retellClient.current = await startVoiceConversation(callData, eventHandlers)
        console.log('✅ Voice conversation initialized successfully')

      } catch (error) {
        console.error('❌ Failed to initialize voice conversation:', error)
        setCallStatus('error')
        setError(error.message)
        
        trackVoiceEvent('call_initialization_failed', {
          call_id: callData.call_id,
          error: error.message,
          retry_count: retryCount
        })

        // Auto-retry logic for certain errors
        if (retryCount < maxRetries && shouldRetry(error.message)) {
          console.log(`🔄 Auto-retrying in 3 seconds... (attempt ${retryCount + 1}/${maxRetries})`)
          setTimeout(() => {
            setRetryCount(prev => prev + 1)
            setIsRetrying(true)
            // Re-trigger initialization by updating a dependency
            initializeCall()
          }, 3000)
        }
      }
    }

    initializeCall()

    return () => {
      // Cleanup
      if (durationInterval.current) {
        clearInterval(durationInterval.current)
      }
      
      // Stop voice conversation
      stopVoiceConversation()
      retellClient.current = null
    }
  }, [callData, retryCount])

  // Determine if an error should trigger auto-retry
  const shouldRetry = (errorMessage) => {
    const retryableErrors = [
      'network',
      'connection',
      'timeout',
      'temporarily unavailable',
      'failed to load'
    ]
    return retryableErrors.some(keyword => 
      errorMessage.toLowerCase().includes(keyword)
    )
  }

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

  const handleRetry = () => {
    if (retryCount >= maxRetries) {
      console.warn('Maximum retry attempts reached')
      return
    }

    console.log(`🔄 Manual retry initiated (attempt ${retryCount + 1}/${maxRetries})`)
    setIsRetrying(true)
    setError(null)
    setRetryCount(prev => prev + 1)
    
    trackVoiceEvent('manual_retry_initiated', {
      call_id: callData.call_id,
      retry_count: retryCount + 1,
      error: error
    })
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
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-muted-foreground mb-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">
                    {isRetrying ? `Retrying connection... (${retryCount}/${maxRetries})` : 'Establishing secure connection...'}
                  </span>
                </div>
                {isRetrying && (
                  <p className="text-xs text-muted-foreground">
                    Please wait while we reconnect...
                  </p>
                )}
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

            {callStatus === 'error' && (
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-red-400 mb-3">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Connection Failed</span>
                </div>
                {error && (
                  <p className="text-xs text-muted-foreground mb-3 max-w-xs">
                    {error}
                  </p>
                )}
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRetry}
                    disabled={isRetrying || retryCount >= maxRetries}
                    className="text-xs"
                  >
                    {isRetrying ? (
                      <>
                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                        Retrying...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Try Again
                      </>
                    )}
                  </Button>
                  {retryCount >= maxRetries && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleEndCall}
                      className="text-xs text-muted-foreground"
                    >
                      Close
                    </Button>
                  )}
                </div>
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
