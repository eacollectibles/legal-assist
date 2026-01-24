import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, DollarSign, HelpCircle, Home, Clock, AlertCircle, Hammer, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function N13RenovationEvictionPage() {
  const authorityItems = [
    { title: 'N13 Defence', description: 'N13 "renoviction" notices have strict requirements that landlords frequently fail to meet. I know how to challenge improper renovation evictions.' },
    { title: 'Right of First Refusal', description: 'You have the right to return to your unit at the same rent after renovations. I ensure landlords honor this obligation.' },
    { title: 'Compensation Enforcement', description: 'N13s require significant compensation. I ensure you receive everything owed and pursue bad faith claims when warranted.' }
  ];

  const processSteps = [
    { step: '1', title: 'N13 Analysis', description: 'Review permits, scope of work, and vacancy requirement to assess legitimacy.' },
    { step: '2', title: 'Defence Strategy', description: 'Challenge validity, negotiate better terms, or prepare for return rights.' },
    { step: '3', title: 'LTB Representation', description: 'Represent you at hearing and protect your rights throughout.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Permit Verification', description: 'Landlords must have actual permits—we verify.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Right to Return', description: 'You can return at the same rent after renovations.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Compensation Required', description: '3 months rent OR equivalent unit during renovations.' }
  ];

  const honestFAQs = [
    { question: "What is an N13 notice?", answer: "An N13 is for renovations or repairs so extensive that the unit must be vacant. The landlord must have building permits requiring vacancy, give 120 days notice, offer right of first refusal to return, and provide compensation (3 months rent or equivalent unit)." },
    { question: "How do I know if the N13 is legitimate?", answer: "Landlord must have: 1) Building permits requiring vacancy (not just 'convenience'), 2) Actual plans for substantial work, 3) Work that genuinely can't be done with you there. Cosmetic renovations, painting, flooring replacement typically don't qualify." },
    { question: "What compensation am I owed?", answer: "Either 3 months' rent OR a comparable unit at the same rent during renovations. If landlord offers equivalent unit and you decline, you only get moving expenses. The 3-month compensation is the default if no equivalent unit offered." },
    { question: "What is right of first refusal?", answer: "After renovations, landlord must offer you the unit at the SAME RENT before renting to anyone else. If they re-rent without offering you first, or at higher rent, that's bad faith—file T5 for up to 12 months compensation." },
    { question: "What are red flags for fake renovictions?", answer: "No actual permits, 'permits pending', minor/cosmetic work, work that could be done with tenant present, multiple N13s in same building, rent significantly below market, landlord recently purchased building, similar unit listed at higher rent." },
    { question: "What if they don't let me return?", answer: "If landlord doesn't offer your unit back, re-rents to someone else, or offers at higher rent—file T5 application for bad faith. Compensation up to 12 months rent. Document everything and monitor the unit after you leave." }
  ];

  return (
    <>
      <SEO title="N13 Renoviction Defence Paralegal | Renovation Eviction Ontario" description="Licensed paralegal defending against N13 renovation evictions in Ontario. Permit verification, right of return, compensation enforcement. Free consultation." canonical="https://www.legalassist.london/services/n13-renovation-eviction" />
      <ServicePageLayout seoTitle="N13 Renovation Eviction Defence | Ontario" seoDescription="Defending against N13 renovation evictions in Ontario." canonical="https://www.legalassist.london/services/n13-renovation-eviction" problemHeadline="N13 'Renoviction' Defence in Ontario" problemDescription="Received an N13 notice for renovations? These are heavily abused to displace tenants. Strict permit requirements, right of return, and significant compensation protect you." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "N13 renovation eviction defence" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding N13 Requirements</h2>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2">
                <Hammer className="w-6 h-6" />
                Renovictions Are Frequently Abused
              </h3>
              <p className="text-yellow-900">N13s have strict requirements that landlords often fail to meet. The work must genuinely require vacancy, permits must be obtained, and you have the right to return at the same rent.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <Clock className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-2">120 Days</div>
                <p className="text-foreground/80 font-medium">Minimum Notice</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <DollarSign className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-2">3 Months</div>
                <p className="text-foreground/80 font-medium">Rent Compensation</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <FileText className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-2">Permits</div>
                <p className="text-foreground/80 font-medium">Required (Not Pending)</p>
              </div>
              <div className="bg-green-50 rounded-lg p-6 text-center">
                <Home className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-green-700 mb-2">Return</div>
                <p className="text-green-800 font-medium">Same Rent Guaranteed</p>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What Work Qualifies for N13?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">May Qualify:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Complete plumbing replacement</li>
                  <li>• Structural work requiring permits</li>
                  <li>• Electrical system overhaul</li>
                  <li>• Asbestos/mold remediation requiring vacancy</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Does NOT Qualify:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Painting, cosmetic updates</li>
                  <li>• Flooring replacement</li>
                  <li>• Kitchen/bathroom upgrades</li>
                  <li>• Work that could be done with tenant present</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Your Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Challenge at LTB When:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• No actual permits</li>
                  <li>• Work doesn't require vacancy</li>
                  <li>• Bad faith indicators present</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">Negotiate When:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• N13 appears legitimate</li>
                  <li>• Want guaranteed return terms</li>
                  <li>• Want more compensation</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <Home className="w-6 h-6 text-blue-600 mb-2" />
                <h4 className="font-bold text-blue-800 mb-2">Exercise Return Rights:</h4>
                <ul className="text-blue-900 text-sm space-y-1">
                  <li>• Monitor unit after renovations</li>
                  <li>• File T5 if return denied</li>
                  <li>• Up to 12 months compensation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">N13 FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Received an N13 Notice?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Don't assume it's valid. Let's verify the permits and protect your rights.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
