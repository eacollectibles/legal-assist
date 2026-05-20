import SEO from '@/components/SEO';
import CityServiceCrossLinks from '@/components/CityServiceCrossLinks';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Home, Shield, Clock, FileText, Scale, MapPin, DollarSign, Users, Building2, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQSection } from '@/components/FAQSection';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/phone-constants';
import type { CityData } from '@/data/cityData';

interface Props {
  city: CityData;
}

export default function LTBCityTemplate({ city }: Props) {
  // Avoid redundant "in Ottawa and Ottawa" when city name equals county/region
  const countyText = city.county !== city.name ? city.county : `the ${city.name} area`;
  const regionText = city.region !== city.name ? city.region : `Greater ${city.name}`;

  const faqs = [
    {
      question: `How do I file an eviction application at the LTB for ${city.name}?`,
      answer: `You must first serve the appropriate notice (N4 for non-payment, N12 for personal use, etc.) to the tenant. After the notice period expires, you can file an application with the Landlord and Tenant Board. We handle the entire process including notice preparation, filing, and hearing representation.`,
    },
    {
      question: `How long does an LTB eviction take in ${city.name}?`,
      answer: `LTB timelines vary significantly. Non-payment matters (L1) may be heard within a few months, while other matters can take longer. We work to move matters forward as efficiently as possible and can seek urgent hearing dates where circumstances warrant it.`,
    },
    {
      question: `Can a tenant challenge an eviction in ${city.name}?`,
      answer: `Yes. Tenants have strong protections under the Residential Tenancies Act. Common defences include improper notice, bad faith eviction, and raising maintenance issues. We represent tenants at LTB hearings and work to protect your housing rights.`,
    },
    {
      question: `What does an LTB paralegal cost in ${city.name}?`,
      answer: `We offer a free initial consultation to review your matter and provide a clear fee estimate. Our paralegal rates are typically a fraction of what a lawyer would charge. We offer flat fee options for many standard LTB matters.`,
    },
    {
      question: `Can a landlord enter my rental unit without permission in ${city.name}?`,
      answer: `A landlord must provide at least 24 hours written notice before entering your unit, and can only enter for specific reasons set out in the Residential Tenancies Act. Illegal entry is a violation of your rights. We can file a T2 application on your behalf if your landlord is entering without proper notice.`,
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const landmarkText = city.landmarks.length > 0
    ? `${city.name} is home to ${city.landmarks.join(', ')}, contributing to a growing population that puts significant pressure on the local rental housing supply.`
    : `${city.name} and ${regionText} have a growing rental market where landlord-tenant disputes are increasingly common.`;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`Landlord & Tenant Paralegal in ${city.name}, Ontario | Legal Assist`}
        description={`Licensed paralegal for Landlord and Tenant Board matters in ${city.name}, ${countyText}. Free consultation. Evictions, rent disputes, maintenance issues, lease problems.`}
        canonical={`https://www.legalassist.london/locations/${city.slug}/landlord-tenant`}
      />
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
              <span className="font-paragraph text-sm font-medium">Landlord &amp; Tenant Paralegal &mdash; {city.name}, Ontario</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Landlord &amp; Tenant Paralegal in {city.name}, Ontario
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-4 max-w-3xl">
              Licensed paralegal representation for landlords and tenants at the Landlord and Tenant Board in {city.name} and {regionText}. From eviction hearings to rent disputes, we handle all LTB matters with local knowledge and affordable rates.
            </p>
            <p className="font-paragraph text-base text-foreground/60 mb-4 max-w-3xl">
              Whether you are a landlord dealing with non-payment of rent, a tenant facing an unjust eviction, or either party navigating above-guideline rent increases, Legal Assist provides licensed paralegal representation for every stage of the LTB process in {city.name}.
            </p>
            {city.ltbOffice && (
              <p className="font-paragraph text-base text-foreground/60 mb-8 max-w-3xl">
                LTB hearings for {city.name}{city.population ? ` (population approximately ${city.population})` : ''} are administered through the <strong>{city.ltbOffice}</strong> region of the Landlord and Tenant Board. Most hearings are now held by video conference, with in-person hearings scheduled where the circumstances require it.
              </p>
            )}
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Landlord Services in {city.name}</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-6 max-w-3xl mx-auto">
            We represent {city.name} landlords at the Landlord and Tenant Board for eviction applications, rent arrears, and property management disputes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/services/eviction-non-payment" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><AlertTriangle className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Non-Payment of Rent (N4)</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Eviction applications when tenants fail to pay rent. We prepare N4 notices, file L1 applications, and represent landlords at LTB hearings.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">Includes mediation, payment plans, and enforcement of eviction orders in {city.name}.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/services/landlord-tenant" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><FileText className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Persistent Late Payment (N5)</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Applications for tenants who repeatedly pay rent late. We prepare N5 notices and file L2 applications on behalf of {city.name} landlords.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">Addresses ongoing interference with reasonable enjoyment and persistent late payment.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/services/landlord-tenant" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Building2 className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Serious Damage (N7)</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Expedited eviction for serious damage to the rental unit or safety concerns. N7 notices allow shorter notice periods.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">We advocate for {city.name} landlords dealing with significant property damage or illegal acts.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/services/n12-personal-use-eviction" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Home className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Personal Use Eviction (N12)</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Evictions for personal use, purchaser use, or family member occupancy under the Residential Tenancies Act.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">We ensure proper notice requirements are met and represent you at the {city.name} LTB hearing.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/services/landlord-tenant" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Scale className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Demolition &amp; Conversion (N13)</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Evictions for demolition, major renovations, or conversion to non-residential use in {city.name}.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">Strict compliance with RTA requirements is essential. We handle the full application process.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/services/rent-increase-guide" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><DollarSign className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Above-Guideline Increases</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Applications for above-guideline rent increases to cover capital expenditures, extraordinary utility costs, or security services.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">We prepare AGI applications and represent {city.name} landlords at LTB hearings.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* Tenant Services */}
      <section className="py-16 md:py-24 bg-pastelbeige/10">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Tenant Services in {city.name}</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-6 max-w-3xl mx-auto">
            We advocate for {city.name} tenants facing eviction, maintenance issues, illegal rent increases, and landlord harassment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/services/tenant-services" className="bg-white rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Shield className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Eviction Defence</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Defence against wrongful eviction, bad-faith N12 notices, and illegal lockouts by {city.name} landlords.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">We file responses, prepare your defence, and represent you at the LTB hearing.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/services/rent-increase-guide" className="bg-white rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><DollarSign className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Rent Disputes</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Challenges to illegal rent increases, above-guideline increase applications, and rent reduction requests.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">We help {city.name} tenants challenge unlawful increases and recover overpaid rent.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/services/maintenance-repairs" className="bg-white rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Building2 className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Maintenance &amp; Repairs</h3>
              <p className="font-paragraph text-foreground/70 mb-2">T6 applications for maintenance issues, pest infestations, heating problems, and property standard violations.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">We seek rent abatements for periods where your {city.name} unit was not properly maintained.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/services/tenant-services" className="bg-white rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><AlertTriangle className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Harassment &amp; Illegal Entry</h3>
              <p className="font-paragraph text-foreground/70 mb-2">T2 applications for landlord harassment, illegal entry, changing locks, or interfering with your reasonable enjoyment.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">We advocate for {city.name} tenants whose rights have been violated under the RTA.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/services/landlord-tenant" className="bg-white rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><FileText className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Lease Issues</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Disputes over lease terms, assignment and subletting, early termination, and illegal lease clauses.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">We review lease agreements and advise {city.name} tenants on their rights under Ontario law.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/services/return-of-property" className="bg-white rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Users className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Security Deposits</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Recovery of last month&apos;s rent deposits, key deposits, and illegal charges collected by your landlord.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">Ontario landlords can only collect last month&apos;s rent and a refundable key deposit. We recover illegal fees.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* Local Rental Market Context */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Understanding {city.name}&apos;s Rental Market</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">
            {landmarkText} This means understanding your rights under the Residential Tenancies Act is critical whether you are a landlord or a tenant.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-pastelbeige/10 rounded-lg p-6 border border-pastelbeige shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3 flex items-center gap-2"><Home className="w-5 h-5 text-primary" /> For {city.name} Landlords</h3>
              <p className="font-paragraph text-foreground/70 text-sm mb-3">Protecting your rental property investment in {city.name} requires timely action when issues arise. We help landlords with proper notice procedures, LTB application filings, hearing representation, and enforcement of orders.</p>
              <p className="font-paragraph text-foreground/60 text-sm">From non-payment of rent to property damage, we handle every type of landlord application at the LTB for {regionText} properties.</p>
            </div>
            <div className="bg-pastelbeige/10 rounded-lg p-6 border border-pastelbeige shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3 flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> For {city.name} Tenants</h3>
              <p className="font-paragraph text-foreground/70 text-sm mb-3">As a tenant in {city.name}, you have strong protections under Ontario law. If you are facing an eviction notice, dealing with a landlord who refuses to make repairs, or believe your rent was illegally increased, we can help.</p>
              <p className="font-paragraph text-foreground/60 text-sm">We regularly defend tenants against bad-faith evictions, file applications for rent abatements, and challenge above-guideline rent increases.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Why Choose a {city.name} LTB Paralegal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Shield className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">LSO Licensed</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Fully licensed by the Law Society of Ontario with professional liability insurance covering all LTB matters.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><MapPin className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">{city.name} LTB Experience</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Familiar with {city.name} LTB hearing procedures, local adjudicators, and the specific issues facing the {regionText} rental market.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Clock className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">24/7 Client Portal</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Track your LTB matter, access documents, and communicate with your paralegal anytime through our secure online portal.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><DollarSign className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Affordable Rates</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Transparent pricing with upfront retainer agreements. Paralegal rates are a fraction of what a lawyer charges for the same LTB work.</p>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} />
      <RelatedServices services={relatedServicesConfig.landlordTenant} />

      {/* CTA */}
      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Landlord or Tenant Dispute in {city.name}?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-4 max-w-2xl mx-auto">
            Do not wait until your LTB hearing date to seek help. Contact Legal Assist today for a free consultation about your {city.name} landlord-tenant matter.
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

      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LegalService',
        name: `Legal Assist - Landlord & Tenant Paralegal in ${city.name}`,
        description: `Licensed paralegal representation for landlords and tenants at the Landlord and Tenant Board in ${city.name} and ${regionText}.`,
        url: `https://www.legalassist.london/locations/${city.slug}/landlord-tenant`,
        telephone: PHONE_DISPLAY,
        areaServed: { '@type': 'City', name: city.name, containedInPlace: { '@type': 'AdministrativeArea', name: city.region } },
        datePublished: '2026-04-17',
        serviceType: 'Landlord and Tenant Board Representation',
        provider: {
          '@type': 'LocalBusiness',
          name: 'Legal Assist',
          address: { '@type': 'PostalAddress', addressLocality: city.name, addressRegion: 'ON', addressCountry: 'CA' },
        },
      }) }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <CityServiceCrossLinks city={city} currentService="landlord-tenant" />
      <Footer />
    </div>
  );
}
