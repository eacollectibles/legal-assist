import SEO from '@/components/SEO';
import CityServiceCrossLinks from '@/components/CityServiceCrossLinks';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Shield, Clock, FileText, CheckCircle, AlertTriangle, Scale, Gavel, Building, MapPin, DollarSign, Volume2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQSection } from '@/components/FAQSection';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/phone-constants';
import { CityData } from '@/data/cityData';

interface ProvincialOffencesCityTemplateProps {
  city: CityData;
}

export default function ProvincialOffencesCityTemplate({ city }: ProvincialOffencesCityTemplateProps) {
  // Avoid redundant "in Ottawa and Ottawa" when city name equals county/region
  const countyText = city.county !== city.name ? city.county : `the ${city.name} area`;
  const regionText = city.region !== city.name ? city.region : `Greater ${city.name}`;

  const offenceTypes = [
    {
      icon: <Building className="w-6 h-6" />,
      title: 'Municipal Bylaw Violations',
      description: `Charged with a bylaw violation in ${city.name}? We represent you in Provincial Offences Court to challenge the charge or negotiate a reduced penalty.`,
      detail: 'Includes property standards, zoning violations, parking bylaws, and animal control.',
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Trespass Charges',
      description: 'Trespass to Property Act charges can result in fines up to $10,000. We review the circumstances and present defences on your behalf.',
      detail: 'Includes disputes about notice, implied permission, and lawful authority to be on the property.',
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: 'Regulatory Offences',
      description: 'Provincial regulatory charges under various Ontario statutes. We help individuals and businesses respond to regulatory enforcement actions.',
      detail: 'Includes Occupational Health and Safety Act, Environmental Protection Act, and other regulatory statutes.',
    },
    {
      icon: <Volume2 className="w-6 h-6" />,
      title: 'Noise Complaints',
      description: `Facing noise bylaw charges in ${city.name}? We defend individuals and businesses against noise-related provincial offence charges.`,
      detail: 'Includes residential noise, commercial noise, and construction noise violations.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Fire Code Violations',
      description: 'Fire code charges carry significant fines for property owners and businesses. We review inspection reports and present your defence at trial.',
      detail: 'Includes fire safety plan violations, blocked exits, missing equipment, and occupancy issues.',
    },
    {
      icon: <Gavel className="w-6 h-6" />,
      title: 'Liquor Licence Act Charges',
      description: 'Charges under the Liquor Licence and Control Act for individuals and licensed establishments. We advocate for reduced penalties or dismissal.',
      detail: 'Includes serving minors, over-service, operating without a licence, and consumption violations.',
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Bylaw Infractions',
      description: `General bylaw infractions issued by ${city.name} municipal enforcement officers. We review the evidence and determine the strongest defence available.`,
      detail: 'Includes sign bylaws, fence bylaws, yard maintenance, and business licensing.',
    },
  ];

  const penalties = [
    {
      title: 'Fines',
      description: 'Provincial offence fines range from small set fines to thousands of dollars depending on the statute and severity. Early resolution often reduces the amount.',
      icon: <DollarSign className="w-6 h-6 text-primary" />,
    },
    {
      title: 'Licence Suspensions',
      description: 'Some provincial offences (particularly under the Highway Traffic Act or Liquor Licence Act) can lead to licence suspensions. A paralegal can help you avoid or reduce suspension periods.',
      icon: <AlertTriangle className="w-6 h-6 text-primary" />,
    },
    {
      title: 'No Jail for Most Offences',
      description: 'The vast majority of provincial offences do not carry a risk of imprisonment. Part I (ticket) offences never result in jail. Part III (summons) offences rarely do.',
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
    },
    {
      title: 'No Criminal Record',
      description: 'Provincial offences do NOT create a criminal record. A conviction under the Provincial Offences Act is separate from the Criminal Code and will not appear on a criminal record check.',
      icon: <Shield className="w-6 h-6 text-primary" />,
    },
  ];

  const benefits = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: 'Licensed Paralegal',
      description: 'Regulated by the Law Society of Ontario. Licensed paralegals are authorized to represent you in Provincial Offences Court at a fraction of the cost of a lawyer.',
    },
    {
      icon: <MapPin className="w-8 h-8 text-primary" />,
      title: `${city.name} Court Experience`,
      description: `We understand the procedures, expectations, and processes at the ${city.name} Provincial Offences Court, helping you navigate the system confidently.`,
    },
    {
      icon: <DollarSign className="w-8 h-8 text-primary" />,
      title: 'Reduced Penalties',
      description: 'Professional representation often results in reduced fines, withdrawn charges, or alternative resolutions that minimize the impact on your record and finances.',
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: 'Save Your Time',
      description: 'We handle court appearances, filing deadlines, and disclosure requests so you do not have to take multiple days off work to deal with your matter.',
    },
  ];

  const faqs = [
    {
      question: 'Do provincial offences create a criminal record?',
      answer: 'No. Provincial offences do NOT create a criminal record. Convictions under the Provincial Offences Act (POA) are entirely separate from the Criminal Code. They will not appear on a criminal record check, background check for employment, or police vulnerable sector check.',
    },
    {
      question: `Where is the Provincial Offences Court in ${city.name}?`,
      answer: city.provincialOffencesCourt
        ? `Provincial offence matters for ${city.name} are heard at ${city.provincialOffencesCourt?.name}, located at ${city.provincialOffencesCourt?.address}. We can represent you at this location for all POA matters.`
        : `Provincial offence matters for ${city.name} are typically heard at ${city.courthouse.name}, located at ${city.courthouse.address}. Contact us for specific courtroom and scheduling information.`,
    },
    {
      question: 'Can a paralegal represent me for a provincial offence?',
      answer: 'Yes. Licensed paralegals are authorized to represent you in Provincial Offences Court for all Part I (ticket) and Part III (summons) matters. This includes entering pleas, requesting disclosure, negotiating with prosecutors, and representing you at trial.',
    },
    {
      question: 'What happens if I ignore a provincial offence ticket?',
      answer: 'If you do not respond to a Part I ticket within 15 days, you will be deemed not to dispute the charge and convicted in your absence. This can result in the full fine plus a victim fine surcharge. Defaulted fines can be sent to collections, and your licence may be suspended for unpaid fines.',
    },
    {
      question: 'Can provincial offences result in jail time?',
      answer: 'For Part I (ticket) offences, there is no possibility of jail. For Part III (summons) offences, imprisonment is theoretically possible for some charges but is exceedingly rare. Most provincial offences result only in fines. If jail is a possibility for your charge, we will advise you at your consultation.',
    },
    {
      question: 'How much does it cost to hire a paralegal for a provincial offence?',
      answer: 'Paralegal fees for provincial offences are typically a fraction of what a lawyer would charge. Fees vary depending on the complexity of the matter, but we provide a clear quote at your free consultation so you know the cost before proceeding.',
    },
  ];

  // Schema.org structured data
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `Provincial Offences Paralegal - ${city.name}, Ontario`,
    description: `Licensed paralegal representation for provincial offence charges in ${city.name}, Ontario. Bylaw violations, trespass charges, regulatory offences, and POA court defence.`,
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Ontario',
      },
    },
    datePublished: '2026-04-17',
        serviceType: 'Provincial Offences Defence',
    provider: {
      '@type': 'LegalService',
      name: 'Legal Assist',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'ON',
        addressCountry: 'CA',
      },
    },
  };

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
        title={`Provincial Offences Paralegal in ${city.name}, Ontario | Legal Assist`}
        description={`Licensed paralegal for provincial offence charges in ${city.name}, ${countyText}. Free consultation. Regulatory charges, bylaw violations, licensing offences.`}
        canonical={`https://www.legalassist.london/locations/${city.slug}/provincial-offences`}
      />
      <Header />
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 pt-4">
        <Breadcrumbs />
      </div>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Gavel className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Provincial Offences Paralegal — {city.name}, Ontario</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Provincial Offences Paralegal in {city.name}, Ontario
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-4 max-w-3xl">
              Licensed paralegal representation for provincial offence charges in {city.name} and {regionText}. We handle bylaw violations, trespass charges, regulatory offences, and other POA matters at the {city.name} Provincial Offences Court.
            </p>
            <p className="font-paragraph text-base text-foreground/60 mb-4 max-w-3xl">
              Provincial offences are prosecuted under the Provincial Offences Act (POA) and do <strong>not</strong> create a criminal record. However, fines, licence suspensions, and other consequences can still be significant. Legal Assist provides licensed paralegal representation to help you resolve your matter favourably.
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

      {/* Provincial Offences We Handle */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Provincial Offences We Handle in {city.name}</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">
            We represent {city.name} residents and businesses charged with provincial offences under various Ontario statutes and municipal bylaws.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offenceTypes.map((offence) => (
              <div key={offence.title} className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
                <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {offence.icon}
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{offence.title}</h3>
                <p className="font-paragraph text-foreground/70 mb-2">{offence.description}</p>
                <p className="font-paragraph text-foreground/50 text-sm">{offence.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* No Criminal Record Callout */}
      <section className="py-12 md:py-16">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="bg-green-50 border-l-4 border-green-500 p-6 md:p-8 rounded-r-lg max-w-4xl mx-auto">
            <h3 className="font-heading text-xl md:text-2xl font-bold text-green-800 mb-3 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              Provincial Offences Do NOT Create a Criminal Record
            </h3>
            <p className="font-paragraph text-green-900 text-lg mb-2">
              A conviction for a provincial offence is <strong>not</strong> a criminal conviction. It will not appear on a criminal record check, and it will not affect your ability to travel, obtain employment, or pass a background check.
            </p>
            <p className="font-paragraph text-green-800">
              While provincial offences are not criminal matters, the fines and consequences can still be substantial. Proper representation can often reduce or eliminate these penalties.
            </p>
          </div>
        </div>
      </section>

      {/* Provincial Offences Court Info */}
      <section className="py-16 md:py-24 bg-pastelbeige/10">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">{city.name} Provincial Offences Court</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Court Location
                  </h3>
                  {city.provincialOffencesCourt ? (
                    <>
                      <p className="font-paragraph text-foreground/80 font-semibold mb-1">{city.provincialOffencesCourt?.name}</p>
                      <p className="font-paragraph text-foreground/70 mb-4">{city.provincialOffencesCourt?.address}</p>
                    </>
                  ) : (
                    <>
                      <p className="font-paragraph text-foreground/80 font-semibold mb-1">{city.courthouse.name}</p>
                      <p className="font-paragraph text-foreground/70 mb-4">{city.courthouse.address}</p>
                    </>
                  )}
                  <p className="font-paragraph text-foreground/60 text-sm">
                    Provincial offence matters for {city.name} and surrounding areas in {regionText} are heard at this location.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Areas Served
                  </h3>
                  <p className="font-paragraph text-foreground/70 mb-2">
                    This court serves {city.name}{city.areasServed.length > 0 ? ` and surrounding communities:` : '.'}
                  </p>
                  {city.areasServed.length > 0 && (
                    <ul className="font-paragraph text-foreground/70 text-sm space-y-1">
                      {city.areasServed.map((area) => (
                        <li key={area} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          {area}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Penalty Information */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Provincial Offence Penalties</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">
            Understanding the potential consequences of a provincial offence conviction helps you make informed decisions about your defence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {penalties.map((penalty) => (
              <div key={penalty.title} className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    {penalty.icon}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">{penalty.title}</h3>
                    <p className="font-paragraph text-foreground/70 text-sm">{penalty.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits of Hiring a Paralegal */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Why Hire a Paralegal for Provincial Offences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="font-paragraph text-foreground/70 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={faqs} title={`Provincial Offences FAQ — ${city.name}`} />

      <RelatedServices services={relatedServicesConfig.locations} />

      {/* CTA */}
      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Facing a Provincial Offence Charge in {city.name}?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-4 max-w-2xl mx-auto">
            Whether you have received a ticket, a summons, or a notice from a municipal enforcement officer, Legal Assist provides licensed paralegal representation for all provincial offence matters in {city.name}.
          </p>
          <p className="font-paragraph text-base text-secondary-foreground/60 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation. We will review your charge and advise you on the appropriate approach to resolve your matter.
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

      <CityServiceCrossLinks city={city} currentService="provincial-offences" />
      <Footer />
    </div>
  );
}
