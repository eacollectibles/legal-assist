import SEO from '@/components/SEO';
import CityServiceCrossLinks from '@/components/CityServiceCrossLinks';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Scale, Shield, Clock, FileText, CheckCircle, AlertTriangle, Users, Heart, DollarSign } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQSection } from '@/components/FAQSection';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/phone-constants';
import { CityData } from '@/data/cityData';

interface SBTCityTemplateProps {
  city: CityData;
}

export default function SBTCityTemplate({ city }: SBTCityTemplateProps) {
  // Avoid redundant "in Ottawa and Ottawa" when city name equals county/region
  const countyText = city.county !== city.name ? city.county : `the ${city.name} area`;
  const regionText = city.region !== city.name ? city.region : `Greater ${city.name}`;

  const sbtAppeals = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'ODSP Denials',
      description: `Denied Ontario Disability Support Program benefits in ${city.name}? We help you prepare a strong appeal to the Social Benefits Tribunal with supporting medical documentation.`,
      detail: 'Includes initial applications that were refused and reassessment decisions.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Ontario Works Denials',
      description: `If your Ontario Works application was denied or benefits reduced in ${city.name}, we can represent you at the SBT to seek a reversal of that decision.`,
      detail: 'Covers eligibility disputes, income calculation errors, and participation requirements.',
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Benefit Terminations',
      description: 'Had your ODSP or OW benefits suddenly cut off? We review the decision notice, identify grounds for appeal, and advocate for reinstatement of your benefits.',
      detail: 'Time-sensitive — you must file within 30 days of the decision.',
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Rate Reductions',
      description: 'If your benefit amount was reduced without proper justification, we can challenge the decision at the Social Benefits Tribunal on your behalf.',
      detail: 'Includes shelter allowance reductions and changes to benefit calculations.',
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Special Diet Allowances',
      description: 'Denied a special diet allowance for a medical condition? We help you gather the required medical evidence and present your case to the SBT.',
      detail: 'Requires a completed Special Diet Allowance form from your healthcare provider.',
    },
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Initial Assessment',
      description: `We review your decision letter and supporting documents to determine the strength of your SBT appeal. We advise ${city.name} clients on the likelihood of success and the evidence needed.`,
    },
    {
      step: '2',
      title: 'Appeal Filing Within 30 Days',
      description: 'We prepare and file your Notice of Appeal with the Social Benefits Tribunal within the strict 30-day deadline. Missing this deadline can mean losing your right to appeal.',
    },
    {
      step: '3',
      title: 'Evidence Preparation',
      description: 'We gather medical records, financial documents, and supporting letters from healthcare providers to build a persuasive case for the tribunal hearing.',
    },
    {
      step: '4',
      title: 'Hearing Representation',
      description: `We represent you at the SBT hearing, presenting your evidence and making legal arguments on your behalf. Most hearings are conducted by phone or video for ${city.name} residents.`,
    },
  ];

  const benefits = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: 'Licensed Paralegal',
      description: 'Regulated by the Law Society of Ontario with experience in social benefits law. Paralegal representation is more affordable than hiring a lawyer for tribunal matters.',
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: 'Deadline Management',
      description: 'SBT appeals have strict 30-day filing deadlines. We ensure your appeal is filed on time and all procedural requirements are met.',
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: 'Evidence Organization',
      description: 'We compile and organize medical evidence, financial records, and supporting documents into a clear, persuasive submission for the tribunal.',
    },
    {
      icon: <Scale className="w-8 h-8 text-primary" />,
      title: 'Tribunal Experience',
      description: 'We understand SBT procedures, what adjudicators look for, and how to present evidence that supports a favourable outcome for your appeal.',
    },
  ];

  const faqs = [
    {
      question: `What is the Social Benefits Tribunal?`,
      answer: `The Social Benefits Tribunal (SBT) is an independent tribunal that hears appeals from people who disagree with decisions about their Ontario Works (OW) or Ontario Disability Support Program (ODSP) benefits. It operates under the Ontario Works Act and the ODSP Act.`,
    },
    {
      question: `How long do I have to file an SBT appeal in ${city.name}?`,
      answer: `You have 30 days from the date of the decision you want to appeal. This deadline is strictly enforced. If you miss it, you may be able to request a late filing, but there is no guarantee it will be accepted. Contact us as soon as you receive an unfavourable decision.`,
    },
    {
      question: 'Can a paralegal represent me at the SBT?',
      answer: 'Yes. Licensed paralegals are authorized to represent clients at the Social Benefits Tribunal. We handle all aspects of the appeal, from filing the notice to presenting your case at the hearing.',
    },
    {
      question: 'What evidence do I need for an SBT appeal?',
      answer: 'The evidence depends on the type of appeal. For ODSP disability appeals, you typically need updated medical reports, a Disability Determination Package, and letters from your healthcare providers. For OW appeals, financial records and proof of eligibility are often required.',
    },
    {
      question: 'How are SBT hearings conducted?',
      answer: `Most SBT hearings are conducted by telephone or video conference, which means ${city.name} residents do not usually need to travel. In-person hearings may be arranged in certain circumstances. We prepare you for what to expect during the hearing.`,
    },
    {
      question: 'What happens if I lose my SBT appeal?',
      answer: 'If the SBT dismisses your appeal, you may be able to request a reconsideration or seek judicial review at Divisional Court. We can advise you on whether further steps are appropriate based on the tribunal decision.',
    },
  ];

  // Schema.org structured data
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `Social Benefits Tribunal Paralegal - ${city.name}, Ontario`,
    description: `Licensed paralegal representation for Social Benefits Tribunal appeals in ${city.name}, Ontario. ODSP denials, Ontario Works disputes, benefit terminations, and rate reductions.`,
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Ontario',
      },
    },
    datePublished: '2026-04-17',
        serviceType: 'Social Benefits Tribunal Appeals',
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
        title={`Social Benefits Tribunal Paralegal in ${city.name}, Ontario | Legal Assist`}
        description={`Licensed paralegal for ODSP and Ontario Works appeals in ${city.name}, ${countyText}. Free consultation. Social Benefits Tribunal representation.`}
        canonical={`https://www.legalassist.london/locations/${city.slug}/social-benefits`}
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
              <Scale className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Social Benefits Tribunal Paralegal — {city.name}, Ontario</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Social Benefits Tribunal Paralegal in {city.name}, Ontario
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-4 max-w-3xl">
              Licensed paralegal representation for ODSP and Ontario Works appeals at the Social Benefits Tribunal. We help {city.name} and {regionText} residents who have been denied benefits or had their assistance reduced.
            </p>
            <p className="font-paragraph text-base text-foreground/60 mb-8 max-w-3xl">
              Receiving a denial or reduction of social benefits can be overwhelming. Legal Assist provides licensed paralegal representation to help you navigate the SBT appeal process, prepare your evidence, and present a strong case at your hearing.
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

      {/* SBT Appeals We Handle */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">SBT Appeals We Handle</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">
            We represent {city.name} clients in Social Benefits Tribunal appeals involving ODSP, Ontario Works, and related benefit decisions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sbtAppeals.map((appeal) => (
              <div key={appeal.title} className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
                <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {appeal.icon}
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{appeal.title}</h3>
                <p className="font-paragraph text-foreground/70 mb-2">{appeal.description}</p>
                <p className="font-paragraph text-foreground/50 text-sm">{appeal.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The SBT Appeal Process */}
      <section className="py-16 md:py-24 bg-pastelbeige/10">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">The SBT Appeal Process</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">
            We guide {city.name} clients through each step of the Social Benefits Tribunal appeal, from the initial review to your hearing.
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
          <div className="bg-red-50 border-l-4 border-red-500 p-6 md:p-8 rounded-r-lg max-w-4xl mx-auto">
            <h3 className="font-heading text-xl md:text-2xl font-bold text-red-800 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              Critical 30-Day Deadline
            </h3>
            <p className="font-paragraph text-red-900 text-lg mb-2">
              You have <strong>30 days from the decision</strong> to file an SBT appeal. Missing this deadline may permanently forfeit your right to challenge the decision.
            </p>
            <p className="font-paragraph text-red-800">
              If you are in {city.name} and have received an unfavourable ODSP or Ontario Works decision, contact us immediately so we can assess your case and file your appeal on time.
            </p>
          </div>
        </div>
      </section>

      {/* City Social Benefits Context */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">{city.name} Social Benefits Context</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-pastelbeige/20 rounded-xl p-8 border border-pastelbeige">
              <p className="font-paragraph text-foreground/80 text-lg mb-4">
                Residents of {city.name} and the broader {regionText} area who rely on ODSP or Ontario Works may face unique challenges related to local housing costs, healthcare access, and employment opportunities. When benefit decisions do not reflect your actual circumstances, an SBT appeal can help correct the record.
              </p>
              <p className="font-paragraph text-foreground/70 mb-4">
                We serve clients throughout {city.name} and surrounding communities{city.areasServed.length > 0 ? `, including ${city.areasServed.join(', ')}` : ''}. Whether your appeal involves a disability determination, financial eligibility, or a benefit calculation error, we provide thorough preparation and dedicated representation.
              </p>
              {city.landmarks.length > 0 && (
                <p className="font-paragraph text-foreground/70">
                  As a community that includes {city.landmarks.slice(0, 3).join(', ')}, {city.name} has diverse residents with varying needs. We understand the local context and tailor our approach to each client&apos;s situation.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits of Hiring a Paralegal */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Why Hire a Paralegal for Your SBT Appeal</h2>
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
      <FAQSection faqs={faqs} title={`Social Benefits Tribunal FAQ — ${city.name}`} />

      <RelatedServices services={relatedServicesConfig.locations} />

      {/* CTA */}
      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Denied ODSP or Ontario Works in {city.name}?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-4 max-w-2xl mx-auto">
            If you have received a decision denying, reducing, or terminating your social benefits, you have 30 days to file an appeal. Legal Assist can help you through the process.
          </p>
          <p className="font-paragraph text-base text-secondary-foreground/60 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation. We will review your decision letter and advise you on the strength of your appeal.
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

      <CityServiceCrossLinks city={city} currentService="social-benefits" />
      <Footer />
    </div>
  );
}
