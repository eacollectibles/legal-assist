import { lazy } from 'react';

// Human Rights & Employment Pages
const HumanRightsTribunalPage = lazy(() => import('@/components/pages/HumanRightsTribunalPage'));
const PregnancyDiscriminationPage = lazy(() => import('@/components/pages/PregnancyDiscriminationPage'));
const ReprisalClaimsPage = lazy(() => import('@/components/pages/ReprisalClaimsPage'));
const SexualHarassmentPage = lazy(() => import('@/components/pages/SexualHarassmentPage'));
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


// Wired routes added during open-ended audit (May 2026)
const AgeDiscriminationPage = lazy(() => import('@/components/pages/AgeDiscriminationPage'));
const AssaultChargesPage = lazy(() => import('@/components/pages/AssaultChargesPage'));
const CausingDisturbancePage = lazy(() => import('@/components/pages/CausingDisturbancePage'));
const ConstructiveDismissalPage = lazy(() => import('@/components/pages/ConstructiveDismissalPage'));
const DisabilityAccommodationPage = lazy(() => import('@/components/pages/DisabilityAccommodationPage'));
const FailToComplyPage = lazy(() => import('@/components/pages/FailToComplyPage'));
const HRTOProcessPage = lazy(() => import('@/components/pages/HRTOProcessPage'));
const DUIChargesPage = lazy(() => import('@/components/pages/DUIChargesPage'));
const MischiefChargesPage = lazy(() => import('@/components/pages/MischiefChargesPage'));
const TheftChargesPage = lazy(() => import('@/components/pages/TheftChargesPage'));

const LiquorLicenceActPage2 = lazy(() => import('@/components/pages/LiquorLicenceActPage'));
const PeaceBondPage = lazy(() => import('@/components/pages/PeaceBondPage'));
const RegulatoryOffencesPage = lazy(() => import('@/components/pages/RegulatoryOffencesPage'));
const SeverancePayPage = lazy(() => import('@/components/pages/SeverancePayPage'));
const SimpleAssaultPage = lazy(() => import('@/components/pages/SimpleAssaultPage'));
const SmallClaimsPage = lazy(() => import('@/components/pages/SmallClaimsPage'));
const TrespassPropertyPage = lazy(() => import('@/components/pages/TrespassPropertyPage'));
const UnpaidWagesPage = lazy(() => import('@/components/pages/UnpaidWagesPage'));
const WrongfulTerminationPage = lazy(() => import('@/components/pages/WrongfulTerminationPage'));
const TrespassChargesPage2 = lazy(() => import('@/components/pages/TrespassChargesPage'));

export const otherServiceRoutes = [
  { path: '/services/human-rights-tribunal', element: HumanRightsTribunalPage },
  { path: '/services/pregnancy-discrimination', element: PregnancyDiscriminationPage },
  { path: '/services/reprisal-claims', element: ReprisalClaimsPage },
  { path: '/services/sexual-harassment', element: SexualHarassmentPage },
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
  // Wired routes added during open-ended audit (May 2026)
  { path: '/services/age-discrimination', element: AgeDiscriminationPage },
  { path: '/services/assault-charges', element: AssaultChargesPage },
  { path: '/services/causing-disturbance', element: CausingDisturbancePage },
  { path: '/services/constructive-dismissal', element: ConstructiveDismissalPage },
  { path: '/services/disability-accommodation', element: DisabilityAccommodationPage },
  { path: '/services/fail-to-comply', element: FailToComplyPage },
  { path: '/services/hrto-process', element: HRTOProcessPage },
  { path: '/services/dui-charges', element: DUIChargesPage },
  { path: '/services/mischief-charges', element: MischiefChargesPage },
  { path: '/services/theft-charges', element: TheftChargesPage },
  { path: '/services/liquor-licence-act', element: LiquorLicenceActPage2 },
  { path: '/services/peace-bond', element: PeaceBondPage },
  { path: '/services/regulatory-offences', element: RegulatoryOffencesPage },
  { path: '/services/severance-pay', element: SeverancePayPage },
  { path: '/services/simple-assault', element: SimpleAssaultPage },
  { path: '/services/small-claims', element: SmallClaimsPage },
  { path: '/services/trespass-charges', element: TrespassChargesPage2 },
  { path: '/services/trespass-property', element: TrespassPropertyPage },
  { path: '/services/unpaid-wages', element: UnpaidWagesPage },
  { path: '/services/wrongful-termination', element: WrongfulTerminationPage },
];
