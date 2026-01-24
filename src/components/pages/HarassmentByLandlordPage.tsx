import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, DollarSign, HelpCircle, AlertCircle, Shield, FileText, Phone } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HarassmentByLandlordPage() {
  const authorityItems = [
    { title: 'Harassment Claims', description: 'Landlord harassment is illegal. I help tenants document, report, and pursue compensation for landlord misconduct.' },
    { title: 'T2 Applications', description: 'File T2 applications for interference with reasonable enjoyment, harassment, and illegal entry.' },
    { title: 'Rent Reduction & Damages', description: 'Pursue rent reductions and general damages for the impact on your living situation.' }
  ];

  const processSteps = [
    { step: '1', title: 'Document Everything', description: 'Keep records of every incident—dates, times, witnesses, photos, recordings.' },
    { step: '2', title: 'Formal Complaint', description: 'Send written notice to landlord about the harassment.' },
    { step: '3', title: 'T2 Application', description: 'File with LTB seeking orders, rent reduction, and damages.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Clear Legal Protection', description: 'RTA prohibits harassment and interference.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Compensation Available', description: 'Rent reductions and general damages.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Orders to Stop', description: 'LTB can order landlord to cease conduct.' }
  ];

  const honestFAQs = [
    { question: "What counts as landlord harassment?", answer: "Repeated unwanted contact, threats, intimidation, unauthorized entry, shutting off utilities, removing amenities, interfering with guests, creating noise, refusing necessary repairs to force you out, false accusations, or any conduct intended to pressure you to leave." },
    { question: "What is 'substantial interference'?", answer: "Actions that significantly impact your ability to enjoy your rental. This includes: excessive noise, removal of amenities, blocking access to common areas, failing to address safety issues, or any persistent conduct that makes living there difficult." },
    { question: "What evidence do I need?", answer: "Documentation is critical: keep a log of incidents with dates/times, save all text messages and emails, photograph any physical evidence, get witness statements, record conversations (you can record if you're part of the conversation in Ontario), and save voicemails." },
    { question: "What compensation can I get?", answer: "Rent reduction for the period of harassment (typically 10-25% depending on severity), general damages for stress and inconvenience ($500-5,000+ depending on severity), and orders requiring the landlord to stop the conduct." },
    { question: "What about illegal entry?", answer: "Landlords must give 24 hours written notice before entering, except emergencies. Entering without notice, entering excessively, or entering for invalid reasons is illegal. Each illegal entry can result in damages." },
    { question: "What if I'm afraid to file?", answer: "Landlords cannot retaliate for filing T2. If they do (N12 after complaint, rent increase threats), that's additional grounds for your case. Document any retaliation and report it. The law protects tenants who exercise their rights." }
  ];

  return (
    <>
      <SEO title="Landlord Harassment Help | T2 Application Ontario" description="Licensed paralegal for landlord harassment claims in Ontario. Illegal entry, interference, intimidation. T2 applications, rent reduction, damages. Free consultation." canonical="https://www.legalassist.london/services/harassment-by-landlord" />
      <ServicePageLayout seoTitle="Landlord Harassment Help | Ontario" seoDescription="Help for tenants experiencing landlord harassment." canonical="https://www.legalassist.london/services/harassment-by-landlord" problemHeadline="Landlord Harassment & Interference" problemDescription="Is your landlord making your life difficult to force you out? Harassment, illegal entry, and interference are prohibited. You can fight back." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Landlord harassment help" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Landlord Harassment: Know Your Rights</h2>
            
            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">The Law Is Clear</h3>
              <p className="text-foreground/80">The Residential Tenancies Act prohibits landlords from harassing, coercing, threatening, or interfering with tenants. You have the right to quiet enjoyment of your rental.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What Constitutes Harassment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-bold text-red-800 mb-3">Direct Harassment:</h4>
                <ul className="text-red-900 text-sm space-y-2">
                  <li>• Threats or intimidation</li>
                  <li>• Excessive contact/messaging</li>
                  <li>• Verbal abuse or insults</li>
                  <li>• False accusations</li>
                  <li>• Pressuring you to sign N11</li>
                  <li>• Retaliation for complaints</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-bold text-red-800 mb-3">Substantial Interference:</h4>
                <ul className="text-red-900 text-sm space-y-2">
                  <li>• Illegal entry without notice</li>
                  <li>• Shutting off utilities</li>
                  <li>• Removing amenities</li>
                  <li>• Creating excessive noise</li>
                  <li>• Blocking access to common areas</li>
                  <li>• Refusing to repair to force you out</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Landlord Entry Rules</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-12">
              <h4 className="font-bold text-yellow-800 mb-3">Legal Entry Requirements:</h4>
              <ul className="text-yellow-900 text-sm space-y-2">
                <li>✓ 24 hours written notice (except emergencies)</li>
                <li>✓ Between 8am and 8pm (unless you agree otherwise)</li>
                <li>✓ Only for valid reasons: repairs, inspections, showings (with notice)</li>
                <li>✓ Cannot enter just to "check on things"</li>
                <li>✗ NO entry without notice except true emergencies (fire, flood)</li>
              </ul>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Document Everything</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <FileText className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Keep Records:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Incident log with dates/times</li>
                  <li>• Save all communications</li>
                  <li>• Get witness statements</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <Phone className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Record When Possible:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• You can record your own conversations</li>
                  <li>• Video unauthorized entries</li>
                  <li>• Save voicemails</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <Shield className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Report Serious Issues:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Police for threats/trespass</li>
                  <li>• Bylaw for utility shutoffs</li>
                  <li>• LTB for T2 application</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Harassment FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Being Harassed by Your Landlord?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Document everything and let's discuss your options for making it stop and getting compensated.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
