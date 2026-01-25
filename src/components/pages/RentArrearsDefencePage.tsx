import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, AlertTriangle, DollarSign, FileText, Home, Calendar, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RentArrearsDefencePage() {
  // SEO handled by AutoSEO component

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Home className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Landlord and Tenant Board</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Rent Arrears Defence & N4 Notice Help
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Received an N4 notice for unpaid rent? Don't panic. You have rights and options. We help tenants negotiate payment plans, challenge improper notices, and avoid eviction.
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

      {/* Understanding N4 */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Understanding the N4 Notice</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: FileText, title: 'What is an N4?', desc: 'A Notice to End your Tenancy Early for Non-payment of Rent. It\'s the first step in the eviction process but NOT an eviction order.' },
              { icon: Calendar, title: '14-Day Notice Period', desc: 'You have 14 days to pay the full amount owing. If you pay within this period, the N4 is void and you stay.' },
              { icon: AlertTriangle, title: 'L1 Application', desc: 'If you don\'t pay within 14 days, the landlord can file an L1 application with the LTB to get an eviction order.' },
              { icon: Clock, title: 'Hearing Takes Time', desc: 'Even after an L1 is filed, it takes weeks or months to get a hearing. You have time to prepare.' },
              { icon: Scale, title: 'You Can Dispute', desc: 'At the hearing, you can challenge the amounts claimed, raise maintenance issues, or request relief from eviction.' },
              { icon: DollarSign, title: 'Voiding the Order', desc: 'Even after an eviction order, you can often void it by paying everything owed before the Sheriff arrives.' },
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

      {/* Your Options */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Your Options When Facing Rent Arrears</h2>
            <div className="space-y-6">
              {[
                { title: 'Pay Within 14 Days', desc: 'If you can pay the full amount owing (rent + NSF fees if applicable), do so and get a receipt. The N4 becomes void automatically.', highlight: true },
                { title: 'Negotiate a Payment Plan', desc: 'Many landlords prefer a payment plan over the cost and delay of eviction. We can negotiate on your behalf to spread arrears over several months.' },
                { title: 'Apply for Rent Bank or Emergency Assistance', desc: 'Ontario has rent bank programs and emergency funds. We can help you identify and apply for financial assistance.' },
                { title: 'Challenge at the LTB Hearing', desc: 'Dispute incorrect amounts, raise maintenance issues as set-off, or request relief from eviction based on your circumstances.' },
                { title: 'Request a Repayment Plan from the LTB', desc: 'The Board can order a payment plan instead of eviction if you can demonstrate ability to pay over time.' },
              ].map((item, index) => (
                <div key={index} className={`p-6 rounded-xl ${item.highlight ? 'bg-green-50 border-2 border-green-200' : 'bg-white shadow-sm'}`}>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="font-paragraph text-foreground/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Defences */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Possible Defences to Eviction</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { title: 'Improper Notice', desc: 'N4 served incorrectly, wrong termination date, or incorrect amounts claimed' },
                { title: 'Rent Already Paid', desc: 'You have receipts or proof showing rent was paid but not credited' },
                { title: 'Maintenance Issues (Set-off)', desc: 'Landlord failed to maintain the unit - you may be entitled to rent abatement that offsets arrears' },
                { title: 'Illegal Rent Increase', desc: 'The rent claimed exceeds legal limits, making the "arrears" invalid' },
                { title: 'Harassment or Retaliation', desc: 'N4 was served in retaliation for complaints or exercising your rights' },
                { title: 'Relief from Eviction', desc: 'First-time arrears, medical emergency, job loss - the Board can refuse eviction in deserving cases' },
              ].map((item, index) => (
                <div key={index} className={`p-6 flex items-start gap-4 ${index !== 5 ? 'border-b border-gray-100' : ''}`}>
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
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

      {/* Timeline Warning */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <Clock className="w-10 h-10 text-amber-600 flex-shrink-0" />
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Critical Timelines</h2>
                <ul className="space-y-3">
                  {[
                    '14 days from N4 to pay and void the notice',
                    'L1 hearing typically scheduled 4-8 weeks after filing',
                    '11 days after eviction order to void it by paying in full',
                    'Sheriff enforcement usually 2-4 weeks after order becomes final',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/80">
                      <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>
                <p className="font-paragraph text-foreground/70 mt-4">
                  <strong>Don't wait until the last minute.</strong> The sooner you act, the more options you have.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">How We Help Tenants</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { step: '1', title: 'Review Your Notice', desc: 'We check if the N4 is valid, amounts are correct, and proper procedures were followed.' },
              { step: '2', title: 'Explore Your Options', desc: 'Payment plans, rent bank assistance, defences, or negotiated agreements.' },
              { step: '3', title: 'Negotiate with Landlord', desc: 'Often we can reach an agreement without needing a hearing.' },
              { step: '4', title: 'Represent at LTB', desc: 'If a hearing is necessary, we present your case and fight for relief from eviction.' },
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Don't Face Eviction Alone</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your N4 notice and discuss your options for staying in your home.
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
            Licensed by the Law Society of Ontario | Tenant representation at the Landlord and Tenant Board
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
