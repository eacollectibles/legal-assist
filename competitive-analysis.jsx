import { useState } from "react";

const METRICS = [
  {
    category: "SEO & Technical",
    metrics: [
      { name: "Total Indexable Pages", weight: 10, description: "Number of unique pages search engines can crawl and index" },
      { name: "Blog / Content Marketing", weight: 8, description: "Active blog with regular, original legal content" },
      { name: "FAQ Schema Markup", weight: 7, description: "Structured FAQ data for Google rich snippets" },
      { name: "Local SEO / City Pages", weight: 9, description: "Dedicated pages targeting specific cities and regions" },
      { name: "Page Load Speed", weight: 6, description: "Perceived speed and Core Web Vitals performance" },
      { name: "Meta / Open Graph Tags", weight: 5, description: "Proper title tags, descriptions, and social sharing tags" },
    ],
  },
  {
    category: "Content Depth & Quality",
    metrics: [
      { name: "Service Page Depth", weight: 10, description: "Detailed explanations of each practice area with processes, timelines, and outcomes" },
      { name: "Legal Accuracy", weight: 10, description: "Correct statutes, fines, deadlines, and legal procedures" },
      { name: "Educational Guides", weight: 7, description: "How-to guides, process explainers, and informational resources" },
      { name: "FAQ Coverage", weight: 7, description: "Thorough Q&A addressing real client concerns on each page" },
      { name: "Content Freshness", weight: 5, description: "Content updated to reflect current law (2025/2026 changes)" },
    ],
  },
  {
    category: "Design & User Experience",
    metrics: [
      { name: "Visual Design Quality", weight: 7, description: "Professional, modern, and polished appearance" },
      { name: "Mobile Responsiveness", weight: 8, description: "Fully functional and well-designed on mobile devices" },
      { name: "Navigation & Structure", weight: 7, description: "Intuitive site architecture and easy wayfinding" },
      { name: "Accessibility (WCAG)", weight: 5, description: "Screen reader support, contrast ratios, keyboard navigation" },
    ],
  },
  {
    category: "Trust & Conversion",
    metrics: [
      { name: "Clear CTAs", weight: 8, description: "Prominent calls-to-action (book consultation, call now)" },
      { name: "Trust Signals", weight: 8, description: "LSO badge, testimonials, reviews, awards, credentials" },
      { name: "Contact Options", weight: 6, description: "Phone, form, email, chat, text — multiple channels" },
      { name: "Pricing Transparency", weight: 7, description: "Clear fee structures or ranges visible on the site" },
      { name: "Social Proof / Reviews", weight: 7, description: "Google reviews, testimonials, case outcomes" },
    ],
  },
  {
    category: "Service Coverage",
    metrics: [
      { name: "Practice Areas Breadth", weight: 8, description: "Number and range of legal services offered" },
      { name: "Geographic Coverage", weight: 7, description: "Cities and regions explicitly served with dedicated content" },
      { name: "Niche Specialization", weight: 5, description: "Deep expertise pages for specific sub-topics (e.g. stunt driving, N12 evictions)" },
    ],
  },
];

