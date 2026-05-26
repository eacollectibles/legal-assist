/**
 * Unified Paralegal Dashboard
 *
 * Single interface consolidating ALL paralegal features:
 * - Overview (stats, pending items, quick actions)
 * - Appointments & Deadlines
 * - Client Assignments & Intake
 * - Client Messages
 * - Document Signatures
 * - File Management (uploaded + generated docs)
 * - Client Files (LSO By-Law 7.1 Compliance)
 * - Document Workflow (templates, generation, signing)
 * - Meetings & Bookings
 * - Upload Tokens
 * - Settings
 */
import { useState, useEffect, useMemo } from 'react';
// useNavigate removed — using window.location for external module navigation
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  LayoutDashboard, CalendarDays, Users, MessageSquare,
  FileSignature, FolderOpen, Scale, FileText, Video,
  Link2, Settings, ChevronLeft, ChevronRight, Search,
  Bell, Phone, Menu, X, LogOut, Clock, AlertTriangle,
  CheckCircle, TrendingUp, Briefcase, Shield, ExternalLink,
  DollarSign, CreditCard, BarChart3, ArrowUpRight, ShieldCheck,
} from 'lucide-react';
import { ParalegalDashboardProvider, useParalegalDashboard } from './paralegal-dashboard/ParalegalDashboardContext';
import { BaseCrudService } from '@/integrations';
import { PHONE_DISPLAY, PHONE_HREF, EMAIL_PRIMARY } from '@/lib/contact';

// Recognise both the legacy placeholder admin email and the firm's
// real address as "admin/firm" mail.
const LEGACY_ADMIN_EMAIL = 'admin@legalservices.com';
const isAdminSender = (email: string | undefined | null): boolean => {
  if (!email) return false;
  const e = email.toLowerCase();
  return e === LEGACY_ADMIN_EMAIL || e === EMAIL_PRIMARY.toLowerCase();
};

// ============================================================
// Direct imports for dashboard tabs
// ============================================================
import AppointmentsTab from './paralegal-dashboard/AppointmentsTab';
import AssignmentsTab from './paralegal-dashboard/AssignmentsTab';
import SignaturesTab from './paralegal-dashboard/SignaturesTab';
import MessagesTab from './paralegal-dashboard/MessagesTab';
import FileManagementTab from './paralegal-dashboard/FileManagementTab';
import SettingsTab from './paralegal-dashboard/SettingsTab';

// Large standalone pages are NOT imported here.
// They have their own routes and React Router lazy-loads them.
// The sidebar navigates to their routes instead of embedding them.
const EXTERNAL_MODULES: Record<string, string> = {
  clientfiles: '/admin/client-files',
  trustaccounting: '/admin/trust-accounting',
  payments: '/admin/payments',
  disbursefunds: '/admin/disburse-funds',
  monthendreconciliation: '/admin/month-end-reconciliation',
  timebilling: '/admin/time-billing',
  deadlines: '/admin/deadlines',
  tickler: '/admin/tickler',
  conflictsearch: '/admin/conflict-search',
  docworkflow: '/admin/documents',
  meetings: '/meeting-dashboard',
  uploadtokens: '/admin/upload-tokens',
  reports: '/admin/reports',
};

// ============================================================
// SIDEBAR NAV CONFIGURATION
// ============================================================
interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
  section?: string;
}

const NAV_SECTIONS = [
  { id: 'main', label: 'Main' },
  { id: 'clients', label: 'Clients' },
  { id: 'compliance', label: 'LSO Compliance' },
  { id: 'documents', label: 'Documents' },
  { id: 'admin', label: 'Administration' },
];

