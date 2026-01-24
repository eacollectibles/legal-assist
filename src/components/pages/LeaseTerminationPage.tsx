import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Calendar, FileText, Home, DoorOpen } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function LeaseTerminationPage() {
  const authorityItems = [
    { title: 'Ending Your Lease', description: 'There are right ways and wrong ways to end a lease in Ontario. I help you do it properly to avoid liability.' },
    { title: 'Notice Requirements', description: 'Different situations require different notice periods and forms. Get it wrong and you may owe rent.' },
    { title: 'Early Termination', description: 'Need out before your lease ends? There are options—assignment, N9/N11, or special circumstances.' }
  ];

  const processSteps = [
    { step: '1', title: 'Review Situation', description: 'Fixed-term vs month-to-month? Special circumstances?' },
    { step: '2', title: 'Give Proper Notice', description: 'Right form, right timing, right method.' },
    { step: '3', title: 'Clean Exit', description: 'Move out properly to get deposit back and avoid disputes.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Month-to-Month', description: '60 days notice to end of month.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Assignment Option', description: 'Can assign lease mid-term.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Special Circumstances', description: 'Domestic violence, care facility exit options.' }
  ];

  const honestFAQs = [
    { question: "How much notice do I need to give?", answer: "Month-to-month tenancy: 60 days notice, ending on the last day of a rental period. Fixed-term lease: you can give 60 days notice to end on or after the lease end date. Giving notice mid-lease doesn't end your obligation." },
    { question: "I'm in a fixed-term lease and need to leave early. What are my options?", answer: "Options: (1) Assign your lease to someone else (landlord can only refuse for valid reasons), (2) Negotiate mutual termination (N11) with landlord, (3) Special circumstances (domestic violence, care facility). Simply leaving makes you liable for rent until landlord re-rents or lease ends." },
    { question: "What if my landlord won't agree to let me leave?", answer: "You have the RIGHT to assign your lease. If landlord refuses unreasonably, you can give 30 days notice and leave without liability. 'I don't allow assignments' is not a valid reason to refuse." },
    { question: "What form do I use to give notice?", answer: "N9 form for ending tenancy (60 days). N11 for mutual agreement (any date both agree). If landlord gave you an N12 or N13, you have special rights to give short notice." },
    { question: "My lease says I need to give more than 60 days notice.", answer: "Unenforceable. The RTA sets 60 days as the notice period. Lease clauses requiring more notice are void. However, it's best to follow the process properly to avoid disputes." },
    { question: "Do I get my last month's rent deposit back?", answer: "No—it's applied to your final month's rent. If you paid first and last, your last month should be covered. You shouldn't have paid any other deposits (they're illegal)." }
  ];

  return (
    <>
      <SEO title="Lease Termination Paralegal Ontario | End Tenancy Properly" description="Licensed paralegal for lease termination in Ontario. Proper notice, early termination options, assignment rights. End your lease without liability." canonical="https://www.legalassist.london/services/lease-termination" />
      <ServicePageLayout seoTitle="Lease Termination | Ontario" seoDescription="Lease termination help in Ontario." canonical="https://www.legalassist.london/services/lease-termination" problemHeadline="Ending Your Lease" problemDescription="Need to end your tenancy? Do it wrong and you could owe months of rent. I help you exit properly—whether at lease end or early." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Lease termination" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">How to End Your Tenancy</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Notice Requirements</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Situation</th>
                    <th className="px-6 py-4 text-center font-heading">Notice Required</th>
                    <th className="px-6 py-4 text-left font-heading">Termination Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Month-to-month</td><td className="px-6 py-4 text-center">60 days</td><td className="px-6 py-4 text-sm">Last day of rental period</td></tr>
                  <tr><td className="px-6 py-4 font-medium">End of fixed-term</td><td className="px-6 py-4 text-center">60 days</td><td className="px-6 py-4 text-sm">On or after lease end date</td></tr>
                  <tr><td className="px-6 py-4 font-medium">After receiving N12</td><td className="px-6 py-4 text-center">10 days</td><td className="px-6 py-4 text-sm">Earlier date if you choose</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Landlord unreasonably refuses assignment</td><td className="px-6 py-4 text-center">30 days</td><td className="px-6 py-4 text-sm">After refusal notice</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Domestic violence (N15)</td><td className="px-6 py-4 text-center">28 days</td><td className="px-6 py-4 text-sm">Any date at least 28 days out</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Early Termination Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6">
                <DoorOpen className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Assignment (Best Option)</h4>
                <p className="text-foreground/80 text-sm mb-3">Find someone to take over your lease. They become the tenant; you're out with no further liability.</p>
                <ul className="text-foreground/70 text-sm space-y-1">
                  <li>✓ Landlord can only refuse for valid reasons</li>
                  <li>✓ If refused unreasonably, you can leave with 30 days notice</li>
                  <li>✓ No liability after assignment completes</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <FileText className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">N11 Mutual Agreement</h4>
                <p className="text-foreground/80 text-sm mb-3">If landlord agrees, you can end on any date you both choose.</p>
                <ul className="text-foreground/70 text-sm space-y-1">
                  <li>✓ No notice period required</li>
                  <li>✓ Can be immediate if both agree</li>
                  <li>• Landlord not obligated to agree</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h4 className="font-bold text-red-800 mb-2">Warning: Just Leaving Doesn't End Your Obligation</h4>
              <p className="text-red-900 text-sm">If you leave mid-lease without proper termination, you remain liable for rent until the landlord re-rents the unit or your lease ends—whichever comes first. The landlord must try to re-rent, but you're still on the hook until they do.</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-bold text-green-800 mb-2">Your Right to Assign</h4>
              <p className="text-green-900 text-sm">Landlords cannot unreasonably refuse an assignment. Valid refusal reasons: prospective tenant has poor rental history, can't afford rent, or gave false information. Invalid: "I don't allow assignments," wanting to raise rent, or no reason at all.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Lease Termination FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Need to End Your Lease?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let's figure out the best way to exit without liability.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
