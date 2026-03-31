import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Shield, DollarSign, FileText, Scale } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function InsuranceDisputesPage() {
  const authorityItems = [
    { title: 'Insurance Disputes', description: 'Claim denied or underpaid? I help pursue insurance disputes in Small Claims Court up to $35,000.' },
    { title: 'Bad Faith Claims', description: 'Insurers must handle claims in good faith. Unreasonable denials or delays may result in additional damages.' },
    { title: 'Multiple Types', description: 'Home, auto (property damage), life, disability (some), travel—various insurance disputes within Small Claims scope.' }
  ];

  const processSteps = [
    { step: '1', title: 'Review Policy', description: 'What does your policy actually cover?' },
    { step: '2', title: 'Assess Denial', description: 'Is the denial legitimate or questionable?' },
    { step: '3', title: 'Pursue Claim', description: 'Appeal, ombudservice, or Small Claims Court.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Good Faith Required', description: 'Insurers must act reasonably.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Multiple Options', description: 'Appeal, ombudservice, court.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Policy Limits', description: 'Can only recover what policy covers.' }
  ];

  const honestFAQs = [
    { question: "My insurance claim was denied. What can I do?", answer: "First: get the denial in writing with specific reasons. Review your policy—is the denial legitimate? Options: internal appeal, insurance ombudservice (free), or Small Claims Court. Many denials are reversed on appeal." },
    { question: "What is 'bad faith' by an insurer?", answer: "Unreasonably denying valid claims, excessive delays, inadequate investigation, misrepresenting policy terms, or lowballing settlement offers. Bad faith can result in damages beyond the policy amount—but it's a high bar to prove." },
    { question: "What disputes can go to Small Claims Court?", answer: "Property damage claims up to $35,000, denied coverage disputes, underpayment issues. Auto accident benefits (SABs) go to LAT, not Small Claims. Long-term disability disputes may exceed Small Claims scope." },
    { question: "Should I accept the insurance company's settlement offer?", answer: "Not necessarily. First offer is often low. Get independent estimates for repairs/replacement. You can negotiate. If they won't move, Small Claims Court may be needed. Don't sign a release until satisfied." },
    { question: "What about auto insurance disputes?", answer: "Property damage to your vehicle can go to Small Claims. Accident benefits (medical, income replacement) go to the Licence Appeal Tribunal (LAT), not court. Fault determination disputes have separate processes." },
    { question: "How long do I have to dispute a denial?", answer: "Check your policy—many have internal appeal deadlines (30-90 days). Limitation period for court action is generally 2 years. But acting quickly is always better—evidence deteriorates, memories fade." }
  ];

  return (
    <>
      <SEO title="Insurance Disputes Paralegal Ontario | Denied Claim Help" description="Licensed paralegal for insurance disputes in Ontario. Claim denied, underpaid, bad faith. Small Claims Court. Free consultation." canonical="https://www.legalassist.london/services/insurance-disputes" />
      <ServicePageLayout seoTitle="Insurance Disputes | Ontario" seoDescription="Insurance dispute help in Ontario." canonical="https://www.legalassist.london/services/insurance-disputes" problemHeadline="Insurance Disputes" problemDescription="Insurance claim denied or underpaid? Insurers don't always get it right. I help challenge unfair denials and pursue what you're owed." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Insurance disputes" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Challenging Insurance Denials</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Your Options</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Option</th>
                    <th className="px-6 py-4 text-left font-heading">What It Is</th>
                    <th className="px-6 py-4 text-left font-heading">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Internal Appeal</td><td className="px-6 py-4 text-sm">Ask insurer to reconsider with additional info</td><td className="px-6 py-4 text-sm">Missing documentation, unclear denial</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Ombudservice</td><td className="px-6 py-4 text-sm">Free industry dispute resolution</td><td className="px-6 py-4 text-sm">After internal appeal exhausted</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Small Claims Court</td><td className="px-6 py-4 text-sm">Sue for breach of contract</td><td className="px-6 py-4 text-sm">Clear denial, up to $35,000</td></tr>
                  <tr><td className="px-6 py-4 font-medium">LAT (Auto SABs)</td><td className="px-6 py-4 text-sm">Licence Appeal Tribunal</td><td className="px-6 py-4 text-sm">Auto accident benefits disputes</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Denial Reasons</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">May Be Legitimate:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• Excluded peril (check policy)</li>
                  <li>• Policy lapsed (non-payment)</li>
                  <li>• Pre-existing damage</li>
                  <li>• Coverage limit exceeded</li>
                  <li>• Deductible applies</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Potentially Bad Faith:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Misinterpreting policy language</li>
                  <li>• Inadequate investigation</li>
                  <li>• Ignoring evidence you provided</li>
                  <li>• Unreasonable delay tactics</li>
                  <li>• Lowballing obvious claims</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Before You Accept Settlement</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-8">
              <DollarSign className="w-8 h-8 text-primary mb-3" />
              <p className="text-foreground/80 mb-4">Insurer settlement offers are often negotiable. Before accepting:</p>
              <ul className="text-foreground/80 text-sm space-y-2">
                <li>✓ Get independent repair/replacement estimates</li>
                <li>✓ Review policy coverage limits and deductibles</li>
                <li>✓ Document all your losses thoroughly</li>
                <li>✓ Don't sign a release until you're satisfied</li>
                <li>✓ Consider hidden costs (rental car, temporary housing, etc.)</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Act Quickly</h4>
              <p className="text-yellow-900 text-sm">Many policies have short deadlines for appeals (30-90 days). Court limitation is 2 years. Start the dispute process promptly—delays hurt your case and your options.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Insurance Dispute FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Insurance Claim Denied?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Bring me your policy and denial letter. Let's see if we can challenge it.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.smallClaims} />
      </ServicePageLayout>
    </>
  );
}
