# Vektar AI Solutions Website

## Overview
A professional AI consulting website for Vektar AI Solutions featuring multi-page architecture, 8 curated AI demos, RetellAI voice integration, and light theme as default. The site showcases AI solutions for businesses with case studies structured using Problem-Process-Payoff methodology.

## Project Architecture
- **Framework**: React 19 with Vite 6
- **Styling**: Tailwind CSS v4 with Radix UI components
- **Routing**: React Router DOM (7 pages)
- **Animations**: Framer Motion, CSS keyframes
- **Charts**: Recharts
- **Voice Assistant**: RetellAI integration

## AI Solutions (8 Curated - Synced Between HomePage & SolutionsPage)
### Core Business Solutions
1. AI Sales Chatbot (violet-purple) - Lead qualification, CRM integration
2. Voice Receptionist (pink-rose) - Call routing, appointment booking
3. Predictive Analytics (fuchsia-purple) - AI forecasting, trend analysis
4. Business Automation (violet-purple) - Visual workflow builder, app integrations

### Industry-Specific Solutions
5. AI Agent Dispatch & Logistics (emerald-teal) - Route optimization, GPS tracking, driver scheduling
6. 24/7 Healthcare Receptionist (rose-pink) - Appointment booking, symptom triage, insurance verification
7. 24/7 Education Counselor (blue-indigo) - Course recommendations, enrollment, schedule planning
8. 24/7 Plumber & Landscaping (blue-cyan) - Service booking, project quotes, emergency plumbing

## Pages (Multi-Page Architecture)
- **Home** (`/`) - Hero, stats, solutions preview, testimonials, social proof
- **Solutions** (`/solutions`) - 8 AI solutions with interactive demos
- **Work** (`/work`) - Filterable case studies with Problem-Process-Payoff structure
- **About** (`/about`) - Mission, Vision, Values, Team expertise, Vektar Approach
- **Industries** (`/industries`) - 10 industry-specific challenges and solutions
- **Contact** (`/contact`) - Contact form, phone, email, AI conversation CTA
- **Call** (`/call`) - AI-first engagement page with Vektar AI voice assistant (primary CTA destination)

## Directory Structure
- `src/` - Source code
  - `src/pages/` - Page components (HomePage, SolutionsPage, WorkPage, AboutPage, IndustriesPage, ContactPage, CallPage)
  - `src/components/layout/` - Shared Layout component with header/footer
  - `src/components/demos/` - 8 interactive AI demo components (ChatbotDemo, VoiceDemo, PredictiveAnalyticsDemo, BusinessAutomationDemo, DispatchLogisticsDemo, HealthcareReceptionistDemo, EducationCounselorDemo, PlumberLandscapingDemo)
  - `src/components/VoiceAssistant/` - RetellAI voice integration
- `public/` - Static assets
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
3. AI Solutions - "AI Solutions That Drive Results" (8 solution preview cards with purple "Live AI Demos" badge)
4. Social Proof - "Trusted by innovative companies" carousel
5. Testimonials - Client quotes with photos
6. CTA - Final call-to-action section with glass-morphism "View Case Studies" button

## Recent Changes (January 2026)
- Reduced AI Solutions from 16 to 8 curated demos (removed RAG, Document Intelligence, Meeting Transcription, Customer Support Bot, Data Enrichment, Mobile Auto Mechanic, Mobile Tech Service, Mobile HVAC)
- Updated "Live AI Demos" badge to purple (bg-purple-600) with white text
- Fixed "View Case Studies" button visibility with glass-morphism styling
- Refactored footer to 2-column layout on mobile for reduced height
- Added Industries column to footer linking to vertical-specific solutions

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
