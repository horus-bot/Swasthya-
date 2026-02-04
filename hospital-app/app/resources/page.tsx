"use client";

import { useEffect, useState } from "react";

type Machine = {
  id: string;
  name: string;
  location?: string;
  available: number;
  total: number;
};

type Request = {
  id: string;
  machineId: string;
  quantity: number;
  note?: string;
  time: string;
};

const sampleMachines: Machine[] = [
  { id: "m1", name: "Ventilator - Model A", location: "ICU", total: 10, available: 2 },
  { id: "m2", name: "Oxygen Cylinder", location: "Store", total: 50, available: 18 },
  { id: "m3", name: "X-Ray Machine", location: "Radiology", total: 2, available: 1 },
];

export default function ResourcesPage() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [selected, setSelected] = useState<string>(sampleMachines[0].id);
  const [qty, setQty] = useState<number>(1);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    try {
      const rawM = localStorage.getItem("hospital_machines");
      const rawR = localStorage.getItem("resource_requests");
      setMachines(rawM ? JSON.parse(rawM) : sampleMachines);
      setRequests(rawR ? JSON.parse(rawR) : []);
    } catch (e) {
      setMachines(sampleMachines);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("hospital_machines", JSON.stringify(machines));
  }, [machines]);

  useEffect(() => {
    localStorage.setItem("resource_requests", JSON.stringify(requests));
  }, [requests]);

  const submitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const id = `r_${Date.now()}`;
    const req: Request = { id, machineId: selected, quantity: qty, note, time: new Date().toISOString() };

    const machine = machines.find(m => m.id === selected);
    if (!machine) {
      setError('Selected machine not found');
      return;
    }

    if (qty < 1) {
      setError('Quantity must be at least 1');
      return;
    }

    if (qty > machine.available) {
      setError('Requested quantity exceeds available units');
      return;
    }

    // optimistic local update: reduce available count and add request
    setRequests((s) => [req, ...s]);
    setMachines((m) => m.map(x => x.id === selected ? { ...x, available: Math.max(0, x.available - qty) } : x));

    setQty(1);
    setNote("");
    setSuccessMsg('Request sent');
    setTimeout(() => setSuccessMsg(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-slate-50 to-teal-50 p-6" style={{ animation: 'fadeIn 0.6s ease-out' }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes machineSlideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6" style={{ animation: 'slideInDown 0.6s ease-out' }}>
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Resources & Machines</h2>
            <p className="text-sm text-slate-600 mt-1">Current availability and quick resource request form.</p>
          </div>
        </div>

        {machines.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-sm text-center border border-slate-100" style={{ animation: 'slideInUp 0.6s ease-out' }}>
            <svg width="96" height="96" viewBox="0 0 24 24" fill="none" className="mx-auto mb-4 opacity-60"><path d="M12 3v6" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <h3 className="text-xl font-bold text-slate-800 mt-4">No machines available</h3>
            <p className="text-sm text-slate-500 mt-2">You can restore sample machines to see the demo layout.</p>
            <div className="mt-6">
              <button onClick={() => setMachines(sampleMachines)} className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium">Restore sample machines</button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {machines.map((m, idx) => {
                const percent = Math.round((m.available / Math.max(1, m.total)) * 100);
                return (
                  <div key={m.id} className={`bg-white p-5 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-between border border-slate-100 hover:border-emerald-200`} style={{ animation: `machineSlideIn 0.4s ease-out ${idx*0.1}s both` }}>
                    <div>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-semibold text-slate-800">{m.name}</div>
                          <div className="text-sm text-gray-500">{m.location}</div>
                        </div>
                        {m.available <= 2 && (
                          <div className="ml-3 px-2 py-1 rounded-full bg-red-50 text-red-600 text-xs font-medium animate-pulse">Low</div>
                        )}
                      </div>

                      <div className="mt-3 w-72 max-w-full">
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div className={`h-2 ${percent < 25 ? 'bg-red-400' : percent < 60 ? 'bg-amber-400' : 'bg-teal-500'}`} style={{ width: `${percent}%` }} />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{m.available} available • {m.total} total</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Available</div>
                      <div className="text-lg font-semibold text-teal-600">{m.available}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-100" style={{ animation: 'slideInUp 0.6s ease-out 0.2s both' }}>
              {successMsg && (
                <div className="fixed top-6 right-6 z-50" style={{ animation: 'slideInUp 0.3s ease-out' }}>
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-3 rounded-lg shadow-lg font-medium">✓ {successMsg}</div>
                </div>
              )}
              <h3 className="text-xl font-bold text-slate-900 mb-5">Request Resource</h3>
              <form onSubmit={submitRequest} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Machine</label>
                  <select value={selected} onChange={(e) => { setSelected(e.target.value); setError(""); }} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all 300ms bg-white">
                    {machines.map(m => <option key={m.id} value={m.id}>{m.name} — {m.location}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Quantity</label>
                  <input type="number" value={qty} min={1} onChange={(e) => { setQty(Number(e.target.value)); setError(""); }} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all 300ms" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Note (optional)</label>
                  <textarea value={note} onChange={(e) => { setNote(e.target.value); setError(""); }} placeholder="e.g., Urgent for trauma unit" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all 300ms" rows={3} />
                </div>

                {error && <div className="text-sm text-red-600 font-medium bg-red-50 p-3 rounded-lg">{error}</div>}

                <div className="flex gap-2 pt-2">
                  <button className={`px-4 py-2.5 rounded-lg font-semibold transition-all 300ms flex-1 ${(() => {
                    const m = machines.find(x => x.id === selected);
                    if (!m) return 'bg-slate-200 text-slate-400 cursor-not-allowed';
                    return (qty > m.available) ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg hover:-translate-y-0.5';
                  })()} `} disabled={(() => { const m = machines.find(x => x.id === selected); return !m || qty > m.available; })()}>
                    Send Request
                  </button>
                  <button type="button" onClick={() => { setRequests([]); localStorage.removeItem('resource_requests'); setMachines(sampleMachines); }} className="px-4 py-2.5 border border-slate-200 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 transition-all 300ms">Clear</button>
                </div>
              </form>

              <div className="mt-6 pt-5 border-t border-slate-100">
                <h4 className="text-sm font-semibold text-slate-800 mb-3">Recent Requests</h4>
                <div className="space-y-2">
                  {requests.length === 0 && <div className="text-sm text-slate-500">No requests yet</div>}
                  {requests.map(r => {
                    const m = machines.find(x => x.id === r.machineId) || sampleMachines.find(x => x.id === r.machineId);
                    return (
                      <div key={r.id} className="p-3 border border-slate-100 rounded-lg flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors 300ms">
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-slate-800">{m?.name ?? r.machineId} <span className="text-teal-600">×{r.quantity}</span></div>
                          <div className="text-xs text-slate-500 mt-0.5">{new Date(r.time).toLocaleString()}</div>
                          {r.note && <div className="text-xs text-slate-600 italic mt-1">{r.note}</div>}
                        </div>
                        <button onClick={() => setRequests((s) => s.filter(x => x.id !== r.id))} className="ml-3 text-slate-400 hover:text-red-600 font-bold transition-colors 300ms">×</button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
