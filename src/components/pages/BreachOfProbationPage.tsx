import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, FileText, Scale, Clock, Shield } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function BreachOfProbationPage() {
  const authorityItems = [
    { title: 'Breach Defence', description: 'I defend breach of probation charges (summary conviction). Understanding why the breach happened often shapes the best defence.' },
    { title: 'Context Matters', description: 'Not all breaches are equal. Missing a check-in differs from contacting a complainant. Courts consider the nature of the breach.' },
    { title: 'Preventing Future Breaches', description: 'Part of defence is addressing why the breach happened and preventing recurrence.' }
  ];

  const processSteps = [
    { step: '1', title: 'Assess Breach', description: 'What condition was breached? How serious?' },
    { step: '2', title: 'Build Defence', description: 'Reasonable excuse, lack of intent, or challenge evidence.' },
    { step: '3', title: 'Mitigate', description: 'Show steps taken to prevent future breaches.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Defences Available', description: 'Reasonable excuse can be complete defence.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Context Considered', description: 'Minor technical breaches often resolved.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Serious Breaches', description: 'Contact with victims treated very seriously.' }
  ];

  const honestFAQs = [
    { question: "What is breach of probation?", answer: "Failing to comply with a condition of your probation order—missing appointments, failing to report, entering prohibited areas, contacting prohibited persons, consuming alcohol if prohibited, or failing to complete required programs. Each condition creates a potential breach." },
    { question: "What are the penalties for breach of probation?", answer: "Maximum 2 years less a day jail. Typical first breach with minor circumstance: additional probation, stricter conditions, or short custody. Serious breaches (contact with victim, new offences while on probation) face harsher consequences." },
    { question: "Is 'I forgot' a defence to breach?", answer: "Generally no. You're expected to know your conditions. However, genuine confusion about conditions (ambiguous order, conflicting information from probation officer) or circumstances beyond your control can be defences." },
    { question: "What counts as a 'reasonable excuse'?", answer: "Circumstances beyond your control that made compliance impossible or unreasonable: medical emergency, safety concerns, employment conflict (with evidence of trying to resolve), or conditions that were physically impossible to meet." },
    { question: "I breached no-contact by accident (they came to me). Is that a defence?", answer: "Potentially. If the protected person initiated contact and you took reasonable steps to disengage, this can be a defence. However, you generally must leave immediately and report the contact to probation. Staying or engaging undermines the defence." },
    { question: "What happens to my underlying probation if I'm convicted of breach?", answer: "Varies. The probation may continue as-is, be modified with stricter conditions, or be revoked and replaced with jail time for the original offence. The underlying offence severity and nature of breach matter." }
  ];

  return (
    <>
      <SEO title="Breach of Probation Defence Paralegal Ontario | Probation Violation" description="Licensed paralegal defending breach of probation charges in Ontario. Reasonable excuse defence, mitigation strategies. Free consultation." canonical="https://www.legalassist.london/services/breach-of-probation" />
      <ServicePageLayout seoTitle="Breach of Probation Defence | Ontario" seoDescription="Breach of probation defence in Ontario." canonical="https://www.legalassist.london/services/breach-of-probation" problemHeadline="Breach of Probation" problemDescription="Charged with breaching probation? The nature of the breach and circumstances matter. I help defend these charges and prevent future breaches." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Breach of probation" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Breach of Probation</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Probation Conditions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6">
                <FileText className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Reporting/Supervision:</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Report to probation officer</li>
                  <li>• Keep the peace and be of good behaviour</li>
                  <li>• Notify of address/employment changes</li>
                  <li>• Not leave jurisdiction without permission</li>
                  <li>• Complete community service</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <Shield className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Protective/Restrictive:</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• No contact with specific persons</li>
                  <li>• Stay away from certain locations</li>
                  <li>• No alcohol or drugs</li>
                  <li>• Curfew</li>
                  <li>• No weapons</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Breach Severity Spectrum</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Breach Type</th>
                    <th className="px-6 py-4 text-left font-heading">Typical Treatment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">Missed appointment (first time)</td><td className="px-6 py-4 text-sm">Often resolved with warning or rescheduling</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Failed to complete community service</td><td className="px-6 py-4 text-sm">Extended deadline or additional conditions</td></tr>
                  <tr className="bg-yellow-50"><td className="px-6 py-4 font-medium">Alcohol/drug violation</td><td className="px-6 py-4 text-sm">Treatment focus, possible custody</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Contact with victim/complainant</td><td className="px-6 py-4 text-sm">Treated very seriously—custody common</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">New criminal offence</td><td className="px-6 py-4 text-sm">Most serious—often custody for both</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">The "Reasonable Excuse" Defence</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">May Be Reasonable:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Medical emergency (with proof)</li>
                  <li>• Condition physically impossible</li>
                  <li>• Ambiguous order/conflicting direction</li>
                  <li>• Safety concern (fleeing violence)</li>
                  <li>• Employment conflict (with prior efforts)</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Usually NOT Reasonable:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• "I forgot"</li>
                  <li>• "It was inconvenient"</li>
                  <li>• "The victim contacted me first" (alone)</li>
                  <li>• Transportation issues (usually)</li>
                  <li>• Work schedule (without prior notice)</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">If You're Having Trouble Complying</h4>
              <p className="text-yellow-900 text-sm">Contact your probation officer BEFORE a breach occurs. If conditions are impossible to meet, we can apply to vary probation. Proactive communication is always better than a breach charge.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Breach of Probation FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Charged with Breach?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let me assess your situation and explain your defence options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get Help Now</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.criminal} />
      </ServicePageLayout>
    </>
  );
}
