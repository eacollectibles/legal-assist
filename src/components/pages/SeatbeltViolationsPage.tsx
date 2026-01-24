import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, DollarSign, HelpCircle, Gauge, Shield } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function SeatbeltViolationsPage() {
  const authorityItems = [
    { title: 'Seatbelt Defence', description: 'Seatbelt tickets seem minor but carry 2 demerit points. Observation-based charges can be challenged.' },
    { title: 'Evidence Analysis', description: 'Officer must have seen you without seatbelt. Tinted windows, angle of view, and timing all matter.' },
    { title: 'Insurance Focus', description: '2 points still affects insurance. Sometimes worth fighting, sometimes not.' }
  ];

  const processSteps = [
    { step: '1', title: 'Ticket Review', description: 'Analyze circumstances—were you actually unbuckled? Could officer clearly see?' },
    { step: '2', title: 'Cost-Benefit Analysis', description: 'Determine if fighting makes financial sense given your insurance situation.' },
    { step: '3', title: 'Court Representation', description: 'If worth fighting, handle all appearances.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Honest Assessment', description: 'I\'ll tell you if fighting is worth it for your situation.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Full Representation', description: 'You don\'t attend court if we proceed.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Quick Resolution', description: 'Seatbelt cases typically resolve faster.' }
  ];

  const honestFAQs = [
    { question: "What are the penalties?", answer: "2 demerit points, $240 set fine plus surcharges (~$330 total). Insurance increase of 10-15% for 3 years—typically $500-1,000+ over three years. Marginal whether fighting is worth it." },
    { question: "Is it worth fighting a seatbelt ticket?", answer: "Depends on your situation. If you have high insurance rates or drive professionally, the 2 points matter more. If you have low rates and a clean record, paying may be cheaper than fighting. Do the math." },
    { question: "What defences work?", answer: "You were wearing it (seatbelt under jacket, officer couldn't see clearly), tinted windows obscured view, officer was at bad angle, you had just unbuckled to exit vehicle, or medical exemption." },
    { question: "What about shoulder belt only?", answer: "You must wear both lap and shoulder belt. Wearing one but not the other is still a violation. However, if you claim you were wearing both and officer only saw one, that's challengeable." },
    { question: "What if a passenger wasn't buckled?", answer: "Driver is responsible for passengers under 16. For adult passengers, they get their own ticket. If charged for a child passenger, defences include child was in proper car seat, or you reasonably believed they were buckled." },
    { question: "Can seatbelt tickets be reduced?", answer: "Sometimes reduced to non-moving violations with 0 points. Success depends on Crown's willingness and your record." }
  ];

  return (
    <>
      <SEO title="Seatbelt Ticket Defence Paralegal | Ontario" description="Licensed paralegal defending seatbelt tickets in Ontario. 2 demerit points, honest assessment of whether fighting is worth it. Free consultation." canonical="https://www.legalassist.london/services/seatbelt-violations" />
      <ServicePageLayout seoTitle="Seatbelt Ticket Defence | Ontario" seoDescription="Defending seatbelt violations in Ontario." canonical="https://www.legalassist.london/services/seatbelt-violations" problemHeadline="Seatbelt Ticket Defence in Ontario" problemDescription="Got a seatbelt ticket? 2 demerit points might not seem like much, but they affect your insurance. Let's figure out if fighting makes financial sense." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Seatbelt ticket defence" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">The Math on Seatbelt Tickets</h2>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-yellow-800 mb-3">Is It Worth Fighting?</h3>
              <p className="text-yellow-900">Fine: ~$330 | Insurance increase: $500-1,000 over 3 years | Cost to fight: $250-400</p>
              <p className="text-yellow-800 mt-2">Marginal case. Worth it if insurance rates are already high or you drive professionally. May not be worth it with clean record and low rates.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 text-center">
                <Gauge className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-yellow-700 mb-2">2</div>
                <p className="text-yellow-800 font-medium">Demerit Points</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 text-center">
                <DollarSign className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-yellow-700 mb-2">~$330</div>
                <p className="text-yellow-800 font-medium">Total Fine</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 text-center">
                <DollarSign className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-yellow-700 mb-2">10-15%</div>
                <p className="text-yellow-800 font-medium">Insurance Increase</p>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Should You Fight?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Worth Fighting If:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• You were wearing it</li>
                  <li>• Tinted windows</li>
                  <li>• High insurance rates</li>
                  <li>• Drive professionally</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">Marginal If:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• Clean record</li>
                  <li>• Low insurance rates</li>
                  <li>• Just want it done</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-gray-600 mb-2" />
                <h4 className="font-bold text-gray-800 mb-2">Probably Not Worth It:</h4>
                <ul className="text-gray-900 text-sm space-y-1">
                  <li>• You weren't wearing it</li>
                  <li>• Officer has clear view</li>
                  <li>• Fighting costs more than savings</li>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Got a Seatbelt Ticket?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let's figure out if fighting makes financial sense for your situation.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.trafficTickets} />
      </ServicePageLayout>
    </>
  );
}
