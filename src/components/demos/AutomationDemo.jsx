import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Cog, 
  Play, 
  Pause, 
  RotateCcw,
  ArrowRight,
  CheckCircle,
  Clock,
  Zap,
  Mail,
  MessageSquare,
  Database,
  FileText,
  Users,
  Bell,
  GitBranch,
  Bot
} from 'lucide-react'

const AutomationDemo = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(-1)
  const [completedSteps, setCompletedSteps] = useState([])
  const [selectedWorkflow, setSelectedWorkflow] = useState(null)
  const [stats, setStats] = useState({ tasksAutomated: 0, timeSaved: 0, efficiency: 0 })

  const workflows = [
    {
      id: 'lead',
      name: 'Lead Qualification',
      description: 'Automatically qualify and route incoming leads',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      steps: [
        { name: 'New Lead', icon: Users, description: 'Lead captured from website form', duration: 1000 },
        { name: 'AI Analysis', icon: Bot, description: 'Analyzing lead data with ML model', duration: 1500 },
        { name: 'Score Lead', icon: Zap, description: 'Calculating lead score: 87/100', duration: 1000 },
        { name: 'Enrich Data', icon: Database, description: 'Pulling company data from LinkedIn', duration: 1200 },
        { name: 'Route to Sales', icon: ArrowRight, description: 'Assigning to top performer John', duration: 800 },
        { name: 'Send Email', icon: Mail, description: 'Personalized follow-up email sent', duration: 1000 },
        { name: 'Notify Team', icon: Bell, description: 'Slack notification sent to sales team', duration: 600 }
      ]
    },
    {
      id: 'support',
      name: 'Support Ticket',
      description: 'AI-powered ticket routing and resolution',
      icon: MessageSquare,
      color: 'from-purple-500 to-pink-500',
      steps: [
        { name: 'Ticket Created', icon: FileText, description: 'Support ticket received', duration: 800 },
        { name: 'NLP Analysis', icon: Bot, description: 'Analyzing ticket content', duration: 1500 },
        { name: 'Categorize', icon: GitBranch, description: 'Category: Billing Issue', duration: 1000 },
        { name: 'Priority Set', icon: Zap, description: 'Priority: High (Paying customer)', duration: 800 },
        { name: 'Auto Response', icon: Mail, description: 'AI-generated response sent', duration: 1200 },
        { name: 'Escalate', icon: Users, description: 'Escalated to billing team', duration: 600 }
      ]
    },
    {
      id: 'invoice',
      name: 'Invoice Processing',
      description: 'Automated invoice extraction and approval',
      icon: FileText,
      color: 'from-green-500 to-emerald-500',
      steps: [
        { name: 'Invoice Received', icon: Mail, description: 'New invoice email detected', duration: 800 },
        { name: 'OCR Extraction', icon: Bot, description: 'Extracting data from PDF', duration: 2000 },
        { name: 'Validate Data', icon: CheckCircle, description: 'Verifying vendor and amounts', duration: 1200 },
        { name: 'Match PO', icon: Database, description: 'Matching to Purchase Order #4521', duration: 1000 },
        { name: 'Route Approval', icon: Users, description: 'Sent to manager for approval', duration: 800 },
        { name: 'Update ERP', icon: Database, description: 'Synced to accounting system', duration: 600 }
      ]
    }
  ]

  useEffect(() => {
    let interval
    if (isRunning && selectedWorkflow && currentStep < selectedWorkflow.steps.length - 1) {
      const step = selectedWorkflow.steps[currentStep + 1]
      interval = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
        setCompletedSteps(prev => [...prev, currentStep + 1])
        setStats(prev => ({
          tasksAutomated: prev.tasksAutomated + 1,
          timeSaved: prev.timeSaved + Math.floor(Math.random() * 5) + 2,
          efficiency: Math.min(99, prev.efficiency + Math.floor(Math.random() * 10) + 5)
        }))
      }, step?.duration || 1000)
    } else if (currentStep >= selectedWorkflow?.steps.length - 1) {
      setIsRunning(false)
    }
    return () => clearTimeout(interval)
  }, [isRunning, currentStep, selectedWorkflow])

  const startWorkflow = (workflow) => {
    setSelectedWorkflow(workflow)
    setCurrentStep(-1)
    setCompletedSteps([])
    setIsRunning(true)
  }

  const resetDemo = () => {
    setIsRunning(false)
    setCurrentStep(-1)
    setCompletedSteps([])
    setSelectedWorkflow(null)
    setStats({ tasksAutomated: 0, timeSaved: 0, efficiency: 0 })
  }

  const togglePause = () => {
    setIsRunning(!isRunning)
  }

  if (!selectedWorkflow) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold mb-2">AI Business Automation</h3>
          <p className="text-muted-foreground">
            Watch intelligent workflows automate your business processes in real-time
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {workflows.map((workflow) => (
            <Card 
              key={workflow.id} 
              className="glass-card hover-glow cursor-pointer group transition-all duration-300"
              onClick={() => startWorkflow(workflow)}
            >
              <CardContent className="p-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${workflow.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <workflow.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-2">{workflow.name}</h4>
                <p className="text-sm text-muted-foreground mb-4">{workflow.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{workflow.steps.length} steps</Badge>
                  <div className="flex items-center text-primary text-sm">
                    <Play className="w-4 h-4 mr-1" />
                    Run Demo
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="glass-card">
          <CardContent className="p-6">
            <h4 className="font-semibold mb-4">Automation Capabilities</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Bot, label: 'AI Decision Making', desc: 'Smart routing & prioritization' },
                { icon: Zap, label: 'Instant Triggers', desc: 'Real-time event processing' },
                { icon: GitBranch, label: 'Conditional Logic', desc: 'Complex branching workflows' },
                { icon: Database, label: '200+ Integrations', desc: 'Connect any business tool' }
              ].map((cap, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 bg-secondary/30 rounded-lg">
                  <cap.icon className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">{cap.label}</div>
                    <div className="text-xs text-muted-foreground">{cap.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedWorkflow.color} flex items-center justify-center`}>
            <selectedWorkflow.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{selectedWorkflow.name}</h3>
            <p className="text-sm text-muted-foreground">{selectedWorkflow.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={togglePause}>
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button variant="outline" size="sm" onClick={resetDemo}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">{stats.tasksAutomated}</div>
            <div className="text-sm text-muted-foreground">Tasks Automated</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-green-500">{stats.timeSaved}m</div>
            <div className="text-sm text-muted-foreground">Time Saved</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-blue-500">{stats.efficiency}%</div>
            <div className="text-sm text-muted-foreground">Efficiency Gain</div>
          </CardContent>
        </Card>
      </div>

      {/* Workflow Visualization */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GitBranch className="w-5 h-5 text-primary" />
            <span>Live Workflow Execution</span>
            {isRunning && (
              <Badge className="animate-pulse bg-green-500 text-white">Running</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Connection Lines */}
            <div className="absolute top-8 left-8 right-8 h-0.5 bg-border">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${(completedSteps.length / selectedWorkflow.steps.length) * 100}%` }}
              />
            </div>

            {/* Steps */}
            <div className="flex justify-between relative z-10">
              {selectedWorkflow.steps.map((step, index) => {
                const isCompleted = completedSteps.includes(index)
                const isCurrent = index === currentStep
                const isPending = index > currentStep

                return (
                  <div key={index} className="flex flex-col items-center" style={{ width: `${100 / selectedWorkflow.steps.length}%` }}>
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-500 ${
                      isCompleted ? 'bg-green-500 scale-110' :
                      isCurrent ? `bg-gradient-to-br ${selectedWorkflow.color} animate-pulse scale-125` :
                      'bg-secondary'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-8 h-8 text-white" />
                      ) : (
                        <step.icon className={`w-6 h-6 ${isCurrent ? 'text-white' : 'text-muted-foreground'}`} />
                      )}
                    </div>
                    <div className="mt-3 text-center">
                      <div className={`text-xs font-medium ${isCurrent ? 'text-primary' : ''}`}>
                        {step.name}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Current Step Details */}
          {currentStep >= 0 && (
            <div className="mt-8 p-4 bg-secondary/30 rounded-xl animate-in fade-in-0 slide-in-from-bottom-2">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selectedWorkflow.color} flex items-center justify-center`}>
                  {React.createElement(selectedWorkflow.steps[currentStep].icon, { className: "w-5 h-5 text-white" })}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{selectedWorkflow.steps[currentStep].name}</div>
                  <div className="text-sm text-muted-foreground">{selectedWorkflow.steps[currentStep].description}</div>
                </div>
                {isRunning && currentStep < selectedWorkflow.steps.length - 1 && (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </div>
                )}
                {completedSteps.includes(currentStep) && (
                  <Badge className="bg-green-500 text-white">Complete</Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Execution Log */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">Execution Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {completedSteps.map((stepIdx) => (
              <div key={stepIdx} className="flex items-center space-x-3 p-2 bg-secondary/20 rounded-lg text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-muted-foreground">{new Date().toLocaleTimeString()}</span>
                <span className="font-medium">{selectedWorkflow.steps[stepIdx].name}</span>
                <span className="text-muted-foreground">- {selectedWorkflow.steps[stepIdx].description}</span>
              </div>
            ))}
            {completedSteps.length === 0 && (
              <div className="text-center text-muted-foreground py-4">
                Waiting for workflow execution...
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AutomationDemo
