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
  
  try {
    const response = await fetch(config.rssUrl);
    
    if (!response.ok) {
      console.error(`Failed to fetch ${tribunalCode}: ${response.status}`);
      return [];
    }
    
    const xml = await response.text();
    const items = parseRSSXML(xml);
    
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
    console.error(`Error fetching ${tribunalCode}:`, error);
    return [];
  }
}

/**
 * Fetch cases from all relevant tribunals
 */
export async function fetchAllCases(
  limitPerTribunal: number = 10
): Promise<LegalCase[]> {
  const relevantTribunals: TribunalCode[] = [
    'onltb',   // LTB - most relevant
    'onhrt',   // HRTO
    'oncj',    // Traffic/POA
    'onscsm',  // Small Claims
  ];
  
  const allCases: LegalCase[] = [];
  
  for (const tribunal of relevantTribunals) {
    const cases = await fetchTribunalCases(tribunal, limitPerTribunal);
    allCases.push(...cases);
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
