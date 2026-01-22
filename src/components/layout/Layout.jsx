import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Phone 
} from 'lucide-react'
import vectorikLogo from '@/assets/vectorik-logo.png'
import { useTheme } from '@/hooks/useTheme.js'
import FloatingVoiceButton from '@/components/VoiceAssistant/FloatingVoiceButton.jsx'

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { toggleTheme, isDark } = useTheme()
  const location = useLocation()

  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to
    return (
      <Link
        to={to}
        className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
          isActive 
            ? 'vektar-gradient text-white shadow-md' 
            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        {children}
      </Link>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border pad-safe-top">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <img src={vectorikLogo} alt="Vektar" className="w-10 h-10 rounded-full" />
              <span className="text-xl font-bold text-foreground">Vektar</span>
            </Link>

            <div className="hidden md:flex items-center space-x-4">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/solutions">Solutions</NavLink>
              <NavLink to="/industries">Industries</NavLink>
              <NavLink to="/work">Work</NavLink>
              <NavLink to="/about">About</NavLink>
              
              <a 
                href="tel:+13215995514" 
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">321-599-5514</span>
              </a>
              
              <button
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-purple-500" />
                )}
              </button>
              
              <Link to="/contact">
                <Button className="vektar-gradient hover-glow">
                  Book a Free Strategy Call
                </Button>
              </Link>
            </div>

            <button
              className="md:hidden p-2 tap-target"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-border">
              <div className="flex flex-col space-y-2 pt-4">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/solutions">Solutions</NavLink>
                <NavLink to="/industries">Industries</NavLink>
                <NavLink to="/work">Work</NavLink>
                <NavLink to="/about">About</NavLink>
                
                <button
                  onClick={toggleTheme}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  {isDark ? (
                    <>
                      <Sun className="w-5 h-5 text-yellow-500" />
                      <span className="text-muted-foreground">Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-5 h-5 text-purple-500" />
                      <span className="text-muted-foreground">Dark Mode</span>
                    </>
                  )}
                </button>
                
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  <Button className="vektar-gradient hover-glow mt-4 w-full">
                    Book a Free Strategy Call
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="pt-20">
        {children}
      </main>

      <footer className="py-12 border-t border-border bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <img src={vectorikLogo} alt="Vektar" className="w-8 h-8 rounded-full" />
                <span className="text-lg font-bold text-foreground">Vektar</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Building enterprise-grade AI solutions that deliver measurable ROI.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/solutions" className="hover:text-foreground transition-colors">AI Chatbots</Link></li>
                <li><Link to="/solutions" className="hover:text-foreground transition-colors">Voice Assistants</Link></li>
                <li><Link to="/solutions" className="hover:text-foreground transition-colors">Document Intelligence</Link></li>
                <li><Link to="/solutions" className="hover:text-foreground transition-colors">Business Automation</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
                <li><Link to="/work" className="hover:text-foreground transition-colors">Case Studies</Link></li>
                <li><Link to="/industries" className="hover:text-foreground transition-colors">Industries</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="tel:+13215995514" className="hover:text-foreground transition-colors flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>321-599-5514</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@vektar.io" className="hover:text-foreground transition-colors">
                    info@vektar.io
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Vektar AI Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <FloatingVoiceButton />
    </div>
  )
}

export default Layout
