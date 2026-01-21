import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, AlertTriangle, FileText, DollarSign, Heart, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PersonalInjuryClaimsPage() {
  useEffect(() => {
    document.title = 'Personal Injury Claims Under $35,000 | Small Claims Court Ontario | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Licensed paralegal for personal injury claims under $35,000 in Ontario Small Claims Court. Slip and fall, dog bites, minor vehicle injuries. Free consultation in London.');
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
              <Heart className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Small Claims Court Services</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Personal Injury Claims in Small Claims Court
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Injured due to someone else's negligence? If your claim is under $35,000, you can pursue compensation through Ontario's Small Claims Court with licensed paralegal representation.
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

      {/* What Types of Injuries Qualify */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Types of Personal Injury Claims We Handle</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: AlertTriangle, title: 'Slip and Fall Injuries', desc: 'Injuries from falls on poorly maintained property, icy sidewalks, wet floors, or uneven surfaces.' },
              { icon: Heart, title: 'Dog Bites & Animal Attacks', desc: 'Compensation for medical expenses, lost wages, and pain from animal attacks. Ontario has strict liability laws.' },
              { icon: Shield, title: 'Minor Vehicle Accident Injuries', desc: 'Soft tissue injuries, whiplash, or minor injuries from car accidents where damages are under $35,000.' },
              { icon: Users, title: 'Assault & Battery Claims', desc: 'Civil claims for injuries from physical assault. Pursue compensation even if criminal charges weren\'t laid.' },
              { icon: Scale, title: 'Sports & Recreation Injuries', desc: 'Injuries from negligent supervision, faulty equipment, or unsafe facility conditions.' },
              { icon: FileText, title: 'Product Liability Injuries', desc: 'Injuries caused by defective or dangerous products. Manufacturers can be held liable.' },
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

      {/* Why Small Claims Court */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Why Small Claims Court for Personal Injury?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-primary" /> Cost-Effective
                </h3>
                <p className="font-paragraph text-foreground/70">Paralegal fees are significantly lower than hiring a personal injury lawyer. Keep more of your settlement.</p>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-primary" /> Faster Resolution
                </h3>
                <p className="font-paragraph text-foreground/70">Small Claims Court cases typically resolve in 6-12 months, compared to years for Superior Court litigation.</p>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Scale className="w-6 h-6 text-primary" /> Simplified Process
                </h3>
                <p className="font-paragraph text-foreground/70">Less formal procedures and relaxed evidence rules make it easier to present your case effectively.</p>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary" /> Licensed Representation
                </h3>
                <p className="font-paragraph text-foreground/70">Paralegals are fully licensed to represent you in Small Claims Court. Same advocacy, lower cost.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Claim */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What Compensation Can You Claim?</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {[
                { category: 'Medical Expenses', examples: 'Treatments, medications, physiotherapy, medical devices not covered by OHIP' },
                { category: 'Lost Wages', examples: 'Income lost while recovering, reduced work capacity, missed opportunities' },
                { category: 'Pain and Suffering', examples: 'General damages for physical pain, emotional distress, and reduced quality of life' },
                { category: 'Out-of-Pocket Costs', examples: 'Travel to appointments, home care, modifications, damaged personal property' },
                { category: 'Future Care Costs', examples: 'Ongoing treatment, therapy, or assistance you\'ll need going forward' },
              ].map((item, index) => (
                <div key={index} className={`p-6 ${index !== 4 ? 'border-b border-gray-100' : ''}`}>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.category}</h3>
                  <p className="font-paragraph text-foreground/70">{item.examples}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">The Personal Injury Claim Process</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                { step: '1', title: 'Free Consultation', desc: 'We review your case, assess liability, and estimate potential damages. No obligation.', time: 'Day 1' },
                { step: '2', title: 'Evidence Gathering', desc: 'Collect medical records, incident reports, photos, witness statements, and expense receipts.', time: 'Weeks 1-4' },
                { step: '3', title: 'Demand Letter', desc: 'Send formal demand to the at-fault party or their insurance. Many cases settle here.', time: 'Week 5' },
                { step: '4', title: 'File Claim', desc: 'If no settlement, file Plaintiff\'s Claim in Small Claims Court and serve the defendant.', time: 'Week 6-8' },
                { step: '5', title: 'Settlement Conference', desc: 'Mandatory meeting with a judge to explore settlement. Most cases resolve at this stage.', time: 'Months 3-6' },
                { step: '6', title: 'Trial (if needed)', desc: 'Present your case before a judge. We handle all evidence and arguments.', time: 'Months 6-12' },
              ].map((item, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading font-bold text-lg">
                    {item.step}
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-heading text-xl font-bold text-foreground">{item.title}</h3>
                      <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">{item.time}</span>
                    </div>
                    <p className="font-paragraph text-foreground/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Limitation Period Warning */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto bg-amber-50 border border-amber-200 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0" />
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Important: 2-Year Limitation Period</h2>
                <p className="font-paragraph text-foreground/80 mb-4">
                  In Ontario, you generally have <strong>2 years from the date of injury</strong> to file a personal injury claim. After this deadline, you may lose your right to compensation entirely.
                </p>
                <p className="font-paragraph text-foreground/80">
                  Don't wait. Contact us for a free consultation to protect your rights and start building your case while evidence is fresh.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Injured? Get the Compensation You Deserve</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to evaluate your personal injury claim. No recovery, no fee options available.
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
            Licensed by the Law Society of Ontario | Paralegal services for claims up to $35,000
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
