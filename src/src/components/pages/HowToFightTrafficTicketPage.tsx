import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, AlertTriangle, FileText, Calendar, Gavel, HelpCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQSection } from '@/components/FAQSection';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';

export default function HowToFightTrafficTicketPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 pt-4">
        <Breadcrumbs />
      </div>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <FileText className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Free Guide</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              How to Fight a Traffic Ticket in Ontario
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Got a traffic ticket? You have options. This comprehensive guide explains the process, your rights, and how to decide whether to fight your ticket.
            </p>
          </div>
        </div>
      </section>

      {/* Your Three Options */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Your Three Options</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
              <div className="text-2xl font-bold text-red-600 mb-2">Option 1</div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">Pay the Fine</h3>
              <p className="font-paragraph text-foreground/70 text-sm mb-4">Plead guilty by paying. Fastest but has consequences.</p>
              <ul className="space-y-1 text-sm">
                <li className="text-red-700">✗ Full fine amount</li>
                <li className="text-red-700">✗ Demerit points</li>
                <li className="text-red-700">✗ Insurance increases</li>
                <li className="text-red-700">✗ Goes on record</li>
              </ul>
            </div>
            <div className="bg-amber-50 p-6 rounded-xl border-2 border-amber-200">
              <div className="text-2xl font-bold text-amber-600 mb-2">Option 2</div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">Early Resolution</h3>
              <p className="font-paragraph text-foreground/70 text-sm mb-4">Meet with prosecutor to negotiate.</p>
              <ul className="space-y-1 text-sm">
                <li className="text-amber-700">◐ Possibly reduced fine</li>
                <li className="text-amber-700">◐ Possibly fewer points</li>
                <li className="text-amber-700">◐ Still a conviction</li>
                <li className="text-amber-700">◐ Quick resolution</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
              <div className="text-2xl font-bold text-green-600 mb-2">Option 3</div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">Fight It at Trial</h3>
              <p className="font-paragraph text-foreground/70 text-sm mb-4">Challenge the charge in court.</p>
              <ul className="space-y-1 text-sm">
                <li className="text-green-700">✓ Chance of dismissal</li>
                <li className="text-green-700">✓ No points if won</li>
                <li className="text-green-700">✓ No insurance impact</li>
                <li className="text-green-700">✓ Officer may not appear</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Step by Step */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Step-by-Step: Fighting Your Ticket</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { step: 1, title: 'Check Your Deadline', desc: 'You have 15 days from receiving the ticket to respond. Miss this and you\'ll be convicted automatically. The deadline is on your ticket.', icon: Calendar },
              { step: 2, title: 'Request a Trial', desc: 'Check Option 3 on your ticket (or complete the online form if available). Mail it or submit in person to the court address on the ticket.', icon: FileText },
              { step: 3, title: 'Wait for Your Trial Date', desc: 'You\'ll receive a Notice of Trial in the mail with your court date. This can take 6-12 months depending on the court backlog.', icon: Clock },
              { step: 4, title: 'Request Disclosure', desc: 'Before trial, request the officer\'s notes and evidence. Send a written request to the prosecutor\'s office. This is your right.', icon: FileText },
              { step: 5, title: 'Review the Evidence', desc: 'Look for errors, inconsistencies, or missing information in the officer\'s notes. These can be grounds for dismissal.', icon: HelpCircle },
              { step: 6, title: 'Attend Your Trial', desc: 'Arrive early, dress appropriately, and be prepared to present your case. The prosecutor must prove the charge beyond reasonable doubt.', icon: Gavel },
            ].map((item) => (
              <div key={item.step} className="bg-white p-6 rounded-xl shadow-sm flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading font-bold text-lg">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="font-paragraph text-foreground/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to Fight */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">When Should You Fight?</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="font-heading text-xl font-bold text-green-800 mb-4">Good Reasons to Fight</h3>
              <ul className="space-y-2">
                {[
                  'You believe you\'re not guilty',
                  'The ticket has errors (wrong date, location, etc.)',
                  'High demerit points at stake',
                  'You\'re a commercial driver',
                  'Your insurance will increase significantly',
                  'You\'re close to licence suspension',
                  'The fine is very high',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 font-paragraph text-green-800 text-sm">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-amber-50 p-6 rounded-xl">
              <h3 className="font-heading text-xl font-bold text-amber-800 mb-4">Consider Just Paying If...</h3>
              <ul className="space-y-2">
                {[
                  'It\'s a minor ticket with no points',
                  'You were clearly at fault',
                  'The fine is small',
                  'You can\'t take time off for court',
                  'It won\'t affect your insurance',
                  'You have no other tickets',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 font-paragraph text-amber-800 text-sm">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Common Defences */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Common Defences That Work</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { title: 'Officer Doesn\'t Appear', desc: 'If the officer doesn\'t show up for trial, the charge is usually dismissed.' },
              { title: 'Errors on the Ticket', desc: 'Significant errors (wrong vehicle, wrong location) can invalidate the ticket.' },
              { title: 'Faulty Equipment', desc: 'Radar/laser devices must be calibrated and operated correctly.' },
              { title: 'Signage Issues', desc: 'Missing, obscured, or improper signs can be a valid defence.' },
              { title: 'Emergency Situation', desc: 'Speeding to avoid danger or reach a hospital may be excused.' },
              { title: 'Reasonable Doubt', desc: 'The prosecutor must prove the case—any reasonable doubt means acquittal.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-sm">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hire a Paralegal */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Scale className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">Should You Hire a Paralegal?</h2>
            <p className="font-paragraph text-foreground/70 mb-6">
              You can fight a ticket yourself, but a licensed paralegal can significantly improve your chances. Consider hiring representation if:
            </p>
            <div className="bg-white p-6 rounded-xl shadow-sm text-left">
              <ul className="space-y-2">
                {[
                  'You have a lot at stake (high points, licence suspension risk)',
                  'You\'re not comfortable speaking in court',
                  'You can\'t take time off work for multiple court dates',
                  'You\'re facing a serious charge (careless driving, stunt driving)',
                  'You want the best possible outcome',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 font-paragraph text-foreground/80">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />

      <RelatedServices services={relatedServicesConfig.trafficTickets} />

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Need Help With Your Ticket?</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your ticket and discuss your options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-gray-100 transition-colors">
              Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/services/traffic-tickets" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-white/10 transition-colors">
              Traffic Ticket Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
