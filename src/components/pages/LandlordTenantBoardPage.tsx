import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, Users, FileText, Clock, DollarSign } from 'lucide-react';
import { FAQSection } from '@/components/FAQSection';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import CallProcessBox from '@/components/CallProcessBox';

export default function LandlordTenantBoardPage() {
  const authorityItems = [
    {
      title: 'Residential Tenancies Act Expertise',
      description: 'Deep knowledge of Ontario\'s Residential Tenancies Act and LTB procedures, ensuring your case is presented effectively.'
    },
    {
      title: 'Dual Representation',
      description: 'We represent both landlords and tenants, understanding the perspectives and rights of both parties in residential disputes.'
    },
    {
      title: 'Proven LTB Success',
      description: 'Track record of successful outcomes in eviction defenses, rent disputes, and maintenance claims before the LTB.'
    }
  ];

  const processSteps = [
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
    }
  ];

  const reassuranceItems = [
    {
      icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />,
      title: 'Full Hearing Representation',
      description: 'Complete representation at the hearing and assistance with implementing the LTB order.'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />,
      title: 'Rights Education',
      description: 'Clear explanation of your rights under the Residential Tenancies Act and guidance on protecting yourself.'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />,
      title: 'Enforcement Assistance',
      description: 'Guidance on enforcing LTB orders, including eviction enforcement and collection of awarded amounts.'
    }
  ];

  return (
    <>
      <SEO 
        title="Landlord Tenant Board Paralegal | LTB Representation | London Ontario"
        description="Licensed paralegal for Landlord and Tenant Board matters in London, Ontario. Eviction defence, rent disputes, N4/N12 applications & LTB hearings. Free consultation."
        canonical="https://www.legalassist.london/services/landlord-tenant-board"
      />
      <ServicePageLayout
        seoTitle="Landlord Tenant Board Paralegal | LTB Representation | London Ontario"
        seoDescription="Licensed paralegal for Landlord and Tenant Board matters in London, Ontario. Eviction defence, rent disputes, N4/N12 applications & LTB hearings. Free consultation."
        canonical="https://www.legalassist.london/services/landlord-tenant-board"
        problemHeadline="Landlord Tenant Paralegal in Ontario"
        problemDescription="Expert legal representation for residential tenancy disputes in Ontario. Whether you're a landlord seeking eviction or a tenant defending your rights, we provide comprehensive support throughout the LTB process."
        heroImage={{
          src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png?id=landlord-tenant-hero",
          alt: "Ontario Landlord and Tenant Board hearing room with Canadian flag"
        }}
        authorityItems={authorityItems}
        processSteps={processSteps}
        reassuranceItems={reassuranceItems}
      >
        {/* Additional Content */}
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <CallProcessBox />
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-white">
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
        </div>

        <FAQSection />

        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
