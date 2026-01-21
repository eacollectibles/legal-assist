import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Phone, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboveGuidelineIncreasePage() {
  useEffect(() => {
    document.title = 'Above Guideline Rent Increase Ontario | AGI Application | LegalAssist';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <TrendingUp className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Landlord & Tenant Board</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Above Guideline Rent Increase (AGI)</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Landlords can apply to increase rent above the annual guideline for capital expenditures, operating costs, or security services. Tenants can dispute these applications.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Book Free Consultation <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5"><Phone className="w-5 h-5" /> (519) 601-1127</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Grounds for AGI Applications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">Capital Expenditures</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Major repairs or improvements:</p>
              <ul className="space-y-1 text-sm text-foreground/70">
                <li>• New roof or windows</li>
                <li>• Boiler replacement</li>
                <li>• Elevator modernization</li>
                <li>• Parking lot repairs</li>
              </ul>
            </div>
            
            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">Operating Costs</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Extraordinary increases in:</p>
              <ul className="space-y-1 text-sm text-foreground/70">
                <li>• Property taxes</li>
                <li>• Utilities</li>
                <li>• Insurance premiums</li>
              </ul>
              <p className="font-paragraph text-sm text-foreground/70 mt-2">Must exceed threshold amount.</p>
            </div>
            
            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">Security Services</h3>
              <p className="font-paragraph text-foreground/70 mb-2">New security services:</p>
              <ul className="space-y-1 text-sm text-foreground/70">
                <li>• Security guards</li>
                <li>• Monitoring systems</li>
                <li>• Access control</li>
              </ul>
              <p className="font-paragraph text-sm text-foreground/70 mt-2">Must be a new cost.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Tenant Rights to Dispute</h2>
          
          <div className="max-w-3xl mx-auto bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
            <h3 className="font-heading text-lg font-bold text-foreground mb-4">Tenants can challenge AGI applications:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Work was maintenance, not a capital expenditure</span></li>
              <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Costs are inflated or not properly documented</span></li>
              <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Building has outstanding maintenance issues</span></li>
              <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Work did not benefit the tenant's unit</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Need Help with an AGI?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">Whether you are a landlord preparing an AGI application or a tenant disputing one, we can help.</p>
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
