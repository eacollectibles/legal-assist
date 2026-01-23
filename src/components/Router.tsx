import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { MemberProvider } from '@/integrations';
import { AutoSEO } from '@/components/AutoSEO';

// Main Pages - Keep HomePage and ContactPage as static imports
import HomePage from '@/components/pages/HomePage';
import ContactPage from '@/components/pages/ContactPage';

// Lazy load critical pages only
const AboutPage = lazy(() => import('@/components/pages/AboutPage'));
const ServicesPage = lazy(() => import('@/components/pages/ServicesPage'));
const ClientSignupPage = lazy(() => import('@/components/pages/ClientSignupPage'));
const ClientLoginPage = lazy(() => import('@/components/pages/ClientLoginPage'));
const NotFoundPage = lazy(() => import('@/components/pages/NotFoundPage'));

// Lazy load all service and utility pages
const SmallClaimsPage = lazy(() => import('@/components/pages/SmallClaimsPage'));
const LandlordTenantBoardPage = lazy(() => import('@/components/pages/LandlordTenantBoardPage'));
const TrafficTicketsPage = lazy(() => import('@/components/pages/TrafficTicketsPage'));
const HumanRightsTribunalPage = lazy(() => import('@/components/pages/HumanRightsTribunalPage'));
const EmploymentIssuesPage = lazy(() => import('@/components/pages/EmploymentIssuesPage'));
const CriminalMattersPage = lazy(() => import('@/components/pages/CriminalMattersPage'));
const ProvincialOffencesPage = lazy(() => import('@/components/pages/ProvincialOffencesPage'));

// Traffic Ticket Sub-pages
const SpeedingTicketDefencePage = lazy(() => import('@/components/pages/SpeedingTicketDefencePage'));
const CarelessDrivingDefencePage = lazy(() => import('@/components/pages/CarelessDrivingDefencePage'));
const StuntDrivingDefencePage = lazy(() => import('@/components/pages/StuntDrivingDefencePage'));
const DistractedDrivingDefencePage = lazy(() => import('@/components/pages/DistractedDrivingDefencePage'));
const RedLightDefencePage = lazy(() => import('@/components/pages/RedLightDefencePage'));
const NoInsuranceDefencePage = lazy(() => import('@/components/pages/NoInsuranceDefencePage'));
const DemeritPointsGuidePage = lazy(() => import('@/components/pages/DemeritPointsGuidePage'));
const G1G2ViolationsPage = lazy(() => import('@/components/pages/G1G2ViolationsPage'));
const CommercialVehicleViolationsPage = lazy(() => import('@/components/pages/CommercialVehicleViolationsPage'));
const HOVLaneViolationsPage = lazy(() => import('@/components/pages/HOVLaneViolationsPage'));
const StopSignTicketPage = lazy(() => import('@/components/pages/StopSignTicketPage'));
const StreetRacingPage = lazy(() => import('@/components/pages/StreetRacingPage'));
const FailToYieldPage = lazy(() => import('@/components/pages/FailToYieldPage'));
const UnsafeLaneChangePage = lazy(() => import('@/components/pages/UnsafeLaneChangePage'));
const FollowingTooCloselyPage = lazy(() => import('@/components/pages/FollowingTooCloselyPage'));
const DrivingWhileSuspendedPage = lazy(() => import('@/components/pages/DrivingWhileSuspendedPage'));
const SchoolZoneSpeedingPage = lazy(() => import('@/components/pages/SchoolZoneSpeedingPage'));
const SeatbeltViolationsPage = lazy(() => import('@/components/pages/SeatbeltViolationsPage'));

