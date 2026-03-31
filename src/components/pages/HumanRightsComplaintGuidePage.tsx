import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Users, Clock, CheckCircle, AlertTriangle, FileText, Scale, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HumanRightsComplaintGuidePage() {
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
              <span className="font-paragraph text-sm font-medium">Free Guide</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Filing a Human Rights Complaint in Ontario
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              If you've experienced discrimination, you have the right to file a complaint at the Human Rights Tribunal of Ontario (HRTO). This guide explains the process.
            </p>
          </div>
        </div>
      </section>

      {/* Protected Grounds */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Protected Grounds</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <p className="font-paragraph text-foreground/80 mb-6">
                The Ontario Human Rights Code protects against discrimination based on:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                  'Receipt of public assistance (housing)',
                ].map((item, index) => (
                  <div key={index} className="bg-primary/5 p-2 rounded-lg text-center">
                    <span className="font-paragraph text-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Areas */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Where Protection Applies</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { area: 'Employment', examples: 'Hiring, firing, promotions, workplace treatment' },
              { area: 'Housing', examples: 'Renting, buying, rules, eviction' },
              { area: 'Services', examples: 'Stores, restaurants, healthcare, government' },
              { area: 'Contracts', examples: 'Insurance, loans, memberships' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-sm text-center">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.area}</h3>
                <p className="font-paragraph text-foreground/70 text-sm">{item.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deadline */}
      <section className="py-16 md:py-20 bg-red-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Calendar className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">Critical Deadline</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="font-heading text-4xl font-bold text-red-600 mb-2">1 Year</p>
              <p className="font-paragraph text-foreground/80">
                You must file your application within <strong>1 year</strong> of the last incident of discrimination. The Tribunal can extend this in exceptional circumstances, but don't count on it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">The HRTO Process</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { step: 1, title: 'File Application (Form 1)', desc: 'Complete the HRTO application form online or on paper. Describe what happened and how it relates to protected grounds.' },
              { step: 2, title: 'HRTO Reviews', desc: 'Tribunal reviews your application. May ask for clarification or more information.' },
              { step: 3, title: 'Respondent Notified', desc: 'If accepted, the person/organization you\'re complaining about receives your application.' },
              { step: 4, title: 'Response Filed', desc: 'Respondent has 35 days to file a Response denying or admitting your allegations.' },
              { step: 5, title: 'Mediation Offered', desc: 'HRTO offers free mediation to try to resolve the matter. Voluntary but often successful.' },
              { step: 6, title: 'Hearing', desc: 'If no settlement, a hearing is scheduled. Both sides present evidence and witnesses.' },
              { step: 7, title: 'Decision', desc: 'Adjudicator issues a written decision, usually within a few months of hearing.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading font-bold">
                  {item.step}
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm flex-1">
                  <h3 className="font-heading font-bold text-foreground">{item.title}</h3>
                  <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Remedies */}
      <section className="py-16 md:py-20 bg-green-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What You Can Get</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { remedy: 'Monetary Compensation', desc: 'For lost wages, expenses, and injury to dignity (typically $5,000-$35,000 for dignity)' },
              { remedy: 'Reinstatement', desc: 'Getting your job back if wrongfully terminated' },
              { remedy: 'Policy Changes', desc: 'Requiring the organization to change discriminatory policies' },
              { remedy: 'Training', desc: 'Ordering human rights training for the respondent' },
              { remedy: 'Accommodation', desc: 'Requiring reasonable accommodation for disability or other needs' },
              { remedy: 'Letter of Reference', desc: 'In employment cases, may order a neutral reference letter' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-sm">
                <Scale className="w-6 h-6 text-green-600 mb-2" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.remedy}</h3>
                <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Experienced Discrimination?</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to discuss your situation and whether you have a case.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-gray-100 transition-colors">
              Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/services/human-rights" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-white/10 transition-colors">
              Human Rights Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
