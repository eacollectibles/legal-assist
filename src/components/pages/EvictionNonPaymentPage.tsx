import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Phone, Home, CheckCircle, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EvictionNonPaymentPage() {
  useEffect(() => {
    document.title = 'Eviction for Non-Payment of Rent in Ontario | N4 Notice | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Expert representation for eviction non-payment cases in Ontario. Licensed paralegal for N4 notices, rent arrears, and LTB applications. Landlord and tenant services.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Home className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Landlord Services</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Eviction for Non-Payment of Rent (N4)</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Tenant not paying rent? We help Ontario landlords navigate the eviction process from serving the N4 notice through to obtaining and enforcing an eviction order.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Start Eviction Process <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5"><Phone className="w-5 h-5" /> (519) 601-1127</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">The Non-Payment Eviction Process</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">Understanding the timeline and steps for evicting a tenant who has not paid rent.</p>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
                <div className="w-0.5 h-full bg-primary/20 mt-2"></div>
              </div>
              <div className="flex-1 pb-8">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">Serve N4 Notice</h3>
                <p className="font-paragraph text-foreground/70 mb-4">When rent is overdue, serve the tenant with an N4 Notice to End a Tenancy Early for Non-payment of Rent. The notice must include the correct amount owing and give proper notice periods.</p>
                <div className="bg-pastelbeige/30 rounded-lg p-4 border border-pastelbeige">
                  <p className="font-paragraph text-sm text-foreground/80"><strong>Notice Period:</strong> 14 days for most tenancies, 7 days for daily/weekly tenancies</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
                <div className="w-0.5 h-full bg-primary/20 mt-2"></div>
              </div>
              <div className="flex-1 pb-8">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">Wait for Notice Period</h3>
                <p className="font-paragraph text-foreground/70 mb-4">The tenant has until the termination date to pay the full amount owing (rent plus any NSF fees). If they pay in full, the N4 is void and the tenancy continues.</p>
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <p className="font-paragraph text-sm text-foreground/80"><strong>Important:</strong> If the tenant pays after the N4 but before you file at the LTB, the notice is void.</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
                <div className="w-0.5 h-full bg-primary/20 mt-2"></div>
              </div>
              <div className="flex-1 pb-8">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">File L1 Application</h3>
                <p className="font-paragraph text-foreground/70 mb-4">If the tenant has not paid or vacated, file an L1 Application to Evict a Tenant for Non-payment of Rent and to Collect Rent the Tenant Owes with the Landlord and Tenant Board.</p>
                <div className="bg-pastelbeige/30 rounded-lg p-4 border border-pastelbeige">
                  <p className="font-paragraph text-sm text-foreground/80"><strong>Filing Fee:</strong> Currently $201 (subject to change). You can request this be added to the order.</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">4</div>
                <div className="w-0.5 h-full bg-primary/20 mt-2"></div>
              </div>
              <div className="flex-1 pb-8">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">Attend LTB Hearing</h3>
                <p className="font-paragraph text-foreground/70 mb-4">The LTB will schedule a hearing (usually by video conference). We represent you, present evidence of non-payment, and argue for an eviction order.</p>
                <div className="bg-pastelbeige/30 rounded-lg p-4 border border-pastelbeige">
                  <p className="font-paragraph text-sm text-foreground/80"><strong>Timeline:</strong> Hearings are typically scheduled 4-8 weeks after filing, depending on LTB backlog.</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">5</div>
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">Enforce the Order</h3>
                <p className="font-paragraph text-foreground/70 mb-4">If the tenant does not pay or vacate by the order date, we file the order with the Sheriff for enforcement. The Sheriff will schedule an eviction date.</p>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="font-paragraph text-sm text-foreground/80"><strong>Result:</strong> Eviction order plus judgment for arrears that can be enforced through Small Claims Court.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Common N4 Mistakes to Avoid</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 border border-red-200">
              <AlertTriangle className="w-8 h-8 text-red-500 mb-4" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Wrong Amount Calculated</h3>
              <p className="font-paragraph text-foreground/70">The N4 must state the exact amount owing. Including incorrect amounts or charges not permitted can void the notice.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-red-200">
              <AlertTriangle className="w-8 h-8 text-red-500 mb-4" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Improper Service</h3>
              <p className="font-paragraph text-foreground/70">The N4 must be served correctly. Hand delivery, mail, or sliding under the door have different rules and timelines.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-red-200">
              <AlertTriangle className="w-8 h-8 text-red-500 mb-4" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Wrong Termination Date</h3>
              <p className="font-paragraph text-foreground/70">The termination date must fall on the last day of a rental period and provide the minimum notice required.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-red-200">
              <AlertTriangle className="w-8 h-8 text-red-500 mb-4" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Filing Too Early</h3>
              <p className="font-paragraph text-foreground/70">You cannot file the L1 until after the termination date on the N4 has passed. Filing early will get your application dismissed.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Why Use a Paralegal for Evictions?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"><CheckCircle className="w-5 h-5 text-primary" /></div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Avoid Costly Mistakes</h3>
                <p className="font-paragraph text-foreground/70">One error on the N4 or L1 can delay your case by months. We ensure everything is done correctly the first time.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"><CheckCircle className="w-5 h-5 text-primary" /></div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Save Time</h3>
                <p className="font-paragraph text-foreground/70">We handle all paperwork, filings, and communications so you can focus on your business or other properties.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"><CheckCircle className="w-5 h-5 text-primary" /></div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Professional Representation</h3>
                <p className="font-paragraph text-foreground/70">At the hearing, we present your case professionally, cross-examine the tenant, and argue for the best possible outcome.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"><CheckCircle className="w-5 h-5 text-primary" /></div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Maximize Recovery</h3>
                <p className="font-paragraph text-foreground/70">We ensure the order includes all arrears, filing fees, and daily compensation so you recover as much as possible.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Ready to Start the Eviction Process?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">Contact us for a free consultation. We will review your situation and get the eviction process started immediately.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Start Eviction Process <ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary-foreground/10"><Phone className="w-5 h-5" /> (519) 601-1127</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
