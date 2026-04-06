/**
 * TrafficTicketFormsPage.tsx
 * Complete directory of Ontario traffic ticket (POA) forms and
 * city-by-city court information, payment portals, and dispute links.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Search, ExternalLink, Download, Shield, ArrowRight, Phone,
  ChevronRight, ChevronDown, ChevronUp, CheckCircle, Info, Gavel, BookOpen,
  DollarSign, MapPin, Clock, Globe, Mail, Car, AlertTriangle, Scale
} from 'lucide-react';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ============================================================
// POA FORMS DATA
// ============================================================

interface POAForm {
  number: string;
  formId: string;
  title: string;
  description: string;
  category: 'offence-notice' | 'defendant' | 'court' | 'appeal' | 'enforcement' | 'parking';
  pdfUrl: string;
  popular?: boolean;
}

const POA_FORMS: POAForm[] = [
  // ─── OFFENCE NOTICES (Issued by Officers) ───
  {
    number: 'Form 1',
    formId: 'POA-0846',
    title: 'Certificate of Offence',
    description: 'Issued by the officer when a Part I offence is charged. This is the official record of the charge that is filed with the court. Not filled in by defendants.',
    category: 'offence-notice',
    pdfUrl: 'https://ontariocourtforms.on.ca/en/provincial-offences-act-forms/poa-0846/',
  },
  {
    number: 'Form 3',
    formId: 'POA-0848',
    title: 'Offence Notice',
    description: 'The ticket you receive from the officer for a Part I offence (e.g., speeding, red light). Shows the charge, fine amount, and your three options: pay, request early resolution, or request a trial.',
    category: 'offence-notice',
    pdfUrl: 'https://ontariocourtforms.on.ca/en/provincial-offences-act-forms/poa-0848/',
    popular: true,
  },
  {
    number: 'Form 4',
    formId: 'POA-0849',
    title: 'Offence Notice (Early Resolution Available)',
    description: 'Offence notice issued in municipalities where the defendant may request a meeting with a prosecutor to resolve the matter before trial.',
    category: 'offence-notice',
    pdfUrl: 'https://ontariocourtforms.on.ca/en/provincial-offences-act-forms/poa-0849/',
  },
  {
    number: 'Form 5',
    formId: 'POA-0850',
    title: 'Summons (Part I)',
    description: 'A court summons requiring the defendant to appear in court on a specific date for a Part I offence. Issued instead of a regular ticket in certain circumstances.',
    category: 'offence-notice',
    pdfUrl: 'https://ontariocourtforms.on.ca/en/provincial-offences-act-forms/poa-0850/',
  },
  {
    number: 'Form 5.1',
    formId: 'POA-0862',
    title: 'Offence Notice — Highway Traffic Act Contravention (Automated)',
    description: 'Offence notice for automated speed enforcement (photo radar) or red light camera contraventions under the Highway Traffic Act.',
    category: 'offence-notice',
    pdfUrl: 'https://ontariocourtforms.on.ca/en/provincial-offences-act-forms/poa-0862/',
    popular: true,
  },
  {
    number: 'Form 6',
    formId: 'POA-0860',
    title: 'Offence Notice (Part III — Summons)',
    description: 'For more serious Part III provincial offences where an information is laid and a summons is issued requiring the defendant to appear in court on a specified date.',
    category: 'offence-notice',
    pdfUrl: 'https://ontariocourtforms.on.ca/en/provincial-offences-act-forms/poa-0860/',
  },
  {
    number: 'Form 7',
    formId: 'POA-0861',
    title: 'Summons (Part III)',
    description: 'A court summons for Part III offences. These are more serious provincial offences that carry higher penalties and require a mandatory court appearance.',
    category: 'offence-notice',
    pdfUrl: 'https://ontariocourtforms.on.ca/en/provincial-offences-act-forms/poa-0861/',
  },
  {
    number: 'Form 7.1',
    formId: 'POA-0851',
    title: 'Early Resolution Meeting Notice',
    description: 'Notice scheduling a meeting with the prosecutor to discuss resolution options before trial. You may negotiate a reduced fine or fewer demerit points.',
    category: 'court',
    pdfUrl: 'https://ontariocourtforms.on.ca/en/provincial-offences-act-forms/poa-0851/',
    popular: true,
  },

  // ─── DEFENDANT FORMS ───
  {
    number: 'Form 8',
    formId: 'POA-0813',
    title: 'Notice of Intention to Appear',
    description: 'Filed by the defendant to request a trial date for a Part I offence. Must be filed within 15 days of receiving the ticket. This is the most important form if you want to fight your ticket.',
    category: 'defendant',
    pdfUrl: 'https://ontariocourtforms.on.ca/en/provincial-offences-act-forms/poa-0813/',
    popular: true,
  },
  {
    number: 'Form 9',
    formId: 'POA-0853',
    title: 'Fail to Respond — Notice of Impending Conviction',
    description: 'Sent to the defendant when they have not responded to a Part I ticket within the required time. Warns that a conviction will be entered if no action is taken.',
    category: 'court',
    pdfUrl: 'https://ontariocourtforms.on.ca/en/provincial-offences-act-forms/poa-0853/',
  },
  {
    number: 'Form 10',
    formId: 'POA-0854',
    title: 'Notice of Fine and Due Date',
    description: 'Issued after conviction. Shows the total fine amount (including victim fine surcharge and court costs) and the due date for payment.',
    category: 'enforcement',
    pdfUrl: 'https://ontariocourtforms.on.ca/en/provincial-offences-act-forms/poa-0854/',
    popular: true,
  },

  // ─── PARKING FORMS ───
  {
    number: 'Form 11',
    formId: 'POA-0855',
    title: 'Certificate of Parking Infraction',
    description: 'Filed by the municipality with the court as the official record of a parking infraction. Not filled in by defendants.',
    category: 'parking',
    pdfUrl: 'https://ontariocourtforms.on.ca/en/provincial-offences-act-forms/poa-0855/',
  },
  {
    number: 'Form 12',
    formId: 'POA-0856',
    title: 'Parking Infraction Notice',
    description: 'The parking ticket you receive on your windshield. Shows the parking infraction, fine amount, and options for paying or disputing.',
    category: 'parking',
    pdfUrl: 'https://ontariocourtforms.on.ca/en/provincial-offences-act-forms/poa-0856/',
    popular: true,
  },
  {
    number: 'Form 13',
    formId: 'POA-0857',
    title: 'Parking Infraction Notice (In-Person Filing Required)',
    description: 'Parking infraction notice used in municipalities where the Notice of Intention to Appear must be filed in person at the court office.',
    category: 'parking',
    pdfUrl: 'https://ontariocourtforms.on.ca/en/provincial-offences-act-forms/poa-0857/',
  },

  // ─── COURT & PROCESS FORMS ───
  {
    number: 'Form 14',
    formId: 'POA-0811',
    title: 'Notice of Trial',
    description: 'Sent by the court to notify all parties of the scheduled trial date, time, and courtroom location for a provincial offences trial.',
    category: 'court',
    pdfUrl: 'https://ontariocourtforms.on.ca/en/provincial-offences-act-forms/poa-0811/',
  },
  {
    number: 'Form 15',
    formId: 'POA-0812',
    title: 'Notice of Acquittal',
    description: 'Issued by the court when a defendant is found not guilty of the offence. Confirms the charge has been dismissed.',
    category: 'court',
    pdfUrl: 'https://ontariocourtforms.on.ca/en/provincial-offences-act-forms/poa-0812/',
  },

  // ─── APPEAL & REOPENING FORMS ───
  {
    number: 'Appeal Form',
    formId: 'POA-0870',
    title: 'Notice of Appeal — Part I',
    description: 'Filed to appeal a Part I conviction to the Ontario Court of Justice. Must be filed within 30 days of the conviction. A $75 appeal fee applies.',
    category: 'appeal',
    pdfUrl: 'https://ontariocourtforms.on.ca/en/provincial-offences-act-forms/poa-0870/',
    popular: true,
  },
  {
    number: 'Appeal Form',
    formId: 'POA-0871',
    title: 'Notice of Appeal — Part III',
    description: 'Filed to appeal a Part III conviction. Part III offences are more serious provincial offences with higher maximum fines or potential imprisonment.',
    category: 'appeal',
    pdfUrl: 'https://ontariocourtforms.on.ca/en/provincial-offences-act-forms/poa-0871/',
  },
  {
    number: 'Reopening',
    formId: 'POA-0876',
    title: 'Affidavit in Support of Reopening (Part I)',
    description: 'Sworn statement filed to reopen a Part I conviction that was entered without your knowledge (e.g., you never received the ticket or missed the court date). Must show a valid reason for the absence.',
    category: 'appeal',
    pdfUrl: 'https://ontariocourtforms.on.ca/en/provincial-offences-act-forms/poa-0876/',
    popular: true,
  },
  {
    number: 'Reopening',
    formId: 'POA-0877',
    title: 'Affidavit in Support of Reopening (Part III)',
    description: 'Sworn statement to reopen a Part III conviction entered in the defendant\'s absence. Must demonstrate valid grounds for not appearing at trial.',
    category: 'appeal',
    pdfUrl: 'https://ontariocourtforms.on.ca/en/provincial-offences-act-forms/poa-0877/',
  },
  {
    number: 'Extension',
    formId: 'POA-0878',
    title: 'Application for Extension of Time to Pay Fine',
    description: 'Filed when you cannot pay a fine by the due date and need additional time. The court may grant an extension or set up a payment plan if financial hardship is demonstrated.',
    category: 'enforcement',
    pdfUrl: 'https://ontariocourtforms.on.ca/en/provincial-offences-act-forms/poa-0878/',
    popular: true,
  },
];

// ============================================================
// CITY COURT DATA
// ============================================================

interface CityForm {
  name: string;
  description: string;
  url?: string;
  submitMethod?: string;
}

interface CityCourtInfo {
  city: string;
  region?: string;
  courtAddress: string;
  phone: string;
  email?: string;
  paymentUrl?: string;
  paymentPortal: string;
  disputeUrl?: string;
  cityPageUrl?: string;
  municipalUrl: string;
  formsPageUrl?: string;
  hours: string;
  notes?: string;
  servesAreas?: string[];
  cityForms?: CityForm[];
}

const CITY_COURTS: CityCourtInfo[] = [
  {
    city: 'London',
    courtAddress: '824 Dundas St, London, ON',
    phone: '519-661-1882',
    email: 'POAAdmin@london.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://london.ca/provincial-offences',
    formsPageUrl: 'https://london.ca/provincial-offences',
    cityPageUrl: '/paralegal-london-ontario',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['London', 'Middlesex County'],
    cityForms: [
      { name: 'Notice of Intention to Appear', description: 'Request to appear in court to plead not guilty to your ticket.', url: 'https://london.ca/sites/default/files/2024-02/NOTICE%20OF%20INTENTION%20TO%20APPEAR.pdf' },
      { name: 'Request for Disclosure', description: 'Obtain the officer\'s notes and evidence for your case.', submitMethod: 'Email disclosure@london.ca' },
      { name: 'POA Court Transcript Order Form', description: 'Order transcripts of court proceedings for appeals.', url: 'https://london.ca/sites/default/files/2023-01/POA%20Court%20Transcript%20Order%20Form%20English.pdf' },
      { name: 'Guide to Appeals', description: 'Guide for defendants on the appeal process in POA cases.', url: 'https://london.ca/sites/default/files/2022-10/Guide%20to%20Appeals%20in%20Provincial%20Offences%20Cases%20.pdf' },
    ],
  },
  {
    city: 'Kitchener–Waterloo',
    region: 'Region of Waterloo',
    courtAddress: '77 Queen St. N, Kitchener, ON',
    phone: '519-745-9446',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.regionofwaterloo.ca/en/regional-government/provincial-offences-court-and-traffic-tickets.aspx',
    formsPageUrl: 'https://www.regionofwaterloo.ca/en/regional-government/provincial-offences-court-and-traffic-tickets.aspx',
    cityPageUrl: '/locations/kitchener',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Kitchener', 'Waterloo', 'Cambridge', 'Woolwich', 'Wilmot', 'Wellesley', 'North Dumfries'],
    cityForms: [
      { name: 'Guide for Defendants', description: 'Complete guide to provincial offences cases in Waterloo Region.', url: 'https://www.regionofwaterloo.ca/en/regional-government/resources/POA/guide-provincial-offences.pdf' },
      { name: 'Part I Appeal Information', description: 'How to appeal a Part I conviction in Waterloo Region court.', url: 'https://www.regionofwaterloo.ca/en/regional-government/resources/POA/Part-1.pdf' },
      { name: 'Automated Payment Request Form', description: 'Set up automated payments for outstanding fines.', submitMethod: 'Submit online at regionofwaterloo.ca' },
      { name: 'Summons Resolution Request', description: 'Request a resolution meeting for a summons offence.', submitMethod: 'Submit online at regionofwaterloo.ca' },
    ],
  },
  {
    city: 'Windsor',
    courtAddress: '400 City Hall Square East, Suite 401, Windsor, ON N9A 7K6',
    phone: '519-255-6555',
    email: 'poa.tickets@citywindsor.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.citywindsor.ca/city-hall/legal-services/provincial-offences',
    formsPageUrl: 'https://www.citywindsor.ca/city-hall/legal-services/provincial-offences/poa-forms',
    cityPageUrl: '/locations/windsor',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Windsor', 'Essex County', 'Leamington', 'Amherstburg', 'LaSalle', 'Tecumseh'],
    cityForms: [
      { name: 'Request to Reschedule Early Resolution Meeting', description: 'Reschedule or postpone an early resolution meeting (POA0859).', url: 'https://www.citywindsor.ca/Documents/city-hall/legal-services/provincial-offences/FORM%20-%20REQUEST%20TO%20RESCHEDULE%20POSTPONE%20AN%20EARLY%20RESOLUTION%20MEETING%20-%20POA0859.pdf' },
      { name: 'Application for Extension of Time to Pay', description: 'Request more time to pay your fine (Form 125).', submitMethod: 'Available on Windsor POA Forms page' },
      { name: 'Guide to Appeals', description: 'Information on how to appeal a provincial offences conviction.', url: 'https://www.citywindsor.ca/Documents/city-hall/legal-services/provincial-offences/Guide%20to%20Appeals.pdf' },
      { name: 'Part I Appeal Package', description: 'Complete package for filing a Part I appeal.', submitMethod: 'Available on Windsor POA Forms page' },
    ],
  },
  {
    city: 'Hamilton',
    courtAddress: '50 Main Street East, Room 110, Hamilton, ON L8N 1E9',
    phone: '905-540-5592',
    paymentUrl: 'https://www.ontario.ca/page/check-status-traffic-tickets-and-fines-online-or-request-meeting-resolve-your-case',
    paymentPortal: 'ontario.ca/ticketsandfines',
    municipalUrl: 'https://www.hamilton.ca/home-neighbourhood/tickets-fines-penalties/provincial-offences-notice',
    formsPageUrl: 'https://www.hamilton.ca/home-neighbourhood/tickets-fines-penalties/provincial-offences-notice',
    cityPageUrl: '/locations/hamilton',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Hamilton', 'Stoney Creek', 'Dundas', 'Ancaster', 'Flamborough'],
    cityForms: [
      { name: 'Application for Extension of Time to Pay', description: 'Request additional time to pay your fine (POA 0809).', url: 'https://www.hamilton.ca/sites/default/files/2024-01/ticketsfinespenalties-poa-application-for-extention-to-pay-fine.pdf' },
      { name: 'Request for Disclosure', description: 'Obtain officer\'s notes and prosecution evidence.', url: 'https://www.hamilton.ca/sites/default/files/2023-07/ticketsfinespenalties-poa-disclosure-request-2023.pdf' },
      { name: 'Notice of Motion', description: 'File a motion with the provincial offences court.', url: 'https://www.hamilton.ca/sites/default/files/2022-11/ticketsfinespenalties-poa-notice-of-motion-2022.pdf' },
      { name: 'Notice of Application for Adjournment', description: 'Request to postpone your court date.', url: 'https://www.hamilton.ca/sites/default/files/2022-11/ticketsfinespenalties-poa-notice-application-adjournment.pdf' },
      { name: 'Affidavit in Support of Reopening', description: 'Sworn statement to reopen a conviction entered in your absence (POA 0876).', url: 'https://www.hamilton.ca/sites/default/files/2023-09/ticketsfinespenalties-poa-affidavit-support-request-reopening-sep2023-english.pdf' },
      { name: 'Request for Photocopies', description: 'Request copies of court documents from your file.', url: 'https://www.hamilton.ca/sites/default/files/2022-11/ticketsfinespenalties-poa-request-for-photocopies-2022.pdf' },
      { name: 'POA Court Transcript Order Form', description: 'Order transcripts of court proceedings for appeals.', url: 'https://www.hamilton.ca/sites/default/files/2023-06/ticketsfinespenalties-poa-transcript-order-form-2023.pdf' },
      { name: 'Defendant Audio Request Form', description: 'Request audio recording of your court proceedings.', url: 'https://www.hamilton.ca/sites/default/files/2022-11/ticketsfinespenalties-poa-defendant-audio-request-form-2022.pdf' },
      { name: 'Notice of Fine and Due Date Guide', description: 'Information guide about fine payment and deadlines.', url: 'https://www.hamilton.ca/sites/default/files/2024-01/poa-notice-fine-due-date-guide.pdf' },
    ],
  },
  {
    city: 'Guelph',
    courtAddress: '59 Carden Street, Guelph, ON',
    phone: '519-826-0762',
    paymentUrl: 'https://guelph.ca/living/provincial-offences-court/',
    paymentPortal: 'guelph.ca/court',
    municipalUrl: 'https://guelph.ca/living/provincial-offences-court/',
    formsPageUrl: 'https://guelph.ca/living/provincial-offences-court/poa-forms/',
    cityPageUrl: '/locations/guelph',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Guelph', 'Wellington County', 'Puslinch', 'Guelph/Eramosa'],
    cityForms: [
      { name: 'Notice of Intention to Appear', description: 'Request a trial date for your ticket (POA 0813).', url: 'https://guelph.ca/wp-content/uploads/POA-NoticeOfIntentionToAppear.pdf' },
      { name: 'Application for Disclosure', description: 'Request the prosecution\'s evidence and officer notes.', url: 'https://guelph.ca/wp-content/uploads/POA_ApplicationForDisclosure.pdf' },
      { name: 'Reopening Application Package', description: 'Reopen a conviction entered in your absence with affidavit.', url: 'https://guelph.ca/wp-content/uploads/ReopeningApplicationpackage.pdf' },
      { name: 'Pre-Authorized Debit Form', description: 'Set up automatic payments for outstanding fines.', url: 'https://guelph.ca/wp-content/uploads/preauthorized-debit-form.pdf' },
      { name: 'Remote Appearance Request Form', description: 'Request to attend your hearing remotely via video.', submitMethod: 'Available on Guelph POA Forms page' },
      { name: 'Best Practices for Remote Hearings', description: 'Guide to attending your POA court hearing remotely.', url: 'https://guelph.ca/wp-content/uploads/POA-best-practices-for-remote-hearings.pdf' },
    ],
  },
  {
    city: 'Woodstock',
    region: 'Oxford County',
    courtAddress: '419 Hunter St, Woodstock, ON N4S 4G5',
    phone: '519-537-4890',
    email: 'poa@oxfordcounty.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.oxfordcounty.ca/Services-for-You/Fines-Provincial-Offences',
    formsPageUrl: 'https://www.oxfordcounty.ca/Services-for-You/Fines-Provincial-Offences',
    cityPageUrl: '/woodstock-paralegal',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    notes: 'Zoom and in-person appearances available. Drop box at main entrance for after-hours.',
    servesAreas: ['Woodstock', 'Ingersoll', 'Tillsonburg', 'Oxford County'],
    cityForms: [
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Email poa@oxfordcounty.ca' },
      { name: 'Reopening Application', description: 'Apply to reopen a conviction entered in your absence.', submitMethod: 'Email poa@oxfordcounty.ca' },
    ],
  },
  {
    city: 'Stratford',
    region: 'Perth County',
    courtAddress: '1 Huron Street, Stratford, ON',
    phone: '519-271-0531 ext 249',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.perthcounty.ca/en/living-here/provincial-offences-and-traffic-tickets.aspx',
    formsPageUrl: 'https://www.perthcounty.ca/en/living-here/provincial-offences-and-traffic-tickets.aspx',
    cityPageUrl: '/locations/stratford',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Stratford', 'Perth County', 'St. Marys', 'Mitchell', 'Listowel'],
    cityForms: [
      { name: 'POA Court Transcript Order Form', description: 'Order transcripts of court proceedings for appeals.', url: 'https://www.perthcounty.ca/en/living-here/resources/files/POA-Court-Transcript-OrderForm---2021.pdf' },
      { name: 'Request for Disclosure', description: 'Request officer notes and prosecution evidence.', submitMethod: 'Submit online at perthcounty.ca' },
    ],
  },
  {
    city: 'St. Thomas',
    region: 'Elgin County',
    courtAddress: '480 Sunset Drive, St. Thomas, ON N5R 0J5',
    phone: '519-633-1460',
    email: 'poadisclosure@elgin.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.elgincounty.ca/living-here/paying-your-ticket/',
    formsPageUrl: 'https://www.elgincounty.ca/living-here/paying-your-ticket/',
    cityPageUrl: '/st-thomas-paralegal',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['St. Thomas', 'Aylmer', 'Elgin County', 'Central Elgin', 'Dutton/Dunwich'],
    cityForms: [
      { name: 'Notice of Intention to Appear', description: 'Request a trial date for your ticket.', submitMethod: 'Email poa@elgin.ca' },
      { name: 'Request for Disclosure', description: 'Request officer notes and prosecution evidence.', submitMethod: 'Email poadisclosure@elgin.ca' },
    ],
  },
  {
    city: 'Sarnia',
    region: 'Lambton County',
    courtAddress: '150 N. Christina Street, Sarnia, ON',
    phone: '519-344-8880',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.lambtononline.ca/en/county-government/forms.aspx',
    formsPageUrl: 'https://www.lambtononline.ca/en/county-government/forms.aspx',
    cityPageUrl: '/locations/sarnia',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Sarnia', 'Lambton County', 'Petrolia', 'Point Edward'],
    cityForms: [
      { name: 'Resolution Meeting & Disclosure Request (Part I/II)', description: 'Request an early resolution meeting and disclosure of evidence.', url: 'https://www.lambtononline.ca/en/county-government/resources/Documents/Court-Services/Resolution-Meeting-Instructions-and-Disclosure-Request-for-Part-I-and-II-matters.pdf' },
      { name: 'MTO Crown Disclosure Form', description: 'Request MTO driving record disclosure from the Crown.', url: 'https://www.lambtononline.ca/en/county-government/resources/Documents/Court-Services/M.T.O.-Crown-Disclosure-Form.pdf' },
    ],
  },
  {
    city: 'Chatham-Kent',
    courtAddress: '21633 Communications Rd, Blenheim, ON N0P 1A0',
    phone: '519-352-8484',
    email: 'ckpoc@chatham-kent.ca',
    paymentUrl: 'https://www.chatham-kent.ca/localgovernment/poc/Pages/Paying-Tickets.aspx',
    paymentPortal: 'chatham-kent.ca',
    municipalUrl: 'https://www.chatham-kent.ca/localgovernment/poc/Pages/Paying-Tickets.aspx',
    formsPageUrl: 'https://www.chatham-kent.ca/localgovernment/poc/Pages/Forms.aspx',
    cityPageUrl: '/locations/chatham-kent',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    notes: 'Phone payments accepted (Visa, MasterCard, Debit, Amex). Drop-off box available.',
    servesAreas: ['Chatham', 'Kent County', 'Blenheim', 'Ridgetown', 'Tilbury', 'Wallaceburg'],
    cityForms: [
      { name: 'Reopening Package', description: 'Complete package to reopen a conviction entered in your absence.', url: 'https://www.chatham-kent.ca/localgovernment/poc/Documents/Reopening%20Package.pdf' },
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Contact court at 519-352-8484' },
      { name: 'Transcript Order Form', description: 'Order transcripts of court proceedings.', submitMethod: 'Contact court at ckpoc@chatham-kent.ca' },
    ],
  },
  {
    city: 'Toronto',
    courtAddress: '1530 Markham Road / 2700 Eglinton Ave W / 92 Front St E, Toronto',
    phone: '416-338-7320',
    email: 'poacourt@toronto.ca',
    paymentUrl: 'https://secure.toronto.ca/POAWeb/index.jsp',
    paymentPortal: 'toronto.ca/POAWeb',
    disputeUrl: 'https://www.toronto.ca/services-payments/tickets-fines-penalties/courts/dispute-your-provincial-offence/',
    municipalUrl: 'https://www.toronto.ca/services-payments/tickets-fines-penalties/',
    formsPageUrl: 'https://www.toronto.ca/services-payments/tickets-fines-penalties/courts/court-services-forms/',
    cityPageUrl: '/locations/toronto',
    hours: 'Mon–Fri, 8:30 AM – 5:00 PM',
    notes: 'Ticket code prefix determines court location: 4860 = 92 Front St E, 4862 = 2700 Eglinton Ave W, 4863 = 1530 Markham Rd.',
    servesAreas: ['Toronto', 'Scarborough', 'North York', 'Etobicoke', 'East York'],
    cityForms: [
      { name: 'Notice of Intention to Appear (NIA)', description: 'Request a trial without attending court in person.', url: 'https://www.toronto.ca/wp-content/uploads/2017/10/98d7-CS-NoticeOfIntetionToAppear-NIA.pdf' },
      { name: 'Application for Extension of Time to Pay Fine', description: 'Request more time to pay your fine (Form 125). Fillable PDF.', url: 'https://www.toronto.ca/wp-content/uploads/2021/12/9374-Fillable-poa-0809-rev0521-en-web-1-FINAL.pdf' },
      { name: 'Application for Reopening (Offence Notice)', description: 'Reopen a conviction under Section 11 of the POA.', submitMethod: 'Email poacourt@toronto.ca' },
      { name: 'Application for Reopening (Parking)', description: 'Reopen a parking conviction under Section 19(2) of the POA.', submitMethod: 'Email poacourt@toronto.ca' },
      { name: 'Change of Address Form', description: 'Notify the court of a change of address for your ticket.', submitMethod: 'Email poacourt@toronto.ca' },
      { name: 'Interpreter Request Form', description: 'Request court interpreter services for your hearing.', url: 'https://www.toronto.ca/wp-content/uploads/2017/10/90f1-CS-InterpreterRequestForm.pdf' },
      { name: 'Disclosure Request Form', description: 'Request officer notes and prosecution evidence for Part I offences.', url: 'https://www.toronto.ca/wp-content/uploads/2025/03/8fa3-Disclosure-Form.pdf' },
      { name: 'POA Court Transcript Order Form', description: 'Order transcripts of court proceedings for appeals.', submitMethod: 'Contact 416-338-7320' },
    ],
  },
  {
    city: 'Brampton',
    courtAddress: '5 Ray Lawson Boulevard, Brampton, ON',
    phone: '905-450-4770',
    email: 'ProvincialOffencesCourt@Brampton.ca',
    paymentUrl: 'https://www.brampton.ca/EN/residents/Court-Services/Provincial-Offences-Act/Pages/Ticket-Payments.aspx',
    paymentPortal: 'brampton.ca',
    municipalUrl: 'https://www.brampton.ca/EN/residents/Court-Services/Provincial-Offences-Act/Pages/Welcome.aspx',
    formsPageUrl: 'https://www.brampton.ca/EN/residents/Court-Services/Provincial-Offences-Act/Pages/Online-Forms-and-Guides.aspx',
    cityPageUrl: '/locations/brampton',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    notes: 'Trial requests can be emailed to requestatrial@brampton.ca.',
    servesAreas: ['Brampton', 'Caledon'],
    cityForms: [
      { name: 'Notice of Intention to Appear (NIA)', description: 'Request a trial for your ticket.', submitMethod: 'Email requestatrial@brampton.ca' },
      { name: 'Adjournment of First Trial Date', description: 'Request to postpone your first trial date (POA 0843).', url: 'https://www.brampton.ca/EN/residents/Court-Services/Provincial-Offences-Act/Documents/Adjournment%20of%20First%20Trial%20Date.pdf' },
      { name: 'Early Resolution Reopening', description: 'Application to reopen for an early resolution meeting.', url: 'https://www.brampton.ca/EN/residents/Court-Services/Provincial-Offences-Act/Documents/Reopening-Early-Resolution.pdf' },
      { name: 'Application for Extension of Time to Pay', description: 'Request more time to pay your fine.', submitMethod: 'Available on Brampton online forms page' },
      { name: 'Address Update Form', description: 'Update your address for court correspondence.', submitMethod: 'Available on Brampton online forms page' },
      { name: 'File Photocopy Request Form', description: 'Request photocopies of your court file.', submitMethod: 'Email provoff@brampton.ca' },
      { name: 'POA Court Transcript Order Form', description: 'Order transcripts of court proceedings.', url: 'https://www.brampton.ca/EN/residents/Court-Services/Provincial-Offences-Act/Documents/POA%20Court%20Transcript%20OrderForm.pdf' },
    ],
  },
  {
    city: 'Mississauga',
    courtAddress: '950 Burnhamthorpe Road West, Mississauga, ON L5C 3B4',
    phone: '905-615-4500',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    disputeUrl: 'https://www.mississauga.ca/services-and-programs/tickets-fines-and-penalties/dispute-a-provincial-offence-ticket/',
    municipalUrl: 'https://www.mississauga.ca/services-and-programs/tickets-fines-and-penalties/pay-a-provincial-offence-ticket/',
    formsPageUrl: 'https://www.mississauga.ca/publication/provincial-offences-online-forms/',
    cityPageUrl: '/locations/mississauga',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    notes: 'Phone payment: Visa, MasterCard, Amex only (not debit).',
    servesAreas: ['Mississauga'],
    cityForms: [
      { name: 'Notice of Intention to Appear', description: 'Request a trial date for your ticket.', url: 'https://www.mississauga.ca/publication/notice-of-intention-to-appear/' },
      { name: 'Application for Extension of Time to Pay', description: 'Request additional time to pay your fine (POA 0809).', url: 'https://www.mississauga.ca/publication/provincial-offences-forms-extension-of-time-to-pay/' },
      { name: 'Notice of Motion', description: 'File a motion with the court (POA 0007).', url: 'https://www.mississauga.ca/publication/provincial-offences-forms-motions-and-adjournments/' },
      { name: 'General Form Affidavit', description: 'Supporting affidavit for motions (POA 0006).', url: 'https://www.mississauga.ca/wp-content/uploads/2021/07/29125033/POA-0006-General-Form-Affidavit.pdf' },
      { name: 'Certificate of Striking Out Conviction', description: 'Form for reopening a conviction (POA 0827).', url: 'https://www.mississauga.ca/publication/provincial-offences-forms-re-openings/' },
      { name: 'Notice of Appeal Part I & II', description: 'Appeal a Part I or II conviction (POA 0201).', url: 'https://www.mississauga.ca/publication/provincial-offences-forms-appeals/' },
      { name: 'Application to Appeal Without Paying Fine', description: 'Request to file appeal without paying conviction fine (POA 0226).', url: 'https://www.mississauga.ca/publication/provincial-offences-forms-appeals/' },
      { name: 'POA Court Transcript Order Form', description: 'Order transcripts of court proceedings.', url: 'https://www.mississauga.ca/publication/provincial-offences-act-poa-court-transcript-order-form/' },
    ],
  },
  {
    city: 'Barrie',
    courtAddress: '45 Cedar Pointe Drive, Barrie, ON',
    phone: '705-739-4291',
    email: 'POA.Barrie@Barrie.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca (code 3860)',
    municipalUrl: 'https://www.barrie.ca/services-payments/court-services/provincial-offences-court-system',
    formsPageUrl: 'https://www.barrie.ca/services-payments/court-services/provincial-offences-court-system',
    cityPageUrl: '/locations/barrie',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Barrie', 'Orillia', 'Simcoe County', 'Innisfil', 'Bradford'],
    cityForms: [
      { name: 'Motion for Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', url: 'https://www.barrie.ca/Living/Documents/POA-forms/Motion-for-Extension-of-Time-to-Pay-Fine.pdf' },
      { name: 'Application to Appeal Without Paying Fine', description: 'File appeal without paying the conviction fine (POA 0226).', url: 'https://www.barrie.ca/sites/default/files/2022-06/Application-to-Appeal-without-Paying-the-Fine.pdf' },
      { name: 'POA Court Transcript Order Form', description: 'Order transcripts of court proceedings for appeals.', url: 'https://www.barrie.ca/media/38' },
      { name: 'Guide: Filing an Appeal', description: 'Overview of the appeal process for POA convictions.', url: 'https://www.barrie.ca/media/3783' },
      { name: 'Guide: Remote POA Hearings', description: 'Best practices for attending POA hearings remotely.', url: 'https://www.barrie.ca/sites/default/files/2022-06/User-Guide-Best-Practices-Remote-POA-Hearings.pdf' },
    ],
  },
  {
    city: 'Brantford',
    courtAddress: '102 Wellington Square, Brantford, ON',
    phone: '519-759-4222 ext 5046',
    email: 'BrantfordPOA@Brantford.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.brantford.ca/en/your-government/provincial-offences-court.aspx',
    formsPageUrl: 'https://www.brantford.ca/en/your-government/provincial-offences-court.aspx',
    cityPageUrl: '/locations/brantford',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Brantford', 'Brant County', 'Paris', 'Six Nations'],
    cityForms: [
      { name: 'Part I Disclosure Form', description: 'Request officer notes and prosecution evidence for Part I offences.', url: 'https://www.brantford.ca/en/your-government/resources/Documents/PART-I-DISCLOSURE-FORM.pdf' },
      { name: 'Outstanding Fine Payment Form', description: 'Make a payment on outstanding provincial offence fines.', submitMethod: 'Submit online at brantford.ca' },
    ],
  },
  {
    city: 'Niagara Region',
    courtAddress: '445 East Main St, Welland, ON',
    phone: '905-687-6590 ext 1620',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.niagararegion.ca/living/provincial-offences/',
    formsPageUrl: 'https://www.niagararegion.ca/living/provincial-offences/online-forms.aspx',
    cityPageUrl: '/locations/st-catharines',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['St. Catharines', 'Niagara Falls', 'Welland', 'Fort Erie', 'Grimsby', 'Lincoln'],
    cityForms: [
      { name: 'Notice of Intention to Appear (POA 0813)', description: 'Request a trial date for your ticket.', url: 'https://www.niagararegion.ca/living/provincial-offences/pdf/Notice-of-Intention-to-Appear-POA-0813.pdf' },
      { name: 'Certificate of Striking Out Conviction', description: 'Form for reopening a conviction (POA-0827).', url: 'https://www.niagararegion.ca/living/provincial-offences/pdf/POA-0827-certificate-of-striking.pdf' },
      { name: 'Replacement of Missing Offence Notice', description: 'Get a replacement if your ticket was lost or damaged.', url: 'https://www.niagararegion.ca/living/provincial-offences/pdf/missing-offence-notice-replacement.pdf' },
      { name: 'File Appeal Without Paying Fine', description: 'Apply to file your appeal without paying the fine first.', url: 'https://www.niagararegion.ca/living/provincial-offences/pdf/file-appeal-without-paying-fine.pdf' },
      { name: 'Notice of Appeal (Part 1)', description: 'Appeal a Part I provincial offence conviction.', url: 'https://www.niagararegion.ca/living/provincial-offences/pdf/notice-of-appeal-part1.pdf' },
      { name: 'Notice of Appeal (Part 3)', description: 'Appeal a Part III provincial offence conviction.', url: 'https://www.niagararegion.ca/living/provincial-offences/pdf/notice-of-appeal-part3.pdf' },
    ],
  },
  // ─── ADDITIONAL ONTARIO POA COURTS ───
  {
    city: 'Ottawa',
    courtAddress: '100 Constellation Drive, Ottawa, ON K2G 6J8',
    phone: '613-580-2665',
    email: 'poacourt@ottawa.ca',
    paymentUrl: 'https://www.paytickets.ca/ticket/26',
    paymentPortal: 'paytickets.ca',
    disputeUrl: 'https://ottawa.ca/en/parking-roads-and-travel/tickets/provincial-offence-violations-other-tickets/trial-and-other-court-services-other-poa-tickets',
    municipalUrl: 'https://ottawa.ca/en/parking-roads-and-travel/tickets',
    formsPageUrl: 'https://ottawa.ca/en/parking-roads-and-travel/tickets/provincial-offence-violations-other-tickets/trial-and-other-court-services-other-poa-tickets',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    notes: 'Satellite offices at City Hall (110 Laurier Ave W) and Orléans (255 Centrum Blvd). Call 3-1-1 and select option 3 for general inquiries.',
    servesAreas: ['Ottawa', 'Nepean', 'Kanata', 'Orléans', 'Gloucester', 'Barrhaven'],
    cityForms: [
      { name: 'Request for Disclosure', description: 'Request officer notes and prosecution evidence for your trial.', url: 'https://forms.ottawa.ca/en/form/ics/legal/request-for-disclosure-form' },
      { name: 'Motion for Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', url: 'https://forms.ottawa.ca/en/form/ics/service-ottawa/motion-for-extension-of-time-to-pay-fine' },
      { name: 'POA Court Transcript Order Form', description: 'Order transcripts of court proceedings for appeals.', url: 'https://app06.ottawa.ca/online_services/forms/poa/poa_transcript_order_form_en.pdf' },
      { name: 'Reopening Application', description: 'Apply to reopen a conviction entered in your absence.', submitMethod: 'Email poacourt@ottawa.ca' },
    ],
  },
  {
    city: 'Durham Region',
    region: 'Region of Durham',
    courtAddress: '605 Rossland Road East, Lower Level, Whitby, ON L1N 0B3',
    phone: '905-668-3130',
    email: 'POA.Courts@Durham.ca',
    paymentUrl: 'https://www.paytickets.ca/ticket/7',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.durham.ca/en/regional-government/court-and-traffic-tickets-provincial-offences.aspx',
    formsPageUrl: 'https://www.durham.ca/en/regional-government/court-and-traffic-tickets-provincial-offences.aspx',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    notes: 'Toll-free: 1-866-779-8839. Drop box available on south side of building for after-hours payments.',
    servesAreas: ['Oshawa', 'Whitby', 'Ajax', 'Pickering', 'Clarington', 'Scugog', 'Uxbridge', 'Brock'],
    cityForms: [
      { name: 'Request for Disclosure', description: 'Request officer notes and prosecution evidence.', submitMethod: 'Email POA.Courts@Durham.ca' },
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Contact court at 905-668-3130' },
    ],
  },
  {
    city: 'York Region',
    region: 'Regional Municipality of York',
    courtAddress: '17150 Yonge Street, 2nd Floor, Newmarket, ON L3Y 8V3',
    phone: '905-898-0425',
    email: 'NewmarketPOA@York.ca',
    paymentUrl: 'https://www.paytickets.ca/ticket/32',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.york.ca/transportation/provincial-offences-tickets',
    formsPageUrl: 'https://www.york.ca/york-region/provincial-offences-tickets/provincial-offences-forms-and-resources',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    notes: 'Toll-free: 1-877-331-3309. Second location at 50 High Tech Road, Richmond Hill.',
    servesAreas: ['Newmarket', 'Markham', 'Vaughan', 'Richmond Hill', 'Aurora', 'Whitchurch-Stouffville', 'King', 'East Gwillimbury', 'Georgina'],
    cityForms: [
      { name: 'Notice of Intention to Appear', description: 'Request a trial date for your ticket.', submitMethod: 'Available on York Region forms page' },
      { name: 'Request for Disclosure', description: 'Request officer notes and prosecution evidence.', submitMethod: 'Available on York Region forms page' },
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Available on York Region forms page' },
    ],
  },
  {
    city: 'Halton Region',
    region: 'Regional Municipality of Halton',
    courtAddress: '4085 Palladium Way, Burlington, ON L7M 2A6',
    phone: '905-637-1274',
    email: 'BurlingtonCourt@Burlington.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.burlington.ca/en/halton-court-services/halton-court-services.aspx',
    formsPageUrl: 'https://www.burlington.ca/en/halton-court-services/halton-court-services.aspx',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Burlington', 'Oakville', 'Milton', 'Halton Hills', 'Georgetown'],
    cityForms: [
      { name: 'POA Court Transcript Order Form', description: 'Order transcripts of court proceedings for appeals.', submitMethod: 'Email CourtSupport@burlington.ca' },
      { name: 'Digital Court Recording Order Form', description: 'Order digital audio recordings of court proceedings.', submitMethod: 'Email CourtSupport@burlington.ca' },
    ],
  },
  {
    city: 'Kingston',
    courtAddress: '362 Montreal Street, Kingston, ON K7K 3H5',
    phone: '613-547-8557',
    email: 'POACourt@CityOfKingston.ca',
    paymentUrl: 'https://www.cityofkingston.ca/council-and-city-administration/provincial-offences-and-fines/pay-offences-and-fines-online/',
    paymentPortal: 'cityofkingston.ca',
    municipalUrl: 'https://www.cityofkingston.ca/council-and-city-administration/provincial-offences-and-fines/',
    formsPageUrl: 'https://www.cityofkingston.ca/council-and-city-administration/provincial-offences-and-fines/legal-and-court-information/',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Kingston', 'Frontenac County'],
    cityForms: [
      { name: 'Disclosure Request Form', description: 'Request officer notes and prosecution evidence.', submitMethod: 'Contact court at POACourt@CityOfKingston.ca' },
      { name: 'Trial Request Form', description: 'Request a trial date for your ticket.', submitMethod: 'Contact court at POACourt@CityOfKingston.ca' },
    ],
  },
  {
    city: 'Peterborough',
    courtAddress: '500 George Street North, Peterborough, ON K9H 3R9',
    phone: '705-742-7777 ext 2099',
    email: 'poacourt@peterborough.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.peterborough.ca/council-city-hall/tickets-fines-and-provincial-offences-court/',
    formsPageUrl: 'https://www.peterborough.ca/council-city-hall/tickets-fines-and-provincial-offences-court/',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    notes: 'Remote audio/video court hearings available. Located in City Hall north wing.',
    servesAreas: ['Peterborough', 'Peterborough County', 'Cavan Monaghan', 'Selwyn', 'Douro-Dummer', 'Otonabee-South Monaghan'],
    cityForms: [
      { name: 'Reopening Application with Affidavit', description: 'Apply to reopen a conviction entered in your absence.', submitMethod: 'Available on Peterborough POA page' },
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Contact poacourt@peterborough.ca' },
    ],
  },
  {
    city: 'Belleville',
    region: 'Hastings County',
    courtAddress: '235 Pinnacle Street, 3rd Floor, Room 304, Belleville, ON K8N 3A9',
    phone: '613-966-1311 ext 3400',
    email: 'poa@hastingscounty.com',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://hastingscounty.com/services/provincial-offences/',
    formsPageUrl: 'https://hastingscounty.com/services/provincial-offences/forms/',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    notes: 'Toll-free: 1-800-510-3306 ext 3400. E-transfer accepted to e-transferpoa@hastingscounty.com. Satellite location in Bancroft.',
    servesAreas: ['Belleville', 'Quinte West', 'Bancroft', 'Madoc', 'Stirling-Rawdon', 'Tweed', 'Deseronto', 'Tyendinaga', 'Hastings Highlands'],
    cityForms: [
      { name: 'Affidavit for Reopening (POA0801)', description: 'Sworn statement to reopen a conviction entered in your absence.', url: 'https://hastingscounty.com/services/provincial-offences/forms/' },
      { name: 'Notice of Appeal (POA0201)', description: 'Appeal a provincial offence conviction.', url: 'https://hastingscounty.com/services/provincial-offences/forms/' },
      { name: 'Extension of Time to Appeal (POA0206)', description: 'Request extension of time to file an appeal.', url: 'https://hastingscounty.com/services/provincial-offences/forms/' },
    ],
  },
  {
    city: 'Greater Sudbury',
    courtAddress: '199 Larch Street, Suite 102, Sudbury, ON P3E 5P9',
    phone: '705-673-0404',
    email: 'POACourt@GreaterSudbury.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.greatersudbury.ca/city-hall/provincial-offences-office/',
    formsPageUrl: 'https://www.greatersudbury.ca/city-hall/provincial-offences-office/forms-and-applications/',
    hours: 'Mon–Fri, 9:00 AM – 4:00 PM',
    notes: 'Court proceedings held at Lionel E. Lalonde Centre, 239 Montée Principale, Azilda.',
    servesAreas: ['Sudbury', 'Greater Sudbury', 'Capreol', 'Valley East', 'Nickel Centre'],
    cityForms: [
      { name: 'Notice of Appeal', description: 'Appeal a provincial offence conviction.', submitMethod: 'Available on Greater Sudbury forms page' },
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Email POACourt@GreaterSudbury.ca' },
    ],
  },
  {
    city: 'Thunder Bay',
    courtAddress: '1265 Arthur Street East, Suite 105, Thunder Bay, ON P7E 5H7',
    phone: '807-625-2999',
    email: 'CTBCourt@ThunderBay.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.thunderbay.ca/en/city-hall/thunder-bay-court-services.aspx',
    formsPageUrl: 'https://www.thunderbay.ca/en/city-hall/thunder-bay-court-services.aspx',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    notes: 'Document submissions via email: poa@thunderbay.ca (max 10MB, submit 2 days before trial).',
    servesAreas: ['Thunder Bay', 'Thunder Bay District'],
    cityForms: [
      { name: 'Request for Provincial Offences Disclosure', description: 'Request officer notes and prosecution evidence.', url: 'https://www.thunderbay.ca/en/city-hall/resources/Documents/RequestforProvincialOffencesDisclosure.pdf' },
      { name: 'Notice of Appeal (POA 0201)', description: 'Appeal a Part I provincial offence conviction.', url: 'https://www.thunderbay.ca/en/city-hall/resources/Documents/Thunder-Bay-Court-Services/POA_0201---Part-1-appeal-application-acc.pdf' },
    ],
  },
  {
    city: 'Sault Ste. Marie',
    courtAddress: '99 Foster Drive, 1st Floor, Sault Ste. Marie, ON P6A 5X6',
    phone: '705-541-7334',
    email: 'POAOffice@CitySSM.on.ca',
    paymentUrl: 'https://apps.saultstemarie.ca/eServices/ticket-home.asp',
    paymentPortal: 'saultstemarie.ca/eServices',
    municipalUrl: 'https://saultstemarie.ca/government/provincial-offences/',
    formsPageUrl: 'https://saultstemarie.ca/government/provincial-offences/poa-forms/',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    notes: 'Online payment limited to ICON Code 0160 tickets (Visa/MasterCard only). Phone payments not accepted.',
    servesAreas: ['Sault Ste. Marie', 'Wawa', 'Thessalon', 'Algoma District'],
    cityForms: [
      { name: 'Reopening Application', description: 'Apply to reopen a conviction entered in your absence.', submitMethod: 'Available on Sault Ste. Marie POA forms page' },
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Contact court at 705-541-7334' },
    ],
  },
  {
    city: 'North Bay',
    courtAddress: '200 McIntyre Street East, 2nd Floor, North Bay, ON P1B 8V6',
    phone: '705-474-0400 ext 2146',
    email: 'POAGroup@NorthBay.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://northbay.ca/services-payments/court-services/provincial-offences-infractions-provinciales/',
    formsPageUrl: 'https://northbay.ca/services-payments/court-services/provincial-offences-infractions-provinciales/forms/',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    notes: 'Satellite court in Sturgeon Falls.',
    servesAreas: ['North Bay', 'Nipissing District', 'Sturgeon Falls', 'Callander'],
    cityForms: [
      { name: 'Plea and Trial Options Guide', description: 'Information guide on plea options and trial process.', submitMethod: 'Available on North Bay forms page' },
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Contact court at 705-474-0400 ext 2146' },
    ],
  },
  {
    city: 'Timmins',
    courtAddress: '220 Algonquin Boulevard East, Timmins, ON P4N 1B3',
    phone: '705-360-2620',
    email: 'POA@Timmins.ca',
    paymentUrl: 'https://www.payfines.ca/poa/0573',
    paymentPortal: 'payfines.ca',
    municipalUrl: 'https://www.timmins.ca/our_services/provincial_offences_centre',
    formsPageUrl: 'https://www.timmins.ca/our_services/provincial_offences_centre',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    notes: 'Remote court via Zoom available. Zoom Meeting ID: 5661063103.',
    servesAreas: ['Timmins', 'Cochrane District'],
    cityForms: [
      { name: 'Adjournment Application', description: 'Request to postpone your court date.', submitMethod: 'Email POA@Timmins.ca' },
      { name: 'Reopening Application with Affidavit', description: 'Apply to reopen a conviction entered in your absence.', submitMethod: 'Email POA@Timmins.ca' },
    ],
  },
  {
    city: 'Cornwall',
    region: 'Stormont, Dundas & Glengarry',
    courtAddress: '26 Pitt Street, Suite 308, Cornwall, ON K6J 3P2',
    phone: '613-933-4301',
    email: 'courtservices@sdgcounties.ca',
    paymentUrl: 'https://ipn.paymentus.com/rotp/sdgc',
    paymentPortal: 'PaymentUS (SDG)',
    municipalUrl: 'https://www.sdgcounties.ca/services/court-services',
    formsPageUrl: 'https://www.sdgcounties.ca/services/court-services/court-forms',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    notes: 'Remote participation via Zoom available alongside limited in-person availability.',
    servesAreas: ['Cornwall', 'Stormont County', 'Dundas County', 'Glengarry County'],
    cityForms: [
      { name: 'Request for Disclosure', description: 'Request officer notes and prosecution evidence.', submitMethod: 'Email courtservices@sdgcounties.ca' },
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Available on SDG court forms page' },
    ],
  },
  {
    city: 'Cobourg',
    region: 'Northumberland County',
    courtAddress: '860 William Street, Lower Level, Cobourg, ON K9A 3A9',
    phone: '905-372-3329 ext 5300',
    email: 'poainfo@northumberland.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.northumberland.ca/en/living-here/tickets-fines-and-collections.aspx',
    formsPageUrl: 'https://www.northumberland.ca/en/living-here/tickets-fines-and-collections.aspx',
    hours: 'Mon–Fri, 8:30 AM – 5:00 PM',
    notes: 'Toll-free: 1-800-354-7050 ext 5300. Remote court proceedings available Wednesdays and Fridays.',
    servesAreas: ['Cobourg', 'Port Hope', 'Northumberland County', 'Cramahe', 'Brighton', 'Trent Hills'],
    cityForms: [
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Contact court at 905-372-3329 ext 5300' },
      { name: 'Reopening Application', description: 'Apply to reopen a conviction entered in your absence.', submitMethod: 'Email poainfo@northumberland.ca' },
    ],
  },
  {
    city: 'Bracebridge',
    region: 'District Municipality of Muskoka',
    courtAddress: '76 Pine Street, Bracebridge, ON P1L 0C4',
    phone: '705-645-2100',
    email: 'POA@Muskoka.on.ca',
    paymentUrl: 'https://www.ontario.ca/page/check-status-traffic-tickets-and-fines-online-or-request-meeting-resolve-your-case',
    paymentPortal: 'ontario.ca/ticketsandfines',
    municipalUrl: 'https://www.muskoka.on.ca/en/provincial-offences/about-poa-court-services.aspx',
    formsPageUrl: 'https://www.muskoka.on.ca/en/provincial-offences/court-forms.aspx',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Bracebridge', 'Gravenhurst', 'Huntsville', 'Lake of Bays', 'Muskoka Lakes', 'Georgian Bay'],
    cityForms: [
      { name: 'Disclosure Request', description: 'Request officer notes and prosecution evidence.', submitMethod: 'Email POA@Muskoka.on.ca' },
      { name: 'Appeal Application', description: 'Appeal a provincial offence conviction.', submitMethod: 'Available on Muskoka court forms page' },
      { name: 'Fine Payment Extension Motion', description: 'Request additional time to pay your fine.', submitMethod: 'Available on Muskoka court forms page' },
      { name: 'Transcript Order Form', description: 'Order transcripts of court proceedings for appeals.', submitMethod: 'Available on Muskoka court forms page' },
    ],
  },
  {
    city: 'Owen Sound',
    region: 'Grey County',
    courtAddress: '595 9th Avenue East, Owen Sound, ON N4K 3E3',
    phone: '519-376-3470',
    email: 'POA@Grey.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.grey.ca/government/provincial-offences-tickets/',
    formsPageUrl: 'https://www.grey.ca/government/provincial-offences-tickets/',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Owen Sound', 'Grey County', 'Meaford', 'Blue Mountains', 'Hanover', 'Grey Highlands'],
    cityForms: [
      { name: 'Disclosure Request Form', description: 'Request officer notes and prosecution evidence.', submitMethod: 'Available on Grey County POA page' },
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Contact court at 519-376-3470' },
    ],
  },
  {
    city: 'Lindsay',
    region: 'City of Kawartha Lakes',
    courtAddress: '440 Kent Street West, Lower Level, Lindsay, ON K9V 5P2',
    phone: '705-324-3962',
    email: 'POAAdmin@KawarthaLakes.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.kawarthalakes.ca/government-administration/provincial-offences-and-tickets/',
    formsPageUrl: 'https://www.kawarthalakes.ca/government-administration/provincial-offences-and-tickets/',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    notes: 'Also serves County of Haliburton. Virtual court via Zoom available.',
    servesAreas: ['Lindsay', 'Kawartha Lakes', 'Haliburton County', 'Fenelon Falls', 'Bobcaygeon', 'Minden'],
    cityForms: [
      { name: 'Motion for Extension of Time to Pay', description: 'Request additional time to pay your fine.', submitMethod: 'Available on Kawartha Lakes POA page' },
      { name: 'Disclosure Request', description: 'Request officer notes and prosecution evidence.', submitMethod: 'Contact POAAdmin@KawarthaLakes.ca' },
    ],
  },
  {
    city: 'Cayuga',
    region: 'Haldimand County',
    courtAddress: '53 Thorburn Street South, Cayuga, ON N0A 1E0',
    phone: '905-772-3327',
    email: 'POA@HaldimandCounty.on.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.haldimandcounty.ca/government-administration/provincial-offences/',
    formsPageUrl: 'https://www.haldimandcounty.ca/government-administration/provincial-offences/',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    notes: 'Virtual court available via Zoom (Meeting ID: 989 4050 1139).',
    servesAreas: ['Cayuga', 'Haldimand County', 'Caledonia', 'Dunnville', 'Hagersville'],
    cityForms: [
      { name: 'Notice of Intention to Appear', description: 'Request a trial date for your ticket.', submitMethod: 'Contact POA@HaldimandCounty.on.ca' },
      { name: 'Reopening Application Affidavit', description: 'Apply to reopen a conviction entered in your absence.', submitMethod: 'Contact POA@HaldimandCounty.on.ca' },
    ],
  },
  {
    city: 'Simcoe',
    region: 'Norfolk County',
    courtAddress: '185 Robinson Street, Suite 100, Simcoe, ON N3Y 5L6',
    phone: '519-426-5870',
    email: 'POA@NorfolkCounty.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.norfolkcounty.ca/council-administration-and-government/provincial-offences/',
    formsPageUrl: 'https://www.norfolkcounty.ca/council-administration-and-government/provincial-offences/forms-and-resources/',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Simcoe', 'Norfolk County', 'Port Dover', 'Delhi', 'Waterford'],
    cityForms: [
      { name: 'Court Transcript Order Form', description: 'Order transcripts of court proceedings for appeals.', submitMethod: 'Available on Norfolk County forms page' },
      { name: 'Disclosure Request', description: 'Request officer notes and prosecution evidence.', submitMethod: 'Available on Norfolk County forms page' },
    ],
  },
  {
    city: 'Orangeville',
    region: 'Dufferin County',
    courtAddress: '55 Zina Street, Orangeville, ON L9W 1E5',
    phone: '519-941-5808',
    email: 'Dufferin.POA@Caledon.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.caledon.ca/en/government/poa.aspx',
    formsPageUrl: 'https://www.caledon.ca/en/government/poa.aspx',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    notes: 'Free on-site parking available.',
    servesAreas: ['Orangeville', 'Dufferin County', 'Shelburne', 'Grand Valley', 'Mono', 'Mulmur'],
    cityForms: [
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Contact Dufferin.POA@Caledon.ca' },
      { name: 'Reopening Application', description: 'Apply to reopen a conviction entered in your absence.', submitMethod: 'Contact Dufferin.POA@Caledon.ca' },
    ],
  },
  {
    city: 'Goderich',
    region: 'Huron County',
    courtAddress: '1 Courthouse Square, Lower Level, Goderich, ON N7A 1M2',
    phone: '519-524-8394 ext 2',
    email: 'POA@HuronCounty.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.huroncounty.ca/provincial-offences/',
    formsPageUrl: 'https://www.huroncounty.ca/provincial-offences/',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Goderich', 'Huron County', 'Clinton', 'Seaforth', 'Exeter', 'Wingham'],
    cityForms: [
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Contact POA@HuronCounty.ca' },
      { name: 'Disclosure Request', description: 'Request officer notes and prosecution evidence.', submitMethod: 'Contact POA@HuronCounty.ca' },
    ],
  },
  {
    city: 'Pembroke',
    region: 'Renfrew County',
    courtAddress: '7 International Drive, Pembroke, ON K8A 6W5',
    phone: '613-735-3482',
    email: 'POAOffice@CountyOfRenfrew.on.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.countyofrenfrew.on.ca/en/county-government/provincial-offences-court.aspx',
    formsPageUrl: 'https://www.countyofrenfrew.on.ca/en/county-government/provincial-offences-court.aspx',
    hours: 'Mon–Fri, 8:00 AM – 4:00 PM',
    servesAreas: ['Pembroke', 'Renfrew County', 'Arnprior', 'Renfrew', 'Petawawa', 'Deep River'],
    cityForms: [
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Contact POAOffice@CountyOfRenfrew.on.ca' },
      { name: 'Reopening Application', description: 'Apply to reopen a conviction entered in your absence.', submitMethod: 'Contact POAOffice@CountyOfRenfrew.on.ca' },
    ],
  },
  {
    city: 'Perth',
    region: 'Lanark County',
    courtAddress: '80 Gore Street East, Perth, ON K7H 1H9',
    phone: '613-267-3311',
    email: 'POA@Perth.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.perth.ca/our-government/provincial-offences/',
    formsPageUrl: 'https://www.perth.ca/our-government/provincial-offences/',
    hours: 'Mon–Fri, 8:30 AM – 4:00 PM',
    notes: 'Virtual court appearances available on hearing date/time.',
    servesAreas: ['Perth', 'Lanark County', 'Smiths Falls', 'Carleton Place', 'Mississippi Mills'],
    cityForms: [
      { name: 'Disclosure Request', description: 'Request officer notes and prosecution evidence.', submitMethod: 'Contact POA@Perth.ca' },
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Contact POA@Perth.ca' },
    ],
  },
  {
    city: 'Brockville',
    region: 'Leeds & Grenville',
    courtAddress: '32 Wall Street, Suite 100, Brockville, ON K6V 4R9',
    phone: '613-342-3840',
    email: 'POACourt@uclg.on.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.leedsgrenville.com/en/services/provincial-offences.aspx',
    formsPageUrl: 'https://www.leedsgrenville.com/en/services/provincial-offences.aspx',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Brockville', 'Leeds & Grenville County', 'Gananoque', 'Prescott', 'Kemptville'],
    cityForms: [
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Contact POACourt@uclg.on.ca' },
      { name: 'Reopening Application', description: 'Apply to reopen a conviction entered in your absence.', submitMethod: 'Contact POACourt@uclg.on.ca' },
    ],
  },
  {
    city: 'Napanee',
    region: 'Lennox & Addington County',
    courtAddress: '97 Thomas Street East, Napanee, ON K7R 4B9',
    phone: '613-354-4883',
    email: 'Court@Lennox-Addington.on.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.lennox-addington.on.ca/offences',
    formsPageUrl: 'https://www.lennox-addington.on.ca/offences',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Napanee', 'Lennox & Addington County', 'Greater Napanee', 'Loyalist Township'],
    cityForms: [
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Contact Court@Lennox-Addington.on.ca' },
    ],
  },
  {
    city: "L'Orignal",
    region: 'Prescott & Russell',
    courtAddress: "28 Court Street, P.O. Box 347, L'Orignal, ON K0B 1K0",
    phone: '613-675-4661',
    email: 'Lip-POA@Prescott-Russell.on.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.prescott-russell.on.ca/stay/provincial_offences',
    formsPageUrl: 'https://www.prescott-russell.on.ca/stay/provincial_offences',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ["L'Orignal", 'Prescott & Russell', 'Hawkesbury', 'Casselman', 'Rockland', 'Embrun'],
    cityForms: [
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Contact Lip-POA@Prescott-Russell.on.ca' },
    ],
  },
  {
    city: 'Picton',
    region: 'Prince Edward County',
    courtAddress: '332 Main Street, Picton, ON K0K 2T0',
    phone: '613-476-2148',
    email: 'ALumley@PECounty.on.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.thecounty.ca/residents/make-a-payment/provincial-offenses',
    formsPageUrl: 'https://www.thecounty.ca/residents/make-a-payment/provincial-offenses',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Picton', 'Prince Edward County', 'Wellington', 'Bloomfield'],
    cityForms: [
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Contact ALumley@PECounty.on.ca' },
    ],
  },
  {
    city: 'Parry Sound',
    courtAddress: '52 Seguin Street, Parry Sound, ON P2A 1B4',
    phone: '705-746-2101',
    email: 'POACourt@ParrySound.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.parrysound.ca/en/inside-town-hall/provincial-offences',
    formsPageUrl: 'https://www.parrysound.ca/en/inside-town-hall/provincial-offences',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Parry Sound', 'Parry Sound District'],
    cityForms: [
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Contact POACourt@ParrySound.ca' },
    ],
  },
  {
    city: 'Haileybury',
    region: 'Temiskaming Shores',
    courtAddress: '325 Farr Drive, P.O. Box 2050, Haileybury, ON P0J 1K0',
    phone: '705-672-3363',
    email: 'POA@TemiskamingShores.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.temiskamingshores.ca/poa',
    formsPageUrl: 'https://www.temiskamingshores.ca/poa',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Haileybury', 'Temiskaming Shores', 'New Liskeard', 'Cobalt', 'Temiskaming District'],
    cityForms: [
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Contact POA@TemiskamingShores.ca' },
    ],
  },
  {
    city: 'Gore Bay',
    region: 'Manitoulin District',
    courtAddress: '15 Water Street, P.O. Box 500, Gore Bay, ON P0P 1H0',
    phone: '705-282-2837',
    email: 'GoreBayPOA@GoreBay.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.gorebay.ca/provincial-offences',
    formsPageUrl: 'https://www.gorebay.ca/provincial-offences',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Gore Bay', 'Manitoulin Island', 'Manitoulin District'],
    cityForms: [
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Contact GoreBayPOA@GoreBay.ca' },
    ],
  },
  {
    city: 'Espanola',
    courtAddress: '100 Tudhope Street, Suite 4, Espanola, ON P5E 1S6',
    phone: '705-869-4490',
    email: 'POA@Espanola.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.espanola.ca/services/provincial-offences',
    formsPageUrl: 'https://www.espanola.ca/services/provincial-offences',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    notes: 'Also serves Elliot Lake area POA matters.',
    servesAreas: ['Espanola', 'Elliot Lake', 'Blind River', 'Massey'],
    cityForms: [
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Contact POA@Espanola.ca' },
    ],
  },
  {
    city: 'Cochrane',
    courtAddress: '171 Fourth Avenue, Cochrane, ON P0L 1C0',
    phone: '705-272-4361',
    email: 'linda.joanis@cochraneontario.com',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.cochraneontario.com/services/provincial-offenses',
    formsPageUrl: 'https://www.cochraneontario.com/services/provincial-offenses',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Cochrane', 'Cochrane District'],
    cityForms: [
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Contact office at 705-272-4361' },
    ],
  },
  {
    city: 'Fort Frances',
    courtAddress: '320 Portage Avenue, Fort Frances, ON P9A 3P9',
    phone: '807-274-5323',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.fortfrances.ca/town/administration-finance/provincial-offences-administration',
    formsPageUrl: 'https://www.fortfrances.ca/town/administration-finance/provincial-offences-administration',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Fort Frances', 'Rainy River District'],
    cityForms: [
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Contact court at 807-274-5323' },
    ],
  },
  {
    city: 'Kenora',
    courtAddress: '1 Main Street South, Kenora, ON P9N 3X2',
    phone: '807-467-2175',
    email: 'POA@Kenora.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.kenora.ca/en/your-government/provincial-offences',
    formsPageUrl: 'https://www.kenora.ca/en/your-government/provincial-offences',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Kenora', 'Kenora District'],
    cityForms: [
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Contact POA@Kenora.ca' },
    ],
  },
  {
    city: 'Dryden',
    courtAddress: '30 Van Horne Avenue, Box 105, Dryden, ON P8N 2A7',
    phone: '807-223-2225',
    email: 'POA@Dryden.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.dryden.ca/poa',
    formsPageUrl: 'https://www.dryden.ca/poa',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Dryden', 'Dryden District'],
    cityForms: [
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Contact POA@Dryden.ca' },
    ],
  },
  {
    city: 'Orillia',
    courtAddress: '575 West Street South, Unit 10, Orillia, ON L3V 7N6',
    phone: '705-325-1311',
    email: 'POA.Orillia@Barrie.ca',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.barrie.ca/services-payments/court-services/provincial-offences-court-system',
    formsPageUrl: 'https://www.barrie.ca/services-payments/court-services/provincial-offences-court-system',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    notes: 'Administered by City of Barrie Court Services.',
    servesAreas: ['Orillia', 'Oro-Medonte', 'Ramara', 'Severn'],
    cityForms: [
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Contact POA.Orillia@Barrie.ca' },
    ],
  },
];

const FORM_CATEGORIES = [
  { key: 'all', label: 'All Forms', icon: FileText },
  { key: 'defendant', label: 'Defendant Forms', icon: Scale },
  { key: 'offence-notice', label: 'Offence Notices', icon: AlertTriangle },
  { key: 'court', label: 'Court Process', icon: Gavel },
  { key: 'appeal', label: 'Appeals & Reopening', icon: BookOpen },
  { key: 'parking', label: 'Parking', icon: Car },
  { key: 'enforcement', label: 'Fines & Payment', icon: DollarSign },
];

// ============================================================
// COLLAPSIBLE CITY CARD COMPONENT
// ============================================================

function CityCourtCard({ court }: { court: CityCourtInfo }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground">{court.city}</h3>
            {court.region && (
              <p className="font-paragraph text-xs text-foreground/50">{court.region}</p>
            )}
            <p className="font-paragraph text-sm text-foreground/60">{court.courtAddress}</p>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
        )}
      </button>

      {expanded && (
        <div className="px-5 pb-5 pt-0 border-t border-gray-100">
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href={`tel:${court.phone.replace(/\s/g, '')}`} className="text-primary font-medium hover:underline">
                  {court.phone}
                </a>
              </div>
              {court.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href={`mailto:${court.email}`} className="text-primary hover:underline">
                    {court.email}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-foreground/70">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>{court.hours}</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-foreground/70">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{court.courtAddress}</span>
              </div>
            </div>

            {/* Links */}
            <div className="space-y-2">
              {court.paymentUrl && (
                <a
                  href={court.paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm bg-green-50 text-green-800 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <DollarSign className="w-4 h-4" />
                  Pay Online: {court.paymentPortal}
                  <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                </a>
              )}
              {court.disputeUrl && (
                <a
                  href={court.disputeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm bg-blue-50 text-blue-800 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Scale className="w-4 h-4" />
                  Dispute a Ticket
                  <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                </a>
              )}
              <a
                href={court.municipalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm bg-gray-50 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Globe className="w-4 h-4" />
                Municipal Court Info
                <ExternalLink className="w-3.5 h-3.5 ml-auto" />
              </a>
              {court.cityPageUrl && (
                <Link
                  to={court.cityPageUrl}
                  className="flex items-center gap-2 text-sm bg-primary/5 text-primary px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <Gavel className="w-4 h-4" />
                  Our {court.city} Services
                  <ChevronRight className="w-3.5 h-3.5 ml-auto" />
                </Link>
              )}
            </div>
          </div>

          {/* Serves Areas */}
          {court.servesAreas && court.servesAreas.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-foreground/50">
                <strong>Serves:</strong> {court.servesAreas.join(', ')}
              </p>
            </div>
          )}

          {/* Special Notes */}
          {court.notes && (
            <div className="mt-2 flex items-start gap-2 text-xs text-amber-700 bg-amber-50 p-2 rounded-lg">
              <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <span>{court.notes}</span>
            </div>
          )}

          {/* City-Specific Forms */}
          {court.cityForms && court.cityForms.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-heading text-sm font-bold text-foreground flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  {court.city} Court Forms ({court.cityForms.length})
                </h4>
                {court.formsPageUrl && (
                  <a
                    href={court.formsPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    All Forms <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <div className="space-y-2">
                {court.cityForms.map((form, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                    <Download className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-paragraph text-sm font-medium text-foreground">{form.name}</p>
                        {form.url ? (
                          <a
                            href={form.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 text-xs bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20 transition-colors flex items-center gap-1"
                          >
                            Download <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : form.submitMethod ? (
                          <span className="flex-shrink-0 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            {form.submitMethod}
                          </span>
                        ) : null}
                      </div>
                      <p className="font-paragraph text-xs text-foreground/60 mt-0.5">{form.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function TrafficTicketFormsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [citySearch, setCitySearch] = useState('');

  const filteredForms = POA_FORMS.filter(form => {
    const matchesSearch = searchQuery === '' ||
      form.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.formId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || form.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredCities = CITY_COURTS.filter(court => {
    if (citySearch === '') return true;
    const q = citySearch.toLowerCase();
    return (
      court.city.toLowerCase().includes(q) ||
      (court.region && court.region.toLowerCase().includes(q)) ||
      (court.servesAreas && court.servesAreas.some(a => a.toLowerCase().includes(q)))
    );
  });

  const getFormCategoryColor = (category: string) => {
    switch (category) {
      case 'defendant': return 'border-l-blue-500';
      case 'offence-notice': return 'border-l-amber-500';
      case 'court': return 'border-l-purple-500';
      case 'appeal': return 'border-l-red-500';
      case 'parking': return 'border-l-green-500';
      case 'enforcement': return 'border-l-orange-500';
      default: return 'border-l-gray-300';
    }
  };

  const getFormBadgeColor = (category: string) => {
    switch (category) {
      case 'defendant': return 'bg-blue-100 text-blue-800';
      case 'offence-notice': return 'bg-amber-100 text-amber-800';
      case 'court': return 'bg-purple-100 text-purple-800';
      case 'appeal': return 'bg-red-100 text-red-800';
      case 'parking': return 'bg-green-100 text-green-800';
      case 'enforcement': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Car className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Ontario Traffic Tickets</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ontario Traffic Ticket Forms &amp; Court Directory
            </h1>
            <p className="font-paragraph text-lg text-foreground/70 mb-6 max-w-3xl">
              Complete directory of Provincial Offences Act (POA) forms and city-by-city court information.
              Find the right form, locate your court, pay or dispute your ticket, and understand your options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors">
                Fight Your Ticket <ArrowRight className="w-5 h-5" />
              </Link>
              <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/5 transition-colors">
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Banner */}
      <section className="bg-blue-50 border-y border-blue-100 py-4">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-blue-800">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>You have <strong>15 days</strong> to respond to a ticket</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Options: <strong>Pay</strong>, <strong>Early Resolution</strong>, or <strong>Trial</strong></span>
            </div>
            <a
              href="https://ontariocourtforms.on.ca/en/provincial-offences-act-forms/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 underline hover:no-underline font-medium"
            >
              Official Ontario POA Forms <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 1: CITY-BY-CITY COURT DIRECTORY        */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="py-12">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
                Find Your Court &amp; Pay Online
              </h2>
              <p className="font-paragraph text-foreground/60">
                Select your city to find court contact info, payment portals, and dispute links.
              </p>
            </div>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                placeholder="Search by city or region..."
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm font-paragraph focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {filteredCities.map((court) => (
              <CityCourtCard key={court.city} court={court} />
            ))}
          </div>

          {filteredCities.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-paragraph">No courts match your search. Try a different city name.</p>
            </div>
          )}

          <p className="text-xs text-gray-400 mt-4 text-center">
            Showing {filteredCities.length} of {CITY_COURTS.length} court locations across Ontario
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 2: POA FORMS DIRECTORY                 */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
            Provincial Offences Act (POA) Forms
          </h2>
          <p className="font-paragraph text-foreground/60 mb-8">
            Official forms under the Provincial Offences Act. Forms are for reference — bring official copies issued by the court.
          </p>

          {/* Search & Filter */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center mb-6">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search forms by number, name, or description..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm font-paragraph focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {FORM_CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    activeCategory === cat.key
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <cat.icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-400 mb-4">
            Showing {filteredForms.length} of {POA_FORMS.length} forms
          </p>

          {/* Forms List */}
          <div className="space-y-3">
            {filteredForms.map((form) => (
              <div
                key={form.formId}
                className={`bg-white rounded-lg border border-gray-200 border-l-4 ${getFormCategoryColor(form.category)} hover:shadow-md transition-shadow`}
              >
                <div className="p-5">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 rounded-lg flex items-center justify-center font-heading font-bold text-xs ${getFormBadgeColor(form.category)}`}>
                        {form.number.replace('Form ', '')}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-heading text-base font-bold text-foreground">
                          {form.number}: {form.title}
                        </h3>
                        {form.popular && (
                          <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-semibold rounded-full uppercase tracking-wider">
                            Common
                          </span>
                        )}
                      </div>
                      <p className="font-paragraph text-sm text-foreground/70 mb-2">
                        {form.description}
                      </p>
                      <span className="text-xs text-gray-400">{form.formId}</span>
                    </div>
                    <div className="flex-shrink-0">
                      <a
                        href={form.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        View Form
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredForms.length === 0 && (
              <div className="text-center py-16">
                <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-paragraph">No forms match your search. Try a different keyword or clear your filters.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Your 3 Options Section */}
      <section className="py-12 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Got a Ticket? Your 3 Options
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: DollarSign,
                title: 'Option 1: Pay the Fine',
                description: 'Paying is a guilty plea. You get a conviction on your record, demerit points, and potential insurance increases. Use paytickets.ca or your city portal.',
                color: 'text-red-600 bg-red-50',
              },
              {
                icon: Scale,
                title: 'Option 2: Early Resolution',
                description: 'Meet with a prosecutor to negotiate. You may get a reduced fine or fewer demerit points. Still results in a conviction unless the charge is withdrawn.',
                color: 'text-amber-600 bg-amber-50',
              },
              {
                icon: Gavel,
                title: 'Option 3: Fight It at Trial',
                description: 'File a Notice of Intention to Appear (Form 8). The prosecutor must prove the charge. A paralegal can represent you and may get the charge dismissed entirely.',
                color: 'text-green-600 bg-green-50',
              },
            ].map((option, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${option.color}`}>
                  <option.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{option.title}</h3>
                <p className="font-paragraph text-sm text-foreground/70">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-pastelbeige/20 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <Car className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            Fight Your Traffic Ticket with a Licensed Paralegal
          </h2>
          <p className="font-paragraph text-foreground/70 mb-6 max-w-2xl mx-auto">
            Paying a ticket can cost you thousands in insurance increases. Our paralegals fight traffic tickets
            across Ontario every day — from speeding to careless driving. Free consultation to review your ticket.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors">
              Book Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/5 transition-colors">
              <Phone className="w-4 h-4" /> Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-12">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Related Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Traffic Ticket Services', desc: 'Learn how our paralegals fight traffic tickets across Ontario — speeding, careless driving, stunt driving, and more.', href: '/services/traffic-tickets', icon: Car },
              { title: 'Small Claims Court Forms', desc: 'Complete directory of Ontario Small Claims Court forms with filing fees and instructions.', href: '/resources/forms/small-claims', icon: FileText },
              { title: 'LTB Forms Directory', desc: 'Complete directory of Landlord and Tenant Board forms, notices, and applications.', href: '/resources/forms/ltb', icon: FileText },
            ].map((resource, i) => (
              <Link key={i} to={resource.href} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow group">
                <resource.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{resource.title}</h3>
                <p className="font-paragraph text-sm text-foreground/70 mb-3">{resource.desc}</p>
                <span className="text-primary font-medium text-sm inline-flex items-center gap-1">
                  Learn more <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* LSO Badge */}
      <section className="py-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <p className="font-paragraph text-sm text-foreground/60">
            <Shield className="w-4 h-4 inline mr-1" />
            Licensed by the Law Society of Ontario | Forms sourced from Ontario Court Services (ontariocourtforms.on.ca)
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
