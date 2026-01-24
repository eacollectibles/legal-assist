/**
 * Ticket Quote Service
 * Handles pricing calculations and offence data for traffic ticket quotes
 * Currently uses SIMULATED AI extraction - replace with real API later
 */

export interface OffenceType {
  id: string;
  name: string;
  category: 'speeding' | 'major' | 'minor' | 'criminal_adjacent';
  demeritPoints: number;
  typicalFineRange: [number, number];
  insuranceImpactPercent: [number, number];
  insuranceImpactDescription: string;
  serviceFee: number;
  courtAppearances: number;
  successRate: {
    withdrawn: number;
    reduced: number;
    convicted: number;
  };
  notes: string;
}

export interface TicketDetails {
  offenceType: string;
  offenceDescription?: string;
  speedLimit?: number;
  allegedSpeed?: number;
  speedOver?: number;
  fineAmount?: number;
  courtLocation?: string;
  courtDate?: string;
  ticketNumber?: string;
  dateOfOffence?: string;
  location?: string;
}

export interface QuoteResult {
  offence: OffenceType;
  ticketDetails: TicketDetails;
  serviceFee: number;
  estimatedInsuranceIncrease: {
    monthly: [number, number];
    threeYear: [number, number];
  };
  breakEvenAnalysis: {
    worthFighting: boolean;
    reasoning: string;
    potentialSavings: [number, number];
  };
  recommendation: 'fight' | 'negotiate' | 'consider_paying' | 'strongly_fight';
  recommendationReason: string;
  timeline: string;
  disclaimer: string;
}

// ============================================
// OFFENCE DATABASE WITH TEST PRICING
// ============================================

