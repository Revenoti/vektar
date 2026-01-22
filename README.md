# Vektar AI Solutions

A professional AI consulting website featuring 7 pages, 23 interactive AI demos, and RetellAI voice integration. Built for performance, mobile-first usability, and SEO optimization.

## Key Features

- **7-Page Architecture** — Home, Solutions, Work, About, Industries, Contact, Call
- **23 Interactive AI Demos** — Live demos showcasing AI capabilities
- **AI-First Engagement** — All CTAs direct to /call page for real-time AI conversation
- **RetellAI Voice Assistant** — 24/7 AI voice agent available on the Call page
- **Light Theme Default** — Clean, professional appearance with dark mode option
- **Mobile-First Design** — Responsive layouts with compact spacing
- **Comprehensive SEO** — Sitemap, page-specific meta tags, FAQ rich snippets

## Tech Stack

- **React 19.1 + Vite 6.3** — Fast development and optimized builds
- **Tailwind CSS 4.1** — Utility-first styling with Radix UI components
- **React Router DOM** — Multi-page routing
- **Framer Motion** — Smooth animations
- **Recharts** — Data visualization for demos
- **React Helmet Async** — Dynamic SEO meta tags
- **RetellAI** — Voice AI assistant integration

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero section, stats, 12 featured solutions preview, testimonials, social proof |
| Solutions | `/solutions` | 23 AI solutions with interactive live demos |
| Work | `/work` | Filterable case studies with Problem-Process-Payoff structure |
| About | `/about` | Mission, Vision, Values, Team expertise, Vektar Approach |
| Industries | `/industries` | 10 industry-specific challenges and solutions |
| Contact | `/contact` | Contact info, phone, email, AI conversation CTA |
| Call | `/call` | AI-first engagement page with Vektar AI voice assistant |

## AI Solutions (20+ Interactive Demos)

### Core Business Solutions
1. **AI Sales Chatbot** — Lead qualification, CRM integration
2. **Voice Receptionist** — Call routing, appointment booking
3. **Predictive Analytics** — AI forecasting, trend analysis
4. **Business Automation** — Visual workflow builder, app integrations

### Enterprise Solutions
5. **SaaS AI Application Development** — AI feature builder, tech stack config, timeline planning, cost calculator
6. **AI Call Center** — Live call monitoring, AI vs human metrics, smart routing, performance analytics
7. **CRM Development** — AI lead scoring, deal pipeline, revenue forecasting, smart insights
8. **RAG Knowledge Hub** — Document ingestion, semantic search, source attribution

### Document & Data Solutions
9. **Document Intelligence** — OCR processing, data extraction, format conversion
10. **Meeting Transcription** — Real-time transcription, speaker ID, action items
11. **Customer Support Bot** — Smart FAQ, issue classification, sentiment analysis
12. **Data Enrichment** — Data cleaning, auto-enrichment, duplicate detection

### Industry-Specific Solutions
13. **AI Agent Dispatch & Logistics** — Route optimization, GPS tracking, driver scheduling
14. **24/7 Healthcare Receptionist** — Appointment booking, symptom triage, insurance verification
15. **24/7 Education Counselor** — Course recommendations, enrollment, schedule planning
16. **24/7 Plumber & Landscaping** — Service booking, project quotes, emergency dispatch
17. **24/7 Mobile Auto Mechanic** — Service scheduling, vehicle diagnostics, pricing estimates
18. **24/7 Mobile Tech Service** — Device diagnostics, repair booking, status tracking
19. **24/7 Mobile HVAC Service** — Emergency dispatch, maintenance scheduling

### Productivity Solutions
20. **Quote Copilot** — Smart templates, dynamic pricing, auto-formatting
21. **Ticket Deflection System** — Smart FAQ, auto-resolution, escalation logic
22. **Field Tech Copilot** — Diagnostics, repair guides, parts lookup
23. **Executive KPI Copilot** — KPI tracking, trend analysis, anomaly alerts

## Project Structure

