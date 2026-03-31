import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, CheckCircle, AlertTriangle, Home, FileText, DollarSign, Trees, Car } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MobileHomeParkPage() {
  // SEO handled by AutoSEO component

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Home className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Landlord and Tenant Board</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Mobile Home Park & Land Lease Disputes
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Own your mobile home but rent the land? You have unique rights under Ontario law. We help manufactured home community residents with park disputes, unfair rules, and eviction defence.
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

      {/* Understanding Your Situation */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Understanding Land Lease Communities</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                In a mobile home park or land lease community, you typically <strong>own your home</strong> but <strong>rent the land</strong> it sits on. This creates a unique legal situation:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-heading text-lg font-bold text-green-800 mb-2">What You Own</h3>
                  <ul className="space-y-2">
                    {[
                      'Your mobile/manufactured home',
                      'Additions and improvements',
                      'Personal property inside',
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 font-paragraph text-green-800 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h3 className="font-heading text-lg font-bold text-amber-800 mb-2">What You Rent</h3>
                  <ul className="space-y-2">
                    {[
                      'The land/lot your home sits on',
                      'Access to park amenities',
                      'Use of common areas',
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 font-paragraph text-amber-800 text-sm">
                        <Home className="w-4 h-4 text-amber-600" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <p className="font-paragraph text-foreground/70 text-center">
              Because you rent the land, you're covered by the Residential Tenancies Act and have rights enforceable at the LTB—but there are special rules for land lease communities.
            </p>
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Common Mobile Home Park Disputes</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { icon: DollarSign, title: 'Excessive Rent Increases', desc: 'Rent increases above the guideline require LTB approval. Many parks try to impose illegal increases.' },
              { icon: FileText, title: 'Unreasonable Park Rules', desc: 'Rules must be reasonable and applied consistently. Some parks impose arbitrary restrictions.' },
              { icon: AlertTriangle, title: 'Eviction Attempts', desc: 'Parks cannot evict you without proper grounds and LTB approval, even to redevelop.' },
              { icon: Trees, title: 'Maintenance Issues', desc: 'Park must maintain common areas, roads, and services you pay for in your lot rent.' },
              { icon: Car, title: 'Vehicle & Storage Rules', desc: 'Restrictions on what you can park or store on your lot must be reasonable.' },
              { icon: Home, title: 'Sale Restrictions', desc: 'Parks cannot unreasonably interfere with your right to sell your home.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm flex gap-4">
                <item.icon className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Your Rights as a Land Lease Resident</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { title: 'Protection from Illegal Eviction', desc: 'You cannot be evicted without proper notice, valid grounds, and an LTB order. Owning your home provides extra protection.' },
                { title: 'Right to Sell Your Home', desc: 'You can sell your home to any buyer who meets reasonable credit and background requirements. The park cannot unreasonably refuse.' },
                { title: 'Regulated Rent Increases', desc: 'Annual increases are limited to the provincial guideline unless the LTB approves above-guideline increase.' },
                { title: 'Challenge Unreasonable Rules', desc: 'Park rules must be reasonable. You can challenge unfair rules at the LTB.' },
                { title: 'Proper Notice Requirements', desc: 'Parks must follow specific notice requirements for any changes to your tenancy.' },
                { title: 'Access to LTB', desc: 'You can file applications at the LTB for maintenance issues, harassment, or illegal rent increases.' },
              ].map((item, index) => (
                <div key={index} className={`p-6 flex items-start gap-4 ${index !== 5 ? 'border-b border-gray-100' : ''}`}>
                  <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
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

      {/* Selling Your Home */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">Selling Your Mobile Home</h2>
            <p className="font-paragraph text-foreground/80 mb-6 text-center">
              The park cannot prevent you from selling your home, but there are rules to follow:
            </p>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <ul className="space-y-4">
                {[
                  'Park can require prospective buyers to apply for tenancy',
                  'Park can only refuse buyers for reasonable grounds (credit, references)',
                  'Park cannot charge unreasonable assignment fees',
                  'If park unreasonably refuses buyer, you can apply to LTB',
                  'Park cannot require you to sell to them or use their agent',
                  'You set the sale price—park cannot dictate it',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/80">
                    <Scale className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Redevelopment */}
      <section className="py-16 md:py-20 bg-red-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">Park Redevelopment & Closure</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-6 text-center">
              If a park owner wants to close or redevelop the park, there are strict requirements:
            </p>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <ul className="space-y-3">
                {[
                  'Must provide at least 12 months notice',
                  'Must pay compensation (1 year\'s rent or the actual moving costs)',
                  'In some cases, additional compensation for home value',
                  'You can challenge the eviction at the LTB',
                  'Park cannot use redevelopment as pretext to remove specific residents',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/80">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">How We Help Park Residents</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { step: '1', title: 'Review Your Situation', desc: 'Understand your lease, park rules, and the specific dispute you\'re facing.' },
              { step: '2', title: 'Explain Your Rights', desc: 'Many park residents don\'t know the full extent of their legal protections.' },
              { step: '3', title: 'Negotiate with Management', desc: 'Often disputes can be resolved through negotiation without tribunal.' },
              { step: '4', title: 'LTB Representation', desc: 'If needed, we represent you at hearings for eviction defence or tenant applications.' },
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Protect Your Home & Your Rights</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to discuss your mobile home park dispute and understand your options.
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
