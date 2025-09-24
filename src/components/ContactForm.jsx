import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { submitContactForm } from '../api/contact.js'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    industry: '',
    budgetRange: '',
    projectDescription: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // null, 'success', 'error'
  const [statusMessage, setStatusMessage] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.projectDescription) {
      setSubmitStatus('error')
      setStatusMessage('Please fill in all required fields.')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error')
      setStatusMessage('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)
    
    try {
      const result = await submitContactForm(formData)
      
      if (result.success) {
        setSubmitStatus('success')
        setStatusMessage(result.message)
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          company: '',
          website: '',
          industry: '',
          budgetRange: '',
          projectDescription: ''
        })
      } else {
        setSubmitStatus('error')
        setStatusMessage(result.message)
      }
    } catch (error) {
      setSubmitStatus('error')
      setStatusMessage('There was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses = "w-full p-3 text-base bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-foreground placeholder-muted-foreground tap-target"
  const labelClasses = "block text-sm font-medium mb-2 text-foreground"

  return (
    <Card className="glass-card">
      <CardContent className="p-8">
        <form noValidate onSubmit={handleSubmit} className="space-y-6">
          {/* Status Message */}
          {submitStatus && (
            <div className={`p-4 rounded-lg flex items-center space-x-3 ${
              submitStatus === 'success' 
                ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                : 'bg-red-500/10 border border-red-500/20 text-red-400'
            }`}>
              {submitStatus === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <p className="text-sm">{statusMessage}</p>
            </div>
          )}

          {/* Name and Email Row */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className={labelClasses}>
                Name *
              </label>
              <input 
                type="text" 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={inputClasses}
                placeholder="Your name"
                autoComplete="name"
                enterKeyHint="next"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClasses}>
                Email *
              </label>
              <input 
                type="email" 
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={inputClasses}
                placeholder="your@email.com"
                autoComplete="email"
                inputMode="email"
                enterKeyHint="next"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Company and Website Row */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="company" className={labelClasses}>
                Company
              </label>
              <input 
                type="text" 
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className={inputClasses}
                placeholder="Your company"
                autoComplete="organization"
                enterKeyHint="next"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="website" className={labelClasses}>
                Website
              </label>
              <input 
                type="url" 
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className={inputClasses}
                placeholder="https://yourwebsite.com"
                autoComplete="url"
                inputMode="url"
                enterKeyHint="next"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Industry and Budget Row */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="industry" className={labelClasses}>
                Industry
              </label>
              <select 
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className={inputClasses}
                disabled={isSubmitting}
              >
                <option value="">Select industry</option>
                <option value="home-services">Home Services</option>
                <option value="healthcare">Healthcare & Med-Spa</option>
                <option value="industrial">Industrial & Water Treatment</option>
                <option value="restaurants">Restaurants</option>
                <option value="agencies">Digital Agencies</option>
                <option value="education">Education</option>
                <option value="finance">Finance & Banking</option>
                <option value="retail">Retail & E-commerce</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="real-estate">Real Estate</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="budgetRange" className={labelClasses}>
                Budget Range
              </label>
              <select 
                id="budgetRange"
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleInputChange}
                className={inputClasses}
                disabled={isSubmitting}
              >
                <option value="">Select budget</option>
                <option value="5k-15k">$5k - $15k</option>
                <option value="15k-30k">$15k - $30k</option>
                <option value="30k-50k">$30k - $50k</option>
                <option value="50k-100k">$50k - $100k</option>
                <option value="100k+">$100k+</option>
                <option value="discuss">Let's discuss</option>
              </select>
            </div>
          </div>

          {/* Project Description */}
          <div>
            <label htmlFor="projectDescription" className={labelClasses}>
              What do you want to build? *
            </label>
            <textarea 
              id="projectDescription"
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleInputChange}
              className={`${inputClasses} h-32 resize-none`}
              placeholder="Tell us about your AI project ideas, challenges, or goals. What specific problems are you looking to solve? What outcomes are you hoping to achieve?"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* File Upload (Optional) */}
          <div>
            <label htmlFor="file" className={labelClasses}>
              Attach files (optional)
            </label>
            <input 
              type="file" 
              id="file"
              name="file"
              className={`${inputClasses} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90`}
              multiple
              accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
              disabled={isSubmitting}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Accepted formats: PDF, DOC, DOCX, TXT, PNG, JPG (Max 10MB)
            </p>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full vectorik-gradient hover-glow text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                Sending Message...
              </>
            ) : (
              <>
                Send Message
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>

          {/* Privacy Note */}
          <p className="text-xs text-muted-foreground text-center">
            By submitting this form, you agree to our privacy policy. 
            We'll only use your information to respond to your inquiry and provide relevant updates about our services.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

export default ContactForm
