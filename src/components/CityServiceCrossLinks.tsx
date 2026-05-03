import { Link } from 'react-router-dom';
import { ArrowRight, Scale, Home, Car, Shield, Briefcase, Heart, HandCoins, HardHat, Gavel } from 'lucide-react';
import type { CityData } from '@/data/cityData';

/**
 * Cross-links between city+service pages.
 * Displayed on each city service page to link to the other 8 services for the same city.
 * Critical for SEO — creates thousands of internal links across all 1,485 city pages.
 */

interface CityServiceCrossLinksProps {
  city: CityData;
  currentService: string; // slug of the current service to exclude it
}

const allServices = [
  { slug: 'small-claims', title: 'Small Claims Court', description: 'Claims up to $50,000 — debt collection, contracts, property damage.', icon: Scale },
  { slug: 'landlord-tenant', title: 'Landlord & Tenant', description: 'LTB hearings — evictions, rent disputes, maintenance issues.', icon: Home },
  { slug: 'traffic-tickets', title: 'Traffic Tickets', description: 'Speeding, careless driving, stunt driving, red lights.', icon: Car },
  { slug: 'criminal-defence', title: 'Criminal Defence', description: 'Summary conviction offences — assault, theft, mischief.', icon: Shield },
  { slug: 'human-rights', title: 'Human Rights Tribunal', description: 'HRTO applications — workplace and housing discrimination.', icon: Heart },
  { slug: 'employment', title: 'Employment Disputes', description: 'Wrongful dismissal, severance, ESA claims.', icon: Briefcase },
  { slug: 'social-benefits', title: 'Social Benefits Tribunal', description: 'ODSP and Ontario Works appeals.', icon: HandCoins },
  { slug: 'wsib', title: 'WSIB Claims', description: 'Workplace injury claims and WSIB appeals.', icon: HardHat },
  { slug: 'provincial-offences', title: 'Provincial Offences', description: 'Regulatory charges, bylaw violations, licensing offences.', icon: Gavel },
];

export default function CityServiceCrossLinks({ city, currentService }: CityServiceCrossLinksProps) {
  const otherServices = allServices.filter(s => s.slug !== currentService);

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[100rem] mx-auto px-4 md:px-8">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3 text-center">
          Other Legal Services in {city.name}
        </h2>
        <p className="font-paragraph text-foreground/60 text-center mb-10 max-w-2xl mx-auto">
          Legal Assist provides a full range of licensed paralegal services in {city.name} and {city.county !== city.name ? city.county : `the surrounding area`}.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {otherServices.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.slug}
                to={`/locations/${city.slug}/${service.slug}`}
                className="group bg-background border border-border rounded-lg p-5 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <Icon className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-heading text-base font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="font-paragraph text-xs text-foreground/60 mb-3 line-clamp-2">
                  {service.description}
                </p>
                <span className="inline-flex items-center text-primary text-xs font-medium">
                  {city.name} <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
