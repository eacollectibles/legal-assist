import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Clock, Shield, Scale, Phone } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function AccessibilityComplaintsPage() {
  const authorityItems = [
    { title: 'AODA Compliance Expertise', description: 'I help people with disabilities challenge violations of Ontario\'s Accessibility for Ontarians with Disabilities Act (AODA). Employers and providers often fail these duties.' },
    { title: 'Human Rights Code Knowledge', description: 'Discrimination based on disability is illegal under the Human Rights Code. I guide clients through complaints and tribunal representation.' },
    { title: 'Duty to Accommodate Practice', description: 'Employers must accommodate disabilities unless it causes undue hardship. I build cases showing inadequate accommodation.' }
  ];

  const processSteps = [
    { step: '1', title: 'Document the Barrier', description: 'Identify specific accessibility barrier or accommodation failure with dates and evidence.' },
    { step: '2', title: 'Demand Letter', description: 'Send formal letter to organization detailing violation and requesting remediation.' },
    { step: '3', title: 'Complaint or Tribunal', description: 'File AODA directorate complaint or Human Rights Tribunal complaint if organization refuses.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Strong Legal Framework', description: 'AODA and Human Rights Code provide powerful protections. Violations are clear-cut.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Preventive Duty', description: 'Organizations must remove barriers proactively—they can\'t wait for complaints. Violations are common.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Remedies Available', description: 'Compensation, accommodation orders, policy changes, and damages for discrimination.' }
  ];

  const honestFAQs = [
    { question: "What is the AODA and who must comply?", answer: "The Accessibility for Ontarians with Disabilities Act (2005) requires organizations with 50+ employees to implement accessibility standards. This covers employment, customer service, transportation, information/communication, and design. Compliance is mandatory—barriers must be identified and removed proactively." },
    { question: "What accessibility standards must be met?", answer: "Customer Service Standard: accessible service provision, communication aids, no charges for accessibility. Employment Standard: accessible recruitment, accommodation, communication. Information & Communication Standard: accessible formats (large print, Braille, audio). Built Environment: accessible facilities (ramps, elevators, accessible washrooms, accessible parking)." },
    { question: "What is the duty to accommodate?", answer: "Employers and service providers must take steps to accommodate a person's disability, unless it causes undue hardship. This means modifying policies, providing equipment, allowing remote work, flexible scheduling, providing interpreters, etc. 'Undue hardship' has high bar—cost alone usually insufficient." },
    { question: "What counts as accommodation failure?", answer: "Refusing to hire due to disability, lack of accessible office space, no accessible washrooms, inadequate materials in alternative formats (Braille, large print, audio), denying service animals, refusing to allow assistance person, no flexibility for medical appointments, or requiring person to pay for accessibility aids." },
    { question: "How do I file an AODA complaint?", answer: "Contact Ontario's AODA Directorate (now part of Ontario Service Provider). File detailed complaint describing barrier and organization's failure to accommodate. Include dates, communications, and impact. Directorate investigates and can issue compliance orders. Accessible, free process." },
    { question: "What if AODA complaint doesn't work?", answer: "File Human Rights Tribunal complaint under Ontario Human Rights Code. Alleges discrimination based on disability. Tribunal can award monetary damages ($5,000–$20,000+ plus lost income). Stronger remedy than AODA alone. Both avenues available." }
  ];

  return (
    <>
      <SEO title="Accessibility Complaints Ontario | AODA & Human Rights Tribunal" description="AODA complaints and Human Rights Tribunal representation in Ontario. Accessibility failures, duty to accommodate, disability discrimination. Get justice." canonical="https://www.legalassist.london/services/accessibility-complaints" />
      <ServicePageLayout seoTitle="Accessibility Complaints & Duty to Accommodate | Ontario" seoDescription="Accessibility complaints and duty to accommodate in Ontario." canonical="https://www.legalassist.london/services/accessibility-complaints" problemHeadline="Accessibility Barriers & Accommodation Failures" problemDescription="Denied accommodation at work? Can't access service due to disability? AODA and Human Rights Code protect you. Let's enforce those rights." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Accessibility complaints" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>

        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">AODA & Disability Accommodation Rights</h2>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Your Rights Are Protected by Law
              </h3>
              <p className="text-blue-900">Ontario's Accessibility for Ontarians with Disabilities Act and Human Rights Code create binding legal obligations. Organizations cannot ignore accessibility requirements or deny reasonable accommodation without strong justification.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Accessibility Standards by Sector</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Sector/Standard</th>
                    <th className="px-6 py-4 text-left font-heading">Key Requirements</th>
                    <th className="px-6 py-4 text-left font-heading">Common Failures</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Customer Service</td><td className="px-6 py-4 text-sm">Accessible communication, no service denial, allow service animals</td><td className="px-6 py-4 text-sm">Refusing service animals, no alt. formats, refusal of accommodation</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Employment</td><td className="px-6 py-4 text-sm">Accessible hiring, workplace accommodation, communication aids</td><td className="px-6 py-4 text-sm">Denying accommodations, inaccessible work site, no equipment provided</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Information & Communication</td><td className="px-6 py-4 text-sm">Materials in Braille, large print, audio; accessible websites</td><td className="px-6 py-4 text-sm">Only PDF versions, no captions, no alt text, cost imposed</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Built Environment</td><td className="px-6 py-4 text-sm">Ramps, elevators, accessible washrooms, parking, doors</td><td className="px-6 py-4 text-sm">No wheelchair access, inaccessible washrooms, broken elevators</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Accessibility Violations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Employment Accommodation Failures:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Refusing flexible/remote work for disability</li>
                  <li>• Lack of accessible parking or building access</li>
                  <li>• No break time for medical needs</li>
                  <li>• Refusing service animal in workplace</li>
                  <li>• Denying assistive technology (screen readers)</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">Service/Communication Barriers:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• Denying service dogs access</li>
                  <li>• No Braille/large print materials available</li>
                  <li>• No captioning on videos/training</li>
                  <li>• Charging for accessible formats</li>
                  <li>• Website not screen reader accessible</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Filing a Complaint Process</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-bold text-green-800 mb-3">Your Options:</h4>
              <div className="text-green-900 text-sm space-y-3">
                <div>
                  <strong>Option 1: AODA Directorate Complaint</strong>
                  <p>Direct complaint to Ontario government. Investigation into AODA standard breach. Compliance orders issued. No legal fees needed. Slower but comprehensive.</p>
                </div>
                <div>
                  <strong>Option 2: Human Rights Tribunal Complaint</strong>
                  <p>Allege discrimination based on disability. Tribunal awards compensation (damages for lost income, emotional distress). Faster than AODA. Can get $5,000–$20,000+ award.</p>
                </div>
                <div>
                  <strong>Option 3: Both (Parallel Complaints)</strong>
                  <p>File both simultaneously. AODA corrects barrier; Human Rights addresses discrimination harm. Best outcome: compliance + compensation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Accessibility Complaints FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Your Right to Accessibility</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Don't accept barriers. AODA and Human Rights Code protect you. Let's enforce those rights.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Contact Now</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.smallClaims} />
      </ServicePageLayout>
    </>
  );
}
