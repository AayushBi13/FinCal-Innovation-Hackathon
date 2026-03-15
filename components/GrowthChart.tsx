'use client';

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from 'chart.js';
import { useMemo, useState } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

import type { SIPYearlyBreakdown } from '@/types/sip';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Title,
  Tooltip,
  Legend,
);

type GrowthChartProps = {
  breakdown: SIPYearlyBreakdown[];
};

type ChartView = 'bar' | 'line' | 'doughnut';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
    notation: value >= 100000 ? 'compact' : 'standard',
  }).format(value);
}

export function GrowthChart({ breakdown }: GrowthChartProps) {
  const [activeView, setActiveView] = useState<ChartView>('bar');

  const chartData = useMemo<ChartData<'bar'>>(
    () => ({
      labels: breakdown.map((entry) => `Year ${entry.year}`),
      datasets: [
        {
          label: 'Amount Invested',
          data: breakdown.map((entry) => entry.totalInvested),
          backgroundColor: '#224c87',
          borderRadius: 10,
          stack: 'corpus',
        },
        {
          label: 'Estimated Returns',
          data: breakdown.map((entry) => Math.max(entry.estimatedValue - entry.totalInvested, 0)),
          backgroundColor: '#da3832',
          borderRadius: 10,
          stack: 'corpus',
        },
      ],
    }),
    [breakdown],
  );

  const trendLineData = useMemo<ChartData<'line'>>(
    () => ({
      labels: breakdown.map((entry) => `Year ${entry.year}`),
      datasets: [
        {
          label: 'Estimated Corpus',
          data: breakdown.map((entry) => entry.estimatedValue),
          borderColor: '#224c87',
          backgroundColor: 'rgba(34, 76, 135, 0.14)',
          tension: 0.28,
          fill: true,
          pointRadius: 2,
          pointHoverRadius: 4,
        },
        {
          label: 'Amount Invested',
          data: breakdown.map((entry) => entry.totalInvested),
          borderColor: '#da3832',
          backgroundColor: 'rgba(218, 56, 50, 0.08)',
          borderDash: [6, 4],
          tension: 0.2,
          fill: false,
          pointRadius: 2,
          pointHoverRadius: 4,
        },
      ],
    }),
    [breakdown],
  );

  const latestYear = breakdown[breakdown.length - 1];
  const finalInvested = latestYear?.totalInvested ?? 0;
  const finalEstimatedReturns = Math.max((latestYear?.estimatedValue ?? 0) - finalInvested, 0);

  const compositionData = useMemo<ChartData<'doughnut'>>(
    () => ({
      labels: ['Amount Invested', 'Estimated Returns'],
      datasets: [
        {
          data: [finalInvested, finalEstimatedReturns],
          backgroundColor: ['#224c87', '#da3832'],
          borderColor: ['#ffffff', '#ffffff'],
          borderWidth: 2,
        },
      ],
    }),
    [finalEstimatedReturns, finalInvested],
  );

  const chartOptions = useMemo<ChartOptions<'bar'>>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#10233f',
            font: {
              family: 'Montserrat, Arial, Verdana, sans-serif',
              size: 12,
              weight: 600,
            },
          },
        },
        title: {
          display: true,
          text: 'Illustrative Corpus Growth',
          color: '#224c87',
          font: {
            family: 'Montserrat, Arial, Verdana, sans-serif',
            size: 18,
            weight: 700,
          },
          padding: {
            bottom: 16,
          },
        },
        tooltip: {
          callbacks: {
            label(context) {
              return `${context.dataset.label}: ${formatCurrency(context.parsed.y ?? 0)}`;
            },
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: '#334155',
            font: {
              family: 'Montserrat, Arial, Verdana, sans-serif',
            },
          },
          grid: {
            display: false,
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: '#334155',
            callback(value) {
              return formatCurrency(Number(value));
            },
            font: {
              family: 'Montserrat, Arial, Verdana, sans-serif',
            },
          },
          title: {
            display: false,
          },
          grid: {
            color: 'rgba(145, 144, 144, 0.22)',
          },
        },
      },
    }),
    [],
  );

  const lineOptions = useMemo<ChartOptions<'line'>>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#10233f',
            font: {
              family: 'Montserrat, Arial, Verdana, sans-serif',
              size: 12,
              weight: 600,
            },
          },
        },
        title: {
          display: true,
          text: 'Illustrative Growth Trend Over Time',
          color: '#224c87',
          font: {
            family: 'Montserrat, Arial, Verdana, sans-serif',
            size: 18,
            weight: 700,
          },
          padding: {
            bottom: 16,
          },
        },
        tooltip: {
          callbacks: {
            label(context) {
              return `${context.dataset.label}: ${formatCurrency(context.parsed.y ?? 0)}`;
            },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#334155',
            font: {
              family: 'Montserrat, Arial, Verdana, sans-serif',
            },
          },
          grid: {
            display: false,
          },
        },
        y: {
          ticks: {
            color: '#334155',
            callback(value) {
              return formatCurrency(Number(value));
            },
            font: {
              family: 'Montserrat, Arial, Verdana, sans-serif',
            },
          },
          title: {
            display: false,
          },
          grid: {
            color: 'rgba(145, 144, 144, 0.22)',
          },
        },
      },
    }),
    [],
  );

  const doughnutOptions = useMemo<ChartOptions<'doughnut'>>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#10233f',
            font: {
              family: 'Montserrat, Arial, Verdana, sans-serif',
              size: 12,
              weight: 600,
            },
          },
        },
        title: {
          display: true,
          text: 'Illustrative Final Corpus Composition',
          color: '#224c87',
          font: {
            family: 'Montserrat, Arial, Verdana, sans-serif',
            size: 18,
            weight: 700,
          },
          padding: {
            bottom: 16,
          },
        },
        tooltip: {
          callbacks: {
            label(context) {
              return `${context.label}: ${formatCurrency(context.parsed ?? 0)}`;
            },
          },
        },
      },
      cutout: '58%',
    }),
    [],
  );

  return (
    <section aria-labelledby="growth-chart-heading" className="rounded-[2rem] border border-brandBlue/10 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 id="growth-chart-heading" className="text-2xl font-bold text-brandBlue">
          Visual guide for projected growth
        </h2>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          These charts explain the same projection in multiple ways so first-time investors can quickly understand trend, composition, and year-wise progress.
        </p>
      </div>

      <div className="mb-5 rounded-[1.25rem] border border-brandBlue/10 bg-slate-50 p-3" role="tablist" aria-label="Chart type switcher">
        <div className="grid gap-2 sm:grid-cols-3">
          <button
            type="button"
            role="tab"
            aria-selected={activeView === 'bar'}
            onClick={() => setActiveView('bar')}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              activeView === 'bar'
                ? 'bg-brandBlue text-white'
                : 'bg-white text-brandBlue hover:bg-mist'
            }`}
          >
            Yearly Bar View
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeView === 'line'}
            onClick={() => setActiveView('line')}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              activeView === 'line'
                ? 'bg-brandBlue text-white'
                : 'bg-white text-brandBlue hover:bg-mist'
            }`}
          >
            Trend Line View
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeView === 'doughnut'}
            onClick={() => setActiveView('doughnut')}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              activeView === 'doughnut'
                ? 'bg-brandBlue text-white'
                : 'bg-white text-brandBlue hover:bg-mist'
            }`}
          >
            Composition View
          </button>
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-brandBlue/10 bg-slate-50 p-4 sm:p-5">
        {activeView === 'bar' && (
          <div role="tabpanel" aria-label="Yearly Bar View" className="space-y-3">
            <div className="h-[22rem] sm:h-[26rem]">
              <Bar
                data={chartData}
                options={chartOptions}
                aria-label="Illustrative Corpus Growth bar chart showing amount invested and estimated returns by year"
                role="img"
              />
            </div>
            <p className="text-sm leading-6 text-slate-700">
              Use this to see how your yearly corpus builds from both contribution and projected growth.
            </p>
          </div>
        )}

        {activeView === 'line' && (
          <div role="tabpanel" aria-label="Trend Line View" className="space-y-3">
            <div className="h-[22rem] sm:h-[26rem]">
              <Line
                data={trendLineData}
                options={lineOptions}
                aria-label="Illustrative growth trend line chart showing estimated corpus and invested amount over time"
                role="img"
              />
            </div>
            <p className="text-sm leading-6 text-slate-700">
              Use this to compare the pace at which projected corpus may move above your total contribution.
            </p>
          </div>
        )}

        {activeView === 'doughnut' && (
          <div role="tabpanel" aria-label="Composition View" className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="h-[18rem] sm:h-[20rem]">
              <Doughnut
                data={compositionData}
                options={doughnutOptions}
                aria-label="Illustrative final corpus composition chart showing amount invested and estimated returns"
                role="img"
              />
            </div>
            <div className="space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
              <h3 className="text-xl font-semibold text-brandBlue">What this composition chart tells a new investor</h3>
              <p>
                It splits your final projected corpus into two parts: what you invested yourself and what is estimated as growth.
              </p>
              <p>
                If you increase duration or monthly contribution, this composition changes. This helps you understand which adjustment may better support your long-term plan.
              </p>
              <p>
                Final year projected amount invested: <span className="font-semibold text-ink">{formatCurrency(finalInvested)}</span><br />
                Final year estimated returns: <span className="font-semibold text-ink">{formatCurrency(finalEstimatedReturns)}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
