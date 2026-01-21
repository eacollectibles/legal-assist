import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, FileText, DollarSign, AlertTriangle, Users, Handshake, CreditCard } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact';

export default function LoanRecoveryPage() {
  useEffect(() => {
    document.title = 'Recover Money Lent to Friends or Family | Small Claims Court Ontario | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Paralegal for personal loan recovery in Ontario Small Claims Court. Friend or family member won\'t repay money you lent? Recover up to $35,000. London Ontario.');
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
              <DollarSign className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Small Claims Court Services</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Personal Loan Recovery
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Lent money to a friend, family member, or acquaintance who won't pay you back? You can pursue recovery through Small Claims Court, even without a written agreement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors">
                Free Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/5 transition-colors">
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">The Challenge with Personal Loans</h2>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <p className="font-paragraph text-foreground/80 mb-6 text-lg">
                When you lend money to someone you know, you rarely think about getting it in writing. Then when they don't pay you back, you worry you have no legal recourse.
              </p>
              <p className="font-paragraph text-foreground/80 mb-6 text-lg">
                <strong>Good news:</strong> In Ontario, you don't need a written contract to sue for money lent. Verbal agreements are legally enforceable. The challenge is <em>proving</em> the loan existed and the terms that were agreed.
              </p>
              <p className="font-paragraph text-foreground/80 text-lg">
                That's where proper evidence gathering and legal strategy matter — and where we can help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Evidence Types */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Evidence That Proves Your Loan</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-heading text-xl font-bold text-primary mb-4">Strong Evidence</h3>
                <ul className="space-y-3">
                  {[
                    'Bank transfer records showing the payment',
                    'Text messages discussing the loan',
                    'Emails acknowledging the debt',
                    'Written IOUs or promissory notes',
                    'Cheque copies or e-transfer confirmations',
                    'Voice messages about repayment',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/80">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-heading text-xl font-bold text-primary mb-4">Supporting Evidence</h3>
                <ul className="space-y-3">
                  {[
                    'Witness statements (anyone who knew about the loan)',
                    'Partial payments already made',
                    'Their admission they owe you money',
                    'Calendar entries or notes from when loan was made',
                    'Credit card or bank statements',
                    'Social media messages',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/80">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gift vs Loan */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0" />
                <div>
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Loan vs Gift: The Key Question</h2>
                  <p className="font-paragraph text-foreground/80 mb-4">
                    The borrower may claim the money was a gift, not a loan. Courts will look at factors like:
                  </p>
                  <ul className="space-y-2 mb-4">
                    {[
                      'Was there discussion of repayment?',
                      'Were any payments actually made?',
                      'What was the relationship and circumstances?',
                      'What was the amount? Large sums suggest a loan.',
                      'Any written or verbal references to "lending" or "borrowing"?',
                    ].map((item, index) => (
                      <li key={index} className="font-paragraph text-foreground/80">• {item}</li>
                    ))}
                  </ul>
                  <p className="font-paragraph text-foreground/80">
                    We can help you build evidence to prove it was a loan with expectation of repayment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Situations */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Common Personal Loan Situations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Users, title: 'Family Loans', desc: 'Parents lending to adult children, siblings, or extended family for emergencies, business, or major purchases.' },
              { icon: Handshake, title: 'Friend Loans', desc: 'Helping a friend through tough times with expectation of repayment that never comes.' },
              { icon: CreditCard, title: 'Emergency Loans', desc: 'Lending money for rent, car repairs, medical bills, or other urgent needs.' },
              { icon: DollarSign, title: 'Business Loans', desc: 'Investing in a friend\'s business venture with agreement to be repaid.' },
              { icon: AlertTriangle, title: 'Romantic Partner Loans', desc: 'Money lent during relationship that partner refuses to repay after breakup.' },
              { icon: FileText, title: 'Multiple Small Loans', desc: 'Repeated small amounts that add up over time with promises to repay "later."' },
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

      {/* Process */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">How We Help You Recover Your Money</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                { step: '1', title: 'Evidence Review', desc: 'We review all your communications, bank records, and other evidence to build the strongest case.' },
                { step: '2', title: 'Demand Letter', desc: 'Professional letter demanding repayment. Often prompts payment to avoid court.' },
                { step: '3', title: 'File Claim', desc: 'If no response, file Plaintiff\'s Claim in Small Claims Court (up to $35,000).' },
                { step: '4', title: 'Settlement Conference', desc: 'Mandatory meeting where many cases settle. We represent you and negotiate.' },
                { step: '5', title: 'Trial (if needed)', desc: 'Present evidence and testimony to prove your case before a judge.' },
                { step: '6', title: 'Enforcement', desc: 'If they still don\'t pay, pursue garnishment or seizure of assets.' },
              ].map((item, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading font-bold text-lg">
                    {item.step}
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="font-paragraph text-foreground/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Get Your Money Back</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your loan situation and discuss your options for recovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-gray-100 transition-colors">
              Book Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:5196011110" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-white/10 transition-colors">
              Call (519) 601-1110
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
