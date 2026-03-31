import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, DollarSign, HelpCircle, Users, Shield, Scale, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function WorkplaceDiscriminationPage() {
  const authorityItems = [
    { title: 'Human Rights Claims', description: 'Discrimination based on protected grounds is illegal. I file and represent complaints at the Human Rights Tribunal.' },
    { title: 'Protected Grounds', description: 'Race, sex, disability, age, religion, sexual orientation, family status, and more are protected.' },
    { title: 'Multiple Remedies', description: 'Lost wages, compensation for injury to dignity, policy changes, and more.' }
  ];

  const processSteps = [
    { step: '1', title: 'Case Assessment', description: 'Determine if discrimination occurred and which grounds apply.' },
    { step: '2', title: 'HRTO Application', description: 'File detailed application within limitation period (1 year).' },
    { step: '3', title: 'Tribunal Process', description: 'Mediation attempt, then hearing if no resolution.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'No Filing Fee', description: 'HRTO applications are free to file.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Compensation Available', description: 'Lost wages plus injury to dignity awards.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Burden Shifts', description: 'Once you show discrimination, employer must explain.' }
  ];

  const honestFAQs = [
    { question: "What counts as workplace discrimination?", answer: "Treating someone differently—in hiring, promotion, discipline, termination, or working conditions—because of a protected ground: race, colour, ancestry, place of origin, ethnic origin, citizenship, creed, sex, sexual orientation, gender identity, age, marital status, family status, or disability." },
    { question: "What if the discrimination was subtle?", answer: "Discrimination is often subtle—a pattern of exclusion, different treatment, or creating a hostile environment. Direct evidence isn't required. Circumstantial evidence showing a pattern or differential treatment can establish discrimination." },
    { question: "What's the difference between discrimination and harassment?", answer: "Harassment is unwanted conduct related to a protected ground that creates a hostile environment. Discrimination is adverse treatment because of a protected ground. Both are prohibited, and harassment based on protected grounds is a form of discrimination." },
    { question: "What compensation can I get?", answer: "Lost wages (past and future), general damages for injury to dignity ($10,000-$50,000+ depending on severity), reinstatement or policy changes, and in some cases costs. The Tribunal can order significant monetary compensation." },
    { question: "Do I need to file an internal complaint first?", answer: "No—but if your employer has a complaint process and you didn't use it, that may affect remedies. Having tried to resolve internally first strengthens your case and shows good faith." },
    { question: "How long do I have to file?", answer: "One year from the discriminatory act. If it's ongoing, the clock may reset with each incident. But don't wait—file within 1 year of the most recent incident. You can request late filing, but it's not guaranteed." }
  ];

  return (
    <>
      <SEO title="Workplace Discrimination Paralegal Ontario | Human Rights Tribunal" description="Licensed paralegal for workplace discrimination claims in Ontario. Race, disability, gender, age discrimination. HRTO applications. Free consultation." canonical="https://www.legalassist.london/services/workplace-discrimination" />
      <ServicePageLayout seoTitle="Workplace Discrimination | Ontario HRTO" seoDescription="Workplace discrimination claims at the Human Rights Tribunal." canonical="https://www.legalassist.london/services/workplace-discrimination" problemHeadline="Workplace Discrimination in Ontario" problemDescription="Treated differently because of who you are? Discrimination based on protected grounds is illegal. The Human Rights Tribunal can award significant compensation." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Workplace discrimination" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Protected Grounds in Ontario</h2>
            
            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Ontario Human Rights Code
              </h3>
              <p className="text-foreground/80">The Human Rights Code prohibits discrimination in employment based on protected grounds. Employers cannot treat you differently—in hiring, promotion, discipline, or termination—because of these characteristics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6">
                <h4 className="font-bold text-foreground mb-3">Personal Characteristics:</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Race</li>
                  <li>• Colour</li>
                  <li>• Ancestry</li>
                  <li>• Place of origin</li>
                  <li>• Ethnic origin</li>
                  <li>• Citizenship</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <h4 className="font-bold text-foreground mb-3">Identity & Belief:</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Creed (religion)</li>
                  <li>• Sex (including pregnancy)</li>
                  <li>• Sexual orientation</li>
                  <li>• Gender identity/expression</li>
                  <li>• Age (18+)</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <h4 className="font-bold text-foreground mb-3">Status & Ability:</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Disability (physical/mental)</li>
                  <li>• Marital status</li>
                  <li>• Family status</li>
                  <li>• Record of offences</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Types of Discrimination</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-bold text-red-800 mb-3">Direct Discrimination:</h4>
                <ul className="text-red-900 text-sm space-y-2">
                  <li>• "You're too old for this role"</li>
                  <li>• Refusing to hire based on accent</li>
                  <li>• Termination upon learning of disability</li>
                  <li>• Different pay for same work based on gender</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="font-bold text-yellow-800 mb-3">Systemic/Indirect Discrimination:</h4>
                <ul className="text-yellow-900 text-sm space-y-2">
                  <li>• Requirements that disproportionately exclude groups</li>
                  <li>• Failure to accommodate disabilities</li>
                  <li>• Hostile environment for certain groups</li>
                  <li>• Patterns of excluding certain groups from promotion</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Compensation Ranges</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Category</th>
                    <th className="px-6 py-4 text-left font-heading">Range</th>
                    <th className="px-6 py-4 text-left font-heading">Factors</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Lost Wages</td><td className="px-6 py-4 text-sm">Actual losses</td><td className="px-6 py-4 text-sm">Past and future if job loss</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Injury to Dignity (minor)</td><td className="px-6 py-4 text-sm">$5,000-15,000</td><td className="px-6 py-4 text-sm">Isolated incidents, quick resolution</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Injury to Dignity (moderate)</td><td className="px-6 py-4 text-sm">$15,000-35,000</td><td className="px-6 py-4 text-sm">Pattern of discrimination, significant impact</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Injury to Dignity (serious)</td><td className="px-6 py-4 text-sm">$35,000-75,000+</td><td className="px-6 py-4 text-sm">Severe impact, malicious conduct, trauma</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Important: 1 Year Limitation</h4>
              <p className="text-yellow-900 text-sm">You have only 1 year from the discriminatory act to file at the HRTO. Don't wait. If it's ongoing, file based on the most recent incident but include the full history.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Discrimination FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Experiencing Workplace Discrimination?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Document everything and let's discuss your options. The 1-year deadline matters.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.humanRights} />
      </ServicePageLayout>
    </>
  );
}
