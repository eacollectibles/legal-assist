import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Phone, Shield, Scale, GraduationCap, Heart, MapPin, Calendar, CheckCircle, MessageSquare, FileText, Handshake } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function MeetOurTeamPage() {
  useEffect(() => {
    document.title = 'Meet Our Team | LegalAssist Paralegal Services | London Ontario';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Meet the team behind LegalAssist in London, Ontario, including Law Society of Ontario licensed paralegals and support staff. Learn about our approach and experience.');
    }

    // Add JSON-LD structured data
    const existingScript = document.querySelector('#team-structured-data');
    if (existingScript) existingScript.remove();
    
    const script = document.createElement('script');
    script.id = 'team-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: 'LegalAssist Paralegal Services',
      description: 'Professional paralegal services in London, Ontario',
      url: 'https://legalassist.london',
      telephone: '+1-365-882-9515',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'London',
        addressRegion: 'ON',
        addressCountry: 'CA'
      },
      founder: [
        {
          '@type': 'Person',
          name: 'Candice Fogarty',
          jobTitle: 'Co-Founder & Licensed Paralegal',
          description: 'Licensed Paralegal with the Law Society of Ontario (LSO #P21479) and Qualified Addictions Counselor',
          email: 'candice@legalassist.london',
          image: 'https://static.wixstatic.com/media/99571b_placeholder2~mv2.jpg',
          worksFor: { '@type': 'LegalService', name: 'LegalAssist Paralegal Services' }
        },
        {
          '@type': 'Person',
          name: 'Johnny Demers',
          jobTitle: 'Co-Founder & Paralegal Licensing Candidate',
          description: 'Paralegal Licensing Candidate with background in law enforcement',
          email: 'jeanfrancois@legalassist.london',
          image: 'https://static.wixstatic.com/media/99571b_facd7ab6718046bc8572b74957bbf7e4~mv2.png',
          worksFor: { '@type': 'LegalService', name: 'LegalAssist Paralegal Services' }
        }
      ]
    });
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('#team-structured-data');
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="w-full bg-gradient-to-br from-primary/10 via-pastelbeige/40 to-pastellavender/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <nav className="flex items-center justify-center gap-2 text-sm font-paragraph mb-6" aria-label="Breadcrumb">
              <Link to="/" className="text-foreground/60 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">Home</Link>
              <span className="text-foreground/40" aria-hidden="true">/</span>
              <Link to="/about" className="text-foreground/60 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">About</Link>
              <span className="text-foreground/40" aria-hidden="true">/</span>
              <span className="text-primary font-medium" aria-current="page">Our Team</span>
            </nav>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              Meet Our <span className="text-primary">Team</span>
            </h1>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">
              Meet the people behind LegalAssist — including Law Society of Ontario licensed paralegals and dedicated support — serving clients across Southwestern Ontario.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
                <span className="font-paragraph text-sm text-foreground/80">Ontario-Based</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" aria-hidden="true" />
                <span className="font-paragraph text-sm text-foreground/80">Fees Confirmed in Writing</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" aria-hidden="true" />
                <span className="font-paragraph text-sm text-foreground/80">Client-First Approach</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Next - Process Steps */}
      <section className="w-full py-12 bg-white border-b border-gray-100">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-2xl font-bold text-foreground text-center mb-8">What Happens Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-4 p-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="font-heading font-bold text-foreground mb-1">1. Tell Us What's Going On</p>
                <p className="font-paragraph text-sm text-foreground/70">Share the details of your situation with us.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Scale className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="font-heading font-bold text-foreground mb-1">2. We Explain Your Options</p>
                <p className="font-paragraph text-sm text-foreground/70">We'll outline your options under Ontario law.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Handshake className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="font-heading font-bold text-foreground mb-1">3. Confirm Next Steps</p>
                <p className="font-paragraph text-sm text-foreground/70">If you choose to proceed, we confirm next steps and fees in writing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Candice Fogarty - Licensed Paralegal First */}
      <section id="candice-fogarty" className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1">
              <div className="relative">
                <div className="rounded-xl overflow-hidden shadow-xl aspect-[3/4] bg-pastellavender/30">
                  <Image
                    src="https://static.wixstatic.com/media/99571b_placeholder2~mv2.jpg"
                    alt="Candice Fogarty, Licensed Paralegal at LegalAssist"
                    width={400}
                    height={533}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-white rounded-lg shadow-lg p-2 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" aria-hidden="true" />
                    <span className="text-xs font-bold text-foreground">LSO Licensed</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 bg-pastelbeige/20 rounded-xl p-6">
                <h3 className="font-heading text-lg font-bold text-foreground mb-4">Contact Candice</h3>
                <a href="mailto:candice@legalassist.london" className="flex items-center gap-3 text-foreground/80 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded mb-3">
                  <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
                  <span className="font-paragraph text-sm">candice@legalassist.london</span>
                </a>
                <a href="tel:3658829515" className="flex items-center gap-3 text-foreground/80 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">
                  <Phone className="w-5 h-5 text-primary" aria-hidden="true" />
                  <span className="font-paragraph text-sm">(365) 882-9515</span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-paragraph font-medium">Licensed Paralegal (Law Society of Ontario) — LSO #P21479</span>
                <span className="px-3 py-1 bg-pastelgreen/40 text-foreground rounded-full text-sm font-paragraph font-medium">Co-Founder</span>
              </div>
              <h2 className="font-heading text-4xl font-bold text-foreground mb-2">Candice Fogarty</h2>
              <p className="font-paragraph text-xl text-primary font-medium mb-2">Co-Founder & Licensed Paralegal</p>
              <p className="text-sm text-foreground/60 mb-6">
                Law Society of Ontario licence verified — LSO #P21479
              </p>
              <p className="font-paragraph text-foreground/80 leading-relaxed mb-6">
                Candice Fogarty is the co-founder and lead paralegal at LegalAssist, bringing exceptional organizational skills and a client-centered approach to the firm. As a Licensed Paralegal with the Law Society of Ontario and a Qualified Addictions Counselor, she offers a unique combination of legal expertise and compassionate understanding.
              </p>
              <p className="font-paragraph text-foreground/80 leading-relaxed mb-8">
                Her dedication to thorough case preparation and compassionate client service has made her invaluable to the team. With a keen eye for detail and a natural ability to connect with clients during stressful times, Candice excels at managing complex case files while maintaining the personal touch that defines LegalAssist's approach.
              </p>
              <blockquote className="bg-gradient-to-br from-pastelbeige/30 to-pastelpeach/20 rounded-xl p-6 mb-8 border-l-4 border-primary">
                <p className="font-paragraph text-foreground/90 italic">
                  "What drives me is seeing the relief on a client's face when they finally understand their situation and know they have someone in their corner. My background in addictions counseling helps me connect with clients going through difficult times."
                </p>
                <footer className="mt-3 font-heading font-bold text-foreground">— Candice Fogarty</footer>
              </blockquote>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Scale className="w-5 h-5 text-primary" aria-hidden="true" />
                    <h3 className="font-heading font-bold text-foreground">Areas of Practice</h3>
                  </div>
                  <p className="text-sm text-foreground/80 mb-3 font-medium">Practices in all areas of services offered, including:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" aria-hidden="true" />Landlord & Tenant Board (LTB)</li>
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" aria-hidden="true" />Small Claims Court</li>
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" aria-hidden="true" />Provincial Offences Court</li>
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" aria-hidden="true" />Human Rights Tribunal (HRTO)</li>
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" aria-hidden="true" />Workplace Disputes (where permitted)</li>
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" aria-hidden="true" />Traffic & Driving Offences (Provincial Offences Court)</li>
                  </ul>
                  <Link to="/services" className="inline-block mt-4 text-sm text-primary underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">
                    View all services →
                  </Link>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="w-5 h-5 text-primary" aria-hidden="true" />
                    <h3 className="font-heading font-bold text-foreground">Credentials</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" aria-hidden="true" />Licensed Paralegal (LSO #P21479)</li>
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" aria-hidden="true" />Paralegal Diploma with Distinction</li>
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" aria-hidden="true" />Commissioner of Oaths</li>
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" aria-hidden="true" />Qualified Addictions Counselor</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Johnny Demers - Licensing Candidate */}
      <section id="johnny-demers" className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1 lg:order-2">
              <div className="relative">
                <div className="rounded-xl overflow-hidden shadow-xl aspect-[3/4] bg-pastellavender/30">
                  <Image
                    src="https://static.wixstatic.com/media/99571b_facd7ab6718046bc8572b74957bbf7e4~mv2.png"
                    alt="Johnny Demers, Paralegal Licensing Candidate at LegalAssist"
                    width={400}
                    height={533}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-3 -left-3 bg-white rounded-lg shadow-lg p-2 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-primary" aria-hidden="true" />
                    <span className="text-xs font-bold text-foreground">Licensing Candidate</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-foreground mb-4">Contact Johnny</h3>
                <a href="mailto:jeanfrancois@legalassist.london" className="flex items-center gap-3 text-foreground/80 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded mb-3">
                  <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
                  <span className="font-paragraph text-sm">jeanfrancois@legalassist.london</span>
                </a>
                <a href="tel:3658829515" className="flex items-center gap-3 text-foreground/80 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">
                  <Phone className="w-5 h-5 text-primary" aria-hidden="true" />
                  <span className="font-paragraph text-sm">(365) 882-9515</span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-2 lg:order-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-paragraph font-medium">Paralegal Licensing Candidate</span>
                <span className="px-3 py-1 bg-pastelgreen/40 text-foreground rounded-full text-sm font-paragraph font-medium">Co-Founder</span>
              </div>
              <h2 className="font-heading text-4xl font-bold text-foreground mb-2">Johnny Demers</h2>
              <p className="font-paragraph text-xl text-primary font-medium mb-2">Co-Founder & Paralegal Licensing Candidate</p>
              <p className="font-paragraph text-sm text-foreground/60 mb-6 italic">
                Johnny is a paralegal licensing candidate and does not provide legal services independently. He works under the supervision of licensed paralegals in accordance with Law Society of Ontario rules.
              </p>
              <p className="font-paragraph text-foreground/80 leading-relaxed mb-6">
                Johnny Demers is the co-founder of LegalAssist Paralegal Services. With a deep commitment to accessible justice, Johnny helped establish LegalAssist to provide professional legal support to individuals and small businesses across Southwestern Ontario.
              </p>
              <p className="font-paragraph text-foreground/80 leading-relaxed mb-8">
                Drawing on his background in law enforcement, Johnny brings a unique perspective to legal matters. His approach emphasizes clear communication, thorough preparation, and a strong understanding of procedural requirements. Johnny takes pride in demystifying the legal process for clients and ensuring they understand their rights at every stage.
              </p>
              <blockquote className="bg-gradient-to-br from-pastelbeige/30 to-pastelpeach/20 rounded-xl p-6 mb-8 border-l-4 border-primary">
                <p className="font-paragraph text-foreground/90 italic">
                  "I co-founded LegalAssist because I believe everyone deserves quality legal support, regardless of their financial situation. My background in law enforcement gives me a unique understanding of the legal system."
                </p>
                <footer className="mt-3 font-heading font-bold text-foreground">— Johnny Demers</footer>
              </blockquote>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Scale className="w-5 h-5 text-primary" aria-hidden="true" />
                    <h3 className="font-heading font-bold text-foreground">Areas of Focus</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" aria-hidden="true" />Landlord & Tenant Board (LTB)</li>
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" aria-hidden="true" />Human Rights Tribunal (HRTO)</li>
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" aria-hidden="true" />Small Claims Court</li>
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" aria-hidden="true" />Licence Appeal Tribunal (LAT)</li>
                  </ul>
                  <Link to="/services" className="inline-block mt-4 text-sm text-primary underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">
                    View all services →
                  </Link>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="w-5 h-5 text-primary" aria-hidden="true" />
                    <h3 className="font-heading font-bold text-foreground">Background</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" aria-hidden="true" />Paralegal Licensing Candidate</li>
                    <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-primary" aria-hidden="true" />Law Enforcement Diploma</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="w-full py-16 md:py-20 bg-white border-t border-gray-100">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-pastellavender/30 via-pastelbeige/20 to-pastelpeach/20 rounded-2xl p-8 md:p-12 border border-pastellavender/40">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-paragraph font-medium mb-4">
                    <Handshake className="w-4 h-4" aria-hidden="true" />
                    Contract Opportunities
                  </div>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Join Our Team
                  </h2>
                  <p className="font-paragraph text-foreground/80 mb-4">
                    Are you a licensed paralegal looking for flexible, contract-based work? LegalAssist is growing, and we're looking for passionate paralegals who share our commitment to accessible justice.
                  </p>
                  <div className="space-y-2 mb-6">
                    <p className="font-paragraph text-sm text-foreground/70 font-medium">We're looking for:</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-foreground/80">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                        Licensed Paralegals (Law Society of Ontario)
                      </li>
                      <li className="flex items-center gap-2 text-sm text-foreground/80">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                        Experience in LTB, Small Claims, HRTO, or Provincial Offences
                      </li>
                      <li className="flex items-center gap-2 text-sm text-foreground/80">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                        Client-focused mindset with strong communication skills
                      </li>
                    </ul>
                  </div>
                  <p className="font-paragraph text-sm text-foreground/60 italic">
                    Flexible arrangements available — work on your terms while helping clients across Southwestern Ontario.
                  </p>
                </div>
                <div className="md:w-64 flex-shrink-0">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                    <p className="font-heading font-bold text-foreground mb-2">Interested?</p>
                    <p className="font-paragraph text-sm text-foreground/70 mb-4">Send us your resume and a brief intro.</p>
                    <a 
                      href="mailto:help@legalassist.london?subject=Contract%20Paralegal%20Inquiry" 
                      className="inline-flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-paragraph font-medium px-6 py-3 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
                    >
                      <Mail className="w-4 h-4" aria-hidden="true" />
                      Get in Touch
                    </a>
                    <p className="font-paragraph text-xs text-foreground/50 mt-3">help@legalassist.london</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-primary/10 via-pastelbeige/30 to-pastelpeach/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Ready to Work With Our Team?</h2>
          <p className="font-paragraph text-lg text-foreground/80 mb-2 max-w-2xl mx-auto">
            Schedule a free consultation today to discuss your situation.
          </p>
          <p className="font-paragraph text-sm text-foreground/60 mb-8 max-w-2xl mx-auto">
            Fees vary by matter and are confirmed before any work begins.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-medium px-8 py-4 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              <Calendar className="w-5 h-5" aria-hidden="true" />
              Book Free Consultation
            </Link>
            <Link to="/services" className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-medium px-8 py-4 rounded-lg hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              View Our Services
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
