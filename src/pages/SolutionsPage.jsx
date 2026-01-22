import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  ArrowRight, 
  MessageSquare, 
  Brain, 
  Eye, 
  BarChart3,
  Users,
  Calculator,
  Wrench,
  FileText,
  Cloud,
  Cog,
  Headphones,
  Database,
  Play
} from 'lucide-react'
import DemoModal from '@/components/DemoModal.jsx'

const SolutionsPage = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)
  const [selectedDemo, setSelectedDemo] = useState(null)

  const solutions = [
    { 
      icon: MessageSquare, 
      title: 'AI Sales Chatbot', 
      impact: '+40% lead conversion', 
      demoId: 'chatbot',
      description: 'Intelligent chatbots that qualify leads, answer questions, and schedule appointments 24/7. Seamlessly integrates with your CRM and sales workflow.',
      features: ['Lead qualification', 'CRM integration', 'Multi-language support', '24/7 availability']
    },
    { 
      icon: Brain, 
      title: 'Voice Receptionist', 
      impact: '95% customer satisfaction', 
      demoId: 'voice',
      description: 'AI-powered voice agents that handle inbound calls, route inquiries, and provide instant support with natural conversation.',
      features: ['Natural voice interaction', 'Call routing', 'Appointment scheduling', 'Callback management']
    },
    { 
      icon: Calculator, 
      title: 'Quote Copilot', 
      impact: '-60% response time', 
      demoId: 'quote',
      description: 'Automate quote generation with AI that understands your pricing, products, and customer requirements.',
      features: ['Instant quotes', 'Custom pricing rules', 'Integration ready', 'Approval workflows']
    },
    { 
      icon: Eye, 
      title: 'RAG Knowledge Hub', 
      impact: '99% accuracy rate', 
      demoId: 'rag',
      description: 'Enterprise knowledge management powered by Retrieval Augmented Generation for accurate, context-aware responses.',
      features: ['Document ingestion', 'Semantic search', 'Source citations', 'Access control']
    },
    { 
      icon: Users, 
      title: 'Ticket Deflection', 
      impact: '-50% support load', 
      demoId: 'support',
      description: 'AI-powered self-service that resolves customer issues before they become support tickets.',
      features: ['Smart FAQ', 'Issue classification', 'Escalation logic', 'Analytics dashboard']
    },
    { 
      icon: Wrench, 
      title: 'Field Tech Copilot', 
      impact: '+30% efficiency', 
      demoId: 'fieldtech',
      description: 'Mobile AI assistant for field technicians with diagnostic support, parts lookup, and procedure guidance.',
      features: ['Visual diagnostics', 'Parts inventory', 'Work order management', 'Knowledge base']
    },
    { 
      icon: FileText, 
      title: 'Document Intelligence', 
      impact: '99% data extraction', 
      demoId: 'document',
      description: 'Extract, classify, and process documents automatically with high accuracy and compliance.',
      features: ['OCR + AI extraction', 'Document classification', 'Validation rules', 'Audit trails']
    },
    { 
      icon: BarChart3, 
      title: 'Executive KPI Copilot', 
      impact: 'Real-time insights', 
      demoId: 'kpi',
      description: 'Natural language interface to your business metrics. Ask questions, get answers, discover insights.',
      features: ['Natural language queries', 'Data visualization', 'Anomaly detection', 'Scheduled reports']
    },
    { 
      icon: Cloud, 
      title: 'SaaS AI Application Development', 
      impact: 'Custom SaaS solutions', 
      demoId: 'saas',
      description: 'Full-stack AI-powered SaaS applications built for scale, security, and performance.',
      features: ['Multi-tenant architecture', 'API-first design', 'Enterprise security', 'Scalable infrastructure']
    },
    { 
      icon: Cog, 
      title: 'Custom AI Business Automation', 
      impact: 'Tailored automation', 
      demoId: 'automation',
      description: 'End-to-end workflow automation powered by AI, custom-built for your business processes.',
      features: ['Process mapping', 'RPA integration', 'Decision automation', 'Monitoring & alerts']
    },
    { 
      icon: Headphones, 
      title: 'AI Call Center', 
      impact: '24/7 AI support', 
      demoId: 'callcenter',
      description: 'Complete AI-powered call center solution with voice, chat, and email support.',
      features: ['Omnichannel support', 'Agent assist', 'Quality monitoring', 'Performance analytics']
    },
    { 
      icon: Database, 
      title: 'CRM Development', 
      impact: 'Unified customer data', 
      demoId: 'crm',
      description: 'Custom CRM solutions with AI-powered insights, automation, and integrations.',
      features: ['360° customer view', 'AI-powered insights', 'Workflow automation', 'Third-party integrations']
    }
  ]

  const openDemo = (demoId) => {
    setSelectedDemo(demoId)
    setIsDemoModalOpen(true)
  }

  return (
    <>
      <section className="py-16 circuit-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-foreground">AI Solutions</span> That Drive Results
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From sales automation to document intelligence, our AI solutions are designed 
              to integrate seamlessly into your existing workflows and deliver measurable ROI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card 
                key={index} 
                className="glass-card hover-glow group transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 vektar-gradient rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <solution.icon className="w-7 h-7 text-white" />
                    </div>
                    <Badge className="vektar-gradient text-white border-0">
                      {solution.impact}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mt-4">{solution.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {solution.description}
                  </p>
                  
                  <div className="space-y-2">
                    {solution.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 vektar-gradient rounded-full"></div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-primary text-primary hover:bg-primary/10 mt-4"
                    onClick={() => openDemo(solution.demoId)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Try Interactive Demo
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 vektar-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            We build bespoke AI solutions tailored to your unique business challenges and workflows.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
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
