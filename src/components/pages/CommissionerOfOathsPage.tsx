import { ArrowRight, CheckCircle, Clock, DollarSign, Users, Gavel } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';

export default function CommissionerOfOathsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Commissioner of Oaths | Affidavit Services | London Ontario"
        description="Licensed Commissioner of Oaths in London, Ontario. Administer oaths, affirmations & statutory declarations. Fast, professional service for legal documents."
        canonical="https://www.legalassist.ca/services/commissioner-of-oaths"
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
                <Gavel className="w-8 h-8" />
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
                Commissioner of Oaths
              </h1>
              <p className="font-paragraph text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Official administration of oaths and statutory declarations for legal proceedings with certified expertise and legal compliance.
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
                  What is a Commissioner of Oaths?
                </h2>
                <p className="font-paragraph text-lg text-secondary/80 mb-4 leading-relaxed">
                  A Commissioner of Oaths is a legal official authorized to administer oaths and affirmations, and to witness statutory declarations. This service is essential for legal proceedings, court documents, and matters requiring sworn statements under penalty of perjury.
                </p>
                <p className="font-paragraph text-lg text-secondary/80 mb-6 leading-relaxed">
                  When you swear an oath before our Commissioner of Oaths, you are making a legally binding commitment to tell the truth. This carries serious legal consequences if false information is provided. Our experienced commissioner ensures proper procedure and documentation for all matters, providing the legal credibility your documents require.
                </p>
                <div className="flex gap-4">
                  <Link
                    to="/booking"
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
                  src="https://static.wixstatic.com/media/99571b_ac8e6a387b054b7b9b641d85cae3048c~mv2.png?id=commissioner-of-oaths-hero"
                  alt="Commissioner of Oaths Services"
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
                Our Commissioner of Oaths Services
              </h2>
              <p className="font-paragraph text-lg text-secondary/70 max-w-2xl mx-auto">
                Comprehensive oath administration and statutory declaration services for all your legal needs.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Oath and Affirmation Administration',
                  description: 'Official administration of oaths and affirmations for legal proceedings, court documents, and official purposes.'
                },
                {
                  title: 'Statutory Declaration Witnessing',
                  description: 'Professional witnessing and certification of statutory declarations with proper legal documentation and compliance.'
                },
                {
                  title: 'Affidavit Preparation and Administration',
                  description: 'Complete preparation and administration of affidavits for court submissions and legal proceedings.'
                },
                {
                  title: 'Solemn Declaration Witnessing',
                  description: 'Official witnessing of solemn declarations with proper certification for legal and official use.'
                },
                {
                  title: 'Court Document Preparation and Certification',
                  description: 'Preparation and certification of court documents with proper legal formatting and compliance.'
                },
                {
                  title: 'Witness Statement Certification',
                  description: 'Certification of witness statements for legal proceedings with official commissioner seal and signature.'
                },
                {
                  title: 'Declaration of Truth for Legal Proceedings',
                  description: 'Official witnessing of declarations of truth with penalty of perjury administration for court matters.'
                },
                {
                  title: 'Penalty of Perjury Administration',
                  description: 'Proper administration of penalty of perjury clauses ensuring legal compliance and document validity.'
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
                  Competitive rates for oath administration and statutory declarations. Affordable fees for legal document certification with no hidden charges.
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
                  Same-day service available for most oath and declaration matters. Appointments can be scheduled at your convenience for quick turnaround.
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
                  Available to anyone requiring oath administration or statutory declarations for legal proceedings, court matters, or official purposes.
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
                To ensure a smooth oath administration process, please prepare the following items.
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
                    Passport, driver's license, or other official identification document for verification.
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
                    Documents Requiring Oath
                  </h3>
                  <p className="font-paragraph text-secondary/70">
                    Original documents or statutory declarations requiring oath administration.
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
                    Completed Declarations
                  </h3>
                  <p className="font-paragraph text-secondary/70">
                    Statutory declarations or affidavits should be completed before your appointment.
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
                    Bring a pen to sign documents during the oath administration process.
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
                Our Oath Administration Process
              </h2>
              <p className="font-paragraph text-lg text-secondary/70 max-w-2xl mx-auto">
                A straightforward, professional process designed for your convenience and legal compliance.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: '1',
                  title: 'Schedule Appointment',
                  description: 'Contact us to book a convenient time for your oath administration.'
                },
                {
                  step: '2',
                  title: 'Prepare Documents',
                  description: 'Gather your documents and valid ID before your appointment.'
                },
                {
                  step: '3',
                  title: 'Verify Identity',
                  description: 'We verify your identity and review your documents carefully for compliance.'
                },
                {
                  step: '4',
                  title: 'Administer Oath',
                  description: 'Administer oath and apply official commissioner seal and signature.'
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

        {/* Legal Importance Section */}
        <section className="w-full bg-secondary/5 py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
                The Legal Importance of Oaths
              </h2>
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <p className="font-paragraph text-lg text-secondary/80 mb-4 leading-relaxed">
                  When you swear an oath before a Commissioner of Oaths, you are making a legally binding commitment to tell the truth. This is not a casual promise—it carries serious legal consequences if false information is provided.
                </p>
                <p className="font-paragraph text-lg text-secondary/80 mb-4 leading-relaxed">
                  Perjury—lying under oath—is a criminal offense that can result in:
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                    <span className="font-paragraph text-secondary/80">Criminal charges and prosecution</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                    <span className="font-paragraph text-secondary/80">Imprisonment and fines</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                    <span className="font-paragraph text-secondary/80">Damage to your credibility and reputation</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                    <span className="font-paragraph text-secondary/80">Impact on legal proceedings and outcomes</span>
                  </li>
                </ul>
                <p className="font-paragraph text-lg text-secondary/80 leading-relaxed">
                  Our experienced Commissioner of Oaths ensures that you fully understand the legal implications of swearing an oath and that all procedures are followed correctly to maintain the integrity and validity of your documents.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
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
                Frequently Asked Questions
              </h2>
              <p className="font-paragraph text-lg text-secondary/70 max-w-2xl mx-auto">
                Common questions about our Commissioner of Oaths services.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {[
                {
                  question: 'What is the difference between a Commissioner of Oaths and a Notary Public?',
                  answer: 'A Commissioner of Oaths administers oaths and witnesses statutory declarations, while a Notary Public primarily witnesses signatures and certifies documents. Both serve important legal functions but have different authorities.'
                },
                {
                  question: 'How long does oath administration take?',
                  answer: 'Most oath administrations are completed within 15-30 minutes, depending on the number of documents and complexity of the declarations.'
                },
                {
                  question: 'What documents require oath administration?',
                  answer: 'Statutory declarations, affidavits, solemn declarations, and other documents requiring sworn statements under penalty of perjury require oath administration.'
                },
                {
                  question: 'Do I need an appointment?',
                  answer: 'While walk-ins are sometimes accommodated, we recommend scheduling an appointment to ensure availability and minimize wait times.'
                },
                {
                  question: 'What ID is acceptable?',
                  answer: 'Valid government-issued photo ID such as passport, driver\'s license, or provincial ID card is required for identity verification.'
                },
                {
                  question: 'Can you administer oaths for court proceedings?',
                  answer: 'Yes, we are authorized to administer oaths for court documents, affidavits, and legal proceedings. Our oaths are recognized by courts and legal authorities.'
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
                Need Oath Administration or Statutory Declaration Services?
              </h2>
              <p className="font-paragraph text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Schedule an appointment with our professional Commissioner of Oaths today. We're here to ensure your documents are properly certified and legally compliant.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/booking"
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
