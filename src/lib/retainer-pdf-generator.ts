/**
 * Retainer Agreement PDF Generator
 *
 * Uses pdf-lib to generate a professional retainer agreement PDF
 * from agreement details, client info, and firm info.
 * Returns a Blob URL that can be used as a download link or emailed.
 */

import { PDFDocument, rgb, StandardFonts, PDFPage, PDFFont } from 'pdf-lib';
import { FIRM_INFO } from './pdf-form-filler';

// ============================================================
// TYPES
// ============================================================

export interface RetainerPDFData {
  clientName: string;
  clientEmail: string;
  clientAddress?: string;
  matterType: string;
  matterDescription: string;
  tribunal: string;
  scopeOfServices: string;
  feeArrangementType: string;
  feeAmount: string;
  // Specific rate fields by type
  hourlyRate?: string;
  flatFeeAmount?: string;
  hybridFlatFee?: string;
  hybridHourlyRate?: string;
  contingencyPercent?: string;
  retainerDeposit?: string;
  paralegalName?: string;
  dateOpened?: string;
}

// ============================================================
// CONSTANTS
// ============================================================

const PRIMARY_COLOR = rgb(185 / 255, 74 / 255, 31 / 255); // #B94A1F terracotta
const DARK_COLOR = rgb(0.1, 0.1, 0.1);
const GRAY_COLOR = rgb(0.4, 0.4, 0.4);
const LIGHT_GRAY = rgb(0.85, 0.85, 0.85);

const PAGE_WIDTH = 612; // US Letter
const PAGE_HEIGHT = 792;
const MARGIN_LEFT = 60;
const MARGIN_RIGHT = 60;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;
const LINE_HEIGHT = 14;

// ============================================================
// HELPERS
// ============================================================

/**
 * Wraps text to fit within a given width, returning an array of lines
 */
