import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Phone, Home, AlertTriangle, CheckCircle, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HarassmentByLandlordPage() {
  useEffect(() => {
    document.title = 'Landlord Harassment Ontario | Tenant Rights T2 Application | LegalAssist';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Shield className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Tenant Rights</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Harassment by Landlord in Ontario</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Is your landlord harassing you, interfering with your enjoyment, or trying to force you out? You have legal protections and can seek compensation through the Landlord and Tenant Board.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Get Help Now <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5"><Phone className="w-5 h-5" /> (519) 601-1127</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Types of Landlord Harassment</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">The Residential Tenancies Act prohibits landlords from harassing, coercing, or interfering with tenants.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">Harassment Examples:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Frequent unannounced entries</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Verbal abuse or threats</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Excessive contact or surveillance</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Deliberate disruption (noise, construction)</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Refusing to accept rent</span></li>
              </ul>
            </div>
            
            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">Interference Examples:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Reducing or removing services</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Restricting access to amenities</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Not maintaining the property</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Entering without proper notice</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Refusing reasonable requests</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Your Legal Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 border border-pastelbeige">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">T2 Application</h3>
              <p className="font-paragraph text-foreground/70 mb-4">File a T2 application at the LTB for harassment, interference, or coercion. You can seek:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Rent abatement</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">General compensation</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Order to stop the behaviour</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Administrative fine (up to $50,000)</span></li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-pastelbeige">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">Evidence to Gather</h3>
              <p className="font-paragraph text-foreground/70 mb-4">Documentation is crucial for harassment claims:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Dates, times, and descriptions</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Written communications (texts, emails)</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Photos or videos</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Witness statements</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Being Harassed by Your Landlord?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">You do not have to put up with it. Contact us to discuss your situation and legal options.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Get Help Now <ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary-foreground/10"><Phone className="w-5 h-5" /> (519) 601-1127</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
