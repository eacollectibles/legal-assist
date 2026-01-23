import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, AlertTriangle, Briefcase, FileText, DollarSign, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function WrongfulTerminationPage() {
  useEffect(() => {
    document.title = 'Wrongful Termination | Fired Without Cause Ontario | Employment Paralegal | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Were you wrongfully terminated in Ontario? Get help with termination without cause, severance disputes, and employment standards claims. Paralegal services London. Free consultation.');
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
              <span className="font-paragraph text-sm font-medium">Employment Law</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Wrongful Termination Claims
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Lost your job unexpectedly? You may be entitled to more than your employer offered. We help workers understand their rights and fight for proper compensation after termination.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors">
                Find out where you stand <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:5196011110" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/5 transition-colors">
                Call (519) 601-1110
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What is Wrongful Termination */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What is Wrongful Termination?</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                In Ontario, employers can terminate employees without cause—but they must provide proper notice or pay in lieu of notice. Wrongful termination occurs when:
              </p>
              <ul className="space-y-3">
                {[
                  'You were not given adequate notice or severance pay',
                  'Your termination violated the Employment Standards Act (ESA)',
                  'You were fired for discriminatory reasons (age, disability, pregnancy, etc.)',
                  'You were terminated in retaliation for exercising your rights',
                  'Your employer breached your employment contract',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 font-paragraph text-foreground/80">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-primary/5 p-6 rounded-lg">
              <p className="font-paragraph text-foreground/80 text-center">
                <strong>Important:</strong> Even if your employer says you were fired "for cause," they may be wrong. True just cause is difficult to prove and many employers misuse the term.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ESA vs Common Law */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">ESA Minimums vs. Common Law Entitlements</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">ESA Minimum (Statutory)</h3>
              <p className="font-paragraph text-foreground/70 mb-4">
                The Employment Standards Act sets minimum notice periods:
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  'Less than 3 months: No notice required',
                  '3 months to 1 year: 1 week',
                  '1 to 3 years: 2 weeks',
                  '3 to 4 years: 3 weeks',
                  '4 to 5 years: 4 weeks',
                  '5 to 6 years: 5 weeks',
                  '6 to 7 years: 6 weeks',
                  '7 to 8 years: 7 weeks',
                  '8+ years: 8 weeks (maximum)',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/80">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-primary">
              <h3 className="font-heading text-xl font-bold text-primary mb-4">Common Law Entitlement</h3>
              <p className="font-paragraph text-foreground/70 mb-4">
                You may be entitled to much more—up to 24 months or more based on:
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  'Length of service',
                  'Your age',
                  'Type of position',
                  'Availability of similar employment',
                  'Whether you were induced to leave another job',
                  'Your education and skills',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/80">
                    <Scale className="w-4 h-4 text-primary flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <p className="font-paragraph text-primary font-medium mt-4 text-sm">
                Don't settle for ESA minimums without understanding your full entitlements!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Signs You May Have a Claim */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Signs You May Have a Claim</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { title: 'Offered Only ESA Minimum', desc: 'If your severance offer matches exactly the ESA chart, you\'re likely entitled to more under common law.' },
              { title: 'Long-Term Employee', desc: 'Employees with 5+ years of service are often entitled to significantly more than ESA minimums.' },
              { title: 'Older Worker', desc: 'Courts recognize older workers face greater challenges finding new employment.' },
              { title: 'Specialized Position', desc: 'If your skills are specialized, finding similar work takes longer, increasing your entitlement.' },
              { title: 'Induced to Join', desc: 'If you left secure employment to join this company, that increases your notice entitlement.' },
              { title: 'No Written Contract', desc: 'Without a valid termination clause, common law entitlements apply.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Can Help With */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">How We Help</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { step: '1', title: 'Review Your Situation', desc: 'We examine your employment history, contract, and termination circumstances to assess your claim.' },
              { step: '2', title: 'Calculate Entitlements', desc: 'We determine what you\'re actually owed under both ESA and common law.' },
              { step: '3', title: 'Negotiate With Employer', desc: 'We communicate with your employer to negotiate a fair severance package.' },
              { step: '4', title: 'File Claims If Needed', desc: 'For ESA violations, we can file claims with the Ministry of Labour. For larger claims, we can pursue Small Claims Court.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="font-paragraph text-foreground/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Time Limits */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Clock className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">Important Time Limits</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm text-left">
              <ul className="space-y-4">
                {[
                  { limit: '2 years', desc: 'ESA claims must be filed within 2 years of the violation' },
                  { limit: '2 years', desc: 'Small Claims Court / civil claims for wrongful dismissal' },
                  { limit: '1 year', desc: 'Human rights complaints (if discrimination involved)' },
                  { limit: 'Immediately', desc: 'Don\'t sign anything without understanding your rights first!' },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="font-heading font-bold text-primary">{item.limit}</span>
                    <span className="font-paragraph text-foreground/80">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Don't Accept Less Than You Deserve</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your termination and explain what you may be entitled to.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-gray-100 transition-colors">
              Find out where you stand <ArrowRight className="w-5 h-5" />
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
