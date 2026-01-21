import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, AlertTriangle, Users, Calendar, Briefcase, TrendingDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AgeDiscriminationPage() {
  useEffect(() => {
    document.title = 'Age Discrimination | Older Worker Rights Ontario | HRTO | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Experienced age discrimination at work? Ontario prohibits discrimination against workers 18+. File an HRTO complaint for hiring, termination, or workplace age bias. Free consultation London.');
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
              <Calendar className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Human Rights</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Age Discrimination Claims
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Ontario law protects workers of all ages from discrimination. Whether you're being passed over for promotions, pressured to retire, or targeted for termination because of your age, we can help you fight back.
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

      {/* The Law */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Age Discrimination in Ontario</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                The Ontario Human Rights Code protects workers <strong>18 years and older</strong> from discrimination in employment based on age. This includes:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Hiring and recruitment',
                  'Promotions and advancement',
                  'Terms and conditions of employment',
                  'Layoffs and terminations',
                  'Training opportunities',
                  'Compensation and benefits',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="font-paragraph text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="bg-primary/5 p-4 rounded-lg mt-6">
                <p className="font-paragraph text-foreground/80 text-center">
                  <strong>Important:</strong> Ontario eliminated mandatory retirement in 2006. Employers cannot force you to retire at any age.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signs of Age Discrimination */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Signs of Age Discrimination</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { icon: TrendingDown, title: 'Passed Over for Promotions', desc: 'Younger, less experienced workers get promoted while you\'re overlooked despite qualifications.' },
              { icon: Users, title: 'Comments About Age', desc: '"When are you retiring?" or jokes about being "old school" or "out of touch."' },
              { icon: Briefcase, title: 'Excluded from Projects', desc: 'Being left out of new initiatives, training, or opportunities given to younger workers.' },
              { icon: Calendar, title: 'Pressured to Retire', desc: 'Hints or direct pressure to "make room for younger workers" or take early retirement.' },
              { icon: AlertTriangle, title: 'Targeted for Layoffs', desc: 'Older workers disproportionately selected during "restructuring" or "downsizing."' },
              { icon: Scale, title: 'Different Standards', desc: 'Being held to different performance standards or disciplined more harshly than younger employees.' },
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

      {/* Proving Age Discrimination */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">How Age Discrimination is Proven</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <p className="font-paragraph text-foreground/80 mb-6">
                You don't need a "smoking gun." Discrimination can be proven through:
              </p>
              <ul className="space-y-4">
                {[
                  { title: 'Statistical Patterns', desc: 'Multiple older workers terminated while younger workers retained' },
                  { title: 'Comments and Remarks', desc: 'Age-related comments, even if framed as "jokes"' },
                  { title: 'Timing', desc: 'Termination shortly after age-related conversations or turning a milestone age' },
                  { title: 'Comparator Evidence', desc: 'How younger employees in similar situations were treated' },
                  { title: 'Shifting Reasons', desc: 'Employer gives inconsistent explanations for their decisions' },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-heading font-bold text-foreground">{item.title}:</span>
                      <span className="font-paragraph text-foreground/70"> {item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Wrongful Dismissal + Age */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <Scale className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">Older Workers & Wrongful Dismissal</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="font-paragraph text-foreground/80 mb-4">
                Even without proving discrimination, older workers are entitled to longer notice periods because:
              </p>
              <ul className="space-y-3">
                {[
                  'Courts recognize older workers face greater challenges finding new employment',
                  'Length of service is a key factor—and older workers often have more',
                  'Specialized skills developed over a career may be harder to transfer',
                  'Notice periods of 20-24+ months are common for older, long-service employees',
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

      {/* What You Can Do */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Your Options</h2>
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { title: 'Human Rights Complaint', desc: 'File with HRTO for discrimination remedies including compensation for injury to dignity.', timeline: '1 year deadline' },
              { title: 'Wrongful Dismissal Claim', desc: 'Sue for proper notice/severance. Age is a factor in calculating your entitlement.', timeline: '2 year deadline' },
              { title: 'ESA Complaint', desc: 'If your employer violated employment standards while discriminating.', timeline: '2 year deadline' },
              { title: 'Negotiate Severance', desc: 'Use leverage of potential claims to negotiate better severance package.', timeline: 'Act quickly' },
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

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <Calendar className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Experience Matters—So Do Your Rights</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your situation and explain your options.
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
