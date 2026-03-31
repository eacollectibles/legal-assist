import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, FileText, Shield, Clock, Scale } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function RecordSuspensionPage() {
  const authorityItems = [
    { title: 'Record Suspensions', description: 'Formerly called "pardons," record suspensions seal your criminal record from most background checks. Fresh start opportunity.' },
    { title: 'Waiting Periods', description: 'Summary offences: 5 years. Indictable offences: 10 years. Period starts after sentence completion (fines paid, probation done).' },
    { title: 'Not Automatic', description: 'You must apply and pay fees ($50 filing + $657.77 processing). Process takes 6-12+ months. Worth it for employment, travel.' }
  ];

  const processSteps = [
    { step: '1', title: 'Confirm Eligibility', description: 'Waiting period complete? No new charges?' },
    { step: '2', title: 'Gather Documents', description: 'Court records, RCMP fingerprints, ID.' },
    { step: '3', title: 'Apply to PBC', description: 'Submit application to Parole Board of Canada.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Record Sealed', description: 'Won\'t show on most checks.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Employment Help', description: 'Opens job opportunities.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Not Deleted', description: 'Record exists, just sealed.' }
  ];

  const honestFAQs = [
    { question: "What's the difference between a pardon and record suspension?", answer: "Same thing—different name. 'Pardon' was renamed 'record suspension' in 2012. It seals your criminal record so it doesn't appear on most background checks. The record still exists but is set aside." },
    { question: "How long do I have to wait to apply?", answer: "Summary conviction offences: 5 years. Indictable offences: 10 years. The waiting period starts when your sentence is COMPLETE—after fines paid, probation/parole finished, not from conviction date." },
    { question: "What does a record suspension actually do?", answer: "It seals your record from most CPIC (police database) searches. Standard criminal record checks won't show it. However: US border agents may still see it, vulnerable sector checks may reveal it, and it can be revoked if you reoffend." },
    { question: "Will I be able to travel to the US with a record suspension?", answer: "Maybe not. The US doesn't recognize Canadian record suspensions. US border agents have their own records and may still see your conviction. You may need a US Entry Waiver separately. A record suspension helps in Canada, not necessarily at the US border." },
    { question: "What offences are NOT eligible?", answer: "Sexual offences against minors (Schedule 1) are permanently ineligible. Offences with sentences of 2+ years (life, indefinite) require longer waits or may be ineligible. Terrorism and organized crime offences have restrictions." },
    { question: "How long does the application take?", answer: "Currently 6-12+ months for processing once submitted. Plus time to gather documents (court records, fingerprints, references) beforehand. Total process often takes 12-18 months from start to approval." }
  ];

  return (
    <>
      <SEO title="Record Suspension Paralegal Ontario | Pardon Application Help" description="Criminal record suspension (pardon) help in Ontario. Seal your record, improve employment. 5-10 year waiting periods. Application assistance. Free consultation." canonical="https://www.legalassist.london/services/record-suspension" />
      <ServicePageLayout seoTitle="Record Suspensions (Pardons) | Ontario" seoDescription="Record suspension help in Ontario." canonical="https://www.legalassist.london/services/record-suspension" problemHeadline="Record Suspensions" problemDescription="Want to seal your criminal record? Record suspensions (formerly pardons) can help with employment and move past your conviction. I help with applications." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Record suspension" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Record Suspensions</h2>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Fresh Start
              </h3>
              <p className="text-green-900">A record suspension seals your criminal record from standard background checks. Employers doing regular criminal record checks won't see your conviction. This opens doors that were previously closed.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Waiting Periods</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Offence Type</th>
                    <th className="px-6 py-4 text-left font-heading">Waiting Period</th>
                    <th className="px-6 py-4 text-left font-heading">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Summary conviction</td><td className="px-6 py-4 font-bold">5 years</td><td className="px-6 py-4 text-sm">After sentence complete</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Indictable offence</td><td className="px-6 py-4 font-bold">10 years</td><td className="px-6 py-4 text-sm">After sentence complete</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Sexual offences (minors)</td><td className="px-6 py-4 text-red-700 font-bold">Ineligible</td><td className="px-6 py-4 text-sm">Permanently ineligible</td></tr>
                </tbody>
              </table>
              <p className="text-foreground/70 text-sm mt-2">"Sentence complete" means: fines paid, probation/parole finished, all conditions satisfied.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What It Does (and Doesn't) Do</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Record Suspension DOES:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Seal record from standard CPIC checks</li>
                  <li>• Help with employment (most jobs)</li>
                  <li>• Remove barrier for volunteering</li>
                  <li>• Improve rental applications</li>
                  <li>• Restore peace of mind</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Record Suspension DOES NOT:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Delete the record (still exists, just sealed)</li>
                  <li>• Guarantee US border entry</li>
                  <li>• Hide from vulnerable sector checks</li>
                  <li>• Protect if you reoffend (can be revoked)</li>
                  <li>• Erase civil consequences</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">US Travel Warning</h4>
              <p className="text-yellow-900 text-sm">The US does NOT recognize Canadian record suspensions. US Customs and Border Protection has their own records and may deny entry based on your conviction even with a record suspension. You may need a separate US Entry Waiver.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Record Suspension FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Ready to Move Forward?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let me help you apply for a record suspension and start fresh.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get Started</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.criminalPOA} />
      </ServicePageLayout>
    </>
  );
}
