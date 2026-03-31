export interface GraphTestResult {
  success: boolean;
  message: string;
}

export async function testGraphConnection(): Promise<GraphTestResult> {
  return { success: false, message: 'Email backend not available in Wix Studio' };
}

export async function getBusinessEmailForDisplay(): Promise<string> {
  return 'Email disabled';
}
