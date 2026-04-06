/**
 * Shared city court data for Ontario POA courts.
 * Used by both the public TrafficTicketFormsPage and the admin
 * Traffic Ticket Onboarding workflow.
 */

// ============================================================
// INTERFACES
// ============================================================

export interface CityForm {
  name: string;
  description: string;
  url?: string;
  submitMethod?: string;
}

export interface CityCourtInfo {
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

// ============================================================
// CITY COURT DATA
// ============================================================

export const CITY_COURTS: CityCourtInfo[] = [
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
    city: 'Kitchener',
    region: 'Region of Waterloo',
    courtAddress: '77 Queen St. N, Kitchener, ON',
    phone: '519-745-9446',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.regionofwaterloo.ca/en/regional-government/provincial-offences-court-and-traffic-tickets.aspx',
    formsPageUrl: 'https://www.regionofwaterloo.ca/en/regional-government/provincial-offences-court-and-traffic-tickets.aspx',
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
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Windsor', 'Essex County', 'Leamington', 'Amherstburg', 'LaSalle', 'Tecumseh'],
    cityForms: [
      { name: 'Request to Reschedule Early Resolution Meeting', description: 'Reschedule or postpone an early resolution meeting (POA0859).', url: 'https://www.citywindsor.ca/Documents/city-hall/legal-services/provincial-offences/FORM%20-%20REQUEST%20TO%20RESCHEDULE%20POSTPONE%20AN%20EARLY%20RESOLUTION%20MEETING%20-%20POA0859.pdf' },
      { name: 'Application for Extension of Time to Pay', description: 'Request more time to pay your fine (Form 125).', submitMethod: 'Available on Windsor POA Forms page' },
      { name: 'Guide to Appeals', description: 'Information on how to appeal a provincial offences conviction.', url: 'https://www.citywindsor.ca/Documents/city-hall/legal-services/provincial-offences/Guide%20to%20Appeals.pdf' },
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
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Hamilton', 'Stoney Creek', 'Dundas', 'Ancaster', 'Flamborough'],
    cityForms: [
      { name: 'Application for Extension of Time to Pay', description: 'Request additional time to pay your fine (POA 0809).', url: 'https://www.hamilton.ca/sites/default/files/2024-01/ticketsfinespenalties-poa-application-for-extention-to-pay-fine.pdf' },
      { name: 'Request for Disclosure', description: 'Obtain officer\'s notes and prosecution evidence.', url: 'https://www.hamilton.ca/sites/default/files/2023-07/ticketsfinespenalties-poa-disclosure-request-2023.pdf' },
      { name: 'Notice of Motion', description: 'File a motion with the provincial offences court.', url: 'https://www.hamilton.ca/sites/default/files/2022-11/ticketsfinespenalties-poa-notice-of-motion-2022.pdf' },
      { name: 'Notice of Application for Adjournment', description: 'Request to postpone your court date.', url: 'https://www.hamilton.ca/sites/default/files/2022-11/ticketsfinespenalties-poa-notice-application-adjournment.pdf' },
      { name: 'Affidavit in Support of Reopening', description: 'Sworn statement to reopen a conviction entered in your absence (POA 0876).', url: 'https://www.hamilton.ca/sites/default/files/2023-09/ticketsfinespenalties-poa-affidavit-support-request-reopening-sep2023-english.pdf' },
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
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Guelph', 'Wellington County', 'Puslinch', 'Guelph/Eramosa'],
    cityForms: [
      { name: 'Notice of Intention to Appear', description: 'Request a trial date for your ticket (POA 0813).', url: 'https://guelph.ca/wp-content/uploads/POA-NoticeOfIntentionToAppear.pdf' },
      { name: 'Application for Disclosure', description: 'Request the prosecution\'s evidence and officer notes.', url: 'https://guelph.ca/wp-content/uploads/POA_ApplicationForDisclosure.pdf' },
      { name: 'Reopening Application Package', description: 'Reopen a conviction entered in your absence with affidavit.', url: 'https://guelph.ca/wp-content/uploads/ReopeningApplicationpackage.pdf' },
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
    hours: 'Mon–Fri, 8:30 AM – 5:00 PM',
    servesAreas: ['Toronto', 'Scarborough', 'North York', 'Etobicoke', 'East York'],
    cityForms: [
      { name: 'Notice of Intention to Appear (NIA)', description: 'Request a trial without attending court in person.', url: 'https://www.toronto.ca/wp-content/uploads/2017/10/98d7-CS-NoticeOfIntetionToAppear-NIA.pdf' },
      { name: 'Application for Extension of Time to Pay Fine', description: 'Request more time to pay your fine (Form 125). Fillable PDF.', url: 'https://www.toronto.ca/wp-content/uploads/2021/12/9374-Fillable-poa-0809-rev0521-en-web-1-FINAL.pdf' },
      { name: 'Application for Reopening (Offence Notice)', description: 'Reopen a conviction under Section 11 of the POA.', submitMethod: 'Email poacourt@toronto.ca' },
      { name: 'Application for Reopening (Parking)', description: 'Reopen a parking conviction under Section 19(2) of the POA.', submitMethod: 'Email poacourt@toronto.ca' },
      { name: 'Change of Address Form', description: 'Notify the court of a change of address for your ticket.', submitMethod: 'Email poacourt@toronto.ca' },
      { name: 'Interpreter Request Form', description: 'Request court interpreter services for your hearing.', url: 'https://www.toronto.ca/wp-content/uploads/2017/10/90f1-CS-InterpreterRequestForm.pdf' },
      { name: 'Disclosure Request Form', description: 'Request officer notes and prosecution evidence for Part I offences.', url: 'https://www.toronto.ca/wp-content/uploads/2025/03/8fa3-Disclosure-Form.pdf' },
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
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Brampton', 'Caledon'],
    cityForms: [
      { name: 'Notice of Intention to Appear (NIA)', description: 'Request a trial for your ticket.', submitMethod: 'Email requestatrial@brampton.ca' },
      { name: 'Adjournment of First Trial Date', description: 'Request to postpone your first trial date (POA 0843).', url: 'https://www.brampton.ca/EN/residents/Court-Services/Provincial-Offences-Act/Documents/Adjournment%20of%20First%20Trial%20Date.pdf' },
      { name: 'Early Resolution Reopening', description: 'Application to reopen for an early resolution meeting.', url: 'https://www.brampton.ca/EN/residents/Court-Services/Provincial-Offences-Act/Documents/Reopening-Early-Resolution.pdf' },
      { name: 'Application for Extension of Time to Pay', description: 'Request more time to pay your fine.', submitMethod: 'Available on Brampton online forms page' },
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
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Mississauga'],
    cityForms: [
      { name: 'Notice of Intention to Appear', description: 'Request a trial date for your ticket.', url: 'https://www.mississauga.ca/publication/notice-of-intention-to-appear/' },
      { name: 'Application for Extension of Time to Pay', description: 'Request additional time to pay your fine (POA 0809).', url: 'https://www.mississauga.ca/publication/provincial-offences-forms-extension-of-time-to-pay/' },
      { name: 'Notice of Motion', description: 'File a motion with the court (POA 0007).', url: 'https://www.mississauga.ca/publication/provincial-offences-forms-motions-and-adjournments/' },
      { name: 'Certificate of Striking Out Conviction', description: 'Form for reopening a conviction (POA 0827).', url: 'https://www.mississauga.ca/publication/provincial-offences-forms-re-openings/' },
      { name: 'Notice of Appeal Part I & II', description: 'Appeal a Part I or II conviction (POA 0201).', url: 'https://www.mississauga.ca/publication/provincial-offences-forms-appeals/' },
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
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Barrie', 'Orillia', 'Simcoe County', 'Innisfil', 'Bradford'],
    cityForms: [
      { name: 'Motion for Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', url: 'https://www.barrie.ca/Living/Documents/POA-forms/Motion-for-Extension-of-Time-to-Pay-Fine.pdf' },
      { name: 'Application to Appeal Without Paying Fine', description: 'File appeal without paying the conviction fine (POA 0226).', url: 'https://www.barrie.ca/sites/default/files/2022-06/Application-to-Appeal-without-Paying-the-Fine.pdf' },
      { name: 'POA Court Transcript Order Form', description: 'Order transcripts of court proceedings for appeals.', url: 'https://www.barrie.ca/media/38' },
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
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
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
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Chatham', 'Kent County', 'Blenheim', 'Ridgetown', 'Tilbury', 'Wallaceburg'],
    cityForms: [
      { name: 'Reopening Package', description: 'Complete package to reopen a conviction entered in your absence.', url: 'https://www.chatham-kent.ca/localgovernment/poc/Documents/Reopening%20Package.pdf' },
      { name: 'Extension of Time to Pay Fine', description: 'Request additional time to pay your fine.', submitMethod: 'Contact court at 519-352-8484' },
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
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['Brantford', 'Brant County', 'Paris', 'Six Nations'],
    cityForms: [
      { name: 'Part I Disclosure Form', description: 'Request officer notes and prosecution evidence for Part I offences.', url: 'https://www.brantford.ca/en/your-government/resources/Documents/PART-I-DISCLOSURE-FORM.pdf' },
      { name: 'Outstanding Fine Payment Form', description: 'Make a payment on outstanding provincial offence fines.', submitMethod: 'Submit online at brantford.ca' },
    ],
  },
  {
    city: 'Niagara',
    region: 'Niagara Region',
    courtAddress: '445 East Main St, Welland, ON',
    phone: '905-687-6590 ext 1620',
    paymentUrl: 'https://www.paytickets.ca/',
    paymentPortal: 'paytickets.ca',
    municipalUrl: 'https://www.niagararegion.ca/living/provincial-offences/',
    formsPageUrl: 'https://www.niagararegion.ca/living/provincial-offences/online-forms.aspx',
    hours: 'Mon–Fri, 8:30 AM – 4:30 PM',
    servesAreas: ['St. Catharines', 'Niagara Falls', 'Welland', 'Fort Erie', 'Grimsby', 'Lincoln'],
    cityForms: [
      { name: 'Notice of Intention to Appear (POA 0813)', description: 'Request a trial date for your ticket.', url: 'https://www.niagararegion.ca/living/provincial-offences/pdf/Notice-of-Intention-to-Appear-POA-0813.pdf' },
      { name: 'Certificate of Striking Out Conviction', description: 'Form for reopening a conviction (POA-0827).', url: 'https://www.niagararegion.ca/living/provincial-offences/pdf/POA-0827-certificate-of-striking.pdf' },
      { name: 'File Appeal Without Paying Fine', description: 'Apply to file your appeal without paying the fine first.', url: 'https://www.niagararegion.ca/living/provincial-offences/pdf/file-appeal-without-paying-fine.pdf' },
      { name: 'Notice of Appeal (Part 1)', description: 'Appeal a Part I provincial offence conviction.', url: 'https://www.niagararegion.ca/living/provincial-offences/pdf/notice-of-appeal-part1.pdf' },
    ],
  },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Find a court by matching client city against court cities and served areas.
 * Uses fuzzy matching to handle variations like "Kitchener" vs "Kitchener-Waterloo".
 */
export function findCourtByCity(clientCity: string): CityCourtInfo | null {
  if (!clientCity) return null;
  const q = clientCity.toLowerCase().trim();

  // 1) Exact city name match
  const exactMatch = CITY_COURTS.find(c => c.city.toLowerCase() === q);
  if (exactMatch) return exactMatch;

  // 2) Check servesAreas
  const areaMatch = CITY_COURTS.find(c =>
    c.servesAreas?.some(a => a.toLowerCase() === q)
  );
  if (areaMatch) return areaMatch;

  // 3) Partial / contains match on city name
  const partialCity = CITY_COURTS.find(c =>
    c.city.toLowerCase().includes(q) || q.includes(c.city.toLowerCase())
  );
  if (partialCity) return partialCity;

  // 4) Partial match on served areas
  const partialArea = CITY_COURTS.find(c =>
    c.servesAreas?.some(a =>
      a.toLowerCase().includes(q) || q.includes(a.toLowerCase())
    )
  );
  if (partialArea) return partialArea;

  // 5) Region match
  const regionMatch = CITY_COURTS.find(c =>
    c.region && (c.region.toLowerCase().includes(q) || q.includes(c.region.toLowerCase()))
  );
  if (regionMatch) return regionMatch;

  return null;
}
