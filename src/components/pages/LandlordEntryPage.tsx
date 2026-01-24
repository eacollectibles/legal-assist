import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Home, Clock, Shield, Key } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function LandlordEntryPage() {
  const authorityItems = [
    { title: 'Entry Rights & Limits', description: 'Landlords can\'t just enter whenever they want. Ontario law requires proper notice and valid reasons for entry.' },
    { title: '24-Hour Written Notice', description: 'For most entries, landlord must give 24 hours written notice specifying the reason and time of entry.' },
    { title: 'Harassment by Entry', description: 'Excessive or improper entry can constitute harassment. You have remedies at the LTB.' }
  ];

  const processSteps = [
    { step: '1', title: 'Know the Rules', description: 'When can landlord legally enter?' },
    { step: '2', title: 'Document Violations', description: 'Log improper entries with dates/times.' },
    { step: '3', title: 'File T2 if Pattern', description: 'LTB application for harassment/interference.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Notice Required', description: '24 hours for most entries.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Remedies Available', description: 'LTB can order damages.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Some Exceptions', description: 'Emergency entry is allowed.' }
  ];

  const honestFAQs = [
    { question: "When can my landlord enter my unit?", answer: "With 24-hour written notice for: repairs, inspections, showing to prospective tenants/buyers (reasonable hours only, 8am-8pm). Without notice only for: emergencies (fire, flood, gas leak), tenant consent at the time, or if lease allows entry for cleaning if you don't." },
    { question: "What counts as proper notice?", answer: "Written notice (not just verbal), given at least 24 hours before entry, stating the reason for entry and the time of entry (between 8am-8pm). A text or email can count if that's your normal communication method." },
    { question: "Can my landlord show my unit to prospective tenants anytime?", answer: "No. Showings require 24-hour notice AND can only be during reasonable hours (8am-8pm). You can't unreasonably refuse, but landlord can't demand entry at inconvenient times or show the unit excessively." },
    { question: "My landlord keeps entering without notice. What can I do?", answer: "Document every incident: date, time, who entered, what notice was given. Send written complaint to landlord. If pattern continues, file T2 application at LTB for interference with reasonable enjoyment. You can get damages and an order to stop." },
    { question: "Can I change my locks to keep the landlord out?", answer: "You can change locks but must provide landlord with a key (they have right of entry with proper notice). Refusing to provide a key is a lease violation. But landlord cannot change YOUR locks without your consent." },
    { question: "Landlord entered and took/moved my belongings. Is that legal?", answer: "No. Even with valid entry, landlord cannot remove or interfere with your belongings (except emergency situations). This may constitute illegal interference, theft, or harassment. Document and file T2 application." }
  ];

  return (
    <>
      <SEO title="Landlord Entry Rights Ontario | When Can Landlord Enter Unit" description="Know your rights about landlord entry in Ontario. 24-hour notice required, valid reasons, remedies for illegal entry. Paralegal help available." canonical="https://www.legalassist.london/services/landlord-entry" />
      <ServicePageLayout seoTitle="Landlord Entry Rights | Ontario" seoDescription="Landlord entry rights in Ontario." canonical="https://www.legalassist.london/services/landlord-entry" problemHeadline="Landlord Entry Rights" problemDescription="Landlord entering without notice? Showing your unit constantly? Ontario law limits when and how landlords can enter. Know your rights." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Landlord entry" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">When Landlord Can Enter</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Entry Rules Summary</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Reason</th>
                    <th className="px-6 py-4 text-left font-heading">Notice Required</th>
                    <th className="px-6 py-4 text-left font-heading">Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Repairs</td><td className="px-6 py-4">24 hours written</td><td className="px-6 py-4 text-sm">8am-8pm</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Inspection</td><td className="px-6 py-4">24 hours written</td><td className="px-6 py-4 text-sm">8am-8pm</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Showing to buyers/tenants</td><td className="px-6 py-4">24 hours written</td><td className="px-6 py-4 text-sm">8am-8pm</td></tr>
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">Emergency</td><td className="px-6 py-4 text-green-700 font-bold">None required</td><td className="px-6 py-4 text-sm">Any time</td></tr>
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">Tenant consents at time</td><td className="px-6 py-4 text-green-700 font-bold">None required</td><td className="px-6 py-4 text-sm">As agreed</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What's NOT Allowed</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Illegal Entry:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Entry without any notice</li>
                  <li>• Entry before 8am or after 8pm</li>
                  <li>• Entry for no valid reason</li>
                  <li>• Excessive showings (harassment)</li>
                  <li>• Taking or moving your belongings</li>
                  <li>• Bringing unnecessary people</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Your Rights:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Demand written notice</li>
                  <li>• Refuse improper entry attempts</li>
                  <li>• Be present during entry</li>
                  <li>• Object to unreasonable times</li>
                  <li>• File T2 for pattern violations</li>
                  <li>• Seek damages for harassment</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
              <h4 className="font-bold text-yellow-800 mb-2">What's an "Emergency"?</h4>
              <p className="text-yellow-900 text-sm">True emergencies: fire, flood, gas leak, someone in medical distress. NOT emergencies: landlord wants to check something, forgot to give notice, it's "convenient" now. Landlord can't manufacture emergencies to bypass notice requirements.</p>
            </div>

            <div className="bg-primary/5 rounded-lg p-6">
              <Key className="w-8 h-8 text-primary mb-3" />
              <h4 className="font-bold text-foreground mb-2">Document Everything</h4>
              <p className="text-foreground/80 text-sm">If landlord is entering improperly, keep a log: date, time, notice given (or not), who entered, what they did. This evidence supports a T2 application for harassment or interference with reasonable enjoyment.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Landlord Entry FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Landlord Entering Improperly?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Document the pattern and let me help you enforce your rights.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get Help</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
