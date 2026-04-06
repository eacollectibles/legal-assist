import { Mail, MessageCircle, Calendar } from 'lucide-react';
import { PHONE_TEL } from '@/lib/contact';
import PrimaryCTA from '@/components/PrimaryCTA';

interface StickyContactBarProps {
  isVisible?: boolean;
}

export default function StickyContactBar({ isVisible = true }: StickyContactBarProps) {
  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      role="navigation"
      aria-label="Quick contact options"
    >
      {/* Gradient fade for content visibility */}
      <div className="absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
      
      <div className="backdrop-blur-xl bg-background/95 border-t border-primary/20 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div 
          className="flex flex-col gap-2 p-3 sm:p-4 max-w-[100rem] mx-auto"
          style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
        >
          {/* Primary CTA - Full width, prominent */}
          <PrimaryCTA variant="mobile" size="lg" className="w-full" />
          
          {/* Secondary Contact Options - Three equal width buttons */}
          <div className="flex gap-2">
            {/* Email Tap - 48px touch target */}
            <a 
              href="mailto:info@legalassist.ca"
              className="flex-1 min-h-[48px] flex items-center justify-center gap-2 px-3 text-sm font-paragraph font-medium text-secondary bg-white/60 hover:bg-white/80 active:bg-white active:scale-[0.98] rounded-xl border border-secondary/10 transition-all duration-150 focus-ring"
              aria-label="Email us"
            >
              <Mail className="w-5 h-5 text-primary" />
              <span className="font-semibold">Email</span>
            </a>
            
            {/* Text Tap - 48px touch target */}
            <a 
              href={`sms:${PHONE_TEL}`}
              className="flex-1 min-h-[48px] flex items-center justify-center gap-2 px-3 text-sm font-paragraph font-medium text-secondary bg-white/60 hover:bg-white/80 active:bg-white active:scale-[0.98] rounded-xl border border-secondary/10 transition-all duration-150 focus-ring"
              aria-label="Text us"
            >
              <MessageCircle className="w-5 h-5 text-primary" />
              <span className="font-semibold">Text</span>
            </a>
            
            {/* Appointment Tap - 48px touch target */}
            <a 
              href="/booking"
              className="flex-1 min-h-[48px] flex items-center justify-center gap-2 px-3 text-sm font-paragraph font-medium text-secondary bg-white/60 hover:bg-white/80 active:bg-white active:scale-[0.98] rounded-xl border border-secondary/10 transition-all duration-150 focus-ring"
              aria-label="Book an appointment"
            >
              <Calendar className="w-5 h-5 text-primary" />
              <span className="font-semibold">Appt</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
