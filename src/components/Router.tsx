import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { MemberProvider } from '@/integrations';

// Main Pages
import HomePage from '@/components/pages/HomePage';
import ContactPage from '@/components/pages/ContactPage';
import AboutPage from '@/components/pages/AboutPage';
import ServicesPage from '@/components/pages/ServicesPage';
import ClientSignupPage from '@/components/pages/ClientSignupPage';
import ClientLoginPage from '@/components/pages/ClientLoginPage';

// Service Pages
import SmallClaimsPage from '@/components/pages/SmallClaimsPage';
import LandlordTenantBoardPage from '@/components/pages/LandlordTenantBoardPage';
import TrafficTicketsPage from '@/components/pages/TrafficTicketsPage';
import HumanRightsTribunalPage from '@/components/pages/HumanRightsTribunalPage';
import EmploymentIssuesPage from '@/components/pages/EmploymentIssuesPage';
import CriminalMattersPage from '@/components/pages/CriminalMattersPage';

// Phase 1 SEO Pages
import LondonParalegalPage from '@/components/pages/LondonParalegalPage';
import SpeedingTicketDefencePage from '@/components/pages/SpeedingTicketDefencePage';
import CarelessDrivingDefencePage from '@/components/pages/CarelessDrivingDefencePage';
import StuntDrivingDefencePage from '@/components/pages/StuntDrivingDefencePage';
import LandlordServicesPage from '@/components/pages/LandlordServicesPage';
import TenantServicesPage from '@/components/pages/TenantServicesPage';
import EvictionNonPaymentPage from '@/components/pages/EvictionNonPaymentPage';
import SmallClaimsProcessPage from '@/components/pages/SmallClaimsProcessPage';

// Phase 2 SEO - Traffic Defence
import DistractedDrivingDefencePage from '@/components/pages/DistractedDrivingDefencePage';
import RedLightDefencePage from '@/components/pages/RedLightDefencePage';
import NoInsuranceDefencePage from '@/components/pages/NoInsuranceDefencePage';
import DemeritPointsGuidePage from '@/components/pages/DemeritPointsGuidePage';
import G1G2ViolationsPage from '@/components/pages/G1G2ViolationsPage';

// Phase 2 SEO - Landlord Tenant Board
import N12PersonalUsePage from '@/components/pages/N12PersonalUsePage';
import N13RenovationEvictionPage from '@/components/pages/N13RenovationEvictionPage';
import AboveGuidelineIncreasePage from '@/components/pages/AboveGuidelineIncreasePage';
import MaintenanceRepairsPage from '@/components/pages/MaintenanceRepairsPage';
import BadFaithEvictionPage from '@/components/pages/BadFaithEvictionPage';
import RentIncreaseGuidePage from '@/components/pages/RentIncreaseGuidePage';
import IllegalLockoutPage from '@/components/pages/IllegalLockoutPage';
import HarassmentByLandlordPage from '@/components/pages/HarassmentByLandlordPage';

// Phase 2 SEO - Small Claims Court
import DebtCollectionPage from '@/components/pages/DebtCollectionPage';
import ContractDisputesPage from '@/components/pages/ContractDisputesPage';
import JudgementEnforcementPage from '@/components/pages/JudgementEnforcementPage';
import PropertyDamageClaimsPage from '@/components/pages/PropertyDamageClaimsPage';

// Phase 2 SEO - Location Pages
import StThomasParalegalPage from '@/components/pages/StThomasParalegalPage';
import WoodstockParalegalPage from '@/components/pages/WoodstockParalegalPage';
import StrathroyChathamParalegalPage from '@/components/pages/StrathroyChathamParalegalPage';

// Phase 3 - Previously Unrouted Pages
import NotaryPublicPage from '@/components/pages/NotaryPublicPage';
import CommissionerOfOathsPage from '@/components/pages/CommissionerOfOathsPage';
import MediationServicesPage from '@/components/pages/MediationServicesPage';
import SocialBenefitsTribunalPage from '@/components/pages/SocialBenefitsTribunalPage';
import DefamationSlanderPage from '@/components/pages/DefamationSlanderPage';
import BailHearingsPage from '@/components/pages/BailHearingsPage';
import ParalegalVsLawyerPage from '@/components/pages/ParalegalVsLawyerPage';
import WhatIsAParalegalPage from '@/components/pages/WhatIsAParalegalPage';

