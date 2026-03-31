import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, DollarSign, HelpCircle, Wrench, Clock, AlertCircle, FileText, Camera } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function MaintenanceRepairsPage() {
  const authorityItems = [
    { title: 'Repair Enforcement', description: 'Landlords must maintain units in good repair. When they don\'t, I help tenants enforce their rights through proper legal channels.' },
    { title: 'Rent Reduction Claims', description: 'Living with unaddressed maintenance issues may entitle you to rent reductions. I help quantify and claim what you\'re owed.' },
    { title: 'Landlord Defence', description: 'For landlords facing T6 applications, I ensure proper response and representation.' }
  ];

  const processSteps = [
    { step: '1', title: 'Document Issues', description: 'Gather evidence—photos, videos, written complaints, landlord responses.' },
    { step: '2', title: 'Proper Notice', description: 'Ensure landlord has been properly notified and given reasonable time to repair.' },
    { step: '3', title: 'T6 Application', description: 'File T6 at LTB seeking repair orders and rent reduction.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Clear Legal Standard', description: 'Landlords must maintain habitable conditions—period.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Rent Reduction Possible', description: 'LTB can order reductions for time spent with issues.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Repair Orders', description: 'LTB can order landlord to complete repairs.' }
  ];

  const honestFAQs = [
    { question: "What repairs is my landlord responsible for?", answer: "Landlords must maintain: heating, plumbing, electrical, structural integrity, appliances provided, common areas, pest control, and comply with all housing standards. The unit must be habitable and in good repair throughout your tenancy." },
    { question: "How much rent reduction can I get?", answer: "Depends on severity and duration. Minor issues (dripping faucet): 5-10%. Moderate issues (broken appliance): 10-25%. Serious issues (no heat, major leak): 25-50%+. Uninhabitable conditions can result in full abatement for affected period." },
    { question: "What if my landlord ignores my complaints?", answer: "Document everything in writing (email/text). Give reasonable time to repair (days for emergencies, weeks for non-urgent). If landlord doesn't respond, file T6 application with LTB. The LTB can order repairs and rent reductions." },
    { question: "Can I withhold rent until repairs are made?", answer: "NO—this is risky and not recommended. Landlord can file L1 for non-payment regardless of repair issues. Pay rent, document issues, and file T6. The LTB will address both rent and repairs properly." },
    { question: "What evidence do I need?", answer: "Photos/videos of issues (with dates), copies of all written complaints, landlord's responses (or lack thereof), any inspection reports, receipts if you paid for emergency repairs, and timeline of how long issues have existed." },
    { question: "What about emergency repairs?", answer: "For emergencies (no heat in winter, major water leak, safety hazards), landlord must respond immediately. If they don't, you can: call city bylaw/property standards, make emergency repairs yourself and deduct from rent (with documentation), or file urgent T6." }
  ];

  return (
    <>
      <SEO title="Maintenance & Repairs Dispute Paralegal | Ontario LTB" description="Licensed paralegal for maintenance and repair disputes in Ontario. T6 applications, rent reduction claims, repair orders. Tenant and landlord representation. Free consultation." canonical="https://www.legalassist.london/services/maintenance-repairs" />
      <ServicePageLayout seoTitle="Maintenance & Repairs Disputes | Ontario" seoDescription="Maintenance and repair dispute help for tenants and landlords." canonical="https://www.legalassist.london/services/maintenance-repairs" problemHeadline="Maintenance & Repair Disputes in Ontario" problemDescription="Landlord ignoring repair requests? Living with broken appliances, leaks, or pest problems? You have rights to a habitable unit—and potential rent reductions." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Maintenance repairs" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Your Right to a Habitable Unit</h2>
            
            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">The Legal Standard</h3>
              <p className="text-foreground/80">Landlords must maintain rental units in a good state of repair, fit for habitation, and complying with all health, safety, housing, and maintenance standards. This obligation exists regardless of the rent amount.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Landlord Must Maintain:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6">
                <Wrench className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Systems & Structure</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Heating (must work Oct-May)</li>
                  <li>• Plumbing (hot/cold water)</li>
                  <li>• Electrical systems</li>
                  <li>• Roof, walls, floors</li>
                  <li>• Windows, doors, locks</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <Wrench className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Appliances & Fixtures</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Stove/oven (if provided)</li>
                  <li>• Refrigerator (if provided)</li>
                  <li>• Smoke/CO detectors</li>
                  <li>• Toilets, sinks, bathtub</li>
                  <li>• Light fixtures</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <Wrench className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">General Maintenance</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Pest control</li>
                  <li>• Common areas</li>
                  <li>• Exterior maintenance</li>
                  <li>• Garbage removal</li>
                  <li>• Snow/ice removal</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Rent Reduction Guidelines</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Issue Severity</th>
                    <th className="px-6 py-4 text-left font-heading">Examples</th>
                    <th className="px-6 py-4 text-center font-heading">Typical Reduction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Minor</td><td className="px-6 py-4 text-sm">Dripping faucet, minor cosmetic issues</td><td className="px-6 py-4 text-center">5-10%</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Moderate</td><td className="px-6 py-4 text-sm">Broken appliance, minor leak, pest issues</td><td className="px-6 py-4 text-center">10-25%</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Serious</td><td className="px-6 py-4 text-sm">No heat, no hot water, major leak, mold</td><td className="px-6 py-4 text-center">25-50%</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Uninhabitable</td><td className="px-6 py-4 text-sm">No utilities, structural danger, severe infestation</td><td className="px-6 py-4 text-center">50-100%</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Before Filing T6</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">You Should Have:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Written complaint to landlord (email/text)</li>
                  <li>• Given reasonable time to repair</li>
                  <li>• Photos/videos with dates</li>
                  <li>• Documentation of all communications</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Avoid:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Withholding rent (risky)</li>
                  <li>• Verbal-only complaints</li>
                  <li>• Making repairs without notice</li>
                  <li>• Abandoning the unit</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Maintenance FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Maintenance Issues Being Ignored?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Document your issues and let's discuss your options for getting repairs done and rent reduced.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
