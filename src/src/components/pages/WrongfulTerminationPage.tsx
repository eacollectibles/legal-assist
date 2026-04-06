import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, DollarSign, HelpCircle, Briefcase, Calculator, Clock, Scale } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function WrongfulTerminationPage() {
  const authorityItems = [
    { title: 'Severance Assessment', description: 'Most termination offers are too low. I calculate what you\'re actually entitled to under the law.' },
    { title: 'Negotiation', description: 'Before court, I negotiate with employers to get you a better package—often significantly more.' },
    { title: 'Legal Action', description: 'If negotiation fails, I pursue your claim through Small Claims Court (up to $35,000).' }
  ];

  const processSteps = [
    { step: '1', title: 'Entitlement Calculation', description: 'Analyze your situation and calculate proper notice/severance entitlement.' },
    { step: '2', title: 'Negotiation', description: 'Counter the employer\'s offer with your true entitlement.' },
    { step: '3', title: 'Legal Action', description: 'If necessary, file claim to recover what you\'re owed.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Common Law Notice', description: 'Often much more than ESA minimums.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Negotiation Works', description: 'Most cases settle without court.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Up to $35,000', description: 'Small Claims handles substantial claims.' }
  ];

  const honestFAQs = [
    { question: "What is 'wrongful termination' in Ontario?", answer: "In Ontario, employers can fire you for almost any reason (not 'just cause'). Wrongful termination means they didn't give you enough notice or pay in lieu. The question isn't IF they could fire you, but HOW MUCH they owe you." },
    { question: "ESA vs Common Law—what's the difference?", answer: "ESA minimums are the floor (roughly 1 week per year, capped at 8 weeks). Common law notice is usually much higher—based on age, tenure, position, and likelihood of finding similar work. A 50-year-old manager with 15 years might get 18-24 months, not 8 weeks." },
    { question: "Can they fire me without cause?", answer: "Yes—unless you have a contract saying otherwise. Ontario doesn't require 'just cause' for termination. But firing without cause means they OWE you proper notice or pay in lieu. The only question is how much." },
    { question: "What factors affect my entitlement?", answer: "Age (older = more), length of service (longer = more), position (senior = more), character of employment (specialized = more), and availability of similar employment. These are weighed together—there's no exact formula." },
    { question: "Should I sign the severance offer?", answer: "Almost never sign immediately—there's usually no rush despite what they say. Most initial offers are below true entitlement. Get it reviewed first. Signing usually waives your right to claim more later." },
    { question: "What about 'just cause' termination?", answer: "If employer claims 'just cause' (gross misconduct), they don't have to pay severance. But 'just cause' is a HIGH bar—performance issues, minor misconduct, personality conflicts usually don't qualify. Many 'just cause' claims fail." }
  ];

  return (
    <>
      <SEO title="Wrongful Termination Paralegal Ontario | Severance Negotiation" description="Licensed paralegal for wrongful termination claims in Ontario. Severance calculation, negotiation, Small Claims Court. Get what you're actually owed. Free consultation." canonical="https://www.legalassist.london/services/wrongful-termination" />
      <ServicePageLayout seoTitle="Wrongful Termination Claims | Ontario" seoDescription="Wrongful termination and severance claims in Ontario." canonical="https://www.legalassist.london/services/wrongful-termination" problemHeadline="Wrongful Termination & Severance in Ontario" problemDescription="Lost your job? The severance they offered is probably too low. I calculate what you're actually entitled to—and negotiate to get it." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Wrongful termination" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Termination Rights</h2>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                Don't Sign Immediately
              </h3>
              <p className="text-yellow-900">Despite what employers say, there's rarely a deadline to accept. Most initial offers are significantly below true entitlement. Get it reviewed before signing—signing usually waives your rights.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">ESA Minimums vs. Common Law</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-bold text-red-800 mb-3">ESA Minimums (The Floor)</h4>
                <ul className="text-red-900 text-sm space-y-2">
                  <li>• 1 week per year of service</li>
                  <li>• Maximum 8 weeks termination pay</li>
                  <li>• Plus severance pay if qualified (5+ years at large employer)</li>
                  <li><strong>This is the MINIMUM—not your full entitlement</strong></li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-bold text-green-800 mb-3">Common Law (What Courts Award)</h4>
                <ul className="text-green-900 text-sm space-y-2">
                  <li>• Based on multiple factors</li>
                  <li>• Can be 2-24+ months</li>
                  <li>• No arbitrary cap</li>
                  <li><strong>Usually MUCH higher than ESA</strong></li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Factors That Increase Entitlement</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <Clock className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-xl font-bold text-foreground mb-2">Length of Service</div>
                <p className="text-foreground/80 text-sm">More years = more notice</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <Calculator className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-xl font-bold text-foreground mb-2">Age</div>
                <p className="text-foreground/80 text-sm">Older workers get more</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <Briefcase className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-xl font-bold text-foreground mb-2">Position Level</div>
                <p className="text-foreground/80 text-sm">Senior roles = more notice</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <Scale className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-xl font-bold text-foreground mb-2">Job Market</div>
                <p className="text-foreground/80 text-sm">Harder to replace = more</p>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Example Scenarios</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Profile</th>
                    <th className="px-6 py-4 text-center font-heading">ESA Minimum</th>
                    <th className="px-6 py-4 text-center font-heading">Typical Common Law</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 text-sm">25-year-old, 2 years, entry-level</td><td className="px-6 py-4 text-center">2 weeks</td><td className="px-6 py-4 text-center">2-4 months</td></tr>
                  <tr><td className="px-6 py-4 text-sm">40-year-old, 10 years, manager</td><td className="px-6 py-4 text-center">8 weeks</td><td className="px-6 py-4 text-center">10-14 months</td></tr>
                  <tr><td className="px-6 py-4 text-sm">55-year-old, 20 years, director</td><td className="px-6 py-4 text-center">8 weeks + severance</td><td className="px-6 py-4 text-center">18-24 months</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h4 className="font-bold text-foreground mb-3">Mitigation Duty</h4>
              <p className="text-foreground/80 text-sm">You have a duty to look for new work. If you find comparable work during the notice period, your damages may be reduced. Keep records of your job search—this matters if the case goes to court.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Termination FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Received a Termination Offer?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Don't sign yet. Let me calculate what you're actually entitled to—it's probably more.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.employment} />
      </ServicePageLayout>
    </>
  );
}
