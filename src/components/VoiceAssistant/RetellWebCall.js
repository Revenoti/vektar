// RetellAI Web Call API Integration with Enhanced Error Handling
const RETELL_API_BASE = 'https://api.retellai.com'

// Global RetellWebClient reference for proper cleanup
let globalRetellClient = null

/**
 * Validate environment configuration
 * @returns {Object} Configuration status with detailed validation
 */
export const validateConfig = () => {
  const apiKey = import.meta.env.VITE_RETELL_API_KEY
  const agentId = import.meta.env.VITE_RETELL_AGENT_ID
  
  const validation = {
    isValid: false,
    hasApiKey: !!apiKey,
    hasAgentId: !!agentId,
    apiKeyFormat: false,
    environment: import.meta.env.MODE || 'development',
    errors: [],
    warnings: []
  }

  // Validate API key format
  if (apiKey) {
    validation.apiKeyFormat = apiKey.startsWith('key_') && apiKey.length > 20
    if (!validation.apiKeyFormat) {
      validation.warnings.push('API key format may be incorrect (should start with "key_")')
    }
  } else {
    validation.errors.push('VITE_RETELL_API_KEY is missing from environment variables')
  }

  // Validate Agent ID format
  if (agentId) {
    const agentIdFormat = agentId.startsWith('agent_') && agentId.length > 20
    if (!agentIdFormat) {
      validation.warnings.push('Agent ID format may be incorrect (should start with "agent_")')
    }
  } else {
    validation.errors.push('VITE_RETELL_AGENT_ID is missing from environment variables')
  }

  validation.isValid = validation.hasApiKey && validation.hasAgentId && validation.errors.length === 0

  return validation
}

/**
 * Initialize RetellAI Web SDK with proper error handling
 * @returns {Promise<Object>} RetellWebClient instance or null
 */
export const initializeRetellWebSDK = async () => {
  try {
    console.log('🔄 Attempting to load RetellAI Web SDK...')
    
    // Try to import the RetellAI Web SDK
    const retellModule = await import('retell-client-js-sdk')
    const { RetellWebClient } = retellModule
    
    if (!RetellWebClient) {
      throw new Error('RetellWebClient not found in imported module')
    }
    
    console.log('✅ RetellAI Web SDK loaded successfully')
    return RetellWebClient
  } catch (error) {
    console.warn('⚠️ Failed to load RetellAI Web SDK:', error.message)
    console.warn('This may be due to:')
    console.warn('- Network connectivity issues')
    console.warn('- Build configuration problems')
    console.warn('- Missing or corrupted package installation')
    console.warn('- Browser compatibility issues')
    return null
  }
}

/**
 * Create a new web call using RetellAI REST API with enhanced validation
 * @returns {Promise<Object>} Web call data including access_token and call_id
 */
export const createWebCall = async () => {
  // Validate configuration first
  const config = validateConfig()
  
  if (!config.isValid) {
    const errorMessage = `RetellAI Configuration Error:\n${config.errors.join('\n')}`
    console.error('❌ Configuration validation failed:', config)
    throw new Error(errorMessage)
  }

  if (config.warnings.length > 0) {
    console.warn('⚠️ Configuration warnings:', config.warnings)
  }

  const apiKey = import.meta.env.VITE_RETELL_API_KEY
  const agentId = import.meta.env.VITE_RETELL_AGENT_ID

  console.log('🎙️ Creating RetellAI web call...', {
    environment: config.environment,
    hasApiKey: config.hasApiKey,
    apiKeyFormat: config.apiKeyFormat,
    agentId: agentId ? `${agentId.substring(0, 12)}...` : 'missing'
  })

  try {
    const requestBody = {
      agent_id: agentId,
      metadata: {
        source: 'vektar_website',
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        environment: config.environment,
        sdk_version: '2.0.7'
      }
    }

    console.log('📡 Making API request to:', `${RETELL_API_BASE}/v2/create-web-call`)

    const response = await fetch(`${RETELL_API_BASE}/v2/create-web-call`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Vektar-Voice-Assistant/1.0'
      },
      body: JSON.stringify(requestBody)
    })

    console.log('📊 API Response:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ API Error Response:', errorText)
      
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { message: errorText }
      }
      
      // Enhanced error handling with specific solutions
      switch (response.status) {
        case 401:
          throw new Error('Authentication failed. Please verify your API key is correct and active.')
        case 402:
          throw new Error('Payment required. Please check your RetellAI account billing and subscription status.')
        case 404:
          throw new Error(`Agent not found. Please verify agent ID "${agentId}" exists and is published in your RetellAI dashboard.`)
        case 422:
          throw new Error(`Invalid request: ${errorData.message || 'Please check your agent configuration and ensure it\'s properly set up.'}`)
        case 429:
          throw new Error('Rate limit exceeded. Please wait a moment and try again.')
        case 500:
          throw new Error('RetellAI service temporarily unavailable. Please try again in a few moments.')
        default:
          throw new Error(errorData.message || `API Error (${response.status}): ${response.statusText}`)
      }
    }

    const webCallData = await response.json()
    console.log('✅ Web call created successfully:', {
      call_id: webCallData.call_id,
      has_access_token: !!webCallData.access_token,
      agent_id: webCallData.agent_id
    })
    
    // Validate response structure
    if (!webCallData.access_token || !webCallData.call_id) {
      throw new Error('Invalid API response: missing required fields (access_token or call_id)')
    }

    // Track successful call creation
    trackVoiceEvent('web_call_created', {
      call_id: webCallData.call_id,
      agent_id: webCallData.agent_id,
      environment: config.environment
    })

    return webCallData
  } catch (error) {
    console.error('❌ Failed to create web call:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    
    // Enhanced error categorization
    if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
      throw new Error('Network connection failed. Please check your internet connection and try again.')
    } else if (error.message.includes('CORS')) {
      throw new Error('Cross-origin request blocked. This may be a browser security restriction.')
    } else {
      // Re-throw with original message for API errors
      throw error
    }
  }
}

