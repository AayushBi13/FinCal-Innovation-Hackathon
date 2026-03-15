import type { SIPYearlyBreakdown } from '@/types/sip';

type BreakdownTableProps = {
  rows: SIPYearlyBreakdown[];
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function BreakdownTable({ rows }: BreakdownTableProps) {
  return (
    <section aria-labelledby="breakdown-heading" className="rounded-[2rem] border border-brandBlue/10 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="breakdown-heading" className="text-2xl font-bold text-brandBlue">
            Year-by-year projected breakdown
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Illustrative values based on fixed monthly investments and a constant annual return assumption.
          </p>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
        <div className="max-h-[26rem] overflow-auto">
          <table className="min-w-full border-collapse text-left">
            <thead className="sticky top-0 bg-mist text-sm font-semibold text-brandBlue">
              <tr>
                <th scope="col" className="px-4 py-3">Year</th>
                <th scope="col" className="px-4 py-3">Amount Invested</th>
                <th scope="col" className="px-4 py-3">Estimated Value</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.year} className="border-t border-slate-200 text-sm text-slate-700 even:bg-slate-50/60">
                  <th scope="row" className="px-4 py-3 font-semibold text-ink">
                    {row.year}
                  </th>
                  <td className="px-4 py-3">{formatCurrency(row.totalInvested)}</td>
                  <td className="px-4 py-3">{formatCurrency(row.estimatedValue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
