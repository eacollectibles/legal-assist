/**
 * LTBFormsPage.tsx
 * Complete directory of Ontario Landlord and Tenant Board (LTB) forms
 * with direct links to Tribunals Ontario PDFs and filing info.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Home, Users, Scale, Search, ExternalLink,
  Download, Shield, ArrowRight, Phone, Filter, ChevronRight,
  Building2, AlertTriangle, CheckCircle, Info, Gavel, BookOpen
} from 'lucide-react';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ============================================================
// FORM DATA
// ============================================================

interface LTBForm {
  number: string;
  title: string;
  description: string;
  category: 'landlord' | 'tenant' | 'notice-landlord' | 'notice-tenant' | 'coop' | 'combined' | 'other';
  pdfUrl: string;
  instructionUrl?: string;
  filingMethod: 'portal' | 'email' | 'mail' | 'portal-or-email';
  fee?: string;
  relatedNotices?: string[];
  popular?: boolean;
}

const LTB_FORMS: LTBForm[] = [
  // ─── LANDLORD APPLICATIONS (L-Series) ───
  {
    number: 'L1',
    title: 'Application to Evict a Tenant for Non-payment of Rent and to Collect Rent the Tenant Owes',
    description: 'Filed when a tenant has not paid rent. Combines eviction for non-payment with a claim for arrears. Must serve N4 notice first and wait the required notice period.',
    category: 'landlord',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Landlord%20Applications%20&%20Instructions/L1.pdf',
    instructionUrl: 'https://tribunalsontario.ca/documents/ltb/Landlord%20Applications%20&%20Instructions/L1_Instructions.pdf',
    filingMethod: 'portal',
    fee: '$201.00',
    relatedNotices: ['N4'],
    popular: true,
  },
  {
    number: 'L2',
    title: 'Application to End a Tenancy and Evict a Tenant',
    description: 'Used to evict a tenant based on notices N5, N6, N7, N12, or N13. Covers reasons such as damage, illegal activity, personal use by landlord, demolition, or major repairs.',
    category: 'landlord',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Landlord%20Applications%20&%20Instructions/L2.pdf',
    instructionUrl: 'https://tribunalsontario.ca/documents/ltb/Landlord%20Applications%20&%20Instructions/L2_Instructions.pdf',
    filingMethod: 'portal',
    fee: '$201.00',
    relatedNotices: ['N5', 'N6', 'N7', 'N12', 'N13'],
    popular: true,
  },
  {
    number: 'L3',
    title: 'Application to End a Tenancy — Tenant Gave Notice or Agreed to Terminate',
    description: 'Filed when a tenant gave an N9 notice to terminate or both parties signed an N11 agreement. Used to obtain an eviction order when the tenant does not vacate.',
    category: 'landlord',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Landlord%20Applications%20&%20Instructions/L3.pdf',
    instructionUrl: 'https://tribunalsontario.ca/documents/ltb/Landlord%20Applications%20&%20Instructions/L3_Instructions.pdf',
    filingMethod: 'portal',
    fee: '$201.00',
    relatedNotices: ['N9', 'N11'],
  },
  {
    number: 'L4',
    title: 'Application to End a Tenancy — Tenant Failed to Meet Conditions of a Settlement or Order',
    description: 'Filed when a tenant has breached conditions of a mediated settlement or LTB order. Allows the landlord to request eviction based on the breach.',
    category: 'landlord',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Landlord%20Applications%20&%20Instructions/L4.pdf',
    instructionUrl: 'https://tribunalsontario.ca/documents/ltb/Landlord%20Applications%20&%20Instructions/L4_Instructions.pdf',
    filingMethod: 'portal',
    fee: '$201.00',
  },
  {
    number: 'L5',
    title: 'Application for an Above Guideline Increase (AGI) in Rent',
    description: 'Filed to increase rent above the provincial guideline. Applies when landlord has incurred extraordinary capital expenditures, operating cost increases, or municipal tax increases.',
    category: 'landlord',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Landlord%20Applications%20&%20Instructions/L5.pdf',
    instructionUrl: 'https://tribunalsontario.ca/documents/ltb/Landlord%20Applications%20&%20Instructions/L5_Instructions.pdf',
    filingMethod: 'email',
    fee: '$201.00',
    relatedNotices: ['N10'],
  },
  {
    number: 'L6',
    title: 'Application for Review of a Provincial Work Order',
    description: 'Filed when a landlord disagrees with a municipal property standards or maintenance work order and wishes to have it reviewed by the LTB.',
    category: 'landlord',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Landlord%20Applications%20&%20Instructions/L6.pdf',
    filingMethod: 'email',
    fee: '$201.00',
  },
  {
    number: 'L7',
    title: 'Application to Transfer a Tenant Out of a Care Home',
    description: 'Filed when a landlord of a care home needs to transfer a tenant to another unit or facility for safety or care reasons.',
    category: 'landlord',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Landlord%20Applications%20&%20Instructions/L7.pdf',
    filingMethod: 'email',
    fee: '$201.00',
  },
  {
    number: 'L8',
    title: 'Application Because the Tenant Changed the Locks',
    description: 'Filed when a tenant has changed or added locks without the landlord\'s consent, denying the landlord reasonable access to the rental unit.',
    category: 'landlord',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Landlord%20Applications%20&%20Instructions/L8.pdf',
    filingMethod: 'email',
    fee: '$201.00',
  },
  {
    number: 'L9',
    title: 'Application to Collect Rent the Tenant Owes',
    description: 'Filed to collect rent arrears without seeking eviction. Can be used while the tenant is still living in the unit. Does not result in an eviction order.',
    category: 'landlord',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Landlord%20Applications%20&%20Instructions/L9.pdf',
    instructionUrl: 'https://tribunalsontario.ca/documents/ltb/Landlord%20Applications%20&%20Instructions/L9_Instructions.pdf',
    filingMethod: 'portal',
    fee: '$201.00',
  },
  {
    number: 'L10',
    title: 'Application to Collect Money a Former Tenant Owes',
    description: 'Filed to collect rent arrears or compensation for damages from a tenant who has already moved out. Must be filed within one year of the tenant vacating.',
    category: 'landlord',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Landlord%20Applications%20&%20Instructions/L10.pdf',
    instructionUrl: 'https://tribunalsontario.ca/documents/ltb/Landlord%20Applications%20&%20Instructions/L10_Instructions.pdf',
    filingMethod: 'portal',
    fee: '$201.00',
  },

  // ─── TENANT APPLICATIONS (T-Series) ───
  {
    number: 'T1',
    title: 'Tenant Application for a Rebate of Money the Landlord Owes',
    description: 'Filed when a tenant is owed money by the landlord. Includes illegal rent charges, rent paid in excess of lawful amount, or money owed from a breach of obligation.',
    category: 'tenant',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Tenant%20Applications%20&%20Instructions/T1.pdf',
    instructionUrl: 'https://tribunalsontario.ca/documents/ltb/Tenant%20Applications%20&%20Instructions/T1_Instructions.pdf',
    filingMethod: 'portal',
    fee: '$53.00',
    popular: true,
  },
  {
    number: 'T2',
    title: 'Application About Tenant Rights',
    description: 'Filed when a landlord has violated a tenant\'s rights, including harassment, illegal entry, interference with reasonable enjoyment, changing locks, withholding vital services, or illegal eviction.',
    category: 'tenant',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Tenant%20Applications%20&%20Instructions/T2.pdf',
    instructionUrl: 'https://tribunalsontario.ca/documents/ltb/Tenant%20Applications%20&%20Instructions/T2_Instructions.pdf',
    filingMethod: 'portal',
    fee: '$53.00',
    popular: true,
  },
  {
    number: 'T3',
    title: 'Tenant Application for a Rent Reduction',
    description: 'Filed when the municipal taxes for the rental property have decreased and the landlord has not passed along the reduction. Also used when services or facilities have been reduced.',
    category: 'tenant',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Tenant%20Applications%20&%20Instructions/T3.pdf',
    filingMethod: 'email',
    fee: '$53.00',
  },
  {
    number: 'T4',
    title: 'Tenant Application — Landlord Did Not Comply with an Agreement to Increase Rent Above the Guideline',
    description: 'Filed when a landlord has failed to comply with the terms of an N10 agreement regarding capital work or services in exchange for an above-guideline rent increase.',
    category: 'tenant',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Tenant%20Applications%20&%20Instructions/T4.pdf',
    filingMethod: 'email',
    fee: '$53.00',
    relatedNotices: ['N10'],
  },
  {
    number: 'T5',
    title: 'Tenant Application — Landlord Gave a Notice of Termination in Bad Faith',
    description: 'Filed when a tenant believes the landlord served an N12 or N13 notice in bad faith. Available if the tenant moved out or was evicted and the unit was not used as stated in the notice.',
    category: 'tenant',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Tenant%20Applications%20&%20Instructions/T5.pdf',
    instructionUrl: 'https://tribunalsontario.ca/documents/ltb/Tenant%20Applications%20&%20Instructions/T5_Instructions.pdf',
    filingMethod: 'portal',
    fee: '$53.00',
    relatedNotices: ['N12', 'N13'],
    popular: true,
  },
  {
    number: 'T6',
    title: 'Tenant Application About Maintenance',
    description: 'Filed when the landlord has failed to maintain the rental unit or residential complex in a good state of repair. Covers broken appliances, pest infestations, water damage, mould, and structural issues.',
    category: 'tenant',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Tenant%20Applications%20&%20Instructions/T6.pdf',
    instructionUrl: 'https://tribunalsontario.ca/documents/ltb/Tenant%20Applications%20&%20Instructions/T6_Instructions.pdf',
    filingMethod: 'portal',
    fee: '$53.00',
    popular: true,
  },

  // ─── LANDLORD NOTICES (N-Series for Landlords) ───
  {
    number: 'N1',
    title: 'Notice of Rent Increase',
    description: 'Served to notify a tenant of a lawful rent increase (at or below the guideline). Must be given at least 90 days before the increase takes effect.',
    category: 'notice-landlord',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Notices%20of%20Termination%20&%20Instructions/N1.pdf',
    filingMethod: 'mail',
  },
  {
    number: 'N2',
    title: 'Notice of Rent Increase — Unit Partially Exempt from the Act',
    description: 'Used for units that are partially exempt from the Residential Tenancies Act (e.g., certain social housing or non-profit units).',
    category: 'notice-landlord',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Notices%20of%20Termination%20&%20Instructions/N2.pdf',
    filingMethod: 'mail',
  },
  {
    number: 'N3',
    title: 'Notice to Increase the Rent and/or Charges for Care Services and Meals',
    description: 'Used by care home landlords to increase charges for care services and meals in addition to or instead of rent.',
    category: 'notice-landlord',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Notices%20of%20Termination%20&%20Instructions/N3.pdf',
    filingMethod: 'mail',
  },
  {
    number: 'N4',
    title: 'Notice to End Your Tenancy Early for Non-payment of Rent',
    description: 'Served when a tenant has not paid rent in full. Gives the tenant 14 days to pay (for most tenancies). Required before filing an L1 application.',
    category: 'notice-landlord',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Notices%20of%20Termination%20&%20Instructions/N4.pdf',
    instructionUrl: 'https://tribunalsontario.ca/documents/ltb/Notices%20of%20Termination%20&%20Instructions/N4_Instructions.pdf',
    filingMethod: 'mail',
    relatedNotices: ['L1'],
    popular: true,
  },
  {
    number: 'N5',
    title: 'Notice to End Your Tenancy for Interfering with Others, Damage, or Overcrowding',
    description: 'Served when a tenant is substantially interfering with reasonable enjoyment, has caused wilful or negligent damage, or the unit is overcrowded. First N5 allows 20 days to correct.',
    category: 'notice-landlord',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Notices%20of%20Termination%20&%20Instructions/N5.pdf',
    instructionUrl: 'https://tribunalsontario.ca/documents/ltb/Notices%20of%20Termination%20&%20Instructions/N5_Instructions.pdf',
    filingMethod: 'mail',
    relatedNotices: ['L2'],
    popular: true,
  },
  {
    number: 'N6',
    title: 'Notice to End Your Tenancy for Illegal Acts or Misrepresenting Income in a Rent-Geared-to-Income Rental Unit',
    description: 'Served when the tenant has committed an illegal act in the rental unit or complex, or has misrepresented their income for a rent-geared-to-income subsidy.',
    category: 'notice-landlord',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Notices%20of%20Termination%20&%20Instructions/N6.pdf',
    filingMethod: 'mail',
    relatedNotices: ['L2'],
  },
  {
    number: 'N7',
    title: 'Notice to End Your Tenancy for Causing Serious Problems in the Rental Unit or Residential Complex',
    description: 'Served for serious reasons including impairment of safety, illegal acts involving controlled substances, or using the unit for an illegal trade or business.',
    category: 'notice-landlord',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Notices%20of%20Termination%20&%20Instructions/N7.pdf',
    filingMethod: 'mail',
    relatedNotices: ['L2'],
  },
  {
    number: 'N8',
    title: 'Notice to End Your Tenancy at the End of the Term',
    description: 'Served to a tenant with a fixed-term tenancy to end it at the end of the term. Typically used for persistently late rent payments.',
    category: 'notice-landlord',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Notices%20of%20Termination%20&%20Instructions/N8.pdf',
    filingMethod: 'mail',
    relatedNotices: ['L2'],
  },
  {
    number: 'N10',
    title: 'Agreement to Increase the Rent Above the Guideline',
    description: 'An agreement between landlord and tenant to increase rent above the guideline in exchange for the landlord completing capital work or providing additional services.',
    category: 'notice-landlord',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Notices%20of%20Termination%20&%20Instructions/N10.pdf',
    filingMethod: 'mail',
    relatedNotices: ['L5', 'T4'],
  },
  {
    number: 'N11',
    title: 'Agreement to End the Tenancy',
    description: 'A mutual agreement between landlord and tenant to end the tenancy on a specific date. Both parties must sign. Can be filed with an L3 if the tenant does not vacate.',
    category: 'notice-landlord',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Notices%20of%20Termination%20&%20Instructions/N11.pdf',
    filingMethod: 'mail',
    relatedNotices: ['L3'],
    popular: true,
  },
  {
    number: 'N12',
    title: 'Notice to End Your Tenancy Because the Landlord, a Purchaser, or a Family Member Requires the Rental Unit',
    description: 'Served when the landlord or an immediate family member, or a purchaser, requires the rental unit for personal use. Requires one month\'s rent compensation to the tenant.',
    category: 'notice-landlord',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Notices%20of%20Termination%20&%20Instructions/N12.pdf',
    instructionUrl: 'https://tribunalsontario.ca/documents/ltb/Notices%20of%20Termination%20&%20Instructions/N12_Instructions.pdf',
    filingMethod: 'mail',
    relatedNotices: ['L2', 'T5'],
    popular: true,
  },
  {
    number: 'N13',
    title: 'Notice to End Your Tenancy Because the Landlord Wants to Demolish, Repair, or Convert the Rental Unit',
    description: 'Served when the landlord intends to demolish the building, do extensive repairs requiring vacancy, or convert the unit to non-residential use.',
    category: 'notice-landlord',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Notices%20of%20Termination%20&%20Instructions/N13.pdf',
    instructionUrl: 'https://tribunalsontario.ca/documents/ltb/Notices%20of%20Termination%20&%20Instructions/N13_Instructions.pdf',
    filingMethod: 'mail',
    relatedNotices: ['L2', 'T5'],
  },

  // ─── TENANT NOTICES (N-Series for Tenants) ───
  {
    number: 'N9',
    title: 'Tenant\'s Notice to End the Tenancy',
    description: 'Given by a tenant to the landlord to end the tenancy. Requires at least 60 days\' notice and must end on the last day of a rental period (for monthly tenancies).',
    category: 'notice-tenant',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Notices%20of%20Termination%20&%20Instructions/N9.pdf',
    filingMethod: 'mail',
    popular: true,
  },

  // ─── CO-OPERATIVE APPLICATIONS (C-Series) ───
  {
    number: 'C1',
    title: 'Application by a Co-operative to Evict a Member',
    description: 'Filed by a housing co-operative to evict a member-tenant. Subject to specific co-operative housing legislation and by-laws.',
    category: 'coop',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Other%20Applications%20&%20Instructions/C1.pdf',
    filingMethod: 'portal',
    fee: '$201.00',
  },
  {
    number: 'C2',
    title: 'Application About Rights — Co-operative Housing',
    description: 'Filed by a co-operative member regarding their rights within the co-operative, including disputes about by-laws, occupancy charges, or co-op governance.',
    category: 'coop',
    pdfUrl: 'https://tribunalsontario.ca/documents/ltb/Other%20Applications%20&%20Instructions/C2.pdf',
    filingMethod: 'portal',
    fee: '$53.00',
  },
];

const CATEGORIES = [
  { key: 'all', label: 'All Forms', icon: FileText },
  { key: 'landlord', label: 'Landlord Applications (L)', icon: Building2 },
  { key: 'tenant', label: 'Tenant Applications (T)', icon: Users },
  { key: 'notice-landlord', label: 'Landlord Notices (N)', icon: AlertTriangle },
  { key: 'notice-tenant', label: 'Tenant Notices (N)', icon: Home },
  { key: 'coop', label: 'Co-operative (C)', icon: Scale },
];

// ============================================================
// COMPONENT
// ============================================================

export default function LTBFormsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredForms = LTB_FORMS.filter(form => {
    const matchesSearch = searchQuery === '' ||
      form.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || form.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getFilingBadge = (method: string) => {
    switch (method) {
      case 'portal': return { label: 'Online Portal', color: 'bg-green-100 text-green-800' };
      case 'email': return { label: 'Email Filing', color: 'bg-blue-100 text-blue-800' };
      case 'mail': return { label: 'Serve to Tenant', color: 'bg-amber-100 text-amber-800' };
      case 'portal-or-email': return { label: 'Portal or Email', color: 'bg-cyan-100 text-cyan-800' };
      default: return { label: method, color: 'bg-gray-100 text-gray-800' };
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'landlord': return 'border-l-blue-500';
      case 'tenant': return 'border-l-emerald-500';
      case 'notice-landlord': return 'border-l-amber-500';
      case 'notice-tenant': return 'border-l-purple-500';
      case 'coop': return 'border-l-pink-500';
      default: return 'border-l-gray-300';
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
              Ontario LTB Forms Directory
            </h1>
            <p className="font-paragraph text-lg text-foreground/70 mb-6 max-w-3xl">
              Complete directory of all Landlord and Tenant Board forms, notices, and applications with
              direct download links to Tribunals Ontario. Find the right form, understand when to use it,
              and learn how to file it.
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
              <Info className="w-4 h-4" />
              <span>All forms link directly to <strong>Tribunals Ontario</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Portal filing available for L1, L2, L3, L4, L9, L10, T1, T2, T5, T6, C1, C2</span>
            </div>
            <a
              href="https://tribunalsontario.ca/ltb/forms-filing-and-fees/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 underline hover:no-underline font-medium"
            >
              Official LTB Forms Page <ExternalLink className="w-3.5 h-3.5" />
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
            Showing {filteredForms.length} of {LTB_FORMS.length} forms
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
                        <div className={`w-14 h-14 rounded-lg flex items-center justify-center font-heading font-bold text-lg ${
                          form.category === 'landlord' ? 'bg-blue-100 text-blue-800' :
                          form.category === 'tenant' ? 'bg-emerald-100 text-emerald-800' :
                          form.category === 'notice-landlord' ? 'bg-amber-100 text-amber-800' :
                          form.category === 'notice-tenant' ? 'bg-purple-100 text-purple-800' :
                          'bg-pink-100 text-pink-800'
                        }`}>
                          {form.number}
                        </div>
                      </div>

                      {/* Content */}
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
                          {form.relatedNotices && form.relatedNotices.length > 0 && (
                            <span className="text-xs text-gray-400">
                              Related: {form.relatedNotices.join(', ')}
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
                          Download
                        </a>
                        {form.instructionUrl && (
                          <a
                            href={form.instructionUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            <BookOpen className="w-4 h-4" />
                            Instructions
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

      {/* Filing Portal CTA */}
      <section className="py-12 bg-pastelbeige/20 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <Gavel className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            Need Help Filing an LTB Application?
          </h2>
          <p className="font-paragraph text-foreground/70 mb-6 max-w-2xl mx-auto">
            Filing the wrong form or missing a deadline can hurt your case. Our licensed paralegals
            prepare and file LTB applications daily. Free consultation to review your situation.
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
              { title: 'Ontario Tenant Rights Guide', desc: 'Know your rights as a tenant, from rent increases to eviction protections.', href: '/guides/ontario-tenant-rights', icon: Home },
              { title: 'Ontario Landlord Rights Guide', desc: 'Understand your obligations and rights as a landlord in Ontario.', href: '/guides/ontario-landlord-rights', icon: Building2 },
              { title: 'LTB Hearing Preparation', desc: 'Step-by-step guide to preparing for your Landlord and Tenant Board hearing.', href: '/guides/ltb-hearing-preparation', icon: Gavel },
            ].map((resource, i) => (
              <Link key={i} to={resource.href} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow group">
                <resource.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{resource.title}</h3>
                <p className="font-paragraph text-sm text-foreground/70 mb-3">{resource.desc}</p>
                <span className="text-primary font-medium text-sm inline-flex items-center gap-1">
                  Read guide <ChevronRight className="w-4 h-4" />
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
            Licensed by the Law Society of Ontario | Forms sourced from Tribunals Ontario
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
