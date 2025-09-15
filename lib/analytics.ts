export function sendEvent(name: string, params: Record<string, any> = {}) {
  if (typeof window === "undefined") return;

  // Google Analytics 4
  (window as any).gtag?.("event", name, params);

  // Яндекс.Метрика
  if (process.env.NEXT_PUBLIC_YM_ID) {
    (window as any).ym?.(
      Number(process.env.NEXT_PUBLIC_YM_ID),
      "reachGoal",
      name,
      params
    );
  }

  // Для отладки
  // console.log("event:", name, params);
}