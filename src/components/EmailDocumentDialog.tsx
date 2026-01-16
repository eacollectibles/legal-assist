import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send, X } from 'lucide-react';
import { GeneratedDocuments } from '@/entities';

interface EmailDocumentDialogProps {
  document: GeneratedDocuments | null;
  isOpen: boolean;
  onClose: () => void;
  onSend: (emailData: EmailFormData) => Promise<void>;
  paralegalName: string;
  clientName: string;
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
}: EmailDocumentDialogProps) {
  const [formData, setFormData] = useState<EmailFormData>({
    to: '',
    subject: '',
    body: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState<{ to?: string; subject?: string; body?: string }>({});

  // Auto-fill template when document changes
  useEffect(() => {
    if (document && isOpen) {
      const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const defaultSubject = `Your Signed Document: ${document.documentName || 'Legal Document'}`;
      const defaultBody = `Dear ${clientName},

I hope this message finds you well.

Please find attached your signed document "${document.documentName || 'Legal Document'}". This document has been reviewed, processed, and electronically signed on ${today}.

Key Details:
- Document: ${document.documentName || 'Legal Document'}
- Client: ${clientName}
- Date: ${today}
- Signed by: ${paralegalName}

The attached PDF is the official signed version of your document. Please download and save it for your records.

If you have any questions or need any clarification regarding this document, please don't hesitate to reach out to me directly.

Best regards,
${paralegalName}
LegalAssist`;

      setFormData({
        to: document.clientEmail || '',
        subject: defaultSubject,
        body: defaultBody,
      });
      setErrors({});
    }
  }, [document, isOpen, clientName, paralegalName]);

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
