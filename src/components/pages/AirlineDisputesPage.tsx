import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Clock, Shield, Scale, Phone, Plane, Luggage, Ban, DollarSign, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function AirlineDisputesPage() {
  const authorityItems = [
    { title: 'Air Passenger Protection Regulations', description: 'I know the APPR inside and out. Airlines count on passengers not knowing their rights—I make sure they pay what they owe.' },
    { title: 'CTA Complaint Process', description: 'When airlines ignore or deny your claim, I file formal complaints with the Canadian Transportation Agency and fight for your compensation.' },
    { title: 'No Win, No Fee Available', description: 'Many airline compensation cases are handled on contingency. If the airline doesn\'t pay, you don\'t pay.' }
  ];

  const processSteps = [
    { step: '1', title: 'Review Your Situation', description: 'Send us your flight details, boarding passes, and any correspondence with the airline. We assess your claim.' },
    { step: '2', title: 'Demand to the Airline', description: 'We submit a formal written demand citing the specific APPR provisions the airline violated and the compensation owed.' },
    { step: '3', title: 'CTA Complaint if Needed', description: 'If the airline refuses or ignores us, we file a formal complaint with the Canadian Transportation Agency for a binding decision.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'It\'s the Law', description: 'Airlines are legally required to compensate you under the APPR. This isn\'t optional for them.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'You Have 1 Year to Claim', description: 'You can file a compensation claim up to 1 year after the incident.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Fixed Amounts — No Negotiation', description: 'Compensation amounts are set by regulation. The airline can\'t lowball you.' }
  ];

  const honestFAQs = [
    { question: "What compensation am I entitled to for a flight delay?", answer: "It depends on how late you arrive at your final destination and the size of the airline. For large airlines (Air Canada, WestJet, Porter, Flair, etc.): $400 for 3-6 hours late, $700 for 6-9 hours late, $1,000 for 9+ hours late. For small airlines: $125, $250, and $500 respectively. These are fixed amounts set by the APPR — the airline cannot offer you less." },
    { question: "The airline says my delay was due to 'weather' or 'safety' — do I still get compensated?", answer: "Not always. Airlines love blaming weather and safety because it exempts them from paying compensation. But they must prove it. Many airlines falsely claim safety or weather when the real reason was crew scheduling, mechanical issues they should have caught, or operational decisions. We investigate and challenge false claims." },
    { question: "My flight was cancelled and they rebooked me the next day — what am I owed?", answer: "If you arrived 3+ hours late at your final destination and the cancellation was within the airline's control: full compensation ($400-$1,000 depending on delay length), meals and refreshments while waiting, hotel accommodation if overnight, and transportation to/from the hotel. If you choose a refund instead of rebooking, you're still owed $400 minimum." },
    { question: "The airline lost my luggage — what can I claim?", answer: "Under the Montreal Convention, airlines are liable for up to approximately $2,900 CAD for lost, damaged, or delayed baggage. For delayed bags, you can claim reimbursement for essential items you had to purchase. You must report damaged baggage within 7 days and delayed baggage within 21 days." },
    { question: "I got bumped from my flight — what are my rights?", answer: "Denied boarding compensation is the highest under the APPR. If bumped involuntarily from an overbooked flight: $900 if you arrive less than 6 hours late, $1,800 for 6-9 hours late, $2,400 for 9+ hours late. The airline must pay within 48 hours — no formal claim needed. Plus rebooking or refund, and meals/hotel if applicable." },
    { question: "How long does the CTA complaint process take?", answer: "The CTA is currently experiencing a massive backlog — expect 18-24+ months for a decision. However, many airlines settle once a formal CTA complaint is filed because they know the decision will go against them. Having professional representation significantly increases the chance of a quick settlement." }
  ];

  return (
    <>
      <SEO title="Airline Disputes & Compensation Claims | Flight Delay, Cancellation, Lost Baggage | Ontario" description="Fight airline compensation denials. Flight delays, cancellations, denied boarding, lost luggage. We know the APPR and fight the CTA process for you. Free consultation." canonical="https://www.legalassist.london/services/airline-disputes" />
      <ServicePageLayout seoTitle="Airline Disputes & Compensation Claims" seoDescription="Fight airline compensation denials in Ontario." canonical="https://www.legalassist.london/services/airline-disputes" problemHeadline="Airline Screwed You Over? Fight Back." problemDescription="Airlines deny compensation claims every day — banking on the fact that most passengers don't know their rights or won't bother fighting. The Air Passenger Protection Regulations (APPR) say they owe you money. We make them pay." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Airline disputes and compensation claims" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>

        {/* Compensation Amounts Table */}
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-3">What Airlines Owe You</h2>
            <p className="font-paragraph text-lg text-foreground/70 mb-8">These are fixed amounts set by Canadian law. The airline cannot negotiate lower.</p>

            {/* Flight Delay/Cancellation Compensation */}
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Plane className="w-6 h-6 text-primary" /> Flight Delay & Cancellation Compensation
            </h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Arrival Delay</th>
                    <th className="px-6 py-4 text-center font-heading">Large Airlines<br /><span className="text-xs font-normal opacity-80">Air Canada, WestJet, Porter, Flair, Sunwing</span></th>
                    <th className="px-6 py-4 text-center font-heading">Small Airlines</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-6 py-4 font-medium">3 to 6 hours late</td>
                    <td className="px-6 py-4 text-center text-2xl font-bold text-green-700">$400</td>
                    <td className="px-6 py-4 text-center text-2xl font-bold text-green-700">$125</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium">6 to 9 hours late</td>
                    <td className="px-6 py-4 text-center text-2xl font-bold text-green-700">$700</td>
                    <td className="px-6 py-4 text-center text-2xl font-bold text-green-700">$250</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">9+ hours late</td>
                    <td className="px-6 py-4 text-center text-3xl font-bold text-green-700">$1,000</td>
                    <td className="px-6 py-4 text-center text-2xl font-bold text-green-700">$500</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Denied Boarding Compensation */}
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Ban className="w-6 h-6 text-red-600" /> Denied Boarding (Bumped) Compensation
            </h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-red-700 text-white">
                    <th className="px-6 py-4 text-left font-heading">Arrival Delay</th>
                    <th className="px-6 py-4 text-center font-heading">Minimum Compensation</th>
                    <th className="px-6 py-4 text-center font-heading">Payment Deadline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-red-50">
                    <td className="px-6 py-4 font-medium">Less than 6 hours late</td>
                    <td className="px-6 py-4 text-center text-2xl font-bold text-red-700">$900</td>
                    <td className="px-6 py-4 text-center text-sm">Within 48 hours</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">6 to 9 hours late</td>
                    <td className="px-6 py-4 text-center text-2xl font-bold text-red-700">$1,800</td>
                    <td className="px-6 py-4 text-center text-sm">Within 48 hours</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="px-6 py-4 font-medium">9+ hours late</td>
                    <td className="px-6 py-4 text-center text-3xl font-bold text-red-700">$2,400</td>
                    <td className="px-6 py-4 text-center text-sm">Within 48 hours</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-12">
              <h4 className="font-heading text-lg font-bold text-red-800 mb-2">Airlines Must Pay Denied Boarding Compensation Immediately</h4>
              <p className="text-red-900">Unlike delay compensation, denied boarding compensation must be paid within 48 hours — the airline doesn&apos;t even need to receive a formal claim. If they bumped you, they owe you. Period.</p>
            </div>

            {/* Baggage Compensation */}
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Luggage className="w-6 h-6 text-primary" /> Lost, Delayed & Damaged Baggage
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white border-2 border-primary/20 rounded-xl p-6 text-center">
                <h4 className="font-heading text-lg font-bold text-foreground mb-2">Lost Baggage</h4>
                <p className="text-3xl font-bold text-primary mb-2">Up to ~$2,900</p>
                <p className="text-sm text-foreground/70">Under the Montreal Convention (1,519 SDR). Covers the value of your belongings.</p>
              </div>
              <div className="bg-white border-2 border-primary/20 rounded-xl p-6 text-center">
                <h4 className="font-heading text-lg font-bold text-foreground mb-2">Delayed Baggage</h4>
                <p className="text-3xl font-bold text-primary mb-2">Essential Items</p>
                <p className="text-sm text-foreground/70">Reimbursement for toiletries, clothing, and necessities purchased while waiting. Keep all receipts.</p>
              </div>
              <div className="bg-white border-2 border-primary/20 rounded-xl p-6 text-center">
                <h4 className="font-heading text-lg font-bold text-foreground mb-2">Damaged Baggage</h4>
                <p className="text-3xl font-bold text-primary mb-2">Repair or Replace</p>
                <p className="text-sm text-foreground/70">Airline must repair or compensate for damage. Report within 7 days of receiving your bag.</p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-12">
              <h4 className="font-heading text-lg font-bold text-yellow-800 mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5" /> Critical Deadlines for Baggage Claims
              </h4>
              <div className="grid md:grid-cols-3 gap-4 mt-3">
                <div className="text-yellow-900">
                  <p className="font-bold">Damaged Baggage</p>
                  <p className="text-sm">Report within <strong>7 days</strong> of receiving it</p>
                </div>
                <div className="text-yellow-900">
                  <p className="font-bold">Delayed Baggage</p>
                  <p className="text-sm">Claim within <strong>21 days</strong> of receiving it</p>
                </div>
                <div className="text-yellow-900">
                  <p className="font-bold">Lost Baggage</p>
                  <p className="text-sm">Considered lost after <strong>21 days</strong> — file claim immediately</p>
                </div>
              </div>
            </div>

            {/* What Airlines Must Provide While You Wait */}
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" /> What Airlines Must Provide While You Wait
            </h3>
            <p className="font-paragraph text-foreground/70 mb-4">In addition to compensation, airlines must provide the following during delays within their control:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                <h4 className="font-bold text-green-800 mb-3">During Any Delay</h4>
                <ul className="text-green-900 text-sm space-y-2">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> Regular status updates every 30 minutes</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> Rebooking on the next available flight (any airline)</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> Refund option if rebooking doesn&apos;t work for you</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                <h4 className="font-bold text-green-800 mb-3">After 2+ Hours</h4>
                <ul className="text-green-900 text-sm space-y-2">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> Food and drink (vouchers or reimbursement)</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> Wi-Fi or means to communicate</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> Hotel accommodation if overnight delay</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> Transportation to/from hotel</li>
                </ul>
              </div>
            </div>

            {/* Tarmac Delays */}
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Tarmac Delays</h3>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
              <p className="text-blue-900 mb-3">If your plane is stuck on the tarmac, the airline must provide:</p>
              <ul className="text-blue-900 text-sm space-y-1 mb-3">
                <li>&bull; Food, drink, and functioning washrooms</li>
                <li>&bull; Proper ventilation, heating, or cooling</li>
                <li>&bull; Means to communicate with people outside the plane</li>
              </ul>
              <p className="text-blue-900 font-bold">After 3 hours on the tarmac, the airline must let you off the plane — unless prevented by safety, security, customs, or air traffic control. They get 45 extra minutes only if takeoff is imminent.</p>
            </div>
          </div>
        </div>

        {/* Why Airlines Deny Claims */}
        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-3">How Airlines Dodge Paying You</h2>
            <p className="font-paragraph text-lg text-foreground/70 mb-8">Airlines have a playbook of excuses. Here are the most common ones — and why they often don&apos;t hold up.</p>

            <div className="space-y-4 mb-8">
              {[
                { excuse: '"It was a safety issue"', reality: 'Airlines love this excuse because safety-related delays are exempt from compensation. But routine mechanical issues that should have been caught during regular maintenance are NOT safety issues — they\'re within the airline\'s control. We challenge this.' },
                { excuse: '"Weather caused the delay"', reality: 'Weather at your airport may have been fine, but the airline blames weather at a connecting airport or the previous flight. Often the real reason is crew scheduling or aircraft positioning. We verify actual weather conditions and call out false claims.' },
                { excuse: '"We offered you a voucher"', reality: 'A $50 meal voucher is not compensation. The APPR requires fixed monetary compensation ($400-$2,400) paid in cash, not travel credits or vouchers. You can accept a voucher as a gesture, but you\'re still owed the full APPR amount.' },
                { excuse: '"You need to fill out this form / call this number / wait 90 days"', reality: 'Airlines create deliberately confusing processes, bury claim forms, and stall for months hoping you\'ll give up. The APPR is clear: you submit a written claim, and they must respond. We cut through the runaround.' },
                { excuse: '"The delay was less than 3 hours"', reality: 'Airlines measure delay at arrival, not departure. Sometimes they claim a shorter delay than what actually occurred. We verify actual gate arrival times against scheduled times.' },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg border border-border overflow-hidden">
                  <div className="bg-red-50 px-6 py-3 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <h4 className="font-heading text-base font-bold text-red-800">Airline Says: {item.excuse}</h4>
                  </div>
                  <div className="bg-green-50 px-6 py-3 flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="font-paragraph text-sm text-green-900">{item.reality}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The CTA Process */}
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-3">The CTA Complaint Process</h2>
            <p className="font-paragraph text-lg text-foreground/70 mb-8">If the airline ignores or denies your claim, you can file a complaint with the Canadian Transportation Agency (CTA). Here&apos;s how it works.</p>

            <div className="space-y-4 mb-8">
              {[
                { step: '1', title: 'Claim to the Airline First', desc: 'You must submit a written claim directly to the airline and wait 30 days for a response before escalating to the CTA. Keep copies of everything you send.' },
                { step: '2', title: 'File CTA Complaint', desc: 'If the airline doesn\'t respond in 30 days, denies your claim, or offers less than you\'re owed, file a complaint through the CTA\'s online portal. Include all documentation: boarding passes, booking confirmations, airline correspondence, receipts.' },
                { step: '3', title: 'Complaints Resolution', desc: 'A CTA Complaints Resolution Officer reviews both sides and issues a binding decision. The officer determines if the airline met its obligations and orders a remedy if not.' },
                { step: '4', title: 'Decision & Payment', desc: 'The CTA decision is confidential and binding. If the airline is found to have violated the APPR, they must pay the ordered compensation. Airlines that don\'t comply face enforcement action.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 bg-gray-50 rounded-lg p-5">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-lg">{item.step}</div>
                  <div>
                    <h4 className="font-heading text-base font-bold text-foreground mb-1">{item.title}</h4>
                    <p className="font-paragraph text-sm text-foreground/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-heading text-lg font-bold text-yellow-800 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> CTA Backlog Warning
              </h4>
              <p className="text-yellow-900">The CTA currently has a massive backlog of airline complaints — decisions can take 18-24+ months. However, many airlines settle quickly once a formal CTA complaint is filed with professional representation, because they know the decision will go against them. Having a paralegal file your complaint signals to the airline that you&apos;re serious.</p>
            </div>
          </div>
        </div>

        {/* When You Have a Claim */}
        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">What to Save If Your Flight Goes Wrong</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Boarding passes (paper or digital screenshots)',
                'Booking confirmation and itinerary',
                'Any emails or texts from the airline about the delay/cancellation',
                'Photos of departure/arrival boards showing actual times',
                'Receipts for meals, hotel, transportation, clothing, toiletries',
                'Baggage claim tags and property irregularity report (PIR)',
                'Names of airline staff who gave you information',
                'Screenshots of the airline\'s claim form or denial email',
                'Record of actual departure and arrival times (FlightAware, etc.)',
                'Any vouchers or credits the airline offered (accepting these doesn\'t waive your APPR rights)',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-lg border border-border">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="font-paragraph text-sm text-foreground/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Airline Compensation FAQs</h2>
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
            <Plane className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Airline Owes You Money?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-3 max-w-2xl mx-auto">Don&apos;t let the airline keep what&apos;s yours. Free consultation — we&apos;ll tell you exactly what you&apos;re owed in 5 minutes.</p>
            <p className="font-paragraph text-sm text-foreground/60 mb-8">No win, no fee available &bull; Claims up to $2,400 per passenger</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get Your Compensation</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.smallClaims} />
      </ServicePageLayout>
    </>
  );
}
