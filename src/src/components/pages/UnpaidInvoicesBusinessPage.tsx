import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, DollarSign, FileText, Briefcase, Clock } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function UnpaidInvoicesBusinessPage() {
  const authorityItems = [
    { title: 'Business Invoice Recovery', description: 'Clients won\'t pay your invoices? I help small businesses and freelancers recover unpaid invoices up to $35,000 in Small Claims Court.' },
    { title: 'Documentation Key', description: 'Contracts, invoices, emails, and work product documentation build strong collection cases.' },
    { title: 'Cost-Effective Process', description: 'Small Claims Court is designed for businesses to collect without spending more than the debt is worth.' }
  ];

  const processSteps = [
    { step: '1', title: 'Demand Letter', description: 'Formal demand often prompts payment.' },
    { step: '2', title: 'File Claim', description: 'Small Claims Court if not paid.' },
    { step: '3', title: 'Collect Judgment', description: 'Enforce through garnishment, etc.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Clear Debt', description: 'Contract + invoice = strong case.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Cost Recovery', description: 'Court costs often recoverable.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Collection Reality', description: 'Judgment ≠ automatic payment.' }
  ];

  const honestFAQs = [
    { question: "What do I need to prove an unpaid invoice?", answer: "Ideally: written contract or agreement, the invoice itself, proof you delivered the work/goods (emails, delivery records, work product), and communication showing they received and didn't dispute the invoice." },
    { question: "Should I send a demand letter first?", answer: "Yes—almost always. A formal demand letter: (1) often prompts payment without court, (2) shows you're serious, (3) documents your attempt to resolve, (4) may be required before Small Claims. Many disputes settle at this stage." },
    { question: "They say the work was defective. What now?", answer: "Common defence. Counter with: work matched agreed specifications, they accepted delivery without complaint, they didn't give opportunity to fix issues, their claims are after-the-fact excuses. Documentation of approval/acceptance is crucial." },
    { question: "How much does it cost to sue for unpaid invoices?", answer: "Small Claims Court filing fee: $102-$275 depending on amount. If you win, court costs are often recoverable from the defendant. Paralegal fees vary but are generally cost-effective compared to the debt recovered." },
    { question: "What if they're a company that might go bankrupt?", answer: "Assess collectability before suing. Check if they're still operating, have assets, or other creditors. Suing a defunct company wastes time and money. Sometimes a demand letter is worth trying even if you doubt collection." },
    { question: "Can I charge interest on overdue invoices?", answer: "If your contract specifies interest on late payments, yes. If not, Ontario allows pre-judgment interest at a set rate (currently around 3-5%). Include this in your claim. Interest continues until paid." }
  ];

  return (
    <>
      <SEO title="Unpaid Invoice Recovery Paralegal Ontario | Business Debt Collection" description="Licensed paralegal for unpaid invoice recovery in Ontario. Small business, freelancer invoices. Demand letters, Small Claims Court. Free consultation." canonical="https://www.legalassist.london/services/unpaid-invoices-business" />
      <ServicePageLayout seoTitle="Unpaid Invoice Recovery | Ontario" seoDescription="Business invoice recovery in Ontario." canonical="https://www.legalassist.london/services/unpaid-invoices-business" problemHeadline="Unpaid Invoice Recovery" problemDescription="Clients not paying your invoices? As a small business or freelancer, you can't afford to write off debts. I help recover what you've earned." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Unpaid invoices" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Business Invoice Collection</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">The Collection Process</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <ol className="text-foreground/80 space-y-3">
                <li><span className="font-bold">1. Internal follow-up:</span> Phone, email reminders. Document all contact attempts.</li>
                <li><span className="font-bold">2. Formal demand letter:</span> Written demand with deadline. Often prompts payment.</li>
                <li><span className="font-bold">3. Small Claims Court:</span> File claim if demand ignored. Serve defendant.</li>
                <li><span className="font-bold">4. Settlement or trial:</span> Many settle once sued. Trial if needed.</li>
                <li><span className="font-bold">5. Judgment enforcement:</span> Garnish wages/accounts, register against property.</li>
              </ol>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Building a Strong Case</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Strong Evidence:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Written contract or agreement</li>
                  <li>• Clear invoices with terms</li>
                  <li>• Proof of delivery/completion</li>
                  <li>• Emails accepting work</li>
                  <li>• Prior partial payments</li>
                  <li>• No complaints until collection</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Common Defences:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Work was defective</li>
                  <li>• Not what was agreed</li>
                  <li>• Never received/incomplete</li>
                  <li>• Already paid</li>
                  <li>• Invoice disputed earlier</li>
                  <li>• Counterclaim for damages</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Costs and Recovery</h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Claim Amount</th>
                    <th className="px-6 py-4 text-left font-heading">Filing Fee</th>
                    <th className="px-6 py-4 text-left font-heading">Recoverable If You Win?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Up to $3,500</td><td className="px-6 py-4">$102</td><td className="px-6 py-4 text-green-700">Yes</td></tr>
                  <tr><td className="px-6 py-4 font-medium">$3,500 - $10,000</td><td className="px-6 py-4">$157</td><td className="px-6 py-4 text-green-700">Yes</td></tr>
                  <tr><td className="px-6 py-4 font-medium">$10,000 - $35,000</td><td className="px-6 py-4">$275</td><td className="px-6 py-4 text-green-700">Yes</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">The Collection Reality</h4>
              <p className="text-yellow-900 text-sm">Winning judgment doesn't mean automatic payment. You may need to enforce through garnishment, property liens, or other methods. Assess whether the debtor has assets before investing in litigation.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Invoice Recovery FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Clients Not Paying?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Bring your invoices and documentation. Let's recover what you're owed.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.smallClaims} />
      </ServicePageLayout>
    </>
  );
}
