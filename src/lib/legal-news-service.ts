/**
 * Legal News Service
 * Fetches and parses RSS feeds from CanLII for Ontario tribunals and courts
 * 
 * Sources:
 * - Landlord and Tenant Board (LTB)
 * - Human Rights Tribunal of Ontario (HRTO)
 * - Ontario Court of Justice (ONCJ) - Traffic/POA
 * - Small Claims Court (SCSM)
 * - Divisional Court (ONSCDC) - Appeals
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

// Set to true to try live feeds, false for sample data
const USE_LIVE_FEEDS = false;

// CORS proxies to try (in order)
const CORS_PROXIES = [
  (url: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
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
    defaultCategory: 'traffic' // Most relevant for paralegal
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
  // LTB specific
  'N12', 'N13', 'N4', 'eviction', 'bad faith', 'own use',
  // Traffic specific
  'speeding', 'careless driving', 'stunt driving', 'fail to stop',
  // Small claims
  'breach of contract', 'debt collection',
  // HRTO
  'discrimination', 'accommodation',
  // General
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
  'dc:date'?: string;
}

/**
 * Parse RSS XML to extract items
 */
function parseRSSXML(xml: string): RSSItem[] {
  const items: RSSItem[] = [];
  
  // Simple regex-based parsing (works for CanLII RSS format)
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  
  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    
    const getTagContent = (tag: string): string => {
      const tagRegex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`);
      const tagMatch = itemXml.match(tagRegex);
      return tagMatch ? (tagMatch[1] || tagMatch[2] || '').trim() : '';
    };
    
    items.push({
      title: getTagContent('title'),
      link: getTagContent('link'),
      pubDate: getTagContent('pubDate'),
      description: getTagContent('description'),
      'dc:date': getTagContent('dc:date')
    });
  }
  
  return items;
}

/**
 * Extract citation from title (e.g., "2026 ONLTB 123")
 */
function extractCitation(title: string): string {
  const citationMatch = title.match(/\d{4}\s+\w+\s+\d+/);
  return citationMatch ? citationMatch[0] : '';
}

/**
 * Extract case name from title
 */
function extractCaseName(title: string): string {
  // Remove citation pattern from title
  return title.replace(/,?\s*\d{4}\s+\w+\s+\d+.*$/, '').trim();
}

/**
 * Categorize a case based on keywords in title/description
 */
function categorizeCase(
  title: string, 
  description: string, 
  defaultCategory: PracticeArea
): PracticeArea {
  const text = `${title} ${description}`.toLowerCase();
  
  // Check each category's keywords
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

/**
 * Extract keywords found in case
 */
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
  
  return found.slice(0, 10); // Limit to 10 keywords
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
// MAIN FETCH FUNCTIONS
// ============================================

/**
 * Fetch cases from a single tribunal
 */
export async function fetchTribunalCases(
  tribunalCode: TribunalCode,
  limit: number = 20
): Promise<LegalCase[]> {
  const config = TRIBUNAL_CONFIG[tribunalCode];
  
  // Try each CORS proxy until one works
  for (const getProxyUrl of CORS_PROXIES) {
    try {
      const proxyUrl = getProxyUrl(config.rssUrl);
      console.log(`Trying ${tribunalCode} via proxy...`);
      
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        console.log(`Proxy returned ${response.status}, trying next...`);
        continue;
      }
      
      const text = await response.text();
      
      // Some proxies return JSON, some return raw XML
      let xml = text;
      try {
        const json = JSON.parse(text);
        xml = json.contents || json.data || text;
      } catch {
        // Not JSON, use as-is
      }
      
      if (!xml || xml.length < 100) {
        console.log(`Empty response, trying next proxy...`);
        continue;
      }
      
      const items = parseRSSXML(xml);
      
      if (items.length === 0) {
        console.log(`No items parsed, trying next proxy...`);
        continue;
      }
      
      console.log(`Got ${items.length} items from ${tribunalCode}`);
      
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
          citation: citation,
          url: item.link,
          tribunal: tribunalCode,
          tribunalName: config.name,
          category: category,
          decisionDate: item['dc:date'] || item.pubDate,
          publishedDate: item.pubDate,
          summary: item.description || '',
          keywords: extractKeywords(item.title, item.description || '')
        };
      });
      
    } catch (error) {
      console.log(`Proxy failed for ${tribunalCode}, trying next...`);
      continue;
    }
  }
  
  console.error(`All proxies failed for ${tribunalCode}`);
  return [];
}

// Sample data for when live feeds aren't available
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
    id: 'onltb-2026-ONLTB-1189',
    title: 'TEL-98765-24 (Re)',
    citation: '2026 ONLTB 1189',
    url: 'https://canlii.ca/t/sample2',
    tribunal: 'onltb',
    tribunalName: 'Landlord and Tenant Board',
    category: 'landlord-tenant',
    decisionDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    publishedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    summary: 'L1 application for rent arrears. Tenant owed $4,500 in rent. Payment plan ordered with eviction stayed conditional on compliance.',
    keywords: ['L1', 'rent arrears', 'payment plan', 'eviction']
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
  {
    id: 'oncj-2026-ONCJ-389',
    title: 'R. v. Johnson',
    citation: '2026 ONCJ 389',
    url: 'https://canlii.ca/t/sample4',
    tribunal: 'oncj',
    tribunalName: 'Ontario Court of Justice',
    category: 'traffic',
    decisionDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    publishedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    summary: 'Careless driving charge dismissed. Crown failed to prove beyond reasonable doubt that driving fell markedly below standard of reasonable driver.',
    keywords: ['careless driving', 'dismissed', 'reasonable doubt']
  },
  {
    id: 'onscsm-2026-ONSCSM-789',
    title: 'Nguyen v. ABC Contractors Ltd.',
    citation: '2026 ONSCSM 789',
    url: 'https://canlii.ca/t/sample5',
    tribunal: 'onscsm',
    tribunalName: 'Small Claims Court',
    category: 'small-claims',
    decisionDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    publishedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    summary: 'Breach of contract for home renovation. Defendant failed to complete work to reasonable standard. Plaintiff awarded $12,500 in damages plus costs.',
    keywords: ['breach of contract', 'renovation', 'damages']
  },
  {
    id: 'onscsm-2026-ONSCSM-654',
    title: 'Patel v. Williams',
    citation: '2026 ONSCSM 654',
    url: 'https://canlii.ca/t/sample6',
    tribunal: 'onscsm',
    tribunalName: 'Small Claims Court',
    category: 'small-claims',
    decisionDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    publishedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    summary: 'Claim for unpaid loan of $8,000. Promissory note produced as evidence. Defendant ordered to pay full amount plus pre-judgment interest.',
    keywords: ['debt', 'loan', 'promissory note']
  },
  {
    id: 'onhrt-2026-HRTO-234',
    title: 'Chen v. XYZ Corporation',
    citation: '2026 HRTO 234',
    url: 'https://canlii.ca/t/sample7',
    tribunal: 'onhrt',
    tribunalName: 'Human Rights Tribunal of Ontario',
    category: 'human-rights',
    decisionDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    publishedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    summary: 'Discrimination on basis of disability in employment. Employer failed to accommodate. Applicant awarded $15,000 for injury to dignity plus lost wages.',
    keywords: ['discrimination', 'disability', 'accommodation', 'employment']
  },
  {
    id: 'onhrt-2026-HRTO-198',
    title: 'Rodriguez v. Landlord Inc.',
    citation: '2026 HRTO 198',
    url: 'https://canlii.ca/t/sample8',
    tribunal: 'onhrt',
    tribunalName: 'Human Rights Tribunal of Ontario',
    category: 'human-rights',
    decisionDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    publishedDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    summary: 'Discrimination in housing based on family status. Landlord refused to rent to family with children. $8,000 awarded for injury to dignity.',
    keywords: ['discrimination', 'family status', 'housing', 'rental']
  },
  {
    id: 'onltb-2026-ONLTB-1056',
    title: 'SWL-54321-24 (Re)',
    citation: '2026 ONLTB 1056',
    url: 'https://canlii.ca/t/sample9',
    tribunal: 'onltb',
    tribunalName: 'Landlord and Tenant Board',
    category: 'landlord-tenant',
    decisionDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    publishedDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    summary: 'T6 application for maintenance issues. Landlord failed to address mold and heating problems. Rent abatement of 15% ordered for 6 months.',
    keywords: ['T6', 'maintenance', 'mold', 'rent abatement']
  },
  {
    id: 'oncj-2026-ONCJ-267',
    title: 'R. v. Martinez',
    citation: '2026 ONCJ 267',
    url: 'https://canlii.ca/t/sample10',
    tribunal: 'oncj',
    tribunalName: 'Ontario Court of Justice',
    category: 'traffic',
    decisionDate: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    publishedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    summary: 'Fail to stop for red light. Defence argued sensor malfunction. Court accepted expert evidence on traffic light timing. Charge dismissed.',
    keywords: ['red light', 'dismissed', 'traffic signal']
  }
];

/**
 * Fetch cases - uses sample data for reliability
 * Live feeds can be enabled by setting USE_LIVE_FEEDS = true
 */
export async function fetchAllCases(
  limitPerTribunal: number = 15
): Promise<LegalCase[]> {
  
  if (!USE_LIVE_FEEDS) {
    console.log('Using sample legal news data');
    // Return sample data (simulates async fetch)
    return new Promise((resolve) => {
      setTimeout(() => resolve(SAMPLE_CASES), 500);
    });
  }
  
  // Try live feeds with CORS proxies
  console.log('Attempting to fetch live legal news...');
  
  const relevantTribunals: TribunalCode[] = ['onltb', 'onhrt', 'oncj', 'onscsm'];
  const allCases: LegalCase[] = [];
  
  for (const tribunal of relevantTribunals) {
    try {
      const cases = await fetchTribunalCases(tribunal, limitPerTribunal);
      allCases.push(...cases);
    } catch (err) {
      console.error(`Failed to fetch ${tribunal}:`, err);
    }
  }
  
  // If no live cases, fall back to sample data
  if (allCases.length === 0) {
    console.log('Live feeds failed, using sample data');
    return SAMPLE_CASES;
  }
  
  // Sort by published date (newest first)
  allCases.sort((a, b) => 
    new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
  
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

/**
 * Format date for display
 */
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

/**
 * Get category display name
 */
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

/**
 * Get category icon/emoji
 */
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

