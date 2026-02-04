"use client";

import { Wrench, AlertCircle, CheckCircle, Clock } from "lucide-react";

export default function EquipmentManagement() {
  const equipment = [
    { id: "VEN-001", name: "Ventilator", location: "ICU-A", status: "Operational", lastMaintenance: "Jan 15, 2026" },
    { id: "VEN-002", name: "Ventilator", location: "ICU-B", status: "Under Maintenance", lastMaintenance: "Jan 10, 2026" },
    { id: "XRY-001", name: "X-Ray Machine", location: "Radiology", status: "Operational", lastMaintenance: "Jan 20, 2026" },
    { id: "ECG-001", name: "ECG Monitor", location: "Cardiology", status: "Needs Repair", lastMaintenance: "Dec 25, 2025" },
    { id: "DEF-001", name: "Defibrillator", location: "Emergency", status: "Operational", lastMaintenance: "Jan 18, 2026" },
    { id: "ULT-001", name: "Ultrasound", location: "Obs/Gyn", status: "Operational", lastMaintenance: "Jan 22, 2026" },
    { id: "VEN-003", name: "Ventilator", location: "ICU-C", status: "Under Maintenance", lastMaintenance: "Jan 05, 2026" },
    { id: "MRI-001", name: "MRI Scanner", location: "Radiology", status: "Operational", lastMaintenance: "Jan 12, 2026" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Operational": return "bg-green-100 text-green-700 border-green-200";
      case "Under Maintenance": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Needs Repair": return "bg-red-100 text-red-700 border-red-200";
      case "Out of Service": return "bg-gray-100 text-gray-700 border-gray-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Operational": return <CheckCircle size={16} className="text-green-600" />;
      case "Under Maintenance": return <Clock size={16} className="text-yellow-600" />;
      case "Needs Repair": return <AlertCircle size={16} className="text-red-600" />;
      default: return <AlertCircle size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
          <Wrench className="text-blue-600" size={24} />
          Equipment Status
        </h3>
        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          Equipment Inventory →
        </button>
      </div>

      <div className="space-y-3">
        {equipment.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {getStatusIcon(item.status)}
                <div>
                  <p className="font-medium text-slate-900">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.id} • {item.location}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-gray-500">Last Maintenance</p>
                <p className="text-sm font-medium text-slate-900">{item.lastMaintenance}</p>
              </div>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-green-600">12</p>
            <p className="text-xs text-gray-500">Operational</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-600">3</p>
            <p className="text-xs text-gray-500">Maintenance</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">2</p>
            <p className="text-xs text-gray-500">Need Repair</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">17</p>
            <p className="text-xs text-gray-500">Total Equipment</p>
          </div>
        </div>
      </div>
    </div>
  );
}