import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { MemberProvider } from '@/integrations';

// Main Pages - Keep HomePage and ContactPage as static imports
import HomePage from '@/components/pages/HomePage';
import ContactPage from '@/components/pages/ContactPage';

// Lazy load all other pages
const AboutPage = lazy(() => import('@/components/pages/AboutPage'));
const ServicesPage = lazy(() => import('@/components/pages/ServicesPage'));
const ClientSignupPage = lazy(() => import('@/components/pages/ClientSignupPage'));
const ClientLoginPage = lazy(() => import('@/components/pages/ClientLoginPage'));

// Service Pages
const SmallClaimsPage = lazy(() => import('@/components/pages/SmallClaimsPage'));
const LandlordTenantBoardPage = lazy(() => import('@/components/pages/LandlordTenantBoardPage'));
const TrafficTicketsPage = lazy(() => import('@/components/pages/TrafficTicketsPage'));
const HumanRightsTribunalPage = lazy(() => import('@/components/pages/HumanRightsTribunalPage'));
const EmploymentIssuesPage = lazy(() => import('@/components/pages/EmploymentIssuesPage'));
const CriminalMattersPage = lazy(() => import('@/components/pages/CriminalMattersPage'));

// Phase 1 SEO Pages
const LondonParalegalPage = lazy(() => import('@/components/pages/LondonParalegalPage'));
const SpeedingTicketDefencePage = lazy(() => import('@/components/pages/SpeedingTicketDefencePage'));
const CarelessDrivingDefencePage = lazy(() => import('@/components/pages/CarelessDrivingDefencePage'));
const StuntDrivingDefencePage = lazy(() => import('@/components/pages/StuntDrivingDefencePage'));
const LandlordServicesPage = lazy(() => import('@/components/pages/LandlordServicesPage'));
const TenantServicesPage = lazy(() => import('@/components/pages/TenantServicesPage'));
const EvictionNonPaymentPage = lazy(() => import('@/components/pages/EvictionNonPaymentPage'));
const SmallClaimsProcessPage = lazy(() => import('@/components/pages/SmallClaimsProcessPage'));

// Phase 2 SEO - Traffic Defence
const DistractedDrivingDefencePage = lazy(() => import('@/components/pages/DistractedDrivingDefencePage'));
const RedLightDefencePage = lazy(() => import('@/components/pages/RedLightDefencePage'));
const NoInsuranceDefencePage = lazy(() => import('@/components/pages/NoInsuranceDefencePage'));
const DemeritPointsGuidePage = lazy(() => import('@/components/pages/DemeritPointsGuidePage'));
const G1G2ViolationsPage = lazy(() => import('@/components/pages/G1G2ViolationsPage'));

// Phase 2 SEO - Landlord Tenant Board
const N12PersonalUsePage = lazy(() => import('@/components/pages/N12PersonalUsePage'));
const N13RenovationEvictionPage = lazy(() => import('@/components/pages/N13RenovationEvictionPage'));
const AboveGuidelineIncreasePage = lazy(() => import('@/components/pages/AboveGuidelineIncreasePage'));
const MaintenanceRepairsPage = lazy(() => import('@/components/pages/MaintenanceRepairsPage'));
const BadFaithEvictionPage = lazy(() => import('@/components/pages/BadFaithEvictionPage'));
const RentIncreaseGuidePage = lazy(() => import('@/components/pages/RentIncreaseGuidePage'));
const IllegalLockoutPage = lazy(() => import('@/components/pages/IllegalLockoutPage'));
const HarassmentByLandlordPage = lazy(() => import('@/components/pages/HarassmentByLandlordPage'));

// Phase 2 SEO - Small Claims Court
const DebtCollectionPage = lazy(() => import('@/components/pages/DebtCollectionPage'));
const ContractDisputesPage = lazy(() => import('@/components/pages/ContractDisputesPage'));
const JudgementEnforcementPage = lazy(() => import('@/components/pages/JudgementEnforcementPage'));
const PropertyDamageClaimsPage = lazy(() => import('@/components/pages/PropertyDamageClaimsPage'));

// Phase 2 SEO - Location Pages
const StThomasParalegalPage = lazy(() => import('@/components/pages/StThomasParalegalPage'));
const WoodstockParalegalPage = lazy(() => import('@/components/pages/WoodstockParalegalPage'));
const StrathroyChathamParalegalPage = lazy(() => import('@/components/pages/StrathroyChathamParalegalPage'));

// Phase 3 - Previously Unrouted Pages
const NotaryPublicPage = lazy(() => import('@/components/pages/NotaryPublicPage'));
const CommissionerOfOathsPage = lazy(() => import('@/components/pages/CommissionerOfOathsPage'));
const MediationServicesPage = lazy(() => import('@/components/pages/MediationServicesPage'));
const SocialBenefitsTribunalPage = lazy(() => import('@/components/pages/SocialBenefitsTribunalPage'));
const DefamationSlanderPage = lazy(() => import('@/components/pages/DefamationSlanderPage'));
const BailHearingsPage = lazy(() => import('@/components/pages/BailHearingsPage'));
const ParalegalVsLawyerPage = lazy(() => import('@/components/pages/ParalegalVsLawyerPage'));
const WhatIsAParalegalPage = lazy(() => import('@/components/pages/WhatIsAParalegalPage'));

