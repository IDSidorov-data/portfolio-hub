"use client";
import { useEffect, useRef } from "react";

export default function BackgroundFX() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const DPR = Math.min(2, window.devicePixelRatio || 1);
    let raf = 0;

    function resize() {
      c.width = Math.floor(innerWidth * DPR);
      c.height = Math.floor(innerHeight * DPR);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(DPR, DPR);
    }
    resize();
    addEventListener("resize", resize);

    // гуще, больше и с "мерцанием"
    const N = 220;
    const stars = Array.from({ length: N }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      z: Math.random() * 0.6 + 0.4,            // глубина/яркость
      vx: (Math.random() - 0.5) * 0.06,
      vy: (Math.random() - 0.5) * 0.06,
      phase: Math.random() * Math.PI * 2,       // фаза для твингла
    }));

    const html = document.documentElement;
    const getAlpha = () => {
      const v = getComputedStyle(html).getPropertyValue("--star-alpha").trim();
      const n = parseFloat(v);
      return Number.isFinite(n) ? n : 0.3;
    };

    function frame(t: number) {
      const W = innerWidth, H = innerHeight, baseA = getAlpha();

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      for (const s of stars) {
        // движение
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0) s.x += W;
        if (s.y < 0) s.y += H;
        if (s.x > W) s.x -= W;
        if (s.y > H) s.y -= H;

        // мягкое мерцание и радиус
        const tw = 0.75 + 0.35 * Math.sin(0.002 * t + s.phase); // 0.4..1.1
        const a = baseA * s.z * tw * 1.1;                        // ярче
        const r = (1.6 + 1.4 * tw) * s.z;                        // крупнее

        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,1)";
        // лёгкое «сияние»
        ctx.shadowColor = "rgba(255,255,255,0.6)";
        ctx.shadowBlur = 8 * s.z;
        ctx.globalAlpha = a;
        ctx.fill();
      }

      // сброс
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = "source-over";

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      data-webgl-bg
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.9, mixBlendMode: "screen" }}
    />
  );
}
