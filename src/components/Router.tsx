import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { MemberProvider } from '@/integrations';
import { AutoSEO } from '@/components/AutoSEO';

// Static imports for critical pages
import HomePage from '@/components/pages/HomePage';
import ContactPage from '@/components/pages/ContactPage';

// Loading component
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}

// Scroll to top
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Simple dynamic loader with relative path
const pageCache = new Map();

function lazyLoadPage(pageName: string) {
  if (!pageCache.has(pageName)) {
    pageCache.set(
      pageName,
      lazy(() => import(`./pages/${pageName}.tsx`))
    );
  }
  return pageCache.get(pageName);
}

// Route definitions
const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/about', page: 'AboutPage' },
  { path: '/services', page: 'ServicesPage' },
  { path: '/signup', page: 'ClientSignupPage' },
  { path: '/login', page: 'ClientLoginPage' },
  { path: '/services/small-claims', page: 'SmallClaimsPage' },
  { path: '/services/landlord-tenant', page: 'LandlordTenantBoardPage' },
  { path: '/services/traffic-tickets', page: 'TrafficTicketsPage' },
  { path: '/services/human-rights', page: 'HumanRightsTribunalPage' },
  { path: '/services/employment-issues', page: 'EmploymentIssuesPage' },
  { path: '/services/criminal-matters', page: 'CriminalMattersPage' },
  { path: '/services/provincial-offences', page: 'ProvincialOffencesPage' },
  { path: '/services/speeding-ticket-defence', page: 'SpeedingTicketDefencePage' },
  { path: '/services/careless-driving-defence', page: 'CarelessDrivingDefencePage' },
  { path: '/services/stunt-driving-defence', page: 'StuntDrivingDefencePage' },
  { path: '/services/distracted-driving', page: 'DistractedDrivingDefencePage' },
  { path: '/services/red-light-tickets', page: 'RedLightDefencePage' },
  { path: '/services/no-insurance-defence', page: 'NoInsuranceDefencePage' },
  { path: '/services/demerit-points-guide', page: 'DemeritPointsGuidePage' },
  { path: '/services/g1-g2-violations', page: 'G1G2ViolationsPage' },
  { path: '/services/commercial-vehicle-violations', page: 'CommercialVehicleViolationsPage' },
  { path: '/services/hov-lane-violations', page: 'HOVLaneViolationsPage' },
  { path: '/services/stop-sign-ticket', page: 'StopSignTicketPage' },
  { path: '/services/street-racing', page: 'StreetRacingPage' },
  { path: '/services/fail-to-yield', page: 'FailToYieldPage' },
  { path: '/services/unsafe-lane-change', page: 'UnsafeLaneChangePage' },
  { path: '/services/following-too-closely', page: 'FollowingTooCloselyPage' },
  { path: '/services/driving-while-suspended', page: 'DrivingWhileSuspendedPage' },
  { path: '/services/school-zone-speeding', page: 'SchoolZoneSpeedingPage' },
  { path: '/services/seatbelt-violations', page: 'SeatbeltViolationsPage' },
  { path: '/services/landlord-services', page: 'LandlordServicesPage' },
  { path: '/services/tenant-services', page: 'TenantServicesPage' },
  { path: '/services/eviction-non-payment', page: 'EvictionNonPaymentPage' },
  { path: '/services/n12-personal-use-eviction', page: 'N12PersonalUsePage' },
  { path: '/services/n13-renovation-eviction', page: 'N13RenovationEvictionPage' },
  { path: '/services/above-guideline-increase', page: 'AboveGuidelineIncreasePage' },
  { path: '/services/maintenance-repairs', page: 'MaintenanceRepairsPage' },
  { path: '/services/bad-faith-eviction', page: 'BadFaithEvictionPage' },
  { path: '/services/rent-increase-guide', page: 'RentIncreaseGuidePage' },
  { path: '/services/illegal-lockout', page: 'IllegalLockoutPage' },
  { path: '/services/landlord-harassment', page: 'HarassmentByLandlordPage' },
  { path: '/services/rent-arrears-defence', page: 'RentArrearsDefencePage' },
  { path: '/services/subsidized-housing-eviction', page: 'SubsidizedHousingPage' },
  { path: '/services/roommate-disputes', page: 'RoommateDisputesPage' },
  { path: '/services/breaking-lease-early', page: 'LeaseBreakingPage' },
  { path: '/services/pet-disputes', page: 'PetDisputesPage' },
  { path: '/services/noise-complaints-defence', page: 'NoiseComplaintsPage' },
  { path: '/services/ltb-hearing-preparation', page: 'LTBHearingPrepPage' },
  { path: '/services/rent-reduction-applications', page: 'RentReductionPage' },
  { path: '/services/mobile-home-park-disputes', page: 'MobileHomeParkPage' },
  { path: '/services/superintendent-housing-rights', page: 'SuperintendentIssuesPage' },
  { path: '/services/small-claims-process', page: 'SmallClaimsProcessPage' },
  { path: '/services/debt-collection', page: 'DebtCollectionPage' },
  { path: '/services/contract-disputes', page: 'ContractDisputesPage' },
  { path: '/services/judgement-enforcement', page: 'JudgementEnforcementPage' },
  { path: '/services/property-damage-claims', page: 'PropertyDamageClaimsPage' },
  { path: '/services/unpaid-invoices', page: 'UnpaidInvoicesPage' },
  { path: '/services/security-deposits', page: 'SecurityDepositsPage' },
  { path: '/services/consumer-disputes', page: 'ConsumerDisputesPage' },
  { path: '/services/personal-injury-claims', page: 'PersonalInjuryClaimsPage' },
  { path: '/services/home-improvement-disputes', page: 'HomeImprovementDisputesPage' },
  { path: '/services/vehicle-purchase-disputes', page: 'VehiclePurchaseDisputesPage' },
  { path: '/services/neighbour-disputes', page: 'NeighbourDisputesPage' },
  { path: '/services/return-of-property', page: 'ReturnOfPropertyPage' },
  { path: '/services/breach-of-warranty', page: 'BreachOfWarrantyPage' },
  { path: '/services/loan-recovery', page: 'LoanRecoveryPage' },
  { path: '/services/tenant-damage-claims', page: 'TenantDamageClaimsPage' },
  { path: '/services/wrongful-dismissal-claims', page: 'WrongfulDismissalClaimsPage' },
  { path: '/services/professional-negligence', page: 'ProfessionalNegligencePage' },
  { path: '/services/defamation-slander', page: 'DefamationSlanderPage' },
  { path: '/services/workplace-discrimination', page: 'WorkplaceDiscriminationPage' },
  { path: '/services/housing-discrimination', page: 'HousingDiscriminationPage' },
  { path: '/services/disability-accommodation', page: 'DisabilityAccommodationPage' },
  { path: '/services/age-discrimination', page: 'AgeDiscriminationPage' },
  { path: '/services/sexual-harassment', page: 'SexualHarassmentPage' },
  { path: '/services/reprisal-claims', page: 'ReprisalClaimsPage' },
  { path: '/services/service-discrimination', page: 'ServiceDiscriminationPage' },
  { path: '/services/pregnancy-discrimination', page: 'PregnancyDiscriminationPage' },
  { path: '/services/wrongful-termination', page: 'WrongfulTerminationPage' },
  { path: '/services/severance-pay', page: 'SeverancePayPage' },
  { path: '/services/unpaid-wages', page: 'UnpaidWagesPage' },
  { path: '/services/constructive-dismissal', page: 'ConstructiveDismissalPage' },
  { path: '/services/theft-under-5000', page: 'TheftUnderPage' },
  { path: '/services/mischief-under-5000', page: 'MischiefUnderPage' },
  { path: '/services/simple-assault', page: 'SimpleAssaultPage' },
  { path: '/services/trespass-property', page: 'TrespassPropertyPage' },
  { path: '/services/fail-to-comply', page: 'FailToComplyPage' },
  { path: '/services/peace-bond', page: 'PeaceBondPage' },
  { path: '/services/liquor-licence-act', page: 'LiquorLicenceActPage' },
  { path: '/services/municipal-bylaw', page: 'MunicipalBylawPage' },
  { path: '/services/regulatory-offences', page: 'RegulatoryOffencesPage' },
  { path: '/services/bail-hearings', page: 'BailHearingsPage' },
  { path: '/services/notary-public', page: 'NotaryPublicPage' },
  { path: '/services/commissioner-of-oaths', page: 'CommissionerOfOathsPage' },
  { path: '/services/mediation', page: 'MediationServicesPage' },
  { path: '/services/social-benefits-tribunal', page: 'SocialBenefitsTribunalPage' },
  { path: '/london-paralegal', page: 'LondonParalegalPage' },
  { path: '/st-thomas-paralegal', page: 'StThomasParalegalPage' },
  { path: '/woodstock-paralegal', page: 'WoodstockParalegalPage' },
  { path: '/strathroy-chatham-paralegal', page: 'StrathroyChathamParalegalPage' },
  { path: '/ingersoll-paralegal', page: 'IngersollParalegalPage' },
  { path: '/tillsonburg-paralegal', page: 'TillsonburgParalegalPage' },
  { path: '/aylmer-paralegal', page: 'AylmerParalegalPage' },
  { path: '/locations/kitchener', page: 'KitchenerParalegalPage' },
  { path: '/locations/cambridge', page: 'CambridgeParalegalPage' },
  { path: '/locations/windsor', page: 'WindsorParalegalPage' },
  { path: '/locations/sarnia', page: 'SarniaParalegalPage' },
  { path: '/locations/chatham-kent', page: 'ChathamKentParalegalPage' },
  { path: '/locations/stratford', page: 'StratfordParalegalPage' },
  { path: '/locations/guelph', page: 'GuelphParalegalPage' },
  { path: '/locations/brantford', page: 'BrantfordParalegalPage' },
  { path: '/locations/norfolk-county', page: 'NorfolkCountyParalegalPage' },
  { path: '/locations/leamington', page: 'LeamingtonParalegalPage' },
  { path: '/locations/huron-county', page: 'HuronCountyParalegalPage' },
  { path: '/guides/how-to-fight-traffic-ticket', page: 'HowToFightTrafficTicketPage' },
  { path: '/guides/ontario-tenant-rights', page: 'TenantRightsGuidePage' },
  { path: '/guides/ontario-landlord-rights', page: 'LandlordRightsGuidePage' },
  { path: '/guides/small-claims-court-process', page: 'SmallClaimsCourtGuidePage' },
  { path: '/guides/paralegal-vs-lawyer', page: 'ParalegalVsLawyerPage' },
  { path: '/guides/what-is-a-paralegal', page: 'WhatIsAParalegalPage' },
  { path: '/guides/ontario-employment-rights', page: 'EmploymentRightsGuidePage' },
  { path: '/guides/free-legal-resources', page: 'FreeLegalResourcesPage' },
  { path: '/guides/what-to-do-when-sued', page: 'BeingSuedGuidePage' },
  { path: '/guides/ltb-hearing-preparation', page: 'LTBHearingGuidePage' },
  { path: '/guides/filing-human-rights-complaint', page: 'HumanRightsComplaintGuidePage' },
  { path: '/guides/legal-deadlines-ontario', page: 'LegalDeadlinesGuidePage' },
  { path: '/legal-news', page: 'LegalNewsPage' },
  { path: '/recent-decisions', page: 'LegalNewsPage' },
  { path: '/admin/bookings', page: 'AdminBookingsPage' },
  { path: '/admin/meeting-requests', page: 'AdminMeetingRequestsPage' },
  { path: '/admin/messages', page: 'AdminMessagesPage' },
  { path: '/admin/users', page: 'AdminUserManagementPage' },
  { path: '/admin/users/:id', page: 'AdminUserDetailPage' },
  { path: '/admin/grant', page: 'GrantAdminPage' },
  { path: '/admin/upload-tokens', page: 'UploadTokenManagementPage' },
  { path: '/dashboard', page: 'ClientDashboardPage' },
  { path: '/dashboard/paralegal', page: 'ParalegalDashboardPage' },
  { path: '/dashboard/meetings', page: 'MeetingDashboardPage' },
  { path: '/dashboard/documents', page: 'DocumentWorkflowPage' },
  { path: '/booking', page: 'BookingPage' },
  { path: '/intake', page: 'ClientIntakePage' },
  { path: '/meeting-request', page: 'MeetingRequestPage' },
  { path: '/upload/:token', page: 'PublicUploadPage' },
];

export default function Router() {
  useEffect(() => {
    document.documentElement.classList.add('hydrated');
    document.body.classList.add('hydrated');
  }, []);

  return (
    <HashRouter>
      <MemberProvider>
        <ScrollToTop />
        <AutoSEO />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {routes.map((route) => {
              if (route.element) {
                return <Route key={route.path} path={route.path} element={route.element} />;
              }
              const PageComponent = lazyLoadPage(route.page!);
              return <Route key={route.path} path={route.path} element={<PageComponent />} />;
            })}
            <Route path="*" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Page Not Found</h1></div>} />
          </Routes>
        </Suspense>
      </MemberProvider>
    </HashRouter>
  );
}
