import { useState, useMemo } from "react";

// ── Initial filter state — single source of truth ──
const INITIAL_FILTERS = {
  query: "",
  urgency: "all",
  dateRange: "all",
  categories: [], // multi-select array
};

/**
 * useFilters — custom hook encapsulating all filter state and logic.
 *
 * Returns:
 *   filters          — current filter state object
 *   handleFilterChange(key, value) — updates one filter at a time
 *   applyFilters(items) — pure function: run any array through active filters
 */
export function useFilters() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  // ── Single handler for all filter changes ──
  const handleFilterChange = (key, value) => {
    if (key === "reset") {
      setFilters(INITIAL_FILTERS);
      return;
    }
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // ── Pure filter function — works on ANY array of signal objects ──
  const applyFilters = useMemo(() => {
    return (items = []) => {
      return items.filter((item) => {
        // 1. Text search — matches title, description, summary, or source
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

        // 2. Urgency filter (Local logs only — global signals pass through)
        if (filters.urgency !== "all" && item.type === "Local") {
          if (item.urgency !== filters.urgency) return false;
        }

        // 3. Date range filter
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

        // 4. Category multi-select filter
        if (filters.categories.length > 0) {
          const itemCategory = item.category ?? item.urgency ?? "";
          // Match if item's category is in the selected list
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
