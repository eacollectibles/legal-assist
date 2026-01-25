import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertCircle, Copy, CheckCircle, Phone, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ConflictDetectedPage() {
  const navigate = useNavigate();
  const [conflictCode, setConflictCode] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Get conflict code from session storage
    const code = sessionStorage.getItem('conflictCode');
    const detected = sessionStorage.getItem('conflictDetected');

    if (!code || detected !== 'true') {
      // Redirect if no conflict detected
      navigate('/client-signup');
      return;
    }

    setConflictCode(code);

    // Clean up session storage
    sessionStorage.removeItem('conflictDetected');
  }, [navigate]);

  const handleCopyCode = () => {
    if (conflictCode) {
      navigator.clipboard.writeText(conflictCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Alert Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertCircle className="w-12 h-12 text-amber-600" />
              </div>
            </div>

            {/* Main Message */}
            <div className="text-center mb-12">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                Conflict of Interest Detected
              </h1>
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                A potential conflict of interest has been detected during your intake process.
              </p>
              <p className="font-paragraph text-base text-foreground/70">
                For your protection, your account has not been created. Our team will review this matter and may contact you.
              </p>
            </div>

            {/* Reference Code Section */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-8 mb-8">
              <p className="font-paragraph text-sm text-amber-800 mb-3 text-center">
                Your Reference Code
              </p>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="text-center">
                  <p className="font-heading text-4xl font-bold text-amber-900 font-mono tracking-widest">
                    {conflictCode}
                  </p>
                </div>
                <Button
                  onClick={handleCopyCode}
                  variant="outline"
                  size="icon"
                  className="border-amber-300 text-amber-700 hover:bg-amber-100"
                  title="Copy reference code"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </Button>
              </div>
              <p className="font-paragraph text-sm text-amber-800 text-center">
                {copied ? 'Code copied to clipboard!' : 'Click to copy your reference code'}
              </p>
            </div>

            {/* Important Information */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
              <h2 className="font-heading text-xl font-bold text-foreground mb-4">
                Important Information
              </h2>
              <ul className="space-y-3 font-paragraph text-foreground/80">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong>Save your reference code:</strong> Please keep this code in a safe place. You may need it for future reference.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong>Our team will review:</strong> A member of our team will review your situation and may contact you at the phone number you provided.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong>Account not created:</strong> Your account has not been created as a protective measure. We will advise you on next steps.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong>Information Security:</strong> All information related to this conflict check is handled securely.
                  </span>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="bg-primary/10 border-2 border-primary rounded-lg p-8 mb-8 text-center">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                Need to Speak with Someone?
              </h2>
              <p className="font-paragraph text-foreground/80 mb-6">
                If you have questions or need to discuss this matter, please contact our office directly.
              </p>
              <a
                href="tel:+13658829515"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors mb-4"
              >
                <Phone className="w-5 h-5" />
                Call Us: 365-882-9515
              </a>
              <p className="font-paragraph text-sm text-foreground/70">
                Available Monday - Friday, 9am - 5pm EST
              </p>
            </div>

            {/* Alternative Resources */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
              <h2 className="font-heading text-xl font-bold text-foreground mb-4">
                Alternative Legal Resources
              </h2>
              <p className="font-paragraph text-sm text-foreground/70 mb-4">
                If you need immediate legal assistance, these resources can help:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <ExternalLink className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <a
                      href="https://lso.ca/public-resources/finding-a-lawyer-or-paralegal/law-society-referral-service"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary hover:underline"
                    >
                      Law Society of Ontario Referral Service
                    </a>
                    <p className="text-sm text-foreground/60">
                      Free 30-minute consultation — 1-800-268-8326
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ExternalLink className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <a
                      href="https://www.legalaid.on.ca/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary hover:underline"
                    >
                      Legal Aid Ontario
                    </a>
                    <p className="text-sm text-foreground/60">
                      Free legal help if you qualify — 1-800-668-8258
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ExternalLink className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <a
                      href="https://www.legalaid.on.ca/legal-clinics/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary hover:underline"
                    >
                      Community Legal Clinics
                    </a>
                    <p className="text-sm text-foreground/60">
                      Free services for eligible individuals in your area
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Notice */}
            <div className="text-center">
              <p className="font-paragraph text-xs text-foreground/50">
                This conflict check has been recorded as required by the Law Society of Ontario.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
