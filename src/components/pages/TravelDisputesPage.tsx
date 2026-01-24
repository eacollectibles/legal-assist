import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Plane, DollarSign, Clock, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function TravelDisputesPage() {
  const authorityItems = [
    { title: 'Travel Disputes', description: 'Flight cancelled? Trip ruined by travel agent? Lost luggage? I help recover compensation in Small Claims Court.' },
    { title: 'Air Passenger Rights', description: 'Canada has Air Passenger Protection Regulations. Airlines owe compensation for delays, cancellations, and bumping.' },
    { title: 'Package Tours', description: 'Tour operators must deliver what they promise. Material changes or failures can justify refunds and damages.' }
  ];

  const processSteps = [
    { step: '1', title: 'Know Your Rights', description: 'APPR sets minimum compensation for air travel.' },
    { step: '2', title: 'Claim from Airline', description: 'File directly first—many pay quickly.' },
    { step: '3', title: 'Court if Refused', description: 'Small Claims for denied valid claims.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Regulatory Rights', description: 'APPR sets minimum compensation.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'No "Safety" Excuse', description: 'Airlines can\'t deny all claims.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Exclusions Exist', description: 'Some situations not covered.' }
  ];

  const honestFAQs = [
    { question: "My flight was cancelled. What am I owed?", answer: "Under APPR: for cancellations within airline control, you're owed rebooking on next available flight AND compensation ($125-$1,000 depending on delay and airline size). Plus: meals, hotel if overnight, and communication. Claim directly from airline first." },
    { question: "The airline says it was 'weather' but other flights left. What now?", answer: "Airlines often over-claim 'weather' or 'safety' exemptions. If other airlines flew the same route, or the weather wasn't actually severe, challenge the denial. Document conditions, other departures, and pursue through Small Claims if needed." },
    { question: "What about flight delays (not cancellation)?", answer: "APPR compensation for delays within airline control: 3-6 hours: $125 (small airline) to $400 (large). 6-9 hours: $250 to $700. 9+ hours: $500 to $1,000. Plus meals/accommodation during delay. Must be departure delay, within airline's control." },
    { question: "My luggage was lost or damaged. What can I recover?", answer: "Airlines must compensate for lost/delayed/damaged bags—up to ~$2,300 CAD under Montreal Convention. Keep receipts for emergency purchases if delayed. For lost bags, claim value of contents. Document everything with photos." },
    { question: "The tour operator changed my trip significantly. Can I get a refund?", answer: "Material changes (different destination, much lower quality hotel, cancelled key activities) may justify full or partial refund. Review contract terms. Document what was promised vs delivered. Tour operators must deliver substantially what they sold." },
    { question: "How do I actually get the airline to pay?", answer: "File complaint on airline's website first—many pay valid claims quickly. If denied, escalate to Canadian Transportation Agency (CTA) complaint—free process. If still denied or too slow, Small Claims Court. Document everything." }
  ];

  return (
    <>
      <SEO title="Travel Disputes Paralegal Ontario | Flight Cancelled Compensation" description="Licensed paralegal for travel disputes in Ontario. Flight cancellation, delay, lost luggage, tour operator problems. APPR compensation. Free consultation." canonical="https://www.legalassist.london/services/travel-disputes" />
      <ServicePageLayout seoTitle="Travel Disputes | Ontario" seoDescription="Travel dispute help in Ontario." canonical="https://www.legalassist.london/services/travel-disputes" problemHeadline="Travel Disputes" problemDescription="Flight cancelled? Trip ruined? Airlines and tour operators owe compensation. I help recover what you're entitled to." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Travel disputes" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Air Passenger Rights (APPR)</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Flight Cancellation/Delay Compensation</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Delay Length</th>
                    <th className="px-6 py-4 text-center font-heading">Large Airline</th>
                    <th className="px-6 py-4 text-center font-heading">Small Airline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">3-6 hours</td><td className="px-6 py-4 text-center">$400</td><td className="px-6 py-4 text-center">$125</td></tr>
                  <tr><td className="px-6 py-4 font-medium">6-9 hours</td><td className="px-6 py-4 text-center">$700</td><td className="px-6 py-4 text-center">$250</td></tr>
                  <tr><td className="px-6 py-4 font-medium">9+ hours</td><td className="px-6 py-4 text-center font-bold text-primary">$1,000</td><td className="px-6 py-4 text-center">$500</td></tr>
                </tbody>
              </table>
              <p className="text-foreground/70 text-sm mt-2">Applies when delay/cancellation is within airline's control. Plus: meals, hotel, rebooking.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What's "Within Airline Control"?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Compensation Owed:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Mechanical/maintenance issues</li>
                  <li>• Crew scheduling problems</li>
                  <li>• Operational decisions</li>
                  <li>• Overbooking</li>
                  <li>• IT system failures</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Exemptions (Maybe):</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Actual severe weather</li>
                  <li>• Air traffic control restrictions</li>
                  <li>• Security threats</li>
                  <li>• Medical emergencies</li>
                  <li>• Required safety repairs discovered</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-12">
              <h4 className="font-bold text-yellow-800 mb-2">Airlines Over-Claim Exemptions</h4>
              <p className="text-yellow-900 text-sm">Airlines frequently claim "weather" or "safety" to avoid paying. If other airlines flew the same route, or the weather wasn't actually severe, challenge the denial. "Safety required" isn't a blanket excuse for poor maintenance planning.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">How to Claim</h3>
            <div className="bg-primary/5 rounded-lg p-6">
              <ol className="text-foreground/80 space-y-3">
                <li><span className="font-bold">1. Airline website:</span> File compensation claim directly. Many pay valid claims within weeks.</li>
                <li><span className="font-bold">2. If denied:</span> File complaint with Canadian Transportation Agency (CTA)—free process.</li>
                <li><span className="font-bold">3. If still refused:</span> Small Claims Court for compensation owed.</li>
              </ol>
              <p className="text-foreground/70 text-sm mt-4">Keep all documentation: boarding pass, delay notices, receipts for expenses, communication with airline.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Travel Dispute FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Travel Compensation Denied?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Airlines don't always follow the rules. Let me assess your claim.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.smallClaims} />
      </ServicePageLayout>
    </>
  );
}
