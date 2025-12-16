import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { ChevronRight, CheckCircle, AlertCircle, FileText, Clock, DollarSign, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FederalHumanRightsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
                Federal Human Rights Commission Services
              </h1>
              <p className="font-paragraph text-lg text-foreground/80 mb-8">
                Expert representation for discrimination complaints in federally regulated industries. We navigate the Canadian Human Rights Act and Commission processes to advocate for your rights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/booking">
                  <Button className="bg-primary hover:bg-primary/90 text-white w-full">
                    Get Started Today
                  </Button>
                </Link>
                <Link to="/booking">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 w-full">
                    Schedule Consultation
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://static.wixstatic.com/media/99571b_49f6982ca3874aae93ce8e745bececa4~mv2.png?id=federal-human-rights-hero"
                alt="Federal Human Rights Commission"
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
              What is the Canadian Human Rights Commission?
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-6">
              The Canadian Human Rights Commission (CHRC) handles discrimination complaints in federally regulated industries and against federal agencies. These include banking, telecommunications, interprovincial transportation, federal government employment, and other sectors under federal jurisdiction.
            </p>
            <p className="font-paragraph text-lg text-foreground/80">
              Federal human rights complaints follow different procedures than provincial complaints and require specialized knowledge of the Canadian Human Rights Act. Our paralegals have experience navigating these complex federal processes to effectively advocate for your rights.
            </p>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-3xl font-bold text-primary mb-2">Federal Jurisdiction</div>
              <p className="font-paragraph text-foreground/80">Banking, telecom, transportation & more</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-3xl font-bold text-primary mb-2">18-36 Months</div>
              <p className="font-paragraph text-foreground/80">Typical timeline to resolution</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-3xl font-bold text-primary mb-2">Specialized</div>
              <p className="font-paragraph text-foreground/80">Canadian Human Rights Act expertise</p>
            </div>
          </div>
        </div>
      </section>

      {/* Important Disclaimer Section */}
      <section className="w-full py-16 md:py-20 bg-gradient-to-br from-pastelpeach/10 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="bg-white rounded-lg border-l-4 border-primary p-8 shadow-sm">
            <div className="flex gap-4">
              <AlertCircle className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Important Information About Paralegal Services</h3>
                <p className="font-paragraph text-foreground/80 mb-4">
                  All paralegals providing services are licensed and regulated by the Law Society of Ontario. We are authorized to represent clients in federal human rights complaints before the Canadian Human Rights Commission. However, certain matters may require lawyer involvement, particularly at the tribunal hearing stage or for complex legal arguments.
                </p>
                <p className="font-paragraph text-foreground/80">
                  We work transparently with clients to identify when lawyer involvement is necessary and can refer you to qualified legal counsel when needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Scope Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">What We Can Help With</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* What's Included */}
            <div className="bg-pastelgreen/10 rounded-lg p-8 border border-pastelgreen/30">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-8 h-8 text-primary" />
                <h3 className="font-heading text-2xl font-bold text-foreground">Services Included</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Initial complaint assessment and eligibility review</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Complaint preparation and filing with CHRC</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Evidence gathering and documentation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Communication with CHRC investigators</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Settlement negotiation support</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Preparation for tribunal proceedings</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Client representation and advocacy throughout process</span>
                </li>
              </ul>
            </div>

            {/* What's Not Included */}
            <div className="bg-pastelpeach/10 rounded-lg p-8 border border-pastelpeach/30">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-8 h-8 text-primary" />
                <h3 className="font-heading text-2xl font-bold text-foreground">Limitations & Scope</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Providing legal advice (lawyer consultation may be needed)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Tribunal hearing representation (may require lawyer)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Complex legal arguments and precedent analysis</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Appeals to Federal Court of Appeal</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="font-paragraph text-foreground/80">Matters outside federal jurisdiction</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Complaints */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">Types of Federal Discrimination Complaints</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex gap-4 mb-4">
                <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-heading text-xl font-bold text-foreground">Employment Discrimination</h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">
                Discrimination based on protected grounds in federally regulated employment, including hiring, promotion, termination, harassment, and workplace accommodation failures.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex gap-4 mb-4">
                <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-heading text-xl font-bold text-foreground">Disability Accommodation</h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">
                Failure to accommodate employees or service users with disabilities in federally regulated sectors such as banking, telecommunications, and federal government.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex gap-4 mb-4">
                <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-heading text-xl font-bold text-foreground">Harassment & Retaliation</h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">
                Harassment based on protected grounds and retaliation for filing human rights complaints in federally regulated workplaces and services.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex gap-4 mb-4">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-heading text-xl font-bold text-foreground">Service Discrimination</h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-4">
                Discrimination in access to federally regulated services, including banking, transportation, telecommunications, and other services under federal jurisdiction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-pastelbeige/30 rounded-lg p-8 border border-pastelbeige h-full">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4">1</div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Initial Consultation</h3>
                <p className="font-paragraph text-foreground/80">
                  We assess your complaint, determine federal jurisdiction, and explain the CHRC process and timeline.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-pastelbeige/30 rounded-lg p-8 border border-pastelbeige h-full">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4">2</div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Complaint Filing & Investigation</h3>
                <p className="font-paragraph text-foreground/80">
                  We prepare and file your complaint with the CHRC, gather evidence, and support you through the investigation phase.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-pastelbeige/30 rounded-lg p-8 border border-pastelbeige h-full">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4">3</div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Resolution & Tribunal</h3>
                <p className="font-paragraph text-foreground/80">
                  We negotiate settlements or prepare for tribunal proceedings, advocating for your rights throughout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline & Costs Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">Timeline & Costs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-8 h-8 text-primary" />
                <h3 className="font-heading text-2xl font-bold text-foreground">Estimated Timeline</h3>
              </div>
              <div className="space-y-4 font-paragraph text-foreground/80">
                <div>
                  <p className="font-semibold text-foreground mb-1">Initial Assessment: 1-2 weeks</p>
                  <p className="text-sm">Review complaint eligibility and federal jurisdiction</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Complaint Filing: 2-4 weeks</p>
                  <p className="text-sm">Prepare and submit complaint to CHRC</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Investigation Phase: 6-12 months</p>
                  <p className="text-sm">CHRC investigates and gathers evidence</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Resolution/Tribunal: 6-18 months</p>
                  <p className="text-sm">Settlement negotiation or tribunal hearing</p>
                </div>
                <p className="text-sm italic pt-4 border-t border-gray-200">Total: 18-36 months from complaint to resolution</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-8 h-8 text-primary" />
                <h3 className="font-heading text-2xl font-bold text-foreground">Cost Structure</h3>
              </div>
              <div className="space-y-4 font-paragraph text-foreground/80">
                <div>
                  <p className="font-semibold text-foreground mb-1">Hourly Rates</p>
                  <p className="text-sm">Competitive rates starting at $150-200/hour depending on complexity</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Flat Fees Available</p>
                  <p className="text-sm">For specific services like complaint preparation and filing</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Reduced Fees</p>
                  <p className="text-sm">Available for vulnerable clients and cases with strong merit</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Initial Consultation</p>
                  <p className="text-sm">Free 30-minute consultation to assess your complaint</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="bg-pastelgreen/10 rounded-lg p-8 border border-pastelgreen/30">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-3xl font-bold text-foreground">Eligibility for Federal Human Rights Complaints</h2>
            </div>
            <div className="space-y-4 font-paragraph text-foreground/80">
              <p>
                To file a complaint with the Canadian Human Rights Commission, your situation must meet the following criteria:
              </p>
              <ul className="space-y-3 ml-4">
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span>The respondent (person/organization you're complaining about) is under federal jurisdiction (banking, telecom, interprovincial transportation, federal government, etc.)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span>The discrimination is based on a protected ground (race, color, national or ethnic origin, religious belief, age, sex, sexual orientation, gender identity, marital status, family status, disability, conviction for an offence)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span>The discrimination occurred in employment, provision of goods/services, or other federally regulated area</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                  <span>The complaint is filed within one year of the alleged discrimination (with limited exceptions)</span>
                </li>
              </ul>
              <p className="pt-4 border-t border-pastelgreen/30">
                <strong>Not sure if your situation qualifies?</strong> Contact us for a free consultation to assess your federal human rights complaint.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-secondary/5 py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Pursue Your Federal Human Rights Complaint?
          </h2>
          <p className="font-paragraph text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation to discuss your federal human rights complaint and explore your options.
          </p>
          <Link to="/booking">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg">
              Schedule Your Free Consultation
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
