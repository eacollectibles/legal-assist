import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Phone, DollarSign, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DebtCollectionPage() {
  useEffect(() => {
    document.title = 'Debt Collection Small Claims Ontario | Recover Money Owed | LegalAssist';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <DollarSign className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Small Claims Court</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Debt Collection in Small Claims Court</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Someone owes you money and will not pay? Small Claims Court is an effective way to recover debts up to $50,000. We handle the entire process from demand letter to enforcement.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Start Your Claim <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5"><Phone className="w-5 h-5" /> (519) 601-1127</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Types of Debts We Collect</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Unpaid Invoices</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Customers who have not paid for goods or services.</p>
            </div>
            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Personal Loans</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Money lent to friends, family, or others.</p>
            </div>
            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">NSF Cheques</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Cheques that bounced or were returned.</p>
            </div>
            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Contractor Payments</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Clients who have not paid for work completed.</p>
            </div>
            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Promissory Notes</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Written promises to pay not honored.</p>
            </div>
            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Commercial Deposits</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Security deposits not returned.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Our Collection Process</h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { step: '1', title: 'Demand Letter', desc: 'Formal letter giving debtor one last chance to pay.' },
              { step: '2', title: 'File Claim', desc: 'File and serve a Plaintiff\'s Claim with the court.' },
              { step: '3', title: 'Settlement Conference', desc: 'Negotiate payment or prepare for trial.' },
              { step: '4', title: 'Trial & Judgment', desc: 'Obtain judgment for debt plus costs and interest.' },
              { step: '5', title: 'Enforcement', desc: 'Garnishment, seizure, or examination hearings.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">{item.step}</div>
                <div className="bg-white rounded-lg p-4 border border-pastelbeige flex-1">
                  <h3 className="font-heading font-bold text-foreground">{item.title}</h3>
                  <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Ready to Collect What You Are Owed?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">Contact us for a free consultation. We will review your debt and advise on the best approach.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Start Your Claim <ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary-foreground/10"><Phone className="w-5 h-5" /> (519) 601-1127</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
