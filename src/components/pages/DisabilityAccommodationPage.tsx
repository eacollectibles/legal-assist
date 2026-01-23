import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, AlertTriangle, Accessibility, FileText, Users, Building } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DisabilityAccommodationPage() {
  useEffect(() => {
    document.title = 'Disability Accommodation | Workplace Accommodation Ontario | HRTO | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Denied disability accommodation at work? File an HRTO complaint for discrimination. We help with workplace accommodation requests and human rights claims. Free consultation London.');
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
              <Accessibility className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Human Rights</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Disability Accommodation Claims
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Ontario employers have a legal duty to accommodate employees with disabilities to the point of undue hardship. If your employer refuses reasonable accommodation, we can help you fight for your rights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors">
                Find out where you stand <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:5196011110" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/5 transition-colors">
                Call (519) 601-1110
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What is Disability Under Human Rights */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What Counts as a "Disability"?</h2>
          <div className="max-w-4xl mx-auto">
            <p className="font-paragraph text-foreground/80 mb-8 text-center">
              The Ontario Human Rights Code defines disability broadly. It includes:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Physical disabilities (mobility, chronic pain, injuries)',
                'Mental health conditions (depression, anxiety, PTSD)',
                'Learning disabilities (ADHD, dyslexia)',
                'Developmental disabilities',
                'Sensory disabilities (hearing, vision impairment)',
                'Episodic conditions (MS, epilepsy, migraines)',
                'Addictions (substance use disorders)',
                'Chronic illnesses (diabetes, Crohn\'s, arthritis)',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="font-paragraph text-foreground">{item}</span>
                </div>
              ))}
            </div>
            <div className="bg-primary/5 p-6 rounded-lg mt-8">
              <p className="font-paragraph text-foreground/80 text-center">
                <strong>You don't need a formal diagnosis.</strong> If a condition limits your ability to work, it may qualify as a disability requiring accommodation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Employer's Duty */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Your Employer's Duty to Accommodate</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                Under the Ontario Human Rights Code, employers must accommodate employees with disabilities to the point of <strong>"undue hardship."</strong> This is a high threshold that employers often misunderstand.
              </p>
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">What This Means:</h3>
              <ul className="space-y-3 mb-6">
                {[
                  'Employers must actively explore accommodation options',
                  'Cost alone is rarely sufficient to claim undue hardship',
                  'Inconvenience is NOT the same as undue hardship',
                  'The process must be individualized to your needs',
                  'Medical information requests must be limited to what\'s necessary',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 font-paragraph text-foreground/80">
                    <Scale className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Accommodation */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Common Workplace Accommodations</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { title: 'Modified Duties', desc: 'Adjusting job responsibilities to work around limitations while performing essential functions.' },
              { title: 'Flexible Hours', desc: 'Adjusted start/end times, compressed work weeks, or breaks for medical appointments.' },
              { title: 'Work From Home', desc: 'Remote work arrangements when appropriate for the position.' },
              { title: 'Physical Changes', desc: 'Ergonomic equipment, accessible workspaces, modified workstations.' },
              { title: 'Leave of Absence', desc: 'Time off for treatment, recovery, or to manage episodic conditions.' },
              { title: 'Gradual Return', desc: 'Phased return to work after illness or injury with gradually increasing hours.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signs of Discrimination */}
      <section className="py-16 md:py-20 bg-red-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">Signs Your Employer May Be Violating Your Rights</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Refusing to discuss accommodation options',
                'Demanding excessive or invasive medical information',
                'Claiming "undue hardship" without proper analysis',
                'Treating your request as an inconvenience',
                'Disciplining you for disability-related absences',
                'Terminating you after you requested accommodation',
                'Reassigning you without exploring alternatives',
                'Creating a hostile environment after your request',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span className="font-paragraph text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HRTO Process */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Filing an HRTO Complaint</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { step: '1', title: 'Document Everything', desc: 'Keep records of accommodation requests, employer responses, and how you\'ve been treated.' },
              { step: '2', title: 'File Within 1 Year', desc: 'You have 1 year from the last discriminatory act to file your application.' },
              { step: '3', title: 'Mediation', desc: 'Most cases go to mediation first, where many are resolved.' },
              { step: '4', title: 'Hearing', desc: 'If not resolved, a hearing is held where you can present your case.' },
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
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">Potential Remedies</h2>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              {[
                { remedy: 'Monetary Compensation', desc: 'For lost wages and injury to dignity' },
                { remedy: 'Reinstatement', desc: 'Return to your job if terminated' },
                { remedy: 'Accommodation Order', desc: 'Tribunal orders employer to accommodate' },
                { remedy: 'Policy Changes', desc: 'Employer required to change practices' },
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
          <Accessibility className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Denied Accommodation? Fight Back</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your situation and explain your human rights options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-gray-100 transition-colors">
              Find out where you stand <ArrowRight className="w-5 h-5" />
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
            Licensed by the Law Society of Ontario | Human Rights Tribunal representation
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
