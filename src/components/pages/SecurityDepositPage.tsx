import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, DollarSign, Home, FileText, Shield } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function SecurityDepositPage() {
  const authorityItems = [
    { title: 'Security Deposits Banned', description: 'Ontario landlords CANNOT collect security deposits, damage deposits, or last month\'s rent as a "deposit." Only rent deposit (last month) is permitted.' },
    { title: 'Rent Deposit Rules', description: 'Last month\'s rent deposit is legal—but it\'s not a damage deposit. It must be applied to the last month, and landlord owes you interest.' },
    { title: 'Recovery Options', description: 'If a landlord collected an illegal deposit, you can recover it through the LTB with interest.' }
  ];

  const processSteps = [
    { step: '1', title: 'Identify Deposit Type', description: 'Was it rent deposit or illegal security/damage deposit?' },
    { step: '2', title: 'Demand Return', description: 'Written demand for illegal deposit return.' },
    { step: '3', title: 'File T1', description: 'LTB application to recover illegal charges.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Law is Clear', description: 'Security deposits are illegal.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Recoverable', description: 'Can get illegal deposits back.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Rent Deposit Different', description: 'Last month\'s rent IS legal.' }
  ];

  const honestFAQs = [
    { question: "Can my landlord ask for a security deposit in Ontario?", answer: "NO. Security deposits, damage deposits, cleaning deposits, and key deposits (beyond reasonable key cost) are illegal in Ontario. The only legal deposit is last month's rent—and that's not a damage deposit, it's prepaid rent." },
    { question: "What about last month's rent—is that legal?", answer: "Yes, but it's not a security/damage deposit. It's a rent deposit that must be applied to your actual last month of tenancy. Landlord can't keep it for damages. They also owe you annual interest at the guideline rate." },
    { question: "My landlord is keeping my 'deposit' for damages. Is that allowed?", answer: "No. If they took a rent deposit, it must go to last month's rent—not damages. If they took an illegal security deposit, they must return it regardless of damages. They can pursue damage claims separately, but can't just keep your money." },
    { question: "I paid a security deposit years ago. Can I still get it back?", answer: "Potentially. File a T1 application at the LTB. There's a 1-year limitation for applications, but courts have sometimes allowed recovery of amounts held throughout a tenancy. Worth pursuing, especially if you're still a tenant or recently moved." },
    { question: "Landlord says it's 'standard' to pay security deposit. Is it?", answer: "It might be common, but it's illegal. Many landlords don't know the law or ignore it. Just because they asked doesn't make it legal. You can refuse (though this may cost you the unit) or pay and later recover it." },
    { question: "What if I damaged the unit—don't they deserve compensation?", answer: "If you caused damage beyond normal wear and tear, landlord can pursue you for it—through the LTB or Small Claims Court. But they can't just take it from an illegal deposit they shouldn't have collected. These are separate issues." }
  ];

  return (
    <>
      <SEO title="Security Deposit Ontario | Illegal Deposits Recovery" description="Security deposits are illegal in Ontario. Licensed paralegal helps recover illegal deposits through LTB. Rent deposit rules explained. Free consultation." canonical="https://www.legalassist.london/services/security-deposits" />
      <ServicePageLayout seoTitle="Security Deposits | Ontario" seoDescription="Security deposit recovery in Ontario." canonical="https://www.legalassist.london/services/security-deposits" problemHeadline="Security Deposits" problemDescription="Security deposits are ILLEGAL in Ontario. If your landlord collected one, you can get it back. Only last month's rent deposit is permitted." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Security deposits" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Ontario Deposit Rules</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <XCircle className="w-6 h-6" />
                Security/Damage Deposits are ILLEGAL
              </h3>
              <p className="text-red-900">Ontario's Residential Tenancies Act prohibits landlords from collecting security deposits, damage deposits, cleaning deposits, or any deposit beyond last month's rent and reasonable key costs.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Legal vs. Illegal Deposits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">LEGAL:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Last month's rent deposit (first and last)</li>
                  <li>• Reasonable key deposit (refundable)</li>
                  <li>• Parking/utilities if in lease agreement</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">ILLEGAL:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Security deposit</li>
                  <li>• Damage deposit</li>
                  <li>• Cleaning deposit</li>
                  <li>• Pet deposit</li>
                  <li>• Any deposit beyond last month's rent</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Last Month's Rent Deposit Rules</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <DollarSign className="w-8 h-8 text-primary mb-3" />
              <p className="text-foreground/80 mb-4">The rent deposit IS legal, but has strict rules:</p>
              <ul className="text-foreground/80 space-y-2">
                <li>✓ Can only equal one month's rent</li>
                <li>✓ Must be applied to actual last month of tenancy</li>
                <li>✓ Cannot be used for damages</li>
                <li>✓ Landlord owes annual interest at guideline rate</li>
                <li>✓ Must increase with legal rent increases</li>
              </ul>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Recovering Illegal Deposits</h3>
            <div className="bg-primary/5 rounded-lg p-6">
              <h4 className="font-bold text-foreground mb-3">Steps to Recover:</h4>
              <ol className="text-foreground/80 space-y-2">
                <li><span className="font-bold">1.</span> Gather evidence (receipt, lease showing deposit, bank records)</li>
                <li><span className="font-bold">2.</span> Send written demand to landlord</li>
                <li><span className="font-bold">3.</span> File T1 Application at LTB if not returned</li>
                <li><span className="font-bold">4.</span> Request deposit plus interest</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Security Deposit FAQs</h2>
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
            <p className="font-paragraph text-lg text-foreground/80 mb-8">You can get it back. Let me help you recover what's yours.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
