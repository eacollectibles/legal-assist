import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Car, Shield, Clock, Ban } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function DemeritPointsGuidePage() {
  const authorityItems = [
    { title: 'Demerit Points Guide', description: 'Complete guide to Ontario\'s demerit point system—how it works, what triggers suspensions, and how to protect your licence.' },
    { title: 'Suspension Thresholds', description: 'Different rules for full G, G2/G1, and commercial licences. Know your threshold before it\'s too late.' },
    { title: 'Points vs Insurance', description: 'Points affect your licence; convictions affect insurance. Both matter, but in different ways.' }
  ];

  const processSteps = [
    { step: '1', title: 'Know Your Points', description: 'Check your current status with MTO.' },
    { step: '2', title: 'Understand Thresholds', description: 'Full G: 15 pts. G2/G1: 9 pts. Novice: 6 pts.' },
    { step: '3', title: 'Protect Licence', description: 'Fight tickets that would push you over.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Points Expire', description: '2 years from offence date.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Can Fight Tickets', description: 'Reduce or eliminate points.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Novice Stricter', description: 'G1/G2 face lower thresholds.' }
  ];

  const honestFAQs = [
    { question: "How does the demerit point system work?", answer: "Points are added to your record when convicted of traffic offences. Different offences carry different points (2-7). Accumulate too many and you face warnings, interviews, and eventually suspension. Points stay for 2 years from offence date." },
    { question: "How many points until my licence is suspended?", answer: "Full G licence: 15+ points = 30-day suspension. G2/G1: 9+ points = 60-day suspension (first time), 6 months (second). Novice drivers face escalating consequences starting at 6 points." },
    { question: "How do I check my current demerit points?", answer: "Request a driver's abstract from ServiceOntario ($18 uncertified, $18 certified). The abstract shows convictions and points. You can order online, by mail, or in person. Check before fighting a ticket—know what's at stake." },
    { question: "Do points affect insurance?", answer: "No—but convictions do. Insurance companies don't see points; they see convictions. However, convictions that carry points are the same ones that affect insurance. Keeping convictions off your record helps both." },
    { question: "When do demerit points come off?", answer: "2 years from the offence date (not conviction date). If you're convicted 8 months after the offence, the points still expire 2 years from the original offence. Early resolution delays can't extend this." },
    { question: "What happens if I get suspended for points?", answer: "First suspension: 30 days. You must surrender your licence. After suspension, points reset to 7 (not zero). Second accumulation to 15: 6-month suspension. Third: suspension until you show cause why licence shouldn't be cancelled." }
  ];

  return (
    <>
      <SEO title="Ontario Demerit Points Guide | Point System Explained" description="Complete guide to Ontario demerit points. Suspension thresholds, how points work, G2/G1 rules, insurance impact. Protect your licence." canonical="https://www.legalassist.london/guides/demerit-points" />
      <ServicePageLayout seoTitle="Demerit Points Guide | Ontario" seoDescription="Ontario demerit points explained." canonical="https://www.legalassist.london/guides/demerit-points" problemHeadline="Ontario Demerit Points" problemDescription="How close are you to suspension? Understanding the point system helps you make smart decisions about fighting tickets." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Demerit points" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Suspension Thresholds</h2>
            
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Licence Type</th>
                    <th className="px-6 py-4 text-center font-heading">Warning</th>
                    <th className="px-6 py-4 text-center font-heading">Interview</th>
                    <th className="px-6 py-4 text-center font-heading">Suspension</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Full G Licence</td><td className="px-6 py-4 text-center">6 points</td><td className="px-6 py-4 text-center">9 points</td><td className="px-6 py-4 text-center text-red-600 font-bold">15+ points</td></tr>
                  <tr className="bg-yellow-50"><td className="px-6 py-4 font-medium">G2 Licence</td><td className="px-6 py-4 text-center">—</td><td className="px-6 py-4 text-center">—</td><td className="px-6 py-4 text-center text-red-600 font-bold">9+ points</td></tr>
                  <tr className="bg-yellow-50"><td className="px-6 py-4 font-medium">G1 Licence</td><td className="px-6 py-4 text-center">—</td><td className="px-6 py-4 text-center">—</td><td className="px-6 py-4 text-center text-red-600 font-bold">9+ points</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Novice (G1/G2) 21 and under</td><td className="px-6 py-4 text-center">—</td><td className="px-6 py-4 text-center">—</td><td className="px-6 py-4 text-center text-red-600 font-bold">6+ points</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Offence Points</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-bold text-green-800 mb-3">Lower Points (2-3):</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Speeding 16-29 km/h over: <span className="font-bold">3 points</span></li>
                  <li>• Seatbelt: <span className="font-bold">2 points</span></li>
                  <li>• Improper turn: <span className="font-bold">2 points</span></li>
                  <li>• Fail to signal: <span className="font-bold">2 points</span></li>
                  <li>• Improper passing: <span className="font-bold">2 points</span></li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-bold text-red-800 mb-3">Higher Points (4-7):</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Speeding 30-49 km/h over: <span className="font-bold">4 points</span></li>
                  <li>• Speeding 50+ km/h over: <span className="font-bold">6 points</span></li>
                  <li>• Run red light (police): <span className="font-bold">3 points</span></li>
                  <li>• Careless driving: <span className="font-bold">6 points</span></li>
                  <li>• Fail to stop for police: <span className="font-bold">7 points</span></li>
                  <li>• Fail to remain at accident: <span className="font-bold">7 points</span></li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Points vs. Convictions</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-8">
              <p className="text-foreground/80 mb-4">People confuse points and convictions. They're related but different:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-foreground mb-2">Points (MTO):</h4>
                  <ul className="text-foreground/80 text-sm space-y-1">
                    <li>• Track driving behaviour</li>
                    <li>• Trigger licence actions</li>
                    <li>• Expire after 2 years</li>
                    <li>• Reset after suspension</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Convictions (Insurance):</h4>
                  <ul className="text-foreground/80 text-sm space-y-1">
                    <li>• Appear on abstract</li>
                    <li>• Affect insurance rates</li>
                    <li>• Stay on record 3 years</li>
                    <li>• Don't reset</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">After Suspension</h4>
              <p className="text-yellow-900 text-sm">When your suspension ends, your points don't reset to zero—they reset to 7. This means another 8-point conviction immediately triggers another suspension. Post-suspension driving must be extremely careful.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Demerit Points FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Close to Suspension?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">If you have points already, every ticket matters. Let me help you fight.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get Help Now</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.traffic} />
      </ServicePageLayout>
    </>
  );
}
