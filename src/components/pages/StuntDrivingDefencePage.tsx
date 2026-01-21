import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Phone, AlertTriangle, CheckCircle, DollarSign, Shield, Scale, XCircle, Car } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function StuntDrivingDefencePage() {
  useEffect(() => {
    document.title = 'Stunt Driving Defence in Ontario | 50 Over | LegalAssist';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-100 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-red-600 mb-4">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">CRITICAL - Immediate Action Required</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Stunt Driving &amp; Street Racing Defence
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Charged with stunt driving or going 50+ km/h over the limit? Your vehicle was impounded and licence suspended on the spot. You need immediate legal help to fight these charges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-red-600 text-white font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-red-700"
              >
                Get Urgent Help Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a 
                href="tel:+14165550123"
                className="inline-flex items-center justify-center gap-2 border-2 border-red-600 text-red-600 font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-red-50"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Immediate Consequences */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            Immediate Roadside Consequences
          </h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">
            Unlike regular speeding tickets, stunt driving triggers immediate penalties at roadside.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 text-center">
              <Car className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-heading text-xl font-bold text-red-700 mb-2">14-Day Impound</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Your vehicle is impounded immediately at the roadside for 14 days. Towing and storage fees apply.</p>
            </div>
            
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 text-center">
              <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-heading text-xl font-bold text-red-700 mb-2">30-Day Suspension</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Your licence is suspended immediately for 30 days. No driving at all during this period.</p>
            </div>
            
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 text-center">
              <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-heading text-xl font-bold text-red-700 mb-2">Criminal-Level Charge</h3>
              <p className="font-paragraph text-foreground/70 text-sm">You must appear in court. This is not a simple pay-and-forget ticket.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Conviction Penalties */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Penalties If Convicted
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg border border-red-200 overflow-hidden">
              <div className="bg-red-600 text-white px-6 py-4">
                <h3 className="font-heading text-xl font-bold">First Offence Conviction</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-pastelbeige">
                  <span className="font-paragraph text-foreground">Fine</span>
                  <span className="font-heading font-bold text-red-600">$2,000 - $10,000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-pastelbeige">
                  <span className="font-paragraph text-foreground">Licence Suspension</span>
                  <span className="font-heading font-bold text-red-600">1 - 3 Years</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-pastelbeige">
                  <span className="font-paragraph text-foreground">Demerit Points</span>
                  <span className="font-heading font-bold text-red-600">6 Points</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-pastelbeige">
                  <span className="font-paragraph text-foreground">Possible Jail Time</span>
                  <span className="font-heading font-bold text-red-600">Up to 6 Months</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-paragraph text-foreground">Insurance Impact</span>
                  <span className="font-heading font-bold text-red-600">100-300% Increase or Cancellation</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-yellow-50 border border-yellow-300 rounded-lg p-6">
              <p className="font-paragraph text-foreground/80 text-center">
                <strong>Second Offence:</strong> Fines up to $10,000, suspension up to 10 years, and up to 6 months jail. <strong>Third Offence:</strong> Lifetime licence suspension possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Counts as Stunt Driving */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            What Counts as Stunt Driving?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">Speed-Based:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/70">40+ km/h over limit in zones under 80 km/h</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/70">50+ km/h over limit in zones 80 km/h or higher</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/70">150+ km/h regardless of posted limit</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">Behaviour-Based:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/70">Street racing or contest</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/70">Burnouts, doughnuts, drifting</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/70">Driving with someone in trunk or outside vehicle</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/70">Intentionally cutting off another vehicle</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Defence Strategies */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Our Defence Strategies
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Challenge Speed Evidence</h3>
                <p className="font-paragraph text-foreground/70">Was the radar/laser properly calibrated? Was there visual confirmation? Were there other vehicles in the area?</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Negotiate Charge Reduction</h3>
                <p className="font-paragraph text-foreground/70">In some cases, we can negotiate reduction to a lesser speeding offence that avoids the severe stunt driving penalties.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Challenge Signage</h3>
                <p className="font-paragraph text-foreground/70">Were speed limit signs properly posted and visible? Speed zone changes must be properly marked.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Officer Cross-Examination</h3>
                <p className="font-paragraph text-foreground/70">We thoroughly cross-examine the officer on their training, procedures, and observations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-red-600 text-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Time is Critical
          </h2>
          <p className="font-paragraph text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Stunt driving charges have strict court deadlines. Contact us immediately for a free consultation. We will review your case and explain your options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-red-600 font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-gray-100"
            >
              Get Free Case Review
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="tel:+14165550123"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-white/10"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
