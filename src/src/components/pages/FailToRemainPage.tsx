import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Car, Shield, Scale, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FailToRemainPage() {
  const authorityItems = [
    { title: 'Fail to Remain (Hit & Run)', description: 'Failed to stop after an accident? This is one of the most serious HTA charges—7 demerit points, heavy fines, and potential criminal charges.' },
    { title: 'Both HTA and Criminal', description: 'Fail to remain can be charged under HTA (provincial) or Criminal Code (federal) depending on circumstances. Criminal charges have far worse consequences.' },
    { title: 'Defences Exist', description: 'Didn\'t know you hit something? Stopped but couldn\'t find other party? Left for safety reasons? Defences are available.' }
  ];

  const processSteps = [
    { step: '1', title: 'Determine Charge Type', description: 'HTA or Criminal Code charge?' },
    { step: '2', title: 'Assess Circumstances', description: 'What actually happened?' },
    { step: '3', title: 'Build Defence', description: 'Challenge elements or mitigate.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Defences Available', description: 'Lack of knowledge, safety, ID exchange.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'HTA vs Criminal', description: 'HTA is less serious than Criminal.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Serious Charge', description: '7 points, licence suspension risk.' }
  ];

  const honestFAQs = [
    { question: "What's the difference between HTA and Criminal Code fail to remain?", answer: "HTA s.200: 7 demerit points, fines, possible suspension—but no criminal record. Criminal Code s.320.16: bodily harm or death involved, criminal record, possible imprisonment. If injuries are involved, expect criminal charges." },
    { question: "What are the penalties for HTA fail to remain?", answer: "First offence: fine $400-$2,000, 7 demerit points, possible licence suspension up to 2 years. Second offence: fine $1,000-$4,000, imprisonment up to 6 months, suspension up to 5 years. This is one of the highest-point HTA offences." },
    { question: "I didn't know I hit anything. Is that a defence?", answer: "Yes—if genuine. The Crown must prove you knew or should have known an accident occurred. Minor contact you genuinely didn't notice can be a valid defence. However, this is heavily fact-dependent and the excuse is often met with skepticism." },
    { question: "I stopped and exchanged information but the other driver says I didn't. Defence?", answer: "Challenge the allegation. If you did stop and exchange info (or offer to), you complied with your duty. Document any evidence: dash cam, witness who saw you stop, text messages to other driver. Your word against theirs can succeed." },
    { question: "I left because I felt unsafe. Is that allowed?", answer: "Leaving a dangerous scene for safety is understandable, BUT you must report to police immediately once safe. If you drove to a police station or called 911 right away, this supports your defence. If you just went home, it doesn't." },
    { question: "The accident was the other driver's fault. Does that matter?", answer: "No. Duty to remain applies regardless of fault. Even if the other driver caused the accident, you must still stop, provide information, and render assistance if needed. Fault is a separate issue from the duty to remain." }
  ];

  return (
    <>
      <SEO title="Fail to Remain Defence Paralegal Ontario | Hit and Run Charges" description="Charged with fail to remain (hit and run) in Ontario? 7 demerit points, serious consequences. HTA and Criminal Code defences. Free consultation." canonical="https://www.legalassist.london/services/fail-to-remain" />
      <ServicePageLayout seoTitle="Fail to Remain (Hit & Run) | Ontario" seoDescription="Fail to remain defence in Ontario." canonical="https://www.legalassist.london/services/fail-to-remain" problemHeadline="Fail to Remain (Hit & Run)" problemDescription="Charged with failing to remain at an accident scene? This is serious—7 demerit points and potential criminal charges. Strong defence is essential." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Fail to remain" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Fail to Remain</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                7 Demerit Points
              </h3>
              <p className="text-red-900">Fail to remain carries 7 demerit points—tied for the highest under the HTA. At 15 points, your licence is suspended. This single charge can push many drivers over the threshold.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">HTA vs Criminal Code</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Factor</th>
                    <th className="px-6 py-4 text-left font-heading">HTA s.200</th>
                    <th className="px-6 py-4 text-left font-heading">Criminal Code s.320.16</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">When charged</td><td className="px-6 py-4 text-sm">Property damage only</td><td className="px-6 py-4 text-sm">Bodily harm or death</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Criminal record</td><td className="px-6 py-4 text-green-700">No</td><td className="px-6 py-4 text-red-700 font-bold">YES</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Demerit points</td><td className="px-6 py-4">7 points</td><td className="px-6 py-4 text-sm">N/A (criminal)</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Potential jail</td><td className="px-6 py-4 text-sm">Up to 6 months (repeat)</td><td className="px-6 py-4 text-sm text-red-700">Up to 10 years (death)</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Paralegal can handle?</td><td className="px-6 py-4 text-green-700 font-bold">Yes</td><td className="px-6 py-4 text-red-700">No (lawyer needed)</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Your Duties at an Accident</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <p className="text-foreground/80 mb-4">Under HTA, if involved in an accident you must:</p>
              <ol className="text-foreground/80 space-y-2">
                <li><span className="font-bold">1. Stop:</span> Remain at or return to the scene immediately</li>
                <li><span className="font-bold">2. Identify:</span> Give your name, address, driver's licence, insurance info</li>
                <li><span className="font-bold">3. Assist:</span> Offer assistance to any injured persons</li>
                <li><span className="font-bold">4. Report:</span> Call police if injuries or significant damage</li>
              </ol>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Available Defences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Possible Defences:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Didn't know accident occurred</li>
                  <li>• Did stop and exchange info</li>
                  <li>• Left for safety, reported immediately</li>
                  <li>• Other driver left first</li>
                  <li>• Wrong vehicle identified</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Weak Defences:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• "I panicked"</li>
                  <li>• "I was going to come back"</li>
                  <li>• "The other driver was at fault"</li>
                  <li>• "Damage was minor"</li>
                  <li>• "I left a note" (often insufficient)</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Criminal Charges Need a Lawyer</h4>
              <p className="text-yellow-900 text-sm">If you're facing Criminal Code fail to remain (bodily harm or death), you need a criminal defence lawyer, not a paralegal. I can help with HTA charges only. If unsure which you have, bring your documents for review.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Fail to Remain FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Charged with Fail to Remain?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">7 points is serious. Get proper defence representation.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get Help Now</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.traffic} />
      </ServicePageLayout>
    </>
  );
}
