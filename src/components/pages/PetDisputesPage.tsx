import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, CheckCircle, AlertTriangle, Home, FileText, Heart, PawPrint } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PetDisputesPage() {
  // SEO handled by AutoSEO component

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <PawPrint className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Landlord and Tenant Board</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Pet Disputes & Your Rights as a Tenant
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Did you know no-pet clauses are void in Ontario? Landlords cannot evict you simply for having a pet. We help tenants understand and enforce their rights to keep their furry family members.
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

      {/* The Law */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 mb-8">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-green-800 mb-4">The Law is Clear: No-Pet Clauses are Void</h2>
              <p className="font-paragraph text-lg text-green-700 mb-4">
                Section 14 of the Residential Tenancies Act states that any provision in a lease that prohibits pets is <strong>void and unenforceable</strong>.
              </p>
              <p className="font-paragraph text-green-700">
                This means even if you signed a lease with a no-pet clause, that clause has no legal effect. You cannot be evicted simply for having a pet.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">What This Means For You</h3>
                <ul className="space-y-3">
                  {[
                    'You can get a pet even if lease says "no pets"',
                    'Landlord cannot refuse to renew because of pet',
                    'Pet deposits are illegal in Ontario',
                    'You don\'t need landlord permission for a pet',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/80">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">Exceptions</h3>
                <ul className="space-y-3">
                  {[
                    'Condos may have building-wide pet restrictions',
                    'Pet causing damage can lead to eviction for damage',
                    'Pet causing noise/disturbance can lead to N5 notice',
                    'Allergies of other tenants in shared housing',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/80">
                      <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* When Landlords Can Act */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">When Can a Landlord Take Action?</h2>
          <div className="max-w-4xl mx-auto">
            <p className="font-paragraph text-lg text-foreground/80 mb-8 text-center">
              While landlords can't evict for simply having a pet, they can take action if the pet causes specific problems:
            </p>
            <div className="space-y-6">
              {[
                { 
                  title: 'Property Damage', 
                  desc: 'If your pet causes significant damage beyond normal wear and tear, the landlord can serve an N5 notice for damage to the unit.',
                  defense: 'Pay for repairs, document that damage is fixed, or dispute the extent of damage claimed.'
                },
                { 
                  title: 'Noise and Disturbance', 
                  desc: 'Excessive barking, howling, or other noise that substantially interferes with other tenants\' reasonable enjoyment.',
                  defense: 'Show steps taken to address the issue: training, bark collars, schedule changes.'
                },
                { 
                  title: 'Allergies in Shared Housing', 
                  desc: 'In rare cases where a tenant shares a kitchen/bathroom with the landlord or their family, severe allergies may be relevant.',
                  defense: 'Get medical evidence, propose accommodations, challenge the severity claimed.'
                },
                { 
                  title: 'Dangerous Animals', 
                  desc: 'If a pet has attacked someone or poses a genuine safety risk, eviction may be possible.',
                  defense: 'Challenge the characterization, show precautions taken, provide behavioural assessments.'
                },
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="font-paragraph text-foreground/70 mb-3">{item.desc}</p>
                  <p className="font-paragraph text-sm text-primary"><strong>Possible defence:</strong> {item.defense}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Common Landlord Tactics */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Common Landlord Tactics (And Why They're Wrong)</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { tactic: '"You signed a no-pet lease"', response: 'No-pet clauses are void under s.14 of the RTA. The signature doesn\'t make it enforceable.' },
                { tactic: '"Pay a pet deposit or extra rent"', response: 'Pet deposits and pet rent are illegal in Ontario. Only last month\'s rent deposit is permitted.' },
                { tactic: '"Get rid of the pet or I\'ll evict you"', response: 'A landlord cannot evict for having a pet. They would need to prove damage or disturbance.' },
                { tactic: '"The condo doesn\'t allow pets"', response: 'Condo rules apply to owners, not necessarily tenants. The landlord took on this risk by renting.' },
                { tactic: '"I\'ll just not renew your lease"', response: 'In Ontario, leases automatically go month-to-month. Landlords cannot refuse to "renew" to get rid of a tenant.' },
              ].map((item, index) => (
                <div key={index} className={`p-6 ${index !== 4 ? 'border-b border-gray-100' : ''}`}>
                  <p className="font-paragraph text-red-700 font-medium mb-2">"{item.tactic}"</p>
                  <p className="font-paragraph text-foreground/70"><strong>Reality:</strong> {item.response}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Condo Considerations */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <Home className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">Special Rules for Condos</h2>
            <p className="font-paragraph text-foreground/80 mb-6 text-center">
              Condominium corporations can have pet restrictions in their declaration or rules. However, as a tenant, the situation is nuanced:
            </p>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <ul className="space-y-4">
                {[
                  'The condo\'s pet rules bind the unit owner (your landlord), not you directly',
                  'Your landlord may face fines from the condo corp, but that\'s their problem',
                  'The LTB generally won\'t enforce condo rules against tenants for pets',
                  'Some condos have grandfather clauses for existing pets',
                  'Condo rules must be reasonable and consistently enforced',
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

      {/* How We Help */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">How We Help Pet Owners</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { step: '1', title: 'Review Your Situation', desc: 'Understand exactly what the landlord is claiming and whether they have any valid grounds.' },
              { step: '2', title: 'Respond to Notices', desc: 'If you\'ve received an N5 or other notice, we help you respond appropriately and protect your rights.' },
              { step: '3', title: 'Negotiate Solutions', desc: 'Sometimes a conversation resolves concerns. We can negotiate on your behalf.' },
              { step: '4', title: 'LTB Representation', desc: 'If it goes to a hearing, we represent you and present evidence defending your right to keep your pet.' },
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
          <Heart className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Protect Your Right to Keep Your Pet</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your situation and help you keep your furry family member.
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
