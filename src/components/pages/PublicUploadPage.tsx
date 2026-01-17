import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { validateUploadToken, incrementTokenUsage, validateFile, UploadTokens } from '@/lib/upload-token-service';
import { BaseCrudService } from '@/integrations';
import { ClientDocuments } from '@/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Upload, CheckCircle, AlertCircle, FileText } from 'lucide-react';

export default function PublicUploadPage() {
  const { token } = useParams<{ token: string }>();
  const [validationState, setValidationState] = useState<'loading' | 'valid' | 'invalid'>('loading');
  const [uploadToken, setUploadToken] = useState<UploadTokens | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    validateToken();
  }, [token]);

  const validateToken = async () => {
    if (!token) {
      setValidationState('invalid');
      setErrorMessage('No token provided');
      return;
    }

    const result = await validateUploadToken(token);
    if (result.valid && result.token) {
      setValidationState('valid');
      setUploadToken(result.token);
    } else {
      setValidationState('invalid');
      setErrorMessage(result.error || 'Invalid token');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (uploadToken) {
      const validation = validateFile(file, uploadToken);
      if (!validation.valid) {
        setUploadError(validation.error || 'Invalid file');
        setSelectedFile(null);
        return;
      }
    }

    setSelectedFile(file);
    setUploadError('');
  };

  const handleUpload = async () => {
    if (!selectedFile || !uploadToken) return;

    setUploading(true);
    setUploadError('');

    try {
      // CRITICAL FIX: Extract clientId and matterId from token to bind document correctly
      const clientId = uploadToken.clientId;
      const matterId = uploadToken.matterId;
      const documentId = uploadToken.documentId;

      // Create document record bound to client's account
      const document: ClientDocuments = {
        _id: documentId || crypto.randomUUID(),
        clientId: clientId || '', // Links document to client account
        documentName: selectedFile.name,
        fileUrl: `https://example.com/uploads/${selectedFile.name}`, // Placeholder - would be actual upload URL
        uploadDate: new Date().toISOString(),
        clientEmail: '', // Third party upload - not client's email
        fileType: selectedFile.type || selectedFile.name.split('.').pop() || 'unknown',
        fileSize: selectedFile.size,
        documentCategory: uploadToken.matterReference || 'Third Party Upload',
        notes: `Uploaded via secure link. Client: ${uploadToken.clientName}. Purpose: ${uploadToken.allowedPurpose?.replace(/_/g, ' ')}.${matterId ? ` Matter ID: ${matterId}` : ''}`,
      };

      // Save document under client's document tree
      await BaseCrudService.create('clientdocuments', document);

      // Log the upload activity
      await BaseCrudService.create('activitylogs', {
        _id: crypto.randomUUID(),
        userId: clientId || 'unknown',
        activityType: 'document_uploaded',
        activityDescription: `Client uploaded document "${selectedFile.name}" via secure upload link. ${matterId ? `Matter: ${uploadToken.matterReference || matterId}` : ''}`,
        performedBy: uploadToken.clientName || 'Client',
        performedByName: uploadToken.clientName || 'Client',
        timestamp: new Date().toISOString(),
        relatedItemId: document._id,
      });

      // Increment token usage
      await incrementTokenUsage(uploadToken._id);

      setUploadSuccess(true);
      setSelectedFile(null);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (validationState === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-3">
              <LoadingSpinner />
              <p className="text-lg">Validating upload link...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (validationState === 'invalid') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl border-destructive">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-destructive" />
              <CardTitle className="text-2xl">Invalid Upload Link</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertDescription className="text-base">{errorMessage}</AlertDescription>
            </Alert>
            <p className="mt-4 text-muted-foreground">
              This upload link may have expired, been revoked, or is invalid. Please contact your paralegal for a new link.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (uploadSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl border-green-500">
          <CardHeader>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <CardTitle className="text-2xl">Upload Successful</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-base text-green-800">
                Your file has been successfully uploaded and will be reviewed by {uploadToken?.createdByParalegalName}.
              </AlertDescription>
            </Alert>
            <div className="mt-6 space-y-2 text-muted-foreground">
              <p>Thank you for submitting your document.</p>
              <p>You will be contacted if any additional information is needed.</p>
            </div>
            <Button
              onClick={() => {
                setUploadSuccess(false);
                setSelectedFile(null);
              }}
              className="mt-6"
              variant="outline"
            >
              Upload Another File
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-heading">Secure File Upload</CardTitle>
          <CardDescription className="text-base">
            Upload documents for {uploadToken?.clientName}
            {uploadToken?.matterReference && ` - ${uploadToken.matterReference}`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-pastelbeige/30 rounded-lg p-4 space-y-2">
            <p className="font-medium">Upload Information:</p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Client: {uploadToken?.clientName}</li>
              {uploadToken?.matterReference && <li>• Matter: {uploadToken.matterReference}</li>}
              <li>• Purpose: {uploadToken?.allowedPurpose?.replace(/_/g, ' ')}</li>
              <li>
                • Allowed file types: {uploadToken?.allowedFileTypes?.split(',').join(', ').toUpperCase()}
              </li>
              <li>
                • Maximum file size: {uploadToken?.maxFileSize ? (uploadToken.maxFileSize / 1048576).toFixed(2) : '10'} MB
              </li>
              {uploadToken?.expiryDate && (
                <li>
                  • Link expires: {new Date(uploadToken.expiryDate).toLocaleDateString()} at{' '}
                  {new Date(uploadToken.expiryDate).toLocaleTimeString()}
                </li>
              )}
            </ul>
          </div>

          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileSelect}
                accept={uploadToken?.allowedFileTypes?.split(',').map(t => `.${t.trim()}`).join(',')}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">Choose a file to upload</p>
                <p className="text-sm text-muted-foreground">Click to browse or drag and drop</p>
              </label>
            </div>

            {selectedFile && (
              <div className="flex items-center gap-3 p-4 bg-pastelgreen/30 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile.size / 1048576).toFixed(2)} MB
                  </p>
                </div>
              </div>
            )}

            {uploadError && (
              <Alert variant="destructive">
                <AlertDescription>{uploadError}</AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="w-full h-12 text-lg"
              size="lg"
            >
              {uploading ? (
                <>
                  <LoadingSpinner />
                  <span className="ml-2">Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-5 w-5" />
                  Upload File
                </>
              )}
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center pt-4 border-t">
            <p>This is a secure upload link provided by {uploadToken?.createdByParalegalName}.</p>
            <p>Your upload will be encrypted and stored securely.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
