import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { MemberProvider } from '@/integrations';
import { AutoSEO } from '@/components/AutoSEO';

// Main Pages - Keep HomePage and ContactPage as static imports
import HomePage from '@/components/pages/HomePage';
import ContactPage from '@/components/pages/ContactPage';

// Lazy load all other pages
const AboutPage = lazy(() => import('@/components/pages/AboutPage'));
const ServicesPage = lazy(() => import('@/components/pages/ServicesPage'));
const ClientSignupPage = lazy(() => import('@/components/pages/ClientSignupPage'));
const ClientLoginPage = lazy(() => import('@/components/pages/ClientLoginPage'));
const NotFoundPage = lazy(() => import('@/components/pages/NotFoundPage'));

// Service Pages - Main Categories
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

// Admin & Dashboard Pages
const AdminBookingsPage = lazy(() => import('@/components/pages/AdminBookingsPage'));
const AdminMeetingRequestsPage = lazy(() => import('@/components/pages/AdminMeetingRequestsPage'));
const AdminMessagesPage = lazy(() => import('@/components/pages/AdminMessagesPage'));
const AdminUserDetailPage = lazy(() => import('@/components/pages/AdminUserDetailPage'));
const AdminUserManagementPage = lazy(() => import('@/components/pages/AdminUserManagementPage'));
const BookingPage = lazy(() => import('@/components/pages/BookingPage'));
const ClientDashboardPage = lazy(() => import('@/components/pages/ClientDashboardPage'));
const ClientIntakePage = lazy(() => import('@/components/pages/ClientIntakePage'));
const DocumentWorkflowPage = lazy(() => import('@/components/pages/DocumentWorkflowPage'));
const GrantAdminPage = lazy(() => import('@/components/pages/GrantAdminPage'));
const MeetingDashboardPage = lazy(() => import('@/components/pages/MeetingDashboardPage'));
const MeetingRequestPage = lazy(() => import('@/components/pages/MeetingRequestPage'));
const ParalegalDashboardPage = lazy(() => import('@/components/pages/ParalegalDashboardPage'));
const PublicUploadPage = lazy(() => import('@/components/pages/PublicUploadPage'));
const UploadTokenManagementPage = lazy(() => import('@/components/pages/UploadTokenManagementPage'));

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

