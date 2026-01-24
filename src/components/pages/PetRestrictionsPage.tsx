import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Heart, PawPrint, Shield, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function PetRestrictionsPage() {
  const authorityItems = [
    { title: 'Pet Rights', description: '"No pets" clauses are void and unenforceable in Ontario residential tenancies. Your landlord cannot evict you just for having a pet.' },
    { title: 'Service Animals', description: 'Service and support animals have additional protections under the Human Rights Code.' },
    { title: 'Real Issues', description: 'Landlords can act if pets cause damage, disturbance, or allergic reactions—but not just because pets exist.' }
  ];

  const processSteps = [
    { step: '1', title: 'Know Your Rights', description: '"No pets" clauses are unenforceable. Period.' },
    { step: '2', title: 'Address Real Issues', description: 'If there are legitimate concerns, address them proactively.' },
    { step: '3', title: 'Defend If Needed', description: 'Fight improper eviction attempts at the LTB.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'No-Pet Clauses Void', description: 'RTA makes these clauses unenforceable.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Can\'t Evict for Pet Alone', description: 'Must show actual problems.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Service Animals Protected', description: 'Human Rights Code applies.' }
  ];

  const honestFAQs = [
    { question: "My lease says 'no pets.' Can I have a pet anyway?", answer: "Yes. Section 14 of the Residential Tenancies Act makes 'no pets' clauses void. Your landlord cannot evict you for having a pet based on this clause alone. However, they can evict for pet-related problems (damage, noise, allergies affecting others)." },
    { question: "Can my landlord refuse to rent to me because I have a pet?", answer: "Tricky area. They can't evict you for having a pet, but they might be able to consider it during tenant selection (this is contested). Once you're a tenant, the no-pets clause is void." },
    { question: "What about service animals?", answer: "Stronger protection under Human Rights Code. Landlords cannot refuse accommodation or charge extra for service animals—including support animals for mental health conditions. 'No pets' clauses don't apply at all." },
    { question: "What can my landlord do about my pet?", answer: "They can apply to evict if your pet: causes damage, creates noise/disturbance affecting others, causes severe allergic reactions in other tenants, or is dangerous. They must prove actual harm, not just that a pet exists." },
    { question: "Can they charge a pet deposit?", answer: "No. Pet deposits are illegal in Ontario. The only legal deposits are last month's rent and refundable key deposits. Any 'pet deposit' you paid can be recovered." },
    { question: "What if other tenants complain?", answer: "Complaints must be about actual problems (noise, smell, danger), not just the pet's existence. If you're getting complaints, address the underlying issues. Well-behaved pets are generally not grounds for eviction." }
  ];

  return (
    <>
      <SEO title="Pet Restrictions Paralegal Ontario | No Pets Clause Unenforceable" description="Licensed paralegal for pet-related tenant issues in Ontario. 'No pets' clauses are void. Pet eviction defence, service animal rights. Free consultation." canonical="https://www.legalassist.london/services/pet-restrictions" />
      <ServicePageLayout seoTitle="Pet Restrictions | Ontario" seoDescription="Pet restriction help for tenants in Ontario." canonical="https://www.legalassist.london/services/pet-restrictions" problemHeadline="Pets & Tenancy Rights" problemDescription="'No pets' clauses are void in Ontario. Your landlord cannot evict you just for having a pet. I help tenants understand their rights and defend against improper evictions." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Pet restrictions" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Pet Rights in Ontario Rentals</h2>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <PawPrint className="w-6 h-6" />
                The Law Is Clear
              </h3>
              <p className="text-green-900">Section 14 of the Residential Tenancies Act: "A provision in a tenancy agreement prohibiting the presence of animals in or about the residential complex is void." No-pets clauses are unenforceable. Period.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What Landlords Can & Cannot Do</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Cannot:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Evict you just for having a pet</li>
                  <li>• Enforce "no pets" clauses</li>
                  <li>• Charge pet deposits</li>
                  <li>• Charge pet rent</li>
                  <li>• Refuse service animals</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">Can (With Evidence):</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• Evict if pet causes damage</li>
                  <li>• Evict if pet disturbs others</li>
                  <li>• Evict if pet causes severe allergies</li>
                  <li>• Evict if pet is dangerous</li>
                  <li>• Charge for actual damage caused</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Service & Support Animals</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <Heart className="w-8 h-8 text-primary mb-3" />
              <p className="text-foreground/80 mb-4">Service animals and emotional support animals have additional protection under the Human Rights Code:</p>
              <ul className="text-foreground/80 text-sm space-y-2">
                <li>✓ Cannot be refused regardless of "no pets" policies</li>
                <li>✓ No pet deposits or extra fees allowed</li>
                <li>✓ Includes trained service dogs AND prescribed support animals</li>
                <li>✓ You may need documentation from healthcare provider</li>
                <li>✓ Landlord can ask what tasks animal performs, not about your disability</li>
              </ul>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Legitimate Pet Concerns</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Be a Responsible Pet Owner</h4>
              <p className="text-yellow-900 text-sm mb-3">While landlords can't evict for pets existing, they can act on legitimate problems:</p>
              <ul className="text-yellow-900 text-sm space-y-1">
                <li>• Keep pets from causing noise disturbances</li>
                <li>• Clean up after pets in common areas</li>
                <li>• Prevent damage to the unit</li>
                <li>• Ensure pets don't threaten other tenants</li>
                <li>• Address odour issues promptly</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Pet Rights FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Landlord Threatening Eviction Over Pet?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Know your rights. Let me help you respond properly.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
