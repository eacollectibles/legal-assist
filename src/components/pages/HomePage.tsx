// HPI 2.0 - Optimized for SEO + Cleaner UI
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Scale, Clock, Shield, CheckCircle2, 
  Home, AlertCircle, Briefcase, Gavel, Users, Phone,
  MapPin, Star, FileCheck, MessageSquare
} from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyContactBar from '@/components/StickyContactBar';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// =============================================================================
// SEO SCHEMA MARKUP
// =============================================================================

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": "https://legalassistparalegal.com/#organization",
  "name": "LegalAssist Paralegal Services",
  "alternateName": "LegalAssist",
  "description": "Licensed paralegal services in London, Ontario. Expert representation for traffic tickets, landlord-tenant disputes, small claims court, human rights tribunal, and employment matters.",
  "url": "https://legalassistparalegal.com",
  "telephone": "+1-365-882-9515",
  "email": "info@legalassistparalegal.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "London",
    "addressRegion": "ON",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "42.9849",
    "longitude": "-81.2453"
  },
  "areaServed": [
    { "@type": "City", "name": "London", "addressRegion": "ON" },
    { "@type": "State", "name": "Ontario", "addressCountry": "CA" }
  ],
  "serviceType": [
    "Traffic Ticket Defence",
    "Small Claims Court Representation", 
    "Landlord Tenant Board Representation",
    "Human Rights Tribunal Representation",
    "Employment Law Services",
    "Provincial Offences Defence"
  ],
  "priceRange": "$150-$250/hour",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "17:00"
  },
  "sameAs": []
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What can a paralegal represent me for in Ontario?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Licensed paralegals in Ontario can represent clients in Small Claims Court (claims up to $50,000), Provincial Offences Court (traffic tickets, bylaw violations), Landlord and Tenant Board matters, certain tribunal proceedings (HRTO, LAT), and summary conviction offences where the maximum penalty is up to 2 years less a day."
      }
    },
    {
      "@type": "Question", 
      "name": "How much do paralegal services cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our rates range from $150-250/hour depending on the complexity of your matter. We also offer flat-fee packages for common services like traffic ticket defence and simple Small Claims Court matters. Your initial 30-minute consultation is free."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a lawyer or a paralegal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If your matter falls within the paralegal scope of practice (Small Claims Court, traffic tickets, landlord-tenant disputes, minor criminal charges), a licensed paralegal can provide the same quality representation at a lower cost. For matters outside this scope (family law, criminal indictable offences, real estate), you would need a lawyer."
      }
    },
    {
      "@type": "Question",
      "name": "What areas do you serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We serve clients throughout Ontario with a primary focus on London and Southwestern Ontario. Many matters can be handled remotely through virtual consultations and electronic filings."
      }
    },
    {
      "@type": "Question",
      "name": "How long will my case take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Timelines vary by matter type. Traffic tickets typically resolve in 2-6 months. Small Claims Court matters can take 6-12 months. Landlord and Tenant Board hearings are usually scheduled within 1-3 months. We'll provide a realistic timeline estimate during your free consultation."
      }
    }
  ]
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://legalassistparalegal.com"
    }
  ]
};

// =============================================================================
// ANIMATED ELEMENT COMPONENT (Simplified)
// =============================================================================

type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const AnimatedElement = ({ children, className, delay = 0 }: AnimatedElementProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setTimeout(() => element.classList.add('is-visible'), delay);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={ref} 
      className={cn(
        "opacity-0 translate-y-6 transition-all duration-700 ease-out",
        "[&.is-visible]:opacity-100 [&.is-visible]:translate-y-0",
        className
      )}
    >
      {children}
    </div>
  );
};

// =============================================================================
// SERVICE CARD DATA
// =============================================================================

