import { lazy } from 'react';
import { withRoleGate } from '@/lib/route-guards';

// Route-level role gates (see src/lib/route-guards.tsx).
// `gate()`      = paralegals/admins only; students bounce to /student-dashboard,
//                 clients to /client-dashboard, anonymous users to /login.
// `staffGate()` = also admits paralegal students (those pages self-scope what
//                 students can see — F-J).
// Public routes (/upload/:token, /sign/:token, /pay, /booking,
// /meeting-request) are intentionally NOT gated.
const gate = (C: any) => withRoleGate(C, 'paralegal');
const staffGate = (C: any) => withRoleGate(C, 'student-or-paralegal');

// Admin & Dashboard Pages - All lazy loaded
const ParalegalDashboardPage = lazy(() => import('@/components/pages/ParalegalDashboardPageNew'));
// F-J Paralegal student dashboard (scoped to assigned files only)
const StudentDashboardPage = lazy(() => import('@/components/pages/StudentDashboardPage'));
const StudentNewFilePage = lazy(() => import('@/components/pages/StudentNewFilePage'));
const StudentLiveChatPage = lazy(() => import('@/components/pages/StudentLiveChatPage'));
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
const LimitationCalculatorPage = lazy(() => import('@/components/pages/LimitationCalculatorPage'));
const FileRetentionPage = lazy(() => import('@/components/pages/FileRetentionPage'));
const TrustTopUpPage = lazy(() => import('@/components/pages/TrustTopUpPage'));

export const adminRoutes = [
  // Main Paralegal Dashboard
  { path: '/paralegal-dashboard', element: gate(ParalegalDashboardPage) },

  // F-J Paralegal student dashboard + supervisor's student-mgmt page
  { path: '/student-dashboard', element: staffGate(StudentDashboardPage) },
  { path: '/student/new-file', element: staffGate(StudentNewFilePage) },
  // Live chat — students + paralegals. Students see all open chats and
  // may reply; LiveChatTab logs each student send to the review queue.
  { path: '/student-chat', element: staffGate(StudentLiveChatPage) },
  { path: '/admin/students', element: gate(StudentManagementPage) },

  // Admin User Management
  { path: '/admin/users', element: gate(AdminUserManagementPage) },
  { path: '/admin/users/:userId', element: gate(AdminUserDetailPage) },
  { path: '/admin/messages', element: gate(AdminMessagesPage) },
  { path: '/admin/bookings', element: gate(AdminBookingsPage) },
  { path: '/admin/meeting-requests', element: gate(AdminMeetingRequestsPage) },
  { path: '/admin/grant-admin', element: gate(GrantAdminPage) },

  // Client File Management (LSO By-Law 7.1 Compliance).
  // staffGate (students allowed): the page scopes students to their own
  // assigned files via filterVisibleFiles / canViewFile and redacts
  // financials — a student who opens a file they aren't assigned to is
  // bounced inside the page. Paralegal-only gating here would lock a
  // student out of files she opened herself, so it must be staffGate.
  { path: '/admin/client-files', element: staffGate(ClientFileManagementPage) },
  { path: '/admin/client-files/:fileId', element: staffGate(ClientFileManagementPage) },

  // Document Management — students allowed; the page self-scopes (F-J)
  { path: '/admin/documents', element: staffGate(DocumentWorkflowPage) },
  { path: '/admin/upload-tokens', element: gate(UploadTokenManagementPage) },
  { path: '/upload/:token', element: PublicUploadPage },
  // Public e-signing — no account required, mints from sign-token-service
  { path: '/sign/:token', element: PublicSignPage },

  // Meeting/Booking Management
  { path: '/meeting-dashboard', element: gate(MeetingDashboardPage) },
  { path: '/meeting-request', element: MeetingRequestPage },
  { path: '/booking', element: BookingPage },

  // LSO Compliance — Paralegal-facing tools
  { path: '/admin/trust-accounting', element: gate(TrustAccountingPage) },
  { path: '/admin/payments', element: gate(PaymentsPage) },
  { path: '/admin/disburse-funds', element: gate(DisburseFundsPage) },
  { path: '/admin/month-end-reconciliation', element: gate(MonthEndReconciliationPage) },
  { path: '/admin/time-billing', element: gate(TimeBillingPage) },
  { path: '/admin/deadlines', element: gate(DeadlineTrackerPage) },
  { path: '/admin/tickler', element: gate(TicklerTaskPage) },
  { path: '/admin/conflict-search', element: gate(ConflictSearchPage) },
  { path: '/admin/reports', element: gate(ReportsAnalyticsPage) },
  { path: '/admin/limitation-calculator', element: gate(LimitationCalculatorPage) },
  { path: '/admin/file-retention', element: gate(FileRetentionPage) },
  { path: '/admin/trust-top-up', element: gate(TrustTopUpPage) },

  // Public-facing payment page (clients pay invoices via Square)
  { path: '/pay', element: PayPage },
];
