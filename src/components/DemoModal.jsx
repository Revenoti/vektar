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
  Zap
} from 'lucide-react'
import { requestDemo } from '../api/contact.js'
import ChatbotDemo from './demos/ChatbotDemo.jsx'
import VoiceDemo from './demos/VoiceDemo.jsx'
import RAGDemo from './demos/RAGDemo.jsx'
import DocumentDemo from './demos/DocumentDemo.jsx'
import TranscriptionDemo from './demos/TranscriptionDemo.jsx'
import SupportBotDemo from './demos/SupportBotDemo.jsx'
import DataEnrichmentDemo from './demos/DataEnrichmentDemo.jsx'
import PredictiveAnalyticsDemo from './demos/PredictiveAnalyticsDemo.jsx'

const DemoModal = ({ isOpen, onClose, initialDemo = null }) => {
  const [selectedDemo, setSelectedDemo] = useState(null)
  const [isRequestingDemo, setIsRequestingDemo] = useState(false)
  const [demoRequestForm, setDemoRequestForm] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

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
      description: 'See how our AI chatbot converts visitors into qualified leads with natural conversations',
      icon: MessageSquare,
      features: ['Natural language processing', 'Lead qualification', 'CRM integration', 'Multi-language support'],
      metrics: '+40% lead conversion',
      component: ChatbotDemo,
      color: 'from-violet-500 to-purple-600'
    },
    {
      id: 'voice',
      title: 'Voice Receptionist',
      description: 'Experience our AI voice agent handling customer calls with human-like interactions',
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
    }
  ]

  const handleDemoRequest = async (demoType) => {
    if (!demoRequestForm.name || !demoRequestForm.email) {
      alert('Please fill in your name and email to request a demo.')
      return
    }

    setIsRequestingDemo(true)
    
    try {
      const result = await requestDemo({
        ...demoRequestForm,
        demoType: demoType
      })
      
      if (result.success) {
        alert(result.message)
        setDemoRequestForm({ name: '', email: '', company: '', message: '' })
        onClose()
      } else {
        alert(result.message)
      }
    } catch (error) {
      alert('There was an error submitting your demo request. Please try again.')
    } finally {
      setIsRequestingDemo(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setDemoRequestForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

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
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-xs font-medium text-primary">Interactive</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Live <span className="vektar-gradient-text">AI Demos</span>
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
                  <CardTitle className="text-lg md:text-xl">Request Personal Demo</CardTitle>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Want to see how this solution works with your specific data? Request a personalized demo.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name *"
                      value={demoRequestForm.name}
                      onChange={handleInputChange}
                      autoComplete="name"
                      className="w-full p-4 md:p-3 text-base bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent tap-target min-h-[44px]"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your email *"
                      value={demoRequestForm.email}
                      onChange={handleInputChange}
                      autoComplete="email"
                      inputMode="email"
                      className="w-full p-4 md:p-3 text-base bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent tap-target min-h-[44px]"
                    />
                  </div>
                  <input
                    type="text"
                    name="company"
                    placeholder="Company name (optional)"
                    value={demoRequestForm.company}
                    onChange={handleInputChange}
                    autoComplete="organization"
                    className="w-full p-4 md:p-3 text-base bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent tap-target min-h-[44px]"
                  />
                  <textarea
                    name="message"
                    placeholder="Tell us about your specific use case..."
                    value={demoRequestForm.message}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-4 md:p-3 text-base bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none tap-target min-h-[120px]"
                  />
                  <Button
                    onClick={() => handleDemoRequest(selectedDemo.title)}
                    className="vektar-gradient hover-glow w-full md:w-auto tap-target min-h-[44px] text-base font-semibold"
                    disabled={isRequestingDemo}
                  >
                    {isRequestingDemo ? 'Requesting...' : 'Request Personal Demo'}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
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
