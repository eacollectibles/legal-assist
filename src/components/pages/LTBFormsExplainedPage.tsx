import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { ChevronRight, FileText, Clock, AlertCircle, CheckCircle, Home, Banknote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQSection } from '@/components/FAQSection';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { PHONE_HREF, PHONE_DISPLAY } from '@/lib/contact';

const faqs = [
  {
    question: 'What happens if I receive an N4 notice?',
    answer: 'Don\'t panic. An N4 gives you 14 days to pay the rent owed and "void" the notice—meaning the eviction stops. If you pay in full within 14 days, the landlord cannot proceed. If you can\'t pay, you still have the right to a hearing where you can propose a payment plan or raise defences.'
  },
  {
    question: 'Can a landlord evict me with just an N4?',
    answer: 'No. An N4 is only a notice. The landlord must then file an L1 application with the LTB and wait for a hearing. You\'ll receive notice of the hearing date and have the opportunity to respond, propose payment arrangements, or raise defences. Only an LTB order can lead to eviction.'
  },
  {
    question: 'What\'s the difference between N4 and N5?',
    answer: 'N4 is for non-payment of rent. N5 is for other lease violations like causing damage, disturbing other tenants, or illegal activity. N4 can be voided by paying rent. The first N5 can be voided by stopping the behaviour within 7 days. A second N5 within 6 months cannot be voided.'
  },
  {
    question: 'How long does an L1 eviction take?',
    answer: 'Currently, L1 applications take approximately 3-6 months from filing to hearing due to LTB backlogs. If you pay the rent owed before the hearing (or at the hearing), the application can be dismissed. If an eviction order is granted, it typically gives 11 days to move out.'
  },
  {
    question: 'What defences can I raise to an L1 or L2?',
    answer: 'Common defences include: the landlord didn\'t properly serve the notice, the notice has calculation errors, you\'ve already paid the rent, the landlord owes you money for maintenance issues (set-off), the landlord didn\'t collect a last month\'s rent deposit, or there are issues with how the landlord applied previous payments.'
  }
];

const forms = [
  {
    code: 'N4',
    title: 'Notice to End Tenancy for Non-Payment of Rent',
    who: 'Landlord gives to Tenant',
    reason: 'Tenant has not paid rent in full',
    timeline: '14 days to pay and void the notice',
    voidable: true,
    voidMethod: 'Pay all rent owed within 14 days',
    whatHappensNext: 'If not voided, landlord can file L1 application',
    tips: [
      'Check the calculation—landlords often make errors',
      'Partial payment does NOT void the N4',
      'The termination date must be at least 14 days away',
      'Keep proof of any payments you make'
    ]
  },
  {
    code: 'N5',
    title: 'Notice to End Tenancy for Interfering with Others or Damage',
    who: 'Landlord gives to Tenant',
    reason: 'Tenant is disturbing others, causing damage, or violating lease',
    timeline: '20 days (first N5), 14 days (second N5)',
    voidable: true,
    voidMethod: 'Stop the behaviour within 7 days (first N5 only)',
    whatHappensNext: 'If not voided, landlord can file L2 application',
    tips: [
      'First N5 can be voided by correcting the issue within 7 days',
      'Second N5 within 6 months CANNOT be voided',
      'Challenge vague allegations—be specific about what happened',
      'Document your side of the story'
    ]
  },
  {
    code: 'L1',
    title: 'Application to Evict a Tenant for Non-Payment of Rent',
    who: 'Landlord files with LTB',
    reason: 'Tenant did not void the N4 notice',
    timeline: 'Hearing in approximately 3-6 months',
    voidable: false,
    voidMethod: 'Pay rent owed before or at hearing to potentially dismiss',
    whatHappensNext: 'LTB hearing where both sides present their case',
    tips: [
      'You\'ll receive a Notice of Hearing with the date',
      'Bring all payment receipts and bank records',
      'You can request a payment plan at the hearing',
      'Even if an order is granted, you may have 11+ days to pay/move'
    ]
  },
  {
    code: 'L2',
    title: 'Application to End a Tenancy and Evict a Tenant',
    who: 'Landlord files with LTB',
    reason: 'For reasons other than non-payment (damage, interference, illegal acts)',
    timeline: 'Hearing in approximately 4-8 months',
    voidable: false,
    voidMethod: 'Not applicable—must defend at hearing',
    whatHappensNext: 'LTB hearing where landlord must prove their case',
    tips: [
      'Landlord has the burden of proof',
      'Challenge the evidence—was it really that serious?',
      'Bring witnesses who can support your version',
      'Document any maintenance issues (may be relevant to "damage" claims)'
    ]
  }
];

