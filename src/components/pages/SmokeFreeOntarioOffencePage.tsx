import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, AlertTriangle, HelpCircle, DollarSign, Wind, Ban } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function SmokeFreeOntarioOffencePage() {
  const authorityItems = [
    { title: 'Smoke-Free Ontario Act, 2017', description: 'Replaced the original SFOA in 2018 to consolidate smoking, vaping, and cannabis-smoking restrictions. Provincial offences enforced by public health inspectors and police.' },
    { title: 'Common Charges', description: 'Smoking/vaping in a prohibited place (s.10/s.12), supply of tobacco or vape products to a person under 19 (s.6), and unlawful display/promotion (s.4) are the most frequent.' },
    { title: 'No Demerit Points, But Real Fines', description: 'Set fines start at $305 for individuals. Conviction is recorded but does not affect a driving abstract.' }
  ];

  const processSteps = [
    { step: '1', title: 'Identify the Offence', description: 'Was it consumption in a prohibited place, supply to a minor, or display/promotion? Each has different elements.' },
    { step: '2', title: 'Disclosure & Defence', description: 'Inspector\'s notes, signage at the location, age-verification practices, and the geometry of "enclosed public place" all matter.' },
    { step: '3', title: 'Negotiate or Trial', description: 'Pursue withdrawal where signage was inadequate or the inspector\'s evidence is weak. Otherwise set down for trial.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'No Demerit Points', description: 'These are non-driving provincial offences. They do not affect your driving record.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'You Don\'t Attend Court', description: 'I handle the appearances on your behalf where the Court permits.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Higher Stakes for Businesses', description: 'Corporate convictions can carry fines starting at $1,000 and escalating significantly for repeat offences.' }
  ];

  const honestFAQs = [
    { question: 'What does the Smoke-Free Ontario Act, 2017 prohibit?', answer: 'Smoking tobacco, smoking cannabis, and vaping (with or without nicotine) are prohibited in a long list of places: enclosed public places, enclosed workplaces, school grounds, child-care centres, certain outdoor patios and grounds of hospitals, restaurants, bars, sports fields, playgrounds, and within prescribed distances of building entrances. Supply of tobacco, vape products, or cannabis to anyone under 19 is also prohibited.' },
    { question: 'What is the typical fine?', answer: 'For individuals: set fine of $305 (total payable approximately $360 with surcharges). On a court summons, fines can range up to $1,000 for a first offence and higher on subsequent convictions. Corporate fines start at $1,000 and can be much higher.' },
    { question: 'I didn\'t see the no-smoking sign. Is that a defence?', answer: 'The Act requires operators of prohibited places to post no-smoking/no-vaping signs. Inadequate signage is not always a complete defence — some prohibitions apply regardless of signage (e.g., enclosed workplaces) — but it can support a due diligence defence in places where signage is the operator\'s responsibility. Photograph the location after the fact to establish what signage was visible.' },
    { question: 'I was on a patio that allowed smoking. Why was I charged?', answer: 'Outdoor patios of bars and restaurants where food or drink is served, or which are licensed under the Liquor Licence and Control Act, are smoke-free. So are the grounds of hospitals, long-term care homes, and many other locations. Where you actually were — and how it is classified under the Act — is the central issue.' },
    { question: 'I sold a vape product to someone with valid-looking ID. Is that a defence?', answer: 'Yes — "due diligence" is recognized. If the retailer asked for and reasonably relied on a government-issued ID, recorded the transaction, and trained staff on age-verification, that supports the defence. The CCA, SFOA, and federal Tobacco and Vaping Products Act all interlock — a charge under one may have parallels under the others.' },
    { question: 'Can these charges be reduced?', answer: 'Sometimes. Outcomes depend on the inspector\'s notes, photographs, signage at the location, your record, and the assigned prosecutor — withdrawal, reduction, acquittal, or conviction-as-charged are all possible.' }
  ];

  return (
    <>
      <SEO title="Smoke-Free Ontario Act Defence | Vape & Tobacco Tickets | Ontario" description="Licensed paralegal defending Smoke-Free Ontario Act, 2017 charges in Ontario — smoking/vaping in prohibited places, supply to minor. Free consultation." canonical="https://www.legalassist.london/services/smoke-free-ontario-offences" />
      <ServicePageLayout seoTitle="Smoke-Free Ontario Act Defence | Ontario" seoDescription="Smoke-Free Ontario Act, 2017 defence — provincial offences." canonical="https://www.legalassist.london/services/smoke-free-ontario-offences" problemHeadline="Smoke-Free Ontario Act, 2017 Offences" problemDescription="Charged with smoking, vaping, or supplying tobacco or vape products in violation of the Smoke-Free Ontario Act? These are provincial offences with real fines but no demerit points." heroImage={{ src: 'https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png?id=sfoa-hero', alt: 'Smoke-Free Ontario Act defence' }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>

        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Common SFOA, 2017 Offences</h2>

            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Offence</th>
                    <th className="px-6 py-4 text-left font-heading">Section</th>
                    <th className="px-6 py-4 text-center font-heading">Set Fine (Individual)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Smoke / vape in prohibited place</td><td className="px-6 py-4">SFOA s.10 / s.12</td><td className="px-6 py-4 text-center">$305</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Supply tobacco / vape product to person under 19</td><td className="px-6 py-4">SFOA s.6</td><td className="px-6 py-4 text-center">Court summons</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Sell tobacco / vape product without operating a place where allowed</td><td className="px-6 py-4">SFOA s.5</td><td className="px-6 py-4 text-center">Court summons</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Display / promote in violation of the Act</td><td className="px-6 py-4">SFOA s.4</td><td className="px-6 py-4 text-center">Court summons</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <Wind className="w-8 h-8 text-yellow-600 mb-3" />
              <h3 className="font-heading text-xl font-bold text-yellow-800 mb-2">Cannabis Smoking and Vaping Are Covered Too</h3>
              <p className="text-yellow-900">As of 2018, the SFOA, 2017 captures cannabis smoke and vapour the same way it captures tobacco. So a single act of smoking cannabis on a restaurant patio can attract both a Cannabis Control Act ticket and an SFOA ticket.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Honest Answers</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Got a Smoke-Free Ontario Act Ticket?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">Often defensible on signage, location classification, or due diligence grounds. Get an honest assessment.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Free Consultation</a>
          </div>
        </div>

        <RelatedServices services={relatedServicesConfig.trafficTickets} />
      </ServicePageLayout>
    </>
  );
}
