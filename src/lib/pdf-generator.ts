/**
 * Document Generation and Signature Embedding Utility
 * 
 * This utility provides functions to:
 * 1. Generate PDF documents from content
 * 2. Embed electronic signatures with metadata (date, time, IP) into documents
 * 
 * Uses HTML-to-PDF conversion for client-side PDF generation.
 */

import { SignatureData } from '@/components/DocumentSignature';

/**
 * Generates a PDF document from content
 * @param content - The text content to convert to PDF
 * @param documentName - Name of the document
 * @returns Base64 encoded PDF data URL
 */
export async function generatePDF(content: string, documentName: string): Promise<string> {
  const documentId = `DOC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const generatedDate = new Date().toLocaleString();

  // Check if content is HTML or plain text
  const isHtmlContent = content.trim().startsWith('<') || 
                        /<[a-z][\s\S]*>/i.test(content);

  // Create HTML content for PDF - ONLY the template content, no auto-generated headers
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    /* ----------------------------------------------------------------
     * PDF wrapper CSS — minimal-on-purpose.
     *
     * Modern templates (Traffic v4+, HRTO, LTB Tenant, A&D, Small
     * Claims, Cash-for-Keys) ship complete CSS as part of their HTML
     * body (Inter, 13.5px, navy headings, orange dividers, callout
     * boxes, etc.). The wrapper must NOT compete with them on body-
     * level typography (font-family, font-size, text-align).
     *
     * An earlier revision of this wrapper forced
     *   body  { font-family: 'Times New Roman'; font-size: 12pt; }
     *   .content { text-align: justify; }
     * Because .content outranks body in CSS specificity, the
     * template's text-align: left lost — every paragraph rendered
     * justified, words got stretched across the column with massive
     * gaps, only a few words fit per line, and the result was a 39-
     * page signed retainer of one-word-per-line garbage (Christophr
     * Campsall, Traffic v4.6, May 27 2026 — see Task #226).
     *
     * The wrapper now keeps ONLY page-level rules and the
     * .content.plain-text helper for legacy text-only documents
     * that have no template CSS of their own.
     *
     * IMPORTANT: this entire block is rendered inside a JS template
     * literal (the htmlContent backtick string), so DO NOT use
     * backticks anywhere in this comment — they terminate the
     * outer template literal and produce "Missing semicolon" Babel
     * parse errors at build time.
     * ---------------------------------------------------------------- */
    @page {
      size: letter;
      margin: 1in;
    }
    .content.plain-text {
      white-space: pre-wrap;
      font-family: 'Times New Roman', Times, serif;
      font-size: 12pt;
      line-height: 1.6;
      color: #000;
    }
    /* ------------------------------------------------------------
     * html2canvas whitespace-collapse defense.
     *
     * Symptom: words running together around <strong>, <b>, <em>
     * boundaries: "Terminationof Retainer", "writtennotice",
     * "settlementbetweenthe Tenantand". Visible on both pre-sign
     * and post-sign PDFs (the post-sign run amplifies it because
     * the cloned DOM is captured a second time).
     *
     * Root cause: html2canvas measures text run-by-run using the
     * browser's TextMetrics API. When font-kerning is enabled
     * (default for Inter at small sizes) the kerned-rendered
     * width of "X " (with trailing space) can be measured as the
     * non-kerned width of "X" — the trailing space is dropped,
     * so the next inline element renders flush against the
     * previous one.
     *
     * Fix: disable font-kerning globally for the rasterised DOM.
     * This affects ONLY the PDF (the templates in the live React
     * app keep their kerned rendering). Layout is otherwise
     * unchanged — Inter without kerning is visually nearly
     * identical at 13.5px — and word boundaries are now measured
     * the same way they're drawn.
     *
     * The universal "*" selector with !important is required to
     * override the templates' body-level font shorthand which
     * implicitly resets font-kerning on every descendant.
     * (No backticks anywhere in this comment — see the IMPORTANT
     *  note above; backticks would terminate the outer JS template
     *  literal and break the build with a Babel parse error, which
     *  is exactly what happened on 2026-05-29.)
     * ------------------------------------------------------------ */
    *, *::before, *::after {
      font-kerning: none !important;
      -webkit-font-kerning: none !important;
      font-feature-settings: "kern" 0 !important;
    }
  </style>
</head>
<body>
  <div class="content${isHtmlContent ? '' : ' plain-text'}">
${isHtmlContent ? content : escapeHtml(content)}
  </div>
</body>
</html>
  `;

  // Convert HTML to PDF using browser's print functionality
  const pdfDataUrl = await htmlToPDF(htmlContent);
  
  return pdfDataUrl;
}

/**
 * Embeds signature with metadata into a PDF document
 * @param originalDocDataUrl - The original document as a data URL
 * @param signatureData - Signature data including image, date, time, and IP
 * @param documentName - Name of the document
 * @returns Base64 encoded signed PDF data URL
 */
