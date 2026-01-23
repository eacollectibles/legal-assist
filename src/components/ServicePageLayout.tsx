import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Image } from '@/components/ui/image';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact';

interface AuthorityItem {
  title: string;
  description: string;
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface ReassuranceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ServicePageLayoutProps {
  seoTitle: string;
  seoDescription: string;
  canonical: string;
  problemHeadline: string;
  problemDescription: string;
  heroImage: {
    src: string;
    alt: string;
  };
  authorityItems?: AuthorityItem[];
  processSteps: ProcessStep[];
  reassuranceItems?: ReassuranceItem[];
  children?: React.ReactNode;
}

// Default authority items
const defaultAuthorityItems: AuthorityItem[] = [
  {
    title: 'Licensed & Experienced',
    description: 'Our team consists of licensed paralegals with extensive experience in this practice area.'
  },
  {
    title: 'Proven Track Record',
    description: 'We have successfully represented hundreds of clients with favorable outcomes.'
  },
  {
    title: 'Client-Focused Approach',
    description: 'We prioritize your needs and work tirelessly to achieve the best possible results for your case.'
  }
];

// Default reassurance items
const defaultReassuranceItems: ReassuranceItem[] = [
  {
    icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />,
    title: 'Transparent Communication',
    description: 'We keep you informed every step of the way with clear, honest communication about your case.'
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />,
    title: 'Affordable Rates',
    description: 'We offer competitive pricing with flexible payment options to make legal representation accessible.'
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />,
    title: 'Dedicated Support',
    description: 'Our team is committed to providing you with the support and guidance you need throughout your case.'
  }
];

export default function ServicePageLayout({
  seoTitle,
  seoDescription,
  canonical,
  problemHeadline,
  problemDescription,
  heroImage,
  authorityItems = defaultAuthorityItems,
  processSteps,
  reassuranceItems = defaultReassuranceItems,
  children
}: ServicePageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* SEO Meta Tags */}
      <head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonical} />
      </head>

      <Header />
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 pt-4">
        <Breadcrumbs />
      </div>

      {/* Section 1: Problem Recognition (Hero) */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
                {problemHeadline}
              </h1>
              <p className="font-paragraph text-lg text-foreground/80 mb-8">
                {problemDescription}
              </p>
              {/* Mobile: Single primary CTA + text link for call */}
              <div className="flex flex-col gap-3 sm:hidden">
                <Link to="/contact" className="w-full">
                  <Button className="bg-primary hover:bg-primary/90 text-white w-full h-12">
                    Find Out Where You Stand
                  </Button>
                </Link>
                <a 
                  href={PHONE_HREF}
                  className="text-primary font-medium text-center flex items-center justify-center gap-2 py-2"
                >
                  <Phone className="w-4 h-4" />
                  Call {PHONE_DISPLAY}
                </a>
              </div>
              {/* Desktop: Two buttons side by side */}
              <div className="hidden sm:flex flex-row gap-4">
                <Link to="/contact">
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    Find Out Where You Stand
                  </Button>
                </Link>
                <a href={PHONE_HREF}>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                    <Phone className="w-4 h-4 mr-2" />
                    Call {PHONE_DISPLAY}
                  </Button>
                </a>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image src={heroImage.src} alt={heroImage.alt} className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Authority */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            Why Choose Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {authorityItems.map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Process */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {processSteps.map((item, idx) => (
              <div key={idx} className="relative">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Reassurance */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
            What You Can Expect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reassuranceItems.map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-lg p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  {item.icon}
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Content (FAQs, Related Services, etc.) */}
      {children}

      {/* Section 5: Action CTA */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-r from-primary/10 to-pastelbeige/30">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-6">
            Find Out Where You Stand
          </h2>
          <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            Schedule a consultation with our experienced team to discuss your case and learn about your options.
          </p>
          {/* Mobile: Single primary CTA + text link */}
          <div className="flex flex-col gap-3 sm:hidden max-w-sm mx-auto">
            <Link to="/contact" className="w-full">
              <Button className="bg-primary hover:bg-primary/90 text-white w-full h-12">
                Find Out Where You Stand
              </Button>
            </Link>
            <a 
              href={PHONE_HREF}
              className="text-primary font-medium text-center flex items-center justify-center gap-2 py-2"
            >
              <Phone className="w-4 h-4" />
              Call {PHONE_DISPLAY}
            </a>
          </div>
          {/* Desktop: Two buttons side by side */}
          <div className="hidden sm:flex flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Find Out Where You Stand
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
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
