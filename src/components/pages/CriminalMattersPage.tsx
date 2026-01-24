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
                Expert paralegal representation for summary conviction offences in Ontario. Our licensed paralegals provide skilled defense for criminal charges within our scope of practice, helping you navigate the criminal justice system with confidence.
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
                src="https://static.wixstatic.com/media/99571b_435bddb0469946d3a00f5601e7879951~mv2.png?originWidth=1152&originHeight=768"
                alt="Professional Canadian courtroom interior with wooden judge's bench, witness stand, and Canadian maple leaf flags representing Ontario Provincial Court proceedings"
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
              What Are Summary Conviction Offences?
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-6">
              Summary conviction offences are less serious criminal charges that are tried in Provincial Court without a jury. These offences carry maximum sentences of up to 2 years less a day imprisonment and/or fines. They represent the majority of criminal charges and are handled more quickly than indictable offences.
            </p>
            <p className="font-paragraph text-lg text-foreground/80 mb-6">
              Our firm specializes in representing individuals charged with summary conviction offences. We provide comprehensive defense strategies to protect your rights, minimize consequences, and achieve the best possible outcome in your case.
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
              <div className="text-4xl font-bold text-primary mb-2">Expert</div>
              <p className="font-paragraph text-foreground/80">Paralegal Representation Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Summary Conviction Offences */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            Types of Summary Conviction Offences We Represent
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Assault & Violence Offences',
                items: ['Simple assault', 'Assault with weapon', 'Threatening behaviour', 'Harassment and stalking']
              },
              {
                title: 'Property Offences',
                items: ['Theft under $5,000', 'Mischief/Vandalism', 'Trespassing', 'Possession of stolen property']
              },
              {
                title: 'Driving Offences',
                items: ['Impaired operation (summary)', 'Driving with suspended license', 'Failure to remain at accident scene', 'Dangerous operation of motor vehicle']
              },
              {
                title: 'Public Order Offences',
                items: ['Disorderly conduct', 'Causing disturbance', 'Failure to comply with court orders', 'Breach of recognizance']
              },
              {
                title: 'Fraud & Dishonesty',
                items: ['Fraud under $5,000', 'Obtaining credit by false pretense', 'Uttering forged documents', 'False statements']
              },
              {
                title: 'Other Common Offences',
                items: ['Possession of cannabis (summary)', 'Failure to appear in court', 'Resisting arrest', 'Obstruction of justice']
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
                description: 'Expert analysis of Crown disclosure (evidence) to identify weaknesses, inconsistencies, and opportunities for defense.'
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
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Confidentiality & Privilege</h3>
                <p className="font-paragraph text-foreground/80 mb-4">
                  All communications between you and our paralegals are protected by solicitor-client privilege. We maintain strict confidentiality regarding your case and personal information.
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
            Don't face the criminal justice system alone. Our experienced paralegals are here to protect your rights and fight for the best possible outcome in your case.
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
