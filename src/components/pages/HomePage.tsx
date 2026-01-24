// HPI 1.6-V
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Scale, Users, Clock, Shield, CheckCircle2, ArrowDown, Home, AlertCircle, Briefcase, Gavel } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyContactBar from '@/components/StickyContactBar';
import CallProcessBox from '@/components/CallProcessBox';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// SEO Meta Tags
const setMetaDescription = (description: string) => {
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', description);
};

// --- Utility Components for Motion & Interaction ---

/**
 * AnimatedElement
 * Uses IntersectionObserver to trigger a one-time reveal animation.
 * Adheres to the "Unfolding Narrative" case study.
 */
type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-up' | 'fade-in' | 'slide-in-right' | 'scale-up';
};

const AnimatedElement = ({ 
  children, 
  className, 
  delay = 0,
  animation = 'fade-up' 
}: AnimatedElementProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const timeoutId = setTimeout(() => {
      if (!element) return;
      
      const observer = new IntersectionObserver(([entry]) => {
        if (entry && entry.isIntersecting) {
          setTimeout(() => {
            if (element) {
              element.classList.add('is-visible');
            }
          }, delay);
          observer.unobserve(element);
        }
      }, { threshold: 0.15 });

      observer.observe(element);
      
      return () => {
        observer.disconnect();
      };
    }, 10);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay]);

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-in': return 'opacity-0 transition-opacity duration-1000 ease-out data-[visible=true]:opacity-100';
      case 'slide-in-right': return 'opacity-0 translate-x-10 transition-all duration-1000 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-x-0';
      case 'scale-up': return 'opacity-0 scale-95 transition-all duration-1000 ease-out data-[visible=true]:opacity-100 data-[visible=true]:scale-100';
      case 'fade-up':
      default: return 'opacity-0 translate-y-8 transition-all duration-1000 ease-out';
    }
  };

  return (
    <div 
      ref={ref} 
      className={cn(getAnimationClass(), className, "[&.is-visible]:opacity-100 [&.is-visible]:translate-y-0 [&.is-visible]:translate-x-0 [&.is-visible]:scale-100")}
    >
      {children}
    </div>
  );
};

/**
 * ParallaxContainer
 * Uses IntersectionObserver to track scroll progress for performant parallax.
 * Updates a CSS variable --scroll-progress on the element.
 */
const ParallaxContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const progress = 1 - (rect.bottom / (rect.height + windowHeight));
      const clamped = Math.min(Math.max(progress, 0), 1);
      element.style.setProperty('--scroll-progress', clamped.toString());
    };

    const timeoutId = setTimeout(() => {
      if (element) {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
      }
    }, 10);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

// --- Main Page Component ---

