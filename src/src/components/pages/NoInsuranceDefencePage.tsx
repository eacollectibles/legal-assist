import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, Clock, DollarSign, HelpCircle, Shield, AlertCircle, Ban, Car } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function NoInsuranceDefencePage() {
  const authorityItems = [
    { title: 'Serious Charge Expertise', description: 'Driving without insurance carries minimum fines of $5,000 and licence suspension. I understand the defences and how to minimize consequences.' },
    { title: 'Coverage Verification', description: 'Many "no insurance" charges are wrongful—you had coverage but couldn\'t produce proof. I investigate coverage status and rectify errors.' },
    { title: 'Realistic Assessment', description: 'If you genuinely had no coverage, I\'ll tell you what to expect. If you did, I\'ll fight to prove it.' }
  ];

  const processSteps = [
    { step: '1', title: 'Coverage Investigation', description: 'Verify your insurance status at the time of the stop—often charges are laid in error.' },
    { step: '2', title: 'Defence Strategy', description: 'If covered, provide proof for withdrawal. If not, focus on minimizing penalties.' },
    { step: '3', title: 'Court Representation', description: 'Present evidence of coverage or mitigating factors at trial.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Coverage Verification', description: 'Many charges are laid in error—proper documentation often leads to withdrawal.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Fine Reduction Focus', description: 'Even if convicted, arguments can reduce fines below the $5,000 minimum.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Licence Protection', description: 'Work to minimize or avoid licence suspension.' }
  ];

  const honestFAQs = [
    { question: "What are the penalties for driving without insurance?", answer: "First offence: $5,000-$25,000 fine (minimum $5,000), licence suspension, vehicle impound. Second offence: $10,000-$50,000 fine, up to 1 year jail, longer suspension. These are among the harshest traffic penalties in Ontario." },
    { question: "What if I had insurance but couldn't show proof?", answer: "This is a common defence. If you had valid insurance at the time, obtain proof from your insurer (a letter confirming coverage dates) and we can often get the charge withdrawn. Many no-insurance charges are laid when people can't produce their pink slip but actually had coverage." },
    { question: "What if my insurance lapsed without me knowing?", answer: "Not knowing isn't a defence—you're legally responsible for maintaining coverage. However, if your insurer failed to notify you of cancellation, or there were payment processing errors, this can be mitigating. We investigate the circumstances." },
    { question: "Can the $5,000 minimum fine be reduced?", answer: "In exceptional circumstances, yes. If you have genuine financial hardship, had some coverage (but wrong vehicle listed), or can show good faith efforts to maintain insurance, the court can impose a lesser fine. But this requires strong arguments." },
    { question: "What about the licence suspension?", answer: "Conviction results in automatic licence suspension. The length depends on the circumstances. With proper representation, we can sometimes minimize or avoid suspension, particularly if there are mitigating factors." },
    { question: "What if I was driving someone else's uninsured car?", answer: "You can still be charged. The driver must ensure the vehicle is insured. If the owner told you it was insured and you had no reason to doubt them, this can be a defence. Documentation is key." }
  ];

  return (
    <>
      <SEO title="No Insurance Defence Paralegal | Driving Without Insurance | Ontario" description="Licensed paralegal defending driving without insurance charges in Ontario. Coverage verification, fine reduction. Minimum $5,000 fine. Free consultation." canonical="https://www.legalassist.london/services/no-insurance-defence" />
      <ServicePageLayout seoTitle="No Insurance Defence Paralegal | Ontario" seoDescription="Licensed paralegal defending driving without insurance charges." canonical="https://www.legalassist.london/services/no-insurance-defence" problemHeadline="Driving Without Insurance Defence in Ontario" problemDescription="Facing one of Ontario's harshest traffic penalties—minimum $5,000 fine. But many 'no insurance' charges are laid in error. If you had coverage, we can prove it." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png?id=no-insurance-hero", alt: "No insurance defence" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        {/* Severity Alert */}
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Ontario's Harshest Traffic Fine</h2>
            
            <div className="bg-red-100 border-l-4 border-red-600 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                Minimum $5,000 Fine
              </h3>
              <p className="text-red-900 text-lg">Driving without insurance carries the highest mandatory minimum fine of any traffic offence. <strong>But many charges are laid in error</strong>—if you had coverage, we can prove it.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-red-50 rounded-lg p-6 border border-red-200 text-center">
                <DollarSign className="w-10 h-10 text-red-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-red-700 mb-2">$5,000</div>
                <p className="text-red-800 font-medium">Minimum Fine</p>
                <p className="text-sm text-red-700 mt-1">Up to $25,000</p>
              </div>
              <div className="bg-red-50 rounded-lg p-6 border border-red-200 text-center">
                <Ban className="w-10 h-10 text-red-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-red-700 mb-2">Suspension</div>
                <p className="text-red-800 font-medium">Licence Suspended</p>
                <p className="text-sm text-red-700 mt-1">Automatic on conviction</p>
              </div>
              <div className="bg-red-50 rounded-lg p-6 border border-red-200 text-center">
                <Car className="w-10 h-10 text-red-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-red-700 mb-2">Impound</div>
                <p className="text-red-800 font-medium">Vehicle Seized</p>
                <p className="text-sm text-red-700 mt-1">At roadside</p>
              </div>
              <div className="bg-red-50 rounded-lg p-6 border border-red-200 text-center">
                <Shield className="w-10 h-10 text-red-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-red-700 mb-2">3 Years</div>
                <p className="text-red-800 font-medium">Insurance Record</p>
                <p className="text-sm text-red-700 mt-1">Severe impact</p>
              </div>
            </div>

            {/* Common Defence */}
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-12">
              <h3 className="font-heading text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                The Most Common Defence: You Had Coverage
              </h3>
              <p className="text-green-900 text-lg mb-4">Many no-insurance charges are laid because you couldn't produce your pink slip—not because you were uninsured. If you had valid coverage at the time of the stop:</p>
              <ul className="text-green-800 space-y-2">
                <li>• Get a letter from your insurer confirming coverage dates</li>
                <li>• Provide proof of coverage to Crown/court</li>
                <li>• Charge is often withdrawn with proper documentation</li>
              </ul>
            </div>

            {/* When No Coverage */}
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">If You Genuinely Had No Coverage</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  <h4 className="font-heading text-lg font-bold text-yellow-800">Possible Mitigating Factors:</h4>
                </div>
                <ul className="space-y-2 text-yellow-900 text-sm">
                  <li>• Insurer cancelled without proper notice</li>
                  <li>• Payment processing error</li>
                  <li>• Recently purchased vehicle, pending insurance</li>
                  <li>• Genuine financial hardship</li>
                  <li>• Believed vehicle was covered under another policy</li>
                  <li>• Steps taken to obtain insurance</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-6 h-6 text-red-600" />
                  <h4 className="font-heading text-lg font-bold text-red-800">Not Valid Defences:</h4>
                </div>
                <ul className="space-y-2 text-red-900 text-sm">
                  <li>• "I didn't know insurance lapsed"</li>
                  <li>• "Insurance is too expensive"</li>
                  <li>• "I was only driving a short distance"</li>
                  <li>• "I needed to get to work"</li>
                  <li>• "My friend said I was covered"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
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

        {/* CTA */}
        <div className="w-full py-16 md:py-24 bg-primary/5">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Charged with No Insurance?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">First step: verify whether you actually had coverage. I can help investigate and build your defence.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>

        <RelatedServices services={relatedServicesConfig.trafficTickets} />
      </ServicePageLayout>
    </>
  );
}
