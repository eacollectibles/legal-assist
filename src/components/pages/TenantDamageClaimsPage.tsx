import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, FileText, DollarSign, AlertTriangle, Home, Key, Camera } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TenantDamageClaimsPage() {
  useEffect(() => {
    document.title = 'Tenant Damage Claims for Landlords | Small Claims Court Ontario | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Paralegal for landlords pursuing tenant damage claims in Ontario Small Claims Court. Recover costs for property damage beyond normal wear. Up to $35,000. London Ontario.');
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
              <Home className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Landlord Services</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Tenant Damage Claims for Landlords
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Former tenant left your property damaged beyond normal wear and tear? Pursue compensation in Small Claims Court for the cost of repairs and lost rent.
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

      {/* Why Small Claims Not LTB */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Why Small Claims Court, Not the LTB?</h2>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <p className="font-paragraph text-foreground/80 mb-6 text-lg">
                Once a tenant has moved out, the Landlord and Tenant Board (LTB) no longer has jurisdiction over most damage claims. You must pursue the former tenant through <strong>Small Claims Court</strong> instead.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-heading font-bold text-green-800 mb-2">✓ Small Claims Court</h3>
                  <ul className="font-paragraph text-green-800 space-y-1 text-sm">
                    <li>• Claims against former tenants</li>
                    <li>• Damage beyond normal wear</li>
                    <li>• Unpaid rent after move-out</li>
                    <li>• Up to $35,000 claims</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-heading font-bold text-red-800 mb-2">✗ LTB</h3>
                  <ul className="font-paragraph text-red-800 space-y-1 text-sm">
                    <li>• Only current tenancies</li>
                    <li>• Limited to $35,000</li>
                    <li>• Can't pursue after move-out</li>
                    <li>• Different procedures</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Damage */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Types of Tenant Damage You Can Claim</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Home, title: 'Structural Damage', desc: 'Holes in walls, broken doors, damaged flooring, broken windows, or damage to fixtures.' },
              { icon: AlertTriangle, title: 'Appliance Damage', desc: 'Broken or destroyed appliances beyond normal wear - stoves, fridges, dishwashers, washers/dryers.' },
              { icon: Key, title: 'Lock & Security Damage', desc: 'Broken locks, damaged security systems, or costs to re-key after unauthorized key copies.' },
              { icon: DollarSign, title: 'Cleaning Costs', desc: 'Excessive cleaning required beyond normal cleaning - hoarding situations, pest infestations caused by tenant.' },
              { icon: Camera, title: 'Vandalism', desc: 'Intentional damage, graffiti, or destruction of property by tenant or their guests.' },
              { icon: FileText, title: 'Unpaid Utilities', desc: 'Utility bills left unpaid that you became responsible for paying.' },
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

      {/* Normal Wear vs Damage */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Normal Wear and Tear vs Damage</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                <h3 className="font-heading text-xl font-bold text-green-800 mb-4">Normal Wear and Tear (Not Claimable)</h3>
                <ul className="space-y-2">
                  {[
                    'Minor scuffs on walls',
                    'Faded paint from sunlight',
                    'Worn carpet in high-traffic areas',
                    'Minor nail holes for pictures',
                    'Loose door handles from regular use',
                    'Worn finish on hardwood floors',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 font-paragraph text-green-800">
                      <span className="text-green-600">—</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
                <h3 className="font-heading text-xl font-bold text-red-800 mb-4">Damage Beyond Wear (Claimable)</h3>
                <ul className="space-y-2">
                  {[
                    'Large holes in walls',
                    'Burns or stains on carpet',
                    'Broken windows or doors',
                    'Cracked tiles or countertops',
                    'Pet damage (scratches, odor, stains)',
                    'Missing fixtures or appliances',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 font-paragraph text-red-800">
                      <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Evidence Checklist */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Critical Evidence for Your Claim</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: 'Move-In Documentation', items: ['Photos/video of unit at move-in', 'Signed move-in inspection report', 'Condition of appliances noted'] },
                  { title: 'Move-Out Documentation', items: ['Photos/video of all damage', 'Date-stamped evidence', 'Walk-through notes'] },
                  { title: 'Financial Records', items: ['Repair invoices and receipts', 'Contractor quotes (multiple)', 'Lost rent calculations'] },
                  { title: 'Lease & Communications', items: ['Signed lease agreement', 'Any damage complaints during tenancy', 'Move-out correspondence'] },
                ].map((section, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="font-heading font-bold text-foreground">{section.title}</h3>
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="font-paragraph text-foreground/70 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <p className="font-paragraph text-foreground/70 text-center mt-6">
              <strong>Pro tip:</strong> The most important evidence is dated photos comparing move-in condition to move-out condition.
            </p>
          </div>
        </div>
      </section>

      {/* What You Can Recover */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What Compensation Can You Recover?</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { title: 'Repair Costs', desc: 'Actual cost to repair or replace damaged items (with receipts)' },
                { title: 'Lost Rent', desc: 'Rent lost while unit was uninhabitable during repairs' },
                { title: 'Cleaning Costs', desc: 'Professional cleaning beyond normal turnover cleaning' },
                { title: 'Replacement Value', desc: 'Depreciated value of items that need full replacement' },
                { title: 'Unpaid Rent', desc: 'Any rent still owing when the tenant left' },
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

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Tenant Left Your Property Damaged?</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your case and discuss recovering your costs through Small Claims Court.
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
