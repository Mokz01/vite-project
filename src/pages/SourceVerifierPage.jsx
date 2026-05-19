import { useState, useEffect } from "react";
import ActionButton from "../components/ActionButton";

// ─── Fact-Check Log Hook ────────────────────────────────────────────────────

const FCL_KEY = "pss_factcheck_log";

function useFactCheckLog() {
  const [entries, setEntries] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(FCL_KEY) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FCL_KEY, JSON.stringify(entries));
    } catch {
      console.warn("localStorage write failed");
    }
  }, [entries]);

  const addEntry = (entry) => {
    const next = [
      {
        ...entry,
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
      },
      ...entries,
    ];
    setEntries(next);
  };

  const updateEntry = (id, changes) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...changes } : e))
    );
  };

  const deleteEntry = (id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  return { entries, addEntry, updateEntry, deleteEntry };
}

// ─── Trusted Sources & Detection Logic ─────────────────────────────────────

const TRUSTED_SOURCES = [
  { domain: "acleddata.com",      name: "ACLED",        fullName: "Armed Conflict Location & Event Data",                 category: "Data",           trust: "High",     description: "Real-time data on political violence and protest events worldwide. Peer-reviewed methodology.", url: "https://acleddata.com" },
  { domain: "unocha.org",         name: "OCHA",         fullName: "UN Office for the Coordination of Humanitarian Affairs", category: "Humanitarian",   trust: "High",     description: "Official UN humanitarian coordination body. Situation reports verified by field teams.", url: "https://www.unocha.org" },
  { domain: "reliefweb.int",      name: "ReliefWeb",    fullName: "ReliefWeb — Humanitarian Information Service",          category: "Reports",        trust: "High",     description: "Curated updates from NGOs, governments, and UN agencies. Strict editorial standards.", url: "https://reliefweb.int" },
  { domain: "wfp.org",            name: "WFP",          fullName: "World Food Programme",                                  category: "Supply",         trust: "High",     description: "UN agency for food security. Vulnerability analysis backed by field data.", url: "https://www.wfp.org" },
  { domain: "reuters.com",        name: "Reuters",      fullName: "Reuters News Agency",                                   category: "News",           trust: "High",     description: "International news agency with strict editorial standards and fact-checking processes.", url: "https://reuters.com" },
  { domain: "apnews.com",         name: "AP News",      fullName: "Associated Press",                                      category: "News",           trust: "High",     description: "Non-profit news agency. One of the most trusted wire services globally.", url: "https://apnews.com" },
  { domain: "bbc.com",            name: "BBC",          fullName: "British Broadcasting Corporation",                      category: "News",           trust: "High",     description: "Public broadcaster with editorial independence and global fact-checking team.", url: "https://bbc.com" },
  { domain: "rappler.com",        name: "Rappler",      fullName: "Rappler — Philippine News",                             category: "PH News",        trust: "High",     description: "Philippine digital news organization. Investigative journalism and Vera Files partnership.", url: "https://rappler.com" },
  { domain: "inquirer.net",       name: "Inquirer",     fullName: "Philippine Daily Inquirer",                             category: "PH News",        trust: "High",     description: "One of the most widely read newspapers in the Philippines.", url: "https://inquirer.net" },
  { domain: "mb.com.ph",          name: "Manila Bulletin", fullName: "Manila Bulletin",                                  category: "PH News",        trust: "High",     description: "Oldest existing English-language newspaper in the Philippines, founded 1900.", url: "https://mb.com.ph" },
  { domain: "philstar.com",       name: "PhilStar",     fullName: "The Philippine Star",                                   category: "PH News",        trust: "High",     description: "Major Philippine broadsheet known for balanced reporting.", url: "https://philstar.com" },
  { domain: "abs-cbn.com",        name: "ABS-CBN",      fullName: "ABS-CBN News",                                          category: "PH News",        trust: "High",     description: "Major Philippine broadcast network with dedicated news division.", url: "https://news.abs-cbn.com" },
  { domain: "gmanetwork.com",     name: "GMA News",     fullName: "GMA Network News",                                      category: "PH News",        trust: "High",     description: "Largest Philippine free-to-air TV network.", url: "https://www.gmanetwork.com/news" },
  { domain: "cnnphilippines.com", name: "CNN Philippines", fullName: "CNN Philippines",                                  category: "PH News",        trust: "High",     description: "Philippine affiliate of CNN with 24-hour news coverage.", url: "https://www.cnnphilippines.com" },
  { domain: "verafiles.org",      name: "Vera Files",   fullName: "Vera Files — Philippine Fact-Check",                   category: "PH Fact-Check",  trust: "High",     description: "Non-profit Philippine journalism organization. IFCN-accredited fact-checker.", url: "https://verafiles.org" },
  { domain: "tsek.ph",            name: "Tsek.ph",      fullName: "Tsek.ph — Philippine Fact-Check Coalition",            category: "PH Fact-Check",  trust: "High",     description: "Coalition of Philippine media organizations dedicated to fact-checking.", url: "https://tsek.ph" },
  { domain: "pna.gov.ph",         name: "PNA",          fullName: "Philippine News Agency",                               category: "PH Government",  trust: "Moderate", description: "Official government news agency. Authoritative for policy announcements but state-affiliated.", url: "https://pna.gov.ph" },
  { domain: "bsp.gov.ph",         name: "BSP",          fullName: "Bangko Sentral ng Pilipinas",                           category: "PH Government",  trust: "High",     description: "Philippine central bank. Authoritative for exchange rates, inflation, and monetary policy.", url: "https://bsp.gov.ph" },
  { domain: "neda.gov.ph",        name: "NEDA",         fullName: "National Economic and Development Authority",           category: "PH Government",  trust: "High",     description: "Primary government agency for economic development planning.", url: "https://neda.gov.ph" },
  { domain: "da.gov.ph",          name: "DA",           fullName: "Department of Agriculture Philippines",                 category: "PH Government",  trust: "High",     description: "Official source for rice, food supply, and agricultural data.", url: "https://da.gov.ph" },
  { domain: "who.int",            name: "WHO",          fullName: "World Health Organization",                             category: "Health",         trust: "High",     description: "UN specialized agency for international public health.", url: "https://who.int" },
  { domain: "unhcr.org",          name: "UNHCR",        fullName: "UN Refugee Agency",                                     category: "Humanitarian",   trust: "High",     description: "UN agency mandated to protect and support refugees worldwide.", url: "https://unhcr.org" },
];

