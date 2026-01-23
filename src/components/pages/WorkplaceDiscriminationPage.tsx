import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Phone, Briefcase, AlertCircle, CheckCircle, Clock, Users, Scale, Shield, FileText } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function WorkplaceDiscriminationPage() {
  useEffect(() => {
    document.title = 'Workplace Discrimination Claims | Human Rights Tribunal Ontario | London Paralegal';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'File a workplace discrimination complaint with the Human Rights Tribunal of Ontario. Licensed paralegal represents employees facing discrimination based on race, disability, gender, age, and more. Free consultation.');
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
              <Briefcase className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Human Rights Tribunal • Employment</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Workplace Discrimination Claims in Ontario</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Every employee deserves a workplace free from discrimination. If you've been treated unfairly because of who you are, the Human Rights Tribunal of Ontario can help — and so can we.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Find out where you stand <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5"><Phone className="w-5 h-5" /> (519) 601-1127</a>
            </div>
          </div>
        </div>
      </section>

      {/* Protected Grounds */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Protected Grounds Under the Ontario Human Rights Code</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">It's illegal for employers to discriminate based on these characteristics:</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              'Race', 'Colour', 'Ancestry', 'Place of Origin', 'Ethnic Origin', 'Citizenship',
              'Creed (Religion)', 'Sex', 'Sexual Orientation', 'Gender Identity', 'Gender Expression',
              'Age', 'Marital Status', 'Family Status', 'Disability', 'Record of Offences'
            ].map((ground) => (
              <div key={ground} className="bg-pastelbeige/20 rounded-lg py-3 px-4 text-center border border-pastelbeige">
                <span className="font-paragraph text-sm text-foreground font-medium">{ground}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Discrimination */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Common Types of Workplace Discrimination</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              { title: 'Hiring Discrimination', desc: 'Not being hired or interviewed because of your race, gender, age, disability, or other protected characteristic.' },
              { title: 'Unequal Pay', desc: 'Being paid less than colleagues for the same work because of your gender, race, or other protected ground.' },
              { title: 'Denied Promotions', desc: 'Being passed over for advancement despite qualifications because of discrimination.' },
              { title: 'Harassment', desc: 'Offensive comments, jokes, or conduct related to a protected ground that creates a hostile work environment.' },
              { title: 'Wrongful Termination', desc: 'Being fired or forced to resign because of a protected characteristic (e.g., pregnancy, disability, age).' },
              { title: 'Failure to Accommodate', desc: 'Employer refusing to provide reasonable accommodations for disability, religion, or family status.' },
              { title: 'Poisoned Work Environment', desc: 'Ongoing discrimination that makes the workplace intolerable, even if not directed specifically at you.' },
              { title: 'Retaliation', desc: 'Punishment for reporting discrimination or participating in a human rights complaint.' },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-pastelbeige shadow-sm">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disability Accommodation */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Disability Accommodation in the Workplace</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">Employers have a duty to accommodate disabilities to the point of "undue hardship." This is one of the most common HRTO claims.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="font-heading text-xl font-bold text-green-800 mb-4 flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Employer Must Consider</h3>
              <ul className="space-y-2 font-paragraph text-green-900">
                <li>• Modified work duties</li>
                <li>• Flexible hours or schedules</li>
                <li>• Work from home arrangements</li>
                <li>• Physical workspace modifications</li>
                <li>• Assistive technology</li>
                <li>• Medical leave for treatment</li>
                <li>• Gradual return to work plans</li>
              </ul>
            </div>
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-4 flex items-center gap-2"><AlertCircle className="w-5 h-5" /> Signs of Failure to Accommodate</h3>
              <ul className="space-y-2 font-paragraph text-red-900">
                <li>• Refusing to discuss accommodations</li>
                <li>• Demanding unnecessary medical info</li>
                <li>• Offering only one "take it or leave it" option</li>
                <li>• Punishing you for accommodation requests</li>
                <li>• Termination after disability disclosure</li>
                <li>• Ignoring doctor's recommendations</li>
                <li>• Not following up or implementing plans</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HRTO Process */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">The HRTO Complaint Process</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                { step: '1', title: 'File Application (within 1 year)', desc: 'We prepare and file your Application with the Human Rights Tribunal of Ontario, clearly outlining the discrimination and remedies sought.' },
                { step: '2', title: 'Response from Employer', desc: 'The employer has 35 days to respond to your allegations. We review their response and advise on strategy.' },
                { step: '3', title: 'Mediation', desc: 'Most cases go to voluntary mediation first. Many settle here — we negotiate aggressively for fair compensation.' },
                { step: '4', title: 'Hearing (if needed)', desc: 'If no settlement, we present your case before an HRTO adjudicator. You testify, present evidence, and we cross-examine witnesses.' },
                { step: '5', title: 'Decision & Remedies', desc: 'If successful, the Tribunal can order monetary compensation, reinstatement, policy changes, and public interest remedies.' },
              ].map((item, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading font-bold text-xl flex-shrink-0">{item.step}</div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="font-paragraph text-foreground/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Remedies */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">What Can You Recover?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Scale, title: 'General Damages', desc: 'Compensation for injury to dignity, feelings, and self-respect. Awards typically range from $5,000 to $50,000+.' },
              { icon: Briefcase, title: 'Lost Wages', desc: 'If you lost your job or income due to discrimination, you can recover past and future lost earnings.' },
              { icon: Shield, title: 'Public Interest Remedies', desc: 'Orders requiring the employer to change policies, provide training, or post the decision publicly.' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-pastelbeige">
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:text-primary">How long do I have to file a complaint?</AccordionTrigger>
                <AccordionContent className="font-paragraph text-foreground/70">You must file within one year of the last incident of discrimination. Don't wait — evidence fades and witnesses forget. The sooner you contact us, the better we can preserve your case.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b border-pastelbeige">
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:text-primary">Can I file a complaint if I still work there?</AccordionTrigger>
                <AccordionContent className="font-paragraph text-foreground/70">Yes. Retaliation for filing a human rights complaint is itself a violation of the Code. Many employees file while still employed. We can discuss strategies to protect your position and whether to attempt internal resolution first.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b border-pastelbeige">
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:text-primary">What if I was fired? Should I sue for wrongful dismissal instead?</AccordionTrigger>
                <AccordionContent className="font-paragraph text-foreground/70">You may be able to do both. Wrongful dismissal (civil court) focuses on notice/severance pay. Human rights (HRTO) focuses on discrimination compensation. These are different remedies and can sometimes be pursued together. We'll advise on the best strategy for your situation.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-b border-pastelbeige">
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:text-primary">Do I need evidence of discrimination?</AccordionTrigger>
                <AccordionContent className="font-paragraph text-foreground/70">You don't need a "smoking gun." Circumstantial evidence matters: timing, patterns of treatment, comparisons with how others were treated. We help you identify and organize evidence. Your testimony alone can be sufficient if credible.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border-b border-pastelbeige">
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:text-primary">How much does it cost to file an HRTO complaint?</AccordionTrigger>
                <AccordionContent className="font-paragraph text-foreground/70">There is no filing fee to submit an Application to the HRTO. Paralegal fees are significantly less than lawyers. We offer free consultations and can discuss payment arrangements. If you win, you may also recover some legal costs.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">You Don't Have to Accept Discrimination</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">Free confidential consultation. Tell us what happened — we'll tell you if you have a case and what to expect.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Find out where you stand <ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary-foreground/10"><Phone className="w-5 h-5" /> (519) 601-1127</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
