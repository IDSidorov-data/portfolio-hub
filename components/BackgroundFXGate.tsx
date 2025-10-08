"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const FXLite = dynamic(() => import("@/components/BackgroundFX"), { ssr: false });
const FXPro = dynamic(() => import("@/components/BackgroundFXPro"), { ssr: false });

const KEY = 'bg-mode'; // 'dynamic' | 'static'

export default function BackgroundFXGate() {
  const [mode, setMode] = useState<'dynamic' | 'static'>('dynamic');
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [reduced, setReduced] = useState<boolean>(false);

  useEffect(() => {
    // read saved mode
    try {
      const saved = (localStorage.getItem(KEY) as 'dynamic' | 'static') || null;
      if (saved) setMode(saved);
    } catch {}
    // media flags
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(!!mql.matches);
    const onChange = () => setReduced(!!mql.matches);
    mql.addEventListener?.('change', onChange);
    // viewport width
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => {
      mql.removeEventListener?.('change', onChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (mode === 'static' || reduced) return null;        // honor user/system pref
  if (isMobile) return null;                             // disable heavy FX on mobile

  // Desktop: use Pro (THREE). If it fails to load, Next will swallow error and app remains usable.
  return <FXPro />;
}
