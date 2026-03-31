/**
 * ResourcesPage.tsx
 * Hub page for all legal resources: guides, legal news, and educational content
 * Includes proper schema markup for SEO
 */

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  BookOpen, 
  Scale, 
  FileText, 
  Home, 
  Car, 
  DollarSign, 
  Users, 
  Clock,
  ChevronRight,
  Gavel,
  Shield,
  AlertCircle
} from 'lucide-react';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact';
import PrimaryCTA from '@/components/PrimaryCTA';

// Guide data for the cards
const GUIDES = [
  {
    title: 'Ontario Tenant Rights Guide',
    description: 'Know your rights as a tenant in Ontario. Learn about rent increases, repairs, eviction protections, and how to file complaints with the LTB.',
    href: '/guides/ontario-tenant-rights',
    icon: Home,
    category: 'Landlord & Tenant',
    readTime: '12 min read',
    featured: true
  },
  {
    title: 'Ontario Landlord Rights Guide',
    description: 'Understanding your rights and obligations as a landlord. Learn about rent collection, evictions, maintenance, and LTB procedures.',
    href: '/guides/ontario-landlord-rights',
    icon: Home,
    category: 'Landlord & Tenant',
    readTime: '10 min read'
  },
  {
    title: 'Small Claims Court Process',
    description: 'Step-by-step guide to filing and defending a claim in Ontario Small Claims Court. Covers forms, evidence, and what to expect at trial.',
    href: '/guides/small-claims-court-process',
    icon: DollarSign,
    category: 'Small Claims',
    readTime: '15 min read',
    featured: true
  },
  {
    title: 'LTB Hearing Preparation',
    description: 'How to prepare for your Landlord and Tenant Board hearing. Tips for evidence, witnesses, and presenting your case effectively.',
    href: '/guides/ltb-hearing-preparation',
    icon: Gavel,
    category: 'Landlord & Tenant',
    readTime: '8 min read'
  },
  {
    title: 'Filing a Human Rights Complaint',
    description: 'Guide to filing a discrimination complaint with the Human Rights Tribunal of Ontario. Covers grounds, process, and remedies.',
    href: '/guides/filing-human-rights-complaint',
    icon: Shield,
    category: 'Human Rights',
    readTime: '10 min read'
  },
  {
    title: 'Ontario Employment Rights',
    description: 'Your rights as an employee in Ontario. Covers termination, severance, wages, overtime, and filing ESA complaints.',
    href: '/guides/ontario-employment-rights',
    icon: Users,
    category: 'Employment',
    readTime: '12 min read'
  },
  {
    title: 'Legal Deadlines in Ontario',
    description: 'Critical limitation periods and deadlines for legal claims in Ontario. Missing a deadline can cost you your case.',
    href: '/guides/legal-deadlines-ontario',
    icon: Clock,
    category: 'General',
    readTime: '6 min read',
    featured: true
  },
  {
    title: 'What to Do When You\'re Sued',
    description: 'Received a Statement of Claim? Don\'t panic. Here\'s what to do next, including deadlines and how to respond.',
    href: '/guides/what-to-do-when-sued',
    icon: AlertCircle,
    category: 'Small Claims',
    readTime: '8 min read'
  },
  {
    title: 'What Is a Paralegal?',
    description: 'Learn about licensed paralegals in Ontario, what services they can provide, and how they differ from lawyers.',
    href: '/guides/what-is-a-paralegal',
    icon: BookOpen,
    category: 'About',
    readTime: '5 min read'
  },
  {
    title: 'Paralegal vs. Lawyer',
    description: 'When should you hire a paralegal vs. a lawyer? Understand the differences in scope, cost, and expertise.',
    href: '/guides/paralegal-vs-lawyer',
    icon: Scale,
    category: 'About',
    readTime: '6 min read'
  }
];

// Category colors
const CATEGORY_COLORS: Record<string, string> = {
  'Landlord & Tenant': 'bg-blue-100 text-blue-800',
  'Small Claims': 'bg-green-100 text-green-800',
  'Human Rights': 'bg-purple-100 text-purple-800',
  'Employment': 'bg-orange-100 text-orange-800',
  'Traffic': 'bg-red-100 text-red-800',
  'General': 'bg-gray-100 text-gray-800',
  'About': 'bg-pastelbeige text-secondary'
};

