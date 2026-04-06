import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Hammer, Home, DollarSign, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HomeImprovementDisputesPage() {
  const authorityItems = [
    { title: 'Contractor Disputes', description: 'I help homeowners recover money and damages when contractors don\'t deliver what they promised.' },
    { title: 'Both Sides', description: 'I also represent contractors pursuing payment for completed work when customers don\'t pay.' },
    { title: 'Consumer Protections', description: 'Ontario\'s Consumer Protection Act provides additional remedies for home renovation contracts.' }
  ];

  const processSteps = [
    { step: '1', title: 'Document Issues', description: 'Photos of defects, contracts, communications, cost of repairs.' },
    { step: '2', title: 'Formal Demand', description: 'Demand completion, repairs, or refund with deadline.' },
    { step: '3', title: 'Legal Action', description: 'Small Claims Court claim if demand not satisfied.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Strong Protections', description: 'CPA provides cooling-off and cancellation rights.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Cost of Repair', description: 'Recover what it costs to fix poor work.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Return of Deposit', description: 'Deposits recoverable for non-performance.' }
  ];

  const honestFAQs = [
    { question: "Contractor took deposit and disappeared. What can I do?", answer: "This may be fraud (police report) and civil breach of contract (Small Claims). Recover: deposit paid, cost difference if new contractor charges more, potentially CPA remedies. Act quickly—contractors who do this often do it to many people." },
    { question: "Work is poor quality. What are my options?", answer: "Don't pay remaining balance until resolved. Document with photos. Get independent quotes for cost to repair/complete. You can recover: cost of repair, diminished value, sometimes loss of use damages." },
    { question: "Do I have to pay for work I'm not happy with?", answer: "You must pay for work that's reasonably completed to contract specifications. You don't have to pay for defective work. But 'not happy' isn't the same as 'defective'—there must be objective problems, not just preference." },
    { question: "There's no written contract. Do I have a case?", answer: "Oral contracts are enforceable but harder to prove. Texts, emails, and quotes can establish terms. Get multiple quotes now to establish what reasonable cost should have been." },
    { question: "Contractor is threatening to lien my house. What do I do?", answer: "Construction liens are serious—they attach to your property. If you have valid defences (defective work, incomplete work), you can dispute the lien. Don't ignore lien threats—get legal advice quickly." },
    { question: "I'm a contractor and the customer won't pay. What can I do?", answer: "Send demand letter. File Small Claims claim. Consider construction lien (strict time limits—45 days to preserve, 90 days to perfect). Document completion with photos and get signed completion acknowledgments." }
  ];

  return (
    <>
      <SEO title="Home Improvement Disputes Paralegal Ontario | Contractor Problems" description="Licensed paralegal for home improvement disputes in Ontario. Contractor didn't finish, poor quality work, deposit recovery. Free consultation." canonical="https://www.legalassist.london/services/home-improvement-disputes" />
      <ServicePageLayout seoTitle="Home Improvement Disputes | Ontario" seoDescription="Home improvement dispute help in Ontario." canonical="https://www.legalassist.london/services/home-improvement-disputes" problemHeadline="Home Improvement Disputes" problemDescription="Contractor took your money and didn't deliver? Poor quality work? I help homeowners recover their money—and contractors get paid for honest work." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Home improvement disputes" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Common Contractor Disputes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <Hammer className="w-8 h-8 text-red-600 mb-3" />
                <h4 className="font-bold text-red-800 mb-3">For Homeowners:</h4>
                <ul className="text-red-900 text-sm space-y-2">
                  <li>• Contractor took deposit, never started</li>
                  <li>• Work incomplete or abandoned</li>
                  <li>• Poor quality workmanship</li>
                  <li>• Work not to code/permit issues</li>
                  <li>• Massive cost overruns</li>
                  <li>• Contractor damaged property</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <DollarSign className="w-8 h-8 text-blue-600 mb-3" />
                <h4 className="font-bold text-blue-800 mb-3">For Contractors:</h4>
                <ul className="text-blue-900 text-sm space-y-2">
                  <li>• Customer refuses to pay</li>
                  <li>• Customer claims defects that don't exist</li>
                  <li>• Extra work performed, customer won't pay</li>
                  <li>• Customer's changes delayed project</li>
                  <li>• Customer interfered with work</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What Homeowners Can Recover</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Situation</th>
                    <th className="px-6 py-4 text-left font-heading">Recoverable Damages</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Contractor abandoned job</td><td className="px-6 py-4 text-sm">Deposit + cost to complete with new contractor - original price</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Defective work</td><td className="px-6 py-4 text-sm">Cost to repair/redo the work properly</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Incomplete work</td><td className="px-6 py-4 text-sm">Cost to complete + any damage from delay</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Property damage</td><td className="px-6 py-4 text-sm">Repair costs for damage caused by contractor</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Consumer Protection Act Rights</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <h4 className="font-bold text-green-800 mb-3">For Home Renovation Contracts:</h4>
              <ul className="text-green-900 text-sm space-y-2">
                <li>✓ 10-day cooling-off period for contracts signed at your home</li>
                <li>✓ Written contract required for contracts over $50</li>
                <li>✓ Cannot require more than 10% deposit before work starts</li>
                <li>✓ Cancellation rights if work not started within 30 days of agreed date</li>
                <li>✓ Additional remedies for unfair practices</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Before Paying More</h4>
              <p className="text-yellow-900 text-sm">If you're unhappy with work, don't pay remaining balance until issues are resolved. Once paid, your leverage disappears. But also don't refuse to pay valid invoices—this can hurt your position.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Contractor Dispute FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Contractor Problem?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Gather your contract and documents. Let's discuss recovering your money.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.smallClaims} />
      </ServicePageLayout>
    </>
  );
}
