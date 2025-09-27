// RetellAI Web Call API Integration
const RETELL_API_BASE = 'https://api.retellai.com'

/**
 * Create a new web call using RetellAI REST API
 * @returns {Promise<Object>} Web call data including access_token and call_id
 */
export const createWebCall = async () => {
  const apiKey = import.meta.env.VITE_RETELL_API_KEY
  const agentId = import.meta.env.VITE_RETELL_AGENT_ID

  console.log('RetellAI Configuration:', {
    hasApiKey: !!apiKey,
    apiKeyPrefix: apiKey ? apiKey.substring(0, 8) + '...' : 'missing',
    agentId: agentId || 'missing'
  })

  if (!apiKey) {
    throw new Error('RetellAI API key missing. Please check VITE_RETELL_API_KEY in environment variables.')
  }

  if (!agentId) {
    throw new Error(`RetellAI Agent ID missing. Please follow these steps:

1. Go to your RetellAI dashboard (https://dashboard.retellai.com)
2. Navigate to your "Vektar AI Assistant" agent
3. Copy the Agent ID (not the LLM ID)
4. Add it to your .env file as: VITE_RETELL_AGENT_ID=your_agent_id_here
5. Restart your development server

Current LLM ID: ${import.meta.env.VITE_RETELL_LLM_ID || 'not found'}`)
  }

  try {
    console.log('Making RetellAI API call to:', `${RETELL_API_BASE}/v2/create-web-call`)
    
    const requestBody = {
      agent_id: agentId,
      metadata: {
        source: 'vektar_website',
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent
      }
    }
    
    console.log('Request body:', requestBody)

    const response = await fetch(`${RETELL_API_BASE}/v2/create-web-call`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })

    console.log('Response status:', response.status)
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error response:', errorText)
      
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { message: errorText }
      }
      
      // More specific error handling
      if (response.status === 404) {
        throw new Error(`Agent not found. Please verify the agent ID: ${agentId}`)
      } else if (response.status === 401) {
        throw new Error('Authentication failed. Please check your API key.')
      } else if (response.status === 402) {
        throw new Error('Payment required. Please check your RetellAI account billing.')
      } else if (response.status === 422) {
        throw new Error(`Invalid request: ${errorData.message || 'Please check your agent configuration'}`)
      } else {
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`)
      }
    }

    const webCallData = await response.json()
    console.log('Successful response:', webCallData)
    
    // Validate required fields
    if (!webCallData.access_token || !webCallData.call_id) {
      throw new Error('Invalid response from RetellAI API - missing required fields')
    }

    return webCallData
  } catch (error) {
    console.error('RetellAI API Error Details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    
    // Provide user-friendly error messages
    if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
      throw new Error('Network error. Please check your internet connection and try again.')
    } else {
      throw new Error(error.message || 'Failed to create voice call')
    }
  }
}

/**
 * Get call status and details
 * @param {string} callId - The call ID to check
 * @returns {Promise<Object>} Call status and details
 */
export const getCallStatus = async (callId) => {
  const apiKey = import.meta.env.VITE_RETELL_API_KEY

  if (!apiKey || !callId) {
    throw new Error('Missing API key or call ID')
  }

  try {
    const response = await fetch(`${RETELL_API_BASE}/get-call/${callId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to get call status:', error)
    throw error
  }
}

/**
 * Analytics helper to track voice assistant usage for revenue optimization
 * @param {string} event - Event name
 * @param {Object} data - Event data
 */
