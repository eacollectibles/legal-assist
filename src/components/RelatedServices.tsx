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
                Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Pre-defined related services for common categories
export const relatedServicesConfig = {
  trafficTickets: [
    { title: 'Speeding Ticket Defence', url: '/services/speeding-ticket-defence', description: 'Fight speeding tickets, reduce fines and protect your insurance.' },
    { title: 'Careless Driving Defence', url: '/services/careless-driving-defence', description: '6 demerit points at stake. Expert defence strategies.' },
    { title: 'Stunt Driving Defence', url: '/services/stunt-driving-defence', description: '50+ over charges. Licence suspension and impound.' },
    { title: 'Distracted Driving', url: '/services/distracted-driving', description: 'Cell phone tickets and handheld device violations.' },
    { title: 'Red Light Tickets', url: '/services/red-light-tickets', description: 'Camera tickets and officer-issued red light violations.' },
    { title: 'No Insurance Defence', url: '/services/no-insurance-defence', description: '$5,000-$25,000 fines. Serious consequences.' },
  ],
  
  landlordTenant: [
    { title: 'Eviction - Non-Payment', url: '/services/eviction-non-payment', description: 'L1 applications and N4 notices for rent arrears.' },
    { title: 'N12 Personal Use Eviction', url: '/services/n12-personal-use-eviction', description: 'Eviction for landlord or family personal use.' },
    { title: 'Bad Faith Eviction', url: '/services/bad-faith-eviction', description: 'Compensation for wrongful evictions.' },
    { title: 'Maintenance & Repairs', url: '/services/maintenance-repairs', description: 'T6 applications for landlord repair obligations.' },
    { title: 'Rent Arrears Defence', url: '/services/rent-arrears-defence', description: 'Defend against eviction for non-payment.' },
    { title: 'Illegal Lockout', url: '/services/illegal-lockout', description: 'Emergency relief for illegal lockouts.' },
  ],
  
  smallClaims: [
    { title: 'Debt Collection', url: '/services/debt-collection', description: 'Collect money owed to you through Small Claims Court.' },
    { title: 'Contract Disputes', url: '/services/contract-disputes', description: 'Breach of contract and agreement enforcement.' },
    { title: 'Property Damage Claims', url: '/services/property-damage-claims', description: 'Recover compensation for property damage.' },
    { title: 'Unpaid Invoices', url: '/services/unpaid-invoices', description: 'Business debt recovery and invoice collection.' },
    { title: 'Consumer Disputes', url: '/services/consumer-disputes', description: 'Product issues, refunds, and consumer protection.' },
    { title: 'Judgement Enforcement', url: '/services/judgement-enforcement', description: 'Collect on court judgements and orders.' },
  ],
  
  humanRights: [
    { title: 'Workplace Discrimination', url: '/services/workplace-discrimination', description: 'Discrimination based on protected grounds at work.' },
    { title: 'Housing Discrimination', url: '/services/housing-discrimination', description: 'Discrimination in rental housing applications.' },
    { title: 'Disability Accommodation', url: '/services/disability-accommodation', description: 'Failure to accommodate disability at work or housing.' },
    { title: 'Sexual Harassment', url: '/services/sexual-harassment', description: 'Unwanted sexual conduct in workplace or housing.' },
    { title: 'Age Discrimination', url: '/services/age-discrimination', description: 'Discrimination based on age in employment.' },
    { title: 'Reprisal Claims', url: '/services/reprisal-claims', description: 'Retaliation for asserting human rights.' },
  ],
  
  locations: [
    { title: 'London', url: '/london-paralegal', description: 'Serving London and Middlesex County.' },
    { title: 'St. Thomas', url: '/st-thomas-paralegal', description: 'Serving St. Thomas and Elgin County.' },
    { title: 'Woodstock', url: '/woodstock-paralegal', description: 'Serving Woodstock and Oxford County.' },
    { title: 'Kitchener-Waterloo', url: '/locations/kitchener', description: 'Serving Region of Waterloo.' },
    { title: 'Windsor', url: '/locations/windsor', description: 'Serving Windsor and Essex County.' },
    { title: 'Sarnia', url: '/locations/sarnia', description: 'Serving Sarnia and Lambton County.' },
  ],
};

export default RelatedServices;
