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

## Pages (Multi-Page Architecture)
- **Home** (`/`) - Hero, stats, solutions preview, testimonials, social proof
- **Solutions** (`/solutions`) - 12 AI solutions with interactive demos
- **Work** (`/work`) - Filterable case studies with Problem-Process-Payoff structure
- **About** (`/about`) - Mission, Vision, Values, Team expertise, Vektar Approach
- **Industries** (`/industries`) - 10 industry-specific challenges and solutions
- **Contact** (`/contact`) - Contact form, phone, email, location details

## Directory Structure
- `src/` - Source code
  - `src/pages/` - Page components (HomePage, SolutionsPage, WorkPage, AboutPage, IndustriesPage, ContactPage)
  - `src/components/layout/` - Shared Layout component with header/footer
  - `src/components/demos/` - 12 interactive AI demo components
  - `src/components/VoiceAssistant/` - RetellAI voice integration
- `public/` - Static assets
- `dist/` - Production build output

## Design Decisions
- **Light theme as default** (user can toggle to dark)
- **Gradient colors** only on buttons, icons, and badges (not on text)
- **Hero logo** sized at 192px for better visual hierarchy
- **Case studies** follow Problem-Process-Payoff structure with colored sections

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
