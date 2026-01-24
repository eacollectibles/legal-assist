import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Calendar, DollarSign, Briefcase, Scale } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function VacationPayPage() {
  const authorityItems = [
    { title: 'Vacation Entitlements', description: 'Ontario employees earn minimum vacation time and pay. After 5 years: 3 weeks/6%. Your contract may provide more but never less.' },
    { title: 'Owed on Termination', description: 'Unused vacation pay must be paid out when employment ends. Many employers shortchange this.' },
    { title: 'Recovery Options', description: 'Ministry of Labour for up to 2 years, or Small Claims Court for larger amounts.' }
  ];

  const processSteps = [
    { step: '1', title: 'Calculate Entitlement', description: '4% (under 5 years) or 6% (5+ years) of gross wages.' },
    { step: '2', title: 'Review Pay', description: 'Check if vacation pay is being paid correctly.' },
    { step: '3', title: 'Recover', description: 'MOL complaint or civil claim for unpaid amounts.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Minimum Guaranteed', description: '4% (2 weeks) minimum by law.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Accrues Continuously', description: 'Earned on all wages, all year.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Check Your Pay', description: 'Many employers pay incorrectly.' }
  ];

  const honestFAQs = [
    { question: "What vacation am I entitled to?", answer: "Under 5 years: minimum 2 weeks time off and 4% of gross wages. 5+ years: 3 weeks time off and 6% of gross wages. Your contract/policy may provide more, but can never provide less than ESA minimums." },
    { question: "How is vacation pay calculated?", answer: "Percentage of your gross wages (before deductions). Under 5 years: 4%. 5+ years: 6%. If you earned $50,000 gross, your vacation pay is $2,000 (4%) or $3,000 (6%). This is in addition to your regular pay." },
    { question: "When must vacation pay be paid?", answer: "Either: (1) in a lump sum before vacation starts, (2) on regular pay dates during vacation, or (3) as a percentage added to each paycheque ('vacation pay on cheque'). Whatever method, you must receive the full amount." },
    { question: "My paystub shows 'vacation pay' but I never get time off. Is that okay?", answer: "Legally, employer must provide time off (2-3 weeks). Paying vacation pay on each cheque doesn't eliminate your right to actual time off. However, if you're receiving 4-6% on each cheque, the money portion is being paid." },
    { question: "What happens to unused vacation when I'm terminated?", answer: "All accrued vacation pay must be paid out on termination—even if you quit. Employer cannot forfeit vacation pay you've earned. If your last cheque doesn't include vacation payout, you're owed money." },
    { question: "I've been here 4 years and never got vacation. How much am I owed?", answer: "4% of all gross wages earned over 4 years. If you earned ~$45,000/year = $180,000 total, you're owed $7,200 in vacation pay. This is a substantial amount worth pursuing." }
  ];

  return (
    <>
      <SEO title="Vacation Pay Disputes Paralegal Ontario | Unpaid Vacation Claims" description="Licensed paralegal for vacation pay disputes in Ontario. Unpaid vacation, termination payout, ESA entitlements. Free consultation." canonical="https://www.legalassist.london/services/vacation-pay" />
      <ServicePageLayout seoTitle="Vacation Pay | Ontario" seoDescription="Vacation pay disputes in Ontario." canonical="https://www.legalassist.london/services/vacation-pay" problemHeadline="Vacation Pay" problemDescription="Not receiving proper vacation pay? Vacation pay owed on termination? Ontario law requires minimum vacation—I help recover what you're owed." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Vacation pay" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Ontario Vacation Entitlements</h2>
            
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Employment Length</th>
                    <th className="px-6 py-4 text-center font-heading">Time Off</th>
                    <th className="px-6 py-4 text-center font-heading">Vacation Pay %</th>
                    <th className="px-6 py-4 text-left font-heading">Example ($50K salary)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Under 5 years</td><td className="px-6 py-4 text-center">2 weeks</td><td className="px-6 py-4 text-center font-bold">4%</td><td className="px-6 py-4">$2,000/year</td></tr>
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">5+ years</td><td className="px-6 py-4 text-center">3 weeks</td><td className="px-6 py-4 text-center font-bold text-green-700">6%</td><td className="px-6 py-4">$3,000/year</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">How Vacation Pay Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6">
                <Calendar className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Accrual</h4>
                <p className="text-foreground/80 text-sm">Vacation pay accrues continuously on all wages earned—regular pay, overtime, commissions, bonuses.</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <DollarSign className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Payment Methods</h4>
                <p className="text-foreground/80 text-sm">Lump sum before vacation, regular pay during vacation, or percentage on each cheque. All valid if full amount paid.</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <Briefcase className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Termination</h4>
                <p className="text-foreground/80 text-sm">All accrued vacation must be paid out when employment ends, regardless of reason for leaving.</p>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Issues</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Violations:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Not paying any vacation pay</li>
                  <li>• Paying less than 4%/6%</li>
                  <li>• "Use it or lose it" policies</li>
                  <li>• Not paying out on termination</li>
                  <li>• Calculating on base only (not total)</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Your Rights:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Cannot contract out of minimums</li>
                  <li>• Cannot forfeit earned vacation</li>
                  <li>• Vacation pay on ALL earnings</li>
                  <li>• Must receive actual time off</li>
                  <li>• Full payout on termination</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Check Your Pay Stubs</h4>
              <p className="text-yellow-900 text-sm">Your stub should show vacation pay accrued or paid. If you're paid "vacation on cheque," verify it's 4-6% of gross. If no vacation pay appears and you never receive separate vacation payment, you may be owed years of back pay.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Vacation Pay FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Owed Vacation Pay?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Bring your pay stubs. I'll calculate what you're entitled to.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.employment} />
      </ServicePageLayout>
    </>
  );
}
