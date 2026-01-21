import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, CheckCircle, AlertTriangle, Ban, DollarSign, Clock, Car, Gavel } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DrivingWhileSuspendedPage() {
  useEffect(() => {
    document.title = 'Driving While Suspended Defence | Suspended Licence Ontario | Paralegal | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Charged with driving while suspended in Ontario? Face $1,000-$5,000 fines, further suspension, and possible jail. Expert paralegal defence. Free consultation London.');
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
              <Ban className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Traffic Ticket Defence</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Driving While Suspended Defence
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Driving while suspended is a serious offence with severe penalties including hefty fines, extended suspension, and possible jail time. We provide aggressive defence to protect your future.
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

      {/* Severe Penalties */}
      <section className="py-16 md:py-20 bg-red-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Driving While Suspended Penalties</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-red-200">
                <h3 className="font-heading text-xl font-bold text-red-700 mb-4">First Offence</h3>
                <ul className="space-y-3">
                  {[
                    'Fine: $1,000 - $5,000',
                    'Additional 6-month suspension',
                    'Possible jail: up to 6 months',
                    'Vehicle may be impounded',
                    'No demerit points (licence already suspended)',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/80">
                      <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-red-300">
                <h3 className="font-heading text-xl font-bold text-red-800 mb-4">Subsequent Offences</h3>
                <ul className="space-y-3">
                  {[
                    'Fine: $2,000 - $5,000',
                    'Additional 1-year suspension',
                    'Jail: up to 6 months (more likely)',
                    'Mandatory vehicle impound',
                    'Criminal record implications',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/80">
                      <Ban className="w-4 h-4 text-red-700 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Suspension */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Why Was Your Licence Suspended?</h2>
          <div className="max-w-4xl mx-auto">
            <p className="font-paragraph text-foreground/80 mb-8 text-center">
              The reason for suspension affects both the defence strategy and potential penalties:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Unpaid Fines', desc: 'Licence suspended for failing to pay fines. Common and often you didn\'t know about the suspension.' },
                { title: 'Demerit Points', desc: 'Too many demerit points triggered administrative suspension. Usually comes with warning letters.' },
                { title: 'Criminal Code (Impaired)', desc: 'DUI/impaired driving suspension. Most serious category with harshest penalties.' },
                { title: 'Medical Suspension', desc: 'Suspended for medical reasons. Different rules apply for these suspensions.' },
                { title: 'Insurance-Related', desc: 'Suspended due to insurance violations or lack of coverage.' },
                { title: 'Administrative', desc: 'Various administrative reasons including address change failures, unpaid child support, etc.' },
              ].map((item, index) => (
                <div key={index} className="bg-white p-5 rounded-xl shadow-sm">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Defences */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Possible Defences</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { title: 'No Knowledge of Suspension', desc: 'You genuinely didn\'t know your licence was suspended. Mail wasn\'t received, wrong address on file, etc.' },
                { title: 'Invalid Suspension', desc: 'The suspension itself was improperly issued or served. If the suspension is invalid, driving wasn\'t illegal.' },
                { title: 'Emergency Circumstances', desc: 'Medical emergency or other urgent situation required you to drive.' },
                { title: 'Suspension Had Ended', desc: 'You reasonably believed the suspension period had passed or reinstatement was complete.' },
                { title: 'Identity Issues', desc: 'You weren\'t actually the driver, or there\'s confusion about who was suspended.' },
                { title: 'Procedural Errors', desc: 'Errors in the charge, improper stop, or other procedural issues may invalidate the charge.' },
              ].map((item, index) => (
                <div key={index} className={`p-6 flex items-start gap-4 ${index !== 5 ? 'border-b border-gray-100' : ''}`}>
                  <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
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

      {/* The "Knew or Ought to Have Known" Test */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <Gavel className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">The "Knowledge" Defence</h2>
            <p className="font-paragraph text-foreground/80 mb-6 text-center">
              To convict you, the prosecution must prove you knew or ought to have known your licence was suspended:
            </p>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">Factors Courts Consider:</h3>
              <ul className="space-y-3">
                {[
                  'Was notice of suspension mailed to your correct address?',
                  'Did you actually receive the suspension notice?',
                  'Were there previous warnings or communications?',
                  'Did you take steps to verify your licence status?',
                  'How long had the suspension been in effect?',
                  'Had you been stopped and told about it before?',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/80">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Criminal vs POA */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">Criminal vs. Provincial Offence</h2>
            <p className="font-paragraph text-foreground/80 mb-6 text-center">
              Some driving while suspended charges are Criminal Code offences:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Provincial Offence (HTA)</h3>
                <p className="font-paragraph text-foreground/70 text-sm">
                  Most cases. Suspension due to unpaid fines, demerits, insurance. Handled in Provincial Offences Court. No criminal record but still serious.
                </p>
              </div>
              <div className="bg-white p-5 rounded-lg border-2 border-red-200">
                <h3 className="font-heading text-lg font-bold text-red-700 mb-2">Criminal Code Offence</h3>
                <p className="font-paragraph text-foreground/70 text-sm">
                  If suspension was due to impaired driving conviction. Criminal charge. Must be fought aggressively—results in criminal record.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What To Do */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">What To Do If You're Charged</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { step: '1', title: 'Don\'t Drive Again', desc: 'Driving again while suspended will result in additional, more serious charges.' },
              { step: '2', title: 'Determine Why', desc: 'Find out exactly why your licence is suspended. This affects your defence.' },
              { step: '3', title: 'Gather Evidence', desc: 'Collect any evidence showing you didn\'t know—address changes, undelivered mail, etc.' },
              { step: '4', title: 'Contact Us Immediately', desc: 'These are serious charges requiring immediate legal attention. Don\'t delay.' },
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Facing Driving While Suspended Charges?</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            These are serious charges. Free consultation to review your case and build your defence.
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
            Licensed by the Law Society of Ontario | Aggressive traffic ticket defence
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
