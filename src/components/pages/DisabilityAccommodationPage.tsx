import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Heart, Briefcase, Home, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function DisabilityAccommodationPage() {
  const authorityItems = [
    { title: 'Accommodation Rights', description: 'Employers and landlords must accommodate disabilities to the point of undue hardship. I help when they don\'t.' },
    { title: 'HRTO Applications', description: 'I file Human Rights Tribunal applications when accommodation is denied or inadequate.' },
    { title: 'Workplace & Housing', description: 'Disability accommodation applies in employment, housing, services, and other areas.' }
  ];

  const processSteps = [
    { step: '1', title: 'Document Request', description: 'Ensure accommodation request is documented and medical support provided.' },
    { step: '2', title: 'Interactive Process', description: 'Work with employer/landlord to find appropriate accommodation.' },
    { step: '3', title: 'HRTO if Needed', description: 'File Human Rights Tribunal application if accommodation denied.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Duty to Accommodate', description: 'Employers/landlords must accommodate to undue hardship.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Broad Definition', description: 'Disability includes physical, mental, learning, and more.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Remedies Available', description: 'Compensation for injury to dignity, lost wages, and more.' }
  ];

  const honestFAQs = [
    { question: "What counts as a disability under the Human Rights Code?", answer: "Very broad: physical disabilities, mental health conditions, learning disabilities, chronic illnesses, addiction, injuries, and more. You don't need a formal diagnosis—functional limitations are what matter." },
    { question: "What is the duty to accommodate?", answer: "Employers and landlords must take steps to remove barriers and allow you to work/live like others. This can include: modified duties, flexible schedules, equipment, work-from-home, accessible housing features. They must accommodate to 'undue hardship.'" },
    { question: "What is undue hardship?", answer: "The only acceptable reason to not accommodate. Must be real and significant—not just inconvenient or costly. Small employers claiming cost is difficult; large employers almost never succeed with this defence." },
    { question: "What medical documentation do I need?", answer: "Generally: functional limitations and accommodation needs. Employer is NOT entitled to diagnosis, treatment details, or full medical history. A letter stating limitations and required accommodations is usually sufficient." },
    { question: "What if employer says no accommodation is possible?", answer: "They must prove undue hardship. Many employers refuse without properly exploring options. The duty includes creative problem-solving, not just obvious solutions. Refusal without proper process is often discrimination." },
    { question: "What compensation is available at HRTO?", answer: "General damages for injury to dignity ($5,000-$50,000+), lost wages if terminated or hours reduced, and orders requiring accommodation. No cap on damages." }
  ];

  return (
    <>
      <SEO title="Disability Accommodation Paralegal Ontario | HRTO Claims" description="Licensed paralegal for disability accommodation claims in Ontario. Workplace and housing accommodation, duty to accommodate, HRTO applications. Free consultation." canonical="https://www.legalassist.london/services/disability-accommodation" />
      <ServicePageLayout seoTitle="Disability Accommodation | Ontario" seoDescription="Disability accommodation help in Ontario." canonical="https://www.legalassist.london/services/disability-accommodation" problemHeadline="Disability Accommodation Rights" problemDescription="Employer or landlord refusing to accommodate your disability? They have a duty to accommodate to the point of undue hardship. I help enforce that duty." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Disability accommodation" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Disability Accommodation</h2>
            
            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">The Duty to Accommodate</h3>
              <p className="text-foreground/80">Employers, landlords, and service providers must accommodate disabilities to the point of undue hardship. "Inconvenience" or "cost" alone is rarely undue hardship. The bar is high.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What's Protected</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Disabilities Include:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Physical disabilities</li>
                  <li>• Mental health conditions</li>
                  <li>• Learning disabilities</li>
                  <li>• Chronic illness (MS, diabetes, etc.)</li>
                  <li>• Addiction and recovery</li>
                  <li>• Temporary injuries</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <Heart className="w-6 h-6 text-blue-600 mb-2" />
                <h4 className="font-bold text-blue-800 mb-2">Common Accommodations:</h4>
                <ul className="text-blue-900 text-sm space-y-1">
                  <li>• Modified duties or schedules</li>
                  <li>• Work from home options</li>
                  <li>• Adaptive equipment</li>
                  <li>• Medical leave and return-to-work</li>
                  <li>• Accessible housing features</li>
                  <li>• Service animal allowance</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Where Accommodation Applies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6">
                <Briefcase className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Employment</h4>
                <p className="text-foreground/80 text-sm">Employers must accommodate during hiring, employment, and return from leave. Includes modified duties, schedules, equipment, and more.</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <Home className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Housing</h4>
                <p className="text-foreground/80 text-sm">Landlords must accommodate—accessible features, service animals, modifications. Cannot refuse tenancy due to disability.</p>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Medical Documentation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">What You Must Provide:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Functional limitations</li>
                  <li>• Accommodation needs</li>
                  <li>• Expected duration</li>
                  <li>• Prognosis (general)</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">What They Can't Demand:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Specific diagnosis</li>
                  <li>• Treatment details</li>
                  <li>• Complete medical file</li>
                  <li>• Prognosis certainty</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Accommodation FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Accommodation Being Denied?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let's discuss your situation and how to get the accommodation you need.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.humanRights} />
      </ServicePageLayout>
    </>
  );
}
