import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Volume2, Users, Shield, Scale } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function CausingDisturbancePage() {
  const authorityItems = [
    { title: 'Disturbance Defence', description: 'I defend causing disturbance charges (s. 175 Criminal Code). These are summary conviction matters within paralegal scope.' },
    { title: 'Common Situations', description: 'Bar fights, public arguments, yelling in public places—often charged alongside other offences.' },
    { title: 'Charter Issues', description: 'Freedom of expression can be relevant—not all loud or offensive conduct is criminal.' }
  ];

  const processSteps = [
    { step: '1', title: 'Review Facts', description: 'What conduct is alleged? Where? What disturbance resulted?' },
    { step: '2', title: 'Build Defence', description: 'Challenge elements: was there actually a disturbance?' },
    { step: '3', title: 'Resolve', description: 'Negotiate diversion, peace bond, or defend at trial.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Elements Required', description: 'Crown must prove actual disturbance occurred.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Peace Bonds', description: 'Often resolved without conviction.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Charter Rights', description: 'Expression rights may apply.' }
  ];

  const honestFAQs = [
    { question: "What is causing a disturbance?", answer: "Section 175 Criminal Code: fighting, screaming, shouting, swearing, singing, or using insulting/obscene language in a public place, OR being drunk and obstructing persons. The conduct must actually disturb the peace and quiet of the public." },
    { question: "What needs to be proven?", answer: "Crown must prove: (1) conduct occurred in or near a public place, (2) the specific conduct (fighting, shouting, etc.), AND (3) actual disturbance of the peace. Being loud or offensive alone isn't enough—it must disturb the peace." },
    { question: "I was just arguing loudly. Is that criminal?", answer: "Possibly not. There must be actual disturbance—interference with the ordinary use of the place by others. An argument that others ignore may not qualify. Context matters: late night residential area vs. busy downtown." },
    { question: "What's the difference between causing disturbance and mischief?", answer: "Disturbance involves conduct that disturbs public peace (noise, fighting). Mischief involves property damage or interference. Different elements, but both can arise from the same incident." },
    { question: "What are the penalties?", answer: "Summary conviction: maximum 6 months jail and/or $5,000 fine. First offence with no other charges typically results in peace bond, diversion, or minor fine. More serious if combined with assault or other charges." },
    { question: "Can freedom of expression be a defence?", answer: "Sometimes. Charter protects expression, but not all expression everywhere. Peaceful protest is protected; screaming obscenities at 3am in a residential area is not. Context and manner matter." }
  ];

  return (
    <>
      <SEO title="Causing Disturbance Defence Paralegal Ontario | Public Disturbance Charges" description="Licensed paralegal defending causing disturbance charges in Ontario. Public fights, shouting, disorderly conduct. Free consultation." canonical="https://www.legalassist.london/services/causing-disturbance" />
      <ServicePageLayout seoTitle="Causing Disturbance Defence | Ontario" seoDescription="Causing disturbance defence in Ontario." canonical="https://www.legalassist.london/services/causing-disturbance" problemHeadline="Causing Disturbance" problemDescription="Charged with causing a disturbance? These charges require proof that your conduct actually disturbed the public peace. I help challenge these elements." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Causing disturbance" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Causing Disturbance</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Elements of the Offence</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <p className="text-foreground/80 mb-4">Crown must prove ALL of the following:</p>
              <ol className="text-foreground/80 space-y-3">
                <li><span className="font-bold">1. Public Place:</span> The conduct occurred in or near a public place</li>
                <li><span className="font-bold">2. Prohibited Conduct:</span> Fighting, screaming, shouting, swearing, singing, or obscene language</li>
                <li><span className="font-bold">3. Actual Disturbance:</span> The conduct actually disturbed the peace and quiet of the public</li>
              </ol>
              <p className="text-foreground/70 text-sm mt-4">If any element is missing, the charge should fail. "Actual disturbance" is often the weakest element.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Types of Conduct Covered</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6">
                <Volume2 className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Section 175(1)(a):</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Fighting</li>
                  <li>• Screaming</li>
                  <li>• Shouting</li>
                  <li>• Swearing</li>
                  <li>• Singing</li>
                  <li>• Insulting or obscene language</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <Users className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Section 175(1)(b) & (c):</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Public intoxication obstructing persons</li>
                  <li>• Loitering and obstructing persons</li>
                  <li>• Disturbing peace of dwelling occupants</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Defence Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Common Defences:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• No actual disturbance occurred</li>
                  <li>• Not a public place</li>
                  <li>• Conduct doesn't fit prohibited list</li>
                  <li>• Charter expression rights</li>
                  <li>• Self-defence (for fighting element)</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">Resolution Options:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• Diversion program</li>
                  <li>• Peace bond (no conviction)</li>
                  <li>• Absolute/conditional discharge</li>
                  <li>• Trial and acquittal</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Often Charged with Other Offences</h4>
              <p className="text-yellow-900 text-sm">Causing disturbance is often charged alongside assault, mischief, or resist arrest. The disturbance charge may be negotiable if dealing with a package of charges.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Causing Disturbance FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Charged with Causing Disturbance?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let me assess whether all elements can be proven.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Case Review</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.criminal} />
      </ServicePageLayout>
    </>
  );
}
