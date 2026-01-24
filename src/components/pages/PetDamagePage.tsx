import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, DollarSign, FileText, Scale, Shield } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function PetDamagePage() {
  const authorityItems = [
    { title: 'Pet Damage Claims', description: 'Dog bites, property damage by pets—owners are generally responsible. I help pursue these claims in Small Claims Court.' },
    { title: 'Strict Liability', description: 'In Ontario, dog owners are strictly liable for bites—no need to prove the dog was known to be dangerous.' },
    { title: 'Multiple Damages', description: 'Medical expenses, lost wages, property damage, pain and suffering—all recoverable in pet damage cases.' }
  ];

  const processSteps = [
    { step: '1', title: 'Document Injuries/Damage', description: 'Photos, medical records, receipts.' },
    { step: '2', title: 'Identify Owner', description: 'Get contact and insurance info.' },
    { step: '3', title: 'Pursue Claim', description: 'Demand letter, then Small Claims if needed.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Strict Liability', description: 'Dog bites = owner responsible.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Insurance Often Pays', description: 'Homeowner\'s insurance may cover.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Must Prove Amount', description: 'Document all losses carefully.' }
  ];

  const honestFAQs = [
    { question: "Is the dog owner responsible if their dog bites me?", answer: "Yes. Ontario's Dog Owners' Liability Act creates strict liability—the owner is responsible regardless of whether they knew the dog might bite. You don't need to prove negligence, just that the bite occurred and caused damage." },
    { question: "What damages can I recover for a dog bite?", answer: "Medical expenses (immediate and ongoing), lost wages during recovery, property damage (torn clothing), pain and suffering, scarring/disfigurement, and psychological harm (fear, anxiety, PTSD). Keep all receipts and document everything." },
    { question: "What if the dog damaged my property but didn't bite anyone?", answer: "Property damage claims (dog dug up garden, destroyed fence, killed livestock) are negligence-based, not strict liability. You need to show the owner failed to control their animal. Easier if there were prior incidents." },
    { question: "Will their homeowner's insurance cover this?", answer: "Often yes. Many homeowner's policies cover dog bite liability. Ask the owner for their insurance information. If they won't provide it, you can still sue them personally—and they'll likely involve their insurance." },
    { question: "What if I was trespassing when bitten?", answer: "Trespassing can be a defence for the owner, especially if the dog was protecting property. However, children and invitees (delivery people, guests) have stronger claims. The defence isn't absolute—excessive force still creates liability." },
    { question: "Should I report the bite to anyone?", answer: "Yes. Report to local animal control/bylaw. This creates an official record, may trigger dangerous dog proceedings, and strengthens your claim. Get a copy of the report for your records." }
  ];

  return (
    <>
      <SEO title="Pet Damage Claims Paralegal Ontario | Dog Bite Lawyer Alternative" description="Licensed paralegal for pet damage and dog bite claims in Ontario. Strict liability, medical expenses, property damage. Small Claims Court. Free consultation." canonical="https://www.legalassist.london/services/pet-damage" />
      <ServicePageLayout seoTitle="Pet Damage Claims | Ontario" seoDescription="Pet damage and dog bite claims in Ontario." canonical="https://www.legalassist.london/services/pet-damage" problemHeadline="Pet Damage Claims" problemDescription="Bitten by a dog? Property damaged by someone's pet? Owners are responsible for their animals' actions. I help recover compensation." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Pet damage" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Pet Damage Claims</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Dog Bites: Strict Liability</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <Shield className="w-8 h-8 text-primary mb-3" />
              <p className="text-foreground/80 mb-4">Under Ontario's Dog Owners' Liability Act:</p>
              <ul className="text-foreground/80 space-y-2">
                <li>✓ Owner is liable for bite damage regardless of knowledge</li>
                <li>✓ No need to prove the dog was "dangerous" or that owner was negligent</li>
                <li>✓ Simply prove: dog bit you → you suffered damage → owner is liable</li>
              </ul>
              <p className="text-foreground/70 text-sm mt-4">This makes dog bite cases more straightforward than other personal injury claims.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Types of Recoverable Damages</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Category</th>
                    <th className="px-6 py-4 text-left font-heading">Examples</th>
                    <th className="px-6 py-4 text-left font-heading">Documentation Needed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Medical Expenses</td><td className="px-6 py-4 text-sm">ER visit, stitches, antibiotics, therapy</td><td className="px-6 py-4 text-sm">Bills, receipts, records</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Lost Wages</td><td className="px-6 py-4 text-sm">Time off work for treatment/recovery</td><td className="px-6 py-4 text-sm">Pay stubs, employer letter</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Property Damage</td><td className="px-6 py-4 text-sm">Torn clothing, damaged belongings</td><td className="px-6 py-4 text-sm">Photos, replacement receipts</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Pain & Suffering</td><td className="px-6 py-4 text-sm">Physical pain, emotional distress</td><td className="px-6 py-4 text-sm">Personal statement, medical notes</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Scarring</td><td className="px-6 py-4 text-sm">Permanent disfigurement</td><td className="px-6 py-4 text-sm">Photos, medical prognosis</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Other Pet Damage (Property)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">Common Claims:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• Dog destroyed fence/garden</li>
                  <li>• Cat scratched vehicle</li>
                  <li>• Dog killed chickens/livestock</li>
                  <li>• Pet damaged rental property</li>
                </ul>
              </div>
              <div className="bg-primary/5 border border-border rounded-lg p-6">
                <h4 className="font-bold text-foreground mb-2">Proving Property Damage:</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Photos of damage</li>
                  <li>• Repair/replacement estimates</li>
                  <li>• Witness statements</li>
                  <li>• Prior complaints about animal</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Report to Animal Control</h4>
              <p className="text-yellow-900 text-sm">Always report dog bites to local animal control. This creates an official record, may result in the dog being declared dangerous, and significantly strengthens your civil claim.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Pet Damage FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Injured by Someone's Pet?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Document your injuries and let me assess your claim.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.smallClaims} />
      </ServicePageLayout>
    </>
  );
}
