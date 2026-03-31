import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Car, FileText, Phone, Shield } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FailToReportAccidentPage() {
  const authorityItems = [
    { title: 'Accident Reporting Defence', description: 'Fail to report charges can be defended based on damage thresholds, knowledge, and circumstances.' },
    { title: 'Multiple Charges Possible', description: 'May face fail to report, fail to remain, careless driving, or criminal charges depending on circumstances.' },
    { title: 'Damage Threshold', description: 'Reporting required when damage exceeds $2,000 or there are injuries. Estimating damage is subjective.' }
  ];

  const processSteps = [
    { step: '1', title: 'Assess Charges', description: 'Fail to report vs fail to remain vs criminal—very different.' },
    { step: '2', title: 'Review Evidence', description: 'Damage estimates, knowledge of accident, circumstances.' },
    { step: '3', title: 'Defence Strategy', description: 'Challenge threshold, knowledge, or negotiate.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: '$2,000 Threshold', description: 'Must prove damage exceeded threshold.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Knowledge Defence', description: 'Didn\'t know accident occurred? May be defence.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Criminal Possible', description: 'Fail to remain with injury can be criminal.' }
  ];

  const honestFAQs = [
    { question: "When am I required to report an accident?", answer: "When damage to all vehicles/property combined exceeds $2,000 OR anyone is injured OR you suspect impaired driving. Report to police at the scene or nearest Collision Reporting Centre within 24 hours." },
    { question: "What's the difference between fail to report and fail to remain?", answer: "Fail to report: didn't notify police. Fail to remain (hit and run): left scene without exchanging information or rendering assistance. Fail to remain is more serious—especially if there were injuries (can be Criminal Code)." },
    { question: "I thought the damage was minor. Can I still be charged?", answer: "Yes, but this can be a defence. If you reasonably believed damage was under $2,000 and there were no injuries, you may have a due diligence defence. The subjective assessment of damage matters." },
    { question: "What are the penalties for fail to report?", answer: "Fail to report: 3 demerit points, fine up to $1,000. Fail to remain (HTA): 7 demerit points, $400-$2,000 fine, up to 6 months jail, 2-year suspension. Criminal fail to stop: up to 10 years prison, driving prohibition." },
    { question: "I left because I was scared. Does that help?", answer: "Not really. The law requires you to remain and exchange information regardless of emotional state. However, if you later came forward voluntarily, this can be a mitigating factor at sentencing." },
    { question: "What if the other driver was at fault?", answer: "Doesn't matter for reporting requirements. You must stop, exchange information, and report if threshold met—regardless of who caused the accident. Fault is determined later." }
  ];

  return (
    <>
      <SEO title="Fail to Report Accident Paralegal Ontario | Hit and Run Defence" description="Licensed paralegal defending fail to report and fail to remain charges in Ontario. Accident reporting requirements, defences. Free consultation." canonical="https://www.legalassist.london/services/fail-to-report-accident" />
      <ServicePageLayout seoTitle="Fail to Report Accident | Ontario" seoDescription="Fail to report accident defence in Ontario." canonical="https://www.legalassist.london/services/fail-to-report-accident" problemHeadline="Fail to Report / Fail to Remain" problemDescription="Charged with not reporting an accident or leaving the scene? The severity depends on the circumstances—let me assess your situation." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Fail to report accident" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Accident Reporting Requirements</h2>
            
            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">When Must You Report?</h3>
              <p className="text-foreground/80">You must report to police when: (1) combined damage to all vehicles/property exceeds $2,000, (2) anyone is injured, or (3) you suspect other driver is impaired. Report at scene or Collision Reporting Centre within 24 hours.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Types of Charges</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Charge</th>
                    <th className="px-6 py-4 text-left font-heading">What It Means</th>
                    <th className="px-6 py-4 text-left font-heading">Penalties</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Fail to Report (HTA)</td><td className="px-6 py-4 text-sm">Didn't notify police when required</td><td className="px-6 py-4 text-sm">3 points, up to $1,000 fine</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Fail to Remain (HTA)</td><td className="px-6 py-4 text-sm">Left scene without exchanging info</td><td className="px-6 py-4 text-sm">7 points, $400-$2,000, jail, 2yr suspension</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Fail to Stop (Criminal)</td><td className="px-6 py-4 text-sm">Left scene with injury/death</td><td className="px-6 py-4 text-sm">Up to 10 years prison</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Your Obligations at Scene</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">You Must:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Stop immediately</li>
                  <li>• Render assistance if anyone injured</li>
                  <li>• Exchange name, address, insurance</li>
                  <li>• Report to police if threshold met</li>
                  <li>• Remain until obligations complete</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">If Other Driver Not Present:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• Leave your info on their vehicle</li>
                  <li>• Report to police if damage over $2,000</li>
                  <li>• Take photos of scene and damage</li>
                  <li>• Note time, location, circumstances</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Possible Defences</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-bold text-green-800 mb-2">Defence Arguments:</h4>
              <ul className="text-green-900 text-sm space-y-2">
                <li>✓ Didn't know accident occurred (no contact felt)</li>
                <li>✓ Reasonably believed damage under $2,000</li>
                <li>✓ Left to get help or for safety reasons</li>
                <li>✓ Returned to scene or reported promptly</li>
                <li>✓ Mistaken identity (wasn't your vehicle)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Accident Reporting FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Facing Accident-Related Charges?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let me assess your specific situation and explain your options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Case Review</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.traffic} />
      </ServicePageLayout>
    </>
  );
}
