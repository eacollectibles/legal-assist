import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { ChevronRight, CheckCircle, Users, FileText, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HumanRightsTribunalPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
                Human Rights Tribunal of Ontario Services
              </h1>
              <p className="font-paragraph text-lg text-foreground/80 mb-8">
                Expert representation for discrimination and human rights violations in employment, housing, and services. We advocate for your rights and help you seek justice through the HRTO process.
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
                src="https://static.wixstatic.com/media/99571b_8eeb6e0cb3ea4bb783f3c8570051be7d~mv2.png?id=human-rights-hero"
                alt="Human Rights Tribunal of Ontario"
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
              What is the Human Rights Tribunal of Ontario?
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-6">
              The Human Rights Tribunal of Ontario (HRTO) is an independent tribunal that addresses complaints of discrimination based on protected grounds under the Ontario Human Rights Code. These grounds include race, ancestry, place of origin, political belief, colour, ethnic origin, creed, sex, sexual orientation, gender identity, gender expression, age, record of offences, marital status, family status, and disability.
            </p>
            <p className="font-paragraph text-lg text-foreground/80">
              Our firm specializes in representing individuals who have experienced discrimination in employment, housing, services, and other areas covered by the Code. We understand the sensitive nature of human rights matters and provide compassionate, professional advocacy throughout the HRTO process.
            </p>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">12-24</div>
              <p className="font-paragraph text-foreground/80">Months to Hearing</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">Protected</div>
              <p className="font-paragraph text-foreground/80">Grounds Covered</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">No Cost</div>
              <p className="font-paragraph text-foreground/80">Filing Fees</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">Expert</div>
              <p className="font-paragraph text-foreground/80">Tribunal Advocates</p>
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
                      Complaint Preparation & Filing
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      We help you prepare a comprehensive complaint that clearly articulates your discrimination experience and identifies the protected grounds involved.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Evidence Gathering & Organization
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Expert guidance on collecting, organizing, and presenting evidence that supports your discrimination claim.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Witness Preparation
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      We prepare you and your witnesses for testimony, ensuring you're confident and well-prepared for the hearing.
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
                      Strategic negotiation to resolve your complaint on favorable terms, including compensation and remedies.
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
                      HRTO Hearing Representation
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Full representation at the tribunal hearing, including presenting your case, examining witnesses, and cross-examining respondents.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Remedy Advocacy
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      We advocate for appropriate remedies including compensation for lost wages, emotional distress, and systemic changes.
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
                      If needed, we provide guidance and representation for appeals to protect your interests and seek justice.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Ongoing Support & Guidance
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Continuous support throughout the process to keep you informed, confident, and prepared for each stage.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services for Respondents */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            Services for Respondents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Complaint Analysis & Defense Strategy
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Thorough analysis of the complaint against you to identify weaknesses and develop a strong defense strategy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Response Preparation
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Professional preparation of your response to the complaint, clearly articulating your position and defenses.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Evidence Preparation & Witness Coordination
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Organization of evidence and coordination of witnesses to support your defense at the hearing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <DollarSign className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Settlement Negotiation
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Strategic negotiation to resolve the complaint on favorable terms, minimizing liability and costs.
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
                      HRTO Hearing Defense
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Vigorous representation at the tribunal hearing, including presenting your defense and cross-examining the applicant.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Remedy Mitigation
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Advocacy to minimize remedies and damages awarded, protecting your interests and organizational liability.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Compliance & Policy Guidance
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Guidance on human rights compliance and policy development to prevent future complaints and exposure.
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
                      Expert support for appeals if you believe the decision was unjust or based on legal errors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HRTO Process Overview */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            The HRTO Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Complaint Filing',
                description: 'We help you file a comprehensive complaint with the HRTO, clearly articulating the discrimination and protected grounds involved.'
              },
              {
                step: '2',
                title: 'Investigation & Response',
                description: 'The HRTO investigates the complaint. We prepare your response and gather evidence to support your position.'
              },
              {
                step: '3',
                title: 'Pre-Hearing Preparation',
                description: 'We organize evidence, prepare witnesses, and develop strategy for the hearing.'
              },
              {
                step: '4',
                title: 'Hearing & Decision',
                description: 'Full representation at the hearing and advocacy for appropriate remedies based on the tribunal\'s decision.'
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
                q: 'What grounds of discrimination does the HRTO cover?',
                a: 'The HRTO covers discrimination based on race, ancestry, place of origin, political belief, colour, ethnic origin, creed, sex, sexual orientation, gender identity, gender expression, age, record of offences, marital status, family status, and disability.'
              },
              {
                q: 'What areas of life does the Ontario Human Rights Code cover?',
                a: 'The Code covers employment, housing, services, facilities, contracts, and membership in unions and professional associations.'
              },
              {
                q: 'Is there a time limit for filing a complaint?',
                a: 'Generally, complaints must be filed within one year of the last incident of discrimination, though there are limited exceptions for continuing discrimination.'
              },
              {
                q: 'What remedies can the HRTO award?',
                a: 'Remedies may include compensation for lost wages and benefits, damages for emotional distress, reinstatement or hiring, policy changes, and other measures to address the discrimination.'
              },
              {
                q: 'Do I need a lawyer to file a complaint?',
                a: 'While not required, having experienced representation significantly improves your chances of success and ensures your complaint is properly prepared and presented.'
              },
              {
                q: 'How long does an HRTO complaint typically take?',
                a: 'HRTO complaints typically take 12-24 months from filing to hearing, depending on complexity and tribunal scheduling. Some cases may be resolved faster through settlement.'
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
            Advocate for Your Human Rights
          </h2>
          <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            Whether you've experienced discrimination or need to defend against a complaint, our experienced team is here to guide you through the HRTO process with compassion and expertise.
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
