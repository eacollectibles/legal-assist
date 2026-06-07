/**
 * F-J (extension) — Student "Open a new file + take payment" flow.
 *
 * Lets a paralegal student WITH allowFinancialView (or any paralegal):
 *   1. Open a new client file. The file is auto-assigned to the student
 *      AND their supervising paralegal (assignedStudentIds + assigned
 *      paralegal), so the licensed paralegal stays responsible per LSO
 *      By-Law 4 s.2(2) and sees the file immediately.
 *   2. CONFLICT CHECK (mandatory gate). A name search runs across
 *      existing clients and recorded opposing parties. If anything
 *      matches, the student CANNOT proceed — the file is flagged and
 *      routed to the supervising paralegal. Only a clean result that the
 *      student attests to unlocks the payment step. This keeps a student
 *      from taking retainer money into trust before conflicts are
 *      cleared (LSO By-Law 9 / conflict-of-interest rules).
 *   3. Take an initial payment for that file — retainer into trust
 *      (By-Law 9) or a general/invoice payment — via the shared
 *      PaymentForm (Square), linked to the new file.
 *
 * Every step is written to `activitylogs` (student_edit audit) so the
 * supervising paralegal can review what the student did.
 *
 * Route: /student/new-file
 * Access: canOpenNewFiles(user) — paralegals, or students with
 *         allowFinancialView. Everyone else is redirected.
 */

import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Loader2, FilePlus2, ArrowLeft, CheckCircle2, ShieldCheck, ShieldAlert,
  AlertCircle, CreditCard, Search,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { getCurrentUser } from '@/lib/auth-service';
import {
  canOpenNewFiles,
  isStudent,
  buildStudentEditAuditEntry,
  type UserAccount,
} from '@/lib/student-permissions';
import { getParalegalById } from '@/lib/paralegals';
import PaymentForm, { type PaymentSuccess } from '@/components/payments/PaymentForm';

type Step = 'intake' | 'conflict' | 'payment' | 'done';

const MATTER_TYPES: { value: string; label: string }[] = [
  { value: 'traffic', label: 'Traffic / Provincial Offences' },
  { value: 'ltb', label: 'Landlord & Tenant (LTB)' },
  { value: 'small_claims', label: 'Small Claims' },
  { value: 'human_rights', label: 'Human Rights (HRTO)' },
  { value: 'employment', label: 'Employment / Labour' },
  { value: 'other', label: 'Other' },
];

const ID_TYPES: { value: string; label: string }[] = [
  { value: 'drivers_licence', label: "Driver's licence" },
  { value: 'passport', label: 'Passport' },
  { value: 'ontario_photo_card', label: 'Ontario Photo Card' },
  { value: 'pr_card', label: 'PR / citizenship card' },
  { value: 'other_gov_id', label: 'Other government photo ID' },
];

interface CreatedFile {
  fileId: string;
  clientProfileId: string;
  fileNumber: string;
  clientName: string;
  email: string;
  opposingNames: string[];
}

interface ConflictHit {
  searched: string;   // term we searched (new client or an opposing party)
  searchedRole: string;
  name: string;       // existing record it matched
  type: string;       // what kind of existing record
}

