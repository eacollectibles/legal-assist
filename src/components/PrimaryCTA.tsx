import { Phone } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact';

interface PrimaryCTAProps {
  variant?: 'button' | 'link' | 'desktop' | 'mobile';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * PrimaryCTA Component
 * Single source of truth for the dominant CTA across the site
 * Text: "Call Now for a Free Case Review"
 * Phone: 365-882-9515
 * 
 * Mobile UX optimizations:
 * - Minimum 48px touch targets (WCAG 2.5.5)
 * - Active states for touch feedback
 * - Proper focus states for accessibility
 */
export default function PrimaryCTA({ 
  variant = 'button', 
  className = '',
  size = 'md'
}: PrimaryCTAProps) {
  
  // Size classes with minimum touch targets for mobile
  const sizeClasses = {
    sm: 'min-h-[44px] px-4 py-2.5 text-sm',
    md: 'min-h-[48px] px-6 py-3 text-base',
    lg: 'min-h-[52px] px-8 py-4 text-lg'
  };

  const baseClasses = `
    btn-shine bg-primary text-primary-foreground font-paragraph font-semibold rounded-xl 
    transition-all duration-150 inline-flex items-center justify-center gap-2.5
    hover:bg-primary/95 active:scale-[0.98] active:bg-primary/90
    focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none
    shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25
    ${sizeClasses[size]} ${className}
  `.trim().replace(/\s+/g, ' ');

  // Desktop variant: button + phone number beside it
  if (variant === 'desktop') {
    return (
      <div className="hidden lg:flex items-center gap-4">
        <a 
          href={PHONE_HREF}
          className={baseClasses}
        >
          <Phone className="w-5 h-5" aria-hidden="true" />
          <span>Call Now for a Free Case Review</span>
        </a>
        <span className="font-paragraph text-secondary font-semibold whitespace-nowrap">
          {PHONE_DISPLAY}
        </span>
      </div>
    );
  }

  // Mobile variant: tel link button - optimized for touch
  if (variant === 'mobile') {
    return (
      <a 
        href={PHONE_HREF}
        className={`${baseClasses} w-full lg:hidden`}
        aria-label={`Call now for a free case review at ${PHONE_DISPLAY}`}
      >
        <Phone className="w-5 h-5" aria-hidden="true" />
        <span>Call Now for a Free Case Review</span>
      </a>
    );
  }

  // Standard button variant (initiates phone call)
  if (variant === 'button') {
    return (
      <a 
        href={PHONE_HREF}
        className={baseClasses}
        aria-label={`Call now for a free case review at ${PHONE_DISPLAY}`}
      >
        <Phone className="w-5 h-5" aria-hidden="true" />
        <span>Call Now for a Free Case Review</span>
      </a>
    );
  }

  // Link variant (for text links)
  if (variant === 'link') {
    return (
      <a 
        href={PHONE_HREF}
        className="text-primary font-semibold hover:underline active:text-primary/80 flex items-center gap-1.5 transition-colors min-h-[44px] focus-ring rounded"
        aria-label={`Call now for a free case review at ${PHONE_DISPLAY}`}
      >
        <Phone className="w-4 h-4" aria-hidden="true" />
        Call Now for a Free Case Review
      </a>
    );
  }

  return null;
}
