import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Send, 
  Bot, 
  User, 
  Droplets, 
  TreeDeciduous, 
  Home, 
  Wrench, 
  Calendar, 
  DollarSign,
  Clock,
  Star,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Phone,
  Leaf,
  Snowflake,
  Sun,
  CloudRain
} from 'lucide-react'

const PlumberLandscapingDemo = () => {
  const [activeService, setActiveService] = useState('plumbing')
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      text: "Welcome to HomeServe Pro! I'm your 24/7 AI Plumber & Landscaping Assistant. How can I help you today?",
      options: [
        "Schedule Service",
        "Emergency Plumbing",
        "Get Project Quote",
        "View Seasonal Deals"
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
  const [showQuoteWizard, setShowQuoteWizard] = useState(false)
  const [projectDescription, setProjectDescription] = useState('')
  const [showSeasonalDeals, setShowSeasonalDeals] = useState(false)
  const [metrics, setMetrics] = useState({
    jobsCompleted: 2847,
    responseTime: 18,
    customerRating: 4.9,
    propertiesServed: 1256
  })
  const messagesEndRef = useRef(null)

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

  const seasonalDeals = {
    plumbing: [
      { name: 'Winter Pipe Protection', discount: '20% OFF', description: 'Insulation & freeze prevention', price: '$149', icon: '🔧' },
      { name: 'Water Heater Tune-Up', discount: '15% OFF', description: 'Full inspection & flush', price: '$89', icon: '🔥' },
      { name: 'Drain Cleaning Bundle', discount: '25% OFF', description: '3 drains for price of 2', price: '$179', icon: '🚿' }
    ],
    landscaping: [
      { name: 'Spring Cleanup Package', discount: '30% OFF', description: 'Debris removal, mulching, edging', price: '$249', icon: '🌸' },
      { name: 'Lawn Care Subscription', discount: 'First Month Free', description: 'Weekly mowing & trimming', price: '$99/mo', icon: '🌿' },
      { name: 'Garden Design Consultation', discount: '$50 OFF', description: 'Professional landscape planning', price: '$149', icon: '🏡' }
    ]
  }

  const emergencyServices = [
    { name: 'Burst Pipe Repair', response: '30 min', price: 'From $199', urgency: 'critical' },
    { name: 'Severe Leak', response: '45 min', price: 'From $149', urgency: 'high' },
    { name: 'Clogged Drain/Toilet', response: '1 hr', price: 'From $99', urgency: 'medium' },
    { name: 'No Hot Water', response: '2 hrs', price: 'From $129', urgency: 'medium' }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getServiceGradient = () => {
    return activeService === 'plumbing' 
      ? 'from-blue-500 to-cyan-600' 
      : 'from-green-500 to-emerald-600'
  }

  const getServiceColor = () => {
    return activeService === 'plumbing' ? 'blue' : 'green'
  }

  const responses = {
    "schedule service": {
      text: `I'd be happy to help you schedule a ${activeService} service! First, please select your preferred date:`,
      showDatePicker: true,
      options: []
    },
    "emergency plumbing": {
      text: "🚨 Emergency Plumbing Service\n\nWe understand plumbing emergencies are stressful. Our technicians are standing by 24/7.\n\nPlease select your emergency type:",
      options: [
        "Burst Pipe - URGENT",
        "Severe Leak",
        "Clogged Drain/Toilet",
        "No Hot Water"
      ]
    },
    "get project quote": {
      text: `📋 Project Estimation Wizard\n\nI'll help you get an accurate quote for your ${activeService} project. Please describe your project in detail:\n\n• What work needs to be done?\n• Approximate area/scope\n• Any special requirements?`,
      showQuoteWizard: true,
      options: []
    },
    "view seasonal deals": {
      text: `🎉 Current ${activeService === 'plumbing' ? 'Plumbing' : 'Landscaping'} Seasonal Offers\n\nTake advantage of our limited-time deals:`,
      showSeasonalDeals: true,
      options: []
    },
    "burst pipe - urgent": {
      text: "🚨 URGENT: Burst Pipe Emergency\n\n⏱️ Estimated Response: 30 minutes\n💰 Starting Price: $199\n\n📞 A technician is being dispatched immediately!\n\nWhile you wait:\n1. Turn off main water valve\n2. Open faucets to drain pipes\n3. Move valuables away from water\n\nPlease confirm your address:",
      showAddressInput: true,
      options: [],
      emergency: { type: 'burst_pipe', urgency: 'critical' }
    },
    "severe leak": {
      text: "🔴 Severe Leak Emergency\n\n⏱️ Estimated Response: 45 minutes\n💰 Starting Price: $149\n\nOur emergency team will locate and stop the leak quickly.\n\nPlease describe the leak location and provide your address:",
      showAddressInput: true,
      options: [],
      emergency: { type: 'leak', urgency: 'high' }
    },
    "clogged drain/toilet": {
      text: "🟡 Clogged Drain/Toilet Service\n\n⏱️ Estimated Response: 1 hour\n💰 Starting Price: $99\n\nWe'll have you flowing freely again in no time!\n\nPlease provide your service address:",
      showAddressInput: true,
      options: [],
      emergency: { type: 'clog', urgency: 'medium' }
    },
    "no hot water": {
      text: "🟡 No Hot Water Service\n\n⏱️ Estimated Response: 2 hours\n💰 Starting Price: $129\n\nWe'll diagnose and repair your water heater issue.\n\nPlease provide your address to schedule:",
      showAddressInput: true,
      options: [],
      emergency: { type: 'water_heater', urgency: 'medium' }
    },
    "spring cleanup package": {
      text: "🌸 Spring Cleanup Package Selected!\n\n✅ Debris & leaf removal\n✅ Mulch application (up to 5 yards)\n✅ Bed edging & cleanup\n✅ Shrub trimming\n✅ Lawn dethatching\n\n💰 Special Price: $249 (30% OFF)\n📅 Usually completed in 4-6 hours\n\nWould you like to schedule this service?",
      options: ["Schedule Now", "Customize Package", "Get Quote for Larger Property"]
    },
    "lawn care subscription": {
      text: "🌿 Lawn Care Subscription\n\n✅ Weekly mowing & trimming\n✅ Edge maintenance\n✅ Clipping cleanup\n✅ Monthly fertilization\n✅ Seasonal adjustments\n\n💰 First Month FREE, then $99/month\n📅 Cancel anytime\n\nReady to start your subscription?",
      options: ["Start Subscription", "View Other Plans", "Ask a Question"]
    },
    "winter pipe protection": {
      text: "🔧 Winter Pipe Protection Package\n\n✅ Pipe insulation installation\n✅ Outdoor faucet covers\n✅ Heating cable installation\n✅ Vulnerability assessment\n✅ Emergency prevention tips\n\n💰 Special Price: $149 (20% OFF)\n⏱️ Service time: 2-3 hours\n\nPerfect for preventing costly winter damage!",
      options: ["Schedule Installation", "Learn More", "Back to Deals"]
    },
    "water heater tune-up": {
      text: "🔥 Water Heater Tune-Up\n\n✅ Full system inspection\n✅ Tank flush & sediment removal\n✅ Anode rod check\n✅ Thermostat calibration\n✅ Safety valve test\n✅ Efficiency assessment\n\n💰 Special Price: $89 (15% OFF)\n⏱️ Service time: 1 hour\n\nExtend your water heater's life by years!",
      options: ["Schedule Tune-Up", "Learn More", "Back to Deals"]
    },
    "drain cleaning bundle": {
      text: "🚿 Drain Cleaning Bundle\n\n✅ 3 drains cleaned for price of 2\n✅ Professional snake service\n✅ Camera inspection included\n✅ Prevention tips\n✅ 30-day guarantee\n\n💰 Special Price: $179 (25% OFF)\n⏱️ Service time: 1-2 hours\n\nPerfect for kitchen, bathroom & laundry drains!",
      options: ["Schedule Cleaning", "Add More Drains", "Back to Deals"]
    },
    "schedule now": {
      text: "Perfect! Let's get you scheduled. Please select your preferred date:",
      showDatePicker: true,
      options: []
    },
    "start subscription": {
      text: "Excellent choice! 🌿 Let's set up your lawn care subscription.\n\nPlease select a start date for your first service:",
      showDatePicker: true,
      options: []
    },
    "schedule installation": {
      text: "Great! Let's schedule your installation. Please select your preferred date:",
      showDatePicker: true,
      options: []
    },
    "schedule tune-up": {
      text: "Perfect! Let's schedule your water heater tune-up. Please select a date:",
      showDatePicker: true,
      options: []
    },
    "schedule cleaning": {
      text: "Excellent! Let's schedule your drain cleaning. Please select a date:",
      showDatePicker: true,
      options: []
    },
    "that's all, thanks!": {
      text: "You're welcome! 🏠 Thank you for choosing HomeServe Pro.\n\nWe're available 24/7 for all your plumbing and landscaping needs. Take care!",
      options: []
    },
    "default": {
      text: `I understand. Let me help you with that.\n\nHere's what I can assist with for ${activeService === 'plumbing' ? 'plumbing' : 'landscaping'}:\n\n• 📅 Schedule a service appointment\n• 🚨 Emergency plumbing assistance\n• 💰 Get a project quote\n• 🎉 View seasonal deals\n\nPlease select an option or describe your needs.`,
      options: ["Schedule Service", "Emergency Plumbing", "Get Project Quote", "View Seasonal Deals"]
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
    setShowQuoteWizard(false)
    setShowSeasonalDeals(false)

    setTimeout(() => {
      const response = responses[message.toLowerCase()] || responses.default
      
      if (response.showDatePicker) setShowDatePicker(true)
      if (response.showAddressInput) setShowAddressInput(true)
      if (response.showQuoteWizard) setShowQuoteWizard(true)
      if (response.showSeasonalDeals) setShowSeasonalDeals(true)

      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: response.text,
        options: response.options,
        emergency: response.emergency
      }])
      
      setMetrics(prev => ({
        ...prev,
        jobsCompleted: prev.jobsCompleted + 1
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
        text: `Great! ${date.day}, ${date.month} ${date.date} is available. Please select your preferred time:`,
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
        text: `Perfect! ${time} on ${selectedDate.day}, ${selectedDate.month} ${selectedDate.date}.\n\nPlease provide your property address:`,
        options: []
      }])
      setIsTyping(false)
    }, 800)
  }

  const handleAddressSubmit = () => {
    if (!addressValue.trim()) return
    
    setShowAddressInput(false)
    setMessages(prev => [...prev, { type: 'user', text: `📍 ${addressValue}` }])
    setAddressValue('')
    setIsTyping(true)

    setTimeout(() => {
      const serviceType = activeService === 'plumbing' ? 'Plumbing' : 'Landscaping'
      setMessages(prev => [...prev, {
        type: 'bot',
        text: `✅ ${serviceType} Service Confirmed!\n\n📅 Date: ${selectedDate?.day}, ${selectedDate?.month} ${selectedDate?.date}, 2026\n⏰ Time: ${selectedTime}\n📍 Location: Your submitted address\n👨‍🔧 Technician: Will be assigned 1 hour before\n\nYou'll receive:\n• Confirmation SMS & email\n• Technician details 1 hour before\n• Real-time tracking when tech is en route\n\nNeed anything else?`,
        options: ["Schedule Another Service", "View Seasonal Deals", "That's all, thanks!"]
      }])
      
      setMetrics(prev => ({
        ...prev,
        propertiesServed: prev.propertiesServed + 1
      }))
      
      setIsTyping(false)
    }, 1200)
  }

  const handleQuoteSubmit = () => {
    if (!projectDescription.trim()) return
    
    setShowQuoteWizard(false)
    setMessages(prev => [...prev, { type: 'user', text: projectDescription }])
    setProjectDescription('')
    setIsTyping(true)

    setTimeout(() => {
      const estimates = activeService === 'plumbing' 
        ? {
            low: '$350',
            high: '$750',
            time: '2-4 hours',
            items: ['Materials & parts', 'Labor', 'Cleanup', 'Warranty included']
          }
        : {
            low: '$500',
            high: '$1,200',
            time: '1-2 days',
            items: ['Plants & materials', 'Labor', 'Site cleanup', 'Follow-up care guide']
          }
      
      setMessages(prev => [...prev, {
        type: 'bot',
        text: `📊 AI-Generated Project Estimate\n\nBased on your description, here's your preliminary quote:\n\n💰 Estimated Cost: ${estimates.low} - ${estimates.high}\n⏱️ Estimated Time: ${estimates.time}\n\n✅ Includes:\n${estimates.items.map(item => `• ${item}`).join('\n')}\n\n📝 Note: Final quote provided on-site after assessment.\n\nWould you like to schedule a free consultation?`,
        options: ["Schedule Free Consultation", "Get More Details", "Submit Another Project"]
      }])
      setIsTyping(false)
    }, 1500)
  }

  const handleSeasonalDealSelect = (deal) => {
    handleSend(deal.name.toLowerCase())
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (showAddressInput) {
        handleAddressSubmit()
      } else if (showQuoteWizard) {
        handleQuoteSubmit()
      } else {
        handleSend()
      }
    }
  }

  const handleServiceToggle = (service) => {
    setActiveService(service)
    setMessages([{
      type: 'bot',
      text: `Switched to ${service === 'plumbing' ? 'Plumbing' : 'Landscaping'} services! 🏠\n\nHow can I help you with your ${service} needs today?`,
      options: service === 'plumbing' 
        ? ["Schedule Service", "Emergency Plumbing", "Get Project Quote", "View Seasonal Deals"]
        : ["Schedule Service", "Get Project Quote", "View Seasonal Deals", "Lawn Care Plans"]
    }])
  }

  const handleQuickAction = (action) => {
    handleSend(action)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-lg font-semibold mb-1">24/7 AI Mobile Plumber & Landscaping Assistant</h4>
          <p className="text-muted-foreground text-sm">Experience intelligent home service automation</p>
        </div>
        <Badge className={`bg-gradient-to-r ${getServiceGradient()} text-white border-0 gap-2`}>
          {activeService === 'plumbing' ? <Droplets className="w-3 h-3" /> : <TreeDeciduous className="w-3 h-3" />}
          24/7 Service
        </Badge>
      </div>

      {/* Service Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-lg bg-secondary/50 p-1">
          <Button
            variant={activeService === 'plumbing' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleServiceToggle('plumbing')}
            className={`gap-2 ${activeService === 'plumbing' ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white' : ''}`}
          >
            <Droplets className="w-4 h-4" />
            Plumbing
          </Button>
          <Button
            variant={activeService === 'landscaping' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleServiceToggle('landscaping')}
            className={`gap-2 ${activeService === 'landscaping' ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' : ''}`}
          >
            <TreeDeciduous className="w-4 h-4" />
            Landscaping
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="glass-card hover-glow transition-all duration-300 hover:scale-[1.02]">
          <CardContent className="p-4 text-center">
            <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${getServiceGradient()} flex items-center justify-center`}>
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <p className={`text-2xl font-bold text-${getServiceColor()}-600`}>{metrics.jobsCompleted.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Jobs Completed</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover-glow transition-all duration-300 hover:scale-[1.02]">
          <CardContent className="p-4 text-center">
            <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${getServiceGradient()} flex items-center justify-center`}>
              <Clock className="w-5 h-5 text-white" />
            </div>
            <p className={`text-2xl font-bold text-${getServiceColor()}-600`}>{metrics.responseTime} min</p>
            <p className="text-xs text-muted-foreground">Response Time</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover-glow transition-all duration-300 hover:scale-[1.02]">
          <CardContent className="p-4 text-center">
            <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${getServiceGradient()} flex items-center justify-center`}>
              <Star className="w-5 h-5 text-white" />
            </div>
            <p className={`text-2xl font-bold text-${getServiceColor()}-600`}>{metrics.customerRating}</p>
            <p className="text-xs text-muted-foreground">Customer Rating</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover-glow transition-all duration-300 hover:scale-[1.02]">
          <CardContent className="p-4 text-center">
            <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${getServiceGradient()} flex items-center justify-center`}>
              <Home className="w-5 h-5 text-white" />
            </div>
            <p className={`text-2xl font-bold text-${getServiceColor()}-600`}>{metrics.propertiesServed.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Properties Served</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className={`bg-secondary/30 backdrop-blur-sm border-${getServiceColor()}-200/20 h-[500px] flex flex-col`}>
            <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-1' : 'order-2'}`}>
                      <div className={`flex items-start gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          msg.type === 'user' 
                            ? 'bg-slate-600 text-white' 
                            : `bg-gradient-to-br ${getServiceGradient()} text-white`
                        }`}>
                          {msg.type === 'user' ? <User className="w-4 h-4" /> : (activeService === 'plumbing' ? <Droplets className="w-4 h-4" /> : <TreeDeciduous className="w-4 h-4" />)}
                        </div>
                        <div className={`rounded-2xl px-4 py-3 ${
                          msg.type === 'user' 
                            ? 'bg-slate-600 text-white' 
                            : `bg-card border border-${getServiceColor()}-200/30 shadow-sm`
                        }`}>
                          <p className="text-sm whitespace-pre-line">{msg.text}</p>
                          
                          {msg.emergency && (
                            <div className={`mt-3 p-2 rounded-lg text-xs ${
                              msg.emergency.urgency === 'critical' 
                                ? 'bg-red-100 text-red-800 border border-red-300' 
                                : msg.emergency.urgency === 'high'
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                            }`}>
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="w-3 h-3" />
                                <span className="font-medium">Priority: {msg.emergency.urgency.toUpperCase()}</span>
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
                                  className={`w-full justify-start text-left h-auto py-2 px-3 text-xs hover:bg-${getServiceColor()}-50 hover:border-${getServiceColor()}-300 transition-colors`}
                                  onClick={() => handleSend(option)}
                                >
                                  {option}
                                </Button>
                              ))}
                            </div>
                          )}
                          
                          {msg.type === 'bot' && idx > 0 && (
                            <div className="flex items-center gap-2 mt-3 pt-2 border-t border-border/50">
                              <span className="text-xs text-muted-foreground">Helpful?</span>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:text-green-500">
                                <ThumbsUp className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:text-red-500">
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
                    <div className="max-w-[80%]">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getServiceGradient()} flex items-center justify-center flex-shrink-0`}>
                          <Calendar className="w-4 h-4 text-white" />
                        </div>
                        <div className={`bg-card border border-${getServiceColor()}-200/30 rounded-2xl p-4 shadow-sm`}>
                          <p className="text-sm font-medium mb-3">Select a Date:</p>
                          <div className="grid grid-cols-5 gap-2">
                            {availableDates.map((date, idx) => (
                              <Button
                                key={idx}
                                variant="outline"
                                size="sm"
                                className={`flex flex-col h-auto py-2 hover:bg-${getServiceColor()}-50 hover:border-${getServiceColor()}-300`}
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
                    </div>
                  </div>
                )}

                {/* Time Picker */}
                {showTimePicker && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%]">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getServiceGradient()} flex items-center justify-center flex-shrink-0`}>
                          <Clock className="w-4 h-4 text-white" />
                        </div>
                        <div className={`bg-card border border-${getServiceColor()}-200/30 rounded-2xl p-4 shadow-sm`}>
                          <p className="text-sm font-medium mb-3">Select a Time:</p>
                          <div className="grid grid-cols-3 gap-2">
                            {availableTimes.map((time, idx) => (
                              <Button
                                key={idx}
                                variant="outline"
                                size="sm"
                                className={`hover:bg-${getServiceColor()}-50 hover:border-${getServiceColor()}-300`}
                                onClick={() => handleTimeSelect(time)}
                              >
                                {time}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Address Input */}
                {showAddressInput && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%]">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getServiceGradient()} flex items-center justify-center flex-shrink-0`}>
                          <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <div className={`bg-card border border-${getServiceColor()}-200/30 rounded-2xl p-4 shadow-sm`}>
                          <p className="text-sm font-medium mb-3">Enter Property Address:</p>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={addressValue}
                              onChange={(e) => setAddressValue(e.target.value)}
                              onKeyPress={handleKeyPress}
                              placeholder="123 Main St, City, State"
                              className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background"
                            />
                            <Button 
                              size="sm" 
                              onClick={handleAddressSubmit}
                              className={`bg-gradient-to-r ${getServiceGradient()}`}
                            >
                              <Send className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quote Wizard */}
                {showQuoteWizard && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%]">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getServiceGradient()} flex items-center justify-center flex-shrink-0`}>
                          <DollarSign className="w-4 h-4 text-white" />
                        </div>
                        <div className={`bg-card border border-${getServiceColor()}-200/30 rounded-2xl p-4 shadow-sm`}>
                          <p className="text-sm font-medium mb-3">Describe Your Project:</p>
                          <div className="space-y-2">
                            <textarea
                              value={projectDescription}
                              onChange={(e) => setProjectDescription(e.target.value)}
                              placeholder={activeService === 'plumbing' 
                                ? "E.g., Need to replace bathroom faucet and fix slow drain..."
                                : "E.g., Looking to install new flower beds and trim hedges..."
                              }
                              className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background min-h-[80px]"
                            />
                            <Button 
                              size="sm" 
                              onClick={handleQuoteSubmit}
                              className={`w-full bg-gradient-to-r ${getServiceGradient()}`}
                            >
                              Get AI Quote Estimate
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Seasonal Deals */}
                {showSeasonalDeals && (
                  <div className="flex justify-start">
                    <div className="max-w-[90%]">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getServiceGradient()} flex items-center justify-center flex-shrink-0`}>
                          <Sun className="w-4 h-4 text-white" />
                        </div>
                        <div className={`bg-card border border-${getServiceColor()}-200/30 rounded-2xl p-4 shadow-sm`}>
                          <div className="grid gap-3">
                            {seasonalDeals[activeService].map((deal, idx) => (
                              <div 
                                key={idx} 
                                className={`p-3 rounded-lg border border-${getServiceColor()}-200/30 hover:bg-${getServiceColor()}-50/30 cursor-pointer transition-all`}
                                onClick={() => handleSeasonalDealSelect(deal)}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xl">{deal.icon}</span>
                                    <span className="font-medium text-sm">{deal.name}</span>
                                  </div>
                                  <Badge className={`bg-gradient-to-r ${getServiceGradient()} text-white border-0 text-xs`}>
                                    {deal.discount}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">{deal.description}</p>
                                <p className={`text-sm font-bold text-${getServiceColor()}-600 mt-1`}>{deal.price}</p>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 pt-3 border-t border-border/50">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                              onClick={() => handleSend("Schedule Service")}
                            >
                              Schedule a Service
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getServiceGradient()} flex items-center justify-center`}>
                        {activeService === 'plumbing' ? <Droplets className="w-4 h-4 text-white" /> : <TreeDeciduous className="w-4 h-4 text-white" />}
                      </div>
                      <div className={`bg-card border border-${getServiceColor()}-200/30 rounded-2xl px-4 py-3 shadow-sm`}>
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
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
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background"
                />
                <Button 
                  size="sm" 
                  onClick={() => handleSend()}
                  className={`rounded-full px-4 bg-gradient-to-r ${getServiceGradient()}`}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Quick Actions & Info */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <Card className={`glass-card border-${getServiceColor()}-200/20`}>
            <CardContent className="p-4">
              <h5 className="font-semibold mb-3 flex items-center gap-2">
                <Wrench className={`w-4 h-4 text-${getServiceColor()}-600`} />
                Quick Actions
              </h5>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`w-full justify-start gap-2 hover:bg-${getServiceColor()}-50 hover:border-${getServiceColor()}-300`}
                  onClick={() => handleQuickAction('Schedule Service')}
                >
                  <Calendar className="w-4 h-4" />
                  Schedule Service
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start gap-2 hover:bg-red-50 hover:border-red-300 text-red-600"
                  onClick={() => handleQuickAction('Emergency Plumbing')}
                >
                  <AlertTriangle className="w-4 h-4" />
                  Emergency Plumbing
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`w-full justify-start gap-2 hover:bg-${getServiceColor()}-50 hover:border-${getServiceColor()}-300`}
                  onClick={() => handleQuickAction('Get Project Quote')}
                >
                  <DollarSign className="w-4 h-4" />
                  Get Project Quote
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`w-full justify-start gap-2 hover:bg-${getServiceColor()}-50 hover:border-${getServiceColor()}-300`}
                  onClick={() => handleQuickAction('View Seasonal Deals')}
                >
                  <Sun className="w-4 h-4" />
                  View Seasonal Deals
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Info (Plumbing only) */}
          {activeService === 'plumbing' && (
            <Card className="glass-card border-red-200/30 bg-red-50/30">
              <CardContent className="p-4">
                <h5 className="font-semibold mb-3 flex items-center gap-2 text-red-600">
                  <Phone className="w-4 h-4" />
                  Emergency Services
                </h5>
                <div className="space-y-2">
                  {emergencyServices.map((service, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <span className="font-medium">{service.name}</span>
                      <Badge variant="outline" className={`text-xs ${
                        service.urgency === 'critical' ? 'border-red-300 text-red-600' :
                        service.urgency === 'high' ? 'border-amber-300 text-amber-600' :
                        'border-yellow-300 text-yellow-600'
                      }`}>
                        {service.response}
                      </Badge>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-red-600 mt-3 font-medium">📞 24/7 Emergency Line Available</p>
              </CardContent>
            </Card>
          )}

          {/* Seasonal Info (Landscaping only) */}
          {activeService === 'landscaping' && (
            <Card className="glass-card border-green-200/30 bg-green-50/30">
              <CardContent className="p-4">
                <h5 className="font-semibold mb-3 flex items-center gap-2 text-green-600">
                  <Leaf className="w-4 h-4" />
                  Seasonal Services
                </h5>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Snowflake className="w-3 h-3 text-blue-500" />
                    <span>Winter: Snow removal, tree pruning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="w-3 h-3 text-yellow-500" />
                    <span>Spring: Cleanup, mulching, planting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TreeDeciduous className="w-3 h-3 text-green-500" />
                    <span>Summer: Lawn care, irrigation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CloudRain className="w-3 h-3 text-gray-500" />
                    <span>Fall: Leaf removal, winterizing</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Service Guarantee */}
          <Card className={`glass-card border-${getServiceColor()}-200/20`}>
            <CardContent className="p-4">
              <h5 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 text-${getServiceColor()}-600`} />
                Our Guarantee
              </h5>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                  Licensed & Insured Professionals
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                  Upfront Pricing - No Surprises
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                  100% Satisfaction Guaranteed
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                  24/7 Customer Support
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PlumberLandscapingDemo
