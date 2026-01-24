/**
 * Traffic Ticket Quote Service
 * Handles ticket extraction (simulated/real), offence database, and quote calculations
 */

// Toggle for real API vs simulation
export const USE_REAL_API = false;

// ============================================
// TYPES
// ============================================

export interface OffenceType {
  id: string;
  name: string;
  category: 'speeding' | 'major' | 'minor' | 'criminal_adjacent';
  demeritPoints: number;
  fineRange: { min: number; max: number };
  insuranceImpactPercent: number; // Estimated 3-year impact on premiums
  serviceFee: number; // Our fee to fight it
  typicalCourtAppearances: number;
  successRate: { withdrawn: number; reduced: number; convicted: number };
  notes: string;
}

export interface TicketDetails {
  offenceType: string;
  offenceId: string;
  speed?: number;
  speedLimit?: number;
  fineAmount?: number;
  demeritPoints: number;
  courtDate?: string;
  courtLocation?: string;
  ticketNumber?: string;
  officerNotes?: string;
}

export interface QuoteResult {
  ticketDetails: TicketDetails;
  offence: OffenceType;
  serviceFee: number;
  estimatedInsuranceImpact: {
    monthlyIncrease: number;
    threeYearTotal: number;
  };
  breakEvenAnalysis: {
    costToFight: number;
    costIfConvicted: number;
    potentialSavings: number;
  };
  recommendation: 'strongly_fight' | 'fight' | 'negotiate' | 'consider_paying';
  recommendationReason: string;
  estimatedTimeline: string;
  disclaimer: string;
}

// ============================================
// OFFENCE DATABASE
// ============================================

