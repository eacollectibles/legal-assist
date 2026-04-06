import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Clock, Shield, Scale, Phone } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function InsuranceDisputesPage() {
  const authorityItems = [
    { title: 'Accident Benefit Claims', description: 'I help you claim accident benefits (AB) under auto insurance. Medical, rehabilitation, wage loss, and housekeeping benefits—I ensure you get what coverage provides.' },
    { title: 'Denial Appeals', description: 'Insurance company denied your claim? I help appeal denials and fight underpayment. Many denials can be reversed with proper evidence and legal argument.' },
    { title: 'LAT Hearings', description: 'Licence Appeal Tribunal handles insurance disputes when informal resolution fails. I help prepare for LAT hearings to get your benefits.' }
  ];

  const processSteps = [
    { step: '1', title: 'File Claim', description: 'Report accident to insurer. Submit medical evidence, proof of income, receipts for treatment/equipment.' },
    { step: '2', title: 'Insurer Review', description: 'Insurer reviews and decides. Provides written explanation if denied or partially approved.' },
    { step: '3', title: 'Dispute & LAT', description: 'If denied or underpaid, attempt negotiation. File with LAT if no resolution.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Medical Coverage', description: 'Accident benefits cover medical costs, physiotherapy, psychology, assistive devices—usually no dollar limit.' },
    { icon: <CheckCircle className="w-6 h-8 text-primary flex-shrink-0 mt-1" />, title: 'Income Protection', description: 'Wage loss benefits if injury prevents you from working. Usually 70% of gross income up to limit.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Appeal Rights', description: 'Denials can be appealed. LAT reviews denials and awards benefits many insurers initially refused.' }
  ];

  const honestFAQs = [
    { question: "What are accident benefits (AB)?", answer: "Benefits paid by your auto insurance after a vehicle accident, regardless of fault. Includes: medical treatments, rehabilitation, wage loss (70% of gross, up to limit), housekeeping assistance, death benefits. Ontario's Statutory Accident Benefits Schedule (SABS) sets maximum amounts and conditions." },
    { question: "Do I have to prove fault to get accident benefits?", answer: "No. Accident benefits are 'no-fault' coverage. You get them whether you caused the accident or the other driver did. What matters: injury was from the motor vehicle accident, you filed timely, and benefits fall within coverage. Fault only matters for bodily injury claims against at-fault driver." },
    { question: "How much will I receive?", answer: "Depends on benefits claimed. Medical: usually unlimited within reasonable and necessary treatment. Wage loss: 70% of gross (max ~$2,000/week, 2024 amount). Death benefits: up to $250,000. Housekeeping: if injury prevents you from housework. Amount varies by policy limits and SABS rules." },
    { question: "What is SABS and why does it matter?", answer: "Statutory Accident Benefits Schedule is Ontario's mandatory insurance minimum. Sets maximum benefits, conditions for eligibility, time limits for claims. Insurance can offer more than SABS minimums. Understanding SABS helps you know your legal entitlement." },
    { question: "Why do insurers deny claims?", answer: "Common reasons: claim filed late (over 30 days), insufficient medical evidence, injury deemed pre-existing, insurer disputes causation (that accident caused injury), non-compliance (missed exams/submissions), policy exclusions. Many denials can be overturned with proper evidence." },
    { question: "What is LAT and how do I use it?", answer: "Licence Appeal Tribunal resolves insurance disputes. Files case with LAT if insurer denies benefits or you dispute decision. LAT is formal proceeding; you present evidence, insurer presents their position, LAT member decides. Can file online or with lawyer/paralegal help." }
  ];

  return (
    <>
      <SEO title="Insurance Disputes Ontario | Accident Benefits Claims" description="Accident benefits and insurance dispute support. Help with denied claims, wage loss, medical benefits. LAT hearings. Speak with a paralegal." canonical="https://www.legalassist.london/services/insurance-disputes" />
      <ServicePageLayout seoTitle="Insurance Disputes & Accident Benefits | Ontario" seoDescription="Accident benefits claims and insurance dispute support in Ontario." canonical="https://www.legalassist.london/services/insurance-disputes" problemHeadline="Insurance Dispute Support" problemDescription="Insurance denied your accident benefits claim? I help fight denials, appeal with evidence, and prepare for LAT hearings." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Insurance accident benefits disputes" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>

        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Accident Benefits in Ontario</h2>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">
                <Clock className="w-6 h-6" />
                Filing Deadlines Matter
              </h3>
              <p className="text-blue-900">File claim within 30 days of accident. Late claims may be denied. Medical evidence must be recent and detailed. Missing deadlines can bar your entire claim.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Types of Accident Benefits Covered</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Benefit Type</th>
                    <th className="px-6 py-4 text-left font-heading">Coverage</th>
                    <th className="px-6 py-4 text-left font-heading">Maximum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Medical/Rehabilitation</td><td className="px-6 py-4 text-sm">Doctor, physio, psychology, assistive devices, home care, medications</td><td className="px-6 py-4 text-sm">Reasonable & necessary (usually unlimited)</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Wage Loss</td><td className="px-6 py-4 text-sm">70% of gross wages lost due to injury; up to 2 years or return to work</td><td className="px-6 py-4 text-sm">~$2,000/week (2024 SABS max)</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Housekeeping/Attendant Care</td><td className="px-6 py-4 text-sm">Help with home tasks if injury prevents you from doing them</td><td className="px-6 py-4 text-sm">Based on reasonable cost and necessity</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Death Benefit</td><td className="px-6 py-4 text-sm">Paid to family/dependents if fatality from accident</td><td className="px-6 py-4 text-sm">Up to $250,000 per SABS</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Minor Injury Guideline & Dispute Resolution</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <Shield className="w-6 h-6 text-blue-600 mb-2" />
                <h4 className="font-bold text-blue-800 mb-2">Minor Injury Defined:</h4>
                <ul className="text-blue-900 text-sm space-y-1">
                  <li>• Whiplash, minor sprains/strains</li>
                  <li>• Medical treatment expected to end within 6 months</li>
                  <li>• Wage loss benefits capped at $3,500</li>
                  <li>• Non-earner benefits $1,000 max</li>
                  <li>• Many claims fall under this—impacts benefits</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <Scale className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">If Insurer Denies:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• Review decision letter carefully</li>
                  <li>• Gather medical evidence supporting injury</li>
                  <li>• File with insurer's dispute handler</li>
                  <li>• If unresolved, file with LAT</li>
                  <li>• LAT hearing can reverse denial</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Denial Reasons & How to Fight Them</h3>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h4 className="font-bold text-red-800 mb-3">Why Insurers Deny Claims:</h4>
              <div className="space-y-3 text-red-900 text-sm">
                <div><strong>Claim filed late:</strong> Outside 30-day window. Fight: show reasonable explanation for delay, may file late claim anyway.</div>
                <div><strong>Insufficient medical evidence:</strong> Doctor's letter too vague. Fight: get detailed functional assessment letter from your doctor.</div>
                <div><strong>Pre-existing condition:</strong> Insurer claims injury existed before accident. Fight: medical evidence showing accident caused or significantly worsened condition.</div>
                <div><strong>Treatment deemed not reasonable/necessary:</strong> Insurer won't pay for physio/treatment. Fight: expert opinion showing treatment is medically necessary.</div>
                <div><strong>Non-compliance:</strong> Missed insurer medical exam or didn't submit forms. Fight: legitimate reason (health, confusion), provide missing documentation, reinstate claim.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Insurance & Benefits FAQs</h2>
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
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Don't accept it without a fight. I help appeal denials and prepare for LAT hearings. Many claims are reversed.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Contact Now</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.smallClaims} />
      </ServicePageLayout>
    </>
  );
}
