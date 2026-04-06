import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Home, Shield, Clock, Scale } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function N7NoticePage() {
  const authorityItems = [
    { title: 'N7 Notice Defence', description: 'N7 is for serious safety impairment or illegal acts. This is an accelerated eviction process—but defences still exist.' },
    { title: 'Cannot Be Voided', description: 'Unlike N5, an N7 cannot be voided by correcting behaviour. Landlord can proceed immediately to hearing.' },
    { title: 'Short Termination', description: 'N7 gives only 10 days termination (vs 20 for N5). Fast timeline means you need to act quickly on defence.' }
  ];

  const processSteps = [
    { step: '1', title: 'Review Allegations', description: 'What exactly is landlord claiming?' },
    { step: '2', title: 'Gather Defence', description: 'Evidence to challenge allegations.' },
    { step: '3', title: 'Prepare for Hearing', description: 'N7 hearings are expedited—be ready.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Must Still Prove', description: 'Landlord must prove allegations.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'High Standard', description: '"Serious impairment" is high bar.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Fast Process', description: '10-day termination, expedited hearing.' }
  ];

  const honestFAQs = [
    { question: "What is an N7 notice?", answer: "N7 is for: seriously impairing safety of landlord, other tenants, or property (Reason 1), or illegal activity affecting safety or possession (Reason 2). It's the most serious tenant notice with accelerated eviction timeline." },
    { question: "Can I void an N7 like an N5?", answer: "No. N7 cannot be voided by correcting the behaviour. The landlord can immediately file an L2 application and request an expedited hearing. You must defend at the hearing itself." },
    { question: "What counts as 'seriously impaired safety'?", answer: "High bar: threatening violence, creating fire hazards, dangerous modifications, assault. Normal disputes, noise, or minor issues don't qualify. 'Seriously impaired' means actual, significant danger—not annoyance or inconvenience." },
    { question: "The allegations in the N7 are exaggerated. What do I do?", answer: "Challenge at the hearing. Landlords sometimes escalate to N7 hoping for faster eviction when N5 would be appropriate. Bring evidence showing the situation wasn't as serious as claimed. LTB will assess if N7 threshold is actually met." },
    { question: "What's the timeline for an N7?", answer: "Termination date: 10 days after notice (Reason 1) or 20 days (Reason 2). Landlord can file L2 immediately after giving notice. LTB may expedite hearing. Much faster than regular N5 process." },
    { question: "Can the LTB give me a second chance with N7?", answer: "Less likely than N5, but possible. LTB has discretion under Section 83 to delay or deny eviction based on circumstances. If the situation has genuinely resolved, if there are mitigating factors, if eviction is disproportionate—argue for relief." }
  ];

  return (
    <>
      <SEO title="N7 Notice Defence Paralegal Ontario | Serious Impairment Safety" description="Got an N7 notice in Ontario? Serious allegations requiring strong defence. Cannot be voided, expedited hearing. Paralegal representation. Free consultation." canonical="https://www.legalassist.london/services/n7-notice" />
      <ServicePageLayout seoTitle="N7 Notice Defence | Ontario" seoDescription="N7 notice defence in Ontario." canonical="https://www.legalassist.london/services/n7-notice" problemHeadline="N7 Notice Defence" problemDescription="Got an N7 for safety impairment or illegal acts? This is serious—N7 cannot be voided and has expedited timelines. Strong defence is critical." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "N7 notice" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding N7 Notices</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                N7 Cannot Be Voided
              </h3>
              <p className="text-red-900">Unlike N5 notices, an N7 cannot be voided by correcting the behaviour. The landlord can proceed immediately to the LTB for an expedited hearing. Your only option is to defend at the hearing.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">N7 Reasons</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Reason</th>
                    <th className="px-6 py-4 text-left font-heading">Termination</th>
                    <th className="px-6 py-4 text-left font-heading">Standard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Reason 1: Seriously impaired safety</td><td className="px-6 py-4 font-bold">10 days</td><td className="px-6 py-4 text-sm">Actual, significant danger to persons or property</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Reason 2: Illegal activity</td><td className="px-6 py-4">20 days</td><td className="px-6 py-4 text-sm">Production/trafficking drugs, or illegal act affecting safety/possession</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">N7 vs N5 Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="font-bold text-yellow-800 mb-2">N5 (Less Serious):</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• Interference, noise, damage</li>
                  <li>• First N5 can be voided (7 days)</li>
                  <li>• 20-day termination</li>
                  <li>• Regular LTB process</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-bold text-red-800 mb-2">N7 (More Serious):</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Safety impairment, illegal acts</li>
                  <li>• CANNOT be voided</li>
                  <li>• 10-20 day termination</li>
                  <li>• Expedited hearing process</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Defence Strategies</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-8">
              <ul className="text-foreground/80 space-y-2">
                <li>✓ Challenge whether conduct actually "seriously impaired" safety (high bar)</li>
                <li>✓ Dispute the facts—landlord must prove allegations</li>
                <li>✓ Argue N5 would be appropriate, not N7 (downgrade argument)</li>
                <li>✓ Show situation has resolved, won't recur</li>
                <li>✓ Request Section 83 relief based on circumstances</li>
                <li>✓ Challenge procedural defects in the N7</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Get Help Immediately</h4>
              <p className="text-yellow-900 text-sm">N7 timelines are short—10 days to termination date, expedited hearing. Don't wait. Gather evidence and get representation as soon as you receive the notice.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">N7 Notice FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Got an N7 Notice?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">This is urgent. Contact me immediately for defence help.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get Urgent Help</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
