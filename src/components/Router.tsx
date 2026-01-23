import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { MemberProvider } from '@/integrations';
import { AutoSEO } from '@/components/AutoSEO';

// =============================================
// STATIC IMPORTS - Critical pages, instant load
// =============================================
import HomePage from '@/components/pages/HomePage';
import ContactPage from '@/components/pages/ContactPage';

// =============================================
// EXPLICIT LAZY IMPORTS - Important pages
// These are pre-bundled and will load reliably
// =============================================

// Core Pages
const AboutPage = lazy(() => import('@/components/pages/AboutPage'));
const ServicesPage = lazy(() => import('@/components/pages/ServicesPage'));
const ClientSignupPage = lazy(() => import('@/components/pages/ClientSignupPage'));
const ClientLoginPage = lazy(() => import('@/components/pages/ClientLoginPage'));
const NotFoundPage = lazy(() => import('@/components/pages/NotFoundPage'));

// Main Service Categories
const SmallClaimsPage = lazy(() => import('@/components/pages/SmallClaimsPage'));
const LandlordTenantBoardPage = lazy(() => import('@/components/pages/LandlordTenantBoardPage'));
const TrafficTicketsPage = lazy(() => import('@/components/pages/TrafficTicketsPage'));
const HumanRightsTribunalPage = lazy(() => import('@/components/pages/HumanRightsTribunalPage'));
const EmploymentIssuesPage = lazy(() => import('@/components/pages/EmploymentIssuesPage'));
const CriminalMattersPage = lazy(() => import('@/components/pages/CriminalMattersPage'));
const ProvincialOffencesPage = lazy(() => import('@/components/pages/ProvincialOffencesPage'));

// Top Traffic Pages
const SpeedingTicketDefencePage = lazy(() => import('@/components/pages/SpeedingTicketDefencePage'));
const CarelessDrivingDefencePage = lazy(() => import('@/components/pages/CarelessDrivingDefencePage'));
const StuntDrivingDefencePage = lazy(() => import('@/components/pages/StuntDrivingDefencePage'));
const DistractedDrivingDefencePage = lazy(() => import('@/components/pages/DistractedDrivingDefencePage'));
const NoInsuranceDefencePage = lazy(() => import('@/components/pages/NoInsuranceDefencePage'));
const DemeritPointsGuidePage = lazy(() => import('@/components/pages/DemeritPointsGuidePage'));

// Top LTB Pages
const LandlordServicesPage = lazy(() => import('@/components/pages/LandlordServicesPage'));
const TenantServicesPage = lazy(() => import('@/components/pages/TenantServicesPage'));
const EvictionNonPaymentPage = lazy(() => import('@/components/pages/EvictionNonPaymentPage'));
const N12PersonalUsePage = lazy(() => import('@/components/pages/N12PersonalUsePage'));
const BadFaithEvictionPage = lazy(() => import('@/components/pages/BadFaithEvictionPage'));
const IllegalLockoutPage = lazy(() => import('@/components/pages/IllegalLockoutPage'));

// Top Small Claims Pages
const DebtCollectionPage = lazy(() => import('@/components/pages/DebtCollectionPage'));
const ContractDisputesPage = lazy(() => import('@/components/pages/ContractDisputesPage'));
const SmallClaimsProcessPage = lazy(() => import('@/components/pages/SmallClaimsProcessPage'));

// Key Location Pages
const LondonParalegalPage = lazy(() => import('@/components/pages/LondonParalegalPage'));
const StThomasParalegalPage = lazy(() => import('@/components/pages/StThomasParalegalPage'));
const WoodstockParalegalPage = lazy(() => import('@/components/pages/WoodstockParalegalPage'));
const KitchenerParalegalPage = lazy(() => import('@/components/pages/KitchenerParalegalPage'));
const WindsorParalegalPage = lazy(() => import('@/components/pages/WindsorParalegalPage'));

