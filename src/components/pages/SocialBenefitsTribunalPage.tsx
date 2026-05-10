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
        title="Social Benefits Tribunal | ODSP & Ontario Works Appeals | Ontario"
        description="Licensed paralegal representing claimants at the Social Benefits Tribunal (Tribunals Ontario). ODSP and Ontario Works appeals. Internal Review handled first; SBT appeal within 30 days of the Internal Review decision."
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
                Licensed paralegal representation for ODSP and Ontario Works appeals before the Social Benefits Tribunal (part of Tribunals Ontario). We handle Internal Reviews and the SBT appeal that follows.
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
              The Social Benefits Tribunal (SBT) is part of Tribunals Ontario and hears appeals from decisions under the Ontario Works Act, 1997 and the Ontario Disability Support Program Act, 1997. Before you can appeal to the SBT, you must FIRST request an Internal Review with the agency that made the decision (ODSP office or municipal OW office). Only after the Internal Review decision is issued can you appeal to the SBT. Both steps are time-limited and missing either deadline usually ends the appeal.
            </p>
            <p className="font-paragraph text-lg text-foreground/80">
              We handle the Internal Review request, the SBT Notice of Appeal, evidence collection, written submissions, and representation at the hearing. Where the matter ends at the SBT we explain the further options - reconsideration, statutory appeal on a question of law to the Divisional Court (ODSPA s.31 / OWA s.36), or judicial review.
            </p>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-3xl font-bold text-primary mb-2">30 Days</div>
              <p className="font-paragraph text-foreground/80">Internal Review deadline AND SBT appeal deadline (from IR decision)</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-3xl font-bold text-primary mb-2">2 Steps</div>
              <p className="font-paragraph text-foreground/80">Internal Review first, then SBT appeal</p>
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
                  <span className="font-paragraph text-foreground/80"><strong>30 days</strong> from the original decision to request Internal Review (with the ODSP/OW office)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>30 days</strong> from the Internal Review decision to file Notice of Appeal with the SBT</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Late appeals</strong> may be accepted with reasonable explanation, generally up to 1 year (SPPA s.5.1)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Hearing scheduling</strong> varies with SBT caseload - currently several months in many cases</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Written decision</strong> typically issues within 60-120 days after hearing</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Act quickly</strong> - missing the IR or SBT deadline usually ends the appeal</span>
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm h-full">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4">1</div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Initial Consultation</h3>
                <p className="font-paragraph text-foreground/80 text-sm">
                  Review your original decision letter and confirm the deadline status.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm h-full">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4">2</div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Internal Review</h3>
                <p className="font-paragraph text-foreground/80 text-sm">
                  File the Internal Review request with the ODSP/OW office within 30 days of the original decision. This step is mandatory before the SBT.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm h-full">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4">3</div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">SBT Notice of Appeal</h3>
                <p className="font-paragraph text-foreground/80 text-sm">
                  Within 30 days of the Internal Review decision, file the Notice of Appeal and evidence with the Social Benefits Tribunal.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm h-full">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4">4</div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Prepare Case</h3>
                <p className="font-paragraph text-foreground/80 text-sm">
                  Gather medical evidence, financial records, and witness statements; prepare written submissions.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm h-full">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4">5</div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Tribunal Hearing</h3>
                <p className="font-paragraph text-foreground/80 text-sm">
                  Represent you at the SBT hearing (in person or video) before the assigned tribunal member.
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
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">Procedural Familiarity</h3>
                    <p className="font-paragraph text-foreground/80">We know the SBT Rules of Procedure, the disclosure expectations, and how the tribunal weighs medical and financial evidence.</p>
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
                  <span className="font-paragraph text-foreground/80">SBT decisions can be revisited via reconsideration, statutory appeal on a question of law to the Divisional Court (ODSPA s.31 / OWA s.36), or judicial review - but not through general re-hearing</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Post-decision options are limited - 30-day reconsideration window, then Divisional Court</span>
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
                  <p className="font-semibold text-foreground mb-1">Initial Consultation: same day or next day</p>
                  <p className="text-sm">Review your decision letter and confirm where you are in the deadline window</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Internal Review + SBT filing: within the two 30-day windows</p>
                  <p className="text-sm">Internal Review filed first; SBT Notice of Appeal filed within 30 days of the IR decision</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Hearing Scheduled: SBT-driven, often several months</p>
                  <p className="text-sm">SBT schedules subject to its caseload</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Decision: 60-120 days after hearing</p>
                  <p className="text-sm">Tribunal issues written decision</p>
                </div>
                <p className="text-sm italic pt-4 border-t border-gray-200">Total: typically 6-12 months from Internal Review request to SBT decision; varies with caseload</p>
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
                There are TWO 30-day deadlines. First, you have 30 days from the original ODSP/OW decision to request an Internal Review. Then, you have 30 days from the Internal Review decision to file a Notice of Appeal with the SBT. Both must be met. Missing either usually ends the appeal.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Can I appeal a late decision?</h3>
              <p className="font-paragraph text-foreground/80 text-sm">
                Late requests may be accepted at either stage if you have a reasonable explanation, but it is at the SBT's discretion under SPPA s.5.1. The general outer limit is 1 year. Earlier filing is always safer - the SBT does not have to extend the time and a late request can be refused.
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
                You and the Director of ODSP / Administrator of OW present your cases to a tribunal member. We represent you, present medical and financial evidence, examine your witnesses, and respond to the Director's submissions. Most SBT hearings are now conducted by video conference, with telephone or in-person available on request.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Can I appeal a tribunal decision?</h3>
              <p className="font-paragraph text-foreground/80 text-sm">
                Yes, but in narrow channels: (1) reconsideration by the SBT itself within 30 days; (2) statutory appeal on a question of law to the Divisional Court under ODSPA s.31 or OWA s.36 within 30 days; (3) judicial review under the Judicial Review Procedure Act in limited circumstances. None of these is a general re-hearing on the facts - the original SBT findings of fact normally stand.
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
            Contact us today. We will review your decision letter, confirm the Internal Review and SBT deadline status, and explain the next step on your file.
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
