import { useState, useRef, useEffect } from "react";

// ── Config arrays — add/remove filters here without touching JSX ──

const URGENCY_CONFIG = [
  {
    value: "High",
    label: "High",
    dot: "bg-alert",
    active: "border-alert text-alert bg-alert/10",
  },
  {
    value: "Medium",
    label: "Medium",
    dot: "bg-gold",
    active: "border-gold text-gold-dark bg-gold/10",
  },
  {
    value: "Low",
    label: "Low",
    dot: "bg-jade",
    active: "border-jade text-jade bg-jade/10",
  },
];

const DATE_OPTIONS = [
  { value: "all", label: "All time" },
  { value: "today", label: "Today" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
];

const CATEGORY_CONFIG = [
  { value: "Fuel", label: "Fuel", icon: "⛽" },
  { value: "Food", label: "Food", icon: "🌾" },
  { value: "Logistics", label: "Logistics", icon: "🚢" },
  { value: "Energy", label: "Energy", icon: "⚡" },
  { value: "Finance", label: "Finance", icon: "💱" },
  { value: "Metals", label: "Metals", icon: "🏭" },
];

export default function FilterBar({ filters, onFilterChange, resultCount }) {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close category dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeFilterCount = [
    filters.query,
    filters.urgency !== "all" ? filters.urgency : "",
    filters.dateRange !== "all" ? filters.dateRange : "",
    filters.categories.length > 0 ? "cat" : "",
  ].filter(Boolean).length;

  const handleCategoryToggle = (value) => {
    const current = filters.categories;
    const updated = current.includes(value)
      ? current.filter((c) => c !== value)
      : [...current, value];
    onFilterChange("categories", updated);
  };

  const handleUrgencyToggle = (value) => {
    // Clicking active urgency deselects it (toggle off)
    onFilterChange("urgency", filters.urgency === value ? "all" : value);
  };

  const handleReset = () => {
    onFilterChange("reset", null);
  };

  return (
    <div className="w-full mb-4 animate-fade-in relative z-10">
      <div className="bg-white/70 backdrop-blur-sm border border-offwhite-dark rounded-2xl px-4 py-3 shadow-sm">
        {/* ── Top row: Search + Date + Reset ── */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {/* Search bar */}
          <div className="relative flex-1 min-w-[200px]">
            <SearchIcon />
            <input
              type="text"
              value={filters.query}
              onChange={(e) => onFilterChange("query", e.target.value)}
              placeholder="Search signals, titles, descriptions…"
              className="
                w-full pl-8 pr-3 py-2 text-sm
                bg-offwhite-light border border-offwhite-dark rounded-lg
                text-navy placeholder-teal/40
                focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal
                transition-colors duration-150 font-body
              "
            />
            {filters.query && (
              <button
                onClick={() => onFilterChange("query", "")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-teal/40 hover:text-teal transition-colors"
              >
                <XIcon size={14} />
              </button>
            )}
          </div>

          {/* Date range dropdown */}
          <select
            value={filters.dateRange}
            onChange={(e) => onFilterChange("dateRange", e.target.value)}
            className="
              text-xs font-mono px-3 py-2 rounded-lg
              bg-offwhite-light border border-offwhite-dark text-navy
              focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal
              transition-colors cursor-pointer
            "
          >
            {DATE_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          {/* Active filter count badge + Reset */}
          {activeFilterCount > 0 && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs font-mono text-alert border border-alert/40 bg-alert/5 hover:bg-alert/10 px-2.5 py-2 rounded-lg transition-colors"
            >
              <XIcon size={11} />
              Clear {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}
            </button>
          )}

          {/* Result count */}
          {resultCount && (
            <div className="ml-auto flex items-center gap-3 text-[11px] font-mono text-teal/50 shrink-0">
              <span>
                <span className="text-teal font-medium">
                  {resultCount.global}
                </span>{" "}
                global
              </span>
              <span className="w-px h-3 bg-offwhite-dark" />
              <span>
                <span className="text-teal font-medium">
                  {resultCount.local}
                </span>{" "}
                local
              </span>
            </div>
          )}
        </div>

        {/* ── Bottom row: Urgency toggles + Category multi-select ── */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Urgency label */}
          <span className="text-[10px] font-mono font-medium text-teal/50 uppercase tracking-widest shrink-0">
            Urgency
          </span>

          {/* Urgency toggle buttons — rendered via .map() */}
          {URGENCY_CONFIG.map(({ value, label, dot, active }) => {
            const isActive = filters.urgency === value;
            return (
              <button
                key={value}
                onClick={() => handleUrgencyToggle(value)}
                className={`
                  inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5
                  rounded-lg border transition-all duration-150
                  ${
                    isActive
                      ? `${active} shadow-sm`
                      : "border-offwhite-dark text-teal/60 hover:border-teal/40 hover:text-teal bg-transparent"
                  }
                `}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${isActive ? dot : "bg-teal/30"}`}
                />
                {label}
              </button>
            );
          })}

          {/* Divider */}
          <span className="w-px h-4 bg-offwhite-dark mx-1 shrink-0" />

          {/* Category multi-select dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setCategoryOpen((o) => !o)}
              className={`
                inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5
                rounded-lg border transition-all duration-150
                ${
                  filters.categories.length > 0
                    ? "border-teal text-teal bg-teal/10 shadow-sm"
                    : "border-offwhite-dark text-teal/60 hover:border-teal/40 hover:text-teal"
                }
              `}
            >
              <FilterIcon />
              Categories
              {filters.categories.length > 0 && (
                <span className="bg-teal text-offwhite text-[10px] font-medium px-1.5 py-0.5 rounded-full leading-none">
                  {filters.categories.length}
                </span>
              )}
              <ChevronIcon open={categoryOpen} />
            </button>

            {/* Dropdown panel */}
            {categoryOpen && (
              <div
                className="
                    absolute top-full left-0 mt-1.5 z-[999]
                    bg-white border border-offwhite-dark rounded-xl shadow-lg
                     p-2 min-w-[160px] animate-fade-in
                    "
              >
                {/* Category options — rendered via .map() */}
                {CATEGORY_CONFIG.map(({ value, label, icon }) => {
                  const isSelected = filters.categories.includes(value);
                  return (
                    <button
                      key={value}
                      onClick={() => handleCategoryToggle(value)}
                      className={`
                        w-full flex items-center gap-2 text-left text-xs font-mono
                        px-2.5 py-2 rounded-lg transition-colors
                        ${
                          isSelected
                            ? "bg-teal/10 text-teal font-medium"
                            : "text-navy/70 hover:bg-offwhite-light hover:text-navy"
                        }
                      `}
                    >
                      <span>{icon}</span>
                      <span className="flex-1">{label}</span>
                      {isSelected && <CheckIcon />}
                    </button>
                  );
                })}

                {/* Clear categories */}
                {filters.categories.length > 0 && (
                  <>
                    <div className="h-px bg-offwhite-dark my-1.5" />
                    <button
                      onClick={() => onFilterChange("categories", [])}
                      className="w-full text-left text-xs font-mono text-alert/70 hover:text-alert px-2.5 py-1.5 rounded-lg hover:bg-alert/5 transition-colors"
                    >
                      Clear categories
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Active category chips */}
          {filters.categories.map((cat) => {
            const cfg = CATEGORY_CONFIG.find((c) => c.value === cat);
            return (
              <span
                key={cat}
                className="inline-flex items-center gap-1 text-[11px] font-mono text-teal bg-teal/10 border border-teal/20 px-2 py-1 rounded-full"
              >
                {cfg?.icon} {cat}
                <button
                  onClick={() => handleCategoryToggle(cat)}
                  className="ml-0.5 text-teal/50 hover:text-teal transition-colors"
                >
                  <XIcon size={10} />
                </button>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Inline SVG icon components ──

function SearchIcon() {
  return (
    <svg
      className="absolute left-2.5 top-1/2 -translate-y-1/2 text-teal/40"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M9 9l2.5 2.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function XIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path
        d="M2 2l8 8M10 2l-8 8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M1 3h10M3 6h6M5 9h2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M2 3.5l3 3 3-3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path
        d="M2 5.5l2.5 2.5 4.5-4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}