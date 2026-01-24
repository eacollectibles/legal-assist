import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Car, Shield, DollarSign, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HandicappedParkingPage() {
  const authorityItems = [
    { title: 'Accessible Parking Tickets', description: 'Parked in accessible spot without permit? Using someone else\'s permit? These fines are steep—$300-$500—but defences exist.' },
    { title: 'Permit Issues', description: 'Many tickets involve permit display issues—not properly visible, expired, wrong vehicle. These are often defensible.' },
    { title: 'Municipal Variations', description: 'Fines vary by municipality. Some charge $300, others $450+. The good news: no demerit points.' }
  ];

  const processSteps = [
    { step: '1', title: 'Review Ticket', description: 'What exactly is the violation?' },
    { step: '2', title: 'Check Permit Status', description: 'Valid permit with display issue, or no permit?' },
    { step: '3', title: 'Fight or Pay', description: 'Defences depend on circumstances.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'No Demerit Points', description: 'Parking violations don\'t add points.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Defences Exist', description: 'Permit issues often defensible.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'High Fines', description: '$300-$500+ depending on municipality.' }
  ];

  const honestFAQs = [
    { question: "What's the fine for parking in an accessible spot without a permit?", answer: "Varies by municipality: typically $300-$500. Toronto is $450, some smaller municipalities are $300-350. No demerit points, but it's one of the highest parking fines. Worth fighting if you have a defence." },
    { question: "I have a permit but forgot to display it. Can I fight the ticket?", answer: "Yes—this is the most common successful defence. Bring your valid permit to court showing it was valid on the ticket date. Many municipalities will withdraw or reduce if you prove you had a valid permit. Act quickly." },
    { question: "I was using my family member's permit while driving them. Is that legal?", answer: "The permit holder must be in the vehicle OR being picked up/dropped off. If you parked in an accessible spot and the permit holder wasn't with you and wasn't being transported, that's misuse of the permit—a valid ticket." },
    { question: "The accessible parking sign was hard to see. Is that a defence?", answer: "Possibly. If signage was obscured, missing, or confusing, document it with photos. The space must be properly marked. However, the blue paint and symbol on the ground usually make this defence difficult unless signage was truly inadequate." },
    { question: "Can I get the fine reduced if I pay quickly?", answer: "Some municipalities offer early payment discounts. But if you have a valid defence (like permit display issue), fighting may eliminate the fine entirely. Don't pay just because it's easier without assessing your defence options." },
    { question: "Someone else was driving my car and got this ticket. Am I responsible?", answer: "The registered owner receives parking tickets regardless of who was driving. You can pursue the driver privately, but you're responsible for the ticket. Fight if there's a defence; pay if there isn't." }
  ];

  return (
    <>
      <SEO title="Accessible Parking Ticket Defence Ontario | Handicapped Parking Violation" description="Accessible parking ticket in Ontario? $300-$500 fine but no points. Permit display defences, sign issues. Paralegal help. Free consultation." canonical="https://www.legalassist.london/services/handicapped-parking" />
      <ServicePageLayout seoTitle="Accessible Parking Tickets | Ontario" seoDescription="Accessible parking ticket defence in Ontario." canonical="https://www.legalassist.london/services/handicapped-parking" problemHeadline="Accessible Parking Tickets" problemDescription="Got a ticket for parking in an accessible spot? These fines are steep—$300-$500—but permit display issues and signage problems can be valid defences." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Accessible parking" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Accessible Parking Violations</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Violations</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Violation</th>
                    <th className="px-6 py-4 text-left font-heading">Typical Fine</th>
                    <th className="px-6 py-4 text-left font-heading">Best Defence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">No permit displayed</td><td className="px-6 py-4">$300-$500</td><td className="px-6 py-4 text-sm">Had valid permit, forgot to display</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Expired permit</td><td className="px-6 py-4">$300-$500</td><td className="px-6 py-4 text-sm">Renewal in progress, administrative delay</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Using another's permit (misuse)</td><td className="px-6 py-4">$300-$500</td><td className="px-6 py-4 text-sm">Permit holder was being transported</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Parked in access aisle</td><td className="px-6 py-4">$300-$500</td><td className="px-6 py-4 text-sm">Markings unclear, signage missing</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Defence Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Strong Defences:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Had valid permit, failed to display</li>
                  <li>• Permit renewal was pending</li>
                  <li>• Signage missing or obscured</li>
                  <li>• Permit holder was in vehicle</li>
                  <li>• Permit holder being picked up/dropped off</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Weak Defences:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• "Only parked for a minute"</li>
                  <li>• "No other spots available"</li>
                  <li>• "Didn't see the sign" (usually visible)</li>
                  <li>• Using permit without holder present</li>
                  <li>• Using deceased person's permit</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
              <h4 className="font-bold text-green-800 mb-2">No Demerit Points</h4>
              <p className="text-green-900 text-sm">Unlike moving violations, accessible parking tickets don't add demerit points to your licence. This is purely a fine issue. However, $300-$500 is significant—worth fighting if you have grounds.</p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Bring Your Permit to Court</h4>
              <p className="text-yellow-900 text-sm">If you had a valid permit but didn't display it, bring it to court along with proof it was valid on the ticket date. Many prosecutors will withdraw the charge upon seeing valid documentation.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Accessible Parking FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Got an Accessible Parking Ticket?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">$300-$500 is worth fighting. Let me assess your defence options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.traffic} />
      </ServicePageLayout>
    </>
  );
}
