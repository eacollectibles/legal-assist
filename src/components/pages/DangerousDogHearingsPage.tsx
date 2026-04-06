import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Clock, Shield, Scale, Phone } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function DangerousDogHearingsPage() {
  const authorityItems = [
    { title: 'Dog Owners Liability Act Defence', description: 'I defend against "dangerous dog" designations under Ontario law. These carry serious consequences—muzzle orders, destruction—that must be fought.' },
    { title: 'Animal Control Hearing Experience', description: 'Familiar with how animal control investigations work, what evidence they rely on, and how to challenge findings in tribunal hearings.' },
    { title: 'Destruction Order Defence', description: 'Dangerous dog hearings can result in destruction orders. I present evidence to prevent this outcome and seek muzzle orders instead.' }
  ];

  const processSteps = [
    { step: '1', title: 'Incident Review', description: 'Analyze the alleged incident. Was your dog actually at fault? Were witnesses credible?' },
    { step: '2', title: 'Build Defence', description: 'Gather medical records, incident photos, witness statements, dog behaviour history, professional assessments.' },
    { step: '3', title: 'Hearing & Appeal', description: 'Present evidence at tribunal hearing. Challenge municipality findings and seek reasonable outcome.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Designation Can Be Fought', description: 'Many dangerous dog findings lack solid evidence. Witness credibility, incident confusion, and identification errors are common.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Alternatives to Destruction', description: 'Muzzle orders, containment requirements, owner training—many outcomes avoid killing your dog.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Time to Respond', description: 'You have time to gather evidence and prepare. Early legal help dramatically improves outcomes.' }
  ];

  const honestFAQs = [
    { question: "What is the Dog Owners' Liability Act (DOLA)?", answer: "Ontario's DOLA is Part VIII of the Health Protection and Promotion Act. It defines 'dangerous dog' as one that attacked/injured a person or animal, or has a history of aggressive behaviour. A designation triggers strict requirements: muzzle in public, liability insurance, warning signs. In severe cases, destruction can be ordered." },
    { question: "What triggers a dangerous dog designation?", answer: "An incident where your dog injured a person or animal, or bit/attacked without injury. Animal control investigates. If they conclude the dog poses danger, they can seek an order from court or tribunal. The bar is lower than criminal assault—'dangerous' is defined broadly." },
    { question: "What does a muzzle order require?", answer: "Your dog must wear a secure muzzle approved by animal control whenever in public. Many muzzles allow breathing and drinking but prevent biting. Orders also typically require: rabies vaccination, liability insurance ($200,000+), warning signs on property, and confined area containment." },
    { question: "What's the difference between dangerous dog and pit bull designation?", answer: "Breed-specific legislation (BSL) classifies pit bulls as prohibited/dangerous breed in some Ontario municipalities (though reduced as of 2022). Dangerous dog is incident-based—applies to any breed that injures/attacks. Breed designation is nearly automatic for pit bulls; dangerous dog requires incident evidence." },
    { question: "Can a dog be destroyed without a hearing?", answer: "No—you have right to a tribunal hearing before destruction is ordered. Municipal or provincial hearing officer hears evidence. You can present expert evidence (vet, behaviourist), witness testimony, and medical records. This hearing is your critical opportunity to prevent death." },
    { question: "What evidence helps defend against designation?", answer: "Witness statements supporting your account, vet/behaviourist opinion that dog is not aggressive, medical records showing bite severity was minor or no injury occurred, incident photos, prior good behaviour history, owner training courses completed, and contradictions in municipality's investigation." }
  ];

  return (
    <>
      <SEO title="Dangerous Dog Hearings Ontario | DOLA Defence & Muzzle Orders" description="Dangerous dog hearings in Ontario. Dog Owners Liability Act defence, muzzle orders, destruction order appeals. Protect your pet." canonical="https://www.legalassist.london/services/dangerous-dog-hearings" />
      <ServicePageLayout seoTitle="Dangerous Dog Hearing Defence | Ontario" seoDescription="Dangerous dog hearings in Ontario." canonical="https://www.legalassist.london/services/dangerous-dog-hearings" problemHeadline="Dangerous Dog Hearings" problemDescription="Your dog has been designated dangerous? Animal control is seeking muzzle order or destruction? You have the right to a hearing. Let's fight for your dog." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Dangerous dog hearings" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>

        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Dangerous Dog Designations in Ontario</h2>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                Urgent: Hearing Deadline
              </h3>
              <p className="text-red-900">You have limited time to respond to animal control and prepare for hearing. Don't delay—early legal intervention significantly improves outcomes and can prevent destruction orders.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Dangerous Dog Designations & Consequences</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Order Type</th>
                    <th className="px-6 py-4 text-left font-heading">What It Requires</th>
                    <th className="px-6 py-4 text-left font-heading">Duration/Conditions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Muzzle Order</td><td className="px-6 py-4 text-sm">Muzzle in public, rabies vax, liability insurance, warning signs</td><td className="px-6 py-4 text-sm">Indefinite; can apply for removal after 1–3 years</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Containment Order</td><td className="px-6 py-4 text-sm">Dog confined to secure yard, restricted public access</td><td className="px-6 py-4 text-sm">Indefinite; strict compliance required</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Destruction Order</td><td className="px-6 py-4 text-sm">Dog to be euthanized by animal control</td><td className="px-6 py-4 text-sm">Immediate once final; can be appealed before execution</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Interim Order</td><td className="px-6 py-4 text-sm">Temporary restrictions pending full hearing/tribunal</td><td className="px-6 py-4 text-sm">Until hearing decision (weeks to months)</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">How Municipal Investigations Work</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <Clock className="w-6 h-6 text-blue-600 mb-2" />
                <h4 className="font-bold text-blue-800 mb-2">Investigation Steps:</h4>
                <ul className="text-blue-900 text-sm space-y-1">
                  <li>• Animal control interviews complainant</li>
                  <li>• Officer examines alleged victim (if injured)</li>
                  <li>• Dog owner questioned (you can decline interview)</li>
                  <li>• Photos, medical records gathered</li>
                  <li>• Report issued with recommendation</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <Shield className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Your Defence Opportunities:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Don't speak to animal control without legal help</li>
                  <li>• Request their investigation file (FOI)</li>
                  <li>• Gather your own evidence immediately</li>
                  <li>• Secure witness statements supporting you</li>
                  <li>• Obtain vet/behaviourist assessments</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Tribunal Hearing Process</h3>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h4 className="font-bold text-purple-800 mb-3">What Happens at Dangerous Dog Tribunal Hearing:</h4>
              <ol className="text-purple-900 text-sm space-y-2">
                <li><strong>1. Hearing Notice:</strong> You receive notice of hearing date and location (usually municipal office or tribunal).</li>
                <li><strong>2. Municipality Presents Case:</strong> Animal control officer testifies; presents incident evidence, medical records, witness statements.</li>
                <li><strong>3. You Cross-Examine:</strong> Question officer credibility, point out gaps in investigation, challenge evidence.</li>
                <li><strong>4. You Present Defence:</strong> Call witnesses, present expert opinion, show evidence of good behaviour, challenge designation basis.</li>
                <li><strong>5. Hearing Officer Decides:</strong> May dismiss charge, impose muzzle order, or order destruction based on evidence.</li>
                <li><strong>6. Appeal Rights:</strong> Can appeal to court if process was unfair or evidence clearly insufficient.</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Dangerous Dog FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Protect Your Dog's Life</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Dangerous dog hearings can result in destruction. Early legal intervention changes outcomes. Call immediately.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Contact Now</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.smallClaims} />
      </ServicePageLayout>
    </>
  );
}
