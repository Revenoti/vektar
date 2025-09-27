import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { 
  Phone, 
  PhoneCall, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Loader2,
  MessageCircle,
  AlertCircle,
  Wifi,
  WifiOff
} from 'lucide-react'
import VoiceCallInterface from './VoiceCallInterface.jsx'
import { createWebCall, trackVoiceEvent, validateConfig } from './RetellWebCall.js'

const FloatingVoiceButton = () => {
  const [isCallActive, setIsCallActive] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [callData, setCallData] = useState(null)
  const [error, setError] = useState(null)
  const [isVisible, setIsVisible] = useState(true)
  const [configValid, setConfigValid] = useState(true)

  // Validate configuration on component mount
  useEffect(() => {
    const config = validateConfig()
    setConfigValid(config.isValid)
    
    if (!config.isValid) {
      console.warn('⚠️ Voice Assistant configuration invalid:', config.errors)
      trackVoiceEvent('configuration_invalid', {
        errors: config.errors,
        warnings: config.warnings
      })
    } else {
      console.log('✅ Voice Assistant configuration valid')
      trackVoiceEvent('configuration_valid', {
        warnings: config.warnings
      })
    }
  }, [])

  // Handle scroll to show/hide button elegantly
  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateScrollDirection = () => {
      const scrollY = window.scrollY
      
      if (Math.abs(scrollY - lastScrollY) < 10) {
        ticking = false
        return
      }
      
      setIsVisible(scrollY < 100 || scrollY < lastScrollY)
      lastScrollY = scrollY > 0 ? scrollY : 0
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track voice button visibility for analytics
  useEffect(() => {
    if (isVisible && configValid) {
      trackVoiceEvent('voice_button_viewed', {
        page_section: window.location.hash || 'home',
        scroll_position: window.scrollY
      })
    }
  }, [isVisible, configValid])

  const handleStartCall = async () => {
    // Validate configuration before starting call
    const config = validateConfig()
    if (!config.isValid) {
      setError(`Configuration Error: ${config.errors.join(', ')}`)
      trackVoiceEvent('call_start_failed', {
        reason: 'invalid_configuration',
        errors: config.errors
      })
      return
    }

    setIsConnecting(true)
    setError(null)
    
    try {
      console.log('🎙️ Starting voice call...')
      
      trackVoiceEvent('call_start_initiated', {
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent
      })

      const webCallData = await createWebCall()
      console.log('✅ Web call created successfully, opening interface...')
      
      setCallData(webCallData)
      setIsCallActive(true)
      
      trackVoiceEvent('call_interface_opened', {
        call_id: webCallData.call_id,
        agent_id: webCallData.agent_id
      })

    } catch (err) {
      console.error('❌ Failed to start call:', err)
      setError(err.message)
      
      trackVoiceEvent('call_start_failed', {
        reason: 'api_error',
        error: err.message
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const handleEndCall = () => {
    console.log('📞 Ending voice call...')
    
    trackVoiceEvent('call_interface_closed', {
      call_id: callData?.call_id,
      timestamp: new Date().toISOString()
    })

    setIsCallActive(false)
    setCallData(null)
    setError(null)
  }

  // Don't render if configuration is invalid
  if (!configValid) {
    return null
  }

  if (isCallActive && callData) {
    return (
      <VoiceCallInterface 
        callData={callData}
        onEndCall={handleEndCall}
      />
    )
  }

  return (
    <>
      {/* Floating Voice Button */}
      <div 
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-in-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
      >
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-background border border-border rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
            <p className="text-sm font-medium">Need help? Ask Vekta!</p>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border"></div>
          </div>
        </div>

        {/* Main Button */}
        <Button
          onClick={handleStartCall}
          disabled={isConnecting}
          className={`
            group relative w-16 h-16 rounded-full shadow-2xl
            vektar-gradient hover-glow
            transition-all duration-300 ease-in-out
            hover:scale-110 hover:shadow-3xl
            ${isConnecting ? 'animate-pulse' : 'animate-bounce-subtle'}
          `}
        >
          {/* Pulsing Ring Animation */}
          <div className="absolute inset-0 rounded-full vektar-gradient opacity-30 animate-ping"></div>
          <div className="absolute inset-0 rounded-full vektar-gradient opacity-20 animate-ping animation-delay-200"></div>
          
          {/* Icon */}
          <div className="relative z-10">
            {isConnecting ? (
              <Loader2 className="w-7 h-7 text-white animate-spin" />
            ) : (
              <Phone className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
            )}
          </div>

          {/* Status Indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </Button>

        {/* Secondary Action Hint */}
        <div className="absolute -top-2 -left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
            <MessageCircle className="w-3 h-3 text-primary" />
          </div>
        </div>
      </div>

      {/* Error Toast */}
      {error && (
        <div className="fixed bottom-24 right-6 z-50 bg-destructive text-destructive-foreground px-4 py-3 rounded-lg shadow-lg animate-slide-up">
          <p className="text-sm font-medium">Failed to start call</p>
          <p className="text-xs opacity-90">{error}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setError(null)}
            className="absolute top-1 right-1 h-6 w-6 p-0"
          >
            ×
          </Button>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </>
  )
}

export default FloatingVoiceButton
