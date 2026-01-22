import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import SEO from '@/components/SEO.jsx'
import { 
  ArrowRight, 
  MessageSquare, 
  Brain, 
  Eye, 
  FileText,
  Mic,
  HeadphonesIcon,
  Database,
  TrendingUp,
  Play,
  Sparkles,
  Zap,
  Cog,
  Truck,
  Heart,
  GraduationCap,
  Car,
  Laptop,
  Thermometer,
  Droplets
} from 'lucide-react'
import DemoModal from '@/components/DemoModal.jsx'

const SolutionsPage = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)
  const [selectedDemo, setSelectedDemo] = useState(null)
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1))
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [location.hash])

  const solutions = [
    { 
      id: 'chatbot',
      icon: MessageSquare, 
      title: 'AI Sales Chatbot', 
      impact: '+40% lead conversion', 
      demoId: 'chatbot',
      description: 'Intelligent chatbots that qualify leads, answer questions, and schedule appointments 24/7. Seamlessly integrates with your CRM and sales workflow.',
      features: ['Lead qualification', 'CRM integration', 'Multi-language support', '24/7 availability'],
      color: 'from-violet-500 to-purple-600'
    },
    { 
      id: 'voice',
      icon: Brain, 
      title: 'Voice Receptionist', 
      impact: '95% customer satisfaction', 
      demoId: 'voice',
      description: 'AI-powered voice agents that handle inbound calls, route inquiries, and provide instant support with natural conversation.',
      features: ['Natural voice interaction', 'Call routing', 'Appointment scheduling', 'Callback management'],
      color: 'from-pink-500 to-rose-600'
    },
    { 
      id: 'analytics',
      icon: TrendingUp, 
      title: 'Predictive Analytics', 
      impact: '+25% forecast accuracy', 
      demoId: 'analytics',
      description: 'Data-driven decisions powered by AI that predicts trends, identifies opportunities, and forecasts outcomes.',
      features: ['Trend prediction', 'Anomaly detection', 'What-if scenarios', 'Automated reports'],
      color: 'from-fuchsia-500 to-purple-600'
    },
    { 
      id: 'automation',
      icon: Cog, 
      title: 'Business Automation', 
      impact: '85% time savings', 
      demoId: 'automation',
      description: 'Build powerful workflows that automate repetitive tasks and connect your business tools seamlessly.',
      features: ['Visual workflow builder', 'App integrations', 'Trigger-based actions', 'Real-time monitoring'],
      color: 'from-violet-500 to-purple-600'
    },
    { 
      id: 'dispatch',
      icon: Truck, 
      title: 'AI Agent Dispatch & Logistics', 
      impact: '+30% efficiency', 
      demoId: 'dispatch',
      description: 'Optimize semi-truck dispatching with AI-powered route planning, driver management, and real-time GPS tracking.',
      features: ['Route optimization', 'Load matching', 'Driver scheduling', 'Real-time GPS'],
      color: 'from-emerald-500 to-teal-600'
    },
    { 
      id: 'healthcare',
      icon: Heart, 
      title: '24/7 Healthcare Receptionist', 
      impact: '24/7 availability', 
      demoId: 'healthcare',
      description: 'AI-powered clinic receptionist handling appointments, symptom triage, and patient inquiries around the clock.',
      features: ['Appointment booking', 'Symptom triage', 'Insurance verification', 'Patient queue'],
      color: 'from-rose-500 to-pink-600'
    },
    { 
      id: 'education',
      icon: GraduationCap, 
      title: '24/7 Education Counselor', 
      impact: '95% satisfaction', 
      demoId: 'education',
      description: 'AI academic advisor helping students with course selection, enrollment assistance, and schedule planning.',
      features: ['Course recommendations', 'Enrollment assistance', 'Schedule planning', 'Academic tracking'],
      color: 'from-blue-500 to-indigo-600'
    },
    { 
      id: 'plumbing',
      icon: Droplets, 
      title: '24/7 Plumber & Landscaping', 
      impact: '2,847 jobs done', 
      demoId: 'plumbing',
      description: 'Vektar AI Agent for plumbing and landscaping services with project estimates and emergency dispatch.',
      features: ['Service booking', 'Emergency plumbing', 'Project quotes', 'Seasonal offers'],
      color: 'from-blue-500 to-cyan-600'
    },
    { 
      id: 'saas',
      icon: Laptop, 
      title: 'SaaS AI Application Development', 
      impact: '3x faster launch', 
      demoId: 'saas',
      description: 'Build custom AI-powered SaaS applications with intelligent features and scalable architecture.',
      features: ['AI feature builder', 'Tech stack configuration', 'Timeline planning', 'Cost calculator'],
      color: 'from-indigo-500 to-violet-600'
    },
    { 
      id: 'callcenter',
      icon: HeadphonesIcon, 
      title: 'AI Call Center', 
      impact: '-45% handle time', 
      demoId: 'callcenter',
      description: 'Real-time AI-powered call center with sentiment analysis and live transcription.',
      features: ['Live call monitoring', 'AI vs human metrics', 'Smart routing', 'Performance analytics'],
      color: 'from-teal-500 to-emerald-600'
    },
    { 
      id: 'crm',
      icon: Database, 
      title: 'CRM Development', 
      impact: '+35% close rate', 
      demoId: 'crm',
      description: 'AI-enhanced CRM with predictive lead scoring, pipeline analytics, and smart automation.',
      features: ['AI lead scoring', 'Deal pipeline', 'Revenue forecasting', 'Smart insights'],
      color: 'from-amber-500 to-orange-600'
    },
    { 
      id: 'rag',
      icon: Eye, 
      title: 'RAG Knowledge Hub', 
      impact: '99% accuracy rate', 
      demoId: 'rag',
      description: 'Explore how our RAG system provides accurate answers from your company knowledge base.',
      features: ['Document ingestion', 'Semantic search', 'Source attribution', 'Real-time updates'],
      color: 'from-cyan-500 to-blue-600'
    },
    { 
      id: 'document',
      icon: FileText, 
      title: 'Document Intelligence', 
      impact: '99% data extraction', 
      demoId: 'document',
      description: 'Watch AI extract and process information from complex documents automatically.',
      features: ['OCR processing', 'Data extraction', 'Format conversion', 'Validation rules'],
      color: 'from-orange-500 to-red-600'
    },
    { 
      id: 'transcription',
      icon: Mic, 
      title: 'Meeting Transcription', 
      impact: '10x faster notes', 
      demoId: 'transcription',
      description: 'Watch AI transcribe meetings in real-time with speaker identification and summaries.',
      features: ['Real-time transcription', 'Speaker identification', 'Action item extraction', 'Searchable archives'],
      color: 'from-emerald-500 to-teal-600'
    },
    { 
      id: 'support',
      icon: HeadphonesIcon, 
      title: 'Customer Support Bot', 
      impact: '-60% ticket volume', 
      demoId: 'support',
      description: 'Experience AI-powered customer support that resolves issues before they become tickets.',
      features: ['Smart FAQ', 'Issue classification', 'Sentiment analysis', 'Escalation logic'],
      color: 'from-blue-500 to-indigo-600'
    },
    { 
      id: 'enrichment',
      icon: Database, 
      title: 'Data Enrichment', 
      impact: '+85% data quality', 
      demoId: 'enrichment',
      description: 'See AI clean, validate, and enrich your data automatically with high accuracy.',
      features: ['Data cleaning', 'Auto-enrichment', 'Duplicate detection', 'Quality scoring'],
      color: 'from-amber-500 to-orange-600'
    },
    { 
      id: 'automechanic',
      icon: Car, 
      title: '24/7 Mobile Auto Mechanic', 
      impact: '97% on-time arrival', 
      demoId: 'automechanic',
      description: 'Vektar AI Agent for mobile auto repair services with diagnostics and scheduling.',
      features: ['Service scheduling', 'Vehicle diagnostics', 'Pricing estimates', 'Technician tracking'],
      color: 'from-orange-500 to-red-600'
    },
    { 
      id: 'techservice',
      icon: Laptop, 
      title: '24/7 Mobile Tech Service', 
      impact: '94% first-time fix', 
      demoId: 'techservice',
      description: 'Vektar AI Agent for mobile tech support with device diagnostics and repair booking.',
      features: ['Device diagnostics', 'Repair booking', 'Status tracking', 'Pricing info'],
      color: 'from-cyan-500 to-blue-600'
    },
    { 
      id: 'hvac',
      icon: Thermometer, 
      title: '24/7 Mobile HVAC Service', 
      impact: '28 min response', 
      demoId: 'hvac',
      description: 'Vektar AI Agent for HVAC services with emergency dispatch and maintenance scheduling.',
      features: ['Service scheduling', 'Emergency dispatch', 'Maintenance reminders', 'Technician tracking'],
      color: 'from-sky-500 to-indigo-600'
    },
    { 
      id: 'quote',
      icon: FileText, 
      title: 'Quote Copilot', 
      impact: '90% faster quotes', 
      demoId: 'quote',
      description: 'AI-powered quote generation that creates professional proposals in seconds.',
      features: ['Smart templates', 'Dynamic pricing', 'Auto-formatting', 'Approval workflows'],
      color: 'from-lime-500 to-green-600'
    },
    { 
      id: 'ticket',
      icon: MessageSquare, 
      title: 'Ticket Deflection System', 
      impact: '-60% tickets', 
      demoId: 'ticket',
      description: 'Reduce support tickets by automatically resolving common issues with AI.',
      features: ['Smart FAQ', 'Auto-resolution', 'Escalation logic', 'Knowledge mining'],
      color: 'from-purple-500 to-violet-600'
    },
    { 
      id: 'fieldtech',
      icon: Cog, 
      title: 'Field Tech Copilot', 
      impact: '+40% efficiency', 
      demoId: 'fieldtech',
      description: 'AI assistant for field technicians with diagnostics and repair guidance.',
      features: ['Diagnostics', 'Repair guides', 'Parts lookup', 'Customer history'],
      color: 'from-orange-500 to-red-600'
    },
    { 
      id: 'kpi',
      icon: TrendingUp, 
      title: 'Executive KPI Copilot', 
      impact: 'Real-time insights', 
      demoId: 'kpi',
      description: 'Real-time business intelligence dashboard with AI-powered insights for executives.',
      features: ['KPI tracking', 'Trend analysis', 'Anomaly alerts', 'Board reports'],
      color: 'from-cyan-500 to-blue-600'
    }
  ]

  const openDemo = (demoId) => {
    setSelectedDemo(demoId)
    setIsDemoModalOpen(true)
  }

  return (
    <>
      <SEO 
        title="AI Solutions - 23 Live Demos | Chatbots, Voice Agents, Analytics & Automation"
        description="Explore 23 AI solutions with live demos: Sales Chatbots, Voice Receptionists, Predictive Analytics, Business Automation, CRM, Call Center, SaaS Development, and industry-specific AI agents."
        canonical="https://vektar.io/solutions"
      />
      <section className="py-8 sm:py-12 lg:py-16 circuit-pattern relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600 mb-4">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Live AI Demos</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4">
              <span className="text-foreground">AI Solutions</span> That Drive Results
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From sales automation to document intelligence, our AI solutions are designed 
              to integrate seamlessly into your existing workflows and deliver measurable ROI.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
            {solutions.map((solution, index) => (
              <div 
                key={index}
                id={solution.id}
                className="group relative scroll-mt-24"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500 group-hover:duration-200"></div>
                
                <div className="relative h-full bg-card/95 backdrop-blur-xl rounded-2xl border border-border/50 p-5 sm:p-6 transition-all duration-500 group-hover:border-transparent group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:-translate-y-1">
                  
                  <div className="flex items-start justify-between mb-4 sm:mb-5">
                    <div className={`relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${solution.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <solution.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="relative">
                      <Badge className={`bg-gradient-to-r ${solution.color} text-white border-0 text-xs font-semibold px-2.5 py-1 shadow-md group-hover:scale-105 transition-transform duration-300`}>
                        <Zap className="w-3 h-3 mr-1 inline-block" />
                        {solution.impact}
                      </Badge>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10"></div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    {solution.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 sm:mb-5 line-clamp-3">
                    {solution.description}
                  </p>
                  
                  <div className="space-y-2 mb-5 sm:mb-6">
                    {solution.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 group/feature">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${solution.color} flex-shrink-0 group-hover/feature:scale-125 transition-transform duration-200`}></div>
                        <span className="text-xs sm:text-sm text-muted-foreground group-hover/feature:text-foreground transition-colors duration-200">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full bg-gradient-to-r ${solution.color} text-white border-0 hover:opacity-90 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 text-sm sm:text-base py-2.5 sm:py-3 font-semibold group/btn`}
                    onClick={() => openDemo(solution.demoId)}
                  >
                    <Play className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-200" />
                    Try Interactive Demo
                    <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-200" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 vektar-gradient"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Custom Solutions</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6">
            Need a Custom Solution?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
            We build bespoke AI solutions tailored to your unique business challenges and workflows.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 hover:scale-105 text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
              Discuss Your Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
        initialDemo={selectedDemo}
      />
    </>
  )
}

export default SolutionsPage
