import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, CheckCircle, AlertTriangle, FileText, Gavel, Car, Building } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';

export default function ProvincialOffencesPage() {
  // SEO handled by AutoSEO component

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
              Provincial Offences Paralegal in Ontario
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              The Provincial Offences Act (POA) governs prosecutions for provincial law violations—from traffic tickets to regulatory offences. We provide experienced representation for all types of POA matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors">
                Free Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:2262725153" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/5 transition-colors">
                Call 226-272-5153
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
                  'Crown must still prove the offence beyond a reasonable doubt (POA s.46)',
                  'Generally lower penalties (fines, suspensions, no jail for most)',
                  'Heard in Provincial Offences Court (Ontario Court of Justice)',
                  'Licensed paralegals have a right of appearance under LSO By-Law 4',
                  'Strict-liability offences allow a "due diligence" defence on a balance of probabilities',
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

      {/* Specific Offences We Defend */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Specific Offences We Defend</h2>
          <p className="font-paragraph text-lg text-foreground/70 mb-12 text-center max-w-3xl mx-auto">
            Standalone defence pages for the most common Highway Traffic Act and other provincial-offence charges. Click through for fines, demerit points, defences, and FAQs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {[
              { url: '/services/speeding-ticket-defence', title: 'Speeding', desc: 'HTA s.128 - radar/laser, calibration challenges' },
              { url: '/services/careless-driving-defence', title: 'Careless Driving', desc: 'HTA s.130 - 6 demerit points' },
              { url: '/services/stunt-driving-defence', title: 'Stunt Driving', desc: 'HTA s.172 - 30-day suspension, vehicle impound' },
              { url: '/services/distracted-driving', title: 'Distracted Driving', desc: 'HTA s.78.1 - phone, vape, GPS' },
              { url: '/services/red-light-tickets', title: 'Red Light', desc: 'Camera vs officer-issued - different consequences' },
              { url: '/services/stop-sign-ticket', title: 'Stop Sign', desc: 'HTA s.136 - 3 demerit points' },
              { url: '/services/fail-to-stop-school-bus', title: 'Fail to Stop for School Bus', desc: 'HTA s.175(11) - 6 points, $400-$2,000' },
              { url: '/services/disobey-sign', title: 'Disobey Sign', desc: 'HTA s.182(2) - no-turn, one-way, lane-designation' },
              { url: '/services/fail-to-yield', title: 'Fail to Yield', desc: 'HTA s.135-141 - 3 demerit points' },
              { url: '/services/unsafe-lane-change', title: 'Unsafe Lane Change', desc: 'HTA s.142 - 2 demerit points' },
              { url: '/services/following-too-closely', title: 'Following Too Closely', desc: 'HTA s.158 - 4 demerit points' },
              { url: '/services/seatbelt-violations', title: 'Seatbelt Violation', desc: 'HTA s.106 - 2 demerit points' },
              { url: '/services/no-insurance-defence', title: 'No Insurance', desc: 'CAIA s.2(1)(c) - $5,000+ first offence' },
              { url: '/services/driving-while-suspended', title: 'Drive While Suspended', desc: 'HTA s.53 - significant consequences' },
              { url: '/services/fail-to-surrender', title: 'Fail to Surrender', desc: 'Licence / insurance / permit - no points' },
              { url: '/services/g1-g2-violations', title: 'G1 / G2 Violations', desc: 'Novice driver restrictions' },
              { url: '/services/school-zone-speeding', title: 'School Zone / Community Safety Zone', desc: 'Doubled fines' },
              { url: '/services/hov-lane-violations', title: 'HOV Lane', desc: 'HTA s.154.1 - 3 demerit points' },
              { url: '/services/commercial-vehicle-violations', title: 'Commercial Vehicle', desc: 'CVOR, log book, weight, equipment' },
              { url: '/services/trespass-to-property', title: 'Trespass to Property', desc: 'TPA - banned from store, no permission' },
              { url: '/services/liquor-licence-offences', title: 'Liquor Licence Offences', desc: 'LLCA - open liquor, public consumption' },
              { url: '/services/cannabis-control-offences', title: 'Cannabis Control', desc: 'CCA - vehicle, public consumption, supply' },
              { url: '/services/smoke-free-ontario-offences', title: 'Smoke-Free Ontario', desc: 'SFOA - prohibited places, supply to minor' },
              { url: '/services/off-road-vehicle-offences', title: 'ATV / Snowmobile', desc: 'ORVA / MSVA - permit, helmet, insurance' },
              { url: '/services/parking-tickets', title: 'Parking Tickets', desc: 'Municipal bylaw - handicapped, accessible' },
              { url: '/services/bylaw-infractions', title: 'Municipal Bylaw', desc: 'Noise, property standards, animals' },
              { url: '/services/dangerous-dog-hearings', title: 'Dangerous Dog Hearings', desc: 'DOLA / municipal' },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.url}
                className="bg-white border border-border rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all group"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                  <ArrowRight className="w-4 h-4 text-foreground/40 group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                </div>
                <p className="font-paragraph text-sm text-foreground/60">{item.desc}</p>
              </Link>
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
            <a href="tel:2262725153" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-white/10 transition-colors">
              Call 226-272-5153
            </a>
          </div>
          <p className="mt-6 font-paragraph text-sm opacity-75">
            Licensed by the Law Society of Ontario | Provincial Offences Act representation
          </p>
        </div>
      </section>

      <RelatedServices
        services={relatedServicesConfig.trafficTickets}
        title="Related Provincial Offences services"
      />

      <Footer />
    </div>
  );
}
