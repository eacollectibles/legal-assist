import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { ChevronRight, CheckCircle, Clock, FileText, Users, Scale, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQSection } from '@/components/FAQSection';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { PHONE_HREF, PHONE_DISPLAY } from '@/lib/contact';

const faqs = [
  {
    question: 'How long does a Small Claims Court case take in Ontario?',
    answer: 'Most Small Claims Court cases in Ontario take 6-12 months from filing to trial. Simple cases with no defences may resolve in 3-4 months. Complex cases or those requiring multiple court appearances can take 12-18 months. Settlement conferences often occur 4-6 months after filing.'
  },
  {
    question: 'Do I need a lawyer or paralegal for Small Claims Court?',
    answer: 'You can represent yourself, but a licensed paralegal can significantly improve your chances. Paralegals are licensed to represent clients in Small Claims Court for claims up to $35,000 (or $50,000 with consent). They understand court procedures, evidence rules, and negotiation tactics that self-represented parties often miss.'
  },
  {
    question: 'What happens if I lose my Small Claims Court case?',
    answer: 'If you lose as a plaintiff, you won\'t recover your claimed amount and may have to pay some of the defendant\'s costs. If you lose as a defendant, you\'ll likely have to pay the judgment amount plus court costs and potentially interest. You can appeal to Divisional Court within 30 days on questions of law.'
  },
  {
    question: 'Can I sue for more than $35,000 in Small Claims Court?',
    answer: 'Yes, you can claim up to $50,000 if the defendant consents to the higher jurisdiction. Without consent, the limit is $35,000. If your claim exceeds these limits, you can abandon the excess to stay in Small Claims Court (which is faster and cheaper) or proceed to Superior Court.'
  },
  {
    question: 'What evidence do I need for Small Claims Court?',
    answer: 'Gather all documents supporting your claim: contracts, invoices, receipts, photographs, text messages, emails, and correspondence. Bring original documents to court and have copies for the judge and other party. Witness statements and expert reports can strengthen your case significantly.'
  }
];

const steps = [
  {
    number: '1',
    title: 'Filing Your Claim or Defence',
    description: 'Complete the Plaintiff\'s Claim (Form 7A) or Defence (Form 9A). File at the court office closest to where the defendant lives or where the issue occurred. Pay the filing fee ($102 for claims under $5,000, $202 for claims over $5,000).'
  },
  {
    number: '2',
    title: 'Serving Documents',
    description: 'Serve the defendant within 6 months of filing. Service can be personal, by mail, or by courier. The defendant has 20 days to file a Defence after being served. If no defence is filed, you can request default judgment.'
  },
  {
    number: '3',
    title: 'Settlement Conference',
    description: 'A mandatory meeting with a judge or deputy judge to explore settlement. Bring all documents and be prepared to negotiate. Many cases settle here. The judge will identify issues and may give an opinion on the likely outcome.'
  },
  {
    number: '4',
    title: 'Trial Preparation',
    description: 'If no settlement, prepare your evidence and witnesses. Organize documents chronologically. Prepare a clear, concise presentation of your case. Subpoena witnesses if needed. Review court procedures and etiquette.'
  },
  {
    number: '5',
    title: 'Trial Day',
    description: 'Arrive early, dress professionally, and bring all documents. The plaintiff presents first, then the defendant. Both sides can cross-examine witnesses. The judge may give a decision immediately or reserve judgment for later.'
  },
  {
    number: '6',
    title: 'Judgment & Enforcement',
    description: 'If you win, the judgment includes the amount owed plus costs. The losing party should pay within 30 days. If they don\'t, you can enforce through garnishment, seizure of assets, or examination hearings.'
  }
];

export default function SmallClaimsWhatToExpectPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Small Claims Court Ontario: What to Expect | Step-by-Step Guide"
        description="Complete guide to Small Claims Court in Ontario. Learn the process from filing to trial, what evidence you need, timelines, and costs. Free consultation with a licensed paralegal."
        canonical="https://www.legalassist.london/guides/small-claims-what-to-expect"
      />
      <Header />
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 pt-4">
        <Breadcrumbs />
      </div>

      {/* Hero Section with Summary */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Small Claims Court in Ontario: What to Expect
          </h1>
          
          {/* Quick Summary */}
          <div className="bg-white border-l-4 border-primary p-6 rounded-r-lg shadow-sm mb-8">
            <p className="font-paragraph text-lg text-foreground/90 leading-relaxed">
              <strong>Quick Summary:</strong> Small Claims Court handles civil disputes up to $35,000 (or $50,000 with consent) in Ontario. 
              The process typically takes 6-12 months and includes filing, serving documents, a mandatory settlement conference, and potentially a trial. 
              You can represent yourself or hire a licensed paralegal for professional representation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/booking">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Get Free Consultation
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href={PHONE_HREF}>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                Call {PHONE_DISPLAY}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
            The Small Claims Court Process: Step by Step
          </h2>
          
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  {step.number}
                </div>
                <div className="flex-1 pb-6 border-b border-gray-200 last:border-0">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="font-paragraph text-foreground/80">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Information Cards */}
      <section className="w-full py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
            Important Things to Know
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <Clock className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-heading text-lg font-semibold mb-2">Timeline</h3>
              <p className="text-foreground/80">Most cases resolve in 6-12 months. Simple undefended cases may be faster. Complex matters can take longer.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <Scale className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-heading text-lg font-semibold mb-2">Claim Limits</h3>
              <p className="text-foreground/80">$35,000 maximum (or $50,000 if the defendant consents). Claims over this amount go to Superior Court.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <FileText className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-heading text-lg font-semibold mb-2">Filing Fees</h3>
              <p className="text-foreground/80">$102 for claims under $5,000. $202 for claims over $5,000. Additional fees for motions and enforcement.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <Users className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-heading text-lg font-semibold mb-2">Representation</h3>
              <p className="text-foreground/80">You can self-represent, hire a paralegal, or hire a lawyer. Paralegals are often more cost-effective for Small Claims.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
            Frequently Asked Questions
          </h2>
          <FAQSection faqs={faqs} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-16 bg-primary/10">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
            Need Help with Your Small Claims Case?
          </h2>
          <p className="font-paragraph text-lg text-foreground/80 mb-8">
            A licensed paralegal can guide you through the process, prepare your documents, and represent you in court. Get a free consultation to discuss your case.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8">
                Book Free Consultation
              </Button>
            </Link>
            <Link to="/services/small-claims">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                Learn About Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <RelatedServices currentPath="/guides/small-claims-what-to-expect" config={relatedServicesConfig['/services/small-claims'] || relatedServicesConfig.default} />

      <Footer />
    </div>
  );
}
