import { useEffect } from "react";
import { theme } from "../theme";

export default function SourceModal({
  url,
  title,
  source,
  summary,
  description,
  status,
  urgency,
  region,
  category,
  date,
  onClose,
}) {
  const text = summary || description || null;
  const statusCfg = status ? (theme.status[status] ?? null) : null;
  const urgencyCfg = urgency ? (theme.urgency[urgency] ?? null) : null;

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-PH", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  // Extract a clean domain label from the URL
  let domain = null;
  try {
    domain = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    domain = url;
  }

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ backgroundColor: "rgba(13, 27, 42, 0.6)", backdropFilter: "blur(3px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative flex flex-col w-full max-w-3xl rounded-2xl overflow-hidden"
        style={{ height: "82vh", backgroundColor: "#ffffff", boxShadow: "0 24px 60px rgba(0,0,0,0.25)" }}
      >

        {/* HEADER BAR */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-jade" />
            <span className="text-xs font-mono font-semibold tracking-widest text-teal uppercase">
              Source Details
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-teal/50 hover:text-navy hover:bg-gray-100 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* META STRIP */}
        <div className="px-5 py-3 border-b border-gray-100 shrink-0 bg-gray-50/60">
          <div className="flex items-center justify-between gap-3 mb-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Domain pill */}
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full border border-gray-200 text-[11px] font-mono text-teal/70 bg-white">
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                  <path d="M5 .5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zM.5 5h9M5 .5C3.5 2 2.5 3.4 2.5 5S3.5 8 5 9.5M5 .5C6.5 2 7.5 3.4 7.5 5S6.5 8 5 9.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
                </svg>
                {domain}
              </span>

              {/* Status badge */}
              {statusCfg && (
                <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-medium ${statusCfg.bg} ${statusCfg.text} border-current/20`}>
                  <span className="text-[10px]">{statusCfg.icon}</span>
                  {status}
                </span>
              )}

              {/* Urgency badge */}
              {urgencyCfg && (
                <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-medium ${urgencyCfg.bg} ${urgencyCfg.text} ${urgencyCfg.border}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${urgencyCfg.dot}`} />
                  {urgency}
                </span>
              )}

              {/* Category */}
              {category && (
                <span className="px-2 py-0.5 rounded-full border border-teal/20 text-[11px] font-medium bg-teal/5 text-teal">
                  {category}
                </span>
              )}

              {/* Source type */}
              {source && (
                <span className="text-[11px] font-mono text-teal/50">{source}</span>
              )}

              {/* Region */}
              {region && (
                <span className="flex items-center gap-1 text-[11px] font-mono text-teal/50">
                  <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                    <path d="M5 .5A3 3 0 015 6.5S2 4 2 2.5A3 3 0 015 .5z" stroke="currentColor" strokeWidth="0.9" />
                    <circle cx="5" cy="2.5" r="0.8" fill="currentColor" />
                  </svg>
                  {region}
                </span>
              )}
            </div>

            {/* Date */}
            {formattedDate && (
              <span className="text-[11px] font-mono text-teal/40 shrink-0">{formattedDate}</span>
            )}
          </div>

          {/* Title */}
          <h2 className="text-sm font-semibold text-navy leading-snug">
            {title}
          </h2>

          {/* Description */}
          {text && (
            <p className="text-xs text-teal/70 leading-relaxed mt-1.5">
              {text}
            </p>
          )}
        </div>

        {/* IFRAME */}
        <div className="flex-1 relative bg-gray-50">
          <iframe
            src={url}
            title={title}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            referrerPolicy="no-referrer"
          />
          {/* Sits behind iframe — visible only when iframe fails to load */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none"
            style={{ zIndex: -1 }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-gray-300">
              <rect x="6" y="8" width="28" height="22" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M14 19h12M14 23h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M20 30v4M16 34h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p className="text-xs font-mono text-gray-400 text-center">
              This source does not allow embedding.
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 shrink-0 bg-white">
          <p className="text-[10px] font-mono text-teal/40 truncate max-w-xs">{url}</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-navy hover:bg-navy/80 transition-colors"
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M5 2H2.5A1.5 1.5 0 001 3.5v6A1.5 1.5 0 002.5 11h6A1.5 1.5 0 0010 9.5V7M7 1h4v4M11 1L5.5 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Open original
          </a>
        </div>

      </div>
    </div>
  );
}