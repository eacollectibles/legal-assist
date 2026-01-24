import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, Home, FileText, DollarSign, Hammer, AlertTriangle, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomeImprovementDisputesPage() {
  useEffect(() => {
    document.title = 'Contractor & Home Renovation Disputes | Small Claims Court Ontario | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Paralegal for contractor disputes in Ontario Small Claims Court. Bad renovations, incomplete work, contractor fraud. Recover up to $50,000. Free consultation London.');
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
              <Hammer className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Small Claims Court Services</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Contractor & Home Renovation Disputes
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Bad contractor? Incomplete renovation? Shoddy workmanship? Pursue compensation in Small Claims Court for home improvement disputes up to $50,000.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors">
                Free Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:5196011110" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/5 transition-colors">
                Call (519) 601-1110
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Common Disputes */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Common Contractor Disputes We Handle</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: AlertTriangle, title: 'Abandoned Projects', desc: 'Contractor took your deposit and disappeared, or stopped work mid-project without completing the job.' },
              { icon: Hammer, title: 'Defective Workmanship', desc: 'Poor quality work that doesn\'t meet building codes, industry standards, or contract specifications.' },
              { icon: Clock, title: 'Excessive Delays', desc: 'Project significantly delayed beyond agreed timeline causing you financial loss or inconvenience.' },
              { icon: DollarSign, title: 'Cost Overruns', desc: 'Final bill far exceeds the quote without valid justification or proper change order documentation.' },
              { icon: FileText, title: 'Contract Breaches', desc: 'Contractor failed to deliver what was promised in the written agreement or didn\'t follow specs.' },
              { icon: Home, title: 'Property Damage', desc: 'Contractor or their workers damaged your home, belongings, or neighbouring property during work.' },
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

      {/* What You Can Recover */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What Compensation Can You Recover?</h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { title: 'Deposit Recovery', desc: 'Get back deposits paid for work never started or completed' },
                { title: 'Cost to Complete', desc: 'Funds to hire another contractor to finish the abandoned project' },
                { title: 'Repair Costs', desc: 'Cost to fix defective or substandard work' },
                { title: 'Material Costs', desc: 'Reimbursement for materials paid for but not delivered or used' },
                { title: 'Additional Expenses', desc: 'Hotel stays, storage, rental equipment during extended delays' },
                { title: 'Lost Rental Income', desc: 'If renovation delays prevented you from renting the property' },
              ].map((item, index) => (
                <div key={index} className={`p-6 flex items-start gap-4 ${index !== 5 ? 'border-b border-gray-100' : ''}`}>
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
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

      {/* Building Your Case */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Evidence We'll Gather for Your Case</h2>
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Written contract or agreement',
                'Payment receipts and invoices',
                'Photos of defective work',
                'Text messages and emails',
                'Building inspector reports',
                'Quotes from other contractors',
                'Permits and inspection records',
                'Witness statements',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                  <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="font-paragraph text-foreground">{item}</span>
                </div>
              ))}
            </div>
            <p className="font-paragraph text-foreground/70 text-center mt-8">
              Don't have all of this? That's okay. We'll help you gather what you need and work with what you have.
            </p>
          </div>
        </div>
      </section>

      {/* Case Against Unlicensed Contractors */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <Shield className="w-10 h-10 text-amber-600 flex-shrink-0" />
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Unlicensed Contractors? You Still Have Rights</h2>
                <p className="font-paragraph text-foreground/80 mb-4">
                  In Ontario, most home renovation contractors don't require a license (except for specific trades like electricians and plumbers). However, even if your contractor was unlicensed, you can still sue them for:
                </p>
                <ul className="space-y-2">
                  {['Breach of contract', 'Negligent work', 'Consumer Protection Act violations', 'Fraud or misrepresentation'].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/80">
                      <CheckCircle className="w-5 h-5 text-green-600" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">How We Handle Your Contractor Dispute</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { step: '1', title: 'Case Review', desc: 'We review your contract, communications, photos, and calculate your total damages.' },
              { step: '2', title: 'Demand Letter', desc: 'Formal letter to the contractor demanding payment. Many disputes settle at this stage.' },
              { step: '3', title: 'File Claim', desc: 'If no response, we file your Plaintiff\'s Claim in Small Claims Court.' },
              { step: '4', title: 'Court Representation', desc: 'We represent you at settlement conference and trial if needed.' },
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Bad Contractor? Fight Back</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your renovation dispute and discuss your options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-gray-100 transition-colors">
              Book Free Consultation <ArrowRight className="w-5 h-5" />
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
            Licensed by the Law Society of Ontario | Paralegal services for claims up to $50,000
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
