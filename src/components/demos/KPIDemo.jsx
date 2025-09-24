import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  RefreshCw,
  Download,
  Bell
} from 'lucide-react'

const KPIDemo = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d')
  const [isLive, setIsLive] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [kpiData, setKpiData] = useState({})

  const timeframes = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ]

  const generateKPIData = (timeframe) => {
    const baseData = {
      revenue: {
        current: 284750,
        previous: 267890,
        target: 300000,
        trend: 'up'
      },
      customers: {
        current: 1247,
        previous: 1189,
        target: 1300,
        trend: 'up'
      },
      conversion: {
        current: 3.8,
        previous: 3.2,
        target: 4.0,
        trend: 'up'
      },
      satisfaction: {
        current: 94.2,
        previous: 92.8,
        target: 95.0,
        trend: 'up'
      }
    }

    // Add some variation based on timeframe
    const multiplier = timeframe === '24h' ? 0.1 : timeframe === '7d' ? 1 : timeframe === '30d' ? 4.3 : 13
    
    return {
      revenue: {
        ...baseData.revenue,
        current: Math.round(baseData.revenue.current * multiplier),
        previous: Math.round(baseData.revenue.previous * multiplier),
        target: Math.round(baseData.revenue.target * multiplier)
      },
      customers: {
        ...baseData.customers,
        current: timeframe === '24h' ? 47 : baseData.customers.current,
        previous: timeframe === '24h' ? 42 : baseData.customers.previous,
        target: timeframe === '24h' ? 50 : baseData.customers.target
      },
      conversion: baseData.conversion,
      satisfaction: baseData.satisfaction
    }
  }

  useEffect(() => {
    setKpiData(generateKPIData(selectedTimeframe))
  }, [selectedTimeframe])

  useEffect(() => {
    let interval
    if (isLive) {
      interval = setInterval(() => {
        setLastUpdated(new Date())
        // Simulate small data changes
        setKpiData(prev => ({
          ...prev,
          revenue: {
            ...prev.revenue,
            current: prev.revenue.current + Math.floor(Math.random() * 1000 - 500)
          },
          customers: {
            ...prev.customers,
            current: prev.customers.current + Math.floor(Math.random() * 3 - 1)
          }
        }))
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [isLive])

  const calculateChange = (current, previous) => {
    const change = ((current - previous) / previous) * 100
    return {
      percentage: Math.abs(change).toFixed(1),
      direction: change >= 0 ? 'up' : 'down'
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Conversion Rate Below Target',
      message: 'Current conversion rate (3.8%) is below target (4.0%)',
      time: '5 minutes ago',
      action: 'Review marketing campaigns'
    },
    {
      id: 2,
      type: 'success',
      title: 'Revenue Target Achieved',
      message: 'Monthly revenue target exceeded by 12%',
      time: '2 hours ago',
      action: 'Celebrate with team'
    },
    {
      id: 3,
      type: 'info',
      title: 'New Customer Milestone',
      message: 'Reached 1,250 active customers',
      time: '1 day ago',
      action: 'Send milestone report'
    }
  ]

  const insights = [
    {
      title: "Revenue Growth Acceleration",
      description: "Revenue growth has increased 23% compared to last period, driven by improved conversion rates and higher average order values.",
      impact: "High",
      recommendation: "Continue current marketing strategy and consider scaling successful campaigns."
    },
    {
      title: "Customer Acquisition Trending Up",
      description: "New customer acquisition is 15% above target, with particularly strong performance in the enterprise segment.",
      impact: "Medium",
      recommendation: "Allocate more resources to enterprise sales team and expand outreach efforts."
    },
    {
      title: "Satisfaction Score Improvement",
      description: "Customer satisfaction has improved by 1.4 points, likely due to recent AI chatbot implementation.",
      impact: "Medium",
      recommendation: "Document best practices and consider expanding AI support to other touchpoints."
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Executive KPI Dashboard</span>
            </CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-sm text-muted-foreground">
                  {isLive ? 'Live' : 'Paused'}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLive(!isLive)}
              >
                {isLive ? 'Pause' : 'Resume'}
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Real-time business intelligence and automated insights
            </p>
            <div className="flex items-center space-x-2">
              {timeframes.map((tf) => (
                <Button
                  key={tf.value}
                  variant={selectedTimeframe === tf.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeframe(tf.value)}
                >
                  {tf.label}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <Badge variant={kpiData.revenue?.current >= kpiData.revenue?.target ? "default" : "secondary"}>
                {kpiData.revenue?.current >= kpiData.revenue?.target ? "On Target" : "Below Target"}
              </Badge>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">
                {formatCurrency(kpiData.revenue?.current || 0)}
              </h3>
              <p className="text-sm text-muted-foreground">Revenue</p>
              <div className="flex items-center space-x-2">
                {kpiData.revenue && (
                  <>
                    <div className={`flex items-center space-x-1 ${
                      calculateChange(kpiData.revenue.current, kpiData.revenue.previous).direction === 'up' 
                        ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {calculateChange(kpiData.revenue.current, kpiData.revenue.previous).direction === 'up' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">
                        {calculateChange(kpiData.revenue.current, kpiData.revenue.previous).percentage}%
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      vs {formatCurrency(kpiData.revenue.previous)}
                    </span>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customers */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <Badge variant={kpiData.customers?.current >= kpiData.customers?.target ? "default" : "secondary"}>
                {kpiData.customers?.current >= kpiData.customers?.target ? "On Target" : "Below Target"}
              </Badge>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">
                {formatNumber(kpiData.customers?.current || 0)}
              </h3>
              <p className="text-sm text-muted-foreground">Active Customers</p>
              <div className="flex items-center space-x-2">
                {kpiData.customers && (
                  <>
                    <div className={`flex items-center space-x-1 ${
                      calculateChange(kpiData.customers.current, kpiData.customers.previous).direction === 'up' 
                        ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {calculateChange(kpiData.customers.current, kpiData.customers.previous).direction === 'up' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">
                        {calculateChange(kpiData.customers.current, kpiData.customers.previous).percentage}%
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      vs {formatNumber(kpiData.customers.previous)}
                    </span>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Rate */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <Badge variant={kpiData.conversion?.current >= kpiData.conversion?.target ? "default" : "secondary"}>
                {kpiData.conversion?.current >= kpiData.conversion?.target ? "On Target" : "Below Target"}
              </Badge>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">
                {kpiData.conversion?.current || 0}%
              </h3>
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              <div className="flex items-center space-x-2">
                {kpiData.conversion && (
                  <>
                    <div className={`flex items-center space-x-1 ${
                      calculateChange(kpiData.conversion.current, kpiData.conversion.previous).direction === 'up' 
                        ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {calculateChange(kpiData.conversion.current, kpiData.conversion.previous).direction === 'up' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">
                        {calculateChange(kpiData.conversion.current, kpiData.conversion.previous).percentage}%
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      vs {kpiData.conversion.previous}%
                    </span>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Satisfaction */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <Badge variant={kpiData.satisfaction?.current >= kpiData.satisfaction?.target ? "default" : "secondary"}>
                {kpiData.satisfaction?.current >= kpiData.satisfaction?.target ? "On Target" : "Below Target"}
              </Badge>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">
                {kpiData.satisfaction?.current || 0}%
              </h3>
              <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
              <div className="flex items-center space-x-2">
                {kpiData.satisfaction && (
                  <>
                    <div className={`flex items-center space-x-1 ${
                      calculateChange(kpiData.satisfaction.current, kpiData.satisfaction.previous).direction === 'up' 
                        ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {calculateChange(kpiData.satisfaction.current, kpiData.satisfaction.previous).direction === 'up' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">
                        {calculateChange(kpiData.satisfaction.current, kpiData.satisfaction.previous).percentage}%
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      vs {kpiData.satisfaction.previous}%
                    </span>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>AI-Generated Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="bg-secondary/30 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold">{insight.title}</h4>
                <Badge variant={insight.impact === 'High' ? 'default' : 'secondary'}>
                  {insight.impact} Impact
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
              <div className="bg-primary/10 rounded-lg p-3">
                <p className="text-sm font-medium">💡 Recommendation:</p>
                <p className="text-sm">{insight.recommendation}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Smart Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start space-x-3 p-3 bg-secondary/20 rounded-lg">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                alert.type === 'warning' ? 'bg-yellow-500' :
                alert.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
              }`}>
                {alert.type === 'warning' ? (
                  <AlertTriangle className="w-4 h-4 text-white" />
                ) : alert.type === 'success' ? (
                  <CheckCircle className="w-4 h-4 text-white" />
                ) : (
                  <Clock className="w-4 h-4 text-white" />
                )}
              </div>
              <div className="flex-1">
                <h5 className="font-medium">{alert.title}</h5>
                <p className="text-sm text-muted-foreground">{alert.message}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                  <Button variant="outline" size="sm">
                    {alert.action}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Footer Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <RefreshCw className="w-4 h-4" />
          <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="vectorik-gradient hover-glow">
            Schedule Report
          </Button>
        </div>
      </div>
    </div>
  )
}

export default KPIDemo
