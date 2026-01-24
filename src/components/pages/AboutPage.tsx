import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Briefcase, Shield, Award, Gavel, DollarSign, Zap } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About LegalAssist | Professional Paralegal Services in Ontario';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Learn about LegalAssist Paralegal Services. We provide accessible, professional legal representation across Ontario for individuals and small businesses.');
    }
  }, []);

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

      {/* Client Focus Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="mb-12">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6 text-center">
              Our Client Focus
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 text-center max-w-3xl mx-auto">
              We serve a diverse range of clients facing distinct legal challenges. Our commitment is to understand your specific situation and provide tailored solutions that address your unique needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Individuals Facing Criminal Charges */}
            <div className="bg-gradient-to-br from-pastelbeige/30 to-transparent rounded-lg p-8 border border-pastelbeige">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Gavel className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  Individuals Facing Criminal Charges
                </h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">
                Whether you're dealing with a traffic ticket, provincial offence, or summary conviction criminal charge, we provide expert defense representation. We help you understand the charges, navigate the court system, and work toward the best possible outcome.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-sm text-foreground/80">Traffic tickets and provincial offences</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-sm text-foreground/80">Summary conviction criminal charges</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-sm text-foreground/80">Bail hearings and release proceedings</span>
                </li>
              </ul>
            </div>

            {/* Tenants and Landlords */}
            <div className="bg-gradient-to-br from-pastelgreen/20 to-transparent rounded-lg p-8 border border-pastelgreen/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  Tenants and Landlords
                </h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">
                Residential tenancy disputes can be stressful and complex. We represent both tenants and landlords in disputes before the Landlord and Tenant Board, addressing issues like eviction, rent disputes, and maintenance concerns.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-sm text-foreground/80">Eviction defense and tenant rights</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-sm text-foreground/80">Rent disputes and payment issues</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-sm text-foreground/80">Maintenance and habitability claims</span>
                </li>
              </ul>
            </div>

            {/* Small Business Owners */}
            <div className="bg-gradient-to-br from-pastellavender/20 to-transparent rounded-lg p-8 border border-pastellavender/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  Small Business Owners
                </h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">
                Small business owners face unique legal challenges including customer disputes, employment issues, and contract matters. We provide practical guidance and representation to protect your business interests.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-sm text-foreground/80">Small Claims Court representation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-sm text-foreground/80">Employment dispute resolution</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-sm text-foreground/80">Contract and customer disputes</span>
                </li>
              </ul>
            </div>

            {/* Individuals Facing Discrimination */}
            <div className="bg-gradient-to-br from-pastelpeach/20 to-transparent rounded-lg p-8 border border-pastelpeach/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  Individuals Facing Discrimination
                </h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">
                Discrimination in employment, housing, or public services is unacceptable. We help individuals pursue human rights complaints and navigate the Human Rights Tribunal of Ontario to seek justice and remedies.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-sm text-foreground/80">Employment discrimination claims</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-sm text-foreground/80">Housing discrimination complaints</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-sm text-foreground/80">Human Rights Tribunal representation</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Client Commitment Statement */}
          <div className="bg-gradient-to-r from-primary/5 to-pastelbeige/20 rounded-lg p-8 border border-primary/10">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
              Our Commitment to Your Success
            </h3>
            <p className="font-paragraph text-lg text-foreground/80 mb-6">
              Every client's situation is unique. We don't believe in one-size-fits-all solutions. Instead, we take the time to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-bold text-foreground mb-1">Listen Carefully</p>
                  <p className="font-paragraph text-sm text-foreground/80">Understand your specific circumstances, concerns, and goals</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-bold text-foreground mb-1">Provide Clear Guidance</p>
                  <p className="font-paragraph text-sm text-foreground/80">Explain your options in plain language so you can make informed decisions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-bold text-foreground mb-1">Deliver Results</p>
                  <p className="font-paragraph text-sm text-foreground/80">Work tirelessly to achieve the best possible outcome for your situation</p>
                </div>
              </div>
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

      {/* Paralegals vs Lawyers Comparison Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6 text-center">
              Paralegals vs. Lawyers: Understanding the Differences
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 text-center">
              While both paralegals and lawyers provide legal services, there are important distinctions in their education, training, scope of practice, and costs. Understanding these differences will help you determine which professional is right for your legal needs.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary text-secondary-foreground border-b border-gray-200">
                    <th className="px-6 py-4 text-left font-heading font-bold">Aspect</th>
                    <th className="px-6 py-4 text-left font-heading font-bold">Paralegals</th>
                    <th className="px-6 py-4 text-left font-heading font-bold">Lawyers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-heading font-semibold text-foreground">Education & Training</td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      2-year paralegal diploma or certificate program from an accredited institution; Licensing exam through Law Society of Ontario
                    </td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      3-year law degree (JD); Law school; Bar exam; Additional licensing requirements
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-heading font-semibold text-foreground">Licensing & Regulation</td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Licensed and regulated by the Law Society of Ontario; Must maintain professional liability insurance
                    </td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Licensed and regulated by the Law Society of Ontario; Must maintain professional liability insurance
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-heading font-semibold text-foreground">Scope of Practice</td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Limited to defined areas: Provincial Court criminal matters, Small Claims Court (up to $50,000), Landlord-Tenant Board, Human Rights Tribunal, and other specified tribunals
                    </td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Broad scope across all areas of law: Superior Court, Court of Appeal, family law, real estate, corporate law, and all tribunals
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-heading font-semibold text-foreground">Court Representation</td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Can represent clients in Provincial Court and Small Claims Court; Cannot appear in Superior Court or Court of Appeal
                    </td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Can represent clients in all courts including Superior Court, Court of Appeal, and Supreme Court of Canada
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-heading font-semibold text-foreground">Criminal Matters</td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Can handle summary conviction offences and provincial offences; Cannot handle indictable offences or serious criminal charges
                    </td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Can handle all criminal matters including summary conviction, indictable offences, and serious criminal charges
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-heading font-semibold text-foreground">Specialized Areas</td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Cannot provide services in family law, real estate conveyancing, wills, estates, or corporate law
                    </td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Can specialize in all areas including family law, real estate, wills, estates, corporate law, and more
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-heading font-semibold text-foreground">Cost</td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Generally more affordable; Hourly rates typically $100-250/hour depending on experience and location
                    </td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Generally more expensive; Hourly rates typically $200-500+/hour depending on experience and specialization
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-heading font-semibold text-foreground">Professional Conduct</td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Bound by Law Society of Ontario Rules of Professional Conduct; Subject to discipline and complaints procedures
                    </td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Bound by Law Society of Ontario Rules of Professional Conduct; Subject to discipline and complaints procedures
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-heading font-semibold text-foreground">Solicitor-Client Privilege</td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Communications are protected by solicitor-client privilege; Confidentiality is guaranteed
                    </td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Communications are protected by solicitor-client privilege; Confidentiality is guaranteed
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Differences Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* When to Choose a Paralegal */}
            <div className="bg-pastelgreen/20 rounded-lg p-8 border border-pastelgreen/30">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-8 h-8 text-primary" />
                <h3 className="font-heading text-2xl font-bold text-foreground">When to Choose a Paralegal</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">Your matter is in Provincial Court or Small Claims Court</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">You're dealing with a traffic ticket or provincial offence</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">You have a landlord-tenant dispute</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">You're facing a summary conviction criminal charge</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">You need representation at the Human Rights Tribunal</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">You want affordable legal representation for authorized matters</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">You need mediation or dispute resolution services</span>
                </li>
              </ul>
            </div>

            {/* When to Choose a Lawyer */}
            <div className="bg-pastelpeach/20 rounded-lg p-8 border border-pastelpeach/30">
              <div className="flex items-center gap-3 mb-6">
                <Gavel className="w-8 h-8 text-primary" />
                <h3 className="font-heading text-2xl font-bold text-foreground">When to Choose a Lawyer</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">Your matter involves Superior Court or Court of Appeal</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">You're facing serious criminal charges (indictable offences)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">You need family law services (divorce, custody, support)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">You need real estate or property law services</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">You need wills, estates, or probate services</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">You need corporate or business law services</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">Your matter requires specialized legal expertise</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-pastellavender/20 rounded-lg p-8 border border-pastellavender/30">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Important Notes</h3>
            <div className="space-y-4 font-paragraph text-foreground/80">
              <p>
                <strong>Both Are Regulated Professionals:</strong> Both paralegals and lawyers are licensed and regulated by the Law Society of Ontario. Both must adhere to strict professional conduct standards and ethical obligations. Both maintain professional liability insurance and are subject to discipline procedures.
              </p>
              <p>
                <strong>Solicitor-Client Privilege:</strong> Communications with both paralegals and lawyers are protected by solicitor-client privilege, meaning they cannot be forced to disclose what you tell them without your consent.
              </p>
              <p>
                <strong>Cost Savings:</strong> Paralegals typically charge lower hourly rates than lawyers, making them an affordable option for matters within their scope of practice. This can result in significant cost savings for clients.
              </p>
              <p>
                <strong>Scope Limitations:</strong> Paralegals cannot handle all legal matters. If your matter falls outside their scope of practice, you will need to retain a lawyer. We are transparent about our limitations and will refer you to a lawyer when necessary.
              </p>
              <p>
                <strong>Referrals Available:</strong> If you need services outside the paralegal scope of practice, we can refer you to experienced lawyers who can assist with your matter.
              </p>
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
            Our licensed paralegals are ready to assist you with your legal matter. Schedule a free consultation today to discuss your situation and determine if paralegal services are right for you.
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