export default function HomePage() {
  // Set page title and meta description
  useEffect(() => {
    document.title = 'LegalAssist Paralegal | Affordable Legal Services in Ontario';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Professional paralegal services in Ontario. Expert representation for traffic tickets, landlord-tenant disputes, small claims court, and more. Affordable legal help when you need it.');
    }
  }, []);

  // State for sticky contact bar visibility
  const [showStickyBar, setShowStickyBar] = useState(true);
  const ctaSectionRef = useRef<HTMLElement>(null);

  // Canonical Data Sources (Preserved from original)
  const features = [
    {
      icon: Scale,
      title: "Licensed Expertise",
      description: "All our paralegals are licensed by the Law Society of Ontario, ensuring professional standards and accountability.",
      benefits: [
        "Regulated by Law Society of Ontario",
        "Bound by professional conduct rules",
        "Professional liability insurance",
        "Subject to discipline procedures"
      ],
      color: "bg-pastelgreen",
      delay: 0
    },
    {
      icon: Users,
      title: "Client-Centered Care",
      description: "We take time to understand your unique situation and tailor our approach to meet your specific needs.",
      benefits: [
        "Personalized case strategy",
        "Regular communication updates",
        "Flexible appointment scheduling",
        "Compassionate, judgment-free approach"
      ],
      color: "bg-pastellavender",
      delay: 100
    },
    {
      icon: Clock,
      title: "Efficient Process",
      description: "Streamlined procedures and clear communication keep your case moving forward without unnecessary delays.",
      benefits: [
        "Quick initial consultations (30 min)",
        "Fast response times (24-48 hours)",
        "Clear timeline expectations",
        "Proactive case management"
      ],
      color: "bg-pastelpeach",
      delay: 200
    },
    {
      icon: Shield,
      title: "Affordable Rates",
      description: "Quality legal representation shouldn't break the bank. Our transparent pricing makes justice accessible.",
      benefits: [
        "Hourly rates: $150-250/hour",
        "Flat-fee packages available",
        "Payment plan options",
        "Free initial 30-minute consultation"
      ],
      color: "bg-pastelbeige",
      delay: 300
    }
  ];

  useEffect(() => {
    document.title = 'LegalAssist Paralegal Services | Licensed Ontario Paralegal | London, ON';
  }, []);

  // Intersection Observer to hide sticky bar when CTA section is visible
  useEffect(() => {
    const ctaSection = ctaSectionRef.current;
    if (!ctaSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide sticky bar when CTA section is visible
        setShowStickyBar(!entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of CTA section is visible
        rootMargin: '0px 0px -100px 0px', // Offset from bottom
      }
    );

    observer.observe(ctaSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-clip selection:bg-primary/20 selection:text-secondary">
      <Header />
      
      {/* Primary SEO H1 - Screen reader accessible, visually minimal */}
      <h1 className="sr-only">
        Licensed Paralegal Services in Ontario - Small Claims Court, Landlord-Tenant, Traffic Tickets & Provincial Offences
      </h1>
      
      {/* HERO SECTION */}
      <section className="min-h-[85vh] grid lg:grid-cols-2">
        {/* Left: Text Side */}
        <div className="bg-secondary texture-noise flex items-center p-8 lg:p-16 xl:p-24 order-2 lg:order-1">
          <div className="max-w-xl">
            <span className="text-primary font-paragraph text-sm tracking-[0.2em] uppercase mb-6 block">
              Licensed Ontario Paralegals
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-heading leading-[1.1] mb-8">
              Legal help<br/>
              <span className="text-primary">without</span> the<br/>
              lawyer price tag.
            </h1>
            <p className="text-white/70 font-paragraph text-lg mb-10 max-w-md">
              We provide Paralegal representation for traffic tickets, human rights matters, landlord-tenant disputes, and Small Claims court cases throughout Ontario
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/contact"
                className="btn-shine btn-lift bg-primary text-white font-paragraph font-semibold px-8 py-4 text-lg rounded-lg inline-block text-center"
              >
                Free Consultation
              </Link>
              <Link 
                to="/services"
                className="btn-shine btn-lift border border-white/30 text-white font-paragraph px-8 py-4 text-lg rounded-lg inline-block text-center"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
        
        {/* Right: Image Side */}
        <div className="relative min-h-[50vh] lg:min-h-full order-1 lg:order-2">
          <Image 
            src="https://static.wixstatic.com/media/99571b_8e05531429e9472d888eec555c78c9f4~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85/banner.jpeg"
            alt="Professional paralegal consultation"
            className="absolute inset-0 w-full h-full object-cover"
            width={1200}
            height={900}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-transparent lg:bg-gradient-to-r lg:from-secondary/30 lg:to-transparent" />
        </div>
      </section>

      {/* EDITORIAL INTRO SECTION */}
      {/* Layout: Sticky side note with scrolling content */}
      <section className="py-16 md:py-24 lg:py-32 bg-pastelbeige/30 relative">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* Sticky Header */}
            <div className="lg:col-span-4 relative">
              <div className="sticky top-32">
                <AnimatedElement>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-px w-12 bg-primary" />
                    <span className="font-paragraph text-sm font-semibold tracking-widest uppercase text-primary">
                      Our Mission
                    </span>
                  </div>
                  <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-secondary leading-tight">
                    Empowering Your <br/>
                    <span className="italic text-primary">Legal Journey</span>
                  </h2>
                  <div className="mt-12 hidden lg:block">
                    <ArrowDown className="w-8 h-8 text-secondary/40 animate-bounce" />
                  </div>
                </AnimatedElement>
              </div>
            </div>

            {/* Scrolling Content */}
            <div className="lg:col-span-7 lg:col-start-6 space-y-12">
              <AnimatedElement delay={200}>
                <p className="font-heading text-2xl md:text-3xl text-secondary leading-relaxed">
                  Professional Guidance, Personalized Approach.
                </p>
              </AnimatedElement>
              
              <AnimatedElement delay={300}>
                <div className="prose prose-lg prose-stone text-secondary/80 font-paragraph">
                  <p className="mb-6 text-lg leading-loose">{"At LegalAssist, we help individuals navigate Ontario’s legal system with clarity and confidence. Our services are provided by Licensed Paralegals in good standing with the Law Society of Ontario, offering knowledgeable and practical assistance within the authorized scope of paralegal practice."}</p>
                  <p className="text-lg leading-loose">{"Whether you are dealing with a traffic offence, a Small Claims Court matter within the court’s monetary jurisdiction, or a landlord-tenant dispute, our Licensed Paralegals provide knowledgeable and practical legal services within the authorized scope of practice. We are committed to offering services that are accessible, understandable, and cost-effective."}</p>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={400}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-secondary/10">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white rounded-full shadow-sm">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading text-lg text-secondary mb-1">Ontario Wide</h4>
                      <p className="text-sm text-secondary/70">Serving clients across the entire province.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white rounded-full shadow-sm">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading text-lg text-secondary mb-1">{"Licensed Paralegals"}</h4>
                      <p className="text-sm text-secondary/70">Fully accredited and experienced team.</p>
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            </div>

          </div>
        </div>
      </section>

      {/* CALL PROCESS BOX SECTION */}
      <section className="py-16 md:py-24 lg:py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <AnimatedElement>
            <CallProcessBox />
          </AnimatedElement>
        </div>
      </section>

      {/* FEATURES SECTION - "Bento Box" Style Grid */}
      <section className="py-16 md:py-24 lg:py-32 bg-background">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <AnimatedElement>
              <h2 className="font-heading text-4xl md:text-5xl text-secondary mb-6">Why Partner With LegalAssist</h2>
              <p className="font-paragraph text-lg text-secondary/70">{"We combine professional standards with a client-focused approach to provide reliable and practical legal services."}</p>
            </AnimatedElement>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features && features.length > 0 && features.map((feature, index) => {
              if (!feature) return null;
              
              return (
                <AnimatedElement key={index} delay={feature.delay || 0} className="h-full">
                  <div className={cn(
                    "group relative h-full p-8 lg:p-10 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col",
                    feature.color || "bg-pastelbeige"
                  )}>
                    {/* Hover Effect Background */}
                    <div className="absolute inset-0 bg-white/0 transition-colors duration-500 group-hover:bg-white/20" />
                    
                    {/* Icon */}
                    {feature.icon && (
                      <div className="relative z-10 w-14 h-14 bg-secondary text-white rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
                        <feature.icon className="w-7 h-7" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="relative z-10 flex-1 flex flex-col">
                      <h3 className="font-heading text-2xl text-secondary mb-3 group-hover:translate-x-1 transition-transform duration-300">
                        {feature.title || ''}
                      </h3>
                      <p className="font-paragraph text-secondary/80 leading-relaxed mb-6">
                        {feature.description || ''}
                      </p>

                      {/* Benefits List */}
                      {feature.benefits && feature.benefits.length > 0 && (
                        <div className="space-y-2 mt-auto">
                          {feature.benefits.map((benefit, benefitIdx) => (
                            <div key={benefitIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-1" />
                              <span className="font-paragraph text-sm text-secondary/75 leading-snug">
                                {benefit}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Decorative Watermark Icon */}
                    {feature.icon && (
                      <feature.icon className="absolute -bottom-8 -right-8 w-48 h-48 text-secondary/5 rotate-12 group-hover:rotate-0 transition-transform duration-700 ease-out" />
                    )}
                  </div>
                </AnimatedElement>
              );
            })}
          </div>
        </div>
      </section>
      {/* SERVICES SPLIT SECTION */}
      {/* Layout: Full width split with sticky image */}
      <section className="relative bg-secondary text-secondary-foreground overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[800px]">
          
          {/* Left: Image Side */}
          <div className="relative h-[500px] lg:h-auto overflow-hidden">
            <ParallaxContainer className="absolute inset-0 w-full h-full">
              <div 
                className="w-full h-[120%] absolute top-0 left-0"
                style={{ transform: 'translateY(calc(var(--scroll-progress) * 50px))' }}
              >
                <Image 
                  src="https://static.wixstatic.com/media/99571b_9954538ec5b24b4a8a245180de229f4b~mv2.png/v1/fill/w_1200,h_800,al_c,q_85,enc_auto/services.png"
                  alt="Legal consultation in progress"
                  className="w-full h-full object-cover opacity-80"
                  width={1200}
                  height={800}
                  loading="lazy"
                />
              </div>
            </ParallaxContainer>
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-transparent lg:bg-gradient-to-t lg:from-secondary/50 lg:to-transparent" />
            
            <div className="absolute bottom-8 left-8 lg:bottom-16 lg:left-16 z-10">
              <div className="bg-background/10 backdrop-blur-md border border-white/10 p-6 max-w-xs">
                <p className="font-heading text-2xl text-white mb-2">15+</p>
                <p className="font-paragraph text-sm text-white/80">Practice Areas Covered</p>
              </div>
            </div>
          </div>

          {/* Right: Content Side */}
          <div className="flex items-center p-8 lg:p-24 xl:p-32">
            <div className="max-w-xl">
              <AnimatedElement>
                <span className="inline-block py-1 px-3 border border-white/20 rounded-full text-xs font-medium tracking-wider uppercase mb-8 text-white/80">
                  Our Expertise
                </span>
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-8 text-white">
                  <span className="heading-underline">Comprehensive</span> Legal Services
                </h2>
              </AnimatedElement>

              <AnimatedElement delay={200}>
                <p className="font-paragraph text-lg text-white/70 leading-relaxed mb-8">{"Licensed paralegals in Ontario are authorized to represent clients in a broad range of legal matters. This includes summary conviction criminal offences, provincial offences such as traffic tickets, landlord-tenant disputes, and Small Claims Court matters up to $50,000. We provide professional representation across the full scope of paralegal-permitted practice areas."}</p>
                <p className="font-paragraph text-lg text-white/70 leading-relaxed mb-12">
                  Our team specializes in making the legal process understandable and manageable, guiding you through each step with clarity and confidence.
                </p>
              </AnimatedElement>

              <AnimatedElement delay={300}>
                <Link 
                  to="/services"
                  className="inline-flex items-center gap-3 text-white border-b border-primary pb-1 hover:text-primary hover:border-white transition-colors text-lg font-paragraph group"
                >
                  View All Practice Areas
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                </Link>
              </AnimatedElement>
            </div>
          </div>

        </div>
      </section>

      {/* SERVICES CARDS SECTION */}
      <section className="py-16 md:py-24 lg:py-32 bg-dark relative overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <AnimatedElement>
              <span className="text-primary font-paragraph text-sm tracking-[0.2em] uppercase mb-6 block">
                Our Services
              </span>
              <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">Our Practice Areas</h2>
              <p className="font-paragraph text-lg text-white/70">Comprehensive legal representation across Ontario's key tribunals and courts</p>
            </AnimatedElement>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedElement delay={0}>
              <Link 
                to="/services/small-claims-court" 
                className="card-hover bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-primary text-white rounded-lg group-hover:bg-primary/80 transition-colors">
                    <Scale className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-heading text-2xl text-white group-hover:text-primary mb-3 transition-colors">Small Claims Court</h3>
                <p className="font-paragraph text-white/70 mb-4">Professional representation for civil disputes up to $50,000 in Ontario.</p>
                <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <Link 
                to="/services/landlord-tenant-board" 
                className="card-hover bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-primary text-white rounded-lg group-hover:bg-primary/80 transition-colors">
                    <Home className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-heading text-2xl text-white group-hover:text-primary mb-3 transition-colors">Landlord & Tenant Board</h3>
                <p className="font-paragraph text-white/70 mb-4">Expert representation for residential tenancy disputes and eviction proceedings.</p>
                <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <Link 
                to="/services/traffic-tickets" 
                className="card-hover bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-primary text-white rounded-lg group-hover:bg-primary/80 transition-colors">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-heading text-2xl text-white group-hover:text-primary mb-3 transition-colors">Traffic Tickets</h3>
                <p className="font-paragraph text-white/70 mb-4">Effective defence strategies for speeding, careless driving, and other traffic violations.</p>
                <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <Link 
                to="/services/human-rights-tribunal" 
                className="card-hover bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-primary text-white rounded-lg group-hover:bg-primary/80 transition-colors">
                    <Users className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-heading text-2xl text-white group-hover:text-primary mb-3 transition-colors">Human Rights Tribunal</h3>
                <p className="font-paragraph text-white/70 mb-4">Advocacy for discrimination and human rights violations in employment and housing.</p>
                <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </AnimatedElement>

            <AnimatedElement delay={400}>
              <Link 
                to="/services/employment-issues" 
                className="card-hover bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-primary text-white rounded-lg group-hover:bg-primary/80 transition-colors">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-heading text-2xl text-white group-hover:text-primary mb-3 transition-colors">Employment Issues</h3>
                <p className="font-paragraph text-white/70 mb-4">Representation for wrongful dismissal, workplace disputes, and employment standards matters.</p>
                <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </AnimatedElement>

            <AnimatedElement delay={500}>
              <Link 
                to="/services/criminal-matters" 
                className="card-hover bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-primary text-white rounded-lg group-hover:bg-primary/80 transition-colors">
                    <Gavel className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-heading text-2xl text-white group-hover:text-primary mb-3 transition-colors">Criminal Matters</h3>
                <p className="font-paragraph text-white/70 mb-4">Defence representation for summary conviction offences and provincial court matters.</p>
                <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="texture-noise py-16 md:py-24 lg:py-32 bg-pastellavender relative overflow-hidden">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <AnimatedElement>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-secondary mb-4 text-center">
                <span className="heading-underline">Frequently Asked</span> Questions
              </h2>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <p className="font-paragraph text-lg text-foreground/70 text-center mb-16">
                Get answers to common questions about paralegal services in Ontario
              </p>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1" className="bg-white/50 backdrop-blur-sm rounded-lg px-6 border-none">
                  <AccordionTrigger className="font-heading text-xl text-secondary hover:text-primary hover:no-underline py-6">
                    What can a paralegal represent me for in Ontario?
                  </AccordionTrigger>
                  <AccordionContent className="font-paragraph text-base text-foreground/80 leading-relaxed pb-6">
                    Licensed paralegals in Ontario can represent clients in Small Claims Court (claims up to $50,000), Provincial Offences Court (traffic tickets, bylaw violations), Landlord and Tenant Board matters, certain tribunal proceedings (HRTO, LAT), and summary conviction offences where the maximum penalty is up to 2 years less a day.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="bg-white/50 backdrop-blur-sm rounded-lg px-6 border-none">
                  <AccordionTrigger className="font-heading text-xl text-secondary hover:text-primary hover:no-underline py-6">
                    How much do paralegal services cost?
                  </AccordionTrigger>
                  <AccordionContent className="font-paragraph text-base text-foreground/80 leading-relaxed pb-6">
                    Our rates range from $150-250/hour depending on the complexity of your matter. We also offer flat-fee packages for common services like traffic ticket defence and simple Small Claims Court matters. Your initial 30-minute consultation is free.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="bg-white/50 backdrop-blur-sm rounded-lg px-6 border-none">
                  <AccordionTrigger className="font-heading text-xl text-secondary hover:text-primary hover:no-underline py-6">
                    Do I need a lawyer or a paralegal?
                  </AccordionTrigger>
                  <AccordionContent className="font-paragraph text-base text-foreground/80 leading-relaxed pb-6">
                    If your matter falls within the paralegal scope of practice (Small Claims Court, traffic tickets, landlord-tenant disputes, minor criminal charges), a licensed paralegal can provide the same quality representation at a lower cost. For matters outside this scope (family law, criminal indictable offences, real estate), you would need a lawyer.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="bg-white/50 backdrop-blur-sm rounded-lg px-6 border-none">
                  <AccordionTrigger className="font-heading text-xl text-secondary hover:text-primary hover:no-underline py-6">
                    What areas do you serve?
                  </AccordionTrigger>
                  <AccordionContent className="font-paragraph text-base text-foreground/80 leading-relaxed pb-6">
                    We serve clients throughout Ontario with a primary focus on London and Southwestern Ontario. Many matters can be handled remotely through virtual consultations and electronic filings.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="bg-white/50 backdrop-blur-sm rounded-lg px-6 border-none">
                  <AccordionTrigger className="font-heading text-xl text-secondary hover:text-primary hover:no-underline py-6">
                    How long will my case take?
                  </AccordionTrigger>
                  <AccordionContent className="font-paragraph text-base text-foreground/80 leading-relaxed pb-6">
                    Timelines vary by matter type. Traffic tickets typically resolve in 2-6 months. Small Claims Court matters can take 6-12 months. Landlord and Tenant Board hearings are usually scheduled within 1-3 months. We'll provide a realistic timeline estimate during your free consultation.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section ref={ctaSectionRef} id="contact" className="diagonal-accent texture-noise py-16 md:py-24 lg:py-32 bg-pastelbeige relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
        </div>

        <div className="max-w-[100rem] mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedElement animation="scale-up">
              <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-secondary mb-8">
                Unsure where you stand legally in Ontario?
              </h2>
            </AnimatedElement>
            
            <AnimatedElement delay={200}>
              <div className="flex flex-col gap-4 items-center mb-6">
                <Link 
                  to="/contact"
                  className="btn-shine btn-lift inline-block bg-primary text-primary-foreground font-paragraph font-semibold px-10 py-5 text-xl rounded-lg"
                >
                  Find Out Where You Stand
                </Link>
                <p className="font-paragraph text-base text-secondary/70 max-w-xl">
                  Get a clear explanation of your rights and options under Ontario law.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <p className="font-paragraph text-sm text-secondary/60 italic">
                Licensed Ontario paralegal • No obligation
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