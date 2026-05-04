import { Link } from 'react-router-dom';
import { ArrowRight, Shield, MapPin, Scale, Car, Home, Gavel, Clock, CheckCircle, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RichmondHillParalegalPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <MapPin className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Serving Richmond Hill & York Region</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Richmond Hill Paralegal Services</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Licensed paralegal services for Richmond Hill, Thornhill, and York Region residents. Traffic tickets, Small Claims Court, LTB hearings, provincial offences.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors">Free Consultation <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:2262725153" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/5 transition-colors">Call 226-272-5153</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12">Our Services in Richmond Hill</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <Car className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Traffic Offences</h3>
              <p className="font-paragraph text-foreground/70">Professional representation for speeding, stunt driving, and careless driving violations. Serving Highway 404, Highway 407, and Yonge Street corridor.</p>
            </div>
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <Home className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Landlord-Tenant Board</h3>
              <p className="font-paragraph text-foreground/70">Representation for eviction defence, rent disputes, and housing issues. Protecting Richmond Hill renters at the Newmarket LTB office.</p>
            </div>
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <Scale className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Small Claims Court</h3>
              <p className="font-paragraph text-foreground/70">Claims up to $50,000. Representation at Newmarket courthouse for York Region residents.</p>
            </div>
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <Gavel className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Provincial Offences</h3>
              <p className="font-paragraph text-foreground/70">Defence for by-law violations and regulatory offences at York Region Provincial Offences Court.</p>
            </div>
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Traffic Tickets</h3>
              <p className="font-paragraph text-foreground/70">Licensed representation on traffic tickets and driving offences. Reduce fines and protect your driving record.</p>
            </div>
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <CheckCircle className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Legal Consultation</h3>
              <p className="font-paragraph text-foreground/70">Professional legal advice tailored to your situation. Free initial consultation with no obligation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-pastelbeige/10">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12">Local Knowledge & Experience</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">Richmond Hill & York Region Experience</h3>
              <p className="font-paragraph text-foreground/70 mb-6">Serving Richmond Hill, Thornhill, Oak Ridges, Jefferson, and Langstaff. Extensive experience with Newmarket courts and York Region legal proceedings.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-paragraph text-foreground/70">Familiar with all York Region courts</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-paragraph text-foreground/70">Knowledge of Highway 404 and 407 enforcement</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-paragraph text-foreground/70">Understanding of Yonge Street corridor issues</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">Why Choose Us</h3>
              <p className="font-paragraph text-foreground/70 mb-6">We are a licensed paralegal firm with deep roots in York Region. We understand local court procedures and maintain strong relationships with court staff.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-paragraph text-foreground/70">Licensed by Law Society of Ontario</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-paragraph text-foreground/70">Competitive rates for Richmond Hill residents</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-paragraph text-foreground/70">Same-day consultation available</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">Areas We Serve in York Region</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="p-4 bg-pastelbeige/20 rounded-lg">
              <p className="font-paragraph font-medium text-foreground">Richmond Hill</p>
            </div>
            <div className="p-4 bg-pastelbeige/20 rounded-lg">
              <p className="font-paragraph font-medium text-foreground">Thornhill</p>
            </div>
            <div className="p-4 bg-pastelbeige/20 rounded-lg">
              <p className="font-paragraph font-medium text-foreground">Oak Ridges</p>
            </div>
            <div className="p-4 bg-pastelbeige/20 rounded-lg">
              <p className="font-paragraph font-medium text-foreground">Jefferson</p>
            </div>
            <div className="p-4 bg-pastelbeige/20 rounded-lg">
              <p className="font-paragraph font-medium text-foreground">Langstaff</p>
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