function wrapText(text: string, font: PDFFont, fontSize: number, maxWidth: number): string[] {
  const lines: string[] = [];
  const paragraphs = text.split('\n');

  for (const paragraph of paragraphs) {
    if (paragraph.trim() === '') {
      lines.push('');
      continue;
    }
    const words = paragraph.split(' ');
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = font.widthOfTextAtSize(testLine, fontSize);

      if (testWidth > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
  }

  return lines;
}

/**
 * Draws wrapped text at a position, returns the new Y position
 */
function drawWrappedText(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  font: PDFFont,
  fontSize: number,
  maxWidth: number,
  color = DARK_COLOR,
  lineHeight = LINE_HEIGHT
): number {
  const lines = wrapText(text, font, fontSize, maxWidth);
  let currentY = y;
  for (const line of lines) {
    if (currentY < 60) {
      return currentY; // Would go off page
    }
    page.drawText(line, { x, y: currentY, size: fontSize, font, color });
    currentY -= lineHeight;
  }
  return currentY;
}

// ============================================================
// FEE LABELS
// ============================================================

const FEE_LABELS: Record<string, string> = {
  hourly: 'Hourly Rate',
  flat_fee: 'Flat Fee',
  hybrid: 'Hybrid Retainer',
  contingency: 'Contingency Fee',
  block_fee: 'Block Fee',
};

// ============================================================
// PDF GENERATOR
// ============================================================

export async function generateRetainerPDF(data: RetainerPDFData): Promise<{ blob: Blob; url: string; filename: string }> {
  const doc = await PDFDocument.create();
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontItalic = await doc.embedFont(StandardFonts.HelveticaOblique);

  const paralegalName = data.paralegalName || FIRM_INFO.paralegalName;
  const today = new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
  const dateOpened = data.dateOpened
    ? new Date(data.dateOpened).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })
    : today;

  let page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - 50;

  // Helper to add a new page when needed
  const checkPageBreak = (needed: number = 80) => {
    if (y < needed) {
      page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      y = PAGE_HEIGHT - 50;
    }
  };

  // ── HEADER ──────────────────────────────────────────────
  // Terracotta accent line
  page.drawRectangle({
    x: MARGIN_LEFT,
    y: y,
    width: CONTENT_WIDTH,
    height: 3,
    color: PRIMARY_COLOR,
  });
  y -= 20;

  // Firm name
  page.drawText(FIRM_INFO.firmName.toUpperCase(), {
    x: MARGIN_LEFT, y, size: 14, font: fontBold, color: PRIMARY_COLOR,
  });
  y -= 16;

  // Firm address line
  page.drawText(`${FIRM_INFO.address}, ${FIRM_INFO.city}, ${FIRM_INFO.province} ${FIRM_INFO.postalCode}`, {
    x: MARGIN_LEFT, y, size: 8, font: fontRegular, color: GRAY_COLOR,
  });
  y -= 12;

  page.drawText(`Phone: ${FIRM_INFO.phone}  |  Email: ${FIRM_INFO.email}`, {
    x: MARGIN_LEFT, y, size: 8, font: fontRegular, color: GRAY_COLOR,
  });
  y -= 20;

  // Separator
  page.drawLine({
    start: { x: MARGIN_LEFT, y },
    end: { x: PAGE_WIDTH - MARGIN_RIGHT, y },
    thickness: 0.5,
    color: LIGHT_GRAY,
  });
  y -= 30;

  // ── TITLE ──────────────────────────────────────────────
  page.drawText('RETAINER AGREEMENT', {
    x: MARGIN_LEFT, y, size: 18, font: fontBold, color: DARK_COLOR,
  });
  y -= 16;
  page.drawText('Paralegal Services', {
    x: MARGIN_LEFT, y, size: 11, font: fontItalic, color: GRAY_COLOR,
  });
  y -= 10;

  // Accent line under title
  page.drawRectangle({
    x: MARGIN_LEFT, y, width: 80, height: 2, color: PRIMARY_COLOR,
  });
  y -= 25;

  // Date
  page.drawText(`Date: ${dateOpened}`, {
    x: MARGIN_LEFT, y, size: 10, font: fontRegular, color: DARK_COLOR,
  });
  y -= 25;

  // ── SECTION 1: PARTIES ─────────────────────────────────
  const drawSectionHeading = (title: string) => {
    checkPageBreak(60);
    page.drawText(title, {
      x: MARGIN_LEFT, y, size: 12, font: fontBold, color: PRIMARY_COLOR,
    });
    y -= 4;
    page.drawLine({
      start: { x: MARGIN_LEFT, y },
      end: { x: PAGE_WIDTH - MARGIN_RIGHT, y },
      thickness: 0.5,
      color: LIGHT_GRAY,
    });
    y -= 16;
  };

  drawSectionHeading('1. PARTIES');

  const partiesText = `This Retainer Agreement ("Agreement") is entered into between:\n\nClient: ${data.clientName}${data.clientEmail ? `\nEmail: ${data.clientEmail}` : ''}${data.clientAddress ? `\nAddress: ${data.clientAddress}` : ''}\n\nParalegal: ${paralegalName}\nFirm: ${FIRM_INFO.firmName}\nAddress: ${FIRM_INFO.address}, ${FIRM_INFO.city}, ${FIRM_INFO.province} ${FIRM_INFO.postalCode}\nLicensed by the Law Society of Ontario`;

  y = drawWrappedText(page, partiesText, MARGIN_LEFT, y, fontRegular, 10, CONTENT_WIDTH);
  y -= 20;

  // ── SECTION 2: SCOPE OF SERVICES ──────────────────────
  drawSectionHeading('2. SCOPE OF SERVICES');

  y = drawWrappedText(page, `The Paralegal agrees to provide the following legal services:`, MARGIN_LEFT, y, fontRegular, 10, CONTENT_WIDTH);
  y -= 8;

  y = drawWrappedText(page, `Matter: ${data.matterDescription}`, MARGIN_LEFT, y, fontBold, 10, CONTENT_WIDTH);
  y -= 6;
  y = drawWrappedText(page, `Tribunal/Court: ${data.tribunal}`, MARGIN_LEFT, y, fontRegular, 10, CONTENT_WIDTH);
  y -= 6;

  if (data.scopeOfServices) {
    y -= 6;
    y = drawWrappedText(page, data.scopeOfServices, MARGIN_LEFT, y, fontRegular, 10, CONTENT_WIDTH);
  }

  y -= 6;
  y = drawWrappedText(page, `The Paralegal will not provide services outside the scope described above without a separate written agreement.`, MARGIN_LEFT, y, fontItalic, 9, CONTENT_WIDTH);
  y -= 20;

  // ── SECTION 3: FEES AND PAYMENT ───────────────────────
  checkPageBreak();
  drawSectionHeading('3. FEES AND PAYMENT');

  const feeLabel = FEE_LABELS[data.feeArrangementType] || data.feeArrangementType;
  y = drawWrappedText(page, `Fee Arrangement: ${feeLabel}`, MARGIN_LEFT, y, fontBold, 10, CONTENT_WIDTH);
  y -= 6;

  // Type-specific fee details
  if (data.feeArrangementType === 'hourly' && data.hourlyRate) {
    y = drawWrappedText(page, `Hourly Rate: $${data.hourlyRate} per hour + HST`, MARGIN_LEFT, y, fontRegular, 10, CONTENT_WIDTH);
    y -= 6;
  } else if (data.feeArrangementType === 'flat_fee' && data.flatFeeAmount) {
    y = drawWrappedText(page, `Flat Fee: $${data.flatFeeAmount} + HST`, MARGIN_LEFT, y, fontRegular, 10, CONTENT_WIDTH);
    y -= 6;
  } else if (data.feeArrangementType === 'hybrid') {
    if (data.hybridFlatFee) {
      y = drawWrappedText(page, `Initial Flat Fee: $${data.hybridFlatFee} + HST`, MARGIN_LEFT, y, fontRegular, 10, CONTENT_WIDTH);
      y -= 6;
    }
    if (data.hybridHourlyRate) {
      y = drawWrappedText(page, `Hourly Rate (after initial scope): $${data.hybridHourlyRate} per hour + HST`, MARGIN_LEFT, y, fontRegular, 10, CONTENT_WIDTH);
      y -= 6;
    }
  } else if (data.feeArrangementType === 'contingency' && data.contingencyPercent) {
    y = drawWrappedText(page, `Contingency: ${data.contingencyPercent}% of monetary recovery obtained, plus HST where applicable`, MARGIN_LEFT, y, fontRegular, 10, CONTENT_WIDTH);
    y -= 6;
  } else if (data.feeAmount) {
    y = drawWrappedText(page, `Amount: ${data.feeAmount}`, MARGIN_LEFT, y, fontRegular, 10, CONTENT_WIDTH);
    y -= 6;
  }

  // Retainer deposit
  if (data.retainerDeposit) {
    y -= 4;
    y = drawWrappedText(page, `Retainer Deposit: $${data.retainerDeposit} + HST`, MARGIN_LEFT, y, fontBold, 10, CONTENT_WIDTH);
    y -= 6;
    y = drawWrappedText(page, `No work is required to begin until the retainer deposit has been received.`, MARGIN_LEFT, y, fontItalic, 9, CONTENT_WIDTH);
    y -= 6;
  }

  const feeTerms = `Fees are due upon receipt of invoice unless otherwise agreed. HST (13%) will be added where applicable. Disbursements (filing fees, process server fees, photocopies, etc.) are billed separately at cost.\n\nAny funds held in trust will be maintained in a trust account in accordance with the Law Society of Ontario By-Law 9.`;
  y = drawWrappedText(page, feeTerms, MARGIN_LEFT, y, fontRegular, 10, CONTENT_WIDTH);
  y -= 20;

  // ── SECTION 4: CLIENT OBLIGATIONS ─────────────────────
  checkPageBreak();
  drawSectionHeading('4. CLIENT OBLIGATIONS');

  const clientObligations = `The Client agrees to:\n\na) Provide truthful and complete information relevant to the matter;\nb) Respond promptly to requests for information or instructions;\nc) Attend all required court or tribunal appearances;\nd) Pay all fees and disbursements in accordance with this Agreement;\ne) Notify the Paralegal immediately of any changes in contact information.`;
  y = drawWrappedText(page, clientObligations, MARGIN_LEFT, y, fontRegular, 10, CONTENT_WIDTH);
  y -= 20;

  // ── SECTION 5: LIMITATION OF SERVICES ─────────────────
  checkPageBreak();
  drawSectionHeading('5. LIMITATION OF SERVICES');

  const limitations = `The Paralegal is licensed by the Law Society of Ontario and is authorized to provide legal services within the scope permitted under the Law Society Act and By-Law 4. The Paralegal is not a lawyer and cannot provide services reserved for lawyers.\n\nNo guarantee is made regarding the outcome of any legal matter. The Paralegal will exercise reasonable skill and diligence in providing services.`;
  y = drawWrappedText(page, limitations, MARGIN_LEFT, y, fontRegular, 10, CONTENT_WIDTH);
  y -= 20;

  // ── SECTION 6: TERMINATION ────────────────────────────
  checkPageBreak();
  drawSectionHeading('6. TERMINATION');

  const termination = `Either party may terminate this Agreement upon reasonable written notice. Upon termination:\n\na) The Client is responsible for all fees and disbursements incurred to the date of termination;\nb) The Paralegal will provide all client documents and property in a timely manner;\nc) The Paralegal may retain copies of the file in accordance with By-Law 7.1.`;
  y = drawWrappedText(page, termination, MARGIN_LEFT, y, fontRegular, 10, CONTENT_WIDTH);
  y -= 20;

  // ── SECTION 7: CONFIDENTIALITY ────────────────────────
  checkPageBreak();
  drawSectionHeading('7. CONFIDENTIALITY');

  const confidentiality = `All information provided by the Client in connection with this matter is confidential and will not be disclosed without the Client's consent, except as required by law or as necessary to provide the services described herein.`;
  y = drawWrappedText(page, confidentiality, MARGIN_LEFT, y, fontRegular, 10, CONTENT_WIDTH);
  y -= 20;

  // ── SECTION 8: FILE RETENTION ─────────────────────────
  checkPageBreak();
  drawSectionHeading('8. FILE RETENTION');

  const retention = `In accordance with the Law Society of Ontario By-Law 7.1, s.23(14), the Paralegal will retain the client file for a minimum period of six (6) years following the completion or termination of the matter, after which the file may be destroyed.`;
  y = drawWrappedText(page, retention, MARGIN_LEFT, y, fontRegular, 10, CONTENT_WIDTH);
  y -= 20;

  // ── SECTION 9: GOVERNING LAW ──────────────────────────
  checkPageBreak();
  drawSectionHeading('9. GOVERNING LAW');

  y = drawWrappedText(page, `This Agreement shall be governed by the laws of the Province of Ontario and the laws of Canada applicable therein.`, MARGIN_LEFT, y, fontRegular, 10, CONTENT_WIDTH);
  y -= 20;

  // ── SECTION 10: ACKNOWLEDGEMENT ───────────────────────
  checkPageBreak(180);
  drawSectionHeading('10. ACKNOWLEDGEMENT');

  const acknowledgement = `By signing below, the Client acknowledges that:\n\na) The Client has read and understands this Agreement;\nb) The Client has been advised of the Paralegal's scope of practice and limitations;\nc) The Client consents to the fee arrangement described above;\nd) The Client has been advised of the right to seek independent legal advice;\ne) The Client has received a copy of this Agreement.`;
  y = drawWrappedText(page, acknowledgement, MARGIN_LEFT, y, fontRegular, 10, CONTENT_WIDTH);
  y -= 30;

  // ── SIGNATURES ────────────────────────────────────────
  checkPageBreak(140);

  // Accent line before signatures
  page.drawRectangle({
    x: MARGIN_LEFT, y: y + 8, width: CONTENT_WIDTH, height: 1.5, color: PRIMARY_COLOR,
  });
  y -= 10;

  const sigColWidth = (CONTENT_WIDTH - 40) / 2;
  const sigLeftX = MARGIN_LEFT;
  const sigRightX = MARGIN_LEFT + sigColWidth + 40;

  // Client signature
  page.drawText('CLIENT:', { x: sigLeftX, y, size: 9, font: fontBold, color: DARK_COLOR });
  page.drawText('PARALEGAL:', { x: sigRightX, y, size: 9, font: fontBold, color: DARK_COLOR });
  y -= 30;

  // Signature lines
  page.drawLine({ start: { x: sigLeftX, y }, end: { x: sigLeftX + sigColWidth, y }, thickness: 0.5, color: DARK_COLOR });
  page.drawLine({ start: { x: sigRightX, y }, end: { x: sigRightX + sigColWidth, y }, thickness: 0.5, color: DARK_COLOR });
  y -= 14;

  page.drawText(data.clientName, { x: sigLeftX, y, size: 9, font: fontRegular, color: DARK_COLOR });
  page.drawText(paralegalName, { x: sigRightX, y, size: 9, font: fontRegular, color: DARK_COLOR });
  y -= 14;

  page.drawText('Signature', { x: sigLeftX, y, size: 8, font: fontItalic, color: GRAY_COLOR });
  page.drawText('Signature', { x: sigRightX, y, size: 8, font: fontItalic, color: GRAY_COLOR });
  y -= 25;

  // Date lines
  page.drawLine({ start: { x: sigLeftX, y }, end: { x: sigLeftX + sigColWidth, y }, thickness: 0.5, color: DARK_COLOR });
  page.drawLine({ start: { x: sigRightX, y }, end: { x: sigRightX + sigColWidth, y }, thickness: 0.5, color: DARK_COLOR });
  y -= 14;

  page.drawText('Date', { x: sigLeftX, y, size: 8, font: fontItalic, color: GRAY_COLOR });
  page.drawText('Date', { x: sigRightX, y, size: 8, font: fontItalic, color: GRAY_COLOR });
  y -= 30;

  // ── FOOTER ────────────────────────────────────────────
  const footerY = 30;
  page.drawLine({
    start: { x: MARGIN_LEFT, y: footerY + 10 },
    end: { x: PAGE_WIDTH - MARGIN_RIGHT, y: footerY + 10 },
    thickness: 0.5,
    color: LIGHT_GRAY,
  });
  page.drawText(`${FIRM_INFO.firmName} — Licensed by the Law Society of Ontario`, {
    x: MARGIN_LEFT, y: footerY, size: 7, font: fontRegular, color: GRAY_COLOR,
  });

  // ── SERIALIZE ─────────────────────────────────────────
  const pdfBytes = await doc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const filename = `Retainer_Agreement_${data.clientName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;

  return { blob, url, filename };
}
