/**
 * Legal News Service
 * Fetches and parses RSS feeds from CanLII for Ontario tribunals and courts
 *
 * Uses client-side CORS proxies since Wix hosting blocks outbound
 * server-side requests. Falls back to sample data if all proxies fail.
 *
 * Sources:
 * - Landlord and Tenant Board (LTB)
 * - Human Rights Tribunal of Ontario (HRTO)
 * - Ontario Court of Justice (ONCJ) - Traffic/POA
 * - Small Claims Court (SCSM)
 */

// ============================================
// TYPES
// ============================================

export interface LegalCase {
  id: string;
  title: string;
  citation: string;
  url: string;
  tribunal: TribunalCode;
  tribunalName: string;
  category: PracticeArea;
  decisionDate: string;
  publishedDate: string;
  summary: string;
  keywords: string[];
}

export type TribunalCode = 'onltb' | 'onhrt' | 'oncj' | 'onscsm' | 'onscdc' | 'onca';

export type PracticeArea =
  | 'landlord-tenant'
  | 'human-rights'
  | 'traffic'
  | 'small-claims'
  | 'provincial-offences'
  | 'employment'
  | 'other';

// ============================================
// CONFIGURATION
// ============================================

// CORS proxies to try (in order of reliability)
const CORS_PROXIES = [
  (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
];

export const TRIBUNAL_CONFIG: Record<TribunalCode, {
  name: string;
  rssUrl: string;
  defaultCategory: PracticeArea;
}> = {
  onltb: {
    name: 'Landlord and Tenant Board',
    rssUrl: 'https://www.canlii.org/en/on/onltb/rss.xml',
    defaultCategory: 'landlord-tenant'
  },
  onhrt: {
    name: 'Human Rights Tribunal of Ontario',
    rssUrl: 'https://www.canlii.org/en/on/onhrt/rss.xml',
    defaultCategory: 'human-rights'
  },
  oncj: {
    name: 'Ontario Court of Justice',
    rssUrl: 'https://www.canlii.org/en/on/oncj/rss.xml',
    defaultCategory: 'traffic'
  },
  onscsm: {
    name: 'Small Claims Court',
    rssUrl: 'https://www.canlii.org/en/on/onscsm/rss.xml',
    defaultCategory: 'small-claims'
  },
  onscdc: {
    name: 'Divisional Court',
    rssUrl: 'https://www.canlii.org/en/on/onscdc/rss.xml',
    defaultCategory: 'other'
  },
  onca: {
    name: 'Court of Appeal for Ontario',
    rssUrl: 'https://www.canlii.org/en/on/onca/rss.xml',
    defaultCategory: 'other'
  }
};

// Keywords to categorize and filter cases
export const CATEGORY_KEYWORDS: Record<PracticeArea, string[]> = {
  'landlord-tenant': [
    'tenant', 'landlord', 'eviction', 'rent', 'lease', 'N12', 'N13', 'N4', 'N5',
    'L1', 'L2', 'T1', 'T2', 'T6', 'RTA', 'Residential Tenancies Act',
    'arrears', 'non-payment', 'maintenance', 'repair', 'above guideline',
    'bad faith', 'own use', 'renoviction', 'AGI', 'housing', 'unit'
  ],
  'human-rights': [
    'discrimination', 'harassment', 'disability', 'accommodation', 'creed',
    'race', 'sex', 'gender', 'age', 'family status', 'marital status',
    'sexual orientation', 'HRTO', 'Human Rights Code', 'reprisal',
    'undue hardship', 'prima facie', 'complainant', 'respondent'
  ],
  'traffic': [
    'Highway Traffic Act', 'HTA', 'speeding', 'careless driving', 'stunt',
    'racing', 'impaired', 'over 80', 'fail to remain', 'fail to stop',
    'red light', 'stop sign', 'licence', 'suspension', 'demerit',
    'insurance', 'CVOR', 'commercial vehicle', 'radar', 'lidar'
  ],
  'small-claims': [
    'breach of contract', 'debt', 'damages', 'negligence', 'unjust enrichment',
    'promissory note', 'loan', 'invoice', 'payment', 'service', 'goods',
    'defamation', 'assault', 'battery', 'trespass', 'conversion',
    'consumer', 'warranty', 'deposit', 'refund'
  ],
  'provincial-offences': [
    'POA', 'Provincial Offences', 'by-law', 'bylaw', 'municipal',
    'fine', 'penalty', 'trespass', 'liquor', 'cannabis', 'noise',
    'parking', 'fire code', 'building code', 'health', 'safety'
  ],
  'employment': [
    'wrongful dismissal', 'termination', 'severance', 'notice period',
    'employment standards', 'ESA', 'wages', 'overtime', 'vacation',
    'constructive dismissal', 'just cause', 'mitigation'
  ],
  'other': []
};

// Keywords that indicate high relevance for your practice
export const HIGH_RELEVANCE_KEYWORDS = [
  'N12', 'N13', 'N4', 'eviction', 'bad faith', 'own use',
  'speeding', 'careless driving', 'stunt driving', 'fail to stop',
  'breach of contract', 'debt collection',
  'discrimination', 'accommodation',
  'paralegal', 'self-represented', 'costs'
];

// ============================================
// RSS PARSER
// ============================================

interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  description?: string;
  dcDate?: string;
}

