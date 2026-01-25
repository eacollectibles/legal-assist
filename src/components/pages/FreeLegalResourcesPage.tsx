import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, ExternalLink, FileText, Scale, Home, Car, Briefcase, Users, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FreeLegalResourcesPage() {
  // SEO handled by AutoSEO component

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <FileText className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Free Resources</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Free Legal Resources in Ontario
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              A comprehensive directory of government websites, tribunal resources, forms, and free legal help available in Ontario.
            </p>
          </div>
        </div>
      </section>

      {/* Tribunals & Courts */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Tribunals & Courts</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { icon: Home, name: 'Landlord and Tenant Board', url: 'https://tribunalsontario.ca/ltb/', desc: 'File applications, find forms, check hearing schedules' },
              { icon: Scale, name: 'Small Claims Court', url: 'https://www.ontariocourts.ca/scj/small-claims/', desc: 'Court guides, forms, fee schedules' },
              { icon: Car, name: 'Provincial Offences Court', url: 'https://www.ontario.ca/page/provincial-offences-act-tickets', desc: 'Pay tickets, request trials, find court locations' },
              { icon: Users, name: 'Human Rights Tribunal', url: 'https://tribunalsontario.ca/hrto/', desc: 'File complaints, guides, decisions database' },
              { icon: Briefcase, name: 'Ontario Labour Relations Board', url: 'https://www.olrb.gov.on.ca/', desc: 'Employment-related disputes and complaints' },
              { icon: Shield, name: 'Workplace Safety Appeals', url: 'https://www.wsiat.on.ca/', desc: 'WSIB appeals and workplace safety matters' },
            ].map((item, index) => (
              <a key={index} href={item.url} target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                  {item.name} <ExternalLink className="w-4 h-4" />
                </h3>
                <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Government Resources */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Government Resources</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { name: 'Ministry of Labour', url: 'https://www.ontario.ca/page/ministry-labour-immigration-training-skills-development', desc: 'Employment standards, file ESA claims, workplace rights' },
              { name: 'ServiceOntario', url: 'https://www.ontario.ca/page/serviceontario', desc: 'Driver\'s licences, vehicle registration, record requests' },
              { name: 'Legal Aid Ontario', url: 'https://www.legalaid.on.ca/', desc: 'Check eligibility for free legal services' },
              { name: 'Law Society Referral', url: 'https://lso.ca/public-resources/finding-a-lawyer-or-paralegal/law-society-referral-service', desc: 'Free 30-minute consultation with a lawyer' },
              { name: 'Community Legal Clinics', url: 'https://www.legalaid.on.ca/legal-clinics/', desc: 'Find free legal clinics in your area' },
              { name: 'Steps to Justice', url: 'https://stepstojustice.ca/', desc: 'Plain-language legal information on many topics' },
            ].map((item, index) => (
              <a key={index} href={item.url} target="_blank" rel="noopener noreferrer" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                  {item.name} <ExternalLink className="w-4 h-4" />
                </h3>
                <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Forms */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Commonly Needed Forms</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { form: 'LTB Forms', desc: 'All landlord and tenant applications', url: 'https://tribunalsontario.ca/ltb/forms/' },
                { form: 'Small Claims Forms', desc: 'Plaintiff\'s Claim, Defence, etc.', url: 'https://ontariocourtforms.on.ca/en/small-claims-court-forms/' },
                { form: 'HRTO Application', desc: 'Human rights complaint forms', url: 'https://tribunalsontario.ca/hrto/forms-filing/' },
                { form: 'Traffic Ticket Response', desc: 'Request trial or early resolution', url: 'https://www.ontario.ca/page/fight-your-traffic-ticket' },
                { form: 'ESA Claim Form', desc: 'Employment standards complaint', url: 'https://www.ontario.ca/document/your-guide-employment-standards-act/filing-claim' },
              ].map((item, index) => (
                <a key={index} href={item.url} target="_blank" rel="noopener noreferrer" className={`p-5 flex items-center justify-between hover:bg-gray-50 transition-colors ${index !== 4 ? 'border-b border-gray-100' : ''}`}>
                  <div>
                    <h3 className="font-heading font-bold text-foreground">{item.form}</h3>
                    <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-primary flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Crisis Resources */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Emergency & Crisis Resources</h2>
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { name: 'Assaulted Women\'s Helpline', phone: '1-866-863-0511', desc: '24/7 support for women experiencing abuse' },
              { name: 'Legal Aid Emergency', phone: '1-800-668-8258', desc: 'Urgent legal matters' },
              { name: 'Tenant Hotline', phone: '416-921-9494', desc: 'Toronto area tenant rights info' },
              { name: 'Workers Action Centre', phone: '416-531-0778', desc: 'Employment rights information' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-sm">
                <Phone className="w-6 h-6 text-amber-600 mb-2" />
                <h3 className="font-heading font-bold text-foreground">{item.name}</h3>
                <p className="font-heading text-lg text-primary font-bold">{item.phone}</p>
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Need Professional Help?</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free resources are great, but sometimes you need someone in your corner. Free consultation available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-gray-100 transition-colors">
              Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/services" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-white/10 transition-colors">
              Our Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
