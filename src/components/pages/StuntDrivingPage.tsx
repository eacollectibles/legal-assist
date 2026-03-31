import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Car, Gauge, DollarSign, Ban } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function StuntDrivingPage() {
  const authorityItems = [
    { title: 'Stunt Driving Defence', description: 'Stunt driving (50+ over) triggers immediate roadside penalties and court charges. I fight these aggressively.' },
    { title: 'Immediate Consequences', description: '14-day licence suspension and 14-day vehicle impound happen at roadside before any court appearance.' },
    { title: 'Stakes Are Massive', description: 'Up to $10,000 fine, 2-year suspension, 6 demerit points, potential jail. Your driving future is on the line.' }
  ];

  const processSteps = [
    { step: '1', title: 'Review Evidence', description: 'How was speed measured? Calibration? Conditions?' },
    { step: '2', title: 'Challenge or Negotiate', description: 'Attack the evidence or negotiate reduction.' },
    { step: '3', title: 'Minimize Impact', description: 'Protect licence and minimize long-term consequences.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Defence Opportunities', description: 'Radar/laser calibration, speed calculation issues.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Reduction Possible', description: 'Often negotiable to lesser speeding charge.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Can\'t Undo Roadside', description: '14-day suspension/impound already happened.' }
  ];

  const honestFAQs = [
    { question: "What is stunt driving?", answer: "Section 172 HTA includes: 50+ km/h over limit, racing, wheelies, burnouts, driving to prevent passing, and more. Most common is 50+ over the speed limit. Triggers immediate roadside penalties plus court charges." },
    { question: "What happened at roadside is already done. What's the court charge about?", answer: "The 14-day suspension/impound are administrative penalties. You also face a court charge with potential: $2,000-$10,000 fine, 1-2 year licence suspension, 6 demerit points, up to 6 months jail (rare for first offence)." },
    { question: "Can stunt driving be reduced to regular speeding?", answer: "Often yes, through negotiation. Prosecutors may accept guilty plea to lesser charge (e.g., 49 over instead of 50 over, or reduced to 30 over). This avoids the worst penalties while still being a conviction." },
    { question: "What defences work for stunt driving?", answer: "Challenge radar/laser accuracy, calibration records, officer training, speed calculation method, road conditions. The 50 km/h threshold means even small measurement errors matter. If they can't prove 50+ over, it's not stunt driving." },
    { question: "Will I go to jail?", answer: "Unlikely for first offence with no aggravating factors. Jail is possible if: serious accident resulted, extreme speed (80+ over), prior record, or combined with impaired driving. Most first offences result in fine and suspension." },
    { question: "What about my insurance after stunt driving?", answer: "Devastating. Expect 100-300% increase or policy cancellation. High-risk insurance may be your only option for 3+ years. The insurance cost often exceeds the fine itself." }
  ];

  return (
    <>
      <SEO title="Stunt Driving Defence Paralegal Ontario | 50 Over Speed Limit" description="Licensed paralegal defending stunt driving charges in Ontario. 50+ over limit, racing charges. Up to $10,000 fine. Free consultation." canonical="https://www.legalassist.london/services/stunt-driving" />
      <ServicePageLayout seoTitle="Stunt Driving Defence | Ontario" seoDescription="Stunt driving defence in Ontario." canonical="https://www.legalassist.london/services/stunt-driving" problemHeadline="Stunt Driving Charges" problemDescription="Caught 50+ over the limit? You've already lost your licence for 14 days and your car is impounded. Now let's fight the court charge to protect your future." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Stunt driving" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Stunt Driving</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <Gauge className="w-6 h-6" />
                50+ Over = Automatic Stunt Driving
              </h3>
              <p className="text-red-900">Going 50 km/h or more over the speed limit is automatically classified as stunt driving—regardless of road conditions, time of day, or your driving record. The threshold is absolute.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Two Sets of Penalties</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="font-bold text-yellow-800 mb-3">Roadside (Already Happened):</h4>
                <ul className="text-yellow-900 text-sm space-y-2">
                  <li>• 14-day immediate licence suspension</li>
                  <li>• 14-day vehicle impound</li>
                  <li>• Towing and storage fees ($1,000+)</li>
                  <li>• Cannot be reversed or appealed</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-bold text-red-800 mb-3">Court (What We Fight):</h4>
                <ul className="text-red-900 text-sm space-y-2">
                  <li>• Fine: $2,000 - $10,000</li>
                  <li>• Suspension: 1-2 years (on top of 14 days)</li>
                  <li>• 6 demerit points</li>
                  <li>• Possible jail (up to 6 months)</li>
                  <li>• Criminal record if jail imposed</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What Triggers Stunt Driving</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Conduct</th>
                    <th className="px-6 py-4 text-left font-heading">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">50+ over limit</td><td className="px-6 py-4 text-sm">Most common—automatic stunt driving</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Racing</td><td className="px-6 py-4 text-sm">Competing with another vehicle</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Wheelies/burnouts</td><td className="px-6 py-4 text-sm">Losing traction intentionally</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Chasing another vehicle</td><td className="px-6 py-4 text-sm">Following too close to intimidate</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Blocking passing</td><td className="px-6 py-4 text-sm">Preventing others from passing</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Defence Strategies</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
              <h4 className="font-bold text-green-800 mb-2">How We Fight Stunt Driving:</h4>
              <ul className="text-green-900 text-sm space-y-2">
                <li>✓ Challenge radar/laser calibration and accuracy</li>
                <li>✓ Question officer's speed estimation method</li>
                <li>✓ Review disclosure for technical errors</li>
                <li>✓ Negotiate reduction to under 50 over (different charge)</li>
                <li>✓ Present mitigating factors at sentencing</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Stunt Driving FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Charged with Stunt Driving?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">The roadside penalties are done. Let's fight the court charge to protect your driving future.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Case Review</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.traffic} />
      </ServicePageLayout>
    </>
  );
}
