import { ScrollText, ExternalLink } from 'lucide-react';

/**
 * Authority Citations Section
 *
 * Renders the governing statutes / regulations / tribunal rules for a
 * service area, with section numbers and (where available) links to
 * the canonical CanLII / Ontario.ca text. Adds the E-E-A-T signal that
 * search engines weight heavily for legal queries and that the 2026-05-29
 * SEO plan flagged as missing (Service Page SEO #4 — "Authority Content").
 *
 * Cited per-service (drop the matching prop block on each page):
 *   • LTB / landlord-tenant — Residential Tenancies Act, 2006
 *   • Small Claims — Courts of Justice Act + Rules of the Small Claims Court
 *   • Traffic / POA — Highway Traffic Act + Provincial Offences Act
 *   • HRTO — Human Rights Code + Statutory Powers Procedure Act
 *
 * Render compactly so it sits well inside an existing service page
 * without dominating the layout. Tightly bordered, scroll icon, two
 * columns on desktop.
 */
export interface Authority {
  /** e.g. "Residential Tenancies Act, 2006" */
  name: string;
  /** e.g. "S.O. 2006, c. 17" */
  citation: string;
  /** Particular sections that drive the matter, e.g. ["s. 7", "s. 47", "Pt. V"] */
  sections?: string[];
  /** Canonical URL — prefer ontario.ca, fallback to canlii.org */
  url?: string;
  /** Short plain-English explainer of what this authority does */
  note?: string;
}

interface AuthorityCitationsProps {
  /** Defaults to "Governing Authorities" */
  heading?: string;
  authorities: Authority[];
  className?: string;
}

