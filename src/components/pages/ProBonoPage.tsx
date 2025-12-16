import { ArrowRight, Heart, CheckCircle, Users, FileText, Clock, Shield, Briefcase, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';

export default function ProBonoPage() {
  return (
    <div className="min-h-screen bg-background">
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
                <Heart className="w-8 h-8" />
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
                Pro Bono Legal Services
              </h1>
              <p className="font-paragraph text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Free legal representation for those who cannot afford it. We believe everyone deserves access to justice.
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
                  Access to Justice for Everyone
                </h2>
                <p className="font-paragraph text-lg text-secondary/80 mb-4 leading-relaxed">
                  We are committed to providing quality legal representation to individuals and families who cannot afford to pay for legal services. Our pro bono program ensures that financial barriers do not prevent people from accessing the justice system.
                </p>
                <p className="font-paragraph text-lg text-secondary/80 mb-6 leading-relaxed">
                  Through our pro bono initiative, we take on cases based on merit and the client's financial need. We believe that everyone deserves competent legal representation, regardless of their economic circumstances. Our experienced paralegals and legal professionals donate their time and expertise to serve our community.
                </p>
                <div className="flex gap-4">
                  <Link
                    to="/booking"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph px-8 py-4 rounded-lg transition-all"
                  >
                    Apply for Pro Bono Services
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
                  src="https://static.wixstatic.com/media/99571b_a4a22ca60af149e0abcd06e31c5f9ae1~mv2.png?id=pro-bono-hero"
                  alt="Pro Bono Legal Services - Lawyer compassionately assisting a client in a welcoming office setting"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Types of Cases */}
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
                Types of Cases We Handle Pro Bono
              </h2>
              <p className="font-paragraph text-lg text-secondary/70 max-w-2xl mx-auto">
                We provide free legal services across various practice areas for eligible clients.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Family Law Matters',
                  description: 'Custody disputes, child support, spousal support, separation agreements, and family violence protection orders for those unable to afford representation.',
                  icon: <Users className="w-6 h-6" />
                },
                {
                  title: 'Landlord and Tenant Disputes',
                  description: 'Eviction defense, rent disputes, maintenance issues, and illegal lockout cases for tenants facing housing insecurity.',
                  icon: <Shield className="w-6 h-6" />
                },
                {
                  title: 'Small Claims Court',
                  description: 'Civil disputes up to $50,000 including debt recovery, property damage claims, and contract disputes for low-income individuals.',
                  icon: <Briefcase className="w-6 h-6" />
                },
                {
                  title: 'Human Rights Complaints',
                  description: 'Discrimination cases based on protected grounds including employment discrimination, housing discrimination, and harassment.',
                  icon: <Heart className="w-6 h-6" />
                },
                {
                  title: 'Traffic Violations',
                  description: 'Defense representation for traffic charges, speeding violations, and driving-related offences for those unable to afford legal help.',
                  icon: <AlertCircle className="w-6 h-6" />
                },
                {
                  title: 'Criminal Matters',
                  description: 'Summary conviction offence representation in Provincial Court for individuals facing criminal charges without financial means.',
                  icon: <FileText className="w-6 h-6" />
                }
              ].map((caseType, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all border border-gray-100"
                >
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                    {caseType.icon}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    {caseType.title}
                  </h3>
                  <p className="font-paragraph text-secondary/70">
                    {caseType.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Eligibility Criteria */}
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
                Eligibility Criteria
              </h2>
              <p className="font-paragraph text-lg text-secondary/70 max-w-2xl mx-auto">
                To qualify for our pro bono legal services, you must meet certain criteria.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-pastelbeige/30 p-8 rounded-lg border border-pastelbeige"
              >
                <h3 className="font-heading text-xl font-bold text-foreground mb-6">
                  Financial Requirements
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-secondary/80">
                      Household income at or below 200% of the poverty line
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-secondary/80">
                      Limited assets and savings
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-secondary/80">
                      Unable to afford legal representation
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-secondary/80">
                      Willing to provide financial documentation
                    </span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-pastelgreen/30 p-8 rounded-lg border border-pastelgreen"
              >
                <h3 className="font-heading text-xl font-bold text-foreground mb-6">
                  Case Merit Requirements
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-secondary/80">
                      Case has legal merit and reasonable chance of success
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-secondary/80">
                      Matter falls within our authorized practice areas
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-secondary/80">
                      Client is willing to cooperate fully with legal team
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-secondary/80">
                      Case aligns with our pro bono priorities
                    </span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Application Process */}
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
                Application Process
              </h2>
              <p className="font-paragraph text-lg text-secondary/70 max-w-2xl mx-auto">
                Follow these steps to apply for our pro bono legal services.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                {
                  step: '1',
                  title: 'Initial Contact',
                  description: 'Contact us via phone, email, or our online form to express interest in pro bono services.'
                },
                {
                  step: '2',
                  title: 'Intake Interview',
                  description: 'Participate in a confidential intake interview to discuss your case and circumstances.'
                },
                {
                  step: '3',
                  title: 'Financial Review',
                  description: 'Provide financial documentation to verify eligibility based on income and assets.'
                },
                {
                  step: '4',
                  title: 'Case Assessment',
                  description: 'Our team evaluates your case for legal merit and alignment with our priorities.'
                },
                {
                  step: '5',
                  title: 'Decision & Representation',
                  description: 'Receive notification of acceptance and begin working with your assigned paralegal.'
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
                  {index < 4 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary/20 transform -translate-y-1/2" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
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
                Benefits of Our Pro Bono Services
              </h2>
              <p className="font-paragraph text-lg text-secondary/70 max-w-2xl mx-auto">
                When you work with us, you get professional legal representation at no cost.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Expert Legal Representation',
                  description: 'Access to experienced paralegals and legal professionals with expertise in various practice areas.',
                  icon: <Briefcase className="w-6 h-6" />
                },
                {
                  title: 'No Cost to You',
                  description: 'Completely free legal services with no hidden fees or charges regardless of case outcome.',
                  icon: <Heart className="w-6 h-6" />
                },
                {
                  title: 'Confidential Service',
                  description: 'All communications are protected by solicitor-client privilege and treated with complete confidentiality.',
                  icon: <Shield className="w-6 h-8" />
                },
                {
                  title: 'Full Case Support',
                  description: 'Comprehensive representation from initial consultation through case resolution and appeals if needed.',
                  icon: <FileText className="w-6 h-6" />
                },
                {
                  title: 'Flexible Scheduling',
                  description: 'Appointments scheduled at times convenient for you, including evenings and weekends when possible.',
                  icon: <Clock className="w-6 h-6" />
                },
                {
                  title: 'Community Commitment',
                  description: 'Work with professionals dedicated to ensuring access to justice for all members of our community.',
                  icon: <Users className="w-6 h-6" />
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all border border-gray-100"
                >
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="font-paragraph text-secondary/70">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Information */}
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
                Important Information
              </h2>
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 space-y-6">
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    Limited Availability
                  </h3>
                  <p className="font-paragraph text-secondary/80">
                    Due to high demand and limited resources, we cannot accept all applications. We prioritize cases based on financial need, case merit, and alignment with our pro bono priorities. Acceptance is not guaranteed.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    Scope of Services
                  </h3>
                  <p className="font-paragraph text-secondary/80">
                    Pro bono services are limited to matters within our authorized practice areas. We cannot provide representation for indictable criminal offences, complex commercial disputes, or matters outside our expertise.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    Client Cooperation
                  </h3>
                  <p className="font-paragraph text-secondary/80">
                    Clients must be willing to cooperate fully with our legal team, provide necessary documentation, and follow our advice. Failure to cooperate may result in termination of representation.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    No Guarantee of Outcome
                  </h3>
                  <p className="font-paragraph text-secondary/80">
                    While we provide professional representation, we cannot guarantee any particular outcome. Legal matters are inherently uncertain, and results depend on many factors including evidence, law, and court decisions.
                  </p>
                </div>
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
                Common questions about our pro bono legal services program.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {[
                {
                  question: 'What does "pro bono" mean?',
                  answer: 'Pro bono is Latin for "for the public good." Pro bono legal services are provided by lawyers and paralegals without charge to help people who cannot afford legal representation.'
                },
                {
                  question: 'How do I know if I qualify financially?',
                  answer: 'Generally, if your household income is at or below 200% of the poverty line and you have limited assets, you may qualify. We review financial documentation during the intake process to determine eligibility.'
                },
                {
                  question: 'What if my case is not accepted?',
                  answer: 'If your case is not accepted, we will provide referrals to other legal aid organizations, law clinics, or resources that may be able to help you.'
                },
                {
                  question: 'How long does the application process take?',
                  answer: 'The application process typically takes 2-4 weeks from initial contact to a final decision, depending on the complexity of your case and how quickly you provide required documentation.'
                },
                {
                  question: 'Can I choose my paralegal?',
                  answer: 'We assign paralegals based on their expertise in your case type and availability. We will ensure you are matched with someone qualified to handle your matter.'
                },
                {
                  question: 'What if I disagree with the legal advice I receive?',
                  answer: 'You have the right to seek a second opinion from another lawyer or paralegal. However, we encourage open communication about any concerns with your assigned representative.'
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
                Ready to Apply for Pro Bono Legal Services?
              </h2>
              <p className="font-paragraph text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Take the first step toward accessing quality legal representation. Contact us today to discuss your case and eligibility.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/booking"
                  className="inline-flex items-center justify-center gap-2 bg-primary-foreground hover:bg-primary-foreground/90 text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all"
                >
                  Apply Now
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
