import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { ChevronRight, CheckCircle, AlertCircle, Clock, DollarSign, Shield, Gavel } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BailHearingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Bail Hearings Paralegal | Release Proceedings | London Ontario"
        description="Expert bail hearing representation in London, Ontario. Licensed paralegal for show cause hearings, release conditions & bail reviews. Available 24/7."
        canonical="https://www.legalassist.london/services/bail-hearings"
      />
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
                Bail Hearings & Release Proceedings
              </h1>
              <p className="font-paragraph text-lg text-foreground/80 mb-8">
                Expert paralegal representation to secure your release on reasonable bail conditions. When you're arrested, getting out of custody quickly is critical. Our licensed paralegals fight for your freedom with experienced bail hearing advocacy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button className="bg-primary hover:bg-primary/90 text-white w-full">
                    Schedule Bail Hearing
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 w-full">
                    Emergency Consultation
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://static.wixstatic.com/media/99571b_967c0331818f46028ebf68e309549013~mv2.png?id=bail-hearing-hero"
                alt="Professional Canadian courtroom interior with judge's bench and Canadian flags representing bail hearing proceedings"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="mb-12">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">
              What is a Bail Hearing?
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-6">
              A bail hearing is a court proceeding held shortly after your arrest to determine whether you should be released from custody and under what conditions. The Crown must prove that there are grounds to hold you in custody. Our paralegals present compelling arguments for your release on reasonable bail conditions.
            </p>
            <p className="font-paragraph text-lg text-foreground/80 mb-6">
              Time is critical in bail hearings. The sooner you have representation, the better your chances of securing release. We work quickly to prepare your bail application, gather supporting documents, and present your case effectively before the court.
            </p>
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 mt-8">
              <div className="flex gap-4">
                <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading text-lg font-bold text-destructive mb-2">Time-Sensitive Matter</h3>
                  <p className="font-paragraph text-foreground/80">
                    Bail hearings must be held within 3 days of arrest (or 30 days for serious offences). Contact us immediately if you or a loved one has been arrested. We offer emergency consultations and can often appear in court the same day.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-4">
              <div className="flex gap-4">
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading text-lg font-bold text-amber-800 mb-2">Important Scope Limitation</h3>
                  <p className="font-paragraph text-foreground/80">
                    Licensed paralegals can only represent clients in bail hearings for <strong>summary conviction offences</strong> in Provincial Court. For indictable offences, hybrid offences where the Crown proceeds by indictment, or bail hearings in Superior Court, you will need to retain a lawyer. If you are unsure which type of offence you have been charged with, contact us for a free assessment and we will advise you on the appropriate representation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">3 Days</div>
              <p className="font-paragraph text-foreground/80">Maximum Time Before Bail Hearing</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">24 Hours</div>
              <p className="font-paragraph text-foreground/80">Our Emergency Response Time</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">Provincial Court</div>
              <p className="font-paragraph text-foreground/80">Where Bail Hearings Are Held</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">Expert</div>
              <p className="font-paragraph text-foreground/80">Paralegal Representation Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bail Hearing Process */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            The Bail Hearing Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                step: '1',
                title: 'Arrest & Custody',
                description: 'You are arrested and taken into police custody. You have the right to contact a lawyer or paralegal immediately.'
              },
              {
                step: '2',
                title: 'Initial Appearance',
                description: 'You appear before a judge within 3 days. The Crown presents reasons for detention. We present reasons for release.'
              },
              {
                step: '3',
                title: 'Bail Hearing',
                description: 'We present evidence and arguments supporting your release, including character references, employment, family ties, and community roots.'
              },
              {
                step: '4',
                title: 'Release Decision',
                description: 'The judge decides whether to release you and on what conditions (recognizance, sureties, reporting, curfew, etc.).'
              },
              {
                step: '5',
                title: 'Conditions Compliance',
                description: 'You follow all bail conditions set by the court. Breaching conditions can result in additional charges.'
              },
              {
                step: '6',
                title: 'Case Resolution',
                description: 'Your case proceeds through the criminal justice system while you remain in the community on bail.'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-heading font-bold text-lg">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="font-paragraph text-foreground/80">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Bail Conditions */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            Common Bail Conditions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Personal Recognizance',
                items: ['Promise to appear in court', 'No sureties required', 'No deposit needed', 'Lowest level of conditions']
              },
              {
                title: 'With Sureties',
                items: ['Responsible person supervises you', 'Surety pledges money if you breach', 'Surety must attend court', 'Provides additional accountability']
              },
              {
                title: 'Residence & Reporting',
                items: ['Must reside at specific address', 'Regular reporting to police', 'Curfew restrictions', 'Travel limitations']
              },
              {
                title: 'No-Contact Orders',
                items: ['Cannot contact alleged victim', 'Cannot attend specific locations', 'Cannot possess weapons', 'Protective conditions']
              }
            ].map((category, idx) => (
              <div key={idx} className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">{category.title}</h3>
                <ul className="space-y-3">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-paragraph text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            Our Bail Hearing Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* What We Do */}
            <div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-primary" />
                What We Provide
              </h3>
              <div className="space-y-4">
                {[
                  'Immediate emergency representation',
                  'Bail hearing preparation and strategy',
                  'Character reference gathering',
                  'Employment and community ties documentation',
                  'Surety coordination and preparation',
                  'Court appearance and advocacy',
                  'Bail condition negotiation',
                  'Post-release guidance and support'
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="font-paragraph text-foreground/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Us */}
            <div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                Why Choose Our Firm
              </h3>
              <div className="space-y-4">
                {[
                  '24/7 emergency availability',
                  'Experienced bail hearing advocates',
                  'Quick response time (same-day service)',
                  'Strong relationships with courts',
                  'Proven track record of successful releases',
                  'Compassionate and professional approach',
                  'Affordable emergency rates',
                  'Ongoing case support and guidance'
                ].map((item, idx) => (
                  <div key={idx} className="bg-pastelgreen/20 rounded-lg p-4 border border-pastelgreen/30">
                    <p className="font-paragraph text-foreground/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            Important Information About Bail
          </h2>
          <div className="space-y-6">
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Presumption of Innocence</h3>
              <p className="font-paragraph text-foreground/80">
                You are presumed innocent until proven guilty. Bail is not punishment—it's a mechanism to ensure you appear in court. The Crown must prove why you should be detained.
              </p>
            </div>
            <div className="bg-pastelgreen/20 rounded-lg p-6 border border-pastelgreen/30">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Grounds for Detention</h3>
              <p className="font-paragraph text-foreground/80">
                The Crown can only detain you on three grounds: (1) ensuring attendance in court, (2) protecting public safety, or (3) maintaining public confidence in the justice system. We challenge these grounds vigorously.
              </p>
            </div>
            <div className="bg-pastellavender/30 rounded-lg p-6 border border-pastellavender/30">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Breach of Conditions</h3>
              <p className="font-paragraph text-foreground/80">
                Violating any bail condition can result in additional criminal charges and immediate re-arrest. We help you understand and comply with all conditions set by the court.
              </p>
            </div>
            <div className="bg-pastelpeach/30 rounded-lg p-6 border border-pastelpeach/30">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Right to Counsel</h3>
              <p className="font-paragraph text-foreground/80">
                You have the right to contact a lawyer or paralegal immediately upon arrest. Do not answer police questions without representation. Contact us right away for emergency bail hearing assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-primary/10 py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Emergency Bail Hearing Help?
          </h2>
          <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            If you or a loved one has been arrested, contact us immediately. We offer 24/7 emergency consultations and can often appear in court the same day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Schedule Emergency Consultation
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
