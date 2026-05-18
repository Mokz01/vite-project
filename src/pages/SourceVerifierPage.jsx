import { useState } from "react";
import ActionButton from "../components/ActionButton";

const TRUSTED_SOURCES = [
  {
    domain: "acleddata.com",
    name: "ACLED",
    fullName: "Armed Conflict Location & Event Data",
    category: "Data",
    trust: "High",
    description:
      "Real-time data on political violence and protest events worldwide. Peer-reviewed methodology.",
    url: "https://acleddata.com",
  },
  {
    domain: "unocha.org",
    name: "OCHA",
    fullName: "UN Office for the Coordination of Humanitarian Affairs",
    category: "Humanitarian",
    trust: "High",
    description:
      "Official UN humanitarian coordination body. Situation reports verified by field teams.",
    url: "https://www.unocha.org",
  },
  {
    domain: "reliefweb.int",
    name: "ReliefWeb",
    fullName: "ReliefWeb — Humanitarian Information Service",
    category: "Reports",
    trust: "High",
    description:
      "Curated updates from NGOs, governments, and UN agencies. Strict editorial standards.",
    url: "https://reliefweb.int",
  },
  {
    domain: "wfp.org",
    name: "WFP",
    fullName: "World Food Programme",
    category: "Supply",
    trust: "High",
    description:
      "UN agency for food security. Vulnerability analysis backed by field data.",
    url: "https://www.wfp.org",
  },
  {
    domain: "reuters.com",
    name: "Reuters",
    fullName: "Reuters News Agency",
    category: "News",
    trust: "High",
    description:
      "International news agency with strict editorial standards and fact-checking processes.",
    url: "https://reuters.com",
  },
  {
    domain: "apnews.com",
    name: "AP News",
    fullName: "Associated Press",
    category: "News",
    trust: "High",
    description:
      "Non-profit news agency. One of the most trusted wire services globally.",
    url: "https://apnews.com",
  },
  {
    domain: "bbc.com",
    name: "BBC",
    fullName: "British Broadcasting Corporation",
    category: "News",
    trust: "High",
    description:
      "Public broadcaster with editorial independence and global fact-checking team.",
    url: "https://bbc.com",
  },
  {
    domain: "rappler.com",
    name: "Rappler",
    fullName: "Rappler — Philippine News",
    category: "PH News",
    trust: "High",
    description:
      "Philippine digital news organization. Known for investigative journalism and fact-checking via Vera Files partnership.",
    url: "https://rappler.com",
  },
  {
    domain: "inquirer.net",
    name: "Inquirer",
    fullName: "Philippine Daily Inquirer",
    category: "PH News",
    trust: "High",
    description:
      "One of the most widely read newspapers in the Philippines with over 40 years of editorial history.",
    url: "https://inquirer.net",
  },
  {
    domain: "mb.com.ph",
    name: "Manila Bulletin",
    fullName: "Manila Bulletin",
    category: "PH News",
    trust: "High",
    description:
      "Oldest existing English-language newspaper in the Philippines, founded 1900. Long-standing editorial standards.",
    url: "https://mb.com.ph",
  },
  {
    domain: "philstar.com",
    name: "PhilStar",
    fullName: "The Philippine Star",
    category: "PH News",
    trust: "High",
    description:
      "Major Philippine broadsheet known for balanced reporting on national and business news.",
    url: "https://philstar.com",
  },
  {
    domain: "abs-cbn.com",
    name: "ABS-CBN",
    fullName: "ABS-CBN News",
    category: "PH News",
    trust: "High",
    description:
      "Major Philippine broadcast network with dedicated news division. Wide regional coverage across the country.",
    url: "https://news.abs-cbn.com",
  },
  {
    domain: "gmanetwork.com",
    name: "GMA News",
    fullName: "GMA Network News",
    category: "PH News",
    trust: "High",
    description:
      "Largest Philippine free-to-air TV network. GMA News Online is one of the most visited Philippine news sites.",
    url: "https://www.gmanetwork.com/news",
  },
  {
    domain: "cnnphilippines.com",
    name: "CNN Philippines",
    fullName: "CNN Philippines",
    category: "PH News",
    trust: "High",
    description:
      "Philippine affiliate of CNN with 24-hour news coverage. Focuses on national and international stories.",
    url: "https://www.cnnphilippines.com",
  },
  {
    domain: "verafiles.org",
    name: "Vera Files",
    fullName: "Vera Files — Philippine Fact-Check",
    category: "PH Fact-Check",
    trust: "High",
    description:
      "Non-profit Philippine journalism organization. Accredited by IFCN as a certified fact-checker.",
    url: "https://verafiles.org",
  },
  {
    domain: "tsek.ph",
    name: "Tsek.ph",
    fullName: "Tsek.ph — Philippine Fact-Check Coalition",
    category: "PH Fact-Check",
    trust: "High",
    description:
      "Coalition of Philippine media organizations dedicated to fact-checking public statements and viral claims.",
    url: "https://tsek.ph",
  },
  {
    domain: "pna.gov.ph",
    name: "PNA",
    fullName: "Philippine News Agency",
    category: "PH Government",
    trust: "Moderate",
    description:
      "Official government news agency. Authoritative for local policy announcements but state-affiliated.",
    url: "https://pna.gov.ph",
  },
  {
    domain: "pcoo.gov.ph",
    name: "PCOO",
    fullName: "Presidential Communications Office",
    category: "PH Government",
    trust: "Moderate",
    description:
      "Official government communications office. Reliable for official statements but represents government position.",
    url: "https://pcoo.gov.ph",
  },
  {
    domain: "bsp.gov.ph",
    name: "BSP",
    fullName: "Bangko Sentral ng Pilipinas",
    category: "PH Government",
    trust: "High",
    description:
      "Philippine central bank. Authoritative source for exchange rates, inflation data, and monetary policy.",
    url: "https://bsp.gov.ph",
  },
  {
    domain: "neda.gov.ph",
    name: "NEDA",
    fullName: "National Economic and Development Authority",
    category: "PH Government",
    trust: "High",
    description:
      "Primary government agency for economic development planning. Source for official Philippine economic data.",
    url: "https://neda.gov.ph",
  },
  {
    domain: "da.gov.ph",
    name: "DA",
    fullName: "Department of Agriculture Philippines",
    category: "PH Government",
    trust: "High",
    description:
      "Official source for rice, food supply, and agricultural data in the Philippines.",
    url: "https://da.gov.ph",
  },
  {
    domain: "who.int",
    name: "WHO",
    fullName: "World Health Organization",
    category: "Health",
    trust: "High",
    description:
      "UN specialized agency for international public health.",
    url: "https://who.int",
  },
  {
    domain: "unhcr.org",
    name: "UNHCR",
    fullName: "UN Refugee Agency",
    category: "Humanitarian",
    trust: "High",
    description:
      "UN agency mandated to protect and support refugees worldwide.",
    url: "https://unhcr.org",
  },
];

