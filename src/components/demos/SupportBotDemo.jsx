import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Send, Bot, User, ThumbsUp, ThumbsDown, Ticket, CheckCircle2, Clock, TrendingDown } from 'lucide-react'

const SupportBotDemo = () => {
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      text: "Hi! I'm your AI Support Assistant. How can I help you today?",
      options: [
        "I can't log into my account",
        "How do I reset my password?",
        "I need a refund",
        "Billing question"
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [ticketsDeflected, setTicketsDeflected] = useState(0)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const responses = {
    "i can't log into my account": {
      text: "I can help with that! Here are some quick troubleshooting steps:\n\n1. Clear your browser cache and cookies\n2. Try a private/incognito window\n3. Ensure CAPS LOCK is off\n\nWould you like me to send a password reset link to your email?",
      options: ["Yes, send reset link", "Still not working", "That fixed it!"],
      deflected: true
    },
    "how do i reset my password?": {
      text: "To reset your password:\n\n1. Go to the login page\n2. Click 'Forgot Password'\n3. Enter your email address\n4. Check your inbox for the reset link\n\nI can also send you a reset link right now if you'd like!",
      options: ["Send me a reset link", "I didn't receive the email", "Thanks, that helped!"],
      deflected: true
    },
    "i need a refund": {
      text: "I understand you'd like a refund. Let me check your account...\n\n✓ Your last purchase: Premium Plan - $49.99\n✓ Purchase date: 5 days ago\n✓ Refund eligible: Yes (within 30-day policy)\n\nWould you like me to process this refund for you?",
      options: ["Yes, process refund", "I want to speak to someone", "Never mind"],
      deflected: true
    },
    "billing question": {
      text: "I can help with billing! Here's your account summary:\n\n💳 Current Plan: Professional\n📅 Next billing: Jan 28, 2026\n💰 Amount: $29/month\n\nWhat would you like to know?",
      options: ["Change my plan", "Update payment method", "Cancel subscription"],
      deflected: true
    },
    "yes, send reset link": {
      text: "Done! I've sent a password reset link to j***n@email.com. Please check your inbox.\n\n⏱️ The link expires in 30 minutes.\n\nIs there anything else I can help with?",
      options: ["I didn't receive it", "That's all, thanks!"],
      deflected: true
    },
    "that fixed it!": {
      text: "Excellent! Glad I could help resolve your login issue. 🎉\n\nIs there anything else I can assist you with today?",
      options: ["No, thanks!", "I have another question"],
      deflected: true
    },
    "thanks, that helped!": {
      text: "You're welcome! Happy to help. 😊\n\nFeel free to reach out if you have any other questions!",
      options: [],
      deflected: true
    },
    "default": {
      text: "I'm analyzing your question... Let me find the best solution for you.\n\nBased on your query, here are some relevant help articles:\n\n📚 Getting Started Guide\n📚 Account Settings FAQ\n📚 Troubleshooting Common Issues\n\nWould any of these help, or would you like to speak with a support agent?",
      options: ["View help articles", "Talk to an agent", "Ask another question"],
      deflected: false
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
      if (response.deflected) {
        setTicketsDeflected(prev => prev + 1)
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-lg font-semibold mb-1">Customer Support Bot Demo</h4>
          <p className="text-muted-foreground text-sm">Experience AI-powered customer support that resolves issues instantly</p>
        </div>
        <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 gap-2">
          <TrendingDown className="w-3 h-3" />
          -60% Ticket Volume
        </Badge>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="bg-secondary/30 h-[500px] flex flex-col">
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
                          {msg.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
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
                                  className="w-full justify-start text-left h-auto py-2 px-3 text-xs"
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
                              <Button variant="ghost" size="icon" className="w-6 h-6">
                                <ThumbsUp className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="w-6 h-6">
                                <ThumbsDown className="w-3 h-3" />
                              </Button>
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
                      <Bot className="w-4 h-4" />
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
                  placeholder="Type your message..."
                  className="flex-1 p-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
                <Button onClick={() => handleSend()} className="vektar-gradient">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-blue-500/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <Ticket className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{ticketsDeflected}</p>
                  <p className="text-xs text-muted-foreground">Tickets Deflected</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/30">
            <CardContent className="p-4">
              <h5 className="font-semibold mb-3 text-sm">AI Capabilities</h5>
              <div className="space-y-2">
                {[
                  { icon: CheckCircle2, text: 'Instant Responses' },
                  { icon: Bot, text: 'Context-Aware' },
                  { icon: Clock, text: '24/7 Availability' },
                  { icon: TrendingDown, text: 'Reduces Workload' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <item.icon className="w-4 h-4 text-primary" />
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

export default SupportBotDemo
