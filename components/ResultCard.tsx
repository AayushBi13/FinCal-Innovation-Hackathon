type ResultCardProps = {
  label: string;
  value: string;
  tone?: 'blue' | 'red' | 'neutral';
  detail: string;
};

const toneClasses: Record<NonNullable<ResultCardProps['tone']>, string> = {
  blue: 'border-brandBlue/15 bg-brandBlue text-white',
  red: 'border-brandRed/15 bg-brandRed text-white',
  neutral: 'border-brandBlue/10 bg-white text-ink',
};

export function ResultCard({ label, value, detail, tone = 'neutral' }: ResultCardProps) {
  const isFilled = tone !== 'neutral';

  return (
    <article className={`rounded-[1.75rem] border p-5 shadow-sm ${toneClasses[tone]}`}>
      <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${isFilled ? 'text-white/80' : 'text-brandGrey'}`}>
        {label}
      </p>
      <output
        className="mt-3 block max-w-full overflow-x-auto whitespace-nowrap text-[clamp(1.6rem,2.4vw,2.8rem)] font-extrabold leading-tight tracking-tight"
        aria-live="polite"
      >
        {value}
      </output>
      <p className={`mt-3 text-sm leading-6 ${isFilled ? 'text-white/90' : 'text-slate-600'}`}>{detail}</p>
    </article>
  );
}
