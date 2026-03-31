/// <reference path="../.astro/types.d.ts" />

declare global {
  interface SDKTypeMode {
    strict: true;
  }
}

/**
 * Wix Secrets Manager module for backend code
 * Available only in backend (.web.ts) files
 */
declare module 'wix-secrets-backend' {
  /**
   * Retrieves a secret value from Wix Secrets Manager
   * @param secretName - The name of the secret to retrieve
   * @returns Promise resolving to the secret value
   */
  export function getSecret(secretName: string): Promise<string | null>;
}
