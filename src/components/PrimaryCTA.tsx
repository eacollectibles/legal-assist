import { Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
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
 */
export default function PrimaryCTA({ 
  variant = 'button', 
  className = '',
  size = 'md'
}: PrimaryCTAProps) {
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const baseClasses = `btn-shine btn-lift bg-primary text-primary-foreground font-paragraph font-semibold rounded-lg transition-all inline-flex items-center justify-center gap-2 ${sizeClasses[size]} ${className}`;

  // Desktop variant: button + phone number beside it
  if (variant === 'desktop') {
    return (
      <div className="hidden md:flex items-center gap-4">
        <a 
          href={PHONE_HREF}
          className={baseClasses}
        >
          <Phone className="w-5 h-5" />
          <span>Call Now for a Free Case Review</span>
        </a>
        <span className="font-paragraph text-secondary font-semibold whitespace-nowrap">
          {PHONE_DISPLAY}
        </span>
      </div>
    );
  }

  // Mobile variant: tel link button
  if (variant === 'mobile') {
    return (
      <a 
        href={PHONE_HREF}
        className={`${baseClasses} md:hidden`}
      >
        <Phone className="w-5 h-5" />
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
      >
        <Phone className="w-5 h-5" />
        <span>Call Now for a Free Case Review</span>
      </a>
    );
  }

  // Link variant (for text links)
  if (variant === 'link') {
    return (
      <a 
        href={PHONE_HREF}
        className="text-primary font-semibold hover:underline flex items-center gap-1 transition-colors"
      >
        <Phone className="w-4 h-4" />
        Call Now for a Free Case Review
      </a>
    );
  }

  return null;
}
