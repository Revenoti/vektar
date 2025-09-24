import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  ArrowRight, 
  CheckCircle, 
  Zap, 
  Shield, 
  Rocket, 
  Brain, 
  MessageSquare, 
  Eye, 
  BarChart3,
  Users,
  Star,
  Menu,
  X,
  ChevronDown,
  Play,
  Quote
} from 'lucide-react'
import vectorikLogo from './assets/vectorik-logo.png'
import ContactForm from './components/ContactForm.jsx'
import DemoModal from './components/DemoModal.jsx'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'solutions', 'industries', 'work', 'about', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const NavLink = ({ href, children, isActive }) => (
    <button
      onClick={() => scrollToSection(href)}
      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
        isActive 
          ? 'bg-primary/20 text-primary border border-primary/30' 
          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
      }`}
    >
      {children}
    </button>
  )

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src={vectorikLogo} alt="Vectorik" className="w-12 h-12 rounded-full" />
              <span className="text-xl font-bold vectorik-gradient-text">Vectorik</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLink href="solutions" isActive={activeSection === 'solutions'}>Solutions</NavLink>
              <NavLink href="industries" isActive={activeSection === 'industries'}>Industries</NavLink>
              <NavLink href="work" isActive={activeSection === 'work'}>Work</NavLink>
              <NavLink href="about" isActive={activeSection === 'about'}>About</NavLink>
              <Button 
                onClick={() => scrollToSection('contact')}
                className="vectorik-gradient hover-glow"
              >
                Book a Strategy Call
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-border">
              <div className="flex flex-col space-y-2 pt-4">
                <NavLink href="solutions" isActive={activeSection === 'solutions'}>Solutions</NavLink>
                <NavLink href="industries" isActive={activeSection === 'industries'}>Industries</NavLink>
                <NavLink href="work" isActive={activeSection === 'work'}>Work</NavLink>
                <NavLink href="about" isActive={activeSection === 'about'}>About</NavLink>
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="vectorik-gradient hover-glow mt-4"
                >
                  Book a Strategy Call
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 min-h-screen flex items-center circuit-pattern">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Build Real ROI from{' '}
                  <span className="vectorik-gradient-text">AI</span>
                  <br />
                  Faster. Safer.{' '}
                  <span className="vectorik-gradient-text">Beautifully Executed.</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Vectorik designs, builds, and scales AI systems that convert more leads, 
                  cut drudge-work, and unlock insights—without risking your data.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="vectorik-gradient hover-glow text-lg px-8 py-6"
                  onClick={() => scrollToSection('contact')}
                >
                  Book a Strategy Call
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6"
                  onClick={() => setIsDemoModalOpen(true)}
                >
                  See Live Demos
                  <Play className="ml-2 w-5 h-5" />
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold vectorik-gradient-text">30+</div>
                  <div className="text-sm text-muted-foreground">AI Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold vectorik-gradient-text">95%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold vectorik-gradient-text">30</div>
                  <div className="text-sm text-muted-foreground">Day Pilots</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 animate-float">
                <img 
                  src={vectorikLogo} 
                  alt="Vectorik AI" 
                  className="w-96 h-96 mx-auto animate-glow rounded-full"
                />
              </div>
              <div className="absolute inset-0 vectorik-gradient opacity-20 blur-3xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-muted-foreground text-lg">Trusted by data-driven companies</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {['TechCorp', 'InnovateLabs', 'DataFlow', 'AIVentures'].map((company) => (
              <div key={company} className="text-center">
                <div className="h-16 bg-muted/20 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-semibold text-muted-foreground">{company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Building Innovative and Creative Solutions for the{' '}
              <span className="vectorik-gradient-text">Fast-paced Digital World</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              With over 15 years of industry experience, we help startups and Fortune 500 companies 
              innovate and grow in the dynamic business landscape.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card hover-glow">
              <CardHeader>
                <div className="w-12 h-12 vectorik-gradient rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-background" />
                </div>
                <CardTitle className="text-xl">Strategy First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Roadmaps with measurable ROI. We start with your business objectives 
                  and work backwards to create AI solutions that deliver real value.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card hover-glow">
              <CardHeader>
                <div className="w-12 h-12 vectorik-gradient rounded-lg flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-background" />
                </div>
                <CardTitle className="text-xl">Build Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Modern stack, enterprise guardrails. Rapid prototyping with production-ready 
                  architecture from day one.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card hover-glow">
              <CardHeader>
                <div className="w-12 h-12 vectorik-gradient rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-background" />
                </div>
                <CardTitle className="text-xl">Scale Safely</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  PII-aware, audit-ready. Security and compliance built into every solution 
                  with enterprise-grade monitoring and controls.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solutions Highlights */}
      <section id="solutions" className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="vectorik-gradient-text">AI Solutions</span> That Drive Results
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From sales automation to document intelligence, our AI solutions are designed 
              to integrate seamlessly into your existing workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MessageSquare, title: 'AI Sales Chatbot', impact: '+40% lead conversion' },
              { icon: Brain, title: 'Voice Receptionist', impact: '24/7 availability' },
              { icon: BarChart3, title: 'Quote Copilot', impact: '-60% response time' },
              { icon: Eye, title: 'RAG Knowledge Hub', impact: '95% accuracy' },
              { icon: Users, title: 'Ticket Deflection', impact: '-50% support load' },
              { icon: Zap, title: 'Field Tech Copilot', impact: '+30% efficiency' },
              { icon: Shield, title: 'Document Intelligence', impact: '99% data extraction' },
              { icon: BarChart3, title: 'Executive KPI Copilot', impact: 'Real-time insights' }
            ].map((solution, index) => (
              <Card key={index} className="glass-card hover-glow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 vectorik-gradient rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <solution.icon className="w-6 h-6 text-background" />
                  </div>
                  <h3 className="font-semibold mb-2">{solution.title}</h3>
                  <Badge variant="secondary" className="mb-3">
                    {solution.impact}
                  </Badge>
                  <div className="flex items-center justify-center text-primary text-sm">
                    Explore <ArrowRight className="ml-1 w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="vectorik-gradient text-background">Featured Case Study</Badge>
              <h2 className="text-4xl font-bold">
                G-Guard: From Reactive Support to{' '}
                <span className="vectorik-gradient-text">24/7 AI Assistance</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                How we transformed a traditional security company's customer support 
                with intelligent AI agents that handle 80% of inquiries automatically.
              </p>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">-38%</div>
                  <div className="text-sm text-muted-foreground">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">+27%</div>
                  <div className="text-sm text-muted-foreground">Qualified Leads</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">85%</div>
                  <div className="text-sm text-muted-foreground">First-time Fix</div>
                </div>
              </div>

              <Button className="vectorik-gradient hover-glow">
                Read Case Study
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="relative">
              <Card className="glass-card p-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">AI Agent Active</span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <p className="text-sm">"Hi! I need help with my security system setup."</p>
                    </div>
                    <div className="bg-secondary p-3 rounded-lg">
                      <p className="text-sm">I'd be happy to help you with your security system setup. Let me guide you through the process step by step...</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Response time: 0.3s</span>
                    <span>Satisfaction: 98%</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Redefining Industries with{' '}
              <span className="vectorik-gradient-text">Creative AI Solutions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We specialize in delivering AI solutions across diverse industries, 
              each tailored to specific challenges and opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Home Services', description: 'Automated scheduling, customer support, and field operations' },
              { title: 'Healthcare & Med-Spa', description: 'Patient management, appointment booking, and compliance' },
              { title: 'Industrial & Water Treatment', description: 'Predictive maintenance, quality control, and safety monitoring' },
              { title: 'Restaurants', description: 'Order management, inventory optimization, and customer experience' },
              { title: 'Digital Agencies', description: 'Content generation, client reporting, and workflow automation' },
              { title: 'Education', description: 'Personalized learning, administrative automation, and student support' }
            ].map((industry, index) => (
              <Card key={index} className="glass-card hover-glow cursor-pointer group">
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {industry.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{industry.description}</p>
                  <div className="flex items-center text-primary text-sm">
                    Learn More <ArrowRight className="ml-1 w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              What Our <span className="vectorik-gradient-text">Clients Say</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Real feedback from companies that have transformed their operations with AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Vectorik's AI solution increased our lead conversion by 40% in just 30 days. The team's expertise and rapid deployment exceeded our expectations.",
                author: "Sarah Chen",
                role: "VP of Operations",
                company: "TechFlow Solutions"
              },
              {
                quote: "The document intelligence system has revolutionized our workflow. What used to take hours now happens in minutes with 99% accuracy.",
                author: "Michael Rodriguez",
                role: "Operations Director",
                company: "DataCorp Industries"
              },
              {
                quote: "Working with Vectorik felt like having an extension of our team. They understood our challenges and delivered a solution that truly works.",
                author: "Emily Johnson",
                role: "CTO",
                company: "InnovateNow"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-primary mb-4" />
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <span className="text-background font-semibold">
                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 vectorik-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-background mb-4">
            Ready to ship your first 30-day AI pilot?
          </h2>
          <p className="text-xl text-background/80 mb-8 max-w-2xl mx-auto">
            Let's talk about how AI can transform your business operations and drive measurable ROI.
          </p>
          <Button 
            size="lg" 
            className="bg-background text-foreground hover:bg-background/90 text-lg px-8 py-6"
            onClick={() => scrollToSection('contact')}
          >
            Book a Strategy Call
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Let's Build Something <span className="vectorik-gradient-text">Amazing Together</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Ready to transform your business with AI? Get in touch and let's discuss your project.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Get Started Today</h3>
                  <p className="text-muted-foreground mb-6">
                    Fill out the form and we'll get back to you within 24 hours to discuss 
                    your AI transformation journey.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Free initial consultation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Custom AI strategy roadmap</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>30-day pilot program available</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Contact Information</h4>
                  <div className="space-y-2 text-muted-foreground">
                    <p>Email: info@vectorik.com</p>
                    <p>Response time: Within 24 hours</p>
                  </div>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img src={vectorikLogo} alt="Vectorik" className="w-10 h-10 rounded-full" />
                <span className="text-xl font-bold vectorik-gradient-text">Vectorik</span>
              </div>
              <p className="text-muted-foreground">
                AI solutions that deliver real ROI. Built with care and curiosity.
              </p>
              <p className="text-sm text-muted-foreground">
                © 2024 Vectorik. All rights reserved.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <div className="space-y-2 text-muted-foreground">
                <div>AI Sales Chatbot</div>
                <div>Voice Receptionist</div>
                <div>Document Intelligence</div>
                <div>KPI Copilot</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Industries</h4>
              <div className="space-y-2 text-muted-foreground">
                <div>Home Services</div>
                <div>Healthcare</div>
                <div>Industrial</div>
                <div>Restaurants</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-muted-foreground">
                <div>About Us</div>
                <div>Case Studies</div>
                <div>Blog</div>
                <div>Contact</div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground">
              Privacy by design: scoped retrieval, PII redaction, audit trails, rate-limiting.
            </p>
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
    </div>
  )
}

export default App
