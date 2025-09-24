# Vektar Website - Setup Instructions

## 📦 Package Contents

This zip file contains the complete Vektar AI Solutions website with:

- ✅ **Full React Application** - Modern, responsive website
- ✅ **8 Interactive AI Demos** - Fully functional demo system
- ✅ **Contact Form Integration** - Email capture with validation
- ✅ **Professional Design** - Inspired by leading AI companies
- ✅ **Production Build** - Ready-to-deploy optimized files
- ✅ **Source Code** - Complete development environment

## 🚀 Quick Start

### 1. Extract the Files
```bash
unzip vectorik-website-complete.zip
cd vectorik-website
```

### 2. Install Dependencies
```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

### 3. Development Server
```bash
# Start development server
pnpm run dev

# Or with npm
npm run dev
```

The website will be available at `http://localhost:5173`

### 4. Production Build
```bash
# Build for production
pnpm run build

# Or with npm
npm run build
```

Production files will be in the `dist/` folder.

## 📁 Project Structure

```
vectorik-website/
├── src/
│   ├── components/
│   │   ├── demos/           # 8 Interactive AI demos
│   │   ├── ContactForm.jsx  # Lead capture form
│   │   └── DemoModal.jsx    # Demo system
│   ├── assets/
│   │   └── vectorik-logo.png
│   ├── api/
│   │   └── contact.js       # Email integration
│   └── App.jsx              # Main application
├── dist/                    # Production build (ready to deploy)
├── package.json
└── vite.config.js
```

## 🎯 Key Features

### Interactive Demos
- **AI Sales Chatbot** - Live conversation interface
- **Voice Receptionist** - Call simulation with audio
- **Quote Copilot** - Real-time quote generation
- **RAG Knowledge Hub** - Document search system
- **Ticket Deflection** - Support automation
- **Field Tech Copilot** - Technician assistance
- **Document Intelligence** - File processing
- **Executive KPI Copilot** - Live dashboard

### Contact Form
- Lead capture with validation
- File upload support
- Email integration to info@vektar.com
- Budget range and industry selection

### Design Features
- Responsive design (mobile, tablet, desktop)
- Modern gradient animations
- Glass morphism effects
- Professional color scheme
- Vektar branding integration

## 🌐 Deployment Options

### Option 1: Static Hosting (Recommended)
Deploy the `dist/` folder to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

### Option 2: Traditional Web Server
Upload `dist/` contents to your web server's public directory.

### Option 3: Development Server
For testing purposes, serve the built files:
```bash
cd dist
python3 -m http.server 8080
```

## 📧 Email Configuration

The contact form is configured to send emails to `info@vektar.com`. To customize:

1. Edit `src/api/contact.js`
2. Update the email endpoint or service
3. Rebuild the application

## 🛠 Customization

### Branding
- Logo: Replace `src/assets/vectorik-logo.png`
- Colors: Update CSS variables in `src/App.css`
- Content: Edit text in `src/App.jsx`

### Demos
- Add new demos in `src/components/demos/`
- Update demo list in `src/components/DemoModal.jsx`
- Link demos in main solutions section

## 📞 Support

For questions about this website package:
- Email: info@vektar.com
- The website includes comprehensive documentation
- All source code is included for customization

## 🎉 Ready to Launch!

Your Vektar website is production-ready and includes:
- World-class design and user experience
- 8 fully interactive AI solution demos
- Professional lead capture system
- Complete source code for customization
- Optimized production build

Simply deploy the `dist/` folder to your hosting provider and you're live!
