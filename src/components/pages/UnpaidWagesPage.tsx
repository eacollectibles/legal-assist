import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, AlertTriangle, Briefcase, DollarSign, FileText, Calculator } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function UnpaidWagesPage() {
  useEffect(() => {
    document.title = 'Unpaid Wages Ontario | ESA Violations | Overtime Pay | Employment Paralegal | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Owed wages, overtime, or vacation pay in Ontario? File an ESA claim for unpaid wages, illegal deductions, and employment standards violations. Paralegal help London. Free consultation.');
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
              Unpaid Wages & ESA Violations
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Your employer must pay you for all hours worked, including overtime. If you're owed wages, vacation pay, or experiencing other ESA violations, we can help you recover what you're owed.
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

      {/* Types of Violations */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Common ESA Violations</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { icon: DollarSign, title: 'Unpaid Wages', desc: 'Not being paid for all hours worked, including training, meetings, and time worked off-the-clock.' },
              { icon: Clock, title: 'Overtime Violations', desc: 'Not receiving 1.5x pay for hours over 44/week, or being misclassified as "exempt" from overtime.' },
              { icon: Calculator, title: 'Vacation Pay', desc: 'Not receiving at least 4% vacation pay (6% after 5 years), or being denied vacation time.' },
              { icon: Shield, title: 'Public Holiday Pay', desc: 'Not being paid for statutory holidays or not receiving premium pay for working holidays.' },
              { icon: AlertTriangle, title: 'Illegal Deductions', desc: 'Unauthorized deductions from pay for breakages, shortages, or uniforms.' },
              { icon: FileText, title: 'Minimum Wage', desc: 'Being paid less than Ontario\'s minimum wage, including servers and other workers.' },
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

      {/* Overtime Rules */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Ontario Overtime Rules</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4">The Basic Rule</h3>
                  <div className="bg-primary/5 p-4 rounded-lg mb-4">
                    <p className="font-heading text-2xl text-primary font-bold text-center">
                      1.5× pay after 44 hours/week
                    </p>
                  </div>
                  <p className="font-paragraph text-foreground/70 text-sm">
                    Most employees must be paid overtime (time and a half) for each hour worked beyond 44 hours in a work week.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4">Common Myths</h3>
                  <ul className="space-y-2">
                    {[
                      '"Salaried employees don\'t get overtime" - FALSE for most',
                      '"Managers don\'t get overtime" - Often FALSE',
                      '"I agreed to no overtime" - Usually unenforceable',
                      '"I can bank time instead" - Only with written agreement',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/80 text-sm">
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vacation Pay */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Vacation Pay Requirements</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-50 p-4 font-heading font-bold text-foreground text-sm">
                <div>Years of Service</div>
                <div className="text-center">Vacation Time</div>
                <div className="text-center">Vacation Pay</div>
              </div>
              {[
                { years: 'Less than 5 years', time: '2 weeks', pay: '4% of gross wages' },
                { years: '5 years or more', time: '3 weeks', pay: '6% of gross wages' },
              ].map((row, index) => (
                <div key={index} className={`grid grid-cols-3 p-4 ${index !== 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="font-paragraph text-foreground">{row.years}</div>
                  <div className="font-paragraph text-foreground/70 text-center">{row.time}</div>
                  <div className="font-paragraph text-primary font-medium text-center">{row.pay}</div>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 p-4 rounded-lg mt-6">
              <p className="font-paragraph text-amber-800">
                <strong>Note:</strong> Vacation pay is earned on ALL wages, including commissions and bonuses. It must be paid before vacation or on termination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Illegal Deductions */}
      <section className="py-16 md:py-20 bg-red-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">Your Employer CANNOT Deduct For:</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Cash shortages or missing inventory',
                'Breakage or damage to equipment',
                'Customer walkouts or dine-and-dash',
                'Bad cheques from customers',
                'Uniform costs (unless you agree in writing)',
                'Cost of tools required for work',
                'Faulty workmanship',
                'Customer complaints',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span className="font-paragraph text-foreground">{item}</span>
                </div>
              ))}
            </div>
            <p className="font-paragraph text-foreground/70 text-center mt-6">
              Employers can only deduct statutory amounts (taxes, CPP, EI) and amounts you've authorized in writing.
            </p>
          </div>
        </div>
      </section>

      {/* How to File */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">How to Recover Unpaid Wages</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { step: '1', title: 'Document Everything', desc: 'Keep records of hours worked, pay stubs, schedules, and any communications about pay.' },
              { step: '2', title: 'Calculate What You\'re Owed', desc: 'We help you determine the exact amount owed, including any interest.' },
              { step: '3', title: 'File an ESA Claim', desc: 'File a complaint with the Ministry of Labour within 2 years of the violation.' },
              { step: '4', title: 'Collection & Enforcement', desc: 'If your employer doesn\'t pay, the Ministry can enforce the order, or we can pursue Small Claims Court.' },
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
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">Time Limit: 2 Years</h2>
            <p className="font-paragraph text-foreground/80 mb-6">
              You can recover unpaid wages going back up to 2 years from the date you file your claim. Don't wait—the longer you wait, the more you may lose.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Get the Wages You've Earned</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your situation and explain how to recover what you're owed.
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
            Licensed by the Law Society of Ontario | Employment Standards Act claims
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
