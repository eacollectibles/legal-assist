import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Car, Shield, DollarSign, Users } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function SeatbeltTicketPage() {
  const authorityItems = [
    { title: 'Seatbelt Ticket Defence', description: 'Seatbelt tickets seem minor but carry 2 demerit points and insurance implications. I help challenge questionable tickets.' },
    { title: 'Technical Defences', description: 'Officer observation challenges, medical exemptions, and passenger vs driver issues can provide defences.' },
    { title: 'Worth Fighting?', description: 'The 2 points and insurance impact often make these worth contesting, especially if you were wearing it.' }
  ];

  const processSteps = [
    { step: '1', title: 'Review Ticket', description: 'Driver or passenger? What does officer claim?' },
    { step: '2', title: 'Assess Defence', description: 'Were you wearing it? Any exemption? Observation angle?' },
    { step: '3', title: 'Decide Strategy', description: 'Fight, negotiate, or accept based on circumstances.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Observation Challenges', description: 'Officers can mistake what they saw.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Medical Exemptions', description: 'Some conditions exempt seatbelt requirement.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Points Apply', description: '2 demerit points affect insurance.' }
  ];

  const honestFAQs = [
    { question: "What are the penalties for a seatbelt ticket?", answer: "Driver: $200-$1,000 fine, 2 demerit points. Passenger 16+: $200-$1,000 fine, no points (passenger is responsible). Driver responsible for passengers under 16. The points are what really hurt—insurance increases." },
    { question: "I was wearing my seatbelt but got a ticket. Can I fight this?", answer: "Absolutely. Officer observation from outside moving vehicle isn't always accurate. Dark clothing, chest strap position, sun glare, and observation angle can all lead to mistaken tickets. Request disclosure and examine officer's notes." },
    { question: "Are there medical exemptions for seatbelts?", answer: "Yes. Medical certificate from doctor can exempt you. Conditions like severe claustrophobia, certain surgeries, pregnancy complications, or medical devices can qualify. The exemption must be documented before the stop, not obtained after." },
    { question: "My passenger wasn't wearing a seatbelt. Who gets the ticket?", answer: "Passengers 16+ are responsible for their own seatbelt—they get the ticket (no points to them). Driver is responsible for passengers under 16—driver gets ticket and points. Know who's being charged." },
    { question: "Is it worth fighting a seatbelt ticket?", answer: "Often yes. The 2 points can increase insurance premiums significantly. If you believe you were wearing the seatbelt, contesting may be worthwhile. Even otherwise, representation sometimes gets tickets reduced or dismissed on technical grounds." },
    { question: "What defences work for seatbelt tickets?", answer: "Officer couldn't clearly see (angle, glare, tinted windows), seatbelt was on but positioned unusually, medical exemption, vehicle didn't require seatbelts (vintage cars), or technical issues with the ticket itself." }
  ];

  return (
    <>
      <SEO title="Seatbelt Ticket Defence Paralegal Ontario | Fight Seatbelt Fine" description="Licensed paralegal defending seatbelt tickets in Ontario. 2 demerit points, insurance impact. Challenge officer observations. Free consultation." canonical="https://www.legalassist.london/services/seatbelt-ticket" />
      <ServicePageLayout seoTitle="Seatbelt Ticket Defence | Ontario" seoDescription="Seatbelt ticket defence in Ontario." canonical="https://www.legalassist.london/services/seatbelt-ticket" problemHeadline="Seatbelt Tickets" problemDescription="Got a seatbelt ticket? The 2 demerit points hurt your insurance. If you were wearing it—or even if you weren't—there may be defences." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Seatbelt ticket" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Seatbelt Tickets</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Penalties</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Who</th>
                    <th className="px-6 py-4 text-left font-heading">Fine</th>
                    <th className="px-6 py-4 text-center font-heading">Points</th>
                    <th className="px-6 py-4 text-left font-heading">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Driver not wearing</td><td className="px-6 py-4">$200-$1,000</td><td className="px-6 py-4 text-center text-red-600 font-bold">2</td><td className="px-6 py-4 text-sm">Points affect insurance</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Passenger 16+ not wearing</td><td className="px-6 py-4">$200-$1,000</td><td className="px-6 py-4 text-center text-green-600 font-bold">0</td><td className="px-6 py-4 text-sm">Passenger responsible</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Driver (passenger under 16)</td><td className="px-6 py-4">$200-$1,000</td><td className="px-6 py-4 text-center text-red-600 font-bold">2</td><td className="px-6 py-4 text-sm">Driver responsible for minors</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Defence Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">If You Were Wearing It:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Challenge officer's observation angle</li>
                  <li>• Dark clothing/grey seatbelt blend</li>
                  <li>• Sun glare on windshield</li>
                  <li>• Tinted windows limited view</li>
                  <li>• Belt was on but positioned oddly</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">Other Defences:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• Medical exemption certificate</li>
                  <li>• Vehicle not required to have belts</li>
                  <li>• Actively reversing at slow speed</li>
                  <li>• Technical issues with ticket</li>
                  <li>• Identity (passenger charged as driver)</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Medical Exemptions</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-8">
              <p className="text-foreground/80 mb-4">Medical exemptions require a certificate from your doctor. Conditions that may qualify:</p>
              <ul className="text-foreground/80 text-sm space-y-1">
                <li>• Severe claustrophobia</li>
                <li>• Recent surgery (chest, abdominal)</li>
                <li>• Certain pregnancy complications</li>
                <li>• Medical devices (colostomy, pacemaker in certain positions)</li>
                <li>• Physical conditions preventing proper fit</li>
              </ul>
              <p className="text-foreground/70 text-sm mt-4">The exemption must exist at the time of the stop—getting it afterward doesn't help.</p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">The Real Cost: Insurance</h4>
              <p className="text-yellow-900 text-sm">2 demerit points from a seatbelt ticket can increase insurance premiums. Over 3 years, this can cost more than the fine itself. If you have a clean record worth protecting, fighting makes financial sense.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Seatbelt Ticket FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Got a Seatbelt Ticket?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">The points matter more than the fine. Let me see if there's a defence.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Case Review</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.traffic} />
      </ServicePageLayout>
    </>
  );
}