// Landlord & Tenant Board Sub-pages
const LandlordServicesPage = lazy(() => import('@/components/pages/LandlordServicesPage'));
const TenantServicesPage = lazy(() => import('@/components/pages/TenantServicesPage'));
const EvictionNonPaymentPage = lazy(() => import('@/components/pages/EvictionNonPaymentPage'));
const N12PersonalUsePage = lazy(() => import('@/components/pages/N12PersonalUsePage'));
const N13RenovationEvictionPage = lazy(() => import('@/components/pages/N13RenovationEvictionPage'));
const AboveGuidelineIncreasePage = lazy(() => import('@/components/pages/AboveGuidelineIncreasePage'));
const MaintenanceRepairsPage = lazy(() => import('@/components/pages/MaintenanceRepairsPage'));
const BadFaithEvictionPage = lazy(() => import('@/components/pages/BadFaithEvictionPage'));
const RentIncreaseGuidePage = lazy(() => import('@/components/pages/RentIncreaseGuidePage'));
const IllegalLockoutPage = lazy(() => import('@/components/pages/IllegalLockoutPage'));
const HarassmentByLandlordPage = lazy(() => import('@/components/pages/HarassmentByLandlordPage'));
const RentArrearsDefencePage = lazy(() => import('@/components/pages/RentArrearsDefencePage'));
const SubsidizedHousingPage = lazy(() => import('@/components/pages/SubsidizedHousingPage'));
const RoommateDisputesPage = lazy(() => import('@/components/pages/RoommateDisputesPage'));
const LeaseBreakingPage = lazy(() => import('@/components/pages/LeaseBreakingPage'));
const PetDisputesPage = lazy(() => import('@/components/pages/PetDisputesPage'));
const NoiseComplaintsPage = lazy(() => import('@/components/pages/NoiseComplaintsPage'));
const LTBHearingPrepPage = lazy(() => import('@/components/pages/LTBHearingPrepPage'));
const RentReductionPage = lazy(() => import('@/components/pages/RentReductionPage'));
const MobileHomeParkPage = lazy(() => import('@/components/pages/MobileHomeParkPage'));
const SuperintendentIssuesPage = lazy(() => import('@/components/pages/SuperintendentIssuesPage'));

// Small Claims Court Sub-pages
const SmallClaimsProcessPage = lazy(() => import('@/components/pages/SmallClaimsProcessPage'));
const DebtCollectionPage = lazy(() => import('@/components/pages/DebtCollectionPage'));
const ContractDisputesPage = lazy(() => import('@/components/pages/ContractDisputesPage'));
const JudgementEnforcementPage = lazy(() => import('@/components/pages/JudgementEnforcementPage'));
const PropertyDamageClaimsPage = lazy(() => import('@/components/pages/PropertyDamageClaimsPage'));
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

// Human Rights Tribunal Sub-pages
const WorkplaceDiscriminationPage = lazy(() => import('@/components/pages/WorkplaceDiscriminationPage'));
const HousingDiscriminationPage = lazy(() => import('@/components/pages/HousingDiscriminationPage'));
const DisabilityAccommodationPage = lazy(() => import('@/components/pages/DisabilityAccommodationPage'));
const AgeDiscriminationPage = lazy(() => import('@/components/pages/AgeDiscriminationPage'));
const SexualHarassmentPage = lazy(() => import('@/components/pages/SexualHarassmentPage'));
const ReprisalClaimsPage = lazy(() => import('@/components/pages/ReprisalClaimsPage'));
const ServiceDiscriminationPage = lazy(() => import('@/components/pages/ServiceDiscriminationPage'));
const PregnancyDiscriminationPage = lazy(() => import('@/components/pages/PregnancyDiscriminationPage'));

// Employment Sub-pages
const WrongfulTerminationPage = lazy(() => import('@/components/pages/WrongfulTerminationPage'));
const SeverancePayPage = lazy(() => import('@/components/pages/SeverancePayPage'));
const UnpaidWagesPage = lazy(() => import('@/components/pages/UnpaidWagesPage'));
const ConstructiveDismissalPage = lazy(() => import('@/components/pages/ConstructiveDismissalPage'));

// Criminal/POA Sub-pages
const TheftUnderPage = lazy(() => import('@/components/pages/TheftUnderPage'));
const MischiefUnderPage = lazy(() => import('@/components/pages/MischiefUnderPage'));
const SimpleAssaultPage = lazy(() => import('@/components/pages/SimpleAssaultPage'));
const TrespassPropertyPage = lazy(() => import('@/components/pages/TrespassPropertyPage'));
const FailToComplyPage = lazy(() => import('@/components/pages/FailToComplyPage'));
const PeaceBondPage = lazy(() => import('@/components/pages/PeaceBondPage'));
const LiquorLicenceActPage = lazy(() => import('@/components/pages/LiquorLicenceActPage'));
const MunicipalBylawPage = lazy(() => import('@/components/pages/MunicipalBylawPage'));
const RegulatoryOffencesPage = lazy(() => import('@/components/pages/RegulatoryOffencesPage'));
const BailHearingsPage = lazy(() => import('@/components/pages/BailHearingsPage'));

