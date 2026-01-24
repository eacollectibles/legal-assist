import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Gauge, Car, Shield, Scale } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function RacingPage() {
  const authorityItems = [
    { title: 'Racing/Contest Charges', description: 'Street racing and contest charges are serious. Roadside vehicle seizure, 30-day licence suspension, and criminal-level consequences.' },
    { title: 'Not Just Speed', description: 'Racing doesn\'t require excessive speed—competing with another vehicle at ANY speed can be charged. Context matters.' },
    { title: 'Immediate Consequences', description: 'Unlike regular tickets, racing = immediate 30-day suspension, 14-day vehicle impound, before you\'re even convicted.' }
  ];

  const processSteps = [
    { step: '1', title: 'Assess Evidence', description: 'Was there actually racing/competition?' },
    { step: '2', title: 'Challenge Seizure', description: 'Possible to recover vehicle early.' },
    { step: '3', title: 'Fight the Charge', description: 'Contest racing allegation at trial.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Competition Required', description: 'Must prove actual racing/contest.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Defences Available', description: 'Not every fast acceleration is racing.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Serious Charge', description: 'Criminal-level consequences.' }
  ];

  const honestFAQs = [
    { question: "What's the difference between racing and stunt driving?", answer: "Racing requires two or more vehicles competing. Stunt driving (50+ over, etc.) can be one vehicle alone. However, both carry similar penalties: 30-day suspension, vehicle seizure, potential jail. Sometimes both are charged together." },
    { question: "They took my car and licence immediately. Is that legal?", answer: "Yes. For racing/stunt charges, police can immediately: suspend your licence for 30 days (roadside), and impound your vehicle for 14 days. This happens before conviction. You can apply to get the vehicle back early in some cases." },
    { question: "I was just accelerating fast, not racing anyone. Is that still racing?", answer: "Racing requires competition with another vehicle. If you were accelerating quickly alone (no other vehicle involved), it's not racing—though it might be stunt driving or careless driving depending on circumstances. The 'contest' element is key." },
    { question: "What are the penalties if convicted?", answer: "First offence: $2,000-$10,000 fine, 1-3 year licence suspension, up to 6 months jail (rare for first offence). Subsequent: $2,000-$10,000 fine, up to 10 year suspension, up to 6 months jail. Plus: 6 demerit points, insurance nightmare." },
    { question: "The other driver got away. Can they still charge me?", answer: "Yes. You can be charged with racing even if the other vehicle isn't identified or caught. However, this weakens the Crown's case—harder to prove 'contest' when there's only one car and driver to examine." },
    { question: "I wasn't racing—we were just driving together. How do I prove that?", answer: "Challenge the 'contest' element. Were you competing for position? Was there a race planned? Did you signal a start? Driving near someone isn't racing. Parallel driving isn't racing. The Crown must prove competitive element." }
  ];

  return (
    <>
      <SEO title="Street Racing Defence Paralegal Ontario | Racing Charges" description="Licensed paralegal for street racing and contest charges in Ontario. Vehicle seizure, licence suspension, racing defence. Serious consequences need serious defence. Free consultation." canonical="https://www.legalassist.london/services/racing" />
      <ServicePageLayout seoTitle="Racing/Contest Charges | Ontario" seoDescription="Racing charge defence in Ontario." canonical="https://www.legalassist.london/services/racing" problemHeadline="Racing/Contest Charges" problemDescription="Charged with street racing? Car seized, licence suspended? Racing charges are serious—but require proof of actual competition. I help fight these charges." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Racing charges" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Racing/Contest Defence</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                Immediate Consequences
              </h3>
              <p className="text-red-900 mb-3">Upon being charged with racing (before any conviction):</p>
              <ul className="text-red-900 text-sm space-y-1">
                <li>• Licence suspended 30 days (roadside)</li>
                <li>• Vehicle impounded 14 days (first offence)</li>
                <li>• You pay towing and storage (~$1,000+)</li>
              </ul>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Penalties if Convicted</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Offence</th>
                    <th className="px-6 py-4 text-left font-heading">Fine</th>
                    <th className="px-6 py-4 text-left font-heading">Suspension</th>
                    <th className="px-6 py-4 text-left font-heading">Jail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">First offence</td><td className="px-6 py-4">$2,000-$10,000</td><td className="px-6 py-4 text-sm">1-3 years</td><td className="px-6 py-4 text-sm">Up to 6 months</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Second offence</td><td className="px-6 py-4 text-red-700">$2,000-$10,000</td><td className="px-6 py-4 text-sm text-red-700">3-10 years</td><td className="px-6 py-4 text-sm text-red-700">Up to 6 months</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Third+ offence</td><td className="px-6 py-4 text-red-700">$2,000-$10,000</td><td className="px-6 py-4 text-sm text-red-700">Lifetime possible</td><td className="px-6 py-4 text-sm text-red-700">Up to 6 months</td></tr>
                </tbody>
              </table>
              <p className="text-foreground/70 text-sm mt-2">Plus: 6 demerit points, vehicle impound costs, and insurance rates that may make you uninsurable.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Key Defence: Was There Actually Racing?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <Gauge className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Likely Racing:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Competing for position with another vehicle</li>
                  <li>• Signal to start a race (rev engines, etc.)</li>
                  <li>• Weaving through traffic together</li>
                  <li>• Blocking traffic for a race</li>
                  <li>• Pre-arranged competition</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">NOT Necessarily Racing:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Fast acceleration alone</li>
                  <li>• Driving parallel to another car</li>
                  <li>• Both cars going fast (separately)</li>
                  <li>• Normal driving near another vehicle</li>
                  <li>• Passing another vehicle (legal pass)</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Challenge the Contest Element</h4>
              <p className="text-yellow-900 text-sm">Racing requires proof of competition—two or more vehicles in a contest. If you were alone, it's not racing (may be stunt). If you were near another car but not competing, challenge whether there was actually a "race."</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Racing Charge FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Facing Racing Charges?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Your licence and freedom are at stake. Get serious defence help.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get Help Immediately</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.traffic} />
      </ServicePageLayout>
    </>
  );
}
