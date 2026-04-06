import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Dumbbell, DollarSign, FileText, Calendar } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function GymMembershipPage() {
  const authorityItems = [
    { title: 'Gym Membership Disputes', description: 'Stuck in a contract? Unauthorized charges? Gym closed? Ontario has specific laws protecting gym members.' },
    { title: 'Cooling-Off Period', description: 'You have 10 days to cancel any gym contract without penalty—no questions asked. This is law.' },
    { title: 'Maximum Terms', description: 'Gym contracts cannot exceed 1 year. Multi-year "memberships" may be unenforceable.' }
  ];

  const processSteps = [
    { step: '1', title: 'Review Contract', description: 'Check terms, cancellation rights, start date.' },
    { step: '2', title: 'Cancel in Writing', description: 'Send registered letter or email with delivery confirmation.' },
    { step: '3', title: 'Dispute Charges', description: 'Challenge credit card or recover in court.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: '10-Day Cooling Off', description: 'Cancel any contract within 10 days.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: '1-Year Maximum', description: 'Longer contracts may be void.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Written Cancellation', description: 'Must be done properly.' }
  ];

  const honestFAQs = [
    { question: "Can I cancel my gym membership within 10 days?", answer: "Yes—unconditionally. Under Ontario's Consumer Protection Act, you have 10 days from signing to cancel any gym membership for any reason. No penalty, no questions. Send cancellation in writing with delivery confirmation." },
    { question: "I signed a 2-year contract. Is that enforceable?", answer: "Possibly not. Ontario law limits gym contracts to 1 year maximum. If you signed a longer contract, the portion beyond 1 year may be unenforceable. You may be able to cancel after 12 months even if contract says otherwise." },
    { question: "I moved and can't use the gym anymore. Can I cancel?", answer: "Check your contract for relocation clauses. Many require you to move beyond a certain distance (e.g., 30km) from any location. If you qualify, you can cancel with proof of new address. If no clause, you may still argue frustration of contract." },
    { question: "The gym is charging me after I cancelled. What do I do?", answer: "Send written cancellation confirmation again. Dispute charges with your credit card company (chargeback). If they sent you to collections for disputed charges, respond in writing disputing the debt. If they persist, Small Claims Court." },
    { question: "The gym closed or changed significantly. Can I get a refund?", answer: "Yes. If the gym closes, you're entitled to a prorated refund. If they significantly change services (remove equipment you specifically joined for, change hours dramatically), you may have grounds to cancel and recover unused fees." },
    { question: "They won't let me cancel even though I followed the rules. What now?", answer: "Document your cancellation attempts (copies of letters, emails). Stop payment if using pre-authorized debit. If they try to charge you anyway, dispute with bank. If they pursue collections, respond in writing and prepare for Small Claims if needed." }
  ];

  return (
    <>
      <SEO title="Gym Membership Disputes Paralegal Ontario | Cancel Gym Contract" description="Licensed paralegal for gym membership disputes in Ontario. Cancel contract, unauthorized charges, gym closed. Consumer protection. Free consultation." canonical="https://www.legalassist.london/services/gym-membership" />
      <ServicePageLayout seoTitle="Gym Membership Disputes | Ontario" seoDescription="Gym membership dispute help in Ontario." canonical="https://www.legalassist.london/services/gym-membership" problemHeadline="Gym Membership Disputes" problemDescription="Trapped in a gym contract? Unauthorized charges? Ontario law protects gym members—including a 10-day unconditional cancellation right." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Gym membership disputes" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Your Gym Membership Rights</h2>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                10-Day Cooling-Off Period
              </h3>
              <p className="text-green-900">You can cancel ANY gym membership within 10 days of signing—no reason needed, no penalty. This is Ontario law. Send written cancellation with delivery confirmation.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Key Legal Protections</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Protection</th>
                    <th className="px-6 py-4 text-left font-heading">What It Means</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">10-day cooling off</td><td className="px-6 py-4 text-sm">Cancel for any reason within 10 days of signing</td></tr>
                  <tr><td className="px-6 py-4 font-medium">1-year maximum</td><td className="px-6 py-4 text-sm">Contracts longer than 12 months may be unenforceable</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Written contract required</td><td className="px-6 py-4 text-sm">Must receive copy of contract at signing</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Clear pricing</td><td className="px-6 py-4 text-sm">All fees must be disclosed, including initiation and annual fees</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Facility closure</td><td className="px-6 py-4 text-sm">Prorated refund if gym closes</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Other Cancellation Rights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6">
                <h4 className="font-bold text-foreground mb-3">You May Cancel If:</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• You move beyond reasonable distance</li>
                  <li>• Medical condition prevents use</li>
                  <li>• Gym materially changes services</li>
                  <li>• Contract violates CPA requirements</li>
                  <li>• Facility permanently closes</li>
                </ul>
              </div>
              <div className="bg-yellow-50 rounded-lg p-6">
                <h4 className="font-bold text-yellow-800 mb-3">How to Cancel:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• Put it in writing (email or letter)</li>
                  <li>• Get delivery confirmation</li>
                  <li>• Keep copies of everything</li>
                  <li>• Stop pre-authorized payments if needed</li>
                  <li>• Follow up if no confirmation received</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">If They Keep Charging You</h3>
            <div className="bg-primary/5 rounded-lg p-6">
              <DollarSign className="w-8 h-8 text-primary mb-3" />
              <p className="text-foreground/80 mb-4">Steps to stop unauthorized charges:</p>
              <ol className="text-foreground/80 space-y-2">
                <li><span className="font-bold">1.</span> Send another written cancellation confirmation</li>
                <li><span className="font-bold">2.</span> Contact bank to stop pre-authorized payments</li>
                <li><span className="font-bold">3.</span> Dispute charges with credit card (chargeback)</li>
                <li><span className="font-bold">4.</span> If sent to collections, dispute debt in writing</li>
                <li><span className="font-bold">5.</span> Small Claims Court if needed to recover</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Gym Membership FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Gym Contract Problem?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">You have more rights than they tell you. Let me review your situation.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.smallClaims} />
      </ServicePageLayout>
    </>
  );
}
