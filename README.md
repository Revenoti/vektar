# Vektar — AI Solutions That Deliver Real ROI

Vektar is a modern, responsive marketing site showcasing AI solutions, live demos, and a streamlined contact flow. It is built for performance, accessibility, and mobile-first usability.

## Key Highlights

- **🎙️ Live AI Voice Assistant** — RetellAI-powered "Vektar" assistant with stunning native design and live marketing features
- **🎨 Light/Dark Theme Toggle** — Beautiful dual-theme system with comprehensive light mode support
- **🔥 Premium Live Experience** — Animated "LIVE" indicators, pulse effects, and compelling "Talk to AI Expert" messaging
- **🎯 12 Interactive Demos** — Including SaaS AI, Business Automation, AI Call Center, and CRM Development
- **🚀 Multi-Tier Reliability** — Phone calls, custom callbacks, and email fallbacks ensure no leads are lost
- Responsive design with professional, balanced layout and beautiful Vektar gradient animations
- Mobile UX optimizations (safe-area support, tap targets, modal sheet behavior)
- Contact form with client-side validation and enhanced mobile typing experience
- **📊 Revenue Analytics** — Comprehensive tracking for voice assistant conversions and ROI optimization
- **🚄 Railway Deployment Ready** — Production-optimized configuration for Railway deployment

## Tech Stack

- **Vite + React** — Fast development and optimized builds
- **Tailwind CSS** — Utility-first styling framework
- **shadcn/ui components** — High-quality UI primitives
- **Lucide icons** — Beautiful, consistent iconography
- **RetellAI** — Voice AI assistant with real-time conversation capabilities
- **Cal.com Integration** — Automated appointment booking through voice commands
- **Custom Theme System** — Light/dark mode with localStorage persistence

## 🎨 Theme System (v3.3 - Latest)

### Features
- **🌙 Dark Mode (Default)** — Stunning dark theme with electric cyan accents and glow effects
- **☀️ Light Mode** — Comprehensive light theme with purple accents and soft shadows
- **🔄 Seamless Toggle** — Sun/Moon icon in navigation for easy switching
- **💾 Persistent Preference** — Theme choice saved in localStorage
- **📱 Mobile Support** — Theme toggle available in mobile navigation menu

### Technical Implementation
```
src/hooks/useTheme.js     # Theme state management and persistence
src/App.css               # Comprehensive CSS variables for both themes
```

### CSS Variables
```css
/* Dark Theme (Default) */
--background: #0B1021 (Midnight Navy)
--primary: #00E5FF (Electric Cyan)
--accent: #7A5CFF (Hyper Purple)

/* Light Theme */
--background: #F8FAFD (Soft Off-White)
--primary: #6B4EE6 (Light Purple)
--accent: #00B8C4 (Teal Cyan)
```

## 🎙️ Voice Assistant Feature

### Overview
The Vektar website includes a sophisticated AI voice assistant powered by RetellAI. The assistant provides instant consultation, answers questions about AI solutions, and can book appointments directly through voice interaction or callback requests.

### Key Features v2.0
- **🔥 Live AI Expert Button** — Stunning floating button with pulse animations and "Live AI Expert Available" tooltip
- **💬 Premium Live Experience** — "Talk to Vektar AI Expert - Live Now!" with animated LIVE indicators
- **🚀 Multi-Tier Callback System** — RetellAI phone calls, custom callbacks, and email fallbacks
- **📞 Instant Voice Conversations** — Real-time audio communication with AI assistant
- **📅 Appointment Booking** — Direct integration with Cal.com for consultation scheduling
- **📱 Mobile Optimized** — Perfect responsive design with touch-friendly interactions
- **📊 Advanced Analytics** — Comprehensive conversion tracking and revenue optimization
- **🎨 Native Vektar Design** — Seamlessly integrated with brand colors, gradients, and animations
- **✨ Premium Visual Effects** — Pulse rings, bounce animations, and gradient effects
- **💎 Enterprise Reliability** — Robust error handling and fallback mechanisms

### How It Works
1. **Visitors see the floating voice button** in the bottom-right corner of any page
2. **Click to start conversation** — Connects instantly to "Vekta" AI assistant
3. **Natural voice interaction** — Ask questions about AI solutions, pricing, implementation
4. **Appointment booking** — Voice assistant can schedule consultations through Cal.com
5. **Revenue tracking** — All interactions are tracked for conversion optimization