export default function LTBFormsExplainedPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="LTB Forms Explained: N4, N5, L1, L2 | Ontario Landlord Tenant Board"
        description="Simple explanation of Ontario LTB forms. Learn what N4, N5, L1, and L2 notices mean, your rights, timelines, and how to respond. Free consultation with a licensed paralegal."
        canonical="https://www.legalassist.london/guides/ltb-forms-explained"
      />
      <Header />
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 pt-4">
        <Breadcrumbs />
      </div>

      {/* Hero Section with Summary */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            LTB Forms Explained Simply: N4, N5, L1, L2
          </h1>
          
          {/* Quick Summary */}
          <div className="bg-white border-l-4 border-primary p-6 rounded-r-lg shadow-sm mb-8">
            <p className="font-paragraph text-lg text-foreground/90 leading-relaxed">
              <strong>Quick Summary:</strong> N4 and N5 are notices landlords give tenants warning of potential eviction. 
              L1 and L2 are applications landlords file with the LTB to actually start the eviction process. 
              Receiving a notice doesn't mean automatic eviction—you have rights and options to respond.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/booking">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Get Help with LTB Matters
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

      {/* Quick Reference Table */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
            Quick Reference: Which Form Is Which?
          </h2>
          <p className="text-foreground/70 mb-8">
            Understanding the difference between notices (N forms) and applications (L forms) is crucial.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Form</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Type</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Reason</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Can Be Voided?</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-semibold text-primary">N4</td>
                  <td className="border border-gray-200 px-4 py-3">Notice</td>
                  <td className="border border-gray-200 px-4 py-3">Non-payment of rent</td>
                  <td className="border border-gray-200 px-4 py-3 text-green-600">Yes (pay within 14 days)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-semibold text-primary">N5</td>
                  <td className="border border-gray-200 px-4 py-3">Notice</td>
                  <td className="border border-gray-200 px-4 py-3">Behaviour/damage issues</td>
                  <td className="border border-gray-200 px-4 py-3 text-green-600">Yes (first one only)</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-semibold text-primary">L1</td>
                  <td className="border border-gray-200 px-4 py-3">Application</td>
                  <td className="border border-gray-200 px-4 py-3">Eviction for non-payment</td>
                  <td className="border border-gray-200 px-4 py-3 text-amber-600">Hearing required</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-semibold text-primary">L2</td>
                  <td className="border border-gray-200 px-4 py-3">Application</td>
                  <td className="border border-gray-200 px-4 py-3">Eviction for other reasons</td>
                  <td className="border border-gray-200 px-4 py-3 text-amber-600">Hearing required</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Detailed Form Explanations */}
      <section className="w-full py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
            Each Form Explained in Detail
          </h2>
          
          <div className="space-y-8">
            {forms.map((form, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">{form.code}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-semibold text-foreground">{form.title}</h3>
                    <p className="text-primary text-sm">{form.who}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-sm">Reason:</span>
                      <p className="text-foreground/70 text-sm">{form.reason}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-sm">Timeline:</span>
                      <p className="text-foreground/70 text-sm">{form.timeline}</p>
                    </div>
                  </div>
                </div>
                
                <div className={`p-3 rounded-lg mb-4 ${form.voidable ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
                  <p className="text-sm">
                    <span className="font-semibold">{form.voidable ? 'How to Void: ' : 'Response: '}</span>
                    {form.voidMethod}
                  </p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-foreground/70">
                    <span className="font-semibold">What Happens Next: </span>
                    {form.whatHappensNext}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Tips for Tenants:</h4>
                  <ul className="space-y-1">
                    {form.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2 text-sm text-foreground/70">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
            The Eviction Process Flow
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
            <div className="bg-amber-100 p-4 rounded-lg w-full md:w-48">
              <FileText className="h-8 w-8 text-amber-600 mx-auto mb-2" />
              <p className="font-semibold">Notice (N4/N5)</p>
              <p className="text-xs text-foreground/60">Warning from landlord</p>
            </div>
            <ChevronRight className="h-6 w-6 text-gray-400 hidden md:block" />
            <div className="bg-blue-100 p-4 rounded-lg w-full md:w-48">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold">Void Period</p>
              <p className="text-xs text-foreground/60">Time to fix the issue</p>
            </div>
            <ChevronRight className="h-6 w-6 text-gray-400 hidden md:block" />
            <div className="bg-purple-100 p-4 rounded-lg w-full md:w-48">
              <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="font-semibold">Application (L1/L2)</p>
              <p className="text-xs text-foreground/60">Filed with LTB</p>
            </div>
            <ChevronRight className="h-6 w-6 text-gray-400 hidden md:block" />
            <div className="bg-red-100 p-4 rounded-lg w-full md:w-48">
              <Home className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="font-semibold">LTB Hearing</p>
              <p className="text-xs text-foreground/60">Both sides present case</p>
            </div>
          </div>
          
          <p className="text-center text-foreground/70 mt-6 text-sm">
            At any point before the hearing, paying rent owed (for L1) or negotiating a settlement can stop the process.
          </p>
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
            Received an LTB Notice or Application?
          </h2>
          <p className="font-paragraph text-lg text-foreground/80 mb-8">
            Don't face the LTB alone. A licensed paralegal can review your notice, identify errors, 
            prepare your defence, and represent you at the hearing. Early action gives you the best options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8">
                Book Free Consultation
              </Button>
            </Link>
            <Link to="/services/landlord-tenant">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                Our LTB Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <RelatedServices currentPath="/guides/ltb-forms-explained" config={relatedServicesConfig['/services/landlord-tenant'] || relatedServicesConfig.default} />

      <Footer />
    </div>
  );
}
