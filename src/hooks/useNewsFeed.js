import { useState, useEffect } from "react";

const CACHE_KEY = "pss_news_cache";
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

// Simplified Mapping to match your UI
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
    const apiKey = import.meta.env.VITE_NEWS_API_KEY;

    async function fetchNews() {
      try {
        setLoading(true);

        // 1. Check if Key exists
        if (!apiKey || apiKey.length < 10) {
          throw new Error("Missing API Key in .env");
        }

        // 2. Try Cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { timestamp, data } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TTL && data.length > 0) {
            setArticles(data);
            setLoading(false);
            return;
          }
        }

        // 3. Real Fetch (Using Top Headlines for better localhost support)
        const url = `https://newsapi.org/v2/top-headlines?category=business&q=oil+OR+trade+OR+supply&language=en&apiKey=${apiKey}`;

        const response = await fetch(url);
        const json = await response.json();

        if (json.status !== "ok") {
          throw new Error(json.message || "API returned an error");
        }

        const news = json.articles.slice(0, 6).map(mapArticle);

        if (news.length === 0) throw new Error("No matching news found");

        setArticles(news);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ timestamp: Date.now(), data: news }),
        );
      } catch (err) {
        console.error("News Feed Error:", err.message);
        setError(err.message);
        setArticles(getFallbackArticles()); // Fallback if API fails
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
