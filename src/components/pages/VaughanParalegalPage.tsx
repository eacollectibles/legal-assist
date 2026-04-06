import { Link } from 'react-router-dom';
import { ArrowRight, Shield, MapPin, Scale, Car, Home, Gavel, Clock, CheckCircle, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function VaughanParalegalPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <MapPin className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Serving Vaughan & York Region</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Vaughan Paralegal Services</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Licensed paralegal services for Vaughan, Woodbridge, Maple, and York Region residents. Traffic tickets, Small Claims Court, LTB hearings, provincial offences.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors">Free Consultation <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:2262725153" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/5 transition-colors">Call 226-272-5153</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12">Our Services in Vaughan</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <Car className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Traffic Offences</h3>
              <p className="font-paragraph text-foreground/70">Representation for speeding, stunt driving, and careless driving. Familiar with Highway 400, Highway 407, and Highway 27.</p>
            </div>
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <Home className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Landlord-Tenant Board</h3>
              <p className="font-paragraph text-foreground/70">Expert representation for eviction defence and rent disputes at the LTB. Protecting Vaughan renters.</p>
            </div>
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <Scale className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Small Claims Court</h3>
              <p className="font-paragraph text-foreground/70">Claims up to $35,000. Representation at Newmarket and York Region court locations.</p>
            </div>
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <Gavel className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Provincial Offences</h3>
              <p className="font-paragraph text-foreground/70">Defence representation for by-law violations and regulatory offences in York Region.</p>
            </div>
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Traffic Tickets</h3>
              <p className="font-paragraph text-foreground/70">Licensed to represent on all traffic tickets and driving violations. Reduce fines and points.</p>
            </div>
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <CheckCircle className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Legal Consultation</h3>
              <p className="font-paragraph text-foreground/70">Comprehensive legal advice for your specific needs. Free consultation with no commitment.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-pastelbeige/10">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12">Local Knowledge & Experience</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">Vaughan & Surrounding Areas</h3>
              <p className="font-paragraph text-foreground/70 mb-6">We serve Vaughan, Woodbridge, Maple, Kleinburg, Concord, and Thornhill. Deep understanding of York Region courts and procedures.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-paragraph text-foreground/70">Expertise with Highway 400 and 407 enforcement</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-paragraph text-foreground/70">Knowledge of Highway 27 traffic issues</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-paragraph text-foreground/70">Familiarity with York Region court system</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">Why Choose Us</h3>
              <p className="font-paragraph text-foreground/70 mb-6">Licensed paralegal serving Vaughan for years. We know the local courts, judges, and procedures. Dedicated to achieving the best outcomes for our clients.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-paragraph text-foreground/70">Licensed by Law Society of Ontario</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-paragraph text-foreground/70">Affordable rates for Vaughan families</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-paragraph text-foreground/70">Quick response and availability</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">Areas We Serve in Vaughan</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-pastelbeige/20 rounded-lg">
              <p className="font-paragraph font-medium text-foreground">Vaughan</p>
            </div>
            <div className="p-4 bg-pastelbeige/20 rounded-lg">
              <p className="font-paragraph font-medium text-foreground">Woodbridge</p>
            </div>
            <div className="p-4 bg-pastelbeige/20 rounded-lg">
              <p className="font-paragraph font-medium text-foreground">Maple</p>
            </div>
            <div className="p-4 bg-pastelbeige/20 rounded-lg">
              <p className="font-paragraph font-medium text-foreground">Kleinburg</p>
            </div>
            <div className="p-4 bg-pastelbeige/20 rounded-lg">
              <p className="font-paragraph font-medium text-foreground">Concord</p>
            </div>
            <div className="p-4 bg-pastelbeige/20 rounded-lg">
              <p className="font-paragraph font-medium text-foreground">Thornhill</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">Ready to Get Started?</h2>
            <p className="font-paragraph text-lg text-foreground/70 mb-8">Contact us today for a free consultation. We'll assess your case and explain your options.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors">Schedule Consultation <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:2262725153" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/5 transition-colors"><Phone className="w-5 h-5" /> 226-272-5153</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-foreground/5 text-center">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <p className="font-paragraph text-sm text-foreground/60">Licensed by Law Society of Ontario. All consultations are confidential.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
