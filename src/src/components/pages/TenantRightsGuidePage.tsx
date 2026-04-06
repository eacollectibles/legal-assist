import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Home, Clock, CheckCircle, AlertTriangle, FileText, DollarSign, Wrench, Ban } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TenantRightsGuidePage() {
  // SEO handled by AutoSEO component

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <FileText className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Free Guide</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Ontario Tenant Rights Guide
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Know your rights as a tenant in Ontario. This guide covers the Residential Tenancies Act, your protections, and what to do when problems arise.
            </p>
          </div>
        </div>
      </section>

      {/* Key Rights */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Your Fundamental Rights</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { icon: Home, title: 'Security of Tenure', desc: 'You cannot be evicted without proper legal process through the LTB. Your landlord cannot just tell you to leave.' },
              { icon: DollarSign, title: 'Rent Control', desc: 'Most units are subject to rent increase guidelines. In 2024, the maximum increase is 2.5%. Landlords cannot increase rent more than once per year.' },
              { icon: Wrench, title: 'Right to Repairs', desc: 'Your landlord must maintain the property in good repair and comply with health and safety standards.' },
              { icon: Shield, title: 'Privacy', desc: 'Your landlord must give 24 hours written notice before entering, and can only enter for specific reasons.' },
              { icon: Ban, title: 'No Illegal Fees', desc: 'Landlords cannot charge key deposits, require post-dated cheques, or collect security deposits (only last month\'s rent).' },
              { icon: CheckCircle, title: 'Right to Have Guests', desc: 'You can have guests and overnight visitors. Your landlord cannot restrict this.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eviction Protection */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Eviction Protection</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                Your landlord can only evict you for specific reasons allowed by law:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-3">Valid Reasons for Eviction</h3>
                  <ul className="space-y-2">
                    {[
                      'Non-payment of rent (N4 notice)',
                      'Landlord\'s own use (N12 notice)',
                      'Major renovations requiring vacancy',
                      'Persistent late payment',
                      'Illegal activity',
                      'Causing serious damage',
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/70 text-sm">
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-3">NOT Valid Reasons</h3>
                  <ul className="space-y-2">
                    {[
                      'Wanting to raise rent above guidelines',
                      'The lease ending',
                      'Having guests or pets',
                      'Complaining about repairs',
                      'Filing complaints against landlord',
                      'Personal dislike',
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/70 text-sm">
                        <Ban className="w-4 h-4 text-red-600 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg mt-6">
                <p className="font-paragraph text-green-800">
                  <strong>Important:</strong> Even with a valid reason, your landlord must apply to the LTB and get an order. They cannot just change the locks or force you out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rent Increases */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Rent Increase Rules</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { rule: '90 Days Notice', desc: 'Landlord must give written notice at least 90 days before the increase takes effect.' },
                { rule: 'Once Per Year', desc: 'Rent can only be increased once every 12 months.' },
                { rule: 'Guideline Amount', desc: 'For most units, increases are capped at the annual guideline (2.5% in 2024).' },
                { rule: 'Proper Form Required', desc: 'Notice must be on the official N1 or N2 form.' },
                { rule: 'New Buildings Exempt', desc: 'Units first occupied after Nov 15, 2018 are NOT subject to rent control.' },
              ].map((item, index) => (
                <div key={index} className={`p-5 flex items-start gap-4 ${index !== 4 ? 'border-b border-gray-100' : ''}`}>
                  <DollarSign className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">{item.rule}</h3>
                    <p className="font-paragraph text-foreground/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Repairs */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Getting Repairs Done</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">Steps to Take</h3>
                <ol className="space-y-3">
                  {[
                    'Request repairs in writing (email or letter)',
                    'Keep copies of all communications',
                    'Take photos of the problem',
                    'Give reasonable time to respond (usually 7-14 days)',
                    'Follow up in writing if not fixed',
                    'File a T6 application at the LTB if still not resolved',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 font-paragraph text-foreground/80">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">{index + 1}</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">What You Can Get</h3>
                <ul className="space-y-2">
                  {[
                    'Order for landlord to do repairs',
                    'Rent abatement (reduction) for time without proper conditions',
                    'Reimbursement for expenses you paid',
                    'Authorization to do repairs yourself and deduct from rent',
                    'Compensation for damaged belongings',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/80">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Need Help With a Housing Issue?</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to discuss your situation and options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-gray-100 transition-colors">
              Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/services/landlord-tenant" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-white/10 transition-colors">
              LTB Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
