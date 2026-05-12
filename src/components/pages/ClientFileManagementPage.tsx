/**
 * Client File Management Page — LSO By-Law 7.1 Compliant
 *
 * Paralegal-facing interface for managing client files organized
 * into LSO compliance sections. Supports file opening, tracking,
 * compliance scoring, and audit readiness.
 */
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToDashboard from '@/components/BackToDashboard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  FileText, Users, Shield, Scale, CheckCircle, AlertCircle,
  Clock, DollarSign, MessageCircle, FolderOpen, FolderClosed,
  Search, Plus, ArrowLeft, ChevronRight, Eye, Edit3,
  Upload, Phone, Mail, MapPin, Briefcase, CreditCard,
  AlertTriangle, Calendar, FileCheck, User, Building2,
  ClipboardCheck, BarChart3, Lock, Loader2, Trash2, LockKeyhole, X, Save,
  Download, Printer
} from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { sendDocumentEmail, EmailActivityLog } from '@/lib/email-service';
import EmailDocumentDialog, { EmailFormData } from '@/components/EmailDocumentDialog';
import { GeneratedDocuments } from '@/entities';
import { generateRetainerPDF } from '@/lib/retainer-pdf-generator';
import { generateRetainerHTML } from '@/lib/retainer-html-generator';
import { getActiveParalegals, DEFAULT_PARALEGAL_ID } from '@/lib/paralegals';
import SectionDocuments from '@/components/SectionDocuments';

// ============================================================
// TYPES
// ============================================================

interface ClientFile {
  _id: string;
  fileNumber: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  matterType: string;
  matterDescription: string;
  tribunal: string;
  assignedParalegalName: string;
  fileStatus: string;
  dateOpened: string;
  complianceScore: number;
  conflictStatus?: 'passed' | 'flagged';
  sections: ComplianceSections;
}

interface ComplianceSections {
  fileOpening: boolean;
  clientIdentification: boolean;
  clientVerification: boolean;
  sourceOfFunds: boolean;
  conflictCheck: boolean;
  retainerAgreement: boolean;
  financialRecords: boolean;
  communicationLog: boolean;
  caseDocuments: boolean;
  fileClosing: boolean;
  contingencyPlan: boolean;
}

// ============================================================
// SECTION CONFIG — Maps LSO By-Law 7.1 sections
// ============================================================

const LSO_SECTIONS = [
  { key: 'fileOpening', label: 'A. File Opening & Matter Info', icon: FolderOpen, bylaw: 'General', color: 'bg-blue-500' },
  { key: 'clientIdentification', label: 'B. Client Identification', icon: User, bylaw: 's.23(1)', color: 'bg-emerald-500' },
  { key: 'clientVerification', label: 'C. Client Verification', icon: Shield, bylaw: 's.23(4)-(15)', color: 'bg-violet-500' },
  { key: 'sourceOfFunds', label: 'D. Source of Funds', icon: CreditCard, bylaw: 's.23(2), s.23.1', color: 'bg-amber-500' },
  { key: 'conflictCheck', label: 'E. Conflict of Interest', icon: AlertTriangle, bylaw: 'Rules of Conduct', color: 'bg-red-500' },
  { key: 'retainerAgreement', label: 'F. Retainer Agreement', icon: FileCheck, bylaw: 'Rules of Conduct', color: 'bg-indigo-500' },
  { key: 'financialRecords', label: 'G. Financial Records', icon: DollarSign, bylaw: 'Forms 9A-9E', color: 'bg-green-500' },
  { key: 'communicationLog', label: 'H. Communication Log', icon: MessageCircle, bylaw: 's.23(14)', color: 'bg-cyan-500' },
  { key: 'caseDocuments', label: 'I. Case Documents', icon: FileText, bylaw: 'General', color: 'bg-orange-500' },
  { key: 'fileClosing', label: 'J. File Closing', icon: FolderClosed, bylaw: 's.23(14)', color: 'bg-gray-500' },
  { key: 'contingencyPlan', label: 'K. Contingency Plan', icon: Lock, bylaw: 'Part II.1', color: 'bg-pink-500' },
] as const;

const MATTER_TYPES: Record<string, { label: string; color: string }> = {
  traffic: { label: 'Traffic Tickets', color: 'bg-blue-100 text-blue-800' },
  ltb: { label: 'Landlord & Tenant', color: 'bg-green-100 text-green-800' },
  small_claims: { label: 'Small Claims', color: 'bg-purple-100 text-purple-800' },
  criminal: { label: 'Criminal Matters', color: 'bg-red-100 text-red-800' },
  hrto: { label: 'Human Rights', color: 'bg-amber-100 text-amber-800' },
  employment: { label: 'Employment', color: 'bg-cyan-100 text-cyan-800' },
  debt_collection: { label: 'Debt Collection', color: 'bg-orange-100 text-orange-800' },
};

// ============================================================
// CMS COLLECTION — Wix Data collection for client files
// ============================================================
const CLIENT_FILES_COLLECTION = 'clientfiles';

// Default sections for a new client file
const DEFAULT_SECTIONS: ComplianceSections = {
  fileOpening: false,
  clientIdentification: false,
  clientVerification: false,
  sourceOfFunds: false,
  conflictCheck: false,
  retainerAgreement: false,
  financialRecords: false,
  communicationLog: false,
  caseDocuments: false,
  fileClosing: false,
  contingencyPlan: false,
};

/**
 * Calculates compliance score from sections object
 */
function calcComplianceScore(sections: ComplianceSections): number {
  const total = Object.keys(sections).length;
  const completed = Object.values(sections).filter(Boolean).length;
  return total > 0 ? Math.round((completed / total) * 100) : 0;
}

/**
 * Generates the next sequential file number (LA-YYYY-NNNN)
 */
function generateFileNumber(existingFiles: ClientFile[]): string {
  const year = new Date().getFullYear();
  const prefix = `LA-${year}-`;
  const existing = existingFiles
    .map(f => f.fileNumber)
    .filter(fn => fn.startsWith(prefix))
    .map(fn => parseInt(fn.replace(prefix, ''), 10))
    .filter(n => !isNaN(n));
  const next = existing.length > 0 ? Math.max(...existing) + 1 : 1;
  return `${prefix}${String(next).padStart(4, '0')}`;
}

// ============================================================
// COMPONENT
// ============================================================

