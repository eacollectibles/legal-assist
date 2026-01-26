// HPI 2.1 - Standalone Full Version (No External Component Dependencies)
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Scale, Users, Clock, Shield, CheckCircle2, Home, AlertCircle, Briefcase, Gavel, Phone, MessageCircle, FileText } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const [showStickyBar, setShowStickyBar] = useState(true);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const ctaSectionRef = useRef<HTMLElement>(null);

  const features = [
    {
      icon: Scale,
      title: "Licensed Expertise",
      description: "All our paralegals are licensed by the Law Society of Ontario, ensuring professional standards and accountability.",
      benefits: ["Regulated by Law Society of Ontario", "Bound by professional conduct rules", "Professional liability insurance", "Subject to discipline procedures"],
      color: "bg-green-100",
    },
    {
      icon: Users,
      title: "Client-Centered Care",
      description: "We take time to understand your unique situation and tailor our approach to meet your specific needs.",
      benefits: ["Personalized case strategy", "Regular communication updates", "Flexible appointment scheduling", "Compassionate, judgment-free approach"],
      color: "bg-purple-100",
    },
    {
      icon: Clock,
      title: "Efficient Process",
      description: "Streamlined procedures and clear communication keep your case moving forward without unnecessary delays.",
      benefits: ["Quick initial consultations (30 min)", "Fast response times (24-48 hours)", "Clear timeline expectations", "Proactive case management"],
      color: "bg-orange-100",
    },
    {
      icon: Shield,
      title: "Affordable Rates",
      description: "Quality legal representation shouldn't break the bank. Our transparent pricing makes justice accessible.",
      benefits: ["Hourly rates: $150-250/hour", "Flat-fee packages available", "Payment plan options", "Free initial 30-minute consultation"],
      color: "bg-amber-100",
    }
  ];

  const faqs = [
    { id: "1", q: "What can a paralegal represent me for in Ontario?", a: "Licensed paralegals in Ontario can represent clients in Small Claims Court (disputes up to $50,000), Provincial Offences Court (traffic tickets, by-law infractions), Landlord and Tenant Board hearings, certain tribunals (Human Rights Tribunal, Licence Appeal Tribunal), and summary conviction matters under the Criminal Code where the maximum penalty is six months or less." },
    { id: "2", q: "How much do paralegal services cost?", a: "Our hourly rates range from $150-250 depending on the complexity of your matter. We also offer flat-fee packages for common services like traffic ticket defence, simple LTB applications, and standard Small Claims filings. We provide a free 30-minute initial consultation to discuss your situation and provide a clear quote before you commit." },
    { id: "3", q: "Do I need a lawyer or a paralegal?", a: "If your legal matter falls within the paralegal scope of practice (Small Claims Court, LTB, traffic tickets, certain tribunals, minor criminal matters), a licensed paralegal can provide quality representation at a significantly lower cost than a lawyer. For matters outside this scope—such as family law, real estate transactions, or serious criminal charges—you would need a lawyer." },
    { id: "4", q: "What areas do you serve?", a: "We serve clients throughout Ontario with a focus on London and Southwestern Ontario, including Middlesex, Elgin, Oxford, Norfolk, and Lambton counties. Many matters can be handled remotely through virtual consultations and electronic filings, so we can assist clients across the province." },
    { id: "5", q: "How long does a typical case take?", a: "Timelines vary depending on the type of case and court/tribunal backlogs. Traffic ticket matters typically resolve within 3-6 months. LTB hearings may take 2-6 months depending on the application type. Small Claims Court cases can take 6-18 months from filing to trial. We'll provide realistic timeline expectations during your initial consultation." },
  ];

  useEffect(() => {
    const ctaSection = ctaSectionRef.current;
    if (!ctaSection) return;
    const observer = new IntersectionObserver(([entry]) => { setShowStickyBar(!entry.isIntersecting); }, { threshold: 0.1 });
    observer.observe(ctaSection);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <h1 className="sr-only">Licensed Paralegal Services in Ontario</h1>
      
      {/* HERO SECTION */}
      <section className="min-h-[85vh] grid lg:grid-cols-2">
        {/* Left: Text Side */}
        <div className="bg-secondary flex items-center p-8 lg:p-16 xl:p-24 order-2 lg:order-1">
          <div className="max-w-xl">
            <span className="text-primary font-paragraph text-sm tracking-widest uppercase mb-6 block">Licensed Ontario Paralegals</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-heading leading-tight mb-8">
              Legal help<br/><span className="text-primary">without</span> the<br/>lawyer price tag.
            </h2>
            <p className="text-white/70 font-paragraph text-lg mb-10 max-w-md">
              Expert representation for traffic tickets, landlord-tenant disputes, small claims court, and more throughout Ontario.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+13658829515" className="bg-primary text-white px-8 py-4 rounded-lg font-paragraph text-center flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" /> Call 365-882-9515
              </a>
              <Link to="/services" className="border border-white/25 text-white px-8 py-4 rounded-lg font-paragraph text-center">
                View Services
              </Link>
            </div>
            <div className="mt-8">
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-white/75 text-sm">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Free consultation</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Licensed paralegal</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> No obligation</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Right: Image Side */}
        <div className="relative order-1 lg:order-2 min-h-[40vh] lg:min-h-0">
          <img
            src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png"
            alt="Paralegal consultation in London Ontario"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-secondary/30" />
        </div>
      </section>

      {/* CONVERSION STRIP */}
      <section className="bg-primary py-4">
        <div className="max-w-[100rem] mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-white text-center">
          <span className="font-paragraph">Need legal help? Call now for a free consultation:</span>
          <a href="tel:+13658829515" className="font-heading font-bold text-xl hover:underline">365-882-9515</a>
        </div>
      </section>

      {/* TRUST SIGNALS */}
      <section className="py-12 bg-background">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 space-y-4">
          <div className="grid md:grid-cols-3 gap-6 p-6 bg-primary/5 rounded-2xl border border-primary/10">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-heading font-semibold text-secondary">Licensed Ontario Paralegal</p>
                <p className="text-sm text-secondary/70">Every file handled by a licensed paralegal.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Scale className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-heading font-semibold text-secondary">Regulated by the LSO</p>
                <p className="text-sm text-secondary/70">Within authorized scope of practice.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-heading font-semibold text-secondary">No Pressure</p>
                <p className="text-sm text-secondary/70">We explain options. You decide.</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
            <h3 className="font-heading font-semibold text-secondary mb-4">What Happens When You Contact Us</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-primary/10 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">1</div>
                  <MessageCircle className="w-4 h-4 text-primary" />
                </div>
                <p className="font-heading font-semibold text-sm text-secondary">Speak with a Paralegal</p>
                <p className="text-sm text-secondary/70 mt-1">You speak directly with a licensed Ontario paralegal.</p>
              </div>
              <div className="bg-white rounded-xl border border-primary/10 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">2</div>
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <p className="font-heading font-semibold text-sm text-secondary">Get Clear Options</p>
                <p className="text-sm text-secondary/70 mt-1">We explain your rights and options under Ontario law.</p>
              </div>
              <div className="bg-white rounded-xl border border-primary/10 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">3</div>
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <p className="font-heading font-semibold text-sm text-secondary">You Decide</p>
                <p className="text-sm text-secondary/70 mt-1">No pressure. No obligation. Proceed only if you're comfortable.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL INTRO */}
      <section className="py-16 md:py-24 bg-amber-50/50">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <span className="text-primary font-paragraph text-sm tracking-widest uppercase mb-4 block">Our Mission</span>
              <h2 className="font-heading text-3xl lg:text-4xl text-secondary leading-tight">
                Justice shouldn't require a second mortgage.
              </h2>
            </div>
            <div className="lg:col-span-8">
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
      </section>

      {/* CALL PROCESS BOX */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="w-full bg-amber-50 border border-secondary/10 rounded-lg p-8 md:p-10">
            <h3 className="text-2xl font-heading font-bold text-secondary mb-6">What Happens When You Call</h3>
            <ol className="space-y-4">
              {['You speak directly with a licensed paralegal', 'We listen and explain your options under Ontario law', 'You decide — no pressure, no obligation'].map((step, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold text-lg">{index + 1}</span>
                  <span className="text-base font-paragraph text-secondary pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-secondary">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-primary font-paragraph text-sm tracking-widest uppercase mb-4 block">Simple Process</span>
            <h2 className="font-heading text-4xl md:text-5xl text-white mb-4">How It Works</h2>
            <p className="font-paragraph text-white/70 text-lg max-w-2xl mx-auto">Three simple steps to get the legal help you need</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "1", title: "Tell Us What's Going On", desc: "Call us or send a message. We'll listen to your situation and schedule a free 30-minute consultation.", points: ["Free initial consultation", "No obligation to proceed"] },
              { num: "2", title: "Get Your Plan", desc: "We'll review your case, explain your rights under Ontario law, and present clear options with transparent pricing.", points: ["Clear explanation of options", "Upfront, transparent pricing"] },
              { num: "3", title: "We Take Action", desc: "Once you decide to proceed, we handle the paperwork, filings, correspondence, and representation.", points: ["We handle all paperwork", "Regular status updates"] },
            ].map((step, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-2xl mb-6">{step.num}</div>
                <h3 className="font-heading text-2xl text-white mb-4">{step.title}</h3>
                <p className="font-paragraph text-white/70 mb-6">{step.desc}</p>
                <ul className="space-y-2">
                  {step.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-2 text-white/60 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-background">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-primary font-paragraph text-sm tracking-widest uppercase mb-4 block">Why Choose Us</span>
            <h2 className="font-heading text-4xl md:text-5xl text-secondary mb-4">The LegalAssist Difference</h2>
            <p className="font-paragraph text-secondary/70 text-lg max-w-2xl mx-auto">Professional legal representation that puts your needs first</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className={cn("group relative h-full p-8 rounded-xl transition-all duration-300 hover:-translate-y-1", feature.color)}>
                <div className="w-14 h-14 bg-secondary text-white rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="font-heading text-2xl text-secondary mb-3">{feature.title}</h3>
                <p className="font-paragraph text-secondary/80 leading-relaxed mb-6">{feature.description}</p>
                <div className="space-y-2">
                  {feature.benefits.map((benefit, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-1" />
                      <span className="font-paragraph text-sm text-secondary/75">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-primary font-paragraph text-sm tracking-widest uppercase mb-4 block">Our Services</span>
            <h2 className="font-heading text-4xl md:text-5xl text-white mb-4">How Can We Help?</h2>
            <p className="font-paragraph text-white/70 text-lg max-w-2xl mx-auto">Select a service area to learn more</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Scale, title: "Small Claims Court", desc: "Civil disputes up to $50,000 in Ontario.", link: "/services/small-claims-court" },
              { icon: Home, title: "Landlord & Tenant Board", desc: "Residential tenancy disputes and evictions.", link: "/services/landlord-tenant-board" },
              { icon: AlertCircle, title: "Traffic Tickets", desc: "Speeding, careless driving, and HTA offences.", link: "/services/traffic-tickets" },
              { icon: Users, title: "Human Rights Tribunal", desc: "Discrimination in employment, housing, services.", link: "/services/human-rights-tribunal" },
              { icon: Briefcase, title: "Employment Issues", desc: "Wrongful dismissal and workplace disputes.", link: "/services/employment-issues" },
              { icon: Gavel, title: "Criminal Matters", desc: "Summary conviction offences defence.", link: "/services/criminal-matters" },
            ].map((service, i) => (
              <Link key={i} to={service.link} className="group bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-colors">
                <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-2xl text-white mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="font-paragraph text-white/60 mb-6">{service.desc}</p>
                <span className="flex items-center gap-2 text-primary font-paragraph text-sm">
                  Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-amber-50/50">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-primary font-paragraph text-sm tracking-widest uppercase mb-4 block">Common Questions</span>
            <h2 className="font-heading text-4xl md:text-5xl text-secondary mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-xl border border-secondary/10 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full px-6 py-5 text-left font-heading text-lg text-secondary flex items-center justify-between"
                >
                  {faq.q}
                  <ArrowRight className={cn("w-5 h-5 text-primary transition-transform", openFaq === faq.id && "rotate-90")} />
                </button>
                {openFaq === faq.id && (
                  <div className="px-6 pb-5">
                    <p className="font-paragraph text-secondary/70">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaSectionRef} className="py-20 bg-primary/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-primary font-paragraph text-sm tracking-widest uppercase mb-4 block">Get Started</span>
          <h2 className="font-heading text-4xl md:text-5xl text-secondary mb-6">Ready to discuss your legal matter?</h2>
          <p className="font-paragraph text-secondary/70 text-lg mb-8 max-w-2xl mx-auto">
            Schedule your free 30-minute consultation. We'll listen to your situation and explain your options—no obligation.
          </p>
          <a href="tel:+13658829515" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-paragraph text-lg">
            <Phone className="w-5 h-5" /> Call 365-882-9515
          </a>
          <p className="mt-6 text-secondary/60 text-sm font-paragraph">Licensed Ontario paralegal • Free consultation • No obligation</p>
        </div>
      </section>

      <Footer />
      
      {/* STICKY BAR */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 bg-secondary border-t border-white/10 py-3 px-4 z-50 sm:hidden">
          <a href="tel:+13658829515" className="flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-paragraph">
            <Phone className="w-5 h-5" /> Call Now - Free Consultation
          </a>
        </div>
      )}
    </div>
  );
}
