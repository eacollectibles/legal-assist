import SEO from '@/components/SEO';
import CityServiceCrossLinks from '@/components/CityServiceCrossLinks';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Scale, Shield, Clock, MapPin, FileText, DollarSign, CheckCircle, Users, AlertTriangle, Building2 } from 'lucide-react';
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

export default function SmallClaimsCityTemplate({ city }: Props) {
  // Avoid redundant "in Ottawa and Ottawa" when city name equals county/region
  const countyText = city.county !== city.name ? city.county : `the ${city.name} area`;
  const regionText = city.region !== city.name ? city.region : `Greater ${city.name}`;

  const faqs = [
    {
      question: `How much can I claim in Small Claims Court in ${city.name}?`,
      answer: `Small Claims Court handles claims up to $50,000 in ${city.name} and across Ontario. This includes debts owed, contract disputes, property damage, and consumer complaints. Claims over $50,000 must go to Superior Court, which requires a lawyer.`,
    },
    {
      question: `Do I need a paralegal for Small Claims Court in ${city.name}?`,
      answer: `While you can represent yourself, a licensed paralegal understands court procedures, rules of evidence, and negotiation strategies. We handle all filings, court appearances, and settlement negotiations at ${city.courthouse.name} so you can focus on your life.`,
    },
    {
      question: `How long does a Small Claims Court case take in ${city.name}?`,
      answer: `Timelines vary, but most cases take 6 to 12 months from filing to resolution. Many cases settle before trial through negotiation or at a settlement conference. We work to resolve matters as efficiently as possible.`,
    },
    {
      question: `What does a Small Claims Court paralegal cost in ${city.name}?`,
      answer: `We offer a free initial consultation to review your case and provide a clear fee estimate. Our paralegal rates are typically a fraction of what a lawyer would charge for similar matters. We offer flat fee options for many standard claims.`,
    },
    {
      question: `Can I recover my legal costs if I win in Small Claims Court?`,
      answer: `The court may award a portion of your legal costs if you are successful, typically up to 15% of the amount claimed. Representation costs are a factor the court considers. We can explain the potential cost recovery for your specific case during your free consultation.`,
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

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`Small Claims Court Paralegal in ${city.name}, Ontario | Legal Assist`}
        description={`Licensed paralegal for Small Claims Court matters up to \$50,000 in ${city.name}, ${countyText}. Free consultation. Debt collection, contract disputes, property damage claims.`}
        canonical={`https://www.legalassist.london/locations/${city.slug}/small-claims`}
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
              <Scale className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Small Claims Court Paralegal &mdash; {city.name}, Ontario</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Small Claims Court Paralegal in {city.name}, Ontario
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-4 max-w-3xl">
              Licensed paralegal representation for Small Claims Court matters up to $50,000 in {city.name} and {regionText}. We handle debt recovery, contract disputes, property damage claims, and consumer complaints at the {city.name} courthouse.
            </p>
            <p className="font-paragraph text-base text-foreground/60 mb-8 max-w-3xl">
              Small Claims Court is designed to be accessible, but navigating the process without professional help can result in missed deadlines, procedural errors, and weaker outcomes. Legal Assist provides licensed paralegal representation at the {city.name} Small Claims Court, helping you pursue recovery of what you are owed or defending a claim against you.
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

      {/* Types of Claims */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Small Claims Court Matters We Handle in {city.name}</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-6 max-w-3xl mx-auto">
            As a licensed paralegal, we can represent you in Small Claims Court for any civil dispute valued up to $50,000. Here are the most common types of claims we handle for {city.name} clients:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/services/unpaid-invoices" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><DollarSign className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Debt Recovery &amp; Unpaid Invoices</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Recover money owed to you or your {city.name} business. We file claims for unpaid invoices, loans, and debts up to $50,000.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">Includes demand letters, filing the Plaintiff&apos;s Claim, and representing you at the {city.name} courthouse.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/services/small-claims" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><FileText className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Contract Disputes</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Breach of contract claims for service agreements, purchase contracts, and business deals that went wrong.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">We help {city.name} businesses and individuals enforce contracts or recover damages for non-performance.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/services/vehicle-purchase-disputes" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><AlertTriangle className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Property Damage Claims</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Claims for damage to your property, vehicle, or personal belongings caused by another party&apos;s negligence.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">Includes vehicle accidents, contractor damage, and neighbour disputes in {city.name} and {regionText}.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/services/personal-injury-claims" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Users className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Consumer Complaints</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Claims against businesses for defective products, poor workmanship, or failure to deliver services as promised.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">We hold {city.name} businesses accountable when they fail to meet their obligations to consumers.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/services/employment-issues" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Scale className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Wrongful Dismissal (up to $50K)</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Employment claims including wrongful termination, unpaid wages, and severance disputes filed in {city.name} Small Claims Court.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">We represent {city.name} employees seeking compensation for wrongful dismissal up to the $50,000 limit.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/services/return-of-property" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><CheckCircle className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Return of Property</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Recovery of personal property, security deposits, or items wrongfully withheld by another party in {city.name}.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">Includes last month&apos;s rent deposits, personal belongings after a breakup, and business equipment disputes.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* Court Info */}
      <section className="py-16 md:py-24 bg-pastelbeige/10">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">{city.name} Small Claims Court Information</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-6 max-w-3xl mx-auto">
            Small Claims Court matters for {city.name} and {regionText} are heard at the {city.courthouse.name} at {city.courthouse.address}. Understanding the process and deadlines is critical to a successful outcome.
          </p>

          <div className="bg-white rounded-lg p-6 border border-pastelbeige shadow-sm max-w-2xl mx-auto mb-12">
            <h3 className="font-heading text-lg font-bold text-foreground mb-3 flex items-center gap-2"><Building2 className="w-5 h-5 text-primary" /> Courthouse Details</h3>
            <p className="font-paragraph text-foreground/70 text-sm mb-1"><strong>Location:</strong> {city.courthouse.name}</p>
            <p className="font-paragraph text-foreground/70 text-sm mb-1"><strong>Address:</strong> {city.courthouse.address}</p>
            <p className="font-paragraph text-foreground/60 text-sm">This is where all {city.name} Small Claims Court matters including settlement conferences and trials are heard.</p>
          </div>

          <h3 className="font-heading text-2xl font-bold text-foreground mb-8 text-center">The Small Claims Court Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div>
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 font-heading font-bold text-lg">1</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Demand Letter</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We send a formal demand letter to the opposing party. This often resolves the matter without going to court, saving you time and filing fees.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 font-heading font-bold text-lg">2</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Filing the Claim</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We prepare and file your Plaintiff&apos;s Claim or Defence at the {city.name} courthouse, ensuring all documents meet court requirements and deadlines.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 font-heading font-bold text-lg">3</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Settlement Conference</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We represent you at the mandatory settlement conference before a {city.name} deputy judge, negotiating a favourable resolution for your case.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 font-heading font-bold text-lg">4</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Trial Representation</h3>
              <p className="font-paragraph text-foreground/70 text-sm">If settlement is not reached, we present your case at trial with organized evidence, witness preparation, and persuasive legal arguments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Why Hire a Paralegal for {city.name} Small Claims Court</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Shield className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Licensed Professional</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Regulated by the Law Society of Ontario. Unlike hiring a lawyer, paralegal rates are significantly more affordable for Small Claims matters.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><MapPin className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">{city.name} Court Experience</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We know the {city.name} courthouse procedures, filing requirements, and what local deputy judges expect at settlement conferences and trials.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><DollarSign className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Thorough Case Preparation</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Professionally prepared claims with organized evidence result in higher settlement amounts and stronger trial outcomes.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Clock className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Save Your Time</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We handle all paperwork, court filings, service requirements, and appearances so you can focus on your life and business.</p>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} />
      <RelatedServices services={relatedServicesConfig.smallClaims} />

      {/* CTA */}
      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Need to File a Small Claims Court Case in {city.name}?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-4 max-w-2xl mx-auto">
            Whether you are owed money, dealing with a breach of contract, or need to defend a claim against you, Legal Assist can help you navigate {city.name} Small Claims Court.
          </p>
          <p className="font-paragraph text-base text-secondary-foreground/60 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation. We will review your case and advise you on the path to a successful outcome.
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
        name: `Legal Assist - Small Claims Court Paralegal in ${city.name}`,
        description: `Licensed paralegal representation for Small Claims Court matters up to $50,000 in ${city.name} and ${regionText}.`,
        url: `https://www.legalassist.london/locations/${city.slug}/small-claims`,
        telephone: PHONE_DISPLAY,
        areaServed: { '@type': 'City', name: city.name, containedInPlace: { '@type': 'AdministrativeArea', name: city.region } },
        datePublished: '2026-04-17',
        serviceType: 'Small Claims Court Representation',
        provider: {
          '@type': 'LocalBusiness',
          name: 'Legal Assist',
          address: { '@type': 'PostalAddress', addressLocality: city.name, addressRegion: 'ON', addressCountry: 'CA' },
        },
      }) }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <CityServiceCrossLinks city={city} currentService="small-claims" />
      <Footer />
    </div>
  );
}
