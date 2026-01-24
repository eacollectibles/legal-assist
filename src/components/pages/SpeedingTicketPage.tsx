import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Gauge, DollarSign, Shield, Car } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function SpeedingTicketPage() {
  const authorityItems = [
    { title: 'Speeding Defence', description: 'I defend all speeding tickets from minor infractions to 49km/h over. 50+ over is "stunt driving" with different rules.' },
    { title: 'Points + Insurance', description: 'Speeding tickets carry 0-6 demerit points. Insurance impact often costs more than the fine over 3 years.' },
    { title: 'Defence Strategies', description: 'Challenge radar calibration, officer identification, speed zone signage, and more. Many tickets can be reduced or dismissed.' }
  ];

  const processSteps = [
    { step: '1', title: 'Assess the Ticket', description: 'How fast? How many points? What device?' },
    { step: '2', title: 'Request Disclosure', description: 'Get officer notes and device records.' },
    { step: '3', title: 'Fight or Negotiate', description: 'Trial defence or early resolution reduction.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Technical Defences', description: 'Calibration, operation, identification.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Reduction Possible', description: 'Early resolution often reduces charge.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: '50+ Different', description: 'Stunt driving has separate rules.' }
  ];

  const honestFAQs = [
    { question: "How do speeding ticket points work?", answer: "1-15 km/h over: 0 points. 16-29 over: 3 points. 30-49 over: 4 points. 50+ over: 6 points plus stunt driving charge. Points affect licence (accumulation can suspend) and convictions affect insurance for 3 years." },
    { question: "What's the insurance impact of a speeding ticket?", answer: "Minor (0-3 points): 0-15% increase. Moderate (4 points): 15-30% increase. Major (30-49 over): 25-50% increase. Stunt (50+ over): 50-300% increase or cancellation. Over 3 years, this often exceeds the fine itself." },
    { question: "What are valid defences to speeding tickets?", answer: "Radar/laser not properly calibrated, officer error in operation, wrong vehicle identified, speed limit signs not visible, speedometer malfunction (limited), necessity/emergency. We can also challenge if officer didn't lock the reading or notes are inconsistent." },
    { question: "Should I fight a minor speeding ticket?", answer: "Depends on your record and the points. First minor ticket on clean record: paying may be fine. But if you have points already, or it's 3+ points, fighting often saves money on insurance. Even going to early resolution may reduce points." },
    { question: "What happens at early resolution for speeding?", answer: "Meet with prosecutor who may offer to reduce the speed (and thus the points). 4-point ticket might become 3 points. You plead guilty to the reduced charge. Faster than trial but still a conviction—just less severe." },
    { question: "What if I was actually going that fast?", answer: "There are still options. Technical defences don't require you to claim you weren't speeding—they challenge whether Crown can prove it. Alternatively, early resolution can reduce the charge. Your goal is minimizing points and insurance impact." }
  ];

  return (
    <>
      <SEO title="Speeding Ticket Defence Paralegal Ontario | Fight Speeding Fine" description="Licensed paralegal for speeding ticket defence in Ontario. 3-point, 4-point, minor and major speeding. Reduce points and insurance impact. Free consultation." canonical="https://www.legalassist.london/services/speeding-ticket" />
      <ServicePageLayout seoTitle="Speeding Ticket Defence | Ontario" seoDescription="Speeding ticket defence in Ontario." canonical="https://www.legalassist.london/services/speeding-ticket" problemHeadline="Speeding Tickets" problemDescription="Got a speeding ticket? The fine is just the start—insurance increases over 3 years often cost more. I help fight tickets or reduce points." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Speeding ticket" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Speeding Ticket Penalties</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Points and Fines by Speed</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Speed Over Limit</th>
                    <th className="px-6 py-4 text-center font-heading">Points</th>
                    <th className="px-6 py-4 text-left font-heading">Set Fine Range</th>
                    <th className="px-6 py-4 text-left font-heading">Insurance Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">1-15 km/h</td><td className="px-6 py-4 text-center">0</td><td className="px-6 py-4 text-sm">$2.50/km ($40-50)</td><td className="px-6 py-4 text-sm text-green-700">Minimal</td></tr>
                  <tr><td className="px-6 py-4 font-medium">16-29 km/h</td><td className="px-6 py-4 text-center font-bold">3</td><td className="px-6 py-4 text-sm">$3.75/km ($60-110)</td><td className="px-6 py-4 text-sm">5-15% increase</td></tr>
                  <tr className="bg-yellow-50"><td className="px-6 py-4 font-medium">30-49 km/h</td><td className="px-6 py-4 text-center font-bold">4</td><td className="px-6 py-4 text-sm">$7.00/km ($210-340)</td><td className="px-6 py-4 text-sm text-yellow-700">15-30% increase</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">50+ km/h</td><td className="px-6 py-4 text-center font-bold text-red-600">6*</td><td className="px-6 py-4 text-sm">$2,000-$10,000</td><td className="px-6 py-4 text-sm text-red-700">50-300%+ / Cancellation</td></tr>
                </tbody>
              </table>
              <p className="text-foreground/70 text-sm mt-2">*50+ km/h over is also "stunt driving" with immediate 14-day suspension/impound</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">The Real Cost Example</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <DollarSign className="w-8 h-8 text-primary mb-3" />
              <p className="text-foreground/80 mb-4">Example: 25 km/h over (3 points)</p>
              <ul className="text-foreground/80 space-y-2">
                <li>• Set fine: ~$95</li>
                <li>• Insurance increase (10% on $2,000/year × 3 years): $600</li>
                <li>• <span className="font-bold">True cost: ~$695</span></li>
              </ul>
              <p className="text-foreground/70 text-sm mt-4">Fighting the ticket (even with paralegal fees) often costs less than paying it.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Defence Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Technical Defences:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Radar/laser calibration records</li>
                  <li>• Operator training certification</li>
                  <li>• Device operation errors</li>
                  <li>• Target identification issues</li>
                  <li>• Speed zone signage problems</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">Reduction Options:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• Early resolution meeting</li>
                  <li>• Negotiate lower speed reading</li>
                  <li>• Reduce 4-point to 3-point</li>
                  <li>• Sometimes 0-point available</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Decision Framework</h4>
              <p className="text-yellow-900 text-sm">0 points on clean record? Probably pay. 3+ points, or you already have points? Definitely fight or negotiate. 4+ points? Always fight—the insurance impact is substantial. 50+ over? Get help immediately—serious consequences.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Speeding Ticket FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Got a Speeding Ticket?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Send me your ticket. I'll tell you if fighting makes financial sense.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.traffic} />
      </ServicePageLayout>
    </>
  );
}
