/**
 * SmallClaimsFormsPage.tsx
 * Complete directory of Ontario Small Claims Court forms
 * with direct links to Ontario Court Forms PDFs and filing info.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Users, Scale, Search, ExternalLink,
  Download, Shield, ArrowRight, Phone, ChevronRight,
  AlertTriangle, CheckCircle, Info, Gavel, BookOpen,
  DollarSign, ClipboardList, Briefcase, Send, Lock
} from 'lucide-react';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ============================================================
// FORM DATA
// ============================================================

interface SmallClaimsForm {
  number: string;
  title: string;
  description: string;
  category: 'claim' | 'defence' | 'motion' | 'settlement' | 'trial' | 'enforcement' | 'other';
  pdfUrl: string;
  fillableUrl?: string;
  filingMethod: 'online' | 'in-person' | 'online-or-in-person' | 'serve';
  fee?: string;
  relatedForms?: string[];
  popular?: boolean;
}

const SMALL_CLAIMS_FORMS: SmallClaimsForm[] = [
  // ─── CLAIMS & PARTIES ───
  {
    number: '1A',
    title: 'Additional Parties',
    description: 'Used when there is more than one Plaintiff or Defendant. Attach as the second page to a Plaintiff\'s Claim (7A), Defence (9A), or Defendant\'s Claim (10A) to list all additional parties.',
    category: 'other',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/01a/rsc-1a-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/01a/scr-1a-aug22-en-fil.pdf',
    filingMethod: 'online-or-in-person',
    relatedForms: ['7A', '9A', '10A'],
  },
  {
    number: '1B',
    title: 'Request for Telephone or Video Conference',
    description: 'Filed to request that a settlement conference, motion, or trial be conducted by telephone or video conference instead of in person.',
    category: 'other',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/01b/rsc-1b-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/01b/scr-1b-aug22-en-fil.pdf',
    filingMethod: 'in-person',
  },
  {
    number: '4A',
    title: 'Consent to Act as Litigation Guardian',
    description: 'A litigation guardian must complete and file this form when representing a party who is a minor (under 18) or mentally incapable. Must be filed when the claim is filed or as soon as possible after.',
    category: 'other',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/04a/rsc-4a-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/04a/scr-4a-aug22-en-fil.pdf',
    filingMethod: 'in-person',
  },
  {
    number: '4B',
    title: 'Affidavit (Motion for Payment Out of Court)',
    description: 'Sworn statement used when bringing a motion for payment of money out of court that has been paid in by a party or held by the court.',
    category: 'motion',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/04b/rsc-4b-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/04b/scr-4b-aug22-en-fil.pdf',
    filingMethod: 'in-person',
  },
  {
    number: '5A',
    title: 'Notice to Alleged Partner',
    description: 'Served on individuals alleged to be partners of a partnership that has been sued. Notifies them that they may be liable for the claim and can defend the action.',
    category: 'other',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/05a/rsc-5a-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/05a/scr-5a-aug22-en-fil.pdf',
    filingMethod: 'serve',
  },
  {
    number: '7A',
    title: 'Plaintiff\'s Claim',
    description: 'The main form used to start a lawsuit in Small Claims Court. The Plaintiff files this form to make a claim for money owed, property damage, return of personal property, or other relief up to $50,000 (as of October 2025).',
    category: 'claim',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/07a/rsc-7a-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/07a/scr-7a-aug22-en-fil.pdf',
    filingMethod: 'online-or-in-person',
    fee: '$108.00',
    popular: true,
  },
  {
    number: '8A',
    title: 'Affidavit of Service',
    description: 'Proof that a document has been properly served on another party. Must be completed by the person who served the document and filed with the court when proof of service is required.',
    category: 'other',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/08a/rsc-8a-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/08a/scr-8a-aug22-en-fil.pdf',
    filingMethod: 'in-person',
    popular: true,
  },

  // ─── DEFENCE & DEFENDANT'S CLAIM ───
  {
    number: '9A',
    title: 'Defence',
    description: 'Filed by a Defendant to dispute the Plaintiff\'s Claim. Must be filed within 20 calendar days of being served with the claim. Can also be used to respond to a Defendant\'s Claim (Form 10A).',
    category: 'defence',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/09a/rsc-9a-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/09a/scr-9a-aug22-en-fil.pdf',
    filingMethod: 'online-or-in-person',
    fee: '$73.00',
    relatedForms: ['7A'],
    popular: true,
  },
  {
    number: '9B',
    title: 'Request to Clerk',
    description: 'A multi-purpose form used to request various administrative actions from the court clerk, including: noting a party in default, scheduling a trial date, requesting an assessment hearing, or issuing a summons to witness.',
    category: 'other',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/09b/rsc-9b-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/09b/scr-9b-aug22-en-fil.pdf',
    filingMethod: 'in-person',
    popular: true,
  },
  {
    number: '10A',
    title: 'Defendant\'s Claim',
    description: 'Filed by a Defendant to make a claim against the Plaintiff or a third party. Serves the same purpose as a Counterclaim in Superior Court. Must be filed within 20 days of filing the Defence.',
    category: 'claim',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/10a/rsc-10a-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/10a/scr-10a-aug22-en-fil.pdf',
    filingMethod: 'online-or-in-person',
    fee: '$108.00',
    relatedForms: ['9A'],
    popular: true,
  },

  // ─── DEFAULT & CONSENT JUDGMENTS ───
  {
    number: '11A',
    title: 'Affidavit for Jurisdiction',
    description: 'A sworn statement filed in support of a Default Judgment to establish that the Small Claims Court has jurisdiction to hear the case. Required when the Defendant was served outside the court\'s territorial division.',
    category: 'other',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/11a/rsc-11a-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/11a/scr-11a-aug22-en-fil.pdf',
    filingMethod: 'in-person',
    relatedForms: ['11B'],
  },
  {
    number: '11B',
    title: 'Default Judgment',
    description: 'Filed when the Defendant has been noted in default (failed to file a Defence) and the claim is for a liquidated (specific) amount. If the clerk is satisfied, they will sign the judgment for the amount claimed plus interest.',
    category: 'other',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/11b/rsc-11b-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/11b/scr-11b-aug22-en-fil.pdf',
    filingMethod: 'in-person',
    fee: '$89.00',
    relatedForms: ['9B', '11A'],
    popular: true,
  },
  {
    number: '11.2A',
    title: 'Request for Clerk\'s Order on Consent',
    description: 'Filed when both parties agree to a specific order and ask the court clerk to issue it without a hearing. Commonly used for adjournments, payment plans, or other agreed-upon terms.',
    category: 'settlement',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/11-2a/rsc-11-2a-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/11-2a/scr-11-2a-aug22-en-fil.pdf',
    filingMethod: 'in-person',
  },
  {
    number: '11.3A',
    title: 'Notice of Discontinued Claim',
    description: 'Filed by a Plaintiff to discontinue (withdraw) their claim before trial. Once filed, the claim is ended and the Plaintiff generally cannot start a new claim on the same matter.',
    category: 'other',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/11-3a/rsc-11-3a-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/11-3a/scr-11-3a-aug22-en-fil.pdf',
    filingMethod: 'in-person',
    relatedForms: ['7A'],
  },

  // ─── SETTLEMENT & OFFERS ───
  {
    number: '13A',
    title: 'List of Proposed Witnesses',
    description: 'Must be exchanged between parties at least 14 days before a settlement conference. Lists witnesses you plan to call and documents you intend to rely on at trial.',
    category: 'trial',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/13a/rsc-13a-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/13a/scr-13a-aug22-en-fil.pdf',
    filingMethod: 'serve',
    popular: true,
  },
  {
    number: '13B',
    title: 'Consent',
    description: 'Used when parties consent to a particular order or action during the proceedings. Filed with the court to confirm both parties\' agreement.',
    category: 'settlement',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/13b/rsc-13b-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/13b/scr-13b-aug22-en-fil.pdf',
    filingMethod: 'in-person',
  },
  {
    number: '14A',
    title: 'Offer to Settle',
    description: 'A formal written offer from one party to another to resolve the case. Important for costs: if the winning party does as well or better than their offer at trial, they may be entitled to up to twice the usual costs.',
    category: 'settlement',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/14a/rsc-14a-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/14a/scr-14a-aug22-en-fil.pdf',
    filingMethod: 'serve',
    popular: true,
  },
  {
    number: '14B',
    title: 'Acceptance of Offer to Settle',
    description: 'Filed when a party accepts a formal Offer to Settle (Form 14A). Once accepted, the offer becomes binding and enforceable as a court order.',
    category: 'settlement',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/14b/rsc-14b-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/14b/scr-14b-aug22-en-fil.pdf',
    filingMethod: 'in-person',
    relatedForms: ['14A'],
  },
  {
    number: '14C',
    title: 'Terms of Settlement',
    description: 'Documents the specific terms agreed upon by the parties to settle the action. Can be filed with the court and enforced as a court order if both parties consent.',
    category: 'settlement',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/14c/rsc-14c-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/14c/scr-14c-aug22-en-fil.pdf',
    filingMethod: 'in-person',
  },
  {
    number: '14D',
    title: 'Proposal of Terms of Payment',
    description: 'Filed by a Defendant who admits the claim but proposes a payment schedule. If the Plaintiff does not dispute the proposal within 20 days, the clerk signs a payment order.',
    category: 'settlement',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/14d/rsc-14d-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/14d/scr-14d-aug22-en-fil.pdf',
    filingMethod: 'in-person',
  },

  // ─── MOTIONS ───
  {
    number: '15A',
    title: 'Notice of Motion and Supporting Affidavit',
    description: 'Used to bring a motion (request) before the court at any stage of a proceeding. Common uses include setting aside a default judgment, extending time to file documents, or changing the court location.',
    category: 'motion',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/15a/rsc-15a-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/15a/scr-15a-aug22-en-fil.pdf',
    filingMethod: 'in-person',
    fee: '$127.00',
    popular: true,
  },
  {
    number: '15B',
    title: 'Affidavit',
    description: 'A general-purpose sworn statement used to support or respond to a motion. The person making the affidavit (deponent) must sign it in the presence of a commissioner of oaths or notary public.',
    category: 'motion',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/15b/rsc-15b-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/15b/scr-15b-aug22-en-fil.pdf',
    filingMethod: 'in-person',
    relatedForms: ['15A'],
  },

  // ─── TRIAL ───
  {
    number: '18A',
    title: 'Summons to Witness',
    description: 'Served on a witness to compel their attendance at trial. Must be served personally along with attendance money (travel costs). The witness must attend or face arrest.',
    category: 'trial',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/18a/rsc-18a-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/18a/scr-18a-aug22-en-fil.pdf',
    filingMethod: 'in-person',
    fee: '$31.00',
    relatedForms: ['18B'],
  },
  {
    number: '18B',
    title: 'Warrant for Arrest of Defaulting Witness',
    description: 'Issued by the court to authorize the arrest of a witness who was properly served with a Summons to Witness and attendance money but failed to attend or remain at the trial.',
    category: 'trial',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/18b/rsc-18b-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/18b/scr-18b-aug22-en-fil.pdf',
    filingMethod: 'in-person',
    relatedForms: ['18A'],
  },

  // ─── ENFORCEMENT (Rule 20) ───
  {
    number: '20A',
    title: 'Certificate of Judgment',
    description: 'Issued by the clerk to certify the details of a judgment. Required to file enforcement proceedings in another court location or to register the judgment for enforcement purposes.',
    category: 'enforcement',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20a/rsc-20a-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20a/scr-20a-aug22-en-fil.pdf',
    filingMethod: 'in-person',
    fee: '$23.00',
    popular: true,
  },
  {
    number: '20B',
    title: 'Writ of Delivery',
    description: 'Directs the bailiff to seize and deliver specific personal property from the debtor to the creditor as ordered by the court. Used when the judgment requires return of specific items.',
    category: 'enforcement',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20b/rsc-20b-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20b/scr-20b-aug22-en-fil.pdf',
    filingMethod: 'in-person',
    fee: '$55.00',
    relatedForms: ['20A'],
  },
  {
    number: '20C',
    title: 'Writ of Seizure and Sale of Personal Property',
    description: 'Directs the bailiff to seize and sell the debtor\'s personal property (not land) to satisfy a judgment. One of the most common enforcement tools for collecting on a judgment.',
    category: 'enforcement',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20c/rsc-20c-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20c/scr-20c-aug22-en-fil.pdf',
    filingMethod: 'in-person',
    fee: '$55.00',
    relatedForms: ['20A'],
    popular: true,
  },
  {
    number: '20D',
    title: 'Writ of Seizure and Sale of Land',
    description: 'Filed with the Sheriff to register a lien against the debtor\'s real property (land). The property can eventually be sold to satisfy the judgment if the debtor does not pay.',
    category: 'enforcement',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20d/rsc-20d-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20d/scr-20d-aug22-en-fil.pdf',
    filingMethod: 'in-person',
    fee: '$55.00',
    relatedForms: ['20A'],
  },
  {
    number: '20E',
    title: 'Notice of Garnishment',
    description: 'Filed to garnish money owed to the debtor by a third party (garnishee), such as an employer (wages) or bank (bank account). One of the most effective enforcement methods.',
    category: 'enforcement',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20e/rsc-20e-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20e/scr-20e-aug22-en-fil.pdf',
    filingMethod: 'in-person',
    fee: '$55.00',
    relatedForms: ['20A', '20F', '20G'],
    popular: true,
  },
  {
    number: 'E.1',
    title: 'Notice of Renewal of Garnishment',
    description: 'Filed to renew a garnishment that is about to expire. A garnishment remains in force for six years and can be renewed before it expires.',
    category: 'enforcement',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20e-1/rsc-20e-1-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20e-1/scr-20e-1-aug22-en-fil.pdf',
    filingMethod: 'in-person',
    relatedForms: ['20E'],
  },
  {
    number: '20F',
    title: 'Garnishee\'s Statement',
    description: 'Completed by the garnishee (the third party, such as a bank or employer) in response to a Notice of Garnishment. Indicates what money, if any, is owed to the debtor.',
    category: 'enforcement',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20f/rsc-20f-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20f/scr-20f-aug22-en-fil.pdf',
    filingMethod: 'in-person',
    relatedForms: ['20E'],
  },
  {
    number: '20G',
    title: 'Notice to Co-owner of Debt',
    description: 'Served on a co-owner of a debt that is being garnished. Notifies the co-owner (e.g., joint bank account holder) that funds may be seized to satisfy the judgment.',
    category: 'enforcement',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20g/rsc-20g-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20g/scr-20g-aug22-en-fil.pdf',
    filingMethod: 'serve',
    relatedForms: ['20E'],
  },
  {
    number: '20H',
    title: 'Notice of Examination',
    description: 'Filed to compel a debtor (or officer of a corporate debtor) to attend an examination hearing to disclose their income, assets, and financial situation to help the creditor enforce the judgment.',
    category: 'enforcement',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20h/rsc-20h-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20h/scr-20h-aug22-en-fil.pdf',
    filingMethod: 'in-person',
    fee: '$55.00',
    relatedForms: ['20I'],
    popular: true,
  },
  {
    number: '20I',
    title: 'Financial Information Form',
    description: 'Completed by the debtor before a judgment debtor examination. Requires detailed disclosure of income, expenses, assets, and debts to help the creditor assess collection options.',
    category: 'enforcement',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20i/rsc-20i-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20i/scr-20i-aug22-en-fil.pdf',
    filingMethod: 'in-person',
    relatedForms: ['20H'],
  },
  {
    number: '20J',
    title: 'Warrant of Committal',
    description: 'Issued by the court when a debtor wilfully refuses to comply with a court order, including failure to attend a judgment debtor examination after being properly served. Authorizes arrest.',
    category: 'enforcement',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20j/rsc-20j-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20j/scr-20j-aug22-en-fil.pdf',
    filingMethod: 'in-person',
    relatedForms: ['20H'],
  },
  {
    number: '20K',
    title: 'Identification Form',
    description: 'Completed by the creditor to help the bailiff or sheriff identify the debtor and their property for enforcement purposes. Includes physical description and known addresses.',
    category: 'enforcement',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20k/rsc-20k-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20k/scr-20k-aug22-en-fil.pdf',
    filingMethod: 'in-person',
    relatedForms: ['20C', '20D'],
  },
  {
    number: '20L',
    title: 'Notice of Default of Payment',
    description: 'Filed when the debtor has defaulted on a payment order or terms of settlement. Allows the creditor to take enforcement steps that were suspended while the payment plan was in effect.',
    category: 'enforcement',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20l/rsc-20l-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20l/scr-20l-aug22-en-fil.pdf',
    filingMethod: 'in-person',
    relatedForms: ['20M'],
  },
  {
    number: '20M',
    title: 'Affidavit of Default of Payment',
    description: 'A sworn statement confirming that the debtor has defaulted on payments. Filed together with the Notice of Default of Payment (Form 20L) to support enforcement action.',
    category: 'enforcement',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20m/rsc-20m-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20m/scr-20m-aug22-en-fil.pdf',
    filingMethod: 'in-person',
    relatedForms: ['20L'],
  },
  {
    number: '20N',
    title: 'Request to Renew Writ of Seizure and Sale',
    description: 'Filed to renew a Writ of Seizure and Sale before it expires. Writs are valid for six years and must be renewed to remain enforceable.',
    category: 'enforcement',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20n/rsc-20n-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20n/scr-20n-aug22-en-fil.pdf',
    filingMethod: 'in-person',
    relatedForms: ['20C', '20D'],
  },
  {
    number: '20O',
    title: 'Direction to Enforce Writ of Seizure and Sale of Personal Property',
    description: 'Filed with the bailiff directing them to actively enforce a Writ of Seizure and Sale of Personal Property. Provides specific instructions about where the debtor\'s property can be found.',
    category: 'enforcement',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20o/rsc-20o-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20o/scr-20o-aug22-en-fil.pdf',
    filingMethod: 'in-person',
    relatedForms: ['20C'],
  },
  {
    number: '20P',
    title: 'Affidavit for Enforcement Request',
    description: 'A sworn statement filed in support of any enforcement request. Confirms the details of the judgment, the amount still owing, and the creditor\'s knowledge of the debtor\'s ability to pay.',
    category: 'enforcement',
    pdfUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20p/rsc-20p-e.pdf',
    fillableUrl: 'https://ontariocourtforms.on.ca/static/media/uploads/courtforms/scc/20p/scr-20p-aug22-en-fil.pdf',
    filingMethod: 'in-person',
    popular: true,
  },
];

const CATEGORIES = [
  { key: 'all', label: 'All Forms', icon: FileText },
  { key: 'claim', label: 'Claims (7A, 10A)', icon: Briefcase },
  { key: 'defence', label: 'Defence (9A)', icon: Shield },
  { key: 'motion', label: 'Motions (15A)', icon: Gavel },
  { key: 'settlement', label: 'Settlement & Offers', icon: Scale },
  { key: 'trial', label: 'Trial', icon: ClipboardList },
  { key: 'enforcement', label: 'Enforcement (20-Series)', icon: Lock },
  { key: 'other', label: 'Other & Admin', icon: FileText },
];

// ============================================================
// COMPONENT
// ============================================================

export default function SmallClaimsFormsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredForms = SMALL_CLAIMS_FORMS.filter(form => {
    const matchesSearch = searchQuery === '' ||
      form.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || form.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getFilingBadge = (method: string) => {
    switch (method) {
      case 'online': return { label: 'Online Filing', color: 'bg-green-100 text-green-800' };
      case 'in-person': return { label: 'In-Person Filing', color: 'bg-blue-100 text-blue-800' };
      case 'online-or-in-person': return { label: 'Online or In-Person', color: 'bg-cyan-100 text-cyan-800' };
      case 'serve': return { label: 'Serve on Party', color: 'bg-amber-100 text-amber-800' };
      default: return { label: method, color: 'bg-gray-100 text-gray-800' };
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'claim': return 'border-l-blue-500';
      case 'defence': return 'border-l-emerald-500';
      case 'motion': return 'border-l-amber-500';
      case 'settlement': return 'border-l-purple-500';
      case 'trial': return 'border-l-indigo-500';
      case 'enforcement': return 'border-l-red-500';
      case 'other': return 'border-l-gray-400';
      default: return 'border-l-gray-300';
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'claim': return 'bg-blue-100 text-blue-800';
      case 'defence': return 'bg-emerald-100 text-emerald-800';
      case 'motion': return 'bg-amber-100 text-amber-800';
      case 'settlement': return 'bg-purple-100 text-purple-800';
      case 'trial': return 'bg-indigo-100 text-indigo-800';
      case 'enforcement': return 'bg-red-100 text-red-800';
      case 'other': return 'bg-gray-100 text-gray-800';
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
              <FileText className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Ontario Legal Forms</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ontario Small Claims Court Forms Directory
            </h1>
            <p className="font-paragraph text-lg text-foreground/70 mb-6 max-w-3xl">
              Complete directory of all Small Claims Court forms under O. Reg. 258/98. Find the right form,
              understand when to use it, learn the filing fee, and download directly from Ontario Court Services.
              Claims up to $50,000 (effective October 2025).
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors">
                Need Help Filing? <ArrowRight className="w-5 h-5" />
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
              <DollarSign className="w-4 h-4" />
              <span>Claim filing: <strong>$108</strong> | Defence: <strong>$73</strong> | Motion: <strong>$127</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Online filing available for Claims (7A), Defence (9A), and Defendant&apos;s Claim (10A)</span>
            </div>
            <a
              href="https://ontariocourtforms.on.ca/en/rules-of-the-small-claims-court-forms/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 underline hover:no-underline font-medium"
            >
              Official Ontario Court Forms <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search forms by number, name, or description..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm font-paragraph focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
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

          <p className="text-xs text-gray-400 mt-3">
            Showing {filteredForms.length} of {SMALL_CLAIMS_FORMS.length} forms
          </p>
        </div>
      </section>

      {/* Forms List */}
      <section className="pb-16">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="space-y-3">
            {filteredForms.map((form) => {
              const filingBadge = getFilingBadge(form.filingMethod);
              return (
                <div
                  key={form.number}
                  className={`bg-white rounded-lg border border-gray-200 border-l-4 ${getCategoryColor(form.category)} hover:shadow-md transition-shadow`}
                >
                  <div className="p-5">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      {/* Form Number Badge */}
                      <div className="flex-shrink-0">
                        <div className={`w-14 h-14 rounded-lg flex items-center justify-center font-heading font-bold text-sm ${getCategoryBadgeColor(form.category)}`}>
                          {form.number}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-heading text-base font-bold text-foreground">
                            Form {form.number}: {form.title}
                          </h3>
                          {form.popular && (
                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-semibold rounded-full uppercase tracking-wider">
                              Common
                            </span>
                          )}
                        </div>
                        <p className="font-paragraph text-sm text-foreground/70 mb-3">
                          {form.description}
                        </p>

                        {/* Meta Row */}
                        <div className="flex flex-wrap items-center gap-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium ${filingBadge.color}`}>
                            {filingBadge.label}
                          </span>
                          {form.fee && (
                            <span className="text-xs text-gray-500">
                              Filing fee: <strong>{form.fee}</strong>
                            </span>
                          )}
                          {form.relatedForms && form.relatedForms.length > 0 && (
                            <span className="text-xs text-gray-400">
                              Related: {form.relatedForms.join(', ')}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-row md:flex-col gap-2 flex-shrink-0">
                        <a
                          href={form.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          View PDF
                        </a>
                        {form.fillableUrl && (
                          <a
                            href={form.fillableUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            <BookOpen className="w-4 h-4" />
                            Fillable
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredForms.length === 0 && (
              <div className="text-center py-16">
                <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-paragraph">No forms match your search. Try a different keyword or clear your filters.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Fee Schedule Summary */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
            Small Claims Court Fee Schedule
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { action: 'Filing a Plaintiff\'s Claim (7A)', fee: '$108.00', note: 'Infrequent claimant' },
              { action: 'Filing a Defence (9A)', fee: '$73.00', note: '' },
              { action: 'Filing a Defendant\'s Claim (10A)', fee: '$108.00', note: '' },
              { action: 'Filing a Notice of Motion (15A)', fee: '$127.00', note: '' },
              { action: 'Default Judgment (11B)', fee: '$89.00', note: '' },
              { action: 'Requesting a Trial Date', fee: '$290.00', note: 'Via Request to Clerk (9B)' },
              { action: 'Issuing a Summons to Witness (18A)', fee: '$31.00', note: 'Plus attendance money' },
              { action: 'Certificate of Judgment (20A)', fee: '$23.00', note: '' },
              { action: 'Writ of Seizure / Garnishment', fee: '$55.00', note: 'Forms 20B–20H' },
              { action: 'Frequent Claimant Filing', fee: '$218.00', note: '10+ claims per year' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-center">
                <div>
                  <p className="font-paragraph text-sm font-medium text-foreground">{item.action}</p>
                  {item.note && <p className="text-xs text-gray-400 mt-0.5">{item.note}</p>}
                </div>
                <span className="font-heading font-bold text-primary text-lg">{item.fee}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 text-center mt-4">
            Fees per O. Reg. 332/16. Subject to adjustment every three years based on Ontario CPI.
          </p>
        </div>
      </section>

      {/* Filing Portal CTA */}
      <section className="py-12 bg-pastelbeige/20 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <Gavel className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            Need Help Filing a Small Claims Court Action?
          </h2>
          <p className="font-paragraph text-foreground/70 mb-6 max-w-2xl mx-auto">
            Filing the wrong form, missing a deadline, or serving documents incorrectly can cost you your case.
            Our licensed paralegals handle Small Claims Court matters every day. Free consultation to review your situation.
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
              { title: 'Small Claims Court Services', desc: 'Learn how our paralegals can represent you in Small Claims Court for claims up to $50,000.', href: '/services/small-claims', icon: Gavel },
              { title: 'LTB Forms Directory', desc: 'Complete directory of Landlord and Tenant Board forms, notices, and applications.', href: '/resources/forms/ltb', icon: FileText },
              { title: 'Free Legal Resources', desc: 'Guides, FAQs, and tools to help you understand your legal rights in Ontario.', href: '/resources', icon: BookOpen },
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

      {/* Online Filing Info */}
      <section className="py-8 bg-green-50 border-t border-green-100">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Send className="w-6 h-6 text-green-700" />
              <div>
                <p className="font-heading font-bold text-green-900">File Online Through Ontario&apos;s Portal</p>
                <p className="font-paragraph text-sm text-green-700">
                  Plaintiff&apos;s Claims (7A), Defences (9A), and Defendant&apos;s Claims (10A) can be filed online.
                </p>
              </div>
            </div>
            <a
              href="https://www.ontario.ca/page/file-small-claims-court-documents-online"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-lg font-paragraph font-medium hover:bg-green-800 transition-colors"
            >
              Ontario Online Filing Portal <ExternalLink className="w-4 h-4" />
            </a>
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
