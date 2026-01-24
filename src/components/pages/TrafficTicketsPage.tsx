import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, Scale, Clock, DollarSign, FileText, Car, TrendingUp, HelpCircle, Shield, AlertCircle, Calculator, Gauge } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function TrafficTicketsPage() {
  const authorityItems = [
    {
      title: 'Insurance Impact Focus',
      description: 'The ticket fine is often the smallest cost. I focus on what actually matters: keeping demerit points off your record and your insurance rates down.'
    },
    {
      title: 'Evidence & Procedure Analysis',
      description: 'Every ticket has potential weaknesses—calibration issues, procedural errors, evidence gaps. I know what to look for and how to use it.'
    },
    {
      title: 'Honest Case Assessment',
      description: 'Before you fight, I\'ll tell you whether it\'s worth it. Some tickets should be fought aggressively; others aren\'t worth your time or money.'
    }
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Ticket Review',
      description: 'We review your ticket, analyze the charges, assess defences, and calculate whether fighting makes financial sense given the insurance impact.'
    },
    {
      step: '2',
      title: 'Disclosure & Strategy',
      description: 'We request Crown disclosure, review officer notes and evidence, identify weaknesses, and develop a defence or negotiation strategy.'
    },
    {
      step: '3',
      title: 'Court Representation',
      description: 'I appear in court for you—whether to negotiate a reduction or fight at trial. Most clients never need to attend at all.'
    }
  ];

  const reassuranceItems = [
    {
      icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />,
      title: 'You Don\'t Need to Attend Court',
      description: 'I handle everything—first appearances, disclosure requests, negotiations, and trial. Most clients never set foot in a courtroom.'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />,
      title: 'Realistic Outcome Expectations',
      description: 'I\'ll tell you the likely outcomes before you commit. No false promises—just honest assessments based on the specifics of your case.'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />,
      title: 'Insurance-Focused Strategy',
      description: 'Every negotiation and defence is aimed at minimizing the insurance impact, which is where the real cost lies for most tickets.'
    }
  ];

  const honestFAQs = [
    {
      question: "Is it worth fighting a speeding ticket?",
      answer: "Do the math. A $150 ticket with 3 demerit points can increase your insurance by 15-30% for three years. On a $300/month policy, that's $900-$1,800 extra over three years. Compared to $300-500 to fight the ticket (with a realistic chance of reduction or withdrawal), the math usually favours fighting. But if it's a zero-point ticket for minor speeding under 16 km/h over, the calculus changes—it might not be worth the effort."
    },
    {
      question: "What happens if I just pay the ticket?",
      answer: "Paying the ticket is a guilty plea. The conviction goes on your driving record for three years. Your insurance company will see it at renewal and adjust your rates accordingly. For tickets with demerit points, you're looking at significant premium increases. Once you pay, there's no taking it back."
    },
    {
      question: "Can you guarantee the ticket will be withdrawn?",
      answer: "No, and anyone who guarantees that is lying. What I can do is give you a realistic assessment based on the specific facts of your case—the type of ticket, the evidence, and what outcomes I've seen in similar situations. Some tickets have genuine problems that lead to withdrawals. Others are solid cases where reduction is the best realistic outcome."
    },
    {
      question: "What if I was definitely speeding?",
      answer: "What you did and what the Crown can prove are two different things. The prosecution has to prove its case beyond a reasonable doubt. Issues with officer notes, radar/laser calibration, evidence handling, or procedure can create reasonable doubt even in cases where you know you were speeding. We don't advise lying—we challenge whether the Crown met its burden."
    },
    {
      question: "How long does the process take?",
      answer: "Typically 3-8 months from the first appearance to resolution. The court schedules the timeline, not us. We file for disclosure, wait for trial dates, and negotiate when appropriate. If you need a faster resolution (for employment or licensing reasons), we can sometimes expedite, but it may limit negotiation options."
    },
    {
      question: "Will I have to go to court?",
      answer: "Usually no. I appear on your behalf for first appearances, disclosure requests, negotiations, and most trials. You would only need to attend if you're the only witness to something relevant, or if the trial requires your testimony. For straightforward tickets, most clients never see the inside of a courtroom."
    },
    {
      question: "What's the worst that can happen if I fight?",
      answer: "If you're convicted at trial, you pay the original fine plus a victim fine surcharge ($60-80). You don't get extra penalties for fighting—it's your right. The conviction goes on your record exactly as it would have if you'd paid originally. The only downside is the time and money spent fighting, which is why we do the cost-benefit analysis upfront."
    }
  ];

  return (
    <>
      <SEO 
        title="Traffic Ticket Defence Paralegal | Speeding & Demerit Points | London Ontario"
        description="Licensed paralegal for traffic ticket defence in Ontario. Fight speeding tickets, careless driving, stunt driving charges. Protect your insurance rates and driving record. Free consultation."
        canonical="https://www.legalassist.london/services/traffic-tickets"
      />
      <ServicePageLayout
        seoTitle="Traffic Ticket Defence Paralegal | Speeding & Demerit Points | London Ontario"
        seoDescription="Licensed paralegal for traffic ticket defence in Ontario. Fight speeding tickets, careless driving, stunt driving charges. Protect your insurance rates and driving record. Free consultation."
        canonical="https://www.legalassist.london/services/traffic-tickets"
        problemHeadline="Traffic Ticket Defence in Ontario"
        problemDescription="The fine on your ticket isn't the real cost—it's the insurance increase that follows. Before you pay or fight, understand what's actually at stake and whether fighting makes financial sense for your situation."
        heroImage={{
          src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png?id=traffic-tickets-hero",
          alt: "Ontario Provincial Offences Court for traffic ticket defence"
        }}
        authorityItems={authorityItems}
        processSteps={processSteps}
        reassuranceItems={reassuranceItems}
      >
        {/* The REAL Cost Section */}
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="mb-12">
              <h2 className="font-heading text-4xl font-bold text-foreground mb-6">
                The Real Cost of a Traffic Ticket
              </h2>
              
              {/* Real Cost Callout */}
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
                <h3 className="font-heading text-xl font-bold text-red-800 mb-3">It's Not About the Fine</h3>
                <p className="text-red-900 text-lg">
                  A single speeding conviction can increase your insurance by <strong>15-30% for three years</strong>. On a typical policy, that's <strong>$1,000-$3,000+ more</strong> than the fine on your ticket.
                </p>
              </div>

              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                Most people focus on the fine printed on the ticket. That's the smallest part of the cost. Insurance companies see every conviction on your driving record, and they adjust premiums accordingly. Three demerit points for speeding doesn't sound bad—until your renewal premium jumps $50-100/month.
              </p>
            </div>

            {/* Demerit Points & Insurance Impact Table */}
            <div className="mb-16">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Demerit Points & Insurance Impact Reference</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="px-6 py-4 text-left font-heading">Offence Type</th>
                      <th className="px-6 py-4 text-center font-heading">Demerit Points</th>
                      <th className="px-6 py-4 text-center font-heading">Typical Insurance Impact</th>
                      <th className="px-6 py-4 text-left font-heading">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="hover:bg-background/50">
                      <td className="px-6 py-4 font-medium">Speeding 1-15 km/h over</td>
                      <td className="px-6 py-4 text-center"><span className="text-green-600 font-bold">0</span></td>
                      <td className="px-6 py-4 text-center"><span className="text-green-600">Low/None</span></td>
                      <td className="px-6 py-4 text-sm text-foreground/70">Often not worth fighting unless you need clean record</td>
                    </tr>
                    <tr className="hover:bg-background/50">
                      <td className="px-6 py-4 font-medium">Speeding 16-29 km/h over</td>
                      <td className="px-6 py-4 text-center"><span className="text-yellow-600 font-bold">3</span></td>
                      <td className="px-6 py-4 text-center"><span className="text-yellow-600">15-25% increase</span></td>
                      <td className="px-6 py-4 text-sm text-foreground/70">Most common ticket - usually worth fighting</td>
                    </tr>
                    <tr className="hover:bg-background/50">
                      <td className="px-6 py-4 font-medium">Speeding 30-49 km/h over</td>
                      <td className="px-6 py-4 text-center"><span className="text-orange-600 font-bold">4</span></td>
                      <td className="px-6 py-4 text-center"><span className="text-orange-600">25-40% increase</span></td>
                      <td className="px-6 py-4 text-sm text-foreground/70">Serious ticket - strongly consider fighting</td>
                    </tr>
                    <tr className="hover:bg-background/50">
                      <td className="px-6 py-4 font-medium">Speeding 50+ km/h (Stunt)</td>
                      <td className="px-6 py-4 text-center"><span className="text-red-600 font-bold">6</span></td>
                      <td className="px-6 py-4 text-center"><span className="text-red-600">50%+ or denial</span></td>
                      <td className="px-6 py-4 text-sm text-foreground/70">Immediate roadside suspension, vehicle impound</td>
                    </tr>
                    <tr className="hover:bg-background/50">
                      <td className="px-6 py-4 font-medium">Careless Driving</td>
                      <td className="px-6 py-4 text-center"><span className="text-red-600 font-bold">6</span></td>
                      <td className="px-6 py-4 text-center"><span className="text-red-600">Severe - possible denial</span></td>
                      <td className="px-6 py-4 text-sm text-foreground/70">One of the most serious non-criminal offences</td>
                    </tr>
                    <tr className="hover:bg-background/50">
                      <td className="px-6 py-4 font-medium">Red Light / Stop Sign</td>
                      <td className="px-6 py-4 text-center"><span className="text-yellow-600 font-bold">3</span></td>
                      <td className="px-6 py-4 text-center"><span className="text-yellow-600">Moderate (15-25%)</span></td>
                      <td className="px-6 py-4 text-sm text-foreground/70">Camera tickets have NO demerit points</td>
                    </tr>
                    <tr className="hover:bg-background/50">
                      <td className="px-6 py-4 font-medium">Distracted Driving</td>
                      <td className="px-6 py-4 text-center"><span className="text-yellow-600 font-bold">3</span></td>
                      <td className="px-6 py-4 text-center"><span className="text-orange-600">High (25-40%)</span></td>
                      <td className="px-6 py-4 text-sm text-foreground/70">Insurers treat this seriously - fight strongly</td>
                    </tr>
                    <tr className="hover:bg-background/50">
                      <td className="px-6 py-4 font-medium">Follow Too Closely</td>
                      <td className="px-6 py-4 text-center"><span className="text-yellow-600 font-bold">4</span></td>
                      <td className="px-6 py-4 text-center"><span className="text-yellow-600">Moderate (15-25%)</span></td>
                      <td className="px-6 py-4 text-sm text-foreground/70">Often issued after accidents</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="font-paragraph text-sm text-foreground/60 mt-4 italic">
                * Insurance impacts are estimates based on typical rate changes. Actual impact varies by insurer, driving history, and other factors. Some insurers use conviction type; others use demerit points.
              </p>
            </div>

            {/* Key Facts Box */}
            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">Key Facts About Traffic Tickets in Ontario</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Scale className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Paralegal Representation:</strong> Licensed paralegals can fully represent you for Provincial Offences Act matters (traffic tickets). No lawyer required.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Conviction Duration:</strong> Traffic convictions stay on your driving record for 3 years and are visible to insurance companies at renewal.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Gauge className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Demerit Point Thresholds:</strong> Novice drivers (G1/G2) face suspension at 9 points. Full licence holders face suspension at 15 points.</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>No Points for Camera Tickets:</strong> Red light camera and photo radar tickets have no demerit points—they're registered to the vehicle, not the driver.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Decision Framework */}
        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
              Should You Fight, Negotiate, or Pay?
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-10">
              Not every ticket deserves the same response. Here's how to think through your options.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Fight Column */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h3 className="font-heading text-lg font-bold text-green-800">Fight When:</h3>
                </div>
                <ul className="space-y-3 text-green-900">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                    <span>Ticket carries demerit points that will affect insurance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                    <span>Serious charges (careless, stunt driving)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                    <span>You have high insurance rates already</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                    <span>You drive professionally (CDL, delivery, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                    <span>Evidence issues exist (calibration, procedure)</span>
                  </li>
                </ul>
              </div>

              {/* Negotiate Column */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  <h3 className="font-heading text-lg font-bold text-yellow-800">Negotiate When:</h3>
                </div>
                <ul className="space-y-3 text-yellow-900">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                    <span>Crown has a solid case but reduction is possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                    <span>You want to eliminate demerit points</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                    <span>Time is a factor (need quick resolution)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                    <span>Clean record gives leverage for reduction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                    <span>Certain outcome preferred over trial risk</span>
                  </li>
                </ul>
              </div>

              {/* Just Pay Column */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-6 h-6 text-gray-600" />
                  <h3 className="font-heading text-lg font-bold text-gray-800">Paying May Be OK When:</h3>
                </div>
                <ul className="space-y-3 text-gray-900">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-gray-600 flex-shrink-0 mt-1" />
                    <span>Zero-point speeding (under 16 km/h over)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-gray-600 flex-shrink-0 mt-1" />
                    <span>Clean record and low insurance rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-gray-600 flex-shrink-0 mt-1" />
                    <span>Fighting costs exceed insurance impact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-gray-600 flex-shrink-0 mt-1" />
                    <span>You rarely drive or don't own a vehicle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-gray-600 flex-shrink-0 mt-1" />
                    <span>Parking tickets (no driving record impact)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
              Your Options Compared
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-10">
              Different approaches have different costs, outcomes, and trade-offs.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Approach</th>
                    <th className="px-6 py-4 text-left font-heading">Cost</th>
                    <th className="px-6 py-4 text-left font-heading">Typical Outcome</th>
                    <th className="px-6 py-4 text-left font-heading">Your Time</th>
                    <th className="px-6 py-4 text-left font-heading">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-background/50">
                    <td className="px-6 py-4 font-bold">Just Pay</td>
                    <td className="px-6 py-4"><span className="text-green-600 font-medium">Fine only</span></td>
                    <td className="px-6 py-4"><span className="text-red-600">Full conviction</span></td>
                    <td className="px-6 py-4"><span className="text-green-600">Minutes</span></td>
                    <td className="px-6 py-4">Zero-point tickets, parking tickets</td>
                  </tr>
                  <tr className="hover:bg-background/50">
                    <td className="px-6 py-4 font-bold">Fight Yourself</td>
                    <td className="px-6 py-4"><span className="text-green-600 font-medium">$0 + time</span></td>
                    <td className="px-6 py-4"><span className="text-yellow-600">Unpredictable</span></td>
                    <td className="px-6 py-4"><span className="text-red-600">Multiple appearances</span></td>
                    <td className="px-6 py-4">Simple tickets, lots of free time</td>
                  </tr>
                  <tr className="hover:bg-background/50">
                    <td className="px-6 py-4 font-bold">Hire Paralegal</td>
                    <td className="px-6 py-4"><span className="text-yellow-600 font-medium">$300-800</span></td>
                    <td className="px-6 py-4"><span className="text-green-600">Often reduced/withdrawn</span></td>
                    <td className="px-6 py-4"><span className="text-green-600">Minimal</span></td>
                    <td className="px-6 py-4">Most traffic tickets</td>
                  </tr>
                  <tr className="hover:bg-background/50">
                    <td className="px-6 py-4 font-bold">Hire Lawyer</td>
                    <td className="px-6 py-4"><span className="text-red-600 font-medium">$1,500-5,000+</span></td>
                    <td className="px-6 py-4"><span className="text-green-600">Often reduced/withdrawn</span></td>
                    <td className="px-6 py-4"><span className="text-green-600">Minimal</span></td>
                    <td className="px-6 py-4">Criminal Code charges only</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="font-paragraph text-sm text-foreground/60 mt-4 italic">
              * Paralegals can handle all Provincial Offences Act matters (traffic tickets). Lawyers are only necessary for Criminal Code charges like impaired driving, dangerous driving, or criminal negligence.
            </p>
          </div>
        </div>

        {/* When Fighting is NOT Worth It */}
        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
              <h2 className="font-heading text-4xl font-bold text-foreground">
                When Fighting is NOT Worth It
              </h2>
            </div>
            <p className="font-paragraph text-lg text-foreground/80 mb-10">
              I'm in the business of fighting tickets, but I'll be honest—some tickets aren't worth the fight.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border border-border">
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Zero-Point Speeding (Under 16 km/h Over)</h3>
                <p className="text-foreground/80">No demerit points means minimal insurance impact. Unless you need an absolutely clean record for employment purposes, the cost of fighting likely exceeds the benefit.</p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-border">
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Red Light Camera Tickets</h3>
                <p className="text-foreground/80">Camera tickets have no demerit points—they're registered to the vehicle owner, not the driver. The insurance impact is minimal. Fighting usually costs more than paying.</p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-border">
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Parking Tickets</h3>
                <p className="text-foreground/80">Parking tickets don't appear on your driving record and don't affect insurance. Unless you have a legitimate defence (signage issues, permit problems), just pay them.</p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-border">
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">You Don't Drive Regularly</h3>
                <p className="text-foreground/80">If you don't own a car or rarely drive, the insurance impact may not apply to you. The cost-benefit changes significantly.</p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-border">
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Impaired / Criminal Code Charges</h3>
                <p className="text-foreground/80">Paralegals cannot represent you for Criminal Code offences like impaired driving, dangerous driving, or criminal negligence causing death/injury. You need a criminal defence lawyer.</p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-border">
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Ticket Far From Home</h3>
                <p className="text-foreground/80">If you got a ticket hours away, fighting it requires either travelling repeatedly or hiring a local paralegal. For minor tickets, the logistics may not be worth it.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Outcome Ranges */}
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
              What Outcomes Can You Expect?
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-10">
              I can't guarantee results, but I can share typical patterns based on ticket type.
            </p>

            <div className="space-y-6">
              <div className="bg-background rounded-lg p-6 border border-border">
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Speeding (16-29 km/h over)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="text-center p-3 bg-green-50 rounded">
                    <div className="text-2xl font-bold text-green-600">60-70%</div>
                    <div className="text-sm text-green-800">Reduced to 0-point offence</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded">
                    <div className="text-2xl font-bold text-blue-600">15-20%</div>
                    <div className="text-sm text-blue-800">Withdrawn entirely</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded">
                    <div className="text-2xl font-bold text-yellow-600">10-25%</div>
                    <div className="text-sm text-yellow-800">Convicted as charged</div>
                  </div>
                </div>
                <div className="text-sm text-foreground/60 italic">
                  Key factors: Officer availability, radar/laser documentation, your driving record
                </div>
              </div>

              <div className="bg-background rounded-lg p-6 border border-border">
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Careless Driving</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="text-center p-3 bg-green-50 rounded">
                    <div className="text-2xl font-bold text-green-600">50-60%</div>
                    <div className="text-sm text-green-800">Reduced to lesser offence</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded">
                    <div className="text-2xl font-bold text-blue-600">10-15%</div>
                    <div className="text-sm text-blue-800">Withdrawn</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded">
                    <div className="text-2xl font-bold text-yellow-600">25-40%</div>
                    <div className="text-sm text-yellow-800">Trial required</div>
                  </div>
                </div>
                <div className="text-sm text-foreground/60 italic">
                  Key factors: Circumstances of the incident, witness statements, whether collision occurred, injuries
                </div>
              </div>

              <div className="bg-background rounded-lg p-6 border border-border">
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Stunt Driving (50+ km/h over)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="text-center p-3 bg-green-50 rounded">
                    <div className="text-2xl font-bold text-green-600">30-40%</div>
                    <div className="text-sm text-green-800">Reduced to speeding</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded">
                    <div className="text-2xl font-bold text-blue-600">10-15%</div>
                    <div className="text-sm text-blue-800">Withdrawn</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded">
                    <div className="text-2xl font-bold text-red-600">45-60%</div>
                    <div className="text-sm text-red-800">Convicted (severe penalties)</div>
                  </div>
                </div>
                <div className="text-sm text-foreground/60 italic">
                  Key factors: Speed measured, location (school zone, highway), racing indicators, prior record
                </div>
              </div>

              <div className="bg-background rounded-lg p-6 border border-border">
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Red Light / Stop Sign (Non-Camera)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="text-center p-3 bg-green-50 rounded">
                    <div className="text-2xl font-bold text-green-600">50-60%</div>
                    <div className="text-sm text-green-800">Reduced to 0-point offence</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded">
                    <div className="text-2xl font-bold text-blue-600">10-15%</div>
                    <div className="text-sm text-blue-800">Withdrawn</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded">
                    <div className="text-2xl font-bold text-yellow-600">25-40%</div>
                    <div className="text-sm text-yellow-800">Convicted as charged</div>
                  </div>
                </div>
                <div className="text-sm text-foreground/60 italic">
                  Key factors: Officer's vantage point, intersection conditions, timing of light change
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Honest FAQs */}
        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">
                Questions Most People Are Afraid to Ask
              </h2>
            </div>
            <p className="font-paragraph text-lg text-foreground/80 mb-10">
              The real questions clients have but don't always voice. Here are honest answers.
            </p>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {honestFAQs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-white rounded-lg border border-border px-6"
                >
                  <AccordionTrigger className="text-left font-heading text-lg font-semibold py-6 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80 pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Call to Action */}
        <div className="w-full py-16 md:py-24 bg-primary/5">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
              Not Sure If Your Ticket is Worth Fighting?
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
              Send me your ticket and I'll give you an honest assessment—including whether fighting is worth the cost. No pressure, no obligation.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors"
            >
              Get a Free Ticket Assessment
            </a>
          </div>
        </div>

        <RelatedServices services={relatedServicesConfig.trafficTickets} />
      </ServicePageLayout>
    </>
  );
}
