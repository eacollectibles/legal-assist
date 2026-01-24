import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Home, FileText, ArrowRight, Clock } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function LeaseAssignmentPage() {
  const authorityItems = [
    { title: 'Lease Assignment Rights', description: 'Need to leave before lease ends? Ontario law gives you the right to assign your lease—and landlord can\'t unreasonably refuse.' },
    { title: 'Assignment vs Sublet', description: 'Assignment transfers the entire lease permanently. Sublet is temporary and you remain responsible. Know the difference.' },
    { title: 'Landlord Must Respond', description: 'Landlord has 7 days to respond to assignment request. Unreasonable refusal has consequences.' }
  ];

  const processSteps = [
    { step: '1', title: 'Request in Writing', description: 'Formal written request to assign your lease.' },
    { step: '2', title: 'Wait for Response', description: 'Landlord has 7 days to respond.' },
    { step: '3', title: 'Find Assignee', description: 'If consent given, find suitable replacement tenant.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Right to Assign', description: 'Cannot be unreasonably refused.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Clean Exit', description: 'Assignment ends your obligations.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Process Matters', description: 'Follow steps correctly.' }
  ];

  const honestFAQs = [
    { question: "What's the difference between assignment and sublet?", answer: "Assignment: you transfer the entire lease to someone else permanently—you're completely out. Sublet: someone else takes over temporarily but you remain on the lease and responsible if they don't pay. For leaving permanently, you want assignment." },
    { question: "Can my landlord refuse to let me assign?", answer: "Landlord can refuse, but only for reasonable reasons (bad credit, no references, can't afford rent). Refusing just because they don't want to or want to raise rent is NOT reasonable. Unreasonable refusal lets you end your tenancy on 30 days notice." },
    { question: "How do I request a lease assignment?", answer: "Request in writing (email with delivery confirmation or letter). State you want to assign your lease. Landlord has 7 days to: (1) consent, (2) refuse, or (3) not respond. If they don't respond, they're deemed to have refused." },
    { question: "What if landlord refuses or doesn't respond?", answer: "If landlord refuses or doesn't respond within 7 days, you can give 30 days written notice to end your tenancy. This is a special right—you escape the lease without finding a replacement. Useful if landlord is being difficult." },
    { question: "Can landlord charge me a fee for assignment?", answer: "Landlord can only charge reasonable out-of-pocket expenses for the assignment (credit check, new lease preparation)—typically $50-150. They cannot charge an 'assignment fee' or increase rent for the new tenant beyond legal limits." },
    { question: "What happens after assignment is complete?", answer: "Once assigned, you're completely released from the lease. The new tenant takes over all obligations. You get your last month's rent deposit transferred or returned. You have no further responsibility for the unit." }
  ];

  return (
    <>
      <SEO title="Lease Assignment Ontario | How to Assign Your Lease" description="Need to leave your apartment early? Ontario tenants have the right to assign their lease. Landlord cannot unreasonably refuse. Paralegal help available." canonical="https://www.legalassist.london/services/lease-assignment" />
      <ServicePageLayout seoTitle="Lease Assignment | Ontario" seoDescription="Lease assignment help in Ontario." canonical="https://www.legalassist.london/services/lease-assignment" problemHeadline="Lease Assignment" problemDescription="Need to leave your lease early? Ontario law gives you the right to assign—and if your landlord unreasonably refuses, you can end your tenancy with 30 days notice." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Lease assignment" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Lease Assignment</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Assignment vs Sublet</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Factor</th>
                    <th className="px-6 py-4 text-left font-heading">Assignment</th>
                    <th className="px-6 py-4 text-left font-heading">Sublet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">Your involvement</td><td className="px-6 py-4 text-green-700 font-bold">Completely out</td><td className="px-6 py-4 text-yellow-700">Still on lease</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Duration</td><td className="px-6 py-4">Permanent</td><td className="px-6 py-4">Temporary</td></tr>
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">Your liability</td><td className="px-6 py-4 text-green-700 font-bold">None after assignment</td><td className="px-6 py-4 text-red-700">Responsible if subtenant defaults</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Return to unit</td><td className="px-6 py-4">No right to return</td><td className="px-6 py-4">Can return after sublet period</td></tr>
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">Best for</td><td className="px-6 py-4">Leaving permanently</td><td className="px-6 py-4">Temporary absence (travel, work)</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">The Assignment Process</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <ol className="text-foreground/80 space-y-3">
                <li><span className="font-bold">1. Written request:</span> Ask landlord for consent to assign (email or letter)</li>
                <li><span className="font-bold">2. 7-day wait:</span> Landlord must respond within 7 days</li>
                <li><span className="font-bold">3. If consent given:</span> Find a suitable replacement tenant</li>
                <li><span className="font-bold">4. Landlord approval:</span> Landlord can approve or refuse specific person (reasonably)</li>
                <li><span className="font-bold">5. Assignment complete:</span> New tenant signs, you're released</li>
              </ol>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">If Landlord Refuses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Your Options:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Give 30 days written notice to end tenancy</li>
                  <li>• No need to find replacement</li>
                  <li>• Clean exit from lease</li>
                  <li>• Applies if refusal was unreasonable OR no response</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Reasonable Refusal Includes:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Proposed assignee has bad credit</li>
                  <li>• Proposed assignee can't afford rent</li>
                  <li>• No proper references</li>
                  <li>• Previous eviction history</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Unreasonable Refusal Is NOT:</h4>
              <p className="text-yellow-900 text-sm">Landlord wanting to raise rent, find their own tenant, or just saying "no" without reason. These are unreasonable refusals that trigger your right to give 30 days notice and leave.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Lease Assignment FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Need to Leave Your Lease?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let me help you navigate the assignment process properly.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get Help</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