// Top Guide Pages
const HowToFightTrafficTicketPage = lazy(() => import('@/components/pages/HowToFightTrafficTicketPage'));
const TenantRightsGuidePage = lazy(() => import('@/components/pages/TenantRightsGuidePage'));
const LandlordRightsGuidePage = lazy(() => import('@/components/pages/LandlordRightsGuidePage'));
const SmallClaimsCourtGuidePage = lazy(() => import('@/components/pages/SmallClaimsCourtGuidePage'));
const ParalegalVsLawyerPage = lazy(() => import('@/components/pages/ParalegalVsLawyerPage'));

// Dashboard/Admin (for logged-in users)
const ClientDashboardPage = lazy(() => import('@/components/pages/ClientDashboardPage'));
const BookingPage = lazy(() => import('@/components/pages/BookingPage'));

// =============================================
// DYNAMIC LOADER - For remaining pages
// =============================================
const pageCache = new Map();

function lazyLoadPage(pageName: string) {
  if (!pageCache.has(pageName)) {
    pageCache.set(
      pageName,
      lazy(() => import(`@/components/pages/${pageName}.tsx`))
    );
  }
  return pageCache.get(pageName);
}

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
  useEffect(() => {
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
            {/* ====== STATIC ROUTES ====== */}
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* ====== EXPLICIT LAZY ROUTES ====== */}
            {/* Core */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/signup" element={<ClientSignupPage />} />
            <Route path="/login" element={<ClientLoginPage />} />
            
            {/* Main Service Categories */}
            <Route path="/services/small-claims" element={<SmallClaimsPage />} />
            <Route path="/services/landlord-tenant" element={<LandlordTenantBoardPage />} />
            <Route path="/services/traffic-tickets" element={<TrafficTicketsPage />} />
            <Route path="/services/human-rights" element={<HumanRightsTribunalPage />} />
            <Route path="/services/employment-issues" element={<EmploymentIssuesPage />} />
            <Route path="/services/criminal-matters" element={<CriminalMattersPage />} />
            <Route path="/services/provincial-offences" element={<ProvincialOffencesPage />} />
            
            {/* Top Traffic Pages */}
            <Route path="/services/speeding-ticket-defence" element={<SpeedingTicketDefencePage />} />
            <Route path="/services/careless-driving-defence" element={<CarelessDrivingDefencePage />} />
            <Route path="/services/stunt-driving-defence" element={<StuntDrivingDefencePage />} />
            <Route path="/services/distracted-driving" element={<DistractedDrivingDefencePage />} />
            <Route path="/services/no-insurance-defence" element={<NoInsuranceDefencePage />} />
            <Route path="/services/demerit-points-guide" element={<DemeritPointsGuidePage />} />
            
            {/* Top LTB Pages */}
            <Route path="/services/landlord-services" element={<LandlordServicesPage />} />
            <Route path="/services/tenant-services" element={<TenantServicesPage />} />
            <Route path="/services/eviction-non-payment" element={<EvictionNonPaymentPage />} />
            <Route path="/services/n12-personal-use-eviction" element={<N12PersonalUsePage />} />
            <Route path="/services/bad-faith-eviction" element={<BadFaithEvictionPage />} />
            <Route path="/services/illegal-lockout" element={<IllegalLockoutPage />} />
            
            {/* Top Small Claims Pages */}
            <Route path="/services/debt-collection" element={<DebtCollectionPage />} />
            <Route path="/services/contract-disputes" element={<ContractDisputesPage />} />
            <Route path="/services/small-claims-process" element={<SmallClaimsProcessPage />} />
            
            {/* Key Location Pages */}
            <Route path="/london-paralegal" element={<LondonParalegalPage />} />
            <Route path="/st-thomas-paralegal" element={<StThomasParalegalPage />} />
            <Route path="/woodstock-paralegal" element={<WoodstockParalegalPage />} />
            <Route path="/locations/kitchener" element={<KitchenerParalegalPage />} />
            <Route path="/locations/windsor" element={<WindsorParalegalPage />} />
            
            {/* Top Guide Pages */}
            <Route path="/guides/how-to-fight-traffic-ticket" element={<HowToFightTrafficTicketPage />} />
            <Route path="/guides/ontario-tenant-rights" element={<TenantRightsGuidePage />} />
            <Route path="/guides/ontario-landlord-rights" element={<LandlordRightsGuidePage />} />
            <Route path="/guides/small-claims-court-process" element={<SmallClaimsCourtGuidePage />} />
            <Route path="/guides/paralegal-vs-lawyer" element={<ParalegalVsLawyerPage />} />
            
            {/* Dashboard/Booking */}
            <Route path="/dashboard" element={<ClientDashboardPage />} />
            <Route path="/booking" element={<BookingPage />} />

            {/* ====== DYNAMIC ROUTES - Less critical pages ====== */}
            {/* Traffic sub-pages */}
            <Route path="/services/red-light-tickets" element={(() => { const C = lazyLoadPage('RedLightDefencePage'); return <C />; })()} />
            <Route path="/services/g1-g2-violations" element={(() => { const C = lazyLoadPage('G1G2ViolationsPage'); return <C />; })()} />
            <Route path="/services/commercial-vehicle-violations" element={(() => { const C = lazyLoadPage('CommercialVehicleViolationsPage'); return <C />; })()} />
            <Route path="/services/hov-lane-violations" element={(() => { const C = lazyLoadPage('HOVLaneViolationsPage'); return <C />; })()} />
            <Route path="/services/stop-sign-ticket" element={(() => { const C = lazyLoadPage('StopSignTicketPage'); return <C />; })()} />
            <Route path="/services/street-racing" element={(() => { const C = lazyLoadPage('StreetRacingPage'); return <C />; })()} />
            <Route path="/services/fail-to-yield" element={(() => { const C = lazyLoadPage('FailToYieldPage'); return <C />; })()} />
            <Route path="/services/unsafe-lane-change" element={(() => { const C = lazyLoadPage('UnsafeLaneChangePage'); return <C />; })()} />
            <Route path="/services/following-too-closely" element={(() => { const C = lazyLoadPage('FollowingTooCloselyPage'); return <C />; })()} />
            <Route path="/services/driving-while-suspended" element={(() => { const C = lazyLoadPage('DrivingWhileSuspendedPage'); return <C />; })()} />
            <Route path="/services/school-zone-speeding" element={(() => { const C = lazyLoadPage('SchoolZoneSpeedingPage'); return <C />; })()} />
            <Route path="/services/seatbelt-violations" element={(() => { const C = lazyLoadPage('SeatbeltViolationsPage'); return <C />; })()} />
            
            {/* LTB sub-pages */}
            <Route path="/services/n13-renovation-eviction" element={(() => { const C = lazyLoadPage('N13RenovationEvictionPage'); return <C />; })()} />
            <Route path="/services/above-guideline-increase" element={(() => { const C = lazyLoadPage('AboveGuidelineIncreasePage'); return <C />; })()} />
            <Route path="/services/maintenance-repairs" element={(() => { const C = lazyLoadPage('MaintenanceRepairsPage'); return <C />; })()} />
            <Route path="/services/rent-increase-guide" element={(() => { const C = lazyLoadPage('RentIncreaseGuidePage'); return <C />; })()} />
            <Route path="/services/landlord-harassment" element={(() => { const C = lazyLoadPage('HarassmentByLandlordPage'); return <C />; })()} />
            <Route path="/services/rent-arrears-defence" element={(() => { const C = lazyLoadPage('RentArrearsDefencePage'); return <C />; })()} />
            <Route path="/services/subsidized-housing-eviction" element={(() => { const C = lazyLoadPage('SubsidizedHousingPage'); return <C />; })()} />
            <Route path="/services/roommate-disputes" element={(() => { const C = lazyLoadPage('RoommateDisputesPage'); return <C />; })()} />
            <Route path="/services/breaking-lease-early" element={(() => { const C = lazyLoadPage('LeaseBreakingPage'); return <C />; })()} />
            <Route path="/services/pet-disputes" element={(() => { const C = lazyLoadPage('PetDisputesPage'); return <C />; })()} />
            <Route path="/services/noise-complaints-defence" element={(() => { const C = lazyLoadPage('NoiseComplaintsPage'); return <C />; })()} />
            <Route path="/services/ltb-hearing-preparation" element={(() => { const C = lazyLoadPage('LTBHearingPrepPage'); return <C />; })()} />
            <Route path="/services/rent-reduction-applications" element={(() => { const C = lazyLoadPage('RentReductionPage'); return <C />; })()} />
            <Route path="/services/mobile-home-park-disputes" element={(() => { const C = lazyLoadPage('MobileHomeParkPage'); return <C />; })()} />
            <Route path="/services/superintendent-housing-rights" element={(() => { const C = lazyLoadPage('SuperintendentIssuesPage'); return <C />; })()} />
            
            {/* Small Claims sub-pages */}
            <Route path="/services/judgement-enforcement" element={(() => { const C = lazyLoadPage('JudgementEnforcementPage'); return <C />; })()} />
            <Route path="/services/property-damage-claims" element={(() => { const C = lazyLoadPage('PropertyDamageClaimsPage'); return <C />; })()} />
            <Route path="/services/unpaid-invoices" element={(() => { const C = lazyLoadPage('UnpaidInvoicesPage'); return <C />; })()} />
            <Route path="/services/security-deposits" element={(() => { const C = lazyLoadPage('SecurityDepositsPage'); return <C />; })()} />
            <Route path="/services/consumer-disputes" element={(() => { const C = lazyLoadPage('ConsumerDisputesPage'); return <C />; })()} />
            <Route path="/services/personal-injury-claims" element={(() => { const C = lazyLoadPage('PersonalInjuryClaimsPage'); return <C />; })()} />
            <Route path="/services/home-improvement-disputes" element={(() => { const C = lazyLoadPage('HomeImprovementDisputesPage'); return <C />; })()} />
            <Route path="/services/vehicle-purchase-disputes" element={(() => { const C = lazyLoadPage('VehiclePurchaseDisputesPage'); return <C />; })()} />
            <Route path="/services/neighbour-disputes" element={(() => { const C = lazyLoadPage('NeighbourDisputesPage'); return <C />; })()} />
            <Route path="/services/return-of-property" element={(() => { const C = lazyLoadPage('ReturnOfPropertyPage'); return <C />; })()} />
            <Route path="/services/breach-of-warranty" element={(() => { const C = lazyLoadPage('BreachOfWarrantyPage'); return <C />; })()} />
            <Route path="/services/loan-recovery" element={(() => { const C = lazyLoadPage('LoanRecoveryPage'); return <C />; })()} />
            <Route path="/services/tenant-damage-claims" element={(() => { const C = lazyLoadPage('TenantDamageClaimsPage'); return <C />; })()} />
            <Route path="/services/wrongful-dismissal-claims" element={(() => { const C = lazyLoadPage('WrongfulDismissalClaimsPage'); return <C />; })()} />
            <Route path="/services/professional-negligence" element={(() => { const C = lazyLoadPage('ProfessionalNegligencePage'); return <C />; })()} />
            <Route path="/services/defamation-slander" element={(() => { const C = lazyLoadPage('DefamationSlanderPage'); return <C />; })()} />
            
            {/* Human Rights sub-pages */}
            <Route path="/services/workplace-discrimination" element={(() => { const C = lazyLoadPage('WorkplaceDiscriminationPage'); return <C />; })()} />
            <Route path="/services/housing-discrimination" element={(() => { const C = lazyLoadPage('HousingDiscriminationPage'); return <C />; })()} />
            <Route path="/services/disability-accommodation" element={(() => { const C = lazyLoadPage('DisabilityAccommodationPage'); return <C />; })()} />
            <Route path="/services/age-discrimination" element={(() => { const C = lazyLoadPage('AgeDiscriminationPage'); return <C />; })()} />
            <Route path="/services/sexual-harassment" element={(() => { const C = lazyLoadPage('SexualHarassmentPage'); return <C />; })()} />
            <Route path="/services/reprisal-claims" element={(() => { const C = lazyLoadPage('ReprisalClaimsPage'); return <C />; })()} />
            <Route path="/services/service-discrimination" element={(() => { const C = lazyLoadPage('ServiceDiscriminationPage'); return <C />; })()} />
            <Route path="/services/pregnancy-discrimination" element={(() => { const C = lazyLoadPage('PregnancyDiscriminationPage'); return <C />; })()} />
            
            {/* Employment sub-pages */}
            <Route path="/services/wrongful-termination" element={(() => { const C = lazyLoadPage('WrongfulTerminationPage'); return <C />; })()} />
            <Route path="/services/severance-pay" element={(() => { const C = lazyLoadPage('SeverancePayPage'); return <C />; })()} />
            <Route path="/services/unpaid-wages" element={(() => { const C = lazyLoadPage('UnpaidWagesPage'); return <C />; })()} />
            <Route path="/services/constructive-dismissal" element={(() => { const C = lazyLoadPage('ConstructiveDismissalPage'); return <C />; })()} />
            
            {/* Criminal/POA sub-pages */}
            <Route path="/services/theft-under-5000" element={(() => { const C = lazyLoadPage('TheftUnderPage'); return <C />; })()} />
            <Route path="/services/mischief-under-5000" element={(() => { const C = lazyLoadPage('MischiefUnderPage'); return <C />; })()} />
            <Route path="/services/simple-assault" element={(() => { const C = lazyLoadPage('SimpleAssaultPage'); return <C />; })()} />
            <Route path="/services/trespass-property" element={(() => { const C = lazyLoadPage('TrespassPropertyPage'); return <C />; })()} />
            <Route path="/services/fail-to-comply" element={(() => { const C = lazyLoadPage('FailToComplyPage'); return <C />; })()} />
            <Route path="/services/peace-bond" element={(() => { const C = lazyLoadPage('PeaceBondPage'); return <C />; })()} />
            <Route path="/services/liquor-licence-act" element={(() => { const C = lazyLoadPage('LiquorLicenceActPage'); return <C />; })()} />
            <Route path="/services/municipal-bylaw" element={(() => { const C = lazyLoadPage('MunicipalBylawPage'); return <C />; })()} />
            <Route path="/services/regulatory-offences" element={(() => { const C = lazyLoadPage('RegulatoryOffencesPage'); return <C />; })()} />
            <Route path="/services/bail-hearings" element={(() => { const C = lazyLoadPage('BailHearingsPage'); return <C />; })()} />
            
            {/* Other Services */}
            <Route path="/services/notary-public" element={(() => { const C = lazyLoadPage('NotaryPublicPage'); return <C />; })()} />
            <Route path="/services/commissioner-of-oaths" element={(() => { const C = lazyLoadPage('CommissionerOfOathsPage'); return <C />; })()} />
            <Route path="/services/mediation" element={(() => { const C = lazyLoadPage('MediationServicesPage'); return <C />; })()} />
            <Route path="/services/social-benefits-tribunal" element={(() => { const C = lazyLoadPage('SocialBenefitsTribunalPage'); return <C />; })()} />
            
            {/* Remaining Location Pages */}
            <Route path="/strathroy-chatham-paralegal" element={(() => { const C = lazyLoadPage('StrathroyChathamParalegalPage'); return <C />; })()} />
            <Route path="/ingersoll-paralegal" element={(() => { const C = lazyLoadPage('IngersollParalegalPage'); return <C />; })()} />
            <Route path="/tillsonburg-paralegal" element={(() => { const C = lazyLoadPage('TillsonburgParalegalPage'); return <C />; })()} />
            <Route path="/aylmer-paralegal" element={(() => { const C = lazyLoadPage('AylmerParalegalPage'); return <C />; })()} />
            <Route path="/locations/cambridge" element={(() => { const C = lazyLoadPage('CambridgeParalegalPage'); return <C />; })()} />
            <Route path="/locations/sarnia" element={(() => { const C = lazyLoadPage('SarniaParalegalPage'); return <C />; })()} />
            <Route path="/locations/chatham-kent" element={(() => { const C = lazyLoadPage('ChathamKentParalegalPage'); return <C />; })()} />
            <Route path="/locations/stratford" element={(() => { const C = lazyLoadPage('StratfordParalegalPage'); return <C />; })()} />
            <Route path="/locations/guelph" element={(() => { const C = lazyLoadPage('GuelphParalegalPage'); return <C />; })()} />
            <Route path="/locations/brantford" element={(() => { const C = lazyLoadPage('BrantfordParalegalPage'); return <C />; })()} />
            <Route path="/locations/norfolk-county" element={(() => { const C = lazyLoadPage('NorfolkCountyParalegalPage'); return <C />; })()} />
            <Route path="/locations/leamington" element={(() => { const C = lazyLoadPage('LeamingtonParalegalPage'); return <C />; })()} />
            <Route path="/locations/huron-county" element={(() => { const C = lazyLoadPage('HuronCountyParalegalPage'); return <C />; })()} />
            
            {/* Remaining Guide Pages */}
            <Route path="/guides/what-is-a-paralegal" element={(() => { const C = lazyLoadPage('WhatIsAParalegalPage'); return <C />; })()} />
            <Route path="/guides/ontario-employment-rights" element={(() => { const C = lazyLoadPage('EmploymentRightsGuidePage'); return <C />; })()} />
            <Route path="/guides/free-legal-resources" element={(() => { const C = lazyLoadPage('FreeLegalResourcesPage'); return <C />; })()} />
            <Route path="/guides/what-to-do-when-sued" element={(() => { const C = lazyLoadPage('BeingSuedGuidePage'); return <C />; })()} />
            <Route path="/guides/ltb-hearing-preparation" element={(() => { const C = lazyLoadPage('LTBHearingGuidePage'); return <C />; })()} />
            <Route path="/guides/filing-human-rights-complaint" element={(() => { const C = lazyLoadPage('HumanRightsComplaintGuidePage'); return <C />; })()} />
            <Route path="/guides/legal-deadlines-ontario" element={(() => { const C = lazyLoadPage('LegalDeadlinesGuidePage'); return <C />; })()} />
            
            {/* Legal News */}
            <Route path="/legal-news" element={(() => { const C = lazyLoadPage('LegalNewsPage'); return <C />; })()} />
            <Route path="/recent-decisions" element={(() => { const C = lazyLoadPage('LegalNewsPage'); return <C />; })()} />
            
            {/* Admin Pages */}
            <Route path="/admin/bookings" element={(() => { const C = lazyLoadPage('AdminBookingsPage'); return <C />; })()} />
            <Route path="/admin/meeting-requests" element={(() => { const C = lazyLoadPage('AdminMeetingRequestsPage'); return <C />; })()} />
            <Route path="/admin/messages" element={(() => { const C = lazyLoadPage('AdminMessagesPage'); return <C />; })()} />
            <Route path="/admin/users" element={(() => { const C = lazyLoadPage('AdminUserManagementPage'); return <C />; })()} />
            <Route path="/admin/users/:id" element={(() => { const C = lazyLoadPage('AdminUserDetailPage'); return <C />; })()} />
            <Route path="/admin/grant" element={(() => { const C = lazyLoadPage('GrantAdminPage'); return <C />; })()} />
            <Route path="/admin/upload-tokens" element={(() => { const C = lazyLoadPage('UploadTokenManagementPage'); return <C />; })()} />
            
            {/* Dashboard Pages */}
            <Route path="/dashboard/paralegal" element={(() => { const C = lazyLoadPage('ParalegalDashboardPage'); return <C />; })()} />
            <Route path="/dashboard/meetings" element={(() => { const C = lazyLoadPage('MeetingDashboardPage'); return <C />; })()} />
            <Route path="/dashboard/documents" element={(() => { const C = lazyLoadPage('DocumentWorkflowPage'); return <C />; })()} />
            
            {/* Client Portal Pages */}
            <Route path="/intake" element={(() => { const C = lazyLoadPage('ClientIntakePage'); return <C />; })()} />
            <Route path="/meeting-request" element={(() => { const C = lazyLoadPage('MeetingRequestPage'); return <C />; })()} />
            <Route path="/upload/:token" element={(() => { const C = lazyLoadPage('PublicUploadPage'); return <C />; })()} />

            {/* 404 Catch-all */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </MemberProvider>
    </HashRouter>
  );
}
