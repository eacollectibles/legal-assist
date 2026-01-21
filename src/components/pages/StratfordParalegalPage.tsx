import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, MapPin, Scale, Car, Home, Gavel, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function StratfordParalegalPage() {
  useEffect(() => {
    document.title = 'Stratford Paralegal | Traffic Tickets, Small Claims, LTB | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Licensed paralegal serving Stratford and Perth County. Traffic ticket defence, Small Claims Court, Landlord Tenant Board representation. Free consultation.');
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
              <span className="font-paragraph text-sm font-medium">Serving Stratford & Perth County</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Stratford Paralegal Services
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Affordable legal representation for Stratford, St. Marys, Mitchell, Listowel, and all of Perth County. Traffic tickets, Small Claims disputes, and landlord-tenant matters.
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Our Services</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { icon: Car, title: 'Traffic Ticket Defence', desc: 'Highway 7/8, Highway 23, and Perth County road tickets. Speeding, careless driving, and rural road violations.', link: '/services/traffic-tickets' },
              { icon: Scale, title: 'Small Claims Court', desc: 'Business disputes, contract issues, debt collection. Representation at Stratford courthouse.', link: '/services/small-claims' },
              { icon: Home, title: 'Landlord & Tenant Board', desc: 'Eviction defence, rent disputes, heritage property issues. LTB representation for Perth County.', link: '/services/landlord-tenant' },
              { icon: Gavel, title: 'Provincial Offences', desc: 'Municipal by-laws, noise complaints, property standards. Defence at Provincial Offences Court.', link: '/services/provincial-offences' },
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

      {/* Areas */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Perth County Communities</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  'Stratford',
                  'St. Marys',
                  'Mitchell',
                  'Listowel',
                  'Milverton',
                  'Atwood',
                  'Monkton',
                  'Shakespeare',
                  'Sebringville',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="font-paragraph text-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <Phone className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Stratford Legal Help</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation for Stratford and Perth County residents.
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
            Licensed by the Law Society of Ontario | Serving Stratford & Perth County
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
