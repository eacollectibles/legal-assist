import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Phone, Home, AlertCircle, CheckCircle, Users, Scale, Shield, Ban, FileText } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function HousingDiscriminationPage() {
  useEffect(() => {
    document.title = 'Housing Discrimination Claims | Human Rights Tribunal Ontario | London Paralegal';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Denied housing because of race, disability, family status, or income source? File a human rights complaint. Licensed paralegal in London, Ontario helps tenants fight discrimination. Free consultation.');
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
              <Home className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Human Rights Tribunal • Housing</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Housing Discrimination in Ontario</h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">Everyone has the right to equal treatment in housing. If a landlord refused to rent to you, evicted you, or treated you differently because of who you are, you may have a human rights complaint.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Free Consultation <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5"><Phone className="w-5 h-5" /> (519) 601-1127</a>
            </div>
          </div>
        </div>
      </section>

      {/* What's Illegal */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">What Is Housing Discrimination?</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">The Ontario Human Rights Code protects tenants from discrimination in all aspects of housing.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Ban, title: 'Refusal to Rent', desc: 'Landlord won\'t rent to you because of your race, family status, disability, income source, or other protected ground.' },
              { icon: AlertCircle, title: 'Different Terms', desc: 'Charging higher rent, requiring larger deposits, or imposing different rules based on who you are.' },
              { icon: Home, title: 'Eviction', desc: 'Being evicted or pressured to leave because of a protected characteristic like having children or a disability.' },
              { icon: Users, title: 'Harassment', desc: 'Landlord or other tenants making offensive comments or creating a hostile environment based on protected grounds.' },
              { icon: Shield, title: 'Failure to Accommodate', desc: 'Refusing reasonable modifications for disability (e.g., grab bars, ramps, service animals).' },
              { icon: FileText, title: 'Discriminatory Ads', desc: '"No children," "working professionals only," or ads that exclude people based on protected grounds.' },
            ].map((item, index) => (
              <div key={index} className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Cases */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Common Housing Discrimination Cases</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 border border-pastelbeige shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">Families with Children</h3>
              <p className="font-paragraph text-foreground/70 mb-4">Landlords cannot refuse to rent based on having children, regardless of the building type. "Adult only" buildings are illegal in Ontario.</p>
              <p className="font-paragraph text-foreground/50 text-sm italic">Common excuses: "not suitable for children," "noise concerns," "adult lifestyle building"</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-pastelbeige shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">Income Source Discrimination</h3>
              <p className="font-paragraph text-foreground/70 mb-4">Refusing to rent to someone because they receive ODSP, Ontario Works, housing subsidies, or other social assistance is illegal.</p>
              <p className="font-paragraph text-foreground/50 text-sm italic">Common excuses: "we don't accept government assistance," "must have employment income"</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-pastelbeige shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">Disability Accommodation</h3>
              <p className="font-paragraph text-foreground/70 mb-4">Landlords must accommodate disabilities — allowing service animals, permitting modifications, accepting rent payment accommodations.</p>
              <p className="font-paragraph text-foreground/50 text-sm italic">Common violations: "no pets" applied to service animals, refusing ramps or grab bars</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-pastelbeige shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">Race & Ethnic Origin</h3>
              <p className="font-paragraph text-foreground/70 mb-4">Discrimination based on race, colour, ancestry, place of origin, or ethnic background in any aspect of housing is prohibited.</p>
              <p className="font-paragraph text-foreground/50 text-sm italic">May be overt or subtle — patterns of treatment matter</p>
            </div>
          </div>
        </div>
      </section>

      {/* Receipt of Social Assistance */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Your Right to Housing on Social Assistance</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">"Receipt of public assistance" is a protected ground under the Ontario Human Rights Code.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="font-heading text-xl font-bold text-green-800 mb-4 flex items-center gap-2"><CheckCircle className="w-5 h-5" /> You Have the Right To</h3>
              <ul className="space-y-2 font-paragraph text-green-900">
                <li>• Apply for any rental without disclosing income source</li>
                <li>• Be evaluated on ability to pay, not source of income</li>
                <li>• Equal terms and conditions as other tenants</li>
                <li>• Have rent paid directly by housing programs</li>
                <li>• Not be evicted for receiving assistance</li>
              </ul>
            </div>
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h3 className="font-heading text-xl font-bold text-red-800 mb-4 flex items-center gap-2"><AlertCircle className="w-5 h-5" /> Landlords Cannot</h3>
              <ul className="space-y-2 font-paragraph text-red-900">
                <li>• Ask if you receive social assistance before renting</li>
                <li>• Require "employment income" or "pay stubs"</li>
                <li>• Refuse because rent is paid by ODSP/OW</li>
                <li>• Charge higher deposits to assistance recipients</li>
                <li>• Treat you differently once they learn your income source</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Evidence */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Building Your Case</h2>
          
          <div className="max-w-3xl mx-auto">
            <p className="font-paragraph text-foreground/70 text-center mb-8">Housing discrimination can be hard to prove because landlords rarely admit it. Document everything:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Rental ads and listings',
                'Emails and text messages',
                'Voicemails (record if legal)',
                'Witness statements',
                'Timeline of events',
                'Records of who was shown the unit',
                'Similar units rented to others',
                'Your rental application',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-white rounded-lg p-4 border border-pastelbeige">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="font-paragraph text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-pastelbeige">
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:text-primary">A landlord said they don't rent to people on ODSP. Is that legal?</AccordionTrigger>
                <AccordionContent className="font-paragraph text-foreground/70">No, that's illegal discrimination based on receipt of public assistance. You can file a human rights complaint. Document what was said, when, and by whom. Even verbal statements can be evidence.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b border-pastelbeige">
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:text-primary">The landlord said "no pets" but I have a service dog. Can they refuse?</AccordionTrigger>
                <AccordionContent className="font-paragraph text-foreground/70">No. Service animals are not "pets" under the law. Landlords must accommodate service animals for people with disabilities. They cannot charge pet deposits for service animals. If refused, this is disability discrimination.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b border-pastelbeige">
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:text-primary">Can a landlord refuse to rent to me because I have kids?</AccordionTrigger>
                <AccordionContent className="font-paragraph text-foreground/70">No. Family status is a protected ground. "Adult only" buildings are illegal in Ontario (with narrow exceptions for seniors' housing). Landlords cannot refuse, evict, or treat you differently because you have children.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-b border-pastelbeige">
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:text-primary">How long do I have to file a complaint?</AccordionTrigger>
                <AccordionContent className="font-paragraph text-foreground/70">You must file within one year of the discrimination. Don't wait — contact us as soon as possible while evidence is fresh and witnesses remember what happened.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border-b border-pastelbeige">
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:text-primary">What can I get if I win a housing discrimination case?</AccordionTrigger>
                <AccordionContent className="font-paragraph text-foreground/70">The Tribunal can order monetary compensation for injury to dignity (typically $5,000-$35,000), out-of-pocket expenses (moving costs, rent differences), and orders requiring the landlord to change practices. In some cases, they can order the landlord to rent to you.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Housing Is a Human Right</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">If you've been denied housing or treated unfairly, we can help. Free confidential consultation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">Free Consultation <ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:+15196011127" className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary-foreground/10"><Phone className="w-5 h-5" /> (519) 601-1127</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
