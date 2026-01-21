import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, CheckCircle, AlertTriangle, FileX, FileText, Gavel, Ban } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FailToComplyPage() {
  useEffect(() => {
    document.title = 'Fail to Comply Defence | Breach of Probation Ontario | Paralegal | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Charged with fail to comply or breach of probation in Ontario? We defend breach charges. Protect your freedom. Paralegal representation London. Free consultation.');
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
              Fail to Comply & Breach of Probation
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Breaching conditions of bail, probation, or an undertaking is a serious charge that can result in jail. We help people facing breach charges understand their options and mount an effective defence.
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

      {/* Types of Breach */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Types of Breach Charges</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { title: 'Fail to Comply with Release Order (s. 145)', desc: 'Violating conditions of bail or judicial interim release while awaiting trial.' },
              { title: 'Breach of Probation (s. 733.1)', desc: 'Violating conditions of a probation order after being sentenced.' },
              { title: 'Fail to Comply with Undertaking', desc: 'Breaking promises made to police or court for release.' },
              { title: 'Breach of Peace Bond (s. 811)', desc: 'Violating conditions of a peace bond (recognizance).' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Breaches */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Common Condition Violations</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { condition: 'No Contact', desc: 'Contacting a person you were ordered not to contact—directly, indirectly, or through social media.' },
                { condition: 'Curfew Violation', desc: 'Being outside your residence during prohibited hours.' },
                { condition: 'Area Restriction', desc: 'Going to a location you were ordered to stay away from.' },
                { condition: 'Alcohol/Drug', desc: 'Consuming alcohol or drugs when prohibited, or failing drug tests.' },
                { condition: 'Report to Bail', desc: 'Missing appointments with your bail supervisor or probation officer.' },
                { condition: 'Reside at Address', desc: 'Not living at the approved address or moving without permission.' },
              ].map((item, index) => (
                <div key={index} className={`p-5 flex items-start gap-4 ${index !== 5 ? 'border-b border-gray-100' : ''}`}>
                  <FileX className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">{item.condition}</h3>
                    <p className="font-paragraph text-foreground/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Penalties */}
      <section className="py-16 md:py-20 bg-red-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Potential Consequences</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <ul className="space-y-3">
                {[
                  'Up to 2 years in jail (summary conviction) or 4 years (indictment)',
                  'Bail may be revoked—you could be held in custody pending trial',
                  'Additional criminal charge on top of the original offence',
                  'Makes it harder to get bail on future charges',
                  'Can affect sentencing on the original charge',
                  'Criminal record for the breach itself',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 font-paragraph text-foreground/80">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Defences */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Defence Strategies</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { title: 'No Wilful Breach', desc: 'The breach wasn\'t intentional. You didn\'t know or understand the condition.' },
              { title: 'Lawful Excuse', desc: 'You had a legitimate reason for the breach—emergency, medical necessity, etc.' },
              { title: 'No Actual Breach', desc: 'The facts don\'t actually show a violation of the specific condition.' },
              { title: 'Ambiguous Conditions', desc: 'The condition was unclear or could reasonably be interpreted differently.' },
              { title: 'Identity/Location', desc: 'You weren\'t actually at the prohibited location or not the person who made contact.' },
              { title: 'Charter Violations', desc: 'Your rights were violated in the investigation or arrest.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bail Implications */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">Bail Revocation Risk</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="font-paragraph text-foreground/80 mb-4">
                If you're charged with breaching bail conditions, you may face a bail revocation hearing:
              </p>
              <ul className="space-y-3">
                {[
                  'The Crown can apply to have your bail cancelled',
                  'You may be held in custody until trial',
                  'Getting new bail becomes more difficult',
                  'A surety who signed for you may lose their deposit',
                  'Acting quickly is critical to preserve your release',
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

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Facing Breach Charges? Act Fast</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Time is critical. Free consultation to review your case and protect your freedom.
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
