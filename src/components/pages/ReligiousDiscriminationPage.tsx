import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Users, Briefcase, Heart, Scale } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ReligiousDiscriminationPage() {
  const authorityItems = [
    { title: 'Creed Discrimination', description: 'Religious beliefs and practices are protected under "creed" in Ontario\'s Human Rights Code. Employers must accommodate.' },
    { title: 'Accommodation Duty', description: 'Employers must accommodate religious practices to the point of undue hardship—not just when convenient.' },
    { title: 'Broad Protection', description: 'Creed covers traditional religions, Indigenous spiritual practices, and sincerely held non-religious beliefs.' }
  ];

  const processSteps = [
    { step: '1', title: 'Identify Need', description: 'What religious practice requires accommodation?' },
    { step: '2', title: 'Request Formally', description: 'Put accommodation request in writing.' },
    { step: '3', title: 'Document Response', description: 'Track employer\'s efforts or refusal.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Duty to Accommodate', description: 'Employers must try to accommodate.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Sincere Belief', description: 'Personal sincerity, not official doctrine.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Undue Hardship Limit', description: 'Not unlimited—must be reasonable.' }
  ];

  const honestFAQs = [
    { question: "What does 'creed' include?", answer: "Traditional religions (Christianity, Islam, Judaism, Hinduism, Buddhism, Sikhism, etc.), Indigenous spiritual practices, and sincerely held belief systems with similar characteristics to religion. Political beliefs alone generally don't qualify." },
    { question: "What religious accommodations must employers provide?", answer: "Time off for religious observances (Sabbath, holidays), prayer breaks, dress code modifications (hijab, turban, kippah), dietary requirements, schedule adjustments. Accommodation must be to undue hardship, not just inconvenience." },
    { question: "My employer says accommodating my religious practice is 'too difficult.' What now?", answer: "They must demonstrate undue hardship—significant cost, health/safety risk, or major operational disruption. 'Inconvenient' isn't enough. Minor schedule changes, allowing religious dress, or shift swaps rarely constitute undue hardship." },
    { question: "Do I need to prove my beliefs are 'correct' or official doctrine?", answer: "No. The test is sincerity of belief, not whether a religious authority would agree. Your personal sincere belief is what matters. However, you must be consistent—claiming belief only when convenient undermines sincerity." },
    { question: "Can I be fired for refusing to work on my Sabbath?", answer: "Not if you requested accommodation and they could reasonably accommodate you. If they didn't try to accommodate, or their 'hardship' claim is weak, termination for this reason is likely discrimination." },
    { question: "What about religious harassment?", answer: "Mocking religious beliefs, forcing religious discussions, hostile comments about religious dress, pressure to violate religious practices—all can constitute harassment. Create a poisoned environment claim even without direct adverse action." }
  ];

  return (
    <>
      <SEO title="Religious Discrimination Paralegal Ontario | Creed Accommodation HRTO" description="Licensed paralegal for religious discrimination claims in Ontario. Creed accommodation, Sabbath, religious dress. HRTO applications. Free consultation." canonical="https://www.legalassist.london/services/religious-discrimination" />
      <ServicePageLayout seoTitle="Religious Discrimination | Ontario" seoDescription="Religious discrimination help in Ontario." canonical="https://www.legalassist.london/services/religious-discrimination" problemHeadline="Religious Discrimination" problemDescription="Denied religious accommodation? Harassed for your beliefs? Creed is protected. I help file HRTO applications for religious discrimination." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Religious discrimination" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Religious Discrimination</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Accommodation Needs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6">
                <h4 className="font-bold text-foreground mb-3">Time & Schedule:</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Sabbath observance (Friday evening, Saturday, Sunday)</li>
                  <li>• Religious holidays (Eid, Diwali, Yom Kippur, etc.)</li>
                  <li>• Prayer times during workday</li>
                  <li>• Fasting periods (Ramadan, Lent)</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <h4 className="font-bold text-foreground mb-3">Dress & Appearance:</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Hijab, niqab, turban, kippah</li>
                  <li>• Religious jewelry (cross, Star of David)</li>
                  <li>• Beard requirements</li>
                  <li>• Modest dress requirements</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">The Accommodation Process</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <ol className="text-foreground/80 space-y-3">
                <li><span className="font-bold">1. Request accommodation:</span> Put it in writing. Explain the religious practice and what you need.</li>
                <li><span className="font-bold">2. Employer assesses:</span> They should engage in dialogue, explore options, consider alternatives.</li>
                <li><span className="font-bold">3. Find solution:</span> Doesn't have to be your preferred option, but must actually accommodate the need.</li>
                <li><span className="font-bold">4. If refused:</span> Employer must demonstrate undue hardship—not just inconvenience.</li>
              </ol>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Undue Hardship</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Probably NOT Undue Hardship:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Minor schedule adjustments</li>
                  <li>• Allowing religious dress</li>
                  <li>• Shift swaps with coworkers</li>
                  <li>• Providing prayer space</li>
                  <li>• Some increased administrative work</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">May Be Undue Hardship:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Significant safety risk (demonstrated)</li>
                  <li>• Major operational disruption</li>
                  <li>• Substantial cost (rare)</li>
                  <li>• Fundamentally changes job</li>
                  <li>• Affects other employees' rights</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Put Requests in Writing</h4>
              <p className="text-yellow-900 text-sm">Verbal requests can be denied you ever made them. Submit accommodation requests by email, keep copies, and document responses. This creates the record you'll need if they refuse.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Religious Discrimination FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Denied Religious Accommodation?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let me assess whether they've met their duty to accommodate.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.humanRights} />
      </ServicePageLayout>
    </>
  );
}
