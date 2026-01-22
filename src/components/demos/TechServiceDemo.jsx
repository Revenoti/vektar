import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Send, Bot, User, Laptop, Smartphone, Monitor, Wifi, Shield, Wrench, Clock, CheckCircle2, MapPin, Calendar, DollarSign, Truck, AlertCircle, Star, TrendingUp, Phone, MessageSquare } from 'lucide-react'

const TechServiceDemo = () => {
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      text: "Welcome to 24/7 AI Tech Support! I'm your Mobile Tech Service Assistant. How can I help you today?",
      options: [
        "Get Tech Support",
        "Schedule Repair",
        "Track Repair",
        "View Pricing"
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [activeView, setActiveView] = useState('chat')
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [repairStatus, setRepairStatus] = useState('scheduled')
  const [bookingStep, setBookingStep] = useState(1)
  const [metrics, setMetrics] = useState({
    devicesFixed: 12847,
    avgRepairTime: '47 min',
    customerRating: 4.9,
    firstTimeFixRate: 94
  })
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const deviceTypes = [
    { id: 'smartphone', icon: Smartphone, name: 'Smartphone', issues: ['Cracked Screen', 'Battery Drain', 'Not Charging', 'Water Damage'] },
    { id: 'laptop', icon: Laptop, name: 'Laptop', issues: ['Slow Performance', 'Blue Screen', 'Overheating', 'Keyboard Issues'] },
    { id: 'desktop', icon: Monitor, name: 'Desktop', issues: ['Won\'t Start', 'Virus/Malware', 'Hardware Upgrade', 'Data Recovery'] },
    { id: 'network', icon: Wifi, name: 'Network', issues: ['Slow WiFi', 'No Connection', 'Router Setup', 'Security Config'] }
  ]

  const pricingData = [
    { service: 'Screen Repair', price: '$89 - $249', time: '30-60 min', icon: Smartphone },
    { service: 'Battery Replacement', price: '$49 - $99', time: '20-45 min', icon: Wrench },
    { service: 'Data Recovery', price: '$149 - $399', time: '1-3 hours', icon: Shield },
    { service: 'Virus Removal', price: '$79 - $149', time: '45-90 min', icon: AlertCircle },
    { service: 'Hardware Upgrade', price: '$99 - $299', time: '30-60 min', icon: Monitor },
    { service: 'Network Setup', price: '$69 - $149', time: '30-60 min', icon: Wifi }
  ]

  const repairStatuses = [
    { id: 'scheduled', label: 'Scheduled', icon: Calendar, color: 'from-blue-500 to-cyan-500' },
    { id: 'dispatched', label: 'Technician Dispatched', icon: Truck, color: 'from-amber-500 to-orange-500' },
    { id: 'inprogress', label: 'In Progress', icon: Wrench, color: 'from-purple-500 to-violet-500' },
    { id: 'completed', label: 'Completed', icon: CheckCircle2, color: 'from-green-500 to-emerald-500' }
  ]

  const responses = {
    "get tech support": {
      text: "I'd be happy to help troubleshoot your device! Please select the type of device you're having issues with:",
      options: ["Smartphone", "Laptop", "Desktop", "Network Equipment"],
      action: () => setActiveView('diagnostics')
    },
    "schedule repair": {
      text: "Let's schedule a repair appointment for you. I have technicians available in your area.\n\n📅 Available time slots:\n• Today 2:00 PM - 4:00 PM\n• Tomorrow 9:00 AM - 11:00 AM\n• Tomorrow 1:00 PM - 3:00 PM\n\nWhich time works best for you?",
      options: ["Today 2:00 PM", "Tomorrow 9:00 AM", "Tomorrow 1:00 PM", "Show more times"],
      action: () => {
        setActiveView('booking')
        setBookingStep(1)
      }
    },
    "track repair": {
      text: "I found your active repair order:\n\n📱 iPhone 14 Pro - Screen Repair\n🔧 Order #TRS-2026-48291\n📍 Technician: Mike R. (4.9⭐)\n\nCurrent Status: Technician en route!\n🚗 ETA: 15 minutes\n\nWould you like to contact your technician or view repair details?",
      options: ["Contact Technician", "View Order Details", "Reschedule", "Cancel Order"],
      action: () => setActiveView('tracking')
    },
    "view pricing": {
      text: "Here's our transparent pricing for common repairs:\n\n📱 Screen Repair: $89 - $249\n🔋 Battery Replacement: $49 - $99\n💾 Data Recovery: $149 - $399\n🛡️ Virus Removal: $79 - $149\n\nAll repairs include a 90-day warranty. Would you like a detailed quote for your specific device?",
      options: ["Get Quote for My Device", "See Full Price List", "Schedule Repair"],
      action: () => setActiveView('pricing')
    },
    "smartphone": {
      text: "I see you're having issues with your smartphone. Let me run a quick diagnostic...\n\n🔍 Running system check...\n✅ Identifying common issues...\n\nWhat specific problem are you experiencing?",
      options: ["Cracked Screen", "Battery Drain", "Not Charging", "Water Damage"],
      action: () => setSelectedDevice('smartphone')
    },
    "laptop": {
      text: "Let's troubleshoot your laptop. I'll help identify the issue.\n\n🔍 Analyzing common laptop problems...\n✅ Loading diagnostic tools...\n\nWhat issue are you experiencing?",
      options: ["Slow Performance", "Blue Screen", "Overheating", "Keyboard Issues"],
      action: () => setSelectedDevice('laptop')
    },
    "desktop": {
      text: "Desktop computer issues - I can help! Let me gather some information.\n\n🔍 Checking common desktop issues...\n\nWhat seems to be the problem?",
      options: ["Won't Start", "Virus/Malware", "Hardware Upgrade", "Data Recovery"],
      action: () => setSelectedDevice('desktop')
    },
    "network equipment": {
      text: "Network issues can be frustrating! Let me help diagnose the problem.\n\n🔍 Checking network diagnostics...\n\nWhat type of network issue are you facing?",
      options: ["Slow WiFi", "No Connection", "Router Setup", "Security Config"],
      action: () => setSelectedDevice('network')
    },
    "cracked screen": {
      text: "I can help with your cracked screen! Here's what I recommend:\n\n📋 Diagnosis: Screen damage detected\n💰 Estimated Cost: $89 - $249 (depends on model)\n⏱️ Repair Time: 30-60 minutes\n🛡️ Warranty: 90-day coverage\n\nA mobile technician can come to your location to fix this today!",
      options: ["Schedule Repair Now", "Get Exact Quote", "DIY Tips"],
      action: () => setActiveView('booking')
    },
    "battery drain": {
      text: "Battery issues are common! Let me provide some troubleshooting steps:\n\n🔋 Quick Fixes to Try:\n1. Check battery health in Settings > Battery\n2. Close background apps\n3. Reduce screen brightness\n4. Disable location services when not needed\n\nIf these don't help, you may need a battery replacement ($49-$99).",
      options: ["Schedule Battery Replacement", "More Tips", "Check Service Pricing"]
    },
    "today 2:00 pm": {
      text: "Great choice! I'm booking your appointment for today 2:00 PM - 4:00 PM.\n\n📍 Please confirm your service location:\n\n🏠 Home: 123 Main Street\n🏢 Work: 456 Office Park\n📌 Other Location\n\nWhere should our technician meet you?",
      options: ["Home Address", "Work Address", "Enter New Address"],
      action: () => setBookingStep(2)
    },
    "home address": {
      text: "Perfect! Your appointment is confirmed!\n\n✅ BOOKING CONFIRMED\n━━━━━━━━━━━━━━━━━━\n📅 Today, 2:00 PM - 4:00 PM\n📍 123 Main Street\n👨‍🔧 Technician: Mike R. (4.9⭐)\n📱 Service: Device Repair\n\nYou'll receive a text when the technician is on the way!",
      options: ["Track Technician", "Add to Calendar", "Modify Booking"],
      action: () => {
        setBookingStep(4)
        setRepairStatus('scheduled')
        setMetrics(prev => ({
          ...prev,
          devicesFixed: prev.devicesFixed + 1
        }))
      }
    },
    "contact technician": {
      text: "Connecting you with your technician...\n\n👨‍🔧 Mike R.\n📞 (555) 123-4567\n⭐ Rating: 4.9/5 (847 reviews)\n🔧 Specialty: Mobile Device Repair\n\nMike is 15 minutes away and will text you when he arrives!",
      options: ["Call Mike", "Send Text Message", "Track Location"],
      action: () => setRepairStatus('dispatched')
    },
    "default": {
      text: "I understand you need help with tech support. Let me assist you!\n\n🛠️ I can help with:\n• Device troubleshooting\n• Repair scheduling\n• Order tracking\n• Service pricing\n\nWhat would you like help with?",
      options: ["Get Tech Support", "Schedule Repair", "Track Repair", "View Pricing"]
    }
  }

  const handleSend = (text) => {
    const message = text || inputValue.trim()
    if (!message) return

    setMessages(prev => [...prev, { type: 'user', text: message }])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      const response = responses[message.toLowerCase()] || responses.default
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: response.text,
        options: response.options
      }])
      if (response.action) {
        response.action()
      }
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const advanceRepairStatus = () => {
    const statusOrder = ['scheduled', 'dispatched', 'inprogress', 'completed']
    const currentIndex = statusOrder.indexOf(repairStatus)
    if (currentIndex < statusOrder.length - 1) {
      setRepairStatus(statusOrder[currentIndex + 1])
    }
  }

  const QuickActions = () => (
    <div className="grid grid-cols-2 gap-2">
      {[
        { icon: MessageSquare, label: 'Get Tech Support', action: () => handleSend('Get Tech Support') },
        { icon: Calendar, label: 'Schedule Repair', action: () => handleSend('Schedule Repair') },
        { icon: Truck, label: 'Track Repair', action: () => handleSend('Track Repair') },
        { icon: DollarSign, label: 'View Pricing', action: () => handleSend('View Pricing') }
      ].map((item, idx) => (
        <Button
          key={idx}
          variant="outline"
          className="h-auto py-3 px-3 flex flex-col items-center gap-2 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all"
          onClick={item.action}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <item.icon className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs font-medium">{item.label}</span>
        </Button>
      ))}
    </div>
  )

  const DeviceDiagnostics = () => (
    <Card className="bg-secondary/30 backdrop-blur-sm border-cyan-500/20">
      <CardContent className="p-4">
        <h5 className="font-semibold mb-3 text-sm flex items-center gap-2">
          <Wrench className="w-4 h-4 text-cyan-500" />
          Device Diagnostics
        </h5>
        <div className="grid grid-cols-2 gap-2">
          {deviceTypes.map((device) => (
            <Button
              key={device.id}
              variant={selectedDevice === device.id ? "default" : "outline"}
              className={`h-auto py-3 flex flex-col items-center gap-2 transition-all ${
                selectedDevice === device.id 
                  ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white border-0' 
                  : 'hover:bg-cyan-500/10 hover:border-cyan-500/50'
              }`}
              onClick={() => {
                setSelectedDevice(device.id)
                handleSend(device.name)
              }}
            >
              <device.icon className="w-5 h-5" />
              <span className="text-xs">{device.name}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const RepairTracking = () => (
    <Card className="bg-secondary/30 backdrop-blur-sm border-cyan-500/20">
      <CardContent className="p-4">
        <h5 className="font-semibold mb-4 text-sm flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-cyan-500" />
            Repair Status
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs"
            onClick={advanceRepairStatus}
          >
            Simulate Update
          </Button>
        </h5>
        <div className="space-y-3">
          {repairStatuses.map((status, idx) => {
            const isActive = repairStatuses.findIndex(s => s.id === repairStatus) >= idx
            const isCurrent = status.id === repairStatus
            return (
              <div key={status.id} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isActive 
                    ? `bg-gradient-to-br ${status.color} text-white` 
                    : 'bg-muted text-muted-foreground'
                } ${isCurrent ? 'ring-2 ring-offset-2 ring-cyan-500' : ''}`}>
                  <status.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isActive ? '' : 'text-muted-foreground'}`}>
                    {status.label}
                  </p>
                  {isCurrent && (
                    <p className="text-xs text-cyan-500 animate-pulse">Current Status</p>
                  )}
                </div>
                {isActive && idx < repairStatuses.findIndex(s => s.id === repairStatus) && (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )

  const PricingCard = () => (
    <Card className="bg-secondary/30 backdrop-blur-sm border-cyan-500/20">
      <CardContent className="p-4">
        <h5 className="font-semibold mb-3 text-sm flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-cyan-500" />
          Service Pricing
        </h5>
        <div className="space-y-2 max-h-[200px] overflow-y-auto">
          {pricingData.map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-center justify-between p-2 bg-background/50 rounded-lg hover:bg-cyan-500/10 transition-all cursor-pointer"
              onClick={() => handleSend('View Pricing')}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium">{item.service}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-cyan-500">{item.price}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const BookingProgress = () => (
    <Card className="bg-secondary/30 backdrop-blur-sm border-cyan-500/20">
      <CardContent className="p-4">
        <h5 className="font-semibold mb-4 text-sm flex items-center gap-2">
          <Calendar className="w-4 h-4 text-cyan-500" />
          Appointment Booking
        </h5>
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                bookingStep >= step 
                  ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {bookingStep > step ? <CheckCircle2 className="w-4 h-4" /> : step}
              </div>
              {step < 4 && (
                <div className={`w-6 h-1 ${bookingStep > step ? 'bg-cyan-500' : 'bg-muted'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-xs text-muted-foreground text-center">
          {['Select Time', 'Choose Location', 'Confirm Details', 'Booked!'][bookingStep - 1]}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-lg font-semibold mb-1">AI Mobile Tech Service Assistant</h4>
          <p className="text-muted-foreground text-sm">24/7 intelligent tech support, diagnostics & repair scheduling</p>
        </div>
        <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 gap-2">
          <Phone className="w-3 h-3" />
          24/7 Available
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Devices Fixed', value: metrics.devicesFixed.toLocaleString(), icon: Wrench, color: 'from-cyan-500 to-blue-600' },
          { label: 'Avg Repair Time', value: metrics.avgRepairTime, icon: Clock, color: 'from-green-500 to-emerald-600' },
          { label: 'Customer Rating', value: `${metrics.customerRating}⭐`, icon: Star, color: 'from-amber-500 to-orange-500' },
          { label: 'First-Time Fix Rate', value: `${metrics.firstTimeFixRate}%`, icon: TrendingUp, color: 'from-purple-500 to-violet-600' }
        ].map((metric, idx) => (
          <Card key={idx} className="bg-secondary/30 backdrop-blur-sm hover:bg-secondary/50 transition-all hover:scale-[1.02]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                  <metric.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xl font-bold">{metric.value}</p>
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-secondary/30 backdrop-blur-sm h-[500px] flex flex-col">
            <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-1' : 'order-2'}`}>
                      <div className={`flex items-start gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          msg.type === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white'
                        }`}>
                          {msg.type === 'user' ? <User className="w-4 h-4" /> : <Wrench className="w-4 h-4" />}
                        </div>
                        <div className={`rounded-2xl px-4 py-3 ${
                          msg.type === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-card border border-border'
                        }`}>
                          <p className="text-sm whitespace-pre-line">{msg.text}</p>
                          
                          {msg.options && msg.options.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {msg.options.map((option, optIdx) => (
                                <Button
                                  key={optIdx}
                                  variant="outline"
                                  size="sm"
                                  className="w-full justify-start text-left h-auto py-2 px-3 text-xs hover:bg-cyan-500/10 hover:border-cyan-500/50"
                                  onClick={() => handleSend(option)}
                                >
                                  {option}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <div className="bg-card border border-border rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe your tech issue..."
                  className="flex-1 p-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
                />
                <Button onClick={() => handleSend()} className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <QuickActions />
          
          {activeView === 'diagnostics' && <DeviceDiagnostics />}
          {activeView === 'tracking' && <RepairTracking />}
          {activeView === 'pricing' && <PricingCard />}
          {activeView === 'booking' && <BookingProgress />}
          
          {activeView === 'chat' && (
            <>
              <DeviceDiagnostics />
              <Card className="bg-secondary/30 backdrop-blur-sm border-cyan-500/20">
                <CardContent className="p-4">
                  <h5 className="font-semibold mb-3 text-sm">AI Capabilities</h5>
                  <div className="space-y-2">
                    {[
                      { icon: Wrench, text: 'Smart Diagnostics' },
                      { icon: MapPin, text: 'Mobile Technicians' },
                      { icon: Shield, text: '90-Day Warranty' },
                      { icon: Clock, text: '24/7 Availability' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <item.icon className="w-4 h-4 text-cyan-500" />
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
          
          {(activeView === 'diagnostics' || activeView === 'tracking') && <PricingCard />}
          {activeView === 'pricing' && <RepairTracking />}
          {activeView === 'booking' && <RepairTracking />}
        </div>
      </div>
    </div>
  )
}

export default TechServiceDemo