const CLICKBAIT_DOMAINS = ["trendingph.net","viralph.com","balitangayon.net","pinoyviralnews.com","exposedph.com","dutertewatchph.com","thephilippinestar.xyz"];
const SOCIAL_DOMAINS    = ["facebook.com","twitter.com","x.com","tiktok.com","youtube.com","instagram.com"];

function scoreDomainPattern(hostname) {
  if (hostname.endsWith(".gov.ph"))  return { trust: "Moderate", reason: "Philippine government domain (.gov.ph)", autoScore: 62 };
  if (hostname.endsWith(".gov"))     return { trust: "Moderate", reason: "Official government domain (.gov)",      autoScore: 65 };
  if (hostname.endsWith(".edu.ph"))  return { trust: "Moderate", reason: "Philippine academic institution (.edu.ph)", autoScore: 60 };
  if (hostname.endsWith(".edu"))     return { trust: "Moderate", reason: "Academic institution (.edu)",            autoScore: 63 };
  if (hostname.endsWith(".com.ph"))  return { trust: "Moderate", reason: "Registered Philippine commercial domain (.com.ph)", autoScore: 55 };
  if (hostname.endsWith(".org"))     return { trust: "Moderate", reason: "Non-profit or organization domain (.org)", autoScore: 55 };
  if (hostname.endsWith(".xyz") || hostname.endsWith(".info") || hostname.endsWith(".click") || hostname.endsWith(".buzz") || hostname.endsWith(".biz"))
    return { trust: "Low", reason: `Unregulated TLD (.${hostname.split(".").pop()}) commonly used by low-credibility sites`, autoScore: 18 };
  return { trust: "Unknown", reason: null, autoScore: 40 };
}

