import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  UserPlus,
  MessageSquare,
  Calendar,
  DollarSign,
  FilePen,
  Eye,
  Clock,
} from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { formatDistanceToNow } from 'date-fns';

/**
 * Today's Inbox — single triage panel on the paralegal Overview.
 *
 * Aggregates last-24h activity across 5 sources:
 *   • New client intakes  (clientfiles created in last 24h)
 *   • Inbound messages    (messages where direction !== 'outbound')
 *   • New bookings        (bookings with status === 'pending')
 *   • Square receipts     (financialrecords created in last 24h)
 *   • Signed documents    (generateddocuments where status changed to 'Signed')
 *
 * Sorted newest-first, deduped, capped at 20 rows so the dashboard
 * doesn't get overwhelming. Each row links to the relevant module.
 *
 * Replaces the gap between the existing "Recent Messages" card
 * (which only shows messages) and the new dashboard-wide need to
 * see ALL incoming activity in one place — matching what an
 * email inbox does.
 */

interface InboxItem {
  id: string;
  kind:
    | 'intake'
    | 'message'
    | 'booking'
    | 'payment'
    | 'signature';
  title: string;
  subtitle: string;
  timestamp: Date;
  href?: string;
  read?: boolean;
}

const ICONS = {
  intake: UserPlus,
  message: MessageSquare,
  booking: Calendar,
  payment: DollarSign,
  signature: FilePen,
} as const;

const COLORS = {
  intake: 'text-emerald-600 bg-emerald-50',
  message: 'text-violet-600 bg-violet-50',
  booking: 'text-rose-600 bg-rose-50',
  payment: 'text-blue-600 bg-blue-50',
  signature: 'text-amber-600 bg-amber-50',
} as const;

const DAY_MS = 24 * 60 * 60 * 1000;

export default function TodaysInbox() {
  const [items, setItems] = useState<InboxItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cutoff = Date.now() - DAY_MS;

    const load = async () => {
      try {
        // Pull each source in parallel. Each query is wrapped in its
        // own catch so one collection failing doesn't blank the whole
        // inbox. Limit 100 each — anything past that and the practice
        // has bigger problems than the inbox card.
        const safe = <T,>(p: Promise<{ items: T[] }>): Promise<T[]> =>
          p.then((r) => r.items).catch(() => [] as T[]);

        const [
          files,
          messages,
          bookings,
          payments,
          docs,
        ] = await Promise.all([
          safe<any>(BaseCrudService.getAll('clientfiles', undefined, { limit: 100 })),
          safe<any>(BaseCrudService.getAll('messages', undefined, { limit: 100 })),
          safe<any>(BaseCrudService.getAll('bookings', undefined, { limit: 100 })),
          safe<any>(BaseCrudService.getAll('financialrecords', undefined, { limit: 100 })),
          safe<any>(BaseCrudService.getAll('generateddocuments', undefined, { limit: 100 })),
        ]);

        const out: InboxItem[] = [];

        for (const f of files) {
          const created = new Date(f.dateOpened || f._createdDate || 0).getTime();
          if (created < cutoff) continue;
          out.push({
            id: `f-${f._id}`,
            kind: 'intake',
            title: f.clientName || 'New intake',
            subtitle: `New ${f.matterType || 'matter'} file opened`,
            timestamp: new Date(created),
            href: `/admin/client-files?file=${f._id}`,
          });
        }

        for (const m of messages) {
          const sent = new Date(m.sentDate || m._createdDate || 0).getTime();
          if (sent < cutoff) continue;
          if ((m.direction || '').toLowerCase() === 'outbound') continue;
          out.push({
            id: `m-${m._id}`,
            kind: 'message',
            title: m.senderName || m.senderEmail || 'New message',
            subtitle: (m.messageContent || m.subject || '').slice(0, 70),
            timestamp: new Date(sent),
            href: '/paralegal-dashboard',
            read: m.read === true,
          });
        }

        for (const b of bookings) {
          if ((b.status || '').toLowerCase() !== 'pending') continue;
          const created = new Date(b._createdDate || b.requestedDate || 0).getTime();
          out.push({
            id: `b-${b._id}`,
            kind: 'booking',
            title: b.clientName || 'New booking request',
            subtitle: `Pending consultation — ${b.matterType || 'general'}`,
            timestamp: new Date(created),
            href: '/meeting-dashboard',
          });
        }

        for (const p of payments) {
          const created = new Date(p.transactionDate || p._createdDate || 0).getTime();
          if (created < cutoff) continue;
          // Only show inflows (Square deposits) — not internal transfers.
          const type = (p.transactionType || '').toLowerCase();
          if (!['trust_deposit', 'payment', 'billing'].includes(type)) continue;
          out.push({
            id: `p-${p._id}`,
            kind: 'payment',
            title: p.description?.slice(0, 50) || `Payment received`,
            subtitle: `$${(p.amount || 0).toFixed(2)} • Ref ${p.referenceNumber || '—'}`,
            timestamp: new Date(created),
            href: '/admin/payments',
          });
        }

        for (const d of docs) {
          // Surface freshly-signed documents.
          if ((d.status || '').toLowerCase() !== 'signed') continue;
          const signed = new Date(d.signedDate || d._updatedDate || d._createdDate || 0).getTime();
          if (signed < cutoff) continue;
          out.push({
            id: `d-${d._id}`,
            kind: 'signature',
            title: d.documentName || 'Document signed',
            subtitle: `Signed by ${d.clientName || d.clientEmail || 'client'}`,
            timestamp: new Date(signed),
            href: '/paralegal-dashboard',
          });
        }

        // Newest first, cap at 20.
        out.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        setItems(out.slice(0, 20));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-base font-semibold text-foreground flex items-center gap-2">
          <Inbox className="w-4 h-4 text-primary" aria-hidden="true" />
          Today's Inbox
        </h3>
        <span className="text-xs text-foreground/50">
          {loading ? '' : `${items.length} item${items.length === 1 ? '' : 's'}`}
        </span>
      </div>
      {loading ? (
        <div className="py-8 text-center text-sm text-foreground/40">Loading…</div>
      ) : items.length === 0 ? (
        <div className="py-8 text-center text-sm text-foreground/40">
          Quiet day so far. New intakes, replies, bookings, payments, and
          signatures will show up here as they come in.
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {items.map((item) => {
            const Icon = ICONS[item.kind];
            const Wrapper: any = item.href ? Link : 'div';
            return (
              <li key={item.id}>
                <Wrapper
                  {...(item.href ? { to: item.href } : {})}
                  className="flex items-start gap-3 py-2.5 hover:bg-gray-50 -mx-2 px-2 rounded-md transition-colors"
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${COLORS[item.kind]}`}
                  >
                    <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-foreground truncate">
                        {item.title}
                      </p>
                      <span className="text-[10px] text-foreground/40 flex items-center gap-0.5 flex-shrink-0">
                        <Clock className="w-2.5 h-2.5" aria-hidden="true" />
                        {formatDistanceToNow(item.timestamp, { addSuffix: false })}
                      </span>
                    </div>
                    <p className="text-xs text-foreground/60 truncate">
                      {item.subtitle}
                    </p>
                  </div>
                  {item.read === false && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                  )}
                </Wrapper>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
