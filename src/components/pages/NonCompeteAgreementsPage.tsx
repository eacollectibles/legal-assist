import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, FileText, Briefcase, Scale, Shield } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function NonCompeteAgreementsPage() {
  const authorityItems = [
    { title: 'Non-Competes Banned', description: 'Since October 2021, non-compete clauses are generally unenforceable in Ontario for most employees. Your employer may not know this.' },
    { title: 'Limited Exceptions', description: 'Only C-suite executives and business sale situations have valid non-competes. Almost everyone else is free to compete.' },
    { title: 'Non-Solicitation Different', description: 'Non-solicitation clauses (don\'t contact our clients/employees) may still be enforceable if reasonable. Different analysis.' }
  ];

  const processSteps = [
    { step: '1', title: 'Review Agreement', description: 'Is it truly non-compete or non-solicitation?' },
    { step: '2', title: 'Assess Exception', description: 'Are you a C-suite executive or business buyer?' },
    { step: '3', title: 'Respond to Threats', description: 'Most threats are unenforceable—get advice.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Generally Void', description: 'Non-competes banned since Oct 2021.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Can Compete', description: 'Most employees can work for competitors.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Non-Solicitation', description: 'Different rules apply.' }
  ];

  const honestFAQs = [
    { question: "Are non-compete agreements enforceable in Ontario?", answer: "Generally NO. Since October 25, 2021, non-compete agreements are void and unenforceable for most Ontario employees under the ESA. Employers cannot prevent you from working for competitors after you leave." },
    { question: "What are the exceptions?", answer: "Two narrow exceptions: (1) C-suite executives (those who participate in making policy and have influence over the organization), and (2) non-competes as part of a business sale (where you sold your business and agreed not to compete)." },
    { question: "My employment contract has a non-compete. Am I bound by it?", answer: "Probably not. If you're not a C-suite executive, the clause is void even if you signed it. Employers often don't know the law changed. However, other clauses in your contract (confidentiality, non-solicitation) may still apply." },
    { question: "What's the difference between non-compete and non-solicitation?", answer: "Non-compete: can't work for competitors. BANNED for most employees. Non-solicitation: can't solicit specific clients or recruit specific employees. MAY be enforceable if reasonable in scope and duration." },
    { question: "My employer is threatening to sue if I go to a competitor. What do I do?", answer: "Get advice. Most threats are bluffs—they can't enforce an unenforceable clause. However, verify you're not subject to an exception, check for valid non-solicitation clauses, and ensure you're not taking confidential information." },
    { question: "Can I still be bound by confidentiality obligations?", answer: "Yes. Confidentiality clauses (don't share trade secrets, proprietary information) are separate from non-competes and can be valid. Don't take confidential documents or use trade secrets at a new job." }
  ];

  return (
    <>
      <SEO title="Non-Compete Agreements Ontario | Are Non-Competes Enforceable" description="Licensed paralegal for non-compete agreement issues in Ontario. Non-competes banned since 2021. Free to work for competitors. Free consultation." canonical="https://www.legalassist.london/services/non-compete-agreements" />
      <ServicePageLayout seoTitle="Non-Compete Agreements | Ontario" seoDescription="Non-compete agreement help in Ontario." canonical="https://www.legalassist.london/services/non-compete-agreements" problemHeadline="Non-Compete Agreements" problemDescription="Worried about a non-compete clause? Since 2021, non-competes are void for most Ontario employees. Don't let old contract language stop your career." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Non-compete agreements" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Non-Compete Law in Ontario</h2>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Non-Competes Are Banned
              </h3>
              <p className="text-green-900">Since October 25, 2021, the Employment Standards Act prohibits non-compete agreements for most Ontario employees. Your employer cannot stop you from working for a competitor.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Who's Still Bound?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Non-Competes STILL Apply:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• C-suite executives (CEO, CFO, COO, etc.)</li>
                  <li>• Those who make organizational policy</li>
                  <li>• Business sellers (as part of sale)</li>
                  <li>• Agreements before Oct 25, 2021 (limited)</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Non-Competes VOID For:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Most employees (even senior)</li>
                  <li>• Managers who don't set policy</li>
                  <li>• Professionals (unless C-suite)</li>
                  <li>• Sales, technical, operational staff</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Non-Compete vs. Non-Solicitation</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Clause Type</th>
                    <th className="px-6 py-4 text-left font-heading">What It Restricts</th>
                    <th className="px-6 py-4 text-center font-heading">Enforceable?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">Non-Compete</td><td className="px-6 py-4 text-sm">Working for competitors</td><td className="px-6 py-4 text-center text-green-600 font-bold">VOID (most)</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Non-Solicitation (clients)</td><td className="px-6 py-4 text-sm">Contacting specific clients</td><td className="px-6 py-4 text-center text-yellow-600 font-bold">Maybe*</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Non-Solicitation (employees)</td><td className="px-6 py-4 text-sm">Recruiting former colleagues</td><td className="px-6 py-4 text-center text-yellow-600 font-bold">Maybe*</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Confidentiality</td><td className="px-6 py-4 text-sm">Using trade secrets/proprietary info</td><td className="px-6 py-4 text-center text-red-600 font-bold">Usually YES</td></tr>
                </tbody>
              </table>
              <p className="text-foreground/70 text-sm mt-2">*Must be reasonable in scope, geography, and duration</p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">If Your Employer Threatens Legal Action</h4>
              <p className="text-yellow-900 text-sm">Most threats are bluffs—they can't enforce void clauses. But get advice before ignoring threats: confirm you're not an exception, check for valid non-solicitation, and ensure you're not taking confidential information.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Non-Compete FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Have a Non-Compete Question?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let me review your contract and tell you what's actually enforceable.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Review</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.employment} />
      </ServicePageLayout>
    </>
  );
}
