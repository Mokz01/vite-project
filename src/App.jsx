import React, { useState } from 'react';
import { AlertTriangle, Globe, MapPin, Search, ShieldCheck, Trash2, Edit3, PlusCircle } from 'lucide-react';

const PeaceAndSupplyDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- TOP NAVIGATION BAR --- */}
      <nav className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-blue-400" size={28} />
          <h1 className="text-xl font-bold tracking-tight">THE PEACE & SUPPLY SIGNAL</h1>
        </div>
        <div className="flex gap-6 text-sm font-medium">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`hover:text-blue-400 transition ${activeTab === 'dashboard' ? 'text-blue-400 border-b-2 border-blue-400' : ''}`}
          >
            DASHBOARD
          </button>
          <button 
            onClick={() => setActiveTab('archive')}
            className={`hover:text-blue-400 transition ${activeTab === 'archive' ? 'text-blue-400 border-b-2 border-blue-400' : ''}`}
          >
            FACT-CHECK ARCHIVE
          </button>
          <button className="hover:text-blue-400 transition">DEVELOPERS</button>
        </div>
      </nav>

      {/* --- ECONOMIC SIGNAL TICKER --- */}
      <div className="bg-blue-600 text-white py-2 px-4 flex gap-8 overflow-hidden whitespace-nowrap text-xs font-mono">
        <span>USD/PHP: 56.24 ▲ +0.12</span>
        <span>BRENT CRUDE: $82.45 ▼ -0.45</span>
        <span>WHEAT FUTURES: +2.1% (Potential Flour Price Hike)</span>
        <span>STATUS: MONITORING GLOBAL SUPPLY CHAIN SIGNALS</span>
      </div>

      <main className="p-6">
        {activeTab === 'dashboard' ? (
          /* --- DUAL-PANE INTERFACE --- */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-180px)]">
            
            {/* LEFT SIDE: GLOBAL INTELLIGENCE (API MOCK) */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
              <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
                <h2 className="font-bold flex items-center gap-2"><Globe size={18} /> GLOBAL INTELLIGENCE FEED</h2>
                <span className="text-[10px] bg-slate-200 px-2 py-1 rounded">SOURCE: REUTERS / UN</span>
              </div>
              <div className="p-4 overflow-y-auto space-y-4">
                {/* Mock News Item */}
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                  <h3 className="font-bold text-sm">Escalation in Middle East Maritime Routes</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Cargo vessels redirected around Cape of Good Hope due to safety concerns. Delivery times for industrial parts expected to increase by 14 days.
                  </p>
                  <button className="mt-3 text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">
                    Analyze Local Impact →
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: LOCAL IMPACT WORKSPACE (CRUD MOCK) */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
              <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
                <h2 className="font-bold flex items-center gap-2"><MapPin size={18} /> LOCAL IMPACT LOGS</h2>
                <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full flex items-center gap-1 hover:bg-blue-700 transition">
                  <PlusCircle size={14} /> NEW SIGNAL
                </button>
              </div>
              <div className="p-4 overflow-y-auto space-y-4">
                {/* Mock CRUD Log */}
                <div className="p-4 border border-slate-100 rounded-lg shadow-sm hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded uppercase">Urgency: High</span>
                    <div className="flex gap-2 text-slate-400">
                      <Edit3 size={14} className="hover:text-blue-500 cursor-pointer" />
                      <Trash2 size={14} className="hover:text-red-500 cursor-pointer" />
                    </div>
                  </div>
                  <h3 className="font-bold text-sm mt-2 italic">Potential Gas Price Hike (Manila)</h3>
                  <p className="text-xs text-slate-600 mt-1 italic">
                    Based on Reuters news regarding maritime routes. Expect a PHP 2.00 - 3.50 increase in local pumps by next Tuesday.
                  </p>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* --- FACT-CHECK ARCHIVE VIEW --- */
          <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold">Fact-Check Archive</h2>
              <p className="text-slate-500 text-sm italic">"A private laboratory for truth in a world of noise."</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex gap-2 mb-6">
                <input 
                  type="text" 
                  placeholder="Paste viral claim or social media link here..." 
                  className="flex-1 border p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-bold">ANALYZE</button>
              </div>

              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-slate-400 uppercase text-[10px] tracking-widest">
                    <th className="pb-3 px-2 font-medium">Claim / Source</th>
                    <th className="pb-3 px-2 font-medium">Status</th>
                    <th className="pb-3 px-2 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-4 px-2">
                      <p className="font-bold">Claim: "National Rice Shortage announced for Q3"</p>
                      <span className="text-[10px] text-blue-500 underline">fb.com/viral-post-123</span>
                    </td>
                    <td className="py-4 px-2">
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-[10px] font-bold uppercase">MISLEADING</span>
                    </td>
                    <td className="py-4 px-2 text-right">
                       <button className="text-slate-400 hover:text-blue-500 mr-3">Edit</button>
                       <button className="text-slate-400 hover:text-red-500">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PeaceAndSupplyDashboard;