import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, AlertTriangle, Briefcase, TrendingDown, UserMinus, Ban } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ConstructiveDismissalPage() {
  useEffect(() => {
    document.title = 'Constructive Dismissal Ontario | Forced to Quit | Employment Paralegal | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Were you forced to quit due to intolerable work conditions? Constructive dismissal may entitle you to severance. Paralegal help in London Ontario. Free consultation.');
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
              <UserMinus className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Employment Law</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Constructive Dismissal Claims
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              If your employer made fundamental changes to your job or created intolerable conditions that forced you to quit, you may have been constructively dismissed—and entitled to severance.
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

      {/* What is Constructive Dismissal */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What is Constructive Dismissal?</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                Constructive dismissal occurs when an employer doesn't actually fire you, but makes such significant changes to your employment that you're effectively forced to resign. The law treats this the same as being fired.
              </p>
              <div className="bg-primary/5 p-6 rounded-lg">
                <p className="font-paragraph text-foreground/80">
                  <strong>Key principle:</strong> If you resign due to constructive dismissal, you're entitled to the same notice, severance, and damages as if you were terminated without cause.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signs of Constructive Dismissal */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Signs of Constructive Dismissal</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { icon: TrendingDown, title: 'Significant Pay Cut', desc: 'Reduction in salary, commission structure, or benefits without your consent—typically 10%+ or more.' },
              { icon: UserMinus, title: 'Demotion', desc: 'Being moved to a lower position, losing your title, or having responsibilities significantly reduced.' },
              { icon: Clock, title: 'Hours Changed', desc: 'Major changes to work schedule, being forced to part-time, or geographic relocation.' },
              { icon: Ban, title: 'Intolerable Conditions', desc: 'Harassment, bullying, or toxic environment that makes continued employment impossible.' },
              { icon: Briefcase, title: 'Fundamental Job Changes', desc: 'Complete change in duties, reporting structure, or the essential nature of your role.' },
              { icon: AlertTriangle, title: 'Failure to Pay', desc: 'Not being paid wages owed, suspension without pay, or being laid off indefinitely.' },
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

      {/* What to Do */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What To Do If You Suspect Constructive Dismissal</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { step: '1', title: 'Don\'t Quit Immediately', desc: 'If you resign without objecting to the changes, you may lose your claim. Document your objection first.' },
                { step: '2', title: 'Object in Writing', desc: 'Send a written objection to the changes. This preserves your rights while you decide what to do.' },
                { step: '3', title: 'Document Everything', desc: 'Keep records of all changes, communications, and how they affect you.' },
                { step: '4', title: 'Get Legal Advice', desc: 'Before resigning, understand whether your situation qualifies as constructive dismissal.' },
                { step: '5', title: 'Make Your Decision', desc: 'You typically must act within a reasonable time—either accept the changes or resign and claim constructive dismissal.' },
              ].map((item, index) => (
                <div key={index} className={`p-6 flex items-start gap-4 ${index !== 4 ? 'border-b border-gray-100' : ''}`}>
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="font-paragraph text-foreground/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Warning */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">Critical Warning: Timing Matters</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="font-paragraph text-foreground/80 mb-4">
                Constructive dismissal claims have strict timing requirements:
              </p>
              <ul className="space-y-3">
                {[
                  'If you continue working under new conditions too long, you may be seen as "accepting" them',
                  'If you quit without objecting, you may lose your claim entirely',
                  'You must act within a "reasonable time"—usually weeks, not months',
                  'Getting legal advice BEFORE you resign is essential',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 font-paragraph text-foreground/80">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Recover */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What You May Be Entitled To</h2>
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { title: 'Notice / Severance Pay', desc: 'Same as wrongful dismissal—potentially up to 24 months or more.' },
              { title: 'Lost Benefits', desc: 'Value of health, dental, pension contributions during notice period.' },
              { title: 'Lost Bonus / Commission', desc: 'Compensation for bonuses you would have earned.' },
              { title: 'Moral Damages', desc: 'In cases of bad faith conduct by the employer.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <UserMinus className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Think You've Been Constructively Dismissed?</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Don't resign without understanding your rights. Free consultation to assess your situation.
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
