import { useEffect, useRef, useState } from 'react';

/**
 * Loads Square's Web Payments SDK from the right CDN (sandbox vs prod),
 * mounts a card form into a target div, and exposes a `tokenize()` method
 * that returns a one-time card nonce. The nonce is then POSTed to the
 * server-side `/api/square/create-payment` endpoint, which actually
 * charges the card. Raw card data never touches our server.
 *
 * POSTAL CODE — IMPORTANT:
 * Square's Web Payments SDK auto-detects the buyer's browser locale to
 * label its postal-code field. A US-locale buyer paying our Canadian
 * merchant gets "ZIP". To force "Postal Code" for our Canadian clients
 * we (a) render our own labelled input *above* Square's iframe and
 * (b) suppress Square's own postal-code field where the SDK allows.
 * At tokenize time we pass our captured value through the `billingContact`
 * argument so Square uses our value for AVS verification regardless of
 * what is or isn't in its iframe.
 */

declare global {
  interface Window {
    Square?: any;
  }
}

export interface SquareCardFormHandle {
  /**
   * Tokenizes the card. Returns the source id on success, or null and a
   * non-null error message on failure. Errors include validation issues
   * (e.g. invalid card number) and network problems.
   */
  tokenize: () => Promise<{ token: string | null; errorMessage: string | null }>;
}

interface PublicSquareConfig {
  environment: 'sandbox' | 'production';
  applicationId: string;
  locationId: string;
  sdkUrl: string;
}

interface SquareCardFormProps {
  /** Called once when the SDK is ready and the card form has mounted. */
  onReady?: () => void;
  /** Called when the SDK fails to initialize. */
  onError?: (message: string) => void;
  /** Optional CSS class on the container. */
  className?: string;
  /**
   * Imperative handle — the parent stores this and calls `handle.tokenize()`
   * when the user clicks "Pay".
   */
  handleRef?: React.MutableRefObject<SquareCardFormHandle | null>;
}

let sdkLoaderPromise: Promise<void> | null = null;
function loadSquareSdk(sdkUrl: string): Promise<void> {
  if (typeof window !== 'undefined' && window.Square) return Promise.resolve();
  if (sdkLoaderPromise) return sdkLoaderPromise;
  sdkLoaderPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${sdkUrl}"]`
    );
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Failed to load Square SDK')));
      if (window.Square) resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = sdkUrl;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Square SDK'));
    document.head.appendChild(script);
  });
  return sdkLoaderPromise;
}

/** Loose validator for a Canadian postal code (A1A 1A1 / A1A1A1). */
function isValidCanadianPostal(s: string): boolean {
  return /^[A-Za-z]\d[A-Za-z][\s-]?\d[A-Za-z]\d$/.test(s.trim());
}

/** Normalize "M5V1A1" or "m5v 1a1" to "M5V 1A1". */
function normalizePostal(s: string): string {
  const cleaned = s.toUpperCase().replace(/[\s-]/g, '');
  if (cleaned.length !== 6) return s.trim();
  return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
}

