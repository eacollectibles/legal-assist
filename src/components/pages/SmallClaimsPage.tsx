import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { ChevronRight, CheckCircle, Users, FileText, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SmallClaimsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
                Small Claims Court Services
              </h1>
              <p className="font-paragraph text-lg text-foreground/80 mb-8">
                Expert legal representation for civil disputes up to $50,000 in Ontario. Whether you're an applicant seeking compensation or a defendant protecting your interests, we provide comprehensive support throughout the entire process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button className="bg-primary hover:bg-primary/90 text-white w-full">
                    Get Started Today
                  </Button>
                </Link>
                <Link to="/booking">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 w-full">
                    Schedule Consultation
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://static.wixstatic.com/media/99571b_550f67d8225c4defa23bfe4f0a39d9aa~mv2.png?id=small-claims-hero"
                alt="Small Claims Court"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="mb-12">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">
              What is Small Claims Court?
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-6">
              Small Claims Court is an accessible division of the Ontario Court of Justice designed to resolve civil disputes efficiently and affordably. It handles claims up to $50,000 (or $35,000 if the defendant does not agree to the higher limit), making it ideal for individuals and small businesses seeking compensation for various disputes.
            </p>
            <p className="font-paragraph text-lg text-foreground/80">
              Our firm specializes in representing both applicants and defendants, ensuring your rights are protected and your case is presented effectively before the court.
            </p>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">$50,000</div>
              <p className="font-paragraph text-foreground/80">Maximum Claim Amount</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">6-12</div>
              <p className="font-paragraph text-foreground/80">Months Average Timeline</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">Lower</div>
              <p className="font-paragraph text-foreground/80">Court Fees vs. Superior Court</p>
            </div>
            <div className="bg-pastelbeige/30 rounded-lg p-6 border border-pastelbeige">
              <div className="text-4xl font-bold text-primary mb-2">Accessible</div>
              <p className="font-paragraph text-foreground/80">Self-Representation Friendly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Reasons for Small Claims */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="mb-12">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">
              Most Common Reasons People Go to Small Claims Court
            </h2>
            <p className="font-paragraph text-lg text-foreground/80">
              Small Claims Court is designed to handle a wide variety of civil disputes. Below are the most common types of claims we help clients with, along with specific examples of each category.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Unpaid Invoices & Debts */}
            <div className="bg-gradient-to-br from-pastelbeige/30 to-transparent rounded-lg p-8 border border-pastelbeige">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  Unpaid Invoices & Debts
                </h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-6">
                When clients or customers fail to pay for services or goods provided, Small Claims Court is an effective way to recover the owed amount.
              </p>
              <div className="space-y-3">
                <div className="bg-white rounded p-4 border border-pastelbeige/50">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Contractor unpaid for renovation work:</strong> A homeowner hired a contractor to renovate their kitchen for $8,000 but refused to pay after completion.
                  </p>
                </div>
                <div className="bg-white rounded p-4 border border-pastelbeige/50">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Freelancer unpaid for services:</strong> A graphic designer completed a logo design project for $2,500 but the client never paid the invoice.
                  </p>
                </div>
                <div className="bg-white rounded p-4 border border-pastelbeige/50">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Unpaid loan between friends:</strong> A person lent $3,000 to a friend with a verbal agreement to repay, but the friend refuses to pay back.
                  </p>
                </div>
                <div className="bg-white rounded p-4 border border-pastelbeige/50">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Unpaid medical or dental bills:</strong> A patient received dental treatment worth $1,500 and the bill remains unpaid despite multiple payment requests.
                  </p>
                </div>
              </div>
            </div>

            {/* Breach of Contract */}
            <div className="bg-gradient-to-br from-pastelgreen/20 to-transparent rounded-lg p-8 border border-pastelgreen/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  Breach of Contract
                </h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-6">
                When one party fails to fulfill their obligations under a written or verbal agreement, you can pursue damages in Small Claims Court.
              </p>
              <div className="space-y-3">
                <div className="bg-white rounded p-4 border border-pastelgreen/30">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Incomplete home repairs:</strong> A contractor agreed to repair a roof for $5,000 but abandoned the project halfway through.
                  </p>
                </div>
                <div className="bg-white rounded p-4 border border-pastelgreen/30">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Wedding vendor failure:</strong> A catering company failed to show up for a wedding, causing significant loss and disappointment.
                  </p>
                </div>
                <div className="bg-white rounded p-4 border border-pastelgreen/30">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Defective product or service:</strong> A furniture company delivered a damaged sofa that was supposed to be in perfect condition per the contract.
                  </p>
                </div>
                <div className="bg-white rounded p-4 border border-pastelgreen/30">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Non-performance of services:</strong> A personal trainer was paid $1,200 for 12 sessions but only provided 3 before disappearing.
                  </p>
                </div>
              </div>
            </div>

            {/* Property Damage */}
            <div className="bg-gradient-to-br from-pastellavender/20 to-transparent rounded-lg p-8 border border-pastellavender/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  Property Damage
                </h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-6">
                When someone damages your property through negligence or intentional action, you can claim compensation for repairs or replacement.
              </p>
              <div className="space-y-3">
                <div className="bg-white rounded p-4 border border-pastellavender/30">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Car accident damage:</strong> Another driver hit your parked car, causing $4,000 in damage, and their insurance won't cover it.
                  </p>
                </div>
                <div className="bg-white rounded p-4 border border-pastellavender/30">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Water damage from neighbor:</strong> A neighbor's burst pipe flooded your basement, causing $6,000 in damage to your belongings.
                  </p>
                </div>
                <div className="bg-white rounded p-4 border border-pastellavender/30">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Damage during moving:</strong> A moving company damaged your furniture and appliances worth $3,500 during relocation.
                  </p>
                </div>
                <div className="bg-white rounded p-4 border border-pastellavender/30">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Vandalism or intentional damage:</strong> Someone deliberately damaged your property (fence, vehicle, etc.) causing $2,000 in repairs.
                  </p>
                </div>
              </div>
            </div>

            {/* Recovery of Personal Property */}
            <div className="bg-gradient-to-br from-pastelpeach/20 to-transparent rounded-lg p-8 border border-pastelpeach/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  Recovery of Personal Property
                </h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-6">
                When someone wrongfully keeps your personal property or refuses to return borrowed items, you can pursue recovery through Small Claims Court.
              </p>
              <div className="space-y-3">
                <div className="bg-white rounded p-4 border border-pastelpeach/30">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Unreturned borrowed items:</strong> A friend borrowed your laptop worth $1,200 and refuses to return it despite multiple requests.
                  </p>
                </div>
                <div className="bg-white rounded p-4 border border-pastelpeach/30">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Tenant left behind belongings:</strong> A former tenant left behind valuable items worth $2,000 that you're storing, and they refuse to collect.
                  </p>
                </div>
                <div className="bg-white rounded p-4 border border-pastelpeach/30">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Unreturned security deposit:</strong> A landlord wrongfully withheld your $1,500 security deposit without proper itemization.
                  </p>
                </div>
                <div className="bg-white rounded p-4 border border-pastelpeach/30">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Unreturned tools or equipment:</strong> A contractor borrowed expensive tools worth $3,000 and refuses to return them.
                  </p>
                </div>
              </div>
            </div>

            {/* Landlord-Tenant Disputes */}
            <div className="bg-gradient-to-br from-pastelbeige/30 to-transparent rounded-lg p-8 border border-pastelbeige">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  Landlord-Tenant Disputes
                </h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-6">
                While many landlord-tenant matters go to the Landlord and Tenant Board, Small Claims Court can handle certain disputes within its monetary jurisdiction.
              </p>
              <div className="space-y-3">
                <div className="bg-white rounded p-4 border border-pastelbeige/50">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Wrongful withholding of deposit:</strong> A landlord refused to return a $1,200 security deposit without proper documentation of deductions.
                  </p>
                </div>
                <div className="bg-white rounded p-4 border border-pastelbeige/50">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Unpaid rent recovery:</strong> A tenant owes $4,000 in unpaid rent and has vacated the property.
                  </p>
                </div>
                <div className="bg-white rounded p-4 border border-pastelbeige/50">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Damage claim disputes:</strong> A landlord claims $2,500 in damages beyond normal wear and tear that a tenant disputes.
                  </p>
                </div>
                <div className="bg-white rounded p-4 border border-pastelbeige/50">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Utility cost disputes:</strong> A landlord is claiming a tenant owes $800 for utilities allegedly used beyond the lease agreement.
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Injury & Negligence */}
            <div className="bg-gradient-to-br from-pastelgreen/20 to-transparent rounded-lg p-8 border border-pastelgreen/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  Personal Injury & Negligence
                </h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-6">
                Claims for injuries caused by someone's negligence can be pursued in Small Claims Court if the damages are within the monetary limit.
              </p>
              <div className="space-y-3">
                <div className="bg-white rounded p-4 border border-pastelgreen/30">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Slip and fall injury:</strong> You slipped on a wet floor in a store and suffered injuries costing $3,000 in medical bills.
                  </p>
                </div>
                <div className="bg-white rounded p-4 border border-pastelgreen/30">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Dog bite injury:</strong> A neighbor's dog bit you, causing injuries and medical expenses totaling $2,500.
                  </p>
                </div>
                <div className="bg-white rounded p-4 border border-pastelgreen/30">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Unsafe premises injury:</strong> You were injured due to unsafe conditions on someone's property (broken stairs, poor lighting, etc.).
                  </p>
                </div>
                <div className="bg-white rounded p-4 border border-pastelgreen/30">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Product defect injury:</strong> A defective product caused you injury and you're seeking compensation for medical costs and pain.
                  </p>
                </div>
              </div>
            </div>

            {/* Business Disputes */}
            <div className="bg-gradient-to-br from-pastellavender/20 to-transparent rounded-lg p-8 border border-pastellavender/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  Business Disputes
                </h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-6">
                Small business owners frequently use Small Claims Court to resolve disputes with suppliers, customers, and business partners.
              </p>
              <div className="space-y-3">
                <div className="bg-white rounded p-4 border border-pastellavender/30">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Supplier non-delivery:</strong> A supplier accepted payment for goods worth $4,000 but never delivered the items.
                  </p>
                </div>
                <div className="bg-white rounded p-4 border border-pastellavender/30">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Defective merchandise:</strong> A business received defective products from a supplier that cannot be resold, causing $3,500 loss.
                  </p>
                </div>
                <div className="bg-white rounded p-4 border border-pastellavender/30">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Partnership dispute:</strong> A business partner withdrew from the partnership and owes $2,000 for their share of expenses.
                  </p>
                </div>
                <div className="bg-white rounded p-4 border border-pastellavender/30">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Customer non-payment:</strong> A customer received services worth $5,000 but refuses to pay the invoice.
                  </p>
                </div>
              </div>
            </div>

            {/* Other Common Claims */}
            <div className="bg-gradient-to-br from-pastelpeach/20 to-transparent rounded-lg p-8 border border-pastelpeach/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  Other Common Claims
                </h3>
              </div>
              <p className="font-paragraph text-foreground/80 mb-6">
                Small Claims Court handles many other types of disputes that don't fit neatly into other categories.
              </p>
              <div className="space-y-3">
                <div className="bg-white rounded p-4 border border-pastelpeach/30">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Overpayment recovery:</strong> You overpaid an invoice and the vendor refuses to refund the excess amount.
                  </p>
                </div>
                <div className="bg-white rounded p-4 border border-pastelpeach/30">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Defective vehicle purchase:</strong> You purchased a used vehicle that had hidden defects not disclosed by the seller.
                  </p>
                </div>
                <div className="bg-white rounded p-4 border border-pastelpeach/30">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Membership or subscription disputes:</strong> A gym or service provider continues charging after cancellation was requested.
                  </p>
                </div>
                <div className="bg-white rounded p-4 border border-pastelpeach/30">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Shared expense disputes:</strong> Roommates or co-owners dispute who owes what for shared utilities or expenses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services for Applicants */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            Services for Applicants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Services List */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Case Evaluation & Strategy
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      We thoroughly assess your claim, evaluate its strength, and develop a winning strategy tailored to your specific situation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Document Preparation
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Professional preparation of claims, affidavits, and all required court documents to ensure compliance and maximum impact.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Evidence Gathering
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Expert guidance on collecting, organizing, and presenting evidence that strengthens your case.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Settlement Negotiation
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Strategic negotiation to resolve disputes favorably without trial when possible, saving time and costs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Additional Services */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Court Representation
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Full representation at trial, including presenting your case, examining witnesses, and cross-examining the defendant.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Judgment Enforcement
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Assistance with post-judgment enforcement to ensure you collect the awarded compensation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Appeal Support
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      If needed, we provide guidance and representation for appeals to protect your interests.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Ongoing Consultation
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Continuous support and advice throughout your case to keep you informed and confident.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services for Defendants */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            Services for Defendants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Claim Assessment
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Thorough analysis of the claim against you to identify weaknesses and develop a strong defense strategy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Defense Documentation
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Professional preparation of defenses, counterclaims, and all necessary court filings to protect your position.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Settlement Negotiation
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Strategic negotiation to resolve the claim on favorable terms, minimizing your liability and costs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <DollarSign className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Cost Management
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Efficient case management to minimize legal costs while maintaining strong defense representation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Trial Defense
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Vigorous representation at trial, including presenting your defense, cross-examining witnesses, and protecting your rights.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Counterclaim Strategy
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Identification and pursuit of counterclaims when applicable to offset liability and strengthen your position.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Post-Judgment Support
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Guidance on post-judgment matters, including payment arrangements and enforcement defense if necessary.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Appeal Representation
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Expert support for appeals if you believe the judgment was unjust or based on legal errors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            The Small Claims Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Initial Consultation',
                description: 'We review your case, assess its merits, and discuss your goals and options.'
              },
              {
                step: '2',
                title: 'Case Preparation',
                description: 'Gather evidence, prepare documents, and develop a comprehensive strategy.'
              },
              {
                step: '3',
                title: 'Settlement Attempts',
                description: 'Negotiate with the opposing party to resolve the matter favorably if possible.'
              },
              {
                step: '4',
                title: 'Trial & Resolution',
                description: 'Present your case in court and work toward a favorable judgment or settlement.'
              }
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm h-full">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="font-paragraph text-foreground/80">
                    {item.description}
                  </p>
                </div>
                {item.step !== '4' && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ChevronRight className="w-6 h-6 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: 'What types of claims can be filed in Small Claims Court?',
                a: 'Small Claims Court handles various civil disputes including contract breaches, property damage, unpaid debts, personal injury claims, and landlord-tenant disputes (up to the monetary limit).'
              },
              {
                q: 'What is the filing fee?',
                a: 'Filing fees vary based on the claim amount, typically ranging from $50 to $500. We can provide specific fee information during your consultation.'
              },
              {
                q: 'How long does a Small Claims case typically take?',
                a: 'Most cases take 6-12 months from filing to resolution, though some may be resolved faster through settlement negotiations.'
              },
              {
                q: 'Can I appeal a Small Claims judgment?',
                a: 'Yes, appeals are possible on questions of law or if there was a procedural error. We can advise you on the merits of an appeal.'
              },
              {
                q: 'Do I need a lawyer for Small Claims Court?',
                a: 'While not required, having legal representation significantly improves your chances of success and ensures proper case management.'
              },
              {
                q: 'What if the defendant doesn\'t pay the judgment?',
                a: 'We assist with post-judgment enforcement procedures to help collect the awarded amount through various legal mechanisms.'
              }
            ].map((item, index) => (
              <div key={index} className="bg-pastelbeige/10 rounded-lg p-6 border border-pastelbeige/30">
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                  {item.q}
                </h3>
                <p className="font-paragraph text-foreground/80">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-r from-primary/10 to-pastelbeige/30">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-6">
            Ready to Protect Your Rights?
          </h2>
          <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            Whether you're pursuing a claim or defending against one, our experienced team is here to guide you through every step of the Small Claims process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button className="bg-primary hover:bg-primary/90 text-white w-full">
                Schedule Your Consultation
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 w-full">
                Back to Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
