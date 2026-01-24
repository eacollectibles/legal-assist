import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Ban, Eye, Camera, Shield } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function DisobeySignPage() {
  const authorityItems = [
    { title: 'Disobey Sign Tickets', description: 'Stop sign, yield sign, no entry, one way—disobeying traffic signs carries 2-3 demerit points. Often defensible.' },
    { title: 'Sign Visibility Key', description: 'If you couldn\'t see the sign (obscured, missing, faded), you can\'t be convicted of disobeying it.' },
    { title: 'Stop Sign Most Common', description: 'Rolling stops are the most common charge. What counts as a "stop" can be disputed.' }
  ];

  const processSteps = [
    { step: '1', title: 'Identify Sign', description: 'Which sign were you allegedly disobeying?' },
    { step: '2', title: 'Check Location', description: 'Visit intersection, photograph sign condition.' },
    { step: '3', title: 'Challenge or Negotiate', description: 'Technical defence or early resolution.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Visibility Defence', description: 'Sign must be clearly visible.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'What\'s a Stop?', description: 'Full stop definition debatable.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: '2-3 Points', description: 'Affects insurance for 3 years.' }
  ];

  const honestFAQs = [
    { question: "How many points for disobeying a traffic sign?", answer: "Stop sign: 3 points. Yield sign: 2 points. Other signs (no entry, one way, no left turn): 2 points. Stop signs carry more because they're considered more dangerous to disobey." },
    { question: "I stopped, but the officer says I didn't. What's my defence?", answer: "Challenge what constitutes a 'stop.' Your wheels must come to a complete stop, but for how long? Officer's observation angle matters—could they actually see your wheels? Dash cam footage if available is powerful." },
    { question: "The stop sign was hidden by tree branches. Is that a defence?", answer: "Yes. If the sign was obscured by vegetation, another sign, a parked vehicle, or anything else, you can't be convicted of disobeying a sign you couldn't reasonably see. Photograph the obstruction." },
    { question: "I went through a stop sign to avoid hitting someone behind me. Defence?", answer: "Possible necessity defence—you broke the law to avoid a greater harm. You'd need to show: real and imminent danger, no reasonable alternative, and your action was proportionate. It's a high bar but possible." },
    { question: "What about faded or damaged signs?", answer: "If the sign was so faded or damaged that you couldn't identify it, that's a defence. Photograph the sign's current condition. However, if it was still recognizable, this defence weakens." },
    { question: "Is it worth fighting a stop sign ticket?", answer: "At 3 points, often yes. Insurance impact over 3 years can be $300-600+. If you have other points, accumulation matters. Early resolution may reduce to 2 or 0 points." }
  ];

  return (
    <>
      <SEO title="Disobey Sign Ticket Defence Paralegal Ontario | Stop Sign Ticket" description="Licensed paralegal for disobey sign tickets in Ontario. Stop sign, yield sign, traffic sign violations. 2-3 demerit points. Free consultation." canonical="https://www.legalassist.london/services/disobey-sign" />
      <ServicePageLayout seoTitle="Disobey Sign Tickets | Ontario" seoDescription="Disobey sign ticket defence in Ontario." canonical="https://www.legalassist.london/services/disobey-sign" problemHeadline="Disobey Sign Tickets" problemDescription="Stop sign ticket? Yield sign? No entry? Traffic sign violations are often defensible—sign visibility and what counts as a 'stop' can be challenged." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Disobey sign" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Traffic Sign Violations</h2>
            
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Sign Type</th>
                    <th className="px-6 py-4 text-center font-heading">Points</th>
                    <th className="px-6 py-4 text-left font-heading">Fine Range</th>
                    <th className="px-6 py-4 text-left font-heading">Common Defence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Stop sign</td><td className="px-6 py-4 text-center font-bold">3</td><td className="px-6 py-4">$85-$110</td><td className="px-6 py-4 text-sm">Did stop, sign obscured</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Yield sign</td><td className="px-6 py-4 text-center">2</td><td className="px-6 py-4">$85-$110</td><td className="px-6 py-4 text-sm">Did yield, no traffic</td></tr>
                  <tr><td className="px-6 py-4 font-medium">No entry/one way</td><td className="px-6 py-4 text-center">2</td><td className="px-6 py-4">$85-$110</td><td className="px-6 py-4 text-sm">Sign not visible</td></tr>
                  <tr><td className="px-6 py-4 font-medium">No left/right turn</td><td className="px-6 py-4 text-center">2</td><td className="px-6 py-4">$85-$110</td><td className="px-6 py-4 text-sm">Sign obscured, construction</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Stop Sign Defence Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">You DID Stop:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Officer's observation angle limited</li>
                  <li>• Distance made judgment difficult</li>
                  <li>• Brief stop still counts</li>
                  <li>• Dash cam shows full stop</li>
                  <li>• Witness confirms stop</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">Sign Visibility Issues:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• Obscured by trees/vegetation</li>
                  <li>• Blocked by parked vehicle</li>
                  <li>• Faded beyond recognition</li>
                  <li>• Missing entirely</li>
                  <li>• Knocked down/damaged</li>
                </ul>
              </div>
            </div>

            <div className="bg-primary/5 rounded-lg p-6 mb-8">
              <Eye className="w-8 h-8 text-primary mb-3" />
              <h4 className="font-bold text-foreground mb-2">What Counts as a "Stop"?</h4>
              <p className="text-foreground/80 text-sm mb-3">The law requires your vehicle to come to a complete stop—wheels not moving. But:</p>
              <ul className="text-foreground/80 text-sm space-y-1">
                <li>• No minimum duration specified</li>
                <li>• A brief complete stop counts</li>
                <li>• Rolling slowly is NOT a stop</li>
                <li>• Officer must have clear view of wheels</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Visit and Photograph</h4>
              <p className="text-yellow-900 text-sm">Before your court date, visit the intersection. Photograph the sign from your approach angle, any obstructions, the officer's likely observation point. This evidence can make or break your defence.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Disobey Sign FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Got a Stop Sign Ticket?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">3 points is significant. Let me assess whether fighting makes sense.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.traffic} />
      </ServicePageLayout>
    </>
  );
}
