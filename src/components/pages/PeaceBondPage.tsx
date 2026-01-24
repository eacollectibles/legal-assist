import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Shield, FileText, Clock, Scale } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function PeaceBondPage() {
  const authorityItems = [
    { title: 'Peace Bonds', description: 'A peace bond is NOT a criminal conviction. It\'s a promise to keep the peace with conditions. Often offered to resolve charges.' },
    { title: 'Charge Resolution', description: 'Crown may offer a peace bond to withdraw criminal charges. Understanding when to accept is critical.' },
    { title: 'Conditions Matter', description: 'Peace bond conditions can be strict. Negotiating reasonable conditions is part of the process.' }
  ];

  const processSteps = [
    { step: '1', title: 'Assess Offer', description: 'Is a peace bond being offered to resolve charges?' },
    { step: '2', title: 'Review Conditions', description: 'What are you being asked to agree to?' },
    { step: '3', title: 'Accept or Negotiate', description: 'Accept, negotiate conditions, or proceed to trial.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Not Conviction', description: 'No criminal record from peace bond.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Charges Withdrawn', description: 'Criminal charges go away.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Conditions Bind', description: 'Must follow conditions or face charges.' }
  ];

  const honestFAQs = [
    { question: "What is a peace bond?", answer: "A peace bond (section 810 Criminal Code) is a court order to keep the peace and be of good behaviour for up to 12 months. It's NOT a criminal conviction, NOT a guilty plea, and does NOT create a criminal record. It may have conditions like no contact with certain people." },
    { question: "Should I accept a peace bond to resolve my charges?", answer: "Often yes—if the alternative is a criminal trial with conviction risk. A peace bond avoids criminal record, ends the matter, and charges are withdrawn. But evaluate: strength of Crown's case, severity of conditions, impact on your life." },
    { question: "What conditions can a peace bond include?", answer: "Common conditions: keep the peace and be of good behaviour, no contact with specific persons, no weapons, stay away from certain locations, report to police, counselling. Conditions should be reasonable and tailored to the circumstances." },
    { question: "What happens if I breach a peace bond?", answer: "Breach is a criminal offence—up to 4 years imprisonment. This is separate from the original charges (which were withdrawn). Take conditions seriously. If conditions are impossible to follow, negotiate changes before signing." },
    { question: "Will a peace bond show on a background check?", answer: "It's not a criminal record, so it won't appear on standard criminal record checks. However, vulnerable sector checks and some enhanced checks may show it. Police records may retain information about the peace bond." },
    { question: "Can I negotiate the conditions?", answer: "Yes. Peace bond conditions are negotiable. If proposed conditions are too restrictive (e.g., no contact with a co-parent when you share custody), negotiate more reasonable terms. Don't agree to conditions you can't realistically follow." }
  ];

  return (
    <>
      <SEO title="Peace Bond Ontario | Peace Bond vs Criminal Record Explained" description="Licensed paralegal explaining peace bonds in Ontario. Not a criminal conviction, charges withdrawn. When to accept, conditions, breaching. Free consultation." canonical="https://www.legalassist.london/services/peace-bond" />
      <ServicePageLayout seoTitle="Peace Bonds | Ontario" seoDescription="Peace bond help in Ontario." canonical="https://www.legalassist.london/services/peace-bond" problemHeadline="Peace Bonds" problemDescription="Offered a peace bond to resolve criminal charges? This is NOT a conviction and avoids criminal record. I help evaluate offers and negotiate conditions." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Peace bond" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Peace Bonds</h2>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Not a Criminal Conviction
              </h3>
              <p className="text-green-900">A peace bond is NOT a guilty plea, NOT a conviction, and does NOT create a criminal record. You're simply promising to keep the peace and follow certain conditions for up to 12 months.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Peace Bond vs Conviction</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Factor</th>
                    <th className="px-6 py-4 text-left font-heading">Peace Bond</th>
                    <th className="px-6 py-4 text-left font-heading">Criminal Conviction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">Criminal record</td><td className="px-6 py-4 text-green-700 font-bold">NO</td><td className="px-6 py-4 text-red-700 font-bold">YES</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Guilty plea required</td><td className="px-6 py-4 text-green-700 font-bold">NO</td><td className="px-6 py-4 text-red-700 font-bold">YES</td></tr>
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">Charges withdrawn</td><td className="px-6 py-4 text-green-700 font-bold">YES</td><td className="px-6 py-4 text-red-700">NO</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Conditions to follow</td><td className="px-6 py-4">YES (12 months)</td><td className="px-6 py-4">Possibly (probation)</td></tr>
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">Travel/immigration impact</td><td className="px-6 py-4 text-green-700">Minimal</td><td className="px-6 py-4 text-red-700">Significant</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Conditions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6">
                <h4 className="font-bold text-foreground mb-3">Typical Conditions:</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Keep the peace and be of good behaviour</li>
                  <li>• No contact with named persons</li>
                  <li>• Stay away from certain locations</li>
                  <li>• No weapons</li>
                  <li>• Report to police as directed</li>
                  <li>• Attend counselling (anger management, etc.)</li>
                </ul>
              </div>
              <div className="bg-yellow-50 rounded-lg p-6">
                <h4 className="font-bold text-yellow-800 mb-3">Negotiable Points:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• Duration (6 vs 12 months)</li>
                  <li>• Specific contact restrictions</li>
                  <li>• Location restrictions (work, shared spaces)</li>
                  <li>• Reporting frequency</li>
                  <li>• Counselling requirements</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-red-800 mb-2">Breaching is Serious</h4>
              <p className="text-red-900 text-sm">Breaking peace bond conditions is a criminal offence—up to 4 years imprisonment. Before agreeing to conditions, make sure you can actually follow them. If a condition is impossible (no contact with co-parent when you share custody), negotiate before signing.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Peace Bond FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Offered a Peace Bond?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let me help evaluate whether to accept and negotiate reasonable conditions.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get Help Now</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.criminalPOA} />
      </ServicePageLayout>
    </>
  );
}
