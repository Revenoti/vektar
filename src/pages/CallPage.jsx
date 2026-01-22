import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import SEO from '@/components/SEO.jsx'
import { 
  Phone, 
  Mic, 
  MessageSquare, 
  Clock, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Users,
  Brain,
  HeadphonesIcon
} from 'lucide-react'
import vectorikLogo from '@/assets/vectorik-logo.png'

const CallPage = () => {
  const [isVoiceButtonVisible, setIsVoiceButtonVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVoiceButtonVisible(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const benefits = [
    {
      icon: Clock,
      title: 'Instant Response',
      description: 'No waiting, no forms. Get answers to your questions in real-time.'
    },
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Your Vektar AI Agent understands your business needs and provides tailored recommendations.'
    },
    {
      icon: Shield,
      title: 'No Commitment',
      description: 'Just a friendly conversation to explore how AI can help your business.'
    }
  ]

  const talkingPoints = [
    'Your specific business challenges',
    'Which AI solutions fit your needs',
    'Implementation timeline and process',
    'Pricing and ROI expectations',
    'Integration with your existing tools',
    'Any questions about our technology'
  ]

  const stats = [
    { value: '150+', label: 'AI Projects Delivered' },
    { value: '95%', label: 'Client Satisfaction' },
    { value: '24/7', label: 'AI Availability' }
  ]

  return (
    <>
      <SEO 
        title="Talk to Vektar AI Agent - Free Strategy Call"
        description="Skip the wait! Get instant answers about AI solutions through a real-time voice conversation. Book a free strategy call with Vektar's AI agent. Available 24/7."
        canonical="https://vektar.io/call"
      />
      <div className="min-h-screen circuit-pattern relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Conversations</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 text-foreground">
              Talk to Vektar AI Agent
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6">
              Skip the forms and long wait times. Have a real-time conversation with your Vektar AI Agent 
              to explore how we can transform your business with AI solutions.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full">
                  <span className="text-xl font-bold text-primary">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="order-2 lg:order-1 space-y-6">
              <Card className="bg-card/80 backdrop-blur-xl border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    What We'll Discuss
                  </h3>
                  <ul className="space-y-3">
                    {talkingPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-4 bg-secondary/30 rounded-xl border border-border/30"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <Card className="bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 border-primary/30 overflow-hidden">
                <CardContent className="p-8 md:p-10 text-center">
                  <div className="relative mb-8">
                    <div className="w-32 h-32 mx-auto relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-500 to-pink-500 rounded-full animate-pulse opacity-30"></div>
                      <div className="absolute inset-2 bg-gradient-to-br from-primary via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
                        <img 
                          src={vectorikLogo} 
                          alt="Vektar AI" 
                          className="w-20 h-20 rounded-full border-4 border-white/20"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-4 border-background">
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    Vektar AI Agent Online
                  </Badge>

                  <h3 className="text-2xl font-bold mb-2">Vektar AI Agent</h3>
                  <p className="text-muted-foreground mb-8">
                    Ready to help you explore AI solutions for your business
                  </p>

                  <div className="space-y-4">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                      <Button
                        className="relative w-full py-8 text-xl font-bold vektar-gradient hover-glow rounded-xl shadow-2xl transition-all duration-300 hover:scale-105"
                        onClick={() => {
                          const voiceButton = document.querySelector('[data-voice-button]')
                          if (voiceButton) {
                            voiceButton.click()
                          }
                        }}
                      >
                        <Phone className="w-6 h-6 mr-3 animate-bounce" />
                        Start Voice Call
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Click to start a voice conversation with your Vektar AI Agent.
                      <br />
                      Average call duration: 3-5 minutes
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border/50">
                    <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span>Secure</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span>Instant</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span>Personal</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Prefer a different method?
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <a 
                    href="tel:+13215995514"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    321-599-5514
                  </a>
                  <a 
                    href="mailto:info@vektar.io"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors text-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    info@vektar.io
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-secondary/50 rounded-full border border-border/50">
              <HeadphonesIcon className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                Your Vektar AI Agent is trained on our complete knowledge base and can answer any question about our services
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default CallPage
