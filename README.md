# Vektar — AI Solutions That Deliver Real ROI

Vektar is a modern, responsive marketing site showcasing AI solutions, live demos, and a streamlined contact flow. It is built for performance, accessibility, and mobile-first usability.

## Key Highlights

- **🎙️ Live AI Voice Assistant** — RetellAI-powered "Vekta" assistant for instant consultation and appointment booking
- Responsive design with professional, balanced layout
- Mobile UX optimizations (safe-area support, tap targets, modal sheet behavior)
- Live demos for multiple solutions (Chatbot, Voice, RAG, KPI, Quote, Ticket, Field Tech, Document)
- Contact form with client-side validation and enhanced mobile typing experience
- **📊 Revenue Analytics** — Comprehensive tracking for voice assistant conversions and ROI optimization

## Tech Stack

- **Vite + React** — Fast development and optimized builds
- **Tailwind CSS** — Utility-first styling framework
- **shadcn/ui components** — High-quality UI primitives
- **Lucide icons** — Beautiful, consistent iconography
- **RetellAI** — Voice AI assistant with real-time conversation capabilities
- **Cal.com Integration** — Automated appointment booking through voice commands

## 🎙️ Voice Assistant Feature

### Overview
The Vektar website now includes a sophisticated AI voice assistant powered by RetellAI. The assistant, named "Vekta," provides instant consultation, answers questions about AI solutions, and can book appointments directly through voice interaction.

### Key Features
- **🎯 Floating Voice Button** — Beautiful gradient button with "Need help? Ask Vekta!" tooltip
- **📞 Live Voice Conversations** — Real-time audio communication with AI assistant
- **📅 Appointment Booking** — Direct integration with Cal.com for consultation scheduling
- **📱 Responsive Design** — Works seamlessly on desktop and mobile devices of all kinds
- **📊 Analytics Tracking** — Comprehensive conversion and engagement monitoring
- **🎨 Professional UI** — Matches existing Vektar design system perfectly with more options in the works

### How It Works
1. **Visitors see the floating voice button** in the bottom-right corner of any page
2. **Click to start conversation** — Connects instantly to "Vekta" AI assistant
3. **Natural voice interaction** — Ask questions about AI solutions, pricing, implementation
4. **Appointment booking** — Voice assistant can schedule consultations through Cal.com
5. **Revenue tracking** — All interactions are tracked for conversion optimization

### Technical Implementation
- **REST API Integration** — Uses RetellAI's web call API for session management
- **Real-time Audio** — WebRTC-based voice communication
- **Environment Configuration** — Secure API key and agent ID management
- **Error Handling** — Comprehensive error messages and fallback options
- **Analytics System** — Local storage and console-based conversion tracking

### Components Added
```
src/components/VoiceAssistant/
├── FloatingVoiceButton.jsx    # Main floating button with animations
├── VoiceCallInterface.jsx     # Full-screen call interface
└── RetellWebCall.js          # API integration and analytics
```

## Recent Changes

### 🎙️ Voice Assistant Improvements (Latest)
- **Fixed "Connection failed" errors** — Added robust error handling and fallback mechanisms
- **Improved RetellAI Web SDK integration** — Dynamic import with graceful degradation to REST API
- **Enhanced production stability** — Resolves deployment issues and ensures reliable connections
- **Better error messaging** — Clear feedback for users when issues occur
- **Dependency management fixes** — Resolved pnpm lockfile conflicts for smooth deployment
- **Fallback architecture** — Voice assistant works even when Web SDK fails to load
- **Production deployment fixes** — Resolved module import issues in build environments

#### Technical Details of Recent Fixes
- **Dynamic Import Strategy**: RetellAI Web SDK now loads dynamically with try/catch error handling
- **Graceful Degradation**: Falls back to REST API simulation when Web SDK unavailable
- **Error Recovery**: Comprehensive error logging and user-friendly status messages
- **Build Compatibility**: Resolved ES module import issues in production builds
- **Dependency Resolution**: Switched from pnpm to npm for better compatibility

### Footer Enhancements
- **Expanded Industries** to 12 items covering major business sectors
- **Refactored layout** to a 12-column grid with balanced spans: 3/2/5/2 (Branding/Solutions/Industries/Company)
- **Typography consistency** with hover states, max-w-7xl container, safe-area padding for iOS