export async function embedSignatureInPDF(
  originalDocDataUrl: string,
  signatureData: SignatureData,
  documentName: string,
  /**
   * Optional: the underlying HTML body of the document. When the
   * original URL is a real PDF (the common case after we switched
   * htmlToPDF to produce real PDFs), there's no HTML to parse out of
   * the URL — pass the stored documentContent instead so we can
   * re-render with the signature appended.
   */
  originalHtmlContent?: string,
  /**
   * Optional: client-confirmed initials and the list of acknowledgment
   * section IDs that were initialed via PublicSignPage. When provided,
   * each `<div class="box" data-initial-target="<id>">INIT</div>` in
   * the document HTML whose `<id>` appears in `sectionIds` is rewritten
   * so the placeholder `INIT` text is replaced with the typed initials
   * (rendered in cursive via the `.initialled` class added by the
   * template's CSS). This persists the per-section client initials
   * into the final signed PDF.
   */
  initialsPayload?: { initials: string; sectionIds: string[] },
  /**
   * Optional: explicit display name of the person signing the document.
   * When provided, this is used in the "Electronically signed by ___"
   * line under the signature image. If omitted, falls back to
   * `signatureData.signedByParalegalName`, then to "Client".
   *
   * PublicSignPage passes the signer's full name here so the certificate
   * block correctly identifies the client instead of showing the
   * generic "Client" placeholder.
   */
  signerNameOverride?: string,
): Promise<string> {
  const documentId = `DOC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const signedDate = new Date().toISOString();

  // Extract the original document content. Three sources, in order of
  // preference:
  //   1. Caller-supplied HTML (most reliable, used after the htmlToPDF
  //      switch — the document URL is now a binary PDF, not HTML).
  //   2. data:text/html;base64,... — legacy URLs from before the
  //      htmlToPDF rewrite.
  //   3. Empty fallback (we'll still produce a one-page signature
  //      receipt PDF so the signing flow doesn't crash).
  let originalContent = '';
  if (originalHtmlContent && originalHtmlContent.trim()) {
    originalContent = originalHtmlContent;
  } else {
    try {
      if (originalDocDataUrl.startsWith('data:text/html;base64,')) {
        const base64Content = originalDocDataUrl.split(',')[1];
        const decodedContent = decodeURIComponent(escape(atob(base64Content)));

        // Parse the original HTML to extract just the content section
        const parser = new DOMParser();
        const doc = parser.parseFromString(decodedContent, 'text/html');
        const contentDiv = doc.querySelector('.content');

        if (contentDiv) {
          originalContent = contentDiv.innerHTML;
        } else {
          // Fallback: extract body content if .content div not found
          const bodyContent = doc.querySelector('body');
          if (bodyContent) {
            originalContent = bodyContent.innerHTML;
          }
        }
      }
    } catch (error) {
      console.error('Error extracting original document content:', error);
      originalContent = '<p>Original document content could not be extracted.</p>';
    }
  }

  // ----------------------------------------------------------------
  // Per-section initialing: for each section ID confirmed by the
  // client on PublicSignPage, find the matching
  //   <div class="box" data-initial-target="<id>">INIT</div>
  // and replace the inner "INIT" with the typed initials, plus add
  // the `initialled` class so the template's CSS renders them in
  // cursive (Allura). No-op if `initialsPayload` is not supplied or
  // the document HTML doesn't contain any `[data-initial-target]`
  // boxes (older templates).
  // ----------------------------------------------------------------
  if (
    initialsPayload &&
    initialsPayload.initials &&
    Array.isArray(initialsPayload.sectionIds) &&
    initialsPayload.sectionIds.length > 0 &&
    originalContent
  ) {
    const safeInitials = escapeHtml(initialsPayload.initials);
    const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    for (const sectionId of initialsPayload.sectionIds) {
      if (!sectionId) continue;
      const pattern = new RegExp(
        `(<div\\b[^>]*\\bdata-initial-target\\s*=\\s*["']${escapeRegex(sectionId)}["'][^>]*>)([\\s\\S]*?)(</div>)`,
        'gi'
      );
      originalContent = originalContent.replace(pattern, (_match, open, _inner, close) => {
        // Append the `initialled` class so the template CSS rule
        // .ack-list .box.initialled { ... } picks it up.
        let opened: string;
        if (/class\s*=\s*["'][^"']*["']/i.test(open)) {
          opened = open.replace(/class\s*=\s*["']([^"']*)["']/i, (_m: string, cls: string) => {
            if (/\binitialled\b/.test(cls)) return `class="${cls}"`;
            return `class="${cls.trim()} initialled"`;
          });
        } else {
          opened = open.replace(/^<div\b/, '<div class="initialled"');
        }
        return `${opened}${safeInitials}${close}`;
      });
    }
  }

  // Define signature placeholders in order of priority
  const placeholders = ['{SIGNATURE_SECTION}', '{SIGNATURE}', '{{SIGNATURE}}'];
  
  // Find the first placeholder that exists in the template
  let foundPlaceholder = null;
  for (const placeholder of placeholders) {
    if (originalContent.includes(placeholder)) {
      foundPlaceholder = placeholder;
      break;
    }
  }

  // Get signer name with precedence:
  //   1. Explicit override passed by the caller (e.g. PublicSignPage
  //      passes the client's full name from the sign-token flow).
  //   2. signatureData.signedByParalegalName — set by DocumentSignature
  //      when Quick Sign was used (cursive auto-signature).
  //   3. Fallback to a generic "Client" label.
  //
  // This replaces the previous hard-coded "Client" string which caused
  // every signed document — including Authorization & Direction — to
  // display "Electronically signed by Client" regardless of who actually
  // signed it.
  const signerName =
    (signerNameOverride && signerNameOverride.trim()) ||
    (signatureData.signedByParalegalName && signatureData.signedByParalegalName.trim()) ||
    'Client';
  
  // ----------------------------------------------------------------
  // Build the signature artifacts. We need TWO things:
  //   (A) The signature image itself, sized to drop into the empty
  //       `<div class="sig-area"></div>` inside the Client Signature
  //       card of the LTB / HRTO / Warranty templates.
  //   (B) A compact e-signature audit trail (date, time, IP, cert
  //       statement) that goes BELOW the signature row — not as a
  //       new "Section 6" with its own page break.
  //
  // The previous implementation only emitted one big "6. ELECTRONIC
  // SIGNATURE" block and appended it to the end of the document,
  // which left the Client Signature card empty on page 20 and created
  // an orphaned page 21. This version drops the image into the card
  // and adds a small footer audit-trail block right after the
  // signature row.
  // ----------------------------------------------------------------
  let sigImgHtml = '';
  let auditTrailHtml = '';
  if (signatureData.signatureDataUrl) {
    // The image is sized to match the paralegal cursive slot in the
    // sig-card. Template CSS for the paralegal:
    //   .sig-card .cursive { min-height: 36px; margin: 8px 0 0; ... }
    // We mirror those values here so the client signature visually
    // occupies the same vertical space as the paralegal's cursive
    // signature. crossorigin="anonymous" lets html2canvas rasterise
    // without tainting the canvas; explicit width+height tell the
    // browser to reserve layout before the image decodes (otherwise
    // html2canvas can capture a zero-height box).
    sigImgHtml =
      `<img src="${signatureData.signatureDataUrl}" alt="Client Signature" ` +
      `crossorigin="anonymous" ` +
      `style="display:block;max-width:260px;max-height:46px;width:auto;height:auto;margin:0;padding:0;" />`;
    auditTrailHtml = `
    <div style="margin: 10px 0 6px; padding: 10px 14px; background: #fdfaf3; ` +
      `border: 1px solid #e2e8f0; border-radius: 6px; font: 500 10pt/1.3 Inter, Arial, sans-serif; ` +
      `color: #374151; page-break-inside: avoid;">
      <div style="font: 700 9pt/1.2 Inter, sans-serif; color: #6b7280; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 6px;">Electronic Signature Audit Trail</div>
      <div style="font-size: 10pt; line-height: 1.4; color: #1f2937;">Electronically signed by <strong>${escapeHtml(signerName)}</strong></div>
      <div style="display: table; width: 100%; margin-top: 6px; font-size: 9.5pt;">
        <div style="display: table-row;">
          <div style="display: table-cell; width: 50%; padding-right: 8px; padding-bottom: 3px;"><strong>Date:</strong> ${escapeHtml(signatureData.signedDate)}</div>
          <div style="display: table-cell; width: 50%; padding-left: 8px; padding-bottom: 3px;"><strong>IP Address:</strong> ${escapeHtml(signatureData.ipAddress)}</div>
        </div>
        <div style="display: table-row;">
          <div style="display: table-cell; width: 50%; padding-right: 8px;"><strong>Time:</strong> ${escapeHtml(signatureData.signedTime)}</div>
          <div style="display: table-cell; width: 50%; padding-left: 8px;"><strong>Timestamp:</strong> ${signatureData.timestamp.toISOString()}</div>
        </div>
      </div>
      <div style="margin-top: 6px; font-size: 8.5pt; color: #6b7280; font-style: italic;">This document has been electronically signed. The signature, date, time, and IP address have been permanently affixed to this document.</div>
    </div>`;
  }

  // Legacy combined block kept for templates that use the
  // {SIGNATURE} / {SIGNATURE_SECTION} placeholders. Newer LTB / HRTO /
  // Warranty templates do NOT use these placeholders — they have a
  // proper Client Signature card with an empty <div class="sig-area">.
  let signatureBlockHtml = '';
  if (signatureData.signatureDataUrl) {
    signatureBlockHtml = `
    <div style="margin-top: 24px; page-break-before: avoid;">
      <div style="border: 1px solid #000; padding: 12px; background: #ffffff; margin-bottom: 12px;">
        ${sigImgHtml}
        <div style="border-top: 1px solid #000; margin-top: 8px; padding-top: 4px; font-size: 10pt; line-height: 1.2;">Electronically signed by ${escapeHtml(signerName)}</div>
      </div>
      ${auditTrailHtml}
    </div>`;
  }
  if (!signatureBlockHtml || signatureBlockHtml.trim() === '') {
    signatureBlockHtml = '__SIGNATURE_NOT_AVAILABLE__';
  }

  // ----------------------------------------------------------------
  // PRIMARY embed path: target the LTB / HRTO / Warranty template's
  // Client Signature card directly. Each of those templates has this
  // structure (line-broken for readability):
  //
  //   <div class="sig-card">
  //     <div class="lab">Client Signature</div>
  //     <div class="sig-area"></div>     <-- drop the image here
  //     <div class="line"></div>
  //     <div class="name">{CLIENT_NAME}</div>
  //     ...
  //   </div>
  //
  // We find the FIRST `<div class="sig-area"></div>` (the Client side
  // — the Paralegal side uses `.cursive`, not `.sig-area`) and stuff
  // the signature image into it. Then we insert the audit-trail
  // block immediately after the `<div class="signature-row">...</div>`
  // wrapper so it appears below the cards on the same page.
  // ----------------------------------------------------------------
  let finalContent: string;
  let usedCardEmbed = false;
  if (signatureData.signatureDataUrl && sigImgHtml) {
    // Try multiple patterns to maximise the chance of matching the
    // real CMS-stored HTML, which may have minor whitespace, quote,
    // or attribute-order variations from the canonical template.
    // Each pattern is tried in turn until one matches.
    const sigAreaPatterns: RegExp[] = [
      /<div\s+class\s*=\s*["']sig-area["']\s*>\s*<\/div>/i,
      /<div\s+class\s*=\s*["']sig-area["'][^>]*>\s*<\/div>/i,
      /<div[^>]*\bclass\s*=\s*["'][^"']*\bsig-area\b[^"']*["'][^>]*>\s*<\/div>/i,
    ];
    let matchedPattern: RegExp | null = null;
    for (const p of sigAreaPatterns) {
      if (p.test(originalContent)) {
        matchedPattern = p;
        break;
      }
    }
    if (matchedPattern) {
      // 1. Replace the empty sig-area with a sig-area containing the
      //    client's signature image. The replacement div uses the
      //    EXACT same inline layout as the paralegal `.cursive` slot
      //    on the other side of the row, so the two signatures sit at
      //    the same vertical position above their respective lines.
      const replacement =
        `<div class="sig-area" ` +
        `style="min-height:46px;margin:8px 0 0;padding:0;` +
        `display:flex;align-items:flex-end;justify-content:flex-start;` +
        `overflow:hidden;">${sigImgHtml}</div>`;
      let withCardImg = originalContent.replace(matchedPattern, replacement);

      // 1b. Replace the client-sign-date placeholder with today's
      //     date. Template uses <div class="date client-sign-date">Date: To be
      //     recorded on signing</div>. We rewrite it to "Date: <signed date>"
      //     using the same `signedDate` computed at line 167 (above).
      //     Display format: a friendly long form like "May 25, 2026".
      const signedDateDisplay = new Date(signedDate).toLocaleDateString('en-CA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const clientDatePatterns: RegExp[] = [
        // Most specific: class list contains client-sign-date
        /<div[^>]*\bclass\s*=\s*["'][^"']*\bclient-sign-date\b[^"']*["'][^>]*>[^<]*<\/div>/i,
      ];
      for (const pat of clientDatePatterns) {
        if (pat.test(withCardImg)) {
          withCardImg = withCardImg.replace(
            pat,
            `<div class="date client-sign-date">Date: ${signedDateDisplay}</div>`
          );
          // eslint-disable-next-line no-console
          console.log(
            '[pdf-generator] Stamped client signing date into .client-sign-date: ' +
              signedDateDisplay
          );
          break;
        }
      }

      // 2. Insert the audit-trail block immediately BEFORE the
      //    .doc-footer so it lands below the signature row on the
      //    same page.
      const docFooterIdx = withCardImg.search(/<div\s+class\s*=\s*["']doc-footer["']/i);
      if (docFooterIdx !== -1) {
        withCardImg =
          withCardImg.slice(0, docFooterIdx) +
          auditTrailHtml +
          withCardImg.slice(docFooterIdx);
      } else {
        withCardImg = withCardImg + auditTrailHtml;
      }
      finalContent = withCardImg;
      usedCardEmbed = true;
      // eslint-disable-next-line no-console
      console.log(
        '[pdf-generator] Embedded client signature into <div class="sig-area"> ' +
          'using pattern: ' + matchedPattern.source
      );
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        '[pdf-generator] No <div class="sig-area"> match found in the document HTML — ' +
          'falling back to legacy placeholder / append path. The Client Signature card ' +
          'will be empty unless the template includes either the sig-area div or a ' +
          '{SIGNATURE} placeholder.'
      );
      finalContent = originalContent;
    }
  } else {
    finalContent = originalContent;
  }

  // SECONDARY: legacy {SIGNATURE} / {SIGNATURE_SECTION} placeholders.
  if (!usedCardEmbed) {
    if (foundPlaceholder) {
      finalContent = originalContent.replace(foundPlaceholder, signatureBlockHtml);
      if (finalContent.includes(foundPlaceholder)) {
        console.error('Signature placeholder replacement failed - placeholder still exists');
        finalContent = originalContent.split(foundPlaceholder).join(signatureBlockHtml);
      }
    } else {
      // LAST RESORT: append at the end. Should never hit this for
      // LTB / HRTO / Warranty templates.
      finalContent = originalContent + signatureBlockHtml;
    }
  }

  // Final verification: ensure NO placeholders remain in the final content
  const allPlaceholders = ['{SIGNATURE_SECTION}', '{SIGNATURE}', '{{SIGNATURE}}'];
  for (const placeholder of allPlaceholders) {
    if (finalContent.includes(placeholder)) {
      console.error(`Warning: Placeholder ${placeholder} still exists in final content after replacement`);
      // Force remove any remaining placeholders
      finalContent = finalContent.split(placeholder).join(signatureBlockHtml);
    }
  }

  // Create HTML content for signed PDF - ONLY template content + signature, no auto-generated headers
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    /* ----------------------------------------------------------------
     * PDF wrapper CSS — minimal-on-purpose.
     *
     * Modern templates (Traffic v4+, HRTO, LTB Tenant, A&D, Small
     * Claims, Cash-for-Keys) ship complete CSS as part of their HTML
     * body (Inter, 13.5px, navy headings, orange dividers, callout
     * boxes, etc.). The wrapper must NOT compete with them on body-
     * level typography (font-family, font-size, text-align).
     *
     * An earlier revision of this wrapper forced
     *   body  { font-family: 'Times New Roman'; font-size: 12pt; }
     *   .content { text-align: justify; }
     * Because .content outranks body in CSS specificity, the
     * template's text-align: left lost — every paragraph rendered
     * justified, words got stretched across the column with massive
     * gaps, only a few words fit per line, and the result was a 39-
     * page signed retainer of one-word-per-line garbage (Christophr
     * Campsall, Traffic v4.6, May 27 2026 — see Task #226).
     *
     * The wrapper now keeps ONLY page-level rules and the
     * .content.plain-text helper for legacy text-only documents
     * that have no template CSS of their own.
     *
     * IMPORTANT: this entire block is rendered inside a JS template
     * literal (the htmlContent backtick string), so DO NOT use
     * backticks anywhere in this comment — they terminate the
     * outer template literal and produce "Missing semicolon" Babel
     * parse errors at build time.
     * ---------------------------------------------------------------- */
    @page {
      size: letter;
      margin: 1in;
    }
    .content.plain-text {
      white-space: pre-wrap;
      font-family: 'Times New Roman', Times, serif;
      font-size: 12pt;
      line-height: 1.6;
      color: #000;
    }
    /* ------------------------------------------------------------
     * html2canvas whitespace-collapse defense.
     *
     * Symptom: words running together around <strong>, <b>, <em>
     * boundaries: "Terminationof Retainer", "writtennotice",
     * "settlementbetweenthe Tenantand". Visible on both pre-sign
     * and post-sign PDFs (the post-sign run amplifies it because
     * the cloned DOM is captured a second time).
     *
     * Root cause: html2canvas measures text run-by-run using the
     * browser's TextMetrics API. When font-kerning is enabled
     * (default for Inter at small sizes) the kerned-rendered
     * width of "X " (with trailing space) can be measured as the
     * non-kerned width of "X" — the trailing space is dropped,
     * so the next inline element renders flush against the
     * previous one.
     *
     * Fix: disable font-kerning globally for the rasterised DOM.
     * This affects ONLY the PDF (the templates in the live React
     * app keep their kerned rendering). Layout is otherwise
     * unchanged — Inter without kerning is visually nearly
     * identical at 13.5px — and word boundaries are now measured
     * the same way they're drawn.
     *
     * The universal "*" selector with !important is required to
     * override the templates' body-level font shorthand which
     * implicitly resets font-kerning on every descendant.
     * (No backticks anywhere in this comment — see the IMPORTANT
     *  note above; backticks would terminate the outer JS template
     *  literal and break the build with a Babel parse error, which
     *  is exactly what happened on 2026-05-29.)
     * ------------------------------------------------------------ */
    *, *::before, *::after {
      font-kerning: none !important;
      -webkit-font-kerning: none !important;
      font-feature-settings: "kern" 0 !important;
    }
  </style>
</head>
<body>
  <div class="content">
${finalContent}
  </div>
</body>
</html>
  `;

  // ----------------------------------------------------------------
  // Pre-decode the signature data-URL image BEFORE handing the HTML to
  // html2canvas. Without this, the html2canvas rasteriser frequently
  // captures the <img> tag while the inline data: URL is still decoding
  // and produces an empty signature box in the final PDF (this is the
  // root cause of "missing signature on Authorization & Direction" and
  // similar reports).
  //
  // We force the browser to actually decode the image into the image
  // cache here; html2canvas's own cloned <img> draws from that decoded
  // cache instantly when it captures.
  // ----------------------------------------------------------------
  if (signatureData.signatureDataUrl) {
    try {
      await new Promise<void>((resolve) => {
        const img = new Image();
        // The data: URL has no cross-origin concerns, but set this
        // anyway so html2canvas's later capture doesn't taint.
        img.crossOrigin = 'anonymous';
        const done = () => resolve();
        img.onload = done;
        img.onerror = done; // resolve on error rather than reject —
                            // we'd still rather emit a PDF than crash
                            // the whole signing flow.
        img.src = signatureData.signatureDataUrl;
        // Belt-and-suspenders: if decode() exists, await it explicitly.
        if (typeof (img as any).decode === 'function') {
          (img as any).decode().then(done).catch(done);
        }
        // Hard timeout in case neither load/error fires (very rare for
        // data: URLs, but defends against a stuck Promise).
        setTimeout(done, 2000);
      });
    } catch {
      /* non-fatal — fall through to render */
    }
  }

  // Convert HTML to PDF
  const signedPdfDataUrl = await htmlToPDF(htmlContent);

  return signedPdfDataUrl;
}

/**
 * Force-download a PDF given either a data URL or a cross-origin
 * https URL (e.g. a Wix Media CDN URL). Defaults to .pdf extension
 * because htmlToPDF now produces real PDFs.
 *
 * For cross-origin https URLs we fetch as a Blob and download via
 * blob: URL - the HTML download attribute is unreliable across
 * origins (Chrome silently ignores it for some Wix CDN responses
 * because Content-Disposition is set to inline).
 */
export async function downloadPDF(dataUrl: string, filename: string): Promise<void> {
  // Default to .pdf - the previous behaviour of defaulting to .html
  // was a bug: it forced PDFs to be saved with an .html extension,
  // which made them unopenable.
  const finalFilename =
    filename.endsWith('.pdf') || filename.endsWith('.html')
      ? filename
      : `${filename}.pdf`;

  // For data: URLs the download attribute works fine.
  if (dataUrl.startsWith('data:')) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = finalFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  // For cross-origin https URLs (Wix Media CDN), fetch as blob and
  // download that. This bypasses the inline Content-Disposition header
  // that Wix Media often returns.
  try {
    const resp = await fetch(dataUrl, { credentials: 'omit' });
    if (!resp.ok) {
      throw new Error(`Could not fetch the file (HTTP ${resp.status}).`);
    }
    const blob = await resp.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = finalFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // Release the blob URL after the click - small delay to let the
    // browser kick off the download.
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
  } catch (err: any) {
    // Last-ditch: just open the URL in a new tab. The user will see
    // the PDF inline and can save manually.
    window.open(dataUrl, '_blank', 'noopener,noreferrer');
    // eslint-disable-next-line no-console
    console.error('downloadPDF blob fallback failed; opened in new tab:', err);
  }
}

/**
 * Validates if a string is a valid PDF or HTML data URL
 * @param dataUrl - The data URL to validate
 * @returns True if valid document data URL
 */
export function isValidPDFDataUrl(dataUrl: string): boolean {
  return dataUrl.startsWith('data:application/pdf;base64,') || 
         dataUrl.startsWith('data:text/html;base64,');
}

/**
 * Helper function to escape HTML special characters
 * @param text - Text to escape
 * @returns Escaped text
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Converts an HTML string into a real, multi-page PDF data URL.
 *
 * Implementation: html2canvas + jsPDF, with smart page-break snapping.
 *
 * Why not `pdf.html()`? Earlier versions of this function tried jsPDF's
 * built-in html() method (with autoPaging:'text') as the preferred
 * path. That method silently produced blank PDFs when the source host
 * was positioned off-screen with `left: -10000px`, so the user got an
 * empty document with no error in the console. The full-page canvas
 * + smart slicing approach below is the reliable path: it always
 * produces a real PDF and we keep paragraph/heading boundaries intact
 * by snapping each page cut up to the nearest block-element boundary.
 *
 * Returns a `data:application/pdf;base64,...` URL - so View, Download,
 * Print, and Email actions all see a true .pdf payload and behave the
 * way a paralegal expects.
 */
async function htmlToPDF(htmlContent: string): Promise<string> {
  // Lazy-load the libs so SSR builds don't pull them into Cloudflare Workers.
  const jsPDFMod: any = await import('jspdf');
  const html2canvasMod: any = await import('html2canvas');
  const jsPDF = jsPDFMod.jsPDF || jsPDFMod.default || jsPDFMod;
  const html2canvas = html2canvasMod.default || html2canvasMod;

  // ----------------------------------------------------------------
  // Extract the <body> markup out of the full document. Templates we
  // produce wrap the content in <!doctype html><html><head>...<body>;
  // we pull out just the body so we can render it inside a hidden div
  // in the HOST document. Rendering inside the host (rather than an
  // iframe) is what html2canvas works reliably with - iframe-mounted
  // content frequently fails or returns empty canvases on iOS Safari
  // and inside Cloudflare Worker hosts.
  // ----------------------------------------------------------------
  const parser = new DOMParser();
  const parsed = parser.parseFromString(htmlContent, 'text/html');
  const bodyHtml = parsed.body ? parsed.body.innerHTML : htmlContent;

  // Pull <style> blocks from the parsed <head> and re-inject them
  // alongside the body markup so the template's CSS still applies.
  const styleTags = parsed.head ? Array.from(parsed.head.querySelectorAll('style')) : [];
  const styleHtml = styleTags.map((s) => `<style>${s.innerHTML}</style>`).join('\n');

  // Make sure the Allura cursive font is loaded in the host document
  // so the paralegal signature renders correctly. Idempotent - only
  // appends once per page life.
  if (!document.getElementById('cowork-allura-cursive-font')) {
    const link = document.createElement('link');
    link.id = 'cowork-allura-cursive-font';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Allura&display=swap';
    document.head.appendChild(link);
  }

  // On-screen container. We render the host with `opacity: 0` and
  // `pointer-events: none` so it is fully invisible to the user but
  // still has a real layout box that html2canvas can rasterise.
  //
  // We deliberately do NOT use `visibility: hidden` here. Some
  // versions of html2canvas skip elements with `visibility: hidden`
  // and produce a completely blank canvas in production.
  //
  // We also deliberately do NOT push the host far off-screen with
  // `left: -10000px`. iOS Safari and some browsers compute clip
  // rectangles from getBoundingClientRect and return an empty canvas
  // when the source is far outside the viewport.
  //
  // Belt-and-suspenders: we also use html2canvas's `onclone` hook to
  // promote the host to fully visible in the cloned DOM that
  // html2canvas captures - so even if the live host's opacity:0
  // confuses a rasteriser, the cloned copy is plainly visible.
  const HOST_MARK = `pdf-host-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
  const host = document.createElement('div');
  host.setAttribute('data-pdf-host', HOST_MARK);
  host.style.position = 'absolute';
  host.style.left = '0';
  host.style.top = '0';
  host.style.width = '816px';      // 8.5in x 96dpi
  host.style.minHeight = '1056px'; // 11in x 96dpi
  host.style.background = '#ffffff';
  host.style.opacity = '0';
  host.style.pointerEvents = 'none';
  host.style.zIndex = '-1';
  host.setAttribute('aria-hidden', 'true');
  // Page-break hints first (so the template's CSS can still override),
  // then the template styles, then the actual body.
  const pageBreakCss = `
    h1, h2, h3, h4, h5, h6 { page-break-after: avoid; break-after: avoid; }
    table, tr, .signature-block, [data-keep-together] {
      page-break-inside: avoid; break-inside: avoid;
    }
    p, li { orphans: 3; widows: 3; }
  `;
  host.innerHTML =
    `<style>${pageBreakCss}</style>` +
    styleHtml +
    `<div data-pdf-content>${bodyHtml}</div>`;
  document.body.appendChild(host);

  try {
    // Wait for fonts (Allura, etc.) + a paint tick before screenshotting.
    if ((document as any).fonts?.ready) {
      try { await (document as any).fonts.ready; } catch { /* non-fatal */ }
    }
    await new Promise((r) => requestAnimationFrame(() => r(null)));

    // Wait for every <img> inside the host to actually finish decoding
    // before we hand the DOM to html2canvas. The signature image is a
    // data: URL injected dynamically; if html2canvas runs before it
    // decodes, the Client Signature card renders empty. Each image is
    // awaited explicitly (load+decode) with a hard timeout so we never
    // hang forever on a broken image.
    try {
      const imgs = Array.from(host.querySelectorAll('img'));
      await Promise.all(
        imgs.map(
          (img) =>
            new Promise<void>((resolve) => {
              const finish = () => resolve();
              const timeout = setTimeout(finish, 2000);
              const done = () => {
                clearTimeout(timeout);
                if (typeof (img as any).decode === 'function') {
                  (img as any).decode().then(finish).catch(finish);
                } else {
                  finish();
                }
              };
              if (img.complete && img.naturalWidth > 0) {
                done();
              } else {
                img.addEventListener('load', done, { once: true });
                img.addEventListener('error', finish, { once: true });
              }
            })
        )
      );
    } catch {
      /* non-fatal */
    }
    await new Promise((r) => setTimeout(r, 120));

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'letter',
      compress: true,
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // ----------------------------------------------------------------
    // Full-page canvas screenshot, then slice into page-height strips.
    // Snaps each page break UP to the nearest safe gap between block
    // elements so paragraphs and signature blocks don't get cut in
    // half across pages.
    // ----------------------------------------------------------------
    const canvas = await html2canvas(host, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      windowWidth: 816,
      logging: false,
      // Force the cloned host to be fully visible so html2canvas
      // captures the content even if the live host is opacity:0 or
      // otherwise visually suppressed. Also defuse two failure modes
      // that have broken signature rendering in production:
      //   (1) `Cannot read properties of null (reading 'cssRules')`
      //       from html2canvas trying to read cross-origin CSS in the
      //       cloned doc — we strip those <link> tags from the clone.
      //   (2) Dynamically-injected <img data-pdf-sig> tags that
      //       hadn't fully decoded in the live DOM before clone — we
      //       re-set the src in the clone and await decode there.
      onclone: async (clonedDoc: Document) => {
        const clonedHost = clonedDoc.querySelector(
          `[data-pdf-host="${HOST_MARK}"]`
        ) as HTMLElement | null;
        if (clonedHost) {
          clonedHost.style.opacity = '1';
          clonedHost.style.visibility = 'visible';
          clonedHost.style.display = 'block';
          clonedHost.style.zIndex = 'auto';
          clonedHost.style.position = 'static';
        }
        // Strip cross-origin stylesheets from the clone to avoid the
        // `Cannot read properties of null (reading 'cssRules')` error.
        // Only inline <style> tags survive, which is fine because all
        // template/document CSS is already inline-injected.
        try {
          const links = clonedDoc.querySelectorAll(
            'link[rel="stylesheet"], link[as="style"]'
          );
          links.forEach((l) => {
            try { l.parentNode?.removeChild(l); } catch { /* */ }
          });
        } catch { /* */ }
        // Re-decode every <img> in the clone so the signature data:URL
        // is fully decoded into the offscreen DOM that html2canvas
        // captures from. Belt-and-braces with the parent-DOM image
        // await: the cloned <img> elements are SEPARATE DOM nodes and
        // may not inherit the parent's decoded image cache in every
        // browser.
        try {
          const clonedImgs = Array.from(
            (clonedHost || clonedDoc.body).querySelectorAll('img')
          );
          await Promise.all(
            clonedImgs.map(
              (img) =>
                new Promise<void>((resolve) => {
                  const finish = () => resolve();
                  const timeout = setTimeout(finish, 1500);
                  const done = () => {
                    clearTimeout(timeout);
                    if (typeof (img as any).decode === 'function') {
                      (img as any).decode().then(finish).catch(finish);
                    } else {
                      finish();
                    }
                  };
                  if (img.complete && img.naturalWidth > 0) {
                    done();
                  } else {
                    img.addEventListener('load', done, { once: true });
                    img.addEventListener('error', finish, { once: true });
                  }
                })
            )
          );
        } catch { /* */ }
      },
    });

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Diagnostic: log canvas dimensions so we can see in DevTools
    // whether html2canvas produced something or returned empty.
    // eslint-disable-next-line no-console
    console.log('[htmlToPDF] canvas size:', canvas?.width, 'x', canvas?.height);

    // Sanity check: if the canvas came back empty (zero-pixel image)
    // or the rendered content is all-white (host invisible to the
    // rasteriser), emit a placeholder PDF so the caller can show a
    // useful error instead of a silent blank doc.
    const looksBlank = (() => {
      if (!canvas || canvas.width === 0 || canvas.height === 0) return true;
      try {
        const ctx = canvas.getContext('2d');
        if (!ctx) return false;
        // Sample a small slice of pixels - if every pixel is white,
        // the host content didn't make it into the rasterised canvas.
        const sample = ctx.getImageData(
          0,
          0,
          Math.min(canvas.width, 200),
          Math.min(canvas.height, 200)
        );
        const data = sample.data;
        for (let i = 0; i < data.length; i += 4) {
          // Any non-white pixel means we have content.
          if (data[i] < 250 || data[i + 1] < 250 || data[i + 2] < 250) {
            return false;
          }
        }
        return true;
      } catch {
        return false;
      }
    })();

    if (looksBlank) {
      // eslint-disable-next-line no-console
      console.error(
        '[htmlToPDF] canvas appears blank (sampled pixels all white). ' +
          'Host element may not have been captured by html2canvas.'
      );
      pdf.setFontSize(12);
      pdf.text(
        'Document content could not be rendered. Please contact support.',
        40,
        80
      );
      return pdf.output('datauristring') as string;
    }

    const fullImg = canvas.toDataURL('image/jpeg', 0.95);

    // Find Y coordinates of safe break points in the host content.
    // Two flavours, both mapped from host pixels to canvas pixels
    // (factor 2 because html2canvas scale: 2):
    //
    //   1. Section TOPS (h1/h2/h3/h4) — cut here so the next page
    //      starts with the heading. Strongly preferred so headings
    //      aren't sliced in half across pages.
    //   2. Block BOTTOMS (p, table, ul, ol, hr, signature-block) —
    //      cut here so we end a page at a paragraph boundary.
    //
    // Without (1) the old algorithm could only snap to ends of blocks
    // and so frequently cut headings mid-character ("CONTINGENCY FEE
    // TERMS (IF APPLICABLE)" → "AND ALL APPLICABLE" on the next page).
    const hostRect = host.getBoundingClientRect();
    const sectionTops: number[] = [];
    const blockBottoms: number[] = [];
    // Forced page-break candidates — elements that MUST start a new
    // page. Marked with class="page-break-before" or
    // data-pagebreak-before="true" in the template. Overrides MIN_FILL.
    const forcedBreaks: number[] = [];

    // "Danger zones" — Y ranges (in canvas pixels) where a horizontal
    // page cut would slice through the middle of a heading. Any cut
    // candidate that falls inside one of these zones MUST be pulled
    // back up to the top of the zone so the heading lands on the next
    // page. Each zone is widened by an 8-px buffer on either side so
    // we don't cut right at the heading's edge either.
    const dangerZones: Array<[number, number]> = [];
    host
      .querySelectorAll('h1, h2, h3, h4')
      .forEach((el) => {
        const r = (el as HTMLElement).getBoundingClientRect();
        const top = (r.top - hostRect.top) * 2;
        const bottom = (r.bottom - hostRect.top) * 2;
        if (bottom > 0 && top < canvas.height) {
          sectionTops.push(top);
          // Widened from 16 → 60 canvas px (~30 px CSS). This is the
          // "no cut" buffer around every heading. The 16px buffer was
          // too narrow — when a heading had any meaningful margin-top
          // (28px for h2) the cut could land between the previous
          // paragraph and the heading, orphaning the heading. 60px
          // covers the heading + first ~2 lines of content, so the
          // algorithm always pushes the heading + first paragraph
          // together to the next page rather than orphaning the
          // heading on the previous page.
          dangerZones.push([top - 60, bottom + 60]);
        }
      });
    // Sort danger zones by top edge for fast lookup.
    dangerZones.sort((a, b) => a[0] - b[0]);

    /**
     * If `y` falls inside any heading's danger zone, return the
     * coordinate just ABOVE that zone (so the heading appears on the
     * next page). Otherwise return `y` unchanged.
     */
    const avoidHeadingSlice = (y: number): number => {
      for (const [lo, hi] of dangerZones) {
        if (y > lo && y < hi) return lo;
      }
      return y;
    };

    host
      .querySelectorAll(
        '.page-break-before, [data-pagebreak-before="true"]'
      )
      .forEach((el) => {
        const r = (el as HTMLElement).getBoundingClientRect();
        const yInCanvas = (r.top - hostRect.top) * 2;
        if (yInCanvas > 0 && yInCanvas < canvas.height) {
          forcedBreaks.push(yInCanvas);
        }
      });

    host
      .querySelectorAll(
        // Added `li` so the cut algorithm can land between bullet
        // items, not only at the end of the whole <ul>/<ol>. Without
        // this, a list that overflows the page would split MID-BULLET
        // because the algorithm only saw the list's bottom as a cut
        // candidate — and that was past the page boundary.
        'p, table, hr, ul, ol, li, .signature-block, [data-keep-together]'
      )
      .forEach((el) => {
        const r = (el as HTMLElement).getBoundingClientRect();
        const yInCanvas = (r.bottom - hostRect.top) * 2;
        if (yInCanvas > 0 && yInCanvas < canvas.height) {
          blockBottoms.push(yInCanvas);
        }
      });

    // Atomic blocks marked `data-atomic="true"` (signature blocks,
    // initials tables, etc.) cannot be cut through. Add their full
    // [top, bottom] range to dangerZones so any cut landing inside
    // gets pulled to the top (pushing the element to the next page).
    host
      .querySelectorAll('[data-atomic="true"]')
      .forEach((el) => {
        const r = (el as HTMLElement).getBoundingClientRect();
        const top = (r.top - hostRect.top) * 2;
        const bottom = (r.bottom - hostRect.top) * 2;
        if (bottom > 0 && top < canvas.height) {
          dangerZones.push([top - 8, bottom + 8]);
        }
      });
    dangerZones.sort((a, b) => a[0] - b[0]);

    // End-of-section markers — OPPOSITE behaviour to dangerZones.
    // A `.end-marker` is the closing visual stamp on a section. It
    // MUST stay on the same page as the section's last content
    // paragraph; it must NEVER be orphaned to the top of the next
    // page (which is what was happening when end-markers were
    // pushed into dangerZones — the pull-UP behaviour evicted the
    // marker forward instead of keeping it with its section).
    //
    // We register each marker's [top, bottom] in a separate
    // `endMarkerZones` array and apply a "push past" pass after
    // the heading-slice safety check. If the chosen cut lands
    // inside a marker OR within ~24 px just before it (which would
    // orphan the marker), the cut is shifted DOWN to right after
    // the marker so the marker rides on the current page.
    const endMarkerZones: Array<[number, number]> = [];
    host.querySelectorAll('.end-marker').forEach((el) => {
      const r = (el as HTMLElement).getBoundingClientRect();
      const top = (r.top - hostRect.top) * 2;
      const bottom = (r.bottom - hostRect.top) * 2;
      if (bottom > 0 && top < canvas.height) {
        endMarkerZones.push([top, bottom]);
      }
    });
    endMarkerZones.sort((a, b) => a[0] - b[0]);

    /**
     * If `y` falls inside an end-marker OR within ~24 px just
     * before one, return the coordinate just AFTER the marker
     * (marker rides on the current page with its section).
     * Otherwise return `y` unchanged.
     */
    const keepMarkerWithSection = (y: number): number => {
      for (const [top, bottom] of endMarkerZones) {
        // Case 1: cut lands inside the marker → would split it.
        // Case 2: cut lands just BEFORE the marker → would orphan
        //         it to the next page. 24 px in canvas coords
        //         (~12 CSS px) is the empirical threshold — wide
        //         enough to catch typical "natural break right
        //         before the marker" cuts, tight enough not to
        //         disturb breaks that are well above the marker.
        if (y >= top - 24 && y < bottom + 4) {
          return bottom + 4;
        }
      }
      return y;
    };

    sectionTops.sort((a, b) => a - b);
    blockBottoms.sort((a, b) => a - b);
    forcedBreaks.sort((a, b) => a - b);

    const canvasPerPage = (pageHeight * canvas.width) / imgWidth;
    // Minimum acceptable page fill ratio. If we accept ANY break point
    // however far above target the resulting pages are sometimes
    // only 30 % full; if we accept ONLY breaks right at target we
    // cut mid-paragraph. 0.55 is a pragmatic middle — pages will be
    // at least 55 % full but we still respect natural boundaries.
    const MIN_FILL = 0.55;

    const breaks: number[] = [0];
    let currentY = 0;
    while (currentY + canvasPerPage < canvas.height) {
      const target = currentY + canvasPerPage;
      const minCut = currentY + canvasPerPage * MIN_FILL;

      // Preference 0 (highest): forced page-break-before element
      // within (currentY+100, target+50% page]. These OVERRIDE
      // MIN_FILL so a section marked .page-break-before always
      // starts on a new page regardless of how short the previous
      // page becomes. Window widened from 15% → 50% — the narrow
      // window meant that when a long-paragraph section (e.g. §6
      // tail with Refunds/Contingency text) pushed the next forced
      // break past +15%, the algorithm silently dropped the forced
      // break and fell through to a mid-content cut. 50% lets the
      // algorithm look further ahead and honor the forced break.
      let cutAt = forcedBreaks
        .find((p) => p > currentY + 100 && p <= target + canvasPerPage * 0.50) ?? -1;

      // Preference 1: section top within [minCut, target] — page
      // ends right before a heading on the next page.
      if (cutAt < 0) {
        cutAt = [...sectionTops]
          .reverse()
          .find((p) => p > minCut && p <= target) ?? -1;
      }

      // Preference 2: block bottom within [minCut, target] — page
      // ends at a paragraph/table boundary.
      if (cutAt < 0) {
        cutAt = [...blockBottoms]
          .reverse()
          .find((p) => p > minCut && p <= target) ?? -1;
      }

      // Last resort: NEVER cut mid-content. STRONGLY prefer the last
      // block bottom BEFORE target over any block bottom AFTER target.
      // The old "pick whichever is closer" rule could pick an overflow
      // point that cut a wrapping paragraph in half — even a 50-px
      // overflow can split a paragraph across a page boundary because
      // html2canvas renders the paragraph as a flat bitmap and the
      // block-bottom array only marks where the paragraph ENDS, not
      // where its individual line boxes are.
      //
      // New rule: always use beforeTarget if it exists. This may
      // produce slightly shorter pages but guarantees clean paragraph
      // boundaries. Only fall back to afterTarget (or to target as a
      // last resort) when beforeTarget is undefined (e.g. the canvas
      // starts with a paragraph that's taller than one page).
      if (cutAt < 0) {
        const beforeTarget = [...blockBottoms]
          .filter((p) => p > currentY + 100 && p <= target)
          .pop();
        const afterTarget = blockBottoms.find((p) => p > target);

        if (beforeTarget !== undefined) {
          // Always prefer ending the page at a clean paragraph break.
          cutAt = beforeTarget;
        } else if (afterTarget !== undefined && afterTarget <= target + canvasPerPage * 0.20) {
          // No clean break BEFORE target — overflow slightly to find one.
          cutAt = afterTarget;
        } else {
          // Genuinely no clean cut available — cut at target. Rare.
          cutAt = target;
        }
      }

      // FINAL SAFETY: pull the cut UP if it would slice through any
      // heading's danger zone. This catches all the paths above —
      // forced breaks, sectionTops, blockBottoms, and the last-resort
      // target fallback — so headings can never be cut in half.
      const safeCut = avoidHeadingSlice(cutAt);
      // Only apply if it doesn't shrink the page below the MIN_FILL
      // threshold or push us backwards (sanity check).
      if (safeCut > currentY + 100 && safeCut <= cutAt) {
        cutAt = safeCut;
      }

      // FINAL SAFETY #2: end-marker push-past. After all of the
      // pull-UP logic above, the cut may now land just before or
      // inside an end-marker (heading protection often pulls cuts
      // back to ~60 px above the next section's heading — and the
      // marker sits right there). Push DOWN past the marker so it
      // stays glued to its section's content on the current page.
      //
      // The 8 % overflow allowance is the safety valve: if pushing
      // past the marker would overflow the page by more than 8 %
      // (rare — marker is only ~72 canvas px tall), we leave the
      // cut where it is and accept the orphan rather than producing
      // visible content clipping at the page bottom.
      const markerCut = keepMarkerWithSection(cutAt);
      if (
        markerCut !== cutAt &&
        markerCut <= currentY + canvasPerPage * 1.08
      ) {
        cutAt = markerCut;
      }

      breaks.push(cutAt);
      currentY = cutAt;
    }
    breaks.push(canvas.height);

    // Render each segment to its own page.
    const totalPages = breaks.length - 1;
    for (let i = 0; i < totalPages; i++) {
      if (i > 0) pdf.addPage();
      const segH = breaks[i + 1] - breaks[i];
      if (segH <= 0) continue;
      const segCanvas = document.createElement('canvas');
      segCanvas.width = canvas.width;
      segCanvas.height = segH;
      const ctx = segCanvas.getContext('2d');
      if (ctx) {
        // CRITICAL: paint the segCanvas white BEFORE drawing the strip.
        // JPEG (used below at toDataURL) does NOT support transparency,
        // so any transparent pixel in the source canvas renders as
        // pure BLACK in the output JPEG. Tall documents (post-signature
        // with embedded image + audit trail) can push html2canvas past
        // the browser canvas-size limit and leave transparent regions.
        // Without this white fill, those regions come out as fully
        // black pages alternating with white-content pages.
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, segH);
        ctx.drawImage(canvas, 0, breaks[i], canvas.width, segH, 0, 0, canvas.width, segH);
        const segImg = segCanvas.toDataURL('image/jpeg', 0.95);
        const segImgHeightOnPage = (segH * imgWidth) / canvas.width;
        pdf.addImage(segImg, 'JPEG', 0, 0, imgWidth, segImgHeightOnPage, undefined, 'FAST');
      } else {
        // Last-ditch: emit the full image with the old behaviour.
        pdf.addImage(
          fullImg,
          'JPEG',
          0,
          -((breaks[i] * imgWidth) / canvas.width),
          imgWidth,
          imgHeight,
          undefined,
          'FAST'
        );
      }

      // -----------------------------------------------------------------
      // PAGE NUMBER — drawn programmatically at the bottom-center of every
      // page after the canvas slice has been added. Format: "Page X of Y".
      // This runs on EVERY retainer that uses pdf-generator (Traffic, LTB,
      // Small Claims, HRTO, Warranty, A&D, etc.) — page numbers become a
      // global feature.
      // -----------------------------------------------------------------
      const pageNum = i + 1;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(107, 114, 128); // var(--mute) #6b7280
      pdf.text(
        `Page ${pageNum} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 6,
        { align: 'center' }
      );
      pdf.setTextColor(0, 0, 0); // reset for any subsequent draws
    }

    return pdf.output('datauristring') as string;
  } finally {
    host.remove();
  }
}
