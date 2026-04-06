import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Clock, Shield, Scale, Phone } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ParkingTicketsPage() {
  const authorityItems = [
    { title: 'Municipal Parking Ticket Defence', description: 'I dispute municipal parking tickets issued by London By-law Services. Most tickets have technical defences.' },
    { title: 'Private Parking Lot Experience', description: 'Private lot tickets are different—they are not binding like municipal tickets. I know the legal differences.' },
    { title: 'High Volume, Cost-Effective', description: 'Parking disputes are straightforward to challenge. We resolve these efficiently with minimal cost.' }
  ];

  const processSteps = [
    { step: '1', title: 'Review the Ticket', description: 'Examine the ticket for signage, meter, location, timing, officer authority.' },
    { step: '2', title: 'Identify Defences', description: 'Improper notice, signage obscured, meter malfunction, emergency, or incorrect bylaw application.' },
    { step: '3', title: 'Dispute or Appeal', description: 'File formal dispute or appeal within the municipal deadline.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'No Criminal Record', description: 'Parking tickets are Provincial Offences—fines only, never a criminal record.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Many Are Beatable', description: 'Signage defects, meter malfunction, procedural errors are common ways to win.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Time Limits Matter', description: 'Act fast—disputes must be filed within strict deadlines.' }
  ];

  const honestFAQs = [
    { question: "What's the difference between a municipal and private parking ticket?", answer: "Municipal tickets are issued by the City of London for violations of parking bylaws. They're legally binding and must be disputed through proper channels. Private lot tickets are issued by lot operators and carry no legal weight—they are contractual, not enforceable in court." },
    { question: "What are common parking violations?", answer: "Exceeding time limits, parking in no-parking zones, blocking fire hydrants, disabled spot without permit, parking on street during snow removal, meter expiration, parking in restricted hours. Each violation has specific bylaw requirements that must be proven." },
    { question: "What counts as a valid defence?", answer: "Improper or illegible signage (common), meter malfunction, temporary emergency (medical, accident), officer didn't see the violation, parking permit not properly checked, time limit not exceeded (clock issues), or you weren't the registered owner." },
    { question: "How do I dispute a municipal parking ticket?", answer: "File a formal dispute request with the Municipal Licensing & Standards office within 15 days of ticket issue. Include the ticket number, reason for dispute, and any supporting evidence. The municipality reviews and issues decision. Can escalate to Justice of the Peace if denied." },
    { question: "What if signage is unclear or missing?", answer: "If signage is obscured, faded, or missing—or in wrong location—the municipality cannot prove you had notice of the restriction. This is one of the strongest defences. Photo evidence of the sign's condition is powerful." },
    { question: "What about meter malfunction or manual overcharge?", answer: "If the meter was broken or ate your money, or the time on the ticket conflicts with meter readings, the ticket is vulnerable. Request meter maintenance records—they are public information and often reveal issues." }
  ];

  return (
    <>
      <SEO title="Parking Ticket Disputes Ontario | London Parking Defence" description="Parking ticket disputes in Ontario. Municipal vs private parking tickets. Dispute process, defences, appeals. Low-cost resolution." canonical="https://www.legalassist.london/services/parking-tickets" />
      <ServicePageLayout seoTitle="Parking Ticket Dispute Defence | Ontario" seoDescription="Parking ticket disputes in Ontario." canonical="https://www.legalassist.london/services/parking-tickets" problemHeadline="Parking Ticket Disputes" problemDescription="Got a municipal parking ticket? Signage issues, meter problems, time limit questions. Many tickets have technical defences. Let's challenge it." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Parking ticket disputes" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>

        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Parking Tickets in Ontario</h2>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">
                <Clock className="w-6 h-6" />
                Time-Sensitive Dispute Deadline
              </h3>
              <p className="text-blue-900">You have 15 days from ticket issue to file a formal dispute. Act quickly—missing this deadline loses your right to challenge the ticket.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Municipal vs Private Parking Tickets</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Feature</th>
                    <th className="px-6 py-4 text-left font-heading">Municipal Ticket</th>
                    <th className="px-6 py-4 text-left font-heading">Private Lot Ticket</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Issued By</td><td className="px-6 py-4 text-sm">City of London By-law Services</td><td className="px-6 py-4 text-sm">Private parking company or lot owner</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Legal Enforceability</td><td className="px-6 py-4 text-sm">Legally binding; can be litigated</td><td className="px-6 py-4 text-sm">Not enforceable in court; contractual only</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Dispute Process</td><td className="px-6 py-4 text-sm">Formal appeal to city; JP review available</td><td className="px-6 py-4 text-sm">No legal process; can be ignored or negotiated</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Response Required</td><td className="px-6 py-4 text-sm">Yes—within 15 days</td><td className="px-6 py-4 text-sm">No legal obligation; company cannot sue</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Parking Violations & Defences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">Violations the City Issues Most:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• Time limit exceeded (parking meter)</li>
                  <li>• No parking/street cleaning zones</li>
                  <li>• Disabled parking space (no permit)</li>
                  <li>• Fire hydrant obstruction (within 1.5m)</li>
                  <li>• Street cleaning hours violation</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Strong Defences to Explore:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Signage obscured, faded, or missing</li>
                  <li>• Meter malfunction (request records)</li>
                  <li>• Medical emergency or disability</li>
                  <li>• Permit holder dispute/proof</li>
                  <li>• Time stamp on ticket incorrect</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">How to Challenge a Municipal Parking Ticket</h3>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h4 className="font-bold text-purple-800 mb-3">Dispute Steps:</h4>
              <ol className="text-purple-900 text-sm space-y-2">
                <li><strong>1. Gather Evidence:</strong> Photos of signage, meter condition, ticket details, any permits or proof of right to park.</li>
                <li><strong>2. File Dispute:</strong> Submit formal request to Municipal Licensing & Standards within 15 days. Include ticket number and reason.</li>
                <li><strong>3. Await City Review:</strong> Municipality reviews dispute; issues acceptance or denial.</li>
                <li><strong>4. Appeal to JP (if denied):</strong> Request hearing before Justice of the Peace within strict timeframe.</li>
                <li><strong>5. JP Hearing:</strong> Present evidence and argument; JP rules on validity of ticket.</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Parking Ticket FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Challenge Your Parking Ticket</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">15-day window to file dispute. Contact us to review your ticket for defences.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Contact Now</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.smallClaims} />
      </ServicePageLayout>
    </>
  );
}