export default function SquareCardForm({
  onReady,
  onError,
  className,
  handleRef,
}: SquareCardFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<any>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [postalCode, setPostalCode] = useState('');
  const postalCodeRef = useRef('');

  // Keep ref in sync with state so the imperative tokenize() handler always
  // reads the latest value (without re-creating the handle on every keystroke).
  useEffect(() => {
    postalCodeRef.current = postalCode;
  }, [postalCode]);

  useEffect(() => {
    let cancelled = false;
    let card: any = null;

    async function init() {
      try {
        // 1) Fetch our public Square config (env-aware) from the server.
        const cfgRes = await fetch('/api/square/config');
        const cfgJson = await cfgRes.json();
        if (!cfgJson?.success || !cfgJson?.config) {
          throw new Error(cfgJson?.error || 'Square is not configured on the server.');
        }
        const cfg: PublicSquareConfig = cfgJson.config;

        // 2) Load the matching Square Web Payments SDK from the CDN.
        await loadSquareSdk(cfg.sdkUrl);
        if (cancelled) return;
        if (!window.Square) throw new Error('Square SDK did not initialize.');

        // 3) Create a Payments instance + Card.
        //    `country: 'CA'` is a hint to the SDK to use Canadian conventions
        //    where it can. We don't rely on it — we override postal code at
        //    tokenize time anyway — but it doesn't hurt.
        const payments = window.Square.payments(cfg.applicationId, cfg.locationId);
        card = await payments.card({
          // Suppress Square's built-in postal-code field. The SDK accepts a
          // pre-filled value here; if we pass our own (we do, at tokenize
          // time via billingContact), the field is non-functional. Plus we
          // hide it visually via the style override below.
          postalCode: ' ',
          style: {
            input: {
              fontSize: '16px',
              color: '#111827',
            },
            '.input-container': {
              borderRadius: '8px',
              borderColor: '#D1D5DB',
            },
            '.input-container.is-focus': {
              borderColor: '#B94A1F', // primary terracotta
            },
            '.input-container.is-error': {
              borderColor: '#DC2626',
            },
            '.message-text': {
              color: '#6B7280',
            },
            '.message-icon': {
              color: '#6B7280',
            },
          },
        });
        if (cancelled) return;
        await card.attach(containerRef.current!);

        // Hide Square's postal-code field in the iframe via a parent-side CSS
        // injection. Square uses ARIA labels we can target by data-attr.
        // This is a belt-and-suspenders move: even if SDK still renders the
        // field, the user never sees it, so they only interact with our own
        // labelled input above. (Square's iframe sandboxes its content, so
        // we target the wrapper element in OUR document, not inside it.)
        try {
          const host = containerRef.current;
          if (host) {
            const style = document.createElement('style');
            style.setAttribute('data-square-hide-postal', 'true');
            style.textContent = `
              [data-testid="postalCode-input"],
              .sq-postal-code,
              .sq-card-component[data-field="postalCode"] {
                display: none !important;
              }
            `;
            host.appendChild(style);
          }
        } catch {
          /* non-fatal */
        }

        cardRef.current = card;
        setStatus('ready');
        onReady?.();
      } catch (err: any) {
        const msg = err?.message || 'Failed to load card form.';
        setStatus('error');
        setErrorMessage(msg);
        onError?.(msg);
      }
    }
    init();

    return () => {
      cancelled = true;
      // Detach the card form so it doesn't leak between mounts.
      try {
        cardRef.current?.destroy?.();
      } catch {
        /* noop */
      }
    };
    // We intentionally only init once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Expose the imperative tokenize() to the parent via the handleRef.
  useEffect(() => {
    if (!handleRef) return;
    handleRef.current = {
      tokenize: async () => {
        const card = cardRef.current;
        if (!card) {
          return { token: null, errorMessage: 'Card form is not ready yet.' };
        }
        const enteredPostal = postalCodeRef.current.trim();
        if (!enteredPostal) {
          return { token: null, errorMessage: 'Please enter your postal code.' };
        }
        if (!isValidCanadianPostal(enteredPostal)) {
          return {
            token: null,
            errorMessage: 'Postal code must be in Canadian format (A1A 1A1).',
          };
        }
        try {
          // Pass the user-entered postal code through `billingContact`. Square
          // uses this value for AVS verification regardless of what (if
          // anything) is in its own postal-code field. This is the
          // authoritative path — guarantees our captured value reaches the
          // gateway labelled as Canadian postal code, no matter what the
          // SDK iframe shows.
          const result = await card.tokenize({
            billingContact: {
              postalCode: normalizePostal(enteredPostal),
              countryCode: 'CA',
            },
          });
          if (result.status === 'OK' && result.token) {
            return { token: result.token, errorMessage: null };
          }
          const firstError = Array.isArray(result.errors) && result.errors[0];
          const msg =
            firstError?.message ||
            firstError?.field ||
            'Card details are not valid. Please double-check and try again.';
          return { token: null, errorMessage: msg };
        } catch (err: any) {
          return { token: null, errorMessage: err?.message || 'Failed to tokenize card.' };
        }
      },
    };
    return () => {
      if (handleRef.current) handleRef.current = null;
    };
  }, [handleRef]);

  return (
    <div className={className}>
      {status === 'loading' && (
        <div className="text-sm text-foreground/60 py-3">Loading secure card form…</div>
      )}
      {status === 'error' && (
        <div className="text-sm text-destructive py-3">
          {errorMessage || 'Could not load card form.'}
        </div>
      )}

      {/* Our own postal-code input — clearly labelled, Canadian-format.
          We control this 100% (no Square iframe), so the label always
          says "Postal Code" no matter what the buyer's browser locale
          claims. Value is forwarded to Square at tokenize time via
          billingContact. */}
      <div className="mb-4">
        <label
          htmlFor="legal-assist-postal-code"
          className="block text-sm font-paragraph font-semibold text-foreground mb-1"
        >
          Postal Code
        </label>
        <input
          id="legal-assist-postal-code"
          type="text"
          inputMode="text"
          autoComplete="postal-code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
          placeholder="A1A 1A1"
          maxLength={7}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary uppercase tracking-wider"
          disabled={status !== 'ready'}
        />
        <p className="mt-1 text-xs text-foreground/50">
          Canadian format. Your card&rsquo;s billing postal code.
        </p>
      </div>

      <div ref={containerRef} />

      <p className="mt-2 text-xs text-foreground/50">
        Your card details are encrypted and tokenized by Square &mdash; they never touch Legal Assist&rsquo;s servers.
      </p>
    </div>
  );
}
