import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Cloud, 
  Code, 
  Database, 
  Shield, 
  Zap, 
  Globe, 
  Smartphone,
  CheckCircle,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Layers,
  Server,
  Lock,
  BarChart3,
  Users
} from 'lucide-react'

const SaaSDemo = () => {
  const [selectedFeatures, setSelectedFeatures] = useState([])
  const [activeTab, setActiveTab] = useState('features')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedApp, setGeneratedApp] = useState(null)

  const aiFeatures = [
    { id: 'chatbot', name: 'AI Chatbot', description: 'Natural language customer support', price: 500, icon: Sparkles },
    { id: 'analytics', name: 'Smart Analytics', description: 'AI-powered business insights', price: 400, icon: BarChart3 },
    { id: 'automation', name: 'Workflow Automation', description: 'Intelligent process automation', price: 600, icon: Zap },
    { id: 'nlp', name: 'NLP Processing', description: 'Text analysis & extraction', price: 700, icon: Code },
    { id: 'predictions', name: 'Predictive Models', description: 'ML-based forecasting', price: 800, icon: Globe },
    { id: 'multiuser', name: 'Multi-tenant', description: 'User management & roles', price: 300, icon: Users }
  ]

  const techStack = [
    { name: 'React', category: 'Frontend', selected: true },
    { name: 'Node.js', category: 'Backend', selected: true },
    { name: 'PostgreSQL', category: 'Database', selected: true },
    { name: 'AWS', category: 'Cloud', selected: true },
    { name: 'OpenAI', category: 'AI', selected: true },
    { name: 'Stripe', category: 'Payments', selected: false }
  ]

  const deploymentPhases = [
    { phase: 'Discovery', duration: '1-2 weeks', status: 'complete', description: 'Requirements & architecture planning' },
    { phase: 'Development', duration: '4-8 weeks', status: 'active', description: 'Core application development' },
    { phase: 'AI Integration', duration: '2-3 weeks', status: 'pending', description: 'AI model training & integration' },
    { phase: 'Testing', duration: '1-2 weeks', status: 'pending', description: 'QA, security & performance testing' },
    { phase: 'Deployment', duration: '1 week', status: 'pending', description: 'Production deployment & monitoring' }
  ]

  const toggleFeature = (featureId) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    )
  }

  const calculateTotal = () => {
    const basePrice = 5000
    const featuresCost = selectedFeatures.reduce((sum, id) => {
      const feature = aiFeatures.find(f => f.id === id)
      return sum + (feature?.price || 0)
    }, 0)
    return basePrice + featuresCost
  }

  const calculateMonthly = () => {
    return Math.round(calculateTotal() / 12)
  }

  const generateApp = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setGeneratedApp({
        name: 'AI-Powered SaaS Platform',
        features: selectedFeatures.length,
        estimatedUsers: '1,000-10,000',
        scalability: 'Enterprise-ready',
        security: 'SOC 2 Compliant'
      })
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">SaaS AI Application Builder</h3>
        <p className="text-muted-foreground">
          Configure your custom AI-powered SaaS application in minutes
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {['features', 'architecture', 'timeline', 'pricing'].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? 'vektar-gradient' : ''}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>

      {/* Features Tab */}
      {activeTab === 'features' && (
        <div className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span>Select AI Capabilities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {aiFeatures.map((feature) => {
                  const isSelected = selectedFeatures.includes(feature.id)
                  return (
                    <div
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        isSelected 
                          ? 'border-primary bg-primary/10 shadow-lg' 
                          : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-primary text-white' : 'bg-secondary'
                        }`}>
                          <feature.icon className="w-5 h-5" />
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'
                        }`}>
                          {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                      <h4 className="font-semibold mb-1">{feature.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{feature.description}</p>
                      <Badge variant="secondary">+${feature.price}/mo</Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button 
              onClick={generateApp} 
              className="vektar-gradient hover-glow"
              disabled={selectedFeatures.length === 0 || isGenerating}
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Application
                </>
              )}
            </Button>
          </div>

          {generatedApp && (
            <Card className="glass-card border-primary/50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center">
                    <Cloud className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{generatedApp.name}</h4>
                    <Badge className="vektar-gradient">AI-Powered</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-secondary/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{generatedApp.features}</div>
                    <div className="text-xs text-muted-foreground">AI Features</div>
                  </div>
                  <div className="text-center p-3 bg-secondary/30 rounded-lg">
                    <div className="text-2xl font-bold text-green-500">{generatedApp.estimatedUsers}</div>
                    <div className="text-xs text-muted-foreground">Est. Users</div>
                  </div>
                  <div className="text-center p-3 bg-secondary/30 rounded-lg">
                    <div className="text-2xl font-bold text-blue-500">✓</div>
                    <div className="text-xs text-muted-foreground">{generatedApp.scalability}</div>
                  </div>
                  <div className="text-center p-3 bg-secondary/30 rounded-lg">
                    <div className="text-2xl font-bold text-purple-500">🔒</div>
                    <div className="text-xs text-muted-foreground">{generatedApp.security}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Architecture Tab */}
      {activeTab === 'architecture' && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-primary" />
              <span>Tech Stack Architecture</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Frontend */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="font-semibold">Frontend</span>
                </div>
                <div className="space-y-2">
                  {['React 18', 'TypeScript', 'Tailwind CSS', 'Next.js'].map((tech) => (
                    <div key={tech} className="flex items-center space-x-2 p-2 bg-secondary/30 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Server className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="font-semibold">Backend</span>
                </div>
                <div className="space-y-2">
                  {['Node.js', 'Express', 'GraphQL', 'Redis Cache'].map((tech) => (
                    <div key={tech} className="flex items-center space-x-2 p-2 bg-secondary/30 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI/Cloud */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                  </div>
                  <span className="font-semibold">AI & Cloud</span>
                </div>
                <div className="space-y-2">
                  {['OpenAI GPT-4', 'AWS Lambda', 'PostgreSQL', 'Stripe API'].map((tech) => (
                    <div key={tech} className="flex items-center space-x-2 p-2 bg-secondary/30 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Architecture Diagram */}
            <div className="mt-6 p-4 bg-secondary/20 rounded-xl">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-8 h-8 text-blue-500" />
                  <span className="text-sm">Users</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                <div className="flex items-center space-x-2">
                  <Globe className="w-8 h-8 text-green-500" />
                  <span className="text-sm">CDN</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                <div className="flex items-center space-x-2">
                  <Server className="w-8 h-8 text-purple-500" />
                  <span className="text-sm">API</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-8 h-8 text-yellow-500" />
                  <span className="text-sm">AI Engine</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                <div className="flex items-center space-x-2">
                  <Database className="w-8 h-8 text-cyan-500" />
                  <span className="text-sm">Database</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Timeline Tab */}
      {activeTab === 'timeline' && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-primary" />
              <span>Development Timeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deploymentPhases.map((phase, index) => (
                <div key={phase.phase} className="flex items-start space-x-4">
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      phase.status === 'complete' ? 'bg-green-500' :
                      phase.status === 'active' ? 'bg-primary animate-pulse' : 'bg-secondary'
                    }`}>
                      {phase.status === 'complete' ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-white font-bold">{index + 1}</span>
                      )}
                    </div>
                    {index < deploymentPhases.length - 1 && (
                      <div className={`absolute left-5 top-10 w-0.5 h-16 ${
                        phase.status === 'complete' ? 'bg-green-500' : 'bg-border'
                      }`} />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold">{phase.phase}</h4>
                      <Badge variant={
                        phase.status === 'complete' ? 'default' :
                        phase.status === 'active' ? 'secondary' : 'outline'
                      }>
                        {phase.duration}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{phase.description}</p>
                    {phase.status === 'active' && (
                      <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-gradient-to-r from-primary to-accent animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pricing Tab */}
      {activeTab === 'pricing' && (
        <div className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span>Investment Calculator</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Selected Features</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between p-3 bg-secondary/30 rounded-lg">
                      <span>Base Platform</span>
                      <span className="font-semibold">$5,000/mo</span>
                    </div>
                    {selectedFeatures.map(id => {
                      const feature = aiFeatures.find(f => f.id === id)
                      return feature ? (
                        <div key={id} className="flex justify-between p-3 bg-secondary/30 rounded-lg">
                          <span>{feature.name}</span>
                          <span className="font-semibold">+${feature.price}/mo</span>
                        </div>
                      ) : null
                    })}
                  </div>
                </div>
                <div>
                  <div className="h-full flex flex-col justify-center items-center p-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl">
                    <span className="text-muted-foreground mb-2">Total Investment</span>
                    <span className="text-5xl font-bold vektar-gradient-text">
                      ${calculateTotal().toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                    <div className="mt-4 text-center">
                      <Badge className="vektar-gradient">Save 20% with annual billing</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <h4 className="font-semibold mb-4">What's Included</h4>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { icon: Shield, text: 'Enterprise Security' },
                  { icon: Server, text: '99.9% Uptime SLA' },
                  { icon: Users, text: 'Unlimited Users' },
                  { icon: Lock, text: 'SOC 2 Compliant' },
                  { icon: Zap, text: '24/7 Support' },
                  { icon: Globe, text: 'Global CDN' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2 p-3 bg-secondary/30 rounded-lg">
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default SaaSDemo
