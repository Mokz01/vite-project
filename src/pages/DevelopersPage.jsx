import ActionButton from "../components/ActionButton";
import { theme } from "../theme";

const stack = [
  ["Vite 6",         "Build tool — fast HMR, ES modules"],
  ["React 18",       "UI library — functional components + hooks"],
  ["React Router 6", "Client-side routing — BrowserRouter"],
  ["Tailwind CSS 3", "Utility-first CSS — custom theme extended"],
  ["localStorage",   "Zero-backend persistence — useEffect synced"],
];

const team = [
  {
    name:    "Abon, Heather Ryann",
    role:    "Lead Frontend",
    desc:    "UI architecture & component design",
    initials:"HR",
    linkedin:"#",
    github:  "#",
    web:     "#",
  },
  {
    name:    "Belza, Raymond Karl",
    role:    "State Management",
    desc:    "Data flow & application state logic",
    initials:"RK",
    linkedin:"#",
    github:  "#",
    web:     "#",
  },
  {
    name:    "Sapio, Roman Paulo",
    role:    "API Integration",
    desc:    "Backend connectivity & data services",
    initials:"RP",
    linkedin:"#",
    github:  "#",
    web:     "#",
  },
  {
    name:    "Sargento, Sophia Alexandra",
    role:    "UX & Documentation",
    desc:    "User experience & technical writing",
    initials:"SA",
    linkedin:"#",
    github:  "#",
    web:     "#",
  },
];

const sources = [
  {
    label:   "ACLED",
    title:   "Armed Conflict Location & Event Data",
    desc:    "Real-time data on political violence and protest events worldwide.",
    url:     "https://acleddata.com",
    category:"Data",
  },
  {
    label:   "OCHA",
    title:   "UN Office for the Coordination of Humanitarian Affairs",
    desc:    "Humanitarian situation reports, response plans, and coordination data.",
    url:     "https://www.unocha.org",
    category:"Humanitarian",
  },
  {
    label:   "ReliefWeb",
    title:   "ReliefWeb — Humanitarian Information Service",
    desc:    "Curated updates from NGOs, governments, and UN agencies.",
    url:     "https://reliefweb.int",
    category:"Reports",
  },
  {
    label:   "WFP VAM",
    title:   "World Food Programme — Vulnerability Analysis",
    desc:    "Food security assessments and supply chain intelligence.",
    url:     "https://www.wfp.org/food-security",
    category:"Supply",
  },
];

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="4"/>
      <path d="M7 10v7M7 7v.01M12 10v7m0-4a3 3 0 0 1 6 0v4"/>
    </svg>
  );
}
function IconGitHub() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61
               c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77
               5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0
               C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77
               a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7
               A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  );
}
function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10
               15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}
function IconBook() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  );
}
function IconArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M7 17L17 7M7 7h10v10"/>
    </svg>
  );
}

function TeamCard({ member }) {
  return (
    <div className="card-base card-hover p-6 flex flex-col items-center text-center gap-3">
      <div className="w-20 h-20 rounded-full bg-navy flex items-center justify-center
                      text-offwhite font-display text-xl tracking-wide select-none">
        {member.initials}
      </div>

      <div>
        <p className="font-body font-semibold text-sm text-navy leading-snug">
          {member.name}
        </p>
        <p className="section-header mt-0.5">{member.role}</p>
      </div>

      <p className="text-xs text-teal/70 leading-relaxed">
        {member.desc}
      </p>

      <div className="flex items-center gap-2 mt-1">
        {[
          { href: member.linkedin, icon: <IconLinkedIn />, label: "LinkedIn" },
          { href: member.github,   icon: <IconGitHub />,   label: "GitHub"   },
          { href: member.web,      icon: <IconGlobe />,    label: "Website"  },
        ].map(({ href, icon, label }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className="w-8 h-8 rounded-full border border-offwhite-dark
                       flex items-center justify-center text-teal/50
                       hover:border-teal/50 hover:text-teal transition-colors duration-150"
          >
            {icon}
          </a>
        ))}
      </div>
    </div>
  );
}

function SourceCard({ source }) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-base card-hover p-4 flex flex-col gap-2 group"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="tag-base bg-navy/5 text-navy">{source.label}</span>
        <span className="tag-base bg-teal/10 text-teal">{source.category}</span>
      </div>
      <p className="text-sm font-body font-semibold text-navy leading-snug">
        {source.title}
      </p>
      <p className="text-xs text-teal/60 leading-relaxed flex-1">
        {source.desc}
      </p>
      <div className="flex items-center gap-1 text-xs text-teal/50
                      group-hover:text-teal transition-colors duration-150 mt-1">
        <span>{source.url.replace("https://", "")}</span>
        <IconArrow />
      </div>
    </a>
  );
}

export default function DevelopersPage() {
  return (
    <main className="max-w-screen-xl mx-auto px-4 py-10 space-y-14">

      <section className="text-center space-y-3">
        <p className="section-header tracking-widest">The Peace &amp; Supply Signal</p>
        <h1 className="font-display text-4xl md:text-5xl text-navy leading-none uppercase">
          Project Crew &amp; Sources
        </h1>
        <div className="w-12 h-0.5 bg-navy/30 mx-auto" />
        <p className="text-sm text-teal/70 max-w-lg mx-auto leading-relaxed">
          The dedicated team behind the intelligence platform — building clarity from complexity.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
          {team.map((m) => (
            <TeamCard key={m.initials} member={m} />
          ))}
        </div>
      </section>

      <hr className="border-offwhite-dark" />

      <section className="space-y-5">
        <div className="flex items-center gap-2">
          <span className="text-teal"><IconBook /></span>
          <h2 className="font-display text-2xl text-navy">Sources &amp; References</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sources.map((s) => (
            <SourceCard key={s.label} source={s} />
          ))}
        </div>
      </section>

    </main>
  );
}