import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, AlertTriangle, Truck, FileText, DollarSign, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CommercialVehicleViolationsPage() {
  useEffect(() => {
    document.title = 'Commercial Vehicle Violations | CVOR Defence | Truck Ticket Paralegal Ontario | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Commercial vehicle ticket defence in Ontario. CVOR points, truck driver violations, logbook offences, and carrier safety ratings. Paralegal help for commercial drivers. Free consultation.');
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
              <Truck className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Traffic Ticket Defence</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Commercial Vehicle & CVOR Violations
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Commercial vehicle tickets affect more than just your licence—they impact your CVOR, your carrier's safety rating, and your livelihood. We defend truck drivers, owner-operators, and fleet carriers across Ontario.
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

      {/* Understanding CVOR */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Understanding the CVOR System</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: FileText, title: 'What is CVOR?', desc: 'Commercial Vehicle Operator\'s Registration tracks the safety record of commercial carriers operating in Ontario. Every violation adds points.' },
              { icon: AlertCircle, title: 'CVOR Points', desc: 'Unlike demerit points on your licence, CVOR points are assigned to both the driver AND the carrier. They affect carrier safety ratings.' },
              { icon: Scale, title: 'Violation Rate', desc: 'MTO calculates a "violation rate" based on total points divided by fleet size. High rates trigger audits and sanctions.' },
              { icon: DollarSign, title: 'Carrier Sanctions', desc: 'Poor CVOR standing can result in fleet audits, operating restrictions, or even revocation of carrier authority.' },
              { icon: Truck, title: 'Driver Impact', desc: 'As a driver, violations follow you. Future employers check your abstract and CVOR history before hiring.' },
              { icon: Clock, title: 'Points Stay 2 Years', desc: 'CVOR points remain on record for 2 years from conviction date, affecting your carrier\'s rating the entire time.' },
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

      {/* Common Violations */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Common Commercial Vehicle Violations</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { title: 'Hours of Service / Logbook Violations', points: '3-5 CVOR points', desc: 'Driving over hours, falsified logs, failure to maintain daily logs' },
                { title: 'Overweight Violations', points: '2-5 CVOR points', desc: 'Exceeding axle weights, gross vehicle weight, or permit limits' },
                { title: 'Pre-Trip Inspection Failures', points: '3 CVOR points', desc: 'No daily inspection, defective equipment, missing inspection reports' },
                { title: 'Load Security Violations', points: '2-4 CVOR points', desc: 'Unsecured loads, improper tie-downs, shifting cargo' },
                { title: 'Speeding (Commercial)', points: '2-4 CVOR points', desc: 'Higher penalties for commercial vehicles, especially with dangerous goods' },
                { title: 'Out-of-Service Orders', points: '5 CVOR points', desc: 'Operating after being placed out of service is extremely serious' },
                { title: 'Dangerous Goods Violations', points: '3-5 CVOR points', desc: 'Documentation errors, placarding, shipping papers' },
              ].map((item, index) => (
                <div key={index} className={`p-6 flex items-start gap-4 ${index !== 6 ? 'border-b border-gray-100' : ''}`}>
                  <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
                      <span className="text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded">{item.points}</span>
                    </div>
                    <p className="font-paragraph text-foreground/70 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Fight */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Why Fight Commercial Vehicle Tickets?</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { title: 'Protect Your CVOR', desc: 'Every conviction adds points. Too many points trigger MTO audits and sanctions against your carrier.' },
              { title: 'Preserve Your Career', desc: 'Your driving abstract follows you. Violations make it harder to get hired by quality carriers.' },
              { title: 'Avoid Insurance Increases', desc: 'Commercial insurance premiums skyrocket with convictions. One bad year can cost thousands.' },
              { title: 'Prevent Operating Restrictions', desc: 'Carriers with poor CVOR ratings can face operating restrictions or lose their authority entirely.' },
              { title: 'Owner-Operator Protection', desc: 'If you own your truck, YOU are the carrier. Every ticket directly impacts your business.' },
              { title: 'Keep Your Licence', desc: 'Some violations carry licence suspensions that end your ability to drive commercially.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Defence Strategies */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Our Defence Strategies</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { step: '1', title: 'Challenge the Stop', desc: 'Was the inspection or traffic stop conducted lawfully? Improper stops can invalidate charges.' },
              { step: '2', title: 'Technical Defences', desc: 'Scale calibration, ELD data accuracy, measurement procedures—technical errors happen.' },
              { step: '3', title: 'Documentation Review', desc: 'Logbooks, inspection reports, and shipping documents must be properly completed by officers.' },
              { step: '4', title: 'Negotiate Reductions', desc: 'Often we can negotiate to reduce charges to lesser offences with fewer or no CVOR points.' },
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

      {/* Who We Help */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">Who We Help</h2>
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-4">
            {[
              'AZ and DZ licence holders',
              'Owner-operators',
              'Fleet carriers and dispatchers',
              'Long-haul truck drivers',
              'Local delivery drivers',
              'Bus and coach operators',
              'Tow truck operators',
              'Construction vehicle operators',
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="font-paragraph text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <Truck className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Protect Your Commercial Driving Career</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your ticket and explain how we can protect your CVOR and your livelihood.
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
            Licensed by the Law Society of Ontario | Commercial vehicle ticket defence across Ontario
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
