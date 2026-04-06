import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { ClientProfiles } from '@/entities';
import {
  createUploadToken,
  getParalegalTokens,
  revokeUploadToken,
  toggleTokenStatus,
  updateTokenExpiry,
  generateUploadLink,
  UploadTokens,
} from '@/lib/upload-token-service';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Copy, Plus, Link2, Clock, CheckCircle, XCircle, Eye, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function UploadTokenManagementPage() {
  const [tokens, setTokens] = useState<UploadTokens[]>([]);
  const [clients, setClients] = useState<ClientProfiles[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<UploadTokens | null>(null);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    clientId: '',
    clientName: '',
    matterId: '',
    matterReference: '',
    documentId: '',
    allowedPurpose: 'UPLOAD_TO_CLIENT_PORTAL',
    expiryHours: '72',
    maxFileSize: '10485760',
    allowedFileTypes: 'pdf,doc,docx,jpg,jpeg,png',
    maxUsageCount: '0',
    notes: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // In a real app, get the current paralegal's ID from auth context
      const paralegalId = 'current-paralegal-id';
      const tokensData = await getParalegalTokens(paralegalId);
      setTokens(tokensData.sort((a, b) => 
        new Date(b.createdDate || 0).getTime() - new Date(a.createdDate || 0).getTime()
      ));

      const { items: clientsData } = await BaseCrudService.getAll<ClientProfiles>('clientprofiles');
      setClients(clientsData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load upload tokens',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClientSelect = (clientId: string) => {
    const client = clients.find(c => c._id === clientId);
    if (client) {
      setFormData({
        ...formData,
        clientId,
        clientName: `${client.firstName} ${client.lastName}`,
      });
    }
  };

  const handleCreateToken = async () => {
    try {
      const newToken = await createUploadToken({
        clientId: formData.clientId,
        clientName: formData.clientName,
        matterId: formData.matterId || undefined,
        matterReference: formData.matterReference || undefined,
        documentId: formData.documentId || undefined,
        createdByParalegalId: 'current-paralegal-id',
        createdByParalegalName: 'Current Paralegal',
        allowedPurpose: formData.allowedPurpose,
        expiryHours: parseInt(formData.expiryHours),
        maxFileSize: parseInt(formData.maxFileSize),
        allowedFileTypes: formData.allowedFileTypes,
        maxUsageCount: parseInt(formData.maxUsageCount),
        notes: formData.notes || undefined,
      });

      setTokens([newToken, ...tokens]);
      setCreateDialogOpen(false);
      
      // Reset form
      setFormData({
        clientId: '',
        clientName: '',
        matterId: '',
        matterReference: '',
        documentId: '',
        allowedPurpose: 'UPLOAD_TO_CLIENT_PORTAL',
        expiryHours: '72',
        maxFileSize: '10485760',
        allowedFileTypes: 'pdf,doc,docx,jpg,jpeg,png',
        maxUsageCount: '0',
        notes: '',
      });

      toast({
        title: 'Success',
        description: 'Upload token created successfully',
      });
    } catch (error) {
      console.error('Error creating token:', error);
      toast({
        title: 'Error',
        description: 'Failed to create upload token',
        variant: 'destructive',
      });
    }
  };

  const handleCopyLink = (token: string) => {
    const link = generateUploadLink(token);
    navigator.clipboard.writeText(link);
    toast({
      title: 'Copied',
      description: 'Upload link copied to clipboard',
    });
  };

  const handleToggleStatus = async (tokenId: string, currentStatus: boolean) => {
    try {
      await toggleTokenStatus(tokenId, !currentStatus);
      setTokens(tokens.map(t => t._id === tokenId ? { ...t, isActive: !currentStatus } : t));
      toast({
        title: 'Success',
        description: `Token ${!currentStatus ? 'activated' : 'deactivated'}`,
      });
    } catch (error) {
      console.error('Error toggling token status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update token status',
        variant: 'destructive',
      });
    }
  };

  const handleRevokeToken = async (tokenId: string) => {
    try {
      await revokeUploadToken(tokenId, 'current-paralegal-id');
      await loadData();
      toast({
        title: 'Success',
        description: 'Token revoked successfully',
      });
    } catch (error) {
      console.error('Error revoking token:', error);
      toast({
        title: 'Error',
        description: 'Failed to revoke token',
        variant: 'destructive',
      });
    }
  };

  const getTokenStatus = (token: UploadTokens) => {
    if (token.revokedDate) return { label: 'Revoked', color: 'bg-gray-500' };
    if (!token.isActive) return { label: 'Inactive', color: 'bg-yellow-500' };
    
    const now = new Date();
    const expiry = new Date(token.expiryDate!);
    if (now > expiry) return { label: 'Expired', color: 'bg-red-500' };
    
    if (token.maxUsageCount && token.maxUsageCount > 0) {
      if ((token.usageCount || 0) >= token.maxUsageCount) {
        return { label: 'Used Up', color: 'bg-orange-500' };
      }
    }
    
    return { label: 'Active', color: 'bg-green-500' };
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-[100rem] mx-auto px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-heading font-bold text-foreground mb-2">Upload Token Management</h1>
            <p className="text-lg text-muted-foreground">
              Create and manage secure upload links for clients
            </p>
          </div>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Create Upload Link
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">Create New Upload Link</DialogTitle>
                <DialogDescription>
                  Generate a secure link for clients to upload documents
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Client *</Label>
                  <Select value={formData.clientId} onValueChange={handleClientSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map(client => (
                        <SelectItem key={client._id} value={client._id}>
                          {client.firstName} {client.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="matterId">Matter ID (Optional)</Label>
                    <Input
                      id="matterId"
                      value={formData.matterId}
                      onChange={e => setFormData({ ...formData, matterId: e.target.value })}
                      placeholder="e.g., CASE-2026-001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="matterReference">Matter Reference (Optional)</Label>
                    <Input
                      id="matterReference"
                      value={formData.matterReference}
                      onChange={e => setFormData({ ...formData, matterReference: e.target.value })}
                      placeholder="e.g., Smith v. Jones"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose</Label>
                  <Select value={formData.allowedPurpose} onValueChange={v => setFormData({ ...formData, allowedPurpose: v })}>
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
                    <Label htmlFor="expiryHours">Expiry (Hours)</Label>
                    <Input
                      id="expiryHours"
                      type="number"
                      value={formData.expiryHours}
                      onChange={e => setFormData({ ...formData, expiryHours: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxUsageCount">Max Uses (0 = Unlimited)</Label>
                    <Input
                      id="maxUsageCount"
                      type="number"
                      value={formData.maxUsageCount}
                      onChange={e => setFormData({ ...formData, maxUsageCount: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allowedFileTypes">Allowed File Types (comma-separated)</Label>
                  <Input
                    id="allowedFileTypes"
                    value={formData.allowedFileTypes}
                    onChange={e => setFormData({ ...formData, allowedFileTypes: e.target.value })}
                    placeholder="pdf,doc,docx,jpg,jpeg,png"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxFileSize">Max File Size (bytes)</Label>
                  <Input
                    id="maxFileSize"
                    type="number"
                    value={formData.maxFileSize}
                    onChange={e => setFormData({ ...formData, maxFileSize: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Current: {(parseInt(formData.maxFileSize) / 1048576).toFixed(2)} MB
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Internal notes about this upload link..."
                    rows={3}
                  />
                </div>

                <Button onClick={handleCreateToken} disabled={!formData.clientId} className="w-full" size="lg">
                  Create Upload Link
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : tokens.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Link2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">No upload tokens created yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Create your first secure upload link to get started
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Active Upload Links</CardTitle>
              <CardDescription>Manage secure upload links for your clients</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Matter</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tokens.map(token => {
                    const status = getTokenStatus(token);
                    return (
                      <TableRow key={token._id}>
                        <TableCell className="font-medium">{token.clientName}</TableCell>
                        <TableCell>{token.matterReference || '-'}</TableCell>
                        <TableCell className="text-sm">
                          {token.allowedPurpose?.replace(/_/g, ' ')}
                        </TableCell>
                        <TableCell>
                          <Badge className={`${status.color} text-white`}>{status.label}</Badge>
                        </TableCell>
                        <TableCell>
                          {token.usageCount || 0}
                          {token.maxUsageCount && token.maxUsageCount > 0 ? ` / ${token.maxUsageCount}` : ''}
                        </TableCell>
                        <TableCell className="text-sm">
                          {new Date(token.expiryDate!).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCopyLink(token.token!)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Switch
                              checked={token.isActive || false}
                              onCheckedChange={() => handleToggleStatus(token._id, token.isActive || false)}
                              disabled={!!token.revokedDate}
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedToken(token);
                                setDetailsDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {!token.revokedDate && (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRevokeToken(token._id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Token Details Dialog */}
        <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload Token Details</DialogTitle>
            </DialogHeader>
            {selectedToken && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Client</Label>
                    <p className="font-medium">{selectedToken.clientName}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Status</Label>
                    <Badge className={`${getTokenStatus(selectedToken).color} text-white mt-1`}>
                      {getTokenStatus(selectedToken).label}
                    </Badge>
                  </div>
                </div>

                {selectedToken.matterReference && (
                  <div>
                    <Label className="text-muted-foreground">Matter Reference</Label>
                    <p className="font-medium">{selectedToken.matterReference}</p>
                  </div>
                )}

                <div>
                  <Label className="text-muted-foreground">Upload Link</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={generateUploadLink(selectedToken.token!)}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button onClick={() => handleCopyLink(selectedToken.token!)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Created</Label>
                    <p>{new Date(selectedToken.createdDate!).toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Expires</Label>
                    <p>{new Date(selectedToken.expiryDate!).toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Usage Count</Label>
                    <p>
                      {selectedToken.usageCount || 0}
                      {selectedToken.maxUsageCount && selectedToken.maxUsageCount > 0
                        ? ` / ${selectedToken.maxUsageCount}`
                        : ' (unlimited)'}
                    </p>
                  </div>
                  {selectedToken.lastUsedDate && (
                    <div>
                      <Label className="text-muted-foreground">Last Used</Label>
                      <p>{new Date(selectedToken.lastUsedDate).toLocaleString()}</p>
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-muted-foreground">Allowed File Types</Label>
                  <p>{selectedToken.allowedFileTypes?.toUpperCase()}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Max File Size</Label>
                  <p>{selectedToken.maxFileSize ? (selectedToken.maxFileSize / 1048576).toFixed(2) : '10'} MB</p>
                </div>

                {selectedToken.notes && (
                  <div>
                    <Label className="text-muted-foreground">Notes</Label>
                    <p className="text-sm">{selectedToken.notes}</p>
                  </div>
                )}

                {selectedToken.revokedDate && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      Revoked on {new Date(selectedToken.revokedDate).toLocaleString()}
                      {selectedToken.revokedBy && ` by ${selectedToken.revokedBy}`}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
}