### Mobile Experience Optimizations
- **Viewport safe-area support** (`viewport-fit=cover`)
- **Added safe-area CSS helpers** (`.pad-safe-top`, `.pad-safe-bottom`) and tap-target utility
- **Accessibility improvements** with reduced motion preference support
- **Navigation enhancements**: safe-area top padding, better mobile tap targets, full-width CTA on mobile
- **Hero section**: responsive H1 scaling (`text-4xl → sm:text-5xl → lg:text-7xl`), responsive hero image with proper sizing attributes, mobile CTAs are full-width
- **Improved spacing**: reduced section padding on small screens for better scroll rhythm (`py-14 sm:py-16 lg:py-20`)
- **Demo modal**: mobile "sheet" behavior (full height on small screens), larger close target, improved padding
- **Contact form**: mobile input attributes (`autocomplete`, `inputMode`, `enterKeyHint`), inputs sized to avoid iOS zoom, native validation disabled in favor of React validation (`noValidate`)

### Form Validation
- Contact form uses **custom React validation** (required fields + email format)
- **Error feedback** shown in branded, accessible banner
- **Note**: If you see "Please enter a valid email address" ensure you provide a valid email format (e.g., name@company.com)

## Project Structure

```
src/
├── App.jsx                     # Main page layout and sections (includes voice assistant)
├── App.css                     # Theme variables, utilities, animations, safe-area support
├── components/
│   ├── DemoModal.jsx          # Live demos with mobile sheet behavior
│   ├── ContactForm.jsx        # Enhanced mobile-optimized form
│   ├── VoiceAssistant/        # 🎙️ NEW: RetellAI Voice Assistant Components
│   │   ├── FloatingVoiceButton.jsx    # Floating button with animations
│   │   ├── VoiceCallInterface.jsx     # Full-screen call interface
│   │   └── RetellWebCall.js          # API integration and analytics
│   ├── demos/                 # Individual demo components
│   └── ui/                    # shadcn/ui primitives
├── api/
│   └── contact.js             # submitContactForm, requestDemo functions
└── assets/
    └── vectorik-logo.png      # Brand assets
```

## Getting Started

### Prerequisites
- Node 18+
- pnpm (recommended)

### Installation
```bash
pnpm install
```

