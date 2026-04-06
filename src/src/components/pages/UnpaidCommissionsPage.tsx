import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, DollarSign, FileText, Briefcase, Scale } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function UnpaidCommissionsPage() {
  const authorityItems = [
    { title: 'Unpaid Commissions', description: 'Earned commissions but employer won\'t pay? Commissions are wages under the ESA. I help recover what you\'re owed.' },
    { title: 'Written vs Verbal', description: 'Commission agreements can be verbal or written. Verbal agreements are harder to prove but still enforceable.' },
    { title: 'Multiple Options', description: 'Ministry of Labour complaint (up to $15,000) or civil court for larger amounts. Sometimes both.' }
  ];

  const processSteps = [
    { step: '1', title: 'Calculate Owed', description: 'What commissions have you earned but not received?' },
    { step: '2', title: 'Gather Evidence', description: 'Sales records, emails, pay stubs, agreements.' },
    { step: '3', title: 'Choose Path', description: 'MOL complaint or civil claim based on amount.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Commissions = Wages', description: 'Protected under ESA.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Verbal Agreements Count', description: 'Harder but enforceable.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Time Limits', description: 'MOL: 2 years. Civil: 2 years.' }
  ];

  const honestFAQs = [
    { question: "Are commissions considered wages under Ontario law?", answer: "Yes. Commissions are wages under the ESA. This means: they must be paid on regular pay days, they're owed when earned (per your agreement), and non-payment is a violation of employment standards." },
    { question: "I don't have a written commission agreement. Can I still claim?", answer: "Yes, but it's harder. You'll need to prove the terms through: emails discussing commissions, past commission payments (showing pattern), testimony about verbal agreements, industry standards if applicable." },
    { question: "My employer says I wasn't 'employed' when the sale closed. Valid?", answer: "Depends on your agreement. Many commission structures pay on sale closing regardless of employment status at closing. Others require active employment. Review your agreement terms—if unclear, argue for reasonable interpretation." },
    { question: "What if they changed the commission structure after I made sales?", answer: "Retroactive changes to reduce earned commissions are problematic. If you made sales under one structure, you're generally entitled to be paid under that structure. Changes typically apply to future sales only." },
    { question: "How much can I recover through the Ministry of Labour?", answer: "MOL can order up to $15,000 in unpaid wages. For amounts over $15,000, you'll need to go to civil court (Small Claims up to $35,000, Superior Court above that). Sometimes both paths are used." },
    { question: "My employer is disputing which sales I'm entitled to. What do I do?", answer: "Documentation is key. Gather: sales records with your name, CRM data showing your involvement, email threads about deals, client confirmations. The more you can prove your role, the stronger your claim." }
  ];

  return (
    <>
      <SEO title="Unpaid Commissions Paralegal Ontario | Commission Recovery" description="Licensed paralegal for unpaid commission claims in Ontario. Sales commissions, commission disputes, MOL complaints. Free consultation." canonical="https://www.legalassist.london/services/unpaid-commissions" />
      <ServicePageLayout seoTitle="Unpaid Commissions | Ontario" seoDescription="Unpaid commission recovery in Ontario." canonical="https://www.legalassist.london/services/unpaid-commissions" problemHeadline="Unpaid Commissions" problemDescription="Earned commissions your employer won't pay? Commissions are wages under Ontario law. I help recover what you've earned." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Unpaid commissions" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Commission Disputes</h2>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <DollarSign className="w-6 h-6" />
                Commissions Are Wages
              </h3>
              <p className="text-green-900">Under Ontario's ESA, commissions are wages. This means employers must pay them when earned, can't withhold them arbitrarily, and non-payment is an employment standards violation.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Employer Tactics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">What Employers Claim:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• "You quit before the sale closed"</li>
                  <li>• "We changed the commission structure"</li>
                  <li>• "That wasn't your sale"</li>
                  <li>• "Commission was discretionary"</li>
                  <li>• "You didn't meet the threshold"</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Your Arguments:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Agreement says commission owed on closing</li>
                  <li>• Changes can't apply retroactively</li>
                  <li>• Records show your involvement</li>
                  <li>• Past payments show it wasn't discretionary</li>
                  <li>• I did meet threshold—here's proof</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Recovery Options</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Option</th>
                    <th className="px-6 py-4 text-left font-heading">Amount Limit</th>
                    <th className="px-6 py-4 text-left font-heading">Timeline</th>
                    <th className="px-6 py-4 text-left font-heading">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Ministry of Labour</td><td className="px-6 py-4">Up to $15,000</td><td className="px-6 py-4 text-sm">Several months</td><td className="px-6 py-4 text-sm">Smaller amounts, clear violations</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Small Claims Court</td><td className="px-6 py-4">Up to $35,000</td><td className="px-6 py-4 text-sm">6-12 months</td><td className="px-6 py-4 text-sm">Larger amounts, complex disputes</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Superior Court</td><td className="px-6 py-4">No limit</td><td className="px-6 py-4 text-sm">1-2+ years</td><td className="px-6 py-4 text-sm">Very large claims (lawyer territory)</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Document Everything</h4>
              <p className="text-yellow-900 text-sm">Gather: your commission agreement (written or evidence of verbal), sales records, CRM data, emails about deals, past pay stubs showing commission payments, any correspondence about disputed commissions.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Commission FAQs</h2>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {honestFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border border-border px-6">
                  <AccordionTrigger className="text-left font-heading text-lg font-semibold py-6 hover:no-underline">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-foreground/80 pb-6">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-primary/5">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Owed Commissions?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Calculate what you're owed and let me help you recover it.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.employment} />
      </ServicePageLayout>
    </>
  );
}
