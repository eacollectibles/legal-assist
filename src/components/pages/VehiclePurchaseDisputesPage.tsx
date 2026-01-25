import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, Car, FileText, DollarSign, AlertTriangle, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function VehiclePurchaseDisputesPage() {
  // SEO handled by AutoSEO component

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Car className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Small Claims Court Services</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Used Car & Vehicle Purchase Disputes
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Bought a lemon? Dealer didn't disclose accidents or mechanical issues? You have legal options to recover your losses in Small Claims Court.
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

      {/* Common Disputes */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Vehicle Purchase Issues We Handle</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: AlertTriangle, title: 'Undisclosed Accidents', desc: 'Vehicle had prior collision damage that wasn\'t disclosed at time of sale. This is a violation of OMVIC rules and consumer protection laws.' },
              { icon: Search, title: 'Odometer Fraud', desc: 'Odometer was rolled back to show fewer kilometers. This is a criminal offense and you can sue for damages.' },
              { icon: Car, title: 'Mechanical Defects', desc: 'Major mechanical problems that existed at time of sale but weren\'t disclosed. Engine, transmission, frame issues.' },
              { icon: FileText, title: 'Misrepresentation', desc: 'Seller lied about vehicle history, ownership, certification status, or other material facts.' },
              { icon: DollarSign, title: 'Financing Issues', desc: 'Hidden fees, unauthorized charges, or financing terms different from what was agreed upon.' },
              { icon: Shield, title: 'Safety Certification Fraud', desc: 'Vehicle was sold as safety certified but doesn\'t actually meet Ontario safety standards.' },
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

      {/* Ontario Laws */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Ontario Laws That Protect Car Buyers</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Motor Vehicle Dealers Act (MVDA)</h3>
                <p className="font-paragraph text-foreground/70">Registered dealers must disclose all material facts including accidents, brands (rebuilt, salvage), and any known defects. Violation can result in rescission of the sale.</p>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Consumer Protection Act (CPA)</h3>
                <p className="font-paragraph text-foreground/70">Provides additional protections against unfair practices, false advertising, and unconscionable representations. You may be entitled to rescind the contract.</p>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Sale of Goods Act</h3>
                <p className="font-paragraph text-foreground/70">Implies certain warranties including that goods are of merchantable quality and fit for their intended purpose.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dealers vs Private Sales */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Dealer vs Private Sale: Know Your Rights</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-primary">
              <h3 className="font-heading text-xl font-bold text-primary mb-4">Purchased from Dealer</h3>
              <ul className="space-y-3">
                {[
                  'OMVIC regulations apply',
                  'Must disclose accident history',
                  'Must disclose branded titles',
                  'Cooling-off period may apply',
                  'Can file OMVIC complaint',
                  'Consumer Protection Act applies',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/80">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">Private Sale</h3>
              <ul className="space-y-3">
                {[
                  'Fewer consumer protections',
                  'Still can\'t misrepresent vehicle',
                  'Fraud claims still available',
                  'Should get everything in writing',
                  'Vehicle history check essential',
                  'Can still sue for misrepresentation',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/80">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Recover */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What Compensation Can You Claim?</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { title: 'Full Purchase Price', desc: 'Return the vehicle and get your money back (rescission)' },
                { title: 'Difference in Value', desc: 'Keep the car but recover the difference between what you paid and actual value' },
                { title: 'Repair Costs', desc: 'Cost to fix undisclosed mechanical issues or safety problems' },
                { title: 'Out-of-Pocket Expenses', desc: 'Towing, rental car, inspections, and other costs caused by the defects' },
                { title: 'OMVIC Compensation Fund', desc: 'For dealer purchases, up to $45,000 from the Motor Vehicle Dealers Compensation Fund' },
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

      {/* Evidence Needed */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Evidence to Support Your Claim</h2>
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-4">
            {[
              'Bill of sale / purchase agreement',
              'Advertisements (saved screenshots)',
              'Text messages with seller',
              'Emails and written communications',
              'Carfax or AutoCheck report',
              'Mechanic inspection report',
              'Repair estimates or invoices',
              'Photos of defects/damage',
              'Ontario Used Vehicle Information Package',
              'Expert opinions',
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Sold a Lemon? We Can Help</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your vehicle purchase dispute and explain your legal options.
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
            Licensed by the Law Society of Ontario | Paralegal services for claims up to $35,000
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
