import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, DollarSign, HelpCircle, Briefcase, Clock, Calculator, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function WrongfulDismissalPage() {
  const authorityItems = [
    { title: 'Wrongful Dismissal Claims', description: 'If you were terminated without adequate notice or severance, you may be entitled to significant compensation.' },
    { title: 'Notice Period Assessment', description: 'I calculate your common law notice entitlement based on age, tenure, position, and other factors.' },
    { title: 'Severance Negotiation', description: 'I negotiate with employers to secure fair severance packages without always needing litigation.' }
  ];

  const processSteps = [
    { step: '1', title: 'Entitlement Calculation', description: 'Assess your notice period under common law vs. what you received.' },
    { step: '2', title: 'Demand & Negotiation', description: 'Formal demand letter often resolves matters quickly.' },
    { step: '3', title: 'Legal Action', description: 'Small Claims (up to $35K) or help you find litigation counsel if more.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Beyond ESA Minimums', description: 'Common law notice far exceeds statutory minimums.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Quick Resolution', description: 'Many cases settle with demand letter alone.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Multiple Factors', description: 'Age, tenure, position all increase your entitlement.' }
  ];

  const honestFAQs = [
    { question: "What is wrongful dismissal?", answer: "When an employer terminates you without providing adequate notice or pay in lieu of notice. Even 'at will' employees are entitled to reasonable notice under common law—which is almost always more than the Employment Standards Act minimums." },
    { question: "How much notice am I entitled to?", answer: "ESA minimums are 1 week per year up to 8 weeks. Common law is typically 3-4 weeks per year of service, sometimes more. Factors: age (older = more), position (senior = more), tenure, availability of comparable work, how you were hired." },
    { question: "Does my employment contract limit my notice?", answer: "Maybe. If your contract has an enforceable termination clause that limits notice to ESA minimums, it may be valid. However, many termination clauses are unenforceable due to technical defects. I'll review your contract." },
    { question: "What if I was fired for cause?", answer: "True 'for cause' dismissal (theft, serious misconduct, fraud) means no notice owed. However, employers often claim cause when it doesn't apply. Poor performance alone is rarely cause. If employer claimed cause improperly, you have a strong claim." },
    { question: "Do I have to look for a new job?", answer: "Yes—you have a duty to mitigate. You must make reasonable efforts to find comparable employment. If you don't, your damages may be reduced. Keep records of your job search." },
    { question: "What about my benefits during the notice period?", answer: "You may be entitled to continuation of benefits (health, dental) or compensation for their loss during the reasonable notice period. This is part of your total damages." }
  ];

  return (
    <>
      <SEO title="Wrongful Dismissal Paralegal Ontario | Severance Negotiation" description="Licensed paralegal for wrongful dismissal claims in Ontario. Notice period calculation, severance negotiation. Claims up to $50,000. Free consultation." canonical="https://www.legalassist.london/services/wrongful-dismissal" />
      <ServicePageLayout seoTitle="Wrongful Dismissal | Ontario" seoDescription="Wrongful dismissal help in Ontario." canonical="https://www.legalassist.london/services/wrongful-dismissal" problemHeadline="Wrongful Dismissal Claims" problemDescription="Terminated without adequate notice? You're likely entitled to more than ESA minimums. I help calculate your entitlement and negotiate fair severance." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Wrongful dismissal" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Notice Entitlements</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                Don't Accept the First Offer
              </h3>
              <p className="text-red-900">Employers often offer ESA minimums first. Common law entitlements are typically 3-4x higher. Get an assessment before signing anything.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">ESA vs. Common Law Notice</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Years of Service</th>
                    <th className="px-6 py-4 text-center font-heading">ESA Minimum</th>
                    <th className="px-6 py-4 text-center font-heading">Common Law (Typical)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4">1 year</td><td className="px-6 py-4 text-center">1 week</td><td className="px-6 py-4 text-center bg-green-50 font-medium">3-4 weeks</td></tr>
                  <tr><td className="px-6 py-4">3 years</td><td className="px-6 py-4 text-center">3 weeks</td><td className="px-6 py-4 text-center bg-green-50 font-medium">2-3 months</td></tr>
                  <tr><td className="px-6 py-4">5 years</td><td className="px-6 py-4 text-center">5 weeks</td><td className="px-6 py-4 text-center bg-green-50 font-medium">4-6 months</td></tr>
                  <tr><td className="px-6 py-4">10 years</td><td className="px-6 py-4 text-center">8 weeks (max)</td><td className="px-6 py-4 text-center bg-green-50 font-medium">8-12 months</td></tr>
                  <tr><td className="px-6 py-4">20+ years</td><td className="px-6 py-4 text-center">8 weeks (max)</td><td className="px-6 py-4 text-center bg-green-50 font-medium">18-24 months</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Factors That Increase Notice</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <Clock className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="font-bold text-foreground mb-2">Age</div>
                <p className="text-foreground/80 text-sm">Older employees = more notice (harder to find work)</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <Briefcase className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="font-bold text-foreground mb-2">Position</div>
                <p className="text-foreground/80 text-sm">Senior/specialized roles = more notice</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <Calculator className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="font-bold text-foreground mb-2">Tenure</div>
                <p className="text-foreground/80 text-sm">Longer service = more notice</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <FileText className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="font-bold text-foreground mb-2">Inducement</div>
                <p className="text-foreground/80 text-sm">Left secure job = more notice</p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Important: Don't Sign a Release Yet</h4>
              <p className="text-yellow-900 text-sm">Employers often ask you to sign a release in exchange for severance. Once signed, you typically can't claim more. Get an assessment of your entitlement BEFORE signing anything.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Wrongful Dismissal FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Recently Terminated?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Don't accept the first offer. Let me calculate what you're actually entitled to.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.employment} />
      </ServicePageLayout>
    </>
  );
}
