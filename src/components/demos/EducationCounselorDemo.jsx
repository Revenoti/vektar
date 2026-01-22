import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Send, Bot, User, GraduationCap, BookOpen, Calendar, Award, Clock, CheckCircle2, DollarSign, FileText, Users, TrendingUp } from 'lucide-react'

const EducationCounselorDemo = () => {
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      text: "Hello! I'm your AI Education Counselor, available 24/7. How can I assist you with your academic journey today?",
      options: [
        "Find courses for my major",
        "Help me plan my schedule",
        "Check graduation requirements",
        "Apply for financial aid"
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [activeView, setActiveView] = useState('chat')
  const [enrollmentStep, setEnrollmentStep] = useState(1)
  const [metrics, setMetrics] = useState({
    studentsHelped: 1247,
    coursesRecommended: 3892,
    enrollmentsCompleted: 892,
    satisfactionRate: 98
  })
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const recommendedCourses = [
    { code: 'CS 301', name: 'Data Structures', credits: 3, time: 'MWF 10:00-10:50', seats: 12, rating: 4.8 },
    { code: 'MATH 250', name: 'Linear Algebra', credits: 4, time: 'TTh 1:00-2:20', seats: 8, rating: 4.5 },
    { code: 'ENG 201', name: 'Technical Writing', credits: 3, time: 'MWF 2:00-2:50', seats: 15, rating: 4.6 },
    { code: 'PHYS 202', name: 'Physics II', credits: 4, time: 'TTh 9:00-10:20', seats: 5, rating: 4.3 }
  ]

  const scheduleData = [
    { day: 'Monday', classes: [
      { time: '10:00 AM', course: 'CS 301 - Data Structures', room: 'Tech 204' },
      { time: '2:00 PM', course: 'ENG 201 - Technical Writing', room: 'Arts 112' }
    ]},
    { day: 'Tuesday', classes: [
      { time: '9:00 AM', course: 'PHYS 202 - Physics II', room: 'Science 301' },
      { time: '1:00 PM', course: 'MATH 250 - Linear Algebra', room: 'Math 105' }
    ]},
    { day: 'Wednesday', classes: [
      { time: '10:00 AM', course: 'CS 301 - Data Structures', room: 'Tech 204' },
      { time: '2:00 PM', course: 'ENG 201 - Technical Writing', room: 'Arts 112' }
    ]},
    { day: 'Thursday', classes: [
      { time: '9:00 AM', course: 'PHYS 202 - Physics II', room: 'Science 301' },
      { time: '1:00 PM', course: 'MATH 250 - Linear Algebra', room: 'Math 105' }
    ]},
    { day: 'Friday', classes: [
      { time: '10:00 AM', course: 'CS 301 - Data Structures', room: 'Tech 204' },
      { time: '2:00 PM', course: 'ENG 201 - Technical Writing', room: 'Arts 112' }
    ]}
  ]

  const academicProgress = {
    gpa: 3.72,
    creditsCompleted: 87,
    creditsRequired: 120,
    majorProgress: 75,
    coreProgress: 90
  }

  const responses = {
    "find courses for my major": {
      text: "I've analyzed your academic record and degree requirements. Based on your Computer Science major and current progress, here are my top course recommendations for next semester:\n\n📚 CS 301 - Data Structures (Required)\n📊 MATH 250 - Linear Algebra (Prerequisite for AI courses)\n✍️ ENG 201 - Technical Writing (Core requirement)\n⚛️ PHYS 202 - Physics II (Science elective)\n\nWould you like me to show you the full course catalog or help you enroll?",
      options: ["Show course details", "Help me enroll", "Check prerequisites"],
      action: () => setActiveView('courses')
    },
    "help me plan my schedule": {
      text: "I've created an optimized schedule based on your course selections and preferences. Here's your proposed schedule:\n\n⏰ Morning classes: 2 days/week\n📅 Balanced workload across the week\n🚶 10+ minutes between classes for travel\n\nTotal: 14 credits across 4 courses\n\nWould you like to adjust anything?",
      options: ["View full schedule", "Suggest alternatives", "Lock in schedule"],
      action: () => setActiveView('schedule')
    },
    "check graduation requirements": {
      text: "I've reviewed your academic progress toward graduation:\n\n✅ Core Requirements: 90% complete\n✅ Major Requirements: 75% complete\n📊 GPA: 3.72 (Dean's List eligible!)\n📈 Credits: 87/120 completed\n\nYou're on track to graduate in Spring 2027! Here's what you still need:\n• 2 upper-level CS electives\n• 1 science lab course\n• Capstone project",
      options: ["View detailed progress", "Plan remaining courses", "Meet with advisor"],
      action: () => setActiveView('progress')
    },
    "apply for financial aid": {
      text: "I can help you with financial aid! Based on your profile, you may be eligible for:\n\n💰 Merit Scholarship: $5,000/year\n📚 Department Grant: $2,500/semester\n💼 Work-Study: Up to $3,000/year\n\nThe FAFSA deadline is March 1st. Would you like me to start your application?",
      options: ["Start FAFSA application", "View scholarship options", "Calculate costs"],
      action: () => setEnrollmentStep(1)
    },
    "show course details": {
      text: "Here are the detailed course offerings:\n\n📚 CS 301 - Data Structures\n   Prof. Johnson | MWF 10:00-10:50 | 12 seats left | ⭐ 4.8\n\n📊 MATH 250 - Linear Algebra  \n   Prof. Chen | TTh 1:00-2:20 | 8 seats left | ⭐ 4.5\n\n✍️ ENG 201 - Technical Writing\n   Prof. Williams | MWF 2:00-2:50 | 15 seats left | ⭐ 4.6\n\nWould you like to add any of these to your cart?",
      options: ["Add CS 301", "Add all courses", "Check alternatives"]
    },
    "help me enroll": {
      text: "Great! I'll guide you through the enrollment process. I've added your recommended courses to your cart.\n\n📋 Enrollment Cart:\n• CS 301 - Data Structures (3 credits)\n• MATH 250 - Linear Algebra (4 credits)\n• ENG 201 - Technical Writing (3 credits)\n• PHYS 202 - Physics II (4 credits)\n\nTotal: 14 credits | Estimated tuition: $7,840\n\nReady to proceed?",
      options: ["Confirm enrollment", "Modify cart", "Check holds"],
      action: () => setEnrollmentStep(2)
    },
    "confirm enrollment": {
      text: "🎉 Congratulations! Your enrollment is complete!\n\n✅ 4 courses successfully enrolled\n✅ 14 credits confirmed\n✅ Confirmation email sent\n\nYour enrollment confirmation number is: ENR-2026-78432\n\nIs there anything else I can help you with?",
      options: ["View my schedule", "Print confirmation", "Start new request"],
      action: () => {
        setEnrollmentStep(4)
        setMetrics(prev => ({
          ...prev,
          enrollmentsCompleted: prev.enrollmentsCompleted + 1
        }))
      }
    },
    "default": {
      text: "I understand you have questions about your academic journey. Let me help you explore your options:\n\n🎓 I can assist with:\n• Course selection and registration\n• Schedule planning and optimization\n• Graduation requirements tracking\n• Financial aid applications\n\nWhat would you like to focus on?",
      options: ["Find courses", "Plan schedule", "Check requirements", "Financial aid"]
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
      setMetrics(prev => ({
        ...prev,
        studentsHelped: prev.studentsHelped + 1
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

  const QuickActions = () => (
    <div className="grid grid-cols-2 gap-2">
      {[
        { icon: BookOpen, label: 'Find Courses', action: () => handleSend('Find courses for my major') },
        { icon: Calendar, label: 'Plan Schedule', action: () => handleSend('Help me plan my schedule') },
        { icon: FileText, label: 'Check Requirements', action: () => handleSend('Check graduation requirements') },
        { icon: DollarSign, label: 'Financial Aid', action: () => handleSend('Apply for financial aid') }
      ].map((item, idx) => (
        <Button
          key={idx}
          variant="outline"
          className="h-auto py-3 px-3 flex flex-col items-center gap-2 hover:bg-blue-500/10 hover:border-blue-500/50 transition-all"
          onClick={item.action}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <item.icon className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs font-medium">{item.label}</span>
        </Button>
      ))}
    </div>
  )

  const EnrollmentWizard = () => (
    <Card className="bg-secondary/30 backdrop-blur-sm border-blue-500/20">
      <CardContent className="p-4">
        <h5 className="font-semibold mb-4 text-sm flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-blue-500" />
          Enrollment Progress
        </h5>
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                enrollmentStep >= step 
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {enrollmentStep > step ? <CheckCircle2 className="w-4 h-4" /> : step}
              </div>
              {step < 4 && (
                <div className={`w-8 h-1 ${enrollmentStep > step ? 'bg-blue-500' : 'bg-muted'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-xs text-muted-foreground text-center">
          {['Select Courses', 'Review Cart', 'Confirm Details', 'Complete'][enrollmentStep - 1]}
        </div>
      </CardContent>
    </Card>
  )

  const CourseRecommendations = () => (
    <Card className="bg-secondary/30 backdrop-blur-sm border-blue-500/20">
      <CardContent className="p-4">
        <h5 className="font-semibold mb-3 text-sm flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-500" />
          Recommended Courses
        </h5>
        <div className="space-y-2">
          {recommendedCourses.map((course, idx) => (
            <div 
              key={idx} 
              className="p-3 bg-background/50 rounded-lg hover:bg-blue-500/10 transition-all cursor-pointer border border-transparent hover:border-blue-500/30"
              onClick={() => {
                setMetrics(prev => ({...prev, coursesRecommended: prev.coursesRecommended + 1}))
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">{course.code}</span>
                <Badge variant="outline" className="text-xs">{course.credits} cr</Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{course.name}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-3 h-3" /> {course.time}
                </span>
                <span className="flex items-center gap-1 text-amber-500">
                  ⭐ {course.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const ScheduleView = () => (
    <Card className="bg-secondary/30 backdrop-blur-sm border-blue-500/20">
      <CardContent className="p-4">
        <h5 className="font-semibold mb-3 text-sm flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-500" />
          Weekly Schedule
        </h5>
        <div className="space-y-3 max-h-[280px] overflow-y-auto">
          {scheduleData.map((day, idx) => (
            <div key={idx}>
              <p className="text-xs font-medium text-muted-foreground mb-1">{day.day}</p>
              <div className="space-y-1">
                {day.classes.map((cls, clsIdx) => (
                  <div key={clsIdx} className="flex items-center gap-2 p-2 bg-background/50 rounded-md text-xs">
                    <span className="text-blue-500 font-medium w-16">{cls.time}</span>
                    <span className="flex-1 truncate">{cls.course}</span>
                    <span className="text-muted-foreground">{cls.room}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const AcademicProgress = () => (
    <Card className="bg-secondary/30 backdrop-blur-sm border-blue-500/20">
      <CardContent className="p-4">
        <h5 className="font-semibold mb-3 text-sm flex items-center gap-2">
          <Award className="w-4 h-4 text-blue-500" />
          Academic Progress
        </h5>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">GPA</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
              {academicProgress.gpa}
            </span>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span>Credits Completed</span>
              <span>{academicProgress.creditsCompleted}/{academicProgress.creditsRequired}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all"
                style={{ width: `${(academicProgress.creditsCompleted / academicProgress.creditsRequired) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span>Major Requirements</span>
              <span>{academicProgress.majorProgress}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all"
                style={{ width: `${academicProgress.majorProgress}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span>Core Requirements</span>
              <span>{academicProgress.coreProgress}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-violet-600 rounded-full transition-all"
                style={{ width: `${academicProgress.coreProgress}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-lg font-semibold mb-1">AI Education Counselor Demo</h4>
          <p className="text-muted-foreground text-sm">24/7 intelligent academic guidance and enrollment assistance</p>
        </div>
        <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 gap-2">
          <GraduationCap className="w-3 h-3" />
          24/7 Available
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Students Helped', value: metrics.studentsHelped.toLocaleString(), icon: Users, color: 'from-blue-500 to-indigo-600' },
          { label: 'Courses Recommended', value: metrics.coursesRecommended.toLocaleString(), icon: BookOpen, color: 'from-green-500 to-emerald-600' },
          { label: 'Enrollments Completed', value: metrics.enrollmentsCompleted.toLocaleString(), icon: CheckCircle2, color: 'from-purple-500 to-violet-600' },
          { label: 'Satisfaction Rate', value: `${metrics.satisfactionRate}%`, icon: TrendingUp, color: 'from-amber-500 to-orange-600' }
        ].map((metric, idx) => (
          <Card key={idx} className="bg-secondary/30 backdrop-blur-sm hover:bg-secondary/50 transition-all">
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
                            : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                        }`}>
                          {msg.type === 'user' ? <User className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
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
                                  className="w-full justify-start text-left h-auto py-2 px-3 text-xs hover:bg-blue-500/10 hover:border-blue-500/50"
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
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                      <GraduationCap className="w-4 h-4" />
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
                  placeholder="Ask about courses, schedules, or enrollment..."
                  className="flex-1 p-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <Button onClick={() => handleSend()} className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <QuickActions />
          <EnrollmentWizard />
          
          {activeView === 'courses' && <CourseRecommendations />}
          {activeView === 'schedule' && <ScheduleView />}
          {activeView === 'progress' && <AcademicProgress />}
          
          {activeView === 'chat' && (
            <Card className="bg-secondary/30 backdrop-blur-sm border-blue-500/20">
              <CardContent className="p-4">
                <h5 className="font-semibold mb-3 text-sm">AI Capabilities</h5>
                <div className="space-y-2">
                  {[
                    { icon: BookOpen, text: 'Smart Course Matching' },
                    { icon: Calendar, text: 'Schedule Optimization' },
                    { icon: Award, text: 'Progress Tracking' },
                    { icon: Clock, text: '24/7 Availability' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <item.icon className="w-4 h-4 text-blue-500" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default EducationCounselorDemo
