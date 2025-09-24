import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Calculator, 
  Clock, 
  CheckCircle, 
  FileText, 
  DollarSign, 
  User, 
  Building, 
  Zap,
  Download,
  Send,
  Edit,
  Copy
} from 'lucide-react'

const QuoteDemo = () => {
  const [selectedQuoteType, setSelectedQuoteType] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedQuote, setGeneratedQuote] = useState(null)
  const [quoteInputs, setQuoteInputs] = useState({
    projectType: '',
    complexity: '',
    timeline: '',
    features: []
  })

  const quoteTypes = [
    {
      id: 'ai-chatbot',
      title: 'AI Sales Chatbot',
      description: 'Intelligent conversational AI for lead generation and customer support',
      basePrice: 8500,
      features: ['Natural language processing', 'CRM integration', 'Multi-language support', '24/7 availability'],
      complexity: ['Basic', 'Advanced', 'Enterprise'],
      timeline: ['2-4 weeks', '4-6 weeks', '6-8 weeks']
    },
    {
      id: 'voice-receptionist',
      title: 'Voice Receptionist',
      description: 'AI-powered voice agent for phone calls and appointment booking',
      basePrice: 12000,
      features: ['Voice synthesis', 'Call routing', 'Appointment scheduling', 'CRM integration'],
      complexity: ['Standard', 'Advanced', 'Enterprise'],
      timeline: ['3-5 weeks', '5-7 weeks', '7-10 weeks']
    },
    {
      id: 'document-intelligence',
      title: 'Document Intelligence',
      description: 'Automated document processing and data extraction system',
      basePrice: 15000,
      features: ['OCR processing', 'Data extraction', 'Workflow automation', 'API integration'],
      complexity: ['Basic', 'Advanced', 'Enterprise'],
      timeline: ['4-6 weeks', '6-8 weeks', '8-12 weeks']
    },
    {
      id: 'rag-system',
      title: 'RAG Knowledge Hub',
      description: 'Intelligent knowledge base with semantic search and Q&A',
      basePrice: 18000,
      features: ['Document ingestion', 'Semantic search', 'Q&A system', 'Source attribution'],
      complexity: ['Standard', 'Advanced', 'Enterprise'],
      timeline: ['4-6 weeks', '6-8 weeks', '8-12 weeks']
    }
  ]

  const generateQuote = async () => {
    setIsGenerating(true)
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000))
    
    const selectedType = quoteTypes.find(type => type.id === selectedQuoteType)
    const complexityMultiplier = quoteInputs.complexity === 'Enterprise' ? 2.5 : 
                                 quoteInputs.complexity === 'Advanced' ? 1.8 : 1.2
    
    const basePrice = selectedType.basePrice * complexityMultiplier
    const additionalFeatures = quoteInputs.features.length * 2500
    const totalPrice = basePrice + additionalFeatures
    
    const quote = {
      id: `QT-${Date.now()}`,
      projectType: selectedType.title,
      complexity: quoteInputs.complexity,
      timeline: selectedType.timeline[quoteInputs.complexity === 'Enterprise' ? 2 : 
                                      quoteInputs.complexity === 'Advanced' ? 1 : 0],
      basePrice: basePrice,
      additionalFeatures: additionalFeatures,
      totalPrice: totalPrice,
      features: [...selectedType.features, ...quoteInputs.features],
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      generatedAt: new Date().toLocaleString(),
      savings: Math.floor(totalPrice * 0.15), // 15% savings vs traditional development
      roi: Math.floor(totalPrice * 3.2) // 320% ROI estimate
    }
    
    setGeneratedQuote(quote)
    setIsGenerating(false)
  }

  const handleInputChange = (field, value) => {
    setQuoteInputs(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const toggleFeature = (feature) => {
    setQuoteInputs(prev => ({
      ...prev,
      features: prev.features.includes(feature) 
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  const additionalFeatures = [
    'Advanced Analytics Dashboard',
    'Custom Branding & White-label',
    'Multi-language Support',
    'Advanced Security Features',
    'Custom Integrations',
    'Priority Support & Training',
    'Mobile App Integration',
    'Advanced Reporting'
  ]

  const resetQuote = () => {
    setSelectedQuoteType(null)
    setGeneratedQuote(null)
    setQuoteInputs({
      projectType: '',
      complexity: '',
      timeline: '',
      features: []
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="w-5 h-5" />
            <span>Quote Copilot Demo</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Experience how our AI generates accurate project quotes in seconds, not hours
          </p>
        </CardHeader>
      </Card>

      {!selectedQuoteType ? (
        /* Project Type Selection */
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Select Your Project Type</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {quoteTypes.map((type) => (
              <Card 
                key={type.id}
                className="glass-card hover-glow cursor-pointer transition-all duration-300"
                onClick={() => setSelectedQuoteType(type.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-lg">{type.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {type.description}
                      </p>
                    </div>
                    <Badge variant="secondary">
                      From ${type.basePrice.toLocaleString()}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Includes:</p>
                    {type.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 vectorik-gradient hover-glow">
                    Get Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : !generatedQuote ? (
        /* Quote Configuration */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={resetQuote}>
              ← Back to Project Types
            </Button>
            <h3 className="text-xl font-semibold">
              Configure Your {quoteTypes.find(t => t.id === selectedQuoteType)?.title}
            </h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Configuration Form */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Project Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Complexity Selection */}
                <div>
                  <label className="block text-sm font-medium mb-3">Project Complexity</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Basic', 'Advanced', 'Enterprise'].map((complexity) => (
                      <Button
                        key={complexity}
                        variant={quoteInputs.complexity === complexity ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleInputChange('complexity', complexity)}
                      >
                        {complexity}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Additional Features */}
                <div>
                  <label className="block text-sm font-medium mb-3">Additional Features</label>
                  <div className="grid grid-cols-2 gap-2">
                    {additionalFeatures.map((feature) => (
                      <Button
                        key={feature}
                        variant={quoteInputs.features.includes(feature) ? "default" : "outline"}
                        size="sm"
                        className="text-xs h-8 justify-start"
                        onClick={() => toggleFeature(feature)}
                      >
                        {feature}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={generateQuote}
                  disabled={!quoteInputs.complexity || isGenerating}
                  className="w-full vectorik-gradient hover-glow"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Generating Quote...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Generate AI Quote
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Live Preview */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Quote Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quoteInputs.complexity ? (
                  <div className="space-y-4">
                    <div className="bg-secondary/30 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Project Overview</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Project Type:</span>
                          <span className="font-medium">
                            {quoteTypes.find(t => t.id === selectedQuoteType)?.title}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Complexity:</span>
                          <span className="font-medium">{quoteInputs.complexity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Additional Features:</span>
                          <span className="font-medium">{quoteInputs.features.length}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-primary/10 rounded-lg p-4">
                      <p className="text-sm text-center">
                        💡 Click "Generate AI Quote" to see detailed pricing and timeline
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calculator className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Select project complexity to see live preview
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* Generated Quote */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={resetQuote}>
              ← Generate New Quote
            </Button>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="font-semibold">Quote Generated Successfully</span>
            </div>
          </div>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Project Quote #{generatedQuote.id}</CardTitle>
                <Badge variant="default">Valid until {generatedQuote.validUntil}</Badge>
              </div>
              <p className="text-muted-foreground">
                Generated on {generatedQuote.generatedAt}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Project Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Project Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{generatedQuote.projectType}</p>
                        <p className="text-sm text-muted-foreground">{generatedQuote.complexity} Implementation</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Timeline: {generatedQuote.timeline}</p>
                        <p className="text-sm text-muted-foreground">Including testing & deployment</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Investment Breakdown</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Base Implementation:</span>
                      <span className="font-medium">${generatedQuote.basePrice.toLocaleString()}</span>
                    </div>
                    {generatedQuote.additionalFeatures > 0 && (
                      <div className="flex justify-between">
                        <span>Additional Features:</span>
                        <span className="font-medium">${generatedQuote.additionalFeatures.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="border-t border-border pt-2">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Investment:</span>
                        <span className="text-primary">${generatedQuote.totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Included */}
              <div>
                <h4 className="font-semibold mb-3">Features Included</h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {generatedQuote.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ROI Analysis */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">ROI Analysis</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">${generatedQuote.savings.toLocaleString()}</div>
                    <div className="text-sm text-green-600">Monthly Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">${generatedQuote.roi.toLocaleString()}</div>
                    <div className="text-sm text-green-600">Annual Value</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">320%</div>
                    <div className="text-sm text-green-600">ROI (Year 1)</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <Button className="vectorik-gradient hover-glow">
                  <Send className="w-4 h-4 mr-2" />
                  Send Quote
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Customize
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quote Statistics */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <h4 className="font-semibold mb-4">Quote Generation Statistics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2.3s</div>
                  <div className="text-xs text-muted-foreground">Generation Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">94%</div>
                  <div className="text-xs text-muted-foreground">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">-60%</div>
                  <div className="text-xs text-muted-foreground">Time Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">+40%</div>
                  <div className="text-xs text-muted-foreground">Close Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default QuoteDemo
