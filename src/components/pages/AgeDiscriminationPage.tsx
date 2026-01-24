import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Users, Briefcase, Scale, Clock } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function AgeDiscriminationPage() {
  const authorityItems = [
    { title: 'Age Discrimination', description: 'Ontario prohibits age discrimination in employment for workers 18 and older. I help file HRTO applications.' },
    { title: 'Common in Terminations', description: 'Older workers often face disguised age discrimination in layoffs and terminations. "Restructuring" may hide age bias.' },
    { title: 'Notice Period Impact', description: 'Age is also a factor in wrongful dismissal—older workers typically get longer notice periods.' }
  ];

  const processSteps = [
    { step: '1', title: 'Identify Evidence', description: 'Comments, patterns, comparisons to younger workers.' },
    { step: '2', title: 'Assess Claim', description: 'Is age a factor in the adverse treatment?' },
    { step: '3', title: 'File HRTO', description: 'Application within 1 year of discrimination.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Protected Ground', description: 'Age 18+ is protected in employment.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Pattern Evidence', description: 'Systemic patterns can prove discrimination.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Some Exceptions', description: 'Mandatory retirement gone, but some exemptions remain.' }
  ];

  const honestFAQs = [
    { question: "What age is protected from discrimination?", answer: "In Ontario, age protection in employment covers workers 18 and older. There's no upper limit—mandatory retirement was abolished in 2006. Some exceptions exist (certain industries, bona fide occupational requirements)." },
    { question: "How do I prove age discrimination?", answer: "Direct evidence is rare (they won't say 'you're too old'). Look for: comments about age, energy, retirement plans; pattern of older workers let go while younger kept; job postings seeking 'young' or 'energetic' candidates; sudden performance issues after years of good reviews." },
    { question: "I was laid off in a 'restructuring.' Could it be age discrimination?", answer: "Possibly. Look at who was actually laid off vs kept. If the 'restructuring' disproportionately affected older workers, or your role was 'eliminated' then refilled with someone younger, this can indicate discrimination." },
    { question: "What about comments like 'when are you retiring?'", answer: "Repeated questions about retirement plans, especially combined with adverse action, can be evidence of age discrimination. Single innocent inquiries may not be enough, but a pattern of such comments is relevant." },
    { question: "Is it age discrimination if they hired someone younger for less money?", answer: "If you were let go and replaced by a younger, cheaper employee doing the same job, this can support age discrimination. Cost savings alone doesn't justify discrimination—but proving age was the factor (not just cost) requires evidence." },
    { question: "What damages are available for age discrimination?", answer: "Lost wages (past and future), general damages for injury to dignity ($5,000-$40,000+ depending on severity), and orders to reinstate (rarely ordered) or change practices. Age discrimination often overlaps with wrongful dismissal claims." }
  ];

  return (
    <>
      <SEO title="Age Discrimination Paralegal Ontario | HRTO Employment Age Claims" description="Licensed paralegal for age discrimination claims in Ontario. Workplace age discrimination, older worker termination. HRTO applications. Free consultation." canonical="https://www.legalassist.london/services/age-discrimination" />
      <ServicePageLayout seoTitle="Age Discrimination | Ontario" seoDescription="Age discrimination help in Ontario." canonical="https://www.legalassist.london/services/age-discrimination" problemHeadline="Age Discrimination" problemDescription="Passed over, pushed out, or fired because of your age? Age discrimination in employment is illegal. I help older workers fight back." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Age discrimination" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Age Discrimination</h2>
            
            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">No Mandatory Retirement</h3>
              <p className="text-foreground/80">Since 2006, Ontario has prohibited mandatory retirement. Employers cannot force you out based on age alone. You can work as long as you're able and willing.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Signs of Age Discrimination</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Warning Signs:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Repeated questions about retirement plans</li>
                  <li>• Comments about being "overqualified"</li>
                  <li>• Excluded from training/advancement</li>
                  <li>• Sudden negative performance reviews</li>
                  <li>• Position "eliminated" then refilled</li>
                  <li>• Pattern of older workers let go</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Building Your Case:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Document age-related comments</li>
                  <li>• Compare treatment to younger colleagues</li>
                  <li>• Keep performance reviews (before/after)</li>
                  <li>• Note who was laid off vs kept</li>
                  <li>• Save job postings (age preferences)</li>
                  <li>• Track training/opportunity denials</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Age & Wrongful Dismissal</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-8">
              <Clock className="w-8 h-8 text-primary mb-3" />
              <p className="text-foreground/80 mb-4">Age affects wrongful dismissal claims in two ways:</p>
              <ul className="text-foreground/80 text-sm space-y-2">
                <li><span className="font-bold">Discrimination claim:</span> If age was a factor in termination, you may have an HRTO claim for discrimination damages.</li>
                <li><span className="font-bold">Notice period:</span> Older workers generally receive longer notice periods because finding comparable work is harder. This increases your severance entitlement.</li>
              </ul>
              <p className="text-foreground/70 text-sm mt-4">These claims can be pursued together—discrimination at HRTO and wrongful dismissal for enhanced notice.</p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">1 Year Limitation</h4>
              <p className="text-yellow-900 text-sm">HRTO applications must be filed within one year of the last discriminatory act. Don't wait—the longer you delay, the harder it becomes to gather evidence and prove your case.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Age Discrimination FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Experiencing Age Discrimination?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Document what's happening and let's discuss your options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.humanRights} />
      </ServicePageLayout>
    </>
  );
}
