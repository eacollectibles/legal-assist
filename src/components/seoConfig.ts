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
  name: 'Legal Assist Paralegal Services',
  url: 'https://www.legalassist.london',
  telephone: '+12262725153',
  telephoneDisplay: '226-272-5153',
  email: 'jeanfrancois@legalassist.london',
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
    title: 'Legal Assist Paralegal Services | London Ontario | Affordable Legal Help',
    description: 'Licensed paralegal services in London, Ontario. Traffic tickets, landlord-tenant disputes, small claims court, human rights tribunal. Free consultation. Call 226-272-5153.',
    keywords: 'paralegal london ontario, legal services london, traffic ticket lawyer london, LTB paralegal, small claims court london',
    schema: {
      type: 'LocalBusiness',
      name: 'Legal Assist Paralegal Services',
      areaServed: ['London', 'Middlesex County', 'Southwestern Ontario']
    },
    breadcrumbs: [
      { name: 'Home', url: '/' }
    ],
    faqs: [
      {
        question: 'What services does Legal Assist offer?',
        answer: 'Legal Assist provides licensed paralegal services including traffic ticket defence, landlord-tenant board representation, small claims court litigation, human rights tribunal applications, employment disputes, and provincial offences defence throughout Southwestern Ontario.'
      },
      {
        question: 'How much does a paralegal cost in London, Ontario?',
        answer: 'Our fees vary by service type. Traffic tickets start at $300, LTB matters from $500, and Small Claims Court from $750. We offer free consultations and transparent flat-rate pricing with no hidden fees.'
      },
      {
        question: 'Do you offer free consultations?',
        answer: 'Yes, we offer free initial consultations for all services. Call 226-272-5153 or book online to discuss your case with a licensed paralegal at no obligation.'
      }
    ]
  },

  '/contact': {
    title: 'Contact Us | Free Consultation | Legal Assist London Ontario',
    description: 'Contact Legal Assist for a free consultation. Located in London, Ontario. Call 226-272-5153 or book online. Traffic tickets, LTB, small claims court representation.',
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
        answer: 'We typically respond to all inquiries within 24 hours on business days. For urgent matters, please call us directly at 226-272-5153.'
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
    title: 'About Legal Assist | Licensed Paralegal Services | London Ontario',
    description: 'Learn about Legal Assist Paralegal Services. Licensed by the Law Society of Ontario. Serving London and Southwestern Ontario with affordable legal representation.',
    keywords: 'about legalassist, licensed paralegal ontario, LSO paralegal london, paralegal credentials',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'About', url: '/about' }
    ],
    faqs: [
      {
        question: 'Is Legal Assist licensed by the Law Society of Ontario?',
        answer: 'Yes, Legal Assist Paralegal Services is fully licensed and regulated by the Law Society of Ontario (LSO). All our paralegals maintain good standing with the LSO and carry professional liability insurance.'
      },
      {
        question: 'What areas do you serve?',
        answer: 'We serve London and all of Southwestern Ontario including St. Thomas, Woodstock, Kitchener-Waterloo, Windsor, Sarnia, Stratford, Guelph, Brantford, and surrounding communities.'
      }
    ,
      {
        question: 'Are you licensed by the Law Society of Ontario?',
        answer: 'Yes, Legal Assist Paralegal Services is fully licensed and regulated by the Law Society of Ontario. We maintain professional liability insurance and follow all LSO rules of professional conduct.'
      },
      {
        question: 'How long have you been in practice?',
        answer: 'We have been serving Southwestern Ontario with professional paralegal services for several years. Our team stays current through continuing professional development.'
      }
    ]
  },

  '/about/student-placement': {
    title: 'Student Placement Program | Paralegal Field Placement | Legal Assist London',
    description: 'Legal Assist accepts student placements from accredited Ontario paralegal and law clerk programs. Learn about our high standards, application process, interview, speaking test, and onboarding requirements.',
    keywords: 'paralegal student placement ontario, paralegal field placement london, law clerk placement, paralegal internship, student placement program, paralegal co-op ontario, legal placement london ontario',
    schema: { type: 'Article', name: 'Student Placement Program' },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }, { name: 'Student Placements', url: '/about/student-placement' }],
    faqs: [
      { question: 'Does Legal Assist accept student placements?', answer: 'Yes, we accept placements from accredited Ontario college Paralegal, Law Clerk, and Legal Assistant programs. Our program provides hands-on experience with real client files under direct supervision.' },
      { question: 'Is the student placement paid?', answer: 'No, this is an educational field placement where students earn academic credit. However, students who demonstrate exceptional performance may be considered for paid positions after graduation and licensing.' },
      { question: 'What is the application process for a student placement?', answer: 'Submit a cover letter, resume, unofficial transcript, program coordinator letter, two references, and a writing sample. Shortlisted candidates complete an in-person interview with a speaking and communication test.' },
      { question: 'Can I complete the placement remotely?', answer: 'No, all placements are in-person at our London, Ontario office. Legal work requires hands-on experience with physical files, court attendance, and face-to-face client interaction.' }
    ]
  },

  '/services': {
    title: 'Legal Services | Traffic Tickets, LTB, Small Claims | Legal Assist',
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
    title: 'Demerit Points Guide Ontario | How Points Work | Legal Assist',
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
        answer: 'An AGI allows landlords to increase rent beyond the annual guideline (2.1% in 2026, down from 2.5% in 2024 and 2025) for extraordinary costs: major capital repairs, significant increases in property taxes, or utility cost increases. Requires LTB approval through an L5 application.'
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
    title: 'Rent Increase Guide Ontario | Legal Rent Increases | Legal Assist',
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
        answer: 'For rent-controlled units, landlords can only increase rent by the annual guideline (2.1% in 2026, down from 2.5% in 2024 and 2025) once per year with 90 days written notice. Units first occupied after November 15, 2018 are exempt from rent control and have no limit.'
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
    description: 'Facing eviction from subsidized housing? RGI and social housing evictions have special rules. Professional representation in London, Ontario.',
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
        answer: 'Yes, you can have a licensed paralegal, lawyer, or unpaid friend/family member represent you. Paralegals offer professional representation at lower cost than lawyers. We handle all aspects from preparation through hearing and can often achieve better outcomes.'
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
    description: 'Understanding the Small Claims Court process in Ontario. From filing to trial, learn each step. Professional representation in London.',
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
    description: 'Expert debt collection services in London, Ontario via Small Claims Court. Recover unpaid invoices, loans, and money owed. Free consultation. Call 226-272-5153.',
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
    description: 'Contract dispute representation in London, Ontario. Breach of contract claims up to $50,000. Small Claims Court expertise. Free consultation. 226-272-5153.',
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
    description: 'Enforce your Small Claims judgment in London, Ontario. Wage garnishment, bank seizure, asset examination. Expert collection strategies. Call 226-272-5153.',
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
    description: 'Property damage claims in London, Ontario via Small Claims Court. Vehicle damage, destruction from negligence. Professional representation. Free consultation.',
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
    description: 'Collect unpaid invoices in London, Ontario. Small Claims Court business debt recovery. Demand letters, filing, enforcement. Call 226-272-5153.',
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
    description: 'Recover wrongfully withheld security deposits in London, Ontario. Landlord illegal deductions. Small Claims or LTB action. Free consultation.',
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
    description: 'Consumer protection claims in London, Ontario. Defective products, refunds, unfair business practices. Small Claims Court representation.',
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
    description: 'Personal injury claims up to $50,000 in London, Ontario. Slip and fall, negligence, minor injuries. Small Claims Court representation. Call 226-272-5153.',
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
    description: 'Home improvement disputes in London, Ontario. Bad contractors, incomplete work, poor quality. Small Claims Court representation. Free consultation.',
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
    description: 'Lemon car claims in London, Ontario. Undisclosed damage, misrepresented vehicles. Small Claims Court representation. Free consultation. 226-272-5153.',
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
    description: 'Neighbour disputes in London, Ontario. Fences, tree damage, property lines, trespass. Small Claims Court representation. Free consultation. 226-272-5153.',
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
    description: 'Recover personal belongings in London, Ontario via Small Claims Court. Conversion claims up to $50,000. Free consultation. 226-272-5153.',
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
    description: 'Warranty breach claims in London, Ontario. Product and service warranties not honored. Expert Small Claims representation. Call 226-272-5153.',
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
    description: 'Personal loan recovery in London, Ontario via Small Claims Court. Friends, family, colleagues who won\'t repay. Free consultation. 226-272-5153.',
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
    description: 'Landlord damage recovery in London, Ontario. Tenant damaged property? Small Claims Court representation for repairs and deductions. Free consultation.',
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
    description: 'Defamation claims in London, Ontario. Slander, libel, false statements damaging reputation. Small Claims Court representation. Free consultation. 226-272-5153.',
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
    description: 'Workplace discrimination claims in London, Ontario. Race, gender, disability, age discrimination at work. HRTO representation. Free consultation. 226-272-5153.',
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
    description: 'Housing discrimination claims in London, Ontario via HRTO. Denied housing based on race, family status, disability. Free consultation. 226-272-5153.',
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
    description: 'Disability accommodation claims in London, Ontario. Duty to accommodate, workplace accessibility, AODA. HRTO representation. Free consultation. 226-272-5153.',
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
    description: 'Sexual harassment claims in London, Ontario. Workplace harassment, hostile environment. HRTO representation. Expert support. Call 226-272-5153.',
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
    description: 'Age discrimination claims in London, Ontario. Workplace ageism, mandatory retirement, hiring discrimination. HRTO representation. Free consultation.',
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
    description: 'Human rights reprisal claims in London, Ontario. Retaliated for complaints, investigation participation. HRTO representation. Free consultation.',
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
    description: 'Wrongful termination help in London, Ontario. Fired without proper notice or just cause. Assess your entitlement. Free consultation. 226-272-5153.',
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
    description: 'Recover unpaid wages in London, Ontario. Employer owes overtime, vacation pay, commissions. Ministry of Labour, Small Claims. Free consultation.',
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
    description: 'Severance pay disputes in London, Ontario. Calculate ESA and common law entitlements. Negotiate better packages. Call 226-272-5153.',
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
    description: 'Constructive dismissal claims in London, Ontario. Job changed, hostile work environment, forced resignation. Expert assessment. Free consultation.',
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
    description: 'Provincial Offences Act defence in London, Ontario. Municipal bylaws, regulatory violations, provincial court representation. Call 226-272-5153.',
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
    description: 'Mischief under $5000 defence in London, Ontario. Vandalism, graffiti, property damage charges. Diversion options. Free consultation. 226-272-5153.',
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
    description: 'Regulatory offence defence in London, Ontario. OHSA, environmental, professional regulation violations. Professional representation. Free consultation.',
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
    description: 'Fail to comply defence in London, Ontario. Bail conditions, probation breach, court order violations. Professional representation. Call 226-272-5153.',
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
  '/paralegal-london-ontario': {
    title: 'Paralegal London Ontario | Affordable Legal Services London ON',
    description: 'Licensed paralegal in London, Ontario. Small Claims Court, Landlord & Tenant Board, traffic tickets, human rights tribunal. Serving London & Middlesex County. Free consultation.',
    keywords: 'paralegal london ontario, paralegal london on, london paralegal services, small claims court london, landlord tenant board london, traffic ticket london, licensed paralegal london ontario, affordable paralegal london',
    schema: { type: 'LocalBusiness', name: 'Legal Assist - Paralegal London Ontario', areaServed: ['London', 'Middlesex County', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Paralegal London Ontario', url: '/paralegal-london-ontario' }],
    faqs: [
      { question: 'Where is Legal Assist located in London?', answer: 'We serve all of London and Middlesex County. We handle matters at London courts including the Ontario Court of Justice at 80 Dundas Street and Superior Court at 80 Dundas Street.' },
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

  '/landlord-tenant-paralegal-london': {
    title: 'Landlord Tenant Paralegal London Ontario | LTB Representation London',
    description: 'Licensed paralegal for landlord and tenant disputes in London, Ontario. Evictions, rent disputes, LTB hearings, N4/N5/N12 notices. Serving London & Middlesex County. Free consultation.',
    keywords: 'landlord tenant paralegal london, ltb london ontario, eviction paralegal london, landlord tenant board london, tenant rights london, landlord services london ontario',
    schema: { type: 'LocalBusiness', name: 'Legal Assist - Landlord Tenant Paralegal London', areaServed: ['London', 'Middlesex County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Paralegal London Ontario', url: '/paralegal-london-ontario' }, { name: 'Landlord & Tenant', url: '/landlord-tenant-paralegal-london' }],
    faqs: [
      { question: 'How much does a landlord tenant paralegal cost in London?', answer: 'Our rates are significantly lower than London lawyers. We offer transparent retainer agreements with clear pricing. Contact us for a free consultation to discuss your specific LTB matter.' },
      { question: 'Can a paralegal represent me at the London LTB?', answer: 'Yes. Licensed paralegals are authorized by the Law Society of Ontario to represent both landlords and tenants at the Landlord and Tenant Board, including all hearings and mediations.' },
      { question: 'How long does an LTB case take in London?', answer: 'LTB timelines vary depending on the type of application. Non-payment of rent matters are typically resolved within 1-3 months, while other matters may take longer. We provide realistic timelines during your free consultation.' }
    ]
  },

  '/small-claims-paralegal-london': {
    title: 'Small Claims Court Paralegal London Ontario | Claims up to $50,000',
    description: 'Licensed paralegal for Small Claims Court in London, Ontario. Debt recovery, contract disputes, property damage claims up to $50,000. London courthouse experience. Free consultation.',
    keywords: 'small claims court paralegal london, small claims london ontario, debt recovery london, contract dispute london, sue someone london ontario, paralegal small claims london',
    schema: { type: 'LocalBusiness', name: 'Legal Assist - Small Claims Paralegal London', areaServed: ['London', 'Middlesex County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Paralegal London Ontario', url: '/paralegal-london-ontario' }, { name: 'Small Claims Court', url: '/small-claims-paralegal-london' }],
    faqs: [
      { question: 'How much can I sue for in London Small Claims Court?', answer: 'Small Claims Court in Ontario handles claims up to $50,000 (not including interest and costs). Claims above this amount must be filed in Superior Court, which requires a lawyer.' },
      { question: 'Where is London Small Claims Court?', answer: 'Small Claims Court matters for London and Middlesex County are heard at the Superior Court of Justice at 80 Dundas Street, London, Ontario.' },
      { question: 'How long does a small claims case take in London?', answer: 'From filing to trial, a London Small Claims case typically takes 6-12 months. Many cases settle at the mandatory settlement conference, which is usually scheduled within 3-6 months of filing.' }
    ]
  },

  '/traffic-ticket-paralegal-london': {
    title: 'Traffic Ticket Paralegal London Ontario | Fight Your London Ticket',
    description: 'Licensed paralegal to fight traffic tickets in London, Ontario. Speeding, careless driving, stunt driving, red light cameras. London Provincial Offences Court experience. Free consultation.',
    keywords: 'traffic ticket paralegal london, fight speeding ticket london, careless driving london ontario, stunt driving london, london provincial offences court, traffic lawyer london ontario',
    schema: { type: 'LocalBusiness', name: 'Legal Assist - Traffic Ticket Paralegal London', areaServed: ['London', 'Middlesex County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Paralegal London Ontario', url: '/paralegal-london-ontario' }, { name: 'Traffic Tickets', url: '/traffic-ticket-paralegal-london' }],
    faqs: [
      { question: 'How much does it cost to fight a traffic ticket in London?', answer: 'Our fees depend on the type of charge and complexity. Speeding tickets start at an affordable flat rate. Contact us for a free consultation and quote specific to your London traffic ticket.' },
      { question: 'Do I need to go to court for my London traffic ticket?', answer: 'In most cases, no. Your paralegal appears at the London Provincial Offences Court on your behalf, so you do not need to miss work or make court appearances.' },
      { question: 'How long do I have to fight a London traffic ticket?', answer: 'You have 15 days from the date on the ticket to request a trial or early resolution. Missing this deadline can result in an automatic conviction. Contact us immediately after receiving a ticket.' }
    ]
  },

  '/hrto-paralegal-london': {
    title: 'HRTO Paralegal London Ontario | Human Rights Tribunal Representation',
    description: 'Licensed paralegal for Human Rights Tribunal (HRTO) applications in London, Ontario. Employment discrimination, housing discrimination, harassment. Serving London & Middlesex County.',
    keywords: 'hrto paralegal london, human rights tribunal london ontario, discrimination paralegal london, workplace discrimination london, housing discrimination london, hrto application london',
    schema: { type: 'LocalBusiness', name: 'Legal Assist - HRTO Paralegal London', areaServed: ['London', 'Middlesex County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Paralegal London Ontario', url: '/paralegal-london-ontario' }, { name: 'Human Rights Tribunal', url: '/hrto-paralegal-london' }],
    faqs: [
      { question: 'How long do I have to file a human rights complaint in London?', answer: 'You have one year from the date of the last discriminatory act to file an application with the Human Rights Tribunal of Ontario. Contact us as soon as possible to preserve your rights.' },
      { question: 'Can a paralegal represent me at the HRTO?', answer: 'Yes. Licensed paralegals are authorized to represent applicants and respondents at the Human Rights Tribunal of Ontario for all types of discrimination complaints.' },
      { question: 'What compensation can I get from the HRTO?', answer: 'HRTO remedies can include monetary compensation for injury to dignity, lost wages, reinstatement to employment, policy changes, and other non-monetary orders. Awards vary based on the severity and circumstances of the discrimination.' }
    ]
  },

  '/st-thomas-paralegal': {
    title: 'St. Thomas Paralegal | Legal Services Elgin County',
    description: 'Affordable paralegal services in St. Thomas, Elgin County. Traffic tickets, landlord-tenant disputes, small claims. Serving Aylmer, Port Stanley. Call 226-272-5153.',
    keywords: 'paralegal st thomas, elgin county legal services, st thomas traffic ticket, st thomas lawyer alternative',
    schema: { type: 'LocalBusiness', name: 'Legal Assist St. Thomas', areaServed: ['St. Thomas', 'Elgin County'] },
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
    description: 'Licensed paralegal services in Woodstock, Oxford County. Traffic defence, LTB, small claims at Woodstock courthouse. Free consultation. 226-272-5153.',
    keywords: 'paralegal woodstock, oxford county legal services, woodstock traffic ticket, woodstock lawyer alternative',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Woodstock', areaServed: ['Woodstock', 'Oxford County'] },
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
    description: 'Licensed paralegal services in Ingersoll, Ontario. Traffic tickets, landlord-tenant, small claims (heard in Woodstock). Free consultation. Call 226-272-5153.',
    keywords: 'paralegal ingersoll, ingersoll legal services, ingersoll traffic ticket, ingersoll lawyer',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Ingersoll', areaServed: ['Ingersoll', 'Oxford County'] },
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
    description: 'Paralegal services in Tillsonburg, Ontario. Traffic tickets, landlord-tenant, small claims. Serving Oxford and Norfolk counties. Free consultation.',
    keywords: 'paralegal tillsonburg, tillsonburg legal services, tillsonburg traffic ticket',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Tillsonburg', areaServed: ['Tillsonburg', 'Oxford County', 'Norfolk County'] },
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
    description: 'Paralegal services in Aylmer, Ontario. Traffic tickets, landlord-tenant, small claims (heard in St. Thomas). Free consultation. Call 226-272-5153.',
    keywords: 'paralegal aylmer, aylmer legal services, aylmer traffic ticket',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Aylmer', areaServed: ['Aylmer', 'Elgin County'] },
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
    description: 'Paralegal services in Strathroy, Chatham and surrounding areas. Traffic tickets, LTB, small claims court. Chatham courthouse representation.',
    keywords: 'paralegal strathroy, paralegal chatham, strathroy legal services, chatham traffic ticket',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Strathroy-Chatham', areaServed: ['Strathroy', 'Chatham-Kent', 'Middlesex County'] },
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
    description: 'Kitchener-Waterloo paralegal services at courthouse (200 Frederick Street). Traffic tickets, LTB, small claims. Free consultation. 226-272-5153.',
    keywords: 'paralegal kitchener, kitchener waterloo legal services, kitchener traffic ticket, waterloo region paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Kitchener', areaServed: ['Kitchener', 'Waterloo', 'Cambridge', 'Waterloo Region'] },
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
    description: 'Cambridge paralegal services (matters heard in Kitchener). Traffic tickets, landlord-tenant, small claims. Free consultation. Call 226-272-5153.',
    keywords: 'paralegal cambridge ontario, cambridge legal services, cambridge traffic ticket',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Cambridge', areaServed: ['Cambridge', 'Waterloo Region'] },
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
    description: 'Guelph courthouse paralegal services (74 Woolwich Street). Traffic tickets, landlord-tenant, small claims, provincial offences. Call 226-272-5153.',
    keywords: 'paralegal guelph, guelph legal services, guelph traffic ticket, wellington county paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Guelph', areaServed: ['Guelph', 'Wellington County'] },
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
    description: 'Brantford courthouse paralegal services (70 Wellington Street). Traffic tickets, landlord-tenant, small claims. Free consultation. 226-272-5153.',
    keywords: 'paralegal brantford, brantford legal services, brantford traffic ticket, brant county paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Brantford', areaServed: ['Brantford', 'Brant County'] },
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
    description: 'Stratford courthouse paralegal services for Perth County. Traffic tickets, landlord-tenant, small claims, provincial offences. Free consultation.',
    keywords: 'paralegal stratford, stratford legal services, stratford traffic ticket, perth county paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Stratford', areaServed: ['Stratford', 'Perth County'] },
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
    description: 'Sarnia courthouse paralegal services (700 Christina Street North). Traffic, landlord-tenant, small claims, LTB. Call 226-272-5153.',
    keywords: 'paralegal sarnia, sarnia legal services, sarnia traffic ticket, lambton county paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Sarnia', areaServed: ['Sarnia', 'Lambton County'] },
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
    description: 'Windsor courthouse paralegal services (245 Windsor Avenue). Traffic tickets, landlord-tenant, small claims, LTB. Call 226-272-5153.',
    keywords: 'paralegal windsor, windsor legal services, windsor traffic ticket, essex county paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Windsor', areaServed: ['Windsor', 'Essex County'] },
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
    description: 'Chatham courthouse paralegal services. Traffic tickets, landlord-tenant, small claims, provincial offences. Free consultation. 226-272-5153.',
    keywords: 'paralegal chatham kent, chatham legal services, chatham traffic ticket',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Chatham-Kent', areaServed: ['Chatham-Kent', 'Chatham', 'Wallaceburg', 'Ridgetown'] },
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
    description: 'Leamington paralegal services (matters heard in Windsor). Traffic tickets, landlord-tenant, small claims. Free consultation. 226-272-5153.',
    keywords: 'paralegal leamington, leamington legal services, leamington traffic ticket',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Leamington', areaServed: ['Leamington', 'Essex County', 'Kingsville'] },
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
    description: 'Norfolk County paralegal services at Simcoe courthouse. Traffic tickets, landlord-tenant, small claims, LTB. Free consultation. 226-272-5153.',
    keywords: 'paralegal norfolk county, simcoe legal services, port dover paralegal, norfolk traffic ticket',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Norfolk County', areaServed: ['Norfolk County', 'Simcoe', 'Port Dover', 'Delhi'] },
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
    description: 'Huron County paralegal services at Goderich courthouse. Traffic tickets, landlord-tenant, small claims, LTB. Free consultation. 226-272-5153.',
    keywords: 'paralegal huron county, goderich legal services, huron county traffic ticket',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Huron County', areaServed: ['Huron County', 'Goderich', 'Clinton', 'Seaforth'] },
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
  // GTA & BROADER REACH CITIES (10 pages)
  // ============================================
  '/locations/mississauga': {
    title: 'Mississauga Paralegal | Legal Services Peel Region',
    description: 'Mississauga paralegal services for Peel Region. Traffic tickets on QEW/403/401, Small Claims Court, LTB hearings. Free consultation. 226-272-5153.',
    keywords: 'paralegal mississauga, mississauga legal services, mississauga traffic ticket, peel region paralegal, mississauga small claims',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Mississauga', areaServed: ['Mississauga', 'Peel Region', 'Streetsville', 'Port Credit'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Mississauga', url: '/locations/mississauga' }],
    faqs: [
      { question: 'Do you handle traffic tickets from the QEW and 403?', answer: 'Yes, we defend traffic tickets issued on the QEW, Highway 403, Highway 401, and Mississauga city streets including Hurontario, Dundas, and Erin Mills Parkway.' },
      { question: 'Where are Mississauga court matters heard?', answer: 'Most Mississauga matters are heard at Brampton courthouse (A. Grenville & William Davis Courthouse) or Mississauga Provincial Offences Court.' },
      { question: 'Do you offer evening or weekend appointments?', answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.' },
      { question: 'What areas in Peel Region do you serve?', answer: 'We serve Mississauga, Streetsville, Port Credit, Meadowvale, Erin Mills, Cooksville, and all of Peel Region.' }
    ]
  },

  '/locations/brampton': {
    title: 'Brampton Paralegal | Legal Services Brampton Ontario',
    description: 'Brampton paralegal services at A. Grenville & William Davis Courthouse. Traffic tickets, Small Claims, LTB, provincial offences. Free consultation. 226-272-5153.',
    keywords: 'paralegal brampton, brampton legal services, brampton traffic ticket, brampton small claims court, peel region paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Brampton', areaServed: ['Brampton', 'Caledon', 'Bolton', 'Peel Region'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Brampton', url: '/locations/brampton' }],
    faqs: [
      { question: 'Do you appear at Brampton courthouse?', answer: 'Yes, we regularly appear at the A. Grenville & William Davis Courthouse in Brampton for traffic, provincial offences, small claims, and LTB matters.' },
      { question: 'What areas near Brampton do you serve?', answer: 'We serve Brampton, Caledon, Bolton, Georgetown, Bramalea, Heart Lake, and all of Peel Region.' },
      { question: 'Do you offer evening or weekend appointments?', answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.' },
      { question: 'Can you help with Highway 410 speeding tickets?', answer: 'Absolutely. We handle all Highway 410 traffic offences including speeding, careless driving, and stunt driving charges.' }
    ]
  },

  '/locations/oakville': {
    title: 'Oakville Paralegal | Legal Services Halton Region',
    description: 'Oakville paralegal services for Halton Region. Traffic tickets on QEW/403, Small Claims Court, LTB hearings. Free consultation. 226-272-5153.',
    keywords: 'paralegal oakville, oakville legal services, oakville traffic ticket, halton region paralegal, oakville small claims',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Oakville', areaServed: ['Oakville', 'Halton Region', 'Milton', 'Halton Hills'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Oakville', url: '/locations/oakville' }],
    faqs: [
      { question: 'Where are Oakville court matters heard?', answer: 'Oakville matters are typically heard at Milton courthouse or Oakville Provincial Offences Court depending on the matter type.' },
      { question: 'Do you handle QEW speeding tickets through Oakville?', answer: 'Yes, we defend tickets issued on the QEW, Highway 403, Trafalgar Road, and all Oakville area roads.' },
      { question: 'Do you offer evening or weekend appointments?', answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.' },
      { question: 'What communities in Halton do you serve?', answer: 'We serve Oakville, Milton, Halton Hills, Bronte, Glen Abbey, Kerr Village, and surrounding Halton Region.' }
    ]
  },

  '/locations/burlington': {
    title: 'Burlington Paralegal | Legal Services Burlington Ontario',
    description: 'Burlington paralegal services for Halton Region. Traffic tickets on QEW/403, Small Claims Court, LTB hearings. Free consultation. 226-272-5153.',
    keywords: 'paralegal burlington, burlington legal services, burlington traffic ticket, halton region paralegal, burlington small claims',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Burlington', areaServed: ['Burlington', 'Halton Region', 'Waterdown', 'Flamborough'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Burlington', url: '/locations/burlington' }],
    faqs: [
      { question: 'Where are Burlington court matters heard?', answer: 'Burlington matters may be heard at Hamilton courthouse or Milton courthouse depending on the offence type and jurisdiction.' },
      { question: 'Do you serve Waterdown and Flamborough?', answer: 'Yes, we serve Burlington, Aldershot, Waterdown, Flamborough, Stoney Creek, Dundas, and surrounding communities.' },
      { question: 'Do you offer evening or weekend appointments?', answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.' },
      { question: 'Can you help with QEW tickets near the Skyway?', answer: 'Yes, we handle all traffic offences on the QEW, Highway 403, and Burlington city streets including speeding and careless driving.' }
    ]
  },

  '/locations/oshawa': {
    title: 'Oshawa Paralegal | Legal Services Durham Region',
    description: 'Oshawa paralegal services at Durham Region courthouse. Traffic tickets on Highway 401, Small Claims, LTB, provincial offences. Free consultation. 226-272-5153.',
    keywords: 'paralegal oshawa, oshawa legal services, oshawa traffic ticket, durham region paralegal, oshawa small claims court',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Oshawa', areaServed: ['Oshawa', 'Durham Region', 'Whitby', 'Courtice'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Oshawa', url: '/locations/oshawa' }],
    faqs: [
      { question: 'Do you appear at Oshawa courthouse?', answer: 'Yes, we appear at the Ontario Court of Justice and Superior Court of Justice in Oshawa for traffic, small claims, provincial offences, and LTB matters.' },
      { question: 'What areas in Durham Region do you serve?', answer: 'We serve Oshawa, Whitby, Courtice, Bowmanville, Ajax, Pickering, and all Durham Region communities.' },
      { question: 'Do you offer evening or weekend appointments?', answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.' },
      { question: 'Can you help with Highway 401 tickets near Oshawa?', answer: 'Yes, we handle all Highway 401 traffic offences through Durham Region including speeding, careless driving, and stunt driving.' }
    ]
  },

  '/locations/whitby': {
    title: 'Whitby Paralegal | Legal Services Whitby Ontario',
    description: 'Whitby paralegal services for south Durham Region. Traffic tickets on Highway 401, Small Claims, LTB hearings. Free consultation. 226-272-5153.',
    keywords: 'paralegal whitby, whitby legal services, whitby traffic ticket, durham region paralegal, whitby small claims',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Whitby', areaServed: ['Whitby', 'Durham Region', 'Brooklin', 'Ajax'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Whitby', url: '/locations/whitby' }],
    faqs: [
      { question: 'Where are Whitby court matters heard?', answer: 'Whitby matters are typically heard at Oshawa courthouse or Whitby Provincial Offences Court depending on the matter type.' },
      { question: 'Do you serve Brooklin and Ajax?', answer: 'Yes, we serve Whitby, Brooklin, Ajax, Pickering, Port Perry, Uxbridge, and surrounding Durham communities.' },
      { question: 'Do you offer evening or weekend appointments?', answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.' },
      { question: 'Can you handle Highway 401 and Highway 12 tickets?', answer: 'Yes, we defend all traffic offences on Highway 401, Highway 12, Brock Street, and Whitby area roads.' }
    ]
  },

  '/locations/markham': {
    title: 'Markham Paralegal | Legal Services York Region',
    description: 'Markham paralegal services for York Region. Traffic tickets on Highway 404/Highway 7, Small Claims Court, LTB hearings. Free consultation. 226-272-5153.',
    keywords: 'paralegal markham, markham legal services, markham traffic ticket, york region paralegal, markham small claims court',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Markham', areaServed: ['Markham', 'York Region', 'Unionville', 'Stouffville'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Markham', url: '/locations/markham' }],
    faqs: [
      { question: 'Where are Markham court matters heard?', answer: 'Markham matters are typically heard at Newmarket courthouse or Markham Provincial Offences Court depending on the matter type.' },
      { question: 'Do you serve Unionville and Stouffville?', answer: 'Yes, we serve Markham, Unionville, Stouffville, Richmond Hill, Thornhill, and surrounding York Region.' },
      { question: 'Do you offer evening or weekend appointments?', answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.' },
      { question: 'Can you help with Highway 404 and Highway 7 tickets?', answer: 'Yes, we handle all traffic offences on Highway 404, Highway 7, Markham Road, Kennedy Road, and Markham area streets.' }
    ]
  },

  '/locations/niagara-falls': {
    title: 'Niagara Falls Paralegal | Legal Services Niagara Region',
    description: 'Niagara Falls paralegal services for Niagara Region. Traffic tickets on QEW/Highway 420, Small Claims Court, LTB hearings. Free consultation. 226-272-5153.',
    keywords: 'paralegal niagara falls, niagara falls legal services, niagara falls traffic ticket, niagara region paralegal, niagara small claims',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Niagara Falls', areaServed: ['Niagara Falls', 'Niagara Region', 'Fort Erie', 'Niagara-on-the-Lake'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Niagara Falls', url: '/locations/niagara-falls' }],
    faqs: [
      { question: 'Do you handle Niagara Falls tourist district tickets?', answer: 'Yes, we defend all traffic and by-law offences in the Niagara Falls area including Lundy\'s Lane, Highway 420, and the tourist district.' },
      { question: 'Where are Niagara Falls court matters heard?', answer: 'Niagara Falls matters are heard at St. Catharines courthouse or Niagara Falls Provincial Offences Court depending on the offence.' },
      { question: 'Do you offer evening or weekend appointments?', answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.' },
      { question: 'What communities in Niagara do you serve?', answer: 'We serve Niagara Falls, Niagara-on-the-Lake, Fort Erie, Thorold, Chippawa, Welland, and all of Niagara Region.' }
    ]
  },

  '/locations/st-catharines': {
    title: 'St. Catharines Paralegal | Legal Services Niagara Peninsula',
    description: 'St. Catharines paralegal services at Niagara courthouse. Traffic tickets on QEW/Highway 406, Small Claims Court, LTB hearings. Free consultation. 226-272-5153.',
    keywords: 'paralegal st catharines, st catharines legal services, st catharines traffic ticket, niagara region paralegal, st catharines small claims',
    schema: { type: 'LocalBusiness', name: 'Legal Assist St. Catharines', areaServed: ['St. Catharines', 'Niagara Region', 'Thorold', 'Merritton'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'St. Catharines', url: '/locations/st-catharines' }],
    faqs: [
      { question: 'Do you appear at St. Catharines courthouse?', answer: 'Yes, we regularly appear at the Ontario Court of Justice and Superior Court of Justice in St. Catharines for traffic, small claims, provincial offences, and LTB matters.' },
      { question: 'What areas near St. Catharines do you serve?', answer: 'We serve St. Catharines, Thorold, Merritton, Port Dalhousie, Jordan, Vineland, and surrounding Niagara Peninsula.' },
      { question: 'Do you offer evening or weekend appointments?', answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.' },
      { question: 'Can you help with QEW and Highway 406 tickets?', answer: 'Yes, we handle all traffic offences on the QEW, Highway 406, Ontario Street, Geneva Street, and St. Catharines area roads.' }
    ]
  },

  '/locations/welland': {
    title: 'Welland Paralegal | Legal Services South Niagara',
    description: 'Welland paralegal services for south Niagara Region. Traffic tickets, Small Claims Court, LTB hearings, provincial offences. Free consultation. 226-272-5153.',
    keywords: 'paralegal welland, welland legal services, welland traffic ticket, south niagara paralegal, welland small claims court',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Welland', areaServed: ['Welland', 'South Niagara', 'Pelham', 'Port Colborne'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Welland', url: '/locations/welland' }],
    faqs: [
      { question: 'Do you appear at Welland courthouse?', answer: 'Yes, we appear at the Ontario Court of Justice in Welland for traffic, small claims, provincial offences, and LTB matters.' },
      { question: 'What communities near Welland do you serve?', answer: 'We serve Welland, Pelham, Fonthill, Port Colborne, Wainfleet, Dunnville, and surrounding south Niagara communities.' },
      { question: 'Do you offer evening or weekend appointments?', answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.' },
      { question: 'Can you help with Highway 140 and Highway 58 tickets?', answer: 'Yes, we handle all traffic offences on Highway 140, Highway 58, King Street, and Welland area roads.' }
    ]
  },

  '/locations/toronto': {
    title: 'Toronto Paralegal | Legal Services Greater Toronto Area',
    description: 'Toronto paralegal services for the GTA. Traffic tickets on DVP/Gardiner/401/427, Small Claims Court, LTB hearings. Free consultation. 226-272-5153.',
    keywords: 'paralegal toronto, toronto legal services, toronto traffic ticket, gta paralegal, toronto small claims court, toronto landlord tenant',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Toronto', areaServed: ['Toronto', 'North York', 'Scarborough', 'Etobicoke', 'East York'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Toronto', url: '/locations/toronto' }],
    faqs: [
      { question: 'Do you handle traffic tickets from the DVP and Gardiner Expressway?', answer: 'Yes, we defend traffic tickets issued on the DVP, Gardiner Expressway, Highway 401, Highway 427, Highway 400, and all Toronto city streets.' },
      { question: 'Where are Toronto court matters heard?', answer: 'Toronto matters are heard at Old City Hall, 2201 Finch Ave West courthouse, and various Provincial Offences courts across the city depending on location.' },
      { question: 'Do you offer evening or weekend appointments?', answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.' },
      { question: 'What areas of Toronto do you serve?', answer: 'We serve all of Toronto including Downtown, North York, Scarborough, Etobicoke, East York, York, and surrounding GTA communities.' }
    ]
  },

  '/locations/richmond-hill': {
    title: 'Richmond Hill Paralegal | Legal Services York Region',
    description: 'Richmond Hill paralegal services for York Region. Traffic tickets on Highway 404/407, Small Claims Court, LTB hearings. Free consultation. 226-272-5153.',
    keywords: 'paralegal richmond hill, richmond hill legal services, richmond hill traffic ticket, york region paralegal, richmond hill small claims',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Richmond Hill', areaServed: ['Richmond Hill', 'York Region', 'Thornhill', 'Oak Ridges'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Richmond Hill', url: '/locations/richmond-hill' }],
    faqs: [
      { question: 'Where are Richmond Hill court matters heard?', answer: 'Richmond Hill matters are typically heard at Newmarket courthouse (Ontario Court of Justice) or York Region Provincial Offences Court.' },
      { question: 'Do you handle Highway 404 and 407 speeding tickets?', answer: 'Yes, we defend tickets issued on Highway 404, Highway 407, Yonge Street, Bayview Avenue, and all Richmond Hill area roads.' },
      { question: 'Do you offer evening or weekend appointments?', answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.' },
      { question: 'What areas in York Region do you serve?', answer: 'We serve Richmond Hill, Thornhill, Oak Ridges, Jefferson, Langstaff, and surrounding York Region communities.' }
    ]
  },

  '/locations/vaughan': {
    title: 'Vaughan Paralegal | Legal Services Vaughan Ontario',
    description: 'Vaughan paralegal services for York Region. Traffic tickets on Highway 400/407, Small Claims Court, LTB hearings. Free consultation. 226-272-5153.',
    keywords: 'paralegal vaughan, vaughan legal services, vaughan traffic ticket, woodbridge paralegal, york region paralegal, vaughan small claims',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Vaughan', areaServed: ['Vaughan', 'Woodbridge', 'Maple', 'Kleinburg', 'Concord'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Vaughan', url: '/locations/vaughan' }],
    faqs: [
      { question: 'Do you handle Highway 400 speeding tickets?', answer: 'Yes, we defend all Highway 400 traffic offences including speeding, careless driving, and stunt driving charges through Vaughan and York Region.' },
      { question: 'Where are Vaughan court matters heard?', answer: 'Vaughan matters are typically heard at Newmarket courthouse or York Region Provincial Offences Court depending on the offence type.' },
      { question: 'Do you offer evening or weekend appointments?', answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.' },
      { question: 'What communities in Vaughan do you serve?', answer: 'We serve Vaughan, Woodbridge, Maple, Kleinburg, Concord, Thornhill, and all of York Region.' }
    ]
  },

  '/locations/newmarket': {
    title: 'Newmarket Paralegal | Legal Services North York Region',
    description: 'Newmarket paralegal services for north York Region. Traffic tickets on Highway 404/400, Small Claims Court, LTB hearings. Free consultation. 226-272-5153.',
    keywords: 'paralegal newmarket, newmarket legal services, newmarket traffic ticket, aurora paralegal, north york region paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Newmarket', areaServed: ['Newmarket', 'Aurora', 'East Gwillimbury', 'Holland Landing'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Newmarket', url: '/locations/newmarket' }],
    faqs: [
      { question: 'Do you appear at Newmarket courthouse?', answer: 'Yes, we regularly appear at the Ontario Court of Justice in Newmarket for traffic, provincial offences, small claims, and LTB matters.' },
      { question: 'What areas near Newmarket do you serve?', answer: 'We serve Newmarket, Aurora, East Gwillimbury, Holland Landing, Sharon, Mount Albert, and surrounding north York Region.' },
      { question: 'Do you offer evening or weekend appointments?', answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.' },
      { question: 'Can you help with Davis Drive and Highway 404 tickets?', answer: 'Absolutely. We handle all traffic offences on Davis Drive, Highway 404, Highway 400, Yonge Street, and Newmarket area roads.' }
    ]
  },

  '/locations/ajax': {
    title: 'Ajax Paralegal | Legal Services Durham Region',
    description: 'Ajax paralegal services for Durham Region. Traffic tickets on Highway 401/412, Small Claims Court, LTB hearings. Free consultation. 226-272-5153.',
    keywords: 'paralegal ajax, ajax legal services, ajax traffic ticket, durham region paralegal, ajax small claims court',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Ajax', areaServed: ['Ajax', 'Durham Region', 'Pickering', 'Whitby'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Ajax', url: '/locations/ajax' }],
    faqs: [
      { question: 'Where are Ajax court matters heard?', answer: 'Ajax matters are typically heard at Oshawa courthouse or Ajax Provincial Offences Court depending on the matter type.' },
      { question: 'Do you handle Highway 401 and 412 speeding tickets?', answer: 'Yes, we defend tickets issued on Highway 401, Highway 412, Kingston Road, Harwood Avenue, and all Ajax area roads.' },
      { question: 'Do you offer evening or weekend appointments?', answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.' },
      { question: 'What areas in Durham do you serve from Ajax?', answer: 'We serve Ajax, Pickering, Whitby, and western Durham Region communities.' }
    ]
  },

  '/locations/pickering': {
    title: 'Pickering Paralegal | Legal Services Durham Region',
    description: 'Pickering paralegal services for Durham Region. Traffic tickets on Highway 401/407, Small Claims Court, LTB hearings. Free consultation. 226-272-5153.',
    keywords: 'paralegal pickering, pickering legal services, pickering traffic ticket, durham region paralegal, pickering small claims',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Pickering', areaServed: ['Pickering', 'Durham Region', 'Ajax', 'Rouge Park'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Pickering', url: '/locations/pickering' }],
    faqs: [
      { question: 'Where are Pickering court matters heard?', answer: 'Pickering matters are typically heard at Oshawa courthouse or Durham Region Provincial Offences Court.' },
      { question: 'Do you handle Highway 401 tickets through Pickering?', answer: 'Yes, we defend tickets issued on Highway 401, Highway 407, Brock Road, Kingston Road, and all Pickering area roads.' },
      { question: 'Do you offer evening or weekend appointments?', answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.' },
      { question: 'What areas near Pickering do you serve?', answer: 'We serve Pickering, Rouge Park, Claremont, Greenwood, Bay Ridges, and surrounding Durham Region.' }
    ]
  },

  '/locations/milton': {
    title: 'Milton Paralegal | Legal Services Halton Region',
    description: 'Milton paralegal services for Halton Region. Traffic tickets on Highway 401/407, Small Claims Court, LTB hearings. Free consultation. 226-272-5153.',
    keywords: 'paralegal milton, milton legal services, milton traffic ticket, halton region paralegal, milton small claims court',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Milton', areaServed: ['Milton', 'Halton Region', 'Campbellville', 'Halton Hills'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Milton', url: '/locations/milton' }],
    faqs: [
      { question: 'Do you appear at Milton courthouse?', answer: 'Yes, we regularly appear at the Ontario Court of Justice in Milton for traffic, provincial offences, small claims, and LTB matters.' },
      { question: 'Do you handle Highway 401 and 407 tickets near Milton?', answer: 'Yes, we defend tickets issued on Highway 401, Highway 407, James Snow Parkway, Trafalgar Road, and Milton area roads.' },
      { question: 'Do you offer evening or weekend appointments?', answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.' },
      { question: 'What communities near Milton do you serve?', answer: 'We serve Milton, Campbellville, Kilbride, Nassagaweya, Halton Hills, and surrounding Halton Region.' }
    ]
  },

  '/locations/hamilton': {
    title: 'Hamilton Paralegal | Legal Services Golden Horseshoe',
    description: 'Hamilton paralegal services for the Golden Horseshoe. Traffic tickets on QEW/LINC/403, Small Claims Court, LTB hearings. Free consultation. 226-272-5153.',
    keywords: 'paralegal hamilton, hamilton legal services, hamilton traffic ticket, hamilton small claims court, stoney creek paralegal, dundas paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Hamilton', areaServed: ['Hamilton', 'Stoney Creek', 'Dundas', 'Ancaster', 'Flamborough'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Hamilton', url: '/locations/hamilton' }],
    faqs: [
      { question: 'Do you appear at Hamilton courthouse?', answer: 'Yes, we regularly appear at the John Dickinson Hamilton courthouse and Hamilton Provincial Offences Court for traffic, small claims, provincial offences, and LTB matters.' },
      { question: 'Do you handle QEW and LINC tickets through Hamilton?', answer: 'Yes, we defend tickets issued on the QEW, Lincoln Alexander Parkway (LINC), Highway 403, Red Hill Valley Parkway, and all Hamilton area roads.' },
      { question: 'Do you offer evening or weekend appointments?', answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.' },
      { question: 'What areas in Hamilton do you serve?', answer: 'We serve Hamilton, Stoney Creek, Dundas, Ancaster, Flamborough, Waterdown, Mount Hope, and the wider Golden Horseshoe.' }
    ]
  },

  '/locations/barrie': {
    title: 'Barrie Paralegal | Legal Services Simcoe County',
    description: 'Barrie paralegal services for Simcoe County. Traffic tickets on Highway 400/11, Small Claims Court, LTB hearings. Free consultation. 226-272-5153.',
    keywords: 'paralegal barrie, barrie legal services, barrie traffic ticket, simcoe county paralegal, barrie small claims court, innisfil paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Barrie', areaServed: ['Barrie', 'Innisfil', 'Orillia', 'Simcoe County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Barrie', url: '/locations/barrie' }],
    faqs: [
      { question: 'Do you appear at Barrie courthouse?', answer: 'Yes, we regularly appear at the Ontario Court of Justice in Barrie and Provincial Offences Court for traffic, small claims, and LTB matters.' },
      { question: 'Do you handle Highway 400 speeding tickets?', answer: 'Yes, we defend all Highway 400 traffic offences including speeding, careless driving, stunt driving, and racing charges through Simcoe County.' },
      { question: 'Do you offer evening or weekend appointments?', answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.' },
      { question: 'What areas near Barrie do you serve?', answer: 'We serve Barrie, Innisfil, Angus, Orillia, Alliston, Midhurst, and surrounding Simcoe County communities.' }
    ]
  },

  '/locations/stouffville': {
    title: 'Stouffville Paralegal | Legal Services York Region',
    description: 'Stouffville paralegal services for east York Region. Traffic tickets on Highway 404/48, Small Claims Court, LTB hearings. Free consultation. 226-272-5153.',
    keywords: 'paralegal stouffville, stouffville legal services, stouffville traffic ticket, york region paralegal, uxbridge paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Stouffville', areaServed: ['Stouffville', 'Uxbridge', 'York Region', 'Ballantrae'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/services' }, { name: 'Stouffville', url: '/locations/stouffville' }],
    faqs: [
      { question: 'Where are Stouffville court matters heard?', answer: 'Stouffville matters are typically heard at Newmarket courthouse (Ontario Court of Justice) or York Region Provincial Offences Court.' },
      { question: 'Do you handle Highway 404 and Highway 48 tickets?', answer: 'Yes, we defend tickets issued on Highway 404, Highway 48, Stouffville Road, and all Stouffville and east York Region roads.' },
      { question: 'Do you offer evening or weekend appointments?', answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request for clients with weekday conflicts.' },
      { question: 'What areas near Stouffville do you serve?', answer: 'We serve Stouffville, Uxbridge, Ballantrae, Musselman Lake, Mount Albert, and surrounding east York Region.' }
    ]
  },

  // ============================================
  // NEW SERVICE PAGES - WSIB, BENEFITS, SPECIALTY
  // ============================================

  '/services/airline-disputes': {
    title: 'Airline Disputes & Compensation Claims | Flight Delay, Cancellation, Lost Baggage | Ontario',
    description: 'Fight airline compensation denials in Ontario. Flight delays ($400-$1,000), denied boarding ($900-$2,400), lost baggage (up to $2,900). APPR experts. CTA complaints filed. Free consultation.',
    keywords: 'airline compensation canada, flight delay compensation, appr claim, denied boarding compensation, lost baggage claim, cta complaint, airline dispute ontario, flight cancellation refund',
    schema: { type: 'LegalService', name: 'Airline Dispute Services', serviceType: 'Air Passenger Compensation Claims', areaServed: ['Ontario', 'Canada'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Airline Disputes', url: '/services/airline-disputes' }],
    faqs: [
      { question: 'How much compensation am I entitled to for a flight delay in Canada?', answer: 'Under the APPR, large airlines must pay $400 for 3-6 hour delays, $700 for 6-9 hours, and $1,000 for 9+ hours. Small airlines pay $125, $250, and $500 respectively. These are fixed amounts set by Canadian law.' },
      { question: 'What compensation do I get for being bumped from a flight?', answer: 'Denied boarding compensation is $900 (under 6 hours late), $1,800 (6-9 hours late), or $2,400 (9+ hours late). Airlines must pay within 48 hours without requiring a formal claim.' },
      { question: 'How do I file a complaint with the Canadian Transportation Agency?', answer: 'First submit a written claim to the airline and wait 30 days. If unresolved, file through the CTA online complaints portal with all documentation. A Complaints Resolution Officer will review and issue a binding decision.' },
      { question: 'Can I claim compensation for lost luggage in Canada?', answer: 'Yes. Under the Montreal Convention, airlines are liable for up to approximately $2,900 CAD for lost baggage. For delayed bags, you can claim reimbursement for essential items purchased. Report damaged bags within 7 days and delayed bags within 21 days.' }
    ]
  },

  '/services/wsib-claims': {
    title: 'WSIB Claims & Appeals | Workplace Injury | London Ontario Paralegal',
    description: 'WSIB claims representation in London, Ontario. Workplace injury benefits, denied claims appeals, WSIAT hearings. Get the benefits you deserve.',
    keywords: 'wsib claims london, workplace injury ontario, wsib appeal, wsib denied claim, wsiat hearing, workplace safety',
    schema: { type: 'LegalService', name: 'WSIB Claims Services', serviceType: 'WSIB Representation', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'WSIB Claims', url: '/services/wsib-claims' }],
    faqs: [
      { question: 'How long do I have to file a WSIB claim?', answer: 'You must report a workplace injury to your employer and file a WSIB claim within 6 months of the injury. Late claims may be accepted with valid reasons, but filing promptly protects your rights.' },
      { question: 'What benefits does WSIB provide?', answer: 'WSIB provides loss of earnings benefits (85% of net pay), full healthcare coverage for your injury, labour market re-entry programs, and permanent impairment benefits if applicable.' },
      { question: 'Can I appeal a denied WSIB claim?', answer: 'Yes. You can request an internal review by WSIB, then appeal to the Workplace Safety and Insurance Appeals Tribunal (WSIAT). A paralegal can represent you at both levels.' },
      { question: 'Do I need a paralegal for a WSIB claim?', answer: 'While not required, professional representation significantly improves outcomes, especially for denied claims and appeals. We handle evidence gathering, medical documentation, and hearing advocacy.' }
    ]
  },

  '/services/odsp-appeals': {
    title: 'ODSP Appeals | Disability Benefits | London Ontario Paralegal',
    description: 'ODSP appeal representation in London, Ontario. Ontario Disability Support Program denials, Social Benefits Tribunal hearings. Protect your disability benefits.',
    keywords: 'odsp appeal london, disability benefits ontario, social benefits tribunal, odsp denied, odsp eligibility',
    schema: { type: 'LegalService', name: 'ODSP Appeals Services', serviceType: 'Disability Benefits Appeals', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'ODSP Appeals', url: '/services/odsp-appeals' }],
    faqs: [
      { question: 'What qualifies as a disability for ODSP?', answer: 'ODSP requires a "substantial" physical or mental impairment that is continuous or recurrent, expected to last a year or more, and directly results in a substantial restriction in daily activities, self-care, or workplace function.' },
      { question: 'How do I appeal an ODSP denial?', answer: 'First request an internal review within 30 days of the decision. If denied again, appeal to the Social Benefits Tribunal (SBT) within 30 days of the internal review decision.' },
      { question: 'What evidence do I need for an ODSP appeal?', answer: 'Strong medical evidence is critical — specialist reports, treatment records, functional assessments, and supporting letters from healthcare providers documenting how your condition restricts daily activities.' },
      { question: 'How long does the ODSP appeal process take?', answer: 'Internal review takes 4-8 weeks. SBT hearings are typically scheduled within 3-6 months of filing. The entire process can take 6-12 months from initial denial to final decision.' }
    ]
  },

  '/services/ontario-works-appeals': {
    title: 'Ontario Works Appeals | OW Benefits | London Ontario Paralegal',
    description: 'Ontario Works appeal representation in London, Ontario. OW benefit denials, reduction appeals, Social Benefits Tribunal hearings.',
    keywords: 'ontario works appeal london, ow benefits denied, social assistance appeal, ontario works eligibility',
    schema: { type: 'LegalService', name: 'Ontario Works Appeals', serviceType: 'Social Assistance Appeals', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Ontario Works Appeals', url: '/services/ontario-works-appeals' }],
    faqs: [
      { question: 'Why was my Ontario Works cut off?', answer: 'Common reasons include missed participation requirements, unreported income, exceeding asset limits, or not completing required job search activities. You have the right to appeal any reduction or termination.' },
      { question: 'Can I appeal an Ontario Works decision?', answer: 'Yes. Request an internal review within 30 days, then appeal to the Social Benefits Tribunal if the internal review is unsuccessful. Benefits may continue during the appeal process.' },
      { question: 'What are Ontario Works participation requirements?', answer: 'OW requires participating in employment activities (job search, training, community placement) unless you have a valid exemption such as medical condition, caregiving responsibilities, or age.' },
      { question: 'Do I need a paralegal for an OW appeal?', answer: 'Professional representation can significantly improve your chances, especially at the Social Benefits Tribunal. We handle evidence preparation, legal arguments, and hearing advocacy.' }
    ]
  },

  '/services/workplace-harassment': {
    title: 'Workplace Harassment | OHSA Complaints | London Ontario Paralegal',
    description: 'Workplace harassment representation in London, Ontario. OHSA complaints, MOL investigations, Bill 132 compliance, constructive dismissal claims.',
    keywords: 'workplace harassment london, ohsa complaint ontario, workplace bullying, constructive dismissal, bill 132',
    schema: { type: 'LegalService', name: 'Workplace Harassment Services', serviceType: 'Employment Dispute Resolution', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Workplace Harassment', url: '/services/workplace-harassment' }],
    faqs: [
      { question: 'What qualifies as workplace harassment in Ontario?', answer: 'Under OHSA, workplace harassment is engaging in a course of vexatious comment or conduct that is known or ought reasonably to be known to be unwelcome. This includes bullying, intimidation, and repeated offensive behaviour.' },
      { question: 'What are my employer obligations under Bill 132?', answer: 'Employers must have a harassment policy, investigation procedures, provide training, and investigate all complaints. Failure to comply can result in MOL orders and fines.' },
      { question: 'Can I file a complaint with the Ministry of Labour?', answer: 'Yes. If your employer fails to investigate or address harassment, you can file a complaint with the MOL. An inspector will investigate and can order the employer to comply with OHSA requirements.' },
      { question: 'What is constructive dismissal?', answer: 'When an employer makes working conditions so intolerable that a reasonable person would feel forced to resign. Unchecked harassment can constitute constructive dismissal, entitling you to severance.' }
    ]
  },

  '/services/insurance-disputes': {
    title: 'Insurance Disputes | Accident Benefits | London Ontario Paralegal',
    description: 'Insurance dispute representation in London, Ontario. Denied accident benefits, SABS claims, LAT hearings. Fight denied insurance claims.',
    keywords: 'insurance dispute london, denied accident benefits, sabs claim, lat hearing ontario, auto insurance dispute',
    schema: { type: 'LegalService', name: 'Insurance Dispute Services', serviceType: 'Insurance Claims Advocacy', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Insurance Disputes', url: '/services/insurance-disputes' }],
    faqs: [
      { question: 'What are accident benefits in Ontario?', answer: 'Ontario has a no-fault accident benefits system (SABS) providing income replacement, medical/rehabilitation benefits, attendant care, and housekeeping benefits regardless of who caused the accident.' },
      { question: 'Can I dispute a denied insurance claim?', answer: 'Yes. If your insurer denies benefits, you can apply to the Licence Appeal Tribunal (LAT) for a hearing. A paralegal can represent you through the dispute resolution process.' },
      { question: 'What is the deadline to dispute a denied claim?', answer: 'You generally have 2 years from the date of the insurer denial to file a LAT application. However, acting quickly preserves evidence and strengthens your case.' },
      { question: 'What does no-fault insurance mean?', answer: 'No-fault means you claim accident benefits from your own insurer regardless of who caused the accident. You may still sue the at-fault driver for additional damages through the courts.' }
    ]
  },

  '/services/bylaw-infractions': {
    title: 'Bylaw Infractions | Provincial Offences | London Ontario Paralegal',
    description: 'Bylaw infraction defence in London, Ontario. Municipal bylaw violations, noise complaints, property standards, fire code violations, trespassing charges.',
    keywords: 'bylaw infraction london, provincial offence defence, noise bylaw, property standards, fire code violation',
    schema: { type: 'LegalService', name: 'Bylaw Infraction Defence', serviceType: 'Provincial Offences Defence', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Bylaw Infractions', url: '/services/bylaw-infractions' }],
    faqs: [
      { question: 'What are common bylaw infractions?', answer: 'Noise complaints, property standards violations, zoning infractions, parking bylaws, animal control, sign permits, business licensing, and fire code violations are the most common municipal bylaw charges.' },
      { question: 'Can I fight a bylaw ticket?', answer: 'Yes. Bylaw infractions are prosecuted under the Provincial Offences Act and you have the right to a trial. Many tickets can be withdrawn, reduced, or dismissed with proper defence.' },
      { question: 'What are the penalties for bylaw violations?', answer: 'Fines vary by municipality and offence type, from $100 to several thousand dollars. Some violations carry mandatory compliance orders. A conviction may also affect property insurance.' },
      { question: 'How long do I have to respond to a bylaw ticket?', answer: 'You typically have 15 days from receiving the ticket to request a trial. Missing this deadline may result in a conviction being entered in your absence (ex parte).' }
    ]
  },

  '/services/parking-tickets': {
    title: 'Parking Ticket Disputes | Fight Parking Tickets | London Ontario Paralegal',
    description: 'Parking ticket dispute representation in London, Ontario. Municipal parking tickets, private lot tickets, meter disputes. Fight unfair parking tickets.',
    keywords: 'parking ticket dispute london, fight parking ticket ontario, parking fine appeal, meter dispute',
    schema: { type: 'LegalService', name: 'Parking Ticket Defence', serviceType: 'Parking Dispute Resolution', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Parking Tickets', url: '/services/parking-tickets' }],
    faqs: [
      { question: 'Can I fight a parking ticket in Ontario?', answer: 'Yes. Municipal parking tickets can be disputed by requesting a trial within 15 days. Private lot tickets are contractual matters and have different dispute processes.' },
      { question: 'What are common defences for parking tickets?', answer: 'Inadequate signage, broken meters, medical emergency, unclear road markings, permit display issues, and incorrect information on the ticket are all valid defences.' },
      { question: 'What is the difference between municipal and private parking tickets?', answer: 'Municipal tickets are issued by the city and enforced through the courts. Private lot tickets are contractual and cannot affect your driving record or be enforced through licence plate denial.' },
      { question: 'What happens if I ignore a parking ticket?', answer: 'Municipal tickets escalate — unpaid fines can result in licence plate renewal denial. Private tickets may be sent to collections but cannot affect your driving privileges.' }
    ]
  },

  '/services/condo-disputes': {
    title: 'Condo Disputes | CAT Tribunal | London Ontario Paralegal',
    description: 'Condominium dispute representation in London, Ontario. CAT hearings, condo board disputes, common element issues, pet restrictions, records requests.',
    keywords: 'condo dispute london, cat tribunal ontario, condo board dispute, common elements, condo records',
    schema: { type: 'LegalService', name: 'Condo Dispute Services', serviceType: 'Condominium Dispute Resolution', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Condo Disputes', url: '/services/condo-disputes' }],
    faqs: [
      { question: 'What disputes does the CAT handle?', answer: 'The Condominium Authority Tribunal handles disputes about condo records access, pet restrictions, vehicle parking/storage, noise and nuisance, and compliance with governing documents.' },
      { question: 'How does the CAT process work?', answer: 'CAT uses a three-stage online process: negotiation (free), mediation ($50 fee), then adjudication ($125 fee). Most disputes resolve before adjudication. The process is designed to be accessible.' },
      { question: 'Can my condo board ban pets?', answer: 'It depends on the condo declaration. If the declaration prohibits pets, the restriction is generally enforceable. If only the rules restrict pets, the restriction may be challengeable as unreasonable.' },
      { question: 'Can I access my condo corporation records?', answer: 'Yes. Owners have the right to access most condo corporation records within 30 days of request. If denied, the CAT can order disclosure. Some records require fees for copies.' }
    ]
  },

  '/services/dangerous-dog-hearings': {
    title: 'Dangerous Dog Hearings | Dog Owners Liability | London Ontario Paralegal',
    description: 'Dangerous dog hearing representation in London, Ontario. Dog bite defence, muzzle orders, destruction order appeals, breed-specific legislation.',
    keywords: 'dangerous dog hearing london, dog owners liability act, dog bite defence, muzzle order, pit bull ban ontario',
    schema: { type: 'LegalService', name: 'Dangerous Dog Defence', serviceType: 'Animal Control Hearings', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Dangerous Dog Hearings', url: '/services/dangerous-dog-hearings' }],
    faqs: [
      { question: 'What happens at a dangerous dog hearing?', answer: 'The municipality presents evidence the dog is dangerous (bite history, aggression). The owner can present evidence including temperament assessments, training records, and witness testimony. A justice decides on orders.' },
      { question: 'Can I appeal a destruction order for my dog?', answer: 'Yes. Destruction orders can be appealed. A strong appeal includes professional behaviour assessments, evidence of responsible ownership, and a plan to prevent future incidents.' },
      { question: 'What is the pit bull ban in Ontario?', answer: 'Ontario banned pit bulls under the Dog Owners Liability Act. Existing pit bulls (pre-2005) must be neutered, muzzled in public, and leashed. New pit bulls cannot be brought into Ontario.' },
      { question: 'What are the penalties under the Dog Owners Liability Act?', answer: 'Penalties include fines up to $10,000, muzzle and leash orders, confinement orders, and in serious cases, destruction orders. Owners may also face civil liability for damages caused by their dog.' }
    ]
  },

  '/services/accessibility-complaints': {
    title: 'Accessibility Complaints | AODA | Disability Accommodation | London Ontario',
    description: 'Accessibility complaint representation in London, Ontario. AODA violations, duty to accommodate, Human Rights Tribunal disability discrimination claims.',
    keywords: 'aoda complaint london, accessibility ontario, duty to accommodate, disability discrimination, human rights tribunal',
    schema: { type: 'LegalService', name: 'Accessibility Complaint Services', serviceType: 'Disability Rights Advocacy', areaServed: ['London', 'Southwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Accessibility Complaints', url: '/services/accessibility-complaints' }],
    faqs: [
      { question: 'What is the duty to accommodate?', answer: 'Employers, landlords, and service providers must accommodate persons with disabilities to the point of undue hardship. This includes modifying policies, providing assistive devices, and adjusting physical spaces.' },
      { question: 'How do I file an AODA complaint?', answer: 'Report AODA violations to the Accessibility Directorate of Ontario. For discrimination complaints, file with the Human Rights Tribunal of Ontario (HRTO) within one year of the incident.' },
      { question: 'What is undue hardship?', answer: 'The legal threshold employers must meet to refuse accommodation. Cost alone is rarely sufficient. Factors include financial cost relative to the organization, health and safety risks, and impact on other employees.' },
      { question: 'Can I file both an AODA and human rights complaint?', answer: 'Yes. AODA complaints address regulatory compliance while HRTO complaints address discrimination. They serve different purposes and can proceed simultaneously for maximum protection.' }
    ]
  },

  // ============================================
  // FORMS PAGES
  // ============================================
  '/resources/forms/ltb': {
    title: 'Ontario LTB Forms Directory | All Landlord and Tenant Board Forms',
    description: 'Complete directory of Ontario Landlord and Tenant Board (LTB) forms. Download L1-L10 landlord applications, T1-T6 tenant applications, N-series notices, and co-op forms with filing instructions.',
    keywords: 'ltb forms ontario, landlord tenant board forms, L1 form ontario, T2 form ontario, N12 notice, N4 notice, eviction forms ontario, ltb application, tenant forms ontario, landlord forms ontario',
    schema: { type: 'CollectionPage', name: 'Ontario LTB Forms Directory', areaServed: ['Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Resources', url: '/resources' }, { name: 'Forms', url: '/resources/forms/ltb' }, { name: 'LTB Forms', url: '/resources/forms/ltb' }],
    faqs: [
      { question: 'How do I file an LTB application online?', answer: 'L1, L2, L3, L4, L9, L10, T1, T2, T5, T6, C1, and C2 applications can be filed online through the Tribunals Ontario Portal. Other forms must be filed by email or mail.' },
      { question: 'How much does it cost to file an LTB application?', answer: 'Landlord applications (L-series) cost $201.00 to file. Tenant applications (T-series) cost $53.00. Fees may be waived if you cannot afford them — ask the LTB about a fee waiver.' },
      { question: 'What is the difference between an N12 and N13 notice?', answer: 'An N12 is served when the landlord, a purchaser, or family member needs the unit for personal use. An N13 is served when the landlord wants to demolish, do major repairs requiring vacancy, or convert the unit to non-residential use.' },
      { question: 'Can a paralegal help me file an LTB form?', answer: 'Yes, licensed paralegals can prepare, file, and represent you at LTB hearings. Filing the wrong form or missing deadlines can hurt your case — a paralegal ensures everything is done correctly.' }
    ]
  },

  '/resources/forms/small-claims': {
    title: 'Ontario Small Claims Court Forms Directory | All SCC Forms & Fees',
    description: 'Complete directory of Ontario Small Claims Court forms under O. Reg. 258/98. Download Plaintiff\'s Claim (7A), Defence (9A), enforcement forms (20-series), and more with filing fees and instructions.',
    keywords: 'small claims court forms ontario, form 7A ontario, plaintiff claim form, defence form 9A, small claims enforcement, garnishment form 20E, writ of seizure, default judgment 11B, small claims court fees ontario, ontario court forms',
    schema: { type: 'CollectionPage', name: 'Ontario Small Claims Court Forms Directory', areaServed: ['Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Resources', url: '/resources' }, { name: 'Forms', url: '/resources/forms/small-claims' }, { name: 'Small Claims Court Forms', url: '/resources/forms/small-claims' }],
    faqs: [
      { question: 'How do I file a Small Claims Court claim in Ontario?', answer: 'File a Plaintiff\'s Claim (Form 7A) at the Small Claims Court office nearest to where the defendant lives or where the dispute occurred. You can also file online through Ontario\'s e-filing portal. The filing fee is $108.00 for infrequent claimants.' },
      { question: 'What is the maximum amount for Small Claims Court in Ontario?', answer: 'As of October 2025, the monetary limit for Small Claims Court in Ontario is $50,000 (previously $50,000). This includes claims for money owed, property damage, and return of personal property.' },
      { question: 'How much does it cost to file in Small Claims Court?', answer: 'Key fees: Plaintiff\'s Claim filing is $108, Defence is $73, Notice of Motion is $127, requesting a trial date is $290, and most enforcement actions are $55. Frequent claimants (10+ claims/year) pay $218 to file a claim.' },
      { question: 'Can a paralegal represent me in Small Claims Court?', answer: 'Yes, licensed paralegals can represent you in Small Claims Court for claims up to $50,000. They can prepare your forms, file your claim, negotiate settlements, and represent you at trial.' }
    ]
  },

  '/resources/forms/traffic-tickets': {
    title: 'Ontario Traffic Ticket Forms & Court Directory | POA Forms by City',
    description: 'Complete directory of Ontario traffic ticket (POA) forms and city-by-city court information. Find your local court, pay or dispute your ticket online, and download Provincial Offences Act forms.',
    keywords: 'traffic ticket forms ontario, POA forms, provincial offences act forms, pay traffic ticket online, fight traffic ticket ontario, notice of intention to appear, form 8 POA, early resolution, traffic court ontario, pay ticket london, pay ticket kitchener, pay ticket windsor, paytickets.ca',
    schema: { type: 'CollectionPage', name: 'Ontario Traffic Ticket Forms & Court Directory', areaServed: ['Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Resources', url: '/resources' }, { name: 'Forms', url: '/resources/forms/traffic-tickets' }, { name: 'Traffic Ticket Forms', url: '/resources/forms/traffic-tickets' }],
    faqs: [
      { question: 'How long do I have to respond to a traffic ticket in Ontario?', answer: 'You have 15 calendar days from receiving the ticket to choose one of three options: pay the fine (guilty plea), request an early resolution meeting with the prosecutor, or request a trial by filing a Notice of Intention to Appear (Form 8).' },
      { question: 'How do I fight a traffic ticket in Ontario?', answer: 'File a Notice of Intention to Appear (Form 8) within 15 days of receiving your ticket. This requests a trial date. A licensed paralegal can represent you at trial and may get the charge reduced or dismissed entirely.' },
      { question: 'Can I pay my traffic ticket online in Ontario?', answer: 'Yes, most Ontario cities accept online payment through paytickets.ca or their own municipal portal. Toronto uses secure.toronto.ca/POAWeb. Check our city directory for your specific court\'s payment options.' },
      { question: 'Can a paralegal represent me for a traffic ticket?', answer: 'Yes, licensed paralegals can represent you in Provincial Offences Court for all traffic tickets including speeding, red lights, careless driving, stunt driving, and more. They handle the entire process from filing to trial.' }
    ]
  },

  '/resources/forms/hrto': {
    title: 'HRTO Forms Directory | Human Rights Tribunal of Ontario Forms',
    description: 'Complete directory of Human Rights Tribunal of Ontario (HRTO) forms. Download Application (Form 1), Response (Form 2), and all tribunal forms with filing instructions and deadlines.',
    keywords: 'hrto forms, human rights tribunal ontario forms, form 1 hrto, discrimination complaint form, hrto application, human rights complaint ontario, hrto response form, form 2 hrto, hrto filing',
    schema: { type: 'CollectionPage', name: 'HRTO Forms Directory', areaServed: ['Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Resources', url: '/resources' }, { name: 'Forms', url: '/resources/forms/hrto' }, { name: 'HRTO Forms', url: '/resources/forms/hrto' }],
    faqs: [
      { question: 'How do I file a human rights complaint in Ontario?', answer: 'Complete HRTO Form 1 (Application) and file it by email to HRTO.efile@ontario.ca within one year of the last incident of discrimination. Include details of the discriminatory conduct and the remedy you are seeking.' },
      { question: 'What are the grounds for a human rights complaint in Ontario?', answer: 'The Ontario Human Rights Code protects against discrimination based on: race, ancestry, place of origin, colour, ethnic origin, citizenship, creed, sex, sexual orientation, gender identity, age, marital status, family status, and disability.' },
      { question: 'How long do I have to file an HRTO complaint?', answer: 'You must file within one year of the last incident of discrimination. The HRTO may accept late applications in exceptional circumstances, but it is best to file as soon as possible.' },
      { question: 'Can a paralegal represent me at the HRTO?', answer: 'Yes, licensed paralegals can represent you at the Human Rights Tribunal of Ontario. They can help you complete the application, gather evidence, and present your case at mediation or hearing.' }
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
    title: 'How to Fight a Traffic Ticket | Ontario Guide | Legal Assist',
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
    title: 'Ontario Tenant Rights | Complete Guide | Legal Assist',
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
    title: 'Complete Ontario Landlord Guide 2026 | RTA Rights, Evictions, Rent Rules',
    description: 'The most comprehensive Ontario landlord guide. Covers your rights under the RTA, eviction notices (N4-N13), LTB applications (L1-L10), rent increases (2.1% for 2026), standard lease, tenant screening, and more.',
    keywords: 'ontario landlord rights 2026, landlord guide ontario, eviction process ontario, n4 notice, ltb application, rent increase 2026, landlord tenant law ontario, n12 eviction',
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
    title: 'Ontario Employment Rights | Employee Guide | Legal Assist',
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
    title: 'Legal Deadlines Ontario | Limitation Periods | Legal Assist',
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
    title: 'Free Legal Resources Ontario | Legal Aid | Legal Assist',
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
    title: 'Paralegal Services London Ontario | Legal Assist',
    description: 'Licensed paralegal services in London, Ontario. Traffic tickets, landlord-tenant, small claims court. Local expertise. Call 226-272-5153.',
    keywords: 'paralegal london ontario, lawyer london on, legal services london, court representation london',
    schema: { type: 'LocalBusiness', name: 'Legal Assist London', areaServed: ['London', 'Middlesex County'] },
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
    title: 'Paralegal Services St. Thomas Ontario | Legal Assist',
    description: 'Licensed paralegal services in St. Thomas, Ontario. Traffic tickets, landlord-tenant, small claims court. Serving Elgin County.',
    keywords: 'paralegal st thomas ontario, lawyer st thomas, legal services elgin county',
    schema: { type: 'LocalBusiness', name: 'Legal Assist St. Thomas', areaServed: ['St. Thomas', 'Elgin County'] },
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
    title: 'Paralegal Services Woodstock Ontario | Legal Assist',
    description: 'Licensed paralegal services in Woodstock, Ontario. Traffic tickets, landlord-tenant, small claims court. Serving Oxford County.',
    keywords: 'paralegal woodstock ontario, lawyer woodstock, legal services oxford county',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Woodstock', areaServed: ['Woodstock', 'Oxford County'] },
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
    title: 'Paralegal Services Waterloo Ontario | Legal Assist',
    description: 'Licensed paralegal services in Waterloo, Ontario. Traffic tickets, landlord-tenant, small claims court representation.',
    keywords: 'paralegal waterloo ontario, lawyer waterloo, legal services waterloo',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Waterloo', areaServed: ['Waterloo', 'Waterloo Region'] },
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
    title: 'Paralegal Services Chatham Ontario | Legal Assist',
    description: 'Licensed paralegal services in Chatham-Kent, Ontario. Traffic tickets, landlord-tenant, small claims court.',
    keywords: 'paralegal chatham ontario, lawyer chatham-kent, legal services chatham',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Chatham', areaServed: ['Chatham-Kent'] },
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
    title: 'Paralegal Services Ingersoll Ontario | Legal Assist',
    description: 'Licensed paralegal services in Ingersoll, Ontario. Traffic tickets, landlord-tenant, small claims. Oxford County.',
    keywords: 'paralegal ingersoll ontario, lawyer ingersoll, legal services ingersoll',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Ingersoll', areaServed: ['Ingersoll', 'Oxford County'] },
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
    title: 'Paralegal Services Tillsonburg Ontario | Legal Assist',
    description: 'Licensed paralegal services in Tillsonburg, Ontario. Traffic tickets, landlord-tenant, small claims court.',
    keywords: 'paralegal tillsonburg ontario, lawyer tillsonburg, legal services tillsonburg',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Tillsonburg', areaServed: ['Tillsonburg', 'Oxford County'] },
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
    title: 'Paralegal Services Aylmer Ontario | Legal Assist',
    description: 'Licensed paralegal services in Aylmer, Ontario. Traffic tickets, landlord-tenant, small claims. Elgin County.',
    keywords: 'paralegal aylmer ontario, lawyer aylmer, legal services aylmer elgin',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Aylmer', areaServed: ['Aylmer', 'Elgin County'] },
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
    title: 'Paralegal Services Strathroy Ontario | Legal Assist',
    description: 'Licensed paralegal services in Strathroy, Ontario. Traffic tickets, landlord-tenant, small claims. Middlesex County.',
    keywords: 'paralegal strathroy ontario, lawyer strathroy, legal services strathroy',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Strathroy', areaServed: ['Strathroy', 'Middlesex County'] },
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
    title: 'Paralegal Services Dorchester Ontario | Legal Assist',
    description: 'Licensed paralegal services in Dorchester, Ontario. Traffic tickets, landlord-tenant, small claims.',
    keywords: 'paralegal dorchester ontario, lawyer dorchester, legal services dorchester',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Dorchester', areaServed: ['Dorchester', 'Middlesex County'] },
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
    title: 'Paralegal Services Komoka Ontario | Legal Assist',
    description: 'Licensed paralegal services in Komoka, Ontario. Traffic tickets, landlord-tenant, small claims.',
    keywords: 'paralegal komoka ontario, lawyer komoka, legal services komoka',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Komoka', areaServed: ['Komoka', 'Middlesex County'] },
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
    title: 'Paralegal Services Lucan Ontario | Legal Assist',
    description: 'Licensed paralegal services in Lucan, Ontario. Traffic tickets, landlord-tenant, small claims court.',
    keywords: 'paralegal lucan ontario, lawyer lucan, legal services lucan',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Lucan', areaServed: ['Lucan', 'Middlesex County'] },
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
    title: 'Paralegal Services Exeter Ontario | Legal Assist',
    description: 'Licensed paralegal services in Exeter, Ontario. Traffic tickets, landlord-tenant, small claims. Huron County.',
    keywords: 'paralegal exeter ontario, lawyer exeter, legal services huron county',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Exeter', areaServed: ['Exeter', 'Huron County'] },
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
    title: 'Paralegal Services Grand Bend Ontario | Legal Assist',
    description: 'Licensed paralegal services in Grand Bend, Ontario. Traffic tickets, landlord-tenant, small claims.',
    keywords: 'paralegal grand bend ontario, lawyer grand bend, legal services grand bend',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Grand Bend', areaServed: ['Grand Bend', 'Lambton County'] },
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
    title: 'Legal Guides | Free Legal Information | Legal Assist London Ontario',
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
      { question: 'Can my landlord raise rent whenever they want?', answer: 'No. Rent can only increase once per 12 months, with 90 days notice, by the guideline amount (2.1% in 2026, down from 2.5% in 2024 and 2025) unless AGI approved. Exceptions for post-2018 units.' },
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
      { question: 'What are minimum wage and overtime rules?', answer: 'Ontario general minimum wage is $17.60/hour (effective Oct 1, 2025) per ESA O. Reg. 285/01, scheduled to rise to $17.95 on Oct 1, 2026. Specific rates apply to students under 18, liquor servers, and homeworkers. Overtime is 1.5x the regular rate after 44 hours per week (ESA s.22(1)). Some jobs are exempt from overtime provisions.' },
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

  // ============================================
  // BLOG PAGES
  // ============================================
  '/blog': {
    title: 'Legal Blog | Ontario Paralegal Resources | Legal Assist',
    description: 'Practical legal information for Ontario residents. Articles on traffic tickets, landlord-tenant issues, small claims court, employment rights, and more.',
    keywords: 'ontario legal blog, paralegal articles, traffic ticket tips, ltb information, small claims guide',
    schema: { type: 'Article', name: 'Legal Assist Blog' },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' }
    ]
  },

  // ============================================
  // NEW 25 CITY LOCATION PAGES
  // ============================================

  '/locations/pembroke': {
    title: 'Pembroke Paralegal | Legal Services Renfrew County | Legal Assist',
    description: 'Licensed paralegal services in Pembroke and Renfrew County, Ontario. Traffic ticket defence on Highway 17, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal pembroke, pembroke lawyer, renfrew county legal services, traffic ticket pembroke, small claims pembroke, landlord tenant pembroke',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Pembroke', areaServed: ['Pembroke', 'Renfrew County', 'Petawawa', 'Deep River', 'Arnprior'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Pembroke', url: '/locations/pembroke' }],
    faqs: [
      { question: 'Do you serve Pembroke and Renfrew County?', answer: 'Yes, we provide paralegal services throughout Pembroke, Petawawa, Arnprior, Deep River, Renfrew, and all of Renfrew County.' },
      { question: 'Where is the Pembroke Provincial Offences Court?', answer: 'The Renfrew County Provincial Offences Court is located at 7 International Drive, Pembroke, ON K8A 6W5. We regularly appear at this court.' },
      { question: 'Can you fight a Highway 17 speeding ticket near Pembroke?', answer: 'Absolutely. We defend traffic tickets issued on Highway 17 (Trans-Canada) through Renfrew County, including speeding, careless driving, and stunt driving charges.' },
      { question: 'Do you offer virtual consultations for Pembroke residents?', answer: 'Yes, we offer phone and video consultations for Renfrew County residents. Many matters including LTB hearings can be handled entirely remotely.' }
    ]
  },

  '/locations/perth': {
    title: 'Perth Paralegal | Legal Services Lanark County | Legal Assist',
    description: 'Licensed paralegal services in Perth and Lanark County, Ontario. Traffic tickets, landlord-tenant disputes, small claims court. Serving Smiths Falls, Carleton Place. Free consultation.',
    keywords: 'paralegal perth ontario, perth lawyer, lanark county legal services, traffic ticket perth, small claims perth, smiths falls paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Perth', areaServed: ['Perth', 'Lanark County', 'Smiths Falls', 'Carleton Place', 'Mississippi Mills'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Perth', url: '/locations/perth' }],
    faqs: [
      { question: 'Do you serve Perth and Lanark County?', answer: 'Yes, we serve Perth, Smiths Falls, Carleton Place, Mississippi Mills, and all communities throughout Lanark County.' },
      { question: 'Where is the Perth Provincial Offences Court?', answer: 'The Lanark County Provincial Offences Court is at 80 Gore Street East, Perth, ON K7H 1H9.' },
      { question: 'Can you help with Highway 7 traffic tickets?', answer: 'Yes, we regularly defend traffic tickets issued on Highway 7 and regional roads throughout Lanark County.' },
      { question: 'Do you offer evening appointments?', answer: 'Yes, we offer flexible scheduling including evening and weekend appointments by request.' }
    ]
  },

  '/locations/napanee': {
    title: 'Napanee Paralegal | Legal Services Lennox & Addington | Legal Assist',
    description: 'Licensed paralegal services in Napanee and Lennox & Addington County. Traffic ticket defence on Highway 401, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal napanee, napanee lawyer, lennox addington legal services, traffic ticket napanee, highway 401 ticket napanee',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Napanee', areaServed: ['Napanee', 'Lennox & Addington', 'Greater Napanee', 'Loyalist Township'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Napanee', url: '/locations/napanee' }],
    faqs: [
      { question: 'Do you serve Napanee and area?', answer: 'Yes, we serve Greater Napanee, Loyalist Township, and all of Lennox & Addington County.' },
      { question: 'Can you fight Highway 401 tickets near Napanee?', answer: 'Yes, the 401 corridor through Lennox & Addington is heavily patrolled. We defend speeding, careless driving, and other HTA charges issued in this area.' },
      { question: 'Where is the Napanee court?', answer: 'The Lennox & Addington Provincial Offences Court is at 97 Thomas Street East, Napanee, ON K7R 4B9.' },
      { question: 'Do you offer virtual consultations?', answer: 'Yes, we provide phone and video consultations for all Lennox & Addington residents.' }
    ]
  },

  '/locations/bracebridge': {
    title: 'Bracebridge Paralegal | Legal Services Muskoka | Legal Assist',
    description: 'Licensed paralegal services in Bracebridge and Muskoka District. Traffic ticket defence on Highway 11, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal bracebridge, muskoka lawyer, muskoka legal services, traffic ticket bracebridge, highway 11 ticket muskoka',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Bracebridge', areaServed: ['Bracebridge', 'Muskoka', 'Gravenhurst', 'Huntsville', 'Lake of Bays'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Bracebridge', url: '/locations/bracebridge' }],
    faqs: [
      { question: 'Do you serve Bracebridge and Muskoka?', answer: 'Yes, we serve Bracebridge, Gravenhurst, Huntsville, Lake of Bays, Muskoka Lakes, and all six Muskoka municipalities.' },
      { question: 'Where is the Muskoka Provincial Offences Court?', answer: 'The Muskoka District court is at 76 Pine Street, Bracebridge, ON P1L 0C4.' },
      { question: 'Can you fight Highway 11 tickets in Muskoka?', answer: 'Yes, Highway 11 through Muskoka is a common area for traffic enforcement. We defend speeding, careless driving, and stunt driving charges.' },
      { question: 'Do you handle cottage country disputes?', answer: 'Yes, we handle landlord-tenant disputes, property damage claims, and other legal matters common in cottage country.' }
    ]
  },

  '/locations/parry-sound': {
    title: 'Parry Sound Paralegal | Legal Services Parry Sound District | Legal Assist',
    description: 'Licensed paralegal services in Parry Sound, Ontario. Traffic ticket defence on Highway 400/69, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal parry sound, parry sound lawyer, parry sound legal services, traffic ticket parry sound, highway 400 ticket',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Parry Sound', areaServed: ['Parry Sound', 'Parry Sound District'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Parry Sound', url: '/locations/parry-sound' }],
    faqs: [
      { question: 'Do you serve Parry Sound?', answer: 'Yes, we serve the Town of Parry Sound and surrounding Parry Sound District communities.' },
      { question: 'Can you fight Highway 400 tickets near Parry Sound?', answer: 'Yes, the Highway 400/69 corridor is heavily enforced. We defend speeding, careless driving, and stunt driving charges in this area.' },
      { question: 'Where is the Parry Sound court?', answer: 'The Provincial Offences Court is at 52 Seguin Street, Parry Sound, ON P2A 1B4.' },
      { question: 'Do you offer virtual consultations?', answer: 'Yes, phone and video consultations are available for all Parry Sound District residents.' }
    ]
  },

  '/locations/kenora': {
    title: 'Kenora Paralegal | Legal Services Northwestern Ontario | Legal Assist',
    description: 'Licensed paralegal services in Kenora, Northwestern Ontario. Traffic ticket defence on Highway 17, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal kenora, kenora lawyer, northwestern ontario legal services, traffic ticket kenora, highway 17 ticket kenora',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Kenora', areaServed: ['Kenora', 'Kenora District', 'Northwestern Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Kenora', url: '/locations/kenora' }],
    faqs: [
      { question: 'Do you serve Kenora and Northwestern Ontario?', answer: 'Yes, we provide paralegal services to Kenora and surrounding communities throughout the Kenora District.' },
      { question: 'Where is the Kenora court?', answer: 'The Provincial Offences Court is at 1 Main Street South, Kenora, ON P9N 3X2.' },
      { question: 'Can you fight Highway 17 tickets near Kenora?', answer: 'Yes, we defend traffic tickets issued on the Trans-Canada Highway through Northwestern Ontario.' },
      { question: 'Do you offer virtual consultations for remote communities?', answer: 'Yes, we offer phone and video consultations ideal for clients in Northwestern Ontario remote communities.' }
    ]
  },

  '/locations/cochrane': {
    title: 'Cochrane Paralegal | Legal Services Northeastern Ontario | Legal Assist',
    description: 'Licensed paralegal services in Cochrane, Northeastern Ontario. Traffic ticket defence on Highway 11, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal cochrane ontario, cochrane lawyer, northeastern ontario legal services, traffic ticket cochrane, highway 11 ticket',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Cochrane', areaServed: ['Cochrane', 'Cochrane District'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Cochrane', url: '/locations/cochrane' }],
    faqs: [
      { question: 'Do you serve Cochrane?', answer: 'Yes, we serve Cochrane and surrounding communities in Northeastern Ontario.' },
      { question: 'Where is the Cochrane court?', answer: 'The Provincial Offences Court is at 171 Fourth Avenue, Cochrane, ON P0L 1C0.' },
      { question: 'Can you fight Highway 11 tickets near Cochrane?', answer: 'Yes, we defend traffic tickets issued on Highway 11 through the Cochrane District.' },
      { question: 'Do you offer virtual services?', answer: 'Yes, phone and video consultations are available for Cochrane and area residents.' }
    ]
  },

  '/locations/dryden': {
    title: 'Dryden Paralegal | Legal Services Northwestern Ontario | Legal Assist',
    description: 'Licensed paralegal services in Dryden, Northwestern Ontario. Traffic ticket defence on Highway 17, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal dryden, dryden lawyer, dryden legal services, traffic ticket dryden, highway 17 ticket dryden',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Dryden', areaServed: ['Dryden', 'Dryden District'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Dryden', url: '/locations/dryden' }],
    faqs: [
      { question: 'Do you serve Dryden?', answer: 'Yes, we serve the City of Dryden and surrounding communities in Northwestern Ontario.' },
      { question: 'Where is the Dryden court?', answer: 'The Provincial Offences Court is at 30 Van Horne Avenue, Dryden, ON P8N 2A7.' },
      { question: 'Can you fight Highway 17 tickets near Dryden?', answer: 'Yes, we defend traffic tickets issued on the Trans-Canada Highway through the Dryden area.' },
      { question: 'Do you offer virtual consultations?', answer: 'Yes, we offer phone and video consultations for clients in Northwestern Ontario.' }
    ]
  },

  '/locations/fort-frances': {
    title: 'Fort Frances Paralegal | Legal Services Rainy River District | Legal Assist',
    description: 'Licensed paralegal services in Fort Frances and Rainy River District. Traffic ticket defence, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal fort frances, fort frances lawyer, rainy river legal services, traffic ticket fort frances',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Fort Frances', areaServed: ['Fort Frances', 'Rainy River District'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Fort Frances', url: '/locations/fort-frances' }],
    faqs: [
      { question: 'Do you serve Fort Frances?', answer: 'Yes, we serve Fort Frances and communities throughout the Rainy River District.' },
      { question: 'Where is the Fort Frances court?', answer: 'The Provincial Offences Court is at 320 Portage Avenue, Fort Frances, ON P9A 3P9.' },
      { question: 'Can you help with Highway 11 tickets?', answer: 'Yes, we defend traffic tickets issued on Highway 11 and Highway 71 through Rainy River District.' },
      { question: 'Do you offer remote consultations?', answer: 'Yes, phone and video consultations are available for all Fort Frances and area residents.' }
    ]
  },

  '/locations/temiskaming-shores': {
    title: 'Temiskaming Shores Paralegal | Legal Services Temiskaming District | Legal Assist',
    description: 'Licensed paralegal services in Temiskaming Shores (Haileybury/New Liskeard). Traffic ticket defence on Highway 11, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal temiskaming shores, haileybury lawyer, new liskeard legal services, traffic ticket temiskaming, highway 11 ticket',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Temiskaming Shores', areaServed: ['Temiskaming Shores', 'Haileybury', 'New Liskeard', 'Temiskaming District'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Temiskaming Shores', url: '/locations/temiskaming-shores' }],
    faqs: [
      { question: 'Do you serve Temiskaming Shores?', answer: 'Yes, we serve Haileybury, New Liskeard, Cobalt, Englehart, and all of Temiskaming District.' },
      { question: 'Where is the Temiskaming court?', answer: 'The Provincial Offences Court is at 325 Farr Drive, Haileybury, ON P0J 1K0.' },
      { question: 'Can you fight Highway 11 tickets?', answer: 'Yes, we defend traffic tickets issued on Highway 11 through Temiskaming District.' },
      { question: 'Do you offer virtual services?', answer: 'Yes, phone and video consultations are available for Temiskaming District residents.' }
    ]
  },

  '/locations/espanola': {
    title: 'Espanola Paralegal | Legal Services Sudbury District | Legal Assist',
    description: 'Licensed paralegal services in Espanola and Sudbury District. Traffic ticket defence on Highway 17, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal espanola, espanola lawyer, espanola legal services, traffic ticket espanola, elliot lake paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Espanola', areaServed: ['Espanola', 'Elliot Lake', 'Blind River', 'Massey'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Espanola', url: '/locations/espanola' }],
    faqs: [
      { question: 'Do you serve Espanola and Elliot Lake?', answer: 'Yes, we serve Espanola, Elliot Lake, Blind River, Massey, and surrounding communities.' },
      { question: 'Where is the Espanola court?', answer: 'The Provincial Offences Court is at 100 Tudhope Street, Suite 4, Espanola, ON P5E 1S6.' },
      { question: 'Can you fight Highway 17 tickets?', answer: 'Yes, we defend traffic tickets on Highway 17 through the Espanola and North Shore corridor.' },
      { question: 'Do you offer virtual consultations?', answer: 'Yes, phone and video consultations are available for all clients in the region.' }
    ]
  },

  '/locations/picton': {
    title: 'Picton Paralegal | Legal Services Prince Edward County | Legal Assist',
    description: 'Licensed paralegal services in Picton and Prince Edward County. Traffic ticket defence, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal picton, prince edward county lawyer, picton legal services, traffic ticket picton, PEC paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Picton', areaServed: ['Picton', 'Prince Edward County', 'Wellington', 'Bloomfield'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Picton', url: '/locations/picton' }],
    faqs: [
      { question: 'Do you serve Prince Edward County?', answer: 'Yes, we serve Picton, Wellington, Bloomfield, and all of Prince Edward County.' },
      { question: 'Where is the Picton court?', answer: 'The Provincial Offences Court is at 332 Main Street, Picton, ON K0K 2T0.' },
      { question: 'Can you help with tourism-area traffic tickets?', answer: 'Yes, Prince Edward County sees significant seasonal traffic enforcement. We defend tickets on County roads and Highway 49.' },
      { question: 'Do you handle rental disputes in PEC?', answer: 'Yes, we represent both landlords and tenants in Prince Edward County rental disputes at the LTB.' }
    ]
  },

  '/locations/hawkesbury': {
    title: 'Hawkesbury Paralegal | Legal Services Prescott-Russell | Legal Assist',
    description: 'Licensed paralegal services in Hawkesbury and Prescott-Russell. Traffic ticket defence on Highway 17/34, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal hawkesbury, hawkesbury lawyer, prescott russell legal services, traffic ticket hawkesbury',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Hawkesbury', areaServed: ['Hawkesbury', 'Prescott-Russell', 'Casselman', 'Rockland', 'Embrun'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Hawkesbury', url: '/locations/hawkesbury' }],
    faqs: [
      { question: 'Do you serve Hawkesbury and Prescott-Russell?', answer: 'Yes, we serve Hawkesbury, Casselman, Rockland, Embrun, and all of the Prescott-Russell region.' },
      { question: 'Where is the court for Hawkesbury area?', answer: 'The Prescott-Russell court is at 28 Court Street, L\'Orignal, ON K0B 1K0.' },
      { question: 'Can you help with Highway 17 and 34 tickets?', answer: 'Yes, we defend traffic tickets issued on Highway 17, Highway 34, and regional roads throughout Prescott-Russell.' },
      { question: 'Do you offer bilingual services?', answer: 'We primarily operate in English but can arrange interpreter services for French-speaking clients. Contact us to discuss your needs.' }
    ]
  },

  '/locations/petawawa': {
    title: 'Petawawa Paralegal | Legal Services Renfrew County | Legal Assist',
    description: 'Licensed paralegal services in Petawawa, Ontario. Traffic ticket defence, small claims court, landlord-tenant disputes. Serving CFB Petawawa military personnel. Free consultation.',
    keywords: 'paralegal petawawa, petawawa lawyer, CFB petawawa legal services, traffic ticket petawawa, military paralegal petawawa',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Petawawa', areaServed: ['Petawawa', 'Renfrew County', 'CFB Petawawa', 'Deep River', 'Chalk River'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Petawawa', url: '/locations/petawawa' }],
    faqs: [
      { question: 'Do you serve Petawawa and CFB Petawawa?', answer: 'Yes, we serve Petawawa residents and military personnel stationed at CFB Petawawa for all paralegal matters.' },
      { question: 'Where is the nearest court?', answer: 'The Renfrew County court is at 7 International Drive, Pembroke, ON K8A 6W5, approximately 15 minutes from Petawawa.' },
      { question: 'Can you help with Highway 17 tickets?', answer: 'Yes, we defend traffic tickets issued on Highway 17 through Renfrew County.' },
      { question: 'Do you offer flexible scheduling for military personnel?', answer: 'Yes, we understand the demands of military schedules and offer flexible and virtual consultation options.' }
    ]
  },

  '/locations/smiths-falls': {
    title: 'Smiths Falls Paralegal | Legal Services Lanark County | Legal Assist',
    description: 'Licensed paralegal services in Smiths Falls, Ontario. Traffic ticket defence, small claims court, landlord-tenant disputes. Serving Rideau Lakes and area. Free consultation.',
    keywords: 'paralegal smiths falls, smiths falls lawyer, lanark county legal services, traffic ticket smiths falls, rideau lakes paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Smiths Falls', areaServed: ['Smiths Falls', 'Lanark County', 'Rideau Lakes', 'Merrickville'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Smiths Falls', url: '/locations/smiths-falls' }],
    faqs: [
      { question: 'Do you serve Smiths Falls?', answer: 'Yes, we serve Smiths Falls, Merrickville, Rideau Lakes, and all Lanark County communities.' },
      { question: 'Where is the court for Smiths Falls?', answer: 'The Lanark County court is at 80 Gore Street East, Perth, ON K7H 1H9.' },
      { question: 'Can you help with Highway 15 and 29 tickets?', answer: 'Yes, we defend traffic tickets issued on Highway 15, Highway 29, and other roads in Lanark County.' },
      { question: 'Do you offer virtual consultations?', answer: 'Yes, phone and video consultations are available for all Smiths Falls and area residents.' }
    ]
  },

  '/locations/gravenhurst': {
    title: 'Gravenhurst Paralegal | Legal Services Muskoka | Legal Assist',
    description: 'Licensed paralegal services in Gravenhurst, Muskoka. Traffic ticket defence on Highway 11, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal gravenhurst, gravenhurst lawyer, muskoka legal services, traffic ticket gravenhurst, highway 11 ticket gravenhurst',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Gravenhurst', areaServed: ['Gravenhurst', 'Muskoka', 'Muskoka Lakes'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Gravenhurst', url: '/locations/gravenhurst' }],
    faqs: [
      { question: 'Do you serve Gravenhurst?', answer: 'Yes, we serve Gravenhurst, Muskoka Lakes, and the southern Muskoka area.' },
      { question: 'Where is the court for Gravenhurst?', answer: 'The Muskoka District court is at 76 Pine Street, Bracebridge, ON P1L 0C4, approximately 15 minutes north.' },
      { question: 'Can you fight Highway 11 tickets near Gravenhurst?', answer: 'Yes, the Highway 11 corridor through Gravenhurst sees heavy enforcement, especially in summer. We defend all traffic charges.' },
      { question: 'Do you handle cottage rental disputes?', answer: 'Yes, we assist with rental disputes, property damage claims, and other legal matters common in Muskoka.' }
    ]
  },

  '/locations/huntsville': {
    title: 'Huntsville Paralegal | Legal Services Muskoka | Legal Assist',
    description: 'Licensed paralegal services in Huntsville, Muskoka. Traffic ticket defence on Highway 11/60, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal huntsville, huntsville lawyer, muskoka legal services, traffic ticket huntsville, algonquin highlands paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Huntsville', areaServed: ['Huntsville', 'Muskoka', 'Lake of Bays', 'Algonquin Highlands'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Huntsville', url: '/locations/huntsville' }],
    faqs: [
      { question: 'Do you serve Huntsville and area?', answer: 'Yes, we serve Huntsville, Lake of Bays, Algonquin Highlands, and northern Muskoka communities.' },
      { question: 'Where is the court for Huntsville?', answer: 'The Muskoka District court is at 76 Pine Street, Bracebridge, ON P1L 0C4.' },
      { question: 'Can you fight Highway 11 and 60 tickets?', answer: 'Yes, we defend traffic tickets on Highway 11 and Highway 60 (Algonquin corridor) through the Huntsville area.' },
      { question: 'Do you offer virtual consultations?', answer: 'Yes, phone and video consultations are available for all Huntsville area residents.' }
    ]
  },

  '/locations/carleton-place': {
    title: 'Carleton Place Paralegal | Legal Services Lanark County | Legal Assist',
    description: 'Licensed paralegal services in Carleton Place and Mississippi Mills. Traffic ticket defence on Highway 7, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal carleton place, carleton place lawyer, mississippi mills legal services, almonte paralegal, traffic ticket carleton place',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Carleton Place', areaServed: ['Carleton Place', 'Mississippi Mills', 'Almonte', 'Beckwith', 'Lanark County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Carleton Place', url: '/locations/carleton-place' }],
    faqs: [
      { question: 'Do you serve Carleton Place and Almonte?', answer: 'Yes, we serve Carleton Place, Almonte, Mississippi Mills, Beckwith, and all of Lanark County.' },
      { question: 'Where is the court for Carleton Place?', answer: 'The Lanark County court is at 80 Gore Street East, Perth, ON K7H 1H9.' },
      { question: 'Can you fight Highway 7 tickets?', answer: 'Yes, we defend traffic tickets issued on Highway 7, Highway 15, and regional roads in the Carleton Place area.' },
      { question: 'Do you offer virtual consultations?', answer: 'Yes, phone and video consultations are available. Many matters can be handled entirely remotely.' }
    ]
  },

  '/locations/arnprior': {
    title: 'Arnprior Paralegal | Legal Services Renfrew County | Legal Assist',
    description: 'Licensed paralegal services in Arnprior, Ontario. Traffic ticket defence on Highway 17, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal arnprior, arnprior lawyer, renfrew county legal services, traffic ticket arnprior, highway 17 ticket arnprior',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Arnprior', areaServed: ['Arnprior', 'Renfrew County', 'McNab/Braeside', 'Greater Madawaska'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Arnprior', url: '/locations/arnprior' }],
    faqs: [
      { question: 'Do you serve Arnprior?', answer: 'Yes, we serve Arnprior, McNab/Braeside, Greater Madawaska, and surrounding Renfrew County communities.' },
      { question: 'Where is the court for Arnprior?', answer: 'The Renfrew County court is at 7 International Drive, Pembroke, ON K8A 6W5.' },
      { question: 'Can you fight Highway 17 tickets near Arnprior?', answer: 'Yes, we defend traffic tickets issued on the Trans-Canada Highway through the Arnprior area.' },
      { question: 'Do you offer flexible scheduling?', answer: 'Yes, we offer evening and weekend consultations by request, plus virtual options.' }
    ]
  },

  '/locations/bancroft': {
    title: 'Bancroft Paralegal | Legal Services Hastings Highlands | Legal Assist',
    description: 'Licensed paralegal services in Bancroft and Hastings Highlands. Traffic ticket defence on Highway 62/28, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal bancroft, bancroft lawyer, hastings highlands legal services, traffic ticket bancroft, highway 62 ticket',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Bancroft', areaServed: ['Bancroft', 'Hastings Highlands', 'Faraday', 'Wollaston'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Bancroft', url: '/locations/bancroft' }],
    faqs: [
      { question: 'Do you serve Bancroft and area?', answer: 'Yes, we serve Bancroft, Hastings Highlands, Faraday, Wollaston, and surrounding North Hastings communities.' },
      { question: 'Where is the court for Bancroft?', answer: 'The Hastings County court is at 235 Pinnacle Street, Belleville, ON K8N 3A9, though satellite services may be available in Bancroft.' },
      { question: 'Can you fight Highway 62 and 28 tickets?', answer: 'Yes, we defend traffic tickets issued on Highway 62, Highway 28, and other roads in North Hastings.' },
      { question: 'Do you offer virtual services?', answer: 'Yes, phone and video consultations are ideal for Bancroft-area clients given the distance to courts.' }
    ]
  },

  '/locations/haldimand-county': {
    title: 'Haldimand County Paralegal | Legal Services Cayuga Caledonia Dunnville | Legal Assist',
    description: 'Licensed paralegal services in Haldimand County. Traffic ticket defence on Highway 6, small claims court, landlord-tenant disputes. Serving Cayuga, Caledonia, Dunnville. Free consultation.',
    keywords: 'paralegal haldimand county, cayuga lawyer, caledonia paralegal, dunnville legal services, traffic ticket haldimand',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Haldimand County', areaServed: ['Haldimand County', 'Cayuga', 'Caledonia', 'Dunnville', 'Hagersville'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Haldimand County', url: '/locations/haldimand-county' }],
    faqs: [
      { question: 'Do you serve Haldimand County?', answer: 'Yes, we serve Cayuga, Caledonia, Dunnville, Hagersville, Jarvis, and all of Haldimand County.' },
      { question: 'Where is the Haldimand court?', answer: 'The Provincial Offences Court is at 53 Thorburn Street South, Cayuga, ON N0A 1E0.' },
      { question: 'Can you fight Highway 6 tickets?', answer: 'Yes, we defend traffic tickets issued on Highway 6, Highway 54, and other roads throughout Haldimand County.' },
      { question: 'Do you offer virtual consultations?', answer: 'Yes, phone and video consultations are available for all Haldimand County residents.' }
    ]
  },

  '/locations/alliston': {
    title: 'Alliston Paralegal | Legal Services New Tecumseth | Legal Assist',
    description: 'Licensed paralegal services in Alliston and New Tecumseth. Traffic ticket defence on Highway 89, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal alliston, alliston lawyer, new tecumseth legal services, traffic ticket alliston, beeton paralegal, tottenham paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Alliston', areaServed: ['Alliston', 'New Tecumseth', 'Beeton', 'Tottenham', 'South Simcoe'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Alliston', url: '/locations/alliston' }],
    faqs: [
      { question: 'Do you serve Alliston and New Tecumseth?', answer: 'Yes, we serve Alliston, Beeton, Tottenham, and all of New Tecumseth in South Simcoe County.' },
      { question: 'Where is the court for Alliston?', answer: 'The Provincial Offences Court serving Alliston is at 45 Cedar Pointe Drive, Barrie, ON.' },
      { question: 'Can you fight Highway 89 tickets?', answer: 'Yes, we defend traffic tickets on Highway 89, County Road 10, and other South Simcoe roads.' },
      { question: 'Do you offer virtual consultations?', answer: 'Yes, phone and video consultations are available for all New Tecumseth residents.' }
    ]
  },

  '/locations/wasaga-beach': {
    title: 'Wasaga Beach Paralegal | Legal Services Simcoe County | Legal Assist',
    description: 'Licensed paralegal services in Wasaga Beach and Simcoe County. Traffic ticket defence on Highway 26, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal wasaga beach, wasaga beach lawyer, simcoe county legal services, traffic ticket wasaga beach, clearview paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Wasaga Beach', areaServed: ['Wasaga Beach', 'Simcoe County', 'Stayner', 'Clearview Township', 'Collingwood'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Wasaga Beach', url: '/locations/wasaga-beach' }],
    faqs: [
      { question: 'Do you serve Wasaga Beach?', answer: 'Yes, we serve Wasaga Beach, Stayner, Clearview Township, and surrounding Simcoe County communities.' },
      { question: 'Where is the court for Wasaga Beach?', answer: 'The Provincial Offences Court is at 45 Cedar Pointe Drive, Barrie, ON.' },
      { question: 'Can you fight Highway 26 tickets?', answer: 'Yes, Highway 26 and 92 see heavy enforcement especially in summer. We defend all traffic charges in this area.' },
      { question: 'Do you handle seasonal rental disputes?', answer: 'Yes, we handle landlord-tenant disputes including short-term and seasonal rental matters common in beach communities.' }
    ]
  },

  '/locations/port-colborne': {
    title: 'Port Colborne Paralegal | Legal Services Niagara Region | Legal Assist',
    description: 'Licensed paralegal services in Port Colborne, Niagara Region. Traffic ticket defence on Highway 3, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal port colborne, port colborne lawyer, niagara legal services, traffic ticket port colborne, wainfleet paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Port Colborne', areaServed: ['Port Colborne', 'Wainfleet', 'Niagara Region'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Port Colborne', url: '/locations/port-colborne' }],
    faqs: [
      { question: 'Do you serve Port Colborne?', answer: 'Yes, we serve Port Colborne, Wainfleet, and surrounding Niagara Region communities.' },
      { question: 'Where is the court for Port Colborne?', answer: 'The Niagara Region Provincial Offences Court is at 445 East Main Street, Welland, ON.' },
      { question: 'Can you fight Highway 3 tickets?', answer: 'Yes, we defend traffic tickets issued on Highway 3, Highway 58, and other Niagara Region roads.' },
      { question: 'Do you offer virtual consultations?', answer: 'Yes, phone and video consultations are available for Port Colborne area residents.' }
    ]
  },

  '/locations/goderich': {
    title: 'Goderich Paralegal | Legal Services Huron County | Legal Assist',
    description: 'Licensed paralegal services in Goderich and Huron County. Traffic ticket defence on Highway 8/21, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal goderich, goderich lawyer, huron county legal services, traffic ticket goderich, clinton paralegal, seaforth paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Goderich', areaServed: ['Goderich', 'Huron County', 'Clinton', 'Seaforth', 'Exeter', 'Wingham'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Goderich', url: '/locations/goderich' }],
    faqs: [
      { question: 'Do you serve Goderich and Huron County?', answer: 'Yes, we serve Goderich, Clinton, Seaforth, Exeter, Wingham, and all communities throughout Huron County.' },
      { question: 'Where is the Goderich court?', answer: 'The Huron County Provincial Offences Court is at 1 Courthouse Square, Goderich, ON N7A 1M2.' },
      { question: 'Can you fight Highway 8 and 21 tickets?', answer: 'Yes, we defend traffic tickets issued on Highway 8, Highway 21, and rural roads throughout Huron County.' },
      { question: 'Do you offer virtual consultations?', answer: 'Yes, phone and video consultations are available for all Huron County residents.' }
    ]
  },
  // Additional Service Pages
  '/services/parking-tickets': {
    title: 'Parking Ticket Defence | Fight Parking Violations Ontario | Legal Assist',
    description: 'Fight parking tickets in Ontario. Our licensed paralegals defend municipal parking violations, disputed fines, and parking by-law charges. Free consultation.',
    keywords: 'parking ticket defence, fight parking ticket ontario, parking violation lawyer, parking by-law dispute',
    schema: { type: 'LegalService', name: 'Parking Ticket Defence', areaServed: ['London', 'Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Parking Tickets', url: '/services/parking-tickets' }],
    faqs: [
      { question: 'Can you fight a parking ticket in Ontario?', answer: 'Yes, parking tickets can be disputed. Our paralegals review evidence and represent you at hearings to fight unfair parking violations.' },
      { question: 'How much does it cost to fight a parking ticket?', answer: 'Contact us for a free consultation to discuss your parking ticket and our affordable representation fees.' },
      { question: 'What is the deadline to dispute a parking ticket?', answer: 'Most Ontario parking tickets must be disputed within 15 days. Contact us immediately to avoid missing your deadline.' },
      { question: 'Is it worth fighting a parking ticket?', answer: 'Many parking tickets have viable defences including signage issues, meter malfunctions, or procedural errors. We assess your case for free.' }
    ]
  },
  '/services/debt-negotiation': {
    title: 'Debt Negotiation Services Ontario | Debt Settlement | Legal Assist',
    description: 'Professional debt negotiation and settlement services in Ontario. We negotiate with creditors to reduce your debt and arrange manageable payment plans.',
    keywords: 'debt negotiation ontario, debt settlement, negotiate debt, reduce debt ontario, debt relief paralegal',
    schema: { type: 'LegalService', name: 'Debt Negotiation Services', areaServed: ['London', 'Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Debt Negotiation', url: '/services/debt-negotiation' }],
    faqs: [
      { question: 'Can a paralegal help negotiate my debts?', answer: 'Yes, our paralegals negotiate with creditors on your behalf to reduce debt amounts and arrange affordable payment plans.' },
      { question: 'How much can debt negotiation save me?', answer: 'Results vary, but many clients achieve significant reductions. Contact us for a free assessment of your situation.' },
      { question: 'Will debt negotiation affect my credit score?', answer: 'Debt settlement may impact your credit temporarily, but resolving debts is often better than leaving them unpaid.' },
      { question: 'What types of debt can you negotiate?', answer: 'We negotiate credit card debt, personal loans, lines of credit, unpaid invoices, and other consumer debts.' }
    ]
  },
  '/services/airline-disputes': {
    title: 'Airline Dispute Claims Ontario | Flight Compensation | Legal Assist',
    description: 'Fight airline disputes in Ontario Small Claims Court. Compensation for cancelled flights, lost baggage, denied boarding, and booking issues up to $50,000.',
    keywords: 'airline dispute ontario, flight compensation, cancelled flight claim, lost baggage compensation, airline small claims',
    schema: { type: 'LegalService', name: 'Airline Dispute Claims', areaServed: ['London', 'Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Airline Disputes', url: '/services/airline-disputes' }],
    faqs: [
      { question: 'Can I sue an airline in Small Claims Court?', answer: 'Yes, you can file a claim against airlines for cancelled flights, lost baggage, denied boarding, and other issues up to $50,000 in Ontario Small Claims Court.' },
      { question: 'What compensation can I get for a cancelled flight?', answer: 'Depending on circumstances, you may be entitled to rebooking, refund, compensation for expenses, and additional damages under Canadian air passenger protection.' },
      { question: 'How long do I have to file an airline complaint?', answer: 'Time limits vary, but generally you should file within 2 years. Contact us promptly to preserve your claim.' },
      { question: 'Do you handle Air Passenger Protection claims?', answer: 'Yes, we handle claims under the Canadian Transportation Agency Air Passenger Protection Regulations.' }
    ]
  },
  '/services/insurance-disputes': {
    title: 'Insurance Dispute Claims Ontario | Denied Claims | Legal Assist',
    description: 'Fight denied insurance claims in Ontario. Our paralegals handle auto insurance disputes, home insurance denials, and accident benefit claims.',
    keywords: 'insurance dispute ontario, denied insurance claim, auto insurance dispute, accident benefits, insurance claim lawyer',
    schema: { type: 'LegalService', name: 'Insurance Dispute Claims', areaServed: ['London', 'Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Insurance Disputes', url: '/services/insurance-disputes' }],
    faqs: [
      { question: 'Can a paralegal help with a denied insurance claim?', answer: 'Yes, our paralegals represent clients in insurance disputes including denied auto claims, home insurance denials, and accident benefit disputes.' },
      { question: 'What can I do if my insurance claim is denied?', answer: 'You can appeal the decision, file a complaint with the insurance ombudsman, or pursue a claim in Small Claims Court or through the LAT.' },
      { question: 'How long do I have to dispute a denied claim?', answer: 'Limitation periods vary by type of claim. Contact us immediately after a denial to ensure you meet all deadlines.' },
      { question: 'Do you handle accident benefit disputes?', answer: 'Yes, we represent clients at the Licence Appeal Tribunal (LAT) for accident benefit disputes under the Insurance Act.' }
    ]
  },
  '/services/condo-disputes': {
    title: 'Condo Dispute Resolution Ontario | Condominium Board Issues | Legal Assist',
    description: 'Resolve condo disputes in Ontario. We handle condominium board conflicts, common element issues, condo fee disputes, and Condominium Authority Tribunal (CAT) matters.',
    keywords: 'condo dispute ontario, condominium dispute, condo board issues, CAT tribunal, condo fee dispute',
    schema: { type: 'LegalService', name: 'Condo Dispute Resolution', areaServed: ['London', 'Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Condo Disputes', url: '/services/condo-disputes' }],
    faqs: [
      { question: 'Can a paralegal represent me in a condo dispute?', answer: 'Yes, paralegals can represent you at the Condominium Authority Tribunal (CAT) and in Small Claims Court for condo-related disputes.' },
      { question: 'What types of condo disputes do you handle?', answer: 'We handle common element access issues, noise complaints, condo fee disputes, pet restrictions, parking issues, and condo board governance matters.' },
      { question: 'How does the Condominium Authority Tribunal work?', answer: 'The CAT is an online tribunal that resolves certain condo disputes. We guide you through the process and represent your interests.' },
      { question: 'Can I dispute a condo special assessment?', answer: 'Special assessments can be challenged in certain circumstances. Contact us for a free consultation to assess your options.' }
    ]
  },
  '/services/workplace-harassment': {
    title: 'Workplace Harassment Claims Ontario | HRTO | Legal Assist',
    description: 'Fight workplace harassment in Ontario. Our paralegals represent victims of workplace bullying, sexual harassment, and hostile work environments at the HRTO.',
    keywords: 'workplace harassment ontario, workplace bullying lawyer, sexual harassment claim, hostile work environment, HRTO complaint',
    schema: { type: 'LegalService', name: 'Workplace Harassment Claims', areaServed: ['London', 'Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Workplace Harassment', url: '/services/workplace-harassment' }],
    faqs: [
      { question: 'What constitutes workplace harassment in Ontario?', answer: 'Workplace harassment includes repeated, unwelcome conduct that a person knows or ought to know is unwelcome, including bullying, verbal abuse, and sexual harassment.' },
      { question: 'How do I file a workplace harassment complaint?', answer: 'You can file an internal complaint, contact the Ministry of Labour, or file a human rights application at the HRTO. We guide you through the best approach.' },
      { question: 'Can I be fired for reporting harassment?', answer: 'No. Ontario law protects employees from retaliation for reporting harassment. If you face reprisal, you may have additional legal claims.' },
      { question: 'What damages can I recover?', answer: 'You may recover compensation for lost wages, general damages for injury to dignity, and in some cases, reinstatement to your position.' }
    ]
  },
  '/services/odsp-appeals': {
    title: 'ODSP Appeals Ontario | Disability Benefits Appeal | Legal Assist',
    description: 'Appeal denied ODSP benefits in Ontario. Our paralegals represent clients at the Social Benefits Tribunal for Ontario Disability Support Program disputes.',
    keywords: 'ODSP appeal ontario, disability benefits appeal, social benefits tribunal, ODSP denied, disability support program',
    schema: { type: 'LegalService', name: 'ODSP Appeals', areaServed: ['London', 'Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'ODSP Appeals', url: '/services/odsp-appeals' }],
    faqs: [
      { question: 'Can you help if my ODSP application was denied?', answer: 'Yes, we represent clients appealing ODSP denials at the Social Benefits Tribunal. Many initially denied applications succeed on appeal.' },
      { question: 'How long does an ODSP appeal take?', answer: 'ODSP appeals typically take 3-6 months from filing to hearing. We work to expedite the process where possible.' },
      { question: 'What evidence do I need for an ODSP appeal?', answer: 'Medical evidence, treatment records, and detailed information about how your disability affects daily living are essential. We help gather and present this evidence.' },
      { question: 'Can a paralegal represent me at the Social Benefits Tribunal?', answer: 'Yes, licensed paralegals are authorized to represent clients at the Social Benefits Tribunal for ODSP and Ontario Works appeals.' }
    ]
  },
  '/services/ontario-works-appeals': {
    title: 'Ontario Works Appeals | Social Assistance Disputes | Legal Assist',
    description: 'Appeal Ontario Works decisions. Our paralegals represent clients at the Social Benefits Tribunal for OW benefit disputes, denial appeals, and overpayment challenges.',
    keywords: 'ontario works appeal, OW appeal, social assistance dispute, social benefits tribunal, welfare appeal ontario',
    schema: { type: 'LegalService', name: 'Ontario Works Appeals', areaServed: ['London', 'Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Ontario Works Appeals', url: '/services/ontario-works-appeals' }],
    faqs: [
      { question: 'Can I appeal an Ontario Works decision?', answer: 'Yes, you can request an internal review and then appeal to the Social Benefits Tribunal if you disagree with the decision.' },
      { question: 'What Ontario Works decisions can be appealed?', answer: 'You can appeal benefit denials, reductions, overpayment decisions, and eligibility determinations.' },
      { question: 'How long do I have to appeal?', answer: 'You generally have 30 days to request an internal review. Contact us immediately after receiving an unfavourable decision.' },
      { question: 'Is there a cost to appeal?', answer: 'There is no filing fee for Social Benefits Tribunal appeals. Contact us for affordable representation options.' }
    ]
  },
  '/services/wsib-claims': {
    title: 'WSIB Claims Ontario | Workplace Injury Compensation | Legal Assist',
    description: 'Fight denied WSIB claims in Ontario. Our paralegals represent injured workers appealing WSIB decisions at the Workplace Safety and Insurance Appeals Tribunal.',
    keywords: 'WSIB claim ontario, workplace injury claim, WSIB appeal, WSIAT, workers compensation ontario',
    schema: { type: 'LegalService', name: 'WSIB Claims', areaServed: ['London', 'Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'WSIB Claims', url: '/services/wsib-claims' }],
    faqs: [
      { question: 'Can a paralegal help with a WSIB claim?', answer: 'Yes, licensed paralegals can represent injured workers in WSIB disputes and appeals at the WSIAT tribunal.' },
      { question: 'What if my WSIB claim was denied?', answer: 'You can appeal through the WSIB internal process and then to the Workplace Safety and Insurance Appeals Tribunal (WSIAT).' },
      { question: 'How long do I have to appeal a WSIB decision?', answer: 'You generally have 30 days for internal objections and 6 months for WSIAT appeals. Contact us immediately after a denial.' },
      { question: 'What benefits am I entitled to from WSIB?', answer: 'Depending on your injury, you may be entitled to loss of earnings benefits, health care coverage, labour market re-entry, and non-economic loss awards.' }
    ]
  },
  '/services/bylaw-infractions': {
    title: 'By-Law Infraction Defence Ontario | Municipal Charges | Legal Assist',
    description: 'Defend by-law infractions in Ontario. Our paralegals fight municipal by-law charges including noise violations, property standards, and zoning offences.',
    keywords: 'bylaw infraction defence, municipal bylaw charge, noise bylaw, property standards, zoning violation ontario',
    schema: { type: 'LegalService', name: 'By-Law Infraction Defence', areaServed: ['London', 'Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'By-Law Infractions', url: '/services/bylaw-infractions' }],
    faqs: [
      { question: 'Can you fight a municipal by-law ticket?', answer: 'Yes, by-law infractions are prosecuted under the Provincial Offences Act. Our paralegals can defend you at court.' },
      { question: 'What types of by-law charges do you handle?', answer: 'We handle noise violations, property standards orders, zoning infractions, sign by-laws, parking by-laws, and animal control charges.' },
      { question: 'What are the penalties for a by-law conviction?', answer: 'Fines vary by municipality and offence but can range from hundreds to thousands of dollars. A conviction may also require compliance remedies.' },
      { question: 'How do I defend a property standards order?', answer: 'You can appeal a property standards order to the Property Standards Committee. We represent property owners through this process.' }
    ]
  },
  '/services/dangerous-dog-hearings': {
    title: 'Dangerous Dog Hearing Defence Ontario | Dog Owner Rights | Legal Assist',
    description: 'Defend against dangerous dog designations in Ontario. Our paralegals represent dog owners at municipal dangerous dog hearings and breed-specific challenges.',
    keywords: 'dangerous dog hearing ontario, dog bite lawyer, pit bull ban, dangerous dog designation, dog owner rights',
    schema: { type: 'LegalService', name: 'Dangerous Dog Hearing Defence', areaServed: ['London', 'Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Dangerous Dog Hearings', url: '/services/dangerous-dog-hearings' }],
    faqs: [
      { question: 'What happens at a dangerous dog hearing?', answer: 'A municipal hearing determines whether your dog should be designated as dangerous. This can result in muzzle orders, restrictions, or euthanasia orders.' },
      { question: 'Can a paralegal represent me at a dog hearing?', answer: 'Yes, our paralegals represent dog owners at dangerous dog hearings and help challenge designations and orders.' },
      { question: 'What defences are available?', answer: 'Defences may include provocation, trespassing by the complainant, mistaken identity, lack of evidence, or procedural errors in the hearing process.' },
      { question: 'Can I appeal a dangerous dog order?', answer: 'Yes, dangerous dog orders can be appealed. Contact us immediately after receiving a notice to protect your rights and your pet.' }
    ]
  },
  '/services/accessibility-complaints': {
    title: 'Accessibility Complaints Ontario | AODA Violations | Legal Assist',
    description: 'File accessibility complaints under AODA in Ontario. Our paralegals represent clients facing accessibility barriers in workplaces, services, and public spaces.',
    keywords: 'accessibility complaint ontario, AODA violation, disability discrimination, barrier-free access, accessibility rights',
    schema: { type: 'LegalService', name: 'Accessibility Complaints', areaServed: ['London', 'Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Accessibility Complaints', url: '/services/accessibility-complaints' }],
    faqs: [
      { question: 'What is AODA?', answer: 'The Accessibility for Ontarians with Disabilities Act (AODA) sets standards for accessibility in customer service, employment, information, transportation, and built environments.' },
      { question: 'How do I file an accessibility complaint?', answer: 'You can file a complaint with the organization directly, contact the AODA compliance office, or file a human rights application at the HRTO.' },
      { question: 'Can I file a human rights complaint for accessibility issues?', answer: 'Yes, if accessibility barriers constitute disability discrimination, you can file a human rights complaint at the HRTO for compensation and systemic remedies.' },
      { question: 'What remedies are available?', answer: 'Remedies may include compensation, policy changes, barrier removal, training requirements, and compliance orders.' }
    ]
  },
  '/resources/forms/traffic-tickets': {
    title: 'Ontario Traffic Ticket Forms & Court Directory | Legal Assist',
    description: 'Complete directory of Ontario Provincial Offences Act forms and traffic court locations. Find your local POA court, download forms, and access payment portals.',
    keywords: 'ontario traffic ticket forms, POA court locations, provincial offences forms, traffic court ontario, pay traffic ticket online',
    schema: { type: 'LegalService', name: 'Traffic Ticket Forms Directory', areaServed: ['Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Resources', url: '/resources' }, { name: 'Traffic Ticket Forms', url: '/resources/forms/traffic-tickets' }],
    faqs: [
      { question: 'Where can I find my local traffic court?', answer: 'Our comprehensive directory lists all Provincial Offences Act courts across Ontario with addresses, phone numbers, hours, and payment portals.' },
      { question: 'What forms do I need to fight a traffic ticket?', answer: 'Common forms include the Notice of Intention to Appear, Request for Trial, and Request for Reopening. Find all forms on our directory.' },
      { question: 'Can I pay my traffic ticket online?', answer: 'Many Ontario municipalities offer online payment portals. Check our directory for your local court payment options.' },
      { question: 'What is the deadline to respond to a traffic ticket?', answer: 'You generally have 15 days from receiving the ticket to file a Notice of Intention to Appear. Missing this deadline may result in conviction.' }
    ]
  },
  '/resources/forms/ltb': {
    title: 'Ontario Landlord and Tenant Board Forms | LTB Resources | Legal Assist',
    description: 'Download Ontario LTB forms for landlords and tenants. Complete directory of Landlord and Tenant Board applications, notices, and filing guides.',
    keywords: 'LTB forms ontario, landlord tenant board forms, T2 application, L1 application, eviction forms ontario',
    schema: { type: 'LegalService', name: 'LTB Forms Directory', areaServed: ['Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Resources', url: '/resources' }, { name: 'LTB Forms', url: '/resources/forms/ltb' }],
    faqs: [
      { question: 'Where can I download LTB forms?', answer: 'Our directory provides direct links to all Landlord and Tenant Board forms on the Tribunals Ontario website.' },
      { question: 'What LTB form do I need for eviction?', answer: 'Landlords use L1 (non-payment of rent) or L2 (other reasons) applications. The appropriate notice (N4, N5, N12, etc.) must be served first.' },
      { question: 'What form does a tenant use to file a complaint?', answer: 'Tenants typically use T2 (tenant rights), T6 (maintenance), or T1 (rent rebate) applications depending on the issue.' },
      { question: 'How much does it cost to file at the LTB?', answer: 'Filing fees vary by application type. Check the LTB website for current fees. Fee waivers are available for those who qualify.' }
    ]
  },
  '/resources/forms/small-claims': {
    title: 'Ontario Small Claims Court Forms | Filing Guide | Legal Assist',
    description: 'Download Ontario Small Claims Court forms. Complete directory of plaintiff and defendant forms, filing instructions, and court locations for claims up to $50,000.',
    keywords: 'small claims court forms ontario, plaintiff claim form, defence form, small claims filing, court forms download',
    schema: { type: 'LegalService', name: 'Small Claims Court Forms', areaServed: ['Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Resources', url: '/resources' }, { name: 'Small Claims Forms', url: '/resources/forms/small-claims' }],
    faqs: [
      { question: 'What forms do I need to file a Small Claims Court claim?', answer: 'You need a Plaintiff\'s Claim (Form 7A) to start a lawsuit. Additional forms may be needed depending on your case.' },
      { question: 'How much does it cost to file in Small Claims Court?', answer: 'Filing fees depend on whether you file electronically or in person. Current fees range from approximately $102 to $249.' },
      { question: 'What is the Small Claims Court limit in Ontario?', answer: 'The monetary limit for Small Claims Court in Ontario is $50,000 (excluding interest and costs).' },
      { question: 'How do I serve court documents?', answer: 'Documents can be served by personal service, courier, registered mail, or in some cases by email. Specific rules apply to each method.' }
    ]
  },
  '/resources/forms/hrto': {
    title: 'HRTO Application Forms Ontario | Human Rights Tribunal | Legal Assist',
    description: 'Download Ontario Human Rights Tribunal forms. Application guides, response forms, and filing instructions for discrimination complaints at the HRTO.',
    keywords: 'HRTO forms ontario, human rights tribunal forms, discrimination complaint form, HRTO application, human rights filing',
    schema: { type: 'LegalService', name: 'HRTO Forms Directory', areaServed: ['Ontario'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Resources', url: '/resources' }, { name: 'HRTO Forms', url: '/resources/forms/hrto' }],
    faqs: [
      { question: 'How do I file a human rights complaint in Ontario?', answer: 'File an Application (Form 1) with the Human Rights Tribunal of Ontario. We can help you complete and file your application.' },
      { question: 'What is the deadline to file at the HRTO?', answer: 'You generally have one year from the date of the last incident of discrimination to file your application.' },
      { question: 'Is there a fee to file at the HRTO?', answer: 'No, there is no filing fee to submit an application to the Human Rights Tribunal of Ontario.' },
      { question: 'What happens after I file my HRTO application?', answer: 'The respondent has 35 days to file a response. The HRTO may then schedule mediation or a hearing.' }
    ]
  },

  '/locations': {
    title: 'Ontario Paralegal Services | All Locations | Legal Assist',
    description: 'Licensed paralegal services across 150+ Ontario cities and towns. Find affordable legal representation near you for traffic tickets, small claims, landlord-tenant disputes, and more.',
    keywords: 'ontario paralegal, paralegal near me, ontario legal services, find paralegal ontario, paralegal locations',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Ontario Locations', areaServed: ['Ontario', 'Southwestern Ontario', 'Greater Toronto Area', 'Eastern Ontario', 'Northern Ontario', 'Niagara Region', 'Ottawa'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }],
    faqs: [
      { question: 'Do you serve all of Ontario?', answer: 'Yes, Legal Assist provides paralegal services across 150+ Ontario communities from Windsor to Ottawa and Thunder Bay to Niagara Falls, including virtual consultations province-wide.' },
      { question: 'Can you represent me if I live in a rural area?', answer: 'Absolutely. We offer phone and video consultations for clients throughout Ontario, and we attend courts across the province.' },
      { question: 'How do I find the nearest Legal Assist location?', answer: 'Use the search feature on our locations page to find your city or region, or call us at 226-272-5153 for immediate assistance.' },
      { question: 'What services do you offer province-wide?', answer: 'We handle traffic tickets, small claims court, landlord-tenant disputes, human rights complaints, and provincial offences across all Ontario jurisdictions.' }
    ]
  },
  '/locations/brant': {
    title: 'Brant Paralegal | Legal Services Brant County | Legal Assist',
    description: 'Licensed paralegal services in Brant and Brant County. Traffic ticket defence on Highway 403 and Highway 24, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal brant, brant lawyer, brant county legal services, traffic ticket brant, paris paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Brant', areaServed: ['Paris', 'St. George', 'Burford', 'Mount Pleasant', 'Oakland', 'Brant County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Brant', url: '/locations/brant' }],
    faqs: [
      { question: 'Do you serve Brant and Brant County?', answer: 'Yes, we serve Brant, Paris, St. George, Burford, and all communities throughout Brant County.' },
      { question: 'Where is the nearest court for Brant residents?', answer: 'The nearest court is the Brantford courthouse at 70 Wellington Street.' },
      { question: 'Can you fight traffic tickets on Highway 403 and Highway 24?', answer: 'Yes, we defend traffic tickets issued on Highway 403 and Highway 24 and all roads throughout Brant County.' },
      { question: 'Do you offer virtual consultations for Brant?', answer: 'Yes, phone and video consultations are available for all Brant County residents.' }
    ]
  },
  '/locations/clarence-rockland': {
    title: 'Clarence-Rockland Paralegal | Legal Services Prescott & Russell | Legal Assist',
    description: 'Licensed paralegal services in Clarence-Rockland and Prescott & Russell. Traffic ticket defence on Highway 17 and County Road 17, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal clarence rockland, clarence rockland lawyer, prescott & russell legal services, traffic ticket clarence rockland, rockland paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Clarence-Rockland', areaServed: ['Clarence-Rockland', 'Rockland', 'Clarence Creek', 'Bourget', 'Hammond', 'Wendover'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Clarence-Rockland', url: '/locations/clarence-rockland' }],
    faqs: [
      { question: 'Do you serve Clarence-Rockland and Prescott & Russell?', answer: 'Yes, we serve Clarence-Rockland, Rockland, Clarence Creek, Bourget, and all communities throughout Prescott & Russell.' },
      { question: 'Where is the nearest court for Clarence-Rockland residents?', answer: 'The nearest court is the L\'Orignal courthouse.' },
      { question: 'Can you fight traffic tickets on Highway 17 and County Road 17?', answer: 'Yes, we defend traffic tickets issued on Highway 17 and County Road 17 and all roads throughout Prescott & Russell.' },
      { question: 'Do you offer virtual consultations for Clarence-Rockland?', answer: 'Yes, phone and video consultations are available for all Prescott & Russell residents.' }
    ]
  },
  '/locations/elliot-lake': {
    title: 'Elliot Lake Paralegal | Legal Services Algoma District | Legal Assist',
    description: 'Licensed paralegal services in Elliot Lake and Algoma District. Traffic ticket defence on Highway 17 and Highway 108, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal elliot lake, elliot lake lawyer, algoma district legal services, traffic ticket elliot lake, blind river paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Elliot Lake', areaServed: ['Elliot Lake', 'Blind River', 'Thessalon', 'Iron Bridge', 'Algoma District'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Elliot Lake', url: '/locations/elliot-lake' }],
    faqs: [
      { question: 'Do you serve Elliot Lake and Algoma District?', answer: 'Yes, we serve Elliot Lake, Blind River, Thessalon, Iron Bridge, and all communities throughout Algoma District.' },
      { question: 'Where is the nearest court for Elliot Lake residents?', answer: 'The nearest court is the Elliot Lake courthouse.' },
      { question: 'Can you fight traffic tickets on Highway 17 and Highway 108?', answer: 'Yes, we defend traffic tickets issued on Highway 17 and Highway 108 and all roads throughout Algoma District.' },
      { question: 'Do you offer virtual consultations for Elliot Lake?', answer: 'Yes, phone and video consultations are available for all Algoma District residents.' }
    ]
  },
  '/locations/prince-edward-county': {
    title: 'Prince Edward County Paralegal | Legal Services Prince Edward County | Legal Assist',
    description: 'Licensed paralegal services in Prince Edward County and Prince Edward County. Traffic ticket defence on Highway 49 and Highway 62, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal prince edward county, prince edward county lawyer, prince edward county legal services, traffic ticket prince edward county, picton paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Prince Edward County', areaServed: ['Picton', 'Wellington', 'Bloomfield', 'Consecon', 'Ameliasburgh'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Prince Edward County', url: '/locations/prince-edward-county' }],
    faqs: [
      { question: 'Do you serve Prince Edward County and Prince Edward County?', answer: 'Yes, we serve Prince Edward County, Picton, Wellington, Bloomfield, and all communities throughout Prince Edward County.' },
      { question: 'Where is the nearest court for Prince Edward County residents?', answer: 'The nearest court is the Picton courthouse at 332 Main Street.' },
      { question: 'Can you fight traffic tickets on Highway 49 and Highway 62?', answer: 'Yes, we defend traffic tickets issued on Highway 49 and Highway 62 and all roads throughout Prince Edward County.' },
      { question: 'Do you offer virtual consultations for Prince Edward County?', answer: 'Yes, phone and video consultations are available for all Prince Edward County residents.' }
    ]
  },
  '/locations/quinte-west': {
    title: 'Quinte West Paralegal | Legal Services Hastings County | Legal Assist',
    description: 'Licensed paralegal services in Quinte West and Hastings County. Traffic ticket defence on Highway 401 and Highway 33, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal quinte west, quinte west lawyer, hastings county legal services, traffic ticket quinte west, trenton paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Quinte West', areaServed: ['Trenton', 'Frankford', 'Batawa', 'Murray', 'Sidney', 'Quinte West'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Quinte West', url: '/locations/quinte-west' }],
    faqs: [
      { question: 'Do you serve Quinte West and Hastings County?', answer: 'Yes, we serve Quinte West, Trenton, Frankford, Batawa, and all communities throughout Hastings County.' },
      { question: 'Where is the nearest court for Quinte West residents?', answer: 'The nearest court is the Belleville courthouse at 235 Pinnacle Street.' },
      { question: 'Can you fight traffic tickets on Highway 401 and Highway 33?', answer: 'Yes, we defend traffic tickets issued on Highway 401 and Highway 33 and all roads throughout Hastings County.' },
      { question: 'Do you offer virtual consultations for Quinte West?', answer: 'Yes, phone and video consultations are available for all Hastings County residents.' }
    ]
  },
  '/locations/amherstburg': {
    title: 'Amherstburg Paralegal | Legal Services Essex County | Legal Assist',
    description: 'Licensed paralegal services in Amherstburg and Essex County. Traffic ticket defence on County Road 20 and Highway 18, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal amherstburg, amherstburg lawyer, essex county legal services, traffic ticket amherstburg, mcgregor paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Amherstburg', areaServed: ['Amherstburg', 'McGregor', 'Anderdon', 'Harrow', 'Essex County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Amherstburg', url: '/locations/amherstburg' }],
    faqs: [
      { question: 'Do you serve Amherstburg and Essex County?', answer: 'Yes, we serve Amherstburg, McGregor, Harrow, Essex County, and all communities throughout Essex County.' },
      { question: 'Where is the nearest court for Amherstburg residents?', answer: 'The nearest court is the Windsor courthouse at 245 Windsor Avenue.' },
      { question: 'Can you fight traffic tickets on County Road 20 and Highway 18?', answer: 'Yes, we defend traffic tickets issued on County Road 20 and Highway 18 and all roads throughout Essex County.' },
      { question: 'Do you offer virtual consultations for Amherstburg?', answer: 'Yes, phone and video consultations are available for all Essex County residents.' }
    ]
  },
  '/locations/bradford-west-gwillimbury': {
    title: 'Bradford West Gwillimbury Paralegal | Legal Services Simcoe County | Legal Assist',
    description: 'Licensed paralegal services in Bradford West Gwillimbury and Simcoe County. Traffic ticket defence on Highway 400 and Highway 88, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal bradford west gwillimbury, bradford west gwillimbury lawyer, simcoe county legal services, traffic ticket bradford west gwillimbury, bradford paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Bradford West Gwillimbury', areaServed: ['Bradford', 'Bond Head', 'Newton Robinson', 'South Simcoe'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Bradford West Gwillimbury', url: '/locations/bradford-west-gwillimbury' }],
    faqs: [
      { question: 'Do you serve Bradford West Gwillimbury and Simcoe County?', answer: 'Yes, we serve Bradford West Gwillimbury, Bradford, Bond Head, Newton Robinson, and all communities throughout Simcoe County.' },
      { question: 'Where is the nearest court for Bradford West Gwillimbury residents?', answer: 'The nearest court is the Barrie courthouse at 75 Mulcaster Street.' },
      { question: 'Can you fight traffic tickets on Highway 400 and Highway 88?', answer: 'Yes, we defend traffic tickets issued on Highway 400 and Highway 88 and all roads throughout Simcoe County.' },
      { question: 'Do you offer virtual consultations for Bradford West Gwillimbury?', answer: 'Yes, phone and video consultations are available for all Simcoe County residents.' }
    ]
  },
  '/locations/east-gwillimbury': {
    title: 'East Gwillimbury Paralegal | Legal Services York Region | Legal Assist',
    description: 'Licensed paralegal services in East Gwillimbury and York Region. Traffic ticket defence on Highway 404 and Woodbine Avenue, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal east gwillimbury, east gwillimbury lawyer, york region legal services, traffic ticket east gwillimbury, holland landing paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist East Gwillimbury', areaServed: ['Holland Landing', 'Mount Albert', 'Sharon', 'Queensville', 'East Gwillimbury'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'East Gwillimbury', url: '/locations/east-gwillimbury' }],
    faqs: [
      { question: 'Do you serve East Gwillimbury and York Region?', answer: 'Yes, we serve East Gwillimbury, Holland Landing, Mount Albert, Sharon, and all communities throughout York Region.' },
      { question: 'Where is the nearest court for East Gwillimbury residents?', answer: 'The nearest court is the Newmarket courthouse at 50 Eagle Street West.' },
      { question: 'Can you fight traffic tickets on Highway 404 and Woodbine Avenue?', answer: 'Yes, we defend traffic tickets issued on Highway 404 and Woodbine Avenue and all roads throughout York Region.' },
      { question: 'Do you offer virtual consultations for East Gwillimbury?', answer: 'Yes, phone and video consultations are available for all York Region residents.' }
    ]
  },
  '/locations/erin': {
    title: 'Erin Paralegal | Legal Services Wellington County | Legal Assist',
    description: 'Licensed paralegal services in Erin and Wellington County. Traffic ticket defence on Highway 24 and Highway 124, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal erin, erin lawyer, wellington county legal services, traffic ticket erin, hillsburgh paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Erin', areaServed: ['Erin', 'Hillsburgh', 'Ballinafad', 'Wellington County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Erin', url: '/locations/erin' }],
    faqs: [
      { question: 'Do you serve Erin and Wellington County?', answer: 'Yes, we serve Erin, Hillsburgh, Ballinafad, Acton, and all communities throughout Wellington County.' },
      { question: 'Where is the nearest court for Erin residents?', answer: 'The nearest court is the Guelph courthouse at 74 Woolwich Street.' },
      { question: 'Can you fight traffic tickets on Highway 24 and Highway 124?', answer: 'Yes, we defend traffic tickets issued on Highway 24 and Highway 124 and all roads throughout Wellington County.' },
      { question: 'Do you offer virtual consultations for Erin?', answer: 'Yes, phone and video consultations are available for all Wellington County residents.' }
    ]
  },
  '/locations/essex': {
    title: 'Essex Paralegal | Legal Services Essex County | Legal Assist',
    description: 'Licensed paralegal services in Essex and Essex County. Traffic ticket defence on Highway 3 and County Road 8, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal essex, essex lawyer, essex county legal services, traffic ticket essex, harrow paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Essex', areaServed: ['Essex', 'Harrow', 'Colchester', 'McGregor', 'Essex County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Essex', url: '/locations/essex' }],
    faqs: [
      { question: 'Do you serve Essex and Essex County?', answer: 'Yes, we serve Essex, Harrow, Colchester, McGregor, and all communities throughout Essex County.' },
      { question: 'Where is the nearest court for Essex residents?', answer: 'The nearest court is the Windsor courthouse at 245 Windsor Avenue.' },
      { question: 'Can you fight traffic tickets on Highway 3 and County Road 8?', answer: 'Yes, we defend traffic tickets issued on Highway 3 and County Road 8 and all roads throughout Essex County.' },
      { question: 'Do you offer virtual consultations for Essex?', answer: 'Yes, phone and video consultations are available for all Essex County residents.' }
    ]
  },
  '/locations/fergus-elora': {
    title: 'Fergus-Elora Paralegal | Legal Services Wellington County | Legal Assist',
    description: 'Licensed paralegal services in Fergus-Elora and Wellington County. Traffic ticket defence on Highway 6 and Highway 7, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal fergus elora, fergus elora lawyer, wellington county legal services, traffic ticket fergus elora, fergus paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Fergus-Elora', areaServed: ['Fergus', 'Elora', 'Salem', 'Belwood', 'Centre Wellington'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Fergus-Elora', url: '/locations/fergus-elora' }],
    faqs: [
      { question: 'Do you serve Fergus-Elora and Wellington County?', answer: 'Yes, we serve Fergus-Elora, Fergus, Elora, Salem, and all communities throughout Wellington County.' },
      { question: 'Where is the nearest court for Fergus-Elora residents?', answer: 'The nearest court is the Guelph courthouse at 74 Woolwich Street.' },
      { question: 'Can you fight traffic tickets on Highway 6 and Highway 7?', answer: 'Yes, we defend traffic tickets issued on Highway 6 and Highway 7 and all roads throughout Wellington County.' },
      { question: 'Do you offer virtual consultations for Fergus-Elora?', answer: 'Yes, phone and video consultations are available for all Wellington County residents.' }
    ]
  },
  '/locations/fort-erie': {
    title: 'Fort Erie Paralegal | Legal Services Niagara Region | Legal Assist',
    description: 'Licensed paralegal services in Fort Erie and Niagara Region. Traffic ticket defence on QEW and Highway 3, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal fort erie, fort erie lawyer, niagara region legal services, traffic ticket fort erie, ridgeway paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Fort Erie', areaServed: ['Fort Erie', 'Ridgeway', 'Crystal Beach', 'Stevensville', 'South Niagara'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Fort Erie', url: '/locations/fort-erie' }],
    faqs: [
      { question: 'Do you serve Fort Erie and Niagara Region?', answer: 'Yes, we serve Fort Erie, Ridgeway, Crystal Beach, Stevensville, and all communities throughout Niagara Region.' },
      { question: 'Where is the nearest court for Fort Erie residents?', answer: 'The nearest court is the Welland courthouse at 102 East Main Street.' },
      { question: 'Can you fight traffic tickets on QEW and Highway 3?', answer: 'Yes, we defend traffic tickets issued on QEW and Highway 3 and all roads throughout Niagara Region.' },
      { question: 'Do you offer virtual consultations for Fort Erie?', answer: 'Yes, phone and video consultations are available for all Niagara Region residents.' }
    ]
  },
  '/locations/gananoque': {
    title: 'Gananoque Paralegal | Legal Services Leeds and Grenville | Legal Assist',
    description: 'Licensed paralegal services in Gananoque and Leeds and Grenville. Traffic ticket defence on Highway 401 and Highway 32, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal gananoque, gananoque lawyer, leeds and grenville legal services, traffic ticket gananoque, thousand islands paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Gananoque', areaServed: ['Gananoque', 'Thousand Islands', 'Leeds and Grenville'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Gananoque', url: '/locations/gananoque' }],
    faqs: [
      { question: 'Do you serve Gananoque and Leeds and Grenville?', answer: 'Yes, we serve Gananoque, Thousand Islands, Lansdowne, Ivy Lea, and all communities throughout Leeds and Grenville.' },
      { question: 'Where is the nearest court for Gananoque residents?', answer: 'The nearest court is the Brockville courthouse at 7 Buell Street.' },
      { question: 'Can you fight traffic tickets on Highway 401 and Highway 32?', answer: 'Yes, we defend traffic tickets issued on Highway 401 and Highway 32 and all roads throughout Leeds and Grenville.' },
      { question: 'Do you offer virtual consultations for Gananoque?', answer: 'Yes, phone and video consultations are available for all Leeds and Grenville residents.' }
    ]
  },
  '/locations/georgina': {
    title: 'Georgina Paralegal | Legal Services York Region | Legal Assist',
    description: 'Licensed paralegal services in Georgina and York Region. Traffic ticket defence on Highway 48 and Woodbine Avenue, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal georgina, georgina lawyer, york region legal services, traffic ticket georgina, keswick paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Georgina', areaServed: ['Keswick', 'Sutton', 'Pefferlaw', 'Jackson\'s Point', 'Georgina'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Georgina', url: '/locations/georgina' }],
    faqs: [
      { question: 'Do you serve Georgina and York Region?', answer: 'Yes, we serve Georgina, Keswick, Sutton, Pefferlaw, and all communities throughout York Region.' },
      { question: 'Where is the nearest court for Georgina residents?', answer: 'The nearest court is the Newmarket courthouse at 50 Eagle Street West.' },
      { question: 'Can you fight traffic tickets on Highway 48 and Woodbine Avenue?', answer: 'Yes, we defend traffic tickets issued on Highway 48 and Woodbine Avenue and all roads throughout York Region.' },
      { question: 'Do you offer virtual consultations for Georgina?', answer: 'Yes, phone and video consultations are available for all York Region residents.' }
    ]
  },
  '/locations/innisfil': {
    title: 'Innisfil Paralegal | Legal Services Simcoe County | Legal Assist',
    description: 'Licensed paralegal services in Innisfil and Simcoe County. Traffic ticket defence on Highway 400 and Highway 89, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal innisfil, innisfil lawyer, simcoe county legal services, traffic ticket innisfil, alcona paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Innisfil', areaServed: ['Innisfil', 'Alcona', 'Cookstown', 'Lefroy', 'Stroud', 'South Simcoe'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Innisfil', url: '/locations/innisfil' }],
    faqs: [
      { question: 'Do you serve Innisfil and Simcoe County?', answer: 'Yes, we serve Innisfil, Alcona, Cookstown, Lefroy, and all communities throughout Simcoe County.' },
      { question: 'Where is the nearest court for Innisfil residents?', answer: 'The nearest court is the Barrie courthouse at 75 Mulcaster Street.' },
      { question: 'Can you fight traffic tickets on Highway 400 and Highway 89?', answer: 'Yes, we defend traffic tickets issued on Highway 400 and Highway 89 and all roads throughout Simcoe County.' },
      { question: 'Do you offer virtual consultations for Innisfil?', answer: 'Yes, phone and video consultations are available for all Simcoe County residents.' }
    ]
  },
  '/locations/huron-county': {
    title: 'Huron County Paralegal | Legal Services Huron County | Legal Assist',
    description: 'Licensed paralegal services in Huron County and Huron County. Traffic ticket defence on Highway 8 and Highway 21, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal huron county, huron county lawyer, huron county legal services, traffic ticket huron county, goderich paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Huron County', areaServed: ['Goderich', 'Clinton', 'Seaforth', 'Exeter', 'Wingham', 'Huron County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Huron County', url: '/locations/huron-county' }],
    faqs: [
      { question: 'Do you serve Huron County and Huron County?', answer: 'Yes, we serve Huron County, Goderich, Clinton, Seaforth, and all communities throughout Huron County.' },
      { question: 'Where is the nearest court for Huron County residents?', answer: 'The nearest court is the Goderich courthouse at 1 Courthouse Square.' },
      { question: 'Can you fight traffic tickets on Highway 8 and Highway 21?', answer: 'Yes, we defend traffic tickets issued on Highway 8 and Highway 21 and all roads throughout Huron County.' },
      { question: 'Do you offer virtual consultations for Huron County?', answer: 'Yes, phone and video consultations are available for all Huron County residents.' }
    ]
  },
  '/locations/norfolk-county': {
    title: 'Norfolk County Paralegal | Legal Services Norfolk County | Legal Assist',
    description: 'Licensed paralegal services in Norfolk County and Norfolk County. Traffic ticket defence on Highway 3 and Highway 24, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal norfolk county, norfolk county lawyer, norfolk county legal services, traffic ticket norfolk county, simcoe paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Norfolk County', areaServed: ['Simcoe', 'Port Dover', 'Delhi', 'Waterford', 'Norfolk County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Norfolk County', url: '/locations/norfolk-county' }],
    faqs: [
      { question: 'Do you serve Norfolk County and Norfolk County?', answer: 'Yes, we serve Norfolk County, Simcoe, Port Dover, Delhi, and all communities throughout Norfolk County.' },
      { question: 'Where is the nearest court for Norfolk County residents?', answer: 'The nearest court is the Simcoe courthouse at 50 Frederick Hobson VC Drive.' },
      { question: 'Can you fight traffic tickets on Highway 3 and Highway 24?', answer: 'Yes, we defend traffic tickets issued on Highway 3 and Highway 24 and all roads throughout Norfolk County.' },
      { question: 'Do you offer virtual consultations for Norfolk County?', answer: 'Yes, phone and video consultations are available for all Norfolk County residents.' }
    ]
  },
  '/locations/hanover': {
    title: 'Hanover Paralegal | Legal Services Grey County | Legal Assist',
    description: 'Licensed paralegal services in Hanover and Grey County. Traffic ticket defence on Highway 4 and Highway 10, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal hanover, hanover lawyer, grey county legal services, traffic ticket hanover, walkerton paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Hanover', areaServed: ['Hanover', 'Walkerton', 'Durham', 'Grey County', 'Bruce County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Hanover', url: '/locations/hanover' }],
    faqs: [
      { question: 'Do you serve Hanover and Grey County?', answer: 'Yes, we serve Hanover, Walkerton, Durham, Mount Forest, and all communities throughout Grey County.' },
      { question: 'Where is the nearest court for Hanover residents?', answer: 'The nearest court is the Owen Sound courthouse at 611 9th Avenue East.' },
      { question: 'Can you fight traffic tickets on Highway 4 and Highway 10?', answer: 'Yes, we defend traffic tickets issued on Highway 4 and Highway 10 and all roads throughout Grey County.' },
      { question: 'Do you offer virtual consultations for Hanover?', answer: 'Yes, phone and video consultations are available for all Grey County residents.' }
    ]
  },
  '/locations/hearst': {
    title: 'Hearst Paralegal | Legal Services Cochrane District | Legal Assist',
    description: 'Licensed paralegal services in Hearst and Cochrane District. Traffic ticket defence on Highway 11 and Highway 583, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal hearst, hearst lawyer, cochrane district legal services, traffic ticket hearst, kapuskasing paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Hearst', areaServed: ['Hearst', 'Kapuskasing', 'Mattice', 'Constance Lake', 'Cochrane District'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Hearst', url: '/locations/hearst' }],
    faqs: [
      { question: 'Do you serve Hearst and Cochrane District?', answer: 'Yes, we serve Hearst, Kapuskasing, Mattice, Constance Lake, and all communities throughout Cochrane District.' },
      { question: 'Where is the nearest court for Hearst residents?', answer: 'The nearest court is the Hearst courthouse.' },
      { question: 'Can you fight traffic tickets on Highway 11 and Highway 583?', answer: 'Yes, we defend traffic tickets issued on Highway 11 and Highway 583 and all roads throughout Cochrane District.' },
      { question: 'Do you offer virtual consultations for Hearst?', answer: 'Yes, phone and video consultations are available for all Cochrane District residents.' }
    ]
  },
  '/locations/kapuskasing': {
    title: 'Kapuskasing Paralegal | Legal Services Cochrane District | Legal Assist',
    description: 'Licensed paralegal services in Kapuskasing and Cochrane District. Traffic ticket defence on Highway 11 and Highway 581, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal kapuskasing, kapuskasing lawyer, cochrane district legal services, traffic ticket kapuskasing, smooth rock falls paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Kapuskasing', areaServed: ['Kapuskasing', 'Smooth Rock Falls', 'Moonbeam', 'Opasatika', 'Cochrane District'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Kapuskasing', url: '/locations/kapuskasing' }],
    faqs: [
      { question: 'Do you serve Kapuskasing and Cochrane District?', answer: 'Yes, we serve Kapuskasing, Smooth Rock Falls, Moonbeam, Opasatika, and all communities throughout Cochrane District.' },
      { question: 'Where is the nearest court for Kapuskasing residents?', answer: 'The nearest court is the Kapuskasing courthouse.' },
      { question: 'Can you fight traffic tickets on Highway 11 and Highway 581?', answer: 'Yes, we defend traffic tickets issued on Highway 11 and Highway 581 and all roads throughout Cochrane District.' },
      { question: 'Do you offer virtual consultations for Kapuskasing?', answer: 'Yes, phone and video consultations are available for all Cochrane District residents.' }
    ]
  },
  '/locations/kincardine': {
    title: 'Kincardine Paralegal | Legal Services Bruce County | Legal Assist',
    description: 'Licensed paralegal services in Kincardine and Bruce County. Traffic ticket defence on Highway 21 and Highway 9, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal kincardine, kincardine lawyer, bruce county legal services, traffic ticket kincardine, tiverton paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Kincardine', areaServed: ['Kincardine', 'Tiverton', 'Ripley', 'Lucknow', 'Bruce County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Kincardine', url: '/locations/kincardine' }],
    faqs: [
      { question: 'Do you serve Kincardine and Bruce County?', answer: 'Yes, we serve Kincardine, Tiverton, Ripley, Lucknow, and all communities throughout Bruce County.' },
      { question: 'Where is the nearest court for Kincardine residents?', answer: 'The nearest court is the Walkerton courthouse.' },
      { question: 'Can you fight traffic tickets on Highway 21 and Highway 9?', answer: 'Yes, we defend traffic tickets issued on Highway 21 and Highway 9 and all roads throughout Bruce County.' },
      { question: 'Do you offer virtual consultations for Kincardine?', answer: 'Yes, phone and video consultations are available for all Bruce County residents.' }
    ]
  },
  '/locations/kingsville': {
    title: 'Kingsville Paralegal | Legal Services Essex County | Legal Assist',
    description: 'Licensed paralegal services in Kingsville and Essex County. Traffic ticket defence on County Road 20 and Highway 3, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal kingsville, kingsville lawyer, essex county legal services, traffic ticket kingsville, ruthven paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Kingsville', areaServed: ['Kingsville', 'Ruthven', 'Cottam', 'Essex County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Kingsville', url: '/locations/kingsville' }],
    faqs: [
      { question: 'Do you serve Kingsville and Essex County?', answer: 'Yes, we serve Kingsville, Ruthven, Cottam, Leamington, and all communities throughout Essex County.' },
      { question: 'Where is the nearest court for Kingsville residents?', answer: 'The nearest court is the Windsor courthouse at 245 Windsor Avenue.' },
      { question: 'Can you fight traffic tickets on County Road 20 and Highway 3?', answer: 'Yes, we defend traffic tickets issued on County Road 20 and Highway 3 and all roads throughout Essex County.' },
      { question: 'Do you offer virtual consultations for Kingsville?', answer: 'Yes, phone and video consultations are available for all Essex County residents.' }
    ]
  },
  '/locations/kirkland-lake': {
    title: 'Kirkland Lake Paralegal | Legal Services Timiskaming District | Legal Assist',
    description: 'Licensed paralegal services in Kirkland Lake and Timiskaming District. Traffic ticket defence on Highway 11 and Highway 66, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal kirkland lake, kirkland lake lawyer, timiskaming district legal services, traffic ticket kirkland lake, larder lake paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Kirkland Lake', areaServed: ['Kirkland Lake', 'Larder Lake', 'Englehart', 'Timiskaming District'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Kirkland Lake', url: '/locations/kirkland-lake' }],
    faqs: [
      { question: 'Do you serve Kirkland Lake and Timiskaming District?', answer: 'Yes, we serve Kirkland Lake, Larder Lake, Englehart, Swastika, and all communities throughout Timiskaming District.' },
      { question: 'Where is the nearest court for Kirkland Lake residents?', answer: 'The nearest court is the Kirkland Lake courthouse.' },
      { question: 'Can you fight traffic tickets on Highway 11 and Highway 66?', answer: 'Yes, we defend traffic tickets issued on Highway 11 and Highway 66 and all roads throughout Timiskaming District.' },
      { question: 'Do you offer virtual consultations for Kirkland Lake?', answer: 'Yes, phone and video consultations are available for all Timiskaming District residents.' }
    ]
  },
  '/locations/lakeshore': {
    title: 'Lakeshore Paralegal | Legal Services Essex County | Legal Assist',
    description: 'Licensed paralegal services in Lakeshore and Essex County. Traffic ticket defence on Highway 401 and Highway 77, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal lakeshore, lakeshore lawyer, essex county legal services, traffic ticket lakeshore, belle river paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Lakeshore', areaServed: ['Belle River', 'Stoney Point', 'Comber', 'Tilbury', 'Lakeshore'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Lakeshore', url: '/locations/lakeshore' }],
    faqs: [
      { question: 'Do you serve Lakeshore and Essex County?', answer: 'Yes, we serve Lakeshore, Belle River, Stoney Point, Comber, and all communities throughout Essex County.' },
      { question: 'Where is the nearest court for Lakeshore residents?', answer: 'The nearest court is the Windsor courthouse at 245 Windsor Avenue.' },
      { question: 'Can you fight traffic tickets on Highway 401 and Highway 77?', answer: 'Yes, we defend traffic tickets issued on Highway 401 and Highway 77 and all roads throughout Essex County.' },
      { question: 'Do you offer virtual consultations for Lakeshore?', answer: 'Yes, phone and video consultations are available for all Essex County residents.' }
    ]
  },
  '/locations/lasalle': {
    title: 'LaSalle Paralegal | Legal Services Essex County | Legal Assist',
    description: 'Licensed paralegal services in LaSalle and Essex County. Traffic ticket defence on Highway 18 and Huron Church Road, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal lasalle, lasalle lawyer, essex county legal services, traffic ticket lasalle, windsor paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist LaSalle', areaServed: ['LaSalle', 'Windsor', 'Amherstburg', 'Essex County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'LaSalle', url: '/locations/lasalle' }],
    faqs: [
      { question: 'Do you serve LaSalle and Essex County?', answer: 'Yes, we serve LaSalle, Windsor, Amherstburg, Essex, and all communities throughout Essex County.' },
      { question: 'Where is the nearest court for LaSalle residents?', answer: 'The nearest court is the Windsor courthouse at 245 Windsor Avenue.' },
      { question: 'Can you fight traffic tickets on Highway 18 and Huron Church Road?', answer: 'Yes, we defend traffic tickets issued on Highway 18 and Huron Church Road and all roads throughout Essex County.' },
      { question: 'Do you offer virtual consultations for LaSalle?', answer: 'Yes, phone and video consultations are available for all Essex County residents.' }
    ]
  },
  '/locations/lincoln': {
    title: 'Lincoln Paralegal | Legal Services Niagara Region | Legal Assist',
    description: 'Licensed paralegal services in Lincoln and Niagara Region. Traffic ticket defence on QEW and Highway 8, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal lincoln, lincoln lawyer, niagara region legal services, traffic ticket lincoln, beamsville paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Lincoln', areaServed: ['Beamsville', 'Vineland', 'Jordan', 'Lincoln', 'Niagara Region'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Lincoln', url: '/locations/lincoln' }],
    faqs: [
      { question: 'Do you serve Lincoln and Niagara Region?', answer: 'Yes, we serve Lincoln, Beamsville, Vineland, Jordan, and all communities throughout Niagara Region.' },
      { question: 'Where is the nearest court for Lincoln residents?', answer: 'The nearest court is the St. Catharines courthouse at 59 Church Street.' },
      { question: 'Can you fight traffic tickets on QEW and Highway 8?', answer: 'Yes, we defend traffic tickets issued on QEW and Highway 8 and all roads throughout Niagara Region.' },
      { question: 'Do you offer virtual consultations for Lincoln?', answer: 'Yes, phone and video consultations are available for all Niagara Region residents.' }
    ]
  },
  '/locations/marathon': {
    title: 'Marathon Paralegal | Legal Services Thunder Bay District | Legal Assist',
    description: 'Licensed paralegal services in Marathon and Thunder Bay District. Traffic ticket defence on Highway 17 (Trans-Canada) and Highway 626, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal marathon, marathon lawyer, thunder bay district legal services, traffic ticket marathon, white river paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Marathon', areaServed: ['Marathon', 'White River', 'Manitouwadge', 'Thunder Bay District'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Marathon', url: '/locations/marathon' }],
    faqs: [
      { question: 'Do you serve Marathon and Thunder Bay District?', answer: 'Yes, we serve Marathon, White River, Manitouwadge, Terrace Bay, and all communities throughout Thunder Bay District.' },
      { question: 'Where is the nearest court for Marathon residents?', answer: 'The nearest court is the Thunder Bay courthouse at 125 Brodie Street North.' },
      { question: 'Can you fight traffic tickets on Highway 17 (Trans-Canada) and Highway 626?', answer: 'Yes, we defend traffic tickets issued on Highway 17 (Trans-Canada) and Highway 626 and all roads throughout Thunder Bay District.' },
      { question: 'Do you offer virtual consultations for Marathon?', answer: 'Yes, phone and video consultations are available for all Thunder Bay District residents.' }
    ]
  },
  '/locations/meaford': {
    title: 'Meaford Paralegal | Legal Services Grey County | Legal Assist',
    description: 'Licensed paralegal services in Meaford and Grey County. Traffic ticket defence on Highway 26 and County Road 7, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal meaford, meaford lawyer, grey county legal services, traffic ticket meaford, thornbury paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Meaford', areaServed: ['Meaford', 'Thornbury', 'Clarksburg', 'Grey County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Meaford', url: '/locations/meaford' }],
    faqs: [
      { question: 'Do you serve Meaford and Grey County?', answer: 'Yes, we serve Meaford, Thornbury, Clarksburg, Owen Sound, and all communities throughout Grey County.' },
      { question: 'Where is the nearest court for Meaford residents?', answer: 'The nearest court is the Owen Sound courthouse at 611 9th Avenue East.' },
      { question: 'Can you fight traffic tickets on Highway 26 and County Road 7?', answer: 'Yes, we defend traffic tickets issued on Highway 26 and County Road 7 and all roads throughout Grey County.' },
      { question: 'Do you offer virtual consultations for Meaford?', answer: 'Yes, phone and video consultations are available for all Grey County residents.' }
    ]
  },
  '/locations/mississippi-mills': {
    title: 'Mississippi Mills Paralegal | Legal Services Lanark County | Legal Assist',
    description: 'Licensed paralegal services in Mississippi Mills and Lanark County. Traffic ticket defence on Highway 7 and Highway 29, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal mississippi mills, mississippi mills lawyer, lanark county legal services, traffic ticket mississippi mills, almonte paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Mississippi Mills', areaServed: ['Almonte', 'Pakenham', 'Appleton', 'Lanark County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Mississippi Mills', url: '/locations/mississippi-mills' }],
    faqs: [
      { question: 'Do you serve Mississippi Mills and Lanark County?', answer: 'Yes, we serve Mississippi Mills, Almonte, Pakenham, Carleton Place, and all communities throughout Lanark County.' },
      { question: 'Where is the nearest court for Mississippi Mills residents?', answer: 'The nearest court is the Perth courthouse at 43 Drummond Street East.' },
      { question: 'Can you fight traffic tickets on Highway 7 and Highway 29?', answer: 'Yes, we defend traffic tickets issued on Highway 7 and Highway 29 and all roads throughout Lanark County.' },
      { question: 'Do you offer virtual consultations for Mississippi Mills?', answer: 'Yes, phone and video consultations are available for all Lanark County residents.' }
    ]
  },
  '/locations/mono': {
    title: 'Mono Paralegal | Legal Services Dufferin County | Legal Assist',
    description: 'Licensed paralegal services in Mono and Dufferin County. Traffic ticket defence on Highway 10 and Highway 89, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal mono, mono lawyer, dufferin county legal services, traffic ticket mono, orangeville paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Mono', areaServed: ['Mono', 'Orangeville', 'Shelburne', 'Dufferin County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Mono', url: '/locations/mono' }],
    faqs: [
      { question: 'Do you serve Mono and Dufferin County?', answer: 'Yes, we serve Mono, Orangeville, Shelburne, Grand Valley, and all communities throughout Dufferin County.' },
      { question: 'Where is the nearest court for Mono residents?', answer: 'The nearest court is the Orangeville courthouse at 10 Louisa Street.' },
      { question: 'Can you fight traffic tickets on Highway 10 and Highway 89?', answer: 'Yes, we defend traffic tickets issued on Highway 10 and Highway 89 and all roads throughout Dufferin County.' },
      { question: 'Do you offer virtual consultations for Mono?', answer: 'Yes, phone and video consultations are available for all Dufferin County residents.' }
    ]
  },
  '/locations/new-tecumseth': {
    title: 'New Tecumseth Paralegal | Legal Services Simcoe County | Legal Assist',
    description: 'Licensed paralegal services in New Tecumseth and Simcoe County. Traffic ticket defence on Highway 89 and Highway 400, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal new tecumseth, new tecumseth lawyer, simcoe county legal services, traffic ticket new tecumseth, alliston paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist New Tecumseth', areaServed: ['Alliston', 'Tottenham', 'Beeton', 'New Tecumseth', 'Simcoe County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'New Tecumseth', url: '/locations/new-tecumseth' }],
    faqs: [
      { question: 'Do you serve New Tecumseth and Simcoe County?', answer: 'Yes, we serve New Tecumseth, Alliston, Tottenham, Beeton, and all communities throughout Simcoe County.' },
      { question: 'Where is the nearest court for New Tecumseth residents?', answer: 'The nearest court is the Barrie courthouse at 75 Mulcaster Street.' },
      { question: 'Can you fight traffic tickets on Highway 89 and Highway 400?', answer: 'Yes, we defend traffic tickets issued on Highway 89 and Highway 400 and all roads throughout Simcoe County.' },
      { question: 'Do you offer virtual consultations for New Tecumseth?', answer: 'Yes, phone and video consultations are available for all Simcoe County residents.' }
    ]
  },
  '/locations/niagara-on-the-lake': {
    title: 'Niagara-on-the-Lake Paralegal | Legal Services Niagara Region | Legal Assist',
    description: 'Licensed paralegal services in Niagara-on-the-Lake and Niagara Region. Traffic ticket defence on Niagara Parkway and Highway 55, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal niagara on the lake, niagara on the lake lawyer, niagara region legal services, traffic ticket niagara on the lake, virgil paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Niagara-on-the-Lake', areaServed: ['Niagara-on-the-Lake', 'Virgil', 'St. Davids', 'Queenston', 'Niagara Region'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Niagara-on-the-Lake', url: '/locations/niagara-on-the-lake' }],
    faqs: [
      { question: 'Do you serve Niagara-on-the-Lake and Niagara Region?', answer: 'Yes, we serve Niagara-on-the-Lake, Virgil, St. Davids, Queenston, and all communities throughout Niagara Region.' },
      { question: 'Where is the nearest court for Niagara-on-the-Lake residents?', answer: 'The nearest court is the St. Catharines courthouse at 59 Church Street.' },
      { question: 'Can you fight traffic tickets on Niagara Parkway and Highway 55?', answer: 'Yes, we defend traffic tickets issued on Niagara Parkway and Highway 55 and all roads throughout Niagara Region.' },
      { question: 'Do you offer virtual consultations for Niagara-on-the-Lake?', answer: 'Yes, phone and video consultations are available for all Niagara Region residents.' }
    ]
  },
  '/locations/pelham': {
    title: 'Pelham Paralegal | Legal Services Niagara Region | Legal Assist',
    description: 'Licensed paralegal services in Pelham and Niagara Region. Traffic ticket defence on Highway 20 and Canboro Road, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal pelham, pelham lawyer, niagara region legal services, traffic ticket pelham, fonthill paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Pelham', areaServed: ['Fonthill', 'Fenwick', 'Ridgeville', 'Pelham', 'Niagara Region'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Pelham', url: '/locations/pelham' }],
    faqs: [
      { question: 'Do you serve Pelham and Niagara Region?', answer: 'Yes, we serve Pelham, Fonthill, Fenwick, Ridgeville, and all communities throughout Niagara Region.' },
      { question: 'Where is the nearest court for Pelham residents?', answer: 'The nearest court is the Welland courthouse at 102 East Main Street.' },
      { question: 'Can you fight traffic tickets on Highway 20 and Canboro Road?', answer: 'Yes, we defend traffic tickets issued on Highway 20 and Canboro Road and all roads throughout Niagara Region.' },
      { question: 'Do you offer virtual consultations for Pelham?', answer: 'Yes, phone and video consultations are available for all Niagara Region residents.' }
    ]
  },
  '/locations/penetanguishene': {
    title: 'Penetanguishene Paralegal | Legal Services Simcoe County | Legal Assist',
    description: 'Licensed paralegal services in Penetanguishene and Simcoe County. Traffic ticket defence on Highway 93 and Highway 12, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal penetanguishene, penetanguishene lawyer, simcoe county legal services, traffic ticket penetanguishene, midland paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Penetanguishene', areaServed: ['Penetanguishene', 'Midland', 'Tiny', 'North Simcoe'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Penetanguishene', url: '/locations/penetanguishene' }],
    faqs: [
      { question: 'Do you serve Penetanguishene and Simcoe County?', answer: 'Yes, we serve Penetanguishene, Midland, Tiny, Tay, and all communities throughout Simcoe County.' },
      { question: 'Where is the nearest court for Penetanguishene residents?', answer: 'The nearest court is the Barrie courthouse at 75 Mulcaster Street.' },
      { question: 'Can you fight traffic tickets on Highway 93 and Highway 12?', answer: 'Yes, we defend traffic tickets issued on Highway 93 and Highway 12 and all roads throughout Simcoe County.' },
      { question: 'Do you offer virtual consultations for Penetanguishene?', answer: 'Yes, phone and video consultations are available for all Simcoe County residents.' }
    ]
  },
  '/locations/petrolia': {
    title: 'Petrolia Paralegal | Legal Services Lambton County | Legal Assist',
    description: 'Licensed paralegal services in Petrolia and Lambton County. Traffic ticket defence on Highway 21 and County Road 4, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal petrolia, petrolia lawyer, lambton county legal services, traffic ticket petrolia, wyoming paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Petrolia', areaServed: ['Petrolia', 'Wyoming', 'Oil Springs', 'Lambton County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Petrolia', url: '/locations/petrolia' }],
    faqs: [
      { question: 'Do you serve Petrolia and Lambton County?', answer: 'Yes, we serve Petrolia, Wyoming, Oil Springs, Watford, and all communities throughout Lambton County.' },
      { question: 'Where is the nearest court for Petrolia residents?', answer: 'The nearest court is the Sarnia courthouse at 700 North Christina Street.' },
      { question: 'Can you fight traffic tickets on Highway 21 and County Road 4?', answer: 'Yes, we defend traffic tickets issued on Highway 21 and County Road 4 and all roads throughout Lambton County.' },
      { question: 'Do you offer virtual consultations for Petrolia?', answer: 'Yes, phone and video consultations are available for all Lambton County residents.' }
    ]
  },
  '/locations/plympton-wyoming': {
    title: 'Plympton-Wyoming Paralegal | Legal Services Lambton County | Legal Assist',
    description: 'Licensed paralegal services in Plympton-Wyoming and Lambton County. Traffic ticket defence on Highway 21 and Highway 402, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal plympton wyoming, plympton wyoming lawyer, lambton county legal services, traffic ticket plympton wyoming, wyoming paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Plympton-Wyoming', areaServed: ['Wyoming', 'Camlachie', 'Plympton-Wyoming', 'Lambton County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Plympton-Wyoming', url: '/locations/plympton-wyoming' }],
    faqs: [
      { question: 'Do you serve Plympton-Wyoming and Lambton County?', answer: 'Yes, we serve Plympton-Wyoming, Wyoming, Camlachie, Forest, and all communities throughout Lambton County.' },
      { question: 'Where is the nearest court for Plympton-Wyoming residents?', answer: 'The nearest court is the Sarnia courthouse at 700 North Christina Street.' },
      { question: 'Can you fight traffic tickets on Highway 21 and Highway 402?', answer: 'Yes, we defend traffic tickets issued on Highway 21 and Highway 402 and all roads throughout Lambton County.' },
      { question: 'Do you offer virtual consultations for Plympton-Wyoming?', answer: 'Yes, phone and video consultations are available for all Lambton County residents.' }
    ]
  },
  '/locations/prescott': {
    title: 'Prescott Paralegal | Legal Services Leeds and Grenville | Legal Assist',
    description: 'Licensed paralegal services in Prescott and Leeds and Grenville. Traffic ticket defence on Highway 401 and Highway 2, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal prescott, prescott lawyer, leeds and grenville legal services, traffic ticket prescott, cardinal paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Prescott', areaServed: ['Prescott', 'Cardinal', 'Brockville', 'Leeds and Grenville'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Prescott', url: '/locations/prescott' }],
    faqs: [
      { question: 'Do you serve Prescott and Leeds and Grenville?', answer: 'Yes, we serve Prescott, Cardinal, Brockville, Spencerville, and all communities throughout Leeds and Grenville.' },
      { question: 'Where is the nearest court for Prescott residents?', answer: 'The nearest court is the Brockville courthouse at 7 Buell Street.' },
      { question: 'Can you fight traffic tickets on Highway 401 and Highway 2?', answer: 'Yes, we defend traffic tickets issued on Highway 401 and Highway 2 and all roads throughout Leeds and Grenville.' },
      { question: 'Do you offer virtual consultations for Prescott?', answer: 'Yes, phone and video consultations are available for all Leeds and Grenville residents.' }
    ]
  },
  '/locations/renfrew': {
    title: 'Renfrew Paralegal | Legal Services Renfrew County | Legal Assist',
    description: 'Licensed paralegal services in Renfrew and Renfrew County. Traffic ticket defence on Highway 17 and Highway 132, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal renfrew, renfrew lawyer, renfrew county legal services, traffic ticket renfrew, arnprior paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Renfrew', areaServed: ['Renfrew', 'Arnprior', 'Pembroke', 'Renfrew County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Renfrew', url: '/locations/renfrew' }],
    faqs: [
      { question: 'Do you serve Renfrew and Renfrew County?', answer: 'Yes, we serve Renfrew, Arnprior, Pembroke, Cobden, and all communities throughout Renfrew County.' },
      { question: 'Where is the nearest court for Renfrew residents?', answer: 'The nearest court is the Pembroke courthouse at 297 Pembroke Street East.' },
      { question: 'Can you fight traffic tickets on Highway 17 and Highway 132?', answer: 'Yes, we defend traffic tickets issued on Highway 17 and Highway 132 and all roads throughout Renfrew County.' },
      { question: 'Do you offer virtual consultations for Renfrew?', answer: 'Yes, phone and video consultations are available for all Renfrew County residents.' }
    ]
  },
  '/locations/saugeen-shores': {
    title: 'Saugeen Shores Paralegal | Legal Services Bruce County | Legal Assist',
    description: 'Licensed paralegal services in Saugeen Shores and Bruce County. Traffic ticket defence on Highway 21 and Highway 9, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal saugeen shores, saugeen shores lawyer, bruce county legal services, traffic ticket saugeen shores, port elgin paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Saugeen Shores', areaServed: ['Port Elgin', 'Southampton', 'Saugeen Shores', 'Bruce County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Saugeen Shores', url: '/locations/saugeen-shores' }],
    faqs: [
      { question: 'Do you serve Saugeen Shores and Bruce County?', answer: 'Yes, we serve Saugeen Shores, Port Elgin, Southampton, Paisley, and all communities throughout Bruce County.' },
      { question: 'Where is the nearest court for Saugeen Shores residents?', answer: 'The nearest court is the Walkerton courthouse.' },
      { question: 'Can you fight traffic tickets on Highway 21 and Highway 9?', answer: 'Yes, we defend traffic tickets issued on Highway 21 and Highway 9 and all roads throughout Bruce County.' },
      { question: 'Do you offer virtual consultations for Saugeen Shores?', answer: 'Yes, phone and video consultations are available for all Bruce County residents.' }
    ]
  },
  '/locations/shelburne': {
    title: 'Shelburne Paralegal | Legal Services Dufferin County | Legal Assist',
    description: 'Licensed paralegal services in Shelburne and Dufferin County. Traffic ticket defence on Highway 10 and Highway 89, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal shelburne, shelburne lawyer, dufferin county legal services, traffic ticket shelburne, orangeville paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Shelburne', areaServed: ['Shelburne', 'Orangeville', 'Grand Valley', 'Dufferin County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Shelburne', url: '/locations/shelburne' }],
    faqs: [
      { question: 'Do you serve Shelburne and Dufferin County?', answer: 'Yes, we serve Shelburne, Orangeville, Grand Valley, Dundalk, and all communities throughout Dufferin County.' },
      { question: 'Where is the nearest court for Shelburne residents?', answer: 'The nearest court is the Orangeville courthouse at 10 Louisa Street.' },
      { question: 'Can you fight traffic tickets on Highway 10 and Highway 89?', answer: 'Yes, we defend traffic tickets issued on Highway 10 and Highway 89 and all roads throughout Dufferin County.' },
      { question: 'Do you offer virtual consultations for Shelburne?', answer: 'Yes, phone and video consultations are available for all Dufferin County residents.' }
    ]
  },
  '/locations/sioux-lookout': {
    title: 'Sioux Lookout Paralegal | Legal Services Kenora District | Legal Assist',
    description: 'Licensed paralegal services in Sioux Lookout and Kenora District. Traffic ticket defence on Highway 72 and Highway 664, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal sioux lookout, sioux lookout lawyer, kenora district legal services, traffic ticket sioux lookout, hudson paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Sioux Lookout', areaServed: ['Sioux Lookout', 'Hudson', 'Kenora District'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Sioux Lookout', url: '/locations/sioux-lookout' }],
    faqs: [
      { question: 'Do you serve Sioux Lookout and Kenora District?', answer: 'Yes, we serve Sioux Lookout, Hudson, Kenora, Dryden, and all communities throughout Kenora District.' },
      { question: 'Where is the nearest court for Sioux Lookout residents?', answer: 'The nearest court is the Sioux Lookout courthouse.' },
      { question: 'Can you fight traffic tickets on Highway 72 and Highway 664?', answer: 'Yes, we defend traffic tickets issued on Highway 72 and Highway 664 and all roads throughout Kenora District.' },
      { question: 'Do you offer virtual consultations for Sioux Lookout?', answer: 'Yes, phone and video consultations are available for all Kenora District residents.' }
    ]
  },
  '/locations/south-bruce-peninsula': {
    title: 'South Bruce Peninsula Paralegal | Legal Services Bruce County | Legal Assist',
    description: 'Licensed paralegal services in South Bruce Peninsula and Bruce County. Traffic ticket defence on Highway 6 and Highway 21, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal south bruce peninsula, south bruce peninsula lawyer, bruce county legal services, traffic ticket south bruce peninsula, wiarton paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist South Bruce Peninsula', areaServed: ['Wiarton', 'Sauble Beach', 'Hepworth', 'South Bruce Peninsula'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'South Bruce Peninsula', url: '/locations/south-bruce-peninsula' }],
    faqs: [
      { question: 'Do you serve South Bruce Peninsula and Bruce County?', answer: 'Yes, we serve South Bruce Peninsula, Wiarton, Sauble Beach, Hepworth, and all communities throughout Bruce County.' },
      { question: 'Where is the nearest court for South Bruce Peninsula residents?', answer: 'The nearest court is the Owen Sound courthouse at 611 9th Avenue East.' },
      { question: 'Can you fight traffic tickets on Highway 6 and Highway 21?', answer: 'Yes, we defend traffic tickets issued on Highway 6 and Highway 21 and all roads throughout Bruce County.' },
      { question: 'Do you offer virtual consultations for South Bruce Peninsula?', answer: 'Yes, phone and video consultations are available for all Bruce County residents.' }
    ]
  },
  '/locations/st-marys': {
    title: 'St. Marys Paralegal | Legal Services Perth County | Legal Assist',
    description: 'Licensed paralegal services in St. Marys and Perth County. Traffic ticket defence on Highway 7 and Highway 19, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal st marys, st marys lawyer, perth county legal services, traffic ticket st marys, stratford paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist St. Marys', areaServed: ['St. Marys', 'Stratford', 'Mitchell', 'Perth County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'St. Marys', url: '/locations/st-marys' }],
    faqs: [
      { question: 'Do you serve St. Marys and Perth County?', answer: 'Yes, we serve St. Marys, Stratford, Mitchell, Exeter, and all communities throughout Perth County.' },
      { question: 'Where is the nearest court for St. Marys residents?', answer: 'The nearest court is the Stratford courthouse at 1 Huron Street.' },
      { question: 'Can you fight traffic tickets on Highway 7 and Highway 19?', answer: 'Yes, we defend traffic tickets issued on Highway 7 and Highway 19 and all roads throughout Perth County.' },
      { question: 'Do you offer virtual consultations for St. Marys?', answer: 'Yes, phone and video consultations are available for all Perth County residents.' }
    ]
  },
  '/locations/tecumseh': {
    title: 'Tecumseh Paralegal | Legal Services Essex County | Legal Assist',
    description: 'Licensed paralegal services in Tecumseh and Essex County. Traffic ticket defence on Manning Road and County Road 22, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal tecumseh, tecumseh lawyer, essex county legal services, traffic ticket tecumseh, maidstone paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Tecumseh', areaServed: ['Tecumseh', 'Maidstone', 'St. Clair Beach', 'Essex County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Tecumseh', url: '/locations/tecumseh' }],
    faqs: [
      { question: 'Do you serve Tecumseh and Essex County?', answer: 'Yes, we serve Tecumseh, Maidstone, St. Clair Beach, Windsor, and all communities throughout Essex County.' },
      { question: 'Where is the nearest court for Tecumseh residents?', answer: 'The nearest court is the Windsor courthouse at 245 Windsor Avenue.' },
      { question: 'Can you fight traffic tickets on Manning Road and County Road 22?', answer: 'Yes, we defend traffic tickets issued on Manning Road and County Road 22 and all roads throughout Essex County.' },
      { question: 'Do you offer virtual consultations for Tecumseh?', answer: 'Yes, phone and video consultations are available for all Essex County residents.' }
    ]
  },
  '/locations/blue-mountains': {
    title: 'The Blue Mountains Paralegal | Legal Services Grey County | Legal Assist',
    description: 'Licensed paralegal services in The Blue Mountains and Grey County. Traffic ticket defence on Highway 26 and Grey Road 19, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal blue mountains, blue mountains lawyer, grey county legal services, traffic ticket blue mountains, thornbury paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist The Blue Mountains', areaServed: ['Thornbury', 'Clarksburg', 'Craigleith', 'The Blue Mountains', 'Grey County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'The Blue Mountains', url: '/locations/blue-mountains' }],
    faqs: [
      { question: 'Do you serve The Blue Mountains and Grey County?', answer: 'Yes, we serve The Blue Mountains, Thornbury, Clarksburg, Collingwood, and all communities throughout Grey County.' },
      { question: 'Where is the nearest court for The Blue Mountains residents?', answer: 'The nearest court is the Owen Sound courthouse at 611 9th Avenue East.' },
      { question: 'Can you fight traffic tickets on Highway 26 and Grey Road 19?', answer: 'Yes, we defend traffic tickets issued on Highway 26 and Grey Road 19 and all roads throughout Grey County.' },
      { question: 'Do you offer virtual consultations for The Blue Mountains?', answer: 'Yes, phone and video consultations are available for all Grey County residents.' }
    ]
  },
  '/locations/brighton': {
    title: 'Brighton Paralegal | Legal Services Northumberland County | Legal Assist',
    description: 'Licensed paralegal services in Brighton and Northumberland County. Traffic ticket defence on Highway 401 and Highway 2, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal brighton, brighton lawyer, northumberland county legal services, traffic ticket brighton, trenton paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Brighton', areaServed: ['Brighton', 'Presqu\'ile', 'Smithfield', 'Northumberland County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Brighton', url: '/locations/brighton' }],
    faqs: [
      { question: 'Do you serve Brighton and Northumberland County?', answer: 'Yes, we serve Brighton, Trenton, Cobourg, Smithfield, and all communities throughout Northumberland County.' },
      { question: 'Where is the nearest court for Brighton residents?', answer: 'The nearest court is the Cobourg courthouse at 860 William Street.' },
      { question: 'Can you fight traffic tickets on Highway 401 and Highway 2?', answer: 'Yes, we defend traffic tickets issued on Highway 401 and Highway 2 and all roads throughout Northumberland County.' },
      { question: 'Do you offer virtual consultations for Brighton?', answer: 'Yes, phone and video consultations are available for all Northumberland County residents.' }
    ]
  },
  '/locations/port-hope': {
    title: 'Port Hope Paralegal | Legal Services Northumberland County | Legal Assist',
    description: 'Licensed paralegal services in Port Hope and Northumberland County. Traffic ticket defence on Highway 401 and Highway 2, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal port hope, port hope lawyer, northumberland county legal services, traffic ticket port hope, cobourg paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Port Hope', areaServed: ['Port Hope', 'Cobourg', 'Northumberland County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Port Hope', url: '/locations/port-hope' }],
    faqs: [
      { question: 'Do you serve Port Hope and Northumberland County?', answer: 'Yes, we serve Port Hope, Cobourg, Campbellford, Bowmanville, and all communities throughout Northumberland County.' },
      { question: 'Where is the nearest court for Port Hope residents?', answer: 'The nearest court is the Cobourg courthouse at 860 William Street.' },
      { question: 'Can you fight traffic tickets on Highway 401 and Highway 2?', answer: 'Yes, we defend traffic tickets issued on Highway 401 and Highway 2 and all roads throughout Northumberland County.' },
      { question: 'Do you offer virtual consultations for Port Hope?', answer: 'Yes, phone and video consultations are available for all Northumberland County residents.' }
    ]
  },
  '/locations/kemptville': {
    title: 'Kemptville Paralegal | Legal Services Leeds and Grenville | Legal Assist',
    description: 'Licensed paralegal services in Kemptville and Leeds and Grenville. Traffic ticket defence on Highway 416 and Highway 43, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal kemptville, kemptville lawyer, leeds and grenville legal services, traffic ticket kemptville, oxford mills paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Kemptville', areaServed: ['Kemptville', 'North Grenville', 'Oxford Mills', 'Merrickville'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Kemptville', url: '/locations/kemptville' }],
    faqs: [
      { question: 'Do you serve Kemptville and Leeds and Grenville?', answer: 'Yes, we serve Kemptville, Oxford Mills, Merrickville, Smiths Falls, and all communities throughout Leeds and Grenville.' },
      { question: 'Where is the nearest court for Kemptville residents?', answer: 'The nearest court is the Brockville courthouse at 7 Buell Street.' },
      { question: 'Can you fight traffic tickets on Highway 416 and Highway 43?', answer: 'Yes, we defend traffic tickets issued on Highway 416 and Highway 43 and all roads throughout Leeds and Grenville.' },
      { question: 'Do you offer virtual consultations for Kemptville?', answer: 'Yes, phone and video consultations are available for all Leeds and Grenville residents.' }
    ]
  },
  '/locations/uxbridge': {
    title: 'Uxbridge Paralegal | Legal Services Durham Region | Legal Assist',
    description: 'Licensed paralegal services in Uxbridge and Durham Region. Traffic ticket defence on Highway 47 and Highway 12, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal uxbridge, uxbridge lawyer, durham region legal services, traffic ticket uxbridge, port perry paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Uxbridge', areaServed: ['Uxbridge', 'Port Perry', 'Durham Region'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Uxbridge', url: '/locations/uxbridge' }],
    faqs: [
      { question: 'Do you serve Uxbridge and Durham Region?', answer: 'Yes, we serve Uxbridge, Port Perry, Stouffville, Brooklin, and all communities throughout Durham Region.' },
      { question: 'Where is the nearest court for Uxbridge residents?', answer: 'The nearest court is the Oshawa courthouse at 150 Bond Street East.' },
      { question: 'Can you fight traffic tickets on Highway 47 and Highway 12?', answer: 'Yes, we defend traffic tickets issued on Highway 47 and Highway 12 and all roads throughout Durham Region.' },
      { question: 'Do you offer virtual consultations for Uxbridge?', answer: 'Yes, phone and video consultations are available for all Durham Region residents.' }
    ]
  },
  '/locations/scugog': {
    title: 'Scugog Paralegal | Legal Services Durham Region | Legal Assist',
    description: 'Licensed paralegal services in Scugog and Durham Region. Traffic ticket defence on Highway 7A and Highway 12, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal scugog, scugog lawyer, durham region legal services, traffic ticket scugog, port perry paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Scugog', areaServed: ['Port Perry', 'Blackstock', 'Caesarea', 'Scugog', 'Durham Region'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Scugog', url: '/locations/scugog' }],
    faqs: [
      { question: 'Do you serve Scugog and Durham Region?', answer: 'Yes, we serve Scugog, Port Perry, Blackstock, Uxbridge, and all communities throughout Durham Region.' },
      { question: 'Where is the nearest court for Scugog residents?', answer: 'The nearest court is the Oshawa courthouse at 150 Bond Street East.' },
      { question: 'Can you fight traffic tickets on Highway 7A and Highway 12?', answer: 'Yes, we defend traffic tickets issued on Highway 7A and Highway 12 and all roads throughout Durham Region.' },
      { question: 'Do you offer virtual consultations for Scugog?', answer: 'Yes, phone and video consultations are available for all Durham Region residents.' }
    ]
  },
  '/locations/king': {
    title: 'King Paralegal | Legal Services York Region | Legal Assist',
    description: 'Licensed paralegal services in King and York Region. Traffic ticket defence on Highway 400 and King Road, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal king, king lawyer, york region legal services, traffic ticket king, king city paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist King', areaServed: ['King City', 'Nobleton', 'Schomberg', 'Kettleby', 'King Township'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'King', url: '/locations/king' }],
    faqs: [
      { question: 'Do you serve King and York Region?', answer: 'Yes, we serve King, King City, Nobleton, Schomberg, and all communities throughout York Region.' },
      { question: 'Where is the nearest court for King residents?', answer: 'The nearest court is the Newmarket courthouse at 50 Eagle Street West.' },
      { question: 'Can you fight traffic tickets on Highway 400 and King Road?', answer: 'Yes, we defend traffic tickets issued on Highway 400 and King Road and all roads throughout York Region.' },
      { question: 'Do you offer virtual consultations for King?', answer: 'Yes, phone and video consultations are available for all York Region residents.' }
    ]
  },
  '/locations/oro-medonte': {
    title: 'Oro-Medonte Paralegal | Legal Services Simcoe County | Legal Assist',
    description: 'Licensed paralegal services in Oro-Medonte and Simcoe County. Traffic ticket defence on Highway 11 and Highway 93, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal oro medonte, oro medonte lawyer, simcoe county legal services, traffic ticket oro medonte, hawkestone paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Oro-Medonte', areaServed: ['Oro-Medonte', 'Hawkestone', 'Shanty Bay', 'Moonstone', 'Simcoe County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Oro-Medonte', url: '/locations/oro-medonte' }],
    faqs: [
      { question: 'Do you serve Oro-Medonte and Simcoe County?', answer: 'Yes, we serve Oro-Medonte, Hawkestone, Shanty Bay, Craighurst, and all communities throughout Simcoe County.' },
      { question: 'Where is the nearest court for Oro-Medonte residents?', answer: 'The nearest court is the Barrie courthouse at 75 Mulcaster Street.' },
      { question: 'Can you fight traffic tickets on Highway 11 and Highway 93?', answer: 'Yes, we defend traffic tickets issued on Highway 11 and Highway 93 and all roads throughout Simcoe County.' },
      { question: 'Do you offer virtual consultations for Oro-Medonte?', answer: 'Yes, phone and video consultations are available for all Simcoe County residents.' }
    ]
  },
  '/locations/clearview': {
    title: 'Clearview Paralegal | Legal Services Simcoe County | Legal Assist',
    description: 'Licensed paralegal services in Clearview and Simcoe County. Traffic ticket defence on Highway 26 and Highway 91, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal clearview, clearview lawyer, simcoe county legal services, traffic ticket clearview, stayner paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Clearview', areaServed: ['Stayner', 'Creemore', 'Nottawa', 'Clearview', 'Simcoe County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Clearview', url: '/locations/clearview' }],
    faqs: [
      { question: 'Do you serve Clearview and Simcoe County?', answer: 'Yes, we serve Clearview, Stayner, Creemore, Nottawa, and all communities throughout Simcoe County.' },
      { question: 'Where is the nearest court for Clearview residents?', answer: 'The nearest court is the Barrie courthouse at 75 Mulcaster Street.' },
      { question: 'Can you fight traffic tickets on Highway 26 and Highway 91?', answer: 'Yes, we defend traffic tickets issued on Highway 26 and Highway 91 and all roads throughout Simcoe County.' },
      { question: 'Do you offer virtual consultations for Clearview?', answer: 'Yes, phone and video consultations are available for all Simcoe County residents.' }
    ]
  },
  '/locations/severn': {
    title: 'Severn Paralegal | Legal Services Simcoe County | Legal Assist',
    description: 'Licensed paralegal services in Severn and Simcoe County. Traffic ticket defence on Highway 11 and Highway 12, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal severn, severn lawyer, simcoe county legal services, traffic ticket severn, washago paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Severn', areaServed: ['Washago', 'Coldwater', 'Severn Bridge', 'Severn', 'Simcoe County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Severn', url: '/locations/severn' }],
    faqs: [
      { question: 'Do you serve Severn and Simcoe County?', answer: 'Yes, we serve Severn, Washago, Coldwater, Orillia, and all communities throughout Simcoe County.' },
      { question: 'Where is the nearest court for Severn residents?', answer: 'The nearest court is the Barrie courthouse at 75 Mulcaster Street.' },
      { question: 'Can you fight traffic tickets on Highway 11 and Highway 12?', answer: 'Yes, we defend traffic tickets issued on Highway 11 and Highway 12 and all roads throughout Simcoe County.' },
      { question: 'Do you offer virtual consultations for Severn?', answer: 'Yes, phone and video consultations are available for all Simcoe County residents.' }
    ]
  },
  '/locations/trent-hills': {
    title: 'Trent Hills Paralegal | Legal Services Northumberland County | Legal Assist',
    description: 'Licensed paralegal services in Trent Hills and Northumberland County. Traffic ticket defence on Highway 30 and Highway 45, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal trent hills, trent hills lawyer, northumberland county legal services, traffic ticket trent hills, campbellford paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Trent Hills', areaServed: ['Campbellford', 'Hastings', 'Warkworth', 'Trent Hills'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Trent Hills', url: '/locations/trent-hills' }],
    faqs: [
      { question: 'Do you serve Trent Hills and Northumberland County?', answer: 'Yes, we serve Trent Hills, Campbellford, Hastings, Warkworth, and all communities throughout Northumberland County.' },
      { question: 'Where is the nearest court for Trent Hills residents?', answer: 'The nearest court is the Cobourg courthouse at 860 William Street.' },
      { question: 'Can you fight traffic tickets on Highway 30 and Highway 45?', answer: 'Yes, we defend traffic tickets issued on Highway 30 and Highway 45 and all roads throughout Northumberland County.' },
      { question: 'Do you offer virtual consultations for Trent Hills?', answer: 'Yes, phone and video consultations are available for all Northumberland County residents.' }
    ]
  },
  '/locations/norwich': {
    title: 'Norwich Paralegal | Legal Services Oxford County | Legal Assist',
    description: 'Licensed paralegal services in Norwich and Oxford County. Traffic ticket defence on Highway 59 and Highway 19, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal norwich, norwich lawyer, oxford county legal services, traffic ticket norwich, otterville paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Norwich', areaServed: ['Norwich', 'Otterville', 'Oxford County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Norwich', url: '/locations/norwich' }],
    faqs: [
      { question: 'Do you serve Norwich and Oxford County?', answer: 'Yes, we serve Norwich, Otterville, Tillsonburg, Woodstock, and all communities throughout Oxford County.' },
      { question: 'Where is the nearest court for Norwich residents?', answer: 'The nearest court is the Woodstock courthouse at 415 Hunter Street.' },
      { question: 'Can you fight traffic tickets on Highway 59 and Highway 19?', answer: 'Yes, we defend traffic tickets issued on Highway 59 and Highway 19 and all roads throughout Oxford County.' },
      { question: 'Do you offer virtual consultations for Norwich?', answer: 'Yes, phone and video consultations are available for all Oxford County residents.' }
    ]
  },
  '/locations/west-lincoln': {
    title: 'West Lincoln Paralegal | Legal Services Niagara Region | Legal Assist',
    description: 'Licensed paralegal services in West Lincoln and Niagara Region. Traffic ticket defence on Highway 20 and Regional Road 14, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal west lincoln, west lincoln lawyer, niagara region legal services, traffic ticket west lincoln, smithville paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist West Lincoln', areaServed: ['Smithville', 'Grimsby', 'West Lincoln', 'Niagara Region'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'West Lincoln', url: '/locations/west-lincoln' }],
    faqs: [
      { question: 'Do you serve West Lincoln and Niagara Region?', answer: 'Yes, we serve West Lincoln, Smithville, Grimsby, Beamsville, and all communities throughout Niagara Region.' },
      { question: 'Where is the nearest court for West Lincoln residents?', answer: 'The nearest court is the Welland courthouse at 102 East Main Street.' },
      { question: 'Can you fight traffic tickets on Highway 20 and Regional Road 14?', answer: 'Yes, we defend traffic tickets issued on Highway 20 and Regional Road 14 and all roads throughout Niagara Region.' },
      { question: 'Do you offer virtual consultations for West Lincoln?', answer: 'Yes, phone and video consultations are available for all Niagara Region residents.' }
    ]
  },
  '/locations/woolwich': {
    title: 'Woolwich Paralegal | Legal Services Waterloo Region | Legal Assist',
    description: 'Licensed paralegal services in Woolwich and Waterloo Region. Traffic ticket defence on Highway 85 and Arthur Street, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal woolwich, woolwich lawyer, waterloo region legal services, traffic ticket woolwich, elmira paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Woolwich', areaServed: ['Elmira', 'St. Jacobs', 'Breslau', 'Woolwich', 'Waterloo Region'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Woolwich', url: '/locations/woolwich' }],
    faqs: [
      { question: 'Do you serve Woolwich and Waterloo Region?', answer: 'Yes, we serve Woolwich, Elmira, St. Jacobs, Breslau, and all communities throughout Waterloo Region.' },
      { question: 'Where is the nearest court for Woolwich residents?', answer: 'The nearest court is the Kitchener courthouse at 200 Frederick Street.' },
      { question: 'Can you fight traffic tickets on Highway 85 and Arthur Street?', answer: 'Yes, we defend traffic tickets issued on Highway 85 and Arthur Street and all roads throughout Waterloo Region.' },
      { question: 'Do you offer virtual consultations for Woolwich?', answer: 'Yes, phone and video consultations are available for all Waterloo Region residents.' }
    ]
  },
  '/locations/wilmot': {
    title: 'Wilmot Paralegal | Legal Services Waterloo Region | Legal Assist',
    description: 'Licensed paralegal services in Wilmot and Waterloo Region. Traffic ticket defence on Highway 7/8 and Nafziger Road, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal wilmot, wilmot lawyer, waterloo region legal services, traffic ticket wilmot, new hamburg paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Wilmot', areaServed: ['New Hamburg', 'Baden', 'Wilmot', 'Waterloo Region'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Wilmot', url: '/locations/wilmot' }],
    faqs: [
      { question: 'Do you serve Wilmot and Waterloo Region?', answer: 'Yes, we serve Wilmot, New Hamburg, Baden, Wellesley, and all communities throughout Waterloo Region.' },
      { question: 'Where is the nearest court for Wilmot residents?', answer: 'The nearest court is the Kitchener courthouse at 200 Frederick Street.' },
      { question: 'Can you fight traffic tickets on Highway 7/8 and Nafziger Road?', answer: 'Yes, we defend traffic tickets issued on Highway 7/8 and Nafziger Road and all roads throughout Waterloo Region.' },
      { question: 'Do you offer virtual consultations for Wilmot?', answer: 'Yes, phone and video consultations are available for all Waterloo Region residents.' }
    ]
  },
  '/locations/north-dumfries': {
    title: 'North Dumfries Paralegal | Legal Services Waterloo Region | Legal Assist',
    description: 'Licensed paralegal services in North Dumfries and Waterloo Region. Traffic ticket defence on Highway 401 and Fountain Street, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal north dumfries, north dumfries lawyer, waterloo region legal services, traffic ticket north dumfries, ayr paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist North Dumfries', areaServed: ['Ayr', 'North Dumfries', 'Waterloo Region'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'North Dumfries', url: '/locations/north-dumfries' }],
    faqs: [
      { question: 'Do you serve North Dumfries and Waterloo Region?', answer: 'Yes, we serve North Dumfries, Ayr, Cambridge, Paris, and all communities throughout Waterloo Region.' },
      { question: 'Where is the nearest court for North Dumfries residents?', answer: 'The nearest court is the Kitchener courthouse at 200 Frederick Street.' },
      { question: 'Can you fight traffic tickets on Highway 401 and Fountain Street?', answer: 'Yes, we defend traffic tickets issued on Highway 401 and Fountain Street and all roads throughout Waterloo Region.' },
      { question: 'Do you offer virtual consultations for North Dumfries?', answer: 'Yes, phone and video consultations are available for all Waterloo Region residents.' }
    ]
  },
  '/locations/centre-wellington': {
    title: 'Centre Wellington Paralegal | Legal Services Wellington County | Legal Assist',
    description: 'Licensed paralegal services in Centre Wellington and Wellington County. Traffic ticket defence on Highway 6 and Highway 7, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal centre wellington, centre wellington lawyer, wellington county legal services, traffic ticket centre wellington, fergus paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Centre Wellington', areaServed: ['Fergus', 'Elora', 'Salem', 'Centre Wellington', 'Wellington County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Centre Wellington', url: '/locations/centre-wellington' }],
    faqs: [
      { question: 'Do you serve Centre Wellington and Wellington County?', answer: 'Yes, we serve Centre Wellington, Fergus, Elora, Arthur, and all communities throughout Wellington County.' },
      { question: 'Where is the nearest court for Centre Wellington residents?', answer: 'The nearest court is the Guelph courthouse at 74 Woolwich Street.' },
      { question: 'Can you fight traffic tickets on Highway 6 and Highway 7?', answer: 'Yes, we defend traffic tickets issued on Highway 6 and Highway 7 and all roads throughout Wellington County.' },
      { question: 'Do you offer virtual consultations for Centre Wellington?', answer: 'Yes, phone and video consultations are available for all Wellington County residents.' }
    ]
  },
  '/locations/mapleton': {
    title: 'Mapleton Paralegal | Legal Services Wellington County | Legal Assist',
    description: 'Licensed paralegal services in Mapleton and Wellington County. Traffic ticket defence on Highway 6 and Wellington Road 7, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal mapleton, mapleton lawyer, wellington county legal services, traffic ticket mapleton, drayton paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Mapleton', areaServed: ['Drayton', 'Moorefield', 'Alma', 'Mapleton', 'Wellington County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Mapleton', url: '/locations/mapleton' }],
    faqs: [
      { question: 'Do you serve Mapleton and Wellington County?', answer: 'Yes, we serve Mapleton, Drayton, Moorefield, Alma, and all communities throughout Wellington County.' },
      { question: 'Where is the nearest court for Mapleton residents?', answer: 'The nearest court is the Guelph courthouse at 74 Woolwich Street.' },
      { question: 'Can you fight traffic tickets on Highway 6 and Wellington Road 7?', answer: 'Yes, we defend traffic tickets issued on Highway 6 and Wellington Road 7 and all roads throughout Wellington County.' },
      { question: 'Do you offer virtual consultations for Mapleton?', answer: 'Yes, phone and video consultations are available for all Wellington County residents.' }
    ]
  },
  '/locations/wellesley': {
    title: 'Wellesley Paralegal | Legal Services Waterloo Region | Legal Assist',
    description: 'Licensed paralegal services in Wellesley and Waterloo Region. Traffic ticket defence on Lobsinger Line and Ament Line, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal wellesley, wellesley lawyer, waterloo region legal services, traffic ticket wellesley, st. clements paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Wellesley', areaServed: ['Wellesley', 'St. Clements', 'Linwood', 'Crosshill', 'Waterloo Region'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Wellesley', url: '/locations/wellesley' }],
    faqs: [
      { question: 'Do you serve Wellesley and Waterloo Region?', answer: 'Yes, we serve Wellesley, St. Clements, Linwood, Heidelberg, and all communities throughout Waterloo Region.' },
      { question: 'Where is the nearest court for Wellesley residents?', answer: 'The nearest court is the Kitchener courthouse at 200 Frederick Street.' },
      { question: 'Can you fight traffic tickets on Lobsinger Line and Ament Line?', answer: 'Yes, we defend traffic tickets issued on Lobsinger Line and Ament Line and all roads throughout Waterloo Region.' },
      { question: 'Do you offer virtual consultations for Wellesley?', answer: 'Yes, phone and video consultations are available for all Waterloo Region residents.' }
    ]
  },
  '/locations/west-grey': {
    title: 'West Grey Paralegal | Legal Services Grey County | Legal Assist',
    description: 'Licensed paralegal services in West Grey and Grey County. Traffic ticket defence on Highway 4 and Highway 6, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal west grey, west grey lawyer, grey county legal services, traffic ticket west grey, durham paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist West Grey', areaServed: ['Durham', 'Neustadt', 'Ayton', 'West Grey', 'Grey County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'West Grey', url: '/locations/west-grey' }],
    faqs: [
      { question: 'Do you serve West Grey and Grey County?', answer: 'Yes, we serve West Grey, Durham, Neustadt, Ayton, and all communities throughout Grey County.' },
      { question: 'Where is the nearest court for West Grey residents?', answer: 'The nearest court is the Owen Sound courthouse at 611 9th Avenue East.' },
      { question: 'Can you fight traffic tickets on Highway 4 and Highway 6?', answer: 'Yes, we defend traffic tickets issued on Highway 4 and Highway 6 and all roads throughout Grey County.' },
      { question: 'Do you offer virtual consultations for West Grey?', answer: 'Yes, phone and video consultations are available for all Grey County residents.' }
    ]
  },
  '/locations/brockton': {
    title: 'Brockton Paralegal | Legal Services Bruce County | Legal Assist',
    description: 'Licensed paralegal services in Brockton and Bruce County. Traffic ticket defence on Highway 4 and Highway 9, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal brockton, brockton lawyer, bruce county legal services, traffic ticket brockton, walkerton paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Brockton', areaServed: ['Walkerton', 'Cargill', 'Elmwood', 'Brockton', 'Bruce County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Brockton', url: '/locations/brockton' }],
    faqs: [
      { question: 'Do you serve Brockton and Bruce County?', answer: 'Yes, we serve Brockton, Walkerton, Cargill, Elmwood, and all communities throughout Bruce County.' },
      { question: 'Where is the nearest court for Brockton residents?', answer: 'The nearest court is the Walkerton courthouse.' },
      { question: 'Can you fight traffic tickets on Highway 4 and Highway 9?', answer: 'Yes, we defend traffic tickets issued on Highway 4 and Highway 9 and all roads throughout Bruce County.' },
      { question: 'Do you offer virtual consultations for Brockton?', answer: 'Yes, phone and video consultations are available for all Bruce County residents.' }
    ]
  },
  '/locations/south-huron': {
    title: 'South Huron Paralegal | Legal Services Huron County | Legal Assist',
    description: 'Licensed paralegal services in South Huron and Huron County. Traffic ticket defence on Highway 4 and Highway 83, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal south huron, south huron lawyer, huron county legal services, traffic ticket south huron, exeter paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist South Huron', areaServed: ['Exeter', 'Huron Park', 'South Huron', 'Huron County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'South Huron', url: '/locations/south-huron' }],
    faqs: [
      { question: 'Do you serve South Huron and Huron County?', answer: 'Yes, we serve South Huron, Exeter, Huron Park, Dashwood, and all communities throughout Huron County.' },
      { question: 'Where is the nearest court for South Huron residents?', answer: 'The nearest court is the Goderich courthouse at 1 Courthouse Square.' },
      { question: 'Can you fight traffic tickets on Highway 4 and Highway 83?', answer: 'Yes, we defend traffic tickets issued on Highway 4 and Highway 83 and all roads throughout Huron County.' },
      { question: 'Do you offer virtual consultations for South Huron?', answer: 'Yes, phone and video consultations are available for all Huron County residents.' }
    ]
  },
  '/locations/north-perth': {
    title: 'North Perth Paralegal | Legal Services Perth County | Legal Assist',
    description: 'Licensed paralegal services in North Perth and Perth County. Traffic ticket defence on Highway 23 and Highway 86, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal north perth, north perth lawyer, perth county legal services, traffic ticket north perth, listowel paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist North Perth', areaServed: ['Listowel', 'Atwood', 'Monkton', 'North Perth', 'Perth County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'North Perth', url: '/locations/north-perth' }],
    faqs: [
      { question: 'Do you serve North Perth and Perth County?', answer: 'Yes, we serve North Perth, Listowel, Atwood, Monkton, and all communities throughout Perth County.' },
      { question: 'Where is the nearest court for North Perth residents?', answer: 'The nearest court is the Stratford courthouse at 1 Huron Street.' },
      { question: 'Can you fight traffic tickets on Highway 23 and Highway 86?', answer: 'Yes, we defend traffic tickets issued on Highway 23 and Highway 86 and all roads throughout Perth County.' },
      { question: 'Do you offer virtual consultations for North Perth?', answer: 'Yes, phone and video consultations are available for all Perth County residents.' }
    ]
  },
  '/locations/zorra': {
    title: 'Zorra Paralegal | Legal Services Oxford County | Legal Assist',
    description: 'Licensed paralegal services in Zorra and Oxford County. Traffic ticket defence on Highway 19 and Highway 2, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal zorra, zorra lawyer, oxford county legal services, traffic ticket zorra, embro paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Zorra', areaServed: ['Embro', 'Thamesford', 'Lakeside', 'Zorra', 'Oxford County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Zorra', url: '/locations/zorra' }],
    faqs: [
      { question: 'Do you serve Zorra and Oxford County?', answer: 'Yes, we serve Zorra, Embro, Thamesford, Woodstock, and all communities throughout Oxford County.' },
      { question: 'Where is the nearest court for Zorra residents?', answer: 'The nearest court is the Woodstock courthouse at 415 Hunter Street.' },
      { question: 'Can you fight traffic tickets on Highway 19 and Highway 2?', answer: 'Yes, we defend traffic tickets issued on Highway 19 and Highway 2 and all roads throughout Oxford County.' },
      { question: 'Do you offer virtual consultations for Zorra?', answer: 'Yes, phone and video consultations are available for all Oxford County residents.' }
    ]
  },
  '/locations/south-stormont': {
    title: 'South Stormont Paralegal | Legal Services SDG Counties | Legal Assist',
    description: 'Licensed paralegal services in South Stormont and SDG Counties. Traffic ticket defence on Highway 401 and Highway 2, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal south stormont, south stormont lawyer, sdg counties legal services, traffic ticket south stormont, long sault paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist South Stormont', areaServed: ['Long Sault', 'Ingleside', 'South Stormont', 'SDG Counties'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'South Stormont', url: '/locations/south-stormont' }],
    faqs: [
      { question: 'Do you serve South Stormont and SDG Counties?', answer: 'Yes, we serve South Stormont, Long Sault, Ingleside, Cornwall, and all communities throughout SDG Counties.' },
      { question: 'Where is the nearest court for South Stormont residents?', answer: 'The nearest court is the Cornwall courthouse at 29 Second Street West.' },
      { question: 'Can you fight traffic tickets on Highway 401 and Highway 2?', answer: 'Yes, we defend traffic tickets issued on Highway 401 and Highway 2 and all roads throughout SDG Counties.' },
      { question: 'Do you offer virtual consultations for South Stormont?', answer: 'Yes, phone and video consultations are available for all SDG Counties residents.' }
    ]
  },
  '/locations/russell': {
    title: 'Russell Paralegal | Legal Services Prescott and Russell | Legal Assist',
    description: 'Licensed paralegal services in Russell and Prescott and Russell. Traffic ticket defence on Highway 417 and Highway 138, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal russell, russell lawyer, prescott and russell legal services, traffic ticket russell, embrun paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Russell', areaServed: ['Russell', 'Embrun', 'Limoges', 'Prescott and Russell'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Russell', url: '/locations/russell' }],
    faqs: [
      { question: 'Do you serve Russell and Prescott and Russell?', answer: 'Yes, we serve Russell, Embrun, Limoges, Vars, and all communities throughout Prescott and Russell.' },
      { question: 'Where is the nearest court for Russell residents?', answer: 'The nearest court is the Ottawa courthouse.' },
      { question: 'Can you fight traffic tickets on Highway 417 and Highway 138?', answer: 'Yes, we defend traffic tickets issued on Highway 417 and Highway 138 and all roads throughout Prescott and Russell.' },
      { question: 'Do you offer virtual consultations for Russell?', answer: 'Yes, phone and video consultations are available for all Prescott and Russell residents.' }
    ]
  },
  '/locations/south-dundas': {
    title: 'South Dundas Paralegal | Legal Services SDG Counties | Legal Assist',
    description: 'Licensed paralegal services in South Dundas and SDG Counties. Traffic ticket defence on Highway 401 and Highway 2, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal south dundas, south dundas lawyer, sdg counties legal services, traffic ticket south dundas, morrisburg paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist South Dundas', areaServed: ['Morrisburg', 'Iroquois', 'South Dundas', 'SDG Counties'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'South Dundas', url: '/locations/south-dundas' }],
    faqs: [
      { question: 'Do you serve South Dundas and SDG Counties?', answer: 'Yes, we serve South Dundas, Morrisburg, Iroquois, Chesterville, and all communities throughout SDG Counties.' },
      { question: 'Where is the nearest court for South Dundas residents?', answer: 'The nearest court is the Cornwall courthouse at 29 Second Street West.' },
      { question: 'Can you fight traffic tickets on Highway 401 and Highway 2?', answer: 'Yes, we defend traffic tickets issued on Highway 401 and Highway 2 and all roads throughout SDG Counties.' },
      { question: 'Do you offer virtual consultations for South Dundas?', answer: 'Yes, phone and video consultations are available for all SDG Counties residents.' }
    ]
  },
  '/locations/north-glengarry': {
    title: 'North Glengarry Paralegal | Legal Services SDG Counties | Legal Assist',
    description: 'Licensed paralegal services in North Glengarry and SDG Counties. Traffic ticket defence on Highway 34 and Highway 43, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal north glengarry, north glengarry lawyer, sdg counties legal services, traffic ticket north glengarry, alexandria paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist North Glengarry', areaServed: ['Alexandria', 'Maxville', 'North Glengarry', 'SDG Counties'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'North Glengarry', url: '/locations/north-glengarry' }],
    faqs: [
      { question: 'Do you serve North Glengarry and SDG Counties?', answer: 'Yes, we serve North Glengarry, Alexandria, Maxville, Dalkeith, and all communities throughout SDG Counties.' },
      { question: 'Where is the nearest court for North Glengarry residents?', answer: 'The nearest court is the Cornwall courthouse at 29 Second Street West.' },
      { question: 'Can you fight traffic tickets on Highway 34 and Highway 43?', answer: 'Yes, we defend traffic tickets issued on Highway 34 and Highway 43 and all roads throughout SDG Counties.' },
      { question: 'Do you offer virtual consultations for North Glengarry?', answer: 'Yes, phone and video consultations are available for all SDG Counties residents.' }
    ]
  },
  '/locations/south-glengarry': {
    title: 'South Glengarry Paralegal | Legal Services SDG Counties | Legal Assist',
    description: 'Licensed paralegal services in South Glengarry and SDG Counties. Traffic ticket defence on Highway 401 and Highway 34, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal south glengarry, south glengarry lawyer, sdg counties legal services, traffic ticket south glengarry, lancaster paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist South Glengarry', areaServed: ['Lancaster', 'Williamstown', 'Glen Walter', 'South Glengarry', 'SDG Counties'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'South Glengarry', url: '/locations/south-glengarry' }],
    faqs: [
      { question: 'Do you serve South Glengarry and SDG Counties?', answer: 'Yes, we serve South Glengarry, Lancaster, Williamstown, Glen Walter, and all communities throughout SDG Counties.' },
      { question: 'Where is the nearest court for South Glengarry residents?', answer: 'The nearest court is the Cornwall courthouse at 29 Second Street West.' },
      { question: 'Can you fight traffic tickets on Highway 401 and Highway 34?', answer: 'Yes, we defend traffic tickets issued on Highway 401 and Highway 34 and all roads throughout SDG Counties.' },
      { question: 'Do you offer virtual consultations for South Glengarry?', answer: 'Yes, phone and video consultations are available for all SDG Counties residents.' }
    ]
  },
  '/locations/loyalist': {
    title: 'Loyalist Paralegal | Legal Services Lennox and Addington | Legal Assist',
    description: 'Licensed paralegal services in Loyalist and Lennox and Addington. Traffic ticket defence on Highway 401 and Highway 33, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal loyalist, loyalist lawyer, lennox and addington legal services, traffic ticket loyalist, bath paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Loyalist', areaServed: ['Bath', 'Amherstview', 'Odessa', 'Loyalist', 'Lennox and Addington'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Loyalist', url: '/locations/loyalist' }],
    faqs: [
      { question: 'Do you serve Loyalist and Lennox and Addington?', answer: 'Yes, we serve Loyalist, Bath, Amherstview, Odessa, and all communities throughout Lennox and Addington.' },
      { question: 'Where is the nearest court for Loyalist residents?', answer: 'The nearest court is the Napanee courthouse at 41 Dundas Street West.' },
      { question: 'Can you fight traffic tickets on Highway 401 and Highway 33?', answer: 'Yes, we defend traffic tickets issued on Highway 401 and Highway 33 and all roads throughout Lennox and Addington.' },
      { question: 'Do you offer virtual consultations for Loyalist?', answer: 'Yes, phone and video consultations are available for all Lennox and Addington residents.' }
    ]
  },
  '/locations/blind-river': {
    title: 'Blind River Paralegal | Legal Services Algoma District | Legal Assist',
    description: 'Licensed paralegal services in Blind River and Algoma District. Traffic ticket defence on Highway 17 (Trans-Canada), small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal blind river, blind river lawyer, algoma district legal services, traffic ticket blind river, thessalon paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Blind River', areaServed: ['Blind River', 'Thessalon', 'Iron Bridge', 'Algoma District'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Blind River', url: '/locations/blind-river' }],
    faqs: [
      { question: 'Do you serve Blind River and Algoma District?', answer: 'Yes, we serve Blind River, Thessalon, Iron Bridge, Espanola, and all communities throughout Algoma District.' },
      { question: 'Where is the nearest court for Blind River residents?', answer: 'The nearest court is the Blind River courthouse.' },
      { question: 'Can you fight traffic tickets on Highway 17 (Trans-Canada)?', answer: 'Yes, we defend traffic tickets issued on Highway 17 (Trans-Canada) and all roads throughout Algoma District.' },
      { question: 'Do you offer virtual consultations for Blind River?', answer: 'Yes, phone and video consultations are available for all Algoma District residents.' }
    ]
  },
  '/locations/atikokan': {
    title: 'Atikokan Paralegal | Legal Services Rainy River District | Legal Assist',
    description: 'Licensed paralegal services in Atikokan and Rainy River District. Traffic ticket defence on Highway 11 and Highway 622, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal atikokan, atikokan lawyer, rainy river district legal services, traffic ticket atikokan, fort frances paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Atikokan', areaServed: ['Atikokan', 'Rainy River District'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Atikokan', url: '/locations/atikokan' }],
    faqs: [
      { question: 'Do you serve Atikokan and Rainy River District?', answer: 'Yes, we serve Atikokan, Fort Frances, Thunder Bay, Rainy River, and all communities throughout Rainy River District.' },
      { question: 'Where is the nearest court for Atikokan residents?', answer: 'The nearest court is the Fort Frances courthouse.' },
      { question: 'Can you fight traffic tickets on Highway 11 and Highway 622?', answer: 'Yes, we defend traffic tickets issued on Highway 11 and Highway 622 and all roads throughout Rainy River District.' },
      { question: 'Do you offer virtual consultations for Atikokan?', answer: 'Yes, phone and video consultations are available for all Rainy River District residents.' }
    ]
  },
  '/locations/deep-river': {
    title: 'Deep River Paralegal | Legal Services Renfrew County | Legal Assist',
    description: 'Licensed paralegal services in Deep River and Renfrew County. Traffic ticket defence on Highway 17 and Highway 62, small claims court, landlord-tenant disputes. Free consultation.',
    keywords: 'paralegal deep river, deep river lawyer, renfrew county legal services, traffic ticket deep river, chalk river paralegal',
    schema: { type: 'LocalBusiness', name: 'Legal Assist Deep River', areaServed: ['Deep River', 'Chalk River', 'Petawawa', 'Renfrew County'] },
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: 'Deep River', url: '/locations/deep-river' }],
    faqs: [
      { question: 'Do you serve Deep River and Renfrew County?', answer: 'Yes, we serve Deep River, Chalk River, Petawawa, Pembroke, and all communities throughout Renfrew County.' },
      { question: 'Where is the nearest court for Deep River residents?', answer: 'The nearest court is the Pembroke courthouse at 297 Pembroke Street East.' },
      { question: 'Can you fight traffic tickets on Highway 17 and Highway 62?', answer: 'Yes, we defend traffic tickets issued on Highway 17 and Highway 62 and all roads throughout Renfrew County.' },
      { question: 'Do you offer virtual consultations for Deep River?', answer: 'Yes, phone and video consultations are available for all Renfrew County residents.' }
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
    title: 'Legal Assist Paralegal Services | London Ontario',
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
      "@id": "https://www.legalassist.london/#organization",
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
      "item": `