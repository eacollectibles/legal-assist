import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Phone, Hammer, CheckCircle, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function N13RenovationEvictionPage() {
  useEffect(() => {
    document.title = 'N13 Renovation Eviction Ontario | Demolition & Conversion | LegalAssist';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Hammer className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Landlord & Tenant Board</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">N13 Renovation/Demolition Eviction</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">The N13 notice is used when a landlord needs vacant possession for demolition, extensive renovations, or conversion to non-residential use. Strict requirements apply.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Book Free Consultation <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5"><Phone className="w-5 h-5" /> (519) 601-1127</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Three Grounds for N13</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">1. Demolition</h3>
              <p className="font-paragraph text-foreground/70 mb-4">Complete demolition of the building. Requires building permit.</p>
              <p className="font-paragraph text-sm text-primary font-semibold">Tenant has NO right to return</p>
            </div>
            
            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">2. Extensive Renovations</h3>
              <p className="font-paragraph text-foreground/70 mb-4">Renovations so extensive that vacant possession is required.</p>
              <p className="font-paragraph text-sm text-primary font-semibold">Tenant HAS right to return at same rent</p>
            </div>
            
            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">3. Conversion</h3>
              <p className="font-paragraph text-foreground/70 mb-4">Converting the unit to non-residential use.</p>
              <p className="font-paragraph text-sm text-primary font-semibold">Tenant has NO right to return</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">N13 Requirements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 border border-pastelbeige">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">Notice Requirements:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70"><strong>120 days notice</strong> minimum</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Must have <strong>necessary permits</strong> already obtained</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70"><strong>3 months rent</strong> compensation required</span></li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-pastelbeige">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">Renoviction Protections:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">LTB scrutinizes if renovations truly need vacant possession</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Tenant can dispute if permits are legitimate</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Bad faith carries penalties up to $50,000</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Dealing with an N13?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">Whether you are a landlord planning renovations or a tenant who received an N13, we can help protect your interests.</p>
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
