import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Clock, AlertTriangle, FileText, Calendar, Car, Home, Scale, Briefcase, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LegalDeadlinesGuidePage() {
  useEffect(() => {
    document.title = 'Important Legal Deadlines in Ontario | Don\'t Miss These | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Critical legal deadlines in Ontario you need to know. Traffic tickets, Small Claims, LTB, human rights, and more. Missing deadlines can cost you your case.');
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
              <Clock className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Critical Information</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Important Legal Deadlines in Ontario
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Missing a legal deadline can mean losing your case automatically. This guide covers the most important deadlines you need to know.
            </p>
          </div>
        </div>
      </section>

      {/* Warning */}
      <section className="py-8 bg-red-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto flex items-center gap-4">
            <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
            <p className="font-paragraph text-red-800">
              <strong>Warning:</strong> These are general guidelines. Some deadlines have exceptions or extensions. When in doubt, act sooner rather than later.
            </p>
          </div>
        </div>
      </section>

      {/* Traffic */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Car className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Traffic Tickets</h2>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { deadline: '15 days', action: 'Respond to ticket (request trial or early resolution)', consequence: 'Automatic conviction if you don\'t respond' },
                { deadline: '15 days', action: 'Pay the fine if pleading guilty', consequence: 'Additional fees if late' },
                { deadline: 'Before court date', action: 'Request disclosure from prosecutor', consequence: 'May not be able to adjourn if requested too late' },
              ].map((item, index) => (
                <div key={index} className={`p-5 grid md:grid-cols-3 gap-4 ${index !== 2 ? 'border-b border-gray-100' : ''}`}>
                  <div>
                    <span className="font-heading text-2xl font-bold text-primary">{item.deadline}</span>
                  </div>
                  <div className="font-paragraph text-foreground/80">{item.action}</div>
                  <div className="font-paragraph text-red-600 text-sm">{item.consequence}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Small Claims */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Small Claims Court</h2>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { deadline: '2 years', action: 'File your claim (limitation period)', consequence: 'Claim is statute-barred - you can never sue' },
                { deadline: '20 days', action: 'File Defence if you\'re sued', consequence: 'Default judgment against you' },
                { deadline: '6 months', action: 'Serve the defendant after filing', consequence: 'Claim may be dismissed' },
                { deadline: '30 days', action: 'Appeal a judgment', consequence: 'Judgment becomes final' },
              ].map((item, index) => (
                <div key={index} className={`p-5 grid md:grid-cols-3 gap-4 ${index !== 3 ? 'border-b border-gray-100' : ''}`}>
                  <div>
                    <span className="font-heading text-2xl font-bold text-primary">{item.deadline}</span>
                  </div>
                  <div className="font-paragraph text-foreground/80">{item.action}</div>
                  <div className="font-paragraph text-red-600 text-sm">{item.consequence}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LTB */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Home className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Landlord & Tenant Board</h2>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { deadline: '14 days', action: 'Void N4 by paying rent arrears in full', consequence: 'Eviction process continues' },
                { deadline: '5 days', action: 'File response to LTB application', consequence: 'Hearing proceeds without your response' },
                { deadline: '30 days', action: 'Request review of LTB order', consequence: 'Order becomes final' },
                { deadline: '1 year', action: 'File T6 for maintenance issues', consequence: 'Time-limited (varies by issue)' },
              ].map((item, index) => (
                <div key={index} className={`p-5 grid md:grid-cols-3 gap-4 ${index !== 3 ? 'border-b border-gray-100' : ''}`}>
                  <div>
                    <span className="font-heading text-2xl font-bold text-primary">{item.deadline}</span>
                  </div>
                  <div className="font-paragraph text-foreground/80">{item.action}</div>
                  <div className="font-paragraph text-red-600 text-sm">{item.consequence}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HRTO & Employment */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* HRTO */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8 text-primary" />
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Human Rights Tribunal</h2>
              </div>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {[
                  { deadline: '1 year', action: 'File HRTO application', consequence: 'Application likely dismissed as out of time' },
                  { deadline: '35 days', action: 'File Response if named as respondent', consequence: 'Hearing proceeds without your input' },
                ].map((item, index) => (
                  <div key={index} className={`p-5 grid md:grid-cols-3 gap-4 ${index !== 1 ? 'border-b border-gray-100' : ''}`}>
                    <div>
                      <span className="font-heading text-2xl font-bold text-primary">{item.deadline}</span>
                    </div>
                    <div className="font-paragraph text-foreground/80">{item.action}</div>
                    <div className="font-paragraph text-red-600 text-sm">{item.consequence}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Employment */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-8 h-8 text-primary" />
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Employment</h2>
              </div>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {[
                  { deadline: '2 years', action: 'File ESA claim with Ministry of Labour', consequence: 'Can only recover wages from past 2 years' },
                  { deadline: '2 years', action: 'Sue for wrongful dismissal', consequence: 'Claim is statute-barred' },
                  { deadline: 'Immediately', action: 'Don\'t sign termination papers under pressure', consequence: 'May waive valuable rights' },
                ].map((item, index) => (
                  <div key={index} className={`p-5 grid md:grid-cols-3 gap-4 ${index !== 2 ? 'border-b border-gray-100' : ''}`}>
                    <div>
                      <span className="font-heading text-2xl font-bold text-primary">{item.deadline}</span>
                    </div>
                    <div className="font-paragraph text-foreground/80">{item.action}</div>
                    <div className="font-paragraph text-red-600 text-sm">{item.consequence}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <Clock className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Deadline Approaching?</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Don't wait until the last minute. Free consultation to discuss your situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-gray-100 transition-colors">
              Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:5196011110" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-white/10 transition-colors">
              Call (519) 601-1110
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
