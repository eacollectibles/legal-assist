import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, MapPin, Phone, Clock, Shield, Scale, Users, CheckCircle, Gavel, Home, Car, Briefcase } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LondonParalegalPage() {
  useEffect(() => {
    document.title = 'Paralegal Services in London, Ontario | LegalAssist';
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
              <span className="font-paragraph text-sm font-medium">Serving London &amp; Southwestern Ontario</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Paralegal Services in London, Ontario
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Licensed paralegal representation for Small Claims Court, Landlord and Tenant Board, traffic tickets, and tribunal matters. Affordable legal help for London residents and businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90"
              >
                Book Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a 
                href="tel:+14165550123"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            Legal Services for London Residents
          </h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">
            As a licensed paralegal regulated by the Law Society of Ontario, we provide representation in the following areas:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/services/small-claims" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Small Claims Court</h3>
              <p className="font-paragraph text-foreground/70 mb-4">Claims up to $50,000 for debt recovery, contract disputes, and property damage in London.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link to="/services/landlord-tenant" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Landlord &amp; Tenant Board</h3>
              <p className="font-paragraph text-foreground/70 mb-4">Evictions, rent disputes, maintenance issues, and LTB hearings for London landlords and tenants.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link to="/services/traffic-tickets" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Traffic Tickets</h3>
              <p className="font-paragraph text-foreground/70 mb-4">Speeding, careless driving, stunt driving, and Highway Traffic Act offences in London courts.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link to="/services/human-rights-tribunal" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Human Rights Tribunal</h3>
              <p className="font-paragraph text-foreground/70 mb-4">Discrimination complaints for employment, housing, and services under the Ontario Human Rights Code.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link to="/services/employment-issues" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Employment Disputes</h3>
              <p className="font-paragraph text-foreground/70 mb-4">Wrongful dismissal claims up to $50,000, unpaid wages, and Employment Standards Act matters.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link to="/services/criminal-matters" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Gavel className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Provincial Offences</h3>
              <p className="font-paragraph text-foreground/70 mb-4">Summary conviction offences, by-law infractions, and regulatory matters in London.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Why London Clients Choose LegalAssist
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">LSO Licensed</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Regulated by the Law Society of Ontario with full insurance coverage.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Local Knowledge</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Familiar with London courts, tribunals, and local procedures.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Client Portal</h3>
              <p className="font-paragraph text-foreground/70 text-sm">24/7 access to your documents, messages, and case updates online.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Free Consultation</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Discuss your matter with no obligation before you decide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            Serving London &amp; Surrounding Areas
          </h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">
            We provide paralegal services throughout Southwestern Ontario, including:
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {['London', 'St. Thomas', 'Strathroy', 'Woodstock', 'Ingersoll', 'Tillsonburg', 'Aylmer', 'Dorchester', 'Komoka', 'Delaware', 'Lambeth', 'Byron'].map((city) => (
              <div key={city} className="bg-pastelbeige/20 rounded-lg py-3 px-4 text-center border border-pastelbeige">
                <span className="font-paragraph text-sm text-foreground">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Need Legal Help in London?
          </h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation. We will review your matter and explain how we can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90"
            >
              Book Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="tel:+14165550123"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary-foreground/10"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
