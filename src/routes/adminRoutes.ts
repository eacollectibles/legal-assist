import { lazy } from 'react';

// Admin & Dashboard Pages - All lazy loaded
const ParalegalDashboardPage = lazy(() => import('@/components/pages/ParalegalDashboardPageNew'));
const AdminUserManagementPage = lazy(() => import('@/components/pages/AdminUserManagementPage'));
const AdminUserDetailPage = lazy(() => import('@/components/pages/AdminUserDetailPage'));
const AdminMessagesPage = lazy(() => import('@/components/pages/AdminMessagesPage'));
const AdminBookingsPage = lazy(() => import('@/components/pages/AdminBookingsPage'));
const AdminMeetingRequestsPage = lazy(() => import('@/components/pages/AdminMeetingRequestsPage'));
const GrantAdminPage = lazy(() => import('@/components/pages/GrantAdminPage'));
const DocumentWorkflowPage = lazy(() => import('@/components/pages/DocumentWorkflowPage'));
const UploadTokenManagementPage = lazy(() => import('@/components/pages/UploadTokenManagementPage'));
const PublicUploadPage = lazy(() => import('@/components/pages/PublicUploadPage'));
const MeetingDashboardPage = lazy(() => import('@/components/pages/MeetingDashboardPage'));
const MeetingRequestPage = lazy(() => import('@/components/pages/MeetingRequestPage'));
const BookingPage = lazy(() => import('@/components/pages/BookingPage'));

export const adminRoutes = [
  // Main Paralegal Dashboard
  { path: '/paralegal-dashboard', element: ParalegalDashboardPage },
  
  // Admin User Management
  { path: '/admin/users', element: AdminUserManagementPage },
  { path: '/admin/users/:userId', element: AdminUserDetailPage },
  { path: '/admin/messages', element: AdminMessagesPage },
  { path: '/admin/bookings', element: AdminBookingsPage },
  { path: '/admin/meeting-requests', element: AdminMeetingRequestsPage },
  { path: '/admin/grant-admin', element: GrantAdminPage },
  
  // Document Management
  { path: '/admin/documents', element: DocumentWorkflowPage },
  { path: '/admin/upload-tokens', element: UploadTokenManagementPage },
  { path: '/upload/:token', element: PublicUploadPage },
  
  // Meeting/Booking Management
  { path: '/meeting-dashboard', element: MeetingDashboardPage },
  { path: '/meeting-request', element: MeetingRequestPage },
  { path: '/booking', element: BookingPage },
];
