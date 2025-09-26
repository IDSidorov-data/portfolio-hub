"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollMemory() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    const key = `scroll:${pathname}`;

    const persistPosition = () => {
      if (typeof window === "undefined") return;
      sessionStorage.setItem(key, String(window.scrollY));
    };

    window.addEventListener("beforeunload", persistPosition);
    window.addEventListener("pagehide", persistPosition);

    return () => {
      persistPosition();
      window.removeEventListener("beforeunload", persistPosition);
      window.removeEventListener("pagehide", persistPosition);
    };
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const homeKey = "scroll:/";

    if (pathname === "/") {
      const y = Number(sessionStorage.getItem(homeKey));
      if (!Number.isNaN(y) && y > 0) {
        window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
      }
    }
  }, [pathname]);

  return null;
}