export const OFFENCE_TYPES: Record<string, OffenceType> = {
  // SPEEDING OFFENCES
  'speeding_0_15': {
    id: 'speeding_0_15',
    name: 'Speeding 1-15 km/h Over',
    category: 'speeding',
    demeritPoints: 0,
    typicalFineRange: [40, 75],
    insuranceImpactPercent: [0, 5],
    insuranceImpactDescription: 'Minimal or no impact',
    serviceFee: 199,
    courtAppearances: 1,
    successRate: { withdrawn: 25, reduced: 50, convicted: 25 },
    notes: 'Often not worth fighting unless you need a clean record for employment'
  },
  'speeding_16_29': {
    id: 'speeding_16_29',
    name: 'Speeding 16-29 km/h Over',
    category: 'speeding',
    demeritPoints: 3,
    typicalFineRange: [95, 180],
    insuranceImpactPercent: [15, 25],
    insuranceImpactDescription: 'Moderate increase - typically 15-25%',
    serviceFee: 349,
    courtAppearances: 1,
    successRate: { withdrawn: 20, reduced: 55, convicted: 25 },
    notes: 'Most common ticket - usually worth fighting due to insurance impact'
  },
  'speeding_30_49': {
    id: 'speeding_30_49',
    name: 'Speeding 30-49 km/h Over',
    category: 'speeding',
    demeritPoints: 4,
    typicalFineRange: [190, 380],
    insuranceImpactPercent: [25, 40],
    insuranceImpactDescription: 'Significant increase - typically 25-40%',
    serviceFee: 449,
    courtAppearances: 1,
    successRate: { withdrawn: 15, reduced: 60, convicted: 25 },
    notes: 'Serious ticket - strongly consider fighting'
  },
  'stunt_driving': {
    id: 'stunt_driving',
    name: 'Stunt Driving (50+ km/h Over)',
    category: 'major',
    demeritPoints: 6,
    typicalFineRange: [2000, 10000],
    insuranceImpactPercent: [50, 100],
    insuranceImpactDescription: 'Severe - 50%+ increase or policy cancellation',
    serviceFee: 1499,
    courtAppearances: 2,
    successRate: { withdrawn: 12, reduced: 35, convicted: 53 },
    notes: 'Immediate licence suspension and vehicle impound. Very serious - always fight'
  },
  'careless_driving': {
    id: 'careless_driving',
    name: 'Careless Driving',
    category: 'major',
    demeritPoints: 6,
    typicalFineRange: [490, 2000],
    insuranceImpactPercent: [50, 100],
    insuranceImpactDescription: 'Severe - possible policy cancellation',
    serviceFee: 999,
    courtAppearances: 2,
    successRate: { withdrawn: 12, reduced: 55, convicted: 33 },
    notes: 'One of the most serious non-criminal offences. Often reduced to lesser charge.'
  },
  'distracted_driving': {
    id: 'distracted_driving',
    name: 'Distracted Driving (Cell Phone)',
    category: 'major',
    demeritPoints: 3,
    typicalFineRange: [615, 1000],
    insuranceImpactPercent: [25, 40],
    insuranceImpactDescription: 'High impact - insurers treat this seriously',
    serviceFee: 449,
    courtAppearances: 1,
    successRate: { withdrawn: 15, reduced: 50, convicted: 35 },
    notes: 'Insurers view this as high-risk behaviour. Worth fighting.'
  },
  'red_light': {
    id: 'red_light',
    name: 'Red Light Violation',
    category: 'minor',
    demeritPoints: 3,
    typicalFineRange: [260, 500],
    insuranceImpactPercent: [15, 25],
    insuranceImpactDescription: 'Moderate increase',
    serviceFee: 349,
    courtAppearances: 1,
    successRate: { withdrawn: 15, reduced: 55, convicted: 30 },
    notes: 'Camera tickets have NO demerit points - officer-issued tickets do'
  },
  'red_light_camera': {
    id: 'red_light_camera',
    name: 'Red Light Camera',
    category: 'minor',
    demeritPoints: 0,
    typicalFineRange: [325, 325],
    insuranceImpactPercent: [0, 0],
    insuranceImpactDescription: 'No insurance impact - registered to vehicle not driver',
    serviceFee: 199,
    courtAppearances: 1,
    successRate: { withdrawn: 10, reduced: 30, convicted: 60 },
    notes: 'No demerit points. Registered owner liable. May not be worth fighting.'
  },
  'stop_sign': {
    id: 'stop_sign',
    name: 'Fail to Stop at Stop Sign',
    category: 'minor',
    demeritPoints: 3,
    typicalFineRange: [85, 200],
    insuranceImpactPercent: [15, 25],
    insuranceImpactDescription: 'Moderate increase',
    serviceFee: 299,
    courtAppearances: 1,
    successRate: { withdrawn: 15, reduced: 55, convicted: 30 },
    notes: 'Often comes down to officer vantage point and intersection conditions'
  },
  'follow_too_closely': {
    id: 'follow_too_closely',
    name: 'Follow Too Closely',
    category: 'minor',
    demeritPoints: 4,
    typicalFineRange: [85, 200],
    insuranceImpactPercent: [15, 25],
    insuranceImpactDescription: 'Moderate increase',
    serviceFee: 349,
    courtAppearances: 1,
    successRate: { withdrawn: 20, reduced: 50, convicted: 30 },
    notes: 'Often issued after collisions. Challenging but possible.'
  },
  'fail_to_yield': {
    id: 'fail_to_yield',
    name: 'Fail to Yield',
    category: 'minor',
    demeritPoints: 3,
    typicalFineRange: [85, 200],
    insuranceImpactPercent: [15, 25],
    insuranceImpactDescription: 'Moderate increase',
    serviceFee: 299,
    courtAppearances: 1,
    successRate: { withdrawn: 15, reduced: 55, convicted: 30 },
    notes: 'Depends heavily on intersection conditions and witness accounts'
  },
  'unsafe_lane_change': {
    id: 'unsafe_lane_change',
    name: 'Unsafe Lane Change',
    category: 'minor',
    demeritPoints: 3,
    typicalFineRange: [85, 200],
    insuranceImpactPercent: [15, 25],
    insuranceImpactDescription: 'Moderate increase',
    serviceFee: 299,
    courtAppearances: 1,
    successRate: { withdrawn: 20, reduced: 50, convicted: 30 },
    notes: 'Often issued after accidents - fight if you dispute fault'
  },
  'improper_turn': {
    id: 'improper_turn',
    name: 'Improper Turn',
    category: 'minor',
    demeritPoints: 2,
    typicalFineRange: [85, 150],
    insuranceImpactPercent: [10, 20],
    insuranceImpactDescription: 'Low to moderate increase',
    serviceFee: 249,
    courtAppearances: 1,
    successRate: { withdrawn: 20, reduced: 55, convicted: 25 },
    notes: 'Includes illegal U-turns, wrong-way turns, etc.'
  },
  'seatbelt': {
    id: 'seatbelt',
    name: 'Seatbelt Violation',
    category: 'minor',
    demeritPoints: 2,
    typicalFineRange: [200, 305],
    insuranceImpactPercent: [10, 15],
    insuranceImpactDescription: 'Low to moderate increase',
    serviceFee: 249,
    courtAppearances: 1,
    successRate: { withdrawn: 15, reduced: 45, convicted: 40 },
    notes: 'Difficult to fight unless procedural issues exist'
  },
  'no_insurance': {
    id: 'no_insurance',
    name: 'No Insurance (CAIA)',
    category: 'major',
    demeritPoints: 0,
    typicalFineRange: [5000, 25000],
    insuranceImpactPercent: [100, 200],
    insuranceImpactDescription: 'Extreme - may be uninsurable for years',
    serviceFee: 999,
    courtAppearances: 2,
    successRate: { withdrawn: 25, reduced: 40, convicted: 35 },
    notes: 'Massive fines but often defensible if you actually had insurance'
  },
  'driving_suspended': {
    id: 'driving_suspended',
    name: 'Driving While Suspended',
    category: 'major',
    demeritPoints: 6,
    typicalFineRange: [1000, 5000],
    insuranceImpactPercent: [50, 100],
    insuranceImpactDescription: 'Severe - possible policy cancellation',
    serviceFee: 799,
    courtAppearances: 2,
    successRate: { withdrawn: 15, reduced: 35, convicted: 50 },
    notes: 'Serious offence - defence depends on knowledge of suspension'
  },
  'fail_to_remain': {
    id: 'fail_to_remain',
    name: 'Fail to Remain at Accident',
    category: 'criminal_adjacent',
    demeritPoints: 7,
    typicalFineRange: [400, 2000],
    insuranceImpactPercent: [75, 150],
    insuranceImpactDescription: 'Very severe - likely policy issues',
    serviceFee: 999,
    courtAppearances: 2,
    successRate: { withdrawn: 10, reduced: 30, convicted: 60 },
    notes: 'Can also be criminal charge. POA version for minor incidents.'
  },
  'racing': {
    id: 'racing',
    name: 'Street Racing',
    category: 'major',
    demeritPoints: 6,
    typicalFineRange: [2000, 10000],
    insuranceImpactPercent: [75, 150],
    insuranceImpactDescription: 'Very severe - likely policy cancellation',
    serviceFee: 1499,
    courtAppearances: 2,
    successRate: { withdrawn: 10, reduced: 30, convicted: 60 },
    notes: 'Similar penalties to stunt driving. Always fight.'
  },
  'novice_violation': {
    id: 'novice_violation',
    name: 'G1/G2 Licence Violation',
    category: 'minor',
    demeritPoints: 0,
    typicalFineRange: [85, 200],
    insuranceImpactPercent: [15, 30],
    insuranceImpactDescription: 'Moderate - can affect licence progression',
    serviceFee: 299,
    courtAppearances: 1,
    successRate: { withdrawn: 20, reduced: 50, convicted: 30 },
    notes: 'Includes passenger limits, BAC restrictions, highway restrictions'
  },
  'other': {
    id: 'other',
    name: 'Other Traffic Offence',
    category: 'minor',
    demeritPoints: 0,
    typicalFineRange: [85, 500],
    insuranceImpactPercent: [0, 25],
    insuranceImpactDescription: 'Varies by offence',
    serviceFee: 349,
    courtAppearances: 1,
    successRate: { withdrawn: 20, reduced: 50, convicted: 30 },
    notes: 'Contact us for a specific assessment'
  }
};

