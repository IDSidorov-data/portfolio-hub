"use client";

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

type Tone = 'neutral' | 'cool' | 'warm' | 'iris';

type Props = {
  tone?: Tone;
  delay?: number;
  className?: string;
  children: ReactNode;
};

const toneClasses: Record<Tone, string> = {
  neutral:
    'border-slate-200/60 bg-white/80 shadow-[0_18px_56px_-30px_rgba(15,23,42,0.4)] dark:border-white/12 dark:bg-slate-900/45',
  cool:
    'border-sky-200/60 bg-gradient-to-br from-sky-50/90 via-slate-50/70 to-transparent shadow-[0_26px_60px_-34px_rgba(56,189,248,0.45)] dark:border-sky-500/20 dark:from-slate-900/60 dark:via-slate-900/40 dark:to-slate-900/20',
  warm:
    'border-amber-200/60 bg-gradient-to-br from-amber-50/85 via-white/70 to-transparent shadow-[0_26px_60px_-34px_rgba(251,191,36,0.4)] dark:border-amber-500/20 dark:from-slate-900/60 dark:via-slate-900/40 dark:to-slate-900/20',
  iris:
    'border-indigo-200/60 bg-gradient-to-br from-indigo-50/90 via-slate-50/70 to-transparent shadow-[0_26px_60px_-34px_rgba(129,140,248,0.4)] dark:border-indigo-500/20 dark:from-slate-900/60 dark:via-slate-900/40 dark:to-slate-900/20',
};

export default function CaseSectionIsland({
  tone = 'neutral',
  delay = 0,
  className = '',
  children,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const base = `relative overflow-hidden rounded-3xl border backdrop-blur-xl transition duration-700 ease-out ${toneClasses[tone]} ${className}`.trim();

  return (
    <section
      ref={ref}
      className={`${base} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/4" aria-hidden />
      <div className="relative z-[1] flex flex-col gap-5 p-6 sm:p-8">
        {children}
      </div>
    </section>
  );
}