// Other Services
const NotaryPublicPage = lazy(() => import('@/components/pages/NotaryPublicPage'));
const CommissionerOfOathsPage = lazy(() => import('@/components/pages/CommissionerOfOathsPage'));
const MediationServicesPage = lazy(() => import('@/components/pages/MediationServicesPage'));
const SocialBenefitsTribunalPage = lazy(() => import('@/components/pages/SocialBenefitsTribunalPage'));

// Location Pages
const LondonParalegalPage = lazy(() => import('@/components/pages/LondonParalegalPage'));
const StThomasParalegalPage = lazy(() => import('@/components/pages/StThomasParalegalPage'));
const WoodstockParalegalPage = lazy(() => import('@/components/pages/WoodstockParalegalPage'));
const StrathroyChathamParalegalPage = lazy(() => import('@/components/pages/StrathroyChathamParalegalPage'));
const IngersollParalegalPage = lazy(() => import('@/components/pages/IngersollParalegalPage'));
const TillsonburgParalegalPage = lazy(() => import('@/components/pages/TillsonburgParalegalPage'));
const AylmerParalegalPage = lazy(() => import('@/components/pages/AylmerParalegalPage'));
const KitchenerParalegalPage = lazy(() => import('@/components/pages/KitchenerParalegalPage'));
const CambridgeParalegalPage = lazy(() => import('@/components/pages/CambridgeParalegalPage'));
const WindsorParalegalPage = lazy(() => import('@/components/pages/WindsorParalegalPage'));
const SarniaParalegalPage = lazy(() => import('@/components/pages/SarniaParalegalPage'));
const ChathamKentParalegalPage = lazy(() => import('@/components/pages/ChathamKentParalegalPage'));
const StratfordParalegalPage = lazy(() => import('@/components/pages/StratfordParalegalPage'));
const GuelphParalegalPage = lazy(() => import('@/components/pages/GuelphParalegalPage'));
const BrantfordParalegalPage = lazy(() => import('@/components/pages/BrantfordParalegalPage'));
const NorfolkCountyParalegalPage = lazy(() => import('@/components/pages/NorfolkCountyParalegalPage'));
const LeamingtonParalegalPage = lazy(() => import('@/components/pages/LeamingtonParalegalPage'));
const HuronCountyParalegalPage = lazy(() => import('@/components/pages/HuronCountyParalegalPage'));

// Educational Guide Pages
const HowToFightTrafficTicketPage = lazy(() => import('@/components/pages/HowToFightTrafficTicketPage'));
const TenantRightsGuidePage = lazy(() => import('@/components/pages/TenantRightsGuidePage'));
const LandlordRightsGuidePage = lazy(() => import('@/components/pages/LandlordRightsGuidePage'));
const SmallClaimsCourtGuidePage = lazy(() => import('@/components/pages/SmallClaimsCourtGuidePage'));
const ParalegalVsLawyerPage = lazy(() => import('@/components/pages/ParalegalVsLawyerPage'));
const WhatIsAParalegalPage = lazy(() => import('@/components/pages/WhatIsAParalegalPage'));
const EmploymentRightsGuidePage = lazy(() => import('@/components/pages/EmploymentRightsGuidePage'));
const FreeLegalResourcesPage = lazy(() => import('@/components/pages/FreeLegalResourcesPage'));
const BeingSuedGuidePage = lazy(() => import('@/components/pages/BeingSuedGuidePage'));
const LTBHearingGuidePage = lazy(() => import('@/components/pages/LTBHearingGuidePage'));
const HumanRightsComplaintGuidePage = lazy(() => import('@/components/pages/HumanRightsComplaintGuidePage'));
const LegalDeadlinesGuidePage = lazy(() => import('@/components/pages/LegalDeadlinesGuidePage'));

// Legal News
const LegalNewsPage = lazy(() => import('@/components/pages/LegalNewsPage'));

// Admin Pages
const AdminBookingsPage = lazy(() => import('@/components/pages/AdminBookingsPage'));
const AdminMeetingRequestsPage = lazy(() => import('@/components/pages/AdminMeetingRequestsPage'));
const AdminMessagesPage = lazy(() => import('@/components/pages/AdminMessagesPage'));
const AdminUserManagementPage = lazy(() => import('@/components/pages/AdminUserManagementPage'));
const AdminUserDetailPage = lazy(() => import('@/components/pages/AdminUserDetailPage'));
const GrantAdminPage = lazy(() => import('@/components/pages/GrantAdminPage'));
const UploadTokenManagementPage = lazy(() => import('@/components/pages/UploadTokenManagementPage'));

