import { useCallback, useEffect, useRef, type RefObject } from "react";

import { sendEvent } from "@/lib/analytics";

type AnalyticsSection = "services" | "cases" | "stack" | "process";

type CardAnalyticsOptions = {
  id: string;
  section: AnalyticsSection;
  index: number;
  impressionEvent?: string;
  clickEvent?: string;
  payload?: Record<string, unknown>;
};

type CardAnalyticsResult<TElement extends HTMLElement> = {
  ref: RefObject<TElement>;
  trackClick: (extra?: Record<string, unknown>) => void;
};

export function useCardAnalytics<TElement extends HTMLElement = HTMLElement>({
  id,
  section,
  index,
  impressionEvent = `${section}_card_impression`,
  clickEvent = `${section}_card_click`,
  payload,
}: CardAnalyticsOptions): CardAnalyticsResult<TElement> {
  const ref = useRef<TElement | null>(null);
  const payloadRef = useRef(payload);

  useEffect(() => {
    payloadRef.current = payload;
  }, [payload]);

  useEffect(() => {
    const node = ref.current;
    if (typeof window === "undefined" || !node) {
      return;
    }

    let seen = false;
    const emitImpression = () => {
      if (seen) return;
      seen = true;
      sendEvent(impressionEvent, { id, section, index, ...payloadRef.current });
    };

    if (!("IntersectionObserver" in window)) {
      emitImpression();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            emitImpression();
            observer.unobserve(entry.target as Element);
          }
        });
      },
      { threshold: [0.35, 0.5, 0.75] }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [id, impressionEvent, index, section]);

  const trackClick = useCallback(
    (extra?: Record<string, unknown>) => {
      sendEvent(clickEvent, { id, section, index, ...payloadRef.current, ...(extra ?? {}) });
    },
    [clickEvent, id, index, section]
  );

  return { ref, trackClick };
}
