import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Shield, Briefcase, Home, Heart } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function GenderIdentityDiscriminationPage() {
  const authorityItems = [
    { title: 'Gender Identity Protected', description: 'Gender identity and gender expression are explicitly protected grounds under Ontario\'s Human Rights Code in employment, housing, and services.' },
    { title: 'Accommodation Required', description: 'Employers must accommodate gender identity including name/pronoun use, dress code flexibility, and facility access.' },
    { title: 'Harassment Included', description: 'Misgendering, deadnaming, and refusal to use correct pronouns can constitute harassment.' }
  ];

  const processSteps = [
    { step: '1', title: 'Document Treatment', description: 'What discrimination or harassment occurred?' },
    { step: '2', title: 'Request Accommodation', description: 'Formal request if accommodation needed.' },
    { step: '3', title: 'File HRTO if Unresolved', description: 'Human Rights Tribunal application.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Explicitly Protected', description: 'Clear legal protection.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Broad Coverage', description: 'Employment, housing, services.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: '1-Year Limit', description: 'File HRTO within 1 year.' }
  ];

  const honestFAQs = [
    { question: "What does 'gender identity' and 'gender expression' mean under Ontario law?", answer: "Gender identity: your internal sense of being male, female, both, neither, or another gender. Gender expression: how you present your gender through clothing, appearance, behaviour. Both are protected—you can be trans, non-binary, gender fluid, or any identity." },
    { question: "My employer refuses to use my pronouns. Is that discrimination?", answer: "Likely yes. Repeatedly refusing to use correct pronouns after being informed, or deliberately misgendering, can constitute harassment based on gender identity. Document incidents: dates, who said what, witnesses." },
    { question: "Can my employer enforce a gendered dress code?", answer: "Employers can have dress codes, but they must accommodate gender identity. You should be allowed to dress consistently with your gender identity. Rigid gendered dress codes that don't accommodate trans or non-binary employees are discriminatory." },
    { question: "Which bathroom/facility can I use at work?", answer: "You should be able to use facilities consistent with your gender identity. Employers cannot require you to use facilities inconsistent with your identity, or force you to use separate facilities. This is a clear accommodation requirement." },
    { question: "I was outed at work without my consent. Is that a violation?", answer: "Outing someone (disclosing their trans status without consent) can constitute harassment and create a hostile environment. It's a privacy violation that can expose you to further discrimination. Document who disclosed, to whom, and what happened after." },
    { question: "What damages can I get for gender identity discrimination?", answer: "HRTO can award: general damages for injury to dignity ($10,000-$50,000+ depending on severity and duration), lost wages if employment affected, compensation for out-of-pocket expenses, and orders requiring policy changes or training." }
  ];

  return (
    <>
      <SEO title="Gender Identity Discrimination Paralegal Ontario | Trans Rights HRTO" description="Licensed paralegal for gender identity discrimination in Ontario. Trans rights, pronouns, workplace accommodation. HRTO applications. Free consultation." canonical="https://www.legalassist.london/services/gender-identity-discrimination" />
      <ServicePageLayout seoTitle="Gender Identity Discrimination | Ontario" seoDescription="Gender identity discrimination help in Ontario." canonical="https://www.legalassist.london/services/gender-identity-discrimination" problemHeadline="Gender Identity Discrimination" problemDescription="Facing discrimination for being trans, non-binary, or gender diverse? Ontario explicitly protects gender identity and expression in employment, housing, and services." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Gender identity discrimination" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Gender Identity Protection</h2>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Explicit Protection
              </h3>
              <p className="text-green-900">Ontario's Human Rights Code explicitly lists "gender identity" and "gender expression" as protected grounds. This covers transgender, non-binary, Two-Spirit, gender fluid, and all gender diverse individuals.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What's Protected</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Protected Activities:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Presenting as your gender identity</li>
                  <li>• Using your chosen name</li>
                  <li>• Being addressed with correct pronouns</li>
                  <li>• Transitioning while employed</li>
                  <li>• Using facilities matching your identity</li>
                  <li>• Dressing consistently with your identity</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Discriminatory Conduct:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Refusing to use correct pronouns</li>
                  <li>• Deadnaming (using birth name)</li>
                  <li>• Outing without consent</li>
                  <li>• Denying facility access</li>
                  <li>• Refusing to hire/rent based on identity</li>
                  <li>• Harassment based on gender expression</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Workplace Accommodation</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-8">
              <h4 className="font-bold text-foreground mb-3">Employers Must Accommodate:</h4>
              <ul className="text-foreground/80 space-y-2">
                <li>✓ Use of chosen name and pronouns</li>
                <li>✓ Access to facilities consistent with gender identity</li>
                <li>✓ Dress code flexibility</li>
                <li>✓ Time off for transition-related medical appointments</li>
                <li>✓ Update records to reflect name/gender changes</li>
                <li>✓ Maintain confidentiality about trans status</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Document Everything</h4>
              <p className="text-yellow-900 text-sm">Keep records of: misgendering incidents (dates, who, witnesses), requests for accommodation and responses, any harassment or hostile comments, outing incidents, and how treatment changed after coming out or transitioning.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Gender Identity FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Facing Gender Identity Discrimination?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">You have rights. Let me help you enforce them.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.humanRights} />
      </ServicePageLayout>
    </>
  );
}
