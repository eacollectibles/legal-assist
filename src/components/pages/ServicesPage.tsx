import { useState } from 'react';
import { ArrowRight, Scale, Users, FileText, AlertCircle, Home, Handshake, Shield, Stamp, CheckCircle, Landmark, Gavel, Lock } from 'lucide-react';
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
    id: 'family-matters',
    name: 'Family Legal Services Provider',
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
  },
  {
    id: 'mediation',
    name: 'Mediation Services',
    tribunal: 'Mediation & Dispute Resolution',
    shortDescription: 'Professional mediation to resolve disputes collaboratively and cost-effectively.',
    icon: <Handshake className="w-8 h-8" />,
    image: 'https://static.wixstatic.com/media/99571b_45e4ddef1b79494a92d7e0856a1601a0~mv2.png?id=mediation-services',
    learnMore: `Mediation is a voluntary, confidential process where a neutral third party helps disputing parties communicate effectively and reach a mutually acceptable resolution. Unlike litigation, mediation empowers the parties to control the outcome.

We offer mediation for:

• Family disputes (separation, divorce, custody)
• Commercial and business conflicts
• Civil disputes (property, landlord-tenant)
• Community and interpersonal conflicts
• Employment and workplace disputes
• Contract and payment disagreements

Our certified mediators create a safe, neutral environment where both parties can express their concerns and work toward creative solutions. Mediation typically costs 50-70% less than litigation and resolves in weeks or months rather than years.`,
    keyPoints: [
      'Cost-effective dispute resolution',
      'Faster resolution than litigation',
      'Confidential and private process',
      'Preserves relationships',
      'Control over outcomes'
    ],
    costInfo: 'Hourly rates $150-250/hour, typically split between parties. Flat fees available for straightforward mediations.',
    timeline: 'Most mediations complete within 4-12 weeks, compared to years for court proceedings.',
    eligibility: 'Available for any dispute where both parties are willing to participate in good faith negotiation.'
  },
  {
    id: 'criminal-matters',
    name: 'Criminal Matters',
    tribunal: 'Provincial Court - Summary Conviction',
    shortDescription: 'Expert paralegal representation for summary conviction offences in Ontario.',
    icon: <Shield className="w-8 h-8" />,
    image: 'https://static.wixstatic.com/media/99571b_4ba7fcab4a44445f8d02822f47c00c92~mv2.png?id=criminal-matters',
    learnMore: `Criminal charges can have serious consequences for your future. Our licensed paralegals provide skilled defense representation for summary conviction offences in Provincial Court, helping you navigate the criminal justice system with confidence.

We represent clients charged with:

• Assault and violence offences
• Property crimes (theft, mischief)
• Driving offences (impaired, suspended license)
• Public order violations
• Fraud and dishonesty offences
• Breach of court orders and conditions

Our approach includes thorough case assessment, disclosure review, Crown negotiations, and vigorous trial representation when necessary. We work to minimize consequences and achieve the best possible outcome for your situation.

IMPORTANT: We can only represent you for summary conviction offences in Provincial Court. For indictable offences or matters in Superior Court, you will need to retain a lawyer.`,
    keyPoints: [
      'Summary conviction offence expertise',
      'Provincial Court representation',
      'Crown negotiation and plea advice',
      'Trial defense representation',
      'Case assessment and strategy'
    ],
    costInfo: 'Flexible fee arrangements available. Hourly rates and fixed fees for specific services. Discuss your budget during consultation.',
    timeline: 'Summary conviction cases typically resolve within 3-12 months depending on complexity and court scheduling.',
    eligibility: 'Available to individuals charged with summary conviction offences in Ontario. Scope limited to Provincial Court matters.'
  },
  {
    id: 'bail-hearings',
    name: 'Bail Hearings & Release',
    tribunal: 'Provincial Court - Bail Proceedings',
    shortDescription: 'Emergency representation to secure your release on reasonable bail conditions after arrest.',
    icon: <Lock className="w-8 h-8" />,
    image: 'https://static.wixstatic.com/media/99571b_967c0331818f46028ebf68e309549013~mv2.png?id=bail-hearings',
    learnMore: `When you're arrested, getting out of custody quickly is critical. A bail hearing determines whether you should be released and under what conditions. Our licensed paralegals fight for your freedom with experienced bail hearing advocacy.

We provide immediate assistance with:

• Emergency representation within 24 hours
• Bail hearing preparation and strategy
• Character reference and documentation gathering
• Surety coordination and preparation
• Court appearance and advocacy
• Bail condition negotiation
• Post-release guidance and support

Time is critical in bail hearings—they must be held within 3 days of arrest. Contact us immediately if you or a loved one has been arrested. We offer 24/7 emergency consultations and can often appear in court the same day.`,
    keyPoints: [
      '24/7 emergency availability',
      'Same-day court appearance',
      'Bail condition negotiation',
      'Surety preparation and coordination',
      'Proven track record of successful releases'
    ],
    costInfo: 'Emergency rates available. Flexible payment arrangements for urgent matters. Discuss your situation during emergency consultation.',
    timeline: 'Bail hearings must be held within 3 days of arrest. We can often appear in court the same day you contact us.',
    eligibility: 'Available to anyone arrested and facing a bail hearing in Ontario Provincial Court. 24/7 emergency service.'
  },
  {
    id: 'notary-public',
    name: 'Notary Public Services',
    tribunal: 'Notary Public',
    shortDescription: 'Professional notarization of documents, affidavits, and statutory declarations.',
    icon: <Stamp className="w-8 h-8" />,
    image: 'https://static.wixstatic.com/media/99571b_df17fea496c94fbfa4d9b440d3a97917~mv2.png?id=notary-public-services',
    learnMore: `A notary public is an official authorized to witness the signing of documents, administer oaths, and certify the authenticity of signatures. Notarization adds a layer of legal credibility to important documents and is often required for international transactions, real estate matters, and legal proceedings.

Our notary public services include:

• Document notarization and witnessing
• Affidavit preparation and administration
• Statutory declaration witnessing
• Signature verification and certification
• Document authentication for international use
• Certified copies of original documents
• Power of attorney witnessing
• Loan document notarization

We provide professional, efficient notary services at competitive rates. Whether you need a single document notarized or multiple documents for a transaction, our experienced notary public is available to assist you.`,
    keyPoints: [
      'Document notarization',
      'Affidavit administration',
      'Signature verification',
      'International document authentication',
      'Quick turnaround service'
    ],
    costInfo: 'Affordable per-document notarization fees. Volume discounts available for multiple documents. Rates are competitive and transparent.',
    timeline: 'Most notarizations completed same-day or within 24 hours. Appointments available for your convenience.',
    eligibility: 'Open to anyone requiring notarization services. Bring valid government-issued ID and the documents requiring notarization.'
  },
  {
    id: 'commissioner-of-oaths',
    name: 'Commissioner of Oaths',
    tribunal: 'Commissioner of Oaths',
    shortDescription: 'Official administration of oaths and statutory declarations for legal proceedings.',
    icon: <CheckCircle className="w-8 h-8" />,
    image: 'https://static.wixstatic.com/media/99571b_ac8e6a387b054b7b9b641d85cae3048c~mv2.png?id=commissioner-of-oaths',
    learnMore: `A Commissioner of Oaths is a legal official authorized to administer oaths and affirmations, and to witness statutory declarations. This service is essential for legal proceedings, court documents, and matters requiring sworn statements under penalty of perjury.

Our Commissioner of Oaths services include:

• Oath and affirmation administration
• Statutory declaration witnessing and certification
• Affidavit preparation and administration
• Solemn declaration witnessing
• Court document preparation and certification
• Witness statement certification
• Declaration of truth for legal proceedings
• Penalty of perjury administration

When you swear an oath before our Commissioner of Oaths, you are making a legally binding commitment to tell the truth. This carries serious legal consequences if false information is provided. Our experienced commissioner ensures proper procedure and documentation for all matters.`,
    keyPoints: [
      'Oath and affirmation administration',
      'Statutory declaration witnessing',
      'Affidavit certification',
      'Court document preparation',
      'Legal compliance assurance'
    ],
    costInfo: 'Competitive rates for oath administration and statutory declarations. Affordable fees for legal document certification.',
    timeline: 'Same-day service available for most oath and declaration matters. Appointments can be scheduled at your convenience.',
    eligibility: 'Available to anyone requiring oath administration or statutory declarations for legal proceedings, court matters, or official purposes.'
  },

  {
    id: 'social-benefits-tribunal',
    name: 'Social Benefits Tribunal',
    tribunal: 'Social Benefits Tribunal (SBT)',
    shortDescription: 'Expert representation for social assistance and disability support appeals in Ontario.',
    icon: <Landmark className="w-8 h-8" />,
    image: 'https://static.wixstatic.com/media/99571b_faf5f604ad2e4e5580802a20f563e710~mv2.png?id=social-benefits-tribunal',
    learnMore: `The Social Benefits Tribunal (SBT) hears appeals from individuals denied social assistance or disability support benefits in Ontario. If your Ontario Works or ODSP application has been denied or terminated, we can help you appeal that decision.

Our experienced representatives understand complex eligibility requirements and appeal procedures. We work to ensure your case is presented effectively and that you receive fair consideration of your circumstances and entitlements.

We handle appeals for:

• Ontario Works (OW) denials and terminations
• ODSP (Ontario Disability Support Program) appeals
• Eligibility disputes and income calculations
• Overpayment challenges
• Special circumstances and hardship claims`,
    keyPoints: [
      '30-day appeal deadline',
      '60%+ success rate with representation',
      'Free tribunal filing',
      'Expert knowledge of regulations',
      'Strong documentation and advocacy'
    ],
    costInfo: 'Hourly rates $150-250/hour or flat fees for straightforward appeals. Free initial consultation.',
    timeline: 'Typically 4-6 months from initial consultation to tribunal decision.',
    eligibility: 'Available to anyone with a denied or terminated Ontario Works or ODSP decision who wishes to appeal.'
  },
  {
    id: 'defamation-slander',
    name: 'Defamation & Slander',
    tribunal: 'Small Claims Court or Superior Court',
    shortDescription: 'Expert guidance on defamation claims and reputation protection. Paralegal support for pre-litigation matters and Small Claims Court representation.',
    icon: <Gavel className="w-8 h-8" />,
    image: 'https://static.wixstatic.com/media/99571b_42444ec42c4a427db445d028d3149b76~mv2.png?id=defamation-slander',
    learnMore: `Defamation is a false statement that damages your reputation. Whether spoken (slander) or written (libel), defamation can have serious consequences for your personal and professional life. We provide expert guidance on pursuing defamation claims and protecting your reputation.

While Ontario paralegals cannot represent you in defamation lawsuits, we provide valuable pre-litigation support including:

• Case assessment and legal analysis
• Evidence gathering and documentation
• Demand letter preparation
• Negotiation and settlement discussions
• Damages calculation and documentation
• Online defamation investigation and removal
• Lawyer referral for litigation

We understand the emotional impact of being defamed and work to help you hold those responsible accountable. Our goal is to achieve resolution through negotiation when possible, while preparing your case for litigation if necessary.`,
    keyPoints: [
      'Pre-litigation case assessment',
      'Evidence gathering and documentation',
      'Demand letter preparation',
      'Settlement negotiation',
      'Online defamation support'
    ],
    costInfo: 'Hourly rates $150-250/hour for paralegal services. Flat fees available for pre-litigation packages. Lawyer referrals for litigation.',
    timeline: 'Pre-litigation phase: 2-6 weeks. Negotiation: 4-12 weeks. Litigation (with lawyer): 12-24+ months. Critical: 2-year limitation period from publication.',
    eligibility: 'Available to anyone who believes they have been defamed. Paralegal services for pre-litigation support; lawyer required for court representation.'
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
                      ) : service.id === 'family-matters' ? (
                        <Link to="/services/family-matters" className="w-full flex items-center justify-between text-primary font-paragraph font-semibold group-hover:gap-3 transition-all py-2">
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      ) : service.id === 'mediation' ? (
                        <Link to="/services/mediation" className="w-full flex items-center justify-between text-primary font-paragraph font-semibold group-hover:gap-3 transition-all py-2">
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      ) : service.id === 'criminal-matters' ? (
                        <Link to="/services/criminal-matters" className="w-full flex items-center justify-between text-primary font-paragraph font-semibold group-hover:gap-3 transition-all py-2">
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      ) : service.id === 'bail-hearings' ? (
                        <Link to="/services/bail-hearings" className="w-full flex items-center justify-between text-primary font-paragraph font-semibold group-hover:gap-3 transition-all py-2">
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      ) : service.id === 'notary-public' ? (
                        <Link to="/services/notary-public" className="w-full flex items-center justify-between text-primary font-paragraph font-semibold group-hover:gap-3 transition-all py-2">
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      ) : service.id === 'commissioner-of-oaths' ? (
                        <Link to="/services/commissioner-of-oaths" className="w-full flex items-center justify-between text-primary font-paragraph font-semibold group-hover:gap-3 transition-all py-2">
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      ) : service.id === 'social-benefits-tribunal' ? (
                        <Link to="/services/social-benefits-tribunal" className="w-full flex items-center justify-between text-primary font-paragraph font-semibold group-hover:gap-3 transition-all py-2">
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      ) : service.id === 'defamation-slander' ? (
                        <Link to="/services/defamation-slander" className="w-full flex items-center justify-between text-primary font-paragraph font-semibold group-hover:gap-3 transition-all py-2">
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
