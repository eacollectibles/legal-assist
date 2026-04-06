import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, DollarSign, Briefcase, FileText, Scale } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function BonusDisputePage() {
  const authorityItems = [
    { title: 'Bonus Disputes', description: 'Employer denied your bonus after termination? Many bonus plans are legally enforceable even after employment ends.' },
    { title: 'Contract Language Key', description: 'Whether you get your bonus depends on the plan\'s exact wording. "Discretionary" doesn\'t always mean they can deny it.' },
    { title: 'Part of Compensation', description: 'Regular, expected bonuses can become part of your compensation—courts may enforce them even without written promises.' }
  ];

  const processSteps = [
    { step: '1', title: 'Review Bonus Terms', description: 'What does the plan or contract actually say?' },
    { step: '2', title: 'Document Entitlement', description: 'Did you meet targets? Past payment history?' },
    { step: '3', title: 'Claim or Negotiate', description: 'Include bonus in severance demand or sue.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Often Recoverable', description: 'Denied bonuses frequently won.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Part of Damages', description: 'Bonuses add to severance claims.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Plan Terms Matter', description: 'Clear exclusions may apply.' }
  ];

  const honestFAQs = [
    { question: "I was terminated before bonus payout. Am I entitled to it?", answer: "Often yes. If you worked during the bonus period and met targets, termination right before payout may not eliminate entitlement. Courts look skeptically at employers who terminate to avoid bonus payments. However, clear 'active employment' requirements may apply." },
    { question: "The bonus plan says it's 'discretionary.' Does that mean I have no claim?", answer: "Not necessarily. 'Discretionary' bonuses that are regularly paid, form expected part of compensation, or were promised can still be enforceable. Courts may find implied terms requiring good faith exercise of discretion. The word 'discretionary' alone isn't a complete shield." },
    { question: "I met all my targets but was denied the bonus. What can I do?", answer: "If targets were met, you have a strong claim. Gather evidence: targets set, performance reviews, metrics showing achievement. If employer cites other reasons (attitude, restructuring), challenge whether those were legitimate or pretextual." },
    { question: "Can I include unpaid bonus in my wrongful dismissal claim?", answer: "Yes—bonus entitlement during the notice period is often part of wrongful dismissal damages. If you would have received the bonus had you worked the notice period, it may be recoverable. This can add significantly to your claim." },
    { question: "They changed the bonus plan after I earned the bonus. Is that legal?", answer: "Retroactive changes to reduce earned bonuses are problematic. If you earned a bonus under one plan, employer generally can't reduce it by changing plans afterward. Changes typically apply prospectively to future bonus periods." },
    { question: "I was on leave during part of the bonus period. Does that affect my entitlement?", answer: "Depends on the leave type and plan terms. Statutory leaves (maternity, parental) often have protections. Denying bonus solely because of protected leave may be discriminatory. Review plan terms and whether proration is appropriate." }
  ];

  return (
    <>
      <SEO title="Bonus Dispute Paralegal Ontario | Denied Bonus After Termination" description="Denied your bonus after termination in Ontario? Bonuses are often legally recoverable. Wrongful dismissal bonus claims. Free consultation." canonical="https://www.legalassist.london/services/bonus-dispute" />
      <ServicePageLayout seoTitle="Bonus Disputes | Ontario" seoDescription="Bonus dispute help in Ontario." canonical="https://www.legalassist.london/services/bonus-dispute" problemHeadline="Bonus Disputes" problemDescription="Denied your bonus after being terminated? Many bonuses are legally recoverable—even 'discretionary' ones. I help employees get what they earned." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Bonus disputes" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Bonus Entitlements</h2>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <DollarSign className="w-6 h-6" />
                Bonuses Are Often Recoverable
              </h3>
              <p className="text-green-900">Courts increasingly recognize that bonuses—even "discretionary" ones—can be integral to compensation. If you earned it, you may be entitled to it regardless of termination timing.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Types of Bonus Claims</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Situation</th>
                    <th className="px-6 py-4 text-left font-heading">Strength</th>
                    <th className="px-6 py-4 text-left font-heading">Key Factor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">Targets met, then terminated</td><td className="px-6 py-4 text-green-700 font-bold">Strong</td><td className="px-6 py-4 text-sm">You earned it before termination</td></tr>
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">Terminated before bonus date</td><td className="px-6 py-4 text-green-700">Good</td><td className="px-6 py-4 text-sm">Would have received during notice period</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Discretionary bonus, regularly paid</td><td className="px-6 py-4 text-yellow-700">Moderate</td><td className="px-6 py-4 text-sm">Pattern makes it expected compensation</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Clear "active employment" required</td><td className="px-6 py-4 text-red-700">Challenging</td><td className="px-6 py-4 text-sm">Explicit terms may exclude terminated employees</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">"Discretionary" Doesn't Mean Anything Goes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6">
                <h4 className="font-bold text-foreground mb-3">When "Discretionary" May Still Be Owed:</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Regularly paid every year</li>
                  <li>• Discussed as part of compensation</li>
                  <li>• Targets were set and met</li>
                  <li>• Discrimination in who gets it</li>
                  <li>• Bad faith denial</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <h4 className="font-bold text-foreground mb-3">When Discretion May Apply:</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Truly one-time, unexpected bonus</li>
                  <li>• Clear written terms excluding terminated employees</li>
                  <li>• Company-wide decision not to pay bonuses</li>
                  <li>• Genuine performance concerns documented</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Document Your Entitlement</h4>
              <p className="text-yellow-900 text-sm">Gather: bonus plan documents, targets you were set, evidence you met them, past bonus payment history, any communications about bonus expectations. This documentation strengthens your claim significantly.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Bonus Dispute FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Denied Your Bonus?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">You may have a claim. Let me review your situation.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.employment} />
      </ServicePageLayout>
    </>
  );
}
