import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Clock, Shield, Scale, Phone } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function BailHearingsPage() {
  const authorityItems = [
    { title: 'Bail Hearing Support', description: 'I provide support at bail hearings to help secure release. When you need someone released quickly, I can help.' },
    { title: 'Release Planning', description: 'Building strong release plans with sureties, conditions, and supervision that courts accept.' },
    { title: 'POA Experience', description: 'As a paralegal, I handle Provincial Offences Act matters. For criminal charges, I work alongside criminal lawyers.' }
  ];

  const processSteps = [
    { step: '1', title: 'Immediate Contact', description: 'Call as soon as someone is arrested—timing matters.' },
    { step: '2', title: 'Release Plan', description: 'Develop release plan with surety, address, conditions.' },
    { step: '3', title: 'Hearing', description: 'Present release plan to court and seek release.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Presumption of Release', description: 'Most accused are entitled to release.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Multiple Options', description: 'Undertaking, recognizance, surety release.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Quick Hearings', description: 'Must be held within 24-48 hours.' }
  ];

  const honestFAQs = [
    { question: "What happens at a bail hearing?", answer: "The Crown explains why detention is necessary. Defence presents a release plan. Justice of the Peace decides: release on undertaking (promise), release with surety (someone pledges money), or detention. Most accused are released." },
    { question: "What is a surety?", answer: "Someone who pledges to supervise the accused and pledges money (they don't pay upfront, but risk forfeiting it if accused breaches). Sureties must be Canadian residents with no criminal record and understand the charges and conditions." },
    { question: "What conditions are common?", answer: "Keep the peace, report to police, stay away from victim/witnesses, live at specific address, curfew, no weapons, no alcohol/drugs, surrender passport, house arrest with exceptions." },
    { question: "What if bail is denied?", answer: "Can seek bail review in Superior Court. New information or changed circumstances can help. Some people remain detained until trial—this is why getting it right at the first hearing is critical." },
    { question: "How quickly does this happen?", answer: "If not released by police, bail hearing within 24 hours (or next court day). Weekends can cause delays. The sooner you contact a lawyer/paralegal, the better prepared the hearing will be." },
    { question: "What increases chances of release?", answer: "Strong surety (financially stable, understands role), stable address, employment/school, plan to address underlying issues (counselling, treatment), minimal criminal history, non-violent charges." }
  ];

  return (
    <>
      <SEO title="Bail Hearing Support Ontario | Release From Custody" description="Bail hearing support in Ontario. Surety preparation, release planning. Help getting released from custody. Contact immediately." canonical="https://www.legalassist.london/services/bail-hearings" />
      <ServicePageLayout seoTitle="Bail Hearing Support | Ontario" seoDescription="Bail hearing support in Ontario." canonical="https://www.legalassist.london/services/bail-hearings" problemHeadline="Bail Hearing Support" problemDescription="Someone arrested and needs to be released? Bail hearings happen within 24-48 hours. Call immediately for help preparing a release plan." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Bail hearings" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Bail in Ontario</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <Phone className="w-6 h-6" />
                Time Is Critical
              </h3>
              <p className="text-red-900">Bail hearings happen within 24-48 hours of arrest. The sooner legal help is involved, the better prepared the release plan will be. Call immediately.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Types of Release</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Type</th>
                    <th className="px-6 py-4 text-left font-heading">What It Means</th>
                    <th className="px-6 py-4 text-left font-heading">When Used</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Undertaking</td><td className="px-6 py-4 text-sm">Promise to appear, no money</td><td className="px-6 py-4 text-sm">Minor charges, first offence</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Recognizance (own)</td><td className="px-6 py-4 text-sm">Promise + pledge money (not paid upfront)</td><td className="px-6 py-4 text-sm">More serious, but low risk</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Surety Release</td><td className="px-6 py-4 text-sm">Third party supervises + pledges money</td><td className="px-6 py-4 text-sm">Most contested bail hearings</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Cash Deposit</td><td className="px-6 py-4 text-sm">Actual money paid to court</td><td className="px-6 py-4 text-sm">No suitable surety available</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Building a Strong Release Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Strong Release Plan Includes:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Reliable surety (employed, no record)</li>
                  <li>• Stable residence address</li>
                  <li>• Employment/school commitment</li>
                  <li>• Treatment/counselling plan if relevant</li>
                  <li>• Clear conditions addressing Crown concerns</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Factors That Hurt Release:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Prior failures to appear</li>
                  <li>• Prior breaches of conditions</li>
                  <li>• Serious charges (violence, weapons)</li>
                  <li>• No stable address</li>
                  <li>• Weak or uninformed surety</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Surety Requirements</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h4 className="font-bold text-yellow-800 mb-3">To Be a Surety, They Must:</h4>
              <ul className="text-yellow-900 text-sm space-y-2">
                <li>✓ Be a Canadian citizen or permanent resident</li>
                <li>✓ Have no criminal record (or very old/minor)</li>
                <li>✓ Have financial means to pledge (doesn't pay upfront)</li>
                <li>✓ Understand the charges and be willing to supervise</li>
                <li>✓ Know the accused well enough to supervise</li>
                <li>✓ Be prepared to call police if conditions breached</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Bail FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Need Bail Help Now?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Call immediately—timing matters for bail hearings.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Contact Now</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.criminal} />
      </ServicePageLayout>
    </>
  );
}
