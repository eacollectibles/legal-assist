import { Download, Printer } from 'lucide-react';

/**
 * Download Guide Button
 *
 * Adds a "Save as PDF" affordance to any guide / resource page. Uses
 * the browser's native window.print() with print-optimised CSS so the
 * user can choose "Save as PDF" from the print dialog. Works on every
 * device and browser without any server-side PDF rendering.
 *
 * Why not html2canvas + jsPDF here: the in-app pdf-generator is sized
 * for legal documents on Letter paper with strict pagination rules.
 * For long marketing / guide pages it's overkill and produces 30-page
 * PDFs with poor flow. Browser-print's "Save as PDF" lets the user's
 * own OS handle pagination cleanly and matches what most readers
 * expect from a "download this guide" button on a content page.
 *
 * Adds the downloadable-resources signal flagged by the 2026-05-29
 * SEO plan (Content Authority #2). The HTML guide pages already get
 * indexed; the print button converts the same content into a takeaway
 * artefact, which is the conversion piece the plan called out.
 */
interface DownloadGuideButtonProps {
  /** Optional label override. Defaults to "Save as PDF". */
  label?: string;
  /** Optional className for layout integration. */
  className?: string;
  /** Filename suggestion shown in the print dialog (some browsers honour
   *  it through document.title; we set/restore it around the print). */
  filename?: string;
}

export default function DownloadGuideButton({
  label = 'Save as PDF',
  className = '',
  filename,
}: DownloadGuideButtonProps) {
  const handlePrint = () => {
    if (typeof window === 'undefined') return;
    // Browsers default to document.title as the suggested filename in
    // the Print → Save as PDF dialog. Temporarily swap the title to
    // the caller-supplied name so the saved file has a meaningful name,
    // then restore on the next paint.
    if (filename) {
      const original = document.title;
      document.title = filename;
      window.print();
      // Print is synchronous in modern browsers; restore on a tick to
      // be safe across engines.
      setTimeout(() => {
        document.title = original;
      }, 250);
    } else {
      window.print();
    }
  };

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary/90 transition-colors text-sm md:text-base print:hidden"
        aria-label={`${label} — opens the print dialog`}
        data-cta="download-guide"
      >
        <Download className="w-4 h-4" aria-hidden="true" />
        <span>{label}</span>
      </button>
      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white text-primary border border-primary font-semibold rounded-md hover:bg-primary/5 transition-colors text-sm md:text-base print:hidden"
        aria-label="Print this guide"
        data-cta="print-guide"
      >
        <Printer className="w-4 h-4" aria-hidden="true" />
        <span>Print</span>
      </button>
    </div>
  );
}
