import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Phone, AlertTriangle, CheckCircle, DollarSign, Shield, Scale, XCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact';

export default function CarelessDrivingDefencePage() {
  useEffect(() => {
    document.title = 'Careless Driving Defence in Ontario | LegalAssist';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-red-600 mb-4">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Serious Traffic Offence</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Careless Driving Defence in Ontario</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Careless driving is a serious charge under the Highway Traffic Act with severe penalties including licence suspension, heavy fines, and possible jail time. You need professional representation.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Get Free Case Review <ArrowRight className="w-5 h-5" /></Link>
              <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5"><Phone className="w-5 h-5" /> {PHONE_DISPLAY}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Penalties for Careless Driving in Ontario</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">Careless driving under Section 130 of the Highway Traffic Act carries significant consequences.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <DollarSign className="w-10 h-10 text-red-600 mx-auto mb-4" />
              <h3 className="font-heading text-2xl font-bold text-red-700 mb-2">$400 - $2,000</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Fine upon conviction</p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <XCircle className="w-10 h-10 text-red-600 mx-auto mb-4" />
              <h3 className="font-heading text-2xl font-bold text-red-700 mb-2">6 Points</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Demerit points on your licence</p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <AlertTriangle className="w-10 h-10 text-red-600 mx-auto mb-4" />
              <h3 className="font-heading text-2xl font-bold text-red-700 mb-2">Up to 2 Years</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Licence suspension</p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <Scale className="w-10 h-10 text-red-600 mx-auto mb-4" />
              <h3 className="font-heading text-2xl font-bold text-red-700 mb-2">Up to 6 Months</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Possible jail time</p>
            </div>
          </div>
          
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-3xl mx-auto">
            <p className="font-paragraph text-foreground/80 text-center">
              <strong>Insurance Impact:</strong> A careless driving conviction can increase your insurance rates by 50-100% or result in policy cancellation. This can cost you thousands of dollars over the following years.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">What Constitutes Careless Driving?</h2>
          
          <div className="max-w-4xl mx-auto">
            <p className="font-paragraph text-lg text-foreground/70 mb-8 text-center">Under Section 130 of the Highway Traffic Act, careless driving means operating a vehicle "without due care and attention or without reasonable consideration for other persons."</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border border-pastelbeige">
                <h3 className="font-heading text-lg font-bold text-foreground mb-4">Common Situations Charged:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Rear-end collisions</span></li>
                  <li className="flex items-start gap-3"><XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Failing to yield right of way</span></li>
                  <li className="flex items-start gap-3"><XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Unsafe lane changes</span></li>
                  <li className="flex items-start gap-3"><XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Running red lights or stop signs</span></li>
                  <li className="flex items-start gap-3"><XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Distracted driving incidents</span></li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-pastelbeige">
                <h3 className="font-heading text-lg font-bold text-foreground mb-4">Possible Defences:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Momentary lapse vs. pattern of driving</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Weather or road conditions</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Mechanical failure</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Actions of other drivers</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Medical emergency</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">How We Defend Careless Driving Charges</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Obtain Disclosure</h3>
                <p className="font-paragraph text-foreground/70">We request all evidence including officer notes, witness statements, photos, and accident reconstruction reports.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Analyze the Evidence</h3>
                <p className="font-paragraph text-foreground/70">We identify weaknesses in the prosecution's case and determine the best defence strategy.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Negotiate with Prosecutor</h3>
                <p className="font-paragraph text-foreground/70">We negotiate to have charges reduced or withdrawn before trial when possible.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Trial Representation</h3>
                <p className="font-paragraph text-foreground/70">If necessary, we represent you at trial, cross-examine witnesses, and present your defence.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Charged with Careless Driving?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">This is a serious charge that requires experienced representation. Contact us immediately for a free case review.</p>
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
