import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, GraduationCap, Car, Shield, Clock } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function SchoolZoneSpeedingPage() {
  const authorityItems = [
    { title: 'School Zone Speeding', description: 'Speeding in a school zone carries DOUBLE fines. A 20 over ticket becomes much more expensive—but defences still exist.' },
    { title: 'Double Fines', description: 'School zone and community safety zone fines are doubled. What would be $95 becomes $190. Worth fighting.' },
    { title: 'Same Points', description: 'Demerit points are the same as regular speeding—the fine doubles but points don\'t. Still affects insurance.' }
  ];

  const processSteps = [
    { step: '1', title: 'Check Zone Status', description: 'Was the zone properly marked and active?' },
    { step: '2', title: 'Review Evidence', description: 'Radar calibration, officer notes.' },
    { step: '3', title: 'Fight or Negotiate', description: 'Challenge zone validity or reduce speed.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Zone Defences', description: 'Signage, timing, marking issues.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Same Points', description: 'Points don\'t double, only fines.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Double Fines', description: 'Fines are twice normal rate.' }
  ];

  const honestFAQs = [
    { question: "How much more is a school zone speeding ticket?", answer: "Fines are DOUBLED in school zones and community safety zones. Example: 20 km/h over is normally ~$95, in school zone it's ~$190. 30 over goes from ~$190 to ~$380. The financial impact is significant." },
    { question: "Do demerit points also double?", answer: "No—points are the same as regular speeding. 1-15 over = 0 points, 16-29 over = 3 points, 30-49 over = 4 points, 50+ over = 6 points (plus stunt driving charges). Only the fine doubles." },
    { question: "The school zone sign was hard to see. Is that a defence?", answer: "Yes. School zones must be properly marked with clear signage. If signs were obscured, missing, or confusing, that's a valid defence. Photograph the signage and approach. However, most zones are well-marked." },
    { question: "It was summer/weekend—is it still a school zone?", answer: "Depends on the sign. Some say 'when children present' or specific hours. Others apply 24/7 year-round. Check what the sign actually says. If it specifies conditions that weren't met, that's a defence." },
    { question: "Is it worth fighting a school zone ticket?", answer: "Often yes—the doubled fine means more money at stake. If you can get the charge reduced to regular speeding (removing the zone enhancement) or reduced speed, the savings are doubled. Even partial success is worthwhile." },
    { question: "What about community safety zones?", answer: "Same rules—fines double. Community safety zones are designated areas (not just schools) where fines are enhanced. Parks, seniors' areas, etc. Same defences apply: proper signage, zone validity." }
  ];

  return (
    <>
      <SEO title="School Zone Speeding Ticket Paralegal Ontario | Double Fine Defence" description="School zone speeding ticket in Ontario? Fines are doubled. Sign visibility, zone timing defences. Worth fighting. Paralegal help. Free consultation." canonical="https://www.legalassist.london/services/school-zone-speeding" />
      <ServicePageLayout seoTitle="School Zone Speeding | Ontario" seoDescription="School zone speeding defence in Ontario." canonical="https://www.legalassist.london/services/school-zone-speeding" problemHeadline="School Zone Speeding" problemDescription="Caught speeding in a school zone? Fines are DOUBLED—but defences exist. Zone signage, timing restrictions, and standard speeding defences all apply." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "School zone speeding" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">School Zone Penalties</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <GraduationCap className="w-6 h-6" />
                Double Fines
              </h3>
              <p className="text-red-900">School zone and community safety zone fines are doubled. A $95 ticket becomes $190. A $190 ticket becomes $380. The financial stakes are twice as high—making it twice as worth fighting.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Fine Comparison</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Speed Over</th>
                    <th className="px-6 py-4 text-left font-heading">Regular Fine</th>
                    <th className="px-6 py-4 text-left font-heading">School Zone Fine</th>
                    <th className="px-6 py-4 text-center font-heading">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">1-15 km/h</td><td className="px-6 py-4">~$52</td><td className="px-6 py-4 text-red-700 font-bold">~$104</td><td className="px-6 py-4 text-center">0</td></tr>
                  <tr><td className="px-6 py-4 font-medium">16-29 km/h</td><td className="px-6 py-4">~$95</td><td className="px-6 py-4 text-red-700 font-bold">~$190</td><td className="px-6 py-4 text-center">3</td></tr>
                  <tr><td className="px-6 py-4 font-medium">30-49 km/h</td><td className="px-6 py-4">~$190</td><td className="px-6 py-4 text-red-700 font-bold">~$380</td><td className="px-6 py-4 text-center">4</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">50+ km/h</td><td className="px-6 py-4">Court appearance</td><td className="px-6 py-4 text-red-700 font-bold">Court + stunt</td><td className="px-6 py-4 text-center">6+</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">School Zone Defences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Zone-Specific Defences:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Sign obscured or missing</li>
                  <li>• Outside posted hours</li>
                  <li>• "When children present" and none were</li>
                  <li>• Summer/holiday and sign specifies school days</li>
                  <li>• Zone not properly designated</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Standard Speeding Defences:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Radar/laser calibration issues</li>
                  <li>• Wrong vehicle identified</li>
                  <li>• Speed measurement error</li>
                  <li>• Officer testimony gaps</li>
                  <li>• Procedural defects</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Check the Sign Wording</h4>
              <p className="text-yellow-900 text-sm">School zone signs vary. Some say "School Zone 40 km/h when children present." Others say "School Zone 40 km/h 8AM-5PM." Still others apply 24/7. The exact wording determines when the zone is active. If conditions weren't met, the enhancement may not apply.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">School Zone FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">School Zone Ticket?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Double fines mean double the reason to fight. Let me help.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.traffic} />
      </ServicePageLayout>
    </>
  );
}
