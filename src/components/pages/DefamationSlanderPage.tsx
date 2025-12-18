import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { ChevronRight, CheckCircle, AlertCircle, FileText, Clock, DollarSign, Users, Shield, Gavel, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DefamationSlanderPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
                Defamation & Slander Services
              </h1>
              <p className="font-paragraph text-lg text-foreground/80 mb-8">
                Protect your reputation and pursue justice for false statements that have damaged your character. We provide expert guidance on defamation claims, helping you understand your legal options and navigate the complex process of proving harm to your reputation.
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
                src="https://static.wixstatic.com/media/99571b_42444ec42c4a427db445d028d3149b76~mv2.png?id=defamation-slander-hero"
                alt="Defamation and Slander Services - Professional legal protection and reputation defense"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Defamation Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="mb-12">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">
              Understanding Defamation & Slander
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-6">
              Defamation is a false statement of fact that damages someone's reputation. In Ontario, defamation can take two forms: slander (spoken false statements) and libel (written false statements). Both can have serious consequences for your personal and professional reputation.
            </p>
            <p className="font-paragraph text-lg text-foreground/80">
              Proving defamation requires demonstrating that a false statement was made, communicated to third parties, and caused measurable harm to your reputation. The process can be complex, but with proper legal guidance, you can hold those responsible accountable and seek compensation for the damage caused.
            </p>
          </div>

          {/* Key Elements of Defamation */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-lg font-bold text-primary mb-2">False Statement</div>
              <p className="font-paragraph text-foreground/80 text-sm">The statement must be factually false, not opinion or hyperbole</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-lg font-bold text-primary mb-2">Published/Communicated</div>
              <p className="font-paragraph text-foreground/80 text-sm">The false statement must be shared with at least one third party</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-lg font-bold text-primary mb-2">Identifies You</div>
              <p className="font-paragraph text-foreground/80 text-sm">The statement must reasonably identify you as the subject</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-lg font-bold text-primary mb-2">Causes Harm</div>
              <p className="font-paragraph text-foreground/80 text-sm">The statement must damage your reputation or cause financial loss</p>
            </div>
          </div>
        </div>
      </section>

      {/* Scope of Services Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">Our Defamation Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* What We Can Help With */}
            <div className="bg-pastelgreen/10 rounded-lg p-8 border border-pastelgreen/30">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-8 h-8 text-primary" />
                <h3 className="font-heading text-2xl font-bold text-foreground">What We Can Help With</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Case Assessment:</strong> Evaluate whether your situation meets the legal elements of defamation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Evidence Gathering:</strong> Collect and organize documentation of the false statements and resulting harm</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Demand Letters:</strong> Send formal notices demanding retraction and compensation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Negotiation & Settlement:</strong> Pursue resolution without litigation when possible</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Court Preparation:</strong> Prepare documentation and evidence for civil proceedings</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Damages Calculation:</strong> Document and quantify harm to reputation and finances</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Online Defamation:</strong> Address false statements on social media, websites, and review platforms</span>
                </li>
              </ul>
            </div>

            {/* Limitations & When You Need a Lawyer */}
            <div className="bg-pastelpeach/10 rounded-lg p-8 border border-pastelpeach/30">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-8 h-8 text-primary" />
                <h3 className="font-heading text-2xl font-bold text-foreground">Important Limitations</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Lawyer Representation Required:</strong> Defamation lawsuits must be handled by a lawyer, not a paralegal. We can assist with preparation and evidence gathering, but you will need to retain a lawyer for court representation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Complex Legal Issues:</strong> Defamation law involves nuanced concepts like privilege, opinion, and public figure status that require legal expertise</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Statute of Limitations:</strong> Ontario has a 2-year limitation period from publication. We will advise you of critical deadlines</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Defenses Available:</strong> Defendants may claim truth, privilege, or fair comment. A lawyer must evaluate these defenses</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Damages Proof:</strong> You must prove actual damages (financial loss, emotional distress, lost opportunities) which requires careful documentation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Defamation */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">Types of Defamation We Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex gap-4 mb-4">
                <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-heading text-xl font-bold text-foreground">Slander (Spoken Defamation)</h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">
                False statements made verbally that damage your reputation. Examples include false accusations made in person, at work, or in public settings. Slander can spread quickly through word-of-mouth and cause significant harm to your personal and professional relationships.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex gap-4 mb-4">
                <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-heading text-xl font-bold text-foreground">Libel (Written Defamation)</h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">
                False statements in written form including emails, letters, articles, and online posts. Libel is often considered more serious than slander because written statements are permanent and can reach a wider audience. Social media posts and online reviews are common sources of libel.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex gap-4 mb-4">
                <TrendingUp className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-heading text-xl font-bold text-foreground">Online Defamation</h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">
                False statements published on social media, review websites, blogs, and forums. Online defamation can spread rapidly and be difficult to contain. We help identify sources, document evidence, and pursue removal or correction of false statements.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex gap-4 mb-4">
                <Gavel className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-heading text-xl font-bold text-foreground">Business & Professional Defamation</h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">
                False statements that damage your business reputation, professional standing, or economic interests. This includes false claims about your business practices, qualifications, or financial stability that result in lost clients or business opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">How We Help You Pursue a Defamation Claim</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="relative">
              <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm h-full">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4">1</div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Initial Assessment</h3>
                <p className="font-paragraph text-foreground/80">
                  We evaluate your situation to determine if the legal elements of defamation are present and advise you on the strength of your potential claim.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm h-full">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4">2</div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Evidence Gathering</h3>
                <p className="font-paragraph text-foreground/80">
                  We help you collect and organize all relevant evidence including the false statements, proof of publication, and documentation of harm caused.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm h-full">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4">3</div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Demand & Negotiation</h3>
                <p className="font-paragraph text-foreground/80">
                  We prepare and send a formal demand letter requesting retraction, correction, and compensation. Many cases settle at this stage without litigation.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm h-full">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4">4</div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Lawyer Referral & Support</h3>
                <p className="font-paragraph text-foreground/80">
                  If litigation is necessary, we refer you to an experienced defamation lawyer and provide them with all prepared evidence and documentation.
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
                  <p className="font-semibold text-foreground mb-1">Pre-Litigation Phase: 2-6 weeks</p>
                  <p className="text-sm">Assessment, evidence gathering, and demand letter preparation</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Negotiation Phase: 4-12 weeks</p>
                  <p className="text-sm">Settlement discussions and potential resolution without court</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Litigation: 12-24+ months</p>
                  <p className="text-sm">If case proceeds to court (requires lawyer representation)</p>
                </div>
                <p className="text-sm italic pt-4 border-t border-gray-200">Critical: 2-year limitation period from publication. Act quickly to preserve your rights.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-8 h-8 text-primary" />
                <h3 className="font-heading text-2xl font-bold text-foreground">Cost Structure</h3>
              </div>
              <div className="space-y-4 font-paragraph text-foreground/80">
                <div>
                  <p className="font-semibold text-foreground mb-1">Paralegal Services</p>
                  <p className="text-sm">$150-250/hour for case assessment, evidence gathering, and demand letter preparation</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Flat Fee Options</p>
                  <p className="text-sm">Available for complete pre-litigation package including assessment and demand letter</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Lawyer Representation</p>
                  <p className="text-sm">Required for litigation; we provide referrals to experienced defamation lawyers</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Initial Consultation</p>
                  <p className="text-sm">Free 30-minute consultation to assess your situation and discuss options</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Examples Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">Common Defamation Scenarios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">Workplace Defamation</h3>
              <p className="font-paragraph text-foreground/80 mb-4">
                A coworker spreads false rumors that you stole from the company or engaged in unethical behavior. These false statements damage your professional reputation and result in lost job opportunities or termination. We help document the false statements and their impact on your career.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">Online Review Defamation</h3>
              <p className="font-paragraph text-foreground/80 mb-4">
                A competitor or disgruntled person posts false, damaging reviews about your business on Google, Yelp, or social media. These false statements harm your business reputation and result in lost customers. We help identify the source and pursue removal or correction.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">Personal Reputation Damage</h3>
              <p className="font-paragraph text-foreground/80 mb-4">
                Someone makes false accusations about your character, integrity, or personal conduct on social media or in public. These false statements spread and damage your personal relationships and reputation in your community. We help document the harm and pursue accountability.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">Professional Credentials Defamation</h3>
              <p className="font-paragraph text-foreground/80 mb-4">
                Someone falsely claims you lack proper credentials, are unqualified, or engaged in professional misconduct. These false statements damage your professional standing and result in lost clients or business. We help prove the falsity and quantify damages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Important Information Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">Important Information About Defamation Claims</h2>
          <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
            <div className="space-y-6 font-paragraph text-foreground/80">
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Paralegal Scope Limitations</h3>
                <p>
                  Ontario paralegals cannot represent you in defamation lawsuits. However, we can provide valuable pre-litigation support including case assessment, evidence gathering, demand letter preparation, and negotiation. Once litigation is necessary, we will refer you to an experienced defamation lawyer.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">The 2-Year Limitation Period</h3>
                <p>
                  In Ontario, you have only 2 years from the date of publication to commence a defamation action. This is a critical deadline. If you miss this deadline, you lose your right to sue. Contact us immediately if you believe you have been defamed.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Burden of Proof</h3>
                <p>
                  You must prove that the statement is false, was published to third parties, identified you, and caused measurable harm. Opinion, hyperbole, and statements of fact that are true are not defamation. We help you gather evidence to meet this burden.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Defenses Available to Defendants</h3>
                <p>
                  Defendants may claim the statement is true, protected by privilege (like court testimony), fair comment on a matter of public interest, or qualified privilege (like honest employee references). A lawyer must evaluate these defenses and advise on the strength of your claim.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Damages You Can Recover</h3>
                <p>
                  If successful, you may recover general damages (for harm to reputation), special damages (for proven financial losses), and in some cases, punitive damages (to punish egregious conduct). We help document all damages to maximize your recovery.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Public Figures & Matters of Public Interest</h3>
                <p>
                  If you are a public figure or the defamatory statement relates to a matter of public interest, the legal standard is higher. You must prove the defendant acted with "malice" (knowing falsity or reckless disregard for truth). We assess whether these heightened standards apply to your situation.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Regulated by Law Society of Ontario</h3>
                <p>
                  All paralegals are licensed and regulated by the Law Society of Ontario. We adhere to strict professional conduct rules and ethical standards. We will be transparent about the scope of our services and when lawyer representation is required.
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
            Protect Your Reputation
          </h2>
          <p className="font-paragraph text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            If you have been defamed, don't wait. The 2-year limitation period is critical. Contact us for a free consultation to discuss your situation and explore your legal options.
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
