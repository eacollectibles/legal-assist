import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, AlertTriangle, Home, Users, Key, Briefcase, DollarSign } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SuperintendentIssuesPage() {
  useEffect(() => {
    document.title = 'Superintendent & Building Staff Rights Ontario | LTB Paralegal | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Paralegal help for superintendents and building staff in Ontario. Job loss, tied housing, and eviction timelines. Know your rights when employment ends. Free consultation London.');
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
              <Briefcase className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Landlord and Tenant Board</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Superintendent & Building Staff Housing Rights
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Lost your superintendent job and facing eviction? Your housing is tied to employment, but you still have rights. We help building staff understand timelines and negotiate fair exits.
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

      {/* Understanding Your Situation */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Understanding Tied Housing</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                As a superintendent or building staff member, your housing is typically provided as part of your employment. This creates a unique situation:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h3 className="font-heading text-lg font-bold text-amber-800 mb-2">During Employment</h3>
                  <ul className="space-y-2">
                    {[
                      'You\'re not a typical tenant',
                      'RTA may not fully apply',
                      'Housing tied to job performance',
                      'Often rent-free or reduced rent',
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 font-paragraph text-amber-800 text-sm">
                        <Briefcase className="w-4 h-4 text-amber-600" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-heading text-lg font-bold text-red-800 mb-2">When Employment Ends</h3>
                  <ul className="space-y-2">
                    {[
                      'Employer can seek eviction',
                      'Specific timelines apply',
                      'You may negotiate exit terms',
                      'ESA rights still apply',
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 font-paragraph text-red-800 text-sm">
                        <AlertTriangle className="w-4 h-4 text-red-600" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Your Rights When Employment Ends</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { title: 'Proper Notice Required', desc: 'Employer must give written notice. Simply telling you to leave isn\'t enough for eviction.' },
                { title: 'Time to Vacate', desc: 'You\'re entitled to time to find alternative housing. The exact timeline depends on circumstances.' },
                { title: 'Cannot Be Locked Out', desc: 'Even after employment ends, employer cannot change locks or remove your belongings without proper process.' },
                { title: 'Employment Standards Apply', desc: 'You may be owed termination pay, vacation pay, and other ESA entitlements separate from housing.' },
                { title: 'Negotiate Exit Terms', desc: 'Often there\'s room to negotiate moving time, references, and financial terms.' },
                { title: 'LTB Process for Disputes', desc: 'If you dispute the eviction, it must go through the Landlord and Tenant Board.' },
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

      {/* Common Scenarios */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Common Scenarios We Handle</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { icon: Briefcase, title: 'Terminated Without Cause', desc: 'You may be owed notice/severance under ESA, plus reasonable time to relocate from tied housing.' },
              { icon: AlertTriangle, title: 'Alleged Cause Termination', desc: 'Employer claims misconduct. We help challenge unfair allegations and protect both job and housing.' },
              { icon: Clock, title: 'Constructive Dismissal', desc: 'Hours cut, duties changed, or conditions made intolerable? This may be constructive dismissal.' },
              { icon: Home, title: 'Building Sold/New Management', desc: 'New owners may try to replace you. Your employment and housing rights continue.' },
              { icon: DollarSign, title: 'Wage & Rent Disputes', desc: 'Disputes over pay, rent deductions, or the value of housing as part of compensation.' },
              { icon: Key, title: 'Locked Out or Belongings Removed', desc: 'This is illegal. You have rights even after employment ends.' },
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

      {/* Timeline */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <Clock className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">Typical Timeline</h2>
            <p className="font-paragraph text-foreground/80 mb-6 text-center">
              While every situation is different, here's a general idea of how things unfold:
            </p>
            <div className="space-y-4">
              {[
                { time: 'Day 1', event: 'Employment terminates - you receive notice' },
                { time: 'Days 1-7', event: 'Review notice, understand your rights, contact paralegal' },
                { time: 'Days 7-14', event: 'Negotiate exit terms, moving timeline, references' },
                { time: 'Weeks 2-4', event: 'If no agreement, employer may file at LTB' },
                { time: 'Weeks 4-8', event: 'LTB hearing if dispute continues' },
                { time: 'After Order', event: 'If eviction ordered, typically 1-4 weeks to vacate' },
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg flex items-center gap-4">
                  <div className="flex-shrink-0 w-20 text-center">
                    <span className="font-heading font-bold text-primary">{item.time}</span>
                  </div>
                  <div className="flex-1 border-l-2 border-primary/20 pl-4">
                    <span className="font-paragraph text-foreground">{item.event}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-paragraph text-foreground/70 text-center mt-6">
              <strong>Key point:</strong> Acting quickly gives you more options and negotiating power.
            </p>
          </div>
        </div>
      </section>

      {/* Employment vs Housing */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Employment Issues vs. Housing Issues</h2>
          <div className="max-w-4xl mx-auto">
            <p className="font-paragraph text-foreground/80 mb-6 text-center">
              Your situation may involve both employment law and landlord-tenant law. Here's how they differ:
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">Employment Issues</h3>
                <ul className="space-y-3">
                  {[
                    'Termination pay and severance',
                    'Vacation pay owed',
                    'Wrongful dismissal claims',
                    'Employment Standards Act violations',
                    'Human rights in employment',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/80">
                      <Briefcase className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>
                <p className="font-paragraph text-sm text-foreground/60 mt-4">Handled at: Ministry of Labour or courts</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">Housing Issues</h3>
                <ul className="space-y-3">
                  {[
                    'Timeline to vacate',
                    'Right to remain until proper process',
                    'Protection from lockout',
                    'Disputes over vacancy date',
                    'Condition of unit at departure',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/80">
                      <Home className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>
                <p className="font-paragraph text-sm text-foreground/60 mt-4">Handled at: Landlord and Tenant Board</p>
              </div>
            </div>
            <p className="font-paragraph text-foreground/70 text-center mt-8">
              We help coordinate both aspects to get you the best overall outcome.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Lost Your Super Job? Know Your Rights</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your situation and protect both your employment rights and housing.
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
            Licensed by the Law Society of Ontario | Paralegal services for housing and employment matters
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