/**
 * Initialize and start a RetellAI voice conversation
 * @param {Object} webCallData - Web call data from createWebCall
 * @param {Object} eventHandlers - Event handlers for conversation events
 * @returns {Promise<Object>} RetellWebClient instance
 */
export const startVoiceConversation = async (webCallData, eventHandlers = {}) => {
  if (!webCallData?.access_token) {
    throw new Error('Invalid web call data: missing access token')
  }

  // Clean up any existing client
  if (globalRetellClient) {
    try {
      await globalRetellClient.stopConversation()
    } catch (error) {
      console.warn('⚠️ Error stopping previous conversation:', error)
    }
    globalRetellClient = null
  }

  // Initialize the Web SDK
  const RetellWebClient = await initializeRetellWebSDK()
  
  if (!RetellWebClient) {
    throw new Error('RetellAI Web SDK failed to load. Please check your internet connection and try again.')
  }

  try {
    console.log('🎙️ Initializing RetellWebClient...')
    
    // Create new client instance
    globalRetellClient = new RetellWebClient()

    // Set up comprehensive event handlers
    globalRetellClient.on('conversationStarted', () => {
      console.log('🎉 Voice conversation started successfully')
      trackVoiceEvent('conversation_started', {
        call_id: webCallData.call_id,
        timestamp: new Date().toISOString()
      })
      if (eventHandlers.onConversationStarted) {
        eventHandlers.onConversationStarted()
      }
    })

    globalRetellClient.on('conversationEnded', ({ code, reason }) => {
      console.log('📞 Voice conversation ended:', { code, reason })
      trackVoiceEvent('conversation_ended', {
        call_id: webCallData.call_id,
        end_code: code,
        end_reason: reason,
        timestamp: new Date().toISOString()
      })
      if (eventHandlers.onConversationEnded) {
        eventHandlers.onConversationEnded({ code, reason })
      }
    })

    globalRetellClient.on('error', (error) => {
      console.error('❌ RetellWebClient error:', error)
      trackVoiceEvent('conversation_error', {
        call_id: webCallData.call_id,
        error: error.message,
        timestamp: new Date().toISOString()
      })
      if (eventHandlers.onError) {
        eventHandlers.onError(error)
      }
    })

    globalRetellClient.on('update', (update) => {
      console.log('📊 Conversation update:', update)
      
      // Handle transcript updates
      if (update.transcript) {
        trackVoiceEvent('transcript_update', {
          call_id: webCallData.call_id,
          role: update.transcript.role,
          content_length: update.transcript.content?.length || 0
        })
      }
      
      if (eventHandlers.onUpdate) {
        eventHandlers.onUpdate(update)
      }
    })

    // Start the conversation with optimized settings
    console.log('🚀 Starting voice conversation...')
    
    // Try different method names based on RetellAI SDK version
    try {
      if (typeof globalRetellClient.startConversation === 'function') {
        await globalRetellClient.startConversation({
          accessToken: webCallData.access_token,
          sampleRate: 24000,
          enableUpdate: true
        })
      } else if (typeof globalRetellClient.startCall === 'function') {
        await globalRetellClient.startCall({
          accessToken: webCallData.access_token,
          sampleRate: 24000,
          enableUpdate: true
        })
      } else if (typeof globalRetellClient.connect === 'function') {
        await globalRetellClient.connect({
          accessToken: webCallData.access_token,
          sampleRate: 24000,
          enableUpdate: true
        })
      } else {
        // Log available methods for debugging
        console.log('Available RetellWebClient methods:', Object.getOwnPropertyNames(globalRetellClient))
        console.log('Available RetellWebClient prototype methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(globalRetellClient)))
        throw new Error('No suitable start method found on RetellWebClient. Available methods logged to console.')
      }
    } catch (methodError) {
      console.error('❌ Method call failed:', methodError)
      throw new Error(`Failed to start conversation: ${methodError.message}`)
    }

    console.log('✅ Voice conversation initialized successfully')
    return globalRetellClient

  } catch (error) {
    console.error('❌ Failed to start voice conversation:', error)
    
    // Clean up on failure
    if (globalRetellClient) {
      try {
        await globalRetellClient.stopConversation()
      } catch (cleanupError) {
        console.warn('⚠️ Error during cleanup:', cleanupError)
      }
      globalRetellClient = null
    }

    // Provide specific error messages
    if (error.message.includes('access_token')) {
      throw new Error('Invalid access token. Please try starting the call again.')
    } else if (error.message.includes('microphone')) {
      throw new Error('Microphone access denied. Please allow microphone permissions and try again.')
    } else if (error.message.includes('network') || error.message.includes('connection')) {
      throw new Error('Network connection failed. Please check your internet connection.')
    } else {
      throw new Error(`Voice connection failed: ${error.message}`)
    }
  }
}

/**
 * Stop the current voice conversation and clean up resources
 * @returns {Promise<void>}
 */
export const stopVoiceConversation = async () => {
  if (globalRetellClient) {
    try {
      console.log('🛑 Stopping voice conversation...')
      await globalRetellClient.stopConversation()
      console.log('✅ Voice conversation stopped successfully')
    } catch (error) {
      console.warn('⚠️ Error stopping conversation:', error)
    } finally {
      globalRetellClient = null
    }
  }
}

/**
 * Get the current RetellWebClient instance
 * @returns {Object|null} Current RetellWebClient instance
 */
export const getCurrentClient = () => {
  return globalRetellClient
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
