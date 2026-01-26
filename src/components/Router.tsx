/**
 * Router.tsx - Optimized for Page Speed
 * 
 * Performance features:
 * - Strategic code splitting with lazy()
 * - Suspense with skeleton loading
 * - Preloading for likely navigation targets
 * - Route-based chunk naming
 */

import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, lazy, Suspense, startTransition } from 'react';
import { MemberProvider } from '@/integrations';
import ComingSoonModal from '@/components/ComingSoonModal';
import { PageSkeleton } from '@/components/LoadingSkeleton';

// Route configurations (lazy loaded by route file)
import { trafficRoutes } from '@/routes/trafficRoutes';
import { landlordTenantRoutes } from '@/routes/landlordTenantRoutes';
import { smallClaimsRoutes } from '@/routes/smallClaimsRoutes';
import { locationRoutes } from '@/routes/locationRoutes';
import { otherServiceRoutes } from '@/routes/otherServiceRoutes';
import { guideRoutes } from '@/routes/guideRoutes';
import { adminRoutes } from '@/routes/adminRoutes';
import { resourceRoutes } from '@/routes/resourceRoutes';

// ============================================
// CRITICAL PAGES - Eagerly loaded for fast FCP
// These are the most common entry points
// ============================================
import HomePage from '@/components/pages/HomePageNew';
import ContactPage from '@/components/pages/ContactPage';

// ============================================
// NON-CRITICAL PAGES - Lazy loaded
// These load on-demand when navigated to
// ============================================

// About section
const AboutPage = lazy(() => import(
  /* webpackChunkName: "about" */
  '@/components/pages/AboutPage'
));
const MeetOurTeamPage = lazy(() => import(
  /* webpackChunkName: "about" */
  '@/components/pages/MeetOurTeamPage'
));

// Services
const ServicesPage = lazy(() => import(
  /* webpackChunkName: "services" */
  '@/components/pages/ServicesPage'
));

// Auth pages (rarely needed on first load)
const ClientSignupPage = lazy(() => import(
  /* webpackChunkName: "auth" */
  '@/components/pages/ClientSignupPage'
));
const ClientLoginPage = lazy(() => import(
  /* webpackChunkName: "auth" */
  '@/components/pages/ClientLoginPage'
));
const ForgotPasswordPage = lazy(() => import(
  /* webpackChunkName: "auth" */
  '@/components/pages/ForgotPasswordPage'
));
const ResetPasswordPage = lazy(() => import(
  /* webpackChunkName: "auth" */
  '@/components/pages/ResetPasswordPage'
));

// Client dashboard (only for authenticated users)
const ClientIntakePage = lazy(() => import(
  /* webpackChunkName: "client" */
  '@/components/pages/ClientIntakePage'
));
const ClientDashboardPage = lazy(() => import(
  /* webpackChunkName: "client" */
  '@/components/pages/ClientDashboardPage'
));

// Error pages
const NotFoundPage = lazy(() => import(
  /* webpackChunkName: "error" */
  '@/components/pages/NotFoundPage'
));
const ConflictDetectedPage = lazy(() => import(
  /* webpackChunkName: "error" */
  '@/components/pages/ConflictDetectedPage'
));

// ============================================
// PRELOAD FUNCTIONS
// Call these on hover/focus for instant navigation
// ============================================

export const preloadAbout = () => {
  import('@/components/pages/AboutPage');
  import('@/components/pages/MeetOurTeamPage');
};

export const preloadServices = () => {
  import('@/components/pages/ServicesPage');
};

export const preloadAuth = () => {
  import('@/components/pages/ClientSignupPage');
  import('@/components/pages/ClientLoginPage');
};

// ============================================
// SCROLL RESTORATION
// ============================================

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Use startTransition for non-urgent scroll
    startTransition(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }, [pathname]);
  
  return null;
}

// ============================================
// PREFETCH ON HOVER
// ============================================

