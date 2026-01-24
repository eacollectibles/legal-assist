import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Car, Shield, Eye, Scale } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FollowingTooCloselyPage() {
  const authorityItems = [
    { title: 'Tailgating Defence', description: 'Following too closely (tailgating) carries 4 demerit points—same as 30+ over speeding. Worth fighting.' },
    { title: 'Subjective Charge', description: 'Unlike speeding, there\'s no radar reading. Officer judgment and estimation—more room for defence.' },
    { title: 'Often After Accidents', description: 'Frequently charged after rear-end collisions. Defence can include challenging assumptions and circumstances.' }
  ];

  const processSteps = [
    { step: '1', title: 'Get Disclosure', description: 'Officer notes, any video, accident report.' },
    { step: '2', title: 'Analyze Circumstances', description: 'Was following distance actually unsafe?' },
    { step: '3', title: 'Challenge or Negotiate', description: 'Trial defence or reduced charge.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Subjective Judgment', description: 'No device reading—officer opinion.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Circumstance Defence', description: 'Traffic conditions, sudden stops.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: '4 Points', description: 'Significant insurance impact.' }
  ];

  const honestFAQs = [
    { question: "What are the penalties for following too closely?", answer: "4 demerit points and a set fine of approximately $110. The 4 points are significant—same as speeding 30-49 km/h over. Insurance impact can be 15-30% increase for 3 years." },
    { question: "How do police determine 'too close'?", answer: "Officer estimation—there's no device measuring following distance. They observe and estimate based on traffic conditions, speed, and spacing. This subjectivity creates defence opportunities." },
    { question: "I got this ticket after a rear-end collision. Can I fight it?", answer: "Yes. A rear-end collision doesn't automatically mean you were following too closely. Consider: did the lead vehicle stop suddenly? Were they cutting in? Were there road conditions? Challenge the assumption that following distance caused the collision." },
    { question: "What's a 'safe' following distance?", answer: "The 2-3 second rule is commonly cited: you should pass a fixed point 2-3 seconds after the car ahead. At 100 km/h, this is about 55-80 meters. But the law says 'reasonable and prudent' given conditions—not a fixed distance." },
    { question: "What defences work for following too closely?", answer: "Officer couldn't accurately estimate distance/time, traffic conditions required closer spacing (merging, heavy traffic), lead vehicle cut in front of you, sudden unexpected stop by lead vehicle, road/weather conditions, or officer's observation point made accurate judgment impossible." },
    { question: "Can this be reduced at early resolution?", answer: "Sometimes. 4-point charges can sometimes be reduced to 3 points or even 0 points (other charge). Always worth trying early resolution before committing to trial, especially if defences are weak." }
  ];

  return (
    <>
      <SEO title="Following Too Closely Defence Paralegal Ontario | Tailgating Ticket" description="Licensed paralegal for following too closely tickets in Ontario. 4 demerit points, tailgating defence. Challenge officer judgment. Free consultation." canonical="https://www.legalassist.london/services/following-too-closely" />
      <ServicePageLayout seoTitle="Following Too Closely | Ontario" seoDescription="Following too closely defence in Ontario." canonical="https://www.legalassist.london/services/following-too-closely" problemHeadline="Following Too Closely" problemDescription="Charged with tailgating? This 4-point charge has significant insurance impact. Unlike speeding, it's based on officer judgment—more room for defence." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Following too closely" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Following Too Closely</h2>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                4 Demerit Points
              </h3>
              <p className="text-yellow-900">Following too closely carries the same points as speeding 30-49 km/h over. This is a serious charge with significant insurance consequences—definitely worth fighting.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Why This Charge is Different</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6">
                <Eye className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Speeding:</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Radar/laser gives exact reading</li>
                  <li>• Device calibration records exist</li>
                  <li>• Objective measurement</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <Shield className="w-8 h-8 text-green-600 mb-3" />
                <h4 className="font-bold text-green-800 mb-2">Following Too Closely:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• No measuring device</li>
                  <li>• Officer visual estimate only</li>
                  <li>• Subjective judgment</li>
                  <li>• More room for defence</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Defence Strategies</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-12">
              <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
              <h4 className="font-bold text-green-800 mb-2">Potential Defences:</h4>
              <ul className="text-green-900 text-sm space-y-2">
                <li>✓ Officer couldn't accurately judge distance from observation point</li>
                <li>✓ Traffic conditions required closer spacing (merging, congestion)</li>
                <li>✓ Lead vehicle cut in front of you (not your fault)</li>
                <li>✓ Lead vehicle made sudden unexpected stop</li>
                <li>✓ Road conditions (construction, lane closure) compressed traffic</li>
                <li>✓ Speed differential not accounted for (you were slowing)</li>
                <li>✓ Inconsistencies in officer's notes</li>
              </ul>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">After a Rear-End Collision</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-8">
              <Car className="w-8 h-8 text-primary mb-3" />
              <p className="text-foreground/80 mb-4">Following too closely is often charged after rear-end collisions. But a collision doesn't automatically prove you were following too closely:</p>
              <ul className="text-foreground/80 text-sm space-y-2">
                <li>• Did the lead vehicle stop suddenly without warning?</li>
                <li>• Did another vehicle cut between you?</li>
                <li>• Were there road hazards?</li>
                <li>• Was the lead vehicle's brake lights working?</li>
              </ul>
              <p className="text-foreground/70 text-sm mt-4">Challenge the assumption that following distance caused the collision.</p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Worth Fighting?</h4>
              <p className="text-yellow-900 text-sm">At 4 points, almost always yes. The insurance impact over 3 years typically exceeds paralegal fees. Even reducing to a 3-point or 0-point charge saves money.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Following Too Closely FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Got a Tailgating Ticket?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">4 points is too many to just pay. Let me review your case.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.traffic} />
      </ServicePageLayout>
    </>
  );
}
