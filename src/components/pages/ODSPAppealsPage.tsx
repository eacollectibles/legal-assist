import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Clock, Shield, Scale, Phone } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ODSPAppealsPage() {
  const authorityItems = [
    { title: 'ODSP Eligibility Review', description: 'I help assess ODSP eligibility and identify gaps in your application. Disability must be documented with medical evidence showing substantial restriction.' },
    { title: 'Internal Review Process', description: 'If ODSP denies your application or cuts benefits, I help prepare and file an internal review with fresh evidence and better documentation.' },
    { title: 'Social Benefits Tribunal Appeals', description: 'SBT appeals require presentation of evidence and understanding of the disability definition. I help build your case for tribunal hearings.' }
  ];

  const processSteps = [
    { step: '1', title: 'Assess Eligibility', description: 'Review medical evidence, employment history, current income, and household composition.' },
    { step: '2', title: 'Gather Documentation', description: 'Collect medical records, functional assessments, doctor letters about substantial restriction.' },
    { step: '3', title: 'Appeal Filing', description: 'File internal review or SBT appeal with comprehensive evidence package.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Substantial Restriction', description: 'ODSP covers wide range of disabilities—many denials are due to weak medical evidence, not ineligibility.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Appeal Rights', description: 'You have appeal rights at multiple levels. Many initial denials are reversed on appeal.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Financial Support', description: 'Approved ODSP provides monthly income plus healthcare and prescription coverage.' }
  ];

  const honestFAQs = [
    { question: "What is 'substantial restriction'?", answer: "The core ODSP test. It means the disability regularly prevents you from earning a living doing any work. This is broader than just physical limitations—includes cognitive, mental health, pain conditions that substantially reduce work capacity. Must be expected to last 2+ years or be permanent." },
    { question: "What medical evidence do I need?", answer: "Medical documentation from doctor or specialist showing: diagnosis, how it affects daily function, work capacity, expected duration, any treatment/medications, specialist assessments if available. General letters saying 'patient is disabled' are weak. Detailed functional assessments are strong." },
    { question: "How much are ODSP benefits?", answer: "Basic needs allowance (2024): ~$725/month single, +$240 spouse. Shelter allowance varies by region (~$500-700). Approved applicants may get disability support, health coverage, and benefits to help with employment if able." },
    { question: "What happens if ODSP denies my application?", answer: "You receive a letter explaining the reason. You have 30 days to request an internal review (free). If still denied, you can appeal to Social Benefits Tribunal within 30 days of the review decision. SBT is more formal—you present evidence, ODSP presents theirs, tribunal decides." },
    { question: "Can I work while on ODSP?", answer: "Yes. ODSP allows earned income with exemptions and deductions. First $1,000/month is exempt, then benefits reduce gradually. Unearned income (gifts, inheritance) may affect eligibility. Report all income—hiding it can result in overpayment recovery." },
    { question: "What disqualifies me from ODSP?", answer: "Assets over limit (~$40,000 for single), not a Canadian citizen/PR, residing in hospital/jail, or income sufficient to live on. Recent immigrants may have eligibility restrictions. Medical condition can't be the only issue—must meet income/asset tests." }
  ];

  return (
    <>
      <SEO title="ODSP Appeals Ontario | Disability Benefits" description="ODSP appeals and eligibility support in Ontario. Help with applications, internal reviews, and Social Benefits Tribunal appeals." canonical="https://www.legalassist.london/services/odsp-appeals" />
      <ServicePageLayout seoTitle="ODSP Appeals | Ontario Disability" seoDescription="ODSP appeals and eligibility support in Ontario." canonical="https://www.legalassist.london/services/odsp-appeals" problemHeadline="ODSP Appeals Support" problemDescription="ODSP denied your application or cut benefits? I help with internal reviews and Social Benefits Tribunal appeals. Strong medical evidence can reverse denials." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "ODSP disability benefits appeals" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>

        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">ODSP Eligibility Requirements</h2>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">
                <Clock className="w-6 h-6" />
                Appeal Deadlines
              </h3>
              <p className="text-blue-900">Internal review: 30 days from denial letter. SBT appeal: 30 days from internal review decision. Missing deadlines can bar your appeal. File immediately.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Key Eligibility Criteria</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Criterion</th>
                    <th className="px-6 py-4 text-left font-heading">Requirement</th>
                    <th className="px-6 py-4 text-left font-heading">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Disability</td><td className="px-6 py-4 text-sm">Substantial restriction preventing any employment</td><td className="px-6 py-4 text-sm">Core test; must last 2+ years or be permanent</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Income</td><td className="px-6 py-4 text-sm">Monthly income below allowable limit</td><td className="px-6 py-4 text-sm">~$2,000 single; higher with dependents</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Assets</td><td className="px-6 py-4 text-sm">Liquid assets under $40,000 (single)</td><td className="px-6 py-4 text-sm">Home, vehicle exempt; RRSP partially exempt</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Status</td><td className="px-6 py-4 text-sm">Canadian citizen or permanent resident</td><td className="px-6 py-4 text-sm">Recent immigrants may have waiting period</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Medical Evidence That Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Strong Medical Evidence:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Detailed functional assessment (what you can/cannot do)</li>
                  <li>• Diagnosis with prognosis 2+ years or permanent</li>
                  <li>• Specialist assessment (psychiatrist, physiatrist, etc.)</li>
                  <li>• Impact on work capacity—not just diagnosis</li>
                  <li>• Treatment being provided and response</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Weak Medical Evidence:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Generic letter: "Patient is disabled"</li>
                  <li>• No detail on functional restrictions</li>
                  <li>• Short duration (less than 2 years)</li>
                  <li>• No mention of work capacity</li>
                  <li>• Incomplete or outdated assessments</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Internal Review & SBT Appeal Process</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h4 className="font-bold text-yellow-800 mb-4">Your Appeal Options:</h4>
              <div className="space-y-4 text-yellow-900 text-sm">
                <div><strong>Internal Review (Free):</strong> File within 30 days. ODSP caseworker reviews with new evidence. Decision in 15-20 days. Lower bar than SBT but same caseworker type.</div>
                <div><strong>SBT Appeal:</strong> More formal hearing. You and ODSP present evidence. Tribunal member (independent) decides. Can request oral hearing or written submission.</div>
                <div><strong>Both Options Available:</strong> Can do internal review first, then SBT if still denied. Or go straight to SBT in some cases.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">ODSP FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">ODSP Denied You?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Many denials are reversed on appeal. Let's build a stronger case with proper medical evidence.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Contact Now</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.humanRights} />
      </ServicePageLayout>
    </>
  );
}
