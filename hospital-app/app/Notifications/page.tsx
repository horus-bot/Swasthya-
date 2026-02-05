"use client";

import { useEffect, useState } from "react";

type Alert = {
  id: string;
  title: string;
  message: string;
  severity: "info" | "warning" | "critical";
  source?: string; 
  time: string;
  read?: boolean;
};

const sampleAlerts: Alert[] = [
  { id: "a1", title: "Flood Warning - District 3", message: "Rising water levels expected near rivers. Prepare for patient surge.", severity: "warning", source: "gov-app", time: new Date().toISOString(), read: false },
  { id: "a2", title: "Heatwave Advisory", message: "High temperatures expected. Ensure cooling and hydration stocks.", severity: "info", source: "gov-app", time: new Date().toISOString(), read: false },
  { id: "a3", title: "Chemical Incident Nearby", message: "Evacuations advised. Coordinate with district admin.", severity: "critical", source: "gov-app", time: new Date().toISOString(), read: false },
];

export default function NotificationsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);
  const [infoBanner, setInfoBanner] = useState(true);
  const [filterSeverity, setFilterSeverity] = useState<'all' | Alert['severity']>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem("hospital_notifications");
      if (raw) setAlerts(JSON.parse(raw));
      else setAlerts(sampleAlerts);
    } catch (e) {
      setAlerts(sampleAlerts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("hospital_notifications", JSON.stringify(alerts));
  }, [alerts]);

  const markAllRead = () => setAlerts((s) => s.map(a => ({ ...a, read: true })));
  const clearAll = () => setAlerts([]);
  const resetSample = () => setAlerts(sampleAlerts.map(a => ({ ...a, time: new Date().toISOString(), read: false })));

  const markRead = (id: string) => setAlerts((s) => s.map(a => a.id === id ? { ...a, read: true } : a));
  const markUnread = (id: string) => setAlerts((s) => s.map(a => a.id === id ? { ...a, read: false } : a));
  const dismiss = (id: string) => setAlerts((s) => s.filter(a => a.id !== id));

  const list = (showOnlyUnread ? alerts.filter(a => !a.read) : alerts)
    .filter(a => (filterSeverity === 'all' ? true : a.severity === filterSeverity))
    .filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.message.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-slate-50 to-cyan-50 p-6" style={{ animation: 'fadeIn 0.6s ease-out' }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes alertSlideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6" style={{ animation: 'slideInDown 0.6s ease-out' }}>
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">Notifications</h2>
            <p className="text-sm text-slate-600 mt-1">Alerts from external systems and internal notices.</p>
          </div>

          <div className="flex items-center gap-3">
            <label className="inline-flex items-center text-sm cursor-pointer">
              <input type="checkbox" className="mr-2" checked={showOnlyUnread} onChange={(e) => setShowOnlyUnread(e.target.checked)} />
              Show unread only
            </label>
            <button onClick={markAllRead} className="px-4 py-1.5 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all duration-300">Mark all read</button>
            <button onClick={clearAll} className="px-4 py-1.5 border border-red-300 rounded-lg text-sm text-red-600 font-medium hover:bg-red-50 transition-all duration-300">Clear</button>
          </div>
        </div>

        {infoBanner && alerts.length > 0 && (
          <div className="mb-4 p-4 rounded-xl bg-gradient-to-r from-teal-50 to-cyan-50 backdrop-blur-sm border border-teal-200 flex items-center justify-between" style={{ animation: 'slideInUp 0.5s ease-out' }}>
            <div className="text-sm text-slate-700">You have <strong className="text-slate-900 font-bold">{alerts.filter(a=>!a.read).length}</strong> unread alert(s).</div>
            <div className="flex gap-2">
              <button onClick={() => { markAllRead(); setInfoBanner(false); }} className="px-4 py-1.5 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors duration-200">Mark all read</button>
              <button onClick={() => setInfoBanner(false)} className="px-4 py-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200">Dismiss</button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4" style={{ animation: 'slideInUp 0.6s ease-out 0.1s both' }}>
            <input placeholder="Search alerts..." value={query} onChange={(e) => setQuery(e.target.value)} className="border border-slate-200 rounded-lg px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300" />
            <div className="flex gap-2">
              <button onClick={() => setFilterSeverity('all')} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${filterSeverity==='all'?'bg-slate-900 text-white shadow-md':'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}>All</button>
              <button onClick={() => setFilterSeverity('info')} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${filterSeverity==='info'?'bg-teal-600 text-white shadow-md':'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}>Info</button>
              <button onClick={() => setFilterSeverity('warning')} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${filterSeverity==='warning'?'bg-amber-500 text-white shadow-md':'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}>Warning</button>
              <button onClick={() => setFilterSeverity('critical')} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${filterSeverity==='critical'?'bg-red-600 text-white shadow-md':'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}>Critical</button>
            </div>
          </div>
          {list.length === 0 && (
            <div className="bg-white p-8 rounded-2xl shadow-md text-center">
              <svg width="96" height="96" viewBox="0 0 24 24" fill="none" className="mx-auto mb-4 opacity-80"><path d="M12 2v6" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <h3 className="text-lg font-semibold text-slate-800">No notifications</h3>
              <p className="text-sm text-slate-500 mt-2">You're all caught up. Click below to repopulate sample alerts.</p>
              <div className="mt-4">
                <button onClick={resetSample} className="px-4 py-2 bg-teal-600 text-white rounded-md shadow">Load sample alerts</button>
              </div>
            </div>
          )}

          {list.map((alert, idx) => (
            <div key={alert.id} className={`relative overflow-hidden rounded-2xl border ${alert.read ? 'border-slate-100 bg-white' : 'border-teal-100 bg-gradient-to-r from-teal-50 to-white'} shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01]`} style={{ animation: `alertSlideIn 0.4s ease-out ${idx*0.05}s both` }}>
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${alert.severity === 'critical' ? 'bg-red-500' : alert.severity === 'warning' ? 'bg-amber-400' : 'bg-teal-400'}`} />
              <div className="p-4 pl-6 flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center ${alert.severity === 'critical' ? 'bg-red-100' : alert.severity === 'warning' ? 'bg-amber-100' : 'bg-teal-100'}`}>
                        {alert.severity === 'critical' ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 8v4" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 16h.01" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        ) : alert.severity === 'warning' ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94A2 2 0 0022.18 18L13.71 3.86a2 2 0 00-3.42 0z" stroke="#92400e" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2a9 9 0 109 9" stroke="#0891b2" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{alert.title}</div>
                        <div className="text-xs text-slate-500">{new Date(alert.time).toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2 py-0.5 rounded text-white" style={{ background: alert.severity === 'critical' ? '#dc2626' : alert.severity === 'warning' ? '#f59e0b' : '#06b6d4' }}>{alert.severity}</span>
                    </div>
                  </div>

                  <p className={`mt-3 text-sm ${alert.read ? 'text-slate-700' : 'text-slate-800'}`}>{alert.message}</p>
                  <p className="mt-2 text-xs text-slate-400">Source: {alert.source ?? 'internal'}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {!alert.read ? (
                    <button onClick={() => markRead(alert.id)} className="text-sm text-teal-600">Mark read</button>
                  ) : (
                    <button onClick={() => markUnread(alert.id)} className="text-sm text-gray-600">Mark unread</button>
                  )}
                  <button onClick={() => dismiss(alert.id)} className="text-sm text-red-500">Dismiss</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
