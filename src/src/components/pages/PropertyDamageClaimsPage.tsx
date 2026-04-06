import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, DollarSign, HelpCircle, Car, Home, Camera } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function PropertyDamageClaimsPage() {
  const authorityItems = [
    { title: 'Property Damage Claims', description: 'I help recover compensation when your property is damaged by someone else\'s negligence or intentional act.' },
    { title: 'Damage Assessment', description: 'I help document and quantify damages to build the strongest possible claim.' },
    { title: 'Insurance Navigation', description: 'Whether claiming against insurance or suing directly, I guide you through the process.' }
  ];

  const processSteps = [
    { step: '1', title: 'Document Damage', description: 'Photos, repair estimates, receipts, and witness statements.' },
    { step: '2', title: 'Demand & Negotiate', description: 'Formal demand to responsible party or their insurer.' },
    { step: '3', title: 'Court Action', description: 'Small Claims Court claim if no settlement reached.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Up to $35,000', description: 'Small Claims handles substantial property damage.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Multiple Defendants', description: 'Can pursue all responsible parties.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Consequential Damages', description: 'May recover rental costs, lost use, etc.' }
  ];

  const honestFAQs = [
    { question: "What damages can I recover?", answer: "Cost of repair or replacement (whichever is less), diminished value in some cases, loss of use (rental car, temporary housing), and consequential damages directly caused by the damage. You must prove each category with documentation." },
    { question: "Do I need multiple repair estimates?", answer: "At least two estimates strengthens your case. If you've already repaired, keep all invoices. If not yet repaired, get written estimates from reputable providers. Courts prefer documented costs over guesses." },
    { question: "What if the person who damaged my property has no money?", answer: "Check if their insurance covers it (auto, homeowner's, renter's). If no insurance and they're judgment-proof, you may win but not collect. I'll give an honest assessment of collectability before you proceed." },
    { question: "What about vehicle damage not covered by insurance?", answer: "If other driver is at fault, you can sue them directly. Recoverable: repair costs, diminished value, rental car, and sometimes loss of use. Your own collision coverage may be faster but you'd recover only what insurance doesn't cover from the at-fault driver." },
    { question: "How do I prove the other party is responsible?", answer: "Evidence of causation: photos, videos, witness statements, police reports, expert opinions. You must prove: they had a duty of care, they breached that duty, and that breach caused your damage." },
    { question: "What's the limitation period?", answer: "Generally 2 years from when damage occurred or when you discovered it. Don't wait—evidence disappears, witnesses forget. Early documentation is critical." }
  ];

  return (
    <>
      <SEO title="Property Damage Claims Paralegal Ontario | Vehicle & Home Damage" description="Licensed paralegal for property damage claims in Ontario. Vehicle damage, home damage, insurance disputes. Up to $35,000. Free consultation." canonical="https://www.legalassist.london/services/property-damage-claims" />
      <ServicePageLayout seoTitle="Property Damage Claims | Ontario" seoDescription="Property damage claims in Ontario Small Claims Court." canonical="https://www.legalassist.london/services/property-damage-claims" problemHeadline="Property Damage Claims" problemDescription="Someone damaged your vehicle, home, or property? I help recover repair costs and consequential damages—up to $35,000 in Small Claims Court." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Property damage claims" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Types of Property Damage Claims</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6">
                <Car className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-3">Vehicle Damage:</h4>
                <ul className="text-foreground/80 text-sm space-y-2">
                  <li>• Collision damage (at-fault driver)</li>
                  <li>• Hit and run (if identified)</li>
                  <li>• Parking lot damage</li>
                  <li>• Vandalism (if responsible party known)</li>
                  <li>• Mechanic/shop damage</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <Home className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-3">Property/Home Damage:</h4>
                <ul className="text-foreground/80 text-sm space-y-2">
                  <li>• Neighbor's tree falls on property</li>
                  <li>• Water damage from neighbor</li>
                  <li>• Contractor damage during work</li>
                  <li>• Delivery/moving company damage</li>
                  <li>• Pet damage to rental</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What You Can Recover</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Damage Type</th>
                    <th className="px-6 py-4 text-left font-heading">What's Recoverable</th>
                    <th className="px-6 py-4 text-left font-heading">Evidence Needed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Repair Costs</td><td className="px-6 py-4 text-sm">Actual cost to repair</td><td className="px-6 py-4 text-sm">Invoices, estimates (2+ preferred)</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Replacement Value</td><td className="px-6 py-4 text-sm">If repair exceeds value</td><td className="px-6 py-4 text-sm">Fair market value documentation</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Loss of Use</td><td className="px-6 py-4 text-sm">Rental car, temp housing</td><td className="px-6 py-4 text-sm">Rental receipts, reasonable period</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Diminished Value</td><td className="px-6 py-4 text-sm">Vehicle worth less post-repair</td><td className="px-6 py-4 text-sm">Appraisal showing reduced value</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Documentation Checklist</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-yellow-900 text-sm">
                <ul className="space-y-2">
                  <li>✓ Photos/videos of damage (dated)</li>
                  <li>✓ Photos of what caused damage</li>
                  <li>✓ At least 2 repair estimates</li>
                  <li>✓ Police report (if applicable)</li>
                </ul>
                <ul className="space-y-2">
                  <li>✓ Witness statements</li>
                  <li>✓ Communication with responsible party</li>
                  <li>✓ Insurance correspondence</li>
                  <li>✓ Receipts for all expenses</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Property Damage FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Property Damaged?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Document everything and let's discuss recovering your losses.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.smallClaims} />
      </ServicePageLayout>
    </>
  );
}
