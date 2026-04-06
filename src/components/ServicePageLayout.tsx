import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Image } from '@/components/ui/image';
import ConversionStrip from '@/components/ConversionStrip';
import PrimaryCTA from '@/components/PrimaryCTA';
import AutoSEO from '@/components/AutoSEO';
import { TrustSignals } from '@/components/TrustSignals';
import { WhatHappensNext } from '@/components/WhatHappensNext';
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
  faqSection?: React.ReactNode;
}

const defaultAuthorityItems: AuthorityItem[] = [
  {
    title: 'Licensed & Experienced',
    description: 'Every matter is handled by a licensed paralegal with direct experience in this practice area.'
  },
  {
    title: 'Strategic Representation',
    description: 'We assess the merits of your case and develop a focused strategy tailored to your situation.'
  },
  {
    title: 'Client-Focused Approach',
    description: 'Clear communication, transparent fees, and responsive service throughout your matter.'
  }
];

const defaultReassuranceItems: ReassuranceItem[] = [
  {
    icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" aria-hidden="true" />,
    title: 'Transparent Communication',
    description: 'We keep you informed at every stage with clear, honest updates about your matter.'
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" aria-hidden="true" />,
    title: 'Accessible Rates',
    description: 'Fees are discussed upfront during your free consultation. No surprises, no hidden costs.'
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" aria-hidden="true" />,
    title: 'Dedicated Support',
    description: 'Your matter receives focused attention. We are responsive and committed to moving your case forward.'
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
  children,
  faqSection
}: ServicePageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <AutoSEO
        title={seoTitle}
        description={seoDescription}
        canonical={canonical}
      />

      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-4">
        <Breadcrumbs />
      </div>

      {/* ── Section 1: Hero ── */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                {problemHeadline}
              </h1>
              <p className="font-paragraph text-lg text-foreground/80 mb-8 leading-relaxed">
                {problemDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <PrimaryCTA variant="button" className="w-full sm:w-auto" />
                <a
                  href={PHONE_HREF}
                  className="text-primary font-semibold flex items-center gap-2 py-3 sm:py-0 justify-center sm:justify-start min-h-[48px] hover:text-primary/80 transition-colors"
                  aria-label={`Call ${PHONE_DISPLAY}`}
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Call {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image src={heroImage.src} alt={heroImage.alt} className="w-full h-auto" originWidth={800} originHeight={600} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Conversion Strip ── */}
      <ConversionStrip />

      {/* ── Trust Signals + What Happens Next ── */}
      <section className="py-8 md:py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-4">
          <TrustSignals />
          <WhatHappensNext />
        </div>
      </section>

      {/* ── Authority Section ── */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-12">
            Why Choose Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {authorityItems.map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-xl p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="font-paragraph text-foreground/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process Section ── */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-pastelbeige/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-12">
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {processSteps.map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm h-full">
                  <div className="w-12 h-12 bg-matte text-gold rounded-full flex items-center justify-center font-heading font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="font-paragraph text-foreground/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reassurance Section ── */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-12">
            What You Can Expect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reassuranceItems.map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-pastelbeige/20 to-transparent rounded-xl p-6 border border-pastelbeige">
                <div className="flex gap-4">
                  {item.icon}
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="font-paragraph text-foreground/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom content slot */}
      {children}

      {/* FAQ Section */}
      {faqSection}

      {/* ── Final CTA — Dark premium band ── */}
      <section className="w-full py-16 md:py-24 bg-matte">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight">
            Find Out Where You Stand
          </h2>
          <p className="font-paragraph text-lg text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
            Contact us for a free, no-obligation case review. We&rsquo;ll assess your situation and explain your options clearly.
          </p>
          <PrimaryCTA variant="footer" />
          <div className="mt-6">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 text-gold-light hover:text-gold transition-colors font-medium"
              aria-label={`Call ${PHONE_DISPLAY}`}
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>{PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
