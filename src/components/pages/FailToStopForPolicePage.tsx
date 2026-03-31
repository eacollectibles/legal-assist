import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Car, Shield, Scale, Ban } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FailToStopForPolicePage() {
  const authorityItems = [
    { title: 'Fail to Stop Defence', description: 'Failing to stop for police can be HTA (provincial) or Criminal Code. I defend the provincial charge; criminal requires a lawyer.' },
    { title: 'Serious Consequences', description: 'HTA fail to stop: $1,000-$10,000 fine, 7 demerit points, up to 5-year suspension. This is one of the most serious traffic offences.' },
    { title: 'Defence Opportunities', description: 'Did you know police were signalling you? Were you stopping safely? Circumstances matter.' }
  ];

  const processSteps = [
    { step: '1', title: 'Identify Charge', description: 'HTA (paralegal) vs Criminal Code (lawyer required).' },
    { step: '2', title: 'Review Circumstances', description: 'Did you know? Were you stopping? Safety concerns?' },
    { step: '3', title: 'Build Defence', description: 'Challenge knowledge, intent, or mitigate.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Knowledge Defence', description: 'Must prove you knew police were signalling.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Safety Factors', description: 'Looking for safe place to stop is defence.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Criminal Version', description: 'Flight from police is criminal—needs lawyer.' }
  ];

  const honestFAQs = [
    { question: "What's the difference between HTA and Criminal Code fail to stop?", answer: "HTA s. 216: failing to stop when signalled—up to $10,000 fine, suspension, no jail. Criminal Code s. 320.17: flight from police—up to 10 years prison. HTA is not stopping; Criminal is fleeing/evading. I defend HTA; Criminal needs a lawyer." },
    { question: "What are the penalties for HTA fail to stop?", answer: "First offence: $1,000-$10,000 fine, 7 demerit points, licence suspension up to 5 years, possible vehicle impound. This is among the most serious HTA charges—penalties comparable to stunt driving." },
    { question: "I didn't see the police. Is that a defence?", answer: "Potentially yes. The charge requires you to 'fail' to stop—implying you knew or should have known. If you genuinely didn't see lights/hear sirens due to conditions, traffic, or legitimate distraction, this can be a defence." },
    { question: "I was looking for a safe place to stop. Does that help?", answer: "Yes. Looking for a safe pullover location is reasonable. You should signal intent, slow down, and stop as soon as safely possible. Brief delay for safety isn't 'failing to stop'—but extended driving is problematic." },
    { question: "What if I was scared to stop?", answer: "Fear alone isn't a defence (unless impersonator concern). However, if you reasonably believed the person wasn't actually police (unmarked car, suspicious location), this could be relevant. Generally, you must stop and can verify identity after." },
    { question: "Can this be reduced to a lesser charge?", answer: "Sometimes. Depending on circumstances, Crown may agree to a lesser HTA charge with fewer points and lower fine. This depends heavily on what actually happened and your driving record." }
  ];

  return (
    <>
      <SEO title="Fail to Stop for Police Defence Paralegal Ontario | HTA Section 216" description="Licensed paralegal defending fail to stop for police charges in Ontario. 7 demerit points, up to $10,000 fine. Defence options. Free consultation." canonical="https://www.legalassist.london/services/fail-to-stop-police" />
      <ServicePageLayout seoTitle="Fail to Stop for Police | Ontario" seoDescription="Fail to stop for police defence in Ontario." canonical="https://www.legalassist.london/services/fail-to-stop-police" problemHeadline="Fail to Stop for Police" problemDescription="Charged with failing to stop for police? This is one of the most serious HTA charges—7 points, up to $10,000 fine. I help build defences." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Fail to stop" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Fail to Stop Charges</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                One of the Most Serious Traffic Charges
              </h3>
              <p className="text-red-900">Fail to stop carries 7 demerit points, fines up to $10,000, and licence suspension up to 5 years. Only stunt driving and racing carry comparable penalties.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">HTA vs Criminal Code</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Charge</th>
                    <th className="px-6 py-4 text-left font-heading">Conduct</th>
                    <th className="px-6 py-4 text-left font-heading">Penalty</th>
                    <th className="px-6 py-4 text-left font-heading">Who Defends</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">HTA s. 216</td><td className="px-6 py-4 text-sm">Fail to stop when signalled</td><td className="px-6 py-4 text-sm">$1K-$10K, 7 pts, 5yr susp</td><td className="px-6 py-4 text-green-800 font-medium">Paralegal ✓</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">CC s. 320.17</td><td className="px-6 py-4 text-sm">Flight from police (evading)</td><td className="px-6 py-4 text-sm">Up to 10 years prison</td><td className="px-6 py-4 text-red-800">Lawyer Required</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Defence Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Potential Defences:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Didn't know/see police signal</li>
                  <li>• Looking for safe pullover location</li>
                  <li>• Loud music/couldn't hear siren</li>
                  <li>• Poor visibility conditions</li>
                  <li>• Medical emergency</li>
                  <li>• Fear of impersonator (limited)</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Usually Won't Work:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• "I was almost home"</li>
                  <li>• Thought it was someone else</li>
                  <li>• Didn't want a ticket</li>
                  <li>• Panicked</li>
                  <li>• Extended driving after signal</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">What You Should Do When Signalled</h4>
              <p className="text-yellow-900 text-sm">Signal your intention to stop (hazards or turn signal), slow down, pull over as soon as safely possible. Brief delay to find safe spot is acceptable. Keep your hands visible and follow officer instructions.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Fail to Stop FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Charged with Fail to Stop?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">With stakes this high, you need proper defence. Let me review your case.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Case Review</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.traffic} />
      </ServicePageLayout>
    </>
  );
}
