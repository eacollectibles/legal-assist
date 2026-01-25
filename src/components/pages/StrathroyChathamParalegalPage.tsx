import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, MapPin, Phone, Scale, Home, Car } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function StrathroyChathamParalegalPage() {
  useEffect(() => {
    document.title = 'Paralegal Services in Strathroy & Chatham Ontario | LegalAssist';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <MapPin className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Serving Strathroy, Chatham &amp; Middlesex County</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Paralegal Services in Strathroy &amp; Chatham</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Licensed paralegal representation for Small Claims Court, Landlord and Tenant Board, traffic tickets, and tribunal matters. Serving Strathroy, Chatham-Kent, and surrounding communities.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Book Free Consultation <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:+13658829515" className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5"><Phone className="w-5 h-5" /> 365-882-9515</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Legal Services We Provide</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link to="/services/small-claims" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all">
              <Scale className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Small Claims Court</h3>
              <p className="font-paragraph text-foreground/70">Claims up to $50,000 for debt recovery, contract disputes, and property damage.</p>
            </Link>

            <Link to="/services/landlord-tenant" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all">
              <Home className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Landlord &amp; Tenant Board</h3>
              <p className="font-paragraph text-foreground/70">Evictions, rent disputes, maintenance issues, and LTB hearings.</p>
            </Link>

            <Link to="/services/traffic-tickets" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all">
              <Car className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Traffic Tickets</h3>
              <p className="font-paragraph text-foreground/70">Speeding, careless driving, stunt driving, and Highway Traffic Act offences.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Communities We Serve</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {['Strathroy', 'Chatham', 'Wallaceburg', 'Ridgetown', 'Dresden', 'Blenheim', 'Tilbury', 'Mount Brydges'].map((city) => (
              <div key={city} className="bg-white rounded-lg py-3 px-4 text-center border border-pastelbeige">
                <span className="font-paragraph text-sm text-foreground">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Need Legal Help in Strathroy or Chatham?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8">Contact us today for a free consultation.</p>
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Book Free Consultation <ArrowRight className="w-5 h-5" /></Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
