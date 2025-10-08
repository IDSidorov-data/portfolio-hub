'use client';

import { useEffect, useState } from 'react';

export default function CaseReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const { scrollHeight, clientHeight } = document.documentElement;
      const viewport = window.innerHeight;
      const track = scrollHeight - Math.max(clientHeight, viewport);
      const ratio = track > 0 ? Math.min(Math.max(window.scrollY / track, 0), 1) : 0;
      setProgress(ratio);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-1 bg-transparent">
      <div
        aria-hidden
        className="h-full origin-left bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent))] to-transparent transition-transform duration-200 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
