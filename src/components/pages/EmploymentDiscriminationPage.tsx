import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Briefcase, Scale, Shield, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function EmploymentDiscriminationPage() {
  const authorityItems = [
    { title: 'Discrimination Claims', description: 'Employment discrimination based on protected grounds is illegal. I help workers file Human Rights Tribunal applications.' },
    { title: 'Multiple Grounds', description: 'Race, sex, disability, age, religion, family status, sexual orientation—all protected.' },
    { title: 'Significant Remedies', description: 'HRTO can order compensation for lost wages, injury to dignity, and reinstatement.' }
  ];

  const processSteps = [
    { step: '1', title: 'Document Everything', description: 'Evidence of discriminatory treatment, comparators, impact.' },
    { step: '2', title: 'Assess Strength', description: 'Determine if treatment was based on protected ground.' },
    { step: '3', title: 'File Application', description: 'HRTO application within 1 year of discrimination.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Broad Protection', description: 'Many grounds protected by Human Rights Code.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'No Cap', description: 'HRTO damages not capped like some jurisdictions.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Employer Liability', description: 'Employers responsible even for supervisor conduct.' }
  ];

  const honestFAQs = [
    { question: "What counts as employment discrimination?", answer: "Treating someone differently in hiring, firing, promotion, compensation, or terms of employment based on a protected ground: race, sex, disability, age, religion, family status, sexual orientation, gender identity, place of origin, etc." },
    { question: "How do I prove discrimination?", answer: "Show: (1) you belong to a protected group, (2) you experienced adverse treatment, (3) your protected characteristic was a factor (doesn't have to be the only factor). Direct evidence is rare—usually proven through circumstantial evidence and comparisons." },
    { question: "What if they say they had another reason?", answer: "Employers often claim legitimate reasons. The question is whether the protected ground was a factor, even if other factors existed. 'Mixed motive' cases can still succeed if discrimination played a role." },
    { question: "What about systemic discrimination?", answer: "Not just individual bad actors—policies or practices that disproportionately affect protected groups can be discrimination even without intent. Examples: height requirements, inflexible schedules, unnecessary qualifications." },
    { question: "What damages are available?", answer: "Lost wages (past and future), general damages for injury to dignity ($5,000-$50,000+ depending on severity), and orders for reinstatement, policy changes, or training. No cap on damages at HRTO." },
    { question: "How long do I have to file?", answer: "1 year from the last incident of discrimination. Ongoing discrimination extends this, but don't wait—file early while evidence is fresh." }
  ];

  return (
    <>
      <SEO title="Employment Discrimination Paralegal Ontario | HRTO Workplace Claims" description="Licensed paralegal for employment discrimination claims in Ontario. Race, sex, disability, age discrimination. HRTO applications. Free consultation." canonical="https://www.legalassist.london/services/employment-discrimination" />
      <ServicePageLayout seoTitle="Employment Discrimination | Ontario" seoDescription="Employment discrimination help in Ontario." canonical="https://www.legalassist.london/services/employment-discrimination" problemHeadline="Employment Discrimination" problemDescription="Treated differently at work because of your race, sex, disability, age, or other protected characteristic? That's illegal. I help file Human Rights Tribunal claims." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Employment discrimination" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Employment Discrimination</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Protected Grounds</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {['Race/Colour', 'Sex/Gender', 'Disability', 'Age (18+)', 'Religion', 'Sexual Orientation', 'Family Status', 'Ethnic Origin', 'Place of Origin', 'Marital Status', 'Gender Identity', 'Citizenship'].map((ground) => (
                <div key={ground} className="bg-primary/5 rounded-lg p-3 text-center">
                  <span className="font-medium text-foreground text-sm">{ground}</span>
                </div>
              ))}
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Types of Discrimination</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-bold text-red-800 mb-3">Direct Discrimination:</h4>
                <ul className="text-red-900 text-sm space-y-2">
                  <li>• Not hired because of race/gender</li>
                  <li>• Fired after revealing pregnancy</li>
                  <li>• Passed over for promotion due to age</li>
                  <li>• Paid less than comparable employees</li>
                  <li>• Terminated after requesting accommodation</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="font-bold text-yellow-800 mb-3">Adverse Effect (Systemic):</h4>
                <ul className="text-yellow-900 text-sm space-y-2">
                  <li>• Policies that disproportionately affect groups</li>
                  <li>• Inflexible schedules affecting parents</li>
                  <li>• Physical requirements excluding disabilities</li>
                  <li>• "Canadian experience" requirements</li>
                  <li>• Language requirements beyond job needs</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Damages Available at HRTO</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Type</th>
                    <th className="px-6 py-4 text-left font-heading">What It Covers</th>
                    <th className="px-6 py-4 text-left font-heading">Typical Range</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Lost Wages</td><td className="px-6 py-4 text-sm">Wages lost due to discrimination</td><td className="px-6 py-4 text-sm">Actual losses</td></tr>
                  <tr><td className="px-6 py-4 font-medium">General Damages</td><td className="px-6 py-4 text-sm">Injury to dignity, feelings, self-respect</td><td className="px-6 py-4 text-sm">$5,000 - $50,000+</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Future Losses</td><td className="px-6 py-4 text-sm">If ongoing impact on earning capacity</td><td className="px-6 py-4 text-sm">Case-dependent</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Reinstatement</td><td className="px-6 py-4 text-sm">Get job back (rarely ordered)</td><td className="px-6 py-4 text-sm">If appropriate</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Document Everything</h4>
              <p className="text-yellow-900 text-sm">Discrimination is often subtle. Keep detailed records: dates, what was said, who witnessed it, how it affected you. Save emails, texts, performance reviews. Compare your treatment to colleagues—are others treated differently?</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Employment Discrimination FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Experiencing Discrimination at Work?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Document what's happening and let's discuss your options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.humanRights} />
      </ServicePageLayout>
    </>
  );
}
