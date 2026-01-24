import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, AlertTriangle, FileText, Users, Gavel, MessageSquare } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SmallClaimsCourtGuidePage() {
  useEffect(() => {
    document.title = 'What to Expect at Small Claims Court Ontario | Complete Guide | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Complete guide to Small Claims Court in Ontario. Learn about the process, settlement conferences, trials, and how to prepare your case. Free information.');
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
              What to Expect at Small Claims Court
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Small Claims Court handles civil disputes up to $50,000. This guide explains the entire process from filing to judgment.
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Small Claims Court Basics</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              { icon: Scale, title: 'Monetary Limit', desc: 'Claims up to $50,000 (not including interest and costs)' },
              { icon: Clock, title: 'Timeline', desc: 'Typically 8-12 months from filing to trial' },
              { icon: Users, title: 'Representation', desc: 'You can represent yourself or hire a paralegal or lawyer' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
                <item.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">The Small Claims Court Process</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {[
                { step: 1, title: 'File Your Claim', desc: 'Complete the Plaintiff\'s Claim form and pay the filing fee ($102-$238). Serve the defendant within 6 months.' },
                { step: 2, title: 'Defendant Responds', desc: 'Defendant has 20 days to file a Defence (and possibly a Defendant\'s Claim against you).' },
                { step: 3, title: 'Settlement Conference', desc: 'Mandatory meeting with a judge to try to settle. Bring all documents and be prepared to negotiate.' },
                { step: 4, title: 'Trial', desc: 'If no settlement, proceed to trial. Present evidence, examine witnesses, make arguments.' },
                { step: 5, title: 'Judgment', desc: 'Judge decides the case. May give judgment immediately or reserve decision.' },
                { step: 6, title: 'Collection', desc: 'If you win, you may need to take steps to collect (garnishment, seizure, examination).' },
              ].map((item, index) => (
                <div key={item.step} className="flex gap-4 mb-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading font-bold text-lg">
                      {item.step}
                    </div>
                    {index < 5 && <div className="w-0.5 h-full bg-primary/30 mt-2" />}
                  </div>
                  <div className="bg-white p-5 rounded-xl shadow-sm flex-1">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="font-paragraph text-foreground/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Settlement Conference */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">The Settlement Conference</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <MessageSquare className="w-10 h-10 text-primary mb-4" />
              <p className="font-paragraph text-foreground/80 mb-6">
                This is a crucial step where many cases settle. Here's what to expect:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-3">What Happens</h3>
                  <ul className="space-y-2">
                    {[
                      'Meeting with a judge (not the trial judge)',
                      'Judge reviews the case with both parties',
                      'Identifies issues and evidence',
                      'Explores settlement options',
                      'May give opinion on strength of case',
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/70 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-3">What to Bring</h3>
                  <ul className="space-y-2">
                    {[
                      'All documents supporting your case',
                      'List of witnesses you plan to call',
                      'Settlement authority (know your bottom line)',
                      'Completed Settlement Conference Brief',
                      'Copies for other party and judge',
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/70 text-sm">
                        <FileText className="w-4 h-4 text-primary flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trial Tips */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Trial Day Tips</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { title: 'Arrive Early', desc: 'Get there 30 minutes before your scheduled time. Find the courtroom and check in.' },
              { title: 'Dress Appropriately', desc: 'Business casual at minimum. No hats, shorts, or revealing clothing.' },
              { title: 'Organize Your Evidence', desc: 'Have documents in order, tabbed, with copies for judge and other party.' },
              { title: 'Be Respectful', desc: 'Address the judge as "Your Honour." Stand when speaking. Don\'t interrupt.' },
              { title: 'Stick to Facts', desc: 'Tell what happened clearly and chronologically. Avoid emotional arguments.' },
              { title: 'Listen Carefully', desc: 'Answer only what\'s asked. Don\'t volunteer extra information.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-sm">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Need Help With Your Case?</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to discuss your Small Claims matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-gray-100 transition-colors">
              Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/services/small-claims" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-white/10 transition-colors">
              Small Claims Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
