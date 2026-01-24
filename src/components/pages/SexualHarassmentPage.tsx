import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, AlertTriangle, UserX, MessageSquare, FileText, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SexualHarassmentPage() {
  useEffect(() => {
    document.title = 'Sexual Harassment Claims | Workplace Harassment Ontario | HRTO | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Experiencing sexual harassment at work? File an HRTO complaint. Ontario employers must provide harassment-free workplaces. Private consultations. Paralegal help London.');
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
              <Shield className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Human Rights</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Sexual Harassment Claims
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Everyone deserves a workplace free from sexual harassment. If you've experienced unwanted sexual conduct at work, we can help you understand your rights and hold your employer accountable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors">
                Private Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:5196011110" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/5 transition-colors">
                Call (519) 601-1110
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What is Sexual Harassment */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What is Sexual Harassment?</h2>
          <div className="max-w-4xl mx-auto">
            <p className="font-paragraph text-foreground/80 mb-8 text-center">
              Sexual harassment includes any unwelcome conduct of a sexual nature that affects your work environment or employment. This includes:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: MessageSquare, title: 'Verbal Harassment', desc: 'Sexual comments, jokes, innuendos, requests for sexual favors, questions about your sex life.' },
                { icon: UserX, title: 'Physical Harassment', desc: 'Unwanted touching, hugging, kissing, blocking movement, or physical intimidation.' },
                { icon: FileText, title: 'Visual Harassment', desc: 'Displaying sexual images, sending sexual texts/emails, inappropriate gestures.' },
                { icon: AlertTriangle, title: 'Quid Pro Quo', desc: '"Sleep with me or you\'re fired" or promising benefits in exchange for sexual favors.' },
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <item.icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="font-paragraph text-foreground/70">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-primary/5 p-6 rounded-lg mt-8">
              <p className="font-paragraph text-foreground/80 text-center">
                <strong>Key point:</strong> A single serious incident can constitute harassment. You don't need to prove a pattern of behavior.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Employer's Duty */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Your Employer's Legal Obligations</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <p className="font-paragraph text-foreground/80 mb-6">
                Under Ontario law, employers MUST:
              </p>
              <ul className="space-y-4">
                {[
                  'Have a written harassment policy',
                  'Train employees and supervisors on harassment',
                  'Investigate complaints promptly and thoroughly',
                  'Take corrective action when harassment is found',
                  'Protect complainants from retaliation',
                  'Provide a workplace free from harassment',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 font-paragraph text-foreground/80">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <p className="font-paragraph text-foreground/70 mt-6 text-sm">
                Employers can be held liable for harassment by supervisors, co-workers, clients, and even customers if they knew or should have known about it and failed to act.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to Do */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What To Do If You're Being Harassed</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { step: '1', title: 'Document Everything', desc: 'Keep detailed notes: dates, times, what happened, what was said, witnesses present. Save any texts, emails, or other evidence.' },
                { step: '2', title: 'Report Internally (If Safe)', desc: 'If you feel safe doing so, report to HR or your employer\'s designated person. Note how they respond—or fail to respond.' },
                { step: '3', title: 'Don\'t Suffer in Silence', desc: 'Talk to someone you trust. The isolation harassers create is part of their power.' },
                { step: '4', title: 'Know Your Options', desc: 'You can file an HRTO complaint, and in some cases pursue civil claims for damages.' },
                { step: '5', title: 'Get Professional Help', desc: 'A paralegal or lawyer can advise on the best path forward for your specific situation.' },
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

      {/* Filing a Complaint */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Filing an HRTO Complaint</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">What You Can Recover</h3>
              <ul className="space-y-3">
                {[
                  'Compensation for lost wages',
                  'Compensation for injury to dignity (often $10,000-$50,000+)',
                  'Reinstatement if you lost your job',
                  'Order that employer change policies/training',
                  'Public interest remedies',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">Important Information</h3>
              <ul className="space-y-3">
                {[
                  'File within 1 year of the last incident',
                  'You don\'t need a lawyer (but representation helps)',
                  'The process is confidential',
                  'Retaliation for filing is itself illegal',
                  'Most cases settle at mediation',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/80 text-sm">
                    <Shield className="w-4 h-4 text-primary flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* We Believe You */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">We Believe You</h2>
            <p className="font-paragraph text-foreground/80 mb-6">
              Coming forward about sexual harassment takes courage. We provide a safe, non-judgmental space to discuss your situation. All information is handled securely.
            </p>
            <p className="font-paragraph text-foreground/70 text-sm">
              You are not alone. What happened to you is not your fault. You have the right to a harassment-free workplace.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <Phone className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Private Help Is Available</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free, private consultation to discuss your situation and understand your options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-gray-100 transition-colors">
              Request Consultation <ArrowRight className="w-5 h-5" />
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
