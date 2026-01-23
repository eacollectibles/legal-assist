import { ArrowRight, Stamp, CheckCircle, Clock, DollarSign, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';

export default function NotaryPublicPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Notary Public Services | Document Notarization | London Ontario"
        description="Certified notary public in London, Ontario. Notarize affidavits, statutory declarations, certified true copies & international documents. Same-day service."
        canonical="https://www.legalassist.london/services/notary-public"
      />
      <Header />
      
      <main className="w-full">
        {/* Hero Section */}
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
                Notary Public Services
              </h1>
              <p className="font-paragraph text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Professional notarization of documents, affidavits, and statutory declarations with certified expertise.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="w-full py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                  What is a Notary Public?
                </h2>
                <p className="font-paragraph text-lg text-secondary/80 mb-4 leading-relaxed">
                  A notary public is an official authorized to witness the signing of documents, administer oaths, and certify the authenticity of signatures. Notarization adds a layer of legal credibility to important documents and is often required for international transactions, real estate matters, and legal proceedings.
                </p>
                <p className="font-paragraph text-lg text-secondary/80 mb-6 leading-relaxed">
                  Our experienced notary public provides professional, efficient services at competitive rates. Whether you need a single document notarized or multiple documents for a transaction, we're here to assist you with expertise and attention to detail.
                </p>
                <div className="flex gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph px-8 py-4 rounded-lg transition-all"
                  >
                    Book an Appointment
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Image
                  src="https://static.wixstatic.com/media/99571b_df17fea496c94fbfa4d9b440d3a97917~mv2.png?id=notary-public-hero"
                  alt="Notary Public Services"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Offered */}
        <section className="w-full bg-secondary/5 py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Notary Services
              </h2>
              <p className="font-paragraph text-lg text-secondary/70 max-w-2xl mx-auto">
                Comprehensive notarization services for all your document authentication needs.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Document Notarization & Witnessing',
                  description: 'Professional witnessing and certification of document signatures with official notary seal.'
                },
                {
                  title: 'Affidavit Preparation & Administration',
                  description: 'Complete preparation and administration of affidavits for legal proceedings and court submissions.'
                },
                {
                  title: 'Statutory Declaration Witnessing',
                  description: 'Official witnessing of statutory declarations with proper certification and documentation.'
                },
                {
                  title: 'Signature Verification & Certification',
                  description: 'Verification of signatures and issuance of official certification for authentication purposes.'
                },
                {
                  title: 'International Document Authentication',
                  description: 'Document authentication for international use, including apostille services where applicable.'
                },
                {
                  title: 'Certified Copies',
                  description: 'Creation of certified copies of original documents with official notary certification.'
                },
                {
                  title: 'Power of Attorney Witnessing',
                  description: 'Professional witnessing of power of attorney documents with proper legal certification.'
                },
                {
                  title: 'Loan Document Notarization',
                  description: 'Notarization of loan documents and financial agreements with complete accuracy and compliance.'
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all border border-gray-100"
                >
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="font-paragraph text-secondary/70">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Information */}
        <section className="w-full py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-pastelbeige/30 p-8 rounded-lg border border-pastelbeige"
              >
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                  Cost Information
                </h3>
                <p className="font-paragraph text-secondary/70">
                  Affordable per-document notarization fees. Volume discounts available for multiple documents. Rates are competitive and transparent with no hidden charges.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-pastelgreen/30 p-8 rounded-lg border border-pastelgreen"
              >
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                  Timeline
                </h3>
                <p className="font-paragraph text-secondary/70">
                  Most notarizations completed same-day or within 24 hours. Flexible appointments available to accommodate your schedule and convenience.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-pastellavender/30 p-8 rounded-lg border border-pastellavender"
              >
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                  Eligibility
                </h3>
                <p className="font-paragraph text-secondary/70">
                  Open to anyone requiring notarization services. Bring valid government-issued ID and the documents requiring notarization.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="w-full bg-secondary/5 py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                What You Need to Bring
              </h2>
              <p className="font-paragraph text-lg text-secondary/70 max-w-2xl mx-auto">
                To ensure a smooth notarization process, please prepare the following items.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-2">
                    Valid Government-Issued ID
                  </h3>
                  <p className="font-paragraph text-secondary/70">
                    Passport, driver's license, or other official identification document.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-2">
                    Documents to Notarize
                  </h3>
                  <p className="font-paragraph text-secondary/70">
                    Original documents requiring notarization and signature.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-2">
                    Completed Forms
                  </h3>
                  <p className="font-paragraph text-secondary/70">
                    Any required forms or affidavits should be completed before your appointment.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-2">
                    Pen for Signature
                  </h3>
                  <p className="font-paragraph text-secondary/70">
                    Bring a pen to sign documents during the notarization process.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="w-full py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Notarization Process
              </h2>
              <p className="font-paragraph text-lg text-secondary/70 max-w-2xl mx-auto">
                A straightforward, professional process designed for your convenience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: '1',
                  title: 'Schedule Appointment',
                  description: 'Contact us to book a convenient time for your notarization.'
                },
                {
                  step: '2',
                  title: 'Prepare Documents',
                  description: 'Gather your documents and valid ID before your appointment.'
                },
                {
                  step: '3',
                  title: 'Meet & Verify',
                  description: 'We verify your identity and review your documents carefully.'
                },
                {
                  step: '4',
                  title: 'Notarize & Seal',
                  description: 'Sign documents and apply official notary seal and signature.'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4 font-heading font-bold text-lg">
                      {item.step}
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="font-paragraph text-sm text-secondary/70">
                      {item.description}
                    </p>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary/20 transform -translate-y-1/2" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full bg-secondary/5 py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="font-paragraph text-lg text-secondary/70 max-w-2xl mx-auto">
                Common questions about our notary public services.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {[
                {
                  question: 'How long does notarization take?',
                  answer: 'Most notarizations are completed within 15-30 minutes, depending on the number of documents and complexity.'
                },
                {
                  question: 'What documents can be notarized?',
                  answer: 'We can notarize most documents including affidavits, powers of attorney, loan documents, and statutory declarations.'
                },
                {
                  question: 'Do I need an appointment?',
                  answer: 'While walk-ins are sometimes accommodated, we recommend scheduling an appointment to ensure availability.'
                },
                {
                  question: 'What ID is acceptable?',
                  answer: 'Valid government-issued photo ID such as passport, driver\'s license, or provincial ID card is required.'
                },
                {
                  question: 'Can you notarize documents for international use?',
                  answer: 'Yes, we provide notarization for international documents and can assist with apostille services where applicable.'
                },
                {
                  question: 'What is the cost?',
                  answer: 'Notarization fees are affordable and competitive. Contact us for specific pricing based on your document needs.'
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                >
                  <h3 className="font-heading font-bold text-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="font-paragraph text-secondary/70">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full bg-gradient-to-br from-primary via-primary to-secondary py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Get Your Documents Notarized?
              </h2>
              <p className="font-paragraph text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Schedule an appointment with our professional notary public today. We're here to make the process quick and easy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-primary-foreground hover:bg-primary-foreground/90 text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all"
                >
                  Book Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:4165550123"
                  className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 font-paragraph font-semibold px-8 py-4 rounded-lg transition-all"
                >
                  Call Us
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
