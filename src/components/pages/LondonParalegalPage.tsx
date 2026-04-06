import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Phone, Clock, Shield, Scale, Users, CheckCircle, Gavel, Home, Car, Briefcase, FileText, DollarSign, AlertTriangle, Building2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQSection } from '@/components/FAQSection';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/phone-constants';

export default function LondonParalegalPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 pt-4">
        <Breadcrumbs />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <MapPin className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Serving London, Middlesex County &amp; Southwestern Ontario</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Paralegal Services in London, Ontario
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-4 max-w-3xl">
              Licensed paralegal representation for Small Claims Court, Landlord and Tenant Board, traffic tickets, and administrative tribunal matters in London and throughout Southwestern Ontario.
            </p>
            <p className="font-paragraph text-base text-foreground/60 mb-8 max-w-3xl">
              Whether you are facing a landlord-tenant dispute at the London LTB office, a traffic ticket from the London Provincial Offences Court, or a Small Claims Court matter at the Middlesex County courthouse, LegalAssist provides affordable, professional paralegal services tailored to your needs.
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

      {/* What a London Paralegal Can Do */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">What Can a Paralegal Do in London, Ontario?</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-6 max-w-3xl mx-auto">
            In Ontario, licensed paralegals are authorized by the Law Society of Ontario to represent clients in specific legal matters. Unlike lawyers, paralegals offer a cost-effective alternative for cases that fall within their scope of practice, including Small Claims Court actions up to $50,000, Provincial Offences Act matters, Landlord and Tenant Board disputes, and select tribunal proceedings.
          </p>
          <p className="font-paragraph text-base text-foreground/60 text-center mb-12 max-w-3xl mx-auto">
            At LegalAssist, our licensed paralegal provides London residents and businesses with knowledgeable representation at a fraction of the cost of hiring a lawyer. Every case is handled personally, ensuring you receive dedicated attention from start to resolution.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/small-claims-paralegal-london" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Scale className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Small Claims Court London</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Claims up to $50,000 including debt recovery, breach of contract, property damage, and consumer disputes filed at the London Small Claims Court.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">We handle statement of claims, defence filings, settlement conferences, and trial representation for London and Middlesex County matters.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/landlord-tenant-paralegal-london" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Home className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Landlord &amp; Tenant Board London</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Representation for eviction hearings, N4/N5/N12/N13 notices, rent arrears, above-guideline increases, and maintenance disputes at the London LTB.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">We represent both landlords and tenants in all LTB applications and hearings serving the London rental market.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/traffic-ticket-paralegal-london" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Car className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Traffic Tickets London</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Fight speeding tickets, careless driving, stunt driving, red light camera tickets, and Highway Traffic Act charges issued in London and on Highway 401.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">We appear at the London Provincial Offences Court at 824 Dundas Street to defend your driving record and keep your insurance rates low.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/hrto-paralegal-london" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Users className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Human Rights Tribunal Ontario</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Filing and defending discrimination complaints related to employment, housing, and services under the Ontario Human Rights Code.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">We help London residents who have experienced workplace discrimination, housing discrimination, or denial of services based on protected grounds.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/services/employment-issues" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Briefcase className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Employment Disputes London</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Wrongful dismissal claims up to $50,000, unpaid wages, vacation pay, termination pay, and Employment Standards Act complaints.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">Whether you work in downtown London, at Western University, or anywhere in Middlesex County, we can help recover what you are owed.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/services/criminal-matters" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Gavel className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Provincial Offences London</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Summary conviction offences, by-law infractions, trespassing charges, and regulatory matters in London municipal courts.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">Representation at the London Provincial Offences Court for City of London by-law charges, noise complaints, and other municipal violations.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* How Our Process Works */}
      <section className="py-16 md:py-24 bg-pastelbeige/10">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">How Our London Paralegal Process Works</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">
            From your first call to the final resolution, we make the legal process straightforward and stress-free for London clients.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="relative">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 font-heading font-bold text-lg">1</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Free Consultation</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Call us or book online. We review your situation, explain your legal options, and provide an honest assessment of your case at no cost.</p>
            </div>
            <div className="relative">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 font-heading font-bold text-lg">2</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Retainer &amp; Strategy</h3>
              <p className="font-paragraph text-foreground/70 text-sm">If you decide to proceed, we sign a retainer agreement with transparent pricing. We develop a legal strategy customized to your matter and the London court procedures.</p>
            </div>
            <div className="relative">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 font-heading font-bold text-lg">3</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Preparation &amp; Filing</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We prepare all documents, file with the appropriate London court or tribunal, and handle correspondence with the opposing party on your behalf.</p>
            </div>
            <div className="relative">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 font-heading font-bold text-lg">4</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Representation</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We represent you at hearings, mediations, and settlement conferences in London. You stay informed through our secure client portal with 24/7 access to your case.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose LegalAssist */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Why London Clients Choose LegalAssist</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">
            London residents and businesses trust LegalAssist for reliable, affordable paralegal representation backed by local expertise and modern technology.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Shield className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">LSO Licensed &amp; Insured</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Fully licensed and regulated by the Law Society of Ontario with professional liability insurance, ensuring your case is in qualified hands.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><MapPin className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">London Court Knowledge</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Familiar with London&apos;s Ontario Court of Justice, Provincial Offences Court, Small Claims Court, and local LTB hearing procedures.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Clock className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">24/7 Client Portal</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Access your documents, messages, and real-time case updates anytime through our secure online client portal. Stay informed on your schedule.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><DollarSign className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Transparent Pricing</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Upfront retainer agreements with clear fee structures. No hidden costs, no surprises. Affordable legal help for London families and businesses.</p>
            </div>
          </div>
        </div>
      </section>

      {/* London Court Information */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">London, Ontario Courts &amp; Tribunals We Attend</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">
            We regularly appear at the following London-area courts and tribunals on behalf of our clients:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-pastelbeige/15 rounded-lg p-6 border border-pastelbeige/50">
              <div className="flex items-start gap-3">
                <Building2 className="w-6 h-6 text-primary mt-1 shrink-0" />
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-1">Ontario Court of Justice — London</h3>
                  <p className="font-paragraph text-foreground/70 text-sm">80 Dundas Street, London, ON. Provincial offences, Highway Traffic Act matters, and summary conviction offences.</p>
                </div>
              </div>
            </div>
            <div className="bg-pastelbeige/15 rounded-lg p-6 border border-pastelbeige/50">
              <div className="flex items-start gap-3">
                <Building2 className="w-6 h-6 text-primary mt-1 shrink-0" />
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-1">Small Claims Court — London</h3>
                  <p className="font-paragraph text-foreground/70 text-sm">80 Dundas Street, London, ON. Civil disputes up to $50,000 including debt recovery, contract disputes, and property damage claims.</p>
                </div>
              </div>
            </div>
            <div className="bg-pastelbeige/15 rounded-lg p-6 border border-pastelbeige/50">
              <div className="flex items-start gap-3">
                <Building2 className="w-6 h-6 text-primary mt-1 shrink-0" />
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-1">London Provincial Offences Court</h3>
                  <p className="font-paragraph text-foreground/70 text-sm">824 Dundas Street, London, ON. Traffic tickets, by-law infractions, and municipal offences for the City of London.</p>
                </div>
              </div>
            </div>
            <div className="bg-pastelbeige/15 rounded-lg p-6 border border-pastelbeige/50">
              <div className="flex items-start gap-3">
                <Building2 className="w-6 h-6 text-primary mt-1 shrink-0" />
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-1">Landlord and Tenant Board — London</h3>
                  <p className="font-paragraph text-foreground/70 text-sm">Hearings for evictions, rent disputes, maintenance orders, and tenant rights for London and Middlesex County rental properties.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serving Areas */}
      <section className="py-16 md:py-24 bg-pastelbeige/10">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Serving London &amp; All of Southwestern Ontario</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">In addition to downtown London, we provide paralegal services to clients throughout Middlesex County and the surrounding communities:</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {['London', 'St. Thomas', 'Strathroy', 'Woodstock', 'Ingersoll', 'Tillsonburg', 'Aylmer', 'Dorchester', 'Komoka', 'Delaware', 'Lambeth', 'Byron', 'Lucan', 'Exeter', 'Mount Brydges', 'Arva', 'Ilderton', 'Kilworth'].map((city) => (
              <div key={city} className="bg-white rounded-lg py-3 px-4 text-center border border-pastelbeige shadow-sm">
                <span className="font-paragraph text-sm text-foreground">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />

      <RelatedServices services={relatedServicesConfig.general} />

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Need Affordable Legal Help in London, Ontario?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-4 max-w-2xl mx-auto">
            Do not navigate the legal system alone. Whether you are a London tenant facing eviction, a driver with a traffic ticket, or a business owner owed money, LegalAssist is here to help.
          </p>
          <p className="font-paragraph text-base text-secondary-foreground/60 mb-8 max-w-2xl mx-auto">
            Contact us today for a free, no-obligation consultation. We will review your matter and provide clear advice on how we can help resolve it.
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
