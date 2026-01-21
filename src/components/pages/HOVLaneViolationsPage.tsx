import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, AlertTriangle, Car, Users, DollarSign, Camera } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HOVLaneViolationsPage() {
  useEffect(() => {
    document.title = 'HOV Lane Ticket Defence | High Occupancy Vehicle Violations Ontario | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Fight HOV lane tickets in Ontario. $110+ fines and 3 demerit points for improper HOV use. Paralegal defence for Highway 403, QEW, 404, and 400-series highways. Free consultation.');
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
              HOV Lane Ticket Defence
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Caught in the HOV lane without enough passengers? These tickets carry hefty fines and demerit points. We help drivers fight improper HOV charges and protect their driving records.
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">HOV Lane Violation Penalties</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <DollarSign className="w-10 h-10 text-red-600 mx-auto mb-2" />
                  <p className="font-heading text-3xl font-bold text-red-700">$110+</p>
                  <p className="font-paragraph text-red-700">Set Fine</p>
                </div>
                <div>
                  <AlertTriangle className="w-10 h-10 text-red-600 mx-auto mb-2" />
                  <p className="font-heading text-3xl font-bold text-red-700">3</p>
                  <p className="font-paragraph text-red-700">Demerit Points</p>
                </div>
                <div>
                  <Scale className="w-10 h-10 text-red-600 mx-auto mb-2" />
                  <p className="font-heading text-3xl font-bold text-red-700">$500+</p>
                  <p className="font-paragraph text-red-700">Insurance Impact</p>
                </div>
              </div>
            </div>
            <p className="font-paragraph text-foreground/70 text-center">
              With victim fine surcharges and court costs, the total fine often exceeds $150. The 3 demerit points and insurance increase make fighting worthwhile.
            </p>
          </div>
        </div>
      </section>

      {/* HOV Rules */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Ontario HOV Lane Rules</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">Who Can Use HOV Lanes?</h3>
              <ul className="space-y-3">
                {[
                  'Vehicles with 2+ occupants (driver + at least one passenger)',
                  'Buses and public transit vehicles',
                  'Green licence plate vehicles (electric/hydrogen) - ANY number of occupants',
                  'Motorcycles',
                  'Emergency vehicles',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/80">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">HOV Operating Hours</h3>
              <p className="font-paragraph text-foreground/70 mb-4">
                Most Ontario HOV lanes operate during peak hours only:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-heading font-bold text-foreground">Morning Rush</p>
                  <p className="font-paragraph text-foreground/70">6:30 AM - 9:30 AM</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-heading font-bold text-foreground">Afternoon Rush</p>
                  <p className="font-paragraph text-foreground/70">3:00 PM - 7:00 PM</p>
                </div>
              </div>
              <p className="font-paragraph text-foreground/70 mt-4 text-sm">
                Note: Some HOV lanes (like parts of Hwy 404) operate 24/7. Always check signage.
              </p>
            </div>
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
                { title: 'Passenger Not Visible', desc: 'Small children in car seats, passengers lying down, or tinted windows can make passengers hard to see.' },
                { title: 'Outside Operating Hours', desc: 'If you were ticketed outside HOV hours, the charge may be invalid.' },
                { title: 'Green Plate Exemption', desc: 'Electric and hydrogen vehicles with green plates can use HOV lanes with any number of occupants.' },
                { title: 'Emergency Situation', desc: 'Medical emergencies or other urgent circumstances may provide a defence.' },
                { title: 'Improper Signage', desc: 'If HOV lane signage was missing, obscured, or confusing, this can be challenged.' },
                { title: 'Officer Error', desc: 'Mistakes in the ticket, wrong location, or procedural errors can invalidate the charge.' },
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

      {/* Where HOV Lanes Exist */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">Ontario Highways with HOV Lanes</h2>
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-4">
            {[
              'Highway 403 (Mississauga)',
              'Highway 404 (Toronto/York Region)',
              'Queen Elizabeth Way (QEW)',
              'Highway 417 (Ottawa)',
              'Don Valley Parkway',
              'Gardiner Expressway',
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                <Car className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-paragraph text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">How We Fight Your HOV Ticket</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { step: '1', title: 'Review Your Ticket', desc: 'We examine the details, location, time, and circumstances of your charge.' },
              { step: '2', title: 'Identify Defences', desc: 'Based on the facts, we determine the strongest defence strategy.' },
              { step: '3', title: 'Request Disclosure', desc: 'We obtain the officer\'s notes and evidence to find weaknesses in the prosecution\'s case.' },
              { step: '4', title: 'Court Representation', desc: 'We appear on your behalf, present your defence, and negotiate the best outcome.' },
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Don't Just Pay That HOV Ticket</h2>
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
