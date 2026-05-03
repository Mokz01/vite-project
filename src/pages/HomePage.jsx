import { useState } from "react";
import SignalCard from "../components/SignalCard";
import LogForm from "../components/LogForm";
import FilterBar from "../components/FilterBar";
import { useSignalLogs } from "../hooks/useSignalLogs";
import { useNewsFeed } from "../hooks/useNewsFeed";
import { useFilters } from "../hooks/useFilters";
import SourceModal from "../components/SourceModal";

export default function HomePage() {
  const { logs, addLog, updateLog, deleteLog } = useSignalLogs();
  const { articles, loading, error } = useNewsFeed();
  const { filters, handleFilterChange, applyFilters } = useFilters();
  const [editingEntry, setEditingEntry] = useState(null);
  const [sourceModal, setSourceModal] = useState(null);

  const handleSave = (formData) => {
    if (editingEntry) {
      updateLog(editingEntry.id, formData);
      setEditingEntry(null);
    } else {
      addLog(formData);
    }
  };

  // ── Apply filters to both panes ──
  const filteredGlobal = applyFilters(articles || []);
  const filteredLocal = applyFilters(logs);

  const today = new Date().toLocaleDateString("en-PH", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <main className="max-w-screen-xl mx-auto px-4 py-5">
        {/* Page header */}
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="section-header mb-0.5">Live dashboard</p>
            <h1 className="font-display text-2xl text-navy leading-none">
              Signal Intelligence
            </h1>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-teal/60">
            <span className="w-1.5 h-1.5 rounded-full bg-jade animate-pulse-dot" />
            {today}
          </div>
        </div>

        {/* ── Filter bar sits above both panes ── */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          resultCount={{
            global: filteredGlobal.length,
            local: filteredLocal.length,
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start overflow-visible">
          {/* LEFT — Global Feed */}
          <section className="bg-offwhite-light rounded-2xl p-4 border border-offwhite-dark">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-teal tracking-wide">
                Global signal feed
              </h2>
              <div className="flex items-center gap-2">
                {loading && (
                  <span className="flex items-center gap-1.5 text-[11px] font-mono text-teal/50">
                    <Spinner /> Fetching intelligence…
                  </span>
                )}
                {!loading && (
                  <span className="text-[11px] font-mono text-teal/50">
                    {filteredGlobal.length} of {articles?.length || 0} signals
                  </span>
                )}
              </div>
            </div>

            {/* Error banner */}
            {error && (
              <div className="mb-3 px-3 py-2 rounded-lg bg-alert/10 border border-alert/20 text-xs text-alert font-mono">
                {error}
              </div>
            )}

            {/* Loading skeleton */}
            {loading && (
              <div className="space-y-2.5">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="card-base p-4 space-y-2 animate-pulse"
                  >
                    <div className="h-3 bg-offwhite-dark rounded w-1/3" />
                    <div className="h-4 bg-offwhite-dark rounded w-4/5" />
                    <div className="h-3 bg-offwhite-dark rounded w-full" />
                    <div className="h-3 bg-offwhite-dark rounded w-2/3" />
                  </div>
                ))}
              </div>
            )}

            {/* No results state */}
            {!loading && filteredGlobal.length === 0 && (
              <EmptyState message="No global signals match your filters." />
            )}

            {/* Live articles */}
            {!loading && filteredGlobal.length > 0 && (
              <div className="space-y-2.5 stagger">
                {filteredGlobal.map((article, i) => (
                  <SignalCard
                    key={article.id}
                    {...article}
                    animDelay={i * 0.05}
                    onViewSource={
                      article.url
                        ? () =>
                            setSourceModal({
                              url: article.url,
                              title: article.title,
                              source: article.source,
                              summary: article.summary,
                              description: article.description,
                              status: article.status,
                              urgency: article.urgency,
                              region: article.region,
                              category: article.category,
                              date: article.date,
                            })
                        : undefined
                    }
                  />
                ))}
              </div>
            )}
          </section>

          {/* RIGHT — Local Log */}
          <section className="bg-offwhite-light rounded-2xl p-4 border border-offwhite-dark">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-teal tracking-wide">
                My local impact log
              </h2>
              <span className="text-[11px] font-mono text-teal/50">
                {filteredLocal.length} of {logs.length} entries · saved
              </span>
            </div>

            <div className="mb-4">
              <LogForm
                onSave={handleSave}
                editingEntry={editingEntry}
                onCancelEdit={() => setEditingEntry(null)}
              />
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="h-px flex-1 bg-offwhite-dark" />
              <span className="text-[10px] font-mono text-teal/40 uppercase tracking-widest">
                Saved logs
              </span>
              <span className="h-px flex-1 bg-offwhite-dark" />
            </div>

            {/* Empty — no logs at all */}
            {logs.length === 0 && (
              <div className="text-center py-10 text-xs font-mono text-teal/40">
                No entries yet — add your first signal log above.
              </div>
            )}

            {/* Empty — logs exist but filtered out */}
            {logs.length > 0 && filteredLocal.length === 0 && (
              <EmptyState message="No local logs match your filters." />
            )}

            {/* Log list */}
            {filteredLocal.length > 0 && (
              <div className="space-y-2.5 stagger">
                {filteredLocal.map((log, i) => (
                  <SignalCard
                    key={log.id}
                    {...log}
                    animDelay={i * 0.05}
                    onEdit={() => setEditingEntry(log)}
                    onDelete={() => deleteLog(log.id)}
                    onViewSource={
                      log.url
                        ? () =>
                            setSourceModal({
                              url: log.url,
                              title: log.title,
                              source: log.source,
                              summary: log.summary,
                              description: log.description,
                              status: log.status,
                              urgency: log.urgency,
                              region: log.region,
                              category: log.category,
                              date: log.date,
                            })
                        : undefined
                    }
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Source Modal — unchanged from your original */}
      {sourceModal && (
        <SourceModal
          url={sourceModal.url}
          title={sourceModal.title}
          source={sourceModal.source}
          summary={sourceModal.summary}
          description={sourceModal.description}
          status={sourceModal.status}
          urgency={sourceModal.urgency}
          region={sourceModal.region}
          category={sourceModal.category}
          date={sourceModal.date}
          onClose={() => setSourceModal(null)}
        />
      )}
    </>
  );
}

// ── Helper components ──

function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-2">
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        className="text-teal/20"
      >
        <circle
          cx="14"
          cy="14"
          r="12"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M9 14h10M14 9v10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <p className="text-xs font-mono text-teal/40 text-center">{message}</p>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
    >
      <circle
        cx="6"
        cy="6"
        r="4.5"
        stroke="#415A77"
        strokeWidth="1.5"
        strokeDasharray="20"
        strokeDashoffset="10"
        strokeLinecap="round"
      />
    </svg>
  );
}
