import SEO from '@/components/SEO';
import CityServiceCrossLinks from '@/components/CityServiceCrossLinks';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Shield, Clock, MapPin, FileText, Scale, CheckCircle, AlertTriangle, Building2, Gavel } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQSection } from '@/components/FAQSection';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/phone-constants';
import type { CityData } from '@/data/cityData';

interface CriminalMattersCityTemplateProps {
  city: CityData;
}

export default function CriminalMattersCityTemplate({ city }: CriminalMattersCityTemplateProps) {
  // Avoid redundant "in Ottawa and Ottawa" when city name equals county/region
  const countyText = city.county !== city.name ? city.county : `the ${city.name} area`;
  const regionText = city.region !== city.name ? city.region : `Greater ${city.name}`;

  const faqs = [
    {
      question: `Can a paralegal represent me for criminal charges in ${city.name}?`,
      answer: `Yes, licensed paralegals can represent you in Provincial Court for summary conviction offences in ${city.name}. This includes charges such as simple assault, theft under $5,000, mischief under $5,000, causing a disturbance, and breach of probation. For indictable offences or matters in Superior Court, you will need to retain a lawyer.`,
    },
    {
      question: `What is a summary conviction offence?`,
      answer: `Summary conviction offences are less serious criminal charges tried in Provincial Court without a jury. They carry maximum sentences of up to 2 years less a day imprisonment and/or fines. Examples include simple assault, theft under $5,000, mischief under $5,000, causing a disturbance, trespass at night, and public intoxication.`,
    },
    {
      question: `What happens if I am charged with a criminal offence in ${city.name}?`,
      answer: `You will typically receive a court date to appear at ${city.courthouse.name}. It is important to attend or have legal representation. A licensed paralegal can review your disclosure, negotiate with the Crown, and represent you at trial for summary conviction matters. Early legal advice can help you understand your options and build a strong defence.`,
    },
    {
      question: `Will I get a criminal record if convicted of a summary conviction offence?`,
      answer: `Yes, a conviction for a summary conviction offence results in a criminal record, which can affect employment, travel, and immigration status. That is why it is important to mount a proper defence. A licensed paralegal can work to have charges withdrawn, reduced, or seek alternative dispositions such as peace bonds or conditional discharges where appropriate.`,
    },
    {
      question: `How much does a criminal defence paralegal cost in ${city.name}?`,
      answer: `Fees vary depending on the complexity of the charge and whether the matter proceeds to trial. We offer a free initial consultation to review your case and provide a clear fee estimate. Our rates are typically more affordable than retaining a lawyer for equivalent summary conviction matters.`,
    },
  ];

  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `Legal Assist - Criminal Defence Paralegal in ${city.name}`,
    description: `Licensed paralegal representation for summary conviction criminal offences in ${city.name}, ${regionText}. Simple assault, theft under $5,000, mischief, and other Provincial Court matters.`,
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Ontario',
      },
    },
    datePublished: '2026-04-17',
        serviceType: 'Criminal Defence - Summary Conviction Offences',
    provider: {
      '@type': 'LegalService',
      name: 'Legal Assist',
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
        title={`Criminal Defence Paralegal in ${city.name}, Ontario | Legal Assist`}
        description={`Licensed paralegal for summary conviction criminal defence in ${city.name}, ${countyText}. Free consultation. Assault, theft under \$5,000, mischief charges.`}
        canonical={`https://www.legalassist.london/locations/${city.slug}/criminal-defence`}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 pt-4">
        <Breadcrumbs />
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Gavel className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Criminal Defence Paralegal — {city.name}, Ontario</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Criminal Defence Paralegal in {city.name}, Ontario
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-4 max-w-3xl">
              Licensed paralegal representation for summary conviction criminal offences in {city.name} and {countyText}. We represent individuals charged with simple assault, theft under $5,000, mischief, causing a disturbance, and other summary conviction matters at {city.courthouse.name}.
            </p>
            <p className="font-paragraph text-base text-foreground/60 mb-8 max-w-3xl">
              A criminal charge can have serious consequences for your employment, travel, and personal life. Legal Assist provides licensed paralegal representation to help {city.name} residents navigate the criminal justice process and work toward a favourable outcome.
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

      {/* Summary Conviction Offences We Handle */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Summary Conviction Offences We Handle in {city.name}</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-6 max-w-3xl mx-auto">
            As licensed paralegals, we represent clients charged with summary conviction offences in Provincial Court. These are the types of criminal matters we handle for {city.name} residents.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><Shield className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Simple Assault</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Defence for simple assault charges (s. 266 Criminal Code) where the Crown proceeds summarily. Includes domestic assault matters heard in Provincial Court.</p>
              <p className="font-paragraph text-foreground/50 text-sm">A conviction can result in a criminal record, probation, and difficulty with employment and travel.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><Scale className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Theft Under $5,000</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Representation for shoplifting and other theft charges under $5,000 (s. 334(b) Criminal Code) when proceeded with summarily.</p>
              <p className="font-paragraph text-foreground/50 text-sm">We work to achieve charge withdrawals, conditional discharges, or diversion where available.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><AlertTriangle className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Mischief Under $5,000</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Defence for property damage or mischief charges under $5,000 (s. 430(4) Criminal Code). Includes graffiti, minor vandalism, and property interference.</p>
              <p className="font-paragraph text-foreground/50 text-sm">We review the evidence and explore restitution or diversion options where appropriate.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><FileText className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Causing a Disturbance</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Charges for causing a disturbance in or near a public place by fighting, shouting, or using obscene language (s. 175 Criminal Code).</p>
              <p className="font-paragraph text-foreground/50 text-sm">These charges often arise from isolated incidents and can frequently be resolved with appropriate representation.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><Clock className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Trespass at Night</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Defence for trespass at night charges (s. 177 Criminal Code) and Trespass to Property Act charges in {city.name}.</p>
              <p className="font-paragraph text-foreground/50 text-sm">We assess the circumstances and develop a defence strategy based on the specific facts of your case.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><Gavel className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Breach of Probation</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Representation for breach of probation order charges (s. 733.1 Criminal Code) when proceeded with summarily.</p>
              <p className="font-paragraph text-foreground/50 text-sm">Breach of probation is taken seriously by courts. We advocate for proportionate outcomes and work to address underlying issues.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><CheckCircle className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Public Intoxication</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Defence for charges related to public intoxication and being intoxicated in a public place under the Liquor Licence and Control Act.</p>
              <p className="font-paragraph text-foreground/50 text-sm">We review the evidence and circumstances to determine the most appropriate defence strategy.</p>
            </div>
          </div>

          {/* Scope Disclaimer */}
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 mt-8 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-heading text-lg font-bold text-destructive mb-2">Important Scope Limitation</h3>
                <p className="font-paragraph text-foreground/80">
                  We can only represent you for summary conviction offences in Provincial Court. For indictable offences or matters in Superior Court, you will need to retain a lawyer. If you are unsure whether your charge is summary or indictable, contact us for a free consultation and we will advise you accordingly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Court Information */}
      <section className="py-16 md:py-24 bg-pastelbeige/10">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">{city.name} Court Information</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">
            Criminal matters in {city.name} are heard at the local courthouse. We are familiar with the court procedures, local Crown attorneys, and the processes at this location.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 border border-pastelbeige shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3 flex items-center gap-2"><Building2 className="w-5 h-5 text-primary" /> Courthouse</h3>
              <p className="font-paragraph text-foreground/70 text-sm mb-2 font-semibold">{city.courthouse.name}</p>
              <p className="font-paragraph text-foreground/70 text-sm mb-2">{city.courthouse.address}</p>
              <p className="font-paragraph text-foreground/60 text-sm">This is where summary conviction criminal matters for {city.name} and the surrounding area are typically heard.</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-pastelbeige shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3 flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /> What to Expect</h3>
              <p className="font-paragraph text-foreground/70 text-sm mb-2">After being charged, you will receive a court date. It is critical to attend or have legal representation. Missing a court date can result in a bench warrant for your arrest.</p>
              <p className="font-paragraph text-foreground/60 text-sm">We handle all court appearances on your behalf for summary conviction matters, so you do not need to miss work or face the stress of appearing alone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Criminal Defence Process */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">The Criminal Defence Process</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">
            We guide {city.name} clients through every stage of the criminal defence process, from the initial consultation to resolution of the matter.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div>
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 font-heading font-bold text-lg">1</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Free Consultation</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We review your charge, explain the potential consequences, and advise on your options. We will tell you honestly whether we can represent you or whether you need a lawyer for your specific charge.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 font-heading font-bold text-lg">2</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Disclosure Review</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We request and carefully review the Crown&apos;s disclosure package, including police reports, witness statements, and any other evidence. This helps us identify weaknesses in the Crown&apos;s case and build your defence.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 font-heading font-bold text-lg">3</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Crown Negotiation</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We negotiate diligently with the Crown attorney to seek charge withdrawals, reduced charges, diversion programs, peace bonds, or other favourable resolutions where appropriate.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 font-heading font-bold text-lg">4</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Trial Representation</h3>
              <p className="font-paragraph text-foreground/70 text-sm">If a resolution cannot be reached, we represent you at trial with thorough preparation, cross-examination of Crown witnesses, and persuasive submissions to the court on your behalf.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-pastelbeige/10">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Why Choose Legal Assist for Criminal Defence in {city.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Shield className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Licensed Paralegal</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Licensed by the Law Society of Ontario and authorized to represent clients in Provincial Court for summary conviction offences.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Scale className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Focused Practice</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Our practice focuses on summary conviction defence. We understand the procedures, the law, and the practical realities of Provincial Court proceedings.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><MapPin className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Serving {city.name}</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We represent clients throughout {city.name}, {countyText}, and surrounding communities{city.areasServed.length > 0 ? `, including ${city.areasServed.slice(0, 3).join(', ')}` : ''}.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Clock className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Free Consultation</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We offer a free initial consultation to review your charge and explain your options. No obligation and no pressure — just straightforward legal advice.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Serving Areas */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Serving {city.name} &amp; Surrounding Areas</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">We represent clients facing summary conviction charges throughout {city.name} and the surrounding {regionText} region:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {city.areasServed.map((area) => (
              <div key={area} className="bg-white rounded-lg py-3 px-4 text-center border border-pastelbeige shadow-sm">
                <span className="font-paragraph text-sm text-foreground">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} />

      {/* CTA */}
      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Facing Criminal Charges in {city.name}?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-4 max-w-2xl mx-auto">
            Do not face criminal charges without representation. Whether you have been charged with assault, theft, mischief, or another summary conviction offence in {city.name}, Legal Assist can help you understand your options and advocate for a favourable resolution.
          </p>
          <p className="font-paragraph text-base text-secondary-foreground/60 mb-8 max-w-2xl mx-auto">
            Contact us today for a free, confidential consultation. Early legal advice can make a significant difference in the outcome of your case.
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

      <CityServiceCrossLinks city={city} currentService="criminal-defence" />
      <Footer />
    </div>
  );
}
