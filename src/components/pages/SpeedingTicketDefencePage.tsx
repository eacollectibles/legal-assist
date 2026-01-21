import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Phone, AlertTriangle, CheckCircle, DollarSign, Shield, Clock, Scale } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact';

export default function SpeedingTicketDefencePage() {
  useEffect(() => {
    document.title = 'Speeding Ticket Defence in Ontario | Fight Your Ticket | LegalAssist';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Traffic Ticket Defence</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Speeding Ticket Defence in Ontario</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Got a speeding ticket? Do not just pay it. A conviction can increase your insurance rates for years and add demerit points to your licence. Let us fight it for you.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Find Out Where You Stand <ArrowRight className="w-5 h-5" /></Link>
              <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5"><Phone className="w-5 h-5" /> {PHONE_DISPLAY}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Why You Should Fight Your Speeding Ticket</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">Paying a speeding ticket is an admission of guilt with consequences that last for years.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <DollarSign className="w-10 h-10 text-red-600 mb-4" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Insurance Increases</h3>
              <p className="font-paragraph text-foreground/70">A speeding conviction can increase your auto insurance by 15-25% for up to 3 years. That is thousands of dollars in extra premiums.</p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <AlertTriangle className="w-10 h-10 text-red-600 mb-4" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Demerit Points</h3>
              <p className="font-paragraph text-foreground/70">Speeding tickets carry 3-6 demerit points depending on speed. Too many points can result in licence suspension.</p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <Scale className="w-10 h-10 text-red-600 mb-4" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Permanent Record</h3>
              <p className="font-paragraph text-foreground/70">The conviction stays on your driving record for 3 years and can affect employment opportunities requiring a clean abstract.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Ontario Speeding Ticket Demerit Points</h2>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg border border-pastelbeige overflow-hidden">
              <div className="bg-primary text-primary-foreground px-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-heading font-bold">Speed Over Limit</span>
                  <span className="font-heading font-bold text-right">Demerit Points</span>
                </div>
              </div>
              <div className="divide-y divide-pastelbeige">
                <div className="px-6 py-4 grid grid-cols-2 gap-4">
                  <span className="font-paragraph">1-15 km/h over</span>
                  <span className="font-paragraph text-right font-semibold">0 points</span>
                </div>
                <div className="px-6 py-4 grid grid-cols-2 gap-4">
                  <span className="font-paragraph">16-29 km/h over</span>
                  <span className="font-paragraph text-right font-semibold">3 points</span>
                </div>
                <div className="px-6 py-4 grid grid-cols-2 gap-4">
                  <span className="font-paragraph">30-49 km/h over</span>
                  <span className="font-paragraph text-right font-semibold">4 points</span>
                </div>
                <div className="px-6 py-4 grid grid-cols-2 gap-4 bg-red-50">
                  <span className="font-paragraph text-red-700">50+ km/h over (Stunt Driving)</span>
                  <span className="font-paragraph text-right font-semibold text-red-700">6 points + suspension</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">How We Defend Your Speeding Ticket</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"><CheckCircle className="w-5 h-5 text-primary" /></div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Review Officer Notes</h3>
                <p className="font-paragraph text-foreground/70">We obtain and analyze the officer's notes and evidence for procedural errors or inconsistencies.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"><CheckCircle className="w-5 h-5 text-primary" /></div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Challenge Radar/Laser Evidence</h3>
                <p className="font-paragraph text-foreground/70">We verify if speed detection equipment was properly calibrated and operated correctly.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"><CheckCircle className="w-5 h-5 text-primary" /></div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Negotiate Reductions</h3>
                <p className="font-paragraph text-foreground/70">We negotiate with prosecutors to reduce charges, minimize points, and lower fines.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"><CheckCircle className="w-5 h-5 text-primary" /></div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Court Representation</h3>
                <p className="font-paragraph text-foreground/70">We appear in court on your behalf so you do not have to miss work or deal with court stress.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Possible Outcomes When You Fight</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-green-600" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Complete Dismissal</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Charges withdrawn or dismissed due to insufficient evidence or procedural errors.</p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><Scale className="w-8 h-8 text-blue-600" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Reduced Charges</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Negotiated reduction to a lesser offence with fewer or no demerit points.</p>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4"><DollarSign className="w-8 h-8 text-yellow-600" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Lower Fine</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Reduced fine amount even if conviction stands, saving you money.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Why Choose LegalAssist for Traffic Defence</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Shield className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">LSO Licensed</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Regulated paralegal with authority to represent you in Provincial Offences Court.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Clock className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">We Go to Court</h3>
              <p className="font-paragraph text-foreground/70 text-sm">You do not need to take time off work. We handle all court appearances.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><DollarSign className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Flat Fee Pricing</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Know your costs upfront. No surprises or hidden fees.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Free Consultation</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We review your ticket and explain your options at no cost.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Got a Speeding Ticket?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">Do not pay it without exploring your options. Contact us for a free case review and find out how we can help.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Get Free Case Review <ArrowRight className="w-5 h-5" /></Link>
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary-foreground/10"><Phone className="w-5 h-5" /> {PHONE_DISPLAY}</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
