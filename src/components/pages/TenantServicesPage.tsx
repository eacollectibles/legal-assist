import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Phone, Home, Shield, Clock, CheckCircle, FileText, Scale, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TenantServicesPage() {
  // SEO handled by AutoSEO component

  const services = [
    { title: 'Eviction Defence', description: 'Fight wrongful eviction notices and applications. We represent you at LTB hearings.', link: '/services/landlord-tenant' },
    { title: 'Illegal Rent Increases', description: 'Challenge rent increases above the guideline or improper rent increase notices.', link: '/services/landlord-tenant' },
    { title: 'Maintenance & Repairs (T6)', description: 'Applications for rent reduction when landlords fail to maintain the property.', link: '/services/landlord-tenant' },
    { title: 'Harassment & Privacy', description: 'Protection from landlord harassment, illegal entry, and privacy violations.', link: '/services/landlord-tenant' },
    { title: 'Bad Faith Evictions', description: 'Compensation claims when landlords evict in bad faith (N12/N13 abuse).', link: '/services/landlord-tenant' },
    { title: 'Ending Your Tenancy', description: 'Proper procedures for ending your tenancy and recovering your deposit.', link: '/services/landlord-tenant' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Home className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Tenant Legal Services</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Ontario Tenant Legal Services</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Know your rights as a tenant. We provide professional paralegal representation to defend against wrongful evictions, fight illegal rent increases, and enforce your rights under the Residential Tenancies Act.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Find out where you stand <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:+13658829515" className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5"><Phone className="w-5 h-5" /> 365-882-9515</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-yellow-50 border-y border-yellow-200">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <AlertTriangle className="w-12 h-12 text-yellow-600 flex-shrink-0" />
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-heading text-xl font-bold text-foreground mb-2">Received an Eviction Notice?</h2>
              <p className="font-paragraph text-foreground/70">Do not ignore it. Many eviction notices can be challenged. Contact us immediately for a free case review before any deadlines pass.</p>
            </div>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-yellow-600 text-white font-paragraph font-semibold px-6 py-3 rounded-lg transition-all hover:bg-yellow-700 flex-shrink-0">Get Help Now <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Tenant Services We Offer</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">Comprehensive legal support to protect your rights as a tenant in Ontario.</p>
          
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Know Your Tenant Rights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 border border-pastelbeige">
              <CheckCircle className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Right to Proper Notice</h3>
              <p className="font-paragraph text-foreground/70">Landlords must give proper written notice using the correct forms and timelines before any eviction.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-pastelbeige">
              <CheckCircle className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Right to a Hearing</h3>
              <p className="font-paragraph text-foreground/70">You have the right to dispute any eviction at the Landlord and Tenant Board before being forced to leave.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-pastelbeige">
              <CheckCircle className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Right to Repairs</h3>
              <p className="font-paragraph text-foreground/70">Landlords must maintain the property in a good state of repair. You can apply for rent reduction if they do not.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-pastelbeige">
              <CheckCircle className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Right to Privacy</h3>
              <p className="font-paragraph text-foreground/70">Landlords must give 24 hours written notice before entering, except in emergencies.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-pastelbeige">
              <CheckCircle className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Rent Increase Limits</h3>
              <p className="font-paragraph text-foreground/70">Rent can only be increased once per year by the provincial guideline amount (with limited exceptions).</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-pastelbeige">
              <CheckCircle className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Bad Faith Compensation</h3>
              <p className="font-paragraph text-foreground/70">If evicted in bad faith (landlord did not actually move in), you may be entitled to significant compensation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Why Tenants Choose LegalAssist</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Shield className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">LSO Licensed</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Professional representation by a licensed paralegal regulated by the Law Society.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Clock className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Quick Response</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Eviction timelines are strict. We respond quickly to protect your rights.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><FileText className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Client Portal</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Track your case, upload documents, and message us anytime through our secure portal.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Scale className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Affordable Rates</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We understand tenants face financial pressures. Clear, fair pricing with no surprises.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Protect Your Tenant Rights</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">Contact us for a free consultation. We will review your situation and explain your options under the Residential Tenancies Act.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Book Free Consultation <ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:+13658829515" className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary-foreground/10"><Phone className="w-5 h-5" /> 365-882-9515</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
