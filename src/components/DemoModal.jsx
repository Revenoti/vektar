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
  ExternalLink
} from 'lucide-react'
import { requestDemo } from '../api/contact.js'

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
      demoUrl: '#chatbot-demo',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'voice',
      title: 'Voice Receptionist',
      description: 'Experience our AI voice agent handling customer calls with human-like interactions',
      icon: Brain,
      features: ['Natural voice synthesis', '24/7 availability', 'Call routing', 'Appointment booking'],
      metrics: '95% customer satisfaction',
      demoUrl: '#voice-demo',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'rag',
      title: 'RAG Knowledge Hub',
      description: 'Explore how our RAG system provides accurate answers from your company knowledge base',
      icon: Eye,
      features: ['Document ingestion', 'Semantic search', 'Source attribution', 'Real-time updates'],
      metrics: '99% accuracy rate',
      demoUrl: '#rag-demo',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'document',
      title: 'Document Intelligence',
      description: 'Watch AI extract and process information from complex documents automatically',
      icon: FileText,
      features: ['OCR processing', 'Data extraction', 'Format conversion', 'Validation rules'],
      metrics: '99% data extraction',
      demoUrl: '#document-demo',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'kpi',
      title: 'Executive KPI Copilot',
      description: 'See real-time business insights and automated reporting in action',
      icon: BarChart3,
      features: ['Real-time dashboards', 'Automated reports', 'Trend analysis', 'Alert system'],
      metrics: 'Real-time insights',
      demoUrl: '#kpi-demo',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'support',
      title: 'Ticket Deflection System',
      description: 'Experience how AI handles customer support tickets before they reach your team',
      icon: Users,
      features: ['Auto-categorization', 'Smart routing', 'Response templates', 'Escalation rules'],
      metrics: '-50% support load',
      demoUrl: '#support-demo',
      color: 'from-pink-500 to-rose-500'
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
      <div className="bg-background border border-border rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
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

        {/* Demo Grid */}
        <div className="p-6">
          {!selectedDemo ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {demos.map((demo) => (
                <Card 
                  key={demo.id} 
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
                      Try Demo
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* Selected Demo View */
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedDemo(null)}
                  className="hover:bg-secondary"
                >
                  ← Back to Demos
                </Button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Demo Info */}
                <div className="space-y-6">
                  <div>
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedDemo.color} flex items-center justify-center mb-6`}>
                      <selectedDemo.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{selectedDemo.title}</h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      {selectedDemo.description}
                    </p>
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      {selectedDemo.metrics}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-4">Key Features</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedDemo.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">Request Personal Demo</h4>
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        value={demoRequestForm.name}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Your email"
                        value={demoRequestForm.email}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <input
                        type="text"
                        name="company"
                        placeholder="Company (optional)"
                        value={demoRequestForm.company}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <Button
                        onClick={() => handleDemoRequest(selectedDemo.title)}
                        className="w-full vectorik-gradient hover-glow"
                        disabled={isRequestingDemo}
                      >
                        {isRequestingDemo ? 'Requesting...' : 'Request Personal Demo'}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Demo Placeholder */}
                <div className="space-y-6">
                  <Card className="glass-card">
                    <CardContent className="p-8 text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Play className="w-12 h-12 text-primary" />
                      </div>
                      <h4 className="text-xl font-semibold mb-4">Interactive Demo</h4>
                      <p className="text-muted-foreground mb-6">
                        This would be an interactive demo of the {selectedDemo.title} in action. 
                        In a real implementation, this could be:
                      </p>
                      <div className="space-y-2 text-sm text-muted-foreground text-left">
                        <div>• Embedded iframe with live demo</div>
                        <div>• Interactive chat interface</div>
                        <div>• Screen recording with controls</div>
                        <div>• Sandbox environment</div>
                      </div>
                      <Button 
                        className="mt-6 vectorik-gradient"
                        onClick={() => window.open('#', '_blank')}
                      >
                        Open Full Demo
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="glass-card">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-4">Demo Highlights</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Response Time</span>
                          <span className="font-medium">&lt; 0.5s</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Accuracy</span>
                          <span className="font-medium">98.5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Uptime</span>
                          <span className="font-medium">99.9%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Languages</span>
                          <span className="font-medium">12+</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DemoModal
