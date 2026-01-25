import { lazy } from 'react';

// Guide Pages
const TenantRightsGuidePage = lazy(() => import('@/components/pages/TenantRightsGuidePage'));
const LandlordRightsGuidePage = lazy(() => import('@/components/pages/LandlordRightsGuidePage'));
const SmallClaimsCourtGuidePage = lazy(() => import('@/components/pages/SmallClaimsCourtGuidePage'));
const LTBHearingGuidePage = lazy(() => import('@/components/pages/LTBHearingGuidePage'));
const HumanRightsComplaintGuidePage = lazy(() => import('@/components/pages/HumanRightsComplaintGuidePage'));
const EmploymentRightsGuidePage = lazy(() => import('@/components/pages/EmploymentRightsGuidePage'));
const LegalDeadlinesGuidePage = lazy(() => import('@/components/pages/LegalDeadlinesGuidePage'));
const BeingSuedGuidePage = lazy(() => import('@/components/pages/BeingSuedGuidePage'));
const ParalegalVsLawyerPage = lazy(() => import('@/components/pages/ParalegalVsLawyerPage'));
const WhatIsAParalegalPage = lazy(() => import('@/components/pages/WhatIsAParalegalPage'));

export const guideRoutes = [
  { path: '/guides/ontario-tenant-rights', element: TenantRightsGuidePage },
  { path: '/guides/ontario-landlord-rights', element: LandlordRightsGuidePage },
  { path: '/guides/small-claims-court-process', element: SmallClaimsCourtGuidePage },
  { path: '/guides/ltb-hearing-preparation', element: LTBHearingGuidePage },
  { path: '/guides/filing-human-rights-complaint', element: HumanRightsComplaintGuidePage },
  { path: '/guides/ontario-employment-rights', element: EmploymentRightsGuidePage },
  { path: '/guides/legal-deadlines-ontario', element: LegalDeadlinesGuidePage },
  { path: '/guides/what-to-do-when-sued', element: BeingSuedGuidePage },
  { path: '/guides/what-is-a-paralegal', element: WhatIsAParalegalPage },
  { path: '/guides/paralegal-vs-lawyer', element: ParalegalVsLawyerPage },
  { path: '/paralegal-vs-lawyer', element: ParalegalVsLawyerPage },
  { path: '/what-is-a-paralegal', element: WhatIsAParalegalPage },
];