const services = [
  {
    icon: Scale,
    title: "Small Claims Court",
    description: "Civil disputes up to $50,000",
    href: "/services/small-claims-court",
    features: ["Contract disputes", "Debt collection", "Property damage"]
  },
  {
    icon: Home,
    title: "Landlord & Tenant Board",
    description: "Residential tenancy matters",
    href: "/services/landlord-tenant-board",
    features: ["Evictions", "Rent disputes", "Maintenance issues"]
  },
  {
    icon: AlertCircle,
    title: "Traffic Tickets",
    description: "Provincial offence defence",
    href: "/services/traffic-tickets",
    features: ["Speeding", "Careless driving", "Stunt driving"]
  },
  {
    icon: Users,
    title: "Human Rights Tribunal",
    description: "Discrimination claims",
    href: "/services/human-rights-tribunal",
    features: ["Employment", "Housing", "Services"]
  },
  {
    icon: Briefcase,
    title: "Employment Issues",
    description: "Workplace disputes",
    href: "/services/employment-issues",
    features: ["Wrongful dismissal", "Unpaid wages", "Severance"]
  },
  {
    icon: Gavel,
    title: "Criminal Matters",
    description: "Summary conviction offences",
    href: "/services/criminal-matters",
    features: ["Theft under $5000", "Assault", "Mischief"]
  }
];

const trustSignals = [
  { icon: Shield, label: "Law Society Licensed", subtext: "LSO Regulated" },
  { icon: FileCheck, label: "Errors & Omissions Insured", subtext: "Full Coverage" },
  { icon: Star, label: "Client Focused", subtext: "Transparent Pricing" },
  { icon: MessageSquare, label: "Free Consultation", subtext: "30 Minutes" }
];

// =============================================================================
// FAQ DATA
// =============================================================================

