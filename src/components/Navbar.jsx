import { NavLink } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "Dashboard" },
  { to: "/archive", label: "Archive" },
  { to: "/dev", label: "Developers" },
];

export default function Navbar({
  liveRate = "1 USD = 56.50 PHP",
  trend = "up",
}) {
  return (
    <header className="bg-navy sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-screen-xl mx-auto px-5 h-12 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 bg-teal rounded-md flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="5" stroke="#E0E1DD" strokeWidth="1.2" />
              <path
                d="M8 3v5l3 2"
                stroke="#E63946"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="text-offwhite font-display text-sm tracking-wide leading-none">
            Peace &amp; Supply Signal
          </span>
        </div>

        <nav className="flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                  isActive
                    ? "text-offwhite bg-white/10"
                    : "text-offwhite/50 hover:text-offwhite/80"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded px-3 py-1 shrink-0">
          <span className="text-offwhite text-[11px] font-mono">
            {liveRate}
          </span>
          <svg width="10" height="10" viewBox="0 0 10 10">
            {trend === "up" ? (
              <path
                d="M2 7L5 3L8 7"
                stroke="#2A9D5C"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M2 3L5 7L8 3"
                stroke="#E63946"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </div>
      </div>
    </header>
  );
}
