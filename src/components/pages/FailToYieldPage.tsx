import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, CheckCircle, AlertTriangle, Car, DollarSign, ArrowRightLeft, CircleDot } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FailToYieldPage() {
  useEffect(() => {
    document.title = 'Fail to Yield Ticket Defence | Right of Way Violations Ontario | Paralegal | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Fight fail to yield tickets in Ontario. Right of way violations at intersections, pedestrian crossings, and merging. 3 demerit points. Paralegal defence. Free consultation.');
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
              <ArrowRightLeft className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Traffic Ticket Defence</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Fail to Yield & Right of Way Defence
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Right of way rules can be confusing, and officers don't always get it right. We defend drivers charged with failing to yield at intersections, crosswalks, and when merging.
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

      {/* Types of Fail to Yield */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Types of Fail to Yield Charges</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { section: 'HTA 135(2)', title: 'Fail to Yield - Through Highway', points: '3', fine: '$85', desc: 'Not yielding when entering from a stop sign onto a through highway' },
                { section: 'HTA 135(3)', title: 'Fail to Yield - Yield Sign', points: '3', fine: '$85', desc: 'Not yielding to traffic when facing a yield sign' },
                { section: 'HTA 136(1)', title: 'Fail to Yield After Stopping', points: '3', fine: '$85', desc: 'Stopped at stop sign but proceeded when unsafe' },
                { section: 'HTA 139', title: 'Fail to Yield to Pedestrian', points: '3', fine: '$85', desc: 'Not yielding to pedestrians in crosswalk' },
                { section: 'HTA 141(5)', title: 'Fail to Yield - Left Turn', points: '3', fine: '$85', desc: 'Turning left without yielding to oncoming traffic' },
                { section: 'HTA 142(1)', title: 'Fail to Yield - Private Drive', points: '2', fine: '$85', desc: 'Entering highway from private road or driveway without yielding' },
                { section: 'HTA 154(1)', title: 'Fail to Yield - Emergency Vehicle', points: '3', fine: '$400+', desc: 'Not pulling over for emergency vehicles - very serious' },
              ].map((item, index) => (
                <div key={index} className={`p-5 ${index !== 6 ? 'border-b border-gray-100' : ''}`}>
                  <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                    <div>
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded mr-2">{item.section}</span>
                      <h3 className="font-heading text-lg font-bold text-foreground inline">{item.title}</h3>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded">{item.points} points</span>
                      <span className="text-xs font-medium text-red-700 bg-red-50 px-2 py-1 rounded">${item.fine}+</span>
                    </div>
                  </div>
                  <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Right of Way Rules */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Understanding Right of Way Rules</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { title: 'Uncontrolled Intersections', desc: 'Vehicle on the right has right of way. If you arrive at the same time, the vehicle on the right goes first.', icon: CircleDot },
              { title: 'Stop Signs', desc: 'First to stop, first to go. If simultaneous, vehicle on the right proceeds first.', icon: Shield },
              { title: 'Yield Signs', desc: 'You must slow or stop to let traffic on the main road pass before entering.', icon: ArrowRightLeft },
              { title: 'Left Turns', desc: 'You must yield to ALL oncoming traffic, including vehicles that appear far away.', icon: Car },
              { title: 'Pedestrian Crosswalks', desc: 'Pedestrians ALWAYS have right of way at marked crosswalks. You must stop, not just slow.', icon: CheckCircle },
              { title: 'Merging', desc: 'Traffic already on the highway has right of way. Merging vehicles must yield and find a safe gap.', icon: ArrowRight },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Defences */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Possible Defences</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { title: 'You Had Right of Way', desc: 'The officer may have misunderstood who should have yielded. We examine the facts to determine if you actually had right of way.' },
                { title: 'Other Driver\'s Actions', desc: 'The other vehicle may have been speeding, changing lanes suddenly, or otherwise acting unpredictably.' },
                { title: 'Obstructed View', desc: 'Parked vehicles, vegetation, or other obstructions prevented you from seeing oncoming traffic.' },
                { title: 'Signal Malfunction', desc: 'Traffic lights, pedestrian signals, or other traffic control devices were malfunctioning.' },
                { title: 'Emergency Circumstances', desc: 'You had to proceed due to medical emergency or other urgent circumstances.' },
                { title: 'No Collision Occurred', desc: 'If no collision or near-miss occurred, it may be harder to prove you failed to yield.' },
              ].map((item, index) => (
                <div key={index} className={`p-6 flex items-start gap-4 ${index !== 5 ? 'border-b border-gray-100' : ''}`}>
                  <Scale className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
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

      {/* Special: Emergency Vehicles */}
      <section className="py-16 md:py-20 bg-red-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">Fail to Yield to Emergency Vehicle</h2>
            <p className="font-paragraph text-foreground/80 mb-6 text-center">
              This is the most serious fail to yield charge, carrying:
            </p>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <ul className="space-y-3">
                {[
                  'Fine: $400 - $2,000 for first offence',
                  '3 demerit points',
                  'Possible licence suspension',
                  'Significant insurance impact',
                  'Community safety zone doubles fines',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/80">
                    <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <p className="font-paragraph text-foreground/70 mt-4 text-sm">
                If you're charged with this offence, contact us immediately. These charges can be defended, especially if you couldn't safely pull over or didn't hear/see the emergency vehicle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Fight */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Why Fight a Fail to Yield Ticket?</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              { title: 'Demerit Points', desc: '2-3 demerit points that accumulate toward suspension thresholds.' },
              { title: 'Insurance Impact', desc: 'Moving violations raise your premiums significantly for 3+ years.' },
              { title: 'Fault Implications', desc: 'In accidents, a fail to yield conviction can establish fault for civil claims.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Fight Your Fail to Yield Ticket</h2>
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
