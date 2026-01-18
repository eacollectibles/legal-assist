import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Pen, X } from 'lucide-react';

interface DocumentSignatureProps {
  documentId: string;
  documentName: string;
  onSignatureComplete: (signatureData: SignatureData) => void;
  onCancel: () => void;
}

export interface SignatureData {
  signatureDataUrl: string;
  signedDate: string;
  signedTime: string;
  ipAddress: string;
  timestamp: Date;
}

export default function DocumentSignature({
  documentId,
  documentName,
  onSignatureComplete,
  onCancel,
}: DocumentSignatureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [ipAddress, setIpAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch IP address on mount
  useEffect(() => {
    fetchIPAddress();
  }, []);

  // Dynamic canvas sizing for better mobile experience
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      // Set internal resolution to match displayed size * device pixel ratio
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Scale context to account for device pixel ratio
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const fetchIPAddress = async () => {
    try {
      // Try to get IP from a public API
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setIpAddress(data.ip);
    } catch (error) {
      // Fallback to a placeholder if API fails
      console.error('Failed to fetch IP address:', error);
      setIpAddress('Unable to determine');
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Prevent page scrolling during touch events
    if ('touches' in e) {
      e.preventDefault();
    }

    try {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      setIsDrawing(true);
      const rect = canvas.getBoundingClientRect();
      
      // Get raw coordinates
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      // Calculate coordinates relative to canvas display
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.beginPath();
      ctx.moveTo(x, y);
    } catch (error) {
      console.error('Error starting drawing:', error);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Prevent page scrolling during touch events
    if ('touches' in e) {
      e.preventDefault();
    }

    try {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      
      // Get raw coordinates
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      // Calculate coordinates relative to canvas display
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.lineTo(x, y);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      setHasSignature(true);
    } catch (error) {
      console.error('Error drawing:', error);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasSignature(false);
    } catch (error) {
      console.error('Error clearing signature:', error);
    }
  };

  const handleSubmit = async () => {
    if (!hasSignature) {
      setError('Please provide your signature before submitting');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const canvas = canvasRef.current;
      if (!canvas) {
        throw new Error('Canvas not found');
      }

      // Get signature as data URL
      const signatureDataUrl = canvas.toDataURL('image/png');

      // Get current date and time
      const now = new Date();
      const signedDate = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const signedTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      const signatureData: SignatureData = {
        signatureDataUrl,
        signedDate,
        signedTime,
        ipAddress,
        timestamp: now,
      };

      onSignatureComplete(signatureData);
    } catch (err) {
      console.error('Failed to process signature:', err);
      setError('Failed to process signature. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="font-heading text-2xl flex items-center gap-2">
          <Pen className="w-6 h-6 text-primary" />
          Electronic Signature Required
        </CardTitle>
        <CardDescription className="font-paragraph">
          Please sign the document: <span className="font-semibold text-foreground">{documentName}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="font-paragraph text-red-800">{error}</p>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-heading text-base font-bold text-foreground mb-2 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            How to Sign
          </h3>
          <ul className="font-paragraph text-sm text-foreground/80 space-y-1 ml-7">
            <li>• Use your mouse or finger to draw your signature in the box below</li>
            <li>• Sign naturally as you would on paper</li>
            <li>• Click "Clear" if you want to start over</li>
            <li>• Click "Sign Document" when you're satisfied with your signature</li>
          </ul>
        </div>

        {/* Signature Canvas */}
        <div className="space-y-3">
          <label className="block font-paragraph font-semibold text-foreground text-lg">
            Your Signature *
          </label>
          <div className="border-2 border-dashed border-primary/40 rounded-lg overflow-hidden bg-white shadow-sm hover:border-primary/60 transition-colors">
            <canvas
              ref={canvasRef}
              width={700}
              height={200}
              style={{ touchAction: 'none' }}
              className="w-full cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="font-paragraph text-sm text-foreground/60">
              {hasSignature ? (
                <span className="text-green-600 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Signature captured
                </span>
              ) : (
                'Draw your signature in the box above'
              )}
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={clearSignature}
              disabled={!hasSignature}
              className="border-gray-300 text-foreground hover:bg-gray-50"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          </div>
        </div>

        {/* Signature Details */}
        <div className="bg-gradient-to-br from-pastelbeige/20 to-pastelgreen/20 rounded-lg p-6 border border-pastelbeige space-y-3">
          <h3 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            Signature Verification Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-paragraph text-sm">
            <div className="bg-white/60 rounded-lg p-3">
              <p className="text-foreground/60 mb-1 text-xs uppercase tracking-wide">Date</p>
              <p className="font-semibold text-foreground">
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div className="bg-white/60 rounded-lg p-3">
              <p className="text-foreground/60 mb-1 text-xs uppercase tracking-wide">Time</p>
              <p className="font-semibold text-foreground">
                {new Date().toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true,
                })}
              </p>
            </div>
            <div className="md:col-span-2 bg-white/60 rounded-lg p-3">
              <p className="text-foreground/60 mb-1 text-xs uppercase tracking-wide">IP Address</p>
              <p className="font-semibold text-foreground font-mono">
                {ipAddress || 'Loading...'}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-pastelbeige">
            <p className="font-paragraph text-xs text-foreground/70 leading-relaxed">
              By signing this document, you acknowledge that your electronic signature is legally binding 
              and equivalent to a handwritten signature. The signature, date, time, and IP address 
              will be permanently recorded and attached to this document as proof of your consent.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !hasSignature}
            className="bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg flex items-center gap-2 flex-1 shadow-lg hover:shadow-xl transition-all"
          >
            <CheckCircle className="w-5 h-5" />
            {isLoading ? 'Processing Signature...' : 'Sign Document'}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="border-gray-300 text-foreground hover:bg-gray-50 flex items-center gap-2 py-6"
          >
            <X className="w-5 h-5" />
            Cancel
          </Button>
        </div>

        {/* Additional Help */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="font-paragraph text-xs text-foreground/70 text-center">
            Having trouble? Make sure you're using a mouse or touch-enabled device. 
            Your signature should be clear and legible.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