export const OFFENCE_TYPES: OffenceType[] = [
  // SPEEDING TIERS
  {
    id: 'speeding_1_15',
    name: 'Speeding 1-15 km/h over',
    category: 'speeding',
    demeritPoints: 0,
    fineRange: { min: 52, max: 52 },
    insuranceImpactPercent: 5,
    serviceFee: 299,
    typicalCourtAppearances: 1,
    successRate: { withdrawn: 25, reduced: 50, convicted: 25 },
    notes: 'Minor speeding. Often reduced to 0 points or withdrawn for clean records.',
  },
  {
    id: 'speeding_16_29',
    name: 'Speeding 16-29 km/h over',
    category: 'speeding',
    demeritPoints: 3,
    fineRange: { min: 95, max: 180 },
    insuranceImpactPercent: 15,
    serviceFee: 399,
    typicalCourtAppearances: 1,
    successRate: { withdrawn: 20, reduced: 55, convicted: 25 },
    notes: 'Most common speeding ticket. Good chance of reduction to 0-point offence.',
  },
  {
    id: 'speeding_30_49',
    name: 'Speeding 30-49 km/h over',
    category: 'speeding',
    demeritPoints: 4,
    fineRange: { min: 220, max: 360 },
    insuranceImpactPercent: 25,
    serviceFee: 549,
    typicalCourtAppearances: 1,
    successRate: { withdrawn: 15, reduced: 50, convicted: 35 },
    notes: 'Significant speeding. Insurance impact substantial. Worth fighting.',
  },
  {
    id: 'speeding_50_plus',
    name: 'Speeding 50+ km/h over (Stunt Driving)',
    category: 'major',
    demeritPoints: 6,
    fineRange: { min: 2000, max: 10000 },
    insuranceImpactPercent: 100,
    serviceFee: 1499,
    typicalCourtAppearances: 2,
    successRate: { withdrawn: 10, reduced: 40, convicted: 50 },
    notes: 'Stunt driving charge. Mandatory court. Licence suspension. MUST fight this.',
  },

  // MAJOR OFFENCES
  {
    id: 'careless_driving',
    name: 'Careless Driving',
    category: 'major',
    demeritPoints: 6,
    fineRange: { min: 490, max: 2000 },
    insuranceImpactPercent: 75,
    serviceFee: 999,
    typicalCourtAppearances: 2,
    successRate: { withdrawn: 15, reduced: 45, convicted: 40 },
    notes: 'Serious charge. Often reduced to minor offence with proper defence.',
  },
  {
    id: 'distracted_driving',
    name: 'Distracted Driving (Cell Phone)',
    category: 'major',
    demeritPoints: 3,
    fineRange: { min: 615, max: 1000 },
    insuranceImpactPercent: 35,
    serviceFee: 549,
    typicalCourtAppearances: 1,
    successRate: { withdrawn: 20, reduced: 40, convicted: 40 },
    notes: 'Common charge. Defence often focuses on whether device was "in use".',
  },
  {
    id: 'no_insurance',
    name: 'Operating Without Insurance',
    category: 'major',
    demeritPoints: 0,
    fineRange: { min: 5000, max: 25000 },
    insuranceImpactPercent: 50,
    serviceFee: 799,
    typicalCourtAppearances: 1,
    successRate: { withdrawn: 30, reduced: 35, convicted: 35 },
    notes: 'Massive fines but NO demerit points. Often reduced if insurance obtained.',
  },
  {
    id: 'drive_suspended',
    name: 'Driving While Suspended',
    category: 'major',
    demeritPoints: 6,
    fineRange: { min: 1000, max: 5000 },
    insuranceImpactPercent: 100,
    serviceFee: 999,
    typicalCourtAppearances: 2,
    successRate: { withdrawn: 10, reduced: 30, convicted: 60 },
    notes: 'Serious offence. Can result in vehicle impoundment. Requires strong defence.',
  },
  {
    id: 'stunt_driving',
    name: 'Stunt Driving / Racing',
    category: 'major',
    demeritPoints: 6,
    fineRange: { min: 2000, max: 10000 },
    insuranceImpactPercent: 100,
    serviceFee: 1499,
    typicalCourtAppearances: 2,
    successRate: { withdrawn: 10, reduced: 35, convicted: 55 },
    notes: 'Immediate roadside suspension. Vehicle impounded. Must fight aggressively.',
  },

  // MINOR OFFENCES
  {
    id: 'red_light',
    name: 'Red Light Violation',
    category: 'minor',
    demeritPoints: 3,
    fineRange: { min: 325, max: 500 },
    insuranceImpactPercent: 20,
    serviceFee: 399,
    typicalCourtAppearances: 1,
    successRate: { withdrawn: 25, reduced: 45, convicted: 30 },
    notes: 'Defence often challenges timing of light or visibility conditions.',
  },
  {
    id: 'stop_sign',
    name: 'Fail to Stop at Stop Sign',
    category: 'minor',
    demeritPoints: 3,
    fineRange: { min: 110, max: 150 },
    insuranceImpactPercent: 15,
    serviceFee: 349,
    typicalCourtAppearances: 1,
    successRate: { withdrawn: 30, reduced: 45, convicted: 25 },
    notes: 'Common ticket. Often reduced or withdrawn with clean driving record.',
  },
  {
    id: 'unsafe_lane_change',
    name: 'Unsafe Lane Change',
    category: 'minor',
    demeritPoints: 3,
    fineRange: { min: 110, max: 150 },
    insuranceImpactPercent: 15,
    serviceFee: 349,
    typicalCourtAppearances: 1,
    successRate: { withdrawn: 25, reduced: 50, convicted: 25 },
    notes: 'Subjective charge. Defence challenges officer\'s interpretation.',
  },
  {
    id: 'follow_too_closely',
    name: 'Following Too Closely',
    category: 'minor',
    demeritPoints: 4,
    fineRange: { min: 110, max: 150 },
    insuranceImpactPercent: 18,
    serviceFee: 349,
    typicalCourtAppearances: 1,
    successRate: { withdrawn: 20, reduced: 50, convicted: 30 },
    notes: 'Often issued after accidents. Defence challenges distance measurement.',
  },
  {
    id: 'improper_turn',
    name: 'Improper Turn',
    category: 'minor',
    demeritPoints: 2,
    fineRange: { min: 110, max: 150 },
    insuranceImpactPercent: 10,
    serviceFee: 299,
    typicalCourtAppearances: 1,
    successRate: { withdrawn: 30, reduced: 45, convicted: 25 },
    notes: 'Minor offence. Often reduced to zero points.',
  },
  {
    id: 'seatbelt',
    name: 'Seatbelt Violation',
    category: 'minor',
    demeritPoints: 2,
    fineRange: { min: 240, max: 365 },
    insuranceImpactPercent: 5,
    serviceFee: 249,
    typicalCourtAppearances: 1,
    successRate: { withdrawn: 15, reduced: 40, convicted: 45 },
    notes: 'No demerit points in Ontario. Minor insurance impact.',
  },

  // CRIMINAL-ADJACENT
  {
    id: 'fail_to_remain',
    name: 'Fail to Remain at Accident',
    category: 'criminal_adjacent',
    demeritPoints: 7,
    fineRange: { min: 400, max: 2000 },
    insuranceImpactPercent: 100,
    serviceFee: 1299,
    typicalCourtAppearances: 2,
    successRate: { withdrawn: 15, reduced: 35, convicted: 50 },
    notes: 'Serious charge. Can be criminal if injuries involved. Requires immediate legal help.',
  },
  {
    id: 'fail_to_stop_police',
    name: 'Fail to Stop for Police',
    category: 'criminal_adjacent',
    demeritPoints: 7,
    fineRange: { min: 1000, max: 10000 },
    insuranceImpactPercent: 100,
    serviceFee: 1299,
    typicalCourtAppearances: 2,
    successRate: { withdrawn: 10, reduced: 30, convicted: 60 },
    notes: 'Very serious. Can lead to criminal charges. Immediate consultation required.',
  },
];

