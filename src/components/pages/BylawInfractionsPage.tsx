import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Clock, Shield, Scale, Phone } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function BylawInfractionsPage() {
  const authorityItems = [
    { title: 'Provincial Offences Act Experience', description: 'I handle bylaw infraction charges under the POA—property standards, noise bylaws, fire code violations, and more.' },
    { title: 'Municipal Bylaw Expertise', description: 'Familiar with London municipal bylaws and enforcement patterns. I know what defences work and what municipalities prosecute hardest.' },
    { title: 'Strong Defence Strategy', description: 'Bylaw cases often hinge on proof of violation, notice, and procedural errors. I challenge weak prosecutions.' }
  ];

  const processSteps = [
    { step: '1', title: 'Understand the Charge', description: 'Review the bylaw violation and what evidence the municipality must prove.' },
    { step: '2', title: 'Build Defence', description: 'Investigate notice, signage, enforcement patterns, and technical bylaw requirements.' },
    { step: '3', title: 'Resolve or Trial', description: 'Negotiate reduction or proceed to trial to challenge the evidence.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Bylaw Charges Are Winnable', description: 'Many are pursued carelessly. Procedural errors and weak evidence are common.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'No Criminal Record Risk', description: 'Bylaw violations are Provincial Offences—fines only, no jail or criminal record.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Many Negotiation Options', description: 'Amend to lesser violations, reduce fines, stay proceedings with conditions.' }
  ];

  const honestFAQs = [
    { question: "What is a Provincial Offences Act charge?", answer: "POA charges are quasi-criminal regulatory violations—not criminal, but enforced in court. Bylaw violations fall here. Penalties are fines (sometimes thousands), not jail. No criminal record is created, but a provincial record is." },
    { question: "What types of bylaw violations exist?", answer: "Noise bylaws (excessive noise, time restrictions), property standards (maintenance, appearance, trash), fire code violations, zoning infractions, sign bylaws, business licensing, animal control, trespassing on municipal property. Each is treated as a separate offense." },
    { question: "What must the municipality prove?", answer: "They must prove you violated a specific bylaw section. For noise, they prove sound exceeded limits (often hard without measurements). For property standards, they must show the property violates the defined standard. Notice of violation must also be proven properly." },
    { question: "What defences exist?", answer: "Faulty notice, bylaw not properly advertised, officer wasn't authorized, violation didn't actually occur, equipment used improperly, or the bylaw is unreasonable as applied. Procedural defects often win cases." },
    { question: "Can I negotiate a better outcome?", answer: "Yes. Many municipalities will reduce fines or amend charges to lesser violations to avoid trial. Early negotiation is key. Some will withdraw if procedural errors are evident." },
    { question: "What happens if I don't respond?", answer: "The municipality will proceed by default. You could be convicted without appearing, fined significantly, and have a provincial record. Responding immediately is essential." }
  ];

  return (
    <>
      <SEO title="Bylaw Infractions Ontario | POA Violations & Municipal Bylaw Defence" description="Ontario bylaw infraction defence. Noise bylaws, property standards, fire code violations. Provincial Offences Act representation. Contact us." canonical="https://www.legalassist.london/services/bylaw-infractions" />
      <ServicePageLayout seoTitle="Bylaw Infraction Defence | Ontario" seoDescription="Bylaw infraction defence in Ontario." canonical="https://www.legalassist.london/services/bylaw-infractions" problemHeadline="Bylaw Infraction Defence" problemDescription="Received a municipal bylaw violation notice? Noise bylaws, property standards, fire code charges. I defend these effectively. Not a criminal record, but treating it seriously matters." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Bylaw infraction defence" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>

        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Bylaw Violations & Municipal Enforcement</h2>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                Not Criminal, But Serious
              </h3>
              <p className="text-yellow-900">Bylaw infractions are Provincial Offences—not criminal charges. No jail risk, but fines can be substantial. Responding promptly is essential.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Bylaw Violation Types</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Violation Type</th>
                    <th className="px-6 py-4 text-left font-heading">What It Covers</th>
                    <th className="px-6 py-4 text-left font-heading">Typical Fine Range</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Noise Bylaws</td><td className="px-6 py-4 text-sm">Excessive noise, time-restricted loud sounds, construction hours</td><td className="px-6 py-4 text-sm">$500–$2,000</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Property Standards</td><td className="px-6 py-4 text-sm">Building maintenance, yard upkeep, overgrown lots, broken windows</td><td className="px-6 py-4 text-sm">$300–$2,500</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Fire Code</td><td className="px-6 py-4 text-sm">Fire safety violations, blocked exits, storage in stairwells</td><td className="px-6 py-4 text-sm">$1,000–$5,000</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Zoning/Land Use</td><td className="px-6 py-4 text-sm">Operating business in residential zone, illegal use of property</td><td className="px-6 py-4 text-sm">$500–$3,000</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">How the Municipality Enforces Bylaws</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <Clock className="w-6 h-6 text-blue-600 mb-2" />
                <h4 className="font-bold text-blue-800 mb-2">Inspection & Notice Process:</h4>
                <ul className="text-blue-900 text-sm space-y-1">
                  <li>• Bylaw officer inspects property</li>
                  <li>• Notice of violation issued (must be proper)</li>
                  <li>• Time given to comply (usually 14–30 days)</li>
                  <li>• If not remedied, charge laid</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Common Defence Tactics:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Faulty or incomplete notice</li>
                  <li>• Officer lacked authority</li>
                  <li>• Violation actually remedied</li>
                  <li>• Bylaw improperly advertised</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What We Do to Defend You</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-bold text-green-800 mb-3">Our Defence Strategy:</h4>
              <ul className="text-green-900 text-sm space-y-2">
                <li>✓ Review notice of violation for procedural errors</li>
                <li>✓ Investigate whether the violation actually occurred</li>
                <li>✓ Challenge the officer's qualifications and authority</li>
                <li>✓ Verify bylaw was properly published and accessible</li>
                <li>✓ Gather evidence to contradict municipality's case</li>
                <li>✓ Negotiate reduction or withdrawal where possible</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Bylaw FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Got a Bylaw Violation Notice?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Don't ignore it. Early response improves negotiation options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Contact Now</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.smallClaims} />
      </ServicePageLayout>
    </>
  );
}
