import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, AlertTriangle, UserX, FileText, Gavel, Ban } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SimpleAssaultPage() {
  useEffect(() => {
    document.title = 'Simple Assault Defence | Assault Charges Ontario | Paralegal | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Charged with simple assault in Ontario? We defend assault charges including domestic assault. Protect your record. Paralegal representation London. Free consultation.');
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
              <Gavel className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Criminal Defence</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Simple Assault Defence
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              An assault charge can change your life—affecting employment, travel, and relationships. We provide experienced defence for assault charges and work to protect your future.
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

      {/* What is Assault */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What is Simple Assault?</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                Under section 265 of the Criminal Code, assault occurs when a person:
              </p>
              <ul className="space-y-4">
                {[
                  'Applies force intentionally to another person without their consent',
                  'Attempts or threatens to apply force to another person',
                  'Accosts or impedes another person while openly wearing or carrying a weapon',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 font-paragraph text-foreground/80">
                    <UserX className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
              <div className="bg-amber-50 p-4 rounded-lg mt-6">
                <p className="font-paragraph text-amber-800">
                  <strong>Important:</strong> No injury is required. Even unwanted touching or threatening gestures can constitute assault.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types We Handle */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Types of Assault Cases</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { title: 'Simple Assault (s. 266)', desc: 'Basic assault without weapons or serious injury. Includes pushing, slapping, punching.' },
              { title: 'Domestic Assault', desc: 'Assault involving intimate partners or family members. Subject to special prosecution policies.' },
              { title: 'Bar/Restaurant Altercations', desc: 'Fights that occur at bars, clubs, or social gatherings.' },
              { title: 'Workplace Incidents', desc: 'Physical altercations that occur in work environments.' },
              { title: 'Neighbour Disputes', desc: 'Confrontations between neighbours that escalate to physical contact.' },
              { title: 'Uttering Threats', desc: 'Threatening to cause death or bodily harm—often charged alongside assault.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Penalties */}
      <section className="py-16 md:py-20 bg-red-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Potential Consequences</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-4">Criminal Penalties</h3>
                  <ul className="space-y-2">
                    {[
                      'Up to 5 years in prison (if Crown proceeds by indictment)',
                      'Up to 2 years less a day (summary conviction)',
                      'Probation with conditions',
                      'Criminal record',
                      'DNA order',
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/70 text-sm">
                        <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-4">Other Consequences</h3>
                  <ul className="space-y-2">
                    {[
                      'No-contact orders with complainant',
                      'Weapons prohibition',
                      'Employment difficulties (especially security, healthcare)',
                      'Immigration consequences',
                      'US travel ban',
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/70 text-sm">
                        <Ban className="w-4 h-4 text-red-600 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Defence Strategies */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Defence Strategies</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { title: 'Self-Defence', desc: 'You were defending yourself from an attack. The force used must be reasonable in the circumstances.' },
              { title: 'Defence of Another', desc: 'You were protecting someone else from harm.' },
              { title: 'Consent', desc: 'The other person consented to the physical contact (e.g., mutual fight, contact sports).' },
              { title: 'No Intent', desc: 'The contact was accidental, not intentional. You didn\'t mean to touch them.' },
              { title: 'Identity', desc: 'You weren\'t the person who committed the assault. Mistaken identification.' },
              { title: 'Fabrication', desc: 'The complainant is lying or exaggerating what happened.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domestic Assault */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">Domestic Assault Cases</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="font-paragraph text-foreground/80 mb-4">
                Domestic assault charges are treated very seriously by the Crown:
              </p>
              <ul className="space-y-3">
                {[
                  'Police must lay charges if they have grounds—the complainant cannot "drop" charges',
                  'No-contact conditions are almost always imposed at bail',
                  'Crown prosecutors rarely withdraw charges without strong reasons',
                  'Special domestic violence courts exist in many jurisdictions',
                  'Peace bonds may be available for first offences with minor injuries',
                  'Diversion is sometimes possible but varies by jurisdiction',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">How We Defend You</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { step: '1', title: 'Case Review', desc: 'We review all evidence, interview you about what happened, and identify defence strategies.' },
              { step: '2', title: 'Disclosure Analysis', desc: 'We obtain and carefully analyze all Crown evidence—witness statements, 911 calls, videos.' },
              { step: '3', title: 'Negotiate/Challenge', desc: 'We negotiate with the Crown for withdrawal, peace bond, or reduced charges where appropriate.' },
              { step: '4', title: 'Trial if Necessary', desc: 'If a fair resolution isn\'t possible, we take your case to trial and fight for acquittal.' },
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
          <Shield className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Facing Assault Charges?</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your case and discuss your defence options.
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
            Licensed by the Law Society of Ontario | Summary conviction defence
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
