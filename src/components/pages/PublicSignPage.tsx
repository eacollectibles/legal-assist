/**
 * PublicSignPage
 * --------------
 * Public-facing one-time signing page reached at /sign/:token. Lets the
 * recipient open a document the paralegal generated, type/draw their
 * signature, and submit — all without creating an account on
 * legalassist.london.
 *
 * On submit:
 *   1. Embed the signature into the source PDF (data URL).
 *   2. Best-effort upload the signed PDF to Wix Media; if Wix Media is
 *      unavailable we keep the inline data URL.
 *   3. Look up an existing clientprofiles row by email/name; if none,
 *      create one so the document has somewhere to land.
 *   4. Update the generateddocuments row with status:'signed' and the
 *      signedDocumentUrl.
 *   5. Insert a clientdocuments row associated with the resolved
 *      clientprofile so the doc shows up in the file's LSO section
 *      (Section F by default for retainers, Section I otherwise).
 *   6. Mark the sign token as used.
 */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle, FileText, Loader2 } from 'lucide-react';
import DocumentSignature, { SignatureData } from '@/components/DocumentSignature';
import {
  validateSignToken,
  markSignTokenSigned,
  SignTokens,
} from '@/lib/sign-token-service';

interface GeneratedDoc {
  _id: string;
  documentName?: string;
  documentUrl?: string;
  documentContent?: string;
  signedDocumentUrl?: string;
  clientId?: string;
  clientEmail?: string;
}