### Components
```
src/components/VoiceAssistant/
├── FloatingVoiceButton.jsx    # Main floating button with animations
├── VoiceCallInterface.jsx     # Full-screen call interface
└── RetellWebCall.js          # API integration and analytics
```

## Recent Changes

### 🎨 Theme System & New Demos (v3.3 - January 2026)

#### Light/Dark Theme Toggle
- **Comprehensive Light Theme** — Full CSS variable system for light mode with custom colors, shadows, and effects
- **Theme Toggle Button** — Sun/Moon icon in desktop and mobile navigation
- **Dark Mode Default** — App defaults to dark theme for new visitors
- **Persistent Preference** — User's theme choice saved in localStorage
- **Smooth Transitions** — 300ms transitions between theme changes
- **Light Mode Enhancements**:
  - Frosted white glass-card effect with soft shadows
  - Purple-tinted hover effects instead of cyan glow
  - Custom scrollbar colors for light mode
  - Adjusted chart and stat colors for readability

#### 4 New Interactive Demos
1. **SaaS AI Application Development Demo** — Build custom AI-powered SaaS applications with intelligent features and scalable architecture. Features AI feature builder, tech stack configuration, timeline planning, and cost calculator.
2. **Custom AI Business Automation Demo** — Watch intelligent workflows automate complex business processes in real-time. Features visual workflow builder, AI decision nodes, 200+ integrations, and live execution visualization.
3. **AI Call Center Demo** — Experience real-time AI-powered call center with sentiment analysis and live transcription. Features live call monitoring, AI vs human metrics comparison, smart routing, and performance analytics.
4. **CRM Development Demo** — AI-enhanced CRM with predictive lead scoring, pipeline analytics, and smart automation. Features AI lead scoring, deal pipeline visualization, revenue forecasting, and smart insights.

#### Railway Deployment Configuration
- **New `railway.toml`** — Complete Railway deployment configuration
- **Production Vite Config** — Code splitting, esbuild minification, chunk optimization
- **`.npmrc` Configuration** — Consistent dependency resolution with legacy-peer-deps
- **`.env.example` Template** — Documentation for required environment variables

#### Footer Update
- **Copyright Year** — Updated to © 2026 Vektar. All rights reserved.

### 📝 Contact Form Enhancement (v3.2)
- **💰 Expanded Budget Range Options** — Added new "$500 - $5k" budget range option
- **🎯 Improved Lead Qualification** — Budget ranges from $500 to $100k+
- **📊 Better User Experience** — Granular budget options for accurate project scoping

### 🎙️ Voice Assistant Updates (v3.1)
- **🎯 CTA Title Enhancement** — "One on One Call With Vektar" messaging
- **📱 Mobile LIVE Badge Optimization** — Fixed positioning and sizing
- **🔧 Responsive Design Improvements** — Enhanced mobile experience

### 🎙️ Voice Assistant Major Enhancements (v3.0)
- **🎯 Native Vektar Design Integration** — Stunning brand colors and animations
- **🔥 Live Marketing Features** — Enhanced "Chat with Vektar Live!" messaging
- **✨ Premium Visual Effects** — Pulse rings, bounce animations, gradient effects
- **📱 Mobile-First Responsive Design** — Optimized for all screen sizes
- **🚀 Multi-Tier Callback System** — RetellAI, custom callbacks, and email fallbacks
- **📊 Advanced Analytics** — Comprehensive conversion tracking

## Project Structure

