import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { TrendingUp, TrendingDown, AlertTriangle, Sparkles, RefreshCw, DollarSign, Users, ShoppingCart, Target, ArrowUp, ArrowDown, BarChart3 } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ReferenceLine } from 'recharts'

const PredictiveAnalyticsDemo = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showPrediction, setShowPrediction] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  const historicalData = [
    { month: 'Jul', revenue: 85000, actual: true },
    { month: 'Aug', revenue: 92000, actual: true },
    { month: 'Sep', revenue: 88000, actual: true },
    { month: 'Oct', revenue: 95000, actual: true },
    { month: 'Nov', revenue: 110000, actual: true },
    { month: 'Dec', revenue: 125000, actual: true },
    { month: 'Jan', revenue: 118000, actual: true }
  ]

  const predictionData = [
    { month: 'Jan', revenue: 118000, predicted: 118000 },
    { month: 'Feb', revenue: null, predicted: 128000 },
    { month: 'Mar', revenue: null, predicted: 135000 },
    { month: 'Apr', revenue: null, predicted: 142000 }
  ]

  const fullData = showPrediction 
    ? [...historicalData.slice(0, -1), ...predictionData]
    : historicalData

  const kpis = [
    { 
      label: 'Predicted Revenue', 
      value: '$142K', 
      change: '+20%', 
      trend: 'up',
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-600'
    },
    { 
      label: 'Customer Growth', 
      value: '2,340', 
      change: '+15%', 
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-indigo-600'
    },
    { 
      label: 'Conversion Rate', 
      value: '4.2%', 
      change: '+0.8%', 
      trend: 'up',
      icon: Target,
      color: 'from-purple-500 to-pink-600'
    },
    { 
      label: 'Churn Risk', 
      value: '5.2%', 
      change: '-2.1%', 
      trend: 'down',
      icon: AlertTriangle,
      color: 'from-amber-500 to-orange-600'
    }
  ]

  const insights = [
    { type: 'opportunity', text: 'Revenue likely to peak in Q2 based on seasonal patterns', confidence: 92 },
    { type: 'warning', text: '3 enterprise accounts showing early churn signals', confidence: 87 },
    { type: 'opportunity', text: 'Cross-sell opportunity detected for 45 accounts', confidence: 85 },
    { type: 'trend', text: 'Customer acquisition cost trending 12% lower', confidence: 94 }
  ]

  const runAnalysis = () => {
    setIsAnalyzing(true)
    setShowPrediction(false)
    
    setTimeout(() => {
      setShowPrediction(true)
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-lg font-semibold mb-1">Predictive Analytics Demo</h4>
          <p className="text-muted-foreground text-sm">AI-powered forecasting and business intelligence</p>
        </div>
        <Button 
          onClick={runAnalysis} 
          disabled={isAnalyzing}
          className="vektar-gradient"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Run AI Forecast
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <Card key={idx} className={`bg-gradient-to-br ${showPrediction ? kpi.color.replace('from-', 'from-').replace('to-', 'to-') + '/10' : 'bg-secondary/30'} transition-all duration-500`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${kpi.color} flex items-center justify-center`}>
                  <kpi.icon className="w-5 h-5 text-white" />
                </div>
                {showPrediction && (
                  <Badge className={`${kpi.trend === 'up' ? 'bg-emerald-500' : 'bg-amber-500'} text-white border-0 text-xs`}>
                    {kpi.trend === 'up' ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                    {kpi.change}
                  </Badge>
                )}
              </div>
              <p className="text-2xl font-bold">{showPrediction ? kpi.value : '--'}</p>
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-secondary/30">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span className="font-semibold">Revenue Forecast</span>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-muted-foreground">Historical</span>
              </div>
              {showPrediction && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600"></div>
                  <span className="text-muted-foreground">Predicted</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fullData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(value) => `$${value/1000}K`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`$${(value/1000).toFixed(0)}K`, 'Revenue']}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#6366f1" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
                {showPrediction && (
                  <Area 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#d946ef" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    fillOpacity={1} 
                    fill="url(#colorPredicted)" 
                  />
                )}
                {showPrediction && (
                  <ReferenceLine 
                    x="Jan" 
                    stroke="#d946ef" 
                    strokeDasharray="3 3"
                    label={{ value: 'Today', position: 'top', fill: '#d946ef', fontSize: 12 }}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {showPrediction && (
        <Card className="bg-gradient-to-br from-fuchsia-500/10 to-purple-500/10 border-fuchsia-500/30">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-fuchsia-500" />
              <span className="font-semibold">AI-Generated Insights</span>
              <Badge className="bg-fuchsia-500/20 text-fuchsia-600 border-0 text-xs ml-auto">
                +25% Forecast Accuracy
              </Badge>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {insights.map((insight, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded-lg border ${
                    insight.type === 'warning' 
                      ? 'bg-amber-500/10 border-amber-500/30' 
                      : insight.type === 'opportunity'
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-blue-500/10 border-blue-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm">{insight.text}</p>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {insight.confidence}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {!showPrediction && !isAnalyzing && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Click "Run AI Forecast" to see predictive analytics in action</p>
        </div>
      )}
    </div>
  )
}

export default PredictiveAnalyticsDemo
