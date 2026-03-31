import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, DollarSign, HelpCircle, Gauge, Car } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HOVLaneViolationsPage() {
  const authorityItems = [
    { title: 'HOV Lane Defence', description: 'HOV violations carry significant fines but no demerit points. Fighting often comes down to whether the exception rules were met.' },
    { title: 'Exception Knowledge', description: 'Many people don\'t know all the exceptions—green plates, motorcycles, buses, certain times. I ensure valid exceptions are properly presented.' },
    { title: 'Cost-Benefit Focus', description: 'No demerit points means the decision is purely financial. I\'ll tell you if fighting makes sense.' }
  ];

  const processSteps = [
    { step: '1', title: 'Violation Review', description: 'Verify if any exceptions applied—vehicle type, passengers, permits.' },
    { step: '2', title: 'Defence Assessment', description: 'Determine if fighting makes financial sense given no insurance impact.' },
    { step: '3', title: 'Court Representation', description: 'If proceeding, handle all appearances.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'No Demerit Points', description: 'This is a fine-only offence—no insurance impact.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Exception Review', description: 'Many people qualify for exceptions without knowing.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Honest Assessment', description: 'I\'ll tell you if the math favours fighting.' }
  ];

  const honestFAQs = [
    { question: "What are the penalties?", answer: "First offence: $110 set fine plus surcharges (~$180). Subsequent offences: up to $500. NO demerit points—this is crucial. No insurance impact unless combined with other charges." },
    { question: "Is it worth fighting an HOV ticket?", answer: "Depends on the math. No insurance impact means the only savings is the fine itself. If fighting costs $250-350 and the fine is $180, it's only worth it if you have a strong defence. If you have an exception, definitely fight." },
    { question: "What are the HOV exceptions?", answer: "Two or more occupants (including children in car seats), green licence plates (EVs), motorcycles, public transit vehicles, and certain permit holders. Some HOV lanes have different rules (2+ vs 3+ occupants)." },
    { question: "What if I had a passenger but officer didn't see them?", answer: "If you had the required occupants, this is a complete defence. Challenge is proving it after the fact—passenger testimony, photos, other documentation. Small children in rear-facing seats are often missed by officers." },
    { question: "What about green plates/EVs?", answer: "Green licence plates are exempt from HOV requirements. If you have one and were charged, this is a clear defence with documentation." },
    { question: "When do HOV rules apply?", answer: "Typically rush hours only—often 7-10am and 3-7pm weekdays. If you were charged outside these hours, that's a defence. Check the specific signage for that HOV lane." }
  ];

  return (
    <>
      <SEO title="HOV Lane Violation Defence Paralegal | Ontario" description="Licensed paralegal defending HOV lane violations in Ontario. No demerit points, exception defences. Green plate, passenger issues. Free consultation." canonical="https://www.legalassist.london/services/hov-lane-violations" />
      <ServicePageLayout seoTitle="HOV Lane Violation Defence | Ontario" seoDescription="Defending HOV lane violations in Ontario." canonical="https://www.legalassist.london/services/hov-lane-violations" problemHeadline="HOV Lane Violation Defence in Ontario" problemDescription="HOV lane tickets are frustrating but carry no demerit points. The question is whether you qualify for an exception or if fighting makes financial sense." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "HOV lane violation defence" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">HOV Violations: The Good News</h2>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-green-800 mb-3">No Demerit Points = No Insurance Impact</h3>
              <p className="text-green-900">HOV violations are fine-only offences. Your insurance rates won't increase. The decision to fight is purely financial—does the cost of fighting exceed the fine?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 text-center">
                <DollarSign className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-yellow-700 mb-2">~$180</div>
                <p className="text-yellow-800 font-medium">First Offence Fine</p>
              </div>
              <div className="bg-green-50 rounded-lg p-6 border border-green-200 text-center">
                <Gauge className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-green-700 mb-2">0</div>
                <p className="text-green-800 font-medium">Demerit Points</p>
              </div>
              <div className="bg-green-50 rounded-lg p-6 border border-green-200 text-center">
                <Car className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-green-700 mb-2">None</div>
                <p className="text-green-800 font-medium">Insurance Impact</p>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">HOV Exceptions (Complete Defences)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-primary/5 rounded-lg p-6">
                <h4 className="font-bold text-foreground mb-3">You Can Use HOV If:</h4>
                <ul className="text-foreground/80 text-sm space-y-2">
                  <li>✓ Two or more occupants (varies by lane)</li>
                  <li>✓ Children count—even infants in car seats</li>
                  <li>✓ Green licence plate (electric vehicle)</li>
                  <li>✓ Motorcycle</li>
                  <li>✓ Public transit vehicle</li>
                  <li>✓ Emergency vehicle</li>
                  <li>✓ Outside posted HOV hours</li>
                </ul>
              </div>
              <div className="bg-yellow-50 rounded-lg p-6">
                <h4 className="font-bold text-yellow-800 mb-3">Common Issues:</h4>
                <ul className="text-yellow-900 text-sm space-y-2">
                  <li>• Officer didn't see rear-facing car seat</li>
                  <li>• Passenger was reclined/sleeping</li>
                  <li>• Green plate not noticed</li>
                  <li>• Charged outside HOV hours</li>
                  <li>• Wrong occupancy requirement assumed</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Should You Fight?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Definitely Fight If:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• You had required passengers</li>
                  <li>• You have green plates</li>
                  <li>• Outside HOV hours</li>
                  <li>• Any exception applies</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">Consider If:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• Fine exceeds fighting cost</li>
                  <li>• You want to contest on principle</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-gray-600 mb-2" />
                <h4 className="font-bold text-gray-800 mb-2">Probably Just Pay If:</h4>
                <ul className="text-gray-900 text-sm space-y-1">
                  <li>• No exception applied</li>
                  <li>• Fighting costs more than fine</li>
                  <li>• Just want it done</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Honest Answers</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">HOV Lane Ticket?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let's figure out if an exception applies or if fighting makes financial sense.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.trafficTickets} />
      </ServicePageLayout>
    </>
  );
}
