import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, DollarSign, HelpCircle, Gauge, Truck, AlertCircle, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function CommercialVehicleViolationsPage() {
  const authorityItems = [
    { title: 'Commercial Vehicle Expertise', description: 'Commercial vehicle violations have serious consequences for your CVOR, employment, and livelihood. I understand the unique stakes.' },
    { title: 'CVOR Protection', description: 'Every conviction affects your carrier\'s safety rating. I fight to protect your CVOR standing and keep you on the road.' },
    { title: 'Employment Focus', description: 'Your CDL is your livelihood. I prioritize outcomes that protect your ability to work.' }
  ];

  const processSteps = [
    { step: '1', title: 'Violation Analysis', description: 'Review the charge, CVOR implications, and potential employment impact.' },
    { step: '2', title: 'Defence Strategy', description: 'Develop defence focused on protecting your commercial driving privileges.' },
    { step: '3', title: 'Court Representation', description: 'Handle all appearances with focus on minimizing CVOR points.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'CVOR Understanding', description: 'I know how convictions affect carrier safety ratings.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Employment Protection', description: 'Strategies aimed at keeping you working.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Full Representation', description: 'You don\'t miss work for court appearances.' }
  ];

  const honestFAQs = [
    { question: "What happens if I get convicted as a commercial driver?", answer: "Three impacts: 1) Demerit points on your personal licence, 2) CVOR points against your carrier's safety rating, 3) Potential employment consequences. Major carriers track all violations and may terminate employment for serious convictions." },
    { question: "What violations are most serious for commercial drivers?", answer: "Speeding, log book violations, hours of service, overweight loads, brake and mechanical defects, dangerous goods violations, and stunt driving are most serious. Even 'minor' violations accumulate and can trigger MTO audits." },
    { question: "How does CVOR work?", answer: "Commercial Vehicle Operator's Registration tracks all violations for your carrier. Points accumulate based on violation severity. Too many points trigger MTO facility audits, increased inspections, or operating authority suspension. Every conviction adds points." },
    { question: "Can commercial vehicle violations be reduced?", answer: "Yes, and it's often more important for commercial drivers than anyone else. Reducing a 4-point to a 2-point violation, or getting a withdrawal, significantly impacts CVOR and employment. Clean driving record helps negotiation." },
    { question: "What about out-of-province violations?", answer: "Ontario gets notified of convictions from other provinces. They appear on your driving record and can affect your commercial privileges. Worth fighting even if the ticket is far away." },
    { question: "Will my employer find out?", answer: "Likely yes. Many carriers run regular driver abstract checks. Serious violations may require immediate reporting under employment agreements. Better to fight and get a reduction than accept a conviction." }
  ];

  return (
    <>
      <SEO title="Commercial Vehicle Violation Defence | Truck Driver Tickets | Ontario" description="Licensed paralegal defending commercial vehicle violations in Ontario. CVOR protection, CDL defence, employment preservation. Log book, speeding, overweight. Free consultation." canonical="https://www.legalassist.london/services/commercial-vehicle-violations" />
      <ServicePageLayout seoTitle="Commercial Vehicle Violation Defence | Ontario" seoDescription="Defending commercial vehicle violations in Ontario." canonical="https://www.legalassist.london/services/commercial-vehicle-violations" problemHeadline="Commercial Vehicle Violation Defence in Ontario" problemDescription="When your CDL is your livelihood, every ticket matters more. CVOR points, employment consequences, and carrier audits make fighting essential—not optional." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Commercial vehicle violation defence" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Why Commercial Drivers Must Fight</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <Truck className="w-6 h-6" />
                Triple Impact
              </h3>
              <p className="text-red-900">Commercial violations hit three ways: demerit points on your licence, CVOR points against your carrier, and potential termination. For commercial drivers, even "minor" tickets can end careers.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-red-50 rounded-lg p-6 border border-red-200 text-center">
                <Gauge className="w-10 h-10 text-red-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-red-700 mb-2">Personal</div>
                <p className="text-red-800 font-medium">Demerit Points</p>
                <p className="text-sm text-red-700 mt-1">On your licence</p>
              </div>
              <div className="bg-red-50 rounded-lg p-6 border border-red-200 text-center">
                <FileText className="w-10 h-10 text-red-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-red-700 mb-2">CVOR</div>
                <p className="text-red-800 font-medium">Carrier Points</p>
                <p className="text-sm text-red-700 mt-1">Against employer</p>
              </div>
              <div className="bg-red-50 rounded-lg p-6 border border-red-200 text-center">
                <AlertCircle className="w-10 h-10 text-red-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-red-700 mb-2">Job</div>
                <p className="text-red-800 font-medium">Employment Risk</p>
                <p className="text-sm text-red-700 mt-1">Termination possible</p>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Commercial Violations</h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Violation</th>
                    <th className="px-6 py-4 text-center font-heading">Points</th>
                    <th className="px-6 py-4 text-center font-heading">Employment Risk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4">Speeding (16-29 km/h)</td><td className="px-6 py-4 text-center font-bold">3</td><td className="px-6 py-4 text-center text-yellow-600">Moderate</td></tr>
                  <tr><td className="px-6 py-4">Speeding (30-49 km/h)</td><td className="px-6 py-4 text-center font-bold">4</td><td className="px-6 py-4 text-center text-red-600">High</td></tr>
                  <tr><td className="px-6 py-4">Log book violation</td><td className="px-6 py-4 text-center font-bold">0-3</td><td className="px-6 py-4 text-center text-yellow-600">Moderate</td></tr>
                  <tr><td className="px-6 py-4">Hours of service</td><td className="px-6 py-4 text-center font-bold">3</td><td className="px-6 py-4 text-center text-red-600">High</td></tr>
                  <tr><td className="px-6 py-4">Overweight</td><td className="px-6 py-4 text-center font-bold">0</td><td className="px-6 py-4 text-center text-yellow-600">Moderate (high fine)</td></tr>
                  <tr><td className="px-6 py-4">Brake/mechanical defect</td><td className="px-6 py-4 text-center font-bold">0-3</td><td className="px-6 py-4 text-center text-red-600">High</td></tr>
                  <tr><td className="px-6 py-4">Stunt driving (50+ over)</td><td className="px-6 py-4 text-center font-bold">6</td><td className="px-6 py-4 text-center text-red-600">Severe—likely termination</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Should You Fight?</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
              <h4 className="font-bold text-green-800 mb-2">Almost Always Yes Because:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-900 text-sm">
                <ul className="space-y-1">
                  <li>• Your livelihood depends on your licence</li>
                  <li>• CVOR points affect your carrier</li>
                  <li>• Employers check driving abstracts</li>
                </ul>
                <ul className="space-y-1">
                  <li>• Even reductions help significantly</li>
                  <li>• Insurance rates are already high</li>
                  <li>• Accumulation triggers audits</li>
                </ul>
              </div>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Commercial Vehicle Ticket?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Your CDL is your career. Don't accept a conviction without fighting. Get an honest assessment.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.trafficTickets} />
      </ServicePageLayout>
    </>
  );
}
