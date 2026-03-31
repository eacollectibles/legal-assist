import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, AlertTriangle, Home, Wrench, DollarSign, FileText, Thermometer } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RentReductionPage() {
  // SEO handled by AutoSEO component

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <DollarSign className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Landlord and Tenant Board</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Rent Reduction & Abatement Applications
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Landlord not maintaining your unit? Lost services you're paying for? You may be entitled to a rent reduction or refund. We help tenants file T2 and T6 applications to recover money.
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

      {/* Types of Applications */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Types of Tenant Applications</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm border-2 border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground">T2 Application</h3>
              </div>
              <p className="font-paragraph text-foreground/70 mb-4">
                For tenants' rights issues: harassment, illegal entry, interference with reasonable enjoyment, withheld services, or altered locks.
              </p>
              <ul className="space-y-2">
                {[
                  'Landlord harassment or threats',
                  'Illegal entry to your unit',
                  'Interference with reasonable enjoyment',
                  'Withholding vital services',
                  'Changed locks without consent',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border-2 border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground">T6 Application</h3>
              </div>
              <p className="font-paragraph text-foreground/70 mb-4">
                For maintenance issues: landlord's failure to maintain the unit in a good state of repair as required by law.
              </p>
              <ul className="space-y-2">
                {[
                  'Broken appliances not repaired',
                  'Heating/cooling failures',
                  'Pest infestations',
                  'Water leaks or mold',
                  'Structural issues',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Get */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What Can You Get?</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { title: 'Rent Abatement', desc: 'A refund of rent for the period you were affected. Amount based on severity and duration of the issue.' },
                { title: 'Ongoing Rent Reduction', desc: 'Lower rent going forward until the issue is fixed.' },
                { title: 'Repair Orders', desc: 'The Board can order the landlord to complete specific repairs by a deadline.' },
                { title: 'Out-of-Pocket Expenses', desc: 'Reimbursement for costs you incurred: buying space heaters, staying elsewhere, pest treatment, etc.' },
                { title: 'Administrative Fine', desc: 'In serious cases, the Board can fine the landlord (up to $50,000 for corporations).' },
                { title: 'General Damages', desc: 'Compensation for interference with your reasonable enjoyment of the unit.' },
              ].map((item, index) => (
                <div key={index} className={`p-6 flex items-start gap-4 ${index !== 5 ? 'border-b border-gray-100' : ''}`}>
                  <DollarSign className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="font-paragraph text-foreground/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Common Issues That Qualify</h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Thermometer, title: 'No Heat in Winter', desc: 'Landlords must maintain minimum 20°C September to June. Failures warrant significant abatement.' },
              { icon: Home, title: 'Water Leaks & Mold', desc: 'Persistent leaks, water damage, and resulting mold are serious health hazards requiring prompt action.' },
              { icon: Wrench, title: 'Broken Appliances', desc: 'If appliances were included, landlord must keep them working. Fridge, stove, dishwasher failures count.' },
              { icon: AlertTriangle, title: 'Pest Infestations', desc: 'Cockroaches, bed bugs, mice. Landlord responsible for treatment in most cases.' },
              { icon: DollarSign, title: 'Lost Amenities', desc: 'Gym, pool, laundry, parking you pay for becomes unavailable? You\'re entitled to reduction.' },
              { icon: Scale, title: 'Illegal Charges', desc: 'Charged fees the landlord can\'t legally collect? Recover them plus potentially more.' },
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

      {/* Building Your Case */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">Building Your Case</h2>
          <div className="max-w-3xl mx-auto">
            <p className="font-paragraph text-foreground/80 mb-6 text-center">
              Strong evidence is key to a successful T2 or T6 application. Here's what helps:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Written repair requests (dated)',
                'Landlord\'s responses (or lack thereof)',
                'Photos and videos of issues (dated)',
                'Municipal inspection reports',
                'Receipts for out-of-pocket costs',
                'Medical notes (if health affected)',
                'Temperature logs (for heating issues)',
                'Witness statements from visitors',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="font-paragraph text-foreground">{item}</span>
                </div>
              ))}
            </div>
            <p className="font-paragraph text-foreground/70 text-center mt-6">
              <strong>Pro tip:</strong> Always put repair requests in writing (email or text) so you have proof of when you notified the landlord.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">The Application Process</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { step: '1', title: 'Document the Issue', desc: 'Gather all evidence of the problem and your repair requests.' },
              { step: '2', title: 'Calculate Your Claim', desc: 'Determine the abatement amount and any out-of-pocket expenses.' },
              { step: '3', title: 'File Application', desc: 'Submit T2 or T6 to the LTB with filing fee (currently $53).' },
              { step: '4', title: 'Serve the Landlord', desc: 'Provide copy to landlord as required by LTB rules.' },
              { step: '5', title: 'Attend Hearing', desc: 'Present your case, evidence, and requested remedies.' },
              { step: '6', title: 'Receive Order', desc: 'Board issues written order with any rent abatement or repairs required.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="font-paragraph text-foreground/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Limitation Period */}
      <section className="py-16 md:py-20 bg-red-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Clock className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">Important: One-Year Limitation</h2>
            <p className="font-paragraph text-lg text-foreground/80">
              You can only claim rent abatement for issues occurring in the <strong>12 months before you file</strong>. Don't wait—the longer you delay, the more potential compensation you lose.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Get the Rent Reduction You Deserve</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your maintenance issues and calculate potential compensation.
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
            Licensed by the Law Society of Ontario | Tenant representation at the Landlord and Tenant Board
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
