import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Home, Shield, Clock, FileText, Scale, MapPin, CheckCircle, Users, Building2, AlertTriangle, DollarSign } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQSection } from '@/components/FAQSection';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/phone-constants';

export default function LandlordTenantLondonPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 pt-4">
        <Breadcrumbs />
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Home className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Landlord &amp; Tenant Paralegal — London, Ontario</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Landlord &amp; Tenant Paralegal in London, Ontario
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-4 max-w-3xl">
              Licensed paralegal representation for landlords and tenants at the Landlord and Tenant Board in London and Middlesex County. From eviction hearings to rent disputes, we handle all LTB matters with local experience and affordable rates.
            </p>
            <p className="font-paragraph text-base text-foreground/60 mb-8 max-w-3xl">
              London&apos;s rental market is one of the most active in Southwestern Ontario. Whether you are a landlord dealing with non-payment of rent, a tenant facing an unjust eviction, or either party navigating above-guideline rent increases, Legal Assist provides experienced paralegal representation for every stage of the LTB process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">
                Book Free Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5">
                <Phone className="w-5 h-5" /> {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Landlord Services */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Landlord &amp; Tenant Services in London</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-6 max-w-3xl mx-auto">
            We represent both landlords and tenants in all types of Landlord and Tenant Board applications and hearings. Our paralegal is familiar with London&apos;s local LTB procedures and the specific challenges facing the London rental market.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/services/eviction-non-payment" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><AlertTriangle className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Non-Payment of Rent (N4)</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Eviction applications when London tenants fail to pay rent. We prepare N4 notices, file L1 applications, and represent landlords at LTB hearings.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">Includes mediation, payment plans, and enforcement of eviction orders in London.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/services/n12-personal-use-eviction" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Home className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Personal Use Eviction (N12)</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Evictions for personal use, purchaser use, or family member occupancy under the Residential Tenancies Act.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">We ensure proper notice requirements are met and represent you at the London LTB hearing.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/services/tenant-services" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Shield className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Tenant Rights &amp; Defence</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Defence against wrongful eviction, bad-faith N12 notices, illegal lockouts, and harassment by London landlords.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">We file T2 and T6 applications and represent tenants at hearings to protect your housing rights.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/services/maintenance-repairs" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Building2 className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Maintenance &amp; Repairs</h3>
              <p className="font-paragraph text-foreground/70 mb-2">T6 applications for maintenance issues, pest infestations, heating problems, and property standard violations in London rentals.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">We can also seek rent abatements for periods where your London unit was not properly maintained.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/services/rent-increase-guide" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><DollarSign className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Rent Disputes &amp; AGIs</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Above-guideline rent increase applications, illegal rent increase challenges, and rent reduction requests for London properties.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">We help London landlords apply for AGIs and tenants challenge unlawful increases.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/services/landlord-tenant" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Scale className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">LTB Hearing Representation</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Full representation at all Landlord and Tenant Board hearings for the London region, both in-person and virtual.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">We prepare your case, organize evidence, and advocate effectively at the London LTB.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* London Rental Market Context */}
      <section className="py-16 md:py-24 bg-pastelbeige/10">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Understanding London&apos;s Rental Market</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">
            London, Ontario is home to Western University, Fanshawe College, and a growing population that has put significant pressure on the local rental housing supply. This means landlord-tenant disputes are increasingly common, and understanding your rights under the Residential Tenancies Act is critical.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 border border-pastelbeige shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3 flex items-center gap-2"><Home className="w-5 h-5 text-primary" /> For London Landlords</h3>
              <p className="font-paragraph text-foreground/70 text-sm mb-3">Protecting your rental property investment in London requires timely action when issues arise. We help London landlords with proper notice procedures, LTB application filings, hearing representation, and enforcement of orders.</p>
              <p className="font-paragraph text-foreground/60 text-sm">Common London landlord matters include student tenant turnover, property damage during the school year, and navigating the city&apos;s rental licensing by-laws.</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-pastelbeige shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3 flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> For London Tenants</h3>
              <p className="font-paragraph text-foreground/70 text-sm mb-3">As a London tenant, you have strong protections under Ontario law. If you are facing an eviction notice, dealing with a landlord who refuses to make repairs, or believe your rent was illegally increased, we can help.</p>
              <p className="font-paragraph text-foreground/60 text-sm">We regularly defend London tenants against bad-faith evictions, file applications for rent abatements, and challenge above-guideline rent increases.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">How We Handle London LTB Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto mt-12">
            <div>
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 font-heading font-bold text-lg">1</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Free Case Review</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We review your situation, explain your rights under the RTA, and advise on your options for your London rental matter.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 font-heading font-bold text-lg">2</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Notice &amp; Filing</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We prepare all required notices (N4, N5, N12, N13, T2, T6) and file applications with the Landlord and Tenant Board on your behalf.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 font-heading font-bold text-lg">3</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Hearing Prep</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We organize your evidence, prepare witness statements, and develop a clear legal strategy tailored to your London LTB hearing.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 font-heading font-bold text-lg">4</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">LTB Representation</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We represent you at the hearing, negotiate settlements where appropriate, and advance your position with the evidence and arguments available.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Why Choose Legal Assist for London LTB Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Shield className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">LSO Licensed</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Fully licensed by the Law Society of Ontario with professional liability insurance covering all LTB matters.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><MapPin className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">London LTB Experience</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Familiar with London LTB hearing procedures, local adjudicators, and the specific issues facing London&apos;s rental market.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Clock className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">24/7 Client Portal</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Track your LTB matter, access documents, and communicate with your paralegal anytime through our secure online portal.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><DollarSign className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Affordable Rates</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Transparent pricing with upfront retainer agreements. Paralegal rates are a fraction of what a London lawyer charges for the same LTB work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Serving Areas */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Serving London &amp; Surrounding Areas</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">We handle landlord and tenant matters for rental properties throughout London and Middlesex County:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {['London', 'St. Thomas', 'Strathroy', 'Woodstock', 'Ingersoll', 'Dorchester', 'Komoka', 'Delaware', 'Lambeth', 'Byron', 'Lucan', 'Arva'].map((city) => (
              <div key={city} className="bg-pastelbeige/20 rounded-lg py-3 px-4 text-center border border-pastelbeige">
                <span className="font-paragraph text-sm text-foreground">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />
      <RelatedServices services={relatedServicesConfig.general} />

      {/* CTA */}
      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Landlord or Tenant Dispute in London?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-4 max-w-2xl mx-auto">
            Do not wait until your LTB hearing date to seek help. Contact Legal Assist today for a free consultation about your London landlord-tenant matter.
          </p>
          <p className="font-paragraph text-base text-secondary-foreground/60 mb-8 max-w-2xl mx-auto">
            We will review your situation, explain your options under the Residential Tenancies Act, and provide a clear plan to resolve your dispute.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">
              Book Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary-foreground/10">
              <Phone className="w-5 h-5" /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}