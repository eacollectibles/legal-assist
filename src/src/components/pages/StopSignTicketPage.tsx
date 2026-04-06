import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, DollarSign, HelpCircle, Gauge, Octagon } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function StopSignTicketPage() {
  const authorityItems = [
    { title: 'Stop Sign Defence', description: 'Did you stop? What counts as a "complete stop"? These are judgment calls—and judgment calls can be challenged.' },
    { title: 'Evidence Analysis', description: 'Officer vantage point, intersection design, and timing all matter. I identify weaknesses in the Crown\'s case.' },
    { title: 'Insurance Focus', description: '3 demerit points means insurance increases. Worth fighting to protect your rates.' }
  ];

  const processSteps = [
    { step: '1', title: 'Ticket Review', description: 'Analyze the intersection, officer position, and circumstances.' },
    { step: '2', title: 'Defence Strategy', description: 'Challenge evidence or negotiate for reduction.' },
    { step: '3', title: 'Court Representation', description: 'Handle all appearances on your behalf.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'You Don\'t Attend Court', description: 'I handle everything.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Insurance Protection', description: '3 points significantly impacts insurance.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Good Success Rate', description: '50-60% of contested cases result in reduction or withdrawal.' }
  ];

  const honestFAQs = [
    { question: "What counts as a complete stop?", answer: "Your wheels must completely stop moving. A 'rolling stop' or 'California stop' where you slow down but don't fully stop is technically a violation. However, what the officer perceives from their vantage point may not reflect reality." },
    { question: "What are the penalties?", answer: "3 demerit points, $110 set fine plus surcharges (~$85 total), and 15-25% insurance increase for 3 years. The insurance cost is typically $900-1,800+ over three years—far more than the fine." },
    { question: "What if the stop sign was obscured?", answer: "If the sign was blocked by vegetation, a vehicle, or weather conditions, this can be a defence. We need evidence—photos, Google Street View, witness statements about sign visibility." },
    { question: "What if I stopped but past the line?", answer: "You must stop before the stop line (or crosswalk, or before entering intersection if no line). Stopping past the line is technically a violation, but if you stopped and it was safe, this is arguable." },
    { question: "Can stop sign tickets be reduced?", answer: "Yes. Common reductions: disobey sign (2 points) or other lesser offences. Success rates: 50-60% reduced, 10-15% withdrawn, 25-40% convicted." },
    { question: "What if the officer was far away?", answer: "Officer vantage point matters. If they were at an angle or distance that made accurate observation difficult, this creates reasonable doubt. We examine where the officer was positioned." }
  ];

  return (
    <>
      <SEO title="Stop Sign Ticket Defence Paralegal | Ontario" description="Licensed paralegal defending stop sign tickets in Ontario. 3 demerit points, rolling stop defence. Protect your insurance. Free consultation." canonical="https://www.legalassist.london/services/stop-sign-ticket" />
      <ServicePageLayout seoTitle="Stop Sign Ticket Defence | Ontario" seoDescription="Licensed paralegal defending stop sign tickets." canonical="https://www.legalassist.london/services/stop-sign-ticket" problemHeadline="Stop Sign Ticket Defence in Ontario" problemDescription="Accused of running a stop sign? Whether you stopped or not, the officer's observation is challengeable. 3 demerit points are worth fighting for." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png?id=stop-sign-hero", alt: "Stop sign ticket defence" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">The Math on Stop Sign Tickets</h2>
            
            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <p className="text-foreground text-lg"><strong>Fine:</strong> ~$195 | <strong>Insurance increase:</strong> $900-1,800+ over 3 years | <strong>Cost to fight:</strong> $300-500</p>
              <p className="text-foreground/80 mt-2">The math usually favours fighting. Even if you're not sure you can win, the potential savings justify the attempt.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 text-center">
                <Gauge className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-yellow-700 mb-2">3</div>
                <p className="text-yellow-800 font-medium">Demerit Points</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 text-center">
                <DollarSign className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-yellow-700 mb-2">~$195</div>
                <p className="text-yellow-800 font-medium">Total Fine</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 text-center">
                <DollarSign className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-yellow-700 mb-2">15-25%</div>
                <p className="text-yellow-800 font-medium">Insurance Increase</p>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Should You Fight?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h4 className="font-heading text-lg font-bold text-green-800">Fight When:</h4>
                </div>
                <ul className="space-y-2 text-green-900 text-sm">
                  <li>• You believe you stopped</li>
                  <li>• Sign was obscured</li>
                  <li>• Officer was distant/angled</li>
                  <li>• Insurance rates are high</li>
                  <li>• You drive for work</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  <h4 className="font-heading text-lg font-bold text-yellow-800">Negotiate When:</h4>
                </div>
                <ul className="space-y-2 text-yellow-900 text-sm">
                  <li>• Clean record gives leverage</li>
                  <li>• Want reduced points</li>
                  <li>• Need certainty</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-6 h-6 text-gray-600" />
                  <h4 className="font-heading text-lg font-bold text-gray-800">May Not Be Worth It:</h4>
                </div>
                <ul className="space-y-2 text-gray-900 text-sm">
                  <li>• You know you didn't stop</li>
                  <li>• Dashcam shows violation</li>
                  <li>• Already have many points</li>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Got a Stop Sign Ticket?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">The insurance math usually favours fighting. Get an honest assessment.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>

        <RelatedServices services={relatedServicesConfig.trafficTickets} />
      </ServicePageLayout>
    </>
  );
}
