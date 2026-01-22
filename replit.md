# Vektar AI Solutions Website

## Overview
A professional AI consulting website for Vektar AI Solutions featuring multi-page architecture, 20 interactive AI demos, RetellAI voice integration, and light theme as default. The site showcases AI solutions for businesses with case studies structured using Problem-Process-Payoff methodology.

## Project Architecture
- **Framework**: React 19.1 with Vite 6.3
- **Styling**: Tailwind CSS v4.1 with Radix UI components
- **Routing**: React Router DOM (7 pages)
- **Animations**: Framer Motion, CSS keyframes
- **Charts**: Recharts
- **Voice Assistant**: RetellAI integration
- **SEO**: React Helmet Async with page-specific meta tags

## AI Solutions (23 Interactive Demos)

### Core Business Solutions
1. AI Sales Chatbot (violet-purple) - Lead qualification, CRM integration
2. Voice Receptionist (pink-rose) - Call routing, appointment booking
3. Predictive Analytics (fuchsia-purple) - AI forecasting, trend analysis
4. Business Automation (violet-purple) - Visual workflow builder, app integrations

### Enterprise Solutions
5. SaaS AI Application Development (indigo-violet) - AI feature builder, tech stack config, timeline planning, cost calculator
6. AI Call Center (teal-emerald) - Live call monitoring, AI vs human metrics, smart routing, performance analytics
7. CRM Development (amber-orange) - AI lead scoring, deal pipeline, revenue forecasting, smart insights
8. RAG Knowledge Hub (cyan-blue) - Document ingestion, semantic search, source attribution

### Document & Data Solutions
9. Document Intelligence (orange-red) - OCR processing, data extraction, format conversion
10. Meeting Transcription (emerald-teal) - Real-time transcription, speaker ID, action items
11. Customer Support Bot (blue-indigo) - Smart FAQ, issue classification, sentiment analysis
12. Data Enrichment (amber-orange) - Data cleaning, auto-enrichment, duplicate detection

### Industry-Specific Solutions
13. AI Agent Dispatch & Logistics (emerald-teal) - Route optimization, GPS tracking, driver scheduling
14. 24/7 Healthcare Receptionist (rose-pink) - Appointment booking, symptom triage, insurance verification
15. 24/7 Education Counselor (blue-indigo) - Course recommendations, enrollment, schedule planning
16. 24/7 Plumber & Landscaping (blue-cyan) - Service booking, project quotes, emergency plumbing
17. 24/7 Mobile Auto Mechanic (orange-red) - Service scheduling, vehicle diagnostics, pricing estimates
18. 24/7 Mobile Tech Service (cyan-blue) - Device diagnostics, repair booking, status tracking
19. 24/7 Mobile HVAC Service (sky-indigo) - Emergency dispatch, maintenance scheduling

### Productivity Solutions
20. Quote Copilot (lime-green) - Smart templates, dynamic pricing, auto-formatting
21. Ticket Deflection System (purple-violet) - Smart FAQ, auto-resolution, escalation logic
22. Field Tech Copilot (orange-red) - Diagnostics, repair guides, parts lookup
23. Executive KPI Copilot (cyan-blue) - KPI tracking, trend analysis, anomaly alerts

## Pages (Multi-Page Architecture)
- **Home** (`/`) - Hero, stats, solutions preview (12 featured), testimonials, social proof
- **Solutions** (`/solutions`) - 23 AI solutions with interactive live demos
- **Work** (`/work`) - Filterable case studies with Problem-Process-Payoff structure
- **About** (`/about`) - Mission, Vision, Values, Team expertise, Vektar Approach
- **Industries** (`/industries`) - 10 industry-specific challenges and solutions
- **Contact** (`/contact`) - Contact info, phone, email, AI conversation CTA
- **Call** (`/call`) - AI-first engagement page with Vektar AI voice assistant (primary CTA destination)

## Directory Structure
- `src/` - Source code
  - `src/pages/` - Page components (HomePage, SolutionsPage, WorkPage, AboutPage, IndustriesPage, ContactPage, CallPage)
  - `src/components/layout/` - Shared Layout component with header/footer
  - `src/components/demos/` - 23 interactive AI demo components
  - `src/components/VoiceAssistant/` - RetellAI voice integration
  - `src/components/SEO.jsx` - Reusable SEO component for meta tags
- `public/` - Static assets (sitemap.xml, robots.txt, og-image.png)
- `dist/` - Production build output

## Design Decisions
- **Light theme as default** (class="light" added to HTML element for immediate loading)
- **Gradient colors** only on buttons, icons, and badges (not on text)
- **Hero background image** - Professional AI team collaboration scene with gradient overlay for text contrast
- **Hero text colors** - White text with cyan-400 accent on "AI Solutions" for high visibility
- **"Live AI Demos" badge** - Purple background (bg-purple-600) with white text across all pages
- **Glass-morphism buttons** - Semi-transparent buttons (bg-white/20 backdrop-blur-sm border-white/40) for visibility on gradient backgrounds
- **Case studies** follow Problem-Process-Payoff structure with colored sections
- **Navigation** - Active links use vektar-gradient background with white text
- **Mobile-first** - All pages optimized with responsive typography, spacing, and grids
- **Compact spacing** - Reduced whitespace across all pages for better mobile engagement (py-8/py-12 pattern)

## Footer Layout
- **2-column grid on mobile** (grid-cols-2), 4-column on desktop (md:grid-cols-4)
- **Logo & tagline** at top spanning full width
- **4 link columns**: Solutions (4 core), Company (4 pages), Industries (4 verticals), Contact (phone/email)
- **Compact spacing** - Reduced margins and line heights for shorter footer height

## HomePage Section Flow
1. Hero Section - Full-width background image with AI team scene, white text overlay, stats, and CTA buttons
2. What We Do - "Building Innovative Solutions for the Fast-paced AI & Digital World" (6 capability cards)
3. AI Solutions - "AI Solutions That Drive Results" (12 featured solution cards with purple "Live AI Demos" badge)
4. Social Proof - "Trusted by innovative companies" carousel
5. Testimonials - Client quotes with photos
6. CTA - Final call-to-action section with glass-morphism "View Case Studies" button

## SEO Features
- Sitemap.xml with all 7 pages
- robots.txt allowing all crawlers
- Page-specific meta tags via react-helmet-async
- Open Graph and Twitter Card tags
- FAQ structured data schema
- BreadcrumbList schema

## Recent Changes (January 2026)
- Expanded AI Solutions to 23 interactive demos
- Added enterprise demos: SaaS AI Development, AI Call Center, CRM Development
- Restored legacy demos: RAG, Document Intelligence, Meeting Transcription, Support Bot, Data Enrichment
- Added productivity demos: Quote Copilot, Ticket Deflection, Field Tech Copilot, Executive KPI Copilot
- Comprehensive SEO implementation with structured data

## Development
- Port: 5000 (configured for Replit)
- Run: `npm run dev`
- Build: `npm run build`

## Environment Variables
- `VITE_RETELL_API_KEY` - RetellAI API key
- `VITE_RETELL_AGENT_ID` - RetellAI Agent ID
- `VITE_RETELL_LLM_ID` - RetellAI LLM ID

## Deployment
Static deployment configured with:
- Build command: `npm run build`
- Public directory: `dist`
