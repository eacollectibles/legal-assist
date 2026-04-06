import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Clock, Shield, Scale, Phone } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function OntarioWorksAppealsPage() {
  const authorityItems = [
    { title: 'OW Eligibility Assessment', description: 'I help determine if you qualify for Ontario Works income support based on income, assets, and employment situation.' },
    { title: 'Denial & Reduction Appeals', description: 'OW cuts or denied your application? I help file internal reviews and SBT appeals with documentation of your circumstances.' },
    { title: 'Compliance Issues', description: 'Failed to meet participation requirements? I help address employment agreements, attend-and-report mandates, and reinstatement issues.' }
  ];

  const processSteps = [
    { step: '1', title: 'Assess Situation', description: 'Review OW decision letter, income, assets, employment participation requirements.' },
    { step: '2', title: 'Gather Evidence', description: 'Collect proof of income, job search efforts, barriers to employment, medical/personal circumstances.' },
    { step: '3', title: 'File Appeal', description: 'Submit internal review or SBT appeal with comprehensive documentation.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Basic Income Support', description: 'Approved OW provides shelter + basic needs allowance based on household size.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Appeal Rights', description: 'You have right to internal review and SBT appeal. Many initial decisions are reversed.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Work Incentives', description: 'OW allows work and has incentive programs to encourage employment without immediate benefit loss.' }
  ];

  const honestFAQs = [
    { question: "Who is eligible for Ontario Works?", answer: "Adults 18+ who are in financial need (income and assets below threshold) and are Canadian citizens or permanent residents. Generally must be available for employment or unable to work due to health reasons. Asset limit is ~$10,000 single; income limit ~$1,800/month before OW calculation." },
    { question: "What is the participation requirement?", answer: "OW recipients must actively seek employment or participate in an employment agreement developed with their caseworker. This may include job training, upgrading, community work experience, job search activities. Some people have exemptions due to health or caring for dependents." },
    { question: "What if I can't meet participation requirements?", answer: "Tell your caseworker. You may qualify for an exemption if health reasons, age, or caring for dependents prevent employment. Medical letters help. If denied exemption, you can appeal. Non-compliance can result in benefit reduction/termination, but legitimate barriers should be documented." },
    { question: "How much will I receive?", answer: "Basic needs + shelter allowance. 2024 basic needs: ~$702 single, +$338 spouse. Shelter varies (~$350-700). Total varies by household. Earned income is partially deducted; some exemptions apply. Depends on your specific situation." },
    { question: "What counts as income and assets?", answer: "Income: wages, CPP, EI, ODSP, spousal support, child support, gifts. Assets: bank accounts, vehicles (but one car is exempt), investments. Some assets exempt: principal residence, RRSPs (partially). Employment income has exemptions and deductions." },
    { question: "Why was my OW reduced or denied?", answer: "Common reasons: income too high, assets over limit, not meeting participation requirements, not providing required documents, living with someone whose income counts, or deemed ineligible. Decision letter explains reason. You can request internal review within 30 days or appeal to SBT within 30 days of review." }
  ];

  return (
    <>
      <SEO title="Ontario Works Appeals | Income Support" description="Ontario Works appeals support in Ontario. Help with applications, participation requirements, and SBT appeals for income assistance." canonical="https://www.legalassist.london/services/ontario-works-appeals" />
      <ServicePageLayout seoTitle="Ontario Works Appeals | Income Support" seoDescription="Ontario Works appeals and eligibility support." canonical="https://www.legalassist.london/services/ontario-works-appeals" problemHeadline="Ontario Works Appeals Support" problemDescription="OW reduced or denied your benefit? I help with internal reviews and Social Benefits Tribunal appeals to restore your income support." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Ontario Works income support appeals" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>

        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Ontario Works Eligibility & Benefits</h2>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">
                <Clock className="w-6 h-6" />
                Appeal Deadlines
              </h3>
              <p className="text-blue-900">Internal review: 30 days from decision letter. SBT appeal: 30 days from internal review result. Late appeals may be denied. Act quickly.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Financial Limits & Benefits</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Category</th>
                    <th className="px-6 py-4 text-left font-heading">Limit/Amount</th>
                    <th className="px-6 py-4 text-left font-heading">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Asset Limit</td><td className="px-6 py-4 text-sm">~$10,000 single; $20,000 couple</td><td className="px-6 py-4 text-sm">Home, 1 vehicle exempt; RRSP partially exempt</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Income Limit</td><td className="px-6 py-4 text-sm">~$1,800 single before OW deduction</td><td className="px-6 py-4 text-sm">Benefits reduce when income exceeds threshold</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Basic Needs</td><td className="px-6 py-4 text-sm">~$702 single; +$338 spouse</td><td className="px-6 py-4 text-sm">Monthly for food, hygiene, essentials</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Shelter Allowance</td><td className="px-6 py-4 text-sm">$350-700 depending on region</td><td className="px-6 py-4 text-sm">Covers rent/mortgage; actual rent may be higher</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Reasons for Denial or Reduction</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Why OW is Denied/Reduced:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Income exceeds limit (from work, CPP, etc.)</li>
                  <li>• Liquid assets over threshold</li>
                  <li>• Not meeting participation requirements</li>
                  <li>• Failed to provide required documents</li>
                  <li>• Living with someone whose income counts</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">How to Appeal:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Request internal review within 30 days</li>
                  <li>• Provide new documents/explanations</li>
                  <li>• If review denies, appeal to SBT within 30 days</li>
                  <li>• Document barriers to employment</li>
                  <li>• Get medical letters if health-related</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Participation Requirements & Exemptions</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h4 className="font-bold text-yellow-800 mb-4">Employment Participation Obligations:</h4>
              <div className="space-y-4 text-yellow-900 text-sm">
                <div><strong>Standard Requirement:</strong> Actively seek employment, attend job training, participate in employment agreement, report to caseworker regularly, accept reasonable job offers.</div>
                <div><strong>Exemptions Available:</strong> Serious medical condition, primary caregiver, temporary hardship, age 65+, pregnant/recently postpartum, caring for disabled family member. Must be documented.</div>
                <div><strong>Non-Compliance Consequences:</strong> Benefit reduction or termination. But legitimate barriers (documented medical, childcare) justify exemption requests.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Ontario Works FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Need OW Help?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Don't accept a reduction without understanding your options. Let's appeal and restore your benefits.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Contact Now</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.humanRights} />
      </ServicePageLayout>
    </>
  );
}
