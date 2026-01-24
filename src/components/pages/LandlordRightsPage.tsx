import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Home, DollarSign, FileText, Scale, Users } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function LandlordRightsPage() {
  const authorityItems = [
    { title: 'Landlord Representation', description: 'I help landlords navigate the LTB process to address problem tenants while following proper procedures.' },
    { title: 'Eviction Applications', description: 'Non-payment, damage, interference, illegal acts—I prepare and prosecute eviction applications.' },
    { title: 'Compliance Focus', description: 'The LTB dismisses improperly filed applications. I ensure your applications are done right the first time.' }
  ];

  const processSteps = [
    { step: '1', title: 'Proper Notice', description: 'Correct form, proper service, right timeline.' },
    { step: '2', title: 'LTB Application', description: 'File application with required evidence.' },
    { step: '3', title: 'Hearing', description: 'Present case and obtain order.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Legal Eviction Rights', description: 'You can evict for valid reasons with proper process.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Rent Arrears Recovery', description: 'Collect unpaid rent through LTB orders.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Process Matters', description: 'Shortcuts lead to dismissed applications.' }
  ];

  const honestFAQs = [
    { question: "What are valid reasons to evict a tenant?", answer: "Non-payment of rent (most common), persistent late payment, damage to unit, illegal activity, interference with other tenants, too many occupants, landlord's own use (N12), renovations requiring vacancy (N13). Each has specific requirements." },
    { question: "How long does eviction take?", answer: "Non-payment: 2-4 months if tenant doesn't pay during process. Other causes: 3-6 months. Tenant can delay by requesting adjournments. The LTB is backlogged. Plan for longer timelines." },
    { question: "Can I just change the locks if they don't pay?", answer: "No. Illegal lockouts can result in the LTB ordering you to pay the tenant thousands in compensation. Only the Sheriff can enforce an eviction order. Self-help remedies are prohibited." },
    { question: "What if the tenant pays after I file for eviction?", answer: "For non-payment (L1), if tenant pays all arrears and costs before the hearing, you must accept it and can't evict. If they pay at the hearing, LTB usually gives them a chance. Persistent late payment (N8/L2) is different—pattern matters." },
    { question: "Can I refuse to renew a lease?", answer: "No. In Ontario, tenancies automatically continue month-to-month. You can't just refuse to renew. You need a valid eviction ground or the tenant must choose to leave." },
    { question: "What about problem tenants who don't pay but won't leave?", answer: "File L1 for arrears. If they void it by paying, and they're persistently late, serve N8 and file L2. Document the pattern. Multiple late payments can eventually support eviction even if they eventually pay each time." }
  ];

  return (
    <>
      <SEO title="Landlord Rights Paralegal Ontario | Eviction Help for Landlords" description="Licensed paralegal helping Ontario landlords with evictions, rent arrears, problem tenants. LTB applications done right. Free consultation." canonical="https://www.legalassist.london/services/landlord-rights" />
      <ServicePageLayout seoTitle="Landlord Rights | Ontario" seoDescription="Landlord rights and eviction help in Ontario." canonical="https://www.legalassist.london/services/landlord-rights" problemHeadline="Landlord Representation" problemDescription="Problem tenant not paying rent? Causing damage? Disturbing others? I help landlords navigate the LTB process properly to protect your investment." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Landlord rights" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Eviction Grounds & Process</h2>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                Process Matters More Than You Think
              </h3>
              <p className="text-yellow-900">The LTB dismisses applications with improper notices, wrong forms, or procedural errors. Getting it right the first time saves months. Never attempt illegal lockouts or utility shutoffs.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Eviction Grounds</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Reason</th>
                    <th className="px-6 py-4 text-left font-heading">Notice Form</th>
                    <th className="px-6 py-4 text-left font-heading">Application</th>
                    <th className="px-6 py-4 text-left font-heading">Typical Timeline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Non-payment of rent</td><td className="px-6 py-4">N4</td><td className="px-6 py-4">L1</td><td className="px-6 py-4 text-sm">2-4 months</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Persistently late rent</td><td className="px-6 py-4">N8</td><td className="px-6 py-4">L2</td><td className="px-6 py-4 text-sm">3-5 months</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Damage to unit</td><td className="px-6 py-4">N5</td><td className="px-6 py-4">L2</td><td className="px-6 py-4 text-sm">3-5 months</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Interference with others</td><td className="px-6 py-4">N5</td><td className="px-6 py-4">L2</td><td className="px-6 py-4 text-sm">3-5 months</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Landlord's own use</td><td className="px-6 py-4">N12</td><td className="px-6 py-4">L2</td><td className="px-6 py-4 text-sm">3-6 months</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Major renovations</td><td className="px-6 py-4">N13</td><td className="px-6 py-4">L2</td><td className="px-6 py-4 text-sm">4-6 months</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What You Cannot Do</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Prohibited Actions:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Change locks without Sheriff order</li>
                  <li>• Shut off utilities</li>
                  <li>• Remove tenant's belongings</li>
                  <li>• Harass tenant to leave</li>
                  <li>• Refuse to do repairs as leverage</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Legal Options:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Proper notice and LTB application</li>
                  <li>• Negotiate cash-for-keys agreement</li>
                  <li>• Pursue arrears at LTB or Small Claims</li>
                  <li>• Document everything for hearing</li>
                  <li>• Use Sheriff to enforce eviction order</li>
                </ul>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h4 className="font-bold text-foreground mb-2">The Reality of Eviction Timelines</h4>
              <p className="text-foreground/80 text-sm">The LTB is backlogged. Even straightforward non-payment cases take 2-4 months. Contested cases take longer. Tenants can sometimes delay with adjournment requests. Build these timelines into your planning.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Landlord FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Problem Tenant?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let's discuss your options and start the process properly.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
