import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Home, DollarSign, Shield, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function SocialAssistanceDiscriminationPage() {
  const authorityItems = [
    { title: 'Social Assistance Protected', description: 'Receipt of public assistance (Ontario Works, ODSP) is a protected ground under Ontario\'s Human Rights Code in housing.' },
    { title: '"No ODSP" Is Illegal', description: 'Landlords cannot advertise "no ODSP" or refuse tenants because they receive social assistance. This is discrimination.' },
    { title: 'Housing Focus', description: 'Protection applies in housing. If a landlord asks your income source and refuses because it\'s social assistance, that\'s discrimination.' }
  ];

  const processSteps = [
    { step: '1', title: 'Document Refusal', description: 'Save ads, communications, refusal reasons.' },
    { step: '2', title: 'Note Income Source Question', description: 'Did they ask about your income source?' },
    { step: '3', title: 'File HRTO', description: 'Application within 1 year of discrimination.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Protected in Housing', description: 'Can\'t refuse for ODSP/OW.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Common Violation', description: 'Many landlords break this law.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Evidence Matters', description: 'Document discriminatory statements.' }
  ];

  const honestFAQs = [
    { question: "Can a landlord refuse to rent to me because I'm on ODSP?", answer: "No. Receipt of public assistance is a protected ground in housing. Landlords cannot refuse you solely because your income comes from ODSP, Ontario Works, or other social assistance. If they do, it's human rights discrimination." },
    { question: "The ad says 'No ODSP.' Is that legal?", answer: "No. Advertising 'No ODSP,' 'No Ontario Works,' or similar is discriminatory on its face. Screenshot these ads—they're evidence of discrimination. Even if you didn't apply, you may have a complaint for discriminatory advertising." },
    { question: "Landlord asked where my income comes from. Is that allowed?", answer: "Landlords can verify you can afford the rent. But asking specifically about income SOURCE (employment vs assistance) invites discrimination. If they refuse after learning you're on ODSP, that's likely discrimination—they should be assessing ability to pay, not source." },
    { question: "I can afford the rent with my ODSP. Why do they still refuse?", answer: "Prejudice. Some landlords assume ODSP recipients are bad tenants—this is stereotyping and illegal. If you can demonstrate you can afford the rent and they still refuse, the refusal is likely discriminatory." },
    { question: "What damages can I get for housing discrimination?", answer: "General damages for injury to dignity (typically $5,000-$25,000+ depending on severity), compensation for expenses (having to find alternative housing, temporary accommodations), and orders requiring the landlord to rent to you or change practices." },
    { question: "Do I have to prove the landlord said 'I won't rent to ODSP'?", answer: "Direct statements help but aren't required. Circumstantial evidence works: they accepted you initially, learned about ODSP, then refused; they have a pattern of refusing ODSP recipients; the ad said no social assistance. Build the inference." }
  ];

  return (
    <>
      <SEO title="ODSP Housing Discrimination Paralegal Ontario | Social Assistance Refused" description="Licensed paralegal for social assistance housing discrimination in Ontario. ODSP, Ontario Works recipient refused rental. HRTO applications. Free consultation." canonical="https://www.legalassist.london/services/social-assistance-discrimination" />
      <ServicePageLayout seoTitle="Social Assistance Discrimination | Ontario" seoDescription="Social assistance discrimination help in Ontario." canonical="https://www.legalassist.london/services/social-assistance-discrimination" problemHeadline="Social Assistance Discrimination" problemDescription="Refused housing because you're on ODSP or Ontario Works? This is illegal discrimination. Receipt of public assistance is protected in Ontario housing." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Social assistance discrimination" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding the Protection</h2>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Receipt of Public Assistance Is Protected
              </h3>
              <p className="text-green-900">"Receipt of public assistance" is a protected ground under Ontario's Human Rights Code for housing. This includes: Ontario Works, ODSP, Old Age Security, CPP Disability, and other government income support programs.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What's Discrimination?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Discriminatory:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• "No ODSP" in listing</li>
                  <li>• "Must have employment income"</li>
                  <li>• Refusing after learning income source</li>
                  <li>• Requiring employed guarantor for ODSP</li>
                  <li>• Different deposit rules for assistance</li>
                  <li>• "Social assistance not accepted"</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Permitted:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Verifying you can afford rent</li>
                  <li>• Credit check (applied to all)</li>
                  <li>• References (applied to all)</li>
                  <li>• Choosing based on non-discriminatory factors</li>
                  <li>• Refusing for legitimate rental history issues</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Building Your Case</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-8">
              <h4 className="font-bold text-foreground mb-3">Evidence to Collect:</h4>
              <ul className="text-foreground/80 space-y-2">
                <li>✓ Screenshots of discriminatory ads ("No ODSP")</li>
                <li>✓ Emails/texts showing income source questions</li>
                <li>✓ Communications showing refusal after disclosing</li>
                <li>✓ Proof you can afford the rent</li>
                <li>✓ Any discriminatory statements (record if legal)</li>
                <li>✓ Witness statements if available</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">You Don't Need Direct Proof</h4>
              <p className="text-yellow-900 text-sm">Human rights cases can be proven by inference. If landlord was interested, learned about ODSP, then suddenly wasn't interested—that pattern supports discrimination even without explicit statements.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Social Assistance FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Refused Housing for Being on Assistance?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">This is illegal. Let me help you file a human rights complaint.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.humanRights} />
      </ServicePageLayout>
    </>
  );
}
