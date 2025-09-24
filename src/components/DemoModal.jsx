import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  X, 
  Play, 
  MessageSquare, 
  Brain, 
  FileText, 
  BarChart3, 
  Users, 
  Eye,
  ArrowRight,
  ExternalLink,
  Calculator,
  Wrench
} from 'lucide-react'
import { requestDemo } from '../api/contact.js'
import ChatbotDemo from './demos/ChatbotDemo.jsx'
import VoiceDemo from './demos/VoiceDemo.jsx'
import RAGDemo from './demos/RAGDemo.jsx'
import DocumentDemo from './demos/DocumentDemo.jsx'
import KPIDemo from './demos/KPIDemo.jsx'
import TicketDemo from './demos/TicketDemo.jsx'
import QuoteDemo from './demos/QuoteDemo.jsx'
import FieldTechDemo from './demos/FieldTechDemo.jsx'

const DemoModal = ({ isOpen, onClose }) => {
  const [selectedDemo, setSelectedDemo] = useState(null)
  const [isRequestingDemo, setIsRequestingDemo] = useState(false)
  const [demoRequestForm, setDemoRequestForm] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const demos = [
    {
      id: 'chatbot',
      title: 'AI Sales Chatbot',
      description: 'See how our AI chatbot converts visitors into qualified leads with natural conversations',
      icon: MessageSquare,
      features: ['Natural language processing', 'Lead qualification', 'CRM integration', 'Multi-language support'],
      metrics: '+40% conversion rate',
      component: ChatbotDemo,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'voice',
      title: 'Voice Receptionist',
      description: 'Experience our AI voice agent handling customer calls with human-like interactions',
      icon: Brain,
      features: ['Natural voice synthesis', '24/7 availability', 'Call routing', 'Appointment booking'],
      metrics: '95% customer satisfaction',
      component: VoiceDemo,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'quote',
      title: 'Quote Copilot',
      description: 'Watch AI generate accurate project quotes in seconds with intelligent pricing analysis',
      icon: Calculator,
      features: ['Intelligent pricing', 'ROI analysis', 'Custom proposals', 'Instant generation'],
      metrics: '-60% response time',
      component: QuoteDemo,
      color: 'from-emerald-500 to-cyan-500'
    },
    {
      id: 'rag',
      title: 'RAG Knowledge Hub',
      description: 'Explore how our RAG system provides accurate answers from your company knowledge base',
      icon: Eye,
      features: ['Document ingestion', 'Semantic search', 'Source attribution', 'Real-time updates'],
      metrics: '99% accuracy rate',
      component: RAGDemo,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'support',
      title: 'Ticket Deflection System',
      description: 'Experience how AI handles customer support tickets before they reach your team',
      icon: Users,
      features: ['Auto-categorization', 'Smart routing', 'Response templates', 'Escalation rules'],
      metrics: '-50% support load',
      component: TicketDemo,
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'fieldtech',
      title: 'Field Tech Copilot',
      description: 'See how AI assists field technicians with intelligent guidance and real-time support',
      icon: Wrench,
      features: ['Route optimization', 'Smart checklists', 'Real-time guidance', 'Performance tracking'],
      metrics: '+30% efficiency',
      component: FieldTechDemo,
      color: 'from-amber-500 to-orange-500'
    },
    {
      id: 'document',
      title: 'Document Intelligence',
      description: 'Watch AI extract and process information from complex documents automatically',
      icon: FileText,
      features: ['OCR processing', 'Data extraction', 'Format conversion', 'Validation rules'],
      metrics: '99% data extraction',
      component: DocumentDemo,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'kpi',
      title: 'Executive KPI Copilot',
      description: 'See real-time business insights and automated reporting in action',
      icon: BarChart3,
      features: ['Real-time dashboards', 'Automated reports', 'Trend analysis', 'Alert system'],
      metrics: 'Real-time insights',
      component: KPIDemo,
      color: 'from-indigo-500 to-purple-500'
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              Live <span className="vectorik-gradient-text">AI Demos</span>
            </h2>
            <p className="text-muted-foreground mt-2">
              Experience our AI solutions in action. Click on any demo to see how it works.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-secondary"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Demo Content */}
        <div className="p-6">
          {!selectedDemo ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {demos.map((demo) => (
                <Card 
                  key={demo.id} 
                  data-demo-id={demo.id}
                  className="glass-card hover-glow cursor-pointer group transition-all duration-300"
                  onClick={() => setSelectedDemo(demo)}
                >
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${demo.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <demo.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {demo.title}
                    </CardTitle>
                    <Badge variant="secondary" className="w-fit">
                      {demo.metrics}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {demo.description}
                    </p>
                    <div className="flex items-center text-primary text-sm font-medium">
                      <Play className="w-4 h-4 mr-2" />
                      Try Interactive Demo
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* Selected Demo View */
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedDemo(null)}
                  className="hover:bg-secondary"
                >
                  ← Back to Demos
                </Button>
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedDemo.color} flex items-center justify-center`}>
                    <selectedDemo.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{selectedDemo.title}</h3>
                    <Badge variant="secondary">{selectedDemo.metrics}</Badge>
                  </div>
                </div>
              </div>

              {/* Interactive Demo Component */}
              <Card className="glass-card">
                <CardContent className="p-6">
                  <selectedDemo.component />
                </CardContent>
              </Card>

              {/* Demo Request Form */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Request Personal Demo</CardTitle>
                  <p className="text-muted-foreground">
                    Want to see how this solution works with your specific data? Request a personalized demo.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name *"
                      value={demoRequestForm.name}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your email *"
                      value={demoRequestForm.email}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <input
                    type="text"
                    name="company"
                    placeholder="Company name (optional)"
                    value={demoRequestForm.company}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <textarea
                    name="message"
                    placeholder="Tell us about your specific use case..."
                    value={demoRequestForm.message}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                  <Button
                    onClick={() => handleDemoRequest(selectedDemo.title)}
                    className="vectorik-gradient hover-glow"
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
