import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Clock, FileText, Scale, AlertCircle } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function BeingSuedGuidePage() {
  const authorityItems = [
    { title: 'Defence Representation', description: 'I help people respond to Small Claims Court claims and defend against lawsuits up to $35,000.' },
    { title: 'Deadline Protection', description: 'You have limited time to respond. Missing deadlines can result in automatic judgment against you.' },
    { title: 'Strategic Options', description: 'Dispute the claim, counterclaim, negotiate settlement, or challenge jurisdiction.' }
  ];

  const processSteps = [
    { step: '1', title: 'Don\'t Panic', description: 'Being sued is stressful but you have rights and options.' },
    { step: '2', title: 'Note Deadlines', description: 'You have 20 days to file a Defence (30 if outside Ontario).' },
    { step: '3', title: 'Get Help', description: 'Contact a paralegal to assess the claim and prepare your response.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'You Have Rights', description: 'Plaintiffs must prove their case—you\'re presumed not liable.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Defence Options', description: 'Deny the claim, raise defences, or file your own claim.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Settlement Possible', description: 'Many cases settle before trial.' }
  ];

  const honestFAQs = [
    { question: "I just got served with a claim. What do I do?", answer: "First: note the date you were served—your deadline runs from this date. Second: read the claim carefully to understand what's being alleged. Third: contact a paralegal immediately. You have 20 days to file a Defence." },
    { question: "What happens if I don't respond?", answer: "The plaintiff can get a default judgment against you without a trial. You'll owe the full amount claimed plus costs, and they can enforce through garnishment, property liens, etc. ALWAYS respond." },
    { question: "What if the claim is wrong or unfair?", answer: "File a Defence disputing the allegations. Just because someone sues you doesn't mean they're right. They have to prove their case—and many claims have weaknesses you can exploit." },
    { question: "Can I sue them back?", answer: "Yes—you can file a Defendant's Claim (counterclaim) if you have your own claims against the plaintiff arising from the same situation or related matters." },
    { question: "What are my realistic options?", answer: "Defend vigorously if the claim is weak, negotiate settlement if there's exposure, admit liability and dispute amount if appropriate, or challenge jurisdiction/limitation period if applicable." },
    { question: "How much will this cost me?", answer: "Defending is generally less expensive than suing. Filing a Defence costs $73. My fees depend on complexity. Often settling early is cheaper than fighting—I'll give you an honest cost-benefit analysis." }
  ];

  return (
    <>
      <SEO title="Being Sued in Small Claims Court Ontario | What To Do Guide" description="Guide to being sued in Ontario Small Claims Court. Deadlines, defence options, what to expect. Don't miss your 20-day deadline. Free consultation." canonical="https://www.legalassist.london/guides/being-sued" />
      <ServicePageLayout seoTitle="Being Sued: What To Do | Ontario" seoDescription="Guide to being sued in Small Claims Court." canonical="https://www.legalassist.london/guides/being-sued" problemHeadline="Being Sued in Small Claims Court?" problemDescription="Don't panic, but don't ignore it either. You have 20 days to respond. Missing this deadline means automatic judgment against you." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Being sued guide" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">What To Do When You're Sued</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                Critical: 20-Day Deadline
              </h3>
              <p className="text-red-900">You have 20 days from being served to file a Defence. Miss this deadline and the plaintiff can get judgment against you automatically—no trial needed. Don't wait.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Step-by-Step Guide</h3>
            <div className="space-y-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-foreground mb-2">Note the Date You Were Served</h4>
                    <p className="text-foreground/80 text-sm">This starts your 20-day clock. Write it down. If served by mail, add 5 days.</p>
                  </div>
                </div>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-foreground mb-2">Read the Claim Carefully</h4>
                    <p className="text-foreground/80 text-sm">Understand what they're claiming, how much, and what evidence they mention. Look for weaknesses.</p>
                  </div>
                </div>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-foreground mb-2">Gather Your Evidence</h4>
                    <p className="text-foreground/80 text-sm">Contracts, emails, texts, photos, receipts—anything relevant to your defence.</p>
                  </div>
                </div>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-foreground mb-2">Contact a Paralegal</h4>
                    <p className="text-foreground/80 text-sm">Get professional assessment of the claim and help preparing your Defence. Time is limited.</p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Your Defence Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Full Defence</h4>
                <p className="text-green-900 text-sm">Deny the claim entirely. Plaintiff must prove their case. If their evidence is weak, you may win.</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <Scale className="w-6 h-6 text-blue-600 mb-2" />
                <h4 className="font-bold text-blue-800 mb-2">Partial Defence</h4>
                <p className="text-blue-900 text-sm">Admit some facts but dispute amount or liability. Often the honest approach when there's partial exposure.</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <FileText className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">Counterclaim</h4>
                <p className="text-yellow-900 text-sm">Sue them back for your own claims. Can be same incident or related matters.</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-purple-600 mb-2" />
                <h4 className="font-bold text-purple-800 mb-2">Technical Defences</h4>
                <p className="text-purple-900 text-sm">Limitation period expired, wrong jurisdiction, improper service, lack of standing.</p>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What NOT To Do</h3>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <ul className="text-red-900 space-y-2">
                <li className="flex items-start gap-2"><XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" /> <span>Don't ignore the claim hoping it goes away</span></li>
                <li className="flex items-start gap-2"><XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" /> <span>Don't wait until the last day to act</span></li>
                <li className="flex items-start gap-2"><XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" /> <span>Don't contact the plaintiff to argue without legal advice</span></li>
                <li className="flex items-start gap-2"><XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" /> <span>Don't destroy evidence that might be relevant</span></li>
                <li className="flex items-start gap-2"><XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" /> <span>Don't assume the claim is correct just because it's in court documents</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Being Sued FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Being Sued? Act Now.</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Your deadline is running. Let me review the claim and help you respond.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get Help Today</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.smallClaims} />
      </ServicePageLayout>
    </>
  );
}
