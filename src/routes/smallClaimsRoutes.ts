import { lazy } from 'react';

// Small Claims Court Pages
const SmallClaimsPage = lazy(() => import('@/components/pages/SmallClaimsPage'));
const SmallClaimsProcessPage = lazy(() => import('@/components/pages/SmallClaimsProcessPage'));
const DebtCollectionPage = lazy(() => import('@/components/pages/DebtCollectionPage'));
const ContractDisputesPage = lazy(() => import('@/components/pages/ContractDisputesPage'));
const JudgementEnforcementPage = lazy(() => import('@/components/pages/JudgementEnforcementPage'));
const PropertyDamageClaimsPage = lazy(() => import('@/components/pages/PropertyDamageClaimsPage'));
const DebtNegotiationPage = lazy(() => import('@/components/pages/DebtNegotiationPage'));
const UnpaidInvoicesPage = lazy(() => import('@/components/pages/UnpaidInvoicesPage'));
const SecurityDepositsPage = lazy(() => import('@/components/pages/SecurityDepositsPage'));
const ConsumerDisputesPage = lazy(() => import('@/components/pages/ConsumerDisputesPage'));
const PersonalInjuryClaimsPage = lazy(() => import('@/components/pages/PersonalInjuryClaimsPage'));
const HomeImprovementDisputesPage = lazy(() => import('@/components/pages/HomeImprovementDisputesPage'));
const VehiclePurchaseDisputesPage = lazy(() => import('@/components/pages/VehiclePurchaseDisputesPage'));
const NeighbourDisputesPage = lazy(() => import('@/components/pages/NeighbourDisputesPage'));
const ReturnOfPropertyPage = lazy(() => import('@/components/pages/ReturnOfPropertyPage'));
const BreachOfWarrantyPage = lazy(() => import('@/components/pages/BreachOfWarrantyPage'));
const LoanRecoveryPage = lazy(() => import('@/components/pages/LoanRecoveryPage'));
const TenantDamageClaimsPage = lazy(() => import('@/components/pages/TenantDamageClaimsPage'));
const WrongfulDismissalClaimsPage = lazy(() => import('@/components/pages/WrongfulDismissalClaimsPage'));
const ProfessionalNegligencePage = lazy(() => import('@/components/pages/ProfessionalNegligencePage'));
const DefamationSlanderPage = lazy(() => import('@/components/pages/DefamationSlanderPage'));

export const smallClaimsRoutes = [
  { path: '/services/small-claims-court', element: SmallClaimsPage },
  { path: '/services/small-claims-process', element: SmallClaimsProcessPage },
  { path: '/services/debt-collection', element: DebtCollectionPage },
  { path: '/services/contract-disputes', element: ContractDisputesPage },
  { path: '/services/judgement-enforcement', element: JudgementEnforcementPage },
  { path: '/services/property-damage-claims', element: PropertyDamageClaimsPage },
  { path: '/services/debt-negotiation', element: DebtNegotiationPage },
  { path: '/services/unpaid-invoices', element: UnpaidInvoicesPage },
  { path: '/services/security-deposits', element: SecurityDepositsPage },
  { path: '/services/consumer-disputes', element: ConsumerDisputesPage },
  { path: '/services/personal-injury-claims', element: PersonalInjuryClaimsPage },
  { path: '/services/home-improvement-disputes', element: HomeImprovementDisputesPage },
  { path: '/services/vehicle-purchase-disputes', element: VehiclePurchaseDisputesPage },
  { path: '/services/neighbour-disputes', element: NeighbourDisputesPage },
  { path: '/services/return-of-property', element: ReturnOfPropertyPage },
  { path: '/services/breach-of-warranty', element: BreachOfWarrantyPage },
  { path: '/services/loan-recovery', element: LoanRecoveryPage },
  { path: '/services/tenant-damage-claims', element: TenantDamageClaimsPage },
  { path: '/services/wrongful-dismissal-claims', element: WrongfulDismissalClaimsPage },
  { path: '/services/professional-negligence', element: ProfessionalNegligencePage },
  { path: '/services/defamation-slander', element: DefamationSlanderPage },
];
