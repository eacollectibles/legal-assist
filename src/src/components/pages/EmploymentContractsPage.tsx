import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, FileText, DollarSign, Shield, Scale } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function EmploymentContractsPage() {
  const authorityItems = [
    { title: 'Contract Review', description: 'Before you sign an employment contract, understand what you\'re agreeing to. Bad termination clauses can cost you thousands later.' },
    { title: 'Termination Clauses', description: 'The most important clause. A valid one limits you to ESA minimums; an invalid one may entitle you to much more.' },
    { title: 'Know Before Signing', description: 'It\'s much harder to challenge a contract after you\'ve signed. Review BEFORE you accept.' }
  ];

  const processSteps = [
    { step: '1', title: 'Send Contract', description: 'Share the employment contract with me.' },
    { step: '2', title: 'Identify Issues', description: 'Review termination clause, non-competes, more.' },
    { step: '3', title: 'Negotiate or Sign', description: 'Know what you\'re agreeing to before you sign.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Affordable Review', description: 'Contract review is quick and low-cost.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Know Your Rights', description: 'Understand before you commit.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Review Early', description: 'Harder to challenge after signing.' }
  ];

  const honestFAQs = [
    { question: "Why should I have my employment contract reviewed?", answer: "The termination clause alone can mean the difference between 2 weeks notice (ESA minimum) and 12+ months notice (common law). A few hundred dollars for review can save you tens of thousands if you're ever terminated." },
    { question: "What makes a termination clause invalid?", answer: "Common issues: doesn't meet ESA minimums, ambiguous language, fails to account for benefits continuation, tries to limit future entitlements. Ontario courts strictly interpret termination clauses—many don't hold up." },
    { question: "Can I negotiate the contract?", answer: "Often yes, especially for senior roles. Even if they won't change the termination clause, you may negotiate better base terms. And knowing what you're agreeing to helps you plan for the future." },
    { question: "What about non-compete clauses?", answer: "Since October 2021, non-competes are unenforceable for most Ontario employees. But non-solicitation and confidentiality clauses may still apply. I help you understand what's actually binding." },
    { question: "They want me to sign immediately. What do I do?", answer: "Ask for time. Most employers will give 24-48 hours minimum. If they refuse any review time, that's a red flag. A quick contract review can happen in a day or two." },
    { question: "The contract says I only get 2 weeks notice. Is that legal?", answer: "If the clause is valid, yes—they can limit you to ESA minimums. But many termination clauses are poorly drafted and unenforceable. If the clause fails, you get common law notice instead (often much more)." }
  ];

  return (
    <>
      <SEO title="Employment Contract Review Paralegal Ontario | Before You Sign" description="Licensed paralegal for employment contract review in Ontario. Termination clauses, non-competes, severance. Review before signing. Affordable rates." canonical="https://www.legalassist.london/services/employment-contracts" />
      <ServicePageLayout seoTitle="Employment Contract Review | Ontario" seoDescription="Employment contract review in Ontario." canonical="https://www.legalassist.london/services/employment-contracts" problemHeadline="Employment Contract Review" problemDescription="About to sign an employment contract? The termination clause alone could cost you tens of thousands down the road. Get it reviewed first." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Employment contracts" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Why Contract Review Matters</h2>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2">
                <DollarSign className="w-6 h-6" />
                The Real Cost of Bad Termination Clauses
              </h3>
              <p className="text-yellow-900 mb-3">Example: 10 years of service, $80,000 salary</p>
              <ul className="text-yellow-900 text-sm space-y-1">
                <li>• <span className="font-bold">With valid ESA-only clause:</span> 8 weeks = ~$12,300</li>
                <li>• <span className="font-bold">With invalid clause (common law):</span> 10-12 months = ~$66,000-80,000</li>
                <li>• <span className="font-bold">Difference:</span> ~$50,000-67,000</li>
              </ul>
              <p className="text-yellow-900 text-sm mt-3">A $200 contract review can save you $50,000+.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Key Clauses I Review</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Clause</th>
                    <th className="px-6 py-4 text-left font-heading">Why It Matters</th>
                    <th className="px-6 py-4 text-left font-heading">Common Issues</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Termination</td><td className="px-6 py-4 text-sm">Determines severance on termination</td><td className="px-6 py-4 text-sm">Doesn't meet ESA, ambiguous</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Non-compete</td><td className="px-6 py-4 text-sm">Restricts future employment</td><td className="px-6 py-4 text-sm">Usually void since Oct 2021</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Non-solicitation</td><td className="px-6 py-4 text-sm">Restricts contacting clients/staff</td><td className="px-6 py-4 text-sm">May be valid if reasonable</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Probation</td><td className="px-6 py-4 text-sm">Affects rights during probation</td><td className="px-6 py-4 text-sm">Extended or unclear terms</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Confidentiality</td><td className="px-6 py-4 text-sm">Ongoing obligations after leaving</td><td className="px-6 py-4 text-sm">Overly broad definitions</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Invalid Termination Clauses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Often Invalid:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Doesn't mention benefits continuation</li>
                  <li>• Uses "at any time" without ESA floors</li>
                  <li>• Contradicts itself</li>
                  <li>• References old/wrong ESA provisions</li>
                  <li>• Ambiguous language</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Well-Drafted Includes:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Clear ESA minimums stated</li>
                  <li>• Benefits continuation addressed</li>
                  <li>• Consistent language throughout</li>
                  <li>• Current ESA references</li>
                  <li>• No conflicting terms</li>
                </ul>
              </div>
            </div>

            <div className="bg-primary/5 rounded-lg p-6">
              <h4 className="font-bold text-foreground mb-2">Quick Review Turnaround</h4>
              <p className="text-foreground/80 text-sm">Most contract reviews can be done within 24-48 hours. If you need to respond quickly to a job offer, I can prioritize. Send the contract and I'll tell you what you're signing up for.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Employment Contract FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Got a Contract to Sign?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">A quick review now could save you tens of thousands later.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get Contract Review</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.employment} />
      </ServicePageLayout>
    </>
  );
}
