import { Link } from 'react-router-dom';
import { ArrowRight, Shield, MapPin, Scale, Car, Home, Gavel, Clock, CheckCircle, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TorontoParalegalPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <MapPin className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Serving Toronto & Greater Toronto Area</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Toronto Paralegal Services</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Licensed paralegal services for Toronto and GTA residents. Traffic tickets, Small Claims Court, LTB hearings, provincial offences. Serving diverse communities across all Toronto neighbourhoods.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors">Free Consultation <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:2262725153" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/5 transition-colors">Call 226-272-5153</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12">Our Services in Toronto</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <Car className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Traffic Offences</h3>
              <p className="font-paragraph text-foreground/70">Representation for speeding, stunt driving, careless driving across the DVP, Gardiner Expressway, Highway 401, Highway 427, and Highway 400.</p>
            </div>
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <Home className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Landlord-Tenant Board</h3>
              <p className="font-paragraph text-foreground/70">Professional representation for eviction defence, rent disputes, and housing issues before the LTB. Protecting Toronto renters across all neighbourhoods.</p>
            </div>
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <Scale className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Small Claims Court</h3>
              <p className="font-paragraph text-foreground/70">Claims up to $50,000. Representation at Old City Hall and 2201 Finch Ave W courthouse locations.</p>
            </div>
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <Gavel className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Provincial Offences</h3>
              <p className="font-paragraph text-foreground/70">Defence representation for by-law violations, property offences, and regulatory violations across Toronto provincial courts.</p>
            </div>
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Traffic Tickets</h3>
              <p className="font-paragraph text-foreground/70">Licensed to represent clients on traffic tickets and driving offences. Reduce fines and protect your driving record.</p>
            </div>
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <CheckCircle className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Legal Consultation</h3>
              <p className="font-paragraph text-foreground/70">Professional legal advice for your specific situation. No obligation consultation to discuss your case.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-pastelbeige/10">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12">Local Knowledge & Experience</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">Toronto & GTA Coverage</h3>
              <p className="font-paragraph text-foreground/70 mb-6">We serve all Toronto communities including Downtown Toronto, North York, Scarborough, Etobicoke, East York, and York. Familiar with all major highways and traffic corridors.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-paragraph text-foreground/70">Years of experience in Toronto courts</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-paragraph text-foreground/70">Knowledge of diverse neighbourhood issues</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-paragraph text-foreground/70">Accessible locations across the city</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">Why Choose Us</h3>
              <p className="font-paragraph text-foreground/70 mb-6">As a licensed paralegal serving Canada's largest city, we understand the unique complexities of Toronto legal matters. Multilingual support available.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-paragraph text-foreground/70">Licensed by Law Society of Ontario</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-paragraph text-foreground/70">Affordable rates for Toronto residents</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-paragraph text-foreground/70">Fast response to new clients</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">Areas We Serve in Toronto</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-pastelbeige/20 rounded-lg">
              <p className="font-paragraph font-medium text-foreground">Downtown Toronto</p>
            </div>
            <div className="p-4 bg-pastelbeige/20 rounded-lg">
              <p className="font-paragraph font-medium text-foreground">North York</p>
            </div>
            <div className="p-4 bg-pastelbeige/20 rounded-lg">
              <p className="font-paragraph font-medium text-foreground">Scarborough</p>
            </div>
            <div className="p-4 bg-pastelbeige/20 rounded-lg">
              <p className="font-paragraph font-medium text-foreground">Etobicoke</p>
            </div>
            <div className="p-4 bg-pastelbeige/20 rounded-lg">
              <p className="font-paragraph font-medium text-foreground">East York</p>
            </div>
            <div className="p-4 bg-pastelbeige/20 rounded-lg">
              <p className="font-paragraph font-medium text-foreground">York</p>
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
