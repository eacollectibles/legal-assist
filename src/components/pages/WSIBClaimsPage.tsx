import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Clock, Shield, Scale, Phone } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function WSIBClaimsPage() {
  const authorityItems = [
    { title: 'WSIB Claims Support', description: 'I help workers file WSIB claims and navigate the system. From initial claims to internal reviews, I ensure your case is properly documented.' },
    { title: 'Appeals & Reviews', description: 'Denied or insufficient benefits? I represent you before WSIB internal review and the Workplace Safety and Insurance Appeals Tribunal (WSIAT).' },
    { title: 'Evidence Building', description: 'Medical evidence, employer records, wage loss documentation—I help gather and present what WSIB needs to approve your claim.' }
  ];

  const processSteps = [
    { step: '1', title: 'Initial Claim', description: 'File Form 6 with WSIB. Include medical records, incident details, wage information.' },
    { step: '2', title: 'WSIB Review', description: 'WSIB investigates. Provide additional evidence if requested. Attend medical exams if required.' },
    { step: '3', title: 'Decision & Appeal', description: 'If approved: receive benefits. If denied: file internal review or appeal to WSIAT.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Wage Protection', description: 'WSIB replaces 85% of net lost wages if approved.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Medical Coverage', description: 'Approved claims cover all medical and rehabilitation costs.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Appeal Rights', description: 'Multiple appeal levels if your claim is denied or benefits insufficient.' }
  ];

  const honestFAQs = [
    { question: "What injuries qualify for WSIB?", answer: "Any injury or occupational disease that occurs during work, or is caused by employment. Examples: back injury from lifting, repetitive strain injury, chemical exposure, occupational disease. Must be reported within 6 months of the incident." },
    { question: "How much will WSIB pay?", answer: "85% of net lost wages (capped at a maximum). Healthcare costs are covered in full. If permanently disabled, you may receive vocational rehabilitation or ongoing income support. Amount depends on injury severity and lost earning capacity." },
    { question: "What if my claim is denied?", answer: "You have 6 months from the decision to request an internal review. If still denied, you can appeal to WSIAT within 6 months. New medical evidence or documentation of missed filing can strengthen appeals." },
    { question: "Can my employer retaliate?", answer: "No. Ontario law prohibits employers from punishing workers who file WSIB claims. Retaliation is illegal. If this happens, document it and contact me—you may have a separate wrongful dismissal claim." },
    { question: "Do I need a lawyer for WSIB?", answer: "As a paralegal, I cannot represent you at WSIAT, but I can help you prepare, gather evidence, and file internal reviews. For tribunal hearings, you may need a lawyer, but many workers also represent themselves successfully." },
    { question: "What is a pre-existing condition?", answer: "WSIB may dispute claims if you had a similar condition before. However, work-related aggravation of a pre-existing condition may still qualify. Medical evidence showing the work incident made it worse is critical." }
  ];

  return (
    <>
      <SEO title="WSIB Claims Ontario | Workplace Injury Benefits" description="WSIB claims support in Ontario. Help filing claims, building evidence, appeals. Get the benefits you're entitled to. Contact now." canonical="https://www.legalassist.london/services/wsib-claims" />
      <ServicePageLayout seoTitle="WSIB Claims Support | Ontario" seoDescription="WSIB claims and appeals support in Ontario." canonical="https://www.legalassist.london/services/wsib-claims" problemHeadline="WSIB Claims Support" problemDescription="Injured at work? WSIB claims require proper documentation and evidence. I help you file, gather evidence, and appeal if denied." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "WSIB workplace injury claims" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>

        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">WSIB Benefits & Timeline</h2>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">
                <Clock className="w-6 h-6" />
                6-Month Deadline
              </h3>
              <p className="text-blue-900">You have 6 months from the injury date to file a WSIB claim. Missing this deadline can bar your claim. File immediately and report to your employer.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Types of WSIB Benefits</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Benefit Type</th>
                    <th className="px-6 py-4 text-left font-heading">What Covered</th>
                    <th className="px-6 py-4 text-left font-heading">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Loss of Earnings</td><td className="px-6 py-4 text-sm">85% net wages, capped at provincial maximum ($1,043/week approx)</td><td className="px-6 py-4 text-sm">While unable to work</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Healthcare Costs</td><td className="px-6 py-4 text-sm">Doctor visits, physiotherapy, prescriptions, assistive devices</td><td className="px-6 py-4 text-sm">Lifetime if injury-related</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Vocational Rehab</td><td className="px-6 py-4 text-sm">Training, job search support, retraining if unable to return</td><td className="px-6 py-4 text-sm">Up to 2 years typically</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Permanent Disability</td><td className="px-6 py-4 text-sm">Lump sum or ongoing pension if permanently disabled</td><td className="px-6 py-4 text-sm">Ongoing</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Reasons for Claim Denial</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Frequent Denial Reasons:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• No medical evidence linking injury to work</li>
                  <li>• Missed the 6-month filing deadline</li>
                  <li>• Claim filed but work-cause not established</li>
                  <li>• Pre-existing condition (without work aggravation)</li>
                  <li>• WSIB believes injury is non-occupational</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">How to Fight Denial:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Get fresh medical evidence from your doctor</li>
                  <li>• Gather witness statements from coworkers</li>
                  <li>• File internal review within 6 months</li>
                  <li>• Appeal to WSIAT with new evidence</li>
                  <li>• Document progression of symptoms</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">WSIB Appeals Process</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-12">
              <h4 className="font-bold text-yellow-800 mb-4">Step-by-Step Appeal Timeline:</h4>
              <div className="space-y-4 text-yellow-900 text-sm">
                <div><strong>Step 1:</strong> Receive decision letter from WSIB</div>
                <div><strong>Step 2:</strong> Request internal review within 6 months (free)</div>
                <div><strong>Step 3:</strong> WSIB reviews your case with new evidence</div>
                <div><strong>Step 4:</strong> If still denied, appeal to WSIAT within 6 months</div>
                <div><strong>Step 5:</strong> WSIAT hearing (may need lawyer representation)</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">WSIB FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Need WSIB Help?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Don't let a denied claim stand. Let's fight for your benefits.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Contact Now</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.humanRights} />
      </ServicePageLayout>
    </>
  );
}
