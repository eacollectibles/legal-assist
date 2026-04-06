import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Beer, Shield, Scale, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function PublicIntoxicationPage() {
  const authorityItems = [
    { title: 'Public Intoxication', description: 'Being intoxicated in public is a provincial offence under the Liquor Licence Act—not a criminal charge. I defend these tickets.' },
    { title: 'Provincial Offence', description: 'No criminal record from conviction. But fines, and it can affect professional licensing or immigration.' },
    { title: 'Defences Exist', description: 'Not actually intoxicated, not in public place, charter issues with detention—defences are available.' }
  ];

  const processSteps = [
    { step: '1', title: 'Review Charge', description: 'What exactly are you charged with?' },
    { step: '2', title: 'Assess Evidence', description: 'What observations did police make?' },
    { step: '3', title: 'Fight or Negotiate', description: 'Trial defence or early resolution.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Not Criminal', description: 'Provincial offence only.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Defences Available', description: 'Multiple grounds to fight.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Can Affect Licensing', description: 'Some professional impacts.' }
  ];

  const honestFAQs = [
    { question: "Is public intoxication a criminal offence?", answer: "No. It's a provincial offence under Ontario's Liquor Licence Act. You won't get a criminal record. However, it's still a conviction that may appear on background checks and can affect some professional licences." },
    { question: "What are the penalties for public intoxication?", answer: "Fine of approximately $65-$125 (set fine) for first offence. No jail for simple public intoxication. But multiple offences or aggravating factors can increase penalties. And some employers/licensing bodies care about this conviction." },
    { question: "I was drinking but wasn't causing problems. Is that still an offence?", answer: "Yes—you don't need to be causing a disturbance. Simply being intoxicated in a public place is the offence. However, 'intoxicated' requires impairment of some degree—being buzzed may not qualify." },
    { question: "What defences work for public intoxication?", answer: "Not actually intoxicated (just tired, medical condition, etc.), not a public place (private property, inside a business with permission), charter violations (unlawful detention/search), identification issues (wrong person)." },
    { question: "I was detained for hours. Is that legal?", answer: "Police can detain intoxicated persons until sober for their safety. But extended detention may raise charter issues. If you were held excessively long or mistreated, this could be grounds for defence or exclusion of evidence." },
    { question: "Will this affect my job or immigration?", answer: "For most jobs: probably not. For jobs requiring clean records, professional licensing, or immigration matters: possibly. It's not criminal, but it is a conviction. Worth fighting if any of these apply to you." }
  ];

  return (
    <>
      <SEO title="Public Intoxication Defence Paralegal Ontario | Drunk in Public Ticket" description="Licensed paralegal for public intoxication charges in Ontario. Provincial offence, not criminal. Liquor Licence Act defence. Free consultation." canonical="https://www.legalassist.london/services/public-intoxication" />
      <ServicePageLayout seoTitle="Public Intoxication | Ontario" seoDescription="Public intoxication defence in Ontario." canonical="https://www.legalassist.london/services/public-intoxication" problemHeadline="Public Intoxication" problemDescription="Charged with being intoxicated in public? This is a provincial offence, not criminal. But it's still worth fighting—especially if you have licensing or immigration concerns." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Public intoxication" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Public Intoxication</h2>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Not a Criminal Offence
              </h3>
              <p className="text-green-900">Public intoxication under the Liquor Licence Act is a provincial offence, like a traffic ticket. You will NOT have a criminal record from this charge.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Elements of the Offence</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <p className="text-foreground/80 mb-4">Crown must prove:</p>
              <ol className="text-foreground/80 space-y-2">
                <li><span className="font-bold">1. Intoxicated:</span> Actually impaired by alcohol to a noticeable degree</li>
                <li><span className="font-bold">2. In a public place:</span> Street, park, public transit, etc.</li>
              </ol>
              <p className="text-foreground/70 text-sm mt-4">Both elements must be proven. Challenge either one and the charge fails.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Available Defences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Not Intoxicated:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Just tired or fatigued</li>
                  <li>• Medical condition (diabetes, etc.)</li>
                  <li>• Medication side effects</li>
                  <li>• Had been drinking but not impaired</li>
                  <li>• Officer's observations wrong</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">Not Public Place:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• Private property (with permission)</li>
                  <li>• Inside a licensed establishment</li>
                  <li>• Private vehicle (debatable)</li>
                  <li>• Semi-private areas (apartment lobby)</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">When to Fight</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Reasons to Contest:</h4>
              <ul className="text-yellow-900 text-sm space-y-2">
                <li>• You hold a professional licence (nursing, teaching, etc.)</li>
                <li>• Immigration status could be affected</li>
                <li>• Employment requires clean record</li>
                <li>• You weren't actually intoxicated</li>
                <li>• Charter rights were violated</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Public Intoxication FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Charged with Public Intoxication?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let me assess whether fighting makes sense for your situation.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.criminalPOA} />
      </ServicePageLayout>
    </>
  );
}
