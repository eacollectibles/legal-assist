import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, FileText, Clock, DollarSign, Scale } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HowToFileLTBPage() {
  const authorityItems = [
    { title: 'LTB Filing Guide', description: 'Step-by-step guide to filing applications at the Landlord and Tenant Board. Know the process before you start.' },
    { title: 'Form Selection', description: 'Different issues require different forms. Using the wrong form means delays or dismissal.' },
    { title: 'When to Get Help', description: 'DIY is possible for simple matters, but complex cases benefit from representation.' }
  ];

  const processSteps = [
    { step: '1', title: 'Identify Issue', description: 'Determine which application type applies.' },
    { step: '2', title: 'Complete Form', description: 'Fill out the correct form with required details.' },
    { step: '3', title: 'File & Serve', description: 'Submit to LTB and serve the other party.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Online Filing', description: 'Most applications can be filed online.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Reasonable Fees', description: 'Filing fees range $53-$201.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Delays Common', description: 'LTB has significant backlogs.' }
  ];

  const honestFAQs = [
    { question: "How do I file an LTB application?", answer: "Online through the Tribunals Ontario portal (tribunalsontario.ca), by mail, fax, or in person. Online is fastest. Create an account, select your application type, complete the form, pay the fee, and submit. You'll receive a file number." },
    { question: "What forms do tenants use?", answer: "T1 (rebate for illegal charges), T2 (rights issues: harassment, entry, maintenance), T5 (bad faith eviction), T6 (maintenance problems). Many tenant applications can be combined on one form if they relate to the same tenancy." },
    { question: "What forms do landlords use?", answer: "L1 (non-payment of rent), L2 (other reasons: interference, damage, illegal activity), L3 (terminate for cause), L4 (end tenancy from void order), L9 (collect arrears after eviction), and others." },
    { question: "How much are the filing fees?", answer: "Tenant applications: $53. Landlord L1: $201. Other landlord applications: $201. Combined applications have combined fees. Fee waiver available if you can't afford to pay." },
    { question: "How long until my hearing?", answer: "Currently 4-8 months for most applications due to backlog. L1 applications (non-payment) can be faster. Urgent matters (illegal lockout, lack of vital services) get expedited hearings." },
    { question: "Should I file myself or hire a paralegal?", answer: "Simple matters (clear non-payment, straightforward maintenance) can be DIY. Complex matters (eviction defences, bad faith claims, multiple issues) benefit from representation. The hearing is adversarial—the other side may have representation." }
  ];

  return (
    <>
      <SEO title="How to File LTB Application Ontario | Landlord Tenant Board Guide" description="Step-by-step guide to filing applications at the Landlord and Tenant Board in Ontario. Forms, fees, process, timelines. Free consultation if you need help." canonical="https://www.legalassist.london/guides/how-to-file-ltb" />
      <ServicePageLayout seoTitle="How to File at the LTB | Ontario" seoDescription="LTB filing guide for Ontario." canonical="https://www.legalassist.london/guides/how-to-file-ltb" problemHeadline="Filing at the Landlord and Tenant Board" problemDescription="Need to file an application at the LTB? This guide walks you through the process—forms, fees, and what to expect. Or let me handle it for you." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "LTB filing" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">LTB Application Guide</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Tenant Applications</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Form</th>
                    <th className="px-6 py-4 text-left font-heading">Purpose</th>
                    <th className="px-6 py-4 text-left font-heading">Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">T1</td><td className="px-6 py-4 text-sm">Rebate for illegal charges (deposits, rent above guideline)</td><td className="px-6 py-4">$53</td></tr>
                  <tr><td className="px-6 py-4 font-medium">T2</td><td className="px-6 py-4 text-sm">Tenant rights (harassment, entry, interference, maintenance)</td><td className="px-6 py-4">$53</td></tr>
                  <tr><td className="px-6 py-4 font-medium">T5</td><td className="px-6 py-4 text-sm">Bad faith eviction (N12/N13 misuse)</td><td className="px-6 py-4">$53</td></tr>
                  <tr><td className="px-6 py-4 font-medium">T6</td><td className="px-6 py-4 text-sm">Maintenance and repair issues</td><td className="px-6 py-4">$53</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Landlord Applications</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Form</th>
                    <th className="px-6 py-4 text-left font-heading">Purpose</th>
                    <th className="px-6 py-4 text-left font-heading">Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">L1</td><td className="px-6 py-4 text-sm">Non-payment of rent</td><td className="px-6 py-4">$201</td></tr>
                  <tr><td className="px-6 py-4 font-medium">L2</td><td className="px-6 py-4 text-sm">Other eviction grounds (N12, N13, N5, N6, N7, N8)</td><td className="px-6 py-4">$201</td></tr>
                  <tr><td className="px-6 py-4 font-medium">L9</td><td className="px-6 py-4 text-sm">Collect arrears after tenant leaves</td><td className="px-6 py-4">$201</td></tr>
                  <tr><td className="px-6 py-4 font-medium">L10</td><td className="px-6 py-4 text-sm">Collect NSF cheque fee</td><td className="px-6 py-4">$201</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Filing Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">1</div>
                <h4 className="font-bold text-foreground mb-2">Complete Form</h4>
                <p className="text-foreground/80 text-sm">Download from tribunalsontario.ca or use online portal</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">2</div>
                <h4 className="font-bold text-foreground mb-2">Pay Fee</h4>
                <p className="text-foreground/80 text-sm">Online, money order, or fee waiver if eligible</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">3</div>
                <h4 className="font-bold text-foreground mb-2">File Application</h4>
                <p className="text-foreground/80 text-sm">Submit online, mail, fax, or in person</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">4</div>
                <h4 className="font-bold text-foreground mb-2">Serve Other Party</h4>
                <p className="text-foreground/80 text-sm">Give copy to other party by required deadline</p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Current LTB Delays</h4>
              <p className="text-yellow-900 text-sm">The LTB has significant backlogs. Expect 4-8 months from filing to hearing for most matters. Plan accordingly. Urgent matters (illegal lockout, no heat/water) can request expedited hearing.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">LTB Filing FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Need Help Filing?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">I can prepare and file your application, or represent you at the hearing.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Consultation</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
