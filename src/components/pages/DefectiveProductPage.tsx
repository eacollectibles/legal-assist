import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Package, DollarSign, Shield, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function DefectiveProductPage() {
  const authorityItems = [
    { title: 'Defective Product Claims', description: 'Bought something that doesn\'t work? Ontario\'s Sale of Goods Act and Consumer Protection Act give you remedies.' },
    { title: 'Implied Warranties', description: 'Products must be of "merchantable quality" and fit for purpose—even if no warranty is stated.' },
    { title: 'Beyond Return Period', description: 'Just because the return period expired doesn\'t mean you have no recourse. Defective products have longer remedies.' }
  ];

  const processSteps = [
    { step: '1', title: 'Document Defect', description: 'Photos, videos, receipts, communications.' },
    { step: '2', title: 'Demand Remedy', description: 'Request refund, repair, or replacement.' },
    { step: '3', title: 'Escalate if Needed', description: 'Credit card dispute or Small Claims Court.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Implied Warranty', description: 'Products must work as expected.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Multiple Options', description: 'Refund, repair, or replacement.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Time Matters', description: 'Act promptly when defect found.' }
  ];

  const honestFAQs = [
    { question: "The store says I can't return it because the return period expired. Do I have any recourse?", answer: "Yes. Store return policies are separate from legal warranty rights. Under the Sale of Goods Act, products must be of merchantable quality. A defective product can be returned/refunded even after the return period—the defect is the issue, not the timing." },
    { question: "What does 'merchantable quality' mean?", answer: "The product must be: free from defects that make it unsaleable, fit for its ordinary purpose, of quality that a reasonable buyer would accept given the price and description. A TV that doesn't turn on, a jacket that falls apart immediately, etc. fails this test." },
    { question: "The manufacturer says my warranty expired. What now?", answer: "Manufacturer warranty is separate from your legal rights against the seller. Even if manufacturer warranty expired, the seller is responsible for selling you a merchantable product. You may have claims against the retailer for implied warranty breach." },
    { question: "Can I get a refund or just repair/replacement?", answer: "Depends on the defect severity and timing. For significant defects discovered quickly: refund is appropriate. For minor defects or later discovery: repair or replacement may be reasonable. If repair fails repeatedly, you escalate to refund." },
    { question: "I paid by credit card. Does that help?", answer: "Yes—significantly. You can dispute the charge with your credit card company (chargeback) if the merchant won't resolve. Credit card companies often side with consumers for defective products. Keep documentation of defect and communication attempts." },
    { question: "The seller has gone out of business. Any options?", answer: "You may have claims against the manufacturer for defects. Credit card chargeback may still work. If the product caused injury, product liability claims exist. But collecting from a defunct seller is usually not possible." }
  ];

  return (
    <>
      <SEO title="Defective Product Claims Paralegal Ontario | Consumer Rights" description="Bought a defective product in Ontario? Sale of Goods Act gives you rights even after return period. Refund, repair, replacement. Free consultation." canonical="https://www.legalassist.london/services/defective-product" />
      <ServicePageLayout seoTitle="Defective Product Claims | Ontario" seoDescription="Defective product help in Ontario." canonical="https://www.legalassist.london/services/defective-product" problemHeadline="Defective Product Claims" problemDescription="Bought something that doesn't work? Ontario law requires products to be of merchantable quality—even if the return period has passed. I help recover refunds." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Defective product" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Your Consumer Rights</h2>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Implied Warranty of Quality
              </h3>
              <p className="text-green-900">Under Ontario's Sale of Goods Act, every product sold comes with an implied warranty that it's of "merchantable quality" and fit for its intended purpose. This exists even if there's no written warranty.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Store Policy vs Legal Rights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">Store Policy:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• "30-day return period"</li>
                  <li>• "No refunds after opening"</li>
                  <li>• "Exchange only"</li>
                  <li>• "Final sale"</li>
                </ul>
                <p className="text-yellow-900 text-sm mt-3 font-bold">These are store policies, not the law.</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Your Legal Rights:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Product must work as expected</li>
                  <li>• Defective products can be returned</li>
                  <li>• Store policies can't override this</li>
                  <li>• Refund is appropriate for serious defects</li>
                </ul>
                <p className="text-green-900 text-sm mt-3 font-bold">Law trumps store policy for defects.</p>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Escalation Options</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <ol className="text-foreground/80 space-y-3">
                <li><span className="font-bold">1. Request remedy from seller:</span> Written request for refund, repair, or replacement.</li>
                <li><span className="font-bold">2. Escalate to management/corporate:</span> If frontline staff refuse, go higher.</li>
                <li><span className="font-bold">3. Credit card dispute:</span> If paid by card, file chargeback for defective merchandise.</li>
                <li><span className="font-bold">4. Consumer protection complaint:</span> Ontario Ministry of Government and Consumer Services.</li>
                <li><span className="font-bold">5. Small Claims Court:</span> For claims up to $35,000 including damages.</li>
              </ol>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Keep Everything</h4>
              <p className="text-yellow-900 text-sm">Receipt, product packaging, photos/videos of defect, all communications with seller, any repair attempts. This documentation is essential for credit card disputes and court claims.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Defective Product FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Stuck with a Defective Product?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Store won't help? Let me assess your legal options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.smallClaims} />
      </ServicePageLayout>
    </>
  );
}
