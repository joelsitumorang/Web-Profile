export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  // Use existing analytics if available, or just console.log for now
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  } else {
    console.log(`[Analytics] Event: ${eventName}`, eventParams);
  }
}
