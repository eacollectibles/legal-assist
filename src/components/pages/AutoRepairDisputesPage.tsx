import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Car, DollarSign, FileText, Wrench } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function AutoRepairDisputesPage() {
  const authorityItems = [
    { title: 'Auto Repair Disputes', description: 'Overcharged? Unauthorized repairs? Damage to your car? I help recover from dishonest mechanics in Small Claims Court.' },
    { title: 'Consumer Protection', description: 'Ontario\'s Consumer Protection Act requires written estimates, authorization before work, and itemized invoices.' },
    { title: 'Common Violations', description: 'Exceeding estimates without permission, charging for unperformed work, damaging vehicles during service.' }
  ];

  const processSteps = [
    { step: '1', title: 'Document Everything', description: 'Estimate, invoice, photos, communications.' },
    { step: '2', title: 'Challenge Bill', description: 'Dispute unauthorized charges in writing.' },
    { step: '3', title: 'Recover', description: 'Demand letter, then Small Claims if needed.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Estimate Required', description: 'Must authorize before exceeding.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Itemized Invoice', description: 'Right to see parts and labour.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Get Independent Exam', description: 'Second opinion strengthens case.' }
  ];

  const honestFAQs = [
    { question: "The bill is way higher than the estimate. Do I have to pay?", answer: "Not necessarily. Under Ontario's Consumer Protection Act, if the final price exceeds the estimate by more than 10%, they need your authorization before doing the extra work. If they didn't get permission, you only owe the estimate amount." },
    { question: "They did work I didn't authorize. What are my rights?", answer: "You don't have to pay for unauthorized repairs. Get it in writing that you only authorized specific work. If they added services without permission, refuse to pay for those items. They cannot hold your car hostage for unauthorized charges." },
    { question: "My car has new problems after the repair. Is the shop liable?", answer: "If the damage occurred during their service, yes. Document the new problem immediately, get an independent inspection, and have them confirm the issue wasn't pre-existing. Shops are liable for damage caused during repair work." },
    { question: "They're holding my car until I pay the disputed amount. Is that legal?", answer: "They have a 'repairer's lien' for legitimate charges—but not for unauthorized work. If you owe the authorized amount and they're holding it for disputed extras, that's improper. Pay what you legitimately owe and demand release." },
    { question: "How do I prove they didn't do the work they charged for?", answer: "Get an independent inspection from another mechanic. They can confirm whether parts were actually replaced, whether work was done properly, and whether charges are reasonable. This expert opinion is powerful evidence." },
    { question: "The shop says the estimate was 'just an estimate.' Is that true?", answer: "An estimate is more than a guess. Under CPA, if they exceed the estimate significantly without authorization, you have rights. However, truly unforeseen issues discovered during work may justify reasonable increases—with your permission first." }
  ];

  return (
    <>
      <SEO title="Auto Repair Disputes Paralegal Ontario | Mechanic Overcharge" description="Licensed paralegal for auto repair disputes in Ontario. Overcharged by mechanic, unauthorized repairs, damaged vehicle. Consumer protection. Free consultation." canonical="https://www.legalassist.london/services/auto-repair-disputes" />
      <ServicePageLayout seoTitle="Auto Repair Disputes | Ontario" seoDescription="Auto repair dispute help in Ontario." canonical="https://www.legalassist.london/services/auto-repair-disputes" problemHeadline="Auto Repair Disputes" problemDescription="Overcharged by a mechanic? Unauthorized repairs? Damage to your car? You have consumer protection rights. I help recover overcharges and damages." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Auto repair disputes" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Your Auto Repair Rights</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Consumer Protection Act Requirements</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <p className="text-foreground/80 mb-4">Ontario law requires auto repair shops to:</p>
              <ul className="text-foreground/80 space-y-2">
                <li>✓ Provide written estimate before work (if you request)</li>
                <li>✓ Get your authorization before exceeding estimate by more than 10%</li>
                <li>✓ Only perform work you authorized</li>
                <li>✓ Provide itemized invoice showing parts and labour</li>
                <li>✓ Return replaced parts if you request (before work)</li>
              </ul>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Violations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Shop Problems:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Final bill far exceeds estimate</li>
                  <li>• Repairs you didn't authorize</li>
                  <li>• Charging for work not performed</li>
                  <li>• Damage caused during repair</li>
                  <li>• Refusing to release car</li>
                  <li>• "Finding" new problems after you drop off</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Your Rights:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Only pay for authorized work</li>
                  <li>• Refuse to pay unauthorized extras</li>
                  <li>• Demand itemized invoice</li>
                  <li>• Get replaced parts returned</li>
                  <li>• Recover for shop-caused damage</li>
                  <li>• Report to OMVIC if licensed dealer</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Protecting Yourself</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
              <h4 className="font-bold text-yellow-800 mb-2">Before You Authorize:</h4>
              <ul className="text-yellow-900 text-sm space-y-2">
                <li>• Get written estimate</li>
                <li>• Request they call before exceeding estimate</li>
                <li>• Ask for old parts back (in writing)</li>
                <li>• Take photos of your car before drop-off</li>
                <li>• Keep all paperwork</li>
              </ul>
            </div>

            <div className="bg-primary/5 rounded-lg p-6">
              <Wrench className="w-8 h-8 text-primary mb-3" />
              <h4 className="font-bold text-foreground mb-2">Independent Inspection</h4>
              <p className="text-foreground/80 text-sm">If you suspect work wasn't done properly or at all, get an independent inspection from another mechanic. Their written opinion is powerful evidence in Small Claims Court. Worth the cost to prove your case.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Auto Repair FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Dispute with a Mechanic?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Bring your estimate, invoice, and any evidence. Let me assess your case.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.smallClaims} />
      </ServicePageLayout>
    </>
  );
}
