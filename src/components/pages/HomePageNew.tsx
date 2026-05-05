// Homepage - Original hero/banner preserved, optimized content sections below
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone, ArrowRight, Shield, Clock, Scale, Users,
  MessageSquare, Target, Award, ChevronDown,
  Gavel, Home, CreditCard, FileText, Star,
  MapPin, CheckCircle2, MessageCircle, Mail, Calendar,
  AlertCircle, Briefcase
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PrimaryCTA from '@/components/PrimaryCTA';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact';

/* ============================================================
   TESTIMONIALS DATA
   ============================================================ */
const testimonials = [
  {
    name: 'Sarah M.',
    location: 'London, ON',
    text: 'I was facing an eviction with almost no notice. LegalAssist reviewed my situation, identified procedural errors in my landlord\'s application, and represented me at the LTB. The case was dismissed. I couldn\'t have done it alone.',
    service: 'Landlord & Tenant',
    rating: 5,
  },
  {
    name: 'David K.',
    location: 'St. Thomas, ON',
    text: 'After months of trying to collect on an unpaid invoice, I reached out for help. They filed in Small Claims Court, handled all the paperwork, and I received full payment within weeks. Professional and straightforward.',
    service: 'Small Claims Court',
    rating: 5,
  },
  {
    name: 'Maria L.',
    location: 'Woodstock, ON',
    text: 'I didn\'t know if I even had a case after being let go from my job. The free consultation gave me clarity. They explained my rights, laid out my options, and helped me secure a fair severance. I felt informed every step of the way.',
    service: 'Employment Issues',
    rating: 5,
  },
  {
    name: 'James T.',
    location: 'London, ON',
    text: 'Clear communication from the start. No legal jargon, no runaround. They told me exactly what to expect with my Small Claims matter and delivered on every point. The kind of service I wish I had found sooner.',
    service: 'Small Claims Court',
    rating: 5,
  },
  {
    name: 'Priya S.',
    location: 'Stratford, ON',
    text: 'My landlord was withholding my deposit and ignoring my calls. LegalAssist sent a demand letter, filed the appropriate forms, and I had my money back within three weeks. They made a stressful situation manageable.',
    service: 'Landlord & Tenant',
    rating: 5,
  },
];

/* ============================================================
   SERVICES DATA (for new optimized grid)
   ============================================================ */
const services = [
  {
    icon: Gavel,
    title: 'Small Claims Court',
    description: 'Pursue or defend claims up to $50,000 with experienced representation that protects your interests.',
    link: '/services/small-claims-court',
  },
  {
    icon: Home,
    title: 'Landlord & Tenant Disputes',
    description: 'Navigate LTB hearings, evictions, rent disputes, and maintenance issues with confidence.',
    link: '/services/landlord-tenant-board',
  },
  {
    icon: CreditCard,
    title: 'Debt Collection',
    description: 'Recover what you\'re owed through strategic legal action and professional follow-through.',
    link: '/services/debt-collection',
  },
  {
    icon: FileText,
    title: 'Legal Documents',
    description: 'Demand letters, contracts, court filings, and legal correspondence prepared with precision.',
    link: '/services/legal-documents',
  },
];

/* ============================================================
   FAQ DATA (SEO-optimized)
   ============================================================ */
const faqs = [
  {
    q: 'How much does a paralegal cost in Ontario?',
    a: 'Fees vary depending on the complexity of your matter. We offer transparent pricing discussed upfront during your free consultation. Many clients find paralegal services significantly more affordable than hiring a lawyer for matters within our scope of practice.',
  },
  {
    q: 'Do I need a lawyer for Small Claims Court?',
    a: 'In Ontario, you do not need a lawyer for Small Claims Court. Licensed paralegals are authorized to represent you in claims up to $50,000. Many clients prefer paralegal representation because it offers professional advocacy at a lower cost.',
  },
  {
    q: 'Can a paralegal represent me at the Landlord and Tenant Board?',
    a: 'Yes. Licensed paralegals in Ontario are authorized to represent both landlords and tenants at the Landlord and Tenant Board (LTB). This includes filing applications, attending hearings, and negotiating settlements on your behalf.',
  },
  {
    q: 'What happens during the free case review?',
    a: 'During your free case review, we listen to your situation, assess the legal merits, explain your options, and outline potential next steps. There is no pressure and no obligation. The goal is to help you understand where you stand.',
  },
  {
    q: 'How quickly can you take on my case?',
    a: 'We respond to most inquiries within 24 hours. For urgent matters such as pending evictions or court deadlines, we prioritize accordingly. Once retained, we move quickly to protect your interests and meet all filing deadlines.',
  },
];

