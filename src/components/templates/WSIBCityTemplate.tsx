import SEO from '@/components/SEO';
import CityServiceCrossLinks from '@/components/CityServiceCrossLinks';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Shield, Clock, FileText, CheckCircle, AlertTriangle, Scale, Briefcase, HardHat, DollarSign, Building2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQSection } from '@/components/FAQSection';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/phone-constants';
import { CityData } from '@/data/cityData';

interface WSIBCityTemplateProps {
  city: CityData;
}

export default function WSIBCityTemplate({ city }: WSIBCityTemplateProps) {
  // Avoid redundant "in Ottawa and Ottawa" when city name equals county/region
  const countyText = city.county !== city.name ? city.county : `the ${city.name} area`;
  const regionText = city.region !== city.name ? city.region : `Greater ${city.name}`;

  const wsibMatters = [
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Initial Claim Denials',
      description: `Had your WSIB claim denied in ${city.name}? We review the decision, identify the grounds for appeal, and help you gather the evidence needed to challenge it.`,
      detail: 'Includes claims denied for late filing, insufficient medical evidence, or causation disputes.',
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Loss of Earnings Disputes',
      description: 'If WSIB has calculated your loss of earnings benefits incorrectly or reduced your payments, we can challenge the wage calculation and seek a reassessment.',
      detail: 'Covers partial, full, and long-term loss of earnings benefit disputes.',
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: 'NEL Assessments',
      description: 'Non-Economic Loss (NEL) assessments determine compensation for permanent impairment. We advocate for a fair assessment that reflects the true extent of your injury.',
      detail: 'Includes challenging low NEL ratings and requesting reassessments based on updated medical evidence.',
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: 'Return to Work Disputes',
      description: `If your employer or WSIB is pressuring you to return to work before you are medically ready, we advocate for your right to recover fully before resuming duties.`,
      detail: 'Includes disputes about suitable modified work and work transition plans.',
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'WSIB Appeals',
      description: 'We represent you at WSIB internal reviews (Appeals Resolution Officer) to challenge unfavourable decisions about your claim or benefits.',
      detail: 'You have 6 months from the decision to request an internal review.',
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: 'WSIAT Representation',
      description: 'Licensed paralegals can appear at the Workplace Safety and Insurance Appeals Tribunal (WSIAT). We prepare and present your case at this final level of appeal.',
      detail: 'WSIAT is the final appeal body for WSIB decisions in Ontario.',
    },
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Claim Review',
      description: `We review your WSIB claim file, decision letters, and medical records to assess the strength of your case and identify the appropriate path forward for ${city.name} workers.`,
    },
    {
      step: '2',
      title: 'Evidence Gathering',
      description: 'We help you obtain updated medical reports, workplace documentation, and any additional evidence needed to support your claim or appeal.',
    },
    {
      step: '3',
      title: 'Internal Review',
      description: 'We file an objection with WSIB and represent you before the Appeals Resolution Officer (ARO), presenting evidence and legal arguments to challenge the decision.',
    },
    {
      step: '4',
      title: 'WSIAT Appeal',
      description: 'If the internal review is unsuccessful, we prepare and present your case at the Workplace Safety and Insurance Appeals Tribunal for a final decision.',
    },
  ];

  const benefits = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: 'Licensed Paralegal',
      description: 'Regulated by the Law Society of Ontario. Licensed paralegals can represent you at both WSIB internal reviews and WSIAT hearings at a more affordable rate than a lawyer.',
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: 'Thorough Case Preparation',
      description: 'We obtain and organize medical records, workplace incident reports, and wage documentation to build a comprehensive case file for your claim or appeal.',
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: 'Deadline Management',
      description: 'WSIB has strict timelines: 6 months for internal reviews, 6 months for WSIAT appeals. We track every deadline so your appeal rights are preserved.',
    },
    {
      icon: <Scale className="w-8 h-8 text-primary" />,
      title: 'Tribunal Advocacy',
      description: 'We understand WSIB policy and WSIAT procedures, presenting your case clearly and diligently to seek a favourable outcome for your claim.',
    },
  ];

  const faqs = [
    {
      question: `What should I do if my WSIB claim is denied in ${city.name}?`,
      answer: `If your WSIB claim is denied, you have 6 months from the date of the decision to request an internal review by an Appeals Resolution Officer. Contact us promptly so we can review the decision and advise you on the strength of an appeal. Do not wait — the 6-month deadline is strictly enforced.`,
    },
    {
      question: 'Can a paralegal represent me at WSIAT?',
      answer: 'Yes. Licensed paralegals are authorized to represent injured workers at the Workplace Safety and Insurance Appeals Tribunal (WSIAT). We handle case preparation, evidence submission, and oral advocacy at the hearing.',
    },
    {
      question: 'How much does WSIB pay for lost wages?',
      answer: 'WSIB replaces 85% of your net average earnings, up to an annual maximum set each year. The amount depends on your pre-injury earnings and the extent of your disability. If you believe your benefit calculation is wrong, we can request a reassessment.',
    },
    {
      question: 'What is a Non-Economic Loss (NEL) award?',
      answer: 'A NEL award compensates you for permanent impairment resulting from a workplace injury. The amount is based on a percentage rating determined by a WSIB-approved healthcare professional. If your NEL rating seems too low, we can challenge it and seek a reassessment.',
    },
    {
      question: 'Can my employer retaliate for filing a WSIB claim?',
      answer: 'No. Ontario law prohibits employers from penalizing workers who file WSIB claims. If your employer has demoted, dismissed, or disciplined you for filing a claim, document everything and contact us. You may have grounds for a separate complaint.',
    },
    {
      question: 'How long does a WSIB appeal take?',
      answer: 'Internal reviews by an Appeals Resolution Officer typically take 3 to 6 months. WSIAT appeals may take 12 to 18 months or longer, depending on the complexity of your case and the tribunal schedule. We keep you informed throughout the process.',
    },
  ];

  // Schema.org structured data
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `WSIB Claims Paralegal - ${city.name}, Ontario`,
    description: `Licensed paralegal representation for WSIB claims and appeals in ${city.name}, Ontario. Workplace injury claims, loss of earnings disputes, NEL assessments, and WSIAT representation.`,
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Ontario',
      },
    },
    datePublished: '2026-04-17',
        serviceType: 'WSIB Claims and Appeals',
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
        title={`WSIB Claims Paralegal in ${city.name}, Ontario | Legal Assist`}
        description={`Licensed paralegal for WSIB claims and workplace injury appeals in ${city.name}, ${countyText}. Free consultation. WSIB appeals, WSIAT representation.`}
        canonical={`https://www.legalassist.london/locations/${city.slug}/wsib`}
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
              <HardHat className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">WSIB Claims Paralegal — {city.name}, Ontario</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              WSIB Claims Paralegal in {city.name}, Ontario
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-4 max-w-3xl">
              Licensed paralegal representation for workplace injury claims and WSIB appeals in {city.name} and {regionText}. We help injured workers navigate the WSIB system, from initial claims to WSIAT hearings.
            </p>
            <p className="font-paragraph text-base text-foreground/60 mb-8 max-w-3xl">
              A workplace injury can affect every part of your life. When WSIB denies your claim or reduces your benefits, you need professional representation to advocate for the compensation you are entitled to. Legal Assist provides diligent paralegal support for workers in {city.name} and surrounding areas.
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

      {/* WSIB Matters We Handle */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">WSIB Matters We Handle</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">
            We represent {city.name} workers in all types of WSIB disputes, from initial claim denials to appeals at the Workplace Safety and Insurance Appeals Tribunal.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wsibMatters.map((matter) => (
              <div key={matter.title} className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
                <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {matter.icon}
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{matter.title}</h3>
                <p className="font-paragraph text-foreground/70 mb-2">{matter.description}</p>
                <p className="font-paragraph text-foreground/50 text-sm">{matter.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WSIB Appeals Process */}
      <section className="py-16 md:py-24 bg-pastelbeige/10">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">The WSIB Appeals Process</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">
            We guide {city.name} workers through each level of the WSIB appeals system, from internal review to WSIAT.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {processSteps.map((step) => (
              <div key={step.step}>
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 font-heading font-bold text-lg">{step.step}</div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="font-paragraph text-foreground/70 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Deadline Callout */}
      <section className="py-12 md:py-16">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 md:p-8 rounded-r-lg max-w-4xl mx-auto">
            <h3 className="font-heading text-xl md:text-2xl font-bold text-blue-800 mb-3 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              6-Month Deadline
            </h3>
            <p className="font-paragraph text-blue-900 text-lg mb-2">
              You have <strong>6 months from the WSIB decision</strong> to request an internal review. You also have <strong>6 months</strong> to file an appeal to WSIAT after an internal review decision.
            </p>
            <p className="font-paragraph text-blue-800">
              Missing these deadlines can permanently forfeit your appeal rights. If you are a {city.name} worker with a denied or reduced claim, contact us promptly.
            </p>
          </div>
        </div>
      </section>

      {/* City Workplace Context */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">{city.name} Workplace Context</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-pastelbeige/20 rounded-xl p-8 border border-pastelbeige">
              <p className="font-paragraph text-foreground/80 text-lg mb-4">
                {city.name} and the {regionText} area are home to diverse industries and employers{city.landmarks.length > 0 ? `, including ${city.landmarks.slice(0, 3).join(', ')}` : ''}. Workers across manufacturing, healthcare, construction, retail, and other sectors may experience workplace injuries that require WSIB support.
              </p>
              <p className="font-paragraph text-foreground/70 mb-4">
                We serve injured workers throughout {city.name} and surrounding communities{city.areasServed.length > 0 ? `, including ${city.areasServed.join(', ')}` : ''}. Whether your injury occurred on a factory floor, a construction site, in a warehouse, or at a desk, you deserve fair treatment from the WSIB system.
              </p>
              <p className="font-paragraph text-foreground/70">
                Our paralegal team understands the types of workplace injuries common in the {regionText} area and prepares cases with the specific medical and vocational evidence that WSIB and WSIAT require.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits of Hiring a Paralegal */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Why Hire a Paralegal for Your WSIB Claim</h2>
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
      <FAQSection faqs={faqs} title={`WSIB Claims FAQ — ${city.name}`} />

      <RelatedServices services={relatedServicesConfig.locations} />

      {/* CTA */}
      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Injured at Work in {city.name}?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-4 max-w-2xl mx-auto">
            Whether your WSIB claim has been denied, your benefits reduced, or you need help with a WSIAT appeal, Legal Assist provides licensed paralegal representation for {city.name} workers.
          </p>
          <p className="font-paragraph text-base text-secondary-foreground/60 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation. We will review your WSIB file and advise you on the appropriate path forward.
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

      <CityServiceCrossLinks city={city} currentService="wsib" />
      <Footer />
    </div>
  );
}
