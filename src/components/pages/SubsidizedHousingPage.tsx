import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, AlertTriangle, Home, FileText, DollarSign, Users, Building } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SubsidizedHousingPage() {
  useEffect(() => {
    document.title = 'Subsidized Housing & RGI Eviction Defence | LTB Paralegal Ontario | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Paralegal help for subsidized housing and RGI tenants facing eviction in Ontario. Income review disputes, arrears, and social housing rights. Free consultation London.');
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
              <Building className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Landlord and Tenant Board</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Subsidized Housing & RGI Eviction Defence
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Living in rent-geared-to-income or subsidized housing? You have unique rights and protections. We help tenants navigate income reviews, arrears disputes, and eviction defence.
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

      {/* Types of Subsidized Housing */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Types of Subsidized Housing We Help With</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Building, title: 'Public Housing', desc: 'Units owned and operated by municipal or regional housing authorities like London Middlesex Community Housing.' },
              { icon: Home, title: 'Rent-Geared-to-Income (RGI)', desc: 'Rent calculated at approximately 30% of your household income, whether in public or private buildings.' },
              { icon: DollarSign, title: 'Rent Supplements', desc: 'Government subsidies paid to private landlords to reduce your rent to affordable levels.' },
              { icon: Users, title: 'Co-op Housing', desc: 'Member-owned housing cooperatives with internal charges and unique governance rules.' },
              { icon: FileText, title: 'Portable Housing Benefits', desc: 'Canada-Ontario Housing Benefit and other portable subsidies you take with you.' },
              { icon: Shield, title: 'Supportive Housing', desc: 'Housing with support services for seniors, people with disabilities, or mental health needs.' },
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

      {/* Common Issues */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Common Issues for Subsidized Tenants</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { title: 'Income Review Disputes', desc: 'Disagreements over reported income, household composition, or rent calculation errors' },
                { title: 'Arrears from Retroactive Adjustments', desc: 'Large arrears claimed when income increases are applied retroactively' },
                { title: 'Failure to Report Income Changes', desc: 'Allegations of misrepresentation or fraud based on unreported income' },
                { title: 'Loss of Subsidy', desc: 'Notice that you no longer qualify for RGI and face market rent' },
                { title: 'Guest and Occupancy Issues', desc: 'Disputes about who lives in the unit and how it affects your rent calculation' },
                { title: 'Transfer and Accommodation Requests', desc: 'Need to move to a different unit due to family size, accessibility, or safety' },
              ].map((item, index) => (
                <div key={index} className={`p-6 flex items-start gap-4 ${index !== 5 ? 'border-b border-gray-100' : ''}`}>
                  <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
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

      {/* Your Rights */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Your Rights as a Subsidized Tenant</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              'Right to proper notice before rent changes',
              'Right to internal review of RGI decisions',
              'Right to appeal to the LTB',
              'Protection from arbitrary subsidy loss',
              'Right to reasonable accommodation',
              'Right to a habitable, maintained unit',
              'Protection from discrimination',
              'Right to organize with other tenants',
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="font-paragraph text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eviction Defence */}
      <section className="py-16 md:py-20 bg-red-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-6 text-center">Facing Eviction from Subsidized Housing?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8 text-center">
              Losing subsidized housing means losing more than just your home—it means losing your subsidy and potentially years on a waitlist to get it back. We fight aggressively to keep you housed.
            </p>
            <div className="space-y-4">
              {[
                { title: 'Arrears Repayment Plans', desc: 'Negotiate affordable repayment terms that let you stay while catching up' },
                { title: 'Challenge Rent Calculations', desc: 'Dispute incorrect income assessments or improper retroactive charges' },
                { title: 'Request Relief from Eviction', desc: 'Ask the LTB to consider your circumstances and preserve your housing' },
                { title: 'Human Rights Arguments', desc: 'Raise accommodation needs related to disability, family status, or other protected grounds' },
              ].map((item, index) => (
                <div key={index} className="bg-white p-5 rounded-lg shadow-sm">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="font-paragraph text-foreground/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">How We Help Subsidized Tenants</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { step: '1', title: 'Review Your Situation', desc: 'We examine your notices, rent calculations, and housing provider\'s compliance with rules.' },
              { step: '2', title: 'Internal Review', desc: 'Help you request and navigate the housing provider\'s internal review process.' },
              { step: '3', title: 'Negotiate Solutions', desc: 'Work with housing staff to resolve issues without LTB involvement when possible.' },
              { step: '4', title: 'LTB Representation', desc: 'If needed, represent you at the Landlord and Tenant Board to fight eviction.' },
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Protect Your Subsidized Housing</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your situation and explain your options for keeping your home.
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
            Licensed by the Law Society of Ontario | Tenant representation at the Landlord and Tenant Board
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
