import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Phone, AlertTriangle, DollarSign } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BadFaithEvictionPage() {
  useEffect(() => {
    document.title = 'Bad Faith Eviction Compensation Ontario | N12 N13 Claims | LegalAssist';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Tenant Rights</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Bad Faith Eviction Claims in Ontario</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Were you evicted through an N12 or N13 but the landlord did not actually move in or complete renovations? You may be entitled to significant compensation including penalties up to $50,000.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Check Your Claim <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5"><Phone className="w-5 h-5" /> (519) 601-1127</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Signs of a Bad Faith Eviction</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">N12 Bad Faith Signs:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Unit was re-rented to someone else</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Named person never moved in</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Person moved out within 12 months</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Unit listed for rent at higher price</span></li>
              </ul>
            </div>
            
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">N13 Bad Faith Signs:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Renovations were minimal or not done</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Unit re-rented at much higher price</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Not offered right to return</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Demolition did not happen</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Compensation Available</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-6 border border-pastelbeige text-center">
              <DollarSign className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Rent Difference</h3>
              <p className="font-paragraph text-sm text-foreground/70">Up to 12 months difference</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-pastelbeige text-center">
              <DollarSign className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Moving Costs</h3>
              <p className="font-paragraph text-sm text-foreground/70">Reasonable expenses incurred</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-pastelbeige text-center">
              <DollarSign className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">General Damages</h3>
              <p className="font-paragraph text-sm text-foreground/70">For inconvenience</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-pastelbeige text-center">
              <DollarSign className="w-10 h-10 text-red-500 mx-auto mb-4" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Admin Penalty</h3>
              <p className="font-paragraph text-sm text-foreground/70"><strong>Up to $50,000</strong></p>
            </div>
          </div>
          
          <div className="mt-8 max-w-3xl mx-auto bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
            <p className="font-paragraph text-foreground/80 text-center text-lg"><strong>You have 2 years from the date you moved out</strong> to file a T5 application for bad faith eviction compensation.</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Think You Were Evicted in Bad Faith?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">Contact us for a free consultation. We will review your situation and advise if you have a claim.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Check Your Claim <ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary-foreground/10"><Phone className="w-5 h-5" /> (519) 601-1127</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