const COMPETITORS = [
  {
    name: "LegalAssist",
    url: "legalassist.london",
    isYou: true,
    location: "London, ON",
    scores: {
      "Total Indexable Pages": 10, "Blog / Content Marketing": 9, "FAQ Schema Markup": 10,
      "Local SEO / City Pages": 10, "Page Load Speed": 8, "Meta / Open Graph Tags": 9,
      "Service Page Depth": 10, "Legal Accuracy": 10, "Educational Guides": 9,
      "FAQ Coverage": 10, "Content Freshness": 10,
      "Visual Design Quality": 8, "Mobile Responsiveness": 9, "Navigation & Structure": 9, "Accessibility (WCAG)": 7,
      "Clear CTAs": 9, "Trust Signals": 7, "Contact Options": 8, "Pricing Transparency": 8, "Social Proof / Reviews": 5,
      "Practice Areas Breadth": 10, "Geographic Coverage": 10, "Niche Specialization": 10,
    },
    notes: "400+ pages, 12 blogs, 1,485 city pages, FAQ schema on every page, deep legal content per service. Weakness: limited Google reviews & testimonials, footer placeholders still present."
  },
  {
    name: "OTD Legal",
    url: "otdlegal.ca",
    location: "Multi-city, ON",
    scores: {
      "Total Indexable Pages": 7, "Blog / Content Marketing": 7, "FAQ Schema Markup": 4,
      "Local SEO / City Pages": 7, "Page Load Speed": 7, "Meta / Open Graph Tags": 6,
      "Service Page Depth": 7, "Legal Accuracy": 8, "Educational Guides": 6,
      "FAQ Coverage": 5, "Content Freshness": 7,
      "Visual Design Quality": 7, "Mobile Responsiveness": 7, "Navigation & Structure": 7, "Accessibility (WCAG)": 5,
      "Clear CTAs": 8, "Trust Signals": 5, "Contact Options": 9, "Pricing Transparency": 3, "Social Proof / Reviews": 4,
      "Practice Areas Breadth": 5, "Geographic Coverage": 7, "Niche Specialization": 7,
    },
    notes: "Strong traffic-ticket focused firm with 8+ locations and an active blog. Weak on trust signals (no visible reviews/testimonials) and no pricing shown."
  },
  {
    name: "POINTTS",
    url: "pointts.com",
    location: "National (ON, AB, MB)",
    scores: {
      "Total Indexable Pages": 7, "Blog / Content Marketing": 3, "FAQ Schema Markup": 4,
      "Local SEO / City Pages": 8, "Page Load Speed": 7, "Meta / Open Graph Tags": 6,
      "Service Page Depth": 6, "Legal Accuracy": 7, "Educational Guides": 5,
      "FAQ Coverage": 6, "Content Freshness": 6,
      "Visual Design Quality": 8, "Mobile Responsiveness": 7, "Navigation & Structure": 8, "Accessibility (WCAG)": 6,
      "Clear CTAs": 9, "Trust Signals": 9, "Contact Options": 8, "Pricing Transparency": 3, "Social Proof / Reviews": 9,
      "Practice Areas Breadth": 4, "Geographic Coverage": 9, "Niche Specialization": 6,
    },
    notes: "Established brand since 1984. Strong trust (90%+ win claim, testimonials). 18 locations. Traffic-only — no LTB, employment, or small claims. No blog, no pricing."
  },
  {
    name: "X-COPS",
    url: "x-cops.ca",
    location: "Multi-city, ON",
    scores: {
      "Total Indexable Pages": 7, "Blog / Content Marketing": 3, "FAQ Schema Markup": 3,
      "Local SEO / City Pages": 9, "Page Load Speed": 6, "Meta / Open Graph Tags": 5,
      "Service Page Depth": 7, "Legal Accuracy": 7, "Educational Guides": 5,
      "FAQ Coverage": 4, "Content Freshness": 6,
      "Visual Design Quality": 7, "Mobile Responsiveness": 7, "Navigation & Structure": 7, "Accessibility (WCAG)": 5,
      "Clear CTAs": 8, "Trust Signals": 9, "Contact Options": 7, "Pricing Transparency": 2, "Social Proof / Reviews": 9,
      "Practice Areas Breadth": 5, "Geographic Coverage": 9, "Niche Specialization": 7,
    },
    notes: "98% success rate claim, 164 Google reviews (5.0 stars), 25+ city pages. Traffic-focused only. No blog, no pricing, no FAQ schema."
  },
  {
    name: "Traffic Ticket Chopper",
    url: "trafficticketchopper.com",
    location: "Multi-city, ON",
    scores: {
      "Total Indexable Pages": 5, "Blog / Content Marketing": 2, "FAQ Schema Markup": 3,
      "Local SEO / City Pages": 6, "Page Load Speed": 7, "Meta / Open Graph Tags": 5,
      "Service Page Depth": 7, "Legal Accuracy": 7, "Educational Guides": 5,
      "FAQ Coverage": 7, "Content Freshness": 6,
      "Visual Design Quality": 8, "Mobile Responsiveness": 8, "Navigation & Structure": 7, "Accessibility (WCAG)": 5,
      "Clear CTAs": 8, "Trust Signals": 7, "Contact Options": 9, "Pricing Transparency": 4, "Social Proof / Reviews": 7,
      "Practice Areas Breadth": 4, "Geographic Coverage": 6, "Niche Specialization": 7,
    },
    notes: "Clean design, good FAQ on London page, 24/7 availability. Traffic-only. 6 city pages. Block-fee mentioned but not disclosed. No blog."
  },
  {
    name: "Cordaie Paralegal",
    url: "cordaie.com",
    location: "Multi-city, ON",
    scores: {
      "Total Indexable Pages": 6, "Blog / Content Marketing": 2, "FAQ Schema Markup": 3,
      "Local SEO / City Pages": 8, "Page Load Speed": 7, "Meta / Open Graph Tags": 5,
      "Service Page Depth": 7, "Legal Accuracy": 7, "Educational Guides": 5,
      "FAQ Coverage": 7, "Content Freshness": 6,
      "Visual Design Quality": 8, "Mobile Responsiveness": 7, "Navigation & Structure": 7, "Accessibility (WCAG)": 5,
      "Clear CTAs": 9, "Trust Signals": 7, "Contact Options": 8, "Pricing Transparency": 5, "Social Proof / Reviews": 6,
      "Practice Areas Breadth": 7, "Geographic Coverage": 8, "Niche Specialization": 5,
    },
    notes: "17 city pages, 6 practice areas, flat-fee pricing mentioned. Clean design. ~600 clients served. No blog, limited schema."
  },
  {
    name: "HELP Legal",
    url: "helplegal.ca",
    location: "Ottawa, ON",
    scores: {
      "Total Indexable Pages": 4, "Blog / Content Marketing": 2, "FAQ Schema Markup": 3,
      "Local SEO / City Pages": 3, "Page Load Speed": 6, "Meta / Open Graph Tags": 4,
      "Service Page Depth": 5, "Legal Accuracy": 6, "Educational Guides": 4,
      "FAQ Coverage": 5, "Content Freshness": 5,
      "Visual Design Quality": 6, "Mobile Responsiveness": 6, "Navigation & Structure": 6, "Accessibility (WCAG)": 4,
      "Clear CTAs": 7, "Trust Signals": 5, "Contact Options": 5, "Pricing Transparency": 2, "Social Proof / Reviews": 3,
      "Practice Areas Breadth": 5, "Geographic Coverage": 3, "Niche Specialization": 5,
    },
    notes: "Traffic-focused, Ottawa-based. Claims province-wide but only 1 location page. Dated design. External news links instead of blog. No pricing."
  },
  {
    name: "Evans Paralegal",
    url: "evansparalegalsvcs.com",
    location: "London, ON",
    scores: {
      "Total Indexable Pages": 3, "Blog / Content Marketing": 1, "FAQ Schema Markup": 1,
      "Local SEO / City Pages": 2, "Page Load Speed": 6, "Meta / Open Graph Tags": 3,
      "Service Page Depth": 5, "Legal Accuracy": 6, "Educational Guides": 3,
      "FAQ Coverage": 2, "Content Freshness": 4,
      "Visual Design Quality": 7, "Mobile Responsiveness": 6, "Navigation & Structure": 6, "Accessibility (WCAG)": 4,
      "Clear CTAs": 6, "Trust Signals": 6, "Contact Options": 5, "Pricing Transparency": 2, "Social Proof / Reviews": 4,
      "Practice Areas Breadth": 7, "Geographic Coverage": 2, "Niche Specialization": 4,
    },
    notes: "London-based direct competitor. 7 practice areas but thin content. No blog, no FAQ, no schema, no city pages. One testimonial. No pricing."
  },
  {
    name: "Carmen Dawdy",
    url: "carmendawdyparalegal.ca",
    location: "London, ON",
    scores: {
      "Total Indexable Pages": 3, "Blog / Content Marketing": 1, "FAQ Schema Markup": 1,
      "Local SEO / City Pages": 2, "Page Load Speed": 5, "Meta / Open Graph Tags": 3,
      "Service Page Depth": 4, "Legal Accuracy": 6, "Educational Guides": 2,
      "FAQ Coverage": 2, "Content Freshness": 4,
      "Visual Design Quality": 6, "Mobile Responsiveness": 6, "Navigation & Structure": 5, "Accessibility (WCAG)": 4,
      "Clear CTAs": 6, "Trust Signals": 7, "Contact Options": 6, "Pricing Transparency": 2, "Social Proof / Reviews": 6,
      "Practice Areas Breadth": 4, "Geographic Coverage": 3, "Niche Specialization": 3,
    },
    notes: "London local with 13+ years. Consumer Choice Award winner — good trust signal. Only 4 services. No blog, FAQ, pricing. Dated design."
  },
  {
    name: "Persuasive Paralegals",
    url: "persuasiveparalegals.com",
    location: "SW Ontario",
    scores: {
      "Total Indexable Pages": 2, "Blog / Content Marketing": 1, "FAQ Schema Markup": 1,
      "Local SEO / City Pages": 1, "Page Load Speed": 5, "Meta / Open Graph Tags": 3,
      "Service Page Depth": 4, "Legal Accuracy": 5, "Educational Guides": 2,
      "FAQ Coverage": 1, "Content Freshness": 3,
      "Visual Design Quality": 6, "Mobile Responsiveness": 5, "Navigation & Structure": 5, "Accessibility (WCAG)": 3,
      "Clear CTAs": 5, "Trust Signals": 3, "Contact Options": 5, "Pricing Transparency": 2, "Social Proof / Reviews": 2,
      "Practice Areas Breadth": 4, "Geographic Coverage": 2, "Niche Specialization": 3,
    },
    notes: "SW Ontario generalist. 4 services, minimal content depth. No blog, no FAQ, no reviews, no city pages, no pricing. Basic website."
  },
  {
    name: "AR Litigation",
    url: "arlitigation.ca",
    location: "London & Windsor",
    scores: {
      "Total Indexable Pages": 2, "Blog / Content Marketing": 1, "FAQ Schema Markup": 1,
      "Local SEO / City Pages": 2, "Page Load Speed": 5, "Meta / Open Graph Tags": 3,
      "Service Page Depth": 4, "Legal Accuracy": 5, "Educational Guides": 2,
      "FAQ Coverage": 1, "Content Freshness": 3,
      "Visual Design Quality": 6, "Mobile Responsiveness": 5, "Navigation & Structure": 5, "Accessibility (WCAG)": 3,
      "Clear CTAs": 6, "Trust Signals": 5, "Contact Options": 6, "Pricing Transparency": 2, "Social Proof / Reviews": 2,
      "Practice Areas Breadth": 4, "Geographic Coverage": 3, "Niche Specialization": 3,
    },
    notes: "London/Windsor. 4 services. College instructor credential adds credibility. No blog, FAQ, schema, or pricing. Dated design."
  },
];