export default function ResourcesPage() {
  const featuredGuides = GUIDES.filter(g => g.featured);
  const allGuides = GUIDES;

  // Schema markup for the page
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Legal Resources & Guides | LegalAssist',
    description: 'Free legal guides and resources for Ontario residents. Learn about tenant rights, small claims court, human rights complaints, and more.',
    url: 'https://legalassist.ca/resources',
    publisher: {
      '@type': 'LegalService',
      name: 'LegalAssist Paralegal Services',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'London',
        addressRegion: 'ON',
        addressCountry: 'CA'
      }
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: GUIDES.map((guide, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          name: guide.title,
          description: guide.description,
          url: `https://legalassist.ca${guide.href}`
        }
      }))
    }
  };

  return (
    <>
      <Helmet>
        <title>Legal Resources & Guides | LegalAssist Paralegal Services</title>
        <meta 
          name="description" 
          content="Free legal guides and resources for Ontario residents. Learn about tenant rights, small claims court, human rights, employment law, and more." 
        />
        <meta name="keywords" content="Ontario legal guides, tenant rights, small claims court, LTB hearing, human rights complaint, paralegal resources" />
        <link rel="canonical" href="https://legalassist.ca/resources" />
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-secondary to-secondary/90 text-secondary-foreground py-16 sm:py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-10 h-10 text-primary" />
              <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                Free Resources
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Legal Resources & Guides
            </h1>
            <p className="font-paragraph text-lg sm:text-xl text-secondary-foreground/80 max-w-2xl mb-8">
              Free, practical guides to help you understand your legal rights in Ontario. 
              Written by licensed paralegals for everyday situations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/legal-news"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-colors min-h-[48px]"
              >
                <Scale className="w-5 h-5" />
                Recent Legal Decisions
              </Link>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary-foreground/10 hover:bg-secondary-foreground/20 text-secondary-foreground rounded-lg font-semibold transition-colors min-h-[48px]"
              >
                Questions? Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>

        {/* Featured Guides */}
        <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-secondary mb-8">
            Featured Guides
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={guide.href}
                  to={guide.href}
                  className="group bg-white rounded-xl border border-secondary/10 p-6 hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${CATEGORY_COLORS[guide.category]}`}>
                      {guide.category}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                    {guide.title}
                  </h3>
                  <p className="font-paragraph text-sm text-secondary/70 mb-4 line-clamp-2">
                    {guide.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-secondary/50">{guide.readTime}</span>
                    <span className="text-primary font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read Guide <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Recent Legal Decisions Banner */}
        <section className="bg-pastelbeige/50 py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl border border-secondary/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Scale className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-heading text-xl font-bold text-secondary mb-2">
                  Recent Ontario Legal Decisions
                </h3>
                <p className="font-paragraph text-secondary/70">
                  Stay informed with the latest tribunal and court decisions from the LTB, HRTO, Small Claims Court, and more. 
                  Updated automatically from CanLII.
                </p>
              </div>
              <Link
                to="/legal-news"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-colors whitespace-nowrap min-h-[48px]"
              >
                View Decisions
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* All Guides */}
        <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-secondary mb-8">
            All Legal Guides
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={guide.href}
                  to={guide.href}
                  className="group flex items-start gap-4 bg-white rounded-lg border border-secondary/10 p-4 hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-paragraph font-semibold text-secondary group-hover:text-primary transition-colors truncate">
                      {guide.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${CATEGORY_COLORS[guide.category]}`}>
                        {guide.category}
                      </span>
                      <span className="text-xs text-secondary/50">{guide.readTime}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-secondary/30 group-hover:text-primary transition-colors flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-secondary py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-secondary-foreground mb-4">
              Need Personalized Legal Help?
            </h2>
            <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8">
              Our guides are a great starting point, but every situation is unique. 
              Get a free case review with a licensed Ontario paralegal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PrimaryCTA variant="button" size="lg" />
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary-foreground/10 hover:bg-secondary-foreground/20 text-secondary-foreground rounded-lg font-semibold transition-colors min-h-[52px]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-pastelbeige/30 rounded-lg p-4 sm:p-6 border border-secondary/10">
            <p className="font-paragraph text-sm text-secondary/70">
              <strong className="text-secondary">Disclaimer:</strong> The information in these guides is for 
              general educational purposes only and does not constitute legal advice. Laws and procedures 
              change frequently. For advice specific to your situation, please consult with a licensed 
              paralegal or lawyer.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
