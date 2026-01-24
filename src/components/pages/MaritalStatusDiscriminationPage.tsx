import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Heart, Briefcase, Home, Shield } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function MaritalStatusDiscriminationPage() {
  const authorityItems = [
    { title: 'Marital Status Protected', description: 'Marital status is a protected ground in Ontario. Single, married, divorced, widowed, common-law—all protected from discrimination.' },
    { title: 'Employment & Housing', description: 'Can\'t be denied a job or apartment because you\'re single, divorced, or in any particular relationship status.' },
    { title: 'Anti-Nepotism ≠ Discrimination', description: 'Rules against hiring relatives for conflict reasons may be legitimate—but blanket bans on married people may not be.' }
  ];

  const processSteps = [
    { step: '1', title: 'Identify Treatment', description: 'How were you treated differently based on marital status?' },
    { step: '2', title: 'Gather Evidence', description: 'Statements, policies, comparisons to others.' },
    { step: '3', title: 'File HRTO', description: 'Application within 1 year of discrimination.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Protected Ground', description: 'Marital status explicitly protected.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Broad Coverage', description: 'Single, married, divorced, widowed.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Some Limits', description: 'Legitimate conflict policies may apply.' }
  ];

  const honestFAQs = [
    { question: "What counts as 'marital status' under Ontario law?", answer: "Marital status includes: single (never married), married, widowed, divorced, separated, and common-law partnership. It protects you from being treated differently in employment, housing, or services based on any of these statuses." },
    { question: "My landlord prefers renting to married couples. Is that discrimination?", answer: "Yes. Landlords cannot refuse to rent based on marital status. Preferring married couples, refusing single people, or discriminating against divorced individuals is illegal. If you can afford the rent and meet other legitimate criteria, marital status can't be the reason for refusal." },
    { question: "My employer has a 'no dating coworkers' policy. Is that legal?", answer: "Generally yes, if it's about workplace conduct not marital status itself. But policies that treat married couples differently than dating couples, or that only penalize one gender, may be discriminatory. The key is whether the policy targets relationship conduct vs marital status itself." },
    { question: "I was passed over for promotion because I'm single with 'no family obligations.' Is that discrimination?", answer: "Yes. Assumptions that single people can work more hours, take less desirable shifts, or don't need promotions as much as married people are discriminatory. Marital status cannot be a factor in employment decisions." },
    { question: "They won't hire me because my spouse works for a competitor. Legal?", answer: "Possibly legitimate depending on the role. Concerns about confidential information or conflicts of interest may be valid. But a blanket ban without assessing actual risk may be discriminatory. Case-by-case analysis matters." },
    { question: "I was fired after getting divorced because my ex also works here. Discrimination?", answer: "Potentially. If both employees could continue working without conflict, firing one due to the divorce is marital status discrimination. However, if there's genuine inability to work together affecting operations, that's a different issue to analyze." }
  ];

  return (
    <>
      <SEO title="Marital Status Discrimination Paralegal Ontario | Single Divorced HRTO" description="Licensed paralegal for marital status discrimination in Ontario. Single, married, divorced protection in employment and housing. HRTO applications. Free consultation." canonical="https://www.legalassist.london/services/marital-status-discrimination" />
      <ServicePageLayout seoTitle="Marital Status Discrimination | Ontario" seoDescription="Marital status discrimination help in Ontario." canonical="https://www.legalassist.london/services/marital-status-discrimination" problemHeadline="Marital Status Discrimination" problemDescription="Treated differently because you're single? Divorced? Common-law? Marital status is protected in Ontario—in employment, housing, and services." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Marital status discrimination" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Marital Status Protection</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What's Protected</h3>
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
              <Shield className="w-6 h-6 text-green-600 mb-2" />
              <p className="text-green-900 mb-3">Marital status protection covers:</p>
              <ul className="text-green-900 text-sm space-y-1">
                <li>• Single (never married)</li>
                <li>• Married</li>
                <li>• Common-law partnership</li>
                <li>• Separated</li>
                <li>• Divorced</li>
                <li>• Widowed</li>
              </ul>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Discrimination Scenarios</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Scenario</th>
                    <th className="px-6 py-4 text-left font-heading">Discrimination?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Landlord prefers married tenants</td><td className="px-6 py-4 text-red-700 font-bold">YES</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Single people expected to work holidays</td><td className="px-6 py-4 text-red-700 font-bold">YES</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Passed over because "no family"</td><td className="px-6 py-4 text-red-700 font-bold">YES</td></tr>
                  <tr className="bg-yellow-50"><td className="px-6 py-4 font-medium">Can't supervise spouse</td><td className="px-6 py-4 text-yellow-700">Maybe (conflict legitimate)</td></tr>
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">Conduct policy (no workplace dating)</td><td className="px-6 py-4 text-green-700">Usually OK</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Employment Examples</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Discriminatory:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• "Single people can work weekends"</li>
                  <li>• Not promoting divorced person (instability)</li>
                  <li>• Preferring married for "stability"</li>
                  <li>• Different benefits based on status</li>
                  <li>• Assumptions about availability</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Likely Legitimate:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Can't supervise direct relative</li>
                  <li>• Conflict of interest policies (applied fairly)</li>
                  <li>• Conduct rules about workplace relationships</li>
                  <li>• Security clearance with actual conflict</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Document Comparisons</h4>
              <p className="text-yellow-900 text-sm">For marital status claims, note how people of different statuses are treated. If married colleagues get better schedules, promotions, or treatment than single colleagues doing the same work, document those differences.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Marital Status FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Treated Differently for Your Marital Status?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let me assess whether you have a human rights claim.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.humanRights} />
      </ServicePageLayout>
    </>
  );
}
