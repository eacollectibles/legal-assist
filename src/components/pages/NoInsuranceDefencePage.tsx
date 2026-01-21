import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Phone, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NoInsuranceDefencePage() {
  useEffect(() => {
    document.title = 'No Insurance Ticket Defence Ontario | Driving Without Insurance | LegalAssist';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-gradient-to-br from-red-100 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-red-600 mb-4">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Serious Traffic Offence</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Driving Without Insurance Defence in Ontario</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Charged with driving without insurance? This is one of the most serious Highway Traffic Act offences with minimum fines of $5,000. You need professional representation immediately.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-red-600 text-white font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-red-700">Get Urgent Help Now <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-red-600 text-red-600 font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-red-50"><Phone className="w-5 h-5" /> (519) 601-1127</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Penalties for No Insurance</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4 text-center">First Offence</h3>
              <ul className="space-y-3">
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Minimum Fine:</span><span className="font-bold text-red-600">$5,000</span></li>
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Maximum Fine:</span><span className="font-bold text-red-600">$25,000</span></li>
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Licence Suspension:</span><span className="font-bold">1 year</span></li>
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Vehicle Impound:</span><span className="font-bold">3 months</span></li>
              </ul>
            </div>
            
            <div className="bg-red-100 border-2 border-red-400 rounded-lg p-6">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4 text-center">Second Offence</h3>
              <ul className="space-y-3">
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Minimum Fine:</span><span className="font-bold text-red-600">$10,000</span></li>
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Maximum Fine:</span><span className="font-bold text-red-600">$50,000</span></li>
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Licence Suspension:</span><span className="font-bold">1 year</span></li>
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Vehicle Impound:</span><span className="font-bold">3 months</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Possible Defences</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"><CheckCircle className="w-5 h-5 text-primary" /></div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">You Had Valid Insurance</h3>
                <p className="font-paragraph text-foreground/70">Sometimes there are database errors or miscommunication with your insurer. We can help prove you were actually insured.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"><CheckCircle className="w-5 h-5 text-primary" /></div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Due Diligence Defence</h3>
                <p className="font-paragraph text-foreground/70">If you honestly believed you were insured and took reasonable steps to maintain coverage, this may be a defence.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"><CheckCircle className="w-5 h-5 text-primary" /></div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Insurance Lapsed Without Notice</h3>
                <p className="font-paragraph text-foreground/70">If your insurance company failed to notify you properly of cancellation, this may provide a defence.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"><CheckCircle className="w-5 h-5 text-primary" /></div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Fine Reduction</h3>
                <p className="font-paragraph text-foreground/70">Even if convicted, we can argue for the minimum fine and present mitigating circumstances to the court.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-red-600 text-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Charged with No Insurance?</h2>
          <p className="font-paragraph text-lg text-white/90 mb-8 max-w-2xl mx-auto">With minimum fines of $5,000, you cannot afford to handle this alone. Contact us immediately for a free consultation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-red-600 font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-gray-100">Get Free Case Review <ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-white/10"><Phone className="w-5 h-5" /> (519) 601-1127</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
