import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Send, Bot, User, Loader2 } from 'lucide-react'

const ChatbotDemo = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm your AI sales assistant. I can help you learn about our services, schedule consultations, and answer questions. What brings you here today?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const predefinedResponses = {
    'pricing': "Our AI solutions start at $5,000 for basic implementations. For enterprise solutions, we typically see investments of $25,000-$100,000+ depending on complexity. Would you like me to schedule a consultation to discuss your specific needs?",
    'services': "We offer 8 core AI solutions: Sales Chatbots, Voice Receptionists, Document Intelligence, RAG Knowledge Systems, KPI Dashboards, Ticket Deflection, Quote Automation, and Field Tech Support. Which area interests you most?",
    'demo': "I'd be happy to show you a personalized demo! What type of business are you in? This helps me tailor the demonstration to your specific use case.",
    'timeline': "Most of our AI implementations take 2-4 weeks for basic solutions, and 6-12 weeks for complex enterprise systems. We always start with a 30-day pilot to prove ROI before full deployment.",
    'roi': "Our clients typically see 25-40% improvement in lead conversion, 50-70% reduction in response times, and 30-60% decrease in operational costs. The average ROI is 300-500% within the first year.",
    'integration': "Our AI solutions integrate with 200+ platforms including Salesforce, HubSpot, Zendesk, Slack, Microsoft Teams, and most CRM/ERP systems. We use APIs and webhooks for seamless data flow.",
    'support': "We provide 24/7 technical support, dedicated account management, and ongoing optimization. All clients get access to our monitoring dashboard and monthly performance reports.",
    'security': "All our AI systems are SOC 2 compliant with end-to-end encryption, PII redaction, audit trails, and GDPR compliance. We can deploy on-premise or in your private cloud for maximum security."
  }

  const getResponse = (input) => {
    const lowerInput = input.toLowerCase()
    
    if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('pricing')) {
      return predefinedResponses.pricing
    }
    if (lowerInput.includes('service') || lowerInput.includes('solution') || lowerInput.includes('what do you')) {
      return predefinedResponses.services
    }
    if (lowerInput.includes('demo') || lowerInput.includes('show me') || lowerInput.includes('see')) {
      return predefinedResponses.demo
    }
    if (lowerInput.includes('time') || lowerInput.includes('long') || lowerInput.includes('timeline')) {
      return predefinedResponses.timeline
    }
    if (lowerInput.includes('roi') || lowerInput.includes('return') || lowerInput.includes('benefit')) {
      return predefinedResponses.roi
    }
    if (lowerInput.includes('integrat') || lowerInput.includes('connect') || lowerInput.includes('api')) {
      return predefinedResponses.integration
    }
    if (lowerInput.includes('support') || lowerInput.includes('help') || lowerInput.includes('maintenance')) {
      return predefinedResponses.support
    }
    if (lowerInput.includes('security') || lowerInput.includes('safe') || lowerInput.includes('privacy')) {
      return predefinedResponses.security
    }
    
    // Default responses for common greetings and general questions
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return "Hello! Great to meet you. I'm here to help you understand how our AI solutions can transform your business. What specific challenges are you looking to solve?"
    }
    
    if (lowerInput.includes('thank') || lowerInput.includes('thanks')) {
      return "You're very welcome! Is there anything else you'd like to know about our AI solutions? I'm here to help!"
    }
    
    // Fallback response
    return "That's a great question! Our AI solutions are designed to solve complex business challenges. Could you tell me more about your specific situation? Or would you prefer to speak with one of our AI specialists? I can schedule a consultation for you."
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: getResponse(inputValue),
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000) // Random delay between 1-2 seconds
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickQuestions = [
    "What services do you offer?",
    "How much does it cost?",
    "Can I see a demo?",
    "What's the ROI?",
    "How long does implementation take?"
  ]

  const handleQuickQuestion = (question) => {
    setInputValue(question)
  }

  return (
    <div className="flex flex-col h-[500px] md:h-[600px] bg-background border border-border rounded-lg overflow-hidden">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-primary to-accent p-3 md:p-4 text-white">
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 md:w-6 md:h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-sm md:text-base">AI Sales Assistant</h3>
            <p className="text-xs md:text-sm opacity-90">Online • Avg response: 0.3s</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-[85%] md:max-w-[80%] ${
              message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'user' 
                  ? 'bg-primary text-white' 
                  : 'bg-secondary text-foreground'
              }`}>
                {message.type === 'user' ? (
                  <User className="w-3 h-3 md:w-4 md:h-4" />
                ) : (
                  <Bot className="w-3 h-3 md:w-4 md:h-4" />
                )}
              </div>
              <div className={`rounded-lg p-2 md:p-3 ${
                message.type === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-secondary text-foreground'
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2 max-w-[85%] md:max-w-[80%]">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <Bot className="w-3 h-3 md:w-4 md:h-4" />
              </div>
              <div className="bg-secondary rounded-lg p-2 md:p-3">
                <div className="flex items-center space-x-1">
                  <Loader2 className="w-3 h-3 md:w-4 md:h-4 animate-spin" />
                  <span className="text-sm">AI is typing...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      <div className="border-t border-border p-3">
        <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
        <div className="flex flex-wrap gap-1 md:gap-2">
          {quickQuestions.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs h-8 md:h-7 px-2 md:px-3 tap-target"
              onClick={() => handleQuickQuestion(question)}
            >
              <span className="hidden sm:inline">{question}</span>
              <span className="sm:hidden">
                {question.split(' ').slice(0, 2).join(' ')}...
              </span>
            </Button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-3 md:p-4">
        <div className="flex space-x-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about our AI solutions..."
            className="flex-1 resize-none border border-border rounded-lg px-3 py-3 md:py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent min-h-[44px] md:min-h-[auto]"
            rows="1"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="px-3 min-h-[44px] min-w-[44px] md:min-h-[auto] md:min-w-[auto]"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          This is a demo. In production, this would connect to your CRM and knowledge base.
        </p>
      </div>
    </div>
  )
}

export default ChatbotDemo
