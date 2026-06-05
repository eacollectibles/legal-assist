import { Phone, Calendar } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/phone-constants';

/**
 * Sticky mobile call bar — fixed to the bottom of the viewport on
 * phones only. Two large tap targets: Call Now and Book Free
 * Consultation. Visible on every customer-facing page; hidden on:
 *   - admin / dashboard routes (paralegal is signed in)
 *   - the contact / book pages themselves (already at the destination)
 *   - the public e-sign flow (mobile-signature canvas needs full screen)
 *
 * Mobile only (`md:hidden`) — desktop users have the header phone
 * number always visible.
 *
 * Conversion-rate optimisation per Phase 3 of the 2026-05-29 SEO plan
 * (CRO #2). Hits the bottom-thumb zone where every UX study shows the
 * best mobile CTA placement.
 */
export default function StickyMobileCallBar() {
  const { pathname } = useLocation();

  // Suppression list — pages where the bar would be annoying or
  // would overlap meaningful UI.
  const SUPPRESS = [
    /^\/admin(\/|$)/,
    /^\/paralegal-dashboard/,
    /^\/client-dashboard/,
    /^\/client-intake/,
    /^\/contact/,
    /^\/sign\//,        // public sign tokens
    /^\/pay\//,         // payment flow
    /^\/pay\?/,
  ];
  if (SUPPRESS.some((re) => re.test(pathname))) return null;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-primary text-white border-t-2 border-white/20 shadow-lg"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0)' }}
      role="region"
      aria-label="Quick contact"
    >
      <div className="grid grid-cols-2 divide-x divide-white/20">
        <a
          href={PHONE_HREF}
          className="flex items-center justify-center gap-2 py-3 font-semibold text-sm active:bg-primary-dark/40 transition-colors"
          aria-label={`Call ${PHONE_DISPLAY}`}
          data-cta="sticky-call"
        >
          <Phone className="w-4 h-4" aria-hidden="true" />
          <span>Call Now</span>
        </a>
        <a
          href="/contact?source=sticky-bar"
          className="flex items-center justify-center gap-2 py-3 font-semibold text-sm active:bg-primary-dark/40 transition-colors"
          aria-label="Book a free consultation"
          data-cta="sticky-book"
        >
          <Calendar className="w-4 h-4" aria-hidden="true" />
          <span>Free Consultation</span>
        </a>
      </div>
    </div>
  );
}
