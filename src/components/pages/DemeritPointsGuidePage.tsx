import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Phone, Info, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DemeritPointsGuidePage() {
  useEffect(() => {
    document.title = 'Ontario Demerit Points Guide | How Many Points Suspend Licence | LegalAssist';
  }, []);

  const pointsTable = [
    { offence: 'Speeding 16-29 km/h over', points: 3 },
    { offence: 'Speeding 30-49 km/h over', points: 4 },
    { offence: 'Speeding 50+ km/h over (Stunt)', points: 6 },
    { offence: 'Careless driving', points: 6 },
    { offence: 'Following too closely', points: 4 },
    { offence: 'Failing to stop for school bus', points: 6 },
    { offence: 'Failing to yield to pedestrian', points: 4 },
    { offence: 'Running a red light', points: 3 },
    { offence: 'Improper passing', points: 3 },
    { offence: 'Distracted driving (1st)', points: 3 },
    { offence: 'Distracted driving (2nd+)', points: 6 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Info className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Traffic Information</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Ontario Demerit Points Guide</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Understanding how Ontario's demerit point system works and what happens when you accumulate too many points. Learn the thresholds and how to protect your licence.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Get Free Consultation <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5"><Phone className="w-5 h-5" /> (519) 601-1127</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Suspension Thresholds</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4 text-center">Novice (G1, G2)</h3>
              <ul className="space-y-3">
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Warning Letter:</span><span className="font-bold">2 points</span></li>
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Interview Required:</span><span className="font-bold">6 points</span></li>
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Suspension:</span><span className="font-bold text-red-600">9+ points</span></li>
              </ul>
            </div>
            
            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4 text-center">Full Licence (G)</h3>
              <ul className="space-y-3">
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Warning Letter:</span><span className="font-bold">6 points</span></li>
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Interview Required:</span><span className="font-bold">9 points</span></li>
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Suspension:</span><span className="font-bold text-red-600">15+ points</span></li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4 text-center">Suspension Duration</h3>
              <ul className="space-y-3">
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">First Suspension:</span><span className="font-bold">30 days</span></li>
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Second (in 2 yrs):</span><span className="font-bold">6 months</span></li>
                <li className="flex justify-between"><span className="font-paragraph text-foreground/70">Third+ (in 2 yrs):</span><span className="font-bold">Indefinite</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Common Offences and Points</h2>
          
          <div className="max-w-2xl mx-auto bg-white rounded-lg border border-pastelbeige overflow-hidden">
            <div className="bg-primary text-primary-foreground px-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <span className="font-heading font-bold">Offence</span>
                <span className="font-heading font-bold text-right">Points</span>
              </div>
            </div>
            <div className="divide-y divide-pastelbeige">
              {pointsTable.map((item, index) => (
                <div key={index} className="px-6 py-3 grid grid-cols-2 gap-4">
                  <span className="font-paragraph text-foreground/80">{item.offence}</span>
                  <span className="font-paragraph text-right font-bold">{item.points}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Protect Your Licence</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">The best way to avoid demerit points is to fight tickets before conviction. Contact us for a free case review on any traffic ticket.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Get Free Case Review <ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary-foreground/10"><Phone className="w-5 h-5" /> (519) 601-1127</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
