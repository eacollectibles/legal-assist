import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, CheckCircle, AlertTriangle, Car, DollarSign, ArrowLeftRight, Eye } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function UnsafeLaneChangePage() {
  useEffect(() => {
    document.title = 'Unsafe Lane Change Ticket Defence | Improper Lane Change Ontario | Paralegal | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Fight unsafe lane change tickets in Ontario. Improper lane change charges carry 2 demerit points. Paralegal defence for lane change violations. Free consultation London.');
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
              <ArrowLeftRight className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Traffic Ticket Defence</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Unsafe Lane Change Defence
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Charged with an unsafe or improper lane change? These tickets are often based on an officer's subjective judgment. We challenge the evidence and fight to protect your driving record.
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

      {/* The Charge */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Lane Change Violations</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">HTA 142(1) - Unsafe Lane Change</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-paragraph text-foreground/70">Set Fine</span>
                  <span className="font-heading font-bold text-foreground">$85+</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-paragraph text-foreground/70">Total with Surcharges</span>
                  <span className="font-heading font-bold text-foreground">~$110</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-paragraph text-foreground/70">Demerit Points</span>
                  <span className="font-heading font-bold text-red-600">2</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-paragraph text-foreground/70">Insurance Impact</span>
                  <span className="font-heading font-bold text-amber-600">Minor Conviction</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">What the Law Requires</h3>
              <p className="font-paragraph text-foreground/70 mb-4">
                Under the Highway Traffic Act, before changing lanes you must:
              </p>
              <ul className="space-y-2">
                {[
                  'Signal your intention',
                  'Ensure the movement can be made safely',
                  'Check that no other vehicle would be affected',
                  'Give way to vehicles in the lane you\'re entering',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Common Situations */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Common Lane Change Ticket Situations</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { title: 'Cutting Off Another Vehicle', desc: 'Changing lanes and causing another driver to brake or swerve. But did they really have to? We examine the evidence.' },
              { title: 'No Signal', desc: 'Failing to signal before changing lanes. However, did the officer actually have a clear view of your signal?' },
              { title: 'Merge Lane Disputes', desc: 'Issues when highway lanes merge. Often there\'s confusion about who has right of way in zipper merges.' },
              { title: 'After an Accident', desc: 'Police often issue unsafe lane change tickets after collisions, but fault isn\'t always clear-cut.' },
              { title: 'Multiple Lane Changes', desc: 'Changing across multiple lanes at once. This is often alleged but not always accurately observed.' },
              { title: 'Construction Zones', desc: 'Lane changes in construction zones can lead to tickets, but poor signage may be a defence.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Defences */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Possible Defences</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { title: 'Lane Change Was Safe', desc: 'You did check, signal, and change safely. The officer\'s observation or interpretation was incorrect.' },
                { title: 'Other Driver\'s Speed', desc: 'The other vehicle was speeding or accelerating. You checked and it was safe, but they closed the gap quickly.' },
                { title: 'Officer\'s Limited View', desc: 'The officer wasn\'t positioned to clearly see whether you signalled or whether the lane change was unsafe.' },
                { title: 'Road Conditions Required It', desc: 'Debris, emergency vehicle, or other hazard required an immediate lane change to avoid danger.' },
                { title: 'Other Driver Changed Too', desc: 'Both vehicles were changing lanes simultaneously. Fault isn\'t necessarily yours.' },
                { title: 'No Collision or Near-Miss', desc: 'If traffic continued normally, proving the change was "unsafe" becomes more difficult.' },
              ].map((item, index) => (
                <div key={index} className={`p-6 flex items-start gap-4 ${index !== 5 ? 'border-b border-gray-100' : ''}`}>
                  <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
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

      {/* Collision Context */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">Unsafe Lane Change After a Collision</h2>
            <p className="font-paragraph text-foreground/80 mb-6 text-center">
              If you received this ticket after a collision, fighting it is especially important:
            </p>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <ul className="space-y-3">
                {[
                  'A conviction can be used against you in civil lawsuits',
                  'Insurance companies use convictions to assign fault',
                  'It can affect your ability to claim damages',
                  'The ticket was likely issued based on the outcome, not observation',
                  'Without dashcam footage, the officer is relying on statements',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/80">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-1" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">How We Fight Your Ticket</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { step: '1', title: 'Review the Details', desc: 'We examine the ticket, location, traffic conditions, and any available evidence.' },
              { step: '2', title: 'Request Disclosure', desc: 'We obtain the officer\'s notes, witness statements, and any dashcam footage.' },
              { step: '3', title: 'Identify Weaknesses', desc: 'We look for inconsistencies, lack of evidence, or procedural errors.' },
              { step: '4', title: 'Court Representation', desc: 'We appear on your behalf, cross-examine witnesses, and present your defence.' },
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Challenge Your Unsafe Lane Change Ticket</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your ticket and explain your defence options.
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
            Licensed by the Law Society of Ontario | Traffic ticket defence across Ontario
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
