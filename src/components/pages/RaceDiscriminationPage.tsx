import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Users, Briefcase, Home, Scale } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function RaceDiscriminationPage() {
  const authorityItems = [
    { title: 'Race Discrimination', description: 'Race, colour, ancestry, ethnic origin, and place of origin are all protected grounds under Ontario\'s Human Rights Code.' },
    { title: 'Multiple Contexts', description: 'Protection applies in employment, housing, services, and contracts. Discrimination can be overt or systemic.' },
    { title: 'Burden of Proof', description: 'You must show race was a factor—not necessarily the only factor. Circumstantial evidence often proves these cases.' }
  ];

  const processSteps = [
    { step: '1', title: 'Document Everything', description: 'Comments, comparisons, patterns, witnesses.' },
    { step: '2', title: 'Identify Connection', description: 'Show how race factored into adverse treatment.' },
    { step: '3', title: 'File HRTO', description: 'Application within 1 year of discrimination.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Protected Ground', description: 'Race is explicitly protected.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Circumstantial Evidence', description: 'Direct proof not required.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Must Show Connection', description: 'Link between race and treatment.' }
  ];

  const honestFAQs = [
    { question: "What counts as race discrimination?", answer: "Treating someone differently because of their race, colour, ancestry, ethnic origin, or place of origin. Includes hiring, firing, promotions, housing, services, and more. Can be direct (explicit) or indirect (policies that disproportionately affect certain groups)." },
    { question: "How do I prove race was a factor?", answer: "Direct evidence is rare. Look for: racial comments or slurs, pattern of treating racialized employees differently, comparisons (how were white colleagues treated in same situation?), hiring/promotion patterns, timing of adverse action after racial incident." },
    { question: "What about 'microaggressions' or subtle discrimination?", answer: "Cumulative subtle discrimination can support a claim. Document patterns: repeated comments about accent, assumptions about abilities, exclusion from opportunities. Single incidents may not suffice, but patterns do." },
    { question: "My employer says I was fired for performance. How do I prove race?", answer: "Challenge the pretextual reason: Were concerns raised before? Were white employees with similar issues treated the same? Did criticism start after you complained about racism? Were performance standards applied equally?" },
    { question: "Can I claim racial harassment?", answer: "Yes. Racial harassment is a form of discrimination. Includes racial slurs, 'jokes,' comments about appearance, mockery of accent or culture, display of racist symbols. One severe incident or pattern of lesser incidents can establish harassment." },
    { question: "What damages are available?", answer: "Lost wages (if employment), general damages for injury to dignity ($10,000-$50,000+ depending on severity and duration), orders to change practices. No punitive damages at HRTO, but significant awards are possible for egregious cases." }
  ];

  return (
    <>
      <SEO title="Race Discrimination Paralegal Ontario | Racial Discrimination HRTO" description="Licensed paralegal for race discrimination claims in Ontario. Employment, housing, services. HRTO applications. Free consultation." canonical="https://www.legalassist.london/services/race-discrimination" />
      <ServicePageLayout seoTitle="Race Discrimination | Ontario" seoDescription="Race discrimination help in Ontario." canonical="https://www.legalassist.london/services/race-discrimination" problemHeadline="Race Discrimination" problemDescription="Experiencing discrimination because of your race, colour, or ethnic origin? This is illegal. I help file human rights complaints and fight for justice." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Race discrimination" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Race Discrimination</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Protected Grounds</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <p className="text-foreground/80 mb-4">Ontario's Human Rights Code protects against discrimination based on:</p>
              <ul className="text-foreground/80 grid grid-cols-2 gap-2">
                <li>• Race</li>
                <li>• Colour</li>
                <li>• Ancestry</li>
                <li>• Ethnic origin</li>
                <li>• Place of origin</li>
                <li>• Citizenship (with exceptions)</li>
              </ul>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Where Protection Applies</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6">
                <Briefcase className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Employment</h4>
                <p className="text-foreground/80 text-sm">Hiring, firing, promotion, pay, assignments, harassment, hostile environment</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <Home className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Housing</h4>
                <p className="text-foreground/80 text-sm">Rental applications, evictions, harassment by landlords, differential treatment</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <Users className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Services</h4>
                <p className="text-foreground/80 text-sm">Retail, healthcare, education, government services, professional services</p>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Building Your Case</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Strong Evidence:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Documented racial comments/slurs</li>
                  <li>• Comparison to similarly-situated others</li>
                  <li>• Pattern of adverse decisions</li>
                  <li>• Timing (action after complaint)</li>
                  <li>• Statistical patterns in hiring/firing</li>
                  <li>• Witness statements</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">Challenges:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• "Gut feeling" without evidence</li>
                  <li>• Isolated neutral incidents</li>
                  <li>• No comparators available</li>
                  <li>• Legitimate non-racial explanation</li>
                  <li>• Long delay without documentation</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Document From Day One</h4>
              <p className="text-yellow-900 text-sm">If you're experiencing racial discrimination, start documenting immediately. Dates, times, witnesses, exact words used. Email yourself notes the same day. This contemporaneous evidence is powerful at HRTO.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Race Discrimination FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Experiencing Race Discrimination?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">You don't have to tolerate this. Let me assess your situation confidentially.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.humanRights} />
      </ServicePageLayout>
    </>
  );
}
