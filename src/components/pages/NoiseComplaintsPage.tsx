import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Volume2, Home, Clock, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function NoiseComplaintsPage() {
  const authorityItems = [
    { title: 'Tenant Noise Issues', description: 'Noisy neighbours? Landlord won\'t act? Accused of noise violations? I help with both sides of noise disputes.' },
    { title: 'Reasonable Enjoyment', description: 'Every tenant has a right to "reasonable enjoyment" of their unit. Excessive noise violates this right.' },
    { title: 'Documentation Critical', description: 'Noise complaints require evidence: logs, recordings, witnesses. Pattern of disturbance matters.' }
  ];

  const processSteps = [
    { step: '1', title: 'Document Noise', description: 'Log dates, times, duration, type of noise.' },
    { step: '2', title: 'Report to Landlord', description: 'Written complaints create paper trail.' },
    { step: '3', title: 'Escalate if Needed', description: 'Bylaw complaint or LTB application.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Right to Quiet', description: 'Reasonable enjoyment is protected.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Multiple Options', description: 'Landlord, bylaw, LTB paths available.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Need Evidence', description: 'Document everything systematically.' }
  ];

  const honestFAQs = [
    { question: "What counts as excessive noise in an apartment?", answer: "Noise that substantially interferes with reasonable enjoyment: loud music at all hours, constant yelling, barking dogs left alone, stomping/jumping regularly, parties frequently. Normal living sounds (walking, conversation, some music at reasonable hours) are expected in apartments." },
    { question: "I've complained to my landlord but nothing happens. What now?", answer: "Document your complaints and the lack of response. Options: (1) File T2 at LTB against landlord for failing to provide reasonable enjoyment, (2) Call municipal bylaw enforcement, (3) Contact police for extreme disturbances. Keep all written records." },
    { question: "Can I get rent abatement for noise problems?", answer: "Yes. If noise substantially interfered with your enjoyment and landlord failed to address it, LTB can order rent abatement. The amount depends on severity and duration. Document the impact on your life (sleep, work from home, stress)." },
    { question: "My neighbour filed a noise complaint against me. What do I do?", answer: "Take it seriously. If landlord gives you notice, respond in writing. If N5 is served, the first one can be voided by stopping the behaviour. Document your normal activities, gather witnesses who can speak to your reasonable behaviour." },
    { question: "What evidence do I need for a noise complaint?", answer: "Noise log (dates, times, duration, description), recordings if possible, witness statements from other neighbours, written complaints to landlord with responses, medical evidence if health affected, bylaw complaint records." },
    { question: "Can I break my lease because of noisy neighbours?", answer: "Possibly. If the noise makes the unit uninhabitable and landlord refuses to address it, you may have grounds. But do it properly: document everything, give landlord opportunity to fix, get legal advice before leaving. Just moving out may leave you liable for remaining rent." }
  ];

  return (
    <>
      <SEO title="Noise Complaints Ontario | Noisy Neighbours LTB Help" description="Licensed paralegal for noise complaints in Ontario. Noisy neighbours, landlord won't act, accused of noise violation. LTB applications. Free consultation." canonical="https://www.legalassist.london/services/noise-complaints" />
      <ServicePageLayout seoTitle="Noise Complaints | Ontario" seoDescription="Noise complaint help in Ontario." canonical="https://www.legalassist.london/services/noise-complaints" problemHeadline="Noise Complaints" problemDescription="Noisy neighbours making life unbearable? Landlord won't help? Or accused of noise violations yourself? I help resolve tenant noise disputes." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Noise complaints" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Dealing with Noise Issues</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What's "Excessive" Noise?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">Likely Excessive:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Loud music late at night/early morning</li>
                  <li>• Constant yelling or screaming</li>
                  <li>• Dog barking for extended periods</li>
                  <li>• Regular parties disturbing neighbours</li>
                  <li>• Intentional stomping/jumping</li>
                  <li>• Power tools at unreasonable hours</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Normal Apartment Living:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Footsteps from upstairs neighbour</li>
                  <li>• Conversation at normal levels</li>
                  <li>• Music at reasonable volume/hours</li>
                  <li>• Children playing during daytime</li>
                  <li>• Occasional gatherings</li>
                  <li>• Normal household activities</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Escalation Path</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <ol className="text-foreground/80 space-y-3">
                <li><span className="font-bold">1. Talk to neighbour:</span> Sometimes they don't realize. A polite conversation may help.</li>
                <li><span className="font-bold">2. Written complaint to landlord:</span> Creates record. Landlord has duty to address.</li>
                <li><span className="font-bold">3. Multiple complaints:</span> Document pattern. Keep copies of all communications.</li>
                <li><span className="font-bold">4. Bylaw complaint:</span> Municipal noise bylaw enforcement. They can fine the noisy tenant.</li>
                <li><span className="font-bold">5. T2 to LTB:</span> Against landlord for failing to provide reasonable enjoyment.</li>
              </ol>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">If You're Accused of Noise</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
              <p className="text-yellow-900 mb-3">Take any N5 notice seriously. For a first N5 based on noise:</p>
              <ul className="text-yellow-900 text-sm space-y-2">
                <li>• You have 7 days to "void" by stopping the behaviour</li>
                <li>• If voided, no LTB application can proceed on that notice</li>
                <li>• Document your activities to show they're reasonable</li>
                <li>• Get witness statements from other neighbours if possible</li>
              </ul>
            </div>

            <div className="bg-primary/5 rounded-lg p-6">
              <Volume2 className="w-8 h-8 text-primary mb-3" />
              <h4 className="font-bold text-foreground mb-2">How to Document Noise</h4>
              <p className="text-foreground/80 text-sm">Keep a noise log: date, time started, time ended, type of noise, impact on you. Record audio/video if possible (check privacy laws). Get statements from other affected neighbours. Save all complaints to landlord and their responses.</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Noise Complaint FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Noise Problem Affecting You?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Whether you're the victim or accused, let me help resolve it.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
