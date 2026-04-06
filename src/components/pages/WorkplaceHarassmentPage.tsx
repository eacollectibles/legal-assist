import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Clock, Shield, Scale, Phone } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function WorkplaceHarassmentPage() {
  const authorityItems = [
    { title: 'OHSA Complaint Support', description: 'I help file workplace harassment complaints under Ontario Health & Safety Act. Employers must investigate and take corrective action.' },
    { title: 'MOL Investigation Help', description: 'Ministry of Labour investigates OHSA complaints. I help you provide witness statements, document evidence, and follow up with ministry.' },
    { title: 'Employer Obligations', description: 'Bill 132 requires employers to have anti-harassment policies and investigate complaints. I ensure your employer meets these duties.' }
  ];

  const processSteps = [
    { step: '1', title: 'Document Harassment', description: 'Record dates, times, witnesses, what was said/done. Keep records at home, not work.' },
    { step: '2', title: 'Report to Employer', description: 'Notify HR/management. File internal complaint if policy exists. Request written response.' },
    { step: '3', title: 'OHSA Complaint', description: 'If unresolved, file OHSA complaint with Ministry of Labour or WorkSafeBC equivalents.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Legal Protection', description: 'Ontario law prohibits harassment and retaliation. Employers must investigate and act.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'No Cost Investigation', description: 'Ministry of Labour investigates OHSA complaints free. Employer pays for investigation.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Constructive Dismissal', description: 'If harassment forces you to quit, may claim constructive dismissal and severance.' }
  ];

  const honestFAQs = [
    { question: "What is workplace harassment under Ontario law?", answer: "Engaging in a course of vexatious conduct directed toward a worker that is known or ought to be known to be unwelcome. It's repeated, unwanted behavior creating hostile work environment. Includes physical, verbal, sexual, or psychological abuse. Single isolated incident may not qualify; pattern is key." },
    { question: "What is Bill 132 and how does it help me?", answer: "Bill 132 (Occupational Health & Safety Amendment, 2017) requires employers to establish harassment prevention policy, investigate promptly, keep records, and take corrective action. Employees can demand employer compliance. If employer ignores these duties, you can file OHSA complaint." },
    { question: "How do I file an OHSA complaint?", answer: "Contact Ministry of Labour (1-800-531-5551 or online). File a complaint alleging workplace harassment. Must be made within specified timeframe. MOL investigates at no cost to you. Investigation includes interview with you, witnesses, and employer. Results in inspection report." },
    { question: "What should I document for a complaint?", answer: "Date, time, location, who was involved, witnesses present, exactly what was said/done, how it affected you, any injuries. Keep documentation at home, not work (employer may take it). Photos/videos if safe. Medical records if affected health. Messages/emails are excellent evidence." },
    { question: "Can my employer retaliate against me for complaining?", answer: "No. Retaliation is illegal under OHSA. If punished for reporting (reduced hours, denied promotion, dismissal, isolation), document it. Can file additional OHSA complaint for retaliation, or claim constructive dismissal if forced to quit." },
    { question: "What happens after MOL investigates?", answer: "Ministry sends inspection report. If violation found, employer must take corrective action or face orders/penalties. If no violation found, you can still pursue internal resolution, seek settlement, or if forced to quit, claim constructive dismissal damages." }
  ];

  return (
    <>
      <SEO title="Workplace Harassment Claims Ontario | OHSA Complaints" description="Workplace harassment support including OHSA complaints, MOL investigations, Bill 132 compliance. Constructive dismissal claims." canonical="https://www.legalassist.london/services/workplace-harassment" />
      <ServicePageLayout seoTitle="Workplace Harassment Support | Ontario" seoDescription="Workplace harassment complaints and OHSA support in Ontario." canonical="https://www.legalassist.london/services/workplace-harassment" problemHeadline="Workplace Harassment Support" problemDescription="Being harassed at work? Ontario law protects you. I help file OHSA complaints, work with Ministry of Labour investigations, and pursue remedies." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Workplace harassment OHSA complaints" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>

        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Workplace Harassment in Ontario</h2>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                Your Employer's Duty
              </h3>
              <p className="text-red-900">Employers MUST investigate harassment complaints promptly. Failure to do so violates Bill 132. If employer ignores your complaint, you can file OHSA violation complaint with Ministry of Labour.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Types of Workplace Harassment</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Type</th>
                    <th className="px-6 py-4 text-left font-heading">Examples</th>
                    <th className="px-6 py-4 text-left font-heading">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Verbal/Psychological</td><td className="px-6 py-4 text-sm">Insults, threats, intimidation, public humiliation, belittling comments</td><td className="px-6 py-4 text-sm">Document and report to HR</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Physical</td><td className="px-6 py-4 text-sm">Pushing, striking, threatening physical harm, invasion of personal space</td><td className="px-6 py-4 text-sm">Report to police and employer</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Sexual</td><td className="px-6 py-4 text-sm">Unwanted touching, comments, advances, requests for sexual favors</td><td className="px-6 py-4 text-sm">Report to employer and police if criminal</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Discriminatory</td><td className="px-6 py-4 text-sm">Based on race, gender, disability, age, religion, sexual orientation</td><td className="px-6 py-4 text-sm">File with employer and HRTO if applicable</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Bill 132 Employer Obligations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <Shield className="w-6 h-6 text-blue-600 mb-2" />
                <h4 className="font-bold text-blue-800 mb-2">Employers Must:</h4>
                <ul className="text-blue-900 text-sm space-y-1">
                  <li>• Have harassment prevention policy</li>
                  <li>• Investigate complaints promptly</li>
                  <li>• Document investigation findings</li>
                  <li>• Take corrective action if harassment confirmed</li>
                  <li>• Report investigation results to complainant</li>
                  <li>• Protect complainant from retaliation</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">If Employer Fails:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• File OHSA violation with Ministry of Labour</li>
                  <li>• MOL investigates employer's failure to act</li>
                  <li>• Employer may face orders and penalties</li>
                  <li>• You can pursue internal remedies, settlement, or wrongful dismissal</li>
                  <li>• Constructive dismissal claim if forced to quit</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Constructive Dismissal</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h4 className="font-bold text-yellow-800 mb-4">If Harassment Forces You to Resign:</h4>
              <div className="space-y-3 text-yellow-900 text-sm">
                <p><strong>Definition:</strong> When harassment becomes so intolerable you're forced to quit, employer has constructively dismissed you. You may be entitled to severance pay.</p>
                <p><strong>Examples:</strong> Severe harassment you reported but employer ignored; threats; physical abuse; sexual harassment; discrimination creating unbearable conditions.</p>
                <p><strong>Your Rights:</strong> Severance pay (2-3 weeks per year of service commonly), plus notice pay. Must show harassment was cause of resignation, not misconduct by you.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Harassment FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Being Harassed at Work?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">You don't have to tolerate it. Ontario law protects you. Let's file a complaint and hold your employer accountable.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Contact Now</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.humanRights} />
      </ServicePageLayout>
    </>
  );
}
