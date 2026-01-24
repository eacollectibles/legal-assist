import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, Scale, Clock, DollarSign, FileText, Car, HelpCircle, Shield, AlertCircle, Gauge } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CarelessDrivingDefencePage() {
  const authorityItems = [
    {
      title: 'Serious Charge Expertise',
      description: 'Careless driving is one of the most serious non-criminal traffic charges. I understand what\'s at stake and how to build an effective defence.'
    },
    {
      title: 'Evidence-Based Defence',
      description: 'Every careless driving case depends on the specific circumstances. I analyze witness statements, accident reports, and physical evidence to find weaknesses.'
    },
    {
      title: 'Realistic Case Assessment',
      description: 'I\'ll tell you honestly whether your case is defensible, what outcomes are realistic, and whether fighting or negotiating makes more sense.'
    }
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Disclosure Review',
      description: 'We obtain and analyze all Crown evidence—officer notes, witness statements, accident reconstruction reports, and any video evidence.'
    },
    {
      step: '2',
      title: 'Defence Strategy',
      description: 'Based on the evidence, we develop a defence strategy—whether challenging the Crown\'s case at trial or negotiating a reduction.'
    },
    {
      step: '3',
      title: 'Court Representation',
      description: 'I represent you through all court appearances, negotiations with the Crown, and trial if necessary.'
    }
  ];

  const reassuranceItems = [
    {
      icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />,
      title: 'Full Court Representation',
      description: 'You don\'t need to attend court—I handle all appearances, negotiations, and trial proceedings on your behalf.'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />,
      title: 'Insurance Impact Focus',
      description: 'A careless driving conviction can devastate your insurance rates. Every strategy aims to minimize or eliminate the insurance impact.'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />,
      title: 'Licence Protection',
      description: 'With 6 demerit points at stake and potential suspension, protecting your licence is a primary focus.'
    }
  ];

  const honestFAQs = [
    {
      question: "How serious is a careless driving charge?",
      answer: "Very serious. It's the most severe non-criminal driving charge in Ontario. Penalties include: 6 demerit points, fines from $400-$2,000, up to 6 months jail (rarely imposed), up to 2-year licence suspension, and potentially devastating insurance increases (50%+ or policy cancellation). If there was a collision with injuries, the stakes are even higher."
    },
    {
      question: "What's the difference between careless and dangerous driving?",
      answer: "Careless driving is a Provincial Offences Act charge—serious but not criminal. Dangerous driving is a Criminal Code offence with potential jail time and a criminal record. If you're charged with dangerous driving, you need a criminal defence lawyer, not a paralegal. Sometimes, police charge careless when dangerous might apply—this can work in your favour for negotiation."
    },
    {
      question: "Can a careless driving charge be reduced?",
      answer: "Often, yes. Common reductions include: 'follow too closely' (4 points), 'improper turn' (2 points), 'fail to yield' (3 points), or other lesser offences. Whether reduction is possible depends on the specific facts, evidence strength, and Crown's willingness to negotiate. Not every case can be reduced—some Crowns won't negotiate serious incidents."
    },
    {
      question: "What if there was an accident?",
      answer: "Accidents complicate careless driving cases significantly. If there were injuries, the Crown is less likely to negotiate reductions. If the other party sustained serious injuries, the charge may be upgraded to dangerous driving (criminal). However, accidents don't automatically mean you're guilty of careless driving—weather, road conditions, and the other party's actions all matter."
    },
    {
      question: "What if the other driver was also at fault?",
      answer: "Contributory negligence by the other driver can be a valid defence. If the evidence shows the other driver contributed to the collision through their own careless actions, this can create reasonable doubt about whether your driving alone was careless. We examine all evidence to identify the other party's role."
    },
    {
      question: "Should I talk to the other driver's insurance company?",
      answer: "No. Never give recorded statements to any insurance company without legal advice—including your own insurer. What you say can be used against you in the careless driving case. Consult with me first before speaking to anyone about the incident."
    },
    {
      question: "How long does a careless driving case take?",
      answer: "Typically 6-12 months from charge to resolution. Complex cases with trials can take longer. The timeline depends on court schedules, disclosure delays, and whether we proceed to trial or negotiate a resolution."
    }
  ];

  return (
    <>
      <SEO 
        title="Careless Driving Defence Paralegal | Fight Careless Driving Charges | Ontario"
        description="Licensed paralegal defending careless driving charges in Ontario. 6 demerit points, licence suspension risk, severe insurance impact. Honest assessment, aggressive defence. Free consultation."
        canonical="https://www.legalassist.london/services/careless-driving-defence"
      />
      <ServicePageLayout
        seoTitle="Careless Driving Defence Paralegal | Fight Careless Driving Charges | Ontario"
        seoDescription="Licensed paralegal defending careless driving charges in Ontario. 6 demerit points, licence suspension risk, severe insurance impact. Honest assessment, aggressive defence. Free consultation."
        canonical="https://www.legalassist.london/services/careless-driving-defence"
        problemHeadline="Careless Driving Defence in Ontario"
        problemDescription="Careless driving is one of the most serious traffic charges you can face—6 demerit points, potential licence suspension, and insurance rates that can double or triple. Before you panic or plead guilty, understand your options."
        heroImage={{
          src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png?id=careless-driving-hero",
          alt: "Ontario courtroom for careless driving defence"
        }}
        authorityItems={authorityItems}
        processSteps={processSteps}
        reassuranceItems={reassuranceItems}
      >
        {/* What's At Stake Section */}
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="mb-12">
              <h2 className="font-heading text-4xl font-bold text-foreground mb-6">
                What's Really at Stake with Careless Driving
              </h2>
              
              {/* Severity Callout */}
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
                <h3 className="font-heading text-xl font-bold text-red-800 mb-3">This is NOT a Minor Traffic Ticket</h3>
                <p className="text-red-900 text-lg">
                  Careless driving carries <strong>6 demerit points</strong>—the maximum for any non-criminal offence. A conviction can result in insurance increases of <strong>50-100%</strong> or outright policy cancellation. Some insurers won't cover you at all with a careless driving conviction.
                </p>
              </div>

              {/* Penalties Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="bg-red-50 rounded-lg p-6 border border-red-200 text-center">
                  <Gauge className="w-10 h-10 text-red-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-red-700 mb-2">6</div>
                  <p className="text-red-800 font-medium">Demerit Points</p>
                  <p className="text-sm text-red-700 mt-2">Maximum non-criminal points</p>
                </div>
                <div className="bg-red-50 rounded-lg p-6 border border-red-200 text-center">
                  <DollarSign className="w-10 h-10 text-red-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-red-700 mb-2">$2,000</div>
                  <p className="text-red-800 font-medium">Maximum Fine</p>
                  <p className="text-sm text-red-700 mt-2">Plus victim surcharge</p>
                </div>
                <div className="bg-red-50 rounded-lg p-6 border border-red-200 text-center">
                  <Car className="w-10 h-10 text-red-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-red-700 mb-2">2 Years</div>
                  <p className="text-red-800 font-medium">Licence Suspension</p>
                  <p className="text-sm text-red-700 mt-2">Possible maximum</p>
                </div>
                <div className="bg-red-50 rounded-lg p-6 border border-red-200 text-center">
                  <AlertCircle className="w-10 h-10 text-red-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-red-700 mb-2">50-100%</div>
                  <p className="text-red-800 font-medium">Insurance Increase</p>
                  <p className="text-sm text-red-700 mt-2">Or policy cancellation</p>
                </div>
              </div>
            </div>

            {/* Key Facts Box */}
            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-12">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">Key Facts About Careless Driving in Ontario</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Scale className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Legal Definition:</strong> "Driving without due care and attention or without reasonable consideration for other persons" (HTA s. 130). This is deliberately vague—almost any driving can be called "careless" if there's an accident.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Burden of Proof:</strong> The Crown must prove beyond a reasonable doubt that your driving was careless. An accident alone doesn't prove careless driving—they need to show how you drove carelessly.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Conviction Duration:</strong> A careless driving conviction stays on your driving record for 3 years and affects insurance for at least that long—often longer with some insurers.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Employment Impact:</strong> Professional drivers can lose their jobs. Anyone requiring a clean driving record for work faces serious employment consequences.</span>
                </li>
              </ul>
            </div>

            {/* Paralegal Scope */}
            <div className="mb-16">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What a Paralegal Can Do for Careless Driving</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h4 className="font-heading text-lg font-bold text-green-800">I Can Handle</h4>
                  </div>
                  <ul className="space-y-2 text-green-900">
                    <li>• Careless driving charges (HTA s. 130)</li>
                    <li>• All POA traffic offences</li>
                    <li>• Trial representation</li>
                    <li>• Crown negotiations</li>
                    <li>• Disclosure requests</li>
                    <li>• Demerit point defences</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                    <h4 className="font-heading text-lg font-bold text-yellow-800">Related Matters</h4>
                  </div>
                  <ul className="space-y-2 text-yellow-900">
                    <li>• Insurance claim disputes (Small Claims)</li>
                    <li>• Collision-related civil claims</li>
                    <li>• Licence reinstatement issues</li>
                    <li>• MTO hearings</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <XCircle className="w-6 h-6 text-red-600" />
                    <h4 className="font-heading text-lg font-bold text-red-800">Need a Lawyer</h4>
                  </div>
                  <ul className="space-y-2 text-red-900">
                    <li>• Dangerous driving (Criminal Code)</li>
                    <li>• Impaired driving/DUI</li>
                    <li>• Criminal negligence</li>
                    <li>• Charges involving death/injury</li>
                    <li>• Any criminal charges</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decision Framework */}
        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
              Should You Fight or Negotiate?
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-10">
              Careless driving cases often come down to a strategic choice: fight at trial or negotiate a reduction.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h3 className="font-heading text-lg font-bold text-green-800">Fight at Trial When:</h3>
                </div>
                <ul className="space-y-3 text-green-900">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                    <span>Evidence has clear weaknesses or gaps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                    <span>No accident or very minor collision</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                    <span>Witness statements conflict</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                    <span>Officer didn't witness the driving</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                    <span>Crown's case relies on assumptions</span>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  <h3 className="font-heading text-lg font-bold text-yellow-800">Negotiate When:</h3>
                </div>
                <ul className="space-y-3 text-yellow-900">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                    <span>Evidence is strong but reduction is possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                    <span>Clean driving record provides leverage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                    <span>You need certainty (employment reasons)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                    <span>Lesser charge eliminates worst consequences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                    <span>Time is a factor (quick resolution needed)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-6 h-6 text-red-600" />
                  <h3 className="font-heading text-lg font-bold text-red-800">Expect Difficulty When:</h3>
                </div>
                <ul className="space-y-3 text-red-900">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                    <span>Serious injuries to others</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                    <span>Clear video evidence of careless driving</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                    <span>Multiple independent witnesses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                    <span>Prior careless/dangerous driving history</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                    <span>Alcohol/drugs involved (even below limit)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Common Reductions */}
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
              Common Negotiated Reductions
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-10">
              When negotiation makes sense, these are typical outcomes that reduce the impact significantly.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Reduced To</th>
                    <th className="px-6 py-4 text-center font-heading">Points</th>
                    <th className="px-6 py-4 text-center font-heading">Insurance Impact</th>
                    <th className="px-6 py-4 text-left font-heading">When Likely</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-background/50">
                    <td className="px-6 py-4 font-bold">Follow Too Closely</td>
                    <td className="px-6 py-4 text-center"><span className="text-yellow-600 font-bold">4</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-yellow-600">Moderate</span></td>
                    <td className="px-6 py-4">Rear-end collisions, clean record</td>
                  </tr>
                  <tr className="hover:bg-background/50">
                    <td className="px-6 py-4 font-bold">Improper Turn</td>
                    <td className="px-6 py-4 text-center"><span className="text-green-600 font-bold">2</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-green-600">Lower</span></td>
                    <td className="px-6 py-4">Intersection collisions, turning incidents</td>
                  </tr>
                  <tr className="hover:bg-background/50">
                    <td className="px-6 py-4 font-bold">Fail to Yield</td>
                    <td className="px-6 py-4 text-center"><span className="text-yellow-600 font-bold">3</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-yellow-600">Moderate</span></td>
                    <td className="px-6 py-4">Intersection incidents, merging issues</td>
                  </tr>
                  <tr className="hover:bg-background/50">
                    <td className="px-6 py-4 font-bold">Unsafe Lane Change</td>
                    <td className="px-6 py-4 text-center"><span className="text-yellow-600 font-bold">3</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-yellow-600">Moderate</span></td>
                    <td className="px-6 py-4">Highway/lane change incidents</td>
                  </tr>
                  <tr className="hover:bg-background/50">
                    <td className="px-6 py-4 font-bold">Disobey Sign</td>
                    <td className="px-6 py-4 text-center"><span className="text-green-600 font-bold">2</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-green-600">Lower</span></td>
                    <td className="px-6 py-4">Sign-related incidents, minor collisions</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="font-paragraph text-sm text-foreground/60 mt-4 italic">
              * Reductions depend on Crown discretion, evidence strength, and individual circumstances. Not all cases can be reduced.
            </p>
          </div>
        </div>

        {/* Outcome Ranges */}
        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
              What Outcomes Can You Expect?
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-10">
              Based on typical cases, here's what outcomes look like for different scenarios.
            </p>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border border-border">
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">No Collision / Minor Incident</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="text-center p-3 bg-green-50 rounded">
                    <div className="text-2xl font-bold text-green-600">40-50%</div>
                    <div className="text-sm text-green-800">Withdrawn or acquitted</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded">
                    <div className="text-2xl font-bold text-blue-600">30-40%</div>
                    <div className="text-sm text-blue-800">Reduced to lesser offence</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded">
                    <div className="text-2xl font-bold text-yellow-600">10-20%</div>
                    <div className="text-sm text-yellow-800">Convicted as charged</div>
                  </div>
                </div>
                <div className="text-sm text-foreground/60 italic">
                  Best outcomes when officer didn't directly witness driving, weak evidence, or charge seems excessive
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-border">
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Property Damage Collision (No Injuries)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="text-center p-3 bg-green-50 rounded">
                    <div className="text-2xl font-bold text-green-600">15-25%</div>
                    <div className="text-sm text-green-800">Withdrawn or acquitted</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded">
                    <div className="text-2xl font-bold text-blue-600">50-60%</div>
                    <div className="text-sm text-blue-800">Reduced to lesser offence</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded">
                    <div className="text-2xl font-bold text-yellow-600">20-30%</div>
                    <div className="text-sm text-yellow-800">Convicted as charged</div>
                  </div>
                </div>
                <div className="text-sm text-foreground/60 italic">
                  Key factors: Who was at fault, road conditions, driving record, witness statements
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-border">
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Collision with Injuries</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="text-center p-3 bg-green-50 rounded">
                    <div className="text-2xl font-bold text-green-600">5-15%</div>
                    <div className="text-sm text-green-800">Withdrawn or acquitted</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded">
                    <div className="text-2xl font-bold text-blue-600">30-40%</div>
                    <div className="text-sm text-blue-800">Reduced to lesser offence</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded">
                    <div className="text-2xl font-bold text-red-600">45-60%</div>
                    <div className="text-sm text-red-800">Convicted (or upgraded charge)</div>
                  </div>
                </div>
                <div className="text-sm text-foreground/60 italic">
                  Injury cases are harder—Crown is less willing to negotiate. May face civil lawsuit regardless of criminal outcome.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Honest FAQs */}
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">
                Careless Driving: Honest Answers
              </h2>
            </div>
            <p className="font-paragraph text-lg text-foreground/80 mb-10">
              The questions people are afraid to ask about careless driving charges.
            </p>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {honestFAQs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-background rounded-lg border border-border px-6"
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
              Facing a Careless Driving Charge?
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
              Don't plead guilty without understanding your options. Get an honest assessment of your case and what outcomes are realistically possible.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors"
            >
              Get a Free Case Assessment
            </a>
          </div>
        </div>

        <RelatedServices services={relatedServicesConfig.trafficTickets} />
      </ServicePageLayout>
    </>
  );
}
