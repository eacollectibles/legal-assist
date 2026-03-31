import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Car, Shield, Wrench, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function UnsafeVehiclePage() {
  const authorityItems = [
    { title: 'Unsafe Vehicle Tickets', description: 'Equipment violations, safety certificate issues, defective parts—I defend equipment-related HTA charges.' },
    { title: 'Multiple Offences', description: 'One inspection can result in multiple tickets: lights, tires, brakes, exhaust. Each needs individual attention.' },
    { title: 'Fix Before Court', description: 'Getting repairs done before court can help resolve charges. Document everything.' }
  ];

  const processSteps = [
    { step: '1', title: 'List Charges', description: 'Identify each equipment violation charged.' },
    { step: '2', title: 'Fix Issues', description: 'Get repairs done, keep receipts/photos.' },
    { step: '3', title: 'Show Compliance', description: 'Demonstrate repairs at early resolution.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Fix + Show', description: 'Repairs help resolve charges.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Technical Defences', description: 'Standards can be disputed.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Multiple Charges', description: 'Each item is separate offence.' }
  ];

  const honestFAQs = [
    { question: "What counts as an 'unsafe vehicle'?", answer: "Equipment violations under HTA: defective brakes, lights not working (headlights, brake lights, signals), bald tires, cracked windshield obstructing view, muffler issues, missing mirrors, improper modifications. Each defect can be a separate charge." },
    { question: "I got 5 tickets from one stop. Do I have to fight each one?", answer: "Each ticket is a separate charge. However, they can often be dealt with together at early resolution or trial. Getting all issues fixed before court creates a package solution—courts often reduce or dismiss multiple charges when repairs are complete." },
    { question: "Does fixing the problem help my case?", answer: "Yes, significantly. Get repairs done and documented before your court date. Bring receipts and photos (before/after). Prosecutors often reduce or withdraw equipment charges when you can prove immediate compliance." },
    { question: "What are the penalties for equipment violations?", answer: "Most equipment charges: $85-$500 set fine, 0 demerit points. But multiple charges add up quickly. Some serious violations (no lights, unsafe brakes) carry higher fines. No points usually, but multiple convictions affect insurance." },
    { question: "The officer says my modifications are illegal. Is that true?", answer: "Some modifications violate equipment standards (excessive tint, certain lift kits, modified exhaust, removed catalytic converter). If charged, review actual regulations—sometimes officers are wrong about what's permitted. Get an inspection from a certified mechanic." },
    { question: "I didn't know there was a problem. Is that a defence?", answer: "Limited defence. You have a duty to ensure your vehicle is safe. However, sudden failures (light bulb burns out, nail in tire) that you couldn't reasonably know about may help. If something was obviously wrong, 'I didn't notice' won't help." }
  ];

  return (
    <>
      <SEO title="Unsafe Vehicle Ticket Defence Paralegal Ontario | Equipment Violations" description="Licensed paralegal for unsafe vehicle tickets in Ontario. Equipment violations, defective parts, safety issues. Fix and show compliance. Free consultation." canonical="https://www.legalassist.london/services/unsafe-vehicle" />
      <ServicePageLayout seoTitle="Unsafe Vehicle Tickets | Ontario" seoDescription="Unsafe vehicle ticket defence in Ontario." canonical="https://www.legalassist.london/services/unsafe-vehicle" problemHeadline="Unsafe Vehicle Tickets" problemDescription="Equipment violations? Multiple tickets from one stop? Getting repairs done helps your case. I help resolve equipment charges efficiently." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Unsafe vehicle" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Equipment Violation Defence</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Equipment Charges</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Violation</th>
                    <th className="px-6 py-4 text-center font-heading">Typical Fine</th>
                    <th className="px-6 py-4 text-center font-heading">Points</th>
                    <th className="px-6 py-4 text-left font-heading">Fixable?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Defective headlights</td><td className="px-6 py-4 text-center">$85</td><td className="px-6 py-4 text-center">0</td><td className="px-6 py-4 text-sm">Yes - replace bulbs</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Brake lights out</td><td className="px-6 py-4 text-center">$85</td><td className="px-6 py-4 text-center">0</td><td className="px-6 py-4 text-sm">Yes - replace bulbs</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Bald tires</td><td className="px-6 py-4 text-center">$120</td><td className="px-6 py-4 text-center">0</td><td className="px-6 py-4 text-sm">Yes - replace tires</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Excessive window tint</td><td className="px-6 py-4 text-center">$110</td><td className="px-6 py-4 text-center">0</td><td className="px-6 py-4 text-sm">Yes - remove tint</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Muffler defect</td><td className="px-6 py-4 text-center">$110</td><td className="px-6 py-4 text-center">0</td><td className="px-6 py-4 text-sm">Yes - repair/replace</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Unsafe brakes</td><td className="px-6 py-4 text-center">$200+</td><td className="px-6 py-4 text-center">0</td><td className="px-6 py-4 text-sm">Yes - brake service</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">The "Fix and Show" Strategy</h3>
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
              <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
              <p className="text-green-900 mb-3">For equipment violations, getting repairs done before court is your best strategy:</p>
              <ol className="text-green-900 space-y-2">
                <li><span className="font-bold">1. Fix the issues</span> - Get proper repairs from a licensed mechanic</li>
                <li><span className="font-bold">2. Document everything</span> - Receipts, inspection reports, before/after photos</li>
                <li><span className="font-bold">3. Request early resolution</span> - Show prosecutor you've complied</li>
                <li><span className="font-bold">4. Get reduction/withdrawal</span> - Many charges dismissed when repairs proven</li>
              </ol>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Multiple Tickets?</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-8">
              <Car className="w-8 h-8 text-primary mb-3" />
              <p className="text-foreground/80 mb-4">One roadside inspection can generate 3, 5, even 10+ separate tickets. While overwhelming, this creates opportunity:</p>
              <ul className="text-foreground/80 space-y-2">
                <li>• Fix all issues before court</li>
                <li>• Deal with all tickets together</li>
                <li>• Negotiate package resolution</li>
                <li>• Often many charges withdrawn or reduced to one</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Don't Drive Until Fixed</h4>
              <p className="text-yellow-900 text-sm">If your vehicle has serious safety defects (brakes, lights, tires), don't drive it until repaired. Getting stopped again with the same problems creates new charges and looks terrible in court.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Equipment Violation FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Multiple Equipment Tickets?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Get repairs done, then let me help resolve the charges efficiently.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.traffic} />
      </ServicePageLayout>
    </>
  );
}
