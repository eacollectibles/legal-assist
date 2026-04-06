import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Heart, DollarSign, Camera, Calendar } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function WeddingVendorDisputesPage() {
  const authorityItems = [
    { title: 'Wedding Vendor Claims', description: 'Photographer no-show? Caterer disaster? Venue breach? I help recover damages from wedding vendors in Small Claims Court.' },
    { title: 'Emotional + Financial', description: 'Wedding disputes involve unique damages—emotional distress from ruined moments is compensable beyond just the contract price.' },
    { title: 'Documentation Critical', description: 'Contracts, communications, photos of problems, and witness statements build strong cases.' }
  ];

  const processSteps = [
    { step: '1', title: 'Gather Evidence', description: 'Contract, payments, communications, photos.' },
    { step: '2', title: 'Calculate Damages', description: 'Refund + replacement costs + distress.' },
    { step: '3', title: 'Pursue Claim', description: 'Demand letter, then Small Claims if needed.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Contract Breach', description: 'Clear terms violated = strong case.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Emotional Damages', description: 'Courts recognize wedding significance.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Must Prove Loss', description: 'Document everything thoroughly.' }
  ];

  const honestFAQs = [
    { question: "My photographer didn't show up. What can I recover?", answer: "Full refund of deposit/payment, cost of replacement photographer (if found), cost of recreating photos (if possible), and general damages for distress from lost irreplaceable moments. No-show cases typically recover well above the contract price." },
    { question: "The venue changed our date/room without consent. Is that breach?", answer: "If the contract specified the date/room and they changed it without your agreement, yes—breach of contract. You can claim refund, difference in cost for alternative venue, additional expenses caused by the change, and distress damages." },
    { question: "The food was terrible/late/wrong. What are my options?", answer: "Document with photos and guest statements. Claims include: refund proportional to the failure, cost of emergency replacement food, and distress damages. Severity matters—minor issues get partial refunds; complete failures get full refunds plus damages." },
    { question: "Can I get damages for 'emotional distress' from a ruined wedding?", answer: "Yes. Ontario courts recognize that wedding services carry special emotional significance. Mental distress damages are available when vendors know the importance and their breach causes foreseeable upset. These can be $1,000-$5,000+ depending on severity." },
    { question: "The vendor went out of business. Can I still sue?", answer: "You can sue, but collecting may be difficult. If they're incorporated and dissolved, there may be nothing to collect. If it's a sole proprietor, you can sue them personally. Check if they have insurance that might cover claims." },
    { question: "They're offering a partial refund to 'settle.' Should I take it?", answer: "Depends on what you're owed. Calculate your full damages first: refund + replacement costs + emotional distress. If their offer is close, settling saves time. If it's far below, reject and pursue full claim. Don't sign a release until satisfied." }
  ];

  return (
    <>
      <SEO title="Wedding Vendor Disputes Paralegal Ontario | Photographer No-Show" description="Licensed paralegal for wedding vendor disputes in Ontario. Photographer, venue, caterer problems. Recover refunds and emotional distress damages. Free consultation." canonical="https://www.legalassist.london/services/wedding-vendor-disputes" />
      <ServicePageLayout seoTitle="Wedding Vendor Disputes | Ontario" seoDescription="Wedding vendor dispute help in Ontario." canonical="https://www.legalassist.london/services/wedding-vendor-disputes" problemHeadline="Wedding Vendor Disputes" problemDescription="Wedding vendor disaster? Photographer no-show, venue breach, catering failure? I help recover refunds plus damages for ruined moments." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Wedding vendor disputes" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Wedding Vendor Claims</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Vendor Problems</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Vendor</th>
                    <th className="px-6 py-4 text-left font-heading">Common Issues</th>
                    <th className="px-6 py-4 text-left font-heading">Typical Damages</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Photographer</td><td className="px-6 py-4 text-sm">No-show, lost photos, poor quality, late delivery</td><td className="px-6 py-4 text-sm">Refund + recreate costs + $2,000-5,000 distress</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Venue</td><td className="px-6 py-4 text-sm">Date change, room switch, amenities missing</td><td className="px-6 py-4 text-sm">Refund + alternative costs + distress</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Caterer</td><td className="px-6 py-4 text-sm">Wrong food, late service, food safety issues</td><td className="px-6 py-4 text-sm">Proportional refund + replacement + distress</td></tr>
                  <tr><td className="px-6 py-4 font-medium">DJ/Band</td><td className="px-6 py-4 text-sm">No-show, wrong music, equipment failure</td><td className="px-6 py-4 text-sm">Full refund + replacement + distress</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Florist</td><td className="px-6 py-4 text-sm">Wrong flowers, wilted, didn't arrive</td><td className="px-6 py-4 text-sm">Refund + emergency replacement + distress</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Types of Recoverable Damages</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6">
                <DollarSign className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Direct Damages</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Full or partial refund</li>
                  <li>• Deposit recovery</li>
                  <li>• Cost of replacement vendor</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <Calendar className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Consequential</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Emergency purchases</li>
                  <li>• Additional venue time</li>
                  <li>• Guest accommodation changes</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <Heart className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Mental Distress</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Lost irreplaceable moments</li>
                  <li>• Stress on wedding day</li>
                  <li>• Ruined experience</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-heading text-xl font-bold text-green-800 mb-3">Mental Distress is Compensable</h3>
              <p className="text-green-900">Ontario courts recognize that wedding vendors know their services carry special emotional significance. When they breach and cause foreseeable upset, mental distress damages are available—often $1,000-$5,000+ depending on severity.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Building Your Case</h3>
            <div className="bg-primary/5 rounded-lg p-6">
              <h4 className="font-bold text-foreground mb-3">Essential Documentation:</h4>
              <ul className="text-foreground/80 space-y-2">
                <li>✓ Signed contract with all terms</li>
                <li>✓ Payment receipts/records</li>
                <li>✓ All communications (emails, texts)</li>
                <li>✓ Photos/videos of the problem</li>
                <li>✓ Guest witness statements</li>
                <li>✓ Receipts for emergency replacements</li>
                <li>✓ Your own statement of impact</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Wedding Vendor FAQs</h2>
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
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Wedding Vendor Problem?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Don't let them ruin your memories and keep your money. Let me help.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.smallClaims} />
      </ServicePageLayout>
    </>
  );
}
