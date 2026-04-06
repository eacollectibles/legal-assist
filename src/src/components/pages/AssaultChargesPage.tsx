import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Shield, Scale, Users, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function AssaultChargesPage() {
  const authorityItems = [
    { title: 'Simple Assault Defence', description: 'I defend simple assault charges (summary conviction). Assault causing bodily harm or with a weapon requires a criminal lawyer.' },
    { title: 'Common Defences', description: 'Self-defence, defence of others, consent (in limited cases), and identity defences can lead to acquittal.' },
    { title: 'Serious Consequences', description: 'Even simple assault convictions affect employment, professional licensing, and US travel.' }
  ];

  const processSteps = [
    { step: '1', title: 'Assess Charge Level', description: 'Simple assault (paralegal) vs aggravated (lawyer).' },
    { step: '2', title: 'Build Defence', description: 'Self-defence, consent, or challenge Crown\'s evidence.' },
    { step: '3', title: 'Resolve', description: 'Trial, peace bond, or negotiated resolution.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Defences Exist', description: 'Self-defence is a complete defence.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Peace Bonds', description: 'May resolve without conviction.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Serious Assault', description: 'Requires criminal defence lawyer.' }
  ];

  const honestFAQs = [
    { question: "What is simple assault vs. assault causing bodily harm?", answer: "Simple assault (s. 266): intentional application of force without consent, or threatening act. No significant injury required. Assault causing bodily harm (s. 267): assault that results in injury requiring medical attention. Simple assault can be summary (paralegal can defend); bodily harm is more serious." },
    { question: "Can I claim self-defence?", answer: "Yes, if you reasonably believed force was being used against you and your response was reasonable in the circumstances. You don't have to be hit first—a reasonable belief of imminent threat is enough. The response must be proportionate to the threat." },
    { question: "They hit me first. Does that automatically make it self-defence?", answer: "It helps, but isn't automatic. Your response must be proportionate. If they pushed you and you broke their jaw, that's likely excessive. The analysis considers: what threat did you face, what options did you have, and was your response reasonable?" },
    { question: "What if there are no injuries?", answer: "Simple assault doesn't require injury—just intentional application of force without consent. Even touching someone can be assault if intentional and non-consensual. No injury often helps with sentencing and peace bond resolution." },
    { question: "What about mutual combat / bar fights?", answer: "Both parties can be charged. 'They were fighting too' isn't a defence—you can both be guilty. However, this can support self-defence arguments or lead to peace bonds for both parties as resolution." },
    { question: "What are typical outcomes for first-time simple assault?", answer: "First offence with no injury often results in: peace bond (no conviction), conditional discharge, or suspended sentence with probation. Prior record or injuries increase severity. Domestic assault is treated more seriously regardless of injury." }
  ];

  return (
    <>
      <SEO title="Simple Assault Defence Paralegal Ontario | Assault Charges" description="Licensed paralegal defending simple assault charges in Ontario. Self-defence, peace bonds, avoid criminal record. Free consultation." canonical="https://www.legalassist.london/services/assault-charges" />
      <ServicePageLayout seoTitle="Simple Assault Defence | Ontario" seoDescription="Assault defence in Ontario." canonical="https://www.legalassist.london/services/assault-charges" problemHeadline="Simple Assault Charges" problemDescription="Charged with assault? Self-defence and other defences may apply. I help defend simple assault charges and explore options to avoid conviction." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Assault charges" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Assault Charges</h2>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                Scope of Paralegal Practice
              </h3>
              <p className="text-yellow-900">I can defend simple assault proceeded summarily. Assault causing bodily harm, assault with a weapon, aggravated assault, sexual assault, and domestic assault often require a criminal defence lawyer. I assess your charge and refer appropriately.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Types of Assault Charges</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Charge</th>
                    <th className="px-6 py-4 text-left font-heading">Description</th>
                    <th className="px-6 py-4 text-left font-heading">Who Defends</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">Simple Assault (s. 266)</td><td className="px-6 py-4 text-sm">Force without consent, no serious injury</td><td className="px-6 py-4 text-green-800 font-medium">Paralegal ✓</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Assault Causing Bodily Harm (s. 267)</td><td className="px-6 py-4 text-sm">Assault resulting in injury</td><td className="px-6 py-4 text-red-800">Lawyer Required</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Assault with Weapon (s. 267)</td><td className="px-6 py-4 text-sm">Assault using weapon or imitation</td><td className="px-6 py-4 text-red-800">Lawyer Required</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Aggravated Assault (s. 268)</td><td className="px-6 py-4 text-sm">Wounds, maims, disfigures, endangers life</td><td className="px-6 py-4 text-red-800">Lawyer Required</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Self-Defence Analysis</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <Shield className="w-8 h-8 text-primary mb-3" />
              <p className="text-foreground/80 mb-4">Self-defence under s. 34 of the Criminal Code requires:</p>
              <ol className="text-foreground/80 space-y-2">
                <li><span className="font-bold">1.</span> Reasonable belief that force was being used or threatened against you</li>
                <li><span className="font-bold">2.</span> Your act was for the purpose of defending yourself</li>
                <li><span className="font-bold">3.</span> Your response was reasonable in the circumstances</li>
              </ol>
              <p className="text-foreground/70 text-sm mt-4">Court considers: nature of threat, other means available, size/strength difference, history between parties, proportionality of response.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Resolution Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Without Conviction:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Acquittal (self-defence proven)</li>
                  <li>• Charges withdrawn (weak case)</li>
                  <li>• Peace bond (common resolution)</li>
                  <li>• Diversion (if available)</li>
                  <li>• Absolute/conditional discharge</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">With Conviction:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• Suspended sentence + probation</li>
                  <li>• Fine</li>
                  <li>• Conditional sentence</li>
                  <li>• Jail (rare for simple first offence)</li>
                  <li>• Criminal record impacts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Assault FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Facing Assault Charges?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let me assess your charge level and explain your defence options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get Help Now</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.criminal} />
      </ServicePageLayout>
    </>
  );
}
