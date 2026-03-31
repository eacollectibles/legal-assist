import { lazy, Suspense, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ParalegalDashboardProvider, useParalegalDashboard } from './paralegal-dashboard/ParalegalDashboardContext';

// Lazy load all tabs - they only load when selected
const AppointmentsTab = lazy(() => import('./paralegal-dashboard/AppointmentsTab'));
const AssignmentsTab = lazy(() => import('./paralegal-dashboard/AssignmentsTab'));
const SignaturesTab = lazy(() => import('./paralegal-dashboard/SignaturesTab'));
const MessagesTab = lazy(() => import('./paralegal-dashboard/MessagesTab'));
const FileManagementTab = lazy(() => import('./paralegal-dashboard/FileManagementTab'));
const SettingsTab = lazy(() => import('./paralegal-dashboard/SettingsTab'));
const GraphConnectionTest = lazy(() => import('@/components/GraphConnectionTest'));

// Loading spinner component
function TabLoading() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="ml-3 font-paragraph text-foreground/70">Loading...</span>
    </div>
  );
}

// Dashboard content with context access
function DashboardContent() {
  const { conversations, isLoading } = useParalegalDashboard();
  const [activeTab, setActiveTab] = useState('appointments');

  // Calculate unread messages
  const unreadCount = conversations.reduce((total, conv) => total + conv.unreadCount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-[100rem] mx-auto px-4 md:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-2">
            Paralegal Dashboard
          </h1>
          <p className="font-paragraph text-lg text-foreground/70">
            Manage your clients, appointments, documents, and communications
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="ml-3 font-paragraph text-foreground/70">Loading dashboard...</span>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="flex flex-wrap gap-2 h-auto bg-transparent p-0">
              <TabsTrigger 
                value="appointments"
                className="data-[state=active]:bg-primary data-[state=active]:text-white px-4 py-2 rounded-lg border"
              >
                Appointments & Deadlines
              </TabsTrigger>
              <TabsTrigger 
                value="assignments"
                className="data-[state=active]:bg-primary data-[state=active]:text-white px-4 py-2 rounded-lg border"
              >
                File Assignments
              </TabsTrigger>
              <TabsTrigger 
                value="signatures" 
                className="relative data-[state=active]:bg-primary data-[state=active]:text-white px-4 py-2 rounded-lg border"
              >
                Signatures
              </TabsTrigger>
              <TabsTrigger 
                value="messages" 
                className="relative data-[state=active]:bg-primary data-[state=active]:text-white px-4 py-2 rounded-lg border"
              >
                Messages
                {unreadCount > 0 && (
                  <Badge className="ml-2 bg-destructive text-white text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="filemanagement"
                className="data-[state=active]:bg-primary data-[state=active]:text-white px-4 py-2 rounded-lg border"
              >
                File Management
              </TabsTrigger>
              <TabsTrigger 
                value="settings"
                className="data-[state=active]:bg-primary data-[state=active]:text-white px-4 py-2 rounded-lg border"
              >
                Settings
              </TabsTrigger>
              <TabsTrigger 
                value="graph-test"
                className="data-[state=active]:bg-primary data-[state=active]:text-white px-4 py-2 rounded-lg border"
              >
                Graph Connection
              </TabsTrigger>
            </TabsList>

            <TabsContent value="appointments">
              <Suspense fallback={<TabLoading />}>
                <AppointmentsTab />
              </Suspense>
            </TabsContent>

            <TabsContent value="assignments">
              <Suspense fallback={<TabLoading />}>
                <AssignmentsTab />
              </Suspense>
            </TabsContent>

            <TabsContent value="signatures">
              <Suspense fallback={<TabLoading />}>
                <SignaturesTab />
              </Suspense>
            </TabsContent>

            <TabsContent value="messages">
              <Suspense fallback={<TabLoading />}>
                <MessagesTab />
              </Suspense>
            </TabsContent>

            <TabsContent value="filemanagement">
              <Suspense fallback={<TabLoading />}>
                <FileManagementTab />
              </Suspense>
            </TabsContent>

            <TabsContent value="settings">
              <Suspense fallback={<TabLoading />}>
                <SettingsTab />
              </Suspense>
            </TabsContent>

            <TabsContent value="graph-test">
              <Suspense fallback={<TabLoading />}>
                <div className="space-y-6">
                  <h2 className="font-heading text-3xl font-bold text-foreground">
                    Microsoft Graph Connection Test
                  </h2>
                  <GraphConnectionTest />
                </div>
              </Suspense>
            </TabsContent>
          </Tabs>
        )}
      </main>
      <Footer />
    </div>
  );
}

// Main export with provider wrapper
export default function ParalegalDashboardPage() {
  return (
    <ParalegalDashboardProvider>
      <DashboardContent />
    </ParalegalDashboardProvider>
  );
}
