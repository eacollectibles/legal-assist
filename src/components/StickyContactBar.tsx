import { Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact';
import PrimaryCTA from '@/components/PrimaryCTA';

interface StickyContactBarProps {
  isVisible?: boolean;
}

export default function StickyContactBar({ isVisible = true }: StickyContactBarProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="backdrop-blur-lg bg-background/95 border-t border-primary/20 shadow-lg">
        <div className="flex flex-col gap-3 p-4 pb-safe max-w-[100rem] mx-auto">
          {/* Dominant CTA: Call Now for a Free Case Review */}
          <PrimaryCTA variant="mobile" size="md" />
          
          {/* Secondary Contact Options: Visually subordinate */}
          <div className="flex gap-2">
            {/* Phone Tap */}
            <a 
              href={PHONE_HREF}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-paragraph text-secondary bg-white/50 hover:bg-white/70 rounded-lg transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xs:inline">{PHONE_DISPLAY}</span>
              <span className="xs:hidden">Call</span>
            </a>
            
            {/* Email Tap */}
            <a 
              href="mailto:info@legalassist.ca"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-paragraph text-secondary bg-white/50 hover:bg-white/70 rounded-lg transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden xs:inline">Email</span>
              <span className="xs:hidden">Email</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
