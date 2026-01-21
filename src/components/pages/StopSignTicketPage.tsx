import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, CheckCircle, AlertTriangle, Octagon, DollarSign, Eye, Camera } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact';

export default function StopSignTicketPage() {
  useEffect(() => {
    document.title = 'Stop Sign Ticket Defence | Fail to Stop Ontario | Traffic Paralegal | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Fight stop sign tickets in Ontario. Fail to stop charges carry 3 demerit points and fines. Paralegal defence for rolling stops, blocked signs, and improper charges. Free consultation.');
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
              <Octagon className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Traffic Ticket Defence</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Stop Sign Ticket Defence
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Charged with failing to stop at a stop sign? Whether it was a "rolling stop" or you believe you did stop, we help drivers fight these tickets and protect their records.
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

      {/* The Penalties */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Stop Sign Violation Penalties</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <DollarSign className="w-10 h-10 text-red-600 mx-auto mb-2" />
                  <p className="font-heading text-3xl font-bold text-red-700">$85+</p>
                  <p className="font-paragraph text-red-700">Set Fine</p>
                </div>
                <div>
                  <AlertTriangle className="w-10 h-10 text-red-600 mx-auto mb-2" />
                  <p className="font-heading text-3xl font-bold text-red-700">3</p>
                  <p className="font-paragraph text-red-700">Demerit Points</p>
                </div>
                <div>
                  <Scale className="w-10 h-10 text-red-600 mx-auto mb-2" />
                  <p className="font-heading text-3xl font-bold text-red-700">$400+</p>
                  <p className="font-paragraph text-red-700">Insurance Impact/Year</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Law */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What the Law Requires</h2>
            <div className="bg-white rounded-xl shadow-sm p-8">
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                Under Section 136(1) of the Highway Traffic Act, when approaching a stop sign, you must:
              </p>
              <ol className="space-y-4">
                {[
                  'Come to a complete stop - your wheels must stop moving entirely',
                  'Stop at the stop line, or if none, at the crosswalk',
                  'If no stop line or crosswalk, stop at the edge of the roadway',
                  'Yield the right-of-way to traffic in the intersection',
                  'Proceed only when safe to do so',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 font-paragraph text-foreground/80">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">{index + 1}</span>
                    {item}
                  </li>
                ))}
              </ol>
              <div className="bg-amber-50 p-4 rounded-lg mt-6">
                <p className="font-paragraph text-amber-800">
                  <strong>Key point:</strong> A "rolling stop" or "California stop" where your wheels slow but never fully stop is technically a violation, even if you yielded properly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Defences */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Possible Defences</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { icon: Eye, title: 'Officer\'s View Obstructed', desc: 'If the officer couldn\'t clearly see your wheels from their vantage point, their observation may be unreliable.' },
              { icon: Octagon, title: 'Sign Not Visible', desc: 'Overgrown vegetation, damage, or poor placement that made the stop sign difficult to see.' },
              { icon: Camera, title: 'No Dashcam Evidence', desc: 'Without video, it\'s your word against the officer\'s. We can challenge the reliability of their observation.' },
              { icon: AlertTriangle, title: 'Emergency Circumstances', desc: 'Medical emergency or safety concerns that required immediate action.' },
              { icon: Scale, title: 'Procedural Errors', desc: 'Mistakes on the ticket, wrong location, or improper service can invalidate the charge.' },
              { icon: Shield, title: 'You Did Stop', desc: 'If you genuinely stopped completely, we help you present evidence and testimony to prove it.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Charges */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">Related Stop Sign Charges We Defend</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { charge: 'Fail to stop at stop sign', section: 'HTA 136(1)(a)', points: '3 demerit points' },
                { charge: 'Stop - Loss of Clear View', section: 'HTA 136(1)(b)', points: '3 demerit points' },
                { charge: 'Fail to yield after stopping', section: 'HTA 136(1)', points: '3 demerit points' },
                { charge: 'Fail to stop - school crossing', section: 'HTA 136', points: '3 demerit points' },
                { charge: 'Disobey stop sign - private road', section: 'HTA 136', points: '3 demerit points' },
              ].map((item, index) => (
                <div key={index} className={`p-4 flex justify-between items-center ${index !== 4 ? 'border-b border-gray-100' : ''}`}>
                  <div>
                    <p className="font-paragraph font-medium text-foreground">{item.charge}</p>
                    <p className="font-paragraph text-sm text-foreground/60">{item.section}</p>
                  </div>
                  <span className="text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded">{item.points}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Fight */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">Why Fight a Stop Sign Ticket?</h2>
            <p className="font-paragraph text-foreground/80 mb-6">
              Many people think stop sign tickets are minor and just pay them. But consider:
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                { title: '3 Demerit Points', desc: 'These add up fast. At 9 points, you face an interview. At 15, licence suspension.' },
                { title: 'Insurance Increase', desc: 'A minor conviction can raise your premiums by $300-500 per year for 3+ years.' },
                { title: 'Permanent Record', desc: 'The conviction stays on your abstract for 3 years, visible to employers and insurers.' },
              ].map((item, index) => (
                <div key={index} className="bg-white p-5 rounded-lg">
                  <h3 className="font-heading font-bold text-foreground mb-2">{item.title}</h3>
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Don't Let a Stop Sign Ticket Stop Your Record</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your ticket and discuss your defence options.
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
