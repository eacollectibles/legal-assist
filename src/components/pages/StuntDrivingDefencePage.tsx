import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Car, Scale, Clock, Shield } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function StuntDrivingDefencePage() {
  const authorityItems = [
    { title: 'Stunt Driving Defence', description: 'Stunt driving charges carry severe penalties. I fight these charges aggressively to protect your licence and avoid criminal-level consequences.' },
    { title: 'High Stakes Cases', description: 'With potential jail time, 30-day vehicle impound, and 2-year licence suspension, proper defence is critical.' },
    { title: 'Technical Defences', description: 'Radar calibration, speed detection accuracy, and procedural errors can defeat these charges.' }
  ];

  const processSteps = [
    { step: '1', title: 'Evidence Review', description: 'Obtain disclosure, review radar/lidar evidence, check procedures.' },
    { step: '2', title: 'Defence Strategy', description: 'Identify weaknesses—calibration issues, officer errors, speedometer accuracy.' },
    { step: '3', title: 'Court Fight', description: 'Present technical and procedural defences at trial.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Technical Defences', description: 'Speed detection has specific legal requirements.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Reduction Possible', description: 'May negotiate down to lesser speeding offence.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Serious Stakes', description: 'Conviction has severe, long-lasting consequences.' }
  ];

  const honestFAQs = [
    { question: "What is stunt driving in Ontario?", answer: "50+ km/h over the limit (any road), driving 150+ km/h, or 40+ over in zones under 80 km/h. Also includes racing, burnouts, and intentionally losing traction. The threshold changes triggered many more charges." },
    { question: "What are the penalties for stunt driving?", answer: "First offence: $2,000-$10,000 fine, 6 demerit points, 1-3 year licence suspension, 14-day vehicle impound, possible jail. Second offence: even worse. Insurance increases are massive and long-lasting." },
    { question: "Can these charges be beaten?", answer: "Yes—technical defences work: radar/lidar calibration issues, officer qualification, testing procedures, identification errors. But outcomes vary widely. Some cases reduce to lower speeding charges; others get dismissed; some convict." },
    { question: "What's the difference between conviction and guilty plea to lesser offence?", answer: "Stunt driving conviction: minimum 1-year suspension, mandatory fine, insurance devastation. Reduced to regular speeding: much lower fine, fewer points, no suspension, much less insurance impact. The reduction is often the realistic goal." },
    { question: "Should I just plead guilty and take my lumps?", answer: "Rarely—the consequences are too severe. Even if full acquittal is unlikely, negotiating a reduction to regular speeding can save thousands in fines and years of insurance increases. At minimum, get legal advice before deciding." },
    { question: "What about the roadside impound and suspension?", answer: "These are administrative—they happen regardless of whether you're later convicted. However, if you're acquitted or charges reduced, you may be able to appeal administrative suspensions or get records corrected." }
  ];

  return (
    <>
      <SEO title="Stunt Driving Defence Paralegal Ontario | 50 Over Speed" description="Licensed paralegal defending stunt driving charges in Ontario. 50+ over the limit, street racing. Aggressive defence. Free consultation." canonical="https://www.legalassist.london/services/stunt-driving-defence" />
      <ServicePageLayout seoTitle="Stunt Driving Defence | Ontario" seoDescription="Stunt driving charge defence in Ontario." canonical="https://www.legalassist.london/services/stunt-driving-defence" problemHeadline="Stunt Driving Charges" problemDescription="Charged with stunt driving (50+ over)? This is one of the most serious traffic offences in Ontario. You need aggressive defence—the stakes are too high not to fight." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Stunt driving defence" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Stunt Driving</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                These Are Serious Charges
              </h3>
              <p className="text-red-900">Stunt driving is treated almost like a criminal offence. Potential jail time, massive fines, multi-year suspensions, vehicle impound, and insurance impacts that last 6+ years. Don't underestimate these charges.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What Qualifies as Stunt Driving</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Situation</th>
                    <th className="px-6 py-4 text-left font-heading">Stunt Threshold</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Speed limit under 80 km/h</td><td className="px-6 py-4 text-sm">40+ km/h over the limit</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Speed limit 80+ km/h</td><td className="px-6 py-4 text-sm">50+ km/h over the limit</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Any road</td><td className="px-6 py-4 text-sm">150+ km/h regardless of limit</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Other conduct</td><td className="px-6 py-4 text-sm">Racing, burnouts, losing traction intentionally</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Penalties Upon Conviction</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-bold text-red-800 mb-3">First Offence:</h4>
                <ul className="text-red-900 text-sm space-y-2">
                  <li>• Fine: $2,000 - $10,000</li>
                  <li>• Licence suspension: 1-3 years</li>
                  <li>• Vehicle impound: 14 days</li>
                  <li>• 6 demerit points</li>
                  <li>• Possible jail time</li>
                  <li>• Massive insurance increase</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-bold text-red-800 mb-3">Second+ Offence:</h4>
                <ul className="text-red-900 text-sm space-y-2">
                  <li>• Fine: $2,000 - $10,000</li>
                  <li>• Licence suspension: 3-10 years</li>
                  <li>• Vehicle impound: 14+ days</li>
                  <li>• 6 demerit points</li>
                  <li>• Higher jail probability</li>
                  <li>• May become uninsurable</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Defence Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-primary/5 rounded-lg p-6">
                <Scale className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Technical Defences</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Radar/lidar calibration</li>
                  <li>• Officer certification</li>
                  <li>• Testing procedures</li>
                  <li>• Device malfunctions</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <Shield className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Procedural Defences</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Charter rights violations</li>
                  <li>• Identification issues</li>
                  <li>• Disclosure failures</li>
                  <li>• Documentation errors</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <Clock className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Negotiation</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Reduce to regular speeding</li>
                  <li>• Lower speed alleged</li>
                  <li>• First-time consideration</li>
                  <li>• Clean driving record</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Stunt Driving FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Charged with Stunt Driving?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">The stakes are too high not to fight. Let me review your case.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Consultation</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.traffic} />
      </ServicePageLayout>
    </>
  );
}
