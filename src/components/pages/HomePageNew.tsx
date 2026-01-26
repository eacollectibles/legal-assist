// HPI 2.0 - MINIMAL TEST VERSION
import { Link } from 'react-router-dom';
import { ArrowRight, Scale, Home, AlertCircle, Briefcase, Gavel, Users, Shield, Clock, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* HERO SECTION */}
      <section className="min-h-[80vh] flex items-center bg-secondary">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12 py-20">
          <div className="max-w-3xl">
            <span className="text-primary font-paragraph text-sm tracking-widest uppercase mb-6 block">
              Licensed Ontario Paralegals
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-heading leading-tight mb-8">
              Legal help <span className="text-primary">without</span> the lawyer price tag.
            </h1>
            <p className="text-white/70 font-paragraph text-lg mb-10 max-w-xl">
              Expert representation for traffic tickets, landlord-tenant disputes, small claims court, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="bg-primary text-white px-8 py-4 rounded-lg font-paragraph text-center">
                Free Consultation
              </Link>
              <Link to="/services" className="border border-white/25 text-white px-8 py-4 rounded-lg font-paragraph text-center">
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST SIGNALS */}
      <section className="py-12 bg-background">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-6 p-6 bg-primary/5 rounded-2xl border border-primary/10">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-heading font-semibold">Licensed Ontario Paralegal</p>
                <p className="text-sm text-muted-foreground">Every file handled by a licensed paralegal.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Scale className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-heading font-semibold">Regulated by the LSO</p>
                <p className="text-sm text-muted-foreground">Within authorized scope of practice.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-heading font-semibold">No Pressure</p>
                <p className="text-sm text-muted-foreground">We explain options. You decide.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-4xl text-secondary text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mb-6">1</div>
              <h3 className="font-heading text-xl text-secondary mb-3">Tell Us What's Going On</h3>
              <p className="text-secondary/70">Share details during a free 30-minute consultation.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mb-6">2</div>
              <h3 className="font-heading text-xl text-secondary mb-3">Get Your Plan</h3>
              <p className="text-secondary/70">We review your situation and present clear options.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mb-6">3</div>
              <h3 className="font-heading text-xl text-secondary mb-3">We Take Action</h3>
              <p className="text-secondary/70">We handle filings, letters, and representation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-secondary text-white">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-4xl text-center mb-12">Why Choose LegalAssist</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white/10 p-6 rounded-xl">
              <Scale className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-heading text-xl mb-2">Licensed Expertise</h3>
              <p className="text-white/70 text-sm">All paralegals licensed by the Law Society of Ontario.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl">
              <Users className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-heading text-xl mb-2">Client-Centered</h3>
              <p className="text-white/70 text-sm">We take time to understand your unique situation.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl">
              <Clock className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-heading text-xl mb-2">Efficient Process</h3>
              <p className="text-white/70 text-sm">Quick response times and clear communication.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl">
              <Shield className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-heading text-xl mb-2">Affordable Rates</h3>
              <p className="text-white/70 text-sm">$150-250/hour with flat-fee options available.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-4xl text-white text-center mb-4">Our Practice Areas</h2>
          <p className="text-white/70 text-center mb-12">Comprehensive legal representation across Ontario</p>
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/services/small-claims-court" className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-primary transition-colors group">
              <Scale className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl text-white mb-2 group-hover:text-primary">Small Claims Court</h3>
              <p className="text-white/70 text-sm mb-4">Civil disputes up to $50,000 in Ontario.</p>
              <span className="text-primary text-sm flex items-center gap-2">Learn More <ArrowRight className="w-4 h-4" /></span>
            </Link>
            <Link to="/services/landlord-tenant-board" className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-primary transition-colors group">
              <Home className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl text-white mb-2 group-hover:text-primary">Landlord & Tenant Board</h3>
              <p className="text-white/70 text-sm mb-4">Residential tenancy disputes and evictions.</p>
              <span className="text-primary text-sm flex items-center gap-2">Learn More <ArrowRight className="w-4 h-4" /></span>
            </Link>
            <Link to="/services/traffic-tickets" className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-primary transition-colors group">
              <AlertCircle className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl text-white mb-2 group-hover:text-primary">Traffic Tickets</h3>
              <p className="text-white/70 text-sm mb-4">Speeding, careless driving, and other violations.</p>
              <span className="text-primary text-sm flex items-center gap-2">Learn More <ArrowRight className="w-4 h-4" /></span>
            </Link>
            <Link to="/services/human-rights-tribunal" className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-primary transition-colors group">
              <Users className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl text-white mb-2 group-hover:text-primary">Human Rights Tribunal</h3>
              <p className="text-white/70 text-sm mb-4">Discrimination in employment and housing.</p>
              <span className="text-primary text-sm flex items-center gap-2">Learn More <ArrowRight className="w-4 h-4" /></span>
            </Link>
            <Link to="/services/employment-issues" className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-primary transition-colors group">
              <Briefcase className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl text-white mb-2 group-hover:text-primary">Employment Issues</h3>
              <p className="text-white/70 text-sm mb-4">Wrongful dismissal and workplace disputes.</p>
              <span className="text-primary text-sm flex items-center gap-2">Learn More <ArrowRight className="w-4 h-4" /></span>
            </Link>
            <Link to="/services/criminal-matters" className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-primary transition-colors group">
              <Gavel className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl text-white mb-2 group-hover:text-primary">Criminal Matters</h3>
              <p className="text-white/70 text-sm mb-4">Summary conviction offences defence.</p>
              <span className="text-primary text-sm flex items-center gap-2">Learn More <ArrowRight className="w-4 h-4" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-4xl text-secondary text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-heading text-lg text-secondary cursor-pointer">What can a paralegal represent me for in Ontario?</summary>
              <p className="mt-4 text-secondary/70">Licensed paralegals in Ontario can represent clients in Small Claims Court (up to $50,000), Provincial Offences Court, Landlord and Tenant Board, certain tribunals (HRTO, LAT), and summary conviction offences.</p>
            </details>
            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-heading text-lg text-secondary cursor-pointer">How much do paralegal services cost?</summary>
              <p className="mt-4 text-secondary/70">Our rates range from $150-250/hour depending on complexity. We also offer flat-fee packages for common services. Your initial 30-minute consultation is free.</p>
            </details>
            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-heading text-lg text-secondary cursor-pointer">Do I need a lawyer or a paralegal?</summary>
              <p className="mt-4 text-secondary/70">If your matter falls within the paralegal scope of practice, a licensed paralegal can provide quality representation at a lower cost. For matters outside this scope, you would need a lawyer.</p>
            </details>
            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-heading text-lg text-secondary cursor-pointer">What areas do you serve?</summary>
              <p className="mt-4 text-secondary/70">We serve clients throughout Ontario with a focus on London and Southwestern Ontario. Many matters can be handled remotely through virtual consultations.</p>
            </details>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-primary/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-heading text-4xl md:text-5xl text-secondary mb-6">
            Ready to discuss your legal matter?
          </h2>
          <p className="text-secondary/70 text-lg mb-8">
            Get a clear explanation of your rights and options under Ontario law.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-paragraph text-lg">
            Book Free Consultation <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-4 text-secondary/60 text-sm">Licensed Ontario paralegal • No obligation</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
