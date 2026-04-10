/**
 * PDF Form Auto-Fill Utility
 *
 * Uses pdf-lib to open fillable PDF forms from Ontario POA courts
 * and auto-populate them with client and paralegal information.
 *
 * Flow:
 * 1. Fetch the blank fillable PDF (from our hosted copy or external URL)
 * 2. Read all form fields
 * 3. Match fields to client/paralegal data using smart field-name mapping
 * 4. Fill matched fields
 * 5. Return the filled PDF as a downloadable blob
 */

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import type { ClientProfiles } from '@/entities';
import type { CityCourtInfo } from '@/lib/city-court-data';

// ============================================================
// PARALEGAL INFO (your firm's info for form filling)
// ============================================================

export interface ParalegalInfo {
  firmName: string;
  paralegalName: string;
  lsoLicenseNumber: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  fax?: string;
}

export const FIRM_INFO: ParalegalInfo = {
  firmName: 'LegalAssist Paralegal Services',
  paralegalName: 'Jean-Francois Demers',
  lsoLicenseNumber: 'P12345', // TODO: Replace with real LSO number
  phone: '226-272-5153',
  email: 'jeanfrancois@legalassist.london',
  address: '123 Main Street, Suite 200', // TODO: Replace with real address
  city: 'London',
  province: 'ON',
  postalCode: 'N6A 1B2', // TODO: Replace with real postal code
  fax: '',
};

// ============================================================
// FIELD NAME MAPPING
// ============================================================

/**
 * Common field name patterns found in Ontario POA fillable PDFs.
 * Each key is a data field, and the value is an array of possible
 * PDF form field names that might correspond to it.
 */
const FIELD_PATTERNS: Record<string, string[]> = {
  // Client name fields
  'clientFirstName': ['first_name', 'firstname', 'first name', 'given_name', 'givenname', 'defendant_first', 'def_first', 'fname'],
  'clientLastName': ['last_name', 'lastname', 'last name', 'surname', 'family_name', 'defendant_last', 'def_last', 'lname'],
  'clientFullName': ['name', 'full_name', 'fullname', 'defendant_name', 'defendant', 'applicant_name', 'applicant', 'respondent_name', 'client_name', 'print_name', 'printed_name'],
  'clientAddress': ['address', 'street_address', 'street', 'mailing_address', 'address_line_1', 'address1', 'defendant_address', 'residential_address'],
  'clientStreetNumber': ['street_number', 'street_no', 'st_number', 'house_number', 'civic_number', 'number', 'no'],
  'clientStreetName': ['street_name', 'st_name'],
  'clientStreetType': ['street_type', 'st_type', 'type_of_street'],
  'clientStreetDirection': ['street_direction', 'direction', 'st_direction', 'dir'],
  'clientUnit': ['unit', 'apt', 'suite', 'apartment', 'unit_number', 'apt_number'],
  'clientCity': ['city', 'municipality', 'town', 'defendant_city'],
  'clientProvince': ['province', 'prov', 'state', 'defendant_province'],
  'clientPostalCode': ['postal_code', 'postalcode', 'postal', 'zip', 'zip_code', 'defendant_postal'],
  'clientPhone': ['phone', 'telephone', 'phone_number', 'tel', 'daytime_phone', 'contact_phone', 'defendant_phone'],
  'clientEmail': ['email', 'email_address', 'e_mail', 'defendant_email'],
  'clientDOB': ['date_of_birth', 'dob', 'birth_date', 'birthdate'],

  // Paralegal / Representative fields
  'paralegalName': ['representative', 'agent', 'paralegal', 'counsel', 'lawyer', 'solicitor', 'agent_name', 'representative_name', 'licensed_representative'],
  'paralegalPhone': ['rep_phone', 'agent_phone', 'counsel_phone', 'representative_phone'],
  'paralegalEmail': ['rep_email', 'agent_email', 'counsel_email', 'representative_email'],
  'paralegalAddress': ['rep_address', 'agent_address', 'counsel_address', 'representative_address'],
  'lsoNumber': ['lso', 'lso_number', 'license_number', 'licence', 'lsuc', 'law_society'],
  'firmName': ['firm', 'firm_name', 'law_firm', 'legal_firm'],

  // Court / Case fields
  'courtAddress': ['court_address', 'court_location', 'court'],
  'courtCity': ['court_city'],
  'offenceNumber': ['offence_number', 'ticket_number', 'information_number', 'charge_number', 'notice_number'],
  'offenceDate': ['offence_date', 'date_of_offence', 'violation_date'],
  'courtDate': ['court_date', 'trial_date', 'hearing_date', 'appearance_date', 'return_date'],

  // Date fields
  'todayDate': ['date', 'today', 'signed_date', 'filing_date', 'current_date'],

  // Signature fields
  'signatureName': ['signature', 'signed_by', 'sign', 'electronic_signature', 'e_signature', 'signed', 'sig'],
  'signatureDate': ['signature_date', 'date_signed', 'signing_date', 'sig_date'],
};

