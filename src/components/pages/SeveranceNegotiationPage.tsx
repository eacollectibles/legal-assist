import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, DollarSign, FileText, Calculator, Clock } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function SeveranceNegotiationPage() {
  const authorityItems = [
    { title: 'Severance Negotiation', description: 'Employers usually offer less than you\'re entitled to. I help negotiate fair severance packages.' },
    { title: 'Know Your Worth', description: 'Common law notice is typically 3-4x ESA minimums. Most people don\'t know this.' },
    { title: 'Before You Sign', description: 'Once you sign a release, you can\'t come back for more. Get advice first.' }
  ];

  const processSteps = [
    { step: '1', title: 'Calculate Entitlement', description: 'Assess what you\'re actually owed under common law.' },
    { step: '2', title: 'Review Offer', description: 'Compare offer to entitlement and identify gaps.' },
    { step: '3', title: 'Negotiate', description: 'Counter-offer with supporting rationale.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Higher Than Offered', description: 'First offers are rarely full entitlement.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Quick Results', description: 'Many cases resolve with one letter.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Don\'t Sign Yet', description: 'Releases are final—get advice first.' }
  ];

  const honestFAQs = [
    { question: "How much severance am I entitled to?", answer: "ESA minimum is 1 week per year up to 8 weeks. Common law is typically 3-4 weeks per year, sometimes more. Factors: age, tenure, position, availability of comparable work. A 10-year employee might get 8 weeks ESA but 8-12 months common law." },
    { question: "My employer offered ESA minimums. Is that enough?", answer: "Almost never. Unless your employment contract has an enforceable termination clause limiting you to ESA, you're likely entitled to common law notice—which is significantly more. Get an assessment before accepting." },
    { question: "What about my employment contract's termination clause?", answer: "Many termination clauses are unenforceable due to technical defects. Even if you signed one, it may not hold up. I review contracts to assess whether the clause is valid or can be challenged." },
    { question: "What's included in a severance package besides salary?", answer: "Full package includes: base salary continuation, benefits continuation (or cash equivalent), bonus (if you would have earned it), pension contributions, car allowance, stock options vesting. Don't just look at weeks of pay." },
    { question: "How long do I have to decide?", answer: "Employers often give short deadlines (48 hours, 1 week) to pressure you. These deadlines are often negotiable. You generally have 2 years to bring a claim, so don't let artificial deadlines rush you into a bad deal." },
    { question: "What if they say the offer is final?", answer: "They almost always say that. It's rarely true. A well-reasoned counter-offer with legal support often results in improved offers. Even 'final' offers become negotiable when faced with potential litigation costs." }
  ];

  return (
    <>
      <SEO title="Severance Negotiation Paralegal Ontario | Severance Package Review" description="Licensed paralegal for severance negotiation in Ontario. Don't accept the first offer. Review, calculate entitlement, negotiate. Free consultation." canonical="https://www.legalassist.london/services/severance-negotiation" />
      <ServicePageLayout seoTitle="Severance Negotiation | Ontario" seoDescription="Severance negotiation help in Ontario." canonical="https://www.legalassist.london/services/severance-negotiation" problemHeadline="Severance Negotiation" problemDescription="Offered a severance package? Don't sign yet. First offers are almost always below your actual entitlement. I help you get what you deserve." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Severance negotiation" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Why First Offers Are Usually Low</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                Don't Sign Anything Yet
              </h3>
              <p className="text-red-900">Once you sign a release, you cannot come back for more money—even if you later learn you were entitled to much more. Get your package reviewed before signing anything.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">ESA vs. Common Law: The Gap</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Years of Service</th>
                    <th className="px-6 py-4 text-center font-heading">ESA Minimum</th>
                    <th className="px-6 py-4 text-center font-heading">Common Law (Typical)</th>
                    <th className="px-6 py-4 text-center font-heading">Difference</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4">3 years</td><td className="px-6 py-4 text-center">3 weeks</td><td className="px-6 py-4 text-center bg-green-50 font-medium">2-3 months</td><td className="px-6 py-4 text-center text-green-600">3-4x more</td></tr>
                  <tr><td className="px-6 py-4">5 years</td><td className="px-6 py-4 text-center">5 weeks</td><td className="px-6 py-4 text-center bg-green-50 font-medium">4-6 months</td><td className="px-6 py-4 text-center text-green-600">4-5x more</td></tr>
                  <tr><td className="px-6 py-4">10 years</td><td className="px-6 py-4 text-center">8 weeks (max)</td><td className="px-6 py-4 text-center bg-green-50 font-medium">8-12 months</td><td className="px-6 py-4 text-center text-green-600">5-6x more</td></tr>
                  <tr><td className="px-6 py-4">20 years</td><td className="px-6 py-4 text-center">8 weeks (max)</td><td className="px-6 py-4 text-center bg-green-50 font-medium">18-24 months</td><td className="px-6 py-4 text-center text-green-600">10-12x more</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What Affects Your Entitlement</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <Clock className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="font-bold text-foreground mb-2">Age</div>
                <p className="text-foreground/80 text-sm">Older = more notice (harder to find work)</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <Calculator className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="font-bold text-foreground mb-2">Tenure</div>
                <p className="text-foreground/80 text-sm">Longer service = more notice</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <FileText className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="font-bold text-foreground mb-2">Position</div>
                <p className="text-foreground/80 text-sm">Senior/specialized = more notice</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <DollarSign className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="font-bold text-foreground mb-2">Market</div>
                <p className="text-foreground/80 text-sm">Job availability affects notice</p>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Beyond Base Salary</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-bold text-green-800 mb-2">Your Package Should Include:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-900 text-sm">
                <ul className="space-y-1">
                  <li>✓ Base salary for notice period</li>
                  <li>✓ Benefits continuation (or cash value)</li>
                  <li>✓ Bonus (prorated or full if normally earned)</li>
                  <li>✓ Commission (if applicable)</li>
                </ul>
                <ul className="space-y-1">
                  <li>✓ Pension contributions</li>
                  <li>✓ Car allowance continuation</li>
                  <li>✓ Stock option vesting</li>
                  <li>✓ Vacation pay owed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Severance FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Received a Severance Offer?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Don't sign until you know what you're actually entitled to. Free assessment.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get Your Package Reviewed</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.employment} />
      </ServicePageLayout>
    </>
  );
}
