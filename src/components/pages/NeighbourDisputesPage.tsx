import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Home, TreePine, Volume2, Fence } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function NeighbourDisputesPage() {
  const authorityItems = [
    { title: 'Neighbour Disputes', description: 'Property damage, boundary issues, trees, noise—I help resolve disputes that affect your home and property.' },
    { title: 'Multiple Options', description: 'Small Claims Court, municipal bylaw enforcement, or negotiated resolution depending on the situation.' },
    { title: 'Practical Solutions', description: 'You have to live next to these people. I help find solutions that work long-term.' }
  ];

  const processSteps = [
    { step: '1', title: 'Document Everything', description: 'Photos, dates, communications, damage estimates.' },
    { step: '2', title: 'Attempt Resolution', description: 'Formal demand letter often resolves disputes.' },
    { step: '3', title: 'Legal Action', description: 'Small Claims Court or bylaw enforcement if needed.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Property Rights', description: 'You have legal rights to use and enjoy your property.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Recoverable Damages', description: 'Property damage, diminished value, repair costs.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Injunctive Relief', description: 'Court orders to stop ongoing problems.' }
  ];

  const honestFAQs = [
    { question: "My neighbour's tree damaged my property. Who pays?", answer: "Generally, if their tree falls on your property, they may be liable if they knew or should have known the tree was hazardous. If it was a healthy tree that fell in a storm, liability is less clear. Your own insurance may cover it regardless—then your insurer can pursue the neighbour." },
    { question: "Can I cut branches that hang over my property?", answer: "Yes—you can trim branches up to your property line (but not beyond). However, you generally can't kill the tree by excessive cutting. Consider giving notice first to avoid escalation." },
    { question: "My neighbour is violating noise bylaws. What can I do?", answer: "First: document (dates, times, recordings if legal). Report to municipal bylaw enforcement—they can issue fines. If it's extreme and ongoing, you may have a civil nuisance claim, but bylaw enforcement is usually more effective." },
    { question: "There's a fence dispute. Who owns the fence?", answer: "If it's directly on the property line, it's likely shared. If entirely on one property, that owner owns it. Survey may be needed to determine line location. Neighbours generally share fence costs under the Line Fences Act." },
    { question: "Is it worth suing my neighbour?", answer: "Consider: you'll still live next to them after. Small Claims makes sense for significant damage ($1,000+). For ongoing issues, bylaw enforcement or injunctions may be more practical than damage claims." },
    { question: "What damages can I recover?", answer: "Repair costs, property damage, diminished property value, sometimes cost of alternative arrangements while damage is repaired. Document everything with photos, estimates, and receipts." }
  ];

  return (
    <>
      <SEO title="Neighbour Disputes Paralegal Ontario | Property Damage Trees Fences" description="Licensed paralegal for neighbour disputes in Ontario. Tree damage, fence disputes, property damage, noise. Small Claims Court. Free consultation." canonical="https://www.legalassist.london/services/neighbour-disputes" />
      <ServicePageLayout seoTitle="Neighbour Disputes | Ontario" seoDescription="Neighbour dispute help in Ontario." canonical="https://www.legalassist.london/services/neighbour-disputes" problemHeadline="Neighbour Disputes" problemDescription="Tree damage, fence fights, property damage, noise? Neighbour disputes affect your daily life. I help resolve them—in court if needed." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Neighbour disputes" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Common Neighbour Disputes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6">
                <TreePine className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-3">Trees & Vegetation:</h4>
                <ul className="text-foreground/80 text-sm space-y-2">
                  <li>• Tree falls and damages property</li>
                  <li>• Branches overhang property line</li>
                  <li>• Roots damaging foundation/pipes</li>
                  <li>• Hedge blocking light/views</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <Fence className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-3">Boundaries & Fences:</h4>
                <ul className="text-foreground/80 text-sm space-y-2">
                  <li>• Fence location disputes</li>
                  <li>• Encroachment on property</li>
                  <li>• Fence repair cost sharing</li>
                  <li>• Structures built over property line</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <Volume2 className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-3">Noise & Nuisance:</h4>
                <ul className="text-foreground/80 text-sm space-y-2">
                  <li>• Excessive noise (parties, music, dogs)</li>
                  <li>• Construction noise/hours</li>
                  <li>• Smoke, odours, pollution</li>
                  <li>• Light pollution</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <Home className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-3">Property Damage:</h4>
                <ul className="text-foreground/80 text-sm space-y-2">
                  <li>• Water runoff/drainage issues</li>
                  <li>• Construction damage</li>
                  <li>• Vehicle damage on property</li>
                  <li>• Pet damage</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Your Options</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Option</th>
                    <th className="px-6 py-4 text-left font-heading">Best For</th>
                    <th className="px-6 py-4 text-left font-heading">Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Demand Letter</td><td className="px-6 py-4 text-sm">Initial attempt, reasonable neighbours</td><td className="px-6 py-4 text-sm">Often resolves without court</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Bylaw Enforcement</td><td className="px-6 py-4 text-sm">Noise, property standards violations</td><td className="px-6 py-4 text-sm">Fines, orders to comply</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Small Claims Court</td><td className="px-6 py-4 text-sm">Property damage, money claims</td><td className="px-6 py-4 text-sm">Damages up to $35,000</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Superior Court</td><td className="px-6 py-4 text-sm">Injunctions, over $35,000</td><td className="px-6 py-4 text-sm">Court orders to stop conduct</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Practical Consideration</h4>
              <p className="text-yellow-900 text-sm">You still have to live next to your neighbour after any dispute resolution. I help find solutions that address the problem while minimizing long-term relationship damage where possible.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Neighbour Dispute FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Neighbour Problem?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Document the issue and let's discuss your options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.smallClaims} />
      </ServicePageLayout>
    </>
  );
}
