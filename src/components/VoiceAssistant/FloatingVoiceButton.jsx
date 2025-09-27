import React, { useState, useEffect } from 'react'
import { Phone, X, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { createCallbackRequest, trackVoiceEvent } from './RetellWebCall'

const FloatingVoiceButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    agreeToTerms: false
  })

  // Track when voice button is viewed
  useEffect(() => {
    trackVoiceEvent('voice_button_viewed', {
      page_url: window.location.href,
      timestamp: new Date().toISOString()
    })
  }, [])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear error when user starts typing
    if (status === 'error') {
      setStatus('idle')
      setErrorMessage('')
    }
  }

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setErrorMessage('First name is required')
      return false
    }
    if (!formData.lastName.trim()) {
      setErrorMessage('Last name is required')
      return false
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Phone number is required')
      return false
    }
    if (!formData.agreeToTerms) {
      setErrorMessage('Please agree to the privacy policy')
      return false
    }
    
    // Basic phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      setErrorMessage('Please enter a valid phone number')
      return false
    }
    
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      setStatus('error')
      return
    }

    setIsLoading(true)
    setStatus('loading')
    setErrorMessage('')

    try {
      trackVoiceEvent('callback_request_started', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone.substring(0, 3) + '***', // Privacy-safe logging
        timestamp: new Date().toISOString()
      })

      // Use the new callback request system with multiple fallbacks
      const result = await createCallbackRequest({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone
      })
      
      setStatus('success')
      trackVoiceEvent('callback_request_success', {
        method: result.method,
        call_id: result.call_id,
        timestamp: new Date().toISOString()
      })

      // Auto-close after success
      setTimeout(() => {
        setIsOpen(false)
        setStatus('idle')
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          agreeToTerms: false
        })
      }, 4000) // Slightly longer to let user read success message

    } catch (error) {
      console.error('Callback request failed:', error)
      setStatus('error')
      setErrorMessage(error.message || 'Failed to submit callback request. Please try again.')
      
      trackVoiceEvent('callback_request_error', {
        error: error.message,
        timestamp: new Date().toISOString()
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setStatus('idle')
    setErrorMessage('')
    trackVoiceEvent('voice_widget_closed', {
      timestamp: new Date().toISOString()
    })
  }

  const handleOpen = () => {
    setIsOpen(true)
    trackVoiceEvent('voice_widget_opened', {
      timestamp: new Date().toISOString()
    })
  }

  return (
    <>
      {/* Floating Voice Button with Enhanced Animations */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Attention-grabbing pulse ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 animate-ping"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse"></div>
        
        <Button
          onClick={handleOpen}
          className="w-16 h-16 rounded-full vektar-gradient hover-glow shadow-lg border-0 group relative overflow-hidden tap-target animate-bounce"
          style={{
            animationDuration: '3s',
            animationIterationCount: 'infinite',
            animationDelay: '2s'
          }}
          size="lg"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <Phone className="w-6 h-6 text-white relative z-10 animate-pulse" />
          <span className="sr-only">Request a callback from Vektar AI</span>
        </Button>
        
        {/* Enhanced Green "Live" Tooltip - Always Visible - Mobile Optimized */}
        <div className="absolute -top-1 -right-1 z-10">
          <div className="bg-green-500 text-white px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold shadow-lg animate-pulse">
            <div className="flex items-center gap-0.5 sm:gap-1">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full animate-ping"></div>
              <span className="leading-none">LIVE</span>
            </div>
          </div>
        </div>
        
        {/* Enhanced Tooltip with Live Indicator on Hover - Mobile Optimized */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-card text-card-foreground px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm shadow-lg border border-border relative max-w-[280px] sm:max-w-none">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0"></div>
              <span className="font-medium leading-tight">🔥 Live AI Expert Available - Click to Connect!</span>
            </div>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border"></div>
          </div>
        </div>
      </div>

      {/* Voice Call Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <Card className="glass-card w-full max-w-md mx-auto animate-in fade-in-0 zoom-in-95 duration-300">
            <CardHeader className="relative">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <div className="w-12 h-12 vektar-gradient rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg sm:text-xl font-bold whitespace-nowrap">
                        One on One Call With Vektar
                      </CardTitle>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs bg-green-400 text-green-900 px-2 py-0.5 rounded-full font-semibold animate-pulse whitespace-nowrap">
                          LIVE
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Get instant answers in under 2 minutes</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="h-8 w-8 p-0 hover:bg-secondary/50 flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {status === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 vektar-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Request Submitted!</h3>
                  <p className="text-muted-foreground">
                    We'll call you at {formData.phone} within the next 2 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="bg-background/50 border-border focus:border-primary"
                        placeholder="John"
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="bg-background/50 border-border focus:border-primary"
                        placeholder="Doe"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-background/50 border-border focus:border-primary"
                      placeholder="+1 (555) 000-0000"
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                      disabled={isLoading}
                      className="mt-1"
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed cursor-pointer">
                      I agree to receive a call from Vektar and consent to the processing of my personal data in accordance with the{' '}
                      <a href="/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                        privacy policy
                      </a>
                      .
                    </Label>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center space-x-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                      <p className="text-sm text-destructive">{errorMessage}</p>
                    </div>
                  )}

                  <div className="flex space-x-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClose}
                      className="flex-1"
                      disabled={isLoading}
                    >
                      Maybe Later
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 vektar-gradient hover-glow"
                      disabled={isLoading || !formData.agreeToTerms}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Requesting...
                        </>
                      ) : (
                        'Call Me Now'
                      )}
                    </Button>
                  </div>
                </form>
              )}

              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Free consultation • No spam • Secure & private
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

export default FloatingVoiceButton
