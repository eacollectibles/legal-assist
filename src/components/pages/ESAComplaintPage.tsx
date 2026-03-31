import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, FileText, DollarSign, Scale, Clock } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ESAComplaintPage() {
  const authorityItems = [
    { title: 'Ministry of Labour Complaints', description: 'Employer violating your rights? The Ministry of Labour can investigate ESA violations and order your employer to pay what\'s owed.' },
    { title: 'Free Process', description: 'MOL complaints are free to file. The Ministry investigates and can order payment without you needing to go to court.' },
    { title: '$15,000 Limit', description: 'MOL can order up to $15,000 in unpaid wages. For larger amounts, you\'ll need civil court—but MOL is faster and free.' }
  ];

  const processSteps = [
    { step: '1', title: 'File Complaint', description: 'Online or by phone with MOL.' },
    { step: '2', title: 'Investigation', description: 'Employment Standards Officer investigates.' },
    { step: '3', title: 'Order Issued', description: 'MOL orders payment or dismisses.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Free to File', description: 'No cost to you.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'They Investigate', description: 'MOL does the work.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: '$15K Limit', description: 'Court for larger amounts.' }
  ];

  const honestFAQs = [
    { question: "What can I complain to the Ministry of Labour about?", answer: "ESA violations: unpaid wages, overtime, vacation pay, public holiday pay, termination pay, severance pay. Also: hours of work violations, leave denials, reprisal for asserting ESA rights. NOT covered: wrongful dismissal damages (that's civil court), human rights (that's HRTO)." },
    { question: "How long do I have to file an MOL complaint?", answer: "Generally 2 years from when wages were due or violation occurred. But file as soon as possible—evidence gets stale, employers may become harder to collect from, and you want your money sooner." },
    { question: "What happens after I file?", answer: "An Employment Standards Officer is assigned. They may: try to mediate settlement, investigate by contacting your employer, review records, and interview parties. Then they issue an order (to pay) or refuse the claim." },
    { question: "My claim is over $15,000. What do I do?", answer: "MOL can only order up to $15,000. For amounts over that, you need to go to civil court (Small Claims up to $35,000). You can file MOL complaint for $15K AND sue for the rest, or just sue for everything. Get advice on best approach." },
    { question: "Can I file MOL complaint AND sue my employer?", answer: "Generally you must choose one path for the same wages. But: you can file MOL for ESA minimums and sue for additional damages (like common law notice). Strategy depends on your situation—get advice." },
    { question: "What if my employer ignores the MOL order?", answer: "If employer doesn't pay the order, MOL can: file the order with court (becomes enforceable judgment), suspend business licences, add the employer to public 'wall of shame,' and pursue collection. They have enforcement tools." }
  ];

  return (
    <>
      <SEO title="Ministry of Labour Complaint Paralegal Ontario | ESA Complaint" description="File a Ministry of Labour complaint in Ontario? ESA violations, unpaid wages, overtime. Free process, $15K limit. Paralegal help. Free consultation." canonical="https://www.legalassist.london/services/esa-complaint" />
      <ServicePageLayout seoTitle="Ministry of Labour Complaints | Ontario" seoDescription="MOL complaint help in Ontario." canonical="https://www.legalassist.london/services/esa-complaint" problemHeadline="Ministry of Labour Complaints" problemDescription="Employer not paying you properly? The Ministry of Labour can investigate ESA violations and order payment—free to file, no court required." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "MOL complaint" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding MOL Complaints</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What MOL Can Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">MOL Handles:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Unpaid wages</li>
                  <li>• Overtime pay violations</li>
                  <li>• Vacation pay</li>
                  <li>• Public holiday pay</li>
                  <li>• Termination pay (ESA minimum)</li>
                  <li>• Severance pay</li>
                  <li>• Hours of work violations</li>
                  <li>• Leave denials</li>
                  <li>• Reprisal for ESA complaints</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">MOL Does NOT Handle:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Wrongful dismissal (common law damages)</li>
                  <li>• Human rights discrimination (→ HRTO)</li>
                  <li>• Workplace harassment (→ OHSA/HRTO)</li>
                  <li>• Constructive dismissal</li>
                  <li>• Amounts over $15,000</li>
                  <li>• Unjust dismissal (federal → Labour Board)</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">MOL vs Civil Court</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Factor</th>
                    <th className="px-6 py-4 text-left font-heading">MOL Complaint</th>
                    <th className="px-6 py-4 text-left font-heading">Civil Court</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">Cost to file</td><td className="px-6 py-4 text-green-700 font-bold">Free</td><td className="px-6 py-4">$102-$275</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Maximum recovery</td><td className="px-6 py-4">$15,000</td><td className="px-6 py-4 text-green-700 font-bold">$35,000 (Small Claims)</td></tr>
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">Who investigates</td><td className="px-6 py-4 text-green-700 font-bold">MOL Officer</td><td className="px-6 py-4">You (with evidence)</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Timeline</td><td className="px-6 py-4">Several months</td><td className="px-6 py-4">6-12+ months</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Common law damages</td><td className="px-6 py-4 text-red-700">No</td><td className="px-6 py-4 text-green-700 font-bold">Yes</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Strategic Choice</h4>
              <p className="text-yellow-900 text-sm">For simple wage claims under $15K, MOL is often best (free, they investigate). For larger amounts or claims beyond ESA minimums (wrongful dismissal damages), civil court may be necessary. Sometimes both paths together make sense. Get advice on your specific situation.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">MOL Complaint FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Employer Not Paying You?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let me help you file an MOL complaint or assess your best path.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.employment} />
      </ServicePageLayout>
    </>
  );
}