// Phase 3 - New Location Pages
const IngersollParalegalPage = lazy(() => import('@/components/pages/IngersollParalegalPage'));
const TillsonburgParalegalPage = lazy(() => import('@/components/pages/TillsonburgParalegalPage'));
const AylmerParalegalPage = lazy(() => import('@/components/pages/AylmerParalegalPage'));

// Phase 3 - New Small Claims Pages
const UnpaidInvoicesPage = lazy(() => import('@/components/pages/UnpaidInvoicesPage'));
const SecurityDepositsPage = lazy(() => import('@/components/pages/SecurityDepositsPage'));
const ConsumerDisputesPage = lazy(() => import('@/components/pages/ConsumerDisputesPage'));

// Phase 3 - HRTO Cluster
const WorkplaceDiscriminationPage = lazy(() => import('@/components/pages/WorkplaceDiscriminationPage'));
const HousingDiscriminationPage = lazy(() => import('@/components/pages/HousingDiscriminationPage'));

// Phase 3 Step 2 - Small Claims Domination Cluster
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

// Phase 3 Step 3 - LTB Expansion Cluster
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

// Phase 3 Step 4 - Traffic Ticket Expansion Cluster
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

// Additional Service Pages
const KitchenerParalegalPage = lazy(() => import('@/components/pages/KitchenerParalegalPage'));
const CambridgeParalegalPage = lazy(() => import('@/components/pages/CambridgeParalegalPage'));
const GuelphParalegalPage = lazy(() => import('@/components/pages/GuelphParalegalPage'));
const BrantfordParalegalPage = lazy(() => import('@/components/pages/BrantfordParalegalPage'));
const StratfordParalegalPage = lazy(() => import('@/components/pages/StratfordParalegalPage'));
const SarniaParalegalPage = lazy(() => import('@/components/pages/SarniaParalegalPage'));
const WindsorParalegalPage = lazy(() => import('@/components/pages/WindsorParalegalPage'));
const ChathamKentParalegalPage = lazy(() => import('@/components/pages/ChathamKentParalegalPage'));
const LeamingtonParalegalPage = lazy(() => import('@/components/pages/LeamingtonParalegalPage'));
const NorfolkCountyParalegalPage = lazy(() => import('@/components/pages/NorfolkCountyParalegalPage'));
const HuronCountyParalegalPage = lazy(() => import('@/components/pages/HuronCountyParalegalPage'));

