import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, FileText, DollarSign, AlertTriangle, Briefcase, Calculator, Home, User } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProfessionalNegligencePage() {
  useEffect(() => {
    document.title = 'Professional Negligence Claims | Accountant, Realtor, Advisor Errors | Small Claims Court Ontario';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Paralegal for professional negligence claims in Ontario Small Claims Court. Accountant, realtor, financial advisor errors caused you loss? Recover up to $35,000. London Ontario.');
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
              <Briefcase className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Small Claims Court Services</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Professional Negligence Claims
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Professional's error or negligence caused you financial loss? Accountants, realtors, financial advisors, and other professionals can be held liable in Small Claims Court.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors">
                Free Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:3658829515" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/5 transition-colors">
                Call 365-882-9515
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Professionals */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Types of Professional Negligence We Handle</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Calculator, title: 'Accountant Errors', desc: 'Tax filing mistakes, bookkeeping errors, missed deadlines, incorrect financial advice causing penalties or losses.' },
              { icon: Home, title: 'Real Estate Agent Negligence', desc: 'Failure to disclose property issues, missed deadlines, breach of fiduciary duty, negligent advice on transactions.' },
              { icon: DollarSign, title: 'Financial Advisor Errors', desc: 'Unsuitable investment recommendations, failure to diversify, unauthorized trades, misrepresentation.' },
              { icon: User, title: 'Insurance Agent/Broker', desc: 'Failure to obtain proper coverage, policy lapses, wrong advice leading to uncovered claims.' },
              { icon: Briefcase, title: 'Business Consultants', desc: 'Negligent business advice, failed implementations, breach of professional standards.' },
              { icon: FileText, title: 'Other Professionals', desc: 'Appraisers, mortgage brokers, travel agents, and other licensed professionals who failed to meet their duty of care.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <item.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="font-paragraph text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Elements of a Claim */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Proving Professional Negligence</h2>
          <div className="max-w-4xl mx-auto">
            <p className="font-paragraph text-foreground/80 text-center mb-8">To succeed in a professional negligence claim, you must prove four elements:</p>
            <div className="space-y-6">
              {[
                { num: '1', title: 'Duty of Care', desc: 'The professional owed you a duty of care. This is usually established by the professional-client relationship.' },
                { num: '2', title: 'Breach of Standard', desc: 'The professional failed to meet the standard of care expected of a competent professional in their field.' },
                { num: '3', title: 'Causation', desc: 'The professional\'s breach directly caused your loss. You must show a clear link between their error and your damages.' },
                { num: '4', title: 'Damages', desc: 'You suffered actual, quantifiable financial loss as a result of their negligence.' },
              ].map((item, index) => (
                <div key={index} className="flex gap-4 items-start bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading font-bold">
                    {item.num}
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="font-paragraph text-foreground/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Common Examples */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Common Examples of Professional Negligence</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {[
                'Accountant filed your taxes incorrectly, resulting in CRA penalties and interest',
                'Realtor failed to disclose known property defects before you purchased',
                'Financial advisor recommended high-risk investments unsuitable for your situation',
                'Insurance broker let your policy lapse without notifying you',
                'Mortgage broker gave incorrect advice, causing you to lose a property deal',
                'Appraiser significantly overvalued a property you purchased',
                'Travel agent failed to advise about visa requirements, causing trip cancellation',
                'Business consultant\'s negligent advice led to financial losses',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="font-paragraph text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Recover */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What Damages Can You Recover?</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { title: 'Direct Financial Loss', desc: 'The money you lost as a direct result of their negligence' },
                { title: 'Penalties & Interest', desc: 'CRA penalties, interest charges, or other fees caused by their error' },
                { title: 'Cost to Correct', desc: 'Expense of hiring another professional to fix the mistake' },
                { title: 'Lost Opportunity', desc: 'Provable losses from missed opportunities caused by their error' },
                { title: 'Additional Expenses', desc: 'Legal fees, accounting fees, or other costs to address the situation' },
              ].map((item, index) => (
                <div key={index} className={`p-6 ${index !== 4 ? 'border-b border-gray-100' : ''}`}>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="font-paragraph text-foreground/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Complaints */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Regulatory Complaints vs Court Claims</h2>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <p className="font-paragraph text-foreground/80 mb-6">
                Many professionals are regulated by professional bodies that handle complaints. You may have <strong>two options</strong>:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-heading font-bold text-foreground mb-2">Regulatory Complaint</h3>
                  <ul className="font-paragraph text-foreground/70 space-y-1 text-sm">
                    <li>• CPA Ontario (accountants)</li>
                    <li>• RECO (real estate agents)</li>
                    <li>• FSRA (financial advisors)</li>
                    <li>• Can discipline the professional</li>
                    <li>• Usually cannot award you money</li>
                  </ul>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="font-heading font-bold text-foreground mb-2">Court Claim</h3>
                  <ul className="font-paragraph text-foreground/70 space-y-1 text-sm">
                    <li>• Can award monetary damages</li>
                    <li>• Up to $35,000 in Small Claims</li>
                    <li>• Enforceable judgment</li>
                    <li>• May be covered by their insurance</li>
                    <li>• Can pursue both options</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Limitation Period */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-10 h-10 text-amber-600 flex-shrink-0" />
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Limitation Period for Professional Negligence</h2>
                <p className="font-paragraph text-foreground/80 mb-4">
                  In Ontario, you generally have <strong>2 years</strong> from when you knew or ought to have known about the negligence to file a claim. This is called the "discovery date."
                </p>
                <p className="font-paragraph text-foreground/80">
                  For professional negligence, the clock often starts when you discover the error — not when the error was made. However, there's also an ultimate limitation of 15 years.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Professional's Error Cost You Money?</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your case and discuss whether you have a viable claim for professional negligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-gray-100 transition-colors">
              Book Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:3658829515" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-white/10 transition-colors">
              Call 365-882-9515
            </a>
          </div>
        </div>
      </section>

      {/* LSO Badge */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <p className="font-paragraph text-sm text-foreground/60">
            <Shield className="w-4 h-4 inline mr-1" />
            Licensed by the Law Society of Ontario | Paralegal services for claims up to $35,000
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
