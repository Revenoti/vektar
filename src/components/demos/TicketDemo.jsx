import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Ticket, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  User, 
  Bot, 
  ArrowRight,
  TrendingDown,
  Zap,
  Target,
  AlertCircle,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react'

const TicketDemo = () => {
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [deflectionStep, setDeflectionStep] = useState(0)

  const sampleTickets = [
    {
      id: "TK-2024-0847",
      title: "Password reset not working",
      customer: "Sarah Johnson",
      email: "sarah.j@techcorp.com",
      priority: "Medium",
      category: "Account Access",
      description: "I've been trying to reset my password for the past hour but I'm not receiving the reset email. I've checked my spam folder and tried multiple times.",
      created: "2024-09-24 14:30",
      deflectable: true,
      confidence: 95,
      suggestedResponse: "This appears to be a common password reset issue. Our AI can guide the customer through alternative reset methods and troubleshooting steps.",
      resolution: {
        steps: [
          "AI identifies password reset issue from description",
          "AI checks customer account status and recent activity",
          "AI provides step-by-step troubleshooting guide",
          "AI offers alternative reset methods (SMS, security questions)",
          "Customer successfully resets password",
          "AI confirms resolution and provides security tips"
        ],
        outcome: "Resolved automatically - No human agent required"
      }
    },
    {
      id: "TK-2024-0848",
      title: "Billing question about recent charge",
      customer: "Mike Chen",
      email: "m.chen@innovatelab.com",
      priority: "Low",
      category: "Billing",
      description: "I see a charge of $299 on my account from last week but I'm not sure what it's for. Can someone explain this charge?",
      created: "2024-09-24 15:15",
      deflectable: true,
      confidence: 88,
      suggestedResponse: "This is a billing inquiry that can be resolved by providing invoice details and explaining the charge breakdown.",
      resolution: {
        steps: [
          "AI analyzes customer's billing history",
          "AI identifies the specific charge and associated services",
          "AI provides detailed invoice breakdown",
          "AI explains the services included in the charge",
          "Customer confirms understanding",
          "AI offers to email detailed invoice for records"
        ],
        outcome: "Resolved automatically - Customer satisfied"
      }
    },
    {
      id: "TK-2024-0849",
      title: "Feature request for custom integrations",
      customer: "Jennifer Davis",
      email: "j.davis@lawfirm.com",
      priority: "High",
      category: "Feature Request",
      description: "We need a custom integration with our legal case management system. This would require API development and custom workflows.",
      created: "2024-09-24 16:00",
      deflectable: false,
      confidence: 15,
      suggestedResponse: "This is a complex feature request requiring human expertise. Should be escalated to the product team.",
      resolution: {
        steps: [
          "AI analyzes request complexity",
          "AI determines this requires human expertise",
          "AI gathers additional context from customer",
          "AI creates detailed brief for human agent",
          "Ticket escalated to senior technical team",
          "AI schedules follow-up and sets expectations"
        ],
        outcome: "Escalated to human agent with full context"
      }
    }
  ]

  const deflectionSteps = [
    "Analyzing ticket content and context",
    "Checking knowledge base for similar issues",
    "Determining resolution confidence level",
    "Generating personalized response",
    "Implementing automated resolution",
    "Confirming customer satisfaction"
  ]

  const processTicketDeflection = async (ticket) => {
    setSelectedTicket(ticket)
    setIsProcessing(true)
    setDeflectionStep(0)

    // Simulate AI processing steps
    for (let i = 0; i < deflectionSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500))
      setDeflectionStep(i)
    }

    setIsProcessing(false)
  }

  const stats = {
    totalTickets: 1247,
    deflectedTickets: 934,
    deflectionRate: 74.9,
    avgResolutionTime: "2.3 minutes",
    customerSatisfaction: 92.4,
    costSavings: "$47,250"
  }

  return (
    <div className="space-y-6">
      {/* Demo Header */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Ticket className="w-5 h-5" />
            <span>Ticket Deflection System</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Watch how AI automatically resolves customer support tickets without human intervention
          </p>
        </CardHeader>
      </Card>

      {/* Statistics Dashboard */}
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.totalTickets}</div>
            <div className="text-xs text-muted-foreground">Total Tickets</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{stats.deflectedTickets}</div>
            <div className="text-xs text-muted-foreground">Auto-Resolved</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{stats.deflectionRate}%</div>
            <div className="text-xs text-muted-foreground">Deflection Rate</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-500">{stats.avgResolutionTime}</div>
            <div className="text-xs text-muted-foreground">Avg Resolution</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500">{stats.customerSatisfaction}%</div>
            <div className="text-xs text-muted-foreground">Satisfaction</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.costSavings}</div>
            <div className="text-xs text-muted-foreground">Monthly Savings</div>
          </CardContent>
        </Card>
      </div>

      {/* Ticket Queue */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Incoming Support Tickets</CardTitle>
          <p className="text-muted-foreground">
            Click on any ticket to see the AI deflection process in action
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {sampleTickets.map((ticket) => (
            <Card 
              key={ticket.id}
              className={`border border-border hover:border-primary/50 transition-colors cursor-pointer ${
                selectedTicket?.id === ticket.id ? 'border-primary bg-primary/5' : ''
              }`}
              onClick={() => processTicketDeflection(ticket)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {ticket.id}
                      </Badge>
                      <Badge variant={ticket.priority === 'High' ? 'destructive' : ticket.priority === 'Medium' ? 'default' : 'secondary'}>
                        {ticket.priority}
                      </Badge>
                      <Badge variant="outline">
                        {ticket.category}
                      </Badge>
                      {ticket.deflectable ? (
                        <Badge variant="default" className="bg-green-500">
                          <Bot className="w-3 h-3 mr-1" />
                          AI Deflectable
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <User className="w-3 h-3 mr-1" />
                          Human Required
                        </Badge>
                      )}
                    </div>
                    <h4 className="font-semibold mb-1">{ticket.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {ticket.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {ticket.customer}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {ticket.created}
                      </span>
                      {ticket.deflectable && (
                        <span className="flex items-center text-green-600">
                          <Target className="w-3 h-3 mr-1" />
                          {ticket.confidence}% confidence
                        </span>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Process Ticket
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Processing View */}
      {selectedTicket && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>AI Processing: {selectedTicket.id}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Processing Steps */}
            {isProcessing && (
              <div>
                <h4 className="font-semibold mb-4">AI Analysis in Progress</h4>
                <div className="space-y-3">
                  {deflectionSteps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        index < deflectionStep ? 'bg-green-500 text-white' :
                        index === deflectionStep ? 'bg-primary text-white animate-pulse' :
                        'bg-secondary text-muted-foreground'
                      }`}>
                        {index < deflectionStep ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <span className="text-xs">{index + 1}</span>
                        )}
                      </div>
                      <span className={`text-sm ${
                        index <= deflectionStep ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resolution Process */}
            {!isProcessing && (
              <div className="space-y-4">
                <div className="bg-secondary/30 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">AI Assessment</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {selectedTicket.suggestedResponse}
                  </p>
                  <div className="flex items-center space-x-4">
                    <Badge variant={selectedTicket.deflectable ? "default" : "secondary"}>
                      {selectedTicket.deflectable ? "Auto-Resolvable" : "Requires Human"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Confidence: {selectedTicket.confidence}%
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Resolution Process</h4>
                  <div className="space-y-2">
                    {selectedTicket.resolution.steps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-sm">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <h4 className="font-semibold text-green-700 dark:text-green-300">
                      Resolution Complete
                    </h4>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    {selectedTicket.resolution.outcome}
                  </p>
                </div>

                {/* Customer Feedback Simulation */}
                <div className="bg-secondary/20 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Customer Feedback</h4>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <ThumbsUp className="w-5 h-5 text-green-500" />
                      <span className="text-sm">Issue resolved quickly</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Rating:</span>
                      <div className="flex space-x-1">
                        {[1,2,3,4,5].map(star => (
                          <div key={star} className="w-4 h-4 bg-yellow-400 rounded-sm"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Benefits Summary */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Deflection Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Cost Reduction</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Agent time saved</span>
                  <span className="text-sm font-medium">156 hours/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Cost per ticket</span>
                  <span className="text-sm font-medium">$15 → $2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Monthly savings</span>
                  <span className="text-sm font-medium text-green-600">$47,250</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Performance Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Resolution time</span>
                  <span className="text-sm font-medium">2.3 minutes avg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">First contact resolution</span>
                  <span className="text-sm font-medium">89.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Customer satisfaction</span>
                  <span className="text-sm font-medium text-green-600">92.4%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TicketDemo