export const OFFENCE_CATEGORIES = {
  speeding: 'Speeding Violations',
  major: 'Major Violations',
  minor: 'Minor Violations',
  criminal_adjacent: 'Serious Violations',
};

// ============================================
// SIMULATED EXTRACTION (for testing)
// ============================================

const MOCK_TICKETS: TicketDetails[] = [
  {
    offenceType: 'Speeding 16-29 km/h over',
    offenceId: 'speeding_16_29',
    speed: 78,
    speedLimit: 60,
    fineAmount: 140,
    demeritPoints: 3,
    courtDate: '2026-03-15',
    courtLocation: 'London Provincial Offences Court',
    ticketNumber: 'ON-2026-123456',
  },
  {
    offenceType: 'Speeding 30-49 km/h over',
    offenceId: 'speeding_30_49',
    speed: 142,
    speedLimit: 100,
    fineAmount: 295,
    demeritPoints: 4,
    courtDate: '2026-03-20',
    courtLocation: 'St. Thomas Provincial Offences Court',
    ticketNumber: 'ON-2026-234567',
  },
  {
    offenceType: 'Distracted Driving (Cell Phone)',
    offenceId: 'distracted_driving',
    fineAmount: 615,
    demeritPoints: 3,
    courtDate: '2026-04-01',
    courtLocation: 'London Provincial Offences Court',
    ticketNumber: 'ON-2026-345678',
  },
  {
    offenceType: 'Red Light Violation',
    offenceId: 'red_light',
    fineAmount: 325,
    demeritPoints: 3,
    courtDate: '2026-03-25',
    courtLocation: 'Woodstock Provincial Offences Court',
    ticketNumber: 'ON-2026-456789',
  },
  {
    offenceType: 'Stunt Driving / Racing',
    offenceId: 'stunt_driving',
    speed: 155,
    speedLimit: 100,
    fineAmount: 2000,
    demeritPoints: 6,
    courtDate: '2026-04-10',
    courtLocation: 'London Provincial Offences Court',
    ticketNumber: 'ON-2026-567890',
  },
  {
    offenceType: 'Careless Driving',
    offenceId: 'careless_driving',
    fineAmount: 490,
    demeritPoints: 6,
    courtDate: '2026-04-15',
    courtLocation: 'Stratford Provincial Offences Court',
    ticketNumber: 'ON-2026-678901',
  },
];

// ============================================
// EXTRACTION FUNCTIONS
// ============================================

/**
 * Extract ticket details from an uploaded image
 * Currently simulated - will integrate with Claude API later
 */
export async function extractTicketDetailsFromImage(
  imageBase64: string
): Promise<{ success: boolean; details?: TicketDetails; error?: string }> {
  if (USE_REAL_API) {
    // TODO: Implement real Claude API call
    // const response = await fetch('/api/extract-ticket', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ image: imageBase64 }),
    // });
    // return await response.json();
    return { success: false, error: 'Real API not yet implemented' };
  }

  // SIMULATED: Return a random mock ticket after a delay
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate processing time

  const randomTicket = MOCK_TICKETS[Math.floor(Math.random() * MOCK_TICKETS.length)];
  return {
    success: true,
    details: { ...randomTicket },
  };
}

// ============================================
// QUOTE CALCULATION
// ============================================

/**
 * Calculate a comprehensive quote based on ticket details
 */
