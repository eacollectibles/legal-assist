import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { ChevronRight, CheckCircle, AlertCircle, FileText, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function IRBRepresentationPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Immigration & Refugee Board (IRB) Representation | Paralegal Services | London Ontario"
        description="Professional paralegal representation for Immigration & Refugee Board (IRB) matters in London, Ontario. Expert support for refugee claims, appeals, and immigration proceedings."
        canonical="https://www.legalassist.london/services/irb-representation"
      />
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
                Immigration & Refugee Board (IRB) Representation
              </h1>
              <p className="font-paragraph text-lg text-foreground/80 mb-8">
                Expert paralegal representation for Immigration & Refugee Board proceedings in Ontario. Our licensed paralegals provide skilled support for refugee claims, appeals, and immigration matters within paralegal scope of practice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
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
                src="https://static.wixstatic.com/media/99571b_9fa42e322198405e99bb64e32bcb73ed~mv2.png?originWidth=576&originHeight=384"
                alt="Immigration & Refugee Board representation - Professional legal support for refugee claims and immigration proceedings"
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
              What is the Immigration & Refugee Board (IRB)?
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-6">
              The Immigration and Refugee Board of Canada (IRB) is an independent administrative tribunal that makes decisions on immigration and refugee matters. The IRB has four divisions that handle different types of cases, including refugee protection claims, immigration appeals, and detention reviews.
            </p>
            <p className="font-paragraph text-lg text-foreground/80 mb-6">
              Our firm provides paralegal support for IRB matters within the scope of practice authorized by the Law Society of Ontario. We work with individuals navigating the IRB process to ensure their cases are properly prepared and presented.
            </p>
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 mt-8">
              <div className="flex gap-4">
                <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading text-lg font-bold text-destructive mb-2">Important Scope Limitation & Disclaimer</h3>
                  <p className="font-paragraph text-foreground/80 mb-4">
                    <strong>Paralegals cannot provide legal representation before the Immigration and Refugee Board (IRB).</strong> Immigration and refugee matters are complex federal matters that require representation by a lawyer or a Regulated Canadian Immigration Consultant (RCIC) who is licensed by Immigration, Refugees and Citizenship Canada (IRCC).
                  </p>
                  <p className="font-paragraph text-foreground/80 mb-4">
                    Our paralegal services are limited to pre-IRB support, document preparation, and information gathering. For actual representation before the IRB, you must retain a qualified lawyer or RCIC. We can provide referrals to immigration lawyers and RCICs as needed.
                  </p>
                  <p className="font-paragraph text-foreground/80">
                    <strong>This service is informational only and does not constitute legal advice. Do not rely on paralegal services for immigration matters requiring formal representation.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">Federal Tribunal</div>
              <p className="font-paragraph text-foreground/80">Immigration & Refugee Board</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">Complex</div>
              <p className="font-paragraph text-foreground/80">Requires Lawyer or RCIC</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">Pre-IRB Support</div>
              <p className="font-paragraph text-foreground/80">Paralegal Services Available</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">Expert Referrals</div>
              <p className="font-paragraph text-foreground/80">Immigration Lawyers & RCICs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-16 md:py-24 bg-pastelbeige/10">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12 text-center">
            Paralegal Support Services for IRB Matters
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">Document Preparation & Organization</h3>
              </div>
              <p className="font-paragraph text-foreground/80">
                Assistance with gathering, organizing, and preparing supporting documents for IRB proceedings. We help ensure all required documentation is complete and properly formatted.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">Case Assessment & Information</h3>
              </div>
              <p className="font-paragraph text-foreground/80">
                Initial assessment of your situation and provision of general information about IRB processes. We help you understand what to expect and what documentation may be needed.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">Timeline & Process Guidance</h3>
              </div>
              <p className="font-paragraph text-foreground/80">
                Explanation of IRB timelines, deadlines, and procedural requirements. We help you understand the steps involved in your specific matter.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">Lawyer & RCIC Referrals</h3>
              </div>
              <p className="font-paragraph text-foreground/80">
                Referrals to qualified immigration lawyers and Regulated Canadian Immigration Consultants (RCICs) who can provide formal representation before the IRB.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IRB Divisions Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            IRB Divisions & Matters
          </h2>
          
          <div className="space-y-8">
            <div className="border-l-4 border-primary pl-6">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-3">Refugee Protection Division (RPD)</h3>
              <p className="font-paragraph text-foreground/80 mb-4">
                The RPD hears claims from individuals who fear persecution in their home country. These are complex matters requiring detailed evidence and legal arguments about international refugee law.
              </p>
              <ul className="space-y-2 ml-4">
                <li className="font-paragraph text-foreground/80 flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>Refugee status determination</span>
                </li>
                <li className="font-paragraph text-foreground/80 flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>Convention refugee claims</span>
                </li>
                <li className="font-paragraph text-foreground/80 flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>Person in need of protection claims</span>
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-3">Immigration Appeal Division (IAD)</h3>
              <p className="font-paragraph text-foreground/80 mb-4">
                The IAD hears appeals from individuals who have been refused permanent residence or have received deportation orders. These appeals require strong legal arguments and evidence.
              </p>
              <ul className="space-y-2 ml-4">
                <li className="font-paragraph text-foreground/80 flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>Permanent residence refusals</span>
                </li>
                <li className="font-paragraph text-foreground/80 flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>Deportation order appeals</span>
                </li>
                <li className="font-paragraph text-foreground/80 flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>Sponsorship appeals</span>
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-3">Immigration Division (ID)</h3>
              <p className="font-paragraph text-foreground/80 mb-4">
                The ID conducts admissibility hearings and detention reviews for individuals in immigration proceedings. These matters require prompt action and strong advocacy.
              </p>
              <ul className="space-y-2 ml-4">
                <li className="font-paragraph text-foreground/80 flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>Admissibility hearings</span>
                </li>
                <li className="font-paragraph text-foreground/80 flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>Detention reviews</span>
                </li>
                <li className="font-paragraph text-foreground/80 flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>Release hearings</span>
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-3">Security Division (SD)</h3>
              <p className="font-paragraph text-foreground/80 mb-4">
                The SD conducts security clearance reviews for individuals who may be inadmissible on security grounds. These are highly specialized matters.
              </p>
              <ul className="space-y-2 ml-4">
                <li className="font-paragraph text-foreground/80 flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>Security clearance reviews</span>
                </li>
                <li className="font-paragraph text-foreground/80 flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>Inadmissibility determinations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full py-16 md:py-24 bg-pastelbeige/10">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12 text-center">
            Why Choose Our Paralegal Services for Pre-IRB Support?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 border border-gray-100">
              <CheckCircle className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">Licensed & Regulated</h3>
              <p className="font-paragraph text-foreground/80">
                Our paralegals are licensed by the Law Society of Ontario and bound by professional ethics and conduct standards.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100">
              <CheckCircle className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">Affordable Support</h3>
              <p className="font-paragraph text-foreground/80">
                Pre-IRB paralegal services are more affordable than full legal representation, helping you prepare before engaging a lawyer or RCIC.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-100">
              <CheckCircle className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">Expert Referrals</h3>
              <p className="font-paragraph text-foreground/80">
                We maintain relationships with qualified immigration lawyers and RCICs to refer you for formal representation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Important Disclaimer Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="bg-destructive/5 border-2 border-destructive/30 rounded-lg p-8">
            <h2 className="font-heading text-2xl font-bold text-destructive mb-6">
              ⚠️ Important Legal Disclaimer
            </h2>
            <div className="space-y-4 font-paragraph text-foreground/80">
              <p>
                <strong>Immigration and refugee matters are complex federal legal matters.</strong> The Immigration and Refugee Board (IRB) is a federal tribunal, and immigration law is governed by federal legislation including the Immigration and Refugee Protection Act (IRPA).
              </p>
              <p>
                <strong>Paralegals cannot provide legal representation before the IRB.</strong> Only lawyers and Regulated Canadian Immigration Consultants (RCICs) licensed by Immigration, Refugees and Citizenship Canada (IRCC) are authorized to represent clients before the IRB.
              </p>
              <p>
                <strong>Paralegal services are limited to pre-IRB support only,</strong> including document preparation, information gathering, and case assessment. These services do not constitute legal representation and should not be relied upon as a substitute for representation by a qualified lawyer or RCIC.
              </p>
              <p>
                <strong>This page is informational only</strong> and does not constitute legal advice. If you are facing IRB proceedings, you should immediately consult with a qualified immigration lawyer or RCIC to ensure your rights are protected.
              </p>
              <p>
                <strong>Failure to obtain proper legal representation in immigration matters can result in serious consequences,</strong> including deportation, loss of immigration status, and inability to return to Canada. Do not attempt to represent yourself or rely solely on paralegal services for IRB matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-primary via-primary to-secondary">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Need Help with Your IRB Matter?
          </h2>
          <p className="font-paragraph text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Contact us for pre-IRB paralegal support or referrals to qualified immigration lawyers and RCICs.
          </p>
          <Link to="/contact">
            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8 py-6">
              Schedule Consultation
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
