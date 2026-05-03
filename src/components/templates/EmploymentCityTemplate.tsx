import SEO from '@/components/SEO';
import CityServiceCrossLinks from '@/components/CityServiceCrossLinks';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Briefcase, Shield, Clock, MapPin, FileText, Scale, CheckCircle, AlertTriangle, Building2, DollarSign, Users, TrendingDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQSection } from '@/components/FAQSection';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/phone-constants';
import type { CityData } from '@/data/cityData';

interface EmploymentCityTemplateProps {
  city: CityData;
}

export default function EmploymentCityTemplate({ city }: EmploymentCityTemplateProps) {
  // Avoid redundant "in Ottawa and Ottawa" when city name equals county/region
  const countyText = city.county !== city.name ? city.county : `the ${city.name} area`;
  const regionText = city.region !== city.name ? city.region : `Greater ${city.name}`;

  const faqs = [
    {
      question: `Can a paralegal help with wrongful dismissal in ${city.name}?`,
      answer: `Yes, licensed paralegals can represent you in Small Claims Court for wrongful dismissal claims up to $50,000 in ${city.name}. This includes claims for termination pay, severance pay, and damages for wrongful dismissal. For claims exceeding $50,000, we can refer you to an employment lawyer.`,
    },
    {
      question: `What is the minimum notice period under the ESA?`,
      answer: `Under Ontario's Employment Standards Act, the minimum notice period ranges from 1 week (for employees with 3 months to 1 year of service) up to 8 weeks (for employees with 8 or more years of service). However, common law notice periods are often significantly longer and depend on factors such as age, length of service, position, and availability of similar employment.`,
    },
    {
      question: `My employer has not paid my wages. What can I do?`,
      answer: `You have two options: file a complaint with the Ontario Ministry of Labour (for ESA violations) or pursue a Small Claims Court claim for the unpaid wages. A licensed paralegal can advise which option is more appropriate for your situation and represent you in either process. There are limitation periods, so act promptly.`,
    },
    {
      question: `Can I be fired without cause in Ontario?`,
      answer: `Yes, Ontario employers can terminate employees without cause, but they must provide adequate notice or pay in lieu of notice. If your employer failed to provide sufficient notice or severance, you may have a wrongful dismissal claim. We can review your termination and advise whether you received adequate compensation.`,
    },
    {
      question: `How much does an employment paralegal cost in ${city.name}?`,
      answer: `Fees vary depending on the nature and complexity of your employment matter. We offer a free initial consultation to review your situation and provide a clear fee estimate. Our rates are typically more affordable than retaining an employment lawyer for matters within the Small Claims Court jurisdiction.`,
    },
  ];

  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `Legal Assist - Employment Paralegal in ${city.name}`,
    description: `Licensed paralegal representation for employment disputes in ${city.name}, ${regionText}. Wrongful dismissal (up to $50,000), unpaid wages, severance negotiation, and ESA complaints.`,
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Ontario',
      },
    },
    datePublished: '2026-04-17',
        serviceType: 'Employment Law - Small Claims Court',
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
        title={`Employment Paralegal in ${city.name}, Ontario | Legal Assist`}
        description={`Licensed paralegal for employment disputes in ${city.name}, ${countyText}. Free consultation. Wrongful dismissal, severance review, ESA claims up to \$50,000.`}
        canonical={`https://www.legalassist.london/locations/${city.slug}/employment`}
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
              <Briefcase className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Employment Paralegal — {city.name}, Ontario</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Employment Paralegal in {city.name}, Ontario
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-4 max-w-3xl">
              Licensed paralegal representation for employment disputes in {city.name} and {countyText}. We help employees with wrongful dismissal claims, unpaid wages, severance negotiation, and Employment Standards Act complaints through Small Claims Court and the Ministry of Labour.
            </p>
            <p className="font-paragraph text-base text-foreground/60 mb-8 max-w-3xl">
              Losing your job or facing a workplace dispute can be stressful and financially difficult. Legal Assist provides licensed paralegal representation to help {city.name} employees understand their rights and pursue the compensation they may be owed.
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

      {/* Employment Matters We Handle */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Employment Matters We Handle in {city.name}</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-6 max-w-3xl mx-auto">
            We represent employees in a wide range of employment disputes. Our practice focuses on matters within the Small Claims Court jurisdiction and Ministry of Labour complaints.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><TrendingDown className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Wrongful Dismissal</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Claims for inadequate notice or pay in lieu of notice when terminated without cause. We pursue claims up to $50,000 in Small Claims Court.</p>
              <p className="font-paragraph text-foreground/50 text-sm">Includes constructive dismissal where working conditions were made intolerable.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><DollarSign className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Unpaid Wages</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Claims for wages earned but not paid, including regular pay, commissions, bonuses, and other compensation owed by {city.name} employers.</p>
              <p className="font-paragraph text-foreground/50 text-sm">We can pursue claims through Small Claims Court or assist with Ministry of Labour complaints.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><Clock className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Overtime Disputes</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Claims for unpaid overtime wages. Under the ESA, most employees are entitled to 1.5 times their regular rate for hours worked over 44 per week.</p>
              <p className="font-paragraph text-foreground/50 text-sm">We review your employment records and calculate what you may be owed.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><FileText className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Severance Negotiation</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Review and negotiation of severance packages offered by {city.name} employers. We assess whether the offer meets your legal entitlements.</p>
              <p className="font-paragraph text-foreground/50 text-sm">Do not sign a severance package without having it reviewed by a legal professional first.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><Scale className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">ESA Complaints</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Assistance with Employment Standards Act complaints to the Ontario Ministry of Labour for violations of minimum employment standards.</p>
              <p className="font-paragraph text-foreground/50 text-sm">Covers minimum wage, hours of work, public holidays, leaves of absence, and termination entitlements.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><CheckCircle className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Vacation Pay</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Claims for unpaid vacation pay. Under the ESA, employees earn a minimum of 4% vacation pay (6% after 5 years of service).</p>
              <p className="font-paragraph text-foreground/50 text-sm">Many {city.name} employees are unaware that vacation pay must be paid on all wages earned, including overtime.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><AlertTriangle className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Termination With Cause</h3>
              <p className="font-paragraph text-foreground/70 mb-2">If your employer terminated you for cause and denied your entitlements, we can review whether the termination was justified and pursue compensation if it was not.</p>
              <p className="font-paragraph text-foreground/50 text-sm">The threshold for just cause is high in Ontario. Many &quot;for cause&quot; terminations do not meet the legal standard.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><Briefcase className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Employment Contracts</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Review of employment contracts, non-compete clauses, and termination provisions. We help you understand your rights before and after signing.</p>
              <p className="font-paragraph text-foreground/50 text-sm">Many employment contract termination clauses are unenforceable under Ontario law.</p>
            </div>
          </div>

          {/* Scope Note */}
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 mt-8 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-heading text-lg font-bold text-destructive mb-2">Scope of Representation</h3>
                <p className="font-paragraph text-foreground/80">
                  We represent employees in Small Claims Court for monetary claims up to $50,000. For claims exceeding this amount, we can refer you to an employment lawyer. We also assist with Ministry of Labour complaints for Employment Standards Act violations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* City Employment Context */}
      <section className="py-16 md:py-24 bg-pastelbeige/10">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">{city.name} Employment Context</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">
            {city.name} is home to a diverse range of employers and industries. Employment disputes can arise in any workplace, and we are familiar with the employment landscape in {city.name} and {countyText}.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 border border-pastelbeige shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3 flex items-center gap-2"><Building2 className="w-5 h-5 text-primary" /> Local Economy</h3>
              <p className="font-paragraph text-foreground/70 text-sm mb-2">
                {city.name} and the surrounding area features employers across various sectors.
                {city.landmarks.length > 0 && ` Notable local landmarks and institutions include ${city.landmarks.slice(0, 4).join(', ')}.`}
              </p>
              <p className="font-paragraph text-foreground/60 text-sm">Employment disputes can arise in any industry. We represent employees from all sectors and at all levels of seniority.</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-pastelbeige shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3 flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> Court Location</h3>
              <p className="font-paragraph text-foreground/70 text-sm mb-2 font-semibold">{city.courthouse.name}</p>
              <p className="font-paragraph text-foreground/70 text-sm mb-2">{city.courthouse.address}</p>
              <p className="font-paragraph text-foreground/60 text-sm">Small Claims Court employment matters for {city.name} residents are heard at this location. We handle all court filings and appearances on your behalf.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ESA Entitlements */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">ESA Notice Period Entitlements</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">
            Under Ontario&apos;s Employment Standards Act, employees are entitled to minimum notice of termination or pay in lieu based on their length of service. Note that common law notice periods are often significantly higher.
          </p>

          <div className="max-w-3xl mx-auto">
            <div className="bg-pastelbeige/20 rounded-lg border border-pastelbeige overflow-hidden">
              <div className="grid grid-cols-2 bg-primary text-white">
                <div className="p-4 font-heading font-bold text-sm">Length of Service</div>
                <div className="p-4 font-heading font-bold text-sm">Minimum Notice</div>
              </div>
              {[
                ['3 months to 1 year', '1 week'],
                ['1 year to 3 years', '2 weeks'],
                ['3 years to 4 years', '3 weeks'],
                ['4 years to 5 years', '4 weeks'],
                ['5 years to 6 years', '5 weeks'],
                ['6 years to 7 years', '6 weeks'],
                ['7 years to 8 years', '7 weeks'],
                ['8 years or more', '8 weeks'],
              ].map(([service, notice], index) => (
                <div key={service} className={`grid grid-cols-2 ${index % 2 === 0 ? 'bg-white' : 'bg-pastelbeige/10'}`}>
                  <div className="p-4 font-paragraph text-sm text-foreground/80">{service}</div>
                  <div className="p-4 font-paragraph text-sm text-foreground font-semibold">{notice}</div>
                </div>
              ))}
            </div>
            <p className="font-paragraph text-sm text-foreground/60 mt-4 text-center">
              These are ESA minimums only. Common law notice periods consider factors such as age, position, length of service, and availability of comparable employment, and are often substantially higher. Employees with 5+ years of service and a payroll of $2.5M+ may also be entitled to severance pay under the ESA.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-pastelbeige/10">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Why Choose Legal Assist for Employment Matters in {city.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Shield className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Licensed Paralegal</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Licensed by the Law Society of Ontario and authorized to represent clients in Small Claims Court for employment claims up to $50,000.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Scale className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Focused Practice</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Our practice focuses on employment law matters. We understand the ESA, common law notice entitlements, and the Small Claims Court process.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><DollarSign className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Affordable Representation</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Paralegal representation is typically more affordable than retaining an employment lawyer, making it accessible for employees with claims up to $50,000.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Clock className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Free Consultation</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We offer a free initial consultation to review your employment situation and advise on your options. No obligation and no pressure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Serving Areas */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Serving {city.name} &amp; Surrounding Areas</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">We represent employees in employment disputes throughout {city.name} and the surrounding {regionText} region:</p>
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Employment Dispute in {city.name}?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-4 max-w-2xl mx-auto">
            Whether you have been wrongfully dismissed, are owed unpaid wages, or need help negotiating a severance package, Legal Assist can advocate for your employment rights and help you pursue the compensation you may be entitled to.
          </p>
          <p className="font-paragraph text-base text-secondary-foreground/60 mb-8 max-w-2xl mx-auto">
            Contact us today for a free, confidential consultation. There are limitation periods for employment claims, so it is important to act promptly.
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

      <CityServiceCrossLinks city={city} currentService="employment" />
      <Footer />
    </div>
  );
}
