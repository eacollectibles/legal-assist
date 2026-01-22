/**
 * LegalNewsPage.tsx
 * Displays recent Ontario legal decisions relevant to paralegal practice areas
 * 
 * Features:
 * - Auto-fetches from CanLII RSS feeds
 * - Filters by practice area
 * - Search functionality
 * - Responsive design
 * - Links to full decisions on CanLII
 */

import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Scale, Search, ExternalLink, Filter, Clock, Tag, ChevronRight, RefreshCw, AlertCircle } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact';
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
  'landlord-tenant': '/services/landlord-tenant-board',
  'human-rights': '/services/human-rights-tribunal',
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

  // Render individual case card
  const CaseCard = ({ legalCase }: { legalCase: LegalCase }) => {
    const isRelevant = isHighlyRelevant(legalCase);
    
    return (
      <article className={`
        bg-white rounded-lg border p-5 transition-all hover:shadow-md
        ${isRelevant ? 'border-l-4 border-l-[#B94A1F] border-t border-r border-b border-gray-200' : 'border-gray-200'}
      `}>
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">
              {getCategoryIcon(legalCase.category)}
            </span>
            <span className="text-sm font-medium text-[#B94A1F] bg-[#B94A1F]/10 px-2 py-0.5 rounded">
              {getCategoryDisplayName(legalCase.category)}
            </span>
            {isRelevant && (
              <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded">
                Highly Relevant
              </span>
            )}
          </div>
          <time className="text-sm text-gray-500 whitespace-nowrap flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {formatCaseDate(legalCase.publishedDate)}
          </time>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-[#2C1810] mb-1 leading-snug">
          {legalCase.title}
        </h3>
        
        {/* Citation */}
        {legalCase.citation && (
          <p className="text-sm text-gray-600 font-mono mb-2">
            {legalCase.citation}
          </p>
        )}

        {/* Summary */}
        {legalCase.summary && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {legalCase.summary}
          </p>
        )}

        {/* Keywords */}
        {legalCase.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {legalCase.keywords.slice(0, 5).map((keyword, i) => (
              <span 
                key={i}
                className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            {legalCase.tribunalName}
          </span>
          <a
            href={legalCase.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#B94A1F] hover:underline"
          >
            Read on CanLII
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </article>
    );
  };

  return (
    <div className="min-h-screen bg-[#FDF8F4]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#B94A1F] to-[#8B3518] text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-10 h-10" />
            <h1 className="text-3xl md:text-4xl font-bold">Recent Legal Decisions</h1>
          </div>
          <p className="text-lg text-white/90 max-w-2xl mb-6">
            Stay informed with the latest Ontario tribunal and court decisions relevant to 
            landlord-tenant disputes, traffic tickets, small claims, and human rights matters.
          </p>
          <p className="text-sm text-white/70">
            Powered by CanLII • Updated automatically
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Filters & Search */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search decisions by keyword, citation, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B94A1F]/20 focus:border-[#B94A1F] transition-colors"
              />
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as PracticeArea | 'all')}
                className="pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B94A1F]/20 focus:border-[#B94A1F] bg-white appearance-none cursor-pointer min-w-[200px]"
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
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
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
            <RefreshCw className="w-8 h-8 text-[#B94A1F] animate-spin mb-4" />
            <p className="text-gray-600">Loading recent decisions...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={loadCases}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">No decisions found matching your criteria.</p>
                <button
                  onClick={() => { setFilter('all'); setSearchQuery(''); }}
                  className="text-[#B94A1F] hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}

        {/* CTA Section */}
        <section className="mt-12 bg-gradient-to-r from-[#2C1810] to-[#4A2A1F] rounded-xl p-8 text-white">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-3">
              Need Help Understanding a Decision?
            </h2>
            <p className="text-white/80 mb-6">
              Our licensed paralegal can help you understand how recent case law may affect 
              your situation and develop a strategy for your case.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#B94A1F] hover:bg-[#A03D15] rounded-lg font-semibold transition-colors"
              >
                Book Free Consultation
                <ChevronRight className="w-4 h-4" />
              </Link>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-colors"
              >
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm text-gray-600">
          <p className="font-medium mb-1">Disclaimer</p>
          <p>
            The decisions displayed on this page are sourced from CanLII (Canadian Legal Information Institute) 
            and are provided for informational purposes only. This is not legal advice. Each case depends on 
            its specific facts and circumstances. Contact a licensed paralegal or lawyer to understand how 
            the law applies to your situation.
          </p>
        </div>

        {/* Related Services Links */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-[#2C1810] mb-4">
            Our Practice Areas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {FILTER_OPTIONS.filter(o => o.value !== 'all').map(area => (
              <Link
                key={area.value}
                to={PRACTICE_AREA_LINKS[area.value as PracticeArea]}
                className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:border-[#B94A1F] hover:shadow-sm transition-all"
              >
                <span>{area.label.split(' ')[0]}</span>
                <span className="text-sm text-gray-600">
                  {area.label.split(' ').slice(1).join(' ')}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