function analyzeUrl(rawUrl) {
  let url = rawUrl.trim();
  if (!url.startsWith("http")) url = "https://" + url;
  let hostname = "";
  try { hostname = new URL(url).hostname.replace("www.", "").toLowerCase(); }
  catch { return { error: "Invalid URL. Please enter a valid web address." }; }

  const trusted = TRUSTED_SOURCES.find((s) => hostname === s.domain || hostname.endsWith("." + s.domain));
  if (trusted) return { hostname, status: "trusted", trust: trusted.trust, source: trusted, warnings: [], verdict: trusted.trust === "High" ? "Verified Source" : "Generally Reliable", autoScore: trusted.trust === "High" ? 95 : 65, showChecklist: false };

  const isClickbait = CLICKBAIT_DOMAINS.some((d) => hostname === d || hostname.endsWith("." + d));
  if (isClickbait) return { hostname, status: "flagged", trust: "Low", source: null, warnings: ["Domain flagged as a known clickbait or misinformation source.", "Not recognized by any verified humanitarian or news registry.", "Treat content from this source with extreme caution."], verdict: "Flagged Source", autoScore: 10, showChecklist: false };

  const isSocial = SOCIAL_DOMAINS.some((d) => hostname === d || hostname.endsWith("." + d));
  if (isSocial) return { hostname, status: "caution", trust: "Unverified", source: null, warnings: ["Social media posts are not editorially verified.", "Anyone can publish content — no fact-checking process.", "Cross-reference with a trusted news source before sharing."], verdict: "Social Media — Unverified", autoScore: 30, showChecklist: false };

  const pattern = scoreDomainPattern(hostname);
  if (pattern.trust === "Low")      return { hostname, status: "flagged", trust: "Low", source: null, warnings: [pattern.reason, "Not in our trusted sources registry.", "Verify through an independent fact-checker before sharing."], verdict: "Suspicious Domain", autoScore: pattern.autoScore, showChecklist: false };
  if (pattern.trust === "Moderate") return { hostname, status: "pattern", trust: "Moderate", source: null, warnings: [pattern.reason, "Not yet in our registry — but the domain type suggests legitimacy.", "Use the checklist below to assess further."], verdict: "Possibly Reliable — Verify Manually", autoScore: pattern.autoScore, showChecklist: true };

  return { hostname, status: "unknown", trust: "Unknown", source: null, warnings: ["This domain is not in our registry and has no recognized domain pattern.", "We cannot confirm or deny the credibility of this source.", "Use the checklist below to manually assess before sharing."], verdict: "Unverified — Proceed with Caution", autoScore: 40, showChecklist: true };
}

// ─── Config ─────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  trusted: { bg: "bg-jade/10",        text: "text-jade",      border: "border-jade/30",       dot: "bg-jade",      icon: "✓", barColor: "bg-jade" },
  pattern: { bg: "bg-teal/10",        text: "text-teal",      border: "border-teal/30",       dot: "bg-teal",      icon: "~", barColor: "bg-teal" },
  caution: { bg: "bg-amber-50",       text: "text-amber-700", border: "border-amber-300",     dot: "bg-amber-500", icon: "⚠", barColor: "bg-amber-400" },
  flagged: { bg: "bg-alert/10",       text: "text-alert",     border: "border-alert/30",      dot: "bg-alert",     icon: "✕", barColor: "bg-alert" },
  unknown: { bg: "bg-offwhite-dark",  text: "text-teal/60",   border: "border-offwhite-dark", dot: "bg-teal/30",   icon: "?", barColor: "bg-teal/30" },
};

