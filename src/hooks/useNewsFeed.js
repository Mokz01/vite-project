import { useState, useEffect } from "react";

const CACHE_KEY = "pss_news_cache";
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

function mapArticle(article, index) {
  return {
    id: `news-${index}-${Date.now()}`,
    title: article.title?.replace(/ - .*$/, "") ?? "Untitled Signal",
    source: article.source?.name ?? "Global Intelligence",
    date:
      article.publishedAt?.split("T")[0] ??
      new Date().toISOString().split("T")[0],
    status: "Verified",
    type: "Global",
    category: "Live Feed",
    summary: article.description ?? "No description available for this signal.",
    url: article.url,
    highlighted: index === 0,
  };
}

export function useNewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GNEWS_API_KEY;

    async function fetchNews() {
      try {
        setLoading(true);

        if (!apiKey || apiKey.length < 10) {
          throw new Error("Missing VITE_GNEWS_API_KEY in .env");
        }

        // Try cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { timestamp, data } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TTL && data.length > 0) {
            setArticles(data);
            setLoading(false);
            return;
          }
        }

        // GNews API — works from the browser, no CORS issues
        const url = `https://gnews.io/api/v4/search?q=trade+OR+supply+OR+oil+OR+conflict&lang=en&max=6&apikey=${apiKey}`;

        const response = await fetch(url);
        const json = await response.json();

        if (!response.ok || json.errors) {
          throw new Error(
            (json.errors && json.errors[0]) || `HTTP ${response.status}`
          );
        }

        if (!json.articles || json.articles.length === 0) {
          throw new Error("No articles returned from GNews");
        }

        const news = json.articles.map(mapArticle);

        setArticles(news);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ timestamp: Date.now(), data: news })
        );
      } catch (err) {
        console.error("News Feed Error:", err.message);
        setError(err.message);
        setArticles(getFallbackArticles());
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  return { articles, loading, error };
}

function getFallbackArticles() {
  const today = new Date().toISOString().split("T")[0];
  return [
    {
      id: "f1",
      title: "Regional Trade Routes Under Pressure",
      source: "System Intelligence",
      date: today,
      status: "Verified",
      type: "Global",
      category: "Energy",
      highlighted: true,
      summary:
        "Live feed currently unavailable. Displaying last known system signals.",
    },
  ];
}