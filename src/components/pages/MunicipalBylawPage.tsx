import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, CheckCircle, AlertTriangle, Building2, Volume2, Car, Dog, Hammer } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MunicipalBylawPage() {
  useEffect(() => {
    document.title = 'Municipal By-law Violations | By-law Tickets Ontario | Paralegal | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Fight municipal by-law tickets in Ontario. Noise complaints, parking, property standards, animal control violations. Paralegal defence London, St. Thomas, Woodstock. Free consultation.');
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
              <Building2 className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Provincial Offences</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Municipal By-law Violations
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              By-law tickets can result in significant fines and ongoing compliance issues. We help property owners, tenants, and businesses fight unfair by-law enforcement.
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

      {/* Common By-law Violations */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Common By-law Violations</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Volume2, title: 'Noise By-laws', desc: 'Loud music, barking dogs, construction noise, parties' },
              { icon: Car, title: 'Parking Violations', desc: 'Overtime parking, no parking zones, fire routes' },
              { icon: Building2, title: 'Property Standards', desc: 'Unkempt yards, building maintenance, garbage' },
              { icon: Hammer, title: 'Building/Permits', desc: 'Construction without permit, zoning violations' },
              { icon: Dog, title: 'Animal Control', desc: 'Dogs at large, dangerous dogs, exotic animals' },
              { icon: Shield, title: 'Business Licensing', desc: 'Operating without licence, licence violations' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-sm">
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Penalties */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Potential Consequences</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <ul className="space-y-4">
                {[
                  { consequence: 'Fines', desc: 'Set fines or court-imposed fines up to thousands of dollars' },
                  { consequence: 'Daily Fines', desc: 'Some violations carry daily penalties until resolved' },
                  { consequence: 'Compliance Orders', desc: 'Orders to fix the violation within specified time' },
                  { consequence: 'Municipal Action', desc: 'City may do the work and bill you (e.g., yard cleanup)' },
                  { consequence: 'Lien on Property', desc: 'Unpaid fines can become liens against your property' },
                  { consequence: 'Court Costs', desc: 'If convicted at trial, court costs added to fine' },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-heading font-bold text-foreground">{item.consequence}: </span>
                      <span className="font-paragraph text-foreground/70">{item.desc}</span>
                    </div>
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Possible Defences</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { title: 'By-law Doesn\'t Apply', desc: 'The specific by-law doesn\'t apply to your situation or property.' },
              { title: 'Factual Dispute', desc: 'The alleged violation didn\'t actually occur as described.' },
              { title: 'Due Diligence', desc: 'You took all reasonable steps to comply with the by-law.' },
              { title: 'Notice Issues', desc: 'You weren\'t properly notified of the violation or requirements.' },
              { title: 'Procedural Errors', desc: 'The by-law officer made errors in enforcement or documentation.' },
              { title: 'Unreasonable Enforcement', desc: 'Selective or discriminatory enforcement of the by-law.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">Municipalities We Serve</h2>
          <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-4">
            {[
              'City of London',
              'St. Thomas',
              'Woodstock',
              'Strathroy-Caradoc',
              'Tillsonburg',
              'Ingersoll',
              'Aylmer',
              'Chatham-Kent',
              'Middlesex County',
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="font-paragraph text-foreground text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Fight Your By-law Ticket</h2>
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
