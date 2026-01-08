import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { CheckCircle, AlertCircle, Users, Handshake, Clock, DollarSign, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MediationServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
                Mediation Services
              </h1>
              <p className="font-paragraph text-lg text-foreground/80 mb-8">
                Professional mediation to resolve disputes collaboratively and cost-effectively. Our experienced mediators help parties find mutually beneficial solutions while maintaining control over the outcome.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
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
                src="https://static.wixstatic.com/media/99571b_45e4ddef1b79494a92d7e0856a1601a0~mv2.png?id=mediation-handshake-professionals"
                alt="Two professional business people in formal business attire shaking hands in a bright, modern neutral office setting representing collaboration and resolution"
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
              What is Mediation?
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-6">
              Mediation is a voluntary, confidential process where a neutral third party (mediator) helps disputing parties communicate effectively and reach a mutually acceptable resolution. Unlike litigation or arbitration, mediation empowers the parties to control the outcome and maintain their relationship.
            </p>
            <p className="font-paragraph text-lg text-foreground/80">
              Our certified mediators have extensive experience facilitating productive discussions in various dispute contexts. We create a safe, neutral environment where both parties can express their concerns and work toward creative solutions that address everyone's interests.
            </p>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-3xl font-bold text-primary mb-2">80%+</div>
              <p className="font-paragraph text-foreground/80">Success Rate in Reaching Agreement</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-3xl font-bold text-primary mb-2">50-70%</div>
              <p className="font-paragraph text-foreground/80">Cost Savings vs. Litigation</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-3xl font-bold text-primary mb-2">Faster</div>
              <p className="font-paragraph text-foreground/80">Resolution Timeline</p>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Mediation */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">Types of Mediation We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex gap-4 mb-4">
                <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-heading text-xl font-bold text-foreground">Family Mediation</h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">
                Mediation for family disputes including separation, divorce, custody arrangements, child support, spousal support, and property division. We help families navigate these sensitive matters with dignity and respect.
              </p>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="font-paragraph text-sm text-foreground/70">Separation and divorce agreements</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="font-paragraph text-sm text-foreground/70">Custody and access arrangements</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="font-paragraph text-sm text-foreground/70">Support calculations and modifications</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex gap-4 mb-4">
                <Handshake className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-heading text-xl font-bold text-foreground">Commercial Mediation</h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">
                Mediation for business disputes including contract disagreements, partnership disputes, employment conflicts, and vendor/supplier issues. We help businesses preserve relationships while resolving disputes efficiently.
              </p>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="font-paragraph text-sm text-foreground/70">Contract and payment disputes</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="font-paragraph text-sm text-foreground/70">Partnership and shareholder conflicts</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="font-paragraph text-sm text-foreground/70">Employment and workplace disputes</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex gap-4 mb-4">
                <MessageSquare className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-heading text-xl font-bold text-foreground">Civil Mediation</h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">
                Mediation for civil disputes including personal injury claims, property disputes, landlord-tenant conflicts, and neighbor disputes. We help resolve these matters without costly litigation.
              </p>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="font-paragraph text-sm text-foreground/70">Property and boundary disputes</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="font-paragraph text-sm text-foreground/70">Landlord-tenant disagreements</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="font-paragraph text-sm text-foreground/70">Personal injury settlement discussions</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex gap-4 mb-4">
                <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-heading text-xl font-bold text-foreground">Community Mediation</h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">
                Mediation for community conflicts including neighbor disputes, harassment issues, and interpersonal conflicts. We help restore relationships and build understanding within communities.
              </p>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="font-paragraph text-sm text-foreground/70">Neighbor and nuisance disputes</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="font-paragraph text-sm text-foreground/70">Interpersonal conflicts</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="font-paragraph text-sm text-foreground/70">Community relationship restoration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">Benefits of Mediation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="bg-pastelgreen/10 rounded-lg p-6 border border-pastelgreen/30">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">Cost-Effective</h3>
                    <p className="font-paragraph text-foreground/80">Mediation typically costs 50-70% less than litigation, with faster resolution and lower legal fees.</p>
                  </div>
                </div>
              </div>

              <div className="bg-pastelgreen/10 rounded-lg p-6 border border-pastelgreen/30">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">Faster Resolution</h3>
                    <p className="font-paragraph text-foreground/80">Most mediations are completed within weeks or months, compared to years for court proceedings.</p>
                  </div>
                </div>
              </div>

              <div className="bg-pastelgreen/10 rounded-lg p-6 border border-pastelgreen/30">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">Confidential Process</h3>
                    <p className="font-paragraph text-foreground/80">Mediation is private and confidential, protecting sensitive information and maintaining privacy.</p>
                  </div>
                </div>
              </div>

              <div className="bg-pastelgreen/10 rounded-lg p-6 border border-pastelgreen/30">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">Preserves Relationships</h3>
                    <p className="font-paragraph text-foreground/80">Collaborative approach helps maintain relationships, especially important in family and business contexts.</p>
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
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">Control Over Outcome</h3>
                    <p className="font-paragraph text-foreground/80">Parties control the settlement terms, rather than having a judge or arbitrator impose a decision.</p>
                  </div>
                </div>
              </div>

              <div className="bg-pastelgreen/10 rounded-lg p-6 border border-pastelgreen/30">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">Creative Solutions</h3>
                    <p className="font-paragraph text-foreground/80">Mediation allows for flexible, creative solutions that courts cannot provide, addressing underlying interests.</p>
                  </div>
                </div>
              </div>

              <div className="bg-pastelgreen/10 rounded-lg p-6 border border-pastelgreen/30">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">High Success Rate</h3>
                    <p className="font-paragraph text-foreground/80">Over 80% of mediations result in full or partial agreement, with high compliance rates.</p>
                  </div>
                </div>
              </div>

              <div className="bg-pastelgreen/10 rounded-lg p-6 border border-pastelgreen/30">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">Reduced Stress</h3>
                    <p className="font-paragraph text-foreground/80">Collaborative process is less adversarial and stressful than litigation, promoting emotional wellbeing.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Mediation Process */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">The Mediation Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="relative">
              <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm h-full">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4">1</div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Initial Consultation</h3>
                <p className="font-paragraph text-foreground/80 text-sm">
                  We meet with you individually to understand your concerns, goals, and willingness to mediate.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm h-full">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4">2</div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Joint Opening Session</h3>
                <p className="font-paragraph text-foreground/80 text-sm">
                  Both parties meet with the mediator to discuss the dispute, establish ground rules, and outline the process.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm h-full">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4">3</div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Private Caucuses</h3>
                <p className="font-paragraph text-foreground/80 text-sm">
                  The mediator meets separately with each party to explore interests, concerns, and potential solutions.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm h-full">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4">4</div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Settlement Agreement</h3>
                <p className="font-paragraph text-foreground/80 text-sm">
                  Once agreement is reached, we document the settlement in a binding agreement signed by both parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Provide */}
      <section className="w-full py-16 md:py-24 bg-white">
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
                  <span className="font-paragraph text-foreground/80">Certified mediator facilitation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Pre-mediation consultation and preparation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Joint and private sessions</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Settlement agreement drafting</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Follow-up support and implementation assistance</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Confidentiality and privilege protection</span>
                </li>
              </ul>
            </div>

            {/* What's Not Included */}
            <div className="bg-pastelpeach/10 rounded-lg p-8 border border-pastelpeach/30">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-8 h-8 text-primary" />
                <h3 className="font-heading text-2xl font-bold text-foreground">Limitations & Scope</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Providing legal advice (recommend consulting a lawyer)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Representing either party in court</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Making decisions for the parties</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Mediating cases involving violence or abuse</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Enforcing agreements (legal action required)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-3xl font-bold text-foreground">Is Mediation Right for You?</h2>
            </div>
            <div className="space-y-4 font-paragraph text-foreground/80">
              <p>
                Mediation works best when:
              </p>
              <ul className="space-y-3 ml-4">
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span>Both parties are willing to participate and negotiate in good faith</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span>There is a genuine desire to find a mutually acceptable solution</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span>The dispute involves interests that can be negotiated (not just legal rights)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span>There is no history of violence or abuse between the parties</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span>The parties want to maintain or restore their relationship</span>
                </li>
              </ul>
              <p className="pt-4 border-t border-gray-200">
                <strong>Not sure if mediation is right for your situation?</strong> Contact us for a free consultation to discuss your dispute and explore whether mediation is an appropriate option.
              </p>
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
                  <p className="text-sm">Meet individually with each party to assess readiness</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Joint Opening Session: 1-2 weeks</p>
                  <p className="text-sm">Both parties meet with mediator to discuss the dispute</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Mediation Sessions: 2-8 weeks</p>
                  <p className="text-sm">Private caucuses and negotiations to reach agreement</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Settlement: 1-2 weeks</p>
                  <p className="text-sm">Document and finalize the agreement</p>
                </div>
                <p className="text-sm italic pt-4 border-t border-gray-200">Total: 4-12 weeks for most mediations</p>
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
                  <p className="text-sm">$150-250/hour depending on complexity and mediator experience</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Shared Costs</p>
                  <p className="text-sm">Mediation costs are typically split equally between parties</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Flat Fees Available</p>
                  <p className="text-sm">For straightforward mediations with clear scope</p>
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

      {/* FAQ Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Is mediation confidential?</h3>
              <p className="font-paragraph text-foreground/80 text-sm">
                Yes. Mediation is strictly confidential. Anything discussed during mediation cannot be used in court or disclosed to third parties without written consent from both parties.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">What if we can't reach agreement?</h3>
              <p className="font-paragraph text-foreground/80 text-sm">
                If mediation doesn't result in full agreement, you can still pursue other options like litigation or arbitration. The process is voluntary and either party can withdraw at any time.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Do I need a lawyer for mediation?</h3>
              <p className="font-paragraph text-foreground/80 text-sm">
                While not required, we recommend consulting with a lawyer before and after mediation to understand your legal rights and ensure any agreement is fair and legally sound.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">How is a mediator different from a judge?</h3>
              <p className="font-paragraph text-foreground/80 text-sm">
                A mediator doesn't make decisions or impose outcomes. Instead, they facilitate communication and help parties reach their own mutually acceptable agreement.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Can mediation be court-ordered?</h3>
              <p className="font-paragraph text-foreground/80 text-sm">
                Yes. Courts often order mediation before trial. Even court-ordered mediation remains voluntary in terms of reaching agreement, though attendance is mandatory.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">How long does mediation take?</h3>
              <p className="font-paragraph text-foreground/80 text-sm">
                Most mediations are completed within 4-12 weeks. Simple disputes may resolve in 2-3 sessions, while complex matters may require more time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-secondary/5 py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Resolve Your Dispute?
          </h2>
          <p className="font-paragraph text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation to discuss your dispute and explore whether mediation is the right solution for you.
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
