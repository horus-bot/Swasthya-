"use client";

import { AlertTriangle, Users, Bed, Activity, Clock } from "lucide-react";

export default function EmergencyAlerts() {
  const emergencyAlerts = [
    {
      id: 1,
      type: "Critical",
      message: "Patient in ICU-03 requires immediate attention",
      location: "ICU Ward",
      time: "2 minutes ago",
      priority: "Critical",
      status: "Active"
    },
    {
      id: 2,
      type: "Equipment",
      message: "Ventilator VEN-002 malfunction detected",
      location: "ICU-B",
      time: "5 minutes ago",
      priority: "High",
      status: "Active"
    },
    {
      id: 3,
      type: "Staffing",
      message: "Emergency department understaffed",
      location: "Emergency Ward",
      time: "10 minutes ago",
      priority: "High",
      status: "Acknowledged"
    },
    {
      id: 4,
      type: "Bed",
      message: "No available beds in ICU",
      location: "ICU Ward",
      time: "15 minutes ago",
      priority: "Medium",
      status: "Resolved"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-700 border-red-300";
      case "High": return "bg-orange-100 text-orange-700 border-orange-300";
      case "Medium": return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "Low": return "bg-blue-100 text-blue-700 border-blue-300";
      default: return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-red-500";
      case "Acknowledged": return "bg-yellow-500";
      case "Resolved": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Critical": return <AlertTriangle size={20} className="text-red-600" />;
      case "Equipment": return <Activity size={20} className="text-orange-600" />;
      case "Staffing": return <Users size={20} className="text-blue-600" />;
      case "Bed": return <Bed size={20} className="text-purple-600" />;
      default: return <AlertTriangle size={20} className="text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
          <AlertTriangle className="text-red-600" size={24} />
          Emergency Alerts
        </h3>
        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          View All Alerts →
        </button>
      </div>

      <div className="space-y-4">
        {emergencyAlerts.map((alert) => (
          <div key={alert.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
            <div className="flex-shrink-0">
              {getTypeIcon(alert.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(alert.priority)}`}>
                  {alert.priority}
                </span>
                <span className={`w-2 h-2 rounded-full ${getStatusColor(alert.status)}`}></span>
                <span className="text-xs text-gray-500">{alert.status}</span>
              </div>
              
              <p className="font-medium text-slate-900 mb-1">{alert.message}</p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>📍 {alert.location}</span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {alert.time}
                </span>
              </div>
            </div>
            
            <div className="flex gap-2">
              {alert.status === "Active" && (
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Acknowledge
                </button>
              )}
              {alert.status === "Acknowledged" && (
                <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                  Resolve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}