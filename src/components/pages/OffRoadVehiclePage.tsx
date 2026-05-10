import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, AlertTriangle, HelpCircle, DollarSign, Compass, ShieldAlert } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function OffRoadVehiclePage() {
  const authorityItems = [
    { title: 'Off-Road Vehicles Act / Motorized Snow Vehicles Act', description: 'Two parallel statutes governing ATVs/UTVs and snowmobiles in Ontario. They borrow much of their structure from the HTA, including a permit, registration, helmet, and operator-licence regime.' },
    { title: 'Common Charges', description: 'No registration, no permit, no helmet, no insurance, careless driving on an ORV/MSV, operating in prohibited area, and operating without an authorized driver\'s licence are the most frequent.' },
    { title: 'On-Road Crossover', description: 'When ORVs/snowmobiles cross or operate on a public highway, the HTA also applies. A single incident can produce both ORVA/MSVA charges and HTA charges.' }
  ];

  const processSteps = [
    { step: '1', title: 'Identify the Statute', description: 'ORVA, MSVA, or HTA — and sometimes federal Off-Road Vehicles regulations or Public Lands Act / Provincial Parks Act provisions.' },
    { step: '2', title: 'Disclosure & Defence', description: 'Officer notes, photographs of the location, trail-permit records (OFSC for snowmobiles), and proof of insurance/licence at the time all matter.' },
    { step: '3', title: 'Negotiate or Trial', description: 'Pursue withdrawal where documentation is later produced, reduction to lesser non-moving offences where appropriate, or set down for trial.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'You Don\'t Attend Court', description: 'I handle the appearances on your behalf where the Court permits.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Documentation Defences', description: 'Many "no permit/no insurance" charges are withdrawn on production of valid documentation.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Insurance Implications', description: 'Careless driving on an ORV or MSV is treated by insurers similarly to careless driving in a passenger vehicle.' }
  ];

  const honestFAQs = [
    { question: 'What is the difference between the ORVA and the MSVA?', answer: 'The Off-Road Vehicles Act (ORVA), R.S.O. 1990 c. O.4 governs ATVs, UTVs, side-by-sides, dirt bikes, and similar machines. The Motorized Snow Vehicles Act (MSVA), R.S.O. 1990 c. M.44 governs snowmobiles. Both statutes require registration, insurance, helmets, and a permit, and both invoke the Highway Traffic Act when the vehicle is operated on or across a highway.' },
    { question: 'Do I need an Ontario driver\'s licence to operate an ATV or snowmobile?', answer: 'On private property: not under provincial law (though landowner rules apply). On a public highway, on the shoulder of a highway, or when crossing a highway: yes — at minimum a G2/M2 licence (specifically: a class G2/G/M2/M for ATVs in most contexts; snowmobile operators 16+ must hold either a driver\'s licence or a Motorized Snow Vehicle Operator\'s Licence). Operators 12-15 need a snowmobile operator\'s licence and supervision under specified conditions.' },
    { question: 'What is the helmet rule?', answer: 'ORVA s.20 and MSVA s.16 both require approved helmets for the operator and any passenger, with very limited exceptions (e.g., property-owner exceptions on their own land for adults). Helmet must be properly fastened. Failure to wear: set fine $110 (total payable approx. $130 with surcharges). The standard is the same as motorcycle helmets — DOT/Snell/CSA approved.' },
    { question: 'I was charged with no insurance on my snowmobile. What now?', answer: 'Compulsory automobile insurance under the CAIA does not always extend to snowmobiles, but the MSVA s.10 requires liability coverage. Penalties for no insurance under the MSVA are similar in scale to HTA s.2(1)(c) CAIA "drive without insurance" — significant fines starting at $5,000 first offence. This is one of the more serious ORV/MSV charges; bring proof of any policy that was in force.' },
    { question: 'Can I get a careless driving charge on an ATV?', answer: 'Yes. ORVA s.21 incorporates the HTA careless driving provisions. The conduct, penalties (six demerit points if on highway), and insurance impact are similar to careless driving in a passenger vehicle. If the incident occurred entirely on private property the analysis differs — the HTA does not apply on private property in the same way.' },
    { question: 'What about the OFSC trail permit?', answer: 'The Ontario Federation of Snowmobile Clubs administers the trail permit system that authorizes snowmobile use on its 30,000+ km network. Operating on a marked OFSC trail without a valid trail permit is a separate offence under the MSVA / trail-permit regulations — typical fine starts at $200 plus the cost of the permit.' }
  ];

  return (
    <>
      <SEO title="Off-Road Vehicle & Snowmobile Charges Defence | Ontario" description="Licensed paralegal defending Off-Road Vehicles Act and Motorized Snow Vehicles Act charges in Ontario — no permit, no insurance, no helmet, careless driving on ATV/snowmobile." canonical="https://www.legalassist.london/services/off-road-vehicle-offences" />
      <ServicePageLayout seoTitle="Off-Road Vehicle & Snowmobile Defence | Ontario" seoDescription="ORVA & MSVA defence — Ontario." canonical="https://www.legalassist.london/services/off-road-vehicle-offences" problemHeadline="Off-Road Vehicle & Snowmobile Charges" problemDescription="Charged under the Off-Road Vehicles Act or Motorized Snow Vehicles Act? Permit, insurance, helmet, and careless-driving charges all have technical defences worth exploring before you pay." heroImage={{ src: 'https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png?id=orv-hero', alt: 'Off-Road Vehicle defence' }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>

        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Common ORV / Snowmobile Charges</h2>

            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Offence</th>
                    <th className="px-6 py-4 text-left font-heading">Statute</th>
                    <th className="px-6 py-4 text-center font-heading">Typical Set Fine</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">No helmet (operator or passenger)</td><td className="px-6 py-4">ORVA s.20 / MSVA s.16</td><td className="px-6 py-4 text-center">~$130</td></tr>
                  <tr><td className="px-6 py-4 font-medium">No registration / no permit</td><td className="px-6 py-4">ORVA / MSVA</td><td className="px-6 py-4 text-center">~$110</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Operating without trail permit (OFSC trail)</td><td className="px-6 py-4">MSVA / trail regs</td><td className="px-6 py-4 text-center">~$200+ permit cost</td></tr>
                  <tr><td className="px-6 py-4 font-medium">No insurance</td><td className="px-6 py-4">MSVA s.10 / CAIA (where applicable)</td><td className="px-6 py-4 text-center">$5,000+ first offence</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Careless driving on ORV / snowmobile</td><td className="px-6 py-4">ORVA s.21 / MSVA s.20.1</td><td className="px-6 py-4 text-center">Court summons (6 points if on highway)</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Operating without a valid driver's licence (highway)</td><td className="px-6 py-4">HTA s.32 / MSVA</td><td className="px-6 py-4 text-center">Court summons</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <Compass className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-heading text-xl font-bold text-blue-800 mb-2">When the HTA Also Applies</h3>
              <p className="text-blue-900">When an ORV or snowmobile is operated on or across a highway (or its shoulder), the Highway Traffic Act applies in addition to the ORVA/MSVA. That can mean stunt-driving, careless-driving, no-licence, and HTA insurance charges layered on top. Read the wording of every charge.</p>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Charged on an ATV or Snowmobile?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">Many ORV and snowmobile charges have documentation or location-based defences. Get an honest assessment before you pay.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Free Consultation</a>
          </div>
        </div>

        <RelatedServices services={relatedServicesConfig.trafficTickets} />
      </ServicePageLayout>
    </>
  );
}
