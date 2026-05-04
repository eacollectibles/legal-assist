import { Link } from 'react-router-dom';
import { ArrowRight, Shield, MapPin, Scale, Car, Home, Gavel, Clock, CheckCircle, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AjaxParalegalPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <MapPin className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Serving Ajax & Durham Region</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Ajax Paralegal Services</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Licensed paralegal services for Ajax, Pickering, and Durham Region residents. Traffic tickets, Small Claims Court, LTB hearings, provincial offences.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors">Free Consultation <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:2262725153" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/5 transition-colors">Call 226-272-5153</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12">Our Services in Ajax</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <Car className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Traffic Offences</h3>
              <p className="font-paragraph text-foreground/70">Representation for speeding, stunt driving, and careless driving on Highway 401, Highway 412, and Kingston Road.</p>
            </div>
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <Home className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Landlord-Tenant Board</h3>
              <p className="font-paragraph text-foreground/70">Expert representation for eviction defence and rent disputes. Protecting Ajax and Pickering renters.</p>
            </div>
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <Scale className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Small Claims Court</h3>
              <p className="font-paragraph text-foreground/70">Claims up to $50,000. Representation at Oshawa courthouse for Durham Region residents.</p>
            </div>
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <Gavel className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Provincial Offences</h3>
              <p className="font-paragraph text-foreground/70">Defence representation at Ajax Provincial Offences Court for by-law and regulatory violations.</p>
            </div>
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Traffic Tickets</h3>
              <p className="font-paragraph text-foreground/70">Licensed representation on all traffic tickets and driving violations. Protect your driving record.</p>
            </div>
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <CheckCircle className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Legal Consultation</h3>
              <p className="font-paragraph text-foreground/70">Professional legal advice tailored to your case. Free consultation with no obligation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-pastelbeige/10">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12">Local Knowledge & Experience</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">Ajax & Durham Region Expertise</h3>
              <p className="font-paragraph text-foreground/70 mb-6">Serving Ajax, Pickering Village, South Ajax, and North Ajax. Familiar with Oshawa courthouse and Durham Region legal procedures.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-paragraph text-foreground/70">Knowledge of Oshawa court system</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-paragraph text-foreground/70">Highway 401 and 412 enforcement expertise</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-paragraph text-foreground/70">Understanding of Kingston Road traffic</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">Why Choose Us</h3>
              <p className="font-paragraph text-foreground/70 mb-6">Licensed paralegal with extensive experience in Durham Region courts. We understand local procedures and have strong relationships with court personnel.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-paragraph text-foreground/70">Licensed by Law Society of Ontario</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-paragraph text-foreground/70">Competitive rates for Ajax residents</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-paragraph text-foreground/70">Same-day availability for consultations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">Areas We Serve in Durham Region</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="p-4 bg-pastelbeige/20 rounded-lg">
              <p className="font-paragraph font-medium text-foreground">Ajax</p>
            </div>
            <div className="p-4 bg-pastelbeige/20 rounded-lg">
              <p className="font-paragraph font-medium text-foreground">Pickering Village</p>
            </div>
            <div className="p-4 bg-pastelbeige/20 rounded-lg">
              <p className="font-paragraph font-medium text-foreground">South Ajax</p>
            </div>
            <div className="p-4 bg-pastelbeige/20 rounded-lg">
              <p className="font-paragraph font-medium text-foreground">North Ajax</p>
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
                                    