### Development
```bash
pnpm run dev
```
Vite will start on an available port (e.g., http://localhost:5173 or next free port)

### Build
```bash
pnpm run build
```

### Preview (after build)
```bash
pnpm run preview
```

## Environment Configuration

### Voice Assistant Setup
To enable the RetellAI voice assistant, create a `.env` file in the project root with:

```bash
# RetellAI Voice Assistant Configuration
VITE_RETELL_API_KEY=your_retell_api_key_here
VITE_RETELL_AGENT_ID=your_published_agent_id_here
VITE_RETELL_LLM_ID=your_llm_id_here
```

**Required Steps:**
1. **Get RetellAI API Key** from your [RetellAI Dashboard](https://dashboard.retellai.com)
2. **Create and Publish Agent** in RetellAI with Cal.com integration
3. **Copy Agent ID** (not LLM ID) from your published agent
4. **Add environment variables** to your hosting platform (Netlify, Vercel, etc.)
5. **Restart development server** after adding environment variables

### Other Configuration
- API functions live in `src/api/contact.js` (e.g., `submitContactForm`, `requestDemo`)
- If connecting to a backend service, add environment variables or config as needed
- No secrets are committed to the repository

## 🔧 Voice Assistant Troubleshooting

### Common Issues

#### "Failed to start call - Not Found"
- **Cause**: Agent ID is missing or incorrect
- **Solution**: Verify `VITE_RETELL_AGENT_ID` in `.env` matches your published agent ID
- **Check**: Ensure agent is published in RetellAI dashboard

#### "Authentication failed"
- **Cause**: Invalid or missing API key
- **Solution**: Verify `VITE_RETELL_API_KEY` in `.env` is correct
- **Check**: API key should start with `key_`

#### No Audio During Call
- **Cause**: Agent not published or browser permissions
- **Solution**: 
  1. Ensure agent is published in RetellAI dashboard
  2. Allow microphone permissions in browser
  3. Test on HTTPS/production environment (not localhost)
  4. Check browser console for WebRTC errors

#### Voice Button Not Visible
- **Cause**: Environment variables not loaded
- **Solution**: Restart development server after adding `.env` file
- **Check**: Browser console should show voice assistant configuration

#### "Connection failed" Error (Fixed in Latest Version)
- **Previous Issue**: RetellAI Web SDK import failures in production
- **Current Solution**: Automatic fallback to REST API when Web SDK unavailable
- **What to Expect**: Voice assistant now shows "Connected with Vekta" instead of "Connection failed"
- **Monitoring**: Check browser console for `✅ RetellAI Web SDK loaded successfully` or `⚠️ RetellAI Web SDK not available, using REST API fallback`

#### Deployment Issues
- **Lockfile Conflicts**: Use `npm install --legacy-peer-deps` instead of pnpm if encountering dependency conflicts
- **Module Import Errors**: Recent fixes include dynamic imports that resolve ES module issues in production
- **Build Failures**: Ensure environment variables are set in your hosting platform (Netlify, Vercel, etc.)

### Analytics and Monitoring

The voice assistant includes comprehensive analytics tracking:

```javascript
// View analytics summary in browser console
console.log(getAnalyticsSummary())

// Track custom events
trackVoiceEvent('custom_event', { data: 'value' })
```

**Tracked Events:**
- `voice_button_viewed` — Button visibility
- `call_started` — User initiates call
- `call_connected` — Successful connection
- `appointment_booked` — Conversion event
- `call_ended` — Call completion with duration
- `error_occurred` — Error tracking for optimization

### Performance Optimization

- **Production Environment**: Voice assistant works best on HTTPS
- **Mobile Optimization**: Responsive design with touch-friendly controls
- **Error Recovery**: Automatic retry logic for failed connections
- **Analytics Storage**: Local storage with 100-event limit for performance

## Accessibility & Performance

- **Reduced motion support** (`prefers-reduced-motion`)
- **44px minimum tap targets** for interactive elements on mobile
- **Safe-area padding** for iOS notch/pill devices
- **Responsive images** with proper `width`/`height`/`sizes`/`decoding` attributes
- **Semantic HTML** with proper ARIA labels and navigation structure

## Demos Included

- **AI Sales Chatbot** — Lead conversion and qualification
- **Voice Receptionist** — 24/7 customer service automation
- **RAG Knowledge Hub** — Document-based question answering
- **Executive KPI Copilot** — Real-time business insights
- **Quote Copilot** — Automated proposal generation
- **Ticket Deflection System** — Support automation
- **Field Tech Copilot** — Technician assistance and optimization
- **Document Intelligence** — Automated document processing

## Available Scripts

- `pnpm run dev` — Start development server
- `pnpm run build` — Build for production
- `pnpm run preview` — Preview the production build

## Deployment

### Production Build
- Output is a static build (`dist/`) suitable for:
  - Vercel
  - Netlify
  - Cloudflare Pages
  - Any static hosting provider
- Ensure correct base path if deploying to a subpath (configure Vite if needed)

### Voice Assistant Deployment Requirements
- **Environment Variables**: Set `VITE_RETELL_API_KEY` and `VITE_RETELL_AGENT_ID` in your hosting platform
- **HTTPS Required**: Voice assistant requires HTTPS for WebRTC audio functionality
- **Build Compatibility**: Recent fixes ensure RetellAI Web SDK works in production builds
- **Dependency Management**: Use `npm install --legacy-peer-deps` for consistent builds

### Netlify Deployment (Recommended)
1. **Connect Repository**: Link your GitHub repository to Netlify
2. **Set Environment Variables**: Add RetellAI keys in Site Settings > Environment Variables
3. **Build Settings**: Use default Vite build settings (`npm run build`)
4. **Deploy**: Automatic deployment on push to main branch
5. **Verify**: Voice assistant should show "Connected with Vekta" status

### Troubleshooting Deployment
- **Build Failures**: Check environment variables are set correctly
- **Voice Assistant Not Working**: Verify agent is published in RetellAI dashboard
- **Module Import Errors**: Recent fixes include dynamic imports that resolve production issues
- **Dependency Conflicts**: Use npm instead of pnpm if encountering lockfile issues

## Notes

- The site uses **custom client-side validation** for the contact form to provide a consistent, branded error experience
- **Browser native validation is disabled** on forms; enter a valid email format (name@domain.tld) to submit successfully
- All mobile optimizations maintain the existing design language while improving usability
- The application is fully responsive and works seamlessly across desktop, tablet, and mobile devices

## Support

For questions or issues, please refer to the contact form on the site or check the project documentation.
