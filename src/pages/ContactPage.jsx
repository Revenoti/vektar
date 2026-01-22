import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Phone, Mail, MapPin, Clock, Sparkles, MessageSquare, ArrowRight } from 'lucide-react'

const ContactPage = () => {
  return (
    <>
      <section className="py-8 sm:py-12 circuit-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Let's <span className="text-foreground">Talk</span>
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to transform your business with AI? We'd love to hear about your challenges 
              and discuss how we can help.
            </p>
          </div>

          <Card className="max-w-4xl mx-auto mb-6 sm:mb-10 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 border-primary/30 overflow-hidden">
            <div className="p-6 sm:p-8 text-center">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-4">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Vektar AI Agent Online
              </Badge>
              <h2 className="text-xl sm:text-2xl font-bold mb-3">
                <Sparkles className="w-5 h-5 inline-block mr-2 text-primary" />
                Talk to Vektar AI Agent Instantly
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Skip the wait! Get instant answers about our AI solutions through a real-time voice conversation with your Vektar AI Agent.
              </p>
              <Link to="/call">
                <Button className="vektar-gradient hover-glow px-8 py-6 text-lg font-semibold">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Start Conversation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground mt-4">
                Average call duration: 3-5 minutes | Available 24/7
              </p>
            </div>
          </Card>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            <Card className="glass-card p-4 sm:p-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 vektar-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">Call Us</h3>
                  <a 
                    href="tel:+13215995514" 
                    className="text-primary hover:underline text-base sm:text-lg font-medium"
                  >
                    321-599-5514
                  </a>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Mon-Fri, 9am-6pm EST
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-4 sm:p-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 vektar-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">Email Us</h3>
                  <a 
                    href="mailto:info@vektar.io" 
                    className="text-primary hover:underline text-sm sm:text-base"
                  >
                    info@vektar.io
                  </a>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Response within 24 hours
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-4 sm:p-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 vektar-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">Location</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Orlando, Florida<br />
                    United States
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-4 sm:p-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 vektar-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">Response Time</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    24 hours during business days
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 bg-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">What Happens Next?</h2>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mt-4 sm:mt-6">
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 vektar-gradient rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-white font-bold text-sm sm:text-base">1</span>
              </div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Discovery Call</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                We'll schedule a 30-minute call to understand your challenges and goals.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 vektar-gradient rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-white font-bold text-sm sm:text-base">2</span>
              </div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Solution Design</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Our team will design a custom AI solution tailored to your needs.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 vektar-gradient rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-white font-bold text-sm sm:text-base">3</span>
              </div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">30-Day Pilot</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                See results fast with our rapid prototyping and pilot program.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactPage
