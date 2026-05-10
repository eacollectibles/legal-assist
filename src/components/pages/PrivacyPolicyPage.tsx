import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Shield, Mail, Phone, FileText, Lock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EMAIL_PRIMARY, PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact';

export default function PrivacyPolicyPage() {
  const lastUpdated = 'May 10, 2026';

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Privacy Policy | LegalAssist Paralegal Services Ontario"
        description="How LegalAssist collects, uses, stores, and protects your personal information. PIPEDA-compliant privacy practices for our paralegal services in Ontario."
        canonical="https://www.legalassist.london/privacy"
      />
      <Header />

      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="font-paragraph text-foreground/70">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="w-full py-12 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-8 space-y-8 font-paragraph text-foreground/80 leading-relaxed">

          <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
            <p className="text-foreground">
              LegalAssist Paralegal Services ("we," "us," or "our") respects your privacy and is
              committed to protecting your personal information. This Privacy Policy explains
              what information we collect, how we use it, and your rights under Canadian privacy
              law and the Law Society of Ontario's confidentiality requirements.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">1. Who We Are</h2>
            <p>
              LegalAssist Paralegal Services is operated by Jean-Francois "Johnny" Demers,
              Licensed Paralegal (LSO #P22020) and Candice Fogarty, Licensed Paralegal
              (LSO #P21479). We are licensed by the Law Society of Ontario under By-Law 4 and
              regulated by the Paralegal Rules of Conduct and By-Law 7.1.
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              <li>Email: <a href={`mailto:${EMAIL_PRIMARY}`} className="text-primary hover:underline">{EMAIL_PRIMARY}</a></li>
              <li>Phone: <a href={PHONE_HREF} className="text-primary hover:underline">{PHONE_DISPLAY}</a></li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">2. Personal Information We Collect</h2>
            <p className="mb-3">We collect personal information from you when you:</p>
            <ul className="space-y-2 list-disc pl-6">
              <li>Submit a contact form, free-consultation request, or intake form</li>
              <li>Create a client portal account or upload documents</li>
              <li>Sign a retainer or pay an invoice</li>
              <li>Communicate with us by email, phone, text, or in person</li>
              <li>Engage us to represent you before a tribunal or court</li>
            </ul>
            <p className="mt-3">The information typically includes your name, contact details,
              date of birth, government-issued ID (where required for client identification under
              LSO By-Law 7.1), payment details, and information about your legal matter
              (including documents you provide to us).</p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">3. How We Use Your Information</h2>
            <p className="mb-3">We use your personal information to:</p>
            <ul className="space-y-2 list-disc pl-6">
              <li>Open and maintain a client file under LSO By-Law 7.1</li>
              <li>Run conflict-of-interest checks before retainer (Paralegal Rules of Conduct r. 3.04)</li>
              <li>Verify your identity and source of funds (LSO By-Law 7.1, Part III)</li>
              <li>Provide legal services, prepare documents, and represent you at tribunals or courts</li>
              <li>Communicate with you about your file (status updates, hearing dates, etc.)</li>
              <li>Process payments and maintain trust-account records (By-Law 9)</li>
              <li>Comply with our regulatory, recordkeeping, and tax obligations</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">4. Solicitor-Client Confidentiality</h2>
            <p>
              Information you share with us in connection with a legal matter is protected by
              paralegal-client confidentiality under Rule 3.03 of the Paralegal Rules of
              Conduct and (where applicable) by paralegal-client privilege. We will not disclose
              confidential information about you or your matter except (a) with your express or
              implied consent, (b) where required by law (e.g., a subpoena or court order),
              (c) where required by the Paralegal Rules (e.g., to prevent imminent serious
              harm), or (d) where strictly necessary to defend ourselves in a Law Society
              complaint or fee dispute.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">5. Disclosure to Third Parties</h2>
            <p className="mb-3">We may share your information with:</p>
            <ul className="space-y-2 list-disc pl-6">
              <li><strong>Tribunals and courts</strong> where you have authorized us to file documents on your behalf (e.g., the Landlord and Tenant Board, Small Claims Court, Human Rights Tribunal of Ontario).</li>
              <li><strong>Opposing parties or their representatives</strong> as part of normal litigation correspondence and disclosure obligations.</li>
              <li><strong>Service providers</strong> we use to operate our practice, including:
                <ul className="list-disc pl-6 mt-1">
                  <li>Wix (website and client-portal hosting; data resides on Wix infrastructure)</li>
                  <li>Cloudflare (web infrastructure)</li>
                  <li>Square Inc. (payment processing - we do not store full card numbers)</li>
                  <li>Email and document-delivery providers used to send your file documents</li>
                </ul>
              </li>
              <li><strong>Regulators</strong> (the Law Society of Ontario, FINTRAC, the CRA, or law enforcement) where required by law or LSO compliance.</li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> sell, rent, or trade your personal information.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">6. Storage, Security, and Retention</h2>
            <p>
              Client files are stored electronically on infrastructure that uses encryption in
              transit (HTTPS/TLS) and at rest. Access is limited to authorized firm personnel.
              We retain client files for at least 10 years from the date the file is closed, in
              accordance with LSO By-Law 9 and the limitation periods that apply to legal
              proceedings, and may retain them longer if there are subsisting trust funds or
              other regulatory requirements. Source-of-funds and ID-verification records are
              retained for a minimum of 6 years under FINTRAC and By-Law 7.1.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">7. Your Rights</h2>
            <p className="mb-3">Under PIPEDA and applicable Canadian privacy law, you have the right to:</p>
            <ul className="space-y-2 list-disc pl-6">
              <li>Request access to the personal information we hold about you</li>
              <li>Request correction of inaccurate or incomplete information</li>
              <li>Withdraw your consent to our continued use of your information (subject to
                  our regulatory recordkeeping obligations and the impact this may have on our
                  ability to continue representing you)</li>
              <li>File a complaint with our firm or with the Office of the Privacy
                  Commissioner of Canada at <a href="https://www.priv.gc.ca" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">priv.gc.ca</a></li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">8. Cookies and Site Analytics</h2>
            <p>
              Our website uses cookies and similar technologies to keep you signed in to the
              client portal, remember preferences, and measure aggregate site usage. Most
              browsers let you refuse cookies; doing so may break the client portal but will
              not prevent you from contacting us by phone, email, or text.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">9. Children</h2>
            <p>
              Our services are intended for adults (and clients with capacity to retain a
              paralegal). We do not knowingly collect personal information from children
              under 16 except in connection with a matter that affects them and in which a
              parent or guardian is the retaining client.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">10. Changes to this Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The "Last updated" date at
              the top of this page reflects the most recent revision. Material changes will be
              communicated through the website or directly to active clients.
            </p>
          </div>

          <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
            <div className="flex items-start gap-3 mb-3">
              <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-heading font-bold text-foreground mb-1">Contact Us About Privacy</h3>
                <p className="text-sm">
                  Questions, requests, or complaints about this Privacy Policy or our handling of
                  your personal information can be sent to{' '}
                  <a href={`mailto:${EMAIL_PRIMARY}`} className="text-primary hover:underline">{EMAIL_PRIMARY}</a>{' '}
                  or by phone at <a href={PHONE_HREF} className="text-primary hover:underline">{PHONE_DISPLAY}</a>.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link to="/contact" className="inline-flex items-center gap-2 text-primary hover:underline">
              Have a privacy question? Contact us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
