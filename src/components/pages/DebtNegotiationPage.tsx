import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageSEO from '@/components/PageSEO';
import { Link } from 'react-router-dom';

export default function DebtNegotiationPage() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const whatWeHelpWith = [
    'Negotiating payment plans with creditors',
    'Requesting interest reductions or balance settlements',
    'Communicating directly with collection agencies',
    'Resolving disputed or incorrect debts',
    'Organizing repayment strategies',
    'Reducing creditor contact and harassment',
    'Helping you understand your legal options before escalation'
  ];

  const steps = [
    {
      title: 'Confidential Review',
      description: 'We review your debts, creditor communications, and financial situation to understand your complete picture.'
    },
    {
      title: 'Creditor Contact',
      description: 'We communicate directly with your creditors or collection agencies on your behalf, presenting your situation professionally.'
    },
    {
      title: 'Negotiation & Resolution',
      description: 'We work to reach manageable repayment terms or settlements where appropriate, always keeping your interests in focus.'
    },
    {
      title: 'Clear Next Steps',
      description: 'You receive a clear plan and documentation of any agreements reached, so you know exactly what comes next.'
    }
  ];

  const whoThisIsFor = [
    'Individuals behind on credit cards or personal loans',
    'People dealing with collection agencies',
    'Clients facing aggressive creditor contact',
    'Individuals trying to avoid court or enforcement action',
    'People needing help communicating with creditors'
  ];

  return (
    <>
      <PageSEO
        title="Debt Negotiation & Creditor Resolution | Ontario Paralegal Services"
        description="We negotiate directly with creditors and collection agencies to reduce stress and help resolve outstanding debt issues."
        keywords="debt negotiation Ontario, creditor negotiation services, help dealing with creditors, negotiate debt on my behalf, collection agency negotiation"
        ogImage="https://static.wixstatic.com/media/99571b_eb4b570d49c241d88d99ef2a0c9293ef~mv2.png?originWidth=1152&originHeight=768"
      />
      <Header />

      <main className="w-full">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-b from-pastelpeach to-background py-20 md:py-32">
          <div className="max-w-[100rem] mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="font-heading text-5xl md:text-6xl text-foreground mb-6 leading-tight">
                Struggling with debt or constant creditor pressure?
              </h1>
              <p className="font-paragraph text-xl text-secondary mb-8 leading-relaxed">
                You don't have to deal with creditors alone. We help negotiate repayment terms, reduce balances where possible, and stop the stress of ongoing collection efforts by acting as your representative.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-accent text-white font-paragraph text-base"
              >
                <Link to="/contact">Get Help Dealing With Creditors</Link>
              </Button>
              <p className="font-paragraph text-sm text-secondary mt-4">
                Speak with a licensed Ontario paralegal about your options.
              </p>
            </motion.div>
          </div>
        </section>

        {/* What We Help With */}
        <section className="w-full py-20 md:py-28 bg-white">
          <div className="max-w-[100rem] mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
                What We Help With
              </h2>
              <p className="font-paragraph text-lg text-secondary mb-12 max-w-2xl">
                Our debt negotiation services focus on practical, lawful solutions to reduce your financial stress and regain control.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {whatWeHelpWith.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4 items-start"
                  >
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <p className="font-paragraph text-base text-foreground">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full py-20 md:py-28 bg-background">
          <div className="max-w-[100rem] mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
                How It Works
              </h2>
              <p className="font-paragraph text-lg text-secondary mb-12 max-w-2xl">
                Our straightforward process keeps you informed and in control every step of the way.
              </p>

              <div className="space-y-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="border border-secondary/20 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                      className="w-full px-6 py-5 flex items-center justify-between hover:bg-background/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 text-left">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold">
                          {index + 1}
                        </div>
                        <h3 className="font-heading text-lg text-foreground">{step.title}</h3>
                      </div>
                      <ChevronRight
                        className={`w-5 h-5 text-secondary transition-transform ${
                          expandedStep === index ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                    {expandedStep === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-5 border-t border-secondary/10"
                      >
                        <p className="font-paragraph text-base text-secondary">{step.description}</p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="w-full py-20 md:py-28 bg-white">
          <div className="max-w-[100rem] mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
                Who This Is For
              </h2>
              <p className="font-paragraph text-lg text-secondary mb-12 max-w-2xl">
                If any of these situations sound familiar, we can help.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {whoThisIsFor.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 bg-background rounded-lg border border-secondary/10"
                  >
                    <p className="font-paragraph text-base text-foreground">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* What This Is NOT */}
        <section className="w-full py-20 md:py-28 bg-background">
          <div className="max-w-[100rem] mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <div className="flex gap-4 items-start p-6 bg-white rounded-lg border border-secondary/20">
                <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading text-xl text-foreground mb-3">What This Is NOT</h3>
                  <p className="font-paragraph text-base text-secondary leading-relaxed">
                    This service does not involve bankruptcy, insolvency proceedings, or credit repair. Outcomes depend on creditor cooperation and individual circumstances. We work within Ontario's legal framework to represent your interests in debt negotiation—nothing more, nothing less.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-28 bg-gradient-to-r from-primary to-accent">
          <div className="max-w-[100rem] mx-auto px-6 md:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">
                Ready to Take Control of Your Debt?
              </h2>
              <p className="font-paragraph text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Let's discuss your situation and explore how we can help reduce the pressure and stress.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-background font-paragraph text-base"
              >
                <Link to="/contact">Get Help Dealing With Creditors</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Related Services */}
        <section className="w-full py-20 md:py-28 bg-white">
          <div className="max-w-[100rem] mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-12">
                Related Services
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Small Claims Court',
                    description: 'If creditors pursue legal action, we can represent you in small claims proceedings.',
                    link: '/services/small-claims-court'
                  },
                  {
                    title: 'Consumer Disputes',
                    description: 'Resolve disputes with merchants, service providers, or creditors over charges or services.',
                    link: '/services/consumer-disputes'
                  },
                  {
                    title: 'Debt Collection Defence',
                    description: 'If you\'re being sued for debt collection, we can help defend your rights.',
                    link: '/services/debt-collection'
                  }
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 bg-background rounded-lg border border-secondary/10 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-heading text-xl text-foreground mb-3">{service.title}</h3>
                    <p className="font-paragraph text-base text-secondary mb-4">{service.description}</p>
                    <Link
                      to={service.link}
                      className="inline-flex items-center gap-2 text-primary hover:text-accent font-paragraph font-semibold transition-colors"
                    >
                      Learn More
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
