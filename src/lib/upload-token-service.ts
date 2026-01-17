import { BaseCrudService } from '@/integrations';

export interface UploadTokens {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  token?: string;
  clientId?: string;
  clientName?: string;
  matterId?: string;
  matterReference?: string;
  documentId?: string;
  createdByParalegalId?: string;
  createdByParalegalName?: string;
  allowedPurpose?: string;
  expiryDate?: Date | string;
  isActive?: boolean;
  maxFileSize?: number;
  allowedFileTypes?: string;
  usageCount?: number;
  maxUsageCount?: number;
  createdDate?: Date | string;
  lastUsedDate?: Date | string;
  revokedDate?: Date | string;
  revokedBy?: string;
  notes?: string;
}

export interface CreateUploadTokenParams {
  clientId: string;
  clientName: string;
  matterId?: string;
  matterReference?: string;
  documentId?: string;
  createdByParalegalId: string;
  createdByParalegalName: string;
  allowedPurpose?: string;
  expiryHours?: number;
  maxFileSize?: number;
  allowedFileTypes?: string;
  maxUsageCount?: number;
  notes?: string;
}

export interface ValidateTokenResult {
  valid: boolean;
  token?: UploadTokens;
  error?: string;
}

/**
 * Generate a cryptographically secure token
 */
export function generateSecureToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Create a new upload token
 */
export async function createUploadToken(params: CreateUploadTokenParams): Promise<UploadTokens> {
  const token = generateSecureToken();
  const now = new Date();
  const expiryDate = new Date(now.getTime() + (params.expiryHours || 72) * 60 * 60 * 1000);

  const uploadToken: UploadTokens = {
    _id: crypto.randomUUID(),
    token,
    clientId: params.clientId,
    clientName: params.clientName,
    matterId: params.matterId,
    matterReference: params.matterReference,
    documentId: params.documentId,
    createdByParalegalId: params.createdByParalegalId,
    createdByParalegalName: params.createdByParalegalName,
    allowedPurpose: params.allowedPurpose || 'UPLOAD_TO_CLIENT_PORTAL',
    expiryDate: expiryDate.toISOString(),
    isActive: true,
    maxFileSize: params.maxFileSize || 10485760, // 10MB default
    allowedFileTypes: params.allowedFileTypes || 'pdf,doc,docx,jpg,jpeg,png',
    usageCount: 0,
    maxUsageCount: params.maxUsageCount || 0, // 0 = unlimited
    createdDate: now.toISOString(),
    notes: params.notes,
  };

  await BaseCrudService.create('uploadtokens', uploadToken);
  return uploadToken;
}

/**
 * Validate an upload token
 */
export async function validateUploadToken(token: string): Promise<ValidateTokenResult> {
  const { items } = await BaseCrudService.getAll<UploadTokens>('uploadtokens');
  const uploadToken = items.find(t => t.token === token);

  if (!uploadToken) {
    return { valid: false, error: 'Invalid token' };
  }

  if (!uploadToken.isActive) {
    return { valid: false, error: 'Token has been deactivated' };
  }

  if (uploadToken.revokedDate) {
    return { valid: false, error: 'Token has been revoked' };
  }

  const now = new Date();
  const expiryDate = uploadToken.expiryDate;
  
  if (expiryDate) {
    try {
      const expiry = new Date(expiryDate);
      if (!isNaN(expiry.getTime()) && now > expiry) {
        return { valid: false, error: 'Token has expired' };
      }
    } catch (error) {
      console.error('Error parsing expiry date:', error);
      return { valid: false, error: 'Invalid expiry date' };
    }
  }

  if (uploadToken.maxUsageCount && uploadToken.maxUsageCount > 0) {
    if ((uploadToken.usageCount || 0) >= uploadToken.maxUsageCount) {
      return { valid: false, error: 'Token usage limit reached' };
    }
  }

  return { valid: true, token: uploadToken };
}

/**
 * Increment token usage count
 */
export async function incrementTokenUsage(tokenId: string): Promise<void> {
  const token = await BaseCrudService.getById<UploadTokens>('uploadtokens', tokenId);
  if (token) {
    await BaseCrudService.update<UploadTokens>('uploadtokens', {
      _id: tokenId,
      usageCount: (token.usageCount || 0) + 1,
      lastUsedDate: new Date().toISOString(),
    });
  }
}

/**
 * Revoke an upload token
 */
export async function revokeUploadToken(tokenId: string, revokedBy: string): Promise<void> {
  await BaseCrudService.update<UploadTokens>('uploadtokens', {
    _id: tokenId,
    isActive: false,
    revokedDate: new Date().toISOString(),
    revokedBy,
  });
}

/**
 * Toggle token active status
 */
export async function toggleTokenStatus(tokenId: string, isActive: boolean): Promise<void> {
  await BaseCrudService.update<UploadTokens>('uploadtokens', {
    _id: tokenId,
    isActive,
  });
}

/**
 * Update token expiry date
 */
export async function updateTokenExpiry(tokenId: string, expiryHours: number): Promise<void> {
  const newExpiry = new Date(Date.now() + expiryHours * 60 * 60 * 1000);
  await BaseCrudService.update<UploadTokens>('uploadtokens', {
    _id: tokenId,
    expiryDate: newExpiry.toISOString(),
  });
}

/**
 * Get all tokens for a client
 */
export async function getClientTokens(clientId: string): Promise<UploadTokens[]> {
  const { items } = await BaseCrudService.getAll<UploadTokens>('uploadtokens');
  return items.filter(t => t.clientId === clientId);
}

/**
 * Get all tokens created by a paralegal
 */
export async function getParalegalTokens(paralegalId: string): Promise<UploadTokens[]> {
  const { items } = await BaseCrudService.getAll<UploadTokens>('uploadtokens');
  return items.filter(t => t.createdByParalegalId === paralegalId);
}

/**
 * Generate upload link URL
 */
export function generateUploadLink(token: string): string {
  const baseUrl = window.location.origin;
  return `${baseUrl}/upload/${token}`;
}

/**
 * Validate file against token restrictions
 */
export function validateFile(file: File, token: UploadTokens): { valid: boolean; error?: string } {
  // Check file size
  if (token.maxFileSize && file.size > token.maxFileSize) {
    const maxSizeMB = (token.maxFileSize / 1048576).toFixed(2);
    return { valid: false, error: `File size exceeds maximum allowed size of ${maxSizeMB}MB` };
  }

  // Check file type
  if (token.allowedFileTypes) {
    const allowedTypes = token.allowedFileTypes.split(',').map(t => t.trim().toLowerCase());
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (!fileExtension || !allowedTypes.includes(fileExtension)) {
      return { valid: false, error: `File type not allowed. Allowed types: ${token.allowedFileTypes}` };
    }
  }

  return { valid: true };
}
