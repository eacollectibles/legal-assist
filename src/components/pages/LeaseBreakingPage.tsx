import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, AlertTriangle, Home, FileText, DollarSign, Calendar, Key } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LeaseBreakingPage() {
  // SEO handled by AutoSEO component

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <FileText className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Landlord and Tenant Board</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Breaking a Lease Early in Ontario
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Life changes—job relocation, relationship breakdown, health issues. If you need to leave your rental before the lease ends, you have options. We help you exit legally and minimize financial exposure.
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

      {/* Your Options */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Your Options for Early Lease Termination</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { 
                icon: Key, 
                title: 'Assignment', 
                desc: 'Transfer your lease to a new tenant who takes over your obligations. The landlord cannot unreasonably refuse.',
                best: 'Best when: You want a clean break with no ongoing liability'
              },
              { 
                icon: FileText, 
                title: 'N9 Notice (60 Days)', 
                desc: 'Give 60 days notice at the end of a lease term or during month-to-month. This is your legal right.',
                best: 'Best when: You\'re month-to-month or near lease end'
              },
              { 
                icon: Scale, 
                title: 'N11 Mutual Agreement', 
                desc: 'Negotiate an early termination date with your landlord. They must agree, but many will to avoid vacancies.',
                best: 'Best when: Landlord is cooperative and can re-rent quickly'
              },
              { 
                icon: Home, 
                title: 'Subletting', 
                desc: 'Rent to someone else temporarily while remaining on the lease. You stay liable but don\'t pay rent directly.',
                best: 'Best when: You plan to return or want to keep the unit'
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <item.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="font-paragraph text-foreground/70 mb-4">{item.desc}</p>
                <p className="font-paragraph text-sm text-primary font-medium">{item.best}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assignment Deep Dive */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Assignment: Your Right Under the RTA</h2>
            <div className="bg-white rounded-xl shadow-sm p-8">
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                Under Ontario's Residential Tenancies Act, you have the right to request an assignment. The landlord can only refuse for reasonable grounds.
              </p>
              <div className="space-y-4 mb-6">
                <h3 className="font-heading text-lg font-bold text-foreground">The Process:</h3>
                <ol className="space-y-3">
                  {[
                    'Submit written request to assign your lease',
                    'Landlord has 7 days to respond',
                    'If they consent, find a new tenant',
                    'Landlord can only refuse the specific person for reasonable grounds',
                    'If landlord refuses all assignment, you can give 30 days notice to terminate',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 font-paragraph text-foreground/80">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">{index + 1}</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="font-paragraph text-green-800">
                  <strong>Key benefit:</strong> If the landlord refuses to allow any assignment at all, you can terminate with just 30 days notice—even mid-lease!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Landlord's Duty to Mitigate */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-6 text-center">Landlord's Duty to Mitigate</h2>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <p className="font-paragraph text-foreground/80 mb-4">
                Even if you leave mid-lease without agreement, landlords have a legal duty to <strong>mitigate their losses</strong>. This means they must make reasonable efforts to find a new tenant.
              </p>
              <ul className="space-y-3 mb-4">
                {[
                  'Landlord cannot leave unit empty and sue you for full remaining lease',
                  'They must advertise and show the unit to prospective tenants',
                  'Your liability is limited to the time it takes to re-rent',
                  'If they find a new tenant quickly, you may owe little or nothing',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/80">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
              <p className="font-paragraph text-foreground/70 text-sm">
                We can help ensure the landlord is meeting their duty to mitigate and limit your financial exposure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Circumstances */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Special Circumstances for Lease Termination</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { title: 'Domestic Violence', desc: 'Victims can terminate with 28 days notice using Form N15, with supporting documentation.' },
              { title: 'Care Facility Admission', desc: 'Tenants entering long-term care can give 30 days notice regardless of lease term.' },
              { title: 'Death of Tenant', desc: 'Estate can terminate 30 days after giving notice, regardless of lease obligations.' },
              { title: 'Military Deployment', desc: 'Canadian Forces members may have early termination options for deployment.' },
              { title: 'Unsafe Living Conditions', desc: 'Major maintenance failures may justify termination if landlord won\'t repair.' },
              { title: 'Landlord Harassment', desc: 'Persistent interference with reasonable enjoyment can support early termination.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What NOT to Do */}
      <section className="py-16 md:py-20 bg-red-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">What NOT to Do</h2>
            <div className="space-y-4">
              {[
                { wrong: 'Just stop paying rent and leave', right: 'Give proper notice and document everything' },
                { wrong: 'Abandon the unit without notice', right: 'Communicate with landlord about your situation' },
                { wrong: 'Assume a "penalty" clause is enforceable', right: 'Many lease penalties violate the RTA and are void' },
                { wrong: 'Sign anything without understanding it', right: 'Have us review any termination agreement first' },
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg flex gap-4">
                  <div className="flex-1">
                    <p className="font-paragraph text-red-700"><strong>Don't:</strong> {item.wrong}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-paragraph text-green-700"><strong>Do:</strong> {item.right}</p>
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Need to Break Your Lease?</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your situation and find the best exit strategy.
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
