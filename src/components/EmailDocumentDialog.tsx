import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send, X, Link as LinkIcon, Copy, CheckCircle } from 'lucide-react';
import { GeneratedDocuments } from '@/entities';
import { generateUploadLink } from '@/lib/upload-token-service';

interface EmailDocumentDialogProps {
  document: GeneratedDocuments | null;
  isOpen: boolean;
  onClose: () => void;
  onSend: (emailData: EmailFormData) => Promise<void>;
  paralegalName: string;
  clientName: string;
  uploadToken?: string; // Optional upload token for generating upload link
}

export interface EmailFormData {
  to: string;
  subject: string;
  body: string;
}

export default function EmailDocumentDialog({
  document,
  isOpen,
  onClose,
  onSend,
  paralegalName,
  clientName,
  uploadToken,
}: EmailDocumentDialogProps) {
  const [formData, setFormData] = useState<EmailFormData>({
    to: '',
    subject: '',
    body: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState<{ to?: string; subject?: string; body?: string }>({});
  const [uploadLinkCopied, setUploadLinkCopied] = useState(false);

  // Auto-fill template when document changes
  useEffect(() => {
    if (document && isOpen) {
      const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      // CRITICAL FIX: Generate upload link if token is provided
      const uploadLink = uploadToken ? generateUploadLink(uploadToken) : null;

      const defaultSubject = `Authorization and Direction - ${clientName}`;
      
      // Template for sending Authorization and Direction to third parties
      const defaultBody = `Dear Sir/Madam,

RE: Authorization and Direction - ${clientName}

Please find attached a signed Authorization and Direction from our client, ${clientName}, authorizing the release of information to our office.

We kindly request that you provide the requested documentation/information as outlined in the attached authorization at your earliest convenience.

${uploadLink ? `📤 SECURE UPLOAD LINK
For your convenience, you may upload the requested documents electronically using the secure link below:
${uploadLink}

This link is unique to this matter and allows you to securely upload files directly to our office.
` : ''}
If you have any questions or require additional information, please do not hesitate to contact our office.

Thank you for your cooperation.

Yours truly,

${paralegalName}
LegalAssist Paralegal Services
London, Ontario
info@legalassist.london`;

      setFormData({
        to: document.clientEmail || '',
        subject: defaultSubject,
        body: defaultBody,
      });
      setErrors({});
      setUploadLinkCopied(false);
    }
  }, [document, isOpen, clientName, paralegalName, uploadToken]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: { to?: string; subject?: string; body?: string } = {};

    if (!formData.to.trim()) {
      newErrors.to = 'Recipient email is required';
    } else if (!validateEmail(formData.to)) {
      newErrors.to = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.body.trim()) {
      newErrors.body = 'Message body is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSend = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSending(true);
    try {
      await onSend(formData);
      onClose();
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send email. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleClose = () => {
    if (!isSending) {
      onClose();
    }
  };

  const handleCopyUploadLink = () => {
    if (uploadToken) {
      const link = generateUploadLink(uploadToken);
      navigator.clipboard.writeText(link);
      setUploadLinkCopied(true);
      setTimeout(() => setUploadLinkCopied(false), 3000);
    }
  };

  const handleInsertUploadLink = () => {
    if (uploadToken) {
      const link = generateUploadLink(uploadToken);
      const insertText = `\n\n📤 SECURE UPLOAD LINK\nFor your convenience, you may upload the requested documents electronically using the secure link below:\n${link}\n\nThis link is unique to this matter and allows you to securely upload files directly to our office.\n`;
      setFormData({
        ...formData,
        body: formData.body + insertText,
      });
    }
  };

  if (!document) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Email Signed Document
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Document Info */}
          <div className="bg-pastelbeige/20 rounded-lg p-4 border border-pastelbeige">
            <h3 className="font-heading font-bold text-foreground mb-2">Document Details</h3>
            <div className="space-y-1 text-sm font-paragraph">
              <p>
                <strong>Document:</strong> {document.documentName || 'Untitled Document'}
              </p>
              <p>
                <strong>Client:</strong> {clientName}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                <span className="text-green-700 font-semibold">
                  {document.status || 'Signed'}
                </span>
              </p>
              {document.signedDate && (
                <p>
                  <strong>Signed:</strong> {new Date(document.signedDate).toLocaleString()}
                </p>
              )}
            </div>
          </div>

          {/* Email Form */}
          <div className="space-y-4">
            {/* To Field */}
            <div className="space-y-2">
              <Label htmlFor="email-to" className="text-base font-semibold">
                To <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email-to"
                type="email"
                placeholder="recipient@example.com"
                value={formData.to}
                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                className={errors.to ? 'border-destructive' : ''}
                disabled={isSending}
              />
              {errors.to && (
                <p className="text-sm text-destructive font-paragraph">{errors.to}</p>
              )}
            </div>

            {/* Subject Field */}
            <div className="space-y-2">
              <Label htmlFor="email-subject" className="text-base font-semibold">
                Subject <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email-subject"
                placeholder="Email subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className={errors.subject ? 'border-destructive' : ''}
                disabled={isSending}
              />
              {errors.subject && (
                <p className="text-sm text-destructive font-paragraph">{errors.subject}</p>
              )}
            </div>

            {/* Body Field */}
            <div className="space-y-2">
              <Label htmlFor="email-body" className="text-base font-semibold">
                Message <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="email-body"
                placeholder="Email message body"
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                rows={12}
                className={`font-mono text-sm ${errors.body ? 'border-destructive' : ''}`}
                disabled={isSending}
              />
              {errors.body && (
                <p className="text-sm text-destructive font-paragraph">{errors.body}</p>
              )}
              <p className="text-xs text-foreground/60 font-paragraph">
                The signed PDF will be automatically attached to this email with a stable filename.
              </p>
            </div>
          </div>

          {/* Upload Link Section - CRITICAL FIX */}
          {uploadToken && (
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-heading font-bold text-foreground text-sm mb-2 flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-blue-600" />
                Secure Upload Link
              </h4>
              <p className="text-xs text-foreground/80 mb-3">
                A unique upload link has been auto-inserted into the email body. You can also copy it manually:
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCopyUploadLink}
                  className="gap-2"
                >
                  {uploadLinkCopied ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Link
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleInsertUploadLink}
                  className="gap-2"
                >
                  <LinkIcon className="w-4 h-4" />
                  Insert Link Again
                </Button>
              </div>
              <p className="text-xs text-foreground/60 mt-2">
                {generateUploadLink(uploadToken)}
              </p>
            </div>
          )}

          {/* Template Variables Info */}
          <div className="bg-pastelgreen/20 rounded-lg p-4 border border-pastelgreen">
            <h4 className="font-heading font-bold text-foreground text-sm mb-2">
              📝 Template Variables Used
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-paragraph text-foreground/80">
              <div>
                <strong>Client Name:</strong> {clientName}
              </div>
              <div>
                <strong>Document Title:</strong> {document.documentName || 'Legal Document'}
              </div>
              <div>
                <strong>Date:</strong> {new Date().toLocaleDateString()}
              </div>
              <div>
                <strong>Paralegal Name:</strong> {paralegalName}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={handleSend}
              disabled={isSending}
              className="flex-1 gap-2"
              size="lg"
            >
              {isSending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Email
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isSending}
              size="lg"
              className="gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
