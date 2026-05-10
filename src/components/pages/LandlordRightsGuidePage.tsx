import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight, Shield, Home, Clock, CheckCircle, AlertTriangle, FileText, DollarSign, Key, Users, Scale, Phone, BookOpen, ChevronDown, ChevronUp, Ban, Gavel, ClipboardList, Calendar, Search, Bell, Hammer, Building, Info, XCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

function CollapsibleSection({ title, icon: Icon, children, defaultOpen = false }: { title: string; icon: any; children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-white shadow-sm">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"><Icon className="w-5 h-5 text-primary" /></div>
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">{title}</h2>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-foreground/50" /> : <ChevronDown className="w-5 h-5 text-foreground/50" />}
      </button>
      {isOpen && <div className="px-6 pb-6 border-t border-border">{children}</div>}
    </div>
  );
}

export default function LandlordRightsGuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Complete Ontario Landlord Guide 2026 | RTA Rights, Evictions, Rent Rules"
        description="The most comprehensive Ontario landlord guide. Covers your rights under the RTA, eviction notices (N4-N13), LTB applications, rent increases, standard lease, tenant screening, and more. Free resource from a licensed paralegal."
        canonical="https://www.legalassist.london/guides/ontario-landlord-rights"
      />
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <BookOpen className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Free Comprehensive Guide</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              The Complete Ontario Landlord Guide
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-4 max-w-3xl">
              Everything you need to know about your rights and obligations under the Residential Tenancies Act, 2006. Written by a licensed paralegal who represents landlords at the Landlord and Tenant Board every week.
            </p>
            <p className="font-paragraph text-sm text-foreground/50 mb-8">Last updated: April 2026 &bull; Covers 2026 rent guideline (2.1%)</p>
            <div className="flex flex-wrap gap-3">
              <a href="#quick-reference" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors">
                Jump to Quick Reference <ArrowRight className="w-4 h-4" />
              </a>
              <Link to="/contact" className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-lg font-paragraph font-semibold hover:bg-primary/5 transition-colors">
                <Phone className="w-4 h-4" /> Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 bg-white border-b border-border">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">What This Guide Covers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl">
            {[
              { num: '1', label: 'Your Rights as a Landlord', anchor: '#rights' },
              { num: '2', label: 'The Standard Lease', anchor: '#standard-lease' },
              { num: '3', label: 'Tenant Screening', anchor: '#screening' },
              { num: '4', label: 'Rent Rules & Increases', anchor: '#rent' },
              { num: '5', label: 'Entry & Access Rights', anchor: '#entry' },
              { num: '6', label: 'Eviction Notices (N-Forms)', anchor: '#notices' },
              { num: '7', label: 'LTB Applications (L-Forms)', anchor: '#applications' },
              { num: '8', label: 'The LTB Hearing Process', anchor: '#hearings' },
              { num: '9', label: 'Maintenance & Repairs', anchor: '#maintenance' },
              { num: '10', label: 'What Landlords CANNOT Do', anchor: '#prohibited' },
              { num: '11', label: 'Common Landlord Mistakes', anchor: '#mistakes' },
              { num: '12', label: 'Quick Reference Tables', anchor: '#quick-reference' },
            ].map((item) => (
              <a key={item.num} href={item.anchor} className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors group">
                <span className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold group-hover:bg-primary group-hover:text-white transition-colors">{item.num}</span>
                <span className="font-paragraph text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Guide Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto space-y-6">

            {/* 1. Your Rights */}
            <div id="rights">
              <CollapsibleSection title="1. Your Rights as a Landlord" icon={Shield} defaultOpen={true}>
                <p className="font-paragraph text-foreground/70 mt-4 mb-6">The Residential Tenancies Act, 2006 (RTA) governs most residential tenancies in Ontario. While it is often perceived as tenant-friendly, landlords have substantial rights when they follow the proper process.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { icon: DollarSign, title: 'Collect Rent on Time', desc: 'You are entitled to receive rent in full, on the date specified in the lease. If rent is even one day late, you can serve an N4 notice. You may also collect a last month\'s rent (LMR) deposit at the start of the tenancy.' },
                    { icon: Key, title: 'Access Your Property', desc: 'You can enter the unit with 24 hours\' written notice for inspections, repairs, showing to prospective tenants or buyers, or if a real estate agent needs entry. In an emergency, no notice is required.' },
                    { icon: Users, title: 'Screen & Select Tenants', desc: 'You may request credit checks, employment verification, references, and income information. You must comply with the Ontario Human Rights Code—you cannot discriminate based on race, family status, disability, gender, age, receipt of public assistance, etc.' },
                    { icon: Shield, title: 'Evict for Legal Reasons', desc: 'You can apply to evict for non-payment of rent, persistent late payment, damage, interference with others\' reasonable enjoyment, illegal activity, personal use, major renovations, or demolition/conversion.' },
                    { icon: Home, title: 'Set Reasonable Rules', desc: 'You can include rules about smoking, guests, noise levels, and common area use—provided they do not conflict with the RTA or the Human Rights Code. You cannot restrict pets through lease terms (RTA s. 14).' },
                    { icon: Scale, title: 'Apply for Above-Guideline Increases', desc: 'If your costs for municipal taxes, utilities, or capital expenditures have risen significantly, you can apply to the LTB for a rent increase above the annual guideline.' },
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-50 p-5 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <item.icon className="w-5 h-5 text-primary" />
                        <h3 className="font-heading text-base font-bold text-foreground">{item.title}</h3>
                      </div>
                      <p className="font-paragraph text-sm text-foreground/70">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <p className="font-paragraph text-sm text-blue-900"><strong>Important:</strong> Rent control exemptions exist. Units first occupied for residential purposes after November 15, 2018 are not subject to the annual rent increase guideline. You can increase rent by any amount with proper 90-day notice (N1 or N2 form).</p>
                </div>
              </CollapsibleSection>
            </div>

            {/* 2. Standard Lease */}
            <div id="standard-lease">
              <CollapsibleSection title="2. The Ontario Standard Lease" icon={FileText}>
                <p className="font-paragraph text-foreground/70 mt-4 mb-6">Since April 30, 2018, most landlords must use Ontario&apos;s Standard Lease for new tenancies. This is a legal requirement, not optional.</p>

                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Who Must Use It</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Required For:</h4>
                    <ul className="text-green-900 text-sm space-y-1">
                      <li>&bull; Houses, apartments, condos</li>
                      <li>&bull; Secondary suites / basement apartments</li>
                      <li>&bull; Single rooms with shared kitchen/bath</li>
                      <li>&bull; Most new tenancies after April 30, 2018</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Exempt:</h4>
                    <ul className="text-yellow-900 text-sm space-y-1">
                      <li>&bull; Care homes, community housing</li>
                      <li>&bull; Commercial tenancies</li>
                      <li>&bull; Seasonal/temporary accommodation</li>
                      <li>&bull; Farm tenancies</li>
                    </ul>
                  </div>
                </div>

                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Key Rules</h3>
                <div className="space-y-3 mb-6">
                  {[
                    'If a tenant asks for the Standard Lease and you don\'t provide it within 21 days, the tenant can withhold one month\'s rent.',
                    'Any lease term that contradicts the RTA is automatically void—even if both parties signed it.',
                    'You cannot charge damage deposits, pet deposits, or key deposits exceeding the direct replacement cost.',
                    'Illegal clauses (e.g., "no pets", "no guests overnight") are unenforceable, but having them in the lease does not void the entire agreement.',
                    'You can add additional terms in the standard lease, but they cannot conflict with the RTA.',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                      <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="font-paragraph text-sm text-foreground/70">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <p className="font-paragraph text-sm text-foreground/70"><strong>Tip:</strong> Download the latest Standard Lease from <strong>ontario.ca/standardlease</strong>. Using an outdated version or a custom lease instead can create enforceability problems later.</p>
                </div>
              </CollapsibleSection>
            </div>

            {/* 3. Tenant Screening */}
            <div id="screening">
              <CollapsibleSection title="3. Tenant Screening" icon={Search}>
                <p className="font-paragraph text-foreground/70 mt-4 mb-6">Proper screening is the single best way to avoid LTB proceedings. Here is what you can and cannot do under Ontario law.</p>

                <h3 className="font-heading text-lg font-bold text-foreground mb-3">What You CAN Request</h3>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse bg-white rounded-lg overflow-hidden text-sm">
                    <thead>
                      <tr className="bg-primary text-white">
                        <th className="px-4 py-3 text-left font-heading">Information</th>
                        <th className="px-4 py-3 text-left font-heading">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr><td className="px-4 py-3 font-medium">Credit Report</td><td className="px-4 py-3 text-foreground/70">With written consent. You can use Equifax, TransUnion, or services like Naborly/SingleKey.</td></tr>
                      <tr><td className="px-4 py-3 font-medium">Employment Verification</td><td className="px-4 py-3 text-foreground/70">Employer name, position, length of employment. You may ask for pay stubs or an employment letter.</td></tr>
                      <tr><td className="px-4 py-3 font-medium">Income Information</td><td className="px-4 py-3 text-foreground/70">You can ask about income to assess ability to pay. However, you cannot refuse someone solely because they receive social assistance (ODSP/OW).</td></tr>
                      <tr><td className="px-4 py-3 font-medium">Previous Landlord References</td><td className="px-4 py-3 text-foreground/70">Contact information for previous landlords. Ask about rent payment history, property condition, and notice compliance.</td></tr>
                      <tr><td className="px-4 py-3 font-medium">Photo ID</td><td className="px-4 py-3 text-foreground/70">To confirm identity. Do not photocopy or retain copies of government ID.</td></tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="font-heading text-lg font-bold text-foreground mb-3">What You CANNOT Do</h3>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <ul className="text-red-900 text-sm space-y-2">
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> Refuse a tenant because they have children or are pregnant (family status)</li>
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> Refuse because they receive ODSP, Ontario Works, or other public assistance</li>
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> Ask about race, religion, gender identity, sexual orientation, disability, citizenship, or ethnic origin</li>
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> Charge a non-refundable application fee (RTA does not permit this)</li>
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> Require post-dated cheques (you can ask, but cannot require as a condition of tenancy)</li>
                  </ul>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <p className="font-paragraph text-sm text-blue-900"><strong>Human Rights Tip:</strong> Refusal based on source of income (including social assistance) is discrimination under the Ontario Human Rights Code. Even if your rental is above OW/ODSP rates, you cannot categorically refuse applicants on public assistance if they can demonstrate ability to pay (e.g., roommate contribution, family support).</p>
                </div>
              </CollapsibleSection>
            </div>

            {/* 4. Rent Rules */}
            <div id="rent">
              <CollapsibleSection title="4. Rent Rules & Increases" icon={DollarSign}>
                <p className="font-paragraph text-foreground/70 mt-4 mb-6">Ontario has strict rules about how and when rent can be increased. Getting this wrong can result in a tenant filing a T1 application for illegal rent recovery.</p>

                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6 text-center">
                  <p className="font-paragraph text-sm text-primary font-medium mb-1">2026 Rent Increase Guideline</p>
                  <p className="font-heading text-5xl font-bold text-primary mb-2">2.1%</p>
                  <p className="font-paragraph text-sm text-foreground/50">Down from 2.5% in 2024 and 2025 &bull; Based on Ontario CPI</p>
                </div>

                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Rules for Rent Increases</h3>
                <div className="space-y-3 mb-6">
                  {[
                    { rule: '12-Month Rule', detail: 'At least 12 months must pass since the last increase or since the tenant first moved in.' },
                    { rule: '90-Day Notice', detail: 'You must give the tenant at least 90 days\' written notice using form N1 (annual increase) or N2 (above-guideline increase approved by LTB).' },
                    { rule: 'Guideline Cap', detail: 'For rent-controlled units, you cannot exceed the annual guideline (2.1% for 2026) without LTB approval.' },
                    { rule: 'Post-2018 Exemption', detail: 'Units first occupied for residential purposes after November 15, 2018 are NOT rent controlled. You can raise rent by any amount with 90 days\' notice.' },
                    { rule: 'No Retroactive Increases', detail: 'An increase is only effective on the date stated in the notice. You cannot collect higher rent for months before the notice takes effect.' },
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-paragraph text-sm"><strong className="text-foreground">{item.rule}:</strong> <span className="text-foreground/70">{item.detail}</span></p>
                    </div>
                  ))}
                </div>

                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Last Month&apos;s Rent (LMR) Deposit</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <ul className="text-yellow-900 text-sm space-y-2">
                    <li>&bull; You can collect LMR equal to one month&apos;s rent at the start of the tenancy</li>
                    <li>&bull; This is the ONLY deposit permitted under the RTA (no damage deposits, pet deposits, or cleaning deposits)</li>
                    <li>&bull; You must pay interest on the LMR annually at the rent increase guideline rate</li>
                    <li>&bull; LMR can only be applied to the last month of tenancy—not to unpaid rent during the tenancy</li>
                    <li>&bull; Key deposits are allowed only up to the direct cost of replacing the key</li>
                  </ul>
                </div>

                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Above-Guideline Increases (AGI)</h3>
                <p className="font-paragraph text-sm text-foreground/70 mb-3">You can apply to the LTB for an increase above the guideline if:</p>
                <div className="grid md:grid-cols-3 gap-3">
                  {[
                    { title: 'Municipal Taxes', desc: 'Property taxes increased by more than the guideline percentage.' },
                    { title: 'Capital Expenditures', desc: 'Major repairs or replacements (roof, windows, HVAC, plumbing). Spread over the useful life of the improvement.' },
                    { title: 'Utility Costs', desc: 'Costs for heat, electricity, or water (that you provide) increased significantly.' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white border border-border rounded-lg p-4">
                      <h4 className="font-heading text-sm font-bold text-foreground mb-1">{item.title}</h4>
                      <p className="font-paragraph text-xs text-foreground/70">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            </div>

            {/* 5. Entry Rights */}
            <div id="entry">
              <CollapsibleSection title="5. Entry & Access Rights" icon={Key}>
                <p className="font-paragraph text-foreground/70 mt-4 mb-6">The RTA strictly limits when and how a landlord can enter a rental unit. Violating these rules can result in a T2 application from the tenant.</p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse bg-white rounded-lg overflow-hidden text-sm">
                    <thead>
                      <tr className="bg-primary text-white">
                        <th className="px-4 py-3 text-left font-heading">Reason for Entry</th>
                        <th className="px-4 py-3 text-left font-heading">Notice Required</th>
                        <th className="px-4 py-3 text-left font-heading">Permitted Hours</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr><td className="px-4 py-3 font-medium">Emergency</td><td className="px-4 py-3 text-foreground/70">None</td><td className="px-4 py-3 text-foreground/70">Any time</td></tr>
                      <tr><td className="px-4 py-3 font-medium">Repairs / maintenance</td><td className="px-4 py-3 text-foreground/70">Written 24 hours</td><td className="px-4 py-3 text-foreground/70">8 AM – 8 PM</td></tr>
                      <tr><td className="px-4 py-3 font-medium">Show unit to prospective tenants</td><td className="px-4 py-3 text-foreground/70">Written 24 hours</td><td className="px-4 py-3 text-foreground/70">8 AM – 8 PM</td></tr>
                      <tr><td className="px-4 py-3 font-medium">Show unit to prospective buyers</td><td className="px-4 py-3 text-foreground/70">Written 24 hours</td><td className="px-4 py-3 text-foreground/70">8 AM – 8 PM</td></tr>
                      <tr><td className="px-4 py-3 font-medium">Property inspection</td><td className="px-4 py-3 text-foreground/70">Written 24 hours</td><td className="px-4 py-3 text-foreground/70">8 AM – 8 PM</td></tr>
                      <tr><td className="px-4 py-3 font-medium">Tenant consents at time of entry</td><td className="px-4 py-3 text-foreground/70">None (consent given)</td><td className="px-4 py-3 text-foreground/70">Any time</td></tr>
                      <tr><td className="px-4 py-3 font-medium">Cleaning (lease requires it)</td><td className="px-4 py-3 text-foreground/70">Written 24 hours</td><td className="px-4 py-3 text-foreground/70">8 AM – 8 PM</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                  <p className="font-paragraph text-sm text-red-900"><strong>Warning:</strong> The notice must specify the date and time window, the reason for entry, and be in writing (text or email is acceptable). Verbal notice is not valid under the RTA. Entering without proper notice can constitute harassment under section 23.</p>
                </div>
              </CollapsibleSection>
            </div>

            {/* 6. Eviction Notices */}
            <div id="notices">
              <CollapsibleSection title="6. Eviction Notices (N-Forms)" icon={Bell}>
                <p className="font-paragraph text-foreground/70 mt-4 mb-6">The RTA requires specific notice forms for different eviction grounds. Using the wrong form, incorrect dates, or improper service will cause your application to be dismissed.</p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse bg-white rounded-lg overflow-hidden text-sm">
                    <thead>
                      <tr className="bg-primary text-white">
                        <th className="px-3 py-3 text-left font-heading">Form</th>
                        <th className="px-3 py-3 text-left font-heading">Reason</th>
                        <th className="px-3 py-3 text-left font-heading">Notice Period</th>
                        <th className="px-3 py-3 text-left font-heading">Can Tenant Void?</th>
                        <th className="px-3 py-3 text-left font-heading">Compensation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="bg-red-50"><td className="px-3 py-3 font-bold text-red-700">N4</td><td className="px-3 py-3">Non-payment of rent</td><td className="px-3 py-3">14 days</td><td className="px-3 py-3">Yes — pay in full within 14 days</td><td className="px-3 py-3">None</td></tr>
                      <tr><td className="px-3 py-3 font-bold text-primary">N5</td><td className="px-3 py-3">Damage or interference with reasonable enjoyment</td><td className="px-3 py-3">20 days (1st notice)</td><td className="px-3 py-3">Yes — stop behaviour within 7 days</td><td className="px-3 py-3">None</td></tr>
                      <tr className="bg-gray-50"><td className="px-3 py-3 font-bold text-primary">N6</td><td className="px-3 py-3">Illegal act or misrepresentation of income</td><td className="px-3 py-3">10 days (illegal act) / 20 days</td><td className="px-3 py-3">No</td><td className="px-3 py-3">None</td></tr>
                      <tr><td className="px-3 py-3 font-bold text-primary">N7</td><td className="px-3 py-3">Serious safety impairment</td><td className="px-3 py-3">10 days</td><td className="px-3 py-3">No</td><td className="px-3 py-3">None</td></tr>
                      <tr className="bg-gray-50"><td className="px-3 py-3 font-bold text-primary">N8</td><td className="px-3 py-3">Persistent late payment of rent</td><td className="px-3 py-3">End of term (60 days min)</td><td className="px-3 py-3">No</td><td className="px-3 py-3">None</td></tr>
                      <tr className="bg-yellow-50"><td className="px-3 py-3 font-bold text-yellow-700">N12</td><td className="px-3 py-3">Landlord&apos;s own use / family member / caregiver</td><td className="px-3 py-3">60 days (end of term)</td><td className="px-3 py-3">No</td><td className="px-3 py-3 font-bold">1 month rent</td></tr>
                      <tr className="bg-yellow-50"><td className="px-3 py-3 font-bold text-yellow-700">N13</td><td className="px-3 py-3">Demolition, conversion, or major renovation</td><td className="px-3 py-3">120 days (end of term)</td><td className="px-3 py-3">No</td><td className="px-3 py-3 font-bold">3 months rent OR right of first refusal</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-bold text-blue-800 mb-2">Termination Date Rules</h4>
                    <ul className="text-blue-900 text-sm space-y-1">
                      <li>&bull; Must fall on the last day of a rental period (usually end of month)</li>
                      <li>&bull; Must be at least the minimum notice period after the date of service</li>
                      <li>&bull; Incorrect dates = notice is defective = LTB will dismiss your application</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-bold text-blue-800 mb-2">Service Methods</h4>
                    <ul className="text-blue-900 text-sm space-y-1">
                      <li>&bull; Hand delivery to the tenant</li>
                      <li>&bull; Placed in the tenant&apos;s mailbox or slid under the door</li>
                      <li>&bull; Sent by mail (add 5 days to notice period)</li>
                      <li>&bull; Email only if tenant has consented to electronic service</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                  <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Bad Faith N12 Penalties</h4>
                  <p className="font-paragraph text-sm text-red-900">If you serve an N12 claiming personal use but don&apos;t actually move in (or relist the unit), the former tenant can file a T5 application. Penalties include up to 12 months&apos; rent in compensation plus the difference between old and new rent. Bad faith evictions are taken very seriously by the LTB.</p>
                </div>
              </CollapsibleSection>
            </div>

            {/* 7. LTB Applications */}
            <div id="applications">
              <CollapsibleSection title="7. LTB Applications (L-Forms)" icon={ClipboardList}>
                <p className="font-paragraph text-foreground/70 mt-4 mb-6">After serving a notice and the notice period expires without compliance, you file an application with the Landlord and Tenant Board.</p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse bg-white rounded-lg overflow-hidden text-sm">
                    <thead>
                      <tr className="bg-primary text-white">
                        <th className="px-4 py-3 text-left font-heading">Form</th>
                        <th className="px-4 py-3 text-left font-heading">Purpose</th>
                        <th className="px-4 py-3 text-left font-heading">Filing Fee</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="bg-red-50"><td className="px-4 py-3 font-bold">L1</td><td className="px-4 py-3">Evict tenant for non-payment of rent and collect arrears</td><td className="px-4 py-3">$201.00</td></tr>
                      <tr><td className="px-4 py-3 font-bold">L2</td><td className="px-4 py-3">Evict tenant for reasons other than non-payment (N5, N6, N7, N8, N12, N13)</td><td className="px-4 py-3">$201.00</td></tr>
                      <tr className="bg-gray-50"><td className="px-4 py-3 font-bold">L3</td><td className="px-4 py-3">Evict tenant who gave notice or agreed to end tenancy but didn&apos;t move out</td><td className="px-4 py-3">$201.00</td></tr>
                      <tr><td className="px-4 py-3 font-bold">L4</td><td className="px-4 py-3">Evict tenant who failed to meet conditions of a previous order</td><td className="px-4 py-3">$201.00</td></tr>
                      <tr className="bg-gray-50"><td className="px-4 py-3 font-bold">L5</td><td className="px-4 py-3">Increase rent above the annual guideline</td><td className="px-4 py-3">$201.00 per unit affected</td></tr>
                      <tr><td className="px-4 py-3 font-bold">L9</td><td className="px-4 py-3">Collect rent arrears only (tenant already moved out)</td><td className="px-4 py-3">$201.00</td></tr>
                      <tr className="bg-gray-50"><td className="px-4 py-3 font-bold">L10</td><td className="px-4 py-3">Collect for damage, unpaid utilities, or services tenant didn&apos;t pay</td><td className="px-4 py-3">$201.00</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg mb-4">
                  <p className="font-paragraph text-sm text-yellow-900"><strong>Filing Tip:</strong> LTB applications are filed online through the Tribunals Ontario Portal. Processing times vary significantly—as of 2026, expect 3-8 months for a hearing depending on the type of application and region. L1 applications (non-payment) are generally prioritized.</p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <p className="font-paragraph text-sm text-blue-900"><strong>Pro Tip:</strong> You can file an L1 and L9 together if the tenant owes rent and you want both eviction and arrears. If the tenant pays all arrears before the hearing, the L1 may be dismissed but the arrears are recovered—which is often the goal.</p>
                </div>
              </CollapsibleSection>
            </div>

            {/* 8. LTB Hearing Process */}
            <div id="hearings">
              <CollapsibleSection title="8. The LTB Hearing Process" icon={Gavel}>
                <p className="font-paragraph text-foreground/70 mt-4 mb-6">LTB hearings are conducted by an adjudicator (not a judge). Most hearings are now held by video conference (Zoom). Here is what to expect.</p>

                <div className="space-y-4 mb-6">
                  {[
                    { step: '1', title: 'Notice of Hearing', desc: 'You will receive a hearing date by email. Review all documents, prepare your evidence, and organize your case. You can file additional evidence up to 7 days before the hearing through the Tribunals Ontario Portal.' },
                    { step: '2', title: 'Duty Counsel / Mediation', desc: 'Before your hearing, you may be offered mediation. If both parties agree, a mediator helps negotiate a settlement (e.g., payment plan). Mediated agreements become enforceable orders. Many cases settle here.' },
                    { step: '3', title: 'The Hearing', desc: 'The adjudicator will ask the applicant (you) to present first. State the facts clearly. Present your evidence: lease, notices served (with proof of service), rent ledger, photos, communications. The tenant can cross-examine and present their case.' },
                    { step: '4', title: 'The Decision', desc: 'The adjudicator may decide on the spot or reserve the decision (issued within days/weeks). If you win, the order specifies a termination date. If the tenant doesn\'t leave by that date, you proceed to enforcement.' },
                    { step: '5', title: 'Enforcement', desc: 'File the eviction order with the Court Enforcement Office (Sheriff). The Sheriff schedules an enforcement date and physically removes the tenant if they have not vacated. You cannot change locks or remove belongings yourself—only the Sheriff can enforce.' },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4 bg-white border border-border rounded-lg p-5">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-lg">{item.step}</div>
                      <div>
                        <h4 className="font-heading text-base font-bold text-foreground mb-1">{item.title}</h4>
                        <p className="font-paragraph text-sm text-foreground/70">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Evidence Checklist for Landlords</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    'Signed lease agreement',
                    'Rent ledger showing payment history',
                    'Copy of the notice served (N4, N5, etc.)',
                    'Proof of service (photo, witness, delivery confirmation)',
                    'Photographs of damage (if applicable)',
                    'Written communications (texts, emails, letters)',
                    'Repair receipts and invoices',
                    'Police reports (if applicable)',
                    'Witness contact information',
                    'Compensation payment proof (for N12/N13)',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="font-paragraph text-sm text-foreground/70">{item}</span>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            </div>

            {/* 9. Maintenance & Repairs */}
            <div id="maintenance">
              <CollapsibleSection title="9. Maintenance & Repairs" icon={Hammer}>
                <p className="font-paragraph text-foreground/70 mt-4 mb-6">Under section 20 of the RTA, landlords must maintain the rental unit and the residential complex in a good state of repair, fit for habitation, and in compliance with health, safety, housing, and maintenance standards.</p>

                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Landlord&apos;s Obligations</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {[
                    { title: 'Structural Integrity', desc: 'Roof, foundation, walls, windows, and doors must be in good repair and weatherproof.' },
                    { title: 'Plumbing & Electrical', desc: 'All plumbing, electrical, heating, and ventilation systems must be maintained and functional.' },
                    { title: 'Appliances', desc: 'If provided with the unit (fridge, stove, washer/dryer), you must repair or replace them when they break down.' },
                    { title: 'Common Areas', desc: 'Hallways, parking lots, laundry rooms, and shared spaces must be clean, lit, and safe.' },
                    { title: 'Pest Control', desc: 'Landlords are generally responsible for pest control (cockroaches, bed bugs, mice) even if the tenant may have introduced them.' },
                    { title: 'Municipal Standards', desc: 'You must meet all local property standards bylaws (each Ontario municipality has its own; check your city/town\u2019s by-laws).' },
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-heading text-sm font-bold text-foreground mb-1">{item.title}</h4>
                      <p className="font-paragraph text-xs text-foreground/70">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <h3 className="font-heading text-lg font-bold text-foreground mb-3">When Tenants Are Responsible</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <ul className="text-yellow-900 text-sm space-y-2">
                    <li>&bull; <strong>Wilful or negligent damage</strong> — Tenant must repair or compensate for damage they caused beyond normal wear and tear</li>
                    <li>&bull; <strong>Cleanliness</strong> — Tenant must maintain ordinary cleanliness in the unit</li>
                    <li>&bull; <strong>Reporting</strong> — Tenant must promptly report maintenance issues; failure to report that results in greater damage may shift liability</li>
                  </ul>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                  <p className="font-paragraph text-sm text-red-900"><strong>Warning:</strong> If you fail to make repairs, the tenant can file a T6 application. The LTB can order you to complete the repairs AND reduce the tenant&apos;s rent retroactively. In serious cases, they can also order compensation. Do not withhold repairs because the tenant owes rent—maintenance obligations exist regardless.</p>
                </div>
              </CollapsibleSection>
            </div>

            {/* 10. What Landlords CANNOT Do */}
            <div id="prohibited">
              <CollapsibleSection title="10. What Landlords CANNOT Do" icon={Ban}>
                <p className="font-paragraph text-foreground/70 mt-4 mb-6">These actions are illegal under the RTA and can result in substantial penalties, including fines up to $50,000 for an individual and $250,000 for a corporation.</p>

                <div className="space-y-3 mb-6">
                  {[
                    { action: 'Change Locks / Lock Out Tenant', penalty: 'Illegal lockout — tenant can file T2. LTB can order compensation and fine you. This is one of the most aggressively enforced provisions.', severity: 'critical' },
                    { action: 'Shut Off Utilities or Remove Doors/Windows', penalty: 'Constitutes harassment and interference. Can result in emergency orders, compensation, and municipal charges.', severity: 'critical' },
                    { action: 'Remove Tenant Belongings', penalty: 'Even after eviction, you must store tenant belongings for a minimum of 48 hours (72 hours if overholding). You can charge reasonable storage costs.', severity: 'critical' },
                    { action: 'Enter Without Proper Notice', penalty: 'Tenant can file T2 for harassment or interference. Must give written 24-hour notice (except emergencies).', severity: 'high' },
                    { action: 'Charge Damage or Pet Deposits', penalty: 'Only last month\'s rent deposit is permitted. Tenant can file T1 to recover any illegal charges.', severity: 'high' },
                    { action: 'Raise Rent Above Guideline Without LTB Approval', penalty: 'Tenant can file T1 for illegal rent increase. LTB will order you to repay excess collected plus potentially a fine.', severity: 'high' },
                    { action: 'Self-Evict (Physically Remove Tenant)', penalty: 'Only the Sheriff can enforce an eviction order. Self-help eviction is illegal and can result in criminal charges.', severity: 'critical' },
                    { action: 'Harass or Intimidate Tenant to Leave', penalty: 'Section 23 of the RTA prohibits harassment, coercion, threats, or interference. Heavy penalties apply.', severity: 'high' },
                    { action: 'Restrict Pets Through Lease Terms', penalty: 'No-pet clauses are void under RTA s.14. You can only evict for a pet if it causes allergic reaction, damage, noise, or safety issues (N5 notice).', severity: 'medium' },
                    { action: 'Refuse Guests or Overnight Visitors', penalty: 'Tenants have the right to have guests. You cannot restrict who visits or stays overnight.', severity: 'medium' },
                    { action: 'Discriminate in Tenant Selection', penalty: 'Ontario Human Rights Code violations can result in HRTO complaints with substantial damages ($10,000-$50,000+).', severity: 'high' },
                  ].map((item, i) => (
                    <div key={i} className={`p-4 rounded-lg border-l-4 ${item.severity === 'critical' ? 'border-red-500 bg-red-50' : item.severity === 'high' ? 'border-orange-400 bg-orange-50' : 'border-yellow-400 bg-yellow-50'}`}>
                      <h4 className={`font-heading text-sm font-bold mb-1 ${item.severity === 'critical' ? 'text-red-800' : item.severity === 'high' ? 'text-orange-800' : 'text-yellow-800'}`}>{item.action}</h4>
                      <p className={`font-paragraph text-xs ${item.severity === 'critical' ? 'text-red-900' : item.severity === 'high' ? 'text-orange-900' : 'text-yellow-900'}`}>{item.penalty}</p>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            </div>

            {/* 11. Common Mistakes */}
            <div id="mistakes">
              <CollapsibleSection title="11. Common Landlord Mistakes" icon={AlertTriangle}>
                <p className="font-paragraph text-foreground/70 mt-4 mb-6">After representing landlords at hundreds of LTB hearings, these are the most common mistakes that cost landlords time and money.</p>

                <div className="space-y-4">
                  {[
                    { mistake: 'Wrong Termination Date on Notice', fix: 'The date must fall on the last day of the rental period and meet the minimum notice requirement. One day off = notice is defective = case dismissed. Use an LTB termination date calculator or consult a paralegal.' },
                    { mistake: 'Not Keeping a Rent Ledger', fix: 'The LTB expects a detailed rent ledger showing every payment, amount, date received, and method. Saying "they owe me 3 months" without documentation is insufficient.' },
                    { mistake: 'Accepting Partial Rent After Serving N4', fix: 'If you accept partial payment after serving an N4, the notice may be voided. Either accept full payment (voiding the notice) or do not accept any payment until the hearing.' },
                    { mistake: 'Verbal Agreements to End Tenancy', fix: 'A tenant saying "I\'ll be out by the end of the month" is not binding. Get it in writing using form N11 (Agreement to End Tenancy). Otherwise, you have no recourse if they change their mind.' },
                    { mistake: 'Not Paying N12 Compensation', fix: 'Before filing an L2 based on an N12, you MUST pay the tenant one month\'s rent in compensation (or offer to waive the last month\'s rent). Failure to pay = application dismissed.' },
                    { mistake: 'Trying to Evict Without Proper Process', fix: 'Changing locks, texting "you have 24 hours to leave", or moving belongings out are all illegal. Every eviction must go through: Notice → LTB Application → Hearing → Order → Sheriff.' },
                    { mistake: 'Not Documenting Everything', fix: 'Texts, photos, videos, repair invoices, noise logs with dates/times—document everything. The LTB weighs evidence heavily. "He said / she said" without documentation usually loses.' },
                    { mistake: 'Waiting Too Long to Act', fix: 'Serve the N4 the day after rent is due. File the L1 the day after the notice period expires. The LTB process already takes months—every day of delay costs you money.' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white border border-border rounded-lg overflow-hidden">
                      <div className="bg-red-50 px-5 py-3">
                        <h4 className="font-heading text-sm font-bold text-red-800 flex items-center gap-2"><XCircle className="w-4 h-4" /> Mistake: {item.mistake}</h4>
                      </div>
                      <div className="bg-green-50 px-5 py-3">
                        <p className="font-paragraph text-sm text-green-900 flex items-start gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> <span>{item.fix}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            </div>

            {/* 12. Quick Reference Tables */}
            <div id="quick-reference">
              <CollapsibleSection title="12. Quick Reference Tables" icon={ClipboardList} defaultOpen={true}>

                <h3 className="font-heading text-lg font-bold text-foreground mb-3 mt-4">Notice Form Quick Reference</h3>
                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse bg-white rounded-lg overflow-hidden text-sm">
                    <thead>
                      <tr className="bg-primary text-white">
                        <th className="px-3 py-3 text-left font-heading">Form</th>
                        <th className="px-3 py-3 text-left font-heading">Reason</th>
                        <th className="px-3 py-3 text-left font-heading">Notice</th>
                        <th className="px-3 py-3 text-left font-heading">Voidable?</th>
                        <th className="px-3 py-3 text-left font-heading">Application</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-xs">
                      <tr><td className="px-3 py-2 font-bold">N4</td><td className="px-3 py-2">Non-payment</td><td className="px-3 py-2">14 days</td><td className="px-3 py-2">Yes (pay in full)</td><td className="px-3 py-2">L1</td></tr>
                      <tr className="bg-gray-50"><td className="px-3 py-2 font-bold">N5 (1st)</td><td className="px-3 py-2">Damage / interference</td><td className="px-3 py-2">20 days</td><td className="px-3 py-2">Yes (7 days to correct)</td><td className="px-3 py-2">L2</td></tr>
                      <tr><td className="px-3 py-2 font-bold">N5 (2nd)</td><td className="px-3 py-2">Repeat damage / interference</td><td className="px-3 py-2">14 days</td><td className="px-3 py-2">No</td><td className="px-3 py-2">L2</td></tr>
                      <tr className="bg-gray-50"><td className="px-3 py-2 font-bold">N6</td><td className="px-3 py-2">Illegal act</td><td className="px-3 py-2">10 days</td><td className="px-3 py-2">No</td><td className="px-3 py-2">L2</td></tr>
                      <tr><td className="px-3 py-2 font-bold">N7</td><td className="px-3 py-2">Safety impairment</td><td className="px-3 py-2">10 days</td><td className="px-3 py-2">No</td><td className="px-3 py-2">L2</td></tr>
                      <tr className="bg-gray-50"><td className="px-3 py-2 font-bold">N8</td><td className="px-3 py-2">Persistent late payment</td><td className="px-3 py-2">End of term</td><td className="px-3 py-2">No</td><td className="px-3 py-2">L2</td></tr>
                      <tr><td className="px-3 py-2 font-bold">N12</td><td className="px-3 py-2">Personal use</td><td className="px-3 py-2">60 days (end of term)</td><td className="px-3 py-2">No</td><td className="px-3 py-2">L2</td></tr>
                      <tr className="bg-gray-50"><td className="px-3 py-2 font-bold">N13</td><td className="px-3 py-2">Demolition / renovation</td><td className="px-3 py-2">120 days (end of term)</td><td className="px-3 py-2">No</td><td className="px-3 py-2">L2</td></tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Key Deadlines & Timelines</h3>
                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse bg-white rounded-lg overflow-hidden text-sm">
                    <thead>
                      <tr className="bg-primary text-white">
                        <th className="px-4 py-3 text-left font-heading">Action</th>
                        <th className="px-4 py-3 text-left font-heading">Deadline</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr><td className="px-4 py-3 font-medium">Serve N4 after missed rent</td><td className="px-4 py-3 text-foreground/70">Day after rent was due</td></tr>
                      <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">File L1 after N4 expires</td><td className="px-4 py-3 text-foreground/70">Day after 14-day notice period (file immediately)</td></tr>
                      <tr><td className="px-4 py-3 font-medium">Notice for rent increase (N1)</td><td className="px-4 py-3 text-foreground/70">At least 90 days before increase date</td></tr>
                      <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">Rent increase frequency</td><td className="px-4 py-3 text-foreground/70">Once every 12 months</td></tr>
                      <tr><td className="px-4 py-3 font-medium">Entry notice to tenant</td><td className="px-4 py-3 text-foreground/70">Written 24 hours (8 AM – 8 PM only)</td></tr>
                      <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">Provide Standard Lease on request</td><td className="px-4 py-3 text-foreground/70">Within 21 days of tenant&apos;s written request</td></tr>
                      <tr><td className="px-4 py-3 font-medium">N12 compensation payment</td><td className="px-4 py-3 text-foreground/70">Before L2 application filing date</td></tr>
                      <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">Store tenant belongings after eviction</td><td className="px-4 py-3 text-foreground/70">48 hours minimum (72 hours if overholding)</td></tr>
                      <tr><td className="px-4 py-3 font-medium">Typical LTB hearing wait (2026)</td><td className="px-4 py-3 text-foreground/70">3–8 months depending on application type and region</td></tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Deposits: What&apos;s Legal vs. Illegal</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Legal Deposits</h4>
                    <ul className="text-green-900 text-sm space-y-1">
                      <li>&bull; Last month&apos;s rent (LMR) deposit</li>
                      <li>&bull; Key deposit (replacement cost only)</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2"><XCircle className="w-4 h-4" /> Illegal Deposits</h4>
                    <ul className="text-red-900 text-sm space-y-1">
                      <li>&bull; Damage deposit</li>
                      <li>&bull; Pet deposit</li>
                      <li>&bull; Cleaning deposit</li>
                      <li>&bull; Application fees</li>
                      <li>&bull; Move-in / move-out fees</li>
                    </ul>
                  </div>
                </div>
              </CollapsibleSection>
            </div>

          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-gray-50 border-t border-border">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <p className="font-paragraph text-xs text-foreground/50 text-center">
              <strong>Disclaimer:</strong> This guide is for general information purposes only and does not constitute legal advice. Laws and LTB procedures change. Every situation is unique—consult a licensed paralegal or lawyer for advice specific to your circumstances. Information is current as of April 2026.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Need Help With a Tenant Issue?</h2>
          <p className="font-paragraph text-lg mb-3 opacity-90 max-w-2xl mx-auto">
            I represent landlords at the LTB every week. Whether you need an eviction filed, a hearing attended, or advice on your options—I can help.
          </p>
          <p className="font-paragraph text-sm mb-8 opacity-75 max-w-2xl mx-auto">
            Free consultation &bull; Licensed paralegal &bull; Serving London, Southwestern Ontario & the GTA
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-gray-100 transition-colors">
              Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/services/landlord-services" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-white/10 transition-colors">
              View Landlord Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
