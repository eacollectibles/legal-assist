import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Users, Shield, Clock, MapPin, FileText, Scale, CheckCircle, AlertTriangle, Building2, Briefcase, Home, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQSection } from '@/components/FAQSection';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/phone-constants';

export default function HRTOLondonPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 pt-4">
        <Breadcrumbs />
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Users className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Human Rights Tribunal Paralegal — London, Ontario</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              HRTO Paralegal in London, Ontario
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-4 max-w-3xl">
              Licensed paralegal representation for Human Rights Tribunal of Ontario (HRTO) applications in London and Middlesex County. We help London residents file and defend discrimination complaints for employment, housing, and services under the Ontario Human Rights Code.
            </p>
            <p className="font-paragraph text-base text-foreground/60 mb-8 max-w-3xl">
              If you have experienced discrimination in a London workplace, been denied housing based on a protected ground, or received unequal treatment when accessing services, you have the right to file a complaint with the HRTO. Legal Assist provides experienced paralegal representation to help you assert your human rights and seek appropriate remedies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">
                Book Free Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5">
                <Phone className="w-5 h-5" /> {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Protected Grounds */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Types of Discrimination We Handle in London</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-6 max-w-3xl mx-auto">
            The Ontario Human Rights Code protects London residents from discrimination based on protected grounds in employment, housing, and services. We represent applicants and respondents in all types of HRTO matters.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/services/workplace-discrimination" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Briefcase className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Employment Discrimination</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Discrimination in hiring, termination, promotion, pay, and workplace conditions at London employers based on race, gender, disability, age, or other protected grounds.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">Includes failure to accommodate disability, pregnancy discrimination, and racial profiling in London workplaces.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/services/sexual-harassment" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Shield className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Sexual &amp; Workplace Harassment</h3>
              <p className="font-paragraph text-foreground/70 mb-2">HRTO applications for sexual harassment, poisoned work environment, and harassment based on gender, sexual orientation, or gender identity.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">We help London employees hold employers accountable for failing to address workplace harassment.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/services/human-rights" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Home className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Housing Discrimination</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Discrimination by London landlords in rental applications, evictions, or housing conditions based on family status, race, disability, receipt of public assistance, or other grounds.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">London&apos;s tight rental market makes housing discrimination complaints especially common and impactful.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/services/service-discrimination" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Users className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Service Discrimination</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Discrimination when accessing services, facilities, or goods in London — including healthcare, education, retail, and government services.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">We handle complaints about denial of service, unequal treatment, and failure to accommodate at London businesses and institutions.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/services/reprisal-claims" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><AlertTriangle className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Reprisal Claims</h3>
              <p className="font-paragraph text-foreground/70 mb-2">If your London employer retaliated against you for asserting your human rights — through demotion, termination, or hostile treatment — you may have a reprisal claim.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">Reprisal is a serious violation of the Human Rights Code and can result in significant compensation.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>

            <Link to="/services/pregnancy-discrimination" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all hover:shadow-lg group">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Heart className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Disability &amp; Accommodation</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Failure to accommodate disability in the workplace, education, or services. Includes physical disabilities, mental health conditions, and addiction.</p>
              <p className="font-paragraph text-foreground/50 text-sm mb-4">London employers have a duty to accommodate to the point of undue hardship. We enforce that obligation.</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* HRTO Process */}
      <section className="py-16 md:py-24 bg-pastelbeige/10">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">The HRTO Process for London Applicants</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">
            Filing a human rights complaint can feel overwhelming. We guide London clients through every step, from the initial application to the final hearing and remedies.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div>
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 font-heading font-bold text-lg">1</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Free Assessment</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We review your situation, identify the protected grounds involved, and advise whether you have a viable human rights complaint. There is a one-year limitation period, so acting quickly is important.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 font-heading font-bold text-lg">2</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Application Filing</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We prepare and file your Form 1 application with the HRTO, clearly articulating the discrimination, the protected grounds, and the remedies you are seeking.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 font-heading font-bold text-lg">3</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Mediation</h3>
              <p className="font-paragraph text-foreground/70 text-sm">The HRTO typically offers mediation before a hearing. We negotiate aggressively on your behalf to secure fair compensation, policy changes, or other appropriate remedies.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 font-heading font-bold text-lg">4</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Hearing Representation</h3>
              <p className="font-paragraph text-foreground/70 text-sm">If mediation does not resolve the matter, we represent you at the HRTO hearing with organized evidence, witness preparation, and persuasive legal submissions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Remedies */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">HRTO Remedies Available to London Applicants</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">
            The Human Rights Tribunal of Ontario can order a wide range of remedies if discrimination is found. These remedies are designed to compensate victims and prevent future discrimination.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Scale className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Monetary Compensation</h3>
              <p className="font-paragraph text-foreground/70 text-sm">General damages for injury to dignity, lost wages, and out-of-pocket expenses. Awards for London discrimination cases can range from thousands to tens of thousands of dollars.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Briefcase className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Reinstatement</h3>
              <p className="font-paragraph text-foreground/70 text-sm">If you were wrongfully terminated due to discrimination, the HRTO can order your London employer to reinstate you to your position.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><FileText className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Policy Changes</h3>
              <p className="font-paragraph text-foreground/70 text-sm">The Tribunal can order the respondent to implement anti-discrimination policies, training programs, and accommodation procedures.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Non-Monetary Orders</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Apologies, reference letters, accommodation of disability, or any other non-monetary remedy the Tribunal deems appropriate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Serving Areas */}
      <section className="py-16 md:py-24 bg-pastelbeige/10">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Serving London &amp; Southwestern Ontario</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">We represent HRTO applicants and respondents throughout London and the surrounding region:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {['London', 'St. Thomas', 'Strathroy', 'Woodstock', 'Ingersoll', 'Dorchester', 'Komoka', 'Delaware', 'Lambeth', 'Byron', 'Lucan', 'Arva'].map((city) => (
              <div key={city} className="bg-white rounded-lg py-3 px-4 text-center border border-pastelbeige shadow-sm">
                <span className="font-paragraph text-sm text-foreground">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />
      <RelatedServices services={relatedServicesConfig.general} />

      {/* CTA */}
      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Experienced Discrimination in London?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-4 max-w-2xl mx-auto">
            You do not have to face discrimination alone. Whether it happened at a London workplace, in a rental application, or when accessing services, Legal Assist can help you file a human rights complaint and fight for the compensation and changes you deserve.
          </p>
          <p className="font-paragraph text-base text-secondary-foreground/60 mb-8 max-w-2xl mx-auto">
            Contact us today for a free, confidential consultation. Remember, you have one year from the date of the discriminatory act to file with the HRTO.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">
              Book Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary-foreground/10">
              <Phone className="w-5 h-5" /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
