import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Car, Shield, Scale, Wine, Ban } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function DUIChargesPage() {
  const authorityItems = [
    { title: 'Impaired Driving Defence', description: 'Impaired driving charges are Criminal Code offences with life-changing consequences. You need experienced representation.' },
    { title: 'Immediate Action Required', description: 'You face immediate roadside suspension, vehicle impound, and criminal charges. Acting fast protects your rights.' },
    { title: 'Lawyer Referral', description: 'As a paralegal, I handle related provincial charges. For criminal impaired charges, I connect you with experienced criminal lawyers.' }
  ];

  const processSteps = [
    { step: '1', title: 'Understand Charges', description: 'Criminal (lawyer) vs Provincial (paralegal) matters.' },
    { step: '2', title: 'Immediate Issues', description: 'Licence suspension, vehicle recovery, work issues.' },
    { step: '3', title: 'Defence Strategy', description: 'Connect with right representation for each matter.' }
  ];

  const reassuranceItems = [
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Criminal Charges', description: 'Require criminal lawyer—I provide referrals.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Provincial Matters', description: 'I handle related provincial charges.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Full Support', description: 'Help coordinate your defence team.' }
  ];

  const honestFAQs = [
    { question: "What's the difference between criminal and provincial impaired charges?", answer: "Criminal Code impaired (over 80, impaired operation, refusal) requires a criminal lawyer. Provincial charges (warn range suspension, administrative penalties) can be handled by paralegals. Most DUI stops result in both types of matters." },
    { question: "What happens immediately after a DUI arrest?", answer: "90-day Administrative Driver's Licence Suspension (ADLS), 7-day vehicle impound, criminal charges laid. You can challenge the ADLS at a Tribunal hearing—that's where a paralegal can help." },
    { question: "Can I get my licence back during the criminal case?", answer: "The 90-day ADLS can be challenged at the Licence Appeal Tribunal. If successful, you get your licence back pending the criminal case. This is separate from the criminal charge itself." },
    { question: "What are the penalties for a first-time DUI conviction?", answer: "Criminal record, minimum $1,000 fine, 1-year driving prohibition (federal), up to 10 years maximum jail (rarely imposed for first offence), ignition interlock requirement, massive insurance increases." },
    { question: "Should I refuse the breathalyzer?", answer: "No. Refusal is a separate criminal offence with the same penalties as impaired driving. You have no right to refuse (unlike US). Refusing makes things worse, not better." },
    { question: "What if I was just in the warn range (0.05-0.08)?", answer: "Warn range triggers provincial consequences (3-30 day suspension depending on prior incidents) but not criminal charges. These provincial matters can be challenged, and I can help with that." }
  ];

  return (
    <>
      <SEO title="Impaired Driving Charges Ontario | DUI Defence Help" description="Help with impaired driving charges in Ontario. Provincial licence matters, ADLS challenges, lawyer referrals for criminal charges. Free consultation." canonical="https://www.legalassist.london/services/impaired-driving" />
      <ServicePageLayout seoTitle="Impaired Driving Charges | Ontario" seoDescription="Impaired driving help in Ontario." canonical="https://www.legalassist.london/services/impaired-driving" problemHeadline="Impaired Driving Charges" problemDescription="DUI charges are serious—criminal record, licence loss, insurance disaster. I help with provincial licence matters and connect you with criminal lawyers for the charges." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Impaired driving" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Impaired Driving Charges</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                Criminal Charges Require a Criminal Lawyer
              </h3>
              <p className="text-red-900">Impaired driving under the Criminal Code is a serious criminal offence. As a paralegal, I cannot represent you on criminal charges—you need a criminal defence lawyer. I can help with provincial licence matters and provide referrals to experienced DUI lawyers.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What Happens After a DUI Arrest</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6">
                <Ban className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Immediate Suspension</h4>
                <p className="text-foreground/80 text-sm">90-day Administrative Driver's Licence Suspension (ADLS) starts immediately. Can be challenged at Tribunal.</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <Car className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Vehicle Impound</h4>
                <p className="text-foreground/80 text-sm">7-day mandatory impound. You pay towing and storage to recover vehicle.</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <Scale className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Criminal Charges</h4>
                <p className="text-foreground/80 text-sm">Charged with criminal offence. First court date usually 4-8 weeks later.</p>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Criminal vs Provincial Matters</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Matter</th>
                    <th className="px-6 py-4 text-left font-heading">Type</th>
                    <th className="px-6 py-4 text-left font-heading">Who Handles</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Impaired operation</td><td className="px-6 py-4">Criminal Code</td><td className="px-6 py-4 text-red-800 font-medium">Criminal Lawyer</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Over 80 mg</td><td className="px-6 py-4">Criminal Code</td><td className="px-6 py-4 text-red-800 font-medium">Criminal Lawyer</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Refusal to provide sample</td><td className="px-6 py-4">Criminal Code</td><td className="px-6 py-4 text-red-800 font-medium">Criminal Lawyer</td></tr>
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">90-day ADLS challenge</td><td className="px-6 py-4">Provincial (Tribunal)</td><td className="px-6 py-4 text-green-800 font-medium">Paralegal ✓</td></tr>
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">Warn range suspension</td><td className="px-6 py-4">Provincial (HTA)</td><td className="px-6 py-4 text-green-800 font-medium">Paralegal ✓</td></tr>
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">Licence reinstatement</td><td className="px-6 py-4">Provincial (MTO)</td><td className="px-6 py-4 text-green-800 font-medium">Paralegal ✓</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Act Quickly</h4>
              <p className="text-yellow-900 text-sm">You have 7 days to request an ADLS review at the Licence Appeal Tribunal. Missing this deadline means accepting the 90-day suspension. Call immediately after a DUI arrest to protect your rights.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Impaired Driving FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Facing Impaired Driving Charges?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">I help with provincial licence matters and connect you with criminal lawyers for the charges. Call now—deadlines are tight.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get Help Now</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.traffic} />
      </ServicePageLayout>
    </>
  );
}
