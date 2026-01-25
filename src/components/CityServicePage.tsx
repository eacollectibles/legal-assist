import { Link, useParams } from 'react-router-dom';
import { ArrowRight, MapPin, Phone, Clock, Shield, Scale, Users, CheckCircle, Gavel, Home, Car, Briefcase, FileText, AlertCircle, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BaseCrudService } from '@/integrations/cms/service';
import { Locations } from '@/entities';
import { SEO } from '@/components/SEO';

// Service type definitions
export type ServiceType = 'eviction' | 'landlord' | 'tenant' | 'ltb' | 'traffic' | 'human-rights' | 'small-claims';

// Service data interface
interface ServiceData {
  type: ServiceType;
  title: string;
  shortTitle: string;
  urlPrefix: string;
  description: string;
  icon: 'home' | 'scale' | 'car' | 'users' | 'gavel' | 'briefcase' | 'file';
  benefits: string[];
  process: { step: string; description: string }[];
  faqs: { question: string; answer: string }[];
  relatedServices: { path: string; title: string }[];
}

// Service configurations
const serviceConfigs: Record<ServiceType, ServiceData> = {
  eviction: {
    type: 'eviction',
    title: 'Eviction Paralegal Services',
    shortTitle: 'Eviction',
    urlPrefix: 'eviction-paralegal',
    description: 'Professional eviction representation for landlords. We handle N4, N5, N7, N12, and N13 notices, LTB applications, and eviction hearings.',
    icon: 'home',
    benefits: [
      'Proper notice preparation to avoid dismissals',
      'Strategic L1, L2, L3 application filing',
      'Full representation at LTB hearings',
      'Sheriff enforcement coordination',
      'Rent arrears collection assistance'
    ],
    process: [
      { step: 'Case Review', description: 'We assess your situation and determine the appropriate eviction grounds.' },
      { step: 'Notice Preparation', description: 'We prepare the correct notice form with proper termination dates.' },
      { step: 'LTB Application', description: 'We file your application with the Landlord and Tenant Board.' },
      { step: 'Hearing Representation', description: 'We represent you at the LTB hearing and present your case.' },
      { step: 'Enforcement', description: 'If needed, we coordinate with the Sheriff for enforcement.' }
    ],
    faqs: [
      { question: 'How long does an eviction take in Ontario?', answer: 'Eviction timelines vary. Non-payment evictions typically take 2-4 months from notice to Sheriff enforcement. Other grounds may take longer.' },
      { question: 'Can I evict a tenant for non-payment of rent?', answer: 'Yes. You must serve an N4 notice giving 14 days to pay or vacate. If unpaid, you can file an L1 application with the LTB.' },
      { question: 'What if the tenant doesn\'t leave after the LTB order?', answer: 'You\'ll need to file for a Sheriff enforcement. We can coordinate this process for you.' }
    ],
    relatedServices: [
      { path: '/services/landlord-services', title: 'Landlord Services' },
      { path: '/services/eviction-non-payment', title: 'Non-Payment Evictions' },
      { path: '/services/n12-personal-use-eviction', title: 'N12 Personal Use' }
    ]
  },
  landlord: {
    type: 'landlord',
    title: 'Landlord Paralegal Services',
    shortTitle: 'Landlord',
    urlPrefix: 'landlord-paralegal',
    description: 'Comprehensive legal representation for landlords at the Landlord and Tenant Board. Evictions, rent collection, lease enforcement, and tenant disputes.',
    icon: 'home',
    benefits: [
      'Eviction applications for all grounds',
      'Rent arrears collection',
      'Above-guideline rent increase applications',
      'Lease enforcement and tenant disputes',
      'Property damage claims'
    ],
    process: [
      { step: 'Consultation', description: 'We discuss your landlord-tenant issue and review your lease.' },
      { step: 'Strategy', description: 'We develop a legal strategy to protect your interests.' },
      { step: 'Documentation', description: 'We prepare all notices, applications, and evidence.' },
      { step: 'Representation', description: 'We represent you at LTB hearings and mediations.' },
      { step: 'Resolution', description: 'We help enforce orders and collect amounts owed.' }
    ],
    faqs: [
      { question: 'How much does a landlord paralegal cost?', answer: 'Our fees depend on the complexity of your matter. We offer free consultations and transparent pricing.' },
      { question: 'Can you help with problem tenants?', answer: 'Yes. We handle evictions for non-payment, damage, interference, illegal acts, and more.' },
      { question: 'Do I need a paralegal for the LTB?', answer: 'While not required, professional representation significantly improves outcomes and saves time.' }
    ],
    relatedServices: [
      { path: '/services/eviction-non-payment', title: 'Non-Payment Evictions' },
      { path: '/services/above-guideline-increase', title: 'Above Guideline Increases' },
      { path: '/services/tenant-damage-claims', title: 'Tenant Damage Claims' }
    ]
  },
  tenant: {
    type: 'tenant',
    title: 'Tenant Paralegal Services',
    shortTitle: 'Tenant',
    urlPrefix: 'tenant-paralegal',
    description: 'Legal representation for tenants facing eviction, illegal lockouts, maintenance issues, and harassment. We protect your housing rights.',
    icon: 'home',
    benefits: [
      'Eviction defence and delay strategies',
      'Illegal lockout emergency applications',
      'Maintenance and repair orders (T6)',
      'Rent reduction applications',
      'Bad faith eviction compensation'
    ],
    process: [
      { step: 'Urgent Assessment', description: 'We quickly assess your situation and any deadlines.' },
      { step: 'Defence Strategy', description: 'We identify defences and counterclaims available to you.' },
      { step: 'Application/Response', description: 'We file responses or tenant applications as needed.' },
      { step: 'Hearing Representation', description: 'We advocate for you at LTB hearings.' },
      { step: 'Follow-up', description: 'We ensure orders are followed and pursue remedies if not.' }
    ],
    faqs: [
      { question: 'Can I be evicted if I owe rent?', answer: 'You have the right to a hearing. We can negotiate payment plans, identify defences, and request delays.' },
      { question: 'My landlord changed the locks - what do I do?', answer: 'This is an illegal lockout. Contact us immediately for an emergency T6 application.' },
      { question: 'Can I get compensation for a bad faith eviction?', answer: 'Yes. If your landlord evicted you under false pretenses, you may be entitled to 12 months\' rent.' }
    ],
    relatedServices: [
      { path: '/services/rent-arrears-defence', title: 'Rent Arrears Defence' },
      { path: '/services/illegal-lockout', title: 'Illegal Lockout' },
      { path: '/services/maintenance-repairs', title: 'Maintenance Issues' }
    ]
  },
  ltb: {
    type: 'ltb',
    title: 'Landlord and Tenant Board Paralegal',
    shortTitle: 'LTB',
    urlPrefix: 'ltb-paralegal',
    description: 'Expert representation at the Landlord and Tenant Board. We handle all LTB applications, hearings, and reviews for landlords and tenants.',
    icon: 'gavel',
    benefits: [
      'All LTB application types (L1-L9, T1-T6)',
      'Hearing preparation and representation',
      'Mediation and settlement negotiation',
      'Review and appeal applications',
      'Order enforcement assistance'
    ],
    process: [
      { step: 'Case Analysis', description: 'We review your matter and determine the best approach.' },
      { step: 'Document Preparation', description: 'We prepare your application or response with supporting evidence.' },
      { step: 'Filing', description: 'We file with the LTB and serve all required parties.' },
      { step: 'Hearing', description: 'We represent you at your LTB hearing or mediation.' },
      { step: 'Post-Hearing', description: 'We help with compliance, enforcement, or reviews as needed.' }
    ],
    faqs: [
      { question: 'How long do LTB hearings take?', answer: 'Current wait times are 6-12 months for most matters. Urgent applications may be heard sooner.' },
      { question: 'Can I represent myself at the LTB?', answer: 'Yes, but professional representation improves outcomes and ensures you don\'t miss legal arguments.' },
      { question: 'What happens if the other party doesn\'t follow the LTB order?', answer: 'We can help you file for enforcement through the courts or request a review.' }
    ],
    relatedServices: [
      { path: '/services/landlord-services', title: 'Landlord Services' },
      { path: '/services/tenant-services', title: 'Tenant Services' },
      { path: '/services/ltb-hearing-preparation', title: 'Hearing Preparation' }
    ]
  },
  traffic: {
    type: 'traffic',
    title: 'Traffic Ticket Paralegal Services',
    shortTitle: 'Traffic Ticket',
    urlPrefix: 'traffic-ticket-paralegal',
    description: 'Fight your traffic ticket with professional representation. Speeding, careless driving, stunt driving, and Highway Traffic Act offences.',
    icon: 'car',
    benefits: [
      'Charges reduced or withdrawn',
      'Demerit points eliminated or reduced',
      'Insurance rate protection',
      'No court attendance required',
      'Licence suspension prevention'
    ],
    process: [
      { step: 'Ticket Review', description: 'We analyze your ticket and identify defence strategies.' },
      { step: 'Disclosure Request', description: 'We obtain the officer\'s notes and evidence.' },
      { step: 'Defence Preparation', description: 'We prepare your legal defence based on the evidence.' },
      { step: 'Court Representation', description: 'We attend court and negotiate or fight on your behalf.' },
      { step: 'Resolution', description: 'We inform you of the outcome and next steps.' }
    ],
    faqs: [
      { question: 'Should I fight my traffic ticket?', answer: 'Usually yes. Even if you can\'t win, we can often negotiate reduced charges and fewer demerit points.' },
      { question: 'Will fighting a ticket affect my insurance?', answer: 'Fighting gives you the best chance of avoiding convictions that raise insurance rates.' },
      { question: 'Do I have to go to court?', answer: 'No. As your paralegal, we attend all court dates on your behalf.' }
    ],
    relatedServices: [
      { path: '/services/speeding-tickets', title: 'Speeding Tickets' },
      { path: '/services/careless-driving', title: 'Careless Driving' },
      { path: '/services/stunt-driving', title: 'Stunt Driving' }
    ]
  },
  'human-rights': {
    type: 'human-rights',
    title: 'Human Rights Tribunal Paralegal',
    shortTitle: 'Human Rights',
    urlPrefix: 'human-rights-paralegal',
    description: 'Representation at the Human Rights Tribunal of Ontario (HRTO). Discrimination complaints for employment, housing, and services.',
    icon: 'users',
    benefits: [
      'HRTO application preparation',
      'Mediation representation',
      'Full hearing advocacy',
      'Monetary compensation claims',
      'Policy change remedies'
    ],
    process: [
      { step: 'Consultation', description: 'We assess whether you have a valid human rights claim.' },
      { step: 'Application', description: 'We prepare and file your HRTO application within deadlines.' },
      { step: 'Response', description: 'We handle the respondent\'s reply and any preliminary issues.' },
      { step: 'Mediation', description: 'We represent you in HRTO mediation to seek resolution.' },
      { step: 'Hearing', description: 'If needed, we present your case at a full hearing.' }
    ],
    faqs: [
      { question: 'What qualifies as discrimination?', answer: 'Discrimination based on race, sex, disability, age, religion, family status, and other protected grounds.' },
      { question: 'How long do I have to file?', answer: 'You must file within 1 year of the discrimination, though extensions are sometimes possible.' },
      { question: 'What compensation can I get?', answer: 'Compensation for lost wages, injury to dignity, and other damages. Amounts vary by case.' }
    ],
    relatedServices: [
      { path: '/services/workplace-discrimination', title: 'Workplace Discrimination' },
      { path: '/services/housing-discrimination', title: 'Housing Discrimination' },
      { path: '/services/disability-accommodation', title: 'Disability Accommodation' }
    ]
  },
  'small-claims': {
    type: 'small-claims',
    title: 'Small Claims Court Paralegal',
    shortTitle: 'Small Claims',
    urlPrefix: 'small-claims-paralegal',
    description: 'Professional representation in Small Claims Court for claims up to $50,000. Debt collection, contract disputes, and property damage.',
    icon: 'scale',
    benefits: [
      'Claims up to $50,000',
      'Debt collection and recovery',
      'Contract dispute resolution',
      'Property damage claims',
      'Judgment enforcement'
    ],
    process: [
      { step: 'Case Evaluation', description: 'We assess your claim\'s merits and likelihood of success.' },
      { step: 'Claim/Defence', description: 'We prepare your claim or defence with supporting documents.' },
      { step: 'Settlement Conference', description: 'We attend and negotiate at the mandatory settlement conference.' },
      { step: 'Trial', description: 'If needed, we present your case at trial.' },
      { step: 'Enforcement', description: 'We help collect on judgments through garnishment or seizure.' }
    ],
    faqs: [
      { question: 'How much does Small Claims Court cost?', answer: 'Court filing fees are $102-$273. Our fees depend on case complexity.' },
      { question: 'How long does a Small Claims case take?', answer: 'Typically 6-12 months from filing to trial, though many settle earlier.' },
      { question: 'Can I sue for more than $50,000?', answer: 'You can sue in Small Claims for $50,000 but must abandon the excess amount.' }
    ],
    relatedServices: [
      { path: '/services/debt-collection', title: 'Debt Collection' },
      { path: '/services/contract-disputes', title: 'Contract Disputes' },
      { path: '/services/judgment-enforcement', title: 'Judgment Enforcement' }
    ]
  }
};

