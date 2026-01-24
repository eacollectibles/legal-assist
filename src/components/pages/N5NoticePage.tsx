import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Home, Clock, Shield, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function N5NoticePage() {
  const authorityItems = [
    { title: 'N5 Notice Defence', description: 'Got an N5 for noise, damage, or interference? The first N5 can be "voided" by correcting the behaviour within 7 days.' },
    { title: 'First N5 is Voidable', description: 'Your first N5 gives you 7 days to stop the behaviour. If you do, the notice is void and landlord cannot proceed.' },
    { title: 'Second N5 Different', description: 'A second N5 within 6 months cannot be voided. But you can still defend at the hearing.' }
  ];

  const processSteps = [
    { step: '1', title: 'Check Type', description: 'First N5 or second? Voidable or not?' },
    { step: '2', title: 'Void if Possible', description: 'Stop behaviour within 7 days for first N5.' },
    { step: '3', title: 'Defend at Hearing', description: 'Challenge allegations if landlord proceeds.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'First N5 Voidable', description: 'Stop behaviour = notice void.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Defences Exist', description: 'Challenge false allegations.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Second N5 Serious', description: 'Cannot void, must defend.' }
  ];

  const honestFAQs = [
    { question: "What is an N5 notice?", answer: "N5 is a notice of termination for: interfering with others' reasonable enjoyment, damage to the unit, too many occupants, or illegal acts. It gives a termination date, but you don't have to leave—landlord must apply to LTB and win an eviction order." },
    { question: "How do I 'void' my first N5?", answer: "Within 7 days of receiving the N5, stop the behaviour completely. For damage, repair or pay for repairs. If you do this, the N5 is void—landlord cannot file an L2 based on it. Document that you stopped/fixed the issue." },
    { question: "I got a second N5 within 6 months. Can I void it?", answer: "No. A second N5 within 6 months of the first cannot be voided. The landlord can proceed directly to an L2 application. However, you can still defend at the hearing by challenging the allegations or arguing the behaviour wasn't serious enough for eviction." },
    { question: "The N5 allegations are false. What do I do?", answer: "Gather evidence to defend at the hearing: witness statements, your own account, photos, videos, anything disproving the landlord's claims. The landlord has the burden to prove the allegations—if they can't, the application will be dismissed." },
    { question: "Can I be evicted for a noise complaint?", answer: "Not easily. The LTB considers: was the noise truly unreasonable (not just normal living sounds), was it a pattern or one-time, did landlord give you chance to correct, is eviction proportionate? Occasional noise rarely justifies eviction." },
    { question: "The N5 is for damage but it was accidental. Does that matter?", answer: "Intent doesn't matter for damage—you're responsible even if accidental. BUT for first N5, you can void by repairing or paying. If you repair the damage within 7 days, the N5 is voided regardless of how the damage occurred." }
  ];

  return (
    <>
      <SEO title="N5 Notice Defence Paralegal Ontario | Void N5 Eviction Notice" description="Got an N5 notice in Ontario? First N5 can be voided within 7 days. Noise complaints, damage, interference. Paralegal defence. Free consultation." canonical="https://www.legalassist.london/services/n5-notice" />
      <ServicePageLayout seoTitle="N5 Notice Defence | Ontario" seoDescription="N5 notice defence in Ontario." canonical="https://www.legalassist.london/services/n5-notice" problemHeadline="N5 Notice Defence" problemDescription="Got an N5 for noise, damage, or interference? Don't panic. Your first N5 can be voided by correcting the behaviour within 7 days. I help tenants defend." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "N5 notice" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding N5 Notices</h2>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                First N5 Can Be Voided
              </h3>
              <p className="text-green-900">Your first N5 notice gives you 7 days to correct the problem. Stop the behaviour, repair the damage, or fix the issue—and the N5 is void. Landlord cannot proceed with eviction based on a voided N5.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">N5 Reasons</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Reason</th>
                    <th className="px-6 py-4 text-left font-heading">First N5</th>
                    <th className="px-6 py-4 text-left font-heading">How to Void</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Noise/Interference</td><td className="px-6 py-4 text-green-700">Voidable</td><td className="px-6 py-4 text-sm">Stop the behaviour within 7 days</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Damage to unit</td><td className="px-6 py-4 text-green-700">Voidable</td><td className="px-6 py-4 text-sm">Repair or pay for damage within 7 days</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Too many occupants</td><td className="px-6 py-4 text-green-700">Voidable</td><td className="px-6 py-4 text-sm">Reduce occupants within 7 days</td></tr>
                  <tr className="bg-yellow-50"><td className="px-6 py-4 font-medium">Illegal activity</td><td className="px-6 py-4 text-yellow-700">Sometimes voidable</td><td className="px-6 py-4 text-sm">Stop activity—but serious illegal acts may not be voidable</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">First N5 vs Second N5</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">First N5:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• 7 days to correct the issue</li>
                  <li>• If corrected, N5 is VOID</li>
                  <li>• Landlord cannot file L2</li>
                  <li>• Fresh start (but document fix)</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Second N5 (within 6 months):</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• CANNOT be voided</li>
                  <li>• Landlord can file L2 immediately</li>
                  <li>• Must defend at hearing</li>
                  <li>• More serious consequences</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Document Your Fix</h4>
              <p className="text-yellow-900 text-sm">If you void an N5 by correcting the behaviour, document it: photos of repairs, emails confirming issue resolved, witness statements that behaviour stopped. This protects you if landlord claims you didn't correct it.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">N5 Notice FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Got an N5 Notice?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Act fast—7 days to void your first N5. Let me help you respond correctly.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get Help Now</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
