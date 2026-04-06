import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, AlertTriangle, Gauge, Car, DollarSign, Ban } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact';

export default function StreetRacingPage() {
  // SEO handled by AutoSEO component

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Gauge className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Traffic Ticket Defence</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Street Racing & Contest Charges
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Street racing charges carry severe penalties including licence suspension, vehicle seizure, and massive fines. We provide aggressive defence for these serious allegations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors">
                Free Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/5 transition-colors">
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Severe Penalties */}
      <section className="py-16 md:py-20 bg-red-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Street Racing Penalties Are Severe</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-red-200">
                <h3 className="font-heading text-xl font-bold text-red-700 mb-4">First Offence</h3>
                <ul className="space-y-3">
                  {[
                    'Fine: $2,000 - $10,000',
                    '6 demerit points',
                    '30-day licence suspension (roadside)',
                    '14-day vehicle impound (roadside)',
                    'Up to 6-month court suspension',
                    'Possible jail: up to 6 months',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/80">
                      <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-red-300">
                <h3 className="font-heading text-xl font-bold text-red-800 mb-4">Second+ Offence</h3>
                <ul className="space-y-3">
                  {[
                    'Fine: $2,000 - $10,000',
                    '6 demerit points',
                    '30-day licence suspension (roadside)',
                    '14-day vehicle impound (roadside)',
                    'Up to 10-year court suspension',
                    'Possible jail: up to 6 months',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/80">
                      <Ban className="w-4 h-4 text-red-700 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Counts as Racing */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What Counts as "Street Racing"?</h2>
          <div className="max-w-4xl mx-auto">
            <p className="font-paragraph text-lg text-foreground/80 mb-8 text-center">
              Under the Highway Traffic Act, "racing" or "contest" includes more than traditional races:
            </p>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { title: 'Racing Another Vehicle', desc: 'Competing with another vehicle to see who can go faster or reach a point first' },
                { title: 'Driving in a Contest', desc: 'Any competition involving speed, acceleration, or driving skill' },
                { title: 'Stunt Driving (50+ over)', desc: 'Driving 50 km/h or more over the speed limit is automatically classified under the same section' },
                { title: 'Chasing or Pursuit', desc: 'Pursuing or chasing another vehicle' },
                { title: 'Driving to Prevent Passing', desc: 'Driving to prevent another vehicle from passing you' },
                { title: 'Performing Stunts', desc: 'Burnouts, drifting, donuts, or other dangerous driving displays' },
              ].map((item, index) => (
                <div key={index} className={`p-6 flex items-start gap-4 ${index !== 5 ? 'border-b border-gray-100' : ''}`}>
                  <Gauge className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
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

      {/* Important Distinction */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">Racing vs. Stunt Driving</h2>
            <p className="font-paragraph text-foreground/80 mb-6 text-center">
              These charges are related but different. Understanding the distinction matters for your defence:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Street Racing</h3>
                <p className="font-paragraph text-foreground/70 text-sm">
                  Requires evidence you were competing with another vehicle or engaged in a contest. Proof of actual racing behavior needed.
                </p>
              </div>
              <div className="bg-white p-5 rounded-lg">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Stunt Driving (50+ Over)</h3>
                <p className="font-paragraph text-foreground/70 text-sm">
                  Automatic charge based solely on speed. No racing or contest needed—just exceeding the limit by 50 km/h triggers the charge.
                </p>
              </div>
            </div>
            <p className="font-paragraph text-foreground/70 text-center mt-6">
              <Link to="/services/stunt-driving-defence" className="text-primary hover:underline">Learn more about stunt driving defence →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Defence Strategies */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Defence Strategies</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { title: 'No Race Occurred', desc: 'Challenge whether any actual competition or contest took place. Driving near another vehicle isn\'t automatically racing.' },
              { title: 'Speed Device Accuracy', desc: 'Question the calibration and accuracy of radar, laser, or other speed measurement devices.' },
              { title: 'Identity Defence', desc: 'In some cases, challenge whether you were actually the driver or the vehicle involved.' },
              { title: 'Charter Rights', desc: 'Improper stop, detention, or search may violate your rights and lead to evidence exclusion.' },
              { title: 'Reduce to Lesser Charge', desc: 'Negotiate with prosecutors to reduce racing charges to careless driving or speeding with lighter penalties.' },
              { title: 'Challenge Officer Observations', desc: 'Cross-examine the officer on exactly what they saw and whether it proves racing.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadside vs Court */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">Roadside Penalties vs. Court Penalties</h2>
          <div className="max-w-3xl mx-auto">
            <p className="font-paragraph text-foreground/80 mb-6 text-center">
              Racing charges come with immediate roadside penalties PLUS potential court penalties:
            </p>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">Immediate Roadside Penalties (Cannot Be Fought)</h3>
              <ul className="space-y-2 mb-6">
                {[
                  '30-day licence suspension at roadside',
                  '14-day vehicle impound (you pay storage)',
                  'These apply even if you\'re later found not guilty',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/80">
                    <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">Court Penalties (Can Be Fought)</h3>
              <ul className="space-y-2">
                {[
                  'Fines of $2,000 - $10,000',
                  'Additional licence suspension (up to 2 years first offence)',
                  '6 demerit points',
                  'Possible jail time',
                  'Criminal record implications in some cases',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/80">
                    <Scale className="w-4 h-4 text-primary flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Facing Street Racing Charges?</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            These are serious charges that require immediate action. Free consultation to review your case and build your defence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-gray-100 transition-colors">
              Book Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-white/10 transition-colors">
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* LSO Badge */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <p className="font-paragraph text-sm text-foreground/60">
            <Shield className="w-4 h-4 inline mr-1" />
            Licensed by the Law Society of Ontario | Aggressive traffic ticket defence
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
