import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, DollarSign, HelpCircle, AlertCircle, Search, Scale, FileText } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function BadFaithEvictionPage() {
  const authorityItems = [
    { title: 'Bad Faith Claims', description: 'If your landlord evicted you under false pretenses and the unit was re-rented, you may be entitled to up to 12 months\' rent compensation.' },
    { title: 'Evidence Building', description: 'I help gather evidence: rental listings, property records, witness statements—everything needed to prove bad faith.' },
    { title: 'T5 Applications', description: 'I file and prosecute T5 applications to recover the compensation you\'re owed.' }
  ];

  const processSteps = [
    { step: '1', title: 'Evidence Gathering', description: 'Monitor the unit, collect listings, document who moved in.' },
    { step: '2', title: 'T5 Filing', description: 'File application within one year of vacating the unit.' },
    { step: '3', title: 'LTB Hearing', description: 'Present evidence and pursue maximum compensation.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Significant Compensation', description: 'Up to 12 months\' rent if bad faith is proven.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'One Year to File', description: 'You have time to gather evidence after leaving.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Administrative Fine', description: 'LTB can also fine landlords up to $50,000.' }
  ];

  const honestFAQs = [
    { question: "What is a bad faith eviction?", answer: "When a landlord uses an N12 (personal use) or N13 (renovation) eviction but doesn't actually use the unit as claimed. If they re-rent instead of moving in family, or re-rent after supposed 'renovations' without offering you the unit back, that's bad faith." },
    { question: "How do I prove bad faith?", answer: "Evidence includes: rental listings for your old unit, property records showing new tenants, photos of the unit being re-rented, testimony from new tenants or neighbors, landlord's social media, and documentation that the claimed family member never moved in." },
    { question: "What compensation can I get?", answer: "Up to 12 months' rent at the rate you were paying. Plus reasonable moving and storage costs, rent differential if new place costs more, and general damages for the disruption. LTB can also impose administrative fines on the landlord." },
    { question: "How long do I have to file?", answer: "One year from when you moved out. This gives you time to see if the landlord actually follows through on their claimed purpose. Monitor the unit, gather evidence, then file T5 if they acted in bad faith." },
    { question: "What if I signed an N11 (agreement to terminate)?", answer: "If you were pressured or misled into signing an N11, you may still have a claim—but it's harder. Document any pressure tactics, false promises, or misrepresentations the landlord made to get you to sign." },
    { question: "How should I monitor the unit?", answer: "Check rental listings (Kijiji, Facebook, Craigslist), walk by periodically, note any for-rent signs, talk to neighbors about who moved in, and check property records. Screenshot everything with dates." }
  ];

  return (
    <>
      <SEO title="Bad Faith Eviction Compensation | T5 Application Ontario" description="Licensed paralegal pursuing bad faith eviction claims in Ontario. N12/N13 violations, T5 applications. Up to 12 months rent compensation. Free consultation." canonical="https://www.legalassist.london/services/bad-faith-eviction" />
      <ServicePageLayout seoTitle="Bad Faith Eviction Claims | Ontario" seoDescription="Pursuing bad faith eviction compensation in Ontario." canonical="https://www.legalassist.london/services/bad-faith-eviction" problemHeadline="Bad Faith Eviction Compensation" problemDescription="Were you evicted for 'personal use' or 'renovations' only to see your unit re-rented? You may be entitled to up to 12 months' rent compensation." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Bad faith eviction" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Bad Faith Eviction: What It Means</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                If Your Landlord Lied to Evict You
              </h3>
              <p className="text-red-900">You have up to one year to file a T5 application and claim up to 12 months' rent compensation.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Bad Faith Scenarios</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-bold text-red-800 mb-3">N12 (Personal Use) Bad Faith:</h4>
                <ul className="text-red-900 text-sm space-y-2">
                  <li>• Unit re-rented to strangers</li>
                  <li>• Family member never moved in</li>
                  <li>• Family moved in for less than 12 months</li>
                  <li>• Unit listed at higher rent</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-bold text-red-800 mb-3">N13 (Renovation) Bad Faith:</h4>
                <ul className="text-red-900 text-sm space-y-2">
                  <li>• No substantial renovations done</li>
                  <li>• Unit re-rented without offering to you</li>
                  <li>• Offered back at higher rent</li>
                  <li>• Work didn't require vacancy</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Compensation Available</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Category</th>
                    <th className="px-6 py-4 text-left font-heading">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">General Compensation</td><td className="px-6 py-4">Up to 12 months' rent</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Moving Costs</td><td className="px-6 py-4">Reasonable documented costs</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Storage Costs</td><td className="px-6 py-4">Reasonable documented costs</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Administrative Fine</td><td className="px-6 py-4">Up to $50,000 (to landlord)</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Building Your Case</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <Search className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Monitor the Unit:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Check rental listings</li>
                  <li>• Walk by periodically</li>
                  <li>• Screenshot everything</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <FileText className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">Gather Evidence:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Photos of new tenants</li>
                  <li>• Neighbor testimony</li>
                  <li>• Property records</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <Scale className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-bold text-green-800 mb-2">File T5:</h4>
                <ul className="text-green-900 text-sm space-y-1">
                  <li>• Within one year of moving</li>
                  <li>• Include all evidence</li>
                  <li>• Request maximum</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Bad Faith FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Suspect Bad Faith Eviction?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">If your old unit is being re-rented or your landlord didn't follow through, let's discuss your claim.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
