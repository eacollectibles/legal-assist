// HPI 2.0 - Full Version (No Broken Animations)
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Scale, Users, Clock, Shield, CheckCircle2, ArrowDown, Home, AlertCircle, Briefcase, Gavel, MessageSquare, FileText, Zap } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyContactBar from '@/components/StickyContactBar';
import CallProcessBox from '@/components/CallProcessBox';
import PrimaryCTA from '@/components/PrimaryCTA';
import ConversionStrip from '@/components/ConversionStrip';
import { TrustSignals } from '@/components/TrustSignals';
import { WhatHappensNext } from '@/components/WhatHappensNext';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function HomePage() {
  const [showStickyBar, setShowStickyBar] = useState(true);
  const ctaSectionRef = useRef<HTMLElement>(null);

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
    }
  ];

  useEffect(() => {
    const ctaSection = ctaSectionRef.current;
    if (!ctaSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBar(!entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    observer.observe(ctaSection);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-clip selection:bg-primary/20 selection:text-secondary">
      <Header />
      
      <h1 className="sr-only">
        Licensed Paralegal Services in Ontario - Small Claims Court, Landlord-Tenant, Traffic Tickets & Provincial Offences
      </h1>
      
      {/* HERO SECTION */}
      <section className="min-h-[85vh] grid lg:grid-cols-2">
        <div className="bg-secondary texture-noise flex items-center p-8 lg:p-16 xl:p-24 order-2 lg:order-1">
          <div className="max-w-xl">
            <span className="text-primary font-paragraph text-sm tracking-[0.2em] uppercase mb-6 block">
              Licensed Ontario Paralegals
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-heading leading-[1.1] mb-8">
              Legal help<br/>
              <span className="text-primary">without</span> the<br/>
              lawyer price tag.
            </h2>
            <p className="text-white/70 font-paragraph text-lg mb-10 max-w-md">
              We provide Paralegal representation for traffic tickets, human rights matters, landlord-tenant disputes, and Small Claims court cases throughout Ontario
            </p>
            <div className="hidden sm:block mb-8">
              <Link
                to="/services/small-claims-process"
                className="text-white/80 hover:text-white underline underline-offset-4 text-sm font-paragraph"
              >
                Read: How Small Claims Court Works (Ontario)
              </Link>
            </div>
            <div className="hidden sm:flex flex-col sm:flex-row gap-4">
              <PrimaryCTA variant="button" size="lg" />
              <Link 
                to="/services"
                className="btn-lift border border-white/25 text-white/90 hover:text-white font-paragraph rounded-lg inline-block text-center px-6 py-3 text-base opacity-85 hover:opacity-100 lg:px-8 lg:py-4 lg:text-lg"
              >
                View Services
              </Link>
            </div>
            <div className="hidden sm:block mt-6">
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-white/75 text-sm font-paragraph">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Send your details</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Licensed paralegal calls you</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>You decide how to proceed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="relative order-1 lg:order-2 min-h-[40vh] lg:min-h-0">
          <Image
            src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png"
            alt="Paralegal consultation in London Ontario"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-secondary/30" />
        </div>
      </section>

      {/* CONVERSION STRIP */}
      <section className="bg-primary py-4">
        <ConversionStrip />
      </section>

      {/* TRUST SIGNALS SECTION */}
      <section className="py-8 md:py-12 bg-background">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 space-y-4">
          <TrustSignals />
          <WhatHappensNext />
        </div>
      </section>

      {/* EDITORIAL INTRO SECTION */}
      <section className="py-16 md:py-24 lg:py-32 bg-pastelbeige/30 relative">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="lg:sticky lg:top-32">
                <span className="text-primary font-paragraph text-sm tracking-[0.2em] uppercase mb-4 block">Our Mission</span>
                <h2 className="font-heading text-3xl lg:text-4xl text-secondary leading-tight">
                  Justice shouldn't require a second mortgage.
                </h2>
              </div>
            </div>
            
            <div className="lg:col-span-8 xl:col-span-9">
              <div className="prose prose-lg max-w-none">
                <p className="font-paragraph text-xl text-secondary/90 leading-relaxed mb-8">
                  We understand the frustration of legal issues. Whether it's a traffic ticket threatening your license, 
                  a landlord who won't make repairs, or an employer who hasn't paid what you're owed—these problems 
                  can feel overwhelming. And hiring a lawyer? Often out of reach.
                </p>
                <p className="font-paragraph text-lg text-secondary/75 leading-relaxed mb-8">
                  That's where we come in. As licensed Ontario paralegals, we're authorized to represent you in 
                  Small Claims Court, before the Landlord and Tenant Board, at Provincial Offences Court, and 
                  various tribunals. Same quality representation—at a fraction of the cost.
                </p>
                <div className="grid sm:grid-cols-3 gap-8 pt-8 border-t border-secondary/10">
                  <div>
                    <p className="font-heading text-4xl text-primary mb-2">30+</p>
                    <p className="font-paragraph text-secondary/70 text-sm">Years Combined Experience</p>
                  </div>
                  <div>
                    <p className="font-heading text-4xl text-primary mb-2">98%</p>
                    <p className="font-paragraph text-secondary/70 text-sm">Client Satisfaction</p>
                  </div>
                  <div>
                    <p className="font-heading text-4xl text-primary mb-2">$50K</p>
                    <p className="font-paragraph text-secondary/70 text-sm">Max Small Claims Limit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL PROCESS BOX SECTION */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <CallProcessBox />
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 md:py-28 bg-secondary texture-noise relative">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-primary font-paragraph text-sm tracking-[0.2em] uppercase mb-4 block">Simple Process</span>
            <h2 className="font-heading text-4xl md:text-5xl text-white mb-4">How It Works</h2>
            <p className="font-paragraph text-white/70 text-lg max-w-2xl mx-auto">
              Three simple steps to get the legal help you need
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-2xl mb-6">
                  1
                </div>
                <h3 className="font-heading text-2xl text-white mb-4">Tell Us What's Going On</h3>
                <p className="font-paragraph text-white/70 mb-6">
                  Call us or send a message. We'll listen to your situation and schedule a free 30-minute consultation to discuss your options.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-white/60 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Free initial consultation</span>
                  </li>
                  <li className="flex items-start gap-2 text-white/60 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>No obligation to proceed</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-2xl mb-6">
                  2
                </div>
                <h3 className="font-heading text-2xl text-white mb-4">Get Your Plan</h3>
                <p className="font-paragraph text-white/70 mb-6">
                  We'll review your case, explain your rights under Ontario law, and present clear options with transparent pricing.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-white/60 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Clear explanation of options</span>
                  </li>
                  <li className="flex items-start gap-2 text-white/60 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Upfront, transparent pricing</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-2xl mb-6">
                  3
                </div>
                <h3 className="font-heading text-2xl text-white mb-4">We Take Action</h3>
                <p className="font-paragraph text-white/70 mb-6">
                  Once you decide to proceed, we handle the paperwork, filings, correspondence, and representation—keeping you informed every step.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-white/60 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>We handle all paperwork</span>
                  </li>
                  <li className="flex items-start gap-2 text-white/60 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Regular status updates</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-primary font-paragraph text-sm tracking-[0.2em] uppercase mb-4 block">Why Choose Us</span>
            <h2 className="font-heading text-4xl md:text-5xl text-secondary mb-4">The LegalAssist Difference</h2>
            <p className="font-paragraph text-secondary/70 text-lg max-w-2xl mx-auto">
              Professional legal representation that puts your needs first
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="h-full">
                <div className={cn(
                  "group relative h-full p-8 lg:p-10 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col rounded-xl",
                  feature.color
                )}>
                  <div className="absolute inset-0 bg-white/0 transition-colors duration-500 group-hover:bg-white/20" />
                  
                  <div className="relative z-10 w-14 h-14 bg-secondary text-white rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <feature.icon className="w-7 h-7" />
                  </div>

                  <div className="relative z-10 flex-1 flex flex-col">
                    <h3 className="font-heading text-2xl text-secondary mb-3 group-hover:translate-x-1 transition-transform duration-300">
                      {feature.title}
                    </h3>
                    <p className="font-paragraph text-secondary/80 leading-relaxed mb-6">
                      {feature.description}
                    </p>

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
                  </div>

                  <feature.icon className="absolute -bottom-8 -right-8 w-48 h-48 text-secondary/5 rotate-12 group-hover:rotate-0 transition-transform duration-700 ease-out" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SPLIT SECTION */}
      <section className="relative bg-secondary text-secondary-foreground overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[70vh]">
          <div className="relative">
            <Image
              src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png"
              alt="Ontario paralegal services"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/60 via-secondary/30 to-transparent" />
          </div>
          
          <div className="flex items-center p-8 lg:p-16 xl:p-24">
            <div className="max-w-xl">
              <span className="text-primary font-paragraph text-sm tracking-[0.2em] uppercase mb-4 block">Practice Areas</span>
              <h2 className="font-heading text-4xl lg:text-5xl text-white mb-6">
                Comprehensive Legal Services
              </h2>
              <p className="font-paragraph text-white/70 text-lg mb-8">
                From traffic tickets to Small Claims Court, we provide expert paralegal representation across Ontario's legal landscape.
              </p>
              <Link to="/services" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-paragraph hover:bg-primary/90 transition-colors">
                View All Services <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES CARDS SECTION */}
      <section className="py-20 md:py-28 bg-gray-900">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-primary font-paragraph text-sm tracking-[0.2em] uppercase mb-4 block">Our Services</span>
            <h2 className="font-heading text-4xl md:text-5xl text-white mb-4">How Can We Help?</h2>
            <p className="font-paragraph text-white/70 text-lg max-w-2xl mx-auto">
              Select a service area to learn more about how we can assist you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/services/small-claims-court" className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300">
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                <Scale className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-2xl text-white mb-3 group-hover:text-primary transition-colors">Small Claims Court</h3>
              <p className="font-paragraph text-white/60 mb-6">Civil disputes up to $50,000 in Ontario.</p>
              <span className="flex items-center gap-2 text-primary font-paragraph text-sm">
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link to="/services/landlord-tenant-board" className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300">
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                <Home className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-2xl text-white mb-3 group-hover:text-primary transition-colors">Landlord & Tenant Board</h3>
              <p className="font-paragraph text-white/60 mb-6">Residential tenancy disputes and evictions.</p>
              <span className="flex items-center gap-2 text-primary font-paragraph text-sm">
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link to="/services/traffic-tickets" className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300">
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                <AlertCircle className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-2xl text-white mb-3 group-hover:text-primary transition-colors">Traffic Tickets</h3>
              <p className="font-paragraph text-white/60 mb-6">Speeding, careless driving, and HTA offences.</p>
              <span className="flex items-center gap-2 text-primary font-paragraph text-sm">
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link to="/services/human-rights-tribunal" className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300">
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-2xl text-white mb-3 group-hover:text-primary transition-colors">Human Rights Tribunal</h3>
              <p className="font-paragraph text-white/60 mb-6">Discrimination in employment, housing, and services.</p>
              <span className="flex items-center gap-2 text-primary font-paragraph text-sm">
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link to="/services/employment-issues" className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300">
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                <Briefcase className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-2xl text-white mb-3 group-hover:text-primary transition-colors">Employment Issues</h3>
              <p className="font-paragraph text-white/60 mb-6">Wrongful dismissal and workplace disputes.</p>
              <span className="flex items-center gap-2 text-primary font-paragraph text-sm">
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link to="/services/criminal-matters" className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300">
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                <Gavel className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-2xl text-white mb-3 group-hover:text-primary transition-colors">Criminal Matters</h3>
              <p className="font-paragraph text-white/60 mb-6">Summary conviction offences defence.</p>
              <span className="flex items-center gap-2 text-primary font-paragraph text-sm">
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 md:py-28 bg-pastelbeige/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-primary font-paragraph text-sm tracking-[0.2em] uppercase mb-4 block">Common Questions</span>
            <h2 className="font-heading text-4xl md:text-5xl text-secondary mb-4">Frequently Asked Questions</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-xl border border-secondary/10 px-6">
              <AccordionTrigger className="font-heading text-lg text-secondary hover:no-underline py-6">
                What can a paralegal represent me for in Ontario?
              </AccordionTrigger>
              <AccordionContent className="font-paragraph text-secondary/70 pb-6">
                Licensed paralegals in Ontario can represent clients in Small Claims Court (disputes up to $50,000), 
                Provincial Offences Court (traffic tickets, by-law infractions), Landlord and Tenant Board hearings, 
                certain tribunals (Human Rights Tribunal, Licence Appeal Tribunal), and summary conviction matters 
                under the Criminal Code where the maximum penalty is six months or less.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-xl border border-secondary/10 px-6">
              <AccordionTrigger className="font-heading text-lg text-secondary hover:no-underline py-6">
                How much do paralegal services cost?
              </AccordionTrigger>
              <AccordionContent className="font-paragraph text-secondary/70 pb-6">
                Our hourly rates range from $150-250 depending on the complexity of your matter. We also offer 
                flat-fee packages for common services like traffic ticket defence, simple LTB applications, and 
                standard Small Claims filings. We provide a free 30-minute initial consultation to discuss your 
                situation and provide a clear quote before you commit.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-xl border border-secondary/10 px-6">
              <AccordionTrigger className="font-heading text-lg text-secondary hover:no-underline py-6">
                Do I need a lawyer or a paralegal?
              </AccordionTrigger>
              <AccordionContent className="font-paragraph text-secondary/70 pb-6">
                If your legal matter falls within the paralegal scope of practice (Small Claims Court, LTB, traffic 
                tickets, certain tribunals, minor criminal matters), a licensed paralegal can provide quality 
                representation at a significantly lower cost than a lawyer. For matters outside this scope—such as 
                family law, real estate transactions, or serious criminal charges—you would need a lawyer.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-xl border border-secondary/10 px-6">
              <AccordionTrigger className="font-heading text-lg text-secondary hover:no-underline py-6">
                What areas do you serve?
              </AccordionTrigger>
              <AccordionContent className="font-paragraph text-secondary/70 pb-6">
                We serve clients throughout Ontario with a focus on London and Southwestern Ontario, including 
                Middlesex, Elgin, Oxford, Norfolk, and Lambton counties. Many matters can be handled remotely 
                through virtual consultations and electronic filings, so we can assist clients across the province.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white rounded-xl border border-secondary/10 px-6">
              <AccordionTrigger className="font-heading text-lg text-secondary hover:no-underline py-6">
                How long does a typical case take?
              </AccordionTrigger>
              <AccordionContent className="font-paragraph text-secondary/70 pb-6">
                Timelines vary depending on the type of case and court/tribunal backlogs. Traffic ticket matters 
                typically resolve within 3-6 months. LTB hearings may take 2-6 months depending on the application 
                type. Small Claims Court cases can take 6-18 months from filing to trial. We'll provide realistic 
                timeline expectations during your initial consultation.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA SECTION */}
      <section ref={ctaSectionRef} className="py-20 md:py-28 bg-primary/10 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <div>
            <span className="text-primary font-paragraph text-sm tracking-[0.2em] uppercase mb-4 block">Get Started</span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-secondary mb-6">
              Ready to discuss your legal matter?
            </h2>
          </div>
          <div>
            <p className="font-paragraph text-secondary/70 text-lg mb-8 max-w-2xl mx-auto">
              Schedule your free 30-minute consultation. We'll listen to your situation and explain your options under Ontario law—no obligation, no pressure.
            </p>
          </div>
          <div>
            <PrimaryCTA variant="button" size="lg" />
            <p className="mt-6 text-secondary/60 text-sm font-paragraph">
              Licensed Ontario paralegal • Free consultation • No obligation
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <StickyContactBar isVisible={showStickyBar} />
    </div>
  );
}
