import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Thermometer, Droplets, Zap, Phone } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function VitalServicesPage() {
  const authorityItems = [
    { title: 'Vital Services', description: 'Landlords must provide heat, electricity, hot/cold water, and fuel. Shutting these off—even for non-payment—is illegal.' },
    { title: 'Emergency Priority', description: 'No heat in winter or no water is an emergency. LTB can schedule urgent hearings for vital services issues.' },
    { title: 'Municipal Enforcement', description: 'Beyond LTB, municipal bylaw enforcement can also act on vital services complaints—sometimes faster.' }
  ];

  const processSteps = [
    { step: '1', title: 'Document Outage', description: 'Photos, temperatures, duration, communication.' },
    { step: '2', title: 'Notify Landlord', description: 'Written notice demanding immediate restoration.' },
    { step: '3', title: 'File T2 or Call Bylaw', description: 'LTB urgent application or municipal enforcement.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Required by Law', description: 'Landlord must provide vital services.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Emergency Remedies', description: 'Urgent hearings available.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Act Fast', description: 'Health/safety at risk—don\'t delay.' }
  ];

  const honestFAQs = [
    { question: "What are 'vital services'?", answer: "Under the RTA: heat, electricity, hot and cold water, and fuel (if landlord provides it). These must be supplied continuously. Landlord cannot shut them off for any reason—not even unpaid rent or to force you out." },
    { question: "What temperature must my apartment be?", answer: "Ontario municipalities set minimum temperatures, typically 20-21°C during heating season (usually Sept 15 - June 1). If your unit is below this, the landlord is in violation. Document temperature with a thermometer—photos with timestamps." },
    { question: "My landlord says utilities are included but shut off my hydro. Is that legal?", answer: "No. If utilities are included in rent, landlord cannot shut them off. Even if you're behind on rent, cutting utilities is illegal. This is treated as seriously as an illegal lockout." },
    { question: "What if the utility company shut off service, not the landlord?", answer: "If landlord is responsible for paying utilities (included in rent) and service was cut for non-payment, landlord is still responsible. If you pay utilities directly and they're cut for your non-payment, that's between you and the utility." },
    { question: "What can I do immediately if I have no heat/water?", answer: "Document the situation. Notify landlord in writing demanding immediate restoration. Call municipal bylaw enforcement (property standards). File urgent T2 at LTB. In extreme cases (winter, vulnerable persons), emergency services may assist." },
    { question: "What compensation can I get?", answer: "Rent abatement for period without services, out-of-pocket costs (space heater, bottled water, alternative accommodation), general damages for inconvenience and health impact. Longer and more severe interruptions = higher damages." }
  ];

  return (
    <>
      <SEO title="Vital Services Tenant Rights Ontario | No Heat No Water Help" description="Licensed paralegal for vital services issues in Ontario. No heat, no water, utilities shut off. Emergency LTB applications. Free consultation." canonical="https://www.legalassist.london/services/vital-services" />
      <ServicePageLayout seoTitle="Vital Services | Ontario" seoDescription="Vital services tenant help in Ontario." canonical="https://www.legalassist.london/services/vital-services" problemHeadline="Vital Services" problemDescription="No heat? No water? Utilities shut off? Landlords must provide vital services. I help get them restored and get compensation for the disruption." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Vital services" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Vital Services</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What's Covered</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <Thermometer className="w-10 h-10 text-primary mx-auto mb-3" />
                <h4 className="font-bold text-foreground">Heat</h4>
                <p className="text-foreground/70 text-sm">20-21°C minimum during heating season</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <Zap className="w-10 h-10 text-primary mx-auto mb-3" />
                <h4 className="font-bold text-foreground">Electricity</h4>
                <p className="text-foreground/70 text-sm">Must be continuous if included</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <Droplets className="w-10 h-10 text-primary mx-auto mb-3" />
                <h4 className="font-bold text-foreground">Water</h4>
                <p className="text-foreground/70 text-sm">Hot and cold running water</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <Thermometer className="w-10 h-10 text-primary mx-auto mb-3" />
                <h4 className="font-bold text-foreground">Fuel</h4>
                <p className="text-foreground/70 text-sm">If landlord supplies it</p>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-12">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3">Cannot Be Shut Off For Any Reason</h3>
              <p className="text-red-900">Even if you owe rent, even if you've violated the lease, even if the landlord wants you out—vital services cannot be intentionally interrupted. This is treated as seriously as illegal lockout.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Immediate Action Steps</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Action</th>
                    <th className="px-6 py-4 text-left font-heading">How</th>
                    <th className="px-6 py-4 text-left font-heading">Timeline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Document</td><td className="px-6 py-4 text-sm">Photos, temperature readings, timestamps</td><td className="px-6 py-4 text-sm">Immediately</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Notify Landlord</td><td className="px-6 py-4 text-sm">Written demand for restoration (text/email)</td><td className="px-6 py-4 text-sm">Same day</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Call Bylaw</td><td className="px-6 py-4 text-sm">Municipal property standards enforcement</td><td className="px-6 py-4 text-sm">If not restored in 24h</td></tr>
                  <tr><td className="px-6 py-4 font-medium">File T2</td><td className="px-6 py-4 text-sm">LTB application, request urgent hearing</td><td className="px-6 py-4 text-sm">If ongoing</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Compensation Available</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">You Can Claim:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Rent abatement (% of rent for disruption)</li>
                  <li>• Space heaters, fans, bottled water costs</li>
                  <li>• Alternative accommodation if uninhabitable</li>
                  <li>• Spoiled food from power outage</li>
                  <li>• General damages for stress/inconvenience</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">Keep Records:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• Receipts for all emergency purchases</li>
                  <li>• Photos showing problem and dates</li>
                  <li>• Written communications with landlord</li>
                  <li>• Any medical impacts documented</li>
                  <li>• Bylaw officer reports</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Vital Services FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">No Heat or Water?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">This is an emergency. Contact me for urgent help.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get Emergency Help</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
