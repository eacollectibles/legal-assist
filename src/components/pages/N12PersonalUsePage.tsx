import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Phone, Home, AlertTriangle, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function N12PersonalUsePage() {
  useEffect(() => {
    document.title = 'N12 Personal Use Eviction Ontario | Landlord Own Use | LegalAssist';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Home className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Landlord &amp; Tenant Board</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">N12 Personal Use Eviction in Ontario</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">The N12 notice allows landlords to evict tenants when they or a family member needs the unit for personal use. We help both landlords and tenants navigate this process correctly.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Book Free Consultation <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5"><Phone className="w-5 h-5" /> (519) 601-1127</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Who Can Use an N12?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
              <h3 className="font-heading text-lg font-bold text-green-700 mb-4">Eligible Persons:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">The landlord themselves</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Landlord's spouse</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Landlord's child or parent</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Spouse's child or parent</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Person providing care to any above</span></li>
              </ul>
            </div>
            
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
              <h3 className="font-heading text-lg font-bold text-red-700 mb-4">NOT Eligible:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Siblings</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Grandchildren</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Aunts, uncles, cousins</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Friends</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Corporate landlords (with exceptions)</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">N12 Requirements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 border border-pastelbeige">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">Notice Requirements:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70"><strong>60 days notice</strong> minimum</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Termination date must be <strong>end of rental period</strong></span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Must include <strong>compensation</strong> (1 month rent)</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Must sign <strong>declaration of good faith</strong></span></li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-pastelbeige">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">Bad Faith Consequences:</h3>
              <p className="font-paragraph text-foreground/70 mb-4">If the landlord did not actually move in or moved out within 12 months:</p>
              <ul className="space-y-2">
                <li className="font-paragraph text-foreground/70">• General compensation for tenant's costs</li>
                <li className="font-paragraph text-foreground/70">• Rent difference if new place costs more</li>
                <li className="font-paragraph text-foreground/70">• Moving and storage expenses</li>
                <li className="font-paragraph text-foreground/70">• <strong>Administrative penalty up to $50,000</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Need Help with an N12?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">Whether you are a landlord serving an N12 or a tenant who received one, we can help you understand your rights.</p>
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
