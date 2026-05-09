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
    @page {
      size: letter;
      margin: 1in;
    }
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 12pt;
      line-height: 1.6;
      color: #000;
      margin: 0;
      padding: 0;
    }
    .content {
      margin: 0;
      text-align: justify;
    }
    .content.plain-text {
      white-space: pre-wrap;
    }
    /* HTML content styling */
    .content h1 {
      font-size: 16pt;
      font-weight: bold;
      margin: 20px 0 10px 0;
    }
    .content h2 {
      font-size: 14pt;
      font-weight: bold;
      margin: 18px 0 8px 0;
    }
    .content h3 {
      font-size: 13pt;
      font-weight: bold;
      margin: 16px 0 6px 0;
    }
    .content p {
      margin: 10px 0;
    }
    .content ul, .content ol {
      margin: 10px 0;
      padding-left: 30px;
    }
    .content li {
      margin: 5px 0;
    }
    .content table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
    }
    .content table th,
    .content table td {
      border: 1px solid #000;
      padding: 8px;
      text-align: left;
    }
    .content table th {
      background-color: #f0f0f0;
      font-weight: bold;
    }
    .content strong {
      font-weight: bold;
    }
    .content em {
      font-style: italic;
    }
    .content u {
      text-decoration: underline;
    }
    .content hr {
      border: none;
      border-top: 1px solid #000;
      margin: 20px 0;
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

  // Get signer name from signature data (if available) or use a default
  const signerName = 'Client'; // You can pass this as a parameter if needed
  
  // Create the signature HTML block following traditional legal document layout
  let signatureBlockHtml = '';
  
  // Build signature block with traditional legal formatting
  if (signatureData.signatureDataUrl) {
    signatureBlockHtml = `
    <div style="margin-top: 40px; page-break-before: avoid;">
      <h2 style="font-size: 12pt; font-weight: bold; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 0.5px;">6. ELECTRONIC SIGNATURE</h2>
      
      <div style="border: 1px solid #000; padding: 12px; background: #ffffff; margin-bottom: 12px;">
        <img src="${signatureData.signatureDataUrl}" alt="Electronic Signature" style="max-width: 300px; max-height: 60px; display: block; margin: 0;" />
        <div style="border-top: 1px solid #000; margin-top: 8px; padding-top: 4px; font-size: 10pt; line-height: 1.2;">Electronically signed by ${escapeHtml(signerName)}</div>
      </div>

      <div style="display: table; width: 100%; margin-bottom: 12px; font-size: 10pt; line-height: 1.2;">
        <div style="display: table-row;">
          <div style="display: table-cell; width: 50%; padding-right: 8px; padding-bottom: 6px;"><strong>Date:</strong> ${escapeHtml(signatureData.signedDate)}</div>
          <div style="display: table-cell; width: 50%; padding-left: 8px; padding-bottom: 6px;"><strong>IP Address:</strong> ${escapeHtml(signatureData.ipAddress)}</div>
        </div>
        <div style="display: table-row;">
          <div style="display: table-cell; width: 50%; padding-right: 8px;"><strong>Time:</strong> ${escapeHtml(signatureData.signedTime)}</div>
          <div style="display: table-cell; width: 50%; padding-left: 8px;"><strong>Timestamp:</strong> ${signatureData.timestamp.toISOString()}</div>
        </div>
      </div>

      <div style="padding: 12px; background: #ffff99; border: 1px solid #000; font-size: 9pt; line-height: 1.2;">
        <strong>CERTIFICATION:</strong> This document has been electronically signed. The signature, date, time, and IP address have been permanently affixed to this document and cannot be altered.
      </div>
    </div>
  `;
  }

  // CRITICAL: If signatureBlockHtml is empty, use fallback marker
  if (!signatureBlockHtml || signatureBlockHtml.trim() === '') {
    signatureBlockHtml = '__SIGNATURE_NOT_AVAILABLE__';
  }

  // Replace signature placeholder if found, otherwise append at the end
  let finalContent;
  if (foundPlaceholder) {
    // Replace ONLY the first occurrence of the found placeholder
    finalContent = originalContent.replace(foundPlaceholder, signatureBlockHtml);
    
    // CRITICAL: Verify that the placeholder was actually replaced
    if (finalContent.includes(foundPlaceholder)) {
      console.error('Signature placeholder replacement failed - placeholder still exists');
      // Force replace all occurrences as fallback
      finalContent = originalContent.split(foundPlaceholder).join(signatureBlockHtml);
    }
  } else {
    // Append signature at the end if no placeholder found
    finalContent = originalContent + signatureBlockHtml;
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
    @page {
      size: letter;
      margin: 1in;
    }
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 12pt;
      line-height: 1.6;
      color: #000;
      margin: 0;
      padding: 0;
    }
    .content {
      margin: 0;
      text-align: justify;
    }
    .content.plain-text {
      white-space: pre-wrap;
    }
    /* HTML content styling */
    .content h1 {
      font-size: 16pt;
      font-weight: bold;
      margin: 20px 0 10px 0;
    }
    .content h2 {
      font-size: 14pt;
      font-weight: bold;
      margin: 18px 0 8px 0;
    }
    .content h3 {
      font-size: 13pt;
      font-weight: bold;
      margin: 16px 0 6px 0;
    }
    .content p {
      margin: 10px 0;
    }
    .content ul, .content ol {
      margin: 10px 0;
      padding-left: 30px;
    }
    .content li {
      margin: 5px 0;
    }
    .content table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
    }
    .content table th,
    .content table td {
      border: 1px solid #000;
      padding: 8px;
      text-align: left;
    }
    .content table th {
      background-color: #f0f0f0;
      font-weight: bold;
    }
    .content strong {
      font-weight: bold;
    }
    .content em {
      font-style: italic;
    }
    .content u {
      text-decoration: underline;
    }
    .content hr {
      border: none;
      border-top: 1px solid #000;
      margin: 20px 0;
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

  // Convert HTML to PDF
  const signedPdfDataUrl = await htmlToPDF(htmlContent);
  
  return signedPdfDataUrl;
}

