import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  Award, 
  Shield, 
  Scale, 
  Users, 
  Briefcase,
  GraduationCap,
  Heart,
  MapPin,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { Image } from '@/components/ui/image';

// Team member data for easy management and SEO
const teamMembers = [
  {
    id: 'johnny-demers',
    name: 'Johnny Demers',
    title: 'Founder & Licensed Paralegal',
    subtitle: 'P1 Licence Holder',
    licenseNumber: 'P#XXXXX', // Replace with actual LSO number
    image: 'https://static.wixstatic.com/media/99571b_johnny_demers_paralegal~mv2.jpg?id=johnny-demers-headshot',
    imageAlt: 'Johnny Demers, Licensed Paralegal and Founder of LegalAssist Paralegal Services in London Ontario',
    bio: `Johnny Demers is the founder and principal paralegal of LegalAssist Paralegal Services. With a deep commitment to accessible justice, Johnny established LegalAssist to provide professional legal representation to individuals and small businesses across Southwestern Ontario who might otherwise struggle to afford quality legal help.`,
    fullBio: `Johnny brings a unique perspective to paralegal work, combining technical expertise with genuine compassion for clients facing legal challenges. His approach emphasizes clear communication, thorough preparation, and aggressive advocacy within the bounds of professional ethics.

Before founding LegalAssist, Johnny developed extensive knowledge in various areas of paralegal practice and remains committed to continuous professional development. He takes pride in demystifying the legal process for clients and ensuring they understand their rights and options at every stage of their matter.`,
    specializations: [
      'Provincial Offences & Traffic Tickets',
      'Small Claims Court Litigation',
      'Landlord & Tenant Board Matters',
      'Human Rights Tribunal Applications',
      'Employment Disputes'
    ],
    education: [
      'Paralegal Diploma - [Program Name]',
      'Licensed by the Law Society of Ontario'
    ],
    personalNote: `"I founded LegalAssist because I believe everyone deserves quality legal representation, regardless of their financial situation. The legal system can be intimidating, but it doesn't have to be. My goal is to guide clients through their legal matters with clarity, compassion, and unwavering dedication to their best interests."`,
    email: 'johnny@legalassist.ca',
    phone: '(519) 555-0100',
    linkedIn: 'https://linkedin.com/in/johnnydemers',
    featured: true
  },
  {
    id: 'candice-fogarty',
    name: 'Candice Fogarty',
    title: 'Managing Paralegal',
    subtitle: 'P1 Licence Holder',
    licenseNumber: 'P#XXXXX', // Replace with actual LSO number
    image: 'https://static.wixstatic.com/media/99571b_candice_fogarty_paralegal~mv2.jpg?id=candice-fogarty-headshot',
    imageAlt: 'Candice Fogarty, Managing Paralegal at LegalAssist Paralegal Services in London Ontario',
    bio: `Candice Fogarty serves as Managing Paralegal at LegalAssist, bringing exceptional organizational skills and a client-centered approach to the firm. Her dedication to thorough case preparation and compassionate client service has made her an invaluable member of the team.`,
    fullBio: `With a keen eye for detail and a natural ability to connect with clients during stressful times, Candice excels at managing complex case files while maintaining the personal touch that defines LegalAssist's approach to legal services.

Candice is known for her ability to break down complicated legal procedures into understandable steps, helping clients feel confident and informed throughout their legal journey. Her expertise spans multiple practice areas, and she approaches each case with the same level of dedication and professionalism.`,
    specializations: [
      'Landlord & Tenant Disputes',
      'Small Claims Court Representation',
      'Provincial Offences Defence',
      'Human Rights Matters',
      'Employment Standards Claims'
    ],
    education: [
      'Paralegal Diploma - [Program Name]',
      'Licensed by the Law Society of Ontario'
    ],
    personalNote: `"What drives me is seeing the relief on a client's face when they finally understand their situation and know they have someone in their corner. Legal challenges can feel overwhelming, but with the right support and guidance, positive outcomes are absolutely achievable."`,
    email: 'candice@legalassist.ca',
    phone: '(519) 555-0101',
    linkedIn: 'https://linkedin.com/in/candicefogarty',
    featured: true
  }
];

// Schema.org structured data for SEO
function generateTeamStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'LegalAssist Paralegal Services',
    description: 'Professional paralegal services in London, Ontario and surrounding areas',
    url: 'https://legalassist.ca',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'London',
      addressRegion: 'ON',
      addressCountry: 'CA'
    },
    employee: teamMembers.map(member => ({
      '@type': 'Person',
      name: member.name,
      jobTitle: member.title,
      description: member.bio,
      email: member.email,
      telephone: member.phone,
      worksFor: {
        '@type': 'LegalService',
        name: 'LegalAssist Paralegal Services'
      },
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Professional License',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Law Society of Ontario'
        }
      }
    }))
  };
}

