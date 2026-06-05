import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import AuthorityCitations, { HRTO_AUTHORITIES } from '@/components/AuthorityCitations';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { ChevronRight, CheckCircle, Users, FileText, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HumanRightsTribunalPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Human Rights Tribunal Paralegal | HRTO Representation | London Ontario"
        description="Licensed paralegal Human Rights Tribunal of Ontario representation. Discrimination complaints, workplace harassment & accommodation issues. Licensed paralegal in London, ON."
        canonical="https://www.legalassist.london/services/human-rights-tribunal"
      />
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
                Human Rights Tribunal Paralegal in Ontario
              </h1>
              <p className="font-paragraph text-lg text-foreground/80 mb-8">
                Professional representation for discrimination and human rights violations in employment, housing, and services. We advocate for your rights and help you seek justice through the HRTO process.
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
                src="https://static.wixstatic.com/media/99571b_dd992a5cea8d480083edf1f581620340~mv2.png?id=human-rights-hero"
                alt="Human Rights Tribunal of Ontario hearing room with Canadian flag and Ontario coat of arms"
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
              The Human Rights Tribunal of Ontario (HRTO) is an independent adjudicative tribunal that hears applications alleging discrimination under the Ontario <em>Human Rights Code</em>, R.S.O. 1990, c. H.19. Protected grounds include race, ancestry, place of origin, colour, ethnic origin, citizenship, creed (religion), sex (including pregnancy and breastfeeding), sexual orientation, gender identity, gender expression, age, marital status, family status, and disability. <strong>Record of offences</strong> is a protected ground in employment only, and <strong>receipt of public assistance</strong> is a protected ground in housing only.
            </p>
            <p className="font-paragraph text-lg text-foreground/80">
              We concentrate our practice on representing applicants and respondents in matters of discrimination in employment, housing, services, contracts, and vocational associations &mdash; the five social areas covered by the Code. We understand the sensitive nature of these matters and provide professional advocacy throughout the HRTO process.
            </p>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
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
              <div className="text-4xl font-bold text-primary mb-2">Licensed</div>
              <p className="font-paragraph text-foreground/80">Tribunal Advocates</p>
            </div>
          </div>

          {/* Common HRTO Violations Section */}
          <div>
            <h3 className="font-heading text-3xl font-bold text-foreground mb-8">
              Common HRTO Violations & Discrimination Types
            </h3>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">
              The HRTO addresses a wide range of discrimination and harassment claims. Below are common violations that fall under the tribunal's jurisdiction:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Employment Discrimination',
                  description: 'Unfair treatment in hiring, promotion, compensation, or termination based on protected grounds such as race, gender, disability, age, or other prohibited characteristics.'
                },
                {
                  title: 'Harassment in the Workplace',
                  description: 'Unwelcome conduct, comments, or behavior based on protected grounds that creates a hostile or intimidating work environment.'
                },
                {
                  title: 'Sexual Harassment',
                  description: 'Unwanted sexual conduct, comments, or advances in the workplace or other areas covered by the Code, including quid pro quo harassment by someone in a position of authority. Note: criminal sexual assault is a Criminal Code matter handled separately by police and the Crown.'
                },
                {
                  title: 'Disability Discrimination',
                  description: 'Failure to accommodate employees or service users with disabilities, or discrimination based on disability status, including mental health conditions.'
                },
                {
                  title: 'Racial & Ethnic Discrimination',
                  description: 'Unfair treatment based on race, colour, ancestry, ethnic origin, or place of origin in employment, housing, or services.'
                },
                {
                  title: 'Gender Identity & Expression Discrimination',
                  description: 'Discrimination based on gender identity or gender expression, including denial of services or employment opportunities.'
                },
                {
                  title: 'Age Discrimination',
                  description: 'Unfair treatment in employment or services based on age, including mandatory retirement or age-based exclusions.'
                },
                {
                  title: 'Sexual Orientation Discrimination',
                  description: 'Discrimination based on sexual orientation in employment, housing, services, or public accommodations.'
                },
                {
                  title: 'Religion & Creed Discrimination',
                  description: 'Unfair treatment based on religious beliefs or practices, including failure to accommodate religious observances.'
                },
                {
                  title: 'Family Status Discrimination',
                  description: 'Discrimination based on the parent-child relationship — for example, refusing to accommodate childcare responsibilities. (Note: pregnancy and breastfeeding are separately protected under "sex", not "family status".)'
                },
                {
                  title: 'Marital Status Discrimination',
                  description: 'Unfair treatment based on marital status, including single, married, divorced, or widowed status.'
                },
                {
                  title: 'Record of Offences Discrimination (Employment)',
                  description: 'Employment discrimination based on a provincial offence conviction or a Criminal Code conviction for which a pardon (record suspension) has been granted. This protection applies only in employment, not in housing or services.'
                },
                {
                  title: 'Housing Discrimination',
                  description: 'Denial of housing, unfair rental terms, or discriminatory practices by landlords based on protected grounds.'
                },
                {
                  title: 'Service Discrimination',
                  description: 'Denial of goods, services, or facilities based on protected grounds, including retail, hospitality, and professional services.'
                },
                {
                  title: 'Retaliation for Human Rights Complaints',
                  description: 'Adverse treatment or punishment for filing a human rights complaint or participating in an investigation.'
                },
                {
                  title: 'Systemic Discrimination',
                  description: 'Policies, practices, or procedures that appear neutral but have a discriminatory effect on individuals with protected characteristics.'
                },
                {
                  title: 'Intersectional Discrimination',
                  description: 'Discrimination based on multiple protected grounds simultaneously, such as race and gender, or disability and age.'
                },
                {
                  title: 'Accommodation Failures',
                  description: 'Employer or service provider failure to provide reasonable accommodation for disabilities, religious practices, or other protected needs.'
                },
                {
                  title: 'Pregnancy & Parental Leave Discrimination',
                  description: 'Unfair treatment related to pregnancy, childbirth, breastfeeding, or parental leave entitlements.'
                },
                {
                  title: 'Harassment Tied to a Protected Ground',
                  description: 'Persistent comments, conduct, or treatment tied to a protected ground that creates a poisoned environment. General workplace bullying alone is NOT within HRTO jurisdiction unless it is connected to a protected ground; pure workplace bullying is governed by the Occupational Health and Safety Act and addressed by the Ministry of Labour.'
                }
              ].map((violation, idx) => (
                <div key={idx} className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige hover:shadow-md transition-shadow">
                  <h4 className="font-heading text-lg font-bold text-foreground mb-2">
                    {violation.title}
                  </h4>
                  <p className="font-paragraph text-foreground/80 text-sm">
                    {violation.description}
                  </p>
                </div>
              ))}
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
                      Professional guidance on collecting, organizing, and presenting evidence that supports your discrimination claim.
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
                      Reconsideration & Judicial Review
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      HRTO decisions are not appealed in the conventional sense. We can assist with a request for <em>reconsideration</em> by the HRTO under s.45.7 of the Code, or with a <em>judicial review</em> application to the Divisional Court under s.45.8 where appropriate.
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
                      Reconsideration & Judicial Review
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      The Code does not provide a conventional appeal from HRTO decisions. We can assist with a request for reconsideration to the HRTO (s.45.7) or a judicial-review application to the Divisional Court (s.45.8) on grounds such as a denial of natural justice or an unreasonable decision.
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
                title: 'Application (Form 1)',
                description: 'We help you file Form 1 — the Application to the HRTO — within the 1-year limitation period in s.34(1) of the Code, identifying the protected ground(s), social area, and remedy sought.'
              },
              {
                step: '2',
                title: 'Response & Reply',
                description: 'The HRTO is an adjudicative tribunal — it does not investigate. The respondent files a Response (Form 2) within 35 days; the applicant may file a Reply (Form 3) within 14 days of the Response.'
              },
              {
                step: '3',
                title: 'Mediation (Voluntary)',
                description: 'The HRTO offers free voluntary mediation at no cost. Many cases settle here. If mediation is declined or unsuccessful, the case proceeds toward a hearing.'
              },
              {
                step: '4',
                title: 'Hearing & Decision',
                description: 'A full evidentiary hearing before an HRTO adjudicator. The tribunal can order monetary remedies (including damages for injury to dignity, feelings, and self-respect under s.45.2(1)1), reinstatement, policy changes, and other public-interest remedies.'
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
                a: 'Under the Ontario Human Rights Code, the protected grounds are: race, ancestry, place of origin, colour, ethnic origin, citizenship, creed (religion), sex (including pregnancy and breastfeeding), sexual orientation, gender identity, gender expression, age, marital status, family status, and disability. Record of offences is a protected ground in employment only. Receipt of public assistance is a protected ground in housing only. Political belief is NOT a protected ground in Ontario.'
              },
              {
                q: 'What areas of life does the Ontario Human Rights Code cover?',
                a: 'The Code covers five social areas: services, goods and facilities (s.1); the occupancy of accommodation / housing (s.2); contracts (s.3); employment (s.5); and vocational associations such as trade unions, trade associations, and self-governing professions (s.6).'
              },
              {
                q: 'Is there a time limit for filing an application?',
                a: 'Yes. Section 34(1) of the Code requires the application to be filed within one year of the incident, OR within one year of the last incident in a series of incidents. Section 34(2) allows late applications if the delay was incurred in good faith and there is no substantial prejudice — but late filings are discretionary, so do not delay.'
              },
              {
                q: 'What remedies can the HRTO award?',
                a: 'Remedies under s.45.2(1) of the Code include: monetary compensation for lost wages, benefits, and out-of-pocket costs; general damages for injury to dignity, feelings, and self-respect; non-monetary remedies (reinstatement, hiring, policy changes); and public-interest remedies (training, posting of policies, monitoring). There is no statutory cap on injury-to-dignity awards.'
              },
              {
                q: 'Do I need a lawyer to file an application?',
                a: 'No. The HRTO has no filing fee and applicants frequently appear without representation. However, having experienced representation can significantly improve outcome quality, especially at hearing. Licensed paralegals have full rights of representation at the HRTO under Law Society of Ontario By-Law 4.'
              },
              {
                q: 'How long does an HRTO application typically take?',
                a: 'HRTO applications typically take 12-24 months from filing to a final hearing decision, depending on complexity, settlement attempts, and current tribunal scheduling. Many cases settle at mediation, which usually occurs in the first 6-9 months.'
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
            Whether you've experienced discrimination or need to defend against a complaint, our experienced team is here to guide you through the HRTO process with care and professionalism.
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

      {/* Governing authorities — Human Rights Code, HRTO Rules of
          Procedure, Statutory Powers Procedure Act. Per 2026-05-29
          SEO plan (Service Page SEO #4). */}
      <AuthorityCitations authorities={HRTO_AUTHORITIES} />

      <Footer />
    </div>
  );
}
