import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Pen, X, Sparkles } from 'lucide-react';
import {
  getActiveParalegals,
  getParalegalById,
  DEFAULT_PARALEGAL_ID,
} from '@/lib/paralegals';

interface DocumentSignatureProps {
  documentId: string;
  documentName: string;
  /**
   * If supplied, the Quick Sign tab pre-selects this paralegal. Falls back
   * to DEFAULT_PARALEGAL_ID otherwise. The dropdown is always available so
   * either Jean-Francois or Candice can sign on the spot.
   */
  defaultParalegalId?: string;
  /**
   * Whether to show the "Quick Sign (cursive)" tab. Paralegals get this
   * to electronically sign with their cursive name; clients should sign
   * manually so we hide the tab in client-facing dialogs by passing
   * false. Defaults to true (paralegal-style).
   */
  enableQuickSign?: boolean;
  onSignatureComplete: (signatureData: SignatureData) => void;
  onCancel: () => void;
}

export interface SignatureData {
  signatureDataUrl: string;
  signedDate: string;
  signedTime: string;
  ipAddress: string;
  timestamp: Date;
  /** Identifier of the paralegal who signed (when Quick Sign was used). */
  signedByParalegalId?: string;
  /** Display name of the signer (cursive auto-sign or typed). */
  signedByParalegalName?: string;
  /** 'cursive' for auto-typed Allura signature, 'drawn' for canvas ink. */
  signatureMethod?: 'cursive' | 'drawn';
}

// Inject the Allura Google Font once per page so the cursive mode can
// render the paralegal's name in a flowing script. Using a stable id
// avoids inserting duplicate <link> tags if the dialog re-mounts.
const ALLURA_LINK_ID = 'cowork-allura-cursive-font';
function ensureAlluraLoaded() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(ALLURA_LINK_ID)) return;
  const link = document.createElement('link');
  link.id = ALLURA_LINK_ID;
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Allura&display=swap';
  document.head.appendChild(link);
}

