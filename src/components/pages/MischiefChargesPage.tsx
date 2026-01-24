import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Hammer, Car, Home, DollarSign } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function MischiefChargesPage() {
  const authorityItems = [
    { title: 'Mischief Under $5,000', description: 'I defend mischief under $5,000 charges (property damage, interference). Over $5,000 may require a lawyer.' },
    { title: 'Common Situations', description: 'Vandalism, keying cars, breaking windows, graffiti, domestic property damage—all can result in mischief charges.' },
    { title: 'Restitution Focus', description: 'Making the victim whole through restitution often helps resolve cases favourably.' }
  ];

  const processSteps = [
    { step: '1', title: 'Assess Value', description: 'Under $5,000 (paralegal) vs over (lawyer may be needed).' },
    { step: '2', title: 'Explore Resolution', description: 'Restitution, diversion, or challenge the evidence.' },
    { step: '3', title: 'Minimize Record', description: 'Peace bond, discharge, or trial defence.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Restitution Helps', description: 'Paying for damage often leads to better outcomes.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Peace Bonds', description: 'Common resolution for first offenders.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Over $5,000', description: 'More serious—may need lawyer.' }
  ];

  const honestFAQs = [
    { question: "What is mischief?", answer: "Under s. 430 of the Criminal Code: destroying, damaging, obstructing, interrupting, or interfering with property. This includes vandalism, graffiti, keying vehicles, breaking windows, slashing tires, or interfering with someone's use of their property." },
    { question: "What's the difference between mischief under and over $5,000?", answer: "The value of damage determines severity. Under $5,000 is hybrid, often proceeded summarily (paralegal can defend). Over $5,000 is more serious with higher potential penalties. Damage value is assessed by repair/replacement cost." },
    { question: "I broke something during an argument with my partner. Is that mischief?", answer: "Potentially, especially if it's their property. Domestic mischief is often charged alongside domestic assault or as standalone. Courts take domestic-related offences seriously regardless of value." },
    { question: "What about accidentally damaging property?", answer: "Mischief requires intent or recklessness. True accidents aren't mischief. However, if you were doing something reckless that foreseeably could cause damage, that may still be mischief. Pure accidents are a defence." },
    { question: "Will paying for the damage make the charges go away?", answer: "Not automatically, but it helps significantly. Restitution demonstrates responsibility and removes the complainant's financial loss. Crown is more likely to agree to peace bond or withdrawal if victim is compensated." },
    { question: "What are typical outcomes for first-time mischief under $5,000?", answer: "First offence with restitution paid: often peace bond or diversion (no record). Without restitution or prior record: conditional discharge, suspended sentence, or fine. Serious damage or repeat offences face harsher consequences." }
  ];

  return (
    <>
      <SEO title="Mischief Under $5000 Defence Paralegal Ontario | Property Damage Charges" description="Licensed paralegal defending mischief and property damage charges in Ontario. Vandalism, criminal damage. Restitution and resolution options. Free consultation." canonical="https://www.legalassist.london/services/mischief-charges" />
      <ServicePageLayout seoTitle="Mischief Under $5,000 | Ontario" seoDescription="Mischief and property damage defence in Ontario." canonical="https://www.legalassist.london/services/mischief-charges" problemHeadline="Mischief / Property Damage" problemDescription="Charged with mischief or property damage? Whether it's vandalism, broken windows, or domestic property damage, I help resolve charges and avoid criminal records." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Mischief charges" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Mischief Charges</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What Counts as Mischief</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6">
                <Hammer className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Property Damage:</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Vandalism</li>
                  <li>• Graffiti</li>
                  <li>• Breaking windows</li>
                  <li>• Keying vehicles</li>
                  <li>• Slashing tires</li>
                  <li>• Destroying belongings</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <Home className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Interference:</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Obstructing use of property</li>
                  <li>• Interfering with operation</li>
                  <li>• Blocking access</li>
                  <li>• Tampering with equipment</li>
                  <li>• Computer/data interference</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Penalties by Value</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Value</th>
                    <th className="px-6 py-4 text-left font-heading">Maximum (Summary)</th>
                    <th className="px-6 py-4 text-left font-heading">Who Defends</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-green-50"><td className="px-6 py-4 font-medium">Under $5,000</td><td className="px-6 py-4 text-sm">2 years less a day</td><td className="px-6 py-4 text-green-800 font-medium">Paralegal ✓</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Over $5,000</td><td className="px-6 py-4 text-sm">Up to 10 years (indictable)</td><td className="px-6 py-4">Lawyer recommended</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">How Restitution Helps</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <DollarSign className="w-8 h-8 text-green-600 mb-3" />
              <h4 className="font-bold text-green-800 mb-2">Paying for Damage Can:</h4>
              <ul className="text-green-900 text-sm space-y-2">
                <li>✓ Show you take responsibility (helps with Crown)</li>
                <li>✓ Remove victim's financial motivation to pursue prosecution</li>
                <li>✓ Support peace bond resolution (no conviction)</li>
                <li>✓ Lead to charges being withdrawn or diverted</li>
                <li>✓ Reduce sentence if convicted</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Domestic Mischief Warning</h4>
              <p className="text-yellow-900 text-sm">Property damage during domestic disputes is taken seriously. Even damaging your own shared property can lead to charges. Courts view domestic mischief as indicator of relationship volatility, often imposing no-contact conditions.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Mischief FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Facing Mischief Charges?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Let's discuss restitution and resolution options to avoid a record.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get Help Now</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.criminal} />
      </ServicePageLayout>
    </>
  );
}
