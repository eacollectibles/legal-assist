import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { FileText, AlertCircle, Scale, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EMAIL_PRIMARY, PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact';

export default function TermsOfUsePage() {
  const lastUpdated = 'May 10, 2026';

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Terms of Use | Legal Assist Paralegal Services Ontario"
        description="Terms governing your use of the Legal Assist website, client portal, and online services. Notice that website use does not create a paralegal-client relationship."
        canonical="https://www.legalassist.london/terms"
      />
      <Header />

      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Terms of Use</h1>
          <p className="font-paragraph text-foreground/70">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="w-full py-12 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-8 space-y-8 font-paragraph text-foreground/80 leading-relaxed">

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-700 flex-shrink-0 mt-0.5" />
              <p className="text-yellow-900">
                <strong>Important:</strong> Use of this website does not by itself create a
                paralegal-client relationship. A paralegal-client relationship is formed only
                after a conflict-of-interest check has been completed, a written retainer has
                been signed by both parties, and any required retainer fee has been received.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">1. About These Terms</h2>
            <p>
              These Terms of Use ("Terms") govern your access to and use of the Legal Assist
              website at legalassist.london (the "Site"), the client portal, and any online
              services we offer. The Site is operated by Jean-Francois Demers (LSO #P22020) and
              Candice Fogarty (LSO #P21479), Licensed Paralegals regulated by the Law Society
              of Ontario. By accessing the Site you agree to these Terms.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">2. Information Is Not Legal Advice</h2>
            <p>
              The information on the Site - including service-area pages, blog posts, FAQs,
              guides, and templates - is provided for general information only. It is not legal
              advice and should not be relied on as legal advice for any specific situation.
              Legal outcomes depend heavily on the facts of each case, applicable legislation,
              and ongoing changes in law. If you need advice about your particular matter,
              please contact us for a consultation or speak with a licensed paralegal or
              lawyer in your jurisdiction.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">3. Scope of Paralegal Practice</h2>
            <p>
              In Ontario, licensed paralegals may represent clients in defined areas under
              Law Society of Ontario By-Law 4. These include the Small Claims Court (claims
              up to $50,000), the Landlord and Tenant Board, the Human Rights Tribunal of
              Ontario, summary-conviction Provincial Offences and certain Criminal Code matters
              where Crown election is summary, and other specified administrative tribunals.
              Paralegals do not practise family law, real-estate transactions, wills and
              estates, or appeals to higher courts beyond their statutory scope. Where your
              matter falls outside paralegal scope, we will tell you and refer you to a lawyer.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">4. No Guarantee of Outcomes</h2>
            <p>
              Every case turns on its specific evidence and the discretion of the tribunal or
              court. We do not and cannot guarantee any specific outcome. Where we describe
              "typical outcomes" or general probabilities on the Site, those statements are
              general information about how cases of that type tend to resolve - not a promise
              about your case.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">5. Account and Client Portal</h2>
            <p className="mb-3">If you create an account in our client portal, you agree to:</p>
            <ul className="space-y-2 list-disc pl-6">
              <li>Provide accurate registration information and keep it current</li>
              <li>Maintain the confidentiality of your password and not share it with others</li>
              <li>Notify us promptly of any unauthorized use of your account</li>
              <li>Use the portal only for purposes related to your file with our firm</li>
              <li>Not upload malware, illegal content, or content that infringes the rights of others</li>
            </ul>
            <p className="mt-3">
              We may suspend or close accounts that violate these Terms or that are
              inactive for an extended period.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">6. Communications and Confidentiality</h2>
            <p>
              Email, text, and web-form communications are not perfectly secure. Information
              you send to us through the Site or by ordinary email is treated as confidential
              under the Paralegal Rules of Conduct, but you should not include highly sensitive
              information (such as government ID numbers) in unsecured email - upload them
              through the client portal or deliver them in person instead. Until a retainer is
              signed, communications with us may not be subject to paralegal-client privilege
              and we cannot guarantee confidentiality of pre-retainer communications.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">7. Intellectual Property</h2>
            <p>
              The Site (including text, graphics, layout, code, blog posts, and templates) is
              owned by Legal Assist Paralegal Services or licensed for our use. You may view,
              download, and print Site content for personal, non-commercial use. You may not
              republish, redistribute, or scrape Site content for commercial purposes without
              written permission. Trademarks, logos, and service marks displayed on the Site
              are the property of their respective owners.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">8. Third-Party Links</h2>
            <p>
              The Site may link to third-party websites (e.g., the Law Society of Ontario,
              Tribunals Ontario, government resources). We do not control those sites and are
              not responsible for their content, accuracy, or privacy practices. Following a
              third-party link is at your own risk.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">9. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Legal Assist Paralegal Services and its
              licensed paralegals are not liable for any indirect, incidental, consequential,
              or punitive damages arising from your use of the Site. Nothing in these Terms
              limits liability for fraud, professional misconduct, or any liability that cannot
              lawfully be limited or excluded. Your use of the Site is at your own risk; the
              Site is provided on an "as is" basis.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">10. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the Province of Ontario and the federal
              laws of Canada applicable in Ontario. Any dispute arising out of or relating to
              the Site or these Terms is subject to the exclusive jurisdiction of the courts
              of Ontario.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">11. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. The "Last updated" date at the top
              of this page reflects the most recent revision. Continued use of the Site after a
              change means you accept the revised Terms.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">12. Complaints</h2>
            <p>
              If you have a concern about a paralegal at our firm, you may contact us
              directly first. You may also contact the Law Society of Ontario at{' '}
              <a href="https://lso.ca" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">lso.ca</a>{' '}
              or at 1-800-668-7380.
            </p>
          </div>

          <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
            <div className="flex items-start gap-3">
              <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-heading font-bold text-foreground mb-1">Contact Us</h3>
                <p className="text-sm">
                  Questions about these Terms?{' '}
                  <a href={`mailto:${EMAIL_PRIMARY}`} className="text-primary hover:underline">{EMAIL_PRIMARY}</a>{' '}
                  | <a href={PHONE_HREF} className="text-primary hover:underline">{PHONE_DISPLAY}</a>
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link to="/privacy" className="inline-flex items-center gap-2 text-primary hover:underline mr-6">
              Privacy Policy
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 text-primary hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
