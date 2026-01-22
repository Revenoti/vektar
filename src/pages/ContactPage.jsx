import React from 'react'
import { Card } from '@/components/ui/card.jsx'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import ContactForm from '@/components/ContactForm.jsx'

const ContactPage = () => {
  return (
    <>
      <section className="py-16 circuit-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Let's <span className="text-foreground">Talk</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to transform your business with AI? We'd love to hear about your challenges 
              and discuss how we can help.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2">
              <Card className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <ContactForm />
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="glass-card p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 vektar-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Call Us</h3>
                    <a 
                      href="tel:+13215995514" 
                      className="text-primary hover:underline text-lg font-medium"
                    >
                      321-599-5514
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Available Mon-Fri, 9am-6pm EST
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="glass-card p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 vektar-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email Us</h3>
                    <a 
                      href="mailto:info@vektar.io" 
                      className="text-primary hover:underline"
                    >
                      info@vektar.io
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      We respond within 24 hours
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="glass-card p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 vektar-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-muted-foreground">
                      Orlando, Florida<br />
                      United States
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="glass-card p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 vektar-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Response Time</h3>
                    <p className="text-muted-foreground">
                      We typically respond to inquiries within 24 hours during business days.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">What Happens Next?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-8">
            <div>
              <div className="w-12 h-12 vektar-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Discovery Call</h3>
              <p className="text-sm text-muted-foreground">
                We'll schedule a 30-minute call to understand your challenges and goals.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 vektar-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Solution Design</h3>
              <p className="text-sm text-muted-foreground">
                Our team will design a custom AI solution tailored to your needs.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 vektar-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">30-Day Pilot</h3>
              <p className="text-sm text-muted-foreground">
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
