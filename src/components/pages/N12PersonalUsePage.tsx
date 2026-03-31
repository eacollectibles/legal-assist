import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, DollarSign, HelpCircle, Home, Clock, AlertCircle, Scale, Users } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function N12PersonalUsePage() {
  const authorityItems = [
    { title: 'N12 Defence Expertise', description: 'N12 "landlord\'s own use" evictions are frequently abused. I know the defences that work and how to identify bad faith.' },
    { title: 'Compensation Focus', description: 'Even if the N12 is valid, you\'re entitled to compensation. I ensure you receive everything owed.' },
    { title: 'Bad Faith Investigation', description: 'If the landlord re-rents shortly after you leave, you may be entitled to 12 months\' rent compensation.' }
  ];

  const processSteps = [
    { step: '1', title: 'N12 Analysis', description: 'Review the notice for technical defects and assess likelihood of bad faith.' },
    { step: '2', title: 'Defence Strategy', description: 'Challenge validity, negotiate extended timelines, or prepare for bad faith claim.' },
    { step: '3', title: 'LTB Representation', description: 'Represent you at the hearing and protect your rights.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Technical Review', description: 'Many N12s have defects that invalidate them.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Compensation Enforcement', description: 'Ensure you receive 1 month\'s rent compensation.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Bad Faith Monitoring', description: 'Track the unit after you leave for potential claims.' }
  ];

  const honestFAQs = [
    { question: "What is an N12 notice?", answer: "An N12 is a notice to end tenancy because the landlord, a family member, or a caregiver wants to move into the unit. The landlord must give 60 days notice and provide one month's rent compensation. The person moving in must actually occupy the unit for at least 12 months." },
    { question: "How do I know if the N12 is in bad faith?", answer: "Common signs: landlord recently bought property as investment, rent is below market, landlord has multiple properties, the 'family member' is vague or distant, landlord suggests you can stay if you pay more rent. These don't prove bad faith but raise red flags." },
    { question: "What compensation am I owed?", answer: "One month's rent compensation, paid before you move out or as a rent credit. If the landlord doesn't pay, the N12 may be invalid. If they act in bad faith (re-rent, don't move in family member), you can claim up to 12 months' rent compensation." },
    { question: "Can I refuse to leave?", answer: "You can dispute the N12 at the LTB. You cannot simply refuse—if the landlord gets an eviction order and you don't leave, the Sheriff will enforce it. Fighting at the LTB hearing is your opportunity to challenge the eviction." },
    { question: "What if they re-rent after I leave?", answer: "If the landlord re-rents the unit within 12 months, you can file a T5 application for bad faith compensation—up to 12 months' rent. Keep records, check rental listings, and document if someone else moves in." },
    { question: "What defences work against N12s?", answer: "Technical defects (wrong dates, improper service), bad faith indicators, landlord's stated person doesn't genuinely intend to occupy, compensation not properly paid, landlord trying to evict for other reasons disguised as N12." }
  ];

  return (
    <>
      <SEO title="N12 Eviction Defence Paralegal | Landlord Personal Use Eviction | Ontario" description="Licensed paralegal defending against N12 landlord's own use evictions in Ontario. Bad faith claims, compensation enforcement. Know your rights. Free consultation." canonical="https://www.legalassist.london/services/n12-personal-use" />
      <ServicePageLayout seoTitle="N12 Eviction Defence | Ontario" seoDescription="Defending against N12 landlord's own use evictions in Ontario." canonical="https://www.legalassist.london/services/n12-personal-use" problemHeadline="N12 'Landlord's Own Use' Eviction Defence" problemDescription="Received an N12 notice? These evictions are frequently abused by landlords looking to raise rent. You have rights—and potential compensation if they're acting in bad faith." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "N12 eviction defence" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding N12 Evictions</h2>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                Frequently Abused
              </h3>
              <p className="text-yellow-900">N12s are one of the most abused eviction notices in Ontario. Many landlords use them to remove tenants paying below-market rent with no intention of actually moving in a family member.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <Clock className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-2">60 Days</div>
                <p className="text-foreground/80 font-medium">Minimum Notice</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <DollarSign className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-2">1 Month</div>
                <p className="text-foreground/80 font-medium">Rent Compensation</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <Home className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-2">12 Months</div>
                <p className="text-foreground/80 font-medium">Required Occupancy</p>
              </div>
              <div className="bg-red-50 rounded-lg p-6 text-center">
                <AlertCircle className="w-10 h-10 text-red-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-red-700 mb-2">12 Months</div>
                <p className="text-red-800 font-medium">Bad Faith Compensation</p>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Who Can Use an N12?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Valid for:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Landlord themselves</li>
                  <li>• Landlord's spouse</li>
                  <li>• Children or parents</li>
                  <li>• Spouse's children or parents</li>
                  <li>• Caregiver for any of above</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <XCircle className="w-6 h-6 text-red-600 mb-2" />
                <h4 className="font-bold text-red-800 mb-2">NOT Valid for:</h4>
                <ul className="text-red-900 text-sm space-y-1">
                  <li>• Siblings, cousins, etc.</li>
                  <li>• Friends or acquaintances</li>
                  <li>• Corporate landlords (must be individual)</li>
                  <li>• New buyers (must wait until possession)</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Red Flags for Bad Faith</h3>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-red-900 text-sm">
                <ul className="space-y-2">
                  <li>⚠️ Landlord recently purchased property as investment</li>
                  <li>⚠️ Your rent is significantly below market rate</li>
                  <li>⚠️ Landlord owns multiple properties</li>
                  <li>⚠️ "Family member" is vague or unspecified</li>
                </ul>
                <ul className="space-y-2">
                  <li>⚠️ Landlord suggested you can stay for higher rent</li>
                  <li>⚠️ N12 came after you requested repairs</li>
                  <li>⚠️ Landlord has issued N12s on other units</li>
                  <li>⚠️ Family member lives elsewhere comfortably</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Your Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Challenge at LTB When:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Notice has technical defects</li>
                  <li>• Bad faith indicators present</li>
                  <li>• Compensation not paid properly</li>
                  <li>• Person doesn't genuinely intend to occupy</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
                <h4 className="font-bold text-yellow-800 mb-2">Negotiate When:</h4>
                <ul className="text-yellow-900 text-sm space-y-1">
                  <li>• N12 appears legitimate</li>
                  <li>• Want more time to find housing</li>
                  <li>• Want additional compensation</li>
                  <li>• Prefer certainty over hearing</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <Scale className="w-6 h-6 text-blue-600 mb-2" />
                <h4 className="font-bold text-blue-800 mb-2">File T5 (Bad Faith) If:</h4>
                <ul className="text-blue-900 text-sm space-y-1">
                  <li>• Unit is re-listed for rent</li>
                  <li>• Different person moves in</li>
                  <li>• Family member never occupies</li>
                  <li>• Occupies less than 12 months</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">N12 Honest Answers</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Received an N12 Notice?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Don't assume you have to leave. Let's review the notice and your options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
