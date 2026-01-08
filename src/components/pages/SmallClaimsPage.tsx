import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { ChevronRight, CheckCircle, Users, FileText, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SmallClaimsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
                Small Claims Court Services
              </h1>
              <p className="font-paragraph text-lg text-foreground/80 mb-8">
                Expert legal representation for civil disputes up to $50,000 in Ontario. Whether you're an applicant seeking compensation or a defendant protecting your interests, we provide comprehensive support throughout the entire process.
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
                src="https://static.wixstatic.com/media/99571b_550f67d8225c4defa23bfe4f0a39d9aa~mv2.png?id=small-claims-hero"
                alt="Small Claims Court"
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
              What is Small Claims Court?
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-6">
              Small Claims Court is an accessible division of the Ontario Court of Justice designed to resolve civil disputes efficiently and affordably. It handles claims up to $50,000 (or $35,000 if the defendant does not agree to the higher limit), making it ideal for individuals and small businesses seeking compensation for various disputes.
            </p>
            <p className="font-paragraph text-lg text-foreground/80">
              Our firm specializes in representing both applicants and defendants, ensuring your rights are protected and your case is presented effectively before the court.
            </p>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">$50,000</div>
              <p className="font-paragraph text-foreground/80">Maximum Claim Amount</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">6-12</div>
              <p className="font-paragraph text-foreground/80">Months Average Timeline</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">Lower</div>
              <p className="font-paragraph text-foreground/80">Court Fees vs. Superior Court</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">Accessible</div>
              <p className="font-paragraph text-foreground/80">Self-Representation Friendly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services for Applicants */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            Services for Applicants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Services List */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Case Evaluation & Strategy
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      We thoroughly assess your claim, evaluate its strength, and develop a winning strategy tailored to your specific situation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Document Preparation
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Professional preparation of claims, affidavits, and all required court documents to ensure compliance and maximum impact.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Evidence Gathering
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Expert guidance on collecting, organizing, and presenting evidence that strengthens your case.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Settlement Negotiation
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Strategic negotiation to resolve disputes favorably without trial when possible, saving time and costs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Additional Services */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Court Representation
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Full representation at trial, including presenting your case, examining witnesses, and cross-examining the defendant.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Judgment Enforcement
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Assistance with post-judgment enforcement to ensure you collect the awarded compensation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Appeal Support
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      If needed, we provide guidance and representation for appeals to protect your interests.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Ongoing Consultation
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Continuous support and advice throughout your case to keep you informed and confident.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services for Defendants */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            Services for Defendants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Claim Assessment
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Thorough analysis of the claim against you to identify weaknesses and develop a strong defense strategy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Defense Documentation
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Professional preparation of defenses, counterclaims, and all necessary court filings to protect your position.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Settlement Negotiation
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Strategic negotiation to resolve the claim on favorable terms, minimizing your liability and costs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <DollarSign className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Cost Management
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Efficient case management to minimize legal costs while maintaining strong defense representation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Trial Defense
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Vigorous representation at trial, including presenting your defense, cross-examining witnesses, and protecting your rights.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Counterclaim Strategy
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Identification and pursuit of counterclaims when applicable to offset liability and strengthen your position.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Post-Judgment Support
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Guidance on post-judgment matters, including payment arrangements and enforcement defense if necessary.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Appeal Representation
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Expert support for appeals if you believe the judgment was unjust or based on legal errors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            The Small Claims Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Initial Consultation',
                description: 'We review your case, assess its merits, and discuss your goals and options.'
              },
              {
                step: '2',
                title: 'Case Preparation',
                description: 'Gather evidence, prepare documents, and develop a comprehensive strategy.'
              },
              {
                step: '3',
                title: 'Settlement Attempts',
                description: 'Negotiate with the opposing party to resolve the matter favorably if possible.'
              },
              {
                step: '4',
                title: 'Trial & Resolution',
                description: 'Present your case in court and work toward a favorable judgment or settlement.'
              }
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm h-full">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="font-paragraph text-foreground/80">
                    {item.description}
                  </p>
                </div>
                {item.step !== '4' && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ChevronRight className="w-6 h-6 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: 'What types of claims can be filed in Small Claims Court?',
                a: 'Small Claims Court handles various civil disputes including contract breaches, property damage, unpaid debts, personal injury claims, and landlord-tenant disputes (up to the monetary limit).'
              },
              {
                q: 'What is the filing fee?',
                a: 'Filing fees vary based on the claim amount, typically ranging from $50 to $500. We can provide specific fee information during your consultation.'
              },
              {
                q: 'How long does a Small Claims case typically take?',
                a: 'Most cases take 6-12 months from filing to resolution, though some may be resolved faster through settlement negotiations.'
              },
              {
                q: 'Can I appeal a Small Claims judgment?',
                a: 'Yes, appeals are possible on questions of law or if there was a procedural error. We can advise you on the merits of an appeal.'
              },
              {
                q: 'Do I need a lawyer for Small Claims Court?',
                a: 'While not required, having legal representation significantly improves your chances of success and ensures proper case management.'
              },
              {
                q: 'What if the defendant doesn\'t pay the judgment?',
                a: 'We assist with post-judgment enforcement procedures to help collect the awarded amount through various legal mechanisms.'
              }
            ].map((item, index) => (
              <div key={index} className="bg-pastelbeige/10 rounded-lg p-6 border border-pastelbeige/30">
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                  {item.q}
                </h3>
                <p className="font-paragraph text-foreground/80">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-r from-primary/10 to-pastelbeige/30">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-6">
            Ready to Protect Your Rights?
          </h2>
          <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            Whether you're pursuing a claim or defending against one, our experienced team is here to guide you through every step of the Small Claims process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button className="bg-primary hover:bg-primary/90 text-white w-full">
                Schedule Your Consultation
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 w-full">
                Back to Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
