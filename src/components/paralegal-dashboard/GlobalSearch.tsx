/**
 * Global Search — one box that searches across the firm's core
 * collections and jumps straight to the matching record:
 *
 *   - clientfiles       → /admin/client-files/:fileId
 *   - clientprofiles    → the client's file when one exists, else /admin/users
 *   - clientdocuments   → /admin/documents
 *   - communicationlog  → the linked client file when one exists
 *
 * Collections are fetched once via getAllPages on first focus (so the
 * dashboard home doesn't pay the cost until the box is used) and then
 * filtered client-side as you type. Minimum 2 characters.
 */

import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Loader2, Folder, User, FileText, MessageSquare } from 'lucide-react';
import { BaseCrudService } from '@/integrations';

interface Hit {
  group: 'Files' | 'Clients' | 'Documents' | 'Communications';
  title: string;
  subtitle: string;
  route: string;
}

const lc = (v: unknown) => (typeof v === 'string' ? v.toLowerCase() : '');

export default function GlobalSearch() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const loadedRef = useRef(false);
  const [files, setFiles] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [docs, setDocs] = useState<any[]>([]);
  const [comms, setComms] = useState<any[]>([]);

  // Lazy one-time load on first focus.
  const ensureLoaded = async () => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    setLoading(true);
    try {
      const [f, p, d, c]: any[] = await Promise.all([
        BaseCrudService.getAllPages('clientfiles').catch(() => ({ items: [] })),
        BaseCrudService.getAllPages('clientprofiles').catch(() => ({ items: [] })),
        BaseCrudService.getAllPages('clientdocuments').catch(() => ({ items: [] })),
        BaseCrudService.getAllPages('communicationlog').catch(() => ({ items: [] })),
      ]);
      setFiles(f?.items || []);
      setProfiles(p?.items || []);
      setDocs(d?.items || []);
      setComms(c?.items || []);
    } finally {
      setLoading(false);
    }
  };

  const hits = useMemo<Hit[]>(() => {
    const needle = q.trim().toLowerCase();
    if (needle.length < 2) return [];
    const out: Hit[] = [];

    const fileForClient = (clientId?: string) =>
      clientId ? files.find((f: any) => f.clientId === clientId) : undefined;

    files.forEach((f: any) => {
      const hay = [f.clientName, f.fileNumber, f.clientEmail, f.matterType, f.matterDescription].map(lc).join(' ');
      if (hay.includes(needle)) {
        out.push({
          group: 'Files',
          title: `${f.clientName || 'Unnamed'} — ${f.fileNumber || f._id?.slice(0, 6)}`,
          subtitle: f.matterType || f.fileStatus || '',
          route: `/admin/client-files/${f._id}`,
        });
      }
    });

    profiles.forEach((p: any) => {
      const name = `${p.firstName || ''} ${p.lastName || ''}`.trim();
      const hay = [name, p.email, p.phone].map(lc).join(' ');
      if (hay.includes(needle)) {
        const f = fileForClient(p._id);
        out.push({
          group: 'Clients',
          title: name || p.email || 'Client',
          subtitle: p.email || p.phone || '',
          route: f ? `/admin/client-files/${f._id}` : '/admin/users',
        });
      }
    });

    docs.forEach((d: any) => {
      const hay = [d.documentName, d.clientEmail, d.documentType].map(lc).join(' ');
      if (hay.includes(needle)) {
        out.push({
          group: 'Documents',
          title: d.documentName || 'Document',
          subtitle: d.clientEmail || d.documentType || '',
          route: '/admin/documents',
        });
      }
    });

    comms.forEach((c: any) => {
      const hay = [c.subject, c.summary, c.notes, c.clientName, c.communicationType].map(lc).join(' ');
      if (hay.includes(needle)) {
        const f = c.fileId ? files.find((x: any) => x._id === c.fileId) : fileForClient(c.clientId);
        out.push({
          group: 'Communications',
          title: c.subject || c.summary?.slice(0, 60) || c.communicationType || 'Communication',
          subtitle: [c.clientName, c.communicationType].filter(Boolean).join(' · '),
          route: f ? `/admin/client-files/${f._id}` : '/admin/client-files',
        });
      }
    });

    // Cap per group at 5 so the dropdown stays scannable.
    const capped: Hit[] = [];
    (['Files', 'Clients', 'Documents', 'Communications'] as const).forEach(g => {
      capped.push(...out.filter(h => h.group === g).slice(0, 5));
    });
    return capped;
  }, [q, files, profiles, docs, comms]);

  const groupIcon = (g: Hit['group']) =>
    g === 'Files' ? <Folder className="w-3.5 h-3.5" /> :
    g === 'Clients' ? <User className="w-3.5 h-3.5" /> :
    g === 'Documents' ? <FileText className="w-3.5 h-3.5" /> :
    <MessageSquare className="w-3.5 h-3.5" />;

  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 px-3 py-2.5">
        {loading ? <Loader2 className="w-4 h-4 animate-spin text-foreground/40" /> : <Search className="w-4 h-4 text-foreground/40" />}
        <input
          value={q}
          onChange={e => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => { void ensureLoaded(); setOpen(true); }}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={e => { if (e.key === 'Escape') setOpen(false); }}
          placeholder="Search files, clients, documents, communications…"
          className="flex-1 text-sm outline-none bg-transparent text-foreground placeholder:text-foreground/40"
        />
        {q && (
          <button onMouseDown={e => e.preventDefault()} onClick={() => setQ('')} className="text-xs text-foreground/40 hover:text-foreground">
            clear
          </button>
        )}
      </div>

      {open && q.trim().length >= 2 && (
        <div className="absolute z-40 mt-1 w-full bg-white rounded-xl border border-gray-200 shadow-lg max-h-96 overflow-y-auto">
          {hits.length === 0 ? (
            <p className="p-4 text-sm text-foreground/50">{loading ? 'Loading…' : 'No matches.'}</p>
          ) : (
            (['Files', 'Clients', 'Documents', 'Communications'] as const).map(g => {
              const groupHits = hits.filter(h => h.group === g);
              if (groupHits.length === 0) return null;
              return (
                <div key={g}>
                  <p className="px-3 pt-3 pb-1 text-[11px] uppercase tracking-wide text-foreground/40 font-semibold">{g}</p>
                  {groupHits.map((h, i) => (
                    <button
                      key={g + i}
                      onMouseDown={e => e.preventDefault()}
                      onClick={() => { setOpen(false); navigate(h.route); }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-start gap-2"
                    >
                      <span className="mt-0.5 text-foreground/40">{groupIcon(g)}</span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-foreground truncate">{h.title}</span>
                        {h.subtitle && <span className="block text-xs text-foreground/50 truncate">{h.subtitle}</span>}
                      </span>
                    </button>
                  ))}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
