import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { ChevronRight, CheckCircle, AlertCircle, FileText, Clock, DollarSign, Users, Shield, Briefcase, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmploymentIssuesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Employment Issues & Workplace Disputes | London Ontario"
        description="Employment law paralegal in London, Ontario. Wrongful dismissal, workplace harassment, employment standards & severance disputes. Protect your workplace rights."
        canonical="https://www.legalassist.london/services/employment-issues"
      />
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
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h2>
            <p className="font-paragraph text-lg text-foreground/80">
              Get answers to common questions about employment rights, dismissal, severance, and how our paralegals can help you navigate employment disputes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Wrongful Dismissal */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                What is wrongful dismissal?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4 leading-relaxed">
                Wrongful dismissal occurs when an employer terminates an employee without just cause and without providing proper notice or pay in lieu of notice. This is a breach of the employment contract.
              </p>
              <p className="font-paragraph text-foreground/80 leading-relaxed">
                Employees may be entitled to compensation for lost wages, benefits, damages for breach of contract, and in some cases, damages for mental distress. The amount depends on factors like length of service, age, position, and availability of similar employment.
              </p>
            </div>

            {/* Constructive Dismissal */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                What is constructive dismissal?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4 leading-relaxed">
                Constructive dismissal occurs when an employer makes working conditions so intolerable that an employee is forced to resign. The employee didn't quit voluntarily—they were effectively forced out.
              </p>
              <p className="font-paragraph text-foreground/80 leading-relaxed">
                Examples include significant unilateral changes to job duties, compensation, work location, or reporting structure without consent. If you resign due to constructive dismissal, you may have the same remedies as wrongful dismissal.
              </p>
            </div>

            {/* Employment Contracts */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                What should I know about employment contracts?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4 leading-relaxed">
                Employment contracts define the terms and conditions of your employment, including salary, benefits, notice periods, and termination clauses. It's crucial to understand what your contract says before signing.
              </p>
              <p className="font-paragraph text-foreground/80 leading-relaxed">
                We can review your contract, explain the terms, identify any problematic clauses, and advise you on your rights and obligations. Some contract terms may be unenforceable if they violate employment standards legislation.
              </p>
            </div>

            {/* Notice Requirements */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                How much notice am I entitled to?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4 leading-relaxed">
                Under the Employment Standards Act, employees are entitled to 2 weeks written notice if employed for 3 months or more. However, common law may provide for longer notice periods.
              </p>
              <p className="font-paragraph text-foreground/80 leading-relaxed">
                Common law notice depends on factors like age, length of service, position, and availability of similar employment. Senior employees with long service may be entitled to several months of notice. Your contract may also specify notice requirements.
              </p>
            </div>

            {/* Severance Pay */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                What is severance pay and when am I entitled to it?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4 leading-relaxed">
                Severance pay is additional compensation paid when employment ends. Under the Employment Standards Act, severance is required if the employer has a payroll of $2.5 million or more and the employee has worked for 12 months or more.
              </p>
              <p className="font-paragraph text-foreground/80 leading-relaxed">
                The amount is calculated based on length of service (2 days per year of employment). However, common law may entitle you to additional severance beyond statutory minimums, depending on your circumstances.
              </p>
            </div>

            {/* Severance Negotiation */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                Can I negotiate my severance package?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4 leading-relaxed">
                Yes, severance packages are often negotiable, especially if you have leverage or a strong legal claim. Many employers are willing to negotiate to avoid litigation.
              </p>
              <p className="font-paragraph text-foreground/80 leading-relaxed">
                We can review the offer, calculate your legal entitlements, identify gaps, and negotiate on your behalf to ensure you receive fair compensation. We help you understand what you're entitled to and what's negotiable.
              </p>
            </div>

            {/* Just Cause */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                What does "just cause" for dismissal mean?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4 leading-relaxed">
                Just cause means the employer has a legitimate, serious reason to terminate employment immediately without notice or pay in lieu. Examples include theft, violence, gross insubordination, or repeated serious misconduct.
              </p>
              <p className="font-paragraph text-foreground/80 leading-relaxed">
                Just cause is a high legal standard. Minor performance issues, single instances of misconduct, or poor fit are generally not just cause. If your employer claims just cause, we can assess whether it's legally justified.
              </p>
            </div>

            {/* Unpaid Wages */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                Can I recover unpaid wages and overtime?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4 leading-relaxed">
                Yes, you have the right to be paid for all work performed. If your employer hasn't paid you wages, overtime, vacation pay, or statutory holiday pay, you can pursue recovery.
              </p>
              <p className="font-paragraph text-foreground/80 leading-relaxed">
                We can help you calculate what you're owed, document the unpaid amounts, and pursue recovery through negotiation or Small Claims Court. There are time limits, so contact us promptly.
              </p>
            </div>

            {/* Notice vs Severance */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                What is the difference between notice and severance?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4 leading-relaxed">
                <strong>Notice</strong> is advance warning of termination, allowing you time to find new employment. <strong>Severance</strong> is additional compensation paid when employment ends.
              </p>
              <p className="font-paragraph text-foreground/80 leading-relaxed">
                An employer can provide notice (allowing you to work during the notice period) or pay in lieu of notice (paying you instead of having you work). Severance is separate and may be required in addition to notice.
              </p>
            </div>

            {/* Wrongful Dismissal Steps */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                What should I do if I've been wrongfully dismissed?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4 leading-relaxed">
                <strong>Contact us immediately.</strong> Time limits apply to employment claims, and evidence can be lost. Here's what to do:
              </p>
              <ul className="space-y-2 font-paragraph text-foreground/80">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">1.</span>
                  <span>Document everything (emails, letters, termination notice)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">2.</span>
                  <span>Gather information about your employment (length, salary, benefits)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">3.</span>
                  <span>Contact us for a free consultation to assess your claim</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">4.</span>
                  <span>We'll help you pursue recovery through negotiation or court</span>
                </li>
              </ul>
            </div>

            {/* Role of Paralegal */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                What can a paralegal do in employment disputes?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4 leading-relaxed">
                Licensed paralegals can provide comprehensive support in employment matters within their scope of practice, including:
              </p>
              <ul className="space-y-2 font-paragraph text-foreground/80">
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span>Case assessment and legal analysis</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span>Contract review and explanation</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span>Negotiation with employers</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span>Small Claims Court representation (up to $50,000)</span>
                </li>
              </ul>
            </div>

            {/* Time Limits */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                Are there time limits for pursuing employment claims?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4 leading-relaxed">
                Yes, time limits are critical. Generally, you have <strong>2 years from the date of termination</strong> to commence a wrongful dismissal action. Some claims may have different time limits.
              </p>
              <p className="font-paragraph text-foreground/80 leading-relaxed">
                If you miss the deadline, you lose your right to sue. Contact us promptly to ensure your rights are protected and your claim is filed within the required timeframe.
              </p>
            </div>

            {/* Discrimination and Harassment */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                What if I was dismissed due to discrimination or harassment?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4 leading-relaxed">
                Dismissal based on protected grounds (race, gender, disability, age, etc.) is illegal under human rights legislation. You may have claims for both wrongful dismissal and human rights violations.
              </p>
              <p className="font-paragraph text-foreground/80 leading-relaxed">
                We can help you assess whether discrimination or harassment occurred, document the evidence, and pursue claims through Small Claims Court or refer you to a lawyer for human rights tribunal proceedings.
              </p>
            </div>

            {/* Retaliation */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                Can I be fired for reporting violations or exercising my rights?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4 leading-relaxed">
                No. Retaliation for reporting violations, exercising legal rights, or refusing to do something illegal is prohibited. If you were dismissed or disciplined for these reasons, you may have a retaliation claim.
              </p>
              <p className="font-paragraph text-foreground/80 leading-relaxed">
                Examples include reporting health and safety violations, requesting accommodation for disability, or refusing to work in unsafe conditions. We can help you assess and pursue retaliation claims.
              </p>
            </div>

            {/* Cost and Fees */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                How much does it cost to get help with an employment dispute?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4 leading-relaxed">
                We offer transparent, affordable pricing. Our paralegals charge hourly rates ($150-250/hour depending on experience) or flat-fee packages for specific services.
              </p>
              <p className="font-paragraph text-foreground/80 leading-relaxed">
                We offer a free 30-minute initial consultation to assess your situation. We'll discuss your options, explain our fees, and help you understand what to expect. Payment plans may be available.
              </p>
            </div>

            {/* Confidentiality */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                Is my information confidential?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4 leading-relaxed">
                Yes, absolutely. All communications between you and our paralegals are protected by solicitor-client privilege. We maintain strict confidentiality regarding your employment situation and personal information.
              </p>
              <p className="font-paragraph text-foreground/80 leading-relaxed">
                We will not disclose any information without your consent, except as required by law. Your privacy and confidentiality are fundamental to our service.
              </p>
            </div>

            {/* When to Contact */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                When should I contact a paralegal about my employment issue?
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4 leading-relaxed">
                Contact us as soon as possible if you:
              </p>
              <ul className="space-y-2 font-paragraph text-foreground/80">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Have been terminated or given notice</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Received a severance offer you want to review</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Haven't been paid wages or overtime</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Are experiencing workplace harassment or discrimination</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Need to review an employment contract</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Have questions about your employment rights</span>
                </li>
              </ul>
            </div>
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
            <Link to="/contact">
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