const CLICKBAIT_DOMAINS = [
  "trendingph.net",
  "viralph.com",
  "balitangayon.net",
  "pinoyviralnews.com",
  "exposedph.com",
  "dutertewatchph.com",
  "thephilippinestar.xyz",
];

const SOCIAL_DOMAINS = [
  "facebook.com",
  "twitter.com",
  "x.com",
  "tiktok.com",
  "youtube.com",
  "instagram.com",
];

function useVerifierHistory() {
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("verifierHistory") || "[]");
    } catch {
      return [];
    }
  });

  const addEntry = (entry) => {
    const next = [entry, ...history].slice(0, 20);
    setHistory(next);
    localStorage.setItem("verifierHistory", JSON.stringify(next));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("verifierHistory");
  };

  return { history, addEntry, clearHistory };
}

function scoreDomainPattern(hostname) {
  if (hostname.endsWith(".gov.ph"))
    return { trust: "Moderate", reason: "Philippine government domain (.gov.ph)", autoScore: 62 };
  if (hostname.endsWith(".gov"))
    return { trust: "Moderate", reason: "Official government domain (.gov)", autoScore: 65 };
  if (hostname.endsWith(".edu.ph"))
    return { trust: "Moderate", reason: "Philippine academic institution (.edu.ph)", autoScore: 60 };
  if (hostname.endsWith(".edu"))
    return { trust: "Moderate", reason: "Academic institution (.edu)", autoScore: 63 };
  if (hostname.endsWith(".com.ph"))
    return { trust: "Moderate", reason: "Registered Philippine commercial domain (.com.ph)", autoScore: 55 };
  if (hostname.endsWith(".org"))
    return { trust: "Moderate", reason: "Non-profit or organization domain (.org)", autoScore: 55 };
  if (
    hostname.endsWith(".xyz") || hostname.endsWith(".info") ||
    hostname.endsWith(".click") || hostname.endsWith(".buzz") ||
    hostname.endsWith(".biz")
  )
    return {
      trust: "Low",
      reason: `Unregulated TLD (.${hostname.split(".").pop()}) commonly used by low-credibility sites`,
      autoScore: 18,
    };
  return { trust: "Unknown", reason: null, autoScore: 40 };
}

