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
  Quote,
  Calculator,
  Wrench,
  FileText
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
              <img src={vectorikLogo} alt="Vektar" className="w-12 h-12 rounded-full" />
              <span className="text-xl font-bold vektar-gradient-text">Vektar</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLink href="solutions" isActive={activeSection === 'solutions'}>Solutions</NavLink>
              <NavLink href="industries" isActive={activeSection === 'industries'}>Industries</NavLink>
              <NavLink href="work" isActive={activeSection === 'work'}>Work</NavLink>
              <NavLink href="about" isActive={activeSection === 'about'}>About</NavLink>
              <Button 
                onClick={() => scrollToSection('contact')}
                className="vektar-gradient hover-glow"
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
                  className="vektar-gradient hover-glow mt-4"
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
                  <span className="vektar-gradient-text">AI</span>
                  <br />
                  Faster. Safer.{' '}
                  <span className="vektar-gradient-text">Beautifully Executed.</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Vektar designs, builds, and scales AI systems that convert more leads, 
                  cut drudge-work, and unlock insights—without risking your data.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="vektar-gradient hover-glow text-lg px-8 py-6"
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
                  <div className="text-3xl font-bold vektar-gradient-text">150+</div>
                  <div className="text-sm text-muted-foreground">AI Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold vektar-gradient-text">95%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold vektar-gradient-text">30</div>
                  <div className="text-sm text-muted-foreground">Day Pilots</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 animate-float">
                <img 
                  src={vectorikLogo} 
                  alt="Vektar AI" 
                  className="w-96 h-96 mx-auto animate-glow rounded-full"
                />
              </div>
              <div className="absolute inset-0 vektar-gradient opacity-20 blur-3xl animate-pulse"></div>
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
              <span className="vektar-gradient-text">Fast-paced Digital World</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              With over 15 years of industry experience, we help startups and Fortune 500 companies 
              innovate and grow in the dynamic business landscape.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card hover-glow">
              <CardHeader>
                <div className="w-12 h-12 vektar-gradient rounded-lg flex items-center justify-center mb-4">
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
                <div className="w-12 h-12 vektar-gradient rounded-lg flex items-center justify-center mb-4">
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
                <div className="w-12 h-12 vektar-gradient rounded-lg flex items-center justify-center mb-4">
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
              <span className="vektar-gradient-text">AI Solutions</span> That Drive Results
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From sales automation to document intelligence, our AI solutions are designed 
              to integrate seamlessly into your existing workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MessageSquare, title: 'AI Sales Chatbot', impact: '+40% lead conversion', demoId: 'chatbot' },
              { icon: Brain, title: 'Voice Receptionist', impact: '95% customer satisfaction', demoId: 'voice' },
              { icon: Calculator, title: 'Quote Copilot', impact: '-60% response time', demoId: 'quote' },
              { icon: Eye, title: 'RAG Knowledge Hub', impact: '99% accuracy rate', demoId: 'rag' },
              { icon: Users, title: 'Ticket Deflection', impact: '-50% support load', demoId: 'support' },
              { icon: Wrench, title: 'Field Tech Copilot', impact: '+30% efficiency', demoId: 'fieldtech' },
              { icon: FileText, title: 'Document Intelligence', impact: '99% data extraction', demoId: 'document' },
              { icon: BarChart3, title: 'Executive KPI Copilot', impact: 'Real-time insights', demoId: 'kpi' }
            ].map((solution, index) => (
              <Card 
                key={index} 
                className="glass-card hover-glow cursor-pointer group transition-all duration-300"
                onClick={() => {
                  setIsDemoModalOpen(true)
                  // Auto-select the demo after modal opens
                  setTimeout(() => {
                    const demoCard = document.querySelector(`[data-demo-id="${solution.demoId}"]`)
                    if (demoCard) demoCard.click()
                  }, 100)
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 vektar-gradient rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <solution.icon className="w-6 h-6 text-background" />
                  </div>
                  <h3 className="font-semibold mb-2">{solution.title}</h3>
                  <Badge variant="secondary" className="mb-3">
                    {solution.impact}
                  </Badge>
                  <div className="flex items-center justify-center text-primary text-sm font-medium">
                    Try Interactive Demo <ArrowRight className="ml-1 w-4 h-4" />
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
              <Badge className="vektar-gradient text-background">Featured Case Study</Badge>
              <h2 className="text-4xl font-bold">
                Jobresume: From Reactive Support to{' '}
                <span className="vektar-gradient-text">24/7 AI Assistance</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                How we transformed a traditional company's customer support 
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

              <Button className="vektar-gradient hover-glow">
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
              <span className="vektar-gradient-text">Creative AI Solutions</span>
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
              What Our <span className="vektar-gradient-text">Clients Say</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Real feedback from companies that have transformed their operations with AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Vektar's AI solution increased our lead conversion by 40% in just 30 days. The team's expertise and rapid deployment exceeded our expectations.",
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
                quote: "Working with Vektar felt like having an extension of our team. They understood our challenges and delivered a solution that truly works.",
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

      {/* Work Section */}
      <section id="work" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Our <span className="vektar-gradient-text">Work</span> Speaks for Itself
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From Fortune 500 enterprises to innovative startups, we've delivered AI solutions 
              that drive real business results across industries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "E-commerce Revenue Optimization",
                client: "RetailMax",
                industry: "E-commerce",
                results: ["+156% conversion rate", "$2.3M additional revenue", "3-month ROI"],
                description: "AI-powered personalization engine that analyzes customer behavior in real-time to optimize product recommendations and pricing strategies.",
                tech: ["Machine Learning", "Real-time Analytics", "A/B Testing"],
                image: "🛒"
              },
              {
                title: "Healthcare Patient Management",
                client: "MedFlow Systems",
                industry: "Healthcare",
                results: ["-67% wait times", "94% patient satisfaction", "40% cost reduction"],
                description: "Intelligent scheduling and triage system that optimizes patient flow and automates administrative tasks.",
                tech: ["NLP", "Predictive Analytics", "HIPAA Compliance"],
                image: "🏥"
              },
              {
                title: "Manufacturing Quality Control",
                client: "TechManufacturing Co.",
                industry: "Manufacturing",
                results: ["99.7% defect detection", "-45% inspection time", "$1.8M savings"],
                description: "Computer vision system for automated quality inspection with real-time defect detection and classification.",
                tech: ["Computer Vision", "Deep Learning", "IoT Integration"],
                image: "🏭"
              },
              {
                title: "Financial Risk Assessment",
                client: "SecureBank",
                industry: "Financial Services",
                results: ["-78% false positives", "Real-time processing", "Regulatory compliance"],
                description: "Advanced fraud detection system using machine learning to identify suspicious transactions and reduce false alarms.",
                tech: ["Anomaly Detection", "Real-time Processing", "Compliance"],
                image: "🏦"
              },
              {
                title: "Legal Document Intelligence",
                client: "LawTech Partners",
                industry: "Legal",
                results: ["-85% review time", "99% accuracy", "500+ hours saved/month"],
                description: "AI-powered contract analysis and due diligence automation for large-scale legal document processing.",
                tech: ["Document AI", "NLP", "Contract Analysis"],
                image: "⚖️"
              },
              {
                title: "Energy Grid Optimization",
                client: "PowerGrid Solutions",
                industry: "Energy",
                results: ["-23% energy waste", "Predictive maintenance", "$3.2M savings"],
                description: "Smart grid management system that optimizes energy distribution and predicts equipment failures.",
                tech: ["Predictive Analytics", "IoT", "Time Series Analysis"],
                image: "⚡"
              }
            ].map((project, index) => (
              <Card key={index} className="glass-card hover-glow group cursor-pointer transition-all duration-300">
                <CardHeader>
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                    {project.image}
                  </div>
                  <Badge variant="outline" className="w-fit mb-2">{project.industry}</Badge>
                  <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                  <p className="text-sm text-muted-foreground font-medium">{project.client}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Key Results:</h4>
                      <div className="grid grid-cols-1 gap-1">
                        {project.results.map((result, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-2 h-2 vektar-gradient rounded-full"></div>
                            <span className="text-sm font-medium text-green-400">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.tech.map((tech, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Card className="glass-card max-w-2xl mx-auto p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Join Our Success Stories?</h3>
              <p className="text-muted-foreground mb-6">
                Every project starts with understanding your unique challenges. 
                Let's discuss how AI can transform your business.
              </p>
              <Button 
                size="lg" 
                className="vektar-gradient hover-glow"
                onClick={() => scrollToSection('contact')}
              >
                Start Your AI Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                About <span className="vektar-gradient-text">Vektar</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We're not just another AI company. We're your strategic partner in building 
                AI solutions that deliver measurable business results, not just impressive demos.
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              <Card className="glass-card p-8">
                <div className="w-16 h-16 vektar-gradient rounded-2xl flex items-center justify-center mb-6">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To democratize AI by making enterprise-grade artificial intelligence accessible, 
                  practical, and profitable for businesses of all sizes. We believe AI should solve 
                  real problems, not create new ones.
                </p>
              </Card>

              <Card className="glass-card p-8">
                <div className="w-16 h-16 vektar-gradient rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A world where every business can harness the power of AI to unlock growth, 
                  improve efficiency, and create exceptional customer experiences—without the 
                  complexity or risk traditionally associated with AI implementation.
                </p>
              </Card>
            </div>

            {/* Our Approach */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-center mb-12">
                The <span className="vektar-gradient-text">Vektar</span> Approach
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 vektar-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h4 className="text-xl font-bold mb-4">Business-First Strategy</h4>
                  <p className="text-muted-foreground">
                    We start with your business objectives, not the technology. Every AI solution 
                    is designed to deliver measurable ROI and solve real operational challenges.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 vektar-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h4 className="text-xl font-bold mb-4">Rapid Prototyping</h4>
                  <p className="text-muted-foreground">
                    Our 30-day pilot programs let you see results fast. We build working prototypes 
                    that demonstrate value before committing to full-scale implementation.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 vektar-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h4 className="text-xl font-bold mb-4">Enterprise-Ready</h4>
                  <p className="text-muted-foreground">
                    Security, compliance, and scalability built-in from day one. Our solutions 
                    are designed to grow with your business and meet enterprise standards.
                  </p>
                </div>
              </div>
            </div>

            {/* Team & Expertise */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-center mb-12">
                World-Class <span className="vektar-gradient-text">Expertise</span>
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card className="glass-card p-6 text-center">
                  <div className="w-16 h-16 vektar-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold mb-2">AI/ML Engineers</h4>
                  <p className="text-sm text-muted-foreground">
                    PhD-level expertise in machine learning, deep learning, and neural networks
                  </p>
                </Card>

                <Card className="glass-card p-6 text-center">
                  <div className="w-16 h-16 vektar-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold mb-2">Security Specialists</h4>
                  <p className="text-sm text-muted-foreground">
                    Enterprise security, compliance, and privacy-by-design implementation
                  </p>
                </Card>

                <Card className="glass-card p-6 text-center">
                  <div className="w-16 h-16 vektar-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold mb-2">Business Analysts</h4>
                  <p className="text-sm text-muted-foreground">
                    ROI optimization, process improvement, and strategic business alignment
                  </p>
                </Card>

                <Card className="glass-card p-6 text-center">
                  <div className="w-16 h-16 vektar-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold mb-2">Industry Experts</h4>
                  <p className="text-sm text-muted-foreground">
                    Deep domain knowledge across healthcare, finance, manufacturing, and more
                  </p>
                </Card>
              </div>
            </div>

            {/* Stats & Achievements */}
            <div className="mb-16">
              <Card className="glass-card p-8">
                <h3 className="text-3xl font-bold text-center mb-12">
                  Proven <span className="vektar-gradient-text">Results</span>
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold vektar-gradient-text mb-2">150+</div>
                    <div className="text-muted-foreground">AI Projects Delivered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold vektar-gradient-text mb-2">$50M+</div>
                    <div className="text-muted-foreground">Client ROI Generated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold vektar-gradient-text mb-2">98%</div>
                    <div className="text-muted-foreground">Client Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold vektar-gradient-text mb-2">15+</div>
                    <div className="text-muted-foreground">Industries Served</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Values */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-center mb-12">
                Our <span className="vektar-gradient-text">Values</span>
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="glass-card p-6">
                  <h4 className="text-xl font-bold mb-4 flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                    Transparency
                  </h4>
                  <p className="text-muted-foreground">
                    No black boxes. We explain how our AI works, what data it uses, 
                    and how decisions are made. You own your data and understand your systems.
                  </p>
                </Card>

                <Card className="glass-card p-6">
                  <h4 className="text-xl font-bold mb-4 flex items-center">
                    <Shield className="w-6 h-6 text-blue-400 mr-3" />
                    Security First
                  </h4>
                  <p className="text-muted-foreground">
                    Enterprise-grade security isn't an afterthought—it's built into every 
                    solution from the ground up. Your data stays secure and compliant.
                  </p>
                </Card>

                <Card className="glass-card p-6">
                  <h4 className="text-xl font-bold mb-4 flex items-center">
                    <Zap className="w-6 h-6 text-yellow-400 mr-3" />
                    Results-Driven
                  </h4>
                  <p className="text-muted-foreground">
                    We measure success by your business outcomes, not technical metrics. 
                    Every project is designed to deliver measurable ROI and operational impact.
                  </p>
                </Card>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Card className="glass-card max-w-3xl mx-auto p-8">
                <h3 className="text-3xl font-bold mb-4">
                  Ready to Transform Your Business with AI?
                </h3>
                <p className="text-xl text-muted-foreground mb-8">
                  Join the companies already seeing real results from AI. Let's discuss 
                  how we can help you achieve your business objectives.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="vektar-gradient hover-glow"
                    onClick={() => scrollToSection('contact')}
                  >
                    Book Strategy Call
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => setIsDemoModalOpen(true)}
                  >
                    <Play className="mr-2 w-5 h-5" />
                    See Live Demos
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 vektar-gradient">
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
                Let's Build Something <span className="vektar-gradient-text">Amazing Together</span>
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
                    <p>Email: info@vektar.com</p>
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
                <img src={vectorikLogo} alt="Vektar" className="w-10 h-10 rounded-full" />
                <span className="text-xl font-bold vektar-gradient-text">Vektar</span>
              </div>
              <p className="text-muted-foreground">
                AI solutions that deliver real ROI. Built with care and curiosity.
              </p>
              <p className="text-sm text-muted-foreground">
                © 2025 Vektar. All rights reserved.
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
