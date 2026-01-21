import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, AlertTriangle, Home, Users, FileText, DollarSign, Key } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RoommateDisputesPage() {
  useEffect(() => {
    document.title = 'Roommate Disputes Ontario | Tenant vs Occupant Rights | LTB Paralegal | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Paralegal help for roommate disputes in Ontario. Understand tenant vs occupant rights, evicting a roommate, and LTB jurisdiction. Free consultation London.');
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
              <Users className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Landlord and Tenant Board</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Roommate Disputes & Occupant Rights
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Roommate not paying rent? Need to remove someone from your unit? The rules depend on whether they're a tenant or occupant. We help you understand your rights and options.
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

      {/* Tenant vs Occupant */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Tenant vs. Occupant: Why It Matters</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-green-200">
              <h3 className="font-heading text-xl font-bold text-green-700 mb-4">Tenant</h3>
              <ul className="space-y-3">
                {[
                  'Named on the lease with the landlord',
                  'Pays rent directly to landlord',
                  'Has full RTA protection',
                  'Can only be evicted through LTB',
                  'Entitled to proper notices',
                  'Can dispute at LTB hearings',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/80">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-amber-200">
              <h3 className="font-heading text-xl font-bold text-amber-700 mb-4">Occupant (Roommate)</h3>
              <ul className="space-y-3">
                {[
                  'Not on the lease',
                  'Pays rent to the tenant',
                  'Limited RTA protection',
                  'LTB has no jurisdiction',
                  'Removal through Small Claims or trespass',
                  'Fewer procedural protections',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/80">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="font-paragraph text-foreground/70 text-center mt-8 max-w-2xl mx-auto">
            The key question is: <strong>who is the landlord?</strong> If you rent from another tenant (not the property owner), you're likely an occupant with different rights.
          </p>
        </div>
      </section>

      {/* Common Scenarios */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Common Roommate Situations</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              { title: 'Roommate Stopped Paying Their Share', desc: 'If you\'re both on the lease, you\'re jointly liable. The landlord can pursue either of you for the full rent. Your dispute with your roommate is separate.', icon: DollarSign },
              { title: 'Need to Remove a Roommate Not on Lease', desc: 'The LTB has no jurisdiction. You\'ll need to give reasonable notice, and if they refuse to leave, pursue removal through Small Claims Court or as a trespasser.', icon: Key },
              { title: 'Roommate Left Without Notice', desc: 'You may be stuck with the full rent until you find a replacement or the lease ends. Document everything for potential Small Claims action.', icon: Home },
              { title: 'Both Names on Lease, One Wants Out', desc: 'Both tenants remain liable until the lease ends or the landlord agrees to remove one name. We can help negotiate an assignment or lease amendment.', icon: FileText },
              { title: 'Subletting to Someone Who Won\'t Leave', desc: 'Subtenants have limited RTA protection. After the sublet period ends, they become an unauthorized occupant you may need to remove.', icon: Users },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm flex gap-4">
                <item.icon className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="font-paragraph text-foreground/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Options */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Your Options for Roommate Disputes</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { title: 'Negotiated Agreement', desc: 'Often the fastest solution. We help draft departure agreements with clear terms and timelines.' },
                { title: 'Small Claims Court', desc: 'Sue for unpaid rent, damages, or to recover money owed. Monetary claims up to $35,000.' },
                { title: 'Trespass Notice', desc: 'For occupants who refuse to leave after reasonable notice, this may be a necessary step.' },
                { title: 'Lease Assignment/Amendment', desc: 'Work with the landlord to formally change who is on the lease.' },
                { title: 'LTB Application (if applicable)', desc: 'In limited cases where the occupant qualifies as a tenant, the LTB may have jurisdiction.' },
              ].map((item, index) => (
                <div key={index} className={`p-6 flex items-start gap-4 ${index !== 4 ? 'border-b border-gray-100' : ''}`}>
                  <Scale className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
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

      {/* Warning */}
      <section className="py-16 md:py-20 bg-red-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">Never Change Locks or Remove Belongings</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-4">
              Even if someone owes you money or has overstayed, you <strong>cannot</strong> change the locks, remove their belongings, or physically force them out. This is illegal and can result in criminal charges or civil liability.
            </p>
            <p className="font-paragraph text-foreground/70">
              Always follow proper legal procedures—we can guide you through the right process.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">How We Help with Roommate Disputes</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { step: '1', title: 'Analyze Your Situation', desc: 'Determine if you\'re dealing with a tenant or occupant, and which legal avenue applies.' },
              { step: '2', title: 'Draft Proper Notices', desc: 'Prepare legally appropriate notice to vacate or demand for payment.' },
              { step: '3', title: 'Attempt Negotiation', desc: 'Try to reach a voluntary agreement before escalating to court.' },
              { step: '4', title: 'Court Action if Needed', desc: 'Represent you at Small Claims Court or guide you through other enforcement options.' },
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

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Roommate Problems? Get Expert Help</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to understand your rights and the best way to resolve your roommate dispute.
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
            Licensed by the Law Society of Ontario | Paralegal services for housing disputes
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
