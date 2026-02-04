"use client";

import { Bed, User, Clock, MapPin } from "lucide-react";

export default function BedManagement() {
  const beds = [
    { id: "ICU-01", patient: "Rajesh Kumar", status: "Occupied", ward: "ICU", since: "2 hours ago" },
    { id: "ICU-02", patient: null, status: "Available", ward: "ICU", since: "30 min ago" },
    { id: "ICU-03", patient: "Priya Sharma", status: "Occupied", ward: "ICU", since: "5 hours ago" },
    { id: "GEN-01", patient: "Amit Singh", status: "Occupied", ward: "General", since: "1 day ago" },
    { id: "GEN-02", patient: null, status: "Maintenance", ward: "General", since: "Cleaning" },
    { id: "GEN-03", patient: null, status: "Available", ward: "General", since: "1 hour ago" },
    { id: "ER-01", patient: "Sunita Devi", status: "Occupied", ward: "Emergency", since: "15 min ago" },
    { id: "ER-02", patient: null, status: "Available", ward: "Emergency", since: "Just now" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Occupied": return "bg-red-100 text-red-700 border-red-200";
      case "Available": return "bg-green-100 text-green-700 border-green-200";
      case "Maintenance": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
          <Bed className="text-blue-600" size={24} />
          Bed Management
        </h3>
        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          View All Beds →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {beds.map((bed) => (
          <div key={bed.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">{bed.id}</span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(bed.status)}`}>
                  {bed.status}
                </span>
              </div>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <MapPin size={12} />
                {bed.ward}
              </span>
            </div>
            
            <div className="space-y-2">
              {bed.patient ? (
                <div className="flex items-center gap-2 text-sm">
                  <User size={14} className="text-gray-500" />
                  <span className="text-slate-900 font-medium">{bed.patient}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <User size={14} />
                  <span>No patient assigned</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock size={14} />
                <span>{bed.since}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}