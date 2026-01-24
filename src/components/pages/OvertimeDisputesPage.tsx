import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Clock, DollarSign, Briefcase, Scale } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function OvertimeDisputesPage() {
  const authorityItems = [
    { title: 'Overtime Pay', description: 'Most Ontario employees are entitled to overtime pay (1.5x) after 44 hours per week. Many employers don\'t comply.' },
    { title: 'Exemption Analysis', description: 'Not all employees qualify for overtime—managers, some professionals, and IT workers may be exempt. I help determine if exemptions actually apply.' },
    { title: 'Recovery Options', description: 'Ministry of Labour complaint for up to 2 years of wages, or civil claim for longer periods.' }
  ];

  const processSteps = [
    { step: '1', title: 'Assess Exemption', description: 'Are you actually exempt from overtime?' },
    { step: '2', title: 'Calculate Owed', description: 'Hours worked × 1.5 × hourly rate.' },
    { step: '3', title: 'Recover Wages', description: 'MOL complaint or civil claim.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Clear Right', description: 'Overtime after 44 hours is law.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Exemptions Limited', description: 'Many claimed exemptions don\'t apply.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Time Limits', description: 'MOL: 2 years. Civil: 2 years.' }
  ];

  const honestFAQs = [
    { question: "When am I entitled to overtime pay?", answer: "Most Ontario employees: overtime (1.5x regular rate) kicks in after 44 hours in a work week. Some industries have different thresholds. Federal employees and certain sectors have different rules. Your employment contract cannot take away overtime rights." },
    { question: "My employer says I'm 'salaried' so no overtime. Is that true?", answer: "No. Being salaried doesn't automatically exempt you from overtime. The exemption depends on your actual job duties, not your job title or pay structure. Many 'salaried' employees are entitled to overtime but don't know it." },
    { question: "What jobs are actually exempt from overtime?", answer: "True managerial/supervisory roles (must genuinely supervise), certain professionals (doctors, lawyers, accountants, engineers), IT professionals meeting specific criteria, some salespeople. The exemption is based on job duties, not title." },
    { question: "I'm a 'manager' but don't supervise anyone. Am I exempt?", answer: "Probably not. The managerial exemption requires genuinely supervising employees and having authority over their work. If you just have 'manager' in your title but do regular employee work, you likely qualify for overtime." },
    { question: "How do I calculate what I'm owed?", answer: "Hours over 44 per week × 1.5 × your regular hourly rate. For salaried employees, calculate hourly rate from salary. Example: 50 hours worked, $25/hour = 6 overtime hours × $37.50 = $225 in overtime pay." },
    { question: "How far back can I claim unpaid overtime?", answer: "Ministry of Labour: 2 years from complaint date. Civil court: 2 years (arguably longer in some cases). Keep your own records—don't rely on employer records alone." }
  ];

  return (
    <>
      <SEO title="Overtime Pay Disputes Paralegal Ontario | Unpaid Overtime Claims" description="Licensed paralegal for overtime disputes in Ontario. Unpaid overtime, exemption analysis, MOL complaints. Free consultation." canonical="https://www.legalassist.london/services/overtime-disputes" />
      <ServicePageLayout seoTitle="Overtime Disputes | Ontario" seoDescription="Overtime pay disputes in Ontario." canonical="https://www.legalassist.london/services/overtime-disputes" problemHeadline="Overtime Disputes" problemDescription="Working overtime but not getting paid 1.5x? Many employees are owed overtime they never received. I help assess exemptions and recover wages." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Overtime disputes" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Ontario Overtime Rules</h2>
            
            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <Clock className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">The Basic Rule</h3>
              <p className="text-foreground/80 text-lg">After <span className="font-bold">44 hours</span> in a work week, you're entitled to <span className="font-bold">1.5× your regular rate</span> for each additional hour.</p>
              <p className="text-foreground/70 text-sm mt-2">Your contract cannot take this away. "Salary" doesn't change this. Only specific exemptions apply.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Who's Exempt (and Who's Not)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Actually Exempt:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• True supervisors/managers (supervise employees)</li>
                  <li>• Licensed professionals (doctors, lawyers, engineers)</li>
                  <li>• IT professionals (specific criteria)</li>
                  <li>• Outside salespeople</li>
                  <li>• Certain agricultural workers</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Entitled to Overtime (Often Misclassified):</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• "Managers" who don't supervise</li>
                  <li>• Salaried employees doing regular work</li>
                  <li>• "Assistant managers" working front line</li>
                  <li>• Most office workers</li>
                  <li>• Most retail/service workers</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Calculating Your Claim</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-8">
              <DollarSign className="w-8 h-8 text-primary mb-3" />
              <p className="text-foreground/80 mb-4">Example calculation:</p>
              <ul className="text-foreground/80 space-y-2">
                <li>• Regular hours: 44/week</li>
                <li>• Actual hours worked: 55/week</li>
                <li>• Overtime hours: 11/week</li>
                <li>• Hourly rate: $25</li>
                <li>• Overtime rate: $37.50 (1.5×)</li>
                <li>• <span className="font-bold">Weekly overtime owed: $412.50</span></li>
                <li>• <span className="font-bold">Over 2 years: ~$42,900</span></li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Keep Your Own Records</h4>
              <p className="text-yellow-900 text-sm">Track your own hours—emails showing late work, calendar entries, text messages about staying late. Don't rely solely on employer timekeeping, especially if they discourage recording overtime.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Overtime FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Working Unpaid Overtime?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let me assess whether you're truly exempt and calculate what you're owed.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.employment} />
      </ServicePageLayout>
    </>
  );
}
