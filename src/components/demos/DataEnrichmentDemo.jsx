import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Database, Sparkles, CheckCircle2, AlertCircle, RefreshCw, ArrowRight, Building2, Mail, Phone, Globe, MapPin, TrendingUp } from 'lucide-react'

const DataEnrichmentDemo = () => {
  const [isEnriching, setIsEnriching] = useState(false)
  const [enrichmentStep, setEnrichmentStep] = useState(0)
  const [enrichedRecords, setEnrichedRecords] = useState(0)

  const rawData = [
    { company: 'Acme Corp', email: 'john@acme.com', phone: '', website: '', industry: '', employees: '', location: '' },
    { company: 'TechStart Inc', email: 'sarah@', phone: '555-123', website: 'techstart.io', industry: '', employees: '', location: '' },
    { company: 'GlobalTrade', email: '', phone: '', website: 'globaltrade.com', industry: 'Logistics', employees: '', location: '' }
  ]

  const enrichedData = [
    { 
      company: 'Acme Corporation', 
      email: 'john@acme.com', 
      phone: '+1 (555) 123-4567', 
      website: 'www.acme.com',
      industry: 'Manufacturing',
      employees: '500-1000',
      location: 'San Francisco, CA',
      confidence: 95
    },
    { 
      company: 'TechStart Inc', 
      email: 'sarah@techstart.io', 
      phone: '+1 (555) 123-8900', 
      website: 'www.techstart.io',
      industry: 'Technology',
      employees: '50-100',
      location: 'Austin, TX',
      confidence: 92
    },
    { 
      company: 'GlobalTrade LLC', 
      email: 'info@globaltrade.com', 
      phone: '+1 (555) 987-6543', 
      website: 'www.globaltrade.com',
      industry: 'Logistics',
      employees: '1000-5000',
      location: 'Chicago, IL',
      confidence: 88
    }
  ]

  const enrichmentSteps = [
    'Validating email formats...',
    'Looking up company information...',
    'Enriching missing fields...',
    'Deduplicating records...',
    'Calculating quality scores...',
    'Complete!'
  ]

  const startEnrichment = () => {
    setIsEnriching(true)
    setEnrichmentStep(0)
    setEnrichedRecords(0)

    const stepInterval = setInterval(() => {
      setEnrichmentStep(prev => {
        if (prev >= enrichmentSteps.length - 1) {
          clearInterval(stepInterval)
          setIsEnriching(false)
          return prev
        }
        return prev + 1
      })
    }, 800)

    const recordInterval = setInterval(() => {
      setEnrichedRecords(prev => {
        if (prev >= 3) {
          clearInterval(recordInterval)
          return 3
        }
        return prev + 1
      })
    }, 1200)
  }

  const DataField = ({ icon: Icon, label, value, enriched, missing }) => (
    <div className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-300 ${
      enriched ? 'bg-emerald-500/10 border border-emerald-500/30' : 
      missing ? 'bg-red-500/10 border border-red-500/30' : 
      'bg-secondary/50'
    }`}>
      <Icon className={`w-4 h-4 ${
        enriched ? 'text-emerald-500' : 
        missing ? 'text-red-400' : 
        'text-muted-foreground'
      }`} />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={`text-sm truncate ${missing ? 'text-red-400 italic' : ''}`}>
          {missing ? 'Missing' : value}
        </p>
      </div>
      {enriched && <Sparkles className="w-4 h-4 text-emerald-500" />}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-lg font-semibold mb-1">Data Enrichment Demo</h4>
          <p className="text-muted-foreground text-sm">Watch AI clean, validate, and enrich your data automatically</p>
        </div>
        <Button 
          onClick={startEnrichment} 
          disabled={isEnriching}
          className="vektar-gradient"
        >
          {isEnriching ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Enriching...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Start Enrichment
            </>
          )}
        </Button>
      </div>

      {isEnriching && (
        <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-amber-500 animate-spin" />
              <div className="flex-1">
                <p className="font-medium text-amber-600">{enrichmentSteps[enrichmentStep]}</p>
                <div className="mt-2 h-2 bg-amber-200/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                    style={{ width: `${((enrichmentStep + 1) / enrichmentSteps.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              <Badge className="bg-amber-500/20 text-amber-600 border-0">
                {enrichedRecords}/3 records
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <h5 className="font-semibold">Raw Data (Before)</h5>
            <Badge variant="outline" className="text-red-500 border-red-300">35% Complete</Badge>
          </div>
          
          {rawData.map((record, idx) => (
            <Card key={idx} className="bg-secondary/30 border-red-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-5 h-5 text-primary" />
                  <span className="font-semibold">{record.company}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <DataField icon={Mail} label="Email" value={record.email} missing={!record.email || record.email.endsWith('@')} />
                  <DataField icon={Phone} label="Phone" value={record.phone} missing={!record.phone || record.phone.length < 10} />
                  <DataField icon={Globe} label="Website" value={record.website} missing={!record.website} />
                  <DataField icon={MapPin} label="Location" value={record.location} missing={!record.location} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <h5 className="font-semibold">Enriched Data (After)</h5>
            <Badge className="bg-emerald-500/20 text-emerald-600 border-0">100% Complete</Badge>
          </div>
          
          {enrichedData.slice(0, enrichedRecords || (enrichmentStep === enrichmentSteps.length - 1 ? 3 : 0)).map((record, idx) => (
            <Card key={idx} className="bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border-emerald-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    <span className="font-semibold">{record.company}</span>
                  </div>
                  <Badge className="bg-emerald-500 text-white border-0 text-xs">
                    {record.confidence}% confidence
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <DataField icon={Mail} label="Email" value={record.email} enriched />
                  <DataField icon={Phone} label="Phone" value={record.phone} enriched />
                  <DataField icon={Globe} label="Website" value={record.website} enriched />
                  <DataField icon={MapPin} label="Location" value={record.location} enriched />
                </div>
              </CardContent>
            </Card>
          ))}
          
          {enrichedRecords === 0 && enrichmentStep !== enrichmentSteps.length - 1 && (
            <div className="flex items-center justify-center h-48 border-2 border-dashed border-border rounded-xl">
              <p className="text-muted-foreground">Click "Start Enrichment" to see results</p>
            </div>
          )}
        </div>
      </div>

      <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-amber-500" />
            <div>
              <p className="font-semibold text-amber-600">+85% Data Quality Improvement</p>
              <p className="text-sm text-muted-foreground">AI validated, cleaned, and enriched all records with high confidence</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DataEnrichmentDemo
