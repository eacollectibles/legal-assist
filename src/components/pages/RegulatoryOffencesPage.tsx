import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, CheckCircle, AlertTriangle, Briefcase, Building, Truck, HardHat, Leaf } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RegulatoryOffencesPage() {
  useEffect(() => {
    document.title = 'Regulatory Offences Defence | OHSA Violations Ontario | Paralegal | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Charged with regulatory offences in Ontario? We defend OHSA, environmental, health and safety, and business licensing violations. Paralegal representation London. Free consultation.');
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
              <span className="font-paragraph text-sm font-medium">Provincial Offences</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Regulatory Offences Defence
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Regulatory charges can threaten your business, professional licence, and livelihood. We defend individuals and businesses against health and safety, environmental, and other regulatory violations.
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

      {/* Types of Regulatory Offences */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Types of Regulatory Offences</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { icon: HardHat, title: 'Occupational Health & Safety (OHSA)', desc: 'Workplace safety violations, failure to provide training, unsafe conditions, accident reporting' },
              { icon: Leaf, title: 'Environmental', desc: 'Improper waste disposal, spills, emissions violations, contamination' },
              { icon: Building, title: 'Building Code', desc: 'Construction violations, unpermitted work, safety standards' },
              { icon: Truck, title: 'Transportation', desc: 'Commercial vehicle regulations, hours of service, load limits' },
              { icon: Shield, title: 'Professional Licensing', desc: 'Practicing without licence, professional misconduct, credential violations' },
              { icon: Briefcase, title: 'Business Regulations', desc: 'Consumer protection, advertising standards, industry-specific rules' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OHSA Focus */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Occupational Health & Safety Act</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <p className="font-paragraph text-foreground/80 mb-6">
                OHSA violations are among the most serious regulatory offences we defend. Common charges include:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-3">Employer Charges</h3>
                  <ul className="space-y-2">
                    {[
                      'Failing to ensure safe workplace',
                      'No health and safety policy',
                      'Inadequate training',
                      'Missing safety equipment',
                      'WSIB reporting failures',
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/70 text-sm">
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-3">Supervisor/Worker Charges</h3>
                  <ul className="space-y-2">
                    {[
                      'Failing to work safely',
                      'Not using safety equipment',
                      'Supervisor duty failures',
                      'Endangering workers',
                      'Failing to report hazards',
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/70 text-sm">
                        <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Penalties */}
      <section className="py-16 md:py-20 bg-red-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Potential Penalties</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-3">Individual Penalties</h3>
                  <ul className="space-y-2">
                    {[
                      'Fines up to $100,000+ (OHSA)',
                      'Up to 12 months imprisonment',
                      'Professional licence suspension',
                      'Director/officer liability',
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/70 text-sm">
                        <Scale className="w-4 h-4 text-red-600 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-3">Corporate Penalties</h3>
                  <ul className="space-y-2">
                    {[
                      'Fines up to $1,500,000+ (OHSA)',
                      'Business licence revocation',
                      'Compliance orders',
                      'Reputational damage',
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/70 text-sm">
                        <Scale className="w-4 h-4 text-red-600 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Due Diligence Defence */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">The Due Diligence Defence</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                Most regulatory offences are "strict liability"—the Crown doesn't need to prove intent. However, you can defend by proving <strong>due diligence</strong>:
              </p>
              <ul className="space-y-4">
                {[
                  'You took all reasonable precautions to prevent the violation',
                  'You had proper policies, procedures, and training in place',
                  'You conducted regular inspections and audits',
                  'You responded appropriately when issues were identified',
                  'You exercised reasonable care in the circumstances',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 font-paragraph text-foreground/80">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
              <div className="bg-primary/5 p-4 rounded-lg mt-6">
                <p className="font-paragraph text-foreground/80">
                  <strong>Key point:</strong> Building a due diligence defence requires documenting everything BEFORE an incident occurs. We can also help establish systems proactively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Protect Your Business</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your charges and develop a defence strategy.
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
            Licensed by the Law Society of Ontario | Provincial Offences Act representation
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
