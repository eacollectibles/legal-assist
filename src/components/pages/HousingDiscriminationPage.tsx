import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Home, Shield, Users, Heart } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HousingDiscriminationPage() {
  const authorityItems = [
    { title: 'Housing Rights', description: 'Landlords cannot refuse tenancy or treat tenants differently based on protected grounds.' },
    { title: 'HRTO Applications', description: 'I file Human Rights Tribunal applications for housing discrimination and harassment.' },
    { title: 'Common Issues', description: 'Refusing families with children, disability discrimination, income discrimination, and more.' }
  ];

  const processSteps = [
    { step: '1', title: 'Document Discrimination', description: 'Save communications, note what was said, gather evidence.' },
    { step: '2', title: 'Assess Options', description: 'HRTO application, LTB application, or both depending on situation.' },
    { step: '3', title: 'File & Pursue', description: 'Seek damages and orders to address the discrimination.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Broad Protection', description: 'Cannot discriminate based on protected grounds.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Includes Families', description: 'Cannot refuse families with children.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Income Source', description: 'Cannot refuse tenants receiving government assistance.' }
  ];

  const honestFAQs = [
    { question: "What is housing discrimination?", answer: "Refusing to rent, treating tenants differently, or harassing tenants based on protected grounds: race, family status (children), disability, receipt of social assistance, sex, religion, sexual orientation, gender identity, and more." },
    { question: "Can landlords refuse families with children?", answer: "No. Refusing tenants because they have children is illegal discrimination based on family status. The only narrow exception is buildings designated for seniors (55+) under specific conditions." },
    { question: "What about 'no pets' and disability?", answer: "If you need a service animal or emotional support animal due to disability, landlords must accommodate. They cannot charge pet deposits. This overrides 'no pets' clauses—but you need documentation of disability-related need." },
    { question: "Can landlords discriminate based on income source?", answer: "No. Refusing tenants because they receive Ontario Works, ODSP, or other government assistance is illegal. Income source is a protected ground under 'receipt of public assistance.'" },
    { question: "What if they say the unit is gone, but it's not?", answer: "Classic discrimination tactic. If you can prove the unit remained available after you were rejected (check listings, have someone else inquire), this is strong evidence of discrimination." },
    { question: "What compensation is available?", answer: "General damages for injury to dignity ($5,000-$30,000+ typical for housing), out-of-pocket costs incurred, and orders requiring the landlord to rent to you or change practices." }
  ];

  return (
    <>
      <SEO title="Housing Discrimination Paralegal Ontario | Tenant Rights HRTO" description="Licensed paralegal for housing discrimination claims in Ontario. Families with children, disability, income source discrimination. HRTO applications. Free consultation." canonical="https://www.legalassist.london/services/housing-discrimination" />
      <ServicePageLayout seoTitle="Housing Discrimination | Ontario" seoDescription="Housing discrimination help in Ontario." canonical="https://www.legalassist.london/services/housing-discrimination" problemHeadline="Housing Discrimination Claims" problemDescription="Refused rental because of your family, disability, income source, or other protected ground? That's illegal discrimination. I help enforce your rights." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Housing discrimination" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Housing Discrimination in Ontario</h2>
            
            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">Everyone Has the Right to Housing</h3>
              <p className="text-foreground/80">The Human Rights Code prohibits discrimination in housing. Landlords cannot refuse you, charge more, or treat you worse because of who you are.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Forms of Housing Discrimination</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <Users className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Family Status:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• "Adults only" or "no children"</li>
                  <li>• Requiring fewer occupants than legal</li>
                  <li>• Refusing pregnant applicants</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <Heart className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Disability:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Refusing service/support animals</li>
                  <li>• Not accommodating accessibility needs</li>
                  <li>• Refusing mental health conditions</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <Shield className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Income Source:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Refusing Ontario Works recipients</li>
                  <li>• Refusing ODSP recipients</li>
                  <li>• "Must have job" requirements</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <Home className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Other Protected Grounds:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Race, ethnic origin, place of origin</li>
                  <li>• Religion or creed</li>
                  <li>• Sexual orientation, gender identity</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What Landlords Can & Cannot Do</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Landlords CAN:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Ask for references</li>
                  <li>• Do credit checks</li>
                  <li>• Verify income (not source)</li>
                  <li>• Check rental history</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Landlords CANNOT:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Ask about children/family plans</li>
                  <li>• Refuse based on income source</li>
                  <li>• Refuse service animals</li>
                  <li>• Discriminate based on race, etc.</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Proving Discrimination</h4>
              <p className="text-yellow-900 text-sm">Landlords rarely say "I won't rent to you because of X." Look for: sudden unavailability after learning about protected characteristic, different treatment than others, pattern of behavior, or statements to others about their reasons.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Housing Discrimination FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Discriminated Against in Housing?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Save any evidence and let's discuss your rights and options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.humanRights} />
      </ServicePageLayout>
    </>
  );
}