/**
 * Checkbox field name patterns — these map to checkboxes that should be checked.
 * Each key describes the intent, value is an array of possible field names.
 */
const CHECKBOX_PATTERNS: Record<string, string[]> = {
  // "I wish to enter a plea" / "I intend to appear at trial"
  'enterPlea': [
    'plea', 'enter_plea', 'enter_a_plea', 'wish_to_enter', 'intend_to_appear',
    'intend_appear', 'appear_at_trial', 'not_guilty', 'not guilty', 'dispute',
    'wish_to_dispute', 'contest', 'trial_option', 'option_c', 'option_3',
  ],
  // Appearance type: "I wish to appear electronically"
  'appearElectronically': [
    'electronic', 'electronically', 'appear_electronically', 'electronic_appearance',
    'remote', 'video', 'telephone', 'virtual', 'zoom', 'teams',
    'wish_to_appear_electronically', 'appear_by_electronic',
  ],
  // Appearance type: "I wish to appear in person"
  'appearInPerson': [
    'in_person', 'in person', 'appear_in_person', 'person', 'attendance',
  ],
};

// ============================================================
// CORE FUNCTIONS
// ============================================================

/**
 * CORS proxies to try when direct fetch fails.
 * These are free public proxies — if one goes down, the others may still work.
 */
const CORS_PROXIES = [
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
];

/**
 * Fetches a PDF from a URL and returns it as an ArrayBuffer.
 * Tries direct fetch first, then cycles through CORS proxies.
 * Throws a special CORS_BLOCKED error so the UI can offer the upload fallback.
 */
export const CORS_BLOCKED = 'CORS_BLOCKED';

