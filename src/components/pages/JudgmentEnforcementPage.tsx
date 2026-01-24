import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, DollarSign, Building, CreditCard, FileText, Search } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function JudgmentEnforcementPage() {
  const authorityItems = [
    { title: 'Collection Services', description: 'Winning a judgment is step one. I help collect it through garnishment, examination, and other enforcement tools.' },
    { title: 'Asset Discovery', description: 'I conduct examinations to find where the debtor has money, property, and income.' },
    { title: 'For Debtors', description: 'I also help people facing enforcement understand their rights and what\'s protected.' }
  ];

  const processSteps = [
    { step: '1', title: 'Judgment Obtained', description: 'You have a court order saying they owe you money.' },
    { step: '2', title: 'Asset Investigation', description: 'Find their bank accounts, employer, property.' },
    { step: '3', title: 'Enforcement', description: 'Garnishment, writ of seizure, or examination.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Multiple Tools', description: 'Garnishment, liens, examination, seizure.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Interest Accrues', description: 'Judgment earns interest until paid.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Reality Check', description: 'Can\'t collect from people with no assets.' }
  ];

  const honestFAQs = [
    { question: "I won my case but they won't pay. What now?", answer: "You need to enforce the judgment. Options: garnish wages (20% of net), garnish bank account, examine them under oath about assets, file writ against property. Start with examination to find where they have money." },
    { question: "How does wage garnishment work?", answer: "You get a court order sent to their employer. Employer must deduct ~20% of net wages and send to court. If debtor is self-employed or changes jobs frequently, this is harder." },
    { question: "Can I garnish their bank account?", answer: "Yes, but you need to know which bank/branch. Bank garnishment is one-time—it grabs what's there that day. Some funds are exempt (social assistance, etc.)." },
    { question: "What is an examination in aid of execution?", answer: "You bring the debtor to court under oath and question them about assets: bank accounts, employers, property, vehicles. They must answer and bring documents. Great tool for finding hidden assets." },
    { question: "What if they have no assets?", answer: "You can't collect from people who have nothing. 'Judgment proof' means: no job, no bank account, no property. Judgment remains valid for 6 years (renewable) in case their situation changes." },
    { question: "I'm being garnished. What are my rights?", answer: "Some funds are exempt: OW, ODSP, CPP, OAS, child support received. You can challenge excessive garnishment. If you can't afford basics, there are hardship provisions." }
  ];

  return (
    <>
      <SEO title="Judgment Enforcement Paralegal Ontario | Garnishment Collection" description="Licensed paralegal for judgment enforcement in Ontario. Wage garnishment, bank garnishment, examination in aid of execution. Collect what you're owed." canonical="https://www.legalassist.london/services/judgment-enforcement" />
      <ServicePageLayout seoTitle="Judgment Enforcement | Ontario" seoDescription="Judgment enforcement help in Ontario." canonical="https://www.legalassist.london/services/judgment-enforcement" problemHeadline="Judgment Enforcement" problemDescription="Won your case but can't collect? A judgment is just paper until you enforce it. I help turn court orders into actual money." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Judgment enforcement" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Enforcement Tools</h2>
            
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Tool</th>
                    <th className="px-6 py-4 text-left font-heading">How It Works</th>
                    <th className="px-6 py-4 text-left font-heading">Best When</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-6 py-4 font-medium">Wage Garnishment</td>
                    <td className="px-6 py-4 text-sm">~20% of net wages deducted at source</td>
                    <td className="px-6 py-4 text-sm">Debtor has steady employment</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Bank Garnishment</td>
                    <td className="px-6 py-4 text-sm">Freezes and seizes bank balance</td>
                    <td className="px-6 py-4 text-sm">You know their bank/branch</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Examination</td>
                    <td className="px-6 py-4 text-sm">Question debtor under oath about assets</td>
                    <td className="px-6 py-4 text-sm">Don't know where assets are</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Writ of Seizure</td>
                    <td className="px-6 py-4 text-sm">Sheriff seizes personal property</td>
                    <td className="px-6 py-4 text-sm">Debtor has valuable items</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Writ on Land</td>
                    <td className="px-6 py-4 text-sm">Registers against real property</td>
                    <td className="px-6 py-4 text-sm">Debtor owns real estate</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Examination in Aid of Execution</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <Search className="w-8 h-8 text-primary mb-3" />
              <p className="text-foreground/80 mb-4">The most powerful tool for judgment creditors. You bring the debtor to court and question them under oath:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <ul className="space-y-2 text-foreground/80">
                  <li>✓ All bank accounts and balances</li>
                  <li>✓ Current employer and income</li>
                  <li>✓ Real estate owned</li>
                  <li>✓ Vehicles and valuable property</li>
                </ul>
                <ul className="space-y-2 text-foreground/80">
                  <li>✓ Other income sources</li>
                  <li>✓ Money owed to them</li>
                  <li>✓ Recent asset transfers</li>
                  <li>✓ Expected inheritance/windfalls</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Exempt Funds (Can't Be Garnished)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Protected Income:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Ontario Works (OW)</li>
                  <li>• ODSP payments</li>
                  <li>• CPP disability</li>
                  <li>• OAS/GIS</li>
                  <li>• Child support received</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">NOT Protected:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Regular wages (garnishable ~20%)</li>
                  <li>• Bank accounts generally</li>
                  <li>• Investment accounts</li>
                  <li>• Business income</li>
                  <li>• Rental income</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">The Honest Reality</h4>
              <p className="text-yellow-900 text-sm">Some people are genuinely "judgment proof"—no job, no assets, no property. You can have a $35,000 judgment and collect $0 if there's nothing to collect. I assess collectability before taking enforcement steps.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Enforcement FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Have a Judgment to Collect?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let's find their assets and turn that judgment into money.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get Started</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.smallClaims} />
      </ServicePageLayout>
    </>
  );
}
