import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Phone, Scale, CheckCircle, DollarSign } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function JudgementEnforcementPage() {
  useEffect(() => {
    document.title = 'Judgement Enforcement Ontario | Collect Your Court Judgement | LegalAssist';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Scale className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Small Claims Court</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Judgement Enforcement in Ontario</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Won your court case but the other party will not pay? We help enforce judgements through garnishment, seizure of assets, and other legal remedies to collect what you are owed.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Start Enforcement <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5"><Phone className="w-5 h-5" /> (519) 601-1127</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Enforcement Methods</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">Ontario law provides several ways to enforce a court judgement.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <DollarSign className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Garnishment</h3>
              <p className="font-paragraph text-foreground/70 mb-4">Intercept money owed to the debtor:</p>
              <ul className="space-y-1 text-sm text-foreground/70">
                <li>• Wages (up to 20% of net wages)</li>
                <li>• Bank accounts</li>
                <li>• Amounts owed by customers/clients</li>
                <li>• Tax refunds</li>
              </ul>
            </div>
            
            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <Scale className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Writ of Seizure and Sale</h3>
              <p className="font-paragraph text-foreground/70 mb-4">Seize and sell the debtor's property:</p>
              <ul className="space-y-1 text-sm text-foreground/70">
                <li>• Personal property (vehicles, equipment)</li>
                <li>• Real estate (land and buildings)</li>
                <li>• Business assets</li>
                <li>• Investments and securities</li>
              </ul>
            </div>
            
            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <CheckCircle className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Examination of Debtor</h3>
              <p className="font-paragraph text-foreground/70 mb-4">Compel the debtor to disclose:</p>
              <ul className="space-y-1 text-sm text-foreground/70">
                <li>• Employment and income sources</li>
                <li>• Bank accounts and assets</li>
                <li>• Property ownership</li>
                <li>• Debts owed to them</li>
              </ul>
            </div>
            
            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <DollarSign className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Writ Against Land</h3>
              <p className="font-paragraph text-foreground/70 mb-4">Register against debtor's real estate:</p>
              <ul className="space-y-1 text-sm text-foreground/70">
                <li>• Prevents sale without paying judgement</li>
                <li>• Valid for 6 years (renewable)</li>
                <li>• Affects credit and ability to refinance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Important Timelines</h2>
          <div className="max-w-3xl mx-auto bg-white border border-pastelbeige rounded-lg p-6">
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70"><strong>Judgements are valid for 20 years</strong> in Ontario and can be renewed.</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70"><strong>Interest accrues</strong> on the judgement amount at the Courts of Justice Act rate.</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70"><strong>Enforcement costs</strong> can be added to the amount the debtor owes.</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70"><strong>Act quickly</strong> - debtors may try to hide assets or become harder to locate.</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Have a Judgement to Enforce?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">We can help you collect what you are legally owed. Contact us to discuss enforcement options.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Start Enforcement <ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary-foreground/10"><Phone className="w-5 h-5" /> (519) 601-1127</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
