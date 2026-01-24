import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, DollarSign, HelpCircle, Home, Clock, AlertCircle, Scale, Users } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function EvictionNonPaymentPage() {
  const authorityItems = [
    { title: 'Non-Payment Defence', description: 'L1 evictions for non-payment have strict procedures. I know the defences that delay or prevent eviction and the options for repaying arrears.' },
    { title: 'Tenant Rights', description: 'You have the right to pay arrears and void the eviction order—even after an order is issued. I ensure you understand all your options.' },
    { title: 'Landlord Representation', description: 'For landlords, I help navigate the L1 process efficiently while ensuring proper procedures are followed.' }
  ];

  const processSteps = [
    { step: '1', title: 'Situation Analysis', description: 'Review the N4 notice, calculate actual arrears, and identify any improper charges.' },
    { step: '2', title: 'Strategy Development', description: 'For tenants: payment plan, void order, defence. For landlords: proper procedure, enforcement.' },
    { step: '3', title: 'LTB Representation', description: 'Represent you at the hearing and work toward the best possible outcome.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Void Rights', description: 'Tenants can void eviction orders by paying arrears—even after the order.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Arrears Verification', description: 'We verify the arrears amount—landlords sometimes include improper charges.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Payment Plans', description: 'Negotiate payment plans that prevent eviction.' }
  ];

  const honestFAQs = [
    { question: "Can I be evicted for owing one month's rent?", answer: "Technically yes, but practically it takes 2-4+ months. The landlord must serve N4, wait 14 days, file L1, wait for hearing (weeks to months), get order, file with Sheriff. You can pay and stop the process at many points." },
    { question: "What is the 'void' period?", answer: "After receiving an eviction order, tenants have 11 days to pay ALL arrears plus costs and void the order. This right exists even after the order is issued. Pay before the Sheriff enforces and you stay." },
    { question: "How long does eviction actually take?", answer: "From N4 to Sheriff enforcement: typically 3-6 months minimum. LTB backlogs mean hearings are delayed. Tenants who engage with the process have more time than those who ignore it." },
    { question: "What if the landlord included improper charges?", answer: "Landlords can only claim lawful rent in arrears. If they included utilities (unless in lease), parking separately charged, or late fees, these may be improper. We verify the actual amount owed." },
    { question: "Can I get a payment plan instead of eviction?", answer: "Yes. LTB can order payment plans, especially for first-time arrears with otherwise good tenants. Plans typically require ongoing rent plus arrears payments. Breaking the plan can result in immediate eviction." },
    { question: "For landlords: How do I get my rent or my unit back?", answer: "File L1 promptly after N4 expires. Proper procedures matter—defective notices cause delays. Even with an order, tenants can void. Focus on getting your money; eviction doesn't always mean you'll collect arrears." }
  ];

  return (
    <>
      <SEO title="Non-Payment Eviction Defence | L1 Eviction Help | Ontario" description="Licensed paralegal for non-payment evictions in Ontario. Tenant defence, void rights, payment plans. Landlord L1 applications. Free consultation." canonical="https://www.legalassist.london/services/eviction-non-payment" />
      <ServicePageLayout seoTitle="Non-Payment Eviction | Ontario" seoDescription="Non-payment eviction help for tenants and landlords." canonical="https://www.legalassist.london/services/eviction-non-payment" problemHeadline="Non-Payment of Rent: Eviction Defence & L1 Applications" problemDescription="Behind on rent? Facing eviction? Or a landlord with a tenant who won't pay? The L1 process has strict rules that protect both parties—understanding them is essential." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Non-payment eviction" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Non-Payment Eviction Timeline</h2>
            
            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">The Reality</h3>
              <p className="text-foreground/80">Non-payment evictions typically take 3-6+ months from start to finish. LTB backlogs and tenant rights mean quick evictions are rare. Both sides should plan accordingly.</p>
            </div>

            {/* Timeline */}
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Stage</th>
                    <th className="px-6 py-4 text-center font-heading">Timeline</th>
                    <th className="px-6 py-4 text-left font-heading">Tenant Options</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">N4 Notice Served</td><td className="px-6 py-4 text-center">Day 0</td><td className="px-6 py-4 text-sm text-green-600">Pay arrears within 14 days to void notice</td></tr>
                  <tr><td className="px-6 py-4 font-medium">L1 Filed</td><td className="px-6 py-4 text-center">Day 15+</td><td className="px-6 py-4 text-sm text-green-600">Pay arrears anytime before order</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Hearing Scheduled</td><td className="px-6 py-4 text-center">4-12 weeks</td><td className="px-6 py-4 text-sm text-green-600">Request payment plan, challenge arrears</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Order Issued</td><td className="px-6 py-4 text-center">Same day</td><td className="px-6 py-4 text-sm text-yellow-600">11 days to pay and void order</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Sheriff Enforcement</td><td className="px-6 py-4 text-center">+2-4 weeks</td><td className="px-6 py-4 text-sm text-red-600">Pay before Sheriff arrives to stay</td></tr>
                </tbody>
              </table>
            </div>

            {/* For Tenants vs Landlords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Users className="w-6 h-6 text-primary" />
                  For Tenants
                </h3>
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-bold text-green-800 mb-2">Your Rights:</h4>
                    <ul className="text-green-900 text-sm space-y-1">
                      <li>• Pay arrears anytime to stop eviction</li>
                      <li>• 11-day void period after order</li>
                      <li>• Request payment plan at hearing</li>
                      <li>• Challenge improper charges</li>
                      <li>• More time if landlord made errors</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-bold text-yellow-800 mb-2">Honest Reality:</h4>
                    <ul className="text-yellow-900 text-sm space-y-1">
                      <li>• Eviction is eventual if you can't pay</li>
                      <li>• Delays buy time, not forgiveness</li>
                      <li>• Arrears judgment follows you</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Home className="w-6 h-6 text-primary" />
                  For Landlords
                </h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-bold text-blue-800 mb-2">Process Requirements:</h4>
                    <ul className="text-blue-900 text-sm space-y-1">
                      <li>• N4 must be perfectly accurate</li>
                      <li>• Wait full 14 days before L1</li>
                      <li>• Include only lawful rent charges</li>
                      <li>• Proper service of all documents</li>
                      <li>• Filing fee: $201</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-bold text-yellow-800 mb-2">Honest Reality:</h4>
                    <ul className="text-yellow-900 text-sm space-y-1">
                      <li>• Process takes months, not weeks</li>
                      <li>• Tenant can void even after order</li>
                      <li>• Collecting arrears is separate battle</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">When to Fight vs. When to Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Fight/Challenge When:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• N4 has wrong amounts</li>
                  <li>• Includes improper charges</li>
                  <li>• Procedural errors by landlord</li>
                  <li>• You can pay if given time</li>
                  <li>• Maintenance issues offset rent</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">Negotiate Payment Plan When:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• Temporary income disruption</li>
                  <li>• Otherwise good tenant history</li>
                  <li>• Can afford ongoing rent + extra</li>
                  <li>• Want to stay in unit</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Plan to Move When:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Can't afford this rent long-term</li>
                  <li>• Significant arrears accumulated</li>
                  <li>• Better to leave on own terms</li>
                  <li>• Can negotiate arrears forgiveness</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Non-Payment FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Facing Non-Payment Issues?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Whether you're a tenant facing eviction or a landlord owed rent, understand your options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
