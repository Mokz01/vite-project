import { useState } from "react";
import SignalCard from "../components/SignalCard";
import LogForm from "../components/LogForm";
import { globalSignals } from "../data/signals";
import { useSignalLogs } from "../hooks/useSignalLogs";

export default function HomePage() {
  const { logs, addLog, updateLog, deleteLog } = useSignalLogs();
  const [editingEntry, setEditingEntry] = useState(null);

  const handleSave = (formData) => {
    if (editingEntry) {
      updateLog(editingEntry.id, formData);
      setEditingEntry(null);
    } else {
      addLog(formData);
    }
  };

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-5">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="section-header mb-0.5">Live dashboard</p>
          <h1 className="font-display text-2xl text-navy leading-none">
            Signal Intelligence
          </h1>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-teal/60">
          <span className="w-1.5 h-1.5 rounded-full bg-jade animate-pulse-dot" />
          Live feed ·{" "}
          {new Date().toLocaleDateString("en-PH", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {/* LEFT — Global Feed */}
        <section className="bg-offwhite-light rounded-2xl p-4 border border-offwhite-dark">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-teal tracking-wide">
              Global signal feed
            </h2>
            <span className="text-[11px] font-mono text-teal/50">
              {globalSignals.length} signals
            </span>
          </div>
          <div className="space-y-2.5 stagger">
            {globalSignals.map((signal, i) => (
              <SignalCard key={signal.id} {...signal} animDelay={i * 0.05} />
            ))}
          </div>
        </section>

        {/* RIGHT — Local Log */}
        <section className="bg-offwhite-light rounded-2xl p-4 border border-offwhite-dark">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-teal tracking-wide">
              My local impact log
            </h2>
            <span className="text-[11px] font-mono text-teal/50">
              {logs.length} entries · localStorage
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

          {logs.length === 0 ? (
            <div className="text-center py-10 text-xs font-mono text-teal/40">
              No entries yet — add your first signal log above.
            </div>
          ) : (
            <div className="space-y-2.5 stagger">
              {logs.map((log, i) => (
                <SignalCard
                  key={log.id}
                  {...log}
                  animDelay={i * 0.05}
                  onEdit={() => setEditingEntry(log)}
                  onDelete={() => deleteLog(log.id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
