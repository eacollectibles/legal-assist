import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, AlertCircle, FileText, Clock, DollarSign } from 'lucide-react';
import { FAQSection } from '@/components/FAQSection';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';

export default function TrafficTicketsPage() {
  const authorityItems = [
    {
      title: 'Demerit Point Reduction',
      description: 'We focus on minimizing demerit points, which directly impact your insurance rates and license status.'
    },
    {
      title: 'Evidence Review & Challenges',
      description: 'Thorough examination of police evidence, including radar/laser calibration, officer training, and procedural compliance.'
    },
    {
      title: 'Proven Results',
      description: 'Track record of successful outcomes including charge withdrawals, acquittals, and significant penalty reductions.'
    }
  ];

  const processSteps = [
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
    }
  ];

  const reassuranceItems = [
    {
      icon: <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />,
      title: 'Insurance Impact Minimization',
      description: 'Reducing or eliminating convictions helps protect your insurance rates from significant increases.'
    },
    {
      icon: <DollarSign className="w-6 h-6 text-primary flex-shrink-0 mt-1" />,
      title: 'Affordable Rates',
      description: 'Flat fees for most traffic matters, making professional representation accessible and predictable.'
    },
    {
      icon: <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />,
      title: 'Procedural Expertise',
      description: 'Knowledge of Ontario Court of Justice procedures, disclosure requirements, and Charter rights protections.'
    }
  ];

  return (
    <>
      <SEO 
        title="Traffic Ticket Paralegal | Fight Speeding Tickets | London Ontario"
        description="Fight your traffic ticket with a licensed paralegal in London, Ontario. Speeding, careless driving, stunt driving defence. Reduce fines & demerit points."
        canonical="https://www.legalassist.london/services/traffic-tickets"
      />
      <ServicePageLayout
        seoTitle="Traffic Ticket Paralegal | Fight Speeding Tickets | London Ontario"
        seoDescription="Fight your traffic ticket with a licensed paralegal in London, Ontario. Speeding, careless driving, stunt driving defence. Reduce fines & demerit points."
        canonical="https://www.legalassist.london/services/traffic-tickets"
        problemHeadline="Traffic Ticket Paralegal in Ontario"
        problemDescription="Expert legal representation for traffic violations in Ontario. Our experienced paralegals help minimize fines, demerit points, and insurance impacts through skilled defense and negotiation."
        heroImage={{
          src: "https://static.wixstatic.com/media/99571b_6548a66107d74dd58e4c9db1af6e49bf~mv2.png?id=traffic-tickets-hero",
          alt: "Ontario traffic court with Canadian flag and Ontario Court of Justice signage"
        }}
        authorityItems={authorityItems}
        processSteps={processSteps}
        reassuranceItems={reassuranceItems}
      >
        {/* Additional Content */}
        <div className="w-full py-16 md:py-24 bg-white">
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
        </div>

        <div className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
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
        </div>

        <FAQSection />

        <RelatedServices services={relatedServicesConfig.trafficTickets} />
      </ServicePageLayout>
    </>
  );
}