// 404 Page
const NotFoundPage = lazy(() => import('@/components/pages/NotFoundPage'));

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
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/client-signup" element={<ClientSignupPage />} />
            <Route path="/client-login" element={<ClientLoginPage />} />

            {/* Core Service Pages */}
            <Route path="/services/small-claims-court" element={<SmallClaimsPage />} />
            <Route path="/services/landlord-tenant-board" element={<LandlordTenantBoardPage />} />
            <Route path="/services/traffic-tickets" element={<TrafficTicketsPage />} />
            <Route path="/services/human-rights-tribunal" element={<HumanRightsTribunalPage />} />
            <Route path="/services/employment-issues" element={<EmploymentIssuesPage />} />
            <Route path="/services/criminal-matters" element={<CriminalMattersPage />} />

            {/* Phase 1 SEO Pages */}
            <Route path="/london-paralegal" element={<LondonParalegalPage />} />
            <Route path="/services/speeding-ticket-defence" element={<SpeedingTicketDefencePage />} />
            <Route path="/services/careless-driving-defence" element={<CarelessDrivingDefencePage />} />
            <Route path="/services/stunt-driving-defence" element={<StuntDrivingDefencePage />} />
            <Route path="/services/landlord-services" element={<LandlordServicesPage />} />
            <Route path="/services/tenant-services" element={<TenantServicesPage />} />
            <Route path="/services/eviction-non-payment" element={<EvictionNonPaymentPage />} />
            <Route path="/services/small-claims-process" element={<SmallClaimsProcessPage />} />

            {/* Phase 2 SEO - Traffic Defence */}
            <Route path="/services/distracted-driving" element={<DistractedDrivingDefencePage />} />
            <Route path="/services/red-light-tickets" element={<RedLightDefencePage />} />
            <Route path="/services/no-insurance-defence" element={<NoInsuranceDefencePage />} />
            <Route path="/services/demerit-points-guide" element={<DemeritPointsGuidePage />} />
            <Route path="/services/g1-g2-violations" element={<G1G2ViolationsPage />} />

            {/* Phase 2 SEO - Landlord Tenant Board */}
            <Route path="/services/n12-personal-use-eviction" element={<N12PersonalUsePage />} />
            <Route path="/services/n13-renovation-eviction" element={<N13RenovationEvictionPage />} />
            <Route path="/services/above-guideline-increase" element={<AboveGuidelineIncreasePage />} />
            <Route path="/services/maintenance-repairs" element={<MaintenanceRepairsPage />} />
            <Route path="/services/bad-faith-eviction" element={<BadFaithEvictionPage />} />
            <Route path="/services/rent-increase-guide" element={<RentIncreaseGuidePage />} />
            <Route path="/services/illegal-lockout" element={<IllegalLockoutPage />} />
            <Route path="/services/landlord-harassment" element={<HarassmentByLandlordPage />} />

            {/* Phase 2 SEO - Small Claims Court */}
            <Route path="/services/debt-collection" element={<DebtCollectionPage />} />
            <Route path="/services/contract-disputes" element={<ContractDisputesPage />} />
            <Route path="/services/judgement-enforcement" element={<JudgementEnforcementPage />} />
            <Route path="/services/property-damage-claims" element={<PropertyDamageClaimsPage />} />

            {/* Phase 2 SEO - Location Pages */}
            <Route path="/st-thomas-paralegal" element={<StThomasParalegalPage />} />
            <Route path="/woodstock-paralegal" element={<WoodstockParalegalPage />} />
            <Route path="/strathroy-chatham-paralegal" element={<StrathroyChathamParalegalPage />} />

            {/* Phase 3 - Previously Unrouted Pages */}
            <Route path="/services/notary-public" element={<NotaryPublicPage />} />
            <Route path="/services/commissioner-of-oaths" element={<CommissionerOfOathsPage />} />
            <Route path="/services/mediation" element={<MediationServicesPage />} />
            <Route path="/services/social-benefits-tribunal" element={<SocialBenefitsTribunalPage />} />
            <Route path="/services/defamation-slander" element={<DefamationSlanderPage />} />
            <Route path="/services/bail-hearings" element={<BailHearingsPage />} />
            <Route path="/paralegal-vs-lawyer" element={<ParalegalVsLawyerPage />} />
            <Route path="/what-is-a-paralegal" element={<WhatIsAParalegalPage />} />

            {/* Phase 3 - New Location Pages */}
            <Route path="/ingersoll-paralegal" element={<IngersollParalegalPage />} />
            <Route path="/tillsonburg-paralegal" element={<TillsonburgParalegalPage />} />
            <Route path="/aylmer-paralegal" element={<AylmerParalegalPage />} />

            {/* Phase 3 - New Small Claims Pages */}
            <Route path="/services/unpaid-invoices" element={<UnpaidInvoicesPage />} />
            <Route path="/services/security-deposits" element={<SecurityDepositsPage />} />
            <Route path="/services/consumer-disputes" element={<ConsumerDisputesPage />} />

            {/* Phase 3 - HRTO Cluster */}
            <Route path="/services/workplace-discrimination" element={<WorkplaceDiscriminationPage />} />
            <Route path="/services/housing-discrimination" element={<HousingDiscriminationPage />} />

            {/* Phase 3 Step 2 - Small Claims Domination Cluster */}
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

            {/* Phase 3 Step 3 - LTB Expansion Cluster (10 NEW PAGES) */}
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

            {/* Phase 3 Step 4 - Traffic Ticket Expansion Cluster (10 NEW PAGES) */}
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

            {/* Additional Location Pages */}
            <Route path="/locations/kitchener" element={<KitchenerParalegalPage />} />
            <Route path="/locations/cambridge" element={<CambridgeParalegalPage />} />
            <Route path="/locations/guelph" element={<GuelphParalegalPage />} />
            <Route path="/locations/brantford" element={<BrantfordParalegalPage />} />
            <Route path="/locations/stratford" element={<StratfordParalegalPage />} />
            <Route path="/locations/sarnia" element={<SarniaParalegalPage />} />
            <Route path="/locations/windsor" element={<WindsorParalegalPage />} />
            <Route path="/locations/chatham-kent" element={<ChathamKentParalegalPage />} />
            <Route path="/locations/leamington" element={<LeamingtonParalegalPage />} />
            <Route path="/locations/norfolk-county" element={<NorfolkCountyParalegalPage />} />
            <Route path="/locations/huron-county" element={<HuronCountyParalegalPage />} />

            {/* Legacy URL Redirects - BEFORE wildcard */}
            <Route path="/services/small-claims" element={<Navigate to="/services/small-claims-court" replace />} />
            <Route path="/services/landlord-tenant" element={<Navigate to="/services/landlord-tenant-board" replace />} />
            <Route path="/services/human-rights" element={<Navigate to="/services/human-rights-tribunal" replace />} />
            <Route path="/signup" element={<Navigate to="/client-signup" replace />} />
            <Route path="/login" element={<Navigate to="/client-login" replace />} />

            {/* 404 Catch-all */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </MemberProvider>
    </BrowserRouter>
  );
}
