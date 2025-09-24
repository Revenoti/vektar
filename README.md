# Vektar — AI Solutions That Deliver Real ROI

Vektar is a modern, responsive marketing site showcasing AI solutions, live demos, and a streamlined contact flow. It is built for performance, accessibility, and mobile-first usability.

## Key Highlights

- Responsive design with professional, balanced layout
- Mobile UX optimizations (safe-area support, tap targets, modal sheet behavior)
- Live demos for multiple solutions (Chatbot, Voice, RAG, KPI, Quote, Ticket, Field Tech, Document)
- Contact form with client-side validation and enhanced mobile typing experience

## Tech Stack

- **Vite + React** — Fast development and optimized builds
- **Tailwind CSS** — Utility-first styling framework
- **shadcn/ui components** — High-quality UI primitives
- **Lucide icons** — Beautiful, consistent iconography

## Recent Changes

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
├── App.jsx                     # Main page layout and sections
├── App.css                     # Theme variables, utilities, animations, safe-area support
├── components/
│   ├── DemoModal.jsx          # Live demos with mobile sheet behavior
│   ├── ContactForm.jsx        # Enhanced mobile-optimized form
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

- API functions live in `src/api/contact.js` (e.g., `submitContactForm`, `requestDemo`)
- If connecting to a backend service, add environment variables or config as needed
- No secrets are committed to the repository

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

- Output is a static build (`dist/`) suitable for:
  - Vercel
  - Netlify
  - Cloudflare Pages
  - Any static hosting provider
- Ensure correct base path if deploying to a subpath (configure Vite if needed)

## Notes

- The site uses **custom client-side validation** for the contact form to provide a consistent, branded error experience
- **Browser native validation is disabled** on forms; enter a valid email format (name@domain.tld) to submit successfully
- All mobile optimizations maintain the existing design language while improving usability
- The application is fully responsive and works seamlessly across desktop, tablet, and mobile devices

## Support

For questions or issues, please refer to the contact form on the site or check the project documentation.
