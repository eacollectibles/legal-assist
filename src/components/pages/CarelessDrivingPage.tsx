import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Car, Shield, Scale, DollarSign } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function CarelessDrivingPage() {
  const authorityItems = [
    { title: 'Careless Driving Defence', description: 'Careless driving is one of the most serious provincial charges. I fight these charges aggressively to protect your licence and record.' },
    { title: 'Stakes Are High', description: '6 demerit points, up to $2,000 fine, licence suspension, insurance increases of 100%+. This charge is worth fighting.' },
    { title: 'Defence Options', description: 'Challenge the officer\'s observations, argue momentary inattention vs carelessness, negotiate lesser charges.' }
  ];

  const processSteps = [
    { step: '1', title: 'Case Review', description: 'Analyze disclosure, officer\'s notes, and circumstances.' },
    { step: '2', title: 'Defence Strategy', description: 'Challenge evidence or negotiate reduced charge.' },
    { step: '3', title: 'Trial or Resolution', description: 'Fight at trial or resolve to minimize impact.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'High Acquittal Rate', description: 'Many careless charges can be beaten or reduced.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Lesser Charge Options', description: 'Often negotiable to lower-point offences.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Protect Your Record', description: 'Avoid insurance disaster.' }
  ];

  const honestFAQs = [
    { question: "What is careless driving?", answer: "Section 130 HTA: driving without due care and attention OR without reasonable consideration for others. It's subjective—the officer's opinion that your driving was 'careless.' This subjectivity creates defence opportunities." },
    { question: "What are the penalties for careless driving?", answer: "Fine up to $2,000 (set fine $490), 6 demerit points, possible licence suspension up to 2 years, and insurance increases of 100%+ for 3+ years. The insurance impact is often the worst part." },
    { question: "What's the difference between careless and dangerous?", answer: "Dangerous driving is Criminal Code (marked departure from normal standard). Careless is Provincial (departure from normal standard). Criminal requires higher proof and carries criminal record. Both are serious, but careless is more defensible." },
    { question: "Can careless driving be reduced?", answer: "Often yes. Common reductions: following too closely, improper lane change, or fail to yield. These carry fewer points and less insurance impact. Prosecutors will negotiate if the evidence isn't strong." },
    { question: "What defences work for careless driving?", answer: "Challenge the subjective standard (was it really careless?), momentary inattention vs carelessness distinction, attack officer's observations, mechanical failure, emergency circumstances, argue accident ≠ carelessness." },
    { question: "Should I just pay and get it over with?", answer: "No. The 6 points and insurance hit are devastating. Fighting gives you a chance at acquittal or reduction. Even if you ultimately plead to careless, fighting often gets a reduced fine. The cost of representation is usually less than insurance increases." }
  ];

  return (
    <>
      <SEO title="Careless Driving Defence Paralegal Ontario | HTA Section 130" description="Licensed paralegal defending careless driving charges in Ontario. 6 demerit points, insurance protection. Fight or reduce charges. Free consultation." canonical="https://www.legalassist.london/services/careless-driving" />
      <ServicePageLayout seoTitle="Careless Driving Defence | Ontario" seoDescription="Careless driving defence in Ontario." canonical="https://www.legalassist.london/services/careless-driving" problemHeadline="Careless Driving Charges" problemDescription="Charged with careless driving? This is one of the most serious provincial charges—6 demerit points and insurance disaster. I help fight these charges aggressively." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Careless driving" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Why Careless Driving Charges Matter</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                The Real Cost of Conviction
              </h3>
              <p className="text-red-900">Don't just look at the fine. The 6 demerit points and insurance impact can cost you $10,000+ over 3 years. This charge is almost always worth fighting.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Penalties for Careless Driving</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <DollarSign className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-2">$2,000</div>
                <p className="text-foreground/80 text-sm">Maximum fine</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <Scale className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-2">6 Points</div>
                <p className="text-foreground/80 text-sm">Demerit points</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <Car className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-2">2 Years</div>
                <p className="text-foreground/80 text-sm">Possible suspension</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <Shield className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-2">100%+</div>
                <p className="text-foreground/80 text-sm">Insurance increase</p>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Defence Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Challenge the Charge:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Was it truly "careless" or just an accident?</li>
                  <li>• Attack officer's observations</li>
                  <li>• Momentary inattention defence</li>
                  <li>• Mechanical failure</li>
                  <li>• Emergency circumstances</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <Scale className="w-6 h-6 text-blue-600 mb-2" />
                <h4 className="font-bold text-blue-800 mb-2">Negotiate Reduction:</h4>
                <ul className="text-blue-900 text-sm space-y-1">
                  <li>• Following too closely (4 points)</li>
                  <li>• Improper lane change (2 points)</li>
                  <li>• Fail to yield (3 points)</li>
                  <li>• Turn not in safety (2 points)</li>
                  <li>• Disobey sign (2-3 points)</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Accident ≠ Carelessness</h4>
              <p className="text-yellow-900 text-sm">Just because there was an accident doesn't mean you were careless. Officers often charge careless driving after any accident, but the prosecution must prove carelessness—not just that an accident happened.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Careless Driving FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Charged with Careless Driving?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Don't just pay this one. Let me review your case and explain your options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Case Review</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.traffic} />
      </ServicePageLayout>
    </>
  );
}