// Fact-check verdict config — matches paper: Verified / Misleading / False / Unverified
const VERDICT_CONFIG = {
  Verified:    { bg: "bg-jade/10",   text: "text-jade",      icon: "✓", dot: "bg-jade" },
  Misleading:  { bg: "bg-gold/10",   text: "text-gold-dark", icon: "⚠", dot: "bg-gold" },
  False:       { bg: "bg-alert/10",  text: "text-alert",     icon: "✕", dot: "bg-alert" },
  Unverified:  { bg: "bg-teal/10",   text: "text-teal",      icon: "?", dot: "bg-teal/50" },
};

const CHECKLIST_ITEMS = [
  { id: "about",   label: 'Has a visible "About Us" or "Who We Are" page' },
  { id: "byline",  label: "Articles are bylined with a named, identifiable author" },
  { id: "sources", label: "Content cites primary sources or links to evidence" },
  { id: "ppi",     label: "Registered with Philippine Press Institute (PPI) or PCIJ" },
  { id: "mbfc",    label: "Findable on Media Bias/Fact Check (mediabiasfactcheck.com)" },
  { id: "dated",   label: "Articles have clear publication dates" },
  { id: "contact", label: "Site has a working contact or corrections email" },
];

// ─── ManualChecklist ────────────────────────────────────────────────────────

function ManualChecklist({ baseScore, hostname }) {
  const [checked, setChecked] = useState({});
  const toggle = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  const passed = Object.values(checked).filter(Boolean).length;
  const finalScore = Math.min(baseScore + Math.round((passed / CHECKLIST_ITEMS.length) * 40), 99);
  const scoreColor = finalScore >= 70 ? "text-jade" : finalScore >= 45 ? "text-amber-700" : "text-alert";
  const scoreBar   = finalScore >= 70 ? "bg-jade"   : finalScore >= 45 ? "bg-amber-400"   : "bg-alert";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="section-header">Manual source assessment</p>
        <span className={`text-xs font-mono font-medium ${scoreColor}`}>Adjusted score: {finalScore}/100</span>
      </div>
      <div className="w-full h-1.5 bg-offwhite-dark rounded-full overflow-hidden">
        <div className={`h-full ${scoreBar} rounded-full transition-all duration-500`} style={{ width: `${finalScore}%` }} />
      </div>
      <p className="text-[11px] font-mono text-teal/50">Check each item that applies to <span className="text-navy">{hostname}</span></p>
      <div className="space-y-2">
        {CHECKLIST_ITEMS.map((item) => (
          <label key={item.id} className="flex items-start gap-2.5 cursor-pointer group">
            <div onClick={() => toggle(item.id)} className={`mt-0.5 w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-colors ${checked[item.id] ? "bg-jade border-jade" : "border-offwhite-dark group-hover:border-teal/40"}`}>
              {checked[item.id] && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
            <span onClick={() => toggle(item.id)} className={`text-xs leading-relaxed transition-colors ${checked[item.id] ? "text-navy" : "text-teal/60"}`}>{item.label}</span>
          </label>
        ))}
      </div>
      <p className="text-[11px] font-mono text-teal/30">{passed}/{CHECKLIST_ITEMS.length} criteria met</p>
    </div>
  );
}

// ─── SaveFindingForm (NEW) ──────────────────────────────────────────────────
// Appears after a verification. Lets user log the claim, notes, and verdict.

const EMPTY_SAVE = { claim: "", notes: "", verdict: "Unverified" };

