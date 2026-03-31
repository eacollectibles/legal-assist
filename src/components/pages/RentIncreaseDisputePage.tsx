import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, DollarSign, Calendar, Calculator, Shield } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function RentIncreaseDisputePage() {
  const authorityItems = [
    { title: 'Rent Increase Rules', description: 'Ontario limits when and how much landlords can increase rent. I help tenants challenge illegal increases.' },
    { title: 'Guideline Knowledge', description: 'The 2025 rent increase guideline is 2.5%. Most landlords cannot exceed this without LTB approval.' },
    { title: 'AGI Defence', description: 'Landlords seeking Above Guideline Increases face strict requirements. I help tenants challenge these.' }
  ];

  const processSteps = [
    { step: '1', title: 'Review Increase', description: 'Is it within guideline? Proper notice? Rent-controlled unit?' },
    { step: '2', title: 'Challenge If Invalid', description: 'Don\'t pay illegal increases—dispute at LTB.' },
    { step: '3', title: 'Recover Overpayments', description: 'Get back rent you paid that you shouldn\'t have.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Strong Protections', description: 'Most Ontario tenants have rent control.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Recovery Available', description: 'Overpaid rent can be recovered.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: '2.5% Maximum', description: '2025 guideline is 2.5% (no AGI).' }
  ];

  const honestFAQs = [
    { question: "How much can my landlord increase rent in 2025?", answer: "The 2025 guideline is 2.5%. Most landlords cannot increase more than this without applying to the LTB for an Above Guideline Increase. The increase can only happen once per 12 months with proper 90-day notice." },
    { question: "Is my unit rent-controlled?", answer: "Most units occupied before November 15, 2018 are rent-controlled. Units first occupied after that date are generally exempt from rent control. This is about when the unit was first rented, not when you moved in." },
    { question: "What if my landlord is increasing rent more than the guideline?", answer: "They need LTB approval through an Above Guideline Increase (AGI) application. Without approval, the excess is illegal. You can refuse to pay the illegal portion and/or apply to recover what you've overpaid." },
    { question: "What notice is required for rent increases?", answer: "90 days written notice on proper form (N1 or N2). The increase can only happen once per 12 months. If you didn't get proper notice, the increase is invalid." },
    { question: "My landlord says I signed a new lease with higher rent.", answer: "If you're in a rent-controlled unit, signing a new lease doesn't change rent increase rules. The landlord still needs to follow guideline limits. 'Agreement' to pay illegal rent doesn't make it legal." },
    { question: "Can I recover rent I overpaid?", answer: "Yes—apply to the LTB to recover the illegal portion. There's a 1-year limit on how far back you can recover, so act quickly." }
  ];

  return (
    <>
      <SEO title="Rent Increase Dispute Paralegal Ontario | Illegal Rent Increase" description="Licensed paralegal for rent increase disputes in Ontario. Challenge illegal increases, recover overpaid rent. 2025 guideline is 2.5%. Free consultation." canonical="https://www.legalassist.london/services/rent-increase-dispute" />
      <ServicePageLayout seoTitle="Rent Increase Disputes | Ontario" seoDescription="Rent increase dispute help in Ontario." canonical="https://www.legalassist.london/services/rent-increase-dispute" problemHeadline="Rent Increase Disputes" problemDescription="Landlord raising rent above the guideline? Didn't give proper notice? You may not have to pay. I help tenants challenge illegal rent increases." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Rent increase disputes" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Ontario Rent Increase Rules</h2>
            
            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">2025 Rent Increase Guideline: 2.5%</h3>
              <p className="text-foreground/80">This is the maximum most landlords can increase rent without LTB approval. Your landlord needs to apply for an Above Guideline Increase to go higher—and tenants can challenge those applications.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Requirements for Valid Rent Increase</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Valid Increase Requires:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• 90 days written notice (minimum)</li>
                  <li>• Proper form (N1 or N2)</li>
                  <li>• 12 months since last increase</li>
                  <li>• At or below guideline (or AGI approved)</li>
                  <li>• 12 months since you moved in</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Invalid If:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Less than 90 days notice</li>
                  <li>• Wrong form or no form</li>
                  <li>• Less than 12 months since last increase</li>
                  <li>• Above guideline without LTB approval</li>
                  <li>• Less than 12 months since tenancy started</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Rent Control: Does It Apply to You?</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Situation</th>
                    <th className="px-6 py-4 text-center font-heading">Rent Controlled?</th>
                    <th className="px-6 py-4 text-left font-heading">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4">Unit first occupied before Nov 15, 2018</td><td className="px-6 py-4 text-center text-green-600 font-bold">YES</td><td className="px-6 py-4 text-sm">Guideline applies</td></tr>
                  <tr><td className="px-6 py-4">Unit first occupied after Nov 15, 2018</td><td className="px-6 py-4 text-center text-red-600 font-bold">NO*</td><td className="px-6 py-4 text-sm">*Some exceptions</td></tr>
                  <tr><td className="px-6 py-4">Non-profit/social housing</td><td className="px-6 py-4 text-center text-green-600 font-bold">YES</td><td className="px-6 py-4 text-sm">Different rules may apply</td></tr>
                  <tr><td className="px-6 py-4">Commercial unit or new construction</td><td className="px-6 py-4 text-center text-red-600 font-bold">NO</td><td className="px-6 py-4 text-sm">Exempt from RTA</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Don't Just Pay an Illegal Increase</h4>
              <p className="text-yellow-900 text-sm">If your increase is above guideline with no AGI approval, or the notice is defective, you don't have to pay the increase. Contact me to assess whether your increase is legal before you pay.</p>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Rent Increase Seems Wrong?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Bring me the notice and let me check if it's legal before you pay.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
