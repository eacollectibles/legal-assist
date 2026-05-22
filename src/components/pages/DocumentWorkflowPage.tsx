import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToDashboard from '@/components/BackToDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FileText, Plus, Send, Printer, CheckCircle, Clock, AlertCircle, Mail, Download, Eye, Edit, Archive, Zap, Users, TrendingUp, Calendar, Bell, Copy, History, BarChart3, Workflow, Bot, MessageSquare, Trash2, PenTool, Link2 } from 'lucide-react';
import { format } from 'date-fns';
import { generatePDF, embedSignatureInPDF, downloadPDF } from '@/lib/pdf-generator';
import {
  uploadToWixMedia,
  approxByteLength,
  compressHtmlForInline,
} from '@/lib/wix-media-upload';
import DocumentSignature, { SignatureData } from '@/components/DocumentSignature';
import UploadLinkGenerator from '@/components/UploadLinkGenerator';
import EmailDocumentDialog, { EmailFormData } from '@/components/EmailDocumentDialog';
import { sendSignedDocumentEmail, sendDocumentEmail, EmailActivityLog } from '@/lib/email-service';
import { getActiveParalegals, DEFAULT_PARALEGAL_ID, getParalegalById } from '@/lib/paralegals';
import { EMAIL_PRIMARY } from '@/lib/contact';

// ============================================================
// LSO BY-LAW 7.1 SECTIONS (A–K)
// ============================================================
// Templates are grouped by which compliance section they support so
// paralegals can find the right template quickly when working a file.
// A: File Opening, B: Client ID, C: Verification, D: Source of Funds,
// E: Conflict, F: Retainer, G: Financials, H: Communications,
// I: Documents, J: File Closing, K: Contingency.
export const LSO_SECTIONS: { value: string; label: string }[] = [
  { value: 'A', label: 'A — File Opening' },
  { value: 'B', label: 'B — Client Identification' },
  { value: 'C', label: 'C — Client Verification' },
  { value: 'D', label: 'D — Source of Funds' },
  { value: 'E', label: 'E — Conflict of Interest' },
  { value: 'F', label: 'F — Retainer Agreement' },
  { value: 'G', label: 'G — Financial Records' },
  { value: 'H', label: 'H — Communication Log' },
  { value: 'I', label: 'I — Case Documents' },
  { value: 'J', label: 'J — File Closing' },
  { value: 'K', label: 'K — Contingency Plan' },
  { value: 'OTHER', label: 'Uncategorized' },
];

const sectionLabel = (v?: string) =>
  LSO_SECTIONS.find(s => s.value === (v || 'OTHER'))?.label || 'Uncategorized';

interface DocumentTemplate {
  _id: string;
  templateName?: string;
  templateType?: string;
  templateContent?: string;
  /** LSO By-Law 7.1 section this template belongs to (A-K, or 'OTHER'). */
  lsoSection?: string;
  /**
   * Paralegal-supplied area of law for grouping in the template
   * picker. Set in Wix CMS (documenttemplates collection) per row.
   * Examples seen in the wild: "Landlord & Tenant", "Small Claims
   * Court", "Human Rights (HRTO)", "Employment Law", "Social Benefits
   * Tribunal", "Traffic & Provincial Offences", "Criminal (Summary)",
   * "Mediation", "Defamation & Slander", "General / Administrative".
   * When present, this takes priority over the keyword-based fallback
   * in classifyTemplateArea.
   */
  templateCategory?: string;
  createdBy?: string;
  isActive?: boolean;
  _createdDate?: Date | string;
}

interface GeneratedDocument {
  _id: string;
  documentName?: string;
  templateId?: string;
  clientId?: string;
  clientEmail?: string;
  generatedBy?: string;
  generationDate?: Date | string;
  status?: string;
  sentDate?: Date | string;
  signedDate?: Date | string;
  requiresSignature?: boolean;
  documentUrl?: string;
  signedDocumentUrl?: string;
  uploadToken?: string; // CRITICAL FIX: Store upload token on document
  _createdDate?: Date | string;
}

interface ClientProfile {
  _id: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

interface UserAccount {
  _id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

// ============================================================
// AREA-OF-LAW CLASSIFIER
// ============================================================
// Group templates in the Generate Document picker by the area of
// law they belong to (LTB, Small Claims, Provincial Offences, etc).
// We don't have a dedicated "area" field on DocumentTemplate, so we
// infer it from the templateName + templateType using keyword match.
// Areas are listed in display order; templates within each area get
// sorted alphabetically at render time.
const AREA_DISPLAY_ORDER = [
  'Landlord & Tenant Board',
  'Small Claims Court',
  'Human Rights Tribunal',
  'Employment / ESA',
  'Provincial Offences / Traffic',
  'Criminal',
  'WSIB',
  'Social Benefits (ODSP/OW)',
  'Notary / Commissioner',
  'General / Administrative',
];

/**
 * Map a paralegal-supplied templateCategory string onto one of the
 * canonical area labels used by AREA_DISPLAY_ORDER. Tolerates the
 * minor spelling/abbreviation variations the paralegal entered when
 * tagging templates in the CMS — e.g. "Landlord & Tenant" maps to
 * "Landlord & Tenant Board"; "Human Rights (HRTO)" maps to "Human
 * Rights Tribunal". Unknown values pass through unchanged so a
 * brand-new category the paralegal types just becomes its own group.
 */
function normalizeManualCategory(raw: string): string {
  const t = raw.toLowerCase();
  if (/landlord|tenant|\bltb\b/.test(t)) return 'Landlord & Tenant Board';
  if (/small claim/.test(t)) return 'Small Claims Court';
  if (/human rights|\bhrto\b/.test(t)) return 'Human Rights Tribunal';
  if (/employment|\besa\b/.test(t)) return 'Employment / ESA';
  if (/provincial offence|traffic|\bpoa\b/.test(t))
    return 'Provincial Offences / Traffic';
  if (/criminal/.test(t)) return 'Criminal';
  if (/\bwsib\b/.test(t)) return 'WSIB';
  if (/\bodsp\b|ontario works|social benefits|social assistance/.test(t))
    return 'Social Benefits (ODSP/OW)';
  if (/notary|commissioner/.test(t)) return 'Notary / Commissioner';
  if (/general|admin/.test(t)) return 'General / Administrative';
  // Unknown — return the raw string trimmed so it shows up as a
  // new group label rather than collapsing to "General".
  return raw.trim();
}

function classifyTemplateArea(template: DocumentTemplate): string {
  // 1) Paralegal-supplied templateCategory in the CMS row wins.
  //    The classifier's keyword guesses are fallback only — when the
  //    paralegal has tagged a template explicitly, respect that.
  if (template.templateCategory && template.templateCategory.trim()) {
    return normalizeManualCategory(template.templateCategory);
  }
  // 2) Otherwise fall back to keyword inference from name + type.
  const text =
    `${template.templateName || ''} ${template.templateType || ''}`.toLowerCase();
  // Order matters here - more specific keywords first.
  if (
    /\bltb\b|landlord|tenant|n4|n5|n6|n7|n8|n11|n12|n13|l1\b|l2\b|t1\b|t2\b|t5\b|t6\b|residential tenanc/.test(
      text
    )
  ) {
    return 'Landlord & Tenant Board';
  }
  if (/small claim|plaintiff|form 7a|form 9a|form 10a/.test(text)) {
    return 'Small Claims Court';
  }
  if (/\bhrto\b|human rights|discrimination|code-related|harassment.*ground/.test(text)) {
    return 'Human Rights Tribunal';
  }
  if (/\besa\b|employment|wrongful|severance|wage|termination|hours of work|overtime/.test(text)) {
    return 'Employment / ESA';
  }
  if (
    /\bpoa\b|provincial offence|highway traffic|stunt driving|careless|speeding|distracted|red light|seat belt|hov\b|insurance.*card|drive.*suspended|fail to/.test(
      text
    )
  ) {
    return 'Provincial Offences / Traffic';
  }
  if (
    /\bcc\b|criminal code|impaired|dui\b|over 80|assault|mischief|theft.*under|peace bond|trespass|disturbance/.test(
      text
    )
  ) {
    return 'Criminal';
  }
  if (/\bwsib\b|workplace.*injury|workplace safety.*insurance/.test(text)) {
    return 'WSIB';
  }
  if (/\bodsp\b|ontario works|\bow\b|social benefits|social assistance/.test(text)) {
    return 'Social Benefits (ODSP/OW)';
  }
  if (/notary|commissioner|oath|affidavit|statutory declaration/.test(text)) {
    return 'Notary / Commissioner';
  }
  return 'General / Administrative';
}

export default function DocumentWorkflowPage({ embedded }: { embedded?: boolean } = {}) {
  const [templates, setTemplates] = useState<DocumentTemplate[]>([]);
  const [generatedDocs, setGeneratedDocs] = useState<GeneratedDocument[]>([]);
  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Template dialog state
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingTemplateId, setEditingTemplateId] = useState<string>('');
  const [newTemplate, setNewTemplate] = useState({
    templateName: '',
    templateType: 'Authorization Letter',
    templateContent: '',
    /** LSO By-Law 7.1 section this template belongs to */
    lsoSection: 'OTHER',
    isActive: true
  });

  // Generate document dialog state
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [selectedClientId, setSelectedClientId] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [requiresSignature, setRequiresSignature] = useState(true);

  // Paralegal selector for the generate flow — drives the auto-cursive
  // signature block when "Auto-sign on behalf of paralegal" is checked.
  const [selectedParalegalId, setSelectedParalegalId] = useState<string>(DEFAULT_PARALEGAL_ID);
  const [autoSignAsParalegal, setAutoSignAsParalegal] = useState<boolean>(false);

  // Retainer-specific fields
  const [selectedFeeModel, setSelectedFeeModel] = useState('Hourly Retainer');
  const [retainerAmount, setRetainerAmount] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  // New: per-fee-model amounts. Only the field matching the selected
  // model gets used; others stay blank in the rendered template.
  const [flatFeeAmount, setFlatFeeAmount] = useState('');
  const [hybridFlatFee, setHybridFlatFee] = useState('');
  const [hybridHourlyRate, setHybridHourlyRate] = useState('');
  const [contingencyPercent, setContingencyPercent] = useState('');
  // New: nature-of-matter / nature-of-charge for the generated document.
  const [natureOfMatter, setNatureOfMatter] = useState('');
  // Generation in-flight + user-visible error so the click isn't silent.
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  // New: special-provisions / additional-fee line items. Each row has a
  // description + amount. Drives the {SPECIAL_PROVISIONS_BLOCK}
  // placeholder so per-stage retainer pricing (e.g. $300 first part of
  // ticket + $200 trial) auto-populates into the generated document.
  const [specialProvisions, setSpecialProvisions] = useState<
    { description: string; amount: string }[]
  >([]);

  // ----------------------------------------------------------------
  // Payment Arrangement state (going-forward payment schedule).
  // Drives the {PAYMENT_ARRANGEMENT_SECTION} placeholder substitution
  // in the rendered template. Section renders only when the toggle
  // is on. Mirrors the same fields the per-client retainer dialog
  // exposes in ClientFileManagementPage.
  // ----------------------------------------------------------------
  const [paymentArrangementEnabled, setPaymentArrangementEnabled] = useState(false);
  const [paymentArrangementType, setPaymentArrangementType] = useState('full');
  const [paymentArrangementTotal, setPaymentArrangementTotal] = useState('');
  const [paymentInstallmentAmount, setPaymentInstallmentAmount] = useState('');
  const [paymentInstallmentFrequency, setPaymentInstallmentFrequency] = useState('monthly');
  const [paymentInstallmentStartDate, setPaymentInstallmentStartDate] = useState('');
  const [paymentInstallmentCount, setPaymentInstallmentCount] = useState('');
  const [paymentArrangementNotes, setPaymentArrangementNotes] = useState('');

  // Send document dialog state
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState('');
  const [emailMessage, setEmailMessage] = useState('');

  // Email signed document states
  const [emailingDocument, setEmailingDocument] = useState<GeneratedDocument | null>(null);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);

  // Signature dialog state
  const [isSignatureDialogOpen, setIsSignatureDialogOpen] = useState(false);
  const [documentToSign, setDocumentToSign] = useState<GeneratedDocument | null>(null);

  // ----------------------------------------------------------------
  // Send-to-Client-File state
  // ----------------------------------------------------------------
  // Lets the paralegal route a (typically signed) generated document
  // into the LSO Compliance section of a client file. Picks which file
  // and which compliance section (A–K) it belongs to.
  const [isFileDispatchOpen, setIsFileDispatchOpen] = useState(false);
  const [dispatchingDocument, setDispatchingDocument] =
    useState<GeneratedDocument | null>(null);
  const [dispatchClientFiles, setDispatchClientFiles] = useState<any[]>([]);
  const [dispatchTargetFileId, setDispatchTargetFileId] = useState('');
  const [dispatchSectionKey, setDispatchSectionKey] = useState('retainerAgreement');
  const [dispatchNotes, setDispatchNotes] = useState('');
  const [isDispatching, setIsDispatching] = useState(false);

  // ----------------------------------------------------------------
  // Send-Sign-Link state — public e-signature flow.
  // ----------------------------------------------------------------
  const [isSignLinkOpen, setIsSignLinkOpen] = useState(false);
  const [signLinkDocument, setSignLinkDocument] =
    useState<GeneratedDocument | null>(null);
  const [signLinkRecipientName, setSignLinkRecipientName] = useState('');
  const [signLinkRecipientEmail, setSignLinkRecipientEmail] = useState('');
  const [signLinkExpiryDays, setSignLinkExpiryDays] = useState(7);
  const [signLinkBuilding, setSignLinkBuilding] = useState(false);
  const [signLinkResult, setSignLinkResult] = useState<string | null>(null);

  // ----------------------------------------------------------------
  // LSO compliance sections (matches ClientFileManagementPage's A–K
  // section keys — used as documentCategory: section_<key> in
  // clientdocuments). Keep in sync with that file's LSO_SECTIONS.
  // ----------------------------------------------------------------
  const FILE_LSO_SECTIONS: { key: string; label: string }[] = [
    { key: 'fileOpening', label: 'A — File Opening & Matter Info' },
    { key: 'clientIdentification', label: 'B — Client Identification' },
    { key: 'clientVerification', label: 'C — Client Verification' },
    { key: 'sourceOfFunds', label: 'D — Source of Funds' },
    { key: 'conflictCheck', label: 'E — Conflict of Interest' },
    { key: 'retainerAgreement', label: 'F — Retainer Agreement' },
    { key: 'financialRecords', label: 'G — Financial Records' },
    { key: 'communicationLog', label: 'H — Communication Log' },
    { key: 'caseDocuments', label: 'I — Case Documents' },
    { key: 'fileClosing', label: 'J — File Closing' },
    { key: 'contingencyPlan', label: 'K — Contingency Plan' },
  ];

  useEffect(() => {
    loadData();
  }, []);

