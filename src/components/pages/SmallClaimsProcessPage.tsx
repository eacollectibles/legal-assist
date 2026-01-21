import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Phone, Scale, Shield, Clock, CheckCircle, FileText, DollarSign, Users, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SmallClaimsProcessPage() {
  useEffect(() => {
    document.title = 'Small Claims Court Process in Ontario | Step by Step Guide | LegalAssist';
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
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Small Claims Court Process in Ontario</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">A step-by-step guide to the Small Claims Court process in Ontario. Whether you are suing someone or being sued, understanding the process is essential to protecting your rights.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Book Free Consultation <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5"><Phone className="w-5 h-5" /> (519) 601-1127</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-pastelbeige/30 border-y border-pastelbeige">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <DollarSign className="w-10 h-10 text-primary mx-auto mb-2" />
              <p className="font-heading text-2xl font-bold text-foreground">Up to $50,000</p>
              <p className="font-paragraph text-foreground/70 text-sm">Maximum claim amount in Ontario Small Claims Court</p>
            </div>
            <div className="text-center">
              <Clock className="w-10 h-10 text-primary mx-auto mb-2" />
              <p className="font-heading text-2xl font-bold text-foreground">2 Year Limit</p>
              <p className="font-paragraph text-foreground/70 text-sm">General limitation period to file most claims</p>
            </div>
            <div className="text-center">
              <Users className="w-10 h-10 text-primary mx-auto mb-2" />
              <p className="font-heading text-2xl font-bold text-foreground">No Lawyer Required</p>
              <p className="font-paragraph text-foreground/70 text-sm">Paralegals can represent you in Small Claims Court</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">The Small Claims Court Process</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">Here is what to expect when pursuing or defending a Small Claims Court matter in Ontario.</p>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
                <div className="w-0.5 h-full bg-primary/20 mt-2"></div>
              </div>
              <div className="flex-1 pb-8">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">Plaintiff's Claim</h3>
                <p className="font-paragraph text-foreground/70 mb-4">The process begins when the Plaintiff files a Plaintiff's Claim with the court. This document sets out who is being sued, why, and for how much. It must be served on the Defendant.</p>
                <div className="bg-pastelbeige/30 rounded-lg p-4 border border-pastelbeige">
                  <p className="font-paragraph text-sm text-foreground/80"><strong>Filing Fee:</strong> Varies based on claim amount and whether you are an individual or corporation.</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
                <div className="w-0.5 h-full bg-primary/20 mt-2"></div>
              </div>
              <div className="flex-1 pb-8">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">Defence (and Defendant's Claim)</h3>
                <p className="font-paragraph text-foreground/70 mb-4">The Defendant has 20 days to file a Defence. They may also file a Defendant's Claim if they believe the Plaintiff owes them money (counterclaim).</p>
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <p className="font-paragraph text-sm text-foreground/80"><strong>Warning:</strong> If no Defence is filed, the Plaintiff can request default judgment and the Defendant loses the right to dispute.</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
                <div className="w-0.5 h-full bg-primary/20 mt-2"></div>
              </div>
              <div className="flex-1 pb-8">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">Settlement Conference</h3>
                <p className="font-paragraph text-foreground/70 mb-4">Before trial, both parties attend a Settlement Conference with a judge or deputy judge. The purpose is to explore settlement options, narrow issues, and prepare for trial if needed.</p>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="font-paragraph text-sm text-foreground/80"><strong>Tip:</strong> Many cases settle at this stage. Come prepared with your best evidence and realistic expectations.</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">4</div>
                <div className="w-0.5 h-full bg-primary/20 mt-2"></div>
              </div>
              <div className="flex-1 pb-8">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">Trial</h3>
                <p className="font-paragraph text-foreground/70 mb-4">If the case does not settle, it proceeds to trial. Both parties present evidence, call witnesses, and make arguments. The judge makes a decision, usually at the end of the hearing.</p>
                <div className="bg-pastelbeige/30 rounded-lg p-4 border border-pastelbeige">
                  <p className="font-paragraph text-sm text-foreground/80"><strong>Timeline:</strong> Trials are typically scheduled 6-12 months after the Settlement Conference, depending on court availability.</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">5</div>
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">Judgment and Enforcement</h3>
                <p className="font-paragraph text-foreground/70 mb-4">If you win, you receive a judgment for the amount owed plus costs. If the debtor does not pay, you can enforce the judgment through garnishment, seizure of assets, or examination hearings.</p>
                <div className="bg-pastelbeige/30 rounded-lg p-4 border border-pastelbeige">
                  <p className="font-paragraph text-sm text-foreground/80"><strong>Note:</strong> Winning a judgment and collecting the money are two different things. We can assist with enforcement if needed.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Common Small Claims Court Cases</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-6 border border-pastelbeige">
              <DollarSign className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Unpaid Debts</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Unpaid invoices, loans, or money owed under a contract.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-pastelbeige">
              <FileText className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Contract Disputes</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Breach of contract, failure to deliver goods or services.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-pastelbeige">
              <AlertTriangle className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Property Damage</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Damage to your property caused by another person.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-pastelbeige">
              <Users className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Consumer Disputes</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Disputes with contractors, retailers, or service providers.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-pastelbeige">
              <Scale className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Employment Claims</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Wrongful dismissal, unpaid wages (up to $50,000).</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-pastelbeige">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Return of Property</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Recovery of personal property wrongfully held by another.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Why Hire a Paralegal for Small Claims Court?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"><CheckCircle className="w-5 h-5 text-primary" /></div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Court Experience</h3>
                <p className="font-paragraph text-foreground/70">We know the rules, procedures, and what judges expect. This experience helps present your case effectively.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"><CheckCircle className="w-5 h-5 text-primary" /></div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Proper Documentation</h3>
                <p className="font-paragraph text-foreground/70">We ensure all forms are completed correctly and filed on time. Mistakes can delay your case or result in dismissal.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"><CheckCircle className="w-5 h-5 text-primary" /></div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Negotiation Skills</h3>
                <p className="font-paragraph text-foreground/70">Many cases settle before trial. We negotiate on your behalf to achieve the best possible outcome.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"><CheckCircle className="w-5 h-5 text-primary" /></div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Cost Effective</h3>
                <p className="font-paragraph text-foreground/70">Paralegal fees are significantly lower than lawyer fees, making professional representation affordable.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Need Help with a Small Claims Matter?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">Whether you are suing someone or being sued, we can help. Contact us for a free consultation to discuss your case.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Book Free Consultation <ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary-foreground/10"><Phone className="w-5 h-5" /> (519) 601-1127</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
