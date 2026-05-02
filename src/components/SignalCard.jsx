import { theme } from "../theme";

export default function SignalCard({
  title,
  source,
  date,
  status = "Verified",
  type = "Global",
  urgency,
  summary,
  category,
  highlighted = false,
  animDelay = 0,
  onEdit,
  onDelete,
}) {
  const statusCfg = theme.status[status] ?? theme.status.Pending;
  const urgencyCfg = urgency
    ? (theme.urgency[urgency] ?? theme.urgency.Low)
    : null;

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-PH", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <article
      className={`card-base card-hover animate-slide-up p-4 ${highlighted ? "border-l-2 border-l-alert bg-white" : ""}`}
      style={{ animationDelay: `${animDelay}s`, animationFillMode: "both" }}
    >
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="flex items-center flex-wrap gap-1.5">
          <span className="text-xs font-mono font-medium text-teal">
            {source}
          </span>
          <span className={`tag-base ${statusCfg.bg} ${statusCfg.text}`}>
            <span className="text-[10px]">{statusCfg.icon}</span>
            {status}
          </span>
          {category && (
            <span className="tag-base bg-teal/10 text-teal">{category}</span>
          )}
          {urgencyCfg && (
            <span
              className={`tag-base ${urgencyCfg.bg} ${urgencyCfg.text} border ${urgencyCfg.border}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${urgencyCfg.dot}`} />
              {urgency}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <time className="text-[11px] font-mono text-teal/50">
            {formattedDate}
          </time>
          {type === "Local" && (
            <div className="flex gap-0.5 ml-1">
              {onEdit && (
                <button
                  onClick={onEdit}
                  aria-label="Edit entry"
                  className="p-1 rounded text-teal/60 hover:text-teal hover:bg-teal/10 transition-colors"
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
              {onDelete && (
                <button
                  onClick={onDelete}
                  aria-label="Delete entry"
                  className="p-1 rounded text-alert/60 hover:text-alert hover:bg-alert/10 transition-colors"
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 4h10M5 4V3h4v1M5.5 6.5v4M8.5 6.5v4M3 4l.8 7h6.4L11 4"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <h3 className="text-sm font-semibold text-navy leading-snug mb-1.5">
        {highlighted && (
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-alert animate-pulse-dot mr-1.5 mb-0.5" />
        )}
        {title}
      </h3>
      {summary && (
        <p className="text-xs text-teal/80 leading-relaxed">{summary}</p>
      )}
    </article>
  );
}
