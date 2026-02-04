"use client";

import { Bell, Settings, Calendar, User, CheckCircle } from "lucide-react";

export default function SystemNotifications() {
  const notifications = [
    {
      id: 1,
      type: "System",
      title: "System Maintenance Scheduled",
      message: "Scheduled maintenance window: February 6, 2026, 2:00 AM - 4:00 AM",
      time: "1 hour ago",
      read: false,
      category: "Maintenance"
    },
    {
      id: 2,
      type: "Appointment",
      title: "New Appointment Request",
      message: "Anitha R has requested an appointment for February 7, 2026",
      time: "2 hours ago",
      read: false,
      category: "Appointments"
    },
    {
      id: 3,
      type: "Staff",
      title: "Shift Change Reminder",
      message: "Evening shift starts in 30 minutes. Please prepare handover notes.",
      time: "3 hours ago",
      read: true,
      category: "Staff"
    },
    {
      id: 4,
      type: "Equipment",
      title: "Equipment Maintenance Complete",
      message: "X-Ray Machine XRY-001 maintenance completed successfully",
      time: "4 hours ago",
      read: true,
      category: "Equipment"
    },
    {
      id: 5,
      type: "Report",
      title: "Monthly Report Available",
      message: "January 2026 hospital statistics report is ready for review",
      time: "6 hours ago",
      read: false,
      category: "Reports"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Maintenance": return "bg-purple-100 text-purple-700";
      case "Appointments": return "bg-blue-100 text-blue-700";
      case "Staff": return "bg-emerald-100 text-emerald-700";
      case "Equipment": return "bg-orange-100 text-orange-700";
      case "Reports": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "System": return <Settings size={16} className="text-purple-600" />;
      case "Appointment": return <Calendar size={16} className="text-blue-600" />;
      case "Staff": return <User size={16} className="text-emerald-600" />;
      case "Equipment": return <Settings size={16} className="text-orange-600" />;
      case "Report": return <CheckCircle size={16} className="text-gray-600" />;
      default: return <Bell size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
          <Bell className="text-blue-600" size={24} />
          System Notifications
        </h3>
        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          Mark All as Read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <div key={notification.id} className={`p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow ${
            !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white'
          }`}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                {getTypeIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-slate-900">{notification.title}</h4>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(notification.category)}`}>
                    {notification.category}
                  </span>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
              </div>
              
              <div className="flex gap-1">
                {!notification.read && (
                  <button className="text-blue-600 hover:text-blue-800 text-xs">
                    Mark Read
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 text-center">
        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          Load More Notifications
        </button>
      </div>
    </div>
  );
}