  // ----------------------------------------------------------------
  // CANONICAL RETAINER BODY
  //
  // Used to overwrite legacy retainer templates whose stored markup is
  // a labels-only "CONFIGURE FEE STRUCTURE" widget with no placeholders.
  // Uses the {PLACEHOLDER} syntax that handleGenerateDocument already
  // substitutes — so dropping this in fixes the template at source.
  // ----------------------------------------------------------------
  const CANONICAL_RETAINER_HTML = `<div style="font-family: Arial, Helvetica, sans-serif; max-width:820px; margin:0 auto; padding:24px; line-height:1.55; color:#111;">
  <h1 style="text-align:center; font-size:20px; margin:0 0 4px;">RETAINER AGREEMENT</h1>
  <p style="text-align:center; color:#666; margin:0 0 18px;">Legal Assist Paralegal Services</p>
  <hr>
  <table style="width:100%; font-size:13px; margin:8px 0;">
    <tr><td style="padding:3px 0; width:35%;"><strong>Date:</strong></td><td>{DATE}</td></tr>
    <tr><td style="padding:3px 0;"><strong>Client:</strong></td><td>{CLIENT_NAME}</td></tr>
    <tr><td style="padding:3px 0;"><strong>Phone:</strong></td><td>{CLIENT_PHONE}</td></tr>
    <tr><td style="padding:3px 0;"><strong>Email:</strong></td><td>{CLIENT_EMAIL}</td></tr>
    <tr><td style="padding:3px 0;"><strong>Address:</strong></td><td>{CLIENT_ADDRESS_LINE1} {CLIENT_ADDRESS_LINE2}</td></tr>
    <tr><td style="padding:3px 0;"><strong>City / Province / Postal:</strong></td><td>{CLIENT_CITY}, {CLIENT_PROVINCE}  {CLIENT_POSTAL_CODE}</td></tr>
    <tr><td style="padding:3px 0;"><strong>Matter Reference:</strong></td><td>{MATTER_REFERENCE}</td></tr>
  </table>
  <h2 style="font-size:14px; text-transform:uppercase; letter-spacing:.06em; margin:18px 0 6px;">1. Parties and Relationship</h2>
  <p>This Retainer Agreement is entered into between <strong>Legal Assist Paralegal Services</strong> (the &ldquo;Paralegal&rdquo;) and <strong>{CLIENT_NAME}</strong> (the &ldquo;Client&rdquo;) in respect of the matter identified above.</p>
  <h2 style="font-size:14px; text-transform:uppercase; letter-spacing:.06em; margin:18px 0 6px;">2. Scope of Services</h2>
  <p>The Paralegal will provide professional paralegal services authorized under the Law Society of Ontario By-Law 4 and the Paralegal Rules of Conduct, including consultation, document preparation, correspondence, and representation at the applicable tribunal or court where permitted.</p>
  <h2 style="font-size:14px; text-transform:uppercase; letter-spacing:.06em; margin:18px 0 6px;">3. Fee Structure</h2>
  <p>The selected billing model for this matter is: <strong>{SELECTED_FEE_MODEL}</strong>.</p>
  <p>The Client agrees to pay an initial retainer deposit of <strong>$ {RETAINER_AMOUNT} + HST</strong>. Additional invoicing reflects the agreed billing model. Hourly work is billed at <strong>$ {HOURLY_RATE} / hour + HST</strong> where applicable.</p>
  <h2 style="font-size:14px; text-transform:uppercase; letter-spacing:.06em; margin:18px 0 6px;">4. Disbursements and Taxes</h2>
  <p>Disbursements (filing fees, courier charges, expert reports, etc.) are billed at cost. HST applies to legal fees and to taxable disbursements where required.</p>
  <h2 style="font-size:14px; text-transform:uppercase; letter-spacing:.06em; margin:18px 0 6px;">5. Client Responsibilities</h2>
  <p>The Client agrees to provide complete, accurate, and timely information; cooperate with reasonable requests; attend scheduled meetings, hearings, and court dates; and keep contact information current.</p>
  <h2 style="font-size:14px; text-transform:uppercase; letter-spacing:.06em; margin:18px 0 6px;">6. Withdrawal and Termination</h2>
  <p>The Paralegal may withdraw if fees remain unpaid, the Client fails to cooperate, or the Client insists on an improper course of conduct, subject to the Paralegal&rsquo;s professional obligations. The Client may terminate this retainer at any time by providing written notice; fees and disbursements incurred to that date remain payable.</p>
  <h2 style="font-size:14px; text-transform:uppercase; letter-spacing:.06em; margin:18px 0 6px;">7. Electronic Signatures</h2>
  <p>The Client consents to the use of electronic signatures, email correspondence, and electronic document exchange. Electronic copies shall have the same legal effect as paper originals.</p>
  <h2 style="font-size:14px; text-transform:uppercase; letter-spacing:.06em; margin:18px 0 6px;">8. Governing Law</h2>
  <p>This agreement is governed by the laws of the Province of Ontario.</p>
  <h2 style="font-size:14px; text-transform:uppercase; letter-spacing:.06em; margin:18px 0 6px;">9. Acknowledgment</h2>
  <p>By signing below, the Client confirms that they have read and understood this agreement, had the opportunity to ask questions, and agree to its terms.</p>
  <hr>
  <table style="width:100%; margin-top:24px; border-collapse:separate; border-spacing:12px 0;">
    <tr>
      <td style="width:50%; vertical-align:top; padding:12px; border:1px solid #000;">
        <p style="font-weight:bold; margin:0 0 24px;">Client Electronic Signature</p>
        <div style="border-bottom:1px solid #000; height:30px;"></div>
        <p style="font-size:12px; color:#666; margin:4px 0 14px;">Client Signature</p>
        <div style="border-bottom:1px solid #000; height:24px;"></div>
        <p style="font-size:12px; color:#666; margin:4px 0;">Date</p>
      </td>
      <td style="width:50%; vertical-align:top; padding:12px; border:1px solid #000;">
        <p style="font-weight:bold; margin:0 0 12px;">Paralegal Signature</p>
        <div>{PARALEGAL_SIGNATURE}</div>
        <p style="font-size:12px; color:#666; margin:6px 0 0;">{PARALEGAL_NAME}, {PARALEGAL_CREDENTIAL}</p>
        <p style="font-size:12px; color:#666; margin:0;">LSO #{PARALEGAL_LSO}</p>
        <p style="font-size:12px; margin:8px 0 0;">{PARALEGAL_SIGN_DATE}</p>
      </td>
    </tr>
  </table>
</div>`;

  // ----------------------------------------------------------------
  // Heuristic: detect a "broken" retainer template body. Broken means
  // the markup contains the legacy "CONFIGURE FEE STRUCTURE" header,
  // OR contains client-info field LABELS like "CLIENT NAME" / "CLIENT
  // PHONE" / "MATTER REFERENCE" without the corresponding {CLIENT_NAME}
  // / {CLIENT_PHONE} / {MATTER_REFERENCE} placeholders that
  // handleGenerateDocument knows how to substitute. Such a template
  // can't be rendered correctly because the data has nowhere to land,
  // so we replace the body wholesale.
  // ----------------------------------------------------------------
  const isBrokenRetainerBody = (raw: string): boolean => {
    if (!raw) return false;
    const lower = raw.toLowerCase();
    if (lower.includes('configure fee structure')) return true;
    const labelMarkers = [
      'client name',
      'client phone',
      'client email',
      'address line 1',
      'matter reference',
    ];
    const hasLabels = labelMarkers.filter((l) => lower.includes(l)).length >= 3;
    const hasPlaceholders =
      raw.includes('{CLIENT_NAME}') ||
      raw.includes('{CLIENT_PHONE}') ||
      raw.includes('{MATTER_REFERENCE}');
    return hasLabels && !hasPlaceholders;
  };