function analyzeUrl(rawUrl) {
  let url = rawUrl.trim();
  if (!url.startsWith("http")) url = "https://" + url;

  let hostname = "";
  try {
    hostname = new URL(url).hostname.replace("www.", "").toLowerCase();
  } catch {
    return { error: "Invalid URL. Please enter a valid web address." };
  }

  const trusted = TRUSTED_SOURCES.find(
    (s) => hostname === s.domain || hostname.endsWith("." + s.domain)
  );
  if (trusted) {
    return {
      hostname,
      status: "trusted",
      trust: trusted.trust,
      source: trusted,
      warnings: [],
      verdict: trusted.trust === "High" ? "Verified Source" : "Generally Reliable",
      patternReason: null,
      showChecklist: false,
    };
  }

  const isClickbait = CLICKBAIT_DOMAINS.some(
    (d) => hostname === d || hostname.endsWith("." + d)
  );
  if (isClickbait) {
    return {
      hostname,
      status: "flagged",
      trust: "Low",
      source: null,
      warnings: [
        "Domain flagged as a known clickbait or misinformation source.",
        "Not recognized by any verified humanitarian or news registry.",
        "Treat content from this source with extreme caution.",
      ],
      verdict: "Flagged Source",
      patternReason: null,
      autoScore: 10,
      showChecklist: false,
    };
  }

  const isSocial = SOCIAL_DOMAINS.some(
    (d) => hostname === d || hostname.endsWith("." + d)
  );
  if (isSocial) {
    return {
      hostname,
      status: "caution",
      trust: "Unverified",
      source: null,
      warnings: [
        "Social media posts are not editorially verified.",
        "Anyone can publish content — no fact-checking process.",
        "Cross-reference with a trusted news source before sharing.",
      ],
      verdict: "Social Media — Unverified",
      patternReason: null,
      autoScore: 30,
      showChecklist: false,
    };
  }

  const pattern = scoreDomainPattern(hostname);

  if (pattern.trust === "Low") {
    return {
      hostname,
      status: "flagged",
      trust: "Low",
      source: null,
      warnings: [
        pattern.reason,
        "Not in our trusted sources registry.",
        "Verify this domain through an independent fact-checker before sharing.",
      ],
      verdict: "Suspicious Domain",
      patternReason: pattern.reason,
      autoScore: pattern.autoScore,
      showChecklist: false,
    };
  }

  if (pattern.trust === "Moderate") {
    return {
      hostname,
      status: "pattern",
      trust: "Moderate",
      source: null,
      warnings: [
        pattern.reason,
        "Not yet in our registry — but the domain type suggests a degree of legitimacy.",
        "Use the checklist below to assess this source further.",
      ],
      verdict: "Possibly Reliable — Verify Manually",
      patternReason: pattern.reason,
      autoScore: pattern.autoScore,
      showChecklist: true,
    };
  }

  return {
    hostname,
    status: "unknown",
    trust: "Unknown",
    source: null,
    warnings: [
      "This domain is not in our registry and has no recognized domain pattern.",
      "We cannot confirm or deny the credibility of this source.",
      "Use the checklist below to manually assess before sharing.",
    ],
    verdict: "Unverified — Proceed with Caution",
    patternReason: null,
    autoScore: 40,
    showChecklist: true,
  };
}

