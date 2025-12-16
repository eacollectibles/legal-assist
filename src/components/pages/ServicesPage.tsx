import { useState } from 'react';
import { ArrowRight, Scale, Users, FileText, AlertCircle, Home, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';

interface Service {
  id: string;
  name: string;
  tribunal: string;
  shortDescription: string;
  icon: React.ReactNode;
  image: string;
  learnMore: string;
  keyPoints: string[];
  costInfo: string;
  timeline: string;
  eligibility: string;
}

const services: Service[] = [
  {
    id: 'small-claims',
    name: 'Small Claims Court',
    tribunal: 'Small Claims Court',
    shortDescription: 'Professional representation for civil disputes up to $50,000 in Ontario.',
    icon: <Scale className="w-8 h-8" />,
    image: 'https://static.wixstatic.com/media/99571b_550f67d8225c4defa23bfe4f0a39d9aa~mv2.png?id=small-claims-court',
    learnMore: `Small Claims Court is designed for straightforward civil disputes involving amounts up to $50,000. Our licensed paralegals have extensive experience representing clients in these proceedings, helping you navigate the process from initial claim to judgment.

Whether you're pursuing a debt recovery, property damage claim, or contract dispute, we provide comprehensive representation including:

• Claim preparation and filing
• Evidence gathering and organization
• Pre-trial settlement negotiations
• Full courtroom representation
• Post-judgment enforcement assistance

We understand that small claims disputes can be stressful and time-consuming. Our team works to resolve matters efficiently while protecting your interests throughout the process.`,
    keyPoints: [
      'Claims up to $50,000',
      'Streamlined court process',
      'Lower costs than Superior Court',
      'Faster resolution timeline',
      'Professional representation available'
    ],
    costInfo: 'Competitive flat fees or hourly rates depending on case complexity. Initial consultation available.',
    timeline: 'Typically 3-6 months from filing to judgment, depending on court scheduling and case complexity.',
    eligibility: 'Open to individuals and businesses with civil claims within Ontario. No legal representation required, but highly recommended.'
  },
  {
    id: 'landlord-tenant',
    name: 'Landlord and Tenant Board',
    tribunal: 'Landlord and Tenant Board (LTB)',
    shortDescription: 'Expert representation for residential tenancy disputes and eviction proceedings.',
    icon: <Home className="w-8 h-8" />,
    image: 'https://static.wixstatic.com/media/99571b_2ed4aa7fa2d2489cadb2a57634e4da85~mv2.png?id=landlord-tenant-board',
    learnMore: `The Landlord and Tenant Board (LTB) handles disputes between landlords and tenants in Ontario. Whether you're facing eviction, dealing with maintenance issues, or disputing rent increases, our paralegals provide skilled representation.

We represent both landlords and tenants in matters including:

• Eviction proceedings (non-payment, lease violations)
• Rent increase disputes
• Maintenance and repair complaints
• Illegal lockouts and entry disputes
• Deposit and key money issues
• Lease termination matters

Our team understands the Residential Tenancies Act and LTB procedures thoroughly. We work to achieve fair outcomes while maintaining professional relationships where possible.`,
    keyPoints: [
      'Residential tenancy expertise',
      'Both landlord and tenant representation',
      'Knowledge of Residential Tenancies Act',
      'Eviction defense strategies',
      'Rent dispute resolution'
    ],
    costInfo: 'Flexible fee structures available. We offer both flat fees for standard matters and hourly rates for complex cases.',
    timeline: 'LTB hearings typically scheduled within 30-60 days of application. Resolution varies by case type.',
    eligibility: 'Available to landlords, tenants, and property managers in Ontario. Both parties can be represented.'
  },
  {
    id: 'hrto',
    name: 'Human Rights Tribunal of Ontario',
    tribunal: 'Human Rights Tribunal of Ontario (HRTO)',
    shortDescription: 'Advocacy for discrimination and human rights violations in employment, housing, and services.',
    icon: <Users className="w-8 h-8" />,
    image: 'https://static.wixstatic.com/media/99571b_8eeb6e0cb3ea4bb783f3c8570051be7d~mv2.png?id=human-rights-tribunal',
    learnMore: `The Human Rights Tribunal of Ontario (HRTO) addresses complaints of discrimination based on protected grounds including race, gender, disability, age, and more. These matters are serious and require experienced representation.

We handle complaints involving:

• Employment discrimination
• Harassment and hostile work environment
• Disability accommodation failures
• Housing discrimination
• Discrimination in services and facilities
• Retaliation for human rights complaints

Our paralegals work with you to build a strong case, gather evidence, and present compelling arguments before the tribunal. We understand the sensitive nature of these matters and provide compassionate, professional support throughout the process.`,
    keyPoints: [
      'Protected ground expertise',
      'Employment discrimination focus',
      'Accommodation requirement analysis',
      'Evidence-based strategy',
      'Tribunal hearing preparation'
    ],
    costInfo: 'Competitive rates for human rights matters. Many cases handled on contingency or reduced fees for vulnerable clients.',
    timeline: 'HRTO cases typically take 12-24 months from complaint to hearing, depending on complexity and tribunal scheduling.',
    eligibility: 'Available to individuals who believe they\'ve experienced discrimination based on protected grounds under the Human Rights Code.'
  },
  {
    id: 'traffic-tickets',
    name: 'Traffic Tickets',
    tribunal: 'Ontario Court of Justice',
    shortDescription: 'Defense representation for traffic violations, speeding, and driving-related offences.',
    icon: <AlertCircle className="w-8 h-8" />,
    image: 'https://static.wixstatic.com/media/99571b_0dccbb591a504451bfaf96024f5b2b24~mv2.png?id=traffic-tickets',
    learnMore: `Traffic violations can result in fines, demerit points, and increased insurance premiums. Our paralegals provide skilled defense representation to help minimize these consequences.

We defend against charges including:

• Speeding violations
• Careless driving
• Failure to obey traffic signals
• Improper lane changes
• Parking violations
• Seatbelt and equipment violations
• Stunt driving charges

Our approach includes reviewing evidence, identifying procedural issues, negotiating with prosecutors, and representing you in court. We work to achieve the best possible outcome, whether through negotiation or trial.`,
    keyPoints: [
      'Demerit point reduction strategies',
      'Insurance impact minimization',
      'Evidence review and challenges',
      'Prosecutor negotiation',
      'Court representation'
    ],
    costInfo: 'Flat fees for most traffic matters, starting from affordable rates. Consultation available to discuss your specific charge.',
    timeline: 'Traffic court dates typically set within 4-8 weeks. Resolution depends on court scheduling and case complexity.',
    eligibility: 'Available to anyone charged with a traffic violation in Ontario. Representation can significantly improve outcomes.'
  },
  {
    id: 'federal-human-rights',
    name: 'Federal Human Rights Commission',
    tribunal: 'Canadian Human Rights Commission',
    shortDescription: 'Representation for discrimination complaints under federal jurisdiction.',
    icon: <Briefcase className="w-8 h-8" />,
    image: 'https://static.wixstatic.com/media/99571b_49f6982ca3874aae93ce8e745bececa4~mv2.png?id=federal-human-rights',
    learnMore: `The Canadian Human Rights Commission handles discrimination complaints in federally regulated industries such as banking, telecommunications, interprovincial transportation, and federal government employment.

We assist with complaints involving:

• Federal employment discrimination
• Discrimination by federal agencies
• Harassment in federally regulated workplaces
• Disability accommodation in federal jurisdiction
• Discrimination in federally regulated services
• Retaliation for human rights complaints

Federal human rights complaints follow different procedures than provincial complaints. Our team has experience navigating the Canadian Human Rights Act and Commission processes to effectively advocate for your rights.`,
    keyPoints: [
      'Federal jurisdiction expertise',
      'Canadian Human Rights Act knowledge',
      'Federally regulated industry focus',
      'Commission investigation support',
      'Tribunal representation'
    ],
    costInfo: 'Specialized rates for federal human rights matters. Consultation available to assess your complaint eligibility.',
    timeline: 'Federal complaints can take 18-36 months from filing to resolution, depending on investigation complexity.',
    eligibility: 'Available to individuals with complaints in federally regulated industries or against federal agencies.'
  },
  {
    id: 'family-matters',
    name: 'Family Matters',
    tribunal: 'Ontario Superior Court / Family Court',
    shortDescription: 'Representation for family law issues including custody, support, and property division.',
    icon: <FileText className="w-8 h-8" />,
    image: 'https://static.wixstatic.com/media/99571b_52626f36e852448ca59c6a21d26750d4~mv2.png?id=family-matters',
    learnMore: `Family law matters are deeply personal and require compassionate, knowledgeable representation. Our paralegals assist with various family law issues to help you navigate these challenging situations.

We provide guidance and representation for:

• Child custody and access arrangements
• Child support calculations and modifications
• Spousal support matters
• Property division and equalization
• Separation agreements
• Divorce-related issues
• Parenting plan development
• Family violence protection orders

We understand the emotional complexity of family matters and work to achieve fair, practical solutions that prioritize your family's wellbeing. Our approach emphasizes clear communication and, where possible, collaborative resolution.`,
    keyPoints: [
      'Child custody expertise',
      'Support calculation knowledge',
      'Property division guidance',
      'Separation agreement drafting',
      'Family violence protection'
    ],
    costInfo: 'Flexible fee arrangements available, including hourly rates and fixed fees for specific services.',
    timeline: 'Family matters vary greatly in timeline. Simple agreements may be resolved in weeks; contested matters may take 6-18 months.',
    eligibility: 'Available to individuals involved in family law matters in Ontario, including separation, divorce, and custody issues.'
  }
];

export default function ServicesPage() {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="w-full">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-br from-primary via-primary to-secondary py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
                Our Legal Services
              </h1>
              <p className="font-paragraph text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Professional paralegal representation that gets results across all authorized practice areas in Ontario.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="w-full py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group h-full"
                >
                  <div className="h-full bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary/20 flex flex-col">
                    {/* Service Image */}
                    <div className="w-full h-48 overflow-hidden bg-gray-200">
                      <Image src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>

                    {/* Icon and Header */}
                    <div className="p-6 bg-gradient-to-br from-pastelbeige to-pastelbeige/50">
                      <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>
                      <Badge className="mb-3 bg-primary/10 text-primary font-paragraph text-xs">
                        {service.tribunal}
                      </Badge>
                      <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {service.name}
                      </h3>
                      <p className="font-paragraph text-sm text-secondary/70">
                        {service.shortDescription}
                      </p>
                    </div>

                    {/* Key Points */}
                    <div className="px-6 py-4 border-t border-gray-100">
                      <h4 className="font-heading text-sm font-semibold text-secondary mb-3">Key Services:</h4>
                      <ul className="space-y-2">
                        {service.keyPoints.slice(0, 3).map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                            <span className="font-paragraph text-xs text-secondary/70">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Learn More Button */}
                    <div className="px-6 py-4 border-t border-gray-100 mt-auto">
                      {service.id === 'small-claims' ? (
                        <Link to="/services/small-claims" className="w-full flex items-center justify-between text-primary font-paragraph font-semibold group-hover:gap-3 transition-all py-2">
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      ) : service.id === 'landlord-tenant' ? (
                        <Link to="/services/landlord-tenant-board" className="w-full flex items-center justify-between text-primary font-paragraph font-semibold group-hover:gap-3 transition-all py-2">
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      ) : service.id === 'hrto' ? (
                        <Link to="/services/human-rights-tribunal" className="w-full flex items-center justify-between text-primary font-paragraph font-semibold group-hover:gap-3 transition-all py-2">
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      ) : service.id === 'traffic-tickets' ? (
                        <Link to="/services/traffic-tickets" className="w-full flex items-center justify-between text-primary font-paragraph font-semibold group-hover:gap-3 transition-all py-2">
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      ) : service.id === 'federal-human-rights' ? (
                        <Link to="/services/federal-human-rights" className="w-full flex items-center justify-between text-primary font-paragraph font-semibold group-hover:gap-3 transition-all py-2">
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      ) : service.id === 'family-matters' ? (
                        <Link to="/services/family-matters" className="w-full flex items-center justify-between text-primary font-paragraph font-semibold group-hover:gap-3 transition-all py-2">
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      ) : (
                        <button
                          onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                          className="w-full flex items-center justify-between text-primary font-paragraph font-semibold group-hover:gap-3 transition-all py-2"
                        >
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedService === service.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 bg-white rounded-lg shadow-lg border border-primary/20 p-6"
                    >
                      <h4 className="font-heading text-lg font-bold text-secondary mb-4">About This Service</h4>
                      <p className="font-paragraph text-secondary/80 whitespace-pre-line mb-6 leading-relaxed">
                        {service.learnMore}
                      </p>
                      
                      <div className="grid grid-cols-1 gap-4 mb-6">
                        <div className="bg-pastelbeige/30 p-4 rounded-lg">
                          <h5 className="font-heading text-sm font-semibold text-secondary mb-2">Cost Information</h5>
                          <p className="font-paragraph text-sm text-secondary/70">{service.costInfo}</p>
                        </div>
                        <div className="bg-pastelgreen/30 p-4 rounded-lg">
                          <h5 className="font-heading text-sm font-semibold text-secondary mb-2">Timeline</h5>
                          <p className="font-paragraph text-sm text-secondary/70">{service.timeline}</p>
                        </div>
                        <div className="bg-pastellavender/30 p-4 rounded-lg">
                          <h5 className="font-heading text-sm font-semibold text-secondary mb-2">Eligibility</h5>
                          <p className="font-paragraph text-sm text-secondary/70">{service.eligibility}</p>
                        </div>
                      </div>

                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-paragraph px-6 py-3 rounded-lg transition-all hover:bg-primary/90"
                      >
                        Get Started
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full bg-secondary/5 py-16 md:py-20">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Need Legal Assistance?
              </h2>
              <p className="font-paragraph text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Contact us today to discuss your legal needs with our experienced paralegal team.
              </p>
              <a
                href="tel:4165550123"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph px-8 py-4 rounded-lg transition-all"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
