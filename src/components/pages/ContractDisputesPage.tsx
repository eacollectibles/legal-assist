import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, DollarSign, HelpCircle, FileText, Scale, Clock } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ContractDisputesPage() {
  const authorityItems = [
    { title: 'Contract Expertise', description: 'I help with contracts for services, goods, rentals, and more. Claims up to $35,000 in Small Claims Court.' },
    { title: 'Breach Analysis', description: 'I identify contract breaches, assess damages, and build compelling cases for recovery.' },
    { title: 'Efficient Process', description: 'Small Claims Court is designed to be accessible. I handle the legal work while keeping costs reasonable.' }
  ];

  const processSteps = [
    { step: '1', title: 'Contract Review', description: 'Analyze the contract terms, identify breaches, and assess your damages.' },
    { step: '2', title: 'Demand Letter', description: 'Send formal demand giving the other party opportunity to resolve.' },
    { step: '3', title: 'Court Action', description: 'If no resolution, file claim and represent you through trial.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Up to $35,000', description: 'Small Claims Court handles substantial amounts.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Written Contracts Not Required', description: 'Oral agreements can be enforced.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Cost-Effective', description: 'Lower legal costs than Superior Court.' }
  ];

  const honestFAQs = [
    { question: "What is a contract breach?", answer: "When one party fails to perform their obligations under an agreement—not delivering goods, not completing work, not paying, providing defective products/services, or failing to meet specifications. Both written and oral contracts can be breached." },
    { question: "Do I need a written contract?", answer: "No. Oral contracts are legally binding and enforceable. The challenge is proving the terms. Texts, emails, invoices, receipts, and witness testimony can all establish contract terms." },
    { question: "What damages can I recover?", answer: "Generally: what you lost due to the breach. This includes money paid for services not received, cost to fix/complete defective work, lost profits in some cases, and consequential damages directly caused by the breach." },
    { question: "What if I signed a contract with bad terms?", answer: "You're generally bound by what you signed—'I didn't read it' isn't a defence. However, some terms may be unenforceable: unconscionable terms, illegal provisions, or terms violating consumer protection laws." },
    { question: "Should I try to resolve before suing?", answer: "Almost always yes. Courts expect you to try. A demand letter often resolves disputes and costs far less than litigation. Even if it doesn't resolve, it demonstrates good faith and strengthens your case." },
    { question: "What are my realistic chances?", answer: "Depends on: clarity of contract terms, evidence of breach, documentation of damages, strength of defences, and whether the other party has money to pay. I'll give you an honest assessment before you commit." }
  ];

  return (
    <>
      <SEO title="Contract Dispute Paralegal Ontario | Small Claims Breach of Contract" description="Licensed paralegal for contract disputes in Ontario Small Claims Court. Breach of contract, damages recovery, up to $35,000. Free consultation." canonical="https://www.legalassist.london/services/contract-disputes" />
      <ServicePageLayout seoTitle="Contract Disputes | Small Claims Ontario" seoDescription="Contract dispute help in Ontario Small Claims Court." canonical="https://www.legalassist.london/services/contract-disputes" problemHeadline="Contract Disputes in Small Claims Court" problemDescription="Someone didn't hold up their end of a deal? Whether it's services not delivered, payment not made, or work done poorly, I help recover what you're owed—up to $35,000." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Contract disputes" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Common Contract Disputes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6">
                <h4 className="font-bold text-foreground mb-3">Service Contracts:</h4>
                <ul className="text-foreground/80 text-sm space-y-2">
                  <li>• Contractor didn't complete work</li>
                  <li>• Work done poorly or not to spec</li>
                  <li>• Services not as described</li>
                  <li>• Excessive charges beyond quote</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <h4 className="font-bold text-foreground mb-3">Payment Disputes:</h4>
                <ul className="text-foreground/80 text-sm space-y-2">
                  <li>• Client won't pay for completed work</li>
                  <li>• Partial payment on full delivery</li>
                  <li>• Payment for goods not delivered</li>
                  <li>• Deposit not returned</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What You Need to Prove</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Element</th>
                    <th className="px-6 py-4 text-left font-heading">What It Means</th>
                    <th className="px-6 py-4 text-left font-heading">Evidence Needed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Contract Exists</td><td className="px-6 py-4 text-sm">Agreement between parties</td><td className="px-6 py-4 text-sm">Written contract, texts, emails, invoices</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Terms Were Clear</td><td className="px-6 py-4 text-sm">Both parties understood the deal</td><td className="px-6 py-4 text-sm">Contract language, communications</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Other Party Breached</td><td className="px-6 py-4 text-sm">They didn't perform</td><td className="px-6 py-4 text-sm">Photos, testimony, inspection reports</td></tr>
                  <tr><td className="px-6 py-4 font-medium">You Suffered Damages</td><td className="px-6 py-4 text-sm">Quantifiable loss</td><td className="px-6 py-4 text-sm">Receipts, quotes, bank statements</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Should You Sue?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Good Cases:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Clear contract terms</li>
                  <li>• Documented breach</li>
                  <li>• Quantifiable damages</li>
                  <li>• Other party can pay</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">Consider Carefully:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• Oral contract with disputes</li>
                  <li>• Both sides have claims</li>
                  <li>• Amount is borderline</li>
                  <li>• Ongoing relationship</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Difficult Cases:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• No documentation</li>
                  <li>• Other party is judgment-proof</li>
                  <li>• Damages speculative</li>
                  <li>• You also breached</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Contract Dispute FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Contract Dispute?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let's review your situation and give you an honest assessment of your options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.smallClaims} />
      </ServicePageLayout>
    </>
  );
}
