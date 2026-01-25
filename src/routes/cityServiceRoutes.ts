import { lazy } from 'react';
import type { ServiceType } from '@/components/CityServicePage';

// Create lazy-loaded wrapper components for each service type
// Each wrapper passes the appropriate serviceType to CityServicePage
const createCityServicePage = (serviceType: ServiceType) => 
  lazy(() => 
    import('@/components/CityServicePage').then(module => ({
      default: () => <module.default serviceType={serviceType} />
    }))
  );

// Lazy-loaded components for each service type
const EvictionCityPage = createCityServicePage('eviction');
const LandlordCityPage = createCityServicePage('landlord');
const TenantCityPage = createCityServicePage('tenant');
const LTBCityPage = createCityServicePage('ltb');
const TrafficCityPage = createCityServicePage('traffic');
const HumanRightsCityPage = createCityServicePage('human-rights');
const SmallClaimsCityPage = createCityServicePage('small-claims');

// Export route configurations
// Only 7 routes total - each handles 550+ cities dynamically via :citySlug
export const cityServiceRoutes = [
  // LTB / Landlord-Tenant routes (highest priority for your business)
  { path: '/eviction-paralegal/:citySlug', element: EvictionCityPage },
  { path: '/landlord-paralegal/:citySlug', element: LandlordCityPage },
  { path: '/tenant-paralegal/:citySlug', element: TenantCityPage },
  { path: '/ltb-paralegal/:citySlug', element: LTBCityPage },
  
  // Human Rights routes (high value, low competition)
  { path: '/human-rights-paralegal/:citySlug', element: HumanRightsCityPage },
  
  // Traffic and Small Claims
  { path: '/traffic-ticket-paralegal/:citySlug', element: TrafficCityPage },
  { path: '/small-claims-paralegal/:citySlug', element: SmallClaimsCityPage },
];