// Phase 3 - New Location Pages
import IngersollParalegalPage from '@/components/pages/IngersollParalegalPage';
import TillsonburgParalegalPage from '@/components/pages/TillsonburgParalegalPage';
import AylmerParalegalPage from '@/components/pages/AylmerParalegalPage';

// Phase 3 - New Small Claims Pages
import UnpaidInvoicesPage from '@/components/pages/UnpaidInvoicesPage';
import SecurityDepositsPage from '@/components/pages/SecurityDepositsPage';
import ConsumerDisputesPage from '@/components/pages/ConsumerDisputesPage';

// Phase 3 - HRTO Cluster
import WorkplaceDiscriminationPage from '@/components/pages/WorkplaceDiscriminationPage';
import HousingDiscriminationPage from '@/components/pages/HousingDiscriminationPage';

// Phase 3 Step 2 - Small Claims Domination Cluster
import PersonalInjuryClaimsPage from '@/components/pages/PersonalInjuryClaimsPage';
import HomeImprovementDisputesPage from '@/components/pages/HomeImprovementDisputesPage';
import VehiclePurchaseDisputesPage from '@/components/pages/VehiclePurchaseDisputesPage';
import NeighbourDisputesPage from '@/components/pages/NeighbourDisputesPage';
import ReturnOfPropertyPage from '@/components/pages/ReturnOfPropertyPage';
import BreachOfWarrantyPage from '@/components/pages/BreachOfWarrantyPage';
import LoanRecoveryPage from '@/components/pages/LoanRecoveryPage';
import TenantDamageClaimsPage from '@/components/pages/TenantDamageClaimsPage';
import WrongfulDismissalClaimsPage from '@/components/pages/WrongfulDismissalClaimsPage';
import ProfessionalNegligencePage from '@/components/pages/ProfessionalNegligencePage';

// Phase 3 Step 3 - LTB Expansion Cluster (NEW)
import RentArrearsDefencePage from '@/components/pages/RentArrearsDefencePage';
import SubsidizedHousingPage from '@/components/pages/SubsidizedHousingPage';
import RoommateDisputesPage from '@/components/pages/RoommateDisputesPage';
import LeaseBreakingPage from '@/components/pages/LeaseBreakingPage';
import PetDisputesPage from '@/components/pages/PetDisputesPage';
import NoiseComplaintsPage from '@/components/pages/NoiseComplaintsPage';
import LTBHearingPrepPage from '@/components/pages/LTBHearingPrepPage';
import RentReductionPage from '@/components/pages/RentReductionPage';
import MobileHomeParkPage from '@/components/pages/MobileHomeParkPage';
import SuperintendentIssuesPage from '@/components/pages/SuperintendentIssuesPage';

// Phase 3 Step 4 - Traffic Ticket Expansion Cluster
import CommercialVehicleViolationsPage from '@/components/pages/CommercialVehicleViolationsPage';
import HOVLaneViolationsPage from '@/components/pages/HOVLaneViolationsPage';
import StopSignTicketPage from '@/components/pages/StopSignTicketPage';
import StreetRacingPage from '@/components/pages/StreetRacingPage';
import FailToYieldPage from '@/components/pages/FailToYieldPage';
import UnsafeLaneChangePage from '@/components/pages/UnsafeLaneChangePage';
import FollowingTooCloselyPage from '@/components/pages/FollowingTooCloselyPage';
import DrivingWhileSuspendedPage from '@/components/pages/DrivingWhileSuspendedPage';
import SchoolZoneSpeedingPage from '@/components/pages/SchoolZoneSpeedingPage';
import SeatbeltViolationsPage from '@/components/pages/SeatbeltViolationsPage';

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

          {/* 404 Catch-all */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </MemberProvider>
    </BrowserRouter>
  );
}
