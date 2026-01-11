import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Briefcase, Shield, Award } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              About LegalAssist
            </h1>
            <p className="font-paragraph text-lg text-foreground/80">
              Professional paralegal services providing accessible legal representation across Ontario. We're committed to making quality legal assistance available to individuals and small businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                At LegalAssist, we believe that everyone deserves access to quality legal representation. Our mission is to provide professional, affordable, and compassionate paralegal services that empower individuals and small businesses to navigate Ontario's legal system with confidence.
              </p>
              <p className="font-paragraph text-lg text-foreground/80 mb-8">
                We specialize in a broad range of legal matters within the authorized scope of paralegal practice, from criminal defense to landlord-tenant disputes, human rights matters, and small claims court representation.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-1">Licensed & Regulated</h3>
                    <p className="font-paragraph text-foreground/80 text-sm">All paralegals are licensed by the Law Society of Ontario</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-1">Client-Focused</h3>
                    <p className="font-paragraph text-foreground/80 text-sm">We prioritize your needs and keep you informed every step of the way</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-1">Affordable Rates</h3>
                    <p className="font-paragraph text-foreground/80 text-sm">Quality representation at rates that work for your budget</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://static.wixstatic.com/media/99571b_9954538ec5b24b4a8a245180de229f4b~mv2.png?id=about-mission"
                alt="LegalAssist team providing professional paralegal services"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12 text-center">
            Why Choose LegalAssist
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                Professional Excellence
              </h3>
              <p className="font-paragraph text-foreground/80">
                Our paralegals are fully licensed and maintain the highest professional standards in all matters.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                Personalized Approach
              </h3>
              <p className="font-paragraph text-foreground/80">
                We take time to understand your unique situation and tailor our services to your specific needs.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                Broad Expertise
              </h3>
              <p className="font-paragraph text-foreground/80">
                We handle a wide range of legal matters within the paralegal scope of practice across Ontario.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                Your Advocate
              </h3>
              <p className="font-paragraph text-foreground/80">
                We fight for your rights and work tirelessly to achieve the best possible outcomes for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Do Paralegals Do Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-8">
              What Do Paralegals Do in Ontario?
            </h2>
            
            <div className="prose prose-lg prose-stone text-foreground/80 font-paragraph mb-12">
              <p className="text-lg leading-relaxed mb-6">
                Paralegals in Ontario are licensed professionals regulated by the Law Society of Ontario. They provide legal services within a defined scope of practice, offering professional representation and assistance at a more affordable rate than lawyers while maintaining the same professional standards and ethical obligations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-pastelbeige/20 rounded-lg p-8 border border-pastelbeige">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Authorized Practice Areas
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="font-paragraph text-foreground/80"><strong>Provincial Offences:</strong> Traffic tickets, bylaw violations, and other provincial offences</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="font-paragraph text-foreground/80"><strong>Summary Conviction Offences:</strong> Criminal charges tried in Provincial Court</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="font-paragraph text-foreground/80"><strong>Small Claims Court:</strong> Civil disputes up to $50,000</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="font-paragraph text-foreground/80"><strong>Landlord and Tenant Board:</strong> Residential tenancy disputes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="font-paragraph text-foreground/80"><strong>Human Rights Tribunal:</strong> Discrimination and human rights complaints</span>
                  </li>
                </ul>
              </div>

              <div className="bg-pastelgreen/20 rounded-lg p-8 border border-pastelgreen/30">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Additional Services
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="font-paragraph text-foreground/80"><strong>Mediation Services:</strong> Dispute resolution and settlement negotiation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="font-paragraph text-foreground/80"><strong>Commissioner of Oaths:</strong> Administration of oaths and statutory declarations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="font-paragraph text-foreground/80"><strong>Notary Public Services:</strong> Document certification and witnessing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="font-paragraph text-foreground/80"><strong>Legal Advice:</strong> Guidance within the scope of paralegal practice</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-pastellavender/20 rounded-lg p-8 border border-pastellavender/30 mb-12">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                What Paralegals Cannot Do
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4">
                While paralegals have broad authority, there are important limitations to their scope of practice:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Cannot represent clients in Superior Court or Court of Appeal</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Cannot handle indictable offences (serious criminal charges)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Cannot provide services in family law, real estate conveyancing, or wills/estates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Cannot appear in certain specialized tribunals or courts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Cannot provide legal services outside Ontario</span>
                </li>
              </ul>
            </div>

            <div className="bg-pastelpeach/20 rounded-lg p-8 border border-pastelpeach/30">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                Regulation & Professional Standards
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4">
                All paralegals in Ontario are licensed and regulated by the Law Society of Ontario. This means:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="font-paragraph text-foreground/80">Paralegals must meet strict educational and professional requirements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="font-paragraph text-foreground/80">They are bound by the same ethical rules and professional conduct standards as lawyers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="font-paragraph text-foreground/80">Client communications are protected by solicitor-client privilege</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="font-paragraph text-foreground/80">They maintain professional liability insurance</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="font-paragraph text-foreground/80">They are subject to discipline and complaints procedures</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-r from-primary/10 to-pastelbeige/30">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-6">
            Ready to Get Professional Legal Help?
          </h2>
          <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            Our licensed paralegals are ready to assist you with your legal matter. Schedule a free consultation today to discuss your situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph px-8 py-4 rounded-lg transition-all hover:bg-primary/90"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/services"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph px-8 py-4 rounded-lg transition-all hover:bg-primary/5"
            >
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
