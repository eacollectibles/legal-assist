import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, FileText, DollarSign, Clock, Shield } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ROEDisputePage() {
  const authorityItems = [
    { title: 'ROE Issues', description: 'Employer won\'t provide ROE? Wrong reason code blocking your EI? I help resolve Record of Employment disputes.' },
    { title: 'EI Eligibility at Stake', description: 'The ROE reason code determines EI eligibility. "Quit" or "Fired for cause" can mean no benefits—even if it\'s wrong.' },
    { title: 'Employer Obligations', description: 'Employers must issue ROE within 5 days of your last day. Failure to do so is a violation.' }
  ];

  const processSteps = [
    { step: '1', title: 'Review ROE', description: 'What reason code did employer use?' },
    { step: '2', title: 'Challenge if Wrong', description: 'Service Canada can investigate.' },
    { step: '3', title: 'Gather Evidence', description: 'Documentation supporting your version.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Can Be Challenged', description: 'Service Canada investigates disputes.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Must Be Issued', description: 'Employer violation if not provided.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Reason Code Critical', description: 'Wrong code = no EI benefits.' }
  ];

  const honestFAQs = [
    { question: "My employer won't give me my ROE. What can I do?", answer: "Employers must issue ROE within 5 days of your last day worked or last day paid (whichever is later). If they don't, contact Service Canada—they can contact the employer directly and even issue a 'deemed' ROE based on available information." },
    { question: "The ROE says I 'quit' but I was laid off. How do I fix this?", answer: "Apply for EI and explain the situation. Service Canada will investigate and may contact your employer. Provide documentation: termination letter, emails, any evidence showing you didn't voluntarily resign. The adjudicator decides the true reason." },
    { question: "ROE says 'dismissed' and I'm denied EI. Can I appeal?", answer: "Yes. If you were fired 'without cause' (not for misconduct), you still qualify for EI. If fired 'for cause' (misconduct), you may not—but the burden is on employer to prove misconduct. Appeal the denial and provide your evidence." },
    { question: "What do the ROE reason codes mean for EI?", answer: "Code A (shortage of work/layoff): eligible. Code E (quit): usually not eligible unless 'just cause.' Code M (dismissal): depends on whether for cause or without cause. Code N (leave of absence): depends on type. The reason code triggers EI review." },
    { question: "Can I get EI if I quit?", answer: "Sometimes. If you quit with 'just cause' (harassment, unsafe conditions, major contract changes, relocation for spouse), you may still qualify. You'll need to prove you had no reasonable alternative but to quit." },
    { question: "How long does an ROE dispute take to resolve?", answer: "Service Canada typically takes 4-8 weeks to investigate disputed ROEs. You can apply for EI while the investigation happens—benefits may be held pending decision, or you may receive them and have to repay if ruling goes against you." }
  ];

  return (
    <>
      <SEO title="ROE Dispute Paralegal Ontario | Record of Employment Problems EI" description="Employer won't issue ROE? Wrong reason code? Licensed paralegal helps resolve Record of Employment disputes affecting EI benefits. Free consultation." canonical="https://www.legalassist.london/services/roe-dispute" />
      <ServicePageLayout seoTitle="ROE Disputes | Ontario" seoDescription="ROE dispute help in Ontario." canonical="https://www.legalassist.london/services/roe-dispute" problemHeadline="ROE Disputes" problemDescription="Record of Employment problems blocking your EI? Wrong reason code? Employer won't issue ROE? I help resolve disputes that affect your benefits." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "ROE disputes" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding ROE Issues</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">ROE Reason Codes & EI Impact</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Code</th>
                    <th className="px-6 py-4 text-left font-heading">Meaning</th>
                    <th className="px-6 py-4 text-left font-heading">EI Eligibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-green-50"><td className="px-6 py-4 font-bold">A</td><td className="px-6 py-4">Shortage of work / Layoff</td><td className="px-6 py-4 text-green-700 font-bold">Usually eligible</td></tr>
                  <tr><td className="px-6 py-4 font-bold">D</td><td className="px-6 py-4">Illness or injury</td><td className="px-6 py-4 text-green-700">Usually eligible (sickness benefits)</td></tr>
                  <tr className="bg-yellow-50"><td className="px-6 py-4 font-bold">E</td><td className="px-6 py-4">Quit</td><td className="px-6 py-4 text-yellow-700">Usually NOT eligible</td></tr>
                  <tr><td className="px-6 py-4 font-bold">K</td><td className="px-6 py-4">Other</td><td className="px-6 py-4 text-yellow-700">Depends on circumstances</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-bold">M</td><td className="px-6 py-4">Dismissal</td><td className="px-6 py-4 text-yellow-700">Depends on reason for dismissal</td></tr>
                  <tr><td className="px-6 py-4 font-bold">N</td><td className="px-6 py-4">Leave of absence</td><td className="px-6 py-4 text-yellow-700">Depends on type of leave</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common ROE Problems</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Problem ROEs:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Employer says "quit" but you were laid off</li>
                  <li>• "Dismissed for cause" but no real misconduct</li>
                  <li>• Employer won't issue ROE at all</li>
                  <li>• Wrong insurable hours/earnings</li>
                  <li>• Delayed ROE causing benefit delays</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Your Options:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Apply for EI anyway—explain dispute</li>
                  <li>• Request Service Canada investigation</li>
                  <li>• Provide evidence supporting your version</li>
                  <li>• Appeal any denial based on wrong ROE</li>
                  <li>• Report employer violation to Service Canada</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
              <h4 className="font-bold text-yellow-800 mb-2">Gather Your Evidence</h4>
              <p className="text-yellow-900 text-sm">For disputes, collect: termination letter/email, any communication about leaving, performance reviews (if claiming wrongful "cause"), witness statements, and anything showing the real reason for separation.</p>
            </div>

            <div className="bg-primary/5 rounded-lg p-6">
              <h4 className="font-bold text-foreground mb-2">Connection to Wrongful Dismissal</h4>
              <p className="text-foreground/80 text-sm">If your employer falsely claims "cause" on your ROE, this may also be evidence of wrongful dismissal. You may have claims for both EI benefits AND wrongful dismissal damages. These issues are often connected.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">ROE Dispute FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">ROE Problems Affecting Your EI?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Don't let your employer's mistake—or lie—cost you benefits.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get Help Now</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.employment} />
      </ServicePageLayout>
    </>
  );
}