function SaveFindingForm({ url, hostname, analysisVerdict, onSave }) {
  const [form, setForm]       = useState({ ...EMPTY_SAVE, verdict: mapVerdict(analysisVerdict) });
  const [saved, setSaved]     = useState(false);

  function mapVerdict(v = "") {
    if (v.includes("Verified")) return "Verified";
    if (v.includes("Flagged") || v.includes("Suspicious") || v.includes("Social")) return "Misleading";
    return "Unverified";
  }

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSave = () => {
    if (!form.claim.trim()) return;
    onSave({ url, hostname, ...form });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    setForm({ ...EMPTY_SAVE, verdict: mapVerdict(analysisVerdict) });
  };

  return (
    <div className="border-t border-offwhite-dark pt-4 space-y-3 animate-fade-in">
      <div className="flex items-center gap-2">
        <span className="w-5 h-5 rounded-full bg-navy/10 flex items-center justify-center shrink-0">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </span>
        <p className="section-header mb-0">Save to fact-check log</p>
      </div>
      <p className="text-[11px] font-mono text-teal/50 leading-relaxed">
        Document the viral claim you were checking, your findings, and your verdict.
        This entry will be saved to your personal Fact-Check Archive.
      </p>

      <div>
        <label className="block text-xs font-medium text-teal mb-1">
          Viral claim or headline <span className="text-alert">*</span>
        </label>
        <input
          className="input-base"
          placeholder="e.g. 'NFA rice now ₱20/kg in all wet markets'"
          value={form.claim}
          onChange={set("claim")}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-teal mb-1">Research notes</label>
        <textarea
          className="input-base resize-none"
          rows={3}
          placeholder="What did you find? Cross-references, context, corrections…"
          value={form.notes}
          onChange={set("notes")}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-teal mb-1">Your verdict</label>
        <select className="input-base" value={form.verdict} onChange={set("verdict")}>
          <option value="Verified">✓ Verified — claim is accurate</option>
          <option value="Misleading">⚠ Misleading — partially true but distorted</option>
          <option value="False">✕ False — claim is factually incorrect</option>
          <option value="Unverified">? Unverified — insufficient evidence</option>
        </select>
      </div>

      <ActionButton variant="primary" size="sm" onClick={handleSave} disabled={!form.claim.trim()}>
        {saved ? "✓ Saved to archive" : "Save finding"}
      </ActionButton>
    </div>
  );
}

// ─── FactCheckLog (NEW) ─────────────────────────────────────────────────────
// Full CRUD table for saved fact-check entries.

