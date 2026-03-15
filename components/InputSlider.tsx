'use client';

import { ChangeEvent, useEffect, useMemo, useState } from 'react';

type InputSliderProps = {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  unit: '₹' | '%' | 'years';
};

function formatDisplayValue(value: number, unit: '₹' | '%' | 'years') {
  if (unit === '₹') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  }

  if (unit === 'years') {
    return `${value} year${value === 1 ? '' : 's'}`;
  }

  return `${value}%`;
}

function formatHelperRange(min: number, max: number, unit: '₹' | '%' | 'years') {
  if (unit === '₹') {
    return `Range ${new Intl.NumberFormat('en-IN').format(min)} to ${new Intl.NumberFormat('en-IN').format(max)} rupees.`;
  }

  if (unit === 'years') {
    return `Range ${min} to ${max} years.`;
  }

  return `Range ${min}% to ${max}%.`;
}

export function InputSlider({
  id,
  label,
  min,
  max,
  step,
  value,
  onChange,
  unit,
}: InputSliderProps) {
  const [draftValue, setDraftValue] = useState(String(value));

  useEffect(() => {
    setDraftValue(String(value));
  }, [value]);

  const parsedValue = Number(draftValue);
  const isNumber = draftValue.trim() !== '' && Number.isFinite(parsedValue);
  const isOutOfRange = isNumber && (parsedValue < min || parsedValue > max);
  const hasError = draftValue.trim() !== '' && (!isNumber || isOutOfRange);
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;
  const numberInputId = `${id}-number`;

  const displayValue = useMemo(() => formatDisplayValue(value, unit), [unit, value]);
  const helperText = useMemo(() => formatHelperRange(min, max, unit), [max, min, unit]);

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = Number(event.target.value);
    setDraftValue(String(nextValue));
    onChange(nextValue);
  };

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextDraftValue = event.target.value;
    setDraftValue(nextDraftValue);

    const nextValue = Number(nextDraftValue);

    if (nextDraftValue.trim() !== '' && Number.isFinite(nextValue) && nextValue >= min && nextValue <= max) {
      onChange(nextValue);
    }
  };

  const handleBlur = () => {
    const fallbackValue = Math.min(Math.max(Number.isFinite(parsedValue) ? parsedValue : value, min), max);
    setDraftValue(String(fallbackValue));
    onChange(fallbackValue);
  };

  return (
    <div className="rounded-3xl border border-brandBlue/10 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <label htmlFor={id} className="text-sm font-semibold text-brandBlue">
              {label}
            </label>
            <p id={helperId} className="text-sm text-slate-600">
              {helperText}
            </p>
          </div>

          <output
            htmlFor={`${id} ${numberInputId}`}
            className="rounded-2xl bg-mist px-4 py-3 text-right text-xl font-bold text-ink"
            aria-live="polite"
          >
            {displayValue}
          </output>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_10rem] lg:items-center">
          <input
            id={id}
            className="range-track"
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleSliderChange}
            aria-label={label}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-describedby={hasError ? `${helperId} ${errorId}` : helperId}
          />

          <div className="flex items-center rounded-2xl border border-slate-300 bg-white px-3 py-2 focus-within:border-brandBlue focus-within:ring-2 focus-within:ring-brandBlue/20">
            <label htmlFor={numberInputId} className="sr-only">
              {label} numeric input
            </label>
            <span className="mr-2 text-sm font-semibold text-slate-600">
              {unit === 'years' ? 'Yr' : unit}
            </span>
            <input
              id={numberInputId}
              type="number"
              inputMode="decimal"
              min={min}
              max={max}
              step={step}
              value={draftValue}
              onChange={handleNumberChange}
              onBlur={handleBlur}
              className="w-full border-0 bg-transparent text-lg font-semibold text-ink outline-none"
              aria-describedby={hasError ? `${helperId} ${errorId}` : helperId}
              aria-invalid={hasError}
            />
          </div>
        </div>

        <p
          id={errorId}
          className={`text-sm font-medium text-brandRed ${hasError ? 'block' : 'hidden'}`}
        >
          Enter a value between {min.toLocaleString('en-IN')} and {max.toLocaleString('en-IN')}.
        </p>
      </div>
    </div>
  );
}