/**
 * Parse RSS XML to extract items
 */
function parseRSSXML(xml: string): RSSItem[] {
  const items: RSSItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];

    const getTagContent = (tag: string): string => {
      const tagRegex = new RegExp(
        `<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`
      );
      const tagMatch = itemXml.match(tagRegex);
      return tagMatch ? (tagMatch[1] || tagMatch[2] || '').trim() : '';
    };

    items.push({
      title: getTagContent('title'),
      link: getTagContent('link'),
      pubDate: getTagContent('pubDate'),
      description: getTagContent('description'),
      dcDate: getTagContent('dc:date'),
    });
  }

  return items;
}

function extractCitation(title: string): string {
  const citationMatch = title.match(/\d{4}\s+\w+\s+\d+/);
  return citationMatch ? citationMatch[0] : '';
}

function extractCaseName(title: string): string {
  return title.replace(/,?\s*\d{4}\s+\w+\s+\d+.*$/, '').trim();
}

function categorizeCase(
  title: string,
  description: string,
  defaultCategory: PracticeArea
): PracticeArea {
  const text = `${title} ${description}`.toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (category === 'other') continue;
    for (const keyword of keywords) {
      if (text.includes(keyword.toLowerCase())) {
        return category as PracticeArea;
      }
    }
  }

  return defaultCategory;
}

function extractKeywords(title: string, description: string): string[] {
  const text = `${title} ${description}`.toLowerCase();
  const found: string[] = [];

  for (const keywords of Object.values(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (text.includes(keyword.toLowerCase()) && !found.includes(keyword)) {
        found.push(keyword);
      }
    }
  }

  return found.slice(0, 10);
}

/**
 * Check if case is highly relevant to paralegal practice
 */
export function isHighlyRelevant(legalCase: LegalCase): boolean {
  const text = `${legalCase.title} ${legalCase.summary}`.toLowerCase();
  return HIGH_RELEVANCE_KEYWORDS.some(keyword =>
    text.includes(keyword.toLowerCase())
  );
}

// ============================================
// FETCH FUNCTIONS
// ============================================

/**
 * Fetch cases from a single tribunal via CORS proxy
 */
async function fetchTribunalCases(
  tribunalCode: TribunalCode,
  limit: number = 20
): Promise<LegalCase[]> {
  const config = TRIBUNAL_CONFIG[tribunalCode];

  for (const getProxyUrl of CORS_PROXIES) {
    try {
      const proxyUrl = getProxyUrl(config.rssUrl);
      // trying ${tribunalCode} via proxy

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(proxyUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        // proxy returned ${response.status}
        continue;
      }

      const text = await response.text();

      // Some proxies return JSON wrapper, some return raw XML
      let xml = text;
      try {
        const json = JSON.parse(text);
        xml = json.contents || json.data || text;
      } catch {
        // Not JSON, use as-is (raw XML)
      }

      if (!xml || xml.length < 100) {
        // empty response
        continue;
      }

      const items = parseRSSXML(xml);

      if (items.length === 0) {
        // no items parsed from ${tribunalCode}
        continue;
      }

      // got ${items.length} items from ${tribunalCode}

      return items.slice(0, limit).map((item, index) => {
        const citation = extractCitation(item.title);
        const caseName = extractCaseName(item.title);
        const category = categorizeCase(
          item.title,
          item.description || '',
          config.defaultCategory
        );

        return {
          id: `${tribunalCode}-${citation.replace(/\s+/g, '-') || index}`,
          title: caseName || item.title,
          citation,
          url: item.link,
          tribunal: tribunalCode,
          tribunalName: config.name,
          category,
          decisionDate: item.dcDate || item.pubDate,
          publishedDate: item.pubDate,
          summary: item.description || '',
          keywords: extractKeywords(item.title, item.description || ''),
        };
      });
    } catch (error) {
      // proxy failed for ${tribunalCode}
      continue;
    }
  }

  console.error(`All proxies failed for ${tribunalCode}`);
  return [];
}

