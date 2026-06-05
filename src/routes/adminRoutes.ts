import { lazy } from 'react';

// Admin & Dashboard Pages - All lazy loaded
const ParalegalDashboardPage = lazy(() => import('@/components/pages/ParalegalDashboardPageNew'));
// F-J Paralegal student dashboard (scoped to assigned files only)
const StudentDashboardPage = lazy(() => import('@/components/pages/StudentDashboardPage'));
const StudentNewFilePage = lazy(() => import('@/components/pages/StudentNewFilePage'));
const StudentManagementPage = lazy(() => import('@/components/pages/StudentManagementPage'));
const AdminUserManagementPage = lazy(() => import('@/components/pages/AdminUserManagementPage'));
const AdminUserDetailPage = lazy(() => import('@/components/pages/AdminUserDetailPage'));
const AdminMessagesPage = lazy(() => import('@/components/pages/AdminMessagesPage'));
const AdminBookingsPage = lazy(() => import('@/components/pages/AdminBookingsPage'));
const AdminMeetingRequestsPage = lazy(() => import('@/components/pages/AdminMeetingRequestsPage'));
const GrantAdminPage = lazy(() => import('@/components/pages/GrantAdminPage'));
const DocumentWorkflowPage = lazy(() => import('@/components/pages/DocumentWorkflowPage'));
const UploadTokenManagementPage = lazy(() => import('@/components/pages/UploadTokenManagementPage'));
const PublicUploadPage = lazy(() => import('@/components/pages/PublicUploadPage'));
const PublicSignPage = lazy(() => import('@/components/pages/PublicSignPage'));
const MeetingDashboardPage = lazy(() => import('@/components/pages/MeetingDashboardPage'));
const MeetingRequestPage = lazy(() => import('@/components/pages/MeetingRequestPage'));
const BookingPage = lazy(() => import('@/components/pages/BookingPage'));
const ClientFileManagementPage = lazy(() => import('@/components/pages/ClientFileManagementPage'));

// LSO compliance + paralegal-facing tools (sidebar links)
const TrustAccountingPage = lazy(() => import('@/components/pages/TrustAccountingPage'));
const PaymentsPage = lazy(() => import('@/components/pages/PaymentsPage'));
const DisburseFundsPage = lazy(() => import('@/components/pages/DisburseFundsPage'));
const MonthEndReconciliationPage = lazy(() => import('@/components/pages/MonthEndReconciliationPage'));
const TimeBillingPage = lazy(() => import('@/components/pages/TimeBillingPage'));
const DeadlineTrackerPage = lazy(() => import('@/components/pages/DeadlineTrackerPage'));
const TicklerTaskPage = lazy(() => import('@/components/pages/TicklerTaskPage'));
const ConflictSearchPage = lazy(() => import('@/components/pages/ConflictSearchPage'));
const ReportsAnalyticsPage = lazy(() => import('@/components/pages/ReportsAnalyticsPage'));
const PayPage = lazy(() => import('@/components/pages/PayPage'));

export const adminRoutes = [
  // Main Paralegal Dashboard
  { path: '/paralegal-dashboard', element: ParalegalDashboardPage },

  // F-J Paralegal student dashboard + supervisor's student-mgmt page
  { path: '/student-dashboard', element: StudentDashboardPage },
  { path: '/student/new-file', element: StudentNewFilePage },
  { path: '/admin/students', element: StudentManagementPage },

  // Admin User Management
  { path: '/admin/users', element: AdminUserManagementPage },
  { path: '/admin/users/:userId', element: AdminUserDetailPage },
  { path: '/admin/messages', element: AdminMessagesPage },
  { path: '/admin/bookings', element: AdminBookingsPage },
  { path: '/admin/meeting-requests', element: AdminMeetingRequestsPage },
  { path: '/admin/grant-admin', element: GrantAdminPage },
  
  // Client File Management (LSO By-Law 7.1 Compliance)
  { path: '/admin/client-files', element: ClientFileManagementPage },
  { path: '/admin/client-files/:fileId', element: ClientFileManagementPage },

  // Document Management
  { path: '/admin/documents', element: DocumentWorkflowPage },
  { path: '/admin/upload-tokens', element: UploadTokenManagementPage },
  { path: '/upload/:token', element: PublicUploadPage },
  // Public e-signing — no account required, mints from sign-token-service
  { path: '/sign/:token', element: PublicSignPage },
  
  // Meeting/Booking Management
  { path: '/meeting-dashboard', element: MeetingDashboardPage },
  { path: '/meeting-request', element: MeetingRequestPage },
  { path: '/booking', element: BookingPage },

  // LSO Compliance — Paralegal-facing tools
  { path: '/admin/trust-accounting', element: TrustAccountingPage },
  { path: '/admin/payments', element: PaymentsPage },
  { path: '/admin/disburse-funds', element: DisburseFundsPage },
  { path: '/admin/month-end-reconciliation', element: MonthEndReconciliationPage },
  { path: '/admin/time-billing', element: TimeBillingPage },
  { path: '/admin/deadlines', element: DeadlineTrackerPage },
  { path: '/admin/tickler', element: TicklerTaskPage },
  { path: '/admin/conflict-search', element: ConflictSearchPage },
  { path: '/admin/reports', element: ReportsAnalyticsPage },

  // Public-facing payment page (clients pay invoices via Square)
  { path: '/pay', element: PayPage },
];
