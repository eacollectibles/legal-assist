import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, AlertTriangle, DollarSign, HelpCircle, Gauge } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FailToStopSchoolBusPage() {
  const authorityItems = [
    { title: 'School Bus Defence', description: 'Failing to stop for a stopped school bus with flashing red lights is a serious HTA s.175(11) offence carrying 6 demerit points and substantial fines.' },
    { title: 'Evidence Analysis', description: 'School bus camera footage, driver/witness statements, and the geometry of the road all matter. Each is challengeable.' },
    { title: 'Immediate Stakes', description: 'First conviction: $400-$2,000 fine, 6 demerit points. Second within 5 years: $1,000-$4,000, possible jail up to 6 months.' },
  ];

  const processSteps = [
    { step: '1', title: 'Disclosure', description: 'Request the bus camera footage and driver statement. Many cases turn on what the camera captured.' },
    { step: '2', title: 'Defence Strategy', description: 'Was the bus actually stopped with red lights flashing? Were you on a divided highway with a median (where stopping isn\'t required)?' },
    { step: '3', title: 'Negotiate or Trial', description: 'Pursue reduction or set down for trial.' },
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'You Don\'t Attend Court', description: 'I handle the appearances on your behalf where the Court permits.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Insurance Protection', description: '6 demerit points = significant insurance impact for 3 years.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'High Stakes Charge', description: 'Among the most serious non-criminal HTA charges. Worth defending vigorously.' },
  ];

  const honestFAQs = [
    { question: 'What does HTA s.175 actually require?', answer: 'When a school bus is stopped on a highway with its overhead red signal lights flashing and stop arm extended, drivers in BOTH directions must stop — except on a divided highway with a median or physical barrier, where only drivers behind the bus must stop. The offence is failing to stop or attempting to pass while these conditions exist.' },
    { question: 'What are the penalties?', answer: 'First conviction: $400-$2,000 fine plus surcharges, 6 demerit points. Second conviction within 5 years: $1,000-$4,000 fine, 6 demerit points, plus possible imprisonment up to 6 months. Insurance impact is severe (often categorized similarly to careless driving).' },
    { question: 'What if there was a median?', answer: 'On a divided highway with a median, oncoming traffic is generally not required to stop. Your direction of travel and the road configuration matter. We pull aerial imagery and road records to confirm.' },
    { question: 'Can the camera footage be challenged?', answer: 'Yes. Common issues include: light timing (was the stop arm fully extended?), whether you had time to safely stop, vehicle identification accuracy, and chain-of-custody of the footage. Disclosure of the camera certification is part of our standard request.' },
    { question: 'Can it be reduced?', answer: 'Sometimes. The Crown takes school bus charges seriously, but reductions to lesser HTA offences are possible where the evidence has weaknesses. Outcomes depend on disclosure, your record, and the assigned Crown.' },
  ];

  return (
    <>
      <SEO title="Fail to Stop for School Bus Defence | HTA s.175 | Ontario" description="Licensed paralegal defending HTA s.175 fail-to-stop-for-school-bus charges in Ontario. 6 demerit points, $400-$2,000+ fine. Free consultation." canonical="https://www.legalassist.london/services/fail-to-stop-school-bus" />
      <ServicePageLayout seoTitle="Fail to Stop for School Bus | Ontario" seoDescription="HTA s.175(11) defence." canonical="https://www.legalassist.london/services/fail-to-stop-school-bus" problemHeadline="Fail to Stop for School Bus — HTA s.175(11)" problemDescription="One of the most serious non-criminal driving charges in Ontario. 6 demerit points and a fine starting at $400. The good news: every element of the offence is challengeable on the right facts." heroImage={{ src: 'https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png?id=school-bus-hero', alt: 'Fail to stop for school bus defence' }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>

        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Penalty at a Glance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-red-50 rounded-lg p-6 border border-red-200 text-center">
                <Gauge className="w-10 h-10 text-red-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-red-700 mb-2">6</div>
                <p className="text-red-800 font-medium">Demerit Points</p>
              </div>
              <div className="bg-red-50 rounded-lg p-6 border border-red-200 text-center">
                <DollarSign className="w-10 h-10 text-red-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-red-700 mb-2">$400-$2,000</div>
                <p className="text-red-800 font-medium">First Conviction Fine</p>
              </div>
              <div className="bg-red-50 rounded-lg p-6 border border-red-200 text-center">
                <DollarSign className="w-10 h-10 text-red-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-red-700 mb-2">$1,000-$4,000</div>
                <p className="text-red-800 font-medium">Subsequent Within 5 Years</p>
              </div>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Charged with Fail to Stop for a School Bus?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">A 6-point conviction has long-term consequences. Get a free assessment of your file.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Free Consultation</a>
          </div>
        </div>

        <RelatedServices services={relatedServicesConfig.trafficTickets} />
      </ServicePageLayout>
    </>
  );
}
