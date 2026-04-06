import { lazy } from 'react';

// Resource Pages
const ResourcesPage = lazy(() => import('@/components/pages/ResourcesPage'));
const LegalNewsPage = lazy(() => import('@/components/pages/LegalNewsPage'));
const LTBFormsPage = lazy(() => import('@/components/pages/LTBFormsPage'));
const SmallClaimsFormsPage = lazy(() => import('@/components/pages/SmallClaimsFormsPage'));
const TrafficTicketFormsPage = lazy(() => import('@/components/pages/TrafficTicketFormsPage'));
const HRTOFormsPage = lazy(() => import('@/components/pages/HRTOFormsPage'));

export const resourceRoutes = [
  { path: '/resources', element: ResourcesPage },
  { path: '/legal-news', element: LegalNewsPage },
  { path: '/resources/forms/ltb', element: LTBFormsPage },
  { path: '/resources/forms/small-claims', element: SmallClaimsFormsPage },
  { path: '/resources/forms/traffic-tickets', element: TrafficTicketFormsPage },
  { path: '/resources/forms/hrto', element: HRTOFormsPage },
];