// Average monthly insurance premium for calculations
const AVERAGE_MONTHLY_PREMIUM = 250;

// ============================================
// SIMULATED AI TICKET EXTRACTION
// ============================================

export async function extractTicketDetailsFromImage(imageFile: File): Promise<TicketDetails> {
  // Simulate processing delay (1.5-2.5 seconds)
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
  
  // SIMULATED RESPONSES - Returns random realistic ticket data
  const simulatedTickets: TicketDetails[] = [
    {
      offenceType: 'speeding_16_29',
      offenceDescription: 'Speeding - exceed limit by 16-29 km/h',
      speedLimit: 80,
      allegedSpeed: 102,
      speedOver: 22,
      fineAmount: 95,
      courtLocation: 'London POA Court',
      courtDate: '2025-03-15',
      ticketNumber: 'ON-2025-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      dateOfOffence: '2025-01-10',
      location: 'Highway 401 WB, near Wellington Rd'
    },
    {
      offenceType: 'speeding_30_49',
      offenceDescription: 'Speeding - exceed limit by 30-49 km/h',
      speedLimit: 60,
      allegedSpeed: 98,
      speedOver: 38,
      fineAmount: 295,
      courtLocation: 'London POA Court',
      courtDate: '2025-03-20',
      ticketNumber: 'ON-2025-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      dateOfOffence: '2025-01-12',
      location: 'Dundas St E, near Highbury Ave'
    },
    {
      offenceType: 'distracted_driving',
      offenceDescription: 'Drive - hand-held communication device',
      fineAmount: 615,
      courtLocation: 'London POA Court',
      courtDate: '2025-04-05',
      ticketNumber: 'ON-2025-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      dateOfOffence: '2025-01-08',
      location: 'Oxford St W, near Wonderland Rd'
    },
    {
      offenceType: 'red_light',
      offenceDescription: 'Fail to stop - red light',
      fineAmount: 325,
      courtLocation: 'London POA Court',
      courtDate: '2025-03-28',
      ticketNumber: 'ON-2025-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      dateOfOffence: '2025-01-15',
      location: 'Richmond St at Oxford St'
    },
    {
      offenceType: 'stunt_driving',
      offenceDescription: 'Stunt driving - 50 km/h or more over posted limit',
      speedLimit: 100,
      allegedSpeed: 158,
      speedOver: 58,
      fineAmount: 2000,
      courtLocation: 'London POA Court',
      courtDate: '2025-04-15',
      ticketNumber: 'ON-2025-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      dateOfOffence: '2025-01-20',
      location: 'Highway 402 WB, near Airport Rd'
    },
    {
      offenceType: 'careless_driving',
      offenceDescription: 'Careless driving',
      fineAmount: 490,
      courtLocation: 'London POA Court',
      courtDate: '2025-04-22',
      ticketNumber: 'ON-2025-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      dateOfOffence: '2025-01-18',
      location: 'Wharncliffe Rd at Oxford St'
    }
  ];
  
  // Return a random simulated ticket
  return simulatedTickets[Math.floor(Math.random() * simulatedTickets.length)];
}

