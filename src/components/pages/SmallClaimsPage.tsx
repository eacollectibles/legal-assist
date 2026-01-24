import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, Users, FileText, Clock, DollarSign } from 'lucide-react';
import { FAQSection } from '@/components/FAQSection';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import CallProcessBox from '@/components/CallProcessBox';

export default function SmallClaimsPage() {
  const authorityItems = [
    {
      title: 'Comprehensive Case Evaluation',
      description: 'We thoroughly assess your claim, evaluate its strength, and develop a winning strategy tailored to your specific situation.'
    },
    {
      title: 'Expert Document Preparation',
      description: 'Professional preparation of claims, affidavits, and all required court documents to ensure compliance and maximum impact.'
    },
    {
      title: 'Proven Track Record',
      description: 'Track record of successful outcomes including favorable judgments, settlements, and significant compensation recoveries.'
    }
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Initial Consultation',
      description: 'We review your case, assess its merits, and discuss your goals and options.'
    },
    {
      step: '2',
      title: 'Case Preparation',
      description: 'Gather evidence, prepare documents, and develop a comprehensive strategy.'
    },
    {
      step: '3',
      title: 'Settlement Attempts',
      description: 'Negotiate with the opposing party to resolve the matter favorably if possible.'
    }
  ];

  const reassuranceItems = [
    {
      icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />,
      title: 'Full Court Representation',
      description: 'Full representation at trial, including presenting your case, examining witnesses, and cross-examining the defendant.'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />,
      title: 'Judgment Enforcement',
      description: 'Assistance with post-judgment enforcement to ensure you collect the awarded compensation.'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />,
      title: 'Ongoing Consultation',
      description: 'Continuous support and advice throughout your case to keep you informed and confident.'
    }
  ];

  const pricingAndNextStepSection = (
    <div className="w-full py-16 md:py-24 bg-white">
      <div className="max-w-[100rem] mx-auto px-4 md:px-8">
        <div className="mb-12">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-6">
            What is Small Claims Court?
          </h2>
          <p className="font-paragraph text-lg text-foreground/80 mb-6">
            Small Claims Court is an accessible division of the Ontario Court of Justice designed to resolve civil disputes efficiently and affordably. It handles claims up to $50,000, making it ideal for individuals and small businesses seeking compensation for various disputes.
          </p>
          <p className="font-paragraph text-lg text-foreground/80">
            Our firm specializes in representing both applicants and defendants, ensuring your rights are protected and your case is presented effectively before the court.
          </p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
            <div className="text-4xl font-bold text-primary mb-2">$50,000</div>
            <p className="font-paragraph text-foreground/80">Maximum Claim Amount</p>
          </div>
          <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
            <div className="text-4xl font-bold text-primary mb-2">6-12</div>
            <p className="font-paragraph text-foreground/80">Months Average Timeline</p>
          </div>
          <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
            <div className="text-4xl font-bold text-primary mb-2">Lower</div>
            <p className="font-paragraph text-foreground/80">Court Fees vs. Superior Court</p>
          </div>
          <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
            <div className="text-4xl font-bold text-primary mb-2">Accessible</div>
            <p className="font-paragraph text-foreground/80">Self-Representation Friendly</p>
          </div>
        </div>
      </div>
    </div>
  );

  const faqAndRelatedSection = (
    <>
      <FAQSection />
      <RelatedServices services={relatedServicesConfig.smallClaims} />
    </>
  );

  return (
    <>
      <SEO 
        title="Small Claims Court Paralegal | Claims up to $50,000 | London Ontario"
        description="Expert Small Claims Court representation in London, Ontario. Licensed paralegal for debt recovery, contract disputes & property damage claims up to $50,000. Free consultation."
        canonical="https://www.legalassist.london/services/small-claims-court"
      />
      <ServicePageLayout
        seoTitle="Small Claims Court Paralegal | Claims up to $50,000 | London Ontario"
        seoDescription="Expert Small Claims Court representation in London, Ontario. Licensed paralegal for debt recovery, contract disputes & property damage claims up to $50,000. Free consultation."
        canonical="https://www.legalassist.london/services/small-claims-court"
        problemHeadline="Small Claims Court Paralegal in Ontario"
        problemDescription="Expert legal representation for civil disputes up to $50,000 in Ontario. Whether you're an applicant seeking compensation or a defendant protecting your interests, we provide comprehensive support throughout the entire process."
        heroImage={{
          src: "https://static.wixstatic.com/media/99571b_4477a5a9ef4f48cc8e3416990393a421~mv2.png?id=small-claims-hero",
          alt: "Canadian Small Claims Court in Ontario with Canadian flag and coat of arms"
        }}
        authorityItems={authorityItems}
        processSteps={processSteps}
        reassuranceItems={reassuranceItems}
        faqSection={faqAndRelatedSection}
      >
        {pricingAndNextStepSection}
      </ServicePageLayout>
    </>
  );
}
