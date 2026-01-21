import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Main Pages
import HomePage from '@/components/pages/HomePage';
import ContactPage from '@/components/pages/ContactPage';
import AboutPage from '@/components/pages/AboutPage';

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

// Phase 2 SEO Pages - Traffic
import DistractedDrivingDefencePage from '@/components/pages/DistractedDrivingDefencePage';
import RedLightDefencePage from '@/components/pages/RedLightDefencePage';
import NoInsuranceDefencePage from '@/components/pages/NoInsuranceDefencePage';
import DemeritPointsGuidePage from '@/components/pages/DemeritPointsGuidePage';
import G1G2ViolationsPage from '@/components/pages/G1G2ViolationsPage';

// Phase 2 SEO Pages - LTB
import N12PersonalUsePage from '@/components/pages/N12PersonalUsePage';
import N13RenovationEvictionPage from '@/components/pages/N13RenovationEvictionPage';
import AboveGuidelineIncreasePage from '@/components/pages/AboveGuidelineIncreasePage';
import MaintenanceRepairsPage from '@/components/pages/MaintenanceRepairsPage';
import BadFaithEvictionPage from '@/components/pages/BadFaithEvictionPage';
import RentIncreaseGuidePage from '@/components/pages/RentIncreaseGuidePage';
import IllegalLockoutPage from '@/components/pages/IllegalLockoutPage';
import HarassmentByLandlordPage from '@/components/pages/HarassmentByLandlordPage';

// Phase 2 SEO Pages - Small Claims
import DebtCollectionPage from '@/components/pages/DebtCollectionPage';
import ContractDisputesPage from '@/components/pages/ContractDisputesPage';
import JudgementEnforcementPage from '@/components/pages/JudgementEnforcementPage';
import PropertyDamageClaimsPage from '@/components/pages/PropertyDamageClaimsPage';

// Phase 2 SEO Pages - Location
import StThomasParalegalPage from '@/components/pages/StThomasParalegalPage';
import WoodstockParalegalPage from '@/components/pages/WoodstockParalegalPage';
import StrathroyChathamParalegalPage from '@/components/pages/StrathroyChathamParalegalPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function Router() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Service Pages */}
        <Route path="/services/small-claims" element={<SmallClaimsPage />} />
        <Route path="/services/landlord-tenant-board" element={<LandlordTenantBoardPage />} />
        <Route path="/services/traffic-tickets" element={<TrafficTicketsPage />} />
        <Route path="/services/human-rights-tribunal" element={<HumanRightsTribunalPage />} />
        <Route path="/services/employment-issues" element={<EmploymentIssuesPage />} />
        <Route path="/services/criminal-matters" element={<CriminalMattersPage />} />

        {/* Phase 1 SEO Landing Pages */}
        <Route path="/london-paralegal" element={<LondonParalegalPage />} />
        <Route path="/services/speeding-ticket-defence" element={<SpeedingTicketDefencePage />} />
        <Route path="/services/careless-driving-defence" element={<CarelessDrivingDefencePage />} />
        <Route path="/services/stunt-driving-defence" element={<StuntDrivingDefencePage />} />
        <Route path="/services/landlord-services" element={<LandlordServicesPage />} />
        <Route path="/services/tenant-services" element={<TenantServicesPage />} />
        <Route path="/services/eviction-non-payment" element={<EvictionNonPaymentPage />} />
        <Route path="/services/small-claims-process" element={<SmallClaimsProcessPage />} />

        {/* Phase 2 SEO - Traffic Tickets */}
        <Route path="/services/distracted-driving-defence" element={<DistractedDrivingDefencePage />} />
        <Route path="/services/red-light-ticket-defence" element={<RedLightDefencePage />} />
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

        {/* 404 Catch-all */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
