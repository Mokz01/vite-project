import ActionButton from "../components/ActionButton";
import { theme } from "../theme";

const stack = [
  ["Vite 6", "Build tool — fast HMR, ES modules"],
  ["React 18", "UI library — functional components + hooks"],
  ["React Router 6", "Client-side routing — BrowserRouter"],
  ["Tailwind CSS 3", "Utility-first CSS — custom theme extended"],
  ["localStorage", "Zero-backend persistence — useEffect synced"],
];

export default function DevelopersPage() {
  return (
    <main className="max-w-screen-xl mx-auto px-4 py-5">
      <div className="mb-6">
        <p className="section-header mb-0.5">Architecture reference</p>
        <h1 className="font-display text-2xl text-navy leading-none">
          Component Tree &amp; Design System
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="space-y-4">
          <p className="section-header">Design tokens — src/theme.js</p>
          <div className="card-base p-4 space-y-3">
            {Object.entries(theme.colors).map(([name, hex]) => (
              <div key={name} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-md shrink-0 border border-offwhite-dark"
                  style={{ background: hex }}
                />
                <div>
                  <p className="text-xs font-mono text-navy">
                    {name} · {hex}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="section-header">ActionButton variants</p>
          <div className="card-base p-4 flex flex-wrap gap-2">
            <ActionButton variant="primary" size="sm">
              Primary
            </ActionButton>
            <ActionButton variant="secondary" size="sm">
              Secondary
            </ActionButton>
            <ActionButton variant="danger" size="sm">
              Danger
            </ActionButton>
            <ActionButton variant="ghost" size="sm">
              Ghost
            </ActionButton>
            <ActionButton variant="primary" size="md" disabled>
              Disabled
            </ActionButton>
          </div>
        </div>

        <div className="space-y-4">
          <p className="section-header">Tech stack</p>
          <div className="card-base p-4 space-y-2">
            {stack.map(([tech, desc]) => (
              <div
                key={tech}
                className="flex items-baseline justify-between gap-2"
              >
                <span className="text-xs font-mono font-medium text-navy">
                  {tech}
                </span>
                <span className="text-[11px] text-teal/60 text-right">
                  {desc}
                </span>
              </div>
            ))}
          </div>

          <p className="section-header">Urgency + status tags</p>
          <div className="card-base p-4 flex flex-wrap gap-2">
            {Object.entries(theme.urgency).map(([level, cfg]) => (
              <span key={level} className={`tag-base ${cfg.bg} ${cfg.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                {level}
              </span>
            ))}
            {Object.entries(theme.status).map(([status, cfg]) => (
              <span key={status} className={`tag-base ${cfg.bg} ${cfg.text}`}>
                {cfg.icon} {status}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
