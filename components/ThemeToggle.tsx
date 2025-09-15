'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const has = document.documentElement.classList.contains('dark');
    setDark(has);
  }, []);
  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch {}
  }, [dark]);
  return (
    <button aria-label="Переключить тему" className="rounded-lg px-3 py-2 text-sm" onClick={() => setDark(d => !d)}>
      {dark ? '☀️' : '🌙'}
    </button>
  );
}