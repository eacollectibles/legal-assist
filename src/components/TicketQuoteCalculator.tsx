import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  Camera, 
  AlertTriangle, 
  CheckCircle, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Shield,
  ChevronRight,
  ChevronDown,
  Info,
  Calculator,
  XCircle,
  Loader2,
  Car,
  Scale
} from 'lucide-react';
import {
  extractTicketDetailsFromImage,
  calculateQuote,
  getOffenceCategories,
  detectSpeedingCategory,
  OFFENCE_TYPES,
  type TicketDetails,
  type QuoteResult,
  type OffenceType
} from '@/lib/ticket-quote-service';

interface TicketQuoteCalculatorProps {
  onQuoteComplete: (quote: QuoteResult) => void;
  onSkip: () => void;
  onBookConsultation: () => void;
}

type InputMode = 'choose' | 'upload' | 'manual';
type UploadStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

export default function TicketQuoteCalculator({
  onQuoteComplete,
  onSkip,
  onBookConsultation
}: TicketQuoteCalculatorProps) {
  const [inputMode, setInputMode] = useState<InputMode>('choose');
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedDetails, setExtractedDetails] = useState<TicketDetails | null>(null);
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Manual entry state
  const [manualOffenceType, setManualOffenceType] = useState<string>('');
  const [manualSpeedOver, setManualSpeedOver] = useState<string>('');
  const [manualFineAmount, setManualFineAmount] = useState<string>('');
  const [showSpeedInput, setShowSpeedInput] = useState(false);

  // Handle file upload
  const handleFileUpload = useCallback(async (file: File) => {
    setUploadedFile(file);
    setUploadStatus('processing');
    setError(null);
    
    try {
      const details = await extractTicketDetailsFromImage(file);
      setExtractedDetails(details);
      const quoteResult = calculateQuote(details);
      setQuote(quoteResult);
      setUploadStatus('success');
    } catch (err) {
      setError('Failed to analyze ticket. Please try again or enter details manually.');
      setUploadStatus('error');
    }
  }, []);

  // Handle drag and drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  // Handle file input change
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  }, [handleFileUpload]);

  // Handle manual offence selection
  const handleOffenceSelect = (offenceId: string) => {
    setManualOffenceType(offenceId);
    setShowSpeedInput(offenceId.startsWith('speeding_') || offenceId === 'stunt_driving');
  };

  // Calculate quote from manual entry
  const handleManualQuote = () => {
    let offenceType = manualOffenceType;
    
    // Auto-detect speeding category if speed entered
    if (showSpeedInput && manualSpeedOver) {
      const speedOver = parseInt(manualSpeedOver);
      if (!isNaN(speedOver)) {
        offenceType = detectSpeedingCategory(speedOver);
      }
    }
    
    if (!offenceType) {
      setError('Please select an offence type');
      return;
    }
    
    const details: TicketDetails = {
      offenceType,
      speedOver: manualSpeedOver ? parseInt(manualSpeedOver) : undefined,
      fineAmount: manualFineAmount ? parseInt(manualFineAmount) : undefined
    };
    
    setExtractedDetails(details);
    const quoteResult = calculateQuote(details);
    setQuote(quoteResult);
  };

  // Reset to start
  const handleReset = () => {
    setInputMode('choose');
    setUploadStatus('idle');
    setUploadedFile(null);
    setExtractedDetails(null);
    setQuote(null);
    setError(null);
    setManualOffenceType('');
    setManualSpeedOver('');
    setManualFineAmount('');
  };

  // Proceed with quote
  const handleProceed = () => {
    if (quote) {
      onQuoteComplete(quote);
    }
  };

  const offenceCategories = getOffenceCategories();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {/* STEP 1: Choose input method */}
        {inputMode === 'choose' && !quote && (
          <motion.div
            key="choose"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Calculator className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Get an Instant Quote
              </h2>
              <p className="text-foreground/70 max-w-xl mx-auto">
                Find out what it costs to fight your ticket and whether it's worth it. 
                Upload your ticket or tell us about it.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Upload Option */}
              <button
                onClick={() => setInputMode('upload')}
                className="group p-6 rounded-xl border-2 border-border hover:border-primary bg-white hover:bg-primary/5 transition-all text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Camera className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground mb-1">
                      Upload Ticket Photo
                    </h3>
                    <p className="text-sm text-foreground/60">
                      Take a photo or upload an image of your ticket. We'll extract the details automatically.
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-foreground/40 group-hover:text-primary transition-colors" />
                </div>
              </button>

              {/* Manual Entry Option */}
              <button
                onClick={() => setInputMode('manual')}
                className="group p-6 rounded-xl border-2 border-border hover:border-primary bg-white hover:bg-primary/5 transition-all text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground mb-1">
                      Enter Details Manually
                    </h3>
                    <p className="text-sm text-foreground/60">
                      Select your offence type and enter the details from your ticket.
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-foreground/40 group-hover:text-primary transition-colors" />
                </div>
              </button>
            </div>

            {/* Skip Option */}
            <div className="text-center pt-4 border-t border-border mt-6">
              <p className="text-sm text-foreground/60 mb-3">
                Not sure about your ticket? Want to discuss your options first?
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={onBookConsultation}
                  className="text-primary hover:text-primary/80 font-medium text-sm"
                >
                  Book a Free Consultation
                </button>
                <span className="hidden sm:inline text-foreground/30">•</span>
                <button
                  onClick={onSkip}
                  className="text-foreground/60 hover:text-foreground font-medium text-sm"
                >
                  Skip Quote & Continue Intake
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 2A: Upload ticket */}
        {inputMode === 'upload' && !quote && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <button
              onClick={() => setInputMode('choose')}
              className="flex items-center gap-2 text-foreground/60 hover:text-foreground text-sm mb-4"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Upload Your Ticket
              </h2>
              <p className="text-foreground/70">
                Take a clear photo of your ticket or upload an existing image
              </p>
            </div>

            {/* Upload Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className={`
                relative border-2 border-dashed rounded-xl p-8 text-center transition-all
                ${uploadStatus === 'processing' ? 'border-primary bg-primary/5' : ''}
                ${uploadStatus === 'error' ? 'border-red-400 bg-red-50' : ''}
                ${uploadStatus === 'idle' ? 'border-border hover:border-primary hover:bg-primary/5 cursor-pointer' : ''}
              `}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={uploadStatus === 'processing'}
              />
              
              {uploadStatus === 'idle' && (
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      Drop your ticket image here
                    </p>
                    <p className="text-sm text-foreground/60 mt-1">
                      or click to browse
                    </p>
                  </div>
                  <p className="text-xs text-foreground/50">
                    Supports JPG, PNG, HEIC up to 10MB
                  </p>
                </div>
              )}
              
              {uploadStatus === 'processing' && (
                <div className="space-y-4">
                  <Loader2 className="w-12 h-12 text-primary mx-auto animate-spin" />
                  <div>
                    <p className="font-medium text-foreground">
                      Analyzing your ticket...
                    </p>
                    <p className="text-sm text-foreground/60 mt-1">
                      This usually takes a few seconds
                    </p>
                  </div>
                </div>
              )}
              
              {uploadStatus === 'error' && (
                <div className="space-y-4">
                  <XCircle className="w-12 h-12 text-red-500 mx-auto" />
                  <div>
                    <p className="font-medium text-red-700">
                      {error || 'Failed to analyze ticket'}
                    </p>
                    <button
                      onClick={() => setUploadStatus('idle')}
                      className="text-sm text-primary hover:underline mt-2"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center">
              <button
                onClick={() => setInputMode('manual')}
                className="text-primary hover:text-primary/80 font-medium text-sm"
              >
                Enter details manually instead
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2B: Manual entry */}
        {inputMode === 'manual' && !quote && (
          <motion.div
            key="manual"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <button
              onClick={() => setInputMode('choose')}
              className="flex items-center gap-2 text-foreground/60 hover:text-foreground text-sm mb-4"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Tell Us About Your Ticket
              </h2>
              <p className="text-foreground/70">
                Select the type of offence on your ticket
              </p>
            </div>

            {/* Offence Selection */}
            <div className="space-y-4">
              {offenceCategories.map((category) => (
                <div key={category.id} className="space-y-2">
                  <h3 className="font-medium text-foreground/80 text-sm uppercase tracking-wide">
                    {category.label}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {category.offences.map((offence) => (
                      <button
                        key={offence.id}
                        onClick={() => handleOffenceSelect(offence.id)}
                        className={`
                          p-3 rounded-lg border text-left transition-all
                          ${manualOffenceType === offence.id 
                            ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                            : 'border-border hover:border-primary/50 bg-white'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-foreground text-sm">
                            {offence.name}
                          </span>
                          {offence.demeritPoints > 0 && (
                            <span className={`
                              text-xs px-2 py-0.5 rounded-full
                              ${offence.demeritPoints >= 6 ? 'bg-red-100 text-red-700' : ''}
                              ${offence.demeritPoints >= 3 && offence.demeritPoints < 6 ? 'bg-yellow-100 text-yellow-700' : ''}
                              ${offence.demeritPoints < 3 ? 'bg-gray-100 text-gray-700' : ''}
                            `}>
                              {offence.demeritPoints} pts
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Speed Input (for speeding offences) */}
            {showSpeedInput && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-blue-50 rounded-lg p-4"
              >
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  How fast were you going over the limit? (optional)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={manualSpeedOver}
                    onChange={(e) => setManualSpeedOver(e.target.value)}
                    placeholder="e.g., 25"
                    className="w-24 px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <span className="text-blue-800">km/h over the limit</span>
                </div>
                <p className="text-xs text-blue-700 mt-2">
                  This helps us give you a more accurate quote. We'll auto-detect the category.
                </p>
              </motion.div>
            )}

            {/* Fine Amount (optional) */}
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Fine amount on ticket (optional)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-foreground/60">$</span>
                <input
                  type="number"
                  value={manualFineAmount}
                  onChange={(e) => setManualFineAmount(e.target.value)}
                  placeholder="e.g., 150"
                  className="w-32 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Calculate Button */}
            <button
              onClick={handleManualQuote}
              disabled={!manualOffenceType}
              className="w-full py-3 px-6 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Calculate Quote
            </button>
          </motion.div>
        )}

        {/* STEP 3: Show Quote Result */}
        {quote && (
          <motion.div
            key="quote"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Quote Header */}
            <div className="text-center mb-6">
              <div className={`
                inline-flex items-center justify-center w-16 h-16 rounded-full mb-4
                ${quote.recommendation === 'strongly_fight' ? 'bg-red-100' : ''}
                ${quote.recommendation === 'fight' ? 'bg-green-100' : ''}
                ${quote.recommendation === 'negotiate' ? 'bg-yellow-100' : ''}
                ${quote.recommendation === 'consider_paying' ? 'bg-gray-100' : ''}
              `}>
                {quote.recommendation === 'strongly_fight' && <AlertTriangle className="w-8 h-8 text-red-600" />}
                {quote.recommendation === 'fight' && <Shield className="w-8 h-8 text-green-600" />}
                {quote.recommendation === 'negotiate' && <Scale className="w-8 h-8 text-yellow-600" />}
                {quote.recommendation === 'consider_paying' && <Info className="w-8 h-8 text-gray-600" />}
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Your Quote for {quote.offence.name}
              </h2>
              <p className={`
                text-lg font-medium
                ${quote.recommendation === 'strongly_fight' ? 'text-red-600' : ''}
                ${quote.recommendation === 'fight' ? 'text-green-600' : ''}
                ${quote.recommendation === 'negotiate' ? 'text-yellow-600' : ''}
                ${quote.recommendation === 'consider_paying' ? 'text-gray-600' : ''}
              `}>
                {quote.recommendation === 'strongly_fight' && 'Strongly Recommend Fighting'}
                {quote.recommendation === 'fight' && 'Recommend Fighting'}
                {quote.recommendation === 'negotiate' && 'Worth Negotiating'}
                {quote.recommendation === 'consider_paying' && 'Consider Your Options'}
              </p>
            </div>

            {/* Main Quote Card */}
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
              {/* Service Fee */}
              <div className="p-6 bg-primary/5 border-b border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">Our Fee to Fight This Ticket</p>
                    <p className="text-4xl font-bold text-primary">${quote.serviceFee}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-foreground/60 mb-1">Ticket Fine</p>
                    <p className="text-2xl font-semibold text-foreground">
                      ${quote.ticketDetails.fineAmount || quote.offence.typicalFineRange[0]}-${quote.offence.typicalFineRange[1]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Insurance Impact */}
              <div className="p-6 border-b border-border">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-red-500" />
                  Estimated Insurance Impact if You Just Pay
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-sm text-red-700 mb-1">Monthly Increase</p>
                    <p className="text-2xl font-bold text-red-600">
                      ${quote.estimatedInsuranceIncrease.monthly[0]}-${quote.estimatedInsuranceIncrease.monthly[1]}
                    </p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-sm text-red-700 mb-1">3-Year Total Impact</p>
                    <p className="text-2xl font-bold text-red-600">
                      ${quote.estimatedInsuranceIncrease.threeYear[0].toLocaleString()}-${quote.estimatedInsuranceIncrease.threeYear[1].toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-foreground/50 mt-3">
                  Based on {quote.offence.demeritPoints} demerit points and average $250/month policy
                </p>
              </div>

              {/* Break-Even Analysis */}
              <div className="p-6 border-b border-border">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary" />
                  The Math
                </h3>
                <p className="text-foreground/80 mb-4">{quote.breakEvenAnalysis.reasoning}</p>
                
                {quote.breakEvenAnalysis.potentialSavings[0] > 0 && (
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-green-700 mb-1">Potential Savings by Fighting</p>
                    <p className="text-2xl font-bold text-green-600">
                      ${quote.breakEvenAnalysis.potentialSavings[0].toLocaleString()}-${quote.breakEvenAnalysis.potentialSavings[1].toLocaleString()}
                    </p>
                    <p className="text-xs text-green-600 mt-1">over 3 years</p>
                  </div>
                )}
              </div>

              {/* Success Rates */}
              <div className="p-6 border-b border-border">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-primary" />
                  Typical Outcomes for {quote.offence.name}
                </h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-blue-600">{quote.offence.successRate.withdrawn}%</p>
                    <p className="text-xs text-blue-700">Withdrawn</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-green-600">{quote.offence.successRate.reduced}%</p>
                    <p className="text-xs text-green-700">Reduced</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-yellow-600">{quote.offence.successRate.convicted}%</p>
                    <p className="text-xs text-yellow-700">Convicted</p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-foreground/60" />
                  <div>
                    <p className="text-sm text-foreground/60">Typical Timeline</p>
                    <p className="font-medium text-foreground">{quote.timeline}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className={`
              rounded-xl p-6
              ${quote.recommendation === 'strongly_fight' ? 'bg-red-50 border border-red-200' : ''}
              ${quote.recommendation === 'fight' ? 'bg-green-50 border border-green-200' : ''}
              ${quote.recommendation === 'negotiate' ? 'bg-yellow-50 border border-yellow-200' : ''}
              ${quote.recommendation === 'consider_paying' ? 'bg-gray-50 border border-gray-200' : ''}
            `}>
              <h3 className="font-semibold text-foreground mb-2">Our Recommendation</h3>
              <p className="text-foreground/80">{quote.recommendationReason}</p>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-foreground/50 text-center">
              {quote.disclaimer}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleProceed}
                className="flex-1 py-3 px-6 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                Proceed with Retainer
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={onBookConsultation}
                className="flex-1 py-3 px-6 bg-white border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
              >
                Book Free Consultation First
              </button>
            </div>
            
            <div className="text-center">
              <button
                onClick={handleReset}
                className="text-foreground/60 hover:text-foreground text-sm"
              >
                Start Over with Different Ticket
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