// ============================================================
// OVERVIEW MODULE
// ============================================================
function OverviewModule() {
  const {
    appointments, fileAssignments, conversations, clients,
    documents, generatedDocuments, messages, currentParalegalId,
  } = useParalegalDashboard();

  const [pendingBookings, setPendingBookings] = useState(0);

  useEffect(() => {
    BaseCrudService.getAll<any>('bookings')
      .then(res => {
        const pending = (res.items || []).filter((b: any) => b.status === 'pending').length;
        setPendingBookings(pending);
      })
      .catch(() => {});
  }, []);

  // Derive stats
  const assignedClientIds = fileAssignments
    .filter(a => a.paralegalId === currentParalegalId)
    .map(a => a.clientId);

  const activeFiles = fileAssignments.filter(
    a => a.paralegalId === currentParalegalId && a.fileStatus === 'active'
  ).length;

  const unreadCount = conversations.reduce((t, c) => t + c.unreadCount, 0);

  const pendingSignatures = generatedDocuments.filter(
    d => d.requiresSignature && d.status !== 'Signed'
  ).length;

  const upcomingAppointments = appointments.filter(a => {
    if (!a.eventDate) return false;
    const d = new Date(a.eventDate);
    const now = new Date();
    return d >= now && a.status !== 'Cancelled';
  }).length;

  const urgentItems = appointments.filter(
    a => a.priority === 'Urgent' && a.status === 'Pending'
  ).length;

  const stats = [
    { label: 'Active Files', value: activeFiles, icon: Briefcase, color: 'text-blue-600 bg-blue-50' },
    { label: 'Upcoming Appointments', value: upcomingAppointments, icon: CalendarDays, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Unread Messages', value: unreadCount, icon: MessageSquare, color: 'text-violet-600 bg-violet-50' },
    { label: 'Pending Signatures', value: pendingSignatures, icon: FileSignature, color: 'text-amber-600 bg-amber-50' },
    { label: 'Pending Bookings', value: pendingBookings, icon: Video, color: 'text-rose-600 bg-rose-50' },
    { label: 'Urgent Items', value: urgentItems, icon: AlertTriangle, color: 'text-red-600 bg-red-50' },
  ];

  // Recent activity from messages
  const recentMessages = [...messages]
    .sort((a, b) => new Date(b.sentDate || 0).getTime() - new Date(a.sentDate || 0).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Welcome back
        </h1>
        <p className="font-paragraph text-foreground/60 mt-1">
          Here's what needs your attention today
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-foreground/50 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Two-column layout: Recent + Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-primary" />
              Upcoming Appointments
            </h2>
          </div>
          <div className="space-y-3">
            {appointments
              .filter(a => {
                if (!a.eventDate) return false;
                return new Date(a.eventDate) >= new Date() && a.status !== 'Cancelled';
              })
              .sort((a, b) => new Date(a.eventDate || 0).getTime() - new Date(b.eventDate || 0).getTime())
              .slice(0, 5)
              .map(apt => (
                <div key={apt._id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    apt.priority === 'Urgent' ? 'bg-red-500' :
                    apt.priority === 'High' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{apt.title}</p>
                    <p className="text-xs text-foreground/50">
                      {apt.eventDate ? new Date(apt.eventDate).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' }) : ''}
                      {apt.eventTime ? ` at ${apt.eventTime}` : ''}
                    </p>
                  </div>
                  {apt.priority === 'Urgent' && (
                    <Badge className="bg-red-100 text-red-700 text-xs">Urgent</Badge>
                  )}
                </div>
              ))}
            {appointments.filter(a => a.eventDate && new Date(a.eventDate) >= new Date() && a.status !== 'Cancelled').length === 0 && (
              <p className="text-sm text-foreground/40 text-center py-4">No upcoming appointments</p>
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Recent Messages
            </h2>
            {unreadCount > 0 && (
              <Badge className="bg-destructive text-white">{unreadCount} unread</Badge>
            )}
          </div>
          <div className="space-y-3">
            {recentMessages.map(msg => (
              <div key={msg._id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isAdminSender(msg.senderEmail)
                    ? 'bg-primary/10 text-primary'
                    : 'bg-violet-100 text-violet-600'
                }`}>
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {msg.senderName || msg.senderEmail}
                  </p>
                  <p className="text-xs text-foreground/60 truncate">{msg.messageContent}</p>
                  <p className="text-xs text-foreground/40 mt-1">
                    {msg.sentDate ? new Date(msg.sentDate).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : ''}
                  </p>
                </div>
                {!msg.isRead && !isAdminSender(msg.senderEmail) && (
                  <div className="w-2 h-2 rounded-full bg-destructive flex-shrink-0 mt-2" />
                )}
              </div>
            ))}
            {recentMessages.length === 0 && (
              <p className="text-sm text-foreground/40 text-center py-4">No recent messages</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN DASHBOARD SHELL
// ============================================================
function DashboardShell() {
  const { conversations, generatedDocuments, appointments } = useParalegalDashboard();

  const [activeModule, setActiveModule] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Badges
  const unreadCount = conversations.reduce((t, c) => t + c.unreadCount, 0);
  const pendingSignatures = generatedDocuments.filter(
    d => d.requiresSignature && d.status !== 'Signed'
  ).length;
  const urgentCount = appointments.filter(
    a => a.priority === 'Urgent' && a.status === 'Pending'
  ).length;

  const navItems: NavItem[] = useMemo(() => [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, section: 'main' },
    { id: 'appointments', label: 'Appointments', icon: CalendarDays, badge: urgentCount || undefined, section: 'main' },
    { id: 'assignments', label: 'Assignments', icon: Users, section: 'clients' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadCount || undefined, section: 'clients' },
    { id: 'clientfiles', label: 'Client Files', icon: Scale, section: 'compliance' },
    { id: 'trustaccounting', label: 'Trust Accounting', icon: DollarSign, section: 'compliance' },
    { id: 'payments', label: 'Payments', icon: CreditCard, section: 'compliance' },
    { id: 'disbursefunds', label: 'Disburse Funds', icon: ArrowUpRight, section: 'compliance' },
    { id: 'monthendreconciliation', label: 'Month-End Reconciliation', icon: ShieldCheck, section: 'compliance' },
    { id: 'timebilling', label: 'Time & Billing', icon: Clock, section: 'compliance' },
    { id: 'deadlines', label: 'Deadlines', icon: AlertTriangle, section: 'compliance' },
    { id: 'tickler', label: 'Tasks / Tickler', icon: CheckCircle, section: 'compliance' },
    { id: 'conflictsearch', label: 'Conflict Search', icon: Search, section: 'compliance' },
    { id: 'signatures', label: 'Signatures', icon: FileSignature, badge: pendingSignatures || undefined, section: 'documents' },
    { id: 'filemanagement', label: 'File Management', icon: FolderOpen, section: 'documents' },
    { id: 'docworkflow', label: 'Document Workflow', icon: FileText, section: 'documents' },
    { id: 'reports', label: 'Reports', icon: BarChart3, section: 'admin' },
    { id: 'meetings', label: 'Meetings', icon: Video, section: 'admin' },
    { id: 'uploadtokens', label: 'Upload Links', icon: Link2, section: 'admin' },
    { id: 'settings', label: 'Settings', icon: Settings, section: 'admin' },
  ], [unreadCount, pendingSignatures, urgentCount]);

  // Search/filter nav items
  const filteredNavItems = searchQuery
    ? navItems.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : navItems;

  const handleNavClick = (id: string) => {
    // If it's an external module, navigate to its standalone route
    if (EXTERNAL_MODULES[id]) {
      window.location.href = EXTERNAL_MODULES[id];
      return;
    }
    setActiveModule(id);
    setMobileMenuOpen(false);
  };

  // Keyboard shortcut: Cmd/Ctrl + K for search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('dashboard-search')?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Render active module
  const renderModule = () => {
    switch (activeModule) {
      case 'overview':
        return <OverviewModule />;
      case 'appointments':
        return <AppointmentsTab />;
      case 'assignments':
        return <AssignmentsTab />;
      case 'messages':
        return <MessagesTab />;
      case 'signatures':
        return <SignaturesTab />;
      case 'filemanagement':
        return <FileManagementTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewModule />;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* ========== MOBILE OVERLAY ========== */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ========== SIDEBAR ========== */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 flex flex-col
          bg-secondary text-white transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? 'w-[72px]' : 'w-64'}
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo / Brand */}
        <div className={`flex items-center h-16 px-4 border-b border-white/10 ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          {!sidebarCollapsed && (
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">Legal Assist</p>
              <p className="text-[10px] text-white/50 uppercase tracking-wider">Paralegal Hub</p>
            </div>
          )}
        </div>

        {/* Search */}
        {!sidebarCollapsed && (
          <div className="px-3 py-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
              <Input
                id="dashboard-search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search... ⌘K"
                className="pl-8 h-8 text-xs bg-white/10 border-white/10 text-white placeholder:text-white/30 focus:bg-white/15 focus:border-white/20"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {NAV_SECTIONS.map(section => {
            const sectionItems = filteredNavItems.filter(i => i.section === section.id);
            if (sectionItems.length === 0) return null;
            return (
              <div key={section.id}>
                {!sidebarCollapsed && (
                  <p className="text-[10px] uppercase tracking-wider text-white/30 font-medium px-3 pt-4 pb-1.5">
                    {section.label}
                  </p>
                )}
                {sidebarCollapsed && <div className="h-4" />}
                {sectionItems.map(item => {
                  const isActive = activeModule === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      title={sidebarCollapsed ? item.label : undefined}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                        transition-all duration-150
                        ${isActive
                          ? 'bg-primary text-white shadow-lg shadow-primary/25'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'}
                        ${sidebarCollapsed ? 'justify-center' : ''}
                      `}
                    >
                      <item.icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? 'text-white' : ''}`} />
                      {!sidebarCollapsed && (
                        <>
                          <span className="flex-1 text-left truncate">{item.label}</span>
                          {EXTERNAL_MODULES[item.id] && (
                            <ExternalLink className="w-3 h-3 text-white/30 flex-shrink-0" />
                          )}
                          {item.badge && item.badge > 0 && (
                            <span className="min-w-[20px] h-5 flex items-center justify-center rounded-full bg-destructive text-white text-[10px] font-bold px-1.5">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                      {sidebarCollapsed && item.badge && item.badge > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-white text-[9px] flex items-center justify-center font-bold">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="border-t border-white/10 p-3">
          {!sidebarCollapsed && (
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 text-xs text-white/50 hover:text-white/80 transition-colors px-3 py-2"
            >
              <Phone className="w-3.5 h-3.5" />
              {PHONE_DISPLAY}
            </a>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex w-full items-center justify-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" /> Collapse</>}
          </button>
        </div>
      </aside>

      {/* ========== MAIN CONTENT ========== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-foreground/60 hover:text-foreground rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="font-heading text-lg font-bold text-foreground leading-tight">
                {activeModule === 'clientfiles'
                  ? 'LSO Compliance — Client Files'
                  : navItems.find(n => n.id === activeModule)?.label || 'Overview'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notification bell */}
            {unreadCount > 0 && (
              <button
                onClick={() => handleNavClick('messages')}
                className="relative p-2 text-foreground/60 hover:text-foreground rounded-lg hover:bg-gray-100"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-destructive text-white text-[9px] flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              </button>
            )}
            {/* Quick nav to home */}
            <a
              href="/"
              className="hidden md:flex items-center gap-1.5 text-xs text-foreground/50 hover:text-foreground px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> Exit Dashboard
            </a>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-[1600px] mx-auto">
            {renderModule()}
          </div>
        </main>
      </div>
    </div>
  );
}

// ============================================================
// EXPORT — wrapped in context provider
// ============================================================
export default function ParalegalDashboardPage() {
  return (
    <ParalegalDashboardProvider>
      <DashboardShell />
    </ParalegalDashboardProvider>
  );
}
