import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, DollarSign, FileText, Users, Scale } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function LoanDisputesPage() {
  const authorityItems = [
    { title: 'Personal Loan Recovery', description: 'Lent money to a friend or family member who won\'t pay back? I help recover personal loans up to $35,000 in Small Claims Court.' },
    { title: 'Documentation Matters', description: 'Written agreements are ideal, but text messages, emails, and bank transfers can also prove a loan existed.' },
    { title: 'Realistic Recovery', description: 'Even with judgment, collecting can be challenging. I help assess whether pursuing the claim makes practical sense.' }
  ];

  const processSteps = [
    { step: '1', title: 'Gather Evidence', description: 'Texts, emails, transfers, any written agreement.' },
    { step: '2', title: 'Demand Payment', description: 'Formal demand letter with deadline.' },
    { step: '3', title: 'Sue if Needed', description: 'Small Claims Court for amounts up to $35,000.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'No Contract Needed', description: 'Verbal loans are enforceable.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Digital Evidence', description: 'Texts and transfers help prove loans.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Collection Challenge', description: 'Judgment ≠ money in hand.' }
  ];

  const honestFAQs = [
    { question: "I lent money but there's no written agreement. Can I still sue?", answer: "Yes. Verbal loan agreements are enforceable. You'll need to prove: (1) money was transferred, (2) it was a loan, not a gift, and (3) repayment was expected. Bank records, texts discussing repayment, and witnesses all help." },
    { question: "How do I prove it was a loan, not a gift?", answer: "Evidence of repayment expectation: texts/emails discussing when they'd pay back, partial payments made, their acknowledgment of owing you money, circumstances suggesting loan (e.g., they asked to 'borrow' money). Gift is presumed in some family situations—be prepared to rebut." },
    { question: "They say it was a gift. What now?", answer: "This is the most common defence. Counter with: your financial situation (couldn't afford gifts), their request language ('can I borrow'), any repayment discussions, partial payments made, the amount (large sums less likely to be gifts)." },
    { question: "What if they paid back some but not all?", answer: "Partial payments actually help your case—they prove it was a loan and that they acknowledged the debt. Sue for the remaining balance. Document all partial payments as evidence." },
    { question: "Should I sue a friend or family member?", answer: "Consider: Is the relationship already damaged? Will you recover anything even with judgment? Sometimes a demand letter prompts payment without lawsuit. Sometimes the relationship is worth more than the money. I help you think through the decision." },
    { question: "If I win, how do I collect?", answer: "Judgment doesn't equal payment. Collection options: garnish wages (if employed), garnish bank accounts, register against property. If they have no assets or income, judgment may be uncollectible. Assess collectability before suing." }
  ];

  return (
    <>
      <SEO title="Personal Loan Recovery Paralegal Ontario | Friend Owes Money" description="Licensed paralegal for personal loan disputes in Ontario. Friend or family won't repay loan. Small Claims Court recovery. Free consultation." canonical="https://www.legalassist.london/services/loan-disputes" />
      <ServicePageLayout seoTitle="Loan Disputes | Ontario" seoDescription="Personal loan recovery in Ontario." canonical="https://www.legalassist.london/services/loan-disputes" problemHeadline="Personal Loan Disputes" problemDescription="Lent money to someone who won't pay back? Whether it's a friend, family member, or acquaintance, I help recover personal loans." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Loan disputes" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Recovering Personal Loans</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Building Your Case</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Strong Evidence:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Written loan agreement (even informal)</li>
                  <li>• Texts saying "I'll pay you back"</li>
                  <li>• Emails discussing repayment terms</li>
                  <li>• Bank transfer with "loan" memo</li>
                  <li>• Partial payments made</li>
                  <li>• Witnesses to the agreement</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Challenges:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Cash with no documentation</li>
                  <li>• No discussion of repayment</li>
                  <li>• Family gifts are presumed</li>
                  <li>• Long time passed without asking</li>
                  <li>• Contradictory statements</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">The "Gift vs. Loan" Problem</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-12">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
              <p className="text-yellow-900 mb-3">The #1 defence: "It was a gift." Courts examine:</p>
              <ul className="text-yellow-900 text-sm space-y-1">
                <li>• Language used ("borrow" vs "have")</li>
                <li>• Your financial ability to gift</li>
                <li>• Any repayment discussions</li>
                <li>• Partial repayments made</li>
                <li>• Relationship and history</li>
                <li>• The amount involved</li>
              </ul>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Before You Sue: Consider Collection</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-8">
              <DollarSign className="w-8 h-8 text-primary mb-3" />
              <p className="text-foreground/80 mb-4">Winning a judgment doesn't put money in your pocket. Ask:</p>
              <ul className="text-foreground/80 space-y-2">
                <li>• Are they employed? (wages can be garnished)</li>
                <li>• Do they have bank accounts? (can be garnished)</li>
                <li>• Do they own property? (judgment can be registered)</li>
                <li>• Are they already in debt? (you may be last in line)</li>
              </ul>
              <p className="text-foreground/70 text-sm mt-4">If the answer to all is "no," you may win the judgment but never collect. Sometimes a demand letter is enough.</p>
            </div>

            <div className="bg-primary/5 rounded-lg p-6">
              <h4 className="font-bold text-foreground mb-2">The Relationship Question</h4>
              <p className="text-foreground/80 text-sm">Suing a friend or family member usually ends the relationship. Consider whether the money is worth more than the relationship. Sometimes people pay after a demand letter to avoid court embarrassment—try that first.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Loan Dispute FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Trying to Recover a Loan?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let me assess your evidence and whether pursuing the claim makes sense.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.smallClaims} />
      </ServicePageLayout>
    </>
  );
}
