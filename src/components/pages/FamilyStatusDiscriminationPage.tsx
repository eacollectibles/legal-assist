import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Users, Heart, Briefcase, Home } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FamilyStatusDiscriminationPage() {
  const authorityItems = [
    { title: 'Family Status Claims', description: 'Family status is a protected ground in Ontario. Employers must accommodate childcare and elder care obligations in some circumstances.' },
    { title: 'Complex Legal Test', description: 'Family status accommodation has a specific legal test. Not every inconvenience qualifies—I help assess if your situation meets the threshold.' },
    { title: 'Employment & Housing', description: 'Family status discrimination applies to both employment (work schedules, caregiving) and housing (families with children).' }
  ];

  const processSteps = [
    { step: '1', title: 'Assess Obligation', description: 'Is the caregiving obligation substantial and unavoidable?' },
    { step: '2', title: 'Document Conflict', description: 'Show how work requirement conflicts with family duty.' },
    { step: '3', title: 'Request Accommodation', description: 'Formally request accommodation before filing claim.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Protected Ground', description: 'Family status is Code-protected.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Accommodation Duty', description: 'Employers must accommodate to undue hardship.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'High Threshold', description: 'Must be serious interference, not preference.' }
  ];

  const honestFAQs = [
    { question: "What is family status?", answer: "Being in a parent-child relationship—this includes biological, adoptive, step, and foster relationships. It also covers caring for elderly parents or other dependent family members in some interpretations." },
    { question: "When must an employer accommodate family status?", answer: "When a workplace rule or requirement seriously interferes with a substantial parental or family obligation. You must show: (1) the obligation is substantial (legal duty, not preference), (2) you've made reasonable efforts to self-accommodate, and (3) the workplace rule seriously interferes." },
    { question: "My employer changed my shift and I can't find childcare. Is that discrimination?", answer: "Potentially. If the shift change makes it impossible to meet childcare obligations despite reasonable efforts on your part, and no accommodation is offered, this may be discrimination. Key: did you try to find solutions? Did you request accommodation?" },
    { question: "What about 'no children' rules in housing?", answer: "Illegal. Landlords cannot refuse to rent to families with children or impose rules like 'adults only' buildings. Children are protected under family status in housing. Only legitimate exemptions (seniors housing with specific criteria) may apply." },
    { question: "Do I have to prove I have no other options?", answer: "You must show you made reasonable efforts to find alternatives before claiming accommodation. If you haven't tried to adjust your own situation first, your claim is weaker. Employers aren't required to solve problems you haven't attempted to address." },
    { question: "What accommodation might be required?", answer: "Flexible scheduling, shift changes, modified hours, work-from-home options, or other adjustments that allow you to meet family obligations. Employer must accommodate to undue hardship—not just until inconvenient." }
  ];

  return (
    <>
      <SEO title="Family Status Discrimination Paralegal Ontario | Childcare Accommodation" description="Licensed paralegal for family status discrimination in Ontario. Childcare conflicts, elder care, accommodation. HRTO applications. Free consultation." canonical="https://www.legalassist.london/services/family-status-discrimination" />
      <ServicePageLayout seoTitle="Family Status Discrimination | Ontario" seoDescription="Family status discrimination help in Ontario." canonical="https://www.legalassist.london/services/family-status-discrimination" problemHeadline="Family Status Discrimination" problemDescription="Penalized at work for childcare or elder care obligations? Refused housing because you have children? Family status is protected. I help file HRTO claims." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Family status discrimination" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Family Status Discrimination</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">The Legal Test</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <p className="text-foreground/80 mb-4">To establish family status discrimination, you must show:</p>
              <ol className="text-foreground/80 space-y-3">
                <li><span className="font-bold">1. Substantial family obligation:</span> A legal or serious duty (childcare, elder care), not just a preference</li>
                <li><span className="font-bold">2. Self-accommodation efforts:</span> You tried reasonable alternatives first</li>
                <li><span className="font-bold">3. Serious interference:</span> The workplace requirement makes meeting the obligation impossible or extremely difficult</li>
                <li><span className="font-bold">4. Requested accommodation:</span> You asked for accommodation before adverse consequences</li>
              </ol>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Employment Context</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">May Require Accommodation:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Shift changes causing childcare impossibility</li>
                  <li>• Elder care appointments during work</li>
                  <li>• School pickup with no alternatives</li>
                  <li>• Child's medical appointments</li>
                  <li>• New shift pattern conflicting with custody</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">Likely Won't Qualify:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• Preferring certain hours for convenience</li>
                  <li>• Haven't tried to find solutions</li>
                  <li>• Activities (not obligations)</li>
                  <li>• Partner could handle it</li>
                  <li>• Minor scheduling inconvenience</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Housing Context</h3>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <Home className="w-8 h-8 text-red-600 mb-3" />
              <h4 className="font-bold text-red-800 mb-2">Landlords Cannot:</h4>
              <ul className="text-red-900 text-sm space-y-2">
                <li>• Refuse to rent because you have children</li>
                <li>• Advertise "adults only" or "no children"</li>
                <li>• Limit number of occupants below legal standards</li>
                <li>• Charge more because of children</li>
                <li>• Create rules targeting families with children</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Request Accommodation First</h4>
              <p className="text-yellow-900 text-sm">Before filing an HRTO claim, you should formally request accommodation in writing. Explain your family obligation, what conflict exists, and what accommodation you're seeking. Give the employer a chance to respond. This strengthens your claim if they refuse.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Family Status FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Family Status Issue?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let me assess if your situation meets the legal test for accommodation.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.humanRights} />
      </ServicePageLayout>
    </>
  );
}
