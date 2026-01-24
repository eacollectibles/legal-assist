import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Home, DollarSign, Clock, Shield } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function N4NoticePage() {
  const authorityItems = [
    { title: 'N4 Notice Defence', description: 'Got an N4 for unpaid rent? You can VOID the notice by paying all arrears before the eviction order is issued. Don\'t panic.' },
    { title: 'Pay to Void', description: 'Unlike other notices, you can void an N4 by paying ALL rent owed (including what comes due) before the LTB issues an eviction order.' },
    { title: 'Timeline Matters', description: 'N4 gives 14 days to termination, but you have until the eviction ORDER (not hearing) to pay and void. Use that time.' }
  ];

  const processSteps = [
    { step: '1', title: 'Calculate Arrears', description: 'What\'s actually owed? Check for errors.' },
    { step: '2', title: 'Pay to Void', description: 'Pay full arrears before order issues.' },
    { step: '3', title: 'Defend if Needed', description: 'Challenge amount or request payment plan.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Voidable by Payment', description: 'Pay arrears = N4 void.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Payment Plans', description: 'LTB may order payment plan.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Full Amount', description: 'Must pay ALL owed to void.' }
  ];

  const honestFAQs = [
    { question: "How do I void an N4 notice?", answer: "Pay ALL rent arrears (everything owed up to date of payment, including rent that came due after N4 was served) BEFORE the LTB issues an eviction order. Not before the hearing—before the ORDER. If you pay in full, the N4 is void and landlord cannot evict based on it." },
    { question: "The N4 amount seems wrong. What do I do?", answer: "Check carefully: does it include rent you already paid? Does it use the correct rent amount? Does it account for any rent abatements owed to you? If the amount is wrong, challenge it at the hearing. Bring proof of payments made." },
    { question: "I can't pay the full amount. Can I get a payment plan?", answer: "Yes—at the hearing, you can request a conditional order (payment plan) under Section 83. You'll need to show: ability to catch up while paying ongoing rent, reason for arrears (job loss, illness), and plan to stay current. LTB has discretion." },
    { question: "What's the timeline for an N4?", answer: "Termination date: 14 days after N4 served. BUT landlord can't file L1 until day after termination date. Then hearing scheduled weeks later. Then order issued (or not). You can pay to void anytime before order issues—not just within 14 days." },
    { question: "Landlord refused my rent payment. What now?", answer: "Document the refusal (witness, video, written confirmation). Landlord cannot refuse rent and then claim arrears. This is a defence at the hearing. Bad faith refusal may result in application being dismissed." },
    { question: "I paid but landlord still filed. What do I do?", answer: "Bring proof of payment to the hearing. If you paid ALL arrears before the order, the N4 is void and the L1 should be dismissed. Bank records, receipts, e-transfer confirmations all work as proof." }
  ];

  return (
    <>
      <SEO title="N4 Notice Defence Paralegal Ontario | Rent Arrears Eviction" description="Got an N4 for unpaid rent in Ontario? You can void it by paying arrears before eviction order. Payment plans available. Paralegal help. Free consultation." canonical="https://www.legalassist.london/services/n4-notice" />
      <ServicePageLayout seoTitle="N4 Notice Defence | Ontario" seoDescription="N4 notice defence in Ontario." canonical="https://www.legalassist.london/services/n4-notice" problemHeadline="N4 Notice Defence" problemDescription="Got an N4 for unpaid rent? Don't panic. You can VOID the N4 by paying all arrears before the eviction order is issued. I help tenants navigate this." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "N4 notice" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding N4 Notices</h2>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <DollarSign className="w-6 h-6" />
                Pay to Void
              </h3>
              <p className="text-green-900">The N4 is unique: you can void it by paying ALL rent arrears before the LTB issues an eviction order. Not before the termination date, not before the hearing—before the ORDER. This gives you more time than you think.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">N4 Timeline</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <ol className="text-foreground/80 space-y-3">
                <li><span className="font-bold">Day 1:</span> N4 served (14-day termination period begins)</li>
                <li><span className="font-bold">Day 15+:</span> Termination date passes, landlord CAN file L1</li>
                <li><span className="font-bold">Weeks later:</span> L1 hearing scheduled</li>
                <li><span className="font-bold">At/after hearing:</span> LTB issues order (or dismisses)</li>
                <li className="text-green-700 font-bold">→ You can pay to void ANY TIME before order issues</li>
              </ol>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Defences & Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Your Options:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Pay full arrears to void N4</li>
                  <li>• Challenge incorrect amounts</li>
                  <li>• Claim rent abatement (maintenance issues)</li>
                  <li>• Request payment plan (Section 83)</li>
                  <li>• Prove landlord refused payment</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">Important Notes:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• Must pay ALL arrears (not partial)</li>
                  <li>• Include rent that came due after N4</li>
                  <li>• Keep proof of every payment</li>
                  <li>• Filing fee may also be owed</li>
                  <li>• Voiding doesn't prevent future N4s</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Payment Plan (Section 83)</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-8">
              <p className="text-foreground/80 mb-3">If you can't pay in full, the LTB may order a payment plan. To succeed, show:</p>
              <ul className="text-foreground/80 space-y-1">
                <li>✓ Reason for arrears (job loss, illness, emergency)</li>
                <li>✓ Plan to catch up while paying ongoing rent</li>
                <li>✓ Realistic budget showing you can afford payments</li>
                <li>✓ This is your first time in arrears (helps)</li>
                <li>✓ Circumstances have changed (new job, etc.)</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Document Everything</h4>
              <p className="text-yellow-900 text-sm">Keep records of: all rent payments (receipts, bank records), any maintenance issues (for abatement claims), communications with landlord, and any refused payment attempts.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">N4 Notice FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Got an N4 Notice?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">You have options. Let me help you void the notice or negotiate a payment plan.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get Help Now</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
