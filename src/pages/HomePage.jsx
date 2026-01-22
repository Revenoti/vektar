import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import SEO from '@/components/SEO.jsx'
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Rocket, 
  MessageSquare, 
  Brain, 
  Play,
  Quote,
  Target,
  TrendingUp,
  Users,
  HeadphonesIcon,
  Database,
  Sparkles,
  Cog,
  Truck,
  Heart,
  GraduationCap,
  Laptop,
  Droplets,
  LifeBuoy
} from 'lucide-react'
import DemoModal from '@/components/DemoModal.jsx'

const HomePage = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)

  const capabilities = [
    { 
      icon: Zap, 
      title: 'Strategy First', 
      bullets: [
        'Start with your business goals, not tech',
        'Roadmaps with measurable ROI targets',
        'Work backwards from desired outcomes',
        'Align AI initiatives to revenue impact',
        'Clear milestones and success metrics'
      ]
    },
    { 
      icon: Rocket, 
      title: 'Build Fast', 
      bullets: [
        '30-day pilot programs available',
        'Production-ready from day one',
        'Modern stack, enterprise guardrails',
        'Rapid prototyping & iteration',
        'Go live in weeks, not months'
      ]
    },
    { 
      icon: Shield, 
      title: 'Scale Securely', 
      bullets: [
        'SOC 2 compliant infrastructure',
        'PII-aware data handling',
        'Audit-ready logging & monitoring',
        'Enterprise-grade encryption',
        'GDPR & HIPAA compatible'
      ]
    },
    { 
      icon: Target, 
      title: 'Precision AI', 
      bullets: [
        '99%+ accuracy on domain tasks',
        'Custom-trained on your data',
        'Understands your business context',
        'Continuous learning & improvement',
        'Reduces errors, not just automates'
      ]
    },
    { 
      icon: TrendingUp, 
      title: 'Measurable Impact', 
      bullets: [
        'Built-in analytics dashboards',
        'Real-time KPI tracking',
        'Prove ROI to stakeholders',
        'A/B testing frameworks included',
        'Data-driven optimization loops'
      ]
    },
    { 
      icon: Users, 
      title: 'Human-in-the-Loop', 
      bullets: [
        'AI augments, never replaces',
        'Seamless handoff to humans',
        'Escalation paths built in',
        'Review & approval workflows',
        'Your team stays in control'
      ]
    }
  ]

  const solutions = [
    { icon: Truck, title: 'AI Agent Dispatch & Logistics', impact: '+30% efficiency', description: 'Smart route planning', color: 'from-emerald-500 to-teal-600' },
    { icon: GraduationCap, title: '24/7 Education Counselor', impact: '95% satisfaction', description: 'Student guidance AI', color: 'from-blue-500 to-indigo-600' },
    { icon: Cog, title: 'Business Automation', impact: '85% time saved', description: 'Automate workflows', color: 'from-violet-500 to-purple-600' },
    { icon: Heart, title: '24/7 Healthcare Receptionist', impact: '24/7 available', description: 'Patient care AI', color: 'from-rose-500 to-pink-600' },
    { icon: Laptop, title: 'SaaS AI Application Development', impact: '3x faster launch', description: 'Custom AI-powered SaaS', color: 'from-indigo-500 to-violet-600' },
    { icon: Brain, title: 'Voice Receptionist', impact: '95% satisfaction', description: 'Never miss a call', color: 'from-pink-500 to-rose-600' },
    { icon: TrendingUp, title: 'Predictive Analytics', impact: '+25% forecast', description: 'Data-driven decisions', color: 'from-fuchsia-500 to-purple-600' },
    { icon: Droplets, title: '24/7 Plumber & Landscaping', impact: '2,847 jobs', description: 'Home service AI', color: 'from-blue-500 to-cyan-600' },
    { icon: MessageSquare, title: 'AI Sales Chatbot', impact: '+40% conversion', description: 'Convert visitors 24/7', color: 'from-violet-500 to-purple-600' },
    { icon: Database, title: 'CRM Development', impact: '+35% close rate', description: 'AI-enhanced CRM', color: 'from-amber-500 to-orange-600' },
    { icon: HeadphonesIcon, title: 'AI Call Center', impact: '-45% handle time', description: 'Real-time AI call center', color: 'from-teal-500 to-emerald-600' },
    { icon: LifeBuoy, title: 'Customer Support Bot', impact: '-60% tickets', description: 'AI-powered support', color: 'from-blue-500 to-indigo-600' }
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
      <SEO 
        title="Vektar - AI Solutions That Deliver Real ROI"
        description="Build Real ROI from AI. Vektar designs, builds, and scales AI systems that convert more leads, cut drudge-work, and unlock insights. 150+ projects delivered with 95% satisfaction."
        canonical="https://vektar.io/"
      />
      {/* Hero Section with Background Image */}
      <section 
        className="relative pt-8 sm:pt-12 pb-10 sm:pb-16 min-h-[500px] sm:min-h-[600px] flex items-center"
        style={{
          backgroundImage: 'url(/hero-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Gradient overlay for text readability - fades at 50% to keep right side bright */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 via-40% to-transparent to-60%"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                  Unlock Real ROI with{' '}
                  <span className="text-cyan-400">AI Solutions.</span>
                  <br />
                  <span className="text-white">Built Faster.</span>
                  <br />
                  <span className="text-white">Deployed Securely.</span>
                </h1>
                <p className="text-lg sm:text-xl text-white/80 max-w-2xl">
                  Vektar designs, builds, and scales AI systems that automate business processes, 
                  cut drudge-work, and unlock insights—without risking your data.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/call" className="w-full sm:w-auto">
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
                  className="bg-white/20 backdrop-blur-sm border border-white/40 text-white hover:bg-white/30 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto"
                  onClick={() => setIsDemoModalOpen(true)}
                >
                  See Live Demos
                  <Play className="ml-2 w-5 h-5" />
                </Button>
              </div>

              <div className="flex items-center justify-start gap-6 sm:gap-8 pt-2 sm:pt-4">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-cyan-400">150+</div>
                  <div className="text-xs sm:text-sm text-white/70">AI Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-cyan-400">95%</div>
                  <div className="text-xs sm:text-sm text-white/70">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-cyan-400">30</div>
                  <div className="text-xs sm:text-sm text-white/70">Day Pilots</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do / Capabilities Section - Moved UP */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 sm:mb-10">
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
              <Card key={index} className="glass-card hover-glow group">
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 vektar-gradient rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <cap.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-bold flex-1 text-center">{cap.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {cap.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Solutions Section - Now shows 8 cards */}
      <section className="py-8 sm:py-12 lg:py-16 bg-secondary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-6 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600 mb-4 sm:mb-6">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Live AI Demos</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              <span className="text-foreground">AI Solutions</span> That Drive Results
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              From sales automation to document intelligence, our AI solutions integrate 
              seamlessly into your existing workflows.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-8 sm:mb-10">
            {solutions.map((solution, index) => (
              <div 
                key={index} 
                className="group relative cursor-pointer"
                onClick={() => setIsDemoModalOpen(true)}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500 group-hover:duration-200"></div>
                
                <div className="relative h-full bg-card/95 backdrop-blur-xl rounded-2xl border border-border/50 p-3 sm:p-4 lg:p-5 transition-all duration-500 group-hover:border-transparent group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:-translate-y-1">
                  <div className="flex flex-col items-center text-center">
                    <div className={`relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${solution.color} rounded-xl flex items-center justify-center shadow-lg mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <solution.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <h3 className="font-bold text-sm sm:text-base mb-1 sm:mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                      {solution.title}
                    </h3>
                    
                    <p className="text-xs text-muted-foreground mb-2 sm:mb-3 hidden sm:block line-clamp-2">
                      {solution.description}
                    </p>
                    
                    <div className="relative mb-2 sm:mb-3">
                      <Badge className={`bg-gradient-to-r ${solution.color} text-white border-0 text-xs font-semibold px-2 py-1 shadow-md group-hover:scale-105 transition-transform duration-300`}>
                        <Zap className="w-3 h-3 mr-1 inline-block" />
                        {solution.impact}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center text-primary text-xs sm:text-sm font-semibold group-hover:gap-1 transition-all duration-300">
                      <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1 group-hover:scale-110 transition-transform" />
                      <span>Try Demo</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/solutions">
              <Button size="lg" className="vektar-gradient hover:opacity-90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                View All Solutions
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted by Companies Section - Moved DOWN */}
      <section className="py-6 sm:py-10 border-b border-border overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4 sm:mb-6">
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
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 sm:mb-10">
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
      <section className="py-8 sm:py-12 vektar-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            Ready to ship your first 30-day AI pilot?
          </h2>
          <p className="text-lg sm:text-xl text-white/80 mb-5 sm:mb-6 max-w-2xl mx-auto">
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
              <Button size="lg" className="bg-white/20 backdrop-blur-sm border border-white/40 text-white hover:bg-white/30 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full">
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
