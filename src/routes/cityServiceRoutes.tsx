import { lazy, ComponentType } from 'react';

// Lazy load the CityServicePage component
const CityServicePage = lazy(() => import('@/components/CityServicePage'));

// Create wrapper components for each service type
// Using a factory function to avoid JSX in the route definitions
function createServiceWrapper(serviceType: string): ComponentType {
  return function ServiceWrapper() {
    return <CityServicePage serviceType={serviceType as any} />;
  };
}

// Lazy-loaded wrapper components for each service type
const EvictionCityPage = createServiceWrapper('eviction');
const LandlordCityPage = createServiceWrapper('landlord');
const TenantCityPage = createServiceWrapper('tenant');
const LTBCityPage = createServiceWrapper('ltb');
const TrafficCityPage = createServiceWrapper('traffic');
const HumanRightsCityPage = createServiceWrapper('human-rights');
const SmallClaimsCityPage = createServiceWrapper('small-claims');

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
