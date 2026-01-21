import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Phone, AlertTriangle, CheckCircle, Car } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact';

export default function G1G2ViolationsPage() {
  useEffect(() => {
    document.title = 'G1 G2 Ticket Defence Ontario | Novice Driver Violations | LegalAssist';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Car className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Traffic Ticket Defence</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">G1 &amp; G2 Novice Driver Violations</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Novice drivers face stricter rules and harsher penalties. A single mistake can result in immediate licence suspension and delay your progression to a full licence. We can help protect your driving future.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Get Free Case Review <ArrowRight className="w-5 h-5" /></Link>
              <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5"><Phone className="w-5 h-5" /> {PHONE_DISPLAY}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Novice Driver Rules</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">G1 and G2 drivers must follow additional rules beyond regular drivers.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">G1 Restrictions:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Zero blood alcohol level</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Must have fully licensed driver with 4+ years experience</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">No driving on 400-series highways</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">No driving between midnight and 5 a.m.</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Passengers limited to number of seatbelts</span></li>
              </ul>
            </div>
            
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">G2 Restrictions:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Zero blood alcohol level</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">First 6 months: max 1 teen passenger (12 a.m. - 5 a.m.)</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">After 6 months: max 3 teen passengers (12 a.m. - 5 a.m.)</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Can drive on all roads including 400-series</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">No accompanying driver required</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Novice Driver Penalties</h2>
          
          <div className="max-w-3xl mx-auto bg-red-50 border-2 border-red-300 rounded-lg p-6">
            <h3 className="font-heading text-lg font-bold text-foreground mb-4">Suspension at 9 Demerit Points (vs 15 for G licence)</h3>
            <p className="font-paragraph text-foreground/80 mb-4">Novice drivers are suspended at only 9 demerit points compared to 15 for fully licensed drivers. This means:</p>
            <ul className="space-y-2">
              <li className="font-paragraph text-foreground/80">• A single careless driving conviction (6 points) plus any 3-point offence = suspension</li>
              <li className="font-paragraph text-foreground/80">• Three minor speeding tickets (3 points each) = suspension</li>
              <li className="font-paragraph text-foreground/80">• Distracted driving (3-6 points) can push you over quickly</li>
            </ul>
          </div>
          
          <div className="mt-8 max-w-3xl mx-auto bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
            <h3 className="font-heading text-lg font-bold text-foreground mb-4">Zero Tolerance Violations</h3>
            <p className="font-paragraph text-foreground/80">For alcohol, drugs, distracted driving, and speeding 50+ km/h over, novice drivers face immediate roadside licence suspensions even before conviction.</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">G1 or G2 Ticket? Fight It.</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">Do not let one mistake derail your driving future. Contact us for a free consultation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Get Free Case Review <ArrowRight className="w-5 h-5" /></Link>
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary-foreground/10"><Phone className="w-5 h-5" /> {PHONE_DISPLAY}</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
