import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Camera, Car, DollarSign, Shield } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function RedLightCameraPage() {
  const authorityItems = [
    { title: 'Red Light Camera Defence', description: 'Red light camera tickets are issued to the vehicle owner, not the driver. This creates defence opportunities.' },
    { title: 'No Demerit Points', description: 'Unlike police-issued tickets, camera tickets don\'t carry demerit points. But they still affect your record.' },
    { title: 'Technical Defences', description: 'Camera calibration, signage, timing, and identification issues can all be challenged.' }
  ];

  const processSteps = [
    { step: '1', title: 'Review Evidence', description: 'Request photos and technical data from prosecution.' },
    { step: '2', title: 'Identify Issues', description: 'Calibration, signage, yellow light timing, identification.' },
    { step: '3', title: 'Challenge or Pay', description: 'Fight on technical grounds or pay (no points).' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'No Points', description: 'Camera tickets don\'t add demerit points.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Owner Liability', description: 'Defence: you weren\'t driving.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Still Matters', description: 'Can affect insurance if pattern emerges.' }
  ];

  const honestFAQs = [
    { question: "Do red light camera tickets have demerit points?", answer: "No. Camera-issued tickets are processed as owner liability—no points. However, if a police officer issues a red light ticket (they witnessed it), that's 3 points. Know which type you have." },
    { question: "The ticket went to me but I wasn't driving. What do I do?", answer: "You can complete a statutory declaration naming the driver, and the ticket transfers to them. If you can't identify the driver, you may still be liable as owner. Some people choose to pay rather than involve others." },
    { question: "What defences work for red light camera tickets?", answer: "Yellow light timing (was it adequate for speed limit?), camera calibration/certification issues, unclear photos (can't confirm it was that vehicle), signage problems, emergency circumstances. Technical defences require disclosure of camera data." },
    { question: "Is it worth fighting a camera ticket with no points?", answer: "Depends. The fine is typically $325. If you have strong technical defence, yes. If not, the time and effort may not be worth it. Consider: multiple camera tickets can affect insurance even without points." },
    { question: "What about the amber light timing?", answer: "Ontario requires minimum amber light duration based on speed limit. If the amber was too short, this is a valid defence. Request disclosure including amber timing records. This requires technical analysis." },
    { question: "Will this affect my insurance?", answer: "Usually not for a single camera ticket (no points). However, multiple convictions or a pattern of tickets can affect your risk profile. Insurance companies are increasingly accessing driving abstracts comprehensively." }
  ];

  return (
    <>
      <SEO title="Red Light Camera Ticket Paralegal Ontario | Camera Ticket Defence" description="Licensed paralegal defending red light camera tickets in Ontario. No demerit points, technical defences. Free consultation." canonical="https://www.legalassist.london/services/red-light-camera" />
      <ServicePageLayout seoTitle="Red Light Camera Tickets | Ontario" seoDescription="Red light camera ticket defence in Ontario." canonical="https://www.legalassist.london/services/red-light-camera" problemHeadline="Red Light Camera Tickets" problemDescription="Got a red light camera ticket? These don't carry demerit points, but there are still reasons to fight them. I help identify technical defences." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Red light camera" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Red Light Camera Tickets</h2>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Good News: No Demerit Points
              </h3>
              <p className="text-green-900">Unlike police-issued tickets, red light camera tickets are owner liability—no demerit points are assessed. However, the fine is still substantial and the conviction goes on your record.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Camera vs. Police-Issued Tickets</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Type</th>
                    <th className="px-6 py-4 text-center font-heading">Points</th>
                    <th className="px-6 py-4 text-left font-heading">Fine</th>
                    <th className="px-6 py-4 text-left font-heading">Issued To</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Red Light Camera</td><td className="px-6 py-4 text-center text-green-600 font-bold">0</td><td className="px-6 py-4">$325</td><td className="px-6 py-4 text-sm">Registered owner</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Police-Issued</td><td className="px-6 py-4 text-center text-red-600 font-bold">3</td><td className="px-6 py-4">$325</td><td className="px-6 py-4 text-sm">Driver</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Defence Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6">
                <Camera className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Technical Defences:</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Camera calibration issues</li>
                  <li>• Yellow light timing inadequate</li>
                  <li>• Photos unclear or inconclusive</li>
                  <li>• Signage problems</li>
                  <li>• Technical malfunctions</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <Car className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Identity/Circumstance:</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• You weren't driving (name driver)</li>
                  <li>• Emergency circumstances</li>
                  <li>• Avoiding collision</li>
                  <li>• Vehicle stolen at time</li>
                  <li>• Plate recognition error</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Should You Fight It?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Consider Fighting If:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• You have technical defence</li>
                  <li>• Someone else was driving</li>
                  <li>• Yellow light seemed short</li>
                  <li>• Photos are unclear</li>
                  <li>• Multiple camera tickets</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">May Not Be Worth It If:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• No clear defence</li>
                  <li>• First and only camera ticket</li>
                  <li>• Time off work costs exceed fine</li>
                  <li>• Photos clearly show violation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Red Light Camera FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Got a Camera Ticket?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let me review if there are technical grounds to challenge it.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Case Review</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.traffic} />
      </ServicePageLayout>
    </>
  );
}
