import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { ChevronRight, Banknote, Car, Building, FileSearch, AlertTriangle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQSection } from '@/components/FAQSection';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { PHONE_HREF, PHONE_DISPLAY } from '@/lib/contact';

const faqs = [
  {
    question: 'How long is a judgment valid in Ontario?',
    answer: 'A Small Claims Court judgment is valid for 6 years from the date it was made. You can renew it before it expires by filing a motion. A Superior Court judgment is valid for 20 years. Interest continues to accrue on unpaid judgments at the post-judgment interest rate (currently around 5%).'
  },
  {
    question: 'What if the debtor has no money or assets?',
    answer: 'If the debtor is "judgment proof" (no income or assets to seize), you may need to wait until their situation improves. The judgment remains valid for years, and you can periodically conduct new examinations to check their financial status. Some creditors wait until the debtor gets a job or buys property.'
  },
  {
    question: 'Can I garnish wages in Ontario?',
    answer: 'Yes, wage garnishment is one of the most effective enforcement methods. You can garnish up to 20% of gross wages (50% for family support). File a Notice of Garnishment with the court, then serve it on the employer. The employer must deduct and remit funds directly to the court.'
  },
  {
    question: 'How much does it cost to enforce a judgment?',
    answer: 'Enforcement costs vary: Examination hearing ($35), Notice of Garnishment ($35), Writ of Seizure and Sale ($35 + bailiff fees which can range from $200-$500+), property registration ($25). You can add these costs to the judgment amount, so the debtor ultimately pays.'
  },
  {
    question: 'Can I seize a debtor\'s car or house?',
    answer: 'Yes, but with limitations. For vehicles, a bailiff can seize and sell them. For real property (house, land), you register a Writ of Seizure and Sale on title, which prevents sale/refinancing without paying you first. However, Ontario\'s Execution Act exempts certain property from seizure.'
  }
];

const enforcementMethods = [
  {
    icon: FileSearch,
    title: 'Examination of Debtor',
    subtitle: 'Find their assets',
    description: 'Before enforcement, discover what the debtor owns. File a Notice of Examination and summon the debtor to court to answer questions under oath about their income, bank accounts, property, and assets.',
    steps: [
      'File Notice of Examination ($35 fee)',
      'Serve the debtor with the notice',
      'Debtor must attend and bring financial documents',
      'Question them about all income and assets',
      'Use this information to choose enforcement method'
    ]
  },
  {
    icon: Banknote,
    title: 'Garnishment of Wages/Bank Accounts',
    subtitle: 'Most common method',
    description: 'Redirect money directly from the debtor\'s employer or bank account to satisfy your judgment. This is often the most effective method for debtors with steady employment.',
    steps: [
      'File Notice of Garnishment ($35 fee)',
      'Serve on employer or bank (garnishee)',
      'Garnishee must remit funds to court within 10 days',
      'Up to 20% of gross wages can be garnished',
      'Bank accounts can be fully frozen/garnished'
    ]
  },
  {
    icon: Car,
    title: 'Seizure of Personal Property',
    subtitle: 'Vehicles, equipment, goods',
    description: 'A bailiff can seize and sell the debtor\'s personal property (vehicles, equipment, valuables) to satisfy the judgment. Some property is exempt from seizure.',
    steps: [
      'File Writ of Seizure and Sale of Personal Property',
      'Pay bailiff fees (varies by region)',
      'Bailiff attends debtor\'s location',
      'Seizes non-exempt assets',
      'Assets are sold at auction, proceeds go to creditor'
    ]
  },
  {
    icon: Building,
    title: 'Writ Against Real Property',
    subtitle: 'Land & buildings',
    description: 'Register a Writ of Seizure and Sale against the debtor\'s real estate. This creates a lien that must be paid before the property can be sold or refinanced.',
    steps: [
      'File Writ of Seizure and Sale of Land ($35)',
      'Register writ at Land Registry Office ($25)',
      'Writ attaches to any property debtor owns',
      'Debtor cannot sell/refinance without paying you',
      'Can eventually force sale of property'
    ]
  }
];

export default function EnforceJudgmentOntarioPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="How to Enforce a Judgment in Ontario | Garnishment, Seizure & Collection"
        description="Step-by-step guide to collecting on a court judgment in Ontario. Learn about wage garnishment, bank account seizure, property liens, and examination hearings. Get help from a licensed paralegal."
        canonical="https://www.legalassist.london/guides/enforce-judgment-ontario"
      />
      <Header />
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 pt-4">
        <Breadcrumbs />
      </div>

      {/* Hero Section with Summary */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            How to Enforce a Judgment in Ontario
          </h1>
          
          {/* Quick Summary */}
          <div className="bg-white border-l-4 border-primary p-6 rounded-r-lg shadow-sm mb-8">
            <p className="font-paragraph text-lg text-foreground/90 leading-relaxed">
              <strong>Quick Summary:</strong> Winning a court case is only half the battle—collecting the money is the other half. 
              Ontario law provides several enforcement tools: wage and bank account garnishment, seizure of personal property, and liens on real estate. 
              Start by examining the debtor to discover their assets, then choose the best method for your situation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/booking">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Get Help Collecting
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

      {/* Step-by-Step Overview */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
            The Judgment Enforcement Process
          </h2>
          <p className="font-paragraph text-lg text-foreground/70 mb-8">
            Follow these steps to collect on your judgment efficiently and legally.
          </p>
          
          <div className="space-y-4 mb-12">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h3 className="font-semibold text-foreground">Wait 30 Days (or Appeal Period)</h3>
                <p className="text-foreground/70">The debtor has time to appeal or pay voluntarily. You can't enforce immediately after judgment.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h3 className="font-semibold text-foreground">Request Certificate of Judgment</h3>
                <p className="text-foreground/70">Get an official certificate from the court confirming the judgment amount, date, and parties.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <h3 className="font-semibold text-foreground">Examine the Debtor</h3>
                <p className="text-foreground/70">Summon the debtor to court to discover their assets, income, bank accounts, and property under oath.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
              <div>
                <h3 className="font-semibold text-foreground">Choose Enforcement Method</h3>
                <p className="text-foreground/70">Based on what you learn, select garnishment, seizure, or property lien—or a combination.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">5</div>
              <div>
                <h3 className="font-semibold text-foreground">Execute & Collect</h3>
                <p className="text-foreground/70">File the appropriate paperwork and work with the court or bailiff to collect your money.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enforcement Methods Detail */}
      <section className="w-full py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
            Enforcement Methods Explained
          </h2>
          
          <div className="space-y-8">
            {enforcementMethods.map((method, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <method.icon className="h-10 w-10 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-semibold text-foreground">{method.title}</h3>
                    <p className="text-primary font-medium text-sm mb-2">{method.subtitle}</p>
                    <p className="text-foreground/80 mb-4">{method.description}</p>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-sm text-foreground mb-2">Steps:</h4>
                      <ol className="space-y-1">
                        {method.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start gap-2 text-sm text-foreground/70">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="w-full py-8 bg-amber-50 border-y border-amber-200">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Important: Some Property is Exempt</h3>
              <p className="text-foreground/80 text-sm">
                Ontario's Execution Act protects certain assets from seizure: necessary clothing, household furniture (up to $14,180), 
                tools of the trade ($14,180), one motor vehicle ($7,117), and principal residence equity ($10,783). 
                Understanding these exemptions is crucial for effective enforcement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-16 bg-white">
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
            Having Trouble Collecting Your Judgment?
          </h2>
          <p className="font-paragraph text-lg text-foreground/80 mb-8">
            Enforcing a judgment can be complex and time-consuming. A licensed paralegal can handle the paperwork, 
            examinations, and enforcement proceedings on your behalf—often recovering money faster than self-enforcement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8">
                Book Free Consultation
              </Button>
            </Link>
            <Link to="/services/small-claims">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                Our Debt Collection Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <RelatedServices currentPath="/guides/enforce-judgment-ontario" config={relatedServicesConfig['/services/small-claims'] || relatedServicesConfig.default} />

      <Footer />
    </div>
  );
}
