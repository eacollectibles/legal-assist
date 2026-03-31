import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, AlertTriangle, FileText, Users, Calendar, Briefcase } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LTBHearingPrepPage() {
  // SEO handled by AutoSEO component

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Scale className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Landlord and Tenant Board</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              LTB Hearing Preparation Guide
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Your first LTB hearing can be intimidating. Know what to expect, how to prepare your evidence, and how to present your case effectively—whether you're a tenant or landlord.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors">
                Get Representation <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:3658829515" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/5 transition-colors">
                Call 365-882-9515
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">What to Expect at Your Hearing</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Calendar, title: 'Scheduling', desc: 'Hearings are usually scheduled 4-8 weeks after application. You\'ll receive a Notice of Hearing with date, time, and whether it\'s in-person or video.' },
              { icon: Users, title: 'Who\'s There', desc: 'An Adjudicator (like a judge) presides. Both parties present their case. Witnesses may attend. A Duty Counsel may be available for quick advice.' },
              { icon: Clock, title: 'How Long', desc: 'Simple matters: 15-30 minutes. Complex cases: 1-3 hours or may be adjourned to another day. Arrive early and expect to wait.' },
              { icon: Scale, title: 'The Format', desc: 'The Adjudicator explains the process. Applicant presents first, then Respondent. Both can ask questions of each other. Then closing statements.' },
              { icon: FileText, title: 'Evidence', desc: 'Bring 3 copies of all documents: one for you, one for the other party, one for the Adjudicator. Organize chronologically.' },
              { icon: Briefcase, title: 'The Decision', desc: 'Sometimes given at the hearing, often mailed within days. Written orders are binding and enforceable.' },
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

      {/* Evidence Checklist */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Evidence Checklist</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">For Tenants</h3>
              <ul className="space-y-3">
                {[
                  'Copy of your lease agreement',
                  'Rent receipts or bank statements showing payments',
                  'Photos of any maintenance issues (with dates)',
                  'Written communications with landlord (texts, emails)',
                  'Any notices you\'ve received',
                  'Repair requests and landlord\'s responses',
                  'Witness contact info and written statements',
                  'Medical notes (if health-related issues)',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/80">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">For Landlords</h3>
              <ul className="space-y-3">
                {[
                  'Copy of the lease agreement',
                  'Rent ledger showing payments and arrears',
                  'Copies of all notices served (with proof of service)',
                  'Photos of damage (with dates)',
                  'Repair invoices and receipts',
                  'Written communications with tenant',
                  'Police reports (if applicable)',
                  'Witness statements from other tenants',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/80">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="font-paragraph text-foreground/70 text-center mt-8">
            <strong>Remember:</strong> Bring 3 copies of everything. Original photos on your phone are fine, but also print them.
          </p>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Tips for Your Hearing</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { title: 'Be On Time', desc: 'Arrive 15-30 minutes early. If you\'re late, your case may be dismissed or decided without you.' },
                { title: 'Dress Appropriately', desc: 'Business casual is fine. No hats, shorts, or flip-flops. Show you take the process seriously.' },
                { title: 'Be Respectful', desc: 'Address the Adjudicator as "Member" or "Adjudicator." Don\'t interrupt. Wait your turn to speak.' },
                { title: 'Stick to the Facts', desc: 'Emotions are understandable, but focus on specific dates, times, and events. Avoid personal attacks.' },
                { title: 'Answer Directly', desc: 'When asked questions, answer yes or no first, then explain if needed. Don\'t ramble.' },
                { title: 'Don\'t Argue with the Other Side', desc: 'Direct all responses to the Adjudicator. You\'ll have your chance to present your version.' },
                { title: 'Ask for Clarification', desc: 'If you don\'t understand something, it\'s okay to ask the Adjudicator to explain.' },
                { title: 'Know Your Ask', desc: 'Be clear about what outcome you want. What are you asking the Board to order?' },
              ].map((item, index) => (
                <div key={index} className={`p-6 flex items-start gap-4 ${index !== 7 ? 'border-b border-gray-100' : ''}`}>
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-heading font-bold text-sm">
                    {index + 1}
                  </div>
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

      {/* Video Hearings */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">Video Hearing Tips</h2>
            <p className="font-paragraph text-foreground/80 mb-6 text-center">
              Many LTB hearings are now held via Zoom or similar platforms. Here's how to prepare:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Test your internet, camera, and microphone beforehand',
                'Use a computer or tablet, not phone if possible',
                'Find a quiet, private location with good lighting',
                'Have all your documents ready and organized',
                'Keep your camera on and look at it when speaking',
                'Mute yourself when not speaking to reduce background noise',
                'Have a backup plan (phone number) if tech fails',
                'Dress as you would for in-person (at least top half!)',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="font-paragraph text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Get Representation */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">Why Professional Representation Matters</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">
              While you can represent yourself at the LTB, having a paralegal significantly improves your chances of success:
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              {[
                'We know the rules of evidence and procedure',
                'We can identify legal issues you might miss',
                'We prepare and organize your evidence effectively',
                'We know what questions to ask the other side',
                'We can negotiate settlements before hearing',
                'We stay calm under pressure and keep you focused',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                  <Scale className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Don't Face the LTB Alone</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to discuss your case and how we can help you prepare for—or avoid—a hearing.
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
            Licensed by the Law Society of Ontario | Representation at the Landlord and Tenant Board
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
