import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { MemberProvider } from '@/integrations';
import ComingSoonModal from '@/components/ComingSoonModal';

// Main Pages - Keep HomePage and ContactPage as static imports
import HomePage from '@/components/pages/HomePageNew';
import ContactPage from '@/components/pages/ContactPage';
import ConflictDetectedPage from '@/components/pages/ConflictDetectedPage';

// Lazy load all other pages
const AboutPage = lazy(() => import('@/components/pages/AboutPage'));
const ServicesPage = lazy(() => import('@/components/pages/ServicesPage'));
const ClientSignupPage = lazy(() => import('@/components/pages/ClientSignupPage'));
const ClientLoginPage = lazy(() => import('@/components/pages/ClientLoginPage'));
const ClientIntakePage = lazy(() => import('@/components/pages/ClientIntakePage'));
const ClientDashboardPage = lazy(() => import('@/components/pages/ClientDashboardPage'));

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

// Debt Negotiation
const DebtNegotiationPage = lazy(() => import('@/components/pages/DebtNegotiationPage'));

// Phase 2 SEO - Location Pages
const StThomasParalegalPage = lazy(() => import('@/components/pages/StThomasParalegalPage'));
const WoodstockParalegalPage = lazy(() => import('@/components/pages/WoodstockParalegalPage'));
const StrathroyChathamParalegalPage = lazy(() => import('@/components/pages/StrathroyChathamParalegalPage'));

// Phase 3 - Previously Unrouted Pages
const NotaryPublicPage = lazy(() => import('@/components/pages/NotaryPublicPage'));
const LegalNewsPage = lazy(() => import('@/components/pages/LegalNewsPage'));
const ProvincialOffencesPage = lazy(() => import('@/components/pages/ProvincialOffencesPage'));
const CommissionerOfOathsPage = lazy(() => import('@/components/pages/CommissionerOfOathsPage'));
const MediationServicesPage = lazy(() => import('@/components/pages/MediationServicesPage'));
const SocialBenefitsTribunalPage = lazy(() => import('@/components/pages/SocialBenefitsTribunalPage'));
const DefamationSlanderPage = lazy(() => import('@/components/pages/DefamationSlanderPage'));
const BailHearingsPage = lazy(() => import('@/components/pages/BailHearingsPage'));
const ParalegalVsLawyerPage = lazy(() => import('@/components/pages/ParalegalVsLawyerPage'));
const WhatIsAParalegalPage = lazy(() => import('@/components/pages/WhatIsAParalegalPage'));
const IRBRepresentationPage = lazy(() => import('@/components/pages/IRBRepresentationPage'));

// Guide Pages
const TenantRightsGuidePage = lazy(() => import('@/components/pages/TenantRightsGuidePage'));
const LandlordRightsGuidePage = lazy(() => import('@/components/pages/LandlordRightsGuidePage'));
const SmallClaimsCourtGuidePage = lazy(() => import('@/components/pages/SmallClaimsCourtGuidePage'));
const LTBHearingGuidePage = lazy(() => import('@/components/pages/LTBHearingGuidePage'));
const HumanRightsComplaintGuidePage = lazy(() => import('@/components/pages/HumanRightsComplaintGuidePage'));
const EmploymentRightsGuidePage = lazy(() => import('@/components/pages/EmploymentRightsGuidePage'));
const LegalDeadlinesGuidePage = lazy(() => import('@/components/pages/LegalDeadlinesGuidePage'));
const BeingSuedGuidePage = lazy(() => import('@/components/pages/BeingSuedGuidePage'));

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
        <ComingSoonModal />
        <ScrollToTop />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/conflict-detected" element={<ConflictDetectedPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/client-signup" element={<ClientSignupPage />} />
            <Route path="/client-login" element={<ClientLoginPage />} />
            <Route path="/client-intake" element={<ClientIntakePage />} />
            <Route path="/client-dashboard" element={<ClientDashboardPage />} />

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

            {/* Debt Negotiation */}
            <Route path="/services/debt-negotiation" element={<DebtNegotiationPage />} />

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
            <Route path="/services/irb-representation" element={<IRBRepresentationPage />} />
            <Route path="/paralegal-vs-lawyer" element={<ParalegalVsLawyerPage />} />
            <Route path="/what-is-a-paralegal" element={<WhatIsAParalegalPage />} />

            {/* Other Pages */}
            <Route path="/legal-news" element={<LegalNewsPage />} />
            <Route path="/services/provincial-offences" element={<ProvincialOffencesPage />} />

            {/* Guide Pages */}
            <Route path="/guides/ontario-tenant-rights" element={<TenantRightsGuidePage />} />
            <Route path="/guides/ontario-landlord-rights" element={<LandlordRightsGuidePage />} />
            <Route path="/guides/small-claims-court-process" element={<SmallClaimsCourtGuidePage />} />
            <Route path="/guides/ltb-hearing-preparation" element={<LTBHearingGuidePage />} />
            <Route path="/guides/filing-human-rights-complaint" element={<HumanRightsComplaintGuidePage />} />
            <Route path="/guides/ontario-employment-rights" element={<EmploymentRightsGuidePage />} />
            <Route path="/guides/legal-deadlines-ontario" element={<LegalDeadlinesGuidePage />} />
            <Route path="/guides/what-to-do-when-sued" element={<BeingSuedGuidePage />} />
            <Route path="/guides/what-is-a-paralegal" element={<WhatIsAParalegalPage />} />
            <Route path="/guides/paralegal-vs-lawyer" element={<ParalegalVsLawyerPage />} />

            {/* Legacy URL Redirects - BEFORE wildcard */}
            <Route path="/services/small-claims" element={<Navigate to="/services/small-claims-court" replace />} />
            <Route path="/services/landlord-tenant" element={<Navigate to="/services/landlord-tenant-board" replace />} />
            <Route path="/services/human-rights" element={<Navigate to="/services/human-rights-tribunal" replace />} />
            <Route path="/signup" element={<Navigate to="/client-signup" replace />} />
            <Route path="/login" element={<Navigate to="/client-login" replace />} />
            <Route path="/booking" element={<Navigate to="/contact" replace />} />

            {/* 404 Catch-all */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </MemberProvider>
    </BrowserRouter>
  );
}


