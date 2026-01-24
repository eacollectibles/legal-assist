import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, Scale, Clock, DollarSign, FileText, Users, TrendingUp, HelpCircle, Home, Building } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function LandlordTenantBoardPage() {
  const authorityItems = [
    {
      title: 'Licensed LTB Representation',
      description: 'As a licensed paralegal, I can fully represent you at LTB hearings—whether you\'re a landlord seeking eviction or a tenant fighting one.'
    },
    {
      title: 'Both Sides of the Table',
      description: 'I represent both landlords and tenants. Understanding both perspectives helps me anticipate arguments and build stronger cases.'
    },
    {
      title: 'Honest Case Assessment',
      description: 'Before you file or fight, I\'ll tell you whether your case is strong, weak, or somewhere in between—and what realistic outcomes look like.'
    }
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Case Evaluation',
      description: 'We assess your situation, review documents, and determine whether the LTB is the right forum—and if you\'re likely to succeed.'
    },
    {
      step: '2',
      title: 'Application/Response Filing',
      description: 'Prepare and file applications or responses with proper documentation, meeting all deadlines and procedural requirements.'
    },
    {
      step: '3',
      title: 'Hearing Preparation & Representation',
      description: 'Organize evidence, prepare arguments, and represent you at the hearing to present the strongest possible case.'
    }
  ];

  const reassuranceItems = [
    {
      icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />,
      title: 'Full Hearing Representation',
      description: 'I represent you at LTB hearings—presenting evidence, examining witnesses, and making legal arguments on your behalf.'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />,
      title: 'Order Enforcement',
      description: 'Winning the hearing is step one. I help enforce LTB orders, including eviction enforcement and collection of arrears.'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />,
      title: 'Clear Communication',
      description: 'You\'ll understand your options, the likely outcomes, and what happens next at every stage of the process.'
    }
  ];

  const honestFAQs = [
    {
      question: "How long will it take to evict a non-paying tenant?",
      answer: "Realistically: 4-8 months from filing to enforcement. The LTB has significant backlogs. After filing an L1 application, you'll wait 1-3 months for a hearing. If the tenant doesn't show or doesn't dispute, you may get an order quickly. If they dispute, request delays, or file their own applications, add months. After getting an order, you need to file with the Sheriff's office, which has its own 1-3 month backlog. Fast evictions are rare; plan for the longer timeline."
    },
    {
      question: "Can a tenant just stop paying and stay for months?",
      answer: "Unfortunately, yes. Ontario's system is tenant-protective, which means even tenants who clearly owe rent can remain in the unit during the entire LTB process. Some tenants know this and use the system to stay rent-free as long as possible. While you'll likely win your case, collecting the arrears is another matter—many landlords get judgments but never collect."
    },
    {
      question: "What if my landlord gives me an N12 (personal use eviction)?",
      answer: "N12 evictions are frequently abused. If your landlord claims they or a family member needs the unit, they must actually move in and stay for at least one year. If they re-rent within that year, you can file with the LTB for compensation (typically 12 months' rent). I help tenants challenge suspicious N12s and pursue compensation when landlords act in bad faith."
    },
    {
      question: "Can I withhold rent if my landlord won't make repairs?",
      answer: "Legally, no—and it's a bad idea. Even if your landlord is neglecting repairs, withholding rent gives them grounds to evict you for non-payment. The correct approach is to file a T6 application for maintenance issues while continuing to pay rent. You can seek rent abatement (a rent reduction) for the period of disrepair. I know it feels unfair, but the law doesn't allow self-help remedies."
    },
    {
      question: "What happens if I lose at the LTB?",
      answer: "If you're a tenant who loses an eviction hearing, you'll receive an eviction order with a termination date (typically 11 days for non-payment, longer for other reasons). If you don't leave by that date, the landlord can file with the Sheriff for enforcement. If you're a landlord who loses, your application is dismissed—you'd need to start over with a new application if grounds still exist."
    },
    {
      question: "Can the other party delay the hearing?",
      answer: "Yes, and it's common. Either party can request adjournments, and the LTB often grants them for reasonable reasons. Tenants facing eviction sometimes use delay tactics to extend their stay. Landlords sometimes delay to build a stronger case. Each adjournment typically adds 1-3 months. We build potential delays into timeline expectations."
    },
    {
      question: "Will I actually collect the rent arrears owed to me?",
      answer: "Maybe, maybe not. Winning an order for arrears is different from collecting. If the tenant has a job, you can garnish wages. If they own property, you can file a lien. But if they're unemployed, have no assets, or disappear, your judgment may be uncollectible. We discuss collectability before you spend money pursuing arrears—sometimes it's not worth it."
    }
  ];

  return (
    <>
      <SEO 
        title="Landlord Tenant Board Paralegal | LTB Hearings | London Ontario"
        description="Licensed paralegal for Landlord and Tenant Board matters in Ontario. Full representation for landlords and tenants at LTB hearings. Evictions, rent disputes, maintenance claims. Honest case assessment."
        canonical="https://www.legalassist.london/services/landlord-tenant-board"
      />
      <ServicePageLayout
        seoTitle="Landlord Tenant Board Paralegal | LTB Hearings | London Ontario"
        seoDescription="Licensed paralegal for Landlord and Tenant Board matters in Ontario. Full representation for landlords and tenants at LTB hearings. Evictions, rent disputes, maintenance claims. Honest case assessment."
        canonical="https://www.legalassist.london/services/landlord-tenant-board"
        problemHeadline="Landlord Tenant Board Paralegal in Ontario"
        problemDescription="Facing an eviction? Trying to remove a problem tenant? Before you file or respond, understand what you're dealing with. I provide honest assessments and full LTB representation—because not every case is worth fighting."
        heroImage={{
          src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png?id=landlord-tenant-hero",
          alt: "Ontario Landlord and Tenant Board hearing room with Canadian flag"
        }}
        authorityItems={authorityItems}
        processSteps={processSteps}
        reassuranceItems={reassuranceItems}
      >
        {/* Jurisdiction & Scope - EXPLICIT FACTS */}
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="mb-12">
              <h2 className="font-heading text-4xl font-bold text-foreground mb-6">
                LTB Facts: What You Need to Know
              </h2>
              
              {/* Key Facts Box */}
              <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">Key Facts About the Landlord and Tenant Board</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Scale className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Jurisdiction:</strong> The LTB only handles residential tenancies covered by the Residential Tenancies Act. Commercial leases, most student housing, and some care homes are excluded.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Current Wait Times:</strong> Expect 2-4 months from filing to hearing for most applications. Complex cases or busy periods may take longer. Sheriff enforcement adds another 1-3 months.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Filing Fees:</strong> L1 (non-payment): $201 | T2/T6 (tenant applications): $53 | L2 (other evictions): $201. Fees may change; check current LTB fee schedule.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>2025 Rent Increase Guideline:</strong> 2.5% for most units. Landlords must give 90 days' notice using proper N1 form. Increases above guideline require AGI application.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Paralegal Representation:</strong> Licensed paralegals can fully represent landlords or tenants at all LTB proceedings—no lawyer required.</span>
                  </li>
                </ul>
              </div>

              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                The Landlord and Tenant Board is an administrative tribunal that resolves disputes under Ontario's Residential Tenancies Act. It's designed to be more accessible than court, but the process still has rules, deadlines, and strategic considerations that matter.
              </p>
            </div>

            {/* Paralegal Scope - CLEAR DISTINCTION */}
            <div className="mb-16">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6">What a Paralegal Can Do at the LTB</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Can Represent */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h4 className="font-heading text-lg font-bold text-green-800">Full Representation</h4>
                  </div>
                  <ul className="space-y-2 text-green-900">
                    <li>• All LTB applications (L1-L9, T1-T6, etc.)</li>
                    <li>• Eviction hearings (landlord or tenant)</li>
                    <li>• Rent arrears disputes</li>
                    <li>• Maintenance/repair applications</li>
                    <li>• Above-guideline rent increase hearings</li>
                    <li>• Review and appeal motions</li>
                  </ul>
                </div>

                {/* Related Services */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                    <h4 className="font-heading text-lg font-bold text-yellow-800">Related Matters I Handle</h4>
                  </div>
                  <ul className="space-y-2 text-yellow-900">
                    <li>• Small Claims Court (unpaid rent above LTB limits)</li>
                    <li>• Human Rights Tribunal (housing discrimination)</li>
                    <li>• Demand letters to landlords/tenants</li>
                    <li>• Sheriff enforcement assistance</li>
                    <li>• Security deposit disputes</li>
                  </ul>
                </div>

                {/* Must Refer */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <XCircle className="w-6 h-6 text-red-600" />
                    <h4 className="font-heading text-lg font-bold text-red-800">Need a Lawyer For</h4>
                  </div>
                  <ul className="space-y-2 text-red-900">
                    <li>• Commercial lease disputes</li>
                    <li>• Property ownership issues</li>
                    <li>• Complex real estate litigation</li>
                    <li>• LTB appeals to Divisional Court</li>
                    <li>• Matters outside RTA jurisdiction</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Key Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
                <div className="text-4xl font-bold text-primary mb-2">2-4</div>
                <p className="font-paragraph text-foreground/80">Months to Hearing (avg)</p>
              </div>
              <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
                <div className="text-4xl font-bold text-primary mb-2">2.5%</div>
                <p className="font-paragraph text-foreground/80">2025 Rent Guideline</p>
              </div>
              <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
                <div className="text-4xl font-bold text-primary mb-2">$201</div>
                <p className="font-paragraph text-foreground/80">L1/L2 Filing Fee</p>
              </div>
              <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
                <div className="text-4xl font-bold text-primary mb-2">90</div>
                <p className="font-paragraph text-foreground/80">Days Notice for Rent Increase</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decision Path Content - Landlords vs Tenants */}
        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
              Should You File, Negotiate, or Wait?
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-10">
              Not every dispute needs an LTB hearing. Here's how to think through your situation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Landlord Decision Path */}
              <div className="bg-white rounded-lg p-8 shadow-sm border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Building className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-foreground">For Landlords</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-heading text-lg font-bold text-green-700 mb-2">File an L1 When:</h4>
                    <ul className="space-y-2 text-foreground/80">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                        <span>Rent is 14+ days overdue</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                        <span>Tenant has ignored your N4 notice</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                        <span>This is a pattern, not a one-time issue</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-heading text-lg font-bold text-yellow-700 mb-2">Try Negotiation When:</h4>
                    <ul className="space-y-2 text-foreground/80">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                        <span>Tenant communicates and proposes payment plan</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                        <span>Temporary hardship (job loss, illness)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                        <span>Cost of vacancy exceeds arrears</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-heading text-lg font-bold text-red-700 mb-2">Think Twice When:</h4>
                    <ul className="space-y-2 text-foreground/80">
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                        <span>Tenant has legitimate maintenance complaints</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                        <span>Your paperwork (notices, lease) has issues</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                        <span>Tenant is likely uncollectible anyway</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tenant Decision Path */}
              <div className="bg-white rounded-lg p-8 shadow-sm border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Home className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-foreground">For Tenants</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-heading text-lg font-bold text-green-700 mb-2">Fight the Eviction When:</h4>
                    <ul className="space-y-2 text-foreground/80">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                        <span>Landlord's notice has procedural errors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                        <span>You have valid defences (maintenance issues, etc.)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                        <span>N12 seems to be bad faith (landlord wants higher rent)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-heading text-lg font-bold text-yellow-700 mb-2">Negotiate When:</h4>
                    <ul className="space-y-2 text-foreground/80">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                        <span>You owe rent but can propose a payment plan</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                        <span>You want to leave but need more time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                        <span>Cash-for-keys offer might benefit you</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-heading text-lg font-bold text-red-700 mb-2">Plan to Move When:</h4>
                    <ul className="space-y-2 text-foreground/80">
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                        <span>You have no defence and significant arrears</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                        <span>Fighting will just add to debt you owe</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                        <span>Relationship with landlord is unfixable</span>
                      </li>
                    </ul>
                  </div>
                </div>
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
              Different situations call for different approaches.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-heading">Approach</th>
                    <th className="px-6 py-4 text-left font-heading">Cost</th>
                    <th className="px-6 py-4 text-left font-heading">Timeline</th>
                    <th className="px-6 py-4 text-left font-heading">Stress</th>
                    <th className="px-6 py-4 text-left font-heading">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-background/50">
                    <td className="px-6 py-4 font-bold">Direct Negotiation</td>
                    <td className="px-6 py-4"><span className="text-green-600 font-medium">$0-300</span></td>
                    <td className="px-6 py-4"><span className="text-green-600 font-medium">Days to weeks</span></td>
                    <td className="px-6 py-4"><span className="text-green-600 font-medium">Low</span></td>
                    <td className="px-6 py-4">Minor disputes, good-faith parties</td>
                  </tr>
                  <tr className="hover:bg-background/50">
                    <td className="px-6 py-4 font-bold">Paralegal Letter</td>
                    <td className="px-6 py-4"><span className="text-green-600 font-medium">$150-400</span></td>
                    <td className="px-6 py-4"><span className="text-green-600 font-medium">1-3 weeks</span></td>
                    <td className="px-6 py-4"><span className="text-green-600 font-medium">Low</span></td>
                    <td className="px-6 py-4">When you need leverage without filing</td>
                  </tr>
                  <tr className="hover:bg-background/50">
                    <td className="px-6 py-4 font-bold">LTB Application</td>
                    <td className="px-6 py-4"><span className="text-yellow-600 font-medium">$1,000-3,000+</span></td>
                    <td className="px-6 py-4"><span className="text-yellow-600 font-medium">2-6 months</span></td>
                    <td className="px-6 py-4"><span className="text-yellow-600 font-medium">Medium</span></td>
                    <td className="px-6 py-4">Clear violations, uncooperative parties</td>
                  </tr>
                  <tr className="hover:bg-background/50">
                    <td className="px-6 py-4 font-bold">LTB + Enforcement</td>
                    <td className="px-6 py-4"><span className="text-red-600 font-medium">$2,000-5,000+</span></td>
                    <td className="px-6 py-4"><span className="text-red-600 font-medium">4-8+ months</span></td>
                    <td className="px-6 py-4"><span className="text-red-600 font-medium">High</span></td>
                    <td className="px-6 py-4">Evictions requiring Sheriff involvement</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="font-paragraph text-sm text-foreground/60 mt-4 italic">
              * Costs include paralegal fees and filing fees. Actual costs vary based on complexity and whether the matter settles or proceeds to hearing.
            </p>
          </div>
        </div>

        {/* When LTB is NOT the Right Option */}
        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
              <h2 className="font-heading text-4xl font-bold text-foreground">
                When the LTB is NOT the Right Option
              </h2>
            </div>
            <p className="font-paragraph text-lg text-foreground/80 mb-10">
              The LTB has specific jurisdiction. Here's when you need a different approach:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border border-border">
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Commercial Leases</h3>
                <p className="text-foreground/80">Business tenancies aren't covered by the Residential Tenancies Act. Commercial landlord-tenant disputes go to Small Claims Court (up to $50,000) or Superior Court. Different rules, different timelines.</p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-border">
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Student Housing (with Exemptions)</h3>
                <p className="text-foreground/80">Student housing provided by universities/colleges and housing where you share a kitchen or bathroom with the landlord or their family is often exempt from the RTA. Different rules apply.</p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-border">
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Roommate Disputes</h3>
                <p className="text-foreground/80">If you're subletting from another tenant or renting a room in someone's home (and they live there), you may not have RTA protection. These situations often need Small Claims Court instead.</p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-border">
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Arrears Exceeding Rent Deposit</h3>
                <p className="text-foreground/80">The LTB can order rent arrears, but for amounts significantly above what the tenant can pay, collection may require Small Claims Court judgment and enforcement tools like wage garnishment.</p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-border">
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Housing Discrimination</h3>
                <p className="text-foreground/80">If you've been discriminated against in housing based on race, disability, family status, etc., the Human Rights Tribunal of Ontario (not the LTB) has jurisdiction. Different process, potentially larger remedies.</p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-border">
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Criminal Matters</h3>
                <p className="text-foreground/80">Illegal lockouts, threats, or other criminal behaviour by landlords or tenants can involve police and criminal courts. The LTB deals with civil matters, not criminal ones.</p>
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
              I can't guarantee results, but I can share typical patterns based on case type.
            </p>

            <div className="space-y-6">
              <div className="bg-background rounded-lg p-6 border border-border">
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">L1 - Non-Payment of Rent (Landlords)</h3>
                <p className="text-foreground/80 mb-3">
                  Most L1 applications succeed if the landlord followed proper procedures. Tenants sometimes pay arrears before the hearing to avoid eviction. If they don't, expect an eviction order with a standard 11-day termination date. Collection of arrears is separate—many landlords get orders but collect little.
                </p>
                <div className="text-sm text-foreground/60 italic">
                  Key factors: Proper N4 notice, accurate arrears calculation, tenant's ability to pay or vacate
                </div>
              </div>

              <div className="bg-background rounded-lg p-6 border border-border">
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">N12 - Personal Use Eviction Defence (Tenants)</h3>
                <p className="text-foreground/80 mb-3">
                  N12 defences succeed when tenants can show bad faith—evidence the landlord intends to re-rent at higher rates rather than actually moving in. Successful defences can result in dismissal of the application. If the landlord does evict and doesn't move in, tenants can seek 12 months' rent compensation.
                </p>
                <div className="text-sm text-foreground/60 italic">
                  Key factors: Evidence of landlord's true intentions, documentation of similar units listed for rent
                </div>
              </div>

              <div className="bg-background rounded-lg p-6 border border-border">
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">T6 - Maintenance/Repair Applications (Tenants)</h3>
                <p className="text-foreground/80 mb-3">
                  T6 applications for maintenance issues often result in rent abatement orders of 10-30% of rent for the period of disrepair, plus orders requiring the landlord to complete repairs. Outcomes depend heavily on documentation—photos, written complaints, and evidence of landlord's knowledge.
                </p>
                <div className="text-sm text-foreground/60 italic">
                  Key factors: Documentation of issues, written complaints to landlord, evidence of impact on livability
                </div>
              </div>

              <div className="bg-background rounded-lg p-6 border border-border">
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">T2 - Tenant Rights Applications (Tenants)</h3>
                <p className="text-foreground/80 mb-3">
                  T2 applications for harassment, illegal entry, or withheld services can result in rent abatement, damages, and orders to cease the behaviour. Awards vary widely—minor issues might get small abatements, while serious harassment can result in significant compensation.
                </p>
                <div className="text-sm text-foreground/60 italic">
                  Key factors: Severity of landlord's conduct, documentation (texts, emails, videos), impact on tenant
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
              Not Sure How to Handle Your LTB Matter?
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
              Book a consultation and I'll give you an honest assessment—whether you're a landlord or tenant. If filing isn't the right move, I'll tell you.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors"
            >
              Get an Honest Assessment
            </a>
          </div>
        </div>

        <RelatedServices services={relatedServicesConfig.landlordTenant} />
      </ServicePageLayout>
    </>
  );
}