/* ============================================================
   HOMEPAGE COMPONENT
   ============================================================ */
export default function HomePageNew() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(true);
  const ctaSectionRef = useRef<HTMLElement>(null);

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
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>LegalAssist London | Licensed Paralegal Services in Ontario</title>
        <meta name="description" content="Professional paralegal services in London, Ontario. Small Claims Court, Landlord & Tenant disputes, debt collection, and legal document preparation. Free case review." />
        <link rel="canonical" href="https://legalassist.london" />
      </Helmet>

      <Header />

      <h1 className="sr-only">Licensed Paralegal Services in Ontario</h1>

      {/* ========== ORIGINAL HERO SECTION ========== */}
      <section className="min-h-[85vh] grid lg:grid-cols-2">
        {/* Left: Text Side */}
        <div className="bg-secondary flex items-center p-8 lg:p-16 xl:p-24 order-2 lg:order-1">
          <div className="max-w-xl">
            <span className="text-primary font-paragraph text-sm tracking-widest uppercase mb-6 block">Licensed Ontario Paralegals · LSO #P22020 &amp; #P21479</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-heading leading-tight mb-8">
              Licensed paralegal<br/>representation,<br/><span className="text-primary">on your side.</span>
            </h2>
            <p className="text-white/70 font-paragraph text-lg mb-10 max-w-md">
              Professional representation for traffic tickets, landlord-tenant disputes, small claims court, and more throughout Ontario.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={PHONE_HREF} className="bg-primary text-white px-8 py-4 rounded-lg font-paragraph text-center flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" /> Call {PHONE_DISPLAY}
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
            src="https://static.wixstatic.com/media/99571b_8e05531429e9472d888eec555c78c9f4~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85/banner.jpeg"
            srcSet="https://static.wixstatic.com/media/99571b_8e05531429e9472d888eec555c78c9f4~mv2.jpeg/v1/fill/w_480,h_360,al_c,q_75/banner.jpeg 480w, https://static.wixstatic.com/media/99571b_8e05531429e9472d888eec555c78c9f4~mv2.jpeg/v1/fill/w_768,h_576,al_c,q_80/banner.jpeg 768w, https://static.wixstatic.com/media/99571b_8e05531429e9472d888eec555c78c9f4~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85/banner.jpeg 1200w"
            sizes="(max-width: 768px) 100vw, 50vw"
            alt="Paralegal consultation in London Ontario"
            width={1200}
            height={900}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-secondary/30" />
        </div>
      </section>

      {/* ========== ORIGINAL CONVERSION STRIP ========== */}
      <section className="bg-primary py-4">
        <div className="max-w-[100rem] mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-white text-center">
          <span className="font-paragraph">Need legal help? Call now for a free consultation:</span>
          <a href={PHONE_HREF} className="font-heading font-bold text-xl hover:underline">{PHONE_DISPLAY}</a>
        </div>
      </section>

      {/* ========== ORIGINAL TRUST SIGNALS ========== */}
      <section className="py-12 bg-background">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 space-y-4">
          {/* Quick Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6">
            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-paragraph text-sm font-medium text-secondary">LSO Licensed</span>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-paragraph text-sm font-medium text-secondary">Free 30-Min Consultation</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-paragraph text-sm font-medium text-secondary">24hr Response Time</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full">
              <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-paragraph text-sm font-medium text-secondary">Flat Fee Pricing</span>
            </div>
          </div>

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
                <p className="font-heading font-semibold text-secondary">Response Within 24 Hours</p>
                <p className="text-sm text-secondary/70">Fast turnaround on all inquiries.</p>
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

      {/* ================================================================
          NEW OPTIMIZED CONTENT SECTIONS BELOW
          (User approved everything below the original banner)
         ================================================================ */}

      {/* ========== SERVICES SECTION ========== */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-matte tracking-tight">
              How We Can Help
            </h2>
            <p className="mt-4 text-lg text-matte/60">
              Licensed paralegal services for the legal matters that affect your daily life.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {services.map((service, i) => (
              <Link
                key={i}
                to={service.link}
                className="group relative bg-slate rounded-2xl p-8 transition-all duration-300 hover:bg-matte hover:shadow-2xl"
              >
                <div className="w-12 h-12 rounded-xl bg-matte/5 group-hover:bg-gold/20 flex items-center justify-center mb-6 transition-colors duration-300">
                  <service.icon className="w-6 h-6 text-matte group-hover:text-gold transition-colors duration-300" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-lg font-bold text-matte group-hover:text-white mb-3 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-matte/60 group-hover:text-white/60 leading-relaxed mb-6 transition-colors duration-300">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-dark group-hover:text-gold transition-colors duration-300">
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WHY CHOOSE US ========== */}
      <section className="bg-matte text-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
                Why Clients Choose LegalAssist
              </h2>
              <p className="mt-6 text-lg text-white/60 leading-relaxed">
                We provide professional representation grounded in clarity, strategy, and respect
                for your time and resources. Every client receives the focused attention their matter deserves.
              </p>
              <div className="mt-10 space-y-6">
                {[
                  { icon: MessageSquare, title: 'Clear Communication', text: 'No legal jargon. We explain your situation and options in plain language so you always know where you stand.' },
                  { icon: Target, title: 'Strategic Approach', text: 'Every case is assessed on its merits. We develop a focused strategy tailored to achieve the strongest possible outcome.' },
                  { icon: Scale, title: 'Professional Representation', text: 'Licensed and regulated by the Law Society of Ontario. Experienced in Small Claims Court, LTB, and tribunal proceedings.' },
                  { icon: Users, title: 'Client-Focused Service', text: 'Your matter is not a file number. We are responsive, accessible, and committed to moving your case forward efficiently.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mt-0.5">
                      <item.icon className="w-5 h-5 text-gold" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold mb-1">{item.title}</h3>
                      <p className="text-white/50 leading-relaxed text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust metrics */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Response Time', value: '< 24hrs', icon: Clock },
                { label: 'Free Consultation', value: '30 min', icon: MessageSquare },
                { label: 'LSO Regulated', value: 'Licensed', icon: Shield },
                { label: 'Service Areas', value: 'Ontario', icon: MapPin },
              ].map((stat, i) => (
                <div key={i} className="bg-matte-light rounded-2xl p-8 text-center">
                  <stat.icon className="w-6 h-6 text-gold mx-auto mb-4" aria-hidden="true" />
                  <div className="font-heading text-2xl font-bold text-gold mb-1">{stat.value}</div>
                  <div className="text-sm text-white/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="bg-warm-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-matte tracking-tight">
              What Our Clients Say
            </h2>
            <p className="mt-4 text-lg text-matte/60">
              Real feedback from individuals we have represented across Ontario.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.slice(0, 3).map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-gold text-gold" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-matte/70 leading-relaxed mb-6 text-sm">&ldquo;{t.text}&rdquo;</p>
                <div className="border-t border-slate-dark/50 pt-4">
                  <div className="font-semibold text-matte text-sm">{t.name}</div>
                  <div className="text-xs text-matte/40">{t.location} &mdash; {t.service}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional testimonials */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mt-6">
            {testimonials.slice(3).map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-gold text-gold" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-matte/70 leading-relaxed mb-6 text-sm">&ldquo;{t.text}&rdquo;</p>
                <div className="border-t border-slate-dark/50 pt-4">
                  <div className="font-semibold text-matte text-sm">{t.name}</div>
                  <div className="text-xs text-matte/40">{t.location} &mdash; {t.service}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <PrimaryCTA variant="inline" />
          </div>
        </div>
      </section>

      {/* ========== FAQ SECTION ========== */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-matte tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-0 divide-y divide-slate-dark/50">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full py-6 flex items-center justify-between text-left min-h-[56px] focus-ring rounded"
                  aria-expanded={openFaq === i}
                >
                  <h3 className="font-heading text-lg font-bold text-matte pr-8">{faq.q}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-matte/40 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                {openFaq === i && (
                  <div className="pb-6 pr-12">
                    <p className="text-matte/60 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== LOCATION / LOCAL SEO ========== */}
      <section className="bg-slate py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <h2 className="font-heading text-2xl font-bold text-matte mb-4">
            <Link to="/paralegal-london-ontario" className="hover:text-primary transition-colors">
              Licensed Paralegal in London, Ontario
            </Link>
          </h2>
          <p className="text-matte/60 max-w-2xl mx-auto leading-relaxed mb-6">
            Serving London, Ontario and surrounding areas including St. Thomas, Woodstock, Stratford,
            Kitchener, and communities across Southwestern Ontario.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/landlord-tenant-paralegal-london" className="inline-flex items-center gap-1 bg-white/80 text-matte/80 hover:text-primary px-4 py-2 rounded-lg text-sm font-paragraph transition-colors">
              Landlord &amp; Tenant London
            </Link>
            <Link to="/small-claims-paralegal-london" className="inline-flex items-center gap-1 bg-white/80 text-matte/80 hover:text-primary px-4 py-2 rounded-lg text-sm font-paragraph transition-colors">
              Small Claims Court London
            </Link>
            <Link to="/traffic-ticket-paralegal-london" className="inline-flex items-center gap-1 bg-white/80 text-matte/80 hover:text-primary px-4 py-2 rounded-lg text-sm font-paragraph transition-colors">
              Traffic Tickets London
            </Link>
            <Link to="/hrto-paralegal-london" className="inline-flex items-center gap-1 bg-white/80 text-matte/80 hover:text-primary px-4 py-2 rounded-lg text-sm font-paragraph transition-colors">
              Human Rights Tribunal London
            </Link>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section ref={ctaSectionRef} className="py-20 bg-primary/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-primary font-paragraph text-sm tracking-widest uppercase mb-4 block">Get Started</span>
          <h2 className="font-heading text-4xl md:text-5xl text-secondary mb-6">Ready to discuss your legal matter?</h2>
          <p className="font-paragraph text-secondary/70 text-lg mb-8 max-w-2xl mx-auto">
            Schedule your free 30-minute consultation. We'll listen to your situation and explain your options—no obligation.
          </p>
          <a href={PHONE_HREF} className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-paragraph text-lg">
            <Phone className="w-5 h-5" /> Call {PHONE_DISPLAY}
          </a>
          <p className="mt-6 text-secondary/60 text-sm font-paragraph">Licensed Ontario paralegal &bull; Free consultation &bull; No obligation</p>
        </div>
      </section>

      <Footer />

      {/* ========== STICKY MOBILE BAR (original) ========== */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-secondary border-t border-white/10 py-3 px-4 z-50 sm:hidden"
        style={{
          paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
          transform: showStickyBar ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s ease',
          willChange: 'transform',
        }}
        aria-hidden={!showStickyBar}
      >
        <a href={PHONE_HREF} className="flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-paragraph mb-2">
          <Phone className="w-5 h-5" /> Call Now - Free Consultation
        </a>
        <div className="flex gap-2">
          <a href="mailto:info@legalassist.ca" className="flex-1 flex items-center justify-center gap-2 bg-white/10 text-white py-2.5 rounded-lg font-paragraph text-sm">
            <Mail className="w-4 h-4" /> Email
          </a>
          <a href="sms:+12262725153" className="flex-1 flex items-center justify-center gap-2 bg-white/10 text-white py-2.5 rounded-lg font-paragraph text-sm">
            <MessageCircle className="w-4 h-4" /> Text
          </a>
          <Link to="/booking" className="flex-1 flex items-center justify-center gap-2 bg-white/10 text-white py-2.5 rounded-lg font-paragraph text-sm">
            <Calendar className="w-4 h-4" /> Appt
          </Link>
        </div>
      </div>
    </div>
  );
}
