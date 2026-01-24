import { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

const STORAGE_KEY = 'legalassist_coming_soon_acknowledged';

export default function ComingSoonModal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already acknowledged
    const acknowledged = localStorage.getItem(STORAGE_KEY);
    if (!acknowledged) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcknowledge = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="coming-soon-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-auto overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 id="coming-soon-title" className="font-heading text-xl md:text-2xl font-bold text-white">
                Coming Soon
              </h2>
              <p className="text-white/90 text-sm font-paragraph">
                Important Notice
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="space-y-4">
            <p className="font-paragraph text-foreground text-base leading-relaxed">
              <strong>LegalAssist Paralegal Services is not yet open for business.</strong>
            </p>
            
            <p className="font-paragraph text-foreground/80 text-base leading-relaxed">
              We are currently in the process of setting up our practice and are <strong>not accepting clients</strong> or providing legal services at this time.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="font-paragraph text-amber-800 text-sm">
                <strong>Please note:</strong> The information on this website is for informational purposes only and does not constitute legal advice. No solicitor-client relationship is formed by visiting this website.
              </p>
            </div>

            <p className="font-paragraph text-foreground/70 text-sm">
              We look forward to serving the London, Ontario community soon. Please check back for updates on our official launch date.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button
            onClick={handleAcknowledge}
            className="w-full bg-primary hover:bg-primary/90 text-white font-paragraph font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            I Understand — Continue to Website
          </button>
          <p className="text-center text-xs text-foreground/50 mt-3 font-paragraph">
            By clicking above, you acknowledge that LegalAssist is not currently offering legal services.
          </p>
        </div>
      </div>
    </div>
  );
}

// Export a function to reset the acknowledgment (useful for testing)
export function resetComingSoonAcknowledgment() {
  localStorage.removeItem(STORAGE_KEY);
}
