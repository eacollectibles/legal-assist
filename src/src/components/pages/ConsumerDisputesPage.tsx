import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, DollarSign, HelpCircle, ShoppingCart, Shield, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ConsumerDisputesPage() {
  const authorityItems = [
    { title: 'Consumer Protection', description: 'Ontario has strong consumer protection laws. I help enforce your rights against businesses that don\'t deliver.' },
    { title: 'CPA Claims', description: 'The Consumer Protection Act provides additional remedies beyond standard contract law.' },
    { title: 'Refund Recovery', description: 'I help recover refunds, damages, and remedies when businesses fail to honor their obligations.' }
  ];

  const processSteps = [
    { step: '1', title: 'Rights Assessment', description: 'Identify which consumer protections apply and what remedies are available.' },
    { step: '2', title: 'Formal Demand', description: 'Demand compliance with consumer protection obligations.' },
    { step: '3', title: 'Legal Action', description: 'Small Claims Court claim citing CPA violations if needed.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Strong Protections', description: 'CPA gives consumers significant rights.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Cooling-Off Periods', description: 'Cancel many contracts within 10 days.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Unfair Practices', description: 'Remedies for deceptive or unconscionable conduct.' }
  ];

  const honestFAQs = [
    { question: "What does the Consumer Protection Act cover?", answer: "Most consumer transactions in Ontario: door-to-door sales, internet agreements, future performance contracts (gyms, travel), motor vehicle repairs, gift cards, and more. It requires clear disclosure, provides cooling-off periods, and prohibits unfair practices." },
    { question: "What is a cooling-off period?", answer: "Time to cancel certain contracts without penalty. 10 days for door-to-door sales, direct agreements (signed at your home), and internet agreements over $50. The contract must include required information or the period extends to 1 year." },
    { question: "What are unfair practices?", answer: "False or misleading representations (lies about product/service), unconscionable representations (taking advantage of vulnerability), and failure to deliver. If a business commits unfair practices, you can rescind the contract and get a full refund." },
    { question: "What about gym memberships?", answer: "Heavy regulation in Ontario. Must allow cancellation within 10 days. Can cancel with 30 days notice if facility moves, significant service reduction, or personal injury/illness. Cannot require more than 1 year payment upfront." },
    { question: "What if a business won't give me a refund I'm entitled to?", answer: "Document everything, send formal demand citing CPA provisions, then file Small Claims Court claim. CPA violations can strengthen your case and may entitle you to additional remedies beyond just the refund." },
    { question: "Does CPA apply to all purchases?", answer: "Most consumer purchases, but not all. Exceptions include: private sales between individuals, real estate, securities, professional services (lawyers, accountants), and some others. I can assess whether CPA applies to your situation." }
  ];

  return (
    <>
      <SEO title="Consumer Dispute Paralegal Ontario | Consumer Protection Claims" description="Licensed paralegal for consumer disputes in Ontario. Consumer Protection Act claims, unfair practices, refund recovery. Free consultation." canonical="https://www.legalassist.london/services/consumer-disputes" />
      <ServicePageLayout seoTitle="Consumer Disputes | Ontario" seoDescription="Consumer dispute help in Ontario." canonical="https://www.legalassist.london/services/consumer-disputes" problemHeadline="Consumer Protection Disputes" problemDescription="Business didn't deliver what they promised? Ontario's Consumer Protection Act gives you strong rights. I help enforce them." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Consumer disputes" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Your Consumer Rights</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Cooling-Off Periods</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Contract Type</th>
                    <th className="px-6 py-4 text-center font-heading">Period</th>
                    <th className="px-6 py-4 text-left font-heading">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Door-to-door sales</td><td className="px-6 py-4 text-center">10 days</td><td className="px-6 py-4 text-sm">Extends to 1 year if missing required info</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Direct agreements</td><td className="px-6 py-4 text-center">10 days</td><td className="px-6 py-4 text-sm">Signed at your home/workplace</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Internet agreements &gt;$50</td><td className="px-6 py-4 text-center">10 days</td><td className="px-6 py-4 text-sm">Must provide required disclosure</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Gym memberships</td><td className="px-6 py-4 text-center">10 days</td><td className="px-6 py-4 text-sm">Plus other cancellation rights</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Consumer Disputes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-bold text-red-800 mb-3">Unfair Business Practices:</h4>
                <ul className="text-red-900 text-sm space-y-2">
                  <li>• False advertising or misrepresentation</li>
                  <li>• Bait and switch tactics</li>
                  <li>• Hidden fees or charges</li>
                  <li>• Product not as described</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-bold text-red-800 mb-3">Failure to Perform:</h4>
                <ul className="text-red-900 text-sm space-y-2">
                  <li>• Service never provided</li>
                  <li>• Goods not delivered</li>
                  <li>• Gym closes or reduces services</li>
                  <li>• Prepaid services not honored</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Your Remedies</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Rescission</h4>
                <p className="text-green-900 text-sm">Cancel the contract and get a full refund.</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <DollarSign className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Damages</h4>
                <p className="text-green-900 text-sm">Compensation for losses caused by business conduct.</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <FileText className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Chargeback</h4>
                <p className="text-green-900 text-sm">Credit card chargeback rights in some cases.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Consumer FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Consumer Problem?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let's see what protections apply and how to get your money back.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.smallClaims} />
      </ServicePageLayout>
    </>
  );
}
