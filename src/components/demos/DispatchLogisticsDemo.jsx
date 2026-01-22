import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Truck, 
  MapPin, 
  Navigation, 
  Clock, 
  Package,
  User,
  Route,
  Fuel,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  RefreshCw,
  ArrowRight,
  GripVertical,
  TrendingUp,
  Zap
} from 'lucide-react'

const DispatchLogisticsDemo = () => {
  const [isSimulating, setIsSimulating] = useState(false)
  const [selectedTruck, setSelectedTruck] = useState(null)
  const [selectedLoad, setSelectedLoad] = useState(null)
  const [draggedLoad, setDraggedLoad] = useState(null)
  const [assignedLoads, setAssignedLoads] = useState({})
  const animationRef = useRef(null)

  const [trucks, setTrucks] = useState([
    {
      id: 'TRK-001',
      driver: 'Mike Johnson',
      status: 'En Route',
      location: { x: 25, y: 35 },
      destination: { x: 75, y: 65 },
      speed: 62,
      fuelLevel: 78,
      eta: '2h 15m',
      loadId: 'LD-1042'
    },
    {
      id: 'TRK-002',
      driver: 'Sarah Chen',
      status: 'Available',
      location: { x: 45, y: 55 },
      destination: null,
      speed: 0,
      fuelLevel: 92,
      eta: '--',
      loadId: null
    },
    {
      id: 'TRK-003',
      driver: 'David Martinez',
      status: 'Delivering',
      location: { x: 70, y: 25 },
      destination: { x: 72, y: 28 },
      speed: 15,
      fuelLevel: 45,
      eta: '15m',
      loadId: 'LD-1039'
    },
    {
      id: 'TRK-004',
      driver: 'Emily Rodriguez',
      status: 'En Route',
      location: { x: 15, y: 70 },
      destination: { x: 85, y: 20 },
      speed: 58,
      fuelLevel: 65,
      eta: '4h 30m',
      loadId: 'LD-1041'
    },
    {
      id: 'TRK-005',
      driver: 'James Wilson',
      status: 'Off Duty',
      location: { x: 55, y: 45 },
      destination: null,
      speed: 0,
      fuelLevel: 88,
      eta: '--',
      loadId: null
    }
  ])

  const [loads, setLoads] = useState([
    {
      id: 'LD-1043',
      pickup: 'Chicago, IL',
      delivery: 'Detroit, MI',
      weight: '42,000 lbs',
      distance: '282 mi',
      rate: '$1,850',
      priority: 'High',
      deadline: '4h',
      status: 'Pending'
    },
    {
      id: 'LD-1044',
      pickup: 'Indianapolis, IN',
      delivery: 'Columbus, OH',
      weight: '38,500 lbs',
      distance: '175 mi',
      rate: '$1,200',
      priority: 'Medium',
      deadline: '8h',
      status: 'Pending'
    },
    {
      id: 'LD-1045',
      pickup: 'Milwaukee, WI',
      delivery: 'Minneapolis, MN',
      weight: '44,000 lbs',
      distance: '337 mi',
      rate: '$2,100',
      priority: 'Low',
      deadline: '12h',
      status: 'Pending'
    },
    {
      id: 'LD-1046',
      pickup: 'Cleveland, OH',
      delivery: 'Pittsburgh, PA',
      weight: '35,000 lbs',
      distance: '133 mi',
      rate: '$950',
      priority: 'High',
      deadline: '3h',
      status: 'Pending'
    }
  ])

  const [kpis, setKpis] = useState({
    activeTrucks: 4,
    onTimeDelivery: 94.5,
    milesDriven: 12847,
    loadsCompleted: 23
  })

  const [routeOptimization, setRouteOptimization] = useState(null)

  useEffect(() => {
    if (isSimulating) {
      animationRef.current = setInterval(() => {
        setTrucks(prevTrucks => 
          prevTrucks.map(truck => {
            if (truck.status === 'En Route' && truck.destination) {
              const dx = truck.destination.x - truck.location.x
              const dy = truck.destination.y - truck.location.y
              const distance = Math.sqrt(dx * dx + dy * dy)
              
              if (distance < 2) {
                return {
                  ...truck,
                  status: 'Delivering',
                  location: truck.destination,
                  speed: 0,
                  eta: 'Arrived'
                }
              }
              
              const step = 0.5
              return {
                ...truck,
                location: {
                  x: truck.location.x + (dx / distance) * step,
                  y: truck.location.y + (dy / distance) * step
                },
                speed: Math.floor(55 + Math.random() * 15)
              }
            }
            return truck
          })
        )

        setKpis(prev => ({
          ...prev,
          milesDriven: prev.milesDriven + Math.floor(Math.random() * 5),
          onTimeDelivery: Math.min(100, Math.max(90, prev.onTimeDelivery + (Math.random() - 0.5) * 0.5))
        }))
      }, 100)
    }

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current)
      }
    }
  }, [isSimulating])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-emerald-500'
      case 'En Route': return 'bg-blue-500'
      case 'Delivering': return 'bg-amber-500'
      case 'Off Duty': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Available': return 'default'
      case 'En Route': return 'secondary'
      case 'Delivering': return 'outline'
      case 'Off Duty': return 'destructive'
      default: return 'secondary'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-500'
      case 'Medium': return 'bg-amber-500'
      case 'Low': return 'bg-emerald-500'
      default: return 'bg-gray-500'
    }
  }

  const handleOptimizeRoute = (truckId, loadId) => {
    const truck = trucks.find(t => t.id === truckId)
    const load = loads.find(l => l.id === loadId)
    
    if (truck && load) {
      setRouteOptimization({
        truckId,
        loadId,
        estimatedTime: `${Math.floor(2 + Math.random() * 4)}h ${Math.floor(Math.random() * 60)}m`,
        estimatedDistance: load.distance,
        fuelCost: `$${Math.floor(150 + Math.random() * 200)}`,
        route: ['Current Location', load.pickup, load.delivery],
        savings: `${Math.floor(10 + Math.random() * 20)}%`
      })
    }
  }

  const handleAssignLoad = (truckId, loadId) => {
    setAssignedLoads(prev => ({
      ...prev,
      [loadId]: truckId
    }))
    
    setLoads(prev => 
      prev.map(load => 
        load.id === loadId ? { ...load, status: 'Assigned' } : load
      )
    )
    
    setTrucks(prev =>
      prev.map(truck =>
        truck.id === truckId ? { 
          ...truck, 
          status: 'En Route',
          loadId,
          destination: { x: 50 + Math.random() * 40, y: 30 + Math.random() * 40 },
          eta: `${Math.floor(2 + Math.random() * 4)}h ${Math.floor(Math.random() * 60)}m`
        } : truck
      )
    )
    
    setKpis(prev => ({
      ...prev,
      activeTrucks: prev.activeTrucks + 1
    }))
    
    setRouteOptimization(null)
    setSelectedLoad(null)
    setSelectedTruck(null)
  }

  const handleDragStart = (e, loadId) => {
    setDraggedLoad(loadId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, truckId) => {
    e.preventDefault()
    const truck = trucks.find(t => t.id === truckId)
    if (draggedLoad && truck && truck.status === 'Available') {
      handleAssignLoad(truckId, draggedLoad)
    }
    setDraggedLoad(null)
  }

  const handleCompleteDelivery = (truckId) => {
    setTrucks(prev =>
      prev.map(truck =>
        truck.id === truckId ? {
          ...truck,
          status: 'Available',
          loadId: null,
          destination: null,
          eta: '--'
        } : truck
      )
    )
    
    setKpis(prev => ({
      ...prev,
      loadsCompleted: prev.loadsCompleted + 1
    }))
  }

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span>Dispatch Logistics Command Center</span>
            </CardTitle>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-sm text-muted-foreground">
                  {isSimulating ? 'Live Tracking' : 'Paused'}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSimulating(!isSimulating)}
              >
                {isSimulating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isSimulating ? 'Pause' : 'Start'} Simulation
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground">
            Real-time fleet management with AI-powered route optimization
          </p>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-4 gap-4">
        <Card className="glass-card hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold">{kpis.activeTrucks}</h3>
            <p className="text-sm text-muted-foreground">Active Trucks</p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold">{kpis.onTimeDelivery.toFixed(1)}%</h3>
            <p className="text-sm text-muted-foreground">On-Time Delivery</p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Navigation className="w-5 h-5 text-white" />
              </div>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold">{kpis.milesDriven.toLocaleString()}</h3>
            <p className="text-sm text-muted-foreground">Miles Driven Today</p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold">{kpis.loadsCompleted}</h3>
            <p className="text-sm text-muted-foreground">Loads Completed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>Fleet Tracking Map</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-[400px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden border border-slate-700">
              <div className="absolute inset-0 opacity-20">
                {[...Array(10)].map((_, i) => (
                  <div key={`h-${i}`} className="absolute w-full h-px bg-slate-500" style={{ top: `${(i + 1) * 10}%` }} />
                ))}
                {[...Array(10)].map((_, i) => (
                  <div key={`v-${i}`} className="absolute h-full w-px bg-slate-500" style={{ left: `${(i + 1) * 10}%` }} />
                ))}
              </div>

              <div className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur-sm rounded-lg p-3 text-xs space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-slate-300">Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-slate-300">En Route</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-slate-300">Delivering</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                  <span className="text-slate-300">Off Duty</span>
                </div>
              </div>

              {trucks.map((truck) => (
                <div key={truck.id}>
                  {truck.destination && truck.status === 'En Route' && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <line
                        x1={`${truck.location.x}%`}
                        y1={`${truck.location.y}%`}
                        x2={`${truck.destination.x}%`}
                        y2={`${truck.destination.y}%`}
                        stroke="rgba(59, 130, 246, 0.5)"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                    </svg>
                  )}
                  
                  <div
                    className={`absolute cursor-pointer transition-all duration-100 ease-linear transform -translate-x-1/2 -translate-y-1/2 ${
                      selectedTruck === truck.id ? 'scale-125 z-20' : 'z-10 hover:scale-110'
                    }`}
                    style={{
                      left: `${truck.location.x}%`,
                      top: `${truck.location.y}%`
                    }}
                    onClick={() => setSelectedTruck(selectedTruck === truck.id ? null : truck.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, truck.id)}
                  >
                    <div className={`w-8 h-8 rounded-full ${getStatusColor(truck.status)} flex items-center justify-center shadow-lg ${
                      truck.status === 'En Route' ? 'animate-pulse' : ''
                    }`}>
                      <Truck className="w-4 h-4 text-white" />
                    </div>
                    
                    {selectedTruck === truck.id && (
                      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-slate-800 rounded-lg p-3 shadow-xl min-w-[200px] z-30 border border-slate-600">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-white text-sm">{truck.id}</span>
                          <Badge variant={getStatusBadgeVariant(truck.status)} className="text-xs">
                            {truck.status}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-xs text-slate-300">
                          <div className="flex items-center space-x-2">
                            <User className="w-3 h-3" />
                            <span>{truck.driver}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Navigation className="w-3 h-3" />
                            <span>{truck.speed} mph</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Fuel className="w-3 h-3" />
                            <span>{truck.fuelLevel}% fuel</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-3 h-3" />
                            <span>ETA: {truck.eta}</span>
                          </div>
                        </div>
                        {truck.status === 'Delivering' && (
                          <Button 
                            size="sm" 
                            className="w-full mt-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                            onClick={() => handleCompleteDelivery(truck.id)}
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Complete Delivery
                          </Button>
                        )}
                      </div>
                    )}
                  </div>

                  {truck.destination && (
                    <div
                      className="absolute w-4 h-4 transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${truck.destination.x}%`,
                        top: `${truck.destination.y}%`
                      }}
                    >
                      <MapPin className="w-4 h-4 text-red-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Driver Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[400px] overflow-y-auto">
            {trucks.map((truck) => (
              <div 
                key={truck.id}
                className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                  selectedTruck === truck.id 
                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-600/20 border-emerald-500/50' 
                    : 'bg-secondary/30 border-transparent hover:border-emerald-500/30'
                }`}
                onClick={() => setSelectedTruck(selectedTruck === truck.id ? null : truck.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, truck.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(truck.status)}`}></div>
                    <span className="font-medium text-sm">{truck.driver}</span>
                  </div>
                  <Badge variant={getStatusBadgeVariant(truck.status)} className="text-xs">
                    {truck.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Truck className="w-3 h-3" />
                    <span>{truck.id}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Fuel className="w-3 h-3" />
                    <span>{truck.fuelLevel}%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Navigation className="w-3 h-3" />
                    <span>{truck.speed} mph</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>ETA: {truck.eta}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Package className="w-5 h-5" />
                <span>Available Loads</span>
              </div>
              <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0">
                {loads.filter(l => l.status === 'Pending').length} Pending
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[350px] overflow-y-auto">
            {loads.map((load) => (
              <div
                key={load.id}
                draggable={load.status === 'Pending'}
                onDragStart={(e) => handleDragStart(e, load.id)}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  load.status === 'Assigned' 
                    ? 'bg-emerald-500/10 border-emerald-500/30 opacity-60'
                    : selectedLoad === load.id
                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-600/20 border-emerald-500/50'
                    : 'bg-secondary/30 border-transparent hover:border-emerald-500/30 cursor-grab active:cursor-grabbing'
                }`}
                onClick={() => load.status === 'Pending' && setSelectedLoad(selectedLoad === load.id ? null : load.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold">{load.id}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(load.priority)}`}></div>
                    <Badge variant="outline" className="text-xs">{load.priority}</Badge>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mb-2 text-sm">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  <span>{load.pickup}</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>{load.delivery}</span>
                </div>
                
                <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground">
                  <div>
                    <span className="block text-foreground font-medium">{load.weight}</span>
                    Weight
                  </div>
                  <div>
                    <span className="block text-foreground font-medium">{load.distance}</span>
                    Distance
                  </div>
                  <div>
                    <span className="block text-foreground font-medium text-emerald-500">{load.rate}</span>
                    Rate
                  </div>
                  <div>
                    <span className="block text-foreground font-medium">{load.deadline}</span>
                    Deadline
                  </div>
                </div>

                {load.status === 'Pending' && selectedLoad === load.id && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Select a truck to assign:</p>
                    <div className="flex flex-wrap gap-2">
                      {trucks.filter(t => t.status === 'Available').map(truck => (
                        <Button
                          key={truck.id}
                          size="sm"
                          variant="outline"
                          className="text-xs"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleOptimizeRoute(truck.id, load.id)
                          }}
                        >
                          {truck.id}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {load.status === 'Assigned' && (
                  <div className="mt-2 flex items-center space-x-2 text-xs text-emerald-500">
                    <CheckCircle className="w-4 h-4" />
                    <span>Assigned to {assignedLoads[load.id]}</span>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Route className="w-5 h-5" />
              <span>Route Optimization</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {routeOptimization ? (
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-teal-600/10 rounded-lg border border-emerald-500/30">
                  <div className="flex items-center space-x-2 mb-3">
                    <Zap className="w-5 h-5 text-emerald-500" />
                    <span className="font-semibold">AI Route Analysis</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-background/50 rounded-lg">
                      <Clock className="w-5 h-5 mx-auto mb-1 text-emerald-500" />
                      <p className="text-lg font-bold">{routeOptimization.estimatedTime}</p>
                      <p className="text-xs text-muted-foreground">Est. Time</p>
                    </div>
                    <div className="text-center p-3 bg-background/50 rounded-lg">
                      <Navigation className="w-5 h-5 mx-auto mb-1 text-emerald-500" />
                      <p className="text-lg font-bold">{routeOptimization.estimatedDistance}</p>
                      <p className="text-xs text-muted-foreground">Distance</p>
                    </div>
                    <div className="text-center p-3 bg-background/50 rounded-lg">
                      <Fuel className="w-5 h-5 mx-auto mb-1 text-emerald-500" />
                      <p className="text-lg font-bold">{routeOptimization.fuelCost}</p>
                      <p className="text-xs text-muted-foreground">Fuel Cost</p>
                    </div>
                    <div className="text-center p-3 bg-background/50 rounded-lg">
                      <TrendingUp className="w-5 h-5 mx-auto mb-1 text-emerald-500" />
                      <p className="text-lg font-bold text-emerald-500">{routeOptimization.savings}</p>
                      <p className="text-xs text-muted-foreground">Savings</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Optimized Route:</p>
                    <div className="flex items-center space-x-2">
                      {routeOptimization.route.map((stop, idx) => (
                        <React.Fragment key={idx}>
                          <div className="flex items-center space-x-1 text-xs bg-background/50 px-2 py-1 rounded">
                            <MapPin className="w-3 h-3" />
                            <span>{stop}</span>
                          </div>
                          {idx < routeOptimization.route.length - 1 && (
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                      onClick={() => handleAssignLoad(routeOptimization.truckId, routeOptimization.loadId)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Confirm Assignment
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setRouteOptimization(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Route className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h4 className="font-medium mb-2">No Route Selected</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Select a load and truck to see AI-optimized route recommendations
                </p>
                <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Drag loads onto available trucks for quick assignment</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">AI Dispatch Optimization</h4>
                <p className="text-sm text-muted-foreground">
                  This demo showcases real-time fleet tracking and intelligent load matching
                </p>
              </div>
            </div>
            <Button 
              variant="outline"
              onClick={() => {
                setTrucks(trucks.map(t => ({
                  ...t,
                  location: { x: 20 + Math.random() * 60, y: 20 + Math.random() * 60 }
                })))
                setLoads(loads.map(l => ({ ...l, status: 'Pending' })))
                setAssignedLoads({})
                setRouteOptimization(null)
                setSelectedTruck(null)
                setSelectedLoad(null)
              }}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset Demo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DispatchLogisticsDemo
