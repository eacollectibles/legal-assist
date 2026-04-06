import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, DollarSign, Users, FileText, Clock } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function LoanRecoveryPage() {
  const authorityItems = [
    { title: 'Loan Recovery', description: 'I help recover money lent to friends, family, or acquaintances who won\'t pay it back.' },
    { title: 'Documentation Support', description: 'Even without a written agreement, loans can be enforceable. I help build your case.' },
    { title: 'Realistic Assessment', description: 'I\'ll tell you honestly whether the loan is recoverable and what it will cost to try.' }
  ];

  const processSteps = [
    { step: '1', title: 'Evidence Gathering', description: 'Bank transfers, texts, emails—anything showing the loan and promise to repay.' },
    { step: '2', title: 'Demand Letter', description: 'Formal demand often prompts payment without court.' },
    { step: '3', title: 'Court Action', description: 'Small Claims Court claim if demand ignored.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Verbal Loans Count', description: 'No written contract? Still potentially enforceable.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Digital Evidence', description: 'Texts and e-transfers help prove loans.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Relationship Cost', description: 'Legal action often ends relationships.' }
  ];

  const honestFAQs = [
    { question: "Can I sue for a loan with no written agreement?", answer: "Yes—verbal loans are enforceable. But proving it is harder. You need evidence: bank transfers, texts mentioning 'loan' or 'pay back,' witnesses, any acknowledgment of the debt. Pure he-said-she-said cases are difficult." },
    { question: "They say it was a gift, not a loan. What now?", answer: "This is the classic defence. Your evidence needs to show loan, not gift: did they promise to repay? Were there payment terms discussed? Was it called a 'loan' in texts? The more evidence of repayment expectation, the better." },
    { question: "What if they claim they already paid me back?", answer: "They have to prove it. If you have no record of receiving payment, that helps you. Bank records, etransfer history, and cash deposits all become relevant evidence." },
    { question: "Is it worth suing family/friends over a loan?", answer: "Consider: Will you ever see this money otherwise? What will litigation cost? What's the relationship worth? Sometimes a formal demand letter prompts payment without court. Sometimes it ends the relationship either way." },
    { question: "How do I prove how much was lent?", answer: "Bank transfers, etransfers, cheque images, withdrawal records matching their deposit dates. Multiple smaller loans need each amount documented. Without financial records, amounts become disputed." },
    { question: "What about interest on the loan?", answer: "If you agreed to interest, it's recoverable. If no interest was agreed, you can't add it. After judgment, court interest applies (~2%). For personal loans, interest often wasn't discussed, so focus on the principal." }
  ];

  return (
    <>
      <SEO title="Loan Recovery Paralegal Ontario | Personal Loan Collection" description="Licensed paralegal recovering personal loans in Ontario. Friends, family, acquaintances who won't repay. Up to $35,000. Free consultation." canonical="https://www.legalassist.london/services/loan-recovery" />
      <ServicePageLayout seoTitle="Loan Recovery | Ontario" seoDescription="Personal loan recovery in Ontario." canonical="https://www.legalassist.london/services/loan-recovery" problemHeadline="Personal Loan Recovery" problemDescription="Lent money to a friend, family member, or acquaintance and they won't pay it back? It's awkward, but your money is your money. I can help." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Loan recovery" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Recovering Personal Loans</h2>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2">
                <Users className="w-6 h-6" />
                The Relationship Reality
              </h3>
              <p className="text-yellow-900">Suing someone you know often ends the relationship permanently. Sometimes a formal demand letter is enough—they realize you're serious, and pay. Other times, the relationship was already over when they refused to repay. I'll help you think through both the legal and personal aspects.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Proving a Loan Exists</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Strong Evidence:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Written loan agreement</li>
                  <li>• Texts/emails saying "loan" or "pay back"</li>
                  <li>• Bank transfer with "loan" memo</li>
                  <li>• Witness to loan conversation</li>
                  <li>• Any partial payments made</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Weak Evidence:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Only cash given, no records</li>
                  <li>• No texts/emails about repayment</li>
                  <li>• Transfer memo says "gift" or nothing</li>
                  <li>• Given on birthday/holiday</li>
                  <li>• No witnesses</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Evidence to Gather</h3>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-foreground/80 text-sm">
                <ul className="space-y-2">
                  <li>✓ Bank statements showing transfer</li>
                  <li>✓ Etransfer records with notes</li>
                  <li>✓ All text messages about the loan</li>
                  <li>✓ All emails about the loan</li>
                </ul>
                <ul className="space-y-2">
                  <li>✓ Any written promises to repay</li>
                  <li>✓ Records of any payments made</li>
                  <li>✓ Witness statements</li>
                  <li>✓ Timeline of when loan was made</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Defences They'll Use</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Their Defence</th>
                    <th className="px-6 py-4 text-left font-heading">Your Response</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">"It was a gift"</td><td className="px-6 py-4 text-sm">Show evidence of repayment expectation (texts, terms discussed)</td></tr>
                  <tr><td className="px-6 py-4 font-medium">"I already paid"</td><td className="px-6 py-4 text-sm">Challenge them to prove it—burden shifts to them</td></tr>
                  <tr><td className="px-6 py-4 font-medium">"It was for work I did"</td><td className="px-6 py-4 text-sm">Show no work agreement existed, or was separate</td></tr>
                  <tr><td className="px-6 py-4 font-medium">"Too much time passed"</td><td className="px-6 py-4 text-sm">Limitation is 2 years—if within that, you're fine</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Loan Recovery FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Owed Money From a Loan?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let's assess your evidence and discuss the best way forward.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.smallClaims} />
      </ServicePageLayout>
    </>
  );
}
