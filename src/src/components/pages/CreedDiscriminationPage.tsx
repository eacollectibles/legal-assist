import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Heart, Briefcase, Home, Shield } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function CreedDiscriminationPage() {
  const authorityItems = [
    { title: 'Creed Protection', description: 'Creed is a protected ground under Ontario\'s Human Rights Code. It includes religion and sincerely held belief systems.' },
    { title: 'Accommodation Required', description: 'Employers and service providers must accommodate creed to the point of undue hardship—not just when convenient.' },
    { title: 'Beyond Traditional Religion', description: 'Creed covers more than organized religion. Sincere spiritual or ethical beliefs may qualify for protection.' }
  ];

  const processSteps = [
    { step: '1', title: 'Identify Creed', description: 'What belief or practice needs accommodation?' },
    { step: '2', title: 'Request Accommodation', description: 'Formal request explaining need.' },
    { step: '3', title: 'Document Response', description: 'Track accommodation efforts or refusals.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Protected Ground', description: 'Creed explicitly protected.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Accommodation Duty', description: 'Must be to undue hardship.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Sincerity Matters', description: 'Must be sincerely held belief.' }
  ];

  const honestFAQs = [
    { question: "What is 'creed' under Ontario human rights law?", answer: "Creed includes: sincerely held religious beliefs and practices, spiritual beliefs that may not be part of organized religion, and some ethical belief systems. It doesn't include political opinions or personal preferences. The belief must be sincere, not necessarily part of established doctrine." },
    { question: "My employer won't let me take time off for religious holidays. Is that discrimination?", answer: "Potentially. Employers must accommodate religious observances unless it causes undue hardship. 'Inconvenient' isn't undue hardship. You may need to use vacation days, but outright denial without exploring options is likely discrimination." },
    { question: "Can I wear religious clothing or symbols at work?", answer: "Generally yes. Dress code restrictions that prevent religious expression are discriminatory unless there's a bona fide occupational requirement (safety in some cases). Employers must accommodate religious dress requirements." },
    { question: "My employer says accommodating my prayer times is 'too disruptive.' Valid?", answer: "Only if they've actually explored options. Undue hardship requires real evidence of significant cost, health/safety risk, or operational impossibility—not just inconvenience. Many workplaces successfully accommodate prayer breaks." },
    { question: "I was mocked for my religious beliefs at work. Is that discrimination?", answer: "Yes. Harassment based on creed is discrimination. This includes: mocking beliefs, pressure to abandon religious practices, hostile comments, isolation for religious observance, and creating a poisoned work environment." },
    { question: "What accommodation can I ask for?", answer: "Common accommodations: modified schedule for religious observances, time/space for prayer, religious dress allowance, dietary accommodation at work events, scheduling flexibility around holy days. The employer must engage in good faith dialogue about options." }
  ];

  return (
    <>
      <SEO title="Creed Discrimination Paralegal Ontario | Religious Discrimination HRTO" description="Licensed paralegal for creed and religious discrimination claims in Ontario. Workplace accommodation, harassment. HRTO applications. Free consultation." canonical="https://www.legalassist.london/services/creed-discrimination" />
      <ServicePageLayout seoTitle="Creed Discrimination | Ontario" seoDescription="Creed discrimination help in Ontario." canonical="https://www.legalassist.london/services/creed-discrimination" problemHeadline="Creed Discrimination" problemDescription="Discriminated against for your religious or spiritual beliefs? Denied accommodation? Creed is protected in Ontario—employers must accommodate to undue hardship." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Creed discrimination" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Creed Protection</h2>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Creed Is Broadly Defined
              </h3>
              <p className="text-green-900">Creed includes religious beliefs, spiritual beliefs, and some sincerely held ethical worldviews. You don't need to belong to an organized religion. What matters is that your belief is sincere, not that it's mainstream or traditional.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What's Protected?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Protected as Creed:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Religious beliefs and practices</li>
                  <li>• Spiritual beliefs (not organized religion)</li>
                  <li>• Ethical worldviews with similar characteristics</li>
                  <li>• Religious dress requirements</li>
                  <li>• Religious dietary restrictions</li>
                  <li>• Prayer and observance practices</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">NOT Protected as Creed:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Political opinions</li>
                  <li>• Personal lifestyle preferences</li>
                  <li>• Single-issue beliefs (like veganism alone)</li>
                  <li>• Beliefs that promote hate</li>
                  <li>• Beliefs asserted for improper purposes</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Accommodation Requests</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <ul className="text-foreground/80 space-y-2">
                <li>✓ Time off for religious holidays (may use vacation, but can't be denied)</li>
                <li>✓ Modified schedule for prayer times</li>
                <li>✓ Space for prayer during work hours</li>
                <li>✓ Religious head coverings or dress</li>
                <li>✓ Dietary accommodation at work events</li>
                <li>✓ Exemption from certain tasks on religious grounds</li>
              </ul>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What Is "Undue Hardship"?</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">It's a High Bar</h4>
              <p className="text-yellow-900 text-sm mb-3">Undue hardship requires proof of real, significant burden—not inconvenience:</p>
              <ul className="text-yellow-900 text-sm space-y-1">
                <li>• <span className="font-bold">Cost:</span> Must be quantifiable and significant relative to employer size</li>
                <li>• <span className="font-bold">Health & Safety:</span> Actual risk, not speculation</li>
                <li>• <span className="font-bold">Operational:</span> True impossibility, not just inconvenience</li>
              </ul>
              <p className="text-yellow-900 text-sm mt-3">"It's inconvenient" or "we've never done that" is NOT undue hardship.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Creed Discrimination FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Facing Creed Discrimination?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">You have the right to practice your faith. Let me help protect it.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.humanRights} />
      </ServicePageLayout>
    </>
  );
}
