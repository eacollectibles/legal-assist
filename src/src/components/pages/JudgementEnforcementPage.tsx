import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, DollarSign, Building, CreditCard, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function JudgementEnforcementPage() {
  const authorityItems = [
    { title: 'Judgment Enforcement', description: 'Won your case but haven\'t been paid? I help enforce judgments and actually collect what you\'re owed.' },
    { title: 'Multiple Tools', description: 'Wage garnishment, bank garnishment, examination hearings, writs, and more.' },
    { title: 'Realistic Assessment', description: 'I\'ll tell you honestly whether the judgment is collectible or if the debtor is judgment-proof.' }
  ];

  const processSteps = [
    { step: '1', title: 'Asset Discovery', description: 'Examination hearing to find income, bank accounts, property.' },
    { step: '2', title: 'Choose Methods', description: 'Select appropriate enforcement tools based on assets.' },
    { step: '3', title: 'Execute & Collect', description: 'File enforcement documents and pursue collection.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Powerful Tools', description: 'Courts provide real enforcement mechanisms.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Long Validity', description: 'Judgments valid 6 years, renewable.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Reality Check', description: 'Can\'t get blood from a stone.' }
  ];

  const honestFAQs = [
    { question: "I won but they won't pay. Now what?", answer: "Winning is step one—collection is step two. You need to discover their assets (examination hearing), then use appropriate enforcement tools. Some debtors pay to avoid enforcement hassle; others require aggressive collection." },
    { question: "What if they have no money?", answer: "This is the hard truth: a judgment against someone with no job, no bank account, and no property is worth the paper it's printed on. I'll assess collectability honestly before you spend money on enforcement." },
    { question: "What are my enforcement options?", answer: "Wage garnishment (~20% of net pay), bank account garnishment, examination under oath, writ of seizure (property), construction lien on real estate. Choice depends on what assets/income they have." },
    { question: "How does wage garnishment work?", answer: "File documents with the sheriff, serve employer. Employer must deduct ~20% of net wages until judgment paid. Only works if debtor has employment. Self-employed people are harder to garnish." },
    { question: "Can I garnish their bank account?", answer: "Yes, but you need to know which bank they use. Examination hearing can reveal this. Note: some funds are exempt (social assistance, first ~$2,000 in some cases)." },
    { question: "How long is a judgment good for?", answer: "6 years, but can be renewed. Interest accrues at the post-judgment rate. Sometimes waiting until debtor's circumstances improve (gets job, inherits money) is the smart play." }
  ];

  return (
    <>
      <SEO title="Judgment Enforcement Paralegal Ontario | Debt Collection" description="Licensed paralegal for judgment enforcement in Ontario. Wage garnishment, bank garnishment, debt collection. Turn your judgment into cash. Free consultation." canonical="https://www.legalassist.london/services/judgement-enforcement" />
      <ServicePageLayout seoTitle="Judgment Enforcement | Ontario" seoDescription="Turn your court judgment into actual payment." canonical="https://www.legalassist.london/services/judgement-enforcement" problemHeadline="Judgment Enforcement" problemDescription="Won your court case but still haven't been paid? A judgment is just paper until you enforce it. I help turn judgments into actual money." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Judgment enforcement" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Enforcement Options</h2>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                The Honest Truth About Collection
              </h3>
              <p className="text-yellow-900">Before spending money on enforcement, let's assess collectability. If the debtor has no job, no bank account, and no property, enforcement costs money without results. Sometimes patience pays—circumstances change.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Enforcement Tools</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Tool</th>
                    <th className="px-6 py-4 text-left font-heading">How It Works</th>
                    <th className="px-6 py-4 text-left font-heading">Best When</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-6 py-4 font-medium">Wage Garnishment</td>
                    <td className="px-6 py-4 text-sm">~20% of net wages taken automatically</td>
                    <td className="px-6 py-4 text-sm">Debtor has steady job</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Bank Garnishment</td>
                    <td className="px-6 py-4 text-sm">Funds seized from bank account</td>
                    <td className="px-6 py-4 text-sm">Know which bank, has balance</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Examination Hearing</td>
                    <td className="px-6 py-4 text-sm">Under oath questioning about assets</td>
                    <td className="px-6 py-4 text-sm">Don't know their assets</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Writ of Seizure</td>
                    <td className="px-6 py-4 text-sm">Sheriff seizes personal property</td>
                    <td className="px-6 py-4 text-sm">Has valuable property</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Writ on Property</td>
                    <td className="px-6 py-4 text-sm">Lien registered against real estate</td>
                    <td className="px-6 py-4 text-sm">Owns home/land</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Collectability Assessment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Good Signs:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Employed (especially by large employer)</li>
                  <li>• Owns real estate</li>
                  <li>• Has business/self-employed</li>
                  <li>• Known bank accounts</li>
                  <li>• Reputation to protect</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Warning Signs:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Unemployed / cash jobs</li>
                  <li>• No property ownership</li>
                  <li>• Already in collections/bankruptcy</li>
                  <li>• Receiving social assistance</li>
                  <li>• Left the province/country</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Exempt Funds</h3>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <p className="text-foreground/80 text-sm mb-3">Certain funds cannot be garnished:</p>
              <ul className="text-foreground/80 text-sm space-y-1">
                <li>• Ontario Works and ODSP payments</li>
                <li>• CPP, OAS, and GIS</li>
                <li>• Employment Insurance (partially)</li>
                <li>• Child support/child benefit payments</li>
                <li>• First ~$2,500 in bank account (some cases)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Enforcement FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Have a Judgment to Enforce?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let's assess collectability and develop an enforcement strategy.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.smallClaims} />
      </ServicePageLayout>
    </>
  );
}