/**
 * Converts a data URL to a Blob for downloading
 * @param dataUrl - The data URL to convert
 * @param filename - The filename for the download
 */
export function downloadPDF(dataUrl: string, filename: string): void {
  // Ensure filename has .html extension for HTML-based documents
  const finalFilename = filename.endsWith('.html') || filename.endsWith('.pdf') 
    ? filename 
    : `${filename}.html`;
  
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = finalFilename;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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
 * Implementation: jsPDF + html2canvas. We mount the HTML into an
 * off-screen iframe (so styles + Google fonts evaluate exactly as they
 * would in a browser tab), wait for fonts to settle, screenshot the
 * rendered DOM with html2canvas, then paginate the resulting image
 * across letter-sized PDF pages with jsPDF.
 *
 * Returns a `data:application/pdf;base64,...` URL — meaning the View,
 * Download, Print, and Email actions all see a true .pdf payload and
 * behave the way a paralegal expects (proper page-flipping in viewers,
 * correct file extension on save, no blank tab).
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
  // iframe) is what html2canvas works reliably with — iframe-mounted
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
  // so the paralegal signature renders correctly. Idempotent — only
  // appends once per page life.
  if (!document.getElementById('cowork-allura-cursive-font')) {
    const link = document.createElement('link');
    link.id = 'cowork-allura-cursive-font';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Allura&display=swap';
    document.head.appendChild(link);
  }

  // Off-screen container.
  const host = document.createElement('div');
  host.style.position = 'fixed';
  host.style.left = '-10000px';
  host.style.top = '0';
  host.style.width = '816px';      // 8.5in × 96dpi
  host.style.minHeight = '1056px'; // 11in × 96dpi
  host.style.background = '#ffffff';
  host.style.zIndex = '-1';
  host.setAttribute('aria-hidden', 'true');
  host.innerHTML = `${styleHtml}<div data-pdf-content>${bodyHtml}</div>`;
  document.body.appendChild(host);

  try {
    // Wait for fonts (Allura, etc.) + a paint tick.
    if ((document as any).fonts?.ready) {
      try { await (document as any).fonts.ready; } catch { /* non-fatal */ }
    }
    await new Promise((r) => requestAnimationFrame(() => r(null)));
    await new Promise((r) => setTimeout(r, 60));

    const canvas = await html2canvas(host, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      windowWidth: 816,
      logging: false,
    });

    // ----------------------------------------------------------------
    // Build a letter-size jsPDF (8.5 × 11 in, 72pt/in = 612 × 792pt).
    // We slice the captured canvas into page-height strips so multi-page
    // documents (the LTB / traffic retainer is multi-page) paginate
    // cleanly instead of being squashed onto one page.
    // ----------------------------------------------------------------
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'letter',
      compress: true,
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let position = 0;
    const fullImg = canvas.toDataURL('image/jpeg', 0.95);

    if (imgHeight <= pageHeight) {
      pdf.addImage(fullImg, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
    } else {
      // Multi-page: render the same long image, shifting it up by one
      // page height each iteration. jsPDF clips at the page boundary so
      // each page shows the next slice.
      let heightLeft = imgHeight;
      pdf.addImage(fullImg, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(fullImg, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pageHeight;
      }
    }

    // jsPDF's output('datauristring') returns 'data:application/pdf;...'
    return pdf.output('datauristring') as string;
  } finally {
    host.remove();
  }
}
