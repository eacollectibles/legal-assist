import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Briefcase, Shield, Scale, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function TerminationWithCausePage() {
  const authorityItems = [
    { title: 'Wrongful Cause Claims', description: 'Employers often claim "cause" when it doesn\'t exist. True cause is rare—most "cause" terminations can be challenged.' },
    { title: 'High Bar for Employers', description: 'The legal standard for cause is very high. Poor performance alone is rarely sufficient.' },
    { title: 'Full Notice Recoverable', description: 'If cause is disproven, you\'re entitled to full reasonable notice—often significant damages.' }
  ];

  const processSteps = [
    { step: '1', title: 'Assess Allegations', description: 'What did employer actually allege? Is it documented?' },
    { step: '2', title: 'Challenge Validity', description: 'Does conduct actually meet legal test for cause?' },
    { step: '3', title: 'Pursue Damages', description: 'Claim wrongful dismissal damages if cause is invalid.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'High Standard', description: 'True cause requires serious misconduct.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Often Invalid', description: 'Many cause terminations fail legal scrutiny.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Full Notice If Wrong', description: 'Invalid cause = full wrongful dismissal claim.' }
  ];

  const honestFAQs = [
    { question: "What actually constitutes cause for termination?", answer: "True cause requires conduct that fundamentally breaches the employment relationship: theft, fraud, serious insubordination, workplace violence, breach of fiduciary duty, or serious misconduct. Poor performance, personality conflicts, or minor policy violations typically don't qualify." },
    { question: "My employer says I was fired for poor performance. Is that cause?", answer: "Almost never. Performance-based cause requires: clear standards communicated, warnings given, opportunity to improve, and still fundamental failure. Even then, courts often find progressive discipline required. Sudden termination for performance is usually not cause." },
    { question: "I was fired without warning. Can they claim cause?", answer: "For most misconduct, employer should have given warnings and opportunity to correct. Exception: single acts so serious they justify immediate termination (theft, violence, fraud). Most conduct requires a pattern with warnings." },
    { question: "What if I actually did what they're alleging?", answer: "Even if true, the conduct may not rise to legal 'cause.' Context matters: was it isolated? Provoked? Minor in nature? Were others treated differently? The question is whether the employment relationship is irreparably damaged—courts often say no." },
    { question: "What's the downside of fighting a cause termination?", answer: "Litigation can be lengthy and expensive. If you truly engaged in serious misconduct, you might lose and get nothing. But if cause is weak—which it often is—the potential recovery (months/years of pay) justifies the fight." },
    { question: "Can they claim cause but still offer me severance?", answer: "Yes—and this often happens. It's called 'near cause.' They're hedging their bets. This signals they know their cause claim is weak. You can likely negotiate significantly more because they fear losing at trial." }
  ];

  return (
    <>
      <SEO title="Wrongful Termination for Cause Paralegal Ontario | Challenge Cause" description="Licensed paralegal challenging termination for cause in Ontario. Employers often claim cause wrongly. Fight back for full severance. Free consultation." canonical="https://www.legalassist.london/services/termination-with-cause" />
      <ServicePageLayout seoTitle="Termination With Cause | Ontario" seoDescription="Challenge termination for cause in Ontario." canonical="https://www.legalassist.london/services/termination-with-cause" problemHeadline="Fired for Cause?" problemDescription="Employer says you were terminated 'for cause' and don't deserve severance? The legal bar for cause is extremely high—and employers often get it wrong." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Termination with cause" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding "Cause" for Termination</h2>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                The Bar Is Very High
              </h3>
              <p className="text-green-900">Legal "cause" requires conduct so serious it fundamentally destroys the employment relationship. Courts rarely find cause exists. Employers claiming cause often lose when challenged.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What Is & Isn't Cause</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">May Be Cause:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Theft or fraud</li>
                  <li>• Workplace violence</li>
                  <li>• Serious breach of fiduciary duty</li>
                  <li>• Gross insubordination after warning</li>
                  <li>• Criminal conduct affecting employment</li>
                  <li>• Willful misconduct causing serious harm</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Usually NOT Cause:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Poor performance (without warnings)</li>
                  <li>• Personality conflicts</li>
                  <li>• Single incident of lateness</li>
                  <li>• Minor policy violations</li>
                  <li>• "Not a good fit"</li>
                  <li>• Disagreements with management</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">The Legal Test</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <p className="text-foreground/80 mb-4">For conduct to justify termination for cause, the employer must prove:</p>
              <ol className="text-foreground/80 space-y-2">
                <li><span className="font-bold">1.</span> The conduct actually occurred (on balance of probabilities)</li>
                <li><span className="font-bold">2.</span> The conduct was serious enough to justify immediate termination</li>
                <li><span className="font-bold">3.</span> The employment relationship is irreparably damaged</li>
                <li><span className="font-bold">4.</span> For most misconduct: warnings were given and employee failed to improve</li>
              </ol>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What Happens If Cause Is Invalid</h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Scenario</th>
                    <th className="px-6 py-4 text-left font-heading">Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Cause proven valid</td><td className="px-6 py-4 text-sm">No notice or severance owed (rare)</td></tr>
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">Cause proven invalid</td><td className="px-6 py-4 text-sm font-medium text-green-800">Full wrongful dismissal damages (common law notice)</td></tr>
                  <tr><td className="px-6 py-4 font-medium">"Near cause" found</td><td className="px-6 py-4 text-sm">Reduced notice period (less common now)</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Challenge Weak Cause Claims</h4>
              <p className="text-yellow-900 text-sm">Employers sometimes claim cause hoping you'll accept zero severance without fighting. If the cause allegation is weak, challenging it can result in full wrongful dismissal damages—potentially months or years of pay.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Cause Termination FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Fired for Cause?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Don't accept it at face value. Let me assess whether their cause claim holds up.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.employment} />
      </ServicePageLayout>
    </>
  );
}