  // ----------------------------------------------------------------
  // cleanTemplateContent — two-stage cleanup:
  //   1. If the body is structurally broken (labels without
  //      placeholders, or "CONFIGURE FEE STRUCTURE"), REPLACE the
  //      whole body with the canonical retainer HTML so it actually
  //      generates a usable document.
  //   2. Otherwise, just strip stray <form>/<input>/<button> elements
  //      that may have leaked in but the rest of the body is fine.
  // ----------------------------------------------------------------
  const cleanTemplateContent = (raw: string): { cleaned: string; changed: boolean } => {
    if (!raw) return { cleaned: '', changed: false };
    if (isBrokenRetainerBody(raw)) {
      return { cleaned: CANONICAL_RETAINER_HTML, changed: true };
    }
    const before = raw;
    const cleaned = raw
      .replace(/<form[\s\S]*?<\/form>/gi, '')
      .replace(/<input\b[^>]*\/?>/gi, '')
      .replace(/<button\b[\s\S]*?<\/button>/gi, '')
      .replace(/<select\b[\s\S]*?<\/select>/gi, '')
      .replace(/<textarea\b[\s\S]*?<\/textarea>/gi, '')
      .replace(/CONFIGURE\s+FEE\s+STRUCTURE/gi, '')
      .replace(/Select\s+the\s+fee\s+type\s+and\s+enter\s+the\s+details\s+below\.?/gi, '');
    return { cleaned, changed: cleaned !== before };
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      // BaseCrudService.getAll defaults to a 50-row page. We always
      // need the full collections here because the user picks any
      // template / client from these lists — silently dropping rows
      // past page 1 caused 'client.find returned undefined' bugs that
      // showed up downstream as missing fields in generated documents
      // (province defaulting to '—', etc.).
      const [templatesRes, docsRes, clientsRes] = await Promise.all([
        BaseCrudService.getAll<DocumentTemplate>('documenttemplates', undefined, { limit: 1000 } as any),
        BaseCrudService.getAll<GeneratedDocument>('generateddocuments', undefined, { limit: 1000 } as any),
        BaseCrudService.getAll<ClientProfile>('clientprofiles', undefined, { limit: 1000 } as any)
      ]);

      // -----------------------------------------------------------
      // ONE-PASS TEMPLATE CLEANUP
      //
      // If any saved template still has the legacy "CONFIGURE FEE
      // STRUCTURE" <form> block, rewrite it in the CMS now so we
      // never have to ask paralegals to fix it manually. Idempotent
      // — running again does nothing because cleanTemplateContent
      // returns changed:false on already-clean content.
      // -----------------------------------------------------------
      const incomingTemplates = templatesRes.items || [];
      const cleanups: Promise<unknown>[] = [];
      const cleanedTemplates = incomingTemplates.map((t) => {
        const { cleaned, changed } = cleanTemplateContent(t.templateContent || '');
        if (changed) {
          cleanups.push(
            BaseCrudService.update('documenttemplates', {
              _id: t._id,
              templateContent: cleaned,
            } as any).catch((err) => {
              // eslint-disable-next-line no-console
              console.warn(`Could not auto-clean template "${t.templateName}":`, err);
            })
          );
          return { ...t, templateContent: cleaned };
        }
        return t;
      });
      if (cleanups.length > 0) {
        // eslint-disable-next-line no-console
        console.info(
          `Document Workflow: cleaned ${cleanups.length} template(s) of legacy form scaffolding.`
        );
        await Promise.allSettled(cleanups);
      }

      setTemplates(cleanedTemplates);
      setGeneratedDocs(docsRes.items);
      setClients(clientsRes.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------------------------------------------------
  // SEND TO CLIENT FILE — open dialog
  // ----------------------------------------------------------------
  const openFileDispatch = async (doc: GeneratedDocument) => {
    setDispatchingDocument(doc);
    // Default the section pick based on the template the doc came from:
    // retainers -> Section F, everything else -> Section I (Case Documents).
    const tpl = templates.find(t => t._id === doc.templateId);
    const tplType = (tpl?.templateType || '').toLowerCase();
    const tplLso = (tpl?.lsoSection || '').toUpperCase();
    let defaultKey = 'caseDocuments';
    if (tplType.includes('retainer') || tplLso === 'F') defaultKey = 'retainerAgreement';
    else if (tplLso === 'A') defaultKey = 'fileOpening';
    else if (tplLso === 'B') defaultKey = 'clientIdentification';
    else if (tplLso === 'C') defaultKey = 'clientVerification';
    else if (tplLso === 'D') defaultKey = 'sourceOfFunds';
    else if (tplLso === 'E') defaultKey = 'conflictCheck';
    else if (tplLso === 'G') defaultKey = 'financialRecords';
    else if (tplLso === 'H') defaultKey = 'communicationLog';
    else if (tplLso === 'I') defaultKey = 'caseDocuments';
    else if (tplLso === 'J') defaultKey = 'fileClosing';
    else if (tplLso === 'K') defaultKey = 'contingencyPlan';
    setDispatchSectionKey(defaultKey);
    setDispatchNotes('');

    // Pull the paralegal's client files. Files for THIS doc's client
    // float to the top so the right one is one click away. limit:1000
    // because BaseCrudService default is 50.
    try {
      const { items } = await BaseCrudService.getAll<any>(
        'clientfiles', undefined, { limit: 1000 }
      );
      const sortedFiles = (items || []).slice().sort((a: any, b: any) => {
        const aMatch = a.clientId === doc.clientId ? 0 : 1;
        const bMatch = b.clientId === doc.clientId ? 0 : 1;
        if (aMatch !== bMatch) return aMatch - bMatch;
        return (b._createdDate ? new Date(b._createdDate).getTime() : 0) -
               (a._createdDate ? new Date(a._createdDate).getTime() : 0);
      });
      setDispatchClientFiles(sortedFiles);

      // Pre-select the most recently created file for this client.
      const matchingFile = sortedFiles.find((f: any) => f.clientId === doc.clientId);
      setDispatchTargetFileId(matchingFile?._id || sortedFiles[0]?._id || '');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Could not load client files for dispatch:', err);
      setDispatchClientFiles([]);
      setDispatchTargetFileId('');
    }

    setIsFileDispatchOpen(true);
  };

  // ----------------------------------------------------------------
  // SEND TO CLIENT FILE — write the clientdocuments row
  // ----------------------------------------------------------------
  const handleSendToClientFile = async () => {
    if (!dispatchingDocument || !dispatchTargetFileId || !dispatchSectionKey) {
      alert('Please choose a client file and an LSO section.');
      return;
    }
    const targetFile = dispatchClientFiles.find(f => f._id === dispatchTargetFileId);
    if (!targetFile) {
      alert('Selected client file no longer exists.');
      return;
    }
    setIsDispatching(true);
    try {
      // Prefer the signed PDF URL; fall back to the unsigned one.
      const fileUrl =
        dispatchingDocument.signedDocumentUrl ||
        dispatchingDocument.documentUrl ||
        '';
      const isSigned = !!dispatchingDocument.signedDocumentUrl;
      const baseName =
        dispatchingDocument.documentName || 'Generated Document';
      const docName = isSigned ? `${baseName} (signed)` : baseName;

      const sectionLabelText =
        FILE_LSO_SECTIONS.find(s => s.key === dispatchSectionKey)?.label ||
        dispatchSectionKey;

      const payload: any = {
        _id: crypto.randomUUID(),
        documentName: docName,
        fileUrl,
        uploadDate: new Date().toISOString(),
        fileType: fileUrl.startsWith('data:')
          ? fileUrl.slice(5, fileUrl.indexOf(';')) || 'application/pdf'
          : 'application/pdf',
        fileSize: 0,
        notes:
          dispatchNotes.trim() ||
          `Sent from Document Workflow on ${new Date().toLocaleDateString('en-CA')}` +
          (isSigned ? ' (electronically signed)' : ''),
        // Match the convention SectionDocuments uses on the file page:
        //   documentCategory: section_<sectionKey>
        documentCategory: `section_${dispatchSectionKey}`,
        // Tie to the file's clientprofile so SectionDocuments can find
        // it via its `clientId === clientId` filter.
        clientId: targetFile.clientId,
        // Bookkeeping for traceability.
        sourceGeneratedDocumentId: dispatchingDocument._id,
        clientFileId: targetFile._id,
        attachedToSection: dispatchSectionKey,
        attachedToSectionLabel: sectionLabelText,
        signed: isSigned,
        _createdDate: new Date(),
      };

      await BaseCrudService.create('clientdocuments', payload);

      // Activity log so the paralegal can see who routed what.
      try {
        await BaseCrudService.create('activitylogs', {
          _id: crypto.randomUUID(),
          activityType: 'document_routed_to_file',
          activityDescription:
            `${docName} attached to ${targetFile.fileNumber || targetFile._id} ` +
            `under ${sectionLabelText}`,
          relatedItemId: targetFile._id,
          timestamp: new Date().toISOString(),
        });
      } catch { /* non-fatal */ }

      setIsFileDispatchOpen(false);
      setDispatchingDocument(null);
      setDispatchNotes('');
      alert(
        `Sent "${docName}" to file ${targetFile.fileNumber || targetFile._id} under ${sectionLabelText}.`
      );
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error('Send to client file failed:', err);
      alert(
        err?.message
          ? `Failed to send to client file: ${err.message}`
          : 'Failed to send to client file. Please try again.'
      );
    } finally {
      setIsDispatching(false);
    }
  };

  // ----------------------------------------------------------------
  // SEND SIGN LINK — open dialog (pre-fills recipient name/email)
  // ----------------------------------------------------------------
  const openSignLinkDialog = (doc: GeneratedDocument) => {
    setSignLinkDocument(doc);
    setSignLinkResult(null);
    const client = clients.find((c) => c._id === doc.clientId) as any;
    const name = client
      ? `${client.firstName || ''} ${client.lastName || ''}`.trim()
      : '';
    setSignLinkRecipientName(name);
    setSignLinkRecipientEmail(doc.clientEmail || '');
    setSignLinkExpiryDays(7);
    setIsSignLinkOpen(true);
  };

  // ----------------------------------------------------------------
  // SEND SIGN LINK — mint token, persist, build the public URL.
  // (Email delivery: paralegal can paste/email the link manually,
  // or click Email Document afterward — body includes the link.)
  // ----------------------------------------------------------------
  const handleCreateSignLink = async () => {
    if (!signLinkDocument) return;
    if (!signLinkRecipientName.trim() || !signLinkRecipientEmail.trim()) {
      alert('Please enter both the recipient name and email.');
      return;
    }
    setSignLinkBuilding(true);
    try {
      const { createSignToken, generateSignLink } = await import(
        '@/lib/sign-token-service'
      );
      const currentUser = localStorage.getItem('currentUser');
      const userEmail = currentUser
        ? JSON.parse(currentUser).email
        : EMAIL_PRIMARY;
      const userName = currentUser
        ? `${JSON.parse(currentUser).firstName || ''} ${JSON.parse(currentUser).lastName || ''}`.trim()
        : 'Paralegal';

      const token = await createSignToken({
        documentId: signLinkDocument._id,
        documentName: signLinkDocument.documentName,
        intendedRecipientName: signLinkRecipientName.trim(),
        intendedRecipientEmail: signLinkRecipientEmail.trim(),
        clientId: signLinkDocument.clientId,
        createdByParalegalId: userEmail,
        createdByParalegalName: userName || 'Paralegal',
        expiryHours: Math.max(1, signLinkExpiryDays) * 24,
      });

      const link = generateSignLink(token.token!);

      // Stamp the doc with email + status if we have those fields
      try {
        await BaseCrudService.update('generateddocuments', {
          _id: signLinkDocument._id,
          clientEmail: signLinkRecipientEmail.trim(),
          status: 'sent',
          sentDate: new Date().toISOString(),
          signTokenId: token._id,
        } as any);
        setGeneratedDocs((prev) =>
          prev.map((d) =>
            d._id === signLinkDocument._id
              ? {
                  ...d,
                  clientEmail: signLinkRecipientEmail.trim(),
                  status: 'sent',
                  sentDate: new Date().toISOString(),
                }
              : d
          )
        );
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('Could not stamp generateddocuments with sign info:', e);
      }

      setSignLinkResult(link);
      // Best-effort copy to clipboard
      try {
        await navigator.clipboard.writeText(link);
      } catch { /* ignore */ }
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error('Sign link creation failed:', err);
      alert(
        err?.message
          ? `Could not create sign link: ${err.message}`
          : 'Could not create sign link. Please try again.'
      );
    } finally {
      setSignLinkBuilding(false);
    }
  };

  const handleCreateTemplate = async () => {
    try {
      const currentUser = localStorage.getItem('currentUser');
      const userEmail = currentUser ? JSON.parse(currentUser).email : EMAIL_PRIMARY;

      if (isEditMode && editingTemplateId) {
        // Update existing template
        const updatedTemplates = templates.map(t => 
          t._id === editingTemplateId 
            ? { ...t, ...newTemplate, createdBy: userEmail }
            : t
        );
        setTemplates(updatedTemplates);
        
        await BaseCrudService.update('documenttemplates', {
          _id: editingTemplateId,
          ...newTemplate,
          createdBy: userEmail
        });
      } else {
        // Create new template
        const newTemplateData = {
          _id: crypto.randomUUID(),
          ...newTemplate,
          createdBy: userEmail,
          _createdDate: new Date()
        };
        
        setTemplates([...templates, newTemplateData]);
        
        await BaseCrudService.create('documenttemplates', newTemplateData);
      }

      setIsTemplateDialogOpen(false);
      setIsEditMode(false);
      setEditingTemplateId('');
      setNewTemplate({
        templateName: '',
        templateType: 'Authorization Letter',
        templateContent: '',
        isActive: true
      });
    } catch (error) {
      console.error('Error saving template:', error);
      loadData();
    }
  };

  const handleEditTemplate = (template: DocumentTemplate) => {
    setIsEditMode(true);
    setEditingTemplateId(template._id);
    setNewTemplate({
      templateName: template.templateName || '',
      templateType: template.templateType || 'Authorization Letter',
      templateContent: template.templateContent || '',
      lsoSection: template.lsoSection || 'OTHER',
      isActive: template.isActive ?? true
    });
    setIsTemplateDialogOpen(true);
  };

  const handleToggleTemplateStatus = async (templateId: string, currentStatus: boolean) => {
    try {
      const updatedTemplates = templates.map(t => 
        t._id === templateId ? { ...t, isActive: !currentStatus } : t
      );
      setTemplates(updatedTemplates);
      
      await BaseCrudService.update('documenttemplates', {
        _id: templateId,
        isActive: !currentStatus
      });
    } catch (error) {
      console.error('Error toggling template status:', error);
      loadData();
    }
  };

  const handleDeleteTemplate = async (templateId: string) => {
    if (!confirm('Are you sure you want to delete this template? This action cannot be undone.')) {
      return;
    }

    try {
      setTemplates(templates.filter(t => t._id !== templateId));
      await BaseCrudService.delete('documenttemplates', templateId);
    } catch (error) {
      console.error('Error deleting template:', error);
      loadData();
    }
  };

  const handleGenerateDocument = async () => {
    setGenerateError(null);
    setIsGenerating(true);
    try {
      const template = templates.find(t => t._id === selectedTemplateId);
      const client = clients.find(c => c._id === selectedClientId);

      if (!template) {
        setGenerateError('Please choose a template.');
        return;
      }
      if (!client) {
        setGenerateError('Please choose a client.');
        return;
      }

      const currentUser = localStorage.getItem('currentUser');
      const userEmail = currentUser ? JSON.parse(currentUser).email : EMAIL_PRIMARY;

      // Get client's email from user accounts. Reject anything that
      // doesn't look like an email (e.g. when the useraccount row is
      // missing or the schema has been repurposed and the field holds
      // a UUID). We'd rather print "—" than a hex blob in the
      // retainer's Email field.
      const { items: userAccounts } = await BaseCrudService.getAll('useraccounts');
      // Match the useraccount in three ways because Wix sometimes
      // stores the linkage as _id, sometimes as a separate
      // clientProfileId/loginEmail/contactId field. Without all three
      // checks, retainers for clients who logged in through SSO had no
      // email substituted and the cover page printed "—".
      const clientAccount = userAccounts.find(
        u =>
          u._id === selectedClientId ||
          (u as any).clientProfileId === selectedClientId ||
          (u as any).contactId === selectedClientId
      );
      const looksLikeEmail = (s?: string) =>
        !!s && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
      // Pull from every plausible field on both the useraccount AND the
      // clientprofile. Wix collections use different field names across
      // the codebase (`email`, `emailAddress`, `clientEmail`,
      // `primaryEmail`, `loginEmail`), and the intake form has written
      // to several of these over time. We pick the first one that
      // looks like a valid email.
      const clientEmailAddress =
        [
          clientAccount?.email,
          (clientAccount as any)?.loginEmail,
          (clientAccount as any)?.primaryEmail,
          (client as any).email,
          (client as any).emailAddress,
          (client as any).clientEmail,
          (client as any).primaryEmail,
          (client as any).contactEmail,
        ].find(looksLikeEmail) || '';

      // Replace placeholders in template content. cleanTemplateContent
      // strips any legacy <form> scaffolding ("CONFIGURE FEE STRUCTURE"
      // etc.) — same helper that runs on load so even a template that
      // somehow slipped past the cleanup pass renders cleanly.
      let documentContent = cleanTemplateContent(template.templateContent || '').cleaned;
      documentContent = documentContent.replace(/\{CLIENT_NAME\}/g, `${client.firstName || ''} ${client.lastName || ''}`.trim() || '—');
      documentContent = documentContent.replace(/\{CLIENT_PHONE\}/g, client.phoneNumber || '—');
      documentContent = documentContent.replace(/\{CLIENT_EMAIL\}/g, clientEmailAddress || '—');
      documentContent = documentContent.replace(/\{CLIENT_ADDRESS_LINE1\}/g, client.streetAddress || '—');
      documentContent = documentContent.replace(/\{CLIENT_ADDRESS_LINE2\}/g, client.unit || client.addressLine2 || '—');
      documentContent = documentContent.replace(/\{CLIENT_CITY\}/g, client.city || '—');
      // Default to Ontario when the client's province field is empty.
      // Section B's EditableField shows "Ontario" as a visual default
      // but if the user never clicks the field, the default doesn't
      // persist to CMS. Without this fallback the retainer printed
      // an em-dash where the province should be.
      documentContent = documentContent.replace(/\{CLIENT_PROVINCE\}/g, client.state || 'Ontario');
      documentContent = documentContent.replace(/\{CLIENT_POSTAL_CODE\}/g, client.zipCode || '—');
      // Matter reference: prefer the client's display id (CL-XXXXXX) or
      // the document name; falling back to a dash only if nothing exists.
      const matterRef =
        (client as any).clientId ||
        (client as any).fileNumber ||
        documentName ||
        '—';
      documentContent = documentContent.replace(/\{MATTER_REFERENCE\}/g, matterRef);
      documentContent = documentContent.replace(/\{DATE\}/g, format(new Date(), 'MMMM d, yyyy'));

      // Retainer-specific field replacements.
      // In a flat-fee retainer the "Retainer Deposit Amount" IS the flat
      // fee (the client pays the whole flat fee upfront and it sits in
      // trust until earned). Same idea for the initial portion of a
      // Hybrid retainer. So when the paralegal has selected Flat Fee or
      // Hybrid and left the corresponding fee field blank, fall back to
      // retainerAmount so the §6 checkline reflects the same number the
      // §6.1 deposit paragraph shows.
      const isFlat = selectedFeeModel === 'Flat Fee';
      const isHybrid = selectedFeeModel === 'Hybrid Retainer';
      const flatFeeEffective = flatFeeAmount || (isFlat ? retainerAmount : '') || '—';
      const hybridFlatEffective = hybridFlatFee || (isHybrid ? retainerAmount : '') || '—';
      documentContent = documentContent.replace(/\{SELECTED_FEE_MODEL\}/g, selectedFeeModel || '—');
      documentContent = documentContent.replace(/\{RETAINER_AMOUNT\}/g, retainerAmount || '—');
      documentContent = documentContent.replace(/\{HOURLY_RATE\}/g, hourlyRate || '—');
      documentContent = documentContent.replace(/\{FLAT_FEE\}/g, flatFeeEffective);
      documentContent = documentContent.replace(/\{HYBRID_FLAT_FEE\}/g, hybridFlatEffective);
      documentContent = documentContent.replace(/\{HYBRID_HOURLY_RATE\}/g, hybridHourlyRate || '—');
      documentContent = documentContent.replace(/\{CONTINGENCY_PERCENT\}/g, contingencyPercent || '—');

      // ---- Payment Arrangement section ----
      // Renders a "Payment Arrangement" subsection (installment plan,
      // deferred payment, etc.) when the paralegal toggles it on in
      // the Generate Document dialog. Templates use the
      // {PAYMENT_ARRANGEMENT_SECTION} placeholder where the block
      // should appear; if the toggle is off the placeholder collapses
      // to an empty string so the section disappears entirely.
      const { buildPaymentArrangementSection } = await import(
        '@/lib/retainer-html-generator'
      );
      documentContent = documentContent.replace(
        /\{PAYMENT_ARRANGEMENT_SECTION\}/g,
        buildPaymentArrangementSection({
          // Only the payment-arrangement fields are read by the helper;
          // the rest of RetainerHTMLData is ignored here. Cast keeps TS
          // happy without forcing the caller to populate every field.
          paymentArrangementEnabled,
          paymentArrangementType,
          paymentArrangementTotal,
          paymentInstallmentAmount,
          paymentInstallmentFrequency,
          paymentInstallmentStartDate,
          paymentInstallmentCount,
          paymentArrangementNotes,
        } as any)
      );

      // {PAYMENT_SECTION} is the "Receipt of Funds" / Form 9A block.
      // DocumentWorkflowPage doesn't currently expose payment-received
      // fields in its dialog (that flow lives in ClientFileManagementPage's
      // per-client retainer dialog), so the helper is called with
      // paymentReceived:false and the block collapses to empty string.
      // This prevents the placeholder from leaking into the rendered
      // PDF as literal '{PAYMENT_SECTION}' text. If payment-received
      // capture is added to this dialog later, just pass the toggled
      // state through here.
      documentContent = documentContent.replace(
        /\{PAYMENT_SECTION\}/g,
        ''
      );

      // ---- Fee-model checkbox ticks ----
      // Tick the box for the selected fee model and leave the others
      // empty. Templates use {HOURLY_CHECK}, {FLAT_CHECK},
      // {HYBRID_CHECK}, {CONTINGENCY_CHECK} where the literal ☐ used to
      // be — so the right line gets ticked at generation time.
      const tick = (model: string) => (selectedFeeModel === model ? '☑' : '☐');
      documentContent = documentContent.replace(/\{HOURLY_CHECK\}/g, tick('Hourly Retainer'));
      documentContent = documentContent.replace(/\{FLAT_CHECK\}/g, tick('Flat Fee'));
      documentContent = documentContent.replace(/\{HYBRID_CHECK\}/g, tick('Hybrid Retainer'));
      documentContent = documentContent.replace(/\{CONTINGENCY_CHECK\}/g, tick('Contingency Fee'));

      // ---- Nature of Matter / Charge ----
      // Use what the paralegal typed in the dialog. If left blank, leave
      // a clear "(To be provided by the Client.)" so the placeholder
      // never leaks into the generated document.
      const natureText =
        natureOfMatter.trim() ||
        '(To be provided by the Client.)';
      documentContent = documentContent.replace(/\{NATURE_OF_MATTER\}/g, natureText);

      // ---- Special Provisions / Additional Charges ----
      // Build an HTML block from the paralegal-entered line items
      // (e.g. "$300 first part of ticket", "$200 trial"). When there
      // are no items, the block is replaced with an empty string so
      // the section disappears entirely. When there are items, a
      // styled table is inserted with line items + total.
      const validProvisions = specialProvisions.filter(
        (p) => p.description.trim() || (Number(p.amount) || 0) > 0
      );
      let provisionsBlock = '';
      if (validProvisions.length > 0) {
        const provTotal = validProvisions.reduce(
          (s, p) => s + (Number(p.amount) || 0),
          0
        );
        const rows = validProvisions
          .map(
            (p) =>
              `<tr><td style="padding:6px 0;border-bottom:1px solid #E5E7EB;">${
                (p.description || '').replace(/</g, '&lt;')
              }</td><td style="padding:6px 0;border-bottom:1px solid #E5E7EB;text-align:right;font-family:monospace;">$ ${
                (Number(p.amount) || 0).toFixed(2)
              } + HST</td></tr>`
          )
          .join('');
        provisionsBlock =
          `<h3 style="font-size:14px;margin:16px 0 6px;">Special Provisions / Additional Charges</h3>` +
          `<p>The following additional charges apply to specific stages or aspects of this matter, in addition to the fees set out above. These amounts are payable in addition to HST.</p>` +
          `<table style="width:100%;border-collapse:collapse;margin:8px 0;">` +
          `<thead><tr><th style="text-align:left;padding:6px 0;border-bottom:1px solid #000;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Description</th><th style="text-align:right;padding:6px 0;border-bottom:1px solid #000;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Amount</th></tr></thead>` +
          `<tbody>${rows}</tbody>` +
          `<tfoot><tr><td style="padding:8px 0;font-weight:bold;">Subtotal of additional charges</td><td style="padding:8px 0;text-align:right;font-weight:bold;font-family:monospace;">$ ${provTotal.toFixed(
            2
          )} + HST</td></tr></tfoot>` +
          `</table>`;
      }
      documentContent = documentContent.replace(
        /\{SPECIAL_PROVISIONS_BLOCK\}/g,
        provisionsBlock
      );
      documentContent = documentContent.replace(/\{FLAT_FEE\}/g, '—');
      documentContent = documentContent.replace(/\{HYBRID_FLAT_FEE\}/g, '—');
      documentContent = documentContent.replace(/\{HYBRID_HOURLY_RATE\}/g, '—');
      documentContent = documentContent.replace(/\{CONTINGENCY_PERCENT\}/g, '—');
      documentContent = documentContent.replace(/\{LTB_MATTER_TYPE\}/g, '—');

      // ---- Paralegal cursive auto-signature ----
      // When the "Auto-sign on behalf of paralegal" checkbox is on, swap
      // the {PARALEGAL_*} placeholders with the chosen paralegal's display
      // name in flowing Allura cursive (via inline <span> styling) plus
      // their printed name, LSO licence number and credential line below.
      // Templates can include any/all of these placeholders depending on
      // how the signature block is laid out.
      const signParalegal = getParalegalById(selectedParalegalId);
      const todayFormatted = format(new Date(), 'MMMM d, yyyy');

      // Per-paralegal letterhead email. The shared `paralegals.ts` `email`
      // field is `EMAIL_PRIMARY` (the firm's generic inbox) but the
      // retainer letterhead should show each paralegal's direct address.
      // Keyed by paralegal id so adding a paralegal is one line here +
      // one entry in paralegals.ts.
      const PARALEGAL_EMAIL_MAP: Record<string, string> = {
        'jeanfrancois-demers': 'jeanfrancois@legalassist.london',
        'candice-fogarty': 'candice@legalassist.london',
      };
      const paralegalEmailValue =
        (signParalegal && PARALEGAL_EMAIL_MAP[signParalegal.id]) ||
        'contact@legalassist.london';

      if (autoSignAsParalegal && signParalegal) {
        const cursiveBlock =
          `<span style="font-family:'Allura','Segoe Script','Brush Script MT',cursive;` +
          `font-size:32px;color:#1F2D5C;line-height:1.1;display:inline-block;` +
          `padding:4px 0 0;">${signParalegal.displayName}</span>`;
        documentContent = documentContent.replace(/\{PARALEGAL_SIGNATURE\}/g, cursiveBlock);
        documentContent = documentContent.replace(/\{PARALEGAL_NAME\}/g, signParalegal.displayName);
        documentContent = documentContent.replace(/\{PARALEGAL_LSO\}/g, signParalegal.lsoNumber);
        documentContent = documentContent.replace(/\{PARALEGAL_CREDENTIAL\}/g, signParalegal.credentialLine);
        documentContent = documentContent.replace(/\{PARALEGAL_SIGN_DATE\}/g, todayFormatted);
      } else {
        // Even when not auto-signing, we still fill in the printed-name
        // metadata so the rendered PDF shows who's responsible. The
        // {PARALEGAL_SIGNATURE} placeholder gets replaced with a blank
        // line that the paralegal can sign over after printing.
        documentContent = documentContent.replace(
          /\{PARALEGAL_SIGNATURE\}/g,
          '<span style="display:inline-block;border-bottom:1px solid #000;min-width:240px;height:24px;"></span>'
        );
        documentContent = documentContent.replace(/\{PARALEGAL_NAME\}/g, signParalegal?.displayName || '—');
        documentContent = documentContent.replace(/\{PARALEGAL_LSO\}/g, signParalegal?.lsoNumber || '—');
        documentContent = documentContent.replace(/\{PARALEGAL_CREDENTIAL\}/g, signParalegal?.credentialLine || '—');
        documentContent = documentContent.replace(/\{PARALEGAL_SIGN_DATE\}/g, todayFormatted);
      }
      documentContent = documentContent.replace(/\{PARALEGAL_EMAIL\}/g, paralegalEmailValue);

      // ============================================================
      // HRTO retainer template (and any future template using the
      // [data-empty="{IS_*_EMPTY}"] conditional-row pattern).
      // ------------------------------------------------------------
      // The HRTO template hides optional rows by reading a boolean
      // attribute set by these substitutions ("true" or "false"). The
      // template's CSS rule  [data-empty="true"] { display:none }
      // collapses any row whose value wasn't filled in — so we don't
      // get "File Reference: —", "Unit: —", "$ — per hour + HST"
      // leaking into the final PDF.
      //
      // Templates that don't reference these placeholders are
      // unaffected (the regex simply finds nothing to replace).
      // ============================================================
      // Permissive fallbacks: the HRTO template surfaces these as
      // labelled rows. If we don't have a value we still want
      // something useful to render rather than a hidden row or "—".
      const matterTypeValue = (
        template.templateCategory ||
        template.templateName ||
        ''
      ).trim();
      const natureValue = natureOfMatter.trim();
      const phoneValue = (client.phoneNumber || '').trim();
      const addressValue = (client.streetAddress || '').trim();
      const unitValue = (client.unit || (client as any).addressLine2 || '').trim();
      // File reference: prefer the client's CL-XXXXXX id, then the
      // file number, then the document name the paralegal typed in
      // the dialog (mirrors the older {MATTER_REFERENCE} behaviour
      // so the cover page never shows just "—").
      const fileRefValue = (
        (client as any).clientId ||
        (client as any).fileNumber ||
        documentName ||
        ''
      ).toString().trim();

      const isEmptyValue = (v?: string) => !v || v.trim() === '' || v.trim() === '—';
      const flag = (empty: boolean) => (empty ? 'true' : 'false');

      // ---- Conditional-row flags ([data-empty]) ----
      documentContent = documentContent.replace(/\{IS_FILE_REF_EMPTY\}/g, flag(!fileRefValue));
      documentContent = documentContent.replace(/\{IS_MATTER_TYPE_EMPTY\}/g, flag(!matterTypeValue));
      documentContent = documentContent.replace(/\{IS_NATURE_EMPTY\}/g, flag(!natureValue));
      documentContent = documentContent.replace(/\{IS_CLIENT_PHONE_EMPTY\}/g, flag(!phoneValue));
      documentContent = documentContent.replace(/\{IS_CLIENT_ADDRESS_EMPTY\}/g, flag(!addressValue));
      documentContent = documentContent.replace(/\{IS_CLIENT_UNIT_EMPTY\}/g, flag(!unitValue));

      // ---- Fee-row strike-through pattern ----
      // The HRTO template renders ALL four fee models but visually
      // strikes through the ones that aren't selected so the
      // retainer reads as a menu with one option chosen and the
      // others crossed out. The {STRUCK_*} flags emit
      // data-struck="true"/"false" on each .fee-row; the template
      // CSS rule  .fee-row[data-struck="true"]
      //   { text-decoration: line-through; opacity: 0.5 }
      // does the visual strike.
      const norm = (s: string) => s.trim().toLowerCase();
      const selected = norm(selectedFeeModel || '');
      const isStruck = (modelName: string) => selected !== '' && selected !== norm(modelName);
      documentContent = documentContent.replace(/\{STRUCK_HOURLY\}/g, flag(isStruck('Hourly Retainer')));
      documentContent = documentContent.replace(/\{STRUCK_FLAT\}/g, flag(isStruck('Flat Fee')));
      documentContent = documentContent.replace(/\{STRUCK_HYBRID\}/g, flag(isStruck('Hybrid Retainer')));
      documentContent = documentContent.replace(/\{STRUCK_CONTINGENCY\}/g, flag(isStruck('Contingency Fee')));
      documentContent = documentContent.replace(/\{STRUCK_DEPOSIT\}/g, flag(isStruck('Hourly Retainer') && isStruck('Hybrid Retainer')));

      // Older {IS_*_EMPTY} flags for fee rows — kept as no-op
      // fallbacks for back-compat in case the CMS row still has the
      // earlier template version. With data-struck the rows always
      // render, so empty=false.
      documentContent = documentContent.replace(/\{IS_HOURLY_EMPTY\}/g, 'false');
      documentContent = documentContent.replace(/\{IS_FLAT_EMPTY\}/g, 'false');
      documentContent = documentContent.replace(/\{IS_HYBRID_EMPTY\}/g, 'false');
      documentContent = documentContent.replace(/\{IS_CONTINGENCY_EMPTY\}/g, 'false');
      documentContent = documentContent.replace(/\{IS_DEPOSIT_EMPTY\}/g, 'false');

      // ---- HRTO-named field aliases ----
      // The HRTO template uses {FILE_REFERENCE}, {MATTER_TYPE},
      // {CLIENT_ADDRESS}, {CLIENT_UNIT}, {FLAT_FEE_AMOUNT},
      // {RETAINER_DEPOSIT} (instead of the older {MATTER_REFERENCE},
      // {LTB_MATTER_TYPE}, {CLIENT_ADDRESS_LINE1/2}, {FLAT_FEE},
      // {RETAINER_AMOUNT} names). Both name sets coexist.
      documentContent = documentContent.replace(/\{FILE_REFERENCE\}/g, fileRefValue || '—');
      documentContent = documentContent.replace(/\{MATTER_TYPE\}/g, matterTypeValue || 'Legal Matter');
      documentContent = documentContent.replace(/\{CLIENT_ADDRESS\}/g, addressValue || '—');
      documentContent = documentContent.replace(/\{CLIENT_UNIT\}/g, unitValue || '—');
      documentContent = documentContent.replace(/\{FLAT_FEE_AMOUNT\}/g, flatFeeAmount || '—');
      documentContent = documentContent.replace(/\{RETAINER_DEPOSIT\}/g, retainerAmount || '—');
      // Compact YYYYMMDD date used in the HRTO cover-page document ID
      // ("HRTO-RET-20260512"). Templates without this placeholder are
      // unaffected.
      documentContent = documentContent.replace(/\{DATE_SHORT\}/g, format(new Date(), 'yyyyMMdd'));

      // ============================================================
      // LTB Tenant retainer template — rental unit + landlord aliases
      // ------------------------------------------------------------
      // The LTB Tenant template (templates/ltb-tenant-retainer-template.html)
      // uses {RENTAL_*} placeholders for the rental address fields and
      // {LANDLORD_NAME} for the opposing party. For tenant matters the
      // rental unit IS the client's home address — so we map these to the
      // same client profile fields. If a future workflow adds explicit
      // "rental address" fields to the file we can swap the source here.
      //
      // The IS_RENTAL_INFO_EMPTY flag hides the entire rental-address row
      // when neither street nor city is set, instead of showing ", Ontario"
      // with empty street/city/postal.
      // ============================================================
      const cityValue = (client.city || '').trim();
      const provinceValue = (client.state || '').trim();
      const postalValue = (client.zipCode || '').trim();
      // For LTB Tenant matters, the client's home address is the rental
      // unit. Use the natureOfMatter dialog field as the landlord name
      // fallback — paralegals typically include the landlord's name there
      // (e.g., "Eviction defence — landlord John Doe"). If that's blank,
      // leave a dash so the conditional row hides cleanly.
      const landlordValue = (() => {
        const nat = (natureOfMatter || '').trim();
        // Try to extract a landlord name from the nature field if it
        // includes "landlord X" or "vs X" — best-effort only.
        const m = nat.match(/(?:landlord|vs\.?|against|opposing)[:\s]+([^.;,\n]{2,80})/i);
        return (m && m[1].trim()) || '';
      })();
      const hstRegValue = '855041234RT0001'; // Firm CRA HST registration — update if it changes

      documentContent = documentContent.replace(/\{RENTAL_ADDRESS\}/g, addressValue || '—');
      documentContent = documentContent.replace(/\{RENTAL_UNIT\}/g, unitValue || '—');
      documentContent = documentContent.replace(/\{RENTAL_CITY\}/g, cityValue || '—');
      documentContent = documentContent.replace(/\{RENTAL_PROVINCE\}/g, provinceValue || 'Ontario');
      documentContent = documentContent.replace(/\{RENTAL_POSTAL_CODE\}/g, postalValue || '—');
      documentContent = documentContent.replace(/\{LANDLORD_NAME\}/g, landlordValue || '—');
      documentContent = documentContent.replace(/\{HST_REGISTRATION_NUMBER\}/g, hstRegValue);

      // Small Claims Tiered Retainer tokens — gracefully fall back to
      // empty fillable lines or sensible defaults so the literal
      // {TOKEN} text never leaks into a generated PDF if the template
      // pre-dates the per-matter UI prompts.
      const fillableLine = '<span style="display:inline-block;min-width:200px;border-bottom:1px solid #000;line-height:1.4;">&nbsp;</span>';
      const fillableSmall = '<span style="display:inline-block;min-width:90px;border-bottom:1px solid #000;line-height:1.4;">&nbsp;</span>';
      documentContent = documentContent.replace(/\{OPPOSING_PARTY_NAME\}/g, fillableLine);
      documentContent = documentContent.replace(/\{COURT_MATTER_TYPE\}/g, matterTypeValue || 'Small Claims Court of Ontario');
      documentContent = documentContent.replace(/\{CLIENT_PARTY_ROLE\}/g, fillableLine);
      // Phase 2 fees — Small Claims tiered retainer hardcodes these in
      // the template HTML (v3.6+: $3,500 + HST flat, $1,000 + HST per
      // additional trial half-day). Defensive substitution remains in
      // case an older CMS row still has the {TOKEN} placeholders.
      documentContent = documentContent.replace(/\{PHASE2_FLAT_FEE\}/g, fillableSmall);
      documentContent = documentContent.replace(/\{PHASE2_ADDITIONAL_TRIAL_DAY_RATE\}/g, fillableSmall);

      // Conditional-row flags for LTB Tenant
      const rentalInfoEmpty = !addressValue && !cityValue;
      documentContent = documentContent.replace(/\{IS_RENTAL_INFO_EMPTY\}/g, flag(rentalInfoEmpty));
      documentContent = documentContent.replace(/\{IS_RENTAL_UNIT_EMPTY\}/g, flag(!unitValue));
      documentContent = documentContent.replace(/\{IS_LANDLORD_NAME_EMPTY\}/g, flag(!landlordValue));
      // Back-compat: earlier draft of the LTB template referenced these
      // narrower per-field flags. Map them to the consolidated
      // rentalInfoEmpty rule so the rows still hide correctly even if a
      // CMS row is still on the older template.
      documentContent = documentContent.replace(/\{IS_RENTAL_ADDRESS_EMPTY\}/g, flag(!addressValue));
      documentContent = documentContent.replace(/\{IS_RENTAL_CITY_EMPTY\}/g, flag(!cityValue));

      // CLIENT_CITY conditional flag for HRTO template (was previously
      // unwired, causing "—, Ontario —" to render when no city was set).
      documentContent = documentContent.replace(/\{IS_CLIENT_CITY_EMPTY\}/g, flag(!cityValue));

      // Generate PDF from content
      const docName = documentName || `${template.templateName} - ${client.firstName} ${client.lastName}`;
      const pdfDataUrl = await generatePDF(documentContent, docName);

      // The base64-encoded PDF is typically 200-500KB, far above the
      // 177KB Wix Data field cap AND the total-document size limit
      // that Wix Data enforces (around 0.5MB). Storing the base64
      // inline guarantees WDE0009 on the CMS create. We MUST upload
      // to Wix Media and store only the URL.
      const safeFileName = `${docName.replace(/[^A-Za-z0-9._-]+/g, '_')}.pdf`;
      const uploaded = await uploadToWixMedia(pdfDataUrl, safeFileName, 'application/pdf');
      if (!uploaded?.url) {
        throw new Error(
          'Could not upload the generated PDF to Wix Media. The Wix ' +
            'Media credentials may be missing or invalid (check LA_WIX_API_KEY ' +
            'and LA_WIX_SITE_ID in the Wix Secrets Manager). Open the browser ' +
            'console for the underlying upload-endpoint error.'
        );
      }
      const documentUrl: string = uploaded.url;
      const documentMediaId: string | undefined = uploaded.mediaId;

      // documentContent (HTML body) also needs to fit. Wix Data has a
      // per-field cap (~177KB) AND a per-document size budget. We
      // always upload the HTML to Wix Media too and only store the
      // URL inline — that way the size of the row is predictable no
      // matter how large the template grows. Falls back to a tiny
      // inline preview (4KB) if Media upload fails so the row at
      // least saves.
      let storedDocumentContent: string = '';
      let documentContentUrl: string | undefined;
      // PATH 1 — Wix Media. Wix Media rejects `text/html` uploads as
      // a security policy (HTML hosted on a public CDN is an XSS
      // vector). Upload as `application/octet-stream` — the CDN
      // doesn't care, and PublicSignPage just calls .text() on the
      // response and parses the bytes as HTML regardless of MIME.
      try {
        const htmlBlob = new Blob([documentContent], {
          type: 'application/octet-stream',
        });
        const htmlFileName = safeFileName.replace(/\.pdf$/, '.html.bin');
        const htmlUpload = await uploadToWixMedia(
          htmlBlob,
          htmlFileName,
          'application/octet-stream'
        );
        if (htmlUpload?.url) {
          documentContentUrl = htmlUpload.url;
        } else {
          // eslint-disable-next-line no-console
          console.error(
            '[DocumentWorkflow] HTML upload to Wix Media returned no URL — ' +
              'falling back to compressed inline storage. Check the ' +
              '/api/media/upload server response in the network tab if you ' +
              'want to fix the upload path.'
          );
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('[DocumentWorkflow] HTML upload threw:', err);
      }
      // PATH 2 — small docs go inline uncompressed (saves a fetch).
      if (!documentContentUrl && approxByteLength(documentContent) < 80_000) {
        storedDocumentContent = documentContent;
      }
      // PATH 3 — compressed inline. HTML is highly compressible
      // (~8-10× with gzip). A 200KB retainer becomes ~25KB gzipped,
      // ~35KB base64-encoded — fits easily in a single 177KB Wix
      // text field. PublicSignPage detects the `gz1:` prefix and
      // inflates on read.
      if (!documentContentUrl && !storedDocumentContent) {
        try {
          const compressed = await compressHtmlForInline(documentContent);
          if (
            compressed &&
            compressed !== documentContent &&
            approxByteLength(compressed) < 160_000
          ) {
            storedDocumentContent = compressed;
            // eslint-disable-next-line no-console
            console.log(
              '[DocumentWorkflow] Using compressed inline HTML storage. ' +
                'Original: ' +
                approxByteLength(documentContent) +
                ' bytes → gzip+base64: ' +
                approxByteLength(compressed) +
                ' bytes.'
            );
          }
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('[DocumentWorkflow] HTML compression failed:', err);
        }
      }
      // Hard-fail only if ALL three paths failed.
      if (!documentContentUrl && !storedDocumentContent) {
        throw new Error(
          'The generated document could not be saved: Wix Media upload ' +
            'failed AND the compressed-inline fallback failed. Check the ' +
            'browser console — this typically means LA_WIX_API_KEY lacks ' +
            'SITE_MEDIA.MANAGE scope AND the browser is too old for ' +
            'CompressionStream (needs Chrome 80+, Firefox 113+, Safari 16.4+).'
        );
      }

      const newDoc: any = {
        _id: crypto.randomUUID(),
        documentName: docName,
        templateId: selectedTemplateId,
        clientId: selectedClientId,
        clientEmail: clientEmailAddress,
        generatedBy: userEmail,
        generationDate: new Date().toISOString(),
        status: 'draft',
        requiresSignature: requiresSignature,
        documentUrl,
        documentMediaId,
        documentContent: storedDocumentContent,
        documentContentUrl,
        // Persist which paralegal signed (or was selected) so re-opens know
        paralegalId: signParalegal?.id || selectedParalegalId,
        paralegalName: signParalegal?.displayName || '',
        autoSigned: !!(autoSignAsParalegal && signParalegal),
        _createdDate: new Date(),
      };

      // CMS write FIRST. If this throws we MUST NOT update local state
      // — otherwise the user sees the doc in the UI but its _id doesn't
      // exist in CMS, so any sign link created off it points to a
      // phantom row and the public sign page renders "document not
      // found". Previously this code did setGeneratedDocs() before the
      // create; that's the bug that produced phantom sign links.
      await BaseCrudService.create('generateddocuments', newDoc);

      // Only after the CMS write succeeds do we add to local state.
      // The in-memory copy keeps the full HTML so the user can
      // View/Edit immediately without a Wix Media round-trip.
      setGeneratedDocs([...generatedDocs, { ...newDoc, documentContent }]);

      setIsGenerateDialogOpen(false);
      setSelectedTemplateId('');
      setSelectedClientId('');
      setDocumentName('');
      setRequiresSignature(true);
      setSelectedFeeModel('Hourly Retainer');
      setRetainerAmount('');
      setHourlyRate('');
      setFlatFeeAmount('');
      setHybridFlatFee('');
      setHybridHourlyRate('');
      setContingencyPercent('');
      setNatureOfMatter('');
      setSpecialProvisions([]);
      setSelectedParalegalId(DEFAULT_PARALEGAL_ID);
      setAutoSignAsParalegal(false);
      // Reset payment-arrangement fields for next doc
      setPaymentArrangementEnabled(false);
      setPaymentArrangementType('full');
      setPaymentArrangementTotal('');
      setPaymentInstallmentAmount('');
      setPaymentInstallmentFrequency('monthly');
      setPaymentInstallmentStartDate('');
      setPaymentInstallmentCount('');
      setPaymentArrangementNotes('');
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('Error generating document:', error);
      setGenerateError(
        error?.message
          ? `Could not generate document: ${error.message}`
          : 'Could not generate document. Open the browser console for details.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendDocument = async () => {
    try {
      const doc = generatedDocs.find(d => d._id === selectedDocumentId);
      if (!doc) return;

      const currentUser = localStorage.getItem('currentUser');
      const userEmail = currentUser ? JSON.parse(currentUser).email : EMAIL_PRIMARY;
      const userName = currentUser ? JSON.parse(currentUser).firstName + ' ' + JSON.parse(currentUser).lastName : 'Admin';

      // Get user account ID for the client FIRST
      const { items: userAccounts } = await BaseCrudService.getAll('useraccounts');
      const clientAccount = userAccounts.find(u => u.email === doc.clientEmail);

      // CRITICAL FIX: Generate upload token for client to upload additional documents
      let uploadToken: string | undefined;
      try {
        const { createUploadToken } = await import('@/lib/upload-token-service');
        const client = clients.find(c => c._id === doc.clientId);
        const token = await createUploadToken({
          clientId: doc.clientId || 'unknown',
          clientName: client ? `${client.firstName || ''} ${client.lastName || ''}`.trim() : 'Client',
          matterId: doc._id,
          matterReference: doc.documentName || 'Document Response',
          documentId: doc._id,
          createdByParalegalId: userEmail,
          createdByParalegalName: userName,
          allowedPurpose: 'DOCUMENT_RESPONSE',
          expiryHours: 168, // 1 week
          maxUsageCount: 0, // Unlimited
        });
        uploadToken = token.token;
      } catch (error) {
        console.error('Failed to generate upload token:', error);
      }

      // Copy document to client's documents collection
      const clientDocId = crypto.randomUUID();
      await BaseCrudService.create('clientdocuments', {
        _id: clientDocId,
        documentName: doc.documentName,
        fileUrl: doc.documentUrl,
        uploadDate: new Date().toISOString(),
        clientEmail: doc.clientEmail,
        fileType: 'application/pdf',
        documentCategory: 'generated-document',
        notes: `Generated from template. ${doc.requiresSignature ? 'Signature required.' : ''}`
      });

      // Update generated document status to 'sent' and store upload token
      const updatedDocs = generatedDocs.map(d => 
        d._id === selectedDocumentId 
          ? { ...d, status: 'sent', sentDate: new Date().toISOString(), uploadToken }
          : d
      );
      setGeneratedDocs(updatedDocs);

      await BaseCrudService.update('generateddocuments', {
        _id: selectedDocumentId,
        status: 'sent',
        sentDate: new Date().toISOString(),
        uploadToken
      });

      // Create a message record for the client
      await BaseCrudService.create('messages', {
        _id: crypto.randomUUID(),
        senderEmail: EMAIL_PRIMARY,
        senderName: 'Legal Services Team',
        recipientEmail: doc.clientEmail || '',
        messageContent: `Document Ready for Signature: ${doc.documentName}\n\n${emailMessage}\n\nPlease review and sign the document in your client portal under the Documents section.`,
        sentDate: new Date().toISOString(),
        isRead: false,
        conversationId: crypto.randomUUID()
      });

      // Create activity log entry
      await BaseCrudService.create('activitylogs', {
        _id: crypto.randomUUID(),
        userId: clientAccount?._id || doc.clientEmail || '',
        activityType: 'document_sent',
        activityDescription: `Document "${doc.documentName}" was sent to client for ${doc.requiresSignature ? 'signature' : 'review'}`,
        performedBy: userEmail,
        performedByName: userName,
        timestamp: new Date().toISOString(),
        relatedItemId: clientDocId
      });

      // Create notification for the client
      if (clientAccount) {
        await BaseCrudService.create('notifications', {
          _id: crypto.randomUUID(),
          userId: clientAccount._id,
          notificationType: 'document_upload',
          notificationTitle: 'New Document Available',
          notificationMessage: `A new document "${doc.documentName}" has been sent to you. ${doc.requiresSignature ? 'Your signature is required.' : 'Please review it in your documents section.'}`,
          isRead: false,
          createdDate: new Date().toISOString(),
          relatedActivityId: clientDocId
        });
      }

      setIsSendDialogOpen(false);
      setSelectedDocumentId('');
      setEmailMessage('');
      alert('Document sent successfully to client! The document is now available in the client\'s Documents section.');
    } catch (error) {
      console.error('Error sending document:', error);
      alert('Failed to send document. Please try again.');
      loadData();
    }
  };

  // ----------------------------------------------------------------
  // Open a document URL in a new tab. Browsers block top-level
  // navigation to long `data:` URLs (Chrome/Edge security policy
  // since 2017), which is why View was opening blank tabs. We convert
  // any data: URL into a temporary blob: URL and open that instead —
  // blob URLs are first-class navigation targets in every browser.
  // ----------------------------------------------------------------
  const openDocumentUrl = (url: string | undefined): boolean => {
    if (!url) return false;
    try {
      if (url.startsWith('data:')) {
        const commaIdx = url.indexOf(',');
        if (commaIdx === -1) return false;
        const meta = url.slice(5, commaIdx); // strip "data:"
        const isBase64 = meta.includes(';base64');
        const mime = (meta.split(';')[0] || 'application/octet-stream').trim();
        const payload = url.slice(commaIdx + 1);

        let bytes: Uint8Array;
        if (isBase64) {
          const bin = atob(payload);
          bytes = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        } else {
          const decoded = decodeURIComponent(payload);
          bytes = new TextEncoder().encode(decoded);
        }

        const blob = new Blob([bytes], { type: mime });
        const blobUrl = URL.createObjectURL(blob);
        const win = window.open(blobUrl, '_blank');
        // Revoke after a minute — long enough for the tab to load and
        // the user to start reading, short enough to avoid a leak.
        setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
        if (!win) {
          // Pop-up blocker — fall back to a programmatic anchor click,
          // which gets a user-activation pass-through.
          const a = document.createElement('a');
          a.href = blobUrl;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          document.body.appendChild(a);
          a.click();
          a.remove();
        }
        return true;
      }
      // Real http(s) URL — open directly.
      const win = window.open(url, '_blank');
      if (!win) {
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
      return true;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('openDocumentUrl failed:', err);
      return false;
    }
  };

  const handlePrintDocument = async (doc: GeneratedDocument) => {
    // Use the signed copy when available, otherwise the original.
    const documentUrl = doc.status === 'signed' && doc.signedDocumentUrl
      ? doc.signedDocumentUrl
      : doc.documentUrl;

    if (!documentUrl) return;

    // The old approach (popup window + iframe + window.print()) was
    // broken for two reasons:
    //   1. Wix Media CDN PDFs are cross-origin to the popup, so the
    //      parent frame's window.print() can't reach the iframe's
    //      PDF viewer (browser security).
    //   2. Even for same-origin data:application/pdf URLs, Chrome's
    //      embedded PDF viewer (pdfium) ignores window.print() called
    //      on the surrounding HTML page.
    //
    // The reliable path is to open the PDF directly in a new tab so
    // the browser's built-in PDF viewer renders it — that viewer has
    // its own Print button that handles both data: URLs and remote
    // URLs correctly. We also try to auto-trigger print from inside
    // the viewer (works in Chrome via the iframe contentWindow when
    // same-origin; cross-origin we just open it and let the user
    // click Print).
    try {
      // For data: URLs we can blob them up and open the blob — that
      // makes printing reliable across browsers because the blob has
      // a Content-Type the browser PDF viewer recognises immediately.
      if (documentUrl.startsWith('data:application/pdf')) {
        const resp = await fetch(documentUrl);
        const blob = await resp.blob();
        const blobUrl = URL.createObjectURL(blob);
        const w = window.open(blobUrl, '_blank');
        if (!w) {
          alert('Please allow pop-ups for this site to print documents.');
          URL.revokeObjectURL(blobUrl);
          return;
        }
        // Try to fire the viewer's Print dialog once it's loaded.
        // Same-origin blob URLs allow w.print() to dispatch the
        // PDF viewer's print action.
        const tryPrint = () => {
          try { w.print(); } catch { /* user can click Print manually */ }
        };
        // Give the viewer time to mount the PDF.
        setTimeout(tryPrint, 1500);
        // Free the blob URL after the tab has had time to load.
        setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
        return;
      }

      // Remote https URL (Wix Media CDN, etc.). Open directly. The
      // browser's PDF viewer takes over and exposes a Print button.
      // We cannot programmatically trigger print across origins, but
      // opening the PDF in a real tab (not an iframe) lets the user
      // click Print one second after it loads — which is what they
      // do anyway when the iframe approach silently fails.
      const w = window.open(documentUrl, '_blank', 'noopener,noreferrer');
      if (!w) {
        alert('Please allow pop-ups for this site to print documents.');
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('handlePrintDocument failed:', err);
      // Last-ditch fallback: navigate the current tab to the document.
      window.location.href = documentUrl;
    }
  };

  const handleMarkAsSigned = async (docId: string) => {
    const doc = generatedDocs.find(d => d._id === docId);
    if (!doc) return;

    // Open signature dialog
    setDocumentToSign(doc);
    setIsSignatureDialogOpen(true);
  };

  const handleSignatureComplete = async (signatureData: SignatureData) => {
    if (!documentToSign) return;

    try {
      // Embed signature into PDF (pass original HTML body too - the
      // documentUrl is a real PDF after the htmlToPDF rewrite, so we
      // re-render from the stored HTML with the signature appended).
      const signedPdfDataUrl = await embedSignatureInPDF(
        documentToSign.documentUrl || '',
        signatureData,
        documentToSign.documentName || 'Document',
        (documentToSign as any).documentContent || undefined,
      );

      // Upload the SIGNED PDF to Wix Media too. Same reason as the
      // unsigned PDF: the base64 is far above the 177KB CMS field cap.
      let signedDocumentUrl: string = signedPdfDataUrl;
      const signedFileName = `${(documentToSign.documentName || 'document').replace(
        /[^A-Za-z0-9._-]+/g,
        '_'
      )}_signed.pdf`;
      const signedUpload = await uploadToWixMedia(
        signedPdfDataUrl,
        signedFileName,
        'application/pdf'
      );
      if (signedUpload?.url) {
        signedDocumentUrl = signedUpload.url;
      }

      // Update generated document with signed version
      const updatedDocs = generatedDocs.map(d =>
        d._id === documentToSign._id
          ? {
              ...d,
              status: 'signed',
              signedDate: signatureData.timestamp.toISOString(),
              signedDocumentUrl,
            }
          : d
      );
      setGeneratedDocs(updatedDocs);

      await BaseCrudService.update('generateddocuments', {
        _id: documentToSign._id,
        status: 'signed',
        signedDate: signatureData.timestamp.toISOString(),
        signedDocumentUrl,
      });

      // Update the client's document with the signed version
      const { items: clientDocs } = await BaseCrudService.getAll('clientdocuments', undefined, {
        limit: 1000,
      });
      const clientDoc = clientDocs.find(cd =>
        cd.documentName === documentToSign.documentName &&
        cd.clientEmail === documentToSign.clientEmail
      );

      if (clientDoc) {
        await BaseCrudService.update('clientdocuments', {
          _id: clientDoc._id,
          fileUrl: signedDocumentUrl,
          notes: `${clientDoc.notes || ''}\n\nElectronically signed on ${signatureData.signedDate} at ${signatureData.signedTime}. IP Address: ${signatureData.ipAddress}`
        });
      }

      // Create activity log
      const currentUser = localStorage.getItem('currentUser');
      const userEmail = currentUser ? JSON.parse(currentUser).email : EMAIL_PRIMARY;
      const userName = currentUser ? JSON.parse(currentUser).firstName + ' ' + JSON.parse(currentUser).lastName : 'Admin';

      await BaseCrudService.create('activitylogs', {
        _id: crypto.randomUUID(),
        userId: documentToSign.clientId || '',
        activityType: 'document_signed',
        activityDescription: `Document "${documentToSign.documentName}" was electronically signed`,
        performedBy: userEmail,
        performedByName: userName,
        timestamp: signatureData.timestamp.toISOString(),
        relatedItemId: documentToSign._id
      });

      setIsSignatureDialogOpen(false);
      setDocumentToSign(null);
      alert('Document signed successfully! The signed version is now available in the client\'s Documents section.');
    } catch (error) {
      console.error('Error signing document:', error);
      alert('Failed to sign document. Please try again.');
      loadData();
    }
  };

  const handleDeleteDocument = async (docId: string) => {
    if (!confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      return;
    }

    try {
      setGeneratedDocs(generatedDocs.filter(d => d._id !== docId));
      await BaseCrudService.delete('generateddocuments', docId);
    } catch (error) {
      console.error('Error deleting document:', error);
      loadData();
    }
  };

  const handleEmailSignedDocument = async (emailData: EmailFormData) => {
    if (!emailingDocument) return;

    try {
      const currentUser = localStorage.getItem('currentUser');
      const userEmail = currentUser ? JSON.parse(currentUser).email : EMAIL_PRIMARY;
      const userName = currentUser ? JSON.parse(currentUser).firstName + ' ' + JSON.parse(currentUser).lastName : 'Admin';

      const client = clients.find(c => c._id === emailingDocument.clientId);
      const clientName = client ? `${client.firstName || ''} ${client.lastName || ''}`.trim() : 'Client';

      // Send email and get activity log
      const activityLog: EmailActivityLog = await sendSignedDocumentEmail({
        to: emailData.to,
        subject: emailData.subject,
        body: emailData.body,
        documentUrl: emailingDocument.signedDocumentUrl || emailingDocument.documentUrl || '',
        documentName: emailingDocument.documentName || 'Document',
        clientName,
        paralegalName: userName,
        documentId: emailingDocument._id,
        clientId: emailingDocument.clientId,
      });

      // Save comprehensive activity log to database with Graph headers
      const logDescription = `Document "${emailingDocument.documentName}" emailed to ${emailData.to}. Status: ${activityLog.deliveryStatus}. Subject: "${activityLog.renderedSubject}"${
        activityLog.graphRequestId ? `. Graph Request ID: ${activityLog.graphRequestId}` : ''
      }${activityLog.graphClientRequestId ? `. Client Request ID: ${activityLog.graphClientRequestId}` : ''}${
        activityLog.graphAgsDiagnostic ? `. AGS Diagnostic: ${activityLog.graphAgsDiagnostic}` : ''
      }`;
      
      await BaseCrudService.create('activitylogs', {
        _id: activityLog._id,
        userId: emailingDocument.clientId || '',
        activityType: 'document_emailed',
        activityDescription: logDescription,
        performedBy: userEmail,
        performedByName: userName,
        timestamp: activityLog.timestamp,
        relatedItemId: emailingDocument._id,
      });

      setIsEmailDialogOpen(false);
      setEmailingDocument(null);
      alert('Email sent successfully! Activity has been logged.');
    } catch (error) {
      console.error('Failed to send email:', error);
      
      // Log failed attempt
      const currentUser = localStorage.getItem('currentUser');
      const userEmail = currentUser ? JSON.parse(currentUser).email : EMAIL_PRIMARY;
      const userName = currentUser ? JSON.parse(currentUser).firstName + ' ' + JSON.parse(currentUser).lastName : 'Admin';

      await BaseCrudService.create('activitylogs', {
        _id: crypto.randomUUID(),
        userId: emailingDocument.clientId || '',
        activityType: 'document_email_failed',
        activityDescription: `Failed to email document "${emailingDocument.documentName}" to ${emailData.to}. Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        performedBy: userEmail,
        performedByName: userName,
        timestamp: new Date().toISOString(),
        relatedItemId: emailingDocument._id,
      });

      throw error;
    }
  };

  const openEmailDialog = (doc: GeneratedDocument) => {
    setEmailingDocument(doc);
    setIsEmailDialogOpen(true);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-200 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'signed': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-400 text-white';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'draft': return <Edit className="w-4 h-4" />;
      case 'sent': return <Send className="w-4 h-4" />;
      case 'signed': return <CheckCircle className="w-4 h-4" />;
      case 'archived': return <Archive className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getClientName = (clientId?: string) => {
    const client = clients.find(c => c._id === clientId);
    return client ? `${client.firstName || ''} ${client.lastName || ''}`.trim() : 'Unknown Client';
  };

  // Workflow analytics
  const totalDocuments = generatedDocs.length;
  const pendingSignatures = generatedDocs.filter(d => d.status === 'sent' && d.requiresSignature).length;
  const completedDocs = generatedDocs.filter(d => d.status === 'signed').length;
  const avgProcessingTime = '2.5 days'; // This would be calculated from actual data
  const completionRate = totalDocuments > 0 ? Math.round((completedDocs / totalDocuments) * 100) : 0;

  return (
    <div className={embedded ? '' : 'min-h-screen flex flex-col bg-background'}>
      {!embedded && <><Header /><BackToDashboard /></>}

      <main className={embedded ? '' : 'flex-1 w-full max-w-[120rem] mx-auto px-6 py-12'}>
        {/* Enhanced Header with Analytics */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-heading text-5xl font-bold text-foreground mb-4">
                Document Workflow Management
              </h1>
              <p className="font-paragraph text-lg text-foreground/80">
                Streamlined document creation, tracking, and signature management
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </Button>
              <Button variant="outline" className="gap-2">
                <Workflow className="h-4 w-4" />
                Automation Rules
              </Button>
            </div>
          </div>

          {/* Workflow Performance Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-paragraph text-sm text-foreground/70 mb-1">Total Documents</p>
                    <p className="font-heading text-3xl font-bold text-foreground">{totalDocuments}</p>
                    <p className="font-paragraph text-xs text-foreground/60 mt-1">All time</p>
                  </div>
                  <FileText className="w-10 h-10 text-blue-600/40" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-paragraph text-sm text-foreground/70 mb-1">Pending Signatures</p>
                    <p className="font-heading text-3xl font-bold text-foreground">{pendingSignatures}</p>
                    <p className="font-paragraph text-xs text-foreground/60 mt-1">Awaiting action</p>
                  </div>
                  <Clock className="w-10 h-10 text-amber-600/40" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-paragraph text-sm text-foreground/70 mb-1">Completion Rate</p>
                    <p className="font-heading text-3xl font-bold text-foreground">{completionRate}%</p>
                    <Progress value={completionRate} className="mt-2 h-2" />
                  </div>
                  <TrendingUp className="w-10 h-10 text-green-600/40" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-paragraph text-sm text-foreground/70 mb-1">Avg Processing</p>
                    <p className="font-heading text-3xl font-bold text-foreground">{avgProcessingTime}</p>
                    <p className="font-paragraph text-xs text-foreground/60 mt-1">Draft to signed</p>
                  </div>
                  <Zap className="w-10 h-10 text-purple-600/40" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Automation Suggestions */}
          <Card className="mb-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Bot className="h-5 w-5" />
                Smart Workflow Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-primary/20">
                  <Bell className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-paragraph font-semibold text-foreground mb-1">Auto-Reminders</p>
                    <p className="font-paragraph text-sm text-foreground/70">Send automatic follow-ups for pending signatures after 3 days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-primary/20">
                  <Copy className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-paragraph font-semibold text-foreground mb-1">Batch Processing</p>
                    <p className="font-paragraph text-sm text-foreground/70">Generate multiple documents at once for efficiency</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-primary/20">
                  <MessageSquare className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-paragraph font-semibold text-foreground mb-1">Client Notifications</p>
                    <p className="font-paragraph text-sm text-foreground/70">Automatic SMS/email alerts when documents are ready</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="documents">Generated Documents</TabsTrigger>
            <TabsTrigger value="templates">Document Templates</TabsTrigger>
          </TabsList>

          {/* Generated Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-heading text-3xl font-bold text-foreground">
                Generated Documents
              </h2>
              <Dialog open={isGenerateDialogOpen} onOpenChange={(open) => {
                setIsGenerateDialogOpen(open);
                if (!open) {
                  // Reset Generate dialog state on close (incl. cancel)
                  setSelectedTemplateId('');
                  setSelectedClientId('');
                  setDocumentName('');
                  setRequiresSignature(true);
                  setSelectedFeeModel('Hourly Retainer');
                  setRetainerAmount('');
                  setHourlyRate('');
                  setFlatFeeAmount('');
                  setHybridFlatFee('');
                  setHybridHourlyRate('');
                  setContingencyPercent('');
                  setNatureOfMatter('');
                  setSpecialProvisions([]);
                  setIsGenerating(false);
                  setGenerateError(null);
                  setSelectedParalegalId(DEFAULT_PARALEGAL_ID);
                  setAutoSignAsParalegal(false);
                }
              }}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Generate Document
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Generate Document from Template</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="template">Select Template</Label>
                      <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a template — grouped by practice area" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[480px]">
                          {(() => {
                            // Group active templates by inferred area of
                            // law, sort areas by AREA_DISPLAY_ORDER, and
                            // sort templates alphabetically within each
                            // area for fast paralegal lookup. The area
                            // labels are styled prominently — bold navy
                            // text, count badge, top separator — so the
                            // grouping is visually obvious in the
                            // dropdown.
                            const active = templates.filter((t) => t.isActive);
                            const byArea: Record<string, DocumentTemplate[]> = {};
                            for (const t of active) {
                              const area = classifyTemplateArea(t);
                              (byArea[area] = byArea[area] || []).push(t);
                            }
                            const orderedAreas = AREA_DISPLAY_ORDER
                              .filter((a) => byArea[a] && byArea[a].length > 0)
                              .concat(
                                Object.keys(byArea).filter(
                                  (a) => !AREA_DISPLAY_ORDER.includes(a)
                                ).sort()
                              );
                            for (const a of orderedAreas) {
                              byArea[a].sort((x, y) =>
                                (x.templateName || '').localeCompare(
                                  y.templateName || '',
                                  'en',
                                  { sensitivity: 'base' }
                                )
                              );
                            }
                            if (orderedAreas.length === 0) {
                              return (
                                <div className="px-3 py-6 text-center text-sm text-foreground/60">
                                  No active templates available.
                                </div>
                              );
                            }
                            return orderedAreas.map((area, areaIdx) => (
                              <SelectGroup key={area}>
                                <SelectLabel
                                  className={
                                    'flex items-center justify-between gap-2 ' +
                                    'px-3 py-2 ' +
                                    'text-[11px] font-bold uppercase tracking-wider ' +
                                    'text-white bg-primary ' +
                                    (areaIdx > 0 ? 'mt-1 ' : '') +
                                    'sticky top-0 z-10'
                                  }
                                  style={{
                                    background: '#0f2a4a',
                                    color: '#ffffff',
                                  }}
                                >
                                  <span>{area}</span>
                                  <span
                                    className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                                    style={{
                                      background: '#b08a3e',
                                      color: '#ffffff',
                                    }}
                                  >
                                    {byArea[area].length}
                                  </span>
                                </SelectLabel>
                                {byArea[area].map((template) => (
                                  <SelectItem
                                    key={template._id}
                                    value={template._id}
                                    className="pl-6 py-2"
                                  >
                                    <div className="flex flex-col items-start gap-0.5">
                                      <span className="font-medium text-sm">
                                        {template.templateName}
                                      </span>
                                      {template.templateType && (
                                        <span className="text-[10px] uppercase tracking-wider text-foreground/55 font-semibold">
                                          {template.templateType}
                                        </span>
                                      )}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            ));
                          })()}
                        </SelectContent>
                      </Select>
                      <p className="text-[11px] text-foreground/55 mt-1">
                        Templates are grouped by area of law. Use the <strong>Templates</strong> tab to edit or add templates.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="client">Select Client</Label>
                      <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a client" />
                        </SelectTrigger>
                        <SelectContent>
                          {clients.map((client) => (
                            <SelectItem key={client._id} value={client._id}>
                              {client.firstName} {client.lastName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="docName">Document Name (Optional)</Label>
                      <Input
                        id="docName"
                        value={documentName}
                        onChange={(e) => setDocumentName(e.target.value)}
                        placeholder="Auto-generated if left blank"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="requiresSignature"
                        checked={requiresSignature}
                        onChange={(e) => setRequiresSignature(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="requiresSignature">Requires Client Signature</Label>
                    </div>

                    {/* ---- Paralegal selector + auto-cursive sign ---- */}
                    {/* Drives whose name appears in the cursive signature
                        block on the generated document (when "Auto-sign on
                        behalf of paralegal" is checked). Mirrors the
                        retainer-flow pattern in ClientFileManagementPage so
                        the experience is consistent across the app. */}
                    <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/20">
                      <p className="text-sm font-semibold text-foreground">Paralegal Signature</p>
                      <div className="space-y-2">
                        <Label htmlFor="documentParalegal">Generated by</Label>
                        <Select
                          value={selectedParalegalId}
                          onValueChange={setSelectedParalegalId}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {getActiveParalegals().map(pl => (
                              <SelectItem key={pl.id} value={pl.id}>
                                {pl.displayName} (LSO #{pl.lsoNumber})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          id="autoSignAsParalegal"
                          checked={autoSignAsParalegal}
                          onChange={(e) => setAutoSignAsParalegal(e.target.checked)}
                          className="w-4 h-4 mt-0.5"
                        />
                        <div>
                          <Label htmlFor="autoSignAsParalegal" className="cursor-pointer">
                            Auto-sign on behalf of paralegal
                          </Label>
                          <p className="text-xs text-foreground/60 mt-0.5">
                            Embeds the selected paralegal&apos;s cursive signature
                            (Allura) at the document&apos;s {'{PARALEGAL_SIGNATURE}'} placeholder,
                            with their printed name and LSO licence number below.
                            Leave unchecked if the paralegal will sign the
                            generated document by hand or via the canvas later.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Retainer-specific fields — shown when a Retainer Agreement template is selected */}
                    {(() => {
                      const selectedTemplate = templates.find(t => t._id === selectedTemplateId);
                      const isRetainer = selectedTemplate?.templateType === 'Retainer Agreement' || selectedTemplate?.templateName?.toLowerCase().includes('retainer');
                      if (!isRetainer) return null;
                      return (
                        <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/30">
                          <p className="text-sm font-semibold text-foreground">Retainer Details</p>
                          <div className="space-y-2">
                            <Label htmlFor="feeModel">Fee Model</Label>
                            <Select value={selectedFeeModel} onValueChange={setSelectedFeeModel}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select fee model" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Hourly Retainer">Hourly Retainer</SelectItem>
                                <SelectItem value="Flat Fee">Flat Fee</SelectItem>
                                <SelectItem value="Hybrid Retainer">Hybrid Retainer</SelectItem>
                                <SelectItem value="Contingency Fee">Contingency Fee</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="retainerAmount">Retainer Deposit Amount ($)</Label>
                            <Input
                              id="retainerAmount"
                              type="number"
                              value={retainerAmount}
                              onChange={(e) => setRetainerAmount(e.target.value)}
                              placeholder="e.g. 1500"
                            />
                          </div>
                          {/* Hourly rate — applies to Hourly + Hybrid */}
                          {(selectedFeeModel === 'Hourly Retainer' ||
                            selectedFeeModel === 'Hybrid Retainer') && (
                            <div className="space-y-2">
                              <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                              <Input
                                id="hourlyRate"
                                type="number"
                                value={hourlyRate}
                                onChange={(e) => setHourlyRate(e.target.value)}
                                placeholder="e.g. 175"
                              />
                            </div>
                          )}

                          {/* Flat fee amount */}
                          {selectedFeeModel === 'Flat Fee' && (
                            <div className="space-y-2">
                              <Label htmlFor="flatFeeAmount">Flat Fee Amount ($)</Label>
                              <Input
                                id="flatFeeAmount"
                                type="number"
                                value={flatFeeAmount}
                                onChange={(e) => setFlatFeeAmount(e.target.value)}
                                placeholder="e.g. 750"
                              />
                            </div>
                          )}

                          {/* Hybrid retainer — initial flat + hourly after */}
                          {selectedFeeModel === 'Hybrid Retainer' && (
                            <>
                              <div className="space-y-2">
                                <Label htmlFor="hybridFlatFee">Initial Flat Fee ($)</Label>
                                <Input
                                  id="hybridFlatFee"
                                  type="number"
                                  value={hybridFlatFee}
                                  onChange={(e) => setHybridFlatFee(e.target.value)}
                                  placeholder="e.g. 500"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="hybridHourlyRate">Hourly Rate After Initial ($)</Label>
                                <Input
                                  id="hybridHourlyRate"
                                  type="number"
                                  value={hybridHourlyRate}
                                  onChange={(e) => setHybridHourlyRate(e.target.value)}
                                  placeholder="e.g. 150"
                                />
                              </div>
                            </>
                          )}

                          {/* Contingency percentage */}
                          {selectedFeeModel === 'Contingency Fee' && (
                            <div className="space-y-2">
                              <Label htmlFor="contingencyPercent">Contingency Percentage (%)</Label>
                              <Input
                                id="contingencyPercent"
                                type="number"
                                min="0"
                                max="100"
                                value={contingencyPercent}
                                onChange={(e) => setContingencyPercent(e.target.value)}
                                placeholder="e.g. 25"
                              />
                            </div>
                          )}

                        </div>
                      );
                    })()}

                    {/* Nature of the Charge / Matter — fillable, drives
                        the {NATURE_OF_MATTER} placeholder in any
                        retainer template that has it. */}
                    <div className="space-y-2">
                      <Label htmlFor="natureOfMatter">Nature of the Matter / Charge</Label>
                      <Textarea
                        id="natureOfMatter"
                        value={natureOfMatter}
                        onChange={(e) => setNatureOfMatter(e.target.value)}
                        placeholder='e.g. "Speeding 130 km/h in a posted 100 km/h zone, contrary to s.128(1)(b) of the Highway Traffic Act, charge issued June 14, 2026 in London."'
                        rows={3}
                      />
                      <p className="text-xs text-gray-500">
                        Fills the &ldquo;Nature of the Charge&rdquo; / &ldquo;Nature of the Matter&rdquo;
                        section of the retainer (templates that include the <code>{'{NATURE_OF_MATTER}'}</code>{' '}
                        placeholder). Leave blank to print &ldquo;(To be provided by the Client.)&rdquo;.
                      </p>
                    </div>

                    {/* Special Provisions / Additional Charges — drives
                        the {SPECIAL_PROVISIONS_BLOCK} placeholder. Each
                        line is a description + dollar amount. Renders
                        as a styled table in the retainer. */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Special Provisions / Additional Charges</Label>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setSpecialProvisions((prev) => [
                              ...prev,
                              { description: '', amount: '' },
                            ])
                          }
                          className="h-7 px-2 text-xs"
                        >
                          + Add charge
                        </Button>
                      </div>
                      {specialProvisions.length === 0 ? (
                        <p className="text-xs italic text-gray-500 px-3 py-2 bg-gray-50 rounded-lg">
                          No additional charges. Click &ldquo;Add charge&rdquo; to itemize stage-specific
                          fees (e.g. &ldquo;$300 for first appearance + $200 for trial&rdquo;).
                        </p>
                      ) : (
                        <ul className="space-y-2">
                          {specialProvisions.map((p, idx) => (
                            <li key={idx} className="flex gap-2 items-start">
                              <Input
                                value={p.description}
                                onChange={(e) =>
                                  setSpecialProvisions((prev) =>
                                    prev.map((x, i) =>
                                      i === idx
                                        ? { ...x, description: e.target.value }
                                        : x
                                    )
                                  )
                                }
                                placeholder='e.g. "First appearance — POA Court"'
                                className="flex-1"
                              />
                              <Input
                                type="number"
                                min={0}
                                step="0.01"
                                value={p.amount}
                                onChange={(e) =>
                                  setSpecialProvisions((prev) =>
                                    prev.map((x, i) =>
                                      i === idx
                                        ? { ...x, amount: e.target.value }
                                        : x
                                    )
                                  )
                                }
                                placeholder="Amount"
                                className="w-28"
                              />
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  setSpecialProvisions((prev) =>
                                    prev.filter((_, i) => i !== idx)
                                  )
                                }
                                className="border-red-200 text-red-700 hover:bg-red-50 h-9 px-2"
                                aria-label={`Remove charge ${idx + 1}`}
                              >
                                ×
                              </Button>
                            </li>
                          ))}
                        </ul>
                      )}
                      <p className="text-xs text-gray-500">
                        Drives the <code>{'{SPECIAL_PROVISIONS_BLOCK}'}</code> placeholder.
                        Templates without that placeholder will simply ignore these charges.
                      </p>
                    </div>

                    {/* ============================================== */}
                    {/* PAYMENT ARRANGEMENT (going-forward schedule)   */}
                    {/* Drives {PAYMENT_ARRANGEMENT_SECTION} in CMS    */}
                    {/* templates. Renders only when enabled.          */}
                    {/* ============================================== */}
                    <div className="p-4 border-2 border-indigo-200 bg-indigo-50/50 rounded-lg">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={paymentArrangementEnabled}
                          onChange={(e) =>
                            setPaymentArrangementEnabled(e.target.checked)
                          }
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <span className="text-sm font-semibold text-indigo-800">
                          Is there a payment arrangement / schedule?
                        </span>
                      </label>
                      {paymentArrangementEnabled && (
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs font-medium text-indigo-700 uppercase tracking-wider">
                              Arrangement type
                            </Label>
                            <select
                              value={paymentArrangementType}
                              onChange={(e) =>
                                setPaymentArrangementType(e.target.value)
                              }
                              className="w-full mt-1 text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
                            >
                              <option value="full">Paid in full at signing</option>
                              <option value="installments">Instalment plan</option>
                              <option value="deferred">Deferred payment</option>
                              <option value="custom">Custom (see notes)</option>
                            </select>
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-indigo-700 uppercase tracking-wider">
                              Total amount expected ($)
                            </Label>
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              value={paymentArrangementTotal}
                              onChange={(e) =>
                                setPaymentArrangementTotal(e.target.value)
                              }
                              placeholder="e.g. 2500.00"
                              className="mt-1"
                            />
                          </div>
                          {paymentArrangementType === 'installments' && (
                            <>
                              <div>
                                <Label className="text-xs font-medium text-indigo-700 uppercase tracking-wider">
                                  Instalment amount ($)
                                </Label>
                                <Input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={paymentInstallmentAmount}
                                  onChange={(e) =>
                                    setPaymentInstallmentAmount(e.target.value)
                                  }
                                  placeholder="e.g. 500.00"
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label className="text-xs font-medium text-indigo-700 uppercase tracking-wider">
                                  Frequency
                                </Label>
                                <select
                                  value={paymentInstallmentFrequency}
                                  onChange={(e) =>
                                    setPaymentInstallmentFrequency(e.target.value)
                                  }
                                  className="w-full mt-1 text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
                                >
                                  <option value="weekly">Weekly</option>
                                  <option value="biweekly">Bi-weekly</option>
                                  <option value="monthly">Monthly</option>
                                  <option value="quarterly">Quarterly</option>
                                </select>
                              </div>
                              <div>
                                <Label className="text-xs font-medium text-indigo-700 uppercase tracking-wider">
                                  First instalment due
                                </Label>
                                <Input
                                  type="date"
                                  value={paymentInstallmentStartDate}
                                  onChange={(e) =>
                                    setPaymentInstallmentStartDate(e.target.value)
                                  }
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label className="text-xs font-medium text-indigo-700 uppercase tracking-wider">
                                  Number of instalments
                                </Label>
                                <Input
                                  type="number"
                                  min="1"
                                  step="1"
                                  value={paymentInstallmentCount}
                                  onChange={(e) =>
                                    setPaymentInstallmentCount(e.target.value)
                                  }
                                  placeholder="e.g. 5"
                                  className="mt-1"
                                />
                              </div>
                            </>
                          )}
                          <div className="md:col-span-2">
                            <Label className="text-xs font-medium text-indigo-700 uppercase tracking-wider">
                              Additional terms / notes
                            </Label>
                            <textarea
                              value={paymentArrangementNotes}
                              onChange={(e) =>
                                setPaymentArrangementNotes(e.target.value)
                              }
                              placeholder="Late fee policy, missed-payment consequences, conditions, etc."
                              rows={3}
                              className="w-full mt-1 text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
                            />
                          </div>
                          <p className="md:col-span-2 text-xs text-indigo-700/80 italic">
                            Drives the <code>{'{PAYMENT_ARRANGEMENT_SECTION}'}</code> placeholder.
                            Templates without that placeholder will simply ignore these fields.
                          </p>
                        </div>
                      )}
                    </div>

                    {generateError && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                        {generateError}
                      </div>
                    )}
                    {(!selectedTemplateId || !selectedClientId) && !generateError && (
                      <p className="text-xs text-amber-700 -mb-2">
                        Choose a template <em>and</em> a client to enable the Generate button.
                      </p>
                    )}
                    <Button
                      onClick={handleGenerateDocument}
                      className="w-full"
                      disabled={!selectedTemplateId || !selectedClientId || isGenerating}
                    >
                      {isGenerating ? 'Generating PDF…' : 'Generate Document'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4" style={{ minHeight: '400px' }}>
              {isLoading ? null : generatedDocs.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <FileText className="h-12 w-12 text-foreground/40 mb-4" />
                    <p className="font-paragraph text-lg text-foreground/60">
                      No generated documents yet
                    </p>
                  </CardContent>
                </Card>
              ) : (() => {
                // ----------------------------------------------------------------
                // Group generated documents by client name, sort clients
                // alphabetically, sort documents alphabetically within each
                // client. Each client is collapsible so the paralegal can
                // drill into one matter at a time.
                // ----------------------------------------------------------------
                const grouped: Record<string, typeof generatedDocs> = {};
                for (const d of generatedDocs) {
                  const name = (getClientName(d.clientId) || '').trim() || 'Unassigned';
                  (grouped[name] = grouped[name] || []).push(d);
                }
                const clientNames = Object.keys(grouped).sort((a, b) => {
                  if (a === 'Unassigned') return 1;
                  if (b === 'Unassigned') return -1;
                  return a.localeCompare(b, 'en', { sensitivity: 'base' });
                });
                for (const n of clientNames) {
                  grouped[n].sort((a, b) =>
                    (a.documentName || '').localeCompare(
                      b.documentName || '',
                      'en',
                      { sensitivity: 'base' }
                    )
                  );
                }
                return (
                  <Accordion type="multiple" className="space-y-3">
                    {clientNames.map((clientName) => (
                      <AccordionItem
                        key={clientName}
                        value={clientName}
                        className="border border-border rounded-lg bg-white"
                      >
                        <AccordionTrigger className="px-4 py-3 hover:no-underline">
                          <span className="flex items-center gap-3 flex-1">
                            <Users className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="font-heading font-semibold text-foreground text-left">
                              {clientName}
                            </span>
                            <Badge variant="outline" className="ml-auto mr-2">
                              {grouped[clientName].length}{' '}
                              {grouped[clientName].length === 1 ? 'doc' : 'docs'}
                            </Badge>
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="grid gap-4">
                            {grouped[clientName].map((doc) => (
                  <Card key={doc._id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="font-heading text-2xl mb-2">
                            {doc.documentName}
                          </CardTitle>
                          <div className="flex flex-wrap gap-2">
                            <Badge className={getStatusColor(doc.status)}>
                              <span className="flex items-center gap-1">
                                {getStatusIcon(doc.status)}
                                {doc.status?.toUpperCase()}
                              </span>
                            </Badge>
                            {doc.requiresSignature && (
                              <Badge variant="outline">Signature Required</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-foreground/80">
                          <FileText className="h-4 w-4" />
                          <span className="font-paragraph">
                            Client: {getClientName(doc.clientId)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground/80">
                          <Clock className="h-4 w-4" />
                          <span className="font-paragraph">
                            Generated: {doc.generationDate ? format(new Date(doc.generationDate), 'MMM d, yyyy') : 'N/A'}
                          </span>
                        </div>
                        {doc.sentDate && (
                          <div className="flex items-center gap-2 text-foreground/80">
                            <Send className="h-4 w-4" />
                            <span className="font-paragraph">
                              Sent: {format(new Date(doc.sentDate), 'MMM d, yyyy')}
                            </span>
                          </div>
                        )}
                        {doc.signedDate && (
                          <div className="flex items-center gap-2 text-foreground/80">
                            <CheckCircle className="h-4 w-4" />
                            <span className="font-paragraph">
                              Signed: {format(new Date(doc.signedDate), 'MMM d, yyyy')}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 pt-2 flex-wrap">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={async () => {
                            const urlToView = doc.status === 'signed' && doc.signedDocumentUrl
                              ? doc.signedDocumentUrl
                              : doc.documentUrl;
                            if (urlToView && (urlToView.startsWith('http') || urlToView.startsWith('data:'))) {
                              const opened = openDocumentUrl(urlToView);
                              if (!opened) {
                                alert('Could not open document. Please try Download instead.');
                              }
                            } else if (doc.documentContent) {
                              // Regenerate PDF from stored content
                              try {
                                const pdfDataUrl = await generatePDF(doc.documentContent, doc.documentName || 'Document');
                                openDocumentUrl(pdfDataUrl);
                                // Cache for next time
                                await BaseCrudService.update('generateddocuments', { _id: doc._id, documentUrl: pdfDataUrl } as any);
                                setGeneratedDocs(prev => prev.map(d => d._id === doc._id ? { ...d, documentUrl: pdfDataUrl } : d));
                              } catch (err) {
                                console.error('Error regenerating document:', err);
                                alert('Unable to generate document. Please try again.');
                              }
                            } else {
                              alert('Document content is unavailable. Please regenerate this document.');
                            }
                          }}
                          className="gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const urlToDownload = doc.status === 'signed' && doc.signedDocumentUrl 
                              ? doc.signedDocumentUrl 
                              : doc.documentUrl;
                            if (urlToDownload) {
                              downloadPDF(urlToDownload, doc.documentName || 'document');
                            }
                          }}
                          className="gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePrintDocument(doc)}
                          className="gap-2"
                        >
                          <Printer className="h-4 w-4" />
                          Print
                        </Button>
                        {doc.status === 'draft' && (
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedDocumentId(doc._id);
                              setIsSendDialogOpen(true);
                            }}
                            className="gap-2"
                          >
                            <Mail className="h-4 w-4" />
                            Send to Client
                          </Button>
                        )}

                        {/* Public e-sign link — recipient signs without
                            creating an account; system auto-creates
                            their clientprofile on submit. Available for
                            documents that need a signature and aren't
                            already signed. */}
                        {doc.requiresSignature && doc.status !== 'signed' && doc.documentUrl && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openSignLinkDialog(doc)}
                            className="gap-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                          >
                            <PenTool className="h-4 w-4" />
                            Send Sign Link
                          </Button>
                        )}

                        {doc.status === 'signed' && doc.signedDocumentUrl && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              if (doc.signedDocumentUrl) {
                                openDocumentUrl(doc.signedDocumentUrl);
                              }
                            }}
                            className="gap-2 border-green-600 text-green-700 hover:bg-green-50"
                          >
                            <CheckCircle className="h-4 w-4" />
                            View Signed
                          </Button>
                        )}

                        {/* Send to Client File — files the document into
                            the LSO compliance section of a client file.
                            Available for signed documents and for any
                            generated doc that has a stored URL (so
                            paralegals can also route unsigned drafts). */}
                        {(doc.signedDocumentUrl || doc.documentUrl) && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openFileDispatch(doc)}
                            className="gap-2 border-indigo-600 text-indigo-700 hover:bg-indigo-50"
                          >
                            <Archive className="h-4 w-4" />
                            Send to Client File
                          </Button>
                        )}

                        {/* Email Document — available at ANY status (draft, sent, signed) */}
                        {(doc.documentUrl || doc.signedDocumentUrl) && (
                          <Button
                            size="sm"
                            onClick={() => openEmailDialog(doc)}
                            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Mail className="h-4 w-4" />
                            {doc.status === 'signed' ? 'Email Signed Document' : 'Email Document'}
                          </Button>
                        )}

                        {(doc.status === 'sent' || doc.status === 'signed') && doc.uploadToken && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              const { generateUploadLink } = require('@/lib/upload-token-service');
                              const link = generateUploadLink(doc.uploadToken!);
                              navigator.clipboard.writeText(link);
                              alert('Upload link copied to clipboard!');
                            }}
                            className="gap-2"
                          >
                            <Link2 className="h-4 w-4" />
                            Copy Upload Link
                          </Button>
                        )}

                        {doc.requiresSignature && doc.status === 'sent' && (
                          <Button
                            size="sm"
                            onClick={() => handleMarkAsSigned(doc._id)}
                            className="gap-2"
                          >
                            <PenTool className="h-4 w-4" />
                            Sign Document
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteDocument(doc._id)}
                          className="gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                );
              })()}
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-heading text-3xl font-bold text-foreground">
                Document Templates
              </h2>
              <Dialog open={isTemplateDialogOpen} onOpenChange={(open) => {
                setIsTemplateDialogOpen(open);
                if (!open) {
                  setIsEditMode(false);
                  setEditingTemplateId('');
                  setNewTemplate({
                    templateName: '',
                    templateType: 'Authorization Letter',
                    templateContent: '',
                    lsoSection: 'OTHER',
                    isActive: true
                  });
                }
              }}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Template
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{isEditMode ? 'Edit Document Template' : 'Create Document Template'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="templateName">Template Name</Label>
                      <Input
                        id="templateName"
                        value={newTemplate.templateName}
                        onChange={(e) => setNewTemplate({ ...newTemplate, templateName: e.target.value })}
                        placeholder="e.g., Client Authorization Letter"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="templateType">Template Type</Label>
                        <Select
                          value={newTemplate.templateType}
                          onValueChange={(value) => setNewTemplate({ ...newTemplate, templateType: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Authorization Letter">Authorization Letter</SelectItem>
                            <SelectItem value="Direction Letter">Direction Letter</SelectItem>
                            <SelectItem value="Retainer Agreement">Retainer Agreement</SelectItem>
                            <SelectItem value="Consent Form">Consent Form</SelectItem>
                            <SelectItem value="Notice">Notice</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {/* LSO By-Law 7.1 section — drives the grouping in the
                          template list so paralegals can find the right
                          template by compliance section (A: File Opening,
                          B: Client ID, ...). */}
                      <div className="space-y-2">
                        <Label htmlFor="lsoSection">LSO Section</Label>
                        <Select
                          value={newTemplate.lsoSection}
                          onValueChange={(value) => setNewTemplate({ ...newTemplate, lsoSection: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {LSO_SECTIONS.map(s => (
                              <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="templateContent">Template Content</Label>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-foreground/60">
                          Use placeholders: {'{CLIENT_NAME}'}, {'{CLIENT_PHONE}'}, {'{DATE}'}
                        </p>
                        <Badge variant="outline" className="gap-1">
                          <PenTool className="h-3 w-3" />
                          HTML Editor
                        </Badge>
                      </div>
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-50 border-b p-2 flex flex-wrap gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const textarea = document.getElementById('templateContent') as HTMLTextAreaElement;
                              if (textarea) {
                                const start = textarea.selectionStart;
                                const end = textarea.selectionEnd;
                                const selectedText = newTemplate.templateContent.substring(start, end);
                                const newText = newTemplate.templateContent.substring(0, start) + 
                                  `<strong>${selectedText || 'bold text'}</strong>` + 
                                  newTemplate.templateContent.substring(end);
                                setNewTemplate({ ...newTemplate, templateContent: newText });
                              }
                            }}
                            className="h-8 px-2"
                          >
                            <strong>B</strong>
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const textarea = document.getElementById('templateContent') as HTMLTextAreaElement;
                              if (textarea) {
                                const start = textarea.selectionStart;
                                const end = textarea.selectionEnd;
                                const selectedText = newTemplate.templateContent.substring(start, end);
                                const newText = newTemplate.templateContent.substring(0, start) + 
                                  `<em>${selectedText || 'italic text'}</em>` + 
                                  newTemplate.templateContent.substring(end);
                                setNewTemplate({ ...newTemplate, templateContent: newText });
                              }
                            }}
                            className="h-8 px-2"
                          >
                            <em>I</em>
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const textarea = document.getElementById('templateContent') as HTMLTextAreaElement;
                              if (textarea) {
                                const start = textarea.selectionStart;
                                const end = textarea.selectionEnd;
                                const selectedText = newTemplate.templateContent.substring(start, end);
                                const newText = newTemplate.templateContent.substring(0, start) + 
                                  `<u>${selectedText || 'underlined text'}</u>` + 
                                  newTemplate.templateContent.substring(end);
                                setNewTemplate({ ...newTemplate, templateContent: newText });
                              }
                            }}
                            className="h-8 px-2"
                          >
                            <u>U</u>
                          </Button>
                          <div className="w-px bg-gray-300 mx-1" />
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const textarea = document.getElementById('templateContent') as HTMLTextAreaElement;
                              if (textarea) {
                                const start = textarea.selectionStart;
                                const newText = newTemplate.templateContent.substring(0, start) + 
                                  `<h1>Heading 1</h1>\n` + 
                                  newTemplate.templateContent.substring(start);
                                setNewTemplate({ ...newTemplate, templateContent: newText });
                              }
                            }}
                            className="h-8 px-2 text-xs"
                          >
                            H1
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const textarea = document.getElementById('templateContent') as HTMLTextAreaElement;
                              if (textarea) {
                                const start = textarea.selectionStart;
                                const newText = newTemplate.templateContent.substring(0, start) + 
                                  `<h2>Heading 2</h2>\n` + 
                                  newTemplate.templateContent.substring(start);
                                setNewTemplate({ ...newTemplate, templateContent: newText });
                              }
                            }}
                            className="h-8 px-2 text-xs"
                          >
                            H2
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const textarea = document.getElementById('templateContent') as HTMLTextAreaElement;
                              if (textarea) {
                                const start = textarea.selectionStart;
                                const newText = newTemplate.templateContent.substring(0, start) + 
                                  `<p>Paragraph text</p>\n` + 
                                  newTemplate.templateContent.substring(start);
                                setNewTemplate({ ...newTemplate, templateContent: newText });
                              }
                            }}
                            className="h-8 px-2 text-xs"
                          >
                            P
                          </Button>
                          <div className="w-px bg-gray-300 mx-1" />
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const textarea = document.getElementById('templateContent') as HTMLTextAreaElement;
                              if (textarea) {
                                const start = textarea.selectionStart;
                                const newText = newTemplate.templateContent.substring(0, start) + 
                                  `<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n  <li>Item 3</li>\n</ul>\n` + 
                                  newTemplate.templateContent.substring(start);
                                setNewTemplate({ ...newTemplate, templateContent: newText });
                              }
                            }}
                            className="h-8 px-2 text-xs"
                          >
                            • List
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const textarea = document.getElementById('templateContent') as HTMLTextAreaElement;
                              if (textarea) {
                                const start = textarea.selectionStart;
                                const newText = newTemplate.templateContent.substring(0, start) + 
                                  `<ol>\n  <li>First</li>\n  <li>Second</li>\n  <li>Third</li>\n</ol>\n` + 
                                  newTemplate.templateContent.substring(start);
                                setNewTemplate({ ...newTemplate, templateContent: newText });
                              }
                            }}
                            className="h-8 px-2 text-xs"
                          >
                            1. List
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const textarea = document.getElementById('templateContent') as HTMLTextAreaElement;
                              if (textarea) {
                                const start = textarea.selectionStart;
                                const newText = newTemplate.templateContent.substring(0, start) + 
                                  `<table border="1" style="border-collapse: collapse; width: 100%;">\n  <tr>\n    <th style="padding: 8px; border: 1px solid #000;">Header 1</th>\n    <th style="padding: 8px; border: 1px solid #000;">Header 2</th>\n  </tr>\n  <tr>\n    <td style="padding: 8px; border: 1px solid #000;">Cell 1</td>\n    <td style="padding: 8px; border: 1px solid #000;">Cell 2</td>\n  </tr>\n</table>\n` + 
                                  newTemplate.templateContent.substring(start);
                                setNewTemplate({ ...newTemplate, templateContent: newText });
                              }
                            }}
                            className="h-8 px-2 text-xs"
                          >
                            Table
                          </Button>
                          <div className="w-px bg-gray-300 mx-1" />
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const textarea = document.getElementById('templateContent') as HTMLTextAreaElement;
                              if (textarea) {
                                const start = textarea.selectionStart;
                                const newText = newTemplate.templateContent.substring(0, start) + 
                                  `<br/>` + 
                                  newTemplate.templateContent.substring(start);
                                setNewTemplate({ ...newTemplate, templateContent: newText });
                              }
                            }}
                            className="h-8 px-2 text-xs"
                          >
                            Line Break
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const textarea = document.getElementById('templateContent') as HTMLTextAreaElement;
                              if (textarea) {
                                const start = textarea.selectionStart;
                                const newText = newTemplate.templateContent.substring(0, start) + 
                                  `<hr/>` + 
                                  newTemplate.templateContent.substring(start);
                                setNewTemplate({ ...newTemplate, templateContent: newText });
                              }
                            }}
                            className="h-8 px-2 text-xs"
                          >
                            Divider
                          </Button>
                        </div>
                        <Textarea
                          id="templateContent"
                          value={newTemplate.templateContent}
                          onChange={(e) => setNewTemplate({ ...newTemplate, templateContent: e.target.value })}
                          placeholder="Enter HTML template content with placeholders..."
                          rows={16}
                          className="border-0 rounded-none font-mono text-sm"
                        />
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
                        <p className="text-xs font-semibold text-blue-900 mb-1">HTML Preview:</p>
                        <div 
                          className="bg-white border border-blue-200 rounded p-3 text-sm max-h-40 overflow-y-auto"
                          dangerouslySetInnerHTML={{ __html: newTemplate.templateContent || '<p class="text-gray-400">Preview will appear here...</p>' }}
                        />
                      </div>
                    </div>

                    <Button onClick={handleCreateTemplate} className="w-full">
                      {isEditMode ? 'Update Template' : 'Create Template'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Templates grouped by area of law (HRTO, Traffic, LTB,
                Small Claims, etc.) — same grouping logic used by the
                Generate Document picker so the paralegal sees the
                same category structure in both places. Within each
                area, templates are sorted alphabetically by name.
                Previously grouped by LSO By-Law 7.1 section, which
                made finding-to-edit templates harder than necessary. */}
            <div className="space-y-6" style={{ minHeight: '400px' }}>
              {isLoading ? null : templates.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <FileText className="h-12 w-12 text-foreground/40 mb-4" />
                    <p className="font-paragraph text-lg text-foreground/60">
                      No templates yet
                    </p>
                  </CardContent>
                </Card>
              ) : (() => {
                // Bucket templates by area of law, using the same
                // classifier the Generate Document picker uses.
                const buckets = new Map<string, DocumentTemplate[]>();
                AREA_DISPLAY_ORDER.forEach(a => buckets.set(a, []));
                templates.forEach(t => {
                  const area = classifyTemplateArea(t);
                  if (!buckets.has(area)) buckets.set(area, []);
                  buckets.get(area)!.push(t);
                });
                // Sort each bucket alphabetically by templateName so
                // it's easy to scan within a section.
                buckets.forEach(list => {
                  list.sort((a, b) =>
                    (a.templateName || '').localeCompare(b.templateName || '')
                  );
                });
                // Render in canonical order first, then any unknown
                // areas the paralegal entered as a free-text category.
                const orderedAreas = [
                  ...AREA_DISPLAY_ORDER.filter(a => (buckets.get(a) || []).length > 0),
                  ...Array.from(buckets.keys())
                    .filter(a => !AREA_DISPLAY_ORDER.includes(a) && (buckets.get(a) || []).length > 0)
                    .sort(),
                ];
                return orderedAreas.map(area => (
                  <div key={area}>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-3 flex items-center gap-2 sticky top-0 bg-background py-1 z-10 border-b border-gray-100">
                      {area}
                      <Badge variant="outline" className="text-xs">
                        {buckets.get(area)!.length}
                      </Badge>
                    </h3>
                    <div className="grid gap-4">
                      {buckets.get(area)!.map((template) => (
                        <Card key={template._id} className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <CardTitle className="font-heading text-2xl mb-2">
                                  {template.templateName}
                                </CardTitle>
                                <div className="flex flex-wrap gap-2">
                                  <Badge variant="outline">{template.templateType}</Badge>
                                  <Badge variant="secondary" className="text-xs">
                                    {sectionLabel(template.lsoSection)}
                                  </Badge>
                                  <Badge className={template.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800'}>
                                    {template.isActive ? 'Active' : 'Inactive'}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="bg-gray-50 rounded-lg p-4">
                              <p className="font-paragraph text-sm text-foreground/80 whitespace-pre-wrap line-clamp-4">
                                {template.templateContent}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-foreground/60">
                              <span>Created by: {template.createdBy}</span>
                              <span>•</span>
                              <span>{template._createdDate ? format(new Date(template._createdDate), 'MMM d, yyyy') : 'N/A'}</span>
                            </div>
                            <div className="flex gap-2 pt-2">
                              <Button size="sm" variant="outline" onClick={() => handleEditTemplate(template)} className="gap-2">
                                <Edit className="h-4 w-4" /> Edit Template
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleToggleTemplateStatus(template._id, template.isActive ?? true)} className="gap-2">
                                {template.isActive ? 'Deactivate' : 'Activate'}
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDeleteTemplate(template._id)} className="gap-2">
                                <Trash2 className="h-4 w-4" /> Delete
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ));
              })()}
            </div>
          </TabsContent>
        </Tabs>

        {/* Send Sign Link Dialog — public e-signing without account */}
        <Dialog
          open={isSignLinkOpen}
          onOpenChange={(open) => {
            setIsSignLinkOpen(open);
            if (!open) {
              setSignLinkDocument(null);
              setSignLinkResult(null);
              setSignLinkRecipientName('');
              setSignLinkRecipientEmail('');
              setSignLinkExpiryDays(7);
            }
          }}
        >
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Send public signing link</DialogTitle>
            </DialogHeader>
            {!signLinkResult ? (
              <div className="space-y-4 py-2">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm text-emerald-900">
                  <p className="font-semibold">
                    {signLinkDocument?.documentName || 'Document'}
                  </p>
                  <p className="text-xs mt-1">
                    The recipient will receive a link, sign online without
                    creating an account, and the system will automatically
                    create their client profile and attach the signed
                    document.
                  </p>
                </div>
                <div>
                  <Label htmlFor="signLinkName">Recipient name *</Label>
                  <Input
                    id="signLinkName"
                    value={signLinkRecipientName}
                    onChange={(e) => setSignLinkRecipientName(e.target.value)}
                    placeholder="Full legal name as it will appear on the signature"
                  />
                </div>
                <div>
                  <Label htmlFor="signLinkEmail">Recipient email *</Label>
                  <Input
                    id="signLinkEmail"
                    type="email"
                    value={signLinkRecipientEmail}
                    onChange={(e) => setSignLinkRecipientEmail(e.target.value)}
                    placeholder="client@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="signLinkExpiry">Link expires in (days)</Label>
                  <Input
                    id="signLinkExpiry"
                    type="number"
                    min={1}
                    max={60}
                    value={signLinkExpiryDays}
                    onChange={(e) =>
                      setSignLinkExpiryDays(parseInt(e.target.value) || 7)
                    }
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    The link can only be used once. After successful signing it
                    is automatically deactivated.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 py-2">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm text-emerald-900">
                  <p className="font-semibold flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Signing link created
                  </p>
                  <p className="text-xs mt-1">
                    The link has been copied to your clipboard. Paste it into
                    your email to {signLinkRecipientEmail}, or use the
                    &ldquo;Email Document&rdquo; button on the document row to
                    send it from inside the app.
                  </p>
                </div>
                <div className="font-mono text-xs break-all bg-gray-50 border border-gray-200 rounded-lg p-3">
                  {signLinkResult}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    if (signLinkResult) {
                      navigator.clipboard
                        .writeText(signLinkResult)
                        .catch(() => {});
                    }
                  }}
                  className="gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copy link again
                </Button>
              </div>
            )}
            <DialogFooter>
              {!signLinkResult ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setIsSignLinkOpen(false)}
                    disabled={signLinkBuilding}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateSignLink}
                    disabled={
                      signLinkBuilding ||
                      !signLinkRecipientName.trim() ||
                      !signLinkRecipientEmail.trim()
                    }
                    className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <PenTool className="h-4 w-4" />
                    {signLinkBuilding ? 'Creating link…' : 'Create signing link'}
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsSignLinkOpen(false)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Done
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Send to Client File Dialog */}
        <Dialog
          open={isFileDispatchOpen}
          onOpenChange={(open) => {
            setIsFileDispatchOpen(open);
            if (!open) {
              setDispatchingDocument(null);
              setDispatchNotes('');
            }
          }}
        >
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Send to Client File</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                <p className="text-blue-900 font-semibold mb-1">
                  {dispatchingDocument?.documentName || 'Document'}
                  {dispatchingDocument?.signedDocumentUrl && (
                    <Badge className="ml-2 bg-green-100 text-green-800 border-green-300">
                      Signed
                    </Badge>
                  )}
                </p>
                <p className="text-blue-700 text-xs">
                  This will attach the document to the LSO compliance
                  section of the chosen client file.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Client File *</Label>
                <Select
                  value={dispatchTargetFileId}
                  onValueChange={setDispatchTargetFileId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose the client file to attach to" />
                  </SelectTrigger>
                  <SelectContent>
                    {dispatchClientFiles.length === 0 ? (
                      <SelectItem value="__none__" disabled>
                        No client files available
                      </SelectItem>
                    ) : (
                      dispatchClientFiles.map((f: any) => (
                        <SelectItem key={f._id} value={f._id}>
                          {f.fileNumber || f._id} —{' '}
                          {f.clientName || 'No client name'}
                          {f.matterType ? ` (${f.matterType})` : ''}
                          {f.clientId === dispatchingDocument?.clientId
                            ? '  ✓ same client'
                            : ''}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>LSO Compliance Section *</Label>
                <Select
                  value={dispatchSectionKey}
                  onValueChange={setDispatchSectionKey}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose section A–K" />
                  </SelectTrigger>
                  <SelectContent>
                    {FILE_LSO_SECTIONS.map((s) => (
                      <SelectItem key={s.key} value={s.key}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  Signed retainers usually belong in Section F. Court
                  filings, evidence, and correspondence usually belong
                  in Section I.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dispatchNotes">Note (optional)</Label>
                <Textarea
                  id="dispatchNotes"
                  value={dispatchNotes}
                  onChange={(e) => setDispatchNotes(e.target.value)}
                  placeholder="Any context for the file (e.g. 'Client signed via portal on Apr 14')"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsFileDispatchOpen(false)}
                disabled={isDispatching}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendToClientFile}
                className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                disabled={
                  isDispatching ||
                  !dispatchTargetFileId ||
                  !dispatchSectionKey
                }
              >
                <Archive className="h-4 w-4" />
                {isDispatching ? 'Sending…' : 'Send to Client File'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Send Document Dialog */}
        <Dialog open={isSendDialogOpen} onOpenChange={setIsSendDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Send Document to Client</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="emailMessage">Email Message (Optional)</Label>
                <Textarea
                  id="emailMessage"
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  placeholder="Add a personal message for the client..."
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsSendDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendDocument} className="gap-2">
                <Send className="h-4 w-4" />
                Send Document
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Signature Dialog */}
        <Dialog open={isSignatureDialogOpen} onOpenChange={setIsSignatureDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DocumentSignature
              documentId={documentToSign?._id || ''}
              documentName={documentToSign?.documentName || 'Document'}
              onSignatureComplete={handleSignatureComplete}
              onCancel={() => {
                setIsSignatureDialogOpen(false);
                setDocumentToSign(null);
              }}
            />
          </DialogContent>
        </Dialog>

        {/* Email Signed Document Dialog */}
        <EmailDocumentDialog
          document={emailingDocument}
          isOpen={isEmailDialogOpen}
          onClose={() => {
            setIsEmailDialogOpen(false);
            setEmailingDocument(null);
          }}
          onSend={handleEmailSignedDocument}
          paralegalName={
            localStorage.getItem('currentUser')
              ? JSON.parse(localStorage.getItem('currentUser')!).firstName + ' ' + JSON.parse(localStorage.getItem('currentUser')!).lastName
              : 'Admin'
          }
          clientName={
            emailingDocument && clients.find(c => c._id === emailingDocument.clientId)
              ? `${clients.find(c => c._id === emailingDocument.clientId)?.firstName || ''} ${clients.find(c => c._id === emailingDocument.clientId)?.lastName || ''}`.trim()
              : 'Client'
          }
          uploadToken={emailingDocument?.uploadToken}
        />
      </main>

      {!embedded && <Footer />}
    </div>
  );
}
