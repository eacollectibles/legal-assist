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
              <p className="font-paragraph text-lg text-foreground/80 mb-8">{"In Ontario, to establish defamation, a plaintiff must show that the impugned statement was published to at least one third party, referred to the plaintiff, and would lower the plaintiff’s reputation in the eyes of a reasonable person. In cases of libel, harm to reputation is presumed. Truth, fair comment, privilege, and responsible communication may be raised as defences. We assist clients in organizing evidence relevant to these legal requirements."}</p>
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
              <p className="font-paragraph text-foreground/80 mb-4">{"Slander refers to defamatory statements made verbally or in a transient form that may harm a person’s reputation. Examples can include false accusations made in person, in the workplace, or in public settings. Depending on the circumstances, slander may require proof of resulting harm. Licensed Paralegals may assist with slander claims within the jurisdiction of Ontario Small Claims Court, where authorized."}</p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex gap-4 mb-4">
                <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-heading text-xl font-bold text-foreground">Libel (Written Defamation)</h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">{"Libel refers to defamatory statements made in written or recorded form, including emails, letters, articles, online posts, reviews, and other published material. Because libel involves statements that are recorded or capable of ongoing circulation, it may have a broader and more lasting impact on a person’s reputation. Social media posts, online reviews, and website content are common sources of libel. Licensed Paralegals may assist with libel claims within the jurisdiction of Ontario Small Claims Court, where authorized."}</p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex gap-4 mb-4">
                <TrendingUp className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-heading text-xl font-bold text-foreground">Online Defamation</h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">{"Online defamation involves false statements published on social media platforms, review websites, blogs, forums, or other online sources. Such statements can spread quickly and may be difficult to contain. Licensed Paralegals may assist with identifying the source of the statements, documenting and preserving online evidence, and pursuing resolution or relief, including claims brought within the jurisdiction of Ontario Small Claims Court where authorized."}</p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex gap-4 mb-4">
                <Gavel className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-heading text-xl font-bold text-foreground">Business & Professional Defamation</h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">{"Business and professional defamation involves false statements that harm a person’s business reputation, professional standing, or economic interests. This may include inaccurate claims about business practices, professional qualifications, or financial stability that result in reputational damage or economic loss. Licensed Paralegals may assist with business or professional defamation matters within the jurisdiction of Ontario Small Claims Court, where authorized."}</p>
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
                <p className="font-paragraph text-foreground/80">{"We conduct an initial review of your matter to help you understand whether it may raise defamation-related issues and what options may be available."}</p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm h-full">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4">2</div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Evidence Gathering</h3>
                <p className="font-paragraph text-foreground/80">{"We help clients gather and organize relevant materials, such as copies of the alleged statements, information about where and how they were published, and documents relating to any claimed harm."}</p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm h-full">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4">3</div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Demand & Negotiation</h3>
                <p className="font-paragraph text-foreground/80">{"We assist with preparing demand or retraction letters and, where appropriate, support negotiation efforts to seek resolution of defamation-related disputes prior to litigation."}</p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm h-full">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4">4</div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Litigation</h3>
                <p className="font-paragraph text-foreground/80">{"If negotiation efforts are unsuccessful, we can pursue litigation on your behalf in Ontario Small Claims Court where the claim falls within the court’s monetary jurisdiction, currently up to $50,000"}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">False Google Reviews</h3>
              <p className="font-paragraph text-sm text-foreground/80">
                Fake negative reviews posted on Google Business profiles damaging your business reputation and search rankings.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Fake Online Business Reviews</h3>
              <p className="font-paragraph text-sm text-foreground/80">
                False reviews on multiple platforms (Google, Yelp, TripAdvisor) designed to harm your business credibility.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Social Media Posts</h3>
              <p className="font-paragraph text-sm text-foreground/80">
                Defamatory false statements posted on Facebook, Instagram, X/Twitter, or other social platforms.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Defamatory Comments on Reddit or Forums</h3>
              <p className="font-paragraph text-sm text-foreground/80">
                False accusations or harmful statements made in online forums, Reddit threads, or discussion boards.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">False Accusations of Criminal Conduct</h3>
              <p className="font-paragraph text-sm text-foreground/80">
                False claims that you committed a crime, posted publicly or privately to damage your reputation.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Allegations of Fraud or Scams</h3>
              <p className="font-paragraph text-sm text-foreground/80">
                False statements claiming you engaged in fraudulent or scam activities, harming your business credibility.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Reputation Attacks Against Small Businesses</h3>
              <p className="font-paragraph text-sm text-foreground/80">
                Coordinated false statements targeting small business owners to damage their reputation and revenue.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">False Statements About Professional Competence</h3>
              <p className="font-paragraph text-sm text-foreground/80">
                False claims that you lack professional skills, expertise, or competence in your field.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Defamatory Emails Sent to Employers or Clients</h3>
              <p className="font-paragraph text-sm text-foreground/80">
                False statements sent via email to your employer or clients designed to damage your professional relationships.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Workplace Defamation by Co-Workers or Supervisors</h3>
              <p className="font-paragraph text-sm text-foreground/80">
                False rumors or accusations spread by colleagues or supervisors damaging your career and employment prospects.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">False Allegations in Community Groups or Message Boards</h3>
              <p className="font-paragraph text-sm text-foreground/80">
                False accusations posted in neighborhood groups, HOA boards, or community message boards.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Online Harassment and Reputation Smearing</h3>
              <p className="font-paragraph text-sm text-foreground/80">
                Coordinated campaigns of false statements and harassment designed to damage your reputation online.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Defamatory Yelp Reviews</h3>
              <p className="font-paragraph text-sm text-foreground/80">
                False negative reviews on Yelp designed to harm your business reputation and customer base.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">False Claims in Marketplace Listings</h3>
              <p className="font-paragraph text-sm text-foreground/80">
                False statements about products or services in online marketplace listings (Amazon, eBay, etc.).
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Malicious Complaints to Regulators or Associations</h3>
              <p className="font-paragraph text-sm text-foreground/80">
                False complaints filed with regulatory bodies or professional associations to damage your credentials.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">False Statements in Tenant–Landlord Disputes</h3>
              <p className="font-paragraph text-sm text-foreground/80">
                False accusations made by tenants or landlords during rental disputes posted online or shared publicly.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Defamatory Statements Between Business Competitors</h3>
              <p className="font-paragraph text-sm text-foreground/80">
                False statements made by competitors to damage your business reputation and market position.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">False Accusations in Dating or Relationship Disputes</h3>
              <p className="font-paragraph text-sm text-foreground/80">
                False accusations made by ex-partners or dating app users posted online to damage your reputation.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Online Impersonation and Fake Profiles</h3>
              <p className="font-paragraph text-sm text-foreground/80">
                Someone creates fake profiles impersonating you and posting false or defamatory content.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Defamatory Reviews Following Contract Disputes</h3>
              <p className="font-paragraph text-sm text-foreground/80">
                False reviews or accusations posted after business or service contract disputes to damage your reputation.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">
              Frequently Asked Questions About Defamation
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 max-w-3xl mx-auto">
              Get answers to common questions about defamation law, the legal process, and your rights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* What is Defamation? */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                What is Defamation?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4">
                Defamation is a false statement of fact that damages someone's reputation. In Ontario, defamation can take two forms: slander (spoken false statements) and libel (written false statements). The key element is that the statement must be false—opinions and truthful statements are not defamatory.
              </p>
              <p className="font-paragraph text-foreground/80">
                For a statement to be defamatory, it must be published (communicated to at least one third party), refer to the plaintiff, and would lower the plaintiff's reputation in the eyes of a reasonable person.
              </p>
            </div>

            {/* Difference Between Libel and Slander */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                What is the Difference Between Libel and Slander?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4">
                <strong>Libel</strong> refers to defamatory statements made in written or recorded form, including emails, letters, articles, online posts, reviews, and other published material. Because libel is recorded and capable of ongoing circulation, it may have a broader and more lasting impact on reputation.
              </p>
              <p className="font-paragraph text-foreground/80">
                <strong>Slander</strong> refers to defamatory statements made verbally or in a transient form. Slander may require proof of resulting harm, whereas libel presumes harm to reputation.
              </p>
            </div>

            {/* Elements of Defamation Claim */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                What Are the Elements of a Defamation Claim?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4">
                To establish defamation in Ontario, you must prove:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">1.</span>
                  <span className="font-paragraph text-foreground/80"><strong>False Statement:</strong> The statement must be factually false, not opinion or hyperbole</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">2.</span>
                  <span className="font-paragraph text-foreground/80"><strong>Published/Communicated:</strong> The false statement must be shared with at least one third party</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">3.</span>
                  <span className="font-paragraph text-foreground/80"><strong>Identifies You:</strong> The statement must reasonably identify you as the subject</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">4.</span>
                  <span className="font-paragraph text-foreground/80"><strong>Causes Harm:</strong> The statement must damage your reputation or cause financial loss</span>
                </li>
              </ul>
            </div>

            {/* Common Defenses */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                What Are Common Defenses to Defamation?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4">
                Defendants may raise several defenses to defamation claims:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold leading-none mt-1">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Truth (Justification):</strong> If the statement is true, it is not defamatory</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold leading-none mt-1">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Fair Comment:</strong> Honest opinion on matters of public interest may be protected</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold leading-none mt-1">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Privilege:</strong> Statements made in court proceedings or parliament may be privileged</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold leading-none mt-1">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Qualified Privilege:</strong> Statements made in good faith for legitimate purposes (e.g., employment references)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold leading-none mt-1">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Responsible Communication:</strong> Statements on matters of public interest made responsibly may be protected</span>
                </li>
              </ul>
            </div>

            {/* Remedies Available */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                What Remedies Are Available for Defamation?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4">
                If you successfully prove defamation, you may recover:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold leading-none mt-1">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>General Damages:</strong> Compensation for harm to reputation and emotional distress</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold leading-none mt-1">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Special Damages:</strong> Compensation for proven financial losses (e.g., lost business, lost wages)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold leading-none mt-1">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Punitive Damages:</strong> Additional damages to punish egregious or malicious conduct</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold leading-none mt-1">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Injunctive Relief:</strong> Court orders to stop further publication of defamatory statements</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold leading-none mt-1">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Retraction/Apology:</strong> Court-ordered retraction or apology from the defendant</span>
                </li>
              </ul>
            </div>

            {/* Limitation Period */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                How Long Do I Have to Sue for Defamation?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4">
                <strong>In Ontario, you have only 2 years from the date of publication to commence a defamation action.</strong> This is a critical deadline. If you miss this deadline, you lose your right to sue, regardless of the merits of your case.
              </p>
              <p className="font-paragraph text-foreground/80 mb-4">
                For ongoing defamation (such as false reviews or social media posts that continue to be published), the limitation period may restart with each new publication.
              </p>
              <p className="font-paragraph text-foreground/80 font-semibold text-primary">
                Contact us immediately if you believe you have been defamed.
              </p>
            </div>

            {/* Legal Process */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                What is the Legal Process for a Defamation Claim?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4">
                The typical process includes:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">1.</span>
                  <span className="font-paragraph text-foreground/80"><strong>Initial Assessment:</strong> Review your situation and determine if you have a viable defamation claim</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">2.</span>
                  <span className="font-paragraph text-foreground/80"><strong>Evidence Gathering:</strong> Collect documentation of the false statements and resulting harm</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">3.</span>
                  <span className="font-paragraph text-foreground/80"><strong>Demand Letter:</strong> Send formal notice demanding retraction and compensation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">4.</span>
                  <span className="font-paragraph text-foreground/80"><strong>Negotiation:</strong> Attempt to resolve the matter without litigation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">5.</span>
                  <span className="font-paragraph text-foreground/80"><strong>Litigation:</strong> If necessary, pursue the claim in Small Claims Court (up to $50,000) or Superior Court</span>
                </li>
              </ul>
            </div>

            {/* Online Defamation */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                How Do I Handle Online Defamation?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4">
                Online defamation (false statements on social media, review sites, forums, etc.) is treated the same as traditional defamation under Ontario law. However, online defamation presents unique challenges:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold leading-none mt-1">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Rapid Spread:</strong> False statements can spread quickly and be difficult to contain</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold leading-none mt-1">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Anonymity:</strong> Identifying the person responsible may require legal action against the platform</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold leading-none mt-1">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Evidence Preservation:</strong> Screenshots and documentation are critical before content is deleted</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold leading-none mt-1">•</span>
                  <span className="font-paragraph text-foreground/80"><strong>Platform Removal:</strong> Many platforms have policies against defamatory content and may remove it upon notice</span>
                </li>
              </ul>
              <p className="font-paragraph text-foreground/80 mt-4">
                We can help you document online defamation, preserve evidence, and pursue removal or legal action.
              </p>
            </div>

            {/* Public Figures */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                Do Public Figures Have Different Protections?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4">
                Yes. Public figures and matters of public interest have different legal standards. If you are a public figure or the defamatory statement relates to a matter of public interest, you must prove that the defendant acted with "malice"—meaning they knew the statement was false or acted with reckless disregard for its truth.
              </p>
              <p className="font-paragraph text-foreground/80 mb-4">
                This higher standard makes it more difficult for public figures to succeed in defamation claims. We assess whether these heightened standards apply to your situation.
              </p>
            </div>

            {/* Cost and Timeline */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                What Are the Costs and Timeline for a Defamation Claim?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4">
                <strong>Timeline:</strong>
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex gap-3">
                  <span className="text-primary font-bold leading-none mt-1">•</span>
                  <span className="font-paragraph text-foreground/80">Pre-litigation phase: 2-6 weeks</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold leading-none mt-1">•</span>
                  <span className="font-paragraph text-foreground/80">Negotiation phase: 4-12 weeks</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold leading-none mt-1">•</span>
                  <span className="font-paragraph text-foreground/80">Small Claims Court: 6-12 months</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold leading-none mt-1">•</span>
                  <span className="font-paragraph text-foreground/80">Superior Court: 12-24+ months</span>
                </li>
              </ul>
              <p className="font-paragraph text-foreground/80">
                <strong>Costs:</strong> Paralegal services typically range from $150-250/hour. We offer flat-fee options for pre-litigation packages. Discuss your budget during your consultation.
              </p>
            </div>

            {/* Burden of Proof */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                What is the Burden of Proof in a Defamation Case?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4">
                In a defamation case, you (the plaintiff) must prove your case on the "balance of probabilities"—meaning it is more likely than not that the defendant's statement was false and defamatory.
              </p>
              <p className="font-paragraph text-foreground/80 mb-4">
                Once you establish the basic elements of defamation, damage to reputation is presumed. The defendant then has the burden of proving any available defenses (such as truth or privilege).
              </p>
              <p className="font-paragraph text-foreground/80">
                We help you gather and organize evidence to meet this burden of proof.
              </p>
            </div>

            {/* Opinion vs Fact */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                Is an Opinion Protected from Defamation?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4">
                Generally, yes. Opinions are protected from defamation claims. However, the distinction between fact and opinion can be complex. A statement may appear to be opinion but actually imply false facts.
              </p>
              <p className="font-paragraph text-foreground/80 mb-4">
                For example, saying "I think this business is dishonest" may imply the false fact that the business engaged in dishonest conduct, making it potentially defamatory.
              </p>
              <p className="font-paragraph text-foreground/80">
                We assess whether statements are protected opinions or actionable false statements of fact.
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
                <p>{"Defamation claims may be pursued in Ontario Small Claims Court where the amount claimed falls within the court’s monetary jurisdiction, currently up to $50,000. In such cases, our Licensed Paralegals may provide representation and assistance within the authorized scope of paralegal practice. For defamation matters proceeding in the Superior Court of Justice, we can assist with pre-litigation support and refer clients to a lawyer where litigation is required."}</p>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">The 2-Year Limitation Period</h3>
                <p>
                  In Ontario, you have only 2 years from the date of publication to commence a defamation action. This is a critical deadline. If you miss this deadline, you lose your right to sue. Contact us immediately if you believe you have been defamed.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Burden of Proof</h3>
                <p>{"In Ontario, a defamation claim requires proof that a statement was published to a third party, referred to you, and was defamatory in nature. Once these elements are established, damage is presumed. Defendants may raise defences such as truth, fair comment, or privilege. We assist clients in gathering and organizing evidence to support their claim within the appropriate court jurisdiction."}</p>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Defenses Available to Defendants</h3>
                <p>{"Defendants may raise defences such as truth (justification), privilege (for example, statements made in court proceedings), fair comment on matters of public interest, or qualified privilege (such as employment references). Our Licensed Paralegals can review these potential defences and provide guidance on how they may affect a defamation claim within the Small Claims Court jurisdiction. Where a matter proceeds outside the paralegal scope of practice, we will refer you to a lawyer as appropriate."}</p>
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
