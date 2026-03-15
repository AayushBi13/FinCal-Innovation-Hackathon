export interface SIPYearlyBreakdown {
  year: number;
  totalInvested: number;
  estimatedValue: number;
}

export interface SIPResult {
  futureValue: number;
  totalInvested: number;
  estimatedReturns: number;
  yearlyBreakdown: SIPYearlyBreakdown[];
}