```
├── .env.example              # Environment variable template
├── .npmrc                    # NPM configuration for consistent builds
├── railway.toml              # Railway deployment configuration
├── vite.config.js            # Vite configuration with production optimizations
├── package.json              # Dependencies and scripts
└── src/
    ├── App.jsx               # Main page layout (includes theme toggle)
    ├── App.css               # Theme variables, light/dark mode styles
    ├── hooks/
    │   ├── use-mobile.js     # Mobile detection hook
    │   └── useTheme.js       # 🎨 Theme management hook
    ├── components/
    │   ├── DemoModal.jsx     # Demo modal with 12 interactive demos
    │   ├── ContactForm.jsx   # Enhanced mobile-optimized form
    │   ├── VoiceAssistant/   # RetellAI Voice Assistant Components
    │   │   ├── FloatingVoiceButton.jsx
    │   │   ├── VoiceCallInterface.jsx
    │   │   └── RetellWebCall.js
    │   ├── demos/            # 12 Demo components
    │   │   ├── ChatbotDemo.jsx
    │   │   ├── VoiceDemo.jsx
    │   │   ├── QuoteDemo.jsx
    │   │   ├── RAGDemo.jsx
    │   │   ├── TicketDemo.jsx
    │   │   ├── FieldTechDemo.jsx
    │   │   ├── DocumentDemo.jsx
    │   │   ├── KPIDemo.jsx
    │   │   ├── SaaSDemo.jsx        # 🆕 NEW
    │   │   ├── AutomationDemo.jsx  # 🆕 NEW
    │   │   ├── CallCenterDemo.jsx  # 🆕 NEW
    │   │   └── CRMDemo.jsx         # 🆕 NEW
    │   └── ui/               # shadcn/ui primitives
    ├── api/
    │   └── contact.js        # API functions
    └── assets/
        └── vectorik-logo.png # Brand assets
```

## Getting Started

### Prerequisites
- Node 18+
- npm or pnpm

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Vite will start on http://localhost:5173

### Build
```bash
npm run build
```

### Preview (after build)
```bash
npm run preview
```

### Start Production Server
```bash
npm run start
```

## Environment Configuration

### Required Environment Variables
Create a `.env` file in the project root (see `.env.example`):

```bash
# RetellAI Voice Assistant Configuration
VITE_RETELL_API_KEY=your_retell_api_key_here
VITE_RETELL_AGENT_ID=your_agent_id_here
VITE_RETELL_LLM_ID=your_llm_id_here
```

## Deployment

### Railway Deployment (Recommended)

Railway is configured with `railway.toml` for automatic deployment:

```toml
[build]
builder = "nixpacks"
buildCommand = "npm ci && npm run build"

[deploy]
startCommand = "npx serve -s dist -l $PORT"
healthcheckPath = "/"
```

**Deploy to Railway:**
1. Push code to GitHub repository
2. Go to [Railway.app](https://railway.app) and create new project
3. Select "Deploy from GitHub repo"
4. Add environment variables in Railway dashboard:
   - `VITE_RETELL_API_KEY`
   - `VITE_RETELL_AGENT_ID`
   - `VITE_RETELL_LLM_ID`
5. Deploy automatically on push

### Netlify Deployment

1. **Connect Repository**: Link your GitHub repository to Netlify
2. **Set Environment Variables**: Add RetellAI keys in Site Settings
3. **Build Settings**: Use default Vite build settings
4. **Deploy**: Automatic deployment on push to main branch

### Other Platforms

The static build (`dist/`) works with:
- Vercel
- Cloudflare Pages
- Any static hosting provider

## Demos Included (12 Total)

### Core AI Solutions
- **AI Sales Chatbot** — Lead conversion and qualification
- **Voice Receptionist** — 24/7 customer service automation
- **Quote Copilot** — Automated proposal generation
- **RAG Knowledge Hub** — Document-based question answering

### Operations & Support
- **Ticket Deflection System** — Support automation
- **Field Tech Copilot** — Technician assistance and optimization
- **Document Intelligence** — Automated document processing
- **Executive KPI Copilot** — Real-time business insights

### Enterprise Solutions (🆕 New in v3.3)
- **SaaS AI Application Development** — Custom AI-powered SaaS builder
- **Custom AI Business Automation** — Visual workflow automation
- **AI Call Center** — Real-time AI-powered call center
- **CRM Development** — AI-enhanced customer relationship management

## Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run start` — Start production server (using serve)
- `npm run lint` — Run ESLint

## Accessibility & Performance

- **Reduced motion support** (`prefers-reduced-motion`)
- **44px minimum tap targets** for interactive elements
- **Safe-area padding** for iOS notch devices
- **Responsive images** with proper attributes
- **Semantic HTML** with ARIA labels
- **Theme persistence** for user preference

## Support

For questions or issues, please refer to the contact form on the site or check the project documentation.

---

© 2026 Vektar. All rights reserved.
