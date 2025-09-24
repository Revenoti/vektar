import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Wrench, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  User, 
  Camera, 
  FileText,
  Navigation,
  Battery,
  Wifi,
  Phone,
  MessageSquare,
  Zap,
  Target
} from 'lucide-react'

const FieldTechDemo = () => {
  const [selectedTechnician, setSelectedTechnician] = useState(null)
  const [activeJob, setActiveJob] = useState(null)
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationStep, setSimulationStep] = useState(0)

  const technicians = [
    {
      id: 'tech-001',
      name: 'Mike Rodriguez',
      status: 'active',
      location: 'Downtown District',
      currentJob: 'HVAC Maintenance - Office Complex',
      efficiency: 94,
      completedToday: 4,
      avatar: '👨‍🔧'
    },
    {
      id: 'tech-002', 
      name: 'Sarah Chen',
      status: 'en-route',
      location: 'Industrial Zone',
      currentJob: 'Electrical Inspection - Factory',
      efficiency: 97,
      completedToday: 3,
      avatar: '👩‍🔧'
    },
    {
      id: 'tech-003',
      name: 'David Johnson',
      status: 'available',
      location: 'Residential Area',
      currentJob: null,
      efficiency: 91,
      completedToday: 5,
      avatar: '👨‍🔧'
    }
  ]

  const jobDetails = {
    'tech-001': {
      id: 'JOB-2024-0847',
      title: 'HVAC System Maintenance',
      client: 'TechCorp Office Complex',
      address: '1234 Business Ave, Downtown',
      priority: 'Medium',
      estimatedTime: '2.5 hours',
      description: 'Quarterly maintenance check on rooftop HVAC units. Replace filters, check refrigerant levels, and inspect electrical connections.',
      equipment: ['HVAC Diagnostic Tool', 'Refrigerant Gauge Set', 'Multimeter', 'Filter Replacement Kit'],
      checklist: [
        'Inspect air filters and replace if needed',
        'Check refrigerant levels and pressure',
        'Test electrical connections and controls',
        'Lubricate moving parts',
        'Verify thermostat calibration',
        'Document findings and recommendations'
      ],
      aiInsights: [
        'Historical data shows this unit typically needs filter replacement every 3 months',
        'Previous maintenance noted slight refrigerant leak - check connection points',
        'Client prefers maintenance during off-hours (after 6 PM)'
      ]
    },
    'tech-002': {
      id: 'JOB-2024-0848',
      title: 'Electrical Safety Inspection',
      client: 'Manufacturing Solutions Inc',
      address: '5678 Industrial Blvd, Zone 3',
      priority: 'High',
      estimatedTime: '3 hours',
      description: 'Annual electrical safety inspection for manufacturing facility. Check panel boards, grounding systems, and safety equipment.',
      equipment: ['Digital Multimeter', 'Insulation Tester', 'Ground Fault Tester', 'Thermal Camera'],
      checklist: [
        'Inspect main electrical panels',
        'Test GFCI outlets and breakers',
        'Verify grounding system integrity',
        'Check emergency lighting systems',
        'Test fire alarm electrical connections',
        'Generate compliance report'
      ],
      aiInsights: [
        'This facility has history of grounding issues - pay special attention to equipment grounding',
        'Previous inspection found outdated breakers in Panel C - recommend replacement',
        'Client requires detailed compliance documentation for insurance'
      ]
    }
  }

  const simulationSteps = [
    'AI analyzes job requirements and technician skills',
    'Optimal route calculated based on traffic and priority',
    'Equipment checklist generated from job specifications',
    'Historical data and insights provided',
    'Real-time guidance activated',
    'Progress tracking and reporting enabled'
  ]

  const startJobSimulation = async (techId) => {
    setSelectedTechnician(techId)
    setActiveJob(jobDetails[techId])
    setIsSimulating(true)
    setSimulationStep(0)

    // Simulate AI processing steps
    for (let i = 0; i < simulationSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400))
      setSimulationStep(i)
    }

    setIsSimulating(false)
  }

  const resetDemo = () => {
    setSelectedTechnician(null)
    setActiveJob(null)
    setIsSimulating(false)
    setSimulationStep(0)
  }

  const [liveMetrics, setLiveMetrics] = useState({
    activeTechs: 12,
    jobsCompleted: 47,
    avgEfficiency: 93.2,
    responseTime: '18 min'
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        ...prev,
        jobsCompleted: prev.jobsCompleted + Math.floor(Math.random() * 2),
        avgEfficiency: (prev.avgEfficiency + (Math.random() - 0.5) * 0.5).toFixed(1),
        responseTime: `${Math.floor(Math.random() * 5) + 15} min`
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wrench className="w-5 h-5" />
            <span>Field Tech Copilot Demo</span>
          </CardTitle>
          <p className="text-muted-foreground">
            See how AI assists field technicians with intelligent job guidance, route optimization, and real-time support
          </p>
        </CardHeader>
      </Card>

      {/* Live Dashboard */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{liveMetrics.activeTechs}</div>
            <div className="text-xs text-muted-foreground">Active Technicians</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{liveMetrics.jobsCompleted}</div>
            <div className="text-xs text-muted-foreground">Jobs Completed Today</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{liveMetrics.avgEfficiency}%</div>
            <div className="text-xs text-muted-foreground">Avg Efficiency</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-500">{liveMetrics.responseTime}</div>
            <div className="text-xs text-muted-foreground">Avg Response Time</div>
          </CardContent>
        </Card>
      </div>

      {!selectedTechnician ? (
        /* Technician Selection */
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Active Field Technicians</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {technicians.map((tech) => (
              <Card 
                key={tech.id}
                className="glass-card hover-glow cursor-pointer transition-all duration-300"
                onClick={() => startJobSimulation(tech.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{tech.avatar}</div>
                      <div>
                        <h4 className="font-semibold">{tech.name}</h4>
                        <p className="text-sm text-muted-foreground">{tech.location}</p>
                      </div>
                    </div>
                    <Badge variant={tech.status === 'active' ? 'default' : 
                                   tech.status === 'en-route' ? 'secondary' : 'outline'}>
                      {tech.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Efficiency:</span>
                      <span className="font-medium">{tech.efficiency}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Completed Today:</span>
                      <span className="font-medium">{tech.completedToday} jobs</span>
                    </div>
                  </div>

                  {tech.currentJob && (
                    <div className="bg-secondary/30 rounded-lg p-3 mb-4">
                      <p className="text-sm font-medium">Current Job:</p>
                      <p className="text-xs text-muted-foreground">{tech.currentJob}</p>
                    </div>
                  )}

                  <Button className="w-full vectorik-gradient hover-glow">
                    View AI Assistance
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        /* Job Assistance Interface */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={resetDemo}>
              ← Back to Technicians
            </Button>
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{technicians.find(t => t.id === selectedTechnician)?.avatar}</div>
              <div>
                <h3 className="text-xl font-semibold">
                  {technicians.find(t => t.id === selectedTechnician)?.name}
                </h3>
                <p className="text-muted-foreground">AI Copilot Active</p>
              </div>
            </div>
          </div>

          {/* AI Processing Steps */}
          {isSimulating && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>AI Copilot Initializing</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {simulationSteps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        index < simulationStep ? 'bg-green-500 text-white' :
                        index === simulationStep ? 'bg-primary text-white animate-pulse' :
                        'bg-secondary text-muted-foreground'
                      }`}>
                        {index < simulationStep ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <span className="text-xs">{index + 1}</span>
                        )}
                      </div>
                      <span className={`text-sm ${
                        index <= simulationStep ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Job Details & AI Assistance */}
          {!isSimulating && activeJob && (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Job Information */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Job Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">{activeJob.title}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <span>{activeJob.client}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{activeJob.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>Est. {activeJob.estimatedTime}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">Description</h5>
                    <p className="text-sm text-muted-foreground">{activeJob.description}</p>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">Required Equipment</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {activeJob.equipment.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Assistance Panel */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>AI Insights & Guidance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h5 className="font-medium mb-3">AI-Generated Insights</h5>
                    <div className="space-y-2">
                      {activeJob.aiInsights.map((insight, index) => (
                        <div key={index} className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                          <div className="flex items-start space-x-2">
                            <Target className="w-4 h-4 text-blue-500 mt-0.5" />
                            <p className="text-sm text-blue-700 dark:text-blue-300">{insight}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-3">Smart Checklist</h5>
                    <div className="space-y-2">
                      {activeJob.checklist.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-secondary/20 rounded">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Take Photo
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Get Help
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Mobile Interface Simulation */}
          {!isSimulating && activeJob && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Mobile Copilot Interface</CardTitle>
                <p className="text-muted-foreground">
                  This is how the AI assistant appears on the technician's mobile device
                </p>
              </CardHeader>
              <CardContent>
                <div className="max-w-sm mx-auto bg-gray-900 rounded-3xl p-4 shadow-2xl">
                  {/* Phone Header */}
                  <div className="flex items-center justify-between mb-4 text-white">
                    <div className="flex items-center space-x-1">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                    <div className="text-sm">9:41 AM</div>
                    <div className="flex items-center space-x-1">
                      <Wifi className="w-4 h-4" />
                      <Battery className="w-4 h-4" />
                    </div>
                  </div>

                  {/* App Interface */}
                  <div className="bg-white rounded-2xl p-4 text-black">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">AI Copilot</h4>
                        <p className="text-xs text-gray-500">Job #{activeJob.id}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-blue-100 rounded-lg p-3">
                        <p className="text-xs font-medium text-blue-800">Next Step:</p>
                        <p className="text-sm text-blue-700">Check refrigerant levels on Unit A</p>
                      </div>

                      <div className="bg-yellow-100 rounded-lg p-3">
                        <p className="text-xs font-medium text-yellow-800">⚠️ Alert:</p>
                        <p className="text-sm text-yellow-700">Previous leak detected at connection point</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button className="bg-primary text-white rounded-lg p-2 text-xs">
                          Mark Complete
                        </button>
                        <button className="bg-gray-200 text-gray-700 rounded-lg p-2 text-xs">
                          Need Help
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Performance Metrics */}
          {!isSimulating && activeJob && (
            <Card className="glass-card">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">AI Copilot Impact</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">+30%</div>
                    <div className="text-xs text-muted-foreground">Efficiency Gain</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">-25%</div>
                    <div className="text-xs text-muted-foreground">Travel Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500">95%</div>
                    <div className="text-xs text-muted-foreground">First-Time Fix</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-500">+40%</div>
                    <div className="text-xs text-muted-foreground">Customer Satisfaction</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}

export default FieldTechDemo
