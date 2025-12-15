// HPI 1.6-V
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Scale, Users, Clock, Shield, CheckCircle2, ArrowDown } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

// --- Utility Components for Motion & Interaction ---

/**
 * AnimatedElement
 * Uses IntersectionObserver to trigger a one-time reveal animation.
 * Adheres to the "Unfolding Narrative" case study.
 */
type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number; // in ms
  animation?: 'fade-up' | 'fade-in' | 'slide-in-right' | 'scale-up';
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ 
  children, 
  className, 
  delay = 0,
  animation = 'fade-up' 
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          element.classList.add('is-visible');
        }, delay);
        observer.unobserve(element);
      }
    }, { threshold: 0.15 });

    observer.observe(element);
    return () => observer.disconnect();
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
const ParallaxContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress: 0 when element enters bottom, 1 when it leaves top
      const progress = 1 - (rect.bottom / (rect.height + windowHeight));
      
      // Clamp between 0 and 1
      const clamped = Math.min(Math.max(progress, 0), 1);
      element.style.setProperty('--scroll-progress', clamped.toString());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calc

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

// --- Main Page Component ---

export default function HomePage() {
  // Canonical Data Sources (Preserved from original)
  const features = [
    {
      icon: Scale,
      title: "Licensed Expertise",
      description: "All our paralegals are licensed by the Law Society of Ontario, ensuring professional standards and accountability.",
      color: "bg-pastelgreen",
      delay: 0
    },
    {
      icon: Users,
      title: "Client-Centered Care",
      description: "We take time to understand your unique situation and tailor our approach to meet your specific needs.",
      color: "bg-pastellavender",
      delay: 100
    },
    {
      icon: Clock,
      title: "Efficient Process",
      description: "Streamlined procedures and clear communication keep your case moving forward without unnecessary delays.",
      color: "bg-pastelpeach",
      delay: 200
    },
    {
      icon: Shield,
      title: "Affordable Rates",
      description: "Quality legal representation shouldn't break the bank. Our transparent pricing makes justice accessible.",
      color: "bg-pastelbeige",
      delay: 300
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-clip selection:bg-primary/20 selection:text-secondary">
      <Header />

      {/* HERO SECTION */}
      {/* Design Motif: Full-bleed image with overlapping, asymmetrical content card. 
          Inspiration: Cassadi image structure. */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-end pb-0 lg:pb-20 overflow-hidden">
        {/* Parallax Background Image */}
        <ParallaxContainer className="absolute inset-0 z-0">
          <div 
            className="w-full h-[120%] absolute top-0 left-0"
            style={{ transform: 'translateY(calc(var(--scroll-progress) * 100px))' }}
          >
            <Image 
              src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=hero-legal-office"
              alt="Professional legal office environment with warm lighting"
              className="w-full h-full object-cover"
              width={1920}
            />
            <div className="absolute inset-0 bg-secondary/10" />
          </div>
        </ParallaxContainer>

        {/* Content Overlay - Asymmetrical Placement */}
        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-12 pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            {/* Main Headline Area */}
            <div className="lg:col-span-8 lg:col-start-1 pb-12 lg:pb-24">
               <AnimatedElement animation="fade-up" delay={200}>
                <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-white drop-shadow-lg leading-[0.9] tracking-tight mb-6">
                  Accessible Legal <br/>
                  <span className="text-pastelbeige italic">Solutions</span> for Everyone
                </h1>
              </AnimatedElement>
            </div>

            {/* Floating Content Card - Overlapping the image bottom */}
            <div className="lg:col-span-5 lg:col-start-8 pointer-events-auto">
              <AnimatedElement animation="fade-up" delay={500}>
                <div className="bg-background p-8 md:p-12 shadow-2xl border-t-4 border-primary relative overflow-hidden group">
                  {/* Decorative background element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-pastelbeige/30 rounded-bl-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150" />
                  
                  <p className="font-paragraph text-lg md:text-xl text-secondary/80 mb-8 leading-relaxed relative z-10">
                    Expert paralegal services across Ontario, providing professional representation at a fraction of traditional legal costs.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                    <Link 
                      to="/legal-services"
                      className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground font-paragraph px-8 py-4 text-lg transition-all hover:bg-primary/90 hover:gap-4 group/btn"
                    >
                      Explore Services
                      <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL INTRO SECTION */}
      {/* Layout: Sticky side note with scrolling content */}
      <section className="py-24 lg:py-32 bg-pastelbeige/30 relative">
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
                  <p className="mb-6 text-lg leading-loose">
                    At LegalAssist, we bridge the gap between complex legal processes and everyday people. Our licensed paralegals bring years of specialized experience to help you navigate Ontario's legal system with confidence and clarity.
                  </p>
                  <p className="text-lg leading-loose">
                    Whether you're facing a traffic violation, small claims dispute, or landlord-tenant issue, we provide the expertise you need without the overwhelming costs of traditional law firms. We believe that justice should be accessible, understandable, and affordable for everyone.
                  </p>
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
                      <h4 className="font-heading text-lg text-secondary mb-1">Licensed Pros</h4>
                      <p className="text-sm text-secondary/70">Fully accredited and experienced team.</p>
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES SECTION - "Bento Box" Style Grid */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <AnimatedElement>
              <h2 className="font-heading text-4xl md:text-5xl text-secondary mb-6">Why Partner With LegalAssist</h2>
              <p className="font-paragraph text-lg text-secondary/70">
                We combine professional excellence with a client-first philosophy to deliver outstanding results.
              </p>
            </AnimatedElement>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <AnimatedElement key={index} delay={feature.delay} className="h-full">
                <div className={cn(
                  "group relative h-full p-8 lg:p-10 transition-all duration-500 hover:-translate-y-2 overflow-hidden",
                  feature.color
                )}>
                  {/* Hover Effect Background */}
                  <div className="absolute inset-0 bg-white/0 transition-colors duration-500 group-hover:bg-white/20" />
                  
                  {/* Icon */}
                  <div className="relative z-10 w-14 h-14 bg-secondary text-white rounded-full flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <feature.icon className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="font-heading text-2xl text-secondary mb-4 group-hover:translate-x-1 transition-transform duration-300">
                      {feature.title}
                    </h3>
                    <p className="font-paragraph text-secondary/80 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Decorative Watermark Icon */}
                  <feature.icon className="absolute -bottom-8 -right-8 w-48 h-48 text-secondary/5 rotate-12 group-hover:rotate-0 transition-transform duration-700 ease-out" />
                </div>
              </AnimatedElement>
            ))}
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
                  src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=legal-consultation"
                  alt="Legal consultation in progress"
                  className="w-full h-full object-cover opacity-80"
                  width={1200}
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
                  Comprehensive Legal Services
                </h2>
              </AnimatedElement>

              <AnimatedElement delay={200}>
                <p className="font-paragraph text-lg text-white/70 leading-relaxed mb-8">
                  Licensed paralegals in Ontario are authorized to represent clients in a wide range of legal matters. From traffic tickets to small claims court, landlord-tenant disputes to provincial offences, we cover the full spectrum of paralegal practice areas.
                </p>
                <p className="font-paragraph text-lg text-white/70 leading-relaxed mb-12">
                  Our team specializes in making the legal process understandable and manageable, guiding you through each step with clarity and confidence.
                </p>
              </AnimatedElement>

              <AnimatedElement delay={300}>
                <Link 
                  to="/legal-services"
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

      {/* CTA SECTION */}
      <section id="contact" className="py-24 lg:py-32 bg-pastelbeige relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
        </div>

        <div className="max-w-[100rem] mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedElement animation="scale-up">
              <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-secondary mb-8">
                Ready to Get Started?
              </h2>
            </AnimatedElement>
            
            <AnimatedElement delay={200}>
              <p className="font-paragraph text-xl text-secondary/70 mb-12 leading-relaxed max-w-2xl mx-auto">
                Schedule a consultation with our experienced paralegals today. We'll review your case, explain your options, and develop a strategy tailored to your needs.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a 
                  href="tel:4165550123"
                  className="min-w-[200px] bg-primary text-primary-foreground font-paragraph px-8 py-5 text-lg transition-all hover:bg-primary/90 hover:shadow-lg hover:-translate-y-1 rounded-sm"
                >
                  Call (416) 555-0123
                </a>
                <a 
                  href="mailto:info@legalassist.ca"
                  className="min-w-[200px] bg-white text-secondary border border-secondary/10 font-paragraph px-8 py-5 text-lg transition-all hover:bg-secondary hover:text-white hover:shadow-lg hover:-translate-y-1 rounded-sm"
                >
                  Email Us
                </a>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}