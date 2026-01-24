import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Lock, Phone, Clock, Home } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function IllegalLockoutPage() {
  const authorityItems = [
    { title: 'Illegal Lockouts', description: 'Landlords cannot change locks, remove belongings, or physically prevent you from entering your unit—only the Sheriff can enforce eviction.' },
    { title: 'Emergency Action', description: 'Illegal lockouts can get expedited LTB hearings. You may also call police for assistance re-entering.' },
    { title: 'Substantial Damages', description: 'Illegal lockout damages can be significant—rent abatement, general damages, out-of-pocket costs, and sometimes punitive awards.' }
  ];

  const processSteps = [
    { step: '1', title: 'Document Everything', description: 'Photos of changed locks, texts, witnesses.' },
    { step: '2', title: 'Attempt Re-Entry', description: 'Call police if needed, document response.' },
    { step: '3', title: 'File T2 Application', description: 'Request expedited hearing for lockout.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Clearly Illegal', description: 'Self-help eviction is never permitted.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Expedited Hearings', description: 'LTB prioritizes lockout cases.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Act Quickly', description: 'Don\'t delay—file immediately.' }
  ];

  const honestFAQs = [
    { question: "What counts as an illegal lockout?", answer: "Changing locks without giving you keys, physically blocking entry, removing your belongings, shutting off utilities to force you out, or any action that prevents you from accessing your rental unit. Only the Sheriff with a valid eviction order can legally remove a tenant." },
    { question: "What should I do immediately if I'm locked out?", answer: "Document everything (photos, video). Call police non-emergency line—they can sometimes assist with peaceful re-entry or at least document the situation. Contact the landlord in writing demanding re-entry. If you can't get back in, file an urgent T2 application at LTB." },
    { question: "Will police help me get back in?", answer: "Sometimes. Police can assist with keeping the peace during re-entry and may help you access your unit if you can prove you live there. However, they often treat it as a 'civil matter.' Document their response either way—it's evidence." },
    { question: "How do I get an expedited LTB hearing?", answer: "File a T2 application and clearly indicate it's an illegal lockout. Call the LTB to request urgent scheduling. Lockout cases are supposed to be prioritized. You may get a hearing within days rather than months." },
    { question: "What damages can I get for illegal lockout?", answer: "Rent abatement for period locked out, out-of-pocket costs (hotel, storage, replacement items), general damages for stress and inconvenience ($1,000-$5,000+ depending on severity), and in egregious cases, additional damages. Order for re-entry if still locked out." },
    { question: "My landlord says I abandoned the unit. What now?", answer: "If you didn't abandon (still have belongings there, were paying rent, didn't give notice), this is likely a pretext for illegal lockout. Document your ongoing tenancy. Landlords can't declare abandonment and change locks without proper LTB process." }
  ];

  return (
    <>
      <SEO title="Illegal Lockout Help Paralegal Ontario | Landlord Changed Locks" description="Licensed paralegal for illegal lockout cases in Ontario. Landlord changed locks, removed belongings, shut off utilities. Emergency LTB help. Free consultation." canonical="https://www.legalassist.london/services/illegal-lockout" />
      <ServicePageLayout seoTitle="Illegal Lockout | Ontario" seoDescription="Illegal lockout help in Ontario." canonical="https://www.legalassist.london/services/illegal-lockout" problemHeadline="Illegal Lockout" problemDescription="Landlord changed the locks? Removed your belongings? Shut off utilities? This is illegal. I help get you back in and get compensation." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Illegal lockout" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Illegal Lockouts</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <Lock className="w-6 h-6" />
                Self-Help Eviction is ALWAYS Illegal
              </h3>
              <p className="text-red-900">No matter what you've done—even if you owe rent, damaged the unit, or violated the lease—the landlord cannot evict you without an LTB order enforced by the Sheriff. There are no exceptions.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What's Illegal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Landlords Cannot:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Change locks without providing keys</li>
                  <li>• Remove your belongings</li>
                  <li>• Shut off heat, hydro, or water</li>
                  <li>• Block your entry physically</li>
                  <li>• Hire someone to remove you</li>
                  <li>• Claim you "abandoned" without proof</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Only Legal Eviction:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Proper notice served (N4, N12, etc.)</li>
                  <li>• Application filed with LTB</li>
                  <li>• Hearing held</li>
                  <li>• Eviction order issued</li>
                  <li>• Sheriff enforces order</li>
                  <li>• Only then can locks be changed</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Immediate Steps</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <ol className="text-foreground/80 space-y-4">
                <li className="flex gap-3">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0">1</span>
                  <div><span className="font-bold">Document everything:</span> Photos of changed locks, your key not working, any removed belongings. Video if possible. Get witness contact info.</div>
                </li>
                <li className="flex gap-3">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0">2</span>
                  <div><span className="font-bold">Contact landlord in writing:</span> Text or email demanding immediate re-entry. This creates evidence and gives them a chance to correct.</div>
                </li>
                <li className="flex gap-3">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0">3</span>
                  <div><span className="font-bold">Call police:</span> Non-emergency line. They may help you re-enter peacefully. Even if they don't, their report is evidence.</div>
                </li>
                <li className="flex gap-3">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0">4</span>
                  <div><span className="font-bold">File T2 immediately:</span> Request expedited hearing. Note it's an illegal lockout. LTB prioritizes these cases.</div>
                </li>
              </ol>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Keep Paying Rent</h4>
              <p className="text-yellow-900 text-sm">Even if locked out, continue to pay or offer rent (in writing). This prevents any claim that you abandoned. Document your rent payments/offers carefully.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Illegal Lockout FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Locked Out Right Now?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">This is urgent. Contact me immediately for emergency help.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get Emergency Help</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
