import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, AlertTriangle, HelpCircle, DollarSign, Leaf, Car, Clock } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function CannabisControlOffencePage() {
  const authorityItems = [
    { title: 'Cannabis Control Act, 2017', description: 'The Ontario statute governing where, how, and by whom cannabis can be used or supplied. Provincial offences — separate from federal Cannabis Act offences.' },
    { title: 'Vehicle-Related Charges', description: 'Driving with cannabis readily available (open container) under CCA s.12 is the most common charge. Set fine $215. Don\'t confuse this with HTA impaired/drug-impaired driving — those are far more serious.' },
    { title: 'Defences & Reductions', description: 'Sealed/inaccessible packaging defences, ownership challenges, and reductions to non-CCA offences (e.g., open liquor) are sometimes available depending on facts.' }
  ];

  const processSteps = [
    { step: '1', title: 'Identify the Subsection', description: 'CCA charges range from open-container in vehicle (s.12) to public consumption (s.11), supply to a minor (s.5), and sale outside an authorized retailer.' },
    { step: '2', title: 'Disclosure & Defence', description: 'Where was the cannabis stored? Was it in original sealed packaging? Was the vehicle owned by you? Does the officer\'s notebook actually establish the offence?' },
    { step: '3', title: 'Negotiate or Trial', description: 'Pursue withdrawal, reduction to a non-CCA offence, or set down for trial.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'No Demerit Points', description: 'CCA offences are not HTA offences and don\'t carry demerit points. They do appear on your record though.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'You Don\'t Attend Court', description: 'I handle the appearances on your behalf where the Court permits.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Don\'t Confuse with Impaired Driving', description: 'CCA cannabis-in-vehicle is not the same as drug-impaired driving (Criminal Code) or HTA s.48.1 drug-suspension. Those are much more serious.' }
  ];

  const honestFAQs = [
    { question: 'What does the Cannabis Control Act cover?', answer: 'It governs how cannabis can be used and supplied in Ontario. The most common provincial offences are: consumption in a public place (s.11), driving with cannabis readily available in a motor vehicle (s.12), supply to persons under 19 (s.5), and unauthorized sale (s.6). The federal Cannabis Act creates separate offences (e.g., production, trafficking).' },
    { question: 'What is the penalty for cannabis in a vehicle (CCA s.12)?', answer: 'Set fine of $215 (total payable approximately $260 with surcharges). No demerit points. Conviction does appear on your record. Note: this is the provincial offence — driving while impaired by cannabis is a Criminal Code offence carrying mandatory minimums and a federal record.' },
    { question: 'My cannabis was sealed in the original package. Is that a defence?', answer: 'CCA s.12 prohibits cannabis being readily available to the driver. The Crown must prove the cannabis was readily available — meaning accessible without requiring you to leave the driver\'s seat to retrieve it. Cannabis stored in the trunk, in a locked container, or in a sealed unopened package out of reach is generally not "readily available." Where it was, in what container, and whether the seal was broken are all live issues.' },
    { question: 'I was a passenger, not the driver. Can I still be charged?', answer: 'CCA s.12 specifically targets the driver. A passenger consuming cannabis in a moving vehicle can be charged under the consumption-in-public-place provisions, and the driver can still be charged for permitting consumption. Each set of facts is different.' },
    { question: 'What about smoking cannabis in public?', answer: 'CCA s.11 prohibits cannabis consumption in many public spaces — set fine $215. The Smoke-Free Ontario Act, 2017 also restricts where you can smoke or vape cannabis (the same places it restricts tobacco smoking). You can be charged under both statutes for the same conduct.' },
    { question: 'Can these charges be reduced?', answer: 'Sometimes. The Crown may accept a guilty plea to a lesser non-CCA offence (e.g., a Liquor Licence and Control Act open-container charge if a small amount of alcohol was also present, depending on the facts). Outcomes depend on the facts, your record, and the assigned prosecutor — withdrawal, reduction, acquittal, or conviction-as-charged are all possible.' }
  ];

  return (
    <>
      <SEO title="Cannabis Control Act Defence | Ontario CCA Offences" description="Licensed paralegal defending Cannabis Control Act, 2017 offences in Ontario — cannabis in vehicle, public consumption, supply to minor. Free consultation." canonical="https://www.legalassist.london/services/cannabis-control-offences" />
      <ServicePageLayout seoTitle="Cannabis Control Act Defence | Ontario" seoDescription="Cannabis Control Act, 2017 defence — provincial offences." canonical="https://www.legalassist.london/services/cannabis-control-offences" problemHeadline="Cannabis Control Act Offences" problemDescription="Charged under Ontario's Cannabis Control Act, 2017? These provincial offences carry fines but not demerit points — and they're often defensible on packaging, accessibility, and ownership grounds." heroImage={{ src: 'https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png?id=cca-hero', alt: 'Cannabis Control Act defence' }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>

        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Common CCA Offences</h2>

            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Offence</th>
                    <th className="px-6 py-4 text-left font-heading">Section</th>
                    <th className="px-6 py-4 text-center font-heading">Set Fine</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Cannabis readily available in vehicle</td><td className="px-6 py-4">CCA s.12</td><td className="px-6 py-4 text-center">$215</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Consume cannabis in public place</td><td className="px-6 py-4">CCA s.11</td><td className="px-6 py-4 text-center">$215</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Supply / sell to person under 19</td><td className="px-6 py-4">CCA s.5</td><td className="px-6 py-4 text-center">$200,000+ on conviction</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Unauthorized sale of cannabis</td><td className="px-6 py-4">CCA s.6</td><td className="px-6 py-4 text-center">Set down for court</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Possession by person under 19</td><td className="px-6 py-4">CCA s.10</td><td className="px-6 py-4 text-center">$200</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-2">Cannabis-Impaired Driving Is Different</h3>
              <p className="text-red-900">Drug-impaired driving is a Criminal Code offence (s.320.14), not a CCA offence. HTA s.48.1 also creates a 3/7/30-day administrative roadside suspension for drug-affected driving. If you have been charged with impaired driving, this page is not enough — see the Impaired Driving page.</p>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Charged Under the Cannabis Control Act?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">Don&apos;t pay before getting an assessment. Many CCA charges are challengeable on packaging or accessibility grounds.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Free Consultation</a>
          </div>
        </div>

        <RelatedServices services={relatedServicesConfig.trafficTickets} />
      </ServicePageLayout>
    </>
  );
}
