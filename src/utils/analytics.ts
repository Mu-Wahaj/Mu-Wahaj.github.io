export const trackEvent = (event: string, payload: Record<string, unknown> = {}) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('portfolio-analytics', { detail: { event, payload } }))
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
    if (gtag) {
      gtag('event', event, payload)
    }
  }
}
