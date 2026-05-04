import { useEffect, useRef, useState } from 'react';

/**
 * Loads Square's Web Payments SDK from the right CDN (sandbox vs prod),
 * mounts a card form into a target div, and exposes a `tokenize()` method
 * that returns a one-time card nonce. The nonce is then POSTed to the
 * server-side `/api/square/create-payment` endpoint, which actually
 * charges the card. Raw card data never touches our server.
 *
 * Designed to be controlled by the parent — the parent owns "Pay" button,
 * loading state, and error display, so this component focuses purely on
 * card collection + tokenization.
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

        // 3) Create a Payments instance + Card and attach to our div.
        //
        //    NOTE on `postalCode`: by default the Square Web Payments SDK
        //    derives the postal-code field's label from the *buyer's*
        //    browser locale, not from the merchant location. That means
        //    a US-locale buyer paying a Canadian firm sees "ZIP". We
        //    enable `includeInputLabels: true` so Square renders explicit
        //    text labels above each field — those labels say "Postal
        //    Code" (not "ZIP") for our Canadian merchant location, which
        //    is the correct terminology for our clients.
        const payments = window.Square.payments(cfg.applicationId, cfg.locationId);
        card = await payments.card({
          includeInputLabels: true,
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
        try {
          const result = await card.tokenize();
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
          return { token: nul