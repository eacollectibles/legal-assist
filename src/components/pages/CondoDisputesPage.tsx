import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Clock, Shield, Scale, Phone } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function CondoDisputesPage() {
  const authorityItems = [
    { title: 'Condominium Authority Tribunal (CAT) Experience', description: 'I represent unit owners in disputes with condo boards. CAT is the right forum for most disputes in Ontario.' },
    { title: 'Broad CAT Practice', description: 'Board violations, common element damage, pet/noise restrictions, access to records, compliance orders, special assessments—I handle all types.' },
    { title: 'Strategic Board Negotiation', description: 'Many disputes settle before CAT. I know how to pressure boards into reasonable resolutions.' }
  ];

  const processSteps = [
    { step: '1', title: 'Document the Dispute', description: 'Gather board decisions, letters, notices, rules violated, and proof of harm.' },
    { step: '2', title: 'Demand Letter', description: 'Send formal letter demanding resolution. Many boards back down or negotiate.' },
    { step: '3', title: 'CAT Application or Settlement', description: 'File with CAT if settlement fails. Most cases resolve before hearing.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'CAT Is Affordable', description: 'Filing fees are modest ($50–$150). No lawyers required—cost-effective process.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Boards Often Violate Rules', description: 'Many board decisions lack proper procedure, violate bylaws, or exceed authority.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'CAT Decisions Are Binding', description: 'CAT rulings are enforceable and often result in board compensation or rule changes.' }
  ];

  const honestFAQs = [
    { question: "What is the Condominium Authority Tribunal (CAT)?", answer: "CAT is Ontario's specialized tribunal for condo disputes. Created in 2017, it replaced court for most condo matters. It handles disagreements between unit owners and boards, board procedure violations, and common element disputes. Decisions are binding and enforceable." },
    { question: "What disputes can CAT handle?", answer: "Board bylaw enforcement, pet restrictions, noise complaints, access to records, common element damage, special assessments, compliance orders, restricted activities in units, wrongful lease violations, and failure to maintain common elements. Almost all condo disputes fit CAT jurisdiction." },
    { question: "What must the board prove for enforcement?", answer: "The board must prove: (1) a bylaw or rule exists, (2) properly published to owners, (3) you violated it, and (4) enforcement is reasonable. Many boards fail on proper notice. If they can't prove these, CAT will dismiss the complaint." },
    { question: "What defences work in CAT?", answer: "Bylaw not properly enacted, improper notice to you, enforcement against others but not you (selective enforcement), excessive or unreasonable rule, board exceeded authority, rule violates Condominium Act, or the alleged violation didn't occur. Procedure defects are common wins." },
    { question: "Can I request access to condo records?", answer: "Yes—unit owners have a statutory right to condo records: bylaws, rules, meeting minutes, financial statements, board decisions affecting your unit. Boards must provide these within 15 days or face CAT complaint. They can't hide decisions." },
    { question: "What if the board refuses CAT findings?", answer: "If the board ignores a CAT decision, you can enforce it in court or request CAT enforcement. CAT has bite—non-compliance exposes the board to further penalties and legal costs. Most boards comply." }
  ];

  return (
    <>
      <SEO title="Condo Disputes Ontario | Condominium Authority Tribunal (CAT) Representation" description="Condo disputes and CAT tribunal representation in Ontario. Board conflicts, common element issues, pet restrictions, compliance orders. Get your rights enforced." canonical="https://www.legalassist.london/services/condo-disputes" />
      <ServicePageLayout seoTitle="Condo Disputes & CAT Representation | Ontario" seoDescription="Condo disputes and CAT tribunal representation in Ontario." canonical="https://www.legalassist.london/services/condo-disputes" problemHeadline="Condo Board Disputes" problemDescription="In conflict with your condo board? Pet restrictions, noise complaints, record access, enforcement questions. The Condominium Authority Tribunal (CAT) exists for this." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Condo disputes and CAT" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>

        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Condo Board Disputes & CAT Process</h2>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                CAT Is Your Right
              </h3>
              <p className="text-blue-900">The Condominium Act gives you the right to challenge board decisions. CAT exists to enforce that right affordably and quickly. Many boards count on owners not knowing this.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Condo Disputes</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Dispute Type</th>
                    <th className="px-6 py-4 text-left font-heading">What It Involves</th>
                    <th className="px-6 py-4 text-left font-heading">Likely Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Pet Restrictions</td><td className="px-6 py-4 text-sm">Board enforces pet bylaw against your dog/cat</td><td className="px-6 py-4 text-sm">CAT reviews if bylaw notice was proper and reasonable</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Noise Complaints</td><td className="px-6 py-4 text-sm">Board alleges excessive noise; threatens enforcement</td><td className="px-6 py-4 text-sm">Board must prove violation; selective enforcement fails</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Common Element Damage</td><td className="px-6 py-4 text-sm">Water damage, mold, major defect in shared areas</td><td className="px-6 py-4 text-sm">Board must fund repair; you may claim contribution recovery</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Records Access Denial</td><td className="px-6 py-4 text-sm">Board refuses to provide bylaws, minutes, financials</td><td className="px-6 py-4 text-sm">CAT orders disclosure; board fined</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Compliance Orders</td><td className="px-6 py-4 text-sm">Board issues order to fix unit or remove item</td><td className="px-6 py-4 text-sm">CAT reviews if order is reasonable and properly issued</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Condo Act Protections You Have</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Your Rights as Unit Owner:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Access to all condo records & documents</li>
                  <li>• Challenge improper board decisions</li>
                  <li>• Enforce board duty to maintain common areas</li>
                  <li>• Question selective enforcement</li>
                  <li>• Challenge unreasonable bylaws/rules</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Board Limitations:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Cannot enforce rules not in bylaws</li>
                  <li>• Cannot apply rules selectively</li>
                  <li>• Must give proper notice before enforcement</li>
                  <li>• Cannot exceed authority under Condo Act</li>
                  <li>• Must disclose material information</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">The CAT Process Step-by-Step</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h4 className="font-bold text-yellow-800 mb-3">How CAT Works:</h4>
              <ol className="text-yellow-900 text-sm space-y-2">
                <li><strong>1. Demand Letter:</strong> We send formal letter to board requesting resolution. Many disputes settle here.</li>
                <li><strong>2. File CAT Application:</strong> If no settlement, file with CAT. Low filing fee ($50–$150).</li>
                <li><strong>3. Mediation (optional):</strong> CAT offers mediation to resolve without full hearing.</li>
                <li><strong>4. Evidence Exchange:</strong> Both sides submit written arguments and evidence.</li>
                <li><strong>5. Hearing (if needed):</strong> CAT adjudicator hears case (online or in-person).</li>
                <li><strong>6. Decision:</strong> CAT issues binding decision. Most cases settle before this.</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Condo Disputes FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">In Conflict with Your Condo Board?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">CAT exists to enforce your rights. Let's explore your options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Contact Now</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
