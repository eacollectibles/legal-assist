import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, DollarSign, HelpCircle, Clock, Calculator, FileText, Briefcase } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function UnpaidWagesPage() {
  const authorityItems = [
    { title: 'Wage Recovery', description: 'I help employees recover unpaid wages, overtime, vacation pay, and other compensation owed.' },
    { title: 'Ministry Claims', description: 'I can file claims with the Ministry of Labour or pursue civil action, depending on what\'s best for your situation.' },
    { title: 'Employer Defence', description: 'I also help employers respond to wage claims and ensure proper compliance.' }
  ];

  const processSteps = [
    { step: '1', title: 'Calculate Owed', description: 'Review pay stubs, hours worked, and employment agreement.' },
    { step: '2', title: 'Choose Path', description: 'Ministry of Labour claim (free, capped) or Small Claims Court.' },
    { step: '3', title: 'Recovery', description: 'Pursue payment through chosen process.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Clear Entitlements', description: 'ESA sets minimum standards employers must meet.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Two Paths', description: 'Ministry of Labour or Small Claims Court.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Penalties', description: 'Employers face penalties for wage theft.' }
  ];

  const honestFAQs = [
    { question: "What counts as unpaid wages?", answer: "Regular wages not paid, overtime (over 44hrs/week for most), vacation pay (4% minimum), public holiday pay, termination pay, commissions earned, and bonuses if contractually owed. Each has specific rules." },
    { question: "Ministry of Labour or court—which is better?", answer: "Ministry: Free, simpler, but capped at $15,000 and takes months. Court: Filing fees, more complex, but no cap (up to $35K in Small Claims) and often faster. Depends on amount owed and strength of case." },
    { question: "How is overtime calculated in Ontario?", answer: "Most employees: 1.5x regular rate for hours over 44/week. Some industries (like construction) have different thresholds. Managers and some professionals are exempt. I can assess if you qualify." },
    { question: "What if I'm paid salary, not hourly?", answer: "Salary doesn't exempt you from overtime unless you meet specific exemption criteria (true management, professional). Many salaried employees are entitled to overtime but don't know it." },
    { question: "What about vacation pay?", answer: "Minimum 4% of gross wages (2 weeks). After 5 years: 6% (3 weeks). Must be paid on every cheque or banked for actual vacation. Unpaid vacation pay on termination is common—and recoverable." },
    { question: "How far back can I claim?", answer: "Ministry of Labour: 2 years from filing. Court: 2 years from when wages were owed. Don't delay—every day past 2 years is money you can't recover." }
  ];

  return (
    <>
      <SEO title="Unpaid Wages Paralegal Ontario | Overtime Vacation Pay Claims" description="Licensed paralegal recovering unpaid wages in Ontario. Overtime, vacation pay, termination pay. Ministry of Labour or court. Free consultation." canonical="https://www.legalassist.london/services/unpaid-wages" />
      <ServicePageLayout seoTitle="Unpaid Wages Recovery | Ontario" seoDescription="Unpaid wages recovery in Ontario." canonical="https://www.legalassist.london/services/unpaid-wages" problemHeadline="Unpaid Wages & Overtime Claims" problemDescription="Employer owes you wages, overtime, or vacation pay? I help recover what you've earned through the Ministry of Labour or court action." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Unpaid wages" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">What You May Be Owed</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6">
                <DollarSign className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-3">Common Wage Claims:</h4>
                <ul className="text-foreground/80 text-sm space-y-2">
                  <li>• Regular wages not paid</li>
                  <li>• Overtime (1.5x over 44hrs/week)</li>
                  <li>• Vacation pay (4-6%)</li>
                  <li>• Public holiday pay</li>
                  <li>• Termination/severance pay</li>
                  <li>• Commissions earned</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <Calculator className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-3">Less Obvious Claims:</h4>
                <ul className="text-foreground/80 text-sm space-y-2">
                  <li>• Unpaid training time</li>
                  <li>• Missed meal breaks (worked through)</li>
                  <li>• Prep/cleanup time not counted</li>
                  <li>• On-call time (if restricted)</li>
                  <li>• Travel time (in some cases)</li>
                  <li>• Deductions taken illegally</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Recovery Options</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Option</th>
                    <th className="px-6 py-4 text-left font-heading">Pros</th>
                    <th className="px-6 py-4 text-left font-heading">Cons</th>
                    <th className="px-6 py-4 text-center font-heading">Limit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-6 py-4 font-medium">Ministry of Labour</td>
                    <td className="px-6 py-4 text-sm">Free, government enforced, penalties to employer</td>
                    <td className="px-6 py-4 text-sm">Slow (6-12 months), capped recovery</td>
                    <td className="px-6 py-4 text-center">$15,000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Small Claims Court</td>
                    <td className="px-6 py-4 text-sm">Higher cap, faster, more control</td>
                    <td className="px-6 py-4 text-sm">Filing fees, more work required</td>
                    <td className="px-6 py-4 text-center">$35,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Overtime Rules</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h4 className="font-bold text-yellow-800 mb-3">Are You Entitled to Overtime?</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-yellow-900 text-sm">
                <div>
                  <p className="font-medium mb-2">Entitled (Most Employees):</p>
                  <ul className="space-y-1">
                    <li>• Hourly workers over 44hrs/week</li>
                    <li>• Salaried workers without true management duties</li>
                    <li>• "Assistant managers" without real authority</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Exempt (Some):</p>
                  <ul className="space-y-1">
                    <li>• True managers/supervisors</li>
                    <li>• Certain professionals (lawyers, doctors)</li>
                    <li>• IT professionals meeting specific criteria</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-red-800 mb-2">Don't Wait: 2-Year Limit</h4>
              <p className="text-red-900 text-sm">You can only recover wages from the last 2 years. Every month you delay is money you may not be able to recover.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Wage Claim FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Owed Wages?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let's calculate what you're owed and find the best way to recover it.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.employment} />
      </ServicePageLayout>
    </>
  );
}
