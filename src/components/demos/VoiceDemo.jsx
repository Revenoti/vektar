import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { 
  Phone, 
  PhoneCall, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause,
  RotateCcw,
  Calendar,
  User,
  Clock
} from 'lucide-react'

const VoiceDemo = () => {
  const [currentCall, setCurrentCall] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [callProgress, setCallProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const callScenarios = [
    {
      id: 1,
      title: "Appointment Booking",
      caller: "Sarah Johnson",
      phone: "(555) 123-4567",
      duration: "2:34",
      steps: [
        {
          time: "0:00",
          speaker: "AI",
          text: "Thank you for calling Vectorik Solutions! This is Emma, your AI assistant. How can I help you today?",
          action: "greeting"
        },
        {
          time: "0:05",
          speaker: "Caller",
          text: "Hi, I'd like to schedule a consultation about your AI chatbot services.",
          action: "request"
        },
        {
          time: "0:08",
          speaker: "AI",
          text: "I'd be happy to help you schedule a consultation! Let me check our available times. Can you tell me your preferred day and time?",
          action: "processing"
        },
        {
          time: "0:15",
          speaker: "Caller",
          text: "I'm flexible, but preferably sometime next week in the afternoon.",
          action: "response"
        },
        {
          time: "0:18",
          speaker: "AI",
          text: "Perfect! I have availability next Tuesday at 2 PM or Wednesday at 3 PM. Which works better for you?",
          action: "scheduling"
        },
        {
          time: "0:25",
          speaker: "Caller",
          text: "Tuesday at 2 PM sounds great.",
          action: "confirmation"
        },
        {
          time: "0:28",
          speaker: "AI",
          text: "Excellent! I've scheduled your consultation for Tuesday, October 3rd at 2:00 PM. You'll receive a confirmation email shortly. Is there anything specific you'd like to discuss during the consultation?",
          action: "booking_complete"
        }
      ]
    },
    {
      id: 2,
      title: "Technical Support",
      caller: "Mike Chen",
      phone: "(555) 987-6543",
      duration: "3:12",
      steps: [
        {
          time: "0:00",
          speaker: "AI",
          text: "Hello! You've reached Vectorik technical support. I'm Alex, your AI support specialist. What can I help you with today?",
          action: "greeting"
        },
        {
          time: "0:06",
          speaker: "Caller",
          text: "Hi, I'm having trouble with the chatbot integration on our website. It's not responding to customer queries.",
          action: "issue_report"
        },
        {
          time: "0:12",
          speaker: "AI",
          text: "I understand you're experiencing issues with your chatbot integration. Let me run a quick diagnostic. Can you provide me with your account ID or the website URL?",
          action: "troubleshooting"
        },
        {
          time: "0:20",
          speaker: "Caller",
          text: "Sure, it's account ID VK-2847 and the website is techcorp.com",
          action: "info_provided"
        },
        {
          time: "0:25",
          speaker: "AI",
          text: "Thank you. I'm checking your system status now... I can see the issue. There was a recent API update that requires a configuration change. I'm pushing the fix to your system now. This should resolve the issue within 2-3 minutes.",
          action: "solution_provided"
        },
        {
          time: "0:40",
          speaker: "Caller",
          text: "That was fast! Let me check... Yes, it's working now. Thank you so much!",
          action: "resolution_confirmed"
        }
      ]
    },
    {
      id: 3,
      title: "Sales Inquiry",
      caller: "Jennifer Davis",
      phone: "(555) 456-7890",
      duration: "4:18",
      steps: [
        {
          time: "0:00",
          speaker: "AI",
          text: "Good afternoon! Thank you for calling Vectorik Solutions. This is Jordan, your AI sales consultant. How may I assist you today?",
          action: "greeting"
        },
        {
          time: "0:07",
          speaker: "Caller",
          text: "Hi, I'm interested in learning more about your document intelligence solution for our law firm.",
          action: "inquiry"
        },
        {
          time: "0:13",
          speaker: "AI",
          text: "Excellent choice! Our document intelligence solution is perfect for law firms. It can process contracts, legal documents, and case files with 99% accuracy. What type of documents do you handle most frequently?",
          action: "qualification"
        },
        {
          time: "0:25",
          speaker: "Caller",
          text: "Mainly contracts, court filings, and client correspondence. We process about 500 documents per week.",
          action: "requirements"
        },
        {
          time: "0:32",
          speaker: "AI",
          text: "Based on your volume, our Enterprise plan would be ideal. It includes automated contract analysis, compliance checking, and integration with legal databases. The ROI for firms your size is typically 400% within the first year. Would you like me to schedule a personalized demo?",
          action: "recommendation"
        },
        {
          time: "0:50",
          speaker: "Caller",
          text: "Yes, that sounds very promising. When can we schedule the demo?",
          action: "interest_confirmed"
        }
      ]
    }
  ]

  useEffect(() => {
    let interval
    if (isPlaying && currentCall) {
      interval = setInterval(() => {
        setCallProgress(prev => {
          const newProgress = prev + 1
          const totalDuration = currentCall.steps.length * 8 // 8 seconds per step
          
          if (newProgress >= totalDuration) {
            setIsPlaying(false)
            return totalDuration
          }
          
          const newStep = Math.floor(newProgress / 8)
          if (newStep !== currentStep && newStep < currentCall.steps.length) {
            setCurrentStep(newStep)
          }
          
          return newProgress
        })
      }, 100)
    }
    
    return () => clearInterval(interval)
  }, [isPlaying, currentCall, currentStep])

  const startCall = (scenario) => {
    setCurrentCall(scenario)
    setCallProgress(0)
    setCurrentStep(0)
    setIsPlaying(true)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const resetCall = () => {
    setCallProgress(0)
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const endCall = () => {
    setCurrentCall(null)
    setCallProgress(0)
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!currentCall) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold mb-2">Voice Receptionist Demo</h3>
          <p className="text-muted-foreground">
            Experience how our AI handles real customer calls with natural conversation
          </p>
        </div>

        <div className="grid gap-4">
          {callScenarios.map((scenario) => (
            <Card key={scenario.id} className="glass-card hover-glow cursor-pointer transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{scenario.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {scenario.caller}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {scenario.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => startCall(scenario)}
                    className="vectorik-gradient hover-glow"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Play Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="glass-card">
          <CardContent className="p-6">
            <h4 className="font-semibold mb-4">Key Features</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Natural language processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Appointment scheduling</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Call routing & escalation</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">24/7 availability</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">CRM integration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Multi-language support</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Call Header */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                <PhoneCall className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">{currentCall.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {currentCall.caller} • {currentCall.phone}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-mono">
                {formatTime(Math.floor(callProgress / 10))} / {currentCall.duration}
              </span>
              <Button variant="outline" size="sm" onClick={endCall}>
                End Call
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-secondary rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-100"
              style={{ 
                width: `${(callProgress / (currentCall.steps.length * 8)) * 100}%` 
              }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={resetCall}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              onClick={togglePlayPause}
              className="vectorik-gradient hover-glow"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 mr-2" />
              ) : (
                <Play className="w-4 h-4 mr-2" />
              )}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Conversation */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <h4 className="font-semibold mb-4">Live Conversation</h4>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {currentCall.steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 transition-all duration-500 ${
                  index <= currentStep ? 'opacity-100' : 'opacity-30'
                } ${index === currentStep ? 'scale-105' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.speaker === 'AI' 
                    ? 'bg-gradient-to-br from-primary to-accent text-white' 
                    : 'bg-secondary text-foreground'
                }`}>
                  {step.speaker === 'AI' ? (
                    <Mic className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm">
                      {step.speaker === 'AI' ? 'AI Assistant' : 'Caller'}
                    </span>
                    <span className="text-xs text-muted-foreground">{step.time}</span>
                  </div>
                  <p className="text-sm bg-secondary/50 rounded-lg p-3">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call Analytics */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <h4 className="font-semibold mb-4">Real-time Analytics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">0.3s</div>
              <div className="text-xs text-muted-foreground">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">98%</div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">95%</div>
              <div className="text-xs text-muted-foreground">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">Auto</div>
              <div className="text-xs text-muted-foreground">Resolution</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default VoiceDemo
