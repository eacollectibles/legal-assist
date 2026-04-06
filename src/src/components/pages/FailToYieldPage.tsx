import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, DollarSign, HelpCircle, Gauge } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FailToYieldPage() {
  const authorityItems = [
    { title: 'Intersection Defence', description: 'Fail to yield charges often follow accidents. Who had the right of way isn\'t always clear—circumstances matter.' },
    { title: 'Evidence Analysis', description: 'These charges rely on witness statements and officer conclusions. Inconsistencies create defence opportunities.' },
    { title: 'Insurance Focus', description: '3 demerit points affects your insurance significantly. Worth fighting.' }
  ];

  const processSteps = [
    { step: '1', title: 'Incident Analysis', description: 'Review circumstances, witness statements, intersection layout.' },
    { step: '2', title: 'Defence Strategy', description: 'Challenge evidence or negotiate reduction.' },
    { step: '3', title: 'Court Representation', description: 'Handle all appearances on your behalf.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Full Representation', description: 'You don\'t attend court.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Common Reduction', description: 'Often reduced from careless driving.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Insurance Protection', description: 'Fight to protect your rates.' }
  ];

  const honestFAQs = [
    { question: "What are the penalties?", answer: "3 demerit points, $110 set fine plus surcharges (~$195 total), 15-25% insurance increase for 3 years. Insurance cost typically $900-1,800+ over three years." },
    { question: "When must you yield?", answer: "At stop signs, yield signs, to pedestrians, to emergency vehicles, when turning left, when entering from driveway/parking lot. Right-of-way rules can be complex at certain intersections." },
    { question: "What if there was a collision?", answer: "Collision doesn't prove you failed to yield. The other driver may have been speeding, run a light/sign, or made a sudden move. All circumstances are relevant." },
    { question: "What defences work?", answer: "Other driver was speeding, ran their own sign/light, made sudden move, poor sightlines at intersection, confusing intersection design, or you actually had right of way." },
    { question: "Can this be reduced?", answer: "Yes. Common reductions include disobey sign (2 points) or other lesser offences. Clean record helps significantly." },
    { question: "What if right of way was unclear?", answer: "Some intersections have confusing designs or poor signage. If reasonable drivers could disagree about who had right of way, that creates reasonable doubt." }
  ];

  return (
    <>
      <SEO title="Fail to Yield Defence Paralegal | Ontario" description="Licensed paralegal defending fail to yield charges in Ontario. 3 demerit points, intersection collision defence. Protect your insurance. Free consultation." canonical="https://www.legalassist.london/services/fail-to-yield" />
      <ServicePageLayout seoTitle="Fail to Yield Defence | Ontario" seoDescription="Defending fail to yield charges in Ontario." canonical="https://www.legalassist.london/services/fail-to-yield" problemHeadline="Fail to Yield Defence in Ontario" problemDescription="Charged with failing to yield right of way? The circumstances matter more than who got hit. 3 demerit points are worth fighting for." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Fail to yield defence" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Penalties & Insurance Impact</h2>
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
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Fight When:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Other driver was at fault too</li>
                  <li>• Poor intersection visibility</li>
                  <li>• Confusing signage</li>
                  <li>• Insurance at stake</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">Negotiate When:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• Clean record gives leverage</li>
                  <li>• Want certainty</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-gray-600 mb-2" />
                <h4 className="font-bold text-gray-800 mb-2">Difficult If:</h4>
                <ul className="text-gray-900 text-sm space-y-1">
                  <li>• Clear video evidence</li>
                  <li>• Multiple witnesses agree</li>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Charged with Fail to Yield?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Get an honest assessment of your defence options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.trafficTickets} />
      </ServicePageLayout>
    </>
  );
}
