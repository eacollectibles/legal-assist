import SEO from '@/components/SEO';
import CityServiceCrossLinks from '@/components/CityServiceCrossLinks';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Users, Shield, Clock, MapPin, FileText, Scale, CheckCircle, AlertTriangle, Building2, Briefcase, Home, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQSection } from '@/components/FAQSection';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/phone-constants';
import type { CityData } from '@/data/cityData';

interface HRTOCityTemplateProps {
  city: CityData;
}

export default function HRTOCityTemplate({ city }: HRTOCityTemplateProps) {
  // Avoid redundant "in Ottawa and Ottawa" when city name equals county/region
  const countyText = city.county !== city.name ? city.county : `the ${city.name} area`;
  const regionText = city.region !== city.name ? city.region : `Greater ${city.name}`;

  const protectedGrounds = [
    'Race', 'Colour', 'Ancestry', 'Place of origin', 'Ethnic origin',
    'Citizenship', 'Creed (religion)', 'Sex (including pregnancy and breastfeeding)',
    'Sexual orientation', 'Gender identity', 'Gender expression',
    'Age', 'Marital status', 'Family status', 'Disability',
    'Receipt of public assistance (housing only)', 'Record of offences (employment only)',
  ];

  const faqs = [
    {
      question: `Can a paralegal represent me at the Human Rights Tribunal in ${city.name}?`,
      answer: `Yes, licensed paralegals are authorized to represent applicants and respondents at the Human Rights Tribunal of Ontario (HRTO). We handle all types of human rights complaints including employment discrimination, housing discrimination, and service discrimination for ${city.name} residents.`,
    },
    {
      question: `How long do I have to file an HRTO complaint?`,
      answer: `You have one year from the date of the last discriminatory act to file an application with the HRTO. It is important to act promptly, as late applications are rarely accepted. Contact us as soon as possible so we can assess your situation and file within the limitation period.`,
    },
    {
      question: `Do I have to attend the HRTO hearing in person?`,
      answer: `HRTO hearings are often conducted virtually via videoconference or teleconference, which is convenient for ${city.name} residents. However, some hearings may be held in person depending on the circumstances. We will prepare you for whichever format applies to your case.`,
    },
    {
      question: `What remedies can the HRTO order?`,
      answer: `The HRTO can order monetary compensation for injury to dignity, feelings, and self-respect, as well as lost wages. The Tribunal can also order non-monetary remedies such as reinstatement to a job, policy changes, training requirements, letters of apology, and accommodation of disability.`,
    },
    {
      question: `How much does it cost to file an HRTO complaint?`,
      answer: `There is no filing fee to submit an application to the HRTO. Our paralegal fees for representation vary depending on the complexity of the matter. We offer a free initial consultation to assess your case and provide a clear fee estimate.`,
    },
  ];

  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `Legal Assist - Human Rights Tribunal Paralegal in ${city.name}`,
    description: `Licensed paralegal representation for Human Rights Tribunal of Ontario (HRTO) applications in ${city.name}, ${regionText}. Employment, housing, and service discrimination complaints.`,
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Ontario',
      },
    },
    datePublished: '2026-04-17',
        serviceType: 'Human Rights Tribunal Representation',
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
        title={`Human Rights Tribunal Paralegal in ${city.name}, Ontario | Legal Assist`}
        description={`Licensed paralegal for Human Rights Tribunal of Ontario applications in ${city.name}, ${countyText}. Free consultation. Workplace discrimination, housing, services.`}
        canonical={`https://www.legalassist.london/locations/${city.slug}/human-rights`}
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
              <Users className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Human Rights Tribunal Paralegal — {city.name}, Ontario</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Human Rights Tribunal Paralegal in {city.name}, Ontario
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-4 max-w-3xl">
              Licensed paralegal representation for Human Rights Tribunal of Ontario (HRTO) applications in {city.name} and {countyText}. We help {city.name} residents file and defend discrimination complaints for employment, housing, and services under the Ontario Human Rights Code.
            </p>
            <p className="font-paragraph text-base text-foreground/60 mb-8 max-w-3xl">
              If you have experienced discrimination in a {city.name} workplace, been denied housing based on a protected ground, or received unequal treatment when accessing services, you have the right to file a complaint with the HRTO. Legal Assist provides licensed paralegal representation to help you assert your human rights and seek appropriate remedies.
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

      {/* Types of Human Rights Claims */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Types of Human Rights Claims We Handle in {city.name}</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-6 max-w-3xl mx-auto">
            The Ontario Human Rights Code protects {city.name} residents from discrimination based on protected grounds in employment, housing, and services. We represent applicants and respondents in all types of HRTO matters.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Briefcase className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Employment Discrimination</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Discrimination in hiring, termination, promotion, pay, and workplace conditions at {city.name} employers based on race, gender, disability, age, or other protected grounds.</p>
              <p className="font-paragraph text-foreground/50 text-sm">Includes failure to accommodate disability, pregnancy discrimination, and racial profiling in {city.name} workplaces.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Home className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Housing Discrimination</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Discrimination by {city.name} landlords in rental applications, evictions, or housing conditions based on family status, race, disability, receipt of public assistance, or other grounds.</p>
              <p className="font-paragraph text-foreground/50 text-sm">We help tenants who have been denied housing or treated unfairly based on protected grounds.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Users className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Service Discrimination</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Discrimination when accessing services, facilities, or goods in {city.name} — including healthcare, education, retail, and government services.</p>
              <p className="font-paragraph text-foreground/50 text-sm">We handle complaints about denial of service, unequal treatment, and failure to accommodate at {city.name} businesses and institutions.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Heart className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Disability &amp; Accommodation</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Failure to accommodate disability in the workplace, education, or services. Includes physical disabilities, mental health conditions, and addiction.</p>
              <p className="font-paragraph text-foreground/50 text-sm">{city.name} employers have a duty to accommodate to the point of undue hardship. We help enforce that obligation.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><AlertTriangle className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Harassment &amp; Reprisal</h3>
              <p className="font-paragraph text-foreground/70 mb-2">HRTO applications for workplace harassment, sexual harassment, and reprisal for asserting your human rights. Includes poisoned work environment claims.</p>
              <p className="font-paragraph text-foreground/50 text-sm">If your {city.name} employer retaliated against you for making a complaint, you may have a reprisal claim under the Code.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Protected Grounds */}
      <section className="py-16 md:py-24 bg-pastelbeige/10">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Protected Grounds Under the Ontario Human Rights Code</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">
            The Ontario Human Rights Code prohibits discrimination based on the following grounds. If you have experienced adverse treatment in {city.name} based on any of these grounds, you may have a valid human rights complaint.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {protectedGrounds.map((ground) => (
              <div key={ground} className="bg-white rounded-lg py-3 px-4 text-center border border-pastelbeige shadow-sm">
                <span className="font-paragraph text-sm text-foreground">{ground}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HRTO Process */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">The HRTO Process for {city.name} Applicants</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">
            Filing a human rights complaint can feel overwhelming. We guide {city.name} clients through every step, from the initial application to the final hearing and remedies.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div>
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 font-heading font-bold text-lg">1</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Free Consultation</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We review your situation, identify the protected grounds involved, and advise whether you have a viable human rights complaint. There is a one-year limitation period, so acting quickly is important.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 font-heading font-bold text-lg">2</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Application Filing</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We prepare and file your Form 1 application with the HRTO, clearly articulating the discrimination, the protected grounds, and the remedies you are seeking.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 font-heading font-bold text-lg">3</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Mediation</h3>
              <p className="font-paragraph text-foreground/70 text-sm">The HRTO typically offers mediation before a hearing. We negotiate diligently on your behalf to secure fair compensation, policy changes, or other appropriate remedies.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 font-heading font-bold text-lg">4</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Hearing Representation</h3>
              <p className="font-paragraph text-foreground/70 text-sm">If mediation does not resolve the matter, we represent you at the HRTO hearing with organized evidence, witness preparation, and persuasive legal submissions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* City HRTO Services */}
      <section className="py-16 md:py-24 bg-pastelbeige/10">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">{city.name} HRTO Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 border border-pastelbeige shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3 flex items-center gap-2"><Building2 className="w-5 h-5 text-primary" /> Virtual &amp; In-Person Hearings</h3>
              <p className="font-paragraph text-foreground/70 text-sm mb-2">HRTO hearings are frequently conducted virtually via videoconference, which is convenient for {city.name} residents. This means you can participate from home without travelling to a Tribunal office.</p>
              <p className="font-paragraph text-foreground/60 text-sm">Some hearings may be held in person depending on the complexity and nature of the case. We prepare you for either format.</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-pastelbeige shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3 flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> Local Representation</h3>
              <p className="font-paragraph text-foreground/70 text-sm mb-2">We provide HRTO representation for {city.name} residents and those in {countyText} and surrounding communities. Our familiarity with local employers and industries helps us build stronger cases.</p>
              <p className="font-paragraph text-foreground/60 text-sm">Areas served include {city.name}{city.areasServed.length > 0 ? `, ${city.areasServed.slice(0, 5).join(', ')}` : ''}, and surrounding communities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Why Choose Legal Assist for HRTO Matters in {city.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Shield className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Licensed Paralegal</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Licensed by the Law Society of Ontario and authorized to represent clients before the Human Rights Tribunal of Ontario.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Scale className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Focused Practice</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Our practice focuses on human rights law. We understand the HRTO process, the applicable legal tests, and the remedies available to applicants.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><FileText className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Thorough Preparation</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We prepare detailed applications, organize evidence, and prepare witnesses to present your case clearly and persuasively before the Tribunal.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Clock className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Free Consultation</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We offer a free initial consultation to review your situation and advise whether you have a viable human rights complaint. No obligation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Serving Areas */}
      <section className="py-16 md:py-24 bg-pastelbeige/10">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Serving {city.name} &amp; Surrounding Areas</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">We represent HRTO applicants and respondents throughout {city.name} and the surrounding {regionText} region:</p>
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Experienced Discrimination in {city.name}?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-4 max-w-2xl mx-auto">
            You do not have to face discrimination alone. Whether it happened at a {city.name} workplace, in a rental application, or when accessing services, Legal Assist can help you file a human rights complaint and pursue the compensation you may be entitled to.
          </p>
          <p className="font-paragraph text-base text-secondary-foreground/60 mb-8 max-w-2xl mx-auto">
            Contact us today for a free, confidential consultation. Remember, you have one year from the date of the discriminatory act to file with the HRTO.
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

      <CityServiceCrossLinks city={city} currentService="human-rights" />
      <Footer />
    </div>
  );
}
