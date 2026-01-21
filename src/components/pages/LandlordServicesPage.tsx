import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Phone, Home, Shield, Clock, FileText, Scale } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LandlordServicesPage() {
  useEffect(() => {
    document.title = 'Landlord Legal Services in Ontario | Evictions & LTB | LegalAssist';
  }, []);

  const services = [
    { title: 'Non-Payment of Rent (N4)', description: 'Eviction applications when tenants fail to pay rent. We handle the entire process from notice to enforcement.', link: '/services/eviction-non-payment' },
    { title: 'Property Damage & Disturbance (N5)', description: 'Applications for substantial interference, damage to property, or safety concerns.', link: '/services/landlord-tenant-board' },
    { title: 'Illegal Activity (N6/N7)', description: 'Evictions for illegal acts, misrepresentation, or serious safety issues.', link: '/services/landlord-tenant-board' },
    { title: 'End of Tenancy (N12/N13)', description: 'Personal use, purchaser use, or renovation/demolition evictions.', link: '/services/landlord-tenant-board' },
    { title: 'Above Guideline Increases', description: 'Applications for rent increases above the annual guideline for capital expenditures.', link: '/services/landlord-tenant-board' },
    { title: 'LTB Hearing Representation', description: 'Full representation at Landlord and Tenant Board hearings in person or virtual.', link: '/services/landlord-tenant-board' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Home className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Landlord Legal Services</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Ontario Landlord Legal Services</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Professional paralegal representation for Ontario landlords. From eviction applications to LTB hearings, we protect your property rights and help you navigate the Residential Tenancies Act.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Book Free Consultation <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5"><Phone className="w-5 h-5" /> (519) 601-1127</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Landlord Services We Offer</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">Comprehensive legal support for all landlord matters before the Landlord and Tenant Board.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Link key={index} to={service.link} className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="font-paragraph text-foreground/70 mb-4">{service.description}</p>
                <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">The Eviction Process in Ontario</h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
              <div className="flex-1 bg-white rounded-lg p-6 border border-pastelbeige">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Serve Proper Notice</h3>
                <p className="font-paragraph text-foreground/70">We prepare and serve the correct notice (N4, N5, N12, etc.) with proper timelines and content.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
              <div className="flex-1 bg-white rounded-lg p-6 border border-pastelbeige">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">File Application with LTB</h3>
                <p className="font-paragraph text-foreground/70">If the tenant does not comply or vacate, we file the appropriate application (L1, L2, etc.) with the Landlord and Tenant Board.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
              <div className="flex-1 bg-white rounded-lg p-6 border border-pastelbeige">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Attend LTB Hearing</h3>
                <p className="font-paragraph text-foreground/70">We represent you at the hearing, present evidence, cross-examine the tenant, and argue for an eviction order.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
              <div className="flex-1 bg-white rounded-lg p-6 border border-pastelbeige">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Enforce the Order</h3>
                <p className="font-paragraph text-foreground/70">If the tenant does not leave, we assist with filing the eviction order with the Sheriff for enforcement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Why Landlords Choose LegalAssist</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Shield className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">LSO Licensed</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Regulated by the Law Society of Ontario with errors and omissions insurance.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Clock className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Fast Response</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We understand time is money. Quick turnaround on notices and applications.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><FileText className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Client Portal</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Upload documents, track your case, and message us 24/7 through our secure portal.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Scale className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Flat Fee Pricing</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Clear, upfront pricing. No surprises. Know your costs before we start.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Need Help with a Tenant Issue?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">Contact us for a free consultation. We will review your situation and explain your options under the Residential Tenancies Act.</p>
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
