import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, Clock, DollarSign, HelpCircle, Gauge, TrendingUp } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function SpeedingTicketDefencePage() {
  const authorityItems = [
    { title: 'Insurance Impact Focus', description: 'The fine is the smallest cost of a speeding ticket. I focus on what matters: keeping demerit points off your record and protecting your insurance rates.' },
    { title: 'Speed Measurement Challenges', description: 'Radar and laser readings aren\'t infallible. I know how to challenge calibration, operator error, and procedural issues.' },
    { title: 'Honest Assessment', description: 'Not every speeding ticket is worth fighting. I\'ll tell you if your case has legs before you spend money on defence.' }
  ];

  const processSteps = [
    { step: '1', title: 'Ticket Analysis', description: 'Review the ticket, speed alleged, and circumstances to determine if fighting makes financial sense.' },
    { step: '2', title: 'Disclosure Review', description: 'Obtain officer notes, calibration records, and identify potential weaknesses.' },
    { step: '3', title: 'Court Representation', description: 'Negotiate for reduction or fight at trial—you don\'t need to attend.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'You Don\'t Attend Court', description: 'I handle everything—appearances, negotiations, and trial.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Cost-Benefit Analysis', description: 'I\'ll calculate if fighting is worth it based on insurance impact.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Realistic Expectations', description: 'Honest assessment of likely outcomes before you commit.' }
  ];

  const honestFAQs = [
    { question: "Is it worth fighting a speeding ticket?", answer: "Do the math: A 3-point speeding ticket can increase your insurance by $900-1,800 over 3 years. If fighting costs $300-500 with a realistic chance of reduction, the math usually favours fighting. But for zero-point tickets (under 16 km/h over), it's often not worth the effort." },
    { question: "What are the demerit points for speeding?", answer: "1-15 km/h over: 0 points. 16-29 km/h over: 3 points. 30-49 km/h over: 4 points. 50+ km/h over: 6 points (stunt driving). The points directly correlate with insurance impact." },
    { question: "Can the radar/laser reading be wrong?", answer: "Yes. Common issues include: improper calibration, operator error, targeting the wrong vehicle, interference from other objects. We request calibration records and officer training documentation to identify potential challenges." },
    { question: "What if I was definitely speeding?", answer: "What you did and what the Crown can prove are different things. The prosecution must prove the speed beyond reasonable doubt. Evidence gaps, calibration issues, or procedural errors can create reasonable doubt even when you know you were speeding." },
    { question: "What outcomes are realistic?", answer: "Speeding 16-29 km/h over: 60-70% reduced to 0-point offence, 15-20% withdrawn, 10-25% convicted as charged. Higher speeds are harder to reduce but still possible with clean record and evidence issues." },
    { question: "How long does it take?", answer: "Typically 3-8 months from filing to resolution. The court sets the timeline. Faster resolution is possible but may limit negotiation options." }
  ];

  return (
    <>
      <SEO title="Speeding Ticket Defence Paralegal | Fight Speeding Tickets | Ontario" description="Licensed paralegal defending speeding tickets in Ontario. Protect your insurance rates and driving record. Radar and laser challenges. Free consultation." canonical="https://www.legalassist.london/services/speeding-ticket-defence" />
      <ServicePageLayout seoTitle="Speeding Ticket Defence Paralegal | Ontario" seoDescription="Licensed paralegal defending speeding tickets in Ontario." canonical="https://www.legalassist.london/services/speeding-ticket-defence" problemHeadline="Speeding Ticket Defence in Ontario" problemDescription="The fine on your ticket isn't the real cost—it's the insurance increase that follows. Before you pay, understand what's actually at stake." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png?id=speeding-ticket-hero", alt: "Speeding ticket defence" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        {/* Demerit Points Table */}
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Speeding Penalties & Insurance Impact</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3">The Real Cost</h3>
              <p className="text-red-900 text-lg">A single speeding conviction can increase your insurance by <strong>15-30% for three years</strong>—that's <strong>$1,000-3,000+ more</strong> than the fine.</p>
            </div>

            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Speed Over Limit</th>
                    <th className="px-6 py-4 text-center font-heading">Points</th>
                    <th className="px-6 py-4 text-center font-heading">Insurance Impact</th>
                    <th className="px-6 py-4 text-left font-heading">Worth Fighting?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-background/50">
                    <td className="px-6 py-4 font-medium">1-15 km/h over</td>
                    <td className="px-6 py-4 text-center"><span className="text-green-600 font-bold">0</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-green-600">Minimal</span></td>
                    <td className="px-6 py-4 text-sm">Usually not worth the cost</td>
                  </tr>
                  <tr className="hover:bg-background/50">
                    <td className="px-6 py-4 font-medium">16-29 km/h over</td>
                    <td className="px-6 py-4 text-center"><span className="text-yellow-600 font-bold">3</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-yellow-600">15-25%</span></td>
                    <td className="px-6 py-4 text-sm">Yes—cost of fighting &lt; insurance increase</td>
                  </tr>
                  <tr className="hover:bg-background/50">
                    <td className="px-6 py-4 font-medium">30-49 km/h over</td>
                    <td className="px-6 py-4 text-center"><span className="text-orange-600 font-bold">4</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-orange-600">25-40%</span></td>
                    <td className="px-6 py-4 text-sm">Definitely—significant impact</td>
                  </tr>
                  <tr className="hover:bg-background/50">
                    <td className="px-6 py-4 font-medium">50+ km/h over</td>
                    <td className="px-6 py-4 text-center"><span className="text-red-600 font-bold">6</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-red-600">50%+ or denial</span></td>
                    <td className="px-6 py-4 text-sm">Must fight—severe consequences</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Decision Framework */}
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Should You Fight?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h4 className="font-heading text-lg font-bold text-green-800">Fight When:</h4>
                </div>
                <ul className="space-y-2 text-green-900 text-sm">
                  <li>• 16+ km/h over (demerit points)</li>
                  <li>• You have high insurance rates</li>
                  <li>• You drive professionally</li>
                  <li>• Calibration/procedure issues possible</li>
                  <li>• Speed was close to threshold</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  <h4 className="font-heading text-lg font-bold text-yellow-800">Negotiate When:</h4>
                </div>
                <ul className="space-y-2 text-yellow-900 text-sm">
                  <li>• Clean record gives leverage</li>
                  <li>• Want certainty vs trial risk</li>
                  <li>• Need quick resolution</li>
                  <li>• Crown may reduce to 0-point</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-6 h-6 text-gray-600" />
                  <h4 className="font-heading text-lg font-bold text-gray-800">May Not Be Worth It:</h4>
                </div>
                <ul className="space-y-2 text-gray-900 text-sm">
                  <li>• Zero-point speeding (under 16 km/h)</li>
                  <li>• Clean record, low insurance</li>
                  <li>• Ticket way out of town</li>
                  <li>• Don't drive regularly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
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

        {/* CTA */}
        <div className="w-full py-16 md:py-24 bg-primary/5">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Got a Speeding Ticket?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">Send me your ticket and I'll tell you if fighting is worth it—based on the math, not guesswork.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>

        <RelatedServices services={relatedServicesConfig.trafficTickets} />
      </ServicePageLayout>
    </>
  );
}
