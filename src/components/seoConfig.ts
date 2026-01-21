// Enhanced SEO Configuration with Schema.org Structured Data
// Adds per-page Service schemas, FAQ schemas, and breadcrumb data

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  schema?: PageSchema;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQ[];
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface PageSchema {
  type: 'Service' | 'LegalService' | 'Article' | 'FAQPage' | 'LocalBusiness';
  name?: string;
  serviceType?: string;
  areaServed?: string[];
  provider?: string;
}

// Base business info for all schemas
export const businessInfo = {
  name: 'LegalAssist Paralegal Services',
  url: 'https://legalassist.london',
  telephone: '+15196011110',
  email: 'info@legalassist.london',
  address: {
    streetAddress: 'P.O Box 1000',
    addressLocality: 'London',
    addressRegion: 'Ontario',
    postalCode: 'N6A 2L1',
    addressCountry: 'CA'
  },
  geo: {
    latitude: 42.9849,
    longitude: -81.2453
  },
  priceRange: '$$',
  openingHours: 'Mo-Fr 09:00-18:00'
};

export const seoConfig: Record<string, SEOConfig> = {
  // ============================================
  // CORE PAGES
  // ============================================
  '/': {
    title: 'LegalAssist Paralegal Services | London Ontario | Affordable Legal Help',
    description: 'Licensed paralegal services in London, Ontario. Traffic tickets, landlord-tenant disputes, small claims court, human rights tribunal. Free consultation. Call (519) 601-1110.',
    keywords: 'paralegal london ontario, legal services london, traffic ticket lawyer london, LTB paralegal, small claims court london',
    breadcrumbs: [
      { name: 'Home', url: '/' }
    ]
  },
  
  '/contact': {
    title: 'Contact Us | Free Consultation | LegalAssist London Ontario',
    description: 'Contact LegalAssist for a free consultation. Located in London, Ontario. Call (519) 601-1110 or book online. Traffic tickets, LTB, small claims court representation.',
    keywords: 'contact paralegal london, free legal consultation london ontario, book paralegal appointment',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Contact', url: '/contact' }
    ]
  },
  
  '/about': {
    title: 'About LegalAssist | Licensed Paralegal Services | London Ontario',
    description: 'Learn about LegalAssist Paralegal Services. Licensed by the Law Society of Ontario. Serving London and Southwestern Ontario with affordable legal representation since 2015.',
    keywords: 'about legalassist, licensed paralegal ontario, LSO paralegal london',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'About', url: '/about' }
    ]
  },
  
  '/services': {
    title: 'Legal Services | Traffic Tickets, LTB, Small Claims | LegalAssist',
    description: 'Full range of paralegal services: traffic ticket defence, landlord-tenant board, small claims court, human rights tribunal, employment issues. London, Ontario.',
    keywords: 'paralegal services london, legal services ontario, affordable legal help',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' }
    ]
  },

  // ============================================
  // TRAFFIC TICKETS - MAIN
  // ============================================
  '/services/traffic-tickets': {
    title: 'Traffic Ticket Defence | Fight Your Ticket | London Ontario Paralegal',
    description: 'Fight your traffic ticket in London, Ontario. Speeding, careless driving, stunt driving, red lights. Protect your licence and insurance rates. Free consultation.',
    keywords: 'traffic ticket lawyer london, fight speeding ticket ontario, traffic court paralegal, demerit points defence',
    schema: {
      type: 'LegalService',
      name: 'Traffic Ticket Defence Services',
      serviceType: 'Traffic Ticket Legal Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario'],
      provider: 'LegalAssist Paralegal Services'
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Traffic Tickets', url: '/services/traffic-tickets' }
    ],
    faqs: [
      {
        question: 'How much does it cost to fight a traffic ticket?',
        answer: 'Our traffic ticket defence fees typically range from $300-$800 depending on the charge. This is often less than the insurance increase you would face from a conviction. We offer free consultations to discuss your specific case.'
      },
      {
        question: 'Should I just pay my traffic ticket?',
        answer: 'Paying a traffic ticket is an admission of guilt that goes on your driving record for 3 years. This can increase your insurance by 15-25% and add demerit points. Fighting the ticket often results in reduced charges or dismissal.'
      },
      {
        question: 'Do I have to go to court for my traffic ticket?',
        answer: 'No. When you hire us, we appear in court on your behalf. You do not need to take time off work or deal with the stress of traffic court.'
      }
    ]
  },

  // ============================================
  // TRAFFIC TICKETS - SUB-PAGES
  // ============================================
  '/services/speeding-ticket-defence': {
    title: 'Speeding Ticket Defence | Fight Your Speeding Ticket | London Ontario',
    description: 'Fight your speeding ticket in London, Ontario. Reduce fines, avoid demerit points, protect your insurance. Experienced paralegal representation. Free consultation.',
    keywords: 'speeding ticket london, fight speeding ticket ontario, speeding fine defence, radar ticket defence',
    schema: {
      type: 'LegalService',
      name: 'Speeding Ticket Defence',
      serviceType: 'Speeding Ticket Legal Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario'],
      provider: 'LegalAssist Paralegal Services'
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Traffic Tickets', url: '/services/traffic-tickets' },
      { name: 'Speeding Ticket Defence', url: '/services/speeding-ticket-defence' }
    ],
    faqs: [
      {
        question: 'How many demerit points is a speeding ticket in Ontario?',
        answer: 'Speeding tickets carry 0-6 demerit points depending on speed: 1-15 km/h over = 0 points, 16-29 km/h over = 3 points, 30-49 km/h over = 4 points, 50+ km/h over = 6 points plus stunt driving charges.'
      },
      {
        question: 'Can a speeding ticket be dismissed?',
        answer: 'Yes, speeding tickets can be dismissed for various reasons including improper radar calibration, procedural errors by the officer, or insufficient evidence. We review all evidence to identify the best defence strategy.'
      },
      {
        question: 'How much will my insurance go up for a speeding ticket?',
        answer: 'A speeding conviction typically increases auto insurance by 15-25% for 3 years. For someone paying $200/month, that could be $1,080-$1,800 in extra premiums over 3 years.'
      }
    ]
  },

  '/services/careless-driving-defence': {
    title: 'Careless Driving Defence | 6 Demerit Points | London Ontario Paralegal',
    description: 'Careless driving charge in London, Ontario? 6 demerit points and up to $2,000 fine at stake. Expert defence to protect your licence. Free consultation.',
    keywords: 'careless driving defence london, careless driving ticket ontario, 6 demerit points, HTA 130',
    schema: {
      type: 'LegalService',
      name: 'Careless Driving Defence',
      serviceType: 'Careless Driving Legal Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Traffic Tickets', url: '/services/traffic-tickets' },
      { name: 'Careless Driving Defence', url: '/services/careless-driving-defence' }
    ],
    faqs: [
      {
        question: 'What is the penalty for careless driving in Ontario?',
        answer: 'Careless driving carries 6 demerit points, fines from $400-$2,000, possible licence suspension up to 2 years, and potential jail time up to 6 months. It also causes major insurance increases.'
      },
      {
        question: 'Can careless driving be reduced to a lesser charge?',
        answer: 'Yes, we often negotiate careless driving charges down to lesser offences like following too closely or improper lane change, which carry fewer points and lower insurance impact.'
      }
    ]
  },

  '/services/stunt-driving-defence': {
    title: 'Stunt Driving Defence | 50 Over | London Ontario Paralegal',
    description: 'Charged with stunt driving in Ontario? 50+ over the limit carries licence suspension and vehicle impound. Aggressive defence strategy. Free consultation.',
    keywords: 'stunt driving defence london, 50 over speed limit ontario, racing ticket defence, street racing charge',
    schema: {
      type: 'LegalService',
      name: 'Stunt Driving Defence',
      serviceType: 'Stunt Driving Legal Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Traffic Tickets', url: '/services/traffic-tickets' },
      { name: 'Stunt Driving Defence', url: '/services/stunt-driving-defence' }
    ],
    faqs: [
      {
        question: 'What happens if you get caught stunt driving in Ontario?',
        answer: 'Stunt driving results in immediate 14-day licence suspension, 14-day vehicle impound, 6 demerit points, fines from $2,000-$10,000, possible licence suspension up to 2 years, and potential jail time.'
      },
      {
        question: 'Is 50 over always stunt driving?',
        answer: 'Going 50+ km/h over the speed limit is automatically considered stunt driving in Ontario. On roads with limits under 80 km/h, going 40+ over can also be charged as stunt driving.'
      }
    ]
  },

  '/services/distracted-driving': {
    title: 'Distracted Driving Defence | Cell Phone Ticket | London Ontario',
    description: 'Fight your distracted driving ticket in London, Ontario. Cell phone use while driving carries heavy fines and points. Expert defence. Free consultation.',
    keywords: 'distracted driving ticket london, cell phone ticket defence ontario, texting while driving fine',
    schema: {
      type: 'LegalService',
      name: 'Distracted Driving Defence',
      serviceType: 'Distracted Driving Legal Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Traffic Tickets', url: '/services/traffic-tickets' },
      { name: 'Distracted Driving', url: '/services/distracted-driving' }
    ],
    faqs: [
      {
        question: 'What is the fine for using a cell phone while driving in Ontario?',
        answer: 'First offence: $615-$1,000 fine and 3 demerit points. Second offence: $615-$2,000 and 6 points. Third offence: $615-$3,000, 6 points, and possible licence suspension.'
      },
      {
        question: 'Can I fight a distracted driving ticket?',
        answer: 'Yes. Common defences include proving you were parked, using the phone for 911, the device was hands-free, or challenging the officer\'s observations. We review all evidence for the best defence.'
      }
    ]
  },

  '/services/red-light-tickets': {
    title: 'Red Light Ticket Defence | Run Red Light | London Ontario Paralegal',
    description: 'Fight your red light ticket in London, Ontario. Camera tickets and officer-issued tickets. Protect your driving record. Free consultation.',
    keywords: 'red light ticket defence london, run red light ontario, red light camera ticket, intersection violation',
    schema: {
      type: 'LegalService',
      name: 'Red Light Ticket Defence',
      serviceType: 'Red Light Violation Legal Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Traffic Tickets', url: '/services/traffic-tickets' },
      { name: 'Red Light Tickets', url: '/services/red-light-tickets' }
    ],
    faqs: [
      {
        question: 'Do red light camera tickets affect insurance?',
        answer: 'Red light camera tickets in Ontario do not carry demerit points and typically do not affect insurance as they are issued to the vehicle owner, not the driver. However, officer-issued red light tickets do carry 3 demerit points.'
      },
      {
        question: 'How do I fight a red light camera ticket?',
        answer: 'You can request a trial and challenge the evidence. Common defences include proving the yellow light timing was too short, the camera malfunctioned, or you entered legally but couldn\'t safely stop.'
      }
    ]
  },

  '/services/no-insurance-defence': {
    title: 'No Insurance Defence | Drive Without Insurance | London Ontario',
    description: 'Charged with driving without insurance in Ontario? $5,000-$25,000 fine at stake. Expert defence strategies. Free consultation in London.',
    keywords: 'no insurance ticket ontario, driving without insurance defence london, compulsory automobile insurance act',
    schema: {
      type: 'LegalService',
      name: 'No Insurance Defence',
      serviceType: 'Insurance Violation Legal Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Traffic Tickets', url: '/services/traffic-tickets' },
      { name: 'No Insurance Defence', url: '/services/no-insurance-defence' }
    ],
    faqs: [
      {
        question: 'What is the penalty for driving without insurance in Ontario?',
        answer: 'First offence: $5,000-$25,000 fine, licence suspension, and vehicle impoundment. Second offence: $10,000-$50,000 fine, up to 1 year in jail, and licence suspension up to 1 year.'
      },
      {
        question: 'Can I get a no insurance charge dropped?',
        answer: 'Yes, if you can prove you had valid insurance at the time of the offence (such as a lapsed policy that was reinstated or pink slip you couldn\'t produce), the charge may be withdrawn.'
      }
    ]
  },

  // ============================================
  // LANDLORD TENANT - MAIN
  // ============================================
  '/services/landlord-tenant': {
    title: 'Landlord Tenant Board | LTB Representation | London Ontario Paralegal',
    description: 'LTB representation for landlords and tenants in London, Ontario. Evictions, rent disputes, maintenance issues, N12/N13 notices. Free consultation.',
    keywords: 'landlord tenant board london, LTB paralegal, eviction defence ontario, tenant rights london',
    schema: {
      type: 'LegalService',
      name: 'Landlord Tenant Board Services',
      serviceType: 'LTB Legal Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Landlord Tenant Board', url: '/services/landlord-tenant' }
    ],
    faqs: [
      {
        question: 'How long does an LTB eviction take in Ontario?',
        answer: 'LTB eviction timelines vary. Non-payment of rent cases typically take 2-4 months. N12 (personal use) evictions take 3-6 months. Complex cases can take longer depending on hearing availability and appeals.'
      },
      {
        question: 'Can a paralegal represent me at the LTB?',
        answer: 'Yes, licensed paralegals can represent landlords and tenants at the Landlord and Tenant Board. We handle all types of LTB applications, hearings, and appeals.'
      }
    ]
  },

  '/services/eviction-non-payment': {
    title: 'Eviction for Non-Payment of Rent | L1 Application | London Ontario',
    description: 'Landlord eviction for non-payment of rent in London, Ontario. L1 applications, N4 notices, LTB hearings. Fast, affordable representation.',
    keywords: 'eviction non payment rent london, L1 application ontario, N4 notice landlord, rent arrears eviction',
    schema: {
      type: 'LegalService',
      name: 'Non-Payment Eviction Services',
      serviceType: 'Eviction Legal Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Landlord Tenant Board', url: '/services/landlord-tenant' },
      { name: 'Eviction - Non-Payment', url: '/services/eviction-non-payment' }
    ],
    faqs: [
      {
        question: 'How do I evict a tenant for not paying rent in Ontario?',
        answer: 'Step 1: Serve N4 notice when rent is overdue. Step 2: Wait 14 days. Step 3: File L1 application with LTB. Step 4: Attend hearing. Step 5: If successful, enforce eviction order through Sheriff.'
      },
      {
        question: 'Can a tenant stop an eviction by paying rent?',
        answer: 'Yes, tenants can void an N4 notice by paying all rent owed within 14 days. Even after an L1 is filed, tenants can request to pay and preserve the tenancy at the hearing.'
      }
    ]
  },

  // ============================================
  // SMALL CLAIMS - MAIN
  // ============================================
  '/services/small-claims': {
    title: 'Small Claims Court | Sue or Defend Up to $35,000 | London Ontario',
    description: 'Small Claims Court representation in London, Ontario. Debt collection, contract disputes, property damage claims. Claims up to $35,000. Free consultation.',
    keywords: 'small claims court london, sue someone ontario, debt collection paralegal, contract dispute lawyer',
    schema: {
      type: 'LegalService',
      name: 'Small Claims Court Services',
      serviceType: 'Small Claims Court Legal Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Small Claims Court', url: '/services/small-claims' }
    ],
    faqs: [
      {
        question: 'What is the limit for Small Claims Court in Ontario?',
        answer: 'The monetary limit for Small Claims Court in Ontario is $35,000, not including interest and costs. Claims over $35,000 must be filed in Superior Court.'
      },
      {
        question: 'How much does it cost to sue in Small Claims Court?',
        answer: 'Court filing fees are $102 for claims under $500 and $273 for claims over $500. Legal representation fees vary. We offer competitive flat-rate packages starting at $750.'
      },
      {
        question: 'How long does Small Claims Court take?',
        answer: 'Simple cases settle within 3-6 months. Contested cases going to trial typically take 6-12 months. We work to resolve cases as quickly as possible through negotiation when appropriate.'
      }
    ]
  },

  // ============================================
  // HUMAN RIGHTS - MAIN
  // ============================================
  '/services/human-rights': {
    title: 'Human Rights Tribunal | HRTO Representation | London Ontario',
    description: 'Human Rights Tribunal of Ontario representation. Workplace discrimination, housing discrimination, disability accommodation. Free consultation in London.',
    keywords: 'human rights tribunal ontario, HRTO paralegal, discrimination lawyer london, workplace discrimination',
    schema: {
      type: 'LegalService',
      name: 'Human Rights Tribunal Services',
      serviceType: 'HRTO Legal Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Human Rights Tribunal', url: '/services/human-rights' }
    ],
    faqs: [
      {
        question: 'How long do I have to file a human rights complaint?',
        answer: 'You must file an HRTO application within 1 year of the alleged discrimination. In exceptional circumstances, late applications may be accepted, but it is best to file promptly.'
      },
      {
        question: 'What compensation can I get from HRTO?',
        answer: 'HRTO can award monetary compensation for lost wages, injury to dignity, and expenses. Awards for injury to dignity typically range from $5,000-$35,000 depending on severity.'
      }
    ]
  },

  // ============================================
  // LOCATION PAGES
  // ============================================
  '/london-paralegal': {
    title: 'Paralegal London Ontario | LegalAssist | Affordable Legal Services',
    description: 'Licensed paralegal services in London, Ontario. Traffic tickets, LTB, small claims, HRTO. Serving London and surrounding areas. Free consultation. Call (519) 601-1110.',
    keywords: 'paralegal london ontario, lawyer london ontario, legal services london, affordable paralegal london',
    schema: {
      type: 'LocalBusiness',
      name: 'LegalAssist Paralegal Services - London',
      areaServed: ['London', 'Middlesex County']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'London Paralegal', url: '/london-paralegal' }
    ]
  },

  '/st-thomas-paralegal': {
    title: 'Paralegal St Thomas Ontario | LegalAssist | Elgin County Legal Services',
    description: 'Licensed paralegal serving St. Thomas and Elgin County, Ontario. Traffic tickets, LTB, small claims court. Free consultation available. Call (519) 601-1110.',
    keywords: 'paralegal st thomas, lawyer st thomas ontario, legal services elgin county',
    schema: {
      type: 'LocalBusiness',
      name: 'LegalAssist Paralegal Services - St. Thomas',
      areaServed: ['St. Thomas', 'Elgin County']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'St. Thomas Paralegal', url: '/st-thomas-paralegal' }
    ]
  },

  '/woodstock-paralegal': {
    title: 'Paralegal Woodstock Ontario | LegalAssist | Oxford County Legal Services',
    description: 'Licensed paralegal serving Woodstock and Oxford County, Ontario. Traffic tickets, landlord-tenant, small claims. Free consultation. Call (519) 601-1110.',
    keywords: 'paralegal woodstock ontario, lawyer woodstock, legal services oxford county',
    schema: {
      type: 'LocalBusiness',
      name: 'LegalAssist Paralegal Services - Woodstock',
      areaServed: ['Woodstock', 'Oxford County']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Woodstock Paralegal', url: '/woodstock-paralegal' }
    ]
  },

  '/locations/kitchener': {
    title: 'Paralegal Kitchener-Waterloo | LegalAssist | Region of Waterloo Legal',
    description: 'Licensed paralegal serving Kitchener, Waterloo, and Cambridge. Traffic tickets, LTB, small claims, HRTO. Free consultation. Call (519) 601-1110.',
    keywords: 'paralegal kitchener, lawyer waterloo ontario, legal services cambridge, region of waterloo paralegal',
    schema: {
      type: 'LocalBusiness',
      name: 'LegalAssist Paralegal Services - Kitchener-Waterloo',
      areaServed: ['Kitchener', 'Waterloo', 'Cambridge', 'Region of Waterloo']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Locations', url: '/services' },
      { name: 'Kitchener', url: '/locations/kitchener' }
    ]
  },

  '/locations/windsor': {
    title: 'Paralegal Windsor Ontario | LegalAssist | Essex County Legal Services',
    description: 'Licensed paralegal serving Windsor and Essex County. Traffic tickets, LTB matters, small claims court, HRTO. Free consultation. Call (519) 601-1110.',
    keywords: 'paralegal windsor ontario, lawyer windsor, legal services essex county',
    schema: {
      type: 'LocalBusiness',
      name: 'LegalAssist Paralegal Services - Windsor',
      areaServed: ['Windsor', 'Essex County', 'Leamington', 'Tecumseh']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Locations', url: '/services' },
      { name: 'Windsor', url: '/locations/windsor' }
    ]
  },

  // ============================================
  // GUIDE PAGES
  // ============================================
  '/guides/how-to-fight-traffic-ticket': {
    title: 'How to Fight a Traffic Ticket in Ontario | Step by Step Guide',
    description: 'Complete guide to fighting a traffic ticket in Ontario. Your options, deadlines, what to expect at court, and when to hire a paralegal. Free information.',
    keywords: 'how to fight traffic ticket ontario, contest speeding ticket, traffic court guide',
    schema: {
      type: 'Article',
      name: 'How to Fight a Traffic Ticket in Ontario'
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Guides', url: '/guides' },
      { name: 'How to Fight a Traffic Ticket', url: '/guides/how-to-fight-traffic-ticket' }
    ],
    faqs: [
      {
        question: 'What are my options when I get a traffic ticket?',
        answer: 'You have three options: 1) Pay the fine (plead guilty), 2) Request a meeting with the prosecutor to negotiate, 3) Request a trial to fight the ticket. Option 2 or 3 give you the best chance of reducing or eliminating consequences.'
      },
      {
        question: 'How long do I have to respond to a traffic ticket?',
        answer: 'You have 15 days from the date on the ticket to respond. If you miss this deadline, you will be deemed to not wish to dispute the charge and a conviction will be registered.'
      }
    ]
  },

  '/guides/ontario-tenant-rights': {
    title: 'Ontario Tenant Rights Guide | Know Your Rights | LegalAssist',
    description: 'Complete guide to tenant rights in Ontario. Eviction protection, rent increases, repairs, and what your landlord cannot do. Free information.',
    keywords: 'tenant rights ontario, renter rights, landlord obligations ontario, RTA guide',
    schema: {
      type: 'Article',
      name: 'Ontario Tenant Rights Guide'
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Guides', url: '/guides' },
      { name: 'Ontario Tenant Rights', url: '/guides/ontario-tenant-rights' }
    ],
    faqs: [
      {
        question: 'Can my landlord evict me without reason in Ontario?',
        answer: 'No. In Ontario, landlords can only evict tenants for specific reasons under the Residential Tenancies Act, such as non-payment of rent, causing damage, illegal activity, or the landlord requiring the unit for personal use.'
      },
      {
        question: 'How much can my landlord raise rent each year?',
        answer: 'For most units, landlords can only increase rent once per year by the provincial rent increase guideline (2.5% in 2024). Units first occupied after November 15, 2018 are exempt from rent control.'
      }
    ]
  },

  '/guides/ontario-landlord-rights': {
    title: 'Ontario Landlord Rights Guide | Know Your Rights | LegalAssist',
    description: 'Complete guide to landlord rights in Ontario. Eviction procedures, rent collection, property access, and legal remedies. Free information.',
    keywords: 'landlord rights ontario, eviction process ontario, rent collection, property management law',
    schema: {
      type: 'Article',
      name: 'Ontario Landlord Rights Guide'
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Guides', url: '/guides' },
      { name: 'Ontario Landlord Rights', url: '/guides/ontario-landlord-rights' }
    ]
  },

  '/guides/paralegal-vs-lawyer': {
    title: 'Paralegal vs Lawyer | When to Use Each in Ontario | LegalAssist',
    description: 'Understand the difference between paralegals and lawyers in Ontario. When you need each, cost comparison, and what paralegals can handle.',
    keywords: 'paralegal vs lawyer ontario, when to use paralegal, paralegal scope of practice',
    schema: {
      type: 'Article',
      name: 'Paralegal vs Lawyer: When to Use Each in Ontario'
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Guides', url: '/guides' },
      { name: 'Paralegal vs Lawyer', url: '/guides/paralegal-vs-lawyer' }
    ],
    faqs: [
      {
        question: 'What can a paralegal do that a lawyer cannot?',
        answer: 'Paralegals and lawyers have different scopes of practice. Paralegals typically charge less for the same services within their scope. There is nothing a paralegal can do that a lawyer cannot, but paralegals offer more affordable access to justice for permitted matters.'
      },
      {
        question: 'When should I hire a lawyer instead of a paralegal?',
        answer: 'You need a lawyer for: criminal indictable offences, family law matters, real estate transactions, wills and estates, and civil claims over $35,000. For traffic tickets, LTB, Small Claims Court, and HRTO, a paralegal is often the more cost-effective choice.'
      }
    ]
  }
};