function usePrefetchOnHover() {
  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href]');
      
      if (link) {
        const href = link.getAttribute('href');
        
        // Prefetch based on link destination
        if (href?.startsWith('/about')) preloadAbout();
        else if (href?.startsWith('/services')) preloadServices();
        else if (href?.includes('signup') || href?.includes('login')) preloadAuth();
      }
    };

    // Use passive listener for performance
    document.addEventListener('mouseenter', handleMouseEnter, { 
      capture: true, 
      passive: true 
    });

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, { capture: true });
    };
  }, []);
}

// ============================================
// ROUTE CONFIGURATION
// ============================================

// Combine all lazy route configs
const allRoutes = [
  ...trafficRoutes,
  ...landlordTenantRoutes,
  ...smallClaimsRoutes,
  ...locationRoutes,
  ...otherServiceRoutes,
  ...guideRoutes,
  ...adminRoutes,
  ...resourceRoutes,
];

// ============================================
// MAIN ROUTER COMPONENT
// ============================================

function AppRoutes() {
  usePrefetchOnHover();

  return (
    <Routes>
      {/* Critical Pages - No Suspense wrapper needed */}
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Lazy Pages - Wrapped in individual Suspense for granular loading */}
      <Route path="/about" element={
        <Suspense fallback={<PageSkeleton />}>
          <AboutPage />
        </Suspense>
      } />
      <Route path="/about/team" element={
        <Suspense fallback={<PageSkeleton />}>
          <MeetOurTeamPage />
        </Suspense>
      } />
      <Route path="/services" element={
        <Suspense fallback={<PageSkeleton />}>
          <ServicesPage />
        </Suspense>
      } />
      <Route path="/conflict-detected" element={
        <Suspense fallback={<PageSkeleton />}>
          <ConflictDetectedPage />
        </Suspense>
      } />
      
      {/* Auth Routes */}
      <Route path="/client-signup" element={
        <Suspense fallback={<PageSkeleton />}>
          <ClientSignupPage />
        </Suspense>
      } />
      <Route path="/client-login" element={
        <Suspense fallback={<PageSkeleton />}>
          <ClientLoginPage />
        </Suspense>
      } />
      <Route path="/forgot-password" element={
        <Suspense fallback={<PageSkeleton />}>
          <ForgotPasswordPage />
        </Suspense>
      } />
      <Route path="/reset-password" element={
        <Suspense fallback={<PageSkeleton />}>
          <ResetPasswordPage />
        </Suspense>
      } />
      
      {/* Client Dashboard Routes */}
      <Route path="/client-intake" element={
        <Suspense fallback={<PageSkeleton />}>
          <ClientIntakePage />
        </Suspense>
      } />
      <Route path="/client-dashboard" element={
        <Suspense fallback={<PageSkeleton />}>
          <ClientDashboardPage />
        </Suspense>
      } />

      {/* Dynamic Routes from Config Files */}
      {allRoutes.map(({ path, element: Element }) => (
        <Route 
          key={path} 
          path={path} 
          element={
            <Suspense fallback={<PageSkeleton />}>
              <Element />
            </Suspense>
          } 
        />
      ))}

      {/* Legacy URL Redirects */}
      <Route path="/services/small-claims" element={<Navigate to="/services/small-claims-court" replace />} />
      <Route path="/services/landlord-tenant" element={<Navigate to="/services/landlord-tenant-board" replace />} />
      <Route path="/services/human-rights" element={<Navigate to="/services/human-rights-tribunal" replace />} />
      <Route path="/signup" element={<Navigate to="/client-signup" replace />} />
      <Route path="/login" element={<Navigate to="/client-login" replace />} />

      {/* 404 */}
      <Route path="*" element={
        <Suspense fallback={<PageSkeleton />}>
          <NotFoundPage />
        </Suspense>
      } />
    </Routes>
  );
}

export default function Router() {
  return (
    <BrowserRouter>
      <MemberProvider>
        <ComingSoonModal />
        <ScrollToTop />
        <AppRoutes />
      </MemberProvider>
    </BrowserRouter>
  );
}
