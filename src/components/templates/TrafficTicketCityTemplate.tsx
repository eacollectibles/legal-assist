import SEO from '@/components/SEO';
import CityServiceCrossLinks from '@/components/CityServiceCrossLinks';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Car, Shield, Clock, MapPin, FileText, DollarSign, CheckCircle, AlertTriangle, Building2, Gauge } from 'lucide-react';
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

export default function TrafficTicketCityTemplate({ city }: Props) {
  // Avoid redundant "in Ottawa and Ottawa" when city name equals county/region
  const countyText = city.county !== city.name ? city.county : `the ${city.name} area`;
  const regionText = city.region !== city.name ? city.region : `Greater ${city.name}`;

  const faqs = [
    {
      question: `Should I just pay my traffic ticket in ${city.name}?`,
      answer: `Paying a traffic ticket is an admission of guilt. It results in a conviction on your driving record, demerit points, and potentially significant insurance increases for up to 3 years. We recommend getting a free consultation before paying any ticket.`,
    },
    {
      question: `How many demerit points will I get for a speeding ticket in ${city.name}?`,
      answer: `Demerit points depend on how much over the speed limit you were travelling: 1-15 km/h over is 0 points, 16-29 km/h over is 3 points, 30-49 km/h over is 4 points, and 50+ km/h over is 6 points (plus stunt driving charges). We work to reduce or eliminate both the fine and the points.`,
    },
    {
      question: `Do I need to go to court for my ${city.name} traffic ticket?`,
      answer: `In most cases, no. We handle all court appearances on your behalf at ${city.provincialOffencesCourt?.name || city.courthouse.name}. You can continue with your regular schedule while we represent you.`,
    },
    {
      question: `How much does a traffic ticket paralegal cost in ${city.name}?`,
      answer: `We offer a free initial consultation to review your ticket and provide a clear fee estimate. Our fees are typically a fraction of the insurance increase you would face from a conviction. We offer flat fee options for most traffic tickets.`,
    },
    {
      question: `How long do I have to respond to a traffic ticket in ${city.name}?`,
      answer: `You have 15 days from the date of your ticket to request a trial or early resolution meeting. Missing this deadline can result in a conviction being registered against you. Contact us as soon as possible after receiving a ticket.`,
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

  const highwayText = city.highways.length > 0
    ? `We defend all types of traffic tickets issued in ${city.name}, on ${city.highways.join(', ')}, and throughout ${regionText}.`
    : `We defend all types of traffic tickets issued in ${city.name} and throughout ${regionText}.`;

  const courtName = city.provincialOffencesCourt?.name || `${city.name} Provincial Offences Court`;
  const courtAddress = city.provincialOffencesCourt?.address || city.courthouse.address;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`Traffic Ticket Paralegal in ${city.name}, Ontario | Legal Assist`}
        description={`Licensed paralegal for traffic ticket defence in ${city.name}, ${countyText}. Free consultation. Speeding, careless driving, stunt driving, red light tickets.`}
        canonical={`https://www.legalassist.london/locations/${city.slug}/traffic-tickets`}
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
              <Car className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Traffic Ticket Paralegal &mdash; {city.name}, Ontario</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Traffic Ticket Paralegal in {city.name}, Ontario
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-4 max-w-3xl">
              Defend your {city.name} traffic ticket with a licensed paralegal. We handle speeding tickets, careless driving charges, stunt driving, red light camera tickets, and all Highway Traffic Act offences at the {courtName}.
            </p>
            <p className="font-paragraph text-base text-foreground/60 mb-8 max-w-3xl">
              A traffic conviction in {city.name} can result in demerit points, licence suspension, skyrocketing insurance premiums, and for serious driving offences under the Criminal Code (such as impaired driving), a criminal record is possible — these matters require a lawyer. Do not simply pay the fine — let Legal Assist defend your ticket and protect your driving record.
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

      {/* Tickets We Defend */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Traffic Tickets We Defend in {city.name}</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-6 max-w-3xl mx-auto">
            {highwayText} Our paralegal has extensive experience at the {courtName} and is familiar with local procedures.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><Gauge className="w-6 h-6" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Speeding Tickets</h3>
              <p className="font-paragraph text-foreground/70 text-sm mb-2">Tickets for exceeding the speed limit on {city.name} streets{city.highways.length > 0 ? `, ${city.highways[0]},` : ''} and county roads in {regionText}.</p>
              <p className="font-paragraph text-foreground/50 text-xs">Speeding convictions add demerit points and increase insurance. We advocate for charges to be reduced or dismissed.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><AlertTriangle className="w-6 h-6" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Careless Driving</h3>
              <p className="font-paragraph text-foreground/70 text-sm mb-2">One of the most serious HTA charges, carrying up to 6 demerit points, fines up to $2,000, and possible licence suspension.</p>
              <p className="font-paragraph text-foreground/50 text-xs">We build strong defences and often negotiate reduced charges at the {city.name} court.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><Car className="w-6 h-6" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Stunt Driving / Racing</h3>
              <p className="font-paragraph text-foreground/70 text-sm mb-2">Charges for driving 40+ km/h over on roads posted under 80 km/h, or 40+ km/h over on roads posted 80 km/h or more. Includes immediate licence suspension and vehicle impoundment.</p>
              <p className="font-paragraph text-foreground/50 text-xs">These charges carry severe penalties including potential jail time. Immediate legal representation is essential.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><FileText className="w-6 h-6" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Red Light Camera</h3>
              <p className="font-paragraph text-foreground/70 text-sm mb-2">Automated red light camera tickets issued at {city.name} intersections. While these do not carry demerit points, fines can be substantial.</p>
              <p className="font-paragraph text-foreground/50 text-xs">We review the evidence, check camera calibration records, and challenge tickets where possible.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><Phone className="w-6 h-6" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Distracted Driving</h3>
              <p className="font-paragraph text-foreground/70 text-sm mb-2">Using a handheld device while driving carries a $615 set fine and 3 demerit points for a first offence. Subsequent offences carry licence suspensions.</p>
              <p className="font-paragraph text-foreground/50 text-xs">We review the circumstances of the charge and prepare a defence for {city.name} court.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><MapPin className="w-6 h-6" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Fail to Stop</h3>
              <p className="font-paragraph text-foreground/70 text-sm mb-2">Charges for failing to stop at a stop sign, for a school bus, or for an emergency vehicle. These carry 3 demerit points.</p>
              <p className="font-paragraph text-foreground/50 text-xs">We examine the officer&apos;s notes and intersection conditions to build your defence.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><Shield className="w-6 h-6" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Driving Under Suspension</h3>
              <p className="font-paragraph text-foreground/70 text-sm mb-2">Operating a vehicle while your licence is suspended carries mandatory fines starting at $1,000 and potential further suspension.</p>
              <p className="font-paragraph text-foreground/50 text-xs">We review the circumstances of the suspension and build a strong defence.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><CheckCircle className="w-6 h-6" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Seatbelt &amp; Other HTA</h3>
              <p className="font-paragraph text-foreground/70 text-sm mb-2">Seatbelt violations, improper turns, following too closely, no insurance, and all other Highway Traffic Act offences in {city.name}.</p>
              <p className="font-paragraph text-foreground/50 text-xs">Every ticket deserves a defence. We review the officer&apos;s notes and evidence to determine your options.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Penalty Info */}
      <section className="py-16 md:py-24 bg-pastelbeige/10">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">What Is at Stake with a {city.name} Traffic Conviction</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">
            Paying a traffic ticket is an admission of guilt. Before you pay, consider the long-term consequences of a conviction on your record.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 border border-pastelbeige shadow-sm text-center">
              <DollarSign className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Insurance Increases</h3>
              <p className="font-paragraph text-foreground/70 text-sm">A single conviction can raise your premiums by hundreds of dollars per year for up to three years. The total cost often far exceeds the original fine.</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-pastelbeige shadow-sm text-center">
              <AlertTriangle className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Demerit Points</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Points accumulate on your record and can lead to licence suspension. Novice drivers face even lower thresholds before intervention.</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-pastelbeige shadow-sm text-center">
              <Shield className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Licence Suspension</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Serious offences like stunt driving and careless driving can result in immediate roadside suspensions and long-term licence revocation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Court Info */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">{city.name} Traffic Court Information</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">
            Traffic tickets issued in {city.name} and {regionText} are heard at the {courtName}. We regularly appear at this courthouse and are familiar with local prosecutors and court procedures.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-pastelbeige/10 rounded-lg p-6 border border-pastelbeige shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3 flex items-center gap-2"><Building2 className="w-5 h-5 text-primary" /> Court Location</h3>
              <p className="font-paragraph text-foreground/70 text-sm mb-2">{courtName} is located at {courtAddress}. This is where all {city.name} traffic matters and HTA offences are heard.</p>
              <p className="font-paragraph text-foreground/60 text-sm">Hours: Monday to Friday, 8:30 AM to 4:30 PM. Early resolution and trial dates are scheduled by the court.</p>
            </div>
            <div className="bg-pastelbeige/10 rounded-lg p-6 border border-pastelbeige shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3 flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /> Deadlines &amp; Timelines</h3>
              <p className="font-paragraph text-foreground/70 text-sm mb-2">You have 15 days from the date of your ticket to request a trial. Missing this deadline can result in an automatic conviction. Contact us immediately after receiving a ticket.</p>
              <p className="font-paragraph text-foreground/60 text-sm">We handle the early resolution option (Option 2) and full trial requests (Option 3) on your behalf.</p>
            </div>
          </div>

          {city.highways.length > 0 && (
            <div className="mt-12 max-w-3xl mx-auto">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4 text-center">Local Highway Context</h3>
              <p className="font-paragraph text-foreground/70 text-center">
                {city.name} is situated along {city.highways.join(' and ')}, making it a common location for traffic enforcement. Whether you received a ticket on a local road or on the highway near {city.name}, our paralegal can represent you at the {courtName} and work toward the most favourable outcome available.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Fight */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Why Defend Your {city.name} Traffic Ticket</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><DollarSign className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Save on Insurance</h3>
              <p className="font-paragraph text-foreground/70 text-sm">A single speeding conviction can increase your insurance by hundreds per year for up to three years. Defending the ticket can save you thousands.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Shield className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Protect Your Record</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Demerit points accumulate and can lead to licence suspension. A clean driving record is essential for {city.name} commuters and commercial drivers.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><MapPin className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Local Knowledge</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We know the {courtName}, local prosecutors, and the most effective defence strategies for tickets issued in this jurisdiction.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Clock className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">No Court Visits</h3>
              <p className="font-paragraph text-foreground/70 text-sm">In most cases, you do not need to attend court. We handle everything from filing to trial appearances so you do not miss work.</p>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} />
      <RelatedServices services={relatedServicesConfig.trafficTickets} />

      {/* CTA */}
      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Got a Traffic Ticket in {city.name}?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-4 max-w-2xl mx-auto">
            Do not pay your ticket and accept the conviction. Contact Legal Assist today for a free consultation. We will review your ticket and explain your options for defending it at the {courtName}.
          </p>
          <p className="font-paragraph text-base text-secondary-foreground/60 mb-8 max-w-2xl mx-auto">
            Remember: you only have 15 days to respond. Call us now to protect your driving record.
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
        name: `Legal Assist - Traffic Ticket Paralegal in ${city.name}`,
        description: `Licensed paralegal defence for traffic tickets and Highway Traffic Act offences in ${city.name} and ${regionText}.`,
        url: `https://www.legalassist.london/locations/${city.slug}/traffic-tickets`,
        telephone: PHONE_DISPLAY,
        areaServed: { '@type': 'City', name: city.name, containedInPlace: { '@type': 'AdministrativeArea', name: city.region } },
        datePublished: '2026-04-17',
        serviceType: 'Traffic Ticket Defence',
        provider: {
          '@type': 'LocalBusiness',
          name: 'Legal Assist',
          address: { '@type': 'PostalAddress', addressLocality: city.name, addressRegion: 'ON', addressCountry: 'CA' },
        },
      }) }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <CityServiceCrossLinks city={city} currentService="traffic-tickets" />
      <Footer />
    </div>
  );
}
