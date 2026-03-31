import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, FileText, Clock, DollarSign, Scale, Users } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HRTOProcessPage() {
  const authorityItems = [
    { title: 'HRTO Process Guide', description: 'Step-by-step guide to the Human Rights Tribunal of Ontario process—from application to hearing.' },
    { title: 'One Year Deadline', description: 'Critical: you have only one year from the last discriminatory act to file. Don\'t miss this deadline.' },
    { title: 'Mediation First', description: 'Most cases go through mediation. Many settle before hearing. Know what to expect.' }
  ];

  const processSteps = [
    { step: '1', title: 'File Application', description: 'Form 1 within 1 year of discrimination.' },
    { step: '2', title: 'Mediation', description: 'Attempt to settle before hearing.' },
    { step: '3', title: 'Hearing', description: 'Present case to adjudicator if unresolved.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'No Filing Fee', description: 'HRTO applications are free to file.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Mediation Option', description: 'Many cases settle at mediation.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: '1 Year Deadline', description: 'Strict limitation period.' }
  ];

  const honestFAQs = [
    { question: "How do I file an HRTO application?", answer: "Complete Form 1 (Application) and submit online, by mail, fax, or email. Include details of the discrimination: what happened, when, who did it, how it relates to a protected ground, and what remedy you seek. No filing fee." },
    { question: "What's the deadline to file?", answer: "One year from the last incident of discrimination. This deadline is strict—late applications are almost always refused. Ongoing discrimination can extend the deadline, but don't rely on this. File early." },
    { question: "What happens after I file?", answer: "HRTO confirms filing and sends Form 1 to the respondent. They have 35 days to respond (Form 2). You may reply (Form 3). Then most cases are scheduled for mediation before a hearing is set." },
    { question: "What is mediation at HRTO?", answer: "A voluntary settlement discussion with a neutral mediator. Confidential—nothing said can be used at hearing. Many cases settle at mediation. If not settled, the case proceeds to hearing. Mediation is free and faster than hearing." },
    { question: "What can HRTO order if I win?", answer: "Monetary compensation (lost wages, injury to dignity—no cap), public interest remedies (policy changes, training), and orders to stop discrimination. Cannot order punitive damages or costs (usually)." },
    { question: "How long does the HRTO process take?", answer: "Highly variable. Mediation may happen within 3-6 months. If no settlement, hearing dates can be 1-2+ years out. COVID backlogs exist. Simple cases can resolve faster at mediation." }
  ];

  return (
    <>
      <SEO title="HRTO Process Guide Ontario | Human Rights Tribunal Application" description="Step-by-step guide to filing at the Human Rights Tribunal of Ontario. Process, timeline, mediation, hearings. Free consultation if you need help." canonical="https://www.legalassist.london/guides/hrto-process" />
      <ServicePageLayout seoTitle="HRTO Process Guide | Ontario" seoDescription="Human Rights Tribunal process guide for Ontario." canonical="https://www.legalassist.london/guides/hrto-process" problemHeadline="Human Rights Tribunal Process" problemDescription="Considering a human rights complaint? This guide explains the HRTO process from filing to hearing. Or let me handle your application." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "HRTO process" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">HRTO Application Process</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <Clock className="w-6 h-6" />
                Critical: 1 Year Limitation
              </h3>
              <p className="text-red-900">You must file your HRTO application within ONE YEAR of the last discriminatory act. This deadline is strictly enforced. Extensions are rarely granted. Don't wait.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Step-by-Step Process</h3>
            <div className="space-y-6 mb-12">
              <div className="flex gap-4 items-start">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-foreground">File Application (Form 1)</h4>
                  <p className="text-foreground/80 text-sm">Complete Form 1 describing the discrimination, protected ground, and remedy sought. Submit online or by mail/fax/email. No filing fee.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-foreground">Respondent's Response (Form 2)</h4>
                  <p className="text-foreground/80 text-sm">Respondent has 35 days to file Form 2 response. They may deny allegations, provide their version, or raise defences.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-foreground">Your Reply (Form 3)</h4>
                  <p className="text-foreground/80 text-sm">You can file a reply to their response. Keep it focused on new issues they raised—don't repeat your application.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="font-bold text-foreground">Mediation</h4>
                  <p className="text-foreground/80 text-sm">Most cases are offered mediation. Confidential, voluntary settlement discussions. Many cases resolve here. If not, proceed to hearing.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">5</div>
                <div>
                  <h4 className="font-bold text-foreground">Hearing</h4>
                  <p className="text-foreground/80 text-sm">Present evidence and arguments to adjudicator. Witnesses testify, documents submitted. Adjudicator issues written decision.</p>
                </div>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What HRTO Can Order</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <DollarSign className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Monetary Remedies:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Lost wages (past and future)</li>
                  <li>• General damages for injury to dignity</li>
                  <li>• Out-of-pocket expenses</li>
                  <li>• No statutory cap on damages</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <Scale className="w-6 h-6 text-blue-600 mb-2" />
                <h4 className="font-bold text-blue-800 mb-2">Non-Monetary Remedies:</h4>
                <ul className="text-blue-900 text-sm space-y-1">
                  <li>• Order to stop discrimination</li>
                  <li>• Policy changes required</li>
                  <li>• Training ordered</li>
                  <li>• Reinstatement (employment)</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Consider Representation</h4>
              <p className="text-yellow-900 text-sm">HRTO processes can be complex. Respondents (especially employers) often have lawyers. A paralegal can help prepare your application, navigate mediation, and represent you at hearing.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">HRTO Process FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Need Help with Your HRTO Application?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">I can assess your claim, prepare your application, and represent you through the process.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Consultation</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.humanRights} />
      </ServicePageLayout>
    </>
  );
}
