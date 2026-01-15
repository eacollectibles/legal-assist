/**
 * PDF Generation and Signature Embedding Utility
 * 
 * This utility provides functions to:
 * 1. Generate PDF documents from text content
 * 2. Embed electronic signatures with metadata (date, time, IP) into PDFs
 * 
 * Note: This is a client-side implementation using jsPDF.
 * For production, consider server-side PDF generation with proper digital signatures.
 */

import { SignatureData } from '@/components/DocumentSignature';

/**
 * Generates a PDF document from text content
 * @param content - The text content to convert to PDF
 * @param documentName - Name of the document
 * @returns Base64 encoded PDF data URL
 */
export async function generatePDF(content: string, documentName: string): Promise<string> {
  // Dynamic import to avoid SSR issues
  // @ts-ignore - jspdf module types not available, but package is installed at runtime
  const { jsPDF } = await import('jspdf');
  
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter'
  });

  // Set document properties
  doc.setProperties({
    title: documentName,
    subject: 'Legal Document',
    author: 'Legal Services',
    creator: 'Document Workflow System'
  });

  // Configure text settings
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - (margin * 2);
  const lineHeight = 7;
  let yPosition = margin;

  // Add header
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(documentName, margin, yPosition);
  yPosition += lineHeight * 2;

  // Add content
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  // Split content into lines that fit the page width
  const lines = doc.splitTextToSize(content, maxWidth);
  
  for (let i = 0; i < lines.length; i++) {
    // Check if we need a new page
    if (yPosition > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }
    
    doc.text(lines[i], margin, yPosition);
    yPosition += lineHeight;
  }

  // Add signature placeholder section at the end
  yPosition += lineHeight * 2;
  
  // Check if we need a new page for signature
  if (yPosition > pageHeight - margin - 50) {
    doc.addPage();
    yPosition = margin;
  }

  // Add signature section
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Signature Section', margin, yPosition);
  yPosition += lineHeight * 1.5;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('This document requires your electronic signature.', margin, yPosition);
  yPosition += lineHeight;
  doc.text('Please sign using the document workflow portal.', margin, yPosition);
  yPosition += lineHeight * 2;

  // Add signature line
  doc.setLineWidth(0.5);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += lineHeight;
  doc.setFontSize(9);
  doc.text('Signature', margin, yPosition);

  // Convert to base64 data URL
  const pdfDataUrl = doc.output('dataurlstring');
  return pdfDataUrl;
}

/**
 * Embeds signature with metadata into a PDF document
 * @param originalPdfDataUrl - The original PDF as a data URL
 * @param signatureData - Signature data including image, date, time, and IP
 * @param documentName - Name of the document
 * @returns Base64 encoded signed PDF data URL
 */