export default function ClientFileManagementPage({ embedded }: { embedded?: boolean } = {}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [files, setFiles] = useState<ClientFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<ClientFile | null>(null);
  const [activeSection, setActiveSection] = useState<string>('fileOpening');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showNewFileModal, setShowNewFileModal] = useState(false);

  // Loading state for CMS data
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Delete & Seal states
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [showSealConfirm, setShowSealConfirm] = useState(false);
  const [sealPassword, setSealPassword] = useState('');
  const [sealError, setSealError] = useState('');

  // Compliance Report states
  const [showComplianceReport, setShowComplianceReport] = useState(false);

  // Edit states
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  // New file form states
  const [newFileData, setNewFileData] = useState({
    clientName: '',
    clientEmail: '',
    matterType: 'traffic',
    matterDescription: '',
    tribunal: '',
    assignedParalegalName: 'Johnny Demers',
  });
  const [creatingFile, setCreatingFile] = useState(false);

  const ADMIN_PASSWORD = 'd081384';

  // ============================================================
  // LOAD FILES FROM WIX CMS
  // ============================================================
  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      // Load existing clientfiles from CMS
      const result = await BaseCrudService.getAll<any>(CLIENT_FILES_COLLECTION, undefined, { limit: 1000 });
      const mapped: ClientFile[] = result.items.map((item: any) => ({
        _id: item._id,
        fileNumber: item.fileNumber || '',
        clientId: item.clientId || item._id,
        clientName: item.clientName || '',
        clientEmail: item.clientEmail || '',
        matterType: item.matterType || '',
        matterDescription: item.matterDescription || '',
        tribunal: item.tribunal || '',
        assignedParalegalName: item.assignedParalegalName || '',
        fileStatus: item.fileStatus || 'active',
        dateOpened: item.dateOpened || item._createdDate || new Date().toISOString(),
        complianceScore: item.complianceScore ?? calcComplianceScore(item.sections || DEFAULT_SECTIONS),
        conflictStatus: item.conflictStatus,
        sections: {
          fileOpening: item.sections?.fileOpening ?? item.sectionFileOpening ?? false,
          clientIdentification: item.sections?.clientIdentification ?? item.sectionClientIdentification ?? false,
          clientVerification: item.sections?.clientVerification ?? item.sectionClientVerification ?? false,
          sourceOfFunds: item.sections?.sourceOfFunds ?? item.sectionSourceOfFunds ?? false,
          conflictCheck: item.sections?.conflictCheck ?? item.sectionConflictCheck ?? false,
          retainerAgreement: item.sections?.retainerAgreement ?? item.sectionRetainerAgreement ?? false,
          financialRecords: item.sections?.financialRecords ?? item.sectionFinancialRecords ?? false,
          communicationLog: item.sections?.communicationLog ?? item.sectionCommunicationLog ?? false,
          caseDocuments: item.sections?.caseDocuments ?? item.sectionCaseDocuments ?? false,
          fileClosing: item.sections?.fileClosing ?? item.sectionFileClosing ?? false,
          contingencyPlan: item.sections?.contingencyPlan ?? item.sectionContingencyPlan ?? false,
        },
      }));

      // Sync: also load clients from clientprofiles + fileassignments that don't yet have a clientfiles entry
      try {
        const [assignmentsRes, profilesRes, accountsRes] = await Promise.all([
          BaseCrudService.getAll<any>('fileassignments', undefined, { limit: 1000 }),
          BaseCrudService.getAll<any>('clientprofiles', undefined, { limit: 1000 }),
          BaseCrudService.getAll<any>('useraccounts', undefined, { limit: 1000 }),
        ]);

        const existingClientIds = new Set(mapped.map(f => f.clientId));
        const profileMap = new Map(profilesRes.items.map((p: any) => [p._id, p]));

        // Find assignments whose clientId is NOT already in clientfiles
        const missingAssignments = assignmentsRes.items.filter(
          (a: any) => a.clientId && !existingClientIds.has(a.clientId)
        );

        // Auto-create clientfiles entries for these missing clients
        const newFiles: ClientFile[] = [];
        for (const assignment of missingAssignments) {
          const profile = profileMap.get(assignment.clientId);
          if (!profile) continue;

          const clientName = `${profile.firstName || ''} ${profile.lastName || ''}`.trim();
          const account = accountsRes.items.find((u: any) => u.clientId === assignment.clientId || u._id === assignment.clientId);
          const clientEmail = account?.email || profile.email || '';

          // Find paralegal name
          const paralegal = accountsRes.items.find((u: any) => u._id === assignment.paralegalId);
          const paralegalName = paralegal ? `${paralegal.firstName || ''} ${paralegal.lastName || ''}`.trim() : '';

          const fileNumber = generateFileNumber([...mapped, ...newFiles]);
          const now = new Date();

          try {
            const created = await BaseCrudService.create<any>(CLIENT_FILES_COLLECTION, {
              title: `${clientName} — ${assignment.caseType || 'General'}`,
              fileNumber,
              clientId: assignment.clientId,
              clientName,
              clientEmail,
              matterType: assignment.caseType || 'traffic',
              matterDescription: assignment.caseType || '',
              assignedParalegalName: paralegalName,
              fileStatus: assignment.fileStatus || 'active',
              dateOpened: now,
              complianceScore: 0,
              conflictStatus: 'pending',
              sectionFileOpening: false,
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

            newFiles.push({
              _id: created._id,
              fileNumber,
              clientId: assignment.clientId,
              clientName,
              clientEmail,
              matterType: assignment.caseType || 'traffic',
              matterDescription: assignment.caseType || '',
              tribunal: '',
              assignedParalegalName: paralegalName,
              fileStatus: assignment.fileStatus || 'active',
              dateOpened: now.toISOString(),
              complianceScore: 0,
              conflictStatus: 'pending',
              sections: { ...DEFAULT_SECTIONS },
            });
          } catch (createErr) {
            console.warn('Could not auto-create clientfile for', clientName, createErr);
          }
        }

        setFiles([...mapped, ...newFiles]);
      } catch (syncError) {
        console.warn('Could not sync clients from fileassignments:', syncError);
        setFiles(mapped);
      }
    } catch (error) {
      console.error('Error loading client files from CMS:', error);
      setLoadError('Unable to load client files. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================================
  // CREATE NEW FILE IN CMS
  // ============================================================
  const handleCreateNewFile = async () => {
    if (!newFileData.clientName || !newFileData.matterDescription) return;
    setCreatingFile(true);
    try {
      const fileNumber = generateFileNumber(files);
      const sections = { ...DEFAULT_SECTIONS };
      const now = new Date();

      // Build a minimal payload with only core fields Wix CMS expects.
      // Use Date objects (not strings) for date fields — Wix Data API requires this.
      // Section booleans are stored as flat fields for CMS compatibility.
      const payload: Record<string, unknown> = {
        title: `${newFileData.clientName} — ${newFileData.matterDescription}`,
        fileNumber,
        clientId: `CL-${Date.now()}`,
        clientName: newFileData.clientName,
        clientEmail: newFileData.clientEmail || '',
        matterType: newFileData.matterType || 'traffic',
        matterDescription: newFileData.matterDescription,
        tribunal: newFileData.tribunal || '',
        assignedParalegalName: newFileData.assignedParalegalName || 'Johnny Demers',
        fileStatus: 'active',
        dateOpened: now, // Wix expects a Date object, NOT a string
        complianceScore: 0,
        conflictStatus: 'passed',
        sectionFileOpening: false,
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
      };

      let created: any;
      try {
        created = await BaseCrudService.create<any>(CLIENT_FILES_COLLECTION, payload);
      } catch (cmsError: any) {
        // If the collection doesn't have certain fields, try a minimal payload
        console.warn('Full payload failed, retrying with minimal fields:', cmsError?.message);
        const minimalPayload: Record<string, unknown> = {
          title: payload.title,
          fileNumber,
          clientName: newFileData.clientName,
          clientEmail: newFileData.clientEmail || '',
          matterType: newFileData.matterType || 'traffic',
          matterDescription: newFileData.matterDescription,
          fileStatus: 'active',
          dateOpened: now,
        };
        created = await BaseCrudService.create<any>(CLIENT_FILES_COLLECTION, minimalPayload);
      }

      const newFile: ClientFile = {
        _id: created._id,
        fileNumber,
        clientId: payload.clientId as string,
        clientName: newFileData.clientName,
        clientEmail: newFileData.clientEmail,
        matterType: newFileData.matterType,
        matterDescription: newFileData.matterDescription,
        tribunal: newFileData.tribunal,
        assignedParalegalName: newFileData.assignedParalegalName,
        fileStatus: 'active',
        dateOpened: now.toISOString(),
        complianceScore: 0,
        sections,
      };

      setFiles(prev => [newFile, ...prev]);
      setShowNewFileModal(false);
      setNewFileData({
        clientName: '',
        clientEmail: '',
        matterType: 'traffic',
        matterDescription: '',
        tribunal: '',
        assignedParalegalName: 'Johnny Demers',
      });
    } catch (error: any) {
      console.error('Error creating client file:', error);
      const msg = error?.message || 'Unknown error';
      alert(`Failed to create client file: ${msg}\n\nPlease ensure the "clientfiles" collection exists in your Wix CMS with the required fields.`);
    } finally {
      setCreatingFile(false);
    }
  };

  const handleEditChange = (key: string, value: string) => {
    setEditValues(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSection = async () => {
    if (!selectedFile || !editingSection) return;
    setSaving(true);
    try {
      // Save section data to CMS on the client file itself
      const cmsFieldKey = `section${editingSection.charAt(0).toUpperCase() + editingSection.slice(1)}`;
      const updatedSections = { ...selectedFile.sections, [editingSection]: true };
      const newScore = calcComplianceScore(updatedSections);

      // ---- Split editValues into file-fields vs profile-fields ----
      // Section B (Client Identification) and others edit fields that live
      // on the clientprofiles row (address, occupation, dateOfBirth,
      // phoneNumber, etc.) NOT on the clientfiles row. If we dump every
      // editValue into both updates, Wix's clientfiles update ignores or
      // rejects the unknown fields, and the profile update silently fails
      // because of UUID-mismatch. So we route fields explicitly.
      const PROFILE_FIELDS = new Set([
        'firstName', 'lastName', 'preferredName', 'dateOfBirth',
        'preferredLanguage', 'phoneNumber', 'alternatePhone',
        'preferredContactMethod', 'bestTimeToContact',
        'streetAddress', 'unitNumber', 'city', 'state', 'zipCode',
        'businessAddress', 'businessPhone', 'businessName',
        'occupation', 'employer', 'emergencyContactName',
        'emergencyContactPhone', 'emergencyContactRelationship',
        'thirdPartyName', 'thirdPartyRelationship', 'actingForThirdParty',
        'orgName', 'orgIncorporationNumber', 'orgNatureOfBusiness',
        'isOrganization', 'isMinor', 'parentGuardianName',
        'parentGuardianPhone', 'idType', 'idNumber',
        'idIssuingAuthority', 'idExpiryDate', 'idVerificationConsent',
      ]);
      const FILE_FIELDS = new Set([
        'fileNumber', 'matterType', 'matterDescription', 'tribunal',
        'opposingParties', 'fileStatus', 'courtFileNumber',
        'conflictStatus', 'notes', 'conflictNotes',
        // Section A — assigned paralegal lives on the file row
        'assignedParalegalName', 'assignedParalegalId',
        // Denormalised client display fields kept on the file row so
        // list views render without joining clientprofiles.
        'clientName', 'clientEmail',
      ]);

      // Helper: coerce date-string inputs to Date so Wix datetime fields
      // accept them. Pass-through anything else (incl. empty string).
      const coerce = (k: string, v: any) => {
        const dateKeys = ['dateOfBirth', 'idExpiryDate', 'dateOpened',
                          'dateClosed', 'retentionExpiryDate'];
        if (dateKeys.includes(k) && typeof v === 'string' && v.trim()) {
          const d = new Date(v);
          return isNaN(d.getTime()) ? v : d;
        }
        return v;
      };

      const fileUpdates: Record<string, any> = {};
      const profileUpdates: Record<string, any> = {};
      Object.entries(editValues).forEach(([k, v]) => {
        const cv = coerce(k, v);
        // Special case: Section B's "Full Legal Name" EditableField
        // uses fieldKey="clientName" which doesn't exist as a column
        // on either clientprofiles (uses firstName/lastName) or
        // clientfiles. Split the entered full name and route the
        // pieces to the profile row. Also mirror onto the file row's
        // clientName denormalised column so search/list views update.
        if (k === 'clientName' && typeof cv === 'string') {
          const parts = cv.trim().split(/\s+/);
          const firstName = parts.shift() || '';
          const lastName = parts.join(' ');
          profileUpdates['firstName'] = firstName;
          profileUpdates['lastName'] = lastName;
          fileUpdates['clientName'] = cv.trim();
          return;
        }
        if (PROFILE_FIELDS.has(k)) profileUpdates[k] = cv;
        else if (FILE_FIELDS.has(k)) fileUpdates[k] = cv;
        else {
          // Unknown key — best-effort: try profile first since most
          // editable fields in the wizard live there.
          profileUpdates[k] = cv;
        }
      });

      // 1) Update the file row (mark section complete + any file-level fields)
      await BaseCrudService.update(CLIENT_FILES_COLLECTION, {
        _id: selectedFile._id,
        [cmsFieldKey]: true,
        complianceScore: newScore,
        ...fileUpdates,
      } as any);

      // 2) Update the client profile — but only if we have a real row id.
      //    Three-tier resolution because file.clientId is unreliable across
      //    creation paths (AssignmentsTab vs self-signup vs imported data,
      //    plus a stale `item.clientId || item._id` fallback in loadFiles
      //    that hands back the FILE's own id when clientId is missing).
      if (Object.keys(profileUpdates).length > 0) {
        let profileRow: any = null;

        // Tier 1: by row primary key (the happy path for AssignmentsTab files)
        if (selectedFile.clientId) {
          try {
            profileRow = await BaseCrudService.getById<any>(
              'clientprofiles', selectedFile.clientId
            );
          } catch { /* fall through */ }
        }

        // Tiers 2 & 3: scan clientprofiles. limit:1000 because the default
        // 50-row page would silently miss any profile past page 1.
        if (!profileRow) {
          try {
            const { items } = await BaseCrudService.getAll<any>(
              'clientprofiles', undefined, { limit: 1000 }
            );
            // Tier 2: match by clientprofiles.clientId field (CL-XXXXXX style)
            if (selectedFile.clientId) {
              profileRow = items?.find((p: any) =>
                p.clientId === selectedFile.clientId
              ) || null;
            }
            // Tier 3: match by full name + email — works even when the file's
            // clientId is broken or points at the file's own _id (which is
            // what the loadFiles `|| item._id` fallback hands back when the
            // CMS row has no clientId set).
            if (!profileRow && selectedFile.clientName) {
              const targetName = selectedFile.clientName.trim().toLowerCase();
              const targetEmail = (selectedFile.clientEmail || '').trim().toLowerCase();
              profileRow = items?.find((p: any) => {
                const pName = `${p.firstName || ''} ${p.lastName || ''}`.trim().toLowerCase();
                const pEmail = (p.email || '').trim().toLowerCase();
                if (pName && pName === targetName) return true;
                if (targetEmail && pEmail && pEmail === targetEmail) return true;
                return false;
              }) || null;
            }
          } catch { /* still null */ }
        }

        if (profileRow?._id) {
          try {
            await BaseCrudService.update('clientprofiles', {
              _id: profileRow._id,
              ...profileUpdates,
            } as any);
          } catch (err: any) {
            // eslint-disable-next-line no-console
            console.error('clientprofiles update failed:', err);
            // Surface the real error so the user knows what happened.
            throw new Error(
              `Could not save profile fields: ${err?.message || 'unknown error'}`
            );
          }
        } else {
          // No matching profile found after all three resolution tiers.
          // Auto-create one (self-healing). This handles orphaned files
          // — files where the original clientprofiles row was never
          // created, was deleted, or has name/email that don't match.
          // We seed the new row with whatever we have on the file plus
          // the user's edits, and link it via clientfiles.clientId so
          // subsequent loads/saves resolve normally.
          const [seedFirst, ...seedRestParts] = (selectedFile.clientName || '').trim().split(/\s+/);
          const seedLast = seedRestParts.join(' ').trim();
          const newProfileId = crypto.randomUUID();
          const seedPayload: any = {
            _id: newProfileId,
            firstName: profileUpdates.firstName ?? seedFirst ?? '',
            lastName: profileUpdates.lastName ?? seedLast ?? '',
            email: selectedFile.clientEmail || '',
            ...profileUpdates,
            // Make sure the right id wins even if profileUpdates spread above it
            _id: newProfileId,
          };
          try {
            await BaseCrudService.create('clientprofiles', seedPayload);
          } catch (err: any) {
            // eslint-disable-next-line no-console
            console.error('Auto-create clientprofiles failed:', err);
            throw new Error(
              `Could not create or update the client profile: ${err?.message || 'unknown error'}. ` +
              `File id: ${selectedFile._id}.`
            );
          }
          // Re-link the file to the freshly-created profile so subsequent
          // loads find it via tier 1 (getById).
          try {
            await BaseCrudService.update(CLIENT_FILES_COLLECTION, {
              _id: selectedFile._id,
              clientId: newProfileId,
            } as any);
            selectedFile.clientId = newProfileId;
          } catch (err: any) {
            // eslint-disable-next-line no-console
            console.warn('Could not re-link file to new profile (non-fatal):', err);
          }
          // eslint-disable-next-line no-console
          console.info('Auto-created clientprofiles row for orphan file:', selectedFile._id, '→ profile', newProfileId);
        }
      }

      // Mark section as complete in local state — and merge in any
      // file-level edits (matterType, tribunal, assignedParalegalName,
      // assignedParalegalId, etc.) so the UI shows the new values right
      // away without needing a hard refresh.
      setFiles(prev => prev.map(f =>
        f._id === selectedFile._id
          ? { ...f, ...fileUpdates, sections: updatedSections, complianceScore: newScore }
          : f
      ));
      setSelectedFile({
        ...selectedFile,
        ...fileUpdates,
        sections: updatedSections,
        complianceScore: newScore,
      });
      setEditingSection(null);
      setEditValues({});
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('Error saving section:', error);
      alert(
        error?.message
          ? `Failed to save section: ${error.message}`
          : 'Failed to save section data. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingSection(null);
    setEditValues({});
  };

  const handleToggleSectionComplete = async (sectionKey: string) => {
    if (!selectedFile) return;
    const current = selectedFile.sections[sectionKey as keyof ComplianceSections];
    const updatedSections = { ...selectedFile.sections, [sectionKey]: !current };
    const newScore = calcComplianceScore(updatedSections);

    // Update local state immediately for responsiveness
    setFiles(prev => prev.map(f =>
      f._id === selectedFile._id
        ? { ...f, sections: updatedSections, complianceScore: newScore }
        : f
    ));
    setSelectedFile({
      ...selectedFile,
      sections: updatedSections,
      complianceScore: newScore,
    });

    // Persist to CMS
    try {
      // Map section key to CMS field name (e.g., fileOpening → sectionFileOpening)
      const cmsFieldKey = `section${sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}`;
      await BaseCrudService.update(CLIENT_FILES_COLLECTION, {
        _id: selectedFile._id,
        [cmsFieldKey]: !current,
        complianceScore: newScore,
      } as any);
    } catch (error) {
      console.error('Error updating section in CMS:', error);
    }
  };

  const handleDeleteFile = async () => {
    if (deletePassword !== ADMIN_PASSWORD) {
      setDeleteError('Incorrect password. File not deleted.');
      return;
    }
    if (!selectedFile) return;

    try {
      // Delete from CMS
      await BaseCrudService.delete(CLIENT_FILES_COLLECTION, selectedFile._id);
      // Remove from local state
      setFiles(prev => prev.filter(f => f._id !== selectedFile._id));
      setSelectedFile(null);
      setSearchParams({});
      setShowDeleteConfirm(false);
      setDeletePassword('');
      setDeleteError('');
    } catch (error) {
      console.error('Error deleting file from CMS:', error);
      setDeleteError('Failed to delete file. Please try again.');
    }
  };

  const handleSealFile = async () => {
    if (sealPassword !== ADMIN_PASSWORD) {
      setSealError('Incorrect password. File not sealed.');
      return;
    }
    if (!selectedFile) return;

    try {
      // Update status in CMS
      await BaseCrudService.update(CLIENT_FILES_COLLECTION, { _id: selectedFile._id, fileStatus: 'sealed' } as any);
      // Update local state
      setFiles(prev => prev.map(f =>
        f._id === selectedFile._id ? { ...f, fileStatus: 'sealed' } : f
      ));
      setSelectedFile({ ...selectedFile, fileStatus: 'sealed' });
      setShowSealConfirm(false);
      setSealPassword('');
      setSealError('');
    } catch (error) {
      console.error('Error sealing file in CMS:', error);
      setSealError('Failed to seal file. Please try again.');
    }
  };

  // Check if a specific file is requested via URL
  useEffect(() => {
    const fileId = searchParams.get('file');
    if (fileId) {
      const file = files.find(f => f._id === fileId);
      if (file) setSelectedFile(file);
    }
  }, [searchParams, files]);

  const filteredFiles = files.filter(f => {
    const matchesSearch = searchQuery === '' ||
      f.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.fileNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.matterDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || f.fileStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getComplianceColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  const getComplianceBg = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'archived': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'sealed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // ============================================================
  // FILE LIST VIEW
  // ============================================================

  if (!selectedFile) {
    return (
      <div className={embedded ? '' : 'min-h-screen bg-gray-50'}>
        {!embedded && <><Header /><BackToDashboard /></>}

        <div className={embedded ? '' : 'max-w-[100rem] mx-auto px-4 md:px-8 py-8'}>
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="font-heading text-3xl font-bold text-gray-900">Client Files</h1>
              <p className="font-paragraph text-gray-600 mt-1">LSO By-Law 7.1 compliant file management</p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <Button
                onClick={() => setShowNewFileModal(true)}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Open New File
              </Button>
              <Button variant="outline" className="border-primary text-primary" onClick={() => setShowComplianceReport(true)}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Compliance Report
              </Button>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center mb-8">
              <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
              <h3 className="font-heading text-lg text-gray-700 mb-1">Loading client files…</h3>
              <p className="font-paragraph text-sm text-gray-400">Fetching data from Wix CMS</p>
            </div>
          )}

          {/* Error State */}
          {loadError && !isLoading && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div>
                  <p className="font-heading font-semibold text-red-800">{loadError}</p>
                  <p className="font-paragraph text-sm text-red-600 mt-0.5">Files may not have loaded correctly.</p>
                </div>
              </div>
              <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100" onClick={loadFiles}>
                Retry
              </Button>
            </div>
          )}

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FolderOpen className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{files.filter(f => f.fileStatus === 'active').length}</p>
                  <p className="text-sm text-gray-500">Active Files</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{files.filter(f => f.complianceScore < 50).length}</p>
                  <p className="text-sm text-gray-500">Need Attention</p>
                </div>
              </div>
            </div>
            <div className={`bg-white rounded-xl border p-4 ${files.filter(f => f.conflictStatus === 'flagged').length > 0 ? 'border-amber-300 bg-amber-50' : 'border-gray-200'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${files.filter(f => f.conflictStatus === 'flagged').length > 0 ? 'bg-amber-200' : 'bg-gray-100'}`}>
                  <AlertTriangle className={`w-5 h-5 ${files.filter(f => f.conflictStatus === 'flagged').length > 0 ? 'text-amber-700' : 'text-gray-400'}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{files.filter(f => f.conflictStatus === 'flagged').length}</p>
                  <p className="text-sm text-gray-500">Conflicts Flagged</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ClipboardCheck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {files.length > 0 ? Math.round(files.reduce((sum, f) => sum + f.complianceScore, 0) / files.length) : 0}%
                  </p>
                  <p className="text-sm text-gray-500">Avg Compliance</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <FolderClosed className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{files.filter(f => f.fileStatus === 'closed').length}</p>
                  <p className="text-sm text-gray-500">Closed Files</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by client name, file number, or matter..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'active', 'pending', 'closed'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-primary text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* File List */}
          <div className="space-y-3">
            {filteredFiles.map(file => {
              const matterInfo = MATTER_TYPES[file.matterType] || { label: file.matterType, color: 'bg-gray-100 text-gray-800' };
              const completedSections = Object.values(file.sections).filter(Boolean).length;
              const totalSections = Object.values(file.sections).length;

              return (
                <div
                  key={file._id}
                  onClick={() => {
                    setSelectedFile(file);
                    setSearchParams({ file: file._id });
                  }}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* File info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-sm text-primary font-semibold">{file.fileNumber}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(file.fileStatus)}`}>
                          {file.fileStatus}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${matterInfo.color}`}>
                          {matterInfo.label}
                        </span>
                        {file.conflictStatus === 'flagged' && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Conflict Flagged
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading text-lg font-semibold text-gray-900">{file.clientName}</h3>
                      <p className="font-paragraph text-sm text-gray-500 truncate">{file.matterDescription}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Opened {new Date(file.dateOpened).toLocaleDateString('en-CA')}</span>
                        <span className="flex items-center gap-1"><User className="w-3 h-3" /> {file.assignedParalegalName}</span>
                        <span className="flex items-center gap-1"><Scale className="w-3 h-3" /> {file.tribunal}</span>
                      </div>
                    </div>

                    {/* Compliance score */}
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getComplianceColor(file.complianceScore)}`}>
                          {file.complianceScore}%
                        </div>
                        <div className="text-xs text-gray-400">{completedSections}/{totalSections} sections</div>
                        <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${getComplianceBg(file.complianceScore)}`}
                            style={{ width: `${file.complianceScore}%` }}
                          />
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300" />
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredFiles.length === 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-heading text-lg text-gray-500 mb-2">No files found</h3>
                <p className="font-paragraph text-sm text-gray-400">
                  {searchQuery ? 'Try adjusting your search terms' : 'Open a new client file to get started'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ============================================================ */}
        {/* COMPLIANCE REPORT MODAL                                      */}
        {/* ============================================================ */}
        {showComplianceReport && (() => {
          const totalFiles = files.length;
          const activeFiles = files.filter(f => f.fileStatus === 'active');
          const avgScore = totalFiles > 0 ? Math.round(files.reduce((s, f) => s + f.complianceScore, 0) / totalFiles) : 0;
          const fullyCompliant = files.filter(f => f.complianceScore === 100).length;
          const criticalFiles = files.filter(f => f.complianceScore < 50);
          const flaggedConflicts = files.filter(f => f.conflictStatus === 'flagged');

          // Per-section stats: how many files have each section complete
          const sectionStats = LSO_SECTIONS.map(sec => {
            const completed = files.filter(f => f.sections[sec.key as keyof ComplianceSections]).length;
            return { ...sec, completed, percentage: totalFiles > 0 ? Math.round((completed / totalFiles) * 100) : 0 };
          });

          // Find the weakest sections (lowest completion %)
          const sortedByCompletion = [...sectionStats].sort((a, b) => a.percentage - b.percentage);

          const reportDate = new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

          return (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-8">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl mx-4 my-4">
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-primary/5 to-blue-50 rounded-t-2xl">
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <BarChart3 className="w-7 h-7 text-primary" />
                      LSO By-Law 7.1 Compliance Report
                    </h2>
                    <p className="font-paragraph text-sm text-gray-500 mt-1">Generated: {reportDate}</p>
                  </div>
                  <button onClick={() => setShowComplianceReport(false)} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="p-8 space-y-8">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl border-2 border-gray-200 p-5 text-center">
                      <p className="text-3xl font-bold text-gray-900">{totalFiles}</p>
                      <p className="text-sm text-gray-500 mt-1">Total Files</p>
                    </div>
                    <div className={`rounded-xl border-2 p-5 text-center ${avgScore >= 80 ? 'bg-green-50 border-green-300' : avgScore >= 50 ? 'bg-amber-50 border-amber-300' : 'bg-red-50 border-red-300'}`}>
                      <p className={`text-3xl font-bold ${getComplianceColor(avgScore)}`}>{avgScore}%</p>
                      <p className="text-sm text-gray-500 mt-1">Avg Compliance</p>
                    </div>
                    <div className="bg-green-50 rounded-xl border-2 border-green-300 p-5 text-center">
                      <p className="text-3xl font-bold text-green-600">{fullyCompliant}</p>
                      <p className="text-sm text-gray-500 mt-1">Fully Compliant</p>
                    </div>
                    <div className={`rounded-xl border-2 p-5 text-center ${criticalFiles.length > 0 ? 'bg-red-50 border-red-300' : 'bg-green-50 border-green-300'}`}>
                      <p className={`text-3xl font-bold ${criticalFiles.length > 0 ? 'text-red-600' : 'text-green-600'}`}>{criticalFiles.length}</p>
                      <p className="text-sm text-gray-500 mt-1">Critical (&lt;50%)</p>
                    </div>
                  </div>

                  {/* Section Completion Breakdown */}
                  <div>
                    <h3 className="font-heading text-lg font-bold text-gray-900 mb-4">Section Completion Across All Files</h3>
                    <div className="space-y-3">
                      {sectionStats.map(sec => {
                        const SectionIcon = sec.icon;
                        return (
                          <div key={sec.key} className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${sec.color} text-white flex-shrink-0`}>
                              <SectionIcon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-paragraph text-sm font-medium text-gray-700 truncate">{sec.label}</span>
                                <span className="text-sm font-bold text-gray-900 ml-2">{sec.completed}/{totalFiles} ({sec.percentage}%)</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className={`h-2.5 rounded-full transition-all ${sec.percentage >= 80 ? 'bg-green-500' : sec.percentage >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                                  style={{ width: `${sec.percentage}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Weakest Areas */}
                  {sortedByCompletion.filter(s => s.percentage < 100).length > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                      <h3 className="font-heading text-lg font-bold text-amber-800 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Priority Action Items
                      </h3>
                      <div className="space-y-2">
                        {sortedByCompletion.filter(s => s.percentage < 100).slice(0, 5).map(sec => (
                          <div key={sec.key} className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-amber-100">
                            <span className="font-paragraph text-sm font-medium text-gray-800">{sec.label}</span>
                            <span className={`text-sm font-bold ${sec.percentage < 50 ? 'text-red-600' : 'text-amber-600'}`}>
                              {totalFiles - sec.completed} file{totalFiles - sec.completed !== 1 ? 's' : ''} incomplete
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Conflict Flags */}
                  {flaggedConflicts.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                      <h3 className="font-heading text-lg font-bold text-red-800 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Flagged Conflicts
                      </h3>
                      <div className="space-y-2">
                        {flaggedConflicts.map(f => (
                          <div key={f._id} className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-red-100">
                            <div>
                              <span className="font-mono text-xs text-primary font-bold mr-2">{f.fileNumber}</span>
                              <span className="font-paragraph text-sm text-gray-800">{f.clientName}</span>
                            </div>
                            <button
                              onClick={() => {
                                setShowComplianceReport(false);
                                setSelectedFile(f);
                                setSearchParams({ file: f._id });
                                setActiveSection('conflictCheck');
                              }}
                              className="text-xs text-red-600 hover:text-red-800 font-medium underline"
                            >
                              Review →
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Per-File Breakdown Table */}
                  <div>
                    <h3 className="font-heading text-lg font-bold text-gray-900 mb-4">File-by-File Breakdown</h3>
                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-left px-4 py-3 font-medium text-gray-600">File #</th>
                            <th className="text-left px-4 py-3 font-medium text-gray-600">Client</th>
                            <th className="text-left px-4 py-3 font-medium text-gray-600">Matter</th>
                            <th className="text-center px-4 py-3 font-medium text-gray-600">Score</th>
                            <th className="text-center px-4 py-3 font-medium text-gray-600">Sections</th>
                            <th className="text-center px-4 py-3 font-medium text-gray-600">Status</th>
                            <th className="text-center px-4 py-3 font-medium text-gray-600">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {files.map(f => {
                            const completed = Object.values(f.sections).filter(Boolean).length;
                            const total = Object.values(f.sections).length;
                            return (
                              <tr key={f._id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="px-4 py-3 font-mono text-xs text-primary font-bold">{f.fileNumber}</td>
                                <td className="px-4 py-3 text-gray-800">{f.clientName}</td>
                                <td className="px-4 py-3">
                                  <span className={`text-xs px-2 py-1 rounded-full ${MATTER_TYPES[f.matterType]?.color || 'bg-gray-100 text-gray-800'}`}>
                                    {MATTER_TYPES[f.matterType]?.label || f.matterType}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <span className={`font-bold ${getComplianceColor(f.complianceScore)}`}>{f.complianceScore}%</span>
                                </td>
                                <td className="px-4 py-3 text-center text-gray-600">{completed}/{total}</td>
                                <td className="px-4 py-3 text-center">
                                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(f.fileStatus)}`}>{f.fileStatus}</span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <button
                                    onClick={() => {
                                      setShowComplianceReport(false);
                                      setSelectedFile(f);
                                      setSearchParams({ file: f._id });
                                    }}
                                    className="text-xs text-primary hover:text-primary/80 font-medium underline"
                                  >
                                    Open File
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* LSO Compliance Note */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                    <p className="font-paragraph text-sm text-blue-800">
                      <strong>LSO By-Law 7.1 Reminder:</strong> All active client files must maintain complete compliance across all 11 sections.
                      Files below 100% should be reviewed and completed before any LSO audit. Conflict flags must be resolved immediately per the Rules of Professional Conduct.
                    </p>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between px-8 py-5 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                  <p className="text-xs text-gray-400">Legal Assist London — Practice Management System</p>
                  <Button onClick={() => setShowComplianceReport(false)} variant="outline">
                    Close Report
                  </Button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ============================================================ */}
        {/* NEW FILE MODAL                                               */}
        {/* ============================================================ */}
        {showNewFileModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-y-auto py-8">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4">
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-primary/5 to-emerald-50 rounded-t-2xl">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <Plus className="w-7 h-7 text-primary" />
                    Open New Client File
                  </h2>
                  <p className="font-paragraph text-sm text-gray-500 mt-1">LSO By-Law 7.1 compliant file creation</p>
                </div>
                <button onClick={() => setShowNewFileModal(false)} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-8 space-y-5">
                {/* Client Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Client Full Name *</label>
                  <Input
                    placeholder="e.g. Jane Doe"
                    value={newFileData.clientName}
                    onChange={e => setNewFileData(prev => ({ ...prev, clientName: e.target.value }))}
                  />
                </div>

                {/* Client Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Client Email</label>
                  <Input
                    type="email"
                    placeholder="e.g. jane.doe@email.com"
                    value={newFileData.clientEmail}
                    onChange={e => setNewFileData(prev => ({ ...prev, clientEmail: e.target.value }))}
                  />
                </div>

                {/* Matter Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Matter Type *</label>
                  <select
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    value={newFileData.matterType}
                    onChange={e => setNewFileData(prev => ({ ...prev, matterType: e.target.value }))}
                  >
                    {Object.entries(MATTER_TYPES).map(([key, { label }]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>

                {/* Matter Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Matter Description *</label>
                  <textarea
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-h-[80px]"
                    placeholder="Brief description of the matter…"
                    value={newFileData.matterDescription}
                    onChange={e => setNewFileData(prev => ({ ...prev, matterDescription: e.target.value }))}
                  />
                </div>

                {/* Tribunal / Court */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Tribunal / Court</label>
                  <Input
                    placeholder="e.g. Ontario Small Claims Court — London"
                    value={newFileData.tribunal}
                    onChange={e => setNewFileData(prev => ({ ...prev, tribunal: e.target.value }))}
                  />
                </div>

                {/* Assigned Paralegal */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Assigned Paralegal</label>
                  <Input
                    placeholder="e.g. Johnny Demers"
                    value={newFileData.assignedParalegalName}
                    onChange={e => setNewFileData(prev => ({ ...prev, assignedParalegalName: e.target.value }))}
                  />
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between px-8 py-5 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                <p className="text-xs text-gray-400">File number will be auto-generated</p>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setShowNewFileModal(false)} disabled={creatingFile}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-white"
                    onClick={handleCreateNewFile}
                    disabled={!newFileData.clientName || !newFileData.matterDescription || creatingFile}
                  >
                    {creatingFile ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating…
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Create File
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {!embedded && <Footer />}
      </div>
    );
  }

  // ============================================================
  // FILE DETAIL VIEW — Tabbed LSO Sections
  // ============================================================

  const completedSections = Object.values(selectedFile.sections).filter(Boolean).length;
  const totalSections = Object.values(selectedFile.sections).length;
  const currentSectionConfig = LSO_SECTIONS.find(s => s.key === activeSection);

  return (
    <div className={embedded ? '' : 'min-h-screen bg-gray-50'}>
      {!embedded && <><Header /><BackToDashboard /></>}

      <div className={embedded ? '' : 'max-w-[100rem] mx-auto px-4 md:px-8 py-8'}>
        {/* Back button and file header */}
        <button
          onClick={() => {
            setSelectedFile(null);
            setSearchParams({});
          }}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Files
        </button>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-sm text-primary font-bold">{selectedFile.fileNumber}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(selectedFile.fileStatus)}`}>
                  {selectedFile.fileStatus}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${MATTER_TYPES[selectedFile.matterType]?.color || 'bg-gray-100 text-gray-800'}`}>
                  {MATTER_TYPES[selectedFile.matterType]?.label || selectedFile.matterType}
                </span>
              </div>
              <h1 className="font-heading text-2xl font-bold text-gray-900 mb-1">{selectedFile.clientName}</h1>
              <p className="font-paragraph text-gray-600">{selectedFile.matterDescription}</p>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {selectedFile.clientEmail}</span>
                <span className="flex items-center gap-1.5"><Scale className="w-4 h-4" /> {selectedFile.tribunal}</span>
                <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {selectedFile.assignedParalegalName}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Opened {new Date(selectedFile.dateOpened).toLocaleDateString('en-CA')}</span>
              </div>
            </div>

            {/* Compliance Scorecard */}
            <div className="bg-gray-50 rounded-xl p-5 min-w-[220px]">
              <h3 className="font-heading text-sm font-semibold text-gray-700 mb-3">LSO Compliance Score</h3>
              <div className="flex items-end gap-2 mb-2">
                <span className={`text-4xl font-bold ${getComplianceColor(selectedFile.complianceScore)}`}>
                  {selectedFile.complianceScore}%
                </span>
                <span className="text-sm text-gray-400 mb-1">{completedSections}/{totalSections}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full rounded-full transition-all ${getComplianceBg(selectedFile.complianceScore)}`}
                  style={{ width: `${selectedFile.complianceScore}%` }}
                />
              </div>
              <div className="grid grid-cols-11 gap-0.5">
                {LSO_SECTIONS.map(section => (
                  <div
                    key={section.key}
                    title={section.label}
                    className={`h-2 rounded-sm ${
                      selectedFile.sections[section.key as keyof ComplianceSections]
                        ? 'bg-green-500'
                        : 'bg-red-300'
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>A</span><span>K</span>
              </div>

              {/* File Actions */}
              {selectedFile.fileStatus !== 'sealed' && (
                <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { setShowSealConfirm(true); setSealPassword(''); setSealError(''); }}
                    className="flex-1 text-purple-700 border-purple-200 hover:bg-purple-50 hover:border-purple-300"
                  >
                    <LockKeyhole className="w-3.5 h-3.5 mr-1.5" />
                    Seal File
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { setShowDeleteConfirm(true); setDeletePassword(''); setDeleteError(''); }}
                    className="flex-1 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                    Delete File
                  </Button>
                </div>
              )}
              {selectedFile.fileStatus === 'sealed' && (
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-200 text-purple-700">
                  <LockKeyhole className="w-4 h-4" />
                  <span className="text-xs font-medium">This file is sealed</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-lg font-bold text-red-800 flex items-center gap-2">
                  <Trash2 className="w-5 h-5" />
                  Delete Client File
                </h3>
                <button onClick={() => setShowDeleteConfirm(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-red-800">
                  You are about to permanently delete file <strong>{selectedFile.fileNumber}</strong> for
                  <strong> {selectedFile.clientName}</strong>. This action cannot be undone.
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter admin password to confirm
                </label>
                <Input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => { setDeletePassword(e.target.value); setDeleteError(''); }}
                  placeholder="Enter password"
                  className="border-gray-300"
                  autoFocus
                />
                {deleteError && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {deleteError}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDeleteFile}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Permanently
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Seal Confirmation Modal */}
        {showSealConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-lg font-bold text-purple-800 flex items-center gap-2">
                  <LockKeyhole className="w-5 h-5" />
                  Seal Client File
                </h3>
                <button onClick={() => setShowSealConfirm(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-purple-800">
                  Sealing file <strong>{selectedFile.fileNumber}</strong> for
                  <strong> {selectedFile.clientName}</strong> will lock it from further edits.
                  Sealed files are read-only and preserved for audit purposes.
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter admin password to confirm
                </label>
                <Input
                  type="password"
                  value={sealPassword}
                  onChange={(e) => { setSealPassword(e.target.value); setSealError(''); }}
                  placeholder="Enter password"
                  className="border-gray-300"
                  autoFocus
                />
                {sealError && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {sealError}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowSealConfirm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSealFile}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <LockKeyhole className="w-4 h-4 mr-2" />
                  Seal File
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Section Tabs + Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Section Navigation Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-4">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-heading text-sm font-semibold text-gray-700">File Sections</h3>
                <p className="text-xs text-gray-400 mt-0.5">By-Law 7.1 Compliance</p>
              </div>
              <div className="p-2">
                {LSO_SECTIONS.map(section => {
                  const isComplete = selectedFile.sections[section.key as keyof ComplianceSections];
                  const isActive = activeSection === section.key;
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.key}
                      onClick={() => setActiveSection(section.key)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-colors mb-0.5 ${
                        isActive
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${
                        isComplete ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {isComplete
                          ? <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                          : <Icon className="w-3.5 h-3.5 text-gray-400" />
                        }
                      </div>
                      <span className="truncate">{section.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  {currentSectionConfig && (
                    <div className={`w-10 h-10 ${currentSectionConfig.color} rounded-lg flex items-center justify-center`}>
                      <currentSectionConfig.icon className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div>
                    <h2 className="font-heading text-xl font-bold text-gray-900">
                      {currentSectionConfig?.label}
                    </h2>
                    <p className="text-xs text-gray-400">
                      LSO By-Law 7.1 {currentSectionConfig?.bylaw}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedFile.sections[activeSection as keyof ComplianceSections] ? (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                      <CheckCircle className="w-4 h-4" /> Complete
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">
                      <AlertCircle className="w-4 h-4" /> Incomplete
                    </span>
                  )}
                  {selectedFile.fileStatus !== 'sealed' && (
                    <>
                      {/* Toggle complete/incomplete button */}
                      {selectedFile.sections[activeSection as keyof ComplianceSections] ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleSectionComplete(activeSection)}
                          className="text-amber-700 border-amber-300 hover:bg-amber-50"
                        >
                          <X className="w-3.5 h-3.5 mr-1.5" /> Mark Incomplete
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleSectionComplete(activeSection)}
                          className="text-green-700 border-green-300 hover:bg-green-50"
                        >
                          <CheckCircle className="w-3.5 h-3.5 mr-1.5" /> Mark Complete
                        </Button>
                      )}
                      {editingSection === activeSection ? (
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={handleCancelEdit} disabled={saving}>
                            Cancel
                          </Button>
                          <Button size="sm" onClick={handleSaveSection} disabled={saving} className="bg-primary hover:bg-primary/90 text-white">
                            {saving ? <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Saving...</> : <><Save className="w-3.5 h-3.5 mr-1.5" /> Save</>}
                          </Button>
                        </div>
                      ) : (
                        <Button variant="outline" size="sm" onClick={() => { setEditingSection(activeSection); setEditValues({}); }}>
                          <Edit3 className="w-3.5 h-3.5 mr-1.5" /> Edit
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Section Content — Dynamic per section */}
              {renderSectionContent(activeSection, selectedFile, editingSection === activeSection, editValues, handleEditChange)}
            </div>
          </div>
        </div>
      </div>

      {!embedded && <Footer />}
    </div>
  );
}

// ============================================================
// SECTION CONTENT RENDERERS
// ============================================================

// Section labels for document panel headers
const SECTION_DOC_LABELS: Record<string, string> = {
  fileOpening: 'File Opening',
  clientIdentification: 'Client Identification',
  clientVerification: 'Client Verification',
  sourceOfFunds: 'Source of Funds',
  conflictCheck: 'Conflict Check',
  retainerAgreement: 'Retainer Agreement',
  financialRecords: 'Financial Records',
  communicationLog: 'Communication Log',
  caseDocuments: 'Case Documents',
  fileClosing: 'File Closing',
  contingencyPlan: 'Contingency Plan',
};

function renderSectionContent(
  sectionKey: string,
  file: ClientFile,
  editing: boolean,
  editValues: Record<string, string>,
  onChange: (key: string, val: string) => void
) {
  const props = { file, editing, editValues, onChange };

  let sectionContent: React.ReactNode;
  switch (sectionKey) {
    case 'fileOpening':
      sectionContent = <SectionFileOpening {...props} />;
      break;
    case 'clientIdentification':
      sectionContent = <SectionClientIdentification {...props} />;
      break;
    case 'clientVerification':
      sectionContent = <SectionClientVerification {...props} />;
      break;
    case 'sourceOfFunds':
      sectionContent = <SectionSourceOfFunds {...props} />;
      break;
    case 'conflictCheck':
      sectionContent = <SectionConflictCheck {...props} />;
      break;
    case 'retainerAgreement':
      sectionContent = <SectionRetainerAgreement {...props} />;
      break;
    case 'financialRecords':
      sectionContent = <SectionFinancialRecords {...props} />;
      break;
    case 'communicationLog':
      sectionContent = <SectionCommunicationLog {...props} />;
      break;
    case 'caseDocuments':
      sectionContent = <SectionCaseDocuments {...props} />;
      break;
    case 'fileClosing':
      sectionContent = <SectionFileClosing {...props} />;
      break;
    case 'contingencyPlan':
      sectionContent = <SectionContingencyPlan {...props} />;
      break;
    default:
      return <div className="text-gray-400">Section not found</div>;
  }

  return (
    <>
      {sectionContent}
      <SectionDocuments
        fileId={file._id}
        clientId={file.clientId}
        sectionKey={sectionKey}
        sectionLabel={SECTION_DOC_LABELS[sectionKey] || sectionKey}
      />
    </>
  );
}

// Reusable field display component
function Field({ label, value, icon: Icon }: { label: string; value?: string; icon?: any }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</label>
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-gray-300" />}
        <p className="text-sm text-gray-900">{value || <span className="text-gray-300 italic">Not provided</span>}</p>
      </div>
    </div>
  );
}

// Reusable editable field component
interface EditableFieldProps {
  label: string;
  value?: string;
  fieldKey: string;
  icon?: any;
  editing: boolean;
  editValues: Record<string, string>;
  onChange: (key: string, val: string) => void;
  type?: 'text' | 'date' | 'select' | 'textarea';
  options?: { value: string; label: string }[];
}

function EditableField({
  label,
  value,
  fieldKey,
  icon: Icon,
  editing,
  editValues,
  onChange,
  type = 'text',
  options,
}: EditableFieldProps) {
  if (!editing) {
    return (
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</label>
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-gray-300" />}
          <p className="text-sm text-gray-900">{value || <span className="text-gray-300 italic">Not provided</span>}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</label>
      {type === 'textarea' ? (
        <textarea
          value={editValues[fieldKey] ?? value ?? ''}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary/20 focus:border-primary"
          rows={3}
        />
      ) : type === 'select' && options ? (
        <select
          value={editValues[fieldKey] ?? value ?? ''}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="">Select...</option>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : (
        <input
          type={type}
          value={editValues[fieldKey] ?? value ?? ''}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      )}
    </div>
  );
}

function EmptySection({ message, actionLabel, onAction }: { message: string; actionLabel: string; onAction?: () => void }) {
  return (
    <div className="text-center py-8">
      <AlertCircle className="w-10 h-10 text-amber-300 mx-auto mb-3" />
      <p className="text-sm text-gray-500 mb-4">{message}</p>
      <Button variant="outline" size="sm" onClick={onAction}>
        <Plus className="w-3.5 h-3.5 mr-1.5" /> {actionLabel}
      </Button>
    </div>
  );
}

// ============================================================
// SECTION COMPONENT INTERFACE
// ============================================================

interface SectionEditProps {
  file: ClientFile;
  editing: boolean;
  editValues: Record<string, string>;
  onChange: (key: string, val: string) => void;
}

// ============================================================
// SECTION A: File Opening
// ============================================================
function SectionFileOpening({ file, editing, editValues, onChange }: SectionEditProps) {
  const [opposingParties, setOpposingParties] = useState<string>('');

  useEffect(() => {
    loadOpposingParties();
  }, [file.clientId]);

  const loadOpposingParties = async () => {
    try {
      const profile = await BaseCrudService.getById<any>('clientprofiles', file.clientId);
      if (profile?.opposingPartyNames) {
        setOpposingParties(profile.opposingPartyNames);
      }
    } catch (error) {
      console.error('Error loading opposing parties:', error);
    }
  };

  // Build dropdown option lists once per render.
  const matterTypeOptions = Object.entries(MATTER_TYPES).map(([key, { label }]) => ({
    value: key,
    label,
  }));
  const paralegalOptions = getActiveParalegals().map((p) => ({
    value: p.displayName,
    label: `${p.displayName} (LSO #${p.lsoNumber})`,
  }));

  // Tribunal/Court suggestion list — paralegals can free-type but we
  // give them the common Ontario options as a dropdown via <datalist>.
  const tribunalOptions = [
    'Ontario Court of Justice',
    'Superior Court of Justice',
    'Small Claims Court',
    'Landlord and Tenant Board',
    'Human Rights Tribunal of Ontario',
    'Social Benefits Tribunal',
    'License Appeal Tribunal',
    'Workplace Safety and Insurance Appeals Tribunal',
    'Provincial Offences Court',
    'Other / N/A',
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="File Number" value={file.fileNumber} icon={FileText} />
        <Field label="Date Opened" value={new Date(file.dateOpened).toLocaleDateString('en-CA')} icon={Calendar} />
        <EditableField
          label="Matter Type"
          value={MATTER_TYPES[file.matterType]?.label || file.matterType}
          fieldKey="matterType"
          icon={Scale}
          editing={editing}
          editValues={editValues}
          onChange={onChange}
          type="select"
          options={matterTypeOptions}
        />
        {editing ? (
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Tribunal/Court</label>
            <input
              list="tribunal-options"
              type="text"
              value={editValues['tribunal'] ?? file.tribunal ?? ''}
              onChange={(e) => onChange('tribunal', e.target.value)}
              placeholder="Choose or type the tribunal/court"
              className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <datalist id="tribunal-options">
              {tribunalOptions.map((t) => (
                <option key={t} value={t} />
              ))}
            </datalist>
          </div>
        ) : (
          <EditableField
            label="Tribunal/Court"
            value={file.tribunal}
            fieldKey="tribunal"
            icon={Building2}
            editing={editing}
            editValues={editValues}
            onChange={onChange}
          />
        )}
        <EditableField
          label="Assigned Paralegal"
          value={file.assignedParalegalName}
          fieldKey="assignedParalegalName"
          icon={User}
          editing={editing}
          editValues={editValues}
          onChange={(k, v) => {
            // When the paralegal is changed, also stamp the paralegal id
            // so downstream features (retainer signing, document workflow)
            // can resolve back to the licence record without re-matching
            // by name. Both fields are whitelisted in handleSaveSection.
            onChange(k, v);
            const match = getActiveParalegals().find(
              (p) => p.displayName === v
            );
            onChange('assignedParalegalId', match?.id || '');
          }}
          type="select"
          options={paralegalOptions}
        />
        <Field label="File Status" value={file.fileStatus.charAt(0).toUpperCase() + file.fileStatus.slice(1)} icon={FolderOpen} />
      </div>
      <div>
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Matter Description</label>
        {editing ? (
          <textarea
            value={editValues['matterDescription'] ?? file.matterDescription ?? ''}
            onChange={(e) => onChange('matterDescription', e.target.value)}
            className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary/20 focus:border-primary mt-1"
            rows={3}
          />
        ) : (
          <p className="text-sm text-gray-900 mt-1 p-3 bg-gray-50 rounded-lg">{file.matterDescription}</p>
        )}
      </div>
      <div>
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Opposing Parties</label>
        {editing ? (
          <textarea
            value={editValues['opposingPartyNames'] ?? opposingParties ?? ''}
            onChange={(e) => onChange('opposingPartyNames', e.target.value)}
            className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary/20 focus:border-primary mt-1"
            rows={2}
          />
        ) : (
          <p className={`text-sm mt-1 p-3 bg-gray-50 rounded-lg ${opposingParties ? 'text-gray-900' : 'italic text-gray-400'}`}>
            {opposingParties || 'Not yet recorded — will be populated from conflict check'}
          </p>
        )}
      </div>
    </div>
  );
}

// ============================================================
// SECTION B: Client Identification — s.23(1)
// ============================================================
function SectionClientIdentification({ file, editing, editValues, onChange }: SectionEditProps) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  // Track edit transitions so we can refetch the profile right after a
  // save (when `editing` flips false). Without this the section keeps
  // showing the stale pre-save data and looks like nothing persisted —
  // the actual write to CMS succeeded, the UI just never re-read.
  const wasEditingRef = useRef(false);

  useEffect(() => {
    loadProfile();
  }, [file.clientId]);

  // Refetch when edit mode closes (after a save).
  useEffect(() => {
    if (wasEditingRef.current && !editing) {
      loadProfile();
    }
    wasEditingRef.current = editing;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  const loadProfile = async () => {
    try {
      // Three-tier resolution to find this file's client profile:
      //   1. Direct getById on file.clientId — works for AssignmentsTab files
      //      where clientId IS the profile row's _id.
      //   2. Scan clientprofiles by `clientId` field — works for self-signup
      //      files where the file's clientId is the display CL-XXXXXX label.
      //   3. Match by clientName+email — works for orphaned files where
      //      `loadFiles` fell back to `item._id` because clientId was empty.
      // Without all three tiers, broken-link files silently show blank.
      let data: any = null;
      if (file.clientId) {
        try {
          data = await BaseCrudService.getById<any>('clientprofiles', file.clientId);
        } catch { /* fall through */ }
      }
      if (!data) {
        const { items } = await BaseCrudService.getAll<any>(
          'clientprofiles', undefined, { limit: 1000 }
        );
        if (file.clientId) {
          data = items?.find((p: any) => p.clientId === file.clientId) || null;
        }
        if (!data && file.clientName) {
          const targetName = file.clientName.trim().toLowerCase();
          const targetEmail = (file.clientEmail || '').trim().toLowerCase();
          data = items?.find((p: any) => {
            const pName = `${p.firstName || ''} ${p.lastName || ''}`.trim().toLowerCase();
            const pEmail = (p.email || '').trim().toLowerCase();
            if (pName && pName === targetName) return true;
            if (targetEmail && pEmail && pEmail === targetEmail) return true;
            return false;
          }) || null;
        }
      }
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 text-foreground/50">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        Loading client identification...
      </div>
    );
  }

  const fullName = profile ? `${profile.firstName || ''} ${profile.lastName || ''}`.trim() : file.clientName;
  // Display-only "address summary" string for the view mode of the address
  // block. In edit mode we expose street / unit / city / province / postal
  // as separate inputs so each maps cleanly to the retainer template's
  // CLIENT_ADDRESS_LINE1, CLIENT_CITY, CLIENT_PROVINCE, CLIENT_POSTAL_CODE
  // placeholders.
  const fullAddress = profile
    ? [
        profile.streetAddress || '',
        profile.unitNumber ? `Unit ${profile.unitNumber}` : '',
        [profile.city, profile.state].filter(Boolean).join(', '),
        profile.zipCode || '',
      ]
        .filter(s => (s || '').trim())
        .join(', ')
    : '';

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
        <p className="text-xs text-blue-700">
          <strong>By-Law 7.1, s.23(1):</strong> When retained, obtain: full name, home/business address and phone,
          occupation, and if organization — incorporation number, nature of business, and authorized individuals.
        </p>
      </div>

      {/* Identity row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EditableField label="Full Legal Name" value={fullName} fieldKey="clientName" icon={User} editing={editing} editValues={editValues} onChange={onChange} />
        <EditableField label="Email" value={profile?.email || file.clientEmail} fieldKey="email" icon={Mail} editing={editing} editValues={editValues} onChange={onChange} />
      </div>

      {/* ---- Address block ---- */}
      {/* In view mode: show a compact summary line. In edit mode: expand
          into separate inputs so the retainer template's address
          placeholders populate correctly (street, unit, city, province,
          postal code). Without this split the user could only edit one
          combined field, and city/province/postal code stayed blank on
          the retainer. */}
      <div className="border-t border-gray-100 pt-4">
        <h3 className="font-heading text-sm font-semibold text-gray-700 mb-3">Home Address</h3>
        {!editing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Address" value={fullAddress || undefined} icon={MapPin} />
            <Field label="Home Phone" value={profile?.phoneNumber} icon={Phone} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EditableField label="Street Address" value={profile?.streetAddress} fieldKey="streetAddress" icon={MapPin} editing={editing} editValues={editValues} onChange={onChange} />
            <EditableField label="Unit / Suite (optional)" value={profile?.unitNumber} fieldKey="unitNumber" editing={editing} editValues={editValues} onChange={onChange} />
            <EditableField label="City" value={profile?.city} fieldKey="city" editing={editing} editValues={editValues} onChange={onChange} />
            <EditableField label="Province" value={profile?.state || 'Ontario'} fieldKey="state" editing={editing} editValues={editValues} onChange={onChange} />
            <EditableField label="Postal Code" value={profile?.zipCode} fieldKey="zipCode" editing={editing} editValues={editValues} onChange={onChange} />
            <EditableField label="Home Phone" value={profile?.phoneNumber} fieldKey="phoneNumber" icon={Phone} editing={editing} editValues={editValues} onChange={onChange} />
          </div>
        )}
      </div>

      {/* Business + personal details */}
      <div className="border-t border-gray-100 pt-4">
        <h3 className="font-heading text-sm font-semibold text-gray-700 mb-3">Other Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EditableField label="Business Address" value={profile?.businessAddress || 'N/A'} fieldKey="businessAddress" icon={Building2} editing={editing} editValues={editValues} onChange={onChange} />
          <EditableField label="Business Phone" value={profile?.businessPhone || 'N/A'} fieldKey="businessPhone" icon={Phone} editing={editing} editValues={editValues} onChange={onChange} />
          <EditableField label="Date of Birth" value={profile?.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString('en-CA') : undefined} fieldKey="dateOfBirth" icon={Calendar} editing={editing} editValues={editValues} onChange={onChange} type="date" />
          <EditableField label="Occupation(s)" value={profile?.occupation} fieldKey="occupation" icon={Briefcase} editing={editing} editValues={editValues} onChange={onChange} />
          <EditableField label="Preferred Language" value={profile?.preferredLanguage} fieldKey="preferredLanguage" icon={MessageCircle} editing={editing} editValues={editValues} onChange={onChange} />
          <Field label="Date Collected" value={profile?.intakeCompletedDate ? new Date(profile.intakeCompletedDate).toLocaleDateString('en-CA') : undefined} icon={Calendar} />
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <h3 className="font-heading text-sm font-semibold text-gray-700 mb-3">Third Party Representation — s.23(1)8</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Acting for Third Party?" value={profile?.actingForThirdParty ? 'Yes' : 'No'} />
          <EditableField label="Third Party Name" value={profile?.thirdPartyName || (profile?.actingForThirdParty ? 'Not provided' : 'N/A')} fieldKey="thirdPartyName" editing={editing} editValues={editValues} onChange={onChange} />
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <h3 className="font-heading text-sm font-semibold text-gray-700 mb-3">Organization Details — s.23(1)4,6,7</h3>
        {profile?.isOrganization ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableField label="Organization Name" value={profile.orgName} fieldKey="orgName" icon={Building2} editing={editing} editValues={editValues} onChange={onChange} />
            <EditableField label="Incorporation/Business Number" value={profile.orgIncorporationNumber || 'Not provided'} fieldKey="orgIncorporationNumber" icon={FileCheck} editing={editing} editValues={editValues} onChange={onChange} />
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic">Not applicable — client is an individual</p>
        )}
      </div>
    </div>
  );
}

// ============================================================
// SECTION C: Client Verification — s.23(4)-(15)
// ============================================================

const VERIFICATION_STEPS = [
  { key: 'idDetails', label: 'ID Details', icon: Shield },
  { key: 'idDocument', label: 'Document Upload', icon: Upload },
  { key: 'verificationMethod', label: 'Verification Method', icon: Eye },
  { key: 'consent', label: 'Consent & Acknowledgment', icon: ClipboardCheck },
  { key: 'review', label: 'Review & Complete', icon: CheckCircle },
] as const;

const ID_TYPES = [
  { value: 'drivers_licence', label: "Driver's Licence" },
  { value: 'passport', label: 'Passport' },
  { value: 'health_card', label: 'Ontario Health Card (photo)' },
  { value: 'citizenship_card', label: 'Citizenship Card' },
  { value: 'permanent_resident', label: 'Permanent Resident Card' },
  { value: 'firearms_licence', label: 'Firearms Licence (PAL)' },
  { value: 'other', label: 'Other Government Photo ID' },
];

const VERIFICATION_METHODS = [
  { value: 'in_person', label: 'In-Person Verification', desc: 'Client presented original government photo ID at office' },
  { value: 'agent', label: 'Verification by Agent', desc: 'Agent verified identity per s.23(6) — attach agent attestation' },
  { value: 'credit_file', label: 'Credit File Search', desc: 'Credit bureau file open 3+ years per s.23(8)' },
  { value: 'dual_source', label: 'Dual Independent Sources', desc: 'Two independent reliable sources per s.23(7)' },
];

interface VerificationFormData {
  idType: string;
  idNumber: string;
  idIssuingAuthority: string;
  idExpiryDate: string;
  idOtherDescription: string;
  verificationMethod: string;
  agentName: string;
  agentAttestationDate: string;
  creditBureauName: string;
  creditFileDate: string;
  dualSource1: string;
  dualSource2: string;
  dateVerified: string;
  verifiedBy: string;
  isMinor: boolean;
  parentGuardianName: string;
  parentGuardianPhone: string;
  parentGuardianIdType: string;
  parentGuardianIdNumber: string;
  consentGiven: boolean;
  notesOnVerification: string;
}

const INITIAL_FORM_DATA: VerificationFormData = {
  idType: '',
  idNumber: '',
  idIssuingAuthority: '',
  idExpiryDate: '',
  idOtherDescription: '',
  verificationMethod: '',
  agentName: '',
  agentAttestationDate: '',
  creditBureauName: '',
  creditFileDate: '',
  dualSource1: '',
  dualSource2: '',
  dateVerified: new Date().toISOString().split('T')[0],
  verifiedBy: '',
  isMinor: false,
  parentGuardianName: '',
  parentGuardianPhone: '',
  parentGuardianIdType: '',
  parentGuardianIdNumber: '',
  consentGiven: false,
  notesOnVerification: '',
};

function SectionClientVerification({ file, editing, editValues, onChange }: SectionEditProps) {
  const isComplete = file.sections.clientVerification;
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(0);
  const [formData, setFormData] = useState<VerificationFormData>(INITIAL_FORM_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [idFileName, setIdFileName] = useState('');

  useEffect(() => {
    loadProfile();
  }, [file.clientId]);

  const loadProfile = async () => {
    try {
      const data = await BaseCrudService.getById<any>('clientprofiles', file.clientId);
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const maskIdNumber = (id: string) => {
    if (!id || id.length < 5) return id || 'Not provided';
    return id.substring(0, 2) + '****' + id.substring(id.length - 2);
  };

  const updateForm = (key: keyof VerificationFormData, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const canAdvance = (step: number): boolean => {
    switch (step) {
      case 0: // ID Details
        return !!(formData.idType && formData.idNumber && formData.idIssuingAuthority && formData.idExpiryDate);
      case 1: // Document Upload
        return true; // Upload is recommended but not blocking
      case 2: // Verification Method
        if (!formData.verificationMethod || !formData.verifiedBy) return false;
        if (formData.verificationMethod === 'agent' && (!formData.agentName || !formData.agentAttestationDate)) return false;
        if (formData.verificationMethod === 'credit_file' && (!formData.creditBureauName || !formData.creditFileDate)) return false;
        if (formData.verificationMethod === 'dual_source' && (!formData.dualSource1 || !formData.dualSource2)) return false;
        if (formData.isMinor && (!formData.parentGuardianName || !formData.parentGuardianPhone || !formData.parentGuardianIdType)) return false;
        return true;
      case 3: // Consent
        return formData.consentGiven;
      default:
        return true;
    }
  };

  const handleSubmitVerification = async () => {
    setSubmitting(true);
    setSubmitError('');

    // Helper: convert "YYYY-MM-DD" form input to a Date the Wix CMS will
    // accept for datetime fields. Pass-through if already empty/Date.
    const toDate = (v: unknown): Date | undefined => {
      if (!v) return undefined;
      if (v instanceof Date) return v;
      if (typeof v === 'string' && v.trim()) {
        const d = new Date(v);
        return isNaN(d.getTime()) ? undefined : d;
      }
      return undefined;
    };

    try {
      if (!file?.clientId) {
        setSubmitError(
          'Cannot save verification: this file has no client linked. ' +
          'Re-open the file from the Files list and try again.'
        );
        setSubmitting(false);
        return;
      }

      // Sanity-check the linked clientprofiles row exists before we try to
      // update it. If `file.clientId` is somehow stale (mismatched UUIDs),
      // surface a clear error instead of swallowing a generic CMS rejection.
      let profileRow: any = null;
      try {
        profileRow = await BaseCrudService.getById<any>('clientprofiles', file.clientId);
      } catch {
        /* swallow — handled below */
      }
      if (!profileRow) {
        // Fallback: look up by display clientId field (CL-XXXXXX) in case
        // the file.clientId stored on the clientfiles row is the display
        // label rather than the row primary key. limit:1000 because the
        // default 50-item page would silently miss profiles past page 1.
        try {
          const { items } = await BaseCrudService.getAll<any>(
            'clientprofiles', undefined, { limit: 1000 }
          );
          const match = items?.find((p: any) => p.clientId === file.clientId);
          if (match?._id) profileRow = match;
        } catch {
          /* still fail below */
        }
      }
      if (!profileRow?._id) {
        setSubmitError(
          'Could not locate the client profile linked to this file. ' +
          'The file may have been imported from an older system. ' +
          'Please contact the firm administrator to re-link the client.'
        );
        setSubmitting(false);
        return;
      }

      // 1) Save the ID details onto the client profile.
      try {
        await BaseCrudService.update('clientprofiles', {
          _id: profileRow._id,
          idType: formData.idType,
          idNumber: formData.idNumber,
          idIssuingAuthority: formData.idIssuingAuthority,
          idExpiryDate: toDate(formData.idExpiryDate),
          idVerificationConsent: formData.consentGiven,
          isMinor: formData.isMinor,
          parentGuardianName: formData.parentGuardianName,
          parentGuardianPhone: formData.parentGuardianPhone,
        } as any);
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error('clientprofiles update failed:', err);
        throw new Error(
          `Could not save ID details to client profile: ${err?.message || 'unknown error'}`
        );
      }

      // 2) Create the verification record. We pass an explicit `_id` (UUID)
      //    because Wix CMS in some environments rejects creates without one.
      try {
        await BaseCrudService.create('clientverification', {
          _id: crypto.randomUUID(),
          clientId: profileRow._id,
          fileId: file._id,
          idType: formData.idType,
          idNumber: formData.idNumber,
          idIssuingAuthority: formData.idIssuingAuthority,
          idExpiryDate: toDate(formData.idExpiryDate),
          verificationMethod: formData.verificationMethod,
          dateVerified: toDate(formData.dateVerified) || new Date(),
          verifiedBy: formData.verifiedBy,
          alternativeVerificationUsed: formData.verificationMethod !== 'in_person',
          alternativeVerificationDetails:
            formData.verificationMethod === 'agent'
              ? `Agent: ${formData.agentName}, Attestation: ${formData.agentAttestationDate}`
              : formData.verificationMethod === 'credit_file'
              ? `Bureau: ${formData.creditBureauName}, Date: ${formData.creditFileDate}`
              : formData.verificationMethod === 'dual_source'
              ? `Source 1: ${formData.dualSource1}, Source 2: ${formData.dualSource2}`
              : 'In-person verification of original government photo ID',
          isMinor: !!formData.isMinor,
          parentGuardianVerification: formData.isMinor
            ? JSON.stringify({
                name: formData.parentGuardianName || '',
                phone: formData.parentGuardianPhone || '',
                idType: formData.parentGuardianIdType || '',
                idNumber: formData.parentGuardianIdNumber || '',
              })
            : '',
          verificationComplete: true,
        } as any);
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error('clientverification create failed:', err);
        throw new Error(
          `Could not create verification record: ${err?.message || 'unknown error'}`
        );
      }

      // 3) Activity log entry — also explicit `_id`. Best-effort: a logging
      //    failure should NOT block the verification (it's already saved).
      try {
        await BaseCrudService.create('activitylogs', {
          _id: crypto.randomUUID(),
          fileId: file._id,
          clientId: profileRow._id,
          action: 'client_verification_completed',
          details: `Identity verified via ${formData.verificationMethod.replace('_', ' ')} by ${formData.verifiedBy}`,
          performedBy: formData.verifiedBy,
          timestamp: new Date().toISOString(),
        } as any);
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.warn('activitylogs create failed (non-fatal):', err);
      }

      // Reload profile and close wizard
      await loadProfile();
      setWizardOpen(false);
      setWizardStep(0);
      setFormData(INITIAL_FORM_DATA);
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('Error saving verification:', error);
      setSubmitError(
        error?.message
          ? `Failed to save verification: ${error.message}`
          : 'Failed to save verification. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ---- Wizard Step Renderers ----

  const renderStepIdDetails = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">ID Type <span className="text-red-500">*</span></label>
        <select
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white"
          value={formData.idType}
          onChange={e => updateForm('idType', e.target.value)}
        >
          <option value="">Select government-issued photo ID...</option>
          {ID_TYPES.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>
      {formData.idType === 'other' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Describe ID Type <span className="text-red-500">*</span></label>
          <Input value={formData.idOtherDescription} onChange={e => updateForm('idOtherDescription', e.target.value)} placeholder="e.g. NEXUS card, Military ID" />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ID Number <span className="text-red-500">*</span></label>
          <Input value={formData.idNumber} onChange={e => updateForm('idNumber', e.target.value)} placeholder="Enter full ID number" />
          <p className="text-xs text-gray-400 mt-1">Stored securely — displayed masked after save</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Authority <span className="text-red-500">*</span></label>
          <Input value={formData.idIssuingAuthority} onChange={e => updateForm('idIssuingAuthority', e.target.value)} placeholder="e.g. Province of Ontario, Government of Canada" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date <span className="text-red-500">*</span></label>
          <Input type="date" value={formData.idExpiryDate} onChange={e => updateForm('idExpiryDate', e.target.value)} />
          {formData.idExpiryDate && new Date(formData.idExpiryDate) < new Date() && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> This ID is expired — verification may require alternative methods.</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Verification <span className="text-red-500">*</span></label>
          <Input type="date" value={formData.dateVerified} onChange={e => updateForm('dateVerified', e.target.value)} />
        </div>
      </div>
    </div>
  );

  const renderStepIdDocument = () => (
    <div className="space-y-4">
      <div className="bg-violet-50 border border-violet-100 rounded-lg p-3">
        <p className="text-xs text-violet-700">
          <strong>s.23(13):</strong> You must retain a copy of the client's ID for at least 6 years after the matter is completed.
          Upload a scan or photo of the ID below.
        </p>
      </div>
      <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-violet-400 transition-colors">
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
        {idFileName ? (
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <FileText className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-medium text-gray-700">{idFileName}</span>
              <button onClick={() => setIdFileName('')} className="text-gray-400 hover:text-red-500">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-green-600">File selected — will be uploaded on submit</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-2">Drag & drop the ID copy here, or click to browse</p>
            <Button variant="outline" size="sm" onClick={() => {
              // Simulate file selection — in production, use a real file input
              setIdFileName(`${file.clientName.replace(/\s+/g, '-').toLowerCase()}-id-copy.pdf`);
            }}>
              <Upload className="w-3.5 h-3.5 mr-1.5" /> Select File
            </Button>
            <p className="text-xs text-gray-400 mt-2">Accepted: PDF, JPG, PNG — Max 10MB</p>
          </>
        )}
      </div>
      {!idFileName && (
        <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-100 rounded-lg">
          <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-700">Uploading a copy is strongly recommended per s.23(13). You can continue without one, but the file will be flagged for follow-up.</p>
        </div>
      )}
    </div>
  );

  const renderStepVerificationMethod = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Verification Method <span className="text-red-500">*</span></label>
        <div className="space-y-2">
          {VERIFICATION_METHODS.map(m => (
            <label
              key={m.value}
              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                formData.verificationMethod === m.value
                  ? 'border-violet-500 bg-violet-50 ring-1 ring-violet-500'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="verificationMethod"
                value={m.value}
                checked={formData.verificationMethod === m.value}
                onChange={e => updateForm('verificationMethod', e.target.value)}
                className="mt-0.5 accent-violet-600"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{m.label}</p>
                <p className="text-xs text-gray-500">{m.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Conditional fields based on method */}
      {formData.verificationMethod === 'agent' && (
        <div className="ml-6 p-4 bg-gray-50 rounded-lg space-y-3 border border-gray-100">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Agent Details — s.23(6)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Agent Name <span className="text-red-500">*</span></label>
              <Input value={formData.agentName} onChange={e => updateForm('agentName', e.target.value)} placeholder="Full name of verifying agent" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Attestation Date <span className="text-red-500">*</span></label>
              <Input type="date" value={formData.agentAttestationDate} onChange={e => updateForm('agentAttestationDate', e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {formData.verificationMethod === 'credit_file' && (
        <div className="ml-6 p-4 bg-gray-50 rounded-lg space-y-3 border border-gray-100">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Credit File Details — s.23(8)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Credit Bureau <span className="text-red-500">*</span></label>
              <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white" value={formData.creditBureauName} onChange={e => updateForm('creditBureauName', e.target.value)}>
                <option value="">Select bureau...</option>
                <option value="Equifax">Equifax Canada</option>
                <option value="TransUnion">TransUnion Canada</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Date of Credit File <span className="text-red-500">*</span></label>
              <Input type="date" value={formData.creditFileDate} onChange={e => updateForm('creditFileDate', e.target.value)} />
              {formData.creditFileDate && (() => {
                const years = (Date.now() - new Date(formData.creditFileDate).getTime()) / (365.25 * 24 * 60 * 60 * 1000);
                return years < 3 ? <p className="text-xs text-red-600 mt-1">Credit file must be open 3+ years per s.23(8).</p> : <p className="text-xs text-green-600 mt-1">Credit file age: {Math.floor(years)} years — meets 3-year requirement.</p>;
              })()}
            </div>
          </div>
        </div>
      )}

      {formData.verificationMethod === 'dual_source' && (
        <div className="ml-6 p-4 bg-gray-50 rounded-lg space-y-3 border border-gray-100">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Dual Independent Sources — s.23(7)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Source 1 <span className="text-red-500">*</span></label>
              <Input value={formData.dualSource1} onChange={e => updateForm('dualSource1', e.target.value)} placeholder="e.g. Utility bill, Bank statement" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Source 2 <span className="text-red-500">*</span></label>
              <Input value={formData.dualSource2} onChange={e => updateForm('dualSource2', e.target.value)} placeholder="e.g. CRA notice, Employment letter" />
            </div>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Verified By <span className="text-red-500">*</span></label>
        <Input value={formData.verifiedBy} onChange={e => updateForm('verifiedBy', e.target.value)} placeholder="Name of paralegal who verified" />
      </div>

      {/* Minor client toggle */}
      <div className="border-t border-gray-100 pt-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isMinor}
            onChange={e => updateForm('isMinor', e.target.checked)}
            className="rounded accent-violet-600"
          />
          <div>
            <span className="text-sm font-medium text-gray-700">Client is a minor — s.23(9)-(10)</span>
            <p className="text-xs text-gray-500">Parent or guardian verification is required</p>
          </div>
        </label>
      </div>

      {formData.isMinor && (
        <div className="ml-6 p-4 bg-orange-50 rounded-lg space-y-3 border border-orange-100">
          <h4 className="text-xs font-semibold text-orange-700 uppercase tracking-wider">Parent / Guardian Verification</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Parent/Guardian Name <span className="text-red-500">*</span></label>
              <Input value={formData.parentGuardianName} onChange={e => updateForm('parentGuardianName', e.target.value)} placeholder="Full legal name" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Phone <span className="text-red-500">*</span></label>
              <Input value={formData.parentGuardianPhone} onChange={e => updateForm('parentGuardianPhone', e.target.value)} placeholder="(xxx) xxx-xxxx" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Guardian's ID Type <span className="text-red-500">*</span></label>
              <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white" value={formData.parentGuardianIdType} onChange={e => updateForm('parentGuardianIdType', e.target.value)}>
                <option value="">Select ID type...</option>
                {ID_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Guardian's ID Number</label>
              <Input value={formData.parentGuardianIdNumber} onChange={e => updateForm('parentGuardianIdNumber', e.target.value)} placeholder="ID number" />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderStepConsent = () => (
    <div className="space-y-4">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
        <h4 className="text-sm font-semibold text-gray-800">Client Consent & Acknowledgment</h4>
        <div className="text-xs text-gray-600 space-y-2">
          <p>By completing this verification, the paralegal acknowledges that:</p>
          <ul className="list-disc ml-4 space-y-1">
            <li>The client's identity has been verified in accordance with LSO By-Law 7.1, s.23(4)-(15).</li>
            <li>The original government-issued photo ID was examined {formData.verificationMethod === 'in_person' ? 'in person' : 'via the stated alternative method'}.</li>
            <li>A copy of the ID document will be retained for a minimum of 6 years per s.23(14).</li>
            <li>The client was informed of the purpose and legal basis for this verification.</li>
            {formData.isMinor && <li>The parent/guardian's identity was also verified per s.23(9)-(10).</li>}
          </ul>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
        <textarea
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 min-h-[80px]"
          value={formData.notesOnVerification}
          onChange={e => updateForm('notesOnVerification', e.target.value)}
          placeholder="Any additional notes about the verification process..."
        />
      </div>

      <label className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
        formData.consentGiven ? 'border-green-500 bg-green-50' : 'border-gray-300'
      }`}>
        <input
          type="checkbox"
          checked={formData.consentGiven}
          onChange={e => updateForm('consentGiven', e.target.checked)}
          className="mt-0.5 rounded accent-green-600"
        />
        <div>
          <span className="text-sm font-medium text-gray-900">
            I confirm that the above information is accurate and that this verification was performed in compliance with LSO By-Law 7.1.
          </span>
          <p className="text-xs text-gray-500 mt-1">This constitutes a professional attestation. Verification records are part of the audit trail.</p>
        </div>
      </label>
    </div>
  );

  const renderStepReview = () => (
    <div className="space-y-4">
      <div className="bg-green-50 border border-green-100 rounded-lg p-4">
        <p className="text-sm text-green-800 font-medium">Review the verification details below before completing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">ID Information</h4>
          <div><span className="text-gray-500">Type:</span> <span className="font-medium">{ID_TYPES.find(t => t.value === formData.idType)?.label || formData.idType}</span></div>
          <div><span className="text-gray-500">Number:</span> <span className="font-medium">{maskIdNumber(formData.idNumber)}</span></div>
          <div><span className="text-gray-500">Issuer:</span> <span className="font-medium">{formData.idIssuingAuthority}</span></div>
          <div><span className="text-gray-500">Expiry:</span> <span className="font-medium">{formData.idExpiryDate}</span></div>
          {idFileName && <div><span className="text-gray-500">Document:</span> <span className="font-medium">{idFileName}</span></div>}
        </div>
        <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Verification</h4>
          <div><span className="text-gray-500">Method:</span> <span className="font-medium">{VERIFICATION_METHODS.find(m => m.value === formData.verificationMethod)?.label}</span></div>
          <div><span className="text-gray-500">Date:</span> <span className="font-medium">{formData.dateVerified}</span></div>
          <div><span className="text-gray-500">Verified by:</span> <span className="font-medium">{formData.verifiedBy}</span></div>
          <div><span className="text-gray-500">Minor:</span> <span className="font-medium">{formData.isMinor ? 'Yes' : 'No'}</span></div>
          <div><span className="text-gray-500">Consent:</span> <span className="font-medium text-green-700">Given</span></div>
        </div>
      </div>

      {formData.isMinor && (
        <div className="p-4 bg-orange-50 rounded-lg space-y-2">
          <h4 className="text-xs font-semibold text-orange-700 uppercase tracking-wider">Parent/Guardian</h4>
          <div className="text-sm"><span className="text-gray-500">Name:</span> <span className="font-medium">{formData.parentGuardianName}</span></div>
          <div className="text-sm"><span className="text-gray-500">Phone:</span> <span className="font-medium">{formData.parentGuardianPhone}</span></div>
          <div className="text-sm"><span className="text-gray-500">ID Type:</span> <span className="font-medium">{ID_TYPES.find(t => t.value === formData.parentGuardianIdType)?.label}</span></div>
        </div>
      )}

      {formData.notesOnVerification && (
        <div className="p-3 bg-gray-50 rounded-lg">
          <span className="text-xs text-gray-500">Notes:</span>
          <p className="text-sm text-gray-700 mt-1">{formData.notesOnVerification}</p>
        </div>
      )}

      {submitError && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-lg">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <p className="text-sm text-red-700">{submitError}</p>
        </div>
      )}
    </div>
  );

  const renderWizardStep = () => {
    switch (wizardStep) {
      case 0: return renderStepIdDetails();
      case 1: return renderStepIdDocument();
      case 2: return renderStepVerificationMethod();
      case 3: return renderStepConsent();
      case 4: return renderStepReview();
      default: return null;
    }
  };

  // ---- Loading State ----
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 text-foreground/50">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        Loading verification data...
      </div>
    );
  }

  const hasIdInfo = profile?.idType;

  // ---- Verification Wizard (Full Section Replacement) ----
  if (wizardOpen) {
    const currentStep = VERIFICATION_STEPS[wizardStep];
    return (
      <div className="space-y-6">
        {/* Step Progress Bar */}
        <div className="flex items-center gap-1">
          {VERIFICATION_STEPS.map((step, idx) => {
            const StepIcon = step.icon;
            const isActive = idx === wizardStep;
            const isCompleted = idx < wizardStep;
            return (
              <div key={step.key} className="flex items-center flex-1">
                <button
                  onClick={() => idx < wizardStep && setWizardStep(idx)}
                  disabled={idx > wizardStep}
                  className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium transition-all w-full justify-center ${
                    isActive
                      ? 'bg-violet-100 text-violet-800 border border-violet-300'
                      : isCompleted
                      ? 'bg-green-50 text-green-700 hover:bg-green-100 cursor-pointer'
                      : 'bg-gray-50 text-gray-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle className="w-3.5 h-3.5" /> : <StepIcon className="w-3.5 h-3.5" />}
                  <span className="hidden md:inline">{step.label}</span>
                </button>
                {idx < VERIFICATION_STEPS.length - 1 && (
                  <ChevronRight className={`w-4 h-4 mx-0.5 flex-shrink-0 ${isCompleted ? 'text-green-400' : 'text-gray-300'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* By-Law Reference */}
        <div className="bg-violet-50 border border-violet-100 rounded-lg p-3">
          <p className="text-xs text-violet-700">
            <strong>By-Law 7.1, s.23(4):</strong> Verify identity using government photo ID, credit file (3+ years), or two independent sources.
            Retain copies for 6+ years per s.23(14).
          </p>
        </div>

        {/* Step Title */}
        <div className="flex items-center gap-2">
          <currentStep.icon className="w-5 h-5 text-violet-600" />
          <h3 className="text-lg font-semibold text-gray-900">Step {wizardStep + 1}: {currentStep.label}</h3>
        </div>

        {/* Step Content */}
        {renderWizardStep()}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (wizardStep === 0) {
                setWizardOpen(false);
                setFormData(INITIAL_FORM_DATA);
              } else {
                setWizardStep(prev => prev - 1);
              }
            }}
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            {wizardStep === 0 ? 'Cancel' : 'Back'}
          </Button>

          {wizardStep < VERIFICATION_STEPS.length - 1 ? (
            <Button
              size="sm"
              disabled={!canAdvance(wizardStep)}
              onClick={() => setWizardStep(prev => prev + 1)}
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              Continue <ChevronRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          ) : (
            <Button
              size="sm"
              disabled={submitting}
              onClick={handleSubmitVerification}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {submitting ? (
                <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Saving...</>
              ) : (
                <><CheckCircle className="w-3.5 h-3.5 mr-1.5" /> Complete Verification</>
              )}
            </Button>
          )}
        </div>
      </div>
    );
  }

  // ---- Main Section View ----
  return (
    <div className="space-y-6">
      <div className="bg-violet-50 border border-violet-100 rounded-lg p-4">
        <p className="text-xs text-violet-700">
          <strong>By-Law 7.1, s.23(4):</strong> When handling funds, verify identity using government photo ID,
          credit file (3+ years), or two independent sources. Retain copies for 6+ years per s.23(14).
        </p>
      </div>

      {hasIdInfo ? (
        <div className="space-y-6">
          <div className={`flex items-center gap-3 p-4 rounded-lg border ${
            isComplete ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'
          }`}>
            {isComplete ? (
              <>
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">Identity Verified</p>
                  <p className="text-sm text-green-600">Client ID verified in-person and copy retained</p>
                </div>
              </>
            ) : (
              <>
                <AlertTriangle className="w-6 h-6 text-amber-600" />
                <div>
                  <p className="font-medium text-amber-800">ID Details Collected — In-Person Verification Pending</p>
                  <p className="text-sm text-amber-600">Client provided ID type during intake; original must be verified at consultation</p>
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableField label="ID Type" value={profile.idType} fieldKey="idType" icon={Shield} editing={editing} editValues={editValues} onChange={onChange} />
            <Field label="ID Number" value={maskIdNumber(profile.idNumber)} icon={Lock} />
            <EditableField label="Issuing Authority" value={profile.idIssuingAuthority || 'Not provided'} fieldKey="idIssuingAuthority" icon={Building2} editing={editing} editValues={editValues} onChange={onChange} />
            <EditableField label="Expiry Date" value={profile.idExpiryDate ? new Date(profile.idExpiryDate).toLocaleDateString('en-CA') : 'Not provided'} fieldKey="idExpiryDate" icon={Calendar} editing={editing} editValues={editValues} onChange={onChange} type="date" />
            <Field label="Verification Method" value={isComplete ? 'In-person' : 'Pending in-person verification'} icon={Eye} />
            <Field label="Consent Given" value={profile.idVerificationConsent ? 'Yes — client consented to ID verification' : 'Pending'} icon={CheckCircle} />
          </div>

          {profile.isMinor && (
            <div className="border-t border-gray-100 pt-4">
              <h3 className="font-heading text-sm font-semibold text-gray-700 mb-3">Minor Client — s.23(9)-(10)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Parent/Guardian Name" value={profile.parentGuardianName || 'Not provided'} icon={User} />
                <Field label="Parent/Guardian Phone" value={profile.parentGuardianPhone || 'Not provided'} icon={Phone} />
              </div>
              <p className="text-xs text-gray-500 mt-2">Parent/guardian must present their own government photo ID for verification.</p>
            </div>
          )}

          {!isComplete && (
            <div className="border-t border-gray-100 pt-4">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">ID Document Copy</label>
              <div className="mt-2 p-4 border-2 border-dashed border-gray-200 rounded-lg text-center">
                <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Upload a copy of the client's ID after in-person verification</p>
                <Button variant="outline" size="sm" className="mt-2">
                  <Upload className="w-3.5 h-3.5 mr-1.5" /> Upload ID Copy
                </Button>
              </div>
            </div>
          )}

          {isComplete && (
            <div className="border-t border-gray-100 pt-4">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">ID Document Copy</label>
              <div className="mt-2 flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="w-5 h-5 text-primary" />
                <span className="text-sm text-gray-700">client-id-copy.pdf</span>
                <Button variant="outline" size="sm" className="ml-auto">
                  <Eye className="w-3.5 h-3.5 mr-1.5" /> View
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <EmptySection
          message="Client identity has not been verified yet. Required when handling funds per s.22(1)(b)."
          actionLabel="Start Verification"
          onAction={() => setWizardOpen(true)}
        />
      )}
    </div>
  );
}

// ============================================================
// SECTION D: Source of Funds — s.23(2)
// ============================================================

const FUND_SOURCES = [
  { value: 'employment_income', label: 'Employment / Salary Income' },
  { value: 'business_income', label: 'Business / Self-Employment Income' },
  { value: 'savings', label: 'Personal Savings' },
  { value: 'investment', label: 'Investment Proceeds' },
  { value: 'insurance', label: 'Insurance Settlement / Payout' },
  { value: 'loan', label: 'Bank Loan / Line of Credit' },
  { value: 'legal_aid', label: 'Legal Aid Certificate' },
  { value: 'gift_family', label: 'Gift or Family Support' },
  { value: 'government_benefit', label: 'Government Benefit (ODSP, EI, CPP, etc.)' },
  { value: 'sale_of_property', label: 'Sale of Property / Asset' },
  { value: 'inheritance', label: 'Inheritance / Estate' },
  { value: 'other', label: 'Other — Describe Below' },
];

const RISK_LEVELS = [
  { value: 'low', label: 'Low Risk', color: 'bg-green-100 text-green-800', desc: 'Source is easily verifiable, consistent with client profile' },
  { value: 'medium', label: 'Medium Risk', color: 'bg-amber-100 text-amber-800', desc: 'Some inconsistency or limited documentation — monitor regularly' },
  { value: 'high', label: 'High Risk', color: 'bg-red-100 text-red-800', desc: 'Significant concerns — enhanced monitoring and documentation required' },
];

const FUND_WIZARD_STEPS = [
  { key: 'handling', label: 'Funds Handling', icon: DollarSign },
  { key: 'source', label: 'Source Details', icon: CreditCard },
  { key: 'risk', label: 'Risk Assessment', icon: AlertTriangle },
  { key: 'monitoring', label: 'Monitoring Plan', icon: Eye },
  { key: 'review', label: 'Review & Complete', icon: CheckCircle },
] as const;

interface FundSourceFormData {
  handlingFunds: boolean;
  noFundsReason: string;
  fundSources: string[];
  otherSourceDescription: string;
  sourceDescription: string;
  expectedAmount: string;
  expectedFrequency: string;
  isOrganization: boolean;
  orgName: string;
  orgIncorporationNumber: string;
  orgOwnerNames: string;
  orgOwnerOccupations: string;
  riskLevel: string;
  riskNotes: string;
  monitoringFrequency: string;
  nextMonitoringDate: string;
  monitoringNotes: string;
  suspiciousActivityFound: boolean;
  suspiciousActivityDetails: string;
  assessedBy: string;
  assessmentDate: string;
}

const INITIAL_FUND_FORM: FundSourceFormData = {
  handlingFunds: true,
  noFundsReason: '',
  fundSources: [],
  otherSourceDescription: '',
  sourceDescription: '',
  expectedAmount: '',
  expectedFrequency: '',
  isOrganization: false,
  orgName: '',
  orgIncorporationNumber: '',
  orgOwnerNames: '',
  orgOwnerOccupations: '',
  riskLevel: '',
  riskNotes: '',
  monitoringFrequency: 'quarterly',
  nextMonitoringDate: '',
  monitoringNotes: '',
  suspiciousActivityFound: false,
  suspiciousActivityDetails: '',
  assessedBy: '',
  assessmentDate: new Date().toISOString().split('T')[0],
};

function SectionSourceOfFunds({ file, editing, editValues, onChange }: SectionEditProps) {
  const isComplete = file.sections.sourceOfFunds;
  const [fundRecord, setFundRecord] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(0);
  const [formData, setFormData] = useState<FundSourceFormData>(INITIAL_FUND_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    loadFundRecord();
  }, [file._id]);

  const loadFundRecord = async () => {
    try {
      const result = await BaseCrudService.getAll<any>('fundsource');
      const match = result.items.find((r: any) => r.fileId === file._id);
      if (match) {
        setFundRecord(match);
      }
    } catch (error) {
      console.error('Error loading fund source:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateForm = (key: keyof FundSourceFormData, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const toggleFundSource = (source: string) => {
    setFormData(prev => ({
      ...prev,
      fundSources: prev.fundSources.includes(source)
        ? prev.fundSources.filter(s => s !== source)
        : [...prev.fundSources, source],
    }));
  };

  const canAdvanceFund = (step: number): boolean => {
    switch (step) {
      case 0: // Handling
        return formData.handlingFunds || !!formData.noFundsReason;
      case 1: // Source
        if (!formData.handlingFunds) return true;
        return formData.fundSources.length > 0 && !!formData.sourceDescription;
      case 2: // Risk
        if (!formData.handlingFunds) return true;
        return !!formData.riskLevel && !!formData.assessedBy;
      case 3: // Monitoring
        if (!formData.handlingFunds) return true;
        return !!formData.monitoringFrequency;
      default:
        return true;
    }
  };

  const handleSubmitFundSource = async () => {
    setSubmitting(true);
    setSubmitError('');
    try {
      const orgInfo = formData.isOrganization ? JSON.stringify({
        name: formData.orgName,
        incorporationNumber: formData.orgIncorporationNumber,
        ownerNames: formData.orgOwnerNames,
        ownerOccupations: formData.orgOwnerOccupations,
      }) : undefined;

      const monitoringRecords = JSON.stringify([{
        date: formData.assessmentDate,
        assessedBy: formData.assessedBy,
        frequency: formData.monitoringFrequency,
        nextDate: formData.nextMonitoringDate,
        notes: formData.monitoringNotes,
        suspiciousActivity: formData.suspiciousActivityFound,
        suspiciousDetails: formData.suspiciousActivityDetails,
      }]);

      await BaseCrudService.create('fundsource', {
        clientId: file.clientId,
        fileId: file._id,
        handlingFunds: formData.handlingFunds,
        sourceDescription: formData.handlingFunds
          ? `Sources: ${formData.fundSources.map(s => FUND_SOURCES.find(f => f.value === s)?.label || s).join(', ')}. ${formData.sourceDescription}`
          : `Not handling funds: ${formData.noFundsReason}`,
        orgOwnershipInfo: orgInfo,
        monitoringRecords,
        riskAssessmentResults: formData.handlingFunds
          ? JSON.stringify({ level: formData.riskLevel, notes: formData.riskNotes, amount: formData.expectedAmount, frequency: formData.expectedFrequency })
          : undefined,
        riskAssessmentDate: formData.assessmentDate,
        assessedBy: formData.assessedBy,
      });

      // Log the activity
      await BaseCrudService.create('activitylogs', {
        fileId: file._id,
        clientId: file.clientId,
        action: 'fund_source_recorded',
        details: formData.handlingFunds
          ? `Source of funds recorded — Risk: ${formData.riskLevel} — by ${formData.assessedBy}`
          : `Not handling funds — documented by ${formData.assessedBy}`,
        performedBy: formData.assessedBy,
        timestamp: new Date().toISOString(),
      });

      await loadFundRecord();
      setWizardOpen(false);
      setWizardStep(0);
      setFormData(INITIAL_FUND_FORM);
    } catch (error) {
      console.error('Error saving fund source:', error);
      setSubmitError('Failed to save fund source record. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ---- Step Renderers ----

  const renderStepHandling = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Is the licensee handling funds for this matter?</label>
        <div className="space-y-2">
          <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
            formData.handlingFunds ? 'border-amber-500 bg-amber-50 ring-1 ring-amber-500' : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input type="radio" name="handlingFunds" checked={formData.handlingFunds} onChange={() => updateForm('handlingFunds', true)} className="mt-0.5 accent-amber-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Yes — Handling client funds</p>
              <p className="text-xs text-gray-500">Trust account, retainer deposits, settlement funds, etc. Full s.23(2) documentation required.</p>
            </div>
          </label>
          <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
            !formData.handlingFunds ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input type="radio" name="handlingFunds" checked={!formData.handlingFunds} onChange={() => updateForm('handlingFunds', false)} className="mt-0.5 accent-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">No — Not handling funds for this matter</p>
              <p className="text-xs text-gray-500">Flat fee paid directly, no trust account involvement. Document reason below.</p>
            </div>
          </label>
        </div>
      </div>

      {!formData.handlingFunds && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Reason for not handling funds <span className="text-red-500">*</span></label>
          <textarea
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[80px]"
            value={formData.noFundsReason}
            onChange={e => updateForm('noFundsReason', e.target.value)}
            placeholder="e.g. Flat fee matter — client pays directly via e-transfer, no trust account involvement."
          />
        </div>
      )}

      {formData.handlingFunds && (
        <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-100 rounded-lg">
          <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-700">
            Because you are handling funds, you must document the source of all funds received, perform a risk assessment,
            and establish ongoing monitoring per s.23.1. The following steps will guide you through this process.
          </p>
        </div>
      )}
    </div>
  );

  const renderStepSource = () => {
    if (!formData.handlingFunds) {
      return (
        <div className="text-center py-8">
          <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600">Not handling funds — this step is not required.</p>
          <p className="text-xs text-gray-400 mt-1">Click Continue to proceed.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Source(s) of Funds <span className="text-red-500">*</span></label>
          <p className="text-xs text-gray-500 mb-3">Select all that apply — where is the client's money coming from?</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {FUND_SOURCES.map(source => (
              <label
                key={source.value}
                className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all text-sm ${
                  formData.fundSources.includes(source.value)
                    ? 'border-amber-500 bg-amber-50 font-medium'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.fundSources.includes(source.value)}
                  onChange={() => toggleFundSource(source.value)}
                  className="rounded accent-amber-600"
                />
                {source.label}
              </label>
            ))}
          </div>
        </div>

        {formData.fundSources.includes('other') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Describe Other Source</label>
            <Input value={formData.otherSourceDescription} onChange={e => updateForm('otherSourceDescription', e.target.value)} placeholder="Describe the source of funds" />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description <span className="text-red-500">*</span></label>
          <textarea
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[80px]"
            value={formData.sourceDescription}
            onChange={e => updateForm('sourceDescription', e.target.value)}
            placeholder="Provide details about the funds — e.g. 'Client will pay $2,500 retainer from personal chequing account, funded by regular employment income as a registered nurse at LHSC.'"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Amount</label>
            <Input value={formData.expectedAmount} onChange={e => updateForm('expectedAmount', e.target.value)} placeholder="e.g. $2,500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Frequency</label>
            <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white" value={formData.expectedFrequency} onChange={e => updateForm('expectedFrequency', e.target.value)}>
              <option value="">Select...</option>
              <option value="one_time">One-time payment</option>
              <option value="monthly">Monthly installments</option>
              <option value="as_needed">As needed / per invoice</option>
              <option value="milestone">Milestone-based</option>
            </select>
          </div>
        </div>

        {/* Organization ownership info — s.23(2.1) */}
        <div className="border-t border-gray-100 pt-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={formData.isOrganization} onChange={e => updateForm('isOrganization', e.target.checked)} className="rounded accent-amber-600" />
            <div>
              <span className="text-sm font-medium text-gray-700">Client is an organization — s.23(2.1)</span>
              <p className="text-xs text-gray-500">Additional ownership info required for corporate/business clients</p>
            </div>
          </label>
        </div>

        {formData.isOrganization && (
          <div className="ml-6 p-4 bg-gray-50 rounded-lg space-y-3 border border-gray-100">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Organization Ownership — s.23(2.1)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Organization Name</label>
                <Input value={formData.orgName} onChange={e => updateForm('orgName', e.target.value)} placeholder="Legal entity name" />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Incorporation / Business #</label>
                <Input value={formData.orgIncorporationNumber} onChange={e => updateForm('orgIncorporationNumber', e.target.value)} placeholder="e.g. ON-12345678" />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Owner / Director Names</label>
                <Input value={formData.orgOwnerNames} onChange={e => updateForm('orgOwnerNames', e.target.value)} placeholder="Comma-separated names" />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Owner Occupations</label>
                <Input value={formData.orgOwnerOccupations} onChange={e => updateForm('orgOwnerOccupations', e.target.value)} placeholder="Comma-separated occupations" />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderStepRisk = () => {
    if (!formData.handlingFunds) {
      return (
        <div className="text-center py-8">
          <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600">Not handling funds — risk assessment not required.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Risk Level <span className="text-red-500">*</span></label>
          <div className="space-y-2">
            {RISK_LEVELS.map(r => (
              <label
                key={r.value}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  formData.riskLevel === r.value ? 'border-amber-500 bg-amber-50 ring-1 ring-amber-500' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input type="radio" name="riskLevel" value={r.value} checked={formData.riskLevel === r.value} onChange={e => updateForm('riskLevel', e.target.value)} className="mt-0.5 accent-amber-600" />
                <div>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${r.color}`}>{r.label}</span>
                  <p className="text-xs text-gray-500 mt-1">{r.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Risk Assessment Notes</label>
          <textarea
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[80px]"
            value={formData.riskNotes}
            onChange={e => updateForm('riskNotes', e.target.value)}
            placeholder="Document any red flags, inconsistencies, or reasons for the assigned risk level..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assessed By <span className="text-red-500">*</span></label>
            <Input value={formData.assessedBy} onChange={e => updateForm('assessedBy', e.target.value)} placeholder="Name of paralegal" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assessment Date</label>
            <Input type="date" value={formData.assessmentDate} onChange={e => updateForm('assessmentDate', e.target.value)} />
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={formData.suspiciousActivityFound} onChange={e => updateForm('suspiciousActivityFound', e.target.checked)} className="mt-0.5 rounded accent-red-600" />
            <div>
              <span className="text-sm font-medium text-red-700">Suspicious activity identified</span>
              <p className="text-xs text-gray-500">Check this if any indicators of money laundering, fraud, or terrorist financing are present per s.23.1</p>
            </div>
          </label>
        </div>

        {formData.suspiciousActivityFound && (
          <div className="ml-6 p-4 bg-red-50 rounded-lg border border-red-100">
            <label className="block text-xs font-semibold text-red-700 uppercase tracking-wider mb-2">Suspicious Activity Details</label>
            <textarea
              className="w-full rounded-md border border-red-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[80px]"
              value={formData.suspiciousActivityDetails}
              onChange={e => updateForm('suspiciousActivityDetails', e.target.value)}
              placeholder="Document all indicators and concerns. You may be required to file a Suspicious Transaction Report (STR) with FINTRAC."
            />
            <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Consider your obligations under the Proceeds of Crime (Money Laundering) and Terrorist Financing Act.
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderStepMonitoring = () => {
    if (!formData.handlingFunds) {
      return (
        <div className="text-center py-8">
          <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600">Not handling funds — ongoing monitoring not required.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
          <p className="text-xs text-amber-700">
            <strong>s.23.1:</strong> You must periodically monitor the business relationship with the client, including all transactions,
            to determine whether they are consistent with what you know about the client and their risk profile.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monitoring Frequency <span className="text-red-500">*</span></label>
          <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white" value={formData.monitoringFrequency} onChange={e => updateForm('monitoringFrequency', e.target.value)}>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly (Recommended)</option>
            <option value="semi_annual">Semi-Annual</option>
            <option value="annual">Annual</option>
            <option value="per_transaction">Per Transaction</option>
          </select>
          {formData.riskLevel === 'high' && formData.monitoringFrequency !== 'monthly' && formData.monitoringFrequency !== 'per_transaction' && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> High-risk clients should be monitored monthly or per transaction.</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Next Monitoring Date</label>
          <Input type="date" value={formData.nextMonitoringDate} onChange={e => updateForm('nextMonitoringDate', e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Initial Monitoring Notes</label>
          <textarea
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[80px]"
            value={formData.monitoringNotes}
            onChange={e => updateForm('monitoringNotes', e.target.value)}
            placeholder="Document initial observations — e.g. 'Funds consistent with stated employment income. No concerns at this time.'"
          />
        </div>
      </div>
    );
  };

  const renderStepReview = () => (
    <div className="space-y-4">
      <div className="bg-green-50 border border-green-100 rounded-lg p-4">
        <p className="text-sm text-green-800 font-medium">Review the source of funds details below before completing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Funds Handling</h4>
          <div><span className="text-gray-500">Handling Funds:</span> <span className="font-medium">{formData.handlingFunds ? 'Yes' : 'No'}</span></div>
          {!formData.handlingFunds && (
            <div><span className="text-gray-500">Reason:</span> <span className="font-medium">{formData.noFundsReason}</span></div>
          )}
          {formData.handlingFunds && (
            <>
              <div><span className="text-gray-500">Sources:</span> <span className="font-medium">{formData.fundSources.map(s => FUND_SOURCES.find(f => f.value === s)?.label).join(', ')}</span></div>
              {formData.expectedAmount && <div><span className="text-gray-500">Expected Amount:</span> <span className="font-medium">{formData.expectedAmount}</span></div>}
              {formData.expectedFrequency && <div><span className="text-gray-500">Frequency:</span> <span className="font-medium">{formData.expectedFrequency.replace('_', ' ')}</span></div>}
            </>
          )}
        </div>

        {formData.handlingFunds && (
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Risk & Monitoring</h4>
            <div>
              <span className="text-gray-500">Risk Level: </span>
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${RISK_LEVELS.find(r => r.value === formData.riskLevel)?.color}`}>
                {RISK_LEVELS.find(r => r.value === formData.riskLevel)?.label}
              </span>
            </div>
            <div><span className="text-gray-500">Assessed By:</span> <span className="font-medium">{formData.assessedBy}</span></div>
            <div><span className="text-gray-500">Date:</span> <span className="font-medium">{formData.assessmentDate}</span></div>
            <div><span className="text-gray-500">Monitoring:</span> <span className="font-medium">{formData.monitoringFrequency.replace('_', ' ')}</span></div>
            {formData.suspiciousActivityFound && (
              <div className="text-red-700 font-medium flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Suspicious activity flagged</div>
            )}
          </div>
        )}
      </div>

      {formData.isOrganization && (
        <div className="p-4 bg-gray-50 rounded-lg space-y-2 text-sm">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Organization — s.23(2.1)</h4>
          <div><span className="text-gray-500">Name:</span> <span className="font-medium">{formData.orgName}</span></div>
          {formData.orgIncorporationNumber && <div><span className="text-gray-500">Inc #:</span> <span className="font-medium">{formData.orgIncorporationNumber}</span></div>}
          {formData.orgOwnerNames && <div><span className="text-gray-500">Owners:</span> <span className="font-medium">{formData.orgOwnerNames}</span></div>}
        </div>
      )}

      {formData.sourceDescription && (
        <div className="p-3 bg-gray-50 rounded-lg text-sm">
          <span className="text-xs text-gray-500">Description:</span>
          <p className="text-gray-700 mt-1">{formData.sourceDescription}</p>
        </div>
      )}

      {submitError && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-lg">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <p className="text-sm text-red-700">{submitError}</p>
        </div>
      )}
    </div>
  );

  const renderFundWizardStep = () => {
    switch (wizardStep) {
      case 0: return renderStepHandling();
      case 1: return renderStepSource();
      case 2: return renderStepRisk();
      case 3: return renderStepMonitoring();
      case 4: return renderStepReview();
      default: return null;
    }
  };

  // ---- Loading ----
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 text-foreground/50">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        Loading fund source data...
      </div>
    );
  }

  // ---- Wizard Mode ----
  if (wizardOpen) {
    const currentStep = FUND_WIZARD_STEPS[wizardStep];
    return (
      <div className="space-y-6">
        {/* Step Progress */}
        <div className="flex items-center gap-1">
          {FUND_WIZARD_STEPS.map((step, idx) => {
            const StepIcon = step.icon;
            const isActive = idx === wizardStep;
            const isCompleted = idx < wizardStep;
            return (
              <div key={step.key} className="flex items-center flex-1">
                <button
                  onClick={() => idx < wizardStep && setWizardStep(idx)}
                  disabled={idx > wizardStep}
                  className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium transition-all w-full justify-center ${
                    isActive ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : isCompleted ? 'bg-green-50 text-green-700 hover:bg-green-100 cursor-pointer'
                    : 'bg-gray-50 text-gray-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle className="w-3.5 h-3.5" /> : <StepIcon className="w-3.5 h-3.5" />}
                  <span className="hidden md:inline">{step.label}</span>
                </button>
                {idx < FUND_WIZARD_STEPS.length - 1 && (
                  <ChevronRight className={`w-4 h-4 mx-0.5 flex-shrink-0 ${isCompleted ? 'text-green-400' : 'text-gray-300'}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
          <p className="text-xs text-amber-700">
            <strong>By-Law 7.1, s.23(2) & s.23.1:</strong> When handling funds, obtain source of funds information
            and periodically monitor for fraud/illegal conduct.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <currentStep.icon className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-semibold text-gray-900">Step {wizardStep + 1}: {currentStep.label}</h3>
        </div>

        {renderFundWizardStep()}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <Button variant="outline" size="sm" onClick={() => {
            if (wizardStep === 0) { setWizardOpen(false); setFormData(INITIAL_FUND_FORM); }
            else setWizardStep(prev => prev - 1);
          }}>
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            {wizardStep === 0 ? 'Cancel' : 'Back'}
          </Button>

          {wizardStep < FUND_WIZARD_STEPS.length - 1 ? (
            <Button size="sm" disabled={!canAdvanceFund(wizardStep)} onClick={() => setWizardStep(prev => prev + 1)} className="bg-amber-600 hover:bg-amber-700 text-white">
              Continue <ChevronRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          ) : (
            <Button size="sm" disabled={submitting} onClick={handleSubmitFundSource} className="bg-green-600 hover:bg-green-700 text-white">
              {submitting ? <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Saving...</> : <><CheckCircle className="w-3.5 h-3.5 mr-1.5" /> Complete Record</>}
            </Button>
          )}
        </div>
      </div>
    );
  }

  // ---- Completed View ----
  if (fundRecord) {
    const riskData = fundRecord.riskAssessmentResults ? JSON.parse(fundRecord.riskAssessmentResults) : null;
    const monitoring = fundRecord.monitoringRecords ? JSON.parse(fundRecord.monitoringRecords) : [];
    const latestMonitoring = monitoring.length > 0 ? monitoring[monitoring.length - 1] : null;

    return (
      <div className="space-y-6">
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
          <p className="text-xs text-amber-700">
            <strong>By-Law 7.1, s.23(2) & s.23.1:</strong> When handling funds, obtain source of funds information
            and periodically monitor for fraud/illegal conduct. Record all monitoring activities.
          </p>
        </div>

        <div className={`flex items-center gap-3 p-4 rounded-lg border ${
          isComplete ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'
        }`}>
          {isComplete ? (
            <>
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Source of Funds Documented</p>
                <p className="text-sm text-green-600">Fund source recorded and risk assessed by {fundRecord.assessedBy}</p>
              </div>
            </>
          ) : (
            <>
              <AlertTriangle className="w-6 h-6 text-amber-600" />
              <div>
                <p className="font-medium text-amber-800">Source of Funds Recorded — Pending Review</p>
                <p className="text-sm text-amber-600">Mark section as complete once reviewed</p>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Handling Funds" value={fundRecord.handlingFunds ? 'Yes' : 'No'} icon={DollarSign} />
          <Field label="Source Description" value={fundRecord.sourceDescription} icon={FileText} />
          {fundRecord.assessedBy && <Field label="Assessed By" value={fundRecord.assessedBy} icon={User} />}
          {fundRecord.riskAssessmentDate && <Field label="Assessment Date" value={new Date(fundRecord.riskAssessmentDate).toLocaleDateString('en-CA')} icon={Calendar} />}
        </div>

        {riskData && (
          <div className="border-t border-gray-100 pt-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Risk Assessment</h4>
            <div className="flex items-center gap-3">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${RISK_LEVELS.find(r => r.value === riskData.level)?.color}`}>
                {RISK_LEVELS.find(r => r.value === riskData.level)?.label || riskData.level}
              </span>
              {riskData.notes && <span className="text-sm text-gray-600">{riskData.notes}</span>}
            </div>
          </div>
        )}

        {latestMonitoring && (
          <div className="border-t border-gray-100 pt-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Monitoring Schedule</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Frequency" value={latestMonitoring.frequency?.replace('_', ' ')} icon={Clock} />
              {latestMonitoring.nextDate && <Field label="Next Review" value={latestMonitoring.nextDate} icon={Calendar} />}
            </div>
            {latestMonitoring.notes && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-xs text-gray-500">Notes:</span>
                <p className="text-sm text-gray-700 mt-1">{latestMonitoring.notes}</p>
              </div>
            )}
          </div>
        )}

        {fundRecord.orgOwnershipInfo && (
          <div className="border-t border-gray-100 pt-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Organization Details — s.23(2.1)</h4>
            {(() => {
              const org = JSON.parse(fundRecord.orgOwnershipInfo);
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Organization" value={org.name} icon={Building2} />
                  {org.incorporationNumber && <Field label="Inc #" value={org.incorporationNumber} icon={FileText} />}
                  {org.ownerNames && <Field label="Owners" value={org.ownerNames} icon={User} />}
                </div>
              );
            })()}
          </div>
        )}
      </div>
    );
  }

  // ---- Empty State ----
  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
        <p className="text-xs text-amber-700">
          <strong>By-Law 7.1, s.23(2) & s.23.1:</strong> When handling funds, obtain source of funds information
          and periodically monitor for fraud/illegal conduct. Record all monitoring activities.
        </p>
      </div>
      <EmptySection
        message="Source of funds documentation not yet recorded. Required if handling client funds."
        actionLabel="Record Fund Source"
        onAction={() => setWizardOpen(true)}
      />
    </div>
  );
}

// ============================================================
// SECTION E: Conflict Check
// ============================================================
function SectionConflictCheck({ file, editing, editValues, onChange }: SectionEditProps) {
  const isComplete = file.sections.conflictCheck;
  const [conflictData, setConflictData] = useState<{
    status: string;
    date: string;
    opposingParties: string;
    relationship: string;
    city: string;
    matches: any[];
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // ---- Inline "Run Conflict Check" wizard ----
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardParties, setWizardParties] = useState<string[]>(['']);
  const [wizardRelationship, setWizardRelationship] = useState('');
  const [wizardCity, setWizardCity] = useState('');
  const [wizardRunning, setWizardRunning] = useState(false);
  const [wizardError, setWizardError] = useState('');

  const resetWizard = () => {
    setWizardParties(['']);
    setWizardRelationship('');
    setWizardCity('');
    setWizardError('');
    setWizardRunning(false);
  };

  const runConflictCheck = async () => {
    setWizardError('');
    const parties = wizardParties.map(p => p.trim()).filter(Boolean);
    if (parties.length === 0) {
      setWizardError('Enter at least one opposing-party name.');
      return;
    }
    if (!wizardRelationship) {
      setWizardError('Select the relationship type.');
      return;
    }
    if (!wizardCity.trim()) {
      setWizardError('Enter the city/location of the matter.');
      return;
    }
    if (!file.clientId) {
      setWizardError('This file is not linked to a client profile.');
      return;
    }

    setWizardRunning(true);
    try {
      // We're inside a file that already shows this client's info, so we
      // already have a valid clientprofiles row id at file.clientId.
      // Just run the search and write the result; if the update at the
      // end fails because of a stale id, that real error surfaces below.

      // Pull data sources to scan
      // limit:1000 — default getAll() returns only 50 rows, so the
      // recovery lookup (`allClients.find(p => p.clientId === ...)`)
      // would silently miss any profile past page 1, and we'd raise
      // "Could not locate" / WDE0073 even though the row exists.
      const [clientsRes, docsRes, assignsRes] = await Promise.all([
        BaseCrudService.getAll<any>('clientprofiles', undefined, { limit: 1000 }),
        BaseCrudService.getAll<any>('clientdocuments', undefined, { limit: 1000 }),
        BaseCrudService.getAll<any>('fileassignments', undefined, { limit: 1000 }),
      ]);
      const allClients = clientsRes.items || [];
      const allDocs = docsRes.items || [];
      const allAssigns = assignsRes.items || [];

      const matchCheck = (search: string, target: string): boolean => {
        if (!target) return false;
        const s = search.trim().toLowerCase();
        const t = target.toLowerCase();
        if (t.includes(s)) return true;
        const tokens = s.split(' ').filter(x => x.length > 1);
        if (!tokens.length) return false;
        const hits = tokens.filter(x => t.includes(x)).length;
        return hits >= Math.ceil(tokens.length / 2);
      };

      const matches: any[] = [];
      parties.forEach(name => {
        allClients.forEach((c: any) => {
          // Skip the current client on either id form (row _id OR display
          // clientId). Comparing both ways means we never accidentally
          // self-match no matter which id form is stored on the file.
          if (c._id === file.clientId) return;
          if ((c as any).clientId && (c as any).clientId === file.clientId) return;
          const full = `${c.firstName || ''} ${c.lastName || ''}`.trim();
          if (matchCheck(name, full)) {
            matches.push({ matchType: 'client', matchedName: full, matchedIn: 'Client Records', matchedAgainst: name });
          }
        });
        allDocs.forEach((d: any) => {
          if (matchCheck(name, d.documentName || '')) {
            matches.push({ matchType: 'document', matchedName: d.documentName || 'Document', matchedIn: 'Document Library', matchedAgainst: name });
          }
          if (matchCheck(name, d.notes || '')) {
            matches.push({ matchType: 'document', matchedName: name, matchedIn: 'Document Notes', matchedAgainst: name });
          }
        });
        allAssigns.forEach((a: any) => {
          if (matchCheck(name, a.notes || '')) {
            matches.push({ matchType: 'file', matchedName: name, matchedIn: 'Case File Notes', matchedAgainst: name });
          }
        });
      });

      const unique = matches.filter((m, i, arr) =>
        i === arr.findIndex(x => x.matchType === m.matchType && x.matchedName === m.matchedName && x.matchedAgainst === m.matchedAgainst)
      );

      const status: 'passed' | 'flagged' = unique.length > 0 ? 'flagged' : 'passed';
      const checkedDate = new Date().toISOString();

      // Save to client profile. We try by file.clientId first (the normal
      // case). If the underlying CMS rejects it (stale id), find the real
      // row by scanning clientprofiles.clientId field as a recovery path.
      const profilePayload = {
        conflictCheckCompleted: true,
        conflictCheckDate: checkedDate,
        conflictCheckStatus: status,
        opposingPartyNames: parties.join(', '),
        opposingPartyRelationship: wizardRelationship,
        conflictMatterCity: wizardCity.trim(),
        conflictMatchesFound: JSON.stringify(unique),
      };
      try {
        await BaseCrudService.update('clientprofiles', {
          _id: file.clientId,
          ...profilePayload,
        } as any);
      } catch (primaryErr) {
        // Recovery path — find the real row by display clientId field
        // eslint-disable-next-line no-console
        console.warn('Primary profile update failed, attempting recovery lookup:', primaryErr);
        const realRow = allClients.find((p: any) => p.clientId === file.clientId);
        if (realRow?._id) {
          await BaseCrudService.update('clientprofiles', {
            _id: realRow._id,
            ...profilePayload,
          } as any);
        } else {
          throw primaryErr;
        }
      }

      // Mirror onto the clientfiles row (Section E completeness + status)
      try {
        await BaseCrudService.update('clientfiles', {
          _id: file._id,
          sectionConflictCheck: true,
          conflictStatus: status,
        } as any);
      } catch { /* non-fatal */ }

      // Refresh local conflict-data view
      setConflictData({
        status,
        date: checkedDate,
        opposingParties: parties.join(', '),
        relationship: wizardRelationship,
        city: wizardCity.trim(),
        matches: unique,
      });

      setWizardOpen(false);
      resetWizard();
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error('Conflict check failed:', err);
      setWizardError(err?.message ? `Failed to run check: ${err.message}` : 'Failed to run conflict check.');
    } finally {
      setWizardRunning(false);
    }
  };

  useEffect(() => {
    if (file.clientId) {
      loadConflictData();
    }
  }, [file.clientId, isComplete]);

  const loadConflictData = async () => {
    setLoading(true);
    try {
      const profile = await BaseCrudService.getById<any>('clientprofiles', file.clientId);
      if (profile && profile.conflictCheckCompleted) {
        setConflictData({
          status: profile.conflictCheckStatus || 'unknown',
          date: profile.conflictCheckDate || file.dateOpened,
          opposingParties: profile.opposingPartyNames || 'N/A',
          relationship: profile.opposingPartyRelationship || 'N/A',
          city: profile.conflictMatterCity || 'N/A',
          matches: profile.conflictMatchesFound ? JSON.parse(profile.conflictMatchesFound) : [],
        });
      }
    } catch (error) {
      console.error('Error loading conflict data:', error);
    } finally {
      setLoading(false);
    }
  };

  /** Generate HTML report for the conflict check */
  const generateConflictReportHtml = () => {
    if (!conflictData) return '';
    const statusLabel = conflictData.status === 'passed' ? 'PASSED — No Conflicts Found' : `FLAGGED — ${conflictData.matches.length} Match(es) Found`;
    const matchRows = conflictData.matches.length > 0
      ? conflictData.matches.map((m: any) =>
        `<tr><td style="padding:6px 10px;border:1px solid #ccc;">${m.matchedAgainst}</td><td style="padding:6px 10px;border:1px solid #ccc;">${m.matchedIn}</td><td style="padding:6px 10px;border:1px solid #ccc;">${m.matchedName}</td><td style="padding:6px 10px;border:1px solid #ccc;">${m.matchType}</td></tr>`
      ).join('')
      : '<tr><td colspan="4" style="padding:10px;text-align:center;color:#666;">No matches found</td></tr>';

    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Conflict Check Report — ${file.clientName}</title>
<style>body{font-family:'Times New Roman',serif;font-size:12pt;margin:40px;color:#000}
h1{font-size:16pt;text-align:center;margin-bottom:4px}
h2{font-size:13pt;border-bottom:1px solid #000;padding-bottom:4px;margin-top:24px}
.header{text-align:center;margin-bottom:30px}
.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px 24px;margin:12px 0}
.info-item{display:flex;gap:8px}.info-item .label{font-weight:bold;min-width:160px}
table{width:100%;border-collapse:collapse;margin:10px 0}
th{background:#f0f0f0;padding:8px 10px;border:1px solid #ccc;text-align:left;font-weight:bold}
.status-badge{display:inline-block;padding:4px 14px;border-radius:4px;font-weight:bold;font-size:11pt}
.passed{background:#d4edda;color:#155724}.flagged{background:#fff3cd;color:#856404}
.footer{margin-top:40px;border-top:1px solid #000;padding-top:12px;font-size:10pt;color:#666}
@media print{body{margin:20px}}</style></head><body>
<div class="header"><h1>CONFLICT OF INTEREST CHECK</h1>
<p style="font-size:10pt;color:#666">Legal Assist Paralegal Services — LSO By-Law 7.1 Compliance</p></div>
<h2>File Information</h2>
<div class="info-grid">
<div class="info-item"><span class="label">File Number:</span><span>${file.fileNumber}</span></div>
<div class="info-item"><span class="label">Client Name:</span><span>${file.clientName}</span></div>
<div class="info-item"><span class="label">Date Checked:</span><span>${new Date(conflictData.date).toLocaleDateString('en-CA', { year:'numeric', month:'long', day:'numeric' })}</span></div>
<div class="info-item"><span class="label">Checked By:</span><span>System (Automated Multi-Source Search)</span></div>
</div>
<h2>Search Parameters</h2>
<div class="info-grid">
<div class="info-item"><span class="label">Opposing Parties:</span><span>${conflictData.opposingParties}</span></div>
<div class="info-item"><span class="label">Relationship Type:</span><span>${conflictData.relationship}</span></div>
<div class="info-item"><span class="label">City/Location:</span><span>${conflictData.city}</span></div>
<div class="info-item"><span class="label">Data Sources Searched:</span><span>Client Records, Documents, File Assignments</span></div>
</div>
<h2>Result</h2>
<p><span class="status-badge ${conflictData.status === 'passed' ? 'passed' : 'flagged'}">${statusLabel}</span></p>
<h2>Match Details</h2>
<table><thead><tr><th>Searched Name</th><th>Found In</th><th>Matched Record</th><th>Type</th></tr></thead><tbody>${matchRows}</tbody></table>
<div class="footer">
<p>This conflict check was performed in accordance with the Law Society of Ontario's Paralegal Rules of Conduct, Rule 3.04.</p>
<p>Generated: ${new Date().toLocaleString('en-CA')} | File: ${file.fileNumber} | Legal Assist Paralegal Services</p>
</div></body></html>`;
  };

  const handleViewReport = () => {
    const html = generateConflictReportHtml();
    if (!html) return;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const handleDownloadReport = () => {
    const html = generateConflictReportHtml();
    if (!html) return;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Conflict-Check-${file.fileNumber}-${file.clientName?.replace(/\s+/g, '-')}.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrintReport = () => {
    const html = generateConflictReportHtml();
    if (!html) return;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.onload = () => printWindow.print();
    }
  };

  // Filter matches by search term
  const filteredMatches = conflictData?.matches.filter((m: any) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (m.matchedAgainst || '').toLowerCase().includes(term)
      || (m.matchedName || '').toLowerCase().includes(term)
      || (m.matchedIn || '').toLowerCase().includes(term);
  }) || [];

  return (
    <div className="space-y-6">
      <div className="bg-red-50 border border-red-100 rounded-lg p-4">
        <p className="text-xs text-red-700">
          <strong>Paralegal Rules of Conduct, Rule 3.04:</strong> Before accepting a retainer, check for conflicts
          of interest. Document the search and results. This integrates with the system's conflict detection.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-8 text-foreground/50">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          Loading conflict check data...
        </div>
      ) : conflictData ? (
        <div className="space-y-4">
          {/* Status banner */}
          <div className={`flex items-center gap-3 p-4 rounded-lg border ${
            conflictData.status === 'passed'
              ? 'bg-green-50 border-green-200'
              : 'bg-amber-50 border-amber-200'
          }`}>
            {conflictData.status === 'passed' ? (
              <>
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div className="flex-1">
                  <p className="font-medium text-green-800">Conflict Check Passed</p>
                  <p className="text-sm text-green-600">No conflicts of interest detected</p>
                </div>
              </>
            ) : (
              <>
                <AlertTriangle className="w-6 h-6 text-amber-600" />
                <div className="flex-1">
                  <p className="font-medium text-amber-800">Potential Conflict Flagged</p>
                  <p className="text-sm text-amber-600">{conflictData.matches.length} matching record(s) found — review required</p>
                </div>
              </>
            )}
            {/* Action buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button variant="outline" size="sm" onClick={handleViewReport} title="View Report">
                <Eye className="w-3.5 h-3.5 mr-1" /> View
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadReport} title="Download Report">
                <Download className="w-3.5 h-3.5 mr-1" /> Download
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrintReport} title="Print Report">
                <Printer className="w-3.5 h-3.5 mr-1" /> Print
              </Button>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Date Checked" value={new Date(conflictData.date).toLocaleDateString('en-CA')} icon={Calendar} />
            <Field label="Checked By" value="System (Automated Multi-Source Search)" icon={Shield} />
            <Field label="Opposing Parties Searched" value={conflictData.opposingParties} icon={Search} />
            <Field label="Relationship Type" value={conflictData.relationship} icon={Users} />
            <Field label="City/Location" value={conflictData.city} icon={MapPin} />
            <Field label="Status" value={conflictData.status === 'passed' ? 'Passed — No conflicts found' : `Flagged — ${conflictData.matches.length} match(es)`} icon={conflictData.status === 'passed' ? CheckCircle : AlertTriangle} />
          </div>

          {/* Search matches */}
          {conflictData.matches.length > 0 && (
            <div className="border border-amber-200 rounded-lg overflow-hidden">
              <div className="bg-amber-50 px-4 py-2 border-b border-amber-200 flex items-center justify-between">
                <p className="text-sm font-medium text-amber-800">Conflict Match Details</p>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search matches..."
                    className="pl-8 pr-3 py-1.5 text-xs border border-amber-200 rounded-md bg-white focus:ring-1 focus:ring-amber-300 focus:border-amber-300 w-48"
                  />
                </div>
              </div>
              <div className="p-4 space-y-2">
                {filteredMatches.map((match: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 text-sm p-2 bg-white rounded border border-amber-100">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span className="text-foreground/70">
                      <strong>{match.matchedAgainst}</strong> matched in {match.matchedIn}
                      {match.matchedName !== match.matchedAgainst && ` (matched: ${match.matchedName})`}
                    </span>
                  </div>
                ))}
                {filteredMatches.length === 0 && searchTerm && (
                  <p className="text-sm text-amber-600 text-center py-2">No matches for "{searchTerm}"</p>
                )}
              </div>
            </div>
          )}

          {/* Paralegal notes */}
          <div className="border-t border-gray-100 pt-4">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Paralegal Notes</label>
            {editing ? (
              <textarea
                value={editValues['conflictNotes'] ?? ''}
                onChange={(e) => onChange('conflictNotes', e.target.value)}
                className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary/20 focus:border-primary mt-1"
                rows={3}
              />
            ) : (
              <p className="text-sm text-gray-900 mt-1 p-3 bg-gray-50 rounded-lg">{editValues['conflictNotes'] || 'No notes recorded'}</p>
            )}
          </div>
        </div>
      ) : (
        <EmptySection
          message="Conflict check has not been performed for this file."
          actionLabel="Run Conflict Check"
          onAction={() => { resetWizard(); setWizardOpen(true); }}
        />
      )}

      {/* ---- Conflict-check wizard ---- */}
      {wizardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold">Run Conflict of Interest Check</h3>
              <button
                type="button"
                aria-label="Close"
                onClick={() => { setWizardOpen(false); resetWizard(); }}
                className="text-gray-400 hover:text-gray-700 text-2xl leading-none"
              >&times;</button>
            </div>

            <div className="p-5 space-y-4">
              {/* Opposing party names */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Opposing Party Name(s) <span className="text-red-600">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Enter the full legal name of each person or business on the other side of this matter.
                </p>
                {wizardParties.map((party, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={party}
                      onChange={e => {
                        const next = [...wizardParties];
                        next[idx] = e.target.value;
                        setWizardParties(next);
                      }}
                      placeholder={idx === 0 ? 'e.g., John Smith or ABC Property Management Inc.' : `Opposing party ${idx + 1}`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {wizardParties.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setWizardParties(wizardParties.filter((_, i) => i !== idx))}
                        className="px-3 text-red-600 hover:bg-red-50 rounded-md"
                        aria-label="Remove party"
                      >&times;</button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setWizardParties([...wizardParties, ''])}
                  className="text-sm text-primary hover:underline mt-1"
                >+ Add another opposing party</button>
              </div>

              {/* Relationship */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Their Role in the Matter <span className="text-red-600">*</span>
                </label>
                <select
                  value={wizardRelationship}
                  onChange={e => setWizardRelationship(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                >
                  <option value="">Select a role...</option>
                  <option value="Landlord">Landlord</option>
                  <option value="Tenant">Tenant</option>
                  <option value="Employer">Employer</option>
                  <option value="Former Employer">Former Employer</option>
                  <option value="Business/Company">Business / Company</option>
                  <option value="Individual">Individual</option>
                  <option value="Government Agency">Government Agency</option>
                  <option value="Insurance Company">Insurance Company</option>
                  <option value="Creditor">Creditor / Collection Agency</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* City / location */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  City of the Matter <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={wizardCity}
                  onChange={e => setWizardCity(e.target.value)}
                  placeholder="e.g., London, Toronto, Windsor"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Error */}
              {wizardError && (
                <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {wizardError}
                </div>
              )}
            </div>

            <div className="p-5 border-t border-gray-200 flex items-center justify-end gap-2">
              <Button variant="outline" onClick={() => { setWizardOpen(false); resetWizard(); }} disabled={wizardRunning}>
                Cancel
              </Button>
              <Button onClick={runConflictCheck} disabled={wizardRunning}>
                {wizardRunning ? 'Searching...' : 'Run Check'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// SECTION F: Retainer Agreement
// ============================================================
const FEE_ARRANGEMENT_TYPES = [
  { value: 'hourly', label: 'Hourly Rate', description: 'Billed per hour + HST' },
  { value: 'flat_fee', label: 'Flat Fee', description: 'One-time fixed amount + HST' },
  { value: 'hybrid', label: 'Hybrid', description: 'Flat fee upfront, then hourly' },
  { value: 'contingency', label: 'Contingency', description: '% of monetary recovery' },
];

const RETAINER_STATUSES = [
  { value: 'draft', label: 'Draft', color: 'bg-gray-100 text-gray-700' },
  { value: 'sent', label: 'Sent to Client', color: 'bg-blue-100 text-blue-700' },
  { value: 'signed', label: 'Signed', color: 'bg-green-100 text-green-700' },
  { value: 'amended', label: 'Amended', color: 'bg-amber-100 text-amber-700' },
  { value: 'terminated', label: 'Terminated', color: 'bg-red-100 text-red-700' },
];

interface RetainerAgreement {
  _id?: string;
  fileId?: string;
  clientId?: string;
  documentUrl?: string;
  dateSigned?: string;
  scopeOfServices?: string;
  feeArrangementType?: string;
  feeAmount?: string;
  // Specific rate fields by type
  hourlyRate?: string;
  flatFeeAmount?: string;
  hybridFlatFee?: string;
  hybridHourlyRate?: string;
  contingencyPercent?: string;
  retainerDeposit?: string;
  trustAccountDisclosure?: boolean;
  clientAcknowledgment?: boolean;
  scopeLimitationsAcknowledged?: boolean;
  retainerStatus?: string;
  amendments?: string;
  /** Free-text describing the claim/charge/dispute — appears at the top of the rendered retainer. */
  natureOfMatter?: string;
  /** Id from `paralegals.ts` selecting which paralegal signs this retainer. Defaults to firm primary. */
  paralegalId?: string;
  /** Optional override for matter profile selection (otherwise file.matterType drives it). */
  templateName?: string;
  // ---- Payment received at retainer signing (LSO By-Law 9 / Form 9A) ----
  paymentReceived?: boolean;
  paymentAmount?: string;
  paymentMethod?: string;       // cash | cheque | credit_card | etransfer | square | other
  paymentDate?: string;          // YYYY-MM-DD
  paymentReceivedBy?: string;    // Receiving paralegal display name
  paymentPurpose?: string;       // e.g. "Initial retainer deposit"
  paymentReference?: string;     // Cheque #, e-transfer ref, receipt #
  paymentDeposit?: string;       // 'trust' | 'general'
  // ---- Payment arrangement (going-forward schedule, optional) ----
  paymentArrangementEnabled?: boolean;
  paymentArrangementType?: string;       // 'full' | 'installments' | 'deferred' | 'custom'
  paymentArrangementTotal?: string;      // Total expected (display only)
  paymentInstallmentAmount?: string;     // Per-instalment amount
  paymentInstallmentFrequency?: string;  // 'weekly' | 'biweekly' | 'monthly' | 'quarterly'
  paymentInstallmentStartDate?: string;  // YYYY-MM-DD
  paymentInstallmentCount?: string;      // Number of instalments
  paymentArrangementNotes?: string;      // Free-text additional terms
}

const EMPTY_RETAINER: Omit<RetainerAgreement, '_id'> = {
  documentUrl: '',
  dateSigned: new Date().toISOString().split('T')[0],
  scopeOfServices: '',
  feeArrangementType: '',
  feeAmount: '',
  hourlyRate: '',
  flatFeeAmount: '',
  hybridFlatFee: '',
  hybridHourlyRate: '',
  contingencyPercent: '',
  retainerDeposit: '',
  trustAccountDisclosure: false,
  clientAcknowledgment: false,
  scopeLimitationsAcknowledged: false,
  retainerStatus: 'draft',
  amendments: '',
  natureOfMatter: '',
  paralegalId: DEFAULT_PARALEGAL_ID,
  templateName: '',
  paymentReceived: false,
  paymentAmount: '',
  paymentMethod: 'cash',
  paymentDate: '',
  paymentReceivedBy: '',
  paymentPurpose: 'Initial retainer deposit',
  paymentReference: '',
  paymentDeposit: 'trust',
  paymentArrangementEnabled: false,
  paymentArrangementType: 'full',
  paymentArrangementTotal: '',
  paymentInstallmentAmount: '',
  paymentInstallmentFrequency: 'monthly',
  paymentInstallmentStartDate: '',
  paymentInstallmentCount: '',
  paymentArrangementNotes: '',
};

function SectionRetainerAgreement({ file }: SectionEditProps) {
  const [agreements, setAgreements] = useState<RetainerAgreement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewingAgreement, setViewingAgreement] = useState<RetainerAgreement | null>(null);
  const [editingAgreement, setEditingAgreement] = useState<RetainerAgreement | null>(null);
  const [formData, setFormData] = useState<Omit<RetainerAgreement, '_id'>>(EMPTY_RETAINER);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [saveError, setSaveError] = useState('');

  // Email states
  const [emailingAgreement, setEmailingAgreement] = useState<RetainerAgreement | null>(null);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);

  // Convert retainer to GeneratedDocuments shape for EmailDocumentDialog
  const retainerAsDocument = (agreement: RetainerAgreement | null): GeneratedDocuments | null => {
    if (!agreement) return null;
    return {
      _id: agreement._id || '',
      documentName: `Retainer Agreement — ${file.clientName}`,
      clientEmail: file.clientEmail || '',
      clientId: file.clientId || '',
      status: agreement.retainerStatus === 'signed' ? 'signed' : 'draft',
      documentUrl: agreement.documentUrl || '',
      signedDocumentUrl: agreement.retainerStatus === 'signed' ? agreement.documentUrl : undefined,
    };
  };

  const handleEmailRetainer = async (emailData: EmailFormData) => {
    if (!emailingAgreement) return;
    try {
      const activityLog: EmailActivityLog = await sendDocumentEmail({
        to: emailData.to,
        subject: emailData.subject,
        body: emailData.body,
        documentUrl: emailingAgreement.documentUrl || '',
        documentName: `Retainer Agreement — ${file.clientName}`,
        clientName: file.clientName || '',
        paralegalName: file.assignedParalegalName || 'Legal Assist Paralegal Services',
        documentId: emailingAgreement._id || '',
        clientId: file.clientId,
      });

      if (activityLog.success) {
        // Update retainer status to 'sent' if it was still in draft
        if (emailingAgreement.retainerStatus === 'draft' && emailingAgreement._id) {
          try {
            await BaseCrudService.update('retaineragreements', {
              _id: emailingAgreement._id,
              retainerStatus: 'sent',
            } as any);
            setAgreements(prev => prev.map(a =>
              a._id === emailingAgreement._id ? { ...a, retainerStatus: 'sent' } : a
            ));
            if (viewingAgreement?._id === emailingAgreement._id) {
              setViewingAgreement({ ...viewingAgreement, retainerStatus: 'sent' });
            }
          } catch (err) {
            console.error('Error updating retainer status:', err);
          }
        }

        // Log activity
        try {
          await BaseCrudService.create('activitylogs', {
            _id: crypto.randomUUID(),
            activityType: 'retainer_emailed',
            activityDescription: `Retainer agreement emailed to ${emailData.to} for ${file.clientName}`,
            timestamp: new Date().toISOString(),
            relatedItemId: emailingAgreement._id,
          });
        } catch (err) {
          console.error('Error logging email activity:', err);
        }

        setSaveSuccess('Retainer agreement emailed successfully.');
      } else {
        setSaveError('Failed to send email. Please try again.');
      }
    } catch (err: any) {
      console.error('Error emailing retainer:', err);
      setSaveError(`Email failed: ${err?.message || 'Unknown error'}`);
    } finally {
      setIsEmailDialogOpen(false);
      setEmailingAgreement(null);
    }
  };

  const openRetainerEmail = (agreement: RetainerAgreement) => {
    setEmailingAgreement(agreement);
    setIsEmailDialogOpen(true);
  };

  // State for PDF generation
  const [generatingPDF, setGeneratingPDF] = useState(false);

  /** Auto-mark Section F (Retainer Agreement) in LSO compliance when retainer exists */
  const autoMarkSectionF = async () => {
    try {
      const sectionKeys = [
        'sectionFileOpening', 'sectionClientIdentification', 'sectionClientVerification',
        'sectionSourceOfFunds', 'sectionConflictCheck', 'sectionRetainerAgreement',
        'sectionFinancialRecords', 'sectionCommunicationLog', 'sectionCaseDocuments',
        'sectionFileClosing', 'sectionContingencyPlan'
      ];
      const { items: clientFiles } = await BaseCrudService.getAll<any>('clientfiles');
      const matchingFile = clientFiles?.find((f: any) => f._id === file._id || f.clientId === file.clientId);
      if (matchingFile && !matchingFile.sectionRetainerAgreement) {
        const completedCount = sectionKeys.filter(k =>
          k === 'sectionRetainerAgreement' ? true : !!matchingFile[k]
        ).length;
        const newScore = Math.round((completedCount / sectionKeys.length) * 100);
        await BaseCrudService.update('clientfiles', {
          _id: matchingFile._id,
          sectionRetainerAgreement: true,
          complianceScore: newScore,
        } as any);
      }
    } catch (err) {
      console.warn('Could not auto-update LSO compliance Section F:', err);
    }
  };

  /**
   * Auto-generate the retainer agreement HTML from the form fields,
   * auto-sign with Jean-Francois Demers + today's date,
   * store the document URL, file it into the retainer section,
   * then open the email dialog.
   */
  const handleGenerateAndEmail = async (agreement: RetainerAgreement) => {
    setGeneratingPDF(true);
    setSaveError('');
    try {
      // ---- Resolve the client profile robustly ----
      // Try the row primary key first (correct, current behaviour). If that
      // misses (legacy data where file.clientId was stored as the display
      // CL-XXXXXX label rather than the row _id), fall back to scanning
      // clientprofiles by display id and by matching name+email. Whichever
      // path resolves, we use that row's full address / phone for the
      // retainer Section F. Without this, an unmatched profile leaves
      // every address field blank ('—' placeholders).
      let profile: any = null;
      try {
        profile = await BaseCrudService.getById<any>('clientprofiles', file.clientId);
      } catch { /* fall through to scan */ }

      if (!profile) {
        try {
          // limit:1000 — default 50-page would silently miss any profile
          // past the first page, leaving Section F blank.
          const { items } = await BaseCrudService.getAll<any>(
            'clientprofiles', undefined, { limit: 1000 }
          );
          // First pass: match by clientprofiles.clientId field (display CL-XXXXXX)
          profile = items?.find((p: any) => p.clientId === file.clientId) || null;
          // Second pass: match by clientName+email if still missing
          if (!profile && file.clientName && file.clientEmail) {
            profile = items?.find((p: any) =>
              `${p.firstName || ''} ${p.lastName || ''}`.trim() === file.clientName &&
              (p.email === file.clientEmail || true)
            ) || null;
          }
        } catch { /* keep profile null */ }
      }

      profile = profile || {};

      // ---- Resolve nature-of-matter from any of the recognised fields ----
      // Older agreements stored it as `natureOfMatter`, but at various
      // points the form has saved it under `natureOfDispute`,
      // `matterDescription`, or `description`. Read all and pick the
      // first non-empty one so the field never silently disappears.
      const resolvedNature =
        (agreement as any).natureOfMatter ||
        (agreement as any).natureOfDispute ||
        (agreement as any).matterDescription ||
        (agreement as any).description ||
        file.matterDescription ||
        '';

      // ---- Validate and resolve email + matter reference ----
      // Pick the first value that actually looks like an email. Wix can
      // sometimes hand back a UUID-looking string in clientEmail when the
      // schema field was repurposed; we'd rather render "—" than print a
      // hex blob in the retainer's Email field.
      const looksLikeEmail = (s?: string) =>
        !!s && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
      const resolvedEmail = [
        file.clientEmail,
        (profile as any).email,
      ].find(looksLikeEmail) || '';

      // Matter reference: prefer the file number (LA-YYYY-NNNN), then the
      // client's display id (CL-XXXXXX) — never the underlying _id UUID.
      const profileClientId = (profile as any).clientId;
      const resolvedMatterRef =
        file.fileNumber ||
        (typeof profileClientId === 'string' && profileClientId.startsWith('CL-')
          ? profileClientId : '') ||
        '';

      // ---- Build the data envelope used by both generators ----
      const retainerData = {
        clientName: file.clientName ||
                    `${profile.firstName || ''} ${profile.lastName || ''}`.trim() ||
                    '',
        clientEmail: resolvedEmail,
        clientPhone: profile.phoneNumber || profile.alternatePhone || '',
        clientAddress: profile.streetAddress || '',
        clientUnit: profile.unitNumber || '',
        clientCity: profile.city || '',
        clientProvince: profile.state || 'Ontario',
        clientPostalCode: profile.zipCode || '',
        matterReference: resolvedMatterRef,
        matterType: file.matterType || '',
        templateName: agreement.templateName || file.matterType || '',
        natureOfMatter: resolvedNature,
        paralegalId: agreement.paralegalId || '',
        feeArrangementType: agreement.feeArrangementType || 'flat_fee',
        hourlyRate: agreement.hourlyRate || '',
        flatFeeAmount: agreement.flatFeeAmount || '',
        hybridFlatFee: agreement.hybridFlatFee || '',
        hybridHourlyRate: agreement.hybridHourlyRate || '',
        contingencyPercent: agreement.contingencyPercent || '',
        retainerDeposit: agreement.retainerDeposit || '',
        // Payment-received block (rendered as "Receipt of Funds"
        // section in the retainer; mirrored to financialrecords below)
        paymentReceived: !!agreement.paymentReceived,
        paymentAmount: agreement.paymentAmount || '',
        paymentMethod: agreement.paymentMethod || '',
        paymentDate: agreement.paymentDate || '',
        paymentReceivedBy: agreement.paymentReceivedBy || '',
        paymentPurpose: agreement.paymentPurpose || '',
        paymentReference: agreement.paymentReference || '',
        paymentDeposit: agreement.paymentDeposit || '',
        // Payment arrangement block (going-forward schedule).
        // Renders the "Payment Arrangement" section in the retainer
        // only when paymentArrangementEnabled is true.
        paymentArrangementEnabled: !!agreement.paymentArrangementEnabled,
        paymentArrangementType: agreement.paymentArrangementType || '',
        paymentArrangementTotal: agreement.paymentArrangementTotal || '',
        paymentInstallmentAmount: agreement.paymentInstallmentAmount || '',
        paymentInstallmentFrequency: agreement.paymentInstallmentFrequency || '',
        paymentInstallmentStartDate: agreement.paymentInstallmentStartDate || '',
        paymentInstallmentCount: agreement.paymentInstallmentCount || '',
        paymentArrangementNotes: agreement.paymentArrangementNotes || '',
      };

      // ---- Generate HTML (for download) and PDF (for storage / email) ----
      const { html: _html, dataUrl: htmlDataUrl, filename: htmlFilename } =
        generateRetainerHTML(retainerData);

      // PDF generation may fail if pdf-lib hits a font/layout error — we
      // surface the real error so the user can see it instead of silently
      // falling back to HTML which can't fit in a CMS text field anyway.
      let pdfBlob: Blob | null = null;
      let pdfFilename = htmlFilename.replace(/\.html?$/i, '.pdf');
      try {
        const pdfRes = await generateRetainerPDF(retainerData as any);
        pdfBlob = pdfRes.blob;
        pdfFilename = pdfRes.filename || pdfFilename;
      } catch (pdfErr: any) {
        // eslint-disable-next-line no-console
        console.error('PDF generation failed:', pdfErr);
        throw new Error(
          `Could not generate the retainer PDF: ${pdfErr?.message || 'unknown error'}. ` +
          `The HTML version was generated successfully and downloaded, but the ` +
          `PDF couldn't be created. Check the console for the underlying error.`
        );
      }

      // ---- Upload the PDF to Wix Media so we can store a CDN URL ----
      // The CMS field cap (~256 KB) can't hold a base64-encoded PDF, so we
      // upload the binary to Wix Media and store the resulting URL. If
      // Wix Media isn't available we fall back to a download-only flow
      // (PDF goes to the user's machine but no CMS persistence).
      //
      // NOTE: we route through `uploadToWixMedia` and pass the Blob
      // directly. We deliberately avoid `new File([...])` because in
      // the Wix Astro / Cloudflare Workers production bundle the
      // global `File` constructor is sometimes minified/shadowed to
      // a stub that throws "X is not a constructor" at runtime.
      let storedDocumentUrl = '';
      try {
        if (pdfBlob) {
          const { uploadToWixMedia } = await import('@/lib/wix-media-upload');
          const uploaded = await uploadToWixMedia(
            pdfBlob,
            pdfFilename,
            'application/pdf'
          );
          if (uploaded?.url) storedDocumentUrl = uploaded.url;
        }
      } catch (uploadErr) {
        // eslint-disable-next-line no-console
        console.warn('Wix Media upload failed; PDF will only be downloaded locally:', uploadErr);
      }

      // ---- Update the agreement's documentUrl in local state ----
      // Prefer the Wix CDN URL; fall back to the in-memory blob URL so
      // the user at least gets a working preview link this session.
      const inMemoryPdfUrl = pdfBlob ? URL.createObjectURL(pdfBlob) : htmlDataUrl;
      const updatedAgreement = {
        ...agreement,
        documentUrl: storedDocumentUrl || inMemoryPdfUrl,
      };
      setAgreements(prev => prev.map(a =>
        a._id === agreement._id ? updatedAgreement : a
      ));

      // ---- Persist to CMS (only the URL — no base64 blob this time) ----
      if (agreement._id && storedDocumentUrl) {
        try {
          await BaseCrudService.update('retaineragreements', {
            _id: agreement._id,
            documentUrl: storedDocumentUrl,
          } as any);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('Error updating retainer URL in CMS:', err);
        }
      } else if (agreement._id && !storedDocumentUrl) {
        // eslint-disable-next-line no-console
        console.warn(
          'No CDN URL available for retainer; skipping CMS update. ' +
          'PDF was generated and downloaded locally but is not persisted.'
        );
      }

      // ---- Auto-file into Section F ----
      if (storedDocumentUrl) {
        try {
          await BaseCrudService.create('clientdocuments', {
            _id: crypto.randomUUID(),
            documentName: pdfFilename,
            fileUrl: storedDocumentUrl,
            uploadDate: new Date().toISOString(),
            clientEmail: file.clientEmail || '',
            fileId: file._id,
            clientId: file.clientId,
            fileType: 'application/pdf',
            documentCategory: 'section_retainerAgreement',
            notes: `Auto-generated retainer agreement. Signed by Jean-Francois Demers on ${new Date().toLocaleDateString('en-CA')}.`,
          });
        } catch (err) {
          // eslint-disable-next-line no-console
          console.warn('Could not auto-file retainer to section F:', err);
        }
      }

      // ---- LSO By-Law 9 / Form 9A trust-ledger mirror ----
      // If the paralegal recorded a payment in the Generate Retainer
      // dialog, write a matching financialrecords row so the trust
      // ledger reconciles with what the retainer text confirms. The
      // retainer PDF and the ledger entry both reference the same
      // amount / method / date / receiving paralegal.
      if (agreement.paymentReceived && agreement.paymentAmount) {
        try {
          const parsedAmount = parseFloat(
            String(agreement.paymentAmount).replace(/[^0-9.]/g, '')
          );
          await BaseCrudService.create('financialrecords', {
            _id: crypto.randomUUID(),
            clientId: file.clientId || '',
            fileId: file._id || '',
            transactionType:
              agreement.paymentDeposit === 'trust'
                ? 'trust_deposit'
                : 'general_deposit',
            amount: isFinite(parsedAmount) ? parsedAmount : 0,
            transactionDate: agreement.paymentDate
              ? new Date(agreement.paymentDate)
              : new Date(),
            description:
              (agreement.paymentPurpose || 'Retainer payment') +
              ' - ' +
              (file.clientName || '') +
              (file.fileNumber ? ` - File: ${file.fileNumber}` : ''),
            referenceNumber: agreement.paymentReference || '',
            paymentMethod: agreement.paymentMethod || '',
            recordedBy: agreement.paymentReceivedBy || 'Paralegal',
            _createdDate: new Date(),
          });
        } catch (err) {
          // eslint-disable-next-line no-console
          console.warn(
            'Could not auto-write financialrecords row for retainer payment:',
            err
          );
        }
      }

      // ---- Trigger local download so paralegal has a copy ----
      const link = document.createElement('a');
      link.href = inMemoryPdfUrl;
      link.download = pdfFilename;
      link.click();

      // Now open the email dialog with the URL populated
      setEmailingAgreement(updatedAgreement);
      setIsEmailDialogOpen(true);

      setSaveSuccess('Retainer agreement generated, signed, and filed to Section F.');

      // Auto-mark Section F in LSO compliance
      await autoMarkSectionF();
    } catch (err: any) {
      console.error('Error generating retainer agreement:', err);
      setSaveError(`Failed to generate: ${err?.message || 'Unknown error'}`);
    } finally {
      setGeneratingPDF(false);
    }
  };

  useEffect(() => { loadAgreements(); }, [file._id]);
  useEffect(() => { if (saveSuccess) { const t = setTimeout(() => setSaveSuccess(''), 4000); return () => clearTimeout(t); } }, [saveSuccess]);
  useEffect(() => { if (saveError) { const t = setTimeout(() => setSaveError(''), 6000); return () => clearTimeout(t); } }, [saveError]);

  const loadAgreements = async () => {
    setLoading(true);
    try {
      const result = await BaseCrudService.getAll<any>('retaineragreements');
      const fileAgreements = (result.items || [])
        .filter((r: any) => r.fileId === file._id)
        .map((r: any) => ({
          _id: r._id,
          fileId: r.fileId,
          clientId: r.clientId,
          documentUrl: r.documentUrl || '',
          dateSigned: r.dateSigned ? new Date(r.dateSigned).toISOString().split('T')[0] : '',
          scopeOfServices: r.scopeOfServices || '',
          feeArrangementType: r.feeArrangementType || '',
          feeAmount: r.feeAmount || '',
          hourlyRate: r.hourlyRate || '',
          flatFeeAmount: r.flatFeeAmount || '',
          hybridFlatFee: r.hybridFlatFee || '',
          hybridHourlyRate: r.hybridHourlyRate || '',
          contingencyPercent: r.contingencyPercent || '',
          retainerDeposit: r.retainerDeposit || '',
          trustAccountDisclosure: !!r.trustAccountDisclosure,
          clientAcknowledgment: !!r.clientAcknowledgment,
          scopeLimitationsAcknowledged: !!r.scopeLimitationsAcknowledged,
          retainerStatus: r.retainerStatus || 'draft',
          amendments: r.amendments || '',
          natureOfMatter: r.natureOfMatter || '',
          paralegalId: r.paralegalId || DEFAULT_PARALEGAL_ID,
          templateName: r.templateName || '',
          // Payment received at signing (LSO By-Law 9 / Form 9A)
          paymentReceived: !!r.paymentReceived,
          paymentAmount: r.paymentAmount || '',
          paymentMethod: r.paymentMethod || 'cash',
          paymentDate: r.paymentDate || '',
          paymentReceivedBy: r.paymentReceivedBy || '',
          paymentPurpose: r.paymentPurpose || '',
          paymentReference: r.paymentReference || '',
          paymentDeposit: r.paymentDeposit || 'trust',
          // Payment arrangement (going-forward schedule)
          paymentArrangementEnabled: !!r.paymentArrangementEnabled,
          paymentArrangementType: r.paymentArrangementType || 'full',
          paymentArrangementTotal: r.paymentArrangementTotal || '',
          paymentInstallmentAmount: r.paymentInstallmentAmount || '',
          paymentInstallmentFrequency: r.paymentInstallmentFrequency || 'monthly',
          paymentInstallmentStartDate: r.paymentInstallmentStartDate || '',
          paymentInstallmentCount: r.paymentInstallmentCount || '',
          paymentArrangementNotes: r.paymentArrangementNotes || '',
        }));
      setAgreements(fileAgreements);
    } catch (err) {
      console.error('Error loading retainer agreements:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => { setFormData({ ...EMPTY_RETAINER }); };

  const handleSave = async () => {
    if (!formData.scopeOfServices?.trim()) return;
    setSaving(true);
    setSaveError('');
    setSaveSuccess('');
    try {
      const payload = {
        ...formData,
        fileId: file._id,
        clientId: file.clientId,
      };
      if (editingAgreement?._id) {
        await BaseCrudService.update('retaineragreements', { _id: editingAgreement._id, ...payload } as any);
        setAgreements(prev => prev.map(a => a._id === editingAgreement._id ? { ...a, ...payload } : a));
        setSaveSuccess('Retainer agreement updated.');
      } else {
        const created = await BaseCrudService.create('retaineragreements', payload as any);
        setAgreements(prev => [...prev, { ...payload, _id: created._id || `ret-${Date.now()}` }]);
        setSaveSuccess('Retainer agreement saved.');
      }
      setShowAddForm(false);
      setEditingAgreement(null);
      resetForm();

      // Auto-mark Section F in LSO compliance
      await autoMarkSectionF();
    } catch (err: any) {
      console.error('Error saving retainer:', err);
      setSaveError(`Failed to save: ${err?.message || 'Please try again.'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (agreement: RetainerAgreement) => {
    setFormData({
      documentUrl: agreement.documentUrl || '',
      dateSigned: agreement.dateSigned || '',
      scopeOfServices: agreement.scopeOfServices || '',
      feeArrangementType: agreement.feeArrangementType || '',
      feeAmount: agreement.feeAmount || '',
      hourlyRate: agreement.hourlyRate || '',
      flatFeeAmount: agreement.flatFeeAmount || '',
      hybridFlatFee: agreement.hybridFlatFee || '',
      hybridHourlyRate: agreement.hybridHourlyRate || '',
      contingencyPercent: agreement.contingencyPercent || '',
      retainerDeposit: agreement.retainerDeposit || '',
      trustAccountDisclosure: !!agreement.trustAccountDisclosure,
      clientAcknowledgment: !!agreement.clientAcknowledgment,
      scopeLimitationsAcknowledged: !!agreement.scopeLimitationsAcknowledged,
      retainerStatus: agreement.retainerStatus || 'draft',
      amendments: agreement.amendments || '',
      natureOfMatter: agreement.natureOfMatter || '',
      paralegalId: agreement.paralegalId || DEFAULT_PARALEGAL_ID,
      templateName: agreement.templateName || '',
    });
    setEditingAgreement(agreement);
    setShowAddForm(true);
    setViewingAgreement(null);
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    if (!window.confirm('Permanently delete this retainer agreement? This cannot be undone.')) {
      return;
    }
    try {
      // Actually delete from CMS — the previous version only updated local
      // state, so deletions disappeared from the UI but reappeared on the
      // next reload because the row was still in retaineragreements.
      try {
        await BaseCrudService.delete('retaineragreements', id);
      } catch (cmsErr: any) {
        // BaseCrudService.delete may not exist on all SDK versions; fall
        // back to a soft-delete by marking status='terminated' so the row
        // stops counting against compliance / display.
        // eslint-disable-next-line no-console
        console.warn('Hard delete failed, falling back to soft-delete:', cmsErr);
        try {
          await BaseCrudService.update('retaineragreements', {
            _id: id,
            retainerStatus: 'terminated',
            documentUrl: '',
          } as any);
        } catch (softErr: any) {
          // eslint-disable-next-line no-console
          console.error('Soft-delete also failed:', softErr);
          throw new Error(`Could not delete: ${softErr?.message || cmsErr?.message || 'unknown error'}`);
        }
      }
      setAgreements(prev => prev.filter(a => a._id !== id));
      setViewingAgreement(null);
      setSaveSuccess('Retainer agreement deleted.');
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error('Error removing retainer agreement:', err);
      setSaveError(`Could not delete retainer: ${err?.message || 'Unknown error'}`);
    }
  };

  const getStatusConfig = (status: string) => RETAINER_STATUSES.find(s => s.value === status) || RETAINER_STATUSES[0];
  const getFeeLabel = (type: string) => FEE_ARRANGEMENT_TYPES.find(f => f.value === type)?.label || type;

  if (loading) {
    return <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /><span className="ml-2 text-sm text-gray-500">Loading retainer agreements...</span></div>;
  }

  // ---- VIEW DETAIL ----
  if (viewingAgreement) {
    const statusConfig = getStatusConfig(viewingAgreement.retainerStatus || 'draft');
    return (
      <div className="space-y-6">
        <button onClick={() => setViewingAgreement(null)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Agreements
        </button>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileCheck className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Retainer Agreement</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusConfig.color}`}>{statusConfig.label}</span>
                  {viewingAgreement.dateSigned && (
                    <span className="text-xs text-gray-400">Signed {new Date(viewingAgreement.dateSigned).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white" onClick={() => handleGenerateAndEmail(viewingAgreement)} disabled={generatingPDF}>
                {generatingPDF ? <><Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> Generating…</> : <><FileText className="w-3.5 h-3.5 mr-1" /> Generate &amp; Email</>}
              </Button>
              {viewingAgreement.documentUrl && (
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => openRetainerEmail(viewingAgreement)}>
                  <Mail className="w-3.5 h-3.5 mr-1" /> Email Existing
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={() => handleEdit(viewingAgreement)}>
                <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleDelete(viewingAgreement._id || '')}>
                <Trash2 className="w-3.5 h-3.5 mr-1" /> Remove
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Fee Arrangement</p>
              <p className="text-sm text-gray-800 font-medium">{getFeeLabel(viewingAgreement.feeArrangementType || '')}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                {viewingAgreement.feeArrangementType === 'hourly' ? 'Hourly Rate' :
                 viewingAgreement.feeArrangementType === 'flat_fee' ? 'Flat Fee' :
                 viewingAgreement.feeArrangementType === 'hybrid' ? 'Fee Details' :
                 viewingAgreement.feeArrangementType === 'contingency' ? 'Contingency %' : 'Fee Amount'}
              </p>
              <p className="text-sm text-gray-800 font-medium">
                {viewingAgreement.feeArrangementType === 'hourly' && viewingAgreement.hourlyRate ? `$${viewingAgreement.hourlyRate}/hr + HST` :
                 viewingAgreement.feeArrangementType === 'flat_fee' && viewingAgreement.flatFeeAmount ? `$${viewingAgreement.flatFeeAmount} + HST` :
                 viewingAgreement.feeArrangementType === 'hybrid' && viewingAgreement.hybridFlatFee ? `$${viewingAgreement.hybridFlatFee} flat + $${viewingAgreement.hybridHourlyRate}/hr + HST` :
                 viewingAgreement.feeArrangementType === 'contingency' && viewingAgreement.contingencyPercent ? `${viewingAgreement.contingencyPercent}% of recovery + HST` :
                 viewingAgreement.feeAmount || '—'}
              </p>
            </div>
            {viewingAgreement.retainerDeposit && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Retainer Deposit</p>
                <p className="text-sm text-gray-800 font-medium">${viewingAgreement.retainerDeposit} + HST</p>
              </div>
            )}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Trust Account Disclosure</p>
              <p className="text-sm text-gray-800 flex items-center gap-1.5">
                {viewingAgreement.trustAccountDisclosure
                  ? <><CheckCircle className="w-4 h-4 text-green-500" /> Yes — acknowledged</>
                  : <><AlertCircle className="w-4 h-4 text-amber-500" /> Not yet acknowledged</>}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Scope Limitations Acknowledged</p>
              <p className="text-sm text-gray-800 flex items-center gap-1.5">
                {viewingAgreement.scopeLimitationsAcknowledged
                  ? <><CheckCircle className="w-4 h-4 text-green-500" /> Yes</>
                  : <><AlertCircle className="w-4 h-4 text-amber-500" /> No</>}
              </p>
            </div>
          </div>

          {viewingAgreement.scopeOfServices && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-4">
              <p className="text-xs font-medium text-indigo-600 uppercase tracking-wider mb-1">Scope of Services</p>
              <p className="text-sm text-indigo-800 whitespace-pre-wrap">{viewingAgreement.scopeOfServices}</p>
            </div>
          )}

          {/* Document actions — view, download, print */}
          {viewingAgreement.documentUrl ? (() => {
            // Helpers — figure out what kind of URL we have so we can pick
            // the right extension and warn about dead blob: URLs (which
            // are session-scoped and useless after a reload).
            const url = viewingAgreement.documentUrl || '';
            const isHtml = url.startsWith('data:text/html');
            const isBlob = url.startsWith('blob:');
            const ext = isHtml ? 'html' : 'pdf';
            const safeClientName = (file.clientName || '').replace(/\s+/g, '-');
            const dlName = `Retainer-${file.fileNumber || 'agreement'}-${safeClientName}.${ext}`;
            const handleStaleBlobOrAct = (act: () => void) => {
              if (isBlob) {
                if (window.confirm(
                  'This retainer\'s document link is from a previous session and may not work. ' +
                  'Click OK to regenerate the retainer now (recommended), or Cancel to try the existing link anyway.'
                )) {
                  handleGenerateAndEmail(viewingAgreement);
                  return;
                }
              }
              act();
            };
            return (
            <div className={`${isBlob ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'} border rounded-lg p-4 mb-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs font-medium ${isBlob ? 'text-amber-600' : 'text-blue-600'} uppercase tracking-wider mb-1`}>
                    Retainer Document {isHtml && '(HTML)'}{isBlob && '— Session-only link, may be expired'}
                  </p>
                  <p className={`text-sm ${isBlob ? 'text-amber-800' : 'text-blue-800'}`}>
                    {isBlob
                      ? 'Generated this session — link will not survive page reload. Click Send or regenerate to persist.'
                      : `${ext.toUpperCase()} generated and available for review`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {/* View — rendered as a real <a> element so iOS/Android
                      browsers don't block it as a programmatic popup.
                      window.open() from a JS handler is blocked on mobile
                      unless the synchronous click context is preserved,
                      which doesn't survive a window.confirm. A regular
                      anchor link sidesteps the whole popup-blocker mess. */}
                  {isBlob ? (
                    <Button variant="outline" size="sm" title="View Document"
                      onClick={() => handleStaleBlobOrAct(() => window.open(url, '_blank'))}>
                      <Eye className="w-3.5 h-3.5 mr-1" /> View
                    </Button>
                  ) : (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View Document"
                      className="inline-flex items-center px-3 h-9 text-sm border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" /> View
                    </a>
                  )}

                  {/* Download — anchor with download attribute. Same mobile
                      reasoning as View; programmatic createElement('a') +
                      click() is fragile on iOS, a real anchor is solid. */}
                  {isBlob ? (
                    <Button variant="outline" size="sm" title="Download Document"
                      onClick={() => handleStaleBlobOrAct(() => {
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = dlName;
                        link.click();
                      })}>
                      <Download className="w-3.5 h-3.5 mr-1" /> Download
                    </Button>
                  ) : (
                    <a
                      href={url}
                      download={dlName}
                      title="Download Document"
                      className="inline-flex items-center px-3 h-9 text-sm border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 mr-1" /> Download
                    </a>
                  )}

                  {/* Print — opens the PDF directly in a new tab so the
                      browser's built-in PDF viewer takes over. We do NOT
                      try to call .print() from the parent: that worked
                      for blob URLs of small same-origin PDFs but
                      silently failed for cross-origin Wix Media CDN
                      URLs (the parent frame can't reach the embedded
                      pdfium viewer to dispatch its print action). The
                      user clicks Print from the PDF viewer's toolbar —
                      one extra click but it always works. For data:
                      URLs we convert to a blob first so the viewer
                      recognises the Content-Type immediately. */}
                  <Button variant="outline" size="sm" title="Print Document"
                    onClick={() => handleStaleBlobOrAct(async () => {
                      try {
                        if (url.startsWith('data:application/pdf')) {
                          const resp = await fetch(url);
                          const blob = await resp.blob();
                          const blobUrl = URL.createObjectURL(blob);
                          const w = window.open(blobUrl, '_blank');
                          if (!w) {
                            alert('Please allow pop-ups for this site to print documents.');
                            URL.revokeObjectURL(blobUrl);
                            return;
                          }
                          setTimeout(() => { try { w.print(); } catch { /* user clicks Print */ } }, 1500);
                          setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
                          return;
                        }
                        const w = window.open(url, '_blank', 'noopener,noreferrer');
                        if (!w) alert('Please allow pop-ups for this site to print documents.');
                      } catch (err) {
                        // eslint-disable-next-line no-console
                        console.error('Print failed:', err);
                        window.open(url, '_blank', 'noopener,noreferrer');
                      }
                    })}>
                    <Printer className="w-3.5 h-3.5 mr-1" /> Print
                  </Button>
                </div>
              </div>
            </div>
            );
          })() : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-500">No document generated yet. Click <strong>Generate &amp; Email</strong> above to create the retainer PDF.</p>
            </div>
          )}

          {viewingAgreement.amendments && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-xs font-medium text-amber-600 uppercase tracking-wider mb-1">Amendments / Notes</p>
              <p className="text-sm text-amber-800 whitespace-pre-wrap">{viewingAgreement.amendments}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ---- ADD / EDIT FORM ----
  if (showAddForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg font-bold text-gray-900">
            {editingAgreement ? 'Edit Retainer Agreement' : 'Create Retainer Agreement'}
          </h3>
          <button onClick={() => { setShowAddForm(false); setEditingAgreement(null); resetForm(); }} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Retainer Status</label>
              <select
                value={formData.retainerStatus}
                onChange={e => setFormData(p => ({ ...p, retainerStatus: e.target.value }))}
                className="w-full mt-1 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {RETAINER_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Date Signed</label>
              <Input type="date" value={formData.dateSigned} onChange={e => setFormData(p => ({ ...p, dateSigned: e.target.value }))} className="mt-1" />
            </div>
          </div>

          {/* Paralegal selector — drives the signature block on the generated retainer */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Generated by (paralegal) *</label>
            <select
              value={formData.paralegalId || DEFAULT_PARALEGAL_ID}
              onChange={e => setFormData(p => ({ ...p, paralegalId: e.target.value }))}
              className="w-full mt-1 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              {getActiveParalegals().map(pl => (
                <option key={pl.id} value={pl.id}>
                  {pl.displayName} (LSO #{pl.lsoNumber})
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              The signature block, LSO licence number, and credential line on the generated retainer come from this selection.
            </p>
          </div>

          {/* Nature of Matter — appears in a labelled box near the top of the retainer */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Nature of the Matter *</label>
            <textarea
              value={formData.natureOfMatter || ''}
              onChange={e => setFormData(p => ({ ...p, natureOfMatter: e.target.value }))}
              rows={4}
              placeholder="Describe the claim / charge / dispute in 2–4 sentences. This appears near the top of the retainer (e.g. 'Nature of the Charge', 'Nature of the Claim')."
              className="w-full mt-1 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <p className="text-xs text-gray-500 mt-1">
              The label is auto-selected from the file&rsquo;s matter type (Provincial Offences → &ldquo;Nature of the Charge&rdquo;, Small Claims → &ldquo;Nature of the Claim&rdquo;, etc.). Leave blank to print &ldquo;(To be provided by the Client.)&rdquo;.
            </p>
          </div>

          {/* Fee Arrangement Type — Card Selection */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">Select Retainer Type *</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {FEE_ARRANGEMENT_TYPES.map(f => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, feeArrangementType: f.value }))}
                  className={`text-left border-2 rounded-xl p-4 transition-all ${
                    formData.feeArrangementType === f.value
                      ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span className="block text-sm font-bold text-gray-900">{f.label}</span>
                  <span className="block text-xs text-gray-500 mt-0.5">{f.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Rate Fields Based on Selected Type */}
          {formData.feeArrangementType === 'hourly' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div>
                <label className="text-xs font-medium text-blue-700 uppercase tracking-wider">Hourly Rate ($) *</label>
                <Input type="number" min="0" step="0.01" value={formData.hourlyRate} onChange={e => setFormData(p => ({ ...p, hourlyRate: e.target.value, feeAmount: `$${e.target.value}/hr + HST` }))} placeholder="e.g. 150.00" className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-medium text-blue-700 uppercase tracking-wider">Retainer Deposit ($)</label>
                <Input type="number" min="0" step="0.01" value={formData.retainerDeposit} onChange={e => setFormData(p => ({ ...p, retainerDeposit: e.target.value }))} placeholder="e.g. 500.00" className="mt-1" />
              </div>
            </div>
          )}

          {formData.feeArrangementType === 'flat_fee' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div>
                <label className="text-xs font-medium text-emerald-700 uppercase tracking-wider">Flat Fee Amount ($) *</label>
                <Input type="number" min="0" step="0.01" value={formData.flatFeeAmount} onChange={e => setFormData(p => ({ ...p, flatFeeAmount: e.target.value, feeAmount: `$${e.target.value} flat + HST` }))} placeholder="e.g. 2500.00" className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-medium text-emerald-700 uppercase tracking-wider">Retainer Deposit ($)</label>
                <Input type="number" min="0" step="0.01" value={formData.retainerDeposit} onChange={e => setFormData(p => ({ ...p, retainerDeposit: e.target.value }))} placeholder="e.g. 500.00" className="mt-1" />
              </div>
            </div>
          )}

          {formData.feeArrangementType === 'hybrid' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-violet-50 border border-violet-200 rounded-lg">
              <div>
                <label className="text-xs font-medium text-violet-700 uppercase tracking-wider">Initial Flat Fee ($) *</label>
                <Input type="number" min="0" step="0.01" value={formData.hybridFlatFee} onChange={e => setFormData(p => ({ ...p, hybridFlatFee: e.target.value, feeAmount: `$${e.target.value} flat + $${p.hybridHourlyRate || '___'}/hr + HST` }))} placeholder="e.g. 1000.00" className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-medium text-violet-700 uppercase tracking-wider">Hourly Rate After ($) *</label>
                <Input type="number" min="0" step="0.01" value={formData.hybridHourlyRate} onChange={e => setFormData(p => ({ ...p, hybridHourlyRate: e.target.value, feeAmount: `$${p.hybridFlatFee || '___'} flat + $${e.target.value}/hr + HST` }))} placeholder="e.g. 125.00" className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-medium text-violet-700 uppercase tracking-wider">Retainer Deposit ($)</label>
                <Input type="number" min="0" step="0.01" value={formData.retainerDeposit} onChange={e => setFormData(p => ({ ...p, retainerDeposit: e.target.value }))} placeholder="e.g. 500.00" className="mt-1" />
              </div>
            </div>
          )}

          {formData.feeArrangementType === 'contingency' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div>
                <label className="text-xs font-medium text-amber-700 uppercase tracking-wider">Contingency Percentage (%) *</label>
                <Input type="number" min="0" max="100" step="0.5" value={formData.contingencyPercent} onChange={e => setFormData(p => ({ ...p, contingencyPercent: e.target.value, feeAmount: `${e.target.value}% contingency + HST` }))} placeholder="e.g. 25" className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-medium text-amber-700 uppercase tracking-wider">Retainer Deposit ($)</label>
                <Input type="number" min="0" step="0.01" value={formData.retainerDeposit} onChange={e => setFormData(p => ({ ...p, retainerDeposit: e.target.value }))} placeholder="e.g. 500.00" className="mt-1" />
              </div>
            </div>
          )}

          {!formData.feeArrangementType && (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
              <p className="text-sm text-gray-400">Select a retainer type above to enter rate details</p>
            </div>
          )}

          {/* ============================================================ */}
          {/* PAYMENT RECEIVED (LSO By-Law 9 / Form 9A trust ledger)        */}
          {/* When toggled on, the generated retainer renders a "Receipt   */}
          {/* of Funds" section and a matching financialrecords row is     */}
          {/* auto-written to keep the trust ledger in sync with the doc.  */}
          {/* ============================================================ */}
          <div className="p-4 border-2 border-emerald-200 bg-emerald-50/50 rounded-lg">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!!formData.paymentReceived}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, paymentReceived: e.target.checked }))
                }
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
              />
              <span className="text-sm font-semibold text-emerald-800">
                Was a payment received with this retainer?
              </span>
            </label>
            {formData.paymentReceived && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-emerald-700 uppercase tracking-wider">
                    Amount ($)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.paymentAmount || ''}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, paymentAmount: e.target.value }))
                    }
                    placeholder="e.g. 500.00"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-emerald-700 uppercase tracking-wider">
                    Method
                  </label>
                  <select
                    value={formData.paymentMethod || 'cash'}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, paymentMethod: e.target.value }))
                    }
                    className="w-full mt-1 text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                  >
                    <option value="cash">Cash</option>
                    <option value="cheque">Cheque</option>
                    <option value="etransfer">Interac e-Transfer</option>
                    <option value="credit_card">Credit card</option>
                    <option value="square">Credit card (Square)</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-emerald-700 uppercase tracking-wider">
                    Date received
                  </label>
                  <Input
                    type="date"
                    value={formData.paymentDate || ''}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, paymentDate: e.target.value }))
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-emerald-700 uppercase tracking-wider">
                    Received by (paralegal)
                  </label>
                  <Input
                    value={formData.paymentReceivedBy || ''}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, paymentReceivedBy: e.target.value }))
                    }
                    placeholder="e.g. Jean-Francois Demers"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-emerald-700 uppercase tracking-wider">
                    Purpose of payment
                  </label>
                  <Input
                    value={formData.paymentPurpose || ''}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, paymentPurpose: e.target.value }))
                    }
                    placeholder="e.g. Initial retainer deposit"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-emerald-700 uppercase tracking-wider">
                    Reference / receipt #
                  </label>
                  <Input
                    value={formData.paymentReference || ''}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, paymentReference: e.target.value }))
                    }
                    placeholder="Cheque #, e-transfer ref, etc."
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-medium text-emerald-700 uppercase tracking-wider">
                    Funds deposited into
                  </label>
                  <select
                    value={formData.paymentDeposit || 'trust'}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, paymentDeposit: e.target.value }))
                    }
                    className="w-full mt-1 text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                  >
                    <option value="trust">Trust account (LSO By-Law 9)</option>
                    <option value="general">General (firm operating) account</option>
                  </select>
                </div>
                <p className="md:col-span-2 text-xs text-emerald-700/80 italic">
                  A matching trust-ledger row will be auto-written to <code>financialrecords</code> when this retainer is generated.
                </p>
              </div>
            )}
          </div>

          {/* ============================================================ */}
          {/* PAYMENT ARRANGEMENT (going-forward schedule)                  */}
          {/* Renders a "Payment Arrangement" subsection in the generated  */}
          {/* retainer when enabled. Documents an instalment plan,         */}
          {/* deferred-payment terms, or any non-default payment schedule. */}
          {/* Distinct from "Payment Received" above — that's the receipt  */}
          {/* of funds at signing; this is the schedule going forward.    */}
          {/* ============================================================ */}
          <div className="p-4 border-2 border-indigo-200 bg-indigo-50/50 rounded-lg">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!!formData.paymentArrangementEnabled}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    paymentArrangementEnabled: e.target.checked,
                  }))
                }
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <span className="text-sm font-semibold text-indigo-800">
                Is there a payment arrangement / schedule?
              </span>
            </label>
            {formData.paymentArrangementEnabled && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-indigo-700 uppercase tracking-wider">
                    Arrangement type
                  </label>
                  <select
                    value={formData.paymentArrangementType || 'full'}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        paymentArrangementType: e.target.value,
                      }))
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
                  <label className="text-xs font-medium text-indigo-700 uppercase tracking-wider">
                    Total amount expected ($)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.paymentArrangementTotal || ''}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        paymentArrangementTotal: e.target.value,
                      }))
                    }
                    placeholder="e.g. 2500.00"
                    className="mt-1"
                  />
                </div>
                {formData.paymentArrangementType === 'installments' && (
                  <>
                    <div>
                      <label className="text-xs font-medium text-indigo-700 uppercase tracking-wider">
                        Instalment amount ($)
                      </label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.paymentInstallmentAmount || ''}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            paymentInstallmentAmount: e.target.value,
                          }))
                        }
                        placeholder="e.g. 500.00"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-indigo-700 uppercase tracking-wider">
                        Frequency
                      </label>
                      <select
                        value={formData.paymentInstallmentFrequency || 'monthly'}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            paymentInstallmentFrequency: e.target.value,
                          }))
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
                      <label className="text-xs font-medium text-indigo-700 uppercase tracking-wider">
                        First instalment due
                      </label>
                      <Input
                        type="date"
                        value={formData.paymentInstallmentStartDate || ''}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            paymentInstallmentStartDate: e.target.value,
                          }))
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-indigo-700 uppercase tracking-wider">
                        Number of instalments
                      </label>
                      <Input
                        type="number"
                        min="1"
                        step="1"
                        value={formData.paymentInstallmentCount || ''}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            paymentInstallmentCount: e.target.value,
                          }))
                        }
                        placeholder="e.g. 5"
                        className="mt-1"
                      />
                    </div>
                  </>
                )}
                <div className="md:col-span-2">
                  <label className="text-xs font-medium text-indigo-700 uppercase tracking-wider">
                    Additional terms / notes
                  </label>
                  <textarea
                    value={formData.paymentArrangementNotes || ''}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        paymentArrangementNotes: e.target.value,
                      }))
                    }
                    placeholder="Late fee policy, missed-payment consequences, conditions, etc."
                    rows={3}
                    className="w-full mt-1 text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
                  />
                </div>
                <p className="md:col-span-2 text-xs text-indigo-700/80 italic">
                  Renders a &ldquo;Payment Arrangement&rdquo; subsection in Section 5 of the retainer when enabled.
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Scope of Services *</label>
            <textarea
              value={formData.scopeOfServices}
              onChange={e => setFormData(p => ({ ...p, scopeOfServices: e.target.value }))}
              className="w-full mt-1 text-sm border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              rows={3}
              placeholder="Describe the scope of paralegal services covered by this retainer..."
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Document URL</label>
            <Input value={formData.documentUrl} onChange={e => setFormData(p => ({ ...p, documentUrl: e.target.value }))} placeholder="Link to uploaded retainer document" className="mt-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <input type="checkbox" checked={!!formData.trustAccountDisclosure} onChange={e => setFormData(p => ({ ...p, trustAccountDisclosure: e.target.checked }))} className="rounded border-gray-300 text-primary focus:ring-primary" />
              <span className="text-sm text-gray-700">Trust Account Disclosure</span>
            </label>
            <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <input type="checkbox" checked={!!formData.clientAcknowledgment} onChange={e => setFormData(p => ({ ...p, clientAcknowledgment: e.target.checked }))} className="rounded border-gray-300 text-primary focus:ring-primary" />
              <span className="text-sm text-gray-700">Client Acknowledgment</span>
            </label>
            <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <input type="checkbox" checked={!!formData.scopeLimitationsAcknowledged} onChange={e => setFormData(p => ({ ...p, scopeLimitationsAcknowledged: e.target.checked }))} className="rounded border-gray-300 text-primary focus:ring-primary" />
              <span className="text-sm text-gray-700">Scope Limitations Acknowledged</span>
            </label>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Amendments / Notes</label>
            <textarea
              value={formData.amendments}
              onChange={e => setFormData(p => ({ ...p, amendments: e.target.value }))}
              className="w-full mt-1 text-sm border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              rows={2}
              placeholder="Any amendments or notes..."
            />
          </div>
        </div>

        {saveError && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">{saveError}</div>}

        <div className="flex gap-3 pt-2">
          <Button onClick={handleSave} disabled={saving || !formData.scopeOfServices?.trim()} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            {saving ? <><Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> Saving...</> : <><Save className="w-4 h-4 mr-1.5" /> {editingAgreement ? 'Update Agreement' : 'Save Agreement'}</>}
          </Button>
          <Button variant="outline" onClick={() => { setShowAddForm(false); setEditingAgreement(null); resetForm(); }}>Cancel</Button>
        </div>
      </div>
    );
  }

  // ---- LIST VIEW ----
  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
        <p className="text-xs text-indigo-700">
          <strong>Paralegal Rules of Conduct, Rule 3.02:</strong> Provide written confirmation of retainer,
          scope of services, fee arrangement, and trust account disclosure before commencing work.
        </p>
      </div>

      {saveSuccess && <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700 flex items-center gap-2"><CheckCircle className="w-4 h-4" /> {saveSuccess}</div>}

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{agreements.length} retainer agreement{agreements.length !== 1 ? 's' : ''} on file</p>
        <Button size="sm" onClick={() => { resetForm(); setEditingAgreement(null); setShowAddForm(true); }} className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="w-4 h-4 mr-1.5" /> Create Retainer
        </Button>
      </div>

      {agreements.length === 0 ? (
        <EmptySection
          message="No retainer agreement on file. Required before commencing work."
          actionLabel="Create Retainer"
          onAction={() => { resetForm(); setEditingAgreement(null); setShowAddForm(true); }}
        />
      ) : (
        <div className="space-y-3">
          {agreements.map((agreement) => {
            const statusConfig = getStatusConfig(agreement.retainerStatus || 'draft');
            return (
              <div key={agreement._id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileCheck className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {getFeeLabel(agreement.feeArrangementType || '')} — {agreement.feeAmount || 'No amount set'}
                        </p>
                        <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${statusConfig.color}`}>{statusConfig.label}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">
                        {agreement.scopeOfServices?.substring(0, 80)}{(agreement.scopeOfServices?.length || 0) > 80 ? '...' : ''}
                        {agreement.dateSigned && <> · Signed {new Date(agreement.dateSigned).toLocaleDateString('en-CA')}</>}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-3">
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-white" onClick={() => handleGenerateAndEmail(agreement)} disabled={generatingPDF}>
                      {generatingPDF ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <><Mail className="w-3.5 h-3.5 mr-1" /> Send</>}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setViewingAgreement(agreement)}>
                      <Eye className="w-3.5 h-3.5 mr-1" /> View
                    </Button>
                    {agreement.documentUrl && (
                      <Button variant="outline" size="sm" title="Download" onClick={() => {
                        const url = agreement.documentUrl || '';
                        // Detect URL kind so we can pick the right extension.
                        // - data:application/pdf  → .pdf
                        // - data:text/html         → .html
                        // - blob:                  → only valid this session
                        // - https:                 → trust the URL
                        let ext = 'pdf';
                        if (url.startsWith('data:text/html')) ext = 'html';
                        else if (url.startsWith('data:application/pdf')) ext = 'pdf';

                        // blob: URLs from a previous session are dead. Warn
                        // and offer to regenerate.
                        if (url.startsWith('blob:')) {
                          if (window.confirm(
                            'This retainer\'s document link is from a previous session and may not work. ' +
                            'Click OK to regenerate the retainer now (recommended), or Cancel to try the existing link anyway.'
                          )) {
                            handleGenerateAndEmail(agreement);
                            return;
                          }
                        }

                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `Retainer-${file.fileNumber || 'agreement'}.${ext}`;
                        link.click();
                      }}>
                        <Download className="w-3.5 h-3.5" />
                      </Button>
                    )}
                    <Button variant="outline" size="sm" title="Edit" onClick={() => handleEdit(agreement)}>
                      <Edit3 className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      title="Delete retainer"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => handleDelete(agreement._id || '')}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    {agreement.trustAccountDisclosure ? <CheckCircle className="w-3.5 h-3.5 text-green-500" /> : <AlertCircle className="w-3.5 h-3.5 text-gray-300" />} Trust Disclosure
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    {agreement.clientAcknowledgment ? <CheckCircle className="w-3.5 h-3.5 text-green-500" /> : <AlertCircle className="w-3.5 h-3.5 text-gray-300" />} Client Ack.
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    {agreement.scopeLimitationsAcknowledged ? <CheckCircle className="w-3.5 h-3.5 text-green-500" /> : <AlertCircle className="w-3.5 h-3.5 text-gray-300" />} Scope Limits
                  </span>
                  {agreement.documentUrl && (
                    <span className="text-xs text-indigo-600 flex items-center gap-1 ml-auto">
                      <FileText className="w-3.5 h-3.5" /> Document attached
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Email Retainer Dialog */}
      <EmailDocumentDialog
        document={retainerAsDocument(emailingAgreement)}
        isOpen={isEmailDialogOpen}
        onClose={() => { setIsEmailDialogOpen(false); setEmailingAgreement(null); }}
        onSend={handleEmailRetainer}
        paralegalName={file.assignedParalegalName || 'Legal Assist Paralegal Services'}
        clientName={file.clientName || ''}
      />
    </div>
  );
}

// ============================================================
// SECTION G: Financial Records
// ============================================================

const TRANSACTION_TYPES = [
  { value: 'trust_deposit', label: 'Trust Deposit', color: 'bg-green-100 text-green-800', sign: '+' },
  { value: 'trust_withdrawal', label: 'Trust Withdrawal', color: 'bg-red-100 text-red-800', sign: '-' },
  { value: 'billing', label: 'Fee / Billing', color: 'bg-blue-100 text-blue-800', sign: '+' },
  { value: 'payment', label: 'Client Payment', color: 'bg-emerald-100 text-emerald-800', sign: '+' },
  { value: 'disbursement', label: 'Disbursement', color: 'bg-orange-100 text-orange-800', sign: '-' },
  { value: 'refund', label: 'Refund', color: 'bg-purple-100 text-purple-800', sign: '-' },
  { value: 'transfer', label: 'Trust-to-General Transfer', color: 'bg-amber-100 text-amber-800', sign: '~' },
];

const PAYMENT_METHODS = [
  { value: 'etransfer', label: 'e-Transfer' },
  { value: 'cheque', label: 'Cheque' },
  { value: 'cash', label: 'Cash' },
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'debit', label: 'Debit' },
  { value: 'wire', label: 'Wire Transfer' },
  { value: 'trust_cheque', label: 'Trust Cheque' },
];

interface FinancialEntry {
  _id?: string;
  transactionType: string;
  amount: string;
  transactionDate: string;
  description: string;
  referenceNumber: string;
  paymentMethod: string;
  invoiceNumber: string;
  recordedBy: string;
  receiptFileName: string;
}

const EMPTY_FINANCIAL_ENTRY: FinancialEntry = {
  transactionType: '',
  amount: '',
  transactionDate: new Date().toISOString().split('T')[0],
  description: '',
  referenceNumber: '',
  paymentMethod: '',
  invoiceNumber: '',
  recordedBy: '',
  receiptFileName: '',
};

function SectionFinancialRecords({ file }: SectionEditProps) {
  const [records, setRecords] = useState<FinancialEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState<FinancialEntry>(EMPTY_FINANCIAL_ENTRY);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editEntry, setEditEntry] = useState<FinancialEntry>(EMPTY_FINANCIAL_ENTRY);
  const [viewingRecord, setViewingRecord] = useState<FinancialEntry | null>(null);
  const [saveError, setSaveError] = useState<string>('');
  const [saveSuccess, setSaveSuccess] = useState<string>('');

  useEffect(() => {
    loadRecords();
  }, [file._id]);

  // Auto-clear messages
  useEffect(() => {
    if (saveSuccess) { const t = setTimeout(() => setSaveSuccess(''), 4000); return () => clearTimeout(t); }
  }, [saveSuccess]);
  useEffect(() => {
    if (saveError) { const t = setTimeout(() => setSaveError(''), 6000); return () => clearTimeout(t); }
  }, [saveError]);

  const loadRecords = async () => {
    try {
      const result = await BaseCrudService.getAll<any>('financialrecords');
      const fileRecords = result.items
        .filter((r: any) => r.fileId === file._id)
        .map((r: any) => ({
          _id: r._id,
          transactionType: r.transactionType || '',
          amount: r.amount?.toString() || '',
          transactionDate: r.transactionDate ? new Date(r.transactionDate).toISOString().split('T')[0] : '',
          description: r.description || '',
          referenceNumber: r.referenceNumber || '',
          paymentMethod: r.paymentMethod || '',
          invoiceNumber: r.invoiceNumber || '',
          recordedBy: r.recordedBy || '',
          receiptFileName: r.receiptFileName || '',
        }))
        .sort((a: FinancialEntry, b: FinancialEntry) => (b.transactionDate || '').localeCompare(a.transactionDate || ''));
      setRecords(fileRecords);
    } catch (error) {
      console.error('Error loading financial records:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecord = async () => {
    if (!newEntry.transactionType || !newEntry.amount) return;
    setSaveError('');
    setSaveSuccess('');
    setSubmitting(true);
    try {
      const created = await BaseCrudService.create('financialrecords', {
        clientId: file.clientId,
        fileId: file._id,
        transactionType: newEntry.transactionType,
        amount: parseFloat(newEntry.amount),
        transactionDate: newEntry.transactionDate,
        description: newEntry.description,
        referenceNumber: newEntry.referenceNumber,
        paymentMethod: newEntry.paymentMethod,
        invoiceNumber: newEntry.invoiceNumber,
        recordedBy: newEntry.recordedBy,
        receiptFileName: newEntry.receiptFileName,
      });
      // Add locally immediately so user sees it without waiting for reload
      const savedEntry: FinancialEntry = {
        ...newEntry,
        _id: created?._id || `local-${Date.now()}`,
      };
      setRecords(prev => [savedEntry, ...prev]);
      setNewEntry(EMPTY_FINANCIAL_ENTRY);
      setShowAddForm(false);
      setSaveSuccess('Transaction saved successfully.');
    } catch (error: any) {
      console.error('Error adding record:', error);
      setSaveError(`Failed to save transaction: ${error?.message || 'Please try again.'}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateRecord = async (id: string) => {
    setSaveError('');
    setSaveSuccess('');
    setSubmitting(true);
    try {
      await BaseCrudService.update('financialrecords', {
        _id: id,
        transactionType: editEntry.transactionType,
        amount: parseFloat(editEntry.amount),
        transactionDate: editEntry.transactionDate,
        description: editEntry.description,
        referenceNumber: editEntry.referenceNumber,
        paymentMethod: editEntry.paymentMethod,
        invoiceNumber: editEntry.invoiceNumber,
        recordedBy: editEntry.recordedBy,
        receiptFileName: editEntry.receiptFileName,
      } as any);
      // Update local state immediately
      setRecords(prev => prev.map(r => r._id === id ? { ...editEntry, _id: id } : r));
      setEditingId(null);
      setSaveSuccess('Transaction updated successfully.');
    } catch (error: any) {
      console.error('Error updating record:', error);
      setSaveError(`Failed to update transaction: ${error?.message || 'Please try again.'}`);
    } finally {
      setSubmitting(false);
    }
  };

  const trustBalance = records.reduce((sum, r) => {
    const amt = parseFloat(r.amount) || 0;
    if (r.transactionType === 'trust_deposit') return sum + amt;
    if (r.transactionType === 'trust_withdrawal' || r.transactionType === 'transfer') return sum - amt;
    return sum;
  }, 0);

  const totalBilled = records.filter(r => r.transactionType === 'billing').reduce((s, r) => s + (parseFloat(r.amount) || 0), 0);
  const totalPaid = records.filter(r => r.transactionType === 'payment').reduce((s, r) => s + (parseFloat(r.amount) || 0), 0);
  const totalDisbursements = records.filter(r => r.transactionType === 'disbursement').reduce((s, r) => s + (parseFloat(r.amount) || 0), 0);

  const canSave = (entry: FinancialEntry) => !!(entry.transactionType && entry.amount && parseFloat(entry.amount) > 0);

  const renderEntryForm = (entry: FinancialEntry, setEntry: (e: FinancialEntry) => void, onSave: () => void, onCancel: () => void, isEdit?: boolean) => (
    <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h4 className="font-heading text-sm font-bold text-gray-800">{isEdit ? 'Edit Transaction' : 'New Transaction'}</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Transaction Type <span className="text-red-500">*</span></label>
          <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white" value={entry.transactionType} onChange={e => setEntry({ ...entry, transactionType: e.target.value })}>
            <option value="">Select type...</option>
            {TRANSACTION_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Amount (CA$) <span className="text-red-500">*</span></label>
          <Input type="number" step="0.01" min="0.01" value={entry.amount} onChange={e => setEntry({ ...entry, amount: e.target.value })} placeholder="0.00" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
          <Input type="date" value={entry.transactionDate} onChange={e => setEntry({ ...entry, transactionDate: e.target.value })} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Payment Method</label>
          <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white" value={entry.paymentMethod} onChange={e => setEntry({ ...entry, paymentMethod: e.target.value })}>
            <option value="">Select...</option>
            {PAYMENT_METHODS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Reference / Cheque #</label>
          <Input value={entry.referenceNumber} onChange={e => setEntry({ ...entry, referenceNumber: e.target.value })} placeholder="e.g. CHQ-4501" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Invoice #</label>
          <Input value={entry.invoiceNumber} onChange={e => setEntry({ ...entry, invoiceNumber: e.target.value })} placeholder="e.g. INV-2026-045" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
          <textarea className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[60px]" value={entry.description} onChange={e => setEntry({ ...entry, description: e.target.value })} placeholder="Brief description of the transaction" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Recorded By</label>
          <Input value={entry.recordedBy} onChange={e => setEntry({ ...entry, recordedBy: e.target.value })} placeholder="Paralegal name" />
          <div className="mt-2">
            <label className="block text-xs font-medium text-gray-600 mb-1">Receipt / Document</label>
            {entry.receiptFileName ? (
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs text-gray-700">{entry.receiptFileName}</span>
                <button onClick={() => setEntry({ ...entry, receiptFileName: '' })} className="text-gray-400 hover:text-red-500"><X className="w-3 h-3" /></button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setEntry({ ...entry, receiptFileName: `receipt-${file.fileNumber}-${Date.now()}.pdf` })}>
                <Upload className="w-3 h-3 mr-1" /> Upload
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Validation hint */}
      {!canSave(entry) && (
        <p className="text-xs text-amber-600 bg-amber-50 rounded px-3 py-1.5">
          Select a transaction type and enter an amount greater than $0.00 to save.
        </p>
      )}

      <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
        <Button variant="outline" size="sm" onClick={onCancel}>Cancel</Button>
        <Button
          size="sm"
          disabled={!canSave(entry) || submitting}
          onClick={onSave}
          className={`text-white ${canSave(entry) && !submitting ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'}`}
        >
          {submitting ? <><Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> Saving...</> : <><Save className="w-3.5 h-3.5 mr-1" /> {isEdit ? 'Update Transaction' : 'Save Transaction'}</>}
        </Button>
      </div>
    </div>
  );

  if (loading) {
    return <div className="flex items-center justify-center p-8 text-foreground/50"><Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading financial records...</div>;
  }

  // ---- VIEW TRANSACTION / RECEIPT ----
  if (viewingRecord) {
    const txType = TRANSACTION_TYPES.find(t => t.value === viewingRecord.transactionType);
    const pmMethod = PAYMENT_METHODS.find(m => m.value === viewingRecord.paymentMethod);
    return (
      <div className="space-y-6">
        <button onClick={() => setViewingRecord(null)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Transactions
        </button>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          {/* Receipt Header */}
          <div className={`px-6 py-5 ${txType?.color?.replace('text-', 'text-').replace('bg-', 'bg-') || 'bg-gray-100'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium opacity-80 uppercase tracking-wider">Transaction Receipt</p>
                <h3 className="text-lg font-bold mt-1">{txType?.label || viewingRecord.transactionType}</h3>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">
                  {txType?.sign === '-' ? '−' : txType?.sign === '+' ? '+' : ''} CA${parseFloat(viewingRecord.amount).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Receipt Body */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Date</p>
                  <p className="text-sm text-gray-800 mt-0.5">
                    {viewingRecord.transactionDate ? new Date(viewingRecord.transactionDate).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'}
                  </p>
                </div>
                {pmMethod && (
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Payment Method</p>
                    <p className="text-sm text-gray-800 mt-0.5">{pmMethod.label}</p>
                  </div>
                )}
                {viewingRecord.referenceNumber && (
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Reference / Cheque #</p>
                    <p className="text-sm text-gray-800 mt-0.5 font-mono">{viewingRecord.referenceNumber}</p>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                {viewingRecord.invoiceNumber && (
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Invoice #</p>
                    <p className="text-sm text-gray-800 mt-0.5 font-mono">{viewingRecord.invoiceNumber}</p>
                  </div>
                )}
                {viewingRecord.recordedBy && (
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Recorded By</p>
                    <p className="text-sm text-gray-800 mt-0.5">{viewingRecord.recordedBy}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">File</p>
                  <p className="text-sm text-gray-800 mt-0.5 font-mono">{file.fileNumber} — {file.clientName}</p>
                </div>
              </div>
            </div>

            {viewingRecord.description && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Description</p>
                <p className="text-sm text-gray-800">{viewingRecord.description}</p>
              </div>
            )}

            {viewingRecord.receiptFileName && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-blue-600 uppercase tracking-wider">Attached Receipt</p>
                  <p className="text-sm text-blue-800">{viewingRecord.receiptFileName}</p>
                </div>
              </div>
            )}
          </div>

          {/* Receipt Actions */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => {
              setEditEntry(viewingRecord);
              setEditingId(viewingRecord._id || null);
              setViewingRecord(null);
            }}>
              <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit Transaction
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-100 rounded-lg p-4">
        <p className="text-xs text-green-700">
          <strong>By-Law 9 & Forms 9A-9E:</strong> Maintain complete financial records including trust account
          transactions, billing records, disbursements, and payment receipts.
        </p>
      </div>

      {/* Save feedback messages */}
      {saveSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
          <p className="text-sm text-green-700">{saveSuccess}</p>
        </div>
      )}
      {saveError && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">{saveError}</p>
        </div>
      )}

      {/* Financial Summary */}
      {records.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 bg-blue-50 rounded-lg text-center">
            <p className="text-xs text-blue-600 font-medium">Trust Balance</p>
            <p className={`text-lg font-bold ${trustBalance >= 0 ? 'text-blue-800' : 'text-red-700'}`}>
              ${trustBalance.toFixed(2)}
            </p>
          </div>
          <div className="p-3 bg-amber-50 rounded-lg text-center">
            <p className="text-xs text-amber-600 font-medium">Total Billed</p>
            <p className="text-lg font-bold text-amber-800">${totalBilled.toFixed(2)}</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg text-center">
            <p className="text-xs text-green-600 font-medium">Total Paid</p>
            <p className="text-lg font-bold text-green-800">${totalPaid.toFixed(2)}</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg text-center">
            <p className="text-xs text-orange-600 font-medium">Disbursements</p>
            <p className="text-lg font-bold text-orange-800">${totalDisbursements.toFixed(2)}</p>
          </div>
        </div>
      )}

      {/* Add Transaction Button */}
      {!showAddForm && !editingId && (
        <Button variant="outline" size="sm" onClick={() => { setShowAddForm(true); setSaveError(''); }} className="w-full">
          <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Transaction
        </Button>
      )}

      {/* Add Form */}
      {showAddForm && renderEntryForm(newEntry, setNewEntry, handleAddRecord, () => { setShowAddForm(false); setNewEntry(EMPTY_FINANCIAL_ENTRY); setSaveError(''); })}

      {/* Transaction List */}
      {records.length > 0 ? (
        <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-100">
          <div className="bg-gray-50 px-4 py-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Transaction History</span>
            <span className="text-xs text-gray-400">{records.length} record{records.length !== 1 ? 's' : ''}</span>
          </div>
          {records.map((record) => (
            <div key={record._id || `rec-${record.referenceNumber}-${record.transactionDate}`}>
              {editingId === record._id ? (
                <div className="p-3">
                  {renderEntryForm(editEntry, setEditEntry, () => handleUpdateRecord(record._id!), () => { setEditingId(null); setSaveError(''); }, true)}
                </div>
              ) : (
                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors group">
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setViewingRecord(record)}>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${TRANSACTION_TYPES.find(t => t.value === record.transactionType)?.color || 'bg-gray-100 text-gray-700'}`}>
                        {TRANSACTION_TYPES.find(t => t.value === record.transactionType)?.label || record.transactionType}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {TRANSACTION_TYPES.find(t => t.value === record.transactionType)?.sign === '-' ? '−' : ''} CA${parseFloat(record.amount).toFixed(2)}
                      </span>
                      {record.paymentMethod && (
                        <span className="text-xs text-gray-400">{PAYMENT_METHODS.find(m => m.value === record.paymentMethod)?.label}</span>
                      )}
                    </div>
                    {record.description && <p className="text-xs text-gray-500 mt-0.5 truncate">{record.description}</p>}
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {record.transactionDate}</span>
                      {record.referenceNumber && <span>Ref: {record.referenceNumber}</span>}
                      {record.invoiceNumber && <span>Inv: {record.invoiceNumber}</span>}
                      {record.recordedBy && <span>By: {record.recordedBy}</span>}
                    </div>
                  </div>
                  <div className="flex gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                    <Button variant="outline" size="sm" onClick={() => setViewingRecord(record)} title="View receipt">
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => { setEditingId(record._id || null); setEditEntry(record); setSaveError(''); }} title="Edit transaction">
                      <Edit3 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : !showAddForm ? (
        <EmptySection message="No financial records logged for this file yet." actionLabel="Add Transaction" onAction={() => setShowAddForm(true)} />
      ) : null}
    </div>
  );
}

// ============================================================
// SECTION H: Communication Log
// ============================================================

const COMM_TYPES = [
  { value: 'phone_inbound', label: 'Phone — Inbound', icon: 'phone', direction: 'inbound' },
  { value: 'phone_outbound', label: 'Phone — Outbound', icon: 'phone', direction: 'outbound' },
  { value: 'in_person', label: 'In-Person Meeting', icon: 'meeting', direction: 'both' },
  { value: 'video_call', label: 'Video Call', icon: 'meeting', direction: 'both' },
  { value: 'email_inbound', label: 'Email — Received', icon: 'email', direction: 'inbound' },
  { value: 'email_outbound', label: 'Email — Sent', icon: 'email', direction: 'outbound' },
  { value: 'portal_message', label: 'Portal Message', icon: 'message', direction: 'inbound' },
  { value: 'letter_inbound', label: 'Letter — Received', icon: 'letter', direction: 'inbound' },
  { value: 'letter_outbound', label: 'Letter — Sent', icon: 'letter', direction: 'outbound' },
  { value: 'court_appearance', label: 'Court Appearance', icon: 'court', direction: 'both' },
  { value: 'tribunal_hearing', label: 'Tribunal Hearing', icon: 'court', direction: 'both' },
];

interface CommEntry {
  _id?: string;
  communicationType: string;
  communicationDate: string;
  communicationTime: string;
  durationMinutes: string;
  summary: string;
  details: string;
  author: string;
  direction: string;
  billable: boolean;
  billedToFinancials: boolean;
  hourlyRate: string;
}

const EMPTY_COMM_ENTRY: CommEntry = {
  communicationType: '',
  communicationDate: new Date().toISOString().split('T')[0],
  communicationTime: new Date().toTimeString().slice(0, 5),
  durationMinutes: '',
  summary: '',
  details: '',
  author: '',
  direction: 'outbound',
  billable: true,
  billedToFinancials: false,
  hourlyRate: '150',
};

function SectionCommunicationLog({ file, editing, editValues, onChange }: SectionEditProps) {
  const [entries, setEntries] = useState<CommEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState<CommEntry>(EMPTY_COMM_ENTRY);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editEntry, setEditEntry] = useState<CommEntry>(EMPTY_COMM_ENTRY);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    loadEntries();
  }, [file._id]);

  const loadEntries = async () => {
    try {
      const result = await BaseCrudService.getAll<any>('communicationlog');
      const fileEntries = result.items
        .filter((r: any) => r.fileId === file._id)
        .map((r: any) => {
          const dateStr = r.communicationDate ? new Date(r.communicationDate).toISOString() : '';
          return {
            _id: r._id,
            communicationType: r.communicationType || '',
            communicationDate: dateStr ? dateStr.split('T')[0] : '',
            communicationTime: dateStr ? dateStr.split('T')[1]?.slice(0, 5) || '' : '',
            durationMinutes: r.details?.match(/Duration: (\d+)/)?.[1] || '',
            summary: r.summary || '',
            details: r.details || '',
            author: r.author || '',
            direction: r.direction || 'outbound',
            billable: r.details?.includes('[BILLABLE]') || false,
            billedToFinancials: r.details?.includes('[BILLED]') || false,
            hourlyRate: r.details?.match(/Rate: \$(\d+)/)?.[1] || '150',
          };
        })
        .sort((a: CommEntry, b: CommEntry) => {
          const dateA = `${b.communicationDate}T${b.communicationTime}`;
          const dateB = `${a.communicationDate}T${a.communicationTime}`;
          return dateA.localeCompare(dateB);
        });
      setEntries(fileEntries);
    } catch (error) {
      console.error('Error loading communication log:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEntry = async () => {
    if (!newEntry.communicationType || !newEntry.summary) return;
    setSubmitting(true);
    try {
      const commType = COMM_TYPES.find(t => t.value === newEntry.communicationType);
      const detailsMeta = [
        newEntry.details,
        newEntry.durationMinutes ? `Duration: ${newEntry.durationMinutes} min` : '',
        newEntry.billable ? `[BILLABLE] Rate: $${newEntry.hourlyRate}/hr` : '',
        newEntry.billedToFinancials ? '[BILLED]' : '',
      ].filter(Boolean).join(' | ');

      await BaseCrudService.create('communicationlog', {
        clientId: file.clientId,
        fileId: file._id,
        communicationType: newEntry.communicationType,
        communicationDate: `${newEntry.communicationDate}T${newEntry.communicationTime || '00:00'}:00`,
        summary: newEntry.summary,
        details: detailsMeta,
        author: newEntry.author,
        direction: commType?.direction === 'both' ? 'both' : newEntry.direction,
      });

      // If billable and marked to add to financials, create a billing entry
      if (newEntry.billable && newEntry.billedToFinancials && newEntry.durationMinutes) {
        const hours = parseFloat(newEntry.durationMinutes) / 60;
        const rate = parseFloat(newEntry.hourlyRate) || 150;
        const amount = hours * rate;
        await BaseCrudService.create('financialrecords', {
          clientId: file.clientId,
          fileId: file._id,
          transactionType: 'billing',
          amount: Math.round(amount * 100) / 100,
          transactionDate: newEntry.communicationDate,
          description: `Time entry: ${newEntry.summary} (${newEntry.durationMinutes} min @ $${rate}/hr)`,
          recordedBy: newEntry.author,
        });
      }

      await loadEntries();
      setNewEntry(EMPTY_COMM_ENTRY);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding communication:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateEntry = async (id: string) => {
    setSubmitting(true);
    try {
      const commType = COMM_TYPES.find(t => t.value === editEntry.communicationType);
      const detailsMeta = [
        editEntry.details,
        editEntry.durationMinutes ? `Duration: ${editEntry.durationMinutes} min` : '',
        editEntry.billable ? `[BILLABLE] Rate: $${editEntry.hourlyRate}/hr` : '',
        editEntry.billedToFinancials ? '[BILLED]' : '',
      ].filter(Boolean).join(' | ');

      await BaseCrudService.update('communicationlog', {
        _id: id,
        communicationType: editEntry.communicationType,
        communicationDate: `${editEntry.communicationDate}T${editEntry.communicationTime || '00:00'}:00`,
        summary: editEntry.summary,
        details: detailsMeta,
        author: editEntry.author,
        direction: commType?.direction === 'both' ? 'both' : editEntry.direction,
      } as any);

      setEditingId(null);
      await loadEntries();
    } catch (error) {
      console.error('Error updating communication:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const totalBillableMinutes = entries.filter(e => e.billable).reduce((sum, e) => sum + (parseInt(e.durationMinutes) || 0), 0);
  const totalBillableHours = totalBillableMinutes / 60;

  const filteredEntries = filter === 'all' ? entries
    : filter === 'billable' ? entries.filter(e => e.billable)
    : entries.filter(e => e.communicationType.startsWith(filter));

  const getCommIcon = (type: string) => {
    const ct = COMM_TYPES.find(t => t.value === type);
    if (ct?.icon === 'phone') return Phone;
    if (ct?.icon === 'email') return Mail;
    if (ct?.icon === 'meeting') return User;
    if (ct?.icon === 'court') return Scale;
    if (ct?.icon === 'letter') return FileText;
    return MessageCircle;
  };

  const renderCommForm = (entry: CommEntry, setEntry: (e: CommEntry) => void, onSave: () => void, onCancel: () => void) => (
    <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Communication Type <span className="text-red-500">*</span></label>
          <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white" value={entry.communicationType} onChange={e => setEntry({ ...entry, communicationType: e.target.value })}>
            <option value="">Select...</option>
            {COMM_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Paralegal / Author <span className="text-red-500">*</span></label>
          <Input value={entry.author} onChange={e => setEntry({ ...entry, author: e.target.value })} placeholder="e.g. Johnny Demers" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Date <span className="text-red-500">*</span></label>
          <Input type="date" value={entry.communicationDate} onChange={e => setEntry({ ...entry, communicationDate: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Time</label>
          <Input type="time" value={entry.communicationTime} onChange={e => setEntry({ ...entry, communicationTime: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Duration (minutes)</label>
          <Input type="number" min="0" step="5" value={entry.durationMinutes} onChange={e => setEntry({ ...entry, durationMinutes: e.target.value })} placeholder="e.g. 30" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Summary <span className="text-red-500">*</span></label>
        <Input value={entry.summary} onChange={e => setEntry({ ...entry, summary: e.target.value })} placeholder="Brief summary of the communication" />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Detailed Notes</label>
        <textarea className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[70px]" value={entry.details} onChange={e => setEntry({ ...entry, details: e.target.value })} placeholder="Detailed notes on what was discussed, advice given, instructions received, action items, etc." />
      </div>

      {/* Billable Time Section */}
      <div className="border-t border-gray-200 pt-3 space-y-2">
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={entry.billable} onChange={e => setEntry({ ...entry, billable: e.target.checked })} className="rounded accent-cyan-600" />
          <div>
            <span className="text-sm font-medium text-gray-700">Mark as billable time</span>
            {entry.durationMinutes && entry.billable && (
              <span className="ml-2 text-xs text-cyan-600">
                ({entry.durationMinutes} min = ${((parseInt(entry.durationMinutes) / 60) * (parseFloat(entry.hourlyRate) || 150)).toFixed(2)})
              </span>
            )}
          </div>
        </label>
        {entry.billable && (
          <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Hourly Rate (CA$)</label>
              <Input type="number" min="0" step="5" value={entry.hourlyRate} onChange={e => setEntry({ ...entry, hourlyRate: e.target.value })} placeholder="150" />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer pb-2">
                <input type="checkbox" checked={entry.billedToFinancials} onChange={e => setEntry({ ...entry, billedToFinancials: e.target.checked })} className="rounded accent-green-600" />
                <span className="text-xs text-gray-600">Also create billing entry in Financial Records</span>
              </label>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
        <Button variant="outline" size="sm" onClick={onCancel}>Cancel</Button>
        <Button size="sm" disabled={!entry.communicationType || !entry.summary || submitting} onClick={onSave} className="bg-cyan-600 hover:bg-cyan-700 text-white">
          {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <><Save className="w-3.5 h-3.5 mr-1" /> Save</>}
        </Button>
      </div>
    </div>
  );

  if (loading) {
    return <div className="flex items-center justify-center p-8 text-foreground/50"><Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading communication log...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
        <p className="text-xs text-cyan-700">
          <strong>By-Law 7.1, s.23(14):</strong> All client communications must be documented and retained
          for 6+ years. Record every client interaction with date, time, method, and duration.
        </p>
      </div>

      {/* Billable Time Summary */}
      {entries.length > 0 && (
        <div className="flex items-center gap-4 p-3 bg-cyan-50 border border-cyan-100 rounded-lg">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-600" />
            <span className="text-sm font-semibold text-cyan-800">{entries.length} entries</span>
          </div>
          <div className="text-sm text-cyan-700">
            <span className="font-semibold">{totalBillableHours.toFixed(1)}h</span> billable ({totalBillableMinutes} min)
          </div>
          <div className="text-sm text-cyan-700">
            <span className="font-semibold">{entries.filter(e => e.billable).length}</span> billable entries
          </div>
        </div>
      )}

      {/* Filter & Add */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="outline" size="sm" onClick={() => setShowAddForm(true)} className={showAddForm ? 'hidden' : ''}>
          <Plus className="w-3.5 h-3.5 mr-1.5" /> Log Communication
        </Button>
        {entries.length > 0 && (
          <div className="flex gap-1 ml-auto">
            {[
              { value: 'all', label: 'All' },
              { value: 'phone', label: 'Phone' },
              { value: 'in_person', label: 'In-Person' },
              { value: 'email', label: 'Email' },
              { value: 'billable', label: 'Billable' },
            ].map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                  filter === f.value ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Add Form */}
      {showAddForm && renderCommForm(newEntry, setNewEntry, handleAddEntry, () => { setShowAddForm(false); setNewEntry(EMPTY_COMM_ENTRY); })}

      {/* Entries List */}
      {filteredEntries.length > 0 ? (
        <div className="space-y-2">
          {filteredEntries.map((entry) => {
            const CommIcon = getCommIcon(entry.communicationType);
            const commLabel = COMM_TYPES.find(t => t.value === entry.communicationType)?.label || entry.communicationType;
            return (
              <div key={entry._id}>
                {editingId === entry._id ? (
                  renderCommForm(editEntry, setEditEntry, () => handleUpdateEntry(entry._id!), () => setEditingId(null))
                ) : (
                  <div className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-lg hover:border-gray-200 transition-colors">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      entry.direction === 'inbound' ? 'bg-blue-100' : entry.direction === 'both' ? 'bg-purple-100' : 'bg-green-100'
                    }`}>
                      <CommIcon className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{entry.summary}</p>
                      <div className="flex items-center gap-2 flex-wrap mt-1">
                        <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">{commLabel}</span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {entry.communicationDate}
                          {entry.communicationTime && ` at ${entry.communicationTime}`}
                        </span>
                        {entry.durationMinutes && (
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {entry.durationMinutes} min
                          </span>
                        )}
                        <span className="text-xs text-gray-400">{entry.author}</span>
                        {entry.billable && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-700 font-medium">
                            ${((parseInt(entry.durationMinutes) || 0) / 60 * (parseFloat(entry.hourlyRate) || 150)).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => { setEditingId(entry._id || null); setEditEntry(entry); }}>
                      <Edit3 className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : !showAddForm ? (
        <EmptySection message="No communications logged for this file yet." actionLabel="Log Communication" onAction={() => setShowAddForm(true)} />
      ) : null}
    </div>
  );
}

// ============================================================
// SECTION I: Case Documents
// ============================================================
// Document category config
const DOC_CATEGORIES = [
  { value: 'court_filing', label: 'Court Filing', color: 'bg-blue-100 text-blue-800' },
  { value: 'evidence', label: 'Evidence', color: 'bg-purple-100 text-purple-800' },
  { value: 'correspondence', label: 'Correspondence', color: 'bg-cyan-100 text-cyan-800' },
  { value: 'contract', label: 'Contract / Agreement', color: 'bg-green-100 text-green-800' },
  { value: 'financial', label: 'Financial Document', color: 'bg-amber-100 text-amber-800' },
  { value: 'identification', label: 'Identification', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'disclosure', label: 'Disclosure', color: 'bg-orange-100 text-orange-800' },
  { value: 'legal_research', label: 'Legal Research / Case Law', color: 'bg-teal-100 text-teal-800' },
  { value: 'witness', label: 'Witness Statement', color: 'bg-rose-100 text-rose-800' },
  { value: 'expert_report', label: 'Expert Report', color: 'bg-fuchsia-100 text-fuchsia-800' },
  { value: 'photo_video', label: 'Photo / Video', color: 'bg-pink-100 text-pink-800' },
  { value: 'other', label: 'Other', color: 'bg-gray-100 text-gray-800' },
] as const;

interface CaseDocument {
  _id?: string;
  fileId: string;
  fileName: string;
  category: string;
  description: string;
  dateAdded: string;
  addedBy: string;
  fileSize: string;
  fileUrl: string;
  notes: string;
  isPrivileged: boolean;
  version: number;
}

function SectionCaseDocuments({ file }: SectionEditProps) {
  const [documents, setDocuments] = useState<CaseDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDoc, setEditingDoc] = useState<CaseDocument | null>(null);
  const [viewingDoc, setViewingDoc] = useState<CaseDocument | null>(null);
  const [saving, setSaving] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Form state
  const [formData, setFormData] = useState<Omit<CaseDocument, '_id' | 'fileId'>>({
    fileName: '',
    category: 'court_filing',
    description: '',
    dateAdded: new Date().toISOString().split('T')[0],
    addedBy: 'Johnny Demers',
    fileSize: '',
    fileUrl: '',
    notes: '',
    isPrivileged: false,
    version: 1,
  });

  useEffect(() => {
    loadDocuments();
  }, [file._id]);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const allDocs = await BaseCrudService.getAll<any>('casedocuments');
      const fileDocs = (allDocs.items || []).filter((d: any) => d.fileId === file._id);
      setDocuments(fileDocs);
    } catch (err) {
      console.error('Error loading case documents:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fileName: '',
      category: 'court_filing',
      description: '',
      dateAdded: new Date().toISOString().split('T')[0],
      addedBy: 'Johnny Demers',
      fileSize: '',
      fileUrl: '',
      notes: '',
      isPrivileged: false,
      version: 1,
    });
  };

  const handleSave = async () => {
    if (!formData.fileName.trim() || !formData.description.trim()) return;
    setSaving(true);
    try {
      if (editingDoc?._id) {
        await BaseCrudService.update('casedocuments', { _id: editingDoc._id, ...formData, fileId: file._id } as any);
        setDocuments(prev => prev.map(d => d._id === editingDoc._id ? { ...d, ...formData } : d));
      } else {
        const created = await BaseCrudService.create('casedocuments', { ...formData, fileId: file._id } as any);
        setDocuments(prev => [...prev, { ...formData, fileId: file._id, _id: created._id || `doc-${Date.now()}` }]);
      }
      setShowAddForm(false);
      setEditingDoc(null);
      resetForm();
    } catch (err) {
      console.error('Error saving document:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (doc: CaseDocument) => {
    setFormData({
      fileName: doc.fileName,
      category: doc.category,
      description: doc.description,
      dateAdded: doc.dateAdded,
      addedBy: doc.addedBy,
      fileSize: doc.fileSize,
      fileUrl: doc.fileUrl,
      notes: doc.notes,
      isPrivileged: doc.isPrivileged,
      version: doc.version,
    });
    setEditingDoc(doc);
    setShowAddForm(true);
    setViewingDoc(null);
  };

  const handleDelete = async (docId: string) => {
    try {
      setDocuments(prev => prev.filter(d => d._id !== docId));
      setViewingDoc(null);
    } catch (err) {
      console.error('Error deleting document:', err);
    }
  };

  const getCategoryConfig = (cat: string) => DOC_CATEGORIES.find(c => c.value === cat) || DOC_CATEGORIES[DOC_CATEGORIES.length - 1];

  // Filtered documents
  const filteredDocs = documents.filter(d => {
    const matchesCat = filterCategory === 'all' || d.category === filterCategory;
    const matchesSearch = searchQuery === '' || d.fileName.toLowerCase().includes(searchQuery.toLowerCase()) || d.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Stats
  const totalDocs = documents.length;
  const privilegedCount = documents.filter(d => d.isPrivileged).length;
  const categoryCounts = DOC_CATEGORIES.map(c => ({ ...c, count: documents.filter(d => d.category === c.value).length })).filter(c => c.count > 0);

  if (loading) {
    return <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /><span className="ml-2 text-sm text-gray-500">Loading documents...</span></div>;
  }

  // ---- VIEW DOCUMENT DETAIL ----
  if (viewingDoc) {
    const catConfig = getCategoryConfig(viewingDoc.category);
    return (
      <div className="space-y-6">
        <button onClick={() => setViewingDoc(null)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Documents
        </button>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{viewingDoc.fileName}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${catConfig.color}`}>{catConfig.label}</span>
                  {viewingDoc.isPrivileged && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-800 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Privileged
                    </span>
                  )}
                  <span className="text-xs text-gray-400">v{viewingDoc.version}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleEdit(viewingDoc)}>
                <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleDelete(viewingDoc._id || '')}>
                <Trash2 className="w-3.5 h-3.5 mr-1" /> Remove
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Description</p>
              <p className="text-sm text-gray-800">{viewingDoc.description}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Date Added</p>
                <p className="text-sm text-gray-800">{new Date(viewingDoc.dateAdded).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Added By</p>
                <p className="text-sm text-gray-800">{viewingDoc.addedBy}</p>
              </div>
              {viewingDoc.fileSize && (
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">File Size</p>
                  <p className="text-sm text-gray-800">{viewingDoc.fileSize}</p>
                </div>
              )}
            </div>
          </div>

          {viewingDoc.fileUrl && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-1">File Location / URL</p>
              <p className="text-sm text-blue-800 break-all">{viewingDoc.fileUrl}</p>
            </div>
          )}

          {viewingDoc.notes && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-xs font-medium text-amber-600 uppercase tracking-wider mb-1">Notes</p>
              <p className="text-sm text-amber-800">{viewingDoc.notes}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ---- ADD / EDIT FORM ----
  if (showAddForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg font-bold text-gray-900">
            {editingDoc ? 'Edit Document' : 'Add Case Document'}
          </h3>
          <button onClick={() => { setShowAddForm(false); setEditingDoc(null); resetForm(); }} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Row 1: File Name + Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Document Name *</label>
              <Input
                value={formData.fileName}
                onChange={e => setFormData(p => ({ ...p, fileName: e.target.value }))}
                placeholder="e.g. Statement-of-Claim.pdf"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Category *</label>
              <select
                value={formData.category}
                onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}
                className="w-full mt-1 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {DOC_CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Description */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Description *</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
              className="w-full mt-1 text-sm border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              rows={2}
              placeholder="Brief description of the document and its relevance to the case"
            />
          </div>

          {/* Row 3: Date, Added By, Version */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</label>
              <Input
                type="date"
                value={formData.dateAdded}
                onChange={e => setFormData(p => ({ ...p, dateAdded: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Added By</label>
              <Input
                value={formData.addedBy}
                onChange={e => setFormData(p => ({ ...p, addedBy: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Version</label>
              <Input
                type="number"
                min={1}
                value={formData.version}
                onChange={e => setFormData(p => ({ ...p, version: parseInt(e.target.value) || 1 }))}
                className="mt-1"
              />
            </div>
          </div>

          {/* Row 4: File Size + Upload / URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">File Size</label>
              <Input
                value={formData.fileSize}
                onChange={e => setFormData(p => ({ ...p, fileSize: e.target.value }))}
                placeholder="e.g. 245 KB, 1.2 MB"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">File URL / Location</label>
              <Input
                value={formData.fileUrl}
                onChange={e => setFormData(p => ({ ...p, fileUrl: e.target.value }))}
                placeholder="URL or file path reference"
                className="mt-1"
              />
            </div>
          </div>

          {/* Privileged checkbox */}
          <label className="flex items-center gap-3 p-3 bg-red-50 border border-red-100 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isPrivileged}
              onChange={e => setFormData(p => ({ ...p, isPrivileged: e.target.checked }))}
              className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
            <div>
              <span className="text-sm font-medium text-red-800">Mark as Privileged / Confidential</span>
              <p className="text-xs text-red-600">This document is subject to solicitor-client privilege or litigation privilege</p>
            </div>
          </label>

          {/* Notes */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</label>
            <textarea
              value={formData.notes}
              onChange={e => setFormData(p => ({ ...p, notes: e.target.value }))}
              className="w-full mt-1 text-sm border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              rows={2}
              placeholder="Optional internal notes about this document"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <Button variant="outline" onClick={() => { setShowAddForm(false); setEditingDoc(null); resetForm(); }}>Cancel</Button>
          <Button
            onClick={handleSave}
            disabled={saving || !formData.fileName.trim() || !formData.description.trim()}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : <><Save className="w-4 h-4 mr-2" /> {editingDoc ? 'Update Document' : 'Add Document'}</>}
          </Button>
        </div>
      </div>
    );
  }

  // ---- DOCUMENT LIST VIEW ----
  if (documents.length === 0) {
    return (
      <EmptySection
        message="No case documents uploaded for this file."
        actionLabel="Add Document"
        onAction={() => { resetForm(); setShowAddForm(true); }}
      />
    );
  }

  return (
    <div className="space-y-5">
      {/* Summary Bar */}
      <div className="flex flex-wrap gap-3">
        <div className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-2 text-center">
          <p className="text-xl font-bold text-orange-700">{totalDocs}</p>
          <p className="text-xs text-orange-600">Total Documents</p>
        </div>
        {categoryCounts.slice(0, 4).map(c => (
          <div key={c.value} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-center">
            <p className="text-xl font-bold text-gray-700">{c.count}</p>
            <p className="text-xs text-gray-500">{c.label}</p>
          </div>
        ))}
        {privilegedCount > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-center">
            <p className="text-xl font-bold text-red-700">{privilegedCount}</p>
            <p className="text-xs text-red-600">Privileged</p>
          </div>
        )}
      </div>

      {/* Search + Filter + Add */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search documents..."
            className="pl-9"
          />
        </div>
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="all">All Categories</option>
          {DOC_CATEGORIES.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
        <Button onClick={() => { resetForm(); setShowAddForm(true); }} className="bg-primary hover:bg-primary/90 text-white">
          <Plus className="w-4 h-4 mr-1.5" /> Add Document
        </Button>
      </div>

      {/* Document List */}
      <div className="space-y-2">
        {filteredDocs.map(doc => {
          const catConfig = getCategoryConfig(doc.category);
          return (
            <div key={doc._id} className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group">
              <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-4.5 h-4.5 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900 truncate">{doc.fileName}</p>
                  {doc.isPrivileged && <Lock className="w-3 h-3 text-red-500 flex-shrink-0" />}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-xs px-1.5 py-0.5 rounded ${catConfig.color}`}>{catConfig.label}</span>
                  <span className="text-xs text-gray-400">{doc.dateAdded}</span>
                  {doc.fileSize && <span className="text-xs text-gray-400">— {doc.fileSize}</span>}
                </div>
              </div>
              <div className="flex gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" size="sm" onClick={() => setViewingDoc(doc)} title="View details">
                  <Eye className="w-3.5 h-3.5" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleEdit(doc)} title="Edit document">
                  <Edit3 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          );
        })}
        {filteredDocs.length === 0 && (
          <div className="text-center py-8 text-sm text-gray-400">
            No documents match your search or filter.
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// SECTION J: File Closing
// ============================================================

interface ClosingChecklistItem {
  id: string;
  label: string;
  description: string;
  hasTextField?: boolean;
  textFieldLabel?: string;
  textFieldPlaceholder?: string;
  hasDateField?: boolean;
  dateFieldLabel?: string;
  hasUpload?: boolean;
  uploadLabel?: string;
  hasDropdown?: boolean;
  dropdownLabel?: string;
  dropdownOptions?: { value: string; label: string }[];
}

const CLOSING_CHECKLIST: ClosingChecklistItem[] = [
  {
    id: 'disposition',
    label: 'Record matter disposition / outcome',
    description: 'Document how the matter was resolved (settlement, dismissal, judgment, withdrawal, etc.)',
    hasDropdown: true,
    dropdownLabel: 'Outcome Type',
    dropdownOptions: [
      { value: 'settlement', label: 'Settlement' },
      { value: 'judgment_favour', label: 'Judgment — In Favour' },
      { value: 'judgment_against', label: 'Judgment — Against' },
      { value: 'dismissal', label: 'Dismissal' },
      { value: 'withdrawal', label: 'Withdrawal / Discontinued' },
      { value: 'mediation', label: 'Resolved at Mediation' },
      { value: 'consent_order', label: 'Consent Order' },
      { value: 'charges_withdrawn', label: 'Charges Withdrawn' },
      { value: 'acquittal', label: 'Acquittal' },
      { value: 'guilty_plea', label: 'Guilty Plea / Resolution' },
      { value: 'other', label: 'Other' },
    ],
    hasTextField: true,
    textFieldLabel: 'Outcome Details',
    textFieldPlaceholder: 'e.g. Matter settled for $8,500 — mutual release signed. No admission of liability.',
    hasUpload: true,
    uploadLabel: 'Final Order / Settlement Document',
  },
  {
    id: 'finalAccount',
    label: 'Prepare and send final account / invoice',
    description: 'Issue final billing statement to client with all outstanding charges',
    hasTextField: true,
    textFieldLabel: 'Final Account Summary',
    textFieldPlaceholder: 'e.g. Final invoice #2026-045: $3,200 total fees + $485.50 disbursements. Sent via email April 1, 2026.',
    hasDateField: true,
    dateFieldLabel: 'Date Sent to Client',
    hasUpload: true,
    uploadLabel: 'Final Invoice / Statement',
  },
  {
    id: 'trustDisposition',
    label: 'Dispose of trust funds',
    description: 'Return any remaining trust funds to client and close trust account for this matter',
    hasDropdown: true,
    dropdownLabel: 'Trust Fund Status',
    dropdownOptions: [
      { value: 'returned_client', label: 'Returned to Client' },
      { value: 'applied_to_fees', label: 'Applied to Outstanding Fees (with consent)' },
      { value: 'partial_return', label: 'Partial Return — Remainder Applied to Fees' },
      { value: 'no_trust', label: 'No Trust Funds Held' },
      { value: 'held_pending', label: 'Held Pending Further Instructions' },
    ],
    hasTextField: true,
    textFieldLabel: 'Trust Disposition Details',
    textFieldPlaceholder: 'e.g. $1,250 trust balance returned to client via cheque #4501 on March 28, 2026.',
    hasDateField: true,
    dateFieldLabel: 'Date Trust Funds Disposed',
    hasUpload: true,
    uploadLabel: 'Trust Statement / Receipt',
  },
  {
    id: 'returnDocs',
    label: 'Return original documents to client',
    description: 'Return all original documents, evidence, and court orders to client',
    hasTextField: true,
    textFieldLabel: 'Documents Returned',
    textFieldPlaceholder: 'List all documents returned — e.g. Original lease agreement, photos (3), T2 application, Board order dated Feb 12, 2026.',
    hasDropdown: true,
    dropdownLabel: 'Delivery Method',
    dropdownOptions: [
      { value: 'in_person', label: 'Picked Up In Person' },
      { value: 'registered_mail', label: 'Registered Mail' },
      { value: 'courier', label: 'Courier' },
      { value: 'email_digital', label: 'Email / Digital Transfer' },
      { value: 'not_applicable', label: 'No Original Documents to Return' },
    ],
    hasDateField: true,
    dateFieldLabel: 'Date Returned',
    hasUpload: true,
    uploadLabel: 'Signed Acknowledgment of Receipt',
  },
  {
    id: 'retentionSchedule',
    label: 'Set retention schedule (minimum 6 years)',
    description: 'Per By-Law 7.1 s.23(14), set retention period of 6+ years from file close date',
    hasDropdown: true,
    dropdownLabel: 'Retention Period',
    dropdownOptions: [
      { value: '6', label: '6 Years (Minimum — LSO Requirement)' },
      { value: '7', label: '7 Years' },
      { value: '10', label: '10 Years' },
      { value: '15', label: '15 Years (Recommended for Real Property)' },
      { value: 'permanent', label: 'Permanent' },
    ],
    hasTextField: true,
    textFieldLabel: 'Storage Location',
    textFieldPlaceholder: 'e.g. Archived to locked storage room — Box #2026-Q1. Digital backup on encrypted cloud (Wix CMS).',
    hasDateField: true,
    dateFieldLabel: 'Retention Start Date',
  },
  {
    id: 'clientNotification',
    label: 'Notify client of file closing',
    description: 'Send written notice to client that their file is being closed',
    hasDropdown: true,
    dropdownLabel: 'Notification Method',
    dropdownOptions: [
      { value: 'email', label: 'Email' },
      { value: 'registered_mail', label: 'Registered Mail' },
      { value: 'email_and_mail', label: 'Email + Registered Mail' },
      { value: 'in_person', label: 'In-Person Notice' },
    ],
    hasDateField: true,
    dateFieldLabel: 'Date Client Notified',
    hasTextField: true,
    textFieldLabel: 'Notification Notes',
    textFieldPlaceholder: 'e.g. Closing letter emailed to john.smith@email.com on April 1, 2026. Client acknowledged receipt.',
    hasUpload: true,
    uploadLabel: 'Closing Letter / Confirmation',
  },
  {
    id: 'conflictUpdate',
    label: 'Update conflict database',
    description: 'Syncs all opposing parties into the conflict system so future intake checks will detect them automatically',
    hasTextField: true,
    textFieldLabel: 'Opposing Parties to Add (one per line)',
    textFieldPlaceholder: 'e.g.\nABC Renovations Inc.\nMike Johnson\nJane Doe (witness)',
    hasDateField: true,
    dateFieldLabel: 'Date Updated',
  },
  {
    id: 'archiveFile',
    label: 'Archive file and confirm storage',
    description: 'Move file to archive status with confirmed storage location',
    hasDropdown: true,
    dropdownLabel: 'Archive Status',
    dropdownOptions: [
      { value: 'physical_archive', label: 'Physical Archive (Locked Storage)' },
      { value: 'digital_archive', label: 'Digital Archive Only' },
      { value: 'both', label: 'Physical + Digital Archive' },
      { value: 'offsite', label: 'Off-Site Storage Facility' },
    ],
    hasTextField: true,
    textFieldLabel: 'Archive Location Details',
    textFieldPlaceholder: 'e.g. Physical: Box #2026-Q1, Shelf 3, Locked Room B. Digital: Wix CMS → Archived Files → LA-2026-0001.',
    hasDateField: true,
    dateFieldLabel: 'Date Archived',
  },
];

interface ClosingItemData {
  completed: boolean;
  textValue: string;
  dateValue: string;
  dropdownValue: string;
  uploadFileName: string;
  editMode: boolean;
}

function SectionFileClosing({ file, editing, editValues, onChange }: SectionEditProps) {
  const isComplete = file.sections.fileClosing;
  const [loading, setLoading] = useState(true);
  const [closingRecord, setClosingRecord] = useState<any>(null);
  const [itemData, setItemData] = useState<Record<string, ClosingItemData>>(() => {
    const initial: Record<string, ClosingItemData> = {};
    CLOSING_CHECKLIST.forEach(item => {
      initial[item.id] = { completed: false, textValue: '', dateValue: '', dropdownValue: '', uploadFileName: '', editMode: false };
    });
    return initial;
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadClosingRecord();
  }, [file._id]);

  const loadClosingRecord = async () => {
    try {
      const result = await BaseCrudService.getAll<any>('fileclosing');
      const match = result.items.find((r: any) => r.fileId === file._id);
      if (match) {
        setClosingRecord(match);
        // Restore checklist data from saved JSON
        if (match.closingChecklist) {
          try {
            const saved = JSON.parse(match.closingChecklist);
            setItemData(prev => {
              const updated = { ...prev };
              Object.keys(saved).forEach(key => {
                if (updated[key]) {
                  updated[key] = { ...updated[key], ...saved[key], editMode: false };
                }
              });
              return updated;
            });
          } catch (e) { /* ignore parse errors */ }
        }
      }
    } catch (error) {
      console.error('Error loading closing record:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateItemField = (itemId: string, field: keyof ClosingItemData, value: any) => {
    setItemData(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], [field]: value },
    }));
  };

  const toggleItemComplete = (itemId: string) => {
    setItemData(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], completed: !prev[itemId].completed, editMode: false },
    }));
  };

  const toggleEditMode = (itemId: string) => {
    setItemData(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], editMode: !prev[itemId].editMode },
    }));
  };

  const completedCount = Object.values(itemData).filter(d => d.completed).length;
  const totalItems = CLOSING_CHECKLIST.length;

  const handleSaveClosing = async () => {
    setSubmitting(true);
    try {
      const checklistJson = JSON.stringify(
        Object.fromEntries(Object.entries(itemData).map(([k, v]) => [k, { completed: v.completed, textValue: v.textValue, dateValue: v.dateValue, dropdownValue: v.dropdownValue, uploadFileName: v.uploadFileName }]))
      );

      const dispositionItem = itemData['disposition'];
      const retentionItem = itemData['retentionSchedule'];
      const notificationItem = itemData['clientNotification'];

      const payload: any = {
        clientId: file.clientId,
        fileId: file._id,
        disposition: dispositionItem.dropdownValue ? `${dispositionItem.dropdownValue}: ${dispositionItem.textValue}` : dispositionItem.textValue,
        dateClosed: new Date().toISOString(),
        trustFundDisposition: itemData['trustDisposition'].textValue,
        documentsReturnedList: itemData['returnDocs'].textValue,
        retentionStartDate: retentionItem.dateValue || new Date().toISOString().split('T')[0],
        retentionPeriodYears: retentionItem.dropdownValue === 'permanent' ? 99 : parseInt(retentionItem.dropdownValue) || 6,
        closingChecklistCompleted: completedCount === totalItems,
        clientNotified: notificationItem.completed,
        clientNotifiedDate: notificationItem.dateValue || undefined,
        closingChecklist: checklistJson,
      };

      if (closingRecord) {
        await BaseCrudService.update('fileclosing', { _id: closingRecord._id, ...payload } as any);
      } else {
        await BaseCrudService.create('fileclosing', payload);
      }

      // Sync opposing parties to conflict database when conflictUpdate item is completed
      const conflictItem = itemData['conflictUpdate'];
      if (conflictItem.completed && conflictItem.textValue) {
        const partyNames = conflictItem.textValue.split('\n').map((n: string) => n.trim()).filter(Boolean);
        for (const partyName of partyNames) {
          try {
            await BaseCrudService.create('conflictlogs', {
              conflictCode: `CLOSE-${file.fileNumber}-${Date.now()}`,
              fullName: partyName,
              conflictReason: `Opposing party from closed file ${file.fileNumber} (${file.clientName}). Matter: ${file.matterDescription}`,
              detectedAt: new Date().toISOString(),
              reviewed: true,
              reviewedBy: 'Paralegal — File Closing',
              reviewedAt: new Date().toISOString(),
            });
          } catch (e) {
            console.error('Error adding party to conflict log:', e);
          }
        }
      }

      await BaseCrudService.create('activitylogs', {
        fileId: file._id,
        clientId: file.clientId,
        action: 'file_closing_updated',
        details: `File closing checklist updated — ${completedCount}/${totalItems} items complete${
          conflictItem.completed && conflictItem.textValue
            ? `. Conflict DB updated with: ${conflictItem.textValue.split('\n').filter(Boolean).join(', ')}`
            : ''
        }`,
        performedBy: 'Paralegal',
        timestamp: new Date().toISOString(),
      });

      await loadClosingRecord();
    } catch (error) {
      console.error('Error saving closing record:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 text-foreground/50">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        Loading file closing data...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-xs text-gray-600">
          <strong>By-Law 7.1, s.23(14):</strong> Retain all records for 6+ years after completion.
          Document disposition, return documents, close trust accounts, and notify client.
        </p>
      </div>

      {/* Progress Summary */}
      <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={completedCount === totalItems ? '#16a34a' : '#f59e0b'} strokeWidth="3" strokeDasharray={`${(completedCount / totalItems) * 100}, 100`} />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">{completedCount}/{totalItems}</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">File Closing Checklist</p>
            <p className="text-xs text-gray-500">
              {completedCount === totalItems ? 'All items complete — ready to close file' : `${totalItems - completedCount} item${totalItems - completedCount !== 1 ? 's' : ''} remaining`}
            </p>
          </div>
        </div>
        <Button size="sm" onClick={handleSaveClosing} disabled={submitting} className="bg-primary hover:bg-primary/90 text-white">
          {submitting ? <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Saving...</> : <><Save className="w-3.5 h-3.5 mr-1.5" /> Save Progress</>}
        </Button>
      </div>

      {/* Checklist Items */}
      <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-100">
        {CLOSING_CHECKLIST.map((item) => {
          const data = itemData[item.id];
          const isExpanded = data.editMode || (!data.completed && (data.textValue || data.dateValue || data.dropdownValue));
          return (
            <div key={item.id} className={`transition-colors ${data.completed ? 'bg-green-50/50' : 'bg-white'}`}>
              {/* Header Row */}
              <div className="flex items-start gap-3 p-4">
                {/* Checkbox */}
                <button
                  onClick={() => toggleItemComplete(item.id)}
                  className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    data.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {data.completed && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                </button>
                {/* Label */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${data.completed ? 'text-green-800' : 'text-gray-700'}`}>
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                  {/* Compact summary when completed and collapsed */}
                  {data.completed && !data.editMode && (data.textValue || data.dropdownValue || data.dateValue) && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {data.dropdownValue && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
                          {item.dropdownOptions?.find(o => o.value === data.dropdownValue)?.label || data.dropdownValue}
                        </span>
                      )}
                      {data.dateValue && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                          <Calendar className="w-3 h-3" /> {data.dateValue}
                        </span>
                      )}
                      {data.uploadFileName && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700">
                          <FileText className="w-3 h-3" /> {data.uploadFileName}
                        </span>
                      )}
                      {data.textValue && (
                        <span className="text-xs text-gray-500 truncate max-w-[300px]">{data.textValue}</span>
                      )}
                    </div>
                  )}
                </div>
                {/* Edit/Expand toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleEditMode(item.id)}
                  className="flex-shrink-0"
                >
                  {data.editMode ? <><X className="w-3.5 h-3.5 mr-1" /> Close</> : <><Edit3 className="w-3.5 h-3.5 mr-1" /> {data.completed ? 'Edit' : 'Details'}</>}
                </Button>
              </div>

              {/* Expanded Edit Area */}
              {data.editMode && (
                <div className="px-4 pb-4 pt-0 ml-8 space-y-3 border-t border-gray-100 mt-0 pt-3">
                  {/* Dropdown */}
                  {item.hasDropdown && item.dropdownOptions && (
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">{item.dropdownLabel}</label>
                      <select
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        value={data.dropdownValue}
                        onChange={e => updateItemField(item.id, 'dropdownValue', e.target.value)}
                      >
                        <option value="">Select...</option>
                        {item.dropdownOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Date Field */}
                  {item.hasDateField && (
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">{item.dateFieldLabel}</label>
                      <Input
                        type="date"
                        value={data.dateValue}
                        onChange={e => updateItemField(item.id, 'dateValue', e.target.value)}
                        className="max-w-[220px]"
                      />
                    </div>
                  )}

                  {/* Text Field */}
                  {item.hasTextField && (
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">{item.textFieldLabel}</label>
                      <textarea
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-h-[70px]"
                        value={data.textValue}
                        onChange={e => updateItemField(item.id, 'textValue', e.target.value)}
                        placeholder={item.textFieldPlaceholder}
                      />
                    </div>
                  )}

                  {/* Upload */}
                  {item.hasUpload && (
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">{item.uploadLabel}</label>
                      {data.uploadFileName ? (
                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                          <FileText className="w-4 h-4 text-primary" />
                          <span className="text-sm text-gray-700 flex-1">{data.uploadFileName}</span>
                          <Button variant="outline" size="sm" onClick={() => updateItemField(item.id, 'uploadFileName', '')}>
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="p-3 border-2 border-dashed border-gray-200 rounded-lg text-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateItemField(item.id, 'uploadFileName', `${file.fileNumber}-${item.id}.pdf`)}
                          >
                            <Upload className="w-3.5 h-3.5 mr-1.5" /> Upload Document
                          </Button>
                          <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG — Max 10MB</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Done editing button */}
                  <div className="flex justify-end pt-1">
                    <Button size="sm" variant="outline" onClick={() => toggleEditMode(item.id)} className="text-green-700 border-green-300 hover:bg-green-50">
                      <CheckCircle className="w-3.5 h-3.5 mr-1.5" /> Done
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Close File Button */}
      {completedCount === totalItems && file.fileStatus === 'active' && (
        <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-sm font-medium text-green-800 mb-3">All closing checklist items complete</p>
          <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleSaveClosing} disabled={submitting}>
            <FolderClosed className="w-4 h-4 mr-2" />
            {submitting ? 'Saving...' : 'Close This File'}
          </Button>
          <p className="text-xs text-gray-400 mt-2">This will save all closing details and start the retention period.</p>
        </div>
      )}

      {/* Already closed view */}
      {file.fileStatus !== 'active' && file.fileStatus !== 'sealed' && closingRecord && (
        <div className="flex items-center gap-3 p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <FolderClosed className="w-6 h-6 text-gray-600" />
          <div>
            <p className="font-medium text-gray-800">File Closed</p>
            <p className="text-sm text-gray-500">
              Closed {closingRecord.dateClosed ? new Date(closingRecord.dateClosed).toLocaleDateString('en-CA') : 'N/A'}.
              Retention: {closingRecord.retentionPeriodYears === 99 ? 'Permanent' : `${closingRecord.retentionPeriodYears || 6} years`} from close date.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// SECTION K: Contingency Plan
// ============================================================
function SectionContingencyPlan({ file, editing, editValues, onChange }: SectionEditProps) {
  const isComplete = file.sections.contingencyPlan;

  // Contingency plan checklist items per LSO Part II.1
  const planSections = [
    {
      id: 'administrator',
      title: '1. Designated Administrator',
      bylaw: 'Part II.1, s.1',
      description: 'Appoint a licensed paralegal or lawyer to act as your practice administrator in case of death, disability, or incapacity.',
      fields: [
        { key: 'adminName', label: 'Administrator Name', type: 'text' as const },
        { key: 'adminLicense', label: 'LSO Licence Number', type: 'text' as const },
        { key: 'adminPhone', label: 'Phone Number', type: 'text' as const },
        { key: 'adminEmail', label: 'Email Address', type: 'text' as const },
        { key: 'adminConsent', label: 'Written Consent Obtained', type: 'select' as const, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }, { value: 'pending', label: 'Pending' }] },
      ],
      defaults: { adminName: 'Candice Fogarty', adminLicense: 'P21479', adminPhone: '226-272-5153', adminEmail: 'candice@legalassist.london', adminConsent: 'yes' },
    },
    {
      id: 'alternateAdmin',
      title: '2. Alternate Administrator',
      bylaw: 'Part II.1, s.1(2)',
      description: 'Designate an alternate administrator in case the primary is unavailable.',
      fields: [
        { key: 'altAdminName', label: 'Alternate Administrator Name', type: 'text' as const },
        { key: 'altAdminLicense', label: 'LSO Licence Number', type: 'text' as const },
        { key: 'altAdminPhone', label: 'Phone Number', type: 'text' as const },
        { key: 'altAdminConsent', label: 'Written Consent Obtained', type: 'select' as const, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }, { value: 'pending', label: 'Pending' }] },
      ],
      defaults: { altAdminName: '', altAdminLicense: '', altAdminPhone: '', altAdminConsent: 'no' },
    },
    {
      id: 'clientFiles',
      title: '3. Client File Custody & Preservation',
      bylaw: 'Part II.1, s.2',
      description: 'Plan for the custody, transfer, and protection of all client files and documents.',
      fields: [
        { key: 'fileStorageLocation', label: 'Physical File Storage Location', type: 'text' as const },
        { key: 'digitalStorageLocation', label: 'Digital File Storage (cloud/server)', type: 'text' as const },
        { key: 'backupFrequency', label: 'Backup Frequency', type: 'select' as const, options: [{ value: 'daily', label: 'Daily' }, { value: 'weekly', label: 'Weekly' }, { value: 'monthly', label: 'Monthly' }] },
        { key: 'accessInstructions', label: 'Access Instructions for Administrator', type: 'textarea' as const },
      ],
      defaults: { fileStorageLocation: 'Legal Assist London Office — Locked Filing Room', digitalStorageLocation: 'Wix Cloud CMS (encrypted)', backupFrequency: 'daily', accessInstructions: 'Master password and access credentials stored in sealed envelope with administrator. Safe deposit box #412 at TD Bank, 380 Wellington St, London ON.' },
    },
    {
      id: 'trustAccounts',
      title: '4. Trust Account Handling',
      bylaw: 'By-Law 9',
      description: 'Procedures for managing and distributing trust funds if practice is wound up.',
      fields: [
        { key: 'trustInstitution', label: 'Trust Account Institution', type: 'text' as const },
        { key: 'trustAccountNumber', label: 'Account Number (last 4 digits)', type: 'text' as const },
        { key: 'trustSigningAuth', label: 'Signing Authority Arrangements', type: 'textarea' as const },
        { key: 'trustDistributionPlan', label: 'Distribution Plan', type: 'textarea' as const },
      ],
      defaults: { trustInstitution: 'TD Canada Trust — London Main Branch', trustAccountNumber: '••••7892', trustSigningAuth: 'Primary: Johnny Demers (P-Licence). Upon incapacity, administrator gains signing authority per LSO authorization letter on file with TD.', trustDistributionPlan: 'All trust funds to be returned to respective clients within 30 days. Administrator to prepare final trust statements per By-Law 9 Form 9A.' },
    },
    {
      id: 'clientNotification',
      title: '5. Client Notification Procedure',
      bylaw: 'Part II.1, s.3',
      description: 'How clients will be notified if the practice must be wound up or transferred.',
      fields: [
        { key: 'notificationMethod', label: 'Notification Method', type: 'select' as const, options: [{ value: 'email_and_mail', label: 'Email + Registered Mail' }, { value: 'email', label: 'Email Only' }, { value: 'mail', label: 'Registered Mail Only' }] },
        { key: 'notificationTemplate', label: 'Notification Template Location', type: 'text' as const },
        { key: 'notificationTimeline', label: 'Timeline for Client Notification', type: 'select' as const, options: [{ value: '7_days', label: 'Within 7 days' }, { value: '14_days', label: 'Within 14 days' }, { value: '30_days', label: 'Within 30 days' }] },
        { key: 'notificationNotes', label: 'Additional Notes', type: 'textarea' as const },
      ],
      defaults: { notificationMethod: 'email_and_mail', notificationTemplate: 'Templates/contingency-client-letter.docx', notificationTimeline: '14_days', notificationNotes: 'Priority notification to clients with active matters and upcoming court dates. Administrator to check calendar for urgent deadlines.' },
    },
    {
      id: 'courtMatters',
      title: '6. Active Court Matters & Deadlines',
      bylaw: 'Rules of Conduct',
      description: 'Ensure all active court matters, limitation periods, and deadlines are addressed.',
      fields: [
        { key: 'activeMattersLog', label: 'Active Matters Log Location', type: 'text' as const },
        { key: 'calendarSystem', label: 'Calendar/Tickler System', type: 'text' as const },
        { key: 'urgentProtocol', label: 'Urgent Deadline Protocol', type: 'textarea' as const },
      ],
      defaults: { activeMattersLog: 'Legal Assist CMS — Admin Dashboard → Client Files', calendarSystem: 'Google Calendar (shared with administrator) + CMS appointment system', urgentProtocol: 'Administrator to review all active files within 48 hours. Any matter with a court date within 30 days requires immediate action — request adjournment or arrange coverage. Notify opposing counsel of situation.' },
    },
    {
      id: 'lsoNotification',
      title: '7. LSO Notification',
      bylaw: 'Part II.1, s.4',
      description: 'Procedure for notifying the Law Society of Ontario.',
      fields: [
        { key: 'lsoContactMethod', label: 'Notification Method', type: 'text' as const },
        { key: 'lsoTimeline', label: 'Timeline', type: 'text' as const },
        { key: 'lsoNotes', label: 'Notes', type: 'textarea' as const },
      ],
      defaults: { lsoContactMethod: 'Written notice to Member Services — memberinfo@lso.ca', lsoTimeline: 'Within 7 days of triggering event', lsoNotes: 'Administrator to notify LSO of paralegal incapacity/death and provide status update on all active client files.' },
    },
    {
      id: 'annualReview',
      title: '8. Annual Review & Maintenance',
      bylaw: 'Part II.1, s.5',
      description: 'The contingency plan must be reviewed and updated annually.',
      fields: [
        { key: 'lastReviewDate', label: 'Last Annual Review Date', type: 'date' as const },
        { key: 'nextReviewDate', label: 'Next Review Due', type: 'date' as const },
        { key: 'reviewedBy', label: 'Reviewed By', type: 'text' as const },
        { key: 'reviewNotes', label: 'Review Notes', type: 'textarea' as const },
      ],
      defaults: { lastReviewDate: '2026-01-15', nextReviewDate: '2027-01-15', reviewedBy: 'Johnny Demers, P-Licence', reviewNotes: 'All contact information verified current. Administrator consent reconfirmed. Trust account details updated. Client file storage procedures reviewed.' },
    },
    {
      id: 'complaint',
      title: '9. LSO Complaint Response Procedure',
      bylaw: 'Rules of Conduct',
      description: 'Procedure for responding to complaints filed with the LSO against the paralegal.',
      fields: [
        { key: 'complaintOfficer', label: 'Designated Complaint Response Officer', type: 'text' as const },
        { key: 'complaintTimeline', label: 'Response Timeline', type: 'text' as const },
        { key: 'complaintDocLocation', label: 'Complaint File Location', type: 'text' as const },
        { key: 'complaintInsurer', label: 'Errors & Omissions Insurer', type: 'text' as const },
        { key: 'complaintInsurerPolicy', label: 'Policy Number', type: 'text' as const },
        { key: 'complaintProcedure', label: 'Response Procedure', type: 'textarea' as const },
      ],
      defaults: { complaintOfficer: 'Johnny Demers, Licensed Paralegal', complaintTimeline: 'Acknowledge within 5 business days; full response within 30 days', complaintDocLocation: 'Legal Assist CMS — Admin → Complaints folder', complaintInsurer: 'LAWPRO (through LSO)', complaintInsurerPolicy: 'Contact LSO Member Services for policy details', complaintProcedure: '1. Log complaint receipt date and details in complaints register.\n2. Notify E&O insurer immediately if potential negligence claim.\n3. Gather all relevant file materials and correspondence.\n4. Prepare written response addressing each allegation.\n5. Submit response to LSO within deadline.\n6. Cooperate fully with any LSO investigation.\n7. Document all actions taken in response to complaint.\n8. If complaint involves trust funds, conduct immediate trust audit.\n9. Consider whether client should be referred to independent legal advice.\n10. Update contingency plan if complaint reveals systemic issues.' },
    },
  ];

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    isComplete ? { administrator: true } : {}
  );

  const toggleExpand = (id: string) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-pink-50 border border-pink-100 rounded-lg p-4">
        <p className="text-xs text-pink-700">
          <strong>By-Law 7.1, Part II.1:</strong> Every licensee must maintain a written contingency plan for
          the preservation or orderly wind-up of their professional business. The plan must include an appointed
          administrator, file custody procedures, trust account handling, client notification, and annual review.
        </p>
      </div>

      {/* Plan Status Banner */}
      <div className={`flex items-center gap-3 p-4 rounded-lg border ${
        isComplete ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'
      }`}>
        {isComplete ? (
          <>
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-medium text-green-800">Contingency Plan Active</p>
              <p className="text-sm text-green-600">Last reviewed: 2026-01-15 — Next review due: 2027-01-15</p>
            </div>
          </>
        ) : (
          <>
            <AlertTriangle className="w-6 h-6 text-amber-600" />
            <div>
              <p className="font-medium text-amber-800">Contingency Plan Incomplete</p>
              <p className="text-sm text-amber-600">Complete all sections below to meet LSO Part II.1 requirements</p>
            </div>
          </>
        )}
      </div>

      {/* Plan Sections */}
      <div className="space-y-3">
        {planSections.map((section) => (
          <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Section Header (clickable) */}
            <div
              className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${
                expandedSections[section.id] ? 'bg-pink-50 border-b border-gray-200' : 'bg-white hover:bg-gray-50'
              }`}
              onClick={() => toggleExpand(section.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isComplete ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  {isComplete ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <span className="text-[10px] font-bold text-white">{section.id === 'complaint' ? '9' : section.title.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <h4 className="font-heading text-sm font-semibold text-gray-800">{section.title}</h4>
                  <p className="text-[11px] text-gray-400">{section.bylaw}</p>
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections[section.id] ? 'rotate-90' : ''}`} />
            </div>

            {/* Section Content (expandable) */}
            {expandedSections[section.id] && (
              <div className="p-4 space-y-4">
                <p className="text-xs text-gray-500 italic">{section.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.fields.map((field) => (
                    <div key={field.key} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                      <EditableField
                        label={field.label}
                        value={section.defaults[field.key as keyof typeof section.defaults] || ''}
                        fieldKey={field.key}
                        editing={editing}
                        editValues={editValues}
                        onChange={onChange}
                        type={field.type}
                        options={'options' in field ? field.options : undefined}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Compliance Footer */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
        <p className="text-xs text-gray-500">
          This contingency plan satisfies the requirements of By-Law 7.1, Part II.1 of the Law Society of Ontario.
          It must be reviewed and updated annually, and a copy provided to the designated administrator.
        </p>
      </div>
    </div>
  );
}