export default function AuthorityCitations({
  heading = 'Governing Authorities',
  authorities,
  className = '',
}: AuthorityCitationsProps) {
  if (!authorities || authorities.length === 0) return null;

  return (
    <section
      className={`py-10 md:py-14 bg-secondary/5 border-y border-secondary/15 ${className}`}
      aria-label={heading}
    >
      <div className="max-w-[100rem] mx-auto px-4 md:px-8">
        <div className="flex items-center gap-3 mb-6">
          <ScrollText className="w-5 h-5 text-primary" aria-hidden="true" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            {heading}
          </h2>
        </div>
        <p className="text-sm text-foreground/70 mb-6 max-w-3xl">
          The statutes, regulations, and tribunal rules below govern this
          area of practice. Citations are to the operative section
          numbers a paralegal will rely on when preparing your matter.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {authorities.map((auth) => (
            <div
              key={`${auth.name}-${auth.citation}`}
              className="bg-white border border-secondary/20 rounded-md p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-heading font-semibold text-foreground">
                  {auth.url ? (
                    <a
                      href={auth.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline inline-flex items-center gap-1"
                    >
                      {auth.name}
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  ) : (
                    auth.name
                  )}
                </h3>
              </div>
              <p className="text-xs text-foreground/60 mt-1 italic">
                {auth.citation}
              </p>
              {auth.sections && auth.sections.length > 0 && (
                <p className="text-sm text-foreground/80 mt-2">
                  <span className="font-semibold">Key sections:</span>{' '}
                  {auth.sections.join(', ')}
                </p>
              )}
              {auth.note && (
                <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
                  {auth.note}
                </p>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-foreground/50 mt-6 leading-relaxed">
          This page summarises the governing law for general information.
          It is not legal advice. For advice on a specific matter, book a
          free consultation with a licensed paralegal.
        </p>
      </div>
    </section>
  );
}

/**
 * Pre-built authority sets for the four main service areas.
 * Use these constants to keep citation data consistent across the
 * service umbrella page, city templates, and any related guides.
 */
export const LTB_AUTHORITIES: Authority[] = [
  {
    name: 'Residential Tenancies Act, 2006',
    citation: 'S.O. 2006, c. 17',
    sections: [
      's. 5 (RTA exemptions)',
      's. 47 (no-fault N12 notice)',
      's. 48 (landlord\'s own use)',
      's. 50 (demolition / conversion)',
      's. 57 (bad-faith eviction remedy)',
      'Pt. V (termination)',
    ],
    url: 'https://www.ontario.ca/laws/statute/06r17',
    note:
      'The primary statute. Sets out notices (N4, N5, N12, N13), tenant remedies (T2, T6, T5), and rent rules. The Landlord and Tenant Board is created under Part XII.',
  },
  {
    name: 'O. Reg. 516/06 — General',
    citation: 'O. Reg. 516/06',
    sections: ['s. 3 (rent calculation)', 's. 8 (above-guideline rent)'],
    url: 'https://www.ontario.ca/laws/regulation/060516',
    note:
      'The regulation that fills in rent-calculation and AGI mechanics referenced throughout the RTA.',
  },
  {
    name: 'Statutory Powers Procedure Act',
    citation: 'R.S.O. 1990, c. S.22',
    sections: ['s. 5.4 (notice)', 's. 9 (oral hearings)', 's. 24 (decisions)'],
    url: 'https://www.ontario.ca/laws/statute/90s22',
    note:
      'Governs the procedural rights you have at any Ontario tribunal hearing, including the LTB.',
  },
  {
    name: 'LTB Rules of Procedure',
    citation: 'Tribunals Ontario, current edition',
    sections: ['Rule 7 (notice)', 'Rule 14 (scheduling)', 'Rule 29 (orders)'],
    url: 'https://tribunalsontario.ca/ltb/rules-practice-directions-guidelines/',
    note:
      'The Board\'s own procedural rulebook. Read together with the SPPA and the RTA.',
  },
];

export const SMALL_CLAIMS_AUTHORITIES: Authority[] = [
  {
    name: 'Courts of Justice Act',
    citation: 'R.S.O. 1990, c. C.43',
    sections: ['s. 22 (monetary jurisdiction)', 's. 23 (procedure)', 's. 25 (appeals)'],
    url: 'https://www.ontario.ca/laws/statute/90c43',
    note:
      'Establishes the Small Claims Court as a branch of the Superior Court of Justice and sets its $50,000 monetary ceiling (raised from $35,000 effective January 1, 2025).',
  },
  {
    name: 'Rules of the Small Claims Court',
    citation: 'O. Reg. 258/98',
    sections: [
      'Rule 7 (Plaintiff\'s Claim)',
      'Rule 8 (Defence)',
      'Rule 9 (Defendant\'s Claim)',
      'Rule 11 (default judgment)',
      'Rule 13 (settlement conference)',
      'Rule 17 (trial)',
      'Rule 20 (costs)',
    ],
    url: 'https://www.ontario.ca/laws/regulation/980258',
    note:
      'The forms, deadlines, and procedure that drive every Small Claims file in Ontario.',
  },
  {
    name: 'Limitations Act, 2002',
    citation: 'S.O. 2002, c. 24, Sch. B',
    sections: ['s. 4 (basic 2-year limitation)', 's. 15 (ultimate 15-year)'],
    url: 'https://www.ontario.ca/laws/statute/02l24',
    note:
      'Most contract and tort claims must be commenced within two years of discovery. Miss it and the action is statute-barred.',
  },
];

export const TRAFFIC_AUTHORITIES: Authority[] = [
  {
    name: 'Highway Traffic Act',
    citation: 'R.S.O. 1990, c. H.8',
    sections: [
      's. 128 (speeding)',
      's. 130 (careless driving)',
      's. 144 (red light)',
      's. 172 (stunt driving)',
      's. 216 (fail to stop)',
    ],
    url: 'https://www.ontario.ca/laws/statute/90h8',
    note:
      'The provincial statute that creates most of the offences you see on a Provincial Offence Notice in Ontario.',
  },
  {
    name: 'Provincial Offences Act',
    citation: 'R.S.O. 1990, c. P.33',
    sections: [
      's. 5 (option of paying out)',
      's. 9 (Notice of Intention to Appear)',
      's. 9.1 (early resolution meeting)',
      's. 17.1 (re-opening)',
      's. 50 (right of appeal)',
    ],
    url: 'https://www.ontario.ca/laws/statute/90p33',
    note:
      'Sets the procedure for fighting a ticket, including the 15-day window to file a Notice of Intention to Appear.',
  },
  {
    name: 'Compulsory Automobile Insurance Act',
    citation: 'R.S.O. 1990, c. C.25',
    sections: ['s. 2 (compulsory insurance)', 's. 3 (offences)'],
    url: 'https://www.ontario.ca/laws/statute/90c25',
    note:
      'Drives the s. 2(1)(a) "driving without insurance" charges and the minimum fines attached to them.',
  },
];

export const HRTO_AUTHORITIES: Authority[] = [
  {
    name: 'Human Rights Code',
    citation: 'R.S.O. 1990, c. H.19',
    sections: [
      's. 1 (services)',
      's. 5 (employment)',
      's. 10 (definitions)',
      's. 11 (constructive discrimination)',
      's. 14 (special programs)',
      's. 34 (1-year limitation)',
      's. 45.2 (remedies)',
    ],
    url: 'https://www.ontario.ca/laws/statute/90h19',
    note:
      'The statute that creates the protected grounds and the right to file an Application with the HRTO under s. 34.',
  },
  {
    name: 'HRTO Rules of Procedure',
    citation: 'Tribunals Ontario, current edition',
    sections: [
      'Rule 6 (Form 1 Application)',
      'Rule 16 (Response)',
      'Rule 19 (Reply)',
      'Rule 21 (mediation)',
    ],
    url: 'https://tribunalsontario.ca/hrto/rules-and-practice-directions/',
    note:
      'The Tribunal\'s own procedural rules — read alongside the Code and the SPPA.',
  },
  {
    name: 'Statutory Powers Procedure Act',
    citation: 'R.S.O. 1990, c. S.22',
    sections: ['s. 5.4 (notice)', 's. 23 (interpreters)', 's. 24 (decisions)'],
    url: 'https://www.ontario.ca/laws/statute/90s22',
    note:
      'Procedural rights at any Ontario tribunal hearing, including the HRTO.',
  },
];