// Individual team member card component
function TeamMemberCard({ member, index }: { member: typeof teamMembers[0]; index: number }) {
  const isEven = index % 2 === 0;
  
  return (
    <article 
      id={member.id}
      className={`w-full py-16 md:py-24 ${isEven ? 'bg-white' : 'bg-gradient-to-br from-pastelbeige/20 to-transparent'}`}
      itemScope 
      itemType="https://schema.org/Person"
    >
      <div className="max-w-[100rem] mx-auto px-4 md:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Photo Column */}
          <div className={`lg:col-span-4 ${!isEven ? 'lg:order-2' : ''}`}>
            <div className="sticky top-32">
              {/* Professional Headshot */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-pastelpeach/30 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500" />
                <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-[3/4] bg-gradient-to-br from-pastellavender/50 to-pastelbeige/50">
                  <Image
                    src={member.image}
                    alt={member.imageAlt}
                    width={400}
                    height={533}
                    className="w-full h-full object-cover"
                    itemProp="image"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* LSO Badge */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-3 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <div className="text-xs">
                      <p className="font-heading font-bold text-foreground">LSO Licensed</p>
                      <p className="text-foreground/60 font-paragraph">{member.licenseNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Contact Card - Mobile/Tablet */}
              <div className="mt-8 lg:mt-12 bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h3 className="font-heading text-lg font-bold text-foreground mb-4">Contact {member.name.split(' ')[0]}</h3>
                <div className="space-y-3">
                  <a 
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors group"
                    itemProp="email"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-paragraph text-sm">{member.email}</span>
                  </a>
                  <a 
                    href={`tel:${member.phone.replace(/[^0-9]/g, '')}`}
                    className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors group"
                    itemProp="telephone"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-paragraph text-sm">{member.phone}</span>
                  </a>
                </div>
                <Link
                  to="/contact"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-medium px-6 py-3 rounded-lg transition-all hover:bg-primary/90 btn-shine btn-lift"
                >
                  Book a Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Content Column */}
          <div className={`lg:col-span-8 ${!isEven ? 'lg:order-1' : ''}`}>
            {/* Header */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-paragraph font-medium">
                  <Award className="w-4 h-4" />
                  {member.subtitle}
                </span>
                {member.featured && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-pastelgreen/40 text-foreground rounded-full text-sm font-paragraph font-medium">
                    <Users className="w-4 h-4" />
                    Leadership Team
                  </span>
                )}
              </div>
              <h2 
                className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-2"
                itemProp="name"
              >
                {member.name}
              </h2>
              <p 
                className="font-paragraph text-xl text-primary font-medium"
                itemProp="jobTitle"
              >
                {member.title}
              </p>
            </header>
            
            {/* Bio */}
            <div className="prose prose-lg max-w-none mb-10" itemProp="description">
              <p className="font-paragraph text-lg text-foreground/80 leading-relaxed mb-6">
                {member.bio}
              </p>
              <p className="font-paragraph text-foreground/80 leading-relaxed whitespace-pre-line">
                {member.fullBio}
              </p>
            </div>
            
            {/* Quote */}
            <blockquote className="relative bg-gradient-to-br from-pastelbeige/30 to-pastelpeach/20 rounded-xl p-8 mb-10 border-l-4 border-primary">
              <div className="absolute top-4 left-6 text-6xl text-primary/20 font-heading leading-none">"</div>
              <p className="font-paragraph text-lg text-foreground/90 italic relative z-10 pl-6">
                {member.personalNote}
              </p>
              <footer className="mt-4 pl-6">
                <cite className="font-heading font-bold text-foreground not-italic">— {member.name}</cite>
              </footer>
            </blockquote>
            
            {/* Specializations & Education Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {/* Areas of Practice */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Scale className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground">Areas of Practice</h3>
                </div>
                <ul className="space-y-3">
                  {member.specializations.map((spec, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-paragraph text-foreground/80">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Education & Credentials */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground">Education & Credentials</h3>
                </div>
                <ul className="space-y-3">
                  {member.education.map((edu, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-paragraph text-foreground/80">{edu}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <a 
                    href="https://lso.ca/public-resources/finding-a-lawyer-or-paralegal/lawyer-and-paralegal-directory" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-paragraph font-medium transition-colors"
                  >
                    Verify on LSO Directory
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function MeetOurTeamPage() {
  useEffect(() => {
    // Page title and meta description
    document.title = 'Meet Our Team | Licensed Paralegals in London Ontario | LegalAssist';
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Meet the licensed paralegals at LegalAssist. Our team of Law Society of Ontario licensed professionals provides expert legal representation in traffic tickets, landlord-tenant disputes, small claims court, and human rights matters across Southwestern Ontario.');
    }
    
    // Add structured data
    const existingScript = document.querySelector('#team-structured-data');
    if (existingScript) {
      existingScript.remove();
    }
    
    const script = document.createElement('script');
    script.id = 'team-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(generateTeamStructuredData());
    document.head.appendChild(script);
    
    // Cleanup on unmount
    return () => {
      const scriptToRemove = document.querySelector('#team-structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 via-pastelbeige/40 to-pastellavender/20 py-16 md:py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pastelpeach/30 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pastelgreen/30 to-transparent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center gap-2 text-sm font-paragraph mb-6" aria-label="Breadcrumb">
              <Link to="/" className="text-foreground/60 hover:text-primary transition-colors">Home</Link>
              <span className="text-foreground/40">/</span>
              <Link to="/about" className="text-foreground/60 hover:text-primary transition-colors">About</Link>
              <span className="text-foreground/40">/</span>
              <span className="text-primary font-medium">Our Team</span>
            </nav>
            
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              Meet Our <span className="text-primary">Team</span>
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80 mb-8 max-w-3xl mx-auto">
              Our licensed paralegals are dedicated to providing accessible, professional legal representation across Ontario. Get to know the people who will fight for your rights.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <span className="font-paragraph text-sm text-foreground/80">LSO Licensed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <span className="font-paragraph text-sm text-foreground/80">Fully Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <span className="font-paragraph text-sm text-foreground/80">Client-Focused</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <span className="font-paragraph text-sm text-foreground/80">Serving SW Ontario</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Jump Navigation */}
      <section className="w-full bg-white border-b border-gray-100 sticky top-16 md:top-20 z-40">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-4 py-4 overflow-x-auto scrollbar-hide" aria-label="Team navigation">
            <span className="font-paragraph text-sm text-foreground/60 whitespace-nowrap">Jump to:</span>
            {teamMembers.map((member) => (
              <a
                key={member.id}
                href={`#${member.id}`}
                className="flex items-center gap-2 px-4 py-2 bg-pastelbeige/30 hover:bg-primary/10 rounded-full transition-colors whitespace-nowrap"
              >
                <span className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-heading font-bold text-sm">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
                <span className="font-paragraph text-sm text-foreground font-medium">{member.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Team Members */}
      <main>
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={member.id} member={member} index={index} />
        ))}
      </main>

      {/* Our Values Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-foreground to-dark text-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Our Core Values
            </h2>
            <p className="font-paragraph text-lg text-white/80 max-w-2xl mx-auto">
              These principles guide everything we do at LegalAssist
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 transform rotate-3 hover:rotate-0 transition-transform">
                <Scale className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-2">Accessible Justice</h3>
              <p className="font-paragraph text-white/70 text-sm">
                Quality legal representation should be available to everyone, regardless of financial circumstances.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 transform -rotate-3 hover:rotate-0 transition-transform">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-2">Professional Integrity</h3>
              <p className="font-paragraph text-white/70 text-sm">
                We maintain the highest ethical standards and are fully regulated by the Law Society of Ontario.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 transform rotate-3 hover:rotate-0 transition-transform">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-2">Compassionate Service</h3>
              <p className="font-paragraph text-white/70 text-sm">
                We understand legal challenges are stressful and treat every client with empathy and respect.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 transform -rotate-3 hover:rotate-0 transition-transform">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-2">Dedicated Advocacy</h3>
              <p className="font-paragraph text-white/70 text-sm">
                We fight tirelessly for our clients' rights and best interests at every stage of their matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-primary/10 via-pastelbeige/30 to-pastelpeach/20 relative overflow-hidden">
        <div className="absolute inset-0 texture-noise" />
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center relative">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Work With Our Team?
          </h2>
          <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation today. We'll discuss your situation and explain how we can help you achieve the best possible outcome.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-medium px-8 py-4 rounded-lg transition-all hover:bg-primary/90 btn-shine btn-lift shadow-lg"
            >
              <Calendar className="w-5 h-5" />
              Book Free Consultation
            </Link>
            <Link 
              to="/services"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-medium px-8 py-4 rounded-lg transition-all hover:bg-primary/5"
            >
              View Our Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          {/* Contact Info Cards */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="tel:5195550100" 
              className="flex items-center gap-3 bg-white rounded-xl px-6 py-4 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-paragraph text-xs text-foreground/60 uppercase tracking-wider">Call Us</p>
                <p className="font-heading font-bold text-foreground">(519) 555-0100</p>
              </div>
            </a>
            <a 
              href="mailto:info@legalassist.ca" 
              className="flex items-center gap-3 bg-white rounded-xl px-6 py-4 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-paragraph text-xs text-foreground/60 uppercase tracking-wider">Email Us</p>
                <p className="font-heading font-bold text-foreground">info@legalassist.ca</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