// Helper function to get SEO config with fallback
export function getSEOConfig(pathname: string): SEOConfig {
  // Normalize pathname
  const normalizedPath = pathname.endsWith('/') && pathname !== '/' 
    ? pathname.slice(0, -1) 
    : pathname;
  
  // Return config or default
  return seoConfig[normalizedPath] || {
    title: 'LegalAssist Paralegal Services | London Ontario',
    description: 'Licensed paralegal services in London, Ontario. Traffic tickets, landlord-tenant disputes, small claims court. Free consultation.',
    keywords: 'paralegal london ontario, legal services',
    breadcrumbs: [
      { name: 'Home', url: '/' }
    ]
  };
}

// Generate JSON-LD for Service schema
export function generateServiceSchema(config: SEOConfig, url: string): object | null {
  if (!config.schema || (config.schema.type !== 'Service' && config.schema.type !== 'LegalService')) {
    return null;
  }
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    'name': config.schema.name || config.title,
    'description': config.description,
    'url': url,
    'serviceType': config.schema.serviceType,
    'provider': {
      '@type': 'LegalService',
      'name': businessInfo.name,
      'url': businessInfo.url,
      'telephone': businessInfo.telephone,
      'address': {
        '@type': 'PostalAddress',
        ...businessInfo.address
      }
    },
    'areaServed': config.schema.areaServed?.map(area => ({
      '@type': 'City',
      'name': area
    }))
  };
}

// Generate JSON-LD for FAQ schema
export function generateFAQSchema(faqs: FAQ[]): object | null {
  if (!faqs || faqs.length === 0) {
    return null;
  }
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}

// Generate JSON-LD for Breadcrumb schema
export function generateBreadcrumbSchema(breadcrumbs: BreadcrumbItem[], baseUrl: string): object | null {
  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null;
  }
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `${baseUrl}${item.url}`
    }))
  };
}

