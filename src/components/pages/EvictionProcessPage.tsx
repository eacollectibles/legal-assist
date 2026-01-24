import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Home, FileText, Clock, Scale } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function EvictionProcessPage() {
  const authorityItems = [
    { title: 'Lawful Eviction Only', description: 'Landlords cannot evict tenants without proper notice, LTB hearing, eviction order, and Sheriff enforcement. No shortcuts.' },
    { title: 'Multiple Grounds', description: 'Non-payment, own use, renovation, persistent late payment, illegal activity—each has specific notice forms and requirements.' },
    { title: 'Process Takes Time', description: 'Expect 2-8+ months depending on reason and tenant response. Plan accordingly—the LTB has a significant backlog.' }
  ];

  const processSteps = [
    { step: '1', title: 'Proper Notice', description: 'Correct form (N4, N12, etc.) with proper termination date.' },
    { step: '2', title: 'File Application', description: 'Submit to LTB if tenant doesn\'t vacate.' },
    { step: '3', title: 'Get Order', description: 'Hearing and eviction order from LTB.' },
    { step: '4', title: 'Sheriff Enforces', description: 'Only Sheriff can physically remove tenant.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Legal Process', description: 'Following rules protects you.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Enforceable Orders', description: 'LTB orders are backed by Sheriff.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'No Self-Help', description: 'Illegal lockouts = liability.' }
  ];

  const honestFAQs = [
    { question: "How long does eviction actually take?", answer: "Non-payment (N4): 2-4 months if uncontested, longer if tenant disputes. Personal use (N12): 3-6+ months typically. Renovation (N13): 4-8+ months. Add Sheriff wait time (2-4 weeks after order). The LTB backlog is significant—plan accordingly." },
    { question: "Can I change the locks if the tenant doesn't leave?", answer: "NO. Self-help eviction (changing locks, removing belongings, shutting off utilities) is illegal regardless of circumstances. You'll face significant damages at LTB, possibly police involvement, and any eviction application may be dismissed." },
    { question: "Tenant owes months of rent. What's the fastest path?", answer: "File L1 application immediately after N4 termination date passes (14 days for most tenancies). Request standard order if arrears are clear. Even then, expect 2-3+ months for hearing. Tenant can void by paying in full before hearing." },
    { question: "I need the unit for my family. What's the process?", answer: "N12 notice with 60 days to termination. Pay one month rent compensation before termination date. File L2 if tenant doesn't leave. At hearing, prove genuine good faith intent. If tenant later proves bad faith, you owe 12 months rent." },
    { question: "What if the tenant just won't pay or leave?", answer: "Follow the process: proper notice, LTB application, attend hearing, get eviction order, file with Sheriff. It's frustrating but cutting corners (illegal lockout, harassment) makes things worse and creates liability for you." },
    { question: "Do I need a paralegal for eviction?", answer: "For straightforward non-payment (N4/L1), you may succeed alone. For contested matters, own-use (N12), bad tenant behaviour, or if tenant has representation, having a paralegal significantly improves outcomes and avoids costly mistakes." }
  ];

  return (
    <>
      <SEO title="Eviction Process Ontario Landlords | How to Evict Tenant Legally" description="Licensed paralegal helping landlords evict tenants legally in Ontario. N4, N12, L1, L2 applications. LTB process, Sheriff enforcement. Free consultation." canonical="https://www.legalassist.london/services/eviction-process" />
      <ServicePageLayout seoTitle="Eviction Process | Ontario Landlords" seoDescription="Legal eviction process for Ontario landlords." canonical="https://www.legalassist.london/services/eviction-process" problemHeadline="Eviction Process for Landlords" problemDescription="Need to evict a tenant? There's only one legal way: proper notice → LTB application → hearing → eviction order → Sheriff. I help landlords navigate this process." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Eviction process" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Eviction Grounds & Notices</h2>
            
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Reason</th>
                    <th className="px-6 py-4 text-left font-heading">Notice Form</th>
                    <th className="px-6 py-4 text-left font-heading">Termination Period</th>
                    <th className="px-6 py-4 text-left font-heading">LTB Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Non-payment of rent</td><td className="px-6 py-4">N4</td><td className="px-6 py-4 text-sm">14 days</td><td className="px-6 py-4">L1</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Personal use (landlord/family)</td><td className="px-6 py-4">N12</td><td className="px-6 py-4 text-sm">60 days</td><td className="px-6 py-4">L2</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Purchaser's own use</td><td className="px-6 py-4">N12</td><td className="px-6 py-4 text-sm">60 days</td><td className="px-6 py-4">L2</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Renovation/demolition</td><td className="px-6 py-4">N13</td><td className="px-6 py-4 text-sm">120 days</td><td className="px-6 py-4">L2</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Persistent late payment</td><td className="px-6 py-4">N8</td><td className="px-6 py-4 text-sm">End of term</td><td className="px-6 py-4">L2</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Illegal activity/safety</td><td className="px-6 py-4">N6/N7</td><td className="px-6 py-4 text-sm">10-20 days</td><td className="px-6 py-4">L2</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Realistic Timeline</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-12">
              <Clock className="w-6 h-6 text-yellow-600 mb-2" />
              <p className="text-yellow-900 mb-3">Be realistic about timing. The LTB has a significant backlog:</p>
              <ul className="text-yellow-900 text-sm space-y-2">
                <li>• <span className="font-bold">Non-payment (uncontested):</span> 2-4 months from application to order</li>
                <li>• <span className="font-bold">Non-payment (contested):</span> 4-6+ months</li>
                <li>• <span className="font-bold">Own use (N12):</span> 3-6+ months</li>
                <li>• <span className="font-bold">Renovation (N13):</span> 4-8+ months</li>
                <li>• <span className="font-bold">Sheriff enforcement:</span> Add 2-4 weeks after order</li>
              </ul>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Critical Rules</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">NEVER Do This:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Change locks without LTB order + Sheriff</li>
                  <li>• Remove tenant's belongings</li>
                  <li>• Shut off utilities</li>
                  <li>• Harass tenant to leave</li>
                  <li>• Accept rent after filing for non-payment</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Always Do This:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Use correct notice form</li>
                  <li>• Calculate termination date properly</li>
                  <li>• Serve notice correctly (in person or mail)</li>
                  <li>• File application after termination date</li>
                  <li>• Pay compensation if required (N12/N13)</li>
                </ul>
              </div>
            </div>

            <div className="bg-primary/5 rounded-lg p-6">
              <h4 className="font-bold text-foreground mb-2">Bad Faith Costs Money</h4>
              <p className="text-foreground/80 text-sm">If you evict for own use (N12) and don't actually move in, or evict for renovation (N13) and don't actually renovate, you owe the tenant 12 months rent. The LTB and courts take bad faith evictions very seriously.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Landlord Eviction FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Need to Evict a Tenant?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let me help you navigate the process properly—avoiding costly mistakes and delays.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get Landlord Help</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
