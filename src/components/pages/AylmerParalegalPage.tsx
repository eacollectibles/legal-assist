import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, MapPin, Phone, Scale, Home, Car, Users, Shield, Clock, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AylmerParalegalPage() {
  useEffect(() => {
    document.title = 'Paralegal Services in Aylmer Ontario | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Licensed paralegal services in Aylmer, Ontario. Affordable representation for Small Claims Court, Landlord Tenant Board, traffic tickets, and tribunals. Free consultation.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <MapPin className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Serving Aylmer &amp; Elgin County</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Paralegal Services in Aylmer, Ontario</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Licensed paralegal representation for Small Claims Court, Landlord and Tenant Board, traffic tickets, and tribunal matters. Serving Aylmer, Springfield, Malahide, and all of East Elgin County.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Book Free Consultation <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5"><Phone className="w-5 h-5" /> (519) 601-1127</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Legal Services for Aylmer Residents</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Scale, title: 'Small Claims Court', desc: 'Claims up to $50,000 for debt recovery, contract disputes, and property damage.', link: '/services/small-claims' },
              { icon: Home, title: 'Landlord & Tenant Board', desc: 'Evictions, rent disputes, maintenance issues, and LTB hearings.', link: '/services/landlord-tenant-board' },
              { icon: Car, title: 'Traffic Tickets', desc: 'Speeding, careless driving, stunt driving, and Highway Traffic Act offences.', link: '/services/traffic-tickets' },
              { icon: Users, title: 'Human Rights Tribunal', desc: 'Discrimination complaints for employment, housing, and services.', link: '/services/human-rights-tribunal' },
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

      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Why Aylmer Clients Choose LegalAssist</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'LSO Licensed', desc: 'Fully regulated by the Law Society of Ontario for your protection.' },
              { icon: MapPin, title: 'Local Service', desc: 'Familiar with St. Thomas courthouse and Elgin County procedures.' },
              { icon: Clock, title: 'Client Portal', desc: '24/7 online access to your case documents and updates.' },
              { icon: CheckCircle, title: 'Free Consultation', desc: 'Discuss your legal matter with no obligation.' },
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

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Communities We Serve Near Aylmer</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-2xl mx-auto">We provide paralegal services throughout East Elgin County and surrounding areas.</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {['Aylmer', 'Springfield', 'St. Thomas', 'Malahide', 'Vienna', 'Port Bruce', 'Straffordville', 'Eden', 'Corinth', 'Belmont', 'Harrietsville', 'Dorchester'].map((city) => (
              <div key={city} className="bg-pastelbeige/20 rounded-lg py-3 px-4 text-center border border-pastelbeige">
                <span className="font-paragraph text-sm text-foreground">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Need Legal Help in Aylmer?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">Contact us today for a free consultation. We're here to help with your legal matter.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Book Free Consultation <ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary-foreground/10"><Phone className="w-5 h-5" /> (519) 601-1127</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