const STATUS_CONFIG = {
  trusted: {
    bg: "bg-jade/10",
    text: "text-jade",
    border: "border-jade/30",
    dot: "bg-jade",
    icon: "✓",
    barColor: "bg-jade",
  },
  pattern: {
    bg: "bg-teal/10",
    text: "text-teal",
    border: "border-teal/30",
    dot: "bg-teal",
    icon: "~",
    barColor: "bg-teal",
  },
  caution: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-300",
    dot: "bg-amber-500",
    icon: "⚠",
    barColor: "bg-amber-400",
  },
  flagged: {
    bg: "bg-alert/10",
    text: "text-alert",
    border: "border-alert/30",
    dot: "bg-alert",
    icon: "✕",
    barColor: "bg-alert",
  },
  unknown: {
    bg: "bg-offwhite-dark",
    text: "text-teal/60",
    border: "border-offwhite-dark",
    dot: "bg-teal/30",
    icon: "?",
    barColor: "bg-teal/30",
  },
};

const CHECKLIST_ITEMS = [
  { id: "about",   label: 'Has a visible "About Us" or "Who We Are" page' },
  { id: "byline",  label: "Articles are bylined with a named, identifiable author" },
  { id: "sources", label: "Content cites primary sources or links to evidence" },
  { id: "ppi",     label: "Registered with Philippine Press Institute (PPI) or PCIJ" },
  { id: "mbfc",    label: 'Findable on Media Bias/Fact Check (mediabiasfactcheck.com)' },
  { id: "dated",   label: "Articles have clear publication dates" },
  { id: "contact", label: "Site has a working contact or corrections email" },
];

function ManualChecklist({ baseScore, hostname }) {
  const [checked, setChecked] = useState({});
  const toggle = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  const passed = Object.values(checked).filter(Boolean).length;
  const total = CHECKLIST_ITEMS.length;
  const bonus = Math.round((passed / total) * 40);
  const finalScore = Math.min(baseScore + bonus, 99);

  const scoreColor =
    finalScore >= 70 ? "text-jade" :
    finalScore >= 45 ? "text-amber-700" :
    "text-alert";

  const scoreBar =
    finalScore >= 70 ? "bg-jade" :
    finalScore >= 45 ? "bg-amber-400" :
    "bg-alert";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="section-header">Manual source assessment</p>
        <span className={`text-xs font-mono font-medium ${scoreColor}`}>
          Adjusted score: {finalScore}/100
        </span>
      </div>
      <div className="w-full h-1.5 bg-offwhite-dark rounded-full overflow-hidden">
        <div
          className={`h-full ${scoreBar} rounded-full transition-all duration-500`}
          style={{ width: `${finalScore}%` }}
        />
      </div>
      <p className="text-[11px] font-mono text-teal/50">
        Check each item that applies to <span className="text-navy">{hostname}</span>
      </p>
      <div className="space-y-2">
        {CHECKLIST_ITEMS.map((item) => (
          <label
            key={item.id}
            className="flex items-start gap-2.5 cursor-pointer group"
          >
            <div
              onClick={() => toggle(item.id)}
              className={`mt-0.5 w-4 h-4 rounded border shrink-0 flex items-center justify-center
                         transition-colors ${
                           checked[item.id]
                             ? "bg-jade border-jade"
                             : "border-offwhite-dark group-hover:border-teal/40"
                         }`}
            >
              {checked[item.id] && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span
              onClick={() => toggle(item.id)}
              className={`text-xs leading-relaxed transition-colors ${
                checked[item.id] ? "text-navy" : "text-teal/60"
              }`}
            >
              {item.label}
            </span>
          </label>
        ))}
      </div>
      <p className="text-[11px] font-mono text-teal/30">
        {passed}/{total} criteria met — score adjusts automatically
      </p>
    </div>
  );
}

