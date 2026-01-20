import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Gavel, Zap } from 'lucide-react';

export default function ParalegalVsLawyerPage() {
  useEffect(() => {
    document.title = 'Paralegal vs Lawyer: What\'s the Difference? | LegalAssist | Ontario';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              Paralegal vs. Lawyer
            </h1>
            <p className="font-paragraph text-lg text-foreground/80">
              Understanding the differences to help you choose the right legal professional for your matter.
            </p>
          </div>
        </div>
      </section>

      {/* Paralegals vs Lawyers Comparison Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6 text-center">
              Paralegals vs. Lawyers: Understanding the Differences
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 text-center">
              While both paralegals and lawyers provide legal services, there are important distinctions in their education, training, scope of practice, and costs. Understanding these differences will help you determine which professional is right for your legal needs.
            </p>
          </div>

          {/* Comparison Table - Desktop */}
          <div className="hidden md:block bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary text-secondary-foreground border-b border-gray-200">
                    <th className="px-6 py-4 text-left font-heading font-bold">Aspect</th>
                    <th className="px-6 py-4 text-left font-heading font-bold">Paralegals</th>
                    <th className="px-6 py-4 text-left font-heading font-bold">Lawyers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-heading font-semibold text-foreground">Education & Training</td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      2-year paralegal diploma or certificate program from an accredited institution; Licensing exam through Law Society of Ontario
                    </td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      3-year law degree (JD); Law school; Bar exam; Additional licensing requirements
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-heading font-semibold text-foreground">Licensing & Regulation</td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Licensed and regulated by the Law Society of Ontario; Must maintain professional liability insurance
                    </td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Licensed and regulated by the Law Society of Ontario; Must maintain professional liability insurance
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-heading font-semibold text-foreground">Scope of Practice</td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Limited to defined areas: Provincial Court criminal matters, Small Claims Court (up to $50,000), Landlord-Tenant Board, Human Rights Tribunal, and other specified tribunals
                    </td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Broad scope across all areas of law: Superior Court, Court of Appeal, family law, real estate, corporate law, and all tribunals
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-heading font-semibold text-foreground">Court Representation</td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Can represent clients in Provincial Court and Small Claims Court; Cannot appear in Superior Court or Court of Appeal
                    </td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Can represent clients in all courts including Superior Court, Court of Appeal, and Supreme Court of Canada
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-heading font-semibold text-foreground">Criminal Matters</td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Can handle summary conviction offences and provincial offences; Cannot handle indictable offences or serious criminal charges
                    </td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Can handle all criminal matters including summary conviction, indictable offences, and serious criminal charges
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-heading font-semibold text-foreground">Specialized Areas</td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Cannot provide services in family law, real estate conveyancing, wills, estates, or corporate law
                    </td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Can specialize in all areas including family law, real estate, wills, estates, corporate law, and more
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-heading font-semibold text-foreground">Cost</td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Generally more affordable; Hourly rates typically $100-250/hour depending on experience and location
                    </td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Generally more expensive; Hourly rates typically $200-500+/hour depending on experience and specialization
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-heading font-semibold text-foreground">Professional Conduct</td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Bound by Law Society of Ontario Rules of Professional Conduct; Subject to discipline and complaints procedures
                    </td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Bound by Law Society of Ontario Rules of Professional Conduct; Subject to discipline and complaints procedures
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-heading font-semibold text-foreground">Solicitor-Client Privilege</td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Communications are protected by solicitor-client privilege; Confidentiality is guaranteed
                    </td>
                    <td className="px-6 py-4 font-paragraph text-foreground/80">
                      Communications are protected by solicitor-client privilege; Confidentiality is guaranteed
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Comparison Cards - Mobile */}
          <div className="md:hidden space-y-4 mb-12">
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-heading font-bold text-base text-foreground mb-3">Education & Training</h3>
              <div className="space-y-3">
                <div className="bg-pastelgreen/20 rounded p-3">
                  <span className="text-xs font-semibold uppercase text-primary">Paralegal</span>
                  <p className="font-paragraph text-sm text-foreground/80 mt-1">2-year diploma; LSO licensing exam</p>
                </div>
                <div className="bg-pastelpeach/20 rounded p-3">
                  <span className="text-xs font-semibold uppercase text-secondary">Lawyer</span>
                  <p className="font-paragraph text-sm text-foreground/80 mt-1">3-year law degree (JD); Bar exam</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-heading font-bold text-base text-foreground mb-3">Scope of Practice</h3>
              <div className="space-y-3">
                <div className="bg-pastelgreen/20 rounded p-3">
                  <span className="text-xs font-semibold uppercase text-primary">Paralegal</span>
                  <p className="font-paragraph text-sm text-foreground/80 mt-1">Provincial Court, Small Claims (up to $50K), LTB, HRTO, specified tribunals</p>
                </div>
                <div className="bg-pastelpeach/20 rounded p-3">
                  <span className="text-xs font-semibold uppercase text-secondary">Lawyer</span>
                  <p className="font-paragraph text-sm text-foreground/80 mt-1">All courts including Superior Court, Court of Appeal, family law, real estate, corporate</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-heading font-bold text-base text-foreground mb-3">Court Representation</h3>
              <div className="space-y-3">
                <div className="bg-pastelgreen/20 rounded p-3">
                  <span className="text-xs font-semibold uppercase text-primary">Paralegal</span>
                  <p className="font-paragraph text-sm text-foreground/80 mt-1">Provincial Court and Small Claims Court only</p>
                </div>
                <div className="bg-pastelpeach/20 rounded p-3">
                  <span className="text-xs font-semibold uppercase text-secondary">Lawyer</span>
                  <p className="font-paragraph text-sm text-foreground/80 mt-1">All courts including Superior Court, Court of Appeal, Supreme Court</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-heading font-bold text-base text-foreground mb-3">Criminal Matters</h3>
              <div className="space-y-3">
                <div className="bg-pastelgreen/20 rounded p-3">
                  <span className="text-xs font-semibold uppercase text-primary">Paralegal</span>
                  <p className="font-paragraph text-sm text-foreground/80 mt-1">Summary conviction and provincial offences only</p>
                </div>
                <div className="bg-pastelpeach/20 rounded p-3">
                  <span className="text-xs font-semibold uppercase text-secondary">Lawyer</span>
                  <p className="font-paragraph text-sm text-foreground/80 mt-1">All criminal matters including indictable offences</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-heading font-bold text-base text-foreground mb-3">Cost</h3>
              <div className="space-y-3">
                <div className="bg-pastelgreen/20 rounded p-3">
                  <span className="text-xs font-semibold uppercase text-primary">Paralegal</span>
                  <p className="font-paragraph text-sm text-foreground/80 mt-1">$100-250/hour typically</p>
                </div>
                <div className="bg-pastelpeach/20 rounded p-3">
                  <span className="text-xs font-semibold uppercase text-secondary">Lawyer</span>
                  <p className="font-paragraph text-sm text-foreground/80 mt-1">$200-500+/hour typically</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-heading font-bold text-base text-foreground mb-3">Regulation</h3>
              <div className="bg-pastellavender/20 rounded p-3">
                <p className="font-paragraph text-sm text-foreground/80">
                  <strong>Both</strong> are licensed and regulated by the Law Society of Ontario, bound by professional conduct rules, maintain liability insurance, and protect solicitor-client privilege.
                </p>
              </div>
            </div>
          </div>

          {/* Key Differences Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* When to Choose a Paralegal */}
            <div className="bg-pastelgreen/20 rounded-lg p-8 border border-pastelgreen/30">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-8 h-8 text-primary" />
                <h3 className="font-heading text-2xl font-bold text-foreground">When to Choose a Paralegal</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">Your matter is in Provincial Court or Small Claims Court</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">You're dealing with a traffic ticket or provincial offence</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">You have a landlord-tenant dispute</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">You're facing a summary conviction criminal charge</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">You need representation at the Human Rights Tribunal</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">You want affordable legal representation for authorized matters</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">You need mediation or dispute resolution services</span>
                </li>
              </ul>
            </div>

            {/* When to Choose a Lawyer */}
            <div className="bg-pastelpeach/20 rounded-lg p-8 border border-pastelpeach/30">
              <div className="flex items-center gap-3 mb-6">
                <Gavel className="w-8 h-8 text-primary" />
                <h3 className="font-heading text-2xl font-bold text-foreground">When to Choose a Lawyer</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">Your matter involves Superior Court or Court of Appeal</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">You're facing serious criminal charges (indictable offences)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">You need family law services (divorce, custody, support)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">You need real estate or property law services</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">You need wills, estates, or probate services</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">You need corporate or business law services</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">Your matter requires specialized legal expertise</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-pastellavender/20 rounded-lg p-8 border border-pastellavender/30">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Important Notes</h3>
            <div className="space-y-4 font-paragraph text-foreground/80">
              <p>
                <strong>Both Are Regulated Professionals:</strong> Both paralegals and lawyers are licensed and regulated by the Law Society of Ontario. Both must adhere to strict professional conduct standards and ethical obligations. Both maintain professional liability insurance and are subject to discipline procedures.
              </p>
              <p>
                <strong>Solicitor-Client Privilege:</strong> Communications with both paralegals and lawyers are protected by solicitor-client privilege, meaning they cannot be forced to disclose what you tell them without your consent.
              </p>
              <p>
                <strong>Cost Savings:</strong> Paralegals typically charge lower hourly rates than lawyers, making them an affordable option for matters within their scope of practice. This can result in significant cost savings for clients.
              </p>
              <p>
                <strong>Scope Limitations:</strong> Paralegals cannot handle all legal matters. If your matter falls outside their scope of practice, you will need to retain a lawyer. We are transparent about our limitations and will refer you to a lawyer when necessary.
              </p>
              <p>
                <strong>Referrals Available:</strong> If you need services outside the paralegal scope of practice, we can refer you to experienced lawyers who can assist with your matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-r from-primary/10 to-pastelbeige/30">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-6">
            Ready to Get Professional Legal Help?
          </h2>
          <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            Our licensed paralegals are ready to assist you with your legal matter. Schedule a free consultation today to discuss your situation and determine if paralegal services are right for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph px-8 py-4 rounded-lg transition-all hover:bg-primary/90"
            >
              Contact Us Today
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/services"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph px-8 py-4 rounded-lg transition-all hover:bg-primary/5"
            >
              View Our Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
