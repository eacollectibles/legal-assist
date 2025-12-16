import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import ServicesPage from '@/components/pages/ServicesPage';
import SmallClaimsPage from '@/components/pages/SmallClaimsPage';
import LandlordTenantBoardPage from '@/components/pages/LandlordTenantBoardPage';
import HumanRightsTribunalPage from '@/components/pages/HumanRightsTribunalPage';
import TrafficTicketsPage from '@/components/pages/TrafficTicketsPage';
import BookingPage from '@/components/pages/BookingPage';

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
        path: "booking",
        element: <BookingPage />,
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
