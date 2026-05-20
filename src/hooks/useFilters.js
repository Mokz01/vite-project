import { useState, useMemo } from "react";

const INITIAL_FILTERS = {
  query: "",
  urgency: "all",
  dateRange: "all",
  categories: [],
};

export function useFilters() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const handleFilterChange = (key, value) => {
    if (key === "reset") {
      setFilters(INITIAL_FILTERS);
      return;
    }
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = useMemo(() => {
    return (items = []) => {
      return items.filter((item) => {
        if (filters.query.trim()) {
          const q = filters.query.toLowerCase();
          const searchable = [
            item.title,
            item.description,
            item.summary,
            item.source,
            item.region,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          if (!searchable.includes(q)) return false;
        }

        if (filters.urgency !== "all" && item.type === "Local") {
          if (item.urgency !== filters.urgency) return false;
        }

        if (filters.dateRange !== "all" && item.date) {
          const itemDate = new Date(item.date);
          const now = new Date();

          if (filters.dateRange === "today") {
            const isToday =
              itemDate.getFullYear() === now.getFullYear() &&
              itemDate.getMonth() === now.getMonth() &&
              itemDate.getDate() === now.getDate();
            if (!isToday) return false;
          }

          if (filters.dateRange === "week") {
            const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
            if (itemDate < weekAgo) return false;
          }

          if (filters.dateRange === "month") {
            const monthAgo = new Date(now);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            if (itemDate < monthAgo) return false;
          }
        }

        if (filters.categories.length > 0) {
          const itemCategory = item.category ?? item.urgency ?? "";
          const matches = filters.categories.some(
            (cat) =>
              itemCategory.toLowerCase().includes(cat.toLowerCase()) ||
              item.title?.toLowerCase().includes(cat.toLowerCase()) ||
              item.summary?.toLowerCase().includes(cat.toLowerCase()),
          );
          if (!matches) return false;
        }

        return true;
      });
    };
  }, [filters]);

  return { filters, handleFilterChange, applyFilters };
}