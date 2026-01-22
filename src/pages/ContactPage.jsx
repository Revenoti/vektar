import React from 'react'
import { Card } from '@/components/ui/card.jsx'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import ContactForm from '@/components/ContactForm.jsx'

const ContactPage = () => {
  return (
    <>
      <section className="py-10 sm:py-16 circuit-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Let's <span className="text-foreground">Talk</span>
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to transform your business with AI? We'd love to hear about your challenges 
              and discuss how we can help.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2 order-2 lg:order-1">
              <Card className="glass-card p-4 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Send Us a Message</h2>
                <ContactForm />
              </Card>
            </div>

            <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
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
                      Available Mon-Fri, 9am-6pm EST
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
                      We respond within 24 hours
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
                      We typically respond to inquiries within 24 hours during business days.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16 bg-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">What Happens Next?</h2>
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto mt-6 sm:mt-8">
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
