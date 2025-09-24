import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Upload, 
  FileText, 
  Image, 
  CheckCircle, 
  AlertCircle,
  Download,
  Eye,
  Zap,
  Database,
  Clock,
  Target,
  FileCheck
} from 'lucide-react'

const DocumentDemo = () => {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [extractedData, setExtractedData] = useState(null)
  const [processingStep, setProcessingStep] = useState(0)
  const fileInputRef = useRef(null)

  const sampleDocuments = [
    {
      id: 1,
      name: "Service Contract - TechCorp.pdf",
      type: "Contract",
      size: "2.4 MB",
      preview: "📄",
      extractedData: {
        documentType: "Service Agreement",
        parties: ["TechCorp Solutions Inc.", "Vectorik AI Solutions"],
        contractValue: "$45,000",
        startDate: "2024-10-01",
        endDate: "2025-09-30",
        keyTerms: [
          "Monthly AI chatbot service",
          "24/7 technical support included",
          "Performance SLA: 99.5% uptime",
          "Data privacy compliance (GDPR)",
          "Quarterly business reviews"
        ],
        paymentTerms: "Net 30 days",
        autoRenewal: "Yes, 12-month terms",
        confidence: 98.5
      }
    },
    {
      id: 2,
      name: "Invoice - INV-2024-0847.pdf",
      type: "Invoice",
      size: "1.1 MB",
      preview: "🧾",
      extractedData: {
        documentType: "Commercial Invoice",
        invoiceNumber: "INV-2024-0847",
        vendor: "DataFlow Systems",
        customer: "Vectorik AI Solutions",
        amount: "$12,750.00",
        dueDate: "2024-10-15",
        lineItems: [
          { description: "AI Model Training Services", quantity: 1, rate: "$8,500.00", total: "$8,500.00" },
          { description: "Data Processing & Cleanup", quantity: 25, rate: "$120.00", total: "$3,000.00" },
          { description: "Technical Consultation", quantity: 5, rate: "$250.00", total: "$1,250.00" }
        ],
        taxRate: "8.5%",
        taxAmount: "$1,083.75",
        confidence: 99.2
      }
    },
    {
      id: 3,
      name: "Legal Brief - Case 2024-CV-1234.pdf",
      type: "Legal Document",
      size: "3.8 MB",
      preview: "⚖️",
      extractedData: {
        documentType: "Legal Brief",
        caseNumber: "2024-CV-1234",
        court: "Superior Court of California",
        plaintiff: "Innovation Labs LLC",
        defendant: "TechStart Inc.",
        filingDate: "2024-09-15",
        keyIssues: [
          "Intellectual property infringement",
          "Trade secret misappropriation",
          "Breach of non-disclosure agreement"
        ],
        requestedRelief: "Injunctive relief and monetary damages",
        attorney: "Sarah Mitchell, Esq.",
        confidence: 96.8
      }
    }
  ]

  const processingSteps = [
    { name: "Document Upload", description: "Receiving and validating file" },
    { name: "OCR Processing", description: "Converting images to text" },
    { name: "Content Analysis", description: "Identifying document structure" },
    { name: "Data Extraction", description: "Extracting key information" },
    { name: "Validation", description: "Verifying extracted data" },
    { name: "Complete", description: "Processing finished" }
  ]

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setUploadedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
        type: file.type.includes('pdf') ? 'PDF' : file.type.includes('image') ? 'Image' : 'Document'
      })
      processDocument()
    }
  }

  const processDocument = async () => {
    setIsProcessing(true)
    setProcessingStep(0)
    setExtractedData(null)

    // Simulate processing steps
    for (let i = 0; i < processingSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400))
      setProcessingStep(i)
    }

    // Simulate extraction results
    setTimeout(() => {
      setExtractedData({
        documentType: "Business Contract",
        confidence: 97.3,
        extractedFields: {
          "Company Name": "TechFlow Solutions Inc.",
          "Contract Number": "CTR-2024-0892",
          "Contract Value": "$28,500",
          "Start Date": "2024-11-01",
          "End Date": "2025-10-31",
          "Payment Terms": "Net 30 days",
          "Contact Person": "Michael Rodriguez",
          "Email": "m.rodriguez@techflow.com",
          "Phone": "(555) 123-4567"
        },
        keyTerms: [
          "AI implementation services",
          "Monthly maintenance included",
          "Performance guarantee: 95% accuracy",
          "Data security compliance",
          "Quarterly progress reviews"
        ],
        processingTime: "2.3 seconds",
        pagesProcessed: 8
      })
      setIsProcessing(false)
    }, 500)
  }

  const useSampleDocument = (doc) => {
    setUploadedFile({
      name: doc.name,
      size: doc.size,
      type: doc.type
    })
    setExtractedData(doc.extractedData)
    setIsProcessing(false)
    setProcessingStep(processingSteps.length - 1)
  }

  const resetDemo = () => {
    setUploadedFile(null)
    setExtractedData(null)
    setIsProcessing(false)
    setProcessingStep(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Interface */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileCheck className="w-5 h-5" />
            <span>Document Intelligence Demo</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Upload a document or try a sample to see AI-powered data extraction in action
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {!uploadedFile ? (
            <>
              {/* Upload Area */}
              <div 
                className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Upload Document</h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop or click to upload PDF, Word, or image files
                </p>
                <Button className="vectorik-gradient hover-glow">
                  Choose File
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Sample Documents */}
              <div>
                <h4 className="font-semibold mb-3">Or try these sample documents:</h4>
                <div className="grid gap-3">
                  {sampleDocuments.map((doc) => (
                    <Card 
                      key={doc.id}
                      className="border border-border hover:border-primary/50 transition-colors cursor-pointer"
                      onClick={() => useSampleDocument(doc)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{doc.preview}</div>
                          <div className="flex-1">
                            <h5 className="font-medium">{doc.name}</h5>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{doc.type}</span>
                              <span>{doc.size}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Try Sample
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Processing Interface */
            <div className="space-y-4">
              {/* File Info */}
              <Card className="border border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-8 h-8 text-primary" />
                      <div>
                        <h5 className="font-medium">{uploadedFile.name}</h5>
                        <p className="text-sm text-muted-foreground">
                          {uploadedFile.type} • {uploadedFile.size}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={resetDemo}>
                      Upload New
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Processing Steps */}
              {isProcessing && (
                <Card className="border border-border">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-4 flex items-center">
                      <Zap className="w-4 h-4 mr-2" />
                      Processing Document
                    </h4>
                    <div className="space-y-3">
                      {processingSteps.map((step, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            index < processingStep ? 'bg-green-500 text-white' :
                            index === processingStep ? 'bg-primary text-white animate-pulse' :
                            'bg-secondary text-muted-foreground'
                          }`}>
                            {index < processingStep ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <span className="text-xs">{index + 1}</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className={`font-medium ${
                              index <= processingStep ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {step.name}
                            </p>
                            <p className="text-xs text-muted-foreground">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Extracted Data */}
      {extractedData && (
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Extraction Complete</span>
              </CardTitle>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Target className="w-4 h-4 mr-1" />
                  {extractedData.confidence}% confidence
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {extractedData.processingTime || "2.3s"}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Document Classification */}
            <div>
              <h4 className="font-semibold mb-3">Document Classification</h4>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="text-sm">
                  {extractedData.documentType}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Confidence: {extractedData.confidence}%
                </span>
              </div>
            </div>

            {/* Extracted Fields */}
            <div>
              <h4 className="font-semibold mb-3">Extracted Data Fields</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(extractedData.extractedFields || {}).map(([key, value]) => (
                  <div key={key} className="bg-secondary/30 rounded-lg p-3">
                    <p className="text-sm font-medium text-muted-foreground">{key}</p>
                    <p className="font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Terms */}
            {extractedData.keyTerms && (
              <div>
                <h4 className="font-semibold mb-3">Key Terms & Clauses</h4>
                <div className="space-y-2">
                  {extractedData.keyTerms.map((term, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <p className="text-sm">{term}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Line Items (for invoices) */}
            {extractedData.lineItems && (
              <div>
                <h4 className="font-semibold mb-3">Line Items</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-2">Description</th>
                        <th className="text-right p-2">Qty</th>
                        <th className="text-right p-2">Rate</th>
                        <th className="text-right p-2">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {extractedData.lineItems.map((item, index) => (
                        <tr key={index} className="border-b border-border/50">
                          <td className="p-2">{item.description}</td>
                          <td className="text-right p-2">{item.quantity}</td>
                          <td className="text-right p-2">{item.rate}</td>
                          <td className="text-right p-2 font-semibold">{item.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-3">
              <Button className="vectorik-gradient hover-glow">
                <Download className="w-4 h-4 mr-2" />
                Export JSON
              </Button>
              <Button variant="outline">
                <Database className="w-4 h-4 mr-2" />
                Send to CRM
              </Button>
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                View Original
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Processing Stats */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <h4 className="font-semibold mb-4">Processing Statistics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">99.1%</div>
              <div className="text-xs text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">2.3s</div>
              <div className="text-xs text-muted-foreground">Avg Processing</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">50+</div>
              <div className="text-xs text-muted-foreground">Document Types</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">24/7</div>
              <div className="text-xs text-muted-foreground">Processing</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DocumentDemo
