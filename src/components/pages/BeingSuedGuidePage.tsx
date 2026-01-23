import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, AlertTriangle, Clock, CheckCircle, FileText, Scale, Calendar, Ban } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BeingSuedGuidePage() {
  useEffect(() => {
    document.title = 'What to Do When You\'re Sued in Ontario | Step-by-Step Guide | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Received a Small Claims Court claim? Don\'t panic. This guide explains your options, deadlines, and how to defend yourself. Free information.');
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
              What to Do When You're Sued
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Getting served with a lawsuit is stressful, but you have rights and options. This guide explains exactly what to do.
            </p>
          </div>
        </div>
      </section>

      {/* Don't Panic */}
      <section className="py-16 md:py-20 bg-red-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">First: Don't Panic, Don't Ignore It</h2>
            <p className="font-paragraph text-foreground/80 mb-6">
              The worst thing you can do is ignore a lawsuit. If you don't respond, the plaintiff can get a <strong>default judgment</strong> against you—meaning they win automatically and can start collecting.
            </p>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="font-paragraph text-red-700 font-medium">
                ⏰ You have only <strong>20 days</strong> to file your Defence (or 40 days if served outside Ontario).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps to Take */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Steps to Take Immediately</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { step: 1, title: 'Note the Deadline', desc: 'Calculate 20 days from when you were served. Mark it on your calendar. This is your absolute deadline to respond.' },
              { step: 2, title: 'Read Everything Carefully', desc: 'Read the Plaintiff\'s Claim completely. Understand exactly what they\'re claiming and how much.' },
              { step: 3, title: 'Gather Your Documents', desc: 'Collect any contracts, emails, receipts, or evidence related to the dispute. These will be crucial.' },
              { step: 4, title: 'Decide Your Response', desc: 'You can: (a) File a Defence, (b) Try to settle, (c) Admit part and dispute part, (d) Make your own claim against them.' },
              { step: 5, title: 'File Your Defence', desc: 'Complete the Defence form and file it with the court. Pay the filing fee ($73). Serve a copy on the plaintiff.' },
              { step: 6, title: 'Consider Getting Help', desc: 'If the amount is significant or the case is complex, consult a paralegal or lawyer.' },
            ].map((item) => (
              <div key={item.step} className="bg-white p-6 rounded-xl shadow-sm flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading font-bold text-lg">
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

      {/* Your Options */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Your Response Options</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { title: 'File a Defence', desc: 'Dispute the claim entirely or in part. Explain why you don\'t owe what they\'re claiming.', best: 'Best if you believe you don\'t owe the money' },
              { title: 'Make a Defendant\'s Claim', desc: 'If the plaintiff actually owes YOU money, you can counter-sue in the same proceeding.', best: 'Best if you have your own claim against them' },
              { title: 'Propose a Settlement', desc: 'Contact the plaintiff to negotiate. Many cases settle before trial.', best: 'Best if you want to avoid court and can negotiate' },
              { title: 'Admit and Pay', desc: 'If you owe the money, admitting can avoid additional costs and interest.', best: 'Best if you clearly owe and want to resolve it' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70 text-sm mb-3">{item.desc}</p>
                <p className="font-paragraph text-primary text-sm font-medium">{item.best}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Defences */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Common Defences</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { defence: 'You Don\'t Owe the Amount', desc: 'The debt has been paid, or the amount is wrong.' },
              { defence: 'No Contract Exists', desc: 'There was no valid agreement.' },
              { defence: 'Contract Was Breached', desc: 'The plaintiff didn\'t fulfill their end.' },
              { defence: 'Limitation Period Expired', desc: 'In Ontario, most claims must be brought within 2 years.' },
              { defence: 'Wrong Person', desc: 'You\'re not the person who owes the debt.' },
              { defence: 'Set-Off', desc: 'The plaintiff owes you money that offsets their claim.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-sm">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.defence}</h3>
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Being Sued? Get Help Fast.</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your claim and discuss your defence options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-gray-100 transition-colors">
              Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/services/small-claims" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-white/10 transition-colors">
              Defence Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
