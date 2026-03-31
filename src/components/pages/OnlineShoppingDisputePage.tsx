import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, ShoppingCart, CreditCard, Shield, Package } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function OnlineShoppingDisputePage() {
  const authorityItems = [
    { title: 'Online Shopping Disputes', description: 'Didn\'t receive your order? Wrong item? Seller won\'t refund? Ontario\'s Consumer Protection Act and chargeback rights protect you.' },
    { title: 'Credit Card Leverage', description: 'Paid by credit card? You have chargeback rights. The credit card company can reverse the charge and get your money back.' },
    { title: 'CPA Rights', description: 'The Consumer Protection Act gives you specific rights for online purchases, including cancellation rights for non-delivery.' }
  ];

  const processSteps = [
    { step: '1', title: 'Contact Seller', description: 'Document attempts to resolve directly.' },
    { step: '2', title: 'Credit Card Dispute', description: 'File chargeback if seller won\'t help.' },
    { step: '3', title: 'Small Claims if Needed', description: 'For amounts card won\'t cover.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Chargeback Rights', description: 'Credit cards protect buyers.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'CPA Protection', description: 'Ontario law backs consumers.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Time Limits', description: 'Chargebacks have deadlines.' }
  ];

  const honestFAQs = [
    { question: "I never received my order. What are my options?", answer: "Contact seller first (document this). If no resolution within 30 days of expected delivery, you can: (1) cancel under CPA for non-delivery, (2) file credit card chargeback, (3) sue in Small Claims. Credit card chargeback is usually fastest." },
    { question: "How do credit card chargebacks work?", answer: "Contact your credit card issuer, explain the dispute (non-delivery, defective, not as described). They investigate and may reverse the charge. You'll need documentation: order confirmation, delivery tracking (or lack thereof), communication with seller. Typically 60-120 days to file." },
    { question: "The item arrived but it's completely different from what I ordered. Refund rights?", answer: "Yes. 'Not as described' is valid grounds for refund under CPA and chargeback. Document: what was advertised vs what arrived (screenshots, photos). Request refund from seller; if refused, chargeback or Small Claims." },
    { question: "Seller says 'no refunds' in their policy. Is that enforceable?", answer: "Not for defective products or items not as described. 'No refund' policies cannot override your legal rights under CPA. If the product is defective or misrepresented, you have refund rights regardless of seller's policy." },
    { question: "The seller is overseas. Can I still get my money back?", answer: "Credit card chargeback is your best tool—it works regardless of where seller is located. Small Claims Court is harder with overseas sellers (service, enforcement issues). For overseas disputes, focus on chargeback before the deadline." },
    { question: "I paid by e-transfer/debit. Am I stuck?", answer: "Unfortunately, e-transfer and debit have much weaker protections than credit cards. No chargeback rights. Your options are: demand refund, complain to payment platform, Small Claims Court. This is why credit cards are safer for online purchases." }
  ];

  return (
    <>
      <SEO title="Online Shopping Dispute Paralegal Ontario | Chargeback Help" description="Online purchase gone wrong in Ontario? Non-delivery, wrong item, no refund. Credit card chargeback help, Consumer Protection Act claims. Free consultation." canonical="https://www.legalassist.london/services/online-shopping-dispute" />
      <ServicePageLayout seoTitle="Online Shopping Disputes | Ontario" seoDescription="Online shopping dispute help in Ontario." canonical="https://www.legalassist.london/services/online-shopping-dispute" problemHeadline="Online Shopping Disputes" problemDescription="Never received your order? Wrong item? Seller won't refund? You have rights under Ontario law and through your credit card. I help consumers recover money." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Online shopping" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Resolving Online Purchase Problems</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Recovery Options by Situation</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Problem</th>
                    <th className="px-6 py-4 text-left font-heading">Best Option</th>
                    <th className="px-6 py-4 text-left font-heading">Backup Option</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">Never received (credit card)</td><td className="px-6 py-4 text-green-700 font-bold">Chargeback</td><td className="px-6 py-4 text-sm">Small Claims</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Wrong/defective item (credit card)</td><td className="px-6 py-4 text-green-700 font-bold">Chargeback</td><td className="px-6 py-4 text-sm">Small Claims</td></tr>
                  <tr className="bg-yellow-50"><td className="px-6 py-4 font-medium">Never received (e-transfer/debit)</td><td className="px-6 py-4 text-yellow-700">Small Claims</td><td className="px-6 py-4 text-sm">Limited options</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Subscription won't cancel</td><td className="px-6 py-4 text-green-700">Chargeback + written cancellation</td><td className="px-6 py-4 text-sm">CPA complaint</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Credit Card Chargeback Process</h3>
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
              <CreditCard className="w-6 h-6 text-green-600 mb-2" />
              <h4 className="font-bold text-green-800 mb-2">Your Best Tool</h4>
              <ol className="text-green-900 text-sm space-y-2">
                <li><span className="font-bold">1.</span> Contact seller first and document the attempt</li>
                <li><span className="font-bold">2.</span> Call credit card issuer's dispute line</li>
                <li><span className="font-bold">3.</span> Explain: non-delivery, defective, or not as described</li>
                <li><span className="font-bold">4.</span> Provide documentation (order, tracking, photos, communications)</li>
                <li><span className="font-bold">5.</span> Credit is usually applied while investigation proceeds</li>
              </ol>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">CPA Rights for Online Purchases</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-primary/5 rounded-lg p-6">
                <h4 className="font-bold text-foreground mb-3">You Can Cancel If:</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Delivery not made within 30 days of promised date</li>
                  <li>• No delivery date stated and 30 days passed</li>
                  <li>• Seller didn't provide required disclosure</li>
                  <li>• Item substantially different than described</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <h4 className="font-bold text-foreground mb-3">Seller Must Refund:</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Within 15 days of cancellation</li>
                  <li>• Full amount including shipping</li>
                  <li>• Cannot charge restocking fees for CPA cancellations</li>
                  <li>• Credit card company can assist if seller refuses</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Time Limits Matter</h4>
              <p className="text-yellow-900 text-sm">Credit card chargebacks typically must be filed within 60-120 days of the transaction (varies by card). Don't wait too long hoping seller will resolve it. File chargeback while you still can, and continue talking to seller.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Online Shopping FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Online Purchase Problem?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let me help you recover your money through chargeback or Small Claims.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.smallClaims} />
      </ServicePageLayout>
    </>
  );
}
