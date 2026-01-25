import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, CheckCircle, AlertTriangle, Wine, Store, Users, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LiquorLicenceActPage() {
  useEffect(() => {
    document.title = 'Liquor Licence Act Violations | AGCO Charges Ontario | Paralegal | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Charged under the Liquor Licence Act? We defend individuals and businesses against LLA offences including underage drinking, over-serving, and licence violations. Free consultation London.');
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
              <Wine className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Provincial Offences</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Liquor Licence Act Defence
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Liquor violations can affect individuals with fines and bars/restaurants with their licences. We defend both individuals and businesses against Liquor Licence Act charges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors">
                Free Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:3658829515" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/5 transition-colors">
                Call 365-882-9515
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Common Offences */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Common Liquor Offences</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <Users className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Individual Offences</h3>
                <ul className="space-y-2">
                  {[
                    'Minor in possession of alcohol',
                    'Using false ID to purchase alcohol',
                    'Public intoxication',
                    'Open liquor in public',
                    'Consuming in unlicensed area',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/70 text-sm">
                      <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <Store className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Business Offences</h3>
                <ul className="space-y-2">
                  {[
                    'Serving intoxicated patrons',
                    'Serving minors',
                    'Operating without proper licence',
                    'Violating licence conditions',
                    'After-hours service',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/70 text-sm">
                      <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Penalties */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Potential Penalties</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">For Individuals</h3>
              <ul className="space-y-3">
                {[
                  'Fines from $100 to $100,000+',
                  'Licence suspension (for minors)',
                  'Vehicle impoundment (open liquor)',
                  'Criminal charges in serious cases',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/70">
                    <Scale className="w-4 h-4 text-primary flex-shrink-0 mt-1" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">For Businesses</h3>
              <ul className="space-y-3">
                {[
                  'Fines up to $250,000+',
                  'Licence suspension',
                  'Licence revocation',
                  'Conditions added to licence',
                  'Personal liability for directors',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/70">
                    <Scale className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" /> {item}
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
              { title: 'Due Diligence', desc: 'For businesses: you took all reasonable steps to prevent the violation.' },
              { title: 'Mistaken Age', desc: 'The minor appeared of legal age and showed convincing ID.' },
              { title: 'Not Intoxicated', desc: 'Challenge the assessment that the patron/person was actually intoxicated.' },
              { title: 'Private Property', desc: 'The consumption occurred on private property where it was permitted.' },
              { title: 'Procedural Errors', desc: 'Errors in how the investigation or charge was conducted.' },
              { title: 'Charter Violations', desc: 'Your rights were violated during the investigation.' },
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
          <Shield className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Fight Your Liquor Charge</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your ticket and discuss your options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-gray-100 transition-colors">
              Book Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:3658829515" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-white/10 transition-colors">
              Call 365-882-9515
            </a>
          </div>
        </div>
      </section>

      {/* LSO Badge */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <p className="font-paragraph text-sm text-foreground/60">
            <Shield className="w-4 h-4 inline mr-1" />
            Licensed by the Law Society of Ontario | Provincial Offences Act representation
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
