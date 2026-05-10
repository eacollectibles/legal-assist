import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, AlertTriangle, HelpCircle, Eye, DollarSign, Gauge } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function DisobeySignPage() {
  const authorityItems = [
    { title: 'Disobey Sign — HTA s.182(2)', description: 'The catch-all section for failing to obey designated regulatory signs: no-entry, no-turn, one-way, lane designation, keep-right, no-passing zone, and more. 2 demerit points.' },
    { title: 'Sign Visibility Defence', description: 'The Crown must prove the sign was present, properly placed, and reasonably visible. Photos, Street View, and witness evidence can establish visibility issues.' },
    { title: 'Negotiation Leverage', description: 'A reduction to a no-point offence (e.g., a non-moving violation) is a common target. Outcomes depend on disclosure, your record, and the assigned Crown.' }
  ];

  const processSteps = [
    { step: '1', title: 'Identify the Subsection', description: 'Officers sometimes write \"disobey sign\" loosely. Confirm exactly which sign and which HTA section is alleged.' },
    { step: '2', title: 'Inspect & Document', description: 'Visit the location. Photograph the sign from your approach angle, any obstructions, and the officer\'s likely vantage point.' },
    { step: '3', title: 'Negotiate or Trial', description: 'Pursue a reduction to a no-point offence, or set the matter down for trial.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'You Don\'t Attend Court', description: 'I handle the appearances on your behalf where the Court permits.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Visibility Is a Real Defence', description: 'Sign must be reasonably visible. If it wasn\'t, the charge is challengeable.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: '2 Points Still Counts', description: 'Stays on your driving abstract for 3 years. Insurers do see it.' }
  ];

  const honestFAQs = [
    { question: "What does HTA s.182(2) actually cover?", answer: "It is the catch-all for failing to obey signs designated by regulation under the Highway Traffic Act. Common examples: no-left-turn, no-right-turn, no-U-turn, one-way, do-not-enter, lane designation (HOV, transit, bus), keep-right, no-passing zone, and other regulatory signs. Stop signs (HTA s.136) and yield signs (HTA s.139) are charged under different sections — see our dedicated stop-sign page." },
    { question: "What are the penalties?", answer: "Set fine of $85, total payable approximately $110 with surcharges and court costs, plus 2 demerit points. The conviction stays on your driving abstract for 3 years from the date of conviction." },
    { question: "What if the sign was missing or obscured?", answer: "A defence. The Crown must prove the sign was present, properly placed, and reasonably visible at the time of the offence. Photos of vegetation blocking the sign, a parked vehicle covering it, faded paint, or a sign knocked down by weather or a collision can all establish reasonable doubt." },
    { question: "What if the sign didn’t comply with regulations?", answer: "Signs must conform to the Ontario Traffic Manual and applicable regulations. Non-conforming signs (wrong size, wrong colour, wrong placement) can be challenged, though courts give some latitude where the message is still clearly conveyed." },
    { question: "Was I actually in the restricted zone?", answer: "Many s.182(2) charges turn on geometry — were you actually in the HOV lane, on the one-way street, in the no-turn lane? Lane markings and the position of the sign relative to your path matter. We pull aerial imagery and road records when needed." },
    { question: "Can it be reduced?", answer: "Sometimes. Outcomes for a contested disobey-sign charge include: reduction to a non-moving violation that carries no demerit points, withdrawal where the disclosure is weak or the officer is unavailable, acquittal at trial, or conviction-as-charged. Outcome depends on disclosure, your record, and the assigned Crown." }
  ];

  return (
    <>
      <SEO title="Disobey Sign Ticket Defence | HTA s.182(2) | Ontario" description="Licensed paralegal defending HTA s.182(2) disobey-sign tickets in Ontario. No-turn, one-way, do-not-enter, lane-designation. 2 demerit points. Free consultation." canonical="https://www.legalassist.london/services/disobey-sign" />
      <ServicePageLayout seoTitle="Disobey Sign Ticket Defence | Ontario" seoDescription="Licensed paralegal defending HTA s.182(2) disobey-sign tickets in Ontario." canonical="https://www.legalassist.london/services/disobey-sign" problemHeadline="Disobey Sign Ticket — HTA s.182(2)" problemDescription="A 2-point ticket that covers dozens of regulatory signs — no-turn, one-way, do-not-enter, lane restrictions, and more. Lower stakes than other moving violations, but still worth a careful look before you pay." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Disobey sign ticket defence" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>

        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Penalty at a Glance</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 text-center">
                <Gauge className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-yellow-700 mb-2">2</div>
                <p className="text-yellow-800 font-medium">Demerit Points</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 text-center">
                <DollarSign className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-yellow-700 mb-2">~$110</div>
                <p className="text-yellow-800 font-medium">Total Payable</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 text-center">
                <DollarSign className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-yellow-700 mb-2">10-15%</div>
                <p className="text-yellow-800 font-medium">Typical Insurance Increase</p>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common s.182(2) Sign Types</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Sign Type</th>
                    <th className="px-6 py-4 text-center font-heading">Points</th>
                    <th className="px-6 py-4 text-left font-heading">Common Defence Angle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">No left / right / U-turn</td><td className="px-6 py-4 text-center">2</td><td className="px-6 py-4 text-sm">Sign obscured; construction modifications; sign placement</td></tr>
                  <tr><td className="px-6 py-4 font-medium">One way / do-not-enter</td><td className="px-6 py-4 text-center">2</td><td className="px-6 py-4 text-sm">Sign visibility from your approach; lane configuration</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Lane designation (HOV, bus, transit)</td><td className="px-6 py-4 text-center">2</td><td className="px-6 py-4 text-sm">Were you actually in the restricted lane; permitted-use carve-outs</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Keep-right / divided-traffic</td><td className="px-6 py-4 text-center">2</td><td className="px-6 py-4 text-sm">Officer vantage point; lane markings</td></tr>
                  <tr><td className="px-6 py-4 font-medium">No-passing zone</td><td className="px-6 py-4 text-center">2</td><td className="px-6 py-4 text-sm">Where the zone began/ended; sign vs. pavement marking</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-primary/5 rounded-lg p-6 mb-8">
              <Eye className="w-8 h-8 text-primary mb-3" />
              <h4 className="font-bold text-foreground mb-2">Visit and Photograph</h4>
              <p className="text-foreground/80 text-sm">Before your court date, visit the location. Photograph the sign from your approach angle, any obstructions, and the officer’s likely vantage point. This evidence can make or break your defence.</p>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Got a Disobey Sign Ticket?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">2 points still affects your insurance. Get an honest assessment before you pay.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Free Consultation</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.trafficTickets} />
      </ServicePageLayout>
    </>
  );
}
