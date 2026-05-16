    import React, { useState } from 'react';

export default function HomePage() {
  // Sample state para sa mga logs (dito papasok yung CRUD niyo)
  const [logs, setLogs] = useState([
    { id: 1, title: 'Gas Price Hike in Manila', urgency: 'High', region: 'Metro Manila', description: 'Tensions in the Middle East causing pump prices to spike.' },
    { id: 2, title: 'Fertilizer Cost Increase', urgency: 'Medium', region: 'Region IV-A', description: 'Global supply chain bottlenecks affecting local agricultural inputs.' }
  ]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 font-sans">
      
      {/* 1. ECONOMIC SIGNAL INDICATOR (HEADER BAR) */}
      <header className="flex flex-wrap justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-lg mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-wide text-indigo-400">⚡ Peace & Supply Signal</span>
        </div>
        
        {/* Micro-trackers para sa Local Context */}
        <div className="flex space-x-4 text-xs md:text-sm">
          <div className="bg-slate-900 px-3 py-1.5 rounded-md border border-slate-700">
            💵 USD/PHP: <span className="text-emerald-400 font-semibold">₱56.50 🔻</span>
          </div>
          <div className="bg-slate-900 px-3 py-1.5 rounded-md border border-slate-700">
            ⛽ Diesel: <span className="text-rose-400 font-semibold">₱62.40 🔺</span>
          </div>
          <div className="bg-slate-900 px-3 py-1.5 rounded-md border border-slate-700">
            🍚 Rice (kg): <span className="text-amber-400 font-semibold">₱52.00 ⚖️</span>
          </div>
        </div>
      </header>

      {/* 2. SPLIT-SCREEN INTEL FEED LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT SIDE: News API / Live Feed (4 Columns) */}
        <section className="lg:col-span-4 bg-slate-800 p-5 rounded-xl border border-slate-700 h-[calc(100vh-160px)] overflow-y-auto">
          <h2 className="text-lg font-bold mb-4 flex items-center justify-between">
            <span>🌐 Global Intelligence Feed</span>
            <span className="animate-pulse bg-emerald-500 w-2 h-2 rounded-full"></span>
          </h2>
          
          {/* Skeleton Loader Placeholder (Kapag loading o unavailable ang API) */}
          <div className="space-y-4">
            <div className="p-4 bg-slate-900 rounded-lg border border-slate-700 animate-pulse">
              <div className="h-4 bg-slate-700 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-slate-700 rounded w-full mb-2"></div>
              <div className="h-3 bg-slate-700 rounded w-5/6"></div>
            </div>
            <div className="p-4 bg-slate-900 rounded-lg border border-slate-700 opacity-50">
              <p className="text-xs text-slate-400 text-center py-4">Live feed connecting... Click refresh if it persists.</p>
            </div>
          </div>
        </section>

        {/* RIGHT SIDE: Local Impact Log & CRUD Form (8 Columns) */}
        <section className="lg:col-span-8 space-y-6 h-[calc(100vh-160px)] overflow-y-auto pr-2">
          
          {/* INPUT FORM CONTAINER */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md">
            <h3 className="text-md font-semibold text-indigo-300 uppercase tracking-wider mb-4">✍️ Log New Signal</h3>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Signal Title *</label>
                  <input type="text" placeholder="e.g. Localized Gas Price Spike" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Region</label>
                  <input type="text" placeholder="e.g. Metro Manila" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Urgency Level</label>
                  <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 text-slate-300">
                    <option value="Low">Low (Informational)</option>
                    <option value="Medium">Medium (Monitor Closely)</option>
                    <option value="High">High (Immediate Impact)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Source URL</label>
                  <input type="url" placeholder="https://..." className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Description / Observations</label>
                <textarea rows="3" placeholder="Add context, observations, or field notes..." className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"></textarea>
              </div>

              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-lg text-sm transition shadow-lg shadow-indigo-600/20">
                Save Signal Entry
              </button>
            </form>
          </div>

          {/* LIST OF LOGS WITH DYNAMIC VISUAL ACCENTS */}
          <div className="space-y-3">
            <h3 className="text-md font-semibold text-slate-400">My Local Impact Log ({logs.length} entries)</h3>
            
            {logs.map((log) => (
              <div 
                key={log.id} 
                className={`p-4 rounded-xl bg-slate-800 border-l-4 shadow-sm flex flex-col justify-between transition hover:bg-slate-750
                  ${log.urgency === 'High' ? 'border-l-rose-500 border-y-slate-700 border-r-slate-700 border' : ''}
                  ${log.urgency === 'Medium' ? 'border-l-amber-500 border-y-slate-700 border-r-slate-700 border' : ''}
                  ${log.urgency === 'Low' ? 'border-l-sky-500 border-y-slate-700 border-r-slate-700 border' : ''}
                `}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-base text-slate-100">{log.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{log.description}</p>
                  </div>
                  {/* Badges */}
                  <div className="flex space-x-2">
                    <span className="bg-slate-900 px-2 py-0.5 rounded text-[10px] uppercase font-bold text-slate-400 border border-slate-700">
                      📍 {log.region}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold
                      ${log.urgency === 'High' ? 'bg-rose-500/10 text-rose-400' : ''}
                      ${log.urgency === 'Medium' ? 'bg-amber-500/10 text-amber-400' : ''}
                      ${log.urgency === 'Low' ? 'bg-sky-500/10 text-sky-400' : ''}
                    `}>
                      {log.urgency}
                    </span>
                  </div>
                </div>

                {/* CRUD Micro-actions */}
                <div className="flex justify-end space-x-3 pt-2 mt-2 border-t border-slate-700/50 text-xs">
                  <button className="text-slate-400 hover:text-indigo-400 transition">✏️ Edit</button>
                  <button className="text-slate-400 hover:text-rose-400 transition">🗑️ Delete</button>
                </div>
              </div>
            ))}
          </div>

        </section>
      </div>

    </div>
  );
}