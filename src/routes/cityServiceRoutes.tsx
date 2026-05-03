/**
 * Dynamic route generation for city+service SEO pages.
 * Generates ~1,440 routes (160+ cities × 9 services) from city data + templates.
 */
import { lazy } from 'react';
import { getAllCities } from '@/data/cityData';
import type { CityData } from '@/data/cityData';

// Lazy-load service templates
const SmallClaimsCityTemplate = lazy(() => import('@/components/templates/SmallClaimsCityTemplate'));
const LTBCityTemplate = lazy(() => import('@/components/templates/LTBCityTemplate'));
const TrafficTicketCityTemplate = lazy(() => import('@/components/templates/TrafficTicketCityTemplate'));
const CriminalMattersCityTemplate = lazy(() => import('@/components/templates/CriminalMattersCityTemplate'));
const HRTOCityTemplate = lazy(() => import('@/components/templates/HRTOCityTemplate'));
const EmploymentCityTemplate = lazy(() => import('@/components/templates/EmploymentCityTemplate'));
const SBTCityTemplate = lazy(() => import('@/components/templates/SBTCityTemplate'));
const WSIBCityTemplate = lazy(() => import('@/components/templates/WSIBCityTemplate'));
const ProvincialOffencesCityTemplate = lazy(() => import('@/components/templates/ProvincialOffencesCityTemplate'));

// Service definitions
const services = [
  {
    slugSuffix: 'small-claims',
    Template: SmallClaimsCityTemplate,
  },
  {
    slugSuffix: 'landlord-tenant',
    Template: LTBCityTemplate,
  },
  {
    slugSuffix: 'traffic-tickets',
    Template: TrafficTicketCityTemplate,
  },
  {
    slugSuffix: 'criminal-defence',
    Template: CriminalMattersCityTemplate,
  },
  {
    slugSuffix: 'human-rights',
    Template: HRTOCityTemplate,
  },
  {
    slugSuffix: 'employment',
    Template: EmploymentCityTemplate,
  },
  {
    slugSuffix: 'social-benefits',
    Template: SBTCityTemplate,
  },
  {
    slugSuffix: 'wsib',
    Template: WSIBCityTemplate,
  },
  {
    slugSuffix: 'provincial-offences',
    Template: ProvincialOffencesCityTemplate,
  },
];

// Wrapper component factory — creates a component that passes city data to a template
function createCityServicePage(Template: React.ComponentType<{ city: CityData }>, city: CityData) {
  return function CityServicePage() {
    return <Template city={city} />;
  };
}

// Generate all city+service routes
export function generateCityServiceRoutes() {
  const allCities = getAllCities();
  const routes: { path: string; element: React.ComponentType }[] = [];

  for (const city of allCities) {
    for (const service of services) {
      routes.push({
        path: `/locations/${city.slug}/${service.slugSuffix}`,
        element: createCityServicePage(service.Template, city),
      });
    }
  }

  return routes;
}

// Export pre-generated routes for use in router config
export const cityServiceRoutes = generateCityServiceRoutes();
