import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Send, 
  Bot, 
  User, 
  Heart, 
  Calendar, 
  Stethoscope, 
  Shield, 
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  Pill,
  Activity,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react'

const HealthcareReceptionistDemo = () => {
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      text: "Welcome to MedCare Clinic! I'm your 24/7 AI Healthcare Receptionist. How can I assist you today?",
      options: [
        "Schedule Appointment",
        "Check Symptoms",
        "Verify Insurance",
        "Request Prescription Refill"
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [insuranceStatus, setInsuranceStatus] = useState(null)
  const [metrics, setMetrics] = useState({
    patientsHelped: 127,
    avgWaitTime: 4,
    appointmentsBooked: 43,
    satisfactionScore: 98
  })
  const messagesEndRef = useRef(null)

  const waitingPatients = [
    { name: 'Maria S.', waitTime: '5 min', reason: 'Check-up', priority: 'normal' },
    { name: 'James T.', waitTime: '12 min', reason: 'Follow-up', priority: 'normal' },
    { name: 'Emily R.', waitTime: '3 min', reason: 'Urgent Care', priority: 'high' },
    { name: 'Robert K.', waitTime: '8 min', reason: 'Lab Results', priority: 'normal' }
  ]

  const availableDates = [
    { day: 'Mon', date: '27', month: 'Jan' },
    { day: 'Tue', date: '28', month: 'Jan' },
    { day: 'Wed', date: '29', month: 'Jan' },
    { day: 'Thu', date: '30', month: 'Jan' },
    { day: 'Fri', date: '31', month: 'Jan' }
  ]

  const availableTimes = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const responses = {
    "schedule appointment": {
      text: "I'd be happy to help you schedule an appointment! Please select your preferred date:",
      showDatePicker: true,
      options: []
    },
    "check symptoms": {
      text: "I can help assess your symptoms. Please describe what you're experiencing, or select from common symptoms below:",
      options: [
        "Headache & Fatigue",
        "Fever & Chills",
        "Cough & Congestion",
        "Stomach Pain"
      ]
    },
    "verify insurance": {
      text: "I'll verify your insurance coverage. Please provide your insurance ID or select your provider:",
      options: [
        "BlueCross BlueShield",
        "Aetna",
        "UnitedHealthcare",
        "Cigna"
      ]
    },
    "request prescription refill": {
      text: "I can help with your prescription refill request. Please provide the medication name or select from your recent prescriptions:",
      options: [
        "Lisinopril 10mg",
        "Metformin 500mg",
        "Atorvastatin 20mg",
        "View All Prescriptions"
      ]
    },
    "headache & fatigue": {
      text: "I understand you're experiencing headache and fatigue. Let me ask a few questions:\n\n1. How long have you had these symptoms?\n2. On a scale of 1-10, how severe is your headache?\n3. Have you had any recent changes in sleep or stress levels?\n\nBased on your symptoms, this appears to be low-to-moderate urgency. Would you like to schedule an appointment or speak with a nurse?",
      options: ["Schedule with Doctor", "Speak with Nurse", "Get Self-Care Tips"],
      triageResult: { level: 'moderate', recommendation: 'Schedule within 2-3 days' }
    },
    "fever & chills": {
      text: "Fever and chills could indicate an infection. Let me gather more information:\n\n🌡️ Current Temperature Reading?\n⏰ When did symptoms start?\n💊 Any other symptoms?\n\n⚠️ If your fever is above 103°F or you have difficulty breathing, please seek immediate care.",
      options: ["High Fever (>103°F)", "Moderate Fever (100-103°F)", "Low Fever (<100°F)"],
      triageResult: { level: 'elevated', recommendation: 'Same-day appointment recommended' }
    },
    "cough & congestion": {
      text: "For cough and congestion, I need to assess severity:\n\n• Is the cough dry or producing mucus?\n• Any difficulty breathing?\n• How long have you had these symptoms?\n\nThis helps determine if you need in-person care or can manage symptoms at home.",
      options: ["Dry Cough", "Productive Cough", "Difficulty Breathing"],
      triageResult: { level: 'low', recommendation: 'Self-care with follow-up if worsening' }
    },
    "stomach pain": {
      text: "Stomach pain can have various causes. Please help me understand:\n\n📍 Location of pain (upper, lower, left, right)?\n⏱️ Constant or intermittent?\n🍽️ Related to eating?\n\nThis information helps prioritize your care needs.",
      options: ["Severe/Sharp Pain", "Mild Discomfort", "Nausea/Vomiting"],
      triageResult: { level: 'moderate', recommendation: 'Appointment within 24-48 hours' }
    },
    "bluecross blueshield": {
      text: "✅ Insurance Verified!\n\n📋 BlueCross BlueShield\n👤 Member ID: ****4521\n📅 Coverage: Active\n💰 Copay: $25 (Office Visit)\n🏥 In-Network: MedCare Clinic - Yes\n\nYour insurance is accepted at our clinic. Would you like to schedule an appointment?",
      options: ["Schedule Appointment", "View Coverage Details", "That's all, thanks!"],
      verifyInsurance: { status: 'verified', provider: 'BlueCross BlueShield' }
    },
    "aetna": {
      text: "✅ Insurance Verified!\n\n📋 Aetna\n👤 Member ID: ****8732\n📅 Coverage: Active\n💰 Copay: $30 (Office Visit)\n🏥 In-Network: MedCare Clinic - Yes\n\nYour Aetna insurance is accepted. How can I assist you further?",
      options: ["Schedule Appointment", "View Coverage Details", "That's all, thanks!"],
      verifyInsurance: { status: 'verified', provider: 'Aetna' }
    },
    "unitedhealthcare": {
      text: "✅ Insurance Verified!\n\n📋 UnitedHealthcare\n👤 Member ID: ****6195\n📅 Coverage: Active\n💰 Copay: $20 (Office Visit)\n🏥 In-Network: MedCare Clinic - Yes\n\nYou're all set! What would you like to do next?",
      options: ["Schedule Appointment", "View Coverage Details", "That's all, thanks!"],
      verifyInsurance: { status: 'verified', provider: 'UnitedHealthcare' }
    },
    "cigna": {
      text: "✅ Insurance Verified!\n\n📋 Cigna\n👤 Member ID: ****3847\n📅 Coverage: Active\n💰 Copay: $25 (Office Visit)\n🏥 In-Network: MedCare Clinic - Yes\n\nCigna coverage confirmed. How may I help you today?",
      options: ["Schedule Appointment", "View Coverage Details", "That's all, thanks!"],
      verifyInsurance: { status: 'verified', provider: 'Cigna' }
    },
    "lisinopril 10mg": {
      text: "📋 Prescription Refill Request\n\n💊 Medication: Lisinopril 10mg\n📅 Last Filled: January 10, 2026\n🔄 Refills Remaining: 3\n\n✅ Refill request submitted! Your prescription will be ready for pickup in 2-4 hours at MedCare Pharmacy.\n\nWould you like a reminder notification when it's ready?",
      options: ["Yes, notify me", "No thanks", "Request another refill"]
    },
    "metformin 500mg": {
      text: "📋 Prescription Refill Request\n\n💊 Medication: Metformin 500mg\n📅 Last Filled: January 5, 2026\n🔄 Refills Remaining: 5\n\n✅ Processing your refill! Expected ready time: 3-4 hours.\n\nShould I add any other medications to this refill?",
      options: ["Add another medication", "That's all", "Delivery options"]
    },
    "that's all, thanks!": {
      text: "You're welcome! 😊 Thank you for choosing MedCare Clinic.\n\nRemember, I'm available 24/7 if you need any assistance. Stay healthy!",
      options: []
    },
    "default": {
      text: "I understand. Let me help you with that.\n\nHere are some things I can assist with:\n\n• 📅 Schedule appointments\n• 🩺 Symptom assessment\n• 🛡️ Insurance verification\n• 💊 Prescription refills\n\nPlease select an option or describe what you need.",
      options: ["Schedule Appointment", "Check Symptoms", "Verify Insurance", "Request Prescription Refill"]
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

    setTimeout(() => {
      const response = responses[message.toLowerCase()] || responses.default
      
      if (response.verifyInsurance) {
        setInsuranceStatus(response.verifyInsurance)
      }
      
      if (response.showDatePicker) {
        setShowDatePicker(true)
      }

      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: response.text,
        options: response.options,
        triageResult: response.triageResult
      }])
      
      setMetrics(prev => ({
        ...prev,
        patientsHelped: prev.patientsHelped + 1
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
        text: `Great choice! ${date.day}, ${date.month} ${date.date} is available. Please select your preferred time:`,
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
      setMessages(prev => [...prev, {
        type: 'bot',
        text: `✅ Appointment Confirmed!\n\n📅 Date: ${selectedDate.day}, ${selectedDate.month} ${selectedDate.date}, 2026\n⏰ Time: ${time}\n🏥 Location: MedCare Clinic, Suite 200\n👨‍⚕️ Provider: Dr. Sarah Chen\n\nYou'll receive a confirmation text and email shortly. Would you like to add this to your calendar?`,
        options: ["Add to Calendar", "Get Directions", "Done"]
      }])
      
      setMetrics(prev => ({
        ...prev,
        appointmentsBooked: prev.appointmentsBooked + 1
      }))
      
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-lg font-semibold mb-1">24/7 AI Healthcare Receptionist</h4>
          <p className="text-muted-foreground text-sm">Experience intelligent patient care automation</p>
        </div>
        <Badge className="bg-gradient-to-r from-rose-500 to-pink-600 text-white border-0 gap-2">
          <Heart className="w-3 h-3" />
          Always Available
        </Badge>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="glass-card hover-glow transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-rose-600">{metrics.patientsHelped}</p>
            <p className="text-xs text-muted-foreground">Patients Helped Today</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover-glow transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-rose-600">{metrics.avgWaitTime} min</p>
            <p className="text-xs text-muted-foreground">Avg Wait Time</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover-glow transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-rose-600">{metrics.appointmentsBooked}</p>
            <p className="text-xs text-muted-foreground">Appointments Booked</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover-glow transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-rose-600">{metrics.satisfactionScore}%</p>
            <p className="text-xs text-muted-foreground">Satisfaction Score</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="bg-secondary/30 backdrop-blur-sm border-rose-200/20 h-[500px] flex flex-col">
            <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-1' : 'order-2'}`}>
                      <div className={`flex items-start gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          msg.type === 'user' 
                            ? 'bg-slate-600 text-white' 
                            : 'bg-gradient-to-br from-rose-500 to-pink-600 text-white'
                        }`}>
                          {msg.type === 'user' ? <User className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
                        </div>
                        <div className={`rounded-2xl px-4 py-3 ${
                          msg.type === 'user' 
                            ? 'bg-slate-600 text-white' 
                            : 'bg-card border border-rose-200/30 shadow-sm'
                        }`}>
                          <p className="text-sm whitespace-pre-line">{msg.text}</p>
                          
                          {msg.triageResult && (
                            <div className={`mt-3 p-2 rounded-lg text-xs ${
                              msg.triageResult.level === 'elevated' 
                                ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                                : msg.triageResult.level === 'moderate'
                                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                : 'bg-green-100 text-green-800 border border-green-300'
                            }`}>
                              <div className="flex items-center gap-2">
                                <AlertCircle className="w-3 h-3" />
                                <span className="font-medium">Triage: {msg.triageResult.recommendation}</span>
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
                                  className="w-full justify-start text-left h-auto py-2 px-3 text-xs hover:bg-rose-50 hover:border-rose-300 transition-colors"
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
                    <div className="bg-card border border-rose-200/30 rounded-2xl p-4 shadow-sm">
                      <p className="text-sm font-medium mb-3">Select a Date:</p>
                      <div className="flex gap-2 flex-wrap">
                        {availableDates.map((date, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            className="flex flex-col h-auto py-2 px-3 hover:bg-rose-50 hover:border-rose-400 transition-colors"
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
                    <div className="bg-card border border-rose-200/30 rounded-2xl p-4 shadow-sm">
                      <p className="text-sm font-medium mb-3">Select a Time:</p>
                      <div className="grid grid-cols-3 gap-2">
                        {availableTimes.map((time, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            size="sm"
                            className="hover:bg-rose-50 hover:border-rose-400 transition-colors"
                            onClick={() => handleTimeSelect(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {isTyping && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white">
                      <Heart className="w-4 h-4" />
                    </div>
                    <div className="bg-card border border-rose-200/30 rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
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
                  placeholder="Type your message or describe symptoms..."
                  className="flex-1 p-3 bg-background border border-rose-200/30 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent text-sm"
                />
                <Button 
                  onClick={() => handleSend()} 
                  className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white"
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
          <Card className="glass-card border-rose-200/20">
            <CardContent className="p-4">
              <h5 className="font-semibold mb-3 text-sm flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-rose-500" />
                Quick Actions
              </h5>
              <div className="space-y-2">
                {[
                  { icon: Calendar, text: 'Schedule Appointment', action: 'Schedule Appointment' },
                  { icon: Stethoscope, text: 'Check Symptoms', action: 'Check Symptoms' },
                  { icon: Shield, text: 'Verify Insurance', action: 'Verify Insurance' },
                  { icon: Pill, text: 'Prescription Refill', action: 'Request Prescription Refill' }
                ].map((item, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2 hover:bg-rose-50 hover:border-rose-300 transition-colors"
                    onClick={() => handleSend(item.action)}
                  >
                    <item.icon className="w-4 h-4 text-rose-500" />
                    <span className="text-xs">{item.text}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Insurance Status */}
          {insuranceStatus && (
            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Insurance Status</p>
                    <p className="text-sm font-semibold text-green-600">Verified</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{insuranceStatus.provider}</p>
              </CardContent>
            </Card>
          )}

          {/* Patient Queue */}
          <Card className="glass-card border-rose-200/20">
            <CardContent className="p-4">
              <h5 className="font-semibold mb-3 text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-rose-500" />
                Patient Queue
              </h5>
              <div className="space-y-3">
                {waitingPatients.map((patient, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center justify-between p-2 rounded-lg ${
                      patient.priority === 'high' 
                        ? 'bg-amber-50 border border-amber-200' 
                        : 'bg-secondary/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        patient.priority === 'high'
                          ? 'bg-amber-500 text-white'
                          : 'bg-rose-100 text-rose-600'
                      }`}>
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-medium">{patient.name}</p>
                        <p className="text-xs text-muted-foreground">{patient.reason}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {patient.waitTime}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Capabilities */}
          <Card className="glass-card border-rose-200/20">
            <CardContent className="p-4">
              <h5 className="font-semibold mb-3 text-sm">AI Capabilities</h5>
              <div className="space-y-2">
                {[
                  { icon: Clock, text: '24/7 Availability' },
                  { icon: Stethoscope, text: 'Symptom Triage' },
                  { icon: Calendar, text: 'Smart Scheduling' },
                  { icon: Shield, text: 'HIPAA Compliant' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <item.icon className="w-4 h-4 text-rose-500" />
                    <span className="text-xs">{item.text}</span>
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

export default HealthcareReceptionistDemo
