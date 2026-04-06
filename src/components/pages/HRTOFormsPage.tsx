/**
 * HRTOFormsPage.tsx
 * Complete directory of Human Rights Tribunal of Ontario (HRTO) forms
 * with direct links to Tribunals Ontario and filing instructions.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Search, ExternalLink, Download, Shield, ArrowRight, Phone,
  ChevronRight, CheckCircle, Info, Gavel, BookOpen, Scale,
  Users, AlertTriangle, Clock, Mail, Heart
} from 'lucide-react';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ============================================================
// FORM DATA
// ============================================================

interface HRTOForm {
  number: string;
  title: string;
  description: string;
  category: 'application' | 'response' | 'orders' | 'settlement' | 'interim' | 'reconsideration' | 'other';
  pdfUrl: string;
  rule?: string;
  filingEmail?: string;
  popular?: boolean;
}

const HRTO_FORMS: HRTOForm[] = [
  // ─── APPLICATION FORMS ───
  {
    number: 'Form 1',
    title: 'Application (Individual)',
    description: 'The main form to file a human rights complaint with the HRTO. Used when you believe you have experienced discrimination or harassment under Ontario\'s Human Rights Code. Must be filed within one year of the last incident of discrimination.',
    category: 'application',
    pdfUrl: 'https://tribunalsontario.ca/hrto/forms-filing/',
    rule: 'Rule 7',
    filingEmail: 'HRTO.efile@ontario.ca',
    popular: true,
  },
  {
    number: 'Form 1G',
    title: 'Application on Behalf of Another Person(s)',
    description: 'Used to file a human rights application on behalf of another person or group under Section 34(5) of the Human Rights Code. The person filing (applicant) must explain their relationship to the affected individual(s).',
    category: 'application',
    pdfUrl: 'https://tribunalsontario.ca/hrto/forms-filing/',
    rule: 'Section 34(5)',
    filingEmail: 'HRTO.efile@ontario.ca',
  },
  {
    number: 'Form 2',
    title: 'Response to an Application',
    description: 'Filed by the respondent (person or organization accused of discrimination) in reply to a Form 1 or Form 1G application. Must be filed within 35 days of receiving the application. Must respond to each allegation.',
    category: 'response',
    pdfUrl: 'https://tribunalsontario.ca/hrto/forms-filing/',
    rule: 'Rule 8',
    filingEmail: 'HRTO.Registrar@ontario.ca',
    popular: true,
  },
  {
    number: 'Form 3',
    title: 'Reply',
    description: 'An optional form filed by the applicant after receiving the respondent\'s Form 2 Response. Allows the applicant to address new issues raised in the response. Must be filed within 14 days of receiving the Response.',
    category: 'response',
    pdfUrl: 'https://tribunalsontario.ca/hrto/forms-filing/',
    rule: 'Rule 8',
    filingEmail: 'HRTO.Registrar@ontario.ca',
  },
  {
    number: 'Form 4A',
    title: 'Consent to Act as Litigation Guardian — Minor',
    description: 'Filed when a litigation guardian is appointed to represent a party who is a minor (under 18 years old). The proposed guardian must consent and demonstrate they can fairly represent the minor\'s interests.',
    category: 'other',
    pdfUrl: 'https://tribunalsontario.ca/hrto/forms-filing/',
    rule: 'Rule 5',
  },
  {
    number: 'Form 4B',
    title: 'Consent to Act as Litigation Guardian — Mental Capacity',
    description: 'Filed when a litigation guardian is appointed for a party who lacks mental capacity to represent themselves. The proposed guardian must consent and show they can act in the party\'s best interests.',
    category: 'other',
    pdfUrl: 'https://tribunalsontario.ca/hrto/forms-filing/',
    rule: 'Rule 5',
  },

  // ─── ORDERS DURING PROCEEDINGS ───
  {
    number: 'Form 10',
    title: 'Request for an Order During Proceedings',
    description: 'Filed at any time after an application has been filed to request the Tribunal to make an order. Common requests include: adjournments, disclosure orders, adding/removing parties, summary hearings, or case management directions.',
    category: 'orders',
    pdfUrl: 'https://tribunalsontario.ca/documents/hrto/Other/SJT010E.pdf',
    rule: 'Rules 15, 19',
    filingEmail: 'HRTO.Registrar@ontario.ca',
    popular: true,
  },
  {
    number: 'Form 11',
    title: 'Response to a Request for an Order',
    description: 'Filed in response to a Form 10 request. Allows the other party to state their position on the request and provide reasons why it should be granted or denied.',
    category: 'orders',
    pdfUrl: 'https://tribunalsontario.ca/documents/hrto/Other/SJT011E.pdf',
    rule: 'Rules 10, 11, 15, 19, 19A',
    filingEmail: 'HRTO.Registrar@ontario.ca',
    popular: true,
  },
  {
    number: 'Form 12',
    title: 'Request to Withdraw an Application',
    description: 'Filed by the applicant to voluntarily withdraw their human rights application. The Tribunal must approve the withdrawal. If the respondent objects, the Tribunal may schedule a hearing.',
    category: 'orders',
    pdfUrl: 'https://tribunalsontario.ca/hrto/forms-filing/',
    rule: 'Rule 14',
  },
  {
    number: 'Form 13',
    title: 'Request for Deferral',
    description: 'Filed to request that the HRTO defer (postpone) the processing of an application. May be requested if there are related proceedings in another forum (e.g., a grievance arbitration or court case).',
    category: 'orders',
    pdfUrl: 'https://tribunalsontario.ca/hrto/forms-filing/',
    rule: 'Rule 14',
  },

  // ─── INTERIM REMEDY ───
  {
    number: 'Form 16',
    title: 'Request for Interim Remedy',
    description: 'Filed to request temporary or emergency relief from the Tribunal before the final hearing. Used when the applicant would suffer irreparable harm without immediate action (e.g., reinstatement to a job, access to housing).',
    category: 'interim',
    pdfUrl: 'https://tribunalsontario.ca/documents/hrto/Other/SJT016E.pdf',
    rule: 'Rule 23',
    filingEmail: 'HRTO.Registrar@ontario.ca',
    popular: true,
  },
  {
    number: 'Form 17',
    title: 'Response to Request for Interim Remedy',
    description: 'Filed by the respondent in reply to a Form 16 request for interim remedy. Outlines the respondent\'s position on whether the requested temporary relief should be granted.',
    category: 'interim',
    pdfUrl: 'https://tribunalsontario.ca/hrto/forms-filing/',
    rule: 'Rule 23',
    filingEmail: 'HRTO.Registrar@ontario.ca',
  },

  // ─── SETTLEMENT ───
  {
    number: 'Form 25',
    title: 'Confirmation of Settlement',
    description: 'Filed when both parties have reached a settlement agreement and wish to have the application dismissed or the settlement made into a Tribunal order. The Tribunal reviews the terms to ensure they are consistent with the Code.',
    category: 'settlement',
    pdfUrl: 'https://tribunalsontario.ca/hrto/forms-filing/',
    rule: 'Rule 24',
    popular: true,
  },

  // ─── RECONSIDERATION ───
  {
    number: 'Form 20',
    title: 'Request for Reconsideration',
    description: 'Filed within 30 days of a final HRTO decision to request the Tribunal reconsider its decision. Grounds include: new facts not available at the hearing, not receiving notice of the hearing, or the decision conflicts with established procedure or law and involves a matter of public importance.',
    category: 'reconsideration',
    pdfUrl: 'https://tribunalsontario.ca/documents/hrto/Other/SJT020E.pdf',
    rule: 'Rule 26',
    filingEmail: 'HRTO.Registrar@ontario.ca',
    popular: true,
  },
  {
    number: 'Form 21',
    title: 'Response to Request for Reconsideration',
    description: 'Filed in response to a Form 20 Request for Reconsideration. Allows the other party to respond to the request and explain why the Tribunal\'s original decision should stand.',
    category: 'reconsideration',
    pdfUrl: 'https://tribunalsontario.ca/hrto/forms-filing/',
    rule: 'Rule 26',
    filingEmail: 'HRTO.Registrar@ontario.ca',
  },
];

const CATEGORIES = [
  { key: 'all', label: 'All Forms', icon: FileText },
  { key: 'application', label: 'Applications', icon: Scale },
  { key: 'response', label: 'Responses & Reply', icon: Users },
  { key: 'orders', label: 'Orders & Requests', icon: Gavel },
  { key: 'interim', label: 'Interim Remedy', icon: AlertTriangle },
  { key: 'settlement', label: 'Settlement', icon: Heart },
  { key: 'reconsideration', label: 'Reconsideration', icon: BookOpen },
  { key: 'other', label: 'Other', icon: FileText },
];

// ============================================================
// PROTECTED GROUNDS
// ============================================================

const PROTECTED_GROUNDS = [
  'Race', 'Colour', 'Ancestry', 'Place of Origin', 'Ethnic Origin',
  'Citizenship', 'Creed (Religion)', 'Sex (incl. Pregnancy)', 'Sexual Orientation',
  'Gender Identity / Expression', 'Age', 'Marital Status', 'Family Status',
  'Disability', 'Receipt of Public Assistance (Housing)'
];

// ============================================================
// COMPONENT
// ============================================================

export default function HRTOFormsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredForms = HRTO_FORMS.filter(form => {
    const matchesSearch = searchQuery === '' ||
      form.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || form.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'application': return 'border-l-blue-500';
      case 'response': return 'border-l-emerald-500';
      case 'orders': return 'border-l-purple-500';
      case 'interim': return 'border-l-red-500';
      case 'settlement': return 'border-l-green-500';
      case 'reconsideration': return 'border-l-amber-500';
      case 'other': return 'border-l-gray-400';
      default: return 'border-l-gray-300';
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'application': return 'bg-blue-100 text-blue-800';
      case 'response': return 'bg-emerald-100 text-emerald-800';
      case 'orders': return 'bg-purple-100 text-purple-800';
      case 'interim': return 'bg-red-100 text-red-800';
      case 'settlement': return 'bg-green-100 text-green-800';
      case 'reconsideration': return 'bg-amber-100 text-amber-800';
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
              <Scale className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Ontario Human Rights</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              HRTO Forms Directory
            </h1>
            <p className="font-paragraph text-lg text-foreground/70 mb-6 max-w-3xl">
              Complete directory of Human Rights Tribunal of Ontario (HRTO) forms. File a discrimination
              complaint, respond to an application, request interim relief, or appeal a decision. All forms
              link directly to Tribunals Ontario.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors">
                File a Complaint <ArrowRight className="w-5 h-5" />
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
              <span>File within <strong>1 year</strong> of the last incident</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>E-file: <strong>HRTO.efile@ontario.ca</strong></span>
            </div>
            <a
              href="https://tribunalsontario.ca/hrto/forms-filing/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 underline hover:no-underline font-medium"
            >
              Official HRTO Forms Page <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Protected Grounds */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-lg font-bold text-foreground mb-3">
            Protected Grounds Under Ontario&apos;s Human Rights Code
          </h2>
          <div className="flex flex-wrap gap-2">
            {PROTECTED_GROUNDS.map((ground) => (
              <span
                key={ground}
                className="px-3 py-1.5 bg-primary/5 text-primary text-xs font-medium rounded-full border border-primary/10"
              >
                {ground}
              </span>
            ))}
          </div>
          <p className="text-xs text-foreground/50 mt-3">
            Discrimination based on any of these grounds in employment, housing, services, or contracts is prohibited under the Ontario Human Rights Code.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
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
            Showing {filteredForms.length} of {HRTO_FORMS.length} forms
          </p>
        </div>
      </section>

      {/* Forms List */}
      <section className="pb-16">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="space-y-3">
            {filteredForms.map((form, idx) => (
              <div
                key={`${form.number}-${idx}`}
                className={`bg-white rounded-lg border border-gray-200 border-l-4 ${getCategoryColor(form.category)} hover:shadow-md transition-shadow`}
              >
                <div className="p-5">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 rounded-lg flex items-center justify-center font-heading font-bold text-xs ${getCategoryBadgeColor(form.category)}`}>
                        {form.number.replace('Form ', 'F')}
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
                      <p className="font-paragraph text-sm text-foreground/70 mb-3">
                        {form.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-3">
                        {form.rule && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium bg-gray-100 text-gray-700">
                            {form.rule}
                          </span>
                        )}
                        {form.filingEmail && (
                          <span className="text-xs text-gray-400">
                            E-file: <a href={`mailto:${form.filingEmail}`} className="text-primary hover:underline">{form.filingEmail}</a>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <a
                        href={form.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Get Form
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

      {/* Filing Process */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            How to File an HRTO Complaint
          </h2>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Complete Form 1 (Application)', desc: 'Download Form 1 from Tribunals Ontario. Describe the discrimination you experienced, including the protected ground(s), the area(s) (employment, housing, services), dates, and what happened.' },
              { step: '2', title: 'E-file Your Application', desc: 'Email your completed Form 1 to HRTO.efile@ontario.ca. You can also mail it. There is no filing fee for HRTO applications.' },
              { step: '3', title: 'Respondent Files Form 2 (Response)', desc: 'The respondent has 35 days after receiving the application to file a Response (Form 2). You may then file a Reply (Form 3) within 14 days.' },
              { step: '4', title: 'Mediation (Voluntary)', desc: 'The HRTO offers free, voluntary mediation. This is often the fastest way to resolve a complaint. If mediation fails, the case proceeds to a hearing.' },
              { step: '5', title: 'Hearing & Decision', desc: 'A Tribunal adjudicator hears the case and makes a binding decision. Remedies can include monetary compensation, reinstatement, policy changes, and human rights training.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 bg-white rounded-lg border border-gray-200 p-5">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading font-bold text-lg flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="font-paragraph text-sm text-foreground/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-start gap-2 text-sm text-green-700 bg-green-50 p-4 rounded-lg">
            <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <span><strong>No filing fee.</strong> Filing an HRTO application is free. Free mediation is also available.</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-pastelbeige/20 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <Scale className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            Need Help Filing a Human Rights Complaint?
          </h2>
          <p className="font-paragraph text-foreground/70 mb-6 max-w-2xl mx-auto">
            Human rights complaints are complex and time-sensitive. Our licensed paralegals have experience with
            HRTO applications and can help you build the strongest possible case. Free consultation.
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
              { title: 'Human Rights Services', desc: 'Learn how our paralegals represent clients at the Human Rights Tribunal of Ontario.', href: '/services/human-rights', icon: Scale },
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
            Licensed by the Law Society of Ontario | Forms sourced from Tribunals Ontario (tribunalsontario.ca)
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
