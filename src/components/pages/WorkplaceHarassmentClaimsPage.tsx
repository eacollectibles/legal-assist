import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Briefcase, Shield, FileText, Users } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function WorkplaceHarassmentClaimsPage() {
  const authorityItems = [
    { title: 'Workplace Harassment', description: 'Ontario\'s OHSA requires employers to investigate harassment complaints. If they don\'t, you have options.' },
    { title: 'Multiple Paths', description: 'Workplace harassment can lead to: internal complaint, MOL complaint, human rights claim (if based on protected ground), or constructive dismissal.' },
    { title: 'Documentation Critical', description: 'Harassment cases are won with evidence. Dates, incidents, witnesses, communications—document everything.' }
  ];

  const processSteps = [
    { step: '1', title: 'Document Incidents', description: 'Detailed log of harassment with dates.' },
    { step: '2', title: 'Internal Complaint', description: 'Use employer\'s harassment process.' },
    { step: '3', title: 'Escalate if Needed', description: 'MOL, HRTO, or legal claim if unresolved.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Employer Must Act', description: 'Investigation required by law.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Multiple Options', description: 'Several legal paths available.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Evidence Matters', description: 'Build your case carefully.' }
  ];

  const honestFAQs = [
    { question: "What counts as workplace harassment under Ontario law?", answer: "Under OHSA: 'engaging in a course of vexatious comment or conduct against a worker... that is known or ought reasonably to be known to be unwelcome.' Key: must be a pattern (course of conduct), not single incident unless severe. Includes bullying, repeated insults, humiliation." },
    { question: "My employer has a harassment policy but isn't following it. What can I do?", answer: "Employers must investigate complaints. If they ignore your complaint or do a sham investigation, you can: file MOL complaint (OHSA violation), pursue constructive dismissal if conditions become intolerable, or file HRTO if harassment is based on protected ground." },
    { question: "Is workplace harassment always a human rights issue?", answer: "No. Workplace harassment based on protected grounds (race, sex, disability, etc.) is human rights discrimination. But harassment not based on protected grounds (general bullying, personality conflicts) isn't human rights—it's still OHSA harassment with different remedies." },
    { question: "What's the difference between MOL complaint and HRTO?", answer: "MOL (OHSA): employer's failure to address workplace harassment. Orders compliance, may fine employer. No damages to you. HRTO (Human Rights): harassment based on protected ground. Can award damages to you ($10,000-$50,000+). Different grounds, different outcomes." },
    { question: "Can I quit and sue for constructive dismissal?", answer: "If harassment makes workplace intolerable and employer won't fix it, you may have constructive dismissal claim. But: document everything first, give employer chance to address, get legal advice before quitting. Quitting prematurely weakens your claim." },
    { question: "I'm afraid of retaliation if I complain. Is that protected?", answer: "Yes. Reprisal for making a harassment complaint is illegal under OHSA and human rights law. If employer fires, demotes, or punishes you for complaining, that's a separate violation. Document retaliation carefully." }
  ];

  return (
    <>
      <SEO title="Workplace Harassment Claims Paralegal Ontario | Bullying at Work" description="Licensed paralegal for workplace harassment claims in Ontario. OHSA complaints, employer investigation failures, bullying. Free consultation." canonical="https://www.legalassist.london/services/workplace-harassment-claims" />
      <ServicePageLayout seoTitle="Workplace Harassment Claims | Ontario" seoDescription="Workplace harassment help in Ontario." canonical="https://www.legalassist.london/services/workplace-harassment-claims" problemHeadline="Workplace Harassment Claims" problemDescription="Being harassed or bullied at work? Employer won't act? Ontario law requires employers to investigate—and gives you options if they don't." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Workplace harassment" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Workplace Harassment</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">OHSA Definition</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <p className="text-foreground/80 mb-4">"Workplace harassment" under Ontario's Occupational Health and Safety Act means:</p>
              <p className="text-foreground font-medium italic">"Engaging in a course of vexatious comment or conduct against a worker in a workplace that is known or ought reasonably to be known to be unwelcome."</p>
              <p className="text-foreground/70 text-sm mt-4">Key elements: (1) course of conduct (pattern, not single incident), (2) vexatious (annoying, troubling), (3) known to be unwelcome.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Examples of Workplace Harassment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Likely Harassment:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Repeated insults or put-downs</li>
                  <li>• Yelling, screaming regularly</li>
                  <li>• Deliberate exclusion from meetings</li>
                  <li>• Spreading rumors</li>
                  <li>• Unreasonable criticism pattern</li>
                  <li>• Humiliation in front of others</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">Usually NOT Harassment:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• Reasonable management actions</li>
                  <li>• Legitimate performance feedback</li>
                  <li>• Single incidents (unless severe)</li>
                  <li>• Work disagreements</li>
                  <li>• Scheduling decisions</li>
                  <li>• Workplace changes you dislike</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Your Options</h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Path</th>
                    <th className="px-6 py-4 text-left font-heading">When to Use</th>
                    <th className="px-6 py-4 text-left font-heading">Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Internal complaint</td><td className="px-6 py-4 text-sm">First step—use employer's process</td><td className="px-6 py-4 text-sm">Investigation, potential resolution</td></tr>
                  <tr><td className="px-6 py-4 font-medium">MOL complaint</td><td className="px-6 py-4 text-sm">Employer ignores/botches complaint</td><td className="px-6 py-4 text-sm">Order to comply, employer fined</td></tr>
                  <tr><td className="px-6 py-4 font-medium">HRTO application</td><td className="px-6 py-4 text-sm">Harassment based on protected ground</td><td className="px-6 py-4 text-sm">Damages to you ($10K-$50K+)</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Constructive dismissal</td><td className="px-6 py-4 text-sm">Conditions become intolerable</td><td className="px-6 py-4 text-sm">Severance, damages</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Document Everything</h4>
              <p className="text-yellow-900 text-sm">Keep a harassment log: date, time, what happened, who witnessed, how it affected you. Save emails and messages. This contemporaneous evidence is crucial for any legal path.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Workplace Harassment FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Being Harassed at Work?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">You have rights. Let me help you understand your options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.employment} />
      </ServicePageLayout>
    </>
  );
}