export default function StudentNewFilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserAccount | null>(null);
  const [step, setStep] = useState<Step>('intake');

  const [draft, setDraft] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    matterType: 'traffic',
    description: '',
    opposingParties: '',
  });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [created, setCreated] = useState<CreatedFile | null>(null);

  // Conflict-check state
  const [conflictLoading, setConflictLoading] = useState(false);
  const [conflictError, setConflictError] = useState('');
  const [conflictMatches, setConflictMatches] = useState<ConflictHit[]>([]);
  const [scanned, setScanned] = useState(false);
  const [attest, setAttest] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [escalated, setEscalated] = useState(false);

  // Pre-trust compliance (LSO By-Law 9 / By-Law 7.1): a student may not
  // take retainer money into trust until client identity is verified and
  // the source of funds is recorded.
  const [idVerified, setIdVerified] = useState(false);
  const [idType, setIdType] = useState('drivers_licence');
  const [sourceOfFunds, setSourceOfFunds] = useState('');
  const [sourceConfirmed, setSourceConfirmed] = useState(false);

  const [lastPayment, setLastPayment] = useState<PaymentSuccess | null>(null);

  useEffect(() => {
    const u = getCurrentUser() as UserAccount | null;
    if (!u) {
      navigate('/login');
      return;
    }
    if (!canOpenNewFiles(u)) {
      navigate(isStudent(u) ? '/student-dashboard' : '/paralegal-dashboard');
      return;
    }
    setUser(u);
  }, [navigate]);

  const supervisor = useMemo(
    () => (user ? getParalegalById(user.supervisingParalegalId) : undefined),
    [user]
  );

  const audit = async (fileId: string, fileName: string, action: string, detail: string) => {
    if (!user) return;
    try {
      await BaseCrudService.create(
        'activitylogs',
        buildStudentEditAuditEntry({ studentUser: user, fileId, fileName, action, detail })
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('activitylogs write failed:', e);
    }
  };

  const openFile = async () => {
    if (!user) return;
    setError('');
    const firstName = draft.firstName.trim();
    const lastName = draft.lastName.trim();
    const email = draft.email.trim().toLowerCase();
    if (!firstName || !lastName) { setError('Client first and last name are required.'); return; }
    if (email && !email.includes('@')) { setError('Enter a valid email or leave it blank.'); return; }
    if (isStudent(user) && !user.supervisingParalegalId) {
      setError('Your account has no supervising paralegal set. Ask an administrator to assign one before opening files.');
      return;
    }

    setCreating(true);
    try {
      const clientName = `${firstName} ${lastName}`.trim();
      const opposingNames = splitParties(draft.opposingParties);
      const clientProfileId = crypto.randomUUID();
      const fileId = crypto.randomUUID();
      const year = new Date().getFullYear();
      const fileNumber = `LA-${year}-${String(Date.now()).slice(-4)}`;
      const assignedParalegalId = user.supervisingParalegalId || '';
      const assignedParalegalName = supervisor?.displayName || '';

      await BaseCrudService.create('clientprofiles', {
        _id: clientProfileId,
        firstName,
        lastName,
        phoneNumber: draft.phone.trim(),
        caseType: draft.matterType,
        opposingPartyNames: opposingNames.join(', '),
        intakeCompleted: false,
      });

      await BaseCrudService.create('clientfiles', {
        _id: fileId,
        title: `${clientName} — ${labelForMatter(draft.matterType)}`,
        fileNumber,
        clientId: clientProfileId,
        clientName,
        clientEmail: email,
        matterType: draft.matterType,
        matterDescription: draft.description.trim(),
        opposingPartyNames: opposingNames.join(', '),
        assignedParalegalId,
        assignedParalegalName,
        // assignedStudentIds is a student-only access field — only stamp it
        // when a student opens the file (a paralegal sees all files anyway).
        assignedStudentIds: isStudent(user) ? user._id : '',
        openedByStudentId: isStudent(user) ? user._id : '',
        fileStatus: 'active',
        // `status: 'open'` is what the student dashboard's open-count reads;
        // `fileStatus: 'active'` is what the compliance file list reads.
        status: 'open',
        dateOpened: new Date(),
        complianceScore: 0,
        // Conflicts NOT cleared yet — must pass the gate below.
        conflictStatus: 'pending',
        sectionFileOpening: true,
        sectionClientIdentification: false,
        sectionClientVerification: false,
        sectionSourceOfFunds: false,
        sectionConflictCheck: false,
        sectionRetainerAgreement: false,
        sectionFinancialRecords: false,
        sectionCommunicationLog: false,
        sectionCaseDocuments: false,
        sectionFileClosing: false,
        sectionContingencyPlan: false,
      });

      await audit(
        fileId,
        `${clientName} (${fileNumber})`,
        'opened_file',
        `Opened new ${labelForMatter(draft.matterType)} file for ${clientName}.`
      );

      const createdFile: CreatedFile = { fileId, clientProfileId, fileNumber, clientName, email, opposingNames };
      setCreated(createdFile);
      setStep('conflict');
      void runConflictScan(createdFile);
    } catch (e: any) {
      setError(e?.message || 'Could not open the file. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  const runConflictScan = async (file: CreatedFile) => {
    setConflictLoading(true);
    setConflictError('');
    setConflictMatches([]);
    setScanned(false);
    try {
      const [profsR, filesR]: any = await Promise.all([
        BaseCrudService.getAll('clientprofiles', undefined, { limit: 1000 }),
        BaseCrudService.getAll('clientfiles', undefined, { limit: 1000 }),
      ]);
      const profs: any[] = profsR?.items || profsR || [];
      const files: any[] = filesR?.items || filesR || [];

      // Build the universe of existing names to check against, excluding
      // the records we just created for this very file.
      const existing: { name: string; kind: string }[] = [];
      for (const p of profs) {
        if (p._id === file.clientProfileId) continue;
        const nm = `${p.firstName || ''} ${p.lastName || ''}`.trim();
        if (nm) existing.push({ name: nm, kind: 'existing client' });
        splitParties(p.opposingPartyNames).forEach(o =>
          existing.push({ name: o, kind: 'opposing party on another file' })
        );
      }
      for (const f of files) {
        if (f._id === file.fileId || f.clientId === file.clientProfileId) continue;
        if (f.clientName) existing.push({ name: f.clientName, kind: 'existing client file' });
        splitParties(f.opposingPartyNames).forEach(o =>
          existing.push({ name: o, kind: 'opposing party on another file' })
        );
      }

      const terms: { term: string; role: string }[] = [
        { term: file.clientName, role: 'new client' },
        ...file.opposingNames.map(o => ({ term: o, role: 'opposing party' })),
      ];

      const hits: ConflictHit[] = [];
      for (const t of terms) {
        for (const ex of existing) {
          if (nameMatch(t.term, ex.name)) {
            hits.push({ searched: t.term, searchedRole: t.role, name: ex.name, type: ex.kind });
          }
        }
      }
      // Dedup identical (searched + matched) pairs.
      const seen = new Set<string>();
      const deduped = hits.filter(h => {
        const k = `${h.searched.toLowerCase()}|${h.name.toLowerCase()}|${h.type}`;
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });
      setConflictMatches(deduped);

      await audit(
        file.fileId,
        `${file.clientName} (${file.fileNumber})`,
        'conflict_search',
        deduped.length
          ? `Conflict search found ${deduped.length} potential match(es).`
          : 'Conflict search run — no matches found.'
      );
    } catch (e: any) {
      setConflictError(e?.message || 'Conflict scan failed. Try again before taking any payment.');
    } finally {
      setConflictLoading(false);
      setScanned(true);
    }
  };

  const clearAndContinue = async () => {
    if (!created || !user) return;
    // Hard guard — never let the payment step open without the full
    // pre-trust checklist, even if the button somehow enables.
    if (!attest || !idVerified || !sourceConfirmed || !sourceOfFunds.trim()) {
      setConflictError('Complete the identity and source-of-funds checklist before continuing.');
      return;
    }
    setClearing(true);
    try {
      const idLabel = ID_TYPES.find(t => t.value === idType)?.label || idType;
      await BaseCrudService.update('clientfiles', {
        _id: created.fileId,
        // App-wide vocabulary: 'pending' | 'passed' | 'flagged'.
        conflictStatus: 'passed',
        sectionConflictCheck: true,
        sectionClientIdentification: true,
        sectionClientVerification: true,
        sectionSourceOfFunds: true,
        idVerificationType: idLabel,
        sourceOfFunds: sourceOfFunds.trim(),
      });
      // Mirror the source of funds onto the client profile for the record.
      try {
        await BaseCrudService.update('clientprofiles', {
          _id: created.clientProfileId,
          sourceOfFunds: sourceOfFunds.trim(),
          idVerificationType: idLabel,
        });
      } catch { /* non-fatal */ }
      await audit(
        created.fileId,
        `${created.clientName} (${created.fileNumber})`,
        'conflict_cleared',
        `No conflicts found. Identity verified via ${idLabel}; source of funds: ${sourceOfFunds.trim()}. ` +
        `Student attested and cleared the pre-trust checklist.`
      );
      setStep('payment');
    } catch (e: any) {
      setConflictError(e?.message || 'Could not record the conflict clearance.');
    } finally {
      setClearing(false);
    }
  };

  const escalateToSupervisor = async () => {
    if (!created || !user) return;
    setClearing(true);
    try {
      await BaseCrudService.update('clientfiles', {
        _id: created.fileId,
        // 'flagged' so the file shows in the paralegal's Conflicts-Flagged views.
        conflictStatus: 'flagged',
      });
      await audit(
        created.fileId,
        `${created.clientName} (${created.fileNumber})`,
        'conflict_flagged',
        `Potential conflict(s) found (${conflictMatches.length}); escalated to supervising paralegal. Payment blocked.`
      );
      setEscalated(true);
    } catch (e: any) {
      setConflictError(e?.message || 'Could not flag the file. Tell your supervisor directly.');
    } finally {
      setClearing(false);
    }
  };

  const onPaymentSuccess = async (success: PaymentSuccess) => {
    setLastPayment(success);
    setStep('done');
    if (created) {
      await audit(
        created.fileId,
        `${created.clientName} (${created.fileNumber})`,
        'took_payment',
        `Processed payment of $${(success.amountCents / 100).toFixed(2)} ${success.currency} (Square ${success.paymentId}).`
      );
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-pastelbeige/20">
      <div className="max-w-3xl mx-auto p-6 lg:p-10">
        {/* Header */}
        <header className="mb-8">
          <button
            onClick={() => navigate('/student-dashboard')}
            className="inline-flex items-center gap-1.5 text-sm text-foreground/60 hover:text-foreground mb-3"
          >
            <ArrowLeft className="w-4 h-4" /> Back to dashboard
          </button>
          <div className="flex items-center gap-2 mb-1">
            <FilePlus2 className="w-5 h-5 text-primary" />
            <Badge>Open a new file</Badge>
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground">New client file</h1>
          {supervisor ? (
            <p className="font-paragraph text-foreground/70 mt-1">
              This file will be assigned to you and supervised by{' '}
              <span className="font-semibold text-foreground">{supervisor.displayName}</span>{' '}
              (LSO #{supervisor.lsoNumber}).
            </p>
          ) : (
            <p className="font-paragraph text-foreground/70 mt-1">
              Opening a new client file and taking the initial payment.
            </p>
          )}
        </header>

        {/* Stepper */}
        <ol className="flex items-center gap-2 mb-8 text-xs font-medium">
          <StepPill active={step === 'intake'} done={step !== 'intake'} n={1} label="File details" />
          <span className="h-px w-5 bg-gray-300" />
          <StepPill active={step === 'conflict'} done={step === 'payment' || step === 'done'} n={2} label="Conflict check" />
          <span className="h-px w-5 bg-gray-300" />
          <StepPill active={step === 'payment'} done={step === 'done'} n={3} label="Take payment" />
          <span className="h-px w-5 bg-gray-300" />
          <StepPill active={step === 'done'} done={false} n={4} label="Done" />
        </ol>

        {error && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* STEP 1 — intake */}
        {step === 'intake' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Client first name" value={draft.firstName} onChange={v => setDraft({ ...draft, firstName: v })} />
              <Field label="Client last name" value={draft.lastName} onChange={v => setDraft({ ...draft, lastName: v })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Email (for receipt)" type="email" value={draft.email} onChange={v => setDraft({ ...draft, email: v })} />
              <Field label="Phone" value={draft.phone} onChange={v => setDraft({ ...draft, phone: v })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground/70 mb-1">Matter type</label>
              <select
                value={draft.matterType}
                onChange={(e) => setDraft({ ...draft, matterType: e.target.value })}
                className="w-full text-sm border border-gray-200 rounded px-2 py-2 bg-white"
              >
                {MATTER_TYPES.map(m => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground/70 mb-1">
                Opposing / other parties <span className="text-foreground/40">(for the conflict check — comma separated)</span>
              </label>
              <input
                type="text"
                value={draft.opposingParties}
                onChange={(e) => setDraft({ ...draft, opposingParties: e.target.value })}
                className="w-full text-sm border border-gray-200 rounded px-2 py-2"
                placeholder="e.g., landlord name, opposing driver, employer"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground/70 mb-1">Short description (optional)</label>
              <textarea
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                rows={3}
                className="w-full text-sm border border-gray-200 rounded px-2 py-2"
                placeholder="e.g., Speeding ticket, HTA s.128 — first appearance pending."
              />
            </div>
            <div className="flex justify-end pt-2">
              <Button onClick={() => void openFile()} disabled={creating}>
                {creating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <FilePlus2 className="w-4 h-4 mr-2" />}
                Open file & run conflict check
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2 — conflict check (mandatory gate) */}
        {step === 'conflict' && created && (
          <div className="space-y-4">
            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-foreground">File opened — {created.fileNumber}</p>
                <p className="text-foreground/70 mt-0.5">
                  {created.clientName}. Before any payment, the conflict check must pass.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-4 h-4 text-primary" />
                <h2 className="font-heading font-semibold text-foreground">Conflict check</h2>
              </div>

              {conflictLoading ? (
                <div className="py-8 text-center">
                  <Loader2 className="w-6 h-6 animate-spin text-foreground/40 mx-auto" />
                  <p className="text-sm text-foreground/50 mt-2">
                    Searching existing clients and opposing parties…
                  </p>
                </div>
              ) : conflictError ? (
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-red-800">Conflict scan failed.</p>
                    <p className="text-red-700/80 mt-1">{conflictError}</p>
                    <Button variant="outline" size="sm" className="mt-3" onClick={() => void runConflictScan(created)}>
                      Retry scan
                    </Button>
                  </div>
                </div>
              ) : escalated ? (
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <ShieldAlert className="w-5 h-5 text-amber-700 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-foreground">Flagged for your supervising paralegal.</p>
                    <p className="text-foreground/70 mt-1">
                      The file is saved as <span className="font-mono">flagged</span> for review. You cannot take a
                      payment until {supervisor?.displayName || 'your supervisor'} reviews and clears the conflict.
                    </p>
                    <Button variant="outline" size="sm" className="mt-3" onClick={() => navigate('/student-dashboard')}>
                      Back to dashboard
                    </Button>
                  </div>
                </div>
              ) : conflictMatches.length > 0 ? (
                <div>
                  <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <ShieldAlert className="w-5 h-5 text-red-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold text-red-800">
                        {conflictMatches.length} potential conflict{conflictMatches.length > 1 ? 's' : ''} found.
                      </p>
                      <p className="text-red-700/80 mt-1">
                        You cannot clear this yourself or take any payment. Flag it for your supervising paralegal to review.
                      </p>
                    </div>
                  </div>
                  <ul className="divide-y divide-gray-100 border border-gray-100 rounded-lg mb-4">
                    {conflictMatches.map((m, i) => (
                      <li key={i} className="p-3 text-sm">
                        <span className="font-semibold text-foreground">{m.searched}</span>
                        <span className="text-foreground/50"> ({m.searchedRole}) </span>
                        matches <span className="font-semibold text-foreground">{m.name}</span>
                        <span className="text-foreground/50"> — {m.type}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-end">
                    <Button onClick={() => void escalateToSupervisor()} disabled={clearing}>
                      {clearing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <ShieldAlert className="w-4 h-4 mr-2" />}
                      Flag for supervisor & stop
                    </Button>
                  </div>
                </div>
              ) : scanned ? (
                <div>
                  <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold text-foreground">No conflicts found.</p>
                      <p className="text-foreground/70 mt-1">
                        The client and opposing parties don’t match any existing client or recorded opposing party.
                      </p>
                    </div>
                  </div>
                  {/* Pre-trust compliance checklist (By-Law 9 / 7.1) */}
                  <div className="border border-gray-200 rounded-lg p-4 mb-4 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-foreground/55">
                      Before taking trust money
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-foreground/70 mb-1">Photo ID seen</label>
                        <select
                          value={idType}
                          onChange={(e) => setIdType(e.target.value)}
                          className="w-full text-sm border border-gray-200 rounded px-2 py-2 bg-white"
                        >
                          {ID_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground/70 mb-1">Source of funds</label>
                        <input
                          type="text"
                          value={sourceOfFunds}
                          onChange={(e) => setSourceOfFunds(e.target.value)}
                          className="w-full text-sm border border-gray-200 rounded px-2 py-2"
                          placeholder="e.g., personal savings, family loan, settlement"
                        />
                      </div>
                    </div>
                    <label className="flex items-start gap-2 text-sm">
                      <input type="checkbox" checked={idVerified} onChange={(e) => setIdVerified(e.target.checked)} className="mt-1" />
                      <span className="text-foreground/80">
                        I verified the client’s identity against valid government-issued photo ID.
                      </span>
                    </label>
                    <label className="flex items-start gap-2 text-sm">
                      <input type="checkbox" checked={sourceConfirmed} onChange={(e) => setSourceConfirmed(e.target.checked)} className="mt-1" />
                      <span className="text-foreground/80">
                        I recorded the source of funds and have no reason to believe it is illegitimate.
                      </span>
                    </label>
                  </div>
                  <label className="flex items-start gap-2 text-sm mb-4">
                    <input type="checkbox" checked={attest} onChange={(e) => setAttest(e.target.checked)} className="mt-1" />
                    <span className="text-foreground/80">
                      I have reviewed the conflict-check results and confirm there is no conflict of interest in acting on
                      this matter.
                    </span>
                  </label>
                  <div className="flex justify-end">
                    <Button
                      onClick={() => void clearAndContinue()}
                      disabled={!attest || !idVerified || !sourceConfirmed || !sourceOfFunds.trim() || clearing}
                    >
                      {clearing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <ShieldCheck className="w-4 h-4 mr-2" />}
                      Clear & continue to payment
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}

        {/* STEP 3 — payment (only reachable once conflict is cleared) */}
        {step === 'payment' && created && (
          <div className="space-y-4">
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
              <ShieldCheck className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                Conflict check cleared. Retainer funds (Trust Deposit) are held in trust until earned, per LSO By-Law 9,
                and appear on the Form 9C reconciliation. Choose “Invoice Payment” only for work already billed.
              </span>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-4 h-4 text-primary" />
                <h2 className="font-heading font-semibold text-foreground">Take payment — {created.fileNumber}</h2>
              </div>
              <PaymentForm
                lockClient
                defaults={{
                  paymentType: 'trust_deposit',
                  matterId: created.fileId,
                  matterReference: created.fileNumber,
                  clientId: created.clientProfileId,
                  clientName: created.clientName,
                  buyerEmail: created.email || undefined,
                }}
                onSuccess={(s) => void onPaymentSuccess(s)}
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => navigate(`/admin/client-files/${created.fileId}`)}>
                Skip payment — go to file
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4 — done */}
        {step === 'done' && created && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h2 className="font-heading text-2xl font-bold text-foreground">All set</h2>
            <p className="text-foreground/70 mt-1">
              File <span className="font-mono">{created.fileNumber}</span> is open for {created.clientName}
              {lastPayment ? (
                <>, and a payment of ${(lastPayment.amountCents / 100).toFixed(2)} {lastPayment.currency} was processed.</>
              ) : '.'}
            </p>
            {lastPayment?.receiptUrl && (
              <a
                href={lastPayment.receiptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-primary underline mt-2"
              >
                View Square receipt
              </a>
            )}
            <div className="flex items-center justify-center gap-2 mt-6">
              <Button variant="outline" onClick={() => navigate('/student-dashboard')}>Back to dashboard</Button>
              <Button onClick={() => navigate(`/admin/client-files/${created.fileId}`)}>Open the file</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function labelForMatter(value: string): string {
  return MATTER_TYPES.find(m => m.value === value)?.label || 'General';
}

/** Split a comma/semicolon separated party string into clean names. */
function splitParties(raw: string | null | undefined): string[] {
  return String(raw || '')
    .split(/[,;]/)
    .map(s => s.trim())
    .filter(Boolean);
}

/** Normalize a name for comparison. */
function norm(s: string): string {
  return String(s || '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Conservative name match: flags exact, substring, and full-token-overlap
 * matches. Errs toward over-flagging (a flagged file just goes to the
 * supervisor) rather than letting a real conflict slip through.
 */
function nameMatch(a: string, b: string): boolean {
  const na = norm(a);
  const nb = norm(b);
  if (!na || !nb) return false;
  if (na === nb) return true;
  if (na.length >= 4 && nb.length >= 4 && (na.includes(nb) || nb.includes(na))) return true;
  const ta = na.split(' ').filter(Boolean);
  const tb = nb.split(' ').filter(Boolean);
  if (ta.length === 0 || tb.length === 0) return false;
  const [short, long] = ta.length <= tb.length ? [ta, tb] : [tb, ta];
  // Require at least two shared tokens (e.g. first + last) to avoid
  // flagging on a single common first name alone.
  if (short.length < 2) return false;
  return short.every(t => long.includes(t));
}

function StepPill({ active, done, n, label }: { active: boolean; done: boolean; n: number; label: string }) {
  return (
    <li className="flex items-center gap-1.5">
      <span
        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
          done ? 'bg-emerald-500 text-white' : active ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
        }`}
      >
        {done ? '✓' : n}
      </span>
      <span className={active || done ? 'text-foreground' : 'text-foreground/50'}>{label}</span>
    </li>
  );
}

function Field(props: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-foreground/70 mb-1">{props.label}</label>
      <input
        type={props.type || 'text'}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className="w-full text-sm border border-gray-200 rounded px-2 py-2"
      />
    </div>
  );
}
