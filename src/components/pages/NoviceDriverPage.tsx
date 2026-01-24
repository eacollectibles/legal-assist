import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Car, Clock, Shield, Scale } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function NoviceDriverPage() {
  const authorityItems = [
    { title: 'G1/G2 Driver Tickets', description: 'Novice drivers face stricter rules and harsher consequences. One mistake can restart your licensing timeline.' },
    { title: 'Zero Tolerance', description: 'G1/G2 drivers have zero tolerance for alcohol (not 0.08—zero). Any BAC detection means suspension.' },
    { title: 'Escalating Consequences', description: 'Novice driver suspensions can add months or years to getting your full G licence.' }
  ];

  const processSteps = [
    { step: '1', title: 'Review Violation', description: 'What specific novice driver rule was broken?' },
    { step: '2', title: 'Assess Impact', description: 'How does this affect your licensing timeline?' },
    { step: '3', title: 'Fight or Mitigate', description: 'Contest the ticket or negotiate to minimize damage.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Defences Exist', description: 'Not all tickets stick.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Reduce Impact', description: 'Negotiate to minimize consequences.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'High Stakes', description: 'Licence progression at risk.' }
  ];

  const honestFAQs = [
    { question: "What are the special rules for G1 drivers?", answer: "G1 drivers: zero alcohol, must have fully licensed driver in front seat, no driving on 400-series highways (some exceptions), no driving midnight-5am, passengers limited to number of seatbelts. Violations can mean 30-day suspension and more." },
    { question: "What are the special rules for G2 drivers?", answer: "G2 drivers: zero alcohol, and for first 6 months (if under 19): only one passenger under 19 (midnight-5am), unless accompanied by fully licensed driver or passengers are immediate family. After 6 months or if 19+: no passenger restrictions." },
    { question: "What happens if I get caught with any alcohol as a G1/G2?", answer: "Zero tolerance means ANY detectable alcohol—not 0.08. First offence: 30-day roadside suspension + 30-day additional if convicted. Second offence: 90-day suspension. Third: licence cancelled, start over. Plus fines and potential criminal charges if over 0.08." },
    { question: "How do tickets affect my G1/G2 timeline?", answer: "Demerit points accumulate on your record. At 9+ points as a novice, you face suspension. Suspensions add time before you can take your next road test. Multiple violations or serious charges can result in starting the graduated licensing process over." },
    { question: "I violated passenger restrictions. How serious is this?", answer: "Fines around $85-$110 and can include suspension. More importantly, convictions affect your driving record and insurance. If you're close to your G2 road test, a conviction could delay it. Worth fighting to keep record clean." },
    { question: "Should I fight novice driver tickets more aggressively?", answer: "Yes—the consequences are proportionally worse for novice drivers. What might be minor for a fully licensed driver can derail your licensing timeline. Keeping a clean record through your G1/G2 period is crucial for insurance and progression." }
  ];

  return (
    <>
      <SEO title="G1 G2 Ticket Defence Paralegal Ontario | Novice Driver Violations" description="Licensed paralegal for G1 and G2 driver ticket defence in Ontario. Zero alcohol, passenger restrictions, highway violations. Protect your licence. Free consultation." canonical="https://www.legalassist.london/services/novice-driver" />
      <ServicePageLayout seoTitle="G1/G2 Novice Driver Tickets | Ontario" seoDescription="G1/G2 ticket defence in Ontario." canonical="https://www.legalassist.london/services/novice-driver" problemHeadline="G1/G2 Novice Driver Tickets" problemDescription="Ticket as a G1 or G2 driver? The stakes are higher for novice drivers—one mistake can set back your licensing by months or years. Fight to protect your timeline." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Novice driver" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Novice Driver Rules & Violations</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">G1 Restrictions</h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Restriction</th>
                    <th className="px-6 py-4 text-left font-heading">Violation Consequence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Zero blood alcohol</td><td className="px-6 py-4 text-sm">30-day suspension + fines + potential licence cancellation</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Must have G-licensed driver in front seat</td><td className="px-6 py-4 text-sm">Fine + potential suspension</td></tr>
                  <tr><td className="px-6 py-4 font-medium">No 400-series highways</td><td className="px-6 py-4 text-sm">Fine + potential suspension</td></tr>
                  <tr><td className="px-6 py-4 font-medium">No driving midnight-5am</td><td className="px-6 py-4 text-sm">Fine + potential suspension</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">G2 Restrictions</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Restriction</th>
                    <th className="px-6 py-4 text-left font-heading">Who/When</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Zero blood alcohol</td><td className="px-6 py-4 text-sm">All G2 drivers, always</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Passenger restrictions (midnight-5am)</td><td className="px-6 py-4 text-sm">First 6 months if under 19: max 1 teen passenger</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                Zero Means ZERO
              </h3>
              <p className="text-red-900">For G1 and G2 drivers, zero alcohol tolerance doesn't mean "under 0.08"—it means any detectable amount. One beer could trigger suspension. A mouthwash false positive could trigger investigation. Take this seriously.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Demerit Points for Novice Drivers</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
              <h4 className="font-bold text-yellow-800 mb-2">Lower Threshold</h4>
              <p className="text-yellow-900 text-sm mb-3">Novice drivers are suspended at 9 demerit points (full licence holders at 15):</p>
              <ul className="text-yellow-900 text-sm space-y-1">
                <li>• <span className="font-bold">2-8 points:</span> Warning letter</li>
                <li>• <span className="font-bold">9-14 points:</span> 60-day suspension</li>
                <li>• <span className="font-bold">15+ points:</span> 6-month suspension, must surrender licence</li>
              </ul>
            </div>

            <div className="bg-primary/5 rounded-lg p-6">
              <h4 className="font-bold text-foreground mb-2">Protect Your Timeline</h4>
              <p className="text-foreground/80 text-sm">Every ticket conviction as a novice driver affects your record, insurance rates, and licensing progress. What seems like a minor ticket can have major long-term consequences. Fighting to keep a clean record during G1/G2 is worth the effort.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Novice Driver FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">G1/G2 Ticket?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Don't let one ticket derail your licensing timeline. Let me help.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.traffic} />
      </ServicePageLayout>
    </>
  );
}
