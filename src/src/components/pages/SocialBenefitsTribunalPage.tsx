import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { CheckCircle, AlertCircle, Users, FileText, Clock, DollarSign, HelpCircle, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SocialBenefitsTribunalPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Social Benefits Tribunal | ODSP & OW Appeals | London Ontario"
        description="Expert representation at Social Benefits Tribunal in London, Ontario. ODSP appeals, Ontario Works disputes & disability benefit hearings. Protect your rights."
        canonical="https://www.legalassist.london/services/social-benefits-tribunal"
      />
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
                Social Benefits Tribunal
              </h1>
              <p className="font-paragraph text-lg text-foreground/80 mb-8">
                Expert representation for social assistance and disability support appeals. We help you navigate the Social Benefits Tribunal to secure the benefits you deserve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/booking">
                  <Button className="bg-primary hover:bg-primary/90 text-white w-full">
                    Schedule Consultation
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 w-full">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://static.wixstatic.com/media/99571b_faf5f604ad2e4e5580802a20f563e710~mv2.png?id=social-benefits-advisor"
                alt="A supportive legal advisor in professional business attire sitting at a desk with a client, reviewing documents together in a bright, modern office setting"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="mb-12">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">
              What is the Social Benefits Tribunal?
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-6">
              The Social Benefits Tribunal (SBT) is an independent tribunal that hears appeals from individuals who have been denied social assistance or disability support benefits in Ontario. If your application for Ontario Works or ODSP (Ontario Disability Support Program) has been denied or terminated, the SBT provides an opportunity to appeal that decision.
            </p>
            <p className="font-paragraph text-lg text-foreground/80">
              Our experienced representatives understand the complex eligibility requirements and appeal procedures. We work to ensure your case is presented effectively and that you receive fair consideration of your circumstances and entitlements.
            </p>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-3xl font-bold text-primary mb-2">30+ Days</div>
              <p className="font-paragraph text-foreground/80">Appeal Deadline from Decision</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-3xl font-bold text-primary mb-2">60%+</div>
              <p className="font-paragraph text-foreground/80">Success Rate with Representation</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-3xl font-bold text-primary mb-2">Free</div>
              <p className="font-paragraph text-foreground/80">Appeal Process (No Filing Fees)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Cases */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">Types of Cases We Handle</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex gap-4 mb-4">
                <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-heading text-xl font-bold text-foreground">Ontario Works (OW) Appeals</h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">
                Appeals for denied or terminated Ontario Works benefits, including disputes over eligibility, income calculations, and work requirements.
              </p>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="font-paragraph text-sm text-foreground/70">Denied initial applications</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="font-paragraph text-sm text-foreground/70">Benefit terminations</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="font-paragraph text-sm text-foreground/70">Overpayment disputes</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex gap-4 mb-4">
                <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-heading text-xl font-bold text-foreground">ODSP Appeals</h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">
                Appeals for Ontario Disability Support Program decisions, including disputes over disability determination and benefit calculations.
              </p>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="font-paragraph text-sm text-foreground/70">Disability determination appeals</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="font-paragraph text-sm text-foreground/70">Benefit amount disputes</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="font-paragraph text-sm text-foreground/70">Termination challenges</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex gap-4 mb-4">
                <Scale className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-heading text-xl font-bold text-foreground">Eligibility Disputes</h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">
                Appeals challenging eligibility determinations, including residency, citizenship, and income assessment issues.
              </p>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="font-paragraph text-sm text-foreground/70">Residency requirements</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="font-paragraph text-sm text-foreground/70">Income and asset calculations</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="font-paragraph text-sm text-foreground/70">Spousal/family status disputes</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex gap-4 mb-4">
                <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-heading text-xl font-bold text-foreground">Special Circumstances</h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">
                Appeals involving complex situations such as medical documentation disputes, hardship claims, and exceptional circumstances.
              </p>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="font-paragraph text-sm text-foreground/70">Medical evidence disputes</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="font-paragraph text-sm text-foreground/70">Hardship and emergency requests</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="font-paragraph text-sm text-foreground/70">Reconsideration requests</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">Eligibility for Appeal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Who Can Appeal */}
            <div className="bg-pastelgreen/10 rounded-lg p-8 border border-pastelgreen/30">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-8 h-8 text-primary" />
                <h3 className="font-heading text-2xl font-bold text-foreground">Who Can Appeal</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Individuals whose Ontario Works application was denied</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">ODSP applicants or recipients with denied/terminated benefits</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Those disputing benefit amounts or calculations</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Individuals facing overpayment claims</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Authorized representatives acting on behalf of applicants</span>
                </li>
              </ul>
            </div>

            {/* Appeal Deadlines */}
            <div className="bg-pastelpeach/10 rounded-lg p-8 border border-pastelpeach/30">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-8 h-8 text-primary" />
                <h3 className="font-heading text-2xl font-bold text-foreground">Important Deadlines</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>30 days</strong> from decision notice to file appeal</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Late appeals</strong> possible with good reason (within 1 year)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Hearing scheduled</strong> typically within 60-90 days</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Decision issued</strong> within 30 days of hearing</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Act quickly</strong> - missing deadlines can result in dismissal</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Appeal Process */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">The Appeal Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="relative">
              <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm h-full">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4">1</div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Initial Consultation</h3>
                <p className="font-paragraph text-foreground/80 text-sm">
                  We review your decision notice and assess the strength of your appeal case.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm h-full">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4">2</div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">File Appeal</h3>
                <p className="font-paragraph text-foreground/80 text-sm">
                  We prepare and file your appeal within the 30-day deadline with supporting documentation.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm h-full">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4">3</div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Prepare Case</h3>
                <p className="font-paragraph text-foreground/80 text-sm">
                  We gather evidence, organize documents, and prepare your testimony for the hearing.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm h-full">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4">4</div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Tribunal Hearing</h3>
                <p className="font-paragraph text-foreground/80 text-sm">
                  We represent you at the hearing and present your case to the tribunal member.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">Benefits of Professional Representation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="bg-pastelgreen/10 rounded-lg p-6 border border-pastelgreen/30">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">Increased Success Rate</h3>
                    <p className="font-paragraph text-foreground/80">Applicants with representation have significantly higher success rates than those representing themselves.</p>
                  </div>
                </div>
              </div>

              <div className="bg-pastelgreen/10 rounded-lg p-6 border border-pastelgreen/30">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">Expert Knowledge</h3>
                    <p className="font-paragraph text-foreground/80">We understand complex eligibility rules, regulations, and tribunal procedures that affect your case.</p>
                  </div>
                </div>
              </div>

              <div className="bg-pastelgreen/10 rounded-lg p-6 border border-pastelgreen/30">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">Strong Documentation</h3>
                    <p className="font-paragraph text-foreground/80">We ensure all necessary evidence and documentation is properly organized and presented.</p>
                  </div>
                </div>
              </div>

              <div className="bg-pastelgreen/10 rounded-lg p-6 border border-pastelgreen/30">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">Effective Advocacy</h3>
                    <p className="font-paragraph text-foreground/80">We present your case persuasively and respond effectively to the ministry's arguments.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-pastelgreen/10 rounded-lg p-6 border border-pastelgreen/30">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">Reduced Stress</h3>
                    <p className="font-paragraph text-foreground/80">Let us handle the legal complexities while you focus on your situation and well-being.</p>
                  </div>
                </div>
              </div>

              <div className="bg-pastelgreen/10 rounded-lg p-6 border border-pastelgreen/30">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">Deadline Management</h3>
                    <p className="font-paragraph text-foreground/80">We ensure all critical deadlines are met and your appeal is filed properly and on time.</p>
                  </div>
                </div>
              </div>

              <div className="bg-pastelgreen/10 rounded-lg p-6 border border-pastelgreen/30">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">Hearing Preparation</h3>
                    <p className="font-paragraph text-foreground/80">We thoroughly prepare you for the hearing and help you present your testimony effectively.</p>
                  </div>
                </div>
              </div>

              <div className="bg-pastelgreen/10 rounded-lg p-6 border border-pastelgreen/30">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">Post-Decision Support</h3>
                    <p className="font-paragraph text-foreground/80">We assist with implementation of favorable decisions and further appeals if necessary.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Provide */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">What We Provide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* What's Included */}
            <div className="bg-pastelgreen/10 rounded-lg p-8 border border-pastelgreen/30">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-8 h-8 text-primary" />
                <h3 className="font-heading text-2xl font-bold text-foreground">Services Included</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Initial case assessment and consultation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Appeal preparation and filing</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Evidence gathering and organization</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Written submissions to the tribunal</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Full representation at tribunal hearing</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Post-decision follow-up and support</span>
                </li>
              </ul>
            </div>

            {/* What's Not Included */}
            <div className="bg-pastelpeach/10 rounded-lg p-8 border border-pastelpeach/30">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-8 h-8 text-primary" />
                <h3 className="font-heading text-2xl font-bold text-foreground">Important Notes</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">We cannot guarantee specific outcomes</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Tribunal decisions are final and binding</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Limited appeal options after tribunal decision</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">You must provide accurate information</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Timely action is critical - deadlines are strict</span>
                </li>
              </ul>
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
                <h3 className="font-heading text-2xl font-bold text-foreground">Typical Timeline</h3>
              </div>
              <div className="space-y-4 font-paragraph text-foreground/80">
                <div>
                  <p className="font-semibold text-foreground mb-1">Initial Consultation: 1 week</p>
                  <p className="text-sm">Review your decision and assess your case</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Appeal Filing: 2-4 weeks</p>
                  <p className="text-sm">Prepare and file appeal within 30-day deadline</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Hearing Scheduled: 60-90 days</p>
                  <p className="text-sm">Tribunal schedules your hearing date</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Decision: 30 days after hearing</p>
                  <p className="text-sm">Tribunal issues written decision</p>
                </div>
                <p className="text-sm italic pt-4 border-t border-gray-200">Total: 4-6 months from initial consultation to decision</p>
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
                  <p className="text-sm">$150-250/hour depending on complexity and experience</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Flat Fees Available</p>
                  <p className="text-sm">For straightforward appeals with clear scope</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">No Tribunal Filing Fees</p>
                  <p className="text-sm">Appeals to the tribunal are free - no filing costs</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Initial Consultation</p>
                  <p className="text-sm">Free 30-minute consultation to assess your case</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">What is the 30-day deadline?</h3>
              <p className="font-paragraph text-foreground/80 text-sm">
                You have 30 days from the date on the decision notice to file an appeal with the Social Benefits Tribunal. Missing this deadline can result in your appeal being dismissed.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Can I appeal a late decision?</h3>
              <p className="font-paragraph text-foreground/80 text-sm">
                Yes, you can request a late appeal if you have a good reason for missing the 30-day deadline. However, you must apply within one year of the decision.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Do I need medical evidence for ODSP appeals?</h3>
              <p className="font-paragraph text-foreground/80 text-sm">
                Yes, ODSP appeals require medical evidence supporting your disability claim. We help gather and organize this documentation to strengthen your case.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">What happens at the hearing?</h3>
              <p className="font-paragraph text-foreground/80 text-sm">
                You and the ministry present your cases to a tribunal member. We represent you, present evidence, and respond to the ministry's arguments. Hearings are typically conducted in person or by video.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Can I appeal a tribunal decision?</h3>
              <p className="font-paragraph text-foreground/80 text-sm">
                Tribunal decisions are final and binding. There is no appeal to a higher court, though judicial review is possible in limited circumstances.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">What if I win my appeal?</h3>
              <p className="font-paragraph text-foreground/80 text-sm">
                If you win, the tribunal orders the ministry to approve your benefits or reinstate them. You may also be entitled to back pay from the date of the original decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-secondary/5 py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Don't Let Your Appeal Deadline Pass
          </h2>
          <p className="font-paragraph text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation. We'll review your decision and help you understand your options.
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
