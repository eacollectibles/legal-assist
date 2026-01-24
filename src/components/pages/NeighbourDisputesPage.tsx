import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Scale, Clock, CheckCircle, Home, FileText, DollarSign, Trees, AlertTriangle, Fence } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NeighbourDisputesPage() {
  useEffect(() => {
    document.title = 'Neighbour Disputes | Tree Damage, Fences, Boundaries | Small Claims Court Ontario';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Paralegal for neighbour disputes in Ontario Small Claims Court. Tree damage, fence disputes, property line issues, water drainage. Recover up to $50,000. London Ontario.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Home className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Small Claims Court Services</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Neighbour Disputes & Property Damage
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Neighbour's tree damaged your property? Fence dispute? Boundary issues? When friendly conversation fails, you have legal options in Small Claims Court.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors">
                Free Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:5196011110" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/5 transition-colors">
                Call (519) 601-1110
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Common Disputes */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Common Neighbour Disputes We Handle</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Trees, title: 'Tree & Branch Damage', desc: 'Neighbour\'s tree fell on your property, roots damaged foundation, or overhanging branches caused damage.' },
              { icon: Fence, title: 'Fence Disputes', desc: 'Disagreements over fence installation, repair costs, height, style, or who owns the fence on property line.' },
              { icon: Home, title: 'Property Line Issues', desc: 'Encroachment disputes, structures built over property line, or disagreements about boundary location.' },
              { icon: AlertTriangle, title: 'Water & Drainage', desc: 'Neighbour altered grading causing water to flood your property, or drainage issues affecting your land.' },
              { icon: DollarSign, title: 'Shared Costs Recovery', desc: 'Neighbour refuses to pay their share of shared fence, driveway, or retaining wall repairs.' },
              { icon: Shield, title: 'Property Damage', desc: 'Damage from construction, landscaping, or other activities on neighbour\'s property.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <item.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="font-paragraph text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tree Law in Ontario */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Tree Law in Ontario: Know Your Rights</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Overhanging Branches</h3>
                <p className="font-paragraph text-foreground/70">You can trim branches that hang over your property line, but only up to the property line. You're responsible for disposal costs and must not damage the tree itself.</p>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Fallen Trees & Storm Damage</h3>
                <p className="font-paragraph text-foreground/70">If a healthy tree falls due to storm, it's typically "act of God" - no liability. But if the tree was dead, dying, or the owner knew it was hazardous, they can be liable for damages.</p>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Root Damage</h3>
                <p className="font-paragraph text-foreground/70">Tree owners can be liable if roots from their tree damage your foundation, driveway, sewer lines, or other structures - especially if they knew about the problem.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fence Law */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Ontario Line Fences Act</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <p className="font-paragraph text-foreground/80 mb-6">
                Under Ontario's Line Fences Act, neighbours generally share the cost of building and maintaining a fence on the property line equally. However, there are important nuances:
              </p>
              <ul className="space-y-4">
                {[
                  { title: 'Cost Sharing', desc: 'Both property owners typically split the cost 50/50 for a line fence' },
                  { title: 'Municipal Process', desc: 'If you can\'t agree, your municipality can appoint a fence-viewer to make a binding decision' },
                  { title: 'Urban vs Rural', desc: 'Rules may differ based on whether the property is in an urban or rural area' },
                  { title: 'Existing Fences', desc: 'Repair and maintenance of existing line fences is also shared' },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <span className="font-heading font-bold text-foreground">{item.title}:</span>
                      <span className="font-paragraph text-foreground/70"> {item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Recover */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What Damages Can You Recover?</h2>
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              'Repair costs for damaged structures',
              'Tree/stump removal expenses',
              'Foundation repair costs',
              'Landscaping restoration',
              'Fence construction or repair',
              'Driveway/walkway repairs',
              'Sewer/drainage repairs',
              'Diminished property value',
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                <DollarSign className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-paragraph text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before Going to Court */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Steps Before Going to Court</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {[
                { step: '1', title: 'Document Everything', desc: 'Take photos, get repair estimates, save all communications with your neighbour.' },
                { step: '2', title: 'Try to Resolve Directly', desc: 'Courts prefer parties attempt resolution first. Send a written request for payment.' },
                { step: '3', title: 'Consider Mediation', desc: 'Community mediation services can help resolve disputes without court.' },
                { step: '4', title: 'Send Demand Letter', desc: 'Formal letter outlining damages and requesting payment. We can draft this for you.' },
                { step: '5', title: 'File Court Claim', desc: 'If no resolution, file Plaintiff\'s Claim in Small Claims Court.' },
              ].map((item, index) => (
                <div key={index} className="flex gap-4 items-start bg-white p-5 rounded-xl shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="font-paragraph text-foreground/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Neighbour Won't Pay? We Can Help</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Free consultation to review your neighbour dispute and discuss the best path forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-gray-100 transition-colors">
              Book Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:5196011110" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-white/10 transition-colors">
              Call (519) 601-1110
            </a>
          </div>
        </div>
      </section>

      {/* LSO Badge */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <p className="font-paragraph text-sm text-foreground/60">
            <Shield className="w-4 h-4 inline mr-1" />
            Licensed by the Law Society of Ontario | Paralegal services for claims up to $50,000
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
