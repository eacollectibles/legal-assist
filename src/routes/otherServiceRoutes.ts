import { lazy } from 'react';

// Human Rights & Employment Pages
const HumanRightsTribunalPage = lazy(() => import('@/components/pages/HumanRightsTribunalPage'));
const EmploymentIssuesPage = lazy(() => import('@/components/pages/EmploymentIssuesPage'));
const WorkplaceDiscriminationPage = lazy(() => import('@/components/pages/WorkplaceDiscriminationPage'));
const HousingDiscriminationPage = lazy(() => import('@/components/pages/HousingDiscriminationPage'));
const ServiceDiscriminationPage = lazy(() => import('@/components/pages/ServiceDiscriminationPage'));

// Criminal & Other Pages
const CriminalMattersPage = lazy(() => import('@/components/pages/CriminalMattersPage'));
const BailHearingsPage = lazy(() => import('@/components/pages/BailHearingsPage'));
const NotaryPublicPage = lazy(() => import('@/components/pages/NotaryPublicPage'));
const CommissionerOfOathsPage = lazy(() => import('@/components/pages/CommissionerOfOathsPage'));
const MediationServicesPage = lazy(() => import('@/components/pages/MediationServicesPage'));
const SocialBenefitsTribunalPage = lazy(() => import('@/components/pages/SocialBenefitsTribunalPage'));
const IRBRepresentationPage = lazy(() => import('@/components/pages/IRBRepresentationPage'));

// WSIB, Benefits & Workplace Pages
const WSIBClaimsPage = lazy(() => import('@/components/pages/WSIBClaimsPage'));
const ODSPAppealsPage = lazy(() => import('@/components/pages/ODSPAppealsPage'));
const OntarioWorksAppealsPage = lazy(() => import('@/components/pages/OntarioWorksAppealsPage'));
const WorkplaceHarassmentPage = lazy(() => import('@/components/pages/WorkplaceHarassmentPage'));
const InsuranceDisputesPage = lazy(() => import('@/components/pages/InsuranceDisputesPage'));

// Airline & Consumer Pages
const AirlineDisputesPage = lazy(() => import('@/components/pages/AirlineDisputesPage'));

// Provincial Offences, Condo & Specialty Pages
const BylawInfractionsPage = lazy(() => import('@/components/pages/BylawInfractionsPage'));
const ParkingTicketsPage = lazy(() => import('@/components/pages/ParkingTicketsPage'));
const CondoDisputesPage = lazy(() => import('@/components/pages/CondoDisputesPage'));
const DangerousDogHearingsPage = lazy(() => import('@/components/pages/DangerousDogHearingsPage'));
const AccessibilityComplaintsPage = lazy(() => import('@/components/pages/AccessibilityComplaintsPage'));

export const otherServiceRoutes = [
  { path: '/services/human-rights-tribunal', element: HumanRightsTribunalPage },
  { path: '/services/employment-issues', element: EmploymentIssuesPage },
  { path: '/services/workplace-discrimination', element: WorkplaceDiscriminationPage },
  { path: '/services/housing-discrimination', element: HousingDiscriminationPage },
  { path: '/services/service-discrimination', element: ServiceDiscriminationPage },
  { path: '/services/criminal-matters', element: CriminalMattersPage },
  { path: '/services/bail-hearings', element: BailHearingsPage },
  { path: '/services/notary-public', element: NotaryPublicPage },
  { path: '/services/commissioner-of-oaths', element: CommissionerOfOathsPage },
  { path: '/services/mediation', element: MediationServicesPage },
  { path: '/services/social-benefits-tribunal', element: SocialBenefitsTribunalPage },
  { path: '/services/irb-representation', element: IRBRepresentationPage },
  // WSIB, Benefits & Workplace
  { path: '/services/wsib-claims', element: WSIBClaimsPage },
  { path: '/services/odsp-appeals', element: ODSPAppealsPage },
  { path: '/services/ontario-works-appeals', element: OntarioWorksAppealsPage },
  { path: '/services/workplace-harassment', element: WorkplaceHarassmentPage },
  { path: '/services/insurance-disputes', element: InsuranceDisputesPage },
  // Airline & Consumer
  { path: '/services/airline-disputes', element: AirlineDisputesPage },
  // Provincial Offences, Condo & Specialty
  { path: '/services/bylaw-infractions', element: BylawInfractionsPage },
  { path: '/services/parking-tickets', element: ParkingTicketsPage },
  { path: '/services/condo-disputes', element: CondoDisputesPage },
  { path: '/services/dangerous-dog-hearings', element: DangerousDogHearingsPage },
  { path: '/services/accessibility-complaints', element: AccessibilityComplaintsPage },
];
