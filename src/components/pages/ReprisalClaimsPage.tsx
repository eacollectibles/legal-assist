import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Shield, Scale, FileText, AlertCircle } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ReprisalClaimsPage() {
  const authorityItems = [
    { title: 'Reprisal Protection', description: 'If you were punished for asserting your rights—filing a complaint, requesting accommodation, or reporting violations—you may have a reprisal claim.' },
    { title: 'Multiple Laws', description: 'Reprisal protections exist under Human Rights Code, ESA, OHSA, and other legislation.' },
    { title: 'Significant Damages', description: 'Reprisal claims can result in substantial damages including reinstatement and lost wages.' }
  ];

  const processSteps = [
    { step: '1', title: 'Document Timeline', description: 'Show connection between protected activity and adverse treatment.' },
    { step: '2', title: 'Identify Law', description: 'Determine which reprisal protection applies.' },
    { step: '3', title: 'File Claim', description: 'HRTO, Ministry of Labour, or other appropriate forum.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Protected Activities', description: 'Complaints, accommodation requests, reporting.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Timing Matters', description: 'Close timing between activity and retaliation is evidence.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Strong Remedies', description: 'Reinstatement, lost wages, damages.' }
  ];

  const honestFAQs = [
    { question: "What is reprisal/retaliation?", answer: "Punishing someone for exercising legal rights: filing a human rights complaint, requesting disability accommodation, reporting safety violations, taking protected leave, or participating in workplace investigations. The punishment can be termination, demotion, schedule changes, harassment, or other negative treatment." },
    { question: "How do I prove reprisal?", answer: "Show: (1) you engaged in protected activity, (2) employer knew about it, (3) you suffered adverse treatment, (4) timing suggests connection. Close timing between complaint and punishment is strong evidence. Employer then must show legitimate non-retaliatory reason." },
    { question: "I was fired right after filing a complaint. Is that automatic reprisal?", answer: "Strong evidence, but not automatic. Employer can argue they had legitimate reasons unrelated to your complaint. However, suspicious timing shifts burden to them to prove their reason is genuine. Documentation of the real reason (or lack thereof) matters." },
    { question: "What counts as protected activity?", answer: "Filing human rights complaint, requesting accommodation, reporting ESA violations, refusing unsafe work, participating in workplace investigation, taking pregnancy/parental leave, whistleblowing on illegal activity, and more. Each law has specific protections." },
    { question: "What if they claim poor performance?", answer: "Common employer defence. Look at: were there performance concerns BEFORE your complaint? Did documentation change after? Are others with similar issues treated differently? Manufactured or newly-discovered performance issues after a complaint are evidence of pretext." },
    { question: "What damages are available for reprisal?", answer: "Depends on forum. HRTO: reinstatement, lost wages, general damages for injury to dignity. Ministry of Labour (ESA): reinstatement, compensation. The goal is to put you back where you would have been without the reprisal." }
  ];

  return (
    <>
      <SEO title="Reprisal Claims Paralegal Ontario | Workplace Retaliation" description="Licensed paralegal for reprisal and retaliation claims in Ontario. Fired after complaint? Punished for asserting rights? Free consultation." canonical="https://www.legalassist.london/services/reprisal-claims" />
      <ServicePageLayout seoTitle="Reprisal Claims | Ontario" seoDescription="Reprisal and retaliation claims in Ontario." canonical="https://www.legalassist.london/services/reprisal-claims" problemHeadline="Reprisal / Retaliation Claims" problemDescription="Punished for filing a complaint, requesting accommodation, or reporting violations? That's illegal reprisal. I help fight back." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Reprisal claims" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Reprisal</h2>
            
            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">You Have the Right to Assert Your Rights</h3>
              <p className="text-foreground/80">Ontario law protects employees who file complaints, request accommodation, report violations, or participate in investigations. Employers cannot punish you for exercising these rights.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Protected Activities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <Shield className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">You're Protected If You:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Filed a human rights complaint</li>
                  <li>• Requested disability accommodation</li>
                  <li>• Reported ESA violations</li>
                  <li>• Refused unsafe work (OHSA)</li>
                  <li>• Took pregnancy/parental leave</li>
                  <li>• Participated in workplace investigation</li>
                  <li>• Asked about your rights</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <AlertCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Reprisal Can Include:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Termination</li>
                  <li>• Demotion or reduced hours</li>
                  <li>• Schedule changes as punishment</li>
                  <li>• Negative performance reviews</li>
                  <li>• Harassment or hostile treatment</li>
                  <li>• Exclusion from opportunities</li>
                  <li>• Threats or intimidation</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Proving Reprisal</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Element</th>
                    <th className="px-6 py-4 text-left font-heading">What You Need</th>
                    <th className="px-6 py-4 text-left font-heading">Evidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Protected activity</td><td className="px-6 py-4 text-sm">Show you did something protected</td><td className="px-6 py-4 text-sm">Complaint copy, accommodation request, report</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Employer knowledge</td><td className="px-6 py-4 text-sm">They knew about your activity</td><td className="px-6 py-4 text-sm">Emails, meetings, HR involvement</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Adverse treatment</td><td className="px-6 py-4 text-sm">You suffered negative consequences</td><td className="px-6 py-4 text-sm">Termination letter, schedule changes, documentation</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Connection</td><td className="px-6 py-4 text-sm">Link between activity and treatment</td><td className="px-6 py-4 text-sm">Timing, statements, changed behavior</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Timing Is Powerful Evidence</h4>
              <p className="text-yellow-900 text-sm">If you're fired days or weeks after filing a complaint, that timing alone is strong evidence of reprisal. Employers must then prove they had legitimate reasons unrelated to your complaint. Suspicious timing shifts the burden to them.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Reprisal FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Punished for Speaking Up?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Document the timeline and let's discuss your reprisal claim.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.humanRights} />
      </ServicePageLayout>
    </>
  );
}
