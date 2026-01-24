import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Clock, FileText, Scale, DollarSign, Users } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function SmallClaimsProcessPage() {
  const authorityItems = [
    { title: 'Full Process Support', description: 'I handle the entire Small Claims Court process from filing through judgment enforcement.' },
    { title: 'Plain Language', description: 'Court processes are confusing. I explain everything clearly and handle the legal work.' },
    { title: 'Cost-Effective', description: 'Small Claims is designed to be accessible. My fees reflect that—you don\'t need expensive litigation.' }
  ];

  const processSteps = [
    { step: '1', title: 'Assessment', description: 'Review your case, calculate damages, assess strength and collectability.' },
    { step: '2', title: 'Filing & Service', description: 'Prepare documents, file with court, serve defendant properly.' },
    { step: '3', title: 'Settlement/Trial', description: 'Negotiate settlement or present case at trial.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Up to $35,000', description: 'Substantial claims without Superior Court complexity.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Simpler Rules', description: 'Designed for accessibility, not lawyers.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Faster Resolution', description: 'Months, not years.' }
  ];

  const honestFAQs = [
    { question: "How long does a Small Claims case take?", answer: "Filing to trial: typically 6-12 months. Settlement can happen anytime. After judgment, enforcement adds time. The court is backlogged, but it's still much faster than Superior Court." },
    { question: "What does it cost to sue someone?", answer: "Filing fee: $102 (claims $7,500+). Service fees, paralegal fees on top of that. If you win, you can recover some costs from the defendant. I'll give you a full cost estimate upfront." },
    { question: "What if I win but they don't pay?", answer: "Judgment is step one. Collection is step two. You can garnish wages/bank accounts, examine them about assets, or put liens on property. Some defendants are 'judgment proof'—no assets to collect. I assess collectability before you start." },
    { question: "Do I have to go to court?", answer: "You must attend the Settlement Conference (mandatory). Trial only happens if you don't settle. Many cases settle at or before the Settlement Conference." },
    { question: "Can I handle this myself?", answer: "Yes—Small Claims is designed for self-representation. But a paralegal increases your chances of success, handles paperwork, and presents your case professionally. The value often outweighs the cost." },
    { question: "What evidence do I need?", answer: "Contracts, receipts, photos, emails, texts, witness statements. The more documentation the better. 'He said/she said' cases are hard to win without supporting evidence." }
  ];

  return (
    <>
      <SEO title="Small Claims Court Process Ontario | Complete Guide" description="Complete guide to Small Claims Court process in Ontario. Filing, service, settlement conference, trial. Claims up to $50,000. Free consultation." canonical="https://www.legalassist.london/guides/small-claims-process" />
      <ServicePageLayout seoTitle="Small Claims Court Process | Ontario" seoDescription="Guide to the Small Claims Court process." canonical="https://www.legalassist.london/guides/small-claims-process" problemHeadline="Small Claims Court: How It Works" problemDescription="Small Claims Court handles disputes up to $50,000 in Ontario. It's designed to be accessible, but knowing the process helps you succeed." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Small claims process" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">The Small Claims Court Process</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Timeline Overview</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Step</th>
                    <th className="px-6 py-4 text-left font-heading">What Happens</th>
                    <th className="px-6 py-4 text-center font-heading">Typical Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">1. File Claim</td><td className="px-6 py-4 text-sm">Prepare and file Plaintiff's Claim with court</td><td className="px-6 py-4 text-center">1-2 weeks</td></tr>
                  <tr><td className="px-6 py-4 font-medium">2. Serve Defendant</td><td className="px-6 py-4 text-sm">Formally deliver claim to defendant</td><td className="px-6 py-4 text-center">1-4 weeks</td></tr>
                  <tr><td className="px-6 py-4 font-medium">3. Defence Filed</td><td className="px-6 py-4 text-sm">Defendant has 20 days to respond</td><td className="px-6 py-4 text-center">20 days</td></tr>
                  <tr><td className="px-6 py-4 font-medium">4. Settlement Conference</td><td className="px-6 py-4 text-sm">Mandatory meeting to try to settle</td><td className="px-6 py-4 text-center">3-6 months</td></tr>
                  <tr><td className="px-6 py-4 font-medium">5. Trial</td><td className="px-6 py-4 text-sm">If no settlement, present case to judge</td><td className="px-6 py-4 text-center">6-12 months</td></tr>
                  <tr><td className="px-6 py-4 font-medium">6. Enforcement</td><td className="px-6 py-4 text-sm">If you win, collect the judgment</td><td className="px-6 py-4 text-center">Varies</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Court Fees</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <DollarSign className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-2">$102</div>
                <p className="text-foreground/80 font-medium">Filing Fee</p>
                <p className="text-sm text-foreground/60">(Claims over $7,500)</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <DollarSign className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-2">$73</div>
                <p className="text-foreground/80 font-medium">Defence Fee</p>
                <p className="text-sm text-foreground/60">(If you're being sued)</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <DollarSign className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-2">$170</div>
                <p className="text-foreground/80 font-medium">Trial Fee</p>
                <p className="text-sm text-foreground/60">(Requested after settlement conf)</p>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Settlement Conference</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-12">
              <h4 className="font-bold text-yellow-800 mb-3">What to Expect:</h4>
              <ul className="text-yellow-900 text-sm space-y-2">
                <li>✓ Mandatory attendance for all parties</li>
                <li>✓ Judge/Deputy Judge facilitates settlement discussion</li>
                <li>✓ NOT a trial—no testimony, informal discussion</li>
                <li>✓ Judge may give opinion on case strength (not binding)</li>
                <li>✓ Many cases settle here—be prepared to negotiate</li>
                <li>✓ If no settlement, trial date set</li>
              </ul>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Should You Sue?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Good Candidates:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Clear evidence of what's owed</li>
                  <li>• Defendant has assets/income</li>
                  <li>• Amount justifies the effort</li>
                  <li>• Within 2-year limitation period</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Think Twice If:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Defendant is judgment-proof</li>
                  <li>• Evidence is weak</li>
                  <li>• Amount is under $1,000</li>
                  <li>• Over 2 years since incident</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Small Claims FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Ready to Start Your Case?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let me assess your situation and guide you through the process.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.smallClaims} />
      </ServicePageLayout>
    </>
  );
}