const faqs = [
  {
    question: "What can a paralegal represent me for in Ontario?",
    answer: "Licensed paralegals in Ontario can represent clients in Small Claims Court (claims up to $50,000), Provincial Offences Court (traffic tickets, bylaw violations), Landlord and Tenant Board matters, certain tribunal proceedings (HRTO, LAT), and summary conviction offences where the maximum penalty is up to 2 years less a day."
  },
  {
    question: "How much do paralegal services cost?",
    answer: "Our rates range from $150-250/hour depending on the complexity of your matter. We also offer flat-fee packages for common services like traffic ticket defence and simple Small Claims Court matters. Your initial 30-minute consultation is free."
  },
  {
    question: "Do I need a lawyer or a paralegal?",
    answer: "If your matter falls within the paralegal scope of practice (Small Claims Court, traffic tickets, landlord-tenant disputes, minor criminal charges), a licensed paralegal can provide the same quality representation at a lower cost. For matters outside this scope (family law, criminal indictable offences, real estate), you would need a lawyer."
  },
  {
    question: "What areas do you serve?",
    answer: "We serve clients throughout Ontario with a primary focus on London and Southwestern Ontario. Many matters can be handled remotely through virtual consultations and electronic filings."
  },
  {
    question: "How long will my case take?",
    answer: "Timelines vary by matter type. Traffic tickets typically resolve in 2-6 months. Small Claims Court matters can take 6-12 months. Landlord and Tenant Board hearings are usually scheduled within 1-3 months. We'll provide a realistic timeline estimate during your free consultation."
  }
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function HomePage() {
  const [showStickyBar, setShowStickyBar] = useState(true);
  const ctaSectionRef = useRef<HTMLElement>(null);

  // Inject SEO meta tags and schema
  useEffect(() => {
    // Title
    document.title = 'LegalAssist Paralegal Services | Licensed Ontario Paralegal | London, ON';
    
    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Licensed paralegal services in London, Ontario. Expert representation for traffic tickets, landlord-tenant disputes, small claims court up to $50,000, and human rights matters. Free 30-minute consultation. Rates from $150/hour.');

    // Open Graph Tags
    const ogTags = [
      { property: 'og:title', content: 'LegalAssist Paralegal Services | Licensed Ontario Paralegal' },
      { property: 'og:description', content: 'Affordable legal representation in London, ON. Traffic tickets, landlord-tenant, small claims court. Free consultation.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://legalassistparalegal.com' },
      { property: 'og:locale', content: 'en_CA' }
    ];

    ogTags.forEach(tag => {
      let el = document.querySelector(`meta[property="${tag.property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', tag.property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', tag.content);
    });

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://legalassistparalegal.com');

    // Schema Markup
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = 'homepage-schema';
    schemaScript.textContent = JSON.stringify([
      LOCAL_BUSINESS_SCHEMA,
      FAQ_SCHEMA,
      BREADCRUMB_SCHEMA
    ]);
    
    const existing = document.getElementById('homepage-schema');
    if (existing) existing.remove();
    document.head.appendChild(schemaScript);

    return () => {
      const script = document.getElementById('homepage-schema');
      if (script) script.remove();
    };
  }, []);

  // Hide sticky bar when CTA is visible
  useEffect(() => {
    const ctaSection = ctaSectionRef.current;
    if (!ctaSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(ctaSection);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-clip">
      <Header />
      
      {/* ================================================================== */}
      {/* HERO SECTION */}
      {/* ================================================================== */}
      <section className="relative min-h-[90vh] flex items-center bg-secondary overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="https://static.wixstatic.com/media/99571b_8e05531429e9472d888eec555c78c9f4~mv2.jpeg/v1/fill/w_1920,h_1080,al_c,q_85/banner.jpeg"
            alt="Professional paralegal consultation in London Ontario"
            className="w-full h-full object-cover opacity-30"
            width={1920}
            height={1080}
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/95 to-secondary/80" />
        </div>

        <div className="relative z-10 max-w-[100rem] mx-auto px-6 lg:px-12 py-20 lg:py-32">
          <div className="max-w-3xl">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm text-white/90 font-paragraph">Law Society of Ontario Licensed</span>
            </div>

            {/* H1 - Primary SEO Target */}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.1] mb-6">
              London Paralegal Services
              <span className="block text-primary mt-2">Affordable Legal Help</span>
            </h1>

            <p className="font-paragraph text-xl text-white/80 mb-8 max-w-xl leading-relaxed">
              Expert representation for traffic tickets, landlord-tenant disputes, small claims court, and more. Professional legal help without the lawyer price tag.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link 
                to="/contact"
                className="btn-shine btn-lift inline-flex items-center justify-center gap-2 bg-primary text-white font-paragraph font-semibold px-8 py-4 text-lg rounded-lg"
              >
                <Phone className="w-5 h-5" />
                Free Consultation
              </Link>
              <Link 
                to="/services"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-paragraph font-medium px-8 py-4 text-lg rounded-lg hover:bg-white/10 transition-colors"
              >
                View Services
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div>
                <p className="font-heading text-3xl text-primary">$150</p>
                <p className="text-sm text-white/70">Starting hourly rate</p>
              </div>
              <div>
                <p className="font-heading text-3xl text-primary">$50K</p>
                <p className="text-sm text-white/70">Small claims limit</p>
              </div>
              <div>
                <p className="font-heading text-3xl text-primary">Free</p>
                <p className="text-sm text-white/70">Initial consultation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* TRUST SIGNALS BAR */}
      {/* ================================================================== */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {trustSignals.map((signal, idx) => (
              <div key={idx} className="flex items-center gap-3 py-6 px-4 md:px-6">
                <signal.icon className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <p className="font-paragraph font-semibold text-secondary text-sm">{signal.label}</p>
                  <p className="text-xs text-secondary/60">{signal.subtext}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SERVICES SECTION */}
      {/* ================================================================== */}
      <section className="py-20 lg:py-28 bg-gray-50" aria-labelledby="services-heading">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <AnimatedElement className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-paragraph text-sm font-semibold tracking-widest uppercase mb-4 block">
              Practice Areas
            </span>
            <h2 id="services-heading" className="font-heading text-4xl md:text-5xl text-secondary mb-4">
              How We Can Help
            </h2>
            <p className="font-paragraph text-lg text-secondary/70">
              Licensed to represent you across Ontario's key tribunals and courts
            </p>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <AnimatedElement key={idx} delay={idx * 50}>
                <Link 
                  to={service.href}
                  className="group block bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" />
                  </div>
                  
                  <h3 className="font-heading text-xl text-secondary mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-paragraph text-secondary/70 text-sm mb-4">
                    {service.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, fIdx) => (
                      <span 
                        key={fIdx}
                        className="text-xs bg-gray-100 text-secondary/70 px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </Link>
              </AnimatedElement>
            ))}
          </div>

          <AnimatedElement delay={350} className="text-center mt-12">
            <Link 
              to="/services"
              className="inline-flex items-center gap-2 text-primary font-paragraph font-semibold hover:underline"
            >
              View All Practice Areas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedElement>
        </div>
      </section>

      {/* ================================================================== */}
      {/* WHY CHOOSE US */}
      {/* ================================================================== */}
      <section className="py-20 lg:py-28 bg-secondary text-white">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedElement>
              <span className="text-primary font-paragraph text-sm font-semibold tracking-widest uppercase mb-4 block">
                Why LegalAssist
              </span>
              <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">
                Professional Legal Help,
                <span className="text-primary"> Affordable Rates</span>
              </h2>
              <p className="font-paragraph text-lg text-white/80 mb-8 leading-relaxed">
                As licensed paralegals regulated by the Law Society of Ontario, we provide the same professional standards as lawyers—but for matters within our scope of practice, at a fraction of the cost.
              </p>
              
              <div className="space-y-4">
                {[
                  "Licensed & insured by the Law Society of Ontario",
                  "Transparent flat-fee and hourly billing options", 
                  "Free 30-minute initial consultation",
                  "Serving London and all of Southwestern Ontario",
                  "Secure client portal for documents & updates"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <Clock className="w-8 h-8 text-primary mb-4" />
                  <p className="font-heading text-3xl text-white mb-1">24-48h</p>
                  <p className="text-sm text-white/70">Response time</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <MapPin className="w-8 h-8 text-primary mb-4" />
                  <p className="font-heading text-3xl text-white mb-1">Ontario</p>
                  <p className="text-sm text-white/70">Province-wide</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 col-span-2">
                  <Scale className="w-8 h-8 text-primary mb-4" />
                  <p className="font-heading text-3xl text-white mb-1">6 Practice Areas</p>
                  <p className="text-sm text-white/70">Traffic • LTB • Small Claims • HRTO • Employment • Criminal</p>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FAQ SECTION */}
      {/* ================================================================== */}
      <section className="py-20 lg:py-28 bg-gray-50" aria-labelledby="faq-heading">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <AnimatedElement className="text-center mb-12">
              <h2 id="faq-heading" className="font-heading text-4xl md:text-5xl text-secondary mb-4">
                Frequently Asked Questions
              </h2>
              <p className="font-paragraph text-lg text-secondary/70">
                Common questions about paralegal services in Ontario
              </p>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, idx) => (
                  <AccordionItem 
                    key={idx} 
                    value={`faq-${idx}`} 
                    className="bg-white rounded-lg px-6 border border-gray-100 shadow-sm"
                  >
                    <AccordionTrigger className="font-heading text-lg text-secondary hover:text-primary hover:no-underline py-5 text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-paragraph text-secondary/80 leading-relaxed pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FINAL CTA */}
      {/* ================================================================== */}
      <section 
        ref={ctaSectionRef} 
        id="contact" 
        className="py-20 lg:py-28 bg-primary relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedElement>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                Ready to Discuss Your Case?
              </h2>
              <p className="font-paragraph text-xl text-white/90 mb-10 max-w-xl mx-auto">
                Get a clear explanation of your rights and options under Ontario law. Free 30-minute consultation, no obligation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link 
                  to="/contact"
                  className="btn-shine btn-lift inline-flex items-center justify-center gap-2 bg-white text-primary font-paragraph font-semibold px-10 py-5 text-xl rounded-lg"
                >
                  <Phone className="w-5 h-5" />
                  Book Free Consultation
                </Link>
                <a 
                  href="tel:+13658829515"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-paragraph font-medium px-10 py-5 text-xl rounded-lg hover:bg-white/10 transition-colors"
                >
                  Call 365-882-9515
                </a>
              </div>

              <p className="font-paragraph text-sm text-white/70">
                Licensed Ontario Paralegal • Regulated by Law Society of Ontario
              </p>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <Footer />
      <StickyContactBar isVisible={showStickyBar} />
    </div>
  );
}
