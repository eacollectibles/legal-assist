import { ArrowRight, Stamp, AlertTriangle, CheckCircle, XCircle, FileText, Info } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * Notary Public — informational landing page.
 *
 * IMPORTANT (LSO compliance): Licensed paralegals in Ontario are NOT Notaries
 * Public. They are appointed Commissioners for Taking Affidavits under the
 * Commissioners for Taking Affidavits Act, R.S.O. 1990, c. C.17. We keep this
 * URL alive (a) so existing inbound links and SEO traffic still resolve and
 * (b) so visitors searching for "notary public" get a clear, honest answer
 * about what a paralegal can and cannot do — and where to go for the things
 * we can't do.
 *
 * Per Law Society of Ontario Paralegal Rules of Conduct, Rule 8.02–8.03,
 * paralegals must not hold themselves out as offering services they are not
 * authorized to provide.
 */
export default function NotaryPublicPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Notary Public vs. Commissioner of Oaths in Ontario | Legal Assist"
        description="Looking for a Notary Public in Ontario? Read this first. Licensed paralegals are Commissioners for Taking Affidavits — not Notaries Public. Learn which one you actually need."
        canonical="https://www.legalassist.london/services/notary-public"
      />
      <Header />

      <main className="w-full">
        {/* Hero */}
        <section className="w-full bg-gradient-to-br from-primary via-primary to-secondary py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary-foreground text-primary rounded-full flex items-center justify-center mb-6 mx-auto">
                <Stamp className="w-8 h-8" />
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
                Notary Public or Commissioner of Oaths?
              </h1>
              <p className="font-paragraph text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto">
                Many people use the phrase &ldquo;notary public&rdquo; for any document signing — but in Ontario the two roles are different. Here&rsquo;s what each one does, and which one you likely need.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Honest Disclosure */}
        <section className="w-full py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-7 h-7 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-heading text-2xl font-bold text-amber-900 mb-3">
                    Please read before booking
                  </h2>
                  <p className="font-paragraph text-base md:text-lg text-amber-900/90 mb-3 leading-relaxed">
                    Licensed paralegals in Ontario are <strong>Commissioners for Taking Affidavits</strong>, appointed under the <em>Commissioners for Taking Affidavits Act</em>. We are <strong>not Notaries Public</strong> and we do not perform notarizations.
                  </p>
                  <p className="font-paragraph text-base md:text-lg text-amber-900/90 leading-relaxed">
                    If your document genuinely needs to be notarized (for example, an apostille, an international document, or a certified true copy of a passport), you need to see a <strong>lawyer</strong> or another appointed Notary Public. We&rsquo;ll happily point you to one.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Side-by-side comparison */}
        <section className="w-full bg-secondary/5 py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              Which one do you actually need?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Commissioner of Oaths column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-background rounded-xl border-2 border-primary p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                  <h3 className="font-heading text-2xl font-bold text-foreground">
                    Commissioner of Oaths
                  </h3>
                </div>
                <p className="font-paragraph text-sm text-primary font-semibold mb-4">
                  Available at our office.
                </p>
                <p className="font-paragraph text-foreground/80 mb-4 leading-relaxed">
                  A Commissioner for Taking Affidavits administers oaths and witnesses signatures on Ontario-domestic affidavits and statutory declarations.
                </p>
                <p className="font-paragraph text-sm font-semibold text-foreground mb-2">Use a Commissioner when you need to:</p>
                <ul className="space-y-2 mb-6">
                  {[
                    'Swear an affidavit for an Ontario tribunal or court',
                    'Sign a statutory declaration for a provincial form',
                    'Provide a sworn statement for an LTB / Small Claims / HRTO matter',
                    'Confirm identity for a domestic Ontario document',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <span className="font-paragraph text-sm text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/services/commissioner-of-oaths"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph font-semibold px-6 py-3 rounded-lg transition-all"
                >
                  See our Commissioner of Oaths services
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* Notary Public column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-background rounded-xl border-2 border-foreground/20 p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <XCircle className="w-8 h-8 text-foreground/60" />
                  <h3 className="font-heading text-2xl font-bold text-foreground">
                    Notary Public
                  </h3>
                </div>
                <p className="font-paragraph text-sm text-foreground/60 font-semibold mb-4">
                  Not offered at our office. See a lawyer.
                </p>
                <p className="font-paragraph text-foreground/80 mb-4 leading-relaxed">
                  A Notary Public can do everything a Commissioner can, plus notarize documents — meaning certifying signatures, copies, and documents for use outside Ontario.
                </p>
                <p className="font-paragraph text-sm font-semibold text-foreground mb-2">You need a Notary Public for:</p>
                <ul className="space-y-2 mb-6">
                  {[
                    'Documents going outside Ontario (other provinces, international)',
                    'Apostille / Authentication & Legalization',
                    'Certified true copies of passports, driver’s licences, diplomas',
                    'Powers of Attorney for use abroad',
                    'Real estate documents going outside Ontario (foreign mortgage, foreign sale, etc.) - domestic Ontario closings are handled by lawyers but do not normally require notarization',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-foreground/60 flex-shrink-0 mt-1" />
                      <span className="font-paragraph text-sm text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://www.lsrs.lso.ca/lsrs/welcome"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-foreground/20 hover:border-foreground/60 text-foreground font-paragraph font-semibold px-6 py-3 rounded-lg transition-all"
                >
                  Find a lawyer / notary (LSO directory)
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick FAQ */}
        <section className="w-full py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              Common questions
            </h2>

            <div className="space-y-4">
              <FAQItem
                q="Why isn't a paralegal a Notary Public?"
                a="In Ontario, the role of Notary Public is created by the Notaries Act and is held primarily by lawyers. Paralegals are licensed by the Law Society of Ontario under a separate framework (By-Law 4) and are appointed Commissioners for Taking Affidavits as part of their licence — but the Notaries Act does not extend to them."
              />
              <FAQItem
                q="Can a paralegal certify a true copy of my passport?"
                a="No. Certifying a true copy is a notarial act. A Notary Public (typically a lawyer) needs to do that. We can administer an oath if you want to swear an affidavit attaching a copy of the passport, but the certification of the copy itself requires a notary."
              />
              <FAQItem
                q="My court form just says 'Sworn before me' — do I need a notary?"
                a="Probably not. Most Ontario tribunal and court affidavits (LTB, Small Claims, HRTO, provincial offences court) only require a Commissioner for Taking Affidavits. We can do those at our office."
              />
              <FAQItem
                q="Where can I find a Notary Public in Ontario?"
                a="The Law Society of Ontario maintains a public directory of lawyers and paralegals at lsrs.lso.ca. Filter by your area and look for a lawyer offering notary services. Some community legal clinics also have lawyers on staff who can notarize. ServiceOntario does NOT provide notary services - it handles licensing, registration, and government IDs."
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full bg-gradient-to-br from-primary to-secondary py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <FileText className="w-12 h-12 text-primary-foreground mx-auto mb-4" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Need an oath or affidavit sworn for an Ontario matter?
            </h2>
            <p className="font-paragraph text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              That&rsquo;s something we can help with. Our Commissioner of Oaths service handles affidavits, statutory declarations, and consents for Ontario tribunals and courts.
            </p>
            <Link
              to="/services/commissioner-of-oaths"
              className="inline-flex items-center gap-2 bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-paragraph font-semibold px-8 py-4 rounded-lg transition-all"
            >
              Commissioner of Oaths services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Footnote */}
        <section className="w-full bg-background py-8 border-t border-foreground/10">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-foreground/50 flex-shrink-0 mt-0.5" />
              <p className="font-paragraph text-xs text-foreground/60 leading-relaxed">
                This page is provided by Legal Assist, an Ontario paralegal firm operated by Jean-Francois Demers (LSO #P22020) and Candice Fogarty (LSO #P21479). It is general information about the difference between Notaries Public and Commissioners for Taking Affidavits in Ontario, and is not legal advice for any particular situation. If you&rsquo;re unsure which kind of authentication your document requires, ask the agency, court, or institution that&rsquo;s asking for it.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-lg border border-foreground/10 p-5 bg-background">
      <h3 className="font-heading text-lg font-bold text-foreground mb-2">{q}</h3>
      <p className="font-paragraph text-sm text-foreground/80 leading-relaxed">{a}</p>
    </div>
  );
}
