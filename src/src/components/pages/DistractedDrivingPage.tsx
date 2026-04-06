import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Smartphone, Car, DollarSign, Shield } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function DistractedDrivingPage() {
  const authorityItems = [
    { title: 'Cell Phone Ticket Defence', description: 'Distracted driving tickets carry serious penalties. I challenge these charges to protect your licence and insurance.' },
    { title: 'High Stakes', description: '3-6 demerit points, substantial fines, and massive insurance impact. Worth fighting.' },
    { title: 'Defence Options', description: 'Challenge officer observations, device use definition, or negotiate reduced charges.' }
  ];

  const processSteps = [
    { step: '1', title: 'Review Circumstances', description: 'What were you doing? What did officer observe?' },
    { step: '2', title: 'Build Defence', description: 'Challenge evidence or argue permitted use.' },
    { step: '3', title: 'Trial or Negotiate', description: 'Fight at trial or negotiate reduction.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Defences Exist', description: 'Not all phone use is prohibited.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Evidence Challenges', description: 'Officer must prove device use.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Insurance Hit', description: 'Conviction causes significant increases.' }
  ];

  const honestFAQs = [
    { question: "What are the penalties for distracted driving?", answer: "First offence: $615 set fine (up to $1,000), 3 demerit points. Second offence within 5 years: up to $2,000, 6 points. Third+: up to $3,000, 6 points, possible 30-day suspension. Plus significant insurance increases." },
    { question: "What counts as distracted driving?", answer: "Holding or using a hand-held wireless device to talk, text, email, or view. This includes cell phones, tablets, laptops, GPS devices (if not securely mounted). The device doesn't have to be on—holding it is enough." },
    { question: "What's allowed?", answer: "Hands-free devices, securely mounted devices for GPS, one-touch to activate hands-free, calling 911 in emergency, stopped and pulled off roadway (not just at red light). Using phone while parked safely is fine." },
    { question: "I was just holding my phone, not using it.", answer: "Unfortunately, merely holding a device while driving is prohibited. The officer doesn't need to prove you were texting—holding is enough. However, proving you were 'holding' it requires officer observation, which can be challenged." },
    { question: "Can I use my phone at a red light?", answer: "No. You must be safely pulled over and off the roadway, not just stopped in traffic. Red lights, stop signs, and traffic jams don't count as being parked." },
    { question: "How can these charges be defended?", answer: "Challenge officer's ability to see clearly (distance, traffic, obstructions), argue device was mounted/hands-free, show you were properly parked, challenge timing/location discrepancies in officer's notes." }
  ];

  return (
    <>
      <SEO title="Distracted Driving Defence Paralegal Ontario | Cell Phone Ticket" description="Licensed paralegal defending distracted driving charges in Ontario. Cell phone tickets, hand-held device charges. Protect your licence. Free consultation." canonical="https://www.legalassist.london/services/distracted-driving" />
      <ServicePageLayout seoTitle="Distracted Driving Defence | Ontario" seoDescription="Distracted driving defence in Ontario." canonical="https://www.legalassist.london/services/distracted-driving" problemHeadline="Distracted Driving / Cell Phone" problemDescription="Charged with using your phone while driving? These tickets carry serious penalties and insurance consequences. I help fight them." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Distracted driving" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Distracted Driving Charges</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Penalties by Offence</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Offence</th>
                    <th className="px-6 py-4 text-left font-heading">Fine</th>
                    <th className="px-6 py-4 text-center font-heading">Points</th>
                    <th className="px-6 py-4 text-left font-heading">Suspension</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">First offence</td><td className="px-6 py-4">$615 set ($1,000 max)</td><td className="px-6 py-4 text-center">3</td><td className="px-6 py-4 text-sm">None</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Second (within 5 yrs)</td><td className="px-6 py-4">Up to $2,000</td><td className="px-6 py-4 text-center">6</td><td className="px-6 py-4 text-sm">None</td></tr>
                  <tr className="bg-red-50"><td className="px-6 py-4 font-medium">Third+ (within 5 yrs)</td><td className="px-6 py-4">Up to $3,000</td><td className="px-6 py-4 text-center">6</td><td className="px-6 py-4 text-sm">30 days possible</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What's Prohibited vs. Allowed</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Prohibited:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Holding phone while driving</li>
                  <li>• Texting or emailing</li>
                  <li>• Watching videos</li>
                  <li>• Scrolling through phone</li>
                  <li>• Phone in lap or on thigh</li>
                  <li>• Using phone at red light</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Allowed:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Hands-free phone calls</li>
                  <li>• Securely mounted GPS</li>
                  <li>• One-touch to activate hands-free</li>
                  <li>• Calling 911 (emergency)</li>
                  <li>• Safely pulled over (off roadway)</li>
                  <li>• When properly parked</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Defence Strategies</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-8">
              <h4 className="font-bold text-foreground mb-3">How We Challenge These Tickets:</h4>
              <ul className="text-foreground/80 text-sm space-y-2">
                <li>✓ Officer's viewing angle—could they actually see clearly?</li>
                <li>✓ Distance and traffic conditions</li>
                <li>✓ Challenge identification of device vs. other objects</li>
                <li>✓ Argue device was properly mounted</li>
                <li>✓ Show vehicle was properly parked</li>
                <li>✓ Inconsistencies in officer's notes</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">The Real Cost: Insurance</h4>
              <p className="text-yellow-900 text-sm">A distracted driving conviction can increase your insurance by 25-50% for 3 years. On a $2,000/year policy, that's $1,500-$3,000 extra. Fighting the ticket often costs less than accepting it.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Distracted Driving FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Got a Cell Phone Ticket?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">The insurance impact alone makes these worth fighting. Let me review your options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Case Review</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.traffic} />
      </ServicePageLayout>
    </>
  );
}