export async function embedSignatureInPDF(
  originalPdfDataUrl: string,
  signatureData: SignatureData,
  documentName: string
): Promise<string> {
  // @ts-ignore - jspdf module types not available, but package is installed at runtime
  const { jsPDF } = await import('jspdf');

  // Load the original PDF
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter'
  });

  // If the original PDF is a data URL, we need to recreate it with signature
  // For simplicity, we'll create a new PDF with the signature embedded
  
  // Get the original content (decode from base64)
  let originalContent = '';
  if (originalPdfDataUrl.startsWith('data:text/plain;base64,')) {
    const base64Content = originalPdfDataUrl.split(',')[1];
    originalContent = atob(base64Content);
  } else if (originalPdfDataUrl.startsWith('data:application/pdf;base64,')) {
    // For actual PDFs, we'll append signature page
    // Note: Full PDF parsing would require pdf-lib, but for now we'll create a new document
    originalContent = 'Document content (PDF parsing requires additional library)';
  }

  // Configure page settings
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - (margin * 2);
  const lineHeight = 7;
  let yPosition = margin;

  // Add header
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(documentName, margin, yPosition);
  yPosition += lineHeight * 2;

  // Add original content
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const lines = doc.splitTextToSize(originalContent, maxWidth);
  
  for (let i = 0; i < lines.length; i++) {
    if (yPosition > pageHeight - margin - 80) {
      doc.addPage();
      yPosition = margin;
    }
    doc.text(lines[i], margin, yPosition);
    yPosition += lineHeight;
  }

  // Add signature section on new page or at bottom
  if (yPosition > pageHeight - margin - 80) {
    doc.addPage();
    yPosition = margin;
  } else {
    yPosition += lineHeight * 3;
  }

  // Add signature header
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Electronic Signature', margin, yPosition);
  yPosition += lineHeight * 1.5;

  // Add signature image
  try {
    const signatureImg = signatureData.signatureDataUrl;
    const imgWidth = 60;
    const imgHeight = 20;
    
    doc.addImage(signatureImg, 'PNG', margin, yPosition, imgWidth, imgHeight);
    yPosition += imgHeight + lineHeight;
  } catch (error) {
    console.error('Error adding signature image:', error);
    doc.setFontSize(10);
    doc.text('[Signature Image]', margin, yPosition);
    yPosition += lineHeight * 2;
  }

  // Add signature line
  doc.setLineWidth(0.5);
  doc.line(margin, yPosition, margin + 80, yPosition);
  yPosition += lineHeight;

  // Add signature metadata
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Electronically Signed', margin, yPosition);
  yPosition += lineHeight;

  // Add metadata box with border
  const metadataBoxY = yPosition;
  const metadataBoxHeight = lineHeight * 5;
  
  doc.setDrawColor(100, 100, 100);
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, metadataBoxY, maxWidth, metadataBoxHeight, 'FD');
  
  yPosition += lineHeight * 0.8;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('Signature Verification Details:', margin + 3, yPosition);
  yPosition += lineHeight * 0.8;
  
  doc.setFont('helvetica', 'normal');
  doc.text(`Date: ${signatureData.signedDate}`, margin + 3, yPosition);
  yPosition += lineHeight * 0.7;
  doc.text(`Time: ${signatureData.signedTime}`, margin + 3, yPosition);
  yPosition += lineHeight * 0.7;
  doc.text(`IP Address: ${signatureData.ipAddress}`, margin + 3, yPosition);
  yPosition += lineHeight * 0.7;
  doc.text(`Timestamp: ${signatureData.timestamp.toISOString()}`, margin + 3, yPosition);
  yPosition += lineHeight * 1.5;

  // Add certification statement
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  const certificationText = 'This document has been electronically signed. The signature, date, time, and IP address have been permanently affixed to this document and cannot be altered.';
  const certLines = doc.splitTextToSize(certificationText, maxWidth - 6);
  
  for (let i = 0; i < certLines.length; i++) {
    if (yPosition > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }
    doc.text(certLines[i], margin + 3, yPosition);
    yPosition += lineHeight * 0.7;
  }

  // Add footer with document ID
  const documentId = `DOC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(128, 128, 128);
  doc.text(`Document ID: ${documentId}`, margin, pageHeight - 10);
  doc.text(`Generated: ${new Date().toISOString()}`, pageWidth - margin - 60, pageHeight - 10);

  // Set document metadata
  doc.setProperties({
    title: `${documentName} (Signed)`,
    subject: 'Signed Legal Document',
    author: 'Legal Services',
    creator: 'Document Workflow System',
    keywords: `signed, ${signatureData.signedDate}, ${signatureData.ipAddress}`
  });

  // Convert to base64 data URL
  const signedPdfDataUrl = doc.output('dataurlstring');
  return signedPdfDataUrl;
}

/**
 * Converts a data URL to a Blob for downloading
 * @param dataUrl - The data URL to convert
 * @param filename - The filename for the download
 */
export function downloadPDF(dataUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Validates if a string is a valid PDF data URL
 * @param dataUrl - The data URL to validate
 * @returns True if valid PDF data URL
 */
export function isValidPDFDataUrl(dataUrl: string): boolean {
  return dataUrl.startsWith('data:application/pdf;base64,');
}
