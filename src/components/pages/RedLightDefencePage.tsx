import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Phone, CircleDot, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RedLightDefencePage() {
  useEffect(() => {
    document.title = 'Red Light Ticket Defence Ontario | Fight Your Ticket | LegalAssist';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <CircleDot className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Traffic Ticket Defence</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Red Light Ticket Defence in Ontario</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Received a red light camera ticket or charged with running a red light by an officer? These offences carry different consequences. We can help you understand your options and fight back.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Get Free Case Review <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5"><Phone className="w-5 h-5" /> (519) 601-1127</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Types of Red Light Offences</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">There are two different types of red light tickets in Ontario with very different consequences.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">Red Light Camera Ticket</h3>
              <ul className="space-y-3 mb-4">
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Fine:</span><span className="font-bold">$325</span></li>
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Demerit Points:</span><span className="font-bold text-green-600">0 points</span></li>
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Insurance Impact:</span><span className="font-bold text-green-600">None</span></li>
              </ul>
              <p className="font-paragraph text-sm text-foreground/70">Issued to the registered owner regardless of who was driving. Does not go on your driving record.</p>
            </div>
            
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">Officer-Issued Red Light Ticket</h3>
              <ul className="space-y-3 mb-4">
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Fine:</span><span className="font-bold">$325+</span></li>
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Demerit Points:</span><span className="font-bold text-red-600">3 points</span></li>
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Insurance Impact:</span><span className="font-bold text-red-600">15-25% increase</span></li>
              </ul>
              <p className="font-paragraph text-sm text-foreground/70">Issued directly to the driver. Goes on your driving record and affects insurance for 3 years.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Defence Strategies We Use</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 border border-pastelbeige">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">For Camera Tickets:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Challenge photo clarity and timing data</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Request camera calibration records</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Verify signal timing compliance</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Check if amber time was sufficient</span></li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-pastelbeige">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">For Officer-Issued Tickets:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Challenge officer's line of sight</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Prove you entered on amber</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Argue it was unsafe to stop</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Emergency circumstances defence</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Got a Red Light Ticket?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">Whether it is a camera ticket or officer-issued, we can review your case and advise on the best course of action.</p>
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
