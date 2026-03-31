import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, ArrowRight, Car, Shield, Scale } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ImproperTurnPage() {
  const authorityItems = [
    { title: 'Improper Turn Defence', description: 'Improper left turn, improper right turn, and U-turn violations carry 2 demerit points. Often defensible.' },
    { title: 'Circumstances Matter', description: 'Many improper turn tickets are issued based on officer judgment. Road conditions, signage, and safety can all be factors.' },
    { title: 'Insurance Impact', description: '2 points may seem minor, but any conviction affects insurance. Fighting can prevent increases.' }
  ];

  const processSteps = [
    { step: '1', title: 'Review Ticket', description: 'What specific turn violation is alleged?' },
    { step: '2', title: 'Check Location', description: 'Visit intersection, check signage, get photos.' },
    { step: '3', title: 'Fight or Negotiate', description: 'Trial defence or early resolution for reduction.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Often Defensible', description: 'Signage and circumstances matter.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Only 2 Points', description: 'But still affects insurance.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Check Signage', description: 'Missing/unclear signs = defence.' }
  ];

  const honestFAQs = [
    { question: "What counts as an improper turn?", answer: "Common violations: left turn from wrong lane, right turn from wrong lane, U-turn where prohibited, failing to yield while turning, cutting corners on left turns, wide right turns into wrong lane. Each has specific HTA sections." },
    { question: "How many points is an improper turn?", answer: "2 demerit points for most improper turn violations. While lower than speeding, it still affects insurance and accumulates toward suspension thresholds." },
    { question: "I didn't see a 'No U-Turn' sign. Is that a defence?", answer: "Potentially. If the sign was missing, obscured, or unclear, that's a defence. Visit the location and photograph it. If signage was inadequate, you shouldn't be convicted for violating a prohibition you couldn't know about." },
    { question: "Officer says I cut the corner on a left turn. How do I fight that?", answer: "Challenge the observation. Officer's viewing angle, distance, traffic conditions, and whether it actually endangered anyone matter. 'Cutting the corner' is somewhat subjective—argue your turn was within reason." },
    { question: "I turned from a turning lane but got a ticket anyway. Why?", answer: "Possible reasons: you were in the wrong turning lane for your intended direction, you changed lanes mid-intersection, or the officer misidentified your vehicle. Get disclosure and review the specifics." },
    { question: "Is it worth fighting a 2-point ticket?", answer: "Often yes. Even 2 points can increase insurance 5-10%. If you have existing points, accumulation matters. And early resolution may reduce to 0 points, saving insurance impact entirely." }
  ];

  return (
    <>
      <SEO title="Improper Turn Ticket Defence Paralegal Ontario | Turn Violation Help" description="Licensed paralegal for improper turn tickets in Ontario. Left turn, right turn, U-turn violations. 2 demerit points. Fight or reduce charge. Free consultation." canonical="https://www.legalassist.london/services/improper-turn" />
      <ServicePageLayout seoTitle="Improper Turn Tickets | Ontario" seoDescription="Improper turn ticket defence in Ontario." canonical="https://www.legalassist.london/services/improper-turn" problemHeadline="Improper Turn Tickets" problemDescription="Improper left turn? Illegal U-turn? Right turn from wrong lane? These 2-point tickets are often defensible. I help fight turn violations." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Improper turn" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Turn Violation Types</h2>
            
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Violation</th>
                    <th className="px-6 py-4 text-center font-heading">Points</th>
                    <th className="px-6 py-4 text-left font-heading">Fine Range</th>
                    <th className="px-6 py-4 text-left font-heading">Common Defences</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Improper left turn</td><td className="px-6 py-4 text-center">2</td><td className="px-6 py-4">$85-$110</td><td className="px-6 py-4 text-sm">Lane markings unclear, traffic conditions</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Improper right turn</td><td className="px-6 py-4 text-center">2</td><td className="px-6 py-4">$85-$110</td><td className="px-6 py-4 text-sm">Avoiding obstacle, unclear signage</td></tr>
                  <tr><td className="px-6 py-4 font-medium">U-turn prohibited</td><td className="px-6 py-4 text-center">2</td><td className="px-6 py-4">$85-$110</td><td className="px-6 py-4 text-sm">Sign missing/obscured</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Fail to yield (turn)</td><td className="px-6 py-4 text-center">2</td><td className="px-6 py-4">$85-$110</td><td className="px-6 py-4 text-sm">Safe to proceed, other vehicle yielded</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Defence Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Technical Defences:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Sign missing or obscured</li>
                  <li>• Lane markings faded/unclear</li>
                  <li>• Construction changed normal patterns</li>
                  <li>• Officer observation angle limited</li>
                  <li>• Wrong vehicle identified</li>
                </ul>
              </div>
              <div className="bg-primary/5 border border-border rounded-lg p-6">
                <Shield className="w-6 h-6 text-primary mb-2" />
                <h4 className="font-bold text-foreground mb-2">Circumstance Defences:</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Avoiding hazard/obstacle</li>
                  <li>• Emergency vehicle approaching</li>
                  <li>• Safe to proceed despite technicality</li>
                  <li>• Other vehicle's actions forced maneuver</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Visit the Location</h4>
              <p className="text-yellow-900 text-sm">Before your court date, visit the intersection where you were ticketed. Take photos of signage (or lack thereof), lane markings, and visibility. This evidence can be crucial to your defence.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Improper Turn FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Got a Turn Violation Ticket?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Even 2 points matter for insurance. Let me assess your options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.traffic} />
      </ServicePageLayout>
    </>
  );
}
