import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Rocket, 
  MessageSquare, 
  Brain, 
  Eye,
  Play,
  Quote,
  Target,
  TrendingUp,
  Users,
  FileText,
  Mic,
  Bot,
  Database,
  BarChart3
} from 'lucide-react'
import vectorikLogo from '@/assets/vectorik-logo.png'
import DemoModal from '@/components/DemoModal.jsx'

const HomePage = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)

  const capabilities = [
    { 
      icon: Zap, 
      title: 'Strategy First', 
      description: 'Roadmaps with measurable ROI. We start with your business objectives and work backwards to create AI solutions that deliver real value.'
    },
    { 
      icon: Rocket, 
      title: 'Build Fast', 
      description: 'Modern stack, enterprise guardrails. Rapid prototyping with production-ready architecture from day one.'
    },
    { 
      icon: Shield, 
      title: 'Scale Securely', 
      description: 'PII-aware, audit-ready. Security and compliance built into every solution with enterprise-grade monitoring.'
    },
    { 
      icon: Target, 
      title: 'Precision AI', 
      description: 'Custom-trained models that understand your business context, delivering 99%+ accuracy on domain-specific tasks.'
    },
    { 
      icon: TrendingUp, 
      title: 'Measurable Impact', 
      description: 'Every solution comes with built-in analytics and KPI tracking so you can prove ROI to stakeholders.'
    },
    { 
      icon: Users, 
      title: 'Human-in-the-Loop', 
      description: 'AI that augments your team, not replaces them. Seamless handoffs and escalation paths built in.'
    }
  ]

  const solutions = [
    { icon: MessageSquare, title: 'AI Sales Chatbot', impact: '+40% lead conversion', description: 'Convert visitors 24/7' },
    { icon: Brain, title: 'Voice Receptionist', impact: '95% satisfaction', description: 'Never miss a call' },
    { icon: Eye, title: 'RAG Knowledge Hub', impact: '99% accuracy', description: 'Instant answers from docs' },
    { icon: Shield, title: 'Document Intelligence', impact: '99% extraction', description: 'Process docs in seconds' },
    { icon: Mic, title: 'Meeting Transcription', impact: '10x faster notes', description: 'AI-powered summaries' },
    { icon: Bot, title: 'Customer Support Bot', impact: '-60% ticket volume', description: 'Resolve issues instantly' },
    { icon: Database, title: 'Data Enrichment', impact: '+85% data quality', description: 'Clean & enrich data' },
    { icon: BarChart3, title: 'Predictive Analytics', impact: '+25% forecast accuracy', description: 'Data-driven decisions' }
  ]

  const testimonials = [
    {
      quote: "Vektar's AI solution increased our lead conversion by 40% in just 30 days. The team's expertise and rapid deployment exceeded our expectations.",
      author: "Sarah Chen",
      role: "VP of Operations",
      company: "TechFlow Solutions",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
    },
    {
      quote: "The document intelligence system has revolutionized our workflow. What used to take hours now happens in minutes with 99% accuracy.",
      author: "Michael Rodriguez",
      role: "Operations Director",
      company: "DataCorp Industries",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      quote: "Working with Vektar felt like having an extension of our team. They understood our challenges and delivered a solution that truly works.",
      author: "Emily Johnson",
      role: "CTO",
      company: "InnovateNow",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ]

  const companies = [
    { name: 'ManageCall', gradient: 'from-cyan-500 to-blue-600' },
    { name: 'PrayerLove', gradient: 'from-rose-500 to-pink-600' },
    { name: 'Ureka', gradient: 'from-amber-500 to-orange-600' },
    { name: 'Myspirit', gradient: 'from-violet-500 to-purple-600' },
    { name: 'Jobresume', gradient: 'from-emerald-500 to-green-600' },
    { name: 'HFMG', gradient: 'from-indigo-500 to-blue-600' },
    { name: 'Tickerscroll', gradient: 'from-teal-500 to-cyan-600' },
    { name: 'Racle', gradient: 'from-red-500 to-rose-600' },
    { name: 'QRCG', gradient: 'from-yellow-500 to-amber-600' },
    { name: 'Casaout', gradient: 'from-lime-500 to-green-600' }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="pb-12 sm:pb-16 min-h-[85vh] sm:min-h-[90vh] flex items-center circuit-pattern">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Unlock Real ROI with{' '}
                  <span className="text-primary">AI Solutions.</span>
                  <br />
                  <span className="text-foreground">Built Faster. Deployed Securely.</span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
                  Vektar designs, builds, and scales AI systems that automate business processes, 
                  cut drudge-work, and unlock insights—without risking your data.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/contact" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="vektar-gradient hover-glow text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full"
                  >
                    Book a Free Strategy Call
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary/10 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto"
                  onClick={() => setIsDemoModalOpen(true)}
                >
                  See Live Demos
                  <Play className="ml-2 w-5 h-5" />
                </Button>
              </div>

              <div className="flex items-center justify-start gap-6 sm:gap-8 pt-4 sm:pt-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">150+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">AI Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">95%</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">30</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Day Pilots</div>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative z-10 animate-float">
                <img 
                  src={vectorikLogo} 
                  alt="Vektar AI" 
                  className="w-48 h-auto mx-auto animate-glow rounded-full"
                  loading="eager"
                />
              </div>
              <div className="absolute inset-0 vektar-gradient opacity-20 blur-3xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do / Capabilities Section - Moved UP */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              <span className="text-foreground">Building Innovative Solutions</span> for the Fast-paced AI & Digital World
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              With over 15 years of industry experience, we help startups and Fortune 500 companies 
              innovate and grow in the dynamic business landscape.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {capabilities.map((cap, index) => (
              <Card key={index} className="glass-card hover-glow">
                <CardHeader className="pb-2 sm:pb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 vektar-gradient rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <cap.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{cap.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {cap.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Solutions Section - Now shows 8 cards */}
      <section className="py-12 sm:py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              <span className="text-foreground">AI Solutions</span> That Drive Results
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              From sales automation to document intelligence, our AI solutions integrate 
              seamlessly into your existing workflows.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            {solutions.map((solution, index) => (
              <Card 
                key={index} 
                className="glass-card hover-glow cursor-pointer group transition-all duration-300"
                onClick={() => setIsDemoModalOpen(true)}
              >
                <CardContent className="p-3 sm:p-4 lg:p-6 text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 vektar-gradient rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-4 group-hover:scale-110 transition-transform">
                    <solution.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2">{solution.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2 hidden sm:block">{solution.description}</p>
                  <Badge className="vektar-gradient text-white border-0 mb-2 sm:mb-3 text-xs">
                    {solution.impact}
                  </Badge>
                  <div className="flex items-center justify-center text-primary text-xs sm:text-sm font-medium">
                    Try Demo <ArrowRight className="ml-1 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/solutions">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                View All Solutions
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted by Companies Section - Moved DOWN */}
      <section className="py-10 sm:py-12 border-b border-border overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-muted-foreground text-base sm:text-lg font-medium">Trusted by innovative companies</p>
          </div>
          
          <div className="relative">
            <div className="flex animate-scroll space-x-4 sm:space-x-8">
              {[...companies, ...companies].map((company, index) => (
                <div key={`${company.name}-${index}`} className="flex-shrink-0 group cursor-pointer">
                  <div className={`h-12 w-28 sm:h-16 sm:w-40 bg-gradient-to-r ${company.gradient} rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105`}>
                    <span className="text-white font-bold text-xs sm:text-sm tracking-wide">{company.name}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute left-0 top-0 w-16 sm:w-32 h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 w-16 sm:w-32 h-full bg-gradient-to-l from-background to-transparent pointer-events-none z-10"></div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              What Our <span className="text-foreground">Clients Say</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Real feedback from companies that have transformed their operations with AI
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-4 sm:p-6">
                  <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-3 sm:mb-4" />
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center space-x-3">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-sm sm:text-base">{testimonial.author}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
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
      <section className="py-12 sm:py-16 vektar-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to ship your first 30-day AI pilot?
          </h2>
          <p className="text-lg sm:text-xl text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Let's talk about how AI can transform your business operations and drive measurable ROI.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/contact" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full">
                Book Free Strategy Call
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/work" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full">
                View Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </>
  )
}

export default HomePage
