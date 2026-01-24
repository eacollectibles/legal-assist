import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, DollarSign, Clock, FileText, Shield } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function RentArrearsPage() {
  const authorityItems = [
    { title: 'Rent Arrears Defence', description: 'Behind on rent? You have rights. Landlords must follow proper process, and you can often stop eviction by paying arrears.' },
    { title: 'Void the Notice', description: 'You can "void" an N4 notice by paying all arrears before the eviction hearing—stopping the eviction entirely.' },
    { title: 'Payment Plans', description: 'Even at hearing, the LTB often orders payment plans rather than immediate eviction, especially for first-time issues.' }
  ];

  const processSteps = [
    { step: '1', title: 'Review N4', description: 'Check amounts, dates, and calculations.' },
    { step: '2', title: 'Calculate True Arrears', description: 'What do you actually owe (minus deposits, errors)?' },
    { step: '3', title: 'Pay or Negotiate', description: 'Void by paying, or prepare for hearing.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Can Void Notice', description: 'Pay arrears to stop eviction.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Payment Plans', description: 'LTB often allows time to pay.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Time Critical', description: 'Act quickly once N4 received.' }
  ];

  const honestFAQs = [
    { question: "I got an N4 notice for rent arrears. What do I do?", answer: "First, verify the amounts—landlords sometimes make errors. You have 14 days from the termination date to pay ALL arrears (rent + NSF fees if applicable) to 'void' the notice and stop eviction. If you can't pay everything, prepare for the hearing." },
    { question: "Can I stop the eviction by paying before the hearing?", answer: "Yes—this is called 'voiding' the notice. Pay all arrears in full any time before the LTB issues an eviction order, and the eviction stops. Even at the hearing itself, if you can pay everything, the application should be dismissed." },
    { question: "I can't pay everything at once. What are my options?", answer: "At the hearing, you can request a payment plan (Section 83 relief). Explain your circumstances, propose a realistic plan, and the LTB may order a conditional eviction—meaning eviction is delayed/cancelled if you follow the payment plan." },
    { question: "The N4 amount is wrong. What do I do?", answer: "Document the correct amounts. At hearing, show your payment records, receipts, and calculations. If the N4 overstates arrears, it may be defective. Even if not dismissed, you only owe what's actually owed—not the inflated amount." },
    { question: "Landlord won't accept my payment. Now what?", answer: "Document your attempts to pay. If landlord refuses payment to push through eviction, this is bad faith and the LTB takes it seriously. Bring evidence of refused payments to the hearing—it may result in dismissal or conditional order." },
    { question: "What happens at the L1 hearing?", answer: "Landlord presents arrears claim, you respond with defences or payment ability. Possible outcomes: dismissed (if paid or defective), standard order (11 days to pay or vacate), conditional order (payment plan), or eviction order. You can request relief based on circumstances." }
  ];

  return (
    <>
      <SEO title="Rent Arrears Defence Ontario | N4 Notice Help" description="Behind on rent in Ontario? Licensed paralegal helps defend rent arrears cases. Void N4 notice, payment plans, LTB hearings. Free consultation." canonical="https://www.legalassist.london/services/rent-arrears" />
      <ServicePageLayout seoTitle="Rent Arrears Defence | Ontario" seoDescription="Rent arrears defence in Ontario." canonical="https://www.legalassist.london/services/rent-arrears" problemHeadline="Rent Arrears Defence" problemDescription="Behind on rent? Got an N4 notice? You can often stop eviction by paying arrears, or get a payment plan at the hearing. Don't give up." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Rent arrears" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Rent Arrears Process</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">The N4/L1 Timeline</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <ol className="text-foreground/80 space-y-3">
                <li><span className="font-bold">Day 1:</span> Rent due but unpaid</li>
                <li><span className="font-bold">Day 2+:</span> Landlord can serve N4 notice (14-day termination for most tenancies)</li>
                <li><span className="font-bold">Day 14:</span> N4 termination date passes</li>
                <li><span className="font-bold">After Day 14:</span> Landlord can file L1 application at LTB</li>
                <li><span className="font-bold">Weeks later:</span> LTB hearing scheduled</li>
                <li><span className="font-bold">At hearing:</span> Order issued (standard, conditional, or dismissed)</li>
                <li><span className="font-bold">After order:</span> Sheriff enforcement if not complied with</li>
              </ol>
              <p className="text-foreground/70 text-sm mt-4">Key point: You can void by paying arrears any time before the eviction order is issued.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Your Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Void the Notice</h4>
                <p className="text-green-900 text-sm">Pay ALL arrears before eviction order is issued. Application dismissed, tenancy continues.</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <Clock className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">Request Payment Plan</h4>
                <p className="text-yellow-900 text-sm">Ask LTB for conditional order with time to pay. Must show ability to catch up while paying ongoing rent.</p>
              </div>
              <div className="bg-primary/5 border border-border rounded-lg p-6">
                <Shield className="w-6 h-6 text-primary mb-2" />
                <h4 className="font-bold text-foreground mb-2">Challenge the N4</h4>
                <p className="text-foreground/80 text-sm">If amounts are wrong or landlord made errors, the notice may be defective.</p>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Defences to Rent Arrears</h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Defence</th>
                    <th className="px-6 py-4 text-left font-heading">When It Applies</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Paid/voided</td><td className="px-6 py-4 text-sm">You paid all arrears before hearing</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Incorrect amount</td><td className="px-6 py-4 text-sm">N4 overstates what you owe</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Rent abatement</td><td className="px-6 py-4 text-sm">Maintenance issues reduce rent owed</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Refused payment</td><td className="px-6 py-4 text-sm">Landlord wouldn't accept your payment</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Defective notice</td><td className="px-6 py-4 text-sm">Wrong dates, missing information</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Section 83 Relief</h4>
              <p className="text-yellow-900 text-sm">Even if you owe rent, the LTB can delay or deny eviction based on your circumstances: health issues, children in home, financial hardship, first-time arrears. Explain your situation and show you can catch up.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Rent Arrears FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Facing Eviction for Rent Arrears?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">You have options. Let me help you understand them.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get Help Now</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
