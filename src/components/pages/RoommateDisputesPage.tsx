import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Home, Users, FileText, Scale } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function RoommateDisputesPage() {
  const authorityItems = [
    { title: 'Roommate vs Tenant', description: 'Whether you\'re protected by the RTA depends on your living situation. I help assess your rights and options.' },
    { title: 'Complex Situations', description: 'Roommate disputes often involve unclear legal status. I help clarify your position and available remedies.' },
    { title: 'Multiple Forums', description: 'Depending on relationship, disputes may go to LTB, Small Claims, or neither.' }
  ];

  const processSteps = [
    { step: '1', title: 'Assess Relationship', description: 'Are you a tenant, roommate, or boarder? This changes everything.' },
    { step: '2', title: 'Determine Rights', description: 'RTA protection or not? What options exist?' },
    { step: '3', title: 'Pursue Remedy', description: 'LTB, Small Claims, or negotiated resolution.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Clarity First', description: 'Understanding your legal status unlocks options.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'RTA May Not Apply', description: 'Roommates often not protected by RTA.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Other Remedies', description: 'Small Claims Court for money disputes.' }
  ];

  const honestFAQs = [
    { question: "Am I a tenant or just a roommate?", answer: "Key question: do you share kitchen/bathroom with the landlord or landlord's family? If yes, you're likely exempt from the RTA (no LTB protection). If you rent from a co-tenant (not the landlord), your relationship is with that tenant, not the landlord—also often outside RTA." },
    { question: "My roommate won't pay their share of rent. What can I do?", answer: "If you're both on the lease, you're 'jointly and severally liable'—meaning the landlord can collect full rent from either of you. Your roommate's failure to pay is between you and them—Small Claims Court for the money, not LTB." },
    { question: "Can my roommate evict me?", answer: "If they're the leaseholder and you're a licensee (not on lease), you may have limited RTA protection. If you're both on the lease, neither can 'evict' the other—only the landlord can. This often requires working out a solution between yourselves." },
    { question: "I want my roommate out but we're both on the lease.", answer: "Difficult. Landlord can evict both of you for cause, but can't remove one person from a joint lease. Options: negotiate their voluntary departure, have landlord agree to new lease without them, or wait until lease allows change." },
    { question: "What about damage deposit between roommates?", answer: "Any money you paid to a roommate (not landlord) is a private arrangement. If they kept your deposit unfairly, that's a Small Claims matter, not LTB. The LTB only handles landlord-tenant relationships." },
    { question: "My name isn't on the lease. Do I have any rights?", answer: "Depends. If you've been paying rent directly to landlord and they accepted it, you may have established a tenancy. If you're subletting from the tenant, you may have RTA rights against that tenant. Complex situations need individual assessment." }
  ];

  return (
    <>
      <SEO title="Roommate Disputes Paralegal Ontario | Joint Tenancy Issues" description="Licensed paralegal for roommate disputes in Ontario. Joint lease issues, roommate won't pay, shared housing problems. Free consultation." canonical="https://www.legalassist.london/services/roommate-disputes" />
      <ServicePageLayout seoTitle="Roommate Disputes | Ontario" seoDescription="Roommate dispute help in Ontario." canonical="https://www.legalassist.london/services/roommate-disputes" problemHeadline="Roommate Disputes" problemDescription="Roommate not paying rent? Want someone out? The legal situation depends on your living arrangement. I help clarify your rights and options." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Roommate disputes" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Your Legal Relationship</h2>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                The RTA Doesn't Cover Everything
              </h3>
              <p className="text-yellow-900">Many roommate situations fall outside the Residential Tenancies Act. Sharing with the landlord, informal arrangements, or disputes between co-tenants often aren't LTB matters. Understanding this first is critical.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Who Are You?</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Situation</th>
                    <th className="px-6 py-4 text-center font-heading">RTA Protected?</th>
                    <th className="px-6 py-4 text-left font-heading">Disputes Go To</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">You rent from landlord (own unit)</td><td className="px-6 py-4 text-center text-green-600 font-bold">YES</td><td className="px-6 py-4">LTB</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Joint tenants on same lease</td><td className="px-6 py-4 text-center text-green-600 font-bold">YES*</td><td className="px-6 py-4">LTB (vs landlord) / Small Claims (vs each other)</td></tr>
                  <tr><td className="px-6 py-4 font-medium">You rent room from co-tenant</td><td className="px-6 py-4 text-center text-yellow-600 font-bold">MAYBE</td><td className="px-6 py-4">LTB or Small Claims (depends)</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Share kitchen/bath with landlord</td><td className="px-6 py-4 text-center text-red-600 font-bold">NO</td><td className="px-6 py-4">Small Claims / self-help</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Boarder in someone's home</td><td className="px-6 py-4 text-center text-red-600 font-bold">NO</td><td className="px-6 py-4">Small Claims / self-help</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Scenarios</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6">
                <Users className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Joint Lease Problems</h4>
                <p className="text-foreground/80 text-sm mb-3">Both names on lease, one person not paying or causing problems.</p>
                <p className="text-foreground/70 text-sm">Reality: Landlord can pursue either/both of you. Your dispute with co-tenant is separate—Small Claims Court for money owed.</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <Home className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Subletting from Tenant</h4>
                <p className="text-foreground/80 text-sm mb-3">You rent from someone who rents from landlord.</p>
                <p className="text-foreground/70 text-sm">You may have RTA rights against the tenant (as your landlord). Complex situation—assessment needed.</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-bold text-green-800 mb-2">When RTA Doesn't Apply</h4>
              <p className="text-green-900 text-sm">If you're not RTA-protected, you have more flexibility but less protection. The person can potentially give reasonable notice and ask you to leave. Money disputes go to Small Claims. Get advice on your specific situation.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Roommate FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Roommate Situation?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let me assess your legal relationship and explain your options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
