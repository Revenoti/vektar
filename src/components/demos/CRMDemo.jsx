import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Database, 
  User, 
  Users, 
  Mail, 
  Phone, 
  Building, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Star,
  Calendar,
  MessageSquare,
  FileText,
  Target,
  Zap,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react'

const CRMDemo = () => {
  const [selectedContact, setSelectedContact] = useState(null)
  const [activeTab, setActiveTab] = useState('pipeline')
  const [deals, setDeals] = useState([])
  const [aiInsights, setAiInsights] = useState([])

  const contacts = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'TechCorp Solutions',
      email: 'sarah@techcorp.com',
      phone: '+1 (555) 234-5678',
      role: 'VP of Engineering',
      score: 92,
      status: 'hot',
      value: 75000,
      lastContact: '2 hours ago',
      nextAction: 'Follow-up call scheduled',
      avatar: 'SJ',
      interactions: 24,
      stage: 'Negotiation',
      winProbability: 85,
      activities: [
        { type: 'email', action: 'Opened pricing proposal', time: '2 hours ago' },
        { type: 'call', action: 'Discovery call - 45 min', time: '1 day ago' },
        { type: 'meeting', action: 'Product demo completed', time: '3 days ago' },
        { type: 'email', action: 'Downloaded case study', time: '1 week ago' }
      ]
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'DataFlow Inc',
      email: 'mchen@dataflow.io',
      phone: '+1 (555) 876-5432',
      role: 'CTO',
      score: 78,
      status: 'warm',
      value: 120000,
      lastContact: '1 day ago',
      nextAction: 'Send technical documentation',
      avatar: 'MC',
      interactions: 18,
      stage: 'Proposal',
      winProbability: 65,
      activities: [
        { type: 'email', action: 'Requested technical specs', time: '1 day ago' },
        { type: 'call', action: 'Needs assessment call', time: '4 days ago' },
        { type: 'email', action: 'Initial inquiry received', time: '1 week ago' }
      ]
    },
    {
      id: 3,
      name: 'Emily Williams',
      company: 'InnovateLabs',
      email: 'emily.w@innovatelabs.com',
      phone: '+1 (555) 345-6789',
      role: 'Director of Operations',
      score: 65,
      status: 'warm',
      value: 45000,
      lastContact: '3 days ago',
      nextAction: 'Schedule demo',
      avatar: 'EW',
      interactions: 12,
      stage: 'Qualification',
      winProbability: 45,
      activities: [
        { type: 'email', action: 'Responded to outreach', time: '3 days ago' },
        { type: 'website', action: 'Visited pricing page', time: '5 days ago' }
      ]
    },
    {
      id: 4,
      name: 'Robert Taylor',
      company: 'GlobalTech',
      email: 'rtaylor@globaltech.net',
      phone: '+1 (555) 987-1234',
      role: 'CEO',
      score: 45,
      status: 'cold',
      value: 200000,
      lastContact: '2 weeks ago',
      nextAction: 'Re-engagement campaign',
      avatar: 'RT',
      interactions: 8,
      stage: 'Lead',
      winProbability: 20,
      activities: [
        { type: 'email', action: 'No response to follow-up', time: '2 weeks ago' },
        { type: 'call', action: 'Left voicemail', time: '3 weeks ago' }
      ]
    }
  ]

  const pipelineStages = [
    { name: 'Lead', count: 24, value: 480000, color: 'bg-slate-500' },
    { name: 'Qualification', count: 18, value: 720000, color: 'bg-blue-500' },
    { name: 'Proposal', count: 12, value: 960000, color: 'bg-purple-500' },
    { name: 'Negotiation', count: 8, value: 640000, color: 'bg-orange-500' },
    { name: 'Closed Won', count: 15, value: 1200000, color: 'bg-green-500' }
  ]

  useEffect(() => {
    setDeals(contacts)
    setAiInsights([
      {
        type: 'opportunity',
        title: 'High-Value Deal Alert',
        description: 'Sarah Johnson from TechCorp has viewed pricing 3 times in 24hrs. Consider scheduling a closing call.',
        priority: 'high',
        action: 'Schedule Call'
      },
      {
        type: 'risk',
        title: 'Deal at Risk',
        description: 'Robert Taylor engagement has dropped significantly. AI suggests personalized re-engagement sequence.',
        priority: 'medium',
        action: 'Start Sequence'
      },
      {
        type: 'insight',
        title: 'Revenue Forecast',
        description: 'Based on pipeline analysis, Q1 revenue is projected to exceed target by 15% ($180K).',
        priority: 'low',
        action: 'View Report'
      }
    ])
  }, [])

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500'
    if (score >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'hot':
        return <Badge className="bg-red-500 text-white">🔥 Hot</Badge>
      case 'warm':
        return <Badge className="bg-yellow-500 text-white">⚡ Warm</Badge>
      default:
        return <Badge variant="secondary">❄️ Cold</Badge>
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">AI-Powered CRM Dashboard</h3>
        <p className="text-muted-foreground">
          Intelligent customer management with predictive analytics and automation
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {['pipeline', 'contacts', 'insights'].map((tab) => (
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

      {/* Pipeline View */}
      {activeTab === 'pipeline' && (
        <div className="space-y-6">
          {/* Pipeline Stats */}
          <div className="grid grid-cols-5 gap-2">
            {pipelineStages.map((stage, idx) => (
              <Card key={idx} className="glass-card">
                <CardContent className="p-4">
                  <div className={`w-full h-1 ${stage.color} rounded-full mb-3`} />
                  <div className="text-xs text-muted-foreground mb-1">{stage.name}</div>
                  <div className="text-lg font-bold">{stage.count}</div>
                  <div className="text-xs text-muted-foreground">{formatCurrency(stage.value)}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pipeline Visualization */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-primary" />
                <span>Deal Pipeline</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between h-32 mb-4">
                {pipelineStages.map((stage, idx) => (
                  <div key={idx} className="flex flex-col items-center flex-1 mx-1">
                    <div 
                      className={`w-full ${stage.color} rounded-t-lg transition-all duration-500`}
                      style={{ height: `${(stage.count / 24) * 100}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                {pipelineStages.map((stage, idx) => (
                  <span key={idx} className="flex-1 text-center">{stage.name}</span>
                ))}
              </div>

              {/* Total Pipeline Value */}
              <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">Total Pipeline Value</div>
                    <div className="text-3xl font-bold vektar-gradient-text">$4.0M</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Weighted Value</div>
                    <div className="text-3xl font-bold text-green-500">$2.4M</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Deals */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">Recent Deals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {contacts.slice(0, 3).map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-semibold text-sm">
                        {contact.avatar}
                      </div>
                      <div>
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-xs text-muted-foreground">{contact.company}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(contact.value)}</div>
                      <Badge variant="outline" className="text-xs">{contact.stage}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Contacts View */}
      {activeTab === 'contacts' && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Contacts List */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Contacts</span>
                </div>
                <Badge variant="secondary">{contacts.length} contacts</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                    selectedContact?.id === contact.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-semibold">
                        {contact.avatar}
                      </div>
                      <div>
                        <div className="font-semibold">{contact.name}</div>
                        <div className="text-sm text-muted-foreground">{contact.role}</div>
                        <div className="text-xs text-muted-foreground flex items-center mt-1">
                          <Building className="w-3 h-3 mr-1" />
                          {contact.company}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(contact.status)}
                      <div className={`text-2xl font-bold mt-2 ${getScoreColor(contact.score)}`}>
                        {contact.score}
                      </div>
                      <div className="text-xs text-muted-foreground">Lead Score</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Contact Details */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-primary" />
                <span>Contact Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedContact ? (
                <div className="space-y-6">
                  {/* Contact Header */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-xl font-bold">
                      {selectedContact.avatar}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{selectedContact.name}</h3>
                      <p className="text-muted-foreground">{selectedContact.role}</p>
                      <p className="text-sm text-muted-foreground">{selectedContact.company}</p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2 p-3 bg-secondary/30 rounded-lg">
                      <Mail className="w-4 h-4 text-primary" />
                      <span className="text-sm truncate">{selectedContact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 p-3 bg-secondary/30 rounded-lg">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="text-sm">{selectedContact.phone}</span>
                    </div>
                  </div>

                  {/* AI Scoring */}
                  <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border border-primary/20">
                    <div className="flex items-center space-x-2 mb-3">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="font-semibold">AI Lead Scoring</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getScoreColor(selectedContact.score)}`}>
                          {selectedContact.score}
                        </div>
                        <div className="text-xs text-muted-foreground">Lead Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-500">
                          {selectedContact.winProbability}%
                        </div>
                        <div className="text-xs text-muted-foreground">Win Probability</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-500">
                          {formatCurrency(selectedContact.value)}
                        </div>
                        <div className="text-xs text-muted-foreground">Deal Value</div>
                      </div>
                    </div>
                  </div>

                  {/* Activity Timeline */}
                  <div>
                    <h4 className="font-semibold mb-3">Recent Activity</h4>
                    <div className="space-y-2">
                      {selectedContact.activities.map((activity, idx) => (
                        <div key={idx} className="flex items-center space-x-3 p-2 bg-secondary/20 rounded-lg text-sm">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            activity.type === 'email' ? 'bg-blue-500/20 text-blue-500' :
                            activity.type === 'call' ? 'bg-green-500/20 text-green-500' :
                            activity.type === 'meeting' ? 'bg-purple-500/20 text-purple-500' :
                            'bg-orange-500/20 text-orange-500'
                          }`}>
                            {activity.type === 'email' && <Mail className="w-3 h-3" />}
                            {activity.type === 'call' && <Phone className="w-3 h-3" />}
                            {activity.type === 'meeting' && <Calendar className="w-3 h-3" />}
                            {activity.type === 'website' && <Target className="w-3 h-3" />}
                          </div>
                          <span className="flex-1">{activity.action}</span>
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next Action */}
                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">Next Action:</span>
                      <span className="text-sm">{selectedContact.nextAction}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <User className="w-12 h-12 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">Select a contact to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* AI Insights View */}
      {activeTab === 'insights' && (
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span>AI-Generated Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiInsights.map((insight, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-xl border ${
                    insight.priority === 'high' ? 'border-red-500/30 bg-red-500/10' :
                    insight.priority === 'medium' ? 'border-yellow-500/30 bg-yellow-500/10' :
                    'border-green-500/30 bg-green-500/10'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2 mb-2">
                      {insight.type === 'opportunity' && <TrendingUp className="w-4 h-4 text-green-500" />}
                      {insight.type === 'risk' && <TrendingDown className="w-4 h-4 text-red-500" />}
                      {insight.type === 'insight' && <BarChart3 className="w-4 h-4 text-blue-500" />}
                      <span className="font-semibold">{insight.title}</span>
                    </div>
                    <Badge variant={
                      insight.priority === 'high' ? 'destructive' :
                      insight.priority === 'medium' ? 'default' : 'secondary'
                    }>
                      {insight.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                  <Button size="sm" variant="outline">
                    {insight.action}
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Revenue Forecast */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span>AI Revenue Forecast</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-secondary/30 rounded-xl text-center">
                  <div className="text-sm text-muted-foreground mb-1">Q1 Forecast</div>
                  <div className="text-3xl font-bold text-primary">$1.38M</div>
                  <div className="flex items-center justify-center text-green-500 text-sm mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +15% vs target
                  </div>
                </div>
                <div className="p-4 bg-secondary/30 rounded-xl text-center">
                  <div className="text-sm text-muted-foreground mb-1">Best Case</div>
                  <div className="text-3xl font-bold text-green-500">$1.65M</div>
                  <div className="text-xs text-muted-foreground mt-1">85% confidence</div>
                </div>
                <div className="p-4 bg-secondary/30 rounded-xl text-center">
                  <div className="text-sm text-muted-foreground mb-1">Worst Case</div>
                  <div className="text-3xl font-bold text-orange-500">$1.12M</div>
                  <div className="text-xs text-muted-foreground mt-1">95% confidence</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { icon: CheckCircle, text: 'Prioritize TechCorp deal - highest win probability', color: 'text-green-500' },
                  { icon: Clock, text: 'Follow up with DataFlow before end of week', color: 'text-yellow-500' },
                  { icon: Users, text: 'Consider executive involvement for GlobalTech deal', color: 'text-blue-500' },
                  { icon: Zap, text: 'Automate re-engagement for cold leads', color: 'text-purple-500' }
                ].map((rec, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-3 bg-secondary/20 rounded-lg">
                    <rec.icon className={`w-5 h-5 ${rec.color}`} />
                    <span className="text-sm">{rec.text}</span>
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

export default CRMDemo
