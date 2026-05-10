import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, AlertTriangle, HelpCircle, FileText, DollarSign, IdCard } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FailToSurrenderPage() {
  const authorityItems = [
    { title: 'Failing to Surrender — HTA s.33', description: 'Drivers must surrender their licence on demand by a peace officer. Insurance card under CAIA s.3(1) and vehicle permit under HVPA s.7(4) are similar obligations.' },
    { title: 'No Demerit Points', description: 'These are administrative offences — no demerit points and minimal insurance impact. The set fine is small but a conviction still goes on your driving abstract.' },
    { title: 'Documentation Defences', description: 'If you produced the document at roadside, mailed it in within the deadline, or were otherwise unable to comply through no fault of your own, the charge is challengeable.' }
  ];

  const processSteps = [
    { step: '1', title: 'Identify the Statute', description: 'Was it the licence (HTA), the insurance card (CAIA), or the permit (HVPA)? Each has different elements and defences.' },
    { step: '2', title: 'Deadline & Documentation', description: 'Many forces give a deadline (often 48-72 hours) to produce missing documents at the station. Confirm whether you complied and gather receipts.' },
    { step: '3', title: 'Negotiate or Trial', description: 'Crown will often withdraw if proof of valid documentation is brought. Otherwise, set down for trial.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'No Demerit Points', description: 'These are administrative offences. No points means no insurance hit from the points themselves.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Often Withdrawn', description: 'If you can prove you were properly licensed/insured at the time, Crowns frequently withdraw on production of valid documentation.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Watch Out for Companion Charges', description: 'Officers often add s.7(1) HTA "drive without licence" or CAIA "drive without insurance" — those are far more serious.' }
  ];

  const honestFAQs = [
    { question: 'What are the three "fail to surrender" charges?', answer: 'Three distinct offences: (1) HTA s.33(1) — failing to surrender driver\'s licence; (2) Compulsory Automobile Insurance Act s.3(1) — failing to produce insurance card; (3) Highway Traffic Act / Highway Vehicles Permit Act s.7(4) — failing to surrender vehicle permit. Each is a strict liability offence.' },
    { question: 'What are the penalties?', answer: 'Set fine of $85 each, total payable approximately $110 with surcharges and court costs. No demerit points. Convictions appear on your driving abstract for 3 years but do not directly raise insurance because there are no points.' },
    { question: 'I had my licence/insurance — I just didn\'t have it on me. Can I fight it?', answer: 'Yes. If you can produce valid documentation that was in force at the time of the stop (licence, pink slip, permit), the Crown will often withdraw or accept a stay. Bring the documentation to the prosecutor\'s pre-trial. Some courts have a "produce-and-the-charge-goes-away" practice; others require formal trial.' },
    { question: 'I was given 48 hours to produce. Does that help?', answer: 'Some police services issue a notice to produce documentation at a station within a set window (often 48–72 hours). If you complied and have the receipt, that is strong evidence the charge should be withdrawn. Bring the produced-document receipt with you.' },
    { question: 'What if my licence was suspended/expired?', answer: 'That is a more serious problem. Officers will often charge the "drive without licence" or "licence suspended" offence on top, which carries higher fines, possible vehicle impoundment, and insurance consequences. Get advice before going to court.' },
    { question: 'Can I just pay it?', answer: 'You can — the fine is small. But a conviction does go on your driving record for 3 years, and a pattern of these convictions can attract the Registrar\'s attention. If you had valid documentation at the time, fighting (or at least producing) is usually worth the small effort.' }
  ];

  return (
    <>
      <SEO title="Fail to Surrender Licence / Insurance / Permit | Ontario" description="Licensed paralegal defending HTA s.33 fail-to-surrender-licence, CAIA s.3(1) fail-to-produce-insurance-card, and HTA fail-to-surrender-permit charges. Free consultation." canonical="https://www.legalassist.london/services/fail-to-surrender" />
      <ServicePageLayout seoTitle="Fail to Surrender Licence / Insurance / Permit" seoDescription="HTA s.33, CAIA s.3(1), HVPA s.7(4) defence." canonical="https://www.legalassist.london/services/fail-to-surrender" problemHeadline="Failing to Surrender Licence, Insurance Card, or Permit" problemDescription="Pulled over and didn't have your licence, pink slip, or vehicle permit on you? These charges are common but often defensible — especially if you can prove you were validly documented at the time." heroImage={{ src: 'https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png?id=fail-to-surrender-hero', alt: 'Fail to surrender licence' }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>

        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">The Three Charges</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <IdCard className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <h3 className="font-heading text-lg font-bold text-blue-800 text-center mb-2">Driver's Licence</h3>
                <p className="text-blue-900 text-sm text-center mb-3">HTA s.33(1)</p>
                <p className="text-blue-900 text-sm">Must produce on demand. Fine ~$110. No points.</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <FileText className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <h3 className="font-heading text-lg font-bold text-blue-800 text-center mb-2">Insurance Card</h3>
                <p className="text-blue-900 text-sm text-center mb-3">CAIA s.3(1)</p>
                <p className="text-blue-900 text-sm">Pink slip in vehicle. Fine ~$110. No points.</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <FileText className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <h3 className="font-heading text-lg font-bold text-blue-800 text-center mb-2">Vehicle Permit</h3>
                <p className="text-blue-900 text-sm text-center mb-3">HVPA / HTA s.7(4)</p>
                <p className="text-blue-900 text-sm">Ownership in vehicle. Fine ~$110. No points.</p>
              </div>
            </div>

            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">The Practical Reality</h3>
              <p className="text-foreground/80">If you had valid documentation at the time of the stop and bring proof to court, prosecutors will frequently withdraw the charge or accept a stay. Don't ignore the ticket — it converts to a conviction by default if you don't dispute or pay.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Honest Answers</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Got a Fail-to-Surrender Ticket?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">If you had valid documentation at the time, the charge is often withdrawn on production. Get an honest assessment.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Free Consultation</a>
          </div>
        </div>

        <RelatedServices services={relatedServicesConfig.trafficTickets} />
      </ServicePageLayout>
    </>
  );
}
