# Vektar AI Solutions Website

## Overview
A professional AI consulting website for Vektar AI Solutions featuring multi-page architecture, 12 interactive AI demos, RetellAI voice integration, and light theme as default. The site showcases AI solutions for businesses with case studies structured using Problem-Process-Payoff methodology.

## Project Architecture
- **Framework**: React 19 with Vite 6
- **Styling**: Tailwind CSS v4 with Radix UI components
- **Routing**: React Router DOM (6 pages)
- **Animations**: Framer Motion, CSS keyframes
- **Charts**: Recharts
- **Voice Assistant**: RetellAI integration

## AI Solutions (16 Total - Synced Between HomePage & SolutionsPage)
### Core Business Solutions
1. AI Sales Chatbot (violet-purple) - Lead qualification, CRM integration
2. Voice Receptionist (pink-rose) - Call routing, appointment booking
3. RAG Knowledge Hub (cyan-blue) - Document ingestion, semantic search
4. Document Intelligence (orange-red) - OCR + AI extraction
5. Meeting Transcription (emerald-teal) - Real-time transcription, action items
6. Customer Support Bot (blue-indigo) - Ticket deflection, multi-channel
7. Data Enrichment (amber-orange) - Data cleaning, quality improvement
8. Predictive Analytics (fuchsia-purple) - AI forecasting, trend analysis
9. Business Automation (violet-purple) - Visual workflow builder, app integrations

### Industry-Specific Solutions
10. AI Dispatch & Logistics (emerald-teal) - Route optimization, GPS tracking, driver scheduling
11. 24/7 Healthcare Receptionist (rose-pink) - Appointment booking, symptom triage, insurance verification
12. 24/7 Education Counselor (blue-indigo) - Course recommendations, enrollment, schedule planning
13. 24/7 Mobile Auto Mechanic (orange-red) - Vehicle diagnostics, service scheduling, technician tracking
14. 24/7 Mobile Tech Service (cyan-blue) - Device diagnostics, repair booking, status tracking
15. 24/7 Mobile HVAC Service (sky-indigo) - Emergency dispatch, maintenance scheduling
16. 24/7 Plumber & Landscaping (blue-cyan) - Service booking, project quotes, emergency plumbing

## Pages (Multi-Page Architecture)
- **Home** (`/`) - Hero, stats, solutions preview, testimonials, social proof
- **Solutions** (`/solutions`) - 16 AI solutions with interactive demos
- **Work** (`/work`) - Filterable case studies with Problem-Process-Payoff structure
- **About** (`/about`) - Mission, Vision, Values, Team expertise, Vektar Approach
- **Industries** (`/industries`) - 10 industry-specific challenges and solutions
- **Contact** (`/contact`) - Contact form, phone, email, AI conversation CTA
- **Call** (`/call`) - AI-first engagement page with Vektar AI voice assistant (primary CTA destination)

## Directory Structure
- `src/` - Source code
  - `src/pages/` - Page components (HomePage, SolutionsPage, WorkPage, AboutPage, IndustriesPage, ContactPage, CallPage)
  - `src/components/layout/` - Shared Layout component with header/footer
  - `src/components/demos/` - 16 interactive AI demo components (ChatbotDemo, VoiceDemo, RAGDemo, DocumentDemo, TranscriptionDemo, SupportBotDemo, DataEnrichmentDemo, PredictiveAnalyticsDemo, BusinessAutomationDemo, DispatchLogisticsDemo, HealthcareReceptionistDemo, EducationCounselorDemo, AutoMechanicDemo, TechServiceDemo, HVACServiceDemo, PlumberLandscapingDemo)
  - `src/components/VoiceAssistant/` - RetellAI voice integration
- `public/` - Static assets
- `dist/` - Production build output

## Design Decisions
- **Light theme as default** (class="light" added to HTML element for immediate loading)
- **Gradient colors** only on buttons, icons, and badges (not on text)
- **Hero logo** sized at 192px for better visual hierarchy
- **Case studies** follow Problem-Process-Payoff structure with colored sections
- **Navigation** - Active links use vektar-gradient background with white text
- **Mobile-first** - All pages optimized with responsive typography, spacing, and grids

## HomePage Section Flow
1. Hero Section - Main headline with stats and CTA buttons
2. What We Do - "Building Innovative Solutions for the Fast-paced AI & Digital World" (6 capability cards)
3. AI Solutions - "AI Solutions That Drive Results" (8 solution preview cards)
4. Social Proof - "Trusted by innovative companies" carousel
5. Testimonials - Client quotes with photos
6. CTA - Final call-to-action section

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
