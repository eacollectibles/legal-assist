import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, CheckCircle, AlertTriangle, GraduationCap, DollarSign, Clock, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SchoolZoneSpeedingPage() {
  useEffect(() => {
    document.title = 'School Zone Speeding Ticket | Community Safety Zone Defence Ontario | Paralegal | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Fight school zone and community safety zone speeding tickets in Ontario. Double fines and points apply. Paralegal defence for enhanced penalty zones. Free consultation.');
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
              <GraduationCap className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Traffic Ticket Defence</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              School Zone & Community Safety Zone Speeding
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Speeding in a school zone or community safety zone means doubled fines and potentially more demerit points. These enhanced penalties make fighting the ticket even more important.
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

      {/* Enhanced Penalties */}
      <section className="py-16 md:py-20 bg-red-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Enhanced Penalties Apply</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm border-2 border-red-200 mb-8">
              <div className="grid md:grid-cols-2 gap-6 text-center">
                <div>
                  <DollarSign className="w-10 h-10 text-red-600 mx-auto mb-2" />
                  <p className="font-heading text-3xl font-bold text-red-700">2x Fines</p>
                  <p className="font-paragraph text-red-700">Double the normal fine amount</p>
                </div>
                <div>
                  <AlertTriangle className="w-10 h-10 text-red-600 mx-auto mb-2" />
                  <p className="font-heading text-3xl font-bold text-red-700">Same Points</p>
                  <p className="font-paragraph text-red-700">Demerit points as usual</p>
                </div>
              </div>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="font-paragraph text-amber-800 text-center">
                <strong>Example:</strong> A ticket for 20 km/h over the limit that normally costs ~$95 becomes ~$190 in a community safety zone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Zones */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Types of Enhanced Penalty Zones</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { icon: GraduationCap, title: 'School Zones', desc: 'Areas around schools, typically active during school hours. Usually 40 km/h or lower limits apply.' },
              { icon: Users, title: 'Community Safety Zones', desc: 'Designated areas around schools, daycares, senior centres, playgrounds, and hospitals.' },
              { icon: Clock, title: 'Construction Zones', desc: 'Active construction areas with workers present. Fines are doubled when workers are present.' },
              { icon: Shield, title: 'Designated Roads', desc: 'Municipalities can designate specific roads as community safety zones for enhanced enforcement.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fine Comparison */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Fine Comparison: Regular vs. Safety Zone</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-50 p-4 font-heading font-bold text-foreground text-sm">
                <div>Speed Over Limit</div>
                <div className="text-center">Regular Fine</div>
                <div className="text-center">Safety Zone Fine</div>
              </div>
              {[
                { speed: '1-19 km/h over', regular: '$2.50/km', safety: '$5.00/km' },
                { speed: '20-29 km/h over', regular: '$3.75/km', safety: '$7.50/km' },
                { speed: '30-49 km/h over', regular: '$6.00/km', safety: '$12.00/km' },
                { speed: '50+ km/h over', regular: 'Court appearance', safety: 'Court + doubled' },
              ].map((row, index) => (
                <div key={index} className={`grid grid-cols-3 p-4 ${index !== 3 ? 'border-b border-gray-100' : ''}`}>
                  <div className="font-paragraph text-foreground">{row.speed}</div>
                  <div className="font-paragraph text-foreground/70 text-center">{row.regular}</div>
                  <div className="font-paragraph text-red-600 font-medium text-center">{row.safety}</div>
                </div>
              ))}
            </div>
            <p className="font-paragraph text-foreground/70 text-center mt-4 text-sm">
              Plus victim fine surcharge and court costs on all tickets.
            </p>
          </div>
        </div>
      </section>

      {/* Defences */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Possible Defences</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {[
                { title: 'Zone Not Properly Marked', desc: 'Community safety zones must be designated by bylaw and properly signed. If signs were missing or inadequate, the enhanced penalty may not apply.' },
                { title: 'Outside Active Hours', desc: 'Many school zones have reduced limits only during specific hours. If it was outside those hours, normal limits apply.' },
                { title: 'Challenge the Speed Reading', desc: 'Same defences as regular speeding: radar calibration, operator training, interference, etc.' },
                { title: 'Wrong Section of Road', desc: 'Community safety zones have defined boundaries. If you were ticketed outside the actual zone, enhanced penalties shouldn\'t apply.' },
                { title: 'Construction Zone - No Workers', desc: 'Construction zone fines are only doubled when workers are present. No workers = no doubling.' },
                { title: 'Reduce to Non-Zone Ticket', desc: 'We may negotiate with prosecutors to amend the ticket to remove the community safety zone enhancement.' },
              ].map((item, index) => (
                <div key={index} className={`p-6 flex items-start gap-4 ${index !== 5 ? 'border-b border-gray-100' : ''}`}>
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

      {/* School Zone Hours */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">When Do School Zone Limits Apply?</h2>
            <p className="font-paragraph text-foreground/80 mb-6 text-center">
              School zone reduced speed limits typically apply:
            </p>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <ul className="space-y-3">
                {[
                  'During posted hours (usually 8:00 AM - 5:00 PM on school days)',
                  'When "when children present" signs are posted, only when children are actually present',
                  'Some zones are 24/7 - check the signage',
                  'Weekends and holidays may not apply unless specifically posted',
                  'Summer vacation rules vary by municipality',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/80">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
              <p className="font-paragraph text-foreground/70 mt-4 text-sm">
                If you were ticketed outside active hours, we can challenge the enhanced penalties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Fight */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Why Fight a Safety Zone Ticket?</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              { title: 'Double the Fine', desc: 'You\'re paying twice as much as you would for the same speed elsewhere. That\'s worth fighting.' },
              { title: 'Insurance Impact', desc: 'Higher fines often correlate with more serious treatment by insurers, leading to larger premium increases.' },
              { title: 'Multiple Issues', desc: 'Both the speed and the zone enhancement can be challenged—two opportunities for defence.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Fight Your School Zone Ticket</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your ticket and discuss your defence options.
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
            Licensed by the Law Society of Ontario | Traffic ticket defence across Ontario
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
