import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { ChevronRight, CheckCircle, AlertCircle, FileText, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CriminalMattersPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Criminal Defence Paralegal | Summary Offences | London Ontario"
        description="Licensed paralegal for summary conviction criminal matters in London, Ontario. Theft, assault, mischief & provincial offences defence. Protect your record."
        canonical="https://www.legalassist.london/services/criminal-matters"
      />
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
                Criminal Matters: Summary Conviction Offences
              </h1>
              <p className="font-paragraph text-lg text-foreground/80 mb-8">
                Licensed paralegal representation for summary conviction offences in the Ontario Court of Justice. We act on charges within our authorized scope of practice and refer matters that require a lawyer (indictable charges, jury trials, Superior Court matters) to defence counsel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/booking">
                  <Button className="bg-primary hover:bg-primary/90 text-white w-full">
                    Schedule Consultation
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 w-full">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Old_Toronto_City_Hall_Courtroom121.jpg/1200px-Old_Toronto_City_Hall_Courtroom121.jpg"
                alt="Interior of Old Toronto City Hall courtroom in Ontario showing wooden gallery seating, judge's bench, and classic Canadian courthouse architecture"
                width={600}
                height={450}
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
              What Are Summary Conviction Offences?
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-6">
              Summary conviction offences are less serious criminal charges that are tried in Provincial Court without a jury. These offences carry maximum sentences of up to 2 years less a day imprisonment and/or fines. They represent the majority of criminal charges and are handled more quickly than indictable offences.
            </p>
            <p className="font-paragraph text-lg text-foreground/80 mb-6">
              We concentrate our practice on representing individuals charged with summary conviction offences. We provide comprehensive defense strategies to protect your rights, minimize consequences, and achieve the best possible outcome in your case.
            </p>
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 mt-8">
              <div className="flex gap-4">
                <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading text-lg font-bold text-destructive mb-2">Important Scope Limitation</h3>
                  <p className="font-paragraph text-foreground/80">
                    Paralegals can only represent clients in Provincial Court for summary conviction offences. We cannot represent you for indictable offences, hybrid offences (when Crown proceeds by indictment), or matters in Superior Court. For those matters, you will need to retain a lawyer.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">Provincial Court</div>
              <p className="font-paragraph text-foreground/80">Jurisdiction for Summary Offences</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">2 Years</div>
              <p className="font-paragraph text-foreground/80">Maximum Sentence (Less a Day)</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">Faster</div>
              <p className="font-paragraph text-foreground/80">Resolution vs. Indictable Offences</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">Licensed</div>
              <p className="font-paragraph text-foreground/80">Paralegal Representation Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Summary Conviction Offences */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
            Summary Conviction Offences We May Represent
          </h2>
          <p className="font-paragraph text-base text-foreground/70 mb-6 max-w-4xl">
            Licensed Ontario paralegals are authorized under LSO By-Law 4 to act on
            <strong> summary conviction matters in the Ontario Court of Justice</strong>. Many
            of the offences listed below are <em>hybrid</em> &mdash; the Crown can elect to
            proceed by indictment or summarily. We can only represent you if the Crown
            elects to proceed summarily and the matter stays in the OCJ.
          </p>

          {/* Crown-election disclaimer — LSO By-Law 4 / s.802.1 Criminal Code */}
          <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-5 md:p-6 mb-10 max-w-4xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-paragraph font-semibold text-amber-900 mb-2">
                  Important: Crown election determines whether we can act
                </p>
                <p className="font-paragraph text-sm md:text-base text-amber-900/90 leading-relaxed mb-2">
                  Many of the categories below (assault, theft, mischief, fraud-under-$5,000,
                  impaired/dangerous operation, failure to remain) are <strong>hybrid offences</strong>.
                  Until the Crown formally elects to proceed summarily and the matter remains
                  in the Ontario Court of Justice, a paralegal cannot represent you on it.
                </p>
                <p className="font-paragraph text-sm md:text-base text-amber-900/90 leading-relaxed">
                  If the Crown elects to proceed by indictment &mdash; or you face a charge that
                  is purely indictable (murder, robbery, sexual assault, aggravated assault,
                  break and enter of a dwelling, etc.) &mdash; you need a <strong>lawyer</strong>.
                  We&rsquo;ll tell you that honestly at first meeting and refer you to defence
                  counsel rather than take on a matter we can&rsquo;t finish.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Assault & Violence Offences',
                items: [
                  'Simple assault (s.266) — hybrid; only if Crown elects summary',
                  'Assault with weapon (s.267) — hybrid; usually indictable, paralegal scope rare',
                  'Threatening behaviour (s.264.1) — hybrid; only if Crown elects summary',
                  'Criminal harassment (s.264) — hybrid; only if Crown elects summary',
                ]
              },
              {
                title: 'Property Offences',
                items: [
                  'Theft under $5,000 (s.334(b)) — hybrid; only if Crown elects summary',
                  'Mischief under $5,000 (s.430(4)) — hybrid; only if Crown elects summary',
                  'Trespassing at night (s.177) — summary',
                  'Possession of stolen property under $5,000 — hybrid; only if Crown elects summary',
                ]
              },
              {
                title: 'Driving Offences (Criminal Code)',
                items: [
                  'Impaired operation (s.320.14) — hybrid; only if Crown elects summary',
                  'Driving while disqualified (s.320.18) — hybrid; only if Crown elects summary',
                  'Failure to stop at accident (s.320.16) — hybrid; only if Crown elects summary',
                  'Dangerous operation (s.320.13) — hybrid; only if Crown elects summary',
                ]
              },
              {
                title: 'Public Order Offences',
                items: [
                  'Causing disturbance (s.175) — summary',
                  'Failure to comply with release order (s.145) — hybrid; only if Crown elects summary',
                  'Breach of probation (s.733.1) — hybrid; only if Crown elects summary',
                  'Disturbing religious worship (s.176) — hybrid; only if Crown elects summary',
                ]
              },
              {
                title: 'Fraud & Dishonesty',
                items: [
                  'Fraud under $5,000 (s.380(1)(b)) — hybrid; only if Crown elects summary',
                  'False pretences under $5,000 (s.362) — hybrid; only if Crown elects summary',
                  'Uttering forged documents (s.368) — hybrid; only if Crown elects summary',
                  'Personation (s.403) — hybrid; only if Crown elects summary',
                ]
              },
              {
                title: 'Other Common Offences',
                items: [
                  'Possession of cannabis over personal limit (Cannabis Act) — generally summary',
                  'Failure to appear (s.145(4)) — hybrid; only if Crown elects summary',
                  'Resisting peace officer (s.129) — hybrid; only if Crown elects summary',
                  'Obstructing peace officer (s.129) — hybrid; only if Crown elects summary',
                ]
              }
            ].map((category, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
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

      {/* Scope of Practice & Limitations */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            Our Scope of Practice & Limitations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* What We Can Do */}
            <div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-primary" />
                What We Can Represent
              </h3>
              <div className="space-y-4">
                {[
                  'Summary conviction offences in Provincial Court',
                  'Initial appearances and bail hearings',
                  'Guilty pleas and sentencing negotiations',
                  'Trial representation for summary offences',
                  'Disclosure review and evidence analysis',
                  'Crown negotiation and plea discussions',
                  'Sentencing advocacy and mitigation',
                  'Post-conviction advice and support'
                ].map((item, idx) => (
                  <div key={idx} className="bg-pastelgreen/20 rounded-lg p-4 border border-pastelgreen/30">
                    <p className="font-paragraph text-foreground/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* What We Cannot Do */}
            <div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-destructive" />
                What We Cannot Represent
              </h3>
              <div className="space-y-4">
                {[
                  'Indictable offences (serious crimes)',
                  'Hybrid offences when Crown proceeds by indictment',
                  'Matters in Superior Court or Court of Appeal',
                  'Youth criminal justice matters',
                  'Dangerous offender proceedings',
                  'Criminal harassment or stalking (when indictable)',
                  'Sexual assault charges',
                  'Matters requiring specialized legal expertise'
                ].map((item, idx) => (
                  <div key={idx} className="bg-destructive/10 rounded-lg p-4 border border-destructive/20">
                    <p className="font-paragraph text-foreground/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            Our Criminal Defense Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <FileText className="w-6 h-6" />,
                title: 'Case Assessment & Strategy',
                description: 'Thorough review of charges, evidence, and circumstances to develop a strong defense strategy tailored to your situation.'
              },
              {
                icon: <CheckCircle className="w-6 h-6" />,
                title: 'Disclosure Review',
                description: 'Detailed analysis of Crown disclosure (evidence) to identify weaknesses, inconsistencies, and opportunities for defense.'
              },
              {
                icon: <AlertCircle className="w-6 h-6" />,
                title: 'Bail & Release Hearings',
                description: 'Representation at bail hearings to secure your release on reasonable conditions while awaiting trial.'
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: 'Crown Negotiations',
                description: 'Strategic negotiation with Crown counsel to explore resolution options, including reduced charges or withdrawal.'
              },
              {
                icon: <DollarSign className="w-6 h-6" />,
                title: 'Plea & Sentencing',
                description: 'Guidance on plea options and representation at sentencing to minimize consequences and advocate for fair outcomes.'
              },
              {
                icon: <CheckCircle className="w-6 h-6" />,
                title: 'Trial Representation',
                description: 'Full courtroom representation at trial, including cross-examination of witnesses and presentation of your defense.'
              }
            ].map((service, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Criminal Process */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            The Criminal Justice Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                step: '1',
                title: 'Arrest & Charge',
                description: 'You are arrested and charged with a criminal offence.'
              },
              {
                step: '2',
                title: 'First Appearance',
                description: 'Initial court appearance where bail is addressed and next steps are determined.'
              },
              {
                step: '3',
                title: 'Disclosure & Preparation',
                description: 'Review evidence, assess case strength, and develop defense strategy.'
              },
              {
                step: '4',
                title: 'Negotiation or Trial',
                description: 'Negotiate with Crown or proceed to trial depending on case circumstances.'
              },
              {
                step: '5',
                title: 'Resolution',
                description: 'Guilty plea with sentencing or acquittal at trial.'
              }
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige h-full">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="font-paragraph text-sm text-foreground/80">
                    {item.description}
                  </p>
                </div>
                {item.step !== '5' && (
                  <div className="hidden md:flex absolute top-1/2 -right-2 transform -translate-y-1/2">
                    <ChevronRight className="w-6 h-6 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility & FAQ */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: 'What is the difference between summary and indictable offences?',
                a: 'Summary offences are less serious and tried in Provincial Court with maximum sentences up to 2 years less a day. Indictable offences are more serious and can be tried in Superior Court with longer sentences. Paralegals can only represent you for summary offences.'
              },
              {
                q: 'Can I get legal aid for criminal charges?',
                a: 'Yes, if you qualify based on income, you may be eligible for legal aid. We can discuss your eligibility and help you apply. Note that legal aid may cover lawyer services; contact us for details.'
              },
              {
                q: 'What should I do if I\'m arrested?',
                a: 'Exercise your right to remain silent and request to speak with a paralegal or lawyer immediately. Do not answer police questions without legal representation. Contact us as soon as possible.'
              },
              {
                q: 'How much does criminal defense representation cost?',
                a: 'Costs vary based on case complexity. We offer flexible fee arrangements including hourly rates and fixed fees for specific services. Discuss your budget during your consultation.'
              },
              {
                q: 'Can charges be withdrawn or dismissed?',
                a: 'Yes, through Crown negotiations, we may be able to secure withdrawal of charges, reduction to lesser offences, or other favorable resolutions depending on the circumstances.'
              },
              {
                q: 'What if I\'m charged with a hybrid offence?',
                a: 'If the Crown proceeds by indictment, we cannot represent you and you will need to retain a lawyer. If they proceed by summary conviction, we can assist. We\'ll advise you on the Crown\'s likely approach.'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                  {item.q}
                </h3>
                <p className="font-paragraph text-foreground/80">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance & Disclaimers */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-8">
            Important Compliance Notes
          </h2>
          <div className="bg-pastellavender/20 border border-pastellavender/50 rounded-lg p-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Paralegal Scope of Practice</h3>
                <p className="font-paragraph text-foreground/80 mb-4">
                  Our paralegals are licensed by the Law Society of Ontario and authorized to provide legal services within defined scope. We can represent you in Provincial Court for summary conviction offences only. For matters outside this scope, we will refer you to a lawyer.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Information Security & Privilege</h3>
                <p className="font-paragraph text-foreground/80 mb-4">
                  Once a formal paralegal-client relationship is established through a signed retainer agreement, all communications are protected by paralegal-client privilege. Information submitted through this website prior to retainer is handled securely but is not subject to privilege.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">No Guarantee of Outcomes</h3>
                <p className="font-paragraph text-foreground/80 mb-4">
                  While we work diligently to achieve the best possible outcomes, we cannot guarantee specific results. Criminal cases depend on many factors including evidence, witness credibility, and judicial discretion.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Professional Conduct</h3>
                <p className="font-paragraph text-foreground/80">
                  We adhere to the Law Society of Ontario's Rules of Professional Conduct and maintain the highest ethical standards in our representation of clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-r from-primary/10 to-pastelbeige/30">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-6">
            Facing Criminal Charges?
          </h2>
          <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            Don&rsquo;t face the criminal justice system alone. Our licensed paralegals are here to advocate for your interests within our scope of practice and refer you to defence counsel if your matter falls outside it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button className="bg-primary hover:bg-primary/90 text-white w-full">
                Schedule Your Consultation
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 w-full">
                Back to Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
