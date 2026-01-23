import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Home, Clock, CheckCircle, AlertTriangle, FileText, DollarSign, Key, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LandlordRightsGuidePage() {
  useEffect(() => {
    document.title = 'Ontario Landlord Rights Guide | Know Your Rights | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Complete guide to landlord rights in Ontario. Learn about eviction procedures, rent collection, property access, and legal remedies. Free information for landlords.');
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
              <FileText className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Free Guide</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Ontario Landlord Rights Guide
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Understanding your rights as a landlord helps you manage properties effectively and legally. This guide covers the eviction process, rent collection, and your legal remedies.
            </p>
          </div>
        </div>
      </section>

      {/* Key Rights */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Your Rights as a Landlord</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { icon: DollarSign, title: 'Collect Rent', desc: 'You have the right to collect rent on time as specified in the lease. You can charge last month\'s rent deposit.' },
              { icon: Key, title: 'Property Access', desc: 'You can enter the unit with 24 hours written notice for repairs, inspections, or showing to prospective tenants.' },
              { icon: Home, title: 'Maintain Standards', desc: 'You can require tenants to maintain reasonable cleanliness and not damage the property.' },
              { icon: Users, title: 'Select Tenants', desc: 'You can screen tenants using credit checks, references, and income verification (within human rights guidelines).' },
              { icon: Shield, title: 'Evict for Cause', desc: 'You can apply to evict tenants who don\'t pay rent, damage property, or violate the lease.' },
              { icon: Clock, title: 'End Tenancy', desc: 'You can end a tenancy for your own use, major renovations, or sale to a buyer who wants possession.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eviction Process */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">The Eviction Process</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { step: 1, title: 'Serve the Proper Notice', desc: 'Use the correct form (N4 for non-payment, N5 for interference, N12 for own use, etc.). Serve it properly.' },
              { step: 2, title: 'Wait for Notice Period', desc: 'Each notice has a specific termination date. For N4, tenant has 14 days to pay or vacate.' },
              { step: 3, title: 'Apply to the LTB', desc: 'If tenant doesn\'t comply, file an application (L1 for non-payment, L2 for other reasons).' },
              { step: 4, title: 'Attend the Hearing', desc: 'Present your case at the LTB hearing. Bring all evidence and documentation.' },
              { step: 5, title: 'Get an Order', desc: 'If successful, the LTB issues an eviction order with a termination date.' },
              { step: 6, title: 'Enforce with Sheriff', desc: 'If tenant doesn\'t leave, file the order with the Court Enforcement Office for sheriff enforcement.' },
            ].map((item) => (
              <div key={item.step} className="bg-white p-5 rounded-xl shadow-sm flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Notices */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Common Eviction Notices</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { form: 'N4', title: 'Non-Payment of Rent', timeline: '14 days to pay or vacate', notes: 'Tenant can void by paying in full within 14 days' },
              { form: 'N5', title: 'Interference / Damage', timeline: '20 days (first notice)', notes: 'Tenant can void by correcting behaviour within 7 days' },
              { form: 'N12', title: 'Landlord\'s Own Use', timeline: '60 days (end of term)', notes: 'Must pay 1 month compensation' },
              { form: 'N13', title: 'Demolition/Renovation', timeline: '120 days', notes: 'Must pay 3 months compensation' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-primary">
                <div className="text-2xl font-bold text-primary mb-2">{item.form}</div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70 text-sm mb-2"><strong>Timeline:</strong> {item.timeline}</p>
                <p className="font-paragraph text-foreground/70 text-sm"><strong>Note:</strong> {item.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Cannot Do */}
      <section className="py-16 md:py-20 bg-red-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What Landlords CANNOT Do</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <ul className="space-y-3">
                {[
                  'Change locks or lock out tenants (illegal lockout = $35,000+ penalties)',
                  'Shut off utilities to force tenant out',
                  'Remove tenant\'s belongings',
                  'Enter without proper 24-hour notice (except emergencies)',
                  'Harass or intimidate tenants to make them leave',
                  'Raise rent above the guideline without LTB approval',
                  'Charge damage deposits (only last month\'s rent allowed)',
                  'Evict without going through the LTB process',
                  'Discriminate based on protected grounds (race, family status, etc.)',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 font-paragraph text-foreground/80">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Need Help With a Tenant Issue?</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation for landlords dealing with problem tenants or LTB matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-gray-100 transition-colors">
              Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/services/landlord-services" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-white/10 transition-colors">
              Landlord Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
