import { lazy } from 'react';

// Human Rights & Employment Pages
const HumanRightsTribunalPage = lazy(() => import('@/components/pages/HumanRightsTribunalPage'));
const EmploymentIssuesPage = lazy(() => import('@/components/pages/EmploymentIssuesPage'));
const WorkplaceDiscriminationPage = lazy(() => import('@/components/pages/WorkplaceDiscriminationPage'));
const HousingDiscriminationPage = lazy(() => import('@/components/pages/HousingDiscriminationPage'));

// Criminal & Other Pages
const CriminalMattersPage = lazy(() => import('@/components/pages/CriminalMattersPage'));
const BailHearingsPage = lazy(() => import('@/components/pages/BailHearingsPage'));
const NotaryPublicPage = lazy(() => import('@/components/pages/NotaryPublicPage'));
const CommissionerOfOathsPage = lazy(() => import('@/components/pages/CommissionerOfOathsPage'));
const MediationServicesPage = lazy(() => import('@/components/pages/MediationServicesPage'));
const SocialBenefitsTribunalPage = lazy(() => import('@/components/pages/SocialBenefitsTribunalPage'));
const IRBRepresentationPage = lazy(() => import('@/components/pages/IRBRepresentationPage'));

export const otherServiceRoutes = [
  { path: '/services/human-rights-tribunal', element: HumanRightsTribunalPage },
  { path: '/services/employment-issues', element: EmploymentIssuesPage },
  { path: '/services/workplace-discrimination', element: WorkplaceDiscriminationPage },
  { path: '/services/housing-discrimination', element: HousingDiscriminationPage },
  { path: '/services/criminal-matters', element: CriminalMattersPage },
  { path: '/services/bail-hearings', element: BailHearingsPage },
  { path: '/services/notary-public', element: NotaryPublicPage },
  { path: '/services/commissioner-of-oaths', element: CommissionerOfOathsPage },
  { path: '/services/mediation', element: MediationServicesPage },
  { path: '/services/social-benefits-tribunal', element: SocialBenefitsTribunalPage },
  { path: '/services/irb-representation', element: IRBRepresentationPage },
];