export default function SourceVerifierPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { history, addEntry, clearHistory } = useVerifierHistory();

  const handleVerify = () => {
    if (!input.trim()) return;
    setError("");
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const analysis = analyzeUrl(input);
      if (analysis.error) {
        setError(analysis.error);
        setLoading(false);
        return;
      }
      setResult(analysis);
      addEntry({
        id: crypto.randomUUID(),
        url: input.trim(),
        hostname: analysis.hostname,
        verdict: analysis.verdict,
        status: analysis.status,
        date: new Date().toISOString(),
      });
      setLoading(false);
    }, 600);
  };

  const handleHistoryClick = (url) => {
    setInput(url);
    const analysis = analyzeUrl(url);
    if (!analysis.error) setResult(analysis);
  };

  const TRUST_SCORE = { High: 95, Moderate: 65, Unverified: 30, Low: 10, Unknown: 40 };
  const cfg = result ? STATUS_CONFIG[result.status] : null;
  const score = result
    ? (result.autoScore !== undefined ? result.autoScore : TRUST_SCORE[result.trust] ?? 40)
    : null;

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-5 space-y-5">

      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <p className="section-header mb-0.5">Credibility check</p>
          <h1 className="font-display text-2xl text-navy leading-none">
            Source Verifier
          </h1>
        </div>
        <p className="text-[11px] font-mono text-teal/50 max-w-sm text-right leading-relaxed">
          Paste any news URL to check if it comes from a trusted,
          recognized source — or a potential misinformation outlet.
        </p>
      </div>

      <div className="card-base p-5 space-y-3">
        <p className="section-header">Enter a URL to verify</p>
        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <input
            type="url"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleVerify()}
            placeholder="https://facebook.com/post/... or https://reuters.com/article/..."
            className="flex-1 bg-offwhite rounded-lg border border-offwhite-dark
                       text-xs font-mono text-navy px-3 py-2.5 min-w-0
                       focus:outline-none focus:border-teal/40 transition-colors"
          />
          <ActionButton
            variant="primary"
            size="sm"
            onClick={handleVerify}
            disabled={!input.trim() || loading}
          >
            {loading ? "Analyzing…" : "Verify Source"}
          </ActionButton>
        </div>
        {error && (
          <p className="text-xs font-mono text-alert">{error}</p>
        )}
      </div>

      {result && cfg && (
        <div
          className={`card-base border ${cfg.border} p-5 space-y-4 animate-fade-in`}
        >
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full ${cfg.bg} ${cfg.text}
                             flex items-center justify-center text-lg font-display shrink-0`}
              >
                {cfg.icon}
              </div>
              <div>
                <p className={`text-sm font-display font-medium ${cfg.text}`}>
                  {result.verdict}
                </p>
                <p className="text-xs font-mono text-teal/50">{result.hostname}</p>
              </div>
            </div>
            <span className={`tag-base ${cfg.bg} ${cfg.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
              Trust: {result.trust}
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <p className="section-header">Credibility score</p>
              <p className={`text-xs font-mono font-medium ${cfg.text}`}>
                {score}/100
              </p>
            </div>
            <div className="w-full h-1.5 bg-offwhite-dark rounded-full overflow-hidden">
              <div
                className={`h-full ${cfg.barColor} rounded-full transition-all duration-700`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>

          {result.source && (
            <div className="bg-offwhite-light rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="tag-base bg-navy/5 text-navy">
                  {result.source.name}
                </span>
                <span className="tag-base bg-teal/10 text-teal">
                  {result.source.category}
                </span>
              </div>
              <p className="text-xs font-medium text-navy">{result.source.fullName}</p>
              <p className="text-xs text-teal/70 leading-relaxed">
                {result.source.description}
              </p>
              <a
                href={result.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-teal/60 hover:text-teal
                           underline underline-offset-2 transition-colors inline-block"
              >
                {result.source.url} ↗
              </a>
            </div>
          )}

          {result.warnings.length > 0 && (
            <div className="space-y-2">
              <p className="section-header">Assessment</p>
              {result.warnings.map((w, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2 text-xs ${cfg.text}
                               bg-offwhite-light rounded-lg px-3 py-2`}
                >
                  <span className="mt-0.5 shrink-0">—</span>
                  <span className="leading-relaxed">{w}</span>
                </div>
              ))}
            </div>
          )}

          {result.showChecklist && (
            <div className="border-t border-offwhite-dark pt-4">
              <ManualChecklist
                baseScore={score}
                hostname={result.hostname}
              />
            </div>
          )}

          {(result.status === "flagged" ||
            result.status === "unknown" ||
            result.status === "caution" ||
            result.status === "pattern") && (
            <div className="space-y-2">
              <p className="section-header">Cross-reference with trusted sources</p>
              <div className="flex flex-wrap gap-2">
                {TRUSTED_SOURCES.filter((s) => s.trust === "High")
                  .slice(0, 5)
                  .map((s) => (
                    <a
                      key={s.domain}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tag-base bg-jade/10 text-jade hover:bg-jade/20
                                 transition-colors cursor-pointer"
                    >
                      {s.name} ↗
                    </a>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">

        <div className="card-base p-5 space-y-3">
          <div>
            <p className="section-header mb-0.5">Our trusted sources registry</p>
            <p className="text-[11px] font-mono text-teal/40">
              {TRUSTED_SOURCES.length} verified sources
            </p>
          </div>
          <div className="space-y-2">
            {TRUSTED_SOURCES.map((s) => (
              <div
                key={s.domain}
                className="flex items-center justify-between gap-2
                           py-2 border-b border-offwhite-dark last:border-0"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      s.trust === "High" ? "bg-jade" : "bg-amber-400"
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-navy truncate">
                      {s.name}
                    </p>
                    <p className="text-[11px] font-mono text-teal/40 truncate">
                      {s.domain}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="tag-base bg-navy/5 text-navy text-[10px]">
                    {s.category}
                  </span>
                  <span
                    className={`tag-base text-[10px] ${
                      s.trust === "High"
                        ? "bg-jade/10 text-jade"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {s.trust}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-base p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="section-header mb-0.5">Recent verifications</p>
              <p className="text-[11px] font-mono text-teal/40">
                {history.length} URLs checked
              </p>
            </div>
            {history.length > 0 && (
              <ActionButton variant="ghost" size="sm" onClick={clearHistory}>
                Clear
              </ActionButton>
            )}
          </div>

          {history.length === 0 ? (
            <div className="text-center py-10 text-xs font-mono text-teal/30">
              No verifications yet — paste a URL above.
            </div>
          ) : (
            <div className="space-y-2">
              {history.map((h) => {
                const hcfg = STATUS_CONFIG[h.status];
                return (
                  <button
                    key={h.id}
                    onClick={() => handleHistoryClick(h.url)}
                    className="w-full text-left flex items-center justify-between gap-2
                               py-2 border-b border-offwhite-dark last:border-0
                               hover:bg-offwhite-light/60 rounded px-1 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${hcfg.dot}`}
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-mono text-navy truncate">
                          {h.hostname}
                        </p>
                        <p className="text-[11px] font-mono text-teal/40">
                          {new Date(h.date).toLocaleDateString("en-PH", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <span className={`tag-base ${hcfg.bg} ${hcfg.text} shrink-0 text-[10px]`}>
                      {h.verdict}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}