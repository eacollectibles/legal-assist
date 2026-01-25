import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, AlertTriangle, ShoppingBag, FileText, Gavel, Ban } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TheftUnderPage() {
  useEffect(() => {
    document.title = 'Theft Under $5000 Defence | Shoplifting Charges Ontario | Paralegal | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Charged with theft under $5000 or shoplifting in Ontario? We defend minor theft charges. Avoid a criminal record. Paralegal representation London. Free consultation.');
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
              <Gavel className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Criminal Defence</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Theft Under $5,000 Defence
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              A theft charge—even for a small amount—can result in a criminal record that affects your employment, travel, and future. We help people facing shoplifting and minor theft charges protect their records.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors">
                Free Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:3658829515" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/5 transition-colors">
                Call 365-882-9515
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What's at Stake */}
      <section className="py-16 md:py-20 bg-red-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What's at Stake</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                Theft under $5,000 is a criminal offence under section 334(b) of the Criminal Code. Even though it's considered a "minor" theft, a conviction carries serious consequences:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: Ban, title: 'Criminal Record', desc: 'A permanent criminal record that shows up on background checks' },
                  { icon: ShoppingBag, title: 'Employment Impact', desc: 'Many employers won\'t hire someone with a theft conviction' },
                  { icon: AlertTriangle, title: 'Travel Restrictions', desc: 'May be denied entry to the US and other countries' },
                  { icon: Scale, title: 'Up to 2 Years Jail', desc: 'Maximum penalty of 2 years less a day in jail' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <item.icon className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-heading font-bold text-foreground">{item.title}</h3>
                      <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Theft Cases */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Types of Cases We Handle</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { title: 'Shoplifting', desc: 'Taking merchandise from retail stores without paying—the most common theft charge.' },
              { title: 'Retail Fraud', desc: 'Price tag switching, under-ringing, or using fraudulent returns.' },
              { title: 'Employee Theft', desc: 'Taking money, merchandise, or supplies from your workplace.' },
              { title: 'Theft from Vehicles', desc: 'Taking items from cars, even if the car was unlocked.' },
              { title: 'Theft of Services', desc: 'Using services without paying—gas and dash, dining and dashing.' },
              { title: 'Possession of Stolen Property', desc: 'Having items you knew or should have known were stolen.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Possible Outcomes */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Possible Outcomes</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { outcome: 'Charges Withdrawn', desc: 'The best outcome—charges are dropped completely. No record, no conviction.', color: 'green' },
                { outcome: 'Diversion Program', desc: 'Complete a program and charges are withdrawn. Available for first-time offenders.', color: 'green' },
                { outcome: 'Peace Bond', desc: 'Charges withdrawn in exchange for agreeing to conditions for a period. No criminal record.', color: 'amber' },
                { outcome: 'Absolute/Conditional Discharge', desc: 'Found guilty but no conviction registered. Discharge is removed from record after 1-3 years.', color: 'amber' },
                { outcome: 'Suspended Sentence', desc: 'Conviction but no jail time. Probation conditions apply. Results in criminal record.', color: 'red' },
                { outcome: 'Fine or Jail', desc: 'Conviction with fine and/or jail time. Permanent criminal record.', color: 'red' },
              ].map((item, index) => (
                <div key={index} className={`p-5 flex items-start gap-4 ${index !== 5 ? 'border-b border-gray-100' : ''}`}>
                  <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${item.color === 'green' ? 'bg-green-500' : item.color === 'amber' ? 'bg-amber-500' : 'bg-red-500'}`} />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">{item.outcome}</h3>
                    <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Defence Strategies */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Defence Strategies</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { title: 'Mistaken Identity', desc: 'You weren\'t the person who committed the theft. Surveillance footage may be unclear.' },
              { title: 'No Intent to Steal', desc: 'You forgot to pay, were distracted, or made an honest mistake.' },
              { title: 'Colour of Right', desc: 'You genuinely believed you had a right to the property.' },
              { title: 'Charter Violations', desc: 'Your rights were violated during detention, search, or questioning.' },
              { title: 'Insufficient Evidence', desc: 'The prosecution can\'t prove all elements of the offence beyond reasonable doubt.' },
              { title: 'Negotiate Diversion', desc: 'Even if guilty, we can often negotiate diversion to avoid a criminal record.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* First Time Offenders */}
      <section className="py-16 md:py-20 bg-green-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">First-Time Offenders</h2>
            <p className="font-paragraph text-foreground/80 mb-6">
              If this is your first offence, you have excellent chances of avoiding a criminal record through:
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              {[
                { program: 'Direct Accountability Program', desc: 'Complete community service and the charge is withdrawn' },
                { program: 'Mental Health Diversion', desc: 'If mental health was a factor, treatment-focused diversion' },
                { program: 'Addiction Diversion', desc: 'If addiction contributed, treatment instead of prosecution' },
                { program: 'Negotiated Resolution', desc: 'We negotiate with the Crown for withdrawal or discharge' },
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg">
                  <h3 className="font-heading font-bold text-foreground text-sm">{item.program}</h3>
                  <p className="font-paragraph text-foreground/70 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">How We Help</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { step: '1', title: 'Review Your Case', desc: 'We examine the evidence, circumstances, and your background to build a defence strategy.' },
              { step: '2', title: 'Obtain Disclosure', desc: 'We get all evidence the Crown has—video, statements, reports—and analyze it for weaknesses.' },
              { step: '3', title: 'Explore Diversion', desc: 'For eligible clients, we pursue diversion programs that result in charges being withdrawn.' },
              { step: '4', title: 'Court Representation', desc: 'We appear on your behalf, negotiate with the Crown, and advocate for the best outcome.' },
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

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Protect Your Future</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            A theft charge doesn't have to mean a criminal record. Free consultation to review your case.
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
            Licensed by the Law Society of Ontario | Summary conviction defence
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
