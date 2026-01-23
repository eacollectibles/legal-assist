import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { ChevronRight, Scale, Users, DollarSign, CheckCircle, XCircle, HelpCircle, Building, Car, Home, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQSection } from '@/components/FAQSection';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { PHONE_HREF, PHONE_DISPLAY } from '@/lib/contact';

const faqs = [
  {
    question: 'What is a paralegal in Ontario?',
    answer: 'A paralegal is a licensed legal professional regulated by the Law Society of Ontario. Paralegals complete an accredited college program, pass licensing exams, and maintain insurance and continuing education. They can represent clients in specific courts and tribunals, provide legal advice within their scope, and charge for their services—just like lawyers do within their scope.'
  },
  {
    question: 'Is a paralegal as good as a lawyer?',
    answer: 'Within their scope of practice, yes. Paralegals specialize in specific areas (Small Claims Court, traffic tickets, LTB, tribunals) and often have more experience in these venues than general practice lawyers. For complex matters outside paralegal scope (criminal charges, family law, real estate), you need a lawyer. For matters within scope, paralegals often provide better value.'
  },
  {
    question: 'How much cheaper is a paralegal than a lawyer?',
    answer: 'Paralegals typically charge 30-50% less than lawyers for comparable services. For example, defending a traffic ticket might cost $300-500 with a paralegal vs. $600-1000+ with a lawyer. Small Claims Court representation might be $750-1500 with a paralegal vs. $2000-5000+ with a lawyer. The savings come from lower overhead, not lower quality.'
  },
  {
    question: 'Can a paralegal represent me in criminal court?',
    answer: 'Only for summary conviction offences under the Provincial Offences Act (not the Criminal Code). True criminal matters (theft, assault, impaired driving) require a lawyer. However, quasi-criminal matters like regulatory offences, bylaw violations, and most traffic tickets fall within paralegal scope.'
  },
  {
    question: 'How do I verify a paralegal is licensed?',
    answer: 'Check the Law Society of Ontario\'s online directory at lso.ca. Enter the paralegal\'s name to verify their license is active and in good standing. You can also see any discipline history. All practicing paralegals must display their LSO number. Never hire someone who can\'t provide their license number.'
  }
];

const paralegalsCanHandle = [
  {
    icon: Building,
    title: 'Small Claims Court',
    description: 'Civil claims up to $35,000 (or $50,000 with consent)',
    examples: ['Debt collection', 'Contract disputes', 'Property damage', 'Consumer complaints']
  },
  {
    icon: Home,
    title: 'Landlord and Tenant Board',
    description: 'All LTB matters for landlords and tenants',
    examples: ['Eviction defence', 'Rent arrears', 'N12/N13 hearings', 'Maintenance issues', 'Above-guideline increases']
  },
  {
    icon: Car,
    title: 'Traffic & Provincial Offences',
    description: 'Highway Traffic Act and POA matters',
    examples: ['Speeding tickets', 'Careless driving', 'Stunt driving', 'Red light tickets', 'Bylaw violations']
  },
  {
    icon: Scale,
    title: 'Tribunals',
    description: 'Ontario administrative tribunals',
    examples: ['Human Rights Tribunal (HRTO)', 'Licence Appeal Tribunal', 'Social Benefits Tribunal', 'Workplace Safety']
  },
  {
    icon: Briefcase,
    title: 'Summary Conviction Offences',
    description: 'Minor offences under certain statutes',
    examples: ['Trespass to Property Act', 'Liquor Licence Act', 'Fish & Wildlife Conservation', 'Occupational Health & Safety']
  }
];

const lawyersOnly = [
  'Criminal Code offences (theft, assault, fraud, impaired driving)',
  'Family law (divorce, custody, child support)',
  'Real estate transactions',
  'Wills and estates',
  'Immigration matters',
  'Superior Court civil matters over $35,000',
  'Corporate law and business transactions',
  'Complex tax disputes'
];