```
├── index.html                    # Entry point with SEO meta tags and structured data
├── public/
│   ├── sitemap.xml              # XML sitemap for all 7 pages
│   ├── robots.txt               # Search engine crawling rules
│   ├── og-image.png             # Social sharing preview image
│   └── hero-background.png      # Hero section background
├── railway.toml                  # Railway deployment config
├── netlify.toml                  # Netlify deployment config
├── nixpacks.toml                 # Nixpacks build config
├── src/
│   ├── main.jsx                 # App entry with HelmetProvider
│   ├── App.jsx                  # Router configuration
│   ├── App.css                  # Global styles and theme variables
│   ├── components/
│   │   ├── SEO.jsx              # Reusable SEO component
│   │   ├── layout/
│   │   │   └── Layout.jsx       # Shared header/footer layout
│   │   ├── demos/               # Demo components (8 active, legacy files present)
│   │   │   ├── ChatbotDemo.jsx           # Active
│   │   │   ├── VoiceDemo.jsx             # Active
│   │   │   ├── PredictiveAnalyticsDemo.jsx  # Active
│   │   │   ├── BusinessAutomationDemo.jsx   # Active
│   │   │   ├── DispatchLogisticsDemo.jsx    # Active
│   │   │   ├── HealthcareReceptionistDemo.jsx  # Active
│   │   │   ├── EducationCounselorDemo.jsx   # Active
│   │   │   ├── PlumberLandscapingDemo.jsx   # Active
│   │   │   └── (+ legacy demo files)
│   │   ├── VoiceAssistant/      # RetellAI integration
│   │   │   ├── FloatingVoiceButton.jsx
│   │   │   ├── VoiceCallInterface.jsx
│   │   │   └── RetellWebCall.js
│   │   └── ui/                  # shadcn/ui primitives
│   └── pages/                   # 7 page components
│       ├── HomePage.jsx
│       ├── SolutionsPage.jsx
│       ├── WorkPage.jsx
│       ├── AboutPage.jsx
│       ├── IndustriesPage.jsx
│       ├── ContactPage.jsx
│       └── CallPage.jsx
└── dist/                        # Production build output
```

## SEO Features

### Implemented
- **Sitemap.xml** — All 7 pages with priority levels and update frequency
- **robots.txt** — Allows all crawlers, points to sitemap
- **Page-Specific Meta Tags** — Unique titles and descriptions per page via react-helmet-async
- **Open Graph Tags** — Optimized social sharing with og-image.png (776KB)
- **Twitter Cards** — Large image summary cards
- **Structured Data** — Organization, BreadcrumbList, and FAQPage schemas
- **Canonical URLs** — Prevents duplicate content issues

### Meta Tag Examples
- Home: "Vektar - AI Solutions That Deliver Real ROI"
- Solutions: "AI Solutions - Chatbots, Voice Agents, Analytics & Automation"
- Work: "Case Studies - AI Project Success Stories"
- Call: "Talk to Vektar AI Agent - Free Strategy Call"

## Design System

### Theme
- **Light theme as default** — Clean, professional appearance
- **Dark mode available** — Toggle in navigation

### Design Choices
- **Gradient colors** on buttons, icons, and badges only (not on text)
- **Glass-morphism buttons** — Semi-transparent with backdrop blur
- **"Live AI Demos" badge** — Purple (bg-purple-600) with white text
- **Compact spacing** — Reduced whitespace for better mobile engagement
- **Hero background** — Professional AI team collaboration scene

### Color Palette
- Primary accent: Cyan-400
- Badge color: Purple-600
- Text on dark: White

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Server runs on port 5000 (configured for Replit)

### Build
```bash
npm run build
```

## Environment Variables

```bash
# RetellAI Voice Assistant
VITE_RETELL_API_KEY=your_retell_api_key
VITE_RETELL_AGENT_ID=your_agent_id
VITE_RETELL_LLM_ID=your_llm_id
```

## Deployment

### Replit (Primary)
- **Build command**: `npm run build`
- **Public directory**: `dist`
- **Static deployment** ready
- Development server runs on port 5000

### Railway
Configured via `railway.toml`:
```toml
[build]
builder = "nixpacks"
buildCommand = "npm ci && npm run build"

[deploy]
startCommand = "npx serve -s dist -l $PORT"
```

### Netlify
Configured via `netlify.toml` for automatic deployment.

### Other Platforms
The static build (`dist/`) works with:
- Vercel
- Cloudflare Pages
- Any static hosting provider

## Recent Updates (January 2026)

### AI Solutions Expansion
- Expanded to 23 interactive AI demos across all categories
- Homepage features 12 curated solutions as preview
- Solutions page displays full catalog of 23 demos with live interactive components

### SEO Optimization
- Added sitemap.xml with all 7 pages
- Implemented react-helmet-async for dynamic meta tags
- Created reusable SEO component for page-specific metadata
- Added FAQ structured data schema for rich snippets
- Updated BreadcrumbList schema with correct page URLs

### Design Updates
- Updated "Live AI Demos" badge to purple (bg-purple-600)
- Refactored footer to 2-column mobile layout
- Added Industries column to footer
- Optimized OG image from 5MB to 776KB

### Architecture
- Multi-page routing with React Router
- AI-first engagement strategy (CTAs → /call page)
- Mobile-first responsive design with compact spacing

---

© 2026 Vektar AI Solutions. All rights reserved.
