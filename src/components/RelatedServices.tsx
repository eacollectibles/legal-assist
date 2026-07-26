import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * Related Services Component
 * 
 * Displays related services for internal linking.
 * Critical for SEO - helps search engines understand site structure
 * and distributes page authority across the site.
 * 
 * Usage:
 * <RelatedServices 
 *   services={[
 *     { title: 'Careless Driving', url: '/services/careless-driving-defence', description: '...' }
 *   ]} 
 * />
 */

interface RelatedService {
  title: string;
  url: string;
  description?: string;
}

interface RelatedServicesProps {
  services: RelatedService[];
  title?: string;
  className?: string;
}

export function RelatedServices({ 
  services, 
  title = 'Related Services',
  className = ''
}: RelatedServicesProps) {
  if (!services || services.length === 0) {
    return null;
  }
  
  return (
    <section className={`py-16 md:py-20 bg-muted/30 ${className}`}>
      <div className="max-w-[100rem] mx-auto px-4 md:px-8">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
          {title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.url}
              className="group bg-white border border-border rounded-lg p-6 hover:border-primary/50 hover:shadow-md transition-all"
            >
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              {service.description && (
                <p className="font-paragraph text-sm text-foreground/60 mb-4 line-clamp-2">
                  {service.description}
                </p>
              )}
              <span className="inline-flex items-center text-primary text-sm font-medium">
                Learn about {service.title} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Pre-defined related services for common categories.
//
// BUG FIXED HERE: pages referenced five keys that did not exist on this object
// — `traffic` (24 pages), `employment` (15), `criminal` (7), `general` (5) and
// `criminalPOA` (3). Each of those resolved to `undefined`, and because
// RelatedServices() starts with `if (!services || services.length === 0) return
// null;`, the component rendered NOTHING on 54 pages. The internal-linking
// block this file calls "critical for SEO" was silently absent from all of
// them. TypeScript was flagging it the whole time (~54 of the repo's errors).
//
// Every URL below is verified against the registered routes in src/routes/.
// `traffic` is an ALIAS of `trafficTickets` (same cluster, two names in use)
// rather than a copy, so the two can never drift apart.
// ---------------------------------------------------------------------------

const trafficTickets = [
    { title: 'Speeding Ticket Defence', url: '/services/speeding-ticket-defence', description: 'Fight speeding tickets, reduce fines and protect your insurance.' },
    { title: 'Careless Driving Defence', url: '/services/careless-driving-defence', description: '6 demerit points at stake. Expert defence strategies.' },
    { title: 'Stunt Driving Defence', url: '/services/stunt-driving-defence', description: '50+ over charges. Licence suspension and impound.' },
    { title: 'Distracted Driving', url: '/services/distracted-driving', description: 'Cell phone tickets and handheld device violations.' },
    { title: 'Red Light Tickets', url: '/services/red-light-tickets', description: 'Camera tickets and officer-issued red light violations.' },
    { title: 'No Insurance Defence', url: '/services/no-insurance-defence', description: '$5,000-$25,000 fines. Serious consequences.' },
];

const landlordTenant = [
    { title: 'Eviction - Non-Payment', url: '/services/eviction-non-payment', description: 'L1 applications and N4 notices for rent arrears.' },
    { title: 'N12 Personal Use Eviction', url: '/services/n12-personal-use-eviction', description: 'Eviction for landlord or family personal use.' },
    { title: 'Bad Faith Eviction', url: '/services/bad-faith-eviction', description: 'Compensation for wrongful evictions.' },
    { title: 'Maintenance & Repairs', url: '/services/maintenance-repairs', description: 'T6 applications for landlord repair obligations.' },
    { title: 'Rent Arrears Defence', url: '/services/rent-arrears-defence', description: 'Defend against eviction for non-payment.' },
    { title: 'Illegal Lockout', url: '/services/illegal-lockout', description: 'Emergency relief for illegal lockouts.' },
];

const smallClaims = [
    { title: 'Debt Collection', url: '/services/debt-collection', description: 'Collect money owed to you through Small Claims Court.' },
    { title: 'Contract Disputes', url: '/services/contract-disputes', description: 'Breach of contract and agreement enforcement.' },
    { title: 'Property Damage Claims', url: '/services/property-damage-claims', description: 'Recover compensation for property damage.' },
    { title: 'Unpaid Invoices', url: '/services/unpaid-invoices', description: 'Business debt recovery and invoice collection.' },
    { title: 'Consumer Disputes', url: '/services/consumer-disputes', description: 'Product issues, refunds, and consumer protection.' },
    { title: 'Judgement Enforcement', url: '/services/judgement-enforcement', description: 'Collect on court judgements and orders.' },
];

const humanRights = [
    { title: 'Workplace Discrimination', url: '/services/workplace-discrimination', description: 'Discrimination based on protected grounds at work.' },
    { title: 'Housing Discrimination', url: '/services/housing-discrimination', description: 'Discrimination in rental housing applications.' },
    { title: 'Disability Accommodation', url: '/services/disability-accommodation', description: 'Failure to accommodate disability at work or housing.' },
    { title: 'Sexual Harassment', url: '/services/sexual-harassment', description: 'Unwanted sexual conduct in workplace or housing.' },
    { title: 'Age Discrimination', url: '/services/age-discrimination', description: 'Discrimination based on age in employment.' },
    { title: 'Reprisal Claims', url: '/services/reprisal-claims', description: 'Retaliation for asserting human rights.' },
];

const locations = [
    { title: 'London', url: '/paralegal-london-ontario', description: 'Serving London and Middlesex County.' },
    { title: 'St. Thomas', url: '/st-thomas-paralegal', description: 'Serving St. Thomas and Elgin County.' },
    { title: 'Woodstock', url: '/woodstock-paralegal', description: 'Serving Woodstock and Oxford County.' },
    { title: 'Kitchener-Waterloo', url: '/locations/kitchener', description: 'Serving Region of Waterloo.' },
    { title: 'Windsor', url: '/locations/windsor', description: 'Serving Windsor and Essex County.' },
    { title: 'Sarnia', url: '/locations/sarnia', description: 'Serving Sarnia and Lambton County.' },
];

// --- clusters that were referenced but never defined (the 54-page bug) ------

const employment = [
  { title: 'Wrongful Dismissal', url: '/services/wrongful-dismissal-claims', description: 'Terminated without cause or proper notice.' },
  { title: 'Constructive Dismissal', url: '/services/constructive-dismissal', description: 'Forced to resign by a change to your job.' },
  { title: 'Severance Pay', url: '/services/severance-pay', description: 'What you are owed on termination, and how to get it.' },
  { title: 'Unpaid Wages', url: '/services/unpaid-wages', description: 'Recover unpaid wages, overtime, and vacation pay.' },
  { title: 'Workplace Harassment', url: '/services/workplace-harassment', description: 'Harassment and poisoned work environments.' },
  { title: 'Employment Issues', url: '/services/employment-issues', description: 'Employment standards and workplace disputes.' },
];

const criminal = [
  { title: 'Assault Charges', url: '/services/assault-charges', description: 'Defence for assault and related charges.' },
  { title: 'Theft Charges', url: '/services/theft-charges', description: 'Theft under $5,000 and shoplifting defence.' },
  { title: 'Mischief Charges', url: '/services/mischief-charges', description: 'Property damage and mischief allegations.' },
  { title: 'Trespass Charges', url: '/services/trespass-charges', description: 'Trespass to property and related offences.' },
  { title: 'Bail Hearings', url: '/services/bail-hearings', description: 'Release plans and bail hearing representation.' },
  { title: 'Criminal Matters', url: '/services/criminal-matters', description: 'Where a paralegal can act, and when you need counsel.' },
];

const criminalPOA = [
  { title: 'Provincial Offences', url: '/services/provincial-offences', description: 'Charges under the Provincial Offences Act.' },
  { title: 'Peace Bond', url: '/services/peace-bond', description: 'Section 810 peace bonds and undertakings.' },
  { title: 'By-law Infractions', url: '/services/bylaw-infractions', description: 'Municipal by-law charges and fines.' },
  { title: 'Municipal By-law', url: '/services/municipal-bylaw', description: 'Noise, property standards, and by-law disputes.' },
  { title: 'Causing a Disturbance', url: '/services/causing-disturbance', description: 'Defence for causing a disturbance charges.' },
  { title: 'Trespass to Property', url: '/services/trespass-property', description: 'Trespass to Property Act charges.' },
];

/** The main practice areas — used by the city/landing pages. */
const general = [
  { title: 'Traffic Tickets', url: '/services/traffic-tickets', description: 'Speeding, careless and stunt driving defence.' },
  { title: 'Landlord & Tenant Board', url: '/services/landlord-tenant-board', description: 'Tenant and landlord representation at the LTB.' },
  { title: 'Small Claims Court', url: '/services/small-claims', description: 'Claims up to $50,000 in Small Claims Court.' },
  { title: 'Human Rights Tribunal', url: '/services/human-rights-tribunal', description: 'Discrimination and harassment applications.' },
  { title: 'Provincial Offences', url: '/services/provincial-offences', description: 'Provincial Offences Act charges and by-laws.' },
  { title: 'Employment Issues', url: '/services/employment-issues', description: 'Dismissal, wages, and workplace disputes.' },
];

export const relatedServicesConfig = {
  trafficTickets,
  /** Alias — 24 pages import `.traffic`, 21 import `.trafficTickets`. Same
   *  cluster; aliasing (not copying) keeps them from drifting apart. */
  traffic: trafficTickets,
  landlordTenant,
  smallClaims,
  humanRights,
  locations,
  employment,
  criminal,
  criminalPOA,
  general,
};

export default RelatedServices;
