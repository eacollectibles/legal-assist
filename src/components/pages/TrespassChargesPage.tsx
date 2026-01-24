import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Ban, Home, Building, Shield } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function TrespassChargesPage() {
  const authorityItems = [
    { title: 'Trespass Defence', description: 'I defend trespass charges under the Trespass to Property Act. These are provincial offences—not criminal charges.' },
    { title: 'Common Situations', description: 'Banned from store and returned, asked to leave and didn\'t, entered prohibited property—all can result in charges.' },
    { title: 'Defence Options', description: 'Implied permission, inadequate notice, colour of right—defences exist depending on circumstances.' }
  ];

  const processSteps = [
    { step: '1', title: 'Review Circumstances', description: 'How were you notified? What was the prohibition?' },
    { step: '2', title: 'Build Defence', description: 'Challenge notice adequacy or argue permitted entry.' },
    { step: '3', title: 'Resolve', description: 'Trial, negotiate withdrawal, or early resolution.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Provincial Offence', description: 'Not criminal—no criminal record.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Defences Exist', description: 'Notice and permission issues common.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Can Escalate', description: 'Repeated violations treated more seriously.' }
  ];

  const honestFAQs = [
    { question: "Is trespass a criminal charge?", answer: "No. Trespass to Property Act charges are provincial offences—like traffic tickets. Conviction results in a fine, not a criminal record. However, there's also Criminal Code trespass at night (s. 177), which is criminal. Know which charge you're facing." },
    { question: "What are the penalties for trespass?", answer: "First offence: up to $2,000 fine (set fine typically $65). Repeat offences or aggravated circumstances: up to $10,000. No jail for provincial trespass. Can also result in extended prohibition from the property." },
    { question: "I was banned from a store and went back. Is that trespass?", answer: "Likely yes. Once you receive notice (verbal or written) that you're prohibited from entering, returning is trespass. The ban doesn't have to be in writing—verbal notice from someone in authority is sufficient." },
    { question: "What defences work for trespass?", answer: "Inadequate notice (didn't understand prohibition, wasn't properly communicated), implied permission (property appeared open to public), colour of right (believed you had legal right to enter), necessity (emergency circumstances)." },
    { question: "I didn't see any 'No Trespassing' signs. Can I still be charged?", answer: "Signs aren't required if you received direct notice (told to leave, given a ban letter). For properties without direct notice, adequate signage or markings may be required. But once you're personally told, signs don't matter." },
    { question: "How long does a trespass ban last?", answer: "Depends on the property owner. Can be temporary, permanent, or until rescinded. Stores often issue permanent bans. You can request the ban be lifted, but they're not obligated to agree." }
  ];

  return (
    <>
      <SEO title="Trespass Charges Defence Paralegal Ontario | Trespass to Property Act" description="Licensed paralegal defending trespass charges in Ontario. Provincial offence, not criminal. Banned from store, asked to leave. Free consultation." canonical="https://www.legalassist.london/services/trespass-charges" />
      <ServicePageLayout seoTitle="Trespass Defence | Ontario" seoDescription="Trespass charge defence in Ontario." canonical="https://www.legalassist.london/services/trespass-charges" problemHeadline="Trespass Charges" problemDescription="Charged with trespass? This is a provincial offence—not criminal. I help defend these charges and challenge improper prohibition notices." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Trespass charges" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Trespass Charges</h2>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Not a Criminal Charge
              </h3>
              <p className="text-green-900">Trespass to Property Act charges are provincial offences. Conviction results in a fine—not a criminal record. This is different from Criminal Code trespass at night, which is criminal.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Types of Trespass</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Type</th>
                    <th className="px-6 py-4 text-left font-heading">Description</th>
                    <th className="px-6 py-4 text-left font-heading">Common Examples</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Entry when prohibited</td><td className="px-6 py-4 text-sm">Entering property after receiving notice not to</td><td className="px-6 py-4 text-sm">Returning to store after ban</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Fail to leave</td><td className="px-6 py-4 text-sm">Remaining after being asked to leave</td><td className="px-6 py-4 text-sm">Refusing to leave establishment</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Engage in prohibited activity</td><td className="px-6 py-4 text-sm">Doing something specifically prohibited on property</td><td className="px-6 py-4 text-sm">Skateboarding where banned</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">How Prohibition Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6">
                <Ban className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Valid Notice Can Be:</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Verbal (told by owner, security, police)</li>
                  <li>• Written (ban letter, notice)</li>
                  <li>• Posted signs (if clear and visible)</li>
                  <li>• Markings (red circles on trees)</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <Building className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Who Can Prohibit:</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Property owner</li>
                  <li>• Person in charge of property</li>
                  <li>• Authorized agent (security, manager)</li>
                  <li>• Police officer on their behalf</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Defence Strategies</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
              <h4 className="font-bold text-green-800 mb-2">Possible Defences:</h4>
              <ul className="text-green-900 text-sm space-y-2">
                <li>✓ No valid notice received (didn't understand, language barrier)</li>
                <li>✓ Implied permission (property appeared open to public)</li>
                <li>✓ Colour of right (believed had legal right to be there)</li>
                <li>✓ Notice expired or was rescinded</li>
                <li>✓ Necessity (emergency circumstances)</li>
                <li>✓ Identity issues (wasn't the person prohibited)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Trespass FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Facing Trespass Charges?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let me review your case and explain your defence options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Case Review</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.criminal} />
      </ServicePageLayout>
    </>
  );
}
