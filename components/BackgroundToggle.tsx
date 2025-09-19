'use client';
import { useEffect, useState } from 'react';

const KEY = 'bg-mode'; // 'dynamic' | 'static'

function prefersReduced() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

export default function BackgroundToggle() {
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
      className="text-sm px-3 py-1.5 rounded-xl border bg-background/60 hover:bg-background/80"
      title="Переключить фон"
    >
      Фон: {mode === 'dynamic' ? 'Динамический' : 'Статичный'}
    </button>
  );
}
