import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function WhatIsAParalegalPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              What Is a Paralegal?
            </h1>
            <p className="font-paragraph text-lg text-foreground/80">
              Learn about licensed paralegals in Ontario — what they can do, their scope of practice, and how they're regulated.
            </p>
          </div>
        </div>
      </section>

      {/* What Do Paralegals Do Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-8">
              What Do Paralegals Do in Ontario?
            </h2>
            
            <div className="prose prose-lg prose-stone text-foreground/80 font-paragraph mb-12">
              <p className="text-lg leading-relaxed mb-6">
                Paralegals in Ontario are licensed professionals regulated by the Law Society of Ontario. They provide legal services within a defined scope of practice, offering professional representation and assistance at a more affordable rate than lawyers while maintaining the same professional standards and ethical obligations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-pastelbeige/20 rounded-lg p-8 border border-pastelbeige">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Authorized Practice Areas
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="font-paragraph text-foreground/80"><strong>Provincial Offences:</strong> Traffic tickets, bylaw violations, and other provincial offences</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="font-paragraph text-foreground/80"><strong>Summary Conviction Offences:</strong> Criminal charges tried in Provincial Court</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="font-paragraph text-foreground/80"><strong>Small Claims Court:</strong> Civil disputes up to $50,000</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="font-paragraph text-foreground/80"><strong>Landlord and Tenant Board:</strong> Residential tenancy disputes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="font-paragraph text-foreground/80"><strong>Human Rights Tribunal:</strong> Discrimination and human rights complaints</span>
                  </li>
                </ul>
              </div>

              <div className="bg-pastelgreen/20 rounded-lg p-8 border border-pastelgreen/30">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Additional Services
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="font-paragraph text-foreground/80"><strong>Mediation Services:</strong> Dispute resolution and settlement negotiation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="font-paragraph text-foreground/80"><strong>Commissioner of Oaths:</strong> Administration of oaths and statutory declarations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="font-paragraph text-foreground/80"><strong>Notary Public Services:</strong> Document certification and witnessing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="font-paragraph text-foreground/80"><strong>Legal Advice:</strong> Guidance within the scope of paralegal practice</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-pastellavender/20 rounded-lg p-8 border border-pastellavender/30 mb-12">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                What Paralegals Cannot Do
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4">
                While paralegals have broad authority, there are important limitations to their scope of practice:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Cannot represent clients in Superior Court or Court of Appeal</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Cannot handle indictable offences (serious criminal charges)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Cannot provide services in family law, real estate conveyancing, or wills/estates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Cannot appear in certain specialized tribunals or courts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Cannot provide legal services outside Ontario</span>
                </li>
              </ul>
            </div>

            <div className="bg-pastelpeach/20 rounded-lg p-8 border border-pastelpeach/30">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                Regulation & Professional Standards
              </h3>
              <p className="font-paragraph text-foreground/80 mb-4">
                All paralegals in Ontario are licensed and regulated by the Law Society of Ontario. This means:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="font-paragraph text-foreground/80">Paralegals must meet strict educational and professional requirements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="font-paragraph text-foreground/80">They are bound by the same ethical rules and professional conduct standards as lawyers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="font-paragraph text-foreground/80">Formal client communications (after retainer) are protected by paralegal-client privilege</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="font-paragraph text-foreground/80">They maintain professional liability insurance</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="font-paragraph text-foreground/80">They are subject to discipline and complaints procedures</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-r from-primary/10 to-pastelbeige/30">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-6">
            Need Professional Paralegal Services?
          </h2>
          <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            Our licensed paralegals are ready to assist you with your legal matter. Contact us today to discuss your situation and learn how we can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph px-8 py-4 rounded-lg transition-all hover:bg-primary/90"
            >
              Contact Us
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/services"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph px-8 py-4 rounded-lg transition-all hover:bg-primary/5"
            >
              View Our Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
