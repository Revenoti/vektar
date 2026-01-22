import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  X, 
  Play, 
  MessageSquare, 
  Brain, 
  FileText, 
  Eye,
  ArrowRight,
  Mic,
  HeadphonesIcon,
  Database,
  TrendingUp,
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
import ChatbotDemo from './demos/ChatbotDemo.jsx'
import VoiceDemo from './demos/VoiceDemo.jsx'
import RAGDemo from './demos/RAGDemo.jsx'
import DocumentDemo from './demos/DocumentDemo.jsx'
import TranscriptionDemo from './demos/TranscriptionDemo.jsx'
import SupportBotDemo from './demos/SupportBotDemo.jsx'
import DataEnrichmentDemo from './demos/DataEnrichmentDemo.jsx'
import PredictiveAnalyticsDemo from './demos/PredictiveAnalyticsDemo.jsx'
import BusinessAutomationDemo from './demos/BusinessAutomationDemo.jsx'
import DispatchLogisticsDemo from './demos/DispatchLogisticsDemo.jsx'
import HealthcareReceptionistDemo from './demos/HealthcareReceptionistDemo.jsx'
import EducationCounselorDemo from './demos/EducationCounselorDemo.jsx'
import AutoMechanicDemo from './demos/AutoMechanicDemo.jsx'
import TechServiceDemo from './demos/TechServiceDemo.jsx'
import HVACServiceDemo from './demos/HVACServiceDemo.jsx'
import PlumberLandscapingDemo from './demos/PlumberLandscapingDemo.jsx'
import SaaSDemo from './demos/SaaSDemo.jsx'
import CallCenterDemo from './demos/CallCenterDemo.jsx'
import CRMDemo from './demos/CRMDemo.jsx'
import QuoteDemo from './demos/QuoteDemo.jsx'
import TicketDemo from './demos/TicketDemo.jsx'
import FieldTechDemo from './demos/FieldTechDemo.jsx'
import KPIDemo from './demos/KPIDemo.jsx'

