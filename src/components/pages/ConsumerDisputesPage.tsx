import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Phone, ShoppingCart, AlertCircle, CheckCircle, Wrench, Car, Home, Smartphone, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function ConsumerDisputesPage() {
  useEffect(() => {
    document.title = 'Consumer Disputes & Bad Contractor Claims | Ontario Small Claims Court';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Sue bad contractors, recover money for defective products, or fight unfair business practices. Small Claims Court representation in London, Ontario. Free consultation.');
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
              <ShoppingCart className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Small Claims Court • Consumer Protection</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Consumer Disputes &amp; Bad Contractor Claims</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Ripped off by a contractor? Stuck with a lemon car? Business won't honour a warranty? Small Claims Court lets you recover up to $50,000 for consumer disputes in Ontario.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Free Case Assessment <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5"><Phone className="w-5 h-5" /> (519) 601-1127</a>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Cases */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Common Consumer Disputes We Handle</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Wrench, title: 'Bad Contractors', desc: 'Shoddy workmanship, abandoned projects, unlicensed work, or contractors who took your deposit and disappeared.', examples: 'Renovations, roofing, plumbing, electrical, landscaping, paving' },
              { icon: Car, title: 'Used Car Problems', desc: 'Undisclosed accidents, rolled-back odometers, mechanical issues hidden by sellers, or dealers who misrepresented the vehicle.', examples: 'Private sales, dealerships, curbsiders' },
              { icon: Home, title: 'Home Services', desc: 'Moving companies that damaged belongings, cleaning services that didn\'t deliver, or home warranty disputes.', examples: 'Movers, cleaners, pest control, HVAC' },
              { icon: Smartphone, title: 'Defective Products', desc: 'Products that broke prematurely, didn\'t work as advertised, or sellers who won\'t honour warranties.', examples: 'Electronics, appliances, furniture, equipment' },
              { icon: Shield, title: 'Service Contracts', desc: 'Gyms, memberships, or subscription services that won\'t let you cancel or charged you improperly.', examples: 'Gym memberships, subscriptions, service agreements' },
              { icon: AlertCircle, title: 'Fraud & Misrepresentation', desc: 'Businesses that lied about what you were buying, bait-and-switch tactics, or outright scams.', examples: 'Online purchases, door-to-door sales, service fraud' },
            ].map((item, index) => (
              <div key={index} className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70 mb-3">{item.desc}</p>
                <p className="font-paragraph text-xs text-foreground/50 italic">{item.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bad Contractor Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Dealing With a Bad Contractor?</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">Contractor disputes are among the most common Small Claims cases. Here's what you can sue for:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 border border-pastelbeige shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600" /> You Can Recover</h3>
              <ul className="space-y-2 font-paragraph text-foreground/70">
                <li>• Deposits paid for work never started</li>
                <li>• Cost to fix defective work</li>
                <li>• Difference between quoted and actual price (if they overbilled)</li>
                <li>• Damages caused by negligent work</li>
                <li>• Cost to hire another contractor to finish/fix</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 border border-pastelbeige shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2"><AlertCircle className="w-5 h-5 text-primary" /> Evidence That Helps</h3>
              <ul className="space-y-2 font-paragraph text-foreground/70">
                <li>• Written contract or quote</li>
                <li>• Photos of defective work</li>
                <li>• Payment records</li>
                <li>• Text messages and emails</li>
                <li>• Quote from another contractor to fix</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Consumer Protection Laws */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Ontario Consumer Protection Laws on Your Side</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">Several laws protect Ontario consumers and strengthen your Small Claims case:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { title: 'Consumer Protection Act', points: ['10-day cooling off for door-to-door sales', 'Right to cancel unfair contracts', 'Protection against false advertising', 'Unfair business practices are illegal'] },
              { title: 'Sale of Goods Act', points: ['Products must be of merchantable quality', 'Must match their description', 'Must be fit for intended purpose', 'Implied warranties exist even without written ones'] },
              { title: 'Motor Vehicle Dealers Act', points: ['Dealers must disclose accident history', 'Cooling-off period for some purchases', 'Compensation fund for dealer fraud', 'Odometer tampering is illegal'] },
              { title: 'Home Construction Regulatory Authority', points: ['Contractors must be licensed for certain work', 'Breach of standards supports claims', 'Building code violations', 'Warranty requirements'] },
            ].map((law, index) => (
              <div key={index} className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">{law.title}</h3>
                <ul className="space-y-2">
                  {law.points.map((point, i) => (
                    <li key={i} className="font-paragraph text-foreground/70 text-sm flex items-start gap-2">
                      <span className="text-primary mt-1">•</span> {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-pastelbeige">
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:text-primary">The contractor did bad work but I already paid. Can I still sue?</AccordionTrigger>
                <AccordionContent className="font-paragraph text-foreground/70">Yes. You can sue for the cost to repair or redo the defective work, even if you've already paid the original contractor. Get quotes from other contractors to establish what it will cost to fix, and that becomes your claim amount.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b border-pastelbeige">
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:text-primary">I bought a used car privately and it has problems. Do I have any recourse?</AccordionTrigger>
                <AccordionContent className="font-paragraph text-foreground/70">Private sales are generally "buyer beware," but you can sue if the seller actively lied about the vehicle's condition, hid known defects, or rolled back the odometer. If they said "no accidents" and there were accidents, that's misrepresentation and grounds for a claim.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b border-pastelbeige">
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:text-primary">A business won't give me a refund. What can I do?</AccordionTrigger>
                <AccordionContent className="font-paragraph text-foreground/70">If a product is defective or doesn't match its description, you have legal rights to a refund regardless of the store's "policy." If they refuse, Small Claims Court is your remedy. The Sale of Goods Act and Consumer Protection Act often override store policies.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-b border-pastelbeige">
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:text-primary">Should I send a demand letter first?</AccordionTrigger>
                <AccordionContent className="font-paragraph text-foreground/70">Yes, it's usually a good idea. A formal demand letter on legal letterhead often produces results without court. It shows you're serious and gives the business a chance to resolve it. If they ignore it, the letter becomes evidence that you tried to resolve the matter before suing.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border-b border-pastelbeige">
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:text-primary">What if the contractor/business has disappeared?</AccordionTrigger>
                <AccordionContent className="font-paragraph text-foreground/70">You can still sue, but collecting may be difficult. We can help locate defendants through various searches. If they were operating illegally (unlicensed contractor, etc.), there may be other avenues like regulatory complaints or, for dealerships, the Motor Vehicle Dealers Compensation Fund.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Don't Let Bad Businesses Get Away With It</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">Free consultation to assess your consumer dispute. We'll tell you if you have a case and what to expect.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Free Case Assessment <ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary-foreground/10"><Phone className="w-5 h-5" /> (519) 601-1127</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
