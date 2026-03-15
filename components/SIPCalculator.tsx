'use client';

import { useCallback, useMemo, useState } from 'react';

import { BreakdownTable } from '@/components/BreakdownTable';
import { GrowthChart } from '@/components/GrowthChart';
import { InputSlider } from '@/components/InputSlider';
import { ResultCard } from '@/components/ResultCard';
import { calculateSIP } from '@/lib/sipCalculator';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [annualRate, setAnnualRate] = useState(12);
  const [years, setYears] = useState(15);

  const result = useMemo(
    () => calculateSIP(monthlyInvestment, annualRate, years),
    [annualRate, monthlyInvestment, years],
  );

  const handleMonthlyInvestment = useCallback((value: number) => {
    setMonthlyInvestment(Math.round(value));
  }, []);

  const handleAnnualRate = useCallback((value: number) => {
    setAnnualRate(Number(value.toFixed(2)));
  }, []);

  const handleYears = useCallback((value: number) => {
    setYears(Math.round(value));
  }, []);

  const liveSummary = useMemo(
    () =>
      `Estimated future value ${formatCurrency(result.futureValue)}. Projected amount invested over term ${formatCurrency(
        result.totalInvested,
      )}. Estimated returns ${formatCurrency(result.estimatedReturns)}.`,
    [result.estimatedReturns, result.futureValue, result.totalInvested],
  );

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-brandBlue/10 bg-white p-5 shadow-panel sm:p-6 lg:p-8">
        <div className="sr-only" aria-live="polite">
          {liveSummary}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brandRed">SIP Calculator</p>
            <h2 className="text-3xl font-bold text-brandBlue">Set your assumptions with confidence.</h2>
            <p className="text-sm leading-7 text-slate-600 sm:text-base">
              Each input below influences the final projection in a different way. A higher monthly SIP increases the total contribution, a higher assumed return changes the growth pace, and a longer horizon gives compounding more time to work.
            </p>
          </div>

          <div className="rounded-[1.25rem] border border-brandBlue/10 bg-mist/60 p-4 sm:p-5">
            <h3 className="text-lg font-semibold text-brandBlue">How investors can use this calculator</h3>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
              <li>Test whether your current monthly SIP is aligned with a long-term target.</li>
              <li>Compare different investment durations before increasing your contribution.</li>
              <li>Understand how much of the projected corpus comes from your own investment versus estimated growth.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <InputSlider
            id="monthly-investment"
            label="Monthly Investment Amount"
            min={500}
            max={100000}
            step={500}
            value={monthlyInvestment}
            onChange={handleMonthlyInvestment}
            unit="₹"
          />
          <InputSlider
            id="annual-rate"
            label="Assumed Annual Rate of Return"
            min={1}
            max={30}
            step={0.1}
            value={annualRate}
            onChange={handleAnnualRate}
            unit="%"
          />
          <InputSlider
            id="investment-duration"
            label="Investment Duration in Years"
            min={1}
            max={40}
            step={1}
            value={years}
            onChange={handleYears}
            unit="years"
          />
        </div>

        <section aria-labelledby="results-heading" className="mt-8 rounded-[1.5rem] border border-brandBlue/10 bg-white p-4 sm:p-5">
          <div className="flex flex-col gap-2">
            <h2 id="results-heading" className="text-3xl font-bold text-brandBlue">
              Estimated outcomes
            </h2>
            <p className="text-sm leading-7 text-slate-600 sm:text-base">
              These figures are projected illustrations using your selected contribution, annual return, and duration.
            </p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            <ResultCard
              label="Estimated Future Value"
              value={formatCurrency(result.futureValue)}
              detail="Projected corpus at the end of the selected term."
              tone="blue"
            />
            <ResultCard
              label="Projected Amount Invested Over Term"
              value={formatCurrency(result.totalInvested)}
              detail="Monthly contribution multiplied by total months invested."
              tone="neutral"
            />
            <ResultCard
              label="Estimated Returns"
              value={formatCurrency(result.estimatedReturns)}
              detail="Illustrative gain over the total amount invested."
              tone="red"
            />
          </div>

          <div className="mt-6 rounded-[1.25rem] border border-brandBlue/10 bg-slate-50 p-4 sm:p-5">
            <h3 className="text-lg font-semibold text-brandBlue">How to read these projected values</h3>
            <div className="mt-3 space-y-3 text-sm leading-7 text-slate-700">
              <p>
                Estimated future value is the total projected corpus at the end of the selected period if the SIP continues every month and the assumed return remains constant.
              </p>
              <p>
                Projected amount invested over term is the money you contribute yourself. Estimated returns represent the portion of the projected corpus that comes from the assumed growth rate, not from guaranteed performance.
              </p>
            </div>
          </div>
        </section>
      </section>

      <GrowthChart breakdown={result.yearlyBreakdown} />

      <section className="rounded-[2rem] border border-brandBlue/10 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-[1.5rem] bg-slate-50 p-4">
            <h3 className="text-base font-semibold text-brandBlue">Monthly Investment</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              This is the fixed SIP amount contributed every month. Raising it has a direct and immediate impact on the total money invested.
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-slate-50 p-4">
            <h3 className="text-base font-semibold text-brandBlue">Assumed Return</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              This is only an illustration of annual growth. It helps compare scenarios, but actual market-linked returns can be higher or lower.
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-slate-50 p-4">
            <h3 className="text-base font-semibold text-brandBlue">Investment Duration</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              A longer horizon gives more time for compounding. Even without increasing the SIP, time can materially change the projected corpus.
            </p>
          </div>
        </div>
      </section>

      <div>
        <BreakdownTable rows={result.yearlyBreakdown} />
      </div>
    </div>
  );
}
