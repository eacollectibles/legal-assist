import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Car, Scale, Shield, AlertCircle } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ImpairedDrivingDefencePage() {
  const authorityItems = [
    { title: 'Impaired Driving Support', description: 'Impaired driving charges are criminal matters. While lawyers handle criminal defence, I can help with related administrative and POA matters.' },
    { title: 'Administrative Suspensions', description: '90-day administrative licence suspensions can sometimes be challenged. I help navigate these proceedings.' },
    { title: 'Related POA Charges', description: 'Sometimes impaired charges come with related provincial offences that I can defend.' }
  ];

  const processSteps = [
    { step: '1', title: 'Understand Charges', description: 'Determine if charges are criminal (lawyer needed) or POA (paralegal can help).' },
    { step: '2', title: 'Immediate Steps', description: 'Address administrative suspension, find criminal counsel if needed.' },
    { step: '3', title: 'Coordinate Defence', description: 'Handle POA matters while criminal counsel handles main charge.' }
  ];

  const reassuranceItems = [
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Criminal Charges', description: 'Main impaired charges need a criminal lawyer.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Admin Suspensions', description: 'Paralegal can help with administrative matters.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Related Offences', description: 'Can defend provincial offences issued alongside.' }
  ];

  const honestFAQs = [
    { question: "Can a paralegal defend impaired driving charges?", answer: "No—impaired driving under the Criminal Code requires a lawyer. However, I can help with: administrative licence suspensions (ALS), related provincial offences, and navigating the overall process while you find criminal counsel." },
    { question: "What's the difference between criminal impaired and 'warn range'?", answer: "Criminal impaired (0.08+ or over 80mg) is Criminal Code offence—potential jail, criminal record, long suspension. 'Warn range' (0.05-0.079) is provincial—administrative suspension, no criminal record. Warn range matters I CAN help with." },
    { question: "What happens to my licence immediately?", answer: "For criminal charges: 90-day administrative suspension starts immediately, regardless of court outcome. For warn range: 3-day suspension first offence, 7 days second, 30 days third. These can sometimes be challenged." },
    { question: "What are the penalties for impaired driving conviction?", answer: "First offence: minimum $1,000 fine, 1-year driving prohibition, criminal record. Second: minimum 30 days jail, 2-year prohibition. Third: minimum 120 days jail, 3-year prohibition. These are MINIMUM—actual penalties often higher." },
    { question: "What about my car?", answer: "Vehicle impoundment: 7 days for criminal impaired, 3 days for warn range first offence (7 days second, 30 days third). You pay towing and storage costs." },
    { question: "How do I find a good criminal lawyer?", answer: "Look for lawyers who specialize in impaired driving defence—this is a technical area. I can provide referrals to criminal counsel I've worked with while helping you with the administrative side." }
  ];

  return (
    <>
      <SEO title="Impaired Driving Information Ontario | DUI Help" description="Information about impaired driving charges in Ontario. Administrative suspensions, warn range charges, related offences. Referrals to criminal lawyers available." canonical="https://www.legalassist.london/services/impaired-driving-defence" />
      <ServicePageLayout seoTitle="Impaired Driving Info | Ontario" seoDescription="Impaired driving information and support in Ontario." canonical="https://www.legalassist.london/services/impaired-driving-defence" problemHeadline="Impaired Driving Charges" problemDescription="Criminal impaired driving charges require a lawyer. I can help with administrative suspensions, warn range matters, and related provincial offences." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Impaired driving" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Impaired Driving in Ontario</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                Important: Criminal vs. Provincial
              </h3>
              <p className="text-red-900">Criminal impaired driving charges (over 80, impaired, refuse breath) require a LAWYER. As a paralegal, I cannot defend criminal charges. I CAN help with administrative suspensions, warn range (provincial), and related POA offences.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Types of Impaired Charges</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Type</th>
                    <th className="px-6 py-4 text-left font-heading">BAC Level</th>
                    <th className="px-6 py-4 text-left font-heading">Consequence</th>
                    <th className="px-6 py-4 text-center font-heading">Who Defends</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-red-50">
                    <td className="px-6 py-4 font-medium">Criminal Impaired</td>
                    <td className="px-6 py-4 text-sm">0.08+ (80mg+)</td>
                    <td className="px-6 py-4 text-sm">Criminal record, jail possible</td>
                    <td className="px-6 py-4 text-center font-bold text-red-600">LAWYER</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="px-6 py-4 font-medium">Refuse Breath</td>
                    <td className="px-6 py-4 text-sm">Any refusal</td>
                    <td className="px-6 py-4 text-sm">Same as impaired conviction</td>
                    <td className="px-6 py-4 text-center font-bold text-red-600">LAWYER</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-6 py-4 font-medium">Warn Range</td>
                    <td className="px-6 py-4 text-sm">0.05-0.079</td>
                    <td className="px-6 py-4 text-sm">Admin suspension, no criminal</td>
                    <td className="px-6 py-4 text-center font-bold text-green-600">PARALEGAL OK</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-6 py-4 font-medium">Admin Suspension Appeal</td>
                    <td className="px-6 py-4 text-sm">Various</td>
                    <td className="px-6 py-4 text-sm">Challenge 90-day ALS</td>
                    <td className="px-6 py-4 text-center font-bold text-green-600">PARALEGAL OK</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Administrative Licence Suspensions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="font-bold text-yellow-800 mb-3">90-Day ALS (Criminal Charge):</h4>
                <ul className="text-yellow-900 text-sm space-y-2">
                  <li>• Starts immediately at roadside</li>
                  <li>• Applies regardless of court outcome</li>
                  <li>• Can request review within 15 days</li>
                  <li>• Review at Licence Appeal Tribunal</li>
                  <li>• I can represent at review hearing</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="font-bold text-yellow-800 mb-3">Warn Range Suspension:</h4>
                <ul className="text-yellow-900 text-sm space-y-2">
                  <li>• 3 days (first offence)</li>
                  <li>• 7 days (second offence)</li>
                  <li>• 30 days (third+ offence)</li>
                  <li>• Plus vehicle impound</li>
                  <li>• I can help challenge if procedural issues</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">How I Can Help</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">What I Can Do:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• ALS review at tribunal</li>
                  <li>• Warn range challenges</li>
                  <li>• Related POA offences</li>
                  <li>• Referrals to criminal lawyers</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">What Needs Lawyer:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Criminal impaired charges</li>
                  <li>• Over 80 charges</li>
                  <li>• Refuse breath charges</li>
                  <li>• Impaired causing injury/death</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <Shield className="w-6 h-6 text-blue-600 mb-2" />
                <h4 className="font-bold text-blue-800 mb-2">Coordination:</h4>
                <ul className="text-blue-900 text-sm space-y-1">
                  <li>• Work with your criminal lawyer</li>
                  <li>• Handle admin matters separately</li>
                  <li>• Ensure nothing falls through cracks</li>
                  <li>• Provide lawyer referrals</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Impaired Driving FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Need Help Navigating This?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">I'll help you understand your options and connect you with the right help.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Consultation</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.traffic} />
      </ServicePageLayout>
    </>
  );
}