const DemoModal = ({ isOpen, onClose, initialDemo = null }) => {
  const [selectedDemo, setSelectedDemo] = useState(null)

  useEffect(() => {
    if (initialDemo && isOpen) {
      const demo = demos.find(d => d.id === initialDemo)
      if (demo) {
        setSelectedDemo(demo)
      }
    }
  }, [initialDemo, isOpen])

  const demos = [
    {
      id: 'chatbot',
      title: 'AI Sales Chatbot',
      description: 'See how your Vektar AI Agent converts visitors into qualified leads with natural conversations',
      icon: MessageSquare,
      features: ['Natural language processing', 'Lead qualification', 'CRM integration', 'Multi-language support'],
      metrics: '+40% lead conversion',
      component: ChatbotDemo,
      color: 'from-violet-500 to-purple-600'
    },
    {
      id: 'voice',
      title: 'Voice Receptionist',
      description: 'Experience your Vektar AI Agent handling customer calls with human-like interactions',
      icon: Brain,
      features: ['Natural voice synthesis', '24/7 availability', 'Call routing', 'Appointment booking'],
      metrics: '95% customer satisfaction',
      component: VoiceDemo,
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: 'rag',
      title: 'RAG Knowledge Hub',
      description: 'Explore how our RAG system provides accurate answers from your company knowledge base',
      icon: Eye,
      features: ['Document ingestion', 'Semantic search', 'Source attribution', 'Real-time updates'],
      metrics: '99% accuracy rate',
      component: RAGDemo,
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'document',
      title: 'Document Intelligence',
      description: 'Watch AI extract and process information from complex documents automatically',
      icon: FileText,
      features: ['OCR processing', 'Data extraction', 'Format conversion', 'Validation rules'],
      metrics: '99% data extraction',
      component: DocumentDemo,
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'transcription',
      title: 'Meeting Transcription',
      description: 'Watch AI transcribe meetings in real-time with speaker identification and summaries',
      icon: Mic,
      features: ['Real-time transcription', 'Speaker identification', 'Action item extraction', 'Searchable archives'],
      metrics: '10x faster notes',
      component: TranscriptionDemo,
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'support',
      title: 'Customer Support Bot',
      description: 'Experience AI-powered customer support that resolves issues before they become tickets',
      icon: HeadphonesIcon,
      features: ['Smart FAQ', 'Issue classification', 'Sentiment analysis', 'Escalation logic'],
      metrics: '-60% ticket volume',
      component: SupportBotDemo,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'enrichment',
      title: 'Data Enrichment',
      description: 'See AI clean, validate, and enrich your data automatically with high accuracy',
      icon: Database,
      features: ['Data cleaning', 'Auto-enrichment', 'Duplicate detection', 'Quality scoring'],
      metrics: '+85% data quality',
      component: DataEnrichmentDemo,
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 'analytics',
      title: 'Predictive Analytics',
      description: 'Experience AI-powered forecasting and business intelligence with actionable insights',
      icon: TrendingUp,
      features: ['Trend prediction', 'Anomaly detection', 'What-if scenarios', 'Automated reports'],
      metrics: '+25% forecast accuracy',
      component: PredictiveAnalyticsDemo,
      color: 'from-fuchsia-500 to-purple-600'
    },
    {
      id: 'automation',
      title: 'Business Automation',
      description: 'Build powerful workflows that automate repetitive tasks and connect your business tools',
      icon: Cog,
      features: ['Visual workflow builder', 'App integrations', 'Trigger-based actions', 'Real-time monitoring'],
      metrics: '85% time savings',
      component: BusinessAutomationDemo,
      color: 'from-violet-500 to-purple-600'
    },
    {
      id: 'dispatch',
      title: 'AI Dispatch & Logistics',
      description: 'Optimize semi-truck dispatching with AI-powered route planning and driver management',
      icon: Truck,
      features: ['Route optimization', 'Load matching', 'Driver scheduling', 'Real-time GPS tracking'],
      metrics: '+30% efficiency',
      component: DispatchLogisticsDemo,
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'healthcare',
      title: '24/7 Healthcare Receptionist',
      description: 'AI-powered clinic receptionist handling appointments, triage, and patient inquiries',
      icon: Heart,
      features: ['Appointment booking', 'Symptom triage', 'Insurance verification', 'Patient queue'],
      metrics: '24/7 availability',
      component: HealthcareReceptionistDemo,
      color: 'from-rose-500 to-pink-600'
    },
    {
      id: 'education',
      title: '24/7 Education Counselor',
      description: 'AI academic advisor helping students with course selection and enrollment',
      icon: GraduationCap,
      features: ['Course recommendations', 'Enrollment assistance', 'Schedule planning', 'Academic tracking'],
      metrics: '95% satisfaction',
      component: EducationCounselorDemo,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'automechanic',
      title: '24/7 Mobile Auto Mechanic',
      description: 'Vektar AI Agent for mobile auto repair services with diagnostics and scheduling',
      icon: Car,
      features: ['Service scheduling', 'Vehicle diagnostics', 'Pricing estimates', 'Technician tracking'],
      metrics: '97% on-time arrival',
      component: AutoMechanicDemo,
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'techservice',
      title: '24/7 Mobile Tech Service',
      description: 'Vektar AI Agent for mobile tech support with device diagnostics and repair booking',
      icon: Laptop,
      features: ['Device diagnostics', 'Repair booking', 'Status tracking', 'Pricing info'],
      metrics: '94% first-time fix',
      component: TechServiceDemo,
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'hvac',
      title: '24/7 Mobile HVAC Service',
      description: 'Vektar AI Agent for HVAC services with emergency dispatch and maintenance scheduling',
      icon: Thermometer,
      features: ['Service scheduling', 'Emergency dispatch', 'Maintenance reminders', 'Technician tracking'],
      metrics: '28 min response',
      component: HVACServiceDemo,
      color: 'from-sky-500 to-indigo-600'
    },
    {
      id: 'plumbing',
      title: '24/7 Plumber & Landscaping',
      description: 'Vektar AI Agent for plumbing and landscaping services with project estimates',
      icon: Droplets,
      features: ['Service booking', 'Emergency plumbing', 'Project quotes', 'Seasonal offers'],
      metrics: '2,847 jobs done',
      component: PlumberLandscapingDemo,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'saas',
      title: 'SaaS AI Application Development',
      description: 'Build custom AI-powered SaaS applications with intelligent features and scalable architecture',
      icon: Laptop,
      features: ['AI feature builder', 'Tech stack configuration', 'Timeline planning', 'Cost calculator'],
      metrics: '3x faster launch',
      component: SaaSDemo,
      color: 'from-indigo-500 to-violet-600'
    },
    {
      id: 'callcenter',
      title: 'AI Call Center',
      description: 'Real-time AI-powered call center with sentiment analysis and live transcription',
      icon: HeadphonesIcon,
      features: ['Live call monitoring', 'AI vs human metrics', 'Smart routing', 'Performance analytics'],
      metrics: '-45% handle time',
      component: CallCenterDemo,
      color: 'from-teal-500 to-emerald-600'
    },
    {
      id: 'crm',
      title: 'CRM Development',
      description: 'AI-enhanced CRM with predictive lead scoring, pipeline analytics, and smart automation',
      icon: Database,
      features: ['AI lead scoring', 'Deal pipeline', 'Revenue forecasting', 'Smart insights'],
      metrics: '+35% close rate',
      component: CRMDemo,
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 'quote',
      title: 'Quote Copilot',
      description: 'AI-powered quote generation that creates professional proposals in seconds',
      icon: FileText,
      features: ['Smart templates', 'Dynamic pricing', 'Auto-formatting', 'Approval workflows'],
      metrics: '90% faster quotes',
      component: QuoteDemo,
      color: 'from-lime-500 to-green-600'
    },
    {
      id: 'ticket',
      title: 'Ticket Deflection System',
      description: 'Reduce support tickets by automatically resolving common issues with AI',
      icon: MessageSquare,
      features: ['Smart FAQ', 'Auto-resolution', 'Escalation logic', 'Knowledge mining'],
      metrics: '-60% tickets',
      component: TicketDemo,
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 'fieldtech',
      title: 'Field Tech Copilot',
      description: 'AI assistant for field technicians with diagnostics and repair guidance',
      icon: Cog,
      features: ['Diagnostics', 'Repair guides', 'Parts lookup', 'Customer history'],
      metrics: '+40% efficiency',
      component: FieldTechDemo,
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'kpi',
      title: 'Executive KPI Copilot',
      description: 'Real-time business intelligence dashboard with AI-powered insights for executives',
      icon: TrendingUp,
      features: ['KPI tracking', 'Trend analysis', 'Anomaly alerts', 'Board reports'],
      metrics: 'Real-time insights',
      component: KPIDemo,
      color: 'from-cyan-500 to-blue-600'
    }
  ]

  const handleClose = () => {
    setSelectedDemo(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-0 md:p-4">
      <div className="bg-background border-0 md:border border-border rounded-none md:rounded-2xl max-w-7xl w-full h-full md:h-auto md:max-h-[95vh] overflow-y-auto">
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-4 md:p-6 flex items-center justify-between pad-safe-top z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600">
                <Sparkles className="w-3 h-3 text-white" />
                <span className="text-xs font-medium text-white">Interactive</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-purple-600">
              Live AI Demos
            </h2>
            <p className="text-muted-foreground mt-1 text-sm md:text-base">
              Experience our AI solutions in action. Click on any demo to try it.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="hover:bg-secondary tap-target min-w-[44px] min-h-[44px] md:min-w-[40px] md:min-h-[40px]"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="p-4 md:p-6">
          {!selectedDemo ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {demos.map((demo) => (
                <div 
                  key={demo.id} 
                  data-demo-id={demo.id}
                  className="group relative cursor-pointer"
                  onClick={() => setSelectedDemo(demo)}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500 group-hover:duration-200"></div>
                  
                  <div className="relative h-full bg-card/95 backdrop-blur-xl rounded-2xl border border-border/50 p-5 transition-all duration-500 group-hover:border-transparent group-hover:shadow-2xl group-hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`relative w-12 h-12 bg-gradient-to-br ${demo.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        <demo.icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge className={`bg-gradient-to-r ${demo.color} text-white border-0 text-xs font-semibold px-2 py-1 shadow-md`}>
                        <Zap className="w-3 h-3 mr-1 inline-block" />
                        {demo.metrics}
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                      {demo.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                      {demo.description}
                    </p>
                    
                    <div className="flex items-center text-primary text-sm font-semibold group-hover:gap-2 transition-all duration-300">
                      <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      <span>Try Demo</span>
                      <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedDemo(null)}
                  className="hover:bg-secondary min-h-[44px] px-3 md:px-4"
                >
                  ← <span className="hidden sm:inline ml-1">Back to Demos</span><span className="sm:hidden ml-1">Back</span>
                </Button>
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${selectedDemo.color} flex items-center justify-center shadow-lg`}>
                    <selectedDemo.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-2xl font-bold">{selectedDemo.title}</h3>
                    <Badge className={`bg-gradient-to-r ${selectedDemo.color} text-white border-0 text-xs`}>
                      {selectedDemo.metrics}
                    </Badge>
                  </div>
                </div>
              </div>

              <Card className="bg-secondary/20 border-border/50">
                <CardContent className="p-4 md:p-6">
                  <selectedDemo.component />
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Want a Personal Demo?
                  </CardTitle>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Skip the forms! Talk directly to your Vektar AI Agent to discuss how this solution can work for your business.
                  </p>
                </CardHeader>
                <CardContent>
                  <a href="/call">
                    <Button
                      className="vektar-gradient hover-glow w-full tap-target min-h-[52px] text-base font-semibold"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Talk to Vektar AI
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Real-time AI conversation - No waiting, instant answers
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DemoModal
