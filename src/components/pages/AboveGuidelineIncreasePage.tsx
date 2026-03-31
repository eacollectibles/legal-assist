import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, DollarSign, HelpCircle, TrendingUp, Calculator, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function AboveGuidelineIncreasePage() {
  const authorityItems = [
    { title: 'AGI Defence', description: 'Above Guideline Increases must meet strict requirements. I challenge improper AGIs and ensure landlords prove their costs.' },
    { title: 'Cost Verification', description: 'Landlords must document capital expenditures or extraordinary costs. I review their evidence and identify weaknesses.' },
    { title: 'Tenant Organizing', description: 'AGIs affect all tenants in a building. I help tenants organize effective responses together.' }
  ];

  const processSteps = [
    { step: '1', title: 'Application Review', description: 'Analyze the landlord\'s L5 application and supporting documentation.' },
    { step: '2', title: 'Evidence Challenge', description: 'Identify unsupported claims, improper costs, and documentation issues.' },
    { step: '3', title: 'LTB Representation', description: 'Represent tenants at the hearing and challenge the proposed increase.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Strict Requirements', description: 'AGIs must be proven with documentation—not assumed.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Challenge Opportunity', description: 'Tenants have the right to contest and cross-examine.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Phased Increases', description: 'Even approved AGIs are limited to 3% per year above guideline.' }
  ];

  const honestFAQs = [
    { question: "What is an Above Guideline Increase (AGI)?", answer: "An AGI allows landlords to increase rent beyond the annual guideline (2.5% in 2025) for: capital expenditures (major repairs/upgrades), extraordinary utility costs, or operating costs for eligible security services. Landlords must apply to the LTB and prove their costs." },
    { question: "What are the limits on AGIs?", answer: "Maximum 3% above guideline per year for capital expenditures, plus additional amounts for utilities/security. Even if approved for more, increases are phased over multiple years. Total increase cannot exceed guideline + 3% annually." },
    { question: "How can I challenge an AGI?", answer: "Attend the hearing and: dispute whether costs are eligible capital expenditures, challenge documentation/receipts, argue costs were normal maintenance (not AGI-eligible), show work wasn't completed as claimed, or demonstrate costs were inflated." },
    { question: "What costs don't qualify for AGI?", answer: "Normal maintenance and repairs (painting, minor fixes), work required due to landlord neglect, upgrades primarily for landlord benefit (like adding units), cosmetic improvements, and costs not adequately documented." },
    { question: "What if I can't afford the increase?", answer: "AGI approval doesn't mean you must accept it silently. Challenge the application, negotiate payment timing, and if approved, understand it's phased. Financial hardship alone doesn't defeat an AGI, but documentation issues might." },
    { question: "Should I organize with other tenants?", answer: "Yes—AGIs affect the whole building. Organized tenants share hearing costs, present unified challenges, and have more impact. Even if you can't stop the AGI entirely, collective action often reduces the approved amount." }
  ];

  return (
    <>
      <SEO title="Above Guideline Increase Defence | AGI Challenge Ontario" description="Licensed paralegal challenging Above Guideline Rent Increases in Ontario. AGI defence, L5 application response, tenant organizing. Free consultation." canonical="https://www.legalassist.london/services/above-guideline-increase" />
      <ServicePageLayout seoTitle="Above Guideline Increase Defence | Ontario" seoDescription="Challenging Above Guideline Rent Increases in Ontario." canonical="https://www.legalassist.london/services/above-guideline-increase" problemHeadline="Above Guideline Increase (AGI) Defence" problemDescription="Landlord applying for a rent increase beyond the guideline? AGIs have strict requirements. Challenge the application and ensure they prove every dollar." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Above guideline increase defence" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding AGIs</h2>
            
            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                2025 Rent Increase Guideline: 2.5%
              </h3>
              <p className="text-foreground/80">Landlords can increase rent by 2.5% annually without LTB approval. AGIs allow increases ABOVE this—but only with LTB approval and documented costs.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What Qualifies for AGI?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">May Qualify:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Roof replacement</li>
                  <li>• Elevator modernization</li>
                  <li>• Boiler/HVAC replacement</li>
                  <li>• Parking garage repairs</li>
                  <li>• Extraordinary utility cost increases</li>
                  <li>• Eligible security services</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Does NOT Qualify:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Normal maintenance (painting, minor repairs)</li>
                  <li>• Work to fix landlord neglect</li>
                  <li>• Upgrades for landlord benefit</li>
                  <li>• Cosmetic improvements</li>
                  <li>• Undocumented costs</li>
                  <li>• Work not completed as claimed</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">AGI Limits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <Calculator className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-2">3%</div>
                <p className="text-foreground/80 font-medium">Max Above Guideline</p>
                <p className="text-sm text-foreground/60">Per year for capital costs</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <TrendingUp className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-2">5.5%</div>
                <p className="text-foreground/80 font-medium">Max Total (2025)</p>
                <p className="text-sm text-foreground/60">Guideline + AGI</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <FileText className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-2">Phased</div>
                <p className="text-foreground/80 font-medium">Multi-Year</p>
                <p className="text-sm text-foreground/60">Large increases spread out</p>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">How to Challenge an AGI</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h4 className="font-bold text-yellow-800 mb-3">Challenge Strategies:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-yellow-900 text-sm">
                <ul className="space-y-2">
                  <li>✓ Demand detailed documentation/receipts</li>
                  <li>✓ Challenge whether work was "capital" vs maintenance</li>
                  <li>✓ Verify work was actually completed as claimed</li>
                </ul>
                <ul className="space-y-2">
                  <li>✓ Check if costs were inflated</li>
                  <li>✓ Argue work was needed due to landlord neglect</li>
                  <li>✓ Organize with other tenants for unified response</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-bold text-green-800 mb-3">Tenant Organizing Power</h4>
              <p className="text-green-900 text-sm">AGIs affect everyone in the building. Organized tenants can: share legal costs, present unified evidence, cross-examine landlord witnesses together, and often achieve better outcomes than tenants acting alone. Even if the AGI is partially approved, collective action frequently reduces the approved amount.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">AGI FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Facing an AGI Application?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Don't let landlords increase your rent without proving their costs. Let's review the application.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
