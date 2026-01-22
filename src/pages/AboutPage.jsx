import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { 
  ArrowRight, 
  Rocket, 
  Eye, 
  Brain, 
  Shield, 
  BarChart3, 
  Users,
  CheckCircle,
  Zap,
  Play
} from 'lucide-react'

const AboutPage = () => {
  return (
    <>
      <section className="py-8 sm:py-12 circuit-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              About <span className="text-foreground">Vektar</span>
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground">
              We're not just another AI company. We're your strategic partner in building 
              AI solutions that deliver measurable business results, not just impressive demos.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            <Card className="glass-card p-4 sm:p-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 vektar-gradient rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Our Mission</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                To democratize AI by making enterprise-grade artificial intelligence accessible, 
                practical, and profitable for businesses of all sizes. We believe AI should solve 
                real problems, not create new ones.
              </p>
            </Card>

            <Card className="glass-card p-4 sm:p-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 vektar-gradient rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Our Vision</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                A world where every business can harness the power of AI to unlock growth, 
                improve efficiency, and create exceptional customer experiences—without the 
                complexity or risk traditionally associated with AI implementation.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-10">
            The <span className="text-foreground">Vektar</span> Approach
          </h2>
          
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-14 h-14 sm:w-20 sm:h-20 vektar-gradient rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Business-First Strategy</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                We start with your business objectives, not the technology. Every AI solution 
                is designed to deliver measurable ROI and solve real operational challenges.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 sm:w-20 sm:h-20 vektar-gradient rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Rapid Prototyping</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Our 30-day pilot programs let you see results fast. We build working prototypes 
                that demonstrate value before committing to full-scale implementation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 sm:w-20 sm:h-20 vektar-gradient rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Enterprise-Ready</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Security, compliance, and scalability built-in from day one. Our solutions 
                are designed to grow with your business and meet enterprise standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-10">
            World-Class <span className="text-foreground">Expertise</span>
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <Card className="glass-card p-3 sm:p-6 text-center">
              <div className="w-10 h-10 sm:w-16 sm:h-16 vektar-gradient rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                <Brain className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">AI/ML Engineers</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                PhD-level expertise in machine learning, deep learning, and neural networks
              </p>
            </Card>

            <Card className="glass-card p-3 sm:p-6 text-center">
              <div className="w-10 h-10 sm:w-16 sm:h-16 vektar-gradient rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                <Shield className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Security Specialists</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Enterprise security, compliance, and privacy-by-design implementation
              </p>
            </Card>

            <Card className="glass-card p-3 sm:p-6 text-center">
              <div className="w-10 h-10 sm:w-16 sm:h-16 vektar-gradient rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                <BarChart3 className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Business Analysts</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                ROI optimization, process improvement, and strategic business alignment
              </p>
            </Card>

            <Card className="glass-card p-3 sm:p-6 text-center">
              <div className="w-10 h-10 sm:w-16 sm:h-16 vektar-gradient rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                <Users className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Industry Experts</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Deep domain knowledge across healthcare, finance, manufacturing, and more
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 bg-secondary/20">
        <div className="container mx-auto px-4">
          <Card className="glass-card p-4 sm:p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10">
              Proven <span className="text-foreground">Results</span>
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">150+</div>
                <div className="text-xs sm:text-base text-muted-foreground">AI Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">$50M+</div>
                <div className="text-xs sm:text-base text-muted-foreground">Client ROI Generated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">98%</div>
                <div className="text-xs sm:text-base text-muted-foreground">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-muted-foreground">Industries Served</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-10">
            Our <span className="text-foreground">Values</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="glass-card p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                Transparency
              </h3>
              <p className="text-muted-foreground">
                No black boxes. We explain how our AI works, what data it uses, 
                and how decisions are made. You own your data and understand your systems.
              </p>
            </Card>

            <Card className="glass-card p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Shield className="w-6 h-6 text-blue-500 mr-3" />
                Security First
              </h3>
              <p className="text-muted-foreground">
                Enterprise-grade security isn't an afterthought—it's built into every 
                solution from the ground up. Your data stays secure and compliant.
              </p>
            </Card>

            <Card className="glass-card p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Zap className="w-6 h-6 text-yellow-500 mr-3" />
                Results-Driven
              </h3>
              <p className="text-muted-foreground">
                We measure success by your business outcomes, not technical metrics. 
                Every project is designed to deliver measurable ROI and operational impact.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 vektar-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            Ready to Transform Your Business with AI?
          </h2>
          <p className="text-lg sm:text-xl text-white/80 mb-5 sm:mb-6 max-w-2xl mx-auto">
            Join the companies already seeing real results from AI. Let's discuss 
            how we can help you achieve your business objectives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Book Free Strategy Call
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/solutions">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                <Play className="mr-2 w-5 h-5" />
                See Live Demos
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutPage
