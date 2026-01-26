/**
 * LegalNewsPage.tsx
 * Displays recent Ontario legal decisions relevant to paralegal practice areas
 * 
 * Features:
 * - Auto-fetches from CanLII RSS feeds
 * - Filters by practice area
 * - Search functionality
 * - Responsive design with mobile-first touch targets
 * - Links to full decisions on CanLII
 * - Proper Article schema markup for SEO
 */

import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Scale, Search, ExternalLink, Filter, Clock, ChevronRight, RefreshCw, AlertCircle, BookOpen } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact';
import PrimaryCTA from '@/components/PrimaryCTA';
import {
  fetchAllCases,
  filterByCategory,
  searchCases,
  formatCaseDate,
  getCategoryDisplayName,
  getCategoryIcon,
  isHighlyRelevant,
  type LegalCase,
  type PracticeArea
} from '@/lib/legal-news-service';

// Practice area filter options
const FILTER_OPTIONS: { value: PracticeArea | 'all'; label: string }[] = [
  { value: 'all', label: 'All Decisions' },
  { value: 'landlord-tenant', label: '🏠 Landlord & Tenant' },
  { value: 'traffic', label: '🚗 Traffic' },
  { value: 'small-claims', label: '💰 Small Claims' },
  { value: 'human-rights', label: '⚖️ Human Rights' },
  { value: 'provincial-offences', label: '📋 Provincial Offences' },
];

// Internal link mapping for practice areas
const PRACTICE_AREA_LINKS: Record<PracticeArea, string> = {
  'landlord-tenant': '/services/landlord-tenant',
  'human-rights': '/services/human-rights',
  'traffic': '/services/traffic-tickets',
  'small-claims': '/services/small-claims',
  'provincial-offences': '/services/provincial-offences',
  'employment': '/services/employment-issues',
  'other': '/services'
};

