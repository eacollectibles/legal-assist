import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Car, Shield, DollarSign, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function NoInsurancePage() {
  const authorityItems = [
    { title: 'No Insurance Defence', description: 'Operating without insurance carries massive fines ($5,000-$25,000). I help fight these charges or minimize penalties.' },
    { title: 'Due Diligence', description: 'If you believed you had valid insurance, you may have a defence. The key is what you knew and when.' },
    { title: 'Fine Reduction', description: 'Even when conviction is likely, I negotiate to reduce the devastating fines.' }
  ];

  const processSteps = [
    { step: '1', title: 'Review Circumstances', description: 'Did you know? Was there a lapse? Administrative error?' },
    { step: '2', title: 'Build Defence', description: 'Due diligence, mistaken belief, or mitigation strategy.' },
    { step: '3', title: 'Trial or Negotiate', description: 'Fight for acquittal or negotiate reduced fine.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Due Diligence Defence', description: 'Reasonable belief in coverage may be defence.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Fine Reduction', description: 'Courts have discretion on fine amount.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Minimum $5,000', description: 'Cannot go below minimum fine if convicted.' }
  ];

  const honestFAQs = [
    { question: "What are the penalties for driving without insurance?", answer: "First offence: $5,000-$25,000 fine, licence suspension, vehicle impound. Second offence: $10,000-$50,000 fine, up to 1 year jail possible. The minimum $5,000 fine is mandatory upon conviction—courts cannot go lower." },
    { question: "My insurance lapsed and I didn't know. Is that a defence?", answer: "Potentially. Due diligence defence requires showing you took reasonable steps to ensure coverage and had no reason to know it lapsed. Automatic payments that failed, address change issues, or broker errors can support this defence." },
    { question: "I had insurance but the wrong card in my car. Same charge?", answer: "Different situation. Fail to produce insurance card is a minor charge ($65 fine) that's dropped if you show valid insurance existed. Operating without insurance requires actually having no coverage—not just wrong paperwork." },
    { question: "Can the fine really be $25,000?", answer: "Yes. The range is $5,000-$25,000 for first offence. Courts consider circumstances: was there an accident? Prior record? Ability to pay? Even at minimum, $5,000 plus victim surcharge is devastating." },
    { question: "What about the licence suspension?", answer: "Upon conviction, licence suspended until you show proof of insurance (minimum 1 year for second offence). You must file SR-22 (high-risk insurance certificate) for 3 years after reinstatement." },
    { question: "Will this affect my future insurance?", answer: "Catastrophically. You'll be in the high-risk pool for years. Expect premiums 3-5x normal rates. Some insurers won't cover you at all. This is often worse than the fine itself." }
  ];

  return (
    <>
      <SEO title="No Insurance Charge Paralegal Ontario | Driving Without Insurance" description="Licensed paralegal defending no insurance charges in Ontario. $5,000-$25,000 fines. Due diligence defence. Free consultation." canonical="https://www.legalassist.london/services/no-insurance" />
      <ServicePageLayout seoTitle="No Insurance Defence | Ontario" seoDescription="No insurance charge defence in Ontario." canonical="https://www.legalassist.london/services/no-insurance" problemHeadline="Driving Without Insurance" problemDescription="Charged with operating without insurance? Minimum fine is $5,000. I help fight these charges or minimize the financial devastation." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "No insurance" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding No Insurance Charges</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                One of the Most Expensive Traffic Charges
              </h3>
              <p className="text-red-900">Minimum fine upon conviction is $5,000—no exceptions. Plus licence suspension, vehicle impound, and insurance consequences that last years. This charge is always worth fighting.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Penalties</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Offence</th>
                    <th className="px-6 py-4 text-left font-heading">Fine Range</th>
                    <th className="px-6 py-4 text-left font-heading">Other Penalties</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">First offence</td><td className="px-6 py-4">$5,000 - $25,000</td><td className="px-6 py-4 text-sm">Licence suspension, vehicle impound</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Second offence</td><td className="px-6 py-4">$10,000 - $50,000</td><td className="px-6 py-4 text-sm">+ up to 1 year jail, minimum 1 year suspension</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">The Due Diligence Defence</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">May Support Defence:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Auto-payment failed without notice</li>
                  <li>• Broker error in renewal</li>
                  <li>• Mail went to wrong address</li>
                  <li>• Recently purchased vehicle</li>
                  <li>• Reasonable belief coverage was valid</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Won't Work:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Knew insurance lapsed</li>
                  <li>• Couldn't afford premiums</li>
                  <li>• Just forgot to renew</li>
                  <li>• Driving someone else's uninsured car</li>
                  <li>• Insurance cancelled for non-payment</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Long-Term Insurance Impact</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">The Hidden Cost</h4>
              <p className="text-yellow-900 text-sm mb-3">A no-insurance conviction typically means:</p>
              <ul className="text-yellow-900 text-sm space-y-1">
                <li>• Facility Association (high-risk) insurance required</li>
                <li>• Premiums 3-5x normal rates for 3+ years</li>
                <li>• SR-22 filing requirement</li>
                <li>• Many insurers won't cover you at all</li>
                <li>• Total additional cost over 3 years: $10,000-$20,000+</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">No Insurance FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Facing No Insurance Charge?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">With $5,000+ at stake, this charge demands a fight. Let me review your options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Case Review</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.traffic} />
      </ServicePageLayout>
    </>
  );
}