// Sample data fallback
const SAMPLE_CASES: LegalCase[] = [
  {
    id: 'onltb-2026-ONLTB-1234',
    title: 'TSL-12345-24 (Re)',
    citation: '2026 ONLTB 1234',
    url: 'https://canlii.ca/t/sample1',
    tribunal: 'onltb',
    tribunalName: 'Landlord and Tenant Board',
    category: 'landlord-tenant',
    decisionDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    publishedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    summary: 'Application for eviction based on N12 notice. Landlord seeking possession for own use. Board found landlord failed to demonstrate genuine intent to occupy the unit.',
    keywords: ['N12', 'eviction', 'own use', 'bad faith']
  },
  {
    id: 'oncj-2026-ONCJ-456',
    title: 'R. v. Smith',
    citation: '2026 ONCJ 456',
    url: 'https://canlii.ca/t/sample3',
    tribunal: 'oncj',
    tribunalName: 'Ontario Court of Justice',
    category: 'traffic',
    decisionDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    publishedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    summary: 'Speeding charge reduced from 50 km/h over to 15 km/h over. Officer\'s calibration records incomplete. Crown accepted plea to lesser included offence.',
    keywords: ['speeding', 'Highway Traffic Act', 'reduced charge']
  },
];

/**
 * Fetch all cases from CanLII via CORS proxies
 * Falls back to sample data if all feeds fail
 */
export async function fetchAllCases(
  limitPerTribunal: number = 15
): Promise<LegalCase[]> {
  // fetching live legal news from CanLII

  const relevantTribunals: TribunalCode[] = ['onltb', 'onhrt', 'oncj', 'onscsm'];

  // Fetch all tribunals in parallel for speed
  const results = await Promise.allSettled(
    relevantTribunals.map(code => fetchTribunalCases(code, limitPerTribunal))
  );

  const allCases: LegalCase[] = [];

  results.forEach((result, i) => {
    if (result.status === 'fulfilled' && result.value.length > 0) {
      allCases.push(...result.value);
      // ${relevantTribunals[i]}: ${result.value.length} cases
    } else {
      console.warn(`${relevantTribunals[i]}: failed or empty`);
    }
  });

  if (allCases.length === 0) {
    // all live feeds failed, using sample data
    return SAMPLE_CASES;
  }

  // Sort by published date (newest first)
  allCases.sort((a, b) =>
    new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

  // total: ${allCases.length} live cases fetched
  return allCases;
}

/**
 * Filter cases by practice area
 */
export function filterByCategory(
  cases: LegalCase[],
  category: PracticeArea
): LegalCase[] {
  if (category === 'other') return cases;
  return cases.filter(c => c.category === category);
}

/**
 * Filter to only highly relevant cases
 */
export function filterHighlyRelevant(cases: LegalCase[]): LegalCase[] {
  return cases.filter(isHighlyRelevant);
}

/**
 * Search cases by keyword
 */
export function searchCases(cases: LegalCase[], query: string): LegalCase[] {
  const lowerQuery = query.toLowerCase();
  return cases.filter(c =>
    c.title.toLowerCase().includes(lowerQuery) ||
    c.citation.toLowerCase().includes(lowerQuery) ||
    c.summary.toLowerCase().includes(lowerQuery) ||
    c.keywords.some(k => k.toLowerCase().includes(lowerQuery))
  );
}

// ============================================
// FORMATTING HELPERS
// ============================================

export function formatCaseDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

export function getCategoryDisplayName(category: PracticeArea): string {
  const names: Record<PracticeArea, string> = {
    'landlord-tenant': 'Landlord & Tenant',
    'human-rights': 'Human Rights',
    'traffic': 'Traffic',
    'small-claims': 'Small Claims',
    'provincial-offences': 'Provincial Offences',
    'employment': 'Employment',
    'other': 'Other'
  };
  return names[category];
}

export function getCategoryIcon(category: PracticeArea): string {
  const icons: Record<PracticeArea, string> = {
    'landlord-tenant': '🏠',
    'human-rights': '⚖️',
    'traffic': '🚗',
    'small-claims': '💰',
    'provincial-offences': '📋',
    'employment': '💼',
    'other': '📄'
  };
  return icons[category];
}
