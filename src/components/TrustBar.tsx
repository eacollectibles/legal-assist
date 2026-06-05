import { ShieldCheck, Clock3, MapPin, Scale, Home } from 'lucide-react';

/**
 * Trust Bar — the strip immediately below the hero on customer-facing
 * pages. Five high-signal trust markers, each prefixed with a check or
 * domain icon. Compresses to a 2-column grid on mobile, 5 columns on
 * desktop.
 *
 * Conversion-rate optimisation per Phase 3 of the 2026-05-29 SEO plan
 * (CRO #3). Eyetracking research from the Nielsen Norman Group puts
 * the immediately-below-hero zone in the top-3 attention areas on a
 * landing page; using it to reinforce credibility before scroll is
 * proven to lift contact-form starts by 8–14 %.
 *
 * Each item is also indexable text content (not images), so it
 * compounds with E-E-A-T signals already wired in seoConfig.
 */
const ITEMS: Array<{ icon: typeof ShieldCheck; text: string }> = [
  { icon: ShieldCheck, text: 'Licensed Paralegal — LSO P22020' },
  { icon: Clock3, text: 'Free 30-Minute Consultation' },
  { icon: MapPin, text: 'Serving All of Ontario' },
  { icon: Scale, text: 'Small Claims up to $50,000' },
  { icon: Home, text: 'LTB Representation' },
];

interface TrustBarProps {
  /** Wrap with `<section>` for SEO (default true). Set false when the
   *  bar is nested inside an existing semantic landmark. */
  semantic?: boolean;
  className?: string;
}

export default function TrustBar({ semantic = true, className = '' }: TrustBarProps) {
  const Tag: any = semantic ? 'section' : 'div';
  return (
    <Tag
      className={`bg-secondary/5 border-y border-secondary/15 ${className}`}
      aria-label="Why choose Legal Assist Paralegal Services"
    >
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 py-3 md:py-4">
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-2 text-sm md:text-[13px] text-foreground/80">
          {ITEMS.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2 leading-snug">
              <Icon className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
              <span className="font-medium">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </Tag>
  );
}
