import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Phone, Home, AlertTriangle, CheckCircle, Lock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact';

export default function IllegalLockoutPage() {
  useEffect(() => {
    document.title = 'Illegal Lockout Ontario | Tenant Rights | LegalAssist';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-gradient-to-br from-red-100 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-red-600 mb-4">
              <Lock className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Tenant Emergency</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Illegal Lockout in Ontario</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Has your landlord changed the locks, removed your belongings, or prevented you from entering your home? This is illegal. You have rights and we can help you get back in immediately.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-red-600 text-white font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-red-700">Get Emergency Help <ArrowRight className="w-5 h-5" /></Link>
              <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 border-2 border-red-600 text-red-600 font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-red-50"><Phone className="w-5 h-5" /> {PHONE_DISPLAY}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">What is an Illegal Lockout?</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">Any action by a landlord to prevent you from accessing your rental unit without a valid eviction order is illegal.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
              <h3 className="font-heading text-lg font-bold text-red-700 mb-4">Examples of Illegal Lockout:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Changing locks without providing new keys</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Removing doors or windows</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Putting belongings outside</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Shutting off utilities</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Blocking access to the property</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Threatening or intimidating you to leave</span></li>
              </ul>
            </div>
            
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
              <h3 className="font-heading text-lg font-bold text-green-700 mb-4">Your Rights:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Only Sheriff can enforce eviction orders</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">File T2 application for immediate hearing</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Claim compensation for all losses</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Administrative penalty up to $50,000</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="font-paragraph text-foreground/70">Call police - this can be criminal</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What To Do If You Are Locked Out</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="bg-white rounded-lg p-6 border border-pastelbeige flex gap-4">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
              <div>
                <h3 className="font-heading font-bold text-foreground">Call 911 or local police</h3>
                <p className="font-paragraph text-foreground/70 text-sm">Report the illegal lockout. Police can help you regain access or document the situation.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 border border-pastelbeige flex gap-4">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
              <div>
                <h3 className="font-heading font-bold text-foreground">Document everything</h3>
                <p className="font-paragraph text-foreground/70 text-sm">Take photos, save messages, record dates and times. This evidence is crucial.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 border border-pastelbeige flex gap-4">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
              <div>
                <h3 className="font-heading font-bold text-foreground">Contact us immediately</h3>
                <p className="font-paragraph text-foreground/70 text-sm">We can file an emergency T2 application for an expedited hearing to get you back in.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-red-600 text-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Locked Out Right Now?</h2>
          <p className="font-paragraph text-lg text-white/90 mb-8 max-w-2xl mx-auto">This is an emergency. Contact us immediately and we will help you take action.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-red-600 font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-gray-100">Get Emergency Help <ArrowRight className="w-5 h-5" /></Link>
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-white/10"><Phone className="w-5 h-5" /> {PHONE_DISPLAY}</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
