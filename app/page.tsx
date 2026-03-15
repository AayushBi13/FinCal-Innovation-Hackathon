import { Disclaimer } from '@/components/Disclaimer';
import { SIPCalculator } from '@/components/SIPCalculator';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-surface text-ink">
      <section className="relative overflow-hidden border-b border-brandBlue/10 bg-hero-grid">
        <div className="mx-auto w-full px-4 py-12 sm:px-6 lg:px-10 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brandRed">
                FinCal Innovation Hackathon x HDFC Mutual Fund
              </p>
              <div className="space-y-4">
                <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-brandBlue sm:text-5xl lg:text-6xl">
                  SIP Calculator for investors who want a clearer long-term view.
                </h1>
                <p className="max-w-4xl text-base leading-7 text-slate-700 sm:text-lg">
                  This calculator helps you estimate how a fixed monthly SIP could grow over time when paired with an assumed annual rate of return. It is designed to make the core planning questions easier to understand without overwhelming the page.
                </p>
                <p className="max-w-4xl text-base leading-7 text-slate-700 sm:text-lg">
                  Start with the amount you may invest each month, choose an annual return assumption, and review how the projected corpus, total contribution, and estimated gain change across the investment period.
                </p>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-brandBlue/10 bg-white/85 p-5 shadow-sm backdrop-blur sm:p-6">
              <h2 className="text-xl font-bold text-brandBlue">Quick Start Guide</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-brandGrey">Purpose</p>
                  <p className="mt-1 text-base font-semibold text-ink">Illustrative SIP planning</p>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-brandGrey">Best Used For</p>
                  <p className="mt-1 text-base font-semibold text-ink">Comparing contribution and time scenarios</p>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-brandGrey">Remember</p>
                  <p className="mt-1 text-base font-semibold text-ink">All values below are projected illustrations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <SIPCalculator />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
        <Disclaimer />
      </section>
    </main>
  );
}
