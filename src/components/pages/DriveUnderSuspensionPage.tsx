import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Car, Shield, Scale, DollarSign, Ban } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function DriveUnderSuspensionPage() {
  const authorityItems = [
    { title: 'Suspended Licence Defence', description: 'Driving while suspended carries serious penalties including vehicle seizure. I help find defences and minimize consequences.' },
    { title: 'Multiple Causes', description: 'Suspensions happen for many reasons—unpaid fines, medical issues, administrative errors. The reason affects your defence.' },
    { title: 'Due Diligence', description: 'The key defence: did you know your licence was suspended? Lack of notice can be a complete defence.' }
  ];

  const processSteps = [
    { step: '1', title: 'Understand Suspension', description: 'Why was your licence suspended? When? Did you know?' },
    { step: '2', title: 'Defence Assessment', description: 'Due diligence, notice issues, administrative errors.' },
    { step: '3', title: 'Resolve', description: 'Fight the charge and/or get your licence reinstated.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Due Diligence Defence', description: 'Didn\'t know about suspension? May be a defence.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Administrative Errors', description: 'MTO makes mistakes—sometimes suspensions are wrong.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Reinstatement Help', description: 'I help get your licence back properly.' }
  ];

  const honestFAQs = [
    { question: "What are the penalties for driving under suspension?", answer: "First offence: $1,000-$5,000 fine, 6 months additional suspension, 7-day vehicle impound. Subsequent: $2,000-$5,000, up to 2 years suspension, longer impound. If suspended for impaired: mandatory jail possible." },
    { question: "I didn't know my licence was suspended. Is that a defence?", answer: "Potentially yes. 'Due diligence' defence: if you took reasonable steps and had no reason to know about the suspension, you may have a defence. Key evidence: did MTO send notice? To correct address?" },
    { question: "Why might my licence be suspended?", answer: "Common reasons: unpaid fines, too many demerit points, medical condition, insurance lapse, failed to respond to notice, child support arrears, court order. Each has different implications for defence." },
    { question: "What if I just forgot to pay a fine?", answer: "Unpaid fines lead to licence suspension after notice. If you genuinely didn't receive notice (moved, mail issues), this supports a due diligence defence. If you just ignored it, harder to defend." },
    { question: "Can I get my vehicle back from impound?", answer: "Yes, after 7 days (or longer for repeat offences). You'll pay storage and towing. Getting the charge withdrawn doesn't automatically refund impound fees." },
    { question: "How do I get my licence reinstated?", answer: "Depends on why it was suspended. Usually: address underlying issue (pay fine, meet medical requirements), pay reinstatement fee ($198), any required waiting periods. I can help navigate reinstatement." }
  ];

  return (
    <>
      <SEO title="Driving Under Suspension Paralegal Ontario | Suspended Licence" description="Licensed paralegal defending driving under suspension charges in Ontario. Due diligence defence, licence reinstatement help. Free consultation." canonical="https://www.legalassist.london/services/driving-under-suspension" />
      <ServicePageLayout seoTitle="Driving Under Suspension | Ontario" seoDescription="Driving under suspension defence in Ontario." canonical="https://www.legalassist.london/services/driving-under-suspension" problemHeadline="Driving Under Suspension" problemDescription="Caught driving while suspended? Penalties are harsh—but defences exist, especially if you didn't know about the suspension. I help fight these charges." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Driving under suspension" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Driving While Suspended</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Penalties by Offence</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Offence</th>
                    <th className="px-6 py-4 text-left font-heading">Fine</th>
                    <th className="px-6 py-4 text-left font-heading">Additional Suspension</th>
                    <th className="px-6 py-4 text-left font-heading">Impound</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">First offence</td><td className="px-6 py-4">$1,000-$5,000</td><td className="px-6 py-4">6 months</td><td className="px-6 py-4">7 days</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Second offence</td><td className="px-6 py-4">$2,000-$5,000</td><td className="px-6 py-4">1 year</td><td className="px-6 py-4">14 days</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Third+ offence</td><td className="px-6 py-4">$2,000-$5,000</td><td className="px-6 py-4">2 years</td><td className="px-6 py-4">Longer</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">If impaired-related</td><td className="px-6 py-4">Higher</td><td className="px-6 py-4">Longer</td><td className="px-6 py-4">+ Possible jail</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Suspension Reasons</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6">
                <h4 className="font-bold text-foreground mb-3">Administrative Suspensions:</h4>
                <ul className="text-foreground/80 text-sm space-y-2">
                  <li>• Unpaid fines (most common)</li>
                  <li>• Too many demerit points</li>
                  <li>• Insurance lapse</li>
                  <li>• Failed to respond to MTO notice</li>
                  <li>• Child support arrears</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <h4 className="font-bold text-foreground mb-3">Court-Ordered Suspensions:</h4>
                <ul className="text-foreground/80 text-sm space-y-2">
                  <li>• Criminal Code (impaired, dangerous)</li>
                  <li>• Court prohibition order</li>
                  <li>• Fail to stop for police</li>
                  <li>• Medical reasons</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">The Due Diligence Defence</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
              <h4 className="font-bold text-green-800 mb-2">You May Have a Defence If:</h4>
              <ul className="text-green-900 text-sm space-y-2">
                <li>✓ MTO didn't send notice (or sent to wrong address)</li>
                <li>✓ You moved and updated your address but notice went to old address</li>
                <li>✓ Suspension was in error (MTO makes mistakes)</li>
                <li>✓ You reasonably believed licence was valid</li>
                <li>✓ You took steps to check your licence status</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Check Your Licence Status</h4>
              <p className="text-yellow-900 text-sm">You can check your licence status online at ServiceOntario. If you receive any notice from MTO, don't ignore it. Many suspensions happen because people ignore warnings about unpaid fines or medical requirements.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Driving Under Suspension FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Charged with Driving Under Suspension?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let me review why you were suspended and what defences apply.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Case Review</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.traffic} />
      </ServicePageLayout>
    </>
  );
}
