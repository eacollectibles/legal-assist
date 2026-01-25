import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, FileText, DollarSign, AlertTriangle, Package, Wrench, Home } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BreachOfWarrantyPage() {
  useEffect(() => {
    document.title = 'Warranty Claims & Breach of Warranty | Small Claims Court Ontario | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Paralegal for warranty disputes in Ontario Small Claims Court. Manufacturer won\'t honour warranty? Defective products? Recover up to $50,000. London Ontario.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Shield className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Small Claims Court Services</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Warranty Claims & Breach of Warranty
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Company refusing to honour their warranty? Product failed prematurely? You have legal recourse in Small Claims Court to enforce warranty obligations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors">
                Free Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:3658829515" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/5 transition-colors">
                Call 365-882-9515
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Warranties */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Types of Warranties in Ontario</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-primary">
              <h3 className="font-heading text-xl font-bold text-primary mb-4">Express Warranties</h3>
              <p className="font-paragraph text-foreground/70 mb-4">Written or verbal promises made by seller or manufacturer:</p>
              <ul className="space-y-2">
                {['Written manufacturer warranty', 'Extended warranty plans', 'Seller\'s written guarantees', 'Advertising claims', 'Salesperson promises'].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/80">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">Implied Warranties</h3>
              <p className="font-paragraph text-foreground/70 mb-4">Automatic protections under Ontario's Sale of Goods Act:</p>
              <ul className="space-y-2">
                {['Merchantable quality', 'Fit for intended purpose', 'Match product description', 'Free from defects', 'Reasonable durability'].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/80">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Common Warranty Disputes We Handle</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Package, title: 'Warranty Denial', desc: 'Manufacturer or retailer refusing to honour valid warranty claim for no legitimate reason.' },
              { icon: AlertTriangle, title: 'Premature Product Failure', desc: 'Product failed well before expected lifespan, even if warranty period has technically expired.' },
              { icon: Wrench, title: 'Repeated Repair Failures', desc: 'Multiple repair attempts haven\'t fixed the problem. You may be entitled to replacement or refund.' },
              { icon: DollarSign, title: 'Unauthorized Charges', desc: 'Company charging for repairs that should be covered under warranty.' },
              { icon: Home, title: 'Home Appliance Issues', desc: 'Major appliances failing prematurely - fridges, washers, HVAC systems, water heaters.' },
              { icon: FileText, title: 'Extended Warranty Disputes', desc: 'Extended warranty company refusing to cover legitimate claims or going out of business.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <item.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="font-paragraph text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Can Recover */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What Remedies Are Available?</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { title: 'Repair', desc: 'Force the company to properly repair the defective product at no cost to you' },
                { title: 'Replacement', desc: 'Get a new product if repair isn\'t possible or has failed multiple times' },
                { title: 'Refund', desc: 'Full or partial refund if product can\'t be repaired or replaced' },
                { title: 'Diminished Value', desc: 'Compensation for difference between promised and actual product value' },
                { title: 'Consequential Damages', desc: 'Additional losses caused by the defect (e.g., food spoilage from broken fridge)' },
              ].map((item, index) => (
                <div key={index} className={`p-6 ${index !== 4 ? 'border-b border-gray-100' : ''}`}>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="font-paragraph text-foreground/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Common Denial Excuses */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Fighting Common Warranty Denial Excuses</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { excuse: '"You didn\'t register the product"', reality: 'Registration is often not required by law to enforce warranty rights.' },
              { excuse: '"You didn\'t use authorized service"', reality: 'Using non-authorized repair shouldn\'t void warranty unless it caused the defect.' },
              { excuse: '"Normal wear and tear"', reality: 'Products must last a reasonable time. Premature failure isn\'t normal wear.' },
              { excuse: '"The warranty period expired"', reality: 'Implied warranties may extend beyond written warranty period.' },
              { excuse: '"User abuse or misuse"', reality: 'Company must prove misuse. Normal use doesn\'t constitute abuse.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-heading text-lg font-bold text-red-600 mb-2">{item.excuse}</h3>
                <p className="font-paragraph text-foreground/70"><strong className="text-green-700">Reality:</strong> {item.reality}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence Needed */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Evidence for Your Warranty Claim</h2>
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-4">
            {[
              'Original purchase receipt',
              'Warranty documentation',
              'Product manual',
              'Photos/videos of the defect',
              'Repair records and invoices',
              'Communications with company',
              'Expert inspection report',
              'Advertising materials (if relevant)',
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-paragraph text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Company Won't Honour Your Warranty?</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your warranty dispute and discuss your legal options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-gray-100 transition-colors">
              Book Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:3658829515" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-white/10 transition-colors">
              Call 365-882-9515
            </a>
          </div>
        </div>
      </section>

      {/* LSO Badge */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <p className="font-paragraph text-sm text-foreground/60">
            <Shield className="w-4 h-4 inline mr-1" />
            Licensed by the Law Society of Ontario | Paralegal services for claims up to $50,000
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
