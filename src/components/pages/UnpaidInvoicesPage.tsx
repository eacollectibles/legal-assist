import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Phone, FileText, AlertCircle, CheckCircle, Clock, DollarSign, Scale, Users, Gavel } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function UnpaidInvoicesPage() {
  useEffect(() => {
    document.title = 'Collect Unpaid Invoices in Small Claims Court | London Ontario Paralegal';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Recover unpaid invoices up to $50,000 in Ontario Small Claims Court. Licensed paralegal in London helps businesses collect outstanding debts. Free consultation.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <DollarSign className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Small Claims Court • Debt Recovery</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Collect Unpaid Invoices Through Small Claims Court</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Stop chasing payments. A licensed paralegal can help you recover unpaid invoices up to $50,000 through Ontario's Small Claims Court — often faster and more cost-effective than you think.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Free Case Assessment <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5"><Phone className="w-5 h-5" /> (519) 601-1127</a>
            </div>
          </div>
        </div>
      </section>

      {/* When to Sue Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">When Should You Sue for an Unpaid Invoice?</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">If your collection efforts have failed and the debt is under $50,000, Small Claims Court is often your best option.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: 'Invoice 30+ Days Overdue', desc: 'Payment terms have passed and reminders have been ignored.' },
              { icon: AlertCircle, title: 'No Response to Demands', desc: 'Demand letters and phone calls are getting nowhere.' },
              { icon: FileText, title: 'You Have Documentation', desc: 'Contracts, invoices, emails proving the debt exists.' },
              { icon: DollarSign, title: 'Amount Under $50,000', desc: 'Small Claims Court handles claims up to $50,000 in Ontario.' },
              { icon: Users, title: 'Debtor Can Pay', desc: 'The person or business has assets or income to collect from.' },
              { icon: Scale, title: 'Within 2 Years', desc: 'Most contract debts must be sued within 2 years (limitation period).' },
            ].map((item, index) => (
              <div key={index} className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">The Small Claims Court Process for Unpaid Invoices</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                { step: '1', title: 'Demand Letter', desc: 'We send a formal demand letter giving the debtor a final chance to pay. Often this alone triggers payment — debtors take legal letterhead seriously.' },
                { step: '2', title: 'File the Claim', desc: 'If no payment, we prepare and file your Plaintiff\'s Claim with the court, clearly outlining the debt, evidence, and amount owed including interest.' },
                { step: '3', title: 'Serve the Defendant', desc: 'The claim must be properly served on the debtor. This gives them 20 days to respond with a Defence.' },
                { step: '4', title: 'Settlement Conference', desc: 'Most cases settle at this mandatory meeting with a judge. We negotiate aggressively to get you paid without a trial.' },
                { step: '5', title: 'Trial (if needed)', desc: 'If no settlement, we present your case at trial. Small Claims trials are streamlined — usually decided in one day.' },
                { step: '6', title: 'Enforce the Judgment', desc: 'If the debtor still won\'t pay after judgment, we can garnish wages, seize bank accounts, or place liens on property.' },
              ].map((item, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading font-bold text-xl flex-shrink-0">{item.step}</div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="font-paragraph text-foreground/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Types of Unpaid Invoice Cases */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Types of Unpaid Invoice Cases We Handle</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { title: 'Contractor & Trades', examples: 'Renovation work, plumbing, electrical, landscaping, roofing' },
              { title: 'Professional Services', examples: 'Consulting, accounting, marketing, web design, photography' },
              { title: 'Product Sales', examples: 'Wholesale goods, equipment, materials, inventory' },
              { title: 'Rent & Leases', examples: 'Commercial rent, equipment leases, vehicle leases' },
              { title: 'Service Businesses', examples: 'Cleaning, maintenance, delivery, catering, event services' },
              { title: 'Freelance & Gig Work', examples: 'Writing, design, development, consulting projects' },
            ].map((item, index) => (
              <div key={index} className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70 text-sm">{item.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-pastelbeige">
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:text-primary">How much does it cost to sue for an unpaid invoice?</AccordionTrigger>
                <AccordionContent className="font-paragraph text-foreground/70">Court filing fees range from $102 to $273 depending on the claim amount. Paralegal fees vary but are significantly less than lawyer fees. Many cases settle quickly after filing, minimizing costs. We offer free consultations to assess your case and provide a cost estimate.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b border-pastelbeige">
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:text-primary">How long does it take to collect an unpaid invoice through court?</AccordionTrigger>
                <AccordionContent className="font-paragraph text-foreground/70">Timeline varies: Some debtors pay immediately after receiving the claim (2-4 weeks). Settlement conferences are typically scheduled 2-4 months after filing. If it goes to trial, expect 6-12 months total. Enforcement can add additional time if the debtor doesn't voluntarily pay the judgment.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b border-pastelbeige">
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:text-primary">What if I don't have a written contract?</AccordionTrigger>
                <AccordionContent className="font-paragraph text-foreground/70">You can still sue. Oral contracts are enforceable in Ontario. Evidence like emails, text messages, invoices, payment history, and witness testimony can prove the agreement existed. We'll help you gather and organize your evidence.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-b border-pastelbeige">
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:text-primary">Can I add interest to my unpaid invoice claim?</AccordionTrigger>
                <AccordionContent className="font-paragraph text-foreground/70">Yes. If your contract specifies an interest rate, you can claim that amount. If not, you can claim pre-judgment interest at the court rate (currently around 3-5% annually). Interest adds up, especially on older debts.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border-b border-pastelbeige">
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:text-primary">What if the debtor has no money?</AccordionTrigger>
                <AccordionContent className="font-paragraph text-foreground/70">This is an important consideration before suing. We'll discuss what you know about the debtor's financial situation. Judgments are valid for 20 years in Ontario, so even if someone can't pay now, you can collect later when their situation improves. We can also do asset searches to determine collectability.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6" className="border-b border-pastelbeige">
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:text-primary">Can I recover my legal costs?</AccordionTrigger>
                <AccordionContent className="font-paragraph text-foreground/70">Yes, partially. If you win, the court typically awards costs of up to 15% of the claim amount. This helps offset your legal fees. Filing fees are also recoverable from the losing party.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Stop Chasing. Start Collecting.</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">Get a free assessment of your unpaid invoice case. We'll tell you honestly whether it's worth pursuing and what to expect.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Free Case Assessment <ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary-foreground/10"><Phone className="w-5 h-5" /> (519) 601-1127</a>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">Related Small Claims Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link to="/services/debt-collection" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all group">
              <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary">Debt Collection</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Full debt recovery services</p>
            </Link>
            <Link to="/services/contract-disputes" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all group">
              <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary">Contract Disputes</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Breach of contract claims</p>
            </Link>
            <Link to="/services/judgement-enforcement" className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige hover:border-primary transition-all group">
              <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary">Judgement Enforcement</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Collect on existing judgments</p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
