// SEO Configuration for all pages
// Each route has unique title, description, and keywords

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
}

export const seoConfig: Record<string, SEOConfig> = {
  // Core Pages
  '/': {
    title: 'LegalAssist Paralegal Services | London Ontario | Affordable Legal Help',
    description: 'Licensed paralegal services in London, Ontario. Traffic tickets, landlord-tenant disputes, small claims court, human rights tribunal. Free consultation. Call (519) 601-1110.',
    keywords: 'paralegal london ontario, legal services london, traffic ticket lawyer london',
  },
  '/contact': {
    title: 'Contact Us | LegalAssist Paralegal Services | London Ontario',
    description: 'Contact LegalAssist for a free consultation. Located in London, Ontario. Call (519) 601-1110 or book online. Traffic tickets, LTB, small claims court representation.',
    keywords: 'contact paralegal london, free legal consultation london ontario',
  },
  '/about': {
    title: 'About LegalAssist | Licensed Paralegal Services | London Ontario',
    description: 'Learn about LegalAssist Paralegal Services. Licensed by the Law Society of Ontario. Serving London and Southwestern Ontario with affordable legal representation.',
    keywords: 'about legalassist, licensed paralegal ontario, LSO paralegal',
  },
  '/services': {
    title: 'Legal Services | Traffic Tickets, LTB, Small Claims | LegalAssist',
    description: 'Full range of paralegal services: traffic ticket defence, landlord-tenant board, small claims court, human rights tribunal, employment issues. London, Ontario.',
    keywords: 'paralegal services london, legal services ontario',
  },

  // Main Service Categories
  '/services/traffic-tickets': {
    title: 'Traffic Ticket Defence | Fight Your Ticket | London Ontario Paralegal',
    description: 'Fight your traffic ticket in London, Ontario. Speeding, careless driving, stunt driving, red lights. Protect your licence and insurance rates. Free consultation.',
    keywords: 'traffic ticket lawyer london, fight speeding ticket ontario, traffic court paralegal',
  },
  '/services/small-claims': {
    title: 'Small Claims Court | Sue or Defend Up to $35,000 | London Ontario',
    description: 'Small Claims Court representation in London, Ontario. Debt collection, contract disputes, property damage claims. Claims up to $35,000. Free consultation.',
    keywords: 'small claims court london, sue someone ontario, debt collection paralegal',
  },
  '/services/landlord-tenant': {
    title: 'Landlord Tenant Board | LTB Representation | London Ontario Paralegal',
    description: 'LTB representation for landlords and tenants in London, Ontario. Evictions, rent disputes, maintenance issues, N12/N13 notices. Free consultation.',
    keywords: 'landlord tenant board london, LTB paralegal, eviction defence ontario',
  },
  '/services/human-rights': {
    title: 'Human Rights Tribunal | HRTO Representation | London Ontario',
    description: 'Human Rights Tribunal of Ontario representation. Workplace discrimination, housing discrimination, disability accommodation. Free consultation in London.',
    keywords: 'human rights tribunal ontario, HRTO paralegal, discrimination lawyer london',
  },
  '/services/employment-issues': {
    title: 'Employment Law | Wrongful Dismissal & Severance | London Ontario',
    description: 'Employment law help in London, Ontario. Wrongful termination, severance pay disputes, unpaid wages, constructive dismissal. Free consultation.',
    keywords: 'employment lawyer london, wrongful dismissal ontario, severance pay paralegal',
  },
  '/services/criminal-matters': {
    title: 'Criminal Defence | Summary Offences | London Ontario Paralegal',
    description: 'Criminal defence for summary conviction offences in London, Ontario. Theft under $5000, mischief, simple assault. Protect your record. Free consultation.',
    keywords: 'criminal lawyer london, theft under 5000 defence, summary offence paralegal',
  },
  '/services/provincial-offences': {
    title: 'Provincial Offences | POA Defence | London Ontario Paralegal',
    description: 'Provincial Offences Act defence in London, Ontario. Regulatory charges, by-law violations, ministry charges. Experienced representation. Free consultation.',
    keywords: 'provincial offences london, POA defence ontario, regulatory offence paralegal',
  },

  // Traffic Ticket Sub-pages
  '/services/speeding-ticket-defence': {
    title: 'Speeding Ticket Defence | Fight Your Speeding Ticket | London Ontario',
    description: 'Fight your speeding ticket in London, Ontario. Reduce fines, avoid demerit points, protect your insurance. Experienced paralegal representation. Free consultation.',
    keywords: 'speeding ticket london, fight speeding ticket ontario, speeding fine defence',
  },
  '/services/careless-driving-defence': {
    title: 'Careless Driving Defence | 6 Demerit Points | London Ontario Paralegal',
    description: 'Careless driving charge in London, Ontario? 6 demerit points and up to $2,000 fine at stake. Expert defence to protect your licence. Free consultation.',
    keywords: 'careless driving defence london, careless driving ticket ontario, 6 demerit points',
  },
  '/services/stunt-driving-defence': {
    title: 'Stunt Driving Defence | 50 Over | London Ontario Paralegal',
    description: 'Charged with stunt driving in Ontario? 50+ over the limit carries licence suspension and vehicle impound. Aggressive defence strategy. Free consultation.',
    keywords: 'stunt driving defence london, 50 over speed limit ontario, racing ticket defence',
  },
  '/services/distracted-driving': {
    title: 'Distracted Driving Defence | Cell Phone Ticket | London Ontario',
    description: 'Fight your distracted driving ticket in London, Ontario. Cell phone use while driving carries heavy fines and points. Expert defence. Free consultation.',
    keywords: 'distracted driving ticket london, cell phone ticket defence ontario',
  },
  '/services/red-light-tickets': {
    title: 'Red Light Ticket Defence | Run Red Light | London Ontario Paralegal',
    description: 'Fight your red light ticket in London, Ontario. Camera tickets and officer-issued tickets. Protect your driving record. Free consultation.',
    keywords: 'red light ticket defence london, run red light ontario, red light camera ticket',
  },
  '/services/no-insurance-defence': {
    title: 'No Insurance Defence | Drive Without Insurance | London Ontario',
    description: 'Charged with driving without insurance in Ontario? $5,000-$25,000 fine at stake. Expert defence strategies. Free consultation in London.',
    keywords: 'no insurance ticket ontario, driving without insurance defence london',
  },
  '/services/demerit-points-guide': {
    title: 'Demerit Points Guide | Ontario Point System | LegalAssist',
    description: 'Understanding Ontario demerit points. How many points for each offence, suspension thresholds, and how to protect your licence. Free consultation.',
    keywords: 'demerit points ontario, how many points speeding ticket, licence suspension points',
  },
  '/services/g1-g2-violations': {
    title: 'G1 G2 Violations | Novice Driver Tickets | London Ontario',
    description: 'G1 or G2 driver charged with a violation? Zero tolerance rules apply. Protect your graduated licence. Expert paralegal defence in London.',
    keywords: 'G1 G2 ticket ontario, novice driver violation, graduated licence defence',
  },
  '/services/commercial-vehicle-violations': {
    title: 'Commercial Vehicle Violations | Truck Driver Defence | London Ontario',
    description: 'Commercial vehicle tickets in Ontario? CVOR points at stake. Protect your commercial licence and livelihood. Expert defence. Free consultation.',
    keywords: 'commercial vehicle ticket ontario, CVOR points defence, truck driver ticket london',
  },
  '/services/hov-lane-violations': {
    title: 'HOV Lane Violation | Carpool Lane Ticket | Ontario Paralegal',
    description: 'HOV lane ticket in Ontario? Fight your carpool lane violation. Fines up to $500. Experienced paralegal defence. Free consultation.',
    keywords: 'HOV lane ticket ontario, carpool lane violation defence',
  },
  '/services/stop-sign-ticket': {
    title: 'Stop Sign Ticket Defence | Fail to Stop | London Ontario',
    description: 'Fight your stop sign ticket in London, Ontario. Rolling stops and failure to stop charges. Protect your demerit points. Free consultation.',
    keywords: 'stop sign ticket defence london, fail to stop ontario, rolling stop ticket',
  },
  '/services/street-racing': {
    title: 'Street Racing Defence | Racing Charge | London Ontario Paralegal',
    description: 'Charged with street racing in Ontario? Serious penalties including licence suspension and vehicle seizure. Expert defence. Free consultation.',
    keywords: 'street racing charge ontario, racing ticket defence london',
  },
  '/services/fail-to-yield': {
    title: 'Fail to Yield Defence | Right of Way Ticket | London Ontario',
    description: 'Fail to yield ticket in London, Ontario? Fight your right-of-way violation. Protect your driving record. Experienced paralegal. Free consultation.',
    keywords: 'fail to yield ticket ontario, right of way violation defence london',
  },
  '/services/unsafe-lane-change': {
    title: 'Unsafe Lane Change Defence | Improper Lane Change | London Ontario',
    description: 'Unsafe lane change ticket in London, Ontario? Fight your improper lane change charge. Protect your record. Free consultation.',
    keywords: 'unsafe lane change ticket ontario, improper lane change defence',
  },
  '/services/following-too-closely': {
    title: 'Following Too Closely Defence | Tailgating Ticket | London Ontario',
    description: 'Following too closely ticket in Ontario? Tailgating charge defence in London. Protect your demerit points. Free consultation.',
    keywords: 'following too closely ticket ontario, tailgating defence london',
  },
  '/services/driving-while-suspended': {
    title: 'Driving While Suspended Defence | Suspended Licence | London Ontario',
    description: 'Charged with driving while suspended in Ontario? Criminal charge with serious penalties. Expert defence in London. Free consultation.',
    keywords: 'driving while suspended ontario, suspended licence charge defence london',
  },
  '/services/school-zone-speeding': {
    title: 'School Zone Speeding | Community Safety Zone | London Ontario',
    description: 'School zone speeding ticket in London, Ontario? Double fines in community safety zones. Fight your ticket. Free consultation.',
    keywords: 'school zone speeding ticket ontario, community safety zone fine defence',
  },
  '/services/seatbelt-violations': {
    title: 'Seatbelt Ticket Defence | No Seatbelt Fine | London Ontario',
    description: 'Seatbelt violation ticket in London, Ontario? Fight your no seatbelt charge. Experienced paralegal defence. Free consultation.',
    keywords: 'seatbelt ticket ontario, no seatbelt fine defence london',
  },

  // LTB Sub-pages
  '/services/landlord-services': {
    title: 'Landlord Services | Evictions & LTB Applications | London Ontario',
    description: 'LTB representation for landlords in London, Ontario. Eviction applications, rent arrears, problem tenants. Protect your property investment. Free consultation.',
    keywords: 'landlord paralegal london, eviction services ontario, LTB landlord application',
  },
  '/services/tenant-services': {
    title: 'Tenant Services | Eviction Defence & Rights | London Ontario',
    description: 'Tenant representation at the LTB in London, Ontario. Eviction defence, illegal rent increases, maintenance issues. Know your rights. Free consultation.',
    keywords: 'tenant paralegal london, eviction defence ontario, tenant rights LTB',
  },
  '/services/eviction-non-payment': {
    title: 'N4 Eviction Defence | Non-Payment of Rent | London Ontario',
    description: 'Facing N4 eviction for non-payment in London, Ontario? You have rights and options. Expert tenant defence at the LTB. Free consultation.',
    keywords: 'N4 eviction defence london, non-payment of rent ontario, eviction for arrears',
  },
  '/services/n12-personal-use-eviction': {
    title: 'N12 Eviction Defence | Landlord Own Use | London Ontario',
    description: 'Received N12 notice for landlord own use in Ontario? Many N12s are issued in bad faith. Know your rights. Expert defence. Free consultation.',
    keywords: 'N12 eviction defence ontario, landlord own use eviction, bad faith N12',
  },
  '/services/n13-renovation-eviction': {
    title: 'N13 Eviction Defence | Renovation Eviction | London Ontario',
    description: 'N13 renovation eviction notice in Ontario? Landlords must meet strict requirements. Protect your tenancy. Expert LTB defence. Free consultation.',
    keywords: 'N13 eviction defence ontario, renovation eviction, renoviction defence',
  },
  '/services/above-guideline-increase': {
    title: 'Above Guideline Rent Increase | AGI Defence | London Ontario',
    description: 'Landlord applying for above guideline rent increase in Ontario? Tenants can dispute AGI applications at the LTB. Free consultation.',
    keywords: 'above guideline increase ontario, AGI defence tenant, rent increase dispute',
  },
  '/services/maintenance-repairs': {
    title: 'Maintenance & Repairs | T6 Application | London Ontario Tenant',
    description: 'Landlord not making repairs in London, Ontario? File T6 application for rent reduction and repair orders. Expert tenant representation. Free consultation.',
    keywords: 'landlord not fixing repairs ontario, T6 application LTB, maintenance issues tenant',
  },
  '/services/bad-faith-eviction': {
    title: 'Bad Faith Eviction | Compensation Claims | London Ontario',
    description: 'Evicted in bad faith in Ontario? You may be entitled to compensation. N12/N13 bad faith claims. Expert representation. Free consultation.',
    keywords: 'bad faith eviction ontario, N12 compensation, wrongful eviction claim',
  },
  '/services/rent-increase-guide': {
    title: 'Rent Increase Guide | Ontario Rules 2024 | LegalAssist',
    description: 'Ontario rent increase rules explained. 2024 guideline, exemptions, illegal increases. Know your rights as a tenant. Free consultation in London.',
    keywords: 'rent increase ontario 2024, rent increase guideline, illegal rent increase',
  },
  '/services/illegal-lockout': {
    title: 'Illegal Lockout | Landlord Changed Locks | London Ontario',
    description: 'Landlord changed locks or locked you out in Ontario? This is illegal. Get back in your home and claim compensation. Emergency help available.',
    keywords: 'illegal lockout ontario, landlord changed locks, locked out of apartment',
  },
  '/services/landlord-harassment': {
    title: 'Landlord Harassment | T2 Application | London Ontario',
    description: 'Landlord harassing you in Ontario? Interference with reasonable enjoyment. File T2 application for compensation. Expert representation. Free consultation.',
    keywords: 'landlord harassment ontario, T2 application LTB, interference with tenant',
  },
  '/services/rent-arrears-defence': {
    title: 'Rent Arrears Defence | Behind on Rent | London Ontario',
    description: 'Behind on rent in London, Ontario? Facing L1 application? You have options including payment plans and relief from eviction. Free consultation.',
    keywords: 'rent arrears defence ontario, behind on rent LTB, L1 application defence',
  },
  '/services/subsidized-housing-eviction': {
    title: 'Subsidized Housing Eviction | RGI Defence | London Ontario',
    description: 'Facing eviction from subsidized housing in Ontario? Special rules apply to RGI tenants. Expert defence at LTB. Free consultation.',
    keywords: 'subsidized housing eviction ontario, RGI eviction defence, social housing LTB',
  },
  '/services/roommate-disputes': {
    title: 'Roommate Disputes | Shared Housing Issues | London Ontario',
    description: 'Roommate problems in London, Ontario? Understand your rights in shared housing situations. Expert advice and representation. Free consultation.',
    keywords: 'roommate dispute ontario, shared housing rights, roommate eviction',
  },
  '/services/breaking-lease-early': {
    title: 'Breaking Lease Early | End Tenancy | London Ontario',
    description: 'Need to break your lease early in Ontario? Understand your options and minimize liability. Expert tenant advice. Free consultation in London.',
    keywords: 'break lease early ontario, end tenancy early, lease termination',
  },
  '/services/pet-disputes': {
    title: 'Pet Disputes | No Pets Clause | London Ontario Tenant',
    description: 'Landlord says no pets in Ontario? No-pet clauses are generally unenforceable. Know your rights. Expert tenant representation. Free consultation.',
    keywords: 'no pets clause ontario, pet dispute landlord, tenant pet rights',
  },
  '/services/noise-complaints-defence': {
    title: 'Noise Complaints Defence | N5 Notice | London Ontario',
    description: 'Facing eviction for noise complaints in Ontario? N5 notice defence. Protect your tenancy from unfair accusations. Free consultation.',
    keywords: 'noise complaint eviction ontario, N5 notice defence, nuisance tenant defence',
  },
  '/services/ltb-hearing-preparation': {
    title: 'LTB Hearing Preparation | What to Expect | London Ontario',
    description: 'Preparing for LTB hearing in Ontario? Know what to bring, what to say, and how the process works. Expert preparation help. Free consultation.',
    keywords: 'LTB hearing preparation ontario, landlord tenant board hearing, what to expect LTB',
  },
  '/services/rent-reduction-applications': {
    title: 'Rent Reduction Application | T3 Application | London Ontario',
    description: 'Apply for rent reduction in Ontario due to reduced services or maintenance issues. T3 application at LTB. Expert representation. Free consultation.',
    keywords: 'rent reduction ontario, T3 application LTB, reduced services tenant',
  },
  '/services/mobile-home-park-disputes': {
    title: 'Mobile Home Park Disputes | Trailer Park Rights | London Ontario',
    description: 'Mobile home park dispute in Ontario? Special rules apply to trailer park tenancies. Expert representation at LTB. Free consultation.',
    keywords: 'mobile home park dispute ontario, trailer park tenant rights, land lease community',
  },
  '/services/superintendent-housing-rights': {
    title: 'Superintendent Housing Rights | Building Staff | London Ontario',
    description: 'Superintendent or building staff housing issues in Ontario? Special tenancy rules apply. Know your rights. Expert advice. Free consultation.',
    keywords: 'superintendent housing rights ontario, building staff tenancy, caretaker housing',
  },

  // Small Claims Sub-pages
  '/services/small-claims-process': {
    title: 'Small Claims Court Process | Step by Step Guide | London Ontario',
    description: 'How Small Claims Court works in Ontario. Filing claims, settlement conferences, trials. Expert representation in London. Free consultation.',
    keywords: 'small claims court process ontario, how to sue someone, small claims guide',
  },
  '/services/debt-collection': {
    title: 'Debt Collection | Collect Money Owed | London Ontario Paralegal',
    description: 'Collect debts through Small Claims Court in London, Ontario. Unpaid loans, invoices, personal debts up to $35,000. Free consultation.',
    keywords: 'debt collection paralegal london, collect money owed ontario, sue for debt',
  },
  '/services/contract-disputes': {
    title: 'Contract Disputes | Breach of Contract | London Ontario',
    description: 'Contract dispute in London, Ontario? Sue for breach of contract in Small Claims Court. Claims up to $35,000. Expert representation. Free consultation.',
    keywords: 'contract dispute paralegal london, breach of contract ontario, sue for contract',
  },
  '/services/judgement-enforcement': {
    title: 'Judgement Enforcement | Collect Your Judgement | London Ontario',
    description: 'Won your case but can\'t collect? Judgement enforcement services in London, Ontario. Garnishment, seizure, examination. Free consultation.',
    keywords: 'judgement enforcement ontario, collect court judgement, garnishment paralegal',
  },
  '/services/property-damage-claims': {
    title: 'Property Damage Claims | Sue for Damages | London Ontario',
    description: 'Property damaged by someone else in Ontario? Sue for compensation in Small Claims Court. Up to $35,000. Expert representation. Free consultation.',
    keywords: 'property damage claim ontario, sue for damages london, damage compensation',
  },
  '/services/unpaid-invoices': {
    title: 'Unpaid Invoices | Business Debt Collection | London Ontario',
    description: 'Customers not paying invoices in Ontario? Collect business debts through Small Claims Court. Up to $35,000. Expert representation. Free consultation.',
    keywords: 'unpaid invoice collection ontario, business debt paralegal london',
  },
  '/services/security-deposits': {
    title: 'Security Deposit Disputes | Last Month Rent | London Ontario',
    description: 'Landlord keeping your deposit in Ontario? Sue for return of last month\'s rent or illegal deposits. Small Claims Court. Free consultation.',
    keywords: 'security deposit dispute ontario, last month rent return, illegal deposit claim',
  },
  '/services/consumer-disputes': {
    title: 'Consumer Disputes | Defective Products | London Ontario',
    description: 'Consumer dispute in London, Ontario? Defective products, poor services, consumer protection. Small Claims Court. Free consultation.',
    keywords: 'consumer dispute paralegal ontario, defective product claim, consumer protection',
  },
  '/services/personal-injury-claims': {
    title: 'Personal Injury Claims | Minor Injuries | London Ontario',
    description: 'Minor personal injury claim in Ontario? Dog bites, slip and fall, minor accidents. Small Claims Court up to $35,000. Free consultation.',
    keywords: 'personal injury small claims ontario, minor injury claim london',
  },
  '/services/home-improvement-disputes': {
    title: 'Home Improvement Disputes | Contractor Problems | London Ontario',
    description: 'Bad contractor in London, Ontario? Sue for poor workmanship, incomplete work, or deposit recovery. Small Claims Court. Free consultation.',
    keywords: 'contractor dispute ontario, bad contractor claim, home improvement lawsuit',
  },
  '/services/vehicle-purchase-disputes': {
    title: 'Vehicle Purchase Disputes | Used Car Problems | London Ontario',
    description: 'Bought a lemon in Ontario? Used car disputes, undisclosed damage, mechanical issues. Small Claims Court. Free consultation in London.',
    keywords: 'used car dispute ontario, vehicle purchase claim, lemon car lawsuit',
  },
  '/services/neighbour-disputes': {
    title: 'Neighbour Disputes | Property Conflicts | London Ontario',
    description: 'Neighbour dispute in London, Ontario? Property damage, boundary issues, nuisance claims. Small Claims Court. Free consultation.',
    keywords: 'neighbour dispute paralegal ontario, property conflict claim, nuisance lawsuit',
  },
  '/services/return-of-property': {
    title: 'Return of Property | Get Your Belongings Back | London Ontario',
    description: 'Someone won\'t return your property in Ontario? Sue for return of belongings or their value. Small Claims Court. Free consultation.',
    keywords: 'return of property claim ontario, get belongings back lawsuit',
  },
  '/services/breach-of-warranty': {
    title: 'Breach of Warranty | Warranty Claims | London Ontario',
    description: 'Warranty not honoured in Ontario? Sue for breach of warranty in Small Claims Court. Product and service warranties. Free consultation.',
    keywords: 'breach of warranty claim ontario, warranty dispute paralegal',
  },
  '/services/loan-recovery': {
    title: 'Loan Recovery | Personal Loans | London Ontario',
    description: 'Lent money and not getting paid back in Ontario? Sue to recover personal loans in Small Claims Court. Free consultation in London.',
    keywords: 'loan recovery ontario, personal loan collection, sue to get money back',
  },
  '/services/tenant-damage-claims': {
    title: 'Tenant Damage Claims | Landlord Recovery | London Ontario',
    description: 'Tenant damaged your property in Ontario? Sue for damages in Small Claims Court after tenancy ends. Expert landlord representation. Free consultation.',
    keywords: 'tenant damage claim ontario, landlord sue tenant, property damage recovery',
  },
  '/services/wrongful-dismissal-claims': {
    title: 'Wrongful Dismissal Claims | Employment Lawsuit | London Ontario',
    description: 'Wrongfully dismissed in Ontario? Sue for wrongful dismissal in Small Claims Court (up to $35,000) or Superior Court. Free consultation.',
    keywords: 'wrongful dismissal claim ontario, employment lawsuit london, termination lawsuit',
  },
  '/services/professional-negligence': {
    title: 'Professional Negligence | Negligent Services | London Ontario',
    description: 'Professional provided negligent services in Ontario? Accountant, contractor, advisor errors. Small Claims Court. Free consultation.',
    keywords: 'professional negligence claim ontario, negligent service lawsuit',
  },
  '/services/defamation-slander': {
    title: 'Defamation & Slander | Reputation Damage | London Ontario',
    description: 'Someone defamed you in Ontario? Slander or libel claims in Small Claims Court. Protect your reputation. Free consultation in London.',
    keywords: 'defamation claim ontario, slander lawsuit, libel paralegal london',
  },

  // HRTO Sub-pages
  '/services/workplace-discrimination': {
    title: 'Workplace Discrimination | HRTO Claims | London Ontario',
    description: 'Experienced workplace discrimination in Ontario? File human rights complaint at HRTO. Race, gender, disability, age. Free consultation.',
    keywords: 'workplace discrimination ontario, HRTO complaint, employment discrimination',
  },
  '/services/housing-discrimination': {
    title: 'Housing Discrimination | Rental Discrimination | London Ontario',
    description: 'Denied housing due to discrimination in Ontario? Race, family status, disability, income source. HRTO complaint. Free consultation.',
    keywords: 'housing discrimination ontario, rental discrimination HRTO, denied apartment',
  },
  '/services/disability-accommodation': {
    title: 'Disability Accommodation | Workplace & Housing | London Ontario',
    description: 'Denied disability accommodation in Ontario? Employers and landlords must accommodate. HRTO complaint. Expert representation. Free consultation.',
    keywords: 'disability accommodation ontario, workplace accommodation HRTO, duty to accommodate',
  },
  '/services/age-discrimination': {
    title: 'Age Discrimination | Employment & Services | London Ontario',
    description: 'Experienced age discrimination in Ontario? Employment, services, housing. HRTO complaint. Expert representation in London. Free consultation.',
    keywords: 'age discrimination ontario, ageism HRTO complaint, older worker discrimination',
  },
  '/services/sexual-harassment': {
    title: 'Sexual Harassment | Workplace & Housing | London Ontario',
    description: 'Experienced sexual harassment in Ontario? Workplace or housing. HRTO complaint for compensation. Expert representation. Free consultation.',
    keywords: 'sexual harassment complaint ontario, workplace harassment HRTO, harassment claim',
  },
  '/services/reprisal-claims': {
    title: 'Reprisal Claims | Retaliation | London Ontario HRTO',
    description: 'Retaliated against for asserting your rights in Ontario? Reprisal is illegal. HRTO complaint. Expert representation. Free consultation.',
    keywords: 'reprisal claim ontario, retaliation HRTO, fired for complaining',
  },
  '/services/service-discrimination': {
    title: 'Service Discrimination | Denied Services | London Ontario',
    description: 'Denied services due to discrimination in Ontario? Stores, restaurants, healthcare. HRTO complaint. Expert representation. Free consultation.',
    keywords: 'service discrimination ontario, denied service HRTO, public accommodation',
  },
  '/services/pregnancy-discrimination': {
    title: 'Pregnancy Discrimination | Maternity Rights | London Ontario',
    description: 'Pregnancy discrimination in Ontario? Fired, demoted, or denied accommodation during pregnancy. HRTO complaint. Free consultation.',
    keywords: 'pregnancy discrimination ontario, maternity discrimination HRTO, pregnant fired',
  },

  // Employment Sub-pages
  '/services/wrongful-termination': {
    title: 'Wrongful Termination | Fired Without Cause | London Ontario',
    description: 'Wrongfully terminated in Ontario? You may be owed notice, severance, and damages. Know your rights. Expert representation. Free consultation.',
    keywords: 'wrongful termination ontario, fired without cause, termination pay london',
  },
  '/services/severance-pay': {
    title: 'Severance Pay | How Much Am I Owed | London Ontario',
    description: 'Not sure about your severance entitlement in Ontario? Many employees accept less than they deserve. Free assessment of your severance. Call today.',
    keywords: 'severance pay ontario, how much severance, severance calculator',
  },
  '/services/unpaid-wages': {
    title: 'Unpaid Wages | Owed Money by Employer | London Ontario',
    description: 'Employer owes you wages in Ontario? Unpaid overtime, vacation pay, commissions. Ministry of Labour claim or court action. Free consultation.',
    keywords: 'unpaid wages ontario, employer owes money, wage claim',
  },
  '/services/constructive-dismissal': {
    title: 'Constructive Dismissal | Forced to Quit | London Ontario',
    description: 'Forced to quit due to employer actions in Ontario? This may be constructive dismissal. You may be owed compensation. Free consultation.',
    keywords: 'constructive dismissal ontario, forced to quit, workplace changes',
  },

  // Criminal/POA Sub-pages
  '/services/theft-under-5000': {
    title: 'Theft Under $5000 Defence | Shoplifting | London Ontario',
    description: 'Charged with theft under $5000 in Ontario? Shoplifting charges. Protect your criminal record. Expert paralegal defence. Free consultation.',
    keywords: 'theft under 5000 defence london, shoplifting charge ontario, petty theft lawyer',
  },
  '/services/mischief-under-5000': {
    title: 'Mischief Under $5000 Defence | Property Damage | London Ontario',
    description: 'Charged with mischief under $5000 in Ontario? Property damage charges. Summary conviction defence. Expert representation. Free consultation.',
    keywords: 'mischief under 5000 ontario, property damage charge, mischief defence london',
  },
  '/services/simple-assault': {
    title: 'Simple Assault Defence | Assault Charge | London Ontario',
    description: 'Charged with simple assault in Ontario? Summary conviction offence. Protect your record. Expert paralegal defence. Free consultation.',
    keywords: 'simple assault defence london, assault charge ontario, assault lawyer',
  },
  '/services/trespass-property': {
    title: 'Trespass to Property Defence | Trespassing Charge | London Ontario',
    description: 'Charged with trespass to property in Ontario? Provincial offence defence. Expert paralegal representation. Free consultation in London.',
    keywords: 'trespass charge defence ontario, trespassing ticket, trespass to property act',
  },
  '/services/fail-to-comply': {
    title: 'Fail to Comply Defence | Breach Conditions | London Ontario',
    description: 'Charged with fail to comply with conditions in Ontario? Breach of probation or recognizance. Expert defence. Free consultation.',
    keywords: 'fail to comply defence ontario, breach conditions charge, probation breach',
  },
  '/services/peace-bond': {
    title: 'Peace Bond | Section 810 | London Ontario Paralegal',
    description: 'Peace bond matter in Ontario? Section 810 recognizance. Understanding conditions and obligations. Expert advice. Free consultation in London.',
    keywords: 'peace bond ontario, section 810, recognizance conditions',
  },
  '/services/liquor-licence-act': {
    title: 'Liquor Licence Act Defence | Alcohol Charges | London Ontario',
    description: 'Charged under Liquor Licence Act in Ontario? Underage drinking, public intoxication, serving violations. Expert defence. Free consultation.',
    keywords: 'liquor licence act defence ontario, alcohol charge, underage drinking ticket',
  },
  '/services/municipal-bylaw': {
    title: 'Municipal Bylaw Defence | Bylaw Tickets | London Ontario',
    description: 'Municipal bylaw ticket in London, Ontario? Noise, parking, property standards violations. Expert defence. Free consultation.',
    keywords: 'bylaw ticket defence london, municipal bylaw violation, city bylaw fine',
  },
  '/services/regulatory-offences': {
    title: 'Regulatory Offences Defence | Ministry Charges | London Ontario',
    description: 'Charged with regulatory offence in Ontario? Ministry of Labour, Environment, or other regulatory charges. Expert defence. Free consultation.',
    keywords: 'regulatory offence defence ontario, ministry charge, compliance violation',
  },
  '/services/bail-hearings': {
    title: 'Bail Hearings | Release from Custody | London Ontario',
    description: 'Need bail hearing representation in London, Ontario? Get released from custody with proper conditions. Expert paralegal help. Call now.',
    keywords: 'bail hearing london, release from custody ontario, bail paralegal',
  },

  // Other Services
  '/services/notary-public': {
    title: 'Notary Public Services | Document Notarization | London Ontario',
    description: 'Notary public services in London, Ontario. Document notarization, certified copies, statutory declarations. Convenient appointments available.',
    keywords: 'notary public london ontario, notarize documents, certified copies',
  },
  '/services/commissioner-of-oaths': {
    title: 'Commissioner of Oaths | Affidavits | London Ontario',
    description: 'Commissioner of Oaths services in London, Ontario. Affidavits, statutory declarations, oaths and affirmations. Fast, affordable service.',
    keywords: 'commissioner of oaths london, affidavit signing, statutory declaration',
  },
  '/services/mediation': {
    title: 'Mediation Services | Dispute Resolution | London Ontario',
    description: 'Mediation services in London, Ontario. Resolve disputes without going to court. Landlord-tenant, contract, neighbour disputes. Free consultation.',
    keywords: 'mediation services london, dispute resolution ontario, mediator paralegal',
  },
  '/services/social-benefits-tribunal': {
    title: 'Social Benefits Tribunal | ODSP OW Appeals | London Ontario',
    description: 'Social Benefits Tribunal representation in Ontario. ODSP and Ontario Works appeals. Denied benefits? Expert representation. Free consultation.',
    keywords: 'social benefits tribunal ontario, ODSP appeal, Ontario Works appeal',
  },

  // Location Pages - Original
  '/london-paralegal': {
    title: 'Paralegal London Ontario | LegalAssist | Affordable Legal Services',
    description: 'Licensed paralegal services in London, Ontario. Traffic tickets, LTB, small claims, HRTO. Serving London and surrounding areas. Free consultation.',
    keywords: 'paralegal london ontario, legal services london, lawyer alternative london',
  },
  '/st-thomas-paralegal': {
    title: 'Paralegal St Thomas Ontario | LegalAssist | Elgin County Legal Services',
    description: 'Licensed paralegal serving St. Thomas and Elgin County, Ontario. Traffic tickets, LTB, small claims court. Free consultation available.',
    keywords: 'paralegal st thomas, legal services elgin county, st thomas lawyer alternative',
  },
  '/woodstock-paralegal': {
    title: 'Paralegal Woodstock Ontario | LegalAssist | Oxford County Legal Services',
    description: 'Licensed paralegal serving Woodstock and Oxford County, Ontario. Traffic tickets, landlord-tenant, small claims. Free consultation.',
    keywords: 'paralegal woodstock ontario, legal services oxford county, woodstock lawyer',
  },
  '/strathroy-chatham-paralegal': {
    title: 'Paralegal Strathroy & Chatham | LegalAssist | Middlesex-Lambton Legal',
    description: 'Licensed paralegal serving Strathroy, Chatham, and surrounding areas. Traffic tickets, LTB matters, small claims. Free consultation.',
    keywords: 'paralegal strathroy, paralegal chatham, middlesex county legal services',
  },
  '/ingersoll-paralegal': {
    title: 'Paralegal Ingersoll Ontario | LegalAssist | Oxford County Legal Services',
    description: 'Licensed paralegal serving Ingersoll and Oxford County. Traffic tickets, landlord-tenant, small claims court. Free consultation.',
    keywords: 'paralegal ingersoll ontario, legal services ingersoll, oxford county paralegal',
  },
  '/tillsonburg-paralegal': {
    title: 'Paralegal Tillsonburg Ontario | LegalAssist | Norfolk-Oxford Legal',
    description: 'Licensed paralegal serving Tillsonburg and surrounding areas. Traffic tickets, LTB, small claims court. Free consultation available.',
    keywords: 'paralegal tillsonburg, legal services norfolk county, tillsonburg lawyer',
  },
  '/aylmer-paralegal': {
    title: 'Paralegal Aylmer Ontario | LegalAssist | Elgin County Legal Services',
    description: 'Licensed paralegal serving Aylmer and East Elgin. Traffic tickets, landlord-tenant, small claims. Free consultation in Aylmer.',
    keywords: 'paralegal aylmer ontario, legal services east elgin, aylmer lawyer alternative',
  },

  // Location Pages - Step 7 Expansion
  '/locations/kitchener': {
    title: 'Paralegal Kitchener-Waterloo | LegalAssist | Region of Waterloo Legal',
    description: 'Licensed paralegal serving Kitchener, Waterloo, and Cambridge. Traffic tickets, LTB, small claims, HRTO. Free consultation.',
    keywords: 'paralegal kitchener, paralegal waterloo, kitchener lawyer alternative',
  },
  '/locations/cambridge': {
    title: 'Paralegal Cambridge Ontario | LegalAssist | Waterloo Region Legal',
    description: 'Licensed paralegal serving Cambridge, Preston, Hespeler, and Galt. Traffic tickets, landlord-tenant, small claims. Free consultation.',
    keywords: 'paralegal cambridge ontario, legal services cambridge, cambridge lawyer',
  },
  '/locations/windsor': {
    title: 'Paralegal Windsor Ontario | LegalAssist | Essex County Legal Services',
    description: 'Licensed paralegal serving Windsor and Essex County. Traffic tickets, LTB matters, small claims court, HRTO. Free consultation.',
    keywords: 'paralegal windsor ontario, legal services essex county, windsor lawyer',
  },
  '/locations/sarnia': {
    title: 'Paralegal Sarnia Ontario | LegalAssist | Lambton County Legal Services',
    description: 'Licensed paralegal serving Sarnia and Lambton County. Traffic tickets, landlord-tenant, small claims court. Free consultation.',
    keywords: 'paralegal sarnia, legal services lambton county, sarnia lawyer alternative',
  },
  '/locations/chatham-kent': {
    title: 'Paralegal Chatham-Kent | LegalAssist | Chatham Ontario Legal Services',
    description: 'Licensed paralegal serving Chatham-Kent municipality. Traffic tickets, LTB, small claims court. Free consultation available.',
    keywords: 'paralegal chatham kent, legal services chatham, chatham ontario lawyer',
  },
  '/locations/stratford': {
    title: 'Paralegal Stratford Ontario | LegalAssist | Perth County Legal Services',
    description: 'Licensed paralegal serving Stratford and Perth County. Traffic tickets, landlord-tenant, small claims. Free consultation.',
    keywords: 'paralegal stratford ontario, legal services perth county, stratford lawyer',
  },
  '/locations/guelph': {
    title: 'Paralegal Guelph Ontario | LegalAssist | Wellington County Legal',
    description: 'Licensed paralegal serving Guelph and Wellington County. Traffic tickets, LTB, small claims, HRTO. Free consultation.',
    keywords: 'paralegal guelph, legal services wellington county, guelph lawyer alternative',
  },
  '/locations/brantford': {
    title: 'Paralegal Brantford Ontario | LegalAssist | Brant County Legal Services',
    description: 'Licensed paralegal serving Brantford and Brant County. Traffic tickets, landlord-tenant, small claims. Free consultation.',
    keywords: 'paralegal brantford, legal services brant county, brantford lawyer',
  },
  '/locations/norfolk-county': {
    title: 'Paralegal Norfolk County | Simcoe Ontario | LegalAssist Legal Services',
    description: 'Licensed paralegal serving Norfolk County including Simcoe, Port Dover, Delhi. Traffic tickets, LTB, small claims. Free consultation.',
    keywords: 'paralegal simcoe ontario, paralegal norfolk county, port dover legal',
  },
  '/locations/leamington': {
    title: 'Paralegal Leamington Ontario | LegalAssist | Essex County South Legal',
    description: 'Licensed paralegal serving Leamington, Kingsville, and Essex County South. Traffic tickets, LTB, small claims. Free consultation.',
    keywords: 'paralegal leamington, legal services kingsville, leamington lawyer',
  },
  '/locations/huron-county': {
    title: 'Paralegal Huron County | Goderich Ontario | LegalAssist Legal Services',
    description: 'Licensed paralegal serving Huron County including Goderich, Clinton, Exeter. Traffic tickets, LTB, small claims. Free consultation.',
    keywords: 'paralegal goderich, paralegal huron county, clinton ontario legal',
  },

  // Guide Pages
  '/guides/how-to-fight-traffic-ticket': {
    title: 'How to Fight a Traffic Ticket in Ontario | Step by Step Guide',
    description: 'Complete guide to fighting a traffic ticket in Ontario. Your options, deadlines, what to expect at court, and when to hire a paralegal. Free information.',
    keywords: 'how to fight traffic ticket ontario, contest speeding ticket, traffic court guide',
  },
  '/guides/ontario-tenant-rights': {
    title: 'Ontario Tenant Rights Guide | Know Your Rights | LegalAssist',
    description: 'Complete guide to tenant rights in Ontario. Eviction protection, rent increases, repairs, and what your landlord cannot do. Free information.',
    keywords: 'tenant rights ontario, renter rights guide, landlord tenant act',
  },
  '/guides/ontario-landlord-rights': {
    title: 'Ontario Landlord Rights Guide | Know Your Rights | LegalAssist',
    description: 'Complete guide to landlord rights in Ontario. Eviction procedures, rent collection, property access, and legal remedies. Free information.',
    keywords: 'landlord rights ontario, eviction process guide, landlord tenant act',
  },
  '/guides/small-claims-court-process': {
    title: 'Small Claims Court Ontario | Complete Process Guide | LegalAssist',
    description: 'Complete guide to Small Claims Court in Ontario. How to sue, settlement conferences, trials, and what to expect. Free information.',
    keywords: 'small claims court guide ontario, how to sue someone, court process',
  },
  '/guides/paralegal-vs-lawyer': {
    title: 'Paralegal vs Lawyer | When to Use Each in Ontario | LegalAssist',
    description: 'Understand the difference between paralegals and lawyers in Ontario. When you need each, cost comparison, and what paralegals can handle.',
    keywords: 'paralegal vs lawyer ontario, when to hire paralegal, paralegal scope',
  },
  '/guides/what-is-a-paralegal': {
    title: 'What is a Paralegal in Ontario | Licensed Legal Professional',
    description: 'What paralegals do in Ontario, how they\'re licensed by the Law Society, and what matters they can handle. Free guide.',
    keywords: 'what is a paralegal ontario, licensed paralegal, paralegal services',
  },
  '/guides/ontario-employment-rights': {
    title: 'Ontario Employment Rights Guide | Know Your Rights at Work',
    description: 'Complete guide to employee rights in Ontario. Termination, severance, overtime, vacation pay, and what your employer must provide.',
    keywords: 'employment rights ontario, employee rights guide, termination rights',
  },
  '/guides/free-legal-resources': {
    title: 'Free Legal Resources Ontario | Government & Community Resources',
    description: 'Directory of free legal resources in Ontario. Government forms, tribunal websites, legal aid, and self-help tools.',
    keywords: 'free legal help ontario, legal aid resources, legal clinic',
  },
  '/guides/what-to-do-when-sued': {
    title: 'What to Do When You\'re Sued in Ontario | Defence Guide',
    description: 'Received a Small Claims Court claim? Don\'t panic. Step-by-step guide on your options, deadlines, and how to defend yourself.',
    keywords: 'sued in ontario, defendant guide, how to defend lawsuit',
  },
  '/guides/ltb-hearing-preparation': {
    title: 'LTB Hearing Preparation Guide | What to Expect | LegalAssist',
    description: 'Complete guide to preparing for an LTB hearing. What to bring, what to expect, and how to present your case effectively.',
    keywords: 'LTB hearing preparation, landlord tenant board hearing, what to expect',
  },
  '/guides/filing-human-rights-complaint': {
    title: 'How to File a Human Rights Complaint Ontario | HRTO Guide',
    description: 'Complete guide to filing a human rights complaint at the HRTO. Grounds, deadlines, process, and what to expect.',
    keywords: 'file human rights complaint ontario, HRTO application, discrimination complaint',
  },
  '/guides/legal-deadlines-ontario': {
    title: 'Important Legal Deadlines in Ontario | Don\'t Miss These',
    description: 'Critical legal deadlines in Ontario. Traffic tickets, Small Claims, LTB, human rights, and more. Missing deadlines can cost your case.',
    keywords: 'legal deadlines ontario, limitation period, filing deadline',
  },
};

// Helper function to get SEO config for a route
export function getSEOConfig(pathname: string): SEOConfig {
  // Try exact match first
  if (seoConfig[pathname]) {
    return seoConfig[pathname];
  }
  
  // Default fallback
  return {
    title: 'LegalAssist Paralegal Services | London Ontario',
    description: 'Licensed paralegal services in London, Ontario. Traffic tickets, landlord-tenant, small claims court, human rights tribunal. Free consultation.',
  };
}

// Helper to generate full title with branding
export function getFullTitle(pageTitle: string): string {
  if (pageTitle.includes('LegalAssist')) {
    return pageTitle;
  }
  return `${pageTitle} | LegalAssist`;
}
