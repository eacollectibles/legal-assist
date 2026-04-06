import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Home, DollarSign, Shield, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function IllegalRentIncreasePage() {
  const authorityItems = [
    { title: 'Illegal Rent Increases', description: 'Ontario has rent control rules. Increases above the guideline, without proper notice, or too frequently are illegal. You can recover excess rent.' },
    { title: 'Guideline Limits', description: '2024 guideline is 2.5%. Landlord cannot increase more than this without LTB approval (AGI). Many tenants pay illegal increases unknowingly.' },
    { title: 'Recovery Available', description: 'If you\'ve paid illegal rent increases, you can apply to the LTB to recover the excess. One-year limit to file, but can recover amounts paid.' }
  ];

  const processSteps = [
    { step: '1', title: 'Check Increase', description: 'Was it above guideline? Proper notice?' },
    { step: '2', title: 'Calculate Excess', description: 'How much more than legal have you paid?' },
    { step: '3', title: 'File T1', description: 'LTB application to recover illegal rent.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Rent Control Exists', description: 'Guideline limits increases.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Recovery Possible', description: 'Get back excess paid.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Exemptions Exist', description: 'Not all units are controlled.' }
  ];

  const honestFAQs = [
    { question: "What is the rent increase guideline?", answer: "The provincial guideline is the maximum percentage a landlord can increase rent without LTB approval. 2024: 2.5%. 2023: 2.5%. Previous years varied. Increases above this require an Above Guideline Increase (AGI) application and LTB approval." },
    { question: "Is my unit covered by rent control?", answer: "Most units are covered EXCEPT: units first occupied after November 15, 2018 (not previously occupied as residential). If your unit was first rented out after that date and wasn't converted from another use, rent control may not apply. Check your building's history." },
    { question: "What notice must landlord give for rent increase?", answer: "90 days written notice using the N1 form, specifying the new rent amount and effective date. Increases can only happen once every 12 months. Without proper notice, the increase is void." },
    { question: "I've been paying an illegal increase. Can I get money back?", answer: "Yes—file a T1 application at the LTB. You can recover illegal rent paid in the year before your application. If you paid $100/month extra illegally for 12 months, you could recover $1,200. Act within the 1-year limit." },
    { question: "My landlord raised rent more than once this year. Is that allowed?", answer: "No. Rent can only be increased once every 12 months. Even if the landlord gave proper notice both times, the second increase is illegal if it's within 12 months of the last one." },
    { question: "Landlord says my unit isn't rent controlled. How do I verify?", answer: "Check when the unit was first occupied as residential rental. If before November 15, 2018, it's controlled. Ask the landlord for documentation. If they can't prove the exemption, assume it's controlled. The LTB can determine if disputed." }
  ];

  return (
    <>
      <SEO title="Illegal Rent Increase Paralegal Ontario | Recover Excess Rent" description="Landlord raised rent illegally in Ontario? Above guideline, no notice, too frequent. Recover excess rent through LTB. Paralegal help. Free consultation." canonical="https://www.legalassist.london/services/illegal-rent-increase" />
      <ServicePageLayout seoTitle="Illegal Rent Increases | Ontario" seoDescription="Illegal rent increase help in Ontario." canonical="https://www.legalassist.london/services/illegal-rent-increase" problemHeadline="Illegal Rent Increases" problemDescription="Landlord raised your rent above the guideline? Without proper notice? You may be paying illegally and can recover the excess." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Illegal rent increase" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Rent Control</h2>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Rent Increase Rules
              </h3>
              <p className="text-green-900">In rent-controlled units, landlord can only increase rent by the annual guideline (2.5% for 2024) without LTB approval. Increases must have 90 days notice, use proper form, and happen no more than once per year.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What Makes an Increase Illegal?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">ILLEGAL Increases:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Above guideline without AGI approval</li>
                  <li>• Less than 90 days notice</li>
                  <li>• Wrong or no notice form (N1)</li>
                  <li>• Second increase within 12 months</li>
                  <li>• No notice at all</li>
                  <li>• Verbal notice only</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">LEGAL Increases:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• At or below guideline percentage</li>
                  <li>• 90+ days written notice on N1 form</li>
                  <li>• At least 12 months since last increase</li>
                  <li>• AGI-approved amount above guideline</li>
                  <li>• Non-controlled unit (post-Nov 2018)</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Rent Increase Guidelines</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Year</th>
                    <th className="px-6 py-4 text-left font-heading">Guideline</th>
                    <th className="px-6 py-4 text-left font-heading">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">2024</td><td className="px-6 py-4 font-bold">2.5%</td><td className="px-6 py-4 text-sm">Current guideline</td></tr>
                  <tr><td className="px-6 py-4 font-medium">2023</td><td className="px-6 py-4 font-bold">2.5%</td><td className="px-6 py-4 text-sm">Capped at 2.5%</td></tr>
                  <tr><td className="px-6 py-4 font-medium">2022</td><td className="px-6 py-4 font-bold">1.2%</td><td className="px-6 py-4 text-sm">—</td></tr>
                  <tr><td className="px-6 py-4 font-medium">2021</td><td className="px-6 py-4 font-bold">0%</td><td className="px-6 py-4 text-sm">COVID freeze</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Recovering Illegal Rent</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-8">
              <p className="text-foreground/80 mb-3">To recover excess rent paid:</p>
              <ol className="text-foreground/80 space-y-2">
                <li><span className="font-bold">1.</span> Calculate the legal rent (last legal rent + guideline increases only)</li>
                <li><span className="font-bold">2.</span> Compare to what you've been paying</li>
                <li><span className="font-bold">3.</span> Calculate the difference × months paid</li>
                <li><span className="font-bold">4.</span> File T1 application at LTB within 1 year</li>
                <li><span className="font-bold">5.</span> Bring evidence: leases, rent receipts, N1 notices (or lack thereof)</li>
              </ol>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">One-Year Limit</h4>
              <p className="text-yellow-900 text-sm">You can only recover illegal rent paid in the 12 months before you file your T1 application. Don't delay—every month you wait is a month of excess rent you can't recover.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Rent Increase FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Suspect an Illegal Rent Increase?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let me review your rent history and help you recover what you're owed.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
