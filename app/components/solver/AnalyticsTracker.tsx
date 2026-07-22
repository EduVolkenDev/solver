"use client";

import { useEffect } from "react";

type AnalyticsEventElement = HTMLElement & {
  dataset: DOMStringMap & {
    analyticsEvent?: string;
    analyticsLabel?: string;
  };
};

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackGoogleEvent(eventName: string, eventLabel?: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  if (eventLabel) {
    window.gtag("event", eventName, { event_label: eventLabel });
    return;
  }

  window.gtag("event", eventName);
}

export default function AnalyticsTracker() {
  useEffect(() => {
    document.querySelectorAll<HTMLAnchorElement>('[data-analytics-event="whatsapp_enquiry"]').forEach((link) => {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });

    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<AnalyticsEventElement>("[data-analytics-event]") : null;
      if (!target?.dataset.analyticsEvent) return;

      trackGoogleEvent(target.dataset.analyticsEvent, target.dataset.analyticsLabel);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
