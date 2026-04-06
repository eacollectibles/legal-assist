import { lazy } from 'react';

// Resource Pages
const ResourcesPage = lazy(() => import('@/components/pages/ResourcesPage'));
const LegalNewsPage = lazy(() => import('@/components/pages/LegalNewsPage'));

export const resourceRoutes = [
  { path: '/resources', element: ResourcesPage },
  { path: '/legal-news', element: LegalNewsPage },
];
