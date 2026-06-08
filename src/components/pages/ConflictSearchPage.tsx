/**
 * Conflict of Interest Search Page
 *
 * LSO Rules of Professional Conduct, Rule 3.04 — Paralegals must check for
 * conflicts of interest before taking on any new matter. This page provides
 * a search engine across all clients, opposing parties, related parties,
 * witnesses, and matter descriptions in the system.
 *
 * Features:
 * - Fuzzy name search across the full conflict matrix
 * - Searches: clientfiles (client names, matter descriptions),
 *   clientprofiles (opposing parties, relationships, cities),
 *   communicationlog (parties mentioned), fileassignments
 * - Match scoring with relevance ranking
 * - Conflict report generation (HTML, printable)
 * - Search history log for audit trail
 * - Bulk intake conflict check (multiple names at once)
 *
 * Search history stored in 'financialrecords' with transactionType: 'conflict_search'
 */
import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  ChevronLeft, Search, Loader2, AlertTriangle, AlertCircle,
  CheckCircle, Shield, User, Briefcase, FileText,
  Clock, Download, Eye, X, Plus, Trash2,
  ChevronDown, ChevronUp, Users, Scale,
} from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// ============================================================
// TYPES
// ============================================================

interface ClientFile {
  _id: string;
  fileNumber?: string;
  clientId?: string;
  clientName?: string;
  clientEmail?: string;
  matterType?: string;
  matterDescription?: string;
  fileStatus?: string;
  dateOpened?: string;
  tribunal?: string;
  conflictStatus?: string;
}

interface ClientProfile {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  opposingPartyNames?: string;
  opposingPartyRelationship?: string;
  conflictMatterCity?: string;
  conflictCheckCompleted?: boolean;
  conflictCheckStatus?: string;
  conflictCheckDate?: string;
  conflictMatchesFound?: string;
}

interface CommunicationEntry {
  _id: string;
  fileId?: string;
  clientId?: string;
  summary?: string;
  details?: string;
  author?: string;
  communicationType?: string;
  communicationDate?: string;
}

interface CmsRecord {
  _id: string;
  _createdDate?: Date | string;
  clientId?: string;
  fileId?: string;
  transactionType?: string;
  description?: string;
  referenceNumber?: string;
  transactionDate?: Date | string;
  recordedBy?: string;
}

// A single match found by the search engine
interface ConflictMatch {
  matchType: 'client_name' | 'opposing_party' | 'matter_description' | 'communication' | 'related_party' | 'city_location';
  matchTypeLabel: string;
  matchedText: string;        // The text that matched
  sourceEntity: string;       // Where it was found (e.g., "File #2024-001")
  sourceId: string;           // ID of the source record
  clientName: string;
  fileNumber: string;
  matterType: string;
  fileStatus: string;
  relevanceScore: number;     // 0-100
  searchedName: string;       // The name that was searched
}

// Search history entry metadata
interface SearchHistoryMeta {
  searchTerms: string[];
  searchDate: string;
  resultsCount: number;
  matchCount: number;
  status: 'clear' | 'flagged';
  performedBy: string;
  purpose: string;           // e.g., "new_intake", "periodic_review"
}

// ============================================================
// HELPERS
// ============================================================

/**
 * Simple fuzzy match: checks if the search term appears as a substring
 * in the target, case-insensitive, with basic token matching.
 * Returns a relevance score 0-100.
 */
