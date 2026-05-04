import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, MapPin, Scale, Car, Home, Gavel, Clock, CheckCircle, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CochraneParalegalPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <MapPin className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Serving Cochrane & Northeastern Ontario</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Cochrane Paralegal Services
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Trusted paralegal representation for Cochrane and the Cochrane District. We provide expert legal assistance for traffic tickets, Small Claims Court matters, landlord-tenant disputes, and provincial offences along Highway 11.
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

      {/* Services */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Our Services in Cochrane</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { icon: Car, title: 'Traffic Ticket Defence', desc: 'Highway 11 traffic violations, speeding tickets, stunt driving charges. Careless driving and unsafe equipment defence in Cochrane.', link: '/services/traffic-tickets' },
              { icon: Scale, title: 'Small Claims Court', desc: 'Debt recovery, contract disputes, and personal injury claims up to $50,000. Strong representation at Cochrane Small Claims Court.', link: '/services/small-claims' },
              { icon: Home, title: 'Landlord & Tenant Board', desc: 'Eviction defence, rent withholding disputes, and habitability issues. Experienced LTB representation for Cochrane properties.', link: '/services/landlord-tenant' },
              { icon: Gavel, title: 'Provincial Offences', desc: 'Municipal by-law violations, trespass charges, and regulatory offences. Vigorous defence at Cochrane Provincial Offences Court.', link: '/services/provincial-offences' },
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
                We regularly appear at courts serving Cochrane and the Cochrane District:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-3">Courts We Attend</h3>
                  <ul className="space-y-2">
                    {[
                      'Ontario Court of Justice - Cochrane (171 Fourth Avenue)',
                      'Cochrane Small Claims Court',
                      'Provincial Offences Court - Cochrane',
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
                      'Cochrane',
                      'Kapuskasing',
                      'Smooth Rock Falls',
                      'Hearst',
                      'Matheson',
                      'Hornepayne',
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Why Cochrane Residents Choose Us</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              { title: 'Affordable Rates', desc: 'Paralegal services cost significantly less than lawyers while providing professional representation in Cochrane.' },
              { title: 'Flexible Scheduling', desc: 'Evening and weekend consultations available. We accommodate the schedules of Cochrane District residents.' },
              { title: 'Virtual Options', desc: 'Many matters can be handled remotely—phone and video consultations available for Cochrane clients.' },
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Need Legal Help in Cochrane?</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to discuss your case. Serving all of Cochrane District and Northeastern Ontario.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-gray-100 transition-colors">
              Book Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:2262725153" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-white/10 transition-colors">
              Call 226-272-5153
            </a>
          </div>
        </div>
      </section>

      {/* LSO Badge */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <p className="font-paragraph text-sm text-foreground/60">
            <Shield className="w-4 h-4 inline mr-1" />
            Licensed by the Law Society of Ontario | Serving Cochrane & Northeastern Ontario
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
