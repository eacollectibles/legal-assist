import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, CheckCircle, AlertTriangle, Car, DollarSign, Baby, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SeatbeltViolationsPage() {
  useEffect(() => {
    document.title = 'Seatbelt Ticket Defence | Child Restraint Violations Ontario | Paralegal | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Fight seatbelt and child restraint tickets in Ontario. $240+ fines and 2 demerit points. Paralegal defence for seatbelt violations. Free consultation London.');
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
              Seatbelt & Child Restraint Ticket Defence
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Seatbelt tickets carry significant fines and demerit points. Whether you were wearing it but the officer couldn't see, or there are other circumstances, we help you fight these charges.
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

      {/* Penalties */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Seatbelt Violation Penalties</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-amber-200">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">Driver Not Wearing Seatbelt</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-paragraph text-foreground/70">Set Fine</span>
                  <span className="font-heading font-bold text-foreground">$240</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-paragraph text-foreground/70">Total with Surcharges</span>
                  <span className="font-heading font-bold text-foreground">~$305</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-paragraph text-foreground/70">Demerit Points</span>
                  <span className="font-heading font-bold text-red-600">2</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-red-200">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">Child Not Properly Restrained</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-paragraph text-foreground/70">Set Fine</span>
                  <span className="font-heading font-bold text-foreground">$240</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-paragraph text-foreground/70">Total with Surcharges</span>
                  <span className="font-heading font-bold text-foreground">~$305</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-paragraph text-foreground/70">Demerit Points</span>
                  <span className="font-heading font-bold text-red-600">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Charges */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Types of Seatbelt Charges</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { section: 'HTA 106(2)', title: 'Driver - No Seatbelt', desc: 'Driver not wearing seatbelt assembly', points: '2' },
                { section: 'HTA 106(4)', title: 'Passenger - No Seatbelt', desc: 'Passenger 16+ years not wearing seatbelt (passenger gets ticket)', points: '0' },
                { section: 'HTA 106(4)', title: 'Passenger Under 16', desc: 'Driver responsible for passengers under 16 not belted', points: '2' },
                { section: 'HTA 106(6)', title: 'Child Restraint', desc: 'Child not in proper car seat or booster for age/weight', points: '2' },
                { section: 'HTA 106(6)', title: 'Improper Child Seat Use', desc: 'Car seat installed incorrectly or child not properly secured', points: '2' },
              ].map((item, index) => (
                <div key={index} className={`p-5 ${index !== 4 ? 'border-b border-gray-100' : ''}`}>
                  <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                    <div>
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded mr-2">{item.section}</span>
                      <h3 className="font-heading text-lg font-bold text-foreground inline">{item.title}</h3>
                    </div>
                    <span className="text-xs font-medium text-red-700 bg-red-50 px-2 py-1 rounded">{item.points} points</span>
                  </div>
                  <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Child Restraint Rules */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Child Restraint Requirements</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Baby, title: 'Rear-Facing Car Seat', desc: 'Required until child weighs at least 9 kg (20 lbs). Recommended until age 2 or limits of seat reached.', age: 'Birth - ~2 years' },
                { icon: Baby, title: 'Forward-Facing Car Seat', desc: 'Required until child weighs at least 18 kg (40 lbs). Use until child outgrows the seat.', age: '~2-4 years' },
                { icon: Users, title: 'Booster Seat', desc: 'Required until child is 145 cm (4\'9") tall, or at least 8 years old, and can pass the 5-step test.', age: '~4-8 years' },
                { icon: Car, title: 'Seatbelt Only', desc: 'When child passes the 5-step test: belt on shoulder, back against seat, knees bend at edge, feet on floor.', age: '8+ years' },
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <item.icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-heading text-lg font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="font-paragraph text-sm text-primary mb-2">{item.age}</p>
                  <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
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
                { title: 'You Were Wearing It', desc: 'The officer may not have been able to see your seatbelt due to clothing, angle, or tinted windows. We help you present evidence.' },
                { title: 'Medical Exemption', desc: 'Some medical conditions may exempt you from wearing a seatbelt. A certificate from a physician is required.' },
                { title: 'Vehicle Not Equipped', desc: 'Some older vehicles or specific seats may not have seatbelts. This can be a valid defence.' },
                { title: 'Working Vehicle Exemption', desc: 'Certain delivery drivers and workers have limited exemptions while actively making deliveries.' },
                { title: 'Child Seat Technicalities', desc: 'The law has specific requirements. If the seat meets safety standards but differs from officer\'s expectations, this can be challenged.' },
                { title: 'Emergency Circumstances', desc: 'Very limited, but emergency situations may provide a defence in rare cases.' },
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

      {/* Medical Exemption */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">Medical Exemption</h2>
            <p className="font-paragraph text-foreground/80 mb-6 text-center">
              You may be exempt from wearing a seatbelt if:
            </p>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <ul className="space-y-3">
                {[
                  'You have a medical condition that makes wearing a seatbelt dangerous',
                  'A physician has signed a certificate confirming the exemption',
                  'You carry the certificate while driving',
                  'The exemption is reviewed and renewed as required',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/80">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
              <p className="font-paragraph text-foreground/70 mt-4 text-sm">
                If you have a legitimate medical condition, we can help you obtain proper documentation and fight the ticket.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Fight */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Why Fight a Seatbelt Ticket?</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              { title: '$305+ Fine', desc: 'One of the more expensive set fines. Fighting it can save you significant money.' },
              { title: '2 Demerit Points', desc: 'Points add up. Combined with other tickets, you could face licence review.' },
              { title: 'Insurance Impact', desc: 'Seatbelt convictions can affect your insurance rates for years.' },
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Fight Your Seatbelt Ticket</h2>
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
