import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, Users, FileText, Clock, DollarSign, Scale, AlertTriangle, XCircle, ArrowRight, HelpCircle, TrendingUp, Gavel, Calculator, Target, Shield, Ban, Info, Briefcase } from 'lucide-react';
import { FAQSection } from '@/components/FAQSection';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SmallClaimsPage() {
  const authorityItems = [
    {
      title: 'Comprehensive Case Evaluation',
      description: 'We assess your claim honestly, tell you if Small Claims is the right venue, and develop a strategy based on realistic outcomes.'
    },
    {
      title: 'Document Preparation & Filing',
      description: 'Professional preparation of claims, defences, affidavits, and motions. We ensure compliance with court rules and deadlines.'
    },
    {
      title: 'Full Court Representation',
      description: 'Licensed paralegals can represent you at all Small Claims Court proceedings up to $50,000 - trials, settlement conferences, and motions.'
    }
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Honest Assessment',
      description: 'We evaluate your case, discuss likely outcomes, and advise whether filing makes financial sense.'
    },
    {
      step: '2',
      title: 'Demand & Negotiation',
      description: 'Many disputes resolve with a demand letter. We attempt settlement before incurring court costs.'
    },
    {
      step: '3',
      title: 'Filing & Litigation',
      description: 'If needed, we file your claim, manage procedural steps, and represent you through to judgment.'
    }
  ];

  const reassuranceItems = [
    {
      icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />,
      title: 'Full Representation Rights',
      description: 'Paralegals are licensed by the Law Society of Ontario to represent clients in Small Claims Court - the same representation rights as lawyers for claims up to $50,000.'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />,
      title: 'Cost-Effective Rates',
      description: 'Paralegal services typically cost 40-60% less than lawyer rates for the same Small Claims representation.'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />,
      title: 'Judgment Enforcement',
      description: 'Winning a judgment is only half the battle. We assist with garnishments, writs of seizure, and examination hearings to collect what you\'re owed.'
    }
  ];

  const honestFaqs = [
    {
      question: "What if I lose my case?",
      answer: "If you lose, you'll be responsible for your own legal costs plus potentially a portion of the other party's costs. In Small Claims Court, cost awards are typically limited to 15% of the claim amount. So on a $20,000 claim, if you lose, you might pay $500-2,500 in opposing costs plus your own legal fees. We discuss these risks upfront before you commit."
    },
    {
      question: "Can the other side delay the case?",
      answer: "Yes, and it's common. Defendants can request adjournments, file motions, or simply drag their feet. A straightforward case that 'should' take 6 months can stretch to 12-18 months. We can't control opposing parties, but we can push back on unreasonable delays and keep your case moving."
    },
    {
      question: "Will this affect my credit or theirs?",
      answer: "Filing a claim doesn't affect anyone's credit. However, if you win and the defendant doesn't pay, you can register the judgment with credit bureaus after 30 days. This damages their credit significantly. For defendants being sued, an unpaid judgment will appear on credit reports for 6+ years."
    },
    {
      question: "Can I recover my legal fees if I win?",
      answer: "Partially. Small Claims Court typically awards 15% of the claim amount as 'representation fees' to the winner - not your actual costs. So if you sue for $15,000 and spend $3,000 on legal fees, you might recover $2,250 (15%). The shortfall is a real cost of litigation. We factor this into our 'is it worth suing?' analysis."
    },
    {
      question: "What if the defendant has no money or assets?",
      answer: "A judgment against someone with no assets or income is a 'hollow victory.' You win on paper but collect nothing. Before filing, we research the defendant's apparent ability to pay. Sometimes the honest advice is: 'You'll probably win, but you'll never collect. Save your money.'"
    },
    {
      question: "How long will my case actually take?",
      answer: "Realistically, 8-14 months from filing to trial in most Ontario courts. Settlement conferences happen around 4-6 months in. Many cases settle before trial. If you need money urgently, Small Claims Court may be too slow - a negotiated settlement or payment plan might serve you better."
    },
    {
      question: "Should I accept a settlement offer or go to trial?",
      answer: "This depends on the offer, your evidence strength, and the defendant's ability to pay. A certain $10,000 today is often better than a possible $15,000 in 8 months (minus legal costs, with collection risk). We'll give you our honest assessment, but the decision is always yours."
    }
  ];

  return (
    <>
      <SEO 
        title="Small Claims Court Paralegal | Claims up to $50,000 | Ontario"
        description="Licensed paralegal for Small Claims Court in Ontario. Honest advice on claims up to $50,000. Debt recovery, contract disputes, property damage. Free consultation."
        canonical="https://www.legalassist.london/services/small-claims"
      />
      <ServicePageLayout
        seoTitle="Small Claims Court Paralegal | Claims up to $50,000 | Ontario"
        seoDescription="Licensed paralegal for Small Claims Court in Ontario. Honest advice on claims up to $50,000. Debt recovery, contract disputes, property damage. Free consultation."
        canonical="https://www.legalassist.london/services/small-claims"
        problemHeadline="Small Claims Court Paralegal in Ontario"
        problemDescription="Should you file, negotiate, or walk away? Most people contact us because they're unsure which option makes sense. We provide honest assessments - including when NOT to sue."
        heroImage={{
          src: "https://static.wixstatic.com/media/99571b_4477a5a9ef4f48cc8e3416990393a421~mv2.png?id=small-claims-hero",
          alt: "Canadian Small Claims Court in Ontario with Canadian flag and coat of arms"
        }}
        authorityItems={authorityItems}
        processSteps={processSteps}
        reassuranceItems={reassuranceItems}
      >
        {/* STEP 1: Explicit Facts Box - Not Buried */}
        <div className="w-full py-12 bg-slate-50 border-y border-slate-200">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-6">
              <Info className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-3xl font-bold text-foreground">
                Ontario Small Claims Court: Key Facts
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">$50,000</div>
                <p className="font-paragraph text-foreground/80 font-semibold">Maximum Claim</p>
                <p className="text-sm text-foreground/60 mt-1">As of October 1, 2025</p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">2 Years</div>
                <p className="font-paragraph text-foreground/80 font-semibold">Limitation Period</p>
                <p className="text-sm text-foreground/60 mt-1">From when you knew/should have known</p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">$102</div>
                <p className="font-paragraph text-foreground/80 font-semibold">Filing Fee</p>
                <p className="text-sm text-foreground/60 mt-1">Infrequent claimant rate (2025)</p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">8-14 mo</div>
                <p className="font-paragraph text-foreground/80 font-semibold">Typical Timeline</p>
                <p className="text-sm text-foreground/60 mt-1">Filing to trial (varies by court)</p>
              </div>
            </div>

            {/* Paralegal Scope - Clear Distinction */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Scale className="w-5 h-5 text-primary" />
                What Paralegals Can and Cannot Do
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-700 mb-2">✓ Can Fully Represent You</h4>
                  <ul className="space-y-1 text-sm text-foreground/80">
                    <li>• Small Claims Court (up to $50,000)</li>
                    <li>• Landlord and Tenant Board</li>
                    <li>• Provincial Offences (traffic tickets)</li>
                    <li>• Human Rights Tribunal of Ontario</li>
                    <li>• Certain administrative tribunals</li>
                  </ul>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-yellow-700 mb-2">◐ Can Assist (Limited Role)</h4>
                  <ul className="space-y-1 text-sm text-foreground/80">
                    <li>• Prepare documents for Superior Court</li>
                    <li>• Advise on procedures</li>
                    <li>• Negotiate settlements</li>
                    <li>• <em>Cannot appear in Superior Court</em></li>
                  </ul>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-red-700 mb-2">✗ Must Refer to Lawyer</h4>
                  <ul className="space-y-1 text-sm text-foreground/80">
                    <li>• Claims over $50,000</li>
                    <li>• Family law matters</li>
                    <li>• Real estate transactions</li>
                    <li>• Criminal charges (indictable)</li>
                    <li>• Wills and estates</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 3: Decision Path Content */}
        <div className="w-full py-16 md:py-20 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Should You File, Negotiate, or Walk Away?
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 mb-12 text-center max-w-3xl mx-auto">
              Not every dispute belongs in Small Claims Court. Here's how to decide.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* When Filing Makes Sense */}
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-500 rounded-full p-2">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-green-800">When Filing Makes Sense</h3>
                </div>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>You have clear documentation (contracts, invoices, photos, texts)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>The defendant has assets or income to collect from</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>The amount justifies legal costs (typically $5,000+)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>You're within the 2-year limitation period</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>Demand letters and negotiation have failed</span>
                  </li>
                </ul>
              </div>

              {/* When Negotiation is Smarter */}
              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-yellow-500 rounded-full p-2">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-yellow-800">When Negotiation is Smarter</h3>
                </div>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-yellow-600 mt-1 flex-shrink-0" />
                    <span>Ongoing relationship you want to preserve (business, neighbor)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-yellow-600 mt-1 flex-shrink-0" />
                    <span>Defendant has limited funds but is willing to pay something</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-yellow-600 mt-1 flex-shrink-0" />
                    <span>You need money faster than courts can deliver (8-14 months)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-yellow-600 mt-1 flex-shrink-0" />
                    <span>Evidence is weak or "he said/she said"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-yellow-600 mt-1 flex-shrink-0" />
                    <span>A demand letter might resolve it without court costs</span>
                  </li>
                </ul>
              </div>

              {/* When Walking Away Might Be Best */}
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-500 rounded-full p-2">
                    <XCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-red-800">When Walking Away Might Be Best</h3>
                </div>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                    <span>Defendant is bankrupt, unemployed, or judgment-proof</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                    <span>Legal costs would exceed potential recovery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                    <span>You're outside the limitation period</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                    <span>Emotional satisfaction isn't worth the time/money</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                    <span>You have no documentation to prove your case</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 2: When Small Claims is NOT the Right Option */}
        <div className="w-full py-16 bg-slate-50 border-y border-slate-200">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-6">
              <Ban className="w-8 h-8 text-red-600" />
              <h2 className="font-heading text-3xl font-bold text-foreground">
                When Small Claims Court is NOT the Right Option
              </h2>
            </div>
            <p className="font-paragraph text-lg text-foreground/70 mb-8">
              We turn away cases that don't belong in Small Claims Court. Here's what we'll refer elsewhere:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-5 border border-slate-200">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  Claims Over $50,000
                </h4>
                <p className="text-sm text-foreground/70">Must go to Superior Court. We can refer you to a lawyer or help you reduce your claim to $50,000 if that makes sense.</p>
              </div>
              <div className="bg-white rounded-lg p-5 border border-slate-200">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  Land Title Disputes
                </h4>
                <p className="text-sm text-foreground/70">Property boundary disputes, easements, and ownership claims require Superior Court and a lawyer.</p>
              </div>
              <div className="bg-white rounded-lg p-5 border border-slate-200">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  Injunctions or Urgent Relief
                </h4>
                <p className="text-sm text-foreground/70">Small Claims can't issue injunctions. If you need immediate court orders to stop behavior, you need Superior Court.</p>
              </div>
              <div className="bg-white rounded-lg p-5 border border-slate-200">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  Bankrupt Defendant
                </h4>
                <p className="text-sm text-foreground/70">You generally can't sue someone who has declared bankruptcy. The debt may be discharged.</p>
              </div>
              <div className="bg-white rounded-lg p-5 border border-slate-200">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  Class Actions
                </h4>
                <p className="text-sm text-foreground/70">Small Claims doesn't handle class actions. These require Superior Court and specialized lawyers.</p>
              </div>
              <div className="bg-white rounded-lg p-5 border border-slate-200">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  Demand Letter Would Suffice
                </h4>
                <p className="text-sm text-foreground/70">Sometimes a $300 demand letter gets paid without $2,000+ in court costs. We'll tell you if this is your best first step.</p>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 5: Comparison Table */}
        <div className="w-full py-16 md:py-20 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Your Options Compared
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 mb-10 text-center max-w-3xl mx-auto">
              One table beats 1,000 words. Here's how your dispute resolution options stack up.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-semibold">Option</th>
                    <th className="px-6 py-4 text-left font-semibold">Typical Cost</th>
                    <th className="px-6 py-4 text-left font-semibold">Timeline</th>
                    <th className="px-6 py-4 text-left font-semibold">Best For</th>
                    <th className="px-6 py-4 text-left font-semibold">Limitations</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold">Demand Letter</td>
                    <td className="px-6 py-4">$150-400</td>
                    <td className="px-6 py-4">1-2 weeks</td>
                    <td className="px-6 py-4">Clear debts, reasonable defendants</td>
                    <td className="px-6 py-4 text-sm text-foreground/70">No enforcement power</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-green-50 hover:bg-green-100">
                    <td className="px-6 py-4 font-semibold">Small Claims Court</td>
                    <td className="px-6 py-4">$1,500-5,000+</td>
                    <td className="px-6 py-4">8-14 months</td>
                    <td className="px-6 py-4">Disputed amounts, $5K-50K claims</td>
                    <td className="px-6 py-4 text-sm text-foreground/70">Max $50,000; collection not guaranteed</td>
                  </tr>
                  <tr className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold">Superior Court (Lawyer)</td>
                    <td className="px-6 py-4">$10,000-50,000+</td>
                    <td className="px-6 py-4">1-3+ years</td>
                    <td className="px-6 py-4">Claims over $50K, complex litigation</td>
                    <td className="px-6 py-4 text-sm text-foreground/70">Expensive; significant cost risk if you lose</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold">Mediation/Arbitration</td>
                    <td className="px-6 py-4">$500-3,000</td>
                    <td className="px-6 py-4">1-3 months</td>
                    <td className="px-6 py-4">Both parties willing to negotiate</td>
                    <td className="px-6 py-4 text-sm text-foreground/70">Requires cooperation; may not be binding</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* STEP 4: Outcome Ranges by Case Type */}
        <div className="w-full py-16 bg-slate-50 border-y border-slate-200">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-3xl font-bold text-foreground">
                Realistic Outcome Ranges
              </h2>
            </div>
            <p className="font-paragraph text-lg text-foreground/70 mb-8">
              We can't guarantee results, but we can share typical outcomes based on case type. Every case is different.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Unpaid Debts / Invoices
                </h3>
                <p className="text-foreground/80 mb-3">
                  <strong>Settlement rate:</strong> 60-85% of claims settle before trial, often for 70-90% of the amount owed.
                </p>
                <p className="text-foreground/80 mb-3">
                  <strong>Trial success:</strong> With proper documentation, 70-85% of debt claims result in judgment for the plaintiff.
                </p>
                <p className="text-sm text-foreground/60">
                  <em>Key factors: Quality of documentation, defendant's ability to pay, whether debt is disputed.</em>
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Contract Disputes
                </h3>
                <p className="text-foreground/80 mb-3">
                  <strong>Written contracts:</strong> Stronger position - clear terms make outcomes more predictable.
                </p>
                <p className="text-foreground/80 mb-3">
                  <strong>Oral agreements:</strong> Harder to prove - success depends heavily on supporting evidence (texts, emails, witnesses).
                </p>
                <p className="text-sm text-foreground/60">
                  <em>Key factors: Clarity of agreement, breach evidence, mitigation of damages.</em>
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  Property Damage Claims
                </h3>
                <p className="text-foreground/80 mb-3">
                  <strong>With photo/video evidence:</strong> Strong cases typically recover 70-100% of documented repair costs.
                </p>
                <p className="text-foreground/80 mb-3">
                  <strong>Without documentation:</strong> Much harder - courts want proof of damage AND proof of who caused it.
                </p>
                <p className="text-sm text-foreground/60">
                  <em>Key factors: Photos before/after, repair estimates, proof of causation.</em>
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Security Deposit Recovery
                </h3>
                <p className="text-foreground/80 mb-3">
                  <strong>Typical recovery:</strong> Tenants often recover 80-100% of wrongfully withheld deposits.
                </p>
                <p className="text-foreground/80 mb-3">
                  <strong>Timeline:</strong> Often faster resolution as landlords frequently settle to avoid court.
                </p>
                <p className="text-sm text-foreground/60">
                  <em>Key factors: Move-in/move-out photos, lease terms, landlord's damage claims.</em>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Types of Cases Section */}
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Types of Small Claims Cases We Handle
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <DollarSign className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold mb-3">Debt Collection</h3>
                <p className="text-foreground/70">Unpaid invoices, personal loans, NSF cheques, and outstanding debts from individuals or businesses.</p>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <FileText className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold mb-3">Contract Disputes</h3>
                <p className="text-foreground/70">Breach of contract, service disputes, unfulfilled agreements, and contractor issues.</p>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <AlertTriangle className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold mb-3">Property Damage</h3>
                <p className="text-foreground/70">Damage to vehicles, property, personal belongings, and negligence claims.</p>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <Users className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold mb-3">Consumer Disputes</h3>
                <p className="text-foreground/70">Defective products, faulty services, warranty claims, and consumer protection issues.</p>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <Shield className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold mb-3">Security Deposits</h3>
                <p className="text-foreground/70">Recovery of wrongfully withheld rental deposits and damage disputes.</p>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <Briefcase className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold mb-3">Employment Claims</h3>
                <p className="text-foreground/70">Unpaid wages, wrongful dismissal (up to $50,000), and employment contract disputes.</p>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 6: Honest FAQs */}
        <div className="w-full py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-3xl font-bold text-foreground">
                Questions Competitors Avoid Answering
              </h2>
            </div>
            <p className="font-paragraph text-lg text-foreground/70 mb-8">
              The uncomfortable questions you're probably thinking but hesitant to ask.
            </p>
            
            <Accordion type="single" collapsible className="space-y-4">
              {honestFaqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-white rounded-lg border border-slate-200 px-6"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Related Services */}
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <RelatedServices currentService="small-claims" />
          </div>
        </div>
      </ServicePageLayout>
    </>
  );
}