export default function Router() {
  return (
    <BrowserRouter>
      <MemberProvider>
        <ScrollToTop />
        <AutoSEO />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Core Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            
            {/* Auth Pages */}
            <Route path="/signup" element={<ClientSignupPage />} />
            <Route path="/login" element={<ClientLoginPage />} />

            {/* Main Service Category Pages */}
            <Route path="/services/small-claims" element={<SmallClaimsPage />} />
            <Route path="/services/landlord-tenant" element={<LandlordTenantBoardPage />} />
            <Route path="/services/traffic-tickets" element={<TrafficTicketsPage />} />
            <Route path="/services/human-rights" element={<HumanRightsTribunalPage />} />
            <Route path="/services/employment-issues" element={<EmploymentIssuesPage />} />
            <Route path="/services/criminal-matters" element={<CriminalMattersPage />} />
            <Route path="/services/provincial-offences" element={<ProvincialOffencesPage />} />

            {/* Traffic Ticket Sub-pages */}
            <Route path="/services/speeding-ticket-defence" element={<SpeedingTicketDefencePage />} />
            <Route path="/services/careless-driving-defence" element={<CarelessDrivingDefencePage />} />
            <Route path="/services/stunt-driving-defence" element={<StuntDrivingDefencePage />} />
            <Route path="/services/distracted-driving" element={<DistractedDrivingDefencePage />} />
            <Route path="/services/red-light-tickets" element={<RedLightDefencePage />} />
            <Route path="/services/no-insurance-defence" element={<NoInsuranceDefencePage />} />
            <Route path="/services/demerit-points-guide" element={<DemeritPointsGuidePage />} />
            <Route path="/services/g1-g2-violations" element={<G1G2ViolationsPage />} />
            <Route path="/services/commercial-vehicle-violations" element={<CommercialVehicleViolationsPage />} />
            <Route path="/services/hov-lane-violations" element={<HOVLaneViolationsPage />} />
            <Route path="/services/stop-sign-ticket" element={<StopSignTicketPage />} />
            <Route path="/services/street-racing" element={<StreetRacingPage />} />
            <Route path="/services/fail-to-yield" element={<FailToYieldPage />} />
            <Route path="/services/unsafe-lane-change" element={<UnsafeLaneChangePage />} />
            <Route path="/services/following-too-closely" element={<FollowingTooCloselyPage />} />
            <Route path="/services/driving-while-suspended" element={<DrivingWhileSuspendedPage />} />
            <Route path="/services/school-zone-speeding" element={<SchoolZoneSpeedingPage />} />
            <Route path="/services/seatbelt-violations" element={<SeatbeltViolationsPage />} />

            {/* Landlord & Tenant Board Sub-pages */}
            <Route path="/services/landlord-services" element={<LandlordServicesPage />} />
            <Route path="/services/tenant-services" element={<TenantServicesPage />} />
            <Route path="/services/eviction-non-payment" element={<EvictionNonPaymentPage />} />
            <Route path="/services/n12-personal-use-eviction" element={<N12PersonalUsePage />} />
            <Route path="/services/n13-renovation-eviction" element={<N13RenovationEvictionPage />} />
            <Route path="/services/above-guideline-increase" element={<AboveGuidelineIncreasePage />} />
            <Route path="/services/maintenance-repairs" element={<MaintenanceRepairsPage />} />
            <Route path="/services/bad-faith-eviction" element={<BadFaithEvictionPage />} />
            <Route path="/services/rent-increase-guide" element={<RentIncreaseGuidePage />} />
            <Route path="/services/illegal-lockout" element={<IllegalLockoutPage />} />
            <Route path="/services/landlord-harassment" element={<HarassmentByLandlordPage />} />
            <Route path="/services/rent-arrears-defence" element={<RentArrearsDefencePage />} />
            <Route path="/services/subsidized-housing-eviction" element={<SubsidizedHousingPage />} />
            <Route path="/services/roommate-disputes" element={<RoommateDisputesPage />} />
            <Route path="/services/breaking-lease-early" element={<LeaseBreakingPage />} />
            <Route path="/services/pet-disputes" element={<PetDisputesPage />} />
            <Route path="/services/noise-complaints-defence" element={<NoiseComplaintsPage />} />
            <Route path="/services/ltb-hearing-preparation" element={<LTBHearingPrepPage />} />
            <Route path="/services/rent-reduction-applications" element={<RentReductionPage />} />
            <Route path="/services/mobile-home-park-disputes" element={<MobileHomeParkPage />} />
            <Route path="/services/superintendent-housing-rights" element={<SuperintendentIssuesPage />} />

            {/* Small Claims Court Sub-pages */}
            <Route path="/services/small-claims-process" element={<SmallClaimsProcessPage />} />
            <Route path="/services/debt-collection" element={<DebtCollectionPage />} />
            <Route path="/services/contract-disputes" element={<ContractDisputesPage />} />
            <Route path="/services/judgement-enforcement" element={<JudgementEnforcementPage />} />
            <Route path="/services/property-damage-claims" element={<PropertyDamageClaimsPage />} />
            <Route path="/services/unpaid-invoices" element={<UnpaidInvoicesPage />} />
            <Route path="/services/security-deposits" element={<SecurityDepositsPage />} />
            <Route path="/services/consumer-disputes" element={<ConsumerDisputesPage />} />
            <Route path="/services/personal-injury-claims" element={<PersonalInjuryClaimsPage />} />
            <Route path="/services/home-improvement-disputes" element={<HomeImprovementDisputesPage />} />
            <Route path="/services/vehicle-purchase-disputes" element={<VehiclePurchaseDisputesPage />} />
            <Route path="/services/neighbour-disputes" element={<NeighbourDisputesPage />} />
            <Route path="/services/return-of-property" element={<ReturnOfPropertyPage />} />
            <Route path="/services/breach-of-warranty" element={<BreachOfWarrantyPage />} />
            <Route path="/services/loan-recovery" element={<LoanRecoveryPage />} />
            <Route path="/services/tenant-damage-claims" element={<TenantDamageClaimsPage />} />
            <Route path="/services/wrongful-dismissal-claims" element={<WrongfulDismissalClaimsPage />} />
            <Route path="/services/professional-negligence" element={<ProfessionalNegligencePage />} />
            <Route path="/services/defamation-slander" element={<DefamationSlanderPage />} />

            {/* Human Rights Tribunal Sub-pages */}
            <Route path="/services/workplace-discrimination" element={<WorkplaceDiscriminationPage />} />
            <Route path="/services/housing-discrimination" element={<HousingDiscriminationPage />} />
            <Route path="/services/disability-accommodation" element={<DisabilityAccommodationPage />} />
            <Route path="/services/age-discrimination" element={<AgeDiscriminationPage />} />
            <Route path="/services/sexual-harassment" element={<SexualHarassmentPage />} />
            <Route path="/services/reprisal-claims" element={<ReprisalClaimsPage />} />
            <Route path="/services/service-discrimination" element={<ServiceDiscriminationPage />} />
            <Route path="/services/pregnancy-discrimination" element={<PregnancyDiscriminationPage />} />

            {/* Employment Sub-pages */}
            <Route path="/services/wrongful-termination" element={<WrongfulTerminationPage />} />
            <Route path="/services/severance-pay" element={<SeverancePayPage />} />
            <Route path="/services/unpaid-wages" element={<UnpaidWagesPage />} />
            <Route path="/services/constructive-dismissal" element={<ConstructiveDismissalPage />} />

            {/* Criminal/POA Sub-pages */}
            <Route path="/services/theft-under-5000" element={<TheftUnderPage />} />
            <Route path="/services/mischief-under-5000" element={<MischiefUnderPage />} />
            <Route path="/services/simple-assault" element={<SimpleAssaultPage />} />
            <Route path="/services/trespass-property" element={<TrespassPropertyPage />} />
            <Route path="/services/fail-to-comply" element={<FailToComplyPage />} />
            <Route path="/services/peace-bond" element={<PeaceBondPage />} />
            <Route path="/services/liquor-licence-act" element={<LiquorLicenceActPage />} />
            <Route path="/services/municipal-bylaw" element={<MunicipalBylawPage />} />
            <Route path="/services/regulatory-offences" element={<RegulatoryOffencesPage />} />
            <Route path="/services/bail-hearings" element={<BailHearingsPage />} />

            {/* Other Services */}
            <Route path="/services/notary-public" element={<NotaryPublicPage />} />
            <Route path="/services/commissioner-of-oaths" element={<CommissionerOfOathsPage />} />
            <Route path="/services/mediation" element={<MediationServicesPage />} />
            <Route path="/services/social-benefits-tribunal" element={<SocialBenefitsTribunalPage />} />

            {/* Location Pages - Original */}
            <Route path="/london-paralegal" element={<LondonParalegalPage />} />
            <Route path="/st-thomas-paralegal" element={<StThomasParalegalPage />} />
            <Route path="/woodstock-paralegal" element={<WoodstockParalegalPage />} />
            <Route path="/strathroy-chatham-paralegal" element={<StrathroyChathamParalegalPage />} />
            <Route path="/ingersoll-paralegal" element={<IngersollParalegalPage />} />
            <Route path="/tillsonburg-paralegal" element={<TillsonburgParalegalPage />} />
            <Route path="/aylmer-paralegal" element={<AylmerParalegalPage />} />
            
            {/* Location Pages - Step 7 Expansion */}
            <Route path="/locations/kitchener" element={<KitchenerParalegalPage />} />
            <Route path="/locations/cambridge" element={<CambridgeParalegalPage />} />
            <Route path="/locations/windsor" element={<WindsorParalegalPage />} />
            <Route path="/locations/sarnia" element={<SarniaParalegalPage />} />
            <Route path="/locations/chatham-kent" element={<ChathamKentParalegalPage />} />
            <Route path="/locations/stratford" element={<StratfordParalegalPage />} />
            <Route path="/locations/guelph" element={<GuelphParalegalPage />} />
            <Route path="/locations/brantford" element={<BrantfordParalegalPage />} />
            <Route path="/locations/norfolk-county" element={<NorfolkCountyParalegalPage />} />
            <Route path="/locations/leamington" element={<LeamingtonParalegalPage />} />
            <Route path="/locations/huron-county" element={<HuronCountyParalegalPage />} />

            {/* Educational Guide Pages */}
            <Route path="/guides/how-to-fight-traffic-ticket" element={<HowToFightTrafficTicketPage />} />
            <Route path="/guides/ontario-tenant-rights" element={<TenantRightsGuidePage />} />
            <Route path="/guides/ontario-landlord-rights" element={<LandlordRightsGuidePage />} />
            <Route path="/guides/small-claims-court-process" element={<SmallClaimsCourtGuidePage />} />
            <Route path="/guides/paralegal-vs-lawyer" element={<ParalegalVsLawyerPage />} />
            <Route path="/guides/what-is-a-paralegal" element={<WhatIsAParalegalPage />} />
            <Route path="/guides/ontario-employment-rights" element={<EmploymentRightsGuidePage />} />
            <Route path="/guides/free-legal-resources" element={<FreeLegalResourcesPage />} />
            <Route path="/guides/what-to-do-when-sued" element={<BeingSuedGuidePage />} />
            <Route path="/guides/ltb-hearing-preparation" element={<LTBHearingGuidePage />} />
            <Route path="/guides/filing-human-rights-complaint" element={<HumanRightsComplaintGuidePage />} />
            <Route path="/guides/legal-deadlines-ontario" element={<LegalDeadlinesGuidePage />} />

            {/* Admin Pages */}
            <Route path="/admin/bookings" element={<AdminBookingsPage />} />
            <Route path="/admin/meeting-requests" element={<AdminMeetingRequestsPage />} />
            <Route path="/admin/messages" element={<AdminMessagesPage />} />
            <Route path="/admin/users" element={<AdminUserManagementPage />} />
            <Route path="/admin/users/:id" element={<AdminUserDetailPage />} />
            <Route path="/admin/grant" element={<GrantAdminPage />} />
            <Route path="/admin/upload-tokens" element={<UploadTokenManagementPage />} />

            {/* Dashboard Pages */}
            <Route path="/dashboard" element={<ClientDashboardPage />} />
            <Route path="/dashboard/paralegal" element={<ParalegalDashboardPage />} />
            <Route path="/dashboard/meetings" element={<MeetingDashboardPage />} />
            <Route path="/dashboard/documents" element={<DocumentWorkflowPage />} />

            {/* Client Portal Pages */}
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/intake" element={<ClientIntakePage />} />
            <Route path="/meeting-request" element={<MeetingRequestPage />} />
            <Route path="/upload/:token" element={<PublicUploadPage />} />

            {/* 404 Catch-all */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </MemberProvider>
    </BrowserRouter>
  );
}
