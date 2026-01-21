import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Phone, Home, AlertCircle, CheckCircle, Clock, DollarSign, Scale, FileText, Camera } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function SecurityDepositsPage() {
  useEffect(() => {
    document.title = 'Get Your Security Deposit Back | Ontario Small Claims Court';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Landlord won\'t return your security deposit? Sue in Small Claims Court to recover your last month\'s rent or key deposit. Licensed paralegal in London, Ontario. Free consultation.');
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
              <Home className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Small Claims Court • Tenant Rights</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Get Your Security Deposit Back</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Landlord keeping your last month's rent or refusing to return your key deposit? You have legal options. Small Claims Court is the fastest way to recover wrongfully held deposits in Ontario.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Free Case Assessment <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5"><Phone className="w-5 h-5" /> (519) 601-1127</a>
            </div>
          </div>
        </div>
      </section>

      {/* What's Legal Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">What Can a Landlord Legally Keep?</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">Ontario's Residential Tenancies Act strictly limits what deposits landlords can charge and keep.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="font-heading text-xl font-bold text-green-800 mb-4 flex items-center gap-2"><CheckCircle className="w-6 h-6" /> Legal Deposits</h3>
              <ul className="space-y-3 font-paragraph text-green-900">
                <li className="flex items-start gap-2"><span className="text-green-600 mt-1">✓</span> Last month's rent deposit (applied to final month only)</li>
                <li className="flex items-start gap-2"><span className="text-green-600 mt-1">✓</span> Key deposit (refundable, maximum actual cost)</li>
                <li className="flex items-start gap-2"><span className="text-green-600 mt-1">✓</span> Rent deposit interest (must be paid annually or deducted from rent increase)</li>
              </ul>
            </div>
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-4 flex items-center gap-2"><AlertCircle className="w-6 h-6" /> Illegal Deposits</h3>
              <ul className="space-y-3 font-paragraph text-red-900">
                <li className="flex items-start gap-2"><span className="text-red-600 mt-1">✗</span> Security/damage deposits</li>
                <li className="flex items-start gap-2"><span className="text-red-600 mt-1">✗</span> Pet deposits</li>
                <li className="flex items-start gap-2"><span className="text-red-600 mt-1">✗</span> First and last month's rent PLUS security deposit</li>
                <li className="flex items-start gap-2"><span className="text-red-600 mt-1">✗</span> Post-dated cheques (cannot be required)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Common Situations */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Common Deposit Disputes We Handle</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: 'Last Month\'s Rent Not Applied', desc: 'Landlord demands final month payment despite holding your deposit.' },
              { title: 'Deductions for Normal Wear', desc: 'Landlord claims "damages" for things like minor scuffs, nail holes, or carpet wear.' },
              { title: 'Deposit Not Returned', desc: 'You moved out, left it clean, but landlord won\'t refund your money.' },
              { title: 'Illegal Damage Deposit', desc: 'Landlord charged a "security deposit" which is illegal in Ontario.' },
              { title: 'Key Deposit Not Returned', desc: 'Returned keys but landlord keeps the deposit claiming they\'re "lost."' },
              { title: 'No Interest Paid', desc: 'Landlord never paid or credited the required annual interest on your deposit.' },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-pastelbeige shadow-sm">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Small Claims */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Why Small Claims Court (Not the LTB)?</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">Once you've moved out, the Landlord and Tenant Board can't help. Small Claims Court is your venue.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Binding Judgment</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Court judgment is enforceable — garnish wages, seize bank accounts if needed.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Recover Costs</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Win and you can recover court costs plus up to 15% for legal fees.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Often Settles Fast</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Many landlords pay up once they receive the claim — avoid court altogether.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Evidence Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Evidence That Helps Your Case</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { icon: FileText, title: 'Lease Agreement', desc: 'Shows what deposits were paid and the terms.' },
              { icon: DollarSign, title: 'Payment Records', desc: 'Bank statements, e-transfers, or cancelled cheques.' },
              { icon: Camera, title: 'Move-in/Move-out Photos', desc: 'Dated photos showing condition of the unit.' },
              { icon: FileText, title: 'Correspondence', desc: 'Emails or texts with landlord about the deposit.' },
            ].map((item, index) => (
              <div key={index} className="flex gap-4 items-start bg-white rounded-lg p-6 border border-pastelbeige">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="font-paragraph text-foreground/70 text-center mt-8 max-w-2xl mx-auto">Don't have all of this? We can still help. Many cases succeed with limited documentation.</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-pastelbeige">
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:text-primary">My landlord says I damaged the apartment. Can they keep my deposit?</AccordionTrigger>
                <AccordionContent className="font-paragraph text-foreground/70">In Ontario, landlords cannot collect damage deposits. The "last month's rent" deposit can ONLY be applied to rent, not damages. If the landlord believes you caused damage beyond normal wear and tear, they must sue YOU in Small Claims Court to recover those costs — they cannot simply deduct it from your deposit.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b border-pastelbeige">
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:text-primary">How long do I have to sue for my deposit?</AccordionTrigger>
                <AccordionContent className="font-paragraph text-foreground/70">The limitation period is 2 years from when the deposit should have been returned (typically your move-out date). Don't wait too long — evidence fades and memories become unreliable.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b border-pastelbeige">
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:text-primary">What if I paid an illegal "security deposit"?</AccordionTrigger>
                <AccordionContent className="font-paragraph text-foreground/70">You can recover it. Any deposit beyond last month's rent (except key deposits) is illegal under the Residential Tenancies Act. This includes "damage deposits," "cleaning deposits," and "pet deposits." You can sue in Small Claims Court to get this money back.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-b border-pastelbeige">
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:text-primary">Is it worth suing for a small deposit?</AccordionTrigger>
                <AccordionContent className="font-paragraph text-foreground/70">Consider the amount vs. cost. Filing fees start at $102. If your deposit is $1,500+, it's usually worth pursuing. For smaller amounts, sometimes a demand letter alone gets results. We offer free consultations to help you decide.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border-b border-pastelbeige">
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:text-primary">What about interest on my deposit?</AccordionTrigger>
                <AccordionContent className="font-paragraph text-foreground/70">Landlords must pay interest on last month's rent deposits at the guideline rate each year. If they never paid this interest, you can claim it in your lawsuit. Over several years, this can add hundreds of dollars to your claim.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Don't Let Your Landlord Keep What's Yours</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">Free consultation to assess your deposit claim. We'll tell you honestly if it's worth pursuing.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Free Case Assessment <ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary-foreground/10"><Phone className="w-5 h-5" /> (519) 601-1127</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
