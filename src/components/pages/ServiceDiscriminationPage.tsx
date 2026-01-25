import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, CheckCircle, AlertTriangle, Store, Coffee, Building, Users, ShoppingBag, Car } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ServiceDiscriminationPage() {
  // SEO handled by AutoSEO component

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Store className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Human Rights</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Service Discrimination Claims
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Every person in Ontario has the right to be treated equally when accessing services. If you've been denied service, treated poorly, or faced discrimination as a customer, you have legal options.
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

      {/* What Services */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What "Services" Are Protected?</h2>
          <div className="max-w-4xl mx-auto">
            <p className="font-paragraph text-foreground/80 mb-8 text-center">
              The Ontario Human Rights Code protects against discrimination in all services available to the public:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Store, title: 'Retail Stores', items: ['Clothing stores', 'Grocery stores', 'Electronics retailers', 'Department stores'] },
                { icon: Coffee, title: 'Restaurants & Bars', items: ['Restaurants', 'Cafes', 'Bars and clubs', 'Fast food'] },
                { icon: Building, title: 'Professional Services', items: ['Banks', 'Insurance companies', 'Healthcare providers', 'Legal services'] },
                { icon: Users, title: 'Public Services', items: ['Government offices', 'Public transit', 'Libraries', 'Recreation centers'] },
                { icon: ShoppingBag, title: 'Personal Services', items: ['Hair salons', 'Spas', 'Gyms', 'Hotels'] },
                { icon: Car, title: 'Transportation', items: ['Taxis and rideshare', 'Car rentals', 'Airlines', 'Bus services'] },
              ].map((item, index) => (
                <div key={index} className="bg-white p-5 rounded-xl shadow-sm">
                  <item.icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <ul className="space-y-1">
                    {item.items.map((subitem, idx) => (
                      <li key={idx} className="font-paragraph text-foreground/70 text-sm">• {subitem}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Protected Grounds */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Protected Grounds</h2>
          <div className="max-w-4xl mx-auto">
            <p className="font-paragraph text-foreground/80 mb-6 text-center">
              You cannot be denied service or treated differently because of:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                'Race',
                'Colour',
                'Ancestry',
                'Place of origin',
                'Ethnic origin',
                'Citizenship',
                'Creed (religion)',
                'Sex',
                'Sexual orientation',
                'Gender identity',
                'Gender expression',
                'Age',
                'Marital status',
                'Family status',
                'Disability',
                'Receipt of public assistance (housing only)',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="font-paragraph text-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Examples of Service Discrimination</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { title: 'Racial Profiling in Stores', desc: 'Being followed by security, asked for extra ID, or subjected to more scrutiny than other customers.' },
                { title: 'Denied Entry', desc: 'Being refused entry to a restaurant, bar, or club based on race, disability, or other protected grounds.' },
                { title: 'Differential Treatment', desc: 'Receiving worse service, longer waits, or being ignored while other customers are served promptly.' },
                { title: 'Disability Barriers', desc: 'Service providers failing to accommodate disabilities or refusing service to people with service animals.' },
                { title: 'Religious Discrimination', desc: 'Being denied service or treated differently due to religious dress, practices, or beliefs.' },
                { title: 'LGBTQ+ Discrimination', desc: 'Being refused service, harassed, or treated differently based on sexual orientation or gender identity.' },
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

      {/* What to Do */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">What To Do If You Experience Discrimination</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { step: '1', title: 'Document the Incident', desc: 'Write down what happened, when, where, who was involved, and any witnesses. Take photos if relevant.' },
              { step: '2', title: 'Get Witness Information', desc: 'If anyone saw what happened, get their contact information. Witness statements strengthen claims.' },
              { step: '3', title: 'Report to Management', desc: 'Make a formal complaint to the business. Their response (or lack thereof) becomes evidence.' },
              { step: '4', title: 'File Within 1 Year', desc: 'HRTO complaints must be filed within 1 year of the incident. Don\'t delay.' },
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

      {/* What You Can Recover */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Scale className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">Potential Remedies</h2>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              {[
                { remedy: 'Compensation for Dignity', desc: 'Monetary damages for the humiliation and harm you experienced' },
                { remedy: 'Out-of-Pocket Expenses', desc: 'Reimbursement for any financial losses' },
                { remedy: 'Written Apology', desc: 'Formal acknowledgment of wrongdoing' },
                { remedy: 'Policy Changes', desc: 'Business required to change discriminatory practices' },
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg">
                  <h3 className="font-heading font-bold text-foreground">{item.remedy}</h3>
                  <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <Store className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Everyone Deserves Equal Treatment</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your experience and explain your options.
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
            Licensed by the Law Society of Ontario | Human Rights Tribunal representation
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
