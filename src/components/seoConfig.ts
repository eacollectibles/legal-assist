// Enhanced SEO Configuration with Schema.org Structured Data
// Complete configuration for all 143 pages with FAQs
// Generated: January 21, 2026

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
  telephone: '+13658829515',
  telephoneDisplay: '365-882-9515',
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
  // CORE PAGES (6 pages)
  // ============================================
  '/': {
    title: 'LegalAssist Paralegal Services | London Ontario | Affordable Legal Help',
    description: 'Licensed paralegal services in London, Ontario. Traffic tickets, landlord-tenant disputes, small claims court, human rights tribunal. Free consultation. Call (519) 601-1110.',
    keywords: 'paralegal london ontario, legal services london, traffic ticket lawyer london, LTB paralegal, small claims court london',
    schema: {
      type: 'LocalBusiness',
      name: 'LegalAssist Paralegal Services',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' }
    ],
    faqs: [
      {
        question: 'What services does LegalAssist offer?',
        answer: 'LegalAssist provides licensed paralegal services including traffic ticket defence, landlord-tenant board representation, small claims court litigation, human rights tribunal applications, employment disputes, and provincial offences defence throughout Southwestern Ontario.'
      },
      {
        question: 'How much does a paralegal cost in London, Ontario?',
        answer: 'Our fees vary by service type. Traffic tickets start at $300, LTB matters from $500, and Small Claims Court from $750. We offer free consultations and transparent flat-rate pricing with no hidden fees.'
      },
      {
        question: 'Do you offer free consultations?',
        answer: 'Yes, we offer free initial consultations for all services. Call (519) 601-1110 or book online to discuss your case with a licensed paralegal at no obligation.'
      }
    ]
  },

  '/contact': {
    title: 'Contact Us | Free Consultation | LegalAssist London Ontario',
    description: 'Contact LegalAssist for a free consultation. Located in London, Ontario. Call (519) 601-1110 or book online. Traffic tickets, LTB, small claims court representation.',
    keywords: 'contact paralegal london, free legal consultation london ontario, book paralegal appointment',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Contact', url: '/contact' }
    ],
    faqs: [
      {
        question: 'What are your office hours?',
        answer: 'Our office is open Monday to Friday, 9:00 AM to 6:00 PM. We also offer evening and weekend appointments by request for clients who cannot meet during regular business hours.'
      },
      {
        question: 'How quickly will you respond to my inquiry?',
        answer: 'We typically respond to all inquiries within 24 hours on business days. For urgent matters, please call us directly at (519) 601-1110.'
      }
    ,
      {
        question: 'Do you offer payment plans?',
        answer: 'Yes, we offer flexible payment arrangements for most services. We understand legal issues arise unexpectedly. Contact us to discuss options that fit your budget.'
      },
      {
        question: 'Can I meet with you virtually?',
        answer: 'Yes, we offer virtual consultations via video call. Many clients prefer this. In-person meetings are also available by appointment.'
      }
    ]
  },

  '/about': {
    title: 'About LegalAssist | Licensed Paralegal Services | London Ontario',
    description: 'Learn about LegalAssist Paralegal Services. Licensed by the Law Society of Ontario. Serving London and Southwestern Ontario with affordable legal representation.',
    keywords: 'about legalassist, licensed paralegal ontario, LSO paralegal london, paralegal credentials',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'About', url: '/about' }
    ],
    faqs: [
      {
        question: 'Is LegalAssist licensed by the Law Society of Ontario?',
        answer: 'Yes, LegalAssist Paralegal Services is fully licensed and regulated by the Law Society of Ontario (LSO). All our paralegals maintain good standing with the LSO and carry professional liability insurance.'
      },
      {
        question: 'What areas do you serve?',
        answer: 'We serve London and all of Southwestern Ontario including St. Thomas, Woodstock, Kitchener-Waterloo, Windsor, Sarnia, Stratford, Guelph, Brantford, and surrounding communities.'
      }
    ,
      {
        question: 'Are you licensed by the Law Society of Ontario?',
        answer: 'Yes, LegalAssist Paralegal Services is fully licensed and regulated by the Law Society of Ontario. We maintain professional liability insurance and follow all LSO rules of professional conduct.'
      },
      {
        question: 'How long have you been in practice?',
        answer: 'We have been serving Southwestern Ontario with professional paralegal services for several years. Our team stays current through continuing professional development.'
      }
    ]
  },

  '/services': {
    title: 'Legal Services | Traffic Tickets, LTB, Small Claims | LegalAssist',
    description: 'Full range of paralegal services: traffic ticket defence, landlord-tenant board, small claims court, human rights tribunal, employment issues. London, Ontario.',
    keywords: 'paralegal services london, legal services ontario, affordable legal help, licensed paralegal',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' }
    ],
    faqs: [
      {
        question: 'What types of cases can a paralegal handle in Ontario?',
        answer: 'In Ontario, licensed paralegals can handle: Small Claims Court matters up to $50,000, Landlord and Tenant Board disputes, traffic tickets and provincial offences, minor criminal matters (summary convictions), Human Rights Tribunal applications, and various administrative tribunals.'
      },
      {
        question: 'Do I need a lawyer or a paralegal for my case?',
        answer: 'For traffic tickets, LTB matters, Small Claims Court under $50,000, and HRTO applications, a paralegal can provide the same representation as a lawyer at a lower cost. You need a lawyer for criminal indictable offences, family law, real estate, and claims over $50,000.'
      }
    ,
      {
        question: 'How do I know if I need a paralegal or a lawyer?',
        answer: 'Paralegals handle Small Claims Court (up to $50,000), LTB, traffic tickets, provincial offences, human rights tribunal, and minor criminal matters. For criminal charges, family law, real estate, or claims over $50,000, you need a lawyer.'
      },
      {
        question: 'Do you offer free consultations?',
        answer: 'Yes, we offer free initial consultations for all practice areas. This allows us to assess your situation, explain your options, and provide a clear quote with no obligation.'
      }
    ]
  },

  // ... keep existing code (signup and login removed - private routes) ...

  // ============================================
  // TRAFFIC TICKETS - MAIN & SUB-PAGES (18 pages)
  // ============================================
  '/services/traffic-tickets': {
    title: 'Traffic Ticket Defence | Fight Your Ticket | London Ontario Paralegal',
    description: 'Fight your traffic ticket in London, Ontario. Speeding, careless driving, stunt driving, red lights. Protect your licence and insurance rates. Free consultation.',
    keywords: 'traffic ticket lawyer london, fight speeding ticket ontario, traffic court paralegal, demerit points defence',
    schema: {
      type: 'LegalService',
      name: 'Traffic Ticket Defence Services',
      serviceType: 'Traffic Ticket Legal Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
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
        answer: 'No. When you hire us, we appear in court on your behalf. You do not need to take time off work or deal with the stress of traffic court. We handle everything from start to finish.'
      }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  '/services/speeding-ticket-defence': {
    title: 'Speeding Ticket Defence | Fight Your Speeding Ticket | London Ontario',
    description: 'Fight your speeding ticket in London, Ontario. Reduce fines, avoid demerit points, protect your insurance. Experienced paralegal representation. Free consultation.',
    keywords: 'speeding ticket london, fight speeding ticket ontario, speeding fine defence, radar ticket defence',
    schema: {
      type: 'LegalService',
      name: 'Speeding Ticket Defence',
      serviceType: 'Speeding Ticket Legal Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
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
        answer: 'Speeding tickets carry 0-6 demerit points depending on speed: 1-15 km/h over = 0 points, 16-29 km/h over = 3 points, 30-49 km/h over = 4 points, 50+ km/h over = 6 points plus possible stunt driving charges.'
      },
      {
        question: 'Can a speeding ticket be dismissed?',
        answer: 'Yes, speeding tickets can be dismissed for various reasons including improper radar calibration, procedural errors by the officer, insufficient evidence, or issues with the certificate of offence. We review all evidence to identify the best defence strategy.'
      },
      {
        question: 'How much will my insurance go up for a speeding ticket?',
        answer: 'A speeding conviction typically increases auto insurance by 15-25% for 3 years. For someone paying $200/month, that could be $1,080-$1,800 in extra premiums over 3 years - far more than the cost of fighting the ticket.'
      }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
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
        answer: 'Careless driving carries 6 demerit points, fines from $400-$2,000, possible licence suspension up to 2 years, and potential jail time up to 6 months. It also causes significant insurance increases that can last for years.'
      },
      {
        question: 'Can careless driving be reduced to a lesser charge?',
        answer: 'Yes, we often negotiate careless driving charges down to lesser offences like following too closely (4 points) or improper lane change (2 points), which carry fewer demerit points and much lower insurance impact.'
      },
      {
        question: 'What is considered careless driving in Ontario?',
        answer: 'Careless driving under HTA Section 130 is driving without due care and attention or without reasonable consideration for others. It includes distracted driving causing an accident, running stop signs, unsafe lane changes, and following too closely that leads to a collision.'
      }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  '/services/stunt-driving-defence': {
    title: 'Stunt Driving Defence | 50 Over | London Ontario Paralegal',
    description: 'Charged with stunt driving in Ontario? 50+ over the limit carries immediate licence suspension and vehicle impound. Aggressive defence strategy. Free consultation.',
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
        answer: 'Stunt driving results in immediate 30-day licence suspension, 14-day vehicle impound, 6 demerit points, fines from $2,000-$10,000, possible licence suspension up to 2 years on conviction, and potential jail time up to 6 months.'
      },
      {
        question: 'Is 50 over always stunt driving?',
        answer: 'Going 50+ km/h over the speed limit is automatically considered stunt driving in Ontario. On roads with limits under 80 km/h, going 40+ over can also be charged as stunt driving. The threshold was recently lowered from 50 to 40 in some zones.'
      },
      {
        question: 'Can stunt driving charges be reduced?',
        answer: 'Yes, with proper defence, stunt driving charges can sometimes be reduced to regular speeding or other lesser offences. The key is challenging the speed measurement, officer observations, and procedural compliance. We have successfully defended many stunt driving cases.'
      }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
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
        answer: 'First offence: $615-$1,000 fine, 3 demerit points, and 3-day licence suspension. Second offence: $615-$2,000, 6 points, and 7-day suspension. Third offence: $615-$3,000, 6 points, and 30-day suspension.'
      },
      {
        question: 'Can I fight a distracted driving ticket?',
        answer: 'Yes. Common defences include proving you were legally parked, using the phone for a 911 emergency call, the device was in hands-free mode, or challenging the officer\'s observations and ability to clearly see the device.'
      },
      {
        question: 'Does holding a phone count as distracted driving even if not using it?',
        answer: 'Yes, simply holding a cell phone or other electronic device while driving is enough for a distracted driving charge in Ontario, even if you were not actively using it. The device must be mounted or completely put away.'
      }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
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
        question: 'Do red light camera tickets affect insurance in Ontario?',
        answer: 'Red light camera tickets do not carry demerit points and typically do not affect insurance because they are issued to the vehicle owner, not the driver. However, officer-issued red light tickets carry 3 demerit points and will affect insurance.'
      },
      {
        question: 'How do I fight a red light camera ticket?',
        answer: 'You can request a trial and challenge the evidence. Common defences include proving the yellow light timing was inadequate, the camera malfunctioned, you entered the intersection legally but couldn\'t safely stop, or emergency circumstances required you to proceed.'
      },
      {
        question: 'What is the fine for running a red light in Ontario?',
        answer: 'Red light camera tickets are a set fine of $325. Officer-issued red light tickets range from $260-$500 plus 3 demerit points. The insurance impact of an officer-issued ticket far exceeds the fine itself.'
      }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  '/services/no-insurance-defence': {
    title: 'No Insurance Defence | Drive Without Insurance | London Ontario',
    description: 'Charged with driving without insurance in Ontario? $5,000-$25,000 fine at stake. Expert defence strategies available. Free consultation in London.',
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
        answer: 'First offence: $5,000-$25,000 fine, licence suspension, and vehicle impoundment. Second offence: $10,000-$50,000 fine, possible jail time up to 1 year, and licence suspension up to 1 year. This is one of the most serious Highway Traffic Act offences.'
      },
      {
        question: 'Can a no insurance charge be dropped?',
        answer: 'Yes, if you can prove you had valid insurance at the time of the offence. This could include a lapsed policy that was retroactively reinstated, a valid pink slip you couldn\'t produce at the time, or proof the vehicle was properly insured under another policy.'
      },
      {
        question: 'What if I didn\'t know my insurance had lapsed?',
        answer: 'Unfortunately, not knowing your insurance lapsed is not a valid defence. However, we can often negotiate with prosecutors to reduce the fine significantly, especially for first offences where insurance was quickly obtained afterward.'
      }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  '/services/demerit-points-guide': {
    title: 'Demerit Points Guide Ontario | How Points Work | LegalAssist',
    description: 'Understand Ontario\'s demerit point system. How points are assigned, when your licence is at risk, and how to protect your driving record. Free consultation.',
    keywords: 'demerit points ontario, how demerit points work, licence suspension points, driving record ontario',
    schema: {
      type: 'LegalService',
      name: 'Demerit Points Consultation',
      serviceType: 'Demerit Point Defence',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Traffic Tickets', url: '/services/traffic-tickets' },
      { name: 'Demerit Points Guide', url: '/services/demerit-points-guide' }
    ],
    faqs: [
      {
        question: 'How many demerit points before licence suspension in Ontario?',
        answer: 'For G licence holders: 9+ points triggers a warning letter, 15+ points results in a 30-day suspension. For G1/G2 drivers: 6+ points triggers a warning, 9+ points results in a 60-day suspension. Points stay on your record for 2 years from the offence date.'
      },
      {
        question: 'How long do demerit points stay on your record?',
        answer: 'Demerit points remain on your driving record for 2 years from the date of the offence, not the conviction date. However, the conviction itself stays on your record for 3 years and affects insurance for that entire period.'
      },
      {
        question: 'Can I remove demerit points from my licence?',
        answer: 'You cannot remove demerit points early - they automatically expire after 2 years. However, fighting the underlying ticket can prevent points from being added in the first place, which is why it\'s important to contest tickets before conviction.'
      }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  '/services/g1-g2-violations': {
    title: 'G1 G2 Traffic Violations | Novice Driver Defence | London Ontario',
    description: 'G1 or G2 traffic ticket in Ontario? Novice drivers face stricter penalties. Protect your graduated licence. Expert defence. Free consultation.',
    keywords: 'G1 traffic ticket, G2 violation ontario, novice driver defence, graduated licence suspension',
    schema: {
      type: 'LegalService',
      name: 'G1/G2 Novice Driver Defence',
      serviceType: 'Novice Driver Traffic Ticket Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Traffic Tickets', url: '/services/traffic-tickets' },
      { name: 'G1/G2 Violations', url: '/services/g1-g2-violations' }
    ],
    faqs: [
      {
        question: 'What happens if a G2 driver gets a ticket?',
        answer: 'G2 drivers face the same fines as G licence holders but have a lower demerit point threshold. At 6 points, you receive a warning letter. At 9 points, your licence is suspended for 60 days. Certain violations also carry additional novice driver penalties.'
      },
      {
        question: 'Can a G1 driver get their licence suspended?',
        answer: 'Yes, G1 drivers can have their licence suspended for accumulating 6+ demerit points, violating G1 conditions (like driving at night without a supervisor), or receiving certain serious charges. The suspension restarts your G1 waiting period.'
      },
      {
        question: 'Do G1/G2 tickets affect my ability to get a full G licence?',
        answer: 'Certain convictions can delay your progression to a full G licence. Serious convictions may require you to restart the graduated licensing program entirely. Fighting tickets becomes even more important for novice drivers.'
      }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  '/services/commercial-vehicle-violations': {
    title: 'Commercial Vehicle Violations | CVOR Defence | London Ontario',
    description: 'Commercial vehicle ticket in Ontario? Protect your CVOR record and commercial licence. Expert defence for truckers and fleet operators. Free consultation.',
    keywords: 'commercial vehicle ticket ontario, CVOR defence, truck driver violation, fleet violation defence',
    schema: {
      type: 'LegalService',
      name: 'Commercial Vehicle Violation Defence',
      serviceType: 'Commercial Vehicle Legal Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Traffic Tickets', url: '/services/traffic-tickets' },
      { name: 'Commercial Vehicle Violations', url: '/services/commercial-vehicle-violations' }
    ],
    faqs: [
      {
        question: 'How do commercial vehicle violations affect CVOR?',
        answer: 'Every commercial vehicle conviction adds points to your CVOR (Commercial Vehicle Operator\'s Registration) record. Accumulating too many points can result in an audit, carrier sanctions, or loss of your operating authority, affecting your entire fleet.'
      },
      {
        question: 'Are fines higher for commercial vehicle violations?',
        answer: 'Yes, many violations carry significantly higher fines for commercial vehicles. For example, speeding fines are often doubled, and violations like overweight or logbook offences carry fines specific to commercial operations that can reach thousands of dollars.'
      },
      {
        question: 'Can I lose my commercial licence (AZ/DZ) for a traffic ticket?',
        answer: 'Yes, accumulating too many demerit points or receiving certain serious convictions can result in suspension of your commercial licence class. This makes defending even minor tickets critical for professional drivers whose livelihood depends on their licence.'
      }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  '/services/hov-lane-violations': {
    title: 'HOV Lane Violation Defence | Carpool Lane Ticket | London Ontario',
    description: 'Fight your HOV lane ticket in Ontario. High occupancy vehicle lane violations carry fines and demerit points. Expert defence. Free consultation.',
    keywords: 'HOV lane ticket ontario, carpool lane violation, high occupancy vehicle fine, 403 HOV ticket',
    schema: {
      type: 'LegalService',
      name: 'HOV Lane Violation Defence',
      serviceType: 'HOV Violation Legal Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Traffic Tickets', url: '/services/traffic-tickets' },
      { name: 'HOV Lane Violations', url: '/services/hov-lane-violations' }
    ],
    faqs: [
      {
        question: 'What is the fine for HOV lane violation in Ontario?',
        answer: 'HOV lane violations carry a set fine of $110 plus 3 demerit points. While the fine seems small, the 3 demerit points can significantly impact your insurance rates and put novice drivers at risk of suspension.'
      },
      {
        question: 'Can I fight an HOV lane ticket?',
        answer: 'Yes. Common defences include proving you had the required number of passengers, you were in the process of exiting, there was an emergency situation, or the HOV signage was unclear or obscured at the entry point.'
      },
      {
        question: 'How many people do you need for HOV lanes in Ontario?',
        answer: 'Most HOV lanes in Ontario require 2+ occupants (driver plus at least one passenger). Some highways during peak hours require 3+ occupants. Check the posted signs as requirements vary by highway and time of day.'
      }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  '/services/stop-sign-ticket': {
    title: 'Stop Sign Ticket Defence | Rolling Stop | London Ontario Paralegal',
    description: 'Fight your stop sign ticket in London, Ontario. Rolling stops and failure to stop violations. Protect your driving record. Free consultation.',
    keywords: 'stop sign ticket london, rolling stop defence, failure to stop ontario, stop sign violation',
    schema: {
      type: 'LegalService',
      name: 'Stop Sign Violation Defence',
      serviceType: 'Stop Sign Ticket Legal Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Traffic Tickets', url: '/services/traffic-tickets' },
      { name: 'Stop Sign Ticket', url: '/services/stop-sign-ticket' }
    ],
    faqs: [
      {
        question: 'How many points is a stop sign ticket in Ontario?',
        answer: 'Failing to stop at a stop sign carries 3 demerit points and a fine of approximately $110. The conviction stays on your record for 3 years and can increase insurance premiums by 10-20%.'
      },
      {
        question: 'What counts as a complete stop at a stop sign?',
        answer: 'A complete stop means your vehicle comes to a full standstill where the wheels stop rotating. A rolling stop or California stop, where the vehicle slows but doesn\'t fully stop, is a violation even if you yielded to traffic.'
      },
      {
        question: 'Can I fight a stop sign ticket if I did stop?',
        answer: 'Yes. If you believe you made a complete stop, we can challenge the officer\'s observations, their vantage point, visibility conditions, or any other factors that may have affected their ability to accurately observe whether you stopped completely.'
      }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  '/services/street-racing': {
    title: 'Street Racing Defence | Racing Charge | London Ontario Paralegal',
    description: 'Charged with street racing in Ontario? Face licence suspension and vehicle seizure. Aggressive defence strategies. Free consultation in London.',
    keywords: 'street racing charge ontario, racing ticket defence london, contest racing violation, drag racing ticket',
    schema: {
      type: 'LegalService',
      name: 'Street Racing Defence',
      serviceType: 'Street Racing Legal Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Traffic Tickets', url: '/services/traffic-tickets' },
      { name: 'Street Racing', url: '/services/street-racing' }
    ],
    faqs: [
      {
        question: 'What is the penalty for street racing in Ontario?',
        answer: 'Street racing carries immediate 30-day licence suspension, 14-day vehicle impound, 6 demerit points, fines from $2,000-$10,000, and possible licence suspension up to 2 years. Repeat offences carry licence suspension up to 10 years.'
      },
      {
        question: 'What is considered street racing?',
        answer: 'Street racing includes driving in a race or contest, driving at excessive speed (50+ over), or engaging in driving that shows willful disregard for safety. You can be charged even if racing alone against the clock or trying to beat another vehicle that didn\'t know they were "racing."'
      },
      {
        question: 'Can street racing charges be reduced?',
        answer: 'Yes, with proper defence. We examine whether the charge meets the legal definition of racing, challenge speed measurement methods, review officer observations, and negotiate with prosecutors to potentially reduce charges to lesser speeding offences.'
      }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  '/services/fail-to-yield': {
    title: 'Fail to Yield Defence | Right of Way Ticket | London Ontario',
    description: 'Fight your fail to yield ticket in London, Ontario. Failure to yield right of way violations. Protect your driving record. Free consultation.',
    keywords: 'fail to yield ticket ontario, right of way violation, yield sign ticket defence london',
    schema: {
      type: 'LegalService',
      name: 'Fail to Yield Defence',
      serviceType: 'Yield Violation Legal Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Traffic Tickets', url: '/services/traffic-tickets' },
      { name: 'Fail to Yield', url: '/services/fail-to-yield' }
    ],
    faqs: [
      {
        question: 'How many points is fail to yield in Ontario?',
        answer: 'Failure to yield carries 3 demerit points and fines ranging from $110-$500 depending on the specific circumstances. If the violation contributed to a collision, penalties may be more severe.'
      },
      {
        question: 'What situations require yielding right of way?',
        answer: 'You must yield when: entering a roadway from a driveway, at yield signs, to pedestrians at crosswalks, to emergency vehicles, when turning left at intersections, and when merging onto highways. Each situation has specific rules under the Highway Traffic Act.'
      },
      {
        question: 'Can I contest a fail to yield ticket after an accident?',
        answer: 'Yes, being involved in an accident doesn\'t automatically mean you failed to yield. We examine the evidence, witness statements, road conditions, and other factors to build your defence. The other driver may have contributed to the collision.'
      }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  '/services/unsafe-lane-change': {
    title: 'Unsafe Lane Change Defence | Improper Lane Change | London Ontario',
    description: 'Fight your unsafe lane change ticket in London, Ontario. Improper lane change violations carry points and fines. Expert defence. Free consultation.',
    keywords: 'unsafe lane change ticket ontario, improper lane change defence, lane change violation london',
    schema: {
      type: 'LegalService',
      name: 'Unsafe Lane Change Defence',
      serviceType: 'Lane Change Violation Legal Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Traffic Tickets', url: '/services/traffic-tickets' },
      { name: 'Unsafe Lane Change', url: '/services/unsafe-lane-change' }
    ],
    faqs: [
      {
        question: 'How many points for unsafe lane change in Ontario?',
        answer: 'An unsafe lane change carries 2 demerit points and a fine of approximately $110. While this seems minor, the conviction affects insurance rates for 3 years and accumulates with other violations.'
      },
      {
        question: 'What makes a lane change unsafe?',
        answer: 'A lane change is considered unsafe if you fail to signal, don\'t check mirrors and blind spots, cut off another vehicle, change lanes in an intersection, cross solid lines, or change lanes in a way that forces other vehicles to brake or swerve.'
      },
      {
        question: 'Can I fight an unsafe lane change ticket?',
        answer: 'Yes. Defences include challenging the officer\'s ability to observe the lane change, proving you signaled appropriately, demonstrating the other vehicle was speeding or driving unpredictably, or showing road conditions required the maneuver.'
      }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  '/services/following-too-closely': {
    title: 'Following Too Closely Defence | Tailgating Ticket | London Ontario',
    description: 'Fight your following too closely ticket in London, Ontario. Tailgating charges carry 4 demerit points. Expert defence. Free consultation.',
    keywords: 'following too closely ticket ontario, tailgating defence london, 4 demerit points',
    schema: {
      type: 'LegalService',
      name: 'Following Too Closely Defence',
      serviceType: 'Tailgating Violation Legal Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Traffic Tickets', url: '/services/traffic-tickets' },
      { name: 'Following Too Closely', url: '/services/following-too-closely' }
    ],
    faqs: [
      {
        question: 'How many points for following too closely in Ontario?',
        answer: 'Following too closely carries 4 demerit points - one of the higher point values for traffic violations. Combined with fines of $110-$500, this is a serious offence worth fighting to keep off your record.'
      },
      {
        question: 'What is considered following too closely?',
        answer: 'You must leave enough space to stop safely if the vehicle ahead brakes suddenly. While there\'s no specific distance in the law, the 2-3 second rule is commonly used. In poor conditions, more distance is required.'
      },
      {
        question: 'Can I fight a following too closely ticket after a rear-end collision?',
        answer: 'Yes. While rear-end collisions often result in following too closely charges, we can examine whether the lead vehicle stopped suddenly without cause, brake lights were functioning, or other factors contributed. The charge is not automatic even after a collision.'
      }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  '/services/driving-while-suspended': {
    title: 'Driving While Suspended Defence | Suspended Licence | London Ontario',
    description: 'Charged with driving while suspended in Ontario? Serious penalties including jail time possible. Expert defence strategies. Free consultation in London.',
    keywords: 'driving while suspended ontario, suspended licence defence london, drive under suspension charge',
    schema: {
      type: 'LegalService',
      name: 'Driving While Suspended Defence',
      serviceType: 'Suspended Licence Legal Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Traffic Tickets', url: '/services/traffic-tickets' },
      { name: 'Driving While Suspended', url: '/services/driving-while-suspended' }
    ],
    faqs: [
      {
        question: 'What is the penalty for driving while suspended in Ontario?',
        answer: 'First offence: $1,000-$5,000 fine and possible 6 months jail. Subsequent offences: $2,000-$25,000 fine, up to 6 months jail, and extended licence suspension. The vehicle may also be impounded for 45 days.'
      },
      {
        question: 'What if I didn\'t know my licence was suspended?',
        answer: 'Not knowing about the suspension is generally not a defence, as the MTO sends notices to your registered address. However, we can investigate whether proper notice was given, addresses were correct, and explore other defence options based on your circumstances.'
      },
      {
        question: 'Is driving while suspended a criminal offence?',
        answer: 'Driving while suspended under the HTA is a provincial offence, not criminal. However, driving while prohibited under a Criminal Code order (like an impaired driving ban) is a criminal offence with more severe penalties.'
      }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  '/services/school-zone-speeding': {
    title: 'School Zone Speeding Defence | Community Safety Zone | London Ontario',
    description: 'Charged with speeding in a school zone in London, Ontario? Fines are doubled in community safety zones. Expert defence. Free consultation.',
    keywords: 'school zone speeding ticket ontario, community safety zone fine, doubled speeding fine defence',
    schema: {
      type: 'LegalService',
      name: 'School Zone Speeding Defence',
      serviceType: 'School Zone Violation Legal Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Traffic Tickets', url: '/services/traffic-tickets' },
      { name: 'School Zone Speeding', url: '/services/school-zone-speeding' }
    ],
    faqs: [
      {
        question: 'Are speeding fines doubled in school zones?',
        answer: 'Yes, fines are doubled in designated Community Safety Zones, which include school zones. A speeding ticket that would normally be $200 becomes $400 in a school zone. Demerit points remain the same but the increased fine makes fighting these tickets more worthwhile.'
      },
      {
        question: 'When do school zone speed limits apply?',
        answer: 'School zone reduced speed limits typically apply during posted hours, often 8 AM to 5 PM on school days. Outside these hours, regular speed limits apply. We examine whether the violation occurred during active school zone hours.'
      },
      {
        question: 'Can I fight a school zone speeding ticket?',
        answer: 'Yes. In addition to standard speeding defences, we can challenge whether proper signage was in place, if the Community Safety Zone was properly designated, whether school was in session, and if the timing fell within posted hours.'
      }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  '/services/seatbelt-violations': {
    title: 'Seatbelt Violation Defence | Seatbelt Ticket | London Ontario',
    description: 'Fight your seatbelt ticket in London, Ontario. Seatbelt violations affect your insurance rates. Expert defence available. Free consultation.',
    keywords: 'seatbelt ticket ontario, seatbelt violation defence london, no seatbelt fine',
    schema: {
      type: 'LegalService',
      name: 'Seatbelt Violation Defence',
      serviceType: 'Seatbelt Ticket Legal Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Traffic Tickets', url: '/services/traffic-tickets' },
      { name: 'Seatbelt Violations', url: '/services/seatbelt-violations' }
    ],
    faqs: [
      {
        question: 'How many points for not wearing a seatbelt in Ontario?',
        answer: 'Surprisingly, seatbelt violations carry 2 demerit points in Ontario, plus a $200-$1,000 fine. Many drivers don\'t realize this conviction will appear on their driving record and can affect insurance rates.'
      },
      {
        question: 'Can I get a seatbelt ticket for a passenger not wearing one?',
        answer: 'Drivers are responsible for ensuring all passengers under 16 wear seatbelts. Adults (16+) are responsible for their own seatbelt and receive their own ticket. As the driver, you can be charged if young passengers are unbuckled.'
      },
      {
        question: 'What are valid defences for seatbelt tickets?',
        answer: 'Defences include medical exemptions (with documentation), the seatbelt was worn but became undone momentarily, the officer\'s view was obstructed, or you were engaged in an activity exempt from seatbelt requirements (like certain delivery drivers).'
      }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  // ============================================
  // LANDLORD TENANT BOARD - MAIN & SUB-PAGES (21 pages)
  // ============================================
  '/services/landlord-tenant-board': {
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
      { name: 'Landlord Tenant Board', url: '/services/landlord-tenant-board' }
    ],
    faqs: [
      {
        question: 'How long does an LTB eviction take in Ontario?',
        answer: 'LTB eviction timelines vary significantly. Non-payment of rent cases typically take 2-4 months. N12 (personal use) evictions take 3-6 months. Complex cases involving maintenance or bad faith can take 6-12 months depending on hearing availability.'
      },
      {
        question: 'Can a paralegal represent me at the LTB?',
        answer: 'Yes, licensed paralegals can represent both landlords and tenants at the Landlord and Tenant Board. We handle all types of LTB applications, hearings, reviews, and appeals at a fraction of the cost of a lawyer.'
      },
      {
        question: 'How much does LTB representation cost?',
        answer: 'Our LTB representation fees start at $500 for straightforward matters and vary based on complexity. We offer flat-rate pricing for most services so you know the cost upfront. Free consultations are available.'
      }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    ]
  },

  '/services/landlord-services': {
    title: 'Landlord Services | Eviction Help | London Ontario Paralegal',
    description: 'Paralegal services for landlords in London, Ontario. Evictions, rent collection, lease enforcement, LTB applications. Protect your property investment.',
    keywords: 'landlord paralegal london, eviction services ontario, rent collection help, landlord legal services',
    schema: {
      type: 'LegalService',
      name: 'Landlord Legal Services',
      serviceType: 'Landlord LTB Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Landlord Tenant Board', url: '/services/landlord-tenant' },
      { name: 'Landlord Services', url: '/services/landlord-services' }
    ],
    faqs: [
      {
        question: 'How do I evict a problem tenant in Ontario?',
        answer: 'The eviction process depends on the reason. For non-payment: serve N4, wait 14 days, file L1. For cause (damage, illegal activity): serve appropriate N-notice, file L2. For personal use: serve N12 with 60 days notice, file L2. We guide you through each step.'
      },
      {
        question: 'Can I evict a tenant for not paying rent?',
        answer: 'Yes, non-payment is the most common reason for eviction. After rent is overdue, serve an N4 notice giving 14 days to pay. If unpaid, file an L1 application with the LTB. The hearing typically occurs within 4-8 weeks.'
      },
      {
        question: 'What if my tenant won\'t leave after eviction order?',
        answer: 'If a tenant refuses to leave after an eviction order takes effect, you must file the order with the Court Enforcement Office (Sheriff). The Sheriff will schedule and enforce the eviction. Never attempt self-help eviction - it\'s illegal.'
      }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    ]
  },

  '/services/tenant-services': {
    title: 'Tenant Services | Eviction Defence | London Ontario Paralegal',
    description: 'Paralegal services for tenants in London, Ontario. Fight wrongful evictions, maintenance issues, rent disputes. Know your rights. Free consultation.',
    keywords: 'tenant paralegal london, eviction defence ontario, tenant rights help, fight eviction london',
    schema: {
      type: 'LegalService',
      name: 'Tenant Legal Services',
      serviceType: 'Tenant LTB Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Landlord Tenant Board', url: '/services/landlord-tenant' },
      { name: 'Tenant Services', url: '/services/tenant-services' }
    ],
    faqs: [
      {
        question: 'Can my landlord evict me without reason?',
        answer: 'No. In Ontario, landlords can only evict for specific reasons under the Residential Tenancies Act: non-payment of rent, causing damage, illegal activity, interference with others, or landlord\'s own use. Even then, proper procedures must be followed.'
      },
      {
        question: 'What should I do if I receive an eviction notice?',
        answer: 'Don\'t panic. Read the notice carefully to understand the alleged reason and timeline. For N4 (non-payment), you can void it by paying within 14 days. For other notices, contact us immediately to review your options and prepare a defence.'
      },
      {
        question: 'Can I withhold rent if my landlord won\'t do repairs?',
        answer: 'No, withholding rent is not recommended and can result in eviction for non-payment. Instead, file a T6 application with the LTB for maintenance issues. You may be awarded rent abatement and orders for the landlord to complete repairs.'
      }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
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
        answer: 'Step 1: Serve N4 notice when rent is overdue. Step 2: Wait 14 days (tenant can void by paying). Step 3: File L1 application with LTB ($201 fee). Step 4: Attend hearing. Step 5: If successful, enforce eviction order through Sheriff.'
      },
      {
        question: 'Can a tenant stop an eviction by paying rent?',
        answer: 'Yes, tenants can void an N4 notice by paying all rent owed within 14 days. Even after an L1 is filed, tenants can often preserve their tenancy by paying arrears before or at the hearing, depending on their payment history.'
      },
      {
        question: 'How long does an L1 eviction take?',
        answer: 'From filing to hearing is typically 4-8 weeks. If eviction is ordered and the tenant doesn\'t leave, Sheriff enforcement adds another 2-4 weeks. Total timeline is usually 2-4 months, though delays are common with current LTB backlogs.'
      }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    ]
  },

  '/services/n12-personal-use-eviction': {
    title: 'N12 Eviction | Landlord Personal Use | London Ontario Paralegal',
    description: 'N12 eviction for landlord personal use in London, Ontario. Navigate the requirements and process. Representation for landlords and tenants.',
    keywords: 'N12 eviction ontario, landlord personal use eviction, own use eviction london, N12 notice',
    schema: {
      type: 'LegalService',
      name: 'N12 Personal Use Eviction Services',
      serviceType: 'Personal Use Eviction Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Landlord Tenant Board', url: '/services/landlord-tenant' },
      { name: 'N12 Personal Use Eviction', url: '/services/n12-personal-use-eviction' }
    ],
    faqs: [
      {
        question: 'What is an N12 eviction notice?',
        answer: 'An N12 is a notice to end tenancy because the landlord, a purchaser, or a family member requires the unit for their own residential use. It requires 60 days notice and one month\'s rent compensation to the tenant.'
      },
      {
        question: 'Can a tenant fight an N12 eviction?',
        answer: 'Yes. Tenants can challenge N12 evictions by arguing the landlord doesn\'t genuinely intend to occupy the unit, questioning whether the named person qualifies as family, or showing the landlord has a pattern of N12 evictions suggesting bad faith.'
      },
      {
        question: 'What happens if a landlord doesn\'t move in after N12?',
        answer: 'If the landlord doesn\'t occupy the unit for at least 12 months, the tenant can file a T5 application claiming bad faith. The LTB can order the landlord to pay compensation equal to 12 months rent or the difference between old and new rent.'
      }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    ]
  },

  '/services/n13-renovation-eviction': {
    title: 'N13 Eviction | Renovation Eviction | London Ontario Paralegal',
    description: 'N13 renovation eviction in London, Ontario. Extensive renovations requiring vacant possession. Landlord and tenant representation available.',
    keywords: 'N13 eviction ontario, renovation eviction london, renoviction defence, vacant possession eviction',
    schema: {
      type: 'LegalService',
      name: 'N13 Renovation Eviction Services',
      serviceType: 'Renovation Eviction Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Landlord Tenant Board', url: '/services/landlord-tenant' },
      { name: 'N13 Renovation Eviction', url: '/services/n13-renovation-eviction' }
    ],
    faqs: [
      {
        question: 'What qualifies for an N13 renovation eviction?',
        answer: 'An N13 requires renovations so extensive that vacant possession is necessary and proper permits have been obtained. Minor renovations that can be done with the tenant in place don\'t qualify. The landlord must provide evidence of permits and scope of work.'
      },
      {
        question: 'Do tenants have the right to return after N13 renovations?',
        answer: 'Yes, tenants have the right of first refusal to return to the unit at the same rent after renovations are complete. Landlords must give proper notice when the unit is ready. Tenants can waive this right for compensation.'
      },
      {
        question: 'How can tenants fight an N13 eviction?',
        answer: 'Tenants can challenge N13s by arguing: the renovations don\'t require vacant possession, required permits weren\'t obtained, the landlord is using N13 to circumvent rent control, or the landlord has a history of bad faith renovictions.'
      }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    ]
  },

  '/services/above-guideline-increase': {
    title: 'Above Guideline Rent Increase | AGI Application | London Ontario',
    description: 'Above guideline rent increase applications in London, Ontario. AGI for capital expenditures, taxes, utilities. Landlord and tenant representation.',
    keywords: 'above guideline increase ontario, AGI application LTB, rent increase above guideline, capital expenditure rent increase',
    schema: {
      type: 'LegalService',
      name: 'Above Guideline Increase Services',
      serviceType: 'AGI Legal Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Landlord Tenant Board', url: '/services/landlord-tenant' },
      { name: 'Above Guideline Increase', url: '/services/above-guideline-increase' }
    ],
    faqs: [
      {
        question: 'What is an above guideline rent increase?',
        answer: 'An AGI allows landlords to increase rent beyond the annual guideline (2.5% in 2024) for extraordinary costs: major capital repairs, significant increases in property taxes, or utility cost increases. Requires LTB approval through an L5 application.'
      },
      {
        question: 'Can tenants dispute an above guideline increase?',
        answer: 'Yes, tenants can attend the AGI hearing and challenge: whether the work qualifies as capital expenditure vs. maintenance, the reasonableness of costs, whether work was necessary, allocation of costs among units, and useful life calculations.'
      },
      {
        question: 'How much can rent increase with an AGI?',
        answer: 'AGIs are capped at 3% above the guideline per year for capital expenditures and utilities. There\'s no cap for municipal tax increases. The total AGI can be phased in over up to 3 years if it exceeds the annual cap.'
      }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  '/services/maintenance-repairs': {
    title: 'Maintenance and Repairs | T6 Application | London Ontario Paralegal',
    description: 'Landlord won\'t do repairs? File a T6 application with the LTB. Get maintenance orders and rent abatement. Tenant representation in London, Ontario.',
    keywords: 'landlord maintenance repairs ontario, T6 application LTB, rent abatement repairs, tenant maintenance rights',
    schema: {
      type: 'LegalService',
      name: 'Maintenance and Repair Services',
      serviceType: 'T6 Maintenance Application Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Landlord Tenant Board', url: '/services/landlord-tenant' },
      { name: 'Maintenance & Repairs', url: '/services/maintenance-repairs' }
    ],
    faqs: [
      {
        question: 'What can I do if my landlord won\'t make repairs?',
        answer: 'Document the issues in writing, notify your landlord, and allow reasonable time for repairs. If ignored, file a T6 application with the LTB. The Board can order repairs, rent abatement for the period of disrepair, and reimbursement for costs you incurred.'
      },
      {
        question: 'What repairs is my landlord responsible for?',
        answer: 'Landlords must maintain the property in a good state of repair, comply with health and safety standards, and ensure vital services (heat, water, electricity). This includes structural issues, plumbing, heating, electrical systems, and pest control.'
      },
      {
        question: 'Can I get a rent reduction for maintenance issues?',
        answer: 'Yes, the LTB can order rent abatement (reduction) to compensate for living with disrepair. The amount depends on severity and duration. Major issues like no heat or water can result in significant abatement; minor issues receive smaller awards.'
      }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    ]
  },

  '/services/bad-faith-eviction': {
    title: 'Bad Faith Eviction | T5 Application | London Ontario Paralegal',
    description: 'Were you evicted in bad faith? Landlord didn\'t move in after N12? File T5 for compensation. Tenant representation in London, Ontario.',
    keywords: 'bad faith eviction ontario, T5 application LTB, landlord didnt move in, N12 bad faith',
    schema: {
      type: 'LegalService',
      name: 'Bad Faith Eviction Services',
      serviceType: 'T5 Bad Faith Application Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Landlord Tenant Board', url: '/services/landlord-tenant' },
      { name: 'Bad Faith Eviction', url: '/services/bad-faith-eviction' }
    ],
    faqs: [
      {
        question: 'What is a bad faith eviction?',
        answer: 'A bad faith eviction occurs when a landlord uses N12 (personal use) or N13 (renovation) as a pretext to remove a tenant, but never actually occupies the unit or completes the claimed renovations. This is illegal and compensable.'
      },
      {
        question: 'How do I prove my landlord evicted me in bad faith?',
        answer: 'Evidence includes: the unit being re-rented shortly after you left, seeing the unit listed for rent, the landlord or family member never moving in, renovations never happening, or the unit being used commercially instead of residentially.'
      },
      {
        question: 'What compensation can I get for bad faith eviction?',
        answer: 'The LTB can order the landlord to pay: 12 months rent, the difference between your old rent and new rent for up to 12 months, moving expenses, and general damages for distress. Bad faith findings can result in significant awards.'
      }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    ]
  },

  '/services/rent-increase-guide': {
    title: 'Rent Increase Guide Ontario | Legal Rent Increases | LegalAssist',
    description: 'Understand legal rent increases in Ontario. Annual guidelines, notice requirements, and when increases are illegal. Information for tenants and landlords.',
    keywords: 'rent increase ontario, legal rent increase, rent guideline 2024, rent increase notice requirements',
    schema: {
      type: 'LegalService',
      name: 'Rent Increase Consultation',
      serviceType: 'Rent Increase Legal Advice',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Landlord Tenant Board', url: '/services/landlord-tenant' },
      { name: 'Rent Increase Guide', url: '/services/rent-increase-guide' }
    ],
    faqs: [
      {
        question: 'How much can a landlord increase rent in Ontario?',
        answer: 'For rent-controlled units, landlords can only increase rent by the annual guideline (2.5% in 2024) once per year with 90 days written notice. Units first occupied after November 15, 2018 are exempt from rent control and have no limit.'
      },
      {
        question: 'When is a rent increase illegal in Ontario?',
        answer: 'A rent increase is illegal if: it exceeds the guideline without AGI approval, occurs less than 12 months after the last increase, proper 90-day notice wasn\'t given, the notice doesn\'t use the proper N1 form, or it\'s applied to a new tenant (rent can\'t increase between tenancies for controlled units).'
      },
      {
        question: 'Can I refuse a rent increase?',
        answer: 'If the increase is illegal (above guideline, improper notice, too soon), you can refuse it and continue paying your current rent. If the landlord persists, they may file with the LTB, where you can defend against the improper increase.'
      }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    ]
  },

  '/services/illegal-lockout': {
    title: 'Illegal Lockout | Landlord Changed Locks | London Ontario Paralegal',
    description: 'Landlord locked you out illegally? Get back in your home. Illegal lockouts violate the RTA. Emergency tenant representation in London, Ontario.',
    keywords: 'illegal lockout ontario, landlord changed locks, wrongful eviction, illegal eviction tenant',
    schema: {
      type: 'LegalService',
      name: 'Illegal Lockout Services',
      serviceType: 'Emergency Tenant Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Landlord Tenant Board', url: '/services/landlord-tenant' },
      { name: 'Illegal Lockout', url: '/services/illegal-lockout' }
    ],
    faqs: [
      {
        question: 'Can my landlord lock me out without an eviction order?',
        answer: 'Absolutely not. It\'s illegal for landlords to lock out, change locks, remove belongings, or cut off vital services without a valid eviction order from the LTB enforced by the Sheriff. This is a serious violation of the Residential Tenancies Act.'
      },
      {
        question: 'What should I do if my landlord locked me out?',
        answer: 'Call police to document the illegal lockout, take photos, gather witnesses. File an urgent T2 application with the LTB. You may also contact the Rental Housing Enforcement Unit. Don\'t force entry yourself - let authorities help.'
      },
      {
        question: 'What penalties do landlords face for illegal lockouts?',
        answer: 'The LTB can order landlords to pay: compensation for out-of-pocket expenses, general damages up to $50,000, and the landlord may face fines up to $50,000 under the RTA. Repeat offenders face even harsher penalties.'
      }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  '/services/landlord-harassment': {
    title: 'Landlord Harassment | T2 Application | London Ontario Paralegal',
    description: 'Being harassed by your landlord? Interfering with your enjoyment of the unit? File T2 application. Tenant representation in London, Ontario.',
    keywords: 'landlord harassment ontario, T2 application harassment, tenant harassment help, landlord interfering',
    schema: {
      type: 'LegalService',
      name: 'Landlord Harassment Services',
      serviceType: 'T2 Harassment Application Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Landlord Tenant Board', url: '/services/landlord-tenant' },
      { name: 'Landlord Harassment', url: '/services/landlord-harassment' }
    ],
    faqs: [
      {
        question: 'What counts as landlord harassment in Ontario?',
        answer: 'Harassment includes: repeated unwanted contact, entering without notice, threats or intimidation, removing your belongings, shutting off utilities, refusing to do repairs as retaliation, or any conduct meant to pressure you to leave.'
      },
      {
        question: 'How do I prove landlord harassment?',
        answer: 'Document everything: save texts, emails, voicemails. Keep a dated log of incidents. Get witness statements from neighbours. Photograph any damage or unauthorized entry. Report serious incidents to police. This evidence supports your T2 application.'
      },
      {
        question: 'What can the LTB do about landlord harassment?',
        answer: 'The LTB can order: the landlord to stop the harassing behavior, compensation for damages you suffered, rent abatement, and in serious cases, fines against the landlord. You may also be able to terminate your tenancy if conditions are intolerable.'
      }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    ]
  },

  '/services/rent-arrears-defence': {
    title: 'Rent Arrears Defence | L1 Defence | London Ontario Paralegal',
    description: 'Facing eviction for rent arrears? We can help defend or negotiate. Payment plans, rent abatement offsets, and more. Tenant representation in London.',
    keywords: 'rent arrears defence ontario, L1 application defence, cant pay rent eviction, tenant debt help',
    schema: {
      type: 'LegalService',
      name: 'Rent Arrears Defence Services',
      serviceType: 'L1 Defence Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Landlord Tenant Board', url: '/services/landlord-tenant' },
      { name: 'Rent Arrears Defence', url: '/services/rent-arrears-defence' }
    ],
    faqs: [
      {
        question: 'Can I stop an eviction for unpaid rent?',
        answer: 'Often yes. Options include: paying the full arrears before the hearing, negotiating a payment plan at the hearing, raising maintenance issues as an offset (rent abatement), or requesting relief from eviction based on your circumstances.'
      },
      {
        question: 'What is Section 83 relief from eviction?',
        answer: 'Section 83 allows the LTB to refuse or delay eviction if circumstances warrant. Factors include: your payment history, reason for arrears, children in the home, impact on your health, time of year, and whether the landlord has contributed to the situation.'
      },
      {
        question: 'Can I offset rent arrears with maintenance issues?',
        answer: 'Yes, if your landlord has failed to maintain the unit, you can raise this at the L1 hearing to reduce the amount owed. Bring evidence of maintenance issues and how long they\'ve existed. The arrears may be reduced by rent abatement.'
      }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    ]
  },

  '/services/subsidized-housing-eviction': {
    title: 'Subsidized Housing Eviction | RGI Housing | London Ontario',
    description: 'Facing eviction from subsidized housing? RGI and social housing evictions have special rules. Expert representation in London, Ontario.',
    keywords: 'subsidized housing eviction ontario, RGI eviction, social housing eviction, geared to income housing',
    schema: {
      type: 'LegalService',
      name: 'Subsidized Housing Eviction Services',
      serviceType: 'RGI Housing Legal Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Landlord Tenant Board', url: '/services/landlord-tenant' },
      { name: 'Subsidized Housing Eviction', url: '/services/subsidized-housing-eviction' }
    ],
    faqs: [
      {
        question: 'Can I be evicted from subsidized housing?',
        answer: 'Yes, but the process is similar to private rentals with some differences. Common reasons include non-payment of rent-geared-to-income charges, misrepresenting income, violating occupancy rules, or ceasing to qualify for subsidized housing.'
      },
      {
        question: 'What if I misreported my income for RGI housing?',
        answer: 'Misrepresenting income is serious and can result in both eviction and repayment demands. However, defences exist: inadvertent errors, unclear reporting requirements, or circumstances that affected your ability to report. We can help negotiate outcomes.'
      },
      {
        question: 'Do I have the same rights in subsidized housing?',
        answer: 'Yes, tenants in subsidized housing have all rights under the RTA plus additional protections under the Housing Services Act. You cannot be evicted without proper LTB process, and you can request reviews of subsidy calculations.'
      }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    ]
  },

  '/services/roommate-disputes': {
    title: 'Roommate Disputes | Shared Living Issues | London Ontario Paralegal',
    description: 'Roommate problems in London, Ontario? Understand your rights as a tenant vs. roommate. Get help resolving shared living disputes.',
    keywords: 'roommate dispute ontario, shared living legal issues, roommate not paying rent, remove roommate',
    schema: {
      type: 'LegalService',
      name: 'Roommate Dispute Services',
      serviceType: 'Roommate Dispute Resolution',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Landlord Tenant Board', url: '/services/landlord-tenant' },
      { name: 'Roommate Disputes', url: '/services/roommate-disputes' }
    ],
    faqs: [
      {
        question: 'Are roommates protected by the RTA in Ontario?',
        answer: 'It depends. If you share a kitchen or bathroom with the owner or their family, RTA doesn\'t apply. If all roommates are co-tenants on the lease with no owner present, all are protected. Subtenants may have limited RTA protection.'
      },
      {
        question: 'How do I remove a roommate who won\'t leave?',
        answer: 'If you\'re the head tenant and they\'re your subtenant, you may need to go to Small Claims Court (not LTB). If they\'re a co-tenant, you cannot remove them - only the landlord can. If RTA doesn\'t apply, common law notice requirements apply.'
      },
      {
        question: 'What if my roommate stops paying their share of rent?',
        answer: 'If you\'re all on the lease, you\'re jointly responsible for full rent regardless of roommate arrangements. You may need to cover their share to avoid eviction and then pursue them in Small Claims Court for their portion.'
      }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    ]
  },

  '/services/breaking-lease-early': {
    title: 'Breaking Lease Early | End Tenancy Early | London Ontario',
    description: 'Need to break your lease early in Ontario? Understand your options, obligations, and how to minimize penalties. Tenant help in London.',
    keywords: 'break lease early ontario, end tenancy early, lease termination penalty, get out of lease',
    schema: {
      type: 'LegalService',
      name: 'Lease Breaking Services',
      serviceType: 'Early Termination Advice',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Landlord Tenant Board', url: '/services/landlord-tenant' },
      { name: 'Breaking Lease Early', url: '/services/breaking-lease-early' }
    ],
    faqs: [
      {
        question: 'Can I break my lease early in Ontario?',
        answer: 'You can give 60 days notice to end a monthly tenancy anytime. For fixed-term leases, you can: assign your lease to someone else (landlord can\'t unreasonably refuse), negotiate mutual termination, or leave and remain liable until the unit is re-rented.'
      },
      {
        question: 'What happens if I just leave before my lease ends?',
        answer: 'You remain liable for rent until the lease ends OR the landlord re-rents, whichever comes first. The landlord must make reasonable efforts to re-rent (mitigate damages) but can pursue you in Small Claims Court for unpaid rent and costs.'
      },
      {
        question: 'Can my landlord refuse to let me assign my lease?',
        answer: 'Landlords can only refuse assignment for reasonable grounds (like poor references). If they refuse all assignments without reason, you can give 30 days notice to terminate early. Get refusals in writing and document your assignment efforts.'
      }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    ]
  },

  '/services/pet-disputes': {
    title: 'Pet Disputes | No Pet Clauses | London Ontario Paralegal',
    description: 'Landlord trying to evict you over pets? No-pet clauses are generally unenforceable in Ontario. Know your pet rights. Tenant help in London.',
    keywords: 'pet clause ontario, landlord no pets, eviction for pet, tenant pet rights',
    schema: {
      type: 'LegalService',
      name: 'Pet Dispute Services',
      serviceType: 'Pet Rights Legal Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Landlord Tenant Board', url: '/services/landlord-tenant' },
      { name: 'Pet Disputes', url: '/services/pet-disputes' }
    ],
    faqs: [
      {
        question: 'Can a landlord evict me for having a pet in Ontario?',
        answer: 'Generally no. Under the RTA, no-pet clauses are void and unenforceable. However, landlords CAN evict if the pet causes damage, substantial interference with others, allergic reactions in the building, or is inherently dangerous.'
      },
      {
        question: 'Is the no-pet clause in my lease enforceable?',
        answer: 'No. Section 14 of the RTA makes no-pet provisions void. However, this only applies to rental units covered by the RTA. Condos may have building rules about pets that could affect you, and landlords can still screen for pets before renting to you.'
      },
      {
        question: 'What if my pet disturbs other tenants?',
        answer: 'If your pet causes substantial interference with reasonable enjoyment (constant barking, aggressive behavior, smells), the landlord can issue an N5 notice. You have 7 days to correct the issue. Repeated problems can lead to eviction.'
      }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    ]
  },

  '/services/noise-complaints-defence': {
    title: 'Noise Complaints Defence | N5 Notice | London Ontario Paralegal',
    description: 'Facing eviction for noise complaints? N5 notice for interference? We can help defend. Tenant representation in London, Ontario.',
    keywords: 'noise complaint eviction ontario, N5 notice defence, loud tenant eviction, noise interference tenant',
    schema: {
      type: 'LegalService',
      name: 'Noise Complaint Defence Services',
      serviceType: 'N5 Interference Defence',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Landlord Tenant Board', url: '/services/landlord-tenant' },
      { name: 'Noise Complaints Defence', url: '/services/noise-complaints-defence' }
    ],
    faqs: [
      {
        question: 'Can I be evicted for being too loud?',
        answer: 'Yes, if the noise substantially interferes with other tenants\' reasonable enjoyment. However, normal living sounds aren\'t grounds for eviction. The landlord must prove the noise was excessive and unreasonable, not just that someone complained.'
      },
      {
        question: 'What is an N5 notice for noise?',
        answer: 'An N5 is a notice to end tenancy for causing interference with others\' reasonable enjoyment. You have 7 days to stop the behavior. If you do, the notice is void. If you repeat within 6 months, a second N5 cannot be voided and the landlord can proceed to eviction.'
      },
      {
        question: 'How can I defend against noise complaint eviction?',
        answer: 'Defences include: the noise was reasonable living sounds, the complainant is overly sensitive, poor sound insulation is the real problem, the complaints are retaliatory or discriminatory, or the landlord didn\'t give proper notice or follow procedures.'
      }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    ]
  },

  '/services/ltb-hearing-preparation': {
    title: 'LTB Hearing Preparation | Get Ready for Your Hearing | London Ontario',
    description: 'Prepare for your Landlord and Tenant Board hearing. What to expect, evidence to gather, and how to present your case. London, Ontario.',
    keywords: 'LTB hearing preparation, landlord tenant board hearing, prepare for LTB, LTB evidence',
    schema: {
      type: 'LegalService',
      name: 'LTB Hearing Preparation Services',
      serviceType: 'LTB Hearing Preparation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Landlord Tenant Board', url: '/services/landlord-tenant' },
      { name: 'LTB Hearing Preparation', url: '/services/ltb-hearing-preparation' }
    ],
    faqs: [
      {
        question: 'What should I bring to an LTB hearing?',
        answer: 'Bring: copies of your lease, relevant notices, photos/videos of issues, repair requests and responses, payment records, text/email communications, witness contact information, and any other documents supporting your case. Organize chronologically.'
      },
      {
        question: 'How do LTB hearings work?',
        answer: 'Most hearings are now video conferences. The adjudicator will identify who\'s present, explain procedures, then hear from the applicant, then the respondent. You can question the other party and present evidence. Decisions may be given immediately or reserved.'
      },
      {
        question: 'Can I have someone represent me at the LTB?',
        answer: 'Yes, you can have a licensed paralegal, lawyer, or unpaid friend/family member represent you. Paralegals offer expert representation at lower cost than lawyers. We handle all aspects from preparation through hearing and can often achieve better outcomes.'
      }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    ]
  },

  '/services/rent-reduction-applications': {
    title: 'Rent Reduction Application | Reduced Services | London Ontario',
    description: 'Apply for rent reduction due to reduced services or amenities. Lost parking, laundry, or other services? Tenant representation in London.',
    keywords: 'rent reduction ontario, reduced services tenant, lost amenities rent decrease, T3 application',
    schema: {
      type: 'LegalService',
      name: 'Rent Reduction Services',
      serviceType: 'T3 Rent Reduction Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Landlord Tenant Board', url: '/services/landlord-tenant' },
      { name: 'Rent Reduction Applications', url: '/services/rent-reduction-applications' }
    ],
    faqs: [
      {
        question: 'When can I apply for a rent reduction?',
        answer: 'You can apply if your landlord has discontinued or reduced services or amenities that were part of your rental: parking, laundry, storage, gym, pool, security, cleaning services, cable/internet, or appliances that were included in rent.'
      },
      {
        question: 'How much can rent be reduced for lost services?',
        answer: 'The reduction should reflect the value of the lost service. For parking, this might be $50-150/month. For laundry facilities, $20-40/month. The LTB considers what you\'d pay to replace the service and the proportion of your rent it represents.'
      },
      {
        question: 'Can I get a rent reduction for building under construction?',
        answer: 'Possibly, if the construction significantly impacts your enjoyment (noise, dust, lost amenities, reduced access). Document the disruption carefully. However, necessary maintenance doesn\'t automatically entitle you to reduction if done reasonably.'
      }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    ]
  },

  '/services/mobile-home-park-disputes': {
    title: 'Mobile Home Park Disputes | Land Lease Communities | London Ontario',
    description: 'Mobile home park tenant issues? Land lease community disputes have special rules. Representation for mobile home owners in London, Ontario.',
    keywords: 'mobile home park ontario, land lease community, trailer park tenant rights, mobile home eviction',
    schema: {
      type: 'LegalService',
      name: 'Mobile Home Park Dispute Services',
      serviceType: 'Mobile Home Legal Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Landlord Tenant Board', url: '/services/landlord-tenant' },
      { name: 'Mobile Home Park Disputes', url: '/services/mobile-home-park-disputes' }
    ],
    faqs: [
      {
        question: 'Am I protected by the RTA if I own my mobile home but rent the lot?',
        answer: 'Yes, land lease communities (where you own the home but rent the land) are covered by the RTA. You have tenant rights for the land/lot portion. The park owner cannot evict you without going through the LTB process.'
      },
      {
        question: 'Can a mobile home park increase my lot rent?',
        answer: 'Yes, but the same rent increase rules apply as regular tenancies. For rent-controlled sites, increases are limited to the guideline unless the landlord gets AGI approval. Exempt sites have no increase limits.'
      },
      {
        question: 'What if the park owner wants me to remove my mobile home?',
        answer: 'The park owner must obtain an eviction order from the LTB. Even then, they cannot remove your home - you own it. If evicted, you have the right to sell the home in place or remove it yourself. The park cannot seize your home for unpaid rent.'
      }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  '/services/superintendent-housing-rights': {
    title: 'Superintendent Housing Rights | Building Staff | London Ontario',
    description: 'Rights for building superintendents and staff in Ontario. Employment-related housing has special rules. Superintendent representation in London.',
    keywords: 'superintendent housing rights ontario, building staff housing, caretaker eviction, employment housing',
    schema: {
      type: 'LegalService',
      name: 'Superintendent Housing Services',
      serviceType: 'Superintendent Rights Representation',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Landlord Tenant Board', url: '/services/landlord-tenant' },
      { name: 'Superintendent Housing Rights', url: '/services/superintendent-housing-rights' }
    ],
    faqs: [
      {
        question: 'What happens to my housing if I\'m fired as superintendent?',
        answer: 'Superintendents who received their unit as a condition of employment are not protected by the RTA. The employer can require you to vacate with reasonable notice (typically matching employment notice requirements). However, the terms of your employment contract matter.'
      },
      {
        question: 'Does the RTA apply to superintendent units?',
        answer: 'Generally no, if occupancy was a condition of employment. However, if you lived in the unit before becoming superintendent, paid full market rent, or the unit wasn\'t truly tied to employment, RTA protections may apply. These situations are complex.'
      },
      {
        question: 'How much notice before a superintendent must vacate?',
        answer: 'There\'s no set rule. Courts have found 1-3 months reasonable depending on length of service and circumstances. If you dispute the notice period or whether RTA applies, seek legal help immediately to protect your rights.'
      }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    ]
  },

  // ============================================
  // SMALL CLAIMS COURT - MAIN & SUB-PAGES (19 pages)
  // ============================================
  '/services/small-claims-court': {
    title: 'Small Claims Court | Sue or Defend Up to $50,000 | London Ontario',
    description: 'Small Claims Court representation in London, Ontario. Debt collection, contract disputes, property damage claims. Claims up to $50,000. Free consultation.',
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
      { name: 'Small Claims Court', url: '/services/small-claims-court' }
    ],
    faqs: [
      {
        question: 'What is the limit for Small Claims Court in Ontario?',
        answer: 'The monetary limit for Small Claims Court in Ontario is $50,000, not including interest and costs. Claims over $50,000 must be filed in Superior Court.'
      },
      {
        question: 'How much does it cost to sue in Small Claims Court?',
        answer: 'Court filing fees are $102 for claims up to $500 and $273 for claims over $500. Legal representation fees vary - we offer competitive flat-rate packages starting at $750.'
      },
      {
        question: 'How long does Small Claims Court take?',
        answer: 'Simple cases may settle within 2-3 months. Contested cases going to trial typically take 6-12 months. Settlement conferences resolve many cases before trial.'
      }
    ,
      {
        question: 'What costs can I recover if I win?',
        answer: 'Filing fees, service costs, and portion of legal fees (up to 15% of claim). Interest on judgment also awarded. We pursue full cost recovery.'
      }
    ]
  },

  '/services/small-claims-process': {
    title: 'Small Claims Court Process | Step by Step | London Ontario',
    description: 'Understanding the Small Claims Court process in Ontario. From filing to trial, learn each step. Expert representation in London.',
    keywords: 'small claims court process ontario, how to sue small claims, court procedure',
    schema: { type: 'LegalService', name: 'Small Claims Process', serviceType: 'Small Claims Consultation', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Small Claims', url: '/services/small-claims' }, { name: 'Process', url: '/services/small-claims-process' }],
    faqs: [
      { question: 'What are the steps in Small Claims Court?', answer: 'File claim, serve defendant (20 days to respond), defence or default judgment, mandatory settlement conference, trial if not settled, judgment, enforcement if needed.' },
      { question: 'Do I have to go to court?', answer: 'You must attend Settlement Conference and Trial. If you hire us, we can attend most proceedings on your behalf.' }
    ,
      {
        question: 'What costs can I recover if I win?',
        answer: 'Filing fees, service costs, and portion of legal fees (up to 15% of claim). Interest on judgment also awarded. We pursue full cost recovery.'
      }
    
    ,
      {
        question: 'What happens at a settlement conference?',
        answer: 'A deputy judge reviews both sides and encourages settlement. Many cases resolve here. If not, trial is scheduled. We prepare you thoroughly for both outcomes.'
      }
    ]
  },

  '/services/debt-collection': {
    title: 'Debt Collection | Collect Money Owed | London Ontario',
    description: 'Collect debts through Small Claims Court in London. Unpaid invoices, loans, money owed. Fast debt recovery.',
    keywords: 'debt collection london, collect money owed ontario, unpaid debt recovery',
    schema: { type: 'LegalService', name: 'Debt Collection', serviceType: 'Debt Collection', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Small Claims', url: '/services/small-claims' }, { name: 'Debt Collection', url: '/services/debt-collection' }],
    faqs: [
      { question: 'How do I collect a debt through court?', answer: 'File a claim with evidence (contracts, invoices). Serve the debtor. If they don\'t defend, get default judgment. If defended, proceed to settlement and trial.' },
      { question: 'How long do I have to sue for a debt?', answer: 'The limitation period is 2 years from when the debt became due or was last acknowledged.' }
    ,
      {
        question: 'What costs can I recover if I win?',
        answer: 'Filing fees, service costs, and portion of legal fees (up to 15% of claim). Interest on judgment also awarded. We pursue full cost recovery.'
      }
    
    ,
      {
        question: 'Can I sue someone who lives in another province?',
        answer: 'Yes, if the contract was formed in Ontario or the incident occurred here. Service and enforcement across provinces can be more complex. We advise on your options.'
      }
    ]
  },

  '/services/contract-disputes': {
    title: 'Contract Disputes | Breach of Contract | London Ontario',
    description: 'Contract dispute representation in London. Breach of contract, failed agreements. Small Claims up to $50,000.',
    keywords: 'contract dispute london, breach of contract ontario, business dispute',
    schema: { type: 'LegalService', name: 'Contract Disputes', serviceType: 'Contract Dispute Resolution', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Small Claims', url: '/services/small-claims' }, { name: 'Contract Disputes', url: '/services/contract-disputes' }],
    faqs: [
      { question: 'What is breach of contract?', answer: 'Breach occurs when one party fails to fulfill their contractual obligations: not delivering goods/services, not paying as agreed, or violating contract terms.' },
      { question: 'Do I need a written contract to sue?', answer: 'Not necessarily. Oral contracts are enforceable, though harder to prove. Emails, texts, and witnesses can support your case.' }
    ,
      {
        question: 'What costs can I recover if I win?',
        answer: 'Filing fees, service costs, and portion of legal fees (up to 15% of claim). Interest on judgment also awarded. We pursue full cost recovery.'
      }
    
    ,
      {
        question: 'How do I serve documents on the other party?',
        answer: 'Documents can be served by mail, courier, personal service, or alternative methods approved by the court. Proper service is essential - we ensure it is done correctly.'
      }
    ]
  },

  '/services/judgement-enforcement': {
    title: 'Judgment Enforcement | Collect Your Judgment | London Ontario',
    description: 'Won your case but not paid? We enforce judgments through garnishment, seizure, examination. London.',
    keywords: 'judgment enforcement ontario, collect court judgment, garnishment',
    schema: { type: 'LegalService', name: 'Judgment Enforcement', serviceType: 'Judgment Collection', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Small Claims', url: '/services/small-claims' }, { name: 'Enforcement', url: '/services/judgement-enforcement' }],
    faqs: [
      { question: 'How do I enforce a judgment?', answer: 'Options include: garnishing wages or bank accounts, examining debtor about assets, seizing property, or placing liens on real estate.' },
      { question: 'How long is a judgment valid?', answer: 'Small Claims judgments are valid for 6 years and can be renewed. Interest accrues on unpaid amounts.' }
    ,
      {
        question: 'What costs can I recover if I win?',
        answer: 'Filing fees, service costs, and portion of legal fees (up to 15% of claim). Interest on judgment also awarded. We pursue full cost recovery.'
      }
    
    ,
      {
        question: 'What happens at a settlement conference?',
        answer: 'A deputy judge reviews both sides and encourages settlement. Many cases resolve here. If not, trial is scheduled. We prepare you thoroughly for both outcomes.'
      }
    ]
  },

  '/services/property-damage-claims': {
    title: 'Property Damage Claims | Sue for Damages | London Ontario',
    description: 'Property damage claims in London. Vehicle damage, property destruction, negligence claims.',
    keywords: 'property damage claim ontario, sue for damages, negligence claim',
    schema: { type: 'LegalService', name: 'Property Damage Claims', serviceType: 'Damage Claim Representation', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Small Claims', url: '/services/small-claims' }, { name: 'Property Damage', url: '/services/property-damage-claims' }],
    faqs: [
      { question: 'Can I sue for property damage?', answer: 'Yes, for negligent or intentional damage up to $50,000. Document damage with photos and get repair estimates.' },
      { question: 'What damages can I recover?', answer: 'Repair costs or fair market value, diminished value, loss of use, and related expenses.' }
    ,
      {
        question: 'What costs can I recover if I win?',
        answer: 'Filing fees, service costs, and portion of legal fees (up to 15% of claim). Interest on judgment also awarded. We pursue full cost recovery.'
      }
    
    ,
      {
        question: 'Can I sue someone who lives in another province?',
        answer: 'Yes, if the contract was formed in Ontario or the incident occurred here. Service and enforcement across provinces can be more complex. We advise on your options.'
      }
    ]
  },

  '/services/unpaid-invoices': {
    title: 'Unpaid Invoices | Collect Outstanding Bills | London Ontario',
    description: 'Collect unpaid invoices through Small Claims Court. Business debt collection.',
    keywords: 'unpaid invoice collection, outstanding bill recovery, business debt',
    schema: { type: 'LegalService', name: 'Invoice Collection', serviceType: 'Invoice Recovery', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Small Claims', url: '/services/small-claims' }, { name: 'Unpaid Invoices', url: '/services/unpaid-invoices' }],
    faqs: [
      { question: 'How do I collect unpaid invoices?', answer: 'Start with a demand letter. If unpaid, file in Small Claims Court with invoices, contracts, and communications.' },
      { question: 'Can I add interest?', answer: 'Yes, if your contract or invoice specifies interest. Otherwise, claim pre-judgment interest at the court rate.' }
    ,
      {
        question: 'What costs can I recover if I win?',
        answer: 'Filing fees, service costs, and portion of legal fees (up to 15% of claim). Interest on judgment also awarded. We pursue full cost recovery.'
      }
    
    ,
      {
        question: 'How do I serve documents on the other party?',
        answer: 'Documents can be served by mail, courier, personal service, or alternative methods approved by the court. Proper service is essential - we ensure it is done correctly.'
      }
    ]
  },

  '/services/security-deposits': {
    title: 'Security Deposit Recovery | Get Deposit Back | London Ontario',
    description: 'Recover security deposits. Wrongfully withheld deposits, illegal deductions.',
    keywords: 'security deposit recovery, get deposit back, landlord keeping deposit',
    schema: { type: 'LegalService', name: 'Deposit Recovery', serviceType: 'Security Deposit Claims', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Small Claims', url: '/services/small-claims' }, { name: 'Security Deposits', url: '/services/security-deposits' }],
    faqs: [
      { question: 'Can landlords keep security deposits?', answer: 'In Ontario, security deposits are illegal. Landlords can only collect last month\'s rent and cannot deduct for damages.' },
      { question: 'How do I get my deposit back?', answer: 'Send written demand citing RTA provisions. File with LTB or Small Claims Court if refused.' }
    ,
      {
        question: 'What costs can I recover if I win?',
        answer: 'Filing fees, service costs, and portion of legal fees (up to 15% of claim). Interest on judgment also awarded. We pursue full cost recovery.'
      }
    
    ,
      {
        question: 'What happens at a settlement conference?',
        answer: 'A deputy judge reviews both sides and encourages settlement. Many cases resolve here. If not, trial is scheduled. We prepare you thoroughly for both outcomes.'
      }
    ]
  },

  '/services/consumer-disputes': {
    title: 'Consumer Disputes | Consumer Protection | London Ontario',
    description: 'Consumer dispute representation. Defective products, unfair business practices.',
    keywords: 'consumer dispute ontario, consumer protection claim, defective product',
    schema: { type: 'LegalService', name: 'Consumer Disputes', serviceType: 'Consumer Protection Claims', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Small Claims', url: '/services/small-claims' }, { name: 'Consumer Disputes', url: '/services/consumer-disputes' }],
    faqs: [
      { question: 'What is an unfair business practice?', answer: 'Under Consumer Protection Act: false representations, unconscionable conduct, negative option billing, failure to deliver.' },
      { question: 'Can I return defective products?', answer: 'Yes, you have rights under Sale of Goods Act for products that don\'t match descriptions or aren\'t fit for purpose.' }
    ,
      {
        question: 'What costs can I recover if I win?',
        answer: 'Filing fees, service costs, and portion of legal fees (up to 15% of claim). Interest on judgment also awarded. We pursue full cost recovery.'
      }
    
    ,
      {
        question: 'Can I sue someone who lives in another province?',
        answer: 'Yes, if the contract was formed in Ontario or the incident occurred here. Service and enforcement across provinces can be more complex. We advise on your options.'
      }
    ]
  },

  '/services/personal-injury-claims': {
    title: 'Personal Injury Claims | Small Claims | London Ontario',
    description: 'Personal injury claims under $50,000. Slip and fall, minor injuries.',
    keywords: 'personal injury small claims, slip and fall, injury compensation',
    schema: { type: 'LegalService', name: 'Personal Injury', serviceType: 'Personal Injury Claims', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Small Claims', url: '/services/small-claims' }, { name: 'Personal Injury', url: '/services/personal-injury-claims' }],
    faqs: [
      { question: 'Can I claim injury in Small Claims?', answer: 'Yes, for injuries with damages under $50,000. Serious injuries may need Superior Court.' },
      { question: 'What can I recover?', answer: 'Medical expenses, lost wages, out-of-pocket costs, and general damages for pain and suffering.' }
    ,
      {
        question: 'What costs can I recover if I win?',
        answer: 'Filing fees, service costs, and portion of legal fees (up to 15% of claim). Interest on judgment also awarded. We pursue full cost recovery.'
      }
    
    ,
      {
        question: 'How do I serve documents on the other party?',
        answer: 'Documents can be served by mail, courier, personal service, or alternative methods approved by the court. Proper service is essential - we ensure it is done correctly.'
      }
    ]
  },

  '/services/home-improvement-disputes': {
    title: 'Home Improvement Disputes | Contractor Problems | London Ontario',
    description: 'Home improvement disputes. Bad contractors, incomplete work, renovation problems.',
    keywords: 'contractor dispute, bad contractor claim, renovation problem',
    schema: { type: 'LegalService', name: 'Contractor Disputes', serviceType: 'Home Improvement Claims', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Small Claims', url: '/services/small-claims' }, { name: 'Home Improvement', url: '/services/home-improvement-disputes' }],
    faqs: [
      { question: 'What if my contractor did poor work?', answer: 'Document defects with photos, get repair estimates. Send written complaint. Sue for repair costs if unresolved.' },
      { question: 'Can I sue for incomplete work?', answer: 'Yes. Recover amounts paid for work not done, cost to complete, and delay damages.' }
    ,
      {
        question: 'What costs can I recover if I win?',
        answer: 'Filing fees, service costs, and portion of legal fees (up to 15% of claim). Interest on judgment also awarded. We pursue full cost recovery.'
      }
    
    ,
      {
        question: 'What happens at a settlement conference?',
        answer: 'A deputy judge reviews both sides and encourages settlement. Many cases resolve here. If not, trial is scheduled. We prepare you thoroughly for both outcomes.'
      }
    ]
  },

  '/services/vehicle-purchase-disputes': {
    title: 'Vehicle Purchase Disputes | Lemon Car | London Ontario',
    description: 'Vehicle purchase disputes. Lemon cars, undisclosed damage, misrepresented vehicles.',
    keywords: 'lemon car ontario, vehicle purchase dispute, used car complaint',
    schema: { type: 'LegalService', name: 'Vehicle Disputes', serviceType: 'Vehicle Purchase Claims', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Small Claims', url: '/services/small-claims' }, { name: 'Vehicle Disputes', url: '/services/vehicle-purchase-disputes' }],
    faqs: [
      { question: 'What if I bought a lemon?', answer: 'Document problems. OMVIC dealers have disclosure obligations. You may be entitled to rescission or damages.' },
      { question: 'Must dealers disclose damage?', answer: 'Yes, registered dealers must disclose accident history, salvage titles, previous taxi/rental use, odometer issues.' }
    ,
      {
        question: 'What costs can I recover if I win?',
        answer: 'Filing fees, service costs, and portion of legal fees (up to 15% of claim). Interest on judgment also awarded. We pursue full cost recovery.'
      }
    
    ,
      {
        question: 'Can I sue someone who lives in another province?',
        answer: 'Yes, if the contract was formed in Ontario or the incident occurred here. Service and enforcement across provinces can be more complex. We advise on your options.'
      }
    ]
  },

  '/services/neighbour-disputes': {
    title: 'Neighbour Disputes | Property Line Issues | London Ontario',
    description: 'Neighbour disputes. Property lines, fences, trees, noise, trespass.',
    keywords: 'neighbour dispute, property line conflict, fence dispute, tree damage',
    schema: { type: 'LegalService', name: 'Neighbour Disputes', serviceType: 'Property Dispute Resolution', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Small Claims', url: '/services/small-claims' }, { name: 'Neighbour Disputes', url: '/services/neighbour-disputes' }],
    faqs: [
      { question: 'Can I sue for tree damage?', answer: 'Yes, if a neighbour\'s tree damages your property. You can recover repair costs.' },
      { question: 'Who pays for boundary fences?', answer: 'Costs are generally split equally under the Line Fences Act. Municipal fence-viewing resolves disputes.' }
    ,
      {
        question: 'What costs can I recover if I win?',
        answer: 'Filing fees, service costs, and portion of legal fees (up to 15% of claim). Interest on judgment also awarded. We pursue full cost recovery.'
      }
    
    ,
      {
        question: 'How do I serve documents on the other party?',
        answer: 'Documents can be served by mail, courier, personal service, or alternative methods approved by the court. Proper service is essential - we ensure it is done correctly.'
      }
    ]
  },

  '/services/return-of-property': {
    title: 'Return of Property | Get Belongings Back | London Ontario',
    description: 'Recover personal belongings through Small Claims Court.',
    keywords: 'return of property, get belongings back, conversion claim',
    schema: { type: 'LegalService', name: 'Property Recovery', serviceType: 'Return of Property Claims', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Small Claims', url: '/services/small-claims' }, { name: 'Return of Property', url: '/services/return-of-property' }],
    faqs: [
      { question: 'Can I sue to get property back?', answer: 'Yes, a claim for conversion or detinue can recover property wrongfully held by others.' },
      { question: 'My ex won\'t return belongings?', answer: 'Send written demand. File in Small Claims Court listing items and values. Court can order return or compensation.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ,
      {
        question: 'What costs can I recover if I win?',
        answer: 'Filing fees, service costs, and portion of legal fees (up to 15% of claim). Interest on judgment also awarded. We pursue full cost recovery.'
      }
    ]
  },

  '/services/breach-of-warranty': {
    title: 'Breach of Warranty | Product Warranty Claims | London Ontario',
    description: 'Warranty not honored? Breach of warranty claims for product and service warranties.',
    keywords: 'breach of warranty, warranty claim, product warranty dispute',
    schema: { type: 'LegalService', name: 'Warranty Claims', serviceType: 'Warranty Dispute Resolution', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Small Claims', url: '/services/small-claims' }, { name: 'Warranty Claims', url: '/services/breach-of-warranty' }],
    faqs: [
      { question: 'What if warranty isn\'t honored?', answer: 'Document the defect and claim attempts. Send formal demand. File in Small Claims with warranty and proof of defect.' },
      { question: 'Are there implied warranties?', answer: 'Yes. Sale of Goods Act implies warranties for merchantable quality and fitness for purpose even without written guarantees.' }
    ,
      {
        question: 'What costs can I recover if I win?',
        answer: 'Filing fees, service costs, and portion of legal fees (up to 15% of claim). Interest on judgment also awarded. We pursue full cost recovery.'
      }
    
    ,
      {
        question: 'What happens at a settlement conference?',
        answer: 'A deputy judge reviews both sides and encourages settlement. Many cases resolve here. If not, trial is scheduled. We prepare you thoroughly for both outcomes.'
      }
    ]
  },

  '/services/loan-recovery': {
    title: 'Loan Recovery | Personal Loan Collection | London Ontario',
    description: 'Personal loan recovery. Friends, family who won\'t repay loans.',
    keywords: 'personal loan recovery, lent money not repaid, loan collection',
    schema: { type: 'LegalService', name: 'Loan Recovery', serviceType: 'Personal Loan Collection', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Small Claims', url: '/services/small-claims' }, { name: 'Loan Recovery', url: '/services/loan-recovery' }],
    faqs: [
      { question: 'Can I sue to recover a personal loan?', answer: 'Yes, even without written agreement. Prove: money transferred, it was a loan, repayment terms, and failure to repay.' },
      { question: 'How do I prove it was a loan?', answer: 'Any agreement or IOU, texts about repayment, partial payments, and the amount and relationship all help prove it wasn\'t a gift.' }
    ,
      {
        question: 'What costs can I recover if I win?',
        answer: 'Filing fees, service costs, and portion of legal fees (up to 15% of claim). Interest on judgment also awarded. We pursue full cost recovery.'
      }
    
    ,
      {
        question: 'Can I sue someone who lives in another province?',
        answer: 'Yes, if the contract was formed in Ontario or the incident occurred here. Service and enforcement across provinces can be more complex. We advise on your options.'
      }
    ]
  },

  '/services/tenant-damage-claims': {
    title: 'Tenant Damage Claims | Landlord Recovery | London Ontario',
    description: 'Tenant damaged rental property? Recover through Small Claims Court.',
    keywords: 'tenant damage claim, landlord property damage, sue tenant',
    schema: { type: 'LegalService', name: 'Tenant Damage Claims', serviceType: 'Landlord Damage Recovery', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Small Claims', url: '/services/small-claims' }, { name: 'Tenant Damage', url: '/services/tenant-damage-claims' }],
    faqs: [
      { question: 'How do I sue a tenant for damages?', answer: 'Document damage with photos immediately. Get repair estimates. File in Small Claims Court (not LTB for former tenants).' },
      { question: 'Can I deduct from last month\'s rent?', answer: 'No. In Ontario, you cannot deduct damages from rent deposit. You must sue in Small Claims Court separately.' }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    
    ,
      {
        question: 'Can I bring a lawyer to my LTB hearing?',
        answer: 'You can bring a lawyer or licensed paralegal. Paralegals are often more cost-effective for LTB matters and have the same rights of representation as lawyers at this tribunal.'
      }
    ]
  },

  '/services/wrongful-dismissal-claims': {
    title: 'Wrongful Dismissal Claims | Small Claims | London Ontario',
    description: 'Wrongful dismissal claims under $50,000. Fired without proper notice or severance.',
    keywords: 'wrongful dismissal small claims, fired without notice, termination pay claim',
    schema: { type: 'LegalService', name: 'Wrongful Dismissal', serviceType: 'Employment Termination Claims', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Small Claims', url: '/services/small-claims' }, { name: 'Wrongful Dismissal', url: '/services/wrongful-dismissal-claims' }],
    faqs: [
      { question: 'What is wrongful dismissal?', answer: 'Termination without proper notice or pay in lieu. Employees are entitled to reasonable notice based on age, service, position.' },
      { question: 'How much notice am I entitled to?', answer: 'ESA minimums: 1 week per year up to 8 weeks. Common law is often more - roughly 1 month per year of service.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ,
      {
        question: 'Can I be fired without cause in Ontario?',
        answer: 'Yes, but you are entitled to notice or pay in lieu. The amount depends on length of service, age, position, and other factors. We assess your full entitlement.'
      }
    ]
  },

  '/services/professional-negligence': {
    title: 'Professional Negligence | Malpractice Claims | London Ontario',
    description: 'Professional negligence claims. Accountant errors, contractor negligence under $50,000.',
    keywords: 'professional negligence, malpractice claim, accountant error',
    schema: { type: 'LegalService', name: 'Professional Negligence', serviceType: 'Malpractice Claims', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Small Claims', url: '/services/small-claims' }, { name: 'Professional Negligence', url: '/services/professional-negligence' }],
    faqs: [
      { question: 'What is professional negligence?', answer: 'When a professional fails to meet the standard of care expected in their profession, causing financial loss.' },
      { question: 'Can I sue my accountant?', answer: 'Yes, if their errors caused financial loss - missed deductions, penalties, bad advice leading to losses.' }
    ,
      {
        question: 'What costs can I recover if I win?',
        answer: 'Filing fees, service costs, and portion of legal fees (up to 15% of claim). Interest on judgment also awarded. We pursue full cost recovery.'
      }
    
    ,
      {
        question: 'How do I serve documents on the other party?',
        answer: 'Documents can be served by mail, courier, personal service, or alternative methods approved by the court. Proper service is essential - we ensure it is done correctly.'
      }
    ]
  },

  '/services/defamation-slander': {
    title: 'Defamation and Slander | Reputation Claims | London Ontario',
    description: 'Defamation claims. Slander, libel, false statements damaging reputation.',
    keywords: 'defamation claim, slander lawsuit, libel claim, reputation damage',
    schema: { type: 'LegalService', name: 'Defamation Claims', serviceType: 'Defamation Legal Representation', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Small Claims', url: '/services/small-claims' }, { name: 'Defamation', url: '/services/defamation-slander' }],
    faqs: [
      { question: 'What is defamation?', answer: 'A false statement of fact harming reputation. Libel is written; slander is spoken. Must be false, communicated to others, and cause damage.' },
      { question: 'Can I sue for social media posts?', answer: 'Yes. False statements online are defamation. Screenshot and preserve evidence. Opinions and true statements are protected.' }
    ,
      {
        question: 'What costs can I recover if I win?',
        answer: 'Filing fees, service costs, and portion of legal fees (up to 15% of claim). Interest on judgment also awarded. We pursue full cost recovery.'
      }
    
    ,
      {
        question: 'What happens at a settlement conference?',
        answer: 'A deputy judge reviews both sides and encourages settlement. Many cases resolve here. If not, trial is scheduled. We prepare you thoroughly for both outcomes.'
      }
    ]
  },

  // ============================================
  // HUMAN RIGHTS TRIBUNAL - MAIN & SUB-PAGES (8 pages)
  // ============================================
  '/services/human-rights-tribunal': {
    title: 'Human Rights Tribunal | HRTO Applications | London Ontario',
    description: 'Human Rights Tribunal representation in London, Ontario. Discrimination complaints, workplace harassment, housing discrimination. Free consultation.',
    keywords: 'human rights tribunal ontario, HRTO application, discrimination complaint, harassment claim',
    schema: { type: 'LegalService', name: 'Human Rights Services', serviceType: 'HRTO Legal Representation', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Human Rights', url: '/services/human-rights-tribunal' }],
    faqs: [
      { question: 'What is the Human Rights Tribunal of Ontario?', answer: 'The HRTO hears complaints about discrimination under the Ontario Human Rights Code in employment, housing, services, contracts, and unions based on protected grounds.' },
      { question: 'How long do I have to file an HRTO complaint?', answer: 'You must file within 1 year of the last incident of discrimination. In exceptional circumstances, late applications may be accepted.' },
      { question: 'What compensation can I get from HRTO?', answer: 'HRTO can award: monetary compensation for injury to dignity, lost wages, out-of-pocket expenses, and order policy changes or training.' }
    ,
      {
        question: 'What remedies can the HRTO award?',
        answer: 'Monetary compensation for lost wages and dignity injury, policy changes, required training, reinstatement. We pursue maximum appropriate remedies.'
      }
    ]
  },

  '/services/workplace-discrimination': {
    title: 'Workplace Discrimination | Employment Human Rights | London Ontario',
    description: 'Workplace discrimination claims in London, Ontario. Race, gender, disability, age discrimination at work. HRTO representation.',
    keywords: 'workplace discrimination ontario, employment discrimination, work harassment claim',
    schema: { type: 'LegalService', name: 'Workplace Discrimination', serviceType: 'Employment Discrimination Claims', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Human Rights', url: '/services/human-rights' }, { name: 'Workplace Discrimination', url: '/services/workplace-discrimination' }],
    faqs: [
      { question: 'What is workplace discrimination?', answer: 'Unfair treatment at work based on protected grounds: race, ancestry, place of origin, colour, ethnic origin, citizenship, creed, sex, sexual orientation, gender identity, age, disability, family status, or marital status.' },
      { question: 'Can I file HRTO while still employed?', answer: 'Yes. Your employer cannot retaliate against you for filing. Reprisal for human rights complaints is itself a violation of the Code.' }
    ,
      {
        question: 'What remedies can the HRTO award?',
        answer: 'Monetary compensation for lost wages and dignity injury, policy changes, required training, reinstatement. We pursue maximum appropriate remedies.'
      }
    ,
      {
        question: 'How long do HRTO cases take?',
        answer: 'Process typically takes 1-2 years from filing to hearing. Mediation offered and can resolve faster. We work for best outcome in shortest time.'
      }
    ]
  },

  '/services/housing-discrimination': {
    title: 'Housing Discrimination | Rental Discrimination | London Ontario',
    description: 'Housing discrimination claims in London. Denied housing based on race, family status, disability, income source. HRTO representation.',
    keywords: 'housing discrimination ontario, rental discrimination, denied apartment, landlord discrimination',
    schema: { type: 'LegalService', name: 'Housing Discrimination', serviceType: 'Housing Discrimination Claims', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Human Rights', url: '/services/human-rights' }, { name: 'Housing Discrimination', url: '/services/housing-discrimination' }],
    faqs: [
      { question: 'Can a landlord refuse to rent to families with children?', answer: 'No. Discrimination based on family status (having children) is prohibited. Landlords cannot refuse families, require higher deposits, or impose different terms.' },
      { question: 'Is refusing tenants on social assistance discrimination?', answer: 'Yes. Receipt of public assistance is a protected ground under the Code. Landlords cannot refuse applicants simply because they receive Ontario Works or ODSP.' }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    
    ,
      {
        question: 'What if my landlord or tenant does not follow the LTB order?',
        answer: 'You can file a motion to enforce the order or contact the Sheriff for eviction enforcement. Continued violations may result in contempt proceedings or additional compensation.'
      }
    ]
  },

  '/services/disability-accommodation': {
    title: 'Disability Accommodation | Accessibility Rights | London Ontario',
    description: 'Disability accommodation claims in London. Workplace accommodations, service accessibility. Duty to accommodate.',
    keywords: 'disability accommodation ontario, workplace accessibility, duty to accommodate, AODA claims',
    schema: { type: 'LegalService', name: 'Disability Accommodation', serviceType: 'Accessibility Rights Claims', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Human Rights', url: '/services/human-rights' }, { name: 'Disability Accommodation', url: '/services/disability-accommodation' }],
    faqs: [
      { question: 'What is duty to accommodate?', answer: 'Employers, landlords, and service providers must accommodate disabilities to the point of undue hardship. This includes modified duties, equipment, schedules, or physical accessibility.' },
      { question: 'What if my employer refuses accommodations?', answer: 'If your employer refuses reasonable accommodation without demonstrating undue hardship, you may have grounds for an HRTO complaint.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ,
      {
        question: 'What remedies can the HRTO award?',
        answer: 'Monetary compensation for lost wages and dignity injury, policy changes, required training, reinstatement. We pursue maximum appropriate remedies.'
      }
    ]
  },

  '/services/sexual-harassment': {
    title: 'Sexual Harassment Claims | Workplace Harassment | London Ontario',
    description: 'Sexual harassment claims in London, Ontario. Workplace harassment, hostile environment, quid pro quo harassment. HRTO representation.',
    keywords: 'sexual harassment claim ontario, workplace harassment, hostile work environment, harassment complaint',
    schema: { type: 'LegalService', name: 'Sexual Harassment Claims', serviceType: 'Harassment Legal Representation', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Human Rights', url: '/services/human-rights' }, { name: 'Sexual Harassment', url: '/services/sexual-harassment' }],
    faqs: [
      { question: 'What constitutes sexual harassment?', answer: 'Unwelcome conduct of a sexual nature: comments, jokes, touching, requests for sexual favors, displaying sexual material, or any conduct creating a hostile environment based on sex.' },
      { question: 'Can I file if the harasser wasn\'t my boss?', answer: 'Yes. Employers are responsible for harassment by co-workers, supervisors, clients, or customers if they knew or should have known and failed to address it.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    ]
  },

  '/services/age-discrimination': {
    title: 'Age Discrimination | Employment Age Rights | London Ontario',
    description: 'Age discrimination claims in London, Ontario. Workplace ageism, mandatory retirement, hiring discrimination based on age.',
    keywords: 'age discrimination ontario, workplace ageism, older worker discrimination, age rights employment',
    schema: { type: 'LegalService', name: 'Age Discrimination', serviceType: 'Age Discrimination Claims', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Human Rights', url: '/services/human-rights' }, { name: 'Age Discrimination', url: '/services/age-discrimination' }],
    faqs: [
      { question: 'Can employers discriminate based on age?', answer: 'No. Age is a protected ground for persons 18 and over. Employers cannot refuse to hire, terminate, or treat employees differently because of age.' },
      { question: 'Is mandatory retirement legal in Ontario?', answer: 'Generally no. Mandatory retirement was abolished in Ontario in 2006 with limited exceptions for certain professions like firefighters and police.' }
    ,
      {
        question: 'What remedies can the HRTO award?',
        answer: 'Monetary compensation for lost wages and dignity injury, policy changes, required training, reinstatement. We pursue maximum appropriate remedies.'
      }
    
    ,
      {
        question: 'Can I file anonymously with the HRTO?',
        answer: 'No, applications are not anonymous. However, the Tribunal can order publication bans or use initials in certain circumstances to protect privacy.'
      }
    ]
  },

  '/services/pregnancy-discrimination': {
    title: 'Pregnancy Discrimination | Maternity Rights | London Ontario',
    description: 'Pregnancy discrimination claims in London. Fired for pregnancy, denied maternity leave, workplace pregnancy discrimination.',
    keywords: 'pregnancy discrimination ontario, maternity leave rights, fired while pregnant, pregnancy workplace',
    schema: { type: 'LegalService', name: 'Pregnancy Discrimination', serviceType: 'Maternity Rights Claims', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Human Rights', url: '/services/human-rights' }, { name: 'Pregnancy Discrimination', url: '/services/pregnancy-discrimination' }],
    faqs: [
      { question: 'Can I be fired for being pregnant?', answer: 'No. Terminating employment due to pregnancy is discrimination based on sex. Employers must accommodate pregnancy-related needs and cannot penalize pregnant employees.' },
      { question: 'What if I was fired right before maternity leave?', answer: 'Termination shortly before planned leave may indicate discrimination. Employers must have legitimate, non-discriminatory reasons documented before any termination.' }
    ,
      {
        question: 'What remedies can the HRTO award?',
        answer: 'Monetary compensation for lost wages and dignity injury, policy changes, required training, reinstatement. We pursue maximum appropriate remedies.'
      }
    
    ,
      {
        question: 'Do I need witnesses for my HRTO hearing?',
        answer: 'Witness testimony strengthens your case but is not always required. Documents, emails, and your own testimony can be sufficient. We advise on evidence strategy.'
      }
    ]
  },

  '/services/service-discrimination': {
    title: 'Service Discrimination | Denied Service | London Ontario',
    description: 'Service discrimination claims in London. Denied service, refused entry, discriminatory treatment by businesses.',
    keywords: 'service discrimination ontario, denied service, refused entry, business discrimination',
    schema: { type: 'LegalService', name: 'Service Discrimination', serviceType: 'Service Discrimination Claims', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Human Rights', url: '/services/human-rights' }, { name: 'Service Discrimination', url: '/services/service-discrimination' }],
    faqs: [
      { question: 'Can a business refuse to serve me?', answer: 'Businesses cannot refuse service based on protected grounds: race, disability, religion, sexual orientation, etc. They can refuse for legitimate reasons like dress codes applied equally.' },
      { question: 'What if a store follows me because of my race?', answer: 'Racial profiling by retail staff is discrimination in services. Document incidents, note witnesses, and consider filing an HRTO application.' }
    ,
      {
        question: 'What remedies can the HRTO award?',
        answer: 'Monetary compensation for lost wages and dignity injury, policy changes, required training, reinstatement. We pursue maximum appropriate remedies.'
      }
    
    ,
      {
        question: 'What if my employer offers to settle?',
        answer: 'Settlement offers should be carefully evaluated. Consider the amount, terms, confidentiality requirements, and tax implications. We help negotiate fair settlements.'
      }
    ]
  },

  '/services/reprisal-claims': {
    title: 'Reprisal Claims | Human Rights Retaliation | London Ontario',
    description: 'Human rights reprisal claims in London. Retaliated against for filing complaint or participating in investigation.',
    keywords: 'reprisal claim ontario, human rights retaliation, fired for complaint, whistleblower protection',
    schema: { type: 'LegalService', name: 'Reprisal Claims', serviceType: 'Retaliation Claims', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Human Rights', url: '/services/human-rights' }, { name: 'Reprisal Claims', url: '/services/reprisal-claims' }],
    faqs: [
      { question: 'What is reprisal under the Human Rights Code?', answer: 'Reprisal is any negative action against someone for claiming rights, refusing to violate the Code, or participating in human rights proceedings. It\'s a separate violation.' },
      { question: 'Can I be fired for filing an HRTO complaint?', answer: 'No. Terminating someone for filing a complaint is reprisal and a separate Code violation. You can add a reprisal claim to your application or file a new one.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ,
      {
        question: 'How much does this service cost?',
        answer: 'Fees vary by service complexity. We offer free consultations to assess your matter and provide transparent, upfront pricing with no hidden costs.'
      }
    ]
  },

  // ============================================
  // EMPLOYMENT ISSUES - SUB-PAGES (4 pages)
  // ============================================
  '/services/employment-issues': {
    title: 'Employment Issues | Workplace Legal Help | London Ontario',
    description: 'Employment law services in London, Ontario. Wrongful termination, unpaid wages, severance disputes. Employee representation.',
    keywords: 'employment lawyer london, workplace legal help, employee rights ontario, termination dispute',
    schema: { type: 'LegalService', name: 'Employment Services', serviceType: 'Employment Legal Representation', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Employment Issues', url: '/services/employment-issues' }],
    faqs: [
      { question: 'What employment issues can a paralegal help with?', answer: 'Paralegals can assist with: Small Claims Court employment claims under $50,000, HRTO discrimination complaints, Ministry of Labour complaints, and employment standards issues.' },
      { question: 'When should I contact an employment lawyer instead?', answer: 'For wrongful dismissal claims over $50,000, complex contract disputes, or senior executive packages, a lawyer may be more appropriate. We can refer you if needed.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ,
      {
        question: 'Can I be fired without cause in Ontario?',
        answer: 'Yes, but you are entitled to notice or pay in lieu. The amount depends on length of service, age, position, and other factors. We assess your full entitlement.'
      }
    ]
  },

  '/services/wrongful-termination': {
    title: 'Wrongful Termination | Fired Unfairly | London Ontario',
    description: 'Wrongful termination help in London, Ontario. Fired without cause or proper notice. Know your rights and options.',
    keywords: 'wrongful termination ontario, fired unfairly, termination without cause, employee termination rights',
    schema: { type: 'LegalService', name: 'Wrongful Termination', serviceType: 'Termination Claims', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Employment Issues', url: '/services/employment-issues' }, { name: 'Wrongful Termination', url: '/services/wrongful-termination' }],
    faqs: [
      { question: 'What is wrongful termination?', answer: 'Termination without proper notice or pay in lieu, or for illegal reasons (discrimination, reprisal). Employees are entitled to reasonable notice based on service, age, and position.' },
      { question: 'Can I be fired without cause in Ontario?', answer: 'Yes, but the employer must provide proper notice or pay. The amount depends on ESA minimums (up to 8 weeks) and common law entitlements (often much more).' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    
    ,
      {
        question: 'Can I record conversations with my employer?',
        answer: 'In Ontario, one-party consent allows you to record conversations you participate in. However, company policies and strategic considerations apply. We advise on best practices.'
      }
    ]
  },

  '/services/unpaid-wages': {
    title: 'Unpaid Wages | Recover Wages Owed | London Ontario',
    description: 'Recover unpaid wages in London, Ontario. Owed money by employer, unpaid overtime, vacation pay, commissions.',
    keywords: 'unpaid wages ontario, recover wages owed, employer owes money, unpaid overtime',
    schema: { type: 'LegalService', name: 'Unpaid Wages', serviceType: 'Wage Recovery', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Employment Issues', url: '/services/employment-issues' }, { name: 'Unpaid Wages', url: '/services/unpaid-wages' }],
    faqs: [
      { question: 'How do I recover unpaid wages?', answer: 'File a Ministry of Labour complaint (free) for ESA violations, or sue in Small Claims Court for larger claims or matters outside ESA. We can help with either.' },
      { question: 'How long do I have to claim unpaid wages?', answer: 'Ministry of Labour claims must be filed within 2 years. Small Claims Court has a 2-year limitation. Act quickly to preserve your rights.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ,
      {
        question: 'Can I be fired without cause in Ontario?',
        answer: 'Yes, but you are entitled to notice or pay in lieu. The amount depends on length of service, age, position, and other factors. We assess your full entitlement.'
      }
    ]
  },

  '/services/severance-pay': {
    title: 'Severance Pay | Termination Pay | London Ontario',
    description: 'Severance pay disputes in London, Ontario. Calculate your entitlements, negotiate better severance packages.',
    keywords: 'severance pay ontario, termination pay, severance calculation, severance negotiation',
    schema: { type: 'LegalService', name: 'Severance Pay', serviceType: 'Severance Disputes', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Employment Issues', url: '/services/employment-issues' }, { name: 'Severance Pay', url: '/services/severance-pay' }],
    faqs: [
      { question: 'How is severance pay calculated?', answer: 'ESA severance: 1 week per year of service (if employed 5+ years and employer has $2.5M+ payroll). Common law notice is separate and often much higher based on multiple factors.' },
      { question: 'Should I sign my severance package?', answer: 'Never sign immediately. You typically have time to review. Many initial offers are below entitlements. Get advice before signing away your rights.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ,
      {
        question: 'How much does this service cost?',
        answer: 'Fees vary by service complexity. We offer free consultations to assess your matter and provide transparent, upfront pricing with no hidden costs.'
      }
    ]
  },

  '/services/constructive-dismissal': {
    title: 'Constructive Dismissal | Forced to Quit | London Ontario',
    description: 'Constructive dismissal claims in London. Employer changed job significantly, hostile work environment, forced resignation.',
    keywords: 'constructive dismissal ontario, forced to quit, job changed significantly, hostile workplace quit',
    schema: { type: 'LegalService', name: 'Constructive Dismissal', serviceType: 'Constructive Dismissal Claims', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Employment Issues', url: '/services/employment-issues' }, { name: 'Constructive Dismissal', url: '/services/constructive-dismissal' }],
    faqs: [
      { question: 'What is constructive dismissal?', answer: 'When an employer makes fundamental changes to your job (pay cut, demotion, location change, hostile environment) that breach your contract, you may be entitled to treat it as termination.' },
      { question: 'Should I quit if I think I\'ve been constructively dismissed?', answer: 'Be careful. Consult us first. If you quit and the changes don\'t legally qualify, you may lose entitlements. We can assess whether the changes constitute constructive dismissal.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ,
      {
        question: 'Can I be fired without cause in Ontario?',
        answer: 'Yes, but you are entitled to notice or pay in lieu. The amount depends on length of service, age, position, and other factors. We assess your full entitlement.'
      }
    ]
  },

  // ============================================
  // CRIMINAL & PROVINCIAL OFFENCES (10 pages)
  // ============================================
  '/services/criminal-matters': {
    title: 'Criminal Matters | Summary Offences | London Ontario Paralegal',
    description: 'Criminal defence for summary conviction matters in London, Ontario. Minor criminal charges, theft under $5000, assault, mischief.',
    keywords: 'criminal paralegal london, summary offence defence, minor criminal charges, criminal lawyer alternative',
    schema: { type: 'LegalService', name: 'Criminal Defence', serviceType: 'Summary Conviction Defence', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Criminal Matters', url: '/services/criminal-matters' }],
    faqs: [
      { question: 'What criminal matters can a paralegal handle?', answer: 'Paralegals can defend summary conviction offences with maximum 6 months jail: theft under $5000, simple assault, mischief under $5000, causing a disturbance, and some drug offences.' },
      { question: 'Should I use a paralegal or lawyer for criminal charges?', answer: 'For summary offences, paralegals offer the same court representation at lower cost. For indictable or hybrid offences with potential jail over 6 months, you need a lawyer.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ,
      {
        question: 'Will I get a criminal record?',
        answer: 'Not necessarily. Many first offences qualify for diversion, discharges, or peace bonds that avoid a criminal record. We pursue the best outcome for your situation.'
      }
    ]
  },

  '/services/provincial-offences': {
    title: 'Provincial Offences | POA Matters | London Ontario',
    description: 'Provincial Offences Act defence in London, Ontario. Regulatory violations, municipal bylaws, provincial regulations.',
    keywords: 'provincial offence defence, POA matters london, regulatory violation, provincial court',
    schema: { type: 'LegalService', name: 'Provincial Offences', serviceType: 'POA Defence', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Provincial Offences', url: '/services/provincial-offences' }],
    faqs: [
      { question: 'What are provincial offences?', answer: 'Non-criminal violations of provincial laws: Highway Traffic Act, Liquor Licence Act, Trespass to Property, Fish and Wildlife Conservation Act, municipal bylaws, and regulatory statutes.' },
      { question: 'Can provincial offences go on my criminal record?', answer: 'No, provincial offences are not criminal and don\'t create a criminal record. However, they may appear on other records (driving abstract, regulatory databases) depending on the offence.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ,
      {
        question: 'How much does this service cost?',
        answer: 'Fees vary by service complexity. We offer free consultations to assess your matter and provide transparent, upfront pricing with no hidden costs.'
      }
    ]
  },

  '/services/theft-under-5000': {
    title: 'Theft Under $5000 Defence | Shoplifting | London Ontario',
    description: 'Theft under $5000 defence in London, Ontario. Shoplifting charges, petty theft, first-time offenders. Protect your record.',
    keywords: 'theft under 5000 defence, shoplifting lawyer london, petty theft charge, first time theft',
    schema: { type: 'LegalService', name: 'Theft Defence', serviceType: 'Theft Under $5000 Defence', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Criminal Matters', url: '/services/criminal-matters' }, { name: 'Theft Under $5000', url: '/services/theft-under-5000' }],
    faqs: [
      { question: 'What is the penalty for theft under $5000?', answer: 'As a summary offence: up to 6 months jail and/or $5,000 fine. First-time offenders rarely get jail. Diversion or conditional discharge may keep it off your record.' },
      { question: 'Can I avoid a criminal record for shoplifting?', answer: 'Often yes. Options include: diversion programs (charges withdrawn after completing conditions), absolute/conditional discharge, or acquittal at trial. We work to protect your record.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ,
      {
        question: 'Will I get a criminal record?',
        answer: 'Not necessarily. Many first offences qualify for diversion, discharges, or peace bonds that avoid a criminal record. We pursue the best outcome for your situation.'
      }
    ]
  },

  '/services/simple-assault': {
    title: 'Simple Assault Defence | Assault Charges | London Ontario',
    description: 'Simple assault defence in London, Ontario. Assault charges, self-defence claims, bar fights, domestic disputes.',
    keywords: 'assault defence london, simple assault charge, assault lawyer alternative, fight charge defence',
    schema: { type: 'LegalService', name: 'Assault Defence', serviceType: 'Simple Assault Defence', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Criminal Matters', url: '/services/criminal-matters' }, { name: 'Simple Assault', url: '/services/simple-assault' }],
    faqs: [
      { question: 'What is simple assault?', answer: 'Intentionally applying force to another person without consent, or attempting/threatening to do so. Does not require injury. Pushing, slapping, spitting, or threatening violence can all be assault.' },
      { question: 'What are defences to assault charges?', answer: 'Common defences: self-defence, defence of others, consent (some situations), accident, mistaken identity, or that the complainant\'s account is unreliable.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ,
      {
        question: 'How much does this service cost?',
        answer: 'Fees vary by service complexity. We offer free consultations to assess your matter and provide transparent, upfront pricing with no hidden costs.'
      }
    ]
  },

  '/services/mischief-under-5000': {
    title: 'Mischief Under $5000 Defence | Property Damage | London Ontario',
    description: 'Mischief under $5000 defence in London. Property damage charges, vandalism, graffiti. Criminal defence.',
    keywords: 'mischief under 5000, property damage charge, vandalism defence, graffiti charge',
    schema: { type: 'LegalService', name: 'Mischief Defence', serviceType: 'Mischief Under $5000 Defence', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Criminal Matters', url: '/services/criminal-matters' }, { name: 'Mischief Under $5000', url: '/services/mischief-under-5000' }],
    faqs: [
      { question: 'What is mischief under $5000?', answer: 'Willfully destroying, damaging, or interfering with property where damage is under $5000. Includes vandalism, graffiti, keying cars, breaking windows.' },
      { question: 'What are the penalties for mischief?', answer: 'Summary conviction: up to 6 months jail and/or $5,000 fine. Restitution to the victim is commonly ordered. Diversion may be available for first offenders.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ,
      {
        question: 'Will I get a criminal record?',
        answer: 'Not necessarily. Many first offences qualify for diversion, discharges, or peace bonds that avoid a criminal record. We pursue the best outcome for your situation.'
      }
    ]
  },

  '/services/peace-bond': {
    title: 'Peace Bond | Section 810 | London Ontario Paralegal',
    description: 'Peace bond applications and defence in London, Ontario. Section 810 recognizance, fear of injury, domestic situations.',
    keywords: 'peace bond ontario, section 810, fear of injury, restraining order alternative',
    schema: { type: 'LegalService', name: 'Peace Bond Services', serviceType: 'Peace Bond Representation', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Criminal Matters', url: '/services/criminal-matters' }, { name: 'Peace Bond', url: '/services/peace-bond' }],
    faqs: [
      { question: 'What is a peace bond?', answer: 'A court order requiring someone to keep the peace and be of good behaviour, often with conditions like no contact, staying away from locations, or no weapons. Usually lasts 12 months.' },
      { question: 'Is a peace bond a criminal conviction?', answer: 'No. A peace bond is not a criminal conviction and doesn\'t create a criminal record. However, breaching peace bond conditions is a criminal offence.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ,
      {
        question: 'How much does this service cost?',
        answer: 'Fees vary by service complexity. We offer free consultations to assess your matter and provide transparent, upfront pricing with no hidden costs.'
      }
    ]
  },

  '/services/bail-hearings': {
    title: 'Bail Hearings | Get Released | London Ontario Paralegal',
    description: 'Bail hearing representation in London, Ontario. Get released from custody, bail conditions, surety assistance.',
    keywords: 'bail hearing london, get released custody, bail conditions, surety bail',
    schema: { type: 'LegalService', name: 'Bail Hearing Services', serviceType: 'Bail Representation', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Criminal Matters', url: '/services/criminal-matters' }, { name: 'Bail Hearings', url: '/services/bail-hearings' }],
    faqs: [
      { question: 'What happens at a bail hearing?', answer: 'Crown explains why detention is justified. Defence argues for release with appropriate conditions. Justice decides on release, conditions, surety requirements, or detention.' },
      { question: 'What is a surety?', answer: 'Someone who pledges to supervise you and ensure you follow bail conditions. They may need to pledge money. Suitable sureties are usually family or close friends with no criminal record.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ,
      {
        question: 'Will I get a criminal record?',
        answer: 'Not necessarily. Many first offences qualify for diversion, discharges, or peace bonds that avoid a criminal record. We pursue the best outcome for your situation.'
      }
    ]
  },

  '/services/trespass-property': {
    title: 'Trespass to Property | Trespassing Charges | London Ontario',
    description: 'Trespass to Property Act defence in London. Trespassing charges, banned from property, fail to leave.',
    keywords: 'trespass charge ontario, trespassing defence, banned from property, fail to leave charge',
    schema: { type: 'LegalService', name: 'Trespass Defence', serviceType: 'Trespass Act Defence', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Provincial Offences', url: '/services/provincial-offences' }, { name: 'Trespass to Property', url: '/services/trespass-property' }],
    faqs: [
      { question: 'What is trespass to property?', answer: 'Entering premises when entry is prohibited, engaging in prohibited activities on premises, or failing to leave when directed. Includes being on property after being banned.' },
      { question: 'What are the penalties for trespassing?', answer: 'Fine up to $10,000. Not a criminal offence - it\'s provincial. However, repeated violations or trespass combined with other offences can have serious consequences.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ,
      {
        question: 'How much does this service cost?',
        answer: 'Fees vary by service complexity. We offer free consultations to assess your matter and provide transparent, upfront pricing with no hidden costs.'
      }
    ]
  },

  '/services/liquor-licence-act': {
    title: 'Liquor Licence Act | Alcohol Offences | London Ontario',
    description: 'Liquor Licence Act defence in London. Open alcohol, underage drinking, intoxication in public, serving violations.',
    keywords: 'liquor licence act ontario, open alcohol charge, underage drinking, public intoxication',
    schema: { type: 'LegalService', name: 'Liquor Act Defence', serviceType: 'Alcohol Offence Defence', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Provincial Offences', url: '/services/provincial-offences' }, { name: 'Liquor Licence Act', url: '/services/liquor-licence-act' }],
    faqs: [
      { question: 'What are common Liquor Licence Act charges?', answer: 'Having open liquor in public, being intoxicated in public, underage possession/consumption, supplying to minors, and over-service by licensed establishments.' },
      { question: 'Can I get a record for alcohol offences?', answer: 'LLA offences are provincial, not criminal. No criminal record. However, convictions may affect liquor licence applications and some employment.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    
    ,
      {
        question: 'Can I fight a ticket from another city?',
        answer: 'Yes, we handle tickets from courts across Southwestern Ontario. We appear on your behalf so you do not need to travel or take time off work.'
      }
    ]
  },

  '/services/municipal-bylaw': {
    title: 'Municipal Bylaw Defence | Bylaw Violations | London Ontario',
    description: 'Municipal bylaw defence in London. Noise bylaws, property standards, parking violations, business licensing.',
    keywords: 'bylaw defence london, municipal violation, noise bylaw, property standards',
    schema: { type: 'LegalService', name: 'Bylaw Defence', serviceType: 'Municipal Bylaw Defence', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Provincial Offences', url: '/services/provincial-offences' }, { name: 'Municipal Bylaws', url: '/services/municipal-bylaw' }],
    faqs: [
      { question: 'What are municipal bylaw offences?', answer: 'Violations of local rules: noise complaints, property maintenance, zoning violations, sign bylaws, animal control, business licensing, and parking.' },
      { question: 'Should I fight a bylaw ticket?', answer: 'Depends on the fine, circumstances, and defences available. Some violations carry ongoing compliance orders. We can assess whether fighting makes sense for your situation.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ,
      {
        question: 'How much does this service cost?',
        answer: 'Fees vary by service complexity. We offer free consultations to assess your matter and provide transparent, upfront pricing with no hidden costs.'
      }
    ]
  },

  '/services/regulatory-offences': {
    title: 'Regulatory Offences | Administrative Violations | London Ontario',
    description: 'Regulatory offence defence in London. Workplace safety, environmental violations, professional regulations.',
    keywords: 'regulatory offence ontario, administrative violation, OHSA charge, environmental offence',
    schema: { type: 'LegalService', name: 'Regulatory Defence', serviceType: 'Regulatory Offence Defence', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Provincial Offences', url: '/services/provincial-offences' }, { name: 'Regulatory Offences', url: '/services/regulatory-offences' }],
    faqs: [
      { question: 'What are regulatory offences?', answer: 'Violations of administrative regulations: occupational health and safety, environmental protection, employment standards, consumer protection, and professional licensing regulations.' },
      { question: 'Are regulatory offences serious?', answer: 'Yes. Unlike traffic tickets, many carry large fines ($50,000+), can affect professional licences, and some allow imprisonment. Defence is often critical.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ,
      {
        question: 'How much does this service cost?',
        answer: 'Fees vary by service complexity. We offer free consultations to assess your matter and provide transparent, upfront pricing with no hidden costs.'
      }
    ]
  },

  '/services/fail-to-comply': {
    title: 'Fail to Comply | Breach Conditions | London Ontario',
    description: 'Fail to comply defence in London. Breaching probation, bail conditions, court orders. Avoid additional charges.',
    keywords: 'fail to comply charge, breach conditions ontario, probation breach, bail breach',
    schema: { type: 'LegalService', name: 'Breach Defence', serviceType: 'Fail to Comply Defence', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Criminal Matters', url: '/services/criminal-matters' }, { name: 'Fail to Comply', url: '/services/fail-to-comply' }],
    faqs: [
      { question: 'What is fail to comply?', answer: 'Breaching conditions of bail, probation, conditional sentence, or court order. Even minor breaches can result in new criminal charges and detention.' },
      { question: 'What happens if I breach bail conditions?', answer: 'You can be arrested, charged with failure to comply (new criminal charge), and held for bail review. The new charge makes future release harder to obtain.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ,
      {
        question: 'How much does this service cost?',
        answer: 'Fees vary by service complexity. We offer free consultations to assess your matter and provide transparent, upfront pricing with no hidden costs.'
      }
    ]
  },

  // ============================================
  // LOCATION PAGES (21 pages)
  // ============================================
  '/london-paralegal': {
    title: 'London Paralegal | Legal Services London Ontario',
    description: 'Paralegal services in London, Ontario. Traffic tickets, landlord-tenant, small claims court, human rights. Local expertise. Free consultation.',
    keywords: 'paralegal london ontario, london lawyer alternative, legal services london, london court representation',
    schema: { type: 'LocalBusiness', name: 'LegalAssist London', areaServed: ['London', 'Middlesex County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'London Paralegal', url: '/london-paralegal' }],
    faqs: [
      { question: 'Where is LegalAssist located in London?', answer: 'We serve all of London and Middlesex County. We handle matters at London courts including the Ontario Court of Justice at 80 Dundas Street and Superior Court at 80 Dundas Street.' },
      { question: 'What courts do you cover in London?', answer: 'We appear at London Provincial Offences Court, Ontario Court of Justice, Superior Court of Justice, Small Claims Court, and Landlord and Tenant Board hearings for the London region.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'How far in advance should I contact you?',
        answer: 'Contact us as soon as possible. Many matters have strict deadlines. For traffic tickets, contact us immediately upon receiving the ticket to preserve all options.'
      }
    ]
  },

  '/st-thomas-paralegal': {
    title: 'St. Thomas Paralegal | Legal Services Elgin County',
    description: 'Paralegal services in St. Thomas and Elgin County. Traffic tickets, landlord-tenant, small claims. Local representation.',
    keywords: 'paralegal st thomas, elgin county legal services, st thomas traffic ticket, st thomas lawyer alternative',
    schema: { type: 'LocalBusiness', name: 'LegalAssist St. Thomas', areaServed: ['St. Thomas', 'Elgin County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'St. Thomas Paralegal', url: '/st-thomas-paralegal' }],
    faqs: [
      { question: 'Do you serve St. Thomas court?', answer: 'Yes, we regularly appear at St. Thomas courts for traffic tickets, provincial offences, and small claims matters serving all of Elgin County.' },
      { question: 'What areas near St. Thomas do you cover?', answer: 'We serve St. Thomas, Aylmer, Port Stanley, Central Elgin, and all surrounding communities in Elgin County.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'What should I bring to my first consultation?',
        answer: 'Bring all relevant documents: tickets, notices, leases, contracts, correspondence, photos, and a timeline of events. The more information, the better we can assess your case.'
      }
    ]
  },

  '/woodstock-paralegal': {
    title: 'Woodstock Paralegal | Legal Services Oxford County',
    description: 'Paralegal services in Woodstock and Oxford County. Traffic tickets, landlord-tenant, small claims court representation.',
    keywords: 'paralegal woodstock, oxford county legal services, woodstock traffic ticket, woodstock lawyer alternative',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Woodstock', areaServed: ['Woodstock', 'Oxford County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Woodstock Paralegal', url: '/woodstock-paralegal' }],
    faqs: [
      { question: 'Do you handle Woodstock court matters?', answer: 'Yes, we appear at Woodstock courthouse for traffic tickets, provincial offences, small claims, and other matters serving Oxford County.' },
      { question: 'What communities in Oxford County do you serve?', answer: 'We serve Woodstock, Ingersoll, Tillsonburg, Norwich, and all of Oxford County.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'Do you offer services in languages other than English?',
        answer: 'We primarily operate in English but can arrange interpreter services when needed. Contact us to discuss your language requirements.'
      }
    ]
  },

  '/ingersoll-paralegal': {
    title: 'Ingersoll Paralegal | Legal Services Ingersoll Ontario',
    description: 'Paralegal services in Ingersoll, Ontario. Traffic tickets, landlord-tenant disputes, small claims court. Local expertise.',
    keywords: 'paralegal ingersoll, ingersoll legal services, ingersoll traffic ticket, ingersoll lawyer',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Ingersoll', areaServed: ['Ingersoll', 'Oxford County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Ingersoll Paralegal', url: '/ingersoll-paralegal' }],
    faqs: [
      { question: 'Where are Ingersoll court matters heard?', answer: 'Most Ingersoll matters are heard at Woodstock courthouse. We handle all matters for Ingersoll residents throughout Oxford County courts.' },
      { question: 'Do you offer free consultations in Ingersoll?', answer: 'Yes, we offer free phone and video consultations for Ingersoll and area residents. In-person meetings available by appointment.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'How far in advance should I contact you?',
        answer: 'Contact us as soon as possible. Many matters have strict deadlines. For traffic tickets, contact us immediately upon receiving the ticket to preserve all options.'
      }
    ]
  },

  '/tillsonburg-paralegal': {
    title: 'Tillsonburg Paralegal | Legal Services Tillsonburg Ontario',
    description: 'Paralegal services in Tillsonburg, Ontario. Traffic tickets, landlord disputes, small claims court. Serving Oxford and Norfolk.',
    keywords: 'paralegal tillsonburg, tillsonburg legal services, tillsonburg traffic ticket',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Tillsonburg', areaServed: ['Tillsonburg', 'Oxford County', 'Norfolk County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Tillsonburg Paralegal', url: '/tillsonburg-paralegal' }],
    faqs: [
      { question: 'Do you serve Tillsonburg residents?', answer: 'Yes, we serve Tillsonburg and surrounding areas including parts of Oxford and Norfolk counties for all paralegal services.' },
      { question: 'Which court handles Tillsonburg matters?', answer: 'Tillsonburg matters are typically heard at Woodstock or Simcoe courthouses depending on the matter. We appear at both.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'What should I bring to my first consultation?',
        answer: 'Bring all relevant documents: tickets, notices, leases, contracts, correspondence, photos, and a timeline of events. The more information, the better we can assess your case.'
      }
    ]
  },

  '/aylmer-paralegal': {
    title: 'Aylmer Paralegal | Legal Services Aylmer Ontario',
    description: 'Paralegal services in Aylmer, Ontario. Traffic tickets, landlord-tenant, small claims court. Serving East Elgin.',
    keywords: 'paralegal aylmer, aylmer legal services, aylmer traffic ticket',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Aylmer', areaServed: ['Aylmer', 'Elgin County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Aylmer Paralegal', url: '/aylmer-paralegal' }],
    faqs: [
      { question: 'Do you handle Aylmer area legal matters?', answer: 'Yes, we serve Aylmer and surrounding East Elgin communities for traffic tickets, LTB matters, small claims, and provincial offences.' },
      { question: 'Where are Aylmer court matters heard?', answer: 'Aylmer matters are typically heard at St. Thomas courthouse. We regularly appear there for Elgin County matters.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'Do you offer services in languages other than English?',
        answer: 'We primarily operate in English but can arrange interpreter services when needed. Contact us to discuss your language requirements.'
      }
    ]
  },

  '/strathroy-chatham-paralegal': {
    title: 'Strathroy & Chatham Paralegal | Legal Services',
    description: 'Paralegal services in Strathroy, Chatham, and surrounding areas. Traffic tickets, landlord-tenant, small claims court.',
    keywords: 'paralegal strathroy, paralegal chatham, strathroy legal services, chatham traffic ticket',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Strathroy-Chatham', areaServed: ['Strathroy', 'Chatham-Kent', 'Middlesex County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Strathroy & Chatham Paralegal', url: '/strathroy-chatham-paralegal' }],
    faqs: [
      { question: 'Do you serve Strathroy and Chatham?', answer: 'Yes, we serve both Strathroy (Middlesex County) and Chatham-Kent for all paralegal services including traffic, LTB, and small claims.' },
      { question: 'Which courts handle these areas?', answer: 'Strathroy matters go to London or Sarnia courts. Chatham has its own courthouse where we regularly appear.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'How far in advance should I contact you?',
        answer: 'Contact us as soon as possible. Many matters have strict deadlines. For traffic tickets, contact us immediately upon receiving the ticket to preserve all options.'
      }
    ]
  },

  '/locations/kitchener': {
    title: 'Kitchener Paralegal | Legal Services Waterloo Region',
    description: 'Paralegal services in Kitchener-Waterloo. Traffic tickets, landlord-tenant, small claims court. Serving Waterloo Region.',
    keywords: 'paralegal kitchener, kitchener waterloo legal services, kitchener traffic ticket, waterloo region paralegal',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Kitchener', areaServed: ['Kitchener', 'Waterloo', 'Cambridge', 'Waterloo Region'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Kitchener', url: '/locations/kitchener' }],
    faqs: [
      { question: 'Do you appear at Kitchener court?', answer: 'Yes, we appear at Kitchener courthouse at 200 Frederick Street for traffic, provincial offences, small claims, and LTB matters.' },
      { question: 'What areas in Waterloo Region do you serve?', answer: 'We serve Kitchener, Waterloo, Cambridge, and all Waterloo Region communities including Elmira, New Hamburg, and Wellesley.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'What should I bring to my first consultation?',
        answer: 'Bring all relevant documents: tickets, notices, leases, contracts, correspondence, photos, and a timeline of events. The more information, the better we can assess your case.'
      }
    ]
  },

  '/locations/cambridge': {
    title: 'Cambridge Paralegal | Legal Services Cambridge Ontario',
    description: 'Paralegal services in Cambridge, Ontario. Traffic tickets, landlord-tenant, small claims. Waterloo Region representation.',
    keywords: 'paralegal cambridge ontario, cambridge legal services, cambridge traffic ticket',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Cambridge', areaServed: ['Cambridge', 'Waterloo Region'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Cambridge', url: '/locations/cambridge' }],
    faqs: [
      { question: 'Where are Cambridge court matters heard?', answer: 'Cambridge matters are typically heard at Kitchener courthouse. We handle all paralegal matters for Cambridge residents.' },
      { question: 'Do you serve Galt, Preston, and Hespeler?', answer: 'Yes, we serve all Cambridge communities including the former municipalities of Galt, Preston, and Hespeler.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'Do you offer services in languages other than English?',
        answer: 'We primarily operate in English but can arrange interpreter services when needed. Contact us to discuss your language requirements.'
      }
    ]
  },

  '/locations/guelph': {
    title: 'Guelph Paralegal | Legal Services Wellington County',
    description: 'Paralegal services in Guelph and Wellington County. Traffic tickets, landlord-tenant, small claims court representation.',
    keywords: 'paralegal guelph, guelph legal services, guelph traffic ticket, wellington county paralegal',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Guelph', areaServed: ['Guelph', 'Wellington County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Guelph', url: '/locations/guelph' }],
    faqs: [
      { question: 'Do you appear at Guelph courthouse?', answer: 'Yes, we appear at Guelph courthouse at 74 Woolwich Street for traffic, small claims, LTB, and provincial offence matters.' },
      { question: 'What Wellington County areas do you serve?', answer: 'We serve Guelph, Fergus, Elora, Mount Forest, and all of Wellington County.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'How far in advance should I contact you?',
        answer: 'Contact us as soon as possible. Many matters have strict deadlines. For traffic tickets, contact us immediately upon receiving the ticket to preserve all options.'
      }
    ]
  },

  '/locations/brantford': {
    title: 'Brantford Paralegal | Legal Services Brant County',
    description: 'Paralegal services in Brantford and Brant County. Traffic tickets, landlord-tenant, small claims court.',
    keywords: 'paralegal brantford, brantford legal services, brantford traffic ticket, brant county paralegal',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Brantford', areaServed: ['Brantford', 'Brant County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Brantford', url: '/locations/brantford' }],
    faqs: [
      { question: 'Do you handle Brantford court matters?', answer: 'Yes, we appear at Brantford courthouse at 70 Wellington Street for traffic tickets, small claims, LTB, and provincial offences.' },
      { question: 'What areas around Brantford do you serve?', answer: 'We serve Brantford, Paris, Burford, and all of Brant County.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'What should I bring to my first consultation?',
        answer: 'Bring all relevant documents: tickets, notices, leases, contracts, correspondence, photos, and a timeline of events. The more information, the better we can assess your case.'
      }
    ]
  },

  '/locations/stratford': {
    title: 'Stratford Paralegal | Legal Services Perth County',
    description: 'Paralegal services in Stratford and Perth County. Traffic tickets, landlord-tenant, small claims court representation.',
    keywords: 'paralegal stratford, stratford legal services, stratford traffic ticket, perth county paralegal',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Stratford', areaServed: ['Stratford', 'Perth County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Stratford', url: '/locations/stratford' }],
    faqs: [
      { question: 'Do you serve Stratford courthouse?', answer: 'Yes, we appear at Stratford courthouse for traffic, provincial offences, small claims, and LTB matters covering Perth County.' },
      { question: 'What Perth County communities do you serve?', answer: 'We serve Stratford, St. Marys, Mitchell, Listowel, and all of Perth County.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'Do you offer services in languages other than English?',
        answer: 'We primarily operate in English but can arrange interpreter services when needed. Contact us to discuss your language requirements.'
      }
    ]
  },

  '/locations/sarnia': {
    title: 'Sarnia Paralegal | Legal Services Lambton County',
    description: 'Paralegal services in Sarnia and Lambton County. Traffic tickets, landlord-tenant, small claims court.',
    keywords: 'paralegal sarnia, sarnia legal services, sarnia traffic ticket, lambton county paralegal',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Sarnia', areaServed: ['Sarnia', 'Lambton County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Sarnia', url: '/locations/sarnia' }],
    faqs: [
      { question: 'Do you appear at Sarnia court?', answer: 'Yes, we appear at Sarnia courthouse at 700 Christina Street North for traffic, small claims, LTB, and provincial offence matters.' },
      { question: 'What Lambton County areas do you serve?', answer: 'We serve Sarnia, Point Edward, Petrolia, Forest, and all of Lambton County.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'How far in advance should I contact you?',
        answer: 'Contact us as soon as possible. Many matters have strict deadlines. For traffic tickets, contact us immediately upon receiving the ticket to preserve all options.'
      }
    ]
  },

  '/locations/windsor': {
    title: 'Windsor Paralegal | Legal Services Essex County',
    description: 'Paralegal services in Windsor and Essex County. Traffic tickets, landlord-tenant, small claims court representation.',
    keywords: 'paralegal windsor, windsor legal services, windsor traffic ticket, essex county paralegal',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Windsor', areaServed: ['Windsor', 'Essex County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Windsor', url: '/locations/windsor' }],
    faqs: [
      { question: 'Do you serve Windsor courthouse?', answer: 'Yes, we appear at Windsor courthouse at 245 Windsor Avenue for traffic, small claims, LTB, and provincial offence matters.' },
      { question: 'What Essex County communities do you cover?', answer: 'We serve Windsor, LaSalle, Tecumseh, Lakeshore, Amherstburg, Leamington, and all of Essex County.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'What should I bring to my first consultation?',
        answer: 'Bring all relevant documents: tickets, notices, leases, contracts, correspondence, photos, and a timeline of events. The more information, the better we can assess your case.'
      }
    ]
  },

  '/locations/chatham-kent': {
    title: 'Chatham-Kent Paralegal | Legal Services Chatham Ontario',
    description: 'Paralegal services in Chatham-Kent. Traffic tickets, landlord-tenant, small claims court. Serving all of Chatham-Kent.',
    keywords: 'paralegal chatham kent, chatham legal services, chatham traffic ticket',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Chatham-Kent', areaServed: ['Chatham-Kent', 'Chatham', 'Wallaceburg', 'Ridgetown'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Chatham-Kent', url: '/locations/chatham-kent' }],
    faqs: [
      { question: 'Do you appear at Chatham court?', answer: 'Yes, we appear at Chatham courthouse for traffic, provincial offences, small claims, and LTB matters serving Chatham-Kent.' },
      { question: 'What areas of Chatham-Kent do you serve?', answer: 'We serve Chatham, Wallaceburg, Tilbury, Ridgetown, Blenheim, and all of Chatham-Kent municipality.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'Do you offer services in languages other than English?',
        answer: 'We primarily operate in English but can arrange interpreter services when needed. Contact us to discuss your language requirements.'
      }
    ]
  },

  '/locations/leamington': {
    title: 'Leamington Paralegal | Legal Services Leamington Ontario',
    description: 'Paralegal services in Leamington, Ontario. Traffic tickets, landlord-tenant, small claims. Essex County representation.',
    keywords: 'paralegal leamington, leamington legal services, leamington traffic ticket',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Leamington', areaServed: ['Leamington', 'Essex County', 'Kingsville'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Leamington', url: '/locations/leamington' }],
    faqs: [
      { question: 'Where are Leamington court matters heard?', answer: 'Leamington matters are typically heard at Windsor courthouse. We handle all paralegal matters for Leamington area residents.' },
      { question: 'Do you serve Kingsville and Wheatley?', answer: 'Yes, we serve Leamington, Kingsville, Wheatley, and surrounding Essex County communities.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'How far in advance should I contact you?',
        answer: 'Contact us as soon as possible. Many matters have strict deadlines. For traffic tickets, contact us immediately upon receiving the ticket to preserve all options.'
      }
    ]
  },

  '/locations/norfolk-county': {
    title: 'Norfolk County Paralegal | Legal Services Simcoe Ontario',
    description: 'Paralegal services in Norfolk County. Traffic tickets, landlord-tenant, small claims. Simcoe, Port Dover, Delhi.',
    keywords: 'paralegal norfolk county, simcoe legal services, port dover paralegal, norfolk traffic ticket',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Norfolk County', areaServed: ['Norfolk County', 'Simcoe', 'Port Dover', 'Delhi'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Norfolk County', url: '/locations/norfolk-county' }],
    faqs: [
      { question: 'Do you appear at Simcoe court?', answer: 'Yes, we appear at Simcoe courthouse for traffic, provincial offences, small claims, and LTB matters serving Norfolk County.' },
      { question: 'What Norfolk County communities do you serve?', answer: 'We serve Simcoe, Port Dover, Delhi, Port Rowan, Waterford, and all of Norfolk County.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'What should I bring to my first consultation?',
        answer: 'Bring all relevant documents: tickets, notices, leases, contracts, correspondence, photos, and a timeline of events. The more information, the better we can assess your case.'
      }
    ]
  },

  '/locations/huron-county': {
    title: 'Huron County Paralegal | Legal Services Goderich Ontario',
    description: 'Paralegal services in Huron County. Traffic tickets, landlord-tenant, small claims. Goderich, Clinton, Seaforth.',
    keywords: 'paralegal huron county, goderich legal services, huron county traffic ticket',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Huron County', areaServed: ['Huron County', 'Goderich', 'Clinton', 'Seaforth'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Huron County', url: '/locations/huron-county' }],
    faqs: [
      { question: 'Do you handle Huron County court matters?', answer: 'Yes, we appear at Goderich courthouse for traffic, provincial offences, small claims, and LTB matters serving Huron County.' },
      { question: 'What communities in Huron County do you serve?', answer: 'We serve Goderich, Clinton, Seaforth, Exeter, Wingham, and all of Huron County.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'Do you offer services in languages other than English?',
        answer: 'We primarily operate in English but can arrange interpreter services when needed. Contact us to discuss your language requirements.'
      }
    ]
  },

  // ============================================
  // GUIDE PAGES (11 pages)
  // ============================================
  '/guides/what-is-a-paralegal': {
    title: 'What is a Paralegal? | Paralegal vs Lawyer | Ontario Guide',
    description: 'Learn what paralegals do in Ontario. Licensed by the Law Society, paralegals provide affordable legal representation for many matters.',
    keywords: 'what is a paralegal ontario, paralegal vs lawyer, paralegal services explained, licensed paralegal',
    schema: { type: 'Article', name: 'What is a Paralegal?' },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Guides', url: '/services' }, { name: 'What is a Paralegal', url: '/guides/what-is-a-paralegal' }],
    faqs: [
      { question: 'What is a paralegal in Ontario?', answer: 'A licensed legal professional regulated by the Law Society of Ontario who can represent clients in specific matters: Small Claims Court, LTB, traffic tickets, HRTO, and summary criminal offences.' },
      { question: 'Are paralegals licensed?', answer: 'Yes, Ontario paralegals must be licensed by the Law Society of Ontario, complete approved education, pass exams, and maintain insurance and continuing education.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'How far in advance should I contact you?',
        answer: 'Contact us as soon as possible. Many matters have strict deadlines. For traffic tickets, contact us immediately upon receiving the ticket to preserve all options.'
      }
    ]
  },

  '/guides/paralegal-vs-lawyer': {
    title: 'Paralegal vs Lawyer | When to Use Each | Ontario Guide',
    description: 'Understand when to hire a paralegal versus a lawyer in Ontario. Compare costs, services, and expertise for your legal matter.',
    keywords: 'paralegal vs lawyer ontario, paralegal or lawyer, when to use paralegal, lawyer vs paralegal cost',
    schema: { type: 'Article', name: 'Paralegal vs Lawyer Guide' },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Guides', url: '/services' }, { name: 'Paralegal vs Lawyer', url: '/guides/paralegal-vs-lawyer' }],
    faqs: [
      { question: 'When should I use a paralegal instead of a lawyer?', answer: 'Use a paralegal for: traffic tickets, LTB matters, Small Claims Court (under $50,000), HRTO, and minor criminal matters. Use a lawyer for: serious criminal charges, family law, real estate, and claims over $50,000.' },
      { question: 'Are paralegals cheaper than lawyers?', answer: 'Generally yes. Paralegals typically charge $150-300/hour vs $300-600+ for lawyers. For matters within paralegal scope, you get equivalent representation at lower cost.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'What should I bring to my first consultation?',
        answer: 'Bring all relevant documents: tickets, notices, leases, contracts, correspondence, photos, and a timeline of events. The more information, the better we can assess your case.'
      }
    ]
  },

  '/guides/how-to-fight-traffic-ticket': {
    title: 'How to Fight a Traffic Ticket | Ontario Guide | LegalAssist',
    description: 'Step-by-step guide to fighting traffic tickets in Ontario. Learn your options, deadlines, and strategies for defending your ticket.',
    keywords: 'how to fight traffic ticket ontario, contest speeding ticket, fight ticket guide, traffic ticket options',
    schema: { type: 'Article', name: 'How to Fight a Traffic Ticket' },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Guides', url: '/services' }, { name: 'How to Fight Traffic Ticket', url: '/guides/how-to-fight-traffic-ticket' }],
    faqs: [
      { question: 'Should I fight my traffic ticket?', answer: 'Usually yes. Paying admits guilt, adds demerit points, and raises insurance. Fighting often results in reduced charges, dismissed tickets, or lower fines - often worth more than representation cost.' },
      { question: 'What are my options for a traffic ticket?', answer: 'Pay the fine (pleads guilty), request early resolution (meeting with prosecutor), or request trial. Option 2 or 3 gives opportunity to reduce or eliminate the charge.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    
    ,
      {
        question: 'What are the chances of winning my case?',
        answer: 'Success rates vary by offence and circumstances. Many traffic tickets have technical defences or negotiation opportunities. We assess your specific case during your free consultation.'
      }
    ]
  },

  '/guides/ontario-tenant-rights': {
    title: 'Ontario Tenant Rights | Complete Guide | LegalAssist',
    description: 'Know your rights as a tenant in Ontario. Rent increases, evictions, repairs, deposits, and more. Comprehensive tenant rights guide.',
    keywords: 'ontario tenant rights, tenant rights guide, renter rights ontario, landlord obligations',
    schema: { type: 'Article', name: 'Ontario Tenant Rights Guide' },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Guides', url: '/services' }, { name: 'Ontario Tenant Rights', url: '/guides/ontario-tenant-rights' }],
    faqs: [
      { question: 'What are my basic rights as a tenant in Ontario?', answer: 'Key rights include: protection from illegal eviction, maintenance of habitable conditions, privacy (24-hour notice for entry), limits on rent increases, and protection from discrimination and harassment.' },
      { question: 'Can my landlord increase rent anytime?', answer: 'No. For rent-controlled units, increases are limited to the annual guideline, once per year, with 90 days notice on proper form. Newer buildings (after Nov 15, 2018) are exempt from rent control.' }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    
    ,
      {
        question: 'What evidence is most important for LTB hearings?',
        answer: 'Photos, videos, written communications, receipts, and bank records are crucial. Organize everything chronologically and bring multiple copies for the adjudicator and other party.'
      }
    ]
  },

  '/guides/ontario-landlord-rights': {
    title: 'Ontario Landlord Rights | Complete Guide | LegalAssist',
    description: 'Know your rights as a landlord in Ontario. Eviction process, rent collection, property access, and tenant screening. Comprehensive landlord guide.',
    keywords: 'ontario landlord rights, landlord rights guide, eviction process ontario, landlord tenant law',
    schema: { type: 'Article', name: 'Ontario Landlord Rights Guide' },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Guides', url: '/services' }, { name: 'Ontario Landlord Rights', url: '/guides/ontario-landlord-rights' }],
    faqs: [
      { question: 'What are my rights as a landlord in Ontario?', answer: 'Key rights include: collecting rent on time, evicting for cause through proper process, reasonable access with notice, screening tenants, and being compensated for damage beyond normal wear.' },
      { question: 'How do I legally evict a tenant?', answer: 'Serve proper notice (N4, N5, N7, N12, etc.), wait required notice period, file with LTB if tenant doesn\'t comply, attend hearing, obtain order, enforce through Sheriff if needed.' }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    
    ,
      {
        question: 'Can I bring a lawyer to my LTB hearing?',
        answer: 'You can bring a lawyer or licensed paralegal. Paralegals are often more cost-effective for LTB matters and have the same rights of representation as lawyers at this tribunal.'
      }
    ]
  },

  '/guides/small-claims-court-process': {
    title: 'Small Claims Court Process | Step by Step Guide | Ontario',
    description: 'Complete guide to Small Claims Court in Ontario. Filing, serving, settlement conferences, trials, and enforcement.',
    keywords: 'small claims court process ontario, how to sue small claims, small claims guide, court process steps',
    schema: { type: 'Article', name: 'Small Claims Court Process Guide' },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Guides', url: '/services' }, { name: 'Small Claims Process', url: '/guides/small-claims-court-process' }],
    faqs: [
      { question: 'What are the steps in Small Claims Court?', answer: '1) File claim ($102-273), 2) Serve defendant (20 days to respond), 3) Defence filed or default judgment, 4) Settlement conference, 5) Trial if not settled, 6) Judgment, 7) Enforcement if needed.' },
      { question: 'How long does Small Claims Court take?', answer: 'Simple cases settle in 2-3 months. Contested cases going to trial take 6-12 months. Settlement conferences resolve many cases and are mandatory before trial.' }
    ,
      {
        question: 'What costs can I recover if I win?',
        answer: 'Filing fees, service costs, and portion of legal fees (up to 15% of claim). Interest on judgment also awarded. We pursue full cost recovery.'
      }
    
    ,
      {
        question: 'Can I sue someone who lives in another province?',
        answer: 'Yes, if the contract was formed in Ontario or the incident occurred here. Service and enforcement across provinces can be more complex. We advise on your options.'
      }
    ]
  },

  '/guides/ltb-hearing-preparation': {
    title: 'LTB Hearing Preparation | How to Prepare | Ontario Guide',
    description: 'Prepare for your Landlord and Tenant Board hearing. What to bring, how to present evidence, and what to expect.',
    keywords: 'LTB hearing preparation, prepare for LTB, landlord tenant board hearing, LTB what to expect',
    schema: { type: 'Article', name: 'LTB Hearing Preparation Guide' },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Guides', url: '/services' }, { name: 'LTB Hearing Prep', url: '/guides/ltb-hearing-preparation' }],
    faqs: [
      { question: 'What should I bring to an LTB hearing?', answer: 'Bring: lease agreement, all relevant notices, photos/videos, repair requests and responses, payment records, text/email communications, witness contact info, and documents organized chronologically.' },
      { question: 'How do LTB hearings work?', answer: 'Most are video conferences. Adjudicator identifies parties, explains procedure. Applicant presents first, then respondent. Each can question the other. Decisions may be immediate or reserved.' }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    
    ,
      {
        question: 'What if my landlord or tenant does not follow the LTB order?',
        answer: 'You can file a motion to enforce the order or contact the Sheriff for eviction enforcement. Continued violations may result in contempt proceedings or additional compensation.'
      }
    ]
  },

  '/guides/filing-human-rights-complaint': {
    title: 'Filing a Human Rights Complaint | HRTO Guide | Ontario',
    description: 'How to file a human rights complaint in Ontario. HRTO application process, deadlines, evidence needed, and what to expect.',
    keywords: 'file human rights complaint ontario, HRTO application, human rights tribunal application, discrimination complaint',
    schema: { type: 'Article', name: 'Filing Human Rights Complaint Guide' },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Guides', url: '/services' }, { name: 'Filing HRTO Complaint', url: '/guides/filing-human-rights-complaint' }],
    faqs: [
      { question: 'How do I file an HRTO complaint?', answer: 'Complete Form 1 (Application) online or by mail within 1 year of the incident. Describe the discrimination, identify protected ground, name respondents, and describe remedies sought.' },
      { question: 'What happens after filing an HRTO application?', answer: 'HRTO serves respondent (35 days to respond), then mediation is offered. If not resolved, the case proceeds to hearing. Many cases settle through mediation.' }
    ,
      {
        question: 'What remedies can the HRTO award?',
        answer: 'Monetary compensation for lost wages and dignity injury, policy changes, required training, reinstatement. We pursue maximum appropriate remedies.'
      }
    
    ,
      {
        question: 'Can I file anonymously with the HRTO?',
        answer: 'No, applications are not anonymous. However, the Tribunal can order publication bans or use initials in certain circumstances to protect privacy.'
      }
    ]
  },

  '/guides/ontario-employment-rights': {
    title: 'Ontario Employment Rights | Employee Guide | LegalAssist',
    description: 'Know your employment rights in Ontario. Minimum wage, overtime, termination, vacation, and workplace protections.',
    keywords: 'ontario employment rights, employee rights ontario, ESA rights, workplace rights guide',
    schema: { type: 'Article', name: 'Ontario Employment Rights Guide' },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Guides', url: '/services' }, { name: 'Employment Rights', url: '/guides/ontario-employment-rights' }],
    faqs: [
      { question: 'What are my basic employment rights in Ontario?', answer: 'Key rights include: minimum wage, overtime pay after 44 hours, vacation (2 weeks after 1 year), public holidays, pregnancy/parental leave, and protection from termination without notice or pay.' },
      { question: 'What notice am I entitled to if terminated?', answer: 'ESA minimum: 1 week per year of service up to 8 weeks. Common law may entitle you to more based on age, position, and other factors. Never sign a severance package without review.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ,
      {
        question: 'Can I be fired without cause in Ontario?',
        answer: 'Yes, but you are entitled to notice or pay in lieu. The amount depends on length of service, age, position, and other factors. We assess your full entitlement.'
      }
    ]
  },

  '/guides/legal-deadlines-ontario': {
    title: 'Legal Deadlines Ontario | Limitation Periods | LegalAssist',
    description: 'Important legal deadlines in Ontario. Limitation periods for lawsuits, appeals, complaints, and filings.',
    keywords: 'legal deadlines ontario, limitation periods, time to sue, filing deadlines ontario',
    schema: { type: 'Article', name: 'Legal Deadlines Ontario Guide' },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Guides', url: '/services' }, { name: 'Legal Deadlines', url: '/guides/legal-deadlines-ontario' }],
    faqs: [
      { question: 'How long do I have to sue in Ontario?', answer: 'General limitation: 2 years from when you knew or should have known about the claim. Some exceptions exist for minors, incapacitated persons, and certain types of claims.' },
      { question: 'What are common legal deadlines?', answer: 'Traffic tickets: 15 days to request trial. HRTO: 1 year. LTB applications: varies. Small Claims: 2 years. Employment complaints: varies by type. Don\'t wait - deadlines are strict.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ,
      {
        question: 'How much does this service cost?',
        answer: 'Fees vary by service complexity. We offer free consultations to assess your matter and provide transparent, upfront pricing with no hidden costs.'
      }
    ]
  },

  '/guides/free-legal-resources': {
    title: 'Free Legal Resources Ontario | Legal Aid | LegalAssist',
    description: 'Free and low-cost legal resources in Ontario. Legal aid, duty counsel, clinics, self-help resources for those who need assistance.',
    keywords: 'free legal help ontario, legal aid ontario, free lawyer, legal clinics ontario',
    schema: { type: 'Article', name: 'Free Legal Resources Guide' },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Guides', url: '/services' }, { name: 'Free Legal Resources', url: '/guides/free-legal-resources' }],
    faqs: [
      { question: 'Where can I get free legal help in Ontario?', answer: 'Options include: Legal Aid Ontario (income-tested), community legal clinics, law school clinics, Pro Bono Ontario, duty counsel at courts, and self-help resources at court websites.' },
      { question: 'Do I qualify for Legal Aid?', answer: 'Legal Aid eligibility depends on income, family size, and case type. Generally covers criminal, family, refugee, and some civil matters for low-income individuals. Apply through Legal Aid Ontario.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ,
      {
        question: 'How much does this service cost?',
        answer: 'Fees vary by service complexity. We offer free consultations to assess your matter and provide transparent, upfront pricing with no hidden costs.'
      }
    ]
  },

  '/guides/what-to-do-when-sued': {
    title: 'What to Do When Sued | Defendant Guide | Ontario',
    description: 'Been served with a lawsuit? Learn what to do, deadlines to respond, and how to defend yourself in Ontario courts.',
    keywords: 'what to do when sued ontario, served with lawsuit, defendant guide, sued in small claims',
    schema: { type: 'Article', name: 'What to Do When Sued Guide' },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Guides', url: '/services' }, { name: 'What to Do When Sued', url: '/guides/what-to-do-when-sued' }],
    faqs: [
      { question: 'What should I do if I\'m served with a lawsuit?', answer: 'Don\'t ignore it! Note the deadline (usually 20 days in Small Claims). Read carefully. Gather relevant documents. Consider getting legal help. File a Defence before the deadline.' },
      { question: 'What happens if I don\'t respond to a lawsuit?', answer: 'The plaintiff can get default judgment against you without a hearing. This means they win automatically and can enforce the judgment against your assets, wages, and bank accounts.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ,
      {
        question: 'How much does this service cost?',
        answer: 'Fees vary by service complexity. We offer free consultations to assess your matter and provide transparent, upfront pricing with no hidden costs.'
      }
    ]
  },

  // ============================================
  // HUMAN RIGHTS TRIBUNAL - MAIN & SUB-PAGES (8 pages)
  // ============================================

  '/services/hrto-process': {
    title: 'HRTO Process | How to File Human Rights Complaint | London Ontario',
    description: 'Understanding the HRTO process in Ontario. How to file, what to expect, timelines. Human rights application guidance.',
    keywords: 'HRTO process ontario, file human rights complaint, HRTO application how to, human rights tribunal process',
    schema: { type: 'LegalService', name: 'HRTO Process Guidance', serviceType: 'HRTO Application Assistance', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Human Rights', url: '/services/human-rights' }, { name: 'HRTO Process', url: '/services/hrto-process' }],
    faqs: [
      { question: 'How do I file an HRTO complaint?', answer: 'Complete Form 1 (Application) within 1 year of the incident. File online or by mail. The respondent has 35 days to respond. Mediation is offered, then hearing if unresolved.' },
      { question: 'How long does the HRTO process take?', answer: 'From filing to hearing typically takes 12-18 months. Many cases settle at mediation (scheduled within a few months of filing). Complex cases may take longer.' },
      { question: 'Do I need a paralegal for HRTO?', answer: 'You can self-represent, but professional representation significantly improves outcomes. We handle evidence gathering, legal arguments, mediation negotiations, and hearing advocacy.' }
    ,
      {
        question: 'What remedies can the HRTO award?',
        answer: 'Monetary compensation for lost wages and dignity injury, policy changes, required training, reinstatement. We pursue maximum appropriate remedies.'
      }
    ]
  },

  // ============================================
  // EMPLOYMENT LAW - SUB-PAGES (4 pages)
  // ============================================
  '/services/employment': {
    title: 'Employment Law | Workplace Issues | London Ontario Paralegal',
    description: 'Employment law services in London, Ontario. Termination, severance, workplace disputes. Know your rights as an employee.',
    keywords: 'employment law london, workplace lawyer, termination severance, employee rights ontario',
    schema: { type: 'LegalService', name: 'Employment Law Services', serviceType: 'Employment Legal Representation', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Employment Law', url: '/services/employment' }],
    faqs: [
      { question: 'What employment matters can a paralegal handle?', answer: 'Paralegals handle: wrongful dismissal claims under $50,000 in Small Claims Court, Employment Standards Act complaints, and certain workplace tribunal matters. Larger claims require a lawyer.' },
      { question: 'What are my rights when terminated?', answer: 'You\'re entitled to notice or pay in lieu based on length of service. ESA minimums are 1 week per year (max 8 weeks). Common law may entitle you to more. Severance pay applies for 5+ years with large employers.' },
      { question: 'Can my employer change my job duties?', answer: 'Minor changes are usually permitted. Significant changes to duties, pay, hours, or location without consent may be constructive dismissal, entitling you to severance as if you were fired.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  '/services/employment-standards': {
    title: 'Employment Standards | ESA Claims | London Ontario',
    description: 'Employment Standards Act claims in London, Ontario. Unpaid wages, overtime, vacation pay, termination pay.',
    keywords: 'employment standards ontario, ESA claim, unpaid wages, overtime pay, vacation pay',
    schema: { type: 'LegalService', name: 'Employment Standards Services', serviceType: 'ESA Claims', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Employment', url: '/services/employment' }, { name: 'Employment Standards', url: '/services/employment-standards' }],
    faqs: [
      { question: 'What does the Employment Standards Act cover?', answer: 'The ESA sets minimum standards for: wages, overtime, vacation, public holidays, leaves of absence, termination notice, and severance pay. It applies to most Ontario employees.' },
      { question: 'How do I file an ESA complaint?', answer: 'File with the Ministry of Labour within 2 years of the violation. The Ministry investigates and can order the employer to pay. You can also pursue civil claims for amounts above ESA minimums.' },
      { question: 'Can I get overtime pay?', answer: 'Most employees are entitled to 1.5x pay after 44 hours per week. Some jobs are exempt (managers, certain professionals). Employers can average hours over periods or offer time off instead in some cases.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },


  '/services/severance-review': {
    title: 'Severance Review | Termination Package Review | London Ontario',
    description: 'Severance package review in London, Ontario. Is your termination package fair? Get a professional assessment.',
    keywords: 'severance review ontario, termination package review, is my severance fair, negotiate severance',
    schema: { type: 'LegalService', name: 'Severance Review Services', serviceType: 'Severance Package Assessment', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Employment', url: '/services/employment' }, { name: 'Severance Review', url: '/services/severance-review' }],
    faqs: [
      { question: 'How much severance should I get?', answer: 'Depends on: length of service, age, position, and job market. ESA provides minimums (1 week/year up to 8). Common law often awards 1 month per year. Senior employees may get 18-24 months.' },
      { question: 'Should I sign my severance package right away?', answer: 'No. Most packages have a deadline (often 1-2 weeks) but you should have it reviewed first. Initial offers are often negotiable. Once signed, you typically can\'t claim more.' },
      { question: 'Can I negotiate my severance?', answer: 'Usually yes. Employers often offer ESA minimums initially but may increase to avoid litigation. We can assess what you\'re likely entitled to and negotiate on your behalf.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  // ============================================
  // CRIMINAL & PROVINCIAL OFFENCES (10 pages)
  // ============================================

  '/services/bylaw-violations': {
    title: 'Bylaw Violations | Municipal Bylaw Defence | London Ontario',
    description: 'Bylaw violation defence in London, Ontario. Noise bylaws, property standards, parking tickets, business licensing.',
    keywords: 'bylaw violation london, municipal bylaw defence, noise complaint ticket, property standards violation',
    schema: { type: 'LegalService', name: 'Bylaw Violation Defence', serviceType: 'Municipal Bylaw Representation', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Provincial Offences', url: '/services/provincial-offences' }, { name: 'Bylaw Violations', url: '/services/bylaw-violations' }],
    faqs: [
      { question: 'What are common bylaw violations?', answer: 'Common violations include: noise complaints, property standards (unkempt yard, building issues), parking violations, zoning violations, business licensing, sign bylaws, and animal control issues.' },
      { question: 'Can I fight a bylaw ticket?', answer: 'Yes. Request a trial by the deadline on the ticket. Common defences include: the bylaw doesn\'t apply, you weren\'t the responsible party, the measurement was improper, or there are constitutional issues.' },
      { question: 'What happens if I ignore a bylaw ticket?', answer: 'You\'ll be convicted in absence with possible increased fines. For ongoing violations, the municipality can do the work and bill you, place a lien on your property, or seek court orders.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  '/services/trespass-charges': {
    title: 'Trespass Charges | Trespass to Property Act | London Ontario',
    description: 'Trespass charge defence in London, Ontario. Trespass to Property Act violations. Protect your record.',
    keywords: 'trespass charge ontario, trespass to property act, trespassing ticket defence',
    schema: { type: 'LegalService', name: 'Trespass Defence Services', serviceType: 'Trespass Charge Representation', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Provincial Offences', url: '/services/provincial-offences' }, { name: 'Trespass Charges', url: '/services/trespass-charges' }],
    faqs: [
      { question: 'Is trespass a criminal offence?', answer: 'Simple trespass under the Trespass to Property Act is a provincial offence, not criminal. However, Criminal Code trespass (break and enter, trespassing at night) is criminal. The charge type matters significantly.' },
      { question: 'What are the penalties for trespass?', answer: 'Provincial trespass: fines up to $10,000 for first offence, $25,000 for subsequent. No jail time for provincial charges. Criminal trespass carries potential imprisonment.' },
      { question: 'What are defences to trespass charges?', answer: 'Common defences: you had permission or implied consent, no proper notice was posted, you were exercising a legal right (protest, necessity), or the property isn\'t covered by the Act.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  '/services/liquor-licence-violations': {
    title: 'Liquor Licence Violations | AGCO Defence | London Ontario',
    description: 'Liquor licence violation defence in London, Ontario. AGCO matters, serving minors, over-serving, licence conditions.',
    keywords: 'liquor licence violation ontario, AGCO defence, bar licence suspension, serving minors charge',
    schema: { type: 'LegalService', name: 'Liquor Licence Defence', serviceType: 'AGCO Legal Representation', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Provincial Offences', url: '/services/provincial-offences' }, { name: 'Liquor Licence Violations', url: '/services/liquor-licence-violations' }],
    faqs: [
      { question: 'What happens if caught serving a minor?', answer: 'Serving alcohol to minors carries fines of $500-$500,000, potential licence suspension, and personal liability for servers. Due diligence (checking ID) is your defence.' },
      { question: 'Can my liquor licence be suspended?', answer: 'Yes. The AGCO can suspend or revoke licences for violations including: serving minors, over-serving, after-hours sales, violence on premises, or other licence conditions breaches.' },
      { question: 'What is an AGCO hearing?', answer: 'The Alcohol and Gaming Commission holds hearings on licence matters. You can present evidence and arguments. Professional representation helps navigate procedures and protect your licence.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  '/services/fire-code-violations': {
    title: 'Fire Code Violations | Fire Safety Defence | London Ontario',
    description: 'Fire code violation defence in London, Ontario. Blocked exits, missing equipment, occupancy limits, fire safety orders.',
    keywords: 'fire code violation ontario, fire safety defence, blocked exit fine, fire marshall order',
    schema: { type: 'LegalService', name: 'Fire Code Defence', serviceType: 'Fire Safety Legal Representation', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Provincial Offences', url: '/services/provincial-offences' }, { name: 'Fire Code Violations', url: '/services/fire-code-violations' }],
    faqs: [
      { question: 'What are common fire code violations?', answer: 'Common violations: blocked exits, missing/expired fire extinguishers, disabled fire alarms, overcrowding, improper storage of flammables, inadequate emergency lighting, and exit sign issues.' },
      { question: 'What are the penalties for fire code violations?', answer: 'Fines up to $50,000 for individuals, $100,000 for corporations per offence. Repeat violations increase penalties. Serious violations causing injury can lead to imprisonment.' },
      { question: 'Can I appeal a fire marshall order?', answer: 'Yes. You can request a review of orders to the Fire Safety Commission. Time limits apply. Meanwhile, you may need to comply or seek a stay while appealing.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  '/services/minor-criminal-charges': {
    title: 'Minor Criminal Charges | Summary Offences | London Ontario Paralegal',
    description: 'Minor criminal charge defence in London, Ontario. Summary conviction offences handled by licensed paralegals.',
    keywords: 'minor criminal charge ontario, summary offence defence, paralegal criminal, petty crime lawyer',
    schema: { type: 'LegalService', name: 'Minor Criminal Defence', serviceType: 'Summary Offence Representation', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Criminal Defence', url: '/services/minor-criminal-charges' }],
    faqs: [
      { question: 'What criminal charges can a paralegal handle?', answer: 'Paralegals can represent clients on summary conviction offences with maximum penalties of 6 months jail and/or $5,000 fine. This includes: theft under $5,000, mischief under $5,000, causing a disturbance, and certain assault charges.' },
      { question: 'Will I get a criminal record?', answer: 'A conviction for any Criminal Code offence creates a criminal record. Even minor charges have serious consequences for employment, travel, and immigration. Fighting charges or seeking alternative dispositions is important.' },
      { question: 'What is a diversion program?', answer: 'Alternative to prosecution where charges may be withdrawn after completing conditions (counselling, community service, donation). Not available for all offences. We can advocate for diversion where appropriate.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },


  '/services/mischief-charges': {
    title: 'Mischief Charges | Property Damage Criminal | London Ontario',
    description: 'Mischief charge defence in London, Ontario. Criminal property damage, vandalism charges. Paralegal representation.',
    keywords: 'mischief charge ontario, property damage criminal, vandalism defence, criminal mischief',
    schema: { type: 'LegalService', name: 'Mischief Defence Services', serviceType: 'Mischief Charge Representation', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Criminal Defence', url: '/services/minor-criminal-charges' }, { name: 'Mischief Charges', url: '/services/mischief-charges' }],
    faqs: [
      { question: 'What is criminal mischief?', answer: 'Willfully destroying or damaging property, rendering property useless or inoperative, or interfering with the lawful use of property. Mischief under $5,000 is a summary offence.' },
      { question: 'What are the penalties for mischief?', answer: 'Mischief under $5,000: up to 6 months jail and/or $5,000 fine. Over $5,000 can proceed as indictable with up to 10 years. Restitution to victims is usually ordered.' },
      { question: 'What are defences to mischief charges?', answer: 'Common defences: you had consent or right to alter the property, no willful intent, mistaken identity, or the damage alleged didn\'t actually occur or wasn\'t caused by you.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  '/services/assault-charges': {
    title: 'Simple Assault Charges | Assault Defence | London Ontario',
    description: 'Simple assault charge defence in London, Ontario. Summary assault matters handled by licensed paralegals.',
    keywords: 'simple assault charge ontario, assault defence paralegal, fighting charge, assault lawyer',
    schema: { type: 'LegalService', name: 'Assault Defence Services', serviceType: 'Simple Assault Representation', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Criminal Defence', url: '/services/minor-criminal-charges' }, { name: 'Assault Charges', url: '/services/assault-charges' }],
    faqs: [
      { question: 'Can a paralegal defend assault charges?', answer: 'Paralegals can defend summary conviction assault charges. Simple assault (no weapon, no bodily harm) often proceeds summarily. More serious assaults require a lawyer.' },
      { question: 'What is simple assault?', answer: 'Intentionally applying force to another person without consent, or threatening to do so while having the ability. Includes pushing, punching, spitting - any unwanted physical contact.' },
      { question: 'What are defences to assault?', answer: 'Common defences: self-defence, defence of others, consent (in certain contexts), accident, mistaken identity, or the contact was so minor it doesn\'t warrant criminal sanction.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  '/services/causing-disturbance': {
    title: 'Causing a Disturbance | Public Disturbance Defence | London Ontario',
    description: 'Causing a disturbance charge defence in London, Ontario. Fighting, shouting, impeding persons in public.',
    keywords: 'causing disturbance charge ontario, public disturbance defence, disorderly conduct, fighting public',
    schema: { type: 'LegalService', name: 'Disturbance Defence Services', serviceType: 'Causing Disturbance Representation', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Criminal Defence', url: '/services/minor-criminal-charges' }, { name: 'Causing Disturbance', url: '/services/causing-disturbance' }],
    faqs: [
      { question: 'What is causing a disturbance?', answer: 'A Criminal Code offence for: fighting, screaming, shouting, swearing, singing, or using insulting language in a public place, or impeding/molesting other persons. Summary conviction offence.' },
      { question: 'What are the penalties?', answer: 'Maximum 6 months jail and/or $5,000 fine for summary conviction. Most first offenders don\'t receive jail but do get a criminal record unless charges are withdrawn or discharge granted.' },
      { question: 'Can I fight a causing disturbance charge?', answer: 'Yes. Defences include: the location wasn\'t truly public, your conduct didn\'t actually cause a disturbance, freedom of expression arguments, or the disturbance was provoked by others.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  // ============================================
  // LOCATION PAGES (21 pages)
  // ============================================
  '/locations/london': {
    title: 'Paralegal Services London Ontario | LegalAssist',
    description: 'Licensed paralegal services in London, Ontario. Traffic tickets, landlord-tenant, small claims court. Local expertise. Call (519) 601-1110.',
    keywords: 'paralegal london ontario, lawyer london on, legal services london, court representation london',
    schema: { type: 'LocalBusiness', name: 'LegalAssist London', areaServed: ['London', 'Middlesex County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'London', url: '/locations/london' }],
    faqs: [
      { question: 'Where are you located in London?', answer: 'We serve all of London, Ontario and can meet clients throughout the city. We handle matters at the London courthouse and all local tribunals.' },
      { question: 'What areas of London do you serve?', answer: 'All London neighbourhoods including downtown, Old North, Old South, Byron, Westmount, White Oaks, and surrounding areas.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'Do you offer services in languages other than English?',
        answer: 'We primarily operate in English but can arrange interpreter services when needed. Contact us to discuss your language requirements.'
      }
    ]
  },

  '/locations/st-thomas': {
    title: 'Paralegal Services St. Thomas Ontario | LegalAssist',
    description: 'Licensed paralegal services in St. Thomas, Ontario. Traffic tickets, landlord-tenant, small claims court. Serving Elgin County.',
    keywords: 'paralegal st thomas ontario, lawyer st thomas, legal services elgin county',
    schema: { type: 'LocalBusiness', name: 'LegalAssist St. Thomas', areaServed: ['St. Thomas', 'Elgin County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'St. Thomas', url: '/locations/st-thomas' }],
    faqs: [
      { question: 'Do you serve St. Thomas?', answer: 'Yes, we provide full paralegal services to St. Thomas and Elgin County clients. We handle matters at local courthouses and tribunals.' },
      { question: 'How far is St. Thomas from your office?', answer: 'St. Thomas is approximately 25 km south of London, about a 20-minute drive. We regularly serve clients throughout Elgin County.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'How far in advance should I contact you?',
        answer: 'Contact us as soon as possible. Many matters have strict deadlines. For traffic tickets, contact us immediately upon receiving the ticket to preserve all options.'
      }
    ]
  },

  '/locations/woodstock': {
    title: 'Paralegal Services Woodstock Ontario | LegalAssist',
    description: 'Licensed paralegal services in Woodstock, Ontario. Traffic tickets, landlord-tenant, small claims court. Serving Oxford County.',
    keywords: 'paralegal woodstock ontario, lawyer woodstock, legal services oxford county',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Woodstock', areaServed: ['Woodstock', 'Oxford County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Woodstock', url: '/locations/woodstock' }],
    faqs: [
      { question: 'Do you handle cases at Woodstock courthouse?', answer: 'Yes, we represent clients at the Woodstock courthouse and handle all Oxford County legal matters within paralegal scope.' },
      { question: 'What services do you offer in Woodstock?', answer: 'All our services: traffic tickets, LTB matters, small claims court, human rights, and provincial offences for Woodstock residents.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'What should I bring to my first consultation?',
        answer: 'Bring all relevant documents: tickets, notices, leases, contracts, correspondence, photos, and a timeline of events. The more information, the better we can assess your case.'
      }
    ]
  },



  '/locations/waterloo': {
    title: 'Paralegal Services Waterloo Ontario | LegalAssist',
    description: 'Licensed paralegal services in Waterloo, Ontario. Traffic tickets, landlord-tenant, small claims court representation.',
    keywords: 'paralegal waterloo ontario, lawyer waterloo, legal services waterloo',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Waterloo', areaServed: ['Waterloo', 'Waterloo Region'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Waterloo', url: '/locations/waterloo' }],
    faqs: [
      { question: 'Do you serve the City of Waterloo?', answer: 'Yes, we serve Waterloo residents for all paralegal matters. Waterloo Region has excellent transit connections to our office.' },
      { question: 'Can you help UW or Laurier students?', answer: 'Absolutely. We help many university students with traffic tickets, tenancy issues, and other legal matters.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'Do you offer services in languages other than English?',
        answer: 'We primarily operate in English but can arrange interpreter services when needed. Contact us to discuss your language requirements.'
      }
    ]
  },






  '/locations/chatham': {
    title: 'Paralegal Services Chatham Ontario | LegalAssist',
    description: 'Licensed paralegal services in Chatham-Kent, Ontario. Traffic tickets, landlord-tenant, small claims court.',
    keywords: 'paralegal chatham ontario, lawyer chatham-kent, legal services chatham',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Chatham', areaServed: ['Chatham-Kent'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Chatham', url: '/locations/chatham' }],
    faqs: [
      { question: 'Do you serve Chatham-Kent?', answer: 'Yes, we provide paralegal services to Chatham-Kent residents for all matters within paralegal scope.' },
      { question: 'Where is the Chatham courthouse?', answer: 'The Chatham courthouse handles local matters. We appear there for clients and handle tribunal matters remotely.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'How far in advance should I contact you?',
        answer: 'Contact us as soon as possible. Many matters have strict deadlines. For traffic tickets, contact us immediately upon receiving the ticket to preserve all options.'
      }
    ]
  },

  '/locations/ingersoll': {
    title: 'Paralegal Services Ingersoll Ontario | LegalAssist',
    description: 'Licensed paralegal services in Ingersoll, Ontario. Traffic tickets, landlord-tenant, small claims. Oxford County.',
    keywords: 'paralegal ingersoll ontario, lawyer ingersoll, legal services ingersoll',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Ingersoll', areaServed: ['Ingersoll', 'Oxford County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Ingersoll', url: '/locations/ingersoll' }],
    faqs: [
      { question: 'Do you serve Ingersoll?', answer: 'Yes, Ingersoll is close to London and we regularly serve Oxford County residents.' },
      { question: 'Where do Ingersoll court matters go?', answer: 'Most matters go to Woodstock courthouse. We handle appearances for Oxford County clients.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'What should I bring to my first consultation?',
        answer: 'Bring all relevant documents: tickets, notices, leases, contracts, correspondence, photos, and a timeline of events. The more information, the better we can assess your case.'
      }
    ]
  },

  '/locations/tillsonburg': {
    title: 'Paralegal Services Tillsonburg Ontario | LegalAssist',
    description: 'Licensed paralegal services in Tillsonburg, Ontario. Traffic tickets, landlord-tenant, small claims court.',
    keywords: 'paralegal tillsonburg ontario, lawyer tillsonburg, legal services tillsonburg',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Tillsonburg', areaServed: ['Tillsonburg', 'Oxford County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Tillsonburg', url: '/locations/tillsonburg' }],
    faqs: [
      { question: 'Do you handle Tillsonburg legal matters?', answer: 'Yes, we serve Tillsonburg and surrounding areas. Court matters typically go to Woodstock courthouse.' },
      { question: 'Can you come to Tillsonburg?', answer: 'We offer video and phone consultations, and travel to local courthouses for hearings and trials.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'Do you offer services in languages other than English?',
        answer: 'We primarily operate in English but can arrange interpreter services when needed. Contact us to discuss your language requirements.'
      }
    ]
  },

  '/locations/aylmer': {
    title: 'Paralegal Services Aylmer Ontario | LegalAssist',
    description: 'Licensed paralegal services in Aylmer, Ontario. Traffic tickets, landlord-tenant, small claims. Elgin County.',
    keywords: 'paralegal aylmer ontario, lawyer aylmer, legal services aylmer elgin',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Aylmer', areaServed: ['Aylmer', 'Elgin County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Aylmer', url: '/locations/aylmer' }],
    faqs: [
      { question: 'Do you serve Aylmer?', answer: 'Yes, we serve Aylmer and Elgin County. Local matters typically go to St. Thomas courthouse.' },
      { question: 'How far is Aylmer from London?', answer: 'Aylmer is about 35 km east of London, approximately 30 minutes drive.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'How far in advance should I contact you?',
        answer: 'Contact us as soon as possible. Many matters have strict deadlines. For traffic tickets, contact us immediately upon receiving the ticket to preserve all options.'
      }
    ]
  },

  '/locations/strathroy': {
    title: 'Paralegal Services Strathroy Ontario | LegalAssist',
    description: 'Licensed paralegal services in Strathroy, Ontario. Traffic tickets, landlord-tenant, small claims. Middlesex County.',
    keywords: 'paralegal strathroy ontario, lawyer strathroy, legal services strathroy',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Strathroy', areaServed: ['Strathroy', 'Middlesex County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Strathroy', url: '/locations/strathroy' }],
    faqs: [
      { question: 'Do you serve Strathroy?', answer: 'Yes, Strathroy is in Middlesex County and matters are handled at London courthouse. We serve all of Middlesex.' },
      { question: 'What services are available for Strathroy?', answer: 'All paralegal services: traffic tickets, LTB, small claims, HRTO, and provincial offences.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'What should I bring to my first consultation?',
        answer: 'Bring all relevant documents: tickets, notices, leases, contracts, correspondence, photos, and a timeline of events. The more information, the better we can assess your case.'
      }
    ]
  },

  '/locations/dorchester': {
    title: 'Paralegal Services Dorchester Ontario | LegalAssist',
    description: 'Licensed paralegal services in Dorchester, Ontario. Traffic tickets, landlord-tenant, small claims.',
    keywords: 'paralegal dorchester ontario, lawyer dorchester, legal services dorchester',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Dorchester', areaServed: ['Dorchester', 'Middlesex County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Dorchester', url: '/locations/dorchester' }],
    faqs: [
      { question: 'Do you serve Dorchester?', answer: 'Yes, Dorchester is very close to London and we serve all Middlesex County communities.' },
      { question: 'Where do Dorchester matters go?', answer: 'Court matters go to London courthouse. Easy commute for clients.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'Do you offer services in languages other than English?',
        answer: 'We primarily operate in English but can arrange interpreter services when needed. Contact us to discuss your language requirements.'
      }
    ]
  },

  '/locations/komoka': {
    title: 'Paralegal Services Komoka Ontario | LegalAssist',
    description: 'Licensed paralegal services in Komoka, Ontario. Traffic tickets, landlord-tenant, small claims.',
    keywords: 'paralegal komoka ontario, lawyer komoka, legal services komoka',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Komoka', areaServed: ['Komoka', 'Middlesex County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Komoka', url: '/locations/komoka' }],
    faqs: [
      { question: 'Do you serve Komoka?', answer: 'Yes, Komoka is just west of London. All Middlesex County matters handled at London courthouse.' },
      { question: 'Can I meet in person?', answer: 'Yes, we can meet clients from Komoka at our office or arrange video consultations.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'How far in advance should I contact you?',
        answer: 'Contact us as soon as possible. Many matters have strict deadlines. For traffic tickets, contact us immediately upon receiving the ticket to preserve all options.'
      }
    ]
  },

  '/locations/lucan': {
    title: 'Paralegal Services Lucan Ontario | LegalAssist',
    description: 'Licensed paralegal services in Lucan, Ontario. Traffic tickets, landlord-tenant, small claims court.',
    keywords: 'paralegal lucan ontario, lawyer lucan, legal services lucan',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Lucan', areaServed: ['Lucan', 'Middlesex County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Lucan', url: '/locations/lucan' }],
    faqs: [
      { question: 'Do you serve Lucan?', answer: 'Yes, Lucan is in Middlesex County. All services available, courthouse is in London.' },
      { question: 'How far is Lucan from London?', answer: 'Lucan is about 25 km north of London, approximately 20 minutes drive.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'What should I bring to my first consultation?',
        answer: 'Bring all relevant documents: tickets, notices, leases, contracts, correspondence, photos, and a timeline of events. The more information, the better we can assess your case.'
      }
    ]
  },

  '/locations/exeter': {
    title: 'Paralegal Services Exeter Ontario | LegalAssist',
    description: 'Licensed paralegal services in Exeter, Ontario. Traffic tickets, landlord-tenant, small claims. Huron County.',
    keywords: 'paralegal exeter ontario, lawyer exeter, legal services huron county',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Exeter', areaServed: ['Exeter', 'Huron County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Exeter', url: '/locations/exeter' }],
    faqs: [
      { question: 'Do you serve Exeter?', answer: 'Yes, we serve Exeter and South Huron. Local court matters handled at appropriate courthouse.' },
      { question: 'What services for Exeter residents?', answer: 'Full paralegal services: traffic tickets, LTB, small claims, and provincial offences.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'Do you offer services in languages other than English?',
        answer: 'We primarily operate in English but can arrange interpreter services when needed. Contact us to discuss your language requirements.'
      }
    ]
  },

  '/locations/grand-bend': {
    title: 'Paralegal Services Grand Bend Ontario | LegalAssist',
    description: 'Licensed paralegal services in Grand Bend, Ontario. Traffic tickets, landlord-tenant, small claims.',
    keywords: 'paralegal grand bend ontario, lawyer grand bend, legal services grand bend',
    schema: { type: 'LocalBusiness', name: 'LegalAssist Grand Bend', areaServed: ['Grand Bend', 'Lambton County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Grand Bend', url: '/locations/grand-bend' }],
    faqs: [
      { question: 'Do you handle Grand Bend legal matters?', answer: 'Yes, we serve Grand Bend and Lambton Shores area. Popular summer destination - we handle seasonal rental and traffic issues.' },
      { question: 'Many tourists get tickets at Grand Bend - can you help?', answer: 'Yes, we defend traffic tickets for visitors who don\'t want to return to court. We handle everything for you.' }
    ,
      {
        question: 'Do you offer evening or weekend appointments?',
        answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.'
      }
    
    ,
      {
        question: 'How far in advance should I contact you?',
        answer: 'Contact us as soon as possible. Many matters have strict deadlines. For traffic tickets, contact us immediately upon receiving the ticket to preserve all options.'
      }
    ]
  },

  // ============================================
  // GUIDE PAGES (12 pages)
  // ============================================
  '/guides': {
    title: 'Legal Guides | Free Legal Information | LegalAssist London Ontario',
    description: 'Free legal guides and resources. Learn about traffic tickets, landlord rights, small claims court, human rights. Ontario legal information.',
    keywords: 'legal guides ontario, free legal information, know your rights, legal resources',
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Guides', url: '/guides' }],
    faqs: [
      { question: 'Are your legal guides free?', answer: 'Yes, all our guides are free. We believe in empowering people with legal knowledge. For personalized advice, book a free consultation.' },
      { question: 'Can I rely on these guides as legal advice?', answer: 'Our guides provide general information only, not legal advice. Every situation is unique. For advice on your specific case, consult with us directly.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ,
      {
        question: 'How much does this service cost?',
        answer: 'Fees vary by service complexity. We offer free consultations to assess your matter and provide transparent, upfront pricing with no hidden costs.'
      }
    ]
  },

  '/guides/traffic-ticket-guide': {
    title: 'Complete Traffic Ticket Guide Ontario | How to Fight Tickets',
    description: 'Complete guide to fighting traffic tickets in Ontario. Understand your options, the court process, and when to hire a paralegal.',
    keywords: 'traffic ticket guide ontario, fight traffic ticket how to, traffic court guide',
    schema: { type: 'Article', name: 'Traffic Ticket Guide' },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Guides', url: '/guides' }, { name: 'Traffic Ticket Guide', url: '/guides/traffic-ticket-guide' }],
    faqs: [
      { question: 'Should I just pay my traffic ticket?', answer: 'Usually no. Paying admits guilt, adds points, and raises insurance. Fighting often results in reduced charges or dismissal - even if you were speeding.' },
      { question: 'What are my options when I get a ticket?', answer: 'Three options: pay and plead guilty, request a meeting with the prosecutor (Option 2), or request a trial (Option 3). We typically recommend Option 3 or representation.' },
      { question: 'How long do I have to respond to a ticket?', answer: 'You have 15 days from the date on the ticket to respond. Missing this deadline can result in a conviction in absence.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  '/guides/ltb-guide': {
    title: 'Landlord Tenant Board Guide Ontario | LTB Process Explained',
    description: 'Complete guide to the Landlord and Tenant Board. Understand evictions, rent increases, maintenance, and tenant rights in Ontario.',
    keywords: 'LTB guide ontario, landlord tenant board how to, eviction process guide, tenant rights guide',
    schema: { type: 'Article', name: 'LTB Guide' },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Guides', url: '/guides' }, { name: 'LTB Guide', url: '/guides/ltb-guide' }],
    faqs: [
      { question: 'How do I file with the LTB?', answer: 'File online through the Tribunals Ontario portal. Choose the correct form (L1 for rent arrears, T2 for tenant rights, etc.). Pay the filing fee. The LTB schedules a hearing.' },
      { question: 'How long does the LTB process take?', answer: 'Currently 2-6 months for most matters due to backlogs. Non-payment cases may be faster. Complex cases take longer. Urgent matters can request expedited hearings.' },
      { question: 'Do I need representation at the LTB?', answer: 'Not required, but strongly recommended. The other side often has representation. Professional help significantly improves outcomes and reduces stress.' }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    ]
  },

  '/guides/small-claims-guide': {
    title: 'Small Claims Court Guide Ontario | How to Sue or Defend',
    description: 'Complete guide to Small Claims Court in Ontario. Learn how to file a claim, defend yourself, and collect judgments up to $50,000.',
    keywords: 'small claims court guide ontario, how to sue ontario, small claims process guide',
    schema: { type: 'Article', name: 'Small Claims Court Guide' },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Guides', url: '/guides' }, { name: 'Small Claims Guide', url: '/guides/small-claims-guide' }],
    faqs: [
      { question: 'How much does Small Claims Court cost?', answer: 'Filing fees: $102 (claims up to $500) or $273 (over $500). Additional fees for serving documents, trial requests, and enforcement. Most costs recoverable if you win.' },
      { question: 'What\'s the process for Small Claims Court?', answer: 'File claim, serve defendant, wait for defence, attend mandatory settlement conference, trial if not settled, enforcement if needed. Takes 6-12 months typically.' },
      { question: 'Can I sue for any amount?', answer: 'Small Claims maximum is $50,000 plus interest and costs. Larger claims need Superior Court (requires a lawyer). You can reduce your claim to fit Small Claims.' }
    ,
      {
        question: 'What costs can I recover if I win?',
        answer: 'Filing fees, service costs, and portion of legal fees (up to 15% of claim). Interest on judgment also awarded. We pursue full cost recovery.'
      }
    ]
  },

  '/guides/hrto-guide': {
    title: 'Human Rights Tribunal Guide Ontario | HRTO Process Explained',
    description: 'Complete guide to the Human Rights Tribunal of Ontario. Filing discrimination complaints, the process, remedies available.',
    keywords: 'HRTO guide ontario, human rights complaint how to, discrimination complaint guide',
    schema: { type: 'Article', name: 'HRTO Guide' },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Guides', url: '/guides' }, { name: 'HRTO Guide', url: '/guides/hrto-guide' }],
    faqs: [
      { question: 'What is the time limit for HRTO complaints?', answer: 'One year from the last discriminatory incident. Extensions are rarely granted. If discrimination is ongoing, file while it continues.' },
      { question: 'What can I get from an HRTO complaint?', answer: 'Remedies include: monetary compensation for lost income and injury to dignity, reinstatement, policy changes, and public interest remedies.' },
      { question: 'Is the HRTO process free?', answer: 'Yes, there are no filing fees at the HRTO. However, legal representation costs money. We offer competitive rates for HRTO matters.' }
    ,
      {
        question: 'What remedies can the HRTO award?',
        answer: 'Monetary compensation for lost wages and dignity injury, policy changes, required training, reinstatement. We pursue maximum appropriate remedies.'
      }
    ]
  },

  '/guides/eviction-guide': {
    title: 'Eviction Guide Ontario | For Landlords and Tenants',
    description: 'Complete guide to evictions in Ontario. Understand the process whether you\'re a landlord pursuing eviction or a tenant defending.',
    keywords: 'eviction guide ontario, how to evict tenant, eviction defence guide, N4 notice guide',
    schema: { type: 'Article', name: 'Eviction Guide' },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Guides', url: '/guides' }, { name: 'Eviction Guide', url: '/guides/eviction-guide' }],
    faqs: [
      { question: 'How long does eviction take in Ontario?', answer: 'For non-payment: 2-4 months typically. For cause evictions: 3-6 months. N12 personal use: 3-6 months. Complex cases or appeals take longer.' },
      { question: 'Can a landlord just change the locks?', answer: 'Never. Illegal lockouts violate the RTA. Only the Sheriff can enforce an eviction order. Landlords face significant penalties for self-help evictions.' },
      { question: 'Can I stop an eviction for non-payment?', answer: 'Often yes. Pay arrears before or at the hearing. Request a payment plan. Raise maintenance issues as offset. Request relief from eviction based on circumstances.' }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    ]
  },

  '/guides/tenant-rights-guide': {
    title: 'Tenant Rights Guide Ontario | Know Your Rights as a Renter',
    description: 'Complete guide to tenant rights in Ontario. Rent increases, maintenance, privacy, eviction protection, and how to enforce your rights.',
    keywords: 'tenant rights ontario, renter rights guide, landlord obligations ontario',
    schema: { type: 'Article', name: 'Tenant Rights Guide' },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Guides', url: '/guides' }, { name: 'Tenant Rights Guide', url: '/guides/tenant-rights-guide' }],
    faqs: [
      { question: 'Can my landlord enter my unit whenever they want?', answer: 'No. Landlords must give 24 hours written notice for most entries, entering only between 8am-8pm. Emergency entries are an exception. You can refuse improper entries.' },
      { question: 'Can my landlord raise rent whenever they want?', answer: 'No. Rent can only increase once per 12 months, with 90 days notice, by the guideline amount (2.5% in 2024) unless AGI approved. Exceptions for post-2018 units.' },
      { question: 'What if my landlord won\'t do repairs?', answer: 'Document requests in writing. Give reasonable time. File T6 application with LTB for orders and rent abatement. Don\'t withhold rent - it can lead to eviction.' }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    ]
  },

  '/guides/landlord-rights-guide': {
    title: 'Landlord Rights Guide Ontario | Property Owner Legal Guide',
    description: 'Complete guide to landlord rights in Ontario. Rent collection, evictions, property access, tenant screening, and protecting your investment.',
    keywords: 'landlord rights ontario, property owner rights, landlord legal guide ontario',
    schema: { type: 'Article', name: 'Landlord Rights Guide' },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Guides', url: '/guides' }, { name: 'Landlord Rights Guide', url: '/guides/landlord-rights-guide' }],
    faqs: [
      { question: 'Can I evict a tenant for any reason?', answer: 'No. Ontario only allows eviction for specific reasons: non-payment, persistent late payment, illegal activity, damage, interference with others, or landlord/purchaser own use.' },
      { question: 'How do I screen tenants legally?', answer: 'You can request: rental history, references, credit check (with consent), income verification. You cannot discriminate based on protected grounds like race, family status, or income source.' },
      { question: 'Can I charge security deposits?', answer: 'No. Ontario prohibits security/damage deposits. You can only collect first and last month\'s rent. Last month\'s rent must be applied to the final month, not damages.' }
    ,
      {
        question: 'How long will my LTB case take?',
        answer: 'Current processing times vary 3-12 months depending on application type and urgency. We work to move your case forward as efficiently as possible.'
      }
    ]
  },

  '/guides/employment-rights-guide': {
    title: 'Employment Rights Guide Ontario | Worker Rights Explained',
    description: 'Complete guide to employment rights in Ontario. Termination, severance, workplace standards, discrimination, and how to protect yourself.',
    keywords: 'employment rights ontario, worker rights guide, termination rights ontario',
    schema: { type: 'Article', name: 'Employment Rights Guide' },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Guides', url: '/guides' }, { name: 'Employment Rights Guide', url: '/guides/employment-rights-guide' }],
    faqs: [
      { question: 'Can I be fired without cause in Ontario?', answer: 'Yes, but you\'re entitled to reasonable notice or pay in lieu. ESA sets minimums; common law often provides more. "Just cause" (serious misconduct) eliminates notice entitlement.' },
      { question: 'What are minimum wage and overtime rules?', answer: 'Minimum wage is $16.55/hour (2024). Overtime (1.5x) after 44 hours/week for most employees. Some jobs are exempt from overtime provisions.' },
      { question: 'What if I\'m harassed at work?', answer: 'Report to HR/management. If not resolved, file with HRTO (for human rights harassment) or Ministry of Labour (for workplace harassment). Document everything.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },

  '/guides/consumer-rights-guide': {
    title: 'Consumer Rights Guide Ontario | Know Your Buyer Rights',
    description: 'Complete guide to consumer rights in Ontario. Product warranties, unfair practices, refunds, and how to resolve consumer disputes.',
    keywords: 'consumer rights ontario, buyer rights guide, consumer protection ontario',
    schema: { type: 'Article', name: 'Consumer Rights Guide' },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Guides', url: '/guides' }, { name: 'Consumer Rights Guide', url: '/guides/consumer-rights-guide' }],
    faqs: [
      { question: 'Can I return something I bought?', answer: 'Store return policies are discretionary - no automatic right to return. However, defective goods and misrepresented goods must be refunded or replaced under law.' },
      { question: 'What are cooling-off periods?', answer: 'Certain contracts have cancellation periods: door-to-door sales (10 days), gym memberships (10 days), timeshares (10 days). Regular purchases don\'t have cooling-off.' },
      { question: 'What if a business won\'t honor a warranty?', answer: 'Document the defect and attempts to claim. File complaint with Ministry of Consumer Services. Sue in Small Claims Court for breach of warranty.' }
    ,
      {
        question: 'What costs can I recover if I win?',
        answer: 'Filing fees, service costs, and portion of legal fees (up to 15% of claim). Interest on judgment also awarded. We pursue full cost recovery.'
      }
    ]
  },

  '/guides/debt-collection-guide': {
    title: 'Debt Collection Guide Ontario | Collect Money Owed to You',
    description: 'Complete guide to collecting debts in Ontario. Demand letters, Small Claims Court, judgment enforcement, and collection strategies.',
    keywords: 'debt collection guide ontario, collect money owed, judgment collection guide',
    schema: { type: 'Article', name: 'Debt Collection Guide' },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Guides', url: '/guides' }, { name: 'Debt Collection Guide', url: '/guides/debt-collection-guide' }],
    faqs: [
      { question: 'How do I collect a debt someone owes me?', answer: 'Start with a demand letter. If ignored, file in Small Claims Court. If you win and they don\'t pay, use enforcement tools: garnishment, examination, seizure.' },
      { question: 'How long do I have to collect a debt?', answer: 'Two year limitation period from when debt was due or last acknowledged. After 2 years, you cannot sue. However, judgments last 6 years and can be renewed.' },
      { question: 'What if the debtor has no money?', answer: 'Get your judgment and renew it before it expires. Situations change - they may get a job (garnishment), buy property (lien), or receive inheritance. Persist.' }
    ,
      {
        question: 'What costs can I recover if I win?',
        answer: 'Filing fees, service costs, and portion of legal fees (up to 15% of claim). Interest on judgment also awarded. We pursue full cost recovery.'
      }
    ]
  },

  '/guides/court-preparation-guide': {
    title: 'Court Preparation Guide | How to Prepare for Your Hearing',
    description: 'Complete guide to preparing for court in Ontario. What to bring, how to dress, what to expect, and how to present your case effectively.',
    keywords: 'court preparation guide ontario, how to prepare for court, court appearance tips',
    schema: { type: 'Article', name: 'Court Preparation Guide' },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Guides', url: '/guides' }, { name: 'Court Preparation Guide', url: '/guides/court-preparation-guide' }],
    faqs: [
      { question: 'What should I bring to court?', answer: 'Bring: all documents related to your case (organized chronologically), photos/evidence, witness contact info, notepad, pen, government ID, and patience.' },
      { question: 'How should I dress for court?', answer: 'Dress professionally - business casual at minimum. No hats, shorts, flip-flops, or offensive clothing. First impressions matter to judges and adjudicators.' },
      { question: 'What if I\'m nervous about court?', answer: 'Arrive early and observe other proceedings. Prepare your key points in writing. Speak slowly and clearly. Address the judge as "Your Honour." It\'s okay to ask to repeat a question.' }
    ,
      {
        question: 'How long will this affect my insurance?',
        answer: 'A traffic conviction typically affects insurance rates for 3 years from conviction date. Impact varies by insurer and offence. Fighting often costs less than long-term insurance increase.'
      }
    ]
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get SEO config for a route, with fallback to defaults
 */
export function getSEOConfig(path: string): SEOConfig {
  // Direct match
  if (seoConfig[path]) {
    return seoConfig[path];
  }
  
  // Return default config
  return {
    title: 'LegalAssist Paralegal Services | London Ontario',
    description: 'Licensed paralegal services in London, Ontario. Traffic tickets, landlord-tenant, small claims court, human rights tribunal. Free consultation.',
    keywords: 'paralegal london ontario, legal services, traffic ticket lawyer, LTB paralegal'
  };
}

/**
 * Generate JSON-LD Schema for FAQ pages
 */
export function generateFAQSchema(faqs: FAQ[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Generate JSON-LD Schema for Local Business
 */
export function generateLocalBusinessSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": businessInfo.name,
    "url": businessInfo.url,
    "telephone": businessInfo.telephone,
    "email": businessInfo.email,
    "address": {
      "@type": "PostalAddress",
      ...businessInfo.address
    },
    "geo": {
      "@type": "GeoCoordinates",
      ...businessInfo.geo
    },
    "priceRange": businessInfo.priceRange,
    "openingHours": businessInfo.openingHours,
    "areaServed": [
      { "@type": "City", "name": "London" },
      { "@type": "AdministrativeArea", "name": "Middlesex County" },
      { "@type": "AdministrativeArea", "name": "Southwestern Ontario" }
    ],
    "serviceType": [
      "Traffic Ticket Defence",
      "Landlord Tenant Board Representation",
      "Small Claims Court",
      "Human Rights Tribunal",
      "Provincial Offences"
    ]
  };
}

/**
 * Generate JSON-LD Schema for Service pages
 */
export function generateServiceSchema(config: SEOConfig, canonicalUrl: string): object {
  if (!config.schema) return {};
  
  return {
    "@context": "https://schema.org",
    "@type": config.schema.type || "LegalService",
    "@id": `${canonicalUrl}#service`,
    "name": config.schema.name || config.title,
    "url": canonicalUrl,
    "description": config.description,
    "provider": {
      "@type": "LegalService",
      "@id": "https://legalassist.london/#organization",
      "name": businessInfo.name,
      "url": businessInfo.url
    },
    "serviceType": config.schema.serviceType,
    "areaServed": config.schema.areaServed?.map(area => ({
      "@type": "AdministrativeArea",
      "name": area
    }))
  };
}

/**
 * Generate Breadcrumb JSON-LD Schema
 */
export function generateBreadcrumbSchema(breadcrumbs: BreadcrumbItem[], baseUrl: string): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${baseUrl}${item.url}`
    }))
  };
}

// Export total count for reference
export const totalConfiguredPages = Object.keys(seoConfig).length;
