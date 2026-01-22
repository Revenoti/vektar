import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ArrowRight, Filter } from 'lucide-react'

const WorkPage = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('all')

  const caseStudies = [
    {
      title: "E-commerce Revenue Optimization",
      client: "RetailMax",
      industry: "E-commerce",
      problem: "RetailMax was struggling with low conversion rates and generic product recommendations that failed to engage customers. Their manual approach to pricing couldn't keep up with market dynamics.",
      process: "We implemented an AI-powered personalization engine that analyzes customer behavior in real-time. The system uses machine learning to optimize product recommendations and dynamic pricing strategies based on demand, competition, and customer segments.",
      results: ["+156% conversion rate", "$2.3M additional revenue", "3-month ROI"],
      description: "AI-powered personalization engine that analyzes customer behavior in real-time to optimize product recommendations and pricing strategies.",
      tech: ["Machine Learning", "Real-time Analytics", "A/B Testing"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
    },
    {
      title: "Healthcare Patient Management",
      client: "MedFlow Systems",
      industry: "Healthcare",
      problem: "MedFlow faced excessive patient wait times and administrative bottlenecks. Staff spent hours on scheduling and triage, leading to burnout and patient dissatisfaction.",
      process: "We developed an intelligent scheduling and triage system using NLP to understand patient symptoms and predictive analytics to optimize appointment slots. The system integrates with existing EHR systems while maintaining HIPAA compliance.",
      results: ["-67% wait times", "94% patient satisfaction", "40% cost reduction"],
      description: "Intelligent scheduling and triage system that optimizes patient flow and automates administrative tasks.",
      tech: ["NLP", "Predictive Analytics", "HIPAA Compliance"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop"
    },
    {
      title: "Manufacturing Quality Control",
      client: "TechManufacturing Co.",
      industry: "Manufacturing",
      problem: "Manual quality inspection was slow, inconsistent, and missed subtle defects. This led to customer complaints and costly recalls.",
      process: "We deployed a computer vision system with deep learning models trained on thousands of product images. The system performs real-time defect detection and classification, integrating with IoT sensors on the production line.",
      results: ["99.7% defect detection", "-45% inspection time", "$1.8M savings"],
      description: "Computer vision system for automated quality inspection with real-time defect detection and classification.",
      tech: ["Computer Vision", "Deep Learning", "IoT Integration"],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop"
    },
    {
      title: "Financial Risk Assessment",
      client: "SecureBank",
      industry: "Financial Services",
      problem: "The existing fraud detection system had high false positive rates, frustrating legitimate customers while missing sophisticated fraud patterns.",
      process: "We built an advanced anomaly detection system using ensemble machine learning models. The system processes transactions in real-time, learning from new patterns while maintaining regulatory compliance.",
      results: ["-78% false positives", "Real-time processing", "Regulatory compliance"],
      description: "Advanced fraud detection system using machine learning to identify suspicious transactions and reduce false alarms.",
      tech: ["Anomaly Detection", "Real-time Processing", "Compliance"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
    },
    {
      title: "Legal Document Intelligence",
      client: "LawTech Partners",
      industry: "Legal",
      problem: "Lawyers spent hundreds of hours manually reviewing contracts and legal documents for due diligence, creating bottlenecks and high costs.",
      process: "We developed an AI-powered document analysis system using advanced NLP models for contract analysis. The system extracts key terms, identifies risks, and provides summaries with full audit trails.",
      results: ["-85% review time", "99% accuracy", "500+ hours saved/month"],
      description: "AI-powered contract analysis and due diligence automation for large-scale legal document processing.",
      tech: ["Document AI", "NLP", "Contract Analysis"],
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop"
    },
    {
      title: "Energy Grid Optimization",
      client: "PowerGrid Solutions",
      industry: "Energy",
      problem: "Inefficient energy distribution led to significant waste and unexpected equipment failures caused costly outages.",
      process: "We implemented a smart grid management system using time series analysis and predictive models. The system optimizes energy distribution in real-time and predicts equipment failures before they occur.",
      results: ["-23% energy waste", "Predictive maintenance", "$3.2M savings"],
      description: "Smart grid management system that optimizes energy distribution and predicts equipment failures.",
      tech: ["Predictive Analytics", "IoT", "Time Series Analysis"],
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop"
    }
  ]

  const industries = ['all', ...new Set(caseStudies.map(cs => cs.industry))]
  
  const filteredCaseStudies = selectedIndustry === 'all' 
    ? caseStudies 
    : caseStudies.filter(cs => cs.industry === selectedIndustry)

  return (
    <>
      <section className="py-16 circuit-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Our <span className="text-foreground">Work</span> Speaks for Itself
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From Fortune 500 enterprises to innovative startups, we've delivered AI solutions 
              that drive real business results across industries.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <Filter className="w-5 h-5 text-muted-foreground" />
            {industries.map((industry) => (
              <Button
                key={industry}
                variant={selectedIndustry === industry ? "default" : "outline"}
                className={selectedIndustry === industry ? "vektar-gradient" : "border-primary text-primary hover:bg-primary/10"}
                onClick={() => setSelectedIndustry(industry)}
              >
                {industry === 'all' ? 'All Industries' : industry}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filteredCaseStudies.map((project, index) => (
              <Card key={index} className="glass-card hover-glow overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="vektar-gradient text-white border-0">{project.industry}</Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <p className="text-sm text-muted-foreground font-medium">{project.client}</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-red-500">The Problem</h4>
                    <p className="text-sm text-muted-foreground">{project.problem}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-blue-500">Our Process</h4>
                    <p className="text-sm text-muted-foreground">{project.process}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-green-500">The Payoff</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.results.map((result, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
                          {result}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <Card className="glass-card max-w-3xl mx-auto p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Join Our Success Stories?</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Every project starts with understanding your unique challenges. 
              Let's discuss how AI can transform your business.
            </p>
            <Link to="/contact">
              <Button size="lg" className="vektar-gradient hover-glow">
                Start Your AI Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </>
  )
}

export default WorkPage