export const trackVoiceEvent = (event, data = {}) => {
  try {
    const timestamp = new Date().toISOString()
    const sessionId = sessionStorage.getItem('vektar_session_id') || 
                     `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    if (!sessionStorage.getItem('vektar_session_id')) {
      sessionStorage.setItem('vektar_session_id', sessionId)
    }

    const eventData = {
      event_category: 'voice_assistant',
      event_label: 'vektar_ai',
      session_id: sessionId,
      timestamp,
      page_url: window.location.href,
      user_agent: navigator.userAgent,
      ...data
    }

    // Track to console for development
    console.log('🎯 Voice Assistant Analytics:', event, eventData)
    
    // Google Analytics 4 tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', event, eventData)
    }

    // Custom analytics endpoint (add your own analytics service)
    if (window.analytics && typeof window.analytics.track === 'function') {
      window.analytics.track(event, eventData)
    }
    
    // Revenue optimization tracking
    switch (event) {
      case 'voice_button_viewed':
        // Track when users see the voice button
        console.log('💰 Revenue Tracking: Voice assistant discovered')
        break
        
      case 'call_started':
        // Track potential lead engagement
        console.log('💰 Revenue Tracking: Lead engaged with voice assistant')
        // Store engagement start time
        sessionStorage.setItem('vektar_engagement_start', timestamp)
        break
        
      case 'call_connected':
        // Track successful connection
        console.log('💰 Revenue Tracking: Voice call successfully connected')
        break
        
      case 'appointment_booked':
        // Track successful conversion - HIGH VALUE EVENT
        console.log('💰 Revenue Tracking: CONVERSION! Appointment booked via voice assistant')
        const engagementStart = sessionStorage.getItem('vektar_engagement_start')
        if (engagementStart) {
          const engagementDuration = new Date(timestamp) - new Date(engagementStart)
          console.log(`💰 Time to conversion: ${Math.round(engagementDuration / 1000)}s`)
        }
        break
        
      case 'call_ended':
        // Track call completion and duration
        const duration = data.duration || 0
        console.log(`💰 Revenue Tracking: Call completed (${duration}s duration)`)
        if (duration > 30) {
          console.log('💰 Quality engagement: Call lasted >30 seconds')
        }
        break
        
      case 'error_occurred':
        // Track errors for optimization
        console.log('⚠️ Voice Assistant Error:', data.error)
        break
    }

    // Store analytics data locally for reporting
    const analyticsData = JSON.parse(localStorage.getItem('vektar_analytics') || '[]')
    analyticsData.push({ event, data: eventData, timestamp })
    
    // Keep only last 100 events to prevent storage bloat
    if (analyticsData.length > 100) {
      analyticsData.splice(0, analyticsData.length - 100)
    }
    
    localStorage.setItem('vektar_analytics', JSON.stringify(analyticsData))
    
  } catch (error) {
    console.warn('Analytics tracking failed:', error)
  }
}

/**
 * Get analytics summary for revenue reporting
 * @returns {Object} Analytics summary
 */
export const getAnalyticsSummary = () => {
  try {
    const analyticsData = JSON.parse(localStorage.getItem('vektar_analytics') || '[]')
    const last24Hours = analyticsData.filter(item => 
      new Date(item.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)
    )

    return {
      total_events: analyticsData.length,
      last_24h_events: last24Hours.length,
      voice_button_views: analyticsData.filter(item => item.event === 'voice_button_viewed').length,
      calls_started: analyticsData.filter(item => item.event === 'call_started').length,
      calls_connected: analyticsData.filter(item => item.event === 'call_connected').length,
      appointments_booked: analyticsData.filter(item => item.event === 'appointment_booked').length,
      conversion_rate: analyticsData.filter(item => item.event === 'call_started').length > 0 
        ? (analyticsData.filter(item => item.event === 'appointment_booked').length / 
           analyticsData.filter(item => item.event === 'call_started').length * 100).toFixed(2) + '%'
        : '0%',
      last_updated: new Date().toISOString()
    }
  } catch (error) {
    console.warn('Failed to get analytics summary:', error)
    return { error: 'Failed to load analytics data' }
  }
}

/**
 * Validate environment configuration
 * @returns {Object} Configuration status
 */
export const validateConfig = () => {
  const apiKey = import.meta.env.VITE_RETELL_API_KEY
  const agentId = import.meta.env.VITE_RETELL_AGENT_ID

  return {
    isValid: !!(apiKey && agentId),
    hasApiKey: !!apiKey,
    hasAgentId: !!agentId,
    errors: [
      !apiKey && 'VITE_RETELL_API_KEY is missing',
      !agentId && 'VITE_RETELL_AGENT_ID is missing'
    ].filter(Boolean)
  }
}
