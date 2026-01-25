import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Phone, Home, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RentIncreaseGuidePage() {
  useEffect(() => {
    document.title = 'Rent Increase Rules Ontario 2025 | Guideline & Notice | LegalAssist';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <TrendingUp className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Landlord &amp; Tenant Information</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Rent Increase Rules in Ontario</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Understanding when, how much, and how landlords can legally increase rent in Ontario. Know your rights as a tenant or your obligations as a landlord.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Get Legal Help <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:+13658829515" className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5"><Phone className="w-5 h-5" /> 365-882-9515</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">2025 Rent Increase Guideline</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">The Ontario government sets the maximum rent increase percentage each year.</p>
          
          <div className="max-w-xl mx-auto bg-primary/10 border-2 border-primary rounded-lg p-8 text-center">
            <h3 className="font-heading text-5xl font-bold text-primary mb-4">2.5%</h3>
            <p className="font-paragraph text-foreground/80">2025 Rent Increase Guideline</p>
            <p className="font-paragraph text-sm text-foreground/60 mt-2">For most residential tenancies first occupied before Nov 15, 2018</p>
          </div>
          
          <div className="mt-8 max-w-3xl mx-auto bg-yellow-50 border border-yellow-300 rounded-lg p-6">
            <p className="font-paragraph text-foreground/80 text-center"><strong>Note:</strong> Units first occupied after November 15, 2018 are exempt from rent control. Landlords can increase rent by any amount with proper notice.</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Rules for Valid Rent Increases</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 border border-pastelbeige">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">Valid Increase Requirements:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70"><strong>90 days written notice</strong> required (Form N1)</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70"><strong>12 months since last increase</strong> or start of tenancy</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70"><strong>Within guideline amount</strong> (or AGI approved)</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Proper form with all required information</span></li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-pastelbeige">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">Invalid Increase Signs:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Less than 90 days notice</span></li>
                <li className="flex items-start gap-3"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Increase within 12 months of last increase</span></li>
                <li className="flex items-start gap-3"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Above guideline without LTB approval</span></li>
                <li className="flex items-start gap-3"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Informal notice (email, verbal, text)</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Questions About Rent Increases?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">Whether you are a landlord wanting to increase rent properly or a tenant who received an improper notice, we can help.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Get Legal Help <ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:+13658829515" className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary-foreground/10"><Phone className="w-5 h-5" /> 365-882-9515</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
