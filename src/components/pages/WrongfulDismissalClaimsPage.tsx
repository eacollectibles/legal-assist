import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, FileText, DollarSign, AlertTriangle, Briefcase, Users, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function WrongfulDismissalClaimsPage() {
  useEffect(() => {
    document.title = 'Wrongful Dismissal Claims Under $35,000 | Small Claims Court Ontario | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Paralegal for wrongful dismissal claims under $35,000 in Ontario Small Claims Court. Fired without proper notice or severance? Free consultation in London Ontario.');
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
              <span className="font-paragraph text-sm font-medium">Employment Law Services</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Wrongful Dismissal Claims
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Terminated without proper notice or adequate severance? If your claim is under $35,000, you can pursue compensation in Small Claims Court with licensed paralegal representation.
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

      {/* What is Wrongful Dismissal */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What is Wrongful Dismissal?</h2>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <p className="font-paragraph text-foreground/80 mb-6 text-lg">
                In Ontario, employers can terminate employees <em>without cause</em> — but they must provide reasonable notice or pay in lieu of notice. <strong>Wrongful dismissal</strong> occurs when an employer fails to provide adequate notice or severance.
              </p>
              <p className="font-paragraph text-foreground/80 text-lg">
                The notice period you're entitled to depends on factors like your age, length of service, position, and how difficult it will be to find similar work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ESA Minimums vs Common Law */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">ESA Minimums vs Common Law Entitlements</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-heading text-xl font-bold text-amber-600 mb-4">ESA Minimum (Statutory)</h3>
              <p className="font-paragraph text-foreground/70 mb-4">Employment Standards Act requires employers to provide <strong>at minimum</strong>:</p>
              <ul className="space-y-2">
                {[
                  '1 week per year of service',
                  'Up to 8 weeks maximum',
                  'Plus severance pay if eligible',
                  'Many employers only offer this',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/80">
                    <span className="text-amber-600">—</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-green-500">
              <h3 className="font-heading text-xl font-bold text-green-600 mb-4">Common Law Entitlement</h3>
              <p className="font-paragraph text-foreground/70 mb-4">Unless your contract limits it, you may be entitled to <strong>much more</strong>:</p>
              <ul className="space-y-2">
                {[
                  'Up to 24+ months notice',
                  'Based on your specific situation',
                  'Considers age, service, position',
                  'Often 2-4x ESA minimums',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/80">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Period Factors */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Factors That Determine Your Notice Period</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Calendar, title: 'Length of Service', desc: 'Longer service generally means more notice. Someone with 20 years gets more than someone with 2 years.' },
              { icon: Users, title: 'Age', desc: 'Older workers typically receive more notice as finding comparable work can take longer.' },
              { icon: Briefcase, title: 'Position & Character', desc: 'Senior or specialized roles typically warrant longer notice periods.' },
              { icon: Scale, title: 'Availability of Similar Work', desc: 'If jobs in your field are scarce, you may be entitled to more notice.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">{item.title}</h3>
                <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to Use Small Claims */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">When Small Claims Court is Right for You</h2>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <p className="font-paragraph text-foreground/80 mb-6">
                Small Claims Court can handle wrongful dismissal claims up to <strong>$35,000</strong>. This is often ideal for:
              </p>
              <ul className="space-y-4">
                {[
                  { title: 'Lower to mid-income employees', desc: 'Where the claim for unpaid notice falls under $35,000' },
                  { title: 'Shorter employment tenure', desc: 'Where the reasonable notice period results in a smaller claim' },
                  { title: 'Cost-conscious approach', desc: 'Paralegal fees are typically lower than employment lawyers' },
                  { title: 'Faster resolution', desc: 'Small Claims moves quicker than Superior Court' },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <span className="font-heading font-bold text-foreground">{item.title}:</span>
                      <span className="font-paragraph text-foreground/70"> {item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                <p className="font-paragraph text-amber-800 text-sm">
                  <strong>Note:</strong> If your claim exceeds $35,000, you may need to pursue it in Superior Court with an employment lawyer. We can help you estimate your claim value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Claim */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What Compensation Can You Recover?</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { title: 'Pay in Lieu of Notice', desc: 'The salary and benefits you should have received during reasonable notice period' },
                { title: 'Bonus & Commission', desc: 'Bonus payments or commissions that would have been earned during notice period' },
                { title: 'Benefits Continuation', desc: 'Value of health benefits, pension contributions, and other benefits lost' },
                { title: 'Vacation Pay', desc: 'Accrued but unpaid vacation pay owing at termination' },
                { title: 'Expenses & Allowances', desc: 'Car allowance, phone allowance, and other regular allowances' },
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

      {/* Limitation Period */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-10 h-10 text-amber-600 flex-shrink-0" />
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Important: 2-Year Limitation Period</h2>
                <p className="font-paragraph text-foreground/80 mb-4">
                  You generally have <strong>2 years from your termination date</strong> to file a wrongful dismissal claim. However, you should act quickly because:
                </p>
                <ul className="space-y-2">
                  <li className="font-paragraph text-foreground/80">• Evidence is fresher and easier to gather</li>
                  <li className="font-paragraph text-foreground/80">• You have a duty to mitigate by seeking new employment</li>
                  <li className="font-paragraph text-foreground/80">• Earlier action may prompt quicker settlement</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">How We Handle Your Claim</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                { step: '1', title: 'Case Assessment', desc: 'Review your termination circumstances, calculate your likely entitlement, and assess case strength.' },
                { step: '2', title: 'Demand Letter', desc: 'Send formal demand to employer for proper severance. Many cases settle at this stage.' },
                { step: '3', title: 'File Claim', desc: 'If no satisfactory offer, file Plaintiff\'s Claim in Small Claims Court.' },
                { step: '4', title: 'Settlement Conference', desc: 'Attend mandatory settlement meeting with a judge. Most employment cases settle here.' },
                { step: '5', title: 'Trial (if needed)', desc: 'If no settlement, present your case to a judge for a binding decision.' },
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Terminated Without Fair Severance?</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your termination and estimate what you may be entitled to.
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
            Licensed by the Law Society of Ontario | Paralegal services for claims up to $35,000
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
