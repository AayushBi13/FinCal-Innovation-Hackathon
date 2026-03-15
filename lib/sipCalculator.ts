import type { SIPResult, SIPYearlyBreakdown } from '@/types/sip';

function calculateFutureValue(monthly: number, annualRate: number, months: number) {
  const monthlyRate = annualRate / 12 / 100;

  if (monthlyRate === 0) {
    return monthly * months;
  }

  return monthly * (((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate);
}

export function calculateSIP(monthly: number, annualRate: number, years: number): SIPResult {
  const totalMonths = years * 12;
  const futureValue = calculateFutureValue(monthly, annualRate, totalMonths);
  const totalInvested = monthly * totalMonths;
  const estimatedReturns = futureValue - totalInvested;

  const yearlyBreakdown: SIPYearlyBreakdown[] = Array.from({ length: years }, (_, index) => {
    const year = index + 1;
    const months = year * 12;
    const estimatedValue = calculateFutureValue(monthly, annualRate, months);

    return {
      year,
      totalInvested: monthly * months,
      estimatedValue,
    };
  });

  return {
    futureValue,
    totalInvested,
    estimatedReturns,
    yearlyBreakdown,
  };
}
