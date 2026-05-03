/**
 * Single source of truth for contact information
 * Used across the entire LegalAssist site
 */

// Voice / call line
export const PHONE_DISPLAY = "226-272-5153";
export const PHONE_TEL = "+12262725153";
export const PHONE_HREF = `tel:${PHONE_TEL}`;

// SMS / text line (separate from voice — SMS-only number)
export const SMS_DISPLAY = "+1 (639) 999-2222";
export const SMS_TEL = "+16399992222";
export const SMS_HREF = `sms:${SMS_TEL}`;

// Email
export const EMAIL_PRIMARY = "jeanfrancois@legalassist.london";
export const EMAIL_HREF = `mailto:${EMAIL_PRIMARY}`;
