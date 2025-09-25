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
    <div className="space-y-4 md:space-y-6">
      {/* Upload Interface */}
      <Card className="glass-card">
        <CardHeader className="pb-4 md:pb-6">
          <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
            <FileCheck className="w-4 h-4 md:w-5 md:h-5" />
            <span>Document Intelligence Demo</span>
          </CardTitle>
          <p className="text-muted-foreground text-sm md:text-base">
            Upload a document or try a sample to see AI-powered data extraction in action
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {!uploadedFile ? (
            <>
              {/* Upload Area */}
              <div 
                className="border-2 border-dashed border-border rounded-lg p-6 md:p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-10 h-10 md:w-12 md:h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-sm md:text-base">Upload Document</h3>
                <p className="text-muted-foreground mb-4 text-xs md:text-sm">
                  Drag and drop or click to upload PDF, Word, or image files
                </p>
                <Button className="vectorik-gradient hover-glow min-h-[44px] md:min-h-[auto]">
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
                <h4 className="font-semibold mb-3 text-sm md:text-base">Or try these sample documents:</h4>
                <div className="grid gap-2 md:gap-3">
                  {sampleDocuments.map((doc) => (
                    <Card 
                      key={doc.id}
                      className="border border-border hover:border-primary/50 transition-colors cursor-pointer"
                      onClick={() => useSampleDocument(doc)}
                    >
                      <CardContent className="p-3 md:p-4">
                        <div className="flex items-center space-x-2 md:space-x-3">
                          <div className="text-xl md:text-2xl flex-shrink-0">{doc.preview}</div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-sm md:text-base truncate">{doc.name}</h5>
                            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 text-xs md:text-sm text-muted-foreground">
                              <span>{doc.type}</span>
                              <span>{doc.size}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="min-h-[36px] md:min-h-[auto] shrink-0">
                            <span className="hidden sm:inline">Try Sample</span>
                            <span className="sm:hidden">Try</span>
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
                <CardContent className="p-3 md:p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex items-center space-x-2 md:space-x-3 min-w-0">
                      <FileText className="w-6 h-6 md:w-8 md:h-8 text-primary flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h5 className="font-medium text-sm md:text-base truncate">{uploadedFile.name}</h5>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          {uploadedFile.type} • {uploadedFile.size}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={resetDemo} className="min-h-[36px] md:min-h-[auto] w-full md:w-auto">
                      Upload New
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Processing Steps */}
              {isProcessing && (
                <Card className="border border-border">
                  <CardContent className="p-3 md:p-4">
                    <h4 className="font-semibold mb-3 md:mb-4 flex items-center text-sm md:text-base">
                      <Zap className="w-4 h-4 mr-2" />
                      Processing Document
                    </h4>
                    <div className="space-y-2 md:space-y-3">
                      {processingSteps.map((step, index) => (
                        <div key={index} className="flex items-center space-x-2 md:space-x-3">
                          <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            index < processingStep ? 'bg-green-500 text-white' :
                            index === processingStep ? 'bg-primary text-white animate-pulse' :
                            'bg-secondary text-muted-foreground'
                          }`}>
                            {index < processingStep ? (
                              <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                            ) : (
                              <span className="text-xs">{index + 1}</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium text-sm md:text-base ${
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
          <CardHeader className="pb-4 md:pb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                <span>Extraction Complete</span>
              </CardTitle>
              <div className="flex items-center space-x-3 md:space-x-4 text-xs md:text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Target className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  {extractedData.confidence}% confidence
                </span>
                <span className="flex items-center">
                  <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  {extractedData.processingTime || "2.3s"}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 md:space-y-6">
            {/* Document Classification */}
            <div>
              <h4 className="font-semibold mb-3 text-sm md:text-base">Document Classification</h4>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-2">
                <Badge variant="secondary" className="text-xs md:text-sm w-fit">
                  {extractedData.documentType}
                </Badge>
                <span className="text-xs md:text-sm text-muted-foreground">
                  Confidence: {extractedData.confidence}%
                </span>
              </div>
            </div>

            {/* Extracted Fields */}
            <div>
              <h4 className="font-semibold mb-3 text-sm md:text-base">Extracted Data Fields</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {Object.entries(extractedData.extractedFields || {}).map(([key, value]) => (
                  <div key={key} className="bg-secondary/30 rounded-lg p-3">
                    <p className="text-xs md:text-sm font-medium text-muted-foreground">{key}</p>
                    <p className="font-semibold text-sm md:text-base break-words">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Terms */}
            {extractedData.keyTerms && (
              <div>
                <h4 className="font-semibold mb-3 text-sm md:text-base">Key Terms & Clauses</h4>
                <div className="space-y-2">
                  {extractedData.keyTerms.map((term, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-xs md:text-sm leading-relaxed">{term}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Line Items (for invoices) */}
            {extractedData.lineItems && (
              <div>
                <h4 className="font-semibold mb-3 text-sm md:text-base">Line Items</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs md:text-sm min-w-[500px]">
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
                          <td className="p-2 max-w-[200px] truncate">{item.description}</td>
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
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button className="vectorik-gradient hover-glow min-h-[44px] md:min-h-[auto]">
                <Download className="w-4 h-4 mr-2" />
                Export JSON
              </Button>
              <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-3">
                <Button variant="outline" className="min-h-[44px] md:min-h-[auto]">
                  <Database className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Send to CRM</span>
                </Button>
                <Button variant="outline" className="min-h-[44px] md:min-h-[auto]">
                  <Eye className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">View Original</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Processing Stats */}
      <Card className="glass-card">
        <CardContent className="p-4 md:p-6">
          <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Processing Statistics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-primary">99.1%</div>
              <div className="text-xs text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-green-500">2.3s</div>
              <div className="text-xs text-muted-foreground">Avg Processing</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-blue-500">50+</div>
              <div className="text-xs text-muted-foreground">Document Types</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-purple-500">24/7</div>
              <div className="text-xs text-muted-foreground">Processing</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DocumentDemo
