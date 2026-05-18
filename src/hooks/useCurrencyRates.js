import { useState, useEffect, useRef } from "react";

// Free API — no key required, CORS-friendly
const BASE_CURRENCY = "PHP";
const CACHE_KEY = "pss_fx_cache";
const CACHE_TTL = 1000 * 60 * 15; // 15 minutes

// Currencies to display in the navbar ticker
export const TRACKED_PAIRS = [
  { from: "USD", to: "PHP", label: "USD/PHP" },
  { from: "EUR", to: "PHP", label: "EUR/PHP" },
  { from: "JPY", to: "PHP", label: "JPY/PHP" },
  { from: "GBP", to: "PHP", label: "GBP/PHP" },
  { from: "SGD", to: "PHP", label: "SGD/PHP" },
  { from: "CNY", to: "PHP", label: "CNY/PHP" },
  { from: "AUD", to: "PHP", label: "AUD/PHP" },
  { from: "KRW", to: "PHP", label: "KRW/PHP" },
];

function formatRate(from, rate) {
  // KRW/JPY — show more decimal places due to small unit value
  if (from === "KRW") return rate.toFixed(4);
  if (from === "JPY") return rate.toFixed(3);
  return rate.toFixed(2);
}

export function useCurrencyRates() {
  const [rates, setRates] = useState(null); // { USD: 56.5, EUR: 61.2, ... } keyed by foreign currency
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const prevRatesRef = useRef(null);

  useEffect(() => {
    async function fetchRates() {
      try {
        setLoading(true);

        // 1. Try cache
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { timestamp, data } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TTL) {
            setRates(data.rates);
            setLastUpdated(new Date(timestamp));
            setLoading(false);
            return;
          }
        }

        // 2. Fetch from frankfurter.app — free, no key, reliable
        // Base = PHP, get all tracked currencies
        const symbols = TRACKED_PAIRS.map((p) => p.from).join(",");
        const res = await fetch(
          `https://api.frankfurter.app/latest?from=${BASE_CURRENCY}&to=${symbols}`
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        // json.rates = { USD: 0.01768, EUR: 0.01623, ... } (1 PHP = X foreign)
        // We want: 1 FOREIGN = X PHP, so invert
        const inverted = {};
        for (const [currency, phpPerForeign] of Object.entries(json.rates)) {
          inverted[currency] = 1 / phpPerForeign;
        }

        setRates(inverted);
        setLastUpdated(new Date());

        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ timestamp: Date.now(), data: { rates: inverted } })
        );
      } catch (err) {
        console.error("FX fetch error:", err.message);
        setError(err.message);
        // Fallback hardcoded rates (approximate, as of mid-2025)
        setRates({
          USD: 56.5,
          EUR: 61.8,
          JPY: 0.377,
          GBP: 72.1,
          SGD: 42.3,
          CNY: 7.85,
          AUD: 36.9,
          KRW: 0.0413,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchRates();

    // Refresh every 15 minutes
    const interval = setInterval(fetchRates, CACHE_TTL);
    return () => clearInterval(interval);
  }, []);

  // Build display pairs with trend vs previous fetch
  const pairs = rates
    ? TRACKED_PAIRS.map(({ from, label }) => {
        const rate = rates[from];
        const prev = prevRatesRef.current?.[from];
        const trend = prev == null ? "neutral" : rate > prev ? "up" : rate < prev ? "down" : "neutral";
        return {
          label,
          from,
          rate: rate ? formatRate(from, rate) : "—",
          rawRate: rate ?? null,
          trend,
        };
      })
    : [];

  // Update prev after computing trends
  useEffect(() => {
    if (rates) prevRatesRef.current = { ...rates };
  }, [rates]);

  return { pairs, loading, error, lastUpdated };
}