function fuzzyMatch(searchTerm: string, target: string): number {
  if (!searchTerm || !target) return 0;
  const s = searchTerm.toLowerCase().trim();
  const t = target.toLowerCase().trim();

  // Exact match
  if (t === s) return 100;

  // Full substring match
  if (t.includes(s)) return 85;

  // Check if search term is contained as a word
  const tWords = t.split(/[\s,;/&]+/).filter(Boolean);
  const sWords = s.split(/[\s,;/&]+/).filter(Boolean);

  // All search words found in target
  const allFound = sWords.every(sw => tWords.some(tw => tw.includes(sw) || sw.includes(tw)));
  if (allFound) return 75;

  // Partial word matches
  let matchedWords = 0;
  for (const sw of sWords) {
    for (const tw of tWords) {
      if (tw.includes(sw) || sw.includes(tw)) {
        matchedWords++;
        break;
      }
    }
  }
  if (matchedWords > 0) {
    return Math.round((matchedWords / sWords.length) * 60);
  }

  // Levenshtein-based similarity for short names (typo tolerance)
  if (s.length <= 20 && t.length <= 40) {
    // Check each target word against each search word
    for (const sw of sWords) {
      for (const tw of tWords) {
        const dist = levenshtein(sw, tw);
        const maxLen = Math.max(sw.length, tw.length);
        if (maxLen > 0 && dist / maxLen <= 0.3) {
          return 50; // ~70% similar
        }
      }
    }
  }

  return 0;
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function formatDate(d: string | Date | undefined): string {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' });
}

function parseHistoryMeta(record: CmsRecord): SearchHistoryMeta | null {
  try {
    return JSON.parse(record.description || '{}') as SearchHistoryMeta;
  } catch {
    return null;
  }
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function ConflictSearchPage() {
  // Data state
  const [clientFiles, setClientFiles] = useState<ClientFile[]>([]);
  const [clientProfiles, setClientProfiles] = useState<ClientProfile[]>([]);
  const [commLogs, setCommLogs] = useState<CommunicationEntry[]>([]);
  const [searchHistory, setSearchHistory] = useState<CmsRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Search state
  const [searchNames, setSearchNames] = useState<string[]>(['']);
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<ConflictMatch[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchPurpose, setSearchPurpose] = useState<'new_intake' | 'periodic_review' | 'matter_change'>('new_intake');

  // Client association — which client this conflict check is being run FOR
  const [searchForClientId, setSearchForClientId] = useState<string>('');

  // UI state
  const [activeTab, setActiveTab] = useState('search');
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Feedback
  const [feedback, setFeedback] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  // ============================================================
  // DATA LOADING
  // ============================================================

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // Conflict checks must see the ENTIRE database — getAllPages follows
      // pagination so nothing is missed (getAll alone caps at 50/1000 rows).
      const [fileRes, profileRes, commRes, finRes] = await Promise.all([
        BaseCrudService.getAllPages<any>('clientfiles'),
        BaseCrudService.getAllPages<any>('clientprofiles'),
        BaseCrudService.getAllPages<any>('communicationlog'),
        BaseCrudService.getAllPages<any>('financialrecords'),
      ]);
      setClientFiles(fileRes.items || []);
      setClientProfiles(profileRes.items || []);
      setCommLogs(commRes.items || []);
      setSearchHistory(
        (finRes.items || []).filter((r: any) => r.transactionType === 'conflict_search')
      );
    } catch (err) {
      console.error('Failed to load conflict data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // Build a lookup: clientId -> ClientProfile
  const profileMap = useMemo(() => {
    const m: Record<string, ClientProfile> = {};
    clientProfiles.forEach(p => { m[p._id] = p; });
    return m;
  }, [clientProfiles]);

  // Build a lookup: fileId -> ClientFile
  const fileMap = useMemo(() => {
    const m: Record<string, ClientFile> = {};
    clientFiles.forEach(f => { m[f._id] = f; });
    return m;
  }, [clientFiles]);

  // ============================================================
  // SEARCH ENGINE
  // ============================================================

  const runSearch = useCallback(() => {
    const terms = searchNames.map(n => n.trim()).filter(Boolean);
    if (terms.length === 0) return;

    setSearching(true);
    setHasSearched(true);

    // Use setTimeout to let the UI update before running the heavy search
    setTimeout(() => {
      const matches: ConflictMatch[] = [];

      for (const term of terms) {
        // 1. Search client names in clientfiles
        for (const file of clientFiles) {
          const score = fuzzyMatch(term, file.clientName || '');
          if (score > 0) {
            matches.push({
              matchType: 'client_name',
              matchTypeLabel: 'Client Name',
              matchedText: file.clientName || '',
              sourceEntity: `File ${file.fileNumber}`,
              sourceId: file._id,
              clientName: file.clientName || '—',
              fileNumber: file.fileNumber || '—',
              matterType: file.matterType || '—',
              fileStatus: file.fileStatus || '—',
              relevanceScore: score,
              searchedName: term,
            });
          }

          // Search matter description
          const descScore = fuzzyMatch(term, file.matterDescription || '');
          if (descScore > 0) {
            matches.push({
              matchType: 'matter_description',
              matchTypeLabel: 'Matter Description',
              matchedText: file.matterDescription || '',
              sourceEntity: `File ${file.fileNumber}`,
              sourceId: file._id,
              clientName: file.clientName || '—',
              fileNumber: file.fileNumber || '—',
              matterType: file.matterType || '—',
              fileStatus: file.fileStatus || '—',
              relevanceScore: descScore,
              searchedName: term,
            });
          }
        }

        // 2. Search opposing parties in clientprofiles
        for (const profile of clientProfiles) {
          const oppNames = profile.opposingPartyNames || '';
          if (oppNames) {
            // Opposing parties may be comma-separated
            const parts = oppNames.split(/[,;]+/).map(p => p.trim()).filter(Boolean);
            for (const part of parts) {
              const score = fuzzyMatch(term, part);
              if (score > 0) {
                // Find the client file for this profile
                const file = clientFiles.find(f => f.clientId === profile._id);
                matches.push({
                  matchType: 'opposing_party',
                  matchTypeLabel: 'Opposing Party',
                  matchedText: part,
                  sourceEntity: file ? `File ${file.fileNumber}` : `Profile ${profile._id}`,
                  sourceId: profile._id,
                  clientName: file?.clientName || `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || '—',
                  fileNumber: file?.fileNumber || '—',
                  matterType: file?.matterType || '—',
                  fileStatus: file?.fileStatus || '—',
                  relevanceScore: score,
                  searchedName: term,
                });
              }
            }
          }

          // Search related party / relationship field
          const relationship = profile.opposingPartyRelationship || '';
          if (relationship) {
            const relScore = fuzzyMatch(term, relationship);
            if (relScore > 0) {
              const file = clientFiles.find(f => f.clientId === profile._id);
              matches.push({
                matchType: 'related_party',
                matchTypeLabel: 'Related Party / Relationship',
                matchedText: relationship,
                sourceEntity: file ? `File ${file.fileNumber}` : `Profile ${profile._id}`,
                sourceId: profile._id,
                clientName: file?.clientName || `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || '—',
                fileNumber: file?.fileNumber || '—',
                matterType: file?.matterType || '—',
                fileStatus: file?.fileStatus || '—',
                relevanceScore: relScore,
                searchedName: term,
              });
            }
          }

          // Search city/location
          const city = profile.conflictMatterCity || profile.city || '';
          if (city) {
            const cityScore = fuzzyMatch(term, city);
            if (cityScore > 0) {
              const file = clientFiles.find(f => f.clientId === profile._id);
              matches.push({
                matchType: 'city_location',
                matchTypeLabel: 'City / Location',
                matchedText: city,
                sourceEntity: file ? `File ${file.fileNumber}` : `Profile ${profile._id}`,
                sourceId: profile._id,
                clientName: file?.clientName || `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || '—',
                fileNumber: file?.fileNumber || '—',
                matterType: file?.matterType || '—',
                fileStatus: file?.fileStatus || '—',
                relevanceScore: cityScore,
                searchedName: term,
              });
            }
          }
        }

        // 3. Search communication logs (summaries, details)
        for (const comm of commLogs) {
          const summaryScore = fuzzyMatch(term, comm.summary || '');
          const detailScore = fuzzyMatch(term, comm.details || '');
          const bestScore = Math.max(summaryScore, detailScore);
          if (bestScore >= 50) { // Higher threshold for comm logs to reduce noise
            const file = fileMap[comm.fileId || ''];
            matches.push({
              matchType: 'communication',
              matchTypeLabel: 'Communication Log',
              matchedText: comm.summary || comm.details || '',
              sourceEntity: file ? `File ${file.fileNumber}` : 'Communication',
              sourceId: comm._id,
              clientName: file?.clientName || '—',
              fileNumber: file?.fileNumber || '—',
              matterType: file?.matterType || '—',
              fileStatus: file?.fileStatus || '—',
              relevanceScore: bestScore,
              searchedName: term,
            });
          }
        }
      }

      // Deduplicate: same source + same match type for same search term
      const seen = new Set<string>();
      const deduped = matches.filter(m => {
        const key = `${m.searchedName}|${m.matchType}|${m.sourceId}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      // Sort by relevance
      deduped.sort((a, b) => b.relevanceScore - a.relevanceScore);

      setResults(deduped);
      setSearching(false);
    }, 50);
  }, [searchNames, clientFiles, clientProfiles, commLogs, fileMap]);

  // ============================================================
  // SAVE SEARCH TO HISTORY
  // ============================================================

  const saveSearchToHistory = async () => {
    const terms = searchNames.map(n => n.trim()).filter(Boolean);
    if (terms.length === 0) return;
    setSaving(true);
    try {
      const significantMatches = results.filter(r => r.relevanceScore >= 50);
      const status = significantMatches.length > 0 ? 'flagged' : 'clear';

      const meta: SearchHistoryMeta = {
        searchTerms: terms,
        searchDate: new Date().toISOString(),
        resultsCount: results.length,
        matchCount: significantMatches.length,
        status,
        performedBy: 'paralegal',
        purpose: searchPurpose,
      };

      // 1) Save to audit trail (financialrecords)
      await BaseCrudService.create('financialrecords', {
        transactionType: 'conflict_search',
        transactionDate: new Date().toISOString(),
        description: JSON.stringify(meta),
        referenceNumber: `CS-${Date.now()}`,
        recordedBy: 'paralegal',
      });

      // 2) Update client profile so Section E (Conflict Check) in the LSO file shows the results
      if (searchForClientId) {
        const conflictCheckStatus = significantMatches.length > 0 ? 'flagged' : 'passed';

        // Build match data in the same format SectionConflictCheck expects
        const matchData = significantMatches.map(m => ({
          matchedAgainst: m.searchedName,
          matchedIn: m.sourceEntity,
          matchedName: m.matchedText.length > 100 ? m.matchedText.substring(0, 100) : m.matchedText,
          matchType: m.matchTypeLabel,
        }));

        await BaseCrudService.update('clientprofiles', {
          _id: searchForClientId,
          conflictCheckCompleted: true,
          conflictCheckStatus,
          conflictCheckDate: new Date().toISOString(),
          conflictMatchesFound: JSON.stringify(matchData),
          opposingPartyNames: terms.slice(1).join(', ') || terms[0] || '',
        });

        // Also update the client's file conflict status
        const clientFile = clientFiles.find(f => f.clientId === searchForClientId);
        if (clientFile) {
          await BaseCrudService.update('clientfiles', {
            _id: clientFile._id,
            conflictStatus: conflictCheckStatus,
            sectionConflictCheck: true,
          });
        }

        toast('Saved to audit trail & updated LSO Conflict Check');
      } else {
        toast('Saved to audit trail (select a client above to also update their LSO file)');
      }

      await loadData();
    } catch (err) {
      toast('Failed to save search', 'error');
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // REPORT GENERATION
  // ============================================================

  const generateReport = () => {
    const terms = searchNames.map(n => n.trim()).filter(Boolean);
    const flagged = results.filter(r => r.relevanceScore >= 50);
    const statusLabel = flagged.length > 0
      ? `FLAGGED — ${flagged.length} Potential Conflict(s) Found`
      : 'CLEAR — No Conflicts Detected';
    const statusClass = flagged.length > 0 ? 'flagged' : 'passed';

    const matchRows = results.length > 0
      ? results.map(m =>
        `<tr>
          <td style="padding:6px 10px;border:1px solid #ccc;">${m.searchedName}</td>
          <td style="padding:6px 10px;border:1px solid #ccc;">${m.matchTypeLabel}</td>
          <td style="padding:6px 10px;border:1px solid #ccc;">${m.matchedText.length > 80 ? m.matchedText.substring(0, 80) + '...' : m.matchedText}</td>
          <td style="padding:6px 10px;border:1px solid #ccc;">${m.sourceEntity}</td>
          <td style="padding:6px 10px;border:1px solid #ccc;">${m.clientName}</td>
          <td style="padding:6px 10px;border:1px solid #ccc;text-align:center;">${m.relevanceScore}%</td>
        </tr>`
      ).join('')
      : '<tr><td colspan="6" style="padding:10px;text-align:center;color:#666;">No matches found</td></tr>';

    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>Conflict of Interest Search Report</title>
<style>
body{font-family:'Times New Roman',serif;font-size:12pt;margin:40px;color:#000}
h1{font-size:16pt;text-align:center;margin-bottom:4px}
h2{font-size:13pt;border-bottom:1px solid #000;padding-bottom:4px;margin-top:24px}
.header{text-align:center;margin-bottom:30px}
.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px 24px;margin:12px 0}
.info-item{display:flex;gap:8px}.info-item .label{font-weight:bold;min-width:160px}
table{width:100%;border-collapse:collapse;margin:10px 0}
th{background:#f0f0f0;padding:8px 10px;border:1px solid #ccc;text-align:left;font-weight:bold;font-size:10pt}
td{font-size:10pt}
.status-badge{display:inline-block;padding:4px 14px;border-radius:4px;font-weight:bold;font-size:11pt}
.passed{background:#d4edda;color:#155724}.flagged{background:#fff3cd;color:#856404}
.footer{margin-top:40px;border-top:1px solid #000;padding-top:12px;font-size:10pt;color:#666}
@media print{body{margin:20px}}
</style></head><body>
<div class="header">
  <h1>CONFLICT OF INTEREST SEARCH REPORT</h1>
  <p style="font-size:10pt;color:#666">Legal Assist Paralegal Services — LSO Rule 3.04 Compliance</p>
</div>
<h2>Search Details</h2>
<div class="info-grid">
  <div class="info-item"><span class="label">Date Performed:</span><span>${new Date().toLocaleDateString('en-CA', { year:'numeric', month:'long', day:'numeric' })}</span></div>
  <div class="info-item"><span class="label">Performed By:</span><span>System (Automated Multi-Source Search)</span></div>
  <div class="info-item"><span class="label">Search Purpose:</span><span>${searchPurpose === 'new_intake' ? 'New Client Intake' : searchPurpose === 'periodic_review' ? 'Periodic Review' : 'Matter Change'}</span></div>
  <div class="info-item"><span class="label">Names Searched:</span><span>${terms.join(', ')}</span></div>
</div>
<h2>Data Sources Searched</h2>
<ul style="margin:8px 0;">
  <li>Client Files (${clientFiles.length} files — names, matter descriptions)</li>
  <li>Client Profiles (${clientProfiles.length} profiles — opposing parties, relationships, locations)</li>
  <li>Communication Logs (${commLogs.length} entries — summaries, details)</li>
</ul>
<h2>Result</h2>
<p><span class="status-badge ${statusClass}">${statusLabel}</span></p>
<p style="font-size:10pt;color:#666;margin-top:4px;">Total matches found: ${results.length} (${flagged.length} with relevance >= 50%)</p>
<h2>Match Details</h2>
<table>
  <thead><tr><th>Searched Name</th><th>Match Type</th><th>Matched Text</th><th>Source</th><th>Client</th><th>Score</th></tr></thead>
  <tbody>${matchRows}</tbody>
</table>
<div class="footer">
  <p>This conflict search was performed in accordance with the Law Society of Ontario's Paralegal Rules of Conduct, Rule 3.04.
  A paralegal must not act or continue to act where there is a conflict of interest, except as permitted by the Rules.</p>
  <p>Generated: ${new Date().toLocaleString('en-CA')} | Reference: CS-${Date.now()} | Legal Assist Paralegal Services</p>
</div></body></html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  // ============================================================
  // UI HELPERS
  // ============================================================

  const toast = (msg: string, type: 'success' | 'error' = 'success') => {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback(null), 4000);
  };

  const addSearchName = () => {
    setSearchNames(prev => [...prev, '']);
  };

  const removeSearchName = (index: number) => {
    setSearchNames(prev => prev.filter((_, i) => i !== index));
  };

  const updateSearchName = (index: number, value: string) => {
    setSearchNames(prev => prev.map((n, i) => i === index ? value : n));
  };

  const matchTypeColor = (type: ConflictMatch['matchType']): string => {
    switch (type) {
      case 'client_name': return 'bg-blue-100 text-blue-700';
      case 'opposing_party': return 'bg-red-100 text-red-700';
      case 'related_party': return 'bg-orange-100 text-orange-700';
      case 'matter_description': return 'bg-purple-100 text-purple-700';
      case 'communication': return 'bg-cyan-100 text-cyan-700';
      case 'city_location': return 'bg-green-100 text-green-700';
    }
  };

  const relevanceBadge = (score: number) => {
    if (score >= 85) return 'bg-red-600 text-white';
    if (score >= 60) return 'bg-orange-500 text-white';
    if (score >= 40) return 'bg-yellow-500 text-white';
    return 'bg-gray-400 text-white';
  };

  // ============================================================
  // RENDER
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F5F0] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#B94A1F]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F5F0]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = '/paralegal-dashboard'}
                className="text-foreground/60 hover:text-foreground"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Dashboard
              </Button>
              <div>
                <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
                  <Scale className="w-6 h-6 text-[#B94A1F]" />
                  Conflict of Interest Search
                </h1>
                <p className="font-paragraph text-sm text-foreground/60 mt-0.5">
                  LSO Rule 3.04 — Search all parties before accepting any matter
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-foreground/40">
              <Users className="w-4 h-4" />
              <span>{clientFiles.length} files</span>
              <span className="mx-1">·</span>
              <span>{clientProfiles.length} profiles</span>
              <span className="mx-1">·</span>
              <span>{commLogs.length} comm logs</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="history">Search History</TabsTrigger>
          </TabsList>

          {/* ===================== SEARCH TAB ===================== */}
          <TabsContent value="search" className="mt-4 space-y-6">
            {/* Search Panel */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-[#B94A1F]" />
                <h2 className="font-heading font-semibold text-lg">Conflict Search</h2>
              </div>

              <p className="text-sm text-foreground/60 mb-4">
                Enter names to search across all client records, opposing parties, related parties,
                matter descriptions, and communication logs. Add multiple names for bulk intake checks.
              </p>

              {/* Purpose & Client Association */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-1">Search Purpose</label>
                  <select
                    value={searchPurpose}
                    onChange={e => setSearchPurpose(e.target.value as any)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
                  >
                    <option value="new_intake">New Client Intake</option>
                    <option value="periodic_review">Periodic Review</option>
                    <option value="matter_change">Matter Change / New Opposing Party</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-1">
                    Search For Client <span className="text-xs text-foreground/40 font-normal">(updates their LSO file)</span>
                  </label>
                  <select
                    value={searchForClientId}
                    onChange={e => setSearchForClientId(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
                  >
                    <option value="">— Select a client (optional) —</option>
                    {clientProfiles
                      .sort((a, b) => (`${a.firstName} ${a.lastName}`).localeCompare(`${b.firstName} ${b.lastName}`))
                      .map(p => (
                        <option key={p._id} value={p._id}>
                          {p.firstName} {p.lastName}{p.email ? ` (${p.email})` : ''}
                        </option>
                      ))
                    }
                  </select>
                </div>
              </div>

              {/* Name Inputs */}
              <div className="space-y-2 mb-4">
                {searchNames.map((name, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex-1 relative">
                      <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Input
                        value={name}
                        onChange={e => updateSearchName(index, e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') runSearch(); }}
                        placeholder={index === 0 ? 'Enter prospective client name...' : 'Enter opposing party or related name...'}
                        className="pl-9"
                      />
                    </div>
                    {searchNames.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSearchName(index)}
                        className="text-foreground/40 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={addSearchName}
                  className="text-[#B94A1F] hover:text-[#a03f1a]"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add another name
                </Button>
              </div>

              {/* Search Button */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={runSearch}
                  disabled={searching || searchNames.every(n => !n.trim())}
                  className="bg-[#B94A1F] hover:bg-[#a03f1a] text-white px-6"
                >
                  {searching ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Search className="w-4 h-4 mr-2" />}
                  Run Conflict Check
                </Button>
                {hasSearched && (
                  <>
                    <Button variant="outline" size="sm" onClick={generateReport}>
                      <Eye className="w-4 h-4 mr-1" /> View Report
                    </Button>
                    <Button variant="outline" size="sm" onClick={saveSearchToHistory} disabled={saving}>
                      {saving ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Download className="w-4 h-4 mr-1" />}
                      Save to Audit Trail
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Results */}
            {hasSearched && (
              <div className="space-y-4">
                {/* Result Summary */}
                {results.filter(r => r.relevanceScore >= 50).length > 0 ? (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-heading font-semibold text-yellow-800">
                        Potential Conflicts Detected
                      </p>
                      <p className="font-paragraph text-sm text-yellow-700 mt-1">
                        Found {results.filter(r => r.relevanceScore >= 50).length} match{results.filter(r => r.relevanceScore >= 50).length !== 1 ? 'es' : ''} with
                        relevance score of 50% or higher across {new Set(results.filter(r => r.relevanceScore >= 50).map(r => r.sourceId)).size} source record{new Set(results.filter(r => r.relevanceScore >= 50).map(r => r.sourceId)).size !== 1 ? 's' : ''}.
                        Review each match carefully before proceeding with intake.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-heading font-semibold text-green-800">
                        No Conflicts Detected
                      </p>
                      <p className="font-paragraph text-sm text-green-700 mt-1">
                        {results.length === 0
                          ? 'No matches found across any data sources. The search is clear.'
                          : `Found ${results.length} low-relevance match${results.length !== 1 ? 'es' : ''} (below 50% threshold). Review below if needed.`
                        }
                      </p>
                    </div>
                  </div>
                )}

                {/* Match type breakdown */}
                {results.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {['client_name', 'opposing_party', 'related_party', 'matter_description', 'communication', 'city_location'].map(type => {
                      const count = results.filter(r => r.matchType === type).length;
                      if (count === 0) return null;
                      const labels: Record<string, string> = {
                        client_name: 'Client Names',
                        opposing_party: 'Opposing Parties',
                        related_party: 'Related Parties',
                        matter_description: 'Matter Descriptions',
                        communication: 'Communications',
                        city_location: 'Locations',
                      };
                      return (
                        <span key={type} className={`px-3 py-1.5 rounded-full text-xs font-medium ${matchTypeColor(type as any)}`}>
                          {labels[type]}: {count}
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* Results List */}
                {results.length > 0 && (
                  <div className="space-y-2">
                    {results.map((match, i) => (
                      <div
                        key={`${match.searchedName}-${match.matchType}-${match.sourceId}-${i}`}
                        className={`bg-white rounded-xl border p-4 hover:shadow-md transition-shadow ${
                          match.relevanceScore >= 85 ? 'border-red-300 bg-red-50/30' :
                          match.relevanceScore >= 50 ? 'border-yellow-200 bg-yellow-50/20' :
                          'border-gray-100'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${matchTypeColor(match.matchType)}`}>
                                {match.matchTypeLabel}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${relevanceBadge(match.relevanceScore)}`}>
                                {match.relevanceScore}% match
                              </span>
                              {match.relevanceScore >= 85 && (
                                <span className="flex items-center gap-1 text-xs text-red-600 font-medium">
                                  <AlertCircle className="w-3 h-3" /> High relevance
                                </span>
                              )}
                            </div>
                            <p className="text-sm font-medium mt-2">
                              Searched: "<span className="text-[#B94A1F]">{match.searchedName}</span>"
                              &nbsp;&rarr;&nbsp;
                              Found: "<span className="font-semibold">{match.matchedText.length > 100 ? match.matchedText.substring(0, 100) + '...' : match.matchedText}</span>"
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-foreground/40">
                              <span className="flex items-center gap-1">
                                <Briefcase className="w-3 h-3" /> {match.fileNumber}
                              </span>
                              <span>{match.clientName}</span>
                              <span>{match.matterType}</span>
                              <span className={`font-medium ${
                                match.fileStatus === 'active' || match.fileStatus === 'Active' ? 'text-green-600' : 'text-gray-400'
                              }`}>
                                {match.fileStatus}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          {/* ===================== HISTORY TAB ===================== */}
          <TabsContent value="history" className="mt-4 space-y-4">
            <p className="font-paragraph text-sm text-foreground/60">
              Audit trail of all conflict searches performed. LSO expects documentation that conflict checks were conducted before each new retainer.
            </p>

            {searchHistory.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="font-heading text-lg text-foreground/60">No search history yet</p>
                <p className="font-paragraph text-sm text-foreground/40 mt-1">
                  Run a conflict search and save it to the audit trail to start building your history.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {[...searchHistory]
                  .sort((a, b) => new Date(b.transactionDate || 0).getTime() - new Date(a.transactionDate || 0).getTime())
                  .map(record => {
                    const meta = parseHistoryMeta(record);
                    if (!meta) return null;
                    return (
                      <div
                        key={record._id}
                        className={`bg-white rounded-xl border p-4 ${
                          meta.status === 'flagged' ? 'border-yellow-200' : 'border-gray-100'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              {meta.status === 'flagged' ? (
                                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                              ) : (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              )}
                              <span className="font-heading font-semibold text-sm">
                                {meta.searchTerms.join(', ')}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                meta.status === 'flagged' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                              }`}>
                                {meta.status === 'flagged' ? 'Flagged' : 'Clear'}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-xs text-foreground/40">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {formatDate(meta.searchDate)}
                              </span>
                              <span>{meta.resultsCount} result{meta.resultsCount !== 1 ? 's' : ''}</span>
                              <span>{meta.matchCount} significant match{meta.matchCount !== 1 ? 'es' : ''}</span>
                              <span className="capitalize">{meta.purpose.replace(/_/g, ' ')}</span>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">{record.referenceNumber}</Badge>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Feedback Toast */}
      {feedback && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg border flex items-center gap-2 text-sm font-medium animate-in slide-in-from-right ${
          feedback.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'
        }`}>
          {feedback.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {feedback.msg}
        </div>
      )}
    </div>
  );
}
