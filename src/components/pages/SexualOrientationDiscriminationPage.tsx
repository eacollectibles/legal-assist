import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Heart, Briefcase, Home, Shield } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function SexualOrientationDiscriminationPage() {
  const authorityItems = [
    { title: 'Sexual Orientation Protected', description: 'Sexual orientation is a protected ground under Ontario\'s Human Rights Code. Discrimination based on being LGBTQ+ is illegal.' },
    { title: 'Multiple Contexts', description: 'Protection applies in employment, housing, services, and contracts. Harassment based on sexual orientation is discrimination.' },
    { title: 'Pattern Evidence', description: 'Direct evidence is rare. Circumstantial evidence—comments, differential treatment, hostile environment—builds the case.' }
  ];

  const processSteps = [
    { step: '1', title: 'Document Incidents', description: 'Dates, comments, witnesses, treatment differences.' },
    { step: '2', title: 'Identify Pattern', description: 'Single incident or ongoing harassment?' },
    { step: '3', title: 'File HRTO', description: 'Application within 1 year of discrimination.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Clearly Protected', description: 'Sexual orientation is explicit ground.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Harassment Included', description: 'Hostile environment is discrimination.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Documentation Key', description: 'Build the evidentiary record.' }
  ];

  const honestFAQs = [
    { question: "What counts as sexual orientation discrimination?", answer: "Treating someone differently because they are (or are perceived to be) gay, lesbian, bisexual, or another sexual orientation. Includes: firing, not hiring, harassment, denial of promotions, housing refusal, service denial, and creating hostile environments." },
    { question: "My coworkers make homophobic 'jokes.' Is that discrimination?", answer: "Yes—this can create a poisoned work environment, which is a form of discrimination. You don't have to be directly targeted; a workplace where such jokes are tolerated is discriminatory. Document instances and report to employer." },
    { question: "I was fired after coming out. How do I prove it was discrimination?", answer: "Look for: timing (fired shortly after disclosure), pretextual reasons (sudden 'performance' issues), differential treatment (straight colleagues treated better), comments or reactions when you came out, changes in how you were treated. Circumstantial evidence builds the case." },
    { question: "My landlord won't rent to me and my same-sex partner. Is that legal?", answer: "No. Landlords cannot discriminate based on sexual orientation or family status. If they refuse to rent because you're a same-sex couple, that's discrimination. Document any discriminatory comments and the refusal." },
    { question: "Can a business refuse to serve me because I'm gay?", answer: "No. Services, goods, and facilities cannot discriminate based on sexual orientation. This includes restaurants, stores, professional services, and public accommodations. Religious beliefs don't exempt businesses from human rights law in Ontario." },
    { question: "What damages are available for sexual orientation discrimination?", answer: "Lost wages if employment, general damages for injury to dignity ($10,000-$50,000+ depending on severity), orders to change policies, and compensation for expenses. The HRTO considers the impact on you and the conduct's severity." }
  ];

  return (
    <>
      <SEO title="Sexual Orientation Discrimination Paralegal Ontario | LGBTQ Rights HRTO" description="Licensed paralegal for sexual orientation discrimination claims in Ontario. LGBTQ+ employment, housing, services. HRTO applications. Free consultation." canonical="https://www.legalassist.london/services/sexual-orientation-discrimination" />
      <ServicePageLayout seoTitle="Sexual Orientation Discrimination | Ontario" seoDescription="Sexual orientation discrimination help in Ontario." canonical="https://www.legalassist.london/services/sexual-orientation-discrimination" problemHeadline="Sexual Orientation Discrimination" problemDescription="Discriminated against because you're LGBTQ+? Sexual orientation is protected in Ontario. I help file human rights complaints and fight for justice." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Sexual orientation discrimination" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Sexual Orientation Discrimination</h2>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Sexual Orientation is a Protected Ground
              </h3>
              <p className="text-green-900">Ontario's Human Rights Code explicitly protects against discrimination based on sexual orientation. This includes lesbian, gay, bisexual, and other sexual orientations. Perceived orientation is also protected.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Where Protection Applies</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6">
                <Briefcase className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Employment</h4>
                <p className="text-foreground/80 text-sm">Hiring, firing, promotion, harassment, benefits, working conditions, hostile environment</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <Home className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Housing</h4>
                <p className="text-foreground/80 text-sm">Rental applications, evictions, harassment by landlords, treatment of same-sex couples</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <Heart className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Services</h4>
                <p className="text-foreground/80 text-sm">Retail, healthcare, education, government services, professional services, public accommodations</p>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Forms of Discrimination</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Direct Discrimination:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Fired after coming out</li>
                  <li>• Denied promotion due to orientation</li>
                  <li>• Housing refused to same-sex couple</li>
                  <li>• Service denied based on orientation</li>
                  <li>• Explicit homophobic statements</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">Harassment/Hostile Environment:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• Homophobic jokes or comments</li>
                  <li>• Outing without consent</li>
                  <li>• Intrusive questions about relationships</li>
                  <li>• Exclusion from social/work activities</li>
                  <li>• Creating uncomfortable environment</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Document From Day One</h4>
              <p className="text-yellow-900 text-sm">If you're experiencing discrimination or harassment, start documenting immediately. Dates, times, witnesses, exact words used. Email yourself notes the same day. This contemporaneous evidence is powerful at HRTO.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Sexual Orientation Discrimination FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Experiencing Discrimination?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">You don't have to tolerate this. Let me assess your situation confidentially.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.humanRights} />
      </ServicePageLayout>
    </>
  );
}