async function fetchPDF(url: string): Promise<ArrayBuffer> {
  // 1. Try direct fetch
  try {
    const response = await fetch(url, { mode: 'cors' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const buffer = await response.arrayBuffer();
    // Sanity check: PDFs start with %PDF
    if (buffer.byteLength > 4) {
      const header = new Uint8Array(buffer.slice(0, 5));
      const headerStr = String.fromCharCode(...header);
      if (headerStr.startsWith('%PDF')) return buffer;
    }
    // If it doesn't look like a PDF, still return it (might be valid)
    if (buffer.byteLength > 1000) return buffer;
    throw new Error('Response too small to be a PDF');
  } catch {
    // Direct fetch failed, try proxies
  }

  // 2. Try each CORS proxy
  for (const makeProxyUrl of CORS_PROXIES) {
    try {
      const proxyUrl = makeProxyUrl(url);
      const response = await fetch(proxyUrl);
      if (!response.ok) continue;
      const buffer = await response.arrayBuffer();
      if (buffer.byteLength < 100) continue; // Too small, proxy returned an error page
      return buffer;
    } catch {
      continue;
    }
  }

  // 3. All methods failed
  const err = new Error(
    `CORS blocked: Cannot download this PDF automatically. Click "Open Blank" to download it manually, then use "Upload & Fill" to auto-populate it.`
  );
  (err as any).code = CORS_BLOCKED;
  throw err;
}

/**
 * Known street type abbreviations and their full forms.
 * Used to detect and separate street type from the street name.
 */
const STREET_TYPES = [
  'Street', 'St', 'Avenue', 'Ave', 'Boulevard', 'Blvd', 'Drive', 'Dr',
  'Road', 'Rd', 'Lane', 'Ln', 'Court', 'Ct', 'Place', 'Pl', 'Way',
  'Crescent', 'Cres', 'Circle', 'Cir', 'Terrace', 'Terr', 'Trail', 'Trl',
  'Parkway', 'Pkwy', 'Highway', 'Hwy', 'Close', 'Gate', 'Grove', 'Grv',
  'Square', 'Sq', 'Path', 'Walk', 'Line', 'Concession', 'Con',
];

const DIRECTIONS = ['N', 'S', 'E', 'W', 'North', 'South', 'East', 'West', 'NE', 'NW', 'SE', 'SW'];

/**
 * Parses a full street address like "123 Main Street N" into components:
 * { number: "123", name: "Main", type: "Street", direction: "N", full: "123 Main Street N" }
 */
function parseAddress(address: string): {
  number: string;
  name: string;
  type: string;
  direction: string;
  full: string;
} {
  const result = { number: '', name: '', type: '', direction: '', full: address || '' };
  if (!address) return result;

  // Remove unit/apt prefix if present (e.g., "Unit 5 - 123 Main St")
  const cleanAddress = address.replace(/^(unit|apt|suite)\s*#?\s*\d+\s*[-,]?\s*/i, '').trim();
  const parts = cleanAddress.split(/\s+/);

  if (parts.length === 0) return result;

  // First part is typically the street number
  if (/^\d+[A-Za-z]?$/.test(parts[0])) {
    result.number = parts[0];
    parts.shift();
  }

  // Check if last part is a direction
  if (parts.length > 0) {
    const lastPart = parts[parts.length - 1];
    if (DIRECTIONS.some(d => d.toLowerCase() === lastPart.toLowerCase())) {
      result.direction = lastPart;
      parts.pop();
    }
  }

  // Check if last remaining part is a street type
  if (parts.length > 0) {
    const lastPart = parts[parts.length - 1];
    const matchedType = STREET_TYPES.find(t =>
      t.toLowerCase() === lastPart.toLowerCase().replace(/\.$/, '')
    );
    if (matchedType) {
      result.type = matchedType;
      parts.pop();
    }
  }

  // Whatever is left is the street name
  result.name = parts.join(' ');

  return result;
}

/**
 * Builds a data map from client profile, paralegal info, and court info.
 */
function buildDataMap(
  client: ClientProfiles,
  paralegal: ParalegalInfo,
  court?: CityCourtInfo | null,
): Record<string, string> {
  const today = new Date();
  const todayStr = today.toLocaleDateString('en-CA'); // YYYY-MM-DD format

  // Parse the street address into components
  const parsedAddress = parseAddress(client.streetAddress || '');

  return {
    // Client
    clientFirstName: client.firstName || '',
    clientLastName: client.lastName || '',
    clientFullName: [client.firstName, client.lastName].filter(Boolean).join(' '),
    clientAddress: client.streetAddress || '',
    clientStreetNumber: parsedAddress.number,
    clientStreetName: parsedAddress.name,
    clientStreetType: parsedAddress.type,
    clientStreetDirection: parsedAddress.direction,
    clientUnit: client.unitNumber || '',
    clientCity: client.city || '',
    clientProvince: client.state || 'ON',
    clientPostalCode: client.zipCode || '',
    clientPhone: client.phoneNumber || '',
    clientEmail: '', // We don't expose email from profile here for privacy
    clientDOB: client.dateOfBirth ? new Date(client.dateOfBirth as string).toLocaleDateString('en-CA') : '',

    // Paralegal
    paralegalName: paralegal.paralegalName,
    paralegalPhone: paralegal.phone,
    paralegalEmail: paralegal.email,
    paralegalAddress: [paralegal.address, paralegal.city, paralegal.province, paralegal.postalCode].filter(Boolean).join(', '),
    lsoNumber: paralegal.lsoLicenseNumber,
    firmName: paralegal.firmName,

    // Court
    courtAddress: court?.courtAddress || '',
    courtCity: court?.city || '',

    // Dates
    todayDate: todayStr,
    offenceNumber: '',  // To be filled manually or from case data
    offenceDate: '',
    courtDate: client.courtDeadline ? new Date(client.courtDeadline as string).toLocaleDateString('en-CA') : '',
  };
}

/**
 * Attempts to match a PDF form field name to a data key using
 * fuzzy matching against known patterns.
 */
function matchFieldToData(fieldName: string, dataMap: Record<string, string>): string | null {
  const normalizedField = fieldName.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_');

  for (const [dataKey, patterns] of Object.entries(FIELD_PATTERNS)) {
    for (const pattern of patterns) {
      const normalizedPattern = pattern.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_');

      // Exact match
      if (normalizedField === normalizedPattern) {
        return dataMap[dataKey] || null;
      }

      // Contains match
      if (normalizedField.includes(normalizedPattern) || normalizedPattern.includes(normalizedField)) {
        return dataMap[dataKey] || null;
      }
    }
  }

  return null;
}

// ============================================================
// PUBLIC API
// ============================================================

export interface FormFieldInfo {
  name: string;
  type: string;
  value: string | null;
  matchedDataKey: string | null;
  autoFillValue: string | null;
}

/**
 * Inspects a PDF form and returns information about all its fields,
 * along with what data would be auto-filled.
 */
export async function inspectPDFForm(
  pdfBytes: ArrayBuffer,
  client: ClientProfiles,
  paralegal: ParalegalInfo = FIRM_INFO,
  court?: CityCourtInfo | null,
): Promise<FormFieldInfo[]> {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();
  const fields = form.getFields();
  const dataMap = buildDataMap(client, paralegal, court);

  return fields.map(field => {
    const name = field.getName();
    const type = field.constructor.name;
    let value: string | null = null;

    try {
      if ('getText' in field) {
        value = (field as any).getText() || null;
      }
    } catch { /* ignore */ }

    const autoFillValue = matchFieldToData(name, dataMap);

    return {
      name,
      type,
      value,
      matchedDataKey: autoFillValue ? name : null,
      autoFillValue,
    };
  });
}

/**
 * Matches a checkbox field name against known checkbox patterns.
 * Returns the pattern key if matched (e.g., 'appearElectronically'), or null.
 */
function matchCheckbox(fieldName: string): string | null {
  const normalized = fieldName.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_');

  for (const [key, patterns] of Object.entries(CHECKBOX_PATTERNS)) {
    for (const pattern of patterns) {
      const normalizedPattern = pattern.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_');
      if (normalized.includes(normalizedPattern) || normalizedPattern.includes(normalized)) {
        return key;
      }
    }
  }
  return null;
}

/**
 * Auto-fills a PDF form with client and paralegal data.
 * Also handles:
 * - Electronic signature (typed name in italic font)
 * - Checking "appear electronically" checkbox
 * - Setting signature date to today
 *
 * Returns the filled PDF as a Uint8Array ready for download.
 */
export async function autoFillPDFForm(
  pdfBytes: ArrayBuffer,
  client: ClientProfiles,
  paralegal: ParalegalInfo = FIRM_INFO,
  court?: CityCourtInfo | null,
  manualOverrides?: Record<string, string>,
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();
  const fields = form.getFields();
  const dataMap = buildDataMap(client, paralegal, court);

  // Add signature-specific data to the map
  const today = new Date();
  const todayFormatted = today.toLocaleDateString('en-CA'); // YYYY-MM-DD
  dataMap['signatureName'] = paralegal.paralegalName;
  dataMap['signatureDate'] = todayFormatted;

  // Apply manual overrides (like ticket number, offence date)
  if (manualOverrides) {
    Object.assign(dataMap, manualOverrides);
  }

  // Embed an italic font for electronic signature fields
  const italicFont = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

  let filledCount = 0;
  let checkboxCount = 0;

  for (const field of fields) {
    const name = field.getName();
    const fieldType = field.constructor.name;

    // ---- Handle checkboxes ----
    if (fieldType === 'PDFCheckBox') {
      const checkboxMatch = matchCheckbox(name);
      if (checkboxMatch === 'appearElectronically' || checkboxMatch === 'enterPlea') {
        try {
          (field as any).check();
          checkboxCount++;
          console.log(`Checked checkbox: ${name} (${checkboxMatch})`);
        } catch { /* ignore */ }
      }
      // Don't auto-check "in person" — we default to electronic
      continue;
    }

    // ---- Handle radio buttons ----
    if (fieldType === 'PDFRadioGroup') {
      try {
        const radioGroup = field as any;
        const options: string[] = radioGroup.getOptions?.() || [];
        // Look for an "electronically" option
        const electronicOption = options.find((opt: string) =>
          /electronic|remote|virtual|video|telephone/i.test(opt)
        );
        if (electronicOption) {
          radioGroup.select(electronicOption);
          checkboxCount++;
          console.log(`Selected radio: ${name} → ${electronicOption}`);
        }
      } catch { /* ignore */ }
      continue;
    }

    // ---- Handle text fields ----
    // Check manual override by exact field name first
    if (manualOverrides && manualOverrides[name]) {
      try {
        if ('setText' in field) {
          (field as any).setText(manualOverrides[name]);
          filledCount++;
          continue;
        }
      } catch { /* ignore */ }
    }

    // Auto-match text fields
    const autoValue = matchFieldToData(name, dataMap);
    if (autoValue) {
      try {
        if ('setText' in field) {
          const normalizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '_');
          const isSignatureField = /signature|signed_by|sign|e_sig|electronic_sig|sig$/.test(normalizedName);

          if (isSignatureField) {
            // Use italic font for electronic signature to look like a real signature
            (field as any).setText(autoValue);
            try {
              (field as any).updateAppearances(italicFont);
            } catch { /* some fields don't support updateAppearances */ }
            console.log(`Signed: ${name} → "${autoValue}" (italic)`);
          } else {
            (field as any).setText(autoValue);
          }
          filledCount++;
        }
      } catch { /* ignore */ }
    }
  }

  console.log(`Auto-filled ${filledCount} text fields, ${checkboxCount} checkboxes out of ${fields.length} total fields`);

  return pdfDoc.save();
}

/**
 * Fetches a PDF from URL, auto-fills it, and triggers a download.
 */
export async function fetchAndFillPDF(
  pdfUrl: string,
  formName: string,
  client: ClientProfiles,
  paralegal: ParalegalInfo = FIRM_INFO,
  court?: CityCourtInfo | null,
  manualOverrides?: Record<string, string>,
): Promise<{ success: boolean; filledCount: number; totalFields: number; error?: string; blob?: Blob; filename?: string }> {
  try {
    const pdfBytes = await fetchPDF(pdfUrl);
    const filledPdf = await autoFillPDFForm(pdfBytes, client, paralegal, court, manualOverrides);

    // Create blob and filename
    const blob = new Blob([filledPdf], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const clientName = [client.firstName, client.lastName].filter(Boolean).join('_') || 'client';
    const safeName = formName.replace(/[^a-zA-Z0-9-_ ]/g, '').replace(/\s+/g, '_');
    const filename = `${safeName}_${clientName}_${new Date().toISOString().slice(0, 10)}.pdf`;

    // Trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Get stats
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const totalFields = pdfDoc.getForm().getFields().length;

    return { success: true, filledCount: 0, totalFields, blob, filename }; // filledCount logged in autoFillPDFForm
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, filledCount: 0, totalFields: 0, error: message };
  }
}

/**
 * Takes a user-uploaded PDF file, auto-fills it, and returns the result.
 * Use this when the PDF can't be fetched from a URL (CORS blocked).
 */
export async function fillUploadedPDF(
  file: File,
  client: ClientProfiles,
  paralegal: ParalegalInfo = FIRM_INFO,
  court?: CityCourtInfo | null,
  manualOverrides?: Record<string, string>,
): Promise<{ blob: Blob; filename: string; fieldCount: number }> {
  const arrayBuffer = await file.arrayBuffer();
  const filledPdf = await autoFillPDFForm(arrayBuffer, client, paralegal, court, manualOverrides);

  const clientName = [client.firstName, client.lastName].filter(Boolean).join('_') || 'client';
  const originalName = file.name.replace('.pdf', '');
  const filename = `${originalName}_filled_${clientName}.pdf`;

  const blob = new Blob([filledPdf], { type: 'application/pdf' });

  // Get field count
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const fieldCount = pdfDoc.getForm().getFields().length;

  return { blob, filename, fieldCount };
}