export default function DocumentSignature({
  documentId,
  documentName,
  defaultParalegalId,
  enableQuickSign = true,
  onSignatureComplete,
  onCancel,
}: DocumentSignatureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [ipAddress, setIpAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Quick-sign (cursive auto-signature) state.
  //   signMode: 'quick' = pick a paralegal, render their cursive name on
  //     the canvas, and sign in one click. 'draw' = the existing manual
  //     stylus / mouse / finger flow.
  //   signedMethod: tracks how the current canvas ink got there so the
  //     downstream record knows whether it's drawn or typed.
  const [signMode, setSignMode] = useState<'quick' | 'draw'>(
    enableQuickSign ? 'quick' : 'draw'
  );
  // Resolve the initial paralegal id once. The caller often passes
  // `currentParalegalId` (a Wix user _id) or a doc.paralegalId that may
  // not match any kebab-case id in our PARALEGALS table — in that case
  // the <select> visually shows the first option (Jean-Francois) but
  // selectedParalegalId stays stuck on the bad value, and "Sign as ..."
  // throws "please choose a paralegal". Snap to a real id up front.
  const [selectedParalegalId, setSelectedParalegalId] = useState<string>(() => {
    if (defaultParalegalId && getParalegalById(defaultParalegalId)) {
      return defaultParalegalId;
    }
    if (getParalegalById(DEFAULT_PARALEGAL_ID)) {
      return DEFAULT_PARALEGAL_ID;
    }
    return getActiveParalegals()[0]?.id || '';
  });
  const [signedMethod, setSignedMethod] = useState<'cursive' | 'drawn' | null>(null);

  // Fetch IP address on mount
  useEffect(() => {
    fetchIPAddress();
    ensureAlluraLoaded();
  }, []);

  // Dynamic canvas sizing for better mobile experience.
  //
  // The canvas is rendered with `width="700" height="200"` so the internal
  // bitmap matches a desktop default — but the element is styled `w-full`
  // so the displayed width on a phone may be ~360px. Without resizing, a
  // touch at displayed-x=180 would land at internal-x=350 (the canvas
  // middle), the cursor and the drawn ink end up in different places, and
  // the result looks "messed up". We resize the canvas's internal bitmap
  // to match its displayed size (× devicePixelRatio for crispness) so 1
  // displayed pixel = 1 logical drawing pixel.
  //
  // The earlier implementation only resized on mount + on window resize.
  // That misses several real cases:
  //   1. Modal/dialog opens — the canvas renders at 0×0 first, then gets
  //      its real size when the dialog finishes its mount transition.
  //   2. Phone rotated — fires `resize` but on iOS Safari the `getBoundingClientRect`
  //      reads stale values until after a paint.
  //   3. Tablet split-screen change — same issue.
  //
  // Fix: use a ResizeObserver on the canvas itself, plus a one-shot
  // post-paint retry, so the bitmap always matches the real displayed size.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      // Skip if not yet laid out (modal still mounting)
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = window.devicePixelRatio || 1;

      // Stash any existing strokes so we don't wipe the user's ink on resize
      const ctx = canvas.getContext('2d');
      const oldImage = ctx && (canvas.width > 0 && canvas.height > 0)
        ? canvas.toDataURL()
        : null;

      // Set internal resolution to match displayed size × DPR
      canvas.width  = Math.round(rect.width  * dpr);
      canvas.height = Math.round(rect.height * dpr);

      // Reset transform and re-apply the DPR scale (resetTransform first
      // because a previous resize already applied a scale to the context)
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        // Re-stroke style after resize (canvas state is reset on resize)
        ctx.strokeStyle = '#1F2D5C';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Restore any prior drawing
        if (oldImage) {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 0, 0, rect.width, rect.height);
          };
          img.src = oldImage;
        }
      }
    };

    // Initial size
    resizeCanvas();

    // Re-run after the next paint to catch modal-open / iOS-stale cases.
    const raf = requestAnimationFrame(resizeCanvas);

    // ResizeObserver picks up element-size changes that don't fire `resize`
    // (modal mount, container reflow, parent layout change).
    const ro = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => resizeCanvas())
      : null;
    if (ro) ro.observe(canvas);

    // Window resize for desktop window resize / phone rotation
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('orientationchange', resizeCanvas);

    return () => {
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('orientationchange', resizeCanvas);
    };
  }, []);

  const fetchIPAddress = async () => {
    try {
      // Try to get IP from a public API
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setIpAddress(data.ip);
    } catch (error) {
      // Fallback to a placeholder if API fails
      console.error('Failed to fetch IP address:', error);
      setIpAddress('Unable to determine');
    }
  };

  // ----------------------------------------------------------------
  // Drawing state — kept in refs (not React state) so the native event
  // handlers attached below see fresh values without re-binding on every
  // render. React state setters still fire so the rest of the UI updates.
  // ----------------------------------------------------------------
  const isDrawingRef = useRef(false);

  /**
   * Get a touch/mouse point in canvas display coordinates. Returns null
   * if no point is available (e.g. touchend with no targetTouches).
   */
  const getCanvasPoint = (e: MouseEvent | TouchEvent): { x: number; y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    let clientX: number | undefined;
    let clientY: number | undefined;
    if ('touches' in e) {
      const t = e.touches[0] || e.changedTouches?.[0];
      if (!t) return null;
      clientX = t.clientX;
      clientY = t.clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // Mouse path only — touch is handled by the native listener below.
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      isDrawingRef.current = true;
      setIsDrawing(true);
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctx.beginPath();
      ctx.moveTo(x, y);
    } catch (error) {
      console.error('Error starting drawing:', error);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#1F2D5C';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
      setHasSignature(true);
    } catch (error) {
      console.error('Error drawing:', error);
    }
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
    setIsDrawing(false);
  };

  // ----------------------------------------------------------------
  // Native touch listeners with { passive: false }.
  //
  // React's onTouchStart / onTouchMove / onTouchEnd attach as PASSIVE
  // listeners by default in modern browsers. On a passive listener,
  // e.preventDefault() is a silent no-op, which means the browser still
  // treats finger movement on the canvas as a scroll gesture — and on
  // some devices it never even delivers the touchmove events to the
  // React handler because it decides early that the gesture is a scroll.
  //
  // The fix is to bypass React for touch and attach DOM listeners
  // directly with passive:false, so preventDefault actually stops the
  // scroll. Mouse events stay on the React side (no passive issue
  // there) so desktop signing keeps working as-is.
  // ----------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onTouchStart = (e: TouchEvent) => {
      // CRITICAL: preventDefault stops the page from interpreting this
      // touch as a scroll/tap. Must be passive:false for this to work.
      e.preventDefault();
      const ctx = canvas.getContext('2d');
      const pt = getCanvasPoint(e);
      if (!ctx || !pt) return;
      isDrawingRef.current = true;
      setIsDrawing(true);
      ctx.beginPath();
      ctx.moveTo(pt.x, pt.y);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDrawingRef.current) return;
      e.preventDefault();
      const ctx = canvas.getContext('2d');
      const pt = getCanvasPoint(e);
      if (!ctx || !pt) return;
      ctx.lineTo(pt.x, pt.y);
      ctx.strokeStyle = '#1F2D5C';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
      setHasSignature(true);
    };

    const onTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      isDrawingRef.current = false;
      setIsDrawing(false);
    };

    // passive:false is the key — without it preventDefault is a no-op.
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd, { passive: false });
    canvas.addEventListener('touchcancel', onTouchEnd, { passive: false });

    return () => {
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
      canvas.removeEventListener('touchcancel', onTouchEnd);
    };
  }, []);

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasSignature(false);
      setSignedMethod(null);
    } catch (error) {
      console.error('Error clearing signature:', error);
    }
  };

  /**
   * Render the chosen paralegal's display name on the canvas in flowing
   * Allura cursive. Auto-fits the font size so even long names stay
   * inside the box. Returns true on success.
   */
  const paintCursiveSignature = async (name: string): Promise<boolean> => {
    const canvas = canvasRef.current;
    if (!canvas || !name) return false;
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;

    // Wait for Allura to actually be ready — otherwise the first paint
    // falls back to a generic cursive and looks rough.
    if (typeof (document as any).fonts?.load === 'function') {
      try {
        await (document as any).fonts.load('72px "Allura"');
        await (document as any).fonts.ready;
      } catch {
        // Non-fatal — we'll still get a script-style fallback.
      }
    }

    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    // Clear any prior ink before stamping the cursive name.
    ctx.clearRect(0, 0, w, h);

    // Auto-shrink the font until the name fits within the canvas with a
    // sensible side margin. Starts at the natural size; longer names land
    // at smaller sizes automatically.
    const sideMargin = 24;
    const fontStack = '"Allura", "Segoe Script", "Brush Script MT", cursive';
    let size = Math.min(96, Math.floor(h * 0.72));
    ctx.fillStyle = '#1F2D5C';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    while (size > 24) {
      ctx.font = `${size}px ${fontStack}`;
      const measured = ctx.measureText(name).width;
      if (measured <= w - sideMargin * 2) break;
      size -= 4;
    }
    ctx.font = `${size}px ${fontStack}`;
    ctx.fillText(name, w / 2, h / 2);

    setHasSignature(true);
    setSignedMethod('cursive');
    return true;
  };

  /** "Quick Sign" tab handler — paint the selected paralegal's cursive name. */
  const handleQuickPaint = async () => {
    // Be forgiving: if selectedParalegalId got out of sync with the
    // option list (defaultParalegalId from caller didn't match any
    // known id), fall back to the first active paralegal instead of
    // throwing "please choose a paralegal" at the user. We also stamp
    // selectedParalegalId so the SignatureData payload carries the
    // right id downstream.
    let paralegal = getParalegalById(selectedParalegalId);
    if (!paralegal) {
      paralegal =
        getParalegalById(DEFAULT_PARALEGAL_ID) ||
        getActiveParalegals()[0];
      if (paralegal) setSelectedParalegalId(paralegal.id);
    }
    if (!paralegal) {
      setError('No paralegals are configured for electronic signing.');
      return;
    }
    setError('');
    const ok = await paintCursiveSignature(paralegal.displayName);
    if (!ok) {
      setError(
        'Could not render the cursive signature. Please try again or use Draw mode.'
      );
    }
  };

  const handleSubmit = async () => {
    if (!hasSignature) {
      setError('Please provide your signature before submitting');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const canvas = canvasRef.current;
      if (!canvas) {
        throw new Error('Canvas not found');
      }

      // Get signature as data URL
      const signatureDataUrl = canvas.toDataURL('image/png');

      // Get current date and time
      const now = new Date();
      const signedDate = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const signedTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      // Tag the signature with which paralegal signed and how (cursive
      // auto-sign vs hand-drawn). Downstream code can use this to log
      // who signed and to render an attestation block.
      const paralegal = signedMethod === 'cursive'
        ? getParalegalById(selectedParalegalId)
        : undefined;

      const signatureData: SignatureData = {
        signatureDataUrl,
        signedDate,
        signedTime,
        ipAddress,
        timestamp: now,
        signedByParalegalId: paralegal?.id,
        signedByParalegalName: paralegal?.displayName,
        signatureMethod: signedMethod || 'drawn',
      };

      onSignatureComplete(signatureData);
    } catch (err) {
      console.error('Failed to process signature:', err);
      setError('Failed to process signature. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="font-heading text-2xl flex items-center gap-2">
          <Pen className="w-6 h-6 text-primary" />
          Electronic Signature Required
        </CardTitle>
        <CardDescription className="font-paragraph">
          Please sign the document: <span className="font-semibold text-foreground">{documentName}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="font-paragraph text-red-800">{error}</p>
          </div>
        )}

        {/* Mode toggle — Quick Sign (cursive) vs Draw Manually. Hidden
            for client-facing signing flows where Quick Sign isn't
            appropriate (the cursive list is paralegal names). */}
        {enableQuickSign && (
        <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-gray-50">
          <button
            type="button"
            onClick={() => {
              setSignMode('quick');
              setError('');
            }}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
              signMode === 'quick'
                ? 'bg-white text-primary shadow-sm'
                : 'text-foreground/60 hover:text-foreground'
            }`}
          >
            <Sparkles className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />
            Quick Sign (cursive)
          </button>
          <button
            type="button"
            onClick={() => {
              setSignMode('draw');
              setError('');
            }}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
              signMode === 'draw'
                ? 'bg-white text-primary shadow-sm'
                : 'text-foreground/60 hover:text-foreground'
            }`}
          >
            <Pen className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />
            Draw Manually
          </button>
        </div>
        )}

        {signMode === 'quick' ? (
          // ---- Quick Sign — pick paralegal, click button, done ----
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
            <div>
              <h3 className="font-heading text-base font-bold text-foreground mb-1 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                Sign electronically with your cursive signature
              </h3>
              <p className="font-paragraph text-sm text-foreground/70">
                Choose which paralegal is signing and click the button —
                your name will appear in flowing cursive on the document.
                You can preview it below before submitting.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-3 md:items-end">
              <div className="flex-1 space-y-1">
                <label className="block font-paragraph font-semibold text-sm text-foreground">
                  Sign as
                </label>
                <select
                  value={selectedParalegalId}
                  onChange={(e) => {
                    setSelectedParalegalId(e.target.value);
                    // If they already painted a cursive signature, repaint
                    // with the new name so the preview stays in sync.
                    if (signedMethod === 'cursive') {
                      const next = getParalegalById(e.target.value);
                      if (next) paintCursiveSignature(next.displayName);
                    }
                  }}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  {getActiveParalegals().map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.displayName} (LSO #{p.lsoNumber})
                    </option>
                  ))}
                </select>
              </div>
              <Button
                type="button"
                onClick={handleQuickPaint}
                className="bg-primary hover:bg-primary/90 text-white font-semibold flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Sign as {(getParalegalById(selectedParalegalId)?.firstName) || 'paralegal'}
              </Button>
            </div>
          </div>
        ) : (
          // ---- Draw mode — original mouse/touch instructions ----
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-heading text-base font-bold text-foreground mb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              How to Sign
            </h3>
            <ul className="font-paragraph text-sm text-foreground/80 space-y-1 ml-7">
              <li>• Use your mouse or finger to draw your signature in the box below</li>
              <li>• Sign naturally as you would on paper</li>
              <li>• Click "Clear" if you want to start over</li>
              <li>• Click "Sign Document" when you're satisfied with your signature</li>
            </ul>
          </div>
        )}

        {/* Signature Canvas — used by BOTH modes (cursive paints into it,
             manual drawing also writes into it). */}
        <div className="space-y-3">
          <label className="block font-paragraph font-semibold text-foreground text-lg">
            {signMode === 'quick' ? 'Signature Preview *' : 'Your Signature *'}
          </label>
          <div className="border-2 border-dashed border-primary/40 rounded-lg overflow-hidden bg-white shadow-sm hover:border-primary/60 transition-colors">
            <canvas
              ref={canvasRef}
              // The width/height attrs are initial values only — the
              // useEffect above overrides them with the real displayed
              // size × DPR so 1 touch pixel = 1 drawing pixel.
              width={700}
              height={220}
              // In Quick Sign mode the canvas is read-only (no drawing);
              // we still set touchAction so a scroll gesture inside the
              // box scrolls the page instead of getting captured.
              style={{
                touchAction: signMode === 'quick' ? 'auto' : 'none',
                minHeight: '180px',
                aspectRatio: '700 / 220',
                display: 'block',
              }}
              className={`w-full select-none ${
                signMode === 'draw'
                  ? 'cursor-crosshair touch-none'
                  : 'cursor-default'
              }`}
              onMouseDown={signMode === 'draw' ? startDrawing : undefined}
              onMouseMove={signMode === 'draw' ? draw : undefined}
              onMouseUp={signMode === 'draw' ? stopDrawing : undefined}
              onMouseLeave={signMode === 'draw' ? stopDrawing : undefined}
              // Touch is handled by native listeners (see useEffect above)
              // because React touch events are passive — preventDefault is
              // a no-op on them so the browser still treats finger
              // movement as a scroll gesture. Don't add onTouchStart/
              // onTouchMove/onTouchEnd here or we'll double-handle.
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="font-paragraph text-sm text-foreground/60">
              {hasSignature ? (
                <span className="text-green-600 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  {signedMethod === 'cursive'
                    ? `Cursive signature ready for ${getParalegalById(selectedParalegalId)?.displayName || 'paralegal'}`
                    : 'Signature captured'}
                </span>
              ) : signMode === 'quick' ? (
                'Click "Sign as ..." above to render your cursive signature here'
              ) : (
                'Draw your signature in the box above'
              )}
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={clearSignature}
              disabled={!hasSignature}
              className="border-gray-300 text-foreground hover:bg-gray-50"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          </div>
        </div>

        {/* Signature Details */}
        <div className="bg-gradient-to-br from-pastelbeige/20 to-pastelgreen/20 rounded-lg p-6 border border-pastelbeige space-y-3">
          <h3 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            Signature Verification Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-paragraph text-sm">
            <div className="bg-white/60 rounded-lg p-3">
              <p className="text-foreground/60 mb-1 text-xs uppercase tracking-wide">Date</p>
              <p className="font-semibold text-foreground">
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div className="bg-white/60 rounded-lg p-3">
              <p className="text-foreground/60 mb-1 text-xs uppercase tracking-wide">Time</p>
              <p className="font-semibold text-foreground">
                {new Date().toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true,
                })}
              </p>
            </div>
            <div className="md:col-span-2 bg-white/60 rounded-lg p-3">
              <p className="text-foreground/60 mb-1 text-xs uppercase tracking-wide">IP Address</p>
              <p className="font-semibold text-foreground font-mono">
                {ipAddress || 'Loading...'}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-pastelbeige">
            <p className="font-paragraph text-xs text-foreground/70 leading-relaxed">
              By signing this document, you acknowledge that your electronic signature is legally binding 
              and equivalent to a handwritten signature. The signature, date, time, and IP address 
              will be permanently recorded and attached to this document as proof of your consent.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !hasSignature}
            className="bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg flex items-center gap-2 flex-1 shadow-lg hover:shadow-xl transition-all"
          >
            <CheckCircle className="w-5 h-5" />
            {isLoading ? 'Processing Signature...' : 'Sign Document'}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="border-gray-300 text-foreground hover:bg-gray-50 flex items-center gap-2 py-6"
          >
            <X className="w-5 h-5" />
            Cancel
          </Button>
        </div>

        {/* Additional Help */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="font-paragraph text-xs text-foreground/70 text-center">
            Having trouble? Make sure you're using a mouse or touch-enabled device. 
            Your signature should be clear and legible.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