// Dashboard Pages
const ClientDashboardPage = lazy(() => import('@/components/pages/ClientDashboardPage'));
const ParalegalDashboardPage = lazy(() => import('@/components/pages/ParalegalDashboardPage'));
const MeetingDashboardPage = lazy(() => import('@/components/pages/MeetingDashboardPage'));
const DocumentWorkflowPage = lazy(() => import('@/components/pages/DocumentWorkflowPage'));

// Client Portal Pages
const BookingPage = lazy(() => import('@/components/pages/BookingPage'));
const ClientIntakePage = lazy(() => import('@/components/pages/ClientIntakePage'));
const MeetingRequestPage = lazy(() => import('@/components/pages/MeetingRequestPage'));
const PublicUploadPage = lazy(() => import('@/components/pages/PublicUploadPage'));

// Loading component for Suspense
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Route mapping with explicit component imports
const routeMap = [
  // Core Pages
  { path: '/', component: HomePage, static: true },
  { path: '/contact', component: ContactPage, static: true },
  { path: '/about', component: AboutPage },
  { path: '/services', component: ServicesPage },
  
  // Auth Pages
  { path: '/signup', component: ClientSignupPage },
  { path: '/login', component: ClientLoginPage },

  // Main Service Categories
  { path: '/services/small-claims', component: SmallClaimsPage },
  { path: '/services/landlord-tenant', component: LandlordTenantBoardPage },
  { path: '/services/traffic-tickets', component: TrafficTicketsPage },
  { path: '/services/human-rights', component: HumanRightsTribunalPage },
  { path: '/services/employment-issues', component: EmploymentIssuesPage },
  { path: '/services/criminal-matters', component: CriminalMattersPage },
  { path: '/services/provincial-offences', component: ProvincialOffencesPage },

  // Traffic Ticket Sub-pages
  { path: '/services/speeding-ticket-defence', component: SpeedingTicketDefencePage },
  { path: '/services/careless-driving-defence', component: CarelessDrivingDefencePage },
  { path: '/services/stunt-driving-defence', component: StuntDrivingDefencePage },
  { path: '/services/distracted-driving', component: DistractedDrivingDefencePage },
  { path: '/services/red-light-tickets', component: RedLightDefencePage },
  { path: '/services/no-insurance-defence', component: NoInsuranceDefencePage },
  { path: '/services/demerit-points-guide', component: DemeritPointsGuidePage },
  { path: '/services/g1-g2-violations', component: G1G2ViolationsPage },
  { path: '/services/commercial-vehicle-violations', component: CommercialVehicleViolationsPage },
  { path: '/services/hov-lane-violations', component: HOVLaneViolationsPage },
  { path: '/services/stop-sign-ticket', component: StopSignTicketPage },
  { path: '/services/street-racing', component: StreetRacingPage },
  { path: '/services/fail-to-yield', component: FailToYieldPage },
  { path: '/services/unsafe-lane-change', component: UnsafeLaneChangePage },
  { path: '/services/following-too-closely', component: FollowingTooCloselyPage },
  { path: '/services/driving-while-suspended', component: DrivingWhileSuspendedPage },
  { path: '/services/school-zone-speeding', component: SchoolZoneSpeedingPage },
  { path: '/services/seatbelt-violations', component: SeatbeltViolationsPage },

  // Landlord & Tenant Board Sub-pages
  { path: '/services/landlord-services', component: LandlordServicesPage },
  { path: '/services/tenant-services', component: TenantServicesPage },
  { path: '/services/eviction-non-payment', component: EvictionNonPaymentPage },
  { path: '/services/n12-personal-use-eviction', component: N12PersonalUsePage },
  { path: '/services/n13-renovation-eviction', component: N13RenovationEvictionPage },
  { path: '/services/above-guideline-increase', component: AboveGuidelineIncreasePage },
  { path: '/services/maintenance-repairs', component: MaintenanceRepairsPage },
  { path: '/services/bad-faith-eviction', component: BadFaithEvictionPage },
  { path: '/services/rent-increase-guide', component: RentIncreaseGuidePage },
  { path: '/services/illegal-lockout', component: IllegalLockoutPage },
  { path: '/services/landlord-harassment', component: HarassmentByLandlordPage },
  { path: '/services/rent-arrears-defence', component: RentArrearsDefencePage },
  { path: '/services/subsidized-housing-eviction', component: SubsidizedHousingPage },
  { path: '/services/roommate-disputes', component: RoommateDisputesPage },
  { path: '/services/breaking-lease-early', component: LeaseBreakingPage },
  { path: '/services/pet-disputes', component: PetDisputesPage },
  { path: '/services/noise-complaints-defence', component: NoiseComplaintsPage },
  { path: '/services/ltb-hearing-preparation', component: LTBHearingPrepPage },
  { path: '/services/rent-reduction-applications', component: RentReductionPage },
  { path: '/services/mobile-home-park-disputes', component: MobileHomeParkPage },
  { path: '/services/superintendent-housing-rights', component: SuperintendentIssuesPage },

  // Small Claims Court Sub-pages
  { path: '/services/small-claims-process', component: SmallClaimsProcessPage },
  { path: '/services/debt-collection', component: DebtCollectionPage },
  { path: '/services/contract-disputes', component: ContractDisputesPage },
  { path: '/services/judgement-enforcement', component: JudgementEnforcementPage },
  { path: '/services/property-damage-claims', component: PropertyDamageClaimsPage },
  { path: '/services/unpaid-invoices', component: UnpaidInvoicesPage },
  { path: '/services/security-deposits', component: SecurityDepositsPage },
  { path: '/services/consumer-disputes', component: ConsumerDisputesPage },
  { path: '/services/personal-injury-claims', component: PersonalInjuryClaimsPage },
  { path: '/services/home-improvement-disputes', component: HomeImprovementDisputesPage },
  { path: '/services/vehicle-purchase-disputes', component: VehiclePurchaseDisputesPage },
  { path: '/services/neighbour-disputes', component: NeighbourDisputesPage },
  { path: '/services/return-of-property', component: ReturnOfPropertyPage },
  { path: '/services/breach-of-warranty', component: BreachOfWarrantyPage },
  { path: '/services/loan-recovery', component: LoanRecoveryPage },
  { path: '/services/tenant-damage-claims', component: TenantDamageClaimsPage },
  { path: '/services/wrongful-dismissal-claims', component: WrongfulDismissalClaimsPage },
  { path: '/services/professional-negligence', component: ProfessionalNegligencePage },
  { path: '/services/defamation-slander', component: DefamationSlanderPage },

  // Human Rights Tribunal Sub-pages
  { path: '/services/workplace-discrimination', component: WorkplaceDiscriminationPage },
  { path: '/services/housing-discrimination', component: HousingDiscriminationPage },
  { path: '/services/disability-accommodation', component: DisabilityAccommodationPage },
  { path: '/services/age-discrimination', component: AgeDiscriminationPage },
  { path: '/services/sexual-harassment', component: SexualHarassmentPage },
  { path: '/services/reprisal-claims', component: ReprisalClaimsPage },
  { path: '/services/service-discrimination', component: ServiceDiscriminationPage },
  { path: '/services/pregnancy-discrimination', component: PregnancyDiscriminationPage },

  // Employment Sub-pages
  { path: '/services/wrongful-termination', component: WrongfulTerminationPage },
  { path: '/services/severance-pay', component: SeverancePayPage },
  { path: '/services/unpaid-wages', component: UnpaidWagesPage },
  { path: '/services/constructive-dismissal', component: ConstructiveDismissalPage },

  // Criminal/POA Sub-pages
  { path: '/services/theft-under-5000', component: TheftUnderPage },
  { path: '/services/mischief-under-5000', component: MischiefUnderPage },
  { path: '/services/simple-assault', component: SimpleAssaultPage },
  { path: '/services/trespass-property', component: TrespassPropertyPage },
  { path: '/services/fail-to-comply', component: FailToComplyPage },
  { path: '/services/peace-bond', component: PeaceBondPage },
  { path: '/services/liquor-licence-act', component: LiquorLicenceActPage },
  { path: '/services/municipal-bylaw', component: MunicipalBylawPage },
  { path: '/services/regulatory-offences', component: RegulatoryOffencesPage },
  { path: '/services/bail-hearings', component: BailHearingsPage },

  // Other Services
  { path: '/services/notary-public', component: NotaryPublicPage },
  { path: '/services/commissioner-of-oaths', component: CommissionerOfOathsPage },
  { path: '/services/mediation', component: MediationServicesPage },
  { path: '/services/social-benefits-tribunal', component: SocialBenefitsTribunalPage },

  // Location Pages
  { path: '/london-paralegal', component: LondonParalegalPage },
  { path: '/st-thomas-paralegal', component: StThomasParalegalPage },
  { path: '/woodstock-paralegal', component: WoodstockParalegalPage },
  { path: '/strathroy-chatham-paralegal', component: StrathroyChathamParalegalPage },
  { path: '/ingersoll-paralegal', component: IngersollParalegalPage },
  { path: '/tillsonburg-paralegal', component: TillsonburgParalegalPage },
  { path: '/aylmer-paralegal', component: AylmerParalegalPage },
  { path: '/locations/kitchener', component: KitchenerParalegalPage },
  { path: '/locations/cambridge', component: CambridgeParalegalPage },
  { path: '/locations/windsor', component: WindsorParalegalPage },
  { path: '/locations/sarnia', component: SarniaParalegalPage },
  { path: '/locations/chatham-kent', component: ChathamKentParalegalPage },
  { path: '/locations/stratford', component: StratfordParalegalPage },
  { path: '/locations/guelph', component: GuelphParalegalPage },
  { path: '/locations/brantford', component: BrantfordParalegalPage },
  { path: '/locations/norfolk-county', component: NorfolkCountyParalegalPage },
  { path: '/locations/leamington', component: LeamingtonParalegalPage },
  { path: '/locations/huron-county', component: HuronCountyParalegalPage },

  // Educational Guide Pages
  { path: '/guides/how-to-fight-traffic-ticket', component: HowToFightTrafficTicketPage },
  { path: '/guides/ontario-tenant-rights', component: TenantRightsGuidePage },
  { path: '/guides/ontario-landlord-rights', component: LandlordRightsGuidePage },
  { path: '/guides/small-claims-court-process', component: SmallClaimsCourtGuidePage },
  { path: '/guides/paralegal-vs-lawyer', component: ParalegalVsLawyerPage },
  { path: '/guides/what-is-a-paralegal', component: WhatIsAParalegalPage },
  { path: '/guides/ontario-employment-rights', component: EmploymentRightsGuidePage },
  { path: '/guides/free-legal-resources', component: FreeLegalResourcesPage },
  { path: '/guides/what-to-do-when-sued', component: BeingSuedGuidePage },
  { path: '/guides/ltb-hearing-preparation', component: LTBHearingGuidePage },
  { path: '/guides/filing-human-rights-complaint', component: HumanRightsComplaintGuidePage },
  { path: '/guides/legal-deadlines-ontario', component: LegalDeadlinesGuidePage },

  // Legal News
  { path: '/legal-news', component: LegalNewsPage },
  { path: '/recent-decisions', component: LegalNewsPage },

  // Admin Pages
  { path: '/admin/bookings', component: AdminBookingsPage },
  { path: '/admin/meeting-requests', component: AdminMeetingRequestsPage },
  { path: '/admin/messages', component: AdminMessagesPage },
  { path: '/admin/users', component: AdminUserManagementPage },
  { path: '/admin/users/:id', component: AdminUserDetailPage },
  { path: '/admin/grant', component: GrantAdminPage },
  { path: '/admin/upload-tokens', component: UploadTokenManagementPage },

  // Dashboard Pages
  { path: '/dashboard', component: ClientDashboardPage },
  { path: '/dashboard/paralegal', component: ParalegalDashboardPage },
  { path: '/dashboard/meetings', component: MeetingDashboardPage },
  { path: '/dashboard/documents', component: DocumentWorkflowPage },

  // Client Portal Pages
  { path: '/booking', component: BookingPage },
  { path: '/intake', component: ClientIntakePage },
  { path: '/meeting-request', component: MeetingRequestPage },
  { path: '/upload/:token', component: PublicUploadPage },
];

export default function Router() {
  useEffect(() => {
    // Mark page as hydrated once Router mounts
    document.documentElement.classList.add('hydrated');
    document.body.classList.add('hydrated');
    console.log('[Router] Hydration markers added');
  }, []);

  return (
    <HashRouter>
      <MemberProvider>
        <ScrollToTop />
        <AutoSEO />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Render all routes with explicit component imports */}
            {routeMap.map((route) => (
              <Route key={route.path} path={route.path} element={<route.component />} />
            ))}

            {/* 404 Catch-all */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </MemberProvider>
    </HashRouter>
  );
}
