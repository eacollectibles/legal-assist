import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { ChevronRight, CheckCircle, AlertCircle, FileText, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TrafficTicketsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Traffic Ticket Paralegal | Fight Speeding Tickets | London Ontario"
        description="Fight your traffic ticket with a licensed paralegal in London, Ontario. Speeding, careless driving, stunt driving defence. Reduce fines & demerit points."
        canonical="https://www.legalassist.london/services/traffic-tickets"
      />
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
                Traffic Tickets Defense
              </h1>
              <p className="font-paragraph text-lg text-foreground/80 mb-8">
                Expert legal representation for traffic violations in Ontario. Our experienced paralegals help minimize fines, demerit points, and insurance impacts through skilled defense and negotiation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/booking">
                  <Button className="bg-primary hover:bg-primary/90 text-white w-full">
                    Schedule Consultation
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 w-full">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://static.wixstatic.com/media/99571b_6548a66107d74dd58e4c9db1af6e49bf~mv2.png?id=traffic-tickets-hero"
                alt="Ontario traffic court with Canadian flag and Ontario Court of Justice signage"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="mb-12">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">
              What Are Traffic Violations?
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-6">
              Traffic violations in Ontario are prosecuted under the Highway Traffic Act and can result in significant consequences including fines, demerit points, license suspension, and increased insurance premiums. Even minor violations can have lasting impacts on your driving record and financial situation.
            </p>
            <p className="font-paragraph text-lg text-foreground/80">
              Our firm specializes in defending against traffic charges, working to reduce or eliminate penalties through evidence review, procedural challenges, and skilled negotiation with prosecutors. We understand the Ontario Court of Justice system and work to achieve the best possible outcomes for our clients.
            </p>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">4-8</div>
              <p className="font-paragraph text-foreground/80">Weeks to Court Date</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">Demerit</div>
              <p className="font-paragraph text-foreground/80">Point Reduction Strategies</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">HTA</div>
              <p className="font-paragraph text-foreground/80">Highway Traffic Act Expertise</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">OCJ</div>
              <p className="font-paragraph text-foreground/80">Ontario Court of Justice</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services for Drivers */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            Services for Drivers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Services List */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Speeding Violations
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Defense against speeding charges, including challenging radar/laser evidence and identifying procedural errors in enforcement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Careless Driving Defense
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Aggressive defense against careless driving charges, which carry serious consequences including license suspension and criminal record.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Traffic Signal Violations
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Representation for failure to obey traffic signals, red light camera tickets, and stop sign violations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Stunt Driving Charges
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Specialized defense against stunt driving charges (racing, excessive speeding), which carry mandatory license suspension.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Additional Services */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Lane Change & Unsafe Passing
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Defense against improper lane change and unsafe passing violations with evidence review and witness examination.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Parking Violations
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Challenge parking tickets and bylaw violations, including challenging the validity of parking enforcement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Equipment & Safety Violations
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Defense against seatbelt, equipment, and safety violations including headlight and brake violations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Prosecutor Negotiation
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Skilled negotiation with Crown prosecutors to reduce charges, withdraw tickets, or minimize penalties and demerit points.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services for Respondents */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            Why Choose Our Defense
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Demerit Point Reduction
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      We focus on minimizing demerit points, which directly impact your insurance rates and license status.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <DollarSign className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Insurance Impact Minimization
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Reducing or eliminating convictions helps protect your insurance rates from significant increases.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Evidence Review & Challenges
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Thorough examination of police evidence, including radar/laser calibration, officer training, and procedural compliance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Court Representation
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Full representation in Ontario Court of Justice, including cross-examination of police witnesses and presenting your defense.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Procedural Expertise
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Knowledge of Ontario Court of Justice procedures, disclosure requirements, and Charter rights protections.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Negotiation Skills
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Experienced negotiators who work with Crown prosecutors to achieve favorable resolutions before trial.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Affordable Rates
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Flat fees for most traffic matters, making professional representation accessible and predictable.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Proven Results
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Track record of successful outcomes including charge withdrawals, acquittals, and significant penalty reductions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Traffic Court Process Overview */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            The Traffic Court Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Ticket Review',
                description: 'We review your ticket, analyze the charges, and assess potential defenses and negotiation opportunities.'
              },
              {
                step: '2',
                title: 'Evidence Analysis',
                description: 'Obtain and review police evidence, including radar/laser records, officer notes, and any video evidence.'
              },
              {
                step: '3',
                title: 'Negotiation & Preparation',
                description: 'Negotiate with Crown prosecutors and prepare your defense strategy for the best possible outcome.'
              },
              {
                step: '4',
                title: 'Court Appearance',
                description: 'Full representation at your court date, including cross-examination and presenting your defense.'
              }
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm h-full">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="font-paragraph text-foreground/80">
                    {item.description}
                  </p>
                </div>
                {item.step !== '4' && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ChevronRight className="w-6 h-6 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: 'What are demerit points and how do they affect me?',
                a: 'Demerit points are recorded on your driving record for traffic violations. Accumulating 15 or more points within 2 years can result in license suspension. Points also increase insurance premiums significantly.'
              },
              {
                q: 'How much will a traffic ticket cost?',
                a: 'Fines vary by violation type, ranging from $40 for minor violations to $500+ for serious charges. We can provide an estimate based on your specific ticket.'
              },
              {
                q: 'Can I fight a traffic ticket?',
                a: 'Yes, you have the right to contest any traffic charge. We review the evidence and identify defenses such as procedural errors, equipment calibration issues, or Charter violations.'
              },
              {
                q: 'What happens if I just pay the ticket?',
                a: 'Paying the ticket is an admission of guilt, resulting in a conviction, demerit points, and increased insurance rates. It\'s often better to fight the charge.'
              },
              {
                q: 'How long does a traffic case take?',
                a: 'Most traffic cases are resolved within 4-8 weeks from ticket to court date. Some cases may be resolved sooner through negotiation with prosecutors.'
              },
              {
                q: 'What if I was speeding in a school zone?',
                a: 'School zone speeding carries double demerit points. We focus on challenging the evidence or negotiating reduced charges to minimize the impact on your record.'
              }
            ].map((item, index) => (
              <div key={index} className="bg-pastelbeige/10 rounded-lg p-6 border border-pastelbeige/30">
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                  {item.q}
                </h3>
                <p className="font-paragraph text-foreground/80">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-r from-primary/10 to-pastelbeige/30">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-6">
            Protect Your Driving Record
          </h2>
          <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            Don't let a traffic ticket impact your insurance rates and driving record. Our experienced team is here to fight for the best possible outcome in your case.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button className="bg-primary hover:bg-primary/90 text-white w-full">
                Schedule Your Consultation
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 w-full">
                Back to Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
