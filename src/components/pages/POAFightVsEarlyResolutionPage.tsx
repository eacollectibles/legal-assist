import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { ChevronRight, Scale, Clock, DollarSign, CheckCircle, XCircle, AlertTriangle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQSection } from '@/components/FAQSection';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { PHONE_HREF, PHONE_DISPLAY } from '@/lib/contact';

const faqs = [
  {
    question: 'What is early resolution for a POA ticket?',
    answer: 'Early resolution is a meeting with a prosecutor before trial to negotiate a resolution. You can discuss reducing the charge, lowering the fine, or even having the charge withdrawn. It\'s informal, doesn\'t require evidence preparation, and often results in a better outcome than paying the ticket. Most courts offer this option.'
  },
  {
    question: 'Will a reduced charge still go on my driving record?',
    answer: 'It depends on what you\'re reduced to. If a speeding ticket is reduced to a non-moving violation (like "disobey sign"), it may not affect your driving record or insurance. If it\'s reduced to a lesser speeding amount, it will still appear but with fewer demerit points. Always clarify the specific charge being offered.'
  },
  {
    question: 'What happens if I request a trial and lose?',
    answer: 'If you\'re found guilty at trial, you\'ll pay the original fine (sometimes increased), court costs, and receive the full demerit points. However, you had the opportunity to present a defence. The conviction will appear on your record. Weigh the risks against potential benefits before choosing trial.'
  },
  {
    question: 'How long does it take to get a trial date?',
    answer: 'Trial dates typically take 6-18 months depending on the court location. Some courts have longer backlogs. During this time, your ticket remains pending—no conviction, no points, no insurance impact. This delay can sometimes benefit you if you need a clean record for employment.'
  },
  {
    question: 'Can I still negotiate after requesting a trial?',
    answer: 'Yes. Even after requesting a trial, most prosecutors will discuss resolution on the trial date. Many cases settle in the courthouse hallway before trial begins. However, early resolution is typically easier because it\'s specifically designed for negotiation.'
  }
];

const comparisonData = {
  earlyResolution: {
    title: 'Early Resolution',
    subtitle: 'Negotiate with the prosecutor',
    pros: [
      'Often results in reduced charges',
      'Lower fines possible',
      'Faster resolution (weeks vs. months)',
      'No need to prepare evidence',
      'Less stressful than trial',
      'Prosecutor may withdraw charge entirely'
    ],
    cons: [
      'You must plead guilty to something',
      'Still may get some demerit points',
      'Conviction will appear on record',
      'Limited negotiating leverage'
    ],
    bestFor: 'Minor offences where you want a quick, reduced outcome and are willing to accept some responsibility.'
  },
  fightingTicket: {
    title: 'Fighting at Trial',
    subtitle: 'Challenge the evidence',
    pros: [
      'Possibility of complete dismissal',
      'No conviction if you win',
      'No points if acquitted',
      'Officer may not appear (charge dropped)',
      'Constitutional defences available',
      'Delay keeps record clean longer'
    ],
    cons: [
      'Takes 6-18 months to get trial date',
      'Risk of full conviction if you lose',
      'Must prepare defence and evidence',
      'May require time off work',
      'More stressful'
    ],
    bestFor: 'When you have a strong defence, the charge is serious, or maintaining a clean record is crucial.'
  }
};

const steps = {
  earlyResolution: [
    {
      step: '1',
      title: 'Check Your Ticket',
      description: 'Your ticket will indicate if early resolution is available. Most POA tickets in Ontario offer this option.'
    },
    {
      step: '2',
      title: 'Request Early Resolution',
      description: 'Check the "Early Resolution" box on your ticket and submit it by the deadline (usually within 15 days).'
    },
    {
      step: '3',
      title: 'Receive Meeting Notice',
      description: 'You\'ll receive a date to meet with a prosecutor. This is typically 4-8 weeks after your request.'
    },
    {
      step: '4',
      title: 'Meet with Prosecutor',
      description: 'Discuss your situation. Explain mitigating circumstances. The prosecutor may offer a reduced charge or fine.'
    },
    {
      step: '5',
      title: 'Accept or Proceed to Trial',
      description: 'If you accept the offer, you plead guilty to the reduced charge. If not, you can still request a trial.'
    }
  ],
  trial: [
    {
      step: '1',
      title: 'Request a Trial',
      description: 'Check the "Trial" box on your ticket and submit it by the deadline. Some courts allow online filing.'
    },
    {
      step: '2',
      title: 'Wait for Trial Date',
      description: 'You\'ll receive a notice of trial, typically 6-18 months away depending on court backlog.'
    },
    {
      step: '3',
      title: 'Request Disclosure',
      description: 'Ask for the officer\'s notes, device calibration records, and any other evidence. This is crucial for your defence.'
    },
    {
      step: '4',
      title: 'Prepare Your Defence',
      description: 'Review the evidence, identify weaknesses, prepare questions for cross-examination, and organize your case.'
    },
    {
      step: '5',
      title: 'Attend Trial',
      description: 'Present your case to the Justice of the Peace. The prosecution goes first, then you present your defence.'
    }
  ]
};

export default function POAFightVsEarlyResolutionPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Provincial Offences: Fighting a Ticket vs Early Resolution | Ontario Guide"
        description="Should you fight your Ontario ticket at trial or take early resolution? Compare both options, understand the process, and learn which is right for your situation. Free consultation."
        canonical="https://www.legalassist.london/guides/poa-fight-vs-early-resolution"
      />
      <Header />
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 pt-4">
        <Breadcrumbs />
      </div>

      {/* Hero Section with Summary */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Provincial Offences: Fighting a Ticket vs Early Resolution
          </h1>
          
          {/* Quick Summary */}
          <div className="bg-white border-l-4 border-primary p-6 rounded-r-lg shadow-sm mb-8">
            <p className="font-paragraph text-lg text-foreground/90 leading-relaxed">
              <strong>Quick Summary:</strong> When you receive a POA ticket in Ontario (traffic, bylaw, or regulatory offence), 
              you have three options: pay it, request early resolution, or fight it at trial. Early resolution lets you negotiate 
              with a prosecutor for reduced charges. Trial gives you a chance at complete dismissal but carries more risk.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/booking">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Get Free Consultation
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href={PHONE_HREF}>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                Call {PHONE_DISPLAY}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
            Comparing Your Options
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Early Resolution */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="text-center mb-4">
                <Scale className="h-10 w-10 text-green-600 mx-auto mb-2" />
                <h3 className="font-heading text-xl font-bold text-foreground">{comparisonData.earlyResolution.title}</h3>
                <p className="text-green-700 text-sm">{comparisonData.earlyResolution.subtitle}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" /> Advantages
                </h4>
                <ul className="space-y-1">
                  {comparisonData.earlyResolution.pros.map((pro, i) => (
                    <li key={i} className="text-sm text-foreground/70 flex items-start gap-2">
                      <span className="text-green-600">+</span> {pro}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                  <XCircle className="h-4 w-4" /> Disadvantages
                </h4>
                <ul className="space-y-1">
                  {comparisonData.earlyResolution.cons.map((con, i) => (
                    <li key={i} className="text-sm text-foreground/70 flex items-start gap-2">
                      <span className="text-red-600">−</span> {con}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white p-3 rounded-lg">
                <p className="text-sm"><strong>Best for:</strong> {comparisonData.earlyResolution.bestFor}</p>
              </div>
            </div>

            {/* Fighting at Trial */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="text-center mb-4">
                <FileText className="h-10 w-10 text-blue-600 mx-auto mb-2" />
                <h3 className="font-heading text-xl font-bold text-foreground">{comparisonData.fightingTicket.title}</h3>
                <p className="text-blue-700 text-sm">{comparisonData.fightingTicket.subtitle}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" /> Advantages
                </h4>
                <ul className="space-y-1">
                  {comparisonData.fightingTicket.pros.map((pro, i) => (
                    <li key={i} className="text-sm text-foreground/70 flex items-start gap-2">
                      <span className="text-green-600">+</span> {pro}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                  <XCircle className="h-4 w-4" /> Disadvantages
                </h4>
                <ul className="space-y-1">
                  {comparisonData.fightingTicket.cons.map((con, i) => (
                    <li key={i} className="text-sm text-foreground/70 flex items-start gap-2">
                      <span className="text-red-600">−</span> {con}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white p-3 rounded-lg">
                <p className="text-sm"><strong>Best for:</strong> {comparisonData.fightingTicket.bestFor}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="w-full py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
            Step-by-Step Process for Each Option
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Early Resolution Steps */}
            <div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Scale className="h-5 w-5 text-green-600" />
                Early Resolution Process
              </h3>
              <div className="space-y-4">
                {steps.earlyResolution.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                      <p className="text-foreground/70 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trial Steps */}
            <div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Trial Process
              </h3>
              <div className="space-y-4">
                {steps.trial.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                      <p className="text-foreground/70 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decision Helper */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
            Which Option Is Right for You?
          </h2>
          
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Choose Early Resolution if:</h3>
              <ul className="text-sm text-foreground/70 space-y-1">
                <li>• You want a quick resolution without the stress of trial</li>
                <li>• The charge is minor and won't significantly impact your record</li>
                <li>• You don't have a strong defence but want a reduced outcome</li>
                <li>• You can't take time off work for a trial date</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Choose Trial if:</h3>
              <ul className="text-sm text-foreground/70 space-y-1">
                <li>• You have a strong defence (improper procedure, faulty equipment, etc.)</li>
                <li>• The charge is serious (careless driving, stunt driving) with major consequences</li>
                <li>• Maintaining a clean record is essential for your job</li>
                <li>• You're confident in presenting your case or will hire a paralegal</li>
              </ul>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Not Sure?</h3>
                <p className="text-sm text-foreground/70">
                  A licensed paralegal can review your ticket, assess your options, and recommend the best strategy. 
                  We handle hundreds of POA tickets and know what works in your local court.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
            Frequently Asked Questions
          </h2>
          <FAQSection faqs={faqs} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-16 bg-primary/10">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
            Need Help Deciding?
          </h2>
          <p className="font-paragraph text-lg text-foreground/80 mb-8">
            A licensed paralegal can handle your ticket from start to finish—whether that's negotiating 
            early resolution or defending you at trial. Most clients don't even need to attend court.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8">
                Book Free Consultation
              </Button>
            </Link>
            <Link to="/services/traffic-tickets">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                Our Traffic Ticket Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <RelatedServices currentPath="/guides/poa-fight-vs-early-resolution" config={relatedServicesConfig['/services/traffic-tickets'] || relatedServicesConfig.default} />

      <Footer />
    </div>
  );
}
