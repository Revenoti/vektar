import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Clock,
  Zap,
  Mail,
  MessageSquare,
  Database,
  FileText,
  Users,
  Bell,
  Calendar,
  Plus,
  Settings,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Timer,
  Target,
  Workflow,
  Loader2
} from 'lucide-react'

const BusinessAutomationDemo = () => {
  const [selectedTrigger, setSelectedTrigger] = useState(null)
  const [selectedActions, setSelectedActions] = useState([])
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(-1)
  const [completedSteps, setCompletedSteps] = useState([])
  const [showBuilder, setShowBuilder] = useState(true)
  const [stats, setStats] = useState({
    automationsRun: 247,
    timeSaved: 156,
    successRate: 98.5
  })

  const triggers = [
    { id: 'new-lead', name: 'New Lead', icon: Users, description: 'When a new lead is captured', color: 'from-violet-500 to-purple-600' },
    { id: 'form-submit', name: 'Form Submission', icon: FileText, description: 'When a form is submitted', color: 'from-violet-500 to-purple-600' },
    { id: 'scheduled', name: 'Scheduled Time', icon: Calendar, description: 'At a specific time or interval', color: 'from-violet-500 to-purple-600' },
    { id: 'email-received', name: 'Email Received', icon: Mail, description: 'When an email arrives', color: 'from-violet-500 to-purple-600' }
  ]

  const actions = [
    { id: 'send-email', name: 'Send Email', icon: Mail, description: 'Send personalized email', integration: 'Gmail' },
    { id: 'create-task', name: 'Create Task', icon: Target, description: 'Create a new task', integration: 'Asana' },
    { id: 'update-crm', name: 'Update CRM', icon: Database, description: 'Update CRM record', integration: 'Salesforce' },
    { id: 'send-slack', name: 'Send Notification', icon: MessageSquare, description: 'Notify team on Slack', integration: 'Slack' },
    { id: 'schedule-call', name: 'Schedule Call', icon: Calendar, description: 'Book a meeting', integration: 'Calendly' },
    { id: 'add-tag', name: 'Add Tag', icon: Settings, description: 'Tag the record', integration: 'HubSpot' }
  ]

  const integrations = [
    { name: 'Slack', color: 'bg-[#4A154B]' },
    { name: 'Gmail', color: 'bg-[#EA4335]' },
    { name: 'Salesforce', color: 'bg-[#00A1E0]' },
    { name: 'HubSpot', color: 'bg-[#FF7A59]' },
    { name: 'Asana', color: 'bg-[#F06A6A]' },
    { name: 'Calendly', color: 'bg-[#006BFF]' },
    { name: 'Zapier', color: 'bg-[#FF4A00]' },
    { name: 'Notion', color: 'bg-[#000000]' }
  ]

  const templates = [
    {
      id: 'lead-nurture',
      name: 'Lead Nurturing',
      description: 'Automatically follow up with new leads',
      trigger: triggers[0],
      actions: [actions[0], actions[2], actions[3]]
    },
    {
      id: 'form-response',
      name: 'Form Response Handler',
      description: 'Process form submissions instantly',
      trigger: triggers[1],
      actions: [actions[0], actions[1], actions[2]]
    },
    {
      id: 'daily-report',
      name: 'Daily Report',
      description: 'Send daily summary reports',
      trigger: triggers[2],
      actions: [actions[0], actions[3]]
    }
  ]

  const workflowSteps = selectedTrigger ? [
    { name: selectedTrigger.name, icon: selectedTrigger.icon, description: `Trigger: ${selectedTrigger.description}`, duration: 800 },
    ...selectedActions.map(action => ({
      name: action.name,
      icon: action.icon,
      description: action.description,
      duration: 1000 + Math.random() * 500
    }))
  ] : []

  useEffect(() => {
    let timeout
    if (isRunning && currentStep < workflowSteps.length - 1) {
      const step = workflowSteps[currentStep + 1]
      timeout = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
        setCompletedSteps(prev => [...prev, currentStep + 1])
      }, step?.duration || 1000)
    } else if (isRunning && currentStep >= workflowSteps.length - 1 && workflowSteps.length > 0) {
      setIsRunning(false)
      setStats(prev => ({
        automationsRun: prev.automationsRun + 1,
        timeSaved: prev.timeSaved + Math.floor(Math.random() * 5) + 3,
        successRate: Math.min(99.9, prev.successRate + 0.1)
      }))
    }
    return () => clearTimeout(timeout)
  }, [isRunning, currentStep, workflowSteps.length])

  const handleTriggerSelect = (trigger) => {
    setSelectedTrigger(trigger)
  }

  const handleActionToggle = (action) => {
    setSelectedActions(prev => {
      const exists = prev.find(a => a.id === action.id)
      if (exists) {
        return prev.filter(a => a.id !== action.id)
      }
      return [...prev, action]
    })
  }

  const loadTemplate = (template) => {
    setSelectedTrigger(template.trigger)
    setSelectedActions(template.actions)
  }

  const runAutomation = () => {
    if (!selectedTrigger || selectedActions.length === 0) return
    setShowBuilder(false)
    setCurrentStep(-1)
    setCompletedSteps([])
    setIsRunning(true)
  }

  const resetDemo = () => {
    setIsRunning(false)
    setCurrentStep(-1)
    setCompletedSteps([])
    setShowBuilder(true)
  }

  const togglePause = () => {
    setIsRunning(!isRunning)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-violet-500/10 to-purple-600/10 border-violet-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
              {stats.automationsRun}
            </div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <Zap className="w-4 h-4" />
              Automations Run
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-violet-500/10 to-purple-600/10 border-violet-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
              {stats.timeSaved}h
            </div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <Timer className="w-4 h-4" />
              Time Saved
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-violet-500/10 to-purple-600/10 border-violet-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
              {stats.successRate.toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Success Rate
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-secondary/20 border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-violet-500" />
              <span className="text-sm font-medium">Connected Integrations</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {integrations.map((integration, idx) => (
                <Badge
                  key={idx}
                  className={`${integration.color} text-white text-xs hover:scale-105 transition-transform cursor-default`}
                >
                  {integration.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {showBuilder ? (
        <>
          <Card className="glass-card border-violet-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Workflow className="w-5 h-5 text-violet-500" />
                Quick Start Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-3">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className="bg-secondary/30 hover:bg-secondary/50 cursor-pointer group transition-all duration-300 border-transparent hover:border-violet-500/50"
                    onClick={() => loadTemplate(template)}
                  >
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-sm mb-1 group-hover:text-violet-500 transition-colors">
                        {template.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-3">{template.description}</p>
                      <div className="flex items-center gap-1">
                        <div className="w-6 h-6 rounded bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                          <template.trigger.icon className="w-3 h-3 text-white" />
                        </div>
                        <ArrowRight className="w-3 h-3 text-muted-foreground" />
                        {template.actions.slice(0, 3).map((action, idx) => (
                          <div key={idx} className="w-6 h-6 rounded bg-secondary flex items-center justify-center">
                            <action.icon className="w-3 h-3 text-muted-foreground" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="glass-card border-violet-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="w-5 h-5 text-violet-500" />
                  Select Trigger
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {triggers.map((trigger) => (
                    <Card
                      key={trigger.id}
                      className={`cursor-pointer transition-all duration-300 ${
                        selectedTrigger?.id === trigger.id
                          ? 'bg-gradient-to-br from-violet-500/20 to-purple-600/20 border-violet-500 ring-2 ring-violet-500/30'
                          : 'bg-secondary/30 hover:bg-secondary/50 border-transparent hover:border-violet-500/30'
                      }`}
                      onClick={() => handleTriggerSelect(trigger)}
                    >
                      <CardContent className="p-4">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${trigger.color} flex items-center justify-center mb-3 ${
                          selectedTrigger?.id === trigger.id ? 'scale-110' : ''
                        } transition-transform`}>
                          <trigger.icon className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="font-semibold text-sm">{trigger.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{trigger.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-violet-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Settings className="w-5 h-5 text-violet-500" />
                  Configure Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {actions.map((action) => {
                    const isSelected = selectedActions.find(a => a.id === action.id)
                    return (
                      <Card
                        key={action.id}
                        className={`cursor-pointer transition-all duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-br from-violet-500/20 to-purple-600/20 border-violet-500 ring-2 ring-violet-500/30'
                            : 'bg-secondary/30 hover:bg-secondary/50 border-transparent hover:border-violet-500/30'
                        }`}
                        onClick={() => handleActionToggle(action)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center ${
                              isSelected ? 'scale-110' : ''
                            } transition-transform`}>
                              <action.icon className="w-4 h-4 text-white" />
                            </div>
                            {isSelected && (
                              <CheckCircle className="w-5 h-5 text-violet-500" />
                            )}
                          </div>
                          <h4 className="font-semibold text-sm mt-2">{action.name}</h4>
                          <Badge variant="secondary" className="text-xs mt-1">{action.integration}</Badge>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {selectedTrigger && selectedActions.length > 0 && (
            <Card className="bg-gradient-to-r from-violet-500/10 to-purple-600/10 border-violet-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">Workflow Preview:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                        <selectedTrigger.icon className="w-4 h-4 text-white" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      {selectedActions.map((action, idx) => (
                        <React.Fragment key={action.id}>
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                            <action.icon className="w-4 h-4 text-white" />
                          </div>
                          {idx < selectedActions.length - 1 && (
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={runAutomation}
                    className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Run Automation
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Workflow className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Running Automation</h3>
                <p className="text-sm text-muted-foreground">{selectedTrigger?.name} → {selectedActions.length} actions</p>
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

          <Card className="glass-card border-violet-500/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Workflow className="w-5 h-5 text-violet-500" />
                <span>Live Workflow Execution</span>
                {isRunning && (
                  <Badge className="animate-pulse bg-gradient-to-r from-violet-500 to-purple-600 text-white">
                    Running
                  </Badge>
                )}
                {!isRunning && completedSteps.length === workflowSteps.length && workflowSteps.length > 0 && (
                  <Badge className="bg-green-500 text-white">Complete</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute top-8 left-8 right-8 h-0.5 bg-border">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-purple-600 transition-all duration-500"
                    style={{ width: `${(completedSteps.length / workflowSteps.length) * 100}%` }}
                  />
                </div>

                <div className="flex justify-between relative z-10">
                  {workflowSteps.map((step, index) => {
                    const isCompleted = completedSteps.includes(index)
                    const isCurrent = index === currentStep

                    return (
                      <div key={index} className="flex flex-col items-center" style={{ width: `${100 / workflowSteps.length}%` }}>
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-500 ${
                          isCompleted ? 'bg-green-500 scale-110' :
                          isCurrent ? 'bg-gradient-to-br from-violet-500 to-purple-600 animate-pulse scale-125' :
                          'bg-secondary'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-8 h-8 text-white" />
                          ) : isCurrent ? (
                            <Loader2 className="w-6 h-6 text-white animate-spin" />
                          ) : (
                            <step.icon className="w-6 h-6 text-muted-foreground" />
                          )}
                        </div>
                        <div className="mt-3 text-center">
                          <div className={`text-xs font-medium ${isCurrent ? 'text-violet-500' : ''}`}>
                            {step.name}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {currentStep >= 0 && currentStep < workflowSteps.length && (
                <div className="mt-8 p-4 bg-gradient-to-r from-violet-500/10 to-purple-600/10 rounded-xl border border-violet-500/30 animate-in fade-in-0 slide-in-from-bottom-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                      {React.createElement(workflowSteps[currentStep].icon, { className: "w-5 h-5 text-white" })}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{workflowSteps[currentStep].name}</div>
                      <div className="text-sm text-muted-foreground">{workflowSteps[currentStep].description}</div>
                    </div>
                    {isRunning && (
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

          <Card className="glass-card border-violet-500/20">
            <CardHeader>
              <CardTitle className="text-base">Execution Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {completedSteps.map((stepIdx) => (
                  <div key={stepIdx} className="flex items-center space-x-3 p-2 bg-secondary/20 rounded-lg text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-muted-foreground">{new Date().toLocaleTimeString()}</span>
                    <span className="font-medium">{workflowSteps[stepIdx].name}</span>
                    <span className="text-muted-foreground">- {workflowSteps[stepIdx].description}</span>
                  </div>
                ))}
                {completedSteps.length === 0 && (
                  <div className="text-center text-muted-foreground py-4">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
                    Starting workflow execution...
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {!isRunning && completedSteps.length === workflowSteps.length && workflowSteps.length > 0 && (
            <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="font-semibold text-green-600">Automation Complete!</p>
                      <p className="text-sm text-muted-foreground">All {workflowSteps.length} steps executed successfully</p>
                    </div>
                  </div>
                  <Button onClick={resetDemo} variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Build Another
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}

export default BusinessAutomationDemo
