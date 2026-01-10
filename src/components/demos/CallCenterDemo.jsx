import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Headphones, 
  Phone, 
  PhoneCall, 
  PhoneOff,
  User,
  Users,
  Clock,
  TrendingUp,
  Smile,
  Frown,
  Meh,
  Volume2,
  BarChart3,
  Bot,
  CheckCircle,
  AlertCircle,
  Zap
} from 'lucide-react'

const CallCenterDemo = () => {
  const [activeCalls, setActiveCalls] = useState([])
  const [selectedCall, setSelectedCall] = useState(null)
  const [stats, setStats] = useState({
    totalCalls: 0,
    avgWaitTime: 0,
    satisfaction: 0,
    resolved: 0
  })

  const sampleCalls = [
    {
      id: 1,
      caller: 'Jennifer Adams',
      phone: '+1 (555) 234-5678',
      topic: 'Billing Inquiry',
      sentiment: 'positive',
      duration: '2:34',
      status: 'active',
      agent: 'AI Agent - Emma',
      transcript: [
        { speaker: 'AI', text: 'Hello Jennifer! Thank you for calling. How can I help you today?', time: '0:00' },
        { speaker: 'Customer', text: 'Hi, I have a question about my last invoice. It seems higher than usual.', time: '0:05' },
        { speaker: 'AI', text: 'I\'d be happy to help you with that. Let me pull up your account... I can see your invoice from January. The increase is due to the premium plan upgrade you made on the 15th.', time: '0:12' },
        { speaker: 'Customer', text: 'Oh right, I forgot about that. That makes sense now. Thank you!', time: '0:25' }
      ]
    },
    {
      id: 2,
      caller: 'Michael Chen',
      phone: '+1 (555) 876-5432',
      topic: 'Technical Support',
      sentiment: 'neutral',
      duration: '4:12',
      status: 'active',
      agent: 'AI Agent - Alex',
      transcript: [
        { speaker: 'AI', text: 'Good afternoon! This is Alex from technical support. What issue are you experiencing?', time: '0:00' },
        { speaker: 'Customer', text: 'My dashboard isn\'t loading properly. It just shows a blank screen.', time: '0:06' },
        { speaker: 'AI', text: 'I understand that must be frustrating. Let me run a diagnostic on your account... I can see there was a caching issue. I\'ve cleared it on our end. Could you try refreshing your browser?', time: '0:15' }
      ]
    },
    {
      id: 3,
      caller: 'Sarah Williams',
      phone: '+1 (555) 345-6789',
      topic: 'Sales Inquiry',
      sentiment: 'positive',
      duration: '1:45',
      status: 'active',
      agent: 'AI Agent - Jordan',
      transcript: [
        { speaker: 'AI', text: 'Welcome to Vektar! I\'m Jordan, your AI sales assistant. Are you interested in learning about our solutions?', time: '0:00' },
        { speaker: 'Customer', text: 'Yes, I saw your chatbot demo and I\'m interested in implementing something similar.', time: '0:07' }
      ]
    },
    {
      id: 4,
      caller: 'Robert Taylor',
      phone: '+1 (555) 987-1234',
      topic: 'Account Cancellation',
      sentiment: 'negative',
      duration: '3:28',
      status: 'escalated',
      agent: 'AI Agent - Sam → Human Agent',
      transcript: [
        { speaker: 'AI', text: 'Hello Robert. I see you\'re calling about account changes. How can I assist?', time: '0:00' },
        { speaker: 'Customer', text: 'I want to cancel my account. The product isn\'t working for us.', time: '0:05' },
        { speaker: 'AI', text: 'I\'m sorry to hear that. Before we proceed, may I ask what specific issues you\'ve encountered? We may be able to help resolve them.', time: '0:10' }
      ]
    }
  ]

  useEffect(() => {
    // Initialize with sample calls
    setActiveCalls(sampleCalls)
    setStats({
      totalCalls: 127,
      avgWaitTime: 12,
      satisfaction: 94,
      resolved: 89
    })

    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalCalls: prev.totalCalls + Math.floor(Math.random() * 2),
        satisfaction: Math.min(99, Math.max(85, prev.satisfaction + (Math.random() > 0.5 ? 0.1 : -0.1)))
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return <Smile className="w-4 h-4 text-green-500" />
      case 'negative': return <Frown className="w-4 h-4 text-red-500" />
      default: return <Meh className="w-4 h-4 text-yellow-500" />
    }
  }

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-500/20 text-green-500 border-green-500/30'
      case 'negative': return 'bg-red-500/20 text-red-500 border-red-500/30'
      default: return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30'
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 text-white animate-pulse">Live</Badge>
      case 'escalated':
        return <Badge className="bg-orange-500 text-white">Escalated</Badge>
      case 'resolved':
        return <Badge className="bg-blue-500 text-white">Resolved</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">AI Call Center Dashboard</h3>
        <p className="text-muted-foreground">
          Real-time monitoring of AI-powered customer service calls
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-primary">{stats.totalCalls}</div>
                <div className="text-xs text-muted-foreground">Total Calls Today</div>
              </div>
              <Phone className="w-8 h-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-500">{stats.avgWaitTime}s</div>
                <div className="text-xs text-muted-foreground">Avg Wait Time</div>
              </div>
              <Clock className="w-8 h-8 text-green-500/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-500">{stats.satisfaction.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">Satisfaction</div>
              </div>
              <Smile className="w-8 h-8 text-blue-500/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-500">{stats.resolved}%</div>
                <div className="text-xs text-muted-foreground">AI Resolved</div>
              </div>
              <Bot className="w-8 h-8 text-purple-500/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Active Calls List */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Headphones className="w-5 h-5 text-primary" />
                <span>Active Calls</span>
              </div>
              <Badge variant="secondary">{activeCalls.length} calls</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeCalls.map((call) => (
              <div
                key={call.id}
                onClick={() => setSelectedCall(call)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                  selectedCall?.id === call.id 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">{call.caller}</div>
                      <div className="text-xs text-muted-foreground">{call.phone}</div>
                    </div>
                  </div>
                  {getStatusBadge(call.status)}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{call.duration}</span>
                    </span>
                    <span className={`flex items-center space-x-1 px-2 py-0.5 rounded-full border ${getSentimentColor(call.sentiment)}`}>
                      {getSentimentIcon(call.sentiment)}
                      <span className="text-xs capitalize">{call.sentiment}</span>
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs">{call.topic}</Badge>
                </div>
                <div className="mt-2 text-xs text-muted-foreground flex items-center space-x-1">
                  <Bot className="w-3 h-3" />
                  <span>{call.agent}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Call Details / Transcript */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Volume2 className="w-5 h-5 text-primary" />
              <span>Live Transcript</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedCall ? (
              <div className="space-y-4">
                {/* Call Header */}
                <div className="p-4 bg-secondary/30 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold">{selectedCall.caller}</div>
                        <div className="text-sm text-muted-foreground">{selectedCall.topic}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {selectedCall.status === 'active' && (
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          <span className="text-xs text-red-500">Recording</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Sentiment Analysis */}
                  <div className="flex items-center space-x-4 mt-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">Sentiment:</span>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border ${getSentimentColor(selectedCall.sentiment)}`}>
                        {getSentimentIcon(selectedCall.sentiment)}
                        <span className="text-xs capitalize font-medium">{selectedCall.sentiment}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">Duration:</span>
                      <span className="text-xs font-medium">{selectedCall.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Transcript */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {selectedCall.transcript.map((entry, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-start space-x-3 ${
                        entry.speaker === 'AI' ? '' : 'flex-row-reverse space-x-reverse'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        entry.speaker === 'AI' 
                          ? 'bg-gradient-to-br from-primary to-accent' 
                          : 'bg-secondary'
                      }`}>
                        {entry.speaker === 'AI' ? (
                          <Bot className="w-4 h-4 text-white" />
                        ) : (
                          <User className="w-4 h-4" />
                        )}
                      </div>
                      <div className={`flex-1 max-w-[80%] ${entry.speaker === 'AI' ? '' : 'text-right'}`}>
                        <div className={`inline-block p-3 rounded-xl text-sm ${
                          entry.speaker === 'AI'
                            ? 'bg-primary/10 text-left'
                            : 'bg-secondary text-left'
                        }`}>
                          {entry.text}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{entry.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Insights */}
                <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">AI Insights</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {selectedCall.sentiment === 'positive' && '✓ Customer appears satisfied with the interaction. Consider upselling opportunities.'}
                    {selectedCall.sentiment === 'negative' && '⚠ Customer showing signs of frustration. Consider escalating to human agent.'}
                    {selectedCall.sentiment === 'neutral' && '→ Standard inquiry in progress. AI handling efficiently.'}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Headphones className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">Select a call to view live transcript</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <span>AI vs Human Agent Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* AI Agent Stats */}
            <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border border-primary/20">
              <div className="flex items-center space-x-2 mb-4">
                <Bot className="w-5 h-5 text-primary" />
                <span className="font-semibold">AI Agents</span>
                <Badge className="vektar-gradient">Recommended</Badge>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Avg Response Time</span>
                  <span className="font-bold text-green-500">0.3s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Resolution Rate</span>
                  <span className="font-bold text-green-500">89%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Availability</span>
                  <span className="font-bold text-green-500">24/7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Cost per Call</span>
                  <span className="font-bold text-green-500">$0.12</span>
                </div>
              </div>
            </div>

            {/* Human Agent Stats */}
            <div className="p-4 bg-secondary/30 rounded-xl">
              <div className="flex items-center space-x-2 mb-4">
                <User className="w-5 h-5" />
                <span className="font-semibold">Human Agents</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Avg Response Time</span>
                  <span className="font-bold text-muted-foreground">45s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Resolution Rate</span>
                  <span className="font-bold text-muted-foreground">92%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Availability</span>
                  <span className="font-bold text-muted-foreground">9am-5pm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Cost per Call</span>
                  <span className="font-bold text-muted-foreground">$8.50</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CallCenterDemo