export function calculateQuote(ticketDetails: TicketDetails): QuoteResult {
  const offence = OFFENCE_TYPES.find((o) => o.id === ticketDetails.offenceId);

  if (!offence) {
    throw new Error(`Unknown offence type: ${ticketDetails.offenceId}`);
  }

  // Calculate insurance impact (based on Ontario average of ~$250/month)
  const averageMonthlyPremium = 250;
  const monthlyIncrease = Math.round(averageMonthlyPremium * (offence.insuranceImpactPercent / 100));
  const threeYearTotal = monthlyIncrease * 36; // 3 years

  // Calculate break-even analysis
  const ticketFine = ticketDetails.fineAmount || offence.fineRange.min;
  const costToFight = offence.serviceFee;
  const costIfConvicted = ticketFine + threeYearTotal;
  const potentialSavings = costIfConvicted - costToFight;

  // Determine recommendation
  let recommendation: QuoteResult['recommendation'];
  let recommendationReason: string;

  if (offence.category === 'major' || offence.category === 'criminal_adjacent') {
    recommendation = 'strongly_fight';
    recommendationReason = `This is a serious charge with significant consequences including ${offence.demeritPoints} demerit points and potential insurance increases of $${threeYearTotal} over 3 years. Fighting this ticket is strongly recommended.`;
  } else if (threeYearTotal > offence.serviceFee * 2) {
    recommendation = 'fight';
    recommendationReason = `The potential insurance savings of $${threeYearTotal} significantly exceed our service fee of $${offence.serviceFee}. Fighting this ticket makes financial sense.`;
  } else if (offence.successRate.withdrawn + offence.successRate.reduced > 60) {
    recommendation = 'fight';
    recommendationReason = `With a ${offence.successRate.withdrawn + offence.successRate.reduced}% success rate for withdrawal or reduction, fighting this ticket offers good odds of a better outcome.`;
  } else if (potentialSavings > 200) {
    recommendation = 'negotiate';
    recommendationReason = `While the potential savings are moderate, we may be able to negotiate a reduction to minimize the impact on your driving record.`;
  } else {
    recommendation = 'consider_paying';
    recommendationReason = `Based on the fine amount and insurance impact, the cost-benefit of fighting this ticket is marginal. However, keeping demerit points off your record still has value.`;
  }

  // Estimate timeline
  const estimatedTimeline =
    offence.typicalCourtAppearances === 1
      ? '2-4 months from today'
      : '4-8 months (multiple court appearances may be required)';

  return {
    ticketDetails,
    offence,
    serviceFee: offence.serviceFee,
    estimatedInsuranceImpact: {
      monthlyIncrease,
      threeYearTotal,
    },
    breakEvenAnalysis: {
      costToFight,
      costIfConvicted,
      potentialSavings,
    },
    recommendation,
    recommendationReason,
    estimatedTimeline,
    disclaimer:
      'This quote is an estimate based on typical outcomes and average Ontario insurance rates. Actual results may vary based on your specific circumstances, driving history, and court location. Insurance impact estimates are based on an average monthly premium of $250.',
  };
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get the speeding offence based on km/h over the limit
 */
export function detectSpeedingOffence(kmOverLimit: number): OffenceType | undefined {
  if (kmOverLimit >= 50) return OFFENCE_TYPES.find((o) => o.id === 'speeding_50_plus');
  if (kmOverLimit >= 30) return OFFENCE_TYPES.find((o) => o.id === 'speeding_30_49');
  if (kmOverLimit >= 16) return OFFENCE_TYPES.find((o) => o.id === 'speeding_16_29');
  if (kmOverLimit >= 1) return OFFENCE_TYPES.find((o) => o.id === 'speeding_1_15');
  return undefined;
}

/**
 * Get all offences grouped by category
 */
export function getOffencesByCategory(): Record<string, OffenceType[]> {
  const grouped: Record<string, OffenceType[]> = {};

  for (const offence of OFFENCE_TYPES) {
    if (!grouped[offence.category]) {
      grouped[offence.category] = [];
    }
    grouped[offence.category].push(offence);
  }

  return grouped;
}

/**
 * Get all offences as a flat list
 */
export function getAllOffences(): OffenceType[] {
  return OFFENCE_TYPES;
}

/**
 * Get a single offence by ID
 */
export function getOffenceById(id: string): OffenceType | undefined {
  return OFFENCE_TYPES.find((o) => o.id === id);
}
