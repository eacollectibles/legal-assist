import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, Clock, DollarSign, HelpCircle, Gauge, Camera, AlertCircle } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function RedLightDefencePage() {
  const authorityItems = [
    { title: 'Red Light Expertise', description: 'I understand the difference between camera tickets (no points) and officer-issued tickets (3 points)—and how to handle each.' },
    { title: 'Intersection Evidence', description: 'Red light cases depend on timing, visibility, and circumstances. I challenge the evidence and the officer\'s vantage point.' },
    { title: 'Insurance Focus', description: 'Officer-issued red light tickets carry demerit points and insurance increases. Every strategy aims to minimize or eliminate the impact.' }
  ];

  const processSteps = [
    { step: '1', title: 'Ticket Analysis', description: 'Determine if it\'s a camera ticket or officer-issued ticket—this changes the strategy entirely.' },
    { step: '2', title: 'Defence Development', description: 'For officer tickets, challenge timing, visibility, and vantage point. For camera tickets, assess if fighting is worthwhile.' },
    { step: '3', title: 'Court Representation', description: 'I handle all appearances and negotiations on your behalf.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Know the Difference', description: 'Camera tickets have no points; officer tickets carry 3 points. This determines whether fighting is worth it.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Full Representation', description: 'You don\'t need to attend court—I handle everything.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Honest Assessment', description: 'I\'ll tell you if your case is worth fighting before you commit.' }
  ];

  const honestFAQs = [
    { question: "What's the difference between camera and officer red light tickets?", answer: "Camera tickets (red light cameras): No demerit points, registered to vehicle owner not driver, $325 set fine, minimal insurance impact. Officer-issued tickets: 3 demerit points, registered to driver, $325+ fine, 15-25% insurance increase. Always check which type you have—it changes everything." },
    { question: "Should I fight a red light camera ticket?", answer: "Usually not worth it. No demerit points means minimal insurance impact. Fighting costs more than paying. Only fight if: you weren't driving, the photo doesn't clearly show your plate, or you have a legitimate defence (funeral procession, emergency, etc.)." },
    { question: "Should I fight an officer-issued red light ticket?", answer: "Usually yes. 3 demerit points = 15-25% insurance increase for 3 years. That's $900-1,800+ more than the fine. Fighting typically costs $300-500—the math favours fighting." },
    { question: "What defences work for red light tickets?", answer: "For officer tickets: challenging officer's vantage point, amber light timing, emergency circumstances, improper intersection design. Success rates: 50-60% reduced to lesser offence, 10-15% withdrawn, 25-40% convicted." },
    { question: "What if the light was yellow/amber?", answer: "You're legally permitted to proceed through a yellow light if stopping isn't safe. The question is whether you entered the intersection before it turned red. Officer's vantage point and reaction time are challengeable." },
    { question: "What if I was avoiding a collision?", answer: "Emergency necessity can be a defence—if running the red light was safer than stopping (rear-end collision risk, etc.). This requires evidence of the emergency circumstances." }
  ];

  return (
    <>
      <SEO title="Red Light Ticket Defence Paralegal | Fight Red Light Tickets | Ontario" description="Licensed paralegal defending red light tickets in Ontario. Camera tickets vs officer tickets. Protect your insurance rates. Free consultation." canonical="https://www.legalassist.london/services/red-light-defence" />
      <ServicePageLayout seoTitle="Red Light Ticket Defence Paralegal | Ontario" seoDescription="Licensed paralegal defending red light tickets in Ontario." canonical="https://www.legalassist.london/services/red-light-defence" problemHeadline="Red Light Ticket Defence in Ontario" problemDescription="Not all red light tickets are the same. Camera tickets have no demerit points—officer-issued tickets carry 3. Before you decide what to do, know what you're dealing with." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png?id=red-light-hero", alt: "Red light ticket defence" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        {/* Key Distinction */}
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Camera vs Officer: Know the Difference</h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                Critical Distinction
              </h3>
              <p className="text-blue-900 text-lg">Check your ticket carefully. Camera tickets and officer-issued tickets have completely different consequences and strategies.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Camera Ticket */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Camera className="w-8 h-8 text-green-600" />
                  <h3 className="font-heading text-xl font-bold text-green-800">Camera Ticket</h3>
                </div>
                <div className="space-y-3 text-green-900">
                  <div className="flex justify-between border-b border-green-200 pb-2">
                    <span>Demerit Points:</span>
                    <span className="font-bold text-green-600">0 points</span>
                  </div>
                  <div className="flex justify-between border-b border-green-200 pb-2">
                    <span>Fine:</span>
                    <span className="font-bold">$325 (set)</span>
                  </div>
                  <div className="flex justify-between border-b border-green-200 pb-2">
                    <span>Insurance Impact:</span>
                    <span className="font-bold text-green-600">Minimal</span>
                  </div>
                  <div className="flex justify-between border-b border-green-200 pb-2">
                    <span>Goes Against:</span>
                    <span className="font-bold">Vehicle owner</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span>Worth Fighting?</span>
                    <span className="font-bold text-green-600">Usually NO</span>
                  </div>
                </div>
              </div>

              {/* Officer Ticket */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Gauge className="w-8 h-8 text-red-600" />
                  <h3 className="font-heading text-xl font-bold text-red-800">Officer-Issued Ticket</h3>
                </div>
                <div className="space-y-3 text-red-900">
                  <div className="flex justify-between border-b border-red-200 pb-2">
                    <span>Demerit Points:</span>
                    <span className="font-bold text-red-600">3 points</span>
                  </div>
                  <div className="flex justify-between border-b border-red-200 pb-2">
                    <span>Fine:</span>
                    <span className="font-bold">$325+</span>
                  </div>
                  <div className="flex justify-between border-b border-red-200 pb-2">
                    <span>Insurance Impact:</span>
                    <span className="font-bold text-red-600">15-25% increase</span>
                  </div>
                  <div className="flex justify-between border-b border-red-200 pb-2">
                    <span>Goes Against:</span>
                    <span className="font-bold">Driver</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span>Worth Fighting?</span>
                    <span className="font-bold text-red-600">Usually YES</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decision Framework */}
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Decision Framework</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h4 className="font-heading text-lg font-bold text-green-800">Fight When (Officer Ticket):</h4>
                </div>
                <ul className="space-y-2 text-green-900 text-sm">
                  <li>• Light was yellow when you entered</li>
                  <li>• Officer's view was obstructed</li>
                  <li>• Emergency circumstances existed</li>
                  <li>• Intersection design issues</li>
                  <li>• Insurance rates are high</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  <h4 className="font-heading text-lg font-bold text-yellow-800">Fight Camera Ticket Only If:</h4>
                </div>
                <ul className="space-y-2 text-yellow-900 text-sm">
                  <li>• You weren't driving</li>
                  <li>• Photo doesn't show your plate</li>
                  <li>• Legitimate emergency excuse</li>
                  <li>• Vehicle was stolen</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-6 h-6 text-gray-600" />
                  <h4 className="font-heading text-lg font-bold text-gray-800">Just Pay When:</h4>
                </div>
                <ul className="space-y-2 text-gray-900 text-sm">
                  <li>• Camera ticket with clear photo</li>
                  <li>• No demerit points at stake</li>
                  <li>• Fighting costs exceed benefit</li>
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

        {/* CTA */}
        <div className="w-full py-16 md:py-24 bg-primary/5">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Got a Red Light Ticket?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">Send me your ticket and I'll tell you if it's worth fighting—and what strategy makes sense.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>

        <RelatedServices services={relatedServicesConfig.trafficTickets} />
      </ServicePageLayout>
    </>
  );
}
