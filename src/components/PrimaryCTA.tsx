import { Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact';

interface PrimaryCTAProps {
  variant?: 'button' | 'link' | 'desktop' | 'mobile' | 'phone' | 'hero' | 'inline' | 'footer';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * PrimaryCTA — Single Source of Truth
 *
 * Standard CTA: "Find Out Where You Stand — Free Case Review" → /contact
 * Secondary CTA: Phone call → tel: link
 *
 * Variants:
 *  - hero: large gold CTA + phone outline button (homepage hero)
 *  - desktop: compact header CTA + phone number
 *  - mobile: full-width CTA + phone icon button (sticky bar)
 *  - button: standard dark CTA (service pages, mid-page)
 *  - inline: same as button (alias)
 *  - footer: gold CTA for dark footer sections
 *  - phone: phone-only link
 *  - link: text-style link
 */

const CTA_TEXT = 'Find Out Where You Stand \u2014 Free Case Review';
const CTA_SHORT = 'Free Case Review';
const CTA_LINK = '/contact';

export default function PrimaryCTA({
  variant = 'button',
  className = '',
  size = 'md'
}: PrimaryCTAProps) {

  const sizeClasses = {
    sm: 'min-h-[44px] px-5 py-2.5 text-sm',
    md: 'min-h-[48px] px-7 py-3.5 text-base',
    lg: 'min-h-[52px] px-9 py-4 text-lg',
    xl: 'min-h-[56px] px-10 py-5 text-lg',
  };

  // Dark matte button — used on light backgrounds
  const primaryClasses = `
    bg-matte text-white font-paragraph font-semibold rounded-xl
    transition-all duration-200 inline-flex items-center justify-center gap-2.5
    hover:bg-matte-light active:scale-[0.98]
    focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none
    shadow-lg hover:shadow-xl
    ${sizeClasses[size]} ${className}
  `.trim().replace(/\s+/g, ' ');

  // Gold button — used on dark backgrounds
  const goldClasses = `
    bg-gold text-matte-dark font-paragraph font-bold rounded-xl
    transition-all duration-200 inline-flex items-center justify-center gap-2.5
    hover:bg-gold-dark hover:text-white active:scale-[0.98]
    focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:outline-none
    shadow-lg hover:shadow-xl
    ${sizeClasses[size]} ${className}
  `.trim().replace(/\s+/g, ' ');

  // Legacy primary button — matches existing terracotta theme for service pages
  const legacyClasses = `
    btn-shine bg-primary text-primary-foreground font-paragraph font-semibold rounded-xl
    transition-all duration-150 inline-flex items-center justify-center gap-2.5
    hover:bg-primary/95 active:scale-[0.98] active:bg-primary/90
    focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none
    shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25
    ${sizeClasses[size]} ${className}
  `.trim().replace(/\s+/g, ' ');

  // ── Hero variant: large gold CTA + phone secondary ──
  if (variant === 'hero') {
    return (
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Link to={CTA_LINK} className={goldClasses.replace(sizeClasses[size], sizeClasses['xl'])}>
          <span>{CTA_TEXT}</span>
          <ArrowRight className="w-5 h-5" aria-hidden="true" />
        </Link>
        <a
          href={PHONE_HREF}
          className="min-h-[52px] px-7 py-3.5 text-base border-2 border-white/20 text-white font-paragraph font-semibold rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2.5 hover:bg-white/10 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:outline-none"
          aria-label={`Call now at ${PHONE_DISPLAY}`}
        >
          <Phone className="w-5 h-5" aria-hidden="true" />
          <span>Call {PHONE_DISPLAY}</span>
        </a>
      </div>
    );
  }

  // ── Desktop header variant ──
  if (variant === 'desktop') {
    return (
      <div className="hidden lg:flex items-center gap-3">
        <Link to={CTA_LINK} className={primaryClasses.replace(sizeClasses[size], sizeClasses['sm'])}>
          <span>{CTA_SHORT}</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
        <a
          href={PHONE_HREF}
          className="min-h-[44px] px-4 py-2 text-sm font-paragraph font-semibold text-secondary hover:text-primary transition-colors inline-flex items-center gap-2 rounded-lg focus-ring"
          aria-label={`Call ${PHONE_DISPLAY}`}
        >
          <Phone className="w-4 h-4" aria-hidden="true" />
          <span>{PHONE_DISPLAY}</span>
        </a>
      </div>
    );
  }

  // ── Mobile sticky variant ──
  if (variant === 'mobile') {
    return (
      <div className="flex items-center gap-2 w-full lg:hidden">
        <Link to={CTA_LINK} className={`${legacyClasses} flex-1`}>
          <span>{CTA_SHORT}</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
        <a
          href={PHONE_HREF}
          className="min-h-[48px] min-w-[48px] flex items-center justify-center bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/90 transition-colors"
          aria-label={`Call ${PHONE_DISPLAY}`}
        >
          <Phone className="w-5 h-5" aria-hidden="true" />
        </a>
      </div>
    );
  }

  // ── Phone-only variant ──
  if (variant === 'phone') {
    return (
      <a
        href={PHONE_HREF}
        className={`text-secondary font-semibold hover:text-primary flex items-center gap-2 transition-colors min-h-[44px] focus-ring rounded ${className}`}
        aria-label={`Call ${PHONE_DISPLAY}`}
      >
        <Phone className="w-4 h-4" aria-hidden="true" />
        {PHONE_DISPLAY}
      </a>
    );
  }

  // ── Footer variant: gold on dark ──
  if (variant === 'footer') {
    return (
      <Link to={CTA_LINK} className={goldClasses.replace(sizeClasses[size], sizeClasses['lg'])}>
        <span>{CTA_TEXT}</span>
        <ArrowRight className="w-5 h-5" aria-hidden="true" />
      </Link>
    );
  }

  // ── Inline variant (mid-page on light bg) ──
  if (variant === 'inline') {
    return (
      <Link to={CTA_LINK} className={primaryClasses}>
        <span>{CTA_TEXT}</span>
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>
    );
  }

  // ── Standard button (backward compatible — used on service pages) ──
  if (variant === 'button') {
    return (
      <Link to={CTA_LINK} className={legacyClasses}>
        <span>{CTA_TEXT}</span>
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>
    );
  }

  // ── Link variant ──
  if (variant === 'link') {
    return (
      <Link
        to={CTA_LINK}
        className={`text-primary font-semibold hover:underline flex items-center gap-1.5 transition-colors min-h-[44px] focus-ring rounded ${className}`}
      >
        {CTA_TEXT}
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>
    );
  }

  return null;
}

export { CTA_TEXT, CTA_SHORT, CTA_LINK };
