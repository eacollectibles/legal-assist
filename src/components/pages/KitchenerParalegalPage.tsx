import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, MapPin, Scale, Car, Home, Gavel, Clock, CheckCircle, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function KitchenerParalegalPage() {
  useEffect(() => {
    document.title = 'Kitchener Paralegal | Traffic Tickets, Small Claims, LTB | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Licensed paralegal serving Kitchener and Waterloo Region. Traffic ticket defence, Small Claims Court, Landlord Tenant Board representation. Free consultation.');
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
              <MapPin className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Serving Kitchener & Waterloo Region</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Kitchener Paralegal Services
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Affordable legal representation for Kitchener, Waterloo, and Cambridge residents. We handle traffic tickets, Small Claims Court disputes, and Landlord Tenant Board matters throughout Waterloo Region.
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

      {/* Services */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Our Services in Kitchener</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { icon: Car, title: 'Traffic Ticket Defence', desc: 'Speeding tickets on Highway 401, Highway 7/8, and Kitchener city streets. Careless driving, stunt driving, and licence suspensions.', link: '/services/traffic-tickets' },
              { icon: Scale, title: 'Small Claims Court', desc: 'Debt collection, contract disputes, property damage claims up to $35,000. We represent clients at Kitchener Small Claims Court.', link: '/services/small-claims' },
              { icon: Home, title: 'Landlord & Tenant Board', desc: 'Eviction defence, rent disputes, maintenance issues. Representation at LTB hearings for Waterloo Region properties.', link: '/services/landlord-tenant' },
              { icon: Gavel, title: 'Provincial Offences', desc: 'By-law violations, trespass charges, regulatory offences. Defence at Kitchener Provincial Offences Court.', link: '/services/provincial-offences' },
            ].map((service, index) => (
              <Link key={index} to={service.link} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <service.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">{service.title}</h3>
                <p className="font-paragraph text-foreground/70 mb-4">{service.desc}</p>
                <span className="text-primary font-medium inline-flex items-center gap-1">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Local Knowledge */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Local Court Knowledge</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <p className="font-paragraph text-foreground/80 mb-6">
                We regularly appear at courts serving Kitchener and Waterloo Region:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-3">Courts We Attend</h3>
                  <ul className="space-y-2">
                    {[
                      'Ontario Court of Justice - Kitchener',
                      'Small Claims Court - Kitchener',
                      'Provincial Offences Court',
                      'Landlord and Tenant Board (virtual)',
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/70 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-3">Areas Served</h3>
                  <ul className="space-y-2">
                    {[
                      'Kitchener',
                      'Waterloo',
                      'Cambridge',
                      'Elmira',
                      'New Hamburg',
                      'Wellesley',
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/70 text-sm">
                        <MapPin className="w-4 h-4 text-primary flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Why Kitchener Residents Choose Us</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              { title: 'Affordable Rates', desc: 'Paralegal services cost significantly less than lawyers while providing quality representation.' },
              { title: 'Flexible Scheduling', desc: 'Evening and weekend consultations available. We work around your schedule.' },
              { title: 'Virtual Options', desc: 'Many matters can be handled remotely—phone and video consultations available.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <Phone className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Need Legal Help in Kitchener?</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to discuss your case. Serving all of Waterloo Region.
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
            Licensed by the Law Society of Ontario | Serving Kitchener & Waterloo Region
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
