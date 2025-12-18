import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { ChevronRight, CheckCircle, AlertCircle, FileText, Clock, DollarSign, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FamilyMattersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
                Family Legal Services Provider
              </h1>
              <p className="font-paragraph text-lg text-foreground/80 mb-8">
                Compassionate, professional representation for family law issues. We understand the emotional complexity of family matters and work to achieve fair, practical solutions that prioritize your family's wellbeing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/booking">
                  <Button className="bg-primary hover:bg-primary/90 text-white w-full">
                    Get Started Today
                  </Button>
                </Link>
                <Link to="/booking">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 w-full">
                    Schedule Consultation
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://static.wixstatic.com/media/99571b_52626f36e852448ca59c6a21d26750d4~mv2.png?id=family-matters-hero"
                alt="Family Matters Services"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Critical Disclaimer Section */}
      <section className="w-full py-16 md:py-20 bg-gradient-to-br from-pastelpeach/10 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="bg-white rounded-lg border-l-4 border-primary p-8 shadow-sm">
            <div className="flex gap-4">
              <AlertCircle className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Important: Limited Scope of Paralegal Practice in Family Law</h3>
                <p className="font-paragraph text-foreground/80 mb-4">
                  <strong>Paralegals in Ontario have LIMITED authority in family law matters.</strong> Under Law Society of Ontario regulations, paralegals can only provide representation in specific, uncontested family law matters. Complex, contested, or high-conflict family law cases require lawyer representation.
                </p>
                <p className="font-paragraph text-foreground/80 mb-4">
                  We are transparent about these limitations and will refer you to qualified family lawyers when your matter requires legal representation beyond our scope of practice. Your interests and your family's wellbeing are our priority.
                </p>
                <p className="font-paragraph text-foreground/80">
                  <strong>Authorized Paralegal Services:</strong> Uncontested separations, simple custody arrangements, straightforward support calculations, and basic separation agreement preparation where all parties agree.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="mb-12">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">
              Family Law in Ontario
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-6">
              Family law matters are deeply personal and require compassionate, knowledgeable support. Whether you're navigating separation, divorce, custody arrangements, or support matters, we're here to help guide you through the process.
            </p>
            <p className="font-paragraph text-lg text-foreground/80">
              Our approach emphasizes clear communication, practical solutions, and, where possible, collaborative resolution. We work with you to understand your goals and help you achieve fair outcomes that work for your family.
            </p>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-3xl font-bold text-primary mb-2">Uncontested Matters</div>
              <p className="font-paragraph text-foreground/80">Paralegal representation available</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-3xl font-bold text-primary mb-2">Contested Cases</div>
              <p className="font-paragraph text-foreground/80">Lawyer referral & support</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-3xl font-bold text-primary mb-2">Transparent</div>
              <p className="font-paragraph text-foreground/80">Clear scope & limitations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Scope Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">What We Can Help With</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* What's Included */}
            <div className="bg-pastelgreen/10 rounded-lg p-8 border border-pastelgreen/30">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-8 h-8 text-primary" />
                <h3 className="font-heading text-2xl font-bold text-foreground">Paralegal Services Available</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Uncontested Separations:</strong> Where both parties agree on all terms</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Simple Custody Arrangements:</strong> Agreed parenting plans with no dispute</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Child Support Calculations:</strong> Using Ontario guidelines where parties agree</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Spousal Support:</strong> Basic calculations for agreed amounts</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Separation Agreements:</strong> Drafting for uncontested matters</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Document Preparation:</strong> Forms, affidavits, and court filings</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Family Violence Protection Orders:</strong> Emergency and final orders</span>
                </li>
              </ul>
            </div>

            {/* What's Not Included */}
            <div className="bg-pastelpeach/10 rounded-lg p-8 border border-pastelpeach/30">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-8 h-8 text-primary" />
                <h3 className="font-heading text-2xl font-bold text-foreground">Requires Lawyer Representation</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Contested Custody/Access:</strong> Disputes over parenting arrangements</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Property Division Disputes:</strong> Contested equalization or asset division</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Complex Support Issues:</strong> Disputes over income, deductions, or special expenses</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>High-Conflict Matters:</strong> Cases with significant disagreement or hostility</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Legal Advice:</strong> Interpretation of family law and legal strategy</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Court Representation:</strong> Contested hearings and trials</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Appeals:</strong> Any appeal of family court decisions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Matters */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">Family Law Matters We Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex gap-4 mb-4">
                <Heart className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-heading text-xl font-bold text-foreground">Separation & Divorce</h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">
                Support with uncontested separations, divorce documentation, and agreement preparation where both parties have reached consensus on all terms.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex gap-4 mb-4">
                <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-heading text-xl font-bold text-foreground">Custody & Access</h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">
                Assistance with parenting plans and custody arrangements where parents agree. Contested custody matters require lawyer representation.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex gap-4 mb-4">
                <DollarSign className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-heading text-xl font-bold text-foreground">Child & Spousal Support</h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">
                Calculation and documentation of support obligations using Ontario guidelines. Complex disputes require lawyer involvement.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex gap-4 mb-4">
                <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-heading text-xl font-bold text-foreground">Separation Agreements</h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">
                Drafting and preparation of comprehensive separation agreements for uncontested matters where all parties agree.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex gap-4 mb-4">
                <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-heading text-xl font-bold text-foreground">Family Violence Protection</h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">
                Assistance with emergency and final family violence protection orders to ensure your safety and your children's protection.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex gap-4 mb-4">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-heading text-xl font-bold text-foreground">Document Preparation</h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">
                Preparation of all necessary court forms, affidavits, and documentation for family law proceedings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm h-full">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4">1</div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Initial Consultation</h3>
                <p className="font-paragraph text-foreground/80">
                  We listen to your situation, assess your needs, and clearly explain what we can help with and what requires a lawyer.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm h-full">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4">2</div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Collaborative Planning</h3>
                <p className="font-paragraph text-foreground/80">
                  We work with you and, where possible, the other party to develop practical solutions that work for your family.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm h-full">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4">3</div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Documentation & Support</h3>
                <p className="font-paragraph text-foreground/80">
                  We prepare all necessary documents and provide support throughout the process, with lawyer referrals when needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline & Costs Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">Timeline & Costs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-8 h-8 text-primary" />
                <h3 className="font-heading text-2xl font-bold text-foreground">Estimated Timeline</h3>
              </div>
              <div className="space-y-4 font-paragraph text-foreground/80">
                <div>
                  <p className="font-semibold text-foreground mb-1">Uncontested Matters: 4-12 weeks</p>
                  <p className="text-sm">Simple separations with agreement on all terms</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Contested Matters: 6-18 months</p>
                  <p className="text-sm">Requires lawyer representation and court involvement</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Family Violence Orders: 1-2 weeks</p>
                  <p className="text-sm">Emergency protection available immediately</p>
                </div>
                <p className="text-sm italic pt-4 border-t border-gray-200">Timelines vary based on complexity and court schedules</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-8 h-8 text-primary" />
                <h3 className="font-heading text-2xl font-bold text-foreground">Cost Structure</h3>
              </div>
              <div className="space-y-4 font-paragraph text-foreground/80">
                <div>
                  <p className="font-semibold text-foreground mb-1">Hourly Rates</p>
                  <p className="text-sm">Starting at $150-200/hour for paralegal services</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Flat Fees Available</p>
                  <p className="text-sm">For specific services like agreement preparation</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Flexible Payment Plans</p>
                  <p className="text-sm">We work with you to make services affordable</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Initial Consultation</p>
                  <p className="text-sm">Free 30-minute consultation to assess your situation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Information Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">Important Information</h2>
          <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
            <div className="space-y-6 font-paragraph text-foreground/80">
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Paralegal Scope in Family Law</h3>
                <p>
                  Ontario paralegals have LIMITED authority in family law. We can only provide representation in uncontested matters where all parties agree. If your matter becomes contested or complex, we will refer you to a qualified family lawyer. This is not a limitation—it's a protection for your interests.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Transparent Communication</h3>
                <p>
                  We are upfront about what we can and cannot do. During your initial consultation, we will clearly assess your situation and advise whether paralegal services are appropriate or if you need lawyer representation.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Lawyer Referrals</h3>
                <p>
                  If your matter requires lawyer representation, we have relationships with experienced family lawyers and can provide referrals. We will support you throughout the transition to ensure continuity of care.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Confidentiality & Privilege</h3>
                <p>
                  All communications with our paralegals are confidential and protected by solicitor-client privilege. Your privacy and the privacy of your family are paramount.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Regulated by Law Society of Ontario</h3>
                <p>
                  All paralegals are licensed and regulated by the Law Society of Ontario. We adhere to strict professional conduct rules and ethical standards to protect your interests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-secondary/5 py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Need Support with Your Family Matter?
          </h2>
          <p className="font-paragraph text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us for a free consultation. We'll listen to your situation, assess your needs, and clearly explain how we can help.
          </p>
          <Link to="/booking">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg">
              Schedule Your Free Consultation
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