function getWeightedScore(scores) {
  let totalWeighted = 0;
  let totalWeight = 0;
  METRICS.forEach((cat) =>
    cat.metrics.forEach((m) => {
      const s = scores[m.name];
      if (s !== undefined) {
        totalWeighted += s * m.weight;
        totalWeight += m.weight * 10;
      }
    })
  );
  return Math.round((totalWeighted / totalWeight) * 100);
}

function getCategoryScore(scores, category) {
  const cat = METRICS.find((c) => c.category === category);
  if (!cat) return 0;
  let tw = 0, tt = 0;
  cat.metrics.forEach((m) => {
    const s = scores[m.name];
    if (s !== undefined) { tw += s * m.weight; tt += m.weight * 10; }
  });
  return Math.round((tw / tt) * 100);
}

function ScoreBadge({ score }) {
  const color =
    score >= 80 ? "bg-emerald-100 text-emerald-800 border-emerald-300" :
    score >= 60 ? "bg-blue-100 text-blue-800 border-blue-300" :
    score >= 40 ? "bg-yellow-100 text-yellow-800 border-yellow-300" :
    "bg-red-100 text-red-800 border-red-300";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-bold border ${color}`}>
      {score}%
    </span>
  );
}

function ScoreBar({ score, max = 10 }) {
  const pct = (score / max) * 100;
  const color =
    score >= 8 ? "bg-emerald-500" :
    score >= 6 ? "bg-blue-500" :
    score >= 4 ? "bg-yellow-500" :
    "bg-red-400";
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-mono w-5 text-right text-gray-600">{score}</span>
    </div>
  );
}

function RankBadge({ rank }) {
  const style =
    rank === 1 ? "bg-amber-400 text-white" :
    rank === 2 ? "bg-gray-400 text-white" :
    rank === 3 ? "bg-amber-700 text-white" :
    "bg-gray-200 text-gray-600";
  return (
    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${style}`}>
      #{rank}
    </span>
  );
}

export default function CompetitiveAnalysis() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedCompetitor, setExpandedCompetitor] = useState(null);

  const ranked = [...COMPETITORS]
    .map((c) => ({ ...c, overall: getWeightedScore(c.scores) }))
    .sort((a, b) => b.overall - a.overall);

  const categories = ["All", ...METRICS.map((m) => m.category)];

  return (
    <div className="bg-white min-h-screen p-4 md:p-8 font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Competitive Analysis</h1>
        <p className="text-sm text-gray-500">LegalAssist vs. 10 Ontario paralegal competitors — April 2026</p>
      </div>

      {/* Scoring Legend */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <h2 className="text-sm font-bold text-gray-700 mb-2">Rating System</h2>
        <p className="text-xs text-gray-500 mb-3">
          Each metric scored 1–10 based on publicly visible website features. Scores are weighted by business impact (weight shown per metric). Overall % = weighted average across all 23 metrics.
        </p>
        <div className="flex flex-wrap gap-3 text-xs">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-500" /> 8–10: Excellent</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500" /> 6–7: Good</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-500" /> 4–5: Fair</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-400" /> 1–3: Weak</span>
        </div>
      </div>

      {/* Overall Leaderboard */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Overall Rankings</h2>
        <div className="space-y-2">
          {ranked.map((c, i) => (
            <div
              key={c.name}
              onClick={() => setExpandedCompetitor(expandedCompetitor === c.name ? null : c.name)}
              className={`border rounded-lg p-3 cursor-pointer transition-all ${
                c.isYou ? "border-emerald-400 bg-emerald-50/50 ring-1 ring-emerald-200" : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <RankBadge rank={i + 1} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-sm ${c.isYou ? "text-emerald-700" : "text-gray-900"}`}>
                      {c.name}
                      {c.isYou && <span className="ml-1 text-xs font-normal text-emerald-600">(You)</span>}
                    </span>
                    <span className="text-xs text-gray-400 truncate hidden sm:inline">{c.url}</span>
                  </div>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    {METRICS.map((cat) => {
                      const cs = getCategoryScore(c.scores, cat.category);
                      return (
                        <span key={cat.category} className="text-xs text-gray-500">
                          {cat.category.split(" ")[0]}: <span className="font-medium text-gray-700">{cs}%</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
                <ScoreBadge score={c.overall} />
              </div>

              {expandedCompetitor === c.name && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-600 mb-3 italic">{c.notes}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                    {METRICS.flatMap((cat) =>
                      cat.metrics.map((m) => (
                        <div key={m.name} className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 w-40 truncate" title={m.description}>{m.name}</span>
                          <div className="flex-1"><ScoreBar score={c.scores[m.name] || 0} /></div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Category Breakdown</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-2 font-medium text-gray-500 sticky left-0 bg-gray-50 min-w-[120px]">Metric</th>
                <th className="p-2 font-medium text-gray-400 text-center w-10">Wt</th>
                {ranked.map((c) => (
                  <th key={c.name} className={`p-2 font-medium text-center min-w-[60px] ${c.isYou ? "text-emerald-700 bg-emerald-50" : "text-gray-600"}`}>
                    {c.name.split(" ")[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {METRICS.filter((cat) => selectedCategory === "All" || cat.category === selectedCategory).map((cat) => (
                <>
                  <tr key={cat.category} className="bg-gray-100">
                    <td colSpan={ranked.length + 2} className="p-2 font-bold text-gray-700 text-xs uppercase tracking-wider">
                      {cat.category}
                    </td>
                  </tr>
                  {cat.metrics.map((m) => (
                    <tr key={m.name} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-2 text-gray-700 sticky left-0 bg-white" title={m.description}>{m.name}</td>
                      <td className="p-2 text-center text-gray-400">{m.weight}</td>
                      {ranked.map((c) => {
                        const s = c.scores[m.name] || 0;
                        const bg =
                          s >= 8 ? "bg-emerald-100 text-emerald-800" :
                          s >= 6 ? "bg-blue-50 text-blue-700" :
                          s >= 4 ? "bg-yellow-50 text-yellow-700" :
                          "bg-red-50 text-red-700";
                        return (
                          <td key={c.name} className={`p-2 text-center font-mono font-bold ${c.isYou ? "ring-1 ring-emerald-200" : ""} ${bg}`}>
                            {s}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </>
              ))}
              <tr className="bg-gray-800 text-white font-bold">
                <td className="p-2 sticky left-0 bg-gray-800">OVERALL</td>
                <td className="p-2" />
                {ranked.map((c) => (
                  <td key={c.name} className="p-2 text-center">{c.overall}%</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h2 className="text-sm font-bold text-gray-700 mb-3">Key Takeaways</h2>
        <div className="space-y-3 text-xs text-gray-600">
          <div>
            <span className="font-bold text-emerald-700">Your biggest advantages:</span>{" "}
            Content depth (400+ pages vs. competitors' 5–30), city-level SEO (1,485 city pages — no competitor comes close), FAQ schema on every page, and breadth of practice areas (traffic, LTB, employment, human rights, small claims, criminal — most competitors cover 4–6).
          </div>
          <div>
            <span className="font-bold text-amber-700">Where you trail:</span>{" "}
            Social proof is your weakest area. POINTTS has decades of brand trust and a "90% win rate" claim. X-COPS has 164 Google reviews at 5.0 stars. Carmen Dawdy has a Consumer Choice Award. You need Google reviews and visible testimonials to close this gap.
          </div>
          <div>
            <span className="font-bold text-blue-700">Industry-wide gaps you exploit:</span>{" "}
            Almost no competitor has a blog (only OTD Legal posts occasionally). None have FAQ schema markup. None disclose pricing. Your transparency and content volume put you in a different league for SEO — but you need the social proof to convert that traffic.
          </div>
          <div>
            <span className="font-bold text-gray-700">Immediate action items:</span>{" "}
            (1) Collect Google reviews from past clients — even 10–15 five-star reviews would transform your trust signals. (2) Fill in the Footer placeholder (name + LSO licence #). (3) Add a testimonials section to your home page or service pages. (4) Consider adding a live chat or text option to match Traffic Ticket Chopper's 24/7 accessibility.
          </div>
        </div>
      </div>

      {/* Methodology */}
      <div className="mt-6 text-xs text-gray-400 border-t pt-4">
        <p className="font-medium text-gray-500 mb-1">Methodology</p>
        <p>Scores based on publicly visible website features as of April 2026. Each metric scored 1–10 by evaluating the live website. Weighted scoring reflects business impact: content depth & legal accuracy (weight 10) matter more than page speed (weight 6). LegalAssist scores reflect actual codebase analysis (400+ pages verified). Competitor scores reflect WebFetch evaluation of their public websites. This analysis does not account for paid advertising, offline reputation, or non-public business metrics.</p>
      </div>
    </div>
  );
}