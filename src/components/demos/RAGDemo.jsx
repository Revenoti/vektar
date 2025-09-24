import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Search, 
  FileText, 
  Brain, 
  Zap, 
  CheckCircle, 
  ExternalLink,
  Database,
  Clock,
  Target
} from 'lucide-react'

const RAGDemo = () => {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResult, setSearchResult] = useState(null)
  const [selectedDocument, setSelectedDocument] = useState(null)

  const knowledgeBase = [
    {
      id: 1,
      title: "AI Implementation Best Practices",
      type: "Guide",
      content: "Our comprehensive guide covers the essential steps for successful AI implementation, including data preparation, model selection, testing protocols, and deployment strategies. Key considerations include ensuring data quality, establishing clear success metrics, and planning for scalability.",
      tags: ["AI", "Implementation", "Best Practices"],
      lastUpdated: "2024-09-20",
      relevance: 95
    },
    {
      id: 2,
      title: "ROI Calculation for AI Projects",
      type: "Methodology",
      content: "Calculate the return on investment for AI initiatives using our proven framework. This includes measuring cost savings from automation, revenue increases from improved customer experience, and efficiency gains from streamlined processes. Typical ROI ranges from 300-500% within the first year.",
      tags: ["ROI", "Finance", "Metrics"],
      lastUpdated: "2024-09-18",
      relevance: 88
    },
    {
      id: 3,
      title: "Chatbot Integration Technical Specs",
      type: "Documentation",
      content: "Technical specifications for integrating AI chatbots with existing systems. Covers API endpoints, webhook configurations, authentication methods, and data flow diagrams. Includes code examples for popular platforms like Salesforce, HubSpot, and custom CRM systems.",
      tags: ["Chatbot", "Integration", "Technical"],
      lastUpdated: "2024-09-22",
      relevance: 92
    },
    {
      id: 4,
      title: "Data Privacy and AI Compliance",
      type: "Policy",
      content: "Comprehensive overview of data privacy requirements for AI systems, including GDPR compliance, PII handling, data retention policies, and audit trail requirements. Covers both technical and legal aspects of maintaining compliant AI operations.",
      tags: ["Privacy", "Compliance", "GDPR"],
      lastUpdated: "2024-09-15",
      relevance: 85
    },
    {
      id: 5,
      title: "Voice AI Performance Metrics",
      type: "Analytics",
      content: "Key performance indicators for voice AI systems including response accuracy, conversation completion rates, customer satisfaction scores, and technical metrics like latency and uptime. Includes benchmarking data and optimization strategies.",
      tags: ["Voice AI", "Metrics", "Performance"],
      lastUpdated: "2024-09-19",
      relevance: 90
    }
  ]

  const sampleQueries = [
    "How do I calculate ROI for AI projects?",
    "What are the best practices for AI implementation?",
    "How do I integrate a chatbot with my CRM?",
    "What are the data privacy requirements for AI?",
    "How do I measure voice AI performance?"
  ]

  const searchKnowledgeBase = (searchQuery) => {
    const lowerQuery = searchQuery.toLowerCase()
    
    // Simple keyword matching for demo purposes
    const results = knowledgeBase.filter(doc => 
      doc.title.toLowerCase().includes(lowerQuery) ||
      doc.content.toLowerCase().includes(lowerQuery) ||
      doc.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    ).sort((a, b) => b.relevance - a.relevance)

    return results.length > 0 ? results : knowledgeBase.slice(0, 3)
  }

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsSearching(true)
    setSearchResult(null)

    // Simulate AI processing time
    setTimeout(() => {
      const results = searchKnowledgeBase(query)
      const topResult = results[0]
      
      setSearchResult({
        query: query,
        answer: generateAnswer(query, topResult),
        sources: results.slice(0, 3),
        confidence: Math.floor(Math.random() * 10) + 90, // 90-99%
        processingTime: (Math.random() * 0.5 + 0.2).toFixed(2) // 0.2-0.7s
      })
      setIsSearching(false)
    }, 800 + Math.random() * 400)
  }

  const generateAnswer = (query, topDoc) => {
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes('roi') || lowerQuery.includes('return')) {
      return "To calculate ROI for AI projects, use our proven framework that measures cost savings from automation, revenue increases from improved customer experience, and efficiency gains. Typical ROI ranges from 300-500% within the first year. The calculation includes initial implementation costs, ongoing operational expenses, and quantified benefits across multiple business metrics."
    }
    
    if (lowerQuery.includes('best practice') || lowerQuery.includes('implement')) {
      return "AI implementation best practices include: 1) Start with clear business objectives and success metrics, 2) Ensure high-quality, clean data preparation, 3) Begin with pilot projects to prove value, 4) Plan for scalability from day one, 5) Establish proper monitoring and governance, and 6) Provide adequate training for your team. Focus on solving specific business problems rather than implementing AI for its own sake."
    }
    
    if (lowerQuery.includes('chatbot') || lowerQuery.includes('integrat')) {
      return "Chatbot integration involves connecting your AI assistant to existing systems via APIs and webhooks. Key steps include: configuring authentication, setting up data flow between the chatbot and your CRM, implementing conversation logging, and establishing escalation rules. We provide pre-built connectors for Salesforce, HubSpot, and other popular platforms, plus custom integration options."
    }
    
    if (lowerQuery.includes('privacy') || lowerQuery.includes('compliance') || lowerQuery.includes('gdpr')) {
      return "AI systems must comply with data privacy regulations including GDPR, CCPA, and industry-specific requirements. Key considerations include: PII detection and redaction, data minimization principles, user consent management, audit trail maintenance, and secure data storage. Our AI solutions include built-in privacy controls and compliance monitoring features."
    }
    
    if (lowerQuery.includes('voice') || lowerQuery.includes('performance') || lowerQuery.includes('metric')) {
      return "Voice AI performance is measured through several key metrics: response accuracy (target: >95%), conversation completion rate (target: >85%), average response time (target: <0.5s), customer satisfaction scores, and technical uptime (target: 99.9%). We provide real-time dashboards and automated reporting to track these metrics continuously."
    }
    
    // Default response using the top document
    return topDoc.content.substring(0, 300) + "... This information is based on our latest documentation and has been verified for accuracy."
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Interface */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5" />
            <span>RAG Knowledge Hub</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Ask questions about our AI solutions and get instant, accurate answers from our knowledge base
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything about our AI solutions..."
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isSearching}
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={!query.trim() || isSearching}
              className="vectorik-gradient hover-glow px-6"
            >
              {isSearching ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>

          {/* Sample Queries */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Try these sample questions:</p>
            <div className="flex flex-wrap gap-2">
              {sampleQueries.map((sampleQuery, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs h-8"
                  onClick={() => setQuery(sampleQuery)}
                >
                  {sampleQuery}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResult && (
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>AI Answer</span>
              </CardTitle>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Target className="w-4 h-4 mr-1" />
                  {searchResult.confidence}% confidence
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {searchResult.processingTime}s
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="font-medium text-sm text-muted-foreground mb-2">
                Query: "{searchResult.query}"
              </p>
              <p className="text-foreground leading-relaxed">
                {searchResult.answer}
              </p>
            </div>

            {/* Source Documents */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <Database className="w-4 h-4 mr-2" />
                Source Documents
              </h4>
              <div className="grid gap-3">
                {searchResult.sources.map((doc, index) => (
                  <Card 
                    key={doc.id} 
                    className="border border-border hover:border-primary/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedDocument(doc)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <FileText className="w-4 h-4 text-primary" />
                            <h5 className="font-medium">{doc.title}</h5>
                            <Badge variant="secondary" className="text-xs">
                              {doc.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {doc.content.substring(0, 120)}...
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>Relevance: {doc.relevance}%</span>
                            <span>Updated: {doc.lastUpdated}</span>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Document Viewer */}
      {selectedDocument && (
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>{selectedDocument.title}</span>
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedDocument(null)}
              >
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <Badge variant="secondary">{selectedDocument.type}</Badge>
              <span>Last updated: {selectedDocument.lastUpdated}</span>
              <span>Relevance: {selectedDocument.relevance}%</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {selectedDocument.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="bg-secondary/30 rounded-lg p-4">
              <p className="leading-relaxed">{selectedDocument.content}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Knowledge Base Stats */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <h4 className="font-semibold mb-4">Knowledge Base Statistics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">2,847</div>
              <div className="text-xs text-muted-foreground">Documents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">99.2%</div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">0.3s</div>
              <div className="text-xs text-muted-foreground">Avg Response</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">24/7</div>
              <div className="text-xs text-muted-foreground">Availability</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RAGDemo
