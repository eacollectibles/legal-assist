import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, Scale, Clock, DollarSign, HelpCircle, Smartphone, Gauge, Shield } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function DistractedDrivingDefencePage() {
  const authorityItems = [
    { title: 'Distracted Driving Experience', description: 'Distracted driving charges are increasingly common and heavily penalized. I know the defences that work and when to fight versus negotiate.' },
    { title: 'Evidence Analysis', description: 'Many distracted driving charges rely on officer observation. I challenge the evidence, circumstances, and whether the device was actually being used.' },
    { title: 'Insurance Focus', description: 'Insurers treat distracted driving like serious moving violations. Every strategy aims to protect your insurance rates.' }
  ];

  const processSteps = [
    { step: '1', title: 'Ticket Review', description: 'Analyze the charge, officer notes, and circumstances to identify potential defences.' },
    { step: '2', title: 'Defence Strategy', description: 'Determine whether to challenge the charge at trial or negotiate a reduction.' },
    { step: '3', title: 'Court Representation', description: 'I appear in court on your behalf—most clients never need to attend.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'You Don\'t Attend Court', description: 'I handle all appearances, negotiations, and trial proceedings on your behalf.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Insurance Protection', description: 'Focus on outcomes that minimize or eliminate insurance impact.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Honest Assessment', description: 'I\'ll tell you if your case is worth fighting before you commit.' }
  ];

  const honestFAQs = [
    { question: "What counts as distracted driving?", answer: "Holding or using a hand-held wireless device (phone, tablet, GPS) while driving. This includes texting, calling, checking email, or even just holding the phone. Hands-free devices are permitted if mounted to the dashboard or used via Bluetooth." },
    { question: "What are the penalties?", answer: "Under HTA s.78.1: First conviction: $615 set fine (up to $1,000 if elected to court), 3 demerit points, 3-day licence suspension. Second conviction within 5 years: up to $2,000 fine, 6 demerit points, 7-day suspension. Third or subsequent conviction within 5 years: up to $3,000 fine, 6 demerit points, 30-day suspension. Novice drivers (G1, G2, M1, M2) face a 30-day suspension on first conviction." },
    { question: "What if I was just holding my phone?", answer: "Holding a hand-held wireless communication device while driving is the offence — you don't have to be actively using it. However, if the phone was mounted and you only touched it briefly, or if you were legally parked or pulled off the roadway with the vehicle in park, these are potential defences worth exploring." },
    { question: "Can distracted driving be reduced?", answer: "Sometimes. The Crown may offer a reduction to a non-moving violation (e.g. seatbelt) which eliminates demerit points and lowers insurance impact. Whether a reduction is on the table depends on the disclosure, your driving record, and the prosecutor assigned. Not every Crown will negotiate." },
    { question: "What if I was using GPS?", answer: "GPS use is permitted if the device is properly mounted (dashboard, windshield, or vehicle's built-in screen) and you are not entering destinations or otherwise interacting with it manually while in motion. Holding the GPS in your hand or lap can still result in a charge even if you're 'just navigating'." },
    { question: "What outcomes are possible?", answer: "Every case is decided on its own evidence, so we can't guarantee results. The realistic outcomes for a contested distracted driving charge include: withdrawal (where the Crown's evidence is weak or the officer is unavailable), reduction to a lesser offence, acquittal at trial, or conviction-as-charged. Your record, the disclosure, and the trial Crown all influence which is most likely." }
  ];

  return (
    <>
      <SEO title="Distracted Driving Defence Paralegal | Cell Phone Ticket Defence | Ontario" description="Licensed paralegal defending distracted driving charges in Ontario. Cell phone tickets, texting while driving. Protect your insurance rates. Free consultation." canonical="https://www.legalassist.london/services/distracted-driving-defence" />
      <ServicePageLayout seoTitle="Distracted Driving Defence Paralegal | Ontario" seoDescription="Licensed paralegal defending distracted driving charges in Ontario." canonical="https://www.legalassist.london/services/distracted-driving-defence" problemHeadline="Distracted Driving Defence in Ontario" problemDescription="Caught with your phone? Distracted driving carries 3 demerit points and significant insurance increases. Before you pay the fine, understand your options." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png?id=distracted-driving-hero", alt: "Distracted driving defence" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        {/* Key Facts */}
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Distracted Driving: The Real Cost</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3">Insurance Impact</h3>
              <p className="text-red-900 text-lg">Insurers treat distracted driving like careless driving. Expect <strong>25-40% premium increases</strong> for 3 years with a conviction.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-red-50 rounded-lg p-6 border border-red-200 text-center">
                <DollarSign className="w-10 h-10 text-red-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-red-700 mb-2">$615+</div>
                <p className="text-red-800 font-medium">First Offence Fine</p>
              </div>
              <div className="bg-red-50 rounded-lg p-6 border border-red-200 text-center">
                <Gauge className="w-10 h-10 text-red-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-red-700 mb-2">3</div>
                <p className="text-red-800 font-medium">Demerit Points</p>
              </div>
              <div className="bg-red-50 rounded-lg p-6 border border-red-200 text-center">
                <Clock className="w-10 h-10 text-red-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-red-700 mb-2">3 Years</div>
                <p className="text-red-800 font-medium">On Driving Record</p>
              </div>
              <div className="bg-red-50 rounded-lg p-6 border border-red-200 text-center">
                <Smartphone className="w-10 h-10 text-red-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-red-700 mb-2">25-40%</div>
                <p className="text-red-800 font-medium">Insurance Increase</p>
              </div>
            </div>

            {/* Decision Framework */}
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Should You Fight?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h4 className="font-heading text-lg font-bold text-green-800">Fight When:</h4>
                </div>
                <ul className="space-y-2 text-green-900 text-sm">
                  <li>• Phone was mounted/hands-free</li>
                  <li>• You were legally parked</li>
                  <li>• Officer's view was obstructed</li>
                  <li>• Device wasn't actually a phone</li>
                  <li>• You have insurance at stake</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  <h4 className="font-heading text-lg font-bold text-yellow-800">Negotiate When:</h4>
                </div>
                <ul className="space-y-2 text-yellow-900 text-sm">
                  <li>• Evidence is solid but clean record</li>
                  <li>• Crown may accept lesser charge</li>
                  <li>• Need certainty for employment</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-6 h-6 text-gray-600" />
                  <h4 className="font-heading text-lg font-bold text-gray-800">May Not Be Worth It:</h4>
                </div>
                <ul className="space-y-2 text-gray-900 text-sm">
                  <li>• Video evidence of you holding phone</li>
                  <li>• Multiple witnesses</li>
                  <li>• Admitted to officer at roadside</li>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Got a Distracted Driving Ticket?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">Get an honest assessment of whether fighting is worth it for your specific situation.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>

        <RelatedServices services={relatedServicesConfig.trafficTickets} />
      </ServicePageLayout>
    </>
  );
}
