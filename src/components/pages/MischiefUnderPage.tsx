import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, AlertTriangle, Hammer, FileText, Gavel, Ban } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MischiefUnderPage() {
  useEffect(() => {
    document.title = 'Mischief Under $5000 Defence | Property Damage Charges Ontario | Paralegal | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Charged with mischief under $5000 in Ontario? Property damage, vandalism, graffiti charges. Avoid a criminal record. Paralegal defence London. Free consultation.');
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
              Mischief Under $5,000 Defence
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Mischief charges cover property damage, vandalism, and interference with property. Even minor damage can lead to a criminal record. We help you fight these charges and protect your future.
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

      {/* What is Mischief */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What is Mischief?</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                Under section 430 of the Criminal Code, mischief occurs when someone:
              </p>
              <ul className="space-y-4">
                {[
                  'Destroys or damages property',
                  'Renders property dangerous, useless, or inoperative',
                  'Obstructs, interrupts, or interferes with the lawful use of property',
                  'Obstructs, interrupts, or interferes with any person\'s lawful use of property',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 font-paragraph text-foreground/80">
                    <Hammer className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
              <div className="bg-amber-50 p-4 rounded-lg mt-6">
                <p className="font-paragraph text-amber-800">
                  <strong>Note:</strong> You can be charged with mischief even if you own the property jointly with someone else, or if the damage was accidental but reckless.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Examples */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Common Mischief Charges</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { title: 'Vandalism', desc: 'Damaging buildings, vehicles, or other property through scratching, breaking, or defacing.' },
              { title: 'Graffiti', desc: 'Spray painting or marking property without permission, even if considered "art."' },
              { title: 'Vehicle Damage', desc: 'Keying cars, slashing tires, breaking windows, or damaging someone\'s vehicle.' },
              { title: 'Domestic Mischief', desc: 'Damaging property during a domestic dispute—breaking phones, punching walls, etc.' },
              { title: 'Interference with Property', desc: 'Blocking driveways, tampering with utilities, or interfering with business operations.' },
              { title: 'Computer Mischief', desc: 'Damaging or interfering with computer data or systems.' },
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Potential Penalties</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-3">Mischief Under $5,000</h3>
                  <ul className="space-y-2">
                    {[
                      'Up to 2 years less a day in jail',
                      'Fines',
                      'Probation',
                      'Restitution to the victim',
                      'Criminal record',
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/70 text-sm">
                        <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-3">Additional Consequences</h3>
                  <ul className="space-y-2">
                    {[
                      'Civil lawsuit from property owner',
                      'No-contact orders',
                      'Employment difficulties',
                      'Immigration consequences',
                      'Travel restrictions',
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

      {/* Defences */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Defence Strategies</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { title: 'Accident', desc: 'The damage was accidental, not intentional or reckless. Mischief requires intent.' },
                { title: 'Colour of Right', desc: 'You believed you had a legal right to the property or to act as you did.' },
                { title: 'Consent', desc: 'The property owner gave you permission to do what you did.' },
                { title: 'Identity', desc: 'You weren\'t the person who caused the damage. Mistaken identification.' },
                { title: 'No Damage', desc: 'The property wasn\'t actually damaged, or the damage existed before.' },
                { title: 'Charter Violations', desc: 'Evidence obtained through violations of your rights may be excluded.' },
              ].map((item, index) => (
                <div key={index} className={`p-5 flex items-start gap-4 ${index !== 5 ? 'border-b border-gray-100' : ''}`}>
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

      {/* Domestic Context */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">Mischief in Domestic Situations</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="font-paragraph text-foreground/80 mb-4">
                Mischief charges often arise during domestic disputes. Important considerations:
              </p>
              <ul className="space-y-3">
                {[
                  'You can be charged even for damaging your own property if it\'s jointly owned',
                  'Domestic mischief charges often come with no-contact conditions',
                  'May affect family court proceedings and custody',
                  'Crown prosecutors treat domestic charges seriously',
                  'Diversion is still sometimes possible for first offences',
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Fight Your Mischief Charge</h2>
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
