"use client";

import * as React from "react";

type CarouselMetrics = {
  item: number;
  gap: number;
};

export function useSnapCarousel(length: number) {
  const listRef = React.useRef<HTMLUListElement | null>(null);
  const metricsRef = React.useRef<CarouselMetrics>({ item: 0, gap: 0 });
  const rafRef = React.useRef<number>();
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const node = listRef.current;
    if (!node || typeof window === "undefined") {
      return;
    }

    const computeMetrics = () => {
      const firstItem = node.querySelector(":scope > li") as HTMLElement | null;
      if (!firstItem) {
        metricsRef.current = { item: 0, gap: 0 };
        return;
      }

      const styles = window.getComputedStyle(node);
      const gap = parseFloat(styles.columnGap || styles.gap || "0");

      metricsRef.current = {
        item: firstItem.getBoundingClientRect().width,
        gap: Number.isFinite(gap) ? gap : 0,
      };
    };

    computeMetrics();

    const handleResize = () => computeMetrics();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(node);
    node.querySelectorAll(":scope > li").forEach((child) => resizeObserver.observe(child));
    window.addEventListener("resize", handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [length]);

  React.useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    setActiveIndex((prev) => {
      if (length <= 0) return 0;
      return Math.min(prev, length - 1);
    });
  }, [length]);

  const scrollToIndex = React.useCallback(
    (nextIndex: number) => {
      const node = listRef.current;
      if (!node) return;
      const { item, gap } = metricsRef.current;
      if (!item) return;
      const clamped = Math.max(0, Math.min(nextIndex, Math.max(length - 1, 0)));
      const offset = clamped * (item + gap);
      node.scrollTo({ left: offset, behavior: "smooth" });
    },
    [length]
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLUListElement>) => {
      if (length <= 1) return;
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
        return;
      }
      event.preventDefault();
      const delta = event.key === "ArrowRight" ? 1 : -1;
      scrollToIndex(activeIndex + delta);
    },
    [activeIndex, length, scrollToIndex]
  );

  const handleScroll = React.useCallback(() => {
    if (typeof window === "undefined") return;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = window.requestAnimationFrame(() => {
      const node = listRef.current;
      if (!node) return;
      const { item, gap } = metricsRef.current;
      if (!item) return;
      const rawIndex = node.scrollLeft / (item + gap || 1);
      const nextIndex = Math.round(rawIndex);
      const clamped = Math.max(0, Math.min(nextIndex, Math.max(length - 1, 0)));
      setActiveIndex((prev) => (prev === clamped ? prev : clamped));
    });
  }, [length]);

  return {
    activeIndex,
    listRef,
    handleKeyDown,
    handleScroll,
    scrollToIndex,
  } as const;
}

