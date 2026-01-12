import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { ChevronRight, CheckCircle, AlertCircle, FileText, Clock, DollarSign, Users, Shield, Briefcase, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmploymentIssuesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
                Employment Issues & Workplace Disputes
              </h1>
              <p className="font-paragraph text-lg text-foreground/80 mb-8">
                Expert guidance on employment disputes, wrongful dismissal, severance packages, and workplace rights violations. Our licensed paralegals help you navigate complex employment matters and protect your rights.
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
                src="https://static.wixstatic.com/media/99571b_9954538ec5b24b4a8a245180de229f4b~mv2.png?id=employment-issues-hero"
                alt="Employment law consultation and workplace rights guidance"
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
              Understanding Employment Disputes
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-6">
              Employment disputes can arise from various situations including wrongful dismissal, constructive dismissal, severance package disputes, and violations of workplace rights. These matters can be complex, emotionally challenging, and have significant financial implications.
            </p>
            <p className="font-paragraph text-lg text-foreground/80">
              Our licensed paralegals understand Ontario's Employment Standards Act and common law employment principles. We provide expert guidance to help you understand your rights, negotiate fair settlements, and pursue claims through appropriate channels. Whether you're an employee facing termination or an employer dealing with employment disputes, we're here to help.
            </p>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">2 Weeks</div>
              <p className="font-paragraph text-foreground/80">Minimum Notice Required (ESA)</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">$50,000</div>
              <p className="font-paragraph text-foreground/80">Small Claims Court Limit</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">Expert</div>
              <p className="font-paragraph text-foreground/80">Employment Law Guidance</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">Fair</div>
              <p className="font-paragraph text-foreground/80">Settlement Negotiation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Employment Issues */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            Types of Employment Issues We Handle
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Wrongful Dismissal',
                description: 'Representation for employees terminated without just cause or proper notice. We help you understand your entitlements and negotiate fair compensation.'
              },
              {
                title: 'Constructive Dismissal',
                description: 'Guidance when working conditions become intolerable, forcing you to resign. We assess whether you have a constructive dismissal claim and your options.'
              },
              {
                title: 'Severance Package Review',
                description: 'Expert analysis of severance offers to ensure you receive fair compensation. We negotiate on your behalf to maximize your settlement.'
              },
              {
                title: 'Termination Without Cause',
                description: 'Negotiation of severance and benefits following job loss. We ensure you receive all entitlements under the Employment Standards Act.'
              },
              {
                title: 'Notice and Pay in Lieu',
                description: 'Ensuring compliance with Employment Standards Act requirements. We verify proper notice periods and compensation calculations.'
              },
              {
                title: 'Unpaid Wages and Overtime',
                description: 'Recovery of unpaid compensation and overtime pay. We help you claim all wages owed under employment standards legislation.'
              },
              {
                title: 'Workplace Rights Violations',
                description: 'Guidance on violations of employment standards and workplace laws. We help you understand your rights and remedies.'
              },
              {
                title: 'Human Rights Violations in Employment',
                description: 'Discrimination, harassment, and retaliation claims. We provide support for human rights complaints and HRTO proceedings.'
              },
              {
                title: 'Wrongful Termination Due to Illness or Disability',
                description: 'Protection against disability-based dismissal. We ensure your rights are protected and you receive appropriate accommodation.'
              },
              {
                title: 'Breach of Employment Contract',
                description: 'Enforcement of contractual rights and remedies. We help you recover damages for breach of employment agreements.'
              },
              {
                title: 'Workplace Harassment and Bullying',
                description: 'Documentation and response strategies. We help you address harassment and pursue claims for damages.'
              },
              {
                title: 'Retaliation Claims',
                description: 'Protection against retaliation for reporting violations or exercising rights. We help you pursue retaliation claims.'
              }
            ].map((issue, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">{issue.title}</h3>
                <p className="font-paragraph text-foreground/80">{issue.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            Our Employment Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* What We Do */}
            <div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-primary" />
                What We Provide
              </h3>
              <div className="space-y-4">
                {[
                  'Initial case assessment and legal analysis',
                  'Review of employment contracts and agreements',
                  'Severance package analysis and negotiation',
                  'Documentation of workplace violations',
                  'Correspondence with employers and legal counsel',
                  'Settlement negotiation and mediation',
                  'Small Claims Court representation (up to $50,000)',
                  'Guidance on human rights complaints',
                  'Wage recovery assistance',
                  'Ongoing support and advice'
                ].map((item, idx) => (
                  <div key={idx} className="bg-pastelgreen/20 rounded-lg p-4 border border-pastelgreen/30">
                    <p className="font-paragraph text-foreground/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Us */}
            <div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                Why Choose Our Firm
              </h3>
              <div className="space-y-4">
                {[
                  'Deep knowledge of Employment Standards Act',
                  'Understanding of common law employment principles',
                  'Experience with severance negotiations',
                  'Skilled negotiators on your behalf',
                  'Compassionate approach to employment disputes',
                  'Transparent fee structures',
                  'Proven track record of successful settlements',
                  'Access to employment law resources',
                  'Support throughout the entire process',
                  'Commitment to protecting your rights'
                ].map((item, idx) => (
                  <div key={idx} className="bg-pastellavender/20 rounded-lg p-4 border border-pastellavender/30">
                    <p className="font-paragraph text-foreground/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Employment Standards Act Overview */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            Ontario Employment Standards Act
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Key Protections</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80"><strong>Minimum Wage:</strong> Employers must pay at least the minimum wage set by the province</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80"><strong>Overtime Pay:</strong> Employees are entitled to overtime pay for hours worked over 44 per week</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80"><strong>Notice of Termination:</strong> Employers must provide written notice or pay in lieu of notice</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80"><strong>Severance Pay:</strong> Employees may be entitled to severance pay based on length of service</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80"><strong>Vacation and Holidays:</strong> Employees are entitled to paid vacation and statutory holidays</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Notice Requirements</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-4">
                  <p className="font-heading font-bold text-foreground mb-2">Less than 3 months employment:</p>
                  <p className="font-paragraph text-foreground/80">No notice required (unless contract specifies)</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <p className="font-heading font-bold text-foreground mb-2">3 months to 2 years:</p>
                  <p className="font-paragraph text-foreground/80">2 weeks written notice required</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <p className="font-heading font-bold text-foreground mb-2">2 years or more:</p>
                  <p className="font-paragraph text-foreground/80">2 weeks written notice required</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <p className="font-heading font-bold text-foreground mb-2">Severance Pay (if applicable):</p>
                  <p className="font-paragraph text-foreground/80">Based on length of service and employer payroll</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Initial Consultation',
                description: 'We review your employment situation, discuss what happened, and explain your rights and options.'
              },
              {
                step: '2',
                title: 'Case Assessment',
                description: 'We analyze your employment contract, the circumstances of termination, and calculate your entitlements.'
              },
              {
                step: '3',
                title: 'Negotiation',
                description: 'We communicate with your employer or their legal counsel to negotiate a fair settlement on your behalf.'
              },
              {
                step: '4',
                title: 'Resolution',
                description: 'We finalize the settlement agreement or, if necessary, pursue your claim through Small Claims Court.'
              }
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige h-full">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="font-paragraph text-sm text-foreground/80">
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
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: 'What is wrongful dismissal?',
                a: 'Wrongful dismissal occurs when an employer terminates an employee without just cause and without providing proper notice or pay in lieu of notice. Employees may be entitled to compensation for lost wages, benefits, and damages.'
              },
              {
                q: 'What is constructive dismissal?',
                a: 'Constructive dismissal occurs when an employer makes working conditions so intolerable that an employee is forced to resign. This may include significant changes to job duties, compensation, or working conditions without consent.'
              },
              {
                q: 'How much notice am I entitled to?',
                a: 'Under the Employment Standards Act, employees are entitled to 2 weeks written notice if employed for 3 months or more. However, common law may provide for longer notice periods depending on factors like age, length of service, and position.'
              },
              {
                q: 'What is severance pay?',
                a: 'Severance pay is compensation paid to employees when their employment is terminated. It may be required under the Employment Standards Act if the employer has a payroll of $2.5 million or more and the employee has worked for 12 months or more.'
              },
              {
                q: 'Can I negotiate my severance package?',
                a: 'Yes, severance packages are often negotiable. We can review the offer, calculate your entitlements, and negotiate on your behalf to ensure you receive fair compensation.'
              },
              {
                q: 'What should I do if I\'ve been wrongfully dismissed?',
                a: 'Contact us immediately. We can assess your situation, explain your rights, and help you pursue a claim. Time limits may apply, so it\'s important to act quickly.'
              },
              {
                q: 'Can I pursue a claim for unpaid wages?',
                a: 'Yes, you may be able to recover unpaid wages, overtime pay, and other compensation owed. We can help you calculate what you\'re owed and pursue recovery.'
              },
              {
                q: 'What is the difference between notice and severance?',
                a: 'Notice is the advance warning of termination. Severance is additional compensation paid when employment ends. Both may be required depending on the circumstances and applicable laws.'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
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

      {/* Important Information */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            Important Information
          </h2>
          <div className="space-y-6">
            <div className="bg-pastellavender/20 border border-pastellavender/50 rounded-lg p-8">
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">Paralegal Scope of Practice</h3>
              <p className="font-paragraph text-foreground/80 mb-4">
                Our licensed paralegals can provide guidance on employment issues and represent you in Small Claims Court for claims up to $50,000. For matters exceeding this amount or requiring Superior Court representation, we can refer you to an experienced employment lawyer.
              </p>
            </div>
            <div className="bg-pastelgreen/20 border border-pastelgreen/30 rounded-lg p-8">
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">Confidentiality</h3>
              <p className="font-paragraph text-foreground/80 mb-4">
                All communications between you and our paralegals are protected by solicitor-client privilege. We maintain strict confidentiality regarding your employment situation and personal information.
              </p>
            </div>
            <div className="bg-pastelbeige/30 border border-pastelbeige rounded-lg p-8">
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">Time Limits</h3>
              <p className="font-paragraph text-foreground/80 mb-4">
                There are time limits for pursuing employment claims. Generally, you have 2 years from the date of termination to commence a wrongful dismissal action. Contact us promptly to ensure your rights are protected.
              </p>
            </div>
            <div className="bg-pastelpeach/30 border border-pastelpeach/30 rounded-lg p-8">
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">Professional Conduct</h3>
              <p className="font-paragraph text-foreground/80">
                We adhere to the Law Society of Ontario's Rules of Professional Conduct and maintain the highest ethical standards in our representation of clients. We are committed to protecting your interests and providing honest, practical legal guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-r from-primary/10 to-pastelbeige/30">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-6">
            Facing an Employment Dispute?
          </h2>
          <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            Don't navigate employment issues alone. Our experienced paralegals are here to protect your rights, negotiate fair settlements, and help you move forward.
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
