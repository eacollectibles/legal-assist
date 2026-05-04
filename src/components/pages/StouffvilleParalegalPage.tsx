import { Link } from 'react-router-dom';
import { ArrowRight, Shield, MapPin, Scale, Car, Home, Gavel, Clock, CheckCircle, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function StouffvilleParalegalPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <MapPin className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Serving Stouffville & York Region</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Stouffville Paralegal Services</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Licensed paralegal services for Stouffville residents. Traffic tickets, Small Claims Court, LTB hearings, provincial offences.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors">Free Consultation <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:2262725153" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/5 transition-colors">Call 226-272-5153</a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Our Services in Stouffville</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { icon: Car, title: 'Traffic Ticket Defence', desc: 'Highway 404, Highway 48, Stouffville Road. Careless driving, stunt driving, and licence suspensions.', link: '/services/traffic-tickets' },
              { icon: Scale, title: 'Small Claims Court', desc: 'Debt collection, contract disputes, property damage claims up to $50,000 at Newmarket courthouse.', link: '/services/small-claims' },
              { icon: Home, title: 'Landlord & Tenant Board', desc: 'Eviction defence, rent disputes, maintenance issues. Representation at LTB hearings for York Region rental disputes.', link: '/services/landlord-tenant' },
              { icon: Gavel, title: 'Provincial Offences', desc: 'By-law violations, trespass charges, regulatory offences. Defence at York Region Provincial Offences Court.', link: '/services/provincial-offences' },
            ].map((service, index) => (
              <Link key={index} to={service.link} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <service.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">{service.title}</h3>
                <p className="font-paragraph text-foreground/70 mb-4">{service.desc}</p>
                <span className="text-primary font-medium inline-flex items-center gap-1">Learn more <ArrowRight className="w-4 h-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Local Knowledge */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Courts We Attend & Areas Served</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Gavel className="w-5 h-5 text-primary" />
                Courts in York Region
              </h3>
              <ul className="space-y-2 font-paragraph text-foreground/70">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span>Newmarket Ontario Court of Justice</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span>York Region Provincial Offences Court</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Areas We Serve
              </h3>
              <ul className="space-y-2 font-paragraph text-foreground/70">
                <li>Stouffville</li>
                <li>Uxbridge</li>
                <li>Ballantrae</li>
                <li>Musselman Lake</li>
                <li>Mount Albert</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Why Stouffville Residents Choose Us</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              { title: 'Affordable Rates', desc: 'Paralegal services cost significantly less than lawyers while providing quality representation.' },
              { title: 'Flexible Scheduling', desc: 'Evening and weekend consultations available. We work around your schedule.' },
              { title: 'Virtual Options', desc: 'Many matters can be handled remotely—phone and video consultations available.' },
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Need Legal Help in Stouffville?</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90">Get started with a free consultation. Call us today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-gray-100 transition-colors">Schedule Consultation <ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:2262725153" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-white/10 transition-colors">Call 226-272-5153</a>
          </div>
        </div>
      </section>

      {/* LSO Badge */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <p className="font-paragraph text-sm text-foreground/60">
            <Shield className="w-4 h-4 inline mr-1" />
            Licensed by the Law Society of Ontario | Serving Stouffville & York Region
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
