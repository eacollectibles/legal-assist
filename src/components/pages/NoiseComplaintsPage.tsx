import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, AlertTriangle, Home, Volume2, FileText, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NoiseComplaintsPage() {
  useEffect(() => {
    document.title = 'Noise Complaints & N5 Notice Defence | LTB Paralegal Ontario | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Facing eviction for noise complaints in Ontario? N5 notice defence for tenants. Understand your rights and what constitutes substantial interference. Free consultation London.');
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
              <Volume2 className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Landlord and Tenant Board</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Noise Complaints & N5 Notice Defence
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Received an N5 notice for noise? Not all noise complaints justify eviction. We help tenants defend against unfair or exaggerated noise allegations and understand what truly constitutes "substantial interference."
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

      {/* Understanding N5 */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Understanding the N5 Notice</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: FileText, title: 'What is an N5?', desc: 'A Notice to End your Tenancy for interfering with others\' reasonable enjoyment. It can be served for noise, but also damage, overcrowding, or illegal activity.' },
              { icon: Clock, title: 'First N5: 7-Day Void Period', desc: 'You have 7 days to "void" a first N5 by stopping the behaviour. If you stop and don\'t repeat for 6 months, no eviction.' },
              { icon: AlertTriangle, title: 'Second N5: No Void Period', desc: 'If you get a second N5 within 6 months of voiding the first, there\'s no opportunity to void—landlord can apply directly to LTB.' },
              { icon: Scale, title: 'The Legal Test', desc: 'Noise must "substantially interfere" with reasonable enjoyment. Normal living sounds typically don\'t meet this threshold.' },
              { icon: Users, title: 'Who Complained?', desc: 'Usually another tenant. Their expectations must be reasonable for apartment living, not absolute silence.' },
              { icon: Home, title: 'Building Context Matters', desc: 'What\'s acceptable varies. An old building with thin walls vs. a concrete high-rise have different sound expectations.' },
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

      {/* What IS and ISN'T Substantial */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What IS and ISN'T Substantial Interference</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 p-6 rounded-xl border border-red-200">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-4">Likely Substantial Interference</h3>
              <ul className="space-y-3">
                {[
                  'Loud parties late at night repeatedly',
                  'Screaming matches or domestic disturbances',
                  'Amplified music at unreasonable hours',
                  'Running a noisy business from the unit',
                  'Deliberately banging or stomping to annoy',
                  'Letting dog bark continuously for hours',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 font-paragraph text-red-800">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <h3 className="font-heading text-xl font-bold text-green-800 mb-4">Generally NOT Substantial</h3>
              <ul className="space-y-3">
                {[
                  'Normal walking, even with hard floors',
                  'Occasional TV or music at reasonable volume',
                  'Children playing during daytime',
                  'Baby crying (parents can\'t control this)',
                  'Reasonable cooking/dishwashing sounds',
                  'Single isolated incidents',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 font-paragraph text-green-800">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="font-paragraph text-foreground/70 text-center mt-8 max-w-2xl mx-auto">
            The LTB considers: frequency, duration, time of day, whether the building has soundproofing issues, and if you've made reasonable efforts to reduce noise.
          </p>
        </div>
      </section>

      {/* Defences */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Defences to Noise-Based Eviction</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { title: 'Noise Doesn\'t Meet Legal Threshold', desc: 'The noise is normal living sounds that don\'t substantially interfere with reasonable enjoyment.' },
                { title: 'Complainant\'s Unreasonable Expectations', desc: 'The complaining tenant expects silence or has hypersensitive expectations inappropriate for multi-unit living.' },
                { title: 'Building Has Poor Soundproofing', desc: 'Normal sounds travel due to building construction, not your behaviour. Not your fault the building wasn\'t built well.' },
                { title: 'Steps Taken to Address', desc: 'You\'ve already taken reasonable steps: got rugs, adjusted TV times, spoke with neighbours.' },
                { title: 'Exaggerated or False Complaints', desc: 'The complaints don\'t accurately reflect reality. You have evidence of your actual habits.' },
                { title: 'N5 Procedurally Defective', desc: 'The notice is missing required information, has wrong dates, or wasn\'t served properly.' },
                { title: 'Retaliatory Notice', desc: 'The N5 was served after you complained about repairs or exercised other tenant rights.' },
              ].map((item, index) => (
                <div key={index} className={`p-6 flex items-start gap-4 ${index !== 6 ? 'border-b border-gray-100' : ''}`}>
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

      {/* What To Do */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">What To Do If You Receive an N5</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { step: '1', title: 'Don\'t Panic', desc: 'An N5 is not an eviction order. You have rights and options.' },
              { step: '2', title: 'Check the Details', desc: 'Is the N5 filled out correctly? Are the dates and descriptions accurate?' },
              { step: '3', title: 'Consider Voiding (First N5)', desc: 'If it\'s your first N5, you can void it by stopping the behaviour for 7 days.' },
              { step: '4', title: 'Document Everything', desc: 'Keep a log of your activities, noise levels, and any communications.' },
              { step: '5', title: 'Get Witness Statements', desc: 'Neighbours who haven\'t heard excessive noise can provide statements.' },
              { step: '6', title: 'Contact Us', desc: 'Get legal advice on your specific situation and best defence strategy.' },
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

      {/* Evidence */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">Evidence That Can Help Your Case</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Your own noise log with dates and times',
                'Statements from other neighbours',
                'Photos of rugs, carpets, or soundproofing you\'ve added',
                'Communications with landlord about building noise issues',
                'Evidence of when you\'re home vs. at work',
                'Receipts for noise-reducing purchases',
                'Any prior warnings (or lack thereof)',
                'Building\'s history of noise complaints',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="font-paragraph text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Don't Let Unfair Noise Complaints Cost You Your Home</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your N5 notice and build your defence.
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
            Licensed by the Law Society of Ontario | Tenant representation at the Landlord and Tenant Board
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