export default function LawyerVsParalegalPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Lawyer vs Paralegal: Who Can Represent Me in Ontario?"
        description="Understand the difference between lawyers and paralegals in Ontario. Learn what paralegals can do, when you need a lawyer, and how to choose the right legal professional for your matter."
        canonical="https://www.legalassist.london/guides/lawyer-vs-paralegal"
      />
      <Header />
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 pt-4">
        <Breadcrumbs />
      </div>

      {/* Hero Section with Summary */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Do I Need a Lawyer or Can a Paralegal Represent Me?
          </h1>
          
          {/* Quick Summary */}
          <div className="bg-white border-l-4 border-primary p-6 rounded-r-lg shadow-sm mb-8">
            <p className="font-paragraph text-lg text-foreground/90 leading-relaxed">
              <strong>Quick Summary:</strong> In Ontario, licensed paralegals can represent you in Small Claims Court, 
              Landlord and Tenant Board, traffic court, provincial offences, and most tribunals—often at 30-50% less than lawyer fees. 
              For criminal charges, family law, or complex matters, you'll need a lawyer.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/booking">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Consult a Licensed Paralegal
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href={PHONE_HREF}>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                Call {PHONE_DISPLAY}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* What Paralegals Can Handle */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
            What Licensed Paralegals Can Handle
          </h2>
          <p className="text-foreground/70 mb-8">
            Ontario paralegals are authorized by the Law Society of Ontario to represent clients in these areas:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paralegalsCanHandle.map((area, index) => (
              <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-5">
                <div className="flex items-start gap-3 mb-3">
                  <area.icon className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">{area.title}</h3>
                    <p className="text-green-700 text-sm">{area.description}</p>
                  </div>
                </div>
                <ul className="space-y-1 ml-9">
                  {area.examples.map((example, i) => (
                    <li key={i} className="text-sm text-foreground/70 flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Requires a Lawyer */}
      <section className="w-full py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
            When You Need a Lawyer Instead
          </h2>
          <p className="text-foreground/70 mb-8">
            These matters are outside paralegal scope and require a licensed lawyer:
          </p>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lawyersOnly.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  <span className="text-foreground/80 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-foreground/70 mt-6 text-sm">
            If you're unsure whether your matter falls within paralegal scope, contact us for a free assessment. 
            We'll let you know honestly if you need a lawyer instead.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
            Paralegal vs Lawyer: Side-by-Side
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Factor</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-primary">Paralegal</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Lawyer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-medium">Regulated by</td>
                  <td className="border border-gray-200 px-4 py-3">Law Society of Ontario</td>
                  <td className="border border-gray-200 px-4 py-3">Law Society of Ontario</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Training</td>
                  <td className="border border-gray-200 px-4 py-3">College diploma + licensing exam</td>
                  <td className="border border-gray-200 px-4 py-3">Law degree + bar exam + articling</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-medium">Insurance required</td>
                  <td className="border border-gray-200 px-4 py-3 text-green-600">✓ Yes</td>
                  <td className="border border-gray-200 px-4 py-3 text-green-600">✓ Yes</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Typical hourly rate</td>
                  <td className="border border-gray-200 px-4 py-3 text-green-600">$100-200/hr</td>
                  <td className="border border-gray-200 px-4 py-3">$250-500+/hr</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-medium">Small Claims Court</td>
                  <td className="border border-gray-200 px-4 py-3 text-green-600">✓ Full representation</td>
                  <td className="border border-gray-200 px-4 py-3 text-green-600">✓ Full representation</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">LTB</td>
                  <td className="border border-gray-200 px-4 py-3 text-green-600">✓ Full representation</td>
                  <td className="border border-gray-200 px-4 py-3 text-green-600">✓ Full representation</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-medium">Traffic tickets</td>
                  <td className="border border-gray-200 px-4 py-3 text-green-600">✓ Full representation</td>
                  <td className="border border-gray-200 px-4 py-3 text-green-600">✓ Full representation</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Criminal charges</td>
                  <td className="border border-gray-200 px-4 py-3 text-red-600">✗ Not permitted</td>
                  <td className="border border-gray-200 px-4 py-3 text-green-600">✓ Full representation</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-medium">Family law</td>
                  <td className="border border-gray-200 px-4 py-3 text-red-600">✗ Not permitted</td>
                  <td className="border border-gray-200 px-4 py-3 text-green-600">✓ Full representation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Choose a Paralegal */}
      <section className="w-full py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
            Why Choose a Paralegal for Your Matter?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <DollarSign className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-lg font-semibold mb-2">Lower Cost</h3>
              <p className="text-foreground/70 text-sm">
                30-50% less than comparable lawyer fees. Same quality representation, more accessible pricing.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <Users className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-lg font-semibold mb-2">Specialized Focus</h3>
              <p className="text-foreground/70 text-sm">
                Paralegals focus on specific areas. More experience in Small Claims, LTB, and traffic than general lawyers.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <Scale className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-lg font-semibold mb-2">Same Regulation</h3>
              <p className="text-foreground/70 text-sm">
                Licensed, insured, and regulated by the Law Society of Ontario—the same body that regulates lawyers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Decision Helper */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
            Quick Decision Guide
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <HelpCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">
                  "I got a traffic ticket" → <span className="text-green-700">Paralegal</span>
                </p>
                <p className="text-sm text-foreground/70">All traffic and POA tickets are within paralegal scope.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <HelpCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">
                  "My landlord is evicting me" → <span className="text-green-700">Paralegal</span>
                </p>
                <p className="text-sm text-foreground/70">All LTB matters are within paralegal scope.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <HelpCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">
                  "Someone owes me $15,000" → <span className="text-green-700">Paralegal</span>
                </p>
                <p className="text-sm text-foreground/70">Small Claims Court (up to $35,000) is within paralegal scope.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <HelpCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">
                  "I was charged with assault" → <span className="text-red-700">Lawyer</span>
                </p>
                <p className="text-sm text-foreground/70">Criminal Code charges require a lawyer.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <HelpCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">
                  "I'm getting divorced" → <span className="text-red-700">Lawyer</span>
                </p>
                <p className="text-sm text-foreground/70">Family law matters require a lawyer.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
            Frequently Asked Questions
          </h2>
          <FAQSection faqs={faqs} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-16 bg-primary/10">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
            Not Sure If We Can Help?
          </h2>
          <p className="font-paragraph text-lg text-foreground/80 mb-8">
            Contact us for a free assessment. We'll review your situation and let you know honestly 
            whether we can help or if you need a lawyer instead. No pressure, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8">
                Book Free Consultation
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                About Our Services
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-foreground/60 mt-6">
            LegalAssist Paralegal Services is licensed by the Law Society of Ontario (P#12345)
          </p>
        </div>
      </section>

      {/* Related Services */}
      <RelatedServices currentPath="/guides/lawyer-vs-paralegal" config={relatedServicesConfig.default} />

      <Footer />
    </div>
  );
}
