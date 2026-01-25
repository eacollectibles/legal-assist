import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { MemberProvider } from '@/integrations';
import ComingSoonModal from '@/components/ComingSoonModal';

// Route configurations
import { trafficRoutes } from '@/routes/trafficRoutes';
import { landlordTenantRoutes } from '@/routes/landlordTenantRoutes';
import { smallClaimsRoutes } from '@/routes/smallClaimsRoutes';
import { locationRoutes } from '@/routes/locationRoutes';
import { otherServiceRoutes } from '@/routes/otherServiceRoutes';
import { guideRoutes } from '@/routes/guideRoutes';
import { adminRoutes } from '@/routes/adminRoutes';

// Core Pages - Static imports for critical pages
import HomePage from '@/components/pages/HomePageNew';
import ContactPage from '@/components/pages/ContactPage';
import ConflictDetectedPage from '@/components/pages/ConflictDetectedPage';

// Lazy load other core pages
const AboutPage = lazy(() => import('@/components/pages/AboutPage'));
const MeetOurTeamPage = lazy(() => import('@/components/pages/MeetOurTeamPage'));
const ServicesPage = lazy(() => import('@/components/pages/ServicesPage'));
const ClientSignupPage = lazy(() => import('@/components/pages/ClientSignupPage'));
const ClientLoginPage = lazy(() => import('@/components/pages/ClientLoginPage'));
const ForgotPasswordPage = lazy(() => import('@/components/pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('@/components/pages/ResetPasswordPage'));
const ClientIntakePage = lazy(() => import('@/components/pages/ClientIntakePage'));
const ClientDashboardPage = lazy(() => import('@/components/pages/ClientDashboardPage'));
const NotFoundPage = lazy(() => import('@/components/pages/NotFoundPage'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Combine all route configs
const allRoutes = [
  ...trafficRoutes,
  ...landlordTenantRoutes,
  ...smallClaimsRoutes,
  ...locationRoutes,
  ...otherServiceRoutes,
  ...guideRoutes,
  ...adminRoutes,
];

export default function Router() {
  return (
    <BrowserRouter>
      <MemberProvider>
        <ComingSoonModal />
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="text-foreground">Loading...</div></div>}>
          <Routes>
            {/* Core Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/conflict-detected" element={<ConflictDetectedPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/team" element={<MeetOurTeamPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/client-signup" element={<ClientSignupPage />} />
            <Route path="/client-login" element={<ClientLoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/client-intake" element={<ClientIntakePage />} />
            <Route path="/client-dashboard" element={<ClientDashboardPage />} />

            {/* Dynamic Routes from Config Files */}
            {allRoutes.map(({ path, element: Element }) => (
              <Route key={path} path={path} element={<Element />} />
            ))}

            {/* Legacy URL Redirects */}
            <Route path="/services/small-claims" element={<Navigate to="/services/small-claims-court" replace />} />
            <Route path="/services/landlord-tenant" element={<Navigate to="/services/landlord-tenant-board" replace />} />
            <Route path="/services/human-rights" element={<Navigate to="/services/human-rights-tribunal" replace />} />
            <Route path="/signup" element={<Navigate to="/client-signup" replace />} />
            <Route path="/login" element={<Navigate to="/client-login" replace />} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </MemberProvider>
    </BrowserRouter>
  );
}
