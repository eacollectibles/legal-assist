import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Briefcase, Clock, CheckCircle, AlertTriangle, FileText, DollarSign, Calendar, Ban } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EmploymentRightsGuidePage() {
  useEffect(() => {
    document.title = 'Ontario Employment Rights Guide | Know Your Rights at Work | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Complete guide to employee rights in Ontario. Learn about termination, severance, overtime, vacation pay, and what your employer must provide. Free information.');
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
              Ontario Employment Rights Guide
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Understanding your rights at work helps you protect yourself. This guide covers the Employment Standards Act, termination rights, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Key Rights */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Your Basic Employment Rights</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { icon: DollarSign, title: 'Minimum Wage', desc: 'Currently $16.55/hour (2024). Your employer must pay at least this amount.' },
              { icon: Clock, title: 'Overtime Pay', desc: '1.5x your regular rate after 44 hours per week. Cannot be averaged without agreement.' },
              { icon: Calendar, title: 'Vacation', desc: '2 weeks (4%) after 1 year, 3 weeks (6%) after 5 years. Must be paid out if not taken.' },
              { icon: Shield, title: 'Public Holidays', desc: '9 public holidays with premium pay or substitute day off.' },
              { icon: Briefcase, title: 'Breaks', desc: '30-minute eating break after every 5 hours. Doesn\'t need to be paid.' },
              { icon: Ban, title: 'No Discrimination', desc: 'Protection from discrimination based on race, sex, disability, age, and other grounds.' },
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

      {/* Termination Rights */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">If You're Terminated</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                When your employer ends your job without cause, you're entitled to notice (or pay in lieu):
              </p>
              
              <h3 className="font-heading font-bold text-foreground mb-4">ESA Minimum Notice</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { years: '3 mo - 1 yr', notice: '1 week' },
                  { years: '1-3 years', notice: '2 weeks' },
                  { years: '3-4 years', notice: '3 weeks' },
                  { years: '4-5 years', notice: '4 weeks' },
                  { years: '5-6 years', notice: '5 weeks' },
                  { years: '6-7 years', notice: '6 weeks' },
                  { years: '7-8 years', notice: '7 weeks' },
                  { years: '8+ years', notice: '8 weeks' },
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="font-paragraph text-sm text-foreground/60">{item.years}</div>
                    <div className="font-heading font-bold text-primary">{item.notice}</div>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <h4 className="font-heading font-bold text-green-800 mb-2">Common Law Notice (Usually More)</h4>
                <p className="font-paragraph text-green-700 text-sm">
                  Beyond ESA minimums, courts often award 1 month per year of service, up to 24 months. Factors include age, position, availability of similar jobs, and whether you were recruited.
                </p>
              </div>

              <h3 className="font-heading font-bold text-foreground mb-4">Severance Pay (Separate from Notice)</h3>
              <p className="font-paragraph text-foreground/70 mb-4">
                If your employer has payroll of $2.5M+ OR 50+ employees are being severed, AND you've worked 5+ years:
              </p>
              <div className="bg-primary/5 p-4 rounded-lg">
                <p className="font-paragraph text-foreground/80">
                  <strong>Formula:</strong> 1 week per year of service, maximum 26 weeks
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Illegal */}
      <section className="py-16 md:py-20 bg-red-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What Your Employer CANNOT Do</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <ul className="space-y-3">
                {[
                  'Pay less than minimum wage',
                  'Withhold or delay your pay',
                  'Deduct from wages for cash shortages, breakages, or customer walkouts',
                  'Require you to pay for uniforms (unless specific exceptions)',
                  'Fire you for pregnancy, illness, or taking protected leave',
                  'Punish you for asking about your rights',
                  'Force overtime without paying the premium rate',
                  'Discriminate based on protected grounds',
                  'Create or allow a hostile work environment',
                  'Terminate without proper notice or pay',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 font-paragraph text-foreground/80">
                    <Ban className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What To Do */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">If Your Rights Are Violated</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">Document Everything</h3>
              <ul className="space-y-2">
                {[
                  'Save all emails and written communications',
                  'Keep copies of pay stubs and contracts',
                  'Note dates, times, and details of incidents',
                  'Identify potential witnesses',
                  'Don\'t sign anything without understanding it',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/70 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">Your Options</h3>
              <ul className="space-y-2">
                {[
                  'File ESA claim with Ministry of Labour (free)',
                  'File human rights complaint at HRTO',
                  'Negotiate directly with employer',
                  'Sue in Small Claims (up to $35K)',
                  'Sue in Superior Court (larger amounts)',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/70 text-sm">
                    <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> {item}
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
          <Shield className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Workplace Issue? Let's Talk.</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to discuss your employment matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-gray-100 transition-colors">
              Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/services/employment-issues" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-white/10 transition-colors">
              Employment Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
