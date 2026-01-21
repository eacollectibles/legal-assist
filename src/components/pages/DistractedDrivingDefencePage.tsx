import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Phone, AlertTriangle, Smartphone, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DistractedDrivingDefencePage() {
  useEffect(() => {
    document.title = 'Distracted Driving Defence Ontario | Cell Phone Ticket | LegalAssist';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Smartphone className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Traffic Ticket Defence</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Distracted Driving Defence in Ontario</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Charged with using a cell phone while driving? Distracted driving carries serious penalties including fines up to $3,000, demerit points, and licence suspension. We can help you fight the charge.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Get Free Case Review <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5"><Phone className="w-5 h-5" /> (519) 601-1127</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Distracted Driving Penalties in Ontario</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">Ontario has some of the strictest distracted driving laws in Canada. Penalties increase with each offence.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4 text-center">First Offence</h3>
              <ul className="space-y-3">
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Fine:</span><span className="font-bold">$615 - $1,000</span></li>
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Demerit Points:</span><span className="font-bold">3 points</span></li>
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Suspension:</span><span className="font-bold">3 days</span></li>
              </ul>
            </div>
            
            <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-6">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4 text-center">Second Offence</h3>
              <ul className="space-y-3">
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Fine:</span><span className="font-bold">$615 - $2,000</span></li>
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Demerit Points:</span><span className="font-bold">6 points</span></li>
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Suspension:</span><span className="font-bold">7 days</span></li>
              </ul>
            </div>
            
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4 text-center">Third+ Offence</h3>
              <ul className="space-y-3">
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Fine:</span><span className="font-bold">$615 - $3,000</span></li>
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Demerit Points:</span><span className="font-bold">6 points</span></li>
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Suspension:</span><span className="font-bold">30 days</span></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6 max-w-3xl mx-auto">
            <p className="font-paragraph text-foreground/80 text-center"><strong>Novice Drivers (G1, G2, M1, M2):</strong> Face immediate 30-day licence suspension on first offence, plus longer suspensions for repeat offences.</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">What Counts as Distracted Driving?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 border border-red-200">
              <h3 className="font-heading text-lg font-bold text-red-700 mb-4">Prohibited Activities:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Holding or using a cell phone</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Texting or emailing</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Watching videos or browsing</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Programming GPS while driving</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Using other handheld devices</span></li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-green-200">
              <h3 className="font-heading text-lg font-bold text-green-700 mb-4">Generally Permitted:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Hands-free calling via Bluetooth</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">One-touch to answer/end calls</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Using phone while safely parked</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Calling 911 in emergency</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Mounted GPS (set before driving)</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">How We Defend Distracted Driving Charges</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"><CheckCircle className="w-5 h-5 text-primary" /></div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Challenge the Evidence</h3>
                <p className="font-paragraph text-foreground/70">Did the officer actually see you using the device? We examine what the officer could realistically observe from their position.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"><CheckCircle className="w-5 h-5 text-primary" /></div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Prove Permitted Use</h3>
                <p className="font-paragraph text-foreground/70">Were you using a hands-free device legally? Was the phone mounted and you used one touch? We establish lawful use.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"><CheckCircle className="w-5 h-5 text-primary" /></div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Question Identification</h3>
                <p className="font-paragraph text-foreground/70">Can the officer prove it was a phone? Many objects can be mistaken for phones from a distance.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"><CheckCircle className="w-5 h-5 text-primary" /></div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Negotiate Reduction</h3>
                <p className="font-paragraph text-foreground/70">In some cases we can negotiate to a lesser charge with fewer consequences.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Charged with Distracted Driving?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">Do not just pay the ticket. The insurance and demerit point consequences are serious. Contact us for a free case review.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Get Free Case Review <ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary-foreground/10"><Phone className="w-5 h-5" /> (519) 601-1127</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