// Icon component mapping
const iconComponents = {
  home: Home,
  scale: Scale,
  car: Car,
  users: Users,
  gavel: Gavel,
  briefcase: Briefcase,
  file: FileText
};

interface CityServicePageProps {
  serviceType: ServiceType;
}

export default function CityServicePage({ serviceType }: CityServicePageProps) {
  const { citySlug } = useParams<{ citySlug: string }>();
  const [city, setCity] = useState<Locations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const service = serviceConfigs[serviceType];
  const IconComponent = iconComponents[service.icon];

  useEffect(() => {
    async function fetchCity() {
      if (!citySlug) {
        setError('City not specified');
        setLoading(false);
        return;
      }

      try {
        // Query the locations collection by slug
        const result = await BaseCrudService.getAll<Locations>('locations', undefined, { limit: 1000 });
        const foundCity = result.items.find(loc => loc.slug === citySlug);
        
        if (foundCity) {
          setCity(foundCity);
        } else {
          setError('City not found');
        }
      } catch (err) {
        console.error('Error fetching city:', err);
        setError('Failed to load city data');
      } finally {
        setLoading(false);
      }
    }

    fetchCity();
  }, [citySlug]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-3 text-foreground/70">Loading...</span>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !city) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 py-16">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Location Not Found</h1>
            <p className="font-paragraph text-foreground/70 mb-8">
              We couldn't find information for this location. Please check the URL or browse our service areas.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-6 py-3 rounded-lg hover:bg-primary/90">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Parse service areas if available
  const serviceAreas = city.serviceAreas ? city.serviceAreas.split('|').map(s => s.trim()) : [];
  const highways = city.highways ? city.highways.split('|').map(s => s.trim()) : [];

  // Generate SEO content
  const seoTitle = `${service.shortTitle} Paralegal ${city.name} Ontario | LegalAssist`;
  const seoDescription = `Licensed paralegal for ${service.shortTitle.toLowerCase()} matters in ${city.name}, ${city.region}. ${service.description.split('.')[0]}. Free consultation.`;
  const canonicalUrl = `https://www.legalassist.london/${service.urlPrefix}/${city.slug}`;

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
      />
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
              <span className="font-paragraph text-sm font-medium">Serving {city.name} &amp; {city.region}</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {service.shortTitle} Paralegal in {city.name}, Ontario
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              {service.description} {city.description && `Serving ${city.name}, ${city.description}.`}
              {city.distanceFromLondon && city.distanceFromLondon > 0 && ` Located ${city.distanceFromLondon}km from our London office.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">
                Free Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:+13658829515" className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5">
                <Phone className="w-5 h-5" /> 365-882-9515
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                {service.title} in {city.name}
              </h2>
              <p className="font-paragraph text-lg text-foreground/70 mb-8">
                As a licensed paralegal serving {city.name} and {city.region}, we provide professional {service.shortTitle.toLowerCase()} representation. 
                {city.nearestCourt && ` Cases are typically heard at ${city.nearestCourt} courthouse.`}
              </p>
              <ul className="space-y-4">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-foreground/80">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-pastelbeige/20 rounded-2xl p-8 border border-pastelbeige">
              <div className="w-16 h-16 bg-primary text-white rounded-xl flex items-center justify-center mb-6">
                <IconComponent className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Why Choose LegalAssist?</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="font-paragraph text-foreground/80">Licensed by the Law Society of Ontario</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-paragraph text-foreground/80">Serving all of {city.region}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-paragraph text-foreground/80">24/7 Client Portal access</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-paragraph text-foreground/80">Free initial consultation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Our Process</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-2xl mx-auto">
            Here's how we handle your {service.shortTitle.toLowerCase()} matter from start to finish.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {service.process.map((step, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-pastelbeige relative">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{step.step}</h3>
                <p className="font-paragraph text-sm text-foreground/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Info Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Serving {city.name} &amp; Surrounding Areas
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {city.nearestCourt && (
              <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Gavel className="w-5 h-5 text-primary" /> Local Court Information
                </h3>
                <p className="font-paragraph text-foreground/80 mb-2"><strong>Nearest Courthouse:</strong> {city.nearestCourt}</p>
                {city.distanceFromLondon && city.distanceFromLondon > 0 && (
                  <p className="font-paragraph text-foreground/70">Distance from London: {city.distanceFromLondon}km</p>
                )}
              </div>
            )}
            
            {(serviceAreas.length > 0 || highways.length > 0) && (
              <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" /> Service Area Details
                </h3>
                {serviceAreas.length > 0 && (
                  <div className="mb-4">
                    <p className="font-paragraph text-foreground/80 font-medium mb-2">Communities We Serve:</p>
                    <div className="flex flex-wrap gap-2">
                      {serviceAreas.map((area) => (
                        <span key={area} className="bg-white px-3 py-1 rounded-full text-sm font-paragraph text-foreground/80 border border-pastelbeige">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {highways.length > 0 && (
                  <div>
                    <p className="font-paragraph text-foreground/80 font-medium mb-2">Major Routes:</p>
                    <p className="font-paragraph text-foreground/70">{highways.join(', ')}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Population info */}
          {city.population && (
            <div className="mt-8 text-center">
              <p className="font-paragraph text-foreground/60">
                Serving {city.name}'s population of {city.population.toLocaleString()} and surrounding communities
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-2xl mx-auto">
            Common questions about {service.shortTitle.toLowerCase()} services in {city.name}.
          </p>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {service.faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-pastelbeige">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{faq.question}</h3>
                <p className="font-paragraph text-foreground/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Related Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {service.relatedServices.map((related) => (
              <Link 
                key={related.path} 
                to={related.path}
                className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg text-center group"
              >
                <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors">{related.title}</h3>
                <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm mt-2">
                  Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Need {service.shortTitle} Help in {city.name}?
          </h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation. We'll review your matter and explain how we can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">
              Book Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:+13658829515" className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary-foreground/10">
              <Phone className="w-5 h-5" /> 365-882-9515
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Export service configs for route generation
export { serviceConfigs };
