import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, AlertTriangle, ShieldAlert, FileText, Gavel, Ban } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ReprisalClaimsPage() {
  useEffect(() => {
    document.title = 'Reprisal Claims | Retaliation at Work Ontario | HRTO | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Punished for asserting your rights at work? Reprisal is illegal in Ontario. File an HRTO complaint if you faced retaliation for complaints or exercising rights. Free consultation London.');
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
              <ShieldAlert className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Human Rights</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Reprisal & Retaliation Claims
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Did your employer punish you for asserting your rights, making a complaint, or participating in an investigation? Reprisal is illegal—and we can help you fight back.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors">
                Free Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:5196011110" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/5 transition-colors">
                Call (519) 601-1110
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What is Reprisal */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What is Reprisal?</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                Reprisal occurs when an employer punishes or threatens an employee for exercising their legal rights. Under the Ontario Human Rights Code, it's illegal to retaliate against someone who:
              </p>
              <ul className="space-y-3">
                {[
                  'Filed or plans to file a human rights complaint',
                  'Participated as a witness in a human rights proceeding',
                  'Claimed or tried to enforce their human rights',
                  'Refused to violate someone else\'s human rights',
                  'Requested workplace accommodation',
                  'Reported harassment or discrimination',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 font-paragraph text-foreground/80">
                    <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Forms of Retaliation */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Common Forms of Retaliation</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { icon: Ban, title: 'Termination', desc: 'Being fired shortly after making a complaint or requesting accommodation.' },
              { icon: AlertTriangle, title: 'Demotion', desc: 'Being moved to a lesser position, losing responsibilities, or having title reduced.' },
              { icon: Clock, title: 'Schedule Changes', desc: 'Suddenly getting unfavorable shifts, reduced hours, or being excluded from overtime.' },
              { icon: FileText, title: 'Negative Reviews', desc: 'Receiving poor performance reviews after years of positive evaluations.' },
              { icon: Shield, title: 'Hostile Treatment', desc: 'Being ostracized, excluded from meetings, or treated coldly by management.' },
              { icon: Scale, title: 'Excessive Discipline', desc: 'Being written up or disciplined for things previously tolerated or ignored.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Protected Activities */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Protected Activities Under Multiple Laws</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <p className="font-paragraph text-foreground/80 mb-6">
                Reprisal protection exists under multiple Ontario laws:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-heading font-bold text-foreground mb-2">Human Rights Code</h3>
                  <ul className="space-y-1 text-sm">
                    {[
                      'Discrimination complaints',
                      'Accommodation requests',
                      'Harassment complaints',
                    ].map((item, index) => (
                      <li key={index} className="font-paragraph text-foreground/70">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-heading font-bold text-foreground mb-2">Employment Standards Act</h3>
                  <ul className="space-y-1 text-sm">
                    {[
                      'Wage complaints',
                      'Asking about ESA rights',
                      'Taking protected leaves',
                    ].map((item, index) => (
                      <li key={index} className="font-paragraph text-foreground/70">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-heading font-bold text-foreground mb-2">Occupational Health & Safety</h3>
                  <ul className="space-y-1 text-sm">
                    {[
                      'Reporting safety hazards',
                      'Refusing unsafe work',
                      'Participating in inspections',
                    ].map((item, index) => (
                      <li key={index} className="font-paragraph text-foreground/70">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-heading font-bold text-foreground mb-2">Whistleblower Laws</h3>
                  <ul className="space-y-1 text-sm">
                    {[
                      'Reporting illegal activity',
                      'Disclosing wrongdoing',
                      'Cooperating with investigations',
                    ].map((item, index) => (
                      <li key={index} className="font-paragraph text-foreground/70">• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proving Reprisal */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <Gavel className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">How Reprisal is Proven</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="font-paragraph text-foreground/80 mb-4">
                You need to show a connection between your protected activity and the negative treatment:
              </p>
              <ul className="space-y-3">
                {[
                  { factor: 'Timing', desc: 'Negative action occurred shortly after your complaint or protected activity' },
                  { factor: 'Knowledge', desc: 'The decision-maker knew about your protected activity' },
                  { factor: 'Pattern', desc: 'Treatment changed after your complaint (was positive before, negative after)' },
                  { factor: 'Comparisons', desc: 'Others who didn\'t complain were treated differently' },
                  { factor: 'Pretextual Reasons', desc: 'Employer\'s stated reasons don\'t hold up under scrutiny' },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-heading font-bold text-foreground">{item.factor}:</span>
                      <span className="font-paragraph text-foreground/70"> {item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Do */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Your Legal Options</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { step: '1', title: 'Document Everything', desc: 'Keep records of the protected activity, the retaliation, and the timeline connecting them.' },
              { step: '2', title: 'File Promptly', desc: 'HRTO complaints must be filed within 1 year. ESA reprisal complaints have shorter deadlines.' },
              { step: '3', title: 'Seek Remedies', desc: 'Reprisal can result in reinstatement, compensation, and damages for injury to dignity.' },
              { step: '4', title: 'Get Representation', desc: 'Reprisal cases require proving intent—professional help strengthens your case.' },
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

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <ShieldAlert className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Don't Let Retaliation Go Unanswered</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your situation and explain your options for fighting back.
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
            Licensed by the Law Society of Ontario | Human Rights Tribunal representation
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
