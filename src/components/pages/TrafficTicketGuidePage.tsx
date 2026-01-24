import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Car, Clock, DollarSign, Scale } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function TrafficTicketGuidePage() {
  const authorityItems = [
    { title: 'Complete Guide', description: 'Everything you need to know about Ontario traffic tickets—options, timelines, consequences, and when to fight.' },
    { title: 'Decision Framework', description: 'Not every ticket is worth fighting. I help you understand when fighting makes sense and when it doesn\'t.' },
    { title: 'True Costs', description: 'The fine is just the beginning. Insurance impacts, demerit points, and licence consequences often cost more.' }
  ];

  const processSteps = [
    { step: '1', title: 'Understand Options', description: 'Pay, early resolution, or trial—know your choices.' },
    { step: '2', title: 'Assess True Cost', description: 'Calculate fine + insurance + points impact.' },
    { step: '3', title: 'Decide Strategy', description: 'Fight, negotiate, or accept based on full picture.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Options Exist', description: 'You always have choices beyond just paying.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Negotiation Possible', description: 'Many tickets can be reduced at early resolution.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Deadlines Matter', description: '15 days to respond or face default conviction.' }
  ];

  const honestFAQs = [
    { question: "What are my options when I get a traffic ticket?", answer: "Three options: (1) Pay the fine (pleading guilty, accepting points), (2) Request early resolution (meet with prosecutor, possibly reduce charge), (3) Request trial (fight the ticket in court). You have 15 days to choose—doing nothing results in conviction." },
    { question: "How do I decide whether to fight a ticket?", answer: "Consider: how many points? what's your current record? how much will insurance increase? is there a defence? For minor tickets with no points on a clean record, paying may be fine. For major tickets or if you have points already, fighting often makes financial sense." },
    { question: "What happens at early resolution?", answer: "You meet with a prosecutor before trial. They may offer to reduce the charge to fewer points or a lower fine in exchange for a guilty plea. No trial, faster resolution. You can accept the offer, reject it and go to trial, or negotiate further." },
    { question: "How long does the process take?", answer: "Early resolution: typically 2-4 months from request. Trial: 6-12+ months. During this time, the ticket isn't on your record and doesn't affect insurance. But if convicted later, it backdates to the offence date." },
    { question: "Will my insurance go up?", answer: "Minor convictions (1-2 points): 0-15% increase. Moderate (3-4 points): 15-30% increase. Major (6+ points, careless, stunt): 50-300% increase or cancellation. Insurance checks your record at renewal—timing matters." },
    { question: "What if I just ignore the ticket?", answer: "After 15 days with no response, you're convicted in absence. The fine becomes due, points go on your record, and if unpaid, your licence can be suspended when you try to renew your plates. Never ignore a ticket." }
  ];

  return (
    <>
      <SEO title="Ontario Traffic Ticket Guide | Fight or Pay Decision Framework" description="Complete guide to Ontario traffic tickets. Options, timelines, insurance impact, demerit points. When to fight, when to pay. Free consultation." canonical="https://www.legalassist.london/guides/traffic-ticket-guide" />
      <ServicePageLayout seoTitle="Traffic Ticket Guide | Ontario" seoDescription="Complete Ontario traffic ticket guide." canonical="https://www.legalassist.london/guides/traffic-ticket-guide" problemHeadline="Ontario Traffic Ticket Guide" problemDescription="Got a traffic ticket? Before you pay, understand your options. The fine is often the smallest cost—insurance and points matter more." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Traffic ticket guide" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Your Three Options</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-bold text-red-800 mb-2">Option 1: Pay Fine</h3>
                <p className="text-red-900 text-sm mb-3">Pleading guilty. Fine + points + insurance impact.</p>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Fastest resolution</li>
                  <li>• Full points apply</li>
                  <li>• Insurance sees conviction</li>
                  <li>• Cannot undo later</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-bold text-yellow-800 mb-2">Option 2: Early Resolution</h3>
                <p className="text-yellow-900 text-sm mb-3">Meet prosecutor, possibly reduce charge.</p>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• Often reduced points</li>
                  <li>• Lower fine possible</li>
                  <li>• No trial needed</li>
                  <li>• Still a conviction</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-bold text-green-800 mb-2">Option 3: Trial</h3>
                <p className="text-green-900 text-sm mb-3">Fight the ticket in court.</p>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Possible dismissal</li>
                  <li>• Delay before conviction</li>
                  <li>• Officer may not appear</li>
                  <li>• Takes longest</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-12">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <Clock className="w-6 h-6" />
                15-Day Deadline
              </h3>
              <p className="text-red-900">You have 15 days from receiving the ticket to respond. If you do nothing, you're automatically convicted. The fine becomes due, points go on your record, and unpaid fines lead to licence suspension.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Decision Framework: Fight or Pay?</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Situation</th>
                    <th className="px-6 py-4 text-left font-heading">Recommendation</th>
                    <th className="px-6 py-4 text-left font-heading">Why</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">Clean record, minor ticket (0-2 pts)</td><td className="px-6 py-4 text-green-800">Consider paying or early resolution</td><td className="px-6 py-4 text-sm">Minimal insurance impact, not worth time/cost</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Already have points, any ticket</td><td className="px-6 py-4 text-primary font-medium">Fight or negotiate</td><td className="px-6 py-4 text-sm">Accumulating points = suspensions, major increases</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Major ticket (4+ points)</td><td className="px-6 py-4 text-primary font-medium">Definitely fight</td><td className="px-6 py-4 text-sm">Insurance impact far exceeds cost of fighting</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Careless, stunt, impaired</td><td className="px-6 py-4 text-red-800 font-bold">Get representation</td><td className="px-6 py-4 text-sm">Licence, insurance, possibly criminal—too much at stake</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">The True Cost of a Ticket</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-8">
              <DollarSign className="w-8 h-8 text-primary mb-3" />
              <p className="text-foreground/80 mb-4">Example: 15 km/h over speed limit ($52.50 fine, 2 points)</p>
              <ul className="text-foreground/80 space-y-2">
                <li>• Fine: <span className="font-bold">$52.50</span></li>
                <li>• Insurance increase (10% on $2,000/year for 3 years): <span className="font-bold">$600</span></li>
                <li>• <span className="font-bold">True cost: $652.50</span></li>
              </ul>
              <p className="text-foreground/70 text-sm mt-4">This is why "just paying" a small fine often costs more than fighting it.</p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Insurance Timing</h4>
              <p className="text-yellow-900 text-sm">Insurance companies check your record at renewal. If your trial is scheduled after your renewal date, you get another clean year even if eventually convicted. Timing can save hundreds.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Traffic Ticket FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Need Help Deciding?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Send me your ticket. I'll tell you honestly whether fighting makes sense.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.traffic} />
      </ServicePageLayout>
    </>
  );
}
