'use client';
import { useEffect, useState, type ButtonHTMLAttributes } from 'react';

import clsx from '@/lib/clsx';

const KEY = 'bg-mode'; // 'dynamic' | 'static'

function prefersReduced() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

type BackgroundToggleProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export default function BackgroundToggle({ className = '', ...rest }: BackgroundToggleProps) {
  const [mode, setMode] = useState<'dynamic' | 'static'>('dynamic');

  useEffect(() => {
    const saved = (localStorage.getItem(KEY) as 'dynamic' | 'static') || null;
    const initial = saved ?? (prefersReduced() ? 'static' : 'dynamic');
    setMode(initial);
    document.body.classList.toggle('bg-static', initial === 'static');
  }, []);

  function toggle() {
    const next = mode === 'dynamic' ? 'static' : 'dynamic';
    setMode(next);
    localStorage.setItem(KEY, next);
    document.body.classList.toggle('bg-static', next === 'static');
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={clsx(
        'text-sm font-medium opacity-80 transition hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--accent))]',
        className
      )}
      title="Переключить фон"
      {...rest}
    >
      Фон: {mode === 'dynamic' ? 'динамический' : 'статичный'}
    </button>
  );
}
