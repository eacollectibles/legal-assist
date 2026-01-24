import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, Clock, DollarSign, HelpCircle, Gauge, Ban, AlertCircle, Scale } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function DrivingWhileSuspendedPage() {
  const authorityItems = [
    { title: 'Serious Charge Expertise', description: 'Driving while suspended is one of the most serious traffic offences—potential jail time, vehicle impound, and extended suspensions. I understand what\'s at stake.' },
    { title: 'Defence Strategies', description: 'Many driving suspended charges involve notice issues. If you didn\'t know about the suspension, or notice was defective, defences exist.' },
    { title: 'Realistic Assessment', description: 'I\'ll tell you honestly whether you have a defence, what outcomes are possible, and what you\'re facing if convicted.' }
  ];

  const processSteps = [
    { step: '1', title: 'Charge Analysis', description: 'Determine the type of suspension and whether proper notice was given—this is often the key issue.' },
    { step: '2', title: 'Defence Investigation', description: 'Review MTO records, notice documentation, and identify potential defences.' },
    { step: '3', title: 'Court Representation', description: 'Negotiate or proceed to trial based on the evidence and defence strategy.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Notice Defences', description: 'If you didn\'t receive proper notice of suspension, you may have a complete defence.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Jail Avoidance Focus', description: 'For first offences, avoiding jail is often possible with proper representation.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Licence Reinstatement', description: 'I can help navigate the reinstatement process after the case is resolved.' }
  ];

  const honestFAQs = [
    { question: "What are the penalties for driving while suspended?", answer: "First offence: $1,000-$5,000 fine, possible jail up to 6 months, additional 6-month licence suspension, vehicle impound. Subsequent offences: $2,000-$25,000 fine, likely jail, 2-year additional suspension. Insurance consequences are severe—you may become uninsurable." },
    { question: "Can I go to jail for driving suspended?", answer: "Possible but uncommon for first offences without aggravating factors. More likely if: you were suspended for impaired driving conviction, caught multiple times, involved in an accident, or have a significant criminal record. Second and third offences have much higher jail risk." },
    { question: "What if I didn't know my licence was suspended?", answer: "Lack of knowledge can be a complete defence IF the Crown can't prove you received proper notice. Common issues: wrong address on file, mail not delivered, suspension arose from unpaid fines you didn't know about. We investigate notice procedures thoroughly." },
    { question: "What's the difference between 'under suspension' and 'prohibited'?", answer: "Under suspension (HTA): Provincial offence, serious but not criminal. While prohibited (Criminal Code): Criminal offence if you were prohibited by court order after impaired/dangerous driving. Criminal charges require a criminal defence lawyer." },
    { question: "What happens to my car?", answer: "If caught driving suspended, your vehicle is impounded for 45 days (first offence) to indefinitely (subsequent offences). You pay towing and storage—typically $1,500-3,000+. The impound happens regardless of trial outcome." },
    { question: "Can I get my suspension shortened?", answer: "Depends on why you're suspended. Administrative suspensions (unpaid fines, medical issues) can often be resolved by addressing the underlying issue. Suspensions from court orders have fixed terms. I can help identify options for early reinstatement." }
  ];

  return (
    <>
      <SEO title="Driving While Suspended Defence Paralegal | Ontario" description="Licensed paralegal defending driving while suspended charges in Ontario. Notice defences, jail avoidance, licence reinstatement. Free consultation." canonical="https://www.legalassist.london/services/driving-while-suspended" />
      <ServicePageLayout seoTitle="Driving While Suspended Defence Paralegal | Ontario" seoDescription="Licensed paralegal defending driving while suspended charges in Ontario." canonical="https://www.legalassist.london/services/driving-while-suspended" problemHeadline="Driving While Suspended Defence in Ontario" problemDescription="Driving suspended is one of the most serious traffic charges—potential jail time, vehicle seizure, and extended suspensions. If you didn't know about the suspension, you may have a defence." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png?id=driving-suspended-hero", alt: "Driving while suspended defence" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        {/* Severity Alert */}
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Why This Charge is Serious</h2>
            
            <div className="bg-red-100 border-l-4 border-red-600 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                Potential Jail Time
              </h3>
              <p className="text-red-900 text-lg">Driving while suspended carries up to <strong>6 months jail</strong> for first offence, and fines up to <strong>$5,000</strong>. Your vehicle has already been impounded for <strong>45 days</strong>.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-red-50 rounded-lg p-6 border border-red-200 text-center">
                <DollarSign className="w-10 h-10 text-red-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-red-700 mb-2">$5,000</div>
                <p className="text-red-800 font-medium">Maximum Fine</p>
                <p className="text-sm text-red-700 mt-1">First offence</p>
              </div>
              <div className="bg-red-50 rounded-lg p-6 border border-red-200 text-center">
                <Ban className="w-10 h-10 text-red-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-red-700 mb-2">6 Months</div>
                <p className="text-red-800 font-medium">Maximum Jail</p>
                <p className="text-sm text-red-700 mt-1">First offence</p>
              </div>
              <div className="bg-red-50 rounded-lg p-6 border border-red-200 text-center">
                <Clock className="w-10 h-10 text-red-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-red-700 mb-2">+6 Months</div>
                <p className="text-red-800 font-medium">Added Suspension</p>
                <p className="text-sm text-red-700 mt-1">On top of current</p>
              </div>
              <div className="bg-red-50 rounded-lg p-6 border border-red-200 text-center">
                <Gauge className="w-10 h-10 text-red-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-red-700 mb-2">45 Days</div>
                <p className="text-red-800 font-medium">Vehicle Impound</p>
                <p className="text-sm text-red-700 mt-1">Already in effect</p>
              </div>
            </div>

            {/* Notice Defence */}
            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-12">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Scale className="w-6 h-6 text-primary" />
                The "Notice" Defence
              </h3>
              <p className="text-foreground/80 mb-4">The Crown must prove you <strong>knew or ought to have known</strong> about your suspension. If you didn't receive proper notice—wrong address, mail issues, unclear communication—you may have a complete defence.</p>
              <p className="text-foreground/80"><strong>Key questions:</strong> Did MTO have your current address? Was the suspension notice sent? Did you actually receive it? Were you told at a previous court appearance?</p>
            </div>

            {/* Paralegal vs Lawyer */}
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Can a Paralegal Handle This?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h4 className="font-heading text-lg font-bold text-green-800">I Can Handle</h4>
                </div>
                <ul className="space-y-2 text-green-900 text-sm">
                  <li>• Driving under suspension (HTA s. 53)</li>
                  <li>• Administrative suspensions</li>
                  <li>• Unpaid fine suspensions</li>
                  <li>• Medical suspensions</li>
                  <li>• Insurance-related suspensions</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-6 h-6 text-red-600" />
                  <h4 className="font-heading text-lg font-bold text-red-800">Need a Lawyer</h4>
                </div>
                <ul className="space-y-2 text-red-900 text-sm">
                  <li>• Driving while prohibited (Criminal Code)</li>
                  <li>• Prohibition from impaired driving conviction</li>
                  <li>• Prohibition from dangerous driving conviction</li>
                  <li>• Any criminal charges</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Decision Framework */}
        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Defence Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h4 className="font-heading text-lg font-bold text-green-800">Strong Defence When:</h4>
                </div>
                <ul className="space-y-2 text-green-900 text-sm">
                  <li>• No notice was sent or received</li>
                  <li>• MTO had wrong address</li>
                  <li>• Suspension arose from unpaid fines you didn't know about</li>
                  <li>• Administrative error by MTO</li>
                  <li>• Medical suspension without proper notification</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  <h4 className="font-heading text-lg font-bold text-yellow-800">Mitigating Factors:</h4>
                </div>
                <ul className="space-y-2 text-yellow-900 text-sm">
                  <li>• First offence</li>
                  <li>• Driving for emergency/necessity</li>
                  <li>• Short distance driven</li>
                  <li>• Steps taken to reinstate licence</li>
                  <li>• Employment hardship</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-6 h-6 text-red-600" />
                  <h4 className="font-heading text-lg font-bold text-red-800">Difficult Cases:</h4>
                </div>
                <ul className="space-y-2 text-red-900 text-sm">
                  <li>• Told about suspension in court</li>
                  <li>• Previous convictions for same</li>
                  <li>• Caught driving multiple times</li>
                  <li>• Suspension from impaired conviction</li>
                  <li>• Involved in accident while suspended</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Honest Answers</h2>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {honestFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-lg border border-border px-6">
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Charged with Driving Suspended?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">This is a serious charge, but defences exist. Get an honest assessment of your options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>

        <RelatedServices services={relatedServicesConfig.trafficTickets} />
      </ServicePageLayout>
    </>
  );
}
