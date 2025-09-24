// Contact form handler for Vectorik website
// This would typically be implemented as a server-side API route

export const submitContactForm = async (formData) => {
  try {
    // In a real implementation, this would send to a backend API
    // For now, we'll simulate the email sending process
    
    const emailData = {
      to: 'info@vektar.com',
      subject: `New Contact Form Submission from ${formData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Company:</strong> ${formData.company || 'Not provided'}</p>
        <p><strong>Website:</strong> ${formData.website || 'Not provided'}</p>
        <p><strong>Industry:</strong> ${formData.industry || 'Not provided'}</p>
        <p><strong>Budget Range:</strong> ${formData.budgetRange || 'Not provided'}</p>
        <p><strong>Project Description:</strong></p>
        <p>${formData.projectDescription}</p>
        <hr>
        <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${formData.name}
        Email: ${formData.email}
        Company: ${formData.company || 'Not provided'}
        Website: ${formData.website || 'Not provided'}
        Industry: ${formData.industry || 'Not provided'}
        Budget Range: ${formData.budgetRange || 'Not provided'}
        
        Project Description:
        ${formData.projectDescription}
        
        Submitted on: ${new Date().toLocaleString()}
      `
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // In production, you would use a service like:
    // - Resend API
    // - SendGrid
    // - Nodemailer with SMTP
    // - Vercel Edge Functions
    // - Netlify Functions
    
    console.log('Email would be sent to:', emailData.to)
    console.log('Email content:', emailData)
    
    // For demonstration, we'll show success
    return {
      success: true,
      message: 'Thank you for your message! We\'ll get back to you within 24 hours.'
    }
    
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return {
      success: false,
      message: 'There was an error sending your message. Please try again or contact us directly at info@vektar.com'
    }
  }
}

// Newsletter signup handler
export const submitNewsletter = async (email) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    console.log('Newsletter signup for:', email)
    
    return {
      success: true,
      message: 'Successfully subscribed to our newsletter!'
    }
    
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    return {
      success: false,
      message: 'There was an error subscribing. Please try again.'
    }
  }
}

// Demo request handler
export const requestDemo = async (formData) => {
  try {
    const emailData = {
      to: 'info@vektar.com',
      subject: `Demo Request from ${formData.name}`,
      html: `
        <h2>Demo Request</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Company:</strong> ${formData.company}</p>
        <p><strong>Requested Demo:</strong> ${formData.demoType}</p>
        <p><strong>Message:</strong> ${formData.message || 'No additional message'}</p>
        <hr>
        <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
      `
    }

    await new Promise(resolve => setTimeout(resolve, 800))
    
    console.log('Demo request email would be sent:', emailData)
    
    return {
      success: true,
      message: 'Demo request submitted! We\'ll contact you soon to schedule.'
    }
    
  } catch (error) {
    console.error('Error submitting demo request:', error)
    return {
      success: false,
      message: 'There was an error submitting your demo request. Please try again.'
    }
  }
}
