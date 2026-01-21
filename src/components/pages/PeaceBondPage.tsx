import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, CheckCircle, AlertTriangle, FileText, Gavel, Heart, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PeaceBondPage() {
  useEffect(() => {
    document.title = 'Peace Bond | Section 810 Recognizance Ontario | Paralegal | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Learn about peace bonds in Ontario. Section 810 recognizance can resolve criminal charges without conviction. We help negotiate peace bonds and defend breaches. Free consultation.');
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
              <span className="font-paragraph text-sm font-medium">Criminal Law</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Peace Bonds in Ontario
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              A peace bond can resolve criminal charges without a conviction or criminal record. We help clients negotiate peace bonds and defend against peace bond applications or breach charges.
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

      {/* What is a Peace Bond */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What is a Peace Bond?</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                A peace bond (also called a recognizance or section 810) is a court order requiring you to "keep the peace and be of good behaviour" for a set period—usually 12 months. It involves:
              </p>
              <ul className="space-y-4">
                {[
                  'A promise to the court to follow certain conditions',
                  'No admission of guilt or criminal conviction',
                  'Conditions similar to probation (no contact, no weapons, etc.)',
                  'Typically 6-12 months duration',
                  'Criminal charges are usually withdrawn in exchange',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 font-paragraph text-foreground/80">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
              <div className="bg-green-50 p-4 rounded-lg mt-6">
                <p className="font-paragraph text-green-800">
                  <strong>Key benefit:</strong> A peace bond does NOT result in a criminal record. After the period ends, there's no lasting record of the incident.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* When Used */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">When Peace Bonds Are Used</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { title: 'Domestic Situations', desc: 'Often used to resolve minor domestic assault or harassment cases, especially first offences.' },
              { title: 'Neighbour Disputes', desc: 'To resolve ongoing conflicts between neighbours that led to criminal charges.' },
              { title: 'Harassment Cases', desc: 'When someone fears harassment or stalking, even without formal charges.' },
              { title: 'Minor Assaults', desc: 'Simple assaults where the complainant supports resolution without conviction.' },
              { title: 'Uttering Threats', desc: 'Threat charges where the risk of future harm can be managed with conditions.' },
              { title: 'Preventive Peace Bonds', desc: 'When someone fears future harm, even if no crime has been committed yet.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Conditions */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Common Peace Bond Conditions</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { condition: 'Keep the Peace', desc: 'The mandatory condition—don\'t commit any criminal offences.' },
                { condition: 'No Contact', desc: 'No direct or indirect contact with named person(s).' },
                { condition: 'No Weapons', desc: 'Prohibition on possessing firearms or other weapons.' },
                { condition: 'Stay Away', desc: 'Don\'t go to specific addresses or areas.' },
                { condition: 'Counselling', desc: 'Attend anger management, domestic violence, or other counselling.' },
                { condition: 'No Alcohol/Drugs', desc: 'Abstain from alcohol or drug use.' },
              ].map((item, index) => (
                <div key={index} className={`p-5 flex items-start gap-4 ${index !== 5 ? 'border-b border-gray-100' : ''}`}>
                  <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
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

      {/* Pros and Cons */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Should You Accept a Peace Bond?</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
              <h3 className="font-heading text-xl font-bold text-green-700 mb-4">Advantages</h3>
              <ul className="space-y-2">
                {[
                  'No criminal conviction',
                  'No criminal record',
                  'Charges withdrawn',
                  'Avoids trial risk',
                  'Faster resolution',
                  'Less stressful than trial',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/70 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-amber-500">
              <h3 className="font-heading text-xl font-bold text-amber-700 mb-4">Considerations</h3>
              <ul className="space-y-2">
                {[
                  'Must follow conditions for 6-12 months',
                  'Breach is a criminal offence',
                  'May appear on some background checks',
                  'Not the same as being found innocent',
                  'Conditions may affect your life',
                  'Might be better to fight if innocent',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/70 text-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">How We Help</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <ul className="space-y-4">
                {[
                  { title: 'Negotiate Peace Bonds', desc: 'We negotiate with the Crown to resolve charges with a peace bond instead of conviction.' },
                  { title: 'Review Conditions', desc: 'We work to get reasonable conditions that won\'t unnecessarily restrict your life.' },
                  { title: 'Defend Against Applications', desc: 'If someone is seeking a peace bond against you, we can oppose it.' },
                  { title: 'Breach Defence', desc: 'If you\'re charged with breaching a peace bond, we defend those charges.' },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Scale className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
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

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Resolve Your Charges Without a Record</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to discuss whether a peace bond is right for your situation.
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
            Licensed by the Law Society of Ontario | Criminal matters within paralegal scope
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
