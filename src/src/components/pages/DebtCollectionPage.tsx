import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, DollarSign, HelpCircle, FileText, Scale, Clock, Banknote } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function DebtCollectionPage() {
  const authorityItems = [
    { title: 'Debt Collection', description: 'I help creditors collect what they\'re owed through demand letters, Small Claims Court, and judgment enforcement.' },
    { title: 'Debt Defence', description: 'I also defend against improper collection attempts and dispute invalid debts.' },
    { title: 'Judgment Enforcement', description: 'Winning in court is step one. I help enforce judgments to actually collect the money.' }
  ];

  const processSteps = [
    { step: '1', title: 'Documentation Review', description: 'Verify the debt, amounts, and statute of limitations.' },
    { step: '2', title: 'Demand Process', description: 'Formal demand with clear consequences for non-payment.' },
    { step: '3', title: 'Legal Action', description: 'Court filing, judgment, and enforcement as needed.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'For Creditors', description: 'Systematic approach to recover what you\'re owed.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'For Debtors', description: 'Defence against invalid or time-barred claims.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Enforcement', description: 'Garnishment, examination, asset seizure options.' }
  ];

  const honestFAQs = [
    { question: "For creditors: What's the process to collect a debt?", answer: "1) Verify the debt is valid and documented, 2) Send formal demand letter with deadline, 3) If no payment, file Small Claims Court claim (up to $50,000), 4) Get judgment, 5) Enforce through garnishment, examination in aid of execution, or other means." },
    { question: "What if they won't pay even with a judgment?", answer: "Judgment doesn't guarantee collection. You can: garnish wages (limited percentage), garnish bank accounts, examine them under oath about assets, register lien on property, or seize non-exempt assets. Some people are 'judgment-proof' if they have no attachable assets." },
    { question: "For debtors: Can old debts still be collected?", answer: "The limitation period in Ontario is 2 years from last acknowledgment or payment. After that, you can raise limitation as a complete defence. However, some debts (government, secured) have longer or no limitations." },
    { question: "What if I'm being sued for a debt I don't owe?", answer: "File a defence disputing the debt. Demand proof: original contract, account statements, chain of ownership if sold to collector. Debt collectors must prove the debt is valid, accurate, and that they have the right to collect it." },
    { question: "What can they garnish?", answer: "Wages (up to 20% of net income typically), bank accounts (up to full balance), but certain funds are exempt: Ontario Works, ODSP, CPP, OAS, child support, and sometimes RESP/RRSP. They cannot garnish more than you need to live." },
    { question: "Should I try to settle?", answer: "Often yes. Creditors frequently accept less than full amount to avoid court costs and collection effort. Debtors may avoid judgment and its long-term credit impacts. Settlement should be in writing and clearly state the debt is satisfied." }
  ];

  return (
    <>
      <SEO title="Debt Collection Paralegal Ontario | Collect or Defend Debts" description="Licensed paralegal for debt collection and defence in Ontario. Collect unpaid debts, defend against invalid claims, judgment enforcement. Free consultation." canonical="https://www.legalassist.london/services/debt-collection" />
      <ServicePageLayout seoTitle="Debt Collection & Defence | Ontario" seoDescription="Debt collection and defence services in Ontario." canonical="https://www.legalassist.london/services/debt-collection" problemHeadline="Debt Collection & Defence" problemDescription="Whether you're owed money or being pursued for a debt, I can help. Collecting debts, defending against claims, and enforcing judgments—up to $50,000." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Debt collection" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Debt Collection: Both Sides</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Banknote className="w-6 h-6 text-primary" />
                  For Creditors
                </h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-4">
                  <div>
                    <h4 className="font-bold text-green-800 mb-2">Step 1: Demand</h4>
                    <p className="text-green-900 text-sm">Formal demand letter with clear deadline (usually 10-14 days). Often resolves matters without court.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-800 mb-2">Step 2: Court</h4>
                    <p className="text-green-900 text-sm">File Small Claims claim (up to $35,000). Most debt cases settle or result in default judgment.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-800 mb-2">Step 3: Enforce</h4>
                    <p className="text-green-900 text-sm">Garnish wages/accounts, examine debtor, register liens. Getting judgment is step one—collection is step two.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Scale className="w-6 h-6 text-primary" />
                  For Debtors
                </h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
                  <div>
                    <h4 className="font-bold text-blue-800 mb-2">Defence 1: Invalid Debt</h4>
                    <p className="text-blue-900 text-sm">Demand proof. If they can't prove you owe it, the amount, or their right to collect, you may have a defence.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-800 mb-2">Defence 2: Limitation Period</h4>
                    <p className="text-blue-900 text-sm">2 years from last acknowledgment/payment in Ontario. Old debts may be uncollectable.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-800 mb-2">Defence 3: Settlement</h4>
                    <p className="text-blue-900 text-sm">Negotiate reduced payment to avoid judgment. Often creditors accept less for certainty.</p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Judgment Enforcement Options</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Method</th>
                    <th className="px-6 py-4 text-left font-heading">How It Works</th>
                    <th className="px-6 py-4 text-left font-heading">Limitations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Wage Garnishment</td><td className="px-6 py-4 text-sm">Court orders employer to deduct and remit</td><td className="px-6 py-4 text-sm">~20% of net; debtor must be employed</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Bank Garnishment</td><td className="px-6 py-4 text-sm">Freeze and seize bank account funds</td><td className="px-6 py-4 text-sm">Exempt funds protected; debtor may move money</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Examination</td><td className="px-6 py-4 text-sm">Question debtor under oath about assets</td><td className="px-6 py-4 text-sm">Debtor may be uncooperative</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Writ on Property</td><td className="px-6 py-4 text-sm">Lien on real property</td><td className="px-6 py-4 text-sm">Must wait for sale; priority issues</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Honest Reality About Debt Collection</h4>
              <p className="text-yellow-900 text-sm">Getting a judgment is relatively straightforward. Actually collecting the money can be much harder. If the debtor has no job, no bank account, and no assets, a judgment may be worthless. I'll give you an honest assessment of collectability before you invest in litigation.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Debt FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Debt Issues?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Whether collecting or defending, let's discuss your situation and options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.smallClaims} />
      </ServicePageLayout>
    </>
  );
}
