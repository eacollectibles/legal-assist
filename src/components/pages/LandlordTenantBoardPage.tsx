import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { ChevronRight, CheckCircle, Users, FileText, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandlordTenantBoardPage() {
  useEffect(() => {
    document.title = 'Landlord Tenant Board Paralegal | LTB Representation | London Ontario';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Licensed paralegal for Landlord and Tenant Board matters in London, Ontario. Eviction defence, rent disputes, N4/N12 applications & LTB hearings. Free consultation.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Landlord Tenant Board Paralegal | LTB Representation | London Ontario"
        description="Licensed paralegal for Landlord and Tenant Board matters in London, Ontario. Eviction defence, rent disputes, N4/N12 applications & LTB hearings. Free consultation."
        canonical="https://www.legalassist.london/services/landlord-tenant-board"
      />
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
                Landlord and Tenant Board Services
              </h1>
              <p className="font-paragraph text-lg text-foreground/80 mb-8">
                Expert legal representation for residential tenancy disputes in Ontario. Whether you're a landlord seeking eviction or a tenant defending your rights, we provide comprehensive support throughout the LTB process.
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
                src="https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png?id=landlord-tenant-hero"
                alt="Ontario Landlord and Tenant Board hearing room with Canadian flag"
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
              What is the Landlord and Tenant Board?
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-6">
              The Landlord and Tenant Board (LTB) is an independent tribunal in Ontario that resolves disputes between landlords and tenants under the Residential Tenancies Act. It handles a wide range of residential tenancy matters, from evictions to rent disputes, maintenance issues, and lease violations.
            </p>
            <p className="font-paragraph text-lg text-foreground/80">
              Our firm specializes in representing both landlords and tenants, ensuring your rights are protected and your case is presented effectively before the tribunal. We understand the complexities of residential tenancy law and work to achieve fair outcomes for our clients.
            </p>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">30-60</div>
              <p className="font-paragraph text-foreground/80">Days to Hearing</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">Accessible</div>
              <p className="font-paragraph text-foreground/80">Specialized Tribunal</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">RTA</div>
              <p className="font-paragraph text-foreground/80">Residential Tenancies Act</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">Both</div>
              <p className="font-paragraph text-foreground/80">Landlord & Tenant Support</p>
            </div>
          </div>

          {/* Common LTB Violations & Disputes Section */}
          <div>
            <h3 className="font-heading text-3xl font-bold text-foreground mb-8">
              Common LTB Violations & Dispute Types
            </h3>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">
              The Landlord and Tenant Board addresses a wide range of residential tenancy disputes. Below are common violations and issues that fall under the LTB's jurisdiction:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Non-Payment of Rent',
                  description: 'Eviction applications for unpaid rent, including arrears, late payments, and disputes over rent amounts owed.'
                },
                {
                  title: 'Illegal Rent Increases',
                  description: 'Rent increases that exceed the annual guideline, lack proper notice, or violate the Residential Tenancies Act.'
                },
                {
                  title: 'Maintenance & Repair Breaches',
                  description: 'Landlord failure to maintain the rental unit in good condition, including heating, plumbing, electrical, and structural issues.'
                },
                {
                  title: 'Lease Violations by Tenants',
                  description: 'Tenant breaches including noise complaints, unauthorized occupants, pets in violation of lease, and property damage.'
                },
                {
                  title: 'Illegal Entry & Lockouts',
                  description: 'Landlord entry without proper notice, lockouts, and other violations of tenant right to quiet enjoyment.'
                },
                {
                  title: 'Improper Eviction Notices',
                  description: 'Eviction notices that lack proper notice periods, contain procedural errors, or are issued without valid grounds.'
                },
                {
                  title: 'Security Deposit Disputes',
                  description: 'Improper withholding of security deposits, failure to return deposits, and disputes over deductions claimed.'
                },
                {
                  title: 'Illegal Charges & Key Money',
                  description: 'Landlord collection of illegal charges, key money, or other fees prohibited under the Residential Tenancies Act.'
                },
                {
                  title: 'Harassment & Intimidation',
                  description: 'Landlord harassment, threats, intimidation, or other conduct designed to force tenant departure.'
                },
                {
                  title: 'Discrimination',
                  description: 'Discrimination based on protected grounds including race, gender, disability, family status, or other prohibited characteristics.'
                },
                {
                  title: 'Retaliation',
                  description: 'Landlord retaliation against tenants for asserting rights, filing complaints, or participating in tenant organizations.'
                },
                {
                  title: 'Unauthorized Occupants',
                  description: 'Disputes over additional occupants in the rental unit beyond those authorized in the lease agreement.'
                },
                {
                  title: 'Utilities & Services Disputes',
                  description: 'Disputes over utility costs, disconnection of services, or failure to provide included services.'
                },
                {
                  title: 'Rent Abatement Claims',
                  description: 'Tenant claims for rent reduction due to maintenance breaches, lack of services, or other landlord failures.'
                },
                {
                  title: 'Eviction for Personal Use',
                  description: 'Landlord eviction of tenant for personal use, family member occupancy, or property renovation.'
                },
                {
                  title: 'Subletting & Assignment Disputes',
                  description: 'Disputes over tenant rights to sublet or assign the lease, including landlord consent requirements.'
                },
                {
                  title: 'Noise & Nuisance Complaints',
                  description: 'Complaints about excessive noise, disruptive behavior, or other conduct interfering with other tenants\' enjoyment.'
                },
                {
                  title: 'Pet-Related Disputes',
                  description: 'Disputes over pet policies, unauthorized pets, pet damage claims, and pet-related lease violations.'
                },
                {
                  title: 'Parking & Common Area Issues',
                  description: 'Disputes over parking rights, common area access, and maintenance of shared facilities.'
                },
                {
                  title: 'Lease Termination & End of Tenancy',
                  description: 'Disputes over lease termination, end of tenancy procedures, and final inspections and move-out conditions.'
                }
              ].map((violation, idx) => (
                <div key={idx} className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige hover:shadow-md transition-shadow">
                  <h4 className="font-heading text-lg font-bold text-foreground mb-2">
                    {violation.title}
                  </h4>
                  <p className="font-paragraph text-foreground/80 text-sm">
                    {violation.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services for Landlords */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            Services for Landlords
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Services List */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Eviction Applications
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Professional preparation and filing of eviction applications for non-payment of rent, lease violations, or end of tenancy notices.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Rent Increase Disputes
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Representation in disputes over rent increases, including compliance with guideline limits and proper notice requirements.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Lease Violation Claims
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Documentation and presentation of lease violation claims, including noise complaints, unauthorized occupants, and property damage.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      LTB Hearing Representation
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Full representation at LTB hearings, including presenting evidence, examining witnesses, and cross-examining tenants.
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
                      Enforcement Assistance
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Guidance on enforcing LTB orders, including eviction enforcement and collection of awarded amounts.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Lease Drafting & Review
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Review and guidance on lease agreements to ensure compliance with the Residential Tenancies Act and protection of your interests.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Maintenance & Repair Disputes
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Defense against maintenance complaints and guidance on your obligations under the Residential Tenancies Act.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Deposit & Key Money Issues
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Guidance on proper handling of security deposits and compliance with rules regarding key money and other charges.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services for Tenants */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            Services for Tenants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Eviction Defense
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Strong defense against eviction applications, including challenging improper notice and identifying procedural errors.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Rent Increase Challenges
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Challenge illegal or improper rent increases that exceed the guideline or lack proper notice.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Maintenance & Repair Claims
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Assert your right to a safe, well-maintained rental unit and claim rent abatement for breaches of maintenance obligations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <DollarSign className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Illegal Entry & Lockout Defense
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Protection against illegal entry, lockouts, and other violations of your right to quiet enjoyment of the rental unit.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Deposit Recovery
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Recovery of improperly withheld security deposits and claims for damages to your deposit.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Harassment & Discrimination Defense
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Protection against landlord harassment, discrimination, and retaliation for asserting your rights.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      LTB Hearing Representation
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Full representation at LTB hearings, including presenting your case and cross-examining the landlord's evidence.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Rights Education & Guidance
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Clear explanation of your rights under the Residential Tenancies Act and guidance on protecting yourself.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LTB Process Overview */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            The LTB Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Application Filing',
                description: 'We prepare and file your application with the LTB, ensuring all required documents are included and deadlines are met.'
              },
              {
                step: '2',
                title: 'Notice & Service',
                description: 'Proper service of documents on the other party according to LTB rules and procedures.'
              },
              {
                step: '3',
                title: 'Pre-Hearing Preparation',
                description: 'We gather evidence, organize documents, and prepare your case for the hearing.'
              },
              {
                step: '4',
                title: 'Hearing & Decision',
                description: 'Full representation at the hearing and assistance with implementing the LTB order.'
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
                q: 'What types of disputes does the LTB handle?',
                a: 'The LTB handles disputes under the Residential Tenancies Act, including evictions, rent increases, maintenance issues, lease violations, deposit disputes, and illegal lockouts.'
              },
              {
                q: 'How long does an LTB hearing take?',
                a: 'Hearings typically take 30-60 days to schedule from the application date. The hearing itself may last from 30 minutes to several hours depending on complexity.'
              },
              {
                q: 'Can I represent myself at the LTB?',
                a: 'Yes, self-representation is allowed, but having experienced representation significantly improves your chances of a favorable outcome.'
              },
              {
                q: 'What is the cost of filing at the LTB?',
                a: 'Filing fees vary based on the type of application, typically ranging from $45 to $170. We can advise you on the specific fee for your situation.'
              },
              {
                q: 'Can I appeal an LTB decision?',
                a: 'Limited appeals are available on questions of law or procedural errors. We can assess whether your case qualifies for appeal.'
              },
              {
                q: 'What happens if the other party doesn\'t show up to the hearing?',
                a: 'The LTB may proceed with the hearing in the absence of the other party, though they may request a postponement. We can advise on the implications for your case.'
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
            Protect Your Rights at the LTB
          </h2>
          <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            Whether you're a landlord seeking to enforce your rights or a tenant defending against unfair treatment, our experienced team is here to guide you through the LTB process.
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
