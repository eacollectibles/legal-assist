import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, AlertTriangle, Baby, Briefcase, Heart, Ban } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PregnancyDiscriminationPage() {
  // SEO handled by AutoSEO component

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Baby className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Human Rights</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Pregnancy & Parental Leave Discrimination
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Pregnancy discrimination is illegal. If you've been fired, denied opportunities, or treated unfairly because of pregnancy, plans to become pregnant, or taking parental leave, we can help you fight back.
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

      {/* Your Rights */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Your Rights During Pregnancy & Leave</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                Under Ontario law, you have the right to:
              </p>
              <ul className="space-y-4">
                {[
                  'Not be fired, demoted, or disciplined because of pregnancy',
                  'Take pregnancy leave (up to 17 weeks) and parental leave (up to 61-63 weeks)',
                  'Return to your same job (or comparable job) after leave',
                  'Continue to accrue seniority and benefits during leave',
                  'Reasonable accommodation for pregnancy-related needs',
                  'Not be asked about pregnancy or family plans in job interviews',
                  'Not be penalized for pregnancy-related absences',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 font-paragraph text-foreground/80">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Signs of Discrimination */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Signs of Pregnancy Discrimination</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { icon: Ban, title: 'Termination', desc: 'Being fired after announcing pregnancy, during pregnancy, or when returning from leave.' },
              { icon: Briefcase, title: 'Job Changes', desc: 'Being demoted, having responsibilities removed, or being passed over for promotions.' },
              { icon: AlertTriangle, title: 'Hostile Treatment', desc: 'Negative comments about pregnancy, being excluded from meetings, or treated differently.' },
              { icon: Clock, title: 'Schedule Manipulation', desc: 'Hours cut, unfavorable schedule changes, or being pushed out through reduced work.' },
              { icon: Shield, title: 'No Job on Return', desc: 'Being told there\'s no position for you when you return from parental leave.' },
              { icon: Scale, title: 'Denied Accommodation', desc: 'Refusing reasonable requests like light duties, more breaks, or schedule flexibility.' },
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

      {/* Leave Entitlements */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Ontario Leave Entitlements</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">Pregnancy Leave</h3>
                <p className="font-paragraph text-foreground/70 mb-4">Up to <strong>17 weeks</strong> unpaid leave for birth mothers.</p>
                <ul className="space-y-1 text-sm text-foreground/70">
                  <li>• Can start up to 17 weeks before due date</li>
                  <li>• Ends 17 weeks after it begins or after birth if later</li>
                  <li>• Job protected—employer cannot replace you</li>
                </ul>
              </div>
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">Parental Leave</h3>
                <p className="font-paragraph text-foreground/70 mb-4">Up to <strong>61-63 weeks</strong> unpaid leave for parents.</p>
                <ul className="space-y-1 text-sm text-foreground/70">
                  <li>• 61 weeks if pregnancy leave taken, 63 weeks if not</li>
                  <li>• Available to both parents, biological and adoptive</li>
                  <li>• Must begin within 78 weeks of birth/adoption</li>
                </ul>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">Right to Return</h3>
                <p className="font-paragraph text-foreground/70">
                  After leave, you must be returned to your same position, or if it no longer exists, a comparable position with the same pay and benefits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interview Questions */}
      <section className="py-16 md:py-20 bg-red-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">Illegal Interview Questions</h2>
            <p className="font-paragraph text-foreground/80 mb-6 text-center">
              Employers CANNOT ask in interviews:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                '"Are you pregnant?"',
                '"Do you plan to have children?"',
                '"Are you married?"',
                '"How old are your children?"',
                '"Who will take care of your kids?"',
                '"Will pregnancy affect your work?"',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg">
                  <Ban className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span className="font-paragraph text-foreground">{item}</span>
                </div>
              ))}
            </div>
            <p className="font-paragraph text-foreground/70 text-center mt-6 text-sm">
              If you weren't hired after being asked these questions, you may have a discrimination claim.
            </p>
          </div>
        </div>
      </section>

      {/* Your Options */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Your Legal Options</h2>
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { title: 'Human Rights Complaint', desc: 'File with HRTO for discrimination based on sex, pregnancy, or family status.', timeline: '1 year deadline' },
              { title: 'ESA Complaint', desc: 'If your employer violated pregnancy/parental leave rules under the Employment Standards Act.', timeline: '2 year deadline' },
              { title: 'Wrongful Dismissal', desc: 'Sue for notice/severance if terminated. Pregnancy terminations often result in higher damages.', timeline: '2 year deadline' },
              { title: 'Negotiate Severance', desc: 'Use leverage of discrimination claims to negotiate better package.', timeline: 'Act quickly' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70 text-sm mb-2">{item.desc}</p>
                <span className="inline-block text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded">{item.timeline}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">You're Not Alone</h2>
            <p className="font-paragraph text-foreground/80 mb-6">
              Pregnancy discrimination is more common than many people realize, and it's absolutely wrong. You should be able to start or grow your family without fear of losing your job or being treated unfairly.
            </p>
            <p className="font-paragraph text-foreground/70 text-sm">
              We provide supportive, private consultations to help you understand your options and decide the best path forward.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <Baby className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Protect Your Rights & Your Family</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free, private consultation to review your situation and explain your options.
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
            Licensed by the Law Society of Ontario | Human Rights Tribunal representation
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
