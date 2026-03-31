import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, AlertCircle, Shield, FileText, Scale } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function WorkplaceHarassmentPage() {
  const authorityItems = [
    { title: 'Harassment Claims', description: 'Workplace harassment based on protected grounds violates the Human Rights Code. I help enforce your rights.' },
    { title: 'HRTO Applications', description: 'I file Human Rights Tribunal applications for harassment in employment, housing, and services.' },
    { title: 'Multiple Avenues', description: 'Options include HRTO, Ministry of Labour, wrongful dismissal claims, or internal complaints.' }
  ];

  const processSteps = [
    { step: '1', title: 'Document Everything', description: 'Dates, times, witnesses, communications—build your evidence.' },
    { step: '2', title: 'Choose Your Path', description: 'HRTO, Ministry complaint, or civil action—each has pros and cons.' },
    { step: '3', title: 'File & Pursue', description: 'Present your case and seek appropriate remedies.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Protected Grounds', description: 'Harassment based on race, sex, disability, etc. is illegal.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Employer Liability', description: 'Employers are responsible for harassment they knew/should have known about.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Significant Damages', description: 'HRTO awards general damages, lost wages, and more.' }
  ];

  const honestFAQs = [
    { question: "What counts as workplace harassment under the Human Rights Code?", answer: "Unwelcome conduct based on a protected ground (race, sex, disability, age, etc.) that is known or ought to be known to be unwelcome. Can be verbal, physical, or environmental. Single serious incidents or pattern of lesser conduct." },
    { question: "What about general workplace bullying?", answer: "General bullying NOT based on a protected ground is not covered by the Human Rights Code. However, it may be covered by OHSA workplace harassment provisions (Ministry of Labour) or support a constructive dismissal claim." },
    { question: "What are the protected grounds?", answer: "Race, ancestry, place of origin, colour, ethnic origin, citizenship, creed (religion), sex (including pregnancy), sexual orientation, gender identity, disability, age, family status, marital status." },
    { question: "What if I complained and nothing happened?", answer: "Employers have a duty to investigate and take appropriate action. Failure to do so makes them liable for the harassment—even if a supervisor or coworker did it. Inadequate response strengthens your HRTO case." },
    { question: "What damages are available?", answer: "General damages for injury to dignity ($5,000-$50,000+), lost wages if terminated or forced out, reinstatement (rarely ordered), and orders for policy changes. Individual harassers can also be personally liable." },
    { question: "How long do I have to file?", answer: "HRTO: 1 year from last incident. Don't wait until the deadline—evidence fades and witnesses forget. File early or get legal advice early." }
  ];

  return (
    <>
      <SEO title="Workplace Harassment Paralegal Ontario | HRTO Claims" description="Licensed paralegal for workplace harassment claims in Ontario. Human Rights Tribunal, discrimination, hostile work environment. Free consultation." canonical="https://www.legalassist.london/services/workplace-harassment" />
      <ServicePageLayout seoTitle="Workplace Harassment | Ontario" seoDescription="Workplace harassment help in Ontario." canonical="https://www.legalassist.london/services/workplace-harassment" problemHeadline="Workplace Harassment Claims" problemDescription="Facing harassment at work based on your race, sex, disability, or other protected ground? You have legal options to stop it and seek compensation." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Workplace harassment" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Workplace Harassment</h2>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                Important Distinction
              </h3>
              <p className="text-yellow-900">Human Rights Code covers harassment based on protected grounds. General workplace bullying (not based on protected grounds) may be covered under OHSA or support other claims, but not HRTO applications.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Protected Grounds</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {['Race', 'Sex/Gender', 'Disability', 'Age', 'Religion', 'Sexual Orientation', 'Family Status', 'Ethnic Origin'].map((ground) => (
                <div key={ground} className="bg-primary/5 rounded-lg p-4 text-center">
                  <span className="font-medium text-foreground">{ground}</span>
                </div>
              ))}
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What Constitutes Harassment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-bold text-red-800 mb-3">Examples of Code Harassment:</h4>
                <ul className="text-red-900 text-sm space-y-2">
                  <li>• Racial slurs or jokes</li>
                  <li>• Sexual comments or advances</li>
                  <li>• Mocking disability or accommodation</li>
                  <li>• Age-based comments ("too old to learn")</li>
                  <li>• Religious mockery</li>
                  <li>• Homophobic or transphobic conduct</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="font-bold text-yellow-800 mb-3">May Not Be Code Harassment:</h4>
                <ul className="text-yellow-900 text-sm space-y-2">
                  <li>• General rudeness to everyone</li>
                  <li>• Personality conflicts</li>
                  <li>• Legitimate performance criticism</li>
                  <li>• Reasonable management decisions</li>
                  <li>• Work stress not based on protected grounds</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Your Options</h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Option</th>
                    <th className="px-6 py-4 text-left font-heading">Best For</th>
                    <th className="px-6 py-4 text-center font-heading">Time Limit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">HRTO Application</td><td className="px-6 py-4 text-sm">Code-based harassment, damages for dignity</td><td className="px-6 py-4 text-center">1 year</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Ministry of Labour (OHSA)</td><td className="px-6 py-4 text-sm">General harassment, safety concerns</td><td className="px-6 py-4 text-center">Varies</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Civil Claim</td><td className="px-6 py-4 text-sm">Constructive dismissal, larger damages</td><td className="px-6 py-4 text-center">2 years</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-bold text-green-800 mb-2">Document Everything</h4>
              <p className="text-green-900 text-sm">Keep a detailed log: dates, times, what was said/done, who witnessed it, and how it affected you. Save emails, texts, and other communications. Good documentation often makes or breaks harassment cases.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Harassment FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Experiencing Workplace Harassment?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Document what's happening and let's discuss your options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.humanRights} />
      </ServicePageLayout>
    </>
  );
}
