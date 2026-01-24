import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, Package, FileText, DollarSign, AlertTriangle, Key, Home } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ReturnOfPropertyPage() {
  useEffect(() => {
    document.title = 'Return of Personal Property | Wrongful Possession Claims | Small Claims Court Ontario';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Paralegal for return of personal property in Ontario Small Claims Court. Ex-partner, roommate, or employer keeping your belongings? Recover up to $50,000. London Ontario.');
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
              <Package className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Small Claims Court Services</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Return of Personal Property
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Someone has your belongings and refuses to give them back? Whether it's an ex-partner, former roommate, or employer, you can get a court order for return of your property.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors">
                Free Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:5196011110" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/5 transition-colors">
                Call (519) 601-1110
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Common Situations */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Common Return of Property Situations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Home, title: 'Ex-Partner Keeping Belongings', desc: 'After a breakup, your ex refuses to return furniture, electronics, personal items, or shared purchases.' },
              { icon: Key, title: 'Former Roommate', desc: 'Moved out but roommate won\'t give back your furniture, appliances, or other household items.' },
              { icon: Package, title: 'Employer Holding Property', desc: 'Former employer refuses to return personal tools, equipment, or items left at workplace.' },
              { icon: AlertTriangle, title: 'Borrowed Items Never Returned', desc: 'Lent something of value - car, equipment, tools - and the borrower won\'t return it.' },
              { icon: DollarSign, title: 'Storage Facility Disputes', desc: 'Storage company won\'t release your belongings or is holding them for disputed fees.' },
              { icon: FileText, title: 'Bailment Claims', desc: 'Left property with someone for safekeeping or repair and they won\'t return it.' },
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

      {/* What Court Can Order */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What the Court Can Order</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-heading text-xl font-bold text-primary mb-4">Return of Property</h3>
                <p className="font-paragraph text-foreground/70">Court can order the person to physically return your belongings to you within a specified time period.</p>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-heading text-xl font-bold text-primary mb-4">Monetary Compensation</h3>
                <p className="font-paragraph text-foreground/70">If property was damaged, destroyed, or sold, court can award the fair market value of the items.</p>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-heading text-xl font-bold text-primary mb-4">Consequential Damages</h3>
                <p className="font-paragraph text-foreground/70">Additional costs you suffered like rental equipment, storage fees, or lost business.</p>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-heading text-xl font-bold text-primary mb-4">Enforcement Options</h3>
                <p className="font-paragraph text-foreground/70">If they still refuse, enforcement through sheriff seizure or contempt proceedings.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proving Ownership */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Proving the Property is Yours</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <p className="font-paragraph text-foreground/80 mb-6">
                The key challenge in these cases is proving you own the items. Evidence that helps:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Purchase receipts',
                  'Credit card statements',
                  'Photos showing you with the items',
                  'Registration documents (vehicles, electronics)',
                  'Warranty cards in your name',
                  'Gift receipts or cards',
                  'Insurance records listing the items',
                  'Witness statements',
                  'Text messages discussing ownership',
                  'Moving records or inventories',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="font-paragraph text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Property Warning */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-10 h-10 text-amber-600 flex-shrink-0" />
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Note About Shared or Gifted Property</h2>
                <p className="font-paragraph text-foreground/80 mb-4">
                  Courts look carefully at whether property was truly yours alone or jointly owned:
                </p>
                <ul className="space-y-2">
                  <li className="font-paragraph text-foreground/80">• Items purchased together may be considered jointly owned</li>
                  <li className="font-paragraph text-foreground/80">• Gifts once given generally cannot be reclaimed</li>
                  <li className="font-paragraph text-foreground/80">• Items brought into a shared household that were clearly yours beforehand remain yours</li>
                  <li className="font-paragraph text-foreground/80">• We can help you assess ownership before filing a claim</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">How We Help You Get Your Property Back</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                { step: '1', title: 'Demand Letter', desc: 'Formal letter demanding return of property by a specific deadline. Often resolves the matter without court.' },
                { step: '2', title: 'Inventory Documentation', desc: 'Create detailed list of items with descriptions, photos, and estimated values.' },
                { step: '3', title: 'File Claim', desc: 'If no response, file Plaintiff\'s Claim for return of property and/or monetary damages.' },
                { step: '4', title: 'Court Representation', desc: 'Represent you at settlement conference and trial to get order for return of your belongings.' },
              ].map((item, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading font-bold text-lg">
                    {item.step}
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="font-paragraph text-foreground/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Get Your Belongings Back</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to discuss your return of property case and the best approach to recover your belongings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-gray-100 transition-colors">
              Book Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:5196011110" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-white/10 transition-colors">
              Call (519) 601-1110
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
