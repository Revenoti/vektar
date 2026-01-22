import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  ArrowRight, 
  Home, 
  Heart, 
  Factory, 
  UtensilsCrossed, 
  Palette,
  GraduationCap,
  Building2,
  Truck,
  ShoppingCart,
  Scale
} from 'lucide-react'

const IndustriesPage = () => {
  const industries = [
    { 
      icon: Home, 
      title: 'Home Services', 
      description: 'HVAC, plumbing, electrical, and property management',
      challenges: [
        'High volume of scheduling calls',
        'Field technician coordination',
        'Customer follow-up delays',
        'Seasonal demand fluctuations'
      ],
      solutions: [
        'AI voice receptionist for 24/7 call handling',
        'Smart scheduling and dispatch optimization',
        'Automated appointment reminders and follow-ups',
        'Predictive demand forecasting'
      ],
      results: '-40% missed calls, +35% booking rate'
    },
    { 
      icon: Heart, 
      title: 'Healthcare & Med-Spa', 
      description: 'Clinics, dental offices, med-spas, and wellness centers',
      challenges: [
        'Patient scheduling complexity',
        'HIPAA compliance requirements',
        'Administrative overhead',
        'No-show rates'
      ],
      solutions: [
        'HIPAA-compliant patient intake automation',
        'Smart appointment scheduling with AI',
        'Automated reminder and follow-up systems',
        'Insurance verification automation'
      ],
      results: '-67% wait times, 94% patient satisfaction'
    },
    { 
      icon: Factory, 
      title: 'Industrial & Manufacturing', 
      description: 'Manufacturing, water treatment, and industrial operations',
      challenges: [
        'Quality control bottlenecks',
        'Unplanned equipment downtime',
        'Safety compliance monitoring',
        'Process optimization'
      ],
      solutions: [
        'Computer vision for defect detection',
        'Predictive maintenance systems',
        'IoT-powered safety monitoring',
        'Process automation and optimization'
      ],
      results: '99.7% defect detection, -45% downtime'
    },
    { 
      icon: UtensilsCrossed, 
      title: 'Restaurants & Hospitality', 
      description: 'Restaurants, hotels, and hospitality businesses',
      challenges: [
        'Reservation management',
        'Staff coordination',
        'Inventory waste',
        'Customer experience consistency'
      ],
      solutions: [
        'AI-powered reservation and waitlist management',
        'Smart inventory and demand forecasting',
        'Automated customer feedback analysis',
        'Staff scheduling optimization'
      ],
      results: '-30% food waste, +25% table turnover'
    },
    { 
      icon: Palette, 
      title: 'Digital Agencies', 
      description: 'Marketing agencies, design studios, and creative firms',
      challenges: [
        'Content creation bottlenecks',
        'Client reporting time',
        'Project management overhead',
        'Scalability constraints'
      ],
      solutions: [
        'AI content generation and optimization',
        'Automated performance reporting',
        'Smart project management tools',
        'Client communication automation'
      ],
      results: '-60% reporting time, +40% content output'
    },
    { 
      icon: GraduationCap, 
      title: 'Education', 
      description: 'Schools, universities, and training organizations',
      challenges: [
        'Personalized learning at scale',
        'Administrative burden',
        'Student engagement',
        'Assessment efficiency'
      ],
      solutions: [
        'Adaptive learning systems',
        'Automated administrative processes',
        'AI tutoring and support',
        'Intelligent assessment tools'
      ],
      results: '+45% student engagement, -50% admin time'
    },
    { 
      icon: Building2, 
      title: 'Financial Services', 
      description: 'Banks, insurance, and financial institutions',
      challenges: [
        'Fraud detection accuracy',
        'Regulatory compliance',
        'Customer service scalability',
        'Risk assessment speed'
      ],
      solutions: [
        'Real-time fraud detection systems',
        'Compliance automation',
        'AI-powered customer support',
        'Automated risk assessment'
      ],
      results: '-78% false positives, real-time processing'
    },
    { 
      icon: Scale, 
      title: 'Legal', 
      description: 'Law firms and legal departments',
      challenges: [
        'Document review time',
        'Contract analysis accuracy',
        'Due diligence efficiency',
        'Knowledge management'
      ],
      solutions: [
        'AI document review and analysis',
        'Contract intelligence systems',
        'Automated due diligence',
        'Legal research assistants'
      ],
      results: '-85% review time, 99% accuracy'
    },
    { 
      icon: ShoppingCart, 
      title: 'E-commerce & Retail', 
      description: 'Online stores and retail businesses',
      challenges: [
        'Personalization at scale',
        'Customer support volume',
        'Inventory management',
        'Cart abandonment'
      ],
      solutions: [
        'AI recommendation engines',
        'Chatbot customer support',
        'Demand forecasting',
        'Abandoned cart recovery'
      ],
      results: '+156% conversion, $2.3M revenue'
    },
    { 
      icon: Truck, 
      title: 'Logistics & Supply Chain', 
      description: 'Transportation and supply chain companies',
      challenges: [
        'Route optimization',
        'Demand forecasting',
        'Inventory visibility',
        'Delivery tracking'
      ],
      solutions: [
        'AI route optimization',
        'Predictive demand planning',
        'Real-time tracking systems',
        'Automated dispatch'
      ],
      results: '-25% fuel costs, +30% on-time delivery'
    }
  ]

  return (
    <>
      <section className="py-16 circuit-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-foreground">Redefining Industries</span> with AI
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We specialize in delivering AI solutions across diverse industries, 
              each tailored to specific challenges and opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <Card key={index} className="glass-card hover-glow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 vektar-gradient rounded-xl flex items-center justify-center">
                      <industry.icon className="w-7 h-7 text-white" />
                    </div>
                    <Badge className="vektar-gradient text-white border-0 text-xs">
                      {industry.results}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mt-4">{industry.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{industry.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-red-500">Common Challenges</h4>
                    <ul className="space-y-1">
                      {industry.challenges.map((challenge, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-green-500">Our Solutions</h4>
                    <ul className="space-y-1">
                      {industry.solutions.map((solution, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 vektar-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Don't See Your Industry?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Our AI solutions are adaptable to any industry. Let's discuss your specific challenges 
            and how we can help transform your operations.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Schedule a Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}

export default IndustriesPage
