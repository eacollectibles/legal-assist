import { useMemo, useState } from 'react';
import { Copy, Check, AlertCircle, Mail } from 'lucide-react';
import { buildEtransferInstructions } from '@/lib/etransfer';

/**
 * EtransferOption — collapsible "Pay by Interac e-Transfer" tile
 * shown on the public pay page alongside the Square card form.
 *
 * Saves the firm ~$44 per $1,500 retainer vs Square (2.9%+$0.30
 * vs Interac's $0.50 flat).
 *
 * The client gets a copyable recipient email + a copyable
 * reference number that the paralegal uses to match the incoming
 * auto-deposit notification to the right matter.
 */

export default function EtransferOption({
  amountDollars,
  fileId,
  clientId,
  clientName,
}: {
  amountDollars: number;
  fileId?: string;
  clientId?: string;
  clientName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<'' | 'email' | 'ref'>('');

  const inst = useMemo(
    () => buildEtransferInstructions({ amountDollars, fileId, clientId, clientName }),
    [amountDollars, fileId, clientId, clientName],
  );

  const copy = (text: string, which: 'email' | 'ref') => {
    try {
      navigator.clipboard?.writeText(text);
      setCopied(which);
      setTimeout(() => setCopied(''), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 mt-6">
      <button
        type="button"
        className="w-full text-left p-5 flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <div>
          <div className="font-heading font-semibold text-foreground flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-700" aria-hidden="true" />
            Or pay by Interac e-Transfer
          </div>
          <p className="text-xs text-foreground/60 mt-1">
            Lower processing fee · most Canadian banks · auto-deposit
          </p>
        </div>
        <span className="text-xs text-emerald-700 font-medium">
          {open ? 'Hide' : 'Show'} instructions
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5">
          {amountDollars <= 0 ? (
            <div className="text-sm text-foreground/60 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Enter an amount above to generate
              your reference number.
            </div>
          ) : (
            <>
              {/* Copyable email + ref */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <p className="text-[10px] uppercase tracking-wide text-foreground/50 mb-1">
                    Send to email
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-sm text-foreground break-all">
                      {inst.recipientEmail}
                    </code>
                    <button
                      onClick={() => copy(inst.recipientEmail, 'email')}
                      className="p-1.5 rounded hover:bg-gray-100 flex-shrink-0"
                      title="Copy email"
                    >
                      {copied === 'email' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-foreground/50" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <p className="text-[10px] uppercase tracking-wide text-foreground/50 mb-1">
                    Reference / memo
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-sm font-mono font-bold text-foreground">
                      {inst.referenceNumber}
                    </code>
                    <button
                      onClick={() => copy(inst.referenceNumber, 'ref')}
                      className="p-1.5 rounded hover:bg-gray-100 flex-shrink-0"
                      title="Copy reference"
                    >
                      {copied === 'ref' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-foreground/50" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <ol className="list-decimal pl-5 space-y-1.5 text-sm text-foreground/80">
                {inst.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>

              <p className="text-xs text-foreground/60 mt-4 bg-white rounded-md p-3 border border-gray-100">
                <strong>Important:</strong> include the reference number{' '}
                <code className="font-mono">{inst.referenceNumber}</code> in
                the memo so we can apply your payment to the right matter.
                If you forget, email us a screenshot of your confirmation.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
