import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, DollarSign, HelpCircle, AlertCircle, Shield } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function SecurityDepositsPage() {
  const authorityItems = [
    { title: 'Deposit Recovery', description: 'In Ontario, most security deposits are illegal. I help tenants recover money landlords weren\'t entitled to collect.' },
    { title: 'Know the Rules', description: 'Only last month\'s rent and key deposits (refundable) are legal. Everything else can be recovered.' },
    { title: 'For Landlords', description: 'Understand what you can legally collect and how to protect yourself properly.' }
  ];

  const processSteps = [
    { step: '1', title: 'Deposit Analysis', description: 'Determine what was paid and whether it was legally collectible.' },
    { step: '2', title: 'Demand Letter', description: 'Formally request return of illegal deposits.' },
    { step: '3', title: 'LTB Application', description: 'File T1 application to recover illegal charges if landlord refuses.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Clear Law', description: 'Security deposits (damage deposits) are illegal in Ontario.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Recoverable', description: 'Even deposits paid years ago can be recovered.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Interest Owed', description: 'Landlords must pay interest on last month\'s rent held.' }
  ];

  const honestFAQs = [
    { question: "What deposits can landlords legally collect in Ontario?", answer: "ONLY: Last month's rent deposit (applied to final month only) and key/access card deposits (fully refundable). That's it. No damage deposits, cleaning deposits, pet deposits, or any other security deposits are legal." },
    { question: "Is a damage deposit illegal?", answer: "Yes. Landlords cannot collect deposits for potential damage, no matter what they call it. If you paid a 'damage deposit', 'security deposit', 'cleaning deposit', or 'pet deposit', you can demand it back." },
    { question: "What about pet deposits?", answer: "Illegal. Landlords cannot charge extra deposits for pets. They also cannot charge pet rent or monthly pet fees. If you paid any of these, you can recover them." },
    { question: "Can I get a deposit back that I paid years ago?", answer: "Yes, though the limitation period may apply. For deposits paid within the last 2 years, recovery is straightforward. Older deposits may be more complicated but are still potentially recoverable." },
    { question: "What is the landlord supposed to do with last month's rent?", answer: "Hold it in trust and apply it to your FINAL month's rent only. They must pay you interest annually (at the guideline rate). They cannot use it for damages, cleaning, or anything other than rent." },
    { question: "For landlords: How can I protect against damages?", answer: "Document condition at move-in with photos/video. Do a thorough inspection at move-out. If there's damage beyond normal wear and tear, you can pursue the tenant through Small Claims Court after they leave—but you cannot hold deposits as security." }
  ];

  return (
    <>
      <SEO title="Security Deposit Recovery Ontario | Illegal Deposit Help" description="Licensed paralegal recovering illegal security deposits in Ontario. Damage deposits, pet deposits, cleaning deposits are illegal. Free consultation." canonical="https://www.legalassist.london/services/security-deposits" />
      <ServicePageLayout seoTitle="Security Deposit Recovery | Ontario" seoDescription="Recovering illegal security deposits in Ontario." canonical="https://www.legalassist.london/services/security-deposits" problemHeadline="Security Deposits in Ontario: Know the Law" problemDescription="Did your landlord collect a damage deposit, pet deposit, or security deposit? These are illegal in Ontario. You can get that money back." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Security deposits" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Ontario's Deposit Rules</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                Security Deposits Are Illegal in Ontario
              </h3>
              <p className="text-red-900">Unlike many other places, Ontario law prohibits landlords from collecting damage deposits, security deposits, or any deposit other than last month's rent and refundable key deposits.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What Landlords Can & Cannot Collect</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">LEGAL to Collect:</h4>
                <ul className="text-green-900 text-sm space-y-2">
                  <li>✓ Last month's rent deposit</li>
                  <li>✓ Key/access card deposit (fully refundable)</li>
                  <li>✓ First month's rent (obviously)</li>
                </ul>
                <p className="text-green-800 text-xs mt-3 italic">That's the complete list.</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">ILLEGAL to Collect:</h4>
                <ul className="text-red-900 text-sm space-y-2">
                  <li>❌ Damage deposit</li>
                  <li>❌ Security deposit</li>
                  <li>❌ Pet deposit</li>
                  <li>❌ Cleaning deposit</li>
                  <li>❌ Post-dated cheques (for future rent)</li>
                  <li>❌ Any other "deposit"</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Last Month's Rent Rules</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <ul className="text-foreground/80 space-y-2">
                <li><strong>Purpose:</strong> Applied to your FINAL month's rent only—not damages, cleaning, or anything else</li>
                <li><strong>Interest:</strong> Landlord must pay you interest annually at the guideline rate</li>
                <li><strong>Cannot be withheld:</strong> Even if you owe money for damages, landlord must apply it to final month</li>
                <li><strong>Increases:</strong> If rent increases, landlord can ask for the difference to top up the deposit</li>
              </ul>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Recovering Illegal Deposits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="font-bold text-yellow-800 mb-2">Step 1: Demand Return</h4>
                <p className="text-yellow-900 text-sm">Send written demand to landlord citing RTA s. 105. Give 10-14 days to return the money.</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="font-bold text-yellow-800 mb-2">Step 2: File T1</h4>
                <p className="text-yellow-900 text-sm">If landlord refuses, file T1 application at LTB to recover illegal charges.</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="font-bold text-yellow-800 mb-2">Step 3: LTB Hearing</h4>
                <p className="text-yellow-900 text-sm">Present evidence of what you paid. LTB orders return plus potential damages.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Deposit FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Paid an Illegal Deposit?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">You may be able to recover it. Let's review what you paid and your options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
