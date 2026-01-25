import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, AlertTriangle, Briefcase, DollarSign, Calculator, FileText } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SeverancePayPage() {
  useEffect(() => {
    document.title = 'Severance Pay Ontario | Termination Pay Calculator | Employment Paralegal | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Understand severance pay in Ontario. Calculate your entitlement, know the difference between termination pay and severance pay. Paralegal help London. Free consultation.');
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
              <span className="font-paragraph text-sm font-medium">Employment Law</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Severance Pay in Ontario
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Is your employer offering you fair severance? Many terminated employees accept less than they're entitled to. We help you understand and negotiate proper compensation.
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

      {/* Termination vs Severance */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Termination Pay vs. Severance Pay</h2>
          <div className="max-w-4xl mx-auto">
            <p className="font-paragraph text-foreground/80 mb-8 text-center">
              These are two different things under Ontario's Employment Standards Act:
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-amber-500">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">Termination Pay</h3>
                <p className="font-paragraph text-foreground/70 mb-4">
                  Pay in lieu of notice. Everyone is entitled to this (with some exceptions).
                </p>
                <ul className="space-y-2 text-sm">
                  {[
                    'Based on length of service',
                    'Maximum 8 weeks under ESA',
                    'Can be given as working notice instead',
                    'Required for all employees 3+ months',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/80">
                      <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-primary">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">Severance Pay</h3>
                <p className="font-paragraph text-foreground/70 mb-4">
                  Additional compensation. Not everyone qualifies.
                </p>
                <ul className="space-y-2 text-sm">
                  {[
                    'Requires 5+ years of service',
                    'Employer payroll must be $2.5M+ OR',
                    '50+ employees severed in 6 months',
                    'Maximum 26 weeks under ESA',
                    'IN ADDITION to termination pay',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/80">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Severance Calculator */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">ESA Severance Pay Calculation</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="w-8 h-8 text-primary" />
                <h3 className="font-heading text-xl font-bold text-foreground">The Formula</h3>
              </div>
              <div className="bg-primary/5 p-6 rounded-lg mb-6">
                <p className="font-heading text-2xl text-center text-primary font-bold">
                  1 week's pay × years of service = Severance Pay
                </p>
                <p className="font-paragraph text-center text-foreground/70 mt-2">
                  (Maximum 26 weeks)
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-heading font-bold text-foreground">Example:</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-paragraph text-foreground/80">
                    Employee worked 10 years, earning $1,000/week:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li className="font-paragraph text-foreground/70">• Termination Pay: 8 weeks × $1,000 = <strong>$8,000</strong></li>
                    <li className="font-paragraph text-foreground/70">• Severance Pay: 10 weeks × $1,000 = <strong>$10,000</strong></li>
                    <li className="font-paragraph text-primary font-bold">• ESA Total: $18,000</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg mt-6">
              <p className="font-paragraph text-amber-800 text-center">
                <strong>Remember:</strong> This is just the ESA minimum. Common law entitlements are often much higher!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Qualifies */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Do You Qualify for Severance Pay?</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">You qualify if ALL of these are true:</h3>
              <ul className="space-y-3 mb-6">
                {[
                  'You worked for the employer for 5+ years',
                  'Your employer\'s Ontario payroll is $2.5 million or more (OR 50+ employees severed in 6 months)',
                  'Your employment was severed (terminated, laid off 35+ weeks, constructive dismissal)',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 font-paragraph text-foreground/80">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">You DON'T qualify if:</h3>
              <ul className="space-y-3">
                {[
                  'You were fired for "wilful misconduct" (rare and hard to prove)',
                  'You refused a reasonable alternative job',
                  'You\'re in certain exempt industries (construction)',
                  'You quit voluntarily',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 font-paragraph text-foreground/80">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Common Severance Issues We Handle</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { title: 'Offered ESA Minimum Only', desc: 'Employers often offer only the legal minimum, hoping you\'ll accept without negotiating.' },
              { title: 'Pressured to Sign Quickly', desc: '"Sign by Friday or lose the offer" is a tactic. You have the right to review and negotiate.' },
              { title: 'Unclear What You\'re Owed', desc: 'The calculations can be confusing. We help you understand your full entitlements.' },
              { title: 'Benefits Not Continued', desc: 'Employers should continue benefits during the notice period. Many don\'t.' },
              { title: 'Vacation Pay Missing', desc: 'Accrued vacation must be paid out. It\'s often forgotten or miscalculated.' },
              { title: 'Threatening "For Cause"', desc: 'Employers sometimes claim cause when there is none, to avoid paying severance.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Do */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <FileText className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">What To Do If You're Terminated</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <ol className="space-y-4">
                {[
                  { step: '1', action: 'Don\'t sign anything immediately', detail: 'You can ask for time to review. Any pressure to sign quickly is a red flag.' },
                  { step: '2', action: 'Request everything in writing', detail: 'Get the offer, reason for termination, and all details in writing.' },
                  { step: '3', action: 'Gather your documents', detail: 'Employment contract, pay stubs, offer letter, performance reviews.' },
                  { step: '4', action: 'Get professional advice', detail: 'Before accepting or rejecting, understand what you\'re actually entitled to.' },
                ].map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading font-bold text-sm">{item.step}</span>
                    <div>
                      <p className="font-heading font-bold text-foreground">{item.action}</p>
                      <p className="font-paragraph text-foreground/70 text-sm">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Get What You're Entitled To</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your severance offer and explain your options.
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
            Licensed by the Law Society of Ontario | Employment matters within paralegal scope
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
