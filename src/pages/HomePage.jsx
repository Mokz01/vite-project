import { useState } from "react";
import SignalCard from "../components/SignalCard";
import LogForm from "../components/LogForm";
import FilterBar from "../components/FilterBar";
import { useSignalLogs } from "../hooks/useSignalLogs";
import { useNewsFeed } from "../hooks/useNewsFeed";
import { useFilters } from "../hooks/useFilters";
import SourceModal from "../components/SourceModal";
import ActionButton from "../components/ActionButton";

export default function HomePage() {
  const { logs, addLog, updateLog, deleteLog } = useSignalLogs();
  const { articles, loading, error } = useNewsFeed();
  const { filters, handleFilterChange, applyFilters } = useFilters();
  const [editingEntry, setEditingEntry] = useState(null);
  const [sourceModal, setSourceModal] = useState(null);
  const [logModalOpen, setLogModalOpen] = useState(false);

  const handleSave = (formData) => {
    if (editingEntry) {
      updateLog(editingEntry.id, formData);
      setEditingEntry(null);
    } else {
      addLog(formData);
    }
    setLogModalOpen(false);
  };

  const handleEdit = (log) => {
    setEditingEntry(log);
    setLogModalOpen(true);
  };

  const handleCloseLogModal = () => {
    setLogModalOpen(false);
    setEditingEntry(null);
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
                  <div key={n} className="card-base p-4 space-y-2 animate-pulse">
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
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-teal/50">
                  {filteredLocal.length} of {logs.length} entries · saved
                </span>
                <ActionButton
                  variant="primary"
                  size="sm"
                  onClick={() => { setEditingEntry(null); setLogModalOpen(true); }}
                >
                  + New log
                </ActionButton>
              </div>
            </div>

            {/* Empty — no logs at all */}
            {logs.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 4v10M4 9h10" stroke="#415A77" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-xs font-mono text-teal/40 text-center">
                  No entries yet — click <span className="text-navy font-medium">+ New log</span> to add your first signal.
                </p>
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
                    onEdit={() => handleEdit(log)}
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

      {/* ── Log Form Modal ── */}
      {logModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(13, 27, 42, 0.6)", backdropFilter: "blur(4px)" }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in overflow-y-auto"
            style={{ maxHeight: "90vh" }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-offwhite-dark">
              <div>
                <p className="section-header mb-0">Signal log</p>
                <p className="text-[11px] font-mono text-teal/40">
                  {editingEntry ? "Editing entry" : "New local impact entry"}
                </p>
              </div>
              <button
                onClick={handleCloseLogModal}
                className="w-7 h-7 rounded-full flex items-center justify-center
                           text-teal/40 hover:text-teal hover:bg-offwhite transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Modal body */}
            <div className="p-5">
              <LogForm
                onSave={handleSave}
                editingEntry={editingEntry}
                onCancelEdit={handleCloseLogModal}
              />
            </div>
          </div>
        </div>
      )}

      {/* Source Modal */}
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
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-teal/20">
        <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 14h10M14 9v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <p className="text-xs font-mono text-teal/40 text-center">{message}</p>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin" width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="4.5" stroke="#415A77" strokeWidth="1.5"
        strokeDasharray="20" strokeDashoffset="10" strokeLinecap="round" />
    </svg>
  );
}