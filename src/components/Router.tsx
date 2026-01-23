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

// Dynamic page loader - loads pages on demand to reduce initial bundle
const pageCache = new Map();

function lazyLoadPage(pageName: string) {
  if (!pageCache.has(pageName)) {
    // Use relative path for dynamic imports to ensure proper resolution
    pageCache.set(
      pageName,
      lazy(() => import(`../pages/${pageName}.tsx`))
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

// Route mapping for dynamic loading
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
  { path: '/services/small-claims', pageName: 'SmallClaimsPage' },
  { path: '/services/landlord-tenant', pageName: 'LandlordTenantBoardPage' },
  { path: '/services/traffic-tickets', pageName: 'TrafficTicketsPage' },
  { path: '/services/human-rights', pageName: 'HumanRightsTribunalPage' },
  { path: '/services/employment-issues', pageName: 'EmploymentIssuesPage' },
  { path: '/services/criminal-matters', pageName: 'CriminalMattersPage' },
  { path: '/services/provincial-offences', pageName: 'ProvincialOffencesPage' },

  // Traffic Ticket Sub-pages
  { path: '/services/speeding-ticket-defence', pageName: 'SpeedingTicketDefencePage' },
  { path: '/services/careless-driving-defence', pageName: 'CarelessDrivingDefencePage' },
  { path: '/services/stunt-driving-defence', pageName: 'StuntDrivingDefencePage' },
  { path: '/services/distracted-driving', pageName: 'DistractedDrivingDefencePage' },
  { path: '/services/red-light-tickets', pageName: 'RedLightDefencePage' },
  { path: '/services/no-insurance-defence', pageName: 'NoInsuranceDefencePage' },
  { path: '/services/demerit-points-guide', pageName: 'DemeritPointsGuidePage' },
  { path: '/services/g1-g2-violations', pageName: 'G1G2ViolationsPage' },
  { path: '/services/commercial-vehicle-violations', pageName: 'CommercialVehicleViolationsPage' },
  { path: '/services/hov-lane-violations', pageName: 'HOVLaneViolationsPage' },
  { path: '/services/stop-sign-ticket', pageName: 'StopSignTicketPage' },
  { path: '/services/street-racing', pageName: 'StreetRacingPage' },
  { path: '/services/fail-to-yield', pageName: 'FailToYieldPage' },
  { path: '/services/unsafe-lane-change', pageName: 'UnsafeLaneChangePage' },
  { path: '/services/following-too-closely', pageName: 'FollowingTooCloselyPage' },
  { path: '/services/driving-while-suspended', pageName: 'DrivingWhileSuspendedPage' },
  { path: '/services/school-zone-speeding', pageName: 'SchoolZoneSpeedingPage' },
  { path: '/services/seatbelt-violations', pageName: 'SeatbeltViolationsPage' },

  // Landlord & Tenant Board Sub-pages
  { path: '/services/landlord-services', pageName: 'LandlordServicesPage' },
  { path: '/services/tenant-services', pageName: 'TenantServicesPage' },
  { path: '/services/eviction-non-payment', pageName: 'EvictionNonPaymentPage' },
  { path: '/services/n12-personal-use-eviction', pageName: 'N12PersonalUsePage' },
  { path: '/services/n13-renovation-eviction', pageName: 'N13RenovationEvictionPage' },
  { path: '/services/above-guideline-increase', pageName: 'AboveGuidelineIncreasePage' },
  { path: '/services/maintenance-repairs', pageName: 'MaintenanceRepairsPage' },
  { path: '/services/bad-faith-eviction', pageName: 'BadFaithEvictionPage' },
  { path: '/services/rent-increase-guide', pageName: 'RentIncreaseGuidePage' },
  { path: '/services/illegal-lockout', pageName: 'IllegalLockoutPage' },
  { path: '/services/landlord-harassment', pageName: 'HarassmentByLandlordPage' },
  { path: '/services/rent-arrears-defence', pageName: 'RentArrearsDefencePage' },
  { path: '/services/subsidized-housing-eviction', pageName: 'SubsidizedHousingPage' },
  { path: '/services/roommate-disputes', pageName: 'RoommateDisputesPage' },
  { path: '/services/breaking-lease-early', pageName: 'LeaseBreakingPage' },
  { path: '/services/pet-disputes', pageName: 'PetDisputesPage' },
  { path: '/services/noise-complaints-defence', pageName: 'NoiseComplaintsPage' },
  { path: '/services/ltb-hearing-preparation', pageName: 'LTBHearingPrepPage' },
  { path: '/services/rent-reduction-applications', pageName: 'RentReductionPage' },
  { path: '/services/mobile-home-park-disputes', pageName: 'MobileHomeParkPage' },
  { path: '/services/superintendent-housing-rights', pageName: 'SuperintendentIssuesPage' },

  // Small Claims Court Sub-pages
  { path: '/services/small-claims-process', pageName: 'SmallClaimsProcessPage' },
  { path: '/services/debt-collection', pageName: 'DebtCollectionPage' },
  { path: '/services/contract-disputes', pageName: 'ContractDisputesPage' },
  { path: '/services/judgement-enforcement', pageName: 'JudgementEnforcementPage' },
  { path: '/services/property-damage-claims', pageName: 'PropertyDamageClaimsPage' },
  { path: '/services/unpaid-invoices', pageName: 'UnpaidInvoicesPage' },
  { path: '/services/security-deposits', pageName: 'SecurityDepositsPage' },
  { path: '/services/consumer-disputes', pageName: 'ConsumerDisputesPage' },
  { path: '/services/personal-injury-claims', pageName: 'PersonalInjuryClaimsPage' },
  { path: '/services/home-improvement-disputes', pageName: 'HomeImprovementDisputesPage' },
  { path: '/services/vehicle-purchase-disputes', pageName: 'VehiclePurchaseDisputesPage' },
  { path: '/services/neighbour-disputes', pageName: 'NeighbourDisputesPage' },
  { path: '/services/return-of-property', pageName: 'ReturnOfPropertyPage' },
  { path: '/services/breach-of-warranty', pageName: 'BreachOfWarrantyPage' },
  { path: '/services/loan-recovery', pageName: 'LoanRecoveryPage' },
  { path: '/services/tenant-damage-claims', pageName: 'TenantDamageClaimsPage' },
  { path: '/services/wrongful-dismissal-claims', pageName: 'WrongfulDismissalClaimsPage' },
  { path: '/services/professional-negligence', pageName: 'ProfessionalNegligencePage' },
  { path: '/services/defamation-slander', pageName: 'DefamationSlanderPage' },

  // Human Rights Tribunal Sub-pages
  { path: '/services/workplace-discrimination', pageName: 'WorkplaceDiscriminationPage' },
  { path: '/services/housing-discrimination', pageName: 'HousingDiscriminationPage' },
  { path: '/services/disability-accommodation', pageName: 'DisabilityAccommodationPage' },
  { path: '/services/age-discrimination', pageName: 'AgeDiscriminationPage' },
  { path: '/services/sexual-harassment', pageName: 'SexualHarassmentPage' },
  { path: '/services/reprisal-claims', pageName: 'ReprisalClaimsPage' },
  { path: '/services/service-discrimination', pageName: 'ServiceDiscriminationPage' },
  { path: '/services/pregnancy-discrimination', pageName: 'PregnancyDiscriminationPage' },

  // Employment Sub-pages
  { path: '/services/wrongful-termination', pageName: 'WrongfulTerminationPage' },
  { path: '/services/severance-pay', pageName: 'SeverancePayPage' },
  { path: '/services/unpaid-wages', pageName: 'UnpaidWagesPage' },
  { path: '/services/constructive-dismissal', pageName: 'ConstructiveDismissalPage' },

  // Criminal/POA Sub-pages
  { path: '/services/theft-under-5000', pageName: 'TheftUnderPage' },
  { path: '/services/mischief-under-5000', pageName: 'MischiefUnderPage' },
  { path: '/services/simple-assault', pageName: 'SimpleAssaultPage' },
  { path: '/services/trespass-property', pageName: 'TrespassPropertyPage' },
  { path: '/services/fail-to-comply', pageName: 'FailToComplyPage' },
  { path: '/services/peace-bond', pageName: 'PeaceBondPage' },
  { path: '/services/liquor-licence-act', pageName: 'LiquorLicenceActPage' },
  { path: '/services/municipal-bylaw', pageName: 'MunicipalBylawPage' },
  { path: '/services/regulatory-offences', pageName: 'RegulatoryOffencesPage' },
  { path: '/services/bail-hearings', pageName: 'BailHearingsPage' },

  // Other Services
  { path: '/services/notary-public', pageName: 'NotaryPublicPage' },
  { path: '/services/commissioner-of-oaths', pageName: 'CommissionerOfOathsPage' },
  { path: '/services/mediation', pageName: 'MediationServicesPage' },
  { path: '/services/social-benefits-tribunal', pageName: 'SocialBenefitsTribunalPage' },

  // Location Pages
  { path: '/london-paralegal', pageName: 'LondonParalegalPage' },
  { path: '/st-thomas-paralegal', pageName: 'StThomasParalegalPage' },
  { path: '/woodstock-paralegal', pageName: 'WoodstockParalegalPage' },
  { path: '/strathroy-chatham-paralegal', pageName: 'StrathroyChathamParalegalPage' },
  { path: '/ingersoll-paralegal', pageName: 'IngersollParalegalPage' },
  { path: '/tillsonburg-paralegal', pageName: 'TillsonburgParalegalPage' },
  { path: '/aylmer-paralegal', pageName: 'AylmerParalegalPage' },
  { path: '/locations/kitchener', pageName: 'KitchenerParalegalPage' },
  { path: '/locations/cambridge', pageName: 'CambridgeParalegalPage' },
  { path: '/locations/windsor', pageName: 'WindsorParalegalPage' },
  { path: '/locations/sarnia', pageName: 'SarniaParalegalPage' },
  { path: '/locations/chatham-kent', pageName: 'ChathamKentParalegalPage' },
  { path: '/locations/stratford', pageName: 'StratfordParalegalPage' },
  { path: '/locations/guelph', pageName: 'GuelphParalegalPage' },
  { path: '/locations/brantford', pageName: 'BrantfordParalegalPage' },
  { path: '/locations/norfolk-county', pageName: 'NorfolkCountyParalegalPage' },
  { path: '/locations/leamington', pageName: 'LeamingtonParalegalPage' },
  { path: '/locations/huron-county', pageName: 'HuronCountyParalegalPage' },

  // Educational Guide Pages
  { path: '/guides/how-to-fight-traffic-ticket', pageName: 'HowToFightTrafficTicketPage' },
  { path: '/guides/ontario-tenant-rights', pageName: 'TenantRightsGuidePage' },
  { path: '/guides/ontario-landlord-rights', pageName: 'LandlordRightsGuidePage' },
  { path: '/guides/small-claims-court-process', pageName: 'SmallClaimsCourtGuidePage' },
  { path: '/guides/paralegal-vs-lawyer', pageName: 'ParalegalVsLawyerPage' },
  { path: '/guides/what-is-a-paralegal', pageName: 'WhatIsAParalegalPage' },
  { path: '/guides/ontario-employment-rights', pageName: 'EmploymentRightsGuidePage' },
  { path: '/guides/free-legal-resources', pageName: 'FreeLegalResourcesPage' },
  { path: '/guides/what-to-do-when-sued', pageName: 'BeingSuedGuidePage' },
  { path: '/guides/ltb-hearing-preparation', pageName: 'LTBHearingGuidePage' },
  { path: '/guides/filing-human-rights-complaint', pageName: 'HumanRightsComplaintGuidePage' },
  { path: '/guides/legal-deadlines-ontario', pageName: 'LegalDeadlinesGuidePage' },

  // Legal News
  { path: '/legal-news', pageName: 'LegalNewsPage' },
  { path: '/recent-decisions', pageName: 'LegalNewsPage' },

  // Admin Pages
  { path: '/admin/bookings', pageName: 'AdminBookingsPage' },
  { path: '/admin/meeting-requests', pageName: 'AdminMeetingRequestsPage' },
  { path: '/admin/messages', pageName: 'AdminMessagesPage' },
  { path: '/admin/users', pageName: 'AdminUserManagementPage' },
  { path: '/admin/users/:id', pageName: 'AdminUserDetailPage' },
  { path: '/admin/grant', pageName: 'GrantAdminPage' },
  { path: '/admin/upload-tokens', pageName: 'UploadTokenManagementPage' },

  // Dashboard Pages
  { path: '/dashboard', pageName: 'ClientDashboardPage' },
  { path: '/dashboard/paralegal', pageName: 'ParalegalDashboardPage' },
  { path: '/dashboard/meetings', pageName: 'MeetingDashboardPage' },
  { path: '/dashboard/documents', pageName: 'DocumentWorkflowPage' },

  // Client Portal Pages
  { path: '/booking', pageName: 'BookingPage' },
  { path: '/intake', pageName: 'ClientIntakePage' },
  { path: '/meeting-request', pageName: 'MeetingRequestPage' },
  { path: '/upload/:token', pageName: 'PublicUploadPage' },
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
            {/* Render all routes dynamically */}
            {routeMap.map((route) => {
              const Component = route.component || lazyLoadPage(route.pageName!);
              return <Route key={route.path} path={route.path} element={<Component />} />;
            })}

            {/* 404 Catch-all */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </MemberProvider>
    </HashRouter>
  );
}
