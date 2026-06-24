/**
 * F-J — Live chat for paralegal students.
 *
 * Renders the shared LiveChatTab console in a student-accessible shell.
 * Scope decision (per supervising paralegal): students see ALL open
 * conversations, like a paralegal, and may send replies. LiveChatTab
 * detects student mode (getCurrentUser + isStudent) and:
 *   - sends under the student's own name, flagged "(Student)";
 *   - logs every outbound message to activitylogs so it appears in the
 *     supervisor review queue at /admin/students.
 *
 * Route: /student-chat  (staffGate — students + paralegals)
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/auth-service';
import { isStudent, isParalegal, type UserAccount } from '@/lib/student-permissions';
import LiveChatTab from './paralegal-dashboard/LiveChatTab';

export default function StudentLiveChatPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const u = getCurrentUser() as UserAccount | null;
    if (!u) { navigate('/login'); return; }
    // Staff only. Non-staff (clients) bounce home.
    if (!isStudent(u) && !isParalegal(u)) { navigate('/client-dashboard'); return; }
  }, [navigate]);

  const user = getCurrentUser() as UserAccount | null;
  const student = !!user && isStudent(user);

  return (
    <div className="min-h-screen bg-pastelbeige/20">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <header className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate(student ? '/student-dashboard' : '/paralegal-dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
            </Button>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              <h1 className="font-heading text-xl font-bold text-foreground">Live chat</h1>
            </div>
          </div>
          {student && (
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">Student access</Badge>
            </div>
          )}
        </header>

        {student && (
          <div className="text-xs text-foreground/60 bg-white border border-gray-200 rounded-lg px-4 py-2 mb-4">
            You're chatting as <span className="font-semibold text-foreground">{[user?.firstName, user?.lastName].filter(Boolean).join(' ')}</span>.
            Clients see your name flagged as a student, and your supervising paralegal can review every message you send.
          </div>
        )}

        <LiveChatTab />
      </div>
    </div>
  );
}