export default function LegalNewsPage() {
  // State
  const [cases, setCases] = useState<LegalCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<PracticeArea | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fetch cases on mount
  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const fetchedCases = await fetchAllCases(15); // 15 per tribunal
      setCases(fetchedCases);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Unable to load recent decisions. Please try again later.');
      console.error('Failed to fetch cases:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter and search cases
  const filteredCases = useMemo(() => {
    let result = cases;
    
    // Apply category filter
    if (filter !== 'all') {
      result = filterByCategory(result, filter);
    }
    
    // Apply search
    if (searchQuery.trim()) {
      result = searchCases(result, searchQuery);
    }
    
    return result;
  }, [cases, filter, searchQuery]);

  // Schema markup for the page
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Recent Ontario Legal Decisions | LegalAssist',
    description: 'Stay informed with the latest Ontario tribunal and court decisions relevant to landlord-tenant disputes, traffic tickets, small claims, and human rights matters.',
    url: 'https://legalassist.ca/legal-news',
    publisher: {
      '@type': 'LegalService',
      name: 'LegalAssist Paralegal Services',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'London',
        addressRegion: 'ON',
        addressCountry: 'CA'
      }
    }
  };

  // Generate article schema for each case
  const generateCaseSchema = (legalCase: LegalCase) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: legalCase.title,
    description: legalCase.summary,
    datePublished: legalCase.publishedDate,
    author: {
      '@type': 'Organization',
      name: legalCase.tribunalName
    },
    publisher: {
      '@type': 'Organization',
      name: 'CanLII'
    },
    mainEntityOfPage: legalCase.url,
    keywords: legalCase.keywords.join(', ')
  });

  // Render individual case card
  const CaseCard = ({ legalCase }: { legalCase: LegalCase }) => {
    const isRelevant = isHighlyRelevant(legalCase);
    
    return (
      <article 
        className={`
          bg-white rounded-xl border p-5 transition-all hover:shadow-md
          ${isRelevant ? 'border-l-4 border-l-primary border-t border-r border-b border-secondary/10' : 'border-secondary/10'}
        `}
        itemScope
        itemType="https://schema.org/Article"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xl" aria-hidden="true">
              {getCategoryIcon(legalCase.category)}
            </span>
            <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
              {getCategoryDisplayName(legalCase.category)}
            </span>
            {isRelevant && (
              <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded">
                Highly Relevant
              </span>
            )}
          </div>
          <time 
            className="text-sm text-secondary/60 whitespace-nowrap flex items-center gap-1"
            dateTime={legalCase.publishedDate}
            itemProp="datePublished"
          >
            <Clock className="w-3.5 h-3.5" />
            {formatCaseDate(legalCase.publishedDate)}
          </time>
        </div>

        {/* Title */}
        <h3 className="font-heading font-semibold text-secondary mb-1 leading-snug" itemProp="headline">
          {legalCase.title}
        </h3>
        
        {/* Citation */}
        {legalCase.citation && (
          <p className="text-sm text-secondary/60 font-mono mb-2">
            {legalCase.citation}
          </p>
        )}

        {/* Summary */}
        {legalCase.summary && (
          <p className="font-paragraph text-sm text-secondary/70 mb-3 line-clamp-2" itemProp="description">
            {legalCase.summary}
          </p>
        )}

        {/* Keywords */}
        {legalCase.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {legalCase.keywords.slice(0, 5).map((keyword, i) => (
              <span 
                key={i}
                className="text-xs text-secondary/50 bg-pastelbeige/50 px-2 py-0.5 rounded"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-secondary/10">
          <span className="text-xs text-secondary/50" itemProp="publisher" itemScope itemType="https://schema.org/Organization">
            <span itemProp="name">{legalCase.tribunalName}</span>
          </span>
          <a
            href={legalCase.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline min-h-[44px] px-2 -mr-2"
            itemProp="url"
          >
            Read on CanLII
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </article>
    );
  };

  return (
    <>
      <Helmet>
        <title>Recent Ontario Legal Decisions | LegalAssist Paralegal Services</title>
        <meta 
          name="description" 
          content="Stay informed with the latest Ontario tribunal and court decisions. Landlord-tenant, traffic, small claims, and human rights cases updated from CanLII." 
        />
        <meta name="keywords" content="Ontario legal decisions, LTB decisions, HRTO rulings, small claims court, traffic court Ontario, CanLII" />
        <link rel="canonical" href="https://legalassist.ca/legal-news" />
        <script type="application/ld+json">
          {JSON.stringify(pageSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-12 sm:py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-10 h-10" />
              <Link 
                to="/resources"
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                ← Back to Resources
              </Link>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Recent Legal Decisions
            </h1>
            <p className="font-paragraph text-lg text-white/90 max-w-2xl mb-4">
              Stay informed with the latest Ontario tribunal and court decisions relevant to 
              landlord-tenant disputes, traffic tickets, small claims, and human rights matters.
            </p>
            <p className="text-sm text-white/70 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Powered by CanLII • Updated automatically
            </p>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-4 py-8">
          
          {/* Filters & Search */}
          <div className="bg-white rounded-xl border border-secondary/10 p-4 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/40" />
                <input
                  type="text"
                  placeholder="Search decisions by keyword, citation, or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 min-h-[48px] border border-secondary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors font-paragraph"
                />
              </div>
              
              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/40" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as PracticeArea | 'all')}
                  className="pl-10 pr-8 py-3 min-h-[48px] border border-secondary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white appearance-none cursor-pointer min-w-[200px] font-paragraph"
                >
                  {FILTER_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Refresh Button */}
              <button
                onClick={loadCases}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[48px] bg-pastelbeige/50 hover:bg-pastelbeige rounded-lg text-secondary transition-colors disabled:opacity-50 font-paragraph font-medium"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-secondary/10 text-sm text-secondary/60 font-paragraph">
              <span>
                Showing {filteredCases.length} of {cases.length} decisions
              </span>
              {lastUpdated && (
                <span>
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <RefreshCw className="w-8 h-8 text-primary animate-spin mb-4" />
              <p className="text-secondary/60 font-paragraph">Loading recent decisions...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
              <p className="text-red-700 mb-4 font-paragraph">{error}</p>
              <button
                onClick={loadCases}
                className="px-4 py-2 min-h-[44px] bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-paragraph font-medium"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Cases Grid */}
          {!loading && !error && (
            <>
              {filteredCases.length > 0 ? (
                <div className="grid gap-4">
                  {filteredCases.map(legalCase => (
                    <CaseCard key={legalCase.id} legalCase={legalCase} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Search className="w-12 h-12 text-secondary/20 mx-auto mb-4" />
                  <p className="text-secondary/60 mb-2 font-paragraph">No decisions found matching your criteria.</p>
                  <button
                    onClick={() => { setFilter('all'); setSearchQuery(''); }}
                    className="text-primary hover:underline font-paragraph font-medium"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </>
          )}

          {/* CTA Section */}
          <section className="mt-12 bg-gradient-to-r from-secondary to-secondary/90 rounded-xl p-8 text-secondary-foreground">
            <div className="max-w-2xl">
              <h2 className="font-heading text-2xl font-bold mb-3">
                Need Help Understanding a Decision?
              </h2>
              <p className="font-paragraph text-secondary-foreground/80 mb-6">
                Our licensed paralegal can help you understand how recent case law may affect 
                your situation and develop a strategy for your case.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] bg-primary hover:bg-primary/90 rounded-lg font-semibold transition-colors"
                >
                  Book Free Consultation
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] bg-secondary-foreground/10 hover:bg-secondary-foreground/20 rounded-lg font-semibold transition-colors"
                >
                  Call {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <div className="mt-8 p-4 sm:p-6 bg-pastelbeige/30 rounded-xl border border-secondary/10">
            <p className="font-paragraph text-sm text-secondary/70">
              <strong className="text-secondary">Disclaimer:</strong> The decisions displayed on this page are sourced from CanLII (Canadian Legal Information Institute) 
              and are provided for informational purposes only. This is not legal advice. Each case depends on 
              its specific facts and circumstances. Contact a licensed paralegal or lawyer to understand how 
              the law applies to your situation.
            </p>
          </div>

          {/* Related Services Links */}
          <section className="mt-8">
            <h2 className="font-heading text-lg font-bold text-secondary mb-4">
              Our Practice Areas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {FILTER_OPTIONS.filter(o => o.value !== 'all').map(area => (
                <Link
                  key={area.value}
                  to={PRACTICE_AREA_LINKS[area.value as PracticeArea]}
                  className="flex items-center gap-2 p-3 min-h-[48px] bg-white border border-secondary/10 rounded-lg hover:border-primary/30 hover:shadow-sm transition-all font-paragraph"
                >
                  <span>{area.label.split(' ')[0]}</span>
                  <span className="text-sm text-secondary/60">
                    {area.label.split(' ').slice(1).join(' ')}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
