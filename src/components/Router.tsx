import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import AboutPage from '@/components/pages/AboutPage';
import ServicesPage from '@/components/pages/ServicesPage';
import SmallClaimsPage from '@/components/pages/SmallClaimsPage';
import LandlordTenantBoardPage from '@/components/pages/LandlordTenantBoardPage';
import HumanRightsTribunalPage from '@/components/pages/HumanRightsTribunalPage';
import TrafficTicketsPage from '@/components/pages/TrafficTicketsPage';
import BookingPage from '@/components/pages/BookingPage';

import MediationServicesPage from '@/components/pages/MediationServicesPage';
import CriminalMattersPage from '@/components/pages/CriminalMattersPage';
import BailHearingsPage from '@/components/pages/BailHearingsPage';
import NotaryPublicPage from '@/components/pages/NotaryPublicPage';
import CommissionerOfOathsPage from '@/components/pages/CommissionerOfOathsPage';
import SocialBenefitsTribunalPage from '@/components/pages/SocialBenefitsTribunalPage';
import DefamationSlanderPage from '@/components/pages/DefamationSlanderPage';
import EmploymentIssuesPage from '@/components/pages/EmploymentIssuesPage';
import ContactPage from '@/components/pages/ContactPage';
import MeetingDashboardPage from '@/components/pages/MeetingDashboardPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "services",
        element: <ServicesPage />,
      },
      {
        path: "services/small-claims",
        element: <SmallClaimsPage />,
      },
      {
        path: "services/landlord-tenant-board",
        element: <LandlordTenantBoardPage />,
      },
      {
        path: "services/human-rights-tribunal",
        element: <HumanRightsTribunalPage />,
      },
      {
        path: "services/traffic-tickets",
        element: <TrafficTicketsPage />,
      },

      {
        path: "services/mediation",
        element: <MediationServicesPage />,
      },
      {
        path: "services/criminal-matters",
        element: <CriminalMattersPage />,
      },
      {
        path: "services/bail-hearings",
        element: <BailHearingsPage />,
      },
      {
        path: "services/notary-public",
        element: <NotaryPublicPage />,
      },
      {
        path: "services/commissioner-of-oaths",
        element: <CommissionerOfOathsPage />,
      },
      {
        path: "services/social-benefits-tribunal",
        element: <SocialBenefitsTribunalPage />,
      },
      {
        path: "services/defamation-slander",
        element: <DefamationSlanderPage />,
      },
      {
        path: "services/employment-issues",
        element: <EmploymentIssuesPage />,
      },
      {
        path: "booking",
        element: <BookingPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "dashboard",
        element: <MeetingDashboardPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