export default function PublicSignPage() {
  const { token } = useParams<{ token: string }>();

  const [phase, setPhase] = useState<
    'validating' | 'invalid' | 'review' | 'signing' | 'submitting' | 'done'
  >('validating');
  const [error, setError] = useState<string>('');
  const [tokenRow, setTokenRow] = useState<SignTokens | null>(null);
  const [doc, setDoc] = useState<GeneratedDoc | null>(null);
  const [signerName, setSignerName] = useState('');
  const [signerEmail, setSignerEmail] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // ----------------------------------------------------------------
  // Validate the token + fetch the document on mount.
  // ----------------------------------------------------------------
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!token) {
        setPhase('invalid');
        setError('No signing link provided.');
        return;
      }
      const res = await validateSignToken(token);
      if (cancelled) return;
      if (!res.valid || !res.token) {
        setPhase('invalid');
        setError(res.error || 'This signing link is not valid.');
        return;
      }
      setTokenRow(res.token);
      setSignerName(res.token.intendedRecipientName || '');
      setSignerEmail(res.token.intendedRecipientEmail || '');

      try {
        const fetched = await BaseCrudService.getById<GeneratedDoc>(
          'generateddocuments',
          res.token.documentId || ''
        );
        if (!cancelled) {
          setDoc(fetched || null);
          setPhase('review');
        }
      } catch (e) {
        if (!cancelled) {
          setPhase('invalid');
          setError('Could not load the document attached to this link.');
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  // ----------------------------------------------------------------
  // Try a Wix Media upload of the signed PDF data URL. Returns null
  // if the SDK isn't available (caller falls back to the data URL).
  // ----------------------------------------------------------------
  const tryWixMediaUpload = async (
    dataUrl: string,
    fileName: string
  ): Promise<{ url: string; mediaId?: string } | null> => {
    try {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], fileName, { type: 'application/pdf' });
      const wixMedia: any = await import('@wix/media').catch(() => null);
      if (!wixMedia) return null;
      const filesApi = wixMedia.files || wixMedia.default?.files || wixMedia;
      if (filesApi.uploadFile) {
        const r = await filesApi.uploadFile({
          mimeType: 'application/pdf',
          fileName,
          file,
        });
        const url = r?.file?.url || r?.fileUrl || r?.url;
        const mediaId = r?.file?.id || r?._id || r?.id;
        if (url) return { url, mediaId };
      }
      return null;
    } catch {
      return null;
    }
  };

  // ----------------------------------------------------------------
  // Resolve the recipient to a clientprofiles row, creating one if
  // none exists. Three-tier match (email > name > token's clientId
  // hint) keeps duplicates down.
  // ----------------------------------------------------------------
  const resolveOrCreateClientProfile = async (
    name: string,
    email: string,
    hintClientId?: string
  ): Promise<string> => {
    const clean = (s: string) => (s || '').trim().toLowerCase();
    const targetEmail = clean(email);
    const targetName = clean(name);
    try {
      const { items } = await BaseCrudService.getAll<any>(
        'clientprofiles',
        undefined,
        { limit: 1000 } as any
      );
      // 1) hintClientId direct hit
      if (hintClientId) {
        const byHint = items.find((p: any) => p._id === hintClientId);
        if (byHint?._id) return byHint._id;
      }
      // 2) email match
      if (targetEmail) {
        const byEmail = items.find(
          (p: any) => clean(p.email || '') === targetEmail
        );
        if (byEmail?._id) return byEmail._id;
      }
      // 3) name match
      if (targetName) {
        const byName = items.find((p: any) => {
          const fullName = clean(`${p.firstName || ''} ${p.lastName || ''}`.trim());
          return fullName && fullName === targetName;
        });
        if (byName?._id) return byName._id;
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('clientprofiles scan failed; will create a new profile.', e);
    }

    // 4) create a fresh profile
    const [firstName, ...rest] = name.trim().split(/\s+/);
    const newId = crypto.randomUUID();
    await BaseCrudService.create('clientprofiles', {
      _id: newId,
      firstName: firstName || name || 'Client',
      lastName: rest.join(' ') || '',
      email: email,
      intakeCompleted: false,
      createdViaSignLink: true,
      _createdDate: new Date(),
    } as any);
    return newId;
  };

  // ----------------------------------------------------------------
  // Submit handler — embed signature, persist, mark token used.
  // ----------------------------------------------------------------
  const handleSignatureComplete = async (sig: SignatureData) => {
    if (!tokenRow || !doc) return;
    setPhase('submitting');
    try {
      const { embedSignatureInPDF } = await import('@/lib/pdf-generator');
      const signedPdfDataUrl = await embedSignatureInPDF(
        doc.documentUrl || '',
        sig,
        doc.documentName || 'Document',
        // Pass the original HTML so the embedder can re-render with the
        // client's signature appended (documentUrl is a real PDF).
        (doc as any).documentContent || undefined,
      );

      // Try Wix Media for permanent hosting
      const fileName = `Signed_${(doc.documentName || 'document').replace(/[^A-Za-z0-9_-]+/g, '_')}.pdf`;
      const media = await tryWixMediaUpload(signedPdfDataUrl, fileName);
      const finalUrl = media?.url || signedPdfDataUrl;

      // Resolve / create the client profile
      const resolvedClientId = await resolveOrCreateClientProfile(
        signerName,
        signerEmail,
        tokenRow.clientId || doc.clientId
      );

      // Update the generated document row
      await BaseCrudService.update('generateddocuments', {
        _id: doc._id,
        status: 'signed',
        signedDate: new Date().toISOString(),
        signedDocumentUrl: finalUrl,
        signedByName: signerName,
        signedByEmail: signerEmail,
        // Backfill clientId/email if it was missing.
        clientId: doc.clientId || resolvedClientId,
        clientEmail: doc.clientEmail || signerEmail,
      } as any);

      // File the signed copy under the client. Retainers default to
      // Section F, everything else lands in Section I.
      const docNameLower = (doc.documentName || '').toLowerCase();
      const sectionKey = docNameLower.includes('retainer')
        ? 'retainerAgreement'
        : 'caseDocuments';
      try {
        await BaseCrudService.create('clientdocuments', {
          _id: crypto.randomUUID(),
          documentName: `${doc.documentName || 'Document'} (signed)`,
          fileUrl: finalUrl,
          uploadDate: new Date().toISOString(),
          fileType: 'application/pdf',
          documentCategory: `section_${sectionKey}`,
          clientId: resolvedClientId,
          notes: `Signed via public link by ${signerName} <${signerEmail}>.`,
          sourceGeneratedDocumentId: doc._id,
          attachedToSection: sectionKey,
          signed: true,
          _createdDate: new Date(),
        } as any);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('clientdocuments create failed:', err);
      }

      // Mark token used
      await markSignTokenSigned(tokenRow._id, {
        signedByName: signerName,
        signedByEmail: signerEmail,
        signedDocumentUrl: finalUrl,
        resolvedClientId,
      });

      // Best-effort activity log
      try {
        await BaseCrudService.create('activitylogs', {
          _id: crypto.randomUUID(),
          activityType: 'document_signed_via_link',
          activityDescription:
            `${doc.documentName || 'Document'} signed via public link by ${signerName} (${signerEmail})`,
          performedBy: signerEmail,
          performedByName: signerName,
          timestamp: new Date().toISOString(),
          relatedItemId: doc._id,
        });
      } catch { /* non-fatal */ }

      setPhase('done');
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error('Sign submit failed:', err);
      setError(
        err?.message
          ? `Could not complete signing: ${err.message}`
          : 'Could not complete signing. Please try again.'
      );
      setPhase('review');
    }
  };

  // ----------------------------------------------------------------
  // Render
  // ----------------------------------------------------------------
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {phase === 'validating' && (
          <Card>
            <CardContent className="py-12 flex flex-col items-center text-center">
              <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
              <p className="font-paragraph text-foreground/80">
                Verifying your signing link…
              </p>
            </CardContent>
          </Card>
        )}

        {phase === 'invalid' && (
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2 text-red-700">
                <AlertCircle className="w-6 h-6" />
                Signing link unavailable
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-paragraph text-foreground/80">{error}</p>
              <p className="font-paragraph text-sm text-foreground/60 mt-3">
                If you believe this is in error, please contact our office and
                we will issue you a fresh link.
              </p>
            </CardContent>
          </Card>
        )}

        {phase === 'done' && (
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2 text-green-700">
                <CheckCircle className="w-6 h-6" />
                Document signed
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-paragraph text-foreground/80">
                Thank you, {signerName}. Your signature has been recorded and
                a copy has been forwarded to our office. You will receive a
                confirmation email shortly.
              </p>
              <p className="font-paragraph text-sm text-foreground/60">
                You may now close this window.
              </p>
            </CardContent>
          </Card>
        )}

        {phase === 'review' && doc && tokenRow && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary" />
                  {doc.documentName || 'Document for signature'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-paragraph text-foreground/80">
                  Hello {tokenRow.intendedRecipientName || 'there'} — please
                  review the document below, confirm your name and email, then
                  apply your signature. <b>You do not need to create an
                  account</b> to sign.
                </p>
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="font-paragraph text-sm text-red-700">{error}</p>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="signerName">Your full legal name *</Label>
                    <Input
                      id="signerName"
                      value={signerName}
                      onChange={(e) => setSignerName(e.target.value)}
                      placeholder="As you would sign on paper"
                    />
                  </div>
                  <div>
                    <Label htmlFor="signerEmail">Your email *</Label>
                    <Input
                      id="signerEmail"
                      type="email"
                      value={signerEmail}
                      onChange={(e) => setSignerEmail(e.target.value)}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <label className="flex items-start gap-2 text-sm font-paragraph cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-foreground/80">
                    I agree that an electronic signature applied below has the
                    same legal effect as a handwritten signature, and I confirm
                    that the information above is accurate.
                  </span>
                </label>
                <div className="pt-2">
                  <Button
                    disabled={
                      !signerName.trim() ||
                      !signerEmail.trim() ||
                      !acceptedTerms ||
                      !doc.documentUrl
                    }
                    onClick={() => setPhase('signing')}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    Continue to signature
                  </Button>
                  {!doc.documentUrl && (
                    <p className="text-xs text-amber-700 mt-2">
                      The document file isn&rsquo;t attached to this link.
                      Please contact our office.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Inline document preview when we have a PDF URL */}
            {doc.documentUrl && (
              <Card>
                <CardContent className="p-0">
                  <iframe
                    title="Document preview"
                    src={doc.documentUrl}
                    className="w-full"
                    style={{ height: '70vh', border: 'none' }}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {phase === 'signing' && doc && (
          <DocumentSignature
            documentId={doc._id}
            documentName={doc.documentName || 'Document'}
            // Recipient is the client — Quick-Sign cursive uses the
            // paralegal name list, which would be wrong here. Force
            // manual draw mode.
            enableQuickSign={false}
            onSignatureComplete={handleSignatureComplete}
            onCancel={() => setPhase('review')}
          />
        )}

        {phase === 'submitting' && (
          <Card>
            <CardContent className="py-12 flex flex-col items-center text-center">
              <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
              <p className="font-paragraph text-foreground/80">
                Submitting your signed document…
              </p>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
}
