import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, CheckCircle, AlertTriangle, FileText, Gavel, Car, Building } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProvincialOffencesPage() {
  useEffect(() => {
    document.title = 'Provincial Offences Act Defence | POA Tickets Ontario | Paralegal | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Charged under the Provincial Offences Act? We defend POA tickets including traffic, regulatory, and by-law offences across Ontario. Free consultation London.');
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
              <span className="font-paragraph text-sm font-medium">Provincial Offences</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Provincial Offences Act Defence
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              The Provincial Offences Act (POA) governs prosecutions for provincial law violations—from traffic tickets to regulatory offences. We provide experienced representation for all types of POA matters.
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

      {/* What is POA */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What Are Provincial Offences?</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                Provincial offences are violations of Ontario provincial laws—not federal criminal law. They're prosecuted in Provincial Offences Court and include:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: Car, title: 'Highway Traffic Act', desc: 'Speeding, careless driving, licence suspensions, vehicle violations' },
                  { icon: Building, title: 'Regulatory Offences', desc: 'Business licensing, health and safety, environmental violations' },
                  { icon: FileText, title: 'Municipal By-laws', desc: 'Noise, parking, property standards, zoning violations' },
                  { icon: Scale, title: 'Other Provincial Acts', desc: 'Trespass, liquor licence, fish and wildlife, employment standards' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <item.icon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-heading font-bold text-foreground">{item.title}</h3>
                      <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Differences */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">POA vs. Criminal Charges</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-primary">
              <h3 className="font-heading text-xl font-bold text-primary mb-4">Provincial Offences</h3>
              <ul className="space-y-2">
                {[
                  'No criminal record',
                  'Lower burden of proof (balance of probabilities for some)',
                  'Generally lower penalties',
                  'Heard in Provincial Offences Court',
                  'Paralegals can represent you',
                  'Still serious consequences (fines, suspensions)',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/70 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
              <h3 className="font-heading text-xl font-bold text-red-700 mb-4">Criminal Charges</h3>
              <ul className="space-y-2">
                {[
                  'Creates criminal record',
                  'Beyond reasonable doubt required',
                  'Can include jail time',
                  'Heard in Criminal Court',
                  'Lawyers required for serious matters',
                  'More procedural protections',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/70 text-sm">
                    <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Your Options */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Your Options When You Get a Ticket</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { option: 'Pay the Fine', desc: 'Plead guilty and pay. Fastest option but results in conviction, demerit points, and insurance impact.' },
                { option: 'Request Early Resolution', desc: 'Meet with a prosecutor to discuss reducing the charge. Available for many offences.' },
                { option: 'Request a Trial', desc: 'Fight the charge in court. The prosecution must prove the case against you.' },
                { option: 'Fail to Respond', desc: 'The worst option—results in conviction and additional penalties. Don\'t do this.' },
              ].map((item, index) => (
                <div key={index} className={`p-5 flex items-start gap-4 ${index !== 3 ? 'border-b border-gray-100' : ''}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-heading font-bold text-sm ${index === 3 ? 'bg-red-100 text-red-700' : 'bg-primary/10 text-primary'}`}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">{item.option}</h3>
                    <p className="font-paragraph text-foreground/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">How We Help</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { step: '1', title: 'Review Your Ticket', desc: 'We examine the charge, evidence, and circumstances to determine the best strategy.' },
              { step: '2', title: 'Request Disclosure', desc: 'We obtain the prosecutor\'s evidence—officer\'s notes, calibration records, etc.' },
              { step: '3', title: 'Negotiate or Fight', desc: 'We pursue early resolution for reduced charges or take the matter to trial.' },
              { step: '4', title: 'Court Representation', desc: 'We appear on your behalf so you don\'t have to miss work or deal with court yourself.' },
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Fight Your Provincial Offence</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your ticket and discuss your options.
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
            Licensed by the Law Society of Ontario | Provincial Offences Act representation
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
