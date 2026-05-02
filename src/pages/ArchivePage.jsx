import { useState } from "react";
import ActionButton from "../components/ActionButton";
import { globalSignals } from "../data/signals";
import { useSignalLogs } from "../hooks/useSignalLogs";
import { theme } from "../theme";

export default function ArchivePage() {
  const { logs, deleteLog } = useSignalLogs();
  const [filter, setFilter] = useState("All");

  const allEntries = [
    ...globalSignals.map((s) => ({ ...s, urgency: null })),
    ...logs,
  ];

  const filtered =
    filter === "All" ? allEntries : allEntries.filter((e) => e.type === filter);

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-5">
      <div className="mb-5 flex items-end justify-between flex-wrap gap-3">
        <div>
          <p className="section-header mb-0.5">Read-only archive</p>
          <h1 className="font-display text-2xl text-navy leading-none">
            All Signal Records
          </h1>
        </div>
        <div className="flex gap-1">
          {["All", "Global", "Local"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs font-mono px-3 py-1 rounded-full border transition-colors ${
                filter === f
                  ? "bg-navy text-offwhite border-navy"
                  : "border-teal/30 text-teal hover:bg-teal/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="card-base overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-offwhite-dark">
              {[
                "Type",
                "Title",
                "Source",
                "Date",
                "Status",
                "Urgency",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left text-[11px] font-mono font-medium text-teal/60 uppercase tracking-widest px-4 py-3 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-offwhite-dark">
            {filtered.map((entry, i) => {
              const statusCfg =
                theme.status[entry.status] ?? theme.status.Pending;
              const urgencyCfg = entry.urgency
                ? theme.urgency[entry.urgency]
                : null;
              return (
                <tr
                  key={entry.id}
                  className="hover:bg-offwhite-light/60 transition-colors animate-fade-in"
                  style={{
                    animationDelay: `${i * 0.03}s`,
                    animationFillMode: "both",
                  }}
                >
                  <td className="px-4 py-3">
                    <span
                      className={`tag-base ${entry.type === "Global" ? "bg-teal/10 text-teal" : "bg-navy/10 text-navy"}`}
                    >
                      {entry.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <p className="text-xs font-medium text-navy leading-snug line-clamp-2">
                      {entry.title}
                    </p>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-xs font-mono text-teal/80">
                      {entry.source}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-xs font-mono text-teal/50">
                      {entry.date
                        ? new Date(entry.date).toLocaleDateString("en-PH", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`tag-base ${statusCfg.bg} ${statusCfg.text}`}
                    >
                      {statusCfg.icon} {entry.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {urgencyCfg ? (
                      <span
                        className={`tag-base ${urgencyCfg.bg} ${urgencyCfg.text}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${urgencyCfg.dot}`}
                        />
                        {entry.urgency}
                      </span>
                    ) : (
                      <span className="text-xs text-teal/30 font-mono">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {entry.type === "Local" ? (
                      <ActionButton
                        variant="danger"
                        size="sm"
                        onClick={() => deleteLog(entry.id)}
                      >
                        Delete
                      </ActionButton>
                    ) : (
                      <span className="text-xs text-teal/30 font-mono">
                        read-only
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-xs font-mono text-teal/40">
            No records match the current filter.
          </div>
        )}
      </div>
    </main>
  );
}
