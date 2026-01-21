import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, CheckCircle, AlertTriangle, Car, DollarSign, Clock, Eye } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FollowingTooCloselyPage() {
  useEffect(() => {
    document.title = 'Following Too Closely Ticket | Tailgating Defence Ontario | Paralegal | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Fight following too closely (tailgating) tickets in Ontario. 4 demerit points and fines. Paralegal defence for HTA 158 charges. Free consultation London.');
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
              <Car className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Traffic Ticket Defence</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Following Too Closely Defence
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Tailgating tickets carry significant demerit points and can seriously impact your insurance. These charges are often subjective—we challenge the officer's judgment and fight to protect your record.
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Following Too Closely Penalties</h2>
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
                  <p className="font-heading text-3xl font-bold text-red-700">4</p>
                  <p className="font-paragraph text-red-700">Demerit Points</p>
                </div>
                <div>
                  <Scale className="w-10 h-10 text-red-600 mx-auto mb-2" />
                  <p className="font-heading text-3xl font-bold text-red-700">Major</p>
                  <p className="font-paragraph text-red-700">Insurance Impact</p>
                </div>
              </div>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="font-paragraph text-amber-800 text-center">
                <strong>Note:</strong> With 4 demerit points, this is one of the higher-point traffic offences. Two of these convictions puts you near interview threshold (9 points).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Law */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What the Law Says</h2>
            <div className="bg-white rounded-xl shadow-sm p-8">
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                Section 158(1) of the Highway Traffic Act states:
              </p>
              <blockquote className="border-l-4 border-primary pl-4 italic font-paragraph text-foreground/80 mb-6">
                "The driver of a motor vehicle... shall not follow another vehicle more closely than is reasonable and prudent having due regard for the speed of such vehicles and the traffic upon and the conditions of the highway."
              </blockquote>
              <p className="font-paragraph text-foreground/70">
                The key phrase is <strong>"reasonable and prudent"</strong>—this is subjective and depends on circumstances. There's no fixed distance in the law, which is both a challenge and an opportunity for defence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Considered Safe */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What's a "Safe" Following Distance?</h2>
          <div className="max-w-4xl mx-auto">
            <p className="font-paragraph text-foreground/80 mb-8 text-center">
              While the law doesn't specify, these are common guidelines that officers and courts consider:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { rule: '2-Second Rule', desc: 'Minimum: 2 seconds behind the car ahead in good conditions', icon: Clock },
                { rule: '3-Second Rule', desc: 'Recommended in normal driving conditions for safety margin', icon: Clock },
                { rule: '4+ Seconds', desc: 'Required in poor weather, at night, or when following large vehicles', icon: Clock },
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
                  <item.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.rule}</h3>
                  <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="font-paragraph text-foreground/70 text-center mt-6 text-sm">
              But remember: these are guidelines, not law. Whether you were "too close" is always a judgment call.
            </p>
          </div>
        </div>
      </section>

      {/* Defences */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Possible Defences</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { title: 'Distance Was Reasonable', desc: 'Given the speed, conditions, and traffic, your following distance was actually safe and appropriate.' },
                { title: 'Momentary Situation', desc: 'Another vehicle cut in front of you or braked suddenly, creating a temporary close following situation.' },
                { title: 'Officer\'s Vantage Point', desc: 'The officer couldn\'t accurately judge the distance from their position. Angles can be deceiving.' },
                { title: 'Speed Differential', desc: 'You were actually slowing down to create more space when the officer observed you.' },
                { title: 'Traffic Conditions', desc: 'Heavy traffic requires closer following. You were maintaining pace with surrounding vehicles.' },
                { title: 'No Measurement Taken', desc: 'The officer relied on visual estimate only. Without actual measurement, the charge is purely subjective.' },
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

      {/* After Collision */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">Rear-End Collision? Don't Assume Fault</h2>
            <p className="font-paragraph text-foreground/80 mb-6 text-center">
              If you rear-ended someone and got this ticket, fighting it is crucial:
            </p>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <ul className="space-y-3">
                {[
                  'A conviction establishes fault for insurance purposes',
                  'It can be used against you in civil lawsuits',
                  'The lead vehicle may have been at fault (brake checking, sudden stop)',
                  'Road conditions or visibility may have contributed',
                  'You may have valid defences even after a collision',
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

      {/* Why Fight */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Why Fight a Following Too Closely Ticket?</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { title: '4 Demerit Points', desc: 'This is a high-point offence. Combined with other tickets, you could face licence review.' },
              { title: 'Major Insurance Impact', desc: 'Classified as a major conviction by many insurers, leading to significant premium increases.' },
              { title: 'Fault Implications', desc: 'In collision cases, the conviction can establish fault and affect claims.' },
              { title: 'Subjective Charge', desc: 'There\'s no objective measurement—it\'s based on officer opinion and can be challenged.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Fight Your Tailgating Ticket</h2>
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
