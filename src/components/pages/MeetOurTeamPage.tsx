import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Phone, Award, Shield, Scale, GraduationCap, Heart, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function MeetOurTeamPage() {
  useEffect(() => {
    document.title = 'Meet Our Team | Licensed Paralegals in London Ontario | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Meet the licensed paralegals at LegalAssist. Our Law Society of Ontario licensed professionals provide expert legal representation across Southwestern Ontario.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="w-full bg-gradient-to-br from-primary/10 via-pastelbeige/40 to-pastellavender/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <nav className="flex items-center justify-center gap-2 text-sm font-paragraph mb-6">
              <Link to="/" className="text-foreground/60 hover:text-primary">Home</Link>
              <span className="text-foreground/40">/</span>
              <Link to="/about" className="text-foreground/60 hover:text-primary">About</Link>
              <span className="text-foreground/40">/</span>
              <span className="text-primary font-medium">Our Team</span>
            </nav>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              Meet Our <span className="text-primary">Team</span>
            </h1>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">
              Our licensed paralegals are dedicated to providing accessible, professional legal representation across Ontario.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="font-paragraph text-sm text-foreground/80">LSO Licensed</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <span className="font-paragraph text-sm text-foreground/80">Fully Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-paragraph text-sm text-foreground/80">Serving SW Ontario</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Johnny Demers */}
      <section id="johnny-demers" className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1">
              <div className="relative">
                <div className="rounded-xl overflow-hidden shadow-xl aspect-[3/4] bg-pastellavender/30">
                  <Image
                    src="https://static.wixstatic.com/media/99571b_placeholder~mv2.jpg"
                    alt="Johnny Demers, Licensed Paralegal"
                    width={400}
                    height={533}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-white rounded-lg shadow-lg p-2 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-foreground">Licensing Candidate</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 bg-pastelbeige/20 rounded-xl p-6">
                <h3 className="font-heading text-lg font-bold text-foreground mb-4">Contact Johnny</h3>
                <a href="mailto:jeanfrancois@legalassist.london" className="flex items-center gap-3 text-foreground/80 hover:text-primary mb-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="font-paragraph text-sm">jeanfrancois@legalassist.london</span>
                </a>
                <a href="tel:3658829515" className="flex items-center gap-3 text-foreground/80 hover:text-primary">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="font-paragraph text-sm">(365) 882-9515</span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-paragraph font-medium">Paralegal Licensing Candidate</span>
                <span className="px-3 py-1 bg-pastelgreen/40 text-foreground rounded-full text-sm font-paragraph font-medium">Co-Founder</span>
              </div>
              <h2 className="font-heading text-4xl font-bold text-foreground mb-2">Johnny Demers</h2>
              <p className="font-paragraph text-xl text-primary font-medium mb-6">Co-Founder & Paralegal Licensing Candidate</p>
              <p className="font-paragraph text-foreground/80 leading-relaxed mb-6">
                Johnny Demers is the co-founder of LegalAssist Paralegal Services. With a deep commitment to accessible justice, Johnny helped establish LegalAssist to provide professional legal representation to individuals and small businesses across Southwestern Ontario.
              </p>
              <p className="font-paragraph text-foreground/80 leading-relaxed mb-8">
                Drawing on his background in law enforcement, Johnny brings a unique perspective to legal matters. His approach emphasizes clear communication, thorough preparation, and a strong understanding of procedural requirements. Johnny takes pride in demystifying the legal process for clients and ensuring they understand their rights at every stage.
              </p>
              <blockquote className="bg-gradient-to-br from-pastelbeige/30 to-pastelpeach/20 rounded-xl p-6 mb-8 border-l-4 border-primary">
                <p className="font-paragraph text-foreground/90 italic">
                  "I co-founded LegalAssist because I believe everyone deserves quality legal representation, regardless of their financial situation. My background in law enforcement gives me a unique understanding of the legal system."
                </p>
                <footer className="mt-3 font-heading font-bold text-foreground">— Johnny Demers</footer>
              </blockquote>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Scale className="w-5 h-5 text-primary" />
                    <h3 className="font-heading font-bold text-foreground">Areas of Practice</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" />Landlord & Tenant</li>
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" />Human Rights Tribunal</li>
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" />Defamation & Slander</li>
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" />Licence Appeal Tribunal</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <h3 className="font-heading font-bold text-foreground">Credentials</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" />Paralegal Licensing Candidate</li>
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" />Law Enforcement Diploma</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Candice Fogarty */}
      <section id="candice-fogarty" className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1 lg:order-2">
              <div className="relative">
                <div className="rounded-xl overflow-hidden shadow-xl aspect-[3/4] bg-pastellavender/30">
                  <Image
                    src="https://static.wixstatic.com/media/99571b_placeholder2~mv2.jpg"
                    alt="Candice Fogarty, Managing Paralegal"
                    width={400}
                    height={533}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 -left-3 bg-white rounded-lg shadow-lg p-2 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-foreground">LSO Licensed</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-foreground mb-4">Contact Candice</h3>
                <a href="mailto:candice@legalassist.london" className="flex items-center gap-3 text-foreground/80 hover:text-primary mb-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="font-paragraph text-sm">candice@legalassist.london</span>
                </a>
                <a href="tel:3658829515" className="flex items-center gap-3 text-foreground/80 hover:text-primary">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="font-paragraph text-sm">(365) 882-9515</span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-2 lg:order-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-paragraph font-medium">P1 Licence Holder</span>
                <span className="px-3 py-1 bg-pastelgreen/40 text-foreground rounded-full text-sm font-paragraph font-medium">Co-Founder</span>
              </div>
              <h2 className="font-heading text-4xl font-bold text-foreground mb-2">Candice Fogarty</h2>
              <p className="font-paragraph text-xl text-primary font-medium mb-6">Co-Founder & Licensed Paralegal</p>
              <p className="font-paragraph text-foreground/80 leading-relaxed mb-6">
                Candice Fogarty is the co-founder and lead paralegal at LegalAssist, bringing exceptional organizational skills and a client-centered approach to the firm. As a Licensed Paralegal and Qualified Addictions Counselor, she offers a unique combination of legal expertise and compassionate understanding.
              </p>
              <p className="font-paragraph text-foreground/80 leading-relaxed mb-8">
                Her dedication to thorough case preparation and compassionate client service has made her invaluable to the team. With a keen eye for detail and a natural ability to connect with clients during stressful times, Candice excels at managing complex case files while maintaining the personal touch that defines LegalAssist's approach.
              </p>
              <blockquote className="bg-gradient-to-br from-pastelbeige/30 to-pastelpeach/20 rounded-xl p-6 mb-8 border-l-4 border-primary">
                <p className="font-paragraph text-foreground/90 italic">
                  "What drives me is seeing the relief on a client's face when they finally understand their situation and know they have someone in their corner. My background in addictions counseling helps me connect with clients going through difficult times."
                </p>
                <footer className="mt-3 font-heading font-bold text-foreground">— Candice Fogarty</footer>
              </blockquote>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Scale className="w-5 h-5 text-primary" />
                    <h3 className="font-heading font-bold text-foreground">Areas of Practice</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" />Landlord & Tenant</li>
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" />Small Claims Court</li>
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" />Provincial Offences</li>
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" />Human Rights Matters</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <h3 className="font-heading font-bold text-foreground">Credentials</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" />Licensed Paralegal (LSO)</li>
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" />Qualified Addictions Counselor</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-primary/10 via-pastelbeige/30 to-pastelpeach/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Ready to Work With Our Team?</h2>
          <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation today to discuss your situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-medium px-8 py-4 rounded-lg hover:bg-primary/90">
              <Calendar className="w-5 h-5" />
              Book Free Consultation
            </Link>
            <Link to="/services" className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-medium px-8 py-4 rounded-lg hover:bg-primary/5">
              View Our Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
