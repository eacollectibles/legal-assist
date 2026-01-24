import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, DollarSign, HelpCircle, RefreshCw, Users, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function SubletAssignmentPage() {
  const authorityItems = [
    { title: 'Sublet & Assignment Rights', description: 'Tenants have the right to request subletting or assignment. Landlords cannot unreasonably refuse.' },
    { title: 'Landlord Refusals', description: 'I challenge unreasonable refusals and help tenants exercise their right to sublet or assign.' },
    { title: 'Both Sides', description: 'I help tenants navigate the process and help landlords respond properly to requests.' }
  ];

  const processSteps = [
    { step: '1', title: 'Understand Your Rights', description: 'Determine whether sublet or assignment is appropriate for your situation.' },
    { step: '2', title: 'Proper Request', description: 'Make a written request to landlord with required information.' },
    { step: '3', title: 'Challenge Refusal', description: 'If landlord unreasonably refuses, file A2 application at LTB.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Right to Request', description: 'Landlords cannot include "no sublet" clauses.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Reasonable Standard', description: 'Refusals must be for valid reasons.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Remedies Available', description: 'LTB can order landlord to consent.' }
  ];

  const honestFAQs = [
    { question: "What's the difference between sublet and assignment?", answer: "Sublet: You're temporarily away (e.g., travel, work term) and plan to return. The subtenant takes over temporarily, you remain the tenant and are responsible. Assignment: You're leaving permanently. The new person takes over your tenancy completely; you're no longer the tenant." },
    { question: "Can my landlord refuse a sublet or assignment?", answer: "They can only refuse for valid reasons—the proposed person has poor rental history, can't afford the rent, or similar legitimate concerns. They CANNOT refuse just because they don't want to allow sublets, or to try to get a higher-paying tenant." },
    { question: "What if my lease says 'no subletting'?", answer: "That clause is void and unenforceable in Ontario. The RTA gives tenants the right to request sublet or assignment regardless of what the lease says. Landlords cannot contract out of this right." },
    { question: "What happens if landlord doesn't respond?", answer: "If landlord doesn't respond within 7 days of your written request, they're deemed to have consented. Document when you sent the request and follow up in writing if no response." },
    { question: "Can landlord charge a fee for consent?", answer: "Only for assignment (not sublet), and only to cover reasonable costs of credit checks and processing—typically $50-100 maximum. They cannot charge profit-making fees or 'assignment fees.'" },
    { question: "What if I just want to leave mid-lease?", answer: "If landlord refuses assignment, you can give 30 days notice and leave. The landlord cannot pursue you for remaining lease term if they unreasonably refused assignment. This is your 'out' if they won't cooperate." }
  ];

  return (
    <>
      <SEO title="Sublet & Assignment Help Ontario | Tenant Rights Paralegal" description="Licensed paralegal for subletting and lease assignment in Ontario. Landlord refusals, tenant rights, proper procedures. Free consultation." canonical="https://www.legalassist.london/services/sublet-assignment" />
      <ServicePageLayout seoTitle="Sublet & Assignment Rights | Ontario" seoDescription="Sublet and lease assignment help in Ontario." canonical="https://www.legalassist.london/services/sublet-assignment" problemHeadline="Sublet & Lease Assignment in Ontario" problemDescription="Need to leave your rental temporarily or permanently? You have the right to sublet or assign your lease. Landlords cannot unreasonably refuse." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Sublet assignment" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Sublet vs. Assignment</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <RefreshCw className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-bold text-blue-800 mb-3 text-xl">SUBLET</h3>
                <ul className="text-blue-900 text-sm space-y-2">
                  <li><strong>When:</strong> You're leaving temporarily and plan to return</li>
                  <li><strong>Examples:</strong> Work term, travel, sabbatical</li>
                  <li><strong>You remain:</strong> The tenant, responsible to landlord</li>
                  <li><strong>Subtenant:</strong> Pays you, you pay landlord</li>
                  <li><strong>Your return:</strong> Subtenant must leave when you return</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <Users className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-bold text-green-800 mb-3 text-xl">ASSIGNMENT</h3>
                <ul className="text-green-900 text-sm space-y-2">
                  <li><strong>When:</strong> You're leaving permanently</li>
                  <li><strong>Examples:</strong> Moving, job relocation, buying home</li>
                  <li><strong>You leave:</strong> New person becomes the tenant</li>
                  <li><strong>Assignee:</strong> Takes over your lease completely</li>
                  <li><strong>Your responsibility:</strong> Ends upon assignment</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">The Process</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <ol className="text-foreground/80 space-y-3">
                <li><strong>1. Written Request:</strong> Send landlord a written request to sublet or assign, identifying the proposed person</li>
                <li><strong>2. Landlord Response:</strong> Landlord has 7 days to respond. No response = deemed consent</li>
                <li><strong>3. If Refused:</strong> Landlord must have a valid reason. Challenge unreasonable refusals at LTB</li>
                <li><strong>4. If Assigned:</strong> Landlord can charge reasonable processing fee (not sublet)</li>
              </ol>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Valid vs. Invalid Refusal Reasons</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Valid Reasons to Refuse:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Poor rental history / evictions</li>
                  <li>• Cannot afford the rent</li>
                  <li>• Problematic references</li>
                  <li>• Legitimate screening concerns</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">NOT Valid Reasons:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• "I don't allow sublets"</li>
                  <li>• Want to re-rent at higher price</li>
                  <li>• Don't want new tenant</li>
                  <li>• No reason given</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Your Exit Option</h4>
              <p className="text-yellow-900 text-sm">If landlord unreasonably refuses assignment, you can give 30 days notice and leave—even mid-lease. The landlord cannot pursue you for remaining lease term because they caused the situation by refusing.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Sublet/Assignment FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Need to Sublet or Assign?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">I can help you navigate the process and challenge unreasonable refusals.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