// ============================================
// QUOTE CALCULATION ENGINE
// ============================================

export function calculateQuote(ticketDetails: TicketDetails): QuoteResult {
  const offence = OFFENCE_TYPES[ticketDetails.offenceType] || OFFENCE_TYPES['other'];
  
  // Calculate insurance impact based on average premium
  const monthlyIncreaseLow = Math.round(AVERAGE_MONTHLY_PREMIUM * (offence.insuranceImpactPercent[0] / 100));
  const monthlyIncreaseHigh = Math.round(AVERAGE_MONTHLY_PREMIUM * (offence.insuranceImpactPercent[1] / 100));
  
  const threeYearLow = monthlyIncreaseLow * 36;
  const threeYearHigh = monthlyIncreaseHigh * 36;
  
  // Determine if fighting is worth it
  const potentialSavingsLow = threeYearLow - offence.serviceFee;
  const potentialSavingsHigh = threeYearHigh - offence.serviceFee;
  
  const worthFighting = potentialSavingsLow > 0 || offence.demeritPoints >= 4;
  
  // Determine recommendation
  let recommendation: QuoteResult['recommendation'];
  let recommendationReason: string;
  
  if (offence.category === 'major' || offence.category === 'criminal_adjacent') {
    recommendation = 'strongly_fight';
    recommendationReason = `This is a serious offence with ${offence.demeritPoints} demerit points. The insurance and licensing consequences make fighting essential.`;
  } else if (offence.demeritPoints >= 3 && potentialSavingsLow > 200) {
    recommendation = 'fight';
    recommendationReason = `With ${offence.demeritPoints} demerit points, your insurance could increase by $${threeYearLow.toLocaleString()}-$${threeYearHigh.toLocaleString()} over 3 years. Fighting is likely worth the investment.`;
  } else if (offence.demeritPoints > 0) {
    recommendation = 'negotiate';
    recommendationReason = `This ticket carries ${offence.demeritPoints} demerit points. A reduction to a zero-point offence could save you hundreds in insurance costs.`;
  } else if (offence.demeritPoints === 0 && offence.serviceFee > (ticketDetails.fineAmount || 0) * 1.5) {
    recommendation = 'consider_paying';
    recommendationReason = `With no demerit points, the insurance impact is minimal. Fighting may cost more than the potential benefit, unless you need a clean record.`;
  } else {
    recommendation = 'negotiate';
    recommendationReason = `Let's review the specifics to see if we can get this reduced or withdrawn.`;
  }
  
  // Build reasoning for break-even analysis
  let breakEvenReasoning: string;
  if (potentialSavingsLow > 500) {
    breakEvenReasoning = `Even in a conservative scenario, you could save $${potentialSavingsLow.toLocaleString()}+ over three years by fighting this ticket.`;
  } else if (potentialSavingsLow > 0) {
    breakEvenReasoning = `Fighting this ticket could save you $${potentialSavingsLow.toLocaleString()}-$${potentialSavingsHigh.toLocaleString()} over three years in avoided insurance increases.`;
  } else if (offence.demeritPoints > 0) {
    breakEvenReasoning = `While the direct savings may be modest, keeping ${offence.demeritPoints} demerit points off your record protects your licence and future insurability.`;
  } else {
    breakEvenReasoning = `The direct financial benefit may be limited, but there may be other reasons to fight (employment, professional licence, clean record).`;
  }
  
  return {
    offence,
    ticketDetails,
    serviceFee: offence.serviceFee,
    estimatedInsuranceIncrease: {
      monthly: [monthlyIncreaseLow, monthlyIncreaseHigh],
      threeYear: [threeYearLow, threeYearHigh]
    },
    breakEvenAnalysis: {
      worthFighting,
      reasoning: breakEvenReasoning,
      potentialSavings: [potentialSavingsLow, potentialSavingsHigh]
    },
    recommendation,
    recommendationReason,
    timeline: offence.courtAppearances === 1 
      ? '3-6 months typical resolution' 
      : '4-8 months typical resolution',
    disclaimer: 'This quote is an estimate based on typical cases. Actual outcomes depend on the specific facts of your case. Insurance impact estimates are based on an average $250/month policy and may vary by insurer.'
  };
}

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getOffenceCategories(): { id: string; label: string; offences: OffenceType[] }[] {
  return [
    {
      id: 'speeding',
      label: 'Speeding Offences',
      offences: Object.values(OFFENCE_TYPES).filter(o => o.category === 'speeding')
    },
    {
      id: 'major',
      label: 'Major Offences',
      offences: Object.values(OFFENCE_TYPES).filter(o => o.category === 'major' || o.category === 'criminal_adjacent')
    },
    {
      id: 'minor',
      label: 'Other Traffic Offences',
      offences: Object.values(OFFENCE_TYPES).filter(o => o.category === 'minor')
    }
  ];
}

export function detectSpeedingCategory(speedOver: number): string {
  if (speedOver >= 50) return 'stunt_driving';
  if (speedOver >= 30) return 'speeding_30_49';
  if (speedOver >= 16) return 'speeding_16_29';
  return 'speeding_0_15';
}

export function getAllOffences(): OffenceType[] {
  return Object.values(OFFENCE_TYPES);
}

export function getOffenceById(id: string): OffenceType | undefined {
  return OFFENCE_TYPES[id];
}
