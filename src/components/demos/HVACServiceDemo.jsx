import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Send, 
  Bot, 
  User, 
  Thermometer, 
  Fan, 
  Snowflake, 
  Flame, 
  Clock,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Wrench,
  DollarSign,
  Star,
  Users,
  Truck,
  ThumbsUp,
  ThumbsDown,
  Phone,
  Shield
} from 'lucide-react'

const HVACServiceDemo = () => {
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      text: "Welcome to ClimateComfort HVAC! I'm your 24/7 AI Service Assistant. How can I help you today?",
      options: [
        "Schedule Service",
        "Emergency Dispatch",
        "Get Quote",
        "View Maintenance Plans"
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [showAddressInput, setShowAddressInput] = useState(false)
  const [addressValue, setAddressValue] = useState('')
  const [technicianStatus, setTechnicianStatus] = useState(null)
  const [metrics, setMetrics] = useState({
    servicesCompleted: 1847,
    emergencyResponse: 28,
    customerRating: 4.9,
    repeatCustomers: 73
  })
  const messagesEndRef = useRef(null)

  const upcomingMaintenance = [
    { service: 'AC Tune-Up', date: 'Mar 15, 2026', status: 'scheduled' },
    { service: 'Filter Replacement', date: 'Feb 28, 2026', status: 'upcoming' },
    { service: 'Duct Inspection', date: 'Apr 10, 2026', status: 'scheduled' }
  ]

  const availableDates = [
    { day: 'Mon', date: '27', month: 'Jan' },
    { day: 'Tue', date: '28', month: 'Jan' },
    { day: 'Wed', date: '29', month: 'Jan' },
    { day: 'Thu', date: '30', month: 'Jan' },
    { day: 'Fri', date: '31', month: 'Jan' }
  ]

  const availableTimes = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ]

  const pricingData = {
    'AC Tune-Up': { price: '$89', duration: '1-2 hours', description: 'Complete inspection, cleaning, and performance optimization' },
    'Furnace Repair': { price: '$150-450', duration: '2-4 hours', description: 'Diagnosis and repair of heating system issues' },
    'Duct Cleaning': { price: '$299', duration: '3-4 hours', description: 'Full ductwork cleaning and sanitization' },
    'Thermostat Install': { price: '$175', duration: '1 hour', description: 'Smart or standard thermostat installation' }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const responses = {
    "schedule service": {
      text: "I'd be happy to schedule a service for you! What type of service do you need?",
      options: [
        "AC Tune-Up",
        "Furnace Repair",
        "Duct Cleaning",
        "Thermostat Install",
        "Other Service"
      ]
    },
    "emergency dispatch": {
      text: "🚨 EMERGENCY SERVICE REQUEST\n\nI understand you have an urgent HVAC issue. Our emergency team is available 24/7.\n\n⚠️ Average response time: 28 minutes\n📞 Priority dispatch available\n\nPlease describe your emergency:",
      options: [
        "No Heat - Freezing",
        "No AC - Extreme Heat",
        "Gas Smell Detected",
        "System Making Loud Noises",
        "Water Leak from Unit"
      ]
    },
    "get quote": {
      text: "I can provide instant pricing estimates! Select a service to see detailed pricing:",
      options: [
        "AC Tune-Up",
        "Furnace Repair",
        "Duct Cleaning",
        "Thermostat Install"
      ],
      showPricing: true
    },
    "view maintenance plans": {
      text: "🛡️ ClimateComfort Maintenance Plans\n\nKeep your HVAC system running efficiently year-round!\n\n✨ BASIC PLAN - $15/month\n• 2 tune-ups per year\n• Priority scheduling\n• 10% off repairs\n\n⭐ PREMIUM PLAN - $29/month\n• 4 tune-ups per year\n• Priority emergency service\n• 20% off repairs\n• Free filter replacements\n\n👑 ULTIMATE PLAN - $49/month\n• Unlimited tune-ups\n• Free emergency calls\n• 30% off all repairs\n• Free filter & part replacements",
      options: [
        "Sign Up - Basic",
        "Sign Up - Premium",
        "Sign Up - Ultimate",
        "I have more questions"
      ]
    },
    "ac tune-up": {
      text: `💨 AC Tune-Up Service\n\n💰 Price: ${pricingData['AC Tune-Up'].price}\n⏱️ Duration: ${pricingData['AC Tune-Up'].duration}\n\n✅ What's Included:\n• Complete system inspection\n• Refrigerant level check\n• Coil cleaning\n• Filter replacement\n• Performance optimization\n• Safety inspection\n\nWould you like to schedule this service?`,
      options: ["Schedule AC Tune-Up", "Get Quote for Other Service", "That's all, thanks!"],
      showDatePicker: true
    },
    "furnace repair": {
      text: `🔥 Furnace Repair Service\n\n💰 Price: ${pricingData['Furnace Repair'].price}\n⏱️ Duration: ${pricingData['Furnace Repair'].duration}\n\n✅ What's Included:\n• Complete diagnosis\n• All necessary repairs\n• Parts (if needed)\n• Safety testing\n• 90-day warranty on repairs\n\nWould you like to schedule a repair visit?`,
      options: ["Schedule Furnace Repair", "Get Quote for Other Service", "That's all, thanks!"],
      showDatePicker: true
    },
    "duct cleaning": {
      text: `🌀 Duct Cleaning Service\n\n💰 Price: ${pricingData['Duct Cleaning'].price}\n⏱️ Duration: ${pricingData['Duct Cleaning'].duration}\n\n✅ What's Included:\n• Complete duct system cleaning\n• Vent cover cleaning\n• Sanitization treatment\n• Before/after airflow testing\n• Free air quality check\n\nReady to breathe cleaner air?`,
      options: ["Schedule Duct Cleaning", "Get Quote for Other Service", "That's all, thanks!"],
      showDatePicker: true
    },
    "thermostat install": {
      text: `🌡️ Thermostat Installation\n\n💰 Price: ${pricingData['Thermostat Install'].price}\n⏱️ Duration: ${pricingData['Thermostat Install'].duration}\n\n✅ Options Available:\n• Smart Thermostats (Nest, Ecobee)\n• Programmable Thermostats\n• Standard Thermostats\n• WiFi-enabled models\n\n✅ Includes:\n• Professional installation\n• System configuration\n• App setup (for smart models)\n• Usage training`,
      options: ["Schedule Installation", "Get Quote for Other Service", "That's all, thanks!"],
      showDatePicker: true
    },
    "no heat - freezing": {
      text: "🚨 EMERGENCY: No Heat\n\nI'm dispatching a technician immediately!\n\n🔧 Technician: Mike R. (4.9★ rating)\n🚗 ETA: 25-30 minutes\n📍 Tracking enabled\n\nWhile you wait:\n• Check thermostat batteries\n• Ensure vents aren't blocked\n• Check if pilot light is on (if applicable)\n\nWe'll text you when the technician is on the way.",
      options: ["Track Technician", "Call Technician", "Safety Tips"],
      dispatchTechnician: true
    },
    "no ac - extreme heat": {
      text: "🚨 EMERGENCY: No AC\n\nI'm dispatching a technician immediately!\n\n🔧 Technician: Sarah L. (5.0★ rating)\n🚗 ETA: 20-25 minutes\n📍 Tracking enabled\n\nWhile you wait:\n• Turn off the AC unit\n• Close blinds to block sun\n• Stay hydrated\n\nYour comfort is our priority!",
      options: ["Track Technician", "Call Technician", "Cooling Tips"],
      dispatchTechnician: true
    },
    "gas smell detected": {
      text: "🚨 CRITICAL: Gas Smell Detected\n\n⚠️ IMMEDIATE SAFETY STEPS:\n1. Do NOT use any electrical switches\n2. Leave the building immediately\n3. Do not light matches or lighters\n4. Call from outside the building\n\n🚗 Emergency technician dispatched!\n⏱️ Priority ETA: 15 minutes\n\n📞 Gas company notified",
      options: ["I'm Outside Now", "Call Emergency Line", "Safety Checklist"],
      dispatchTechnician: true
    },
    "track technician": {
      text: "📍 TECHNICIAN TRACKING\n\n🚐 Mike R. is on the way!\n\n📍 Current Status: 2.3 miles away\n⏱️ Updated ETA: 18 minutes\n🛣️ Route: Via Main St\n\n📱 You'll receive a text when they arrive.\n\nTechnician Info:\n⭐ Rating: 4.9/5\n🔧 10+ years experience\n✅ Background verified",
      options: ["Refresh Status", "Call Technician", "Add Gate Code/Instructions"],
      showTracking: true
    },
    "schedule ac tune-up": {
      text: "Great choice! Let's schedule your AC Tune-Up. Please select your preferred date:",
      showDatePicker: true,
      options: []
    },
    "schedule furnace repair": {
      text: "I'll get you scheduled for furnace repair. Please select your preferred date:",
      showDatePicker: true,
      options: []
    },
    "schedule duct cleaning": {
      text: "Let's schedule your duct cleaning service. Please select your preferred date:",
      showDatePicker: true,
      options: []
    },
    "schedule installation": {
      text: "Let's get your new thermostat installed. Please select your preferred date:",
      showDatePicker: true,
      options: []
    },
    "that's all, thanks!": {
      text: "You're welcome! 😊 Thank you for choosing ClimateComfort HVAC.\n\n❄️ Stay cool in summer, warm in winter!\n\nRemember, I'm available 24/7 if you need any assistance.",
      options: []
    },
    "default": {
      text: "I understand. Let me help you with that.\n\nHere are the services I can assist with:\n\n• 🗓️ Schedule service appointments\n• 🚨 Emergency dispatch\n• 💰 Get pricing quotes\n• 🛡️ Maintenance plans\n• 📍 Technician tracking\n\nHow can I help you today?",
      options: ["Schedule Service", "Emergency Dispatch", "Get Quote", "View Maintenance Plans"]
    }
  }

  const handleSend = (text) => {
    const message = text || inputValue.trim()
    if (!message) return

    setMessages(prev => [...prev, { type: 'user', text: message }])
    setInputValue('')
    setIsTyping(true)
    setShowDatePicker(false)
    setShowTimePicker(false)
    setShowAddressInput(false)

    setTimeout(() => {
      const response = responses[message.toLowerCase()] || responses.default
      
      if (response.dispatchTechnician) {
        setTechnicianStatus({
          name: 'Mike R.',
          eta: '18 min',
          distance: '2.3 miles',
          rating: 4.9
        })
        setMetrics(prev => ({
          ...prev,
          servicesCompleted: prev.servicesCompleted + 1
        }))
      }
      
      if (response.showDatePicker) {
        setShowDatePicker(true)
      }

      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: response.text,
        options: response.options,
        showTracking: response.showTracking
      }])
      
      setIsTyping(false)
    }, 1000)
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setShowDatePicker(false)
    setMessages(prev => [...prev, { type: 'user', text: `Selected: ${date.day}, ${date.month} ${date.date}` }])
    setIsTyping(true)

    setTimeout(() => {
      setShowTimePicker(true)
      setMessages(prev => [...prev, {
        type: 'bot',
        text: `Perfect! ${date.day}, ${date.month} ${date.date} is available. Please select your preferred time:`,
        options: []
      }])
      setIsTyping(false)
    }, 800)
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
    setShowTimePicker(false)
    setMessages(prev => [...prev, { type: 'user', text: `Selected time: ${time}` }])
    setIsTyping(true)

    setTimeout(() => {
      setShowAddressInput(true)
      setMessages(prev => [...prev, {
        type: 'bot',
        text: "Great! Please enter your service address:",
        options: []
      }])
      setIsTyping(false)
    }, 800)
  }

  const handleAddressSubmit = () => {
    if (!addressValue.trim()) return
    
    setShowAddressInput(false)
    setMessages(prev => [...prev, { type: 'user', text: addressValue }])
    setAddressValue('')
    setIsTyping(true)

    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'bot',
        text: `✅ Appointment Confirmed!\n\n📅 Date: ${selectedDate.day}, ${selectedDate.month} ${selectedDate.date}, 2026\n⏰ Time: ${selectedTime}\n📍 Address: ${addressValue || '123 Main Street'}\n🔧 Service: HVAC Maintenance\n👨‍🔧 Technician: Will be assigned\n\nYou'll receive a confirmation text and reminder 24 hours before your appointment.\n\n📱 Text CONFIRM to verify or RESCHEDULE to change.`,
        options: ["Add to Calendar", "Get Directions", "Done"]
      }])
      
      setMetrics(prev => ({
        ...prev,
        servicesCompleted: prev.servicesCompleted + 1
      }))
      
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (showAddressInput) {
        handleAddressSubmit()
      } else {
        handleSend()
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-lg font-semibold mb-1">24/7 AI Mobile HVAC Service Assistant</h4>
          <p className="text-muted-foreground text-sm">Experience intelligent climate control service automation</p>
        </div>
        <Badge className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white border-0 gap-2">
          <Thermometer className="w-3 h-3" />
          Always Available
        </Badge>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="glass-card hover-glow transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-sky-600">{metrics.servicesCompleted.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Services Completed</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover-glow transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-sky-600">{metrics.emergencyResponse} min</p>
            <p className="text-xs text-muted-foreground">Emergency Response</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover-glow transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-sky-600">{metrics.customerRating}</p>
            <p className="text-xs text-muted-foreground">Customer Rating</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover-glow transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-sky-600">{metrics.repeatCustomers}%</p>
            <p className="text-xs text-muted-foreground">Repeat Customers</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="bg-secondary/30 backdrop-blur-sm border-sky-200/20 h-[500px] flex flex-col">
            <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-1' : 'order-2'}`}>
                      <div className={`flex items-start gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          msg.type === 'user' 
                            ? 'bg-slate-600 text-white' 
                            : 'bg-gradient-to-br from-sky-500 to-indigo-600 text-white'
                        }`}>
                          {msg.type === 'user' ? <User className="w-4 h-4" /> : <Thermometer className="w-4 h-4" />}
                        </div>
                        <div className={`rounded-2xl px-4 py-3 ${
                          msg.type === 'user' 
                            ? 'bg-slate-600 text-white' 
                            : 'bg-card border border-sky-200/30 shadow-sm'
                        }`}>
                          <p className="text-sm whitespace-pre-line">{msg.text}</p>
                          
                          {msg.showTracking && technicianStatus && (
                            <div className="mt-3 p-3 rounded-lg bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center">
                                  <Truck className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <p className="font-semibold text-sm">{technicianStatus.name}</p>
                                  <p className="text-xs text-muted-foreground">{technicianStatus.distance} away • ETA: {technicianStatus.eta}</p>
                                </div>
                                <Badge className="ml-auto bg-green-100 text-green-700 border-green-200">
                                  En Route
                                </Badge>
                              </div>
                            </div>
                          )}
                          
                          {msg.options && msg.options.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {msg.options.map((option, optIdx) => (
                                <Button
                                  key={optIdx}
                                  variant="outline"
                                  size="sm"
                                  className="w-full justify-start text-left h-auto py-2 px-3 text-xs hover:bg-sky-50 hover:border-sky-300 transition-colors"
                                  onClick={() => handleSend(option)}
                                >
                                  {option}
                                </Button>
                              ))}
                            </div>
                          )}
                          
                          {msg.type === 'bot' && idx > 0 && (
                            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
                              <span className="text-xs text-muted-foreground">Was this helpful?</span>
                              <Button variant="ghost" size="icon" className="w-6 h-6 hover:text-green-600">
                                <ThumbsUp className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="w-6 h-6 hover:text-red-600">
                                <ThumbsDown className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Date Picker */}
                {showDatePicker && (
                  <div className="flex justify-start">
                    <div className="bg-card border border-sky-200/30 rounded-2xl p-4 shadow-sm">
                      <p className="text-sm font-medium mb-3">Select a Date:</p>
                      <div className="flex gap-2 flex-wrap">
                        {availableDates.map((date, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            className="flex flex-col h-auto py-2 px-3 hover:bg-sky-50 hover:border-sky-400 transition-colors"
                            onClick={() => handleDateSelect(date)}
                          >
                            <span className="text-xs text-muted-foreground">{date.day}</span>
                            <span className="text-lg font-bold">{date.date}</span>
                            <span className="text-xs text-muted-foreground">{date.month}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Time Picker */}
                {showTimePicker && (
                  <div className="flex justify-start">
                    <div className="bg-card border border-sky-200/30 rounded-2xl p-4 shadow-sm">
                      <p className="text-sm font-medium mb-3">Select a Time:</p>
                      <div className="grid grid-cols-3 gap-2">
                        {availableTimes.map((time, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            size="sm"
                            className="hover:bg-sky-50 hover:border-sky-400 transition-colors"
                            onClick={() => handleTimeSelect(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Address Input */}
                {showAddressInput && (
                  <div className="flex justify-start">
                    <div className="bg-card border border-sky-200/30 rounded-2xl p-4 shadow-sm w-full max-w-md">
                      <p className="text-sm font-medium mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-sky-500" />
                        Enter Service Address:
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={addressValue}
                          onChange={(e) => setAddressValue(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="123 Main Street, City, State"
                          className="flex-1 p-2 bg-background border border-sky-200/30 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent text-sm"
                        />
                        <Button 
                          onClick={handleAddressSubmit}
                          className="bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {isTyping && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white">
                      <Thermometer className="w-4 h-4" />
                    </div>
                    <div className="bg-card border border-sky-200/30 rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message or describe your HVAC issue..."
                  className="flex-1 p-3 bg-background border border-sky-200/30 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent text-sm"
                />
                <Button 
                  onClick={() => handleSend()} 
                  className="bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <Card className="glass-card border-sky-200/20">
            <CardContent className="p-4">
              <h5 className="font-semibold mb-3 text-sm flex items-center gap-2">
                <Fan className="w-4 h-4 text-sky-500" />
                Quick Actions
              </h5>
              <div className="space-y-2">
                {[
                  { icon: Calendar, text: 'Schedule Service', action: 'Schedule Service' },
                  { icon: AlertTriangle, text: 'Emergency Dispatch', action: 'Emergency Dispatch', urgent: true },
                  { icon: Shield, text: 'Maintenance Plans', action: 'View Maintenance Plans' },
                  { icon: DollarSign, text: 'Get Quote', action: 'Get Quote' }
                ].map((item, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    className={`w-full justify-start gap-2 transition-colors ${
                      item.urgent 
                        ? 'hover:bg-red-50 hover:border-red-300 hover:text-red-600' 
                        : 'hover:bg-sky-50 hover:border-sky-300'
                    }`}
                    onClick={() => handleSend(item.action)}
                  >
                    <item.icon className={`w-4 h-4 ${item.urgent ? 'text-red-500' : 'text-sky-500'}`} />
                    <span>{item.text}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Maintenance */}
          <Card className="glass-card border-sky-200/20">
            <CardContent className="p-4">
              <h5 className="font-semibold mb-3 text-sm flex items-center gap-2">
                <Snowflake className="w-4 h-4 text-sky-500" />
                Upcoming Maintenance
              </h5>
              <div className="space-y-3">
                {upcomingMaintenance.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                    <div>
                      <p className="text-sm font-medium">{item.service}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                    <Badge variant="outline" className={`text-xs ${
                      item.status === 'scheduled' 
                        ? 'bg-green-50 text-green-600 border-green-200' 
                        : 'bg-amber-50 text-amber-600 border-amber-200'
                    }`}>
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Service Pricing */}
          <Card className="glass-card border-sky-200/20">
            <CardContent className="p-4">
              <h5 className="font-semibold mb-3 text-sm flex items-center gap-2">
                <Flame className="w-4 h-4 text-sky-500" />
                Quick Pricing
              </h5>
              <div className="space-y-2 text-xs">
                {Object.entries(pricingData).map(([service, data], idx) => (
                  <div key={idx} className="flex justify-between items-center py-1 border-b border-border/50 last:border-0">
                    <span className="text-muted-foreground">{service}</span>
                    <span className="font-semibold text-sky-600">{data.price}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Technician Status (when active) */}
          {technicianStatus && (
            <Card className="bg-gradient-to-br from-sky-500/10 to-indigo-500/10 border-sky-500/30">
              <CardContent className="p-4">
                <h5 className="font-semibold mb-3 text-sm flex items-center gap-2">
                  <Truck className="w-4 h-4 text-sky-500" />
                  Technician En Route
                </h5>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center">
                      <Wrench className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{technicianStatus.name}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span>{technicianStatus.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-sky-500" />
                    <span>{technicianStatus.distance} away</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-sky-500" />
                    <span>ETA: {technicianStatus.eta}</span>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full mt-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700"
                    onClick={() => handleSend('Track Technician')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Technician
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default HVACServiceDemo
