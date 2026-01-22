import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Send, 
  Bot, 
  User, 
  Car, 
  Wrench, 
  MapPin, 
  Clock,
  DollarSign,
  Star,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Navigation,
  Phone,
  History,
  Gauge
} from 'lucide-react'

const AutoMechanicDemo = () => {
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      text: "Welcome to AutoFix Mobile Mechanics! I'm your 24/7 AI Service Assistant. How can I help you today?",
      options: [
        "Schedule Service",
        "Get Diagnosis",
        "View Pricing",
        "Track Technician"
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [showLocationInput, setShowLocationInput] = useState(false)
  const [locationValue, setLocationValue] = useState('')
  const [showPricing, setShowPricing] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showDispatch, setShowDispatch] = useState(false)
  const [activeView, setActiveView] = useState('chat')
  const [metrics, setMetrics] = useState({
    servicesCompleted: 1847,
    avgResponseTime: 12,
    customerRating: 4.9,
    onTimeArrival: 97
  })
  const messagesEndRef = useRef(null)

  const serviceHistory = [
    { date: 'Jan 15, 2026', service: 'Oil Change & Filter', vehicle: '2022 Toyota Camry', cost: '$65', technician: 'Mike R.', rating: 5 },
    { date: 'Dec 28, 2025', service: 'Brake Pad Replacement', vehicle: '2022 Toyota Camry', cost: '$285', technician: 'Sarah T.', rating: 5 },
    { date: 'Nov 10, 2025', service: 'Battery Replacement', vehicle: '2022 Toyota Camry', cost: '$165', technician: 'Mike R.', rating: 4 },
    { date: 'Sep 5, 2025', service: 'Tire Rotation', vehicle: '2022 Toyota Camry', cost: '$45', technician: 'James K.', rating: 5 }
  ]

  const pricingData = [
    { service: 'Oil Change (Synthetic)', price: '$65-85', time: '30 min', icon: '🛢️' },
    { service: 'Brake Service (Front)', price: '$250-350', time: '1-2 hrs', icon: '🔧' },
    { service: 'Brake Service (Rear)', price: '$225-300', time: '1-2 hrs', icon: '🔧' },
    { service: 'Battery Replacement', price: '$150-250', time: '30 min', icon: '🔋' },
    { service: 'Tire Rotation', price: '$40-60', time: '30 min', icon: '🛞' },
    { service: 'AC Recharge', price: '$125-175', time: '45 min', icon: '❄️' },
    { service: 'Spark Plug Replace', price: '$150-300', time: '1 hr', icon: '⚡' },
    { service: 'Diagnostic Scan', price: '$75-100', time: '30 min', icon: '🔍' }
  ]

  const technicianInfo = {
    name: 'Mike Rodriguez',
    photo: '👨‍🔧',
    rating: 4.9,
    reviews: 234,
    eta: '15 min',
    distance: '2.3 miles away',
    vehicle: 'White Ford Transit Van',
    plate: 'AUTO-FIX 42',
    specialties: ['Brakes', 'Engine', 'Electrical'],
    status: 'On the way'
  }

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const responses = {
    "schedule service": {
      text: "I'd be happy to help you schedule a mobile mechanic visit! First, please select your preferred date:",
      showDatePicker: true,
      options: []
    },
    "get diagnosis": {
      text: "I can help diagnose your vehicle issue. Please describe the symptoms you're experiencing, or select from common issues below:",
      options: [
        "Engine warning light on",
        "Strange noises when braking",
        "Car won't start",
        "Vibration while driving"
      ]
    },
    "view pricing": {
      text: "Here's our pricing menu for common services. All prices include parts and mobile service fee:",
      showPricing: true,
      options: ["Schedule Service", "Get a Custom Quote", "Back to Menu"]
    },
    "track technician": {
      text: "Great news! Your technician is on the way. Here's the current status:",
      showDispatch: true,
      options: ["Call Technician", "Update Location", "View Service Details"]
    },
    "engine warning light on": {
      text: "🔍 AI Diagnostic Analysis:\n\nThe check engine light can indicate several issues. Let me ask a few questions:\n\n1. Is the light steady or flashing?\n2. Have you noticed any performance changes?\n3. Any unusual smells?\n\nBased on common causes, this could be:\n• Loose gas cap (easy fix)\n• Oxygen sensor issue\n• Catalytic converter problem\n• Mass airflow sensor\n\n📊 Recommended: On-site diagnostic scan ($75)",
      options: ["Schedule Diagnostic", "More Symptoms", "Get Quote"],
      diagnosis: { urgency: 'moderate', recommendation: 'Diagnostic scan recommended within 1 week' }
    },
    "strange noises when braking": {
      text: "🔍 AI Diagnostic Analysis:\n\nBrake noises are important to address. Please describe the sound:\n\n• Squealing/squeaking - Usually worn brake pads\n• Grinding - Metal-on-metal, needs immediate attention\n• Clicking - Could be loose caliper\n• Thumping - Possible warped rotor\n\n⚠️ Brake issues should be addressed promptly for safety.\n\n📊 Estimated repair: Brake pad replacement $250-350",
      options: ["Schedule Brake Service", "Describe Sound More", "Get Quote"],
      diagnosis: { urgency: 'high', recommendation: 'Brake inspection recommended ASAP' }
    },
    "car won't start": {
      text: "🔍 AI Diagnostic Analysis:\n\nLet me help troubleshoot. When you try to start, what happens?\n\n• Nothing at all - Likely dead battery or starter\n• Clicking sound - Battery or starter issue\n• Cranks but won't start - Fuel or ignition problem\n• Engine turns over slowly - Weak battery\n\n🔋 Most common cause: Dead battery (90% of cases)\n\n📊 Emergency roadside service available!",
      options: ["Request Emergency Service", "It's Clicking", "Cranks But No Start"],
      diagnosis: { urgency: 'high', recommendation: 'Immediate attention required' }
    },
    "vibration while driving": {
      text: "🔍 AI Diagnostic Analysis:\n\nVibrations can come from several sources. When do you feel it?\n\n• At highway speeds (60+ mph) - Tire balance/alignment\n• When braking - Warped rotors\n• At all speeds - Tire wear, suspension\n• Steering wheel shakes - Front end issue\n\n🛞 Most common cause: Tire balance or alignment\n\n📊 Recommended: Tire inspection & balance ($40-60)",
      options: ["Schedule Tire Service", "At Highway Speeds", "When Braking"],
      diagnosis: { urgency: 'low', recommendation: 'Schedule inspection within 2 weeks' }
    },
    "schedule diagnostic": {
      text: "Perfect! Let's get you scheduled for a diagnostic scan. Our certified technician will come to your location with professional scanning equipment.\n\n📋 Service: Full Diagnostic Scan\n💰 Price: $75 (waived if repairs done)\n⏱️ Duration: 30 minutes\n\nPlease select your preferred date:",
      showDatePicker: true,
      options: []
    },
    "schedule brake service": {
      text: "I'll help you schedule brake service. Our mobile technicians carry all common brake parts.\n\n📋 Service: Brake Inspection & Repair\n💰 Estimate: $250-350 (front) or $225-300 (rear)\n⏱️ Duration: 1-2 hours\n\nPlease select your preferred date:",
      showDatePicker: true,
      options: []
    },
    "request emergency service": {
      text: "🚨 Emergency Service Request Received!\n\nI'm dispatching the nearest available technician to your location.\n\n⏱️ Estimated arrival: 20-30 minutes\n💰 Emergency service fee: $50 (in addition to repairs)\n\nPlease confirm your current location so we can send help immediately:",
      showLocationInput: true,
      options: []
    },
    "call technician": {
      text: "📞 Connecting you to Mike Rodriguez...\n\nPhone: (555) 123-4567\n\nAlternatively, you can:\n• Send a text message\n• Share updated location\n• Leave a voice note\n\nMike typically responds within 2 minutes.",
      options: ["Send Text Instead", "Share Location", "Back to Tracking"]
    },
    "view service history": {
      text: "Here's your complete service history with AutoFix Mobile Mechanics:",
      showHistory: true,
      options: ["Schedule New Service", "Download Records", "Back to Menu"]
    },
    "get a custom quote": {
      text: "I'd be happy to provide a custom quote! Please describe the service you need, or tell me about any issues with your vehicle.\n\nInclude details like:\n• Year, Make, Model of vehicle\n• Specific service needed\n• Any symptoms or concerns",
      options: ["Oil Change Quote", "Brake Service Quote", "Describe My Issue"]
    },
    "that's all, thanks!": {
      text: "You're welcome! 🚗 Thank you for choosing AutoFix Mobile Mechanics.\n\nRemember, we're available 24/7 for all your auto service needs. Drive safe!",
      options: []
    },
    "default": {
      text: "I understand. Let me help you with that.\n\nHere's what I can assist with:\n\n• 🔧 Schedule mobile mechanic service\n• 🔍 Diagnose vehicle issues\n• 💰 Get pricing estimates\n• 📍 Track your technician\n• 📋 View service history\n\nPlease select an option or describe your needs.",
      options: ["Schedule Service", "Get Diagnosis", "View Pricing", "Track Technician"]
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
    setShowLocationInput(false)
    setShowPricing(false)
    setShowHistory(false)
    setShowDispatch(false)

    setTimeout(() => {
      const response = responses[message.toLowerCase()] || responses.default
      
      if (response.showDatePicker) setShowDatePicker(true)
      if (response.showPricing) setShowPricing(true)
      if (response.showHistory) setShowHistory(true)
      if (response.showDispatch) setShowDispatch(true)
      if (response.showLocationInput) setShowLocationInput(true)

      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: response.text,
        options: response.options,
        diagnosis: response.diagnosis
      }])
      
      setMetrics(prev => ({
        ...prev,
        servicesCompleted: prev.servicesCompleted + 1
      }))
      
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
        text: `Great! ${date.day}, ${date.month} ${date.date} works. Please select your preferred time slot:`,
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
      setShowLocationInput(true)
      setMessages(prev => [...prev, {
        type: 'bot',
        text: `Perfect! ${time} on ${selectedDate.day}, ${selectedDate.month} ${selectedDate.date}.\n\nNow, please enter your service location (we come to you!):`,
        options: []
      }])
      setIsTyping(false)
    }, 800)
  }

  const handleLocationSubmit = () => {
    if (!locationValue.trim()) return
    
    setShowLocationInput(false)
    setMessages(prev => [...prev, { type: 'user', text: `📍 ${locationValue}` }])
    setLocationValue('')
    setIsTyping(true)

    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'bot',
        text: `✅ Service Appointment Confirmed!\n\n📅 Date: ${selectedDate.day}, ${selectedDate.month} ${selectedDate.date}, 2026\n⏰ Time: ${selectedTime}\n📍 Location: Your submitted address\n👨‍🔧 Technician: Will be assigned 1 hour before\n\nYou'll receive:\n• Confirmation SMS & email\n• Technician details 1 hour before\n• Real-time tracking when tech is en route\n\nNeed anything else?`,
        options: ["Add Another Service", "View Pricing", "That's all, thanks!"]
      }])
      setIsTyping(false)
    }, 1200)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (showLocationInput) {
        handleLocationSubmit()
      } else {
        handleSend()
      }
    }
  }

  const handleQuickAction = (action) => {
    if (action === 'history') {
      handleSend('View Service History')
    } else {
      handleSend(action)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-lg font-semibold mb-1">24/7 AI Mobile Auto Mechanic Assistant</h4>
          <p className="text-muted-foreground text-sm">Experience intelligent automotive service at your location</p>
        </div>
        <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0 gap-2">
          <Car className="w-3 h-3" />
          Mobile Service
        </Badge>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="glass-card hover-glow transition-all duration-300 hover:scale-[1.02]">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-orange-600">{metrics.servicesCompleted.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Services Completed</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover-glow transition-all duration-300 hover:scale-[1.02]">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-orange-600">{metrics.avgResponseTime} min</p>
            <p className="text-xs text-muted-foreground">Avg Response Time</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover-glow transition-all duration-300 hover:scale-[1.02]">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-orange-600">{metrics.customerRating}</p>
            <p className="text-xs text-muted-foreground">Customer Rating</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover-glow transition-all duration-300 hover:scale-[1.02]">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-orange-600">{metrics.onTimeArrival}%</p>
            <p className="text-xs text-muted-foreground">On-Time Arrival</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="bg-secondary/30 backdrop-blur-sm border-orange-200/20 h-[500px] flex flex-col">
            <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-1' : 'order-2'}`}>
                      <div className={`flex items-start gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          msg.type === 'user' 
                            ? 'bg-slate-600 text-white' 
                            : 'bg-gradient-to-br from-orange-500 to-red-600 text-white'
                        }`}>
                          {msg.type === 'user' ? <User className="w-4 h-4" /> : <Car className="w-4 h-4" />}
                        </div>
                        <div className={`rounded-2xl px-4 py-3 ${
                          msg.type === 'user' 
                            ? 'bg-slate-600 text-white' 
                            : 'bg-card border border-orange-200/30 shadow-sm'
                        }`}>
                          <p className="text-sm whitespace-pre-line">{msg.text}</p>
                          
                          {msg.diagnosis && (
                            <div className={`mt-3 p-2 rounded-lg text-xs ${
                              msg.diagnosis.urgency === 'high' 
                                ? 'bg-red-100 text-red-800 border border-red-300' 
                                : msg.diagnosis.urgency === 'moderate'
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-green-100 text-green-800 border border-green-300'
                            }`}>
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="w-3 h-3" />
                                <span className="font-medium">{msg.diagnosis.recommendation}</span>
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
                                  className="w-full justify-start text-left h-auto py-2 px-3 text-xs hover:bg-orange-50 hover:border-orange-300 transition-colors"
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
                    <div className="bg-card border border-orange-200/30 rounded-2xl p-4 shadow-sm">
                      <p className="text-sm font-medium mb-3">Select a Date:</p>
                      <div className="flex gap-2 flex-wrap">
                        {availableDates.map((date, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            className="flex flex-col h-auto py-2 px-3 hover:bg-orange-50 hover:border-orange-400 transition-colors"
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
                    <div className="bg-card border border-orange-200/30 rounded-2xl p-4 shadow-sm">
                      <p className="text-sm font-medium mb-3">Select a Time:</p>
                      <div className="grid grid-cols-3 gap-2">
                        {availableTimes.map((time, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            size="sm"
                            className="hover:bg-orange-50 hover:border-orange-400 transition-colors"
                            onClick={() => handleTimeSelect(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Location Input */}
                {showLocationInput && (
                  <div className="flex justify-start">
                    <div className="bg-card border border-orange-200/30 rounded-2xl p-4 shadow-sm w-full max-w-md">
                      <p className="text-sm font-medium mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-orange-500" />
                        Enter Your Location:
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={locationValue}
                          onChange={(e) => setLocationValue(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="123 Main St, City, State"
                          className="flex-1 p-2 bg-background border border-orange-200/30 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm"
                        />
                        <Button 
                          onClick={handleLocationSubmit}
                          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                        >
                          <Navigation className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">We'll come to your home, office, or anywhere!</p>
                    </div>
                  </div>
                )}

                {/* Pricing Display */}
                {showPricing && (
                  <div className="flex justify-start">
                    <div className="bg-card border border-orange-200/30 rounded-2xl p-4 shadow-sm w-full max-w-lg">
                      <p className="text-sm font-medium mb-3 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-orange-500" />
                        Service Pricing Menu
                      </p>
                      <div className="grid gap-2">
                        {pricingData.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 bg-secondary/30 rounded-lg hover:bg-orange-50 transition-colors">
                            <div className="flex items-center gap-2">
                              <span>{item.icon}</span>
                              <span className="text-sm">{item.service}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-semibold text-orange-600">{item.price}</span>
                              <span className="text-xs text-muted-foreground ml-2">({item.time})</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Technician Dispatch Status */}
                {showDispatch && (
                  <div className="flex justify-start">
                    <div className="bg-card border border-orange-200/30 rounded-2xl p-4 shadow-sm w-full max-w-md">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium flex items-center gap-2">
                          <Navigation className="w-4 h-4 text-orange-500" />
                          Technician En Route
                        </p>
                        <Badge className="bg-green-100 text-green-800 border-green-300">{technicianInfo.status}</Badge>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg mb-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-2xl">
                          {technicianInfo.photo}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{technicianInfo.name}</p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span>{technicianInfo.rating}</span>
                            <span>({technicianInfo.reviews} reviews)</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Specialties: {technicianInfo.specialties.join(', ')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="p-2 bg-orange-50 rounded-lg">
                          <p className="text-xs text-muted-foreground">ETA</p>
                          <p className="font-semibold text-orange-600">{technicianInfo.eta}</p>
                        </div>
                        <div className="p-2 bg-orange-50 rounded-lg">
                          <p className="text-xs text-muted-foreground">Distance</p>
                          <p className="font-semibold text-orange-600">{technicianInfo.distance}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 p-2 bg-secondary/30 rounded-lg text-xs">
                        <p><strong>Vehicle:</strong> {technicianInfo.vehicle}</p>
                        <p><strong>License:</strong> {technicianInfo.plate}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Service History Display */}
                {showHistory && (
                  <div className="flex justify-start">
                    <div className="bg-card border border-orange-200/30 rounded-2xl p-4 shadow-sm w-full max-w-lg">
                      <p className="text-sm font-medium mb-3 flex items-center gap-2">
                        <History className="w-4 h-4 text-orange-500" />
                        Service History
                      </p>
                      <div className="space-y-2">
                        {serviceHistory.map((record, idx) => (
                          <div key={idx} className="p-3 bg-secondary/30 rounded-lg hover:bg-orange-50 transition-colors">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">{record.service}</span>
                              <span className="text-sm font-semibold text-orange-600">{record.cost}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{record.date} • {record.vehicle}</span>
                              <div className="flex items-center gap-1">
                                <span>Tech: {record.technician}</span>
                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                <span>{record.rating}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {isTyping && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white">
                      <Car className="w-4 h-4" />
                    </div>
                    <div className="bg-card border border-orange-200/30 rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
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
                  placeholder="Describe your vehicle issue or ask a question..."
                  className="flex-1 p-3 bg-background border border-orange-200/30 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm"
                />
                <Button 
                  onClick={() => handleSend()} 
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
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
          <Card className="glass-card border-orange-200/20">
            <CardContent className="p-4">
              <h5 className="font-semibold mb-3 text-sm flex items-center gap-2">
                <Wrench className="w-4 h-4 text-orange-500" />
                Quick Actions
              </h5>
              <div className="space-y-2">
                {[
                  { icon: Calendar, text: 'Schedule Service', action: 'Schedule Service' },
                  { icon: Gauge, text: 'Get Diagnosis', action: 'Get Diagnosis' },
                  { icon: DollarSign, text: 'View Pricing', action: 'View Pricing' },
                  { icon: Navigation, text: 'Track Technician', action: 'Track Technician' }
                ].map((item, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2 hover:bg-orange-50 hover:border-orange-300 transition-colors"
                    onClick={() => handleQuickAction(item.action)}
                  >
                    <item.icon className="w-4 h-4 text-orange-500" />
                    {item.text}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Service History Quick View */}
          <Card className="glass-card border-orange-200/20">
            <CardContent className="p-4">
              <h5 className="font-semibold mb-3 text-sm flex items-center gap-2">
                <History className="w-4 h-4 text-orange-500" />
                Recent Services
              </h5>
              <div className="space-y-2">
                {serviceHistory.slice(0, 3).map((record, idx) => (
                  <div key={idx} className="p-2 bg-secondary/30 rounded-lg text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-medium truncate">{record.service}</span>
                      <span className="text-orange-600">{record.cost}</span>
                    </div>
                    <span className="text-muted-foreground">{record.date}</span>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                onClick={() => handleQuickAction('View Service History')}
              >
                View All History
              </Button>
            </CardContent>
          </Card>

          {/* AI Capabilities */}
          <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30">
            <CardContent className="p-4">
              <h5 className="font-semibold mb-3 text-sm">AI Capabilities</h5>
              <div className="space-y-2">
                {[
                  { icon: CheckCircle2, text: '24/7 Availability' },
                  { icon: Gauge, text: 'Smart Diagnostics' },
                  { icon: MapPin, text: 'Mobile Service' },
                  { icon: Clock, text: 'Real-time Tracking' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <item.icon className="w-4 h-4 text-orange-500" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AutoMechanicDemo