function FactCheckLog({ entries, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm]   = useState({});

  const startEdit = (entry) => {
    setEditingId(entry.id);
    setEditForm({ claim: entry.claim, notes: entry.notes, verdict: entry.verdict });
  };

  const saveEdit = (id) => {
    onUpdate(id, editForm);
    setEditingId(null);
  };

  const setE = (field) => (e) => setEditForm((f) => ({ ...f, [field]: e.target.value }));

  if (entries.length === 0) {
    return (
      <div className="text-center py-10 text-xs font-mono text-teal/30">
        No fact-check entries yet — verify a URL above and save your findings.
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {entries.map((entry) => {
        const vcfg = VERDICT_CONFIG[entry.verdict] ?? VERDICT_CONFIG.Unverified;
        const isEditing = editingId === entry.id;

        return (
          <div key={entry.id} className={`card-base p-4 animate-fade-in ${isEditing ? "border-teal/30" : ""}`}>
            {isEditing ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-teal mb-1">Viral claim</label>
                  <input className="input-base" value={editForm.claim} onChange={setE("claim")} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-teal mb-1">Research notes</label>
                  <textarea className="input-base resize-none" rows={3} value={editForm.notes} onChange={setE("notes")} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-teal mb-1">Verdict</label>
                  <select className="input-base" value={editForm.verdict} onChange={setE("verdict")}>
                    <option value="Verified">✓ Verified</option>
                    <option value="Misleading">⚠ Misleading</option>
                    <option value="False">✕ False</option>
                    <option value="Unverified">? Unverified</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <ActionButton variant="primary" size="sm" onClick={() => saveEdit(entry.id)}>Update</ActionButton>
                  <ActionButton variant="ghost" size="sm" onClick={() => setEditingId(null)}>Cancel</ActionButton>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`tag-base ${vcfg.bg} ${vcfg.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${vcfg.dot}`} />
                      {entry.verdict}
                    </span>
                    <span className="text-[11px] font-mono text-teal/50">{entry.hostname}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-[11px] font-mono text-teal/40">
                      {new Date(entry.date).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <button onClick={() => startEdit(entry)} className="p-1 rounded text-teal/50 hover:text-teal hover:bg-teal/10 transition-colors ml-1">
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>
                    </button>
                    <button onClick={() => onDelete(entry.id)} className="p-1 rounded text-alert/50 hover:text-alert hover:bg-alert/10 transition-colors">
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 4h10M5 4V3h4v1M5.5 6.5v4M8.5 6.5v4M3 4l.8 7h6.4L11 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                </div>

                <p className="text-xs font-medium text-navy leading-snug mb-1.5">"{entry.claim}"</p>

                {entry.notes && (
                  <p className="text-xs text-teal/70 leading-relaxed mb-2">{entry.notes}</p>
                )}

                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono text-teal/40 hover:text-teal underline underline-offset-2 transition-colors"
                >
                  {entry.url}
                </a>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

function useVerifierHistory() {
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem("verifierHistory") || "[]"); }
    catch { return []; }
  });
  const addEntry = (entry) => {
    const next = [entry, ...history].slice(0, 20);
    setHistory(next);
    localStorage.setItem("verifierHistory", JSON.stringify(next));
  };
  const clearHistory = () => { setHistory([]); localStorage.removeItem("verifierHistory"); };
  return { history, addEntry, clearHistory };
}

export default function SourceVerifierPage() {
  const [input, setInput]   = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");
  const [sourcesExpanded, setSourcesExpanded] = useState(false);
const PREVIEW_COUNT = 5;
const visibleSources = sourcesExpanded
  ? TRUSTED_SOURCES
  : TRUSTED_SOURCES.slice(0, PREVIEW_COUNT);
  

  const { history, addEntry, clearHistory } = useVerifierHistory();
  const { entries, addEntry: addFCEntry, updateEntry, deleteEntry } = useFactCheckLog();

  const handleVerify = () => {
    if (!input.trim()) return;
    setError("");
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const analysis = analyzeUrl(input);
      if (analysis.error) { setError(analysis.error); setLoading(false); return; }
      setResult(analysis);
      addEntry({ id: crypto.randomUUID(), url: input.trim(), hostname: analysis.hostname, verdict: analysis.verdict, status: analysis.status, date: new Date().toISOString() });
      setLoading(false);
    }, 600);
  };

  const handleHistoryClick = (url) => {
    setInput(url);
    const analysis = analyzeUrl(url);
    if (!analysis.error) setResult(analysis);
  };

  const handleSaveFinding = (finding) => {
    addFCEntry(finding);
    // Scroll to archive
    document.getElementById("factcheck-archive")?.scrollIntoView({ behavior: "smooth" });
  };

  const TRUST_SCORE = { High: 95, Moderate: 65, Unverified: 30, Low: 10, Unknown: 40 };
  const cfg   = result ? STATUS_CONFIG[result.status] : null;
  const score = result ? (result.autoScore !== undefined ? result.autoScore : TRUST_SCORE[result.trust] ?? 40) : null;

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-5 space-y-5">

      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <p className="section-header mb-0.5">Credibility check</p>
          <h1 className="font-display text-2xl text-navy leading-none">Source Verifier</h1>
        </div>
        <p className="text-[11px] font-mono text-teal/50 max-w-sm text-right leading-relaxed">
          Paste any news URL to check its credibility — then log your findings to your personal Fact-Check Archive.
        </p>
      </div>

      {/* URL input */}
      <div className="card-base p-5 space-y-3">
        <p className="section-header">Enter a URL to verify</p>
        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <input
            type="url"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleVerify()}
            placeholder="https://facebook.com/post/... or https://reuters.com/article/..."
            className="flex-1 bg-offwhite rounded-lg border border-offwhite-dark text-xs font-mono text-navy px-3 py-2.5 min-w-0 focus:outline-none focus:border-teal/40 transition-colors"
          />
          <ActionButton variant="primary" size="sm" onClick={handleVerify} disabled={!input.trim() || loading}>
            {loading ? "Analyzing…" : "Verify Source"}
          </ActionButton>
        </div>
        {error && <p className="text-xs font-mono text-alert">{error}</p>}
      </div>

      {/* Verification result */}
      {result && cfg && (
        <div className={`card-base border ${cfg.border} p-5 space-y-4 animate-fade-in`}>
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${cfg.bg} ${cfg.text} flex items-center justify-center text-lg font-display shrink-0`}>{cfg.icon}</div>
              <div>
                <p className={`text-sm font-display font-medium ${cfg.text}`}>{result.verdict}</p>
                <p className="text-xs font-mono text-teal/50">{result.hostname}</p>
              </div>
            </div>
            <span className={`tag-base ${cfg.bg} ${cfg.text}`}><span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />Trust: {result.trust}</span>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <p className="section-header">Credibility score</p>
              <p className={`text-xs font-mono font-medium ${cfg.text}`}>{score}/100</p>
            </div>
            <div className="w-full h-1.5 bg-offwhite-dark rounded-full overflow-hidden">
              <div className={`h-full ${cfg.barColor} rounded-full transition-all duration-700`} style={{ width: `${score}%` }} />
            </div>
          </div>

          {result.source && (
            <div className="bg-offwhite-light rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="tag-base bg-navy/5 text-navy">{result.source.name}</span>
                <span className="tag-base bg-teal/10 text-teal">{result.source.category}</span>
              </div>
              <p className="text-xs font-medium text-navy">{result.source.fullName}</p>
              <p className="text-xs text-teal/70 leading-relaxed">{result.source.description}</p>
              <a href={result.source.url} target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono text-teal/60 hover:text-teal underline underline-offset-2 transition-colors inline-block">{result.source.url} ↗</a>
            </div>
          )}

          {result.warnings.length > 0 && (
            <div className="space-y-2">
              <p className="section-header">Assessment</p>
              {result.warnings.map((w, i) => (
                <div key={i} className={`flex items-start gap-2 text-xs ${cfg.text} bg-offwhite-light rounded-lg px-3 py-2`}>
                  <span className="mt-0.5 shrink-0">—</span>
                  <span className="leading-relaxed">{w}</span>
                </div>
              ))}
            </div>
          )}

          {result.showChecklist && (
            <div className="border-t border-offwhite-dark pt-4">
              <ManualChecklist baseScore={score} hostname={result.hostname} />
            </div>
          )}

          {(result.status === "flagged" || result.status === "unknown" || result.status === "caution" || result.status === "pattern") && (
            <div className="space-y-2">
              <p className="section-header">Cross-reference with trusted sources</p>
              <div className="flex flex-wrap gap-2">
                {TRUSTED_SOURCES.filter((s) => s.trust === "High").slice(0, 5).map((s) => (
                  <a key={s.domain} href={s.url} target="_blank" rel="noopener noreferrer" className="tag-base bg-jade/10 text-jade hover:bg-jade/20 transition-colors cursor-pointer">{s.name} ↗</a>
                ))}
              </div>
            </div>
          )}

          {/* ── NEW: Save Finding Form ── */}
          <SaveFindingForm
            url={input.trim()}
            hostname={result.hostname}
            analysisVerdict={result.verdict}
            onSave={handleSaveFinding}
          />
        </div>
      )}

      {/* Bottom two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">

        {/* Trusted sources registry */}
        <div className="card-base p-5 space-y-3">
  <div className="flex items-center justify-between">
    <div>
      <p className="section-header mb-0.5">Our trusted sources registry</p>
      <p className="text-[11px] font-mono text-teal/40">{TRUSTED_SOURCES.length} verified sources</p>
    </div>
    <ActionButton variant="ghost" size="sm" onClick={() => setSourcesExpanded(v => !v)}>
      {sourcesExpanded ? "Show less ↑" : `Show all ${TRUSTED_SOURCES.length} ↓`}
    </ActionButton>
  </div>
  <div className="space-y-2">
    {visibleSources.map((s) => (
      <div key={s.domain} className="flex items-center justify-between gap-2 py-2 border-b border-offwhite-dark last:border-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.trust === "High" ? "bg-jade" : "bg-amber-400"}`} />
          <div className="min-w-0">
            <p className="text-xs font-medium text-navy truncate">{s.name}</p>
            <p className="text-[11px] font-mono text-teal/40 truncate">{s.domain}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="tag-base bg-navy/5 text-navy text-[10px]">{s.category}</span>
          <span className={`tag-base text-[10px] ${s.trust === "High" ? "bg-jade/10 text-jade" : "bg-amber-50 text-amber-700"}`}>{s.trust}</span>
        </div>
      </div>
    ))}
  </div>
    {!sourcesExpanded && (
      <button
        onClick={() => setSourcesExpanded(true)}
        className="w-full text-center text-[11px] font-mono text-teal/40 hover:text-teal py-1 transition-colors"
      >
        + {TRUSTED_SOURCES.length - PREVIEW_COUNT} more sources…
      </button>
    )}
  </div>

        {/* Recent verifications */}
        <div className="card-base p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="section-header mb-0.5">Recent verifications</p>
              <p className="text-[11px] font-mono text-teal/40">{history.length} URLs checked</p>
            </div>
            {history.length > 0 && <ActionButton variant="ghost" size="sm" onClick={clearHistory}>Clear</ActionButton>}
          </div>
          {history.length === 0 ? (
            <div className="text-center py-10 text-xs font-mono text-teal/30">No verifications yet — paste a URL above.</div>
          ) : (
            <div className="space-y-2">
              {history.map((h) => {
                const hcfg = STATUS_CONFIG[h.status];
                return (
                  <button key={h.id} onClick={() => handleHistoryClick(h.url)} className="w-full text-left flex items-center justify-between gap-2 py-2 border-b border-offwhite-dark last:border-0 hover:bg-offwhite-light/60 rounded px-1 transition-colors">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${hcfg.dot}`} />
                      <div className="min-w-0">
                        <p className="text-xs font-mono text-navy truncate">{h.hostname}</p>
                        <p className="text-[11px] font-mono text-teal/40">{new Date(h.date).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })}</p>
                      </div>
                    </div>
                    <span className={`tag-base ${hcfg.bg} ${hcfg.text} shrink-0 text-[10px]`}>{h.verdict}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── NEW: Fact-Check Archive ── */}
      <div id="factcheck-archive" className="card-base p-5 space-y-4">
        <div className="flex items-end justify-between flex-wrap gap-2">
          <div>
            <p className="section-header mb-0.5">Fact-check archive</p>
            <h2 className="font-display text-xl text-navy leading-none">My Saved Findings</h2>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono text-teal/50">
            {Object.entries(VERDICT_CONFIG).map(([verdict, vcfg]) => {
              const count = entries.filter((e) => e.verdict === verdict).length;
              return count > 0 ? (
                <span key={verdict} className={`tag-base ${vcfg.bg} ${vcfg.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${vcfg.dot}`} />
                  {count} {verdict}
                </span>
              ) : null;
            })}
            <span>{entries.length} total</span>
          </div>
        </div>
        <FactCheckLog entries={entries} onUpdate={updateEntry} onDelete={deleteEntry} />
      </div>

    </main>
  );
}