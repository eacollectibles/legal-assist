import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, DollarSign, HelpCircle, Gauge } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function UnsafeLaneChangePage() {
  const authorityItems = [
    { title: 'Lane Change Defence', description: 'Unsafe lane change charges often follow accidents but don\'t always reflect what happened. I challenge the evidence and circumstances.' },
    { title: 'Evidence Analysis', description: 'These charges rely heavily on witness statements and officer conclusions. I identify inconsistencies and alternative explanations.' },
    { title: 'Insurance Protection', description: '3 demerit points affects your insurance. Worth fighting to protect your rates.' }
  ];

  const processSteps = [
    { step: '1', title: 'Incident Analysis', description: 'Review what happened, witness statements, and how the charge arose.' },
    { step: '2', title: 'Defence Development', description: 'Challenge evidence or negotiate for reduction to lesser offence.' },
    { step: '3', title: 'Court Representation', description: 'Handle all appearances and fight for best outcome.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Full Representation', description: 'You don\'t need to attend court.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Common Reduction Target', description: 'Often reduced from careless driving as negotiated outcome.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Insurance Focus', description: 'Strategies aimed at minimizing insurance impact.' }
  ];

  const honestFAQs = [
    { question: "What are the penalties?", answer: "3 demerit points, $110 set fine plus surcharges (~$85 total), and 15-25% insurance increase for 3 years. Insurance cost typically $900-1,800+ over three years." },
    { question: "What makes a lane change 'unsafe'?", answer: "Changing lanes without signalling, without checking blind spots, cutting off another vehicle, or changing lanes when unsafe to do so. The subjective nature creates defence opportunities." },
    { question: "What if there was a collision?", answer: "Collision doesn't automatically prove unsafe lane change. The other driver may have sped up, been in your blind spot, or changed lanes simultaneously. We examine all evidence." },
    { question: "Can this be reduced?", answer: "Yes. Common reductions: fail to signal (2 points) or disobey sign (2 points). Clean record helps significantly in negotiations." },
    { question: "What defences work?", answer: "Other driver changed speed unexpectedly, was in blind spot, changed lanes at same time, road conditions required emergency maneuver, or officer didn't witness the actual lane change." },
    { question: "What if I did signal?", answer: "Signalling doesn't guarantee safe lane change, but if you signalled and the other driver accelerated into you, that's a defence. We need evidence of the signal (dashcam, witnesses)." }
  ];

  return (
    <>
      <SEO title="Unsafe Lane Change Defence Paralegal | Ontario" description="Licensed paralegal defending unsafe lane change charges in Ontario. 3 demerit points, collision defence. Protect your insurance. Free consultation." canonical="https://www.legalassist.london/services/unsafe-lane-change" />
      <ServicePageLayout seoTitle="Unsafe Lane Change Defence | Ontario" seoDescription="Licensed paralegal defending unsafe lane change charges." canonical="https://www.legalassist.london/services/unsafe-lane-change" problemHeadline="Unsafe Lane Change Defence in Ontario" problemDescription="Charged after a lane change incident? 3 demerit points and insurance increases are at stake. The circumstances matter—let's examine your defence options." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png?id=unsafe-lane-hero", alt: "Unsafe lane change defence" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
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
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h4 className="font-heading text-lg font-bold text-green-800">Fight When:</h4>
                </div>
                <ul className="space-y-2 text-green-900 text-sm">
                  <li>• Other driver changed speed</li>
                  <li>• You signalled properly</li>
                  <li>• Emergency maneuver required</li>
                  <li>• Officer didn't witness it</li>
                  <li>• Conflicting witness accounts</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  <h4 className="font-heading text-lg font-bold text-yellow-800">Negotiate When:</h4>
                </div>
                <ul className="space-y-2 text-yellow-900 text-sm">
                  <li>• Clean record leverage</li>
                  <li>• Reduced from careless</li>
                  <li>• Want certainty</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-6 h-6 text-gray-600" />
                  <h4 className="font-heading text-lg font-bold text-gray-800">Difficult If:</h4>
                </div>
                <ul className="space-y-2 text-gray-900 text-sm">
                  <li>• Dashcam shows the incident</li>
                  <li>• Multiple witnesses agree</li>
                  <li>• Admitted fault at scene</li>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Charged with Unsafe Lane Change?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">The circumstances matter. Get an honest assessment of your defence options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>

        <RelatedServices services={relatedServicesConfig.trafficTickets} />
      </ServicePageLayout>
    </>
  );
}
