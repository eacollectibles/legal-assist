import { useState, useEffect } from 'react';
import { ArrowRight, Scale, Users, FileText, AlertCircle, Home, Handshake, Shield, Stamp, CheckCircle, Landmark, Gavel, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';
import { PHONE_HREF } from '@/lib/contact';

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
    image: 'https://static.wixstatic.com/media/99571b_4477a5a9ef4f48cc8e3416990393a421~mv2.png?id=small-claims-court',
    learnMore: `Small Claims Court is a branch of the Superior Court of Justice that handles civil disputes for principal amounts up to $50,000 (raised from $35,000 effective January 1, 2025). The procedure is governed by the Courts of Justice Act, R.S.O. 1990, c. C.43, and the Rules of the Small Claims Court, O. Reg. 258/98. Our licensed paralegals appear in this court regularly under Law Society of Ontario By-Law 4.

Whether you're pursuing a debt recovery, property damage claim, or contract dispute, we provide representation including:

• Drafting and filing the Plaintiff's Claim (Form 7A) or Defence (Form 9A)
• Service of court documents in accordance with the Rules
• Evidence preparation, document production, and witness preparation
• Attendance at the mandatory settlement conference (Rule 13)
• Drafting and arguing motions (default judgment, set-aside, summary disposition)
• Trial representation before a Deputy Judge
• Post-judgment enforcement filings (writ of seizure and sale, garnishment, debtor examination)`,
    keyPoints: [
      'Claims up to $50,000 principal (interest + costs additional)',
      'Plaintiff or defence representation',
      'Mandatory settlement conference (Rule 13)',
      'Trial advocacy before a Deputy Judge',
      'Post-judgment enforcement assistance'
    ],
    costInfo: 'Flat fees for standard claims or hourly rates for complex matters. Free 30-minute consultation to assess the file.',
    timeline: 'Realistic timelines: settlement conference is typically scheduled 6-12 months after filing; trial beyond that. Default judgments (where no Defence is filed) can be issued in 30-60 days. Times vary by court location and current scheduling.',
    eligibility: 'Open to individuals, sole proprietors, and corporations with civil claims of $50,000 or less filed in Ontario. The 2-year basic limitation period under the Limitations Act, 2002 generally applies.'
  },
  {
    id: 'landlord-tenant',
    name: 'Landlord and Tenant Board',
    tribunal: 'Landlord and Tenant Board (LTB)',
    shortDescription: 'Professional representation for residential tenancy disputes and eviction proceedings.',
    icon: <Home className="w-8 h-8" />,
    image: 'https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png?id=landlord-tenant-board',
    learnMore: `The Landlord and Tenant Board (LTB) handles disputes between landlords and tenants in Ontario under the Residential Tenancies Act, 2006. Whether you're facing eviction, dealing with maintenance issues, or responding to a rent or above-guideline increase application, our paralegals provide professional representation.

We represent landlords or tenants — but never both sides in the same matter — in applications including:

• Landlord applications (L1 / L2 / L3 / L4 / L5) — non-payment of rent, termination for cause, persistent late payment, or above-guideline rent increase
• Tenant applications (T1 / T2 / T6) — illegal charges, tenants' rights (illegal entry, lockouts, harassment), and maintenance issues
• Rent deposit and last-month's-rent disputes (key money and most other extra charges are prohibited under the RTA)
• Eviction defence and motions to set aside ex parte orders

Every file is screened for conflicts before retainer. Our team works the LTB on a daily basis and is familiar with current scheduling practice and the e-File portal.`,
    keyPoints: [
      'Residential Tenancies Act, 2006 experience',
      'Landlord OR tenant representation (with conflict screening)',
      'L1–L5 and T1/T2/T6 application experience',
      'Eviction defence and set-aside motions',
      'Last-month\'s-rent and prohibited-charge disputes'
    ],
    costInfo: 'Flexible fee structures available. We offer flat fees for standard matters and hourly rates for complex cases.',
    timeline: 'LTB scheduling has been substantially delayed post-2020. Most matters are scheduled 6–12 months after filing, with tenant applications often longer than landlord applications. We will provide a realistic estimate at retainer based on the application type and current Board practice.',
    eligibility: 'Available to landlords or tenants in Ontario. Property managers may be represented through the landlord entity. Conflicts of interest are screened before any retainer.'
  },
  {
    id: 'hrto',
    name: 'Human Rights Tribunal of Ontario',
    tribunal: 'Human Rights Tribunal of Ontario (HRTO)',
    shortDescription: 'Advocacy for discrimination and human rights violations in employment, housing, and services.',
    icon: <Users className="w-8 h-8" />,
    image: 'https://static.wixstatic.com/media/99571b_dd992a5cea8d480083edf1f581620340~mv2.png?id=human-rights-tribunal',
    learnMore: `The Human Rights Tribunal of Ontario (HRTO) is an adjudicative tribunal that hears applications under the Ontario Human Rights Code, R.S.O. 1990, c. H.19. The Code prohibits discrimination on grounds including race, ancestry, place of origin, colour, ethnic origin, citizenship, creed, sex (including pregnancy and breastfeeding), sexual orientation, gender identity, gender expression, age, marital status, family status, and disability — plus record of offences (employment only) and receipt of public assistance (housing only). Note that "political belief" is NOT a protected ground in Ontario.

We handle applications involving:

• Employment discrimination and failure to accommodate
• Harassment tied to a protected ground (creating a poisoned work environment)
• Disability accommodation to the point of undue hardship (s.17 Code)
• Housing discrimination (occupancy of accommodation)
• Discrimination in services, goods, and facilities
• Reprisal for asserting Code-related rights (s.8)

We work with applicants and respondents to file Form 1 / Form 2, prepare evidence, attend mediation, and represent clients at hearing.`,
    keyPoints: [
      'Ontario Human Rights Code experience',
      'Applicant or respondent representation',
      'Mediation and hearing preparation',
      'Damages for injury to dignity, feelings, and self-respect',
      'Right of appearance under LSO By-Law 4'
    ],
    costInfo: 'Hourly or flat-fee retainers depending on the scope. Reduced-fee structures are considered case-by-case for clients with limited means. Note: paralegal contingency arrangements are uncommon in HRTO matters because the remedy is often non-monetary.',
    timeline: 'HRTO applications typically take 12-24 months from filing to a final hearing decision. Many cases settle at mediation 6-9 months in.',
    eligibility: 'Available to anyone who has experienced discrimination on a protected ground in one of the five social areas covered by the Code (services, accommodation, contracts, employment, vocational associations). The 1-year limitation period under s.34(1) generally applies.'
  },
  {
    id: 'traffic-tickets',
    name: 'Traffic Tickets',
    tribunal: 'Ontario Court of Justice',
    shortDescription: 'Defense representation for traffic violations, speeding, and driving-related offences.',
    icon: <AlertCircle className="w-8 h-8" />,
    image: 'https://static.wixstatic.com/media/99571b_6548a66107d74dd58e4c9db1af6e49bf~mv2.png?id=traffic-tickets',
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
    id: 'mediation',
    name: 'Mediation Services',
    tribunal: 'Mediation & Dispute Resolution',
    shortDescription: 'Professional mediation to resolve disputes collaboratively and cost-effectively within paralegal scope of practice.',
    icon: <Handshake className="w-8 h-8" />,
    image: 'https://static.wixstatic.com/media/99571b_45e4ddef1b79494a92d7e0856a1601a0~mv2.png?id=mediation-services',
    learnMore: `Mediation is a voluntary, confidential process where a neutral third party helps disputing parties communicate effectively and reach a mutually acceptable resolution. Unlike litigation, mediation empowers the parties to control the outcome.

We offer mediation for matters within paralegal scope:

• Commercial and business conflicts
• Civil disputes (property, landlord-tenant)
• Employment and workplace disputes
• Contract and payment disagreements
• Community and interpersonal conflicts
• Small Claims Court settlement conferences

Our mediators create a safe, neutral environment where both parties can express their concerns and work toward creative solutions. Mediation is often less costly and faster than litigation, depending on the matter.

Note: For family law mediation (divorce, custody, support), please consult a family lawyer or certified family mediator. Paralegal scope of practice does not include family law matters unless the paralegal holds a Family Legal Services Provider (FLSP) license.`,
    keyPoints: [
      'Cost-effective dispute resolution',
      'Faster resolution than litigation',
      'Confidential and private process',
      'Preserves relationships',
      'Control over outcomes'
    ],
    costInfo: 'Hourly rates $150-250/hour, typically split between parties. Flat fees available for straightforward mediations.',
    timeline: 'Most mediations complete within 4-12 weeks, compared to years for court proceedings.',
    eligibility: 'Available for civil, commercial, employment, and community disputes where both parties are willing to participate. Family law mediation requires a family lawyer or FLSP-licensed paralegal.'
  },
  {
    id: 'criminal-matters',
    name: 'Criminal Matters',
    tribunal: 'Provincial Court - Summary Conviction',
    shortDescription: 'Licensed paralegal representation for summary conviction offences in Ontario.',
    icon: <Shield className="w-8 h-8" />,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Old_Toronto_City_Hall_Courtroom121.jpg/1200px-Old_Toronto_City_Hall_Courtroom121.jpg',
    learnMore: `Criminal charges can have serious consequences for your future. Our licensed paralegals provide defence representation for summary conviction offences in the Ontario Court of Justice, within the scope authorized by LSO By-Law 4.

We may represent clients on:

• Assault, threats, and harassment (where Crown elects summary)
• Property offences such as theft under $5,000 and mischief under $5,000 (where Crown elects summary)
• Criminal Code driving offences such as impaired/dangerous operation (where Crown elects summary)
• Public-order offences such as causing disturbance and breach of court orders
• Fraud-under-$5,000 and similar dishonesty offences (where Crown elects summary)

Our approach includes thorough case assessment, disclosure review, Crown negotiation, and trial representation when appropriate.

IMPORTANT: Many of these offences are hybrid. A paralegal can only act if the Crown elects to proceed summarily and the matter remains in the Ontario Court of Justice. For indictable offences, jury trials, or any Superior Court of Justice matter, you must retain a lawyer. We will tell you honestly at the first meeting whether we can act, and refer you to defence counsel if we cannot.`,
    keyPoints: [
      'Summary conviction representation in OCJ',
      'Disclosure review and case assessment',
      'Crown negotiation and plea advice',
      'Trial representation within paralegal scope',
      'Honest referral to a lawyer for matters outside scope'
    ],
    costInfo: 'Flexible fee arrangements available. Hourly rates and fixed fees for specific services. Discuss your budget during consultation.',
    timeline: 'Summary conviction cases typically resolve within 3-12 months depending on complexity and court scheduling.',
    eligibility: 'Available to individuals charged with summary conviction offences in Ontario. Scope limited to Provincial Court matters.'
  },
  {
    id: 'notary-public',
    name: 'Notary Public Services',
    tribunal: 'In-house notary',
    shortDescription: 'Notary Public services available in-house through Candice Fogarty (LSO #P21479), separately appointed under the Notaries Act, R.S.O. 1990, c. N.6.',
    icon: <Stamp className="w-8 h-8" />,
    image: 'https://static.wixstatic.com/media/99571b_df17fea496c94fbfa4d9b440d3a97917~mv2.png?id=notary-public-services',
    learnMore: `Candice Fogarty (LSO #P21479) is separately appointed as a Notary Public under the Notaries Act, R.S.O. 1990, c. N.6 — so the firm offers both Commissioner-for-Taking-Affidavits services and full Notary Public services in-house.

Note: paralegals in Ontario are NOT automatically Notaries Public. The Notaries Act extends ex officio to lawyers, not paralegals. Candice holds a separate appointment which lets the firm offer notarial services that most paralegal practices cannot provide.

Both roles compared:

• Commissioner for Taking Affidavits (both paralegals at the firm) — administers oaths and witnesses signatures on Ontario-domestic affidavits and statutory declarations. Used for affidavits filed with the LTB, Small Claims Court, HRTO, and other Ontario tribunals.

• Notary Public (Candice only) — does everything a Commissioner can, plus certifies signatures, certifies true copies, and notarizes documents bound for use outside Ontario. Use this for international documents, apostille-bound documents, certified copies of passports / driver's licences / diplomas, Powers of Attorney for use abroad, foreign mortgage documents, and real estate documents being used outside Ontario.

For notarial appointments, book directly with the firm and we will schedule with Candice.`,
    keyPoints: [
      'Notary Public services available in-house through Candice Fogarty',
      'Both paralegals act as Commissioners for Taking Affidavits',
      'Certified true copies of passports, IDs, diplomas — done in-house',
      'Documents bound for international use can be notarized here',
      'Apostille / authentication paperwork prepared in-house'
    ],
    costInfo: 'Notary fees and Commissioner fees vary by document type and number of signatures. Contact us for a quote on your specific document.',
    timeline: 'Same-day Commissioner appointments often available. Notary appointments scheduled with Candice; usually within 1-2 business days.',
    eligibility: 'Available to individuals and businesses needing oaths, statutory declarations, or notarial services in Ontario.'
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
    shortDescription: 'Professional representation for social assistance and disability support appeals in Ontario.',
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
      'Procedural familiarity with SBT Rules of Procedure and evidence expectations',
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
    shortDescription: 'Professional guidance on defamation claims and reputation protection. Paralegal support for pre-litigation matters and Small Claims Court representation.',
    icon: <Gavel className="w-8 h-8" />,
    image: 'https://static.wixstatic.com/media/99571b_42444ec42c4a427db445d028d3149b76~mv2.png?id=defamation-slander',
    learnMore: `Defamation is a false statement that damages your reputation. Whether spoken (slander) or written (libel), defamation can have serious consequences for your personal and professional life. We provide professional guidance on pursuing defamation claims and protecting your reputation.

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
  },
  {
    id: 'employment-issues',
    name: 'Employment Issues',
    tribunal: 'Small Claims Court / Employment Standards Act',
    shortDescription: 'Representation for employment disputes within paralegal scope, including wrongful dismissal claims up to $50,000, severance reviews, and Employment Standards Act complaints.',
    icon: <Briefcase className="w-8 h-8" />,
    image: 'https://static.wixstatic.com/media/99571b_9954538ec5b24b4a8a245180de229f4b~mv2.png?id=employment-issues',
    learnMore: `Employment disputes can be complex and stressful. Our licensed paralegals provide representation for employment matters that fall within the paralegal scope of practice, including Small Claims Court proceedings and pre-litigation support.

We assist with employment issues including:

- Wrongful Dismissal Claims: Representation in Small Claims Court for claims up to $50,000
- Severance Package Review: Analysis of severance offers to help you understand your entitlements
- Termination Without Cause: Negotiation of severance and benefits following job loss
- Unpaid Wages and Overtime: Recovery of unpaid compensation through Small Claims Court or Ministry of Labour complaints
- Employment Standards Act Complaints: Assistance with Ministry of Labour claims for unpaid wages, vacation pay, and other statutory entitlements
- Pre-Litigation Support: Demand letters, negotiation, and settlement discussions before court proceedings

IMPORTANT SCOPE LIMITATIONS: Paralegals can represent clients in Small Claims Court for employment-related monetary claims up to $50,000. For claims exceeding $50,000, complex wrongful dismissal matters in Superior Court, or matters involving significant legal complexity (such as constructive dismissal with multiple issues), you will need to retain a lawyer. We can provide a referral if your matter falls outside our scope.`,
    keyPoints: [
      'Small Claims Court representation (up to $50,000)',
      'Severance package review and negotiation',
      'Employment Standards Act complaints',
      'Pre-litigation support and demand letters',
      'Ministry of Labour complaint assistance'
    ],
    costInfo: 'Hourly rates $150-250/hour or flat fees for specific services. Free initial consultation to assess your employment situation and confirm it falls within paralegal scope.',
    timeline: 'Initial assessment: 1-2 weeks. Negotiation phase: 4-12 weeks. Small Claims Court proceedings (if necessary): 3-6 months.',
    eligibility: 'Available to employees in Ontario with employment disputes within paralegal scope of practice. Claims must fall within Small Claims Court jurisdiction (up to $50,000) for court representation. We will advise if your matter requires a lawyer.'
  }
];

export default function ServicesPage() {
  // SEO handled by AutoSEO component

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
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Paralegal Services
              </h1>
              <p className="font-paragraph text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-4">
                Serving London, Ontario and communities across Southwestern Ontario with professional paralegal representation in Small Claims Court, Landlord Tenant Board, Provincial Offences, and more.
              </p>
              <p className="font-paragraph text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                Licensed by the Law Society of Ontario, we deliver accessible and affordable legal support that gets results.
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
                    <div className="w-full h-56 sm:h-48 overflow-hidden bg-gray-200">
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
                        <Link to="/services/small-claims-court" className="w-full flex items-center justify-between text-primary font-paragraph font-semibold group-hover:gap-3 transition-all py-2">
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
                      ) : service.id === 'employment-issues' ? (
                        <Link to="/services/employment-issues" className="w-full flex items-center justify-between text-primary font-paragraph font-semibold group-hover:gap-3 transition-all py-2">
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

                      <Link
                        to="/booking"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-paragraph px-6 py-3 rounded-lg transition-all hover:bg-primary/90"
                      >
                        Schedule an Appointment
                        <ArrowRight className="w-4 h-4" />
                      </Link>
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
                Ready to Get Started?
              </h2>
              <p className="font-paragraph text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Contact us today to discuss your legal needs with our experienced paralegal team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph px-8 py-4 rounded-lg transition-all"
                >
                  Call Now
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-primary border-2 border-primary font-paragraph px-8 py-4 rounded-lg transition-all"
                >
                  Book Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
