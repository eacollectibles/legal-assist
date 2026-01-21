import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, CheckCircle, X, DollarSign, FileText, Briefcase, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ParalegalVsLawyerPage() {
  useEffect(() => {
    document.title = 'Paralegal vs Lawyer | When to Use Each in Ontario | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Understand the difference between paralegals and lawyers in Ontario. Learn when you need each, cost comparison, and what paralegals can handle. Free guide.');
    }
  }, []);

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
              Paralegal vs. Lawyer: When to Use Each
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              In Ontario, licensed paralegals can handle many legal matters at a fraction of lawyer costs. This guide explains when you need each.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Quick Comparison</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-100 p-4 font-heading font-bold text-foreground">
                <div>Factor</div>
                <div className="text-center">Paralegal</div>
                <div className="text-center">Lawyer</div>
              </div>
              {[
                { factor: 'Hourly Rate', paralegal: '$75-$175/hr', lawyer: '$200-$500+/hr' },
                { factor: 'Licensing', paralegal: 'Law Society of Ontario', lawyer: 'Law Society of Ontario' },
                { factor: 'Small Claims Court', paralegal: '✓ Yes', lawyer: '✓ Yes' },
                { factor: 'Landlord Tenant Board', paralegal: '✓ Yes', lawyer: '✓ Yes' },
                { factor: 'Traffic Tickets', paralegal: '✓ Yes', lawyer: '✓ Yes' },
                { factor: 'Human Rights Tribunal', paralegal: '✓ Yes', lawyer: '✓ Yes' },
                { factor: 'Summary Criminal', paralegal: '✓ Yes (max 6 mo)', lawyer: '✓ Yes' },
                { factor: 'Serious Criminal', paralegal: '✗ No', lawyer: '✓ Yes' },
                { factor: 'Family Law', paralegal: '✗ No', lawyer: '✓ Yes' },
                { factor: 'Real Estate', paralegal: '✗ No', lawyer: '✓ Yes' },
                { factor: 'Wills & Estates', paralegal: '✗ No', lawyer: '✓ Yes' },
              ].map((row, index) => (
                <div key={index} className={`grid grid-cols-3 p-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <div className="font-paragraph font-medium text-foreground">{row.factor}</div>
                  <div className={`text-center font-paragraph ${row.paralegal.includes('✓') ? 'text-green-600' : row.paralegal.includes('✗') ? 'text-red-600' : 'text-foreground/70'}`}>
                    {row.paralegal}
                  </div>
                  <div className={`text-center font-paragraph ${row.lawyer.includes('✓') ? 'text-green-600' : 'text-foreground/70'}`}>
                    {row.lawyer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Paralegals Can Handle */}
      <section className="py-16 md:py-20 bg-green-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What Paralegals CAN Handle</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { area: 'Small Claims Court', desc: 'All civil disputes up to $35,000 - contracts, debts, property damage' },
              { area: 'Landlord & Tenant Board', desc: 'Evictions, rent disputes, maintenance issues, all LTB matters' },
              { area: 'Traffic Tickets', desc: 'Speeding, careless driving, stunt driving, all Highway Traffic Act offences' },
              { area: 'Provincial Offences', desc: 'By-law violations, regulatory offences, trespass charges' },
              { area: 'Human Rights Tribunal', desc: 'Discrimination complaints, accommodation issues, harassment' },
              { area: 'Minor Criminal Matters', desc: 'Summary conviction offences with max 6 months jail (theft under, mischief, simple assault)' },
              { area: 'Workplace Safety Appeals', desc: 'WSIB appeals and workplace safety matters' },
              { area: 'Statutory Accident Benefits', desc: 'Auto insurance disputes and SABS claims' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-sm">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.area}</h3>
                <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When You Need a Lawyer */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">When You Need a LAWYER</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { area: 'Serious Criminal Charges', desc: 'Indictable offences, anything with potential jail over 6 months' },
              { area: 'Family Law', desc: 'Divorce, custody, child support, division of property' },
              { area: 'Real Estate', desc: 'Buying/selling property, mortgages, title issues' },
              { area: 'Wills & Estates', desc: 'Drafting wills, estate administration, probate' },
              { area: 'Civil Litigation Over $35K', desc: 'Lawsuits exceeding Small Claims limit' },
              { area: 'Immigration', desc: 'Visa applications, deportation, citizenship' },
              { area: 'Corporate Law', desc: 'Business incorporation, contracts, mergers' },
              { area: 'Personal Injury', desc: 'Serious accident claims, medical malpractice' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-sm">
                <Briefcase className="w-6 h-6 text-amber-600 mb-2" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.area}</h3>
                <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Savings */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Typical Cost Savings</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <DollarSign className="w-10 h-10 text-green-600 mx-auto mb-4" />
              <p className="font-paragraph text-center text-foreground/80 mb-6">
                For matters within paralegal scope, you can typically save 50-70% compared to lawyer fees:
              </p>
              <div className="space-y-4">
                {[
                  { matter: 'Traffic Ticket Defence', paralegal: '$500-$1,500', lawyer: '$1,500-$3,500' },
                  { matter: 'Small Claims Case', paralegal: '$1,500-$4,000', lawyer: '$4,000-$10,000' },
                  { matter: 'LTB Eviction Defence', paralegal: '$1,000-$2,500', lawyer: '$3,000-$6,000' },
                  { matter: 'HRTO Application', paralegal: '$2,000-$5,000', lawyer: '$5,000-$15,000' },
                ].map((item, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="font-paragraph font-medium text-foreground">{item.matter}</div>
                    <div className="text-center font-paragraph text-green-600">{item.paralegal}</div>
                    <div className="text-center font-paragraph text-foreground/60">{item.lawyer}</div>
                  </div>
                ))}
              </div>
              <p className="font-paragraph text-center text-foreground/60 text-sm mt-4">
                *Estimates only. Actual costs vary by complexity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Not Sure What You Need?</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to discuss your matter. If you need a lawyer, we'll tell you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-gray-100 transition-colors">
              Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/services" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-white/10 transition-colors">
              Our Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
