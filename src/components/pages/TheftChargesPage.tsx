import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, ShoppingBag, Scale, Shield, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function TheftChargesPage() {
  const authorityItems = [
    { title: 'Theft Under $5,000', description: 'I defend theft under $5,000 charges (summary conviction). For theft over $5,000 or complex cases, I provide lawyer referrals.' },
    { title: 'Shoplifting Defence', description: 'Most theft under charges are shoplifting. First-time offenders often have options to avoid criminal records.' },
    { title: 'Diversion Programs', description: 'Many jurisdictions offer diversion for first-time, low-value theft—completing the program means no conviction.' }
  ];

  const processSteps = [
    { step: '1', title: 'Assess Charge', description: 'Theft under (paralegal) vs theft over (lawyer required).' },
    { step: '2', title: 'Explore Options', description: 'Diversion, peace bond, negotiated plea, or trial.' },
    { step: '3', title: 'Minimize Impact', description: 'Avoid criminal record where possible.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Diversion Available', description: 'First offenders may avoid conviction.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Peace Bonds', description: 'Alternative resolution without conviction.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Over $5,000', description: 'Requires criminal defence lawyer.' }
  ];

  const honestFAQs = [
    { question: "What's the difference between theft under and theft over $5,000?", answer: "Theft under $5,000 is a hybrid offence often proceeded summarily—paralegals can defend these. Theft over $5,000 is more serious, can be indictable, and requires a criminal defence lawyer. The value of items allegedly taken determines which charge applies." },
    { question: "Will I get a criminal record for shoplifting?", answer: "If convicted, yes. However, first-time offenders with low-value theft often qualify for diversion programs or peace bonds that result in no criminal record if completed successfully. This is why getting help early matters." },
    { question: "What is diversion?", answer: "A program where you complete community service, make restitution, or attend counselling instead of going through trial. If you complete diversion successfully, charges are withdrawn—no trial, no conviction, no record. Not everyone qualifies." },
    { question: "I was caught but the store let me go. Am I still charged?", answer: "Stores often detain, take your information, and let you go. Police may still charge you later based on the store's report. If you haven't heard anything in a few months, you may be clear—but consult if uncertain." },
    { question: "What about the civil demand letter from the store?", answer: "Stores often send civil recovery letters demanding $200-500. This is separate from criminal charges. Paying doesn't make criminal charges go away, and not paying doesn't affect criminal case. Get advice before paying." },
    { question: "What are the actual penalties for theft under $5,000?", answer: "Maximum: 2 years less a day jail (summary). Typical first offence with small value: discharge (no record), diversion, or small fine. Repeat offenders or higher values face harsher sentences. Employment and travel implications are often worse than the sentence itself." }
  ];

  return (
    <>
      <SEO title="Theft Under $5000 Defence Paralegal Ontario | Shoplifting Charges" description="Licensed paralegal defending theft under $5,000 and shoplifting charges in Ontario. Diversion programs, avoid criminal record. Free consultation." canonical="https://www.legalassist.london/services/theft-charges" />
      <ServicePageLayout seoTitle="Theft Under $5,000 Defence | Ontario" seoDescription="Theft and shoplifting defence in Ontario." canonical="https://www.legalassist.london/services/theft-charges" problemHeadline="Theft Under $5,000 / Shoplifting" problemDescription="Charged with theft or shoplifting? A criminal record can devastate your employment and travel. I help first-time offenders explore options to avoid conviction." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Theft charges" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Theft Charges</h2>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                Paralegal vs. Lawyer
              </h3>
              <p className="text-yellow-900">I can defend theft under $5,000 (summary conviction). Theft over $5,000, or any theft proceeded by indictment, requires a criminal defence lawyer. I provide referrals for cases outside paralegal scope.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Resolution Options</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Option</th>
                    <th className="px-6 py-4 text-left font-heading">What Happens</th>
                    <th className="px-6 py-4 text-center font-heading">Criminal Record?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">Diversion</td><td className="px-6 py-4 text-sm">Complete program, charges withdrawn</td><td className="px-6 py-4 text-center text-green-600 font-bold">NO</td></tr>
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">Peace Bond</td><td className="px-6 py-4 text-sm">Agree to conditions, charges withdrawn</td><td className="px-6 py-4 text-center text-green-600 font-bold">NO</td></tr>
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">Absolute Discharge</td><td className="px-6 py-4 text-sm">Found guilty but no conviction registered</td><td className="px-6 py-4 text-center text-green-600 font-bold">NO*</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Conditional Discharge</td><td className="px-6 py-4 text-sm">Probation period, then no conviction</td><td className="px-6 py-4 text-center text-yellow-600 font-bold">Temporary</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Conviction</td><td className="px-6 py-4 text-sm">Found guilty, conviction registered</td><td className="px-6 py-4 text-center text-red-600 font-bold">YES</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Who Qualifies for Diversion?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Good Candidates:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• First-time offenders</li>
                  <li>• Low-value items</li>
                  <li>• No violence involved</li>
                  <li>• Accept responsibility</li>
                  <li>• Willing to make restitution</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Usually Won't Qualify:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Prior criminal record</li>
                  <li>• High-value theft</li>
                  <li>• Organized or planned theft</li>
                  <li>• Violence or threats used</li>
                  <li>• Breach of trust (employee theft)</li>
                </ul>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h4 className="font-bold text-foreground mb-2">The Real Consequences</h4>
              <p className="text-foreground/80 text-sm">A theft conviction affects more than just the sentence. Criminal record checks for employment, volunteer work, professional licensing, and US travel (NEXUS, border crossing) all surface theft convictions. Avoiding the record is often more important than avoiding a fine.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Theft Charge FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Facing Theft Charges?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let's explore your options to avoid a criminal record. Free consultation.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get Help Now</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.criminal} />
      </ServicePageLayout>
    </>
  );
}
