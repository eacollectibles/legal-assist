import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, DollarSign, HelpCircle, Briefcase, AlertCircle, Scale } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ConstructiveDismissalPage() {
  const authorityItems = [
    { title: 'Constructive Dismissal Claims', description: 'When your employer makes fundamental changes to your job, you may be entitled to treat it as a termination.' },
    { title: 'Risk Assessment', description: 'Constructive dismissal claims are risky. I help you understand the risks before making decisions.' },
    { title: 'Strategic Advice', description: 'Sometimes staying and objecting is better than leaving. I help you choose the right approach.' }
  ];

  const processSteps = [
    { step: '1', title: 'Situation Assessment', description: 'Determine if changes meet the constructive dismissal threshold.' },
    { step: '2', title: 'Strategy Development', description: 'Decide whether to stay and object or treat as termination.' },
    { step: '3', title: 'Legal Action', description: 'If proceeding, pursue damages as if wrongfully dismissed.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Fundamental Changes', description: 'Major unilateral changes can trigger claims.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Same Damages', description: 'If successful, entitled to same as wrongful dismissal.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Risk Warning', description: 'Claims are risky—must act quickly and correctly.' }
  ];

  const honestFAQs = [
    { question: "What is constructive dismissal?", answer: "When an employer unilaterally makes a fundamental change to your employment—without your agreement—you may be entitled to treat it as if you were fired. You resign and sue for wrongful dismissal damages." },
    { question: "What changes qualify as constructive dismissal?", answer: "Significant pay cut (typically 10%+), major demotion, substantial change in duties, forced relocation, toxic work environment, unilateral change to work hours/schedule. The change must be fundamental, not minor." },
    { question: "Why are these claims risky?", answer: "If you quit and a court later decides the change wasn't 'fundamental enough,' you're just an employee who resigned—no damages. You've lost your job and your claim. This is why assessment is critical before acting." },
    { question: "What should I do if my employer makes changes?", answer: "DON'T immediately resign. First: object in writing, stating you don't accept the change. Continue working 'under protest.' This preserves your rights while you get legal advice. Acting too quickly (or too slowly) can hurt your claim." },
    { question: "How quickly do I need to act?", answer: "If you continue working under new conditions without objecting, you may be found to have accepted the change—losing your claim. Object immediately in writing, then get legal advice within days, not weeks." },
    { question: "What damages can I get if successful?", answer: "Same as wrongful dismissal: reasonable notice period (common law calculation based on age, tenure, position). If the change was also discriminatory or harassing, additional damages may be available." }
  ];

  return (
    <>
      <SEO title="Constructive Dismissal Paralegal Ontario | Job Change Claims" description="Licensed paralegal for constructive dismissal claims in Ontario. Fundamental job changes, pay cuts, demotion. Risk assessment. Free consultation." canonical="https://www.legalassist.london/services/constructive-dismissal" />
      <ServicePageLayout seoTitle="Constructive Dismissal | Ontario" seoDescription="Constructive dismissal claims in Ontario." canonical="https://www.legalassist.london/services/constructive-dismissal" problemHeadline="Constructive Dismissal Claims" problemDescription="Employer fundamentally changed your job without your consent? Pay cut, demotion, major changes? You may have a claim—but these are risky. Get advice first." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Constructive dismissal" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Constructive Dismissal</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                High-Risk Claims: Don't Act Without Advice
              </h3>
              <p className="text-red-900">Constructive dismissal claims are risky. If you quit and the court disagrees that changes were "fundamental," you're just someone who resigned voluntarily. Get legal advice BEFORE making any decisions.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What May Qualify</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">May Be Constructive Dismissal:</h4>
                <ul className="text-green-900 text-sm space-y-2">
                  <li>• Significant pay cut (10%+ typically)</li>
                  <li>• Major demotion in title/responsibilities</li>
                  <li>• Forced relocation to different city</li>
                  <li>• Fundamental change in job duties</li>
                  <li>• Toxic/hostile work environment</li>
                  <li>• Unilateral major schedule changes</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Likely NOT Constructive Dismissal:</h4>
                <ul className="text-red-900 text-sm space-y-2">
                  <li>• Minor inconveniences</li>
                  <li>• Small changes to duties</li>
                  <li>• Reasonable management decisions</li>
                  <li>• Performance management (if legitimate)</li>
                  <li>• Changes you agreed to</li>
                  <li>• Changes allowed by contract</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Critical Steps</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="text-2xl font-bold text-yellow-800 mb-2">1. Don't Quit Yet</div>
                <p className="text-yellow-900 text-sm">Resigning prematurely is the biggest mistake. You lose leverage and may lose your claim entirely.</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="text-2xl font-bold text-yellow-800 mb-2">2. Object in Writing</div>
                <p className="text-yellow-900 text-sm">Email HR/manager stating you don't accept the change and are working "under protest" while seeking advice.</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="text-2xl font-bold text-yellow-800 mb-2">3. Get Advice Fast</div>
                <p className="text-yellow-900 text-sm">Time matters. Continuing to work without objection may mean you've accepted the change.</p>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h4 className="font-bold text-foreground mb-2">The Risk-Reward Reality</h4>
              <p className="text-foreground/80 text-sm">If you succeed: damages same as wrongful dismissal (potentially months of pay). If you fail: you're unemployed with no damages. This is why proper assessment and strategy matter enormously.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Constructive Dismissal FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Job Fundamentally Changed?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Don't act without advice. Let me assess your situation and explain your options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.employment} />
      </ServicePageLayout>
    </>
  );
}
