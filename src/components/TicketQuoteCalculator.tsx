/**
 * Traffic Ticket Quote Calculator Component
 * Allows users to upload ticket photo or manually select offence to get instant quote
 */

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Upload, 
  FileText, 
  Car, 
  Calculator, 
  AlertTriangle, 
  CheckCircle2, 
  DollarSign, 
  Clock, 
  TrendingUp,
  ChevronRight,
  RotateCcw,
  Camera,
  Loader2,
  Shield,
  Scale
} from 'lucide-react';
import {
  extractTicketDetailsFromImage,
  calculateQuote,
  getAllOffences,
  getOffenceById,
  OFFENCE_CATEGORIES,
  type TicketDetails,
  type QuoteResult,
  type OffenceType,
} from '@/lib/ticket-quote-service';

interface TicketQuoteCalculatorProps {
  onQuoteComplete?: (quote: QuoteResult) => void;
  onSkip?: () => void;
}

type InputMode = 'choice' | 'upload' | 'manual';
type CalculatorState = 'input' | 'processing' | 'quote';

export default function TicketQuoteCalculator({ onQuoteComplete, onSkip }: TicketQuoteCalculatorProps) {
  const [inputMode, setInputMode] = useState<InputMode>('choice');
  const [calculatorState, setCalculatorState] = useState<CalculatorState>('input');
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [error, setError] = useState<string>('');

  // Upload state
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Manual entry state
  const [selectedOffenceId, setSelectedOffenceId] = useState<string>('');
  const [manualSpeed, setManualSpeed] = useState<string>('');
  const [manualSpeedLimit, setManualSpeedLimit] = useState<string>('');
  const [manualFine, setManualFine] = useState<string>('');

  const allOffences = getAllOffences();

  // Group offences by category for the dropdown
  const groupedOffences = allOffences.reduce((acc, offence) => {
    const categoryName = OFFENCE_CATEGORIES[offence.category as keyof typeof OFFENCE_CATEGORIES];
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(offence);
    return acc;
  }, {} as Record<string, OffenceType[]>);

  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  // Handle file drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setUploadedFile(file);
        setError('');
      } else {
        setError('Please upload an image file (JPG, PNG, etc.)');
      }
    }
  }, []);

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        setUploadedFile(file);
        setError('');
      } else {
        setError('Please upload an image file (JPG, PNG, etc.)');
      }
    }
  };

  // Process uploaded image
  const processUploadedImage = async () => {
    if (!uploadedFile) return;

    setCalculatorState('processing');
    setError('');

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        const result = await extractTicketDetailsFromImage(base64);

        if (result.success && result.details) {
          const quoteResult = calculateQuote(result.details);
          setQuote(quoteResult);
          setCalculatorState('quote');
        } else {
          setError(result.error || 'Failed to extract ticket details. Please try manual entry.');
          setCalculatorState('input');
          setInputMode('manual');
        }
      };
      reader.readAsDataURL(uploadedFile);
    } catch (err) {
      setError('An error occurred. Please try manual entry.');
      setCalculatorState('input');
      setInputMode('manual');
    }
  };

  // Process manual entry
  const processManualEntry = () => {
    if (!selectedOffenceId) {
      setError('Please select an offence type');
      return;
    }

    const offence = getOffenceById(selectedOffenceId);
    if (!offence) {
      setError('Invalid offence selected');
      return;
    }

    setCalculatorState('processing');
    setError('');

    // Simulate brief processing
    setTimeout(() => {
      const ticketDetails: TicketDetails = {
        offenceType: offence.name,
        offenceId: offence.id,
        demeritPoints: offence.demeritPoints,
        speed: manualSpeed ? parseInt(manualSpeed) : undefined,
        speedLimit: manualSpeedLimit ? parseInt(manualSpeedLimit) : undefined,
        fineAmount: manualFine ? parseInt(manualFine) : undefined,
      };

      const quoteResult = calculateQuote(ticketDetails);
      setQuote(quoteResult);
      setCalculatorState('quote');
    }, 500);
  };

  // Reset calculator
  const resetCalculator = () => {
    setInputMode('choice');
    setCalculatorState('input');
    setQuote(null);
    setError('');
    setUploadedFile(null);
    setSelectedOffenceId('');
    setManualSpeed('');
    setManualSpeedLimit('');
    setManualFine('');
  };

  // Handle proceeding with the quote
  const handleProceed = () => {
    if (quote && onQuoteComplete) {
      onQuoteComplete(quote);
    }
  };

  // Render the choice screen
  const renderChoiceScreen = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Car className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
          Get Your Free Quote
        </h3>
        <p className="font-paragraph text-foreground/70 max-w-md mx-auto">
          Find out how much you could save by fighting your traffic ticket. Choose how you'd like to provide your ticket information.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Upload Option */}
        <button
          onClick={() => setInputMode('upload')}
          className="group p-6 rounded-xl border-2 border-foreground/10 hover:border-primary/50 bg-white hover:bg-primary/5 transition-all text-left"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-heading font-bold text-foreground mb-1">Upload Ticket Photo</h4>
              <p className="font-paragraph text-sm text-foreground/60">
                Take a photo or upload an image of your ticket. We'll extract the details automatically.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-foreground/40 group-hover:text-primary transition-colors" />
          </div>
        </button>

        {/* Manual Entry Option */}
        <button
          onClick={() => setInputMode('manual')}
          className="group p-6 rounded-xl border-2 border-foreground/10 hover:border-primary/50 bg-white hover:bg-primary/5 transition-all text-left"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-heading font-bold text-foreground mb-1">Enter Manually</h4>
              <p className="font-paragraph text-sm text-foreground/60">
                Select your offence type from our list and enter the details yourself.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-foreground/40 group-hover:text-primary transition-colors" />
          </div>
        </button>
      </div>

      {onSkip && (
        <div className="text-center pt-4">
          <button
            onClick={onSkip}
            className="font-paragraph text-sm text-foreground/60 hover:text-primary underline"
          >
            Skip for now — I'll discuss my ticket during consultation
          </button>
        </div>
      )}
    </div>
  );

  // Render upload screen
  const renderUploadScreen = () => (
    <div className="space-y-6">
      <button
        onClick={() => setInputMode('choice')}
        className="flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors"
      >
        <ChevronRight className="w-4 h-4 rotate-180" />
        <span className="font-paragraph text-sm">Back to options</span>
      </button>

      <div className="text-center mb-6">
        <h3 className="font-heading text-xl font-bold text-foreground mb-2">
          Upload Your Ticket
        </h3>
        <p className="font-paragraph text-sm text-foreground/70">
          Upload a clear photo of your traffic ticket. We'll extract the details automatically.
        </p>
      </div>

      {/* Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragActive
            ? 'border-primary bg-primary/5'
            : uploadedFile
            ? 'border-green-400 bg-green-50'
            : 'border-foreground/20 hover:border-primary/50'
        }`}
      >
        {uploadedFile ? (
          <div className="space-y-3">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
            <p className="font-paragraph font-medium text-green-700">{uploadedFile.name}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setUploadedFile(null)}
              className="mt-2"
            >
              Remove & Upload Different
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <Upload className="w-12 h-12 text-foreground/40 mx-auto" />
            <div>
              <p className="font-paragraph font-medium text-foreground">
                Drag & drop your ticket image here
              </p>
              <p className="font-paragraph text-sm text-foreground/60">or click to browse</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="font-paragraph text-sm text-red-700">{error}</p>
        </div>
      )}

      <Button
        onClick={processUploadedImage}
        disabled={!uploadedFile}
        className="w-full bg-primary hover:bg-primary/90"
      >
        <Calculator className="w-4 h-4 mr-2" />
        Analyze Ticket & Get Quote
      </Button>
    </div>
  );

  // Render manual entry screen
  const renderManualScreen = () => (
    <div className="space-y-6">
      <button
        onClick={() => setInputMode('choice')}
        className="flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors"
      >
        <ChevronRight className="w-4 h-4 rotate-180" />
        <span className="font-paragraph text-sm">Back to options</span>
      </button>

      <div className="text-center mb-6">
        <h3 className="font-heading text-xl font-bold text-foreground mb-2">
          Enter Ticket Details
        </h3>
        <p className="font-paragraph text-sm text-foreground/70">
          Select your offence type and provide any additional details you have.
        </p>
      </div>

      <div className="space-y-4">
        {/* Offence Type Selection */}
        <div>
          <Label className="font-paragraph font-semibold">Offence Type *</Label>
          <Select value={selectedOffenceId} onValueChange={setSelectedOffenceId}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select your offence..." />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(groupedOffences).map(([category, offences]) => (
                <div key={category}>
                  <div className="px-2 py-1.5 text-xs font-semibold text-foreground/50 bg-gray-50">
                    {category}
                  </div>
                  {offences.map((offence) => (
                    <SelectItem key={offence.id} value={offence.id}>
                      {offence.name} ({offence.demeritPoints} pts)
                    </SelectItem>
                  ))}
                </div>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Speed fields (show only for speeding offences) */}
        {selectedOffenceId?.startsWith('speeding') && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="font-paragraph font-semibold">Your Speed (km/h)</Label>
              <Input
                type="number"
                value={manualSpeed}
                onChange={(e) => setManualSpeed(e.target.value)}
                placeholder="e.g., 85"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="font-paragraph font-semibold">Speed Limit (km/h)</Label>
              <Input
                type="number"
                value={manualSpeedLimit}
                onChange={(e) => setManualSpeedLimit(e.target.value)}
                placeholder="e.g., 60"
                className="mt-1"
              />
            </div>
          </div>
        )}

        {/* Fine Amount (optional) */}
        <div>
          <Label className="font-paragraph font-semibold">Set Fine Amount (optional)</Label>
          <Input
            type="number"
            value={manualFine}
            onChange={(e) => setManualFine(e.target.value)}
            placeholder="e.g., 140"
            className="mt-1"
          />
          <p className="font-paragraph text-xs text-foreground/60 mt-1">
            If you know the fine amount on your ticket, enter it here for a more accurate quote.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="font-paragraph text-sm text-red-700">{error}</p>
        </div>
      )}

      <Button
        onClick={processManualEntry}
        disabled={!selectedOffenceId}
        className="w-full bg-primary hover:bg-primary/90"
      >
        <Calculator className="w-4 h-4 mr-2" />
        Calculate My Quote
      </Button>
    </div>
  );

  // Render processing screen
  const renderProcessingScreen = () => (
    <div className="py-12 text-center">
      <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
      <h3 className="font-heading text-xl font-bold text-foreground mb-2">
        Analyzing Your Ticket...
      </h3>
      <p className="font-paragraph text-foreground/70">
        Please wait while we calculate your personalized quote.
      </p>
    </div>
  );

  // Render quote result screen
  const renderQuoteScreen = () => {
    if (!quote) return null;

    const recommendationColors = {
      strongly_fight: 'bg-red-100 border-red-400 text-red-800',
      fight: 'bg-green-100 border-green-400 text-green-800',
      negotiate: 'bg-yellow-100 border-yellow-400 text-yellow-800',
      consider_paying: 'bg-gray-100 border-gray-400 text-gray-800',
    };

    const recommendationLabels = {
      strongly_fight: 'Strongly Recommend Fighting',
      fight: 'Recommend Fighting',
      negotiate: 'Consider Negotiation',
      consider_paying: 'May Consider Paying',
    };

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
            Your Quote is Ready
          </h3>
          <p className="font-paragraph text-foreground/70">
            Based on your {quote.offence.name}
          </p>
        </div>

        {/* Recommendation Banner */}
        <div className={`rounded-lg border-2 p-4 ${recommendationColors[quote.recommendation]}`}>
          <div className="flex items-center gap-3">
            {quote.recommendation === 'strongly_fight' || quote.recommendation === 'fight' ? (
              <Shield className="w-6 h-6" />
            ) : (
              <Scale className="w-6 h-6" />
            )}
            <div>
              <p className="font-heading font-bold">{recommendationLabels[quote.recommendation]}</p>
              <p className="text-sm opacity-80">{quote.recommendationReason}</p>
            </div>
          </div>
        </div>

        {/* Key Numbers */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-primary/5 rounded-lg p-4 text-center">
            <DollarSign className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="font-heading text-2xl font-bold text-primary">${quote.serviceFee}</p>
            <p className="font-paragraph text-sm text-foreground/70">Our Service Fee</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <TrendingUp className="w-6 h-6 text-red-500 mx-auto mb-2" />
            <p className="font-heading text-2xl font-bold text-red-600">
              ${quote.estimatedInsuranceImpact.threeYearTotal}
            </p>
            <p className="font-paragraph text-sm text-foreground/70">Est. 3-Year Insurance Impact</p>
          </div>
        </div>

        {/* Details */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <h4 className="font-heading font-bold text-foreground">Ticket Details</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div>
              <span className="text-foreground/60">Offence:</span>
              <span className="ml-2 font-medium">{quote.offence.name}</span>
            </div>
            <div>
              <span className="text-foreground/60">Demerit Points:</span>
              <span className="ml-2 font-medium">{quote.offence.demeritPoints}</span>
            </div>
            <div>
              <span className="text-foreground/60">Fine Range:</span>
              <span className="ml-2 font-medium">
                ${quote.offence.fineRange.min} - ${quote.offence.fineRange.max}
              </span>
            </div>
            <div>
              <span className="text-foreground/60">Monthly Insurance +:</span>
              <span className="ml-2 font-medium">
                ~${quote.estimatedInsuranceImpact.monthlyIncrease}/mo
              </span>
            </div>
          </div>
        </div>

        {/* Success Rates */}
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-heading font-bold text-foreground mb-3">Our Success Rates</h4>
          <div className="flex gap-2">
            <div className="flex-1 text-center p-2 bg-white rounded">
              <p className="font-heading text-lg font-bold text-green-600">
                {quote.offence.successRate.withdrawn}%
              </p>
              <p className="text-xs text-foreground/60">Withdrawn</p>
            </div>
            <div className="flex-1 text-center p-2 bg-white rounded">
              <p className="font-heading text-lg font-bold text-yellow-600">
                {quote.offence.successRate.reduced}%
              </p>
              <p className="text-xs text-foreground/60">Reduced</p>
            </div>
            <div className="flex-1 text-center p-2 bg-white rounded">
              <p className="font-heading text-lg font-bold text-red-600">
                {quote.offence.successRate.convicted}%
              </p>
              <p className="text-xs text-foreground/60">Convicted</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
          <Clock className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-paragraph font-medium text-blue-800">Estimated Timeline</p>
            <p className="text-sm text-blue-700">{quote.estimatedTimeline}</p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="font-paragraph text-xs text-foreground/50 italic">{quote.disclaimer}</p>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={resetCalculator} className="flex-1">
            <RotateCcw className="w-4 h-4 mr-2" />
            Start Over
          </Button>
          <Button onClick={handleProceed} className="flex-1 bg-primary hover:bg-primary/90">
            Proceed with Retainer
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {onSkip && (
          <div className="text-center">
            <button
              onClick={onSkip}
              className="font-paragraph text-sm text-foreground/60 hover:text-primary underline"
            >
              Book a consultation to discuss first
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="bg-primary/5 border-b border-primary/10">
        <CardTitle className="font-heading text-xl flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          Traffic Ticket Quote Calculator
        </CardTitle>
        <CardDescription className="font-paragraph">
          Get an instant estimate of costs and potential savings
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {calculatorState === 'input' && inputMode === 'choice' && renderChoiceScreen()}
        {calculatorState === 'input' && inputMode === 'upload' && renderUploadScreen()}
        {calculatorState === 'input' && inputMode === 'manual' && renderManualScreen()}
        {calculatorState === 'processing' && renderProcessingScreen()}
        {calculatorState === 'quote' && renderQuoteScreen()}
      </CardContent>
    </Card>
  );
}
