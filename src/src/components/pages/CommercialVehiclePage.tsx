import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Truck, DollarSign, FileText, Shield } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function CommercialVehiclePage() {
  const authorityItems = [
    { title: 'Commercial Vehicle Tickets', description: 'Truck drivers and commercial operators face unique charges: logbook violations, weight limits, CVOR points. I defend commercial vehicle tickets.' },
    { title: 'CVOR Impact', description: 'Commercial Vehicle Operator\'s Registration tracks violations. Too many points can shut down your carrier or end your driving career.' },
    { title: 'Livelihood at Stake', description: 'For professional drivers, tickets aren\'t just fines—they\'re threats to your job and carrier status.' }
  ];

  const processSteps = [
    { step: '1', title: 'Review Violation', description: 'What specific commercial regulation is alleged?' },
    { step: '2', title: 'Assess CVOR Impact', description: 'How many points? Threshold risk?' },
    { step: '3', title: 'Fight Strategically', description: 'Protect driving record and CVOR.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Technical Defences', description: 'Regulations are complex—errors happen.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Protect CVOR', description: 'Keep carrier rating safe.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'High Stakes', description: 'Job and carrier at risk.' }
  ];

  const honestFAQs = [
    { question: "What is a CVOR and why does it matter?", answer: "Commercial Vehicle Operator's Registration tracks safety violations for carriers. Points accumulate based on conviction severity. Too many points triggers facility audits, interventions, or carrier shutdown. For drivers, CVOR problems mean employers won't hire you." },
    { question: "How do CVOR points work?", answer: "Points are assigned based on violation severity and your fleet size. Minor violations: 1-3 points. Serious violations: 4-5 points. Critical violations: 6+ points. Your 'violation rate' (points ÷ fleet size) determines carrier standing. High rates trigger MTO intervention." },
    { question: "I got a logbook violation. How serious is this?", answer: "Depends on the violation. Minor errors (incorrect address): lower points. Falsified logs: serious points and potentially criminal charges. Hours of service violations: moderate to serious. Logbook violations are common but worth fighting to minimize CVOR impact." },
    { question: "My truck was overweight at a scale. What are the penalties?", answer: "Fines scale with how much over: up to 2,500 kg over = ~$200. 2,500-5,000 kg = ~$310. Over 5,000 kg = ~$400+. Plus CVOR points, potential out-of-service order, and load adjustment costs. Fighting may reduce fine and points." },
    { question: "Can I lose my AZ/DZ licence from tickets?", answer: "Your personal licence is separate from carrier CVOR. But: accumulate 9+ demerit points = suspension. Medical or drug/alcohol violations = potential downgrade. Multiple serious violations = MTO may require re-examination. Protect your record." },
    { question: "My employer says I have to pay the ticket. Is that right?", answer: "Employers often try to pass violation costs to drivers. Your employment contract may address this. However, if the violation resulted from employer pressure (forced to drive overloaded, skip rest), you may have defences and employer liability. Document instructions you received." }
  ];

  return (
    <>
      <SEO title="Commercial Vehicle Ticket Defence Paralegal Ontario | CVOR Truck Driver" description="Licensed paralegal for commercial vehicle tickets in Ontario. CVOR points, logbook violations, overweight, AZ/DZ driver defence. Protect your career. Free consultation." canonical="https://www.legalassist.london/services/commercial-vehicle" />
      <ServicePageLayout seoTitle="Commercial Vehicle Tickets | Ontario" seoDescription="Commercial vehicle ticket defence in Ontario." canonical="https://www.legalassist.london/services/commercial-vehicle" problemHeadline="Commercial Vehicle Tickets" problemDescription="Truck driver or carrier facing tickets? CVOR points, logbook violations, overweight charges—your livelihood is at stake. I defend commercial vehicle operators." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Commercial vehicle" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Commercial Vehicle Defence</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Commercial Violations</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Violation</th>
                    <th className="px-6 py-4 text-left font-heading">Fine Range</th>
                    <th className="px-6 py-4 text-left font-heading">CVOR Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Logbook violation (minor)</td><td className="px-6 py-4">$200-400</td><td className="px-6 py-4 text-sm">1-3 points</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Hours of service violation</td><td className="px-6 py-4">$200-500</td><td className="px-6 py-4 text-sm">2-4 points</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Overweight (up to 2,500 kg)</td><td className="px-6 py-4">~$200</td><td className="px-6 py-4 text-sm">2-3 points</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Overweight (2,500-5,000 kg)</td><td className="px-6 py-4">~$310</td><td className="px-6 py-4 text-sm">3-4 points</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Falsified logbook</td><td className="px-6 py-4 text-red-700">$500+</td><td className="px-6 py-4 text-sm text-red-700">5-6 points + potential criminal</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Defective equipment</td><td className="px-6 py-4">$100-400</td><td className="px-6 py-4 text-sm">1-4 points (severity)</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Understanding CVOR</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
              <Truck className="w-6 h-6 text-yellow-600 mb-2" />
              <h4 className="font-bold text-yellow-800 mb-2">CVOR Violation Rate</h4>
              <p className="text-yellow-900 text-sm mb-3">Your violation rate = total points ÷ fleet size. MTO thresholds:</p>
              <ul className="text-yellow-900 text-sm space-y-1">
                <li>• <span className="font-bold">Excellent:</span> Below threshold, no concerns</li>
                <li>• <span className="font-bold">Satisfactory:</span> Above threshold, on radar</li>
                <li>• <span className="font-bold">Conditional:</span> Warning, potential audit</li>
                <li>• <span className="font-bold">Unsatisfactory:</span> Intervention, possible shutdown</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-primary/5 rounded-lg p-6">
                <h4 className="font-bold text-foreground mb-3">For Drivers:</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Tickets affect your employability</li>
                  <li>• Carriers check abstracts before hiring</li>
                  <li>• Multiple violations = unemployable</li>
                  <li>• Fight tickets to protect your career</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <h4 className="font-bold text-foreground mb-3">For Carriers:</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• CVOR status affects operations</li>
                  <li>• High violation rate = audits, restrictions</li>
                  <li>• Unsatisfactory = potential shutdown</li>
                  <li>• Contest violations to protect standing</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-red-800 mb-2">Don't Just Pay</h4>
              <p className="text-red-900 text-sm">For commercial drivers, paying a ticket = automatic conviction = CVOR points = career damage. Always contest or negotiate commercial vehicle violations. The stakes are too high to just pay.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Commercial Vehicle FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Commercial Vehicle Ticket?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Your career and CVOR are at stake. Let me protect them.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.traffic} />
      </ServicePageLayout>
    </>
  );
}
