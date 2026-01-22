# Vectorik Website

## Overview
A React + Vite website for Vektar AI Solutions - a company that designs, builds, and scales AI systems for business automation.

## Project Architecture
- **Framework**: React 19 with Vite 6
- **Styling**: Tailwind CSS v4 with Radix UI components
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Voice Assistant**: RetellAI integration

## Directory Structure
- `src/` - Source code
- `public/` - Static assets
- `dist/` - Production build output

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
