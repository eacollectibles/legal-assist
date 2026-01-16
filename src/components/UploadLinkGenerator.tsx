import { useState } from 'react';
import { createUploadToken, generateUploadLink } from '@/lib/upload-token-service';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link2, Copy, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UploadLinkGeneratorProps {
  clientId: string;
  clientName: string;
  matterId?: string;
  matterReference?: string;
  documentId?: string;
  paralegalId: string;
  paralegalName: string;
  onLinkGenerated?: (link: string, expiryDate: string) => void;
}

export default function UploadLinkGenerator({
  clientId,
  clientName,
  matterId,
  matterReference,
  documentId,
  paralegalId,
  paralegalName,
  onLinkGenerated,
}: UploadLinkGeneratorProps) {
  const [open, setOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Form state
  const [expiryHours, setExpiryHours] = useState('72');
  const [maxUsageCount, setMaxUsageCount] = useState('0');
  const [allowedFileTypes, setAllowedFileTypes] = useState('pdf,doc,docx,jpg,jpeg,png');
  const [maxFileSize, setMaxFileSize] = useState('10485760');
  const [purpose, setPurpose] = useState('UPLOAD_TO_CLIENT_PORTAL');

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const token = await createUploadToken({
        clientId,
        clientName,
        matterId,
        matterReference,
        documentId,
        createdByParalegalId: paralegalId,
        createdByParalegalName: paralegalName,
        allowedPurpose: purpose,
        expiryHours: parseInt(expiryHours),
        maxFileSize: parseInt(maxFileSize),
        allowedFileTypes,
        maxUsageCount: parseInt(maxUsageCount),
      });

      const link = generateUploadLink(token.token!);
      const expiry = new Date(token.expiryDate!).toLocaleString();
      
      setGeneratedLink(link);
      setExpiryDate(expiry);

      if (onLinkGenerated) {
        onLinkGenerated(link, expiry);
      }

      toast({
        title: 'Success',
        description: 'Upload link generated successfully',
      });
    } catch (error) {
      console.error('Error generating link:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate upload link',
        variant: 'destructive',
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: 'Copied',
      description: 'Upload link copied to clipboard',
    });
  };

  const handleClose = () => {
    setOpen(false);
    setGeneratedLink('');
    setExpiryDate('');
    setCopied(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Link2 className="h-4 w-4" />
          Generate Upload Link
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Generate Secure Upload Link</DialogTitle>
          <DialogDescription>
            Create a secure link for {clientName} to upload documents
          </DialogDescription>
        </DialogHeader>

        {!generatedLink ? (
          <div className="space-y-4 py-4">
            <Alert>
              <AlertDescription>
                This link will allow {clientName} to securely upload files without needing to log in.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Select value={purpose} onValueChange={setPurpose}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UPLOAD_TO_CLIENT_PORTAL">Upload to Client Portal</SelectItem>
                  <SelectItem value="DOCUMENT_SUBMISSION">Document Submission</SelectItem>
                  <SelectItem value="EVIDENCE_UPLOAD">Evidence Upload</SelectItem>
                  <SelectItem value="SIGNED_DOCUMENT_RETURN">Signed Document Return</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryHours">Link Expires In (Hours)</Label>
                <Select value={expiryHours} onValueChange={setExpiryHours}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24">24 hours (1 day)</SelectItem>
                    <SelectItem value="48">48 hours (2 days)</SelectItem>
                    <SelectItem value="72">72 hours (3 days)</SelectItem>
                    <SelectItem value="168">168 hours (1 week)</SelectItem>
                    <SelectItem value="336">336 hours (2 weeks)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxUsageCount">Maximum Uses</Label>
                <Select value={maxUsageCount} onValueChange={setMaxUsageCount}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Unlimited</SelectItem>
                    <SelectItem value="1">1 use only</SelectItem>
                    <SelectItem value="3">3 uses</SelectItem>
                    <SelectItem value="5">5 uses</SelectItem>
                    <SelectItem value="10">10 uses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="allowedFileTypes">Allowed File Types</Label>
              <Input
                id="allowedFileTypes"
                value={allowedFileTypes}
                onChange={e => setAllowedFileTypes(e.target.value)}
                placeholder="pdf,doc,docx,jpg,jpeg,png"
              />
              <p className="text-xs text-muted-foreground">
                Comma-separated list of file extensions
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxFileSize">Maximum File Size</Label>
              <Select value={maxFileSize} onValueChange={setMaxFileSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5242880">5 MB</SelectItem>
                  <SelectItem value="10485760">10 MB</SelectItem>
                  <SelectItem value="20971520">20 MB</SelectItem>
                  <SelectItem value="52428800">50 MB</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleGenerate} disabled={generating} className="w-full" size="lg">
              {generating ? 'Generating...' : 'Generate Upload Link'}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Upload link generated successfully!
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label>Upload Link</Label>
              <div className="flex gap-2">
                <Input value={generatedLink} readOnly className="font-mono text-sm" />
                <Button onClick={handleCopy} variant="outline">
                  {copied ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Link Expires</Label>
              <Input value={expiryDate} readOnly />
            </div>

            <Alert>
              <AlertDescription>
                <strong>Email Template Variables:</strong>
                <br />
                Use <code className="bg-gray-100 px-1 rounded">{'{{UPLOAD_LINK}}'}</code> for the link
                <br />
                Use <code className="bg-gray-100 px-1 rounded">{'{{UPLOAD_LINK_EXPIRY}}'}</code> for the expiry date
              </AlertDescription>
            </Alert>

            <div className="flex gap-2">
              <Button onClick={handleClose} variant="outline" className="flex-1">
                Close
              </Button>
              <Button
                onClick={() => {
                  handleCopy();
                  handleClose();
                }}
                className="flex-1"
              >
                Copy & Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
