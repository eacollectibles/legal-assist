import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, MapPin, Scale, Car, Home, Gavel, Clock, CheckCircle, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MarkhamParalegalPage() {
  // SEO handled by AutoSEO component

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <MapPin className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Serving Markham &amp; York Region</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Markham Paralegal Services</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Licensed paralegal representation for Markham and York Region residents. Traffic tickets on Highway 404/Highway 7, Small Claims, LTB, provincial offences.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Book Free Consultation <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:+12262725153" className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5"><Phone className="w-5 h-5" /> 226-272-5153</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Legal Services for Markham Residents</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Car, title: 'Traffic Ticket Defence', desc: 'Highway 404, Highway 7, Markham Road, Kennedy Road. Speeding, careless driving, stunt driving.', link: '/services/traffic-tickets' },
              { icon: Scale, title: 'Small Claims Court', desc: 'Up to $50,000 at Newmarket courthouse. Debt collection, contract disputes.', link: '/services/small-claims' },
              { icon: Home, title: 'Landlord & Tenant Board', desc: 'York Region rental disputes, eviction defence, maintenance orders.', link: '/services/landlord-tenant' },
              { icon: Gavel, title: 'Provincial Offences', desc: 'By-law violations, regulatory offences at Markham/Newmarket POA.', link: '/services/provincial-offences' },
            ].map((service, index) => (
              <Link key={index} to={service.link} className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
                <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><service.icon className="w-6 h-6" /></div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="font-paragraph text-foreground/70 mb-4">{service.desc}</p>
                <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Local Court Knowledge</h2>

          <div className="max-w-4xl mx-auto bg-white rounded-lg p-8 border border-pastelbeige">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-primary" />
                  Courts We Serve
                </h3>
                <ul className="space-y-2">
                  {['Ontario Court of Justice - Newmarket', 'Small Claims Court - Newmarket', 'Provincial Offences Court - Markham', 'Landlord and Tenant Board (virtual)'].map((court) => (
                    <li key={court} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <span className="font-paragraph text-foreground/70">{court}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Areas We Serve
                </h3>
                <ul className="space-y-2">
                  {['Markham', 'Unionville', 'Stouffville', 'Richmond Hill', 'Thornhill', 'Scarborough'].map((area) => (
                    <li key={area} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <span className="font-paragraph text-foreground/70">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Why Choose LegalAssist for Markham</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'LSO Licensed', desc: 'Fully regulated by the Law Society of Ontario for your protection.' },
              { icon: MapPin, title: 'Local Expertise', desc: 'Deep knowledge of Newmarket courthouse and York Region procedures.' },
              { icon: Clock, title: 'Fast Results', desc: 'Quick turnaround times and responsive communication throughout your case.' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><item.icon className="w-8 h-8 text-primary" /></div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Need Legal Help in Markham?</h2>
          <p className="font-paragraph text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">Serving Markham and all of York Region.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-secondary/90">Book Free Consultation <ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:+12262725153" className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary-foreground/10"><Phone className="w-5 h-5" /> 226-272-5153</a>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <p className="font-paragraph text-sm text-foreground/70">Licensed by the Law Society of Ontario | Serving Markham &amp; York Region